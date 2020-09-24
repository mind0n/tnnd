function assertError(msg){
    debugger;
    //console.error(msg);
    throw new Error(msg);
}
var assert = {
    equals:function(a, b){
        if (a != b){
            assertError("Expected " + b + " actual " + a);
        }
    }
    ,notequals:function(a, b){
        if (a == b){
            assertError("Expected not same as " + a);
        }
    }
    ,istrue:function(target){
        if (target !== true){
            assertError("Expected true actual false");
        }
    },notfalse: function(target){
        if (target != null && target != undefined && target != false && target != 0){
            return;
        }
        assertError("Expected not null, undefined, false, 0 actual " + target);
    }
};