
/*! madJax v0.1.0 | (c) 2016-2017 | Licensed under MIT (https://github.com/alieslamifard/madjax) */
"use strict";
window.madjax           = {};
madjax.var          = {};
madjax.fn           = {};
madjax.var.temp     = false;
madjax.var.value    = {};

madjax.fn.run = function (d){

    var fixedData = d.data;

    if (typeof fixedData == 'string') {
        fixedData = fixedData.substring(fixedData.indexOf("&"));

        switch (d.method){
            case 'post':
                fixedData = '_method=POST' + fixedData;
                break;
            case 'put':
                fixedData = '_method=PUT' + fixedData;
                break;
            case 'patch':
                fixedData = '_method=PATCH' + fixedData;
                break;
            case 'delete':
                fixedData = '_method=DELETE' + fixedData;
                break;
            default:
                fixedData = '_method=GET' + fixedData;
        }
    }

    var dataObject = {
        method: d.method,
        url: d.target,
        data: fixedData,
        global: d.global
    }
    if(d.imageFile){
        dataObject.processData = false,
            dataObject.contentType = false
    }

    $.ajax(dataObject).done(function( res ) {

        //! res is something like: result : {"status":true,"message":"action was successful.","data":{"data is: ":"something"}}
        //! or res is a string (or html)

        if ( typeof res.result != 'undefined' ) {

            if ( res.result.message ) {

                madjax.fn.alert(res.result);

            }

            if ( typeof d.success != 'undefined' ) {

                if ( res.result.status == true || res.result.success) {
                    eval(d.success)(res.result.data,d.e,res.result);
                }

            }

        } else {

            if ( typeof d.success != 'undefined' ) {

                eval(d.success)(res,d.e);

            }

        }



    });

    //@todo error attribute execute.

}

madjax.fn.provide = function (d) {

    if ( typeof d.before != 'undefined' ) {

        var beforeResult = eval(d.before)(d)

        if ( beforeResult ) {
            if ( beforeResult === true ) {
                madjax.fn.run(d);
            } else {
                madjax.fn.run(beforeResult);
            }
        }

    } else {

        madjax.fn.run(d);

    }

}

madjax.fn.ajaxErr = function () {
    //! if you need custom alert/action to handle ajax error overwrite function below (in another js file right after this file):
}

madjax.fn.alert = function (d) {
    //! if you need custom alert/action to handle alert data overwrite function below (in another js file right after this file):
}

$(document).ajaxStart(function(){
    $(".madJaxWait").removeClass("hidden");
});

$(document).ajaxComplete(function(){
    $(".madJaxWait").addClass("hidden");
});

$(document).ajaxError(function(){
    $(".madJaxWait").addClass("hidden");
    madjax.fn.ajaxErr();
    $(".madJaxWait").addClass("hidden");
});

//form type
$(document).on('click','form[mj-type="form"] button[type="submit"]', function (e){

    e.preventDefault();

    var d = {},
        t =         $(this),
        p =         t.parents('form');
    d.e =         t,
        d.target =    p.attr('mj-target'),
        d.model =     p.attr('mj-model'),
        d.method =    p.attr('mj-method'),
        d.data =      p.serialize(),
        d.before =    p.attr('mj-before'),
        d.success =   p.attr('mj-success'),
        d.error =     p.attr('mj-error'),
        d.global =    (p.attr('mj-not-global') != undefined ? false : true);

    setTimeout( function(){

        if ( t.attr('mj-valid') ){

            if ( t.attr('mj-valid') == 'false' ){

                console.log('mj-valid false');
                return;

            }

        }

        if(t.attr('class').split(' ').pop() == 'profile'){
            if(document.getElementById("profile-image").files[0]){
                d.imageFile = true;
                var image = document.getElementById("profile-image").files[0]
                var fd = new FormData();
                fd.append("image", image);
                fd.append("first_name", $('#first-name').val());
                fd.append("last_name", $('#last-name').val());
                fd.append("email", $('#email').val());
                fd.append("phone", $('#phone').val());
                fd.append("national_code", $('#national-code').val());
                fd.append("sheba", $('#sheba').val());
                fd.append("gender_id", $('#input[name="gender_id"]').val());
                d.data = fd;
            }
        }

        madjax.fn.provide(d);

    },100);//wait for form validation

});

//single button type
$(document).on('click','[mj-type="single"]', function (e){

    e.preventDefault();

    var d = {},
        t =           $(this);
    d.e =         t,
        d.target =    t.attr('mj-target'),
        d.model =     t.attr('mj-model'),
        d.method =    t.attr('mj-method'),
        d.data =      (t.attr('mj-value') == '' ? eval(t.attr('mj-values'))(t) : {parameters:t.attr('mj-value')}),
        d.before =    t.attr('mj-before'),
        d.success =   t.attr('mj-success'),
        d.error =     t.attr('mj-error'),
        d.global =    (t.attr('mj-not-global') != undefined ? false : true);
    if(!t.hasClass('active')){
        madjax.fn.provide(d);
    }

});

//tuple button type
$(document).on('click','[mj-type="tuple"] [mj-invoke]', function (e){

    e.preventDefault();

    var d = {},
        t =           $(this),
        p =           t.parents('[mj-type="tuple"]');
    d.e =         t,
        d.target =    p.attr('mj-target'),
        d.model =     p.attr('mj-model'),
        d.method =    p.attr('mj-method'),
        d.data =      p.serialize(),
        d.before =    p.attr('mj-before'),
        d.success =   p.attr('mj-success'),
        d.error =     p.attr('mj-error'),
        d.global =    (p.attr('mj-not-global') != undefined ? false : true);

    madjax.fn.provide(d);

});

//select-option type
$(document).on('change','[mj-type="select"]', function (e){

    e.preventDefault();

    var d = {},
        t =           $(this);
    d.e =         t,
        d.target =    t.attr('mj-target'),
        d.model =     t.attr('mj-model'),
        d.method =    t.attr('mj-method'),
        d.data =      {parameters :t.val()},
        d.before =    t.attr('mj-before'),
        d.success =   t.attr('mj-success'),
        d.error =     t.attr('mj-error'),
        d.global =    (t.attr('mj-not-global') != undefined ? false : true);

    madjax.fn.provide(d);

});
