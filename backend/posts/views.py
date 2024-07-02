from django.views import View
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token
from django.contrib.auth.models import User
from .models import Post
from .serializers import PostForm
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
import json

# Create your views here.


@method_decorator(ensure_csrf_cookie, name="dispatch")
class CsrfTokenView(View):
    def get(self, request, *args, **kwargs):
        response = JsonResponse({"message": "Token generated successfully"})
        return response


class CheckAuthView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return JsonResponse(
                {"isAuthenticated": True, "username": request.user.username}
            )
        else:
            return JsonResponse({"isAuthenticated": False})


class RegisterView(View):

    def post(self, request):
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            User.objects.create_user(username=username, password=password)
            return JsonResponse({"message": "user Registered Successfully"}, status=201)
        except Exception as e:
            return JsonResponse({"message": f"An Error occured"}, status=500)


class LoginView(View):

    def post(self, request):
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"message": "Logged in successfully"}, status=200)

            return JsonResponse({"message": "Invalid Credentials!"}, status=400)
        except Exception as e:
            return JsonResponse({"message": f"An Error occured"}, status=500)


class LogoutView(View):

    def post(self, request):
        logout(request)
        return JsonResponse({"message": "Logged out successfully"}, status=200)


class PostView(View):

    def get(self, request):
        try:
            posts = Post.objects.all().values("title", "body", "id")
            if posts.exists():
                return JsonResponse(list(posts), safe=False)
            return JsonResponse({"message": "No Posts available"}, status=200)
        except Exception as e:
            return JsonResponse({"message": "An error occured"}, status=500)

    def post(self, request):
        try:
            data = json.loads(request.body)
            form = PostForm(data)
            if form.is_valid():
                post = form.save(commit=False)
                post.author = request.user
                post.save()
                return JsonResponse(form.data, status=201)
            return JsonResponse(form.errors, status=400)
        except:
            return JsonResponse({"message": "An error occured"}, status=500)


class PostDetailView(View):

    def get(self, request, post_id):
        try:
            post = Post.objects.get(pk=post_id)
            post_data = {
                "title": post.title,
                "body": post.body,
                "author": post.author.username,
            }
            return JsonResponse(post_data, safe=False)
        except Post.DoesNotExist:
            return JsonResponse({"error": "Post not found"}, status=404)

    def put(self, request, post_id):
        try:
            post = Post.objects.get(pk=post_id)
            if post.author != request.user:
                return JsonResponse({"error": "Unauthorized"}, status=403)
            data = json.loads(request.body)
            form = PostForm(data, instance=post)
            print(form)
            if form.is_valid():
                form.save()
                return JsonResponse(form.data)
        except Post.DoesNotExist:
            return JsonResponse({"error": "Post not found"}, status=404)

    def delete(self, request, post_id):
        try:
            post = Post.objects.get(pk=post_id)
            if post.author != request.user:
                return JsonResponse({"error": "Unauthorized"}, status=403)
            post.delete()
            return JsonResponse({"message": "Post deleted successfully"}, status=200)
        except Post.DoesNotExist:
            return JsonResponse({"error": "Post not found"}, status=404)


class PostUserView(View):
    def get(self, request):

        try:
            data = Post.objects.filter(author=request.user)

            if data.exists():
                user_posts = list(data.values("title", "body", "id"))
                return JsonResponse(user_posts, safe=False)
            return JsonResponse({"message": "No Posts available"}, status=404)
        except Exception as e:
            return JsonResponse({"message": "An error occured"}, status=500)
