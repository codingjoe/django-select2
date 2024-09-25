/* global define, jQuery */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'))
  } else {
    // Browser globals
    factory(jQuery || window.django.jQuery)
  }
}(function ($) {
  'use strict'
  var init = function ($element, options) {
    $element.select2(options)
  }

  var initHeavy = function ($element, options) {
    var settings = $.extend({
      ajax: {
        data: function (params) {
          var result = {
            term: params.term,
            page: params.page,
            field_id: $element.data('field_id')
          }

          var dependentFields = $element.data('select2-dependent-fields')
          if (dependentFields) {
            dependentFields = dependentFields.trim().split(/\s+/)
            $.each(dependentFields, function (i, dependentField) {
              result[dependentField] = $('[name=' + dependentField + ']', $element.closest('form')).val()
            })
          }

          return result
        },
        processResults: function (data, page) {
          return {
            results: data.results,
            pagination: {
              more: data.more
            }
          }
        }
      }
    }, options)

    $element.select2(settings)
  }

  $.fn.djangoSelect2 = function (options) {
    var settings = $.extend({}, options)
    $.each(this, function (i, element) {
      var $element = $(element)
      if ($element.hasClass('django-select2-heavy')) {
        initHeavy($element, settings)
      } else {
        init($element, settings)
      }
      $element.on('select2:select', function (e) {
        var name = $(e.currentTarget).attr('name')
        $('[data-select2-dependent-fields~=' + name + ']').each(function () {
          $(this).val('').trigger('change')
        })
      })
    })
    return this
  }

  $(function () {
    $('.django-select2').djangoSelect2()

    // This part fixes new inlines not having the correct select2 widgets
    function handleFormsetAdded (row, formsetName) {
      // Converting to the "normal jQuery"
      const jqRow = $(row)

      // Because select2 was already instantiated on the empty form, we need to remove it, destroy the instance,
      // and re-instantiate it.
      jqRow.find('.django-select2').parent().find('.select2-container').remove()
      jqRow.find('.django-select2').djangoSelect2('destroy')
      jqRow.find('.django-select2').djangoSelect2()
    }

    // See: https://docs.djangoproject.com/en/dev/ref/contrib/admin/javascript/#supporting-versions-of-django-older-than-4-1
    $(document).on('formset:added', function (event, $row, formsetName) {
      if (event.detail && event.detail.formsetName) {
        // Django >= 4.1
        handleFormsetAdded(event.target, event.detail.formsetName)
      } else {
        // Django < 4.1, use $row and formsetName
        handleFormsetAdded($row.get(0), formsetName)
      }
    })
    // End of fix
  })

  return $.fn.djangoSelect2
}))
