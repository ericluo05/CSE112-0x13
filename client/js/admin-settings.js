$(document).ready(function() {
  let curUser = JSON.parse(localStorage.getItem('currentUser'));
  let companyData = JSON.parse(localStorage.getItem('currentCompany'));
  let myCompanyId = companyData._id;

  $('#user-name').text(curUser.first_name);
  showInfo();

  jQuery(function($) {
    $('#modal-phone').mask('(999) 999-9999');
  });

  $('.save-btn').click(updateInfo);

  /**
    * Uses Ajax request to update user account information
    **/
  function updateInfo() {
    let closeModal = false;
    let newVals = grabFormValues();
    if(newVals.first_name != "" || newVals.last_name != "" ||
      newVals.email != "" || newVals.phone_number != "") {
      let editInfo = {};
      if(newVals.first_name != "")
        editInfo.first_name = newVals.first_name;
      if(newVals.last_name != "")
        editInfo.last_name = newVals.last_name;
      if(newVals.email != "")
        editInfo.email = newVals.email;
      if(newVals.phone_number != "")
        editInfo.phone_number = newVals.phone_number;
      $.ajax({
        dataType: 'json',
        type: 'PUT',
        data: editInfo,
        url: 'api/employees/' + curUser._id,
        success: function(response) {
          console.log(response);
          if(newVals.curr_pw == "" && newVals.new_pw == ""
            && newVals.repeat_pw == "")
            $('#myModal').modal('hide');
          localStorage.setItem('currentUser', JSON.stringify(response));
          curUser = JSON.parse(localStorage.getItem('currentUser'));
          showInfo();
        },
      });
    }

    if(newVals.curr_pw != ""&&newVals.new_pw != ""&&newVals.repeat_pw != "") {
      if(newVals.new_pw == newVals.repeat_pw) {
        let editInfo = {};
        editInfo.currentpwd = newVals.curr_pw;
        editInfo.newpwd = newVals.new_pw;
        $.ajax({
          dataType: 'json',
          type: 'POST',
          data: jQuery.param(editInfo),
          url: 'api/employees/pwdchange/' + curUser._id,
          success: function(response) {
            console.log(response);
            $('#myModal').modal('hide');
            localStorage.setItem('currentUser', JSON.stringify(response));
            curUser = JSON.parse(localStorage.getItem('currentUser'));
          },
          error: function(response) {
            let resJSON = JSON.stringify(response);
            let message = response.responseText;
            $('#curr-pw').removeClass('has-error');
            $('#curr-pw-msg').addClass('hidden');
            $('#new-pw').removeClass('has-error');
            $('#new-pw-msg').addClass('hidden');
            $('#repeat-pw').removeClass('has-error');
            $('#repeat-pw-msg').addClass('hidden');
            if(message == '{"error":"Incorrect password"}') {
              $('#curr-pw').addClass('has-error');
              $('#curr-pw-msg').removeClass('hidden');
            } else if(message == '{"error":"Can not change"}') {
              $('#new-pw').addClass('has-error');
              $('#new-pw-msg').removeClass('hidden');
            }
          }
        });
      } else {
        $('#repeat-pw').addClass('has-error');
        $('#repeat-pw-msg').removeClass('hidden');
      }
    }
  }

  /**
    * Use current user saved in local storage to show user information
    **/
  function showInfo() {
    $('#user-name').text(curUser.first_name);
    $('#first-name').text(curUser.first_name);
    $('#last-name').text(curUser.last_name);
    $('#email').text(curUser.email);
    $('#phone').text(curUser.phone_number);
    $('#modal-first').val(curUser.first_name);
    $('#modal-last').val(curUser.last_name);
    $('#modal-email').val(curUser.email);
    $('#modal-phone').val(curUser.phone_number);
  }

  /**
    * Grabs elements from the form and puts it into an object
    * @return {object}
    **/
  function grabFormValues() {
    let newInfo = {};
    newInfo.first_name = $('#modal-first').val();
    newInfo.last_name = $('#modal-last').val();
    newInfo.email = $('#modal-email').val();
    newInfo.phone_number = $('#modal-phone').val();
    newInfo.curr_pw = $('#modal-curr-pw').val();
    newInfo.new_pw = $('#modal-new-pw').val();
    newInfo.repeat_pw = $('#modal-repeat-new-pw').val();

    return newInfo;
  }

  $('#logoutButton').on('click', function() {
    localStorage.setItem('userState', 0);
  });
});
