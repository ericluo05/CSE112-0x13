window.onload = function() {
  function GetURLParameter(sParam) {
    let sPageURL = window.location.search.substring(1);
    let sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return decodeURIComponent(sParameterName[1]);
        }
    }
}
let id = GetURLParameter('code');
let name= GetURLParameter('status');

if(id) {
	let clientSecret = 'a56caa836b9f386c400a69cda6f5c0b4';
	let clientID = '11293703667.22923580850';
	let something = {};
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
