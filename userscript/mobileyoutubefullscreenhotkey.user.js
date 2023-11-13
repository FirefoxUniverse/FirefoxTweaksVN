// ==UserScript==
// @name        Fullscreen Hotkey Mobile Youtube
// @namespace   Fullscreen Hotkey Mobile Youtube - Scripts
// @match       *://m.youtube.com/*
// @grant       none
// @version     1.0
// @run-at      document-start
// @author      -
// @license     MIT
// @description 9/8/2023, 1:42:06 AM
// ==/UserScript==

(function () {
    function openFullscreen() {
      var elem = document.getElementsByClassName('video-stream html5-main-video')[0];
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    }
    const shortcut = 'f';
 
    document.addEventListener('keydown', (e) => {
        //if (e.ctrlKey && e.key === shortcut) {
        if (e.key === shortcut) {
openFullscreen();
        }
    });
 
})();
