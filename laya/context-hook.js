!function() {
    var n = {}, o = function(o, t, e) {
        var r = t + "#" + e;
        return n[r] = 0, function() {
            var t = o.apply(this, arguments);
            return n[r] = n[r] + 1, t;
        };
    }, t = function(n, t, e) {
        var r = t[e];
        t[e] = o(r, n, e);
    }, e = function(n) {
        var o = n.name, e = n.prototype;
        Object.getOwnPropertyNames(e);
        for (var r in e) {
            var c;
            try {
                c = e[r];
            } catch (a) {}
            "function" == typeof c && t(o, e, r);
        }
    }, r = function() {
        e(CanvasRenderingContext2D), e(WebGLRenderingContext);
    };
    printCounter = function() {
        console.log(n);
    }, r(), console.log(n), console.log("[ContextHook] Hook 已完成");
}();