// window.onload = function() {
//  /**
//    * Grab user data from form
//    * @param {Object} sParam
//    * @return {Object}
//    */
//  function getURLParameter(sParam) {
//    let sPageURL = window.location.search.substring(1);
//    let sURLVariables = sPageURL.split('&');
//    for (let i = 0; i < sURLVariables.length; i++) {
//        let sParameterName = sURLVariables[i].split('=');
//        if (sParameterName[0] == sParam) {
//            return decodeURIComponent(sParameterName[1]);
//        }
//    }
// }
// let id = getURLParameter('code');
// // let name= getURLParameter('status');
//
// if(id) {
//	let clientSecret = 'a56caa836b9f386c400a69cda6f5c0b4';
//	let clientID = '11293703667.22923580850';
//	// let something = {};
//	$.post('https://slack.com/api/oauth.access',
//    {
//        'client_id': clientID,
//        'client_secret': clientSecret,
//        'code': id,
//    },
//    function(data, status) {
//        // alert("Data: " + data + "\nStatus: " + status);
//        console.log(data);
//        let webhook = data['incoming_webhook'];
//        let channel = webhook['channel'];
//        console.log('webhook:' + channel);
//        console.log('token' + data['access_token']);
//        localStorage.setItem('slackToken', data['access_token']);
//        localStorage.setItem('slackChannel', channel);
//    });
// }
// };
$(document).ready(function() {
    let myCompanyId = '';
    let stripeToken = '';
    let curUser = JSON.parse(localStorage.getItem('currentUser'));
    let companyData = JSON.parse(localStorage.getItem('currentCompany'));
    myCompanyId = companyData._id;
    $('#user-name').text(curUser.first_name + ' ' + curUser.last_name);

    jQuery(function($) {
        $('#modal-phone').mask('(999) 999-9999');
    });

    showInfo();
    updateSubNotification();
    $('#modal-first').val(curUser.first_name);
    $('#modal-last').val(curUser.last_name);
    $('#modal-email').val(curUser.email);
    $('#modal-phone').val(curUser.phone_number);

    $('.save-btn').click(updateInfo);

    /**
     * Uses POST request to update user account information
     **/
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
        $('#user-name').text(curUser.first_name + ' ' + curUser.last_name);
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
        newInfo.first_name = $('#modal-first').val();
        newInfo.last_name = $('#modal-last').val();
        newInfo.email = $('#modal-email').val();
        newInfo.phone_number = $('#modal-phone').val();

        return newInfo;
    }

    $('#logoutButton').on('click', function() {
        localStorage.setItem('userState', 0);
    });

    let handler = StripeCheckout.configure({
        key: 'pk_test_b6iDPAQ2gLMWOr6zCHKtwXEq',
        image: '/images/appt-o-matic.png',
        locale: 'auto',
        token: function(token) {
            makePaymentAJAX(token);
        },
    });
    document.getElementById('subscribe-btn').addEventListener('click', function(e) {
        // Open Checkout with further options:
        handler.open({
            name: 'Appt-o-matic',
            description: 'Subscription for 1 month of service',
            amount: 2000,
            zipCode: false,
            billingAddress: false,
        });
        e.preventDefault();
    });

// Close Checkout on page navigation:
    window.addEventListener('popstate', function() {
        handler.close();
    });


    function makePaymentAJAX(token) {
        let queryInfo = {
            stripeToken: token.id,
            stripeEmail: token.email,
        };
        $.ajax({
            dataType: 'json',
            type: 'POST',
            async: false,
            url: '/payment/subscription/' + myCompanyId,
            data: queryInfo,
            success: function(response) {
                $('#result-msg').html(response.message);
                localStorage.setItem('currentCompany', JSON.stringify(response));
                updateSubNotification();
                $('#additional_message').text('You have successfully extended the ' +
                    'service by one month');
            },
            error: function(response) {
                $('#result-msg').html(JSON.parse(response.responseText).error);
            },
        });
    }

    function updateSubNotification() {
        let companyData = JSON.parse(localStorage.getItem('currentCompany'));
        let now = new Date(Date.now());
        let sub_exp_date = new Date(companyData.sub_expiration);
        if (sub_exp_date < now) {
            $('#expir_date_row').prop('hidden', true);
            $('#additional_message').addClass('warn');
            $('#additional_message').text('You subscription has expired, press ' +
                'subscribe to make a payment in order to continue the service.');
        } else {
            let oneDay = 24*3600*1000;
            let daysLeftTillExp = (sub_exp_date - now)/oneDay;
            if(daysLeftTillExp <= 7) {
                $('#additional_message').addClass('warn');
                $('#additional_message').text('You subscription is going to expire soon. '
                    + 'Press subscribe to make a payment in order to extend the ' +
                    'service.');
            }else{
                $('#additional_message').removeClass('warn');
                $('#additional_message').text('');
            }
            $('#val_sub_exp_date').text(sub_exp_date.toLocaleDateString());
            $('#expir_date_row').prop('hidden', false);
        }
    }
});
