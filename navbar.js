document.addEventListener("DOMContentLoaded", function () {
  var includeEl = document.getElementById("navbar-container");
  if (includeEl) {
    var file = includeEl.getAttribute("data-include");
    if (file) {
      fetch(file)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Could not load " + file + " (" + response.statusText + ")");
          }
          return response.text();
        })
        .then(function (html) {
          includeEl.innerHTML = html;
        })
        .catch(function (error) {
          console.error("Error loading navbar:", error);
        });
    } else {
      console.error("No data-include attribute found on #navbar-container.");
    }
  }
});
