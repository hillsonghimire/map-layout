var map = L.map('mapid').setView([29, 85], 7);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

$.getJSON("{% url 'districtData' %}", function (data) {
    console.log(data);
    L.geoJSON(data).addTo(map);
});

var districtfetch = function () {
    let response = await fetch("http://127.0.0.1:8000/districtData/");
    let districtdata = response.json();
    return districtdata;
}
districtfetch().then((districtdata) => {
    console.log(districtdata)
    L.geoJSON(districtdata).addTo(map)
})

// var amenity = 'School',
// var bound = '82,7,83,8',

var amenity = taginfo(id)  // does this amenity variable get the value returned by the function which is called on clicking???
function taginfo(tagid) {
    return tagid
}

var bound = getboundary(map)  // how to send this map argument from html on submit
function getboundary(map) {
    var bounds = map.getBounds().getSouth() + ',' + map.getBounds().getWest() + ',' + map.getBounds().getNorth() + ',' + map.getBounds().getEast();
    return bounds
}

// requesting data as per filter i.e. amenity and bound
const overpassfetch = async () => {
    let response = await fetch("http://127.0.0.1:8000/osmfetch/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amenity: amenity,
            bound: bound,

        })
    });
    let data = await response.json();
    return data;
}
overpassfetch().then((jsondata) => {
    console.log(jsondata),
    L.geoJSON(jsondata).addTo(map)
});
