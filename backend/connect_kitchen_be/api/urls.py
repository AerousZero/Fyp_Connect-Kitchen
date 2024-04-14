from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import register_view, login_view, profile_view, add_post_view, get_jobs, save_job_view, delete_saved_job_view, get_saved_jobs_view, get_job_by_id, save_proposal, get_proposals_by_job, get_proposals_by_user, get_jobs_by_user,get_proposal_by_id, update_proposal_acceptance, hire_proposal, get_hired_chef, complete_job, upload, get_profile_image


urlpatterns = [
    
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('profile/', profile_view, name='profile'),
    path('profile/update/', profile_view, name='update_profile'),
    path('job/addJob/', add_post_view, name='add_job'),
    path('job/getJob/', get_jobs, name='get_jobs'),
    path('job/getJob/creator',get_jobs_by_user, name='get_jobs_by_user'),
    path('job/save/', save_job_view, name='save_job'),
    path('job/saved/', get_saved_jobs_view, name='saved_jobs'),
    path('job/delete/<int:saved_job_id>/', delete_saved_job_view, name='delete_saved_job'),
    path('job/<int:job_id>/', get_job_by_id, name='get_job_by_id'),
    path('proposals/save/', save_proposal, name='save_proposal'),
    path('proposals/user/', get_proposals_by_user, name='get_proposals_by_user'),
    path('proposals/job/<int:job_id>/', get_proposals_by_job, name='get_proposals_by_job'),
    path('proposals/<int:proposal_id>/', get_proposal_by_id, name='get_proposal_by_id'),
    path('proposal/approved/<int:proposal_id>/', update_proposal_acceptance, name='update_proposal_acceptance'),
    path('proposal/hire/<int:proposal_id>/', hire_proposal, name='hire_proposal'),
    path('hire/', get_hired_chef, name='get_hired_chef'),
    path('job/complete/<int:proposal_id>/', complete_job, name='complete_job'),
    path('upload/', upload, name='upload'),
    path('profile/image/<int:user_id>/', get_profile_image, name='get_profile_image'),
   
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
