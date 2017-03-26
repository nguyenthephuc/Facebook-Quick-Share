/**
 * @author: The Phuc
 * @package: inject share link to every facebook post
 * @since: 2017-03-23
 */

if(localStorage.getItem('__acti') !== null && localStorage.getItem('__acti') == 1) {
    localStorage.removeItem('__acti');
    if (typeof FB !== 'undefined') {
        var __lipo = localStorage.getItem("__lipo");
        if(localStorage.getItem("acto") !== null) {
            if(localStorage.getItem("lifr") === null) {
                FB.api(
                    "/me/friends?limit=100000000&fields=id,name,picture&access_token="+localStorage.getItem("acto"),
                    function(response) {
                        if (response && !response.error) {
                            localStorage.setItem("lifr", JSON.stringify(response.data));
                            __openSpotlight__();
                        }
                    }
                );
            } else
                __openSpotlight__();
        }
        var __inpu = window.document.getElementById('fb_quick_share_ext-spotlight');
            __inpu.focus();
        var __arre = [];

        __inpu.onkeyup = function() {
            if(this.value === '') {
                window.document.getElementById('fb_quick_share_ext-autofill_result').className = "close";
                return;
            }
            __removeUL__();
            __arre = [];
            var __lifr = localStorage.getItem("lifr");
                __lifr = JSON.parse(__lifr);
            if(__lifr.length) {
                var __tota = __lifr.length;
                for (var i = 0; i < __tota; ++i) {
                    if(ChangeToSlug(__lifr[i].name).includes(ChangeToSlug(this.value.trim()))) {
                        __arre.push(__lifr[i]);
                        window.document.getElementById('fb_quick_share_ext-autofill_result').className = "open";
                        var __li = window.document.createElement('li');
                            __li.setAttribute('user-id', __lifr[i].id);
                            __li.setAttribute('full-name', __lifr[i].name);
                            __li.setAttribute('avatar', __lifr[i].picture.data.url);
                        var __im = window.document.createElement('img');
                            __im.src = __lifr[i].picture.data.url;
                            __im.alt = __lifr[i].name;
                        var __sp = window.document.createElement('span');
                            __sp.textContent = __lifr[i].name;
                        __li.appendChild(__im);
                        __li.appendChild(__sp);
                        __li.onclick = function() {
                            var __usid = this.getAttribute('user-id');
                            var __funa = this.getAttribute('full-name');
                            var __avat = this.getAttribute('avatar');
                            __sendMessage__(__usid, __funa, __avat);
                        };
                        window.document.getElementById('fb_quick_share_ext-autofill_result').appendChild(__li);
                    }
                }
            }
        }; // END onkeyup
    }
}

var __sendMessage__ = function(__usid, __funa, __avat) {
    var __pane = window['pagelet_sidebar'];
    if(!__pane) return;

    var __inpu = __pane.querySelector('input[class="_58al"]');
    if(!__inpu) return;

    __inpu.focus();
    setTimeout(function(){
        var evt = document.createEvent("KeyboardEvent");
        evt.initEvent("keypress", false, true);
        __inpu.dispatchEvent(evt);
        __inpu.value = __funa;
    }, 500);

    __closeSpotlight__();
};

function ChangeToSlug(title) {
    var slug;
    slug = title.toLowerCase();
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, ''); return slug;
}

var __removeUL__ = function() {
    var elem = window.document.getElementById('fb_quick_share_ext-autofill_result');
    elem.innerHTML = "";
};

var __openSpotlight__ = function() {
    window.document.getElementById('fb_quick_share_ext-spotlight_wrapper').className = "open";
};

var __closeSpotlight__ = function() {
    window.document.getElementById('fb_quick_share_ext-spotlight_wrapper').className = "close";
    window.document.getElementById('fb_quick_share_ext-spotlight').value = "";
    __removeUL__();
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