var emailVal = $('#email').val();
var passwordVal = $('#password').val();

$('#login-button').click(function() {
    $.ajax({
               type:  'POST',
               url: '/api/companies/login',
               data: { email: emailVal, password : passwordVal },
               dataType: 'json',
               success: function(payload) {
                   // Create session
               },
               error: function(err){

               }
           })
});