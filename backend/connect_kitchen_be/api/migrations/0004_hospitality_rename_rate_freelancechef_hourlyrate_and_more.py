# Generated by Django 5.0.3 on 2024-04-03 09:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_job'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hospitality',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('image', models.ImageField(null=True, upload_to='image/hospitality')),
            ],
        ),
        migrations.RenameField(
            model_name='freelancechef',
            old_name='rate',
            new_name='hourlyRate',
        ),
        migrations.RemoveField(
            model_name='freelancechef',
            name='contact_info',
        ),
        migrations.RemoveField(
            model_name='freelancechef',
            name='schedule',
        ),
        migrations.RemoveField(
            model_name='freelancechef',
            name='specialties',
        ),
        migrations.RemoveField(
            model_name='job',
            name='deadline',
        ),
        migrations.AddField(
            model_name='job',
            name='duration',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='required_skills',
            field=models.ManyToManyField(to='api.skill'),
        ),
        migrations.CreateModel(
            name='Advert',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('price', models.IntegerField()),
                ('image', models.ImageField(null=True, upload_to='image/advert')),
                ('institute', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='advert', to='api.hospitality')),
            ],
        ),
        migrations.CreateModel(
            name='JobProposal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate', models.DecimalField(decimal_places=2, max_digits=10)),
                ('cover_letter', models.TextField()),
                ('description', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_shortlisted', models.BooleanField(default=False)),
                ('is_hired', models.BooleanField(default=False)),
                ('is_completed', models.BooleanField(default=False)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.job')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('read_at', models.DateTimeField(blank=True, null=True)),
                ('is_read', models.BooleanField(default=False)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='job_messages', to='api.job')),
                ('recipient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_messages', to='api.user')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_messages', to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='ReviewRating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.CharField(max_length=100)),
                ('createdBy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_review_ratings', to='api.user')),
                ('review', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.review')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='review_ratings', to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='SavedJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.job')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='saved_jobs', to='api.user')),
            ],
        ),
    ]