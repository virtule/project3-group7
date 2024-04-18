// Create map Element to show the world. Size it so other things can fit
//on the dashboard.
let myMap = L.map('map', {
    center: [37.9755648, 23.7348324],
    zoom: 2,
    height: 1280,
    width: 720
});

let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(myMap);

let geojson;

console.log(worldEmissions)

// This code pulls the associated emissions totals for each country based
// on the year selected in the dropdown box.
// It also logs the entries from the datafile associated with that
//year into the console.

const features = worldEmissions.features

let desiredYear = 2021

const initialFilteredData = features.filter(feature => feature.properties.year === desiredYear);

function handleDropdownChange() {
    
    desiredYear = parseInt(document.getElementById('dropdown').value);

    const filteredData = features.filter(feature => feature.properties.year === desiredYear);

    myMap.eachLayer(function (layer) {
        if (layer !== tiles) {
            myMap.removeLayer(layer);
        }
    });

    L.geoJson(filteredData, {style: style, onEachFeature: onEachFeature}).addTo(myMap);

    console.log(filteredData);


}

// This is a listener that is tracking when the dropdown box is used on the page.

document.getElementById('dropdown').addEventListener('change', handleDropdownChange);

// This function sets the colors based on the amount of emissions in million tons.

function getColor(emissions) {
    return emissions > 5000 ? '#000000' :
    emissions > 3500 ? '#4f1919' :
    emissions > 2000 ? '#851515' :
    emissions > 1500 ? '#ca1b1b' :
    emissions > 1000 ? '#f92727':
    emissions > 850 ? '#c86304' :
    emissions > 700 ? '#f3cf18' : 
    emissions > 500 ? '#f3f245' :
    emissions > 400 ? '#f7f68c' :
    emissions > 300 ? '#076c07' :
    emissions > 200 ? '#06cc06' :
    emissions > 150 ? '#84ec94' :
    emissions > 100 ? '#053183' :
    emissions > 80 ? '#1b38ec' :
    emissions > 60 ? '#587aed' :
    emissions > 40 ? '#47149a' :
    emissions > 20 ? '#8149e0' :
    emissions > 10 ? '#c3a3f8' :
    emissions > 5 ? '#f362ea' :
    emissions > 1 ? '#f9a4f4' :
    '#ebe7f1';
}

// The style function applies the colors and borders to the map for a nice display!

function style(feature) {
    return {
        fillColor: getColor(feature.properties.total),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.60
    };
}

// This set of functions creates a darker border and increases opacity when highlighting
// over a specific country. It resets the the country to the previous style
// when the mouse moves out.

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.90
    });

    layer.bringToFront();
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}



function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}


// This function helps to properly update the map with the correct colors for each country, 
// based on the year selected from the dropdown box.

function updateChoropleth(dataset) {
  // Clear the map before adding new data
  myMap.eachLayer(function (layer) {
    if (layer !== tiles) {
      myMap.removeLayer(layer);
    }
  });

  // Filter the features based on the selected year:
  const filteredData = features.filter(feature => feature.properties.dataset === dataset);

  // Add the filtered data to the map with the appropriate style and interactions
  L.geoJson(filteredData, {style: style, onEachFeature: onEachFeature}).addTo(myMap);
}

// This displays the map with the initial set of data from 2021.

geojson = L.geoJson(initialFilteredData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(myMap);


// This creates an info window that allows the user
// to mouse over a country and see the name and 
// total CO2 emissions for the selected year in that
// country. It automatically updates as you move the mouse
// over different countries.

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Carbon Emissions by Country</h4>' +  (props ? 
        '<b>' + props.name + '</b><br />' + props.total + ' million tons' 
        : 'Hover over a country');
};

info.addTo(myMap);

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.90
    });
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

// This creates a legend that references the same values as
// the choropleth map to inform the user of the colors' meanings.

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 5, 10, 20, 40, 60, 80, 100, 150, 200, 300, 400, 500, 700, 850, 1000, 1500, 2000, 3500, 5000]
        labels = [],
        div.innerHTML += "<h3>Total Emissions (in million tons)</h3>"

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);








