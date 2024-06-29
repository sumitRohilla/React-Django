from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    CsrfTokenView,
    CheckAuthView,
    PostView,
    PostDetailView,
    PostUserView,
)


urlpatterns = [
    path("csrf-token/", CsrfTokenView.as_view(), name="csrf"),
    path("check-auth/", CheckAuthView.as_view(), name="check-auth"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("posts/", PostView.as_view(), name="posts"),
    path("posts/<int:post_id>/", PostDetailView.as_view(), name="posts-detail"),
    path("user-posts/", PostUserView.as_view(), name="user-posts"),
]
