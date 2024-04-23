from django.contrib import admin
from django.urls import path, include
from api import urls as api_urls
from api import routing
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urls)),
    path('', include(routing.websocket_urlpatterns)),
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
