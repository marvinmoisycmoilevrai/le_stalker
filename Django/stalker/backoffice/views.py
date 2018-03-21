
from django.views.generic import *

APP_ID = '929000163934820'

class HomeView(TemplateView):

    template_name="backoffice/templates/home.html"

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['appid'] = APP_ID
        return context
