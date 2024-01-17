const dateAndTime = require("../lib/date.js");
const Alert = require("../lib/setAlert.js");

let city = "";
let alert = Alert.getInstance([]) ?? [];

const homeView = (_req, res) => {
  const [year] = dateAndTime();
  res.render("home", { city, alert: alert?.getAlert ?? alert, year });
};

module.exports = homeView;
