from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True,blank=True)
    body = models.TextField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.body[:20]

    class Meta:
        get_latest_by = ["-updated_on"]


