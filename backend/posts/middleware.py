from django.http import JsonResponse
from django.middleware.csrf import CsrfViewMiddleware


class CustomCsrfViewMiddleware(CsrfViewMiddleware):

    def process_response(self, request, response):
        if response.status_code == 403 and "CSRF" in str(response.content):
            return JsonResponse(
                {"forbidden": "CSRF Token missing or incorrect."}, status=403
            )
        return super().process_response(request, response)
