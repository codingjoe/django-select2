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

    function initDjangoSelect2(element){
        if(element.classList.contains('django-select2')){
            $(element).djangoSelect2();
        }else{
            element.querySelectorAll('.django-select2').forEach(djSelect => {
                if (djSelect.closest('.empty-form') === null) {
                    $(djSelect).djangoSelect2();
                }
            });
        }
    }

    $(function () {
        document.querySelectorAll('.django-select2').forEach(element => {
            if (element.closest('.empty-form') === null) {
                $(element).djangoSelect2();
            }
        });
        $(document).on('formset:added', (event, $row, formsetName) => {
            if (event.detail && event.detail.formsetName) {
                // Django >= 4.1
                initDjangoSelect2(event.target);
            } else {
                // Django < 4.1, use $row
                initDjangoSelect2($row.get(0));
            }
        });
    })

    return $.fn.djangoSelect2
}))
