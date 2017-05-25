jQuery(document).ready(function() {
  /* Fullscreen background */
  $.backstretch('/images/1.jpg');
  $('#top-navbar-1').on('shown.bs.collapse', function() {
    $.backstretch('resize');
  });
  $('#top-navbar-1').on('hidden.bs.collapse', function() {
    $.backstretch('resize');
  });

  /* Form */
  $('.registration-form fieldset:first-child').fadeIn('slow');
  $('.registration-form input[type="text"], ' +
    '.registration-form input[type="password"], ' +
    '.registration-form textarea').on('focus', function() {
    $(this).removeClass('input-error');
  });

  // next step
  $('.registration-form .btn-next').on('click', function() {
    let parentFieldset = $(this).parents('fieldset');
    let nextStep = true;

    parentFieldset.find('input[type="text"], input[type="password"], ' +
      'textarea').each(function() {
      if( $(this).val() == '' ) {
        $(this).addClass('input-error');
        nextStep = false;
      } else {
        $(this).removeClass('input-error');
      }
    });

    if( nextStep ) {
      parentFieldset.fadeOut(400, function() {
        $(this).next().fadeIn();
      });
    }
  });

  // previous step
  $('.registration-form .btn-previous').on('click', function() {
    $(this).parents('fieldset').fadeOut(400, function() {
      $(this).prev().fadeIn();
    });
  });

  // submit
  $('.registration-form').on('submit', function(e) {
    $(this).find('input[type="text"], input[type="password"], textarea').each(function() {
      if( $(this).val() == '' ) {
        e.preventDefault();
        $(this).addClass('input-error');
      } else {
        $(this).removeClass('input-error');
      }
    });
  });
});
