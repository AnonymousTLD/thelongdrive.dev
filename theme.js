// Colour theme picker (bottom right): "brown" (the original) or "grey". The choice is remembered in this browser;
// without storage the page simply starts brown. Loaded in <head> so the saved theme applies before the page draws.
(function () {
  var KEY = "tld-palette", root = document.documentElement;
  var themes = [["brown", "Brown"], ["grey", "Grey"]];
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function remember(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function apply(v) {
    if (v === "grey") root.setAttribute("data-palette", "grey"); else root.removeAttribute("data-palette");
  }
  apply(saved());

  document.addEventListener("DOMContentLoaded", function () {
    var box = document.createElement("div");
    box.className = "palette-picker";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Colour theme");
    var buttons = [];
    themes.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "swatch swatch-" + t[0];
      b.title = t[1];
      b.setAttribute("aria-label", t[1] + " theme");
      b.addEventListener("click", function () {
        apply(t[0]); remember(t[0]); mark();
      });
      buttons.push([b, t[0]]);
      box.appendChild(b);
    });
    function mark() {
      var current = root.getAttribute("data-palette") || "brown";
      buttons.forEach(function (x) { x[0].setAttribute("aria-pressed", String(x[1] === current)); });
    }
    mark();
    document.body.appendChild(box);
  });
})();
