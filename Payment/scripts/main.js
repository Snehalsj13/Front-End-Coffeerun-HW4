(function(window) {
  "use strict";
  var FORM_SELECTOR_PAYMENT = "[data-payment='form']";
  var App = window.App;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR_PAYMENT);
  var Payment = App.Payment;
  var myPayment = new Payment(new DataStore());
  window.myPayment = myPayment;
  formHandler.addSubmitHandler(myPayment.validatePayment.bind(myPayment));
  console.log(formHandler);
})(window);
