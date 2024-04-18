var countrySelector = d3.select("#countryDropdown");
var yearSelector = d3.select("#yearDropdown");
var demo = d3.select("#sample-metadata");
var jsonImport;
var yearClicked;
var countryClicked;


var globalData = []


function uniqueList (arr, key) {
   var list = [];
   arr.forEach(obj => {
       if (!list.includes(obj[key])) {
           list.push(obj[key])
       }
   });
   return list
};

d3.csv("../csv_sources/full_data.csv").then((response) => {
   // get data and set up filling years, countries, and pollution by type data
   var csvImport = response;
  
   globalData.push(response);
  
   var country_data = csvImport;
   var uniqueCountries = uniqueList(country_data, "properties.name");
   countryClicked = uniqueCountries[0];
   var uniqueYears = uniqueList(country_data, "properties.year");
   yearClicked = uniqueYears[0];

   // // get and print keys for all the years in data set
   console.log("Found keys: ", uniqueYears);
   // fill both dropdowns
   uniqueCountries.forEach(country => { countrySelector.append("option").text(country).property("value", country);});
   uniqueYears.forEach(country => { yearSelector.append("option").text(country).property("value", country);});
});
function handleDropdown (event) {
   var name = event.target.name;
   var value = event.target.value;
   if (name === "country") {
       countryClicked = value;
   }
   if (name === "year") {
       yearClicked = value;
   }
   //var barFilterData = globalData.filter(obj => obj["properties.name"] === countryClicked && obj["properties.year"] == yearClicked)
   barGraph(countryClicked, yearClicked);
};

function barGraph(countryClicked, yearClicked) {
   // Filter data based on the selected country and year
   var barFilterData2 = globalData[0].filter(obj => obj["properties.name"] === countryClicked && obj["properties.year"] == yearClicked);

   // Extract pollution data from filtered data
   var coalAmount = barFilterData2[0]['properties.coal'];
   var oilAmount = barFilterData2[0]['properties.oil'];
   var gasAmount = barFilterData2[0]['properties.gas'];
   var cementAmount = barFilterData2[0]['properties.cemeent'];
   var flaringAmount = barFilterData2[0]['properties.flaring'];
   var otherAmount = barFilterData2[0]['properties.other'];
   // var totalAmount = barFilterData2[0]['properties.total'];


   var trace1 = {
       x: ["coal", "oil", "gas", "cement", "flaring", "other"],
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
       title: 'Pollution Type'
   };


   // Update the existing plot with new data
   Plotly.newPlot("bar", barData, barLayout);
//console.log(globalData);
};


// function handleDropdown(event) {
//     var name = event.target.name;
//     var value = event.target.value;
//     if (name === "country") {
//         countryClicked = value;
//     }
//     if (name === "year") {
//         yearClicked = value;
//     }
//     // Call barGraph with the selected country and year
//     barGraph(countryClicked, yearClicked);
// };


   countrySelector.on("change", handleDropdown);
   yearSelector.on("change", handleDropdown);