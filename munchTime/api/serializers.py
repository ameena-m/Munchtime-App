from dataclasses import fields
from lib2to3.pgen2 import token
from rest_framework import serializers
from .models import UNIT_CHOICES, Calendar, Food, Fridge, Ingredients
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class FoodSerializer(serializers.ModelSerializer):
    ingredients = serializers.StringRelatedField(many=True)

    class Meta:
        model = Food
        fields = "__all__"
        depth = 1

class CreateFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = "__all__"

class CalendarSerializer(serializers.Serializer):
    user = serializers.CharField(required=True)
    food = serializers.CharField(required=True)
    position = serializers.CharField(required=True)

class ReturnCalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = ['food', 'position']
        depth = 1

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username','password','email']

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], email=validated_data['email'], password=validated_data['password'])
        token = Token.objects.get_or_create(user=user)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(style={'input_type': 'password'})


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email']

class FridgeSerializer(serializers.Serializer):
    itemsInFridge = serializers.CharField(required=True)
    quantity = serializers.IntegerField(required=True)
    unit = serializers.CharField(required=True)

class ReturnFridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fridge
        fields = ['itemsInFridge', 'quantity','unit']
        depth = 1

        
