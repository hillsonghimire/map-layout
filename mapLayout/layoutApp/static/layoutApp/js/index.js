var mymap = L.map('map').setView([28, 84],7);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGlsbHNvbmdoaW1pcmUiLCJhIjoiY2treXJ0OG1mMDRjYjJ2bGJnODVla2k0ayJ9.syGn5ve5d3b2-kmax821wg', {
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1
}).addTo(mymap);

let jsondata = "";
let apiUrl = "http://127.0.0.1:8000/district/"

async function getJson(url) {
	let response = await fetch(url);
	let data = await response.json()
	return data;
}

async function main() {
	jsondata = await getJson(apiUrl);
	console.log(jsondata)
	L.geoJSON(jsondata, {
		onEachFeature: function (feature, layer) {
			layer.bindPopup(feature.properties.first_dist + '<br/> <a href="#">Zoom</a>');
			layer.on('click', function (event) {
				// mymap.setView(event.latlng, 12);
				mymap.fitBounds(layer.getBounds());
				fetch("http://127.0.0.1:8000/selectDistrict/", {
					method: "post",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						"sec-fetch-dest": "empty",
						"sec-fetch-mode": "cors",
						"sec-fetch-site": "same-origin",
						// 'X-CSRF-TOKEN': getCookie('CSRF-TOKEN')  //Currently CSRF has been disabled
					},

					//make sure to serialize your JSON body
					body: JSON.stringify({
						// csrfmiddlewaretoken: '{{ csrf_token }}',
						featureName: event.target.feature.properties.first_dist,
					})
				})
					.then((response) => {
						console.log(response + "Sending District Name")
					});
			});
		}
	}).addTo(mymap);
};


main();
