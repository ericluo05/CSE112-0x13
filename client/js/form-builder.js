$(document).ready(function($) {
  $('#user-name').text(JSON.parse(localStorage.getItem('currentUser')).first_name
    + ' ' + JSON.parse(localStorage.getItem('currentUser')).last_name);
  $('.my-form:last .add-box').click(function() {
    let label;
    label = $('#optional_label').val();
    console.log('value: ' + label);
    let n = $('.text-box').length;
    if( 2 < n ) {
        alert('Max number of fields that can be added is 2');
        return false;
    }
    let boxHtml =
    $('<p class="text-box"><label id = "added_label" for="optional_' + n
      + '"> <span class="box-number">' + label + '</span></label><br>' +
      '<input type="text" name="boxes[]" value="" placeholder="Enter here"' +
      'id="box"' + n + '" required/> <button type="button" ' +
      'class="btn btn-danger remove-box">Remove</button></p>');
    boxHtml.hide();
    $('.my-form:first .addField:last').before(boxHtml);
    boxHtml.fadeIn('slow');
    $('#optional_label').val('');
    return false;
  });
});

$('.my-form').on('click', '.remove-box', function() {
  $(this).parent().css( 'background-color', '#FF6C6C' );
  $(this).parent().fadeOut('slow', function() {
    $(this).remove();
    $('.box-number').each(function(index) {
      $('#box2').attr('id', 'box1');
      $('#added_label').attr('for', 'optional_1');
    });
  });
  return false;
});
