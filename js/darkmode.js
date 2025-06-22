// darkmode.js

$(document).ready(function () {
  // Check localStorage for dark mode setting (stored as a JSON boolean)
  let darkModeEnabled = JSON.parse(localStorage.getItem('darkMode'));
  if (darkModeEnabled) {
    $('body').addClass('dark-mode');
    // Optionally also adjust the navbar if needed:
    $('.navbar').addClass('dark-mode');
    $('#darkModeToggle').text('Light Mode');
  } else {
    $('body').removeClass('dark-mode');
    $('.navbar').removeClass('dark-mode');
    $('#darkModeToggle').text('Dark Mode');
  }

  // Toggle button handler
  $('#darkModeToggle').click(function () {
    $('body').toggleClass('dark-mode');
    $('.navbar').toggleClass('dark-mode');

    // Check if dark mode is now active
    if ($('body').hasClass('dark-mode')) {
      localStorage.setItem('darkMode', JSON.stringify(true));
      $(this).text('Light Mode');
    } else {
      localStorage.setItem('darkMode', JSON.stringify(false));
      $(this).text('Dark Mode');
    }
  });
});
