window.fbAsyncInit = function() {
 FB.init({
	 appId      : '929000163934820',
	 cookie     : true,
	 xfbml      : true,
	 version    : 'v2.10'
 });

 //FB.AppEvents.logPageView();

 FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
 });


 function checkLoginState() {
	 FB.getLoginStatus(function(response) {
		 statusChangeCallback(response);
	 });
 }


};
function statusChangeCallback(response) {
 console.log(response);
}
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
