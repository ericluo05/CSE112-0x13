$(document).ready(function() {
  let curUser = JSON.parse(localStorage.getItem('currentUser'));
  let companyData = JSON.parse(localStorage.getItem('currentCompany'));
  let myCompanyId = companyData._id;

  $('#user-name').text(curUser.first_name);

  let companyInfo = getAllComps();
  updateTable(companyInfo);

  $('#search-input').keyup(function() {
    console.log($('#search-input').val());
    if($('#search-input').val() != "")
      companyInfo = updateCompanies($('#search-input').val());
    else
      companyInfo = getAllComps();
    updateTable(companyInfo);
  });

  /**
     * Makes a get request for list of all companies that match the
     * search input
     *
     * @param {String} input
     * @return {Object} list of companies that match input string
     */
  function updateCompanies(input) {
    let searchCompanies = [];
    $.ajax({
      type: 'GET',
      url: '/api/companies/search/'+ input,
      data: $('#response').serialize(),
      async: false,
      dataType: 'json',
      success: function(response) {
        for(let i = 0; i < response.length; i++) {
          if(response[i].name != 'Emissary') {
            let searchComp = {};
            searchComp.compId = response[i]._id;
            searchComp.name= response[i].name;
            searchComp.employeeNum = getEmployeeNum(response[i]._id);
            searchComp.subLength = getLength(response[i].paid_time.toString());
            searchCompanies.push(searchComp);
          }
        }
      },
    });
    return searchCompanies;
  }

  /**
     * Updates the Handlebars template to display the newest
     * company list
     *
     * @param {Object} data
     */
  function updateTable(data) {
    let source = $('#company-list-template').html();
    let template = Handlebars.compile(source);
    let compiledHtml = template(data);
    $('#company-list').html(compiledHtml);
  }

  /**
     * Makes a get request for list of all companies then uses data
     * to get number of employees and subscription length
     *
     * @return {Object} list of companies w/ id, name, employee number,
     * subscription length
     */
  function getAllComps() {
    let companies = [];
    $.ajax({
      type: 'GET',
      url: '/api/companies/',
      data: $('#response').serialize(),
      async: false,
      dataType: 'json',
      success: function(response) {
        for(let i = 0; i < response.length; i++) {
          if(response[i].name != 'Emissary') {
            let comp = {};
            comp.compId = response[i]._id;
            comp.name= response[i].name;
            comp.employeeNum = getEmployeeNum(response[i]._id);
            comp.subLength = getLength(response[i].paid_time.toString());
            companies.push(comp);
          }
        }
      },
    });
    return companies;
  }

  /**
     * Makes a get request for list of all employees then uses data
     * to count total number of employees
     *
     * @param {String} companyID
     * @return {Number} total number of employees
     */
  function getEmployeeNum(companyID) {
    let num;
    $.ajax({
      type: 'GET',
      url: '/api/employees/company/' + companyID,
      data: $('#response').serialize(),
      async: false,
      dataType: 'json',
      success: function(response) {
        num = response.length;
      },
    });
    return num;
  }

  /**
     * Uses current date and paid_time date to determine number of years
     * and days subscribed
     *
     * @param {Date} subDate
     * @return {String} formatted string of years/days subscribed
     */
  function getLength(subDate) {
    let today = new Date();
    let orig = new Date(Date.parse(subDate));
    let oneDay = 24*60*60*1000;
    let totalLen;

    let diffDays = Math.round(Math.abs((today.getTime() - orig.getTime())/(oneDay)));

    if(diffDays == 1)
      totalLen = diffDays + ' day';
    else if(diffDays > 1) {
      totalLen = diffDays + ' days';
      if(diffDays == 365 || Math.round(diffDays/365) == 1)
        totalLen = '1 year';
      if(Math.round(diffDays/365) > 1 && diffDays > 365)
        totalLen = Math.round(diffDays/365) + ' years';
      if((diffDays%365) > 0 && diffDays > 365)
        totalLen = totalLen + ' ' + (diffDays%365) + ' days';
    }
    return totalLen;
  }

  $('body').on('click', '.company-row', function() {
    console.log($(this).attr('value'));
    $.ajax({
       type: 'GET',
       url: 'api/companies/' + $(this).attr('value'),
       data: $('#response').serialize(),
       async: false,
       dataType: 'json',
       success: function(response) {
           localStorage.setItem('currentCompany', JSON.stringify(response));
       },
    });
    window.location = 'company-dashboard.html';
  });

  $('#logoutButton').on('click', function() {
    localStorage.setItem('userState', 0);
  });
});
