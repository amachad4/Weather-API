class PrivateAlert {
  alert;

  constructor(alert) {
    this.alert = alert;
  }

  get getAlert() {
    return this.alert;
  }
}

class Alert {
  static getInstance(alert) {
    if (!Alert.instance && alert.length) {
      Alert.instance = new PrivateAlert(alert);
    }
    return Alert.instance;
  }
}

module.exports = Alert;
