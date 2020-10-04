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

export function trigger(element, eventName, opts) {
	function extend(destination, source) {
		for (var property in source)
			destination[property] = source[property];
		return destination;
	}

	let eventMatchers = {
		'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
		'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
	}

	let defaultOptions = {
		pointerX: 100,
		pointerY: 100,
		button: 0,
		ctrlKey: false,
		altKey: false,
		shiftKey: false,
		metaKey: false,
		bubbles: true,
		cancelable: true
	}
	opts = opts || {};
	if (opts && opts.pos) {
		defaultOptions.pointerX = opts.pos[0];
		defaultOptions.pointerY = opts.pos[1];
	}
	let options = extend(defaultOptions, arguments[3] || {});
	let oEvent, eventType = null;

	for (let name in eventMatchers) {
		if (eventMatchers[name].test && eventMatchers[name].test(eventName)) { eventType = name; break; }
	}

	if (!eventType){
		//throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');
		eventType = "customEvents";
	}

	if (document.createEvent) {
		if (eventType == 'HTMLEvents') {
			oEvent = document.createEvent(eventType);
			oEvent.initEvent(eventName, options.bubbles, options.cancelable);
		}
		else if (eventType == 'MouseEvents'){
			oEvent = document.createEvent(eventType);
			oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
			options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
			options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
		}
		else{
			//oEvent.initEvent(eventName, options.bubbles, options.cancelable);
			opts.detail = opts.detail || {
				message: eventName
			};
			if (!opts.detail.time){
				opts.detail.time = new Date();
			}
			if (opts.bubbles === undefined){
				opts.bubbles = true;
			}
			if (opts.cancelable === undefined){
				opts.cancelable = true;
			}
			oEvent = new CustomEvent(eventName, opts);
		}
		element.dispatchEvent(oEvent);
	}
	else {
		options.clientX = options.pointerX;
		options.clientY = options.pointerY;
		var evt = (document).createEventObject();
		if (eventType == 'customEvents'){
			oEvent = extend(evt, opts);
		}else{
			oEvent = extend(evt, options);
		}
		element.fireEvent('on' + eventName, oEvent);
	}
	return element;
}