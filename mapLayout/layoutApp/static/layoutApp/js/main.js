//global variables
var district, province, ganapa, FeatureName, returnData, opt, id, b, formdata;
var a = "";

var mymap = L.map('map', {
    center: [28.2096, 83.9856],
    zoom: 7.4,
    // layers:[mapbox,osm]

});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGlsbHNvbmdoaW1pcmUiLCJhIjoiY2treXJ0OG1mMDRjYjJ2bGJnODVla2k0ayJ9.syGn5ve5d3b2-kmax821wg', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);
// osm=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

var mymap = L.map('map', {
    center: [28.2096, 83.9856],
    zoom: 7.4,
    // layers:[mapbox,osm]

});


// var baseMaps={
//     "Mapbox":mapbox,
//     "Osm":osm
// };
// L.control.layers(baseMaps).addTo(mymap);


//function of boundary color
function polystyle(feature) {
    return {
        fillColor: 'green',
        opacity: 5,
        weight: 2,
        color: 'black', //Outline color
        fillOpacity: 5
    };
}

function submitQuery() {
    formdata = $("form").serializeArray();
    var province=formdata[0].value;
    var district=formdata[1].value.toUpperCase();
    var ganapa=formdata[2].value;
    console.log('top');
    // console.log(formdata);
    // if (formdata[2].value == "") {
    //     a = formdata[1].value.toUpperCase();
    //     b = "http://127.0.0.1:8000/districtJson/";
    // } else {
    //     a = formdata[2].value;
    //     b = "http://127.0.0.1:8000/ganapaData/";
        // for (i = 1; i <= 1; i++) {
        //     var c={};
        //     for (j = i; j <= 1; j++) {
        //         a = formdata[2].value;
        //         b = "http://127.0.0.1:8000/ganapaData/";
        //         c.key1="a"
        //         c.key2="b"
        //         console.log(c);

        //     }
        //     a = formdata[1].value.toUpperCase();
        //     console.log(a);
        //     b = "http://127.0.0.1:8000/ganapaData1/";
        //     c.key3="a"
        //     c.key4="b"
        //     console.log(c);
        // };
    // };
    // if (i == 1) {
    //     a = formdata[2].value;
    //     b = "http://127.0.0.1:8000/ganapaData/";
    //     display();
    // } else {
    //     a = formdata[i].value.toUpperCase();
    //     b = "http://127.0.0.1:8000/districtJson/";
    //     display();
    // }
    //     };
    // };


    // function to fetch data
    // function display() {
    //     {
    //         fetch(b, {
    //             method: "post",
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 Name: a
    //             })
    //         }).then(function (response) {
    //             return response.json();
    //         }).then(function (response) {
    //             responsedData = response;
    //             console.log(responsedData);
    //             L.geoJSON(responsedData, {
    //                 onEachFeature: function (feature, layer) {
    //                     var coord = feature.geometry.coordinates[0][0][100];
    //                     console.log(coord);
    //                     var m = coord[0];
    //                     var n = coord[1];
    //                     var z = [n, m];
    //                     mymap.setView(z, zoom = 9);
    //                 }
    //             }, {
    //                 style: polystyle
    //             }).addTo(mymap);
    //         });
    //     }
    // }
    async function display(){

        var response=await fetch("http://127.0.0.1:8000/ganapaData/", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                level0:province,
                level1:district,
                level2:ganapa
            })
        })
        let jsonData=await response.json()
        return jsonData;
        }



    display().then((districtData) => {

        console.log(districtData.level0);

        L.geoJSON(districtData.level0).addTo(mymap);
        // L.geoJSON(districtData, {
        //     // onEachFeature: function (feature, layer) {
        //     //     var coord = feature.geometry.coordinates[0][0][100];
        //     //     console.log(coord);
        //     //     var m = coord[0];
        //     //     var n = coord[1];
        //     //     var z = [n, m];
        //     //     mymap.setView(z, zoom = 9);
        //     // }
        // }).addTo(mymap);
})
}