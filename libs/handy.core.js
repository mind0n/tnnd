function assertError(msg) {
    debugger;
    //console.error(msg);
    throw new Error(msg);
}
var assert = {
    equals: function (a, b) {
        if (a != b) {
            assertError("Expected " + b + " actual " + a);
        }
    },
    notequals: function (a, b) {
        if (a == b) {
            assertError("Expected not same as " + a);
        }
    },
    istrue: function (target) {
        if (target !== true) {
            assertError("Expected true actual false");
        }
    }, notfalse: function (target) {
        if (target != null && target != undefined && target != false && target != 0) {
            return;
        }
        assertError("Expected not null, undefined, false, 0 actual " + target);
    }
};
define("common", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Array.prototype.add = function (it) {
        this[this.length] = it;
    };
    Array.prototype.remove = function (i) {
        if (i >= 0 && i < this.length) {
            this.splice(i, 1);
        }
        return this;
    };
    Array.prototype.clear = function () {
        for (var i = this.length - 1; i >= 0; i--) {
            delete this[i];
        }
        this.length = 0;
        return this;
    };
    Array.prototype.last = function (n, handler, undef) {
        if (handler) {
            if (n === undef) {
                return handler(this[this.length - 1]);
            }
            for (var i = this.length - 1; i >= this.length - n; i--) {
                var it = this[i];
                if (i >= 0 && it && !handler(it)) {
                    return false;
                }
            }
            return true;
        }
        else {
            var t = typeof (n);
            if (t != 'function') {
                if (n === undef) {
                    return this[this.length - 1];
                }
                if (n > this.length) {
                    return this[0];
                }
                var rlt = [];
                for (var i = this.length - 1; i >= 0; i--) {
                    rlt.add(this[i]);
                }
                return rlt;
            }
            for (var i = this.length - 1; i >= 0; i--) {
                var it = this[i];
                if (it && n(it)) {
                    return [this[i], i];
                }
            }
            return [];
        }
    };
    Object.prototype.each = function (handler) {
        if (handler != null) {
            var t = typeof (handler);
            if (t == 'function') {
                var target = this;
                if (target instanceof Array) {
                    for (var i = 0; i < target.length; i++) {
                        if (handler(target[i], i)) {
                            return target[i];
                        }
                    }
                }
                else {
                    t = typeof (target);
                    if (t == 'object') {
                        for (var i in target) {
                            t = typeof (target[i]);
                            if (t != 'function') {
                                if (handler(target[i], i)) {
                                    return target[i];
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Object.prototype.all = function (handler) {
        var rlt = true;
        this.each(function (p, i) {
            if (!handler(p)) {
                rlt = false;
                return true;
            }
        });
        return rlt;
    };
    function log() {
        var txt = '';
        if (arguments.length == 1 && typeof (arguments[0]) == 'function') {
            txt = arguments[0]();
        }
        else {
            arguments.each(function (x, i) {
                txt += x + ';';
            });
        }
        var logger = document.body.$log$;
        if (!logger) {
            logger = document.createElement('div');
            document.body.$log$ = logger;
            logger.id = 'log';
            document.body.appendChild(logger);
        }
        //logger.innerHTML = txt + '<br/>' + logger.innerHTML;
        var l = document.createElement('div');
        l.className = 'log-entry';
        l.innerHTML = txt;
        logger.insertBefore(l, logger.firstChild);
        console.log(logger.childElementCount);
        if (logger.childElementCount > 400) {
            logger.removeChild(logger.lastChild);
        }
    }
    exports.log = log;
    function copy(target, ctx) {
        var root = false;
        if (!ctx) {
            ctx = [];
            root = true;
        }
        if (target.__copied__) {
            return target;
        }
        ctx.add(target);
        target.__copied__ = true;
        var t = typeof (target);
        if (t == 'number' || t == 'string' || t == "boolean" || t == "function") {
            return target;
        }
        var r = {};
        if (target instanceof Array) {
            r = [];
            for (var i = 0; i < target.length; i++) {
                var it = target[i];
                r[i] = copy(it, ctx);
            }
        }
        for (var j in target) {
            var flag = false;
            for (var p in target.__proto__) {
                if (j == p) {
                    flag = true;
                }
            }
            if (!flag && j != "__copied__" && (!(target instanceof Array) || isNaN(parseInt(j)))) {
                var it = target[j];
                r[j] = copy(it, ctx);
            }
        }
        if (root) {
            ctx.each(function (it, i) {
                delete it.__copied__;
            });
            ctx = null;
        }
        return r;
    }
    exports.copy = copy;
});
define("device", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MobileDevice = /** @class */ (function () {
        function MobileDevice() {
        }
        Object.defineProperty(MobileDevice, "Android", {
            get: function () {
                var r = navigator.userAgent.match(/Android/i);
                if (r) {
                    console.log('match Android');
                }
                return r != null && r.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MobileDevice, "BlackBerry", {
            get: function () {
                var r = navigator.userAgent.match(/BlackBerry/i);
                if (r) {
                    console.log('match Android');
                }
                return r != null && r.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MobileDevice, "iOS", {
            get: function () {
                var r = navigator.userAgent.match(/iPhone|iPad|iPod/i);
                if (r) {
                    console.log('match Android');
                }
                return r != null && r.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MobileDevice, "Opera", {
            get: function () {
                var r = navigator.userAgent.match(/Opera Mini/i);
                if (r) {
                    console.log('match Android');
                }
                return r != null && r.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MobileDevice, "Windows", {
            get: function () {
                var r = navigator.userAgent.match(/IEMobile/i);
                if (r) {
                    console.log('match Android');
                }
                return r != null && r.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MobileDevice, "any", {
            get: function () {
                return (MobileDevice.Android || MobileDevice.BlackBerry || MobileDevice.iOS || MobileDevice.Opera || MobileDevice.Windows);
            },
            enumerable: true,
            configurable: true
        });
        return MobileDevice;
    }());
    exports.MobileDevice = MobileDevice;
    var w = window;
    var d = document;
    var Browser = /** @class */ (function () {
        function Browser() {
        }
        Object.defineProperty(Browser, "isOpera", {
            // Opera 8.0+
            get: function () {
                return (!!w.opr && !!w.opr.addons) || !!w.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isFirefox", {
            // Firefox 1.0+
            get: function () {
                return typeof w.InstallTrigger !== 'undefined';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isSafari", {
            // At least Safari 3+: "[object HTMLElementConstructor]"
            get: function () {
                return Object.prototype.toString.call(HTMLElement).indexOf('Constructor') > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isIE", {
            // Internet Explorer 6-11
            get: function () {
                return /*@cc_on!@*/ false || !!d.documentMode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isEdge", {
            // Edge 20+
            get: function () {
                return !Browser.isIE && !!w.StyleMedia;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isChrome", {
            // Chrome 1+
            get: function () {
                return !!w.chrome && !!w.chrome.webstore;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Browser, "isBlink", {
            // Blink engine detection
            get: function () {
                return (Browser.isChrome || Browser.isOpera) && !!w.CSS;
            },
            enumerable: true,
            configurable: true
        });
        return Browser;
    }());
    exports.Browser = Browser;
    function fire(element, eventName, opts) {
        function extend(destination, source) {
            for (var property in source)
                destination[property] = source[property];
            return destination;
        }
        var eventMatchers = {
            'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
            'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
        };
        var defaultOptions = {
            pointerX: 100,
            pointerY: 100,
            button: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            bubbles: true,
            cancelable: true
        };
        opts = opts || {};
        if (opts && opts.pos) {
            defaultOptions.pointerX = opts.pos[0];
            defaultOptions.pointerY = opts.pos[1];
        }
        var options = extend(defaultOptions, arguments[3] || {});
        var oEvent, eventType = null;
        for (var name_1 in eventMatchers) {
            if (eventMatchers[name_1].test && eventMatchers[name_1].test(eventName)) {
                eventType = name_1;
                break;
            }
        }
        if (!eventType) {
            //throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');
            eventType = "customEvents";
        }
        if (document.createEvent) {
            if (eventType == 'HTMLEvents') {
                oEvent = document.createEvent(eventType);
                oEvent.initEvent(eventName, options.bubbles, options.cancelable);
            }
            else if (eventType == 'MouseEvents') {
                oEvent = document.createEvent(eventType);
                oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView, options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
            }
            else {
                //oEvent.initEvent(eventName, options.bubbles, options.cancelable);
                opts.detail = opts.detail || {
                    message: eventName
                };
                if (!opts.detail.time) {
                    opts.detail.time = new Date();
                }
                if (opts.bubbles === undefined) {
                    opts.bubbles = true;
                }
                if (opts.cancelable === undefined) {
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
            if (eventType == 'customEvents') {
                oEvent = extend(evt, opts);
            }
            else {
                oEvent = extend(evt, options);
            }
            element.fireEvent('on' + eventName, oEvent);
        }
        return element;
    }
    exports.fire = fire;
});
var tests = {};
define("test-core", ["require", "exports", "common"], function (require, exports, common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    tests.test_core = function () {
        var a = [1, 2, 3, 4, [5, 6, 7, 8, 9, 10]];
        a.test = function () {
            console.log("test success");
            return true;
        };
        var b = common_1.copy(a);
        b[4][0] = 100;
        assert.equals(b[4][0], 100);
        assert.notequals(a[4][0], 100);
        console.log(a);
        console.log(b.remove(1));
        assert.equals(a.length, 5);
        assert.equals(b.length, 4);
        assert.istrue(b.test());
        b[3] = a;
        a[4] = b;
        var c = common_1.copy(b);
        console.log(c);
        assert.istrue(c.test());
        assert.equals(c[3][4][0], 1);
    };
    function run() {
        var process = this.process;
        if (process && process.argv && process.argv.length && process.argv.length > 2) {
            var fname = process.argv[2];
            if (fname) {
                var f = tests[fname];
                if (f && typeof (f) == 'function') {
                    f();
                }
            }
        }
    }
});
//# sourceMappingURL=handy.core.js.map