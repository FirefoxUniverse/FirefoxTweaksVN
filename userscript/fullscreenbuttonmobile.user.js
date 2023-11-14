// ==UserScript==
// @name        Toggle Fullscreen Button For Mobile Browsers
// @namespace   Toggle Fullscreen Button For Mobile Browsers Scripts
// @match       http*://*/*
// @grant       GM_registerMenuCommand
// @version     1.0
// @author      -
// @description 11/14/2023, 10:20:53 PM
// ==/UserScript==

(function(){
var duration = 5;
function toggle(){
     function toggleFullScreen() {
       if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
         if (document.documentElement.requestFullscreen) {
           document.documentElement.requestFullscreen();
         } else if (document.documentElement.mozRequestFullScreen) {
           document.documentElement.mozRequestFullScreen();
         } else if (document.documentElement.webkitRequestFullscreen) {
           document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
         }
       } else {
          if (document.cancelFullScreen) {
             document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
             document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
       }
     }

var ele = document.createElement('div');
var btn = document.createElement('button');
ele.style.position = 'fixed';
ele.style.left = '50%';
ele.style.top = '50%';
btn.innerHTML = 'Fullscreen';
btn.addEventListener('click', toggleFullScreen);
ele.appendChild(btn);
document.body.appendChild(ele);

setTimeout(function() {document.body.removeChild(ele);}, duration*1000);

}
GM_registerMenuCommand('Show Fullscreen Button for ' + duration.toString() + 's', toggle);
})();
