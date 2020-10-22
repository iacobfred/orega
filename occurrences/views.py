from typing import Dict

from django.db.models import QuerySet
from django.views import generic

from modularhistory.constants import IMAGE_CT_ID, QUOTE_CT_ID, SOURCE_CT_ID
from occurrences.models import Occurrence
from search.forms import SearchForm


class ListView(generic.list.ListView):
    """View that listing all occurrences."""

    model = Occurrence
    template_name = 'occurrences/index.html'
    context_object_name = 'occurrences'
    paginate_by = 20

    def get_queryset(self) -> QuerySet:
        """Return the queryset."""
        return Occurrence.objects.filter(verified=True)

    def get_context_data(self, *args, **kwargs) -> Dict:
        """TODO: write docstring."""
        context = super().get_context_data(*args, **kwargs)
        context['search_form'] = SearchForm(
            request=self.request,
            excluded_content_types=[
                QUOTE_CT_ID,
                IMAGE_CT_ID,
                SOURCE_CT_ID
            ]
        )
        return context


class BaseDetailView(generic.detail.DetailView):
    """Abstract view that displays details of a specific occurrence."""

    model = Occurrence
    context_object_name = 'occurrence'

    object: Occurrence

    def get_context_data(self, *args, **kwargs) -> Dict:
        """Returns the context data used to render the view."""
        context = super().get_context_data(*args, **kwargs)
        occurrence = self.object
        return {**context, **occurrence.get_context()}


class DetailView(BaseDetailView):
    """View that displays details of a specific occurrence."""

    template_name = 'occurrences/detail.html'


class DetailPartialView(BaseDetailView):
    """Partial view that displays details of a specific occurrence."""

    template_name = 'occurrences/_detail.html'


# def add(request):
#     """add an occurrence."""
#     num_divisions = request.GET.get('numDivisions') if 'numDivisions' in request.GET else None
#     form = CreateForm(request, num_divisions=(num_divisions if num_divisions else 3))
#     if request.method == 'POST': # just submitted the form
#         form = CreateForm(request, num_divisions=(num_divisions if num_divisions else 3))
#         if form.is_valid():
#             event = form.save()
#             return HttpResponseRedirect('/events/manage/')
#     context = {
#         'form': form,
#     }
#     return request.dmp.render('event.create.html', context)
