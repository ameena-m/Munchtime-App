from django.urls import path
from .views import *
from rest_framework.authtoken import views

urlpatterns = [
    path('create-meal', CreateFoodView.as_view()),
    path('meals/<str:pk>', GetFood.as_view()),
    path('create-pair', CreateUserFoodPair.as_view()),
    path('create-user', createUser.as_view()),
    path('login', login.as_view()),
    path('get-calendar', GetCalendar.as_view()),
    path('autofill', Autofill.as_view()),
    path('token-auth', views.obtain_auth_token),
    path('get-fridge', GetFridge.as_view()),
    path('create-fridge', CreateFridgeItem.as_view()),
    path('delete-user', deleteUser.as_view()),
    path('Recommend', Recommend.as_view())
]
