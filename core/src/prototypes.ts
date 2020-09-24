interface Array<T>{
    add(it:any);
    remove(i:number);
    last(n:any, handler?:Function):any;
    clear();
}
interface Object{
    each(handler:Function);
    all(handler:Function);
}
var tests:any = {};