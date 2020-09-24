import { CLIENT_RENEG_WINDOW } from "tls";

import {copy} from "common";
tests.test_core = function() {
    var a = <any>[1, 2, 3, 4, [5, 6, 7, 8, 9, 10]];
    a.test = function () {
        console.log("test success");
        return true;
    };
    var b = copy(a);
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
    var c = copy(b);
    console.log(c);
    assert.istrue(c.test());
    assert.equals(c[3][4][0],1);
};
function run(){
    var process = this.process;
    if (process && process.argv && process.argv.length && process.argv.length>2){
        var fname = process.argv[2];
        if (fname){
            var f = tests[fname];
            if (f && typeof(f) == 'function'){
                f();
            }
        }
    }
}

