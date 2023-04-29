// Add express in our project
var express = require('express');

// Creating the express app
var app = express();

// The requirement of this package is
// in the later part of the application
// where we will have to fetch data from server
var axios = require("axios").default;

// TELLING NODE THAT WE REQUIRE BODY-PARSE
// R PACKAGE IN OUR PROJECT.
var bodyParser = require('body-parser');
  
  
// Allowing our app to use the body parser package.
app.use(bodyParser.urlencoded({extended:false}))


// WE ARE MAKING A SIMPLE GET REQUEST ON HOME ROUTE
// JUST TO MAKE SURE THAT EVERYTHING IS GOING FINE.

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})



// A SIMPLE POST REQUEST ON /DATA ROUTE.
// WE WILL USE THIS IN A WHILE.
// app.post("/data", function(req, res) {
// res.send("We have got the post request on /data route");
// })

// OPTIONS VARIABLE THAT CONTAINS THE INFO
// RELATED TO THE API WE ARE GOING TO USE
// TO FETCH DATA OF THE STOCK THAT USER HAS SELECTED.
const options = {
    method: 'GET',
    url: 'https://latest-stock-price.p.rapidapi.com/price',
    params: {
      Indices: 'NIFTY 50'
    },
    headers: {
     
      'X-RapidAPI-Key': 'Your api key',
      'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
    }
  };
    
    
    
    
    
    // EVERYTHING EXCEPT THE POST REQUEST
    // SECTION IS SAME AS EARLIER.
    app.post("/data", function(req, res) {
    
    // res.send("We have got the post request on /data route");
    
    
    
    // req.body represents the data we have got from
    // the post request that has been made
    //.stockSelected is the “name” property of
    // dropdown(in Index.html)
    // which represents that we want the data that
    // is selected from the dropdown.
    
    
    
    var itemSelectedFromDropdown = req.body.stockSelected;
    
    
    
    
    
    // WE LEARNT HOW WE CAN MAKE API CALL USING AXIOS
    // BELOW WE ARE MAKING THE API CALL AGAIN TO FETCH
    // THE DATA THAT IS REQUIRED BY THE USER
    // BASED ON THE STOCK SELECTED.
    axios.request(options).then(function (response) {
    
    
            var dataFromResponse = response.data;
            // dataFromResponse variable is a complete
            // array containing list of all stocks
            // listed in NIFTY50
    
            for(var i = 0; i<dataFromResponse.length; i++){
                // we iterate through the whole array to find
                // the index of the stock which is
                //selected by the user from the drop-down.
    
            if(dataFromResponse[i].symbol == itemSelectedFromDropdown){
                // We have got the index of stock which user has selected
                // logging the data in the console related to that stock
                        // console.log(dataFromResponse[i]);
                        var dataOfStock = dataFromResponse[i]
                        res.send("<html><body> <h1><strong> " + dataOfStock.symbol + "</strong></h1>"+
                        "<h1> Open: " + dataOfStock.open + "</h1>" +
                        "<h1> Day High: "+ dataOfStock.dayHigh + "</h1>" +
                        "<h1> Day Low: "+ dataOfStock.dayLow + "</h1>" +
                        "<h1> Last Price: "+ dataOfStock.lastPrice + "</h1>" +
                        "<h1> Previous Close: "+ dataOfStock.previousClose + "</h1>" +
                        "<h1> Year Low: "+ dataOfStock.yearHigh + "</h1>" +
                        "<h1> Year Low: "+ dataOfStock.yearLow + "</h1>" +
                        "<h1> Last Update Time: "+ dataOfStock.lastUpdateTime + "</h1>" +
  
                        "</body></html>")
            }
            }
            
    }).catch(function (error) {
    console.error(error);
    });
    });
    

// WE ARE ALLOWING OUR APP TO LISTEN ON PORT 3000
var port = 3000;
app.listen(port, function() {
console.log("Server started successfully at port 3000!");
})
