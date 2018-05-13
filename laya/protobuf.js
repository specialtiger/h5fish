!function(e, t) {
    (e.dcodeIO = e.dcodeIO || {}).ProtoBuf = t(e.dcodeIO.ByteBuffer);
}(this, function(e, t) {
    "use strict";
    var i = {};
    return i.ByteBuffer = e, i.Long = e.Long || null, i.VERSION = "5.0.1", i.WIRE_TYPES = {}, 
    i.WIRE_TYPES.VARINT = 0, i.WIRE_TYPES.BITS64 = 1, i.WIRE_TYPES.LDELIM = 2, i.WIRE_TYPES.STARTGROUP = 3, 
    i.WIRE_TYPES.ENDGROUP = 4, i.WIRE_TYPES.BITS32 = 5, i.PACKABLE_WIRE_TYPES = [ i.WIRE_TYPES.VARINT, i.WIRE_TYPES.BITS64, i.WIRE_TYPES.BITS32 ], 
    i.TYPES = {
        int32: {
            name: "int32",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        uint32: {
            name: "uint32",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        sint32: {
            name: "sint32",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        int64: {
            name: "int64",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: i.Long ? i.Long.ZERO : void 0
        },
        uint64: {
            name: "uint64",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: i.Long ? i.Long.UZERO : void 0
        },
        sint64: {
            name: "sint64",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: i.Long ? i.Long.ZERO : void 0
        },
        bool: {
            name: "bool",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: !1
        },
        double: {
            name: "double",
            wireType: i.WIRE_TYPES.BITS64,
            defaultValue: 0
        },
        string: {
            name: "string",
            wireType: i.WIRE_TYPES.LDELIM,
            defaultValue: ""
        },
        bytes: {
            name: "bytes",
            wireType: i.WIRE_TYPES.LDELIM,
            defaultValue: null
        },
        fixed32: {
            name: "fixed32",
            wireType: i.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        sfixed32: {
            name: "sfixed32",
            wireType: i.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        fixed64: {
            name: "fixed64",
            wireType: i.WIRE_TYPES.BITS64,
            defaultValue: i.Long ? i.Long.UZERO : void 0
        },
        sfixed64: {
            name: "sfixed64",
            wireType: i.WIRE_TYPES.BITS64,
            defaultValue: i.Long ? i.Long.ZERO : void 0
        },
        float: {
            name: "float",
            wireType: i.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        enum: {
            name: "enum",
            wireType: i.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        message: {
            name: "message",
            wireType: i.WIRE_TYPES.LDELIM,
            defaultValue: null
        },
        group: {
            name: "group",
            wireType: i.WIRE_TYPES.STARTGROUP,
            defaultValue: null
        }
    }, i.MAP_KEY_TYPES = [ i.TYPES.int32, i.TYPES.sint32, i.TYPES.sfixed32, i.TYPES.uint32, i.TYPES.fixed32, i.TYPES.int64, i.TYPES.sint64, i.TYPES.sfixed64, i.TYPES.uint64, i.TYPES.fixed64, i.TYPES.bool, i.TYPES.string, i.TYPES.bytes ], 
    i.ID_MIN = 1, i.ID_MAX = 536870911, i.convertFieldsToCamelCase = !1, i.populateAccessors = !0, 
    i.populateDefaults = !0, i.Util = function() {
        var e = {};
        return e.IS_NODE = !("object" != typeof process || process + "" != "[object process]" || process.browser), 
        e.XHR = function() {
            for (var e = [ function() {
                return new XMLHttpRequest();
            }, function() {
                return new ActiveXObject("Msxml2.XMLHTTP");
            }, function() {
                return new ActiveXObject("Msxml3.XMLHTTP");
            }, function() {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } ], t = null, i = 0; i < e.length; i++) {
                try {
                    t = e[i]();
                } catch (r) {
                    continue;
                }
                break;
            }
            if (!t) throw Error("XMLHttpRequest is not supported");
            return t;
        }, e.fetch = function(t, i) {
            if (i && "function" != typeof i && (i = null), e.IS_NODE) {
                var r = require("fs");
                if (i) r.readFile(t, function(e, t) {
                    i(e ? null : "" + t);
                }); else try {
                    return r.readFileSync(t);
                } catch (n) {
                    return null;
                }
            } else {
                var s = e.XHR();
                if (s.open("GET", t, !!i), s.setRequestHeader("Accept", "text/plain"), "function" == typeof s.overrideMimeType && s.overrideMimeType("text/plain"), 
                !i) return s.send(null), 200 == s.status || 0 == s.status && "string" == typeof s.responseText ? s.responseText : null;
                if (s.onreadystatechange = function() {
                    4 == s.readyState && i(200 == s.status || 0 == s.status && "string" == typeof s.responseText ? s.responseText : null);
                }, 4 == s.readyState) return;
                s.send(null);
            }
        }, e.toCamelCase = function(e) {
            return e.replace(/_([a-zA-Z])/g, function(e, t) {
                return t.toUpperCase();
            });
        }, e;
    }(), i.Lang = {
        DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,
        RULE: /^(?:required|optional|repeated|map)$/,
        TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
        NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
        TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
        TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
        FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
        NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
        NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
        NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
        NUMBER_OCT: /^0[0-7]+$/,
        NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
        BOOL: /^(?:true|false)$/i,
        ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
        NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
        WHITESPACE: /\s/,
        STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
        STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
        STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
    }, i.DotProto = function(e, t) {
        function i(e, i) {
            var r = -1, n = 1;
            if ("-" == e.charAt(0) && (n = -1, e = e.substring(1)), t.NUMBER_DEC.test(e)) r = parseInt(e); else if (t.NUMBER_HEX.test(e)) r = parseInt(e.substring(2), 16); else {
                if (!t.NUMBER_OCT.test(e)) throw Error("illegal id value: " + (0 > n ? "-" : "") + e);
                r = parseInt(e.substring(1), 8);
            }
            if (r = n * r | 0, !i && 0 > r) throw Error("illegal id value: " + (0 > n ? "-" : "") + e);
            return r;
        }
        function r(e) {
            var i = 1;
            if ("-" == e.charAt(0) && (i = -1, e = e.substring(1)), t.NUMBER_DEC.test(e)) return i * parseInt(e, 10);
            if (t.NUMBER_HEX.test(e)) return i * parseInt(e.substring(2), 16);
            if (t.NUMBER_OCT.test(e)) return i * parseInt(e.substring(1), 8);
            if ("inf" === e) return i * (1 / 0);
            if ("nan" === e) return NaN;
            if (t.NUMBER_FLT.test(e)) return i * parseFloat(e);
            throw Error("illegal number value: " + (0 > i ? "-" : "") + e);
        }
        function n(e, t, i) {
            "undefined" == typeof e[t] ? e[t] = i : (Array.isArray(e[t]) || (e[t] = [ e[t] ]), 
            e[t].push(i));
        }
        var s = {}, o = function(e) {
            this.source = e + "", this.index = 0, this.line = 1, this.stack = [], this._stringOpen = null;
        }, a = o.prototype;
        a._readString = function() {
            var e = '"' === this._stringOpen ? t.STRING_DQ : t.STRING_SQ;
            e.lastIndex = this.index - 1;
            var i = e.exec(this.source);
            if (!i) throw Error("unterminated string");
            return this.index = e.lastIndex, this.stack.push(this._stringOpen), this._stringOpen = null, 
            i[1];
        }, a.next = function() {
            if (this.stack.length > 0) return this.stack.shift();
            if (this.index >= this.source.length) return null;
            if (null !== this._stringOpen) return this._readString();
            var e, i, r;
            do {
                for (e = !1; t.WHITESPACE.test(r = this.source.charAt(this.index)); ) if ("\n" === r && ++this.line, 
                ++this.index === this.source.length) return null;
                if ("/" === this.source.charAt(this.index)) if (++this.index, "/" === this.source.charAt(this.index)) {
                    for (;"\n" !== this.source.charAt(++this.index); ) if (this.index == this.source.length) return null;
                    ++this.index, ++this.line, e = !0;
                } else {
                    if ("*" !== (r = this.source.charAt(this.index))) return "/";
                    do {
                        if ("\n" === r && ++this.line, ++this.index === this.source.length) return null;
                        i = r, r = this.source.charAt(this.index);
                    } while ("*" !== i || "/" !== r);
                    ++this.index, e = !0;
                }
            } while (e);
            if (this.index === this.source.length) return null;
            var n = this.index;
            t.DELIM.lastIndex = 0;
            var s = t.DELIM.test(this.source.charAt(n++));
            if (!s) for (;n < this.source.length && !t.DELIM.test(this.source.charAt(n)); ) ++n;
            var o = this.source.substring(this.index, this.index = n);
            return '"' !== o && "'" !== o || (this._stringOpen = o), o;
        }, a.peek = function() {
            if (0 === this.stack.length) {
                var e = this.next();
                if (null === e) return null;
                this.stack.push(e);
            }
            return this.stack[0];
        }, a.skip = function(e) {
            var t = this.next();
            if (t !== e) throw Error("illegal '" + t + "', '" + e + "' expected");
        }, a.omit = function(e) {
            return this.peek() === e ? (this.next(), !0) : !1;
        }, a.toString = function() {
            return "Tokenizer (" + this.index + "/" + this.source.length + " at line " + this.line + ")";
        }, s.Tokenizer = o;
        var l = function(e) {
            this.tn = new o(e), this.proto3 = !1;
        }, u = l.prototype;
        return u.parse = function() {
            var e, i, r = {
                name: "[ROOT]",
                package: null,
                messages: [],
                enums: [],
                imports: [],
                options: {},
                services: []
            }, n = !0;
            try {
                for (;e = this.tn.next(); ) switch (e) {
                  case "package":
                    if (!n || null !== r["package"]) throw Error("unexpected 'package'");
                    if (e = this.tn.next(), !t.TYPEREF.test(e)) throw Error("illegal package name: " + e);
                    this.tn.skip(";"), r["package"] = e;
                    break;

                  case "import":
                    if (!n) throw Error("unexpected 'import'");
                    e = this.tn.peek(), ("public" === e || (i = "weak" === e)) && this.tn.next(), e = this._readString(), 
                    this.tn.skip(";"), i || r.imports.push(e);
                    break;

                  case "syntax":
                    if (!n) throw Error("unexpected 'syntax'");
                    this.tn.skip("="), "proto3" === (r.syntax = this._readString()) && (this.proto3 = !0), 
                    this.tn.skip(";");
                    break;

                  case "message":
                    this._parseMessage(r, null), n = !1;
                    break;

                  case "enum":
                    this._parseEnum(r), n = !1;
                    break;

                  case "option":
                    this._parseOption(r);
                    break;

                  case "service":
                    this._parseService(r);
                    break;

                  case "extend":
                    this._parseExtend(r);
                    break;

                  default:
                    throw Error("unexpected '" + e + "'");
                }
            } catch (s) {
                throw s.message = "Parse error at line " + this.tn.line + ": " + s.message, s;
            }
            return delete r.name, r;
        }, l.parse = function(e) {
            return new l(e).parse();
        }, u._readString = function() {
            var e, t, i = "";
            do {
                if (t = this.tn.next(), "'" !== t && '"' !== t) throw Error("illegal string delimiter: " + t);
                i += this.tn.next(), this.tn.skip(t), e = this.tn.peek();
            } while ('"' === e || '"' === e);
            return i;
        }, u._readValue = function(e) {
            var i = this.tn.peek();
            if ('"' === i || "'" === i) return this._readString();
            if (this.tn.next(), t.NUMBER.test(i)) return r(i);
            if (t.BOOL.test(i)) return "true" === i.toLowerCase();
            if (e && t.TYPEREF.test(i)) return i;
            throw Error("illegal value: " + i);
        }, u._parseOption = function(e, i) {
            var r = this.tn.next(), n = !1;
            if ("(" === r && (n = !0, r = this.tn.next()), !t.TYPEREF.test(r)) throw Error("illegal option name: " + r);
            var s = r;
            n && (this.tn.skip(")"), s = "(" + s + ")", r = this.tn.peek(), t.FQTYPEREF.test(r) && (s += r, 
            this.tn.next())), this.tn.skip("="), this._parseOptionValue(e, s), i || this.tn.skip(";");
        }, u._parseOptionValue = function(e, i) {
            var r = this.tn.peek();
            if ("{" !== r) n(e.options, i, this._readValue(!0)); else for (this.tn.skip("{"); "}" !== (r = this.tn.next()); ) {
                if (!t.NAME.test(r)) throw Error("illegal option name: " + i + "." + r);
                this.tn.omit(":") ? n(e.options, i + "." + r, this._readValue(!0)) : this._parseOptionValue(e, i + "." + r);
            }
        }, u._parseService = function(e) {
            var i = this.tn.next();
            if (!t.NAME.test(i)) throw Error("illegal service name at line " + this.tn.line + ": " + i);
            var r = i, n = {
                name: r,
                rpc: {},
                options: {}
            };
            for (this.tn.skip("{"); "}" !== (i = this.tn.next()); ) if ("option" === i) this._parseOption(n); else {
                if ("rpc" !== i) throw Error("illegal service token: " + i);
                this._parseServiceRPC(n);
            }
            this.tn.omit(";"), e.services.push(n);
        }, u._parseServiceRPC = function(e) {
            var i = "rpc", r = this.tn.next();
            if (!t.NAME.test(r)) throw Error("illegal rpc service method name: " + r);
            var n = r, s = {
                request: null,
                response: null,
                request_stream: !1,
                response_stream: !1,
                options: {}
            };
            if (this.tn.skip("("), r = this.tn.next(), "stream" === r.toLowerCase() && (s.request_stream = !0, 
            r = this.tn.next()), !t.TYPEREF.test(r)) throw Error("illegal rpc service request type: " + r);
            if (s.request = r, this.tn.skip(")"), r = this.tn.next(), "returns" !== r.toLowerCase()) throw Error("illegal rpc service request type delimiter: " + r);
            if (this.tn.skip("("), r = this.tn.next(), "stream" === r.toLowerCase() && (s.response_stream = !0, 
            r = this.tn.next()), s.response = r, this.tn.skip(")"), r = this.tn.peek(), "{" === r) {
                for (this.tn.next(); "}" !== (r = this.tn.next()); ) {
                    if ("option" !== r) throw Error("illegal rpc service token: " + r);
                    this._parseOption(s);
                }
                this.tn.omit(";");
            } else this.tn.skip(";");
            "undefined" == typeof e[i] && (e[i] = {}), e[i][n] = s;
        }, u._parseMessage = function(e, r) {
            var n = !!r, s = this.tn.next(), o = {
                name: "",
                fields: [],
                enums: [],
                messages: [],
                options: {},
                services: [],
                oneofs: {}
            };
            if (!t.NAME.test(s)) throw Error("illegal " + (n ? "group" : "message") + " name: " + s);
            for (o.name = s, n && (this.tn.skip("="), r.id = i(this.tn.next()), o.isGroup = !0), 
            s = this.tn.peek(), "[" === s && r && this._parseFieldOptions(r), this.tn.skip("{"); "}" !== (s = this.tn.next()); ) if (t.RULE.test(s)) this._parseMessageField(o, s); else if ("oneof" === s) this._parseMessageOneOf(o); else if ("enum" === s) this._parseEnum(o); else if ("message" === s) this._parseMessage(o); else if ("option" === s) this._parseOption(o); else if ("service" === s) this._parseService(o); else if ("extensions" === s) o.hasOwnProperty("extensions") ? o.extensions = o.extensions.concat(this._parseExtensionRanges()) : o.extensions = this._parseExtensionRanges(); else if ("reserved" === s) this._parseIgnored(); else if ("extend" === s) this._parseExtend(o); else {
                if (!t.TYPEREF.test(s)) throw Error("illegal message token: " + s);
                if (!this.proto3) throw Error("illegal field rule: " + s);
                this._parseMessageField(o, "optional", s);
            }
            return this.tn.omit(";"), e.messages.push(o), o;
        }, u._parseIgnored = function() {
            for (;";" !== this.tn.peek(); ) this.tn.next();
            this.tn.skip(";");
        }, u._parseMessageField = function(e, r, n) {
            if (!t.RULE.test(r)) throw Error("illegal message field rule: " + r);
            var s, o = {
                rule: r,
                type: "",
                name: "",
                options: {},
                id: 0
            };
            if ("map" === r) {
                if (n) throw Error("illegal type: " + n);
                if (this.tn.skip("<"), s = this.tn.next(), !t.TYPE.test(s) && !t.TYPEREF.test(s)) throw Error("illegal message field type: " + s);
                if (o.keytype = s, this.tn.skip(","), s = this.tn.next(), !t.TYPE.test(s) && !t.TYPEREF.test(s)) throw Error("illegal message field: " + s);
                if (o.type = s, this.tn.skip(">"), s = this.tn.next(), !t.NAME.test(s)) throw Error("illegal message field name: " + s);
                o.name = s, this.tn.skip("="), o.id = i(this.tn.next()), s = this.tn.peek(), "[" === s && this._parseFieldOptions(o), 
                this.tn.skip(";");
            } else if (n = "undefined" != typeof n ? n : this.tn.next(), "group" === n) {
                var a = this._parseMessage(e, o);
                if (!/^[A-Z]/.test(a.name)) throw Error("illegal group name: " + a.name);
                o.type = a.name, o.name = a.name.toLowerCase(), this.tn.omit(";");
            } else {
                if (!t.TYPE.test(n) && !t.TYPEREF.test(n)) throw Error("illegal message field type: " + n);
                if (o.type = n, s = this.tn.next(), !t.NAME.test(s)) throw Error("illegal message field name: " + s);
                o.name = s, this.tn.skip("="), o.id = i(this.tn.next()), s = this.tn.peek(), "[" === s && this._parseFieldOptions(o), 
                this.tn.skip(";");
            }
            return e.fields.push(o), o;
        }, u._parseMessageOneOf = function(e) {
            var i = this.tn.next();
            if (!t.NAME.test(i)) throw Error("illegal oneof name: " + i);
            var r, n = i, s = [];
            for (this.tn.skip("{"); "}" !== (i = this.tn.next()); ) r = this._parseMessageField(e, "optional", i), 
            r.oneof = n, s.push(r.id);
            this.tn.omit(";"), e.oneofs[n] = s;
        }, u._parseFieldOptions = function(e) {
            this.tn.skip("[");
            for (var t, i = !0; "]" !== (t = this.tn.peek()); ) i || this.tn.skip(","), this._parseOption(e, !0), 
            i = !1;
            this.tn.next();
        }, u._parseEnum = function(e) {
            var r = {
                name: "",
                values: [],
                options: {}
            }, n = this.tn.next();
            if (!t.NAME.test(n)) throw Error("illegal name: " + n);
            for (r.name = n, this.tn.skip("{"); "}" !== (n = this.tn.next()); ) if ("option" === n) this._parseOption(r); else {
                if (!t.NAME.test(n)) throw Error("illegal name: " + n);
                this.tn.skip("=");
                var s = {
                    name: n,
                    id: i(this.tn.next(), !0)
                };
                n = this.tn.peek(), "[" === n && this._parseFieldOptions({
                    options: {}
                }), this.tn.skip(";"), r.values.push(s);
            }
            this.tn.omit(";"), e.enums.push(r);
        }, u._parseExtensionRanges = function() {
            var t, i, n, s = [];
            do {
                for (i = []; ;) {
                    switch (t = this.tn.next()) {
                      case "min":
                        n = e.ID_MIN;
                        break;

                      case "max":
                        n = e.ID_MAX;
                        break;

                      default:
                        n = r(t);
                    }
                    if (i.push(n), 2 === i.length) break;
                    if ("to" !== this.tn.peek()) {
                        i.push(n);
                        break;
                    }
                    this.tn.next();
                }
                s.push(i);
            } while (this.tn.omit(","));
            return this.tn.skip(";"), s;
        }, u._parseExtend = function(e) {
            var i = this.tn.next();
            if (!t.TYPEREF.test(i)) throw Error("illegal extend reference: " + i);
            var r = {
                ref: i,
                fields: []
            };
            for (this.tn.skip("{"); "}" !== (i = this.tn.next()); ) if (t.RULE.test(i)) this._parseMessageField(r, i); else {
                if (!t.TYPEREF.test(i)) throw Error("illegal extend token: " + i);
                if (!this.proto3) throw Error("illegal field rule: " + i);
                this._parseMessageField(r, "optional", i);
            }
            return this.tn.omit(";"), e.messages.push(r), r;
        }, u.toString = function() {
            return "Parser at line " + this.tn.line;
        }, s.Parser = l, s;
    }(i, i.Lang), i.Reflect = function(t) {
        function i(i) {
            if ("string" == typeof i && (i = t.TYPES[i]), "undefined" == typeof i.defaultValue) throw Error("default value for type " + i.name + " is not supported");
            return i == t.TYPES.bytes ? new e(0) : i.defaultValue;
        }
        function r(e, i) {
            if (e && "number" == typeof e.low && "number" == typeof e.high && "boolean" == typeof e.unsigned && e.low === e.low && e.high === e.high) return new t.Long(e.low, e.high, "undefined" == typeof i ? e.unsigned : i);
            if ("string" == typeof e) return t.Long.fromString(e, i || !1, 10);
            if ("number" == typeof e) return t.Long.fromNumber(e, i || !1);
            throw Error("not convertible to Long");
        }
        function n(e, i) {
            var r = i.readVarint32(), s = 7 & r, o = r >>> 3;
            switch (s) {
              case t.WIRE_TYPES.VARINT:
                do {
                    r = i.readUint8();
                } while (128 === (128 & r));
                break;

              case t.WIRE_TYPES.BITS64:
                i.offset += 8;
                break;

              case t.WIRE_TYPES.LDELIM:
                r = i.readVarint32(), i.offset += r;
                break;

              case t.WIRE_TYPES.STARTGROUP:
                n(o, i);
                break;

              case t.WIRE_TYPES.ENDGROUP:
                if (o === e) return !1;
                throw Error("Illegal GROUPEND after unknown group: " + o + " (" + e + " expected)");

              case t.WIRE_TYPES.BITS32:
                i.offset += 4;
                break;

              default:
                throw Error("Illegal wire type in unknown group " + e + ": " + s);
            }
            return !0;
        }
        var s = {}, o = function(e, t, i) {
            this.builder = e, this.parent = t, this.name = i, this.className;
        }, a = o.prototype;
        a.fqn = function() {
            for (var e = this.name, t = this; ;) {
                if (t = t.parent, null == t) break;
                e = t.name + "." + e;
            }
            return e;
        }, a.toString = function(e) {
            return (e ? this.className + " " : "") + this.fqn();
        }, a.build = function() {
            throw Error(this.toString(!0) + " cannot be built directly");
        }, s.T = o;
        var l = function(e, t, i, r, n) {
            o.call(this, e, t, i), this.className = "Namespace", this.children = [], this.options = r || {}, 
            this.syntax = n || "proto2";
        }, u = l.prototype = Object.create(o.prototype);
        u.getChildren = function(e) {
            if (e = e || null, null == e) return this.children.slice();
            for (var t = [], i = 0, r = this.children.length; r > i; ++i) this.children[i] instanceof e && t.push(this.children[i]);
            return t;
        }, u.addChild = function(e) {
            var t;
            if (t = this.getChild(e.name)) if (t instanceof c.Field && t.name !== t.originalName && null === this.getChild(t.originalName)) t.name = t.originalName; else {
                if (!(e instanceof c.Field && e.name !== e.originalName && null === this.getChild(e.originalName))) throw Error("Duplicate name in namespace " + this.toString(!0) + ": " + e.name);
                e.name = e.originalName;
            }
            this.children.push(e);
        }, u.getChild = function(e) {
            for (var t = "number" == typeof e ? "id" : "name", i = 0, r = this.children.length; r > i; ++i) if (this.children[i][t] === e) return this.children[i];
            return null;
        }, u.resolve = function(e, t) {
            var i = "string" == typeof e ? e.split(".") : e, r = this, n = 0;
            if ("" === i[n]) {
                for (;null !== r.parent; ) r = r.parent;
                n++;
            }
            var o;
            do {
                do {
                    if (!(r instanceof s.Namespace)) {
                        r = null;
                        break;
                    }
                    if (o = r.getChild(i[n]), !o || !(o instanceof s.T) || t && !(o instanceof s.Namespace)) {
                        r = null;
                        break;
                    }
                    r = o, n++;
                } while (n < i.length);
                if (null != r) break;
                if (null !== this.parent) return this.parent.resolve(e, t);
            } while (null != r);
            return r;
        }, u.qn = function(e) {
            var t = [], i = e;
            do {
                t.unshift(i.name), i = i.parent;
            } while (null !== i);
            for (var r = 1; r <= t.length; r++) {
                var n = t.slice(t.length - r);
                if (e === this.resolve(n, e instanceof s.Namespace)) return n.join(".");
            }
            return e.fqn();
        }, u.build = function() {
            for (var e, t = {}, i = this.children, r = 0, n = i.length; n > r; ++r) e = i[r], 
            e instanceof l && (t[e.name] = e.build());
            return Object.defineProperty && Object.defineProperty(t, "$options", {
                value: this.buildOpt()
            }), t;
        }, u.buildOpt = function() {
            for (var e = {}, t = Object.keys(this.options), i = 0, r = t.length; r > i; ++i) {
                var n = t[i], s = this.options[t[i]];
                e[n] = s;
            }
            return e;
        }, u.getOption = function(e) {
            return "undefined" == typeof e ? this.options : "undefined" != typeof this.options[e] ? this.options[e] : null;
        }, s.Namespace = l;
        var f = function(e, i, r, n, s) {
            if (this.type = e, this.resolvedType = i, this.isMapKey = r, this.syntax = n, this.name = s, 
            r && t.MAP_KEY_TYPES.indexOf(e) < 0) throw Error("Invalid map key type: " + e.name);
        }, h = f.prototype;
        f.defaultFieldValue = i, h.toString = function() {
            return (this.name || "") + (this.isMapKey ? "map" : "value") + " element";
        }, h.verifyValue = function(i) {
            function n(e, t) {
                throw Error("Illegal value for " + s.toString(!0) + " of type " + s.type.name + ": " + e + " (" + t + ")");
            }
            var s = this;
            switch (this.type) {
              case t.TYPES.int32:
              case t.TYPES.sint32:
              case t.TYPES.sfixed32:
                return ("number" != typeof i || i === i && i % 1 !== 0) && n(typeof i, "not an integer"), 
                i > 4294967295 ? 0 | i : i;

              case t.TYPES.uint32:
              case t.TYPES.fixed32:
                return ("number" != typeof i || i === i && i % 1 !== 0) && n(typeof i, "not an integer"), 
                0 > i ? i >>> 0 : i;

              case t.TYPES.int64:
              case t.TYPES.sint64:
              case t.TYPES.sfixed64:
                if (t.Long) try {
                    return r(i, !1);
                } catch (o) {
                    n(typeof i, o.message);
                } else n(typeof i, "requires Long.js");

              case t.TYPES.uint64:
              case t.TYPES.fixed64:
                if (t.Long) try {
                    return r(i, !0);
                } catch (o) {
                    n(typeof i, o.message);
                } else n(typeof i, "requires Long.js");

              case t.TYPES.bool:
                return "boolean" != typeof i && n(typeof i, "not a boolean"), i;

              case t.TYPES["float"]:
              case t.TYPES["double"]:
                return "number" != typeof i && n(typeof i, "not a number"), i;

              case t.TYPES.string:
                return "string" == typeof i || i && i instanceof String || n(typeof i, "not a string"), 
                "" + i;

              case t.TYPES.bytes:
                return e.isByteBuffer(i) ? i : e.wrap(i, "base64");

              case t.TYPES["enum"]:
                var a = this.resolvedType.getChildren(t.Reflect.Enum.Value);
                for (u = 0; u < a.length; u++) {
                    if (a[u].name == i) return a[u].id;
                    if (a[u].id == i) return a[u].id;
                }
                if ("proto3" === this.syntax) return ("number" != typeof i || i === i && i % 1 !== 0) && n(typeof i, "not an integer"), 
                (i > 4294967295 || 0 > i) && n(typeof i, "not in range for uint32"), i;
                n(i, "not a valid enum value");

              case t.TYPES.group:
              case t.TYPES.message:
                if (i && "object" == typeof i || n(typeof i, "object expected"), i instanceof this.resolvedType.clazz) return i;
                if (i instanceof t.Builder.Message) {
                    var l = {};
                    for (var u in i) i.hasOwnProperty(u) && (l[u] = i[u]);
                    i = l;
                }
                return new this.resolvedType.clazz(i);
            }
            throw Error("[INTERNAL] Illegal value for " + this.toString(!0) + ": " + i + " (undefined type " + this.type + ")");
        }, h.calculateLength = function(i, r) {
            if (null === r) return 0;
            var n;
            switch (this.type) {
              case t.TYPES.int32:
                return 0 > r ? e.calculateVarint64(r) : e.calculateVarint32(r);

              case t.TYPES.uint32:
                return e.calculateVarint32(r);

              case t.TYPES.sint32:
                return e.calculateVarint32(e.zigZagEncode32(r));

              case t.TYPES.fixed32:
              case t.TYPES.sfixed32:
              case t.TYPES["float"]:
                return 4;

              case t.TYPES.int64:
              case t.TYPES.uint64:
                return e.calculateVarint64(r);

              case t.TYPES.sint64:
                return e.calculateVarint64(e.zigZagEncode64(r));

              case t.TYPES.fixed64:
              case t.TYPES.sfixed64:
                return 8;

              case t.TYPES.bool:
                return 1;

              case t.TYPES["enum"]:
                return e.calculateVarint32(r);

              case t.TYPES["double"]:
                return 8;

              case t.TYPES.string:
                return n = e.calculateUTF8Bytes(r), e.calculateVarint32(n) + n;

              case t.TYPES.bytes:
                if (r.remaining() < 0) throw Error("Illegal value for " + this.toString(!0) + ": " + r.remaining() + " bytes remaining");
                return e.calculateVarint32(r.remaining()) + r.remaining();

              case t.TYPES.message:
                return n = this.resolvedType.calculate(r), e.calculateVarint32(n) + n;

              case t.TYPES.group:
                return n = this.resolvedType.calculate(r), n + e.calculateVarint32(i << 3 | t.WIRE_TYPES.ENDGROUP);
            }
            throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + r + " (unknown type)");
        }, h.encodeValue = function(i, r, n) {
            if (null === r) return n;
            switch (this.type) {
              case t.TYPES.int32:
                0 > r ? n.writeVarint64(r) : n.writeVarint32(r);
                break;

              case t.TYPES.uint32:
                n.writeVarint32(r);
                break;

              case t.TYPES.sint32:
                n.writeVarint32ZigZag(r);
                break;

              case t.TYPES.fixed32:
                n.writeUint32(r);
                break;

              case t.TYPES.sfixed32:
                n.writeInt32(r);
                break;

              case t.TYPES.int64:
              case t.TYPES.uint64:
                n.writeVarint64(r);
                break;

              case t.TYPES.sint64:
                n.writeVarint64ZigZag(r);
                break;

              case t.TYPES.fixed64:
                n.writeUint64(r);
                break;

              case t.TYPES.sfixed64:
                n.writeInt64(r);
                break;

              case t.TYPES.bool:
                "string" == typeof r ? n.writeVarint32("false" === r.toLowerCase() ? 0 : !!r) : n.writeVarint32(r ? 1 : 0);
                break;

              case t.TYPES["enum"]:
                n.writeVarint32(r);
                break;

              case t.TYPES["float"]:
                n.writeFloat32(r);
                break;

              case t.TYPES["double"]:
                n.writeFloat64(r);
                break;

              case t.TYPES.string:
                n.writeVString(r);
                break;

              case t.TYPES.bytes:
                if (r.remaining() < 0) throw Error("Illegal value for " + this.toString(!0) + ": " + r.remaining() + " bytes remaining");
                var s = r.offset;
                n.writeVarint32(r.remaining()), n.append(r), r.offset = s;
                break;

              case t.TYPES.message:
                var o = new e().LE();
                this.resolvedType.encode(r, o), n.writeVarint32(o.offset), n.append(o.flip());
                break;

              case t.TYPES.group:
                this.resolvedType.encode(r, n), n.writeVarint32(i << 3 | t.WIRE_TYPES.ENDGROUP);
                break;

              default:
                throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + r + " (unknown type)");
            }
            return n;
        }, h.decode = function(e, i, r) {
            if (i != this.type.wireType) throw Error("Unexpected wire type for element");
            var n, s;
            switch (this.type) {
              case t.TYPES.int32:
                return 0 | e.readVarint32();

              case t.TYPES.uint32:
                return e.readVarint32() >>> 0;

              case t.TYPES.sint32:
                return 0 | e.readVarint32ZigZag();

              case t.TYPES.fixed32:
                return e.readUint32() >>> 0;

              case t.TYPES.sfixed32:
                return 0 | e.readInt32();

              case t.TYPES.int64:
                return e.readVarint64();

              case t.TYPES.uint64:
                return e.readVarint64().toUnsigned();

              case t.TYPES.sint64:
                return e.readVarint64ZigZag();

              case t.TYPES.fixed64:
                return e.readUint64();

              case t.TYPES.sfixed64:
                return e.readInt64();

              case t.TYPES.bool:
                return !!e.readVarint32();

              case t.TYPES["enum"]:
                return e.readVarint32();

              case t.TYPES["float"]:
                return e.readFloat();

              case t.TYPES["double"]:
                return e.readDouble();

              case t.TYPES.string:
                return e.readVString();

              case t.TYPES.bytes:
                if (s = e.readVarint32(), e.remaining() < s) throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + s + " required but got only " + e.remaining());
                return n = e.clone(), n.limit = n.offset + s, e.offset += s, n;

              case t.TYPES.message:
                return s = e.readVarint32(), this.resolvedType.decode(e, s);

              case t.TYPES.group:
                return this.resolvedType.decode(e, -1, r);
            }
            throw Error("[INTERNAL] Illegal decode type");
        }, h.valueFromString = function(i) {
            if (!this.isMapKey) throw Error("valueFromString() called on non-map-key element");
            switch (this.type) {
              case t.TYPES.int32:
              case t.TYPES.sint32:
              case t.TYPES.sfixed32:
              case t.TYPES.uint32:
              case t.TYPES.fixed32:
                return this.verifyValue(parseInt(i));

              case t.TYPES.int64:
              case t.TYPES.sint64:
              case t.TYPES.sfixed64:
              case t.TYPES.uint64:
              case t.TYPES.fixed64:
                return this.verifyValue(i);

              case t.TYPES.bool:
                return "true" === i;

              case t.TYPES.string:
                return this.verifyValue(i);

              case t.TYPES.bytes:
                return e.fromBinary(i);
            }
        }, h.valueToString = function(e) {
            if (!this.isMapKey) throw Error("valueToString() called on non-map-key element");
            return this.type === t.TYPES.bytes ? e.toString("binary") : e.toString();
        }, s.Element = f;
        var c = function(e, t, i, r, n, s) {
            l.call(this, e, t, i, r, s), this.className = "Message", this.extensions = void 0, 
            this.clazz = null, this.isGroup = !!n, this._fields = null, this._fieldsById = null, 
            this._fieldsByName = null;
        }, p = c.prototype = Object.create(l.prototype);
        p.build = function(i) {
            if (this.clazz && !i) return this.clazz;
            var r = function(t, i) {
                function r(i, n, s, o) {
                    if (null === i || "object" != typeof i) {
                        if (o && o instanceof t.Reflect.Enum) {
                            var a = t.Reflect.Enum.getName(o.object, i);
                            if (null !== a) return a;
                        }
                        return i;
                    }
                    if (e.isByteBuffer(i)) return n ? i.toBase64() : i.toBuffer();
                    if (t.Long.isLong(i)) return s ? i.toString() : t.Long.fromValue(i);
                    var l;
                    if (Array.isArray(i)) return l = [], i.forEach(function(e, t) {
                        l[t] = r(e, n, s, o);
                    }), l;
                    if (l = {}, i instanceof t.Map) {
                        for (var u = i.entries(), f = u.next(); !f.done; f = u.next()) l[i.keyElem.valueToString(f.value[0])] = r(f.value[1], n, s, i.valueElem.resolvedType);
                        return l;
                    }
                    var h = i.$type, c = void 0;
                    for (var p in i) i.hasOwnProperty(p) && (h && (c = h.getChild(p)) ? l[p] = r(i[p], n, s, c.resolvedType) : l[p] = r(i[p], n, s));
                    return l;
                }
                var n = i.getChildren(t.Reflect.Message.Field), s = i.getChildren(t.Reflect.Message.OneOf), o = function(r, a) {
                    t.Builder.Message.call(this);
                    for (var l = 0, u = s.length; u > l; ++l) this[s[l].name] = null;
                    for (l = 0, u = n.length; u > l; ++l) {
                        var f = n[l];
                        this[f.name] = f.repeated ? [] : f.map ? new t.Map(f) : null, !f.required && "proto3" !== i.syntax || null === f.defaultValue || (this[f.name] = f.defaultValue);
                    }
                    if (arguments.length > 0) {
                        var h;
                        if (1 !== arguments.length || null === r || "object" != typeof r || !("function" != typeof r.encode || r instanceof o) || Array.isArray(r) || r instanceof t.Map || e.isByteBuffer(r) || r instanceof ArrayBuffer || t.Long && r instanceof t.Long) for (l = 0, 
                        u = arguments.length; u > l; ++l) "undefined" != typeof (h = arguments[l]) && this.$set(n[l].name, h); else this.$set(r);
                    }
                }, a = o.prototype = Object.create(t.Builder.Message.prototype);
                a.add = function(e, r, n) {
                    var s = i._fieldsByName[e];
                    if (!n) {
                        if (!s) throw Error(this + "#" + e + " is undefined");
                        if (!(s instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + s.toString(!0));
                        if (!s.repeated) throw Error(this + "#" + e + " is not a repeated field");
                        r = s.verifyValue(r, !0);
                    }
                    return null === this[e] && (this[e] = []), this[e].push(r), this;
                }, a.$add = a.add, a.set = function(e, r, n) {
                    if (e && "object" == typeof e) {
                        n = r;
                        for (var s in e) e.hasOwnProperty(s) && "undefined" != typeof (r = e[s]) && this.$set(s, r, n);
                        return this;
                    }
                    var o = i._fieldsByName[e];
                    if (n) this[e] = r; else {
                        if (!o) throw Error(this + "#" + e + " is not a field: undefined");
                        if (!(o instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + o.toString(!0));
                        this[o.name] = r = o.verifyValue(r);
                    }
                    if (o && o.oneof) {
                        var a = this[o.oneof.name];
                        null !== r ? (null !== a && a !== o.name && (this[a] = null), this[o.oneof.name] = o.name) : a === e && (this[o.oneof.name] = null);
                    }
                    return this;
                }, a.$set = a.set, a.get = function(e, r) {
                    if (r) return this[e];
                    var n = i._fieldsByName[e];
                    if (!(n && n instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: undefined");
                    if (!(n instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + n.toString(!0));
                    return this[n.name];
                }, a.$get = a.get;
                for (var l = 0; l < n.length; l++) {
                    var u = n[l];
                    u instanceof t.Reflect.Message.ExtensionField || i.builder.options.populateAccessors && function(e) {
                        var t = e.originalName.replace(/(_[a-zA-Z])/g, function(e) {
                            return e.toUpperCase().replace("_", "");
                        });
                        t = t.substring(0, 1).toUpperCase() + t.substring(1);
                        var r = e.originalName.replace(/([A-Z])/g, function(e) {
                            return "_" + e;
                        }), n = function(t, i) {
                            return this[e.name] = i ? t : e.verifyValue(t), this;
                        }, s = function() {
                            return this[e.name];
                        };
                        null === i.getChild("set" + t) && (a["set" + t] = n), null === i.getChild("set_" + r) && (a["set_" + r] = n), 
                        null === i.getChild("get" + t) && (a["get" + t] = s), null === i.getChild("get_" + r) && (a["get_" + r] = s);
                    }(u);
                }
                a.encode = function(t, r) {
                    "boolean" == typeof t && (r = t, t = void 0);
                    var n = !1;
                    t || (t = new e(), n = !0);
                    var s = t.littleEndian;
                    try {
                        return i.encode(this, t.LE(), r), (n ? t.flip() : t).LE(s);
                    } catch (o) {
                        throw t.LE(s), o;
                    }
                }, o.encode = function(e, t, i) {
                    return new o(e).encode(t, i);
                }, a.calculate = function() {
                    return i.calculate(this);
                }, a.encodeDelimited = function(t, r) {
                    var n = !1;
                    t || (t = new e(), n = !0);
                    var s = new e().LE();
                    return i.encode(this, s, r).flip(), t.writeVarint32(s.remaining()), t.append(s), 
                    n ? t.flip() : t;
                }, a.encodeAB = function() {
                    try {
                        return this.encode().toArrayBuffer();
                    } catch (e) {
                        throw e.encoded && (e.encoded = e.encoded.toArrayBuffer()), e;
                    }
                }, a.toArrayBuffer = a.encodeAB, a.encodeNB = function() {
                    try {
                        return this.encode().toBuffer();
                    } catch (e) {
                        throw e.encoded && (e.encoded = e.encoded.toBuffer()), e;
                    }
                }, a.toBuffer = a.encodeNB, a.encode64 = function() {
                    try {
                        return this.encode().toBase64();
                    } catch (e) {
                        throw e.encoded && (e.encoded = e.encoded.toBase64()), e;
                    }
                }, a.toBase64 = a.encode64, a.encodeHex = function() {
                    try {
                        return this.encode().toHex();
                    } catch (e) {
                        throw e.encoded && (e.encoded = e.encoded.toHex()), e;
                    }
                }, a.toHex = a.encodeHex, a.toRaw = function(e, t) {
                    return r(this, !!e, !!t, this.$type);
                }, a.encodeJSON = function() {
                    return JSON.stringify(r(this, !0, !0, this.$type));
                }, o.decode = function(t, r, n) {
                    "string" == typeof r && (n = r, r = -1), "string" == typeof t && (t = e.wrap(t, n ? n : "base64")), 
                    t = e.isByteBuffer(t) ? t : e.wrap(t);
                    var s = t.littleEndian;
                    try {
                        var o = i.decode(t.LE());
                        return t.LE(s), o;
                    } catch (a) {
                        throw t.LE(s), a;
                    }
                }, o.decodeDelimited = function(t, r) {
                    if ("string" == typeof t && (t = e.wrap(t, r ? r : "base64")), t = e.isByteBuffer(t) ? t : e.wrap(t), 
                    t.remaining() < 1) return null;
                    var n = t.offset, s = t.readVarint32();
                    if (t.remaining() < s) return t.offset = n, null;
                    try {
                        var o = i.decode(t.slice(t.offset, t.offset + s).LE());
                        return t.offset += s, o;
                    } catch (a) {
                        throw t.offset += s, a;
                    }
                }, o.decode64 = function(e) {
                    return o.decode(e, "base64");
                }, o.decodeHex = function(e) {
                    return o.decode(e, "hex");
                }, o.decodeJSON = function(e) {
                    return new o(JSON.parse(e));
                }, a.toString = function() {
                    return i.toString();
                };
                return Object.defineProperty && (Object.defineProperty(o, "$options", {
                    value: i.buildOpt()
                }), Object.defineProperty(a, "$options", {
                    value: o.$options
                }), Object.defineProperty(o, "$type", {
                    value: i
                }), Object.defineProperty(a, "$type", {
                    value: i
                })), o;
            }(t, this);
            this._fields = [], this._fieldsById = {}, this._fieldsByName = {};
            for (var n, s = 0, o = this.children.length; o > s; s++) if (n = this.children[s], 
            n instanceof m || n instanceof c || n instanceof P) {
                if (r.hasOwnProperty(n.name)) throw Error("Illegal reflect child of " + this.toString(!0) + ": " + n.toString(!0) + " cannot override static property '" + n.name + "'");
                r[n.name] = n.build();
            } else if (n instanceof c.Field) n.build(), this._fields.push(n), this._fieldsById[n.id] = n, 
            this._fieldsByName[n.name] = n; else if (!(n instanceof c.OneOf || n instanceof S)) throw Error("Illegal reflect child of " + this.toString(!0) + ": " + this.children[s].toString(!0));
            return this.clazz = r;
        }, p.encode = function(e, t, i) {
            for (var r, n, s = null, o = 0, a = this._fields.length; a > o; ++o) r = this._fields[o], 
            n = e[r.name], r.required && null === n ? null === s && (s = r) : r.encode(i ? n : r.verifyValue(n), t, e);
            if (null !== s) {
                var l = Error("Missing at least one required field for " + this.toString(!0) + ": " + s);
                throw l.encoded = t, l;
            }
            return t;
        }, p.calculate = function(e) {
            for (var t, i, r = 0, n = 0, s = this._fields.length; s > n; ++n) {
                if (t = this._fields[n], i = e[t.name], t.required && null === i) throw Error("Missing at least one required field for " + this.toString(!0) + ": " + t);
                r += t.calculate(i, e);
            }
            return r;
        }, p.decode = function(e, i, r) {
            i = "number" == typeof i ? i : -1;
            for (var s, o, a, l, u = e.offset, f = new this.clazz(); e.offset < u + i || -1 === i && e.remaining() > 0; ) {
                if (s = e.readVarint32(), o = 7 & s, a = s >>> 3, o === t.WIRE_TYPES.ENDGROUP) {
                    if (a !== r) throw Error("Illegal group end indicator for " + this.toString(!0) + ": " + a + " (" + (r ? r + " expected" : "not a group") + ")");
                    break;
                }
                if (l = this._fieldsById[a]) {
                    if (l.repeated && !l.options.packed) f[l.name].push(l.decode(o, e)); else if (l.map) {
                        var h = l.decode(o, e);
                        f[l.name].set(h[0], h[1]);
                    } else if (f[l.name] = l.decode(o, e), l.oneof) {
                        var c = f[l.oneof.name];
                        null !== c && c !== l.name && (f[c] = null), f[l.oneof.name] = l.name;
                    }
                } else switch (o) {
                  case t.WIRE_TYPES.VARINT:
                    e.readVarint32();
                    break;

                  case t.WIRE_TYPES.BITS32:
                    e.offset += 4;
                    break;

                  case t.WIRE_TYPES.BITS64:
                    e.offset += 8;
                    break;

                  case t.WIRE_TYPES.LDELIM:
                    var p = e.readVarint32();
                    e.offset += p;
                    break;

                  case t.WIRE_TYPES.STARTGROUP:
                    for (;n(a, e); ) ;
                    break;

                  default:
                    throw Error("Illegal wire type for unknown field " + a + " in " + this.toString(!0) + "#decode: " + o);
                }
            }
            for (var d = 0, E = this._fields.length; E > d; ++d) if (l = this._fields[d], null === f[l.name]) if ("proto3" === this.syntax) f[l.name] = l.defaultValue; else {
                if (l.required) {
                    var y = Error("Missing at least one required field for " + this.toString(!0) + ": " + l.name);
                    throw y.decoded = f, y;
                }
                t.populateDefaults && null !== l.defaultValue && (f[l.name] = l.defaultValue);
            }
            return f;
        }, s.Message = c;
        var d = function(e, i, r, n, s, a, l, u, f, h) {
            o.call(this, e, i, a), this.className = "Message.Field", this.required = "required" === r, 
            this.repeated = "repeated" === r, this.map = "map" === r, this.keyType = n || null, 
            this.type = s, this.resolvedType = null, this.id = l, this.options = u || {}, this.defaultValue = null, 
            this.oneof = f || null, this.syntax = h || "proto2", this.originalName = this.name, 
            this.element = null, this.keyElement = null, !this.builder.options.convertFieldsToCamelCase || this instanceof c.ExtensionField || (this.name = t.Util.toCamelCase(this.name));
        }, E = d.prototype = Object.create(o.prototype);
        E.build = function() {
            this.element = new f(this.type, this.resolvedType, !1, this.syntax, this.name), 
            this.map && (this.keyElement = new f(this.keyType, void 0, !0, this.syntax, this.name)), 
            "proto3" !== this.syntax || this.repeated || this.map ? "undefined" != typeof this.options["default"] && (this.defaultValue = this.verifyValue(this.options["default"])) : this.defaultValue = f.defaultFieldValue(this.type);
        }, E.verifyValue = function(e, i) {
            function r(e, t) {
                throw Error("Illegal value for " + n.toString(!0) + " of type " + n.type.name + ": " + e + " (" + t + ")");
            }
            i = i || !1;
            var n = this;
            if (null === e) return this.required && r(typeof e, "required"), "proto3" === this.syntax && this.type !== t.TYPES.message && r(typeof e, "proto3 field without field presence cannot be null"), 
            null;
            var s;
            if (this.repeated && !i) {
                Array.isArray(e) || (e = [ e ]);
                var o = [];
                for (s = 0; s < e.length; s++) o.push(this.element.verifyValue(e[s]));
                return o;
            }
            return this.map && !i ? e instanceof t.Map ? e : (e instanceof Object || r(typeof e, "expected ProtoBuf.Map or raw object for map field"), 
            new t.Map(this, e)) : (!this.repeated && Array.isArray(e) && r(typeof e, "no array expected"), 
            this.element.verifyValue(e));
        }, E.hasWirePresence = function(e, i) {
            if ("proto3" !== this.syntax) return null !== e;
            if (this.oneof && i[this.oneof.name] === this.name) return !0;
            switch (this.type) {
              case t.TYPES.int32:
              case t.TYPES.sint32:
              case t.TYPES.sfixed32:
              case t.TYPES.uint32:
              case t.TYPES.fixed32:
                return 0 !== e;

              case t.TYPES.int64:
              case t.TYPES.sint64:
              case t.TYPES.sfixed64:
              case t.TYPES.uint64:
              case t.TYPES.fixed64:
                return 0 !== e.low || 0 !== e.high;

              case t.TYPES.bool:
                return e;

              case t.TYPES["float"]:
              case t.TYPES["double"]:
                return 0 !== e;

              case t.TYPES.string:
                return e.length > 0;

              case t.TYPES.bytes:
                return e.remaining() > 0;

              case t.TYPES["enum"]:
                return 0 !== e;

              case t.TYPES.message:
                return null !== e;

              default:
                return !0;
            }
        }, E.encode = function(i, r, n) {
            if (null === this.type || "object" != typeof this.type) throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
            if (null === i || this.repeated && 0 == i.length) return r;
            try {
                if (this.repeated) {
                    var s;
                    if (this.options.packed && t.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                        r.writeVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), r.ensureCapacity(r.offset += 1);
                        var o = r.offset;
                        for (s = 0; s < i.length; s++) this.element.encodeValue(this.id, i[s], r);
                        var a = r.offset - o, l = e.calculateVarint32(a);
                        if (l > 1) {
                            var u = r.slice(o, r.offset);
                            o += l - 1, r.offset = o, r.append(u);
                        }
                        r.writeVarint32(a, o - l);
                    } else for (s = 0; s < i.length; s++) r.writeVarint32(this.id << 3 | this.type.wireType), 
                    this.element.encodeValue(this.id, i[s], r);
                } else this.map ? i.forEach(function(i, n, s) {
                    var o = e.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, n) + e.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, i);
                    r.writeVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), r.writeVarint32(o), r.writeVarint32(8 | this.keyType.wireType), 
                    this.keyElement.encodeValue(1, n, r), r.writeVarint32(16 | this.type.wireType), 
                    this.element.encodeValue(2, i, r);
                }, this) : this.hasWirePresence(i, n) && (r.writeVarint32(this.id << 3 | this.type.wireType), 
                this.element.encodeValue(this.id, i, r));
            } catch (f) {
                throw Error("Illegal value for " + this.toString(!0) + ": " + i + " (" + f + ")");
            }
            return r;
        }, E.calculate = function(i, r) {
            if (i = this.verifyValue(i), null === this.type || "object" != typeof this.type) throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
            if (null === i || this.repeated && 0 == i.length) return 0;
            var n = 0;
            try {
                if (this.repeated) {
                    var s, o;
                    if (this.options.packed && t.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                        for (n += e.calculateVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), o = 0, s = 0; s < i.length; s++) o += this.element.calculateLength(this.id, i[s]);
                        n += e.calculateVarint32(o), n += o;
                    } else for (s = 0; s < i.length; s++) n += e.calculateVarint32(this.id << 3 | this.type.wireType), 
                    n += this.element.calculateLength(this.id, i[s]);
                } else this.map ? i.forEach(function(i, r, s) {
                    var o = e.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, r) + e.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, i);
                    n += e.calculateVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), n += e.calculateVarint32(o), 
                    n += o;
                }, this) : this.hasWirePresence(i, r) && (n += e.calculateVarint32(this.id << 3 | this.type.wireType), 
                n += this.element.calculateLength(this.id, i));
            } catch (a) {
                throw Error("Illegal value for " + this.toString(!0) + ": " + i + " (" + a + ")");
            }
            return n;
        }, E.decode = function(e, i, r) {
            var n, s, o = !this.map && e == this.type.wireType || !r && this.repeated && this.options.packed && e == t.WIRE_TYPES.LDELIM || this.map && e == t.WIRE_TYPES.LDELIM;
            if (!o) throw Error("Illegal wire type for field " + this.toString(!0) + ": " + e + " (" + this.type.wireType + " expected)");
            if (e == t.WIRE_TYPES.LDELIM && this.repeated && this.options.packed && t.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0 && !r) {
                s = i.readVarint32(), s = i.offset + s;
                for (var a = []; i.offset < s; ) a.push(this.decode(this.type.wireType, i, !0));
                return a;
            }
            if (this.map) {
                var l = f.defaultFieldValue(this.keyType);
                if (n = f.defaultFieldValue(this.type), s = i.readVarint32(), i.remaining() < s) throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + s + " required but got only " + i.remaining());
                var u = i.clone();
                for (u.limit = u.offset + s, i.offset += s; u.remaining() > 0; ) {
                    var h = u.readVarint32();
                    e = 7 & h;
                    var c = h >>> 3;
                    if (1 === c) l = this.keyElement.decode(u, e, c); else {
                        if (2 !== c) throw Error("Unexpected tag in map field key/value submessage");
                        n = this.element.decode(u, e, c);
                    }
                }
                return [ l, n ];
            }
            return this.element.decode(i, e, this.id);
        }, s.Message.Field = d;
        var y = function(e, t, i, r, n, s, o) {
            d.call(this, e, t, i, null, r, n, s, o), this.extension;
        };
        y.prototype = Object.create(d.prototype), s.Message.ExtensionField = y;
        var g = function(e, t, i) {
            o.call(this, e, t, i), this.fields = [];
        };
        s.Message.OneOf = g;
        var m = function(e, t, i, r, n) {
            l.call(this, e, t, i, r, n), this.className = "Enum", this.object = null;
        };
        m.getName = function(e, t) {
            for (var i, r = Object.keys(e), n = 0; n < r.length; ++n) if (e[i = r[n]] === t) return i;
            return null;
        };
        var v = m.prototype = Object.create(l.prototype);
        v.build = function(e) {
            if (this.object && !e) return this.object;
            for (var i = new t.Builder.Enum(), r = this.getChildren(m.Value), n = 0, s = r.length; s > n; ++n) i[r[n].name] = r[n].id;
            return Object.defineProperty && Object.defineProperty(i, "$options", {
                value: this.buildOpt(),
                enumerable: !1
            }), this.object = i;
        }, s.Enum = m;
        var T = function(e, t, i, r) {
            o.call(this, e, t, i), this.className = "Enum.Value", this.id = r;
        };
        T.prototype = Object.create(o.prototype), s.Enum.Value = T;
        var S = function(e, t, i, r) {
            o.call(this, e, t, i), this.field = r;
        };
        S.prototype = Object.create(o.prototype), s.Extension = S;
        var P = function(e, t, i, r) {
            l.call(this, e, t, i, r), this.className = "Service", this.clazz = null;
        }, w = P.prototype = Object.create(l.prototype);
        w.build = function(i) {
            return this.clazz && !i ? this.clazz : this.clazz = function(t, i) {
                for (var r = function(e) {
                    t.Builder.Service.call(this), this.rpcImpl = e || function(e, t, i) {
                        setTimeout(i.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0);
                    };
                }, n = r.prototype = Object.create(t.Builder.Service.prototype), s = i.getChildren(t.Reflect.Service.RPCMethod), o = 0; o < s.length; o++) !function(t) {
                    n[t.name] = function(r, n) {
                        try {
                            try {
                                r = t.resolvedRequestType.clazz.decode(e.wrap(r));
                            } catch (s) {
                                if (!(s instanceof TypeError)) throw s;
                            }
                            if (null === r || "object" != typeof r) throw Error("Illegal arguments");
                            r instanceof t.resolvedRequestType.clazz || (r = new t.resolvedRequestType.clazz(r)), 
                            this.rpcImpl(t.fqn(), r, function(e, r) {
                                if (e) return void n(e);
                                null === r && (r = "");
                                try {
                                    r = t.resolvedResponseType.clazz.decode(r);
                                } catch (s) {}
                                return r && r instanceof t.resolvedResponseType.clazz ? void n(null, r) : void n(Error("Illegal response type received in service method " + i.name + "#" + t.name));
                            });
                        } catch (s) {
                            setTimeout(n.bind(this, s), 0);
                        }
                    }, r[t.name] = function(e, i, n) {
                        new r(e)[t.name](i, n);
                    }, Object.defineProperty && (Object.defineProperty(r[t.name], "$options", {
                        value: t.buildOpt()
                    }), Object.defineProperty(n[t.name], "$options", {
                        value: r[t.name].$options
                    }));
                }(s[o]);
                return Object.defineProperty && (Object.defineProperty(r, "$options", {
                    value: i.buildOpt()
                }), Object.defineProperty(n, "$options", {
                    value: r.$options
                }), Object.defineProperty(r, "$type", {
                    value: i
                }), Object.defineProperty(n, "$type", {
                    value: i
                })), r;
            }(t, this);
        }, s.Service = P;
        var b = function(e, t, i, r) {
            o.call(this, e, t, i), this.className = "Service.Method", this.options = r || {};
        }, x = b.prototype = Object.create(o.prototype);
        x.buildOpt = u.buildOpt, s.Service.Method = b;
        var Y = function(e, t, i, r, n, s, o, a) {
            b.call(this, e, t, i, a), this.className = "Service.RPCMethod", this.requestName = r, 
            this.responseName = n, this.requestStream = s, this.responseStream = o, this.resolvedRequestType = null, 
            this.resolvedResponseType = null;
        };
        return Y.prototype = Object.create(b.prototype), s.Service.RPCMethod = Y, s;
    }(i), i.Builder = function(e, t, i) {
        function r(e) {
            e.messages && e.messages.forEach(function(t) {
                t.syntax = e.syntax, r(t);
            }), e.enums && e.enums.forEach(function(t) {
                t.syntax = e.syntax;
            });
        }
        var n = function(e) {
            this.ns = new i.Namespace(this, null, ""), this.ptr = this.ns, this.resolved = !1, 
            this.result = null, this.files = {}, this.importRoot = null, this.options = e || {};
        }, s = n.prototype;
        return n.isMessage = function(e) {
            return "string" != typeof e.name ? !1 : "undefined" == typeof e.values && "undefined" == typeof e.rpc;
        }, n.isMessageField = function(e) {
            return "string" == typeof e.rule && "string" == typeof e.name && "string" == typeof e.type && "undefined" != typeof e.id;
        }, n.isEnum = function(e) {
            return "string" != typeof e.name ? !1 : !("undefined" == typeof e.values || !Array.isArray(e.values) || 0 === e.values.length);
        }, n.isService = function(e) {
            return !("string" != typeof e.name || "object" != typeof e.rpc || !e.rpc);
        }, n.isExtend = function(e) {
            return "string" == typeof e.ref;
        }, s.reset = function() {
            return this.ptr = this.ns, this;
        }, s.define = function(e) {
            if ("string" != typeof e || !t.TYPEREF.test(e)) throw Error("illegal namespace: " + e);
            return e.split(".").forEach(function(e) {
                var t = this.ptr.getChild(e);
                null === t && this.ptr.addChild(t = new i.Namespace(this, this.ptr, e)), this.ptr = t;
            }, this), this;
        }, s.create = function(t) {
            if (!t) return this;
            if (Array.isArray(t)) {
                if (0 === t.length) return this;
                t = t.slice();
            } else t = [ t ];
            for (var r = [ t ]; r.length > 0; ) {
                if (t = r.pop(), !Array.isArray(t)) throw Error("not a valid namespace: " + JSON.stringify(t));
                for (;t.length > 0; ) {
                    var s = t.shift();
                    if (n.isMessage(s)) {
                        var o = new i.Message(this, this.ptr, s.name, s.options, s.isGroup, s.syntax), a = {};
                        s.oneofs && Object.keys(s.oneofs).forEach(function(e) {
                            o.addChild(a[e] = new i.Message.OneOf(this, o, e));
                        }, this), s.fields && s.fields.forEach(function(e) {
                            if (null !== o.getChild(0 | e.id)) throw Error("duplicate or invalid field id in " + o.name + ": " + e.id);
                            if (e.options && "object" != typeof e.options) throw Error("illegal field options in " + o.name + "#" + e.name);
                            var t = null;
                            if ("string" == typeof e.oneof && !(t = a[e.oneof])) throw Error("illegal oneof in " + o.name + "#" + e.name + ": " + e.oneof);
                            e = new i.Message.Field(this, o, e.rule, e.keytype, e.type, e.name, e.id, e.options, t, s.syntax), 
                            t && t.fields.push(e), o.addChild(e);
                        }, this);
                        var l = [];
                        if (s.enums && s.enums.forEach(function(e) {
                            l.push(e);
                        }), s.messages && s.messages.forEach(function(e) {
                            l.push(e);
                        }), s.services && s.services.forEach(function(e) {
                            l.push(e);
                        }), s.extensions && ("number" == typeof s.extensions[0] ? o.extensions = [ s.extensions ] : o.extensions = s.extensions), 
                        this.ptr.addChild(o), l.length > 0) {
                            r.push(t), t = l, l = null, this.ptr = o, o = null;
                            continue;
                        }
                        l = null;
                    } else if (n.isEnum(s)) o = new i.Enum(this, this.ptr, s.name, s.options, s.syntax), 
                    s.values.forEach(function(e) {
                        o.addChild(new i.Enum.Value(this, o, e.name, e.id));
                    }, this), this.ptr.addChild(o); else if (n.isService(s)) o = new i.Service(this, this.ptr, s.name, s.options), 
                    Object.keys(s.rpc).forEach(function(e) {
                        var t = s.rpc[e];
                        o.addChild(new i.Service.RPCMethod(this, o, e, t.request, t.response, !!t.request_stream, !!t.response_stream, t.options));
                    }, this), this.ptr.addChild(o); else {
                        if (!n.isExtend(s)) throw Error("not a valid definition: " + JSON.stringify(s));
                        if (o = this.ptr.resolve(s.ref, !0)) s.fields.forEach(function(t) {
                            if (null !== o.getChild(0 | t.id)) throw Error("duplicate extended field id in " + o.name + ": " + t.id);
                            if (o.extensions) {
                                var r = !1;
                                if (o.extensions.forEach(function(e) {
                                    t.id >= e[0] && t.id <= e[1] && (r = !0);
                                }), !r) throw Error("illegal extended field id in " + o.name + ": " + t.id + " (not within valid ranges)");
                            }
                            var n = t.name;
                            this.options.convertFieldsToCamelCase && (n = e.Util.toCamelCase(n));
                            var s = new i.Message.ExtensionField(this, o, t.rule, t.type, this.ptr.fqn() + "." + n, t.id, t.options), a = new i.Extension(this, this.ptr, t.name, s);
                            s.extension = a, this.ptr.addChild(a), o.addChild(s);
                        }, this); else if (!/\.?google\.protobuf\./.test(s.ref)) throw Error("extended message " + s.ref + " is not defined");
                    }
                    s = null, o = null;
                }
                t = null, this.ptr = this.ptr.parent;
            }
            return this.resolved = !1, this.result = null, this;
        }, s["import"] = function(t, i) {
            var n = "/";
            if ("string" == typeof i) {
                if (e.Util.IS_NODE && (i = require("path").resolve(i)), this.files[i] === !0) return this.reset();
                this.files[i] = !0;
            } else if ("object" == typeof i) {
                var s = i.root;
                e.Util.IS_NODE && (s = require("path").resolve(s)), (s.indexOf("\\") >= 0 || i.file.indexOf("\\") >= 0) && (n = "\\");
                var o = s + n + i.file;
                if (this.files[o] === !0) return this.reset();
                this.files[o] = !0;
            }
            if (t.imports && t.imports.length > 0) {
                var a, l = !1;
                "object" == typeof i ? (this.importRoot = i.root, l = !0, a = this.importRoot, i = i.file, 
                (a.indexOf("\\") >= 0 || i.indexOf("\\") >= 0) && (n = "\\")) : "string" == typeof i ? this.importRoot ? a = this.importRoot : i.indexOf("/") >= 0 ? (a = i.replace(/\/[^\/]*$/, ""), 
                "" === a && (a = "/")) : i.indexOf("\\") >= 0 ? (a = i.replace(/\\[^\\]*$/, ""), 
                n = "\\") : a = "." : a = null;
                for (var u = 0; u < t.imports.length; u++) if ("string" == typeof t.imports[u]) {
                    if (!a) throw Error("cannot determine import root");
                    var f = t.imports[u];
                    if ("google/protobuf/descriptor.proto" === f) continue;
                    if (f = a + n + f, this.files[f] === !0) continue;
                    /\.proto$/i.test(f) && !e.DotProto && (f = f.replace(/\.proto$/, ".json"));
                    var h = e.Util.fetch(f);
                    if (null === h) throw Error("failed to import '" + f + "' in '" + i + "': file not found");
                    /\.json$/i.test(f) ? this["import"](JSON.parse(h + ""), f) : this["import"](e.DotProto.Parser.parse(h), f);
                } else i ? /\.(\w+)$/.test(i) ? this["import"](t.imports[u], i.replace(/^(.+)\.(\w+)$/, function(e, t, i) {
                    return t + "_import" + u + "." + i;
                })) : this["import"](t.imports[u], i + "_import" + u) : this["import"](t.imports[u]);
                l && (this.importRoot = null);
            }
            t["package"] && this.define(t["package"]), t.syntax && r(t);
            var c = this.ptr;
            return t.options && Object.keys(t.options).forEach(function(e) {
                c.options[e] = t.options[e];
            }), t.messages && (this.create(t.messages), this.ptr = c), t.enums && (this.create(t.enums), 
            this.ptr = c), t.services && (this.create(t.services), this.ptr = c), t["extends"] && this.create(t["extends"]), 
            this.reset();
        }, s.resolveAll = function() {
            var r;
            if (null == this.ptr || "object" == typeof this.ptr.type) return this;
            if (this.ptr instanceof i.Namespace) this.ptr.children.forEach(function(e) {
                this.ptr = e, this.resolveAll();
            }, this); else if (this.ptr instanceof i.Message.Field) {
                if (t.TYPE.test(this.ptr.type)) this.ptr.type = e.TYPES[this.ptr.type]; else {
                    if (!t.TYPEREF.test(this.ptr.type)) throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                    if (r = (this.ptr instanceof i.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, !0), 
                    !r) throw Error("unresolvable type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                    if (this.ptr.resolvedType = r, r instanceof i.Enum) {
                        if (this.ptr.type = e.TYPES["enum"], "proto3" === this.ptr.syntax && "proto3" !== r.syntax) throw Error("proto3 message cannot reference proto2 enum");
                    } else {
                        if (!(r instanceof i.Message)) throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
                        this.ptr.type = r.isGroup ? e.TYPES.group : e.TYPES.message;
                    }
                }
                if (this.ptr.map) {
                    if (!t.TYPE.test(this.ptr.keyType)) throw Error("illegal key type for map field in " + this.ptr.toString(!0) + ": " + this.ptr.keyType);
                    this.ptr.keyType = e.TYPES[this.ptr.keyType];
                }
            } else if (this.ptr instanceof e.Reflect.Service.Method) {
                if (!(this.ptr instanceof e.Reflect.Service.RPCMethod)) throw Error("illegal service type in " + this.ptr.toString(!0));
                if (r = this.ptr.parent.resolve(this.ptr.requestName, !0), !(r && r instanceof e.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.requestName);
                if (this.ptr.resolvedRequestType = r, r = this.ptr.parent.resolve(this.ptr.responseName, !0), 
                !(r && r instanceof e.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.responseName);
                this.ptr.resolvedResponseType = r;
            } else if (!(this.ptr instanceof e.Reflect.Message.OneOf || this.ptr instanceof e.Reflect.Extension || this.ptr instanceof e.Reflect.Enum.Value)) throw Error("illegal object in namespace: " + typeof this.ptr + ": " + this.ptr);
            return this.reset();
        }, s.build = function(e) {
            if (this.reset(), this.resolved || (this.resolveAll(), this.resolved = !0, this.result = null), 
            null === this.result && (this.result = this.ns.build()), !e) return this.result;
            for (var t = "string" == typeof e ? e.split(".") : e, i = this.result, r = 0; r < t.length; r++) {
                if (!i[t[r]]) {
                    i = null;
                    break;
                }
                i = i[t[r]];
            }
            return i;
        }, s.lookup = function(e, t) {
            return e ? this.ns.resolve(e, t) : this.ns;
        }, s.toString = function() {
            return "Builder";
        }, n.Message = function() {}, n.Enum = function() {}, n.Service = function() {}, 
        n;
    }(i, i.Lang, i.Reflect), i.Map = function(e, t) {
        function i(e) {
            var t = 0;
            return {
                next: function() {
                    return t < e.length ? {
                        done: !1,
                        value: e[t++]
                    } : {
                        done: !0
                    };
                }
            };
        }
        var r = function(e, i) {
            if (!e.map) throw Error("field is not a map");
            if (this.field = e, this.keyElem = new t.Element(e.keyType, null, !0, e.syntax), 
            this.valueElem = new t.Element(e.type, e.resolvedType, !1, e.syntax), this.map = {}, 
            Object.defineProperty(this, "size", {
                get: function() {
                    return Object.keys(this.map).length;
                }
            }), i) for (var r = Object.keys(i), n = 0; n < r.length; n++) {
                var s = this.keyElem.valueFromString(r[n]), o = this.valueElem.verifyValue(i[r[n]]);
                this.map[this.keyElem.valueToString(s)] = {
                    key: s,
                    value: o
                };
            }
        }, n = r.prototype;
        return n.clear = function() {
            this.map = {};
        }, n["delete"] = function(e) {
            var t = this.keyElem.valueToString(this.keyElem.verifyValue(e)), i = t in this.map;
            return delete this.map[t], i;
        }, n.entries = function() {
            for (var e, t = [], r = Object.keys(this.map), n = 0; n < r.length; n++) t.push([ (e = this.map[r[n]]).key, e.value ]);
            return i(t);
        }, n.keys = function() {
            for (var e = [], t = Object.keys(this.map), r = 0; r < t.length; r++) e.push(this.map[t[r]].key);
            return i(e);
        }, n.values = function() {
            for (var e = [], t = Object.keys(this.map), r = 0; r < t.length; r++) e.push(this.map[t[r]].value);
            return i(e);
        }, n.forEach = function(e, t) {
            for (var i, r = Object.keys(this.map), n = 0; n < r.length; n++) e.call(t, (i = this.map[r[n]]).value, i.key, this);
        }, n.set = function(e, t) {
            var i = this.keyElem.verifyValue(e), r = this.valueElem.verifyValue(t);
            return this.map[this.keyElem.valueToString(i)] = {
                key: i,
                value: r
            }, this;
        }, n.get = function(e) {
            var t = this.keyElem.valueToString(this.keyElem.verifyValue(e));
            if (t in this.map) return this.map[t].value;
        }, n.has = function(e) {
            var t = this.keyElem.valueToString(this.keyElem.verifyValue(e));
            return t in this.map;
        }, r;
    }(i, i.Reflect), i.loadProto = function(e, t, r) {
        return ("string" == typeof t || t && "string" == typeof t.file && "string" == typeof t.root) && (r = t, 
        t = void 0), i.loadJson(i.DotProto.Parser.parse(e), t, r);
    }, i.protoFromString = i.loadProto, i.loadProtoFile = function(e, t, r) {
        if (t && "object" == typeof t ? (r = t, t = null) : t && "function" == typeof t || (t = null), 
        t) return i.Util.fetch("string" == typeof e ? e : e.root + "/" + e.file, function(n) {
            if (null === n) return void t(Error("Failed to fetch file"));
            try {
                t(null, i.loadProto(n, r, e));
            } catch (s) {
                t(s);
            }
        });
        var n = i.Util.fetch("object" == typeof e ? e.root + "/" + e.file : e);
        return null === n ? null : i.loadProto(n, r, e);
    }, i.protoFromFile = i.loadProtoFile, i.newBuilder = function(e) {
        return e = e || {}, "undefined" == typeof e.convertFieldsToCamelCase && (e.convertFieldsToCamelCase = i.convertFieldsToCamelCase), 
        "undefined" == typeof e.populateAccessors && (e.populateAccessors = i.populateAccessors), 
        new i.Builder(e);
    }, i.loadJson = function(e, t, r) {
        return ("string" == typeof t || t && "string" == typeof t.file && "string" == typeof t.root) && (r = t, 
        t = null), t && "object" == typeof t || (t = i.newBuilder()), "string" == typeof e && (e = JSON.parse(e)), 
        t["import"](e, r), t.resolveAll(), t;
    }, i.loadJsonFile = function(e, t, r) {
        if (t && "object" == typeof t ? (r = t, t = null) : t && "function" == typeof t || (t = null), 
        t) return i.Util.fetch("string" == typeof e ? e : e.root + "/" + e.file, function(n) {
            if (null === n) return void t(Error("Failed to fetch file"));
            try {
                t(null, i.loadJson(JSON.parse(n), r, e));
            } catch (s) {
                t(s);
            }
        });
        var n = i.Util.fetch("object" == typeof e ? e.root + "/" + e.file : e);
        return null === n ? null : i.loadJson(JSON.parse(n), r, e);
    }, i;
});