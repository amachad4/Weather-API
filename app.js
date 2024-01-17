require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const routes = [
  require(__dirname + "/routes/home"),
  require(__dirname + "/routes/weather"),
];

let city = "";
let alert = "";

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.use("/", routes);

// app.route("/").post(
//   [
//     //user input validation
//     check("cityName", "The city name field cannot be empty!").notEmpty().trim(),
//     check("unit", "Invalid unit type!").custom((value, { req, loc, path }) => {
//       if (value !== "Fahrenheit" && value !== "Celsius") {
//         throw new Error("Invalid unit type");
//       } else {
//         return value;
//       }
//     }),
//   ],
//   function (req, res) {
//     const errors = validationResult(req);
//     //if errors array is not empty, redirect with errors
//     if (!errors.isEmpty()) {
//       alert = errors.array();
//       res.redirect("/");
//     } else {
//       const [year, time] = dateAndTime();
//       const { unit: unitType, cityName: query } = req.body;
//       const [unit, unitLetter] = unitSelection(unitType);

//       const url =
//         "https://api.openweathermap.org/data/2.5/weather?q=" +
//         query +
//         "&appid=" +
//         apiKey +
//         "&units=" +
//         unit;
//       https.get(url, function (response) {
//         const { statusCode: status } = response;
//         //if API call returns HTTP 404 error, redirect with errors
//         if (status == 404) {
//           alert = [
//             {
//               msg:
//                 'Sorry, no weather information was found for "' +
//                 query +
//                 '", please try again!',
//             },
//           ];
//           city = query;
//           res.redirect("/");
//         } else {
//           response.on("data", function (data) {
//             const {
//               sys: { country },
//               main: { temp },
//               weather: [{ description, icon }],
//               name: city,
//             } = JSON.parse(data);
//             // capitalize first letters of weather description
//             const desc = capitalize(description);
//             //if errors array is not empty, set alert back to falsy
//             alert = setAlert(alert);

//             const imageUrl =
//               "http://openweathermap.org/img/wn/" + icon + "@4x.png";
//             res.render("weather", {
//               country: country,
//               //if temperature is a single digit, truncate decimal point
//               temp: formatTemp(temp),
//               city: city,
//               desc: desc,
//               imageUrl: imageUrl,
//               time: new Date(),
//               unitLetter: unitLetter,
//               year: year,
//             });
//           });
//         }
//       });
//     }
//   }
// );

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server started successfully on port " + port);
});
