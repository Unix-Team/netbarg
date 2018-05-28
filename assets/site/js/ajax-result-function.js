
$.fn.digits = function () {
    return this.each(function () {
        $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    })
};

function unveilCall() {
    $(".main-row img,.under-slider-banner img,.figure-ads-baner img").unveil();
}

function profileEdit(){
    if ($('.nb-thumbnail-circle').attr('style')){
        $('.removeImgProfile').removeClass('a-disabled');
        $('.removeImgProfile').addClass('codal red-txt');
    }
    $('.avatar-info p.name').text($("input[name='first_name']").val() + ' ' + $("input[name='last_name']").val());
    $('p.ft-3').text($("input[name='first_name']").val() + ' ' + $("input[name='last_name']").val());
}

function setAddress(data,element){
    $('<div class="col-lg-23 address-pro side-space-2 form-fix-pro">\
            <label class="radio-wrapper">\
              <div class="label-parent">\
                <input type="radio" class="radio-input radio-address" name="address" value="' + data.id + '">\
                <div class="radio-face"></div><i></i>\
              </div>\
              <button type="button" data-url="/user/userAddresses/edit" class="outer-btn p-edit"><i class="icon icon-pencil-edit"></i></button>\
              <button codal-url="/user/userAddresses/delete/' + data.id + '.json" codal-ms="آیا از حذف این رکورد اطمینان دارید" codal-method="delete" codal-success="deleteAddress" codal-fid="3" type="button" data-toggle="modal" data-target="#remove-address" class="codal outer-btn"><i class="icon icon-garbage-bin"></i></button>\
              <span class="text-addr">' + data.address + '</span>\
            </label>\
        </div>').insertBefore('div.col-lg-23.clearfix.side-space-2');
    $('.ajax-address').parent().removeClass('dis-block');
    $('.ajax-address').parent().prev('div').removeClass('dis-no');
    $('input[value="'+data.id+'"]').prop('checked', true);
}

function setUserBalance(data){
    $('p.credit').text(data).digits();
    $('div.my-ca span:nth-child(2)').text(data).digits();
}

function editAddress(data,element){
    element.parents('div.col-lg-23').parent('div.row').find('input[value="' + data.id +'"]').parent('div.label-parent').siblings('span').html(data.address);
    $('.ajax-address').parent().removeClass('dis-block');
    $('.ajax-address').parent().prev('div').removeClass('dis-no');
}

function deleteAddress(data){
    $('input[value="'+data+'"].radio-address').parents('div.address-pro.col-lg-23').remove();
    $('.add-address').parent('div.col-lg-23').removeClass('dis-no');
    $('.ajax-address').html('');
}

function deleteLike(data){
    $('div#delete-fav-'+data).parents('div.item-fav-box').parent().remove();
    if ($('div.item-fav-box').length == 0){
        $('div.fav-box').html('<div class="empty-content">\
            <div class="row">\
            <div class="col-lg-24 col-md-24 col-xs-24">\
                <div class="text1">موردی برای نمایش یافت نشد</div>\
            </div>\
                </div>\
            </div>'
        );
    }
}

function transactionFilltering(data){
    $('div#tab4').html(data);
}

function commentFilltering(data){
    $('div#tab5').html(data);
}

function removeImg(data){
    $('div.nb-thumbnail-circle div').remove();
    $('div.nb-thumbnail-circle').css('background-image', '');
    $('div.nb-thumbnail-circle').append('<div class="pic_profile" style="background-image:url(/assets/site/img/user-pic.png)"></div>');
    $('.avatar').css({
        'background-image': 'url(/assets/site/img/user-pic.png)',
    });
    $('.removeImgProfile').addClass('a-disabled');
    $('.removeImgProfile').removeClass('codal');
}

function dealUserFilltering(data) {
    $('div#tab3').html(data);
    if ($('#accordion .panel-collapse')[0]) {
        $('#accordion .panel-collapse').each(function () {
            var w = $(this);
            var mc = w.find('.morecode').length;
            if (mc > 3) {
                w.find(".morecode:not(:first)").css('display', 'none');
                $('<tr class="mobile-toggle-moreCode"><td colspan="4"><i class="icon icon-arrow-down open-meRe"></i></td></tr>').insertAfter(w.find('.morecode:last'));
            }

        });

        $(document).on('click', '.open-meRe', function () {
            var openicon = $(this);
            var w = $(this).parents('.panel-collapse');
            if (!openicon.hasClass('open')) {
                w.find('.morecode').css('display', ' table-row');
                openicon.addClass('open');
            } else {
                w.find(".morecode:not(:first)").css('display', 'none');
                openicon.removeClass('open');
            }
        });
    }
}

function getUserNote(data){
    if(typeof (data) !== 'undefined' && typeof(data.note) !== 'undefined'){
        $('#note').val(data.note);
        $('#note').parents('form').find("input[name='deal_user_id']").remove();
        $('#note').parents('form').attr('mj-target','/DealUsers/addDealUserNote/'+data.id+'.json').val(data.note);
        $('#id').val(data.id);
    }else{
        $('#note').val('');
        $('#note').parents('form').find("input[name='deal_user_id']").remove();
        $('#note').parents('form').append('<input type="hidden" name="deal_user_id" id="deal_user_id" value="'+data+'" />')
        $('#note').parents('form').attr('mj-target','/DealUsers/addDealUserNote.json').val(data.note);
        $('#id').val('');
        return true;
    }
}

function getDataRating (data,result){
    if(data['status'] == false){
        madjax.fn.alert({status: false,message: window.msg.rateError});
        $("#rateModal-only").modal('hide');
    }else{
        $('.rating-data').html(data);
    }
}

function responseDataRating (data){
    setTimeout(function(){
        $("#rateComent").html('');
        $("#rateComent").append(' <div class="tworow-nb-alert nb-alert nb-alert-info"><span>کاربر گرامی شما قبلا به این نت برگ رای داده اید </span></div>');
    }, 0);


}

function setRating(data,element){
    if (data){
        if (data.deal_id){
            $('.star-' + data.deal_id).parents('a').removeAttr('data-target').removeAttr('mj-type');
            $('.star-'+data.deal_id).removeClass('gray-star').next('span').text(data.rate);
            $('.star-' + data.deal_id).parents('a.DealUserRating').css('cursor','default').parents('div.cr-total-rate').attr('data-original-title','');
        }
    }
}

function prepareDataRating (curent){
    $("#starIt2 .ui-slider-handle").attr('style', 'left:100%');
    var company_id = $(curent).data('company-id');
    $('#company-id').val(company_id);
    return {'company_id':$(curent).data('company-id'),
            'user_id':$(curent).data('user-id'),
            'deal_id':$(curent).data('deal-id')};
}

function likeActivity(data,element){
    var company_id = element.attr('company-id');
    if(typeof data.like != 'undefined'){
        if(data.like){
            $('a[company-id="' + company_id + '"]').find('i').toggleClass('heartanimate');
            $('a[company-id="' + company_id + '"]').find('i').next('span').html(parseInt(element.find('i').next('span').html()) + 1);
        }
    }else{
        if(data.unlike){
            $('a[company-id="' + company_id + '"]').find('i').toggleClass('heartanimate');
            $('a[company-id="' + company_id + '"]').find('i').next('span').html(parseInt(element.find('i').next('span').html()) - 1);
        }
    }
}
function changeView(data,element){
    $('.thumbnail-select').toggleClass('active');
    $('.row-select').toggleClass('active');
    if($('.thumbnail-select').hasClass('active')){
        $('span.deals-filter ul li label').attr('mj-value','1')
        $('.label-cat-filter').attr('mj-value','1')
    }else{
        $('span.deals-filter ul li label').attr('mj-value','0')
        $('.label-cat-filter').attr('mj-value','0')
    }
    $('article .section-body-ajax div.main-cat-deal-thumbnail').remove();
    $('article .section-body-ajax div.main-cat-deal-list').remove();
    $('article section.section-body-ajax').append(data);
    unveilCall();
    defImd('.cat-deal-box .def-img');
    defImd('.general-row-deal .def-img');
}
	//like lazy background for def image
	function defImd(el){
        $(el).each(function(){
            $(this).addClass('sr-only');
            var defImg = $(this).attr('src');
            defImg = defImg.replace(/ /g, '%20');
            $(this).parent().css({
                'background-image':'url('+defImg+')',
                'background-size':'cover'
            })
        })
    }

function changeFilter(data,element){
    $('article .section-body-ajax div.main-cat-deal-thumbnail').remove();
    $('article .section-body-ajax div.main-cat-deal-list').remove();
    element.prev('input').prop('checked',true);
    $('article section.section-body-ajax').append(data);
    unveilCall();
    var $outNava, $mainHeight, $mainWrap, $mainWrapHeight;
	$mainWrap = $('.wrapper-2');
	$mainWrapHeight = $mainWrap.height();
	$outNava = $('#nava').outerHeight() + 100;

	if ($mainWrapHeight < $outNava) {
		$mainWrap.css({
			'min-height': $outNava
        })
    }

    var url = window.location.pathname;
    var gender = $('input[name="gender_filter"]:checked').val();
    var category = $('input[name="cat_filter"]:checked').val();
    if (typeof category === "undefined") {
        var category = $('#category-slug').val();
    }
    var liUrl = url.replace(/c:(.+)/,'c:' + category + '?gender=' + gender);
    $('li.row-select').attr('mj-target',liUrl);
    $('li.thumbnail-select').attr('mj-target',liUrl);

    $('.label-gender')
    .each(function() {
        var newUrl = $(this).attr('mj-target').replace(/c:(.+)\?/,'c:'+category+'?');
        $(this).attr('mj-target',newUrl);
    });

    $('.label-cat-filter')
    .each(function() {
        var newUrl = $(this).attr('mj-target').replace(/\/?gender=(.+)/,'gender='+gender);
        console.log(newUrl);
        $(this).attr('mj-target',newUrl);
    });
}


function deleteFromBasket(data,element){
    $deal_id = $(element).parents('div.basket-item').attr('nb-deal-id');
    $newBasketQuantiy = parseInt($('i.basket-item-quantity').text() ) - 1;
    $newBasketQuantiy2 = parseInt($('span.basket-item-quantity').text()) - 1;
    $('i.basket-item-quantity').text('');
    $('i.basket-item-quantity').text($newBasketQuantiy);
    $('span.basket-item-quantity').text('');
    $('span.basket-item-quantity').text($newBasketQuantiy2);
    $('div[nb-deal-id='+$deal_id+']').remove();
    if($newBasketQuantiy == 0){
        window.location.href = '/baskets/';
    }else{
        if ($('.basket-item[nb-postal]').length < 1){
            $('div#address-section').remove();
        }
        calcTotalPrice();
    }
}

function basketGiftCode(data,element){
    deal_code = [];
    category_code = [];

    //@todo data.campaign_relation is undefined some how.
    $.each( data.campaign_relations, function( key, value ) {

      if(value.class == 'Deal'){
        deal_code.push('deal_' + value.foreign_id)
      }else if(value.class == 'Category'){
        category_code.push('cat_'+ value.foreign_id)
      }
    });

    var min = data.min_price;
    if (!min || min == ''){
        min = 0;
    }
    console.log(data);
    newGift(min/10,data.value/10,data.percentage,deal_code,category_code,data.code);
}

function addToBasket(data,element){
    if(element.data('type')=='basket' && data){
      $newBasketQuantiyD = parseInt($('i.basket-item-quantity').text() )+ 1;
      $newBasketQuantiyR = parseInt($('span.basket-item-quantity').text() )+ 1;
      $('i.basket-item-quantity').text('');
      $('i.basket-item-quantity').text($newBasketQuantiyD);
      $('span.basket-item-quantity').text('');
      $('span.basket-item-quantity').text($newBasketQuantiyR);
    }else if(element.data('type') != 'basket'){
       window.location.href = '/baskets/';
    }
    successBtnBg();
}

function  prepairAddToBasket(d){
    if (d.e.data('type') == 'buy'){
        d.data += '&buy=1';
    }
    preloadBtnBg();
    return d;
}

function successComment (data,element){
    //$(element).parent('div.showMoreWrapper').prev().html(data).addClass('_open');
    $('#commentBox').html('');
    $('#commentBox').html(data).addClass('_open');
    $(element).addClass('_open');
    $(element).removeAttr('mj-type');
   // document.getElementById('moreQa').innerHTML ='<h1>ggg</h1>';
   // console.log(madjax.var.value)
}

function getCurrentCommentId (){
}
function prepareReplyClientSide (data){
    $('#mainQBody').val('');
    $('#mainQId').val('');
    $('#adminreply').val('');
    $('#admin_reply_id').val('');
    $('#typeQ').val('');
    if(typeof data.typeQ !== "undefined" && data.typeQ=='admin'){
        console.log('ADMIN');
        $('.title-admin').html('ویرایش پاسخ نت برگ');
        $('#mainQBody').prop('disabled', true);
        $('#typeQ').val('admin');

    }else{
        $('#mainQBody').prop('disabled', false);
        $('.title-admin').html('ارسال پاسخ به سوال');

    }
    console.log('DATA',data);
    $('#mainQBody').val(data.question);
    $('#mainQId').val(data.question_id);
    $('#status').prop('checked', false);
    $('#deal_id').val(data.deal_id);

    $('#defaultAnswers').val(0);

    if(typeof data.reply_id !=='undefined' &&
                data.reply_id != null){
        $('#adminreply').val(data.reply_body);
        $('#admin_reply_id').val(data.reply_id);

    }else{
        $('#adminreply').val('');
    }
    if(typeof data.question !=='undefined' &&
                data.questionStatus == true
        ){
        $('#status').prop('checked', true);
    }
    //bluck for DefaultAnswers
    $tempCheckDefaultAnswers = [];
    $("#defaultAnswers option").each(function()
    {
        $tempCheckDefaultAnswers.push($(this).val());
    })
    if($tempCheckDefaultAnswers.length==0){
        var options = [];
        var options = [{"text" : "انتخاب پاسخ به صورت دستی","value":0}];
        for (var key in data.default_answers) {
            options.push({"text" : data.default_answers[key].title, "value":data.default_answers[key].description,"selected":true})
        }
        var selectBox = document.getElementById('defaultAnswers');

        for(var i = 0, l = options.length; i < l; i++){
            var option = options[i];
            selectBox.options.add( new Option(option.text, option.value, option.selected) );
        }
    }
    //end bluck


}
function deleteComment(data,element){
    $.get( "/comment/comments/getComments/"+data.deal_id, function( data ) {
    $( "#commentBox" ).html( data );
    });
}
function responseDataCommentAdmin(data,element){
    $(".madJaxWait").addClass("hidden");
    $.get( "/comment/comments/getComments/"+data.deal_id, function( data ) {
        $( "#commentBox" ).html( data );
        $('#editQ').modal('hide');
        $(".madJaxWait").addClass("hidden");
    });
}
function responseDataComment (data,element,result){
    if(result.status==true){
        element.parent('form.comment-form').trigger('reset');
        $(".madJaxWait").addClass("hidden");
    }
    grecaptcha.reset();
}
function responseDataCommentModal (data,element){
    element.parent('form.comment-form').trigger('reset');
    $('.nb-btn').prop('disabled',true).addClass('nb-btn-disabled');
    grecaptcha.reset();
}

function getCurrentRatingtId (){
    var current = $('.acb-row');
    var ids = [];
    $.each(current, function(i, v){
        ids.push($(this).data('rating-id'))
    })
    return {data:ids};
}

function successRating (data,element){
    $('.article-comment-box').append(data);
    var valueTarget = $('#raing_page_count').val();
    if(valueTarget){
        $('.article-comment .showMoreWrapper button').attr('mj-target',valueTarget);
    }else {
        $('.showMoreWrapper').remove();
    }
    $('#raing_page_count').remove();
}

function successNewRating (data,element){
    $('.rating-box').removeClass('active');
    $(element).addClass('active');
    $("#rate-value").val($('label.active').attr('rate-value'));
    // madjax.fn.alert({status: true,message: window.msg.successRate});
}

function successUserNewRating (data,element,result){
    var dealId = ".deal-id-"+result.deal_id
    var rate = result.rate;
    if(rate == "1"){
        $(dealId).find("i").removeClass();
        $(dealId).removeClass("happy neutral");
        $(dealId).find("i").addClass("icon icon-sad-face");
        $(dealId).addClass("active sad");
    } else if (rate == "3") {
        $(dealId).find("i").removeClass();
        $(dealId).removeClass("happy sad");
        $(dealId).find("i").addClass("icon icon-normal-face");
        $(dealId).addClass("active neutral");
    } else {
        $(dealId).find("i").removeClass();
        $(dealId).removeClass("sad neutral");
        $(dealId).find("i").addClass("icon icon-happy-face");
        $(dealId).addClass("active happy");
    }
    $('.rating-box').removeClass('active');
    $(element).addClass('active');
    $("#rate-value").val($('label.active').attr('rate-value'));
    // madjax.fn.alert({status: true,message: window.msg.successRate});
}

function checkRating() {
    if($('label.active').attr('rate-value') == undefined) {
        madjax.fn.alert({status: false,message: window.msg.rateValue});
        return false;
    } else if ($("#opinion").val() == '') {
        madjax.fn.alert({status: false,message: window.msg.submitRate});
        return false;
    } else {
        return true;
    }
}

function successGiftCard (data,element){
    if($('#giftCardModalTrigger').length){
        $('.modal-body-gift').html(data);
        $('#giftCardModalTrigger').trigger('click');
    }else{
        $('.part2').html(data);
    }

    $('.section-rating').hide();
    $('.hidden-rating-article').hide();
}

function successUserProfileGiftCard (data,element,result){
    $('.rating-data').html(data);
    var DealId = $('#rate-deal-id').val();
    $(".text-rate-" + DealId).attr('data-original-title','امتیاز شما قبلا ثبت شده است.')
    $(".deal-id-" + DealId).attr('href','javascript:;')
    $(".deal-id-" + DealId).removeAttr('mj-target mj-type mj-method data-toggle mj-success mj-values data-target');
}


function successGiftCardNotification (data,element){
    $(".gift-rating-notification").append(data['code']);
    $("#percent-num-notif").html(data['percentage']);
    $("#percent-text-notif").html(data['percentageText']);
    $('.box-comment').slideUp(400);
    if ($('.rate-notif').hasClass('desktop-notif')) {
      $('.box-comment').slideUp(400);
          $('.rate-notif').animate({bottom:30},'100');
          setTimeout(function(){
              if ($('.box-off-code').hasClass('active')) {
                  var code = $('.box-off-code');
                  code.removeClass('c-rotate1');
                  code.addClass('c-rotate2');
                  code.siblings('.box-notif').addClass('n-rotate2');
              }
          }, 300);
      }else {
          $('.box-comment').slideUp('100');
          $('.box-notif2').fadeOut('100',function(){
              setTimeout(function (){
                  $('.box-off-code2').addClass('show-h').animate({ 'height': '294'}, 0);
              }, 200);
            });
    }
}

//function checkstar
function checkstar(){
    var starval = $('.star-hidden-input').val();
    if(starval == 0){
        madjax.fn.alert({status: false,message: window.msg.starReq});
        return false;
    } else {
        return true;
    }
}

function updateUserInfo(data,element){
    $('.avatar-info .name').text(data.first_name + ' ' + data.last_name);
    $('duv#complete-info').hide();
}

//get city basedon state in add address
function setStateCities(data, element, result){
    var _select = $('select[name="city_id"]');
    var template = '';
    var pre = '<option>انتخاب شهر</option>';
    var count = Object.keys(data).length;
    for (var x = 0; x < count; x++){
        template += '<option value="'+ Object.keys(data)[x] +'">'+ data[Object.keys(data)[x]] +'</option>'
    }
    _select.html(pre + template);
}

function subscribeEmail(data,element){
    if(data){
        $(".newslatter input[name='email']").val('');
        $(".madJaxWait").addClass("hidden");
    }

}

$(document).ready(function(){
    $('.buy-with-wallet').on('submit',function(){
        $(".madJaxWait").removeClass("hidden");
    });
});
