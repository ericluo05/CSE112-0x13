$(document).ready(function() {
    let companyData = JSON.parse(localStorage.getItem('currentCompany'));
    let myCompanyId = companyData._id;
    let curUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log(myCompanyId);

    $('#user-name').text(curUser.first_name + ' ' + curUser.last_name);

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
               console.log(response); // ****************
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
               console.log(response); //* ********
           },
      });
    }

    /**
      * When a patient submits their form
      */
    function submitForm() {
        let d = grabFormElements();
        console.log(d);
        updateEmployeeList(d);
        employees = getEmployees();
        $('#employee-list').html(template(employees));
        document.getElementById('employee-form').reset();
    }

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
    $('#user-name').text(curUser._id);
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
    newInfo.first_name= $('#first-name-edit').val();
    newInfo.last_name = $('#last-name-edit').val();
    newInfo.email = $('#email-edit').val();
    newInfo.phone_number = $('#phone-number-edit').val();
    return newInfo;
  }
    /**
     * populate edit employee form values
     * @param {String} firstName - value to populate
     * @param {String} lastName - value to populate
     * @param {String} email - value to populate
     * @param {String} phone - value to populate
     **/
  function setFormValues(firstName, lastName, email, phone) {
      $('#first-name-edit').val(firstName);
      $('#last-name-edit').val(lastName);
      $('#email-edit').val(email);
      $('#phone-number-edit').val(phone);
  }

    /**
      * Grabs elements from the check in and puts it into an object
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
        return newEmployee;
    }

    /**
      * Deletes the employee from the list
      */
      $(document).on('click', '.delete-employee', function() {
      let employeeId = $(this).closest('.employee-row').attr('value');
      console.log('delete');
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
        setFormValues('First', 'Last', 'email', '000');
        let test 
        // $('#first-name-edit')
        /* $.ajax({
         dataType: 'json',
         type: 'GET',
         url: '/api/employees/' + employeeId,
         success: function(response) {
         console.log(response);

         },
         });*/
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

