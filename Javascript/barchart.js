document.addEventListener('DOMContentLoaded', function() {
    // initialize materialize dropdowns
    // code worked off of https://stackoverflow.com/questions/39564721/materialize-nav-bar-with-search-and-dropdown-button and https://materializecss.com/dropdown.html
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
 });
 
 // set variables that will be called during the rest of code
 var countrySelector = d3.select("#countryDropdown");
 var yearSelector = d3.select("#yearDropdown");
 var demo = d3.select("#sample-metadata");
 var jsonImport;
 var yearClicked;
 var countryClicked;
 var globalData = []
 
 // set function that will be used to generate country/year lists
 function uniqueList(arr, key) {
    var list = [];
    arr.forEach(obj => {
        if (!list.includes(obj[key])) {
            list.push(obj[key])
        }
    });
    return list
 };
 
 // read in data using d3
 d3.csv("../csv_sources/full_data.csv").then((response) => {
    // get data and set up filling years, countries
    var csvImport = response;
    globalData.push(response);
    var country_data = csvImport;
    var uniqueCountries = uniqueList(country_data, "properties.name");
    countryClicked = uniqueCountries[0];
    var uniqueYears = uniqueList(country_data, "properties.year");
    yearClicked = uniqueYears[0];

    // fill both dropdowns
    uniqueCountries.forEach(country => { countrySelector.append("option").text(country).property("value", country);});
    uniqueYears.forEach(year => { yearSelector.append("option").text(year).property("value", year);});
    // reinitialize materialize to get drop downs to work properly
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
 });
 
 // create function to manage when drop down changes
 function handleDropdown(event) {
    var name = event.target.name;
    var value = event.target.value;
   
    if (name === "country") {
        countryClicked = value;
    }
    if (name === "year") {
        yearClicked = value;
    }
    barGraph(countryClicked, yearClicked);
 };

 // create function to fill bar graph
 function barGraph(countryClicked, yearClicked) {
    console.log("Selected Country:", countryClicked);
    console.log("Selected Year:", yearClicked);
   
    // Filter data based on the selected country and year
    var barFilterData2 = globalData[0].filter(obj => obj["properties.name"] === countryClicked && obj["properties.year"] === yearClicked);

    // extract pollution data from filtered data
    var coalAmount = barFilterData2[0]['properties.coal'];
    var oilAmount = barFilterData2[0]['properties.oil'];
    var gasAmount = barFilterData2[0]['properties.gas'];
    var cementAmount = barFilterData2[0]['properties.cemeent'];
    var flaringAmount = barFilterData2[0]['properties.flaring'];
    var otherAmount = barFilterData2[0]['properties.other'];
    // var totalAmount = barFilterData2[0]['properties.total'];
 
    var trace1 = {
        x: ["Coal", "Oil", "Gas", "Cement", "Flaring", "Other"],
        y: [coalAmount, oilAmount, gasAmount, cementAmount, flaringAmount, otherAmount],
        marker:{
            color: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ]
        },
        type: 'bar'
    };
 
    var barData = [trace1];
 
    var barLayout = {
        title: 'Pollution Type',
        yaxis: {
            title: "CO2 Emissions in Megatonnes"
        },
        xaxis: {
            title: "Emission Source"
        }
    };
 
    // Update the existing plot with new data
    Plotly.newPlot("bar", barData, barLayout);
 };
 
 // Attach event listeners to dropdowns
 countrySelector.on("change", handleDropdown);
 yearSelector.on("change", handleDropdown);