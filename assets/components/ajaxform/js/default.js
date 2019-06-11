var AjaxForm = {

    initialize: function (afConfig) {
        

        

        $(document).off('submit', afConfig['formSelector']).on('submit', afConfig['formSelector'], function (e) {
            $(this).ajaxSubmit({
                dataType: 'json',
                data: {pageId: afConfig['pageId']},
                url: afConfig['actionUrl'],
                beforeSerialize: function (form) {
                    form.find(':submit').each(function () {
                        if (!form.find('input[type="hidden"][name="' + $(this).attr('name') + '"]').length) {
                            $(form).append(
                                $('<input type="hidden">').attr({
                                    name: $(this).attr('name'),
                                    value: $(this).attr('value')
                                })
                            );
                        }
                    })
                },
                beforeSubmit: function (fields, form) {
                    //noinspection JSUnresolvedVariable
                    if (typeof(afValidated) != 'undefined' && afValidated == false) {
                        return false;
                    }
                    form.find('.error').html('');
                    form.find('.error').removeClass('error');
                    form.find('input,textarea,select,button').attr('disabled', true);
                    return true;
                },
                success: function (response, status, xhr, form) {
                    form.find('input,textarea,select,button').attr('disabled', false);
                    response.form = form;
                    $(document).trigger('af_complete', response);
                    if (!response.success) {
                        AjaxForm.Message.error(response.message);
                        if (response.data) {
                            var key, value, focused;
                            for (key in response.data) {
                                if (response.data.hasOwnProperty(key)) {
                                    if (!focused) {
                                        form.find('[name="' + key + '"]').focus();
                                        focused = true;
                                    }
                                    value = response.data[key];
                                    form.find('.error_' + key).html(value).addClass('error');
                                    form.find('[name="' + key + '"]').addClass('error');
                                }
                            }
                        }
                    }
                    else {
                        AjaxForm.Message.success(response.message);
                        form.find('.error').removeClass('error');
                        form[0].reset();
                        //noinspection JSUnresolvedVariable
                        if (typeof(grecaptcha) != 'undefined') {
                            //noinspection JSUnresolvedVariable
                            grecaptcha.reset();
                        }
                    }
                }
            });
            e.preventDefault();
            return false;
        });

        $(document).on('keypress change', '.error', function () {
            var key = $(this).attr('name');
            $(this).removeClass('error');
            $('.error_' + key).html('').removeClass('error');
        });

        $(document).on('reset', afConfig['formSelector'], function () {
            $(this).find('.error').html('');
            AjaxForm.Message.close();
        });
    }

};


//noinspection JSUnusedGlobalSymbols
AjaxForm.Message = {
    success: function (message, sticky) {
        if (message) {
            if (!sticky) {
                sticky = false;
            }
            //$.jGrowl(message, {theme: 'af-message-success', sticky: sticky});
            if($('#calcPrice').is(':visible')){
              $('#calcPrice').modal('hide');
              $('#orderDone').modal('show');
            }
            if($('#callRequest').is(':visible')){
              $('#callRequest').modal('hide');
              $('#orderDone').modal('show');
            }else if($('#orderProject').is(':visible')){
              $('#orderProject').modal('hide');
              $('#orderProjectDone').modal('show');
            }else{
              $('#orderDone').modal('show');
            }

        }
    },
    error: function (message, sticky) {
        if (message) {
            if (!sticky) {
                sticky = false;
            }
            //$.jGrowl(message, {theme: 'af-message-error', sticky: sticky});
        }
    },
    info: function (message, sticky) {
        if (message) {
            if (!sticky) {
                sticky = false;
            }
          //  $.jGrowl(message, {theme: 'af-message-info', sticky: sticky});
        }
    },
    close: function () {
        $.jGrowl('close');
    },
};
