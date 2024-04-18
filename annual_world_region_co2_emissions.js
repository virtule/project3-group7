// Fetch the JSON data
fetch("../Javascript/annual_world_region_co2_filtered.json")
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        // Create arrays to store data
        var years = data.map(item => item.Year);
        var emissions = data.map(item => item["Annual CO2 emissions (tonnes)"]);
        var regions = data.map(item => item.Region);
        
        // Create the interactive line chart using Plotly
        var fig = {
            data: [],
            layout: {
                xaxis: {
                    title: 'Year',
                    rangeslider: {visible: true}
                },
                yaxis: {
                    title: 'Annual CO2 Emissions (tonnes)',
                    tickvals: [0, 5000000000, 10000000000, 15000000000, 20000000000, 25000000000, 30000000000, 35000000000, 40000000000],
                    ticktext: ['0', '5 Billion t', '10 Billion t', '15 Billion t', '20 Billion t', '25 Billion t', '30 Billion t', '35 Billion t', '40 Billion t']
                },
                title: 'Interactive Regional Annual CO₂ Emissions',
                autosize: false,
                width: 650,
                height: 450,
                annotations: [{
                    x: 2020,
                    y: Math.max(...emissions.filter((_, i) => years[i] === "2020")),
                    text: "COVID-19 pandemic starts",
                    showarrow: true,
                    arrowhead: 1,
                    ax: -150,
                    ay: -100
                },
                {
                    x: 2015,
                    y: Math.max(...emissions.filter((_, i) => years[i] === "2015")),
                    text: "Paris Agreement",
                    showarrow: true,
                    arrowhead: 1,
                    ax: -100,
                    ay: -70
                },
                {
                    x: 1992,
                    y: Math.max(...emissions.filter((_, i) => years[i] === "1992")),
                    text: "Kyoto Protocol",
                    showarrow: true,
                    arrowhead: 1,
                    ax: -100,
                    ay: -70
                },
                {
                    x: 1987,
                    y: Math.max(...emissions.filter((_, i) => years[i] === "1987")),
                    text: "Montreal Protocol",
                    showarrow: true,
                    arrowhead: 1,
                    ax: -50,
                    ay: -30
                }]
            }
        };

        // Add data traces
        var regionsUnique = [...new Set(regions)];
        regionsUnique.forEach(function(region) {
            var regionData = data.filter(d => d.Region === region);
            var trace = {
                x: regionData.map(d => d.Year),
                y: regionData.map(d => d["Annual CO2 emissions (tonnes)"]),
                mode: 'lines',
                name: region
            };
            fig.data.push(trace);
        });

        // Render the plot
        Plotly.newPlot('plot', fig.data, fig.layout);
    })
    .catch(error => console.error('Error loading the JSON file:', error));