var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 48.8534271, lng: 2.3484859},
		zoom: 15
	});
}


function fillMap(postList){
	for(postId in postList){
		let infoPost = new google.maps.InfoWindow();
		let contentString =
						'<div>'+
						'<div>'+
            '<b>'+postList[postId].name+'</b></br>'+
						postList[postId].message+
						'<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Voir plus</button>'+
            '</div>'+
						'<div>'+
            '<img src="'+postList[postId].picture+'"></img>'
            '</div>'+
						'</div>';
						// '<div class="modal fade" id="post'+postId+'" tabindex="-1" role="dialog" aria-hidden="true">'+
						// '<div class="modal-dialog" role="document">'+
						// '<div class="modal-content">'+
						// '<div class="modal-header">'+
						// '<h5 class="modal-title">'+postList[postId].name+'</h5>'+
						// '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
						// '<span aria-hidden="true">&times;</span>'+
						// '</button>'+
						// '</div>'+
						// '<div class="modal-body">'+
						// '<img src="'+postList[postId].picture+'"></img>'+
						// postList[postId].message+
						// '</div>'+
						// '<div class="modal-footer">'+
						// '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'+
						// '<button type="button" class="btn btn-primary">Save changes</button>'+
						// '</div>'+
						// '</div>'+
						// '</div>'+
						// '</div>';

		infoPost.setContent(contentString);
		let x = new google.maps.LatLng(parseFloat(postList[postId].lat),parseFloat(postList[postId].lng));
		infoPost.setPosition(x);
		infoPost.open(map);
	}
}

function more() {

}
