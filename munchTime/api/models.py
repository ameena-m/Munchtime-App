from calendar import calendar
from enum import unique
import random
import string
import uuid
from django.db import models
from django.contrib.auth.models import User

UNIT_CHOICES = [
        ('GRAMS', 'g'),
        ('TABLESPOONS', 'tbsp'),
        ('TEASPOONS', 'tsp'),
        ('MILILITRES','ml'),
        ('N/A','')
    ]

class Ingredients(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return (self.name)

class Food(models.Model):
    MEAL_CHOICES = [
        ('B','Breakfast'),
        ('L','Lunch'),
        ('D','Dinner'),
        ]
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    vegetarian = models.BooleanField(default=False)
    mealType = models.CharField(choices=MEAL_CHOICES, max_length=2, default='B')
    linkToInstructions = models.CharField(max_length=50, default="Link not available")
    ingredients = models.ManyToManyField(Ingredients, related_name="included_in")
    
    def __str__(self):
        return (self.name)

class Calendar(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    position = models.IntegerField()

    def __str__(self):
        return (str(self.user) + "-" + str(self.food) + "-" + str(self.position))

class Fridge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    itemsInFridge = models.ForeignKey(Ingredients, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    unit = models.CharField(choices=UNIT_CHOICES, max_length=12, default='N/A')
    def __str__(self):
        return (str(self.user) + "-" + str(self.itemsInFridge))


