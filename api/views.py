from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import redirect, render
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.views.generic.edit import FormView
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth import login
from .models import Note
from .serializers import NoteSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    # print("pp")




# class CustomLoginView(LoginView):
#     template_name = 'api/login.html'
#     fields = '__all__'
#     redirect_authenticated_user= True

#     def get_success_url(self):
#         return reverse_lazy('notes')

# class RegisterPage(FormView):
#     template_name = 'api/register.html'
#     form_class = UserCreationForm
#     redirect_authenticated_user= True
#     success_url = reverse_lazy('notes')

#     def form_valid(self,form):
#         user = form.save()
#         messages.success(self.request, 'Your account has been created!')
#         if user is not None:
#             login(self.request, user)
#         return super(RegisterPage, self).form_valid(form)
    
#     def get(self, *args, **kwargs):
#         if self.request.user.is_authenticated:
#             return redirect('notes')
#         return super(RegisterPage,self).get(*args, **kwargs)
    


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            "Endpoint" : "api/login/",
            "method" : "POST",
            "body" : {"username","password"},
            "description": "Lets you login to see your Notes"
        },
        {
            'Endpoint': 'api/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': 'api/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': 'api/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': 'api/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': 'api/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    
    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes,many=True)
    return Response(serializer.data)

# @api_view(['GET'])
# def getNote(request,pk):
#     notes = Note.objects.get(id=pk)
#     serializer = NoteSerializer(notes,many=False)
#     return Response(serializer.data)


# class GetNotes(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, format=None):
#         """
#         Returns a list of all notes of a user
#         """
#         notes = Note.objects.filter(user=request.user)
#         serializer = NoteSerializer(notes,many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

class GetNote(LoginRequiredMixin, APIView):
    def get(self, request,pk, format=None):
        """
        Returns the contents of a single note
        """
        # print(vars(request))
        note = Note.objects.get(id=pk)
        if request.user.is_authenticated and request.user == note.user:
            serializer = NoteSerializer(note,many=False)
            return Response(serializer.data)

        return Response({"please move along" : "Nothing to see here"}, status=status.HTTP_401_UNAUTHORIZED)
