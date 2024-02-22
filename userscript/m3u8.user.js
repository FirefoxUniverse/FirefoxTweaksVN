// ==UserScript==
// @name         MPV-M3U8 Video Detector and Downloader
// @name:en      MPV-M3U8 Video Detector and Downloader
// @version      1.5.6
// @description:en  Automatically detect the m3u8 video of the page and download it completely. Once detected the m3u8 link, it will appear in the upper right corner of the page. Click download to jump to the m3u8 downloader.
// @icon         https://tools.thatwind.com/favicon.png
// @author       -
// @namespace    https://tools.thatwind.com/
// @homepage
// @match        *://*/*
// @exclude      *://www.diancigaoshou.com/*
// @connect      *
// @grant        unsafeWindow
// @grant        GM_openInTab
// @grant        GM.openInTab
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM_setValue
// @grant        GM.setValue
// @grant        GM_deleteValue
// @grant        GM.deleteValue
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @grant        GM_download
// @run-at       document-start
// ==/UserScript==

// inline m3u8 parser to improve performance and longevity
/*! @name m3u8-parser @version 4.7.1 @license Apache-2.0 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("global/window")):"function"==typeof define&&define.amd?define(["exports","global/window"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).m3u8Parser={},t.window)}(this,(function(t,e){"use strict";function i(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var r=i(e);var a=function(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e},s=function(){function t(){this.listeners={}}var e=t.prototype;return e.on=function(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)},e.off=function(t,e){if(!this.listeners[t])return!1;var i=this.listeners[t].indexOf(e);return this.listeners[t]=this.listeners[t].slice(0),this.listeners[t].splice(i,1),i>-1},e.trigger=function(t){var e=this.listeners[t];if(e)if(2===arguments.length)for(var i=e.length,r=0;r<i;++r)e[r].call(this,arguments[1]);else for(var a=Array.prototype.slice.call(arguments,1),s=e.length,n=0;n<s;++n)e[n].apply(this,a)},e.dispose=function(){this.listeners={}},e.pipe=function(t){this.on("data",(function(e){t.push(e)}))},t}(),n=function(t){function e(){var e;return(e=t.call(this)||this).buffer="",e}return a(e,t),e.prototype.push=function(t){var e;for(this.buffer+=t,e=this.buffer.indexOf("\n");e>-1;e=this.buffer.indexOf("\n"))this.trigger("data",this.buffer.substring(0,e)),this.buffer=this.buffer.substring(e+1)},e}(s);var u=function(t,e,i){return t(i={path:e,exports:{},require:function(t,e){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==e&&i.path)}},i.exports),i.exports}((function(t){function e(){return t.exports=e=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r])}return t},e.apply(this,arguments)}t.exports=e})),o=String.fromCharCode(9),g=function(t){var e=/([0-9.]*)?@?([0-9.]*)?/.exec(t||""),i={};return e[1]&&(i.length=parseInt(e[1],10)),e[2]&&(i.offset=parseInt(e[2],10)),i},f=function(t){for(var e,i=t.split(new RegExp('(?:^|,)((?:[^=]*)=(?:"[^"]*"|[^,]*))')),r={},a=i.length;a--;)""!==i[a]&&((e=/([^=]*)=(.*)/.exec(i[a]).slice(1))[0]=e[0].replace(/^\s+|\s+$/g,""),e[1]=e[1].replace(/^\s+|\s+$/g,""),e[1]=e[1].replace(/^['"](.*)['"]$/g,"$1"),r[e[0]]=e[1]);return r},p=function(t){function e(){var e;return(e=t.call(this)||this).customParsers=[],e.tagMappers=[],e}a(e,t);var i=e.prototype;return i.push=function(t){var e,i,r=this;0!==(t=t.trim()).length&&("#"===t[0]?this.tagMappers.reduce((function(e,i){var r=i(t);return r===t?e:e.concat([r])}),[t]).forEach((function(t){for(var a=0;a<r.customParsers.length;a++)if(r.customParsers[a].call(r,t))return;if(0===t.indexOf("#EXT"))if(t=t.replace("\r",""),e=/^#EXTM3U/.exec(t))r.trigger("data",{type:"tag",tagType:"m3u"});else{if(e=/^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(t))return i={type:"tag",tagType:"inf"},e[1]&&(i.duration=parseFloat(e[1])),e[2]&&(i.title=e[2]),void r.trigger("data",i);if(e=/^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(t))return i={type:"tag",tagType:"targetduration"},e[1]&&(i.duration=parseInt(e[1],10)),void r.trigger("data",i);if(e=/^#EXT-X-VERSION:?([0-9.]*)?/.exec(t))return i={type:"tag",tagType:"version"},e[1]&&(i.version=parseInt(e[1],10)),void r.trigger("data",i);if(e=/^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(t))return i={type:"tag",tagType:"media-sequence"},e[1]&&(i.number=parseInt(e[1],10)),void r.trigger("data",i);if(e=/^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(t))return i={type:"tag",tagType:"discontinuity-sequence"},e[1]&&(i.number=parseInt(e[1],10)),void r.trigger("data",i);if(e=/^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(t))return i={type:"tag",tagType:"playlist-type"},e[1]&&(i.playlistType=e[1]),void r.trigger("data",i);if(e=/^#EXT-X-BYTERANGE:?(.*)?$/.exec(t))return i=u(g(e[1]),{type:"tag",tagType:"byterange"}),void r.trigger("data",i);if(e=/^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(t))return i={type:"tag",tagType:"allow-cache"},e[1]&&(i.allowed=!/NO/.test(e[1])),void r.trigger("data",i);if(e=/^#EXT-X-MAP:?(.*)$/.exec(t)){if(i={type:"tag",tagType:"map"},e[1]){var s=f(e[1]);s.URI&&(i.uri=s.URI),s.BYTERANGE&&(i.byterange=g(s.BYTERANGE))}r.trigger("data",i)}else if(e=/^#EXT-X-STREAM-INF:?(.*)$/.exec(t)){if(i={type:"tag",tagType:"stream-inf"},e[1]){if(i.attributes=f(e[1]),i.attributes.RESOLUTION){var n=i.attributes.RESOLUTION.split("x"),p={};n[0]&&(p.width=parseInt(n[0],10)),n[1]&&(p.height=parseInt(n[1],10)),i.attributes.RESOLUTION=p}i.attributes.BANDWIDTH&&(i.attributes.BANDWIDTH=parseInt(i.attributes.BANDWIDTH,10)),i.attributes["PROGRAM-ID"]&&(i.attributes["PROGRAM-ID"]=parseInt(i.attributes["PROGRAM-ID"],10))}r.trigger("data",i)}else{if(e=/^#EXT-X-MEDIA:?(.*)$/.exec(t))return i={type:"tag",tagType:"media"},e[1]&&(i.attributes=f(e[1])),void r.trigger("data",i);if(e=/^#EXT-X-ENDLIST/.exec(t))r.trigger("data",{type:"tag",tagType:"endlist"});else if(e=/^#EXT-X-DISCONTINUITY/.exec(t))r.trigger("data",{type:"tag",tagType:"discontinuity"});else{if(e=/^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(t))return i={type:"tag",tagType:"program-date-time"},e[1]&&(i.dateTimeString=e[1],i.dateTimeObject=new Date(e[1])),void r.trigger("data",i);if(e=/^#EXT-X-KEY:?(.*)$/.exec(t))return i={type:"tag",tagType:"key"},e[1]&&(i.attributes=f(e[1]),i.attributes.IV&&("0x"===i.attributes.IV.substring(0,2).toLowerCase()&&(i.attributes.IV=i.attributes.IV.substring(2)),i.attributes.IV=i.attributes.IV.match(/.{8}/g),i.attributes.IV[0]=parseInt(i.attributes.IV[0],16),i.attributes.IV[1]=parseInt(i.attributes.IV[1],16),i.attributes.IV[2]=parseInt(i.attributes.IV[2],16),i.attributes.IV[3]=parseInt(i.attributes.IV[3],16),i.attributes.IV=new Uint32Array(i.attributes.IV))),void r.trigger("data",i);if(e=/^#EXT-X-START:?(.*)$/.exec(t))return i={type:"tag",tagType:"start"},e[1]&&(i.attributes=f(e[1]),i.attributes["TIME-OFFSET"]=parseFloat(i.attributes["TIME-OFFSET"]),i.attributes.PRECISE=/YES/.test(i.attributes.PRECISE)),void r.trigger("data",i);if(e=/^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(t))return i={type:"tag",tagType:"cue-out-cont"},e[1]?i.data=e[1]:i.data="",void r.trigger("data",i);if(e=/^#EXT-X-CUE-OUT:?(.*)?$/.exec(t))return i={type:"tag",tagType:"cue-out"},e[1]?i.data=e[1]:i.data="",void r.trigger("data",i);if(e=/^#EXT-X-CUE-IN:?(.*)?$/.exec(t))return i={type:"tag",tagType:"cue-in"},e[1]?i.data=e[1]:i.data="",void r.trigger("data",i);if((e=/^#EXT-X-SKIP:(.*)$/.exec(t))&&e[1])return(i={type:"tag",tagType:"skip"}).attributes=f(e[1]),i.attributes.hasOwnProperty("SKIPPED-SEGMENTS")&&(i.attributes["SKIPPED-SEGMENTS"]=parseInt(i.attributes["SKIPPED-SEGMENTS"],10)),i.attributes.hasOwnProperty("RECENTLY-REMOVED-DATERANGES")&&(i.attributes["RECENTLY-REMOVED-DATERANGES"]=i.attributes["RECENTLY-REMOVED-DATERANGES"].split(o)),void r.trigger("data",i);if((e=/^#EXT-X-PART:(.*)$/.exec(t))&&e[1])return(i={type:"tag",tagType:"part"}).attributes=f(e[1]),["DURATION"].forEach((function(t){i.attributes.hasOwnProperty(t)&&(i.attributes[t]=parseFloat(i.attributes[t]))})),["INDEPENDENT","GAP"].forEach((function(t){i.attributes.hasOwnProperty(t)&&(i.attributes[t]=/YES/.test(i.attributes[t]))})),i.attributes.hasOwnProperty("BYTERANGE")&&(i.attributes.byterange=g(i.attributes.BYTERANGE)),void r.trigger("data",i);if((e=/^#EXT-X-SERVER-CONTROL:(.*)$/.exec(t))&&e[1])return(i={type:"tag",tagType:"server-control"}).attributes=f(e[1]),["CAN-SKIP-UNTIL","PART-HOLD-BACK","HOLD-BACK"].forEach((function(t){i.attributes.hasOwnProperty(t)&&(i.attributes[t]=parseFloat(i.attributes[t]))})),["CAN-SKIP-DATERANGES","CAN-BLOCK-RELOAD"].forEach((function(t){i.attributes.hasOwnProperty(t)&&(i.attributes[t]=/YES/.test(i.attributes[t]))})),void r.trigger("data",i);if((e=/^#EXT-X-PART-INF:(.*)$/.exec(t))&&e[1])return(i={type:"tag",tagType:"part-inf"}).attributes=f(e[1]),["PART-TARGET"].forEach((function(t){i.attributes.hasOwnProperty(t)&&(i.attributes[t]=parseFloat(i.attributes[t]))})),void r.trigger("data",i);if((e=/^#EXT-X-PRELOAD-HINT:(.*)$/.exec(t))&&e[1])return(i={type:"tag",tagType:"preload-hint"}).attributes=f(e[1]),["BYTERANGE-START","BYTERANGE-LENGTH"].forEach((function(t){if(i.attributes.hasOwnProperty(t)){i.attributes[t]=parseInt(i.attributes[t],10);var e="BYTERANGE-LENGTH"===t?"length":"offset";i.attributes.byterange=i.attributes.byterange||{},i.attributes.byterange[e]=i.attributes[t],delete i.attributes[t]}})),void r.trigger("data",i);if((e=/^#EXT-X-RENDITION-REPORT:(.*)$/.exec(t))&&e[1])return(i={type:"tag",tagType:"rendition-report"}).attributes=f(e[1]),["LAST-MSN","LAST-PART"].forEach((function(t){i.attributes.hasOwnProperty(t)&&(i.attributes[t]=parseInt(i.attributes[t],10))})),void r.trigger("data",i);r.trigger("data",{type:"tag",data:t.slice(4)})}}}else r.trigger("data",{type:"comment",text:t.slice(1)})})):this.trigger("data",{type:"uri",uri:t}))},i.addParser=function(t){var e=this,i=t.expression,r=t.customType,a=t.dataParser,s=t.segment;"function"!=typeof a&&(a=function(t){return t}),this.customParsers.push((function(t){if(i.exec(t))return e.trigger("data",{type:"custom",data:a(t),customType:r,segment:s}),!0}))},i.addTagMapper=function(t){var e=t.expression,i=t.map;this.tagMappers.push((function(t){return e.test(t)?i(t):t}))},e}(s);var c=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t};function d(t){for(var e,i=(e=t,r.default.atob?r.default.atob(e):Buffer.from(e,"base64").toString("binary")),a=new Uint8Array(i.length),s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return a}var h=function(t){var e={};return Object.keys(t).forEach((function(i){var r;e[(r=i,r.toLowerCase().replace(/-(\w)/g,(function(t){return t[1].toUpperCase()})))]=t[i]})),e},l=function(t){var e=t.serverControl,i=t.targetDuration,r=t.partTargetDuration;if(e){var a="#EXT-X-SERVER-CONTROL",s="holdBack",n="partHoldBack",u=i&&3*i,o=r&&2*r;i&&!e.hasOwnProperty(s)&&(e[s]=u,this.trigger("info",{message:a+" defaulting HOLD-BACK to targetDuration * 3 ("+u+")."})),u&&e[s]<u&&(this.trigger("warn",{message:a+" clamping HOLD-BACK ("+e[s]+") to targetDuration * 3 ("+u+")"}),e[s]=u),r&&!e.hasOwnProperty(n)&&(e[n]=3*r,this.trigger("info",{message:a+" defaulting PART-HOLD-BACK to partTargetDuration * 3 ("+e[n]+")."})),r&&e[n]<o&&(this.trigger("warn",{message:a+" clamping PART-HOLD-BACK ("+e[n]+") to partTargetDuration * 2 ("+o+")."}),e[n]=o)}},b=function(t){function e(){var e;(e=t.call(this)||this).lineStream=new n,e.parseStream=new p,e.lineStream.pipe(e.parseStream);var i,r,a=c(e),s=[],o={},g=!1,f=function(){},b={AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},E=0;e.manifest={allowCache:!0,discontinuityStarts:[],segments:[]};var T=0,m=0;return e.on("end",(function(){o.uri||!o.parts&&!o.preloadHints||(!o.map&&i&&(o.map=i),!o.key&&r&&(o.key=r),o.timeline||"number"!=typeof E||(o.timeline=E),e.manifest.preloadSegment=o)})),e.parseStream.on("data",(function(t){var e,n;({tag:function(){({version:function(){t.version&&(this.manifest.version=t.version)},"allow-cache":function(){this.manifest.allowCache=t.allowed,"allowed"in t||(this.trigger("info",{message:"defaulting allowCache to YES"}),this.manifest.allowCache=!0)},byterange:function(){var e={};"length"in t&&(o.byterange=e,e.length=t.length,"offset"in t||(t.offset=T)),"offset"in t&&(o.byterange=e,e.offset=t.offset),T=e.offset+e.length},endlist:function(){this.manifest.endList=!0},inf:function(){"mediaSequence"in this.manifest||(this.manifest.mediaSequence=0,this.trigger("info",{message:"defaulting media sequence to zero"})),"discontinuitySequence"in this.manifest||(this.manifest.discontinuitySequence=0,this.trigger("info",{message:"defaulting discontinuity sequence to zero"})),t.duration>0&&(o.duration=t.duration),0===t.duration&&(o.duration=.01,this.trigger("info",{message:"updating zero segment duration to a small value"})),this.manifest.segments=s},key:function(){if(t.attributes)if("NONE"!==t.attributes.METHOD)if(t.attributes.URI){if("com.apple.streamingkeydelivery"===t.attributes.KEYFORMAT)return this.manifest.contentProtection=this.manifest.contentProtection||{},void(this.manifest.contentProtection["com.apple.fps.1_0"]={attributes:t.attributes});if("com.microsoft.playready"===t.attributes.KEYFORMAT)return this.manifest.contentProtection=this.manifest.contentProtection||{},void(this.manifest.contentProtection["com.microsoft.playready"]={uri:t.attributes.URI});if("urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"===t.attributes.KEYFORMAT){return-1===["SAMPLE-AES","SAMPLE-AES-CTR","SAMPLE-AES-CENC"].indexOf(t.attributes.METHOD)?void this.trigger("warn",{message:"invalid key method provided for Widevine"}):("SAMPLE-AES-CENC"===t.attributes.METHOD&&this.trigger("warn",{message:"SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead"}),"data:text/plain;base64,"!==t.attributes.URI.substring(0,23)?void this.trigger("warn",{message:"invalid key URI provided for Widevine"}):t.attributes.KEYID&&"0x"===t.attributes.KEYID.substring(0,2)?(this.manifest.contentProtection=this.manifest.contentProtection||{},void(this.manifest.contentProtection["com.widevine.alpha"]={attributes:{schemeIdUri:t.attributes.KEYFORMAT,keyId:t.attributes.KEYID.substring(2)},pssh:d(t.attributes.URI.split(",")[1])})):void this.trigger("warn",{message:"invalid key ID provided for Widevine"}))}t.attributes.METHOD||this.trigger("warn",{message:"defaulting key method to AES-128"}),r={method:t.attributes.METHOD||"AES-128",uri:t.attributes.URI},void 0!==t.attributes.IV&&(r.iv=t.attributes.IV)}else this.trigger("warn",{message:"ignoring key declaration without URI"});else r=null;else this.trigger("warn",{message:"ignoring key declaration without attribute list"})},"media-sequence":function(){isFinite(t.number)?this.manifest.mediaSequence=t.number:this.trigger("warn",{message:"ignoring invalid media sequence: "+t.number})},"discontinuity-sequence":function(){isFinite(t.number)?(this.manifest.discontinuitySequence=t.number,E=t.number):this.trigger("warn",{message:"ignoring invalid discontinuity sequence: "+t.number})},"playlist-type":function(){/VOD|EVENT/.test(t.playlistType)?this.manifest.playlistType=t.playlistType:this.trigger("warn",{message:"ignoring unknown playlist type: "+t.playlist})},map:function(){i={},t.uri&&(i.uri=t.uri),t.byterange&&(i.byterange=t.byterange),r&&(i.key=r)},"stream-inf":function(){this.manifest.playlists=s,this.manifest.mediaGroups=this.manifest.mediaGroups||b,t.attributes?(o.attributes||(o.attributes={}),u(o.attributes,t.attributes)):this.trigger("warn",{message:"ignoring empty stream-inf attributes"})},media:function(){if(this.manifest.mediaGroups=this.manifest.mediaGroups||b,t.attributes&&t.attributes.TYPE&&t.attributes["GROUP-ID"]&&t.attributes.NAME){var i=this.manifest.mediaGroups[t.attributes.TYPE];i[t.attributes["GROUP-ID"]]=i[t.attributes["GROUP-ID"]]||{},e=i[t.attributes["GROUP-ID"]],(n={default:/yes/i.test(t.attributes.DEFAULT)}).default?n.autoselect=!0:n.autoselect=/yes/i.test(t.attributes.AUTOSELECT),t.attributes.LANGUAGE&&(n.language=t.attributes.LANGUAGE),t.attributes.URI&&(n.uri=t.attributes.URI),t.attributes["INSTREAM-ID"]&&(n.instreamId=t.attributes["INSTREAM-ID"]),t.attributes.CHARACTERISTICS&&(n.characteristics=t.attributes.CHARACTERISTICS),t.attributes.FORCED&&(n.forced=/yes/i.test(t.attributes.FORCED)),e[t.attributes.NAME]=n}else this.trigger("warn",{message:"ignoring incomplete or missing media group"})},discontinuity:function(){E+=1,o.discontinuity=!0,this.manifest.discontinuityStarts.push(s.length)},"program-date-time":function(){void 0===this.manifest.dateTimeString&&(this.manifest.dateTimeString=t.dateTimeString,this.manifest.dateTimeObject=t.dateTimeObject),o.dateTimeString=t.dateTimeString,o.dateTimeObject=t.dateTimeObject},targetduration:function(){!isFinite(t.duration)||t.duration<0?this.trigger("warn",{message:"ignoring invalid target duration: "+t.duration}):(this.manifest.targetDuration=t.duration,l.call(this,this.manifest))},start:function(){t.attributes&&!isNaN(t.attributes["TIME-OFFSET"])?this.manifest.start={timeOffset:t.attributes["TIME-OFFSET"],precise:t.attributes.PRECISE}:this.trigger("warn",{message:"ignoring start declaration without appropriate attribute list"})},"cue-out":function(){o.cueOut=t.data},"cue-out-cont":function(){o.cueOutCont=t.data},"cue-in":function(){o.cueIn=t.data},skip:function(){this.manifest.skip=h(t.attributes),this.warnOnMissingAttributes_("#EXT-X-SKIP",t.attributes,["SKIPPED-SEGMENTS"])},part:function(){var e=this;g=!0;var i=this.manifest.segments.length,r=h(t.attributes);o.parts=o.parts||[],o.parts.push(r),r.byterange&&(r.byterange.hasOwnProperty("offset")||(r.byterange.offset=m),m=r.byterange.offset+r.byterange.length);var a=o.parts.length-1;this.warnOnMissingAttributes_("#EXT-X-PART #"+a+" for segment #"+i,t.attributes,["URI","DURATION"]),this.manifest.renditionReports&&this.manifest.renditionReports.forEach((function(t,i){t.hasOwnProperty("lastPart")||e.trigger("warn",{message:"#EXT-X-RENDITION-REPORT #"+i+" lacks required attribute(s): LAST-PART"})}))},"server-control":function(){var e=this.manifest.serverControl=h(t.attributes);e.hasOwnProperty("canBlockReload")||(e.canBlockReload=!1,this.trigger("info",{message:"#EXT-X-SERVER-CONTROL defaulting CAN-BLOCK-RELOAD to false"})),l.call(this,this.manifest),e.canSkipDateranges&&!e.hasOwnProperty("canSkipUntil")&&this.trigger("warn",{message:"#EXT-X-SERVER-CONTROL lacks required attribute CAN-SKIP-UNTIL which is required when CAN-SKIP-DATERANGES is set"})},"preload-hint":function(){var e=this.manifest.segments.length,i=h(t.attributes),r=i.type&&"PART"===i.type;o.preloadHints=o.preloadHints||[],o.preloadHints.push(i),i.byterange&&(i.byterange.hasOwnProperty("offset")||(i.byterange.offset=r?m:0,r&&(m=i.byterange.offset+i.byterange.length)));var a=o.preloadHints.length-1;if(this.warnOnMissingAttributes_("#EXT-X-PRELOAD-HINT #"+a+" for segment #"+e,t.attributes,["TYPE","URI"]),i.type)for(var s=0;s<o.preloadHints.length-1;s++){var n=o.preloadHints[s];n.type&&(n.type===i.type&&this.trigger("warn",{message:"#EXT-X-PRELOAD-HINT #"+a+" for segment #"+e+" has the same TYPE "+i.type+" as preload hint #"+s}))}},"rendition-report":function(){var e=h(t.attributes);this.manifest.renditionReports=this.manifest.renditionReports||[],this.manifest.renditionReports.push(e);var i=this.manifest.renditionReports.length-1,r=["LAST-MSN","URI"];g&&r.push("LAST-PART"),this.warnOnMissingAttributes_("#EXT-X-RENDITION-REPORT #"+i,t.attributes,r)},"part-inf":function(){this.manifest.partInf=h(t.attributes),this.warnOnMissingAttributes_("#EXT-X-PART-INF",t.attributes,["PART-TARGET"]),this.manifest.partInf.partTarget&&(this.manifest.partTargetDuration=this.manifest.partInf.partTarget),l.call(this,this.manifest)}}[t.tagType]||f).call(a)},uri:function(){o.uri=t.uri,s.push(o),this.manifest.targetDuration&&!("duration"in o)&&(this.trigger("warn",{message:"defaulting segment duration to the target duration"}),o.duration=this.manifest.targetDuration),r&&(o.key=r),o.timeline=E,i&&(o.map=i),m=0,o={}},comment:function(){},custom:function(){t.segment?(o.custom=o.custom||{},o.custom[t.customType]=t.data):(this.manifest.custom=this.manifest.custom||{},this.manifest.custom[t.customType]=t.data)}})[t.type].call(a)})),e}a(e,t);var i=e.prototype;return i.warnOnMissingAttributes_=function(t,e,i){var r=[];i.forEach((function(t){e.hasOwnProperty(t)||r.push(t)})),r.length&&this.trigger("warn",{message:t+" lacks required attribute(s): "+r.join(", ")})},i.push=function(t){this.lineStream.push(t)},i.end=function(){this.lineStream.push("\n"),this.trigger("end")},i.addParser=function(t){this.parseStream.addParser(t)},i.addTagMapper=function(t){this.parseStream.addTagMapper(t)},e}(s);t.LineStream=n,t.ParseStream=p,t.Parser=b,Object.defineProperty(t,"__esModule",{value:!0})}));

(function () {
    'use strict';

    const mgmapi = {

        addStyle(s) {
            let style = document.createElement("style");
            style.innerHTML = s;
            document.documentElement.appendChild(style);
        },
        async getValue(name, defaultVal) {
            return await ((typeof GM_getValue === "function") ? GM_getValue : GM.getValue)(name, defaultVal);
        },
        async setValue(name, value) {
            return await ((typeof GM_setValue === "function") ? GM_setValue : GM.setValue)(name, value);
        },
        async deleteValue(name) {
            return await ((typeof GM_deleteValue === "function") ? GM_deleteValue : GM.deleteValue)(name);
        },
        openInTab(url, open_in_background = false) {
            return ((typeof GM_openInTab === "function") ? GM_openInTab : GM.openInTab)(url, open_in_background);
        },
        xmlHttpRequest(details) {
            return ((typeof GM_xmlhttpRequest === "function") ? GM_xmlhttpRequest : GM.xmlHttpRequest)(details);
        },
        download(details) {

            return this.openInTab(details.url);

            if (typeof GM_download === "function") {
                this.message("下载中，请留意浏览器下载弹窗\nDownloading, pay attention to the browser's download pop-up.", 3000);
                return GM_download(details);
            } else {
                this.openInTab(details.url);
            }
        },
        copyText(text) {
            copyTextToClipboard(text);
            function copyTextToClipboard(text) {
                // 复制文本
                var copyFrom = document.createElement("textarea");
                copyFrom.textContent = text;
                document.body.appendChild(copyFrom);
                copyFrom.select();
                document.execCommand('copy');
                copyFrom.blur();
                document.body.removeChild(copyFrom);
            }
        },
        message(text, disappearTime = 5000) {
            const id = "f8243rd238-gm-message-panel";
            let p = document.querySelector(`#${id}`);
            if (!p) {
                p = document.createElement("div");
                p.id = id;
                p.style = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: end;
                    z-index: 999999999999999;
                `;
                (document.body || document.documentElement).appendChild(p);
            }
            let mdiv = document.createElement("div");
            mdiv.innerText = text;
            mdiv.style = `
                padding: 3px 8px;
                border-radius: 5px;
                background: black;
                box-shadow: #000 1px 2px 5px;
                margin-top: 10px;
                font-size: small;
                color: #fff;
                text-align: right;
            `;
            p.appendChild(mdiv);
            setTimeout(() => {
                p.removeChild(mdiv);
            }, disappearTime);
        }
    };


    if (location.host === "tools.thatwind.com" || location.host === "localhost:3000") {
        mgmapi.addStyle("#userscript-tip{display:none !important;}");

        // 对请求做代理
        const _fetch = unsafeWindow.fetch;
        unsafeWindow.fetch = async function (...args) {
            try {
                let response = await _fetch(...args);
                if (response.status !== 200) throw new Error(response.status);
                return response;
            } catch (e) {
                // 失败请求使用代理
                if (args.length == 1) {
                    console.log(`请求代理：${args[0]}`);
                    return await new Promise((resolve, reject) => {
                        let referer = new URLSearchParams(location.hash.slice(1)).get("referer");
                        let headers = {};
                        if (referer) {
                            referer = new URL(referer);
                            headers = {
                                "origin": referer.origin,
                                "referer": referer.href
                            };
                        }
                        mgmapi.xmlHttpRequest({
                            method: "GET",
                            url: args[0],
                            responseType: 'arraybuffer',
                            headers,
                            onload(r) {
                                resolve({
                                    status: r.status,
                                    headers: new Headers(r.responseHeaders.split("\n").filter(n => n).map(s => s.split(/:\s*/)).reduce((all, [a, b]) => { all[a] = b; return all; }, {})),
                                    async text() {
                                        return r.responseText;
                                    },
                                    async arrayBuffer() {
                                        return r.response;
                                    }
                                });
                            },
                            onerror() {
                                reject(new Error());
                            }
                        });
                    });
                } else {
                    throw e;
                }
            }
        }

        return;
    }


    // iframe 信息交流
    // 目前只用于获取顶部标题
    window.addEventListener("message", async (e) => {
        if (e.data === "3j4t9uj349-gm-get-title") {
            let name = `top-title-${Date.now()}`;
            await mgmapi.setValue(name, document.title);
            e.source.postMessage(`3j4t9uj349-gm-top-title-name:${name}`, "*");
        }
    });

    function getTopTitle() {
        return new Promise(resolve => {
            window.addEventListener("message", async function l(e) {
                if (typeof e.data === "string") {
                    if (e.data.startsWith("3j4t9uj349-gm-top-title-name:")) {
                        let name = e.data.slice("3j4t9uj349-gm-top-title-name:".length);
                        await new Promise(r => setTimeout(r, 5)); // 等5毫秒 确定 setValue 已经写入
                        resolve(await mgmapi.getValue(name));
                        mgmapi.deleteValue(name);
                        window.removeEventListener("message", l);
                    }
                }
            });
            window.top.postMessage("3j4t9uj349-gm-get-title", "*");
        });
    }


    {
        // 请求检测
        // const _fetch = self.fetch;
        // self.fetch = function (...args) {
        //     if (checkUrl(args[0])) doM3U({ url: args[0] });
        //     return _fetch(...args);
        // }
        // overriding fetch could be dangerous and slow, only apply to socolive
        if (location.href.match(/^.*?socolive.*?$/)) {
        var sfetch = unsafeWindow.fetch;
        unsafeWindow.fetch = new Proxy(sfetch, {
            apply: function(target, thisArg, args) {
                console.log(target, thisArg, args);
                let proceed = true;
                try {
                    if (args[0].indexOf(".flv") != -1) doM3U({ url: args[0], content: args[0] });
                } catch(ex) {
                    console.log(ex);
                }
                return proceed
                    ? Reflect.apply(target, thisArg, args)
                    : Promise.resolve(new Response());
            }
        });
        }
        const _r_text = unsafeWindow.Response.prototype.text;
        unsafeWindow.Response.prototype.text = function () {
            return new Promise((resolve, reject) => {
                _r_text.call(this).then((text) => {
                    resolve(text);
                    if (checkContent(text)) doM3U({ url: this.url, content: text });
                    if (checkUrl(this.url)) doM3U({ url: this.url });
                }).catch(reject);
            });
        }

        const _open = unsafeWindow.XMLHttpRequest.prototype.open;
        unsafeWindow.XMLHttpRequest.prototype.open = function (...args) {
            this.addEventListener("load", () => {
                try {
                    let content = this.responseText;
                    if (checkContent(content)) doM3U({ url: args[1], content: content });
                } catch { }
            });
            if (checkUrl(args[1])) doM3U({ url: args[1] });
            return _open.apply(this, args);
        }


        function checkUrl(url) {
            url = new URL(url, location.href);
            if (url.pathname.indexOf(".m3u8") != -1 || url.pathname.indexOf(".m3u") != -1) {
                // 发现
                return true;
            }
        }

        function checkContent(content) {
            if (content.trim().startsWith("#EXTM3U")) {
                return true;
            }
        }


        // 检查纯视频
        setInterval(doVideos, 1000);

    }

    const rootDiv = document.createElement("div");
    rootDiv.style = `
        position: fixed;
        z-index: 9999999999999999;
        opacity: 0.9;
    `;
    rootDiv.style.display = "none";
    document.documentElement.appendChild(rootDiv);

    const shadowDOM = rootDiv.attachShadow({ mode: 'open' });
    const wrapper = document.createElement("div");
    shadowDOM.appendChild(wrapper);


    // 指示器
    const bar = document.createElement("div");
    bar.style = `
        text-align: right;
    `;
    bar.innerHTML = `
        <span
            class="number-indicator"
            data-number="0"
            style="
                display: inline-flex;
                width: 20px;
                height: 20px;
                background: black;
                padding: 10px;
                border-radius: 100px;
                margin-bottom: 5px;
                cursor: pointer;
            "
        >
            <svg
            style="
                filter: invert(1);
            "
            version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 585.913 585.913" style="enable-background:new 0 0 585.913 585.913;" xml:space="preserve">
                <g>
                    <path d="M11.173,46.2v492.311l346.22,47.402V535.33c0.776,0.058,1.542,0.109,2.329,0.109h177.39
                    c20.75,0,37.627-16.883,37.627-37.627V86.597c0-20.743-16.877-37.628-37.627-37.628h-177.39c-0.781,0-1.553,0.077-2.329,0.124V0
                    L11.173,46.2z M110.382,345.888l-1.37-38.273c-0.416-11.998-0.822-26.514-0.822-41.023l-0.415,0.01
                    c-2.867,12.767-6.678,26.956-10.187,38.567l-10.961,38.211l-15.567-0.582l-9.239-37.598c-2.801-11.269-5.709-24.905-7.725-37.361
                    l-0.25,0.005c-0.503,12.914-0.879,27.657-1.503,39.552L50.84,343.6l-17.385-0.672l5.252-94.208l25.415-0.996l8.499,32.064
                    c2.724,11.224,5.467,23.364,7.428,34.819h0.389c2.503-11.291,5.535-24.221,8.454-35.168l9.643-33.042l27.436-1.071l5.237,101.377
                    L110.382,345.888z M172.479,349.999c-12.569-0.504-23.013-4.272-28.539-8.142l4.504-17.249c3.939,2.226,13.1,6.445,22.373,6.687
                    c12.009,0.32,18.174-5.497,18.174-13.218c0-10.068-9.838-14.683-19.979-14.74l-9.253-0.052v-16.777l8.801-0.066
                    c7.708-0.208,17.646-3.262,17.646-11.905c0-6.121-4.914-10.562-14.635-10.331c-7.95,0.189-16.245,3.914-20.213,6.446l-4.52-16.693
                    c5.693-4.008,17.224-8.11,29.883-8.588c21.457-0.795,33.643,10.407,33.643,24.625c0,11.029-6.197,19.691-18.738,24.161v0.314
                    c12.229,2.216,22.266,11.663,22.266,25.281C213.89,338.188,197.866,351.001,172.479,349.999z M331.104,302.986
                    c0,36.126-19.55,52.541-51.193,51.286c-29.318-1.166-46.019-17.103-46.019-52.044v-61.104l25.711-1.006v64.201
                    c0,19.191,7.562,29.146,21.179,29.502c14.234,0.368,22.189-8.976,22.189-29.26v-66.125l28.122-1.097v65.647H331.104z
                    M359.723,70.476h177.39c8.893,0,16.125,7.236,16.125,16.126v411.22c0,8.888-7.232,16.127-16.125,16.127h-177.39
                    c-0.792,0-1.563-0.116-2.329-0.232V380.782c17.685,14.961,40.504,24.032,65.434,24.032c56.037,0,101.607-45.576,101.607-101.599
                    c0-56.029-45.581-101.603-101.607-101.603c-24.93,0-47.749,9.069-65.434,24.035V70.728
                    C358.159,70.599,358.926,70.476,359.723,70.476z M390.873,364.519V245.241c0-1.07,0.615-2.071,1.586-2.521
                    c0.981-0.483,2.13-0.365,2.981,0.307l93.393,59.623c0.666,0.556,1.065,1.376,1.065,2.215c0,0.841-0.399,1.67-1.065,2.215
                    l-93.397,59.628c-0.509,0.4-1.114,0.61-1.743,0.61l-1.233-0.289C391.488,366.588,390.873,365.585,390.873,364.519z" />
                </g>
            </svg>
        </span>
    `;

    wrapper.appendChild(bar);

    // 样式
    const style = document.createElement("style");

    style.innerHTML = `
        .number-indicator{
            position:relative;
        }

        .number-indicator::after{
            content: attr(data-number);
            position: absolute;
            bottom: 0;
            right: 0;
            color: #40a9ff;
            font-size: 14px;
            font-weight: bold;
            background: #000;
            border-radius: 10px;
            padding: 3px 5px;
        }

        .copy-link:link{
            text-decoration: none;
        }

        .copy-link:hover{
            text-decoration: underline;
        }

        .download-btn:hover{
            text-decoration: underline;
        }
        .download-btn:active{
            opacity: 0.9;
        }

        .m3u8-item{
            color: white;
            margin-bottom: 5px;
            display: flex;
            flex-direction: row;
            align-items: baseline;
            background: black;
            padding: 3px 10px;
            border-radius: 3px;
            font-size: 12px;
            user-select: none;
        }

        [data-shown="false"] {
            opacity: 0.8;
            zoom: 0.8;
        }

        [data-shown="false"]:hover{
            opacity: 1;
        }

        [data-shown="false"] .m3u8-item{
            display: none;
        }

    `;

    wrapper.appendChild(style);




    const barBtn = bar.querySelector(".number-indicator");

    // 关于显隐和移动

    (async function () {

        let shown = await GM_getValue("shown", true);
        wrapper.setAttribute("data-shown", shown);


        let x = await GM_getValue("x", 10);
        let y = await GM_getValue("y", 10);

        x = Math.min(innerWidth - 50, x);
        y = Math.min(innerHeight - 50, y);

        if (x < 0) x = 0;
        if (y < 0) y = 0;

        rootDiv.style.top = `${y}px`;
        rootDiv.style.right = `${x}px`;

        barBtn.addEventListener("mousedown", e => {
            let startX = e.pageX;
            let startY = e.pageY;

            let moved = false;

            let mousemove = e => {
                let offsetX = e.pageX - startX;
                let offsetY = e.pageY - startY;
                if (moved || (Math.abs(offsetX) + Math.abs(offsetY)) > 5) {
                    moved = true;
                    rootDiv.style.top = `${y + offsetY}px`;
                    rootDiv.style.right = `${x - offsetX}px`;
                }
            };
            let mouseup = e => {

                let offsetX = e.pageX - startX;
                let offsetY = e.pageY - startY;

                if (moved) {
                    x -= offsetX;
                    y += offsetY;
                    mgmapi.setValue("x", x);
                    mgmapi.setValue("y", y);
                } else {
                    shown = !shown;
                    mgmapi.setValue("shown", shown);
                    wrapper.setAttribute("data-shown", shown);
                }

                removeEventListener("mousemove", mousemove);
                removeEventListener("mouseup", mouseup);
            }
            addEventListener("mousemove", mousemove);
            addEventListener("mouseup", mouseup);
        });

    })();






    let count = 0;
    let shownUrls = [];

    if (window.top !== window.self) {
        showVideo({
            type: "iframe",
            url: new URL(location.href),
            duration: "unknown",
            async download() {
                mgmapi.openInTab(
                    `https://tools.thatwind.com/tool/m3u8downloader#${new URLSearchParams({
                        m3u8: url.href,
                        referer: location.href,
                        filename: (await getTopTitle()) || ""
                    })}`
                );
            }
        });
    }
    function doVideos() {

        for (let v of Array.from(document.querySelectorAll("video"))) {
            if (v.duration && v.src && v.src.startsWith("http") && (!shownUrls.includes(v.src))) {
                const src = v.src;

                shownUrls.push(src);
                showVideo({
                    type: "video",
                    url: new URL(src),
                    duration: `${Math.ceil(v.duration * 10 / 60) / 10} mins`,
                    download() {
                        const details = {
                            url: src,
                            name: (() => {
                                let name = new URL(src).pathname.split("/").slice(-1)[0];
                                if (!/\.\w+$/.test(name)) {
                                    if (name.match(/^\s*$/)) name = Date.now();
                                    name = name + ".mp4";
                                }
                                return name;
                            })(),
                            headers: {
                                // referer: location.origin, // 不允许该头
                                origin: location.origin
                            },
                            onerror(e) {
                                mgmapi.openInTab(src);
                            }
                        };
                        mgmapi.download(details);
                    }
                })
            }
        }
    }

    async function doM3U({ url, content }) {

        url = new URL(url);

        if (shownUrls.includes(url.href)) return;

        // 解析 m3u
        content = content || await (await fetch(url)).text();

        const parser = new m3u8Parser.Parser();
        parser.push(content);
        parser.end();
        const manifest = parser.manifest;

        if (manifest.segments) {
            let duration = 0;
            manifest.segments.forEach((segment) => {
                duration += segment.duration;
            });
            manifest.duration = duration;
        }

        showVideo({
            type: "m3u8",
            url,
            duration: manifest.duration ? `${Math.ceil(manifest.duration * 10 / 60) / 10} mins` : manifest.playlists ? `多(Multi)(${manifest.playlists.length})` : "未知(unknown)",
            async download() {
                mgmapi.openInTab(
                    `https://tools.thatwind.com/tool/m3u8downloader#${new URLSearchParams({
                        m3u8: url.href,
                        referer: location.href,
                        filename: (await getTopTitle()) || ""
                    })}`
                );
            }
        })

    }



    async function showVideo({
        type,
        url,
        duration,
        download
    }) {
        let div = document.createElement("div");
        div.className = "m3u8-item";
        div.innerHTML = `
            <span>${type}</span>
            <a class="copy-link" href="${url.href}" title="${url}" style="
                color: white;
                max-width: 200px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin-left: 10px;
                cursor:pointer;"
            target="_blank" >${url.pathname}</a>
            <span
                style="
                    margin-left: 10px;
                    flex-grow: 1;
                "
            >${duration}</span>
            <span
                class="download-btn"
                style="
                    margin-left: 10px;
                    cursor: pointer;
            ">⯆</span>
        `;

        div.querySelector(".copy-link").addEventListener("click", () => {
            // 复制链接
            mgmapi.copyText(url.href);
            mgmapi.message("已复制链接 (link copied)", 2000);
        });

        div.querySelector(".download-btn").addEventListener("click", download);

        rootDiv.style.display = "block";

        count++;

        shownUrls.push(url.href);

        bar.querySelector(".number-indicator").setAttribute("data-number", count);

        wrapper.appendChild(div);
    }

})();
/*
(function () {
    'use strict';

    const reg = /magnet:\?xt=urn:btih:\w{10,}([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    let l = navigator.language || "en";
    if (l.startsWith("en-")) l = "en";
    else if (l.startsWith("zh-")) l = "zh-CN";
    else l = "en";

    const T = {
        "en": {
            play: "Play"
        },
        "zh-CN": {
            play: '播放'
        }
    }[l];

    whenDOMReady(() => {
        addStyle(`
            button[data-wtmzjk-mag-url]{
                all: initial;
                border: none;
                outline: none;
                background: none;
                background: #f7d308;
                background: #08a6f7;
                margin: 2px 8px;
                border-radius: 3px;
                color: white;
                cursor: pointer;
                display: inline-flex;
                height: 1.6em;
                padding: 0 .8em;
                align-items: center;
                justify-content: center;
                transition: background .15s;
                text-decoration: none;
                border-radius: 0.8em;
                font-size: small;
            }
            button[data-wtmzjk-mag-url]>svg{
                height: 60%;
                fill: white;
                pointer-events: none;
            }
            button[data-wtmzjk-mag-url]:hover{
                background: #fae157;
                background: #39b9f9;
            }
            button[data-wtmzjk-mag-url]:active{
                background: #dfbe07;
                background: #0797df;
            }
            button[data-wtmzjk-mag-url]>span{
                pointer-events: none;
                font-size: small;margin-right: .5em;font-weight:bold;color:white !important;
            }
        `);
        window.addEventListener("click", onEvents, true);
        window.addEventListener("mousedown", onEvents, true);
        window.addEventListener("mouseup", onEvents, true);

        watchBodyChange(work);
    });

    function onEvents(e) {
        if (e.target.hasAttribute('data-wtmzjk-mag-url')) {
            e.preventDefault();
            e.stopPropagation();
            if (e.type == "click") {
                let a = document.createElement('a');
                a.href = 'https://www.diancigaoshou.com/#' + new URLSearchParams({ url: e.target.getAttribute('data-wtmzjk-mag-url') });
                a.target = "_blank";
                a.click();
            }
        }
    }



    function createWatchButton(url, isForPlain = false) {
        let button = document.createElement("button");
        button.setAttribute('data-wtmzjk-mag-url', url);
        if (isForPlain) button.setAttribute('data-wtmzjk-button-for-plain', '');
        button.innerHTML = `<span>${T.play}</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>`;
        return button;
    }

    function hasPlainMagUrlThatNotHandled() {
        let m = document.body.textContent.match(new RegExp(reg, 'g'));
        return document.querySelectorAll(`[data-wtmzjk-button-for-plain]`).length != (m ? m.length : 0);
    }

    function work() {
        if (!document.body) return;
        if (hasPlainMagUrlThatNotHandled()) {
            for (let node of getAllTextNodes(document.body)) {
                if (node.nextSibling && node.nextSibling.hasAttribute && node.nextSibling.hasAttribute('data-wtmzjk-mag-url')) continue;
                let text = node.nodeValue;
                if (!reg.test(text)) continue;
                let match = text.match(reg);
                if (match) {
                    let url = match[0];
                    let p = node.parentNode;
                    p.insertBefore(document.createTextNode(text.slice(0, match.index + url.length)), node);
                    p.insertBefore(createWatchButton(url, true), node);
                    p.insertBefore(document.createTextNode(text.slice(match.index + url.length)), node);
                    p.removeChild(node);
                }
            }
        }
        for (let a of Array.from(document.querySelectorAll(
            ['href', 'value', 'data-clipboard-text', 'data-value', 'title', 'alt', 'data-url', 'data-magnet', 'data-copy'].map(n => `[${n}*="magnet:?xt=urn:btih:"]`).join(',')
        ))) {
            if (a.nextSibling && a.nextSibling.hasAttribute && a.nextSibling.hasAttribute('data-wtmzjk-mag-url')) continue; // 已经添加
            if (reg.test(a.textContent)) continue;
            for (let attr of a.getAttributeNames()) {
                let val = a.getAttribute(attr);
                if (!reg.test(val)) continue;
                let url = val.match(reg)[0];
                a.parentNode.insertBefore(createWatchButton(url), a.nextSibling);
            }
        }
    }


    function watchBodyChange(onchange) {
        let timeout;
        let observer = new MutationObserver(() => {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    onchange();
                }, 200);
            }
        });
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        });

    }

    function getAllTextNodes(parent) {
        var re = [];
        if (["STYLE", "SCRIPT", "BASE", "COMMAND", "LINK", "META", "TITLE", "XTRANS-TXT", "XTRANS-TXT-GROUP", "XTRANS-POPUP"].includes(parent.tagName)) return re;
        for (let node of parent.childNodes) {
            if (node.childNodes.length) re = re.concat(getAllTextNodes(node));
            else if (Text.prototype.isPrototypeOf(node) && (!node.nodeValue.match(/^\s*$/))) re.push(node);
        }
        return re;
    }

    function whenDOMReady(f) {
        if (document.body) f();
        else window.addEventListener("DOMContentLoaded", f);
    }

    function addStyle(s) {
        let style = document.createElement("style");
        style.innerHTML = s;
        document.documentElement.appendChild(style);
    }

})();
*/
