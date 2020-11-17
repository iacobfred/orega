from typing import List, Optional, TYPE_CHECKING

from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db.models import ManyToManyField
from django.template.defaultfilters import truncatechars_html
from django.utils.html import format_html
from django.utils.safestring import SafeString

from images.models import Image
from modularhistory.fields import HTMLField, HistoricDateTimeField
from modularhistory.models import (
    ModelWithImages,
    ModelWithRelatedQuotes,
    ModelWithSources,
    SearchableDatedModel,
)
from modularhistory.utils.html import soupify
from occurrences.manager import OccurrenceManager
from occurrences.models.occurrence_image import OccurrenceImage
from occurrences.serializers import OccurrenceSerializer
from quotes.models import quote_sorter_key

if TYPE_CHECKING:
    from django.db.models.manager import Manager

TRUNCATED_DESCRIPTION_LENGTH: int = 250


class Occurrence(
    SearchableDatedModel,
    ModelWithRelatedQuotes,
    ModelWithSources,
    ModelWithImages,
):
    """Something that happened."""

    date = HistoricDateTimeField(null=True, blank=True)
    end_date = HistoricDateTimeField(null=True, blank=True)
    summary = HTMLField(
        verbose_name='Summary', null=True, blank=True, paragraphed=False
    )
    description = HTMLField(
        verbose_name='Description', null=True, blank=True, paragraphed=True
    )
    postscript = HTMLField(
        verbose_name='Postscript',
        null=True,
        blank=True,
        paragraphed=True,
        help_text='Content to be displayed below all related data',
    )
    locations = ManyToManyField(
        'places.Place',
        through='occurrences.OccurrenceLocation',
        related_name='occurrences',
        blank=True,
    )
    images = ManyToManyField(
        Image,
        through='occurrences.OccurrenceImage',
        related_name='occurrences',
        blank=True,
    )
    image_relations: 'Manager'
    involved_entities = ManyToManyField(
        'entities.Entity',
        through='occurrences.OccurrenceEntityInvolvement',
        related_name='involved_occurrences',
        blank=True,
    )
    chains = ManyToManyField(
        'occurrences.OccurrenceChain',
        through='occurrences.OccurrenceChainInclusion',
        related_name='occurrences',
    )

    class Meta:
        unique_together = ['summary', 'date']
        ordering = ['-date']

    objects: OccurrenceManager = OccurrenceManager()  # type: ignore
    searchable_fields = [
        'summary',
        'description',
        'date__year',
        'involved_entities__name',
        'involved_entities__aliases',
        'tags__topic__key',
        'tags__topic__aliases',
    ]
    serializer = OccurrenceSerializer

    def __str__(self) -> str:
        """Return the string representation of the occurrence."""
        return self.summary.text or '...'

    def save(self, *args, **kwargs):
        """Save the occurrence to the database."""
        self.clean()
        super().save(*args, **kwargs)
        if not self.images.exists():
            image = None
            if self.involved_entities.exists():
                for entity in self.involved_entities.all():
                    if entity.images.exists():
                        if self.date:
                            image = entity.images.get_closest_to_datetime(self.date)
                        else:
                            image = entity.image
            if image:
                OccurrenceImage.objects.create(occurrence=self, image=image)

    def clean(self):
        """Prepare the occurrence to be saved."""
        super().clean()
        if not self.date:
            raise ValidationError('Occurrence needs a date.')

    @property
    def truncated_description(self) -> Optional[SafeString]:
        """Return the occurrence's description, truncated."""
        if not self.description:
            return None
        description = soupify(self.description.html)
        if description.find('img'):
            description.find('img').decompose()
        return format_html(
            truncatechars_html(description.prettify(), TRUNCATED_DESCRIPTION_LENGTH)
        )

    @property
    def ordered_images(self):
        """Careful!  These are occurrence-images, not images."""
        return self.image_relations.all().select_related('image')

    @property
    def entity_images(self) -> Optional[List[Image]]:
        """TODO: write docstring."""
        try:
            images = []
            for entity in self.involved_entities.all():
                if entity.images.exists():
                    if self.date:
                        image = entity.images.get_closest_to_datetime(self.date)
                        images.append(image)
            return images
        except (ObjectDoesNotExist, AttributeError):
            return None

    def get_context(self):
        """TODO: add docstring."""
        quotes = [
            quote_relation.quote
            for quote_relation in self.quote_relations.all()
            .select_related('quote')
            .iterator()
        ]
        return {
            'occurrence': self,
            'quotes': sorted(quotes, key=quote_sorter_key),
        }
