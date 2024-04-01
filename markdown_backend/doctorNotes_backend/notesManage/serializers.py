from rest_framework import serializers
from .models import User, Markdownedit

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'username']

class MarkdowneditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Markdownedit
        fields = ['id', 'title', 'user', 'notes', 'file']
