// ==========================
// Using the UFO dataset provided in the form of an array of JavaScript objects, write code that appends a table to your web page and then adds new rows of data for each UFO sighting.
//   * Make sure you have a column for `date/time`, `city`, `state`, `country`, `shape`, and `comment` at the very least.
//   * Use a date form in your HTML document and write JavaScript code that will listen for events and search through the `date/time` column to find rows that match user input.
// ========================

var tableData = data;

var tbody = d3.select("tbody");
console.log(data);
data.forEach((UFOReport) => {
    var row = tbody.append("tr");
    Object.entries(UFOReport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
  
// =====================================================
var button = d3.select('#filter-btn');
    button.on('click', function (){
    d3.event.preventDefault();
    // clear table table body if it already exists
   
    // if (tBody.empty()){
    // tBody.html('');
    // }

    var dateSelect = d3.select('#datetime').node().value;
    var citySelect = d3.select('#city').node().value;
    var stateSelect = d3.select('#state').node().value;
    var countrySelect = d3.select('#country').node().value;
    var shapeSelect = d3.select('#shape').node().value;

    // var date = dateSelect.property("value")
    console.log(dateSelect)

    var item = data.filter(item => item.datetime===dateSelect)
    console.log(item)

    
    
    var tbody = d3.select("tbody");
    tbody.html('');
    item.forEach((UFOReport) => {
        var row = tbody.append("tr");
        Object.entries(UFOReport).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
        });
    });
    

});

