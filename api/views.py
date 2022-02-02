import os

from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseNotFound
from django.views import View
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Note
from .serializers import NoteSerializer, RegisterSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(["GET"])
def getRoutes(request):
    routes = [
        {
            "Endpoint": "api/login/",
            "method": "POST",
            "body": {"username", "password"},
            "description": "Lets you login to see your Notes",
        },
        {
            "Endpoint": "api/notes/",
            "method": "GET",
            "body": None,
            "description": "Returns an array of notes",
        },
        {
            "Endpoint": "api/notes/id",
            "method": "GET",
            "body": None,
            "description": "Returns a single note object",
        },
        {
            "Endpoint": "api/notes/create/",
            "method": "POST",
            "body": {"body": ""},
            "description": "Creates new note with data sent in post request",
        },
        {
            "Endpoint": "api/notes/id/update/",
            "method": "PUT",
            "body": {"body": ""},
            "description": "Creates an existing note with data sent in post request",
        },
        {
            "Endpoint": "api/notes/id/delete/",
            "method": "DELETE",
            "body": None,
            "description": "Deletes and exiting note",
        },
    ]

    return Response(routes)


class CreateNote(generics.CreateAPIView):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all().order_by("-updated_on")
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getNote(request, pk):
    user = request.user
    note = user.note_set.filter(id=pk).first()
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


# Things to do : Add a create Note API
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateNote(request, pk):
    data = request.data
    user = request.user
    note = user.note_set.filter(id=pk).first()
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteNote(request, pk):
    user = request.user
    note = user.note_set.filter(id=pk).first()
    note.delete()
    return Response("Note was Deleted!")


class Assets(View):
    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), "static", filename)

        if os.path.isfile(path):
            with open(path, "rb") as file:
                return HttpResponse(
                    file.read(), content_type="application/javascript"
                )
        else:
            return HttpResponseNotFound()
