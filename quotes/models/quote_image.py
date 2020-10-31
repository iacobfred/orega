"""Quote images."""

from django.db import models
from django.db.models import ForeignKey

from modularhistory.models import Model


class QuoteImage(Model):
    """An association of an image and a quote."""

    quote = ForeignKey(
        'quotes.Quote', related_name='image_relations', on_delete=models.CASCADE
    )
    image = models.ForeignKey('images.Image', on_delete=models.PROTECT)
    position = models.PositiveSmallIntegerField(
        null=True, blank=True, help_text='Set to 0 if the image is positioned manually.'
    )

    def __str__(self):
        """Return the string representation of the quote–image association."""
        return f'{self.image} : {self.quote}'
