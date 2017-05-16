$(document).ready(function(){
   console.log('ready');
   function getCompanies() {
        var json;
        $.ajax({
            dataType: 'json',
            type: 'GET',
            data: $('#response').serialize(),
            async: false,
            url: '/api/companies',
            success: function(response) {
                json = response;
                console.log(response);
            }
        });
        return json;
    }
    var companies = getCompanies();
    //DashBoard Template
    var source = $("#company-list-template").html();
    var template = Handlebars.compile(source);


    var compiledHtml = template(companies);
    
    $('#company-list').html(compiledHtml);
});
