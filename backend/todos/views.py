# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TodoItem
from .serializers import TodoItemSerializer


class TodoListView(APIView):
    """
    List all todos, or create a new todo.
    """

    def get(self, request, format=None):
        todos = TodoItem.objects.all()
        serializer = TodoItemSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TodoItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
