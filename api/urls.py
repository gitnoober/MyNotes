from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)



urlpatterns = [
    path('', views.getRoutes,name="routes"),
    # tokens
    path('token/',views.MyTokenObtainPairView.as_view(),name="token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    # auth
    # path('login/', views.CustomLoginView.as_view(), name="login"),
    # path('logout/', LogoutView.as_view(), name="logout"),
    # path('register/', views.RegisterPage.as_view(), name="register"),
    # notes
    # path('notes/', views.GetNotes.as_view(), name="notes"),
    path('notes/', views.getNotes, name="notes"),
    path('notes/<str:pk>/', views.GetNote.as_view(), name="note"),

]
