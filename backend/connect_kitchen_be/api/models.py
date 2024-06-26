from django.db import models
from enum import Enum

#User Role
class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)

def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class User(models.Model):
    first_name = models.CharField(max_length=100, default="")
    last_name = models.CharField(max_length=100, default="")
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to=upload_to, blank=True, null=True)

#User Skill
class Skill(models.Model):
    skill_name = models.CharField(max_length=100, unique=True)

class Specialty(models.Model):
    specialty_name = models.CharField(max_length=100, unique=True)


#Profile
class FreelanceChef(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=100, blank=True, null=True)
    experience = models.IntegerField(blank=True, null=True)
    availability = models.BooleanField(default=False)
    hourlyRate = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    skills = models.ManyToManyField(Skill, related_name='freelance_chefs', blank=True)
    

class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    fixed_budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    location = models.CharField(max_length=100)
    duration = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE)
    required_skills = models.ManyToManyField(Skill)
    required_experience = models.IntegerField(default=0)

#Save JOB post
class SavedJob(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_jobs')

class ProposalType(Enum):
    HOURLY = 'Hourly'
    FIXED = 'Fixed'

class JobProposal(models.Model):
    job = models.ForeignKey('Job', on_delete=models.CASCADE)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    rate = models.DecimalField(max_digits=10, decimal_places=2)
    cover_letter = models.TextField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_shortlisted = models.BooleanField(default=False)
    is_hired = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)

class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    message = models.TextField()
    job = models.ForeignKey(Job, related_name='job_messages', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)
    is_read = models.BooleanField(default=False)
   

#If Advertisement is implemented
class Hospitality(models.Model):
    title = models.CharField( max_length=50)
    image = models.ImageField( upload_to='image/hospitality', null = True)

class Advert(models.Model):
    institute = models.ForeignKey(Hospitality, on_delete=models.CASCADE, related_name = 'advert')
    name = models.CharField( max_length=50)
    price = models.IntegerField()
    image = models.ImageField(upload_to='image/advert', null=True)

class Review(models.Model):
    chef = models.ForeignKey(FreelanceChef, on_delete=models.CASCADE)
    review_text = models.TextField()
    rating = models.FloatField()

class ReviewRating(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    rating = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='review_ratings')
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_review_ratings')