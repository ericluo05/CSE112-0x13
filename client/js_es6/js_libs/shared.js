/*var companyData = JSON.parse(localStorage.getItem("currentCompany"));
var visitorList;
companyData.company_id = companyData._id;
var curUser = JSON.parse(localStorage.getItem('currentUser'));

var companyName = companyData.name;
console.log(companyData);
$('#user-name').text(curUser.first_name + ' ' +  curUser.last_name);*/

var userState = JSON.parse(localStorage.getItem("userState"));
  if(!userState || userState == 2){
    location.href= "login.html";
}
