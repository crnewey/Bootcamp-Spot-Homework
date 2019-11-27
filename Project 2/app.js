function buildCharts(results) {
  var chartsURL = "/data/" + data;
  d3.json(chartsURL).then((data) => {
    var trace1 = {
      x: data.UE_Rate,
      y: data.Px_Rate,
      mode: 'markers',
      text: data.Year,
      marker: {
        color: data.UE_Rate,
        size: data.Px_Rate,
        colorscale: "Earth"
      }
    };
    var trace1 = [trace1];
    var layout = {
      title: "Opioid Problem",
      showlegend: false, 
      height: 600,
      width: 1500
    };
    Plotly.newPlot("bubble", trace1, layout);

  });
};
buildCharts();
