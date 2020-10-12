"""Model classes for entity categories/categorizations."""

from typing import Tuple

from django.db import models
from django.db.models import CASCADE, ForeignKey
from django.db.models.functions import Lower

from modularhistory.fields import ArrayField, HistoricDateTimeField
from modularhistory.models import Model

NAME_MAX_LENGTH: int = 100

PARTS_OF_SPEECH: Tuple[Tuple[str, str], ...] = (
    ('noun', 'noun'),
    ('adj', 'adjective'),
    ('any', 'noun / adjective'),
)


class Category(Model):
    """TODO: add docstring."""

    name = models.CharField(max_length=NAME_MAX_LENGTH, unique=True)
    part_of_speech = models.CharField(
        max_length=9, choices=PARTS_OF_SPEECH,
        default='adj'
    )
    aliases = ArrayField(
        models.CharField(max_length=NAME_MAX_LENGTH),
        null=True, blank=True
    )
    parent = ForeignKey(
        'self', related_name='children',
        null=True, blank=True,
        on_delete=CASCADE
    )
    weight = models.PositiveSmallIntegerField(default=1, blank=True)

    class Meta:
        verbose_name_plural = 'categories'
        ordering = [Lower('name')]

    def __str__(self) -> str:
        """TODO: write docstring."""
        return self.name


class Categorization(Model):
    """TODO: add docstring."""

    entity = ForeignKey(
        'entities.Entity',
        related_name='categorizations',
        on_delete=CASCADE
    )
    category = ForeignKey(
        Category,
        related_name='categorizations',
        on_delete=CASCADE,
        null=True, blank=True
    )
    date = HistoricDateTimeField(null=True, blank=True)
    end_date = HistoricDateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ['entity', 'category']

    def __str__(self) -> str:
        """TODO: write docstring."""
        return str(self.category)

    @property
    def weight(self) -> int:
        """TODO: add docstring."""
        return self.category.weight
