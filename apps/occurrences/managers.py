from typing import List, Optional

from django.db.models import Q

from apps.search.models.manager import SearchableModelManager, SearchableModelQuerySet
from core.models.manager import TypedModelManager


class OccurrenceManager(TypedModelManager, SearchableModelManager):
    """Manager for occurrences."""

    def search(
        self,
        query: Optional[str] = None,
        start_year: Optional[int] = None,
        end_year: Optional[int] = None,
        entity_ids: Optional[List[int]] = None,
        topic_ids: Optional[List[int]] = None,
        rank: bool = False,
        suppress_unverified: bool = True,
        suppress_hidden: bool = True,
    ) -> 'SearchableModelQuerySet':
        """Return search results from apps.occurrences."""
        qs = (
            super()
            .search(
                query=query,
                suppress_unverified=suppress_unverified,
                suppress_hidden=suppress_hidden,
            )
            .filter(hidden=False)
            .filter_by_date(start_year=start_year, end_year=end_year)
            .prefetch_related('citations', 'images')
        )
        # Limit to specified entities
        if entity_ids:
            qs = qs.filter(Q(involved_entities__id__in=entity_ids))
        # Limit to specified topics
        if topic_ids:
            qs = qs.filter(
                Q(tags__id__in=topic_ids) | Q(tags__related_topics__id__in=topic_ids)
            )
        return qs

    @staticmethod
    def prefetch_search_relatives(queryset):
        return queryset.prefetch_related(
            'tags',
            'citations',
            'images',
        )
