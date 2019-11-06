
// ============================================================================================================================
// var tableData = data;
// // Assign the data from `data.js` to a descriptive variable
// // var people = data;

// // Select the button
// var button = d3.select("#button");

// button.on("click", function() {

//   // Select the input element and get the raw HTML node
//   var inputElement = d3.select("#datetime");

//   // Get the value property of the input element
//   var inputValue = inputElement.property("value");

//   console.log(inputValue);
//   console.log(tableData);

//   var filteredData = tableData.filter(person => person.bloodType === inputValue);

//   console.log(filteredData);

//   // BONUS: Calculate summary statistics for the age field of the filtered data

//   // First, create an array with just the age values
//   var ages = filteredData.map(person => person.age);

//   // Next, use math.js to calculate the mean, median, mode, var, and std of the ages
//   var mean = math.mean(ages);
//   var median = math.median(ages);
//   var mode = math.mode(ages);
//   var variance = math.var(ages);
//   var standardDeviation = math.std(ages);

//   // Then, select the unordered list element by class name
//   var list = d3.select(".summary");

//   // remove any children from the list to
//   list.html("");

//   // append stats to the list
//   list.append("li").text(`Mean: ${mean}`);
//   list.append("li").text(`Median: ${median}`);
//   list.append("li").text(`Mode: ${mode}`);
//   list.append("li").text(`Variance: ${variance}`);
//   list.append("li").text(`Standard Deviation: ${standardDeviation}`);
// });


// ============================================================================================================================
// function handleSearchButtonClick() {
//     // Format the user's search by removing leading and trailing whitespace, lowercase the string
//       var filterDate = dateInput.value;
//       var filterState = stateInput.value.trim().toLowerCase();
//       var filterCity = cityInput.value.trim().toLowerCase();
//       var filterCountry = countryInput.value.trim().toLowerCase();
// //       var filterShape = shapeInput.value.trim().toLowerCase();
// //       // Set filteredAddresses to an array of all addresses whose "state" matches the filter

// // Assign the data from `data.js` to a descriptive variable
// // var people = data;

// // Select the button
// var button = d3.select("#button");

// button.on("click", function() {

//   // Select the input element and get the raw HTML node
//   var inputElement = d3.select("#datetime");

//   // Get the value property of the input element
//   var inputValue = inputElement.property("value");

//   console.log(inputValue);
//   console.log(tableData); 

// function handleSearchButtonClick() {
//     if (filterDate != "")
//     {
//     filteredTable = dataSet.filter(function(address) 
//     {
//         var addressDate = address.datetime; 
//     // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
//     return addressDate === filterDate;
//     });
//     }
//     else {filteredTable};
//     if(filterState != "")
//     {
//     filteredTable = filteredTable.filter(function(address)
//     {
//         var addressState = address.state;
//         return addressState === filterState;
//     });
//     }
//     else{filteredTable};
//     if(filterCity != "")
//     {
//     filteredTable = filteredTable.filter(function(address)
//     {
//         var addressCity = address.city;
//         return addressCity === filterCity;
//     });
//     }
//     else{filteredTable};
//     if(filterCountry != "")
//     {
//     filteredTable = filteredTable.filter(function(address)
//     {
//         var addressCountry = address.country;
//         return addressCountry === filterCountry;
//     });
//     }
//     else{filteredTable};
//     if(filterShape != "")
//     {
//     filteredTable = filteredTable.filter(function(address)
//     {
//         var addressShape = address.shape;
//         return addressShape === filterShape;
//     });
//     }
//     else{filteredTable};
// renderTable();
// }





// // from data.js

// // console.log(data);
// // Add an event listener to the searchButton, call handleSearchButtonClick when clicked

// var $searchBtn = document.querySelector("#search");
// var $searchBtn1 = document.querySelector("#search1");
// var $searchBtn2 = document.querySelector("#search2");
// var $searchBtn3 = document.querySelector("#search3");
// var $searchBtn4 = document.querySelector("#search4");

// $searchBtn1.addEventListener("click", handleSearchButtonClick1);
// $searchBtn2.addEventListener("click", handleSearchButtonClick2);
// $searchBtn3.addEventListener("click", handleSearchButtonClick3);
// $searchBtn4.addEventListener("click", handleSearchButtonClick4);
// $searchBtn.addEventListener("click", handleSearchButtonClick);

// // renderTable renders the filteredUFO to the tbody

// function renderTable() {


//   $tbody.innerHTML = "";
//   for (var i = 0; i < tableData.length; i++) {
//     // Get get the current UFO object and its fields
//     var ufo = tableData[i];
//     var observations = Object.keys(ufo);
//     // Create a new row in the tbody, set the index to be i + startingIndex
//     var $row = $tbody.insertRow(i);
//     for (var j = 0; j < observations.length; j++) {
//       // For every observations in the ufo object, create a new cell at set its inner text to be the current value at the current     ufo'sobservation
//       var observation = observations[j];
//       var $cell = $row.insertCell(j);
//       $cell.innerText = ufo[observation];
//     }
//   }
// }

// function handleSearchButtonClick() {
//   // Format the user's search by removing leading and trailing whitespace, lowercase the string
//   var filterDate = $dateInput.value.trim();
//   // Set filteredUFOs to an array of all ufos whose "date" matches the filter
//   tableData = data.filter(function (ufo) {
//     var ufoDate = ufo.datetime.toLowerCase();
//     // If true, add the date to the filteredUFO, otherwise don't add it to filteredUFO
//     return ufoDate === filterDate;
//   });
//   renderTable();
// }

// function handleSearchButtonClick1() {
//   // Format the user's search by removing leading and trailing whitespace, lowercase the string
//   var filterCity = $cityInput.value.trim().toLowerCase();
//   // Set filteredUFOs to an array of all ufos whose "city" matches the filter
//   tableData = data.filter(function (ufo) {
//     var ufoCity = ufo.city.toLowerCase();
//     // If true, add the city to the filteredUFO, otherwise don't add it to filteredUFO
//     return ufoCity === filterCity;
//   });
//   renderTable();
// }

// function handleSearchButtonClick2() {
//   // Format the user's search by removing leading and trailing whitespace, lowercase the string
//   var filterState = $stateInput.value.trim().toLowerCase();
//   // Set filteredUFOs to an array of all ufos whose "state" matches the filter
//   tableData = data.filter(function (ufo) {
//     var ufoState = ufo.state.toLowerCase();
//     // If true, add the state to the filteredUFO, otherwise don't add it to filteredUFO
//     return ufoState === filterState;
//   });
//   renderTable();
// }

// function handleSearchButtonClick3() {
//   // Format the user's search by removing leading and trailing whitespace, lowercase the string
//   var filterCountry = $countryInput.value.trim().toLowerCase();
//   // Set filteredUFOs to an array of all ufos whose "country" matches the filter
//   tableData = data.filter(function (ufo) {
//     var ufoCountry = ufo.country.toLowerCase();
//     // If true, add the country to the filteredUFO, otherwise don't add it to filteredUFO
//     return ufoCountry === filterCountry;
//   });
//   renderTable();
// }

// function handleSearchButtonClick4() {
//   // Format the user's search by removing leading and trailing whitespace, lowercase the string
//   var filterShape = $shapeInput.value.trim().toLowerCase();
//   // Set filteredUFOs to an array of all ufos whose "shape" matches the filter
//   tableData = data.filter(function (ufo) {
//     var ufoShape = ufo.shape.toLowerCase();
//     // If true, add the shape to the filteredUFO, otherwise don't add it to filteredUFO
//     return ufoShape === filterShape;
//   });
//   renderTable();
// }
// renderTable();


// ======================================================================================================
// Get references to the tbody element, input fields and buttons
// var tbody = document.querySelector("tbody");
// var dateInput = document.querySelector("#date");
// var cityInput = document.querySelector("#city");
// var stateInput = document.querySelector("#state");
// var countryInput = document.querySelector("#country");
// var shapeInput = document.querySelector("#shape");
// var searchBtn = document.querySelector("#search");
// var resetBtn = document.querySelector("#reset");
// // Add an event listener to the searchButton and resetButton, call functions when clicked
// searchBtn.addEventListener("click", handleSearchButtonClick);
// resetBtn.addEventListener("click", handleResetButtonClick);
// // Set filteredData to dataSet initially
// var filteredData = dataSet;
// // renderTable renders the filtered data to the tbody
// function renderTable() {
//   tbody.innerHTML = "";
//   for (var i = 0; i < filteredData.length; i++) {
//     // Get get the current sighting object and its fields
//     var sighting = filteredData[i];
//     var fields = Object.keys(sighting);
//     // Create a new row in the tbody, set the index to be i + startingIndex
//     var row = tbody.insertRow(i);
//     for (var j = 0; j < fields.length; j++) {
//       // For every field in the sighting object, create a new cell at set its inner text to be the current value at the current sighting's field
//       var field = fields[j];
//       var cell = row.insertCell(j);
//       cell.innerText = sighting[field];
//     }
//   }
// }

// function handleSearchButtonClick() {
//   // go through search items with formatted user's search terms by removing leading and trailing whitespace
//   var filterDate = dateInput.value.trim();
//   if (filterDate != "") {
//     filteredData = dataSet.filter(function (sighting) {
//       var sightingDate = sighting.datetime;
//       return sightingDate === filterDate;
//     });
//   };
//   var filterCity = cityInput.value.trim().toLowerCase();
//   if (filterCity != "") {
//     filteredData = filteredData.filter(function (sighting) {
//       var sightingCity = sighting.city;
//       return sightingCity === filterCity;
//     });
//   };
//   var filterState = stateInput.value.trim().toLowerCase();
//   if (filterState != "") {
//     filteredData = filteredData.filter(function (sighting) {
//       var sightingState = sighting.state;
//       return sightingState === filterState;
//     });
//   };
//   var filterCountry = countryInput.value.trim().toLowerCase();
//   if (filterCountry != "") {
//     filteredData = filteredData.filter(function (sighting) {
//       var sightingCountry = sighting.country;
//       return sightingCountry === filterCountry;
//     });
//   };
//   var filterShape = shapeInput.value.trim().toLowerCase();
//   if (filterShape != "") {
//     filteredData = filteredData.filter(function (sighting) {
//       var sightingShape = sighting.shape;
//       return sightingShape === filterShape;
//     });
//   };
//   renderTable();
// };

// // Reset the data and search form after a search
// function handleResetButtonClick() {
//   filteredData = dataSet;
//   dateInput.value = "";
//   cityInput.value = "";
//   stateInput.value = "";
//   countryInput.value = "";
//   shapeInput.value = "";
//   renderTable();
// }
// // Render the table for the first time on page load
// renderTable();



    // build table
    // var selected  = renderTable(dateSelect, citySelect, stateSelect, countrySelect, shapeSelect, filter);
    // pagination
    // // var pages = pagination(selected);
    // d3.select('#step1')
    //     .classed('select', true);
    // var counter = 0;
    // for (let i=0; i<10; i++){
    //     tBodyRow = tBody.append('tr');
    //     for (let j=0; j<7; j++){
    //         tBodyRow.append('td').html(selected[counter]);
    // //         counter++;
    // //     }
    // // }
    // // select button and render the table
    // for (let i=0; i<Math.ceil(pages); i++){
    //     d3.select('#step' + (i + 1)).on('click', function(){
    //         // clear table table body if it already exists
    //         if (tBody.empty()){
    //             tBody.html('');
    //         }
    //         d3.selectAll('.paginate')
    //             .classed('select', false);
    //         d3.select('#step' + (i + 1))
    //             .classed('select', true);
    //         var counter = (1 * (i*70));
    //         for (let j=0; j<10; j++){
    //             tBodyRow = tBody.append('tr');
    //             for (let k=0; k<7; k++){
    //                 tBodyRow.append('td').html(selected[counter]);
    //                 counter++;
    //             }
    //         }
    //     });
    // }
    // // var down = 0;
    // // d3.select('#forward').on('click', function(){
    //     down++
    //     document.getElementById('step' + down).click()
    // });
    // d3.select('#forward').on('click', function(){
    //     down--
    //     document.getElementById('step' + down).click()
    // });