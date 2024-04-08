from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("apps.api.urls")),
    path("api/accounts/", include("djoser.urls")),
    path("api/accounts/", include("djoser.urls.jwt")),
    path('api-auth/', include('rest_framework.urls')),
]
