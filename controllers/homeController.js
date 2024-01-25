const dateAndTime = require("../lib/date.js");
const [, alerts] = require("../lib/setAlerts.js");

const homeView = (_req, res) => {
  const [year] = dateAndTime();
  res.render("home", { alerts, year });
};

module.exports = homeView;
