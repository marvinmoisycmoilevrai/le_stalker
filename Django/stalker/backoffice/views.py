
from django.views.generic import *

class HomeView(TemplateView):

    template_name="backoffice/templates/home.html"

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['firstname'] = "olivier"
        context['lastname'] = "engel"
        context['towns'] = ["Mulhouse", "Strasbourg", "Marseille"]
        context['data'] = {"age": 30, "genre": "male", "hobbies": "python"}
        context['years'] = (1900, 2000, 2014)
        return context
