(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }
  CheckList.prototype.addClickHandler = function(fn) {
    this.$element.on("click", "input", function(event) {
      var email = event.target.value;
      this.removeRow(email);
      fn(email);
    }.bind(this));
  };

  CheckList.prototype.addRow = function(coffeeOrder) {
    // Remove any existing rows that match the email address
    this.removeRow(coffeeOrder.emailAddress);
    // Create a new instance of a row, using the coffee order info
    var rowElement = new Row(coffeeOrder);
    // Add the new row instance"s $element property to the checklist
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function(email) {
    this.$element
      .find("[value=' + email + ']")
      .closest("[data-coffee-order='checkbox']")
      .remove();
  };

  function Row(coffeeOrder) {
    var $div = $("<div></div>", {
      "data-coffee-order": "checkbox",
      "class": "checkbox"
    });
    var $label = $("<label></label>");

    var $checkbox = $("<input></input>", {
      type: "checkbox",
      value: coffeeOrder.emailAddress
    });
    var description = coffeeOrder.size + " ";
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + " ";
    }
    description += coffeeOrder.coffee + ", ";
    description += " (" + coffeeOrder.emailAddress + ")";
    description += " [" + coffeeOrder.strength + "x]";

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);
    this.$element = $div;
  }
  App.CheckList = CheckList;
  window.App = App;
})(window);
