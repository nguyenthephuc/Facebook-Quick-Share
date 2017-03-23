if (typeof FB !== 'undefined') {
    console.log('here...');
    FB.api(
        "/me/friends?access_token="+localStorage.getItem("acto"),
        function(response) {
            console.log(response);
            if (response && !response.error) {
            }
        }
    );
}

window.fbAsyncInit = function() {
    FB.init({
        appId: '746410795535788',
        cookie: true,
        xfbml: true,
        status: true,
        version: 'v2.8'
    });
    console.log('connected');
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));