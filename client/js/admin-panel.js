$(document).ready(function() {
  let curUser = JSON.parse(localStorage.getItem('currentUser'));
  let companyData = JSON.parse(localStorage.getItem('currentCompany'));
  let myCompanyId = companyData._id;

  $('#user-name').text(curUser.first_name);

  let companyInfo = getAllComps();
  updateTable(companyInfo);

  $('#search-input').keyup(function() {
    if($('#search-input').val().trim() != '') {
        companyInfo = updateCompanies($('#search-input').val());
        updateTable(companyInfo);
    };
  });

  function updateCompanies(input) {
    let trimmedInput = input.trim();
    if(trimmedInput.length === 0)
        return;
    let searchCompanies = [];
    $.ajax({
      type: 'GET',
      url: '/api/companies/search/'+ trimmedInput,
      data: $('#response').serialize(),
      async: false,
      dataType: 'json',
      success: function(response) {
        let now = new Date(Date.now());
        for(let i = 0; i < response.length; i++) {
          if(response[i].email !== 'support@apptomatic.com') {
            let searchComp = {};
            searchComp.compId = response[i]._id;
            searchComp.name= response[i].name;
            let sub_exp_date = new Date(response[i].sub_expiration);
            let embedHtml ='';
            if(sub_exp_date < now)
              embedHtml = '<img class="svg-img" src="/images/icons/cross.svg">';
            else
              embedHtml = '<img class="svg-img" src="/images/icons/check.svg">';
            searchComp.subscribed = embedHtml;
            searchComp.revenue = '$'+response[i].revenue;
            searchComp.total_num_subs = response[i].num_months_subscribed;
            searchCompanies.push(searchComp);
          }
        }
      },
    });
    return searchCompanies;
  }

  function updateTable(data) {
    let source = $('#company-list-template').html();
    let template = Handlebars.compile(source);
    let compiledHtml = template(data);
    $('#company-list').html(compiledHtml);
  }

  function getAllComps() {
    let companies = [];
    let now = new Date(Date.now());
    $.ajax({
      type: 'GET',
      url: '/api/companies/',
      data: $('#response').serialize(),
      async: false,
      dataType: 'json',
      success: function(response) {
        for(let i = 0; i < response.length; i++) {
          if(response[i].email != 'support@apptomatic.com') {
            let comp = {};
            comp.compId = response[i]._id;
            comp.name= response[i].name;
            let sub_exp_date = new Date(response[i].sub_expiration);
            let embedHtml ='';
            if(sub_exp_date < now)
              embedHtml = '<img class="svg-img" src="/images/icons/cross.svg">';
            else
              embedHtml = '<img class="svg-img" src="/images/icons/check.svg">';
            comp.subscribed = embedHtml;
            comp.revenue = '$'+response[i].revenue;
            comp.total_num_subs = response[i].num_months_subscribed;
            companies.push(comp);
          }
        }
      },
    });
    return companies;
  }

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
    $.ajax({
       type: 'GET',
       url: 'api/companies/' + $(this).attr('value'),
       data: $('#response').serialize(),
       async: false,
       dataType: 'json',
       success: function(response) {
           localStorage.setItem('currentCompany', JSON.stringify(response));
           window.location = 'company-dashboard.html';
       },
       error: function(response) {
           alert('an error occurred, please try refreshing the page');
       },
    });
  });

  $('#logoutButton').on('click', function() {
    localStorage.setItem('userState', 0);
  });
});
