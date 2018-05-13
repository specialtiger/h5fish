!function(t, e) {
    (t.dcodeIO = t.dcodeIO || {}).ByteBuffer = e(t.dcodeIO.Long);
}(this, function(t) {
    "use strict";
    function e(t) {
        var e = 0;
        return function() {
            return e < t.length ? t.charCodeAt(e++) : null;
        };
    }
    function r() {
        var t = [], e = [];
        return function() {
            return 0 === arguments.length ? e.join("") + h.apply(String, t) : (t.length + arguments.length > 1024 && (e.push(h.apply(String, t)), 
            t.length = 0), void Array.prototype.push.apply(t, arguments));
        };
    }
    function i(t, e, r, i, n) {
        var f, o, s = 8 * n - i - 1, h = (1 << s) - 1, a = h >> 1, l = -7, u = r ? n - 1 : 0, g = r ? -1 : 1, y = t[e + u];
        for (u += g, f = y & (1 << -l) - 1, y >>= -l, l += s; l > 0; f = 256 * f + t[e + u], 
        u += g, l -= 8) ;
        for (o = f & (1 << -l) - 1, f >>= -l, l += i; l > 0; o = 256 * o + t[e + u], u += g, 
        l -= 8) ;
        if (0 === f) f = 1 - a; else {
            if (f === h) return o ? NaN : (y ? -1 : 1) * (1 / 0);
            o += Math.pow(2, i), f -= a;
        }
        return (y ? -1 : 1) * o * Math.pow(2, f - i);
    }
    function n(t, e, r, i, n, f) {
        var o, s, h, a = 8 * f - n - 1, l = (1 << a) - 1, u = l >> 1, g = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0, y = i ? 0 : f - 1, w = i ? 1 : -1, b = 0 > e || 0 === e && 0 > 1 / e ? 1 : 0;
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, o = l) : (o = Math.floor(Math.log(e) / Math.LN2), 
        e * (h = Math.pow(2, -o)) < 1 && (o--, h *= 2), e += o + u >= 1 ? g / h : g * Math.pow(2, 1 - u), 
        e * h >= 2 && (o++, h /= 2), o + u >= l ? (s = 0, o = l) : o + u >= 1 ? (s = (e * h - 1) * Math.pow(2, n), 
        o += u) : (s = e * Math.pow(2, u - 1) * Math.pow(2, n), o = 0)); n >= 8; t[r + y] = 255 & s, 
        y += w, s /= 256, n -= 8) ;
        for (o = o << n | s, a += n; a > 0; t[r + y] = 255 & o, y += w, o /= 256, a -= 8) ;
        t[r + y - w] |= 128 * b;
    }
    var f = function(t, e, r) {
        if ("undefined" == typeof t && (t = f.DEFAULT_CAPACITY), "undefined" == typeof e && (e = f.DEFAULT_ENDIAN), 
        "undefined" == typeof r && (r = f.DEFAULT_NOASSERT), !r) {
            if (t = 0 | t, 0 > t) throw RangeError("Illegal capacity");
            e = !!e, r = !!r;
        }
        this.buffer = 0 === t ? s : new ArrayBuffer(t), this.view = 0 === t ? null : new Uint8Array(this.buffer), 
        this.offset = 0, this.markedOffset = -1, this.limit = t, this.littleEndian = e, 
        this.noAssert = r;
    };
    f.VERSION = "5.0.1", f.LITTLE_ENDIAN = !0, f.BIG_ENDIAN = !1, f.DEFAULT_CAPACITY = 16, 
    f.DEFAULT_ENDIAN = f.BIG_ENDIAN, f.DEFAULT_NOASSERT = !1, f.Long = t || null;
    var o = f.prototype;
    o.__isByteBuffer__, Object.defineProperty(o, "__isByteBuffer__", {
        value: !0,
        enumerable: !1,
        configurable: !1
    });
    var s = new ArrayBuffer(0), h = String.fromCharCode;
    f.accessor = function() {
        return Uint8Array;
    }, f.allocate = function(t, e, r) {
        return new f(t, e, r);
    }, f.concat = function(t, e, r, i) {
        "boolean" != typeof e && "string" == typeof e || (i = r, r = e, e = void 0);
        for (var n, o = 0, s = 0, h = t.length; h > s; ++s) f.isByteBuffer(t[s]) || (t[s] = f.wrap(t[s], e)), 
        n = t[s].limit - t[s].offset, n > 0 && (o += n);
        if (0 === o) return new f(0, r, i);
        var a, l = new f(o, r, i);
        for (s = 0; h > s; ) a = t[s++], n = a.limit - a.offset, 0 >= n || (l.view.set(a.view.subarray(a.offset, a.limit), l.offset), 
        l.offset += n);
        return l.limit = l.offset, l.offset = 0, l;
    }, f.isByteBuffer = function(t) {
        return (t && t.__isByteBuffer__) === !0;
    }, f.type = function() {
        return ArrayBuffer;
    }, f.wrap = function(t, e, r, i) {
        if ("string" != typeof e && (i = r, r = e, e = void 0), "string" == typeof t) switch ("undefined" == typeof e && (e = "utf8"), 
        e) {
          case "base64":
            return f.fromBase64(t, r);

          case "hex":
            return f.fromHex(t, r);

          case "binary":
            return f.fromBinary(t, r);

          case "utf8":
            return f.fromUTF8(t, r);

          case "debug":
            return f.fromDebug(t, r);

          default:
            throw Error("Unsupported encoding: " + e);
        }
        if (null === t || "object" != typeof t) throw TypeError("Illegal buffer");
        var n;
        if (f.isByteBuffer(t)) return n = o.clone.call(t), n.markedOffset = -1, n;
        if (t instanceof Uint8Array) n = new f(0, r, i), t.length > 0 && (n.buffer = t.buffer, 
        n.offset = t.byteOffset, n.limit = t.byteOffset + t.byteLength, n.view = new Uint8Array(t.buffer)); else if (t instanceof ArrayBuffer) n = new f(0, r, i), 
        t.byteLength > 0 && (n.buffer = t, n.offset = 0, n.limit = t.byteLength, n.view = t.byteLength > 0 ? new Uint8Array(t) : null); else {
            if ("[object Array]" !== Object.prototype.toString.call(t)) throw TypeError("Illegal buffer");
            n = new f(t.length, r, i), n.limit = t.length;
            for (var s = 0; s < t.length; ++s) n.view[s] = t[s];
        }
        return n;
    }, o.writeBitSet = function(t, e) {
        var r = "undefined" == typeof e;
        if (r && (e = this.offset), !this.noAssert) {
            if (!(t instanceof Array)) throw TypeError("Illegal BitSet: Not an array");
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength);
        }
        var i, n = e, f = t.length, o = f >> 3, s = 0;
        for (e += this.writeVarint32(f, e); o--; ) i = 1 & !!t[s++] | (1 & !!t[s++]) << 1 | (1 & !!t[s++]) << 2 | (1 & !!t[s++]) << 3 | (1 & !!t[s++]) << 4 | (1 & !!t[s++]) << 5 | (1 & !!t[s++]) << 6 | (1 & !!t[s++]) << 7, 
        this.writeByte(i, e++);
        if (f > s) {
            var h = 0;
            for (i = 0; f > s; ) i |= (1 & !!t[s++]) << h++;
            this.writeByte(i, e++);
        }
        return r ? (this.offset = e, this) : e - n;
    }, o.readBitSet = function(t) {
        var e = "undefined" == typeof t;
        e && (t = this.offset);
        var r, i = this.readVarint32(t), n = i.value, f = n >> 3, o = 0, s = [];
        for (t += i.length; f--; ) r = this.readByte(t++), s[o++] = !!(1 & r), s[o++] = !!(2 & r), 
        s[o++] = !!(4 & r), s[o++] = !!(8 & r), s[o++] = !!(16 & r), s[o++] = !!(32 & r), 
        s[o++] = !!(64 & r), s[o++] = !!(128 & r);
        if (n > o) {
            var h = 0;
            for (r = this.readByte(t++); n > o; ) s[o++] = !!(r >> h++ & 1);
        }
        return e && (this.offset = t), s;
    }, o.readBytes = function(t, e) {
        var r = "undefined" == typeof e;
        if (r && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + t > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+" + t + ") <= " + this.buffer.byteLength);
        }
        var i = this.slice(e, e + t);
        return r && (this.offset += t), i;
    }, o.writeBytes = o.append, o.writeInt8 = function(t, e) {
        var r = "undefined" == typeof e;
        if (r && (e = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal value: " + t + " (not an integer)");
            if (t |= 0, "number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength);
        }
        e += 1;
        var i = this.buffer.byteLength;
        return e > i && this.resize((i *= 2) > e ? i : e), e -= 1, this.view[e] = t, r && (this.offset += 1), 
        this;
    }, o.writeByte = o.writeInt8, o.readInt8 = function(t) {
        var e = "undefined" == typeof t;
        if (e && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+1) <= " + this.buffer.byteLength);
        }
        var r = this.view[t];
        return 128 === (128 & r) && (r = -(255 - r + 1)), e && (this.offset += 1), r;
    }, o.readByte = o.readInt8, o.writeUint8 = function(t, e) {
        var r = "undefined" == typeof e;
        if (r && (e = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal value: " + t + " (not an integer)");
            if (t >>>= 0, "number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength);
        }
        e += 1;
        var i = this.buffer.byteLength;
        return e > i && this.resize((i *= 2) > e ? i : e), e -= 1, this.view[e] = t, r && (this.offset += 1), 
        this;
    }, o.writeUInt8 = o.writeUint8, o.readUint8 = function(t) {
        var e = "undefined" == typeof t;
        if (e && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+1) <= " + this.buffer.byteLength);
        }
        var r = this.view[t];
        return e && (this.offset += 1), r;
    }, o.readUInt8 = o.readUint8, o.writeInt16 = function(t, e) {
        var r = "undefined" == typeof e;
        if (r && (e = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal value: " + t + " (not an integer)");
            if (t |= 0, "number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength);
        }
        e += 2;
        var i = this.buffer.byteLength;
        return e > i && this.resize((i *= 2) > e ? i : e), e -= 2, this.littleEndian ? (this.view[e + 1] = (65280 & t) >>> 8, 
        this.view[e] = 255 & t) : (this.view[e] = (65280 & t) >>> 8, this.view[e + 1] = 255 & t), 
        r && (this.offset += 2), this;
    }, o.writeShort = o.writeInt16, o.readInt16 = function(t) {
        var e = "undefined" == typeof t;
        if (e && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+2) <= " + this.buffer.byteLength);
        }
        var r = 0;
        return this.littleEndian ? (r = this.view[t], r |= this.view[t + 1] << 8) : (r = this.view[t] << 8, 
        r |= this.view[t + 1]), 32768 === (32768 & r) && (r = -(65535 - r + 1)), e && (this.offset += 2), 
        r;
    }, o.readShort = o.readInt16, o.writeUint16 = function(t, e) {
        var r = "undefined" == typeof e;
        if (r && (e = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal value: " + t + " (not an integer)");
            if (t >>>= 0, "number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength);
        }
        e += 2;
        var i = this.buffer.byteLength;
        return e > i && this.resize((i *= 2) > e ? i : e), e -= 2, this.littleEndian ? (this.view[e + 1] = (65280 & t) >>> 8, 
        this.view[e] = 255 & t) : (this.view[e] = (65280 & t) >>> 8, this.view[e + 1] = 255 & t), 
        r && (this.offset += 2), this;
    }, o.writeUInt16 = o.writeUint16, o.readUint16 = function(t) {
        var e = "undefined" == typeof t;
        if (e && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+2) <= " + this.buffer.byteLength);
        }
        var r = 0;
        return this.littleEndian ? (r = this.view[t], r |= this.view[t + 1] << 8) : (r = this.view[t] << 8, 
        r |= this.view[t + 1]), e && (this.offset += 2), r;
    }, o.readUInt16 = o.readUint16, o.writeInt32 = function(t, e) {
        var r = "undefined" == typeof e;
        if (r && (e = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal value: " + t + " (not an integer)");
            if (t |= 0, "number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength);
        }
        e += 4;
        var i = this.buffer.byteLength;
        return e > i && this.resize((i *= 2) > e ? i : e), e -= 4, this.littleEndian ? (this.view[e + 3] = t >>> 24 & 255, 
        this.view[e + 2] = t >>> 16 & 255, this.view[e + 1] = t >>> 8 & 255, this.view[e] = 255 & t) : (this.view[e] = t >>> 24 & 255, 
        this.view[e + 1] = t >>> 16 & 255, this.view[e + 2] = t >>> 8 & 255, this.view[e + 3] = 255 & t), 
        r && (this.offset += 4), this;
    }, o.writeInt = o.writeInt32, o.readInt32 = function(t) {
        var e = "undefined" == typeof t;
        if (e && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+4) <= " + this.buffer.byteLength);
        }
        var r = 0;
        return this.littleEndian ? (r = this.view[t + 2] << 16, r |= this.view[t + 1] << 8, 
        r |= this.view[t], r += this.view[t + 3] << 24 >>> 0) : (r = this.view[t + 1] << 16, 
        r |= this.view[t + 2] << 8, r |= this.view[t + 3], r += this.view[t] << 24 >>> 0), 
        r |= 0, e && (this.offset += 4), r;
    }, o.readInt = o.readInt32, o.writeUint32 = function(t, e) {
        var r = "undefined" == typeof e;
        if (r && (e = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal value: " + t + " (not an integer)");
            if (t >>>= 0, "number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength);
        }
        e += 4;
        var i = this.buffer.byteLength;
        return e > i && this.resize((i *= 2) > e ? i : e), e -= 4, this.littleEndian ? (this.view[e + 3] = t >>> 24 & 255, 
        this.view[e + 2] = t >>> 16 & 255, this.view[e + 1] = t >>> 8 & 255, this.view[e] = 255 & t) : (this.view[e] = t >>> 24 & 255, 
        this.view[e + 1] = t >>> 16 & 255, this.view[e + 2] = t >>> 8 & 255, this.view[e + 3] = 255 & t), 
        r && (this.offset += 4), this;
    }, o.writeUInt32 = o.writeUint32, o.readUint32 = function(t) {
        var e = "undefined" == typeof t;
        if (e && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+4) <= " + this.buffer.byteLength);
        }
        var r = 0;
        return this.littleEndian ? (r = this.view[t + 2] << 16, r |= this.view[t + 1] << 8, 
        r |= this.view[t], r += this.view[t + 3] << 24 >>> 0) : (r = this.view[t + 1] << 16, 
        r |= this.view[t + 2] << 8, r |= this.view[t + 3], r += this.view[t] << 24 >>> 0), 
        e && (this.offset += 4), r;
    }, o.readUInt32 = o.readUint32, t && (o.writeInt64 = function(e, r) {
        var i = "undefined" == typeof r;
        if (i && (r = this.offset), !this.noAssert) {
            if ("number" == typeof e) e = t.fromNumber(e); else if ("string" == typeof e) e = t.fromString(e); else if (!(e && e instanceof t)) throw TypeError("Illegal value: " + e + " (not an integer or Long)");
            if ("number" != typeof r || r % 1 !== 0) throw TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength);
        }
        "number" == typeof e ? e = t.fromNumber(e) : "string" == typeof e && (e = t.fromString(e)), 
        r += 8;
        var n = this.buffer.byteLength;
        r > n && this.resize((n *= 2) > r ? n : r), r -= 8;
        var f = e.low, o = e.high;
        return this.littleEndian ? (this.view[r + 3] = f >>> 24 & 255, this.view[r + 2] = f >>> 16 & 255, 
        this.view[r + 1] = f >>> 8 & 255, this.view[r] = 255 & f, r += 4, this.view[r + 3] = o >>> 24 & 255, 
        this.view[r + 2] = o >>> 16 & 255, this.view[r + 1] = o >>> 8 & 255, this.view[r] = 255 & o) : (this.view[r] = o >>> 24 & 255, 
        this.view[r + 1] = o >>> 16 & 255, this.view[r + 2] = o >>> 8 & 255, this.view[r + 3] = 255 & o, 
        r += 4, this.view[r] = f >>> 24 & 255, this.view[r + 1] = f >>> 16 & 255, this.view[r + 2] = f >>> 8 & 255, 
        this.view[r + 3] = 255 & f), i && (this.offset += 8), this;
    }, o.writeLong = o.writeInt64, o.readInt64 = function(e) {
        var r = "undefined" == typeof e;
        if (r && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+8) <= " + this.buffer.byteLength);
        }
        var i = 0, n = 0;
        this.littleEndian ? (i = this.view[e + 2] << 16, i |= this.view[e + 1] << 8, i |= this.view[e], 
        i += this.view[e + 3] << 24 >>> 0, e += 4, n = this.view[e + 2] << 16, n |= this.view[e + 1] << 8, 
        n |= this.view[e], n += this.view[e + 3] << 24 >>> 0) : (n = this.view[e + 1] << 16, 
        n |= this.view[e + 2] << 8, n |= this.view[e + 3], n += this.view[e] << 24 >>> 0, 
        e += 4, i = this.view[e + 1] << 16, i |= this.view[e + 2] << 8, i |= this.view[e + 3], 
        i += this.view[e] << 24 >>> 0);
        var f = new t(i, n, !1);
        return r && (this.offset += 8), f;
    }, o.readLong = o.readInt64, o.writeUint64 = function(e, r) {
        var i = "undefined" == typeof r;
        if (i && (r = this.offset), !this.noAssert) {
            if ("number" == typeof e) e = t.fromNumber(e); else if ("string" == typeof e) e = t.fromString(e); else if (!(e && e instanceof t)) throw TypeError("Illegal value: " + e + " (not an integer or Long)");
            if ("number" != typeof r || r % 1 !== 0) throw TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength);
        }
        "number" == typeof e ? e = t.fromNumber(e) : "string" == typeof e && (e = t.fromString(e)), 
        r += 8;
        var n = this.buffer.byteLength;
        r > n && this.resize((n *= 2) > r ? n : r), r -= 8;
        var f = e.low, o = e.high;
        return this.littleEndian ? (this.view[r + 3] = f >>> 24 & 255, this.view[r + 2] = f >>> 16 & 255, 
        this.view[r + 1] = f >>> 8 & 255, this.view[r] = 255 & f, r += 4, this.view[r + 3] = o >>> 24 & 255, 
        this.view[r + 2] = o >>> 16 & 255, this.view[r + 1] = o >>> 8 & 255, this.view[r] = 255 & o) : (this.view[r] = o >>> 24 & 255, 
        this.view[r + 1] = o >>> 16 & 255, this.view[r + 2] = o >>> 8 & 255, this.view[r + 3] = 255 & o, 
        r += 4, this.view[r] = f >>> 24 & 255, this.view[r + 1] = f >>> 16 & 255, this.view[r + 2] = f >>> 8 & 255, 
        this.view[r + 3] = 255 & f), i && (this.offset += 8), this;
    }, o.writeUInt64 = o.writeUint64, o.readUint64 = function(e) {
        var r = "undefined" == typeof e;
        if (r && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+8) <= " + this.buffer.byteLength);
        }
        var i = 0, n = 0;
        this.littleEndian ? (i = this.view[e + 2] << 16, i |= this.view[e + 1] << 8, i |= this.view[e], 
        i += this.view[e + 3] << 24 >>> 0, e += 4, n = this.view[e + 2] << 16, n |= this.view[e + 1] << 8, 
        n |= this.view[e], n += this.view[e + 3] << 24 >>> 0) : (n = this.view[e + 1] << 16, 
        n |= this.view[e + 2] << 8, n |= this.view[e + 3], n += this.view[e] << 24 >>> 0, 
        e += 4, i = this.view[e + 1] << 16, i |= this.view[e + 2] << 8, i |= this.view[e + 3], 
        i += this.view[e] << 24 >>> 0);
        var f = new t(i, n, !0);
        return r && (this.offset += 8), f;
    }, o.readUInt64 = o.readUint64), o.writeFloat32 = function(t, e) {
        var r = "undefined" == typeof e;
        if (r && (e = this.offset), !this.noAssert) {
            if ("number" != typeof t) throw TypeError("Illegal value: " + t + " (not a number)");
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength);
        }
        e += 4;
        var i = this.buffer.byteLength;
        return e > i && this.resize((i *= 2) > e ? i : e), e -= 4, n(this.view, t, e, this.littleEndian, 23, 4), 
        r && (this.offset += 4), this;
    }, o.writeFloat = o.writeFloat32, o.readFloat32 = function(t) {
        var e = "undefined" == typeof t;
        if (e && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+4) <= " + this.buffer.byteLength);
        }
        var r = i(this.view, t, this.littleEndian, 23, 4);
        return e && (this.offset += 4), r;
    }, o.readFloat = o.readFloat32, o.writeFloat64 = function(t, e) {
        var r = "undefined" == typeof e;
        if (r && (e = this.offset), !this.noAssert) {
            if ("number" != typeof t) throw TypeError("Illegal value: " + t + " (not a number)");
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength);
        }
        e += 8;
        var i = this.buffer.byteLength;
        return e > i && this.resize((i *= 2) > e ? i : e), e -= 8, n(this.view, t, e, this.littleEndian, 52, 8), 
        r && (this.offset += 8), this;
    }, o.writeDouble = o.writeFloat64, o.readFloat64 = function(t) {
        var e = "undefined" == typeof t;
        if (e && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+8) <= " + this.buffer.byteLength);
        }
        var r = i(this.view, t, this.littleEndian, 52, 8);
        return e && (this.offset += 8), r;
    }, o.readDouble = o.readFloat64, f.MAX_VARINT32_BYTES = 5, f.calculateVarint32 = function(t) {
        return t >>>= 0, 128 > t ? 1 : 16384 > t ? 2 : 1 << 21 > t ? 3 : 1 << 28 > t ? 4 : 5;
    }, f.zigZagEncode32 = function(t) {
        return ((t |= 0) << 1 ^ t >> 31) >>> 0;
    }, f.zigZagDecode32 = function(t) {
        return t >>> 1 ^ -(1 & t) | 0;
    }, o.writeVarint32 = function(t, e) {
        var r = "undefined" == typeof e;
        if (r && (e = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal value: " + t + " (not an integer)");
            if (t |= 0, "number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength);
        }
        var i, n = f.calculateVarint32(t);
        e += n;
        var o = this.buffer.byteLength;
        for (e > o && this.resize((o *= 2) > e ? o : e), e -= n, t >>>= 0; t >= 128; ) i = 127 & t | 128, 
        this.view[e++] = i, t >>>= 7;
        return this.view[e++] = t, r ? (this.offset = e, this) : n;
    }, o.writeVarint32ZigZag = function(t, e) {
        return this.writeVarint32(f.zigZagEncode32(t), e);
    }, o.readVarint32 = function(t) {
        var e = "undefined" == typeof t;
        if (e && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+1) <= " + this.buffer.byteLength);
        }
        var r, i = 0, n = 0;
        do {
            if (!this.noAssert && t > this.limit) {
                var f = Error("Truncated");
                throw f.truncated = !0, f;
            }
            r = this.view[t++], 5 > i && (n |= (127 & r) << 7 * i), ++i;
        } while (0 !== (128 & r));
        return n |= 0, e ? (this.offset = t, n) : {
            value: n,
            length: i
        };
    }, o.readVarint32ZigZag = function(t) {
        var e = this.readVarint32(t);
        return "object" == typeof e ? e.value = f.zigZagDecode32(e.value) : e = f.zigZagDecode32(e), 
        e;
    }, t && (f.MAX_VARINT64_BYTES = 10, f.calculateVarint64 = function(e) {
        "number" == typeof e ? e = t.fromNumber(e) : "string" == typeof e && (e = t.fromString(e));
        var r = e.toInt() >>> 0, i = e.shiftRightUnsigned(28).toInt() >>> 0, n = e.shiftRightUnsigned(56).toInt() >>> 0;
        return 0 == n ? 0 == i ? 16384 > r ? 128 > r ? 1 : 2 : 1 << 21 > r ? 3 : 4 : 16384 > i ? 128 > i ? 5 : 6 : 1 << 21 > i ? 7 : 8 : 128 > n ? 9 : 10;
    }, f.zigZagEncode64 = function(e) {
        return "number" == typeof e ? e = t.fromNumber(e, !1) : "string" == typeof e ? e = t.fromString(e, !1) : e.unsigned !== !1 && (e = e.toSigned()), 
        e.shiftLeft(1).xor(e.shiftRight(63)).toUnsigned();
    }, f.zigZagDecode64 = function(e) {
        return "number" == typeof e ? e = t.fromNumber(e, !1) : "string" == typeof e ? e = t.fromString(e, !1) : e.unsigned !== !1 && (e = e.toSigned()), 
        e.shiftRightUnsigned(1).xor(e.and(t.ONE).toSigned().negate()).toSigned();
    }, o.writeVarint64 = function(e, r) {
        var i = "undefined" == typeof r;
        if (i && (r = this.offset), !this.noAssert) {
            if ("number" == typeof e) e = t.fromNumber(e); else if ("string" == typeof e) e = t.fromString(e); else if (!(e && e instanceof t)) throw TypeError("Illegal value: " + e + " (not an integer or Long)");
            if ("number" != typeof r || r % 1 !== 0) throw TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength);
        }
        "number" == typeof e ? e = t.fromNumber(e, !1) : "string" == typeof e ? e = t.fromString(e, !1) : e.unsigned !== !1 && (e = e.toSigned());
        var n = f.calculateVarint64(e), o = e.toInt() >>> 0, s = e.shiftRightUnsigned(28).toInt() >>> 0, h = e.shiftRightUnsigned(56).toInt() >>> 0;
        r += n;
        var a = this.buffer.byteLength;
        switch (r > a && this.resize((a *= 2) > r ? a : r), r -= n, n) {
          case 10:
            this.view[r + 9] = h >>> 7 & 1;

          case 9:
            this.view[r + 8] = 9 !== n ? 128 | h : 127 & h;

          case 8:
            this.view[r + 7] = 8 !== n ? s >>> 21 | 128 : s >>> 21 & 127;

          case 7:
            this.view[r + 6] = 7 !== n ? s >>> 14 | 128 : s >>> 14 & 127;

          case 6:
            this.view[r + 5] = 6 !== n ? s >>> 7 | 128 : s >>> 7 & 127;

          case 5:
            this.view[r + 4] = 5 !== n ? 128 | s : 127 & s;

          case 4:
            this.view[r + 3] = 4 !== n ? o >>> 21 | 128 : o >>> 21 & 127;

          case 3:
            this.view[r + 2] = 3 !== n ? o >>> 14 | 128 : o >>> 14 & 127;

          case 2:
            this.view[r + 1] = 2 !== n ? o >>> 7 | 128 : o >>> 7 & 127;

          case 1:
            this.view[r] = 1 !== n ? 128 | o : 127 & o;
        }
        return i ? (this.offset += n, this) : n;
    }, o.writeVarint64ZigZag = function(t, e) {
        return this.writeVarint64(f.zigZagEncode64(t), e);
    }, o.readVarint64 = function(e) {
        var r = "undefined" == typeof e;
        if (r && (e = this.offset), !this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
            if (e >>>= 0, 0 > e || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength);
        }
        var i = e, n = 0, f = 0, o = 0, s = 0;
        if (s = this.view[e++], n = 127 & s, 128 & s && (s = this.view[e++], n |= (127 & s) << 7, 
        (128 & s || this.noAssert && "undefined" == typeof s) && (s = this.view[e++], n |= (127 & s) << 14, 
        (128 & s || this.noAssert && "undefined" == typeof s) && (s = this.view[e++], n |= (127 & s) << 21, 
        (128 & s || this.noAssert && "undefined" == typeof s) && (s = this.view[e++], f = 127 & s, 
        (128 & s || this.noAssert && "undefined" == typeof s) && (s = this.view[e++], f |= (127 & s) << 7, 
        (128 & s || this.noAssert && "undefined" == typeof s) && (s = this.view[e++], f |= (127 & s) << 14, 
        (128 & s || this.noAssert && "undefined" == typeof s) && (s = this.view[e++], f |= (127 & s) << 21, 
        (128 & s || this.noAssert && "undefined" == typeof s) && (s = this.view[e++], o = 127 & s, 
        (128 & s || this.noAssert && "undefined" == typeof s) && (s = this.view[e++], o |= (127 & s) << 7, 
        128 & s || this.noAssert && "undefined" == typeof s)))))))))) throw Error("Buffer overrun");
        var h = t.fromBits(n | f << 28, f >>> 4 | o << 24, !1);
        return r ? (this.offset = e, h) : {
            value: h,
            length: e - i
        };
    }, o.readVarint64ZigZag = function(e) {
        var r = this.readVarint64(e);
        return r && r.value instanceof t ? r.value = f.zigZagDecode64(r.value) : r = f.zigZagDecode64(r), 
        r;
    }), o.writeCString = function(t, r) {
        var i = "undefined" == typeof r;
        i && (r = this.offset);
        var n, f = t.length;
        if (!this.noAssert) {
            if ("string" != typeof t) throw TypeError("Illegal str: Not a string");
            for (n = 0; f > n; ++n) if (0 === t.charCodeAt(n)) throw RangeError("Illegal str: Contains NULL-characters");
            if ("number" != typeof r || r % 1 !== 0) throw TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength);
        }
        f = l.calculateUTF16asUTF8(e(t))[1], r += f + 1;
        var o = this.buffer.byteLength;
        return r > o && this.resize((o *= 2) > r ? o : r), r -= f + 1, l.encodeUTF16toUTF8(e(t), function(t) {
            this.view[r++] = t;
        }.bind(this)), this.view[r++] = 0, i ? (this.offset = r, this) : f;
    }, o.readCString = function(t) {
        var e = "undefined" == typeof t;
        if (e && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+1) <= " + this.buffer.byteLength);
        }
        var i, n = t, f = -1;
        return l.decodeUTF8toUTF16(function() {
            if (0 === f) return null;
            if (t >= this.limit) throw RangeError("Illegal range: Truncated data, " + t + " < " + this.limit);
            return f = this.view[t++], 0 === f ? null : f;
        }.bind(this), i = r(), !0), e ? (this.offset = t, i()) : {
            string: i(),
            length: t - n
        };
    }, o.writeIString = function(t, r) {
        var i = "undefined" == typeof r;
        if (i && (r = this.offset), !this.noAssert) {
            if ("string" != typeof t) throw TypeError("Illegal str: Not a string");
            if ("number" != typeof r || r % 1 !== 0) throw TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength);
        }
        var n, f = r;
        n = l.calculateUTF16asUTF8(e(t), this.noAssert)[1], r += 4 + n;
        var o = this.buffer.byteLength;
        if (r > o && this.resize((o *= 2) > r ? o : r), r -= 4 + n, this.littleEndian ? (this.view[r + 3] = n >>> 24 & 255, 
        this.view[r + 2] = n >>> 16 & 255, this.view[r + 1] = n >>> 8 & 255, this.view[r] = 255 & n) : (this.view[r] = n >>> 24 & 255, 
        this.view[r + 1] = n >>> 16 & 255, this.view[r + 2] = n >>> 8 & 255, this.view[r + 3] = 255 & n), 
        r += 4, l.encodeUTF16toUTF8(e(t), function(t) {
            this.view[r++] = t;
        }.bind(this)), r !== f + 4 + n) throw RangeError("Illegal range: Truncated data, " + r + " == " + (r + 4 + n));
        return i ? (this.offset = r, this) : r - f;
    }, o.readIString = function(t) {
        var e = "undefined" == typeof t;
        if (e && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+4) <= " + this.buffer.byteLength);
        }
        var r = t, i = this.readUint32(t), n = this.readUTF8String(i, f.METRICS_BYTES, t += 4);
        return t += n.length, e ? (this.offset = t, n.string) : {
            string: n.string,
            length: t - r
        };
    }, f.METRICS_CHARS = "c", f.METRICS_BYTES = "b", o.writeUTF8String = function(t, r) {
        var i = "undefined" == typeof r;
        if (i && (r = this.offset), !this.noAssert) {
            if ("number" != typeof r || r % 1 !== 0) throw TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength);
        }
        var n, f = r;
        n = l.calculateUTF16asUTF8(e(t))[1], r += n;
        var o = this.buffer.byteLength;
        return r > o && this.resize((o *= 2) > r ? o : r), r -= n, l.encodeUTF16toUTF8(e(t), function(t) {
            this.view[r++] = t;
        }.bind(this)), i ? (this.offset = r, this) : r - f;
    }, o.writeString = o.writeUTF8String, f.calculateUTF8Chars = function(t) {
        return l.calculateUTF16asUTF8(e(t))[0];
    }, f.calculateUTF8Bytes = function(t) {
        return l.calculateUTF16asUTF8(e(t))[1];
    }, f.calculateString = f.calculateUTF8Bytes, o.readUTF8String = function(t, e, i) {
        "number" == typeof e && (i = e, e = void 0);
        var n = "undefined" == typeof i;
        if (n && (i = this.offset), "undefined" == typeof e && (e = f.METRICS_CHARS), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal length: " + t + " (not an integer)");
            if (t |= 0, "number" != typeof i || i % 1 !== 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
            if (i >>>= 0, 0 > i || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength);
        }
        var o, s = 0, h = i;
        if (e === f.METRICS_CHARS) {
            if (o = r(), l.decodeUTF8(function() {
                return t > s && i < this.limit ? this.view[i++] : null;
            }.bind(this), function(t) {
                ++s, l.UTF8toUTF16(t, o);
            }), s !== t) throw RangeError("Illegal range: Truncated data, " + s + " == " + t);
            return n ? (this.offset = i, o()) : {
                string: o(),
                length: i - h
            };
        }
        if (e === f.METRICS_BYTES) {
            if (!this.noAssert) {
                if ("number" != typeof i || i % 1 !== 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
                if (i >>>= 0, 0 > i || i + t > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+" + t + ") <= " + this.buffer.byteLength);
            }
            var a = i + t;
            if (l.decodeUTF8toUTF16(function() {
                return a > i ? this.view[i++] : null;
            }.bind(this), o = r(), this.noAssert), i !== a) throw RangeError("Illegal range: Truncated data, " + i + " == " + a);
            return n ? (this.offset = i, o()) : {
                string: o(),
                length: i - h
            };
        }
        throw TypeError("Unsupported metrics: " + e);
    }, o.readString = o.readUTF8String, o.writeVString = function(t, r) {
        var i = "undefined" == typeof r;
        if (i && (r = this.offset), !this.noAssert) {
            if ("string" != typeof t) throw TypeError("Illegal str: Not a string");
            if ("number" != typeof r || r % 1 !== 0) throw TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength);
        }
        var n, o, s = r;
        n = l.calculateUTF16asUTF8(e(t), this.noAssert)[1], o = f.calculateVarint32(n), 
        r += o + n;
        var h = this.buffer.byteLength;
        if (r > h && this.resize((h *= 2) > r ? h : r), r -= o + n, r += this.writeVarint32(n, r), 
        l.encodeUTF16toUTF8(e(t), function(t) {
            this.view[r++] = t;
        }.bind(this)), r !== s + n + o) throw RangeError("Illegal range: Truncated data, " + r + " == " + (r + n + o));
        return i ? (this.offset = r, this) : r - s;
    }, o.readVString = function(t) {
        var e = "undefined" == typeof t;
        if (e && (t = this.offset), !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+1) <= " + this.buffer.byteLength);
        }
        var r = t, i = this.readVarint32(t), n = this.readUTF8String(i.value, f.METRICS_BYTES, t += i.length);
        return t += n.length, e ? (this.offset = t, n.string) : {
            string: n.string,
            length: t - r
        };
    }, o.append = function(t, e, r) {
        "number" != typeof e && "string" == typeof e || (r = e, e = void 0);
        var i = "undefined" == typeof r;
        if (i && (r = this.offset), !this.noAssert) {
            if ("number" != typeof r || r % 1 !== 0) throw TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength);
        }
        t instanceof f || (t = f.wrap(t, e));
        var n = t.limit - t.offset;
        if (0 >= n) return this;
        r += n;
        var o = this.buffer.byteLength;
        return r > o && this.resize((o *= 2) > r ? o : r), r -= n, this.view.set(t.view.subarray(t.offset, t.limit), r), 
        t.offset += n, i && (this.offset += n), this;
    }, o.appendTo = function(t, e) {
        return t.append(this, e), this;
    }, o.assert = function(t) {
        return this.noAssert = !t, this;
    }, o.capacity = function() {
        return this.buffer.byteLength;
    }, o.clear = function() {
        return this.offset = 0, this.limit = this.buffer.byteLength, this.markedOffset = -1, 
        this;
    }, o.clone = function(t) {
        var e = new f(0, this.littleEndian, this.noAssert);
        return t ? (e.buffer = new ArrayBuffer(this.buffer.byteLength), e.view = new Uint8Array(e.buffer)) : (e.buffer = this.buffer, 
        e.view = this.view), e.offset = this.offset, e.markedOffset = this.markedOffset, 
        e.limit = this.limit, e;
    }, o.compact = function(t, e) {
        if ("undefined" == typeof t && (t = this.offset), "undefined" == typeof e && (e = this.limit), 
        !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
            if (t >>>= 0, "number" != typeof e || e % 1 !== 0) throw TypeError("Illegal end: Not an integer");
            if (e >>>= 0, 0 > t || t > e || e > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + t + " <= " + e + " <= " + this.buffer.byteLength);
        }
        if (0 === t && e === this.buffer.byteLength) return this;
        var r = e - t;
        if (0 === r) return this.buffer = s, this.view = null, this.markedOffset >= 0 && (this.markedOffset -= t), 
        this.offset = 0, this.limit = 0, this;
        var i = new ArrayBuffer(r), n = new Uint8Array(i);
        return n.set(this.view.subarray(t, e)), this.buffer = i, this.view = n, this.markedOffset >= 0 && (this.markedOffset -= t), 
        this.offset = 0, this.limit = r, this;
    }, o.copy = function(t, e) {
        if ("undefined" == typeof t && (t = this.offset), "undefined" == typeof e && (e = this.limit), 
        !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
            if (t >>>= 0, "number" != typeof e || e % 1 !== 0) throw TypeError("Illegal end: Not an integer");
            if (e >>>= 0, 0 > t || t > e || e > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + t + " <= " + e + " <= " + this.buffer.byteLength);
        }
        if (t === e) return new f(0, this.littleEndian, this.noAssert);
        var r = e - t, i = new f(r, this.littleEndian, this.noAssert);
        return i.offset = 0, i.limit = r, i.markedOffset >= 0 && (i.markedOffset -= t), 
        this.copyTo(i, 0, t, e), i;
    }, o.copyTo = function(t, e, r, i) {
        var n, o;
        if (!this.noAssert && !f.isByteBuffer(t)) throw TypeError("Illegal target: Not a ByteBuffer");
        if (e = (o = "undefined" == typeof e) ? t.offset : 0 | e, r = (n = "undefined" == typeof r) ? this.offset : 0 | r, 
        i = "undefined" == typeof i ? this.limit : 0 | i, 0 > e || e > t.buffer.byteLength) throw RangeError("Illegal target range: 0 <= " + e + " <= " + t.buffer.byteLength);
        if (0 > r || i > this.buffer.byteLength) throw RangeError("Illegal source range: 0 <= " + r + " <= " + this.buffer.byteLength);
        var s = i - r;
        return 0 === s ? t : (t.ensureCapacity(e + s), t.view.set(this.view.subarray(r, i), e), 
        n && (this.offset += s), o && (t.offset += s), this);
    }, o.ensureCapacity = function(t) {
        var e = this.buffer.byteLength;
        return t > e ? this.resize((e *= 2) > t ? e : t) : this;
    }, o.fill = function(t, e, r) {
        var i = "undefined" == typeof e;
        if (i && (e = this.offset), "string" == typeof t && t.length > 0 && (t = t.charCodeAt(0)), 
        "undefined" == typeof e && (e = this.offset), "undefined" == typeof r && (r = this.limit), 
        !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal value: " + t + " (not an integer)");
            if (t |= 0, "number" != typeof e || e % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
            if (e >>>= 0, "number" != typeof r || r % 1 !== 0) throw TypeError("Illegal end: Not an integer");
            if (r >>>= 0, 0 > e || e > r || r > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + r + " <= " + this.buffer.byteLength);
        }
        if (e >= r) return this;
        for (;r > e; ) this.view[e++] = t;
        return i && (this.offset = e), this;
    }, o.flip = function() {
        return this.limit = this.offset, this.offset = 0, this;
    }, o.mark = function(t) {
        if (t = "undefined" == typeof t ? this.offset : t, !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
            if (t >>>= 0, 0 > t || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
        }
        return this.markedOffset = t, this;
    }, o.order = function(t) {
        if (!this.noAssert && "boolean" != typeof t) throw TypeError("Illegal littleEndian: Not a boolean");
        return this.littleEndian = !!t, this;
    }, o.LE = function(t) {
        return this.littleEndian = "undefined" != typeof t ? !!t : !0, this;
    }, o.BE = function(t) {
        return this.littleEndian = "undefined" != typeof t ? !t : !1, this;
    }, o.prepend = function(t, e, r) {
        "number" != typeof e && "string" == typeof e || (r = e, e = void 0);
        var i = "undefined" == typeof r;
        if (i && (r = this.offset), !this.noAssert) {
            if ("number" != typeof r || r % 1 !== 0) throw TypeError("Illegal offset: " + r + " (not an integer)");
            if (r >>>= 0, 0 > r || r + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + r + " (+0) <= " + this.buffer.byteLength);
        }
        t instanceof f || (t = f.wrap(t, e));
        var n = t.limit - t.offset;
        if (0 >= n) return this;
        var o = n - r;
        if (o > 0) {
            var s = new ArrayBuffer(this.buffer.byteLength + o), h = new Uint8Array(s);
            h.set(this.view.subarray(r, this.buffer.byteLength), n), this.buffer = s, this.view = h, 
            this.offset += o, this.markedOffset >= 0 && (this.markedOffset += o), this.limit += o, 
            r += o;
        } else {
            new Uint8Array(this.buffer);
        }
        return this.view.set(t.view.subarray(t.offset, t.limit), r - n), t.offset = t.limit, 
        i && (this.offset -= n), this;
    }, o.prependTo = function(t, e) {
        return t.prepend(this, e), this;
    }, o.printDebug = function(t) {
        "function" != typeof t && (t = console.log.bind(console)), t(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(!0));
    }, o.remaining = function() {
        return this.limit - this.offset;
    }, o.reset = function() {
        return this.markedOffset >= 0 ? (this.offset = this.markedOffset, this.markedOffset = -1) : this.offset = 0, 
        this;
    }, o.resize = function(t) {
        if (!this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal capacity: " + t + " (not an integer)");
            if (t |= 0, 0 > t) throw RangeError("Illegal capacity: 0 <= " + t);
        }
        if (this.buffer.byteLength < t) {
            var e = new ArrayBuffer(t), r = new Uint8Array(e);
            r.set(this.view), this.buffer = e, this.view = r;
        }
        return this;
    }, o.reverse = function(t, e) {
        if ("undefined" == typeof t && (t = this.offset), "undefined" == typeof e && (e = this.limit), 
        !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
            if (t >>>= 0, "number" != typeof e || e % 1 !== 0) throw TypeError("Illegal end: Not an integer");
            if (e >>>= 0, 0 > t || t > e || e > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + t + " <= " + e + " <= " + this.buffer.byteLength);
        }
        return t === e ? this : (Array.prototype.reverse.call(this.view.subarray(t, e)), 
        this);
    }, o.skip = function(t) {
        if (!this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal length: " + t + " (not an integer)");
            t |= 0;
        }
        var e = this.offset + t;
        if (!this.noAssert && (0 > e || e > this.buffer.byteLength)) throw RangeError("Illegal length: 0 <= " + this.offset + " + " + t + " <= " + this.buffer.byteLength);
        return this.offset = e, this;
    }, o.slice = function(t, e) {
        if ("undefined" == typeof t && (t = this.offset), "undefined" == typeof e && (e = this.limit), 
        !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
            if (t >>>= 0, "number" != typeof e || e % 1 !== 0) throw TypeError("Illegal end: Not an integer");
            if (e >>>= 0, 0 > t || t > e || e > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + t + " <= " + e + " <= " + this.buffer.byteLength);
        }
        var r = this.clone();
        return r.offset = t, r.limit = e, r;
    }, o.toBuffer = function(t) {
        var e = this.offset, r = this.limit;
        if (!this.noAssert) {
            if ("number" != typeof e || e % 1 !== 0) throw TypeError("Illegal offset: Not an integer");
            if (e >>>= 0, "number" != typeof r || r % 1 !== 0) throw TypeError("Illegal limit: Not an integer");
            if (r >>>= 0, 0 > e || e > r || r > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + r + " <= " + this.buffer.byteLength);
        }
        if (!t && 0 === e && r === this.buffer.byteLength) return this.buffer;
        if (e === r) return s;
        var i = new ArrayBuffer(r - e);
        return new Uint8Array(i).set(new Uint8Array(this.buffer).subarray(e, r), 0), i;
    }, o.toArrayBuffer = o.toBuffer, o.toString = function(t, e, r) {
        if ("undefined" == typeof t) return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
        switch ("number" == typeof t && (t = "utf8", e = t, r = e), t) {
          case "utf8":
            return this.toUTF8(e, r);

          case "base64":
            return this.toBase64(e, r);

          case "hex":
            return this.toHex(e, r);

          case "binary":
            return this.toBinary(e, r);

          case "debug":
            return this.toDebug();

          case "columns":
            return this.toColumns();

          default:
            throw Error("Unsupported encoding: " + t);
        }
    };
    var a = function() {
        for (var t = {}, e = [ 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47 ], r = [], i = 0, n = e.length; n > i; ++i) r[e[i]] = i;
        return t.encode = function(t, r) {
            for (var i, n; null !== (i = t()); ) r(e[i >> 2 & 63]), n = (3 & i) << 4, null !== (i = t()) ? (n |= i >> 4 & 15, 
            r(e[63 & (n | i >> 4 & 15)]), n = (15 & i) << 2, null !== (i = t()) ? (r(e[63 & (n | i >> 6 & 3)]), 
            r(e[63 & i])) : (r(e[63 & n]), r(61))) : (r(e[63 & n]), r(61), r(61));
        }, t.decode = function(t, e) {
            function i(t) {
                throw Error("Illegal character code: " + t);
            }
            for (var n, f, o; null !== (n = t()); ) if (f = r[n], "undefined" == typeof f && i(n), 
            null !== (n = t()) && (o = r[n], "undefined" == typeof o && i(n), e(f << 2 >>> 0 | (48 & o) >> 4), 
            null !== (n = t()))) {
                if (f = r[n], "undefined" == typeof f) {
                    if (61 === n) break;
                    i(n);
                }
                if (e((15 & o) << 4 >>> 0 | (60 & f) >> 2), null !== (n = t())) {
                    if (o = r[n], "undefined" == typeof o) {
                        if (61 === n) break;
                        i(n);
                    }
                    e((3 & f) << 6 >>> 0 | o);
                }
            }
        }, t.test = function(t) {
            return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(t);
        }, t;
    }();
    o.toBase64 = function(t, e) {
        if ("undefined" == typeof t && (t = this.offset), "undefined" == typeof e && (e = this.limit), 
        t = 0 | t, e = 0 | e, 0 > t || e > this.capacity || t > e) throw RangeError("begin, end");
        var i;
        return a.encode(function() {
            return e > t ? this.view[t++] : null;
        }.bind(this), i = r()), i();
    }, f.fromBase64 = function(t, r) {
        if ("string" != typeof t) throw TypeError("str");
        var i = new f(t.length / 4 * 3, r), n = 0;
        return a.decode(e(t), function(t) {
            i.view[n++] = t;
        }), i.limit = n, i;
    }, f.btoa = function(t) {
        return f.fromBinary(t).toBase64();
    }, f.atob = function(t) {
        return f.fromBase64(t).toBinary();
    }, o.toBinary = function(t, e) {
        if ("undefined" == typeof t && (t = this.offset), "undefined" == typeof e && (e = this.limit), 
        t |= 0, e |= 0, 0 > t || e > this.capacity() || t > e) throw RangeError("begin, end");
        if (t === e) return "";
        for (var r = [], i = []; e > t; ) r.push(this.view[t++]), r.length >= 1024 && (i.push(String.fromCharCode.apply(String, r)), 
        r = []);
        return i.join("") + String.fromCharCode.apply(String, r);
    }, f.fromBinary = function(t, e) {
        if ("string" != typeof t) throw TypeError("str");
        for (var r, i = 0, n = t.length, o = new f(n, e); n > i; ) {
            if (r = t.charCodeAt(i), r > 255) throw RangeError("illegal char code: " + r);
            o.view[i++] = r;
        }
        return o.limit = n, o;
    }, o.toDebug = function(t) {
        for (var e, r = -1, i = this.buffer.byteLength, n = "", f = "", o = ""; i > r; ) {
            if (-1 !== r && (e = this.view[r], n += 16 > e ? "0" + e.toString(16).toUpperCase() : e.toString(16).toUpperCase(), 
            t && (f += e > 32 && 127 > e ? String.fromCharCode(e) : ".")), ++r, t && r > 0 && r % 16 === 0 && r !== i) {
                for (;n.length < 51; ) n += " ";
                o += n + f + "\n", n = f = "";
            }
            n += r === this.offset && r === this.limit ? r === this.markedOffset ? "!" : "|" : r === this.offset ? r === this.markedOffset ? "[" : "<" : r === this.limit ? r === this.markedOffset ? "]" : ">" : r === this.markedOffset ? "'" : t || 0 !== r && r !== i ? " " : "";
        }
        if (t && " " !== n) {
            for (;n.length < 51; ) n += " ";
            o += n + f + "\n";
        }
        return t ? o : n;
    }, f.fromDebug = function(t, e, r) {
        for (var i, n, o = t.length, s = new f((o + 1) / 3 | 0, e, r), h = 0, a = 0, l = !1, u = !1, g = !1, y = !1, w = !1; o > h; ) {
            switch (i = t.charAt(h++)) {
              case "!":
                if (!r) {
                    if (u || g || y) {
                        w = !0;
                        break;
                    }
                    u = g = y = !0;
                }
                s.offset = s.markedOffset = s.limit = a, l = !1;
                break;

              case "|":
                if (!r) {
                    if (u || y) {
                        w = !0;
                        break;
                    }
                    u = y = !0;
                }
                s.offset = s.limit = a, l = !1;
                break;

              case "[":
                if (!r) {
                    if (u || g) {
                        w = !0;
                        break;
                    }
                    u = g = !0;
                }
                s.offset = s.markedOffset = a, l = !1;
                break;

              case "<":
                if (!r) {
                    if (u) {
                        w = !0;
                        break;
                    }
                    u = !0;
                }
                s.offset = a, l = !1;
                break;

              case "]":
                if (!r) {
                    if (y || g) {
                        w = !0;
                        break;
                    }
                    y = g = !0;
                }
                s.limit = s.markedOffset = a, l = !1;
                break;

              case ">":
                if (!r) {
                    if (y) {
                        w = !0;
                        break;
                    }
                    y = !0;
                }
                s.limit = a, l = !1;
                break;

              case "'":
                if (!r) {
                    if (g) {
                        w = !0;
                        break;
                    }
                    g = !0;
                }
                s.markedOffset = a, l = !1;
                break;

              case " ":
                l = !1;
                break;

              default:
                if (!r && l) {
                    w = !0;
                    break;
                }
                if (n = parseInt(i + t.charAt(h++), 16), !r && (isNaN(n) || 0 > n || n > 255)) throw TypeError("Illegal str: Not a debug encoded string");
                s.view[a++] = n, l = !0;
            }
            if (w) throw TypeError("Illegal str: Invalid symbol at " + h);
        }
        if (!r) {
            if (!u || !y) throw TypeError("Illegal str: Missing offset or limit");
            if (a < s.buffer.byteLength) throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + a + " < " + o);
        }
        return s;
    }, o.toHex = function(t, e) {
        if (t = "undefined" == typeof t ? this.offset : t, e = "undefined" == typeof e ? this.limit : e, 
        !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
            if (t >>>= 0, "number" != typeof e || e % 1 !== 0) throw TypeError("Illegal end: Not an integer");
            if (e >>>= 0, 0 > t || t > e || e > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + t + " <= " + e + " <= " + this.buffer.byteLength);
        }
        for (var r, i = new Array(e - t); e > t; ) r = this.view[t++], 16 > r ? i.push("0", r.toString(16)) : i.push(r.toString(16));
        return i.join("");
    }, f.fromHex = function(t, e, r) {
        if (!r) {
            if ("string" != typeof t) throw TypeError("Illegal str: Not a string");
            if (t.length % 2 !== 0) throw TypeError("Illegal str: Length not a multiple of 2");
        }
        for (var i, n = t.length, o = new f(n / 2 | 0, e), s = 0, h = 0; n > s; s += 2) {
            if (i = parseInt(t.substring(s, s + 2), 16), !r && (!isFinite(i) || 0 > i || i > 255)) throw TypeError("Illegal str: Contains non-hex characters");
            o.view[h++] = i;
        }
        return o.limit = h, o;
    };
    var l = function() {
        var t = {};
        return t.MAX_CODEPOINT = 1114111, t.encodeUTF8 = function(t, e) {
            var r = null;
            for ("number" == typeof t && (r = t, t = function() {
                return null;
            }); null !== r || null !== (r = t()); ) 128 > r ? e(127 & r) : 2048 > r ? (e(r >> 6 & 31 | 192), 
            e(63 & r | 128)) : 65536 > r ? (e(r >> 12 & 15 | 224), e(r >> 6 & 63 | 128), e(63 & r | 128)) : (e(r >> 18 & 7 | 240), 
            e(r >> 12 & 63 | 128), e(r >> 6 & 63 | 128), e(63 & r | 128)), r = null;
        }, t.decodeUTF8 = function(t, e) {
            for (var r, i, n, f, o = function(t) {
                t = t.slice(0, t.indexOf(null));
                var e = Error(t.toString());
                throw e.name = "TruncatedError", e.bytes = t, e;
            }; null !== (r = t()); ) if (0 === (128 & r)) e(r); else if (192 === (224 & r)) null === (i = t()) && o([ r, i ]), 
            e((31 & r) << 6 | 63 & i); else if (224 === (240 & r)) (null === (i = t()) || null === (n = t())) && o([ r, i, n ]), 
            e((15 & r) << 12 | (63 & i) << 6 | 63 & n); else {
                if (240 !== (248 & r)) throw RangeError("Illegal starting byte: " + r);
                (null === (i = t()) || null === (n = t()) || null === (f = t())) && o([ r, i, n, f ]), 
                e((7 & r) << 18 | (63 & i) << 12 | (63 & n) << 6 | 63 & f);
            }
        }, t.UTF16toUTF8 = function(t, e) {
            for (var r, i = null; ;) {
                if (null === (r = null !== i ? i : t())) break;
                r >= 55296 && 57343 >= r && null !== (i = t()) && i >= 56320 && 57343 >= i ? (e(1024 * (r - 55296) + i - 56320 + 65536), 
                i = null) : e(r);
            }
            null !== i && e(i);
        }, t.UTF8toUTF16 = function(t, e) {
            var r = null;
            for ("number" == typeof t && (r = t, t = function() {
                return null;
            }); null !== r || null !== (r = t()); ) 65535 >= r ? e(r) : (r -= 65536, e((r >> 10) + 55296), 
            e(r % 1024 + 56320)), r = null;
        }, t.encodeUTF16toUTF8 = function(e, r) {
            t.UTF16toUTF8(e, function(e) {
                t.encodeUTF8(e, r);
            });
        }, t.decodeUTF8toUTF16 = function(e, r) {
            t.decodeUTF8(e, function(e) {
                t.UTF8toUTF16(e, r);
            });
        }, t.calculateCodePoint = function(t) {
            return 128 > t ? 1 : 2048 > t ? 2 : 65536 > t ? 3 : 4;
        }, t.calculateUTF8 = function(t) {
            for (var e, r = 0; null !== (e = t()); ) r += 128 > e ? 1 : 2048 > e ? 2 : 65536 > e ? 3 : 4;
            return r;
        }, t.calculateUTF16asUTF8 = function(e) {
            var r = 0, i = 0;
            return t.UTF16toUTF8(e, function(t) {
                ++r, i += 128 > t ? 1 : 2048 > t ? 2 : 65536 > t ? 3 : 4;
            }), [ r, i ];
        }, t;
    }();
    return o.toUTF8 = function(t, e) {
        if ("undefined" == typeof t && (t = this.offset), "undefined" == typeof e && (e = this.limit), 
        !this.noAssert) {
            if ("number" != typeof t || t % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
            if (t >>>= 0, "number" != typeof e || e % 1 !== 0) throw TypeError("Illegal end: Not an integer");
            if (e >>>= 0, 0 > t || t > e || e > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + t + " <= " + e + " <= " + this.buffer.byteLength);
        }
        var i;
        try {
            l.decodeUTF8toUTF16(function() {
                return e > t ? this.view[t++] : null;
            }.bind(this), i = r());
        } catch (n) {
            if (t !== e) throw RangeError("Illegal range: Truncated data, " + t + " != " + e);
        }
        return i();
    }, f.fromUTF8 = function(t, r, i) {
        if (!i && "string" != typeof t) throw TypeError("Illegal str: Not a string");
        var n = new f(l.calculateUTF16asUTF8(e(t), !0)[1], r, i), o = 0;
        return l.encodeUTF16toUTF8(e(t), function(t) {
            n.view[o++] = t;
        }), n.limit = o, n;
    }, f;
});