// console.log("hi there")
var myMap = L.map("map", {
    center: [42.331429, -83.045753],
    zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.high-contrast",
    accessToken: "pk.eyJ1Ijoia2VpdGhhbGJyZWNodCIsImEiOiJjazMxb245d3cwM3ExM2hvcTl0bHNlZW85In0.jexIAjTCjEoOrQf1lNlb5A"
}).addTo(myMap);

var geojson;
var response;
d3.json("/data").then(function (data) {
    console.log(data)
    response = data
    d3.json("https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json").then(function (geo){
        console.log(geo)
geo.features.forEach(function(d){var x = response.filter(i=>i.Year==2006&&i.FIPS==d.id);
if (x[0] &&"UE_Rate" in x[0]){
d.properties["ourData"]=x[0]["UE_Rate"]; 
}});

        geojson = L.choropleth(geo, {

                // Define what  property in the features to use
                valueProperty: "ourData",
                       // Set color scale
                scale: ["#ffffb2", "#b10026"],
            
                // Number of breaks in step range
                steps: 10,
            
                // q for quartile, e for equidistant, k for k-means
                mode: "q",
                style: {
                // Border color
                color: "#fff",
                weight: 1,
                fillOpacity: 0.8
                },
                //   Binding a pop-up to each layer
                 onEachFeature: function (feature, layer) {
                  layer.bindPopup("Unemployment Rate: "+ feature.properties.ourData);
                 }

            }).addTo(myMap)
           
            console.log(geo)
            });
            

    });

    
    
 
    
       

    // geojson = L.choropleth(data, {
    //     valueProperty: "geoid10",
    //     // Set color scale
    //     scale: ["#ffffb2", "#b10026"],

    //     // Number of breaks in step range
    //     steps: 10,

    //     // q for quartile, e for equidistant, k for k-means
    //     mode: "q",
    //     style: {
    //         // Border color
    //         color: "#fff",
    //         weight: 1,
    //         fillOpacity: 0.8
    //     },

        //      // Binding a pop-up to each layer
        //      onEachFeature: function (feature, layer) {
        //        layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Median Household Income:<br>" +
        //          "$" + feature.properties.MHI2016);
        //      }
        //    }).addTo(myMap);

        //    // Set up the legend
        //    var legend = L.control({ position: "bottomright" });
        //    legend.onAdd = function () {
        //      var div = L.DomUtil.create("div", "info legend");
        //      var limits = geojson.options.limits;
        //      var colors = geojson.options.colors;
        //      var labels = [];

        //      // Add min & max
        //      var legendInfo = "<h1>Median Income</h1>" +
        //        "<div class=\"labels\">" +
        //        "<div class=\"min\">" + limits[0] + "</div>" +
        //        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        //        "</div>";

        //      div.innerHTML = legendInfo;

        //      limits.forEach(function (limit, index) {
        //        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        //      });

        //      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        //      return div;
        //    };

        //    // Adding legend to the map
        //    legend.addTo(myMap);


        // })

//     });
// });
