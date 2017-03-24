if (typeof FB !== 'undefined') {
    console.log('connected...');
    if(localStorage.getItem("acto") !== null) {
        if(localStorage.getItem("lifr") === null) {
            FB.api(
                "/me/friends?limit=100000000&fields=id,name,picture&access_token="+localStorage.getItem("acto"),
                function(response) {
                    if (response && !response.error) {
                        localStorage.setItem("lifr", JSON.stringify(response.data));
                        console.log(response.data);
                    }
                }
            );
        } else {
            var __lifr = localStorage.getItem("lifr");
                __lifr = JSON.parse(__lifr);
                console.log(__lifr);
        }
    }
}

var __openSpotlight__ = function() {
    window.document.getElementById('fb_quick_share_ext-spotlight_wrapper').className = "open";
};

var __closeSpotlight__ = function() {
    window.document.getElementById('fb_quick_share_ext-spotlight_wrapper').className = "close";
};

window.document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        __closeSpotlight__();
    }
};

window.fbAsyncInit = function() {
    FB.init({
        appId: '746410795535788',
        xfbml: true,
        version: 'v2.8'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));