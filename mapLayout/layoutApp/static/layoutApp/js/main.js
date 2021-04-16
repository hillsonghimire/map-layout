// function 

//     var dataurl='{% url "provinceData" %}';
//     $.getJSON(dataurl, function(data){
//     console.log(data)
//     L.geoJSON(data,{
//             onEachFeature: function(feature ,layer){
//                 layer.bindPopup(feature.properties.first_dist);
//             },
//         }).addTo(mymap);
//         });
// }

// loadJSON;


var mymap = L.map('map')
mymap.setView([27, 83], 07);
var backgroundLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
mymap.addLayer(backgroundLayer);


fetch("http://127.0.0.1:8000/provinceData")
    .then((response) =>(response.json()))
    .then((responsedata) => L.geoJSON(responsedata,{
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.first_dist);
            },
        }).addTo(mymap));
            