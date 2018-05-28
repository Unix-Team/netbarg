$(document).ready(function() {
	$('.emailcheck, .phonenumber-check,.password-check,select.required-input,.postal-check,.idcode-check').parent().siblings('.hint').hide();
	var validateEmail = function(elementValue) {
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
		return emailPattern.test(elementValue);
	}
	var validatePost = function(postalvalue) {
		var Postpattern = /^[0-9]{10}$/;
		return Postpattern.test(postalvalue);
	}

	var validateIdCode = function(IdCodevalue) {
		// console.log('asdsad');
		var IdCodepattern = /^[0-9]{10}$/;
		return IdCodepattern.test(IdCodevalue);
	}

	var validateCard = function(Cardvalue) {
		// console.log('asdsad');
		var Cardpattern = /^[0-9]{4}$/;
		return Cardpattern.test(Cardvalue);
	}

	var validatePhonenumber = function(phonevalue) {
		var phonenumberpattern = /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig;
		return phonenumberpattern.test(phonevalue);
	}
	var validatePassWord = function(passvalue) {
		var passWordpattern = /^[a-zA-Z0-9._!@#$%^&*()_+{}|?-]{6,100}$/;
		return passWordpattern.test(passvalue);
	}

	// $('.emailcheck').parent().siblings('.hint').html(msg.email_valid);
	// $('.postal-check').parent().siblings('.hint').html(msg.post_valid);
	// $('.idcode-check').parent().siblings('.hint').html(msg.IdCode_valid);
	// $('.phonenumber-check').parent().siblings('.hint').html(msg.phonenumber_valid);
	// $('.password-check').parent().siblings('.hint').html(msg.passWord_valid);
	// $('.password-check2').siblings('.hint').html(msg.passWord_valid);

	$(document).on('blur keyup', '.justnumber,.phonenumber-check,.postal-check,.idcode-check', function () {
		var num = {'۰': '0','۱': '1','۲': '2','۳': '3','۴': '4','۵': '5','۶': '6','۷': '7','۸': '8','۹': '9'};
		if ( this.value.slice(-1) in num ){
			this.value = this.value.replace(/[^\d]/, num[this.value.slice(-1)]);
		} else {
			this.value = this.value.replace(/[^\d]/, '');
		}
	});

	$('.phonenumbervalid').keypress(function(e){
		var numFa = {'۰': '0','۱': '1','۲': '2','۳': '3','۴': '4','۵': '5','۶': '6','۷': '7','۸': '8','۹': '9'};
		var text = String.fromCharCode(e.which);
		var keyCode = e.keyCode;
		if ( text in numFa ){
			this.value = this.value.replace(/[^\d]/, numFa[this.value.slice(-1)]);
		}else if(keyCode == 8 || keyCode == 13 || keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40 || text < 10){
			return true;
		} else {
			return false;
		}
	});

	$(document).on('blur', '.emailcheck', function() {
		$(this).parent().siblings('.hint').html(msg.email_valid);
		var value = $(this).val();
		var valid = validateEmail(value);
		if (!valid) {
			$(this).addClass('red');
			$(this).parent().siblings('.hint').show();
			return false;
		} else {
			$(this).removeClass('red');
			$(this).parent().siblings('.hint').hide();
		}
	});

	$(document).on('keyup blur','.phonenumbervalid', function() {
		$(this).parent().siblings('.hint').html(msg.phonenumber_valid);
		var value = $(this).val();
		var valid = validatePhonenumber(value);
		if (!valid) {
			$(this).addClass('red');
			$(this).parent().siblings('.hint').show();
			return false;
		} else {
			$(this).removeClass('red');
			$(this).parent().siblings('.hint').hide();
		}
	});

	$(document).on('blur', '.postal-check', function() {		
		$(this).parent().siblings('.hint').html(msg.post_valid);
		var value = $(this).val();
		var valid = validatePost(value);
		if (!valid) {
			$(this).addClass('red');
			$(this).parent().siblings('.hint').show();
			return false;
		} else {
			$(this).removeClass('red');
			$(this).parent().siblings('.hint').hide();
		}
	});

	$(document).on('blur', '.idcode-check', function() {
		$(this).parent().siblings('.hint').html(msg.IdCode_valid);
		var value = $(this).val();
		var valid = validateIdCode(value);
		if (!valid) {
			$(this).addClass('red');
			$(this).parent().siblings('.hint').show();
			return false;
		} else {
			$(this).removeClass('red');
			$(this).parent().siblings('.hint').hide();
		}
	});

	$(document).on('blur', '.password-check', function() {
		$(this).parent().siblings('.hint').html(msg.passWord_valid);
		var value = $(this).val();
		var valid = validatePassWord(value);
		if (!valid) {
			$(this).addClass('red');
			$(this).parent().siblings('.hint').show();
			return false;
		} else {
			$(this).removeClass('red');
			$(this).parent().siblings('.hint').hide();
		}
	});
	$(document).on('blur', '.password-check2', function() {
		$(this).siblings('.hint').html(msg.passWord_valid);
		var value = $(this).val();
		var valid = validatePassWord(value);
		if (!valid) {
			$(this).addClass('red');
			$(this).siblings('.hint').show();
			return false;
		} else {
			$(this).removeClass('red');
			$(this).siblings('.hint').hide();
		}
	});

	$(document).on("blur", "input[name='first_name'],input[name='last_name'],input[name='user_profile[first_name]'],input[name='user_profile[last_name]']", function() {
		if ($.trim($(this).val()).length == 0) {
			$(this).parent().siblings('.hint').html(msg.required_input)
			$(this).addClass('red');
			$(this).parent().siblings('.hint').show();
			$('.required-input').on('keyup',function() {		
				if ($.trim(!$(this).val()).length >= 1) {
					$(this).removeClass('red');
					$(this).parent().siblings('.hint').hide();
				}
			});
		}
	})
	
	$('input[name*="name"]').on('focusout',function() {
		var n = $(this);
		if (n.val().length !== 0) {
			n.removeClass('red');
			n.parent().siblings('.hint').hide();
			
		}
	});
	// $('.idcode-check,.emailcheck,.phonenumber-check,.password-check,.postal-check').keyup(function() {
	//     $('.postal-check').parent().siblings('.hint').html(msg.post_valid);
	//     $('.idcode-check').parent().siblings('.hint').html(msg.IdCode_valid);
	//     $('.emailcheck').parent().siblings('.hint').html(msg.email_valid);
	//     $('.phonenumber-check').parent().siblings('.hint').html(msg.phonenumber_valid);
	//     $('.password-check').parent().siblings('.hint').html(msg.passWord_valid);
	//     // var value = $(this).val();
	//     // var valid = validateEmail(value);
	//     // if (!valid) {
	//     //     $(this).addClass('red');
	//     //     $(this).parent().siblings('.hint').show();
	//     // } else {
	//     //     $(this).removeClass('red');
	//     //     $(this).parent().siblings('.hint').hide();
	//     // }
	// });


	//@todo fix .hasClass()
	// $(document).on('click','.checkbox-toggle', function () {
	//
	//     if($(this).hasClass('required-chechbox checked')){
	//         // var n = $(this).find('input');
	//         $(this).closest('form').find('button[type="submit"]').removeAttr('disabled');
	//     } else {
	//         $(this).closest('form').find('button[type="submit"]').attr("disabled","disabled");
	//     }
	// });

	$(document).on("click", "button[type='submit']", function() {
		var isFormValid = true;
		$(this).closest('form').find("input[name='first_name'],input[name='last_name'],input[name='idcoder'],input[type='password'],input[name='useremail'],input[name='user_profile[first_name]'],input[name='user_profile[last_name]'],inpu[name='friend_email'],select.required-input,.required-input").each(function() {
			if ($.trim($(this).val()).length == 0) {
				$(this).parent().siblings('.hint').html(msg.required_input)
				isFormValid = false;
				$(this).addClass('red');
				$(this).parent().siblings('.hint').show();
				$('.required-input').keyup(function() {
					if ($.trim(!$(this).val()).length >= 1) {
						$(this).removeClass('red');
						$(this).parent().siblings('.hint').hide();
					}
				});
			}
			$(this).closest('form').find(".single-select.required-input").each(function() {
				// alert($("select[name='city_id']").val());
				var ss_val = $(this).val();
				if (ss_val == 'انتخاب شهر' || ss_val == "") {
					$(this).addClass('red');
					$(this).parent().siblings('.hint').show();
					isFormValid = false;
				} else {
					$(this).removeClass('red');
					$(this).parent().siblings('.hint').hide();
				}
			});
			$(this).closest('form').find(".required-input.red").each(function() {
				isFormValid = false;
			});
		});
		if (isFormValid) {
			$(this).attr('mj-valid', true);
		} else {
			$(this).attr('mj-valid', false);
		}
		return isFormValid;
	});

	$(document).on('change', '.single-select.required-input', function() {
		$(this).removeClass('red');
	})

	$(document).on('blur', '.password_confirm', function() {
		$(this).siblings('.hint').html(msg.pass_verify);
		if ($('.password_validation').val() == $('.password_confirm').val()) {
			$(this).removeClass('red');
			$('.password_confirm').siblings('.hint').hide();
			//console.log('sasas')

		} else {
			$(this).addClass('red');
			$('.password_confirm').siblings('.hint').show();

		}
	});
	
	$(document).on('blur', '.password_confirm2', function() {
        $(this).parent().siblings('.hint').html(msg.pass_verify);
        if ($('.password_validation').val() == $('.password_confirm2').val()) {
            $(this).removeClass('red');
            $('.password_confirm2').parent().siblings('.hint').hide();
            //console.log('sasas')
        } else {
            $(this).addClass('red');
            $('.password_confirm2').parent().siblings('.hint').show();
        }
	});
	
	$(document).on('click', '.pass-re-conf button[type="submit"]', function() {
		if ($('.password_validation.red')[0]) {
			return false;
		} else {
			return true;
		}
	})
	$(document).on('click', '.cop-form button[type="submit"]', function() {
		if ($('.cop-form input').val() == '') {
			return false;
		} else {
			return true;
		}
	})

	// add the rule here
})