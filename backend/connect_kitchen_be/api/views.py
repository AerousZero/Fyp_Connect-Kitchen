from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Role, User, FreelanceChef, Skill, Job
from .serializers import UserSerializer, ProfileSerializer, JobSerializer
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