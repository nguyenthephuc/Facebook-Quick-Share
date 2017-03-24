/**
 * @author: The Phuc
 * @package: inject share link to every facebook post
 * @since: 2017-03-23
 */

var __tepl = window['createNav'],
    __tequ = __tepl !== undefined ? __tepl.querySelectorAll("span.sectionDragHandle") : [],
    __tefl = 'TẠO',
    __tevi = 'Gửi cho bạn bè',
    __teen = 'Quick Share',
    __plvi = 'Tìm kiếm bạn bè',
    __plen = 'Search your friends',
    __clas = 'fb_quick_share_ext',
    __qsid = 'id_fb_quick_share_ext',
    __atst = 'quick-share-link',
    __doma = 'https://www.facebook.com/',
    __icon = 'images/share.png',
    __spid = 'fb_quick_share_ext-spotlight_wrapper',
    __spin = 'fb_quick_share_ext-spotlight',
    __tedi;

var __injectFormSearch = function() {
    if(__tequ === undefined || __tequ.length <= 0) return;
    __tedi = __tequ[0].textContent === __tefl ? __plvi : __plen;

    var __div = window.document.createElement("div");
        __div.id = __spid;
    var __inpu = window.document.createElement('input');
        __inpu.id = __spin;
        __inpu.type = "text";
        __inpu.placeholder = __tedi;
    __div.appendChild(__inpu);
    window.document.body.appendChild(__div);
};

var __getProfileID__ = function() {
    var __find = window.document.querySelector('[id^=profile_pic_header_]');
    if(__find === null) return '';
    __find = __find.id;
    __find = __find.split('_');
    localStorage.setItem("prid", __find.pop());
    return __find.pop();
};

var __loadAPI__ = function() {
    var __load = function() {
        var __s = window.document.createElement("script");
        __s.type = "text/javascript";
        __s.src = chrome.extension.getURL('js/api.js');
        __s.id = __qsid;
        window.document.head.appendChild(__s);
    };
    if(window.document.getElementById(__qsid) === null)
        __injectFormSearch();
    if(window.document.getElementById(__qsid) === null)
        __load();
    if(window.document.getElementById(__qsid) !== null) {
        window.document.getElementById(__qsid).remove();
        __load();
    }
    __get_token__();
};

var __getFb_dtsg__ = function() {
    var __find = window.document.querySelectorAll('input[name="fb_dtsg"]');
    if(__find !== undefined && __find.length > 0)
        return __find[0].value;
    return '';
};

var __get_token__ = function(callback) {
    var http = new XMLHttpRequest;
    http.open('POST', 'https://www.facebook.com/v1.0/dialog/oauth/confirm');
    http.send('fb_dtsg=' + __getFb_dtsg__() + '&app_id=165907476854626&redirect_uri=fbconnect://success&display=popup&access_token=&sdk=&from_post=1&private=&tos=&login=&read=&write=&extended=&social_confirm=&confirm=&seen_scopes=&auth_type=&auth_token=&auth_nonce=&default_audience=&ref=Default&return_format=access_token&domain=&sso_device=ios&__CONFIRM__=1');
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var data = http.responseText.match(/access_token=(.*?)&/)[1];
            localStorage.setItem("acto", data);
            // chrome.runtime.sendMessage({ update_access_token: true, access_token: data });
        }
    }
};

var __injectShareLinkToListPost__ = function() {
    if(__tequ === undefined || __tequ.length <= 0) return;
    __tedi = __tequ[0].textContent === __tefl ? __tevi : __teen;

    var __hype = window.document.querySelectorAll('[id^=hyperfeed_story_id_]'),
        __numb = 0;

    if(__hype === undefined) return;

    for (; __numb < __hype.length; ++__numb) {
        var __span = window.document.createElement('span'),
            __text = window.document.createTextNode(__tedi),
            __link = __hype[__numb].querySelector('input[name="ft_ent_identifier"]'),
            __plac = __hype[__numb].querySelectorAll('div._42nr'),
            __attr = window.document.createAttribute(__atst);

        if(__link === null) return;

        __attr.value = __doma + __link.value;
        __span.setAttributeNode(__attr);
        __span.className = __clas;
        __span.style.backgroundImage = "url('"+ chrome.extension.getURL(__icon) +"')";
        __span.style.backgroundRepeat = "no-repeat";
        __span.appendChild(__text);
        __span.addEventListener('click', function() {
            var __lipo = this.getAttribute(__atst);
            __loadAPI__();
        });
        if(__plac.length > 0)
            if(__plac[0].querySelectorAll('span.'+__clas).length === 0)
                __plac[0].appendChild(__span);
    }
};

var __injectShareLinkToPost__ = function() {
    if(__tequ === undefined || __tequ.length <= 0) return;
    __tedi = __tequ[0].textContent === __tefl ? __tevi : __teen;

    var __hype = window.document.querySelector('[id^=group_mall_]');
    if(__hype === null) return;

    var __span = window.document.createElement('span'),
        __text = window.document.createTextNode(__tedi),
        __attr = window.document.createAttribute(__atst),
        __link = __hype.querySelector('input[name="ft_ent_identifier"]'),
        __plac = __hype.querySelectorAll('div._42nr');

    __attr.value = __doma + __link.value;
    __span.setAttributeNode(__attr);
    __span.className = __clas;
    __span.style.backgroundImage = "url('"+ chrome.extension.getURL(__icon) +"')";
    __span.style.backgroundRepeat = "no-repeat";
    __span.appendChild(__text);
    __span.addEventListener('click', function() {
        var __lipo = this.getAttribute(__atst);
        __loadAPI__();
    });

    if(__plac.length > 0)
        if(__plac[0].querySelectorAll('span.'+__clas).length === 0)
            __plac[0].appendChild(__span);
};

(function(){
    __loadAPI__();
    __injectShareLinkToPost__();
    __injectShareLinkToListPost__();
})();
window.onscroll = function(ev) {
    __injectShareLinkToListPost__();
};