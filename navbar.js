$(document).ready(function () {
  // Dynamically load darkmode.js to bring in dark mode functionality.
  $.getScript("darkmode.js")
    .done(function (script, textStatus) {
      console.log("darkmode.js loaded successfully.");
    })
    .fail(function (jqxhr, settings, exception) {
      console.error("Failed to load darkmode.js:", exception);
    });
});
