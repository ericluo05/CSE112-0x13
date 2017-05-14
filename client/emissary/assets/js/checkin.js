$(document).ready(function(){

    var socket = io();
    if(localStorage.getItem("slackToken")&&localStorage.getItem("slackChannel"))
        {
            alert("WTF");
             $.post("https://slack.com/api/chat.postMessage",
             {
                'token': localStorage.getItem("slackToken"),
                'channel': localStorage.getItem("slackChannel"), 
                'text': "interesting"
                //'text': "Name: " + data['firstName'] + " " + data['lastName'] + " Appointment Time: " + data['appointment']
             },
             function(data, status){
              });
        }
    $('#tap-to-check').on('click',function(){
        console.log("click");
        //$('.check-in').addClass('show');
        $('.check-in').animate({
            top:'25%',
            opacity: '1'
        }, 700);
        $(this).addClass('hide');
    });

   /* $('.check-in').on('submit', function() {
        event.preventDefault;
        console.log("data submitted");
        var data = grabFormElements();
        console.log(data);

        socket.emit('update list',data);

        $(this).animate({
            top:'35%',
            opacity:'0'
        },0);
        if(localStorage.getItem("slackToken")&&localStorage.getItem("slackChannel"))
        {
             $.post("https://slack.com/api/chat.postMessage",
             {
                'token': localStorage.getItem("slackToken"),
                'channel': localStorage.getItem("slackChannel"), 
                'text': "Name: " + data['firstName'] + " " + data['lastName'] + " Appointment Time: " + data['appointment']
             },
             function(data, status){
              });
        }

    });*/

    document.ontouchmove = function(e) {
        e.preventDefault();
    };


    //Grabs elements from the check in and puts it into an object
    function grabFormElements(){
        var newVisitor = {};
        newVisitor.firstName= $('#visitor-first').val();
        newVisitor.lastName = $('#visitor-last').val();
        newVisitor.appointment = $('#visitor-appointment').val();
        newVisitor.checkin = getCurrentTime();
        return newVisitor;
    }

    //Function to get Current Time of Check in
    function getCurrentTime(){
        var currentTime;
        var today = new Date();
        var currentHour = today.getHours();
        var currentMinute = today.getMinutes();

        if(currentMinute < 10){
            currentMinute = '0' + currentMinute;
        }

        if(currentHour >= 13){
            currentHour = currentHour - 12;
            currentTime = currentHour + ':' + currentMinute + 'PM';
        }
        else if(currentHour === 12){
            currentTime = currentHour + ':' + currentMinute + 'PM';
        }
        else if (currentHour === 0)
            currentTime = 1 + ':' + currentMinute + 'AM';
        else
            currentTime = currentHour + ':' + currentMinute + 'AM';

        return currentTime;

    }


});
