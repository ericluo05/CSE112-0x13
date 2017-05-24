$(document).ready(function() {
    let socket = io(); // Initialize Socket

    // Socket variables
    let DEBUG = 1;
    let VALIDATE_COMPANY_ID = 'validate_company_id';
    let VISITOR_LIST_UPDATE = 'visitor_list_update';
    let REMOVE_VISITOR = 'remove_visitor';

    let companyData = JSON.parse(localStorage.getItem('currentCompany'));
    let visitorList;
    companyData.company_id = companyData._id;


    // var curCompany = JSON.parse(localStorage.getItem('currentCompany'));
    let curUser = JSON.parse(localStorage.getItem('currentUser'));
    let companyName = companyData.name;


    $('#user-name').text(curUser.first_name + ' ' + curUser.last_name);

    // Connect to private socket
    // var companyId = getCookie('company_id');
    socket.emit(VALIDATE_COMPANY_ID, companyData);

   /** *
    * Compile all the Handle Bar Templates
    */
    // DashBoard Template
    let source = $('#visitor-list-template').html();
    let template = Handlebars.compile(source);

    // Modal Template
    let modal = $('#visitor-info-template').html();
    let modalTemplate = Handlebars.compile(modal);

    // SOCKET LISTEN FOR VISITOR QUEUE
    socket.on(VISITOR_LIST_UPDATE, function(data) {
        visitorList = data.visitors;
        // Parse Visitor List to format Date
        for(var i = 0, len = visitorList.length; i< len; i++) {
            visitorList[i].checkin_time = formatTime(visitorList[i].checkin_time);
        }

        // Parse Visitors appoitments
        for(i = 0; i < len; i++) {
          let appList = visitorList[i].appointments;
          if(appList[0]) {
            for(let j = 0, appLen = appList.length; j < appLen; j++) {
              if(compareDate(appList[j].date)) {
                visitorList[i].appointmentTime = formatTime(appList[j].date);
                visitorList[i]._apptId = appList[j]._id;
                break;
              }
            }
          } else{
            visitorList[i].appointmentTime = 'None';
          }
        }

       // visitorList.checkin_time = visitorList;
        let compiledHtml = template(visitorList);
        $('#visitor-list').html(compiledHtml);
    });


    /** *
    * Listener for Opening a Modal
    */
    $(document).on('click', '.patient-check-out', function() {
        let uniqueId = $(this).attr('value');
        let visitor = findVisitor(uniqueId);
        let compiledTemplate = modalTemplate(visitor);
        $('.modal-dialog').html(compiledTemplate);
    });

    /** *
     * Listener for Checking out a Visitor
     */
    $(document).on('click', '.check-in-btn', function() {
        let id = $(this).closest('.modal-content').find('.modal-body').attr('value');
        let apptId = $(this).closest('.modal-content').find('.modal-left').attr('value');

        let removeVisitor = findVisitor(id);

        removeVisitor.visitor_id = removeVisitor._id;

        $.ajax({
          dataType: 'json',
          type: 'DELETE',
          url: '/api/appointments/' + apptId,
          success: function(response) {
          },
        });


        socket.emit(REMOVE_VISITOR, removeVisitor);
    });
/*
    $(document).on('click','.checkout-btn',function(){
        var id = $(this).closest('.patient-check-out').attr('value');
        var removeVisitor = findVisitor(id);
        console.log(removeVisitor);
        //removeVisitor.visitor_id = removeVisitor._id;
        //socket.emit(REMOVE_VISITOR, removeVisitor);

    });
*/
    /** *
     * Compare appointment Date to today's Date
     */
    function compareDate(appointment) {
      let today = new Date();
      appointment = new Date(Date.parse(appointment));

      let appointmentDate = appointment.getFullYear() + ' ' + appointment.getDate() + ' ' + appointment.getMonth();
      let todayDate = today.getFullYear() + ' ' + today.getDate() + ' ' + today.getMonth();

      return (appointmentDate == todayDate);
    }

    /** *
     * Find Specific Visitor Given Visitor ID within the Visitor Array
     * @param id
     * @returns {string}
     */
    function findVisitor(id) {
        for(let visitor in visitorList) {
           if(visitorList.hasOwnProperty(visitor)) {
              if(visitorList[visitor]._id === id) {
                  if(DEBUG) console.log(visitorList[visitor]);
                  return visitorList[visitor];
              }
           }
        }
    }

    /** *
     * Function to format a JSON date object into a string
     * @param time
     */
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

    $('#logoutButton').on('click', function() {
      localStorage.setItem('userState', 0);
    });


    /** *
     * TODO order the list by increasing order
     * @param key
     */
    function increasingOrder(key) {

    }

    /** *
     * TODO order the list by decreasing order
     * @param key
     */
    function decreasingOrder(key) {

    }
});
