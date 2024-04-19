## CO2 Emissions on Our World in Data

![Screenshot 2024-04-18 at 5 48 44 PM](https://github.com/virtule/project3-group7/assets/151413928/73dfbe2a-1dd2-4e24-a6ea-1736a55b0572)


### Collaborators:

* [Ashley Anderson](https://github.com/AshleyKAnderson) <br>
* [Nora Chian](https://github.com/ndchian)<br>
* [Dan Kramer](https://github.com/d6kramer)<br>
* [Erik Malrait](https://github.com/virtule)<br>
  
## Technology Used:
* Python            
* JavaScript
* Plotly
* HTML
* CSS
* D3.js
* Leaflet
* Bootstrap
* Materialize
  
## Project Description
This repository explores CO2 emissions and their impact on global climate change. Here's a quick look at what you'll find:

**Data Prep:** Our first step was to prepare the data for use in creating the visualizations. We opted to combine our dataset with a .geojson file that had the outline coordinates for the countries of the world. This necessitated us to ensure country names were equivalent in each file, and also required us to drop certain data related to international shipping and global totals. Both datasets were read into Pandas Dataframes for cleaning, then exported as both CSV files and JSON files for further use. Below are a few images of this process via a Jupyter Notebook:

![Model](https://github.com/virtule/project3-group7/blob/main/Images/Emissions%20NB1.png)

![Model](https://github.com/virtule/project3-group7/blob/main/Images/Emissions%20NB2.png)

![Model](https://github.com/virtule/project3-group7/blob/main/Images/Emissions%20NB3.png)

**Metrics:** We delve into various metrics for comparing CO2 emissions - annual emissions by country, historical contributions by region, and a breakdown of each country's emission types. Each metric tells a different story.

**Global Emissions Heatmap:** Explore historical trends in global CO2 emissions with interactive charts. See how emissions have risen dramatically since the Industrial Revolution. To interact with the heat map, choose a year from the dropdown selection menu above it. You can pick any decade from 1900 -2020, plus some “event years,” such as when the Kyoto Protocol or Paris Agreement were signed. The map will update each country’s total emissions for that year, shaded in a color corresponding to the legend in the bottom left corner. You can see a country’s specific total emissions for the selected year simply by scrolling over it.<br>

![Model](https://github.com/virtule/project3-group7/blob/main/Images/emissions_map_1990.png)

![Model](https://github.com/virtule/project3-group7/blob/main/Images/emissions_map_2010.png)

**Yearly Emission Types by Country:** Here the user can investigate each country's specific emissions types for each year in the data set. By selecting a country and year, the bar chart populates with the corresponding data.<br>

![Model](https://github.com/virtule/project3-group7/blob/main/Images/Barchart%201.png)

![Model](https://github.com/virtule/project3-group7/blob/main/Images/Barchart%202.png)

**Regional Emissions Scrolling Line Chart:** Discover the breakdown of global CO2 emissions by region. While Europe and the US dominated historically, Asia, particularly China, now leads emissions. Use the scroll bar to investigate changes in CO2 emissions throughout the years.<br>

![Model](https://github.com/virtule/project3-group7/blob/main/Images/Line%20Graph%201.png)

![Model](https://github.com/virtule/project3-group7/blob/main/Images/Line%20Graph%202.png)

## Ethical Considerations:

One of the main considerations of our project is to ensure the data is accurate and reliable. This is especially important, as we do not want the data presented to unduly influence the user, or manipulate them toward a specific outcome. Luckily, the original source for our data is compiled from research by the Glocal Carbon Project (GCP - https://www.globalcarbonproject.org/index.htm), which is a repesected and well-known scientific organization that is a reasearch partner of the World Climate Research Programme. Additionally, the authors utilizing the GCP dataset go to great lengths publishing annual documents explaining changes and updates to the data, including disclosing and innaccuracies that were found, and the steps made to fix them. This open publishing format and pariticpation with the EU Open Repository Program gave us confidence that the data we are accessing was both complied in good faith, and adjusted when necessary.

For the visualizations, our goal is to pass the data along via different visual elements simply for what it is - without adding any bias into the coding of the elements. To that end, we tried to keep as much data within the visualizations as possible, or picked neutral points (decades) to illustrate the steady growth in emissions. The selection of years with major climate change talks or agreements, as well as COVID-19, is meant to simultaenously illustrate the progress made from each of those events, as well as to highlight the true difficulty of reversing a trend that has been moving increasingly in one direction (upward) for over 100 years.

## Data Sources: 

Below is access to the underlying data used in our visualizations, allowing for further exploration:

**Kaggle:** https://www.kaggle.com/datasets/thedevastator/global-fossil-co2-emissions-by-country-2002-2022 <br>

**Our World In Data:** https://ourworldindata.org/co2-emissions

**Country Boundaries GeoJSON file:** https://github.com/johan/world.geo.json/blob/master/countries.geo.json

**Choropleth Interactive Map Tutorial:** https://leafletjs.com/examples/choropleth/

**Materialize:** https://materializecss.com/dropdown.html

**[Chat GPT](https://chat.openai.com/)** 

## Presentation Tools:

**Slidedeck:** https://docs.google.com/presentation/d/1ET0Hy5NFrfdQ0jCMsRlrbnGEv66DLyTAdoma4d_qt8g/edit?usp=sharing

**Dashboard:** https://virtule.github.io/project3-group7/

We invite you to explore our collection and gain a deeper understanding of CO2 emissions and their role in climate change.
