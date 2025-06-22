// dmenable.js

// This function reads the dark mode setting from localStorage and applies it.
function applyDarkMode() {
  // Read the boolean from localStorage (defaulting to false)
  let darkModeEnabled = JSON.parse(localStorage.getItem("darkMode") || "false");
  if(darkModeEnabled) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

// Apply dark mode on initial page load.
applyDarkMode();

// Listen for messages from the iframe (navbar.html)
window.addEventListener('message', function(event) {
  // In a production environment you may want to check event.origin!
  if (event.data && event.data.action === 'toggleDarkMode') {
    // Read the current dark mode value (defaulting to false)
    let darkModeEnabled = JSON.parse(localStorage.getItem("darkMode") || "false");
    // Toggle the value
    darkModeEnabled = !darkModeEnabled;
    // Save the new value as JSON
    localStorage.setItem("darkMode", JSON.stringify(darkModeEnabled));
    // Apply the updated dark mode setting
    applyDarkMode();
    console.log("Dark mode toggled to", darkModeEnabled);
  }
});
