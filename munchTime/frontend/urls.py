from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('fridge', index),
    path('calendar', index),
    path('preferences', index),
    path('shopping-list', index),
    path('update-fridge', index),
    path('login', index),
    path('gdpr', index),
    path('signup', index),
]