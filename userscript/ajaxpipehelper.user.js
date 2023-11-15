// ==UserScript==
// @name            AjaxPipeHelper
// @author          -
// @namespace       AjaxPipeHelper - Scripts
// @description     Page => AJAX Page
// @license         Creative Commons Attribution License
// @version            0.1
// @include         *://old.reddit.com/*
// @grant        none
// @run-at           document-start
// ==/UserScript==

function GM_getParentByTagName(el, tagName) {
  tagName = tagName.toLowerCase();
  if (el.tagName.toLowerCase() == tagName) {
    return el;
  }
  while (el && el.parentNode) {
    el = el.parentNode;
    if (el.tagName && el.tagName.toLowerCase() == tagName) {
      return el;
    }
  }
  return "undefined";
}
function parseResponseHeaders(headerStr) {
    var headers = {};
    if (!headerStr) {
        return headers;
    }
    var headerPairs = headerStr.split('\u000d\u000a');
    for (var i = 0, len = headerPairs.length; i < len; i++) {
        var headerPair = headerPairs[i];
        var index = headerPair.indexOf('\u003a\u0020');
        if (index > 0) {
            var key = headerPair.substring(0, index);
            var val = headerPair.substring(index + 2);
            headers[key.toLowerCase()] = val;
        }
    }
    return headers;
}

function ajaxpiperenabler() {
    document.addEventListener("click", onclickact);
    window.addEventListener("popstate", poppye);

    function poppye() {
        ajaxpipefetcher(location.href)
    }

    function ajaxpipefetcher(currenttag) {
        GM_xmlhttpRequest({
            method: "GET",
            url: currenttag,
            stillpagefilter: true,
            onload: function (response) {
                var responseheaders = parseResponseHeaders(response.responseHeaders)
                if (responseheaders['content-type'].indexOf('text/html') != -1) {
                    document.body.innerHTML = response.responseText;
                } else {
                    location = currenttag
                }
                scrollTo(0, 0)
                window.history.pushState(null, null, currenttag);
            }
        });

    }

    function onclickact(e) {
        //re = "(?:javascript|.(?:jpe?g|gif|png|js|css|json|exe|zip|rar|iso|7z|ahk))";
        var currenttag = GM_getParentByTagName(e.target, "a")
        if (e.button === 0) {
            if ((currenttag.nodeName == "A") && (currenttag.href.indexOf(location.hostname) != -1) && (!currenttag.getAttribute("onclick")) && (!currenttag.getAttribute("data-toggle"))) {
                e.preventDefault();
                ajaxpipefetcher(currenttag.href)
            }
        }
    }
}
ajaxpiperenabler()
