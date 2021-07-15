let form = document.forms.myForm;
let piz = form.elements.piz;
let siz = form.elements.siz;
let sauc = form.elements.sauc;
const body = document.querySelector("body");
let widget = document.querySelector(".widget");
const button = document.querySelector("#green");
let result = document.getElementById("result");
let container = document.querySelector(".container");
const modal = document.getElementById("modal");
let error = document.getElementById("error");
const buttonClose = document.querySelector("#btn-modal");

widget.addEventListener("input", (event) => {
  if (
    piz.value === "Пепперони" ||
    piz.value === "Деревенская" ||
    piz.value === "Гавайская" ||
    piz.value === "Грибная"
  ) {
    siz.disabled = false;
  }
  if (
    (siz.value === "45" ||
      siz.value === "31" ||
      siz.value === "26" ||
      siz.value === "21") &&
    (piz.value === "Пепперони" ||
      piz.value === "Деревенская" ||
      piz.value === "Гавайская" ||
      piz.value === "Грибная")
  ) {
    sauc.disabled = false;
  }
});

button.addEventListener("click", function () {
  if (
    (siz.value === "45" ||
      siz.value === "31" ||
      siz.value === "26" ||
      siz.value === "21") &&
    (piz.value === "Пепперони" ||
      piz.value === "Деревенская" ||
      piz.value === "Гавайская" ||
      piz.value === "Грибная") &&
    (sauc.value === "сырный" ||
      sauc.value === "кисло-сладкий" ||
      sauc.value === "чесночный" ||
      sauc.value === "барбекю")
  ) {
    container.hidden = false;
    modal.hidden = false;
    body.classList.add("scroll-hidden");

    buttonClose.addEventListener("click", function () {
      modal.hidden = true;
      body.classList.remove("scroll-hidden");
      document.forms.myForm.reset();
      siz.disabled = true;
      sauc.disabled = true;
    });
    document.getElementById("str").innerHTML = piz.value;
    document.getElementById("text").innerHTML = siz.value;
    document.getElementById("text-sauces").innerHTML = sauc.value;

    if (siz.value === "45") {
      result.innerHTML = "Цена пиццы 8 рублей.";
    } else if (siz.value === "31") {
      result.innerHTML = "Цена пиццы 6 рублей.";
    } else if (siz.value === "26") {
      result.innerHTML = "Цена пиццы 5 рублей.";
    } else if (siz.value === "21") {
      result.innerHTML = "Цена пиццы 4 рубля.";
    }
  } else {
    error.innerHTML = "Пожалуйста, вберите данные из списков.";
  }
  widget.addEventListener("input", (event) => {
    if (
      (siz.value === "45" ||
        siz.value === "31" ||
        siz.value === "26" ||
        siz.value === "21") &&
      (piz.value === "Пепперони" ||
        piz.value === "Деревенская" ||
        piz.value === "Гавайская" ||
        piz.value === "Грибная") &&
      (sauc.value === "сырный" ||
        sauc.value === "кисло-сладкий" ||
        sauc.value === "чесночный" ||
        sauc.value === "барбекю")
    ) {
      error.innerHTML = "";
    }
  });
});

let pizzaSize = ["45", "31", "26", "21"];

let pizzaArray = ["Пепперони", "Деревенская ", "Гавайская", "Грибная"];
let pizzaSauces = ["сырный", "кисло-сладкий", "чесночный", "барбекю"];

$.each(pizzaArray, function (i) {
  $("<option value=" + pizzaArray[i] + ">").appendTo("#pizza");
});

$(".pizzaArray").click(function () {
  let myVar = $("input").val();
  alert(myVar);
});

$.each(pizzaSize, function (i) {
  $("<option value=" + pizzaSize[i] + ">").appendTo("#size");
});

$(".pizzaSaze").click(function () {
  let myVar = $("input").val();
  alert(myVar);
});

$.each(pizzaSauces, function (i) {
  $("<option value=" + pizzaSauces[i] + ">").appendTo("#sauces");
});

$(".pizzaSauces").click(function () {
  let myVar = $("input").val();
  alert(myVar);
});

$(function () {
  $(".jqButton").click(function (e) {
    e.preventDefault();
    $(this).button();
  });
});

$(function () {
  $.widget("custom.colorize", {
    // default options
    options: {
      red: 255,
      green: 0,
      blue: 0,
      // Callbacks
      random: null,
    },

    // The constructor
    _create: function () {
      this.element
        // add a class for theming
        .addClass("custom-colorize");

      this.changer = $({
        class: "custom-colorize-changer",
      });

      this._on(this.changer, {
        // _on won't call random when widget is disabled
        click: "random",
      });
      this._refresh();
    },

    _refresh: function () {
      this.element.css(
        "background-color",
        "rgb(" +
          this.options.red +
          "," +
          this.options.green +
          "," +
          this.options.blue +
          ")"
      );
    },

    random: function (event) {
      var colors = {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
      };

      // Trigger an event, check if it's canceled
      if (this._trigger("random", event, colors) !== false) {
        this.option(colors);
      }
    },

    _setOptions: function () {
      // _super and _superApply handle keeping the right this-context
      this._superApply(arguments);
      this._refresh();
    },
    _setOption: function (key, value) {
      // prevent invalid color values
      if (/red|green|blue/.test(key) && (value < 0 || value > 255)) {
        return;
      }
      this._super(key, value);
    },
  });

  // Initialize with default options
  $("#my-widget1").colorize();

  // Initialize with two customized options
  $("#my-widget2").colorize({
    red: 5,
    blue: 850,
  });

  // Initialize with custom green value
  // and a random callback to allow only colors with enough green
  $("#my-widget3").colorize({
    green: 128,
    random: function (event, ui) {
      return ui.green > 128;
    },
  });

  // Click to set options after initialization
  $("#green").on("click", function () {
    $(":custom-colorize").colorize("option", {
      red: 64,
      green: 250,
      yellow: 100,
    });
  });
});
