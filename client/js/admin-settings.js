$(document).ready(function() {
  let curUser = JSON.parse(localStorage.getItem('currentUser'));
  let companyData = JSON.parse(localStorage.getItem('currentCompany'));
  let myCompanyId = companyData._id;

  $('#user-name').text(curUser.first_name);
  showInfo();

  jQuery(function($) {
    $('#modal-phone').mask('(999) 999-9999');
  });

  $('#modal-first').val(curUser.first_name);
  $('#modal-last').val(curUser.last_name);
  $('#modal-email').val(curUser.email);
  $('#modal-phone').val(curUser.phone_number);

  $('.save-btn').click(updateInfo);

  /**
    * Uses Ajax request to update user account information
    **/
  function updateInfo() {
    let newVals = grabFormValues();
    if(newVals.first_name != "" && newVals.last_name != "" &&
      newVals.email != "" && newVals.phone_number != "") {
      let editInfo = {};
      editInfo.first_name= newVals.first_name;
      editInfo.last_name = newVals.last_name;
      editInfo.email = newVals.email;
      editInfo.phone_number = newVals.phone_number;
      $.ajax({
        dataType: 'json',
        type: 'PUT',
        data: editInfo,
        url: 'api/employees/' + curUser._id,
        success: function(response) {
          console.log(response);
          localStorage.setItem('currentUser', JSON.stringify(response));
          curUser = JSON.parse(localStorage.getItem('currentUser'));
          showInfo();
        },
      });
    }

    if(newVals.curr_pw != ""&&newVals.new_pw != ""&&newVals.repeat_pw != "") {
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
          localStorage.setItem('currentUser', JSON.stringify(response));
          curUser = JSON.parse(localStorage.getItem('currentUser'));
        }
      });
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
