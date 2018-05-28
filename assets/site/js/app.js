//@todo check for any modify or changes if u need dynamic logic.
$(function() {

    "use strict";

    //messages
    window.msg = {
        'email_valid': 'لطفا آدرس ایمیل خود را به درستی وارد نمایید',
        'phonenumber_valid': 'لطفا شماره همراه خود را به درستی وارد نمایید',
        'post_valid': 'لطفا کد پستی خود را صحیح وارد نمایید',
        'IdCode_valid': 'لطفا کد ملی خود را وارد نمایید',
        'passWord_valid': 'لطفا حداقل 6 کاراکتر وارد نمایید',
        'required_input': 'پر کردن فیلد الزامی می باشد',
        'pass_verify': 'رمز عبور یکسان نیست',
        'serverErr': 'مشکل در برقراری ارتباط با سرور',
        'starReq': 'لطفا امتیاز بدهید',
        'checkRating': 'لطفا میزان رضایت خود را درباره نت برگ تعیین کنید.',
        'checkRatingText' : 'لطفا نظر خود را یادداشت نمایید.',
        'successRate' : 'امتیاز شما با موفقیت ثبت شد.',
        'rateValue' : 'لطفا امتیاز خود را ثبت کنید.',
        'submitRate' :  'امتیاز شما ثبت شده، برای دریافت کد تخفیف، نظرتان را ثبت نمایید.',
        'rateError' : 'نظر شما قبلا ثبت شده است.'

    };

    window.netbarg = {};
    window.netbarg.fn = {};

    $('body,html').animate({
        scrollTop: 0
    }, 0);

    var body = $('body');

    // alert(JSON.stringify(bowser, null, '    '));
    //browser detect
    if (bowser.msie) {
        body.addClass('msie');
    } else if (bowser.gecko) {
        body.addClass('gecko');
    } else if (bowser.safari) {
        body.addClass('safari');
    } else if (bowser.chrome) {
        body.addClass('chrome');
    }

    if (bowser.ios) {
        body.addClass('ios');
    }


    var resizeEnd;
    $(window).on('resize', function() {
        clearTimeout(resizeEnd);
        resizeEnd = setTimeout(function() {
            $(window).trigger('resize-end');
        }, 100);
    });

    //All Functions
    function reCalculate() {
        window.headerHeight = $('.header').height() + $('top-ads-row').height() + 3;
    };
    reCalculate();
    // $(document).on('click', 'a.deal-like', function (e) {
    //     e.preventDefault();
    //     $(this).find('i').toggleClass('heartanimate');
    // });

    //background header format
    if ($('.page-home')[0]) {
        $('body > header').css({
            'background': '#fff'
        })
    }

    // spam html tag remover
    function spamHTremover(ele) {
        $(ele).each(function() {
            if ($(this).text() == '' || $(this).html() == '&nbsp;') {
                $(this).remove();
            }
        })
    }
    spamHTremover('.highlights > *');
    spamHTremover('.conditions > *');

    //like lazy background for def image
    function defImd(el) {
        $(el).each(function() {
            $(this).addClass('sr-only');
            var defImg = $(this).attr('src');
            if(typeof defImg != 'undefined'){
                defImg = defImg.replace(/ /g, '%20');
                $(this).parent().css({
                    'background-image': 'url(' + defImg + ')',
                    'background-size': 'cover'
                })
            }
        })
    }
    defImd('.cat-deal-box .def-img');
    defImd('.general-row-deal .def-img');
    // defImd('#carousel_2 .item a img');

    //close current alert after 3second.
    setTimeout(function() {
        $('.bar-alert .nb-alert').remove();
    }, 3000);

    //All Shared behavior
    $('.email_invalid_hint').hide();
    $('[data-toggle="tooltip"]').tooltip();

    //alert close button behavior
    $(document).on('click', '.fix-shadow, .close-fix-alert', function() {
        $('.fix-shadow').remove();
        $('.fix-alert').remove();
    });

    $('#search-box').on('keydown', function(e) {
        if ([38, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    });

    //toggle checkbox
    $(document).on('click', '.checkbox-toggle', function(e) {
        e.preventDefault();
        $(this).toggleClass('checked');
        var n = $(this).find('input');
        n.prop('checked', !n.prop('checked')).attr('checked', !n.attr('checked'));
    });

    //select radio button
    $(document).on('click', '.radio-wrapper', function(e) {
        e.preventDefault();
        $(this).find('input').prop('checked', true);
        var inputName = $(this).find('input').attr('name');
        $('body').find('input[name="' + inputName + '"]').parent().parent().removeClass('checked');
        $(this).addClass('checked');
    });

    //toggle attachment on transaction table.
    $(document).on('click', '.toggle-me', function() {
        var p = $(this).parents('tr').next();
        $('.toggle-me').not($(this)).removeClass('open');
        $(this).toggleClass('open');
        $('.attachment').not(p).addClass('hidden');
        p.toggleClass('hidden');
    });
    //main deal button behavior
    function main_deal_fixer() {
        if ($('.slider-detail .cp-btn')[0]) {

            if ($(window).width() >= 768) {
                var _in = $('.sd-parent-detail').height() - 40;
                var _out = $('.slider-detail').height();
                var _calc = ((_out - _in) - 40) / 2;
                _calc = (_calc <= 0 ? 0 : _calc + 5);
                $('.slider-detail .cp-btn').css('padding-top', _calc + 'px');
            } else {
                $('.slider-detail .cp-btn').css('padding-top', '0');
            }

        }
    };
    main_deal_fixer();
    // toggle hidden number in (my netbarg) table.
    window.netbarg.fn.moreCode = function moreCode() {

        if ($('.open-me').length == 0) {
            $('td.more').each(function() {
                var t = $(this);
                var l = t.find('span.code').length;
                if (l > 1) {
                    t.find('span.code').not(':first').addClass('hidden');
                    t.append('<i class="icon icon-arrow-down open-me"></i>');
                }
            });
        }

    };

    // toggle hidden number in (my netbarg) table.
    $(document).on('click', '.open-me', function() {
        var p = $(this).parent();
        var sp = p.find('span.code');
        if (!sp.hasClass('hidden')) {
            p.find('span.code').not(':first').addClass('hidden');
            p.removeClass('opened');
        } else {
            sp.removeClass('hidden');
            p.addClass('opened');
        }
    });

    // toggle search box in small devices.
    $('.toggle-search-js').on('click', function() {
        $('.toggle-hidden').toggleClass('active');
    });
    $('.search-close').on('click', function() {
        $('.toggle-hidden').toggleClass('active');
    });

    //clean search text
    $('.search-clean').on('click', function() {
        $(this).addClass('hidden');
        $('.header .search input').val('');
    });

    // toggle burger menu.
    $('.burger-icon').on('click', function() {
        var icon = $(this);
        var b = $('.burger-menu-right');
        var fix = b.find('.fix');
        var wr = b.find('.wrapper');

        b.removeClass('out');
        $('body').addClass('overflow-hidden');
        fix.stop().css('opacity', '0').animate({
            'opacity': '1'
        }, 300);
        wr.stop().css('right', '-270px').animate({
            'right': '0'
        }, 300);
        $('.burger-menu-right .wrapper').scrollTop(0);

    });

    //shadow behavior when burger menu is open in mobile
    $('.burger-menu-right .fix').on('click', function() {
        var fix = $(this);
        var b = $('.burger-menu-right');
        var wr = b.find('.wrapper');

        fix.stop().animate({
            'opacity': '0'
        }, 300);
        wr.stop().animate({
            'right': '-270'
        }, 300, function() {
            b.addClass('out');
            $('body').removeClass('overflow-hidden');
            fix.css('opacity', '1');
            wr.css('right', '0')
        });
    });

    $(document).on('click', '.burger-menu-right .dropdown-menu a', function(e) {
        $('.burger-menu-right .fix').click();
    });

    //close alert
    $(document).on('click', '.nb-alert i.icon-close', function() {
        $(this).parent().remove();
    });

    // extend jquery ui library.
    $.extend($.ui.slider.prototype.options, {
        dragAnimate: true
    });

    var _mouseCapture = $.ui.slider.prototype._mouseCapture;
    $.widget("ui.slider", $.extend({}, $.ui.slider.prototype, {
        _mouseCapture: function(event) {
            _mouseCapture.apply(this, arguments);
            this.options.dragAnimate ? this._animateOff = false : this._animateOff = true;
            return true;
        }
    }));

    //rating behavior
    $(".starIt").slider({
        isRTL: true,
        step: 20,
        animate: 300,
        create: function(event, ui) {
            var node = document.createElement("I");
            var textnode = document.createTextNode("");
            node.appendChild(textnode);
            node.className = "rate-num";
            event.target.lastChild.appendChild(node);
        },
        change: function(event, ui) {
            var rateNum = ui.value / 20;
            $('.rate-num').html((rateNum == 0 ? '' : rateNum));
            $('.star-hidden-input').val(rateNum);
            ui.handle.offsetParent.setAttribute('data-v', rateNum);
        },
        slide: function(event, ui) {
            if (ui.value == 0) {
                //console.log("must show an alert that user can not rate as zero.");
            }
            var rateNum = ui.value / 20;
            $('.rate-num').html((rateNum == 0 ? '' : rateNum));
            $('.star-hidden-input').val(rateNum);
            ui.handle.offsetParent.setAttribute('data-v', rateNum);
        }
    });

    function sideSubCat() {

        var sc = $('main .sc');
        sc.hover(function(e) {

            var t = $(this),
                ul = t.children('ul'),
                ulH = ul.height(),
                li = ul.children('li'),
                liH = li.height();

            if (!t.hasClass('calc')) {

                for (var i = 0; i < 7; i++) {
                    $(this).children('ul').children('li:lt(10)').wrapAll('<div class="nb-col clearfix"></div>'); // do u wanna more in one column?
                }

                var len = $(this).find('.nb-col').length,
                    width = $(this).find('li').outerWidth();

                $('.nb-col').css('width', width + 'px');

                //@todo any chang on css must be consider
                ul.css('width', ((len * (width + 11)) + 11) + 'px'); //both 11 is for margin padding gap

                t.addClass('calc');

            }

        }, function() {})

    }

    sideSubCat();

    /*
     * fix header on scroll
     */

    $(document).on('scroll', function(e) {
        if ($(window).width() > 991) {
            var s = $(this).scrollTop();
            var top_ads_row = 0;
            if ($('.top-ads-row')[0]) {
                top_ads_row = $('.top-ads-row').height();
            }

            if (s > window.headerHeight + top_ads_row + 50) {
                if ($("header .nb-alert")[0]) {}
                if ($('header .nb-alert').length >= 1) {

                    $('header .header').addClass('fill');
                    $('header .bar').addClass('nb-fix');
                } else {
                    $('header .header').addClass('fill').addClass('jump');
                    $('header .bar').addClass('nb-fix').addClass('jump');
                }
            }
            if (s < window.headerHeight + top_ads_row) {
                $('header .bar').removeClass('nb-fix').removeClass('jump');
                $('header .header').removeClass('fill').removeClass('jump');
            }
        }
    });

    //resize side cat
    $(window).on('resize', function() {
        reCalculate();
        sideCatFixer();
    });

    $(window).on('resize-end', function() {
        main_deal_fixer();
    });

    //@todo
    $(window).load(function() {
        sideCatFixer();
    });

    //main sticky height
    var $main, $outNava, $mainHeight, $mainWrap, $mainWrapHeight;
    $main = $('main');
    $mainWrap = $('.wrapper-2');
    $mainHeight = $main.height();
    $mainWrapHeight = $mainWrap.height();
    $outNava = $('#nava').outerHeight() + 100;
    if ($mainWrap[0] && $mainWrapHeight < $outNava) {
        $mainWrap.css({
            'min-height': $outNava
		})
		$mainWrap.find($('[id*="nava"]')).addClass('nosticky');
    }
    if ($mainHeight < $outNava) {
        $main.css({
            'min-height': $outNava
		})
		$mainWrap.find($('[id*="nava"]')).addClass('nosticky');
    } else {
        $(document).bind("DOMSubtreeModified", function() {
            $mainHeight = $main.height();
            if ($mainHeight < $outNava) {
                $main.css({
                    'min-height': $outNava
				})
				$mainWrap.find($('[id*="nava"]')).addClass('nosticky');
            }
        })
    }
    //sticky right && left asides
    function navaFn() {
        var offTopNava;
        if ($('.wrapper-1')[0] && !$('.wrapper-2')[0]) {
            offTopNava = $('.wrapper-1').offset().top;
            offTopNava = offTopNava + 15;
            //console.log('0:true 1:false')
        }
        if (!$('.wrapper-1')[0] && $('.wrapper-2')[0]) {
            offTopNava = $('.wrapper-2').offset().top;
            offTopNava = offTopNava - 70;
            //console.log('0:false 1:true')
        }
        if (!$('.wrapper-1')[0] && !$('.wrapper-2')[0]) {
            offTopNava = $('#nava').offset().top;
            //console.log('0:false 1:false')
        }
        if ($('.wrapper-1')[0] && $('.wrapper-2')[0]) {
            offTopNava = $('.wrapper-2').offset().top;
            var extra = 0;
            if ( $('.header_alert_wrapper .nb-alert')[0] ) {
                extra = -50;
            }
            offTopNava = offTopNava + extra;
        }

        if ( window.navDebug ){
            console.warn('offTopNava: ', offTopNava, ' scrolltop: ', $(window).scrollTop());
            if( window.navDebugValue ) {
                offTopNava = window.navDebugValue;
            }
        }//live debug

        $('#nava').affix({
            offset: {
                top: offTopNava,
                bottom: ($('footer').outerHeight(true) + 150)
            }
        });
        $('#nava2').affix({
            offset: {
                top: offTopNava,
                bottom: ($('footer').outerHeight(true) + 150)
            }
        });
    }
    if ($('#nava')[0] || $('#nava2')[0]) {
        navaFn();
        $(window).resize(function() {
            navaFn();
        });
    }

    //scroll spy
    var sections = $('.cat-big-small article'),
        nav = $('.float-cat');
    if ($('.cat-big-small')[0]) {

        $(window).on('scroll', function() {
            var cur_pos = $(this).scrollTop();
            cur_pos = cur_pos + 300;
            sections.each(function() {
                var top = $(this).offset().top;
                var bottom = top + $(this).outerHeight();
                if (cur_pos >= top && cur_pos <= bottom) {
                    nav.find('a').removeClass('active');
                    sections.removeClass('active');
                    $(this).addClass('active');
                    nav.find('a[class="' + $(this).attr('id') + '"]').addClass('active');
                } else if (cur_pos >= bottom && cur_pos <= top) {
                    sections.removeClass('active');
                    $('.float-cat a.active').removeClass('active');
                } else if ($('.cat-big-small').offset().top > nav.find('a').offset().top) {
                    sections.removeClass('active');
                    $('.float-cat a.active').removeClass('active');
                }
            });
        });
    }

    //back to top
    $('.backtotop').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    })
    $('.page-signinup a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });

    //-----------------    data-star-rate ------------
    $('.datasr').each(function() {
        var StarRate = $(this).data('star-rate');
        var StarRateResult = Math.round(StarRate);
        StarRateResult = 5 - StarRateResult;
        $(this).find('.icon').slice(0, StarRateResult).addClass('gray-star');
        // $(this).css({'width':rateResult+'%'});
        // $(this).parents('.prog-bar').siblings().find('.data-current-rate').append(currentRate);
    })


    // edit form.
    $(document).on('click', '.p-edit', function() {

        var index = $(this).prev('.label-parent').children('input').val();
        var url = $(this).data('url');
        $.get(url + '/' + index, function(data) {
            $('.ajax-address').parent().addClass('dis-block');
            $('.ajax-address').html(data);
            $('.ajax-address').find('.bt-cancel').on('click', function() {
                $('.ajax-address').parent().removeClass('dis-block');
                $('.ajax-address').parent().prev('div').removeClass('dis-no');
            });
            netbarg.fn.labelAnimate();

            $('html, body').animate({
                scrollTop: $(".ajax-address").offset().top - 50
            }, 400);
        });

    });

    $(document).on('click', '.transaction-detail', function() {
        if ($(this).parents('tr').next().attr('class') == 'attachment') {
            var Data = {};
            var e = $(this);
            Data = {
                foreign_key: $(this).data('value1'),
                class_id: $(this).data('value2')
            };
            var url = '/transactions/view';
            $.post(url, Data, function(data) {
                e.parents('tr').next().find('tbody').html(data);
            });
        }
    });

    $(document).on('click', '.transaction-detail-mb', function() {
        if ($(this).find('table#transaction')) {

            var Data = {};
            var e = $(this);
            Data = {
                foreign_key: $(this).data('value1'),
                class_id: $(this).data('value2')
            };
            var url = '/transactions/view';
            $.post(url, Data, function(data) {
                e.find('table#transaction tbody').html(data);
            });
        }
    });

    //add address and edit address
    $(document).on('click', '.add-address', function() {
        var parent = $(this).parent();
        var next = parent.next();
        var url = $(this).data('url');
        parent.addClass('dis-no');
        $.get(url, function(data) {
            next.addClass('dis-block');
            $('.ajax-address').html(data);
            next.find('.bt-cancel').on('click', function() {
                next.removeClass('dis-block');
                parent.removeClass('dis-no');
            })
            netbarg.fn.labelAnimate();

        });
    });

    //@todo
    // $(document).on('click','.bag .collapse-group button.btn', function (e) {
    //     e.preventDefault();
    //     var $this = $(this);
    //     var $collapse = $this.closest('.collapse-group').find('.collapse');
    //     $collapse.toggleClass("dis-block");
    // });

    $(".nb-select2").select2({
        language: "fa",
        dir: "rtl",
        theme: "classic",
        placeholder: "انتخاب محله"
        //allowClear: true
    });

    //@todo
    //label-animate
    $(document).ready(function() {
        $('.input-label-animate input, .input-label-animate textarea').each(function() {
            var n = $(this);
            // if (n.val()) {
            // 	n.parent().find('label').addClass('hascontent');
            // }
            n.on('input', function() {
                n.parent().find('label').addClass('hascontent');
            })
        });
    });

    window.netbarg.fn.labelAnimate = function labelAnimate() {

        $('.input-label-animate input, .input-label-animate textarea').each(function() {

            var n = $(this);
            if (n.val()) {
                n.parent().find('label').addClass('hascontent');
            } else {
                n.parent().find('label').removeClass('hascontent');
            }

            n.on('focusin', function() {
                n.parent().find('label').addClass('hascontent');
                $('.nb-signinup-wrapper').each(function() {
                    if ($(this).find($('input[type="email"]')).val()) {
                        $(this).find($('input[type="password"]')).prev().addClass('hascontent');
                    }
                })
            });
            n.on('focusout', function() {
                if (n.val().length == 0) {
                    n.parent().find('label').removeClass('hascontent');
                }
            });
        });
        $('.nb-signinup-wrapper').each(function() {
            if ($(this).find($('input[type="email"]')).val()) {
                $(this).find($('input[type="password"]')).prev().addClass('hascontent');
            }
        })

    };

    //main modal
    //example: netbarg.fn.mainModal([true,true,true],'','111','222','333');
    window.netbarg.fn.mainModal = function(section, classes, header, body, footer) {

        var m = $('#mainModal'),
            h = m.find('.modal-header'),
            h4 = m.find('.modal-title'),
            b = m.find('.modal-body'),
            f = m.find('.modal-footer');

        m.removeClass().addClass('modal nb-modal fade').addClass(classes);

        if (!section[0]) {
            h.addClass('hidden')
        } else {
            h.removeClass('hidden')
        }

        if (!section[1]) {
            b.addClass('hidden')
        } else {
            b.removeClass('hidden')
        }

        if (!section[2]) {
            f.addClass('hidden')
        } else {
            f.removeClass('hidden')
        }

        h4.text(header);

        b.html(body);

        f.html(footer);

        m.modal('show');

    };

    //confirm modal behavior (codal)
    //example: <a class="codal" codal-url="/" codal-ms="do u?" codal-method="delete" codal-fid="123">delete</a>
    $(document).on('click', '.codal', function(e) {

        e.preventDefault();

        var t = $(this),
            url = t.attr('codal-url'),
            method = t.attr('codal-method'),
            fID = t.attr('codal-fid'),
            ms = t.attr('codal-ms'),
            success = t.attr('codal-success'),
            body = '<p>' + ms + '</p>',
            footer = '<button type="button" class="nb-btn nb-btn-sm nb-btn-border" mj-success="' + success + '" mj-type="single" mj-target="' + url + '" mj-method="' + method + '" mj-value="' + fID + '">بلـه</button>' +
                '<button type="button" data-dismiss="modal" aria-label="Close" class="nb-btn nb-btn-sm nb-btn-border">خیـر</button>';

        netbarg.fn.mainModal([false, true, true], 'conf-modal', '', body, footer);

    });

    //change url based on selected tab.
    var hash = window.location.hash;
    if (hash.match("^#tab")) {
        $('a[data-target="' + hash + '"]').trigger('click');
    }

    //scroll to top in profile
    if ($('.profile-page')[0]) {
        $(window).scrollTop(0);
    }

    //config madjax alert
    madjax.fn.alert = function(d) {
        if (typeof d.message == 'undefined') {
            return false;
        }
        $('.nb-alert').remove();

        var template = '<div class="nb-alert nb-alert-' + (d.status ? 'success' : 'danger') + '">' + d.message + '<i class="icon icon-close"></i></div>';

        var delay = 100;
        if (!d.unClose) {
            if(!$('.nb-modal:visible').hasClass('not-hide')){
                $('.nb-modal').modal('hide');
            }
            d.delay = 500;
            delay = 500;
            d.close = 3000;
        }

        if (typeof d.delay != 'undefined') {
            delay = d.delay;
        }

        setTimeout(function() {

            if ($('.nb-modal').hasClass('in')) {

                $('.nb-modal .modal-dialog').prepend(template);

            } else {

                if ($('.header_alert_wrapper')[0]) {
                    $('.header_alert_wrapper').html(template);
                } else {
                    $('body').append(template);
                }

            }

        }, delay);

        if (typeof d.close != 'undefined') {
            setTimeout(function() {
                $('.nb-alert').remove();
            }, d.close + delay);
        }

        return true;
    };

    madjax.fn.ajaxErr = function(e) {

        var template = '<div class="nb-alert nb-alert-danger">' + msg.serverErr + '<i class="icon icon-close"></i></div>';

        if ($('.nb-modal').hasClass('in')) {

            $('.nb-modal .modal-dialog').prepend(template);

        } else {

            $('.header_alert_wrapper').html(template);

        }

    };

    // $(".flip-card").flip({
    // 	trigger: 'manual'
    // });

    // //flip between sign-in and sign-up card
    // $(document).on('click', '.flip-btn', function () {
    // 	$(".flip-card").flip('toggle');
    // });

    //extend carousel plugin by swipe
    $('#upSide').swipe({

        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

            if (direction == 'left') $(this).carousel('prev');
            if (direction == 'right') $(this).carousel('next');

        },
        allowPageScroll: "vertical"

    });
    $('.nb-carousel').swipe({

        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

            if (direction == 'left') $(this).carousel('next');
            if (direction == 'right') $(this).carousel('prev');

        },
        allowPageScroll: "vertical"

    });

    netbarg.fn.labelAnimate();
    netbarg.fn.moreCode();

    // basket success bank
    $(window).load(function() {
        $('.trigger').addClass("drawn");
    });

    // basket and all lazy-load
    $(".main-row img,.under-slider-banner img,.figure-ads-baner img").unveil();


    // deActive deal row
    function deActiveDeal() {
        var deActiveEl = $('.deactive-deal');
        deActiveEl.find('button').prop("disabled", true);
    }

    // deActiveDeal();


    //countdown
    function secondsToHMS(e) {
        var t = Math.floor(e / 86400);
        e -= 86400 * t;
        var n = Math.floor(e / 3600);
        e -= 3600 * n;
        var o = Math.floor(e / 60);
        return e -= 60 * o, e = Math.floor(e), {
            day: t,
            hour: n,
            minute: o,
            second: e
        }
    }

    function every(e, t) {
        var n = t;
        var b = secondsToHMS(n);
        e.find("._d").text(b.day), e.find("._h").text(b.hour), e.find("._m").text(b.minute), e.find("._s").text(b.second);
        setTimeout(function() {
            var t = secondsToHMS(n);
            e.find("._d").text(t.day), e.find("._h").text(t.hour), e.find("._m").text(t.minute), e.find("._s").text(t.second), n--, n >= 0 && every(e, n)
        }, 1e3)
    }

    $(".countdown").each(function() {
        var e = $(this),
            t = e.attr("nb-server-time"),
            n = e.attr("nb-end-time"),
            o = (n - t > 0 ? n - t : 0),
            r = o / 1e3;

        every(e, r)
    });


    //test carousel 3
    var thumbCarousel = $('#thumbCarousel'),
        upSide = $('#upSide');
    thumbCarousel.carousel(0);
    var $thumbItems = thumbCarousel.find('.item');
    upSide.on('slide.bs.carousel', function(event) {

        var $slide = $(event.relatedTarget);
        var thumbIndex = $slide.data('thumb');
        var curThumbIndex = $thumbItems.index($thumbItems.filter('.active').get(0));
        if (curThumbIndex > thumbIndex) {
            thumbCarousel.one('slid.bs.carousel', function(event) {
                thumbCarousel.carousel(thumbIndex);
            });
            if (curThumbIndex === ($thumbItems.length - 1)) {
                thumbCarousel.carousel('next');
            } else {
                thumbCarousel.carousel(curThumbIndex - 1);
            }
        } else {
            thumbCarousel.carousel(thumbIndex);
        }

    });

    upSide.on('slid.bs.carousel', function(event) {
        thumbCarousel.find('.thumb').removeClass('active');
        $('[data-slide-to="' + upSide.find('.active').index() + '"]').addClass('active');
    });

    //toggle-modal
    $(document).on('click', '.toggle-modal', function(e) {
        e.preventDefault();
        var target = $(this).data('target');
        $('.modal').modal('hide');
        $(target).modal('show');
    });

    //accordion for q-a, desc, details in deal page.
    $(document).on('click', '.q-a .header, .desc .header, .details ._1 .header, .details ._2 .header', function(e) {
        if ($(e.target).hasClass('menu-link')) {
            return;
        }
        var t = $(this),
            p = t.parent();

        p.toggleClass('_open');

    });

    //showMore button (deal page)
    $(document).on('click', '.showMore', function() {
        var t = $(this),
            target = t.data('target');

        if (!t[0].hasAttribute('mj-type')) {
            t.toggleClass('_open');
            $(target).toggleClass('_open');
        }
    });

    //hide fix button
    if ($('.page-deal')[0]) {

        $(document).on('scroll', function(e) {

            if ($(window).width() < 768) {
                var a = $('section.related').offset().top,
                    b = $(window).scrollTop(),
                    c = $(window).height();

                if ((b + c) > a) {
                    $('.bill .sideBySideBtn, .bill .chooseIt').addClass('hidden');
                } else {
                    $('.bill .sideBySideBtn, .bill .chooseIt').removeClass('hidden');
                }
            }

        });

    }

    // social btn window load for login and register
    $('.social-btn').on('click', function() {
        var url = $(this).data('url');
        var newwindow = window.open(url, 'name', 'height=400,width=600');
        if (window.focus) {
            newwindow.focus();
        }
    });

    //success function for load more comments in deal page
    function afterComments() {
        $('#moreComments').removeAttr('mj-type').addClass('_open'); //for stop mad-jax
    }

    //success function for load more q-a in deal page
    function afterQa() {
        $('#moreQa').removeAttr('mj-type').addClass('_open'); //for stop mad-jax
    }


    //------------- modal map ---------


    $('#openBtn').click(function() {
        var frameSrc = $(this).data('src-map');
        //console.log(frameSrc)
        $('iframe').attr("src", frameSrc);
        // $('#myModal').modal({show:true})
    });

    //------------------ page jumper -------------
    function pageJumper(jumper) {
        var pF = $(jumper);
        // var pFHeight = $('.page-basket .fixed-fab').height();
        // pFHeight = pFHeight + 100;
        pF.click('on', function() {
            $('html, body').stop().animate({
                scrollTop: $($(this).data('href')).offset().top - 65
            }, 500);
        });
    }

    pageJumper('.datahref');

    // -----------------  merchant rating ---------
    $('.pb-rate').each(function() {
        var currentRate = $(this).data('currentrate');
        var totalRate = $(this).data('totalrate');
        var rateResult = (currentRate * 100) / totalRate;
        $(this).css({
            'width': rateResult + '%'
        });
        $(this).parents('.prog-bar').siblings().find('.data-current-rate').append(currentRate);
    });

    //-------------- 404 dynamic height ---------------
    function p404Height() {
        $('.page-404').each(function() {
            var p404Top = $(this).offset().top;
            var wH = $(window).height();
            var p404H = wH - p404Top;
            //console.log(p404H);
            if (p404H > 599) {
                $(this).find('.bf-img').css('height', p404H - 100 + 'px');
            } else {
                $(this).find('.bf-img').css('height', p404H + 'px');
            }
        })
    }

    if ($('.page-404')[0]) {
        p404Height();
        $(window).resize(function() {
            p404Height()
        });
    }

    //static js
    //counter for static-4yourbusiness chart
    $(document).on('scroll',
        function counterfunc() {
            var part1_h = $('.body-urbusiness .part1').height();
            var offset1 = part1_h - 70;
            var wscroll = $(window).scrollTop();
            if (wscroll >= offset1) {
                if (!window.nb_counter) {
                    window.nb_counter = true;
                    $('.count').delay(1200).each(function() {
                        $(this).prop('Counter', 0).animate({
                            Counter: $(this).attr('data-count')
                        }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function(now) {

                                $(this).text('+ ' + Math.ceil(now).toLocaleString());
                            }
                        });
                    });
                }
            }
        });


    // $(document).on('scroll', function (e) {
    //     var s = $(this).scrollTop();
    // });

    //static js
    //hint :owl-carousel read doc : https://owlcarousel2.github.io/OwlCarousel2/
    $(".slide_show1 .owl-carousel").owlCarousel({
        loop: true,
        rtl: true,
        margin: 0,
        dots: true,
        /*autoplay: true,*/
        autoplayTimeout: 6000,
        smartSpeed: 1000,
        mouseDrag: true,
        touchDrag: true,
        center: true,
        items: 1,
        nav: false
    });
    $(".slide_show2 .owl-carousel").owlCarousel({
        rtl: true,
        mouseDrag: true,
        touchDrag: true,
        center: true,
        /* items: 1,*/
        nav: true,
        loop: true,
        margin: 30,
        dots: true,
        autoplayTimeout: 6000,
        smartSpeed: 600,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 5
            },
            992: {
                items: 5
            },
            1200: {
                items: 5
            }
        }

    });
    // OWL BTNS
    $('.owl_btns .next').click(function() {
        var target = $(this).parents('.owl_btns').data('target');
        $(target).trigger('next.owl.carousel');
    });
    $('.owl_btns .prev').click(function() {
        var target = $(this).parents('.owl_btns').data('target');
        $(target).trigger('prev.owl.carousel');
    });

    var syncslide1 = $(".slide_show1 .owl-carousel");
    var syncslide2 = $(".slide_show2 .owl-carousel");

    syncslide2.on('dragged.owl.carousel', function(property) {
        $('.slide_show1 .owl-dot:eq(' + property.page.index + ')').click();
    });
    syncslide1.on('dragged.owl.carousel', function(property) {
        $('.slide_show2 .owl-dot:eq(' + property.page.index + ')').click();
    });

    //static-4yourbusiness js portfolio
    $('.page-urbusiness .cat_list .item1').each(function() {
        $(this).hover(function() {
            var n = $(this).find('span'),
                w = n.width();
            n.stop().animate({
                left: '50%',
                marginLeft: '-' + w / 2 + 'px'
            }, 600);

        }, function() {
            var n = $(this).find('span'),
                w = n.width();
            n.stop().animate({
                left: '20px',
                marginLeft: '0'
            }, 600);
        });
    });

    //static-4yourbusiness  scroll window to form part
    $(document).on('click', '.body-urbusiness .scrollbtn1', function(e) {
        var form_part = $('.body-urbusiness .part6').offset().top - 100;
        $('html ,body').animate({
            scrollTop: form_part
        }, 1500);
    });

    //profile-page scroll to address-pro
    $(document).on('click', '.profile-page  button.outer-btn.p-edit', function(e) {
        var form_part = $('.profile-page .address-pro').offset().top - 150;
        $('html ,body').animate({
            scrollTop: form_part
        }, 800);
    });

    //header
    $('.header form.search input').on('keydown', function() {
        var c = $('.header form.search .icon-close');
        if ($(this).val().length >= 1) {
            c.removeClass('hidden');
        } else {
            c.addClass('hidden');
        }
    });

    if ($('.page-deal')[0]) {
        ellipsis();
    }

    //newsletter js
    var newsLetterCity = $('.newslatter span[data-id]');
    newsLetterCity.on('click', function(e) {
        $('#city-name').text($(this).text());
        $('#newsLetterCityId').val($(this).attr('data-id'))
    });

    //page-profile check for add address
    /*if ( $('.profile-page')[0] ){
     if ( $('.text-addr').length < 1 ){
     $('.add-address').click();
     }
     }*/

    $(document).on('click', '.pagination li a', function(e) {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });

    //empty all input and textarea that is not hidden
    $('.nb-modal').on('show.bs.modal', function(e) {
        var inputs = $(this).find('input').not('[type="hidden"]').not('.do-not-empty');
        var textarea = $(this).find('textarea').not('.do-not-empty');

        inputs.each(function() {
            $(this).val('');
        });
        textarea.each(function() {
            $(this).val('');
        });
    });

    //fill search input
    var el = $('#searchFor');
    if ( el.text().indexOf('جستجو برای') == 6){
        var l = el.text().length;
        var w = el.text().substr(17,l);
        $('#search-box').val(w);
    }
}); //document.ready

/*
 * side cat handler
 */
function sideCatFixer(h) {

    if (!h) {
        var newHeight;
        if ($('.slider-detail')[0]) {
            newHeight = $('.slider-detail').outerHeight();
        } else if ($('.slider-full')[0]) {
            newHeight = $('.slider-full').outerHeight();
        } else if ($('.side-cat-box.equal')[0]) {
            newHeight = $('.side-cat-box').outerHeight();
        } else {
            newHeight = 450;
        }
        h = h | newHeight;
    }

    var sc = $('main .side-cat'),
        li = sc.children(),
        a = li.children('a'),
        q = li.length;

    a.height((h / q) - 1).css('line-height', ((h / q) - 1) + 'px');
};

//fix side-cat height immediately.
var side_cat_checker = setTimeout(function () {

    var h = 0;

    if ($('.slider-detail')[0]) {
        h = $('.slider-detail').outerHeight();
    }
    if ($('.slider-full')[0]) {
        h = $('.slider-full').outerHeight();
    }
    if ($('.side-cat-box.equal')[0]) {
        h = $('.side-cat-box').outerHeight();
    }

    if ( h > 50 ) {
        clearTimeout(side_cat_checker);
        sideCatFixer(h);
    }

},100);

function ellipsis() {
    $(".ellipsis").dotdotdot({
        ellipsis: '... ',
        wrap: 'word',
        fallbackToLetter: true,
        after: null,
        watch: window,
        height: null,
        tolerance: 0,
        callback: function(isTruncated, orgContent) {},
        lastCharacter: {
            remove: [' ', ',', ';', '.', '!', '?'],
            noEllipsis: []
        }
    }); // ellipsis
}

//sync button with checkbox
//put same attribute (sync-byButton="example") on both label and submit button
$(document).on('click', 'label[sync-byButton]', function(e) {

    var t = $(this).parent().children('input[type="checkbox"]'),
        r = $(this).attr('sync-byButton'),
        v = t.is(':checked'); //return status before change occurred.

    if (v) {
        $('.btn[sync-byButton="' + r + '"],.nb-btn[sync-byButton="' + r + '"],button[sync-byButton="' + r + '"]')
            .prop("disabled", true)
            .addClass('nb-btn-disabled');
    } else {
        $('.btn[sync-byButton="' + r + '"],.nb-btn[sync-byButton="' + r + '"],button[sync-byButton="' + r + '"]')
            .prop("disabled", false)
            .removeClass('nb-btn-disabled');
    }

});

//static js
//hint: read doc: http://mynameismatthieu.com/WOW/docs.html
wow = new WOW({
    animateClass: 'animated',
    boxClass: 'wow',
    /* offset:50,*/
    mobile: true,
    live: false
});
wow.init();

//loading for add to basket button
function preloadBtnBg() {
    var t = $('.sideBySideBtn');
    t.addClass('preload');
    t.find('[data-type="basket"]').attr('disabled', true);
    return true;
}

//success for add to basket button
function successBtnBg() {
    var t = $('.sideBySideBtn');
    t.removeClass('preload').addClass('added');
    t.find('[data-type="basket"]').removeAttr('disabled');
    setTimeout(function() {
        t.removeClass('added');
    }, 2000);
}


// basket counter cookie reader
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = document.cookie;
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//cities map modal on header menu
$(document).ready(function() {
    var checkValue = getCookie('BasketItems');
    if (checkValue != '') {
        $.get("/baskets/getBasketQuantity.json", function(data, status) {
            if (data != "" && data !== 0) {
                $('.basket-item-quantity').text(data);
            }
        });
    }

    $('#mapModal li a').mouseover(function() {
        var id = $(this).attr("class");
        $("#" + id).css({
            "fill": "#d8b232"
        });
    });
    $('#mapModal li a').mouseout(function() {
        var id = $(this).attr("class");
        $("#" + id).css({
            "fill": "#b8ce5b"
        });
    });

    $('#mapModal .area').mouseover(function() {
        var city_id = $(this).attr("id");
        $("." + city_id).addClass("path-hover");
        $(this).css({
            "fill": "#d8b232"
        });
    });
    $('#mapModal .area').mouseout(function() {
        var city_id = $(this).attr("id");
        $("." + city_id).removeClass("path-hover");
        $(this).css({
            "fill": "#b8ce5b"
        });
    });

    //404 page for img animate
    $(window).load(function() {
        if ($('.page-404')[0]) {
            $('.i-404.i-rc').addClass('fadeIn').show();
            $('.i-404.i-wc').addClass('slideInUp').show();
            $('.i-404.i-tr').addClass('bounceInUp').show();
        }
    });
    //input to split 3 digit
    $(document).on('keyup', '.profile-page .bag .pay-key input[type=text]', function(e) {

        var pnum = $('.profile-page .bag .pay-key input[type=text]');
        var paynumber = pnum.val();

        if (paynumber.length >= 15) {
            paynumber = paynumber.substr(0, 15);
        }

        paynumber = paynumber.replace(',', '').replace(',', '').replace(',', '').replace(',', '').replace(',', '');

        pnum.next().val(paynumber);
        var paynumber2 = paynumber.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        pnum.val(paynumber2);
    });
   //star rate percent in deal page
    function starRate() {
        function $(v, o) { return ((typeof (o) == 'object' ? o : document).getElementById(v)); }
        function $S(o) { return ((typeof (o) == 'object' ? o : $(o)).style); }
        function agent(v) { return (Math.max(navigator.userAgent.toLowerCase().indexOf(v), 0)); }
        function abPos(o) { var o = (typeof (o) == 'object' ? o : $(o)), z = { X: 0, Y: 0 }; while (o != null) { z.X += o.offsetLeft; z.Y += o.offsetTop; o = o.offsetParent; }; return (z); }
        function XY(e, v) { var o = agent('msie') ? { 'X': event.clientX + document.body.scrollLeft, 'Y': event.clientY + document.body.scrollTop } : { 'X': e.pageX, 'Y': e.pageY }; return (v ? o[v] : o); }

        star = {};
        star.update = function (e, o) {
            var n = star.num, v = parseInt($('.starUser').innerHTML);
            n = o.id.substr(4); $('.starCur').title = v;
        };

        star.revert = function () {
            //var n = star.num, v = parseInt($('.starCur' + n).title);

            $S('.starCur').width = Math.round(v * 84 / 50) + 'px';
            $('.starUser').innerHTML = (v > 0 ? Math.round(v) / 10 : '');
            $('.starUser').style.color = '#888';

            document.onmousemove = '';
        };

        star.num = 0;
    }

    if ($('.star-rate-per').length > 0){
        starRate();
    }

    //circle progress bar
    function circleProgressBar() {
        var data1 = Math.round(parseInt($('.circle-progress .prog-bar1').data('value')));
        var data2 = Math.round(parseInt($('.circle-progress .prog-bar2').data('value')));
        var data3 = Math.round(parseInt($('.circle-progress .prog-bar3').data('value')));
        if((data1 + data2 + data3 < 100)  && ((data1 + data2 + data3) != 0)){
            data1 = 100 - (data3 + data2);
        }

       $('.prog-bar1').circleProgress({
           value: data1 / 100,
           fill: {
               gradient: ["#bbd641", "#6eb921"]
           },

       }).on('circle-animation-progress', function (event, progress) {
           $(this).find('span.prog-bar-num').html(Math.round(data1 * progress) + '<i>%</i>');
       });

       $('.prog-bar2').circleProgress({
           value: data2 / 100,
           fill: {
               gradient: ["#ffd30f", "#ff8201"]
           },
       }).on('circle-animation-progress', function (event, progress) {
           $(this).find('span.prog-bar-num').html(Math.round(data2 * progress) + '<i>%</i>');
       });

       $('.prog-bar3').circleProgress({
           value: data3 / 100,
           fill: {
               gradient: ["#fe7c7c", "#d33f3f"]
           },

       }).on('circle-animation-progress', function (event, progress) {
           $(this).find('span.prog-bar-num').html(Math.round(data3 * progress) + '<i>%</i>');
       });


       $('.page-deal ._1 .star-rate-per,.page-deal ._1 .circle-progress').hover(
           function () {
               $(".circle-progress").stop().fadeIn(200);
           },
           function () {
               $(".circle-progress").stop().fadeOut(200);
           }
       );
    }
    if($('.circle-progress').length > 0){
        circleProgressBar();
    }



    //animate rate-notification
    function rateNotif() {
       if ($('.rate-notif').length > 0) {
           $('.rate-notif .icon-close').click(function () {
               $('.rate-notif').fadeOut(300);
           });
           setTimeout(function () {
               $.ajax({
                   global: false,
                   url: "/deal_users/getLastDealuser",
                   success: function (reslut) {
                       if (reslut['status']) {
                           if ($('.rate-notif').hasClass('desktop-notif')) {
                               $('.circle-deal').addClass('active');
                           }
                           $('.happy').attr("mj-target", reslut['happyUrl']);
                           $('.neutral').attr("mj-target", reslut['neutralUrl']);
                           $('.sad').attr("mj-target", reslut['sadUrl']);
                           $('#deal-user-id').val(reslut['dealUser']['id']);
                           $("#rating-deal-img").append(reslut['deal']['img']);
                           $(".text1").html(reslut['company']['text']);
                           if ($('.circle-deal').hasClass('active') || $('.show-mobile-notif').hasClass('active')) {
                               $('.box-notif2').fadeIn(300);//*
                               $('.rate-notif .border-effect').addClass("show-animate");
                               setTimeout(function () {
                                   $('.rate-notif .border-effect').removeClass("show-animate");
                                   $('.box-notif .content-part').animate({ opacity: 0 }, '0');
                                   $('.box-notif').addClass('show-text');
                                   $('.box-notif .content-part').animate({ opacity: 1 }, '0');
                                   $('.close-icon').fadeIn(500);
                               }, 800);

                               $('.rate-notif .emoji_box label').click(function () {
                                   $('.box-comment').slideDown(500);
                                   if ($('.rate-notif').hasClass('desktop-notif')) {
                                       $('.rate-notif').animate({ bottom: 0 }, '100');
                                   }//*
                               });
                           }
                       } else {
                           return false;
                       }
                   }
               });
           }, 10000);
       }
   }
   rateNotif();

    if(localStorage.getItem('green_netbarg_modal') != 1 && $('#greenModal').length > 0 && $(document).width() > 320){
        setTimeout(function () {
            localStorage.setItem('green_netbarg_modal',1);
            $('#greenModal').modal();
        },5000);
    }
}); //document
