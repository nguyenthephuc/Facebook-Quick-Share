if (typeof FB !== 'undefined') {
    FB.login(function(response) { alert(response.authResponse.accessToken);
     }, {perms:'read_stream,publish_stream,offline_access'});

    /*FB.api(
        "/me/friends",
        function(response) {
            console.log(response);
            if (response && !response.error) {
            }
        }
    );*/
}

window.fbAsyncInit = function() {
    FB.init({
        appId: '746410795535788',
        xfbml: true,
        version: 'v2.8'
    });
    FB.AppEvents.logPageView();
    console.log('connected');
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));