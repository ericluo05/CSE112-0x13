$(document).ready(function() {
  let curUser = JSON.parse(localStorage.getItem('currentUser'));
  let companyData = JSON.parse(localStorage.getItem('currentCompany'));
  let myCompanyId = companyData._id;
    $('#val_email').text(companyData.email);
    $('#val_phone_number').text(companyData.phone_number);
  let now = new Date(Date.now());
  let sub_exp_date = new Date(companyData.sub_expiration);
  if(sub_exp_date < now)
        $('#value_sub_exp').text('Expired')
    else
      $('#value_sub_exp').text(sub_exp_date.toLocaleDateString());
  $('#user-name').text(curUser.first_name);
  $('#comp-name').text(companyData.name);
  $('#val_revenue').text('$ '+companyData.revenue);
  $('#value_num_employees').text(companyData.num_employees);
  $('#logoutButton').on('click', function() {
    localStorage.setItem('userState', 0);
  });
});
