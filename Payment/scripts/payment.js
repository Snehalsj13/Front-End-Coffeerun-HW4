(function(window) {
  "use strict";
  var App = window.App || {};

  function Payment(db) {
    this.db = db;
  }
  Payment.prototype.validatePayment = function(details) {
    /*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
    console.log("Validating payment for " + details.username);
    this.db.add(details.username, details);
  };
  App.Payment = Payment;
  window.App = App;
})(window);
