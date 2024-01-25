require("dotenv").config();
const { check, validationResult } = require("express-validator");
const dateAndTime = require("../lib/date.js");
const unitSelection = require("../lib/units.js");
const capitalize = require("../lib/capitalize.js");
const formatTemp = require("../lib/formatTemp.js");
const https = require("https");
const [setAlerts, alerts] = require("../lib/setAlerts.js");

const { API_KEY: apiKey } = process.env;

const validationMiddleware = [
  // user input validation
  check("cityName", "The city name field cannot be empty!").notEmpty().trim(),
  check("unit", "Invalid unit type!").custom((value, { req, loc, path }) => {
    if (value !== "Fahrenheit" && value !== "Celsius") {
      throw new Error("Invalid unit type");
    } else {
      return value;
    }
  }),
];

const weatherView = (req, res) => {
  const errors = validationResult(req);
  //if errors array is not empty, redirect with errors
  if (!errors.isEmpty()) {
    setAlerts(errors.array());
    res.redirect("/");
  } else {
    const [year, time] = dateAndTime();
    const { unit: unitType, cityName: query } = req.body;
    const [unit, unitLetter] = unitSelection(unitType);

    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      query +
      "&appid=" +
      apiKey +
      "&units=" +
      unit;
    https.get(url, function (response) {
      const { statusCode: status } = response;
      //if API call returns HTTP 404 error, redirect with errors
      if (status == 404) {
        setAlerts([
          {
            msg:
              'Sorry, no weather information was found for "' +
              query +
              '", please try again!',
          },
        ]);
        city = query;
        res.redirect("/");
      } else {
        response.on("data", function (data) {
          const {
            sys: { country },
            main: { temp },
            weather: [{ description, icon }],
            name: city,
          } = JSON.parse(data);
          // capitalize first letters of weather description
          const desc = capitalize(description);
          //if errors array is not empty, set alerts back to falsy
          if (alerts.length) {
            alerts.length = 0;
          }

          const imageUrl =
            "http://openweathermap.org/img/wn/" + icon + "@4x.png";
          res.render("weather", {
            country: country,
            //if temperature is a single digit, truncate decimal point
            temp: formatTemp(temp),
            city: city,
            desc: desc,
            imageUrl: imageUrl,
            time: new Date(),
            unitLetter: unitLetter,
            year: year,
          });
        });
      }
    });
  }
};

module.exports = [validationMiddleware, weatherView];
