window.onload = function() {
    /**
     * Grab user data from form
     * @param {Object} sParam
     * @return {Object}
     */
    function getURLParameter(sParam) {
        let sPageURL = window.location.search.substring(1);
        let sURLVariables = sPageURL.split('&');
        for (let i = 0; i < sURLVariables.length; i++) {
            let sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return decodeURIComponent(sParameterName[1]);
            }
        }
    }

    let id = getURLParameter('code');
// let name= getURLParameter('status');

    if (id) {
        let clientSecret = '85458d433ddea48d80bf8353166448c3';
        let clientID = '168056792887.183416696148';
        // let something = {};
        $.post('https://slack.com/api/oauth.access',
            {
                'client_id': clientID,
                'client_secret': clientSecret,
                'code': id,
            },
            function(data, status) {
                // alert("Data: " + data + "\nStatus: " + status);
                console.log(data);
                let webhook = data['incoming_webhook'];
                let channel = webhook['channel'];
                console.log('webhook:' + channel);
                console.log('token' + data['access_token']);
                localStorage.setItem('slackToken', data['access_token']);
                localStorage.setItem('slackChannel', channel);
            });
    }
};


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
            makePayment(token);
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

    /**
     *  AJAX request to make payment
     * @param info  query into to pass to request
     */
    function makePayment(token) {
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
            },
            error: function(response) {
                $('#result-msg').html(JSON.parse(response.responseText).error);
            },
        });
    }
});
