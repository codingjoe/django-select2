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
              var formValue = $('[name=' + dependentField + ']', $element.closest('form')).val();
              // This is for inlines, I checked this for a specific case
              if (formValue === null || formValue === undefined) {
                  var newFieldName = $element[0].name.split('-', 2).join('-') + '-' + dependentField;
                  var formsetValue = $('[name=' + newFieldName + ']', $element.closest('.form-row')).val();
                  result[dependentField] = formsetValue;
              } else {
                  result[dependentField] = formValue;
              }
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
  })

  return $.fn.djangoSelect2
}))
