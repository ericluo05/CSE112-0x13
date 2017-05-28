$(document).ready(function() {
    let companyData = JSON.parse(localStorage.getItem('currentCompany'));
    let myCompanyId = companyData._id;
    let curUser = JSON.parse(localStorage.getItem('currentUser'));

    $('#user-name').text(curUser.first_name + ' ' + curUser.last_name);

    let appts = getAppts();
    /** initializing the appts
     * @param {json} appts
     * @return {appts}
     **/
    function initializeAppts(appts) {
      appts.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
      });
      for(let i = 0, len = appts.length; i < len; i++) {
        appts[i].fullDate = formatDate(appts[i].date.toString());
        appts[i].appointmentTime = formatTime(appts[i].date.toString());
      }
      return appts;
    }

    appts = initializeAppts(appts);
    let source = $('#appt-list-template').html();
    let template = Handlebars.compile(source);
    let compiledHtml = template(appts);

    $('#appt-list').html(compiledHtml);
    $('.save-btn').click(submitForm);


    /**
    * Makes a get request to display list of appts
    * @return {json}
    **/
    function getAppts() {
       let json;
       $.ajax({
           dataType: 'json',
           type: 'GET',
           data: $('#response').serialize(),
           async: false,
           url: '/api/appointments/company/' + myCompanyId,
           success: function(response) {
               json = response;
               console.log(response);
           },
       });
       return json;
   }

    /**
    * When a patient submits their form
    **/
    function submitForm() {
        let d = grabFormElements();
        console.log(d);
        updateApptList(d);
        appts = getAppts();
        appts = initializeAppts(appts);
        $('#appt-list').html(template(appts));
        document.getElementById('appt-form').reset();
    }

   /**
   * Makes a post request to update list of appts when adding a new employee
   * @param {json} obj
   **/
   function updateApptList(obj) {
      $.ajax({
        dataType: 'json',
           type: 'POST',
           data: obj,
           async: false,
           url: '/api/appointments/',
           success: function(response) {
                appts.push(response);
                console.log(response);
           },
      });
    }

    /**
     * Grabs elements from the check in and puts it into an object
     * @return {object}
     **/
    function grabFormElements() {
      let newAppt = {};
      let userTime;
      let userDate;
      newAppt.company_id = myCompanyId;
      newAppt.first_name= $('#appt-first').val();
      newAppt.last_name = $('#appt-last').val();
      newAppt.phone_number = $('#appt-number').val();
      newAppt.provider_name = $('#appt-provider').val();

      userDate = $('#appt-date').val();
      userTime = $('#appt-time').val();

      newAppt.date = jsDate(userDate, userTime);
      return newAppt;
    }

    $(document).on('click', '.delete-appt', function() {
      let apptId = $(this).closest('.appt-row').attr('value');
      console.log('delete');
      $.ajax({
        dataType: 'json',
        type: 'DELETE',
        url: '/api/appointments/' + apptId,
        success: function(response) {
          let updateAppts = getAppts();
          let removeAppt = initializeAppts(updateAppts);
          $('#appt-list').html(template(removeAppt));
        },
      });
    });


    /** ********* FUNCTIONS TO FORMAT JAVASCRIPT DATES *************/
    /**
    * function to format the date
    * @param {Date} date
    * @return {string}
    **/
    function formatDate(date) {
      let d = new Date(Date.parse(date));
      let mm = d.getMonth() + 1;
      let yyyy = d.getFullYear();
      let dd = d.getDate();
      // var monthArray = ["Jan", "Feb", "Mar", "Apr", "May",
      //                   "Jun", "Jul", "Aug","Sep","Nov","Dec"];
      if(dd < 10) {
        dd = '0' + dd;
      }
      if(mm < 10) {
        mm = '0' + mm;
      }
      // console.log(monthArray[mm]);
      return mm + '/' + dd + '/' + + yyyy;
    }

    // Not being used now but might be used later
    // function formatNumber(number) {
    //  return '(' + number.substr(0, 3) + ')' + number.substr(3, 3)
    //            + '-' + number.substr(6, 4);
    // }

    /**
    * FUNCTION TO FORMAT DATE OBJECT IN JS
    * @param {Date} date
    * @param {Time} time
    * @return {string}
    **/
    function jsDate(date, time) {
      let jsDate = reFormatDate(date);
      let jsTime = reFormatTime(time);
      jsDateObj = jsDate + ' ' + jsTime;
      return jsDateObj;
    }

    /**
     * FUNCTION TO FORMAT DATE TO JS FOR ROBOTS
     * @param {Date} date
     * @return {string}
     **/
    function reFormatDate(date) {
      let d = new Date(Date.parse(date));
      let mm = d.getMonth() + 1;
      let yyyy = d.getFullYear();
      let dd = d.getDate();

      if(dd < 10) {
        dd = '0' + dd;
      }
      if(mm < 10) {
        mm = '0' + mm;
      }
      return yyyy + '-' + mm +'-' + dd;
    }


    /**
    * FUNCTION TO FORMAT TIME TO JS FOR ROBOTS
    * @param {Time} time
    * @return {string}
    **/
    function reFormatTime(time) {
      let ampm = time.substr(-2, 2);
      let formattedTime;
      let formattedHour;
      let colon = time.indexOf(':');

      if(ampm === 'PM') {
        formattedHour = time.substr(0, 2);

        if(formattedHour == '12')
          formattedHour = 12;
        else
          formattedHour = 12 + parseInt(time.substr(0, 2));

        formattedTime = formattedHour + time.substr(colon, 3) + ':00';
      } else{
        formattedHour = parseInt(time.substr(0, 2));
        if(formattedHour < 10) {
          formattedHour = '0' + formattedHour;
        }
        if(formattedHour == 12) {
          formattedHour = '00';
        }
        formattedTime = formattedHour + time.substr(colon, 3) + ':00';
      }

      return formattedTime;
    }


    /**
    * FUNCTION TO FORMAT TIME TO AM AND PM FOR HUMANS
    * @param {Time} time
    * @return {string}
    **/
    function formatTime(time) {
        let currentTime = new Date(Date.parse(time));
        let hour = currentTime.getHours();
        let minute = currentTime.getMinutes();

        if(minute < 10) {
            minute = '0' + minute;
        }

        if(hour >= 13) {
            hour = hour-12;
            currentTime = hour + ':' + minute + 'PM';
        } else if(hour === 12) {
            currentTime = hour + ':' + minute +'PM';
        } else if(hour === 0) {
            currentTime = 1 + ':' + minute + 'AM';
        } else{
            currentTime = hour + ':' + minute +'AM';
        }

        return currentTime;
    }
});
