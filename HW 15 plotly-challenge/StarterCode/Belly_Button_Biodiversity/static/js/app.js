function buildMetadata(sample) {
  var metadataURL = "/metadata/" + sample;
  var panelMetadata = d3.select("#sample-metadata");
  panelMetadata.html("");
  d3.json(metadataURL).then(function (data) {
    Object.entries(data).forEach(([key, value]) => {
      panelMetadata.append("h5").text(`${key}: ${value}`);
    });

    var data = [{domain: {x:[0,1], y:[0, 1]}, value: data.WFREQ,
    title: {text: "Belly Button Washing Frequency Scrubs Per Week", font: {size: 14}},
    type: "indicator", mode: "gauge+number+delta",
    delta: {reference: 9, increasing: {color: "green"}},
    gauge:
      {axis: {range: [0,10]}, steps: [{range: [0,5], color: "lightgray"},
      {range: [5,8], color: "gray"}], threshold: {line: {color: "red", width: 4},
      thickness: 0.75, value: 9}}}];
    var gaugeLayout = {width: 400, height: 500, margin: {t: 0, b: 0}};
    Plotly.newPlot("gauge", data, gaugeLayout);
  });
}

function buildCharts(sample) {
  var chartsURL = "/samples/" + sample;
  d3.json(chartsURL).then((data) => {
    var trace1 = {
      x: data.otu_ids,
      y: data.sample_values,
      mode: 'markers',
      text: data.otu_labels,
      marker: {
        color: data.otu_ids,
        size: data.sample_values,
        colorscale: "Earth"
      }
    };
    var trace1 = [trace1];
    var layout = {
      title: "OTU ID",
      showlegend: false, 
      height: 600,
      width: 1500
    };
    Plotly.newPlot("bubble", trace1, layout);

    var trace2 = [{
      values: data.sample_values.slice(0,10),
      labels: data.otu_ids.slice(0,10),
      hovertext: data.otu_labels.slice(0,10),
      type: "pie",
      marker: {
        colorscale: "Earth"
      }
    }];
    var layout2 = {
      showlegend: true,
      height: 400,
      width: 500
    };
    Plotly.newPlot("pie", trace2, layout2);
  })
}

function init() {
  var selector = d3.select("#selDataset");

  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}

init();
