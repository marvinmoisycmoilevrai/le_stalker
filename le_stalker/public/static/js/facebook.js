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
		requestPost();
	}
	else{
		connect();
    $("#loginButton").show();
    $("#logoutButton").hide();
    $("#idname").hide();
    $("#idPic").hide();
	}
 	console.log(response);
}

function requestPost(){
  FB.api('/me/feed', {fields: 'from,picture,message,place,id,created_time'}, function(response) {

    //console.log(response.data);
    let listPost = new Array();
    let exist = true;
    for (let id_post in response.data){
			console.log(response.data);
      let post = response.data[id_post];
      if ("place" in post && "from" in post && "message" in post){
        let dico = {}
				//idPost, date
        dico.name = post.from.name;
        dico.picture = post.picture;
        dico.message = post.message;
        dico.lat = post.place.location.latitude;
        dico.lng = post.place.location.longitude;
				dico.date = post.created_time.substring(0,7);
				dico.id_post = post.id;
        listPost.push(dico);
      }
    }

		$.ajax({
			method: "POST",
			url: "/insertPosts",
			contentType: "application/json",
			data: JSON.stringify(listPost),
			dataType: "text",
			success: function(response, statut){
				console.log(statut);
				console.log(response);
				let today = new Date();
				initMapMonths("");
			}
		});
  });
}

function initMapMonths(datestr){
	$.ajax({
		method: "GET",
		url: "/getPostsDate",
		contentType: "application/json",
		data: datestr,
		success: function(response, statut){
			console.log("response :"+response);
			generateMonths();
			fillMap(response);
		}
	});
}

function getPosts(datestr){
	$.ajax({
		method: "GET",
		url: "/getPostsDate",
		contentType: "application/json",
		data: datestr,
		success: function(response, statut){
			console.log("response :"+response);
			fillMap(response);
		}

	});
}

function generateMonths() {
	$.ajax({
		method: "GET",
		url: "/getPostsDates",
		contentType: "application/json",
		success: function(response, statut){
			let dates = response.map(date => {
	      return date.date
	    });
			dates = dates.sort();
			dates.forEach(date => {
				$("#dates").append($('<option>', {
				id : date,
        value: date,
        text : date
    		}));
	    });
			$("#dates").val(dates[dates.length-1]).change();
		}
	});
}

function envoyerPost() {
	FB.api('/me/feed', 'post', {message: $("#lapin").val()}, function(response){
		alert("Message envoyé !")
		console.log(response);
	})
}

function repondre(arg){
	$("#close"+arg).click();
	showRubriqueEnvoi();
  $("#lapin").val("@"+$("#post"+arg)[0].textContent.split("×")[0]);
};

function showRubriqueEnvoi() {
	$("#rubriqueMap").hide();
	$("#maplabelnav").removeClass("active");
	$("#rubriqueEnvoi").show();
	$("#postlabelnav").addClass("active");
}

function showRubriqueMap() {
	$("#rubriqueMap").show();
	$("#maplabelnav").addClass("active");
	$("#rubriqueEnvoi").hide();
	$("#postlabelnav").removeClass("active");
}

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
