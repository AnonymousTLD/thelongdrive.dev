// Apply a saved choice before painting. System mode follows CSS, including OS changes.
(function () {
  "use strict";
  var key = "tld-theme", root = document.documentElement;
  var choices = ["system", "light", "dark"], current = "system";
  try {
    var saved = localStorage.getItem(key);
    if (choices.indexOf(saved) !== -1) current = saved;
  } catch (e) {}
  function apply() {
    if (current === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", current);
  }
  apply();

  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector("header.site .wrap");
    if (!header) return;
    var box = document.createElement("div");
    box.className = "theme-toggle";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Colour theme");
    var buttons = [];
    choices.forEach(function (choice) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = choice.charAt(0).toUpperCase() + choice.slice(1);
      b.setAttribute("aria-label", choice === "system" ? "Use system colour theme" : "Use " + choice + " colour theme");
      b.addEventListener("click", function () {
        current = choice;
        apply();
        try { localStorage.setItem(key, choice); } catch (e) {}
        mark();
      });
      buttons.push([b, choice]);
      box.appendChild(b);
    });
    function mark() {
      buttons.forEach(function (x) { x[0].setAttribute("aria-pressed", String(x[1] === current)); });
    }
    mark();
    header.appendChild(box);
  });
})();
