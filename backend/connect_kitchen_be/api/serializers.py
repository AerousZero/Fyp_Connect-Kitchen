from rest_framework import serializers
from .models import Role, User, Skill, Specialty, FreelanceChef, Review, Job, SavedJob,JobProposal, Message, ReviewRating

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name'] 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username', 'password', 'role']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = '__all__'

class FreelanceChefSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)
    specialties = SpecialtySerializer(many=True)

    class Meta:
        model = FreelanceChef
        fields = '__all__'
        
class TopFreelanceChefSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)  
    def get_user(self, obj):
        user = obj.user  # Accessing the related user object
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'firstName': user.first_name,
            'lastName':user.last_name,
            'profile_image': user.profile_image
            # 'images': user.profile_image
            # Add more user fields as needed
        }
        return user_data

    class Meta:
        model = FreelanceChef
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    role = serializers.SerializerMethodField()

    def get_role(self, obj):
        try:
            role = Role.objects.get(pk=obj.role_id)
            return RoleSerializer(role).data
        except Role.DoesNotExist:
            return None

    class Meta:
        model = User
        exclude = ['password']


class JobSerializer(serializers.ModelSerializer):
    payment_type = serializers.SerializerMethodField()
    experience_level = serializers.SerializerMethodField()
    is_shortlisted = serializers.SerializerMethodField()
    is_hired = serializers.SerializerMethodField()
    user_is_hired = serializers.SerializerMethodField()

    class Meta:
        model = Job
        exclude = ['required_skills']

    def get_payment_type(self, obj):
        if obj.fixed_budget is not None:
            return 'Fixed Price'
        elif obj.hourly_rate is not None:
            return 'Hourly Rate'
        else:
            return None

    def get_experience_level(self, obj):
        if obj.required_experience < 1:
            return 'Junior'
        elif 1 <= obj.required_experience < 2:
            return 'MidLevel'
        else:
            return 'Senior'

    def get_is_shortlisted(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            user = request.user
            return obj.proposals.filter(user=user, is_shortlisted=True).exists()
        return False

    def get_is_hired(self, obj):
       return JobProposal.objects.filter(job=obj, is_hired=True).exists()


    def get_user_is_hired(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            user = request.user
            job = obj
            return job.objects.filter(user=user, job=job, is_hired=True).exists()
        return False

class SavedJobSerializer(serializers.ModelSerializer):
   

    class Meta:
        model = SavedJob
        fields = [ 'job']

class ProposalSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobProposal
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'message', 'job', 'timestamp', 'read_at', 'is_read']

class ReviewRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewRating
        fields = ['id', 'review', 'rating', 'user', 'createdBy']
        
       
