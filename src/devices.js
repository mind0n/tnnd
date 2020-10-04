export function isAndroid () {
    var r = navigator.userAgent.match(/Android/i);
    if (r) {
        console.log('match Android');
    }
    return r!= null && r.length>0;
}
export function isBlackBerry() {
    var r = navigator.userAgent.match(/BlackBerry/i);
    if (r) {
        console.log('match BlackBerry');
    }
    return r!=null && r.length > 0;
}
export function isIos() {
    var r = navigator.userAgent.match(/iPhone|iPad|iPod/i);
    if (r) {
        console.log('match iOS');
    }
    return r != null && r.length > 0;
}
export function isOperaMini() {
    var r = navigator.userAgent.match(/Opera Mini/i);
    if (r) {
        console.log('match Opera Mini');
    }
    return r != null && r.length > 0;
}
export function isIeMobile() {
    var r = navigator.userAgent.match(/IEMobile/i);
    if (r) {
        console.log('match IEMobile');
    }
    return r!= null && r.length >0;
}
export function isAny() {
    return (isAndroid() || isBlackBerry() || isIos() || isOperaMini() || isIeMobile());
}

let w = window;
let d = document;
// Opera 8.0+
export function isOpera(){
    return (!!w.opr && !!w.opr.addons) || !!w.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
}

// Firefox 1.0+
export function isFirefox(){
    return typeof w.InstallTrigger !== 'undefined';
}
// At least Safari 3+: "[object HTMLElementConstructor]"
export function isSafari(){
    return Object.prototype.toString.call(HTMLElement).indexOf('Constructor') > 0;
} 
// Internet Explorer 6-11
export function isIE(){
    return /*@cc_on!@*/false || !!d.documentMode;
}
// Edge 20+
export function isEdge(){
    return !Browser.isIE && !!w.StyleMedia;
}
// Chrome 1+
export function isChrome(){
    return !!w.chrome && !!w.chrome.webstore;
}
// Blink engine detection
export function isBlink(){
    return (Browser.isChrome || Browser.isOpera) && !!w.CSS;
}

