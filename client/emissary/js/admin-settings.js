$(document).ready(function() {
  let curUser = JSON.parse(localStorage.getItem('currentUser'));
  let companyData = JSON.parse(localStorage.getItem('currentCompany'));
  let myCompanyId = companyData._id;

  $('#user-name').text(curUser.first_name);
  showInfo();

  $('#modal-first').val(curUser.first_name);
  $('#modal-last').val(curUser.last_name);
  $('#modal-email').val(curUser.email);
  $('#modal-phone').val(curUser.phone_number);

  $('.save-btn').click(updateInfo);

  /**
    * Uses POST request to update user account information
    **/
  function updateInfo() {
    let newVals = grabFormValues();
    $.ajax({
      dataType: 'json',
      type: 'PUT',
      data: newVals,
      async: false,
      url: 'api/employees/' + curUser._id,
      success: function(response) {
        console.log(response);
        localStorage.setItem('currentUser', JSON.stringify(response));
        curUser = JSON.parse(localStorage.getItem('currentUser'));
        showInfo();
      },
    });
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
    newInfo.first_name= $('#modal-first').val();
    newInfo.last_name = $('#modal-last').val();
    newInfo.email = $('#modal-email').val();
    newInfo.phone_number = $('#modal-phone').val();

    return newInfo;
  }

  $('#logoutButton').on('click', function() {
    localStorage.setItem('userState', 0);
  });
});
