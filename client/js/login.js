// with Button named signin-bt
$(function() {
    $('#logoutButton').click(function() {
        localStorage.removeItem('userState');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentCompany');
    });
});

/** Ajax function to create a POST request to server, used by neon-login */
function ajaxPostUser() {
    $('#loginButton').prop('disabled', true);
    $('#username').prop('disabled', true);
    $('#password').prop('disabled', true);
    $.ajax({
        type: 'POST',
        url: '/api/employees/login',
        data: grabUserData(),
        dataType: 'json',
        success: function(response) {
            if (response.role == 'a_admin') {
                localStorage.setItem('userState', 2);
                location.href = '/admin-panel.html';
            } else {
                localStorage.setItem('userState', 1);
                location.href = '/visitors.html';
            }
            localStorage.setItem('currentUser', JSON.stringify(response));
            ajaxGetCompanyInfo('/api/companies/' + response.company_id);
        },
        error: function() {
            $('#errorlog').html('Invalid Username or Password');
            $('#loginButton').prop('disabled', false);
            $('#username').prop('disabled', false);
            $('#password').prop('disabled', false);
        },
    });
}

/**
 * Ajax function to create a GET request to server
 * @param {Object} url
 */
function ajaxGetCompanyInfo(url) {
    $.ajax({
        type: 'GET',
        url: url,
        data: $('#response').serialize(),
        dataType: 'json',
        success: function(response) {
            localStorage.setItem('currentCompany', JSON.stringify(response));
        },
    });
}

/**
 * Grab user data from form
 * @return {Object} user
 */
function grabUserData() {
    let user = {};
    user.email = $('#username').val();
    user.password = $('#password').val();
    return user;
}
