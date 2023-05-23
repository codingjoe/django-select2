API Documentation
=================

Configuration
-------------

.. automodule:: django_select2.conf
    :members:
    :undoc-members:
    :show-inheritance:

Widgets
-------

.. automodule:: django_select2.forms
    :members:
    :undoc-members:
    :show-inheritance:

URLs
----

.. automodule:: django_select2.urls
    :members:
    :undoc-members:
    :show-inheritance:

Views
-----

.. automodule:: django_select2.views
    :members:
    :undoc-members:
    :show-inheritance:

Cache
-----

.. automodule:: django_select2.cache
    :members:
    :undoc-members:
    :show-inheritance:


JavaScript
----------

DjangoSelect2 handles the initialization of select2 fields automatically. Just include
``{{ form.media.js }}`` in your template before the closing ``body`` tag. That's it!

If you insert forms after page load or if you want to handle the initialization
yourself, DjangoSelect2 provides a jQuery plugin, replacing and enhancing the Select2
plugin.  It will handle both normal and heavy fields. Simply call
``djangoSelect2(options)`` on your select fields.::

        $('.django-select2').djangoSelect2();

Please replace all your ``.select2`` invocations with the here provided
``.djangoSelect2``.


Configuring Select2
-------------------

Select2 options can be configured either directly from Javascript or from within Django
using widget attributes. `(List of options in the Select2 docs) <https://select2.org/configuration/options-api>`_.

To pass options in javascript

.. code-block:: javascript

    $('.django-select2').djangoSelect2({
        minimumInputLength: 0,
        placeholder: 'Select an option',
    });

From Django, you can use ``data-`` attributes using the same names in camel-case and
passing them to your widget. Select2 will then pick these up. For example when
initialising a widget in a form, you could do:

.. code-block:: python

    class MyForm(forms.Form):
        my_field = forms.ModelMultipleChoiceField(
            widget=ModelSelect2MultipleWidget(
                model=MyModel
                search_fields=['another_field']
                attrs={
                    "data-minimum-input-length": 0,
                    "data-placeholder": "Select an option",
                    "data-close-on-select": "false",
                }
            )
        )

(If you do not want to initialize the widget, you could add the attributes by overriding
a widget method and adding them in a super call, e.g. `get_context() <https://docs.djangoproject.com/en/dev/ref/forms/widgets/#django.forms.Widget.get_context>`_)


Security & Authentication
-------------------------

Security is important. Therefore make sure to read and understand what
the security measures in place and their limitations.

Set up a separate cache. If you have a public form that uses a model widget
make sure to setup a separate cache database for Select2. An attacker
could constantly reload your site and fill up the select2 cache.
Having a separate cache allows you to limit the effect to select2 only.

You might want to add a secure select2 JSON endpoint for data you don't
want to be accessible to the general public. Doing so is easy::

    class UserSelect2View(LoginRequiredMixin, AutoResponseView):
        pass

    class UserSelect2WidgetMixin(object):
        def __init__(self, *args, **kwargs):
            kwargs['data_view'] = 'user-select2-view'
            super(UserSelect2WidgetMixin, self).__init__(*args, **kwargs)

    class MySecretWidget(UserSelect2WidgetMixin, ModelSelect2Widget):
        model = MySecretModel
        search_fields = ['title__icontains']
