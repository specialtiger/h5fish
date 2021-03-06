!function(t, e, i) {
    var a = (i.un, i.uns, i["static"]), s = i["class"], r = i.getset, n = i.__newvec, h = laya.maths.Bezier, l = laya.utils.Browser, o = laya.utils.Byte, u = (laya.events.Event, 
    laya.events.EventDispatcher), c = laya.display.Graphics, d = laya.resource.HTMLCanvas, _ = laya.utils.Handler, p = laya.net.Loader, f = laya.maths.MathUtil, m = laya.maths.Matrix, y = (laya.display.Node, 
    laya.maths.Point, laya.maths.Rectangle), x = laya.renders.Render, g = (laya.renders.RenderContext, 
    laya.resource.Resource), v = laya.utils.RunDriver, D = laya.display.Sprite, M = laya.utils.Stat, I = laya.resource.Texture, N = laya.net.URL, b = laya.utils.Utils, T = function() {
        function t() {
            this.nodes = null, this.name = null, this.playTime = NaN, this.bone3DMap = null, 
            this.totalKeyframeDatasLength = 0;
        }
        return s(t, "laya.ani.AnimationContent"), t;
    }(), A = function() {
        function t() {
            this.name = null, this.parentIndex = 0, this.parent = null, this.keyframeWidth = 0, 
            this.lerpType = 0, this.interpolationMethod = null, this.childs = null, this.keyFrame = null, 
            this.playTime = NaN, this.extenData = null, this.dataOffset = 0;
        }
        return s(t, "laya.ani.AnimationNodeContent"), t;
    }(), C = function() {
        function t() {}
        return s(t, "laya.ani.AnimationParser01"), t.parse = function(t, e) {
            var i = e.__getBuffer(), a = 0, s = 0, r = 0, n = 0, h = 0, l = 0, u = 0, c = e.readUTFString();
            t._aniClassName = c;
            var d, _ = e.readUTFString().split("\n"), p = e.getUint8(), f = e.getUint32(), m = e.getUint32();
            f > 0 && (d = i.slice(f, m));
            var y = new o(d);
            for (m > 0 && (t._publicExtData = i.slice(m, i.byteLength)), t._useParent = !!e.getUint8(), 
            t._anis.length = p, a = 0; p > a; a++) {
                var x = t._anis[a] = new T();
                x.nodes = new Array();
                var g = x.name = _[e.getUint16()];
                t._aniMap[g] = a, x.bone3DMap = {}, x.playTime = e.getFloat32();
                var v = x.nodes.length = e.getUint8();
                for (x.totalKeyframeDatasLength = 0, s = 0; v > s; s++) {
                    var D = x.nodes[s] = new A();
                    D.childs = [];
                    var M = e.getInt16();
                    M >= 0 && (D.name = _[M], x.bone3DMap[D.name] = s), D.keyFrame = new Array(), D.parentIndex = e.getInt16(), 
                    -1 == D.parentIndex ? D.parent = null : D.parent = x.nodes[D.parentIndex], D.lerpType = e.getUint8();
                    var I = e.getUint32();
                    y.pos = I;
                    var N = D.keyframeWidth = y.getUint16();
                    if (x.totalKeyframeDatasLength += N, 0 === D.lerpType || 1 === D.lerpType) for (D.interpolationMethod = [], 
                    D.interpolationMethod.length = N, r = 0; N > r; r++) D.interpolationMethod[r] = it.interpolation[y.getUint8()];
                    null != D.parent && D.parent.childs.push(D);
                    var b = e.getUint16();
                    b > 0 && (D.extenData = i.slice(e.pos, e.pos + b), e.pos += b);
                    var C = e.getUint16();
                    D.keyFrame.length = C;
                    var w, S = 0;
                    for (r = 0, n = C; n > r; r++) {
                        if (w = D.keyFrame[r] = new $(), w.duration = e.getFloat32(), w.startTime = S, 2 === D.lerpType) {
                            w.interpolationData = [];
                            var F = e.getUint8(), k = 0;
                            switch (k = e.getFloat32()) {
                              case 254:
                                for (w.interpolationData.length = N, u = 0; N > u; u++) w.interpolationData[u] = 0;
                                break;

                              case 255:
                                for (w.interpolationData.length = N, u = 0; N > u; u++) w.interpolationData[u] = 5;
                                break;

                              default:
                                for (w.interpolationData.push(k), l = 1; F > l; l++) w.interpolationData.push(e.getFloat32());
                            }
                        }
                        for (w.data = new Float32Array(N), w.dData = new Float32Array(N), w.nextData = new Float32Array(N), 
                        h = 0; N > h; h++) w.data[h] = e.getFloat32(), w.data[h] > -1e-8 && w.data[h] < 1e-8 && (w.data[h] = 0);
                        S += w.duration;
                    }
                    w.startTime = x.playTime, D.playTime = x.playTime, t._calculateKeyFrame(D, C, N);
                }
            }
        }, t;
    }(), w = function() {
        function t() {}
        return s(t, "laya.ani.AnimationParser02"), t.READ_DATA = function() {
            t._DATA.offset = t._reader.getUint32(), t._DATA.size = t._reader.getUint32();
        }, t.READ_BLOCK = function() {
            for (var e = t._BLOCK.count = t._reader.getUint16(), i = t._BLOCK.blockStarts = [], a = t._BLOCK.blockLengths = [], s = 0; e > s; s++) i.push(t._reader.getUint32()), 
            a.push(t._reader.getUint32());
        }, t.READ_STRINGS = function() {
            var e = t._reader.getUint32(), i = t._reader.getUint16(), a = t._reader.pos;
            t._reader.pos = e + t._DATA.offset;
            for (var s = 0; i > s; s++) t._strings[s] = t._reader.readUTFString();
            t._reader.pos = a;
        }, t.parse = function(e, i) {
            t._templet = e, t._reader = i;
            i.__getBuffer();
            t.READ_DATA(), t.READ_BLOCK(), t.READ_STRINGS();
            for (var a = 0, s = t._BLOCK.count; s > a; a++) {
                var r = i.getUint16(), n = t._strings[r], h = t["READ_" + n];
                if (null == h) throw new Error("model file err,no this function:" + r + " " + n);
                h.call();
            }
        }, t.READ_ANIMATIONS = function() {
            var e = t._reader, i = e.__getBuffer(), a = 0, s = 0, r = 0, n = 0, h = e.getUint16(), l = [];
            for (l.length = h, a = 0; h > a; a++) l[a] = it.interpolation[e.getByte()];
            var o = e.getUint8();
            for (t._templet._anis.length = o, a = 0; o > a; a++) {
                var u = t._templet._anis[a] = {};
                u.nodes = new Array();
                var c = u.name = t._strings[e.getUint16()];
                t._templet._aniMap[c] = a, u.bone3DMap = {}, u.playTime = e.getFloat32();
                var d = u.nodes.length = e.getInt16();
                for (u.totalKeyframeDatasLength = 0, s = 0; d > s; s++) {
                    var _ = u.nodes[s] = {};
                    _.keyframeWidth = h, _.childs = [];
                    var p = e.getUint16();
                    p >= 0 && (_.name = t._strings[p], u.bone3DMap[_.name] = s), _.keyFrame = new Array(), 
                    _.parentIndex = e.getInt16(), -1 == _.parentIndex ? _.parent = null : _.parent = u.nodes[_.parentIndex], 
                    u.totalKeyframeDatasLength += h, _.interpolationMethod = l, null != _.parent && _.parent.childs.push(_);
                    var f = e.getUint16();
                    _.keyFrame.length = f;
                    var m = null, y = null;
                    for (r = 0, n = f; n > r; r++) {
                        m = _.keyFrame[r] = {}, m.startTime = e.getFloat32(), y && (y.duration = m.startTime - y.startTime), 
                        m.dData = new Float32Array(h), m.nextData = new Float32Array(h);
                        var x = t._DATA.offset, g = e.getUint32(), v = 4 * h, D = i.slice(x + g, x + g + v);
                        m.data = new Float32Array(D), y = m;
                    }
                    m.duration = 0, _.playTime = u.playTime, t._templet._calculateKeyFrame(_, f, h);
                }
            }
        }, t._templet = null, t._reader = null, t._strings = [], a(t, [ "_BLOCK", function() {
            return this._BLOCK = {
                count: 0
            };
        }, "_DATA", function() {
            return this._DATA = {
                offset: 0,
                size: 0
            };
        } ]), t;
    }(), S = (function() {
        function t() {}
        return s(t, "laya.ani.AnimationState"), t.stopped = 0, t.paused = 1, t.playing = 2, 
        t;
    }(), function() {
        function t() {
            this.name = null, this.root = null, this.parentBone = null, this.length = 10, this.transform = null, 
            this.inheritScale = !0, this.inheritRotation = !0, this.rotation = NaN, this.resultRotation = NaN, 
            this.d = -1, this._tempMatrix = null, this._sprite = null, this.resultTransform = new Q(), 
            this.resultMatrix = new m(), this._children = [];
        }
        s(t, "laya.ani.bone.Bone");
        var e = t.prototype;
        return e.setTempMatrix = function(t) {
            this._tempMatrix = t;
            var e, i = 0, a = 0;
            for (i = 0, a = this._children.length; a > i; i++) e = this._children[i], e.setTempMatrix(this._tempMatrix);
        }, e.update = function(t) {
            this.rotation = this.transform.skX;
            var e;
            if (t) e = this.resultTransform.getMatrix(), m.mul(e, t, this.resultMatrix), this.resultRotation = this.rotation; else if (this.resultRotation = this.rotation + this.parentBone.resultRotation, 
            this.parentBone) if (this.inheritRotation && this.inheritScale) e = this.resultTransform.getMatrix(), 
            m.mul(e, this.parentBone.resultMatrix, this.resultMatrix); else {
                var i = this.parentBone, a = NaN, s = NaN, r = NaN, n = this.parentBone.resultMatrix;
                e = this.resultTransform.getMatrix();
                var h = n.a * e.tx + n.c * e.ty + n.tx, l = n.b * e.tx + n.d * e.ty + n.ty, o = new m();
                this.inheritRotation ? (a = Math.atan2(i.resultMatrix.b, i.resultMatrix.a), s = Math.cos(a), 
                r = Math.sin(a), o.setTo(s, r, -r, s, 0, 0), m.mul(this._tempMatrix, o, m.TEMP), 
                m.TEMP.copyTo(o), e = this.resultTransform.getMatrix(), m.mul(e, o, this.resultMatrix), 
                this.resultTransform.scX * this.resultTransform.scY < 0 && this.resultMatrix.rotate(.5 * Math.PI), 
                this.resultMatrix.tx = h, this.resultMatrix.ty = l) : this.inheritScale ? (e = this.resultTransform.getMatrix(), 
                m.TEMP.identity(), m.TEMP.d = this.d, m.mul(e, m.TEMP, this.resultMatrix), this.resultMatrix.tx = h, 
                this.resultMatrix.ty = l) : (e = this.resultTransform.getMatrix(), m.TEMP.identity(), 
                m.TEMP.d = this.d, m.mul(e, m.TEMP, this.resultMatrix), this.resultMatrix.tx = h, 
                this.resultMatrix.ty = l);
            } else e = this.resultTransform.getMatrix(), e.copyTo(this.resultMatrix);
            var u, c = 0, d = 0;
            for (c = 0, d = this._children.length; d > c; c++) u = this._children[c], u.update();
        }, e.updateChild = function() {
            var t, e = 0, i = 0;
            for (e = 0, i = this._children.length; i > e; e++) t = this._children[e], t.update();
        }, e.setRotation = function(t) {
            this._sprite && (this._sprite.rotation = 180 * t / Math.PI);
        }, e.updateDraw = function(e, a) {
            t.ShowBones && !t.ShowBones[this.name] || (this._sprite ? (this._sprite.x = e + this.resultMatrix.tx, 
            this._sprite.y = a + this.resultMatrix.ty) : (this._sprite = new D(), this._sprite.graphics.drawCircle(0, 0, 5, "#ff0000"), 
            this._sprite.graphics.drawLine(0, 0, this.length, 0, "#00ff00"), this._sprite.graphics.fillText(this.name, 0, 0, "20px Arial", "#00ff00", "center"), 
            i.stage.addChild(this._sprite), this._sprite.x = e + this.resultMatrix.tx, this._sprite.y = a + this.resultMatrix.ty));
            var s, r = 0, n = 0;
            for (r = 0, n = this._children.length; n > r; r++) s = this._children[r], s.updateDraw(e, a);
        }, e.addChild = function(t) {
            this._children.push(t), t.parentBone = this;
        }, e.findBone = function(t) {
            if (this.name == t) return this;
            var e, i, a = 0, s = 0;
            for (a = 0, s = this._children.length; s > a; a++) if (e = this._children[a], i = e.findBone(t)) return i;
            return null;
        }, e.localToWorld = function(t) {
            var e = t[0], i = t[1];
            t[0] = e * this.resultMatrix.a + i * this.resultMatrix.c + this.resultMatrix.tx, 
            t[1] = e * this.resultMatrix.b + i * this.resultMatrix.d + this.resultMatrix.ty;
        }, t.ShowBones = {}, t;
    }()), F = function() {
        function t() {
            this.name = null, this.parent = null, this.attachmentName = null, this.srcDisplayIndex = -1, 
            this.type = "src", this.templet = null, this.currSlotData = null, this.currTexture = null, 
            this.currDisplayData = null, this.displayIndex = -1, this._diyTexture = null, this._parentMatrix = null, 
            this._resultMatrix = null, this._replaceDic = {}, this._curDiyUV = null, this._curDiyVS = null, 
            this._skinSprite = null, this.deformData = null, this._mVerticleArr = null;
        }
        s(t, "laya.ani.bone.BoneSlot");
        var e = t.prototype;
        return e.showSlotData = function(t, e) {
            void 0 === e && (e = !0), this.currSlotData = t, e && (this.displayIndex = this.srcDisplayIndex), 
            this.currDisplayData = null, this.currTexture = null;
        }, e.showDisplayByName = function(t) {
            this.currSlotData && this.showDisplayByIndex(this.currSlotData.getDisplayByName(t));
        }, e.replaceDisplayByName = function(t, e) {
            if (this.currSlotData) {
                var i = 0;
                i = this.currSlotData.getDisplayByName(t);
                var a = 0;
                a = this.currSlotData.getDisplayByName(e), this.replaceDisplayByIndex(i, a);
            }
        }, e.replaceDisplayByIndex = function(t, e) {
            this.currSlotData && (this._replaceDic[t] = e, this.displayIndex == t && this.showDisplayByIndex(t));
        }, e.showDisplayByIndex = function(t) {
            if (this._replaceDic[t] && (t = this._replaceDic[t]), this.currSlotData && t > -1 && t < this.currSlotData.displayArr.length) {
                if (this.displayIndex = t, this.currDisplayData = this.currSlotData.displayArr[t], 
                this.currDisplayData) {
                    var e = this.currDisplayData.name;
                    this.currTexture = this.templet.getTexture(e), this.currTexture && x.isWebGL && 0 == this.currDisplayData.type && this.currDisplayData.uvs && (this.currTexture = this.currDisplayData.createTexture(this.currTexture));
                }
            } else this.displayIndex = -1, this.currDisplayData = null, this.currTexture = null;
        }, e.replaceSkin = function(t) {
            this._diyTexture = t, this._curDiyUV && (this._curDiyUV.length = 0), this.currDisplayData && this._diyTexture == this.currDisplayData.texture && (this._diyTexture = null);
        }, e.setParentMatrix = function(t) {
            this._parentMatrix = t;
        }, e.draw = function(e, i, a, s) {
            if (void 0 === a && (a = !1), void 0 === s && (s = 1), (null != this._diyTexture || null != this.currTexture) && null != this.currDisplayData || this.currDisplayData && 3 == this.currDisplayData.type) {
                var r = this.currTexture;
                this._diyTexture && (r = this._diyTexture);
                var n;
                switch (this.currDisplayData.type) {
                  case 0:
                    if (e) {
                        var h = this.getDisplayMatrix();
                        if (this._parentMatrix) {
                            var l = !1;
                            if (h) {
                                m.mul(h, this._parentMatrix, m.TEMP);
                                var o;
                                if (a ? (null == this._resultMatrix && (this._resultMatrix = new m()), o = this._resultMatrix) : o = new m(), 
                                !x.isWebGL && this.currDisplayData.uvs || x.isWebGL && this._diyTexture && this.currDisplayData.uvs) {
                                    var u = t._tempMatrix;
                                    u.identity(), this.currDisplayData.uvs[1] > this.currDisplayData.uvs[5] && (u.d = -1), 
                                    this.currDisplayData.uvs[0] > this.currDisplayData.uvs[4] && this.currDisplayData.uvs[1] > this.currDisplayData.uvs[5] && (l = !0, 
                                    u.rotate(-Math.PI / 2)), m.mul(u, m.TEMP, o);
                                } else m.TEMP.copyTo(o);
                                l ? e.drawTexture(r, -this.currDisplayData.height / 2, -this.currDisplayData.width / 2, this.currDisplayData.height, this.currDisplayData.width, o) : e.drawTexture(r, -this.currDisplayData.width / 2, -this.currDisplayData.height / 2, this.currDisplayData.width, this.currDisplayData.height, o);
                            }
                        }
                    }
                    break;

                  case 1:
                    if (a ? (null == this._skinSprite && (this._skinSprite = t.createSkinMesh()), n = this._skinSprite) : n = t.createSkinMesh(), 
                    null == n) return;
                    var c;
                    if (null == this.currDisplayData.bones) {
                        var d = this.currDisplayData.weights;
                        this.deformData && (d = this.deformData);
                        var _;
                        this._diyTexture ? (this._curDiyUV || (this._curDiyUV = []), 0 == this._curDiyUV.length && (this._curDiyUV = Z.getRelativeUV(this.currTexture.uv, this.currDisplayData.uvs, this._curDiyUV), 
                        this._curDiyUV = Z.getAbsoluteUV(this._diyTexture.uv, this._curDiyUV, this._curDiyUV)), 
                        _ = this._curDiyUV) : _ = this.currDisplayData.uvs, this._mVerticleArr = d;
                        this.currDisplayData.triangles.length / 3;
                        c = this.currDisplayData.triangles, n.init2(r, null, c, this._mVerticleArr, _);
                        var p = this.getDisplayMatrix();
                        if (this._parentMatrix && p) {
                            m.mul(p, this._parentMatrix, m.TEMP);
                            var f;
                            a ? (null == this._resultMatrix && (this._resultMatrix = new m()), f = this._resultMatrix) : f = new m(), 
                            m.TEMP.copyTo(f), n.transform = f;
                        }
                    } else this.skinMesh(i, n, s);
                    e.drawSkin(n);
                    break;

                  case 2:
                    if (a ? (null == this._skinSprite && (this._skinSprite = t.createSkinMesh()), n = this._skinSprite) : n = t.createSkinMesh(), 
                    null == n) return;
                    this.skinMesh(i, n, s), e.drawSkin(n);
                    break;

                  case 3:
                }
            }
        }, e.skinMesh = function(t, e, i) {
            var a, s = this.currTexture, r = this.currDisplayData.bones;
            this._diyTexture ? (s = this._diyTexture, this._curDiyUV || (this._curDiyUV = []), 
            0 == this._curDiyUV.length && (this._curDiyUV = Z.getRelativeUV(this.currTexture.uv, this.currDisplayData.uvs, this._curDiyUV), 
            this._curDiyUV = Z.getAbsoluteUV(this._diyTexture.uv, this._curDiyUV, this._curDiyUV)), 
            a = this._curDiyUV) : a = this.currDisplayData.uvs;
            var n, h, l = this.currDisplayData.weights, o = this.currDisplayData.triangles, u = 0, c = 0, d = 0, _ = NaN, p = NaN, f = 0, m = 0, y = [], x = 0, g = 0;
            if (this.deformData && this.deformData.length > 0) {
                var v = 0;
                for (x = 0, g = r.length; g > x; ) {
                    for (d = r[x++] + x, u = 0, c = 0; d > x; x++) h = t[r[x]], _ = l[f] + this.deformData[v++], 
                    p = l[f + 1] + this.deformData[v++], m = l[f + 2], u += (_ * h.a + p * h.c + h.tx) * m, 
                    c += (_ * h.b + p * h.d + h.ty) * m, f += 3;
                    y.push(u, c);
                }
            } else for (x = 0, g = r.length; g > x; ) {
                for (d = r[x++] + x, u = 0, c = 0; d > x; x++) h = t[r[x]], _ = l[f], p = l[f + 1], 
                m = l[f + 2], u += (_ * h.a + p * h.c + h.tx) * m, c += (_ * h.b + p * h.d + h.ty) * m, 
                f += 3;
                y.push(u, c);
            }
            this._mVerticleArr = y, n = o, e.init2(s, null, n, this._mVerticleArr, a);
        }, e.drawBonePoint = function(t) {
            t && this._parentMatrix && t.drawCircle(this._parentMatrix.tx, this._parentMatrix.ty, 5, "#ff0000");
        }, e.getDisplayMatrix = function() {
            return this.currDisplayData ? this.currDisplayData.transform.getMatrix() : null;
        }, e.getMatrix = function() {
            return this._resultMatrix;
        }, e.copy = function() {
            var e = new t();
            return e.type = "copy", e.name = this.name, e.attachmentName = this.attachmentName, 
            e.srcDisplayIndex = this.srcDisplayIndex, e.parent = this.parent, e.displayIndex = this.displayIndex, 
            e.templet = this.templet, e.currSlotData = this.currSlotData, e.currTexture = this.currTexture, 
            e.currDisplayData = this.currDisplayData, e;
        }, t.createSkinMesh = function() {
            return x.isWebGL || x.isConchApp ? v.skinAniSprite() : x.isWebGL ? null : st.useSimpleMeshInCanvas ? new at() : new et();
        }, a(t, [ "_tempMatrix", function() {
            return this._tempMatrix = new m();
        } ]), t;
    }(), k = function() {
        function t() {
            this.mesh = null, this.transform = null, this.context = null, this.mode = 0;
        }
        s(t, "laya.ani.bone.canvasmesh.CanvasMeshRender");
        var e = t.prototype;
        return e.renderToContext = function(t) {
            this.context = t.ctx || t, this.mesh && (0 == this.mode ? this._renderWithIndexes(this.mesh) : this._renderNoIndexes(this.mesh));
        }, e._renderNoIndexes = function(t) {
            var e = 0, i = t.vertices.length / 2, a = 0;
            for (e = 0; i - 2 > e; e++) a = 2 * e, this._renderDrawTriangle(t, a, a + 2, a + 4);
        }, e._renderWithIndexes = function(t) {
            var e = t.indexes, i = 0, a = e.length;
            for (i = 0; a > i; i += 3) {
                var s = 2 * e[i], r = 2 * e[i + 1], n = 2 * e[i + 2];
                this._renderDrawTriangle(t, s, r, n);
            }
        }, e._renderDrawTriangle = function(t, e, i, a) {
            var s = this.context, r = t.uvs, n = t.vertices, h = t.texture, l = h.bitmap, o = l.source, u = h.width, c = h.height, d = l.width, _ = l.height, p = NaN, f = NaN, m = NaN, y = NaN, x = NaN, g = NaN;
            if (t.useUvTransform) {
                var v = t.uvTransform;
                p = (r[e] * v.a + r[e + 1] * v.c + v.tx) * d, f = (r[i] * v.a + r[i + 1] * v.c + v.tx) * d, 
                m = (r[a] * v.a + r[a + 1] * v.c + v.tx) * d, y = (r[e] * v.b + r[e + 1] * v.d + v.ty) * _, 
                x = (r[i] * v.b + r[i + 1] * v.d + v.ty) * _, g = (r[a] * v.b + r[a + 1] * v.d + v.ty) * _;
            } else p = r[e] * d, f = r[i] * d, m = r[a] * d, y = r[e + 1] * _, x = r[i + 1] * _, 
            g = r[a + 1] * _;
            var D = n[e], M = n[i], I = n[a], N = n[e + 1], b = n[i + 1], T = n[a + 1];
            if (t.canvasPadding > 0) {
                var A = t.canvasPadding, C = t.canvasPadding, w = (D + M + I) / 3, S = (N + b + T) / 3, F = D - w, k = N - S, P = Math.sqrt(F * F + k * k);
                D = w + F / P * (P + A), N = S + k / P * (P + C), F = M - w, k = b - S, P = Math.sqrt(F * F + k * k), 
                M = w + F / P * (P + A), b = S + k / P * (P + C), F = I - w, k = T - S, P = Math.sqrt(F * F + k * k), 
                I = w + F / P * (P + A), T = S + k / P * (P + C);
            }
            if (s.save(), this.transform) {
                var B = this.transform;
                s.transform(B.a, B.b, B.c, B.d, B.tx, B.ty);
            }
            s.beginPath(), s.moveTo(D, N), s.lineTo(M, b), s.lineTo(I, T), s.closePath(), s.clip();
            var U = p * x + y * m + f * g - x * m - y * f - p * g, L = 1 / U, R = D * x + y * I + M * g - x * I - y * M - D * g, O = p * M + D * m + f * I - M * m - D * f - p * I, E = p * x * I + y * M * m + D * f * g - D * x * m - y * f * I - p * M * g, K = N * x + y * T + b * g - x * T - y * b - N * g, Y = p * b + N * m + f * T - b * m - N * f - p * T, W = p * x * T + y * b * m + N * f * g - N * x * m - y * f * T - p * b * g;
            s.transform(R * L, K * L, O * L, Y * L, E * L, W * L), s.drawImage(o, h.uv[0] * d, h.uv[1] * _, u, c, h.uv[0] * d, h.uv[1] * _, u, c), 
            s.restore();
        }, t;
    }(), P = function() {
        function t() {
            this.texture = null, this.uvs = [ 0, 0, 1, 0, 1, 1, 0, 1 ], this.vertices = [ 0, 0, 100, 0, 100, 100, 0, 100 ], 
            this.indexes = [ 0, 1, 3, 3, 1, 2 ], this.uvTransform = null, this.useUvTransform = !1, 
            this.canvasPadding = 1;
        }
        s(t, "laya.ani.bone.canvasmesh.MeshData");
        var e = t.prototype;
        return e.getBounds = function() {
            return y._getWrapRec(this.vertices);
        }, t;
    }(), B = function() {
        function t() {
            this.skinName = null, this.deformSlotDataList = [];
        }
        return s(t, "laya.ani.bone.DeformAniData"), t;
    }(), U = function() {
        function t() {
            this.deformSlotDisplayList = [];
        }
        return s(t, "laya.ani.bone.DeformSlotData"), t;
    }(), L = function() {
        function t() {
            this.boneSlot = null, this.slotIndex = -1, this.attachment = null, this.deformData = null, 
            this.frameIndex = 0, this.timeList = [], this.vectices = [], this.tweenKeyList = [];
        }
        s(t, "laya.ani.bone.DeformSlotDisplayData");
        var e = t.prototype;
        return e.binarySearch1 = function(t, e) {
            var i = 0, a = t.length - 2;
            if (0 == a) return 1;
            for (var s = a >>> 1; ;) {
                if (t[Math.floor(s + 1)] <= e ? i = s + 1 : a = s, i == a) return i + 1;
                s = i + a >>> 1;
            }
            return 0;
        }, e.apply = function(t, e, i) {
            if (void 0 === i && (i = 1), t += .05, !(this.timeList.length <= 0)) {
                var a = 0, s = this.timeList[0];
                if (!(s > t)) {
                    var r = this.vectices[0].length, n = [], h = this.binarySearch1(this.timeList, t);
                    if (this.frameIndex = h, t >= this.timeList[this.timeList.length - 1]) {
                        var l = this.vectices[this.vectices.length - 1];
                        if (1 > i) for (a = 0; r > a; a++) n[a] += (l[a] - n[a]) * i; else for (a = 0; r > a; a++) n[a] = l[a];
                        return void (this.deformData = n);
                    }
                    var o = (this.tweenKeyList[this.frameIndex], this.vectices[this.frameIndex - 1]), u = this.vectices[this.frameIndex], c = this.timeList[this.frameIndex - 1], d = this.timeList[this.frameIndex];
                    i = this.tweenKeyList[h - 1] ? (t - c) / (d - c) : 0;
                    var _ = NaN;
                    for (a = 0; r > a; a++) _ = o[a], n[a] = _ + (u[a] - _) * i;
                    this.deformData = n;
                }
            }
        }, t;
    }(), R = function() {
        function t() {
            this.time = NaN, this.drawOrder = [];
        }
        return s(t, "laya.ani.bone.DrawOrderData"), t;
    }(), O = function() {
        function t() {
            this.name = null, this.intValue = 0, this.floatValue = NaN, this.stringValue = null, 
            this.time = NaN;
        }
        return s(t, "laya.ani.bone.EventData"), t;
    }(), E = function() {
        function t(t, e) {
            this._targetBone = null, this._bones = null, this._data = null, this.name = null, 
            this.mix = NaN, this.bendDirection = NaN, this.isSpine = !0, this._sp = null, this.isDebug = !1, 
            this._data = t, this._targetBone = e[t.targetBoneIndex], this.isSpine = t.isSpine, 
            null == this._bones && (this._bones = []), this._bones.length = 0;
            for (var i = 0, a = t.boneIndexs.length; a > i; i++) this._bones.push(e[t.boneIndexs[i]]);
            this.name = t.name, this.mix = t.mix, this.bendDirection = t.bendDirection;
        }
        s(t, "laya.ani.bone.IkConstraint");
        var e = t.prototype;
        return e.apply = function() {
            switch (this._bones.length) {
              case 1:
                this._applyIk1(this._bones[0], this._targetBone.resultMatrix.tx, this._targetBone.resultMatrix.ty, this.mix);
                break;

              case 2:
                this.isSpine ? this._applyIk2(this._bones[0], this._bones[1], this._targetBone.resultMatrix.tx, this._targetBone.resultMatrix.ty, this.bendDirection, this.mix) : this._applyIk3(this._bones[0], this._bones[1], this._targetBone.resultMatrix.tx, this._targetBone.resultMatrix.ty, this.bendDirection, this.mix);
            }
        }, e._applyIk1 = function(e, i, a, s) {
            var r = e.parentBone, n = 1 / (r.resultMatrix.a * r.resultMatrix.d - r.resultMatrix.b * r.resultMatrix.c), h = i - r.resultMatrix.tx, l = a - r.resultMatrix.ty, o = (h * r.resultMatrix.d - l * r.resultMatrix.c) * n - e.transform.x, u = (l * r.resultMatrix.a - h * r.resultMatrix.b) * n - e.transform.y, c = Math.atan2(u, o) * t.radDeg - 0 - e.transform.skX;
            e.transform.scX < 0 && (c += 180), c > 180 ? c -= 360 : -180 > c && (c += 360), 
            e.transform.skX = e.transform.skY = e.transform.skX + c * s, e.update();
        }, e.updatePos = function(t, e) {
            this._sp && this._sp.pos(t, e);
        }, e._applyIk2 = function(e, a, s, r, n, h) {
            if (0 != h) {
                var l = e.resultTransform.x, o = e.resultTransform.y, u = e.transform.scX, c = e.transform.scY, d = a.transform.scX, _ = 0, p = 0, f = 0;
                0 > u ? (u = -u, _ = 180, f = -1) : (_ = 0, f = 1), 0 > c && (c = -c, f = -f), 0 > d ? (d = -d, 
                p = 180) : p = 0;
                var m = a.resultTransform.x, y = NaN, x = NaN, g = NaN, v = e.resultMatrix.a, M = e.resultMatrix.c, I = e.resultMatrix.b, N = e.resultMatrix.d, b = Math.abs(u - c) <= 1e-4;
                b ? (y = a.resultTransform.y, x = v * m + M * y + e.resultMatrix.tx, g = I * m + N * y + e.resultMatrix.ty) : (y = 0, 
                x = v * m + e.resultMatrix.tx, g = I * m + e.resultMatrix.ty), this.isDebug && (this._sp || (this._sp = new D(), 
                i.stage.addChild(this._sp)), this._sp.graphics.clear(), this._sp.graphics.drawCircle(s, r, 15, "#ffff00"), 
                this._sp.graphics.drawCircle(x, g, 15, "#ff00ff")), e.setRotation(Math.atan2(g - e.resultMatrix.ty, x - e.resultMatrix.tx));
                var T = e.parentBone;
                v = T.resultMatrix.a, M = T.resultMatrix.c, I = T.resultMatrix.b, N = T.resultMatrix.d;
                var A = 1 / (v * N - M * I), C = s - T.resultMatrix.tx, w = r - T.resultMatrix.ty, S = (C * N - w * M) * A - l, F = (w * v - C * I) * A - o;
                C = x - T.resultMatrix.tx, w = g - T.resultMatrix.ty;
                var k = (C * N - w * M) * A - l, P = (w * v - C * I) * A - o, B = Math.sqrt(k * k + P * P), U = a.length * d, L = NaN, R = NaN;
                if (b) {
                    U *= u;
                    var O = (S * S + F * F - B * B - U * U) / (2 * B * U);
                    -1 > O ? O = -1 : O > 1 && (O = 1), R = Math.acos(O) * n, v = B + U * O, M = U * Math.sin(R), 
                    L = Math.atan2(F * v - S * M, S * v + F * M);
                } else {
                    v = u * U, M = c * U;
                    var E = v * v, K = M * M, Y = S * S + F * F, W = Math.atan2(F, S);
                    I = K * B * B + E * Y - E * K;
                    var V = -2 * K * B, X = K - E;
                    if (N = V * V - 4 * X * I, N > 0) {
                        var z = Math.sqrt(N);
                        0 > V && (z = -z), z = -(V + z) / 2;
                        var G = z / X, q = I / z, H = Math.abs(G) < Math.abs(q) ? G : q;
                        Y >= H * H && (w = Math.sqrt(Y - H * H) * n, L = W - Math.atan2(w, H), R = Math.atan2(w / c, (H - B) / u));
                    }
                    var Q = 0, Z = Number.MAX_VALUE, $ = 0, j = 0, J = 0, tt = 0, et = 0, it = 0;
                    C = B + v, N = C * C, N > tt && (J = 0, tt = N, et = C), C = B - v, N = C * C, Z > N && (Q = Math.PI, 
                    Z = N, $ = C);
                    var at = Math.acos(-v * B / (E - K));
                    C = v * Math.cos(at) + B, w = M * Math.sin(at), N = C * C + w * w, Z > N && (Q = at, 
                    Z = N, $ = C, j = w), N > tt && (J = at, tt = N, et = C, it = w), (Z + tt) / 2 >= Y ? (L = W - Math.atan2(j * n, $), 
                    R = Q * n) : (L = W - Math.atan2(it * n, et), R = J * n);
                }
                var st = Math.atan2(y, m) * f, rt = e.resultTransform.skX;
                L = (L - st) * t.radDeg + _ - rt, L > 180 ? L -= 360 : -180 > L && (L += 360), e.resultTransform.x = l, 
                e.resultTransform.y = o, e.resultTransform.skX = e.resultTransform.skY = rt + L * h, 
                rt = a.resultTransform.skX, rt %= 360, R = ((R + st) * t.radDeg - 0) * f + p - rt, 
                R > 180 ? R -= 360 : -180 > R && (R += 360), a.resultTransform.x = m, a.resultTransform.y = y, 
                a.resultTransform.skX = a.resultTransform.skY = a.resultTransform.skY + R * h, e.update();
            }
        }, e._applyIk3 = function(e, a, s, r, n, h) {
            if (0 != h) {
                var l = NaN, o = NaN, u = a.resultMatrix.a * a.length, c = a.resultMatrix.b * a.length, d = u * u + c * c, _ = Math.sqrt(d), p = e.resultMatrix.tx, f = e.resultMatrix.ty, m = a.resultMatrix.tx, y = a.resultMatrix.ty, x = m - p, g = y - f, v = x * x + g * g, M = Math.sqrt(v);
                x = s - e.resultMatrix.tx, g = r - e.resultMatrix.ty;
                var I = x * x + g * g, N = Math.sqrt(I);
                if (N >= _ + M || M >= N + _ || _ >= N + M) {
                    var b = NaN;
                    b = N >= _ + M ? 1 : -1, m = p + b * (s - p) * M / N, y = f + b * (r - f) * M / N;
                } else {
                    var T = (v - d + I) / (2 * I), A = Math.sqrt(v - T * T * I) / N, C = p + x * T, w = f + g * T, S = -g * A, F = x * A;
                    n > 0 ? (m = C - S, y = w - F) : (m = C + S, y = w + F);
                }
                l = m, o = y, this.isDebug && (this._sp || (this._sp = new D(), i.stage.addChild(this._sp)), 
                this._sp.graphics.clear(), this._sp.graphics.drawCircle(p, f, 15, "#ff00ff"), this._sp.graphics.drawCircle(s, r, 15, "#ffff00"), 
                this._sp.graphics.drawCircle(l, o, 15, "#ff00ff"));
                var k = NaN;
                k = Math.atan2(o - e.resultMatrix.ty, l - e.resultMatrix.tx), e.setRotation(k);
                var P;
                P = t._tempMatrix, P.identity(), P.rotate(k), P.scale(e.resultMatrix.getScaleX(), e.resultMatrix.getScaleY()), 
                P.translate(e.resultMatrix.tx, e.resultMatrix.ty), P.copyTo(e.resultMatrix), e.updateChild();
                var B = NaN;
                B = Math.atan2(r - o, s - l), a.setRotation(B);
                var U;
                U = t._tempMatrix, U.identity(), U.rotate(B), U.scale(a.resultMatrix.getScaleX(), a.resultMatrix.getScaleY()), 
                U.translate(l, o), P.copyTo(a.resultMatrix), a.updateChild();
            }
        }, a(t, [ "radDeg", function() {
            return this.radDeg = 180 / Math.PI;
        }, "degRad", function() {
            return this.degRad = Math.PI / 180;
        }, "_tempMatrix", function() {
            return this._tempMatrix = new m();
        } ]), t;
    }(), K = function() {
        function t() {
            this.name = null, this.targetBoneName = null, this.bendDirection = 1, this.mix = 1, 
            this.isSpine = !0, this.targetBoneIndex = -1, this.boneNames = [], this.boneIndexs = [];
        }
        return s(t, "laya.ani.bone.IkConstraintData"), t;
    }(), Y = function() {
        function t() {}
        return s(t, "laya.ani.bone.MeshTools"), t.findEdge = function(t, e, i) {
            void 0 === e && (e = 0), void 0 === i && (i = !0);
            var a = 0, s = 0, r = 0;
            for (s = t.length, r = -1, a = 0; s > a; a += 2) (0 > r || i == t[r + e] < t[a + e]) && (r = a);
            return r;
        }, t.findBestTriangle = function(e) {
            var i = 0;
            i = t.findEdge(e, 1, !0);
            var a = 0;
            a = t.findEdge(e, 1, !1);
            var s = 0;
            s = t.findEdge(e, 0, !0);
            var r = 0;
            r = t.findEdge(e, 0, !1);
            var n;
            return n = t._bestTriangle, n.length = 0, n.push(s, r), n.indexOf(i) < 0 && n.push(i), 
            n.indexOf(a) < 0 && n.push(a), n;
        }, t.solveMesh = function(e, i) {
            i = i || [], i.length = 0;
            var a;
            a = e.uvs;
            var s;
            s = e.vertices;
            var r, n;
            n = t.findBestTriangle(a);
            var h = 0, l = 0, o = 0;
            h = n[0], l = n[1], o = n[2], t._absArr.length = 0, r = t.solvePoints(e.texture.uv, a[h], a[h + 1], a[l] - a[h], a[l + 1] - a[h + 1], a[o] - a[h], a[o + 1] - a[h + 1], t._absArr);
            var u;
            return u = t.transPoints(r, s[h], s[h + 1], s[l] - s[h], s[l + 1] - s[h + 1], s[o] - s[h], s[o + 1] - s[h + 1], i);
        }, t.solvePoints = function(e, i, a, s, r, n, h, l) {
            l = l || [];
            var o = 0, u = 0;
            u = e.length;
            var c;
            for (o = 0; u > o; o += 2) c = t.solve2(e[o], e[o + 1], i, a, s, r, n, h), l.push(c[0], c[1]);
            return l;
        }, t.transPoints = function(e, i, a, s, r, n, h, l) {
            l = l || [];
            var o = 0, u = 0;
            u = e.length;
            var c;
            for (o = 0; u > o; o += 2) c = t.transPoint(e[o], e[o + 1], i, a, s, r, n, h, l);
            return l;
        }, t.transPoint = function(t, e, i, a, s, r, n, h, l) {
            l = l || [];
            var o = NaN, u = NaN;
            return o = i + s * t + n * e, u = a + r * t + h * e, l.push(o, u), l;
        }, t.solve2 = function(e, i, a, s, r, n, h, l, o, u) {
            void 0 === o && (o = !1), u = u || [];
            var c = NaN, d = NaN;
            if (0 == r) return t.solve2(e, i, a, s, h, l, r, n, !0, u);
            var _ = NaN, p = NaN;
            return _ = e - a, p = i - s, d = (p - _ * n / r) / (l - h * n / r), c = (_ - d * h) / r, 
            o ? u.push(d, c) : u.push(c, d), u;
        }, t.solve = function(e, i, a, s) {
            return t.solve2(e.x, e.y, i.x, i.y, a.x, a.y, s.x, s.y);
        }, t._bestTriangle = [], t._absArr = [], t;
    }(), W = function() {
        function t(t, e) {
            this.target = null, this.data = null, this.bones = null, this.position = NaN, this.spacing = NaN, 
            this.rotateMix = NaN, this.translateMix = NaN, this._debugKey = !1, this._spaces = null, 
            this._segments = [], this._curves = [], this.data = t, this.position = t.position, 
            this.spacing = t.spacing, this.rotateMix = t.rotateMix, this.translateMix = t.translateMix, 
            this.bones = [];
            for (var i = this.data.bones, a = 0, s = i.length; s > a; a++) this.bones.push(e[i[a]]);
        }
        s(t, "laya.ani.bone.PathConstraint");
        var e = t.prototype;
        return e.apply = function(t, e) {
            var i = this.translateMix, a = this.translateMix, s = a > 0, r = this.data.spacingMode, n = "length" == r, h = this.data.rotateMode, l = "tangent" == h, o = "chainScale" == h, u = [], c = this.bones.length, d = l ? c : c + 1, _ = [];
            this._spaces = _, _[0] = this.position;
            var p = this.spacing;
            if (o || n) for (var f = 0, m = d - 1; m > f; ) {
                var y = this.bones[f], x = y.length, g = x * y.resultMatrix.a, v = x * y.resultMatrix.b;
                x = Math.sqrt(g * g + v * v), o && (u[f] = x), _[++f] = n ? Math.max(0, x + p) : p;
            } else for (f = 1; d > f; f++) _[f] = p;
            var D = this.computeWorldPositions(this.target, t, e, d, l, "percent" == this.data.positionMode, "percent" == r);
            if (this._debugKey) {
                for (f = 0; f < D.length; f++) e.drawCircle(D[f++], D[f++], 5, "#00ff00");
                var M = [];
                for (f = 0; f < D.length; f++) M.push(D[f++], D[f++]);
                e.drawLines(0, 0, M, "#ff0000");
            }
            var I = D[0], N = D[1], b = this.data.offsetRotation, T = "chain" == h && 0 == b, A = NaN;
            for (f = 0, A = 3; c > f; f++, A += 3) {
                y = this.bones[f], y.resultMatrix.tx += (I - y.resultMatrix.tx) * i, y.resultMatrix.ty += (N - y.resultMatrix.ty) * i, 
                g = D[A], v = D[A + 1];
                var C = g - I, w = v - N;
                if (o && (x = u[f], 0 != x)) {
                    var S = (Math.sqrt(C * C + w * w) / x - 1) * a + 1;
                    y.resultMatrix.a *= S, y.resultMatrix.c *= S;
                }
                if (I = g, N = v, s) {
                    var F = y.resultMatrix.a, k = y.resultMatrix.c, P = y.resultMatrix.b, B = y.resultMatrix.d, U = NaN, L = NaN, R = NaN;
                    U = l ? D[A - 1] : 0 == _[f + 1] ? D[A + 2] : Math.atan2(w, C), U -= Math.atan2(P, F) - b / 180 * Math.PI, 
                    T && (L = Math.cos(U), R = Math.sin(U), x = y.length, I += (x * (L * F - R * P) - C) * a, 
                    N += (x * (R * F + L * P) - w) * a), U > Math.PI ? U -= 2 * Math.PI : U < -Math.PI && (U += 2 * Math.PI), 
                    U *= a, L = Math.cos(U), R = Math.sin(U), y.resultMatrix.a = L * F - R * P, y.resultMatrix.c = L * k - R * B, 
                    y.resultMatrix.b = R * F + L * P, y.resultMatrix.d = R * k + L * B;
                }
            }
        }, e.computeWorldVertices2 = function(e, i, a, s, r, n) {
            var h, l, o = e.currDisplayData.bones, u = e.currDisplayData.weights, c = e.currDisplayData.triangles, d = 0, _ = 0, p = 0, f = 0, m = 0, y = 0, x = 0, g = 0, v = 0, D = 0, M = 0;
            if (null != o) {
                for (d = 0; a > d; d += 2) f = o[_], _ += f + 1, p += f;
                var I = i;
                for (m = n, y = 3 * p; s > m; m += 2) {
                    for (x = 0, g = 0, f = o[_++], f += _; f > _; _++, y += 3) {
                        h = I[o[_]].resultMatrix, v = u[y], D = u[y + 1];
                        var N = u[y + 2];
                        x += (v * h.a + D * h.c + h.tx) * N, g += (v * h.b + D * h.d + h.ty) * N;
                    }
                    r[m] = x, r[m + 1] = g;
                }
            } else {
                c || (c = u), e.deformData && (c = e.deformData);
                var b;
                if (b = e.parent, i) for (M = i.length, d = 0; M > d; d++) if (i[d].name = b) {
                    l = i[d];
                    break;
                }
                var T;
                l && (T = l.resultMatrix), T || (T = t._tempMt);
                var A = T.tx, C = T.ty, w = T.a, S = T.b, F = T.c, k = T.d;
                for (l && (k *= l.d), _ = a, m = n; s > m; _ += 2, m += 2) v = c[_], D = c[_ + 1], 
                r[m] = v * w + D * S + A, r[m + 1] = -(v * F + D * k + C);
            }
        }, e.computeWorldPositions = function(t, e, i, a, s, r, n) {
            var h = (t.currDisplayData.bones, t.currDisplayData.weights, t.currDisplayData.triangles, 
            []), l = 0, o = t.currDisplayData.verLen, u = this.position, c = this._spaces, d = [], _ = [], p = !1, f = o / 6, m = -1, y = NaN, x = 0, g = 0, v = NaN, D = NaN, M = NaN, I = NaN;
            if (p) o += 2, d[o - 2] = d[0], d[o - 1] = d[1]; else {
                if (f--, o -= 4, this.computeWorldVertices2(t, e, 2, o, h, 0), this._debugKey) for (l = 0; l < h.length; ) i.drawCircle(h[l++], h[l++], 10, "#ff0000");
                d = h;
            }
            this._curves.length = f;
            var N = this._curves;
            y = 0;
            var b = d[0], T = d[1], A = 0, C = 0, w = 0, S = 0, F = 0, k = 0, P = NaN, B = NaN, U = NaN, L = NaN, R = NaN, O = NaN, E = NaN, K = NaN, Y = 0;
            for (l = 0, Y = 2; f > l; l++, Y += 6) A = d[Y], C = d[Y + 1], w = d[Y + 2], S = d[Y + 3], 
            F = d[Y + 4], k = d[Y + 5], P = .1875 * (b - 2 * A + w), B = .1875 * (T - 2 * C + S), 
            U = .09375 * (3 * (A - w) - b + F), L = .09375 * (3 * (C - S) - T + k), R = 2 * P + U, 
            O = 2 * B + L, E = .75 * (A - b) + P + .16666667 * U, K = .75 * (C - T) + B + .16666667 * L, 
            y += Math.sqrt(E * E + K * K), E += R, K += O, R += U, O += L, y += Math.sqrt(E * E + K * K), 
            E += R, K += O, y += Math.sqrt(E * E + K * K), E += R + U, K += O + L, y += Math.sqrt(E * E + K * K), 
            N[l] = y, b = F, T = k;
            if (r && (u *= y), n) for (l = 0; a > l; l++) c[l] *= y;
            var W = this._segments, V = 0, X = 0;
            for (l = 0, x = 0, g = 0, X = 0; a > l; l++, x += 3) {
                if (D = c[l], u += D, v = u, p) v %= y, 0 > v && (v += y), g = 0; else {
                    if (0 > v) {
                        this.addBeforePosition(v, d, 0, _, x);
                        continue;
                    }
                    if (v > y) {
                        this.addAfterPosition(v - y, d, o - 4, _, x);
                        continue;
                    }
                }
                for (;;g++) if (I = N[g], !(v > I)) {
                    0 == g ? v /= I : (M = N[g - 1], v = (v - M) / (I - M));
                    break;
                }
                if (g != m) {
                    m = g;
                    var z = 6 * g;
                    for (b = d[z], T = d[z + 1], A = d[z + 2], C = d[z + 3], w = d[z + 4], S = d[z + 5], 
                    F = d[z + 6], k = d[z + 7], P = .03 * (b - 2 * A + w), B = .03 * (T - 2 * C + S), 
                    U = .006 * (3 * (A - w) - b + F), L = .006 * (3 * (C - S) - T + k), R = 2 * P + U, 
                    O = 2 * B + L, E = .3 * (A - b) + P + .16666667 * U, K = .3 * (C - T) + B + .16666667 * L, 
                    V = Math.sqrt(E * E + K * K), W[0] = V, z = 1; 8 > z; z++) E += R, K += O, R += U, 
                    O += L, V += Math.sqrt(E * E + K * K), W[z] = V;
                    E += R, K += O, V += Math.sqrt(E * E + K * K), W[8] = V, E += R + U, K += O + L, 
                    V += Math.sqrt(E * E + K * K), W[9] = V, X = 0;
                }
                for (v *= V; ;X++) if (I = W[X], !(v > I)) {
                    0 == X ? v /= I : (M = W[X - 1], v = X + (v - M) / (I - M));
                    break;
                }
                this.addCurvePosition(.1 * v, b, T, A, C, w, S, F, k, _, x, s || l > 0 && 0 == D);
            }
            return _;
        }, e.addBeforePosition = function(t, e, i, a, s) {
            var r = e[i], n = e[i + 1], h = e[i + 2] - r, l = e[i + 3] - n, o = Math.atan2(l, h);
            a[s] = r + t * Math.cos(o), a[s + 1] = n + t * Math.sin(o), a[s + 2] = o;
        }, e.addAfterPosition = function(t, e, i, a, s) {
            var r = e[i + 2], n = e[i + 3], h = r - e[i], l = n - e[i + 1], o = Math.atan2(l, h);
            a[s] = r + t * Math.cos(o), a[s + 1] = n + t * Math.sin(o), a[s + 2] = o;
        }, e.addCurvePosition = function(t, e, i, a, s, r, n, h, l, o, u, c) {
            0 == t && (t = 1e-4);
            var d = t * t, _ = d * t, p = 1 - t, f = p * p, m = f * p, y = p * t, x = 3 * y, g = p * x, v = x * t, D = e * m + a * g + r * v + h * _, M = i * m + s * g + n * v + l * _;
            o[u] = D, o[u + 1] = M, c ? o[u + 2] = Math.atan2(M - (i * f + s * y * 2 + n * d), D - (e * f + a * y * 2 + r * d)) : o[u + 2] = 0;
        }, t.NONE = -1, t.BEFORE = -2, t.AFTER = -3, a(t, [ "_tempMt", function() {
            return this._tempMt = new m();
        } ]), t;
    }(), V = function() {
        function t() {
            this.name = null, this.target = null, this.positionMode = null, this.spacingMode = null, 
            this.rotateMode = null, this.offsetRotation = NaN, this.position = NaN, this.spacing = NaN, 
            this.rotateMix = NaN, this.translateMix = NaN, this.bones = [];
        }
        return s(t, "laya.ani.bone.PathConstraintData"), t;
    }(), X = function() {
        function t() {
            this.name = null, this.slotArr = [];
        }
        return s(t, "laya.ani.bone.SkinData"), t;
    }(), z = function() {
        function t() {
            this.name = null, this.attachmentName = null, this.type = 0, this.transform = null, 
            this.width = NaN, this.height = NaN, this.texture = null, this.bones = null, this.uvs = null, 
            this.weights = null, this.triangles = null, this.vertices = null, this.lengths = null, 
            this.verLen = 0;
        }
        s(t, "laya.ani.bone.SkinSlotDisplayData");
        var e = t.prototype;
        return e.createTexture = function(t) {
            return this.texture ? this.texture : (this.texture = new I(t.bitmap, this.uvs), 
            this.uvs[0] > this.uvs[4] && this.uvs[1] > this.uvs[5] ? (this.texture.width = t.height, 
            this.texture.height = t.width, this.texture.offsetX = -t.offsetX, this.texture.offsetY = -t.offsetY, 
            this.texture.sourceWidth = t.sourceHeight, this.texture.sourceHeight = t.sourceWidth) : (this.texture.width = t.width, 
            this.texture.height = t.height, this.texture.offsetX = -t.offsetX, this.texture.offsetY = -t.offsetY, 
            this.texture.sourceWidth = t.sourceWidth, this.texture.sourceHeight = t.sourceHeight), 
            this.texture);
        }, e.destory = function() {
            this.texture && this.texture.destroy();
        }, t;
    }(), G = function() {
        function t() {
            this.name = null, this.displayArr = [];
        }
        s(t, "laya.ani.bone.SlotData");
        var e = t.prototype;
        return e.getDisplayByName = function(t) {
            for (var e, i = 0, a = this.displayArr.length; a > i; i++) if (e = this.displayArr[i], 
            e.attachmentName == t) return i;
            return -1;
        }, t;
    }(), q = function() {
        function t(t, e) {
            this._data = null, this._bones = null, this.target = null, this.rotateMix = NaN, 
            this.translateMix = NaN, this.scaleMix = NaN, this.shearMix = NaN, this._temp = n(2, 0), 
            this._data = t, null == this._bones && (this._bones = []), this.target = e[t.targetIndex];
            var i = 0, a = 0;
            for (i = 0, a = t.boneIndexs.length; a > i; i++) this._bones.push(e[t.boneIndexs[i]]);
            this.rotateMix = t.rotateMix, this.translateMix = t.translateMix, this.scaleMix = t.scaleMix, 
            this.shearMix = t.shearMix;
        }
        s(t, "laya.ani.bone.TfConstraint");
        var e = t.prototype;
        return e.apply = function() {
            for (var t, e = this.target.resultMatrix.a, i = this.target.resultMatrix.b, a = this.target.resultMatrix.c, s = this.target.resultMatrix.d, r = 0, n = this._bones.length; n > r; r++) {
                if (t = this._bones[r], this.rotateMix > 0) {
                    var h = t.resultMatrix.a, l = t.resultMatrix.b, o = t.resultMatrix.c, u = t.resultMatrix.d, c = Math.atan2(a, e) - Math.atan2(o, h) + this._data.offsetRotation * Math.PI / 180;
                    c > Math.PI ? c -= 2 * Math.PI : c < -Math.PI && (c += 2 * Math.PI), c *= this.rotateMix;
                    var d = Math.cos(c), _ = Math.sin(c);
                    t.resultMatrix.a = d * h - _ * o, t.resultMatrix.b = d * l - _ * u, t.resultMatrix.c = _ * h + d * o, 
                    t.resultMatrix.d = _ * l + d * u;
                }
                if (this.translateMix && (this._temp[0] = this._data.offsetX, this._temp[1] = this._data.offsetY, 
                this.target.localToWorld(this._temp), t.resultMatrix.tx += (this._temp[0] - t.resultMatrix.tx) * this.translateMix, 
                t.resultMatrix.ty += (this._temp[1] - t.resultMatrix.ty) * this.translateMix, t.updateChild()), 
                this.scaleMix > 0) {
                    var p = Math.sqrt(t.resultMatrix.a * t.resultMatrix.a + t.resultMatrix.c * t.resultMatrix.c), f = Math.sqrt(e * e + a * a), m = p > 1e-5 ? (p + (f - p + this._data.offsetScaleX) * this.scaleMix) / p : 0;
                    t.resultMatrix.a *= m, t.resultMatrix.c *= m, p = Math.sqrt(t.resultMatrix.b * t.resultMatrix.b + t.resultMatrix.d * t.resultMatrix.d), 
                    f = Math.sqrt(i * i + s * s), m = p > 1e-5 ? (p + (f - p + this._data.offsetScaleY) * this.scaleMix) / p : 0, 
                    t.resultMatrix.b *= m, t.resultMatrix.d *= m;
                }
                if (this.shearMix > 0) {
                    l = t.resultMatrix.b, u = t.resultMatrix.d;
                    var y = Math.atan2(u, l);
                    c = Math.atan2(s, i) - Math.atan2(a, e) - (y - Math.atan2(t.resultMatrix.c, t.resultMatrix.a)), 
                    c > Math.PI ? c -= 2 * Math.PI : c < -Math.PI && (c += 2 * Math.PI), c = y + (c + this._data.offsetShearY * Math.PI / 180) * this.shearMix, 
                    m = Math.sqrt(l * l + u * u), t.resultMatrix.b = Math.cos(c) * m, t.resultMatrix.d = Math.sin(c) * m;
                }
            }
        }, t;
    }(), H = function() {
        function t() {
            this.name = null, this.targetIndex = 0, this.rotateMix = NaN, this.translateMix = NaN, 
            this.scaleMix = NaN, this.shearMix = NaN, this.offsetRotation = NaN, this.offsetX = NaN, 
            this.offsetY = NaN, this.offsetScaleX = NaN, this.offsetScaleY = NaN, this.offsetShearY = NaN, 
            this.boneIndexs = [];
        }
        return s(t, "laya.ani.bone.TfConstraintData"), t;
    }(), Q = function() {
        function t() {
            this.skX = 0, this.skY = 0, this.scX = 1, this.scY = 1, this.x = 0, this.y = 0, 
            this.skewX = 0, this.skewY = 0, this.mMatrix = null;
        }
        s(t, "laya.ani.bone.Transform");
        var e = t.prototype;
        return e.initData = function(t) {
            void 0 != t.x && (this.x = t.x), void 0 != t.y && (this.y = t.y), void 0 != t.skX && (this.skX = t.skX), 
            void 0 != t.skY && (this.skY = t.skY), void 0 != t.scX && (this.scX = t.scX), void 0 != t.scY && (this.scY = t.scY);
        }, e.getMatrix = function() {
            var t;
            return t = this.mMatrix ? this.mMatrix : this.mMatrix = new m(), t.identity(), t.scale(this.scX, this.scY), 
            (this.skewX || this.skewY) && this.skew(t, this.skewX * Math.PI / 180, this.skewY * Math.PI / 180), 
            t.rotate(this.skX * Math.PI / 180), t.translate(this.x, this.y), t;
        }, e.skew = function(t, e, i) {
            var a = Math.sin(i), s = Math.cos(i), r = Math.sin(e), n = Math.cos(e);
            return t.setTo(t.a * n - t.b * a, t.a * r + t.b * s, t.c * n - t.d * a, t.c * r + t.d * s, t.tx * n - t.ty * a, t.tx * r + t.ty * s), 
            t;
        }, t;
    }(), Z = function() {
        function t() {}
        return s(t, "laya.ani.bone.UVTools"), t.getRelativeUV = function(t, e, i) {
            var a = t[0], s = t[2] - t[0], r = t[1], n = t[5] - t[1];
            i || (i = []), i.length = e.length;
            var h = 0, l = 0;
            l = i.length;
            var o = 1 / s, u = 1 / n;
            for (h = 0; l > h; h += 2) i[h] = (e[h] - a) * o, i[h + 1] = (e[h + 1] - r) * u;
            return i;
        }, t.getAbsoluteUV = function(t, e, i) {
            if (0 == t[0] && 0 == t[1] && 1 == t[4] && 1 == t[5]) return i ? (b.copyArray(i, e), 
            i) : e;
            var a = t[0], s = t[2] - t[0], r = t[1], n = t[5] - t[1];
            i || (i = []), i.length = e.length;
            var h = 0, l = 0;
            for (l = i.length, h = 0; l > h; h += 2) i[h] = e[h] * s + a, i[h + 1] = e[h + 1] * n + r;
            return i;
        }, t;
    }(), $ = function() {
        function t() {
            this.startTime = NaN, this.duration = NaN, this.interpolationData = null, this.data = null, 
            this.dData = null, this.nextData = null;
        }
        return s(t, "laya.ani.KeyFramesContent"), t;
    }(), j = function() {
        function t() {}
        return s(t, "laya.ani.math.BezierLerp"), t.getBezierRate = function(e, i, a, s, r) {
            var n = t._getBezierParamKey(i, a, s, r), h = 100 * n + e;
            if (t._bezierResultCache[h]) return t._bezierResultCache[h];
            var l = t._getBezierPoints(i, a, s, r, n), o = 0, u = 0;
            for (u = l.length, o = 0; u > o; o += 2) if (e <= l[o]) return t._bezierResultCache[h] = l[o + 1], 
            l[o + 1];
            return t._bezierResultCache[h] = 1, 1;
        }, t._getBezierParamKey = function(t, e, i, a) {
            return 100 * (100 * (100 * (100 * t + e) + i) + a);
        }, t._getBezierPoints = function(e, i, a, s, r) {
            if (t._bezierPointsCache[r]) return t._bezierPointsCache[r];
            var n;
            n = [ 0, 0, e, i, a, s, 1, 1 ];
            var l;
            l = new h();
            var o;
            return o = l.getBezierPoints(n, 100, 3), t._bezierPointsCache[r] = o, o;
        }, t._bezierResultCache = {}, t._bezierPointsCache = {}, t;
    }(), J = function(t) {
        function e() {
            this._destroyed = !1, this._templet = null, this._currentTime = NaN, this._currentFrameTime = NaN, 
            this._playStart = NaN, this._playEnd = NaN, this._playDuration = NaN, this._overallDuration = NaN, 
            this._stopWhenCircleFinish = !1, this._elapsedPlaybackTime = NaN, this._startUpdateLoopCount = NaN, 
            this._currentAnimationClipIndex = 0, this._currentKeyframeIndex = 0, this._paused = !1, 
            this._cacheFrameRate = 0, this._cacheFrameRateInterval = NaN, this._cachePlayRate = NaN, 
            this._fullFrames = null, this.isCache = !0, this.playbackRate = 1, this.returnToZeroStopped = !1, 
            e.__super.call(this), this._destroyed = !1, this._currentAnimationClipIndex = -1, 
            this._currentKeyframeIndex = -1, this._currentTime = 0, this._overallDuration = Number.MAX_VALUE, 
            this._stopWhenCircleFinish = !1, this._elapsedPlaybackTime = 0, this._startUpdateLoopCount = -1, 
            this._cachePlayRate = 1, this.cacheFrameRate = 60, this.returnToZeroStopped = !1;
        }
        s(e, "laya.ani.AnimationPlayer", t);
        var a = e.prototype;
        return i.imps(a, {
            "laya.resource.IDestroy": !0
        }), a._onTempletLoadedComputeFullKeyframeIndices = function(t, e, i) {
            this._templet === i && this._cachePlayRate === t && this._cacheFrameRate === e && this._computeFullKeyframeIndices();
        }, a._computeFullKeyframeIndices = function() {
            for (var t = this._fullFrames = [], e = this._templet, i = this._cacheFrameRateInterval * this._cachePlayRate, a = 0, s = e.getAnimationCount(); s > a; a++) {
                for (var r = [], n = 0, h = e.getAnimation(a).nodes.length; h > n; n++) {
                    for (var l = e.getAnimation(a).nodes[n], o = Math.floor(l.playTime / i + .01), u = new Uint16Array(o + 1), c = -1, d = 0, _ = l.keyFrame.length; _ > d; d++) {
                        var p = l.keyFrame[d], f = p.startTime, m = f + p.duration + i;
                        do {
                            for (var y = Math.floor(f / i + .5), x = c + 1; y > x; x++) u[x] = d;
                            c = y, u[y] = d, f += i;
                        } while (m >= f);
                    }
                    r.push(u);
                }
                t.push(r);
            }
        }, a._onAnimationTempletLoaded = function() {
            this.destroyed || this._calculatePlayDuration();
        }, a._calculatePlayDuration = function() {
            if (0 !== this.state) {
                var t = this._templet.getAniDuration(this._currentAnimationClipIndex);
                0 === this._playEnd && (this._playEnd = t), this._playEnd > t && (this._playEnd = t), 
                this._playDuration = this._playEnd - this._playStart;
            }
        }, a._setPlayParams = function(t, e) {
            this._currentTime = t, this._currentKeyframeIndex = Math.floor(this.currentPlayTime / e + .01), 
            this._currentFrameTime = this._currentKeyframeIndex * e;
        }, a._setPlayParamsWhenStop = function(t, e) {
            this._currentTime = t, this._currentKeyframeIndex = Math.floor(t / e + .01), this._currentFrameTime = this._currentKeyframeIndex * e, 
            this._currentAnimationClipIndex = -1;
        }, a._update = function(t) {
            if (-1 !== this._currentAnimationClipIndex && !this._paused && this._templet && this._templet.loaded) {
                var e = this._cacheFrameRateInterval * this._cachePlayRate, i = 0;
                this._startUpdateLoopCount !== M.loopCount && (i = t * this.playbackRate, this._elapsedPlaybackTime += i);
                var a = this.playDuration;
                if (0 !== this._overallDuration && this._elapsedPlaybackTime >= this._overallDuration || 0 === this._overallDuration && this._elapsedPlaybackTime >= a) return this._setPlayParamsWhenStop(a, e), 
                void this.event("stopped");
                if (i += this._currentTime, a > 0) if (i >= a) {
                    do {
                        if (i -= a, this._stopWhenCircleFinish) return this._setPlayParamsWhenStop(a, e), 
                        this._stopWhenCircleFinish = !1, void this.event("stopped");
                        a > i && (this._setPlayParams(i, e), this.event("complete"));
                    } while (i >= a);
                } else this._setPlayParams(i, e); else {
                    if (this._stopWhenCircleFinish) return this._setPlayParamsWhenStop(a, e), this._stopWhenCircleFinish = !1, 
                    void this.event("stopped");
                    this._currentTime = this._currentFrameTime = this._currentKeyframeIndex = 0, this.event("complete");
                }
            }
        }, a._destroy = function() {
            this.offAll(), this._templet = null, this._fullFrames = null, this._destroyed = !0;
        }, a.play = function(t, e, i, a, s) {
            if (void 0 === t && (t = 0), void 0 === e && (e = 1), void 0 === i && (i = 2147483647), 
            void 0 === a && (a = 0), void 0 === s && (s = 0), !this._templet) throw new Error("AnimationPlayer:templet must not be null,maybe you need to set url.");
            if (0 > i || 0 > a || 0 > s) throw new Error("AnimationPlayer:overallDuration,playStart and playEnd must large than zero.");
            if (0 !== s && a > s) throw new Error("AnimationPlayer:start must less than end.");
            this._currentTime = 0, this._currentFrameTime = 0, this._elapsedPlaybackTime = 0, 
            this.playbackRate = e, this._overallDuration = i, this._playStart = a, this._playEnd = s, 
            this._paused = !1, this._currentAnimationClipIndex = t, this._currentKeyframeIndex = 0, 
            this._startUpdateLoopCount = M.loopCount, this.event("played"), this._templet.loaded ? this._calculatePlayDuration() : this._templet.once("loaded", this, this._onAnimationTempletLoaded), 
            this._update(0);
        }, a.playByFrame = function(t, e, i, a, s, r) {
            void 0 === t && (t = 0), void 0 === e && (e = 1), void 0 === i && (i = 2147483647), 
            void 0 === a && (a = 0), void 0 === s && (s = 0), void 0 === r && (r = 30);
            var n = 1e3 / r;
            this.play(t, e, i, a * n, s * n);
        }, a.stop = function(t) {
            void 0 === t && (t = !0), t ? (this._currentTime = this._currentFrameTime = this._currentKeyframeIndex = 0, 
            this._currentAnimationClipIndex = -1, this.event("stopped")) : this._stopWhenCircleFinish = !0;
        }, r(0, a, "playEnd", function() {
            return this._playEnd;
        }), r(0, a, "templet", function() {
            return this._templet;
        }, function(t) {
            0 === !this.state && this.stop(!0), this._templet !== t && (this._templet = t, t.loaded ? this._computeFullKeyframeIndices() : t.once("loaded", this, this._onTempletLoadedComputeFullKeyframeIndices, [ this._cachePlayRate, this._cacheFrameRate ]));
        }), r(0, a, "playStart", function() {
            return this._playStart;
        }), r(0, a, "playDuration", function() {
            return this._playDuration;
        }), r(0, a, "state", function() {
            return -1 === this._currentAnimationClipIndex ? 0 : this._paused ? 1 : 2;
        }), r(0, a, "currentKeyframeIndex", function() {
            return this._currentKeyframeIndex;
        }), r(0, a, "overallDuration", function() {
            return this._overallDuration;
        }), r(0, a, "currentFrameTime", function() {
            return this._currentFrameTime;
        }), r(0, a, "currentAnimationClipIndex", function() {
            return this._currentAnimationClipIndex;
        }), r(0, a, "currentPlayTime", function() {
            return this._currentTime + this._playStart;
        }), r(0, a, "cachePlayRate", function() {
            return this._cachePlayRate;
        }, function(t) {
            this._cachePlayRate !== t && (this._cachePlayRate = t, this._templet && (this._templet.loaded ? this._computeFullKeyframeIndices() : this._templet.once("loaded", this, this._onTempletLoadedComputeFullKeyframeIndices, [ t, this._cacheFrameRate ])));
        }), r(0, a, "cacheFrameRate", function() {
            return this._cacheFrameRate;
        }, function(t) {
            this._cacheFrameRate !== t && (this._cacheFrameRate = t, this._cacheFrameRateInterval = 1e3 / this._cacheFrameRate, 
            this._templet && (this._templet.loaded ? this._computeFullKeyframeIndices() : this._templet.once("loaded", this, this._onTempletLoadedComputeFullKeyframeIndices, [ this._cachePlayRate, t ])));
        }), r(0, a, "currentTime", null, function(t) {
            if (-1 !== this._currentAnimationClipIndex && this._templet && this._templet.loaded) {
                if (t < this._playStart || t > this._playEnd) throw new Error("AnimationPlayer:value must large than playStartTime,small than playEndTime.");
                this._startUpdateLoopCount = M.loopCount;
                var e = this._cacheFrameRateInterval * this._cachePlayRate;
                this._currentTime = t, this._currentKeyframeIndex = Math.floor(this.currentPlayTime / e), 
                this._currentFrameTime = this._currentKeyframeIndex * e;
            }
        }), r(0, a, "paused", function() {
            return this._paused;
        }, function(t) {
            this._paused = t, t && this.event("paused");
        }), r(0, a, "cacheFrameRateInterval", function() {
            return this._cacheFrameRateInterval;
        }), r(0, a, "destroyed", function() {
            return this._destroyed;
        }), e;
    }(u), tt = function(t) {
        function e() {
            e.__super.call(this), x.isConchNode && (this.drawSkin = function(t) {
                t.transform || (t.transform = m.EMPTY), this.setSkinMesh && this.setSkinMesh(t._ps, t.mVBData, t.mEleNum, 0, t.mTexture, t.transform);
            });
        }
        s(e, "laya.ani.GraphicsAni", t);
        var i = e.prototype;
        return i.drawSkin = function(t) {
            var e = [ t ];
            this._saveToCmd(x._context._drawSkin, e);
        }, e;
    }(c), et = function(t) {
        function e() {
            e.__super.call(this), this.mesh = new P();
        }
        s(e, "laya.ani.bone.canvasmesh.SkinMeshCanvas", t);
        var i = e.prototype;
        return i.init2 = function(t, e, i, a, s) {
            this.transform && (this.transform = null);
            var r;
            i ? r = i : (r = [], r.push(0, 1, 3, 3, 1, 2)), this.mesh.texture = t, this.mesh.indexes = r, 
            this.mesh.vertices = a, this.mesh.uvs = s;
        }, i.render = function(t, i, a) {
            this.mesh.texture && (this.transform ? (this.transform.translate(i, a), this.renderToContext(t), 
            this.transform.translate(-i, -a)) : (this.transform = e._tempMatrix, this.transform.identity(), 
            this.transform.translate(i, a), this.renderToContext(t), this.transform.translate(-i, -a), 
            this.transform = null));
        }, a(e, [ "_tempMatrix", function() {
            return this._tempMatrix = new m();
        } ]), e;
    }(k), it = function(t) {
        function e() {
            this._aniMap = {}, this.unfixedLastAniIndex = -1, e.__super.call(this), this._anis = new Array();
        }
        s(e, "laya.ani.AnimationTemplet", t);
        var a = e.prototype;
        return a.parse = function(t) {
            var e = new o(t);
            this._aniVersion = e.readUTFString(), C.parse(this, e);
        }, a._endLoaded = function() {
            this._loaded = !0, this.event("loaded", this);
        }, a._calculateKeyFrame = function(t, e, i) {
            var a = t.keyFrame;
            a[e] = a[0];
            for (var s = 0; e > s; s++) for (var r = a[s], n = 0; i > n; n++) r.dData[n] = 0 === r.duration ? 0 : (a[s + 1].data[n] - r.data[n]) / r.duration, 
            r.nextData[n] = a[s + 1].data[n];
            a.length--;
        }, a.onAsynLoaded = function(t, e, i) {
            var a = new o(e);
            switch (this._aniVersion = a.readUTFString(), this._aniVersion) {
              case "LAYAANIMATION:02":
                w.parse(this, a);
                break;

              default:
                C.parse(this, a);
            }
            this._endLoaded();
        }, a.getAnimationCount = function() {
            return this._anis.length;
        }, a.getAnimation = function(t) {
            return this._anis[t];
        }, a.getAniDuration = function(t) {
            return this._anis[t].playTime;
        }, a.getNodes = function(t) {
            return this._anis[t].nodes;
        }, a.getNodeIndexWithName = function(t, e) {
            return this._anis[t].bone3DMap[e];
        }, a.getNodeCount = function(t) {
            return this._anis[t].nodes.length;
        }, a.getTotalkeyframesLength = function(t) {
            return this._anis[t].totalKeyframeDatasLength;
        }, a.getPublicExtData = function() {
            return this._publicExtData;
        }, a.getAnimationDataWithCache = function(t, e, i, a) {
            var s = e[i];
            if (s) {
                var r = s[t];
                return r ? r[a] : null;
            }
            return null;
        }, a.setAnimationDataWithCache = function(t, e, i, a, s) {
            var r = e[i] || (e[i] = {}), n = r[t] || (r[t] = []);
            n[a] = s;
        }, a.getOriginalData = function(t, i, a, s, r) {
            for (var n = this._anis[t], h = n.nodes, l = 0, o = 0, u = h.length, c = 0; u > o; o++) {
                var d, _ = h[o];
                d = _.keyFrame[a[o][s]], _.dataOffset = c;
                var p = r - d.startTime, f = _.lerpType;
                if (f) switch (f) {
                  case 0:
                  case 1:
                    for (l = 0; l < _.keyframeWidth; ) l += _.interpolationMethod[l](_, l, i, c + l, d.data, p, d.dData, d.duration, d.nextData);
                    break;

                  case 2:
                    var m = d.interpolationData, y = m.length, x = 0;
                    for (l = 0; y > l; ) {
                        var g = m[l];
                        switch (g) {
                          case 6:
                            l += e.interpolation[g](_, x, i, c + x, d.data, p, d.dData, d.duration, d.nextData, m, l + 1);
                            break;

                          case 7:
                            l += e.interpolation[g](_, x, i, c + x, d.data, p, d.dData, d.duration, d.nextData, m, l + 1);
                            break;

                          default:
                            l += e.interpolation[g](_, x, i, c + x, d.data, p, d.dData, d.duration, d.nextData);
                        }
                        x++;
                    }
                } else for (l = 0; l < _.keyframeWidth; ) l += _.interpolationMethod[l](_, l, i, c + l, d.data, p, d.dData, d.duration, d.nextData);
                c += _.keyframeWidth;
            }
        }, a.getNodesCurrentFrameIndex = function(t, e) {
            var i = this._anis[t], a = i.nodes;
            t !== this.unfixedLastAniIndex && (this.unfixedCurrentFrameIndexes = new Uint32Array(a.length), 
            this.unfixedCurrentTimes = new Float32Array(a.length), this.unfixedLastAniIndex = t);
            for (var s = 0, r = a.length; r > s; s++) {
                var n = a[s];
                for (e < this.unfixedCurrentTimes[s] && (this.unfixedCurrentFrameIndexes[s] = 0), 
                this.unfixedCurrentTimes[s] = e; this.unfixedCurrentFrameIndexes[s] < n.keyFrame.length && !(n.keyFrame[this.unfixedCurrentFrameIndexes[s]].startTime > this.unfixedCurrentTimes[s]); ) this.unfixedCurrentFrameIndexes[s]++;
                this.unfixedCurrentFrameIndexes[s]--;
            }
            return this.unfixedCurrentFrameIndexes;
        }, a.getOriginalDataUnfixedRate = function(t, i, a) {
            var s = this._anis[t], r = s.nodes;
            t !== this.unfixedLastAniIndex && (this.unfixedCurrentFrameIndexes = new Uint32Array(r.length), 
            this.unfixedCurrentTimes = new Float32Array(r.length), this.unfixedKeyframes = n(r.length), 
            this.unfixedLastAniIndex = t);
            for (var h = 0, l = 0, o = r.length, u = 0; o > l; l++) {
                var c = r[l];
                for (a < this.unfixedCurrentTimes[l] && (this.unfixedCurrentFrameIndexes[l] = 0), 
                this.unfixedCurrentTimes[l] = a; this.unfixedCurrentFrameIndexes[l] < c.keyFrame.length && !(c.keyFrame[this.unfixedCurrentFrameIndexes[l]].startTime > this.unfixedCurrentTimes[l]); ) this.unfixedKeyframes[l] = c.keyFrame[this.unfixedCurrentFrameIndexes[l]], 
                this.unfixedCurrentFrameIndexes[l]++;
                var d = this.unfixedKeyframes[l];
                c.dataOffset = u;
                var _ = a - d.startTime, p = c.lerpType;
                if (p) switch (c.lerpType) {
                  case 0:
                  case 1:
                    for (h = 0; h < c.keyframeWidth; ) h += c.interpolationMethod[h](c, h, i, u + h, d.data, _, d.dData, d.duration, d.nextData);
                    break;

                  case 2:
                    var f = d.interpolationData, m = f.length, y = 0;
                    for (h = 0; m > h; ) {
                        var x = f[h];
                        switch (x) {
                          case 6:
                            h += e.interpolation[x](c, y, i, u + y, d.data, _, d.dData, d.duration, d.nextData, f, h + 1);
                            break;

                          case 7:
                            h += e.interpolation[x](c, y, i, u + y, d.data, _, d.dData, d.duration, d.nextData, f, h + 1);
                            break;

                          default:
                            h += e.interpolation[x](c, y, i, u + y, d.data, _, d.dData, d.duration, d.nextData);
                        }
                        y++;
                    }
                } else for (h = 0; h < c.keyframeWidth; ) h += c.interpolationMethod[h](c, h, i, u + h, d.data, _, d.dData, d.duration, d.nextData);
                u += c.keyframeWidth;
            }
        }, a.dispose = function() {
            this.resourceManager && this.resourceManager.removeResource(this), t.prototype.dispose.call(this);
        }, e._LinearInterpolation_0 = function(t, e, i, a, s, r, n, h, l, o) {
            return i[a] = s[e] + r * n[e], 1;
        }, e._QuaternionInterpolation_1 = function(t, e, i, a, s, r, n, h, l, o) {
            var u = 0 === h ? 0 : r / h;
            return f.slerpQuaternionArray(s, e, l, e, u, i, a), 4;
        }, e._AngleInterpolation_2 = function(t, e, i, a, s, r, n, h, l, o) {
            return 0;
        }, e._RadiansInterpolation_3 = function(t, e, i, a, s, r, n, h, l, o) {
            return 0;
        }, e._Matrix4x4Interpolation_4 = function(t, e, i, a, s, r, n, h, l, o) {
            for (var u = 0; 16 > u; u++, e++) i[a + u] = s[e] + r * n[e];
            return 16;
        }, e._NoInterpolation_5 = function(t, e, i, a, s, r, n, h, l, o) {
            return i[a] = s[e], 1;
        }, e._BezierInterpolation_6 = function(t, e, i, a, s, r, n, h, l, o, u) {
            return void 0 === u && (u = 0), i[a] = s[e] + (l[e] - s[e]) * j.getBezierRate(r / h, o[u], o[u + 1], o[u + 2], o[u + 3]), 
            5;
        }, e._BezierInterpolation_7 = function(t, e, i, a, s, r, n, h, l, o, u) {
            return void 0 === u && (u = 0), i[a] = o[u + 4] + o[u + 5] * j.getBezierRate((.001 * r + o[u + 6]) / o[u + 7], o[u], o[u + 1], o[u + 2], o[u + 3]), 
            9;
        }, e.load = function(t) {
            return i.loader.create(t, null, null, e);
        }, e.interpolation = [ e._LinearInterpolation_0, e._QuaternionInterpolation_1, e._AngleInterpolation_2, e._RadiansInterpolation_3, e._Matrix4x4Interpolation_4, e._NoInterpolation_5, e._BezierInterpolation_6, e._BezierInterpolation_7 ], 
        e;
    }(g), at = (function(t) {
        function e() {
            this.isCached = !1, this.canvas = null, this.tex = null, this.rec = null, e.__super.call(this);
        }
        s(e, "laya.ani.bone.canvasmesh.CacheAbleSkinMesh", t);
        var i = e.prototype;
        return i.getCanvasPic = function() {
            var t = new d("2D"), i = t.getContext("2d");
            this.rec = this.mesh.getBounds(), t.size(this.rec.width, this.rec.height);
            var a;
            return a = this.transform, this.transform = e.tempMt, this.transform.identity(), 
            this.transform.translate(-this.rec.x, -this.rec.y), this.renderToContext(i), this.transform.translate(+this.rec.x, +this.rec.y), 
            this.transform = a, new I(t);
        }, i.render = function(t, e, i) {
            this.mesh.texture && (this.isCached || (this.isCached = !0, this.tex = this.getCanvasPic()), 
            this.transform ? (this.transform.translate(e, i), this._renderTextureToContext(t), 
            this.transform.translate(-e, -i)) : (this.transform = et._tempMatrix, this.transform.identity(), 
            this.transform.translate(e, i), this._renderTextureToContext(t), this.transform.translate(-e, -i), 
            this.transform = null));
        }, i._renderTextureToContext = function(t) {
            this.context = t.ctx || t, t.save();
            var e;
            if (e = this.tex, this.transform) {
                var i = this.transform;
                t.transform(i.a, i.b, i.c, i.d, i.tx, i.ty);
            }
            this.rec = this.mesh.getBounds(), t.translate(this.rec.x, this.rec.y), t.drawTexture(e, 0, 0, e.width, e.height, 0, 0), 
            t.restore();
        }, a(e, [ "tempMt", function() {
            return this.tempMt = new m();
        } ]), e;
    }(et), function(t) {
        function e() {
            this.cacheOK = !1, this.cacheCmdOK = !1, this.transformCmds = [], this.drawCmds = [], 
            e.__super.call(this), this.tempMesh = new P();
        }
        s(e, "laya.ani.bone.canvasmesh.SimpleSkinMeshCanvas", t);
        var i = e.prototype;
        return i.init2 = function(e, i, a, s, r) {
            t.prototype.init2.call(this, e, i, a, s, r), this.cacheOK = !1, this.cacheCmdOK = !1, 
            this.transformCmds.length = 6, this.drawCmds.length = 9;
        }, i.renderToContext = function(t) {
            if (this.context = t.ctx || t, this.mesh) {
                if (this.mesh.uvs.length <= 8) return void (0 == this.mode ? this._renderWithIndexes(this.mesh) : this._renderNoIndexes(this.mesh));
                this.cacheOK || (this.tempMesh.texture = this.mesh.texture, this.tempMesh.uvs = this.mesh.texture.uv, 
                this.tempMesh.vertices = Y.solveMesh(this.mesh, this.tempMesh.vertices), this.cacheOK = !0), 
                0 == this.mode ? this._renderWithIndexes(this.tempMesh) : this._renderNoIndexes(this.tempMesh);
            }
        }, i._renderWithIndexes = function(t) {
            if (this.cacheCmdOK) return void this.renderByCache(t);
            var e = t.indexes, i = 0, a = e.length;
            for (a > 1 && (a = 1), i = 0; a > i; i += 3) {
                var s = 2 * e[i], r = 2 * e[i + 1], n = 2 * e[i + 2];
                this._renderDrawTriangle(t, s, r, n);
            }
            this.cacheCmdOK = !0;
        }, i._renderDrawTriangle = function(t, e, i, a) {
            var s = this.context, r = t.uvs, n = t.vertices, h = t.texture, l = h.bitmap, o = l.source, u = h.width, c = h.height, d = l.width, _ = l.height, p = NaN, f = NaN, m = NaN, y = NaN, x = NaN, g = NaN;
            if (t.useUvTransform) {
                var v = t.uvTransform;
                p = (r[e] * v.a + r[e + 1] * v.c + v.tx) * d, f = (r[i] * v.a + r[i + 1] * v.c + v.tx) * d, 
                m = (r[a] * v.a + r[a + 1] * v.c + v.tx) * d, y = (r[e] * v.b + r[e + 1] * v.d + v.ty) * _, 
                x = (r[i] * v.b + r[i + 1] * v.d + v.ty) * _, g = (r[a] * v.b + r[a + 1] * v.d + v.ty) * _;
            } else p = r[e] * d, f = r[i] * d, m = r[a] * d, y = r[e + 1] * _, x = r[i + 1] * _, 
            g = r[a + 1] * _;
            var D = n[e], M = n[i], I = n[a], N = n[e + 1], b = n[i + 1], T = n[a + 1], A = p * x + y * m + f * g - x * m - y * f - p * g, C = 1 / A, w = D * x + y * I + M * g - x * I - y * M - D * g, S = p * M + D * m + f * I - M * m - D * f - p * I, F = p * x * I + y * M * m + D * f * g - D * x * m - y * f * I - p * M * g, k = N * x + y * T + b * g - x * T - y * b - N * g, P = p * b + N * m + f * T - b * m - N * f - p * T, B = p * x * T + y * b * m + N * f * g - N * x * m - y * f * T - p * b * g;
            if (this.transformCmds[0] = w * C, this.transformCmds[1] = k * C, this.transformCmds[2] = S * C, 
            this.transformCmds[3] = P * C, this.transformCmds[4] = F * C, this.transformCmds[5] = B * C, 
            this.drawCmds[0] = o, this.drawCmds[1] = h.uv[0] * d, this.drawCmds[2] = h.uv[1] * _, 
            this.drawCmds[3] = u, this.drawCmds[4] = c, this.drawCmds[5] = h.uv[0] * d, this.drawCmds[6] = h.uv[1] * _, 
            this.drawCmds[7] = u, this.drawCmds[8] = c, s.save(), this.transform) {
                var U = this.transform;
                s.transform(U.a, U.b, U.c, U.d, U.tx, U.ty);
            }
            s.transform.apply(s, this.transformCmds), s.drawImage.apply(s, this.drawCmds), s.restore();
        }, i.renderByCache = function(t) {
            var e = this.context;
            if (e.save(), this.transform) {
                var i = this.transform;
                e.transform(i.a, i.b, i.c, i.d, i.tx, i.ty);
            }
            e.transform.apply(e, this.transformCmds), e.drawImage.apply(e, this.drawCmds), e.restore();
        }, e;
    }(et)), st = function(t) {
        function e(t, i) {
            this._templet = null, this._player = null, this._curOriginalData = null, this._boneMatrixArray = [], 
            this._lastTime = 0, this._currAniName = null, this._currAniIndex = -1, this._pause = !0, 
            this._aniClipIndex = -1, this._clipIndex = -1, this._skinIndex = 0, this._skinName = "default", 
            this._aniMode = 0, this._graphicsCache = null, this._boneSlotDic = null, this._bindBoneBoneSlotDic = null, 
            this._boneSlotArray = null, this._index = -1, this._total = -1, this._indexControl = !1, 
            this._aniPath = null, this._texturePath = null, this._complete = null, this._loadAniMode = 0, 
            this._yReverseMatrix = null, this._ikArr = null, this._tfArr = null, this._pathDic = null, 
            this._rootBone = null, this._boneList = null, this._aniSectionDic = null, this._eventIndex = 0, 
            this._drawOrderIndex = 0, this._drawOrder = null, this._lastAniClipIndex = -1, this._lastUpdateAniClipIndex = -1, 
            e.__super.call(this), void 0 === i && (i = 0), t && this.init(t, i);
        }
        s(e, "laya.ani.bone.Skeleton", t);
        var a = e.prototype;
        return a.init = function(t, e) {
            void 0 === e && (e = 0);
            var i = 0, a = 0;
            if (1 == e) for (this._graphicsCache = [], i = 0, a = t.getAnimationCount(); a > i; i++) this._graphicsCache.push([]);
            if (this._yReverseMatrix = t.yReverseMatrix, this._aniMode = e, this._templet = t, 
            this._player = new J(), this._player.cacheFrameRate = t.rate, this._player.templet = t, 
            this._player.play(), this._parseSrcBoneMatrix(), this._boneList = t.mBoneArr, this._rootBone = t.mRootBone, 
            this._aniSectionDic = t.aniSectionDic, t.ikArr.length > 0) for (this._ikArr = [], 
            i = 0, a = t.ikArr.length; a > i; i++) this._ikArr.push(new E(t.ikArr[i], this._boneList));
            if (t.pathArr.length > 0) {
                var s, r;
                null == this._pathDic && (this._pathDic = {});
                var n;
                for (i = 0, a = t.pathArr.length; a > i; i++) s = t.pathArr[i], r = new W(s, this._boneList), 
                n = this._boneSlotDic[s.name], n && (r = new W(s, this._boneList), r.target = n), 
                this._pathDic[s.name] = r;
            }
            if (t.tfArr.length > 0) for (this._tfArr = [], i = 0, a = t.tfArr.length; a > i; i++) this._tfArr.push(new q(t.tfArr[i], this._boneList));
            if (t.skinDataArray.length > 0) {
                var h = this._templet.skinDataArray[this._skinIndex];
                this._skinName = h.name;
            }
            this._player.on("played", this, this._onPlay), this._player.on("stopped", this, this._onStop), 
            this._player.on("paused", this, this._onPause);
        }, a.load = function(t, e, a) {
            void 0 === a && (a = 0), this._aniPath = t, this._complete = e, this._loadAniMode = a, 
            i.loader.load([ {
                url: t,
                type: "arraybuffer"
            } ], _.create(this, this._onLoaded));
        }, a._onLoaded = function() {
            var t = p.getRes(this._aniPath);
            if (null != t) {
                null == rt.TEMPLET_DICTIONARY && (rt.TEMPLET_DICTIONARY = {});
                var e;
                e = rt.TEMPLET_DICTIONARY[this._aniPath], e ? e.isParseFail ? this._parseFail() : e.isParserComplete ? this._parseComplete() : (e.on("complete", this, this._parseComplete), 
                e.on("error", this, this._parseFail)) : (e = new rt(), e.url = this._aniPath, rt.TEMPLET_DICTIONARY[this._aniPath] = e, 
                e.on("complete", this, this._parseComplete), e.on("error", this, this._parseFail), 
                e.isParserComplete = !1, e.parseData(null, t));
            }
        }, a._parseComplete = function() {
            var t = rt.TEMPLET_DICTIONARY[this._aniPath];
            t && (this.init(t, this._loadAniMode), this.play(0, !0)), this._complete && this._complete.runWith(this);
        }, a._parseFail = function() {
            console.log("[Error]:" + this._aniPath + "解析失败");
        }, a._onPlay = function() {
            this.event("played");
        }, a._onStop = function() {
            var t, e = this._templet.eventAniArr, i = e[this._aniClipIndex];
            if (i && this._eventIndex < i.length) for (;this._eventIndex < i.length; this._eventIndex++) t = i[this._eventIndex], 
            t.time >= this._player.playStart && t.time <= this._player.playEnd && this.event("label", t);
            this._eventIndex = 0, this._drawOrder = null, this.event("stopped");
        }, a._onPause = function() {
            this.event("paused");
        }, a._parseSrcBoneMatrix = function() {
            var t = 0, e = 0;
            for (e = this._templet.srcBoneMatrixArr.length, t = 0; e > t; t++) this._boneMatrixArray.push(new m());
            if (0 == this._aniMode) this._boneSlotDic = this._templet.boneSlotDic, this._bindBoneBoneSlotDic = this._templet.bindBoneBoneSlotDic, 
            this._boneSlotArray = this._templet.boneSlotArray; else {
                null == this._boneSlotDic && (this._boneSlotDic = {}), null == this._bindBoneBoneSlotDic && (this._bindBoneBoneSlotDic = {}), 
                null == this._boneSlotArray && (this._boneSlotArray = []);
                var i, a, s = this._templet.boneSlotArray;
                for (t = 0, e = s.length; e > t; t++) i = s[t], a = this._bindBoneBoneSlotDic[i.parent], 
                null == a && (this._bindBoneBoneSlotDic[i.parent] = a = []), this._boneSlotDic[i.name] = i = i.copy(), 
                a.push(i), this._boneSlotArray.push(i);
            }
        }, a._emitMissedEvents = function(t, e, i) {
            void 0 === i && (i = 0);
            var a = this._templet.eventAniArr, s = a[this._player.currentAnimationClipIndex];
            if (s) {
                var r, n = 0, h = 0;
                for (h = s.length, n = i; h > n; n++) r = s[n], r.time >= this._player.playStart && r.time <= this._player.playEnd && this.event("label", r);
            }
        }, a._update = function(t) {
            if (void 0 === t && (t = !0), !(this._pause || t && this._indexControl)) {
                var e = i.timer.currTimer, a = this._player.currentKeyframeIndex, s = e - this._lastTime;
                if (t ? this._player._update(s) : a = -1, this._lastTime = e, this._player && (this._index = this._clipIndex = this._player.currentKeyframeIndex, 
                !(this._index < 0 || s > 0 && this._clipIndex == a && this._lastUpdateAniClipIndex == this._aniClipIndex))) {
                    this._lastUpdateAniClipIndex = this._aniClipIndex, a > this._clipIndex && 0 != this._eventIndex && (this._emitMissedEvents(this._player.playStart, this._player.playEnd, this._eventIndex), 
                    this._eventIndex = 0);
                    var r, n = this._templet.eventAniArr, h = n[this._aniClipIndex];
                    h && this._eventIndex < h.length && (r = h[this._eventIndex], r.time >= this._player.playStart && r.time <= this._player.playEnd ? this._player.currentPlayTime >= r.time && (this.event("label", r), 
                    this._eventIndex++) : this._eventIndex++);
                    var l;
                    if (0 == this._aniMode) {
                        if (l = this._templet.getGrahicsDataWithCache(this._aniClipIndex, this._clipIndex)) return void (this.graphics != l && (this.graphics = l));
                        var o = 0, u = 0;
                        for (u = this._clipIndex; !this._templet.getGrahicsDataWithCache(this._aniClipIndex, u - 1) && u > 0; ) u--;
                        if (u < this._clipIndex) for (o = u; o < this._clipIndex; o++) this._createGraphics(o);
                    } else if (1 == this._aniMode) {
                        if (l = this._getGrahicsDataWithCache(this._aniClipIndex, this._clipIndex)) return void (this.graphics != l && (this.graphics = l));
                        for (u = this._clipIndex; !this._getGrahicsDataWithCache(this._aniClipIndex, u - 1) && u > 0; ) u--;
                        if (u < this._clipIndex) for (o = u; o < this._clipIndex; o++) this._createGraphics(o);
                    }
                    this._createGraphics();
                }
            }
        }, a._createGraphics = function(t) {
            void 0 === t && (t = -1), -1 == t && (t = this._clipIndex);
            var e, i = t * this._player.cacheFrameRateInterval, a = this._templet.drawOrderAniArr, s = a[this._aniClipIndex];
            if (s && s.length > 0) for (this._drawOrderIndex = 0, e = s[this._drawOrderIndex]; i >= e.time && (this._drawOrder = e.drawOrder, 
            this._drawOrderIndex++, !(this._drawOrderIndex >= s.length)); ) e = s[this._drawOrderIndex];
            var r;
            0 == this._aniMode || 1 == this._aniMode ? this.graphics = new tt() : this.graphics instanceof laya.ani.GraphicsAni ? this.graphics.clear() : this.graphics = new tt(), 
            r = this.graphics;
            var n = this._templet.getNodes(this._aniClipIndex);
            this._templet.getOriginalData(this._aniClipIndex, this._curOriginalData, this._player._fullFrames[this._aniClipIndex], t, i);
            var h, l, u, c, d = this._aniSectionDic[this._aniClipIndex], _ = 0, p = 0, f = 0, y = 0, x = 0, g = this._templet.srcBoneMatrixArr.length;
            for (p = 0, x = d[0]; g > p; p++) c = this._boneList[p], u = this._templet.srcBoneMatrixArr[p], 
            c.resultTransform.scX = u.scX * this._curOriginalData[_++], c.resultTransform.skX = u.skX + this._curOriginalData[_++], 
            c.resultTransform.skY = u.skY + this._curOriginalData[_++], c.resultTransform.scY = u.scY * this._curOriginalData[_++], 
            c.resultTransform.x = u.x + this._curOriginalData[_++], c.resultTransform.y = u.y + this._curOriginalData[_++], 
            8 === this._templet.tMatrixDataLen && (c.resultTransform.skewX = u.skewX + this._curOriginalData[_++], 
            c.resultTransform.skewY = u.skewY + this._curOriginalData[_++]);
            var v, D = {}, M = {};
            for (x += d[1]; x > p; p++) v = n[p], D[v.name] = this._curOriginalData[_++], M[v.name] = this._curOriginalData[_++], 
            this._curOriginalData[_++], this._curOriginalData[_++], this._curOriginalData[_++], 
            this._curOriginalData[_++];
            var I = {}, N = {};
            for (x += d[2]; x > p; p++) v = n[p], I[v.name] = this._curOriginalData[_++], N[v.name] = this._curOriginalData[_++], 
            this._curOriginalData[_++], this._curOriginalData[_++], this._curOriginalData[_++], 
            this._curOriginalData[_++];
            if (this._pathDic) {
                var b;
                for (x += d[3]; x > p; p++) if (v = n[p], b = this._pathDic[v.name]) {
                    var T = new o(v.extenData);
                    switch (T.getByte()) {
                      case 1:
                        b.position = this._curOriginalData[_++];
                        break;

                      case 2:
                        b.spacing = this._curOriginalData[_++];
                        break;

                      case 3:
                        b.rotateMix = this._curOriginalData[_++], b.translateMix = this._curOriginalData[_++];
                    }
                }
            }
            if (this._yReverseMatrix ? this._rootBone.update(this._yReverseMatrix) : this._rootBone.update(m.TEMP.identity()), 
            this._ikArr) {
                var A;
                for (p = 0, x = this._ikArr.length; x > p; p++) A = this._ikArr[p], I.hasOwnProperty(A.name) && (A.bendDirection = I[A.name]), 
                N.hasOwnProperty(A.name) && (A.mix = N[A.name]), A.apply();
            }
            if (this._pathDic) for (var C in this._pathDic) b = this._pathDic[C], b.apply(this._boneList, r);
            if (this._tfArr) {
                var w;
                for (p = 0, y = this._tfArr.length; y > p; p++) w = this._tfArr[p], w.apply();
            }
            for (p = 0, y = this._boneList.length; y > p; p++) if (c = this._boneList[p], l = this._bindBoneBoneSlotDic[c.name], 
            c.resultMatrix.copyTo(this._boneMatrixArray[p]), l) for (f = 0, x = l.length; x > f; f++) h = l[f], 
            h && h.setParentMatrix(c.resultMatrix);
            var S, F = {}, k = this._templet.deformAniArr;
            if (k && k.length > 0) {
                if (this._lastAniClipIndex != this._aniClipIndex) for (this._lastAniClipIndex = this._aniClipIndex, 
                p = 0, x = this._boneSlotArray.length; x > p; p++) h = this._boneSlotArray[p], h.deformData = null;
                var P = k[this._aniClipIndex];
                S = P["default"], this._setDeform(S, F, this._boneSlotArray, i);
                var B;
                for (B in P) "default" != B && B != this._skinName && (S = P[B], this._setDeform(S, F, this._boneSlotArray, i));
                S = P[this._skinName], this._setDeform(S, F, this._boneSlotArray, i);
            }
            var U, L, R;
            if (this._drawOrder) for (p = 0, x = this._drawOrder.length; x > p; p++) h = this._boneSlotArray[this._drawOrder[p]], 
            U = D[h.name], L = M[h.name], isNaN(L) || (r.save(), r.alpha(L)), isNaN(U) || -2 == U || (this._templet.attachmentNames ? h.showDisplayByName(this._templet.attachmentNames[U]) : h.showDisplayByIndex(U)), 
            F[this._drawOrder[p]] ? (R = F[this._drawOrder[p]], h.currDisplayData && R[h.currDisplayData.attachmentName] ? h.deformData = R[h.currDisplayData.attachmentName] : h.deformData = null) : h.deformData = null, 
            isNaN(L) ? h.draw(r, this._boneMatrixArray, 2 == this._aniMode) : h.draw(r, this._boneMatrixArray, 2 == this._aniMode, L), 
            isNaN(L) || r.restore(); else for (p = 0, x = this._boneSlotArray.length; x > p; p++) h = this._boneSlotArray[p], 
            U = D[h.name], L = M[h.name], isNaN(L) || (r.save(), r.alpha(L)), isNaN(U) || -2 == U || (this._templet.attachmentNames ? h.showDisplayByName(this._templet.attachmentNames[U]) : h.showDisplayByIndex(U)), 
            F[p] ? (R = F[p], h.currDisplayData && R[h.currDisplayData.attachmentName] ? h.deformData = R[h.currDisplayData.attachmentName] : h.deformData = null) : h.deformData = null, 
            isNaN(L) ? h.draw(r, this._boneMatrixArray, 2 == this._aniMode) : h.draw(r, this._boneMatrixArray, 2 == this._aniMode, L), 
            isNaN(L) || r.restore();
            0 == this._aniMode ? this._templet.setGrahicsDataWithCache(this._aniClipIndex, t, r) : 1 == this._aniMode && this._setGrahicsDataWithCache(this._aniClipIndex, t, r);
        }, a._setDeform = function(t, e, i, a) {
            if (t) {
                var s, r, n, h = 0, l = 0, o = 0;
                if (t) for (h = 0, l = t.deformSlotDataList.length; l > h; h++) for (s = t.deformSlotDataList[h], 
                o = 0; o < s.deformSlotDisplayList.length; o++) r = s.deformSlotDisplayList[o], 
                n = i[r.slotIndex], r.apply(a, n), e[r.slotIndex] || (e[r.slotIndex] = {}), e[r.slotIndex][r.attachment] = r.deformData;
            }
        }, a.getAnimNum = function() {
            return this._templet.getAnimationCount();
        }, a.getAniNameByIndex = function(t) {
            return this._templet.getAniNameByIndex(t);
        }, a.getSlotByName = function(t) {
            return this._boneSlotDic[t];
        }, a.showSkinByName = function(t, e) {
            void 0 === e && (e = !0), this.showSkinByIndex(this._templet.getSkinIndexByName(t), e);
        }, a.showSkinByIndex = function(t, e) {
            void 0 === e && (e = !0);
            for (var i = 0; i < this._boneSlotArray.length; i++) this._boneSlotArray[i].showSlotData(null, e);
            if (this._templet.showSkinByIndex(this._boneSlotDic, t, e)) {
                var a = this._templet.skinDataArray[t];
                this._skinIndex = t, this._skinName = a.name;
            }
            this._clearCache();
        }, a.showSlotSkinByIndex = function(t, e) {
            if (0 != this._aniMode) {
                var i = this.getSlotByName(t);
                i && i.showDisplayByIndex(e), this._clearCache();
            }
        }, a.showSlotSkinByName = function(t, e) {
            if (0 != this._aniMode) {
                var i = this.getSlotByName(t);
                i && i.showDisplayByName(e), this._clearCache();
            }
        }, a.replaceSlotSkinName = function(t, e, i) {
            if (0 != this._aniMode) {
                var a = this.getSlotByName(t);
                a && a.replaceDisplayByName(e, i), this._clearCache();
            }
        }, a.replaceSlotSkinByIndex = function(t, e, i) {
            if (0 != this._aniMode) {
                var a = this.getSlotByName(t);
                a && a.replaceDisplayByIndex(e, i), this._clearCache();
            }
        }, a.setSlotSkin = function(t, e) {
            if (0 != this._aniMode) {
                var i = this.getSlotByName(t);
                i && i.replaceSkin(e), this._clearCache();
            }
        }, a._clearCache = function() {
            if (1 == this._aniMode) for (var t = 0, e = this._graphicsCache.length; e > t; t++) this._graphicsCache[t].length = 0;
        }, a.play = function(t, e, a, s, r, n) {
            void 0 === a && (a = !0), void 0 === s && (s = 0), void 0 === r && (r = 0), void 0 === n && (n = !0), 
            this._indexControl = !1;
            var h = -1, o = NaN;
            if (o = e ? 2147483647 : 0, "string" == typeof t) for (var u = 0, c = this._templet.getAnimationCount(); c > u; u++) {
                var d = this._templet.getAnimation(u);
                if (d && t == d.name) {
                    h = u;
                    break;
                }
            } else h = t;
            h > -1 && h < this.getAnimNum() && (this._aniClipIndex = h, (a || this._pause || this._currAniIndex != h) && (this._currAniIndex = h, 
            this._curOriginalData = new Float32Array(this._templet.getTotalkeyframesLength(h)), 
            this._drawOrder = null, this._eventIndex = 0, this._player.play(h, this._player.playbackRate, o, s, r), 
            n && this._templet.showSkinByIndex(this._boneSlotDic, this._skinIndex), this._pause && (this._pause = !1, 
            this._lastTime = l.now(), i.stage.frameLoop(1, this, this._update, null, !0)), this._update()));
        }, a.stop = function() {
            this._pause || (this._pause = !0, this._player && this._player.stop(!0), i.timer.clear(this, this._update));
        }, a.playbackRate = function(t) {
            this._player && (this._player.playbackRate = t);
        }, a.paused = function() {
            this._pause || (this._pause = !0, this._player && (this._player.paused = !0), i.timer.clear(this, this._update));
        }, a.resume = function() {
            this._indexControl = !1, this._pause && (this._pause = !1, this._player && (this._player.paused = !1), 
            this._lastTime = l.now(), i.stage.frameLoop(1, this, this._update, null, !0));
        }, a._getGrahicsDataWithCache = function(t, e) {
            return this._graphicsCache[t][e];
        }, a._setGrahicsDataWithCache = function(t, e, i) {
            this._graphicsCache[t][e] = i;
        }, a.destroy = function(e) {
            void 0 === e && (e = !0), t.prototype.destroy.call(this, e), this._templet = null, 
            this._player && this._player.offAll(), this._player = null, this._curOriginalData = null, 
            this._boneMatrixArray.length = 0, this._lastTime = 0, i.timer.clear(this, this._update);
        }, r(0, a, "url", function() {
            return this._aniPath;
        }, function(t) {
            this.load(t);
        }), r(0, a, "index", function() {
            return this._index;
        }, function(t) {
            this.player && (this._index = t, this._player.currentTime = 1e3 * this._index / this._player.cacheFrameRate, 
            this._indexControl = !0, this._update(!1));
        }), r(0, a, "total", function() {
            return this._templet && this._player ? this._total = Math.floor(this._templet.getAniDuration(this._player.currentAnimationClipIndex) / 1e3 * this._player.cacheFrameRate) : this._total = -1, 
            this._total;
        }), r(0, a, "player", function() {
            return this._player;
        }), e.useSimpleMeshInCanvas = !1, e;
    }(D), rt = (function(t) {
        function e(t) {
            this._start = 0, this._Pos = 0, this._data = null, this._curIndex = 0, this._preIndex = 0, 
            this._playIndex = 0, this._playing = !1, this._ended = !0, this._count = 0, this._ids = null, 
            this._loadedImage = {}, this._idOfSprite = null, this._parentMovieClip = null, this._movieClipList = null, 
            this._labels = null, this.basePath = null, this._atlasPath = null, this._url = null, 
            this._isRoot = !1, this._completeHandler = null, this._endFrame = -1, this.interval = 30, 
            this.loop = !1, e.__super.call(this), this._ids = {}, this._idOfSprite = [], this._reset(), 
            this._playing = !1, this._parentMovieClip = t, t ? (this._isRoot = !1, this._movieClipList = t._movieClipList, 
            this._movieClipList.push(this)) : (this._movieClipList = [ this ], this._isRoot = !0, 
            this._setUpNoticeType(1));
        }
        s(e, "laya.ani.swf.MovieClip", t);
        var a = e.prototype;
        return a.destroy = function(e) {
            void 0 === e && (e = !0), this._clear(), t.prototype.destroy.call(this, e);
        }, a._setDisplay = function(e) {
            t.prototype._setDisplay.call(this, e), this._isRoot && this._$3__onDisplay(e);
        }, a._$3__onDisplay = function(t) {
            t ? i.timer.loop(this.interval, this, this.updates, null, !0) : i.timer.clear(this, this.updates);
        }, a.updates = function() {
            if (!this._parentMovieClip) {
                var t = 0, e = 0;
                for (e = this._movieClipList.length, t = 0; e > t; t++) this._movieClipList[t] && this._movieClipList[t]._update();
            }
        }, a.addLabel = function(t, e) {
            this._labels || (this._labels = {}), this._labels[e] = t;
        }, a.removeLabel = function(t) {
            if (t) {
                if (!this._labels) for (var e in this._labels) if (this._labels[e] === t) {
                    delete this._labels[e];
                    break;
                }
            } else this._labels = null;
        }, a._update = function() {
            if (this._data && this._playing) {
                if (this._playIndex++, this._playIndex >= this._count) {
                    if (!this.loop) return this._playIndex--, void this.stop();
                    this._playIndex = 0;
                }
                if (this._parse(this._playIndex), this._labels && this._labels[this._playIndex] && this.event("label", this._labels[this._playIndex]), 
                -1 != this._endFrame && this._endFrame == this._playIndex) {
                    if (this._endFrame = -1, null != this._completeHandler) {
                        var t = this._completeHandler;
                        this._completeHandler = null, t.run();
                    }
                    this.stop();
                }
            }
        }, a.stop = function() {
            this._playing = !1;
        }, a.gotoAndStop = function(t) {
            this.index = t, this.stop();
        }, a._clear = function() {
            if (this.stop(), this._idOfSprite.length = 0, !this._parentMovieClip) {
                i.timer.clear(this, this.updates);
                var t = 0, e = 0;
                for (e = this._movieClipList.length, t = 0; e > t; t++) this._movieClipList[t] != this && this._movieClipList[t]._clear();
                this._movieClipList.length = 0;
            }
            this._atlasPath && p.clearRes(this._atlasPath);
            var a;
            for (a in this._loadedImage) this._loadedImage[a] && (p.clearRes(a), this._loadedImage[a] = !1);
            this.removeChildren(), this.graphics = null, this._parentMovieClip = null;
        }, a.play = function(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = !0), this.loop = e, this._playing = !0, 
            this._data && this._displayFrame(t);
        }, a._displayFrame = function(t) {
            void 0 === t && (t = -1), -1 != t && (this._curIndex > t && this._reset(), this._parse(t));
        }, a._reset = function(t) {
            void 0 === t && (t = !0), t && 1 != this._curIndex && this.removeChildren(), this._preIndex = this._curIndex = -1, 
            this._Pos = this._start;
        }, a._parse = function(t) {
            var i, a, s, r = 0, n = 0, h = 0, l = 0, o = !1, u = this._idOfSprite, c = this._data;
            for (this._ended && this._reset(), c.pos = this._Pos, this._ended = !1, this._playIndex = t, 
            this._curIndex > t && t < this._preIndex && (this._reset(!0), c.pos = this._Pos); this._curIndex <= t && !this._ended; ) switch (n = c.getUint16()) {
              case 12:
                if (r = c.getUint16(), h = this._ids[c.getUint16()], this._Pos = c.pos, c.pos = h, 
                0 == (l = c.getUint8())) {
                    var d = c.getUint16();
                    if (a = u[r], !a) {
                        a = u[r] = new D();
                        var _ = new D();
                        _.loadImage(this.basePath + d + ".png"), this._loadedImage[this.basePath + d + ".png"] = !0, 
                        a.addChild(_), _.size(c.getFloat32(), c.getFloat32());
                        var p = c._getMatrix();
                        _.transform = p;
                    }
                    a.alpha = 1;
                } else 1 == l && (i = u[r], i || (u[r] = i = new e(this), i.interval = this.interval, 
                i._ids = this._ids, i.basePath = this.basePath, i._setData(c, h), i._initState(), 
                i.play(0)), i.alpha = 1);
                c.pos = this._Pos;
                break;

              case 3:
                var f = u[c.getUint16()];
                f && (this.addChild(f), f.zOrder = c.getUint16(), o = !0);
                break;

              case 4:
                f = u[c.getUint16()], f && f.removeSelf();
                break;

              case 5:
                u[c.getUint16()][e._ValueList[c.getUint16()]] = c.getFloat32();
                break;

              case 6:
                u[c.getUint16()].visible = c.getUint8() > 0;
                break;

              case 7:
                a = u[c.getUint16()];
                var y = a.transform || m.create();
                y.setTo(c.getFloat32(), c.getFloat32(), c.getFloat32(), c.getFloat32(), c.getFloat32(), c.getFloat32()), 
                a.transform = y;
                break;

              case 8:
                u[c.getUint16()].setPos(c.getFloat32(), c.getFloat32());
                break;

              case 9:
                u[c.getUint16()].setSize(c.getFloat32(), c.getFloat32());
                break;

              case 10:
                u[c.getUint16()].alpha = c.getFloat32();
                break;

              case 11:
                u[c.getUint16()].setScale(c.getFloat32(), c.getFloat32());
                break;

              case 98:
                s = c.getString(), this.event(s), "stop" == s && this.stop();
                break;

              case 99:
                this._curIndex = c.getUint16(), o && this.updateZOrder();
                break;

              case 100:
                this._count = this._curIndex + 1, this._ended = !0, this._playing && (this.event("enterframe"), 
                this.event("end"), this.event("complete")), this._reset(!1);
            }
            this._playing && !this._ended && this.event("enterframe"), this._Pos = c.pos;
        }, a._setData = function(t, e) {
            this._data = t, this._start = e + 3;
        }, a.load = function(t, e, a) {
            void 0 === e && (e = !1), this._url = t = N.formatURL(t), e && (this._atlasPath = a ? a : t.split(".swf")[0] + ".json"), 
            this.stop(), this._clear(), this._movieClipList = [ this ];
            var s;
            s = [ {
                url: t,
                type: "arraybuffer"
            } ], this._atlasPath && s.push({
                url: this._atlasPath,
                type: "atlas"
            }), i.loader.load(s, _.create(this, this._onLoaded));
        }, a._onLoaded = function() {
            var t;
            return (t = p.getRes(this._url)) ? (this.basePath = this._atlasPath ? p.getAtlas(this._atlasPath).dir : this._url.split(".swf")[0] + "/image/", 
            void this._initData(t)) : void this.event("error", "file not find");
        }, a._initState = function() {
            this._reset(), this._ended = !1;
            var t = this._playing;
            for (this._playing = !1, this._curIndex = 0; !this._ended; ) this._parse(++this._curIndex);
            this._playing = t;
        }, a._initData = function(t) {
            this._data = new o(t);
            var e = 0, a = this._data.getUint16();
            for (e = 0; a > e; e++) this._ids[this._data.getInt16()] = this._data.getInt32();
            this.interval = 1e3 / this._data.getUint16(), this._setData(this._data, this._ids[32767]), 
            this._initState(), this.play(0), this.event("loaded"), this._parentMovieClip || i.timer.loop(this.interval, this, this.updates, null, !0);
        }, a.playTo = function(t, e, i) {
            this._completeHandler = i, this._endFrame = e, this.play(t, !1);
        }, r(0, a, "index", function() {
            return this._playIndex;
        }, function(t) {
            this._playIndex = t, this._data && this._displayFrame(this._playIndex), this._labels && this._labels[t] && this.event("label", this._labels[t]);
        }), r(0, a, "count", function() {
            return this._count;
        }), r(0, a, "playing", function() {
            return this._playing;
        }), r(0, a, "url", null, function(t) {
            this.load(t);
        }), e._ValueList = [ "x", "y", "width", "height", "scaleX", "scaleY", "rotation", "alpha" ], 
        e;
    }(D), function(t) {
        function e() {
            this._mainTexture = null, this._textureJson = null, this._graphicsCache = [], this.srcBoneMatrixArr = [], 
            this.ikArr = [], this.tfArr = [], this.pathArr = [], this.boneSlotDic = {}, this.bindBoneBoneSlotDic = {}, 
            this.boneSlotArray = [], this.skinDataArray = [], this.skinDic = {}, this.subTextureDic = {}, 
            this.isParseFail = !1, this.yReverseMatrix = null, this.drawOrderAniArr = [], this.eventAniArr = [], 
            this.attachmentNames = null, this.deformAniArr = [], this._isDestroyed = !1, this._rate = 30, 
            this.isParserComplete = !1, this.aniSectionDic = {}, this._skBufferUrl = null, this._textureDic = {}, 
            this._loadList = null, this._path = null, this.tMatrixDataLen = 0, this.mRootBone = null, 
            e.__super.call(this), this.skinSlotDisplayDataArr = [], this.mBoneArr = [];
        }
        s(e, "laya.ani.bone.Templet", t);
        var a = e.prototype;
        return a.loadAni = function(t) {
            this._skBufferUrl = t, i.loader.load(t, _.create(this, this.onComplete), null, "arraybuffer");
        }, a.onComplete = function(t) {
            if (this._isDestroyed) return void this.destroy();
            var e = p.getRes(this._skBufferUrl);
            return e ? (this._path = this._skBufferUrl.slice(0, this._skBufferUrl.lastIndexOf("/")) + "/", 
            void this.parseData(null, e)) : void this.event("error", "load failed:" + this._skBufferUrl);
        }, a.parseData = function(t, e, i) {
            void 0 === i && (i = 30), !this._path && this.url && (this._path = this.url.slice(0, this.url.lastIndexOf("/")) + "/"), 
            this._mainTexture = t, this._mainTexture && x.isWebGL && t.bitmap && (t.bitmap.enableMerageInAtlas = !1), 
            this._rate = i, this.parse(e);
        }, a.buildArmature = function(t) {
            return void 0 === t && (t = 0), new st(this, t);
        }, a.parse = function(i) {
            t.prototype.parse.call(this, i), this._endLoaded(), this._aniVersion != e.LAYA_ANIMATION_VISION && (console.log("[Error] 版本不一致，请使用IDE版本配套的重新导出" + this._aniVersion + "->" + e.LAYA_ANIMATION_VISION), 
            this._loaded = !1), this.loaded ? this._mainTexture ? this._parsePublicExtData() : this._parseTexturePath() : (this.event("error", this), 
            this.isParseFail = !0);
        }, a._parseTexturePath = function() {
            if (this._isDestroyed) return void this.destroy();
            var t = 0;
            this._loadList = [];
            var e, a = new o(this.getPublicExtData()), s = 0, r = 0, n = 0, h = 0, l = 0, u = 0, c = 0, d = 0, p = 0, f = a.getInt32(), m = a.readUTFString(), y = m.split("\n");
            for (t = 0; f > t; t++) e = this._path + y[2 * t], m = y[2 * t + 1], s = a.getFloat32(), 
            r = a.getFloat32(), n = a.getFloat32(), h = a.getFloat32(), p = a.getFloat32(), 
            l = isNaN(p) ? 0 : p, p = a.getFloat32(), u = isNaN(p) ? 0 : p, p = a.getFloat32(), 
            c = isNaN(p) ? n : p, p = a.getFloat32(), d = isNaN(p) ? h : p, -1 == this._loadList.indexOf(e) && this._loadList.push(e);
            i.loader.load(this._loadList, _.create(this, this._textureComplete));
        }, a._textureComplete = function() {
            for (var t, e, i = 0, a = this._loadList.length; a > i; i++) e = this._loadList[i], 
            t = this._textureDic[e] = p.getRes(e), x.isWebGL && t && t.bitmap && (t.bitmap.enableMerageInAtlas = !1);
            this._parsePublicExtData();
        }, a._parsePublicExtData = function() {
            var t = 0, e = 0, i = 0, a = 0, s = 0;
            for (t = 0, s = this.getAnimationCount(); s > t; t++) this._graphicsCache.push([]);
            var r = !1;
            r = "Dragon" != this._aniClassName;
            var n, h, l = new o(this.getPublicExtData()), u = 0, c = 0, d = 0, _ = 0, p = 0, f = 0, y = 0, x = 0, g = 0, v = l.getInt32(), D = l.readUTFString(), M = D.split("\n");
            for (t = 0; v > t; t++) {
                if (n = this._mainTexture, h = this._path + M[2 * t], D = M[2 * t + 1], null == this._mainTexture && (n = this._textureDic[h]), 
                !n) return this.event("error", this), void (this.isParseFail = !0);
                u = l.getFloat32(), c = l.getFloat32(), d = l.getFloat32(), _ = l.getFloat32(), 
                g = l.getFloat32(), p = isNaN(g) ? 0 : g, g = l.getFloat32(), f = isNaN(g) ? 0 : g, 
                g = l.getFloat32(), y = isNaN(g) ? d : g, g = l.getFloat32(), x = isNaN(g) ? _ : g, 
                this.subTextureDic[D] = I.create(n, u, c, d, _, -p, -f, y, x);
            }
            this._mainTexture = n;
            var N, b = l.getUint16();
            for (t = 0; b > t; t++) N = [], N.push(l.getUint16()), N.push(l.getUint16()), N.push(l.getUint16()), 
            N.push(l.getUint16()), this.aniSectionDic[t] = N;
            var T, A, C, w, k, P = l.getInt16(), E = {};
            for (t = 0; P > t; t++) T = new S(), 0 == t ? k = T : T.root = k, T.d = r ? -1 : 1, 
            C = l.readUTFString(), w = l.readUTFString(), T.length = l.getFloat32(), 1 == l.getByte() && (T.inheritRotation = !1), 
            1 == l.getByte() && (T.inheritScale = !1), T.name = C, w && (A = E[w], A ? A.addChild(T) : this.mRootBone = T), 
            E[C] = T, this.mBoneArr.push(T);
            this.tMatrixDataLen = l.getUint16();
            var Y, W = l.getUint16(), q = Math.floor(W / this.tMatrixDataLen), Z = this.srcBoneMatrixArr;
            for (t = 0; q > t; t++) Y = new Q(), Y.scX = l.getFloat32(), Y.skX = l.getFloat32(), 
            Y.skY = l.getFloat32(), Y.scY = l.getFloat32(), Y.x = l.getFloat32(), Y.y = l.getFloat32(), 
            8 === this.tMatrixDataLen && (Y.skewX = l.getFloat32(), Y.skewY = l.getFloat32()), 
            Z.push(Y), T = this.mBoneArr[t], T.transform = Y;
            var $, j = l.getUint16(), J = 0;
            for (t = 0; j > t; t++) {
                for ($ = new K(), J = l.getUint16(), e = 0; J > e; e++) $.boneNames.push(l.readUTFString()), 
                $.boneIndexs.push(l.getInt16());
                $.name = l.readUTFString(), $.targetBoneName = l.readUTFString(), $.targetBoneIndex = l.getInt16(), 
                $.bendDirection = l.getFloat32(), $.mix = l.getFloat32(), $.isSpine = r, this.ikArr.push($);
            }
            var tt, et = l.getUint16(), it = 0;
            for (t = 0; et > t; t++) {
                for (tt = new H(), it = l.getUint16(), e = 0; it > e; e++) tt.boneIndexs.push(l.getInt16());
                tt.name = l.getUTFString(), tt.targetIndex = l.getInt16(), tt.rotateMix = l.getFloat32(), 
                tt.translateMix = l.getFloat32(), tt.scaleMix = l.getFloat32(), tt.shearMix = l.getFloat32(), 
                tt.offsetRotation = l.getFloat32(), tt.offsetX = l.getFloat32(), tt.offsetY = l.getFloat32(), 
                tt.offsetScaleX = l.getFloat32(), tt.offsetScaleY = l.getFloat32(), tt.offsetShearY = l.getFloat32(), 
                this.tfArr.push(tt);
            }
            var at, st = l.getUint16(), rt = 0;
            for (t = 0; st > t; t++) {
                for (at = new V(), at.name = l.readUTFString(), rt = l.getUint16(), e = 0; rt > e; e++) at.bones.push(l.getInt16());
                at.target = l.readUTFString(), at.positionMode = l.readUTFString(), at.spacingMode = l.readUTFString(), 
                at.rotateMode = l.readUTFString(), at.offsetRotation = l.getFloat32(), at.position = l.getFloat32(), 
                at.spacing = l.getFloat32(), at.rotateMix = l.getFloat32(), at.translateMix = l.getFloat32(), 
                this.pathArr.push(at);
            }
            var nt, ht, lt, ot, ut, ct = 0, dt = 0, _t = 0, pt = 0, ft = NaN, mt = 0, yt = l.getInt16();
            for (t = 0; yt > t; t++) {
                var xt = l.getUint8(), gt = {};
                this.deformAniArr.push(gt);
                for (var vt = 0; xt > vt; vt++) for (ht = new B(), ht.skinName = l.getUTFString(), 
                gt[ht.skinName] = ht, ct = l.getInt16(), e = 0; ct > e; e++) for (lt = new U(), 
                ht.deformSlotDataList.push(lt), dt = l.getInt16(), i = 0; dt > i; i++) for (ot = new L(), 
                lt.deformSlotDisplayList.push(ot), ot.slotIndex = _t = l.getInt16(), ot.attachment = nt = l.getUTFString(), 
                pt = l.getInt16(), a = 0; pt > a; a++) for (1 == l.getByte() ? ot.tweenKeyList.push(!0) : ot.tweenKeyList.push(!1), 
                ft = l.getFloat32(), ot.timeList.push(ft), ut = [], ot.vectices.push(ut), mt = l.getInt16(), 
                s = 0; mt > s; s++) ut.push(l.getFloat32());
            }
            var Dt, Mt, It = l.getInt16(), Nt = 0, bt = 0;
            for (t = 0; It > t; t++) {
                for (Nt = l.getInt16(), Dt = [], e = 0; Nt > e; e++) {
                    for (Mt = new R(), Mt.time = l.getFloat32(), bt = l.getInt16(), i = 0; bt > i; i++) Mt.drawOrder.push(l.getInt16());
                    Dt.push(Mt);
                }
                this.drawOrderAniArr.push(Dt);
            }
            var Tt, At, Ct = l.getInt16(), wt = 0;
            for (t = 0; Ct > t; t++) {
                for (wt = l.getInt16(), Tt = [], e = 0; wt > e; e++) At = new O(), At.name = l.getUTFString(), 
                At.intValue = l.getInt32(), At.floatValue = l.getFloat32(), At.stringValue = l.getUTFString(), 
                At.time = l.getFloat32(), Tt.push(At);
                this.eventAniArr.push(Tt);
            }
            var St = l.getInt16();
            if (St > 0) for (this.attachmentNames = [], t = 0; St > t; t++) this.attachmentNames.push(l.getUTFString());
            var Ft, kt, Pt = l.getInt16();
            for (t = 0; Pt > t; t++) Ft = new F(), Ft.name = l.readUTFString(), Ft.parent = l.readUTFString(), 
            Ft.attachmentName = l.readUTFString(), Ft.srcDisplayIndex = Ft.displayIndex = l.getInt16(), 
            Ft.templet = this, this.boneSlotDic[Ft.name] = Ft, kt = this.bindBoneBoneSlotDic[Ft.parent], 
            null == kt && (this.bindBoneBoneSlotDic[Ft.parent] = kt = []), kt.push(Ft), this.boneSlotArray.push(Ft);
            var Bt, Ut, Lt, Rt = l.readUTFString(), Ot = Rt.split("\n"), Et = 0, Kt = l.getUint8(), Yt = 0, Wt = 0, Vt = 0, Xt = 0, zt = 0, Gt = 0, qt = 0;
            for (t = 0; Kt > t; t++) {
                for (Bt = new X(), Bt.name = Ot[Et++], Yt = l.getUint8(), e = 0; Yt > e; e++) {
                    for (Ut = new G(), Ut.name = Ot[Et++], Ft = this.boneSlotDic[Ut.name], Wt = l.getUint8(), 
                    i = 0; Wt > i; i++) {
                        if (Lt = new z(), this.skinSlotDisplayDataArr.push(Lt), Lt.name = Ot[Et++], Lt.attachmentName = Ot[Et++], 
                        Lt.transform = new Q(), Lt.transform.scX = l.getFloat32(), Lt.transform.skX = l.getFloat32(), 
                        Lt.transform.skY = l.getFloat32(), Lt.transform.scY = l.getFloat32(), Lt.transform.x = l.getFloat32(), 
                        Lt.transform.y = l.getFloat32(), Ut.displayArr.push(Lt), Lt.width = l.getFloat32(), 
                        Lt.height = l.getFloat32(), Lt.type = l.getUint8(), Lt.verLen = l.getUint16(), P = l.getUint16(), 
                        P > 0) for (Lt.bones = [], a = 0; P > a; a++) {
                            var Ht = l.getUint16();
                            Lt.bones.push(Ht);
                        }
                        if (Vt = l.getUint16(), Vt > 0) for (Lt.uvs = [], a = 0; Vt > a; a++) Lt.uvs.push(l.getFloat32());
                        if (Xt = l.getUint16(), Xt > 0) for (Lt.weights = [], a = 0; Xt > a; a++) Lt.weights.push(l.getFloat32());
                        if (zt = l.getUint16(), zt > 0) for (Lt.triangles = [], a = 0; zt > a; a++) Lt.triangles.push(l.getUint16());
                        if (Gt = l.getUint16(), Gt > 0) for (Lt.vertices = [], a = 0; Gt > a; a++) Lt.vertices.push(l.getFloat32());
                        if (qt = l.getUint16(), qt > 0) for (Lt.lengths = [], a = 0; qt > a; a++) Lt.lengths.push(l.getFloat32());
                    }
                    Bt.slotArr.push(Ut);
                }
                this.skinDic[Bt.name] = Bt, this.skinDataArray.push(Bt);
            }
            var Qt = l.getUint8();
            1 == Qt ? (this.yReverseMatrix = new m(1, 0, 0, -1, 0, 0), k && k.setTempMatrix(this.yReverseMatrix)) : k && k.setTempMatrix(new m()), 
            this.showSkinByIndex(this.boneSlotDic, 0), this.isParserComplete = !0, this.event("complete", this);
        }, a.getTexture = function(t) {
            var e = this.subTextureDic[t];
            return null == e ? this._mainTexture : e;
        }, a.showSkinByIndex = function(t, e, i) {
            if (void 0 === i && (i = !0), 0 > e && e >= this.skinDataArray.length) return !1;
            var a, s, r = 0, n = 0, h = this.skinDataArray[e];
            if (h) {
                for (r = 0, n = h.slotArr.length; n > r; r++) s = h.slotArr[r], s && (a = t[s.name], 
                a && (a.showSlotData(s, i), i && "undefined" != a.attachmentName && "null" != a.attachmentName ? a.showDisplayByName(a.attachmentName) : a.showDisplayByIndex(a.displayIndex)));
                return !0;
            }
            return !1;
        }, a.getSkinIndexByName = function(t) {
            for (var e, i = 0, a = this.skinDataArray.length; a > i; i++) if (e = this.skinDataArray[i], 
            e.name == t) return i;
            return -1;
        }, a.getGrahicsDataWithCache = function(t, e) {
            return this._graphicsCache[t][e];
        }, a.setGrahicsDataWithCache = function(t, e, i) {
            this._graphicsCache[t][e] = i;
        }, a.destroy = function() {
            this._isDestroyed = !0;
            var t;
            for (var i in this.subTextureDic) t = this.subTextureDic[i], t && t.destroy();
            var i;
            for (i in this._textureDic) t = this._textureDic[i], t && t.destroy();
            for (var a, s = 0, r = this.skinSlotDisplayDataArr.length; r > s; s++) a = this.skinSlotDisplayDataArr[s], 
            a.destory();
            this.skinSlotDisplayDataArr.length = 0, this.url && delete e.TEMPLET_DICTIONARY[this.url], 
            this.dispose();
        }, a.getAniNameByIndex = function(t) {
            var e = this.getAnimation(t);
            return e ? e.name : null;
        }, r(0, a, "rate", function() {
            return this._rate;
        }, function(t) {
            this._rate = t;
        }), e.LAYA_ANIMATION_VISION = "LAYAANIMATION:1.6.0", e.TEMPLET_DICTIONARY = null, 
        e;
    }(it));
}(window, document, Laya);