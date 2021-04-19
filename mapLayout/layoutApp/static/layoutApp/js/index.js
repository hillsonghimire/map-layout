var mymap = L.map('map').setView([28, 84], 7);
var url = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGlsbHNvbmdoaW1pcmUiLCJhIjoiY2treXJ0OG1mMDRjYjJ2bGJnODVla2k0ayJ9.syGn5ve5d3b2-kmax821wg'
L.tileLayer(String(url), {
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1,
}).addTo(mymap);

var districtFetch = async function () {
	let response = await fetch("http://127.0.0.1:8000/district/");
	let districtJSON = await response.json()
	return districtJSON;
}

districtFetch().then(
	(districtJSON) => {
		L.geoJson(districtJSON).addTo(mymap);
	}

);

var ndviDist = 'MUSTANG'
const earthEngineFetch = async () => {
	const response = await fetch("http://127.0.0.1:8000/selectDistrict/", {
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
			featureName: ndviDist,
		})
	})
	const context = await response.json();
	return String(context.tile)
}

earthEngineFetch().then(
	(EEtileULR) => {
		L.tileLayer(EEtileULR).addTo(mymap);
	}
);