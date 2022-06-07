from calendar import Calendar
from contextvars import Token
from unicodedata import name
from django.shortcuts import render
from rest_framework import generics, status, permissions
from .serializers import *
from .models import Food, Calendar
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import AnonymousUser, User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


# Create your views here.

# developer api to create food and add it to the database do not allow users to access this!
class CreateFoodView(APIView):
    serializer_class = CreateFoodSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            desc = serializer.data.get('description')
            veg = serializer.data.get('vegetarian')
            mtype = serializer.data.get('mealType')
            link = serializer.data.get('linkToInstructions')
            ingredientArray = serializer.data.get('ingredients')
            queryset = Food.objects.filter(name=name)
            if queryset.exists():
                return Response({"Meal Creation Error":"Meal name is already taken"}, status=status.HTTP_226_IM_USED)
            else:
                food = Food(name=name, description=desc, vegetarian=veg, linkToInstructions=link)
                food.save()
                for ingredient in ingredientArray:
                    food.ingredients.add(ingredient)
                return Response(FoodSerializer(food).data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response({"Serializer error":"Please check to docs to see the data required"}, status=status.HTTP_400_BAD_REQUEST)

# if no item is specified returns all food in the db 
# if an item is specified in the kwargs then it returns the data for the food item
class GetFood(APIView):
    serializer_class = FoodSerializer
    def get(self, request, pk, format=None):
        if pk != None:
            food = Food.objects.filter(name=pk)
            if len(food) > 0:
                data = FoodSerializer(food[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Food Not Found In Database':'Invalid Food Name'}, status=status.HTTP_404_NOT_FOUND)
        food = Food.objects.all()
        data = FoodSerializer(food, many=True).data
        return Response(data, status=status.HTTP_200_OK)

class deleteUser(APIView):
    serializer_class = LoginSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            usern = serializer.data.get('username')
            passw = serializer.data.get('password')
            user = authenticate(username=usern, password=passw)
            if user is not None:
                user.delete()
                return Response({'Operation Successful':'Account deleted'}, status=status.HTTP_200_OK)
            else:
                return Response({'Unauthenticated':'Information does not match a valid account'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# A registering api also giving back a token to the user
class createUser(APIView):
    serializer_class =  RegisterSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Login api using the authenticate built in from django giving a token back
class login(APIView):
    serializer_class = LoginSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            usern = serializer.data.get('username')
            passw = serializer.data.get('password')
            user = authenticate(username=usern, password=passw)
            if user is not None:
                token = Token.objects.get(user=user)
                return Response({'user':UserSerializer(user).data, 'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'Unauthorized':'Login details are incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
        print(serializer.errors)
        return Response({'Bad Request':'Correct data not provided, please submit a username and password'}, status=status.HTTP_400_BAD_REQUEST)

#adds a record to the calendar table symbolising a User adding a food item to their calendar
class CreateUserFoodPair(APIView):
    serializer_class = CalendarSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.data.get('user')
            print(user)
            food = serializer.data.get('food')
            pos = serializer.data.get('position')
            user_obj = User.objects.get(username=user)
            food_obj = Food.objects.get(name=food)
            queryset = Calendar.objects.filter(user=user_obj, position=pos)
            if queryset.exists():
                pair = queryset[0]
                pair.user = user_obj
                pair.foodName = food_obj
                pair.position = pos
                pair.save(update_fields=['user','food','position'])
            else:
                pair = Calendar(user=user_obj, food=food_obj, position=pos)
                pair.save()
            return Response(ReturnCalendarSerializer(pair).data, status=status.HTTP_201_CREATED)

# Returns a users calendar if they are logged in, if not it returns 403
class GetCalendar(APIView):
    serializer_class = ReturnCalendarSerializer
    def get(self, request, format=None):
        user = self.request.user
        if not isinstance(user, AnonymousUser):
            calendar = Calendar.objects.filter(user=user)
            calendar = calendar.order_by('position')
            if len(calendar) > 0:
                data = ReturnCalendarSerializer(calendar,many=True).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Calendar Not Found':'No Calendar Elements Exist For This User'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Forbidden':'You must be logged in to access the calendar'}, status=status.HTTP_403_FORBIDDEN)

# Exposed API endpoint for the Autofill feature, can be used by logged and not logged in users
class Autofill(APIView):
    serializer_class = FoodSerializer
    lookup_url_kwarg = 'v'
    def get(self, request, format=None):
        v = request.GET.get(self.lookup_url_kwarg)
        breakfast = Food.objects.filter(mealType="B")
        lunch = Food.objects.filter(mealType="L")
        dinner = Food.objects.filter(mealType="D")
        if v==True:
            breakfast = breakfast.filter(vegetarian=True)
            breakfast = breakfast.order_by('?')[:7]
            lunch = lunch.filter(vegetarian=True)
            lunch = lunch.order_by('?')[:7]
            dinner = dinner.filter(vegetarian=True)
            dinner = dinner.order_by('?')[:7]
        else:
            breakfast = breakfast.order_by('?')[:7]
            lunch = lunch.order_by('?')[:7]
            dinner = dinner.order_by('?')[:7]
        # Uses union to join the querysets together
        allItems = breakfast | lunch | dinner
        return Response(FoodSerializer(allItems, many=True).data, status=status.HTTP_200_OK)

class GetFridge(APIView):
    serializer_class = ReturnFridgeSerializer
    def get(self, request, format=None):
        user = User.objects.get(username="Neb")
        #if not isinstance(user, AnonymousUser):
        if True:
            fridge = Fridge.objects.filter(user=user)
            if len(fridge) > 0:
                data = ReturnFridgeSerializer(fridge,many=True).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Fridge Not Found':'No Fridge Elements Exist For This User'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Forbidden':'You must be logged in to access the fridge'}, status=status.HTTP_403_FORBIDDEN)

class CreateFridgeItem(APIView):
    serializer_class = FridgeSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        #user = self.request.user
        if serializer.is_valid():
            if True: #not isinstance(user, AnonymousUser):
                #user = serializer.data.get('user')
                user = User.objects.get(username="Neb")
                quantity = serializer.data.get('quantity')
                unit = serializer.data.get('unit')
                newFridgeItem = serializer.data.get('itemsInFridge')
                user_obj = User.objects.get(username=user)
                print(user_obj)
                newFridgeItem_obj = Ingredients.objects.get(name=newFridgeItem)
                if(user_obj is None or newFridgeItem_obj is None):
                    return Response({'Input Error':'User or Ingredient doesnt exist'}, status=status.HTTP_400_BAD_REQUEST)
                queryset = Fridge.objects.filter(user=user_obj, itemsInFridge=newFridgeItem_obj)
                if queryset.exists(): #update amount field with new amount
                    print("test")
                    item = queryset[0]
                    print(item)
                    print(quantity)
                    item.user = user_obj
                    item.itemsInFridge = newFridgeItem_obj
                    item.quantity = quantity
                    item.unit = unit
                    item.save(update_fields=['user','itemsInFridge','quantity','unit'])
                else:
                    item = Fridge(user=user_obj, itemsInFridge=newFridgeItem_obj, quantity=quantity, unit=unit)
                    item.save()
                return Response(ReturnFridgeSerializer(item).data, status=status.HTTP_201_CREATED)
            return Response({'User Not Found':'Anonymous user only, need to sign in'}, status=status.HTTP_428_PRECONDITION_REQUIRED)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
        
class Recommend(APIView):
    serializer_class = FoodSerializer

    def get(self,request):
        """
            Food recommendation, the rule is associated with Fridge
        :param request:
        :return:
        """
        itemsInFridgeList = Fridge.objects.all()
        ingredientsIdList = []
        for item in itemsInFridgeList:
            itemsInFridge_name = item.itemsInFridge
            ingredientsId = Ingredients.objects.filter(name=itemsInFridge_name).first()
            ingredientsIdList.append(ingredientsId.id)

        allItems = Food.objects.filter(ingredients__in=ingredientsIdList).all()


        return Response(FoodSerializer(allItems, many=True).data, status=status.HTTP_200_OK)

