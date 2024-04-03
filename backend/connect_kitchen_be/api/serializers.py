from rest_framework import serializers
from .models import Role, User, Skill, Specialty, FreelanceChef, Review, SavedJob, JobProposal, Message

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
