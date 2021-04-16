var mymap = L.map('map').setView([28, 83], 7);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1
}).addTo(mymap);

// let data = fetch("http://127.0.0.1:8000/district/")
// 	.then((response) => response.json())
// 	.then((responseData) => {
// 		jsonData = responseData;
// 		L.geoJSON(responseData).addTo(mymap);
// 	};


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
			layer.bindPopup(feature.properties.first_dist);
			layer.on('click', function (event) {
				mymap.setView(event.latlng, 12);
				console.log(event)
				mymap.fitBounds(layer.getBounds());
			});

		}
	}).addTo(mymap);
};

main();
