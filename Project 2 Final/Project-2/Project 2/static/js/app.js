// function buildCharts() {
//   // // @TODO: Use `d3.json` to fetch the sample data for the plots
//   d3.json(`/data`).then((data) => {
//     //   // @TODO: Build a Bubble Chart using the sample data      
//     const UE_Rate = data.map(row => row.UE_Rate);
//     const County = data.map(row => row.County);
//     const PX_Rate = data.map(row => row.PX_Rate);
//     const State = data.map(row => row.State);
//     const FIPS = data.map(row => row.FIPS);
//     const Year = data.map(row => row.Year);
//     // console.log(FIPS)
//     //   // @TODO: Build a Pie Chart
//     let bubbleLayout = {
//       margin: { t: 0 },
//       hovermode: "closests",
//       xaxis: { title: "UE vs PX Rates" }
//     }
//     let bubbleData = [
//       {
//         x: UE_Rate,
//         y: PX_Rate,
//         animationFrame: Year,
//         animationGroup: FIPS,
//         text: County,
//         mode: "markers",
//         marker: {
//           size: UE_Rate,
//           color: State,
//           colorscale: "Earth"
//         }
//       }
//     ]
//     Plotly.plot("bubble", bubbleData, bubbleLayout);



//   });
// }

// buildCharts();
// Plotly.express.scatter(final_df, x=UE_Rate,y=Px_Rate, animation_frame=Year, animation_group=FIPS,color=State,
//   size=UE_Rate,hover_name=County,range_x=[0,30],range_y=[-10,550])


// Create a lookup table to sort and regroup the columns of data,
// first by year, then by continent:
d3.json("/data").then(function (response) {
  console.log(response)
  var lookup = {};
  function getData(Year, State) {

    var byYear, trace;
    if (!(byYear = lookup[Year])) {
      ;
      byYear = lookup[Year] = {};
    }
    // If a container for this year + continent doesn't exist yet,
    // then create one:
    if (!(trace = byYear[State])) {
      trace = byYear[State] = {
        x: [],
        y: [],
        id: [],
        text: [],
        marker: { size: [] }
      };
    }
    return trace;
  }
  // Go through each row, get the right trace, and append the data:
  for (var i = 0; i < response.length; i++) {
    var datum = response[i];
    var trace = getData(datum.Year, datum.State);
    trace.text.push(datum.County);
    trace.id.push(datum.FIPS);
    trace.x.push(datum.UE_Rate);
    trace.y.push(datum.PX_Rate);
    trace.marker.size.push(datum.UE_Rate);
  }

  // Get the group names:
  var Years = Object.keys(lookup);
  // In this case, every year includes every continent, so we
  // can just infer the continents from the *first* year:
  var firstYear = lookup[Years[0]];
  var State = Object.keys(firstYear);

  // Create the main traces, one for each continent:
  var traces = [];
  for (i = 0; i < State.length; i++) {
    var data = firstYear[State[i]];
    // One small note. We're creating a single trace here, to which
    // the frames will pass data for the different years. It's
    // subtle, but to avoid data reference problems, we'll slice
    // the arrays to ensure we never write any new data into our
    // lookup table:
    traces.push({
      name: State[i],
      x: data.x.slice(),
      y: data.y.slice(),
      id: data.id.slice(),
      text: data.text.slice(),
      mode: 'markers',
      marker: {
        size: data.marker.size.slice(),
        sizemode: "diameter",
        sizeref: .5
      }
    });
  }

  // Create a frame for each year. Frames are effectively just
  // traces, except they don't need to contain the *full* trace
  // definition (for example, appearance). The frames just need
  // the parts the traces that change (here, the data).
  var frames = [];
  for (i = 0; i < Years.length; i++) {
    frames.push({
      name: Years[i],
      data: State.map(function (State) {
        return getData(Years[i], State);
      })
    })
  }
  // Now create slider steps, one for each frame. The slider
  // executes a plotly.js API command (here, Plotly.animate).
  // In this example, we'll animate to one of the named frames
  // created in the above loop.
  var sliderSteps = [];
  for (i = 0; i < Years.length; i++) {
    sliderSteps.push({
      method: 'animate',
      label: Years[i],
      args: [[Years[i]], {
        mode: 'immediate',
        transition: { duration: 600 },
        frame: { duration: 600, redraw: false },
      }]
    });
  }

  var layout = {
    height: 800,
    width: 1150,
    xaxis: {
      title: 'UE_Rate',
      range: [0, 30]
    },
    yaxis: {
      title: 'PX_Rate',
      type: 'linear',
      range: [0, 600]
    },
    hovermode: 'closest',
    // We'll use updatemenus (whose functionality includes menus as
    // well as buttons) to create a play button and a pause button.
    // The play button works by passing `null`, which indicates that
    // Plotly should animate all frames. The pause button works by
    // passing `[null]`, which indicates we'd like to interrupt any
    // currently running animations with a new list of frames. Here
    // The new list of frames is empty, so it halts the animation.
    updatemenus: [{
      x: 0,
      y: 0,
      yanchor: 'top',
      xanchor: 'left',
      showactive: false,
      direction: 'left',
      type: 'buttons',
      pad: { t: 87, r: 10 },
      buttons: [{
        method: 'animate',
        args: [null, {
          mode: 'immediate',
          fromcurrent: true,
          transition: { duration: 1000 },
          frame: { duration: 1000, redraw: false }
        }],
        label: 'Play'
      }, {
        method: 'animate',
        args: [[null], {
          mode: 'immediate',
          transition: { duration: 1000 },
          frame: { duration: 1000, redraw: false }
        }],
        label: 'Pause'
      }]
    }],
    // Finally, add the slider and use `pad` to position it
    // nicely next to the buttons.
    sliders: [{
      pad: { l: 130, t: 55 },
      currentvalue: {
        visible: true,
        prefix: 'Year:',
        xanchor: 'right',
        font: { size: 20, color: '#666' }
      },
      steps: sliderSteps
    }]
  };
  console.log(traces);
  // Create the plot:
  Plotly.plot(`data`, {
    data: traces,
    layout: layout,
    frames: frames,
  });

  
});