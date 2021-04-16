

	var map = L.map('mapid').setView([29, 85], 7);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(map);

    // $.getJSON("{% url 'districtData' %}",function(data){
    //     console.log(data);
    //     L.geoJSON(data).addTo(map);
    // })

    // loading data to leaflet from db
    fetch("http://127.0.0.1:8000/districtData/")
        .then((response) => response.json())
        .then((responsedata)=> L.geoJSON(responsedata).addTo(map));