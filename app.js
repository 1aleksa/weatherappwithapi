
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "0e5dd8939fac1d50edeb3be532e9bcff";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + units;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
      res.write("<img src="+ imageURL +">");
      res.send();
    });
  })
})

app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
