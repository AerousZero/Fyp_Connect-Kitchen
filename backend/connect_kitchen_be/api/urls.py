from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import register_view, login_view, profile_view

urlpatterns = [
    
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('profile/', profile_view, name='profile'),
    path('profile/update/', profile_view, name='update_profile')
   
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
