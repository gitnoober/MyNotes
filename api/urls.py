from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    path("", views.getRoutes, name="routes"),
    # auth tokens
    path(
        "token/",
        views.MyTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", views.RegisterView.as_view(), name="register"),
    # notes
    # path('notes/', views.GetNotes.as_view(), name="notes"),
    # path('notes/new/', views.createNote,name="create-note"),
    path("notes/new/", views.CreateNote.as_view(), name="create-note"),
    path("notes/", views.getNotes, name="notes"),
    path("notes/<str:pk>/update/", views.updateNote, name="note-update"),
    path("notes/<str:pk>/delete/", views.deleteNote, name="note-delete"),
    path("notes/<str:pk>/", views.getNote, name="note"),
]
