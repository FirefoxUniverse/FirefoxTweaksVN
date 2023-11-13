// ==UserScript==
// @name        TextZoomAuto
// @namespace   TextZoomAuto
// @match       *://*/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @version     1.1
// @author      -
// @description 10/4/2023, 5:07:06 PM
// ==/UserScript==

var defaultvalue = 20;
var name = 'TextZoomAuto';
var prefix = "autoinject" + name;
var value = GM_getValue("value" + name + document.domain, defaultvalue);
console.log(value);
var injectedStatus = false;
var hostarray = [];

function inject() {
    //if (window.self !== window.top) return; // Not in frames
    if (injectedStatus !== false) return; // Not if already injected
    GM_addStyle('* {font-size:' + value + 'px!important;}');
    injectedStatus = true;
}

function addHost() {
    hostarray.push(location.hostname);
    GM_setValue(prefix, JSON.stringify(hostarray));
    if (injectedStatus == false) inject;
}

function set() {
    var val = window.prompt("Enter " + name + document.domain + " value", defaultvalue);
    val = parseInt(val);
    if (val == undefined) {
        return false;
    }
    GM_setValue("value" + name + document.domain, val);
}

function plus() {
    var value = GM_getValue("value" + name + document.domain, defaultvalue);
    GM_setValue("value" + name + document.domain, value + 1);
}

function minus() {
    var value = GM_getValue("value" + name + document.domain, defaultvalue);
    GM_setValue("value" + name + document.domain, value - 1);
}

function removeHost() {
    var index = hostarray.indexOf(location.hostname);
    if (index > -1) {
        hostarray.splice(index, 1);
        GM_setValue(prefix, JSON.stringify(hostarray));
    }
}
// This should work in Violentmonkey and Tampermonkey, but unfortunately not Greasemonkey.
try {
    hostarray = JSON.parse(GM_getValue(prefix, "[]"));
    if (typeof (value) == 'number') {
        GM_registerMenuCommand("+", plus);
        GM_registerMenuCommand("-", minus);
    }
    GM_registerMenuCommand("Set " + name, set);
    if (hostarray.includes(location.hostname)) {
        inject();
        injectedStatus = true;
        GM_registerMenuCommand("Stop Auto-Injecting " + name, removeHost);
    } else {
        GM_registerMenuCommand("Inject " + name, inject);
        GM_registerMenuCommand("Auto-Inject on " + location.hostname, addHost);
    }
} catch (err) {
    console.log("Error adding Inject menu items: " + name);
    console.log(err);
}
