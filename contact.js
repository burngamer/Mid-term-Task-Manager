$(document).ready(function() {
  $('#contactForm').submit(function(e) {
    e.preventDefault(); // Prevent default form submission
    $('#confirmation').fadeIn(); // Show confirmation message
    setTimeout(function() {
      $('#confirmation').fadeOut(); // Hide confirmation after 3 seconds
      $('#contactForm')[0].reset(); // Reset the form fields
    }, 3000);
  });
});
