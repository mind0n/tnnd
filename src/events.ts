export function trigger(element:any, eventName:string, opts?:any) {
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
		var evt = (<any>document).createEventObject();
		if (eventType == 'customEvents'){
			oEvent = extend(evt, opts);
		}else{
			oEvent = extend(evt, options);
		}
		element.fireEvent('on' + eventName, oEvent);
	}
	return element;
}