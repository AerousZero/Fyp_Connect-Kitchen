from django.db import models
from enum import Enum

#User Role
class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)

class User(models.Model):
    first_name = models.CharField(max_length=100, default="")
    last_name = models.CharField(max_length=100, default="")
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

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
    
class Review(models.Model):
    chef = models.ForeignKey(FreelanceChef, on_delete=models.CASCADE)
    review_text = models.TextField()
    rating = models.FloatField()


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

#If Advertisement is implemented
class Hospitality(models.Model):
    title = models.CharField( max_length=50)
    image = models.ImageField( upload_to='image/hospitality', null = True)

class Advert(models.Model):
    institute = models.ForeignKey(Hospitality, on_delete=models.CASCADE, related_name = 'advert')
    name = models.CharField( max_length=50)
    price = models.IntegerField()
    image = models.ImageField(upload_to='image/advert', null=True)