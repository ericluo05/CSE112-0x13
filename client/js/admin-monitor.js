$(document).ready(function() {
    $('#user-name').text(JSON.parse(localStorage.getItem('currentUser')).first_name);
});
(function(w, d, s, g, js, fjs) {
    g = w.gapi || (w.gapi = {});
    g.analytics = {
        q: [], ready: function(cb) {
            this.q.push(cb);
        },
    };
    js = d.createElement(s);
    fjs = d.getElementsByTagName(s)[0];
    js.src = 'https://apis.google.com/js/platform.js';
    fjs.parentNode.insertBefore(js, fjs);
    js.onload = function() {
        g.load('analytics');
    };
}(window, document, 'script'));

/**
 * Google Analytics authentication and view
 */
gapi.analytics.ready(function() {
    let CLIENT_ID = '690597365609-cc3kdfcec6jltt28j2h35d6i3bbad95o' +
        '.apps.googleusercontent.com';
    let VIEW_ID = {
        query: {
            ids: 'ga:151830032',
        },
    };

    gapi.analytics.auth.authorize({
        container: 'auth-button',
        clientid: CLIENT_ID,
    });

    let timeline = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
            'dimensions': 'ga:date',
            'metrics': 'ga:sessions',
            'start-date': '30daysAgo',
            'end-date': 'yesterday',
        },
        chart: {
            type: 'LINE',
            container: 'timeline',
        },
    });

    timeline.set(VIEW_ID).execute();
});
