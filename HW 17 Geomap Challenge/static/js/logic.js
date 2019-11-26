var mymap = L.map('map', {
    center: [40, -99],
    zoom: 4.3,
    timeDimension: true,
    timeDimensionOptions: {
    timeInterval: "2018-04-01/2018-04-05",
    period: "PT1H"
    },
    timeDimensionControl: true,
    layers: [map]
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.high-contrast',
    accessToken: API_Key
}).addTo(mymap)

var earthquakes = new L.LayerGroup();
var baseLayers = {
    "Map": map,
   };
var overlays = {
    "Earthquakes": earthquakes,
};
L.control.layers(baseLayers, overlays).addTo(mymap);

// Load in json data
var EarthquakesJSON = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
console.log (EarthquakesJSON)

d3.json(EarthquakesJSON).then(function (geoJson) {
    function markerSize(magnitude) {
        return magnitude * 4;
    };

    function Color(magnitude) {
        if (magnitude > 5) {
            return 'red'
        } else if (magnitude > 4) {
            return 'Orange'
        } else if (magnitude > 3) {
            return 'Yellow'
        } else if (magnitude > 2) {
            return 'Green'
        } else if (magnitude > 1) {
            return 'Blue'
        } else {
            return 'Purple'
        }
    };
    L.geoJSON(geoJson, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },

        style: function (feature) {
            return {
                fillColor: Color(feature.properties.mag),
                fillOpacity: 0.7,
                weight: 0.1,
                color: 'black'
            }
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "<h4 style='text-align:center;'>" + new Date(feature.properties.time) +
                "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.title + "</h5>");
        }
    }).addTo(earthquakes);
earthquakes.addTo(mymap);

// add legend
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend'),
    var magnitude = [0, 1, 2, 3, 4, 5],
    var labels = [];

    div.innerHTML += "<h4 style='margin:4px'>Magnitude</h4>"

    for (var i = 0; i < magnitude.length; i++) {
        div.innerHTML +=
            '<i style="background:' + Color(magnitude[i] + 1) + '"></i> ' +
            magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
    }
    return div;
};
legend.addTo(mymap);
});
