parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"d6sW":[function(require,module,exports) {
"use strict";var o,e,n,i,t,c,r;Object.defineProperty(exports,"__esModule",{value:!0}),exports.mediaQuery=exports.connection=void 0;var a,s,v,l,d,p,u,g=!(null===(o=navigator)||void 0===o||null===(e=o.connection)||void 0===e||!e.effectiveType),x=!(null===(n=navigator)||void 0===n||null===(i=n.connection)||void 0===i||!i.type),f=!(null===(t=navigator)||void 0===t||null===(c=t.connection)||void 0===c||!c.saveData),w=!(null===(r=navigator)||void 0===r||!r.deviceMemory),y=["slow-2g","2g","3g"];(exports.connection=v,g)&&((a=null===(l=navigator)||void 0===l?void 0:l.connection)&&a.effectiveType.length>0?y.indexOf(a.effectiveType)>=0?exports.connection=v="veryslow":exports.connection=v="fast":exports.connection=v="slow");x&&((a=null===(d=navigator)||void 0===d?void 0:d.connection)&&a.type.length>0?y.indexOf(a.type)>=0?exports.connection=v="veryslow":exports.connection=v="fast":exports.connection=v="slow");f&&((a=null===(p=navigator)||void 0===p?void 0:p.connection).saveData&&(exports.connection=v="veryslow"));w&&(s=null===(u=navigator)||void 0===u?void 0:u.deviceMemory,exports.connection=v=s<1?"slow":"fast");var h=window.matchMedia("(max-width: 950px)").matches;exports.mediaQuery=h,h.matches&&(exports.connection=v="slow"),"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("/service-worker.js").then(function(o){console.log("ServiceWorker registration successful with scope: ",o.scope)},function(o){console.log("ServiceWorker registration failed: ",o)})});
},{"/Applications/MAMP/htdocs/baby-four-tet/service-worker.js":[["service-worker.js","AaGI"],"service-worker.js.map","AaGI"]}]},{},["d6sW"], null)
//# sourceMappingURL=/main.5fa10309.js.map