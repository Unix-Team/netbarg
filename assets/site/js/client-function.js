//this fonction use in comment section in deal view  
//reply comment  for setiing current comment_id

function setCurrentCommentId(e){	
	var comment_id = $(e).attr('data-reply-id');
	var deal_id = $(e).attr('data-deal-id');
	// set iframe url for parameters
	$('#reply').children().children().children('div .modal-body.clearfix').children('iframe').attr('src','/comment/comments/dealModalComment/'+comment_id+'/'+deal_id);
}
// function prepare default answer for reply admin
function prepareReplyAdminComment(e){
	var defaultAnswer= $( "#defaultAnswers option:selected").val();

	$("#adminreply").val(defaultAnswer);
	console.log(defaultAnswer);
}
;