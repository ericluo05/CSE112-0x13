$(document).ready(function() {
  let curUser = JSON.parse(localStorage.getItem('currentUser'));
  let companyData = JSON.parse(localStorage.getItem('currentCompany'));
  let myCompanyId = companyData._id;

  $('#user-name').text(curUser.first_name);
  $('#comp-name').text(companyData.name);

  console.log(companyData.name);

  $('#logoutButton').on('click', function() {
    localStorage.setItem('userState', 0);
  });
});
