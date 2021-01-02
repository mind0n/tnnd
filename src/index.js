export * from './prototypes';
export * from './devices';
export * from './events';
export var tests = {};

export function log(){
    var txt = '';
    var args = arguments;
    if (args.length == 1 && typeof(args[0]) == 'function'){
        txt = args[0]();
    }else{
        args.each(function(x, i){
            txt += x + ';';
        });
    }
    let logger = window.$log$;
    if (!logger){
        logger = createLogger();
        window.$log$ = logger;
        logger.id = 'log';
        //document.body.appendChild(logger);
    }
    //logger.innerHTML = txt + '<br/>' + logger.innerHTML;
    var l = document.createElement('div');
    l.className = 'log-entry';
    l.innerHTML = txt;
    logger.insertBefore(l,logger.firstChild);
    console.log(logger.childElementCount);
    if (logger.childElementCount>400){
        logger.removeChild(logger.lastChild);
    }
}
function createLogger(){
    var rlt = document.createElement('div');
    rlt.style.position = 'fixed';
    rlt.style.right = '10px';
    rlt.style.top = '10px';
    rlt.style.bottom = '10px';
    rlt.style.width = '300px';
    rlt.style.border = 'solid 1px silver';
    rlt.style.overflow = 'auto';
    return rlt;
}
function format(n,len){
    var s = n.toString();
    var l = s.length;
    for(var i=l; i<len; i++){
        s = '0' + s;
    }
    return s;
}
export function uid(){
    var d = new Date();
    return 'axxxxxxx_YYYY_MMDD_HHmm_ssxxxxxxxxxx'.replace(/YYYY/g, function(){
        return d.getFullYear();
    })
    .replace(/MM/g, function(){
        var m = d.getMonth() + 1;
        return format(m, 2);
    })
    .replace(/DD/, function(){
        var dat = d.getDate();
        return format(dat, 2);
    })
    .replace(/HH/g, function(){
        var h = d.getHours();
        return format(h, 2);
    })
    .replace(/mm/g, function(){
        var m = d.getMinutes();
        return format(m, 2);
    })
    .replace(/ss/g, function(){
        var s = d.getSeconds();
        return format(s, 2);
    })
    .replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
document.addEventListener('DOMContentLoaded', function(){
    if (!window.$log$){
        let logger = createLogger();
        window.$log$ = logger;
    }
    document.body.appendChild(window.$log$);
    console.log('Page log online');
});
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
    for (var i=this.length - 1; i>=0; i--){
        delete this[i];
    }
    this.length = 0;
    return this;
};
Array.prototype.last = function(n, handler, undef){
    if (handler){
        if (n === undef){
            return handler(this[this.length - 1]);
        }
        for(var i=this.length - 1; i>=this.length - n; i--){
            var it = this[i];
            if (i>=0 && it && !handler(it)){
                return false;
            }
        }
        return true;
    }else{
        var t = typeof(n);
        if (t != 'function'){
            if (n === undef){
                return this[this.length - 1];
            }
            if (n>this.length){
                return this[0];
            }
            var rlt = [];
            for(var i=this.length - 1; i>=0; i--){
                rlt.add(this[i]);
            }
            return rlt;
        }
        for(var i=this.length - 1; i>=0; i--){
            var it = this[i];
            if (it && n(it)){
                return [this[i], i];
            }
        }
        return [];
    }    
}

Object.prototype.each = function(handler){
    if (handler != null){
        var t = typeof(handler);
        if (t == 'function'){
            var target = this;
            if (target instanceof Array 
                || target instanceof TouchList 
                || target instanceof NodeList){
                for (var i = 0; i<target.length; i++){
                    if (handler(target[i], i)){
                        return target[i];
                    }
                }
            }else{
                t = typeof(target);
                if (t == 'object'){
                    for(var i in target){
                        t = typeof(target[i]);
                        if (t != 'function'){
                            if (handler(target[i], i)){
                                return target[i];
                            }
                        }
                    }
                }
            }
        }
    }
}
Object.prototype.all = function(handler){
    var rlt = true;
    this.each(function(p, i){
        if (!handler(p)){
            rlt = false;
            return true;
        }
    });
    return rlt;
}
export function copy(target, ctx) {
    var root = false;
    if (!ctx){
        ctx = [];
        root = true;
    }
    if (target.__copied__){
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
    if (root){
        ctx.each(function(it, i){
            delete it.__copied__;
        });
        ctx = null;
    }
    return r;
}
export function select(target, handler){
    if (handler){
        var t = typeof(target);
        if (t == 'string'){
            var rlt = document.querySelectorAll(target);
            rlt.each(handler);
        }
    }
}
