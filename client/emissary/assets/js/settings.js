window.onload = function() {
  function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return decodeURIComponent(sParameterName[1]);
        }
    }
}
var id = GetURLParameter('code');
var name= GetURLParameter('status');

if(id){
	var clientSecret = "85458d433ddea48d80bf8353166448c3";
	var clientID = "168056792887.183416696148";
	var something = {};
	$.post("https://slack.com/api/oauth.access",
    {
        'client_id': clientID,
        'client_secret': clientSecret, 
        'code':id
    },
    function(data, status){
        //alert("Data: " + data + "\nStatus: " + status);
        console.log(data);
        var webhook  = data['incoming_webhook'];
        var channel = webhook['channel'];
        console.log("webhook:" + channel);
        console.log("token" + data['access_token']);
        localStorage.setItem("slackToken", data['access_token']);
        localStorage.setItem("slackChannel", channel);
    });

}
};
