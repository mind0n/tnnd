declare function assertError(msg: any): void;
declare namespace assert {
    function equals(a: any, b: any): void;
    function notequals(a: any, b: any): void;
    function istrue(target: any): void;
    function notfalse(target: any): void;
}
declare module "common" {
    export function log(...args: any[]): void;
    export function copy(target: any, ctx: any): any;
}
declare module "device" {
    export function fire(element: any, eventName: any, opts: any, ...args: any[]): any;
    export class MobileDevice {
        static get Android(): boolean;
        static get BlackBerry(): boolean;
        static get iOS(): boolean;
        static get Opera(): boolean;
        static get Windows(): boolean;
        static get any(): boolean;
    }
    export class Browser {
        static get isOpera(): boolean;
        static get isFirefox(): boolean;
        static get isSafari(): boolean;
        static get isIE(): boolean;
        static get isEdge(): boolean;
        static get isChrome(): boolean;
        static get isBlink(): boolean;
    }
}
interface Array<T> {
    add(it: any): any;
    remove(i: number): any;
    last(n: any, handler?: Function): any;
    clear(): any;
}
interface Object {
    each(handler: Function): any;
    all(handler: Function): any;
}
declare var tests: any;
declare module "test-core" { }
