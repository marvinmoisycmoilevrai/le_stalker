var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 48.8534271, lng: 2.3484859},
		zoom: 15
	});
}


function fillMap(postList){
	var autocompleteValues = [];
	for(postId in postList){
		autocompleteValues.push({"name":postList[postId].name, "lat": parseFloat(postList[postId].lat), "lng": parseFloat(postList[postId].lng)});
		let infoPost = new google.maps.InfoWindow();
		let contentString =
						'<div>'+
						'<div>'+
            '<b>'+postList[postId].name+'</b></br>'+
						postList[postId].message+
						'<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#post'+postId+'">Voir plus</button>'+
            '</div>'+
						'<div>'+
            (("picture" in postList[postId]) ? ('<img src="'+postList[postId].picture) +'"></img>' :"")+
            '</div>'+
						'</div>';

		$("#modals").append(
						'<div class="modal fade" id="post'+postId+'" tabindex="-1" role="dialog" aria-hidden="true">'+
						'<div class="modal-dialog" role="document">'+
						'<div class="modal-content">'+
						'<div class="modal-header">'+
						'<h5 class="modal-title"><b><center>'+postList[postId].name+'</center></b></h5>'+
						'<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
						'<span aria-hidden="true">&times;</span>'+
						'</button>'+
						'</div>'+
						'<div class="modal-body">'+
						'<img src="'+postList[postId].picture+'"></img>'+
						postList[postId].message+
						'</div>'+
						'<div class="modal-footer">'+
						'<button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>'+
						'<button type="button" class="btn btn-primary">Répondre</button>'+
						'</div>'+
						'</div>'+
						'</div>'+
						'</div>');

		infoPost.setContent(contentString);
		let x = new google.maps.LatLng(parseFloat(postList[postId].lat),parseFloat(postList[postId].lng));
		infoPost.setPosition(x);
		infoPost.open(map);
	}
	autocomplete(document.getElementById("searchBar"), autocompleteValues);
}


function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].name.substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
          b.addEventListener("click", function(e) {
							let value = this.getElementsByTagName("input")[0].value
              inp.value = value;
							for (i = 0; i < arr.length; i++) {
								if(arr[i].name == value){
									map.setCenter(new google.maps.LatLng(arr[i].lat, arr[i].lng));
								}
							}
							inp.value="";
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
      });
}
