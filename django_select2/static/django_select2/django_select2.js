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
  const init = function ($element, options) {
    $element.select2(options)
  }

  const initHeavy = function ($element, options) {
    const settings = $.extend({
      ajax: {
        data: function (params) {
          const result = {
            term: params.term,
            page: params.page,
            field_id: $element.data('field_id')
          }

          let dependentFields = $element.data('select2-dependent-fields')
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
    const settings = $.extend({}, options)
    $.each(this, function (i, element) {
      const $element = $(element)
      if ($element.hasClass('django-select2-heavy')) {
        initHeavy($element, settings)
      } else {
        init($element, settings)
      }
      $element.on('select2:select', function (e) {
        const name = $(e.currentTarget).attr('name')
        $('[data-select2-dependent-fields~=' + name + ']').each(function () {
          $(this).val('').trigger('change')
        })
      })
    })
    return this
  }

  $(function () {
    $('.django-select2').not('[name*=__prefix__]').djangoSelect2()

    document.addEventListener('formset:added', (event) => {
      $(event.target).find('.django-select2').djangoSelect2()
    })
  })

  return $.fn.djangoSelect2
}))
