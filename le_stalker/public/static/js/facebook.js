window.fbAsyncInit = function() {
 FB.init({
	 appId      : '929000163934820',
	 cookie     : true,
	 xfbml      : true,
	 version    : 'v2.12'
 });

 FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
 });

};

function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
};

function connect(){
  FB.login(function(response){
    statusChangeCallback(response);
  });
};

function disconnect(){
  FB.logout(function(response){
    statusChangeCallback(response);
  });
};

function statusChangeCallback(response) {
	if(response.status == "connected"){

		//FB.logout();
		FB.api('/me', {fields: 'name,picture'}, function(response) {
			$("#loginButton").hide();
      $("#logoutButton").show();
      $("#idname").html(response.name).css('color','white').show();
      $("#idPic").attr("src", response.picture.data.url).show();
		});
		console.log("Connected");

		var token = response.authResponse.accessToken;
		let data = {}
		data.token = token;
		$.ajax({
			method: "POST",
			url: "/lapin",
			contentType: "application/json",
			data: JSON.stringify(data)
		})
	}
	else{
		//FB.login();
    $("#loginButton").show();
    $("#logoutButton").hide();
    $("#idname").hide();
    $("#idPic").hide();
	}
 	console.log(response);
}

function requestPost(){
  FB.api('/me/feed', {fields: 'from,picture,message,place'}, function(response) {

    //console.log(response.data);
    let listPost = new Array();
    let exist = true;
    for (let id_post in response.data){
      let post = response.data[id_post];
      if ("place" in post && "from" in post && "message" in post){
        let dico = {}
        dico.name = post.from.name;
        dico.picture = post.picture;
        dico.message = post.message;
        dico.lat = post.place.location.latitude;
        dico.lng = post.place.location.longitude;
        listPost.push(dico);
      }
    }
    console.log(listPost);
		fillMap(listPost);
  });
}

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
