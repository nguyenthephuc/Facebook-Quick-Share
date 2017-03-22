var __appendShareLink__ = function() {
    var __5pcq = window.document.getElementsByClassName('_5pcq');
    var __hype = window.document.querySelectorAll('[id^=hyperfeed_story_id_]'),
        __t;
    for (__t = 0; __t < __hype.length; __t++) {
        var __sp = document.createElement('span'),
            __te = document.createTextNode('Quick Share'),
            __pl = __hype[__t].querySelectorAll('div._42nr');

        __sp.className = "fb_quick_share_ext";
        __sp.style.backgroundImage = "url('"+chrome.extension.getURL('images/share.png');+"')";
        __sp.style.backgroundRepeat = "no-repeat";
        __sp.appendChild(__te);
        if(__pl.length > 0)
            if(__pl[0].querySelectorAll('span.fb_quick_share_ext').length === 0)
                __pl[0].appendChild(__sp);
    }
};

__appendShareLink__();
document.addEventListener('DOMContentLoaded', function() {
    __appendShareLink__();
});
window.onscroll = function(ev) {
    __appendShareLink__();
};