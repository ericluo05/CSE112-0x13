$(document).ready(function() {
    let companyData = JSON.parse(localStorage.getItem('currentCompany'));
    let myCompanyId = companyData._id;
    let curUser = JSON.parse(localStorage.getItem('currentUser'));
    $('#user-name').text(curUser.first_name + ' ' + curUser.last_name);

    jQuery(function($) {
      $('#phone').mask('(999) 999-9999');
    });

    jQuery(function($) {
      $('#phone-number-edit').mask('(999) 999-9999');
    });

    let employees = getEmployees();
    let source = $('#employee-list-template').html();
    let template = Handlebars.compile(source);
    let compiledHtml = template(employees);

    $('#employee-list').html(compiledHtml);
    $('.save-btn').click(submitForm);

   /**
     * Makes a get request to display list of employees
     * @return {Object} displays the employee list
     */
    function getEmployees() {
       let json;
       $.ajax({
           dataType: 'json',
           type: 'GET',
           data: $('#response').serialize(),
           async: false,
           url: '/api/employees/company/' + myCompanyId,
           success: function(response) {
               json = response;
           },
       });
       return json;
   }

   /**
     * Makes a post request to update list of employees
     * when adding a new employee
     * @param {Object} obj
     */
   function updateEmployeeList(obj) {
      $.ajax({
        dataType: 'json',
        type: 'POST',
        data: obj,
        async: false,
        url: '/api/employees',
        success: function(response) {
          employees.push(response);
          $('#other-msg').addClass('hidden');
          $('#myModal').modal('hide');
        },
        error: function(response) {
          $('#other-msg').removeClass('hidden');
        }
      });
    }

    /**
      * When a patient submits their form
      */
    function submitForm() {
      let d = grabFormElements();
      if(d.password == d.confirm_password) {
        $('#repeat-pw').removeClass('has-error');
        $('#repeat-pw-msg').addClass('hidden');
        updateEmployeeList(d);
        employees = getEmployees();
        $('#employee-list').html(template(employees));
        document.getElementById('employee-form').reset();
      } else {
        $('#repeat-pw').addClass('has-error');
        $('#repeat-pw-msg').removeClass('hidden');
      }
    }
    /**
     * ???
     */
    function updateInfo() {
    let newVals = grabFormValues();
    $.ajax({
      dataType: 'json',
      type: 'PUT',
      data: newVals,
      async: false,
      url: 'api/employees/' + curUser._id,
      success: function(response) {
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
    $('#user-name').text(curUser._id);
    $('#first-name').text(curUser.first_name);
    $('#last-name').text(curUser.last_name);
    $('#email').text(curUser.email);
    $('#phone').text(curUser.phone_number);
  }

  /**
    * Grabs elements from the edit form and puts it into an object
    * @return {object}
    **/
  function grabFormValues() {
    let newInfo = {};
    newInfo.first_name= $('#first-name-edit').val();
    newInfo.last_name = $('#last-name-edit').val();
    newInfo.email = $('#email-edit').val();
    newInfo.phone_number = $('#phone-number-edit').val();
    newInfo.receive_sms = $('#get-sms-edit').is(':checked');
    newInfo.receive_email = $('#get-email-edit').is(':checked');
    return newInfo;
  }


    /**
     * populate edit employee form values
     * @param {Object} employee - employee data
     **/
  function setEditFormValues(employee) {
      $('#employee-id-edit').val(employee._id);
      $('#first-name-edit').val(employee.first_name);
      $('#last-name-edit').val(employee.last_name);
      $('#email-edit').val(employee.email);
      $('#phone-number-edit').val(employee.phone_number);
      $('#get-email-edit').prop('checked', employee.receive_email);
      $('#get-sms-edit').prop('checked', employee.receive_sms);
  }

    /**
      * Grabs elements from the creating new employee form and puts it into an object
      * @return {Object} new employee object
      */
    function grabFormElements() {
        let newEmployee = {};
        newEmployee.company_id = myCompanyId;
        newEmployee.role = 'c_employee',
        newEmployee.first_name= $('#first-name').val();
        newEmployee.last_name = $('#last-name').val();
        newEmployee.phone_number = $('#phone').val();
        newEmployee.email = $('#email').val();
        newEmployee.password = $('#employee-pw').val();
        newEmployee.confirm_password = $('#employee-confirm-pw').val();
        newEmployee.receive_sms = $('#get-sms').is(':checked');
        newEmployee.receive_email = $('#get-email').is(':checked');
        return newEmployee;
    }

    /**
      * Deletes the employee from the list
      */
    $(document).on('click', '.delete-employee', function() {
      let employeeId = $(this).closest('.employee-row').attr('value');
      $.ajax({
        dataType: 'json',
        type: 'DELETE',
        url: '/api/employees/' + employeeId,
        success: function(response) {
          let updateEmployees = getEmployees();
          // let removeAppt = initializeAppts(updateAppts);
          $('#employee-list').html(template(updateEmployees));
        },
      });
    });

// populate popup fields when clicking update button
    $(document).on('click', '.update-employee', function() {
        let employeeId = $(this).closest('.employee-row').attr('value');
         $.ajax({
         dataType: 'json',
         type: 'GET',
         url: '/api/employees/' + employeeId,
         success: function(response) {
            setEditFormValues(response);
            $('#other-msg-edit').addClass('hidden');
          },
          error: function(response) {
            $('#other-msg-edit').removeClass('hidden');
            },
         });
    });

    $(document).on('click', '.save-changes-btn', function() {
        let employeeId = $('#employee-id-edit').val();
        let newInfo = grabFormValues();
        $.ajax({
            dataType: 'json',
            type: 'PUT',
            url: '/api/employees/' + employeeId,
            data: newInfo,
            success: function(response) {
              $('#myModal2').modal('hide');
              let updateEmployees = getEmployees();
              $('#employee-list').html(template(updateEmployees));
              $('#other-msg-edit').addClass('hidden');
            },
            error: function(response) {
              $('#other-msg-edit').removeClass('hidden');
            }
        });
    });


    // /**
    //   * Find Specific Employee Given Employee ID within the Employee Array
    //   * @param {Oject} id
    //   * @return {String}
    //   */
    // function findEmployee(id) {
    //     for(let employee in employeeList) {
    //        if(employeeList.hasOwnProperty(employee)) {
    //           if(employeeList[employee]._id === id) {
    //               if(DEBUG) // console.log(employeeList[employee]);
    //               return employeeList[employee];
    //           }
    //        }
    //     }
    // }

    $('#logoutButton').on('click', function() {
      localStorage.setItem('userState', 0);
    });
});

