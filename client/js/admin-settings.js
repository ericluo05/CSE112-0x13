$(document).ready(function() {
  let curUser = JSON.parse(localStorage.getItem('currentUser'));
  let companyData = JSON.parse(localStorage.getItem('currentCompany'));
  let myCompanyId = companyData._id;

  $('#user-name').text(curUser.first_name);
  $('#first-name').text(curUser.first_name);
  $('#last-name').text(curUser.last_name);
  $('#email').text(curUser.email);
  $('#phone').text(curUser.phone_number);

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
    console.log(newVals);
    $.ajax({
      dataType: 'json',
      type: 'POST',
      data: newVals,
      async: false,
      url: 'api/employees/' + curUser._id,
      success: function(response) {
        console.log(response);
      },
    });
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
    newInfo.company_id = myCompanyId;
    newInfo.password = $('#modal-password').val();
    newInfo.role = 'a_admin';

    return newInfo;
  }

  $('#logoutButton').on('click', function() {
    localStorage.setItem('userState', 0);
  });
});
