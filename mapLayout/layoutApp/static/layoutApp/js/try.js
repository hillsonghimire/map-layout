//global variables
var district, province, ganapa,jdata,a;



var mymap = L.map('map')
mymap.setView([28.2096, 83.9856], 7.4);
var backgroundLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGlsbHNvbmdoaW1pcmUiLCJhIjoiY2treXJ0OG1mMDRjYjJ2bGJnODVla2k0ayJ9.syGn5ve5d3b2-kmax821wg', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
});
mymap.addLayer(backgroundLayer);



let jsondata = "";
let apiUrl = "http://127.0.0.1:8000/provinceData/"


async function getJson(url) {
    let response = await fetch(url);
    let data = response.json()
    return data;
}

async function main() {
    jsondata = await getJson(apiUrl)
    layerData(jsondata); //province function call
}
main();























//district function
function data(x) {
    district = new L.geoJSON(responsedData, {
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.first_dist) {
                layer.bindPopup(feature.properties.first_dist, {
                    closeButton: false,
                    offset: L.point(0, -20)
                });
                layer.on('mouseover', function () {
                    layer.openPopup();
                });
                layer.on('mouseout', function () {
                    layer.closePopup();
                });
            }




            function showingData(){
                var onshow= layer.on('click', function (event) {

                var id = feature.properties.first_dist;
                fetch("http://127.0.0.1:8000/ganapaData/", {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    //make sure to serialize your JSON body
                    body: JSON.stringify({
                        Name: id
                    })
                }).then(function (response) {
                    return response.json();
                }).then(function (response) {
                    responsedData = response;
                    eachLayer(district);
                    // polystyle();
                    data1(response); //district function call


                });
                mymap.setView(event.latlng), 17;
                mymap.fitBounds(layer.getBounds());
            })
        }
    },
    }).addTo(mymap);

}



//polygon boundary function
function polystyle(feature) {
    return {
        fillColor: 'green',
        opacity: 0.99,
        weight: 0,
        color: '#ffffff', //Outline color
        fillOpacity: 0
    };
}

function eachLayer(layer) {
    mymap.removeLayer(layer);
}


//Province data Function
function layerData(x) {
    var province = new L.geoJSON(jsondata, {
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.first_dist) {
                layer.bindPopup(feature.properties.first_dist, {
                    closeButton: false,
                    offset: L.point(0, -20)
                });
                layer.on('mouseover', function () {
                    layer.openPopup();
                });
                layer.on('mouseout', function () {
                    layer.closePopup();
                });
            }
            layer.on('click', function (event) {
                console.log(event);
                var id = feature.properties.first_stat;
                fetch("http://127.0.0.1:8000/districtJson/", {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    //make sure to serialize your JSON body
                    body: JSON.stringify({
                        Name: id
                    })
                }).then(function (response) {
                    return response.json();
                }).then(function (response) {
                    responsedData = response;
                    console.log(responsedData);
                    eachLayer(province);
                    data(response); //district function call





                });
                mymap.setView(event.latlng), 14;
                mymap.fitBounds(layer.getBounds());
            })
        },
    }).addTo(mymap);
}



//Gapa
function data1(x) {
    ganapa = new L.geoJSON(responsedData, {
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.palika) {
                layer.bindPopup(feature.properties.palika, {
                    closeButton: false,
                    offset: L.point(0, -20)
                });
                layer.on('mouseover', function () {
                    layer.openPopup();
                });
                layer.on('mouseout', function () {
                    layer.closePopup();
                });
            }
        },
    }).addTo(mymap);
}


// var select = document.getElementById("selectNumber"); 
// var options =  features.length
// console.log(jdata);

// Optional: Clear all existing options first:
// select.innerHTML = "";
// Populate list with options:
// for(var i = 1; i < (jsondata.features.length)+1; i++) {
//     var opt = jsondata.features[i].properties.first_dist[i];
//     select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
// }