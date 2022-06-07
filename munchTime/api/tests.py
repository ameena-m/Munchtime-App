from urllib import response
from django.test import TestCase
from .models import Food, User, Calendar
from .serializers import *

# Create your tests here.

class FoodTestCase(TestCase):
    def setUp(self):
        Food.objects.create(name="Test1",description="This is test data.",vegetarian="False")

    def test_get_request(self):
        response = self.client.get("/api/get-food")
        self.assertEqual(response.status_code, 200)
    
    def test_post_request(self):
        data = {"name":"Sample","description":"This is some sample data","vegetarian":True}
        response = self.client.post("/api/create-food", data)
        self.assertEqual(response.status_code, 201)

class UserTestCase(TestCase):
    def setUp(self):
        pass

    #def test_post_request(self):
        data = {"username":"Alex"}
        response = self.client.post("/api/create-user", data)
        self.assertEqual(response.status_code, 201)

# Outdated - need to figure out how to add authorisation headers
#class CalendarTestCase(TestCase):
    def setUp(self):
        pass

    def test_post_request(self):
        test_food = Food(name="Test1",description="This is test data.",vegetarian="False")
        test_user = User(username="myClient", password="testPassword")
        test_food.save()
        test_user.save()
        data = {"user":test_user.id,"food":test_food.id,"position":1}
        response = self.client.post("/api/create-pair", data)
        self.assertEqual(response.status_code, 201)
        print(response.content)
        
class AutofillTestCase(TestCase):
    def setUp(self):
        pass

    def test_get_request(self):
        response = self.client.get("/api/autofill")
        self.assertEqual(response.status_code, 200)