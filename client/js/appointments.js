$(document).ready(function() {
  let companyData = JSON.parse(localStorage.getItem('currentCompany'));
  let myCompanyId = companyData._id;
  let curUser = JSON.parse(localStorage.getItem('currentUser'));

  $('#user-name').text(curUser.first_name + ' ' + curUser.last_name);

  jQuery(function($) {
    $('#appt-number').mask('(999) 999-9999');
  });

  jQuery(function($) {
    $('#appt-number-edit').mask('(999) 999-9999');
  });

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


  /** get all the appts
   * @return {appts}
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
        $('#myModal').modal('hide');
        document.getElementById('appt-form').reset();
        $('#time-input').removeClass('has-error');
        $('#time-msg').addClass('hidden');
        $('#other-msg').addClass('hidden');
      },
      error: function(response) {
        let resJSON = JSON.stringify(response);
        let message = response.responseText;
        $('#time-input').removeClass('has-error');
        $('#time-msg').addClass('hidden');
        $('#other-msg').addClass('hidden');

        if(message == '{"error":"Already Created"}') {
          $('#time-input').addClass('has-error');
          $('#time-msg').removeClass('hidden');
        } else {
          $('#other-msg').removeClass('hidden');
        }
      },
    });
  }

  /**
   * Grabs elements from the check in and puts it into an object
   * @return {object}
   **/
  function grabFormElements() {
    let newAppt = {};
    let datetime = $('#appt-datetimepicker').datetimepicker()['0'].value;
    newAppt.company_id = myCompanyId;
    newAppt.first_name= $('#appt-first').val();
    newAppt.last_name = $('#appt-last').val();
    newAppt.phone_number = $('#appt-number').val();
    newAppt.provider_name = $('#appt-provider').val();
    newAppt.date = Date.parse(datetime);
    return newAppt;
  }

  /**
   * grab updated data from edit appointment form and put it into an object
   * @return updatedInfo
   */
  function grabEditFormValues() {
    let updatedInfo ={};
    let dt_edit = $('#appt-datetimepicker-edit').datetimepicker()['0'].value;
    updatedInfo.company_id = myCompanyId;
    updatedInfo.first_name= $('#appt-first-edit').val();
    updatedInfo.last_name = $('#appt-last-edit').val();
    updatedInfo.phone_number = $('#appt-number-edit').val();
    updatedInfo.provider_name = $('#appt-provider-edit').val();
    updatedInfo.date = Date.parse(dt_edit);
    return updatedInfo;
  }

  /**
   *  populate edit form with given appt */
  function setEditFormValues(appt) {
      $('#appt-id-edit').val(appt._id);
      $('#appt-first-edit').val(appt.first_name);
      $('#appt-last-edit').val(appt.last_name);
      $('#appt-number-edit').val(appt.phone_number);
      $('#appt-provider-edit').val(appt.provider_name);
      $('#appt-datetimepicker-edit').datetimepicker({
        sideBySide: false,
        minDate: Date.now(),
      });
      $('#appt-datetimepicker-edit').data('DateTimePicker').date(new Date(appt.date));
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

  $(document).on('click', '.update-appt', function() {
      let apptId = $(this).closest('.appt-row').attr('value');
      $.ajax({
          dataType: 'json',
          type: 'GET',
          url: '/api/appointments/' + apptId,
          success: function(response) {
              setEditFormValues(response);
              $('#other-msg-edit').addClass('hidden');
          },
          error: function(response) {
            $('#other-msg-edit').removeClass('hidden');
          },
      });
  });

  $(document).on('click', '.save-change-btn', function() {
      let apptId = $('#appt-id-edit').val();
      let newInfo = grabEditFormValues();
      $.ajax({
          dataType: 'json',
          type: 'PUT',
          url: '/api/appointments/' + apptId,
          data: newInfo,
          success: function(response) {
              $('#myModal2').modal('hide');
              appts = getAppts();
              appts = initializeAppts(appts);
              $('#appt-list').html(template(appts));
              $('#other-msg-edit').addClass('hidden');
          },
          error: function(response) {
            $('#other-msg-edit').removeClass('hidden');
          },
      });
  });

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
    let jsDateObj = jsDate + ' ' + jsTime;
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
