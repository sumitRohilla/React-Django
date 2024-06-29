from django.http import JsonResponse
from django.middleware.csrf import CsrfViewMiddleware
import logging
from django.middleware.csrf import get_token
from django.conf import settings

logger = logging.getLogger(__name__)


class CustomCsrfViewMiddleware(CsrfViewMiddleware):

    def process_response(self, request, response):
        if response.status_code == 403 and "CSRF" in str(response.content):
            return JsonResponse(
                {"forbidden": "CSRF Token missing or incorrect."}, status=403
            )
        return super().process_response(request, response)

    def _set_token(self, request, response):
        token = get_token(request)
        logger.debug(f"Setting CSRF token: {token}")
        response.set_cookie(
            self._get_cookie_name(request),
            token,
            max_age=self._get_token_lifetime(),
            domain=settings.CSRF_COOKIE_DOMAIN,
            path=settings.CSRF_COOKIE_PATH,
            secure=settings.CSRF_COOKIE_SECURE,
            httponly=settings.CSRF_COOKIE_HTTPONLY,
            samesite=settings.CSRF_COOKIE_SAMESITE,
        )
        return response
