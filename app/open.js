let Db = require('./../utils/db.js');
let Users = new Db('./storage/user.json',[]);

document.addEventListener("DOMContentLoaded", function(event) {
$('body ').css('overflow','hidden')
$('.site_header ').hide()
$('.grid-col.col-2 ').hide()
$('.section_account-title ').hide()

$('.section_facebook').hide()
$('.page_account.login-register').css('padding-left','10px')
	$.ajax({
		type: "POST",
		url: "/account_header_v2.html",
		dataType: "json"
	}).done(function (response, textStatus, jqXHR) {
		let token = response.data.token;
		if (token.length>0) {
		let user_data = Users.read();
		user_data.push({token:token});
		Users.write(user_data);
		// location.href = 'https://www3.olx.com.br/account/do_logout';
		}
	})


});