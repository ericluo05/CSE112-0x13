/**
 * Created by DanielKong on 3/8/16.
 */
$(document).ready(function() {
    let companyId;

    $('.registration-form fieldset:first-child').fadeIn('slow');

    jQuery(function($){
       $("#form-phone").mask("(999) 999-9999");
    });

    jQuery(function($){
       $("#form-employee-phone").mask("(999) 999-9999");
    });

    // Listener for Initial Sign up of an Employee
    $('#submit-btn').on('click', function() {
        let employeeData = grabEmployeeData();
        console.log(employeeData);

        let next = true;
        if(employeeData.first_name == "") {
          $('#per-first-name').addClass('has-error');
          $('#per-first-msg').removeClass('hidden');
          next = false;
        }
        if(employeeData.email == "") {
          $('#per-email').addClass('has-error');
          $('#per-email-msg').removeClass('hidden');
          next = false;
        }
        if(employeeData.phone_number == "") {
          $('#per-phone').addClass('has-error');
          $('#per-phone-msg').removeClass('hidden');
          next = false;
        }
        if(employeeData.password == "") {
          $('#per-password').addClass('has-error');
          $('#per-pw-msg').removeClass('hidden');
          $('#per-password-repeat').addClass('has-error');
          $('#per-pw-repeat-msg').removeClass('hidden');
          next = false;
        }
        if(employeeData.last_name == "") {
          $('#per-last-name').addClass('has-error');
          $('#per-last-msg').removeClass('hidden');
          next = false;
        }
        if(next)
          ajaxPost('/api/employees', employeeData);
    });

    // Listener for creating a company
    $('#submit-company-btn').on('click', function() {
        let companyData = grabCompanyData();
        console.log(companyData);
        
        let next = true;
        if(companyData.name == "") {
          $('#comp-name').addClass('has-error');
          $('#comp-name-msg').removeClass('hidden');
          next = false;
        }
        if(companyData.email == "") {
          $('#comp-email').addClass('has-error');
          $('#comp-email-msg').removeClass('hidden');
          next = false;
        }
        if(companyData.phone_number == "") {
          $('#comp-phone').addClass('has-error');
          $('#comp-phone-msg').removeClass('hidden');
          next = false;
        }

        if(next)
          ajaxPost('/api/companies', companyData);
    });


    /** Grab Company Data from form
     * @return {obj}
     **/
    function grabCompanyData() {
        let company = {};
        company.name = $('#form-company-name').val();
        company.email = $('#form-email').val();
        company.phone_number = $('#form-phone').val();
        return company;
    }


    /** Grab employee data from form
     * @return {obj}
     **/
    function grabEmployeeData() {
        let employee = {};
        employee.first_name = $('#form-employee-first').val();
        employee.last_name = $('#form-employee-last').val();
        employee.email = $('#form-employee-email').val();
        employee.password = $('#form-password').val();
        employee.phone_number = $('#form-employee-phone').val();
        employee.role = 'c_admin';
        employee.company_id = companyId;
        return employee;
    }


    /** Ajax function to create a POST request to server
     * @param {obj} url
     * @param {obj} data
     **/    
    function ajaxPost(url, data) {
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            success: function(response) {
                if(url == '/api/employees') {
                    localStorage.setItem('userState', 1);
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    location.href = '/visitors.html';
                } else if (url == '/api/companies') {
                    localStorage.setItem('currentCompany', JSON.stringify(response));
                    companyId = response._id;
                    $('#first-fs').fadeOut(400, function() {
                      $('#second-fs').fadeIn();
                    });
                }
            },
            error: function(response) {
                let resJSON = JSON.stringify(response);
                let message = response.responseText;

                $('#comp-name').removeClass('has-error');
                $('#comp-name-msg').addClass('hidden');
                $('#comp-email').removeClass('has-error');
                $('#comp-email-msg').addClass('hidden');
                $('#comp-phone').removeClass('has-error');
                $('#comp-phone-msg').addClass('hidden');

                if(message == "{\"eror\":\"Unique Email Needed\"}") {
                  $('#comp-email').addClass('has-error');
                  $('#comp-unique-email-msg').removeClass('hidden');
                }
            },
        });
    }
   
    // submit
    $('.registration-form').on('submit', function(e) {
      $(this).find('input[type="text"], input[type="password"], ' +
        ' textarea').each(function() {
        if( $(this).val() == '' ) {
          e.preventDefault();
        } 
      });
    });

    /**  Validating the company
     **/ 
    function validateCompany() {
        let companyName = $('#form-company-name').val();
        let companyEmail = $('#form-email').val();
        let companyNumber = $('#form-phone').val();

        if(companyName == '') {
            console.log('username cannot be blank');
        }

        if(validateEmail(companyEmail)) {
            console.log('please enter a valid email');
        }
    }

    /**  Validating the email
    @param {string} email
    @return {boolean}
     **/
    function validateEmail(email) {
        let re = new RegExp (
            ['/^(([^<>()\[\]\\.,;:\s@"]',
            '+(\.[^<>()\[\]\\.,;:\s@"]+)*)',
            '|(".+"))@((\[[0-9]{1,3}\.[0-9]',
            '{1,3}\.[0-9]{1,3}\.[0-9]{1,3}',
            '])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]',
            '{2,}))$/'].join('')
        );
        
        return re.test(email);
    }
    
    /**  Validating the password
    * @param {object} form
    * @return {boolean}
     **/
    function checkPassword(form) {
        if(form.first.value == '') {
          alert('Error: Username cannot be blank!');
          form.username.focus();
          return false;
        }
        let password = $('#form-password');
        let confirmPassword = $('#form-repeat-password');

        if(password.value != '' && password.value == confirmPassword.value) {
          if(form.password.value.length < 6) {
            console.log('Password must contain at least six characters!');
            password.focus();
            return false;
          }
         if(password.value == password.value) {
            console.log('Error: Password must be different from Username!');
            password.focus();
            return false;
          }
          re = /[0-9]/;
          if(!re.test(password.value)) {
            console.log('Error: password must contain at least one number (0-9)!');
            password.focus();
            return false;
          }
          re = /[a-z]/;
          if(!re.test(password.value)) {
            console.log(
                'Error: password must contain' +
                'at least one lowercase letter (a-z)!'
            );
            password.focus();
            return false;
          }
          re = /[A-Z]/;
          if(!re.test(form.pwd1.value)) {
            console.log(
                'Error: password must contain' +
                'at least one uppercase letter (A-Z)!'
            );
            password.focus();
            return false;
          }
        } else {
          console.log(
              'Error: Please check that you\'ve' +
              'entered and confirmed your password!'
          );
          password.focus();
          return false;
        }
        console.log('You entered a valid password: ' + password.value);
        return true;
    }
    
});
