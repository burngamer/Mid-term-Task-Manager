$(document).ready(function() {
  $('#contactForm').submit(function(e) {
    e.preventDefault(); 
    $('#confirmation').fadeIn(); 
    setTimeout(function() {
      $('#confirmation').fadeOut(); 
      $('#contactForm')[0].reset(); 
    }, 3000);
  });
});
