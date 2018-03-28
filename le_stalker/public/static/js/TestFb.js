function requestPost(){
  FB.api('/me/feed', {fields: 'from,picture,message,place'}, function(response) {

    //console.log(response.data);
    let listPost = new Array();
    let exist = true;
    for (let id_post in response.data){
      let post = response.data[id_post];
      if ("place" in post && "from" in post && "message" in post && "picture" in post){
        let dico = {}
        dico.name = post.from.name;
        dico.picture = post.picture;
        dico.message = post.message;
        dico.lat = post.place.location.latitude;
        dico.long = post.place.location.longitude;
        listPost.push(dico);
      }
    }
    console.log(listPost);
  });
}
