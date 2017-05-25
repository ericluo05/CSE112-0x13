$(document).ready(function() {
    let companyData = JSON.parse(localStorage.getItem('currentCompany'));
    let myCompanyId = companyData._id;

    console.log(myCompanyId);

    let curUser = JSON.parse(localStorage.getItem('currentUser'));
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
               // console.log(response);
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
               // console.log(response);
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
        $('#employee-list').html(template(employees));
        document.getElementById('employee-form').reset();
    }

    /**
      * Grabs elements from the check in and puts it into an object
      * @return {Object} new employee object
      */
    function grabFormElements() {
        let newEmployee = {};
        newEmployee.company_id = myCompanyId;
        newEmployee.role = 'c_employee',
        newEmployee.first_name= $('#employee-first').val();
        newEmployee.last_name = $('#employee-last').val();
        newEmployee.phone_number = $('#employee-number').val();
        newEmployee.email = $('#employee-email').val();
        newEmployee.password = $('#employee-pw').val();
        newEmployee.confirm_password = $('#employee-confirm-pw').val();
        return newEmployee;
    }

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
