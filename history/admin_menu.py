"""
This custom admin menu is activated by the following line in settings.py::
    ADMIN_TOOLS_MENU = 'history.admin_menu.AdminMenu'
"""

from django.urls import reverse
from django.utils.translation import ugettext_lazy as _

from admin_tools.menu import items, Menu


class AdminMenu(Menu):
    """
    Custom Menu for history admin site.
    """
    class Media:
        css = ()
        js = ()
        # css = {'all': ('css/mymenu.css',)}
        # js = ('js/mymenu.js',)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.children += [
            items.MenuItem(_('Dashboard'), reverse('admin:index')),
            items.Bookmarks(),
            items.AppList(
                title='Applications',
                exclude=[
                    'django.contrib.*',
                    'social_django.*',
                    'django_celery_*'
                ]
            ),
            items.MenuItem('Entities', children=[
                items.MenuItem('People', '/admin/entities/person/'),
                items.MenuItem('Organizations', '/admin/entities/organization/'),
                items.MenuItem('Groups', '/admin/entities/group/'),
                items.MenuItem('Roles', '/admin/entities/role/'),
                items.MenuItem('Ideas', '/admin/entities/idea/'),
                items.MenuItem('Classifications', '/admin/entities/classification/'),
            ]),
            items.MenuItem('Quotes', '/admin/quotes/quote/'),
            items.MenuItem('Occurrences', children=[
                items.MenuItem('Occurrences', '/admin/occurrences/occurrence/'),
                items.MenuItem('Occurrence chains', '/admin/occurrences/occurrencechain/'),
            ]),
            items.MenuItem('Sources', children=[
                items.MenuItem('All', '/admin/sources/source/'),
                items.MenuItem('Articles', '/admin/sources/article/'),
                items.MenuItem('Books', '/admin/sources/book/'),
            ]),
            items.MenuItem('Images', children=[
                items.MenuItem('Images', '/admin/images/image/'),
                items.MenuItem('Videos', '/admin/images/video/'),
            ]),
            items.MenuItem('Topics', '/admin/topics/topic/'),
            items.MenuItem('Places', '/admin/places/place/'),
        ]

    def init_with_context(self, context):
        """
        Use this method if you need to access the request context.
        """
        super().init_with_context(context)
        # Use sessions to store the visited pages stack
        # history = request.session.get('history', [])
        # for item in history:
        #     self.children.append(MenuItem(
        #         title=item['title'],
        #         url=item['url']
        #     ))
        # # Add the current page to the history
        # history.insert(0, {
        #     'title': context['title'],
        #     'url': request.META['PATH_INFO']
        # })
        # if len(history) > 10:
        #     history = history[:10]
        # request.session['history'] = history
