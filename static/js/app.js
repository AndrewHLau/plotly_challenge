// View data
var jsondata;

console.log("javascriptisloaded");

d3.json("samples.json").then( (data)=>{
    jsondata = data;
    console.log(jsondata);
    dropdown()
});

// Function for creating the dropdowns
function dropdown (){
var names = jsondata.names
var dropdownMenu = d3.select("#selDataset");
names.forEach(name => {
    dropdownMenu
        .append("option")
        .property("value",name)
        .text(name)
});
console.log(names);
}

// Function for populating the meta data
function metadata (subjectID){
var id = jsondata.metadata[0].id
var ethnicity = jsondata.metadata[0].ethnicity  
var gender = jsondata.metadata[0].gender  
var age = jsondata.metadata[0].age  
var location = jsondata.metadata[0].location
var bbtype = jsondata.metadata[0].bbtype  
var wfreq = jsondata.metadata[0].wfreq 

var mData = d3.select("#sample-metadata");


mData.append("panel-body").property("value",id).text(`id: ${id}`);
mData.append("br");
mData.append("panel-body").property("value",ethnicity).text(`ethnicity: ${ethnicity}`);
mData.append("br");
mData.append("panel-body").property("value",gender).text(`gender: ${gender}`);
mData.append("br");
mData.append("panel-body").property("value",age).text(`age: ${age}`);
mData.append("br");
mData.append("panel-body").property("value",location).text(`location: ${location}`);
mData.append("br");
mData.append("panel-body").property("value",bbtype).text(`bbtype: ${bbtype}`);
mData.append("br");
mData.append("panel-body").property("value",wfreq).text(`wfreq: ${wfreq}`);

console.log(id);
console.log(ethnicity);
console.log(gender);
console.log(age);
console.log(location);
console.log(bbtype);
console.log(wfreq);
  
}

// Function for building the charts
function chart (subjectID){
var values = jsondata.samples[0].sample_values;
var labels = jsondata.samples[0].otu_ids;
var hovertext = jsondata.samples[0].otu_labels;
var barchart = d3.select("#bar");
       // Use slice to get the top 10 values & reverse to make bars stack greatest to smallest
       var sliced = values.slice(0, 10);
       console.log(sliced);
       var slicedlabels = labels.slice(0, 10);
       console.log(slicedlabels);

       var reverse = sliced.reverse();
       console.log(reverse);

       // Create your bar chart using plotly
       // Create the Trace
       var trace1 = {
           x: sliced,
           y: ["OTU 1977", "OTU 2318", "OTU 189", "OTU 352","OTU 1189","OTU 41",
           "OTU 2264", "OTU 482", "OTU 2859", "OTU 1167"],
           text: hovertext,
           type: "bar",
           orientation: "h"
           };
// Create the data array for our plot
       var data = [trace1];

       var layout = {                 
        yaxis: slicedlabels
      };

// Plot the chart to a div tag with id "bar"
       Plotly.newPlot("bar", data,layout); 

var bubblechart = d3.select("#bubble");

       // Create your bubble chart using plotly
       // Create the Trace
       var trace2 = {
           mode: "markers",
           x: labels,
           y: values,
           marker: {
            size: values,
            colors: "green",
            text: hovertext
          }
           };
// Create the data array for our plot
       var data = [trace2];

       var layout = {                 
        xaxis: { title: "OTU ID"}
      };

// Plot the chart to a div tag with id "bubble"
       Plotly.newPlot("bubble", data, layout); 
}

//
function optionChanged(subjectID){
metadata(subjectID)
chart(subjectID)
}
