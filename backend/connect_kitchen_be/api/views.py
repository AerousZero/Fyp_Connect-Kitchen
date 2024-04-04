from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Role, User, FreelanceChef, Skill, Job, SavedJob, JobProposal
from .serializers import UserSerializer, ProfileSerializer, JobSerializer, SkillSerializer, SavedJobSerializer, ProposalSerializer
from .utils import decode_token
from django.db import connection
from django.db.utils import Error as DBError
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import NotFound, ValidationError, NotAuthenticated



@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    if request.method == 'POST':
        role_name = request.data.get('role')
        if not role_name:
            raise NotFound('Role name is required')

        email = request.data.get('email')
        if not email:
           raise ValidationError({"status":status.HTTP_400_BAD_REQUEST,"message": 'Email is required'})

        # Check if email already exists
        if User.objects.filter(email=email).exists():
          raise ValidationError({"status":status.HTTP_400_BAD_REQUEST, "message":'Email already exists'})

        role, created = Role.objects.get_or_create(name=role_name)
        user_data = request.data.copy()
        user_data['role'] = role.id

        serializer = UserSerializer(data=user_data)
        if serializer.is_valid():
            # Encrypt the password before saving
            password = user_data.get('password')
            if password:
                user_data['password'] = make_password(password)
                
            serializer.save()
            return Response({'status': status.HTTP_201_CREATED, 'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        if not (username and password):
            return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT id, username, password FROM api_user WHERE username = %s", [username])
                row = cursor.fetchone()

            if row:
                user_id, db_username, db_password = row
                if password == db_password:
                    user = User.objects.get(id=user_id)
                    refresh = RefreshToken.for_user(user)
                    return Response({'status': status.HTTP_200_OK, 'message': "Login successful", 'refresh': str(refresh), 'access': str(refresh.access_token)}, status=status.HTTP_200_OK)
        except DBError:
            pass

        raise AuthenticationFailed('Invalid credentials')

@api_view(['GET', 'PUT', 'PATCH'])
def profile_view(request):
    authorization_header = request.headers.get('Authorization')
    try:
        user_id = decode_token(authorization_header)
        user = User.objects.get(id=user_id)
        
        if request.method == 'GET':
            serializer = ProfileSerializer(user)
            return Response(serializer.data)
        
        elif request.method in ['PUT', 'PATCH']:
            serializer = ProfileSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                
                # Check if FreelanceChef instance exists, if not, create one
                try:
                    freelance_chef = FreelanceChef.objects.get(user=user)
                except FreelanceChef.DoesNotExist:
                    # Create FreelanceChef instance
                    freelance_chef = FreelanceChef.objects.create(user=user)
                
                # Update FreelanceChef instance with new data
                freelance_chef.location = request.data.get('location', freelance_chef.location)
                freelance_chef.experience = request.data.get('experience', freelance_chef.experience)
                freelance_chef.availability = request.data.get('availability', freelance_chef.availability)
                freelance_chef.hourlyRate = request.data.get('hourlyRate', freelance_chef.hourlyRate)
                freelance_chef.save()
                
                # Update or create skills
                skills_data = request.data.get('skills', [])
                print(skills_data)
                for skill_name in skills_data:
                    skill, created = Skill.objects.get_or_create(skill_name=skill_name)
                    freelance_chef.skills.add(skill)
                
                return Response({'message': 'Profile updated successfully'}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    except TokenError as e:
        raise AuthenticationFailed(str(e))
    

# Job Posting
@api_view(['GET'])
def get_jobs(request):
    # Check authorization
    authorization_header = request.headers.get('Authorization')
    try:
        user_id = decode_token(authorization_header)
        user = User.objects.get(id=user_id)
    except Exception as e:
        raise NotAuthenticated({"status": "401", "message": "Unauthorized"})
    
    if request.method == 'GET':
        jobs = Job.objects.all()
        
        if not jobs:
            return Response({'status': status.HTTP_404_NOT_FOUND, 'message': 'No jobs found'}, status=status.HTTP_404_NOT_FOUND)

        job_data = []
        for job in jobs:
            job_dict = {}
            job_serializer = JobSerializer(job)
            job_dict['job'] = job_serializer.data
            
            # Fetch user for each job
            user_serializer = UserSerializer(job.posted_by)
            job_dict['user'] = user_serializer.data
            
            # Assuming Job model has a ManyToManyField to Skill model
            # Fetching related skills data
            skill_serializer = SkillSerializer(job.required_skills.all(), many=True)
            job_dict['skills'] = skill_serializer.data
            
            # Check if the job is a favorite for the user
            is_favorite = SavedJob.objects.filter(user=user, job=job).exists() if user else False
            job_dict['isFavorite'] = is_favorite
            
            job_data.append(job_dict)
            

        return Response({
            'status': status.HTTP_200_OK, 
            'message': 'Jobs fetched successfully', 
            'data': job_data
        }, status=status.HTTP_200_OK)
    

# Add job to save/favourite section by chef
@api_view(['POST'])
def save_job_view(request):
    # Check authorization
    authorization_header = request.headers.get('Authorization')
    if not authorization_header:
        return Response({'status': '401', 'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        user_id = decode_token(authorization_header)
        user = User.objects.get(id=user_id)
    except Exception as e:
        return Response({'status': '401', 'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    if request.method == 'POST':
        serializer = SavedJobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response({'status': status.HTTP_201_CREATED, 'message': 'Job saved successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# Fetch Saved Post from list
@api_view(['GET'])
def get_saved_jobs_view(request):
    # Check authorization
    authorization_header = request.headers.get('Authorization')
    try:
        user_id = decode_token(authorization_header)
        user = User.objects.get(id=user_id)
    except Exception as e:
        raise NotAuthenticated({"status": "401", "message": "Unauthorized"})
    
    if request.method == 'GET':
        saved_jobs = SavedJob.objects.filter(user=user)
        if not saved_jobs:
            return Response({'status': status.HTTP_200_OK, 'message': 'No saved jobs found', 'data': []}, status=status.HTTP_200_OK)
        
        saved_job_data = []
        for saved_job in saved_jobs:
            saved_job_dict = {}
            # saved_job_dict['saved_job'] = SavedJobSerializer(saved_job).data
            
            # Fetch job details for the saved job
            job_serializer = JobSerializer(saved_job.job)
            saved_job_dict['job'] = job_serializer.data
            
            # Fetch user details for the job
            user_serializer = UserSerializer(saved_job.job.posted_by)
            saved_job_dict['user'] = user_serializer.data
            
            # Fetch related skills for the job
            skill_serializer = SkillSerializer(saved_job.job.required_skills.all(), many=True)
            saved_job_dict['skills'] = skill_serializer.data

            # Check if the job is a favorite for the user
            is_favorite = SavedJob.objects.filter(user=user, job=saved_job.job).exists()
            saved_job_dict['isFavorite'] = is_favorite
            
            saved_job_data.append(saved_job_dict)

        return Response({'status': status.HTTP_200_OK, 'message': 'Saved jobs fetched successfully', 'data': saved_job_data}, status=status.HTTP_200_OK)


#remove post from favourite list
@api_view(['DELETE'])
def delete_saved_job_view(request, saved_job_id):
    try:
        saved_job = SavedJob.objects.get(id=saved_job_id, user=request.user)
        saved_job.delete()
        return Response({'status': status.HTTP_204_NO_CONTENT, 'message': 'Job deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except SavedJob.DoesNotExist:
        return Response({'status': status.HTTP_404_NOT_FOUND, 'message': 'Saved job not found'}, status=status.HTTP_404_NOT_FOUND)
    



@api_view(['GET', 'OPTIONS'])
def get_job_by_id(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
        job_data = get_job_data(job, request)
        return Response({'status': status.HTTP_200_OK, 'message': 'Job fetched successfully', 'data': job_data}, status=status.HTTP_200_OK)
    
    except Job.DoesNotExist:
        return Response({'status': status.HTTP_404_NOT_FOUND, 'message': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)

def get_job_data(job, request):
    job_data = {}
    job_serializer = JobSerializer(job)
    job_data['job'] = job_serializer.data
    
    # Fetch user for the job
    job_data['user'] = get_user_data(job.posted_by)
    
    # Fetch related skills for the job
    job_data['skills'] = get_skills_data(job)

    
    
    # Check if the job is a favorite for the user
    job_data['isFavorite'] = check_if_favorite(job, request)
    
    return job_data

def get_user_data(user):
    user_serializer = UserSerializer(user)
    total_jobs_posted = Job.objects.filter(posted_by=user).count()
    user_data = user_serializer.data
    user_data['total_jobs_posted'] = total_jobs_posted
    return user_data


def get_skills_data(job):
    skill_serializer = SkillSerializer(job.required_skills.all(), many=True)
    return skill_serializer.data


def check_if_favorite(job, request):
    authorization_header = request.headers.get('Authorization')
    if authorization_header:
        try:
            user_id = decode_token(authorization_header)
            user = User.objects.get(id=user_id)
            return SavedJob.objects.filter(user=user, job=job).exists()
        except Exception as e:
            pass
    return False

# Fetch job created by users
@api_view(['GET'])
def get_jobs_by_user(request):
    authorization_header = request.headers.get('Authorization')
    try:
        user_id = decode_token(authorization_header)
        user = User.objects.get(id=user_id)
    except Exception as e:
        raise NotAuthenticated({"status": "401", "message": "Unauthorized"})
    
    jobs = Job.objects.filter(posted_by=user.id)
    job_data = []
    for job in jobs:
        job_dict = {}
        job_dict['job'] = JobSerializer(job).data
        job_dict['skills'] = SkillSerializer(job.required_skills.all(), many=True).data
        job_data.append(job_dict)
    
    return Response({'status': status.HTTP_200_OK, 'message': 'Jobs fetched successfully', 'data': job_data})


@api_view(['POST'])
def save_proposal(request):
    authorization_header = request.headers.get('Authorization')
    try:
        user_id = decode_token(authorization_header)
        user = User.objects.get(id=user_id)
    except Exception as e:
        raise NotAuthenticated({"status": "401", "message": "Unauthorized"})

    # Extract job ID from request data
    job_id = request.data.get('job')

    # Validate job ID
    if not job_id:
        return Response({'status': status.HTTP_400_BAD_REQUEST, 'message': 'Job ID is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer_data = {
        'user': user.id,  
        'job': job_id,    
        **request.data    
    }

    serializer = ProposalSerializer(data=serializer_data)
    if serializer.is_valid():
        serializer.save()
        return Response({'status': status.HTTP_201_CREATED, 'message': 'Job proposal submitted successfully'}, status=status.HTTP_201_CREATED)
    return Response({'status': status.HTTP_400_BAD_REQUEST, 'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

#API to look for submitted proposal
@api_view(['GET'])
def get_proposals_by_user(request):
    authorization_header = request.headers.get('Authorization')
    try:
        user_id = decode_token(authorization_header)
        user = User.objects.get(id=user_id)
        
        # Fetch proposals based on user's role
        if user.role.name == 'chef':
            proposals = JobProposal.objects.filter(user=user.id)
            serializer = ProposalSerializer(proposals, many=True)
            add_is_submitted(serializer.data)
       

        return Response({'status': status.HTTP_200_OK, 'message': 'Jobs fetched successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': 'Failed to retrieve proposals'}, status=status.HTTP_400_BAD_REQUEST)

def add_is_submitted(proposals):
    for proposal in proposals:
        proposal['isSubmitted'] = True

#api to fetch propsla bu job
@api_view(['GET'])
def get_proposals_by_job(request, job_id):
    authorization_header = request.headers.get('Authorization')
    if not authorization_header:
        return Response({'error': 'Authorization header missing'}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        user_id = decode_token(authorization_header)
        proposals = JobProposal.objects.filter(job=job_id)
        
        proposals_data = []
        for proposal in proposals:
            # Fetch user details for each proposal
            user = User.objects.get(id=proposal.user.id)
            user_data = {
                'id': user.id,
                'name': user.first_name + ' ' + user.last_name,
                'email': user.last_name,
                # Add more user fields as needed
            }
            proposal_data = ProposalSerializer(proposal).data
            proposal_data['user'] = user_data
            proposals_data.append(proposal_data)
        
        return Response({'status': status.HTTP_200_OK, 'message': 'Jobs fetched successfully', 'data': proposals_data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': 'Failed to retrieve proposals. Invalid token or unauthorized.'}, status=status.HTTP_403_FORBIDDEN)
