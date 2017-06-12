/**
 * Created by bchoi on 3/3/16.
 */
window.onload = function() {
    var buttonElm = document.getElementById("loginButton");
    // attach the onlclick listener to the button
    buttonElm.addEventListener("click", function() {
        // send it to google analytics
        ga('send', {
            hitType: 'event',
            eventCategory: 'buttons',
            eventAction: 'click',
            eventLabel: 'loginButtonClick'
        });
        //alert("Information sent to GA");
    });
};