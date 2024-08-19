// ==UserScript==
// @name        Handlers Helper
// @include       *://*/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @version     3.0
// @author      -
// @description Helper for protocol_hook.lua
// @namespace Violentmonkey Scripts
// ==/UserScript==

//'iptv'

const guide = 'Value: pipe ytdl stream mpv iptv';
const live_window_width = 400;
const live_window_height = 640;

var total_direction = 4;
var livechat = false;
var hlsdomain = 'cdn.animevui.com';
var UP = 'pipe';
var DOWN = 'ytdl';
var LEFT = 'stream';
var RIGHT = 'mpv';
var UP = GM_getValue('UP', UP);
var DOWN = GM_getValue('DOWN', DOWN);
var LEFT = GM_getValue('LEFT', LEFT);
var RIGHT = GM_getValue('RIGHT', RIGHT);
var hlsdomain = GM_getValue('hlsdomain', hlsdomain);
var livechat = GM_getValue('livechat', livechat);
var total_direction = GM_getValue('total_direction', total_direction);
GM_registerMenuCommand('↑: ' + UP.toString(), function() {var p = window.prompt(guide, UP);if(!p){return;};GM_setValue('UP', p);window.location.reload();});
GM_registerMenuCommand('↓: ' + DOWN.toString(), function() {var p = window.prompt(guide, DOWN);if(!p){return;};GM_setValue('DOWN', p);window.location.reload();});
GM_registerMenuCommand('←: ' + LEFT.toString(), function() {var p = window.prompt(guide, LEFT);if(!p){return;};GM_setValue('LEFT', p);window.location.reload();});
GM_registerMenuCommand('→: ' + RIGHT.toString(), function() {var p = window.prompt(guide, RIGHT);if(!p){return;};GM_setValue('RIGHT', p);window.location.reload();});
GM_registerMenuCommand('HLS Force', function() {var p = window.prompt('Example: 1.com,2.com,3.com,4.com', hlsdomain);if(!p){return;};GM_setValue('hlsdomain', p);});
GM_registerMenuCommand('Live Chat: ' + livechat.toString(), function() {var v = livechat;if(v == true){GM_setValue('livechat', false);}else{GM_setValue('livechat', true);};window.location.reload();});
GM_registerMenuCommand('Total Direction: ' + total_direction.toString(), function() {var v = total_direction;if(v == 4){GM_setValue('total_direction', 8);}else{GM_setValue('total_direction', 4);};window.location.reload();});

console.log(UP, DOWN, LEFT, RIGHT, hlsdomain, livechat, total_direction);

var hlsdomain = hlsdomain.split(',');
var collected_urls = {};
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

function attachDrag(elem) {

  function GM_btoaUrl(url) {
    return btoa(url).replace(/\//g, "_").replace(/\+/g, "-").replace(/\=/g, "");
  }

  function popout(chaturl) {
      window.open(chaturl, "", "fullscreen=no,toolbar=no,titlebar=no,menubar=no,location=no,width=" + live_window_width + ",height=" + live_window_height);
  }

  function livechatopener(url) {
        var nurl = new URL(url);
        if (nurl.href.indexOf('www.youtube.com/watch') != -1 || nurl.href.indexOf('m.youtube.com/watch') != -1) {
            popout("https://www.youtube.com/live_chat?is_popout=1&v=" + nurl.search.split("v=")[1]);
        } else if (nurl.href.match('https://.*?.twitch.tv/.')) {
            popout("https://www.twitch.tv/popout" + nurl.pathname + "/chat?popout=");
        }  else if (nurl.href.match('https://.*?.nimo.tv/.')) {
            var streamid = document.querySelector('a[href="' + nurl.pathname + '"] .nimo-player.n-as-full').id.replace('home-hot-', '');
            popout("https://www.nimo.tv/popout/chat/" + streamid);
        }
  }

  function EA(attr, type) {
    var url = '';
    var subs = '';
    var s = '';
    var app = 'play';
    var hls = false;
    console.log(attr, type)
    for (i in hlsdomain) {
      if (attr.indexOf(hlsdomain[i]) != -1 || document.domain.indexOf(hlsdomain[i]) != -1) {
        if (type == 'stream') {
          attr = attr.replace(/https?:/, 'hls:');
        }
        hls = true;
      }

    }
    if (attr.startsWith('http') || attr.startsWith('hls')) {
      url = attr;
    } else if (attr.startsWith('mpv://')) {
      location.href = attr;
      return;
    }
    if (url == '') {
      url = location.href;
    }
    console.log(collected_urls);
    if (Object.keys(collected_urls).length > 0) {
        for (link in collected_urls) {
            console.log(link, collected_urls[link]);
            collected_urls[link].style.boxSizing = 'unset';
            collected_urls[link].style.border = 'unset';
            s += link + ' ';
        }
        s = s.trim(' ');
        console.log(s);
        //var s = collected_urls.join(" ");
    } else {
        var s = url;
    }
    collected_urls = {};
    if (type == 'pipe') {
      app = 'mpvy';
    }
    else if (type == 'iptv') {
      app = 'list';
    }
    else if (type == 'mpv' || type == 'vid') {
      app = 'play';
    }
    else {
      app = type;
    }
    var bs = GM_btoaUrl(s);
    var url2 = 'mpv://' + app + '/' + bs + '/' + "?referer=" + GM_btoaUrl(location.href);
    if (subs != '') {
      url2 = url2 + '?subs=' + GM_btoaUrl(subs);
    }
    if (hls == true) {
        url2 = url2 + '?hls=1';
    }
    if (app == 'stream' && livechat == true) {
        livechatopener(url);
    }
    console.log(url2);
    location.href = url2;
  }

  // Define the enum-like directory
  const DirectionEnum = {
    RIGHT: 6,
    LEFT: 4,
    UP: 2,
    DOWN: 8,
    UP_LEFT: 1,
    UP_RIGHT: 3,
    DOWN_LEFT: 7,
    DOWN_RIGHT: 9
  };

  function getDirection(x, y, cx, cy) {
    /*=================
    |                 |
    | 1↖   2↑   3↗ |
    |                 |
    | 4←    5    6→ |
    |                 |
    | 7↙   8↓   9↘ |
    |                 |
    |=================*/
    let d, t;
    if (cx == 0 && cy == 0) {
      return 5;
    }
    if ((cx - x) >= -50 && (cx - x) <= 50 && (cy - y) >= -50 && (cy - y) <= 50) {
      return 5;
    }
    // Change (4 == 4) to (8 == 4) to enable 8 directions
    if (total_direction == 4) { //4 directions
      if (Math.abs(cx - x) < Math.abs(cy - y)) {
        d = cy > y ? "8" : "2";
      } else {
        d = cx > x ? "6" : "4";
      }
    } else { //8 directions
      t = (cy - y) / (cx - x);
      if (-0.4142 <= t && t < 0.4142) d = cx > x ? '6' : "4";
      else if (2.4142 <= t || t < -2.4142) d = cy > y ? '8' : '2';
      else if (0.4142 <= t && t < 2.4142) d = cx > x ? '9' : '1';
      else d = cy > y ? '7' : '3';
    }
    return d;
  }
  elem.addEventListener('dragstart', function(e) {
    //console.log(e.target);
    //console.log(e.target.shadowRoot);
    /*if (e.target.nodeName != "A") {
    e.stopPropagation();
    e.stopImmediatePropagation();
    //e.preventDefault();
    }*/
    console.log('dragstart');
    var x1 = e.clientX;
    var y1 = e.clientY;
    var dragend = elem.addEventListener('dragend', function doEA(e) {
      var x2 = e.clientX;
      var y2 = e.clientY;
      var direction = getDirection(x1, y1, x2, y2);
      //if ((x2 - x1) >= -50 && (x2 - x1) <= 50 && (y2 - y1) >= -50 && (y2 - y1) <= 50) {direction = 5;console.log(5);}
      //if (e.target.nodeName == "A" && e.target.href.match(/youtube.com|youtu.be|streamable.com/)) {
      console.log('Direction: ' + direction);
      console.log(x1, y1, x2, y2, direction);

      const targetHref = e.target.href || e.target.src;

      switch (+direction) {
        case DirectionEnum.RIGHT:
          console.log('RIGHT: ' + targetHref);
          EA(targetHref, RIGHT);
          break;
        case DirectionEnum.LEFT:
          console.log('LEFT: ' + targetHref);
          EA(targetHref, LEFT);
          break;
        case DirectionEnum.UP:
          console.log('UP: ' + targetHref);
          EA(targetHref, UP);
          break;
        case DirectionEnum.DOWN:
          console.log('DOWN: ' + targetHref);
          EA(targetHref, DOWN);
          break;

        case DirectionEnum.UP_LEFT:
          console.log('List: ' + targetHref);
          EA(targetHref, 'list');
          break;
        case DirectionEnum.UP_RIGHT:
        case DirectionEnum.DOWN_LEFT:
        case DirectionEnum.DOWN_RIGHT:
        default:
          break;
      }
      //}
      console.log(direction);
      this.removeEventListener('dragend', doEA);
    }, false);
  }, false);
}

var count = 0;
var mouseIsDown = false;
var held = false;
document.addEventListener("mousedown", function (e) {
    var link = GM_getParentByTagName(e.target, 'A');
    if (link.nodeName == 'A') {

      mouseIsDown = true;
      document.addEventListener("mouseup", function mouseup(e) {
          mouseIsDown = false;
          this.removeEventListener('mouseup', mouseup);
      });
      document.addEventListener("contextmenu", function contextmenu(e) {
          if (held == true) {
              held = false;
              e.preventDefault();
          }
          held = false;
          this.removeEventListener('contextmenu', contextmenu);
      });
      if (e.button === 2) {
          setTimeout(function () {
              if (mouseIsDown) {
                      if (collected_urls[link.href] == undefined) {
                          //var ele = GM_eleTOPele(e.target);
                          //document.body.appendChild(ele);
                          //collected_urls[link.href] = ele;
                          collected_urls[link.href] = e.target;
                          e.target.style.boxSizing = 'border-box';
                          e.target.style.border = 'solid yellow 4px';
                          //popup('Added: ' + link.href, e.clientX, e.clientY)
                      } else {
                          //collected_urls[link.href].parentNode.removeChild(collected_urls[link.href]);
                          collected_urls[link.href].style.boxSizing = 'unset';
                          collected_urls[link.href].style.border = 'unset';
                          delete collected_urls[link.href];
                          //e.target.style.boxSizing = 'unset';
                          //e.target.style.border = 'unset';
                      }
                  console.log(collected_urls);
                  count = 0;
                  mouseIsDown = false;
              held = true;
              }
          }, 200);
      }
    }

});

attachDrag(document);
var attachedeles = [];
document.addEventListener('mouseover', function(e) {
  if (e.target.shadowRoot) {
    if (attachedeles.includes(e.target) == false) {
      console.log(attachedeles);
      attachedeles.push(e.target);
      attachDrag(e.target.shadowRoot);
    }
  }
});

if (document.domain == 'www.youtube.com' || document.domain == 'm.youtube.com') {
    let state = GM_getValue('hh_mobile', false);
    let dm = location.host || '';
    let dmc = dm.charAt(0) || '';
    if (state == true && dmc == 'w') {
      location.host = location.host.replace('www.youtube.com', 'm.youtube.com');
    } else if (state == false && dmc == 'm') {
      location.host = location.host.replace('m.youtube.com', 'www.youtube.com');
    }
    function addMenuCommand(s, url, b) {
        GM_registerMenuCommand(s, function () {
            location.replace(url);
            if (url.indexOf('m.youtube.com') != -1) {
              GM_setValue('hh_mobile', true);
            } else if (url.indexOf('www.youtube.com') != -1) {
              GM_setValue('hh_mobile', false);
            }
        });
    }
    if (dmc == 'w') {
        addMenuCommand("Switch to YouTube Mobile persistently", "https://m.youtube.com/?persist_app=1&app=m", true);

    } else if (dmc == 'm') {
        addMenuCommand("Switch to YouTube Dekstop persistently", "http://www.youtube.com/?persist_app=1&app=desktop", false);
    }
}
