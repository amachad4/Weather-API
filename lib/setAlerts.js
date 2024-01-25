const alerts = [];

function setAlerts(error = false) {
  if (error && error.length) {
    error.forEach((element) => {
      if (!alerts.find((elm) => elm.msg === element.msg)) {
        alerts.push(...error);
      }
    });
  }
}

module.exports = [setAlerts, alerts];
