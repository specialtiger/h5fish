!function(t, e, i) {
    var r = (i.un, i.uns, i["static"]), a = i["class"], s = i.getset, n = i.__newvec, h = laya.maths.Arith, l = laya.maths.Bezier, o = laya.resource.Bitmap, u = laya.utils.Browser, _ = laya.utils.Color, c = (laya.filters.ColorFilter, 
    i.Config), f = laya.resource.Context, d = (laya.events.Event, laya.filters.Filter), m = laya.display.Graphics, p = laya.resource.HTMLCanvas, g = (laya.utils.HTMLChar, 
    laya.resource.HTMLImage), v = laya.resource.HTMLSubImage, T = (laya.utils.Handler, 
    laya.maths.Matrix), b = laya.maths.Point, x = laya.maths.Rectangle, y = laya.renders.Render, A = (laya.renders.RenderContext, 
    laya.renders.RenderSprite), E = laya.resource.Resource, S = laya.resource.ResourceManager, w = laya.utils.RunDriver, R = laya.display.Sprite, I = laya.utils.Stat, C = laya.utils.StringKey, M = (laya.display.css.Style, 
    laya.system.System), L = laya.resource.Texture, P = (laya.net.URL, laya.utils.Utils), F = laya.utils.VectorGraphManager;
    laya.utils.WordText;
    i["interface"]("laya.webgl.shapes.IShape"), i["interface"]("laya.webgl.submit.ISubmit"), 
    i["interface"]("laya.webgl.text.ICharSegment"), i["interface"]("laya.webgl.canvas.save.ISaveData"), 
    i["interface"]("laya.webgl.resource.IMergeAtlasBitmap"), i["interface"]("laya.filters.IFilterActionGL", "laya.filters.IFilterAction");
    var D = function() {
        function t() {}
        a(t, "laya.filters.webgl.FilterActionGL");
        var e = t.prototype;
        return i.imps(e, {
            "laya.filters.IFilterActionGL": !0
        }), e.setValue = function(t) {}, e.setValueMix = function(t) {}, e.apply3d = function(t, e, i, r, a) {
            return null;
        }, e.apply = function(t) {
            return null;
        }, s(0, e, "typeMix", function() {
            return 0;
        }), t;
    }(), B = function() {
        function t() {}
        return a(t, "laya.webgl.shader.ShaderValue"), t;
    }(), N = function() {
        function t(t, e, r) {
            this._atlasID = 0, this._width = 0, this._height = 0, this._texCount = 0, this._rowInfo = null, 
            this._cells = null, this._failSize = new i(), void 0 === t && (t = 0), void 0 === e && (e = 0), 
            void 0 === r && (r = 0), this._cells = null, this._rowInfo = null, this._init(t, e), 
            this._atlasID = r;
        }
        var e, i;
        a(t, "laya.webgl.atlas.AtlasGrid");
        var r = t.prototype;
        return r.getAltasID = function() {
            return this._atlasID;
        }, r.setAltasID = function(t) {
            t >= 0 && (this._atlasID = t);
        }, r.addTex = function(t, e, i) {
            var r = this._get(e, i);
            return 0 == r.ret ? r : (this._fill(r.x, r.y, e, i, t), this._texCount++, r);
        }, r._release = function() {
            null != this._cells && (this._cells.length = 0, this._cells = null), this._rowInfo && (this._rowInfo.length = 0, 
            this._rowInfo = null);
        }, r._init = function(t, i) {
            if (this._width = t, this._height = i, this._release(), 0 == this._width) return !1;
            this._cells = new Uint8Array(this._width * this._height * 3), this._rowInfo = n(this._height);
            for (var r = 0; r < this._height; r++) this._rowInfo[r] = new e();
            return this._clear(), !0;
        }, r._get = function(t, e) {
            var i = new V();
            if (t >= this._failSize.width && e >= this._failSize.height) return i;
            for (var r = -1, a = -1, s = this._width, n = this._height, h = this._cells, l = 0; n > l; l++) if (!(this._rowInfo[l].spaceCount < t)) for (var o = 0; s > o; ) {
                var u = 3 * (l * s + o);
                if (0 != h[u] || h[u + 1] < t || h[u + 2] < e) o += h[u + 1]; else {
                    r = o, a = l;
                    for (var _ = 0; t > _; _++) if (h[3 * _ + u + 2] < e) {
                        r = -1;
                        break;
                    }
                    if (!(0 > r)) return i.ret = !0, i.x = r, i.y = a, i;
                    o += h[u + 1];
                }
            }
            return i;
        }, r._fill = function(t, e, i, r, a) {
            var s = this._width, n = this._height;
            this._check(s >= t + i && n >= e + r);
            for (var h = e; r + e > h; ++h) {
                this._check(this._rowInfo[h].spaceCount >= i), this._rowInfo[h].spaceCount -= i;
                for (var l = 0; i > l; l++) {
                    var o = 3 * (t + h * s + l);
                    this._check(0 == this._cells[o]), this._cells[o] = a, this._cells[o + 1] = i, this._cells[o + 2] = r;
                }
            }
            if (t > 0) for (h = 0; r > h; ++h) {
                var u = 0;
                for (l = t - 1; l >= 0 && 0 == this._cells[3 * ((e + h) * s + l)]; --l, ++u) ;
                for (l = u; l > 0; --l) this._cells[3 * ((e + h) * s + t - l) + 1] = l, this._check(l > 0);
            }
            if (e > 0) for (l = t; t + i > l; ++l) {
                for (u = 0, h = e - 1; h >= 0 && 0 == this._cells[3 * (l + h * s)]; --h, u++) ;
                for (h = u; h > 0; --h) this._cells[3 * (l + (e - h) * s) + 2] = h, this._check(h > 0);
            }
        }, r._check = function(t) {
            0 == t && console.log("xtexMerger 错误啦");
        }, r._clear = function() {
            this._texCount = 0;
            for (var t = 0; t < this._height; t++) this._rowInfo[t].spaceCount = this._width;
            for (var e = 0; e < this._height; e++) for (var i = 0; i < this._width; i++) {
                var r = 3 * (e * this._width + i);
                this._cells[r] = 0, this._cells[r + 1] = this._width - i, this._cells[r + 2] = this._width - e;
            }
            this._failSize.width = this._width + 1, this._failSize.height = this._height + 1;
        }, t.__init$ = function() {
            e = function() {
                function t() {
                    this.spaceCount = 0;
                }
                return a(t, ""), t;
            }(), i = function() {
                function t() {
                    this.width = 0, this.height = 0;
                }
                return a(t, ""), t;
            }();
        }, t;
    }(), O = function() {
        function t(t, e, i, r) {
            this._currentAtlasCount = 0, this._maxAtlaserCount = 0, this._width = 0, this._height = 0, 
            this._gridSize = 0, this._gridNumX = 0, this._gridNumY = 0, this._init = !1, this._curAtlasIndex = 0, 
            this._setAtlasParam = !1, this._atlaserArray = null, this._needGC = !1, this._setAtlasParam = !0, 
            this._width = t, this._height = e, this._gridSize = i, this._maxAtlaserCount = r, 
            this._gridNumX = t / i, this._gridNumY = e / i, this._curAtlasIndex = 0, this._atlaserArray = [];
        }
        a(t, "laya.webgl.atlas.AtlasResourceManager");
        var e = t.prototype;
        return e.setAtlasParam = function(e, i, r, a) {
            if (1 == this._setAtlasParam) return t._sid_ = 0, this._width = e, this._height = i, 
            this._gridSize = r, this._maxAtlaserCount = a, this._gridNumX = e / r, this._gridNumY = i / r, 
            this._curAtlasIndex = 0, this.freeAll(), !0;
            throw console.log("设置大图合集参数错误，只能在开始页面设置各种参数"), -1;
        }, e.pushData = function(e) {
            this._setAtlasParam = !1;
            for (var i = Math.ceil((e.bitmap.width + 2) / this._gridSize), r = Math.ceil((e.bitmap.height + 2) / this._gridSize), a = !1, s = 0; 2 > s; s++) {
                for (var n = this._maxAtlaserCount, h = 0; n > h; h++) {
                    var l = (this._curAtlasIndex + h) % n;
                    this._atlaserArray.length - 1 >= l || this._atlaserArray.push(new bt(this._gridNumX, this._gridNumY, this._width, this._height, t._sid_++));
                    var o = this._atlaserArray[l], u = e.bitmap, _ = o.inAtlasWebGLImagesKey.indexOf(u), c = 0, f = 0;
                    if (-1 != _) {
                        var d = o.InAtlasWebGLImagesOffsetValue[_];
                        c = d[0], f = d[1], o.addToAtlas(e, c, f), a = !0, this._curAtlasIndex = l;
                        break;
                    }
                    var m = o.addTex(1, i, r);
                    if (m.ret) {
                        c = m.x * this._gridSize + 1, f = m.y * this._gridSize + 1, u.lock = !0, o.addToAtlasTexture(u, c, f), 
                        o.addToAtlas(e, c, f), a = !0, this._curAtlasIndex = l;
                        break;
                    }
                }
                if (a) break;
                this._atlaserArray.push(new bt(this._gridNumX, this._gridNumY, this._width, this._height, t._sid_++)), 
                this._needGC = !0, this.garbageCollection(), this._curAtlasIndex = this._atlaserArray.length - 1;
            }
            return a || console.log(">>>AtlasManager pushData error"), a;
        }, e.addToAtlas = function(t) {
            laya.webgl.atlas.AtlasResourceManager.instance.pushData(t);
        }, e.garbageCollection = function() {
            if (this._needGC === !0) {
                for (var t = this._atlaserArray.length - this._maxAtlaserCount, e = 0; t > e; e++) this._atlaserArray[e].dispose();
                this._atlaserArray.splice(0, t), this._needGC = !1;
            }
            return !0;
        }, e.freeAll = function() {
            for (var t = 0, e = this._atlaserArray.length; e > t; t++) this._atlaserArray[t].dispose();
            this._atlaserArray.length = 0, this._curAtlasIndex = 0;
        }, e.getAtlaserCount = function() {
            return this._atlaserArray.length;
        }, e.getAtlaserByIndex = function(t) {
            return this._atlaserArray[t];
        }, s(1, t, "instance", function() {
            return t._Instance || (t._Instance = new t(laya.webgl.atlas.AtlasResourceManager.atlasTextureWidth, laya.webgl.atlas.AtlasResourceManager.atlasTextureHeight, 16, laya.webgl.atlas.AtlasResourceManager.maxTextureCount)), 
            t._Instance;
        }), s(1, t, "enabled", function() {
            return t._enabled;
        }), s(1, t, "atlasLimitWidth", function() {
            return t._atlasLimitWidth;
        }, function(e) {
            t._atlasLimitWidth = e;
        }), s(1, t, "atlasLimitHeight", function() {
            return t._atlasLimitHeight;
        }, function(e) {
            t._atlasLimitHeight = e;
        }), t._enable = function() {
            t._enabled = !0, c.atlasEnable = !0;
        }, t._disable = function() {
            t._enabled = !1, c.atlasEnable = !1;
        }, t.__init__ = function() {
            t.atlasTextureWidth = 2048, t.atlasTextureHeight = 2048, t.maxTextureCount = 6, 
            t.atlasLimitWidth = 512, t.atlasLimitHeight = 512;
        }, t._enabled = !1, t._atlasLimitWidth = 0, t._atlasLimitHeight = 0, t.gridSize = 16, 
        t.atlasTextureWidth = 0, t.atlasTextureHeight = 0, t.maxTextureCount = 0, t._atlasRestore = 0, 
        t.BOARDER_TYPE_NO = 0, t.BOARDER_TYPE_RIGHT = 1, t.BOARDER_TYPE_LEFT = 2, t.BOARDER_TYPE_BOTTOM = 4, 
        t.BOARDER_TYPE_TOP = 8, t.BOARDER_TYPE_ALL = 15, t._sid_ = 0, t._Instance = null, 
        t;
    }(), V = function() {
        function t() {
            this.x = 0, this.y = 0, this.ret = !1, this.ret = !1, this.x = 0, this.y = 0;
        }
        return a(t, "laya.webgl.atlas.MergeFillInfo"), t;
    }(), U = function() {
        function t() {}
        return a(t, "laya.webgl.canvas.BlendMode"), t._init_ = function(e) {
            t.fns = [ t.BlendNormal, t.BlendAdd, t.BlendMultiply, t.BlendScreen, t.BlendOverlay, t.BlendLight, t.BlendMask, t.BlendDestinationOut ], 
            t.targetFns = [ t.BlendNormalTarget, t.BlendAddTarget, t.BlendMultiplyTarget, t.BlendScreenTarget, t.BlendOverlayTarget, t.BlendLightTarget, t.BlendMask, t.BlendDestinationOut ];
        }, t.BlendNormal = function(t) {
            t.blendFuncSeparate(770, 771, 1, 1);
        }, t.BlendAdd = function(t) {
            t.blendFunc(770, 772);
        }, t.BlendMultiply = function(t) {
            t.blendFunc(774, 771);
        }, t.BlendScreen = function(t) {
            t.blendFunc(770, 1);
        }, t.BlendOverlay = function(t) {
            t.blendFunc(1, 769);
        }, t.BlendLight = function(t) {
            t.blendFunc(770, 1);
        }, t.BlendNormalTarget = function(t) {
            t.blendFuncSeparate(770, 771, 1, 771);
        }, t.BlendAddTarget = function(t) {
            t.blendFunc(770, 772);
        }, t.BlendMultiplyTarget = function(t) {
            t.blendFunc(774, 771);
        }, t.BlendScreenTarget = function(t) {
            t.blendFunc(770, 1);
        }, t.BlendOverlayTarget = function(t) {
            t.blendFunc(1, 769);
        }, t.BlendLightTarget = function(t) {
            t.blendFunc(770, 1);
        }, t.BlendMask = function(t) {
            t.blendFunc(0, 770);
        }, t.BlendDestinationOut = function(t) {
            t.blendFunc(0, 0);
        }, t.activeBlendFunction = null, t.NAMES = [ "normal", "add", "multiply", "screen", "overlay", "light", "mask", "destination-out" ], 
        t.TOINT = {
            normal: 0,
            add: 1,
            multiply: 2,
            screen: 3,
            lighter: 1,
            overlay: 4,
            light: 5,
            mask: 6,
            "destination-out": 7
        }, t.NORMAL = "normal", t.ADD = "add", t.MULTIPLY = "multiply", t.SCREEN = "screen", 
        t.LIGHT = "light", t.OVERLAY = "overlay", t.DESTINATIONOUT = "destination-out", 
        t.fns = [], t.targetFns = [], t;
    }(), H = function() {
        function t(t) {
            this._color = _.create("black"), this.setValue(t);
        }
        a(t, "laya.webgl.canvas.DrawStyle");
        var e = t.prototype;
        return e.setValue = function(t) {
            if (t) {
                if ("string" == typeof t) return void (this._color = _.create(t));
                if (t instanceof laya.utils.Color) return void (this._color = t);
            }
        }, e.reset = function() {
            this._color = _.create("black");
        }, e.equal = function(t) {
            return "string" == typeof t ? this._color.strColor === t : t instanceof laya.utils.Color ? this._color.numColor === t.numColor : !1;
        }, e.toColorStr = function() {
            return this._color.strColor;
        }, t.create = function(e) {
            if (e) {
                var i;
                if ("string" == typeof e ? i = _.create(e) : e instanceof laya.utils.Color && (i = e), 
                i) return i._drawStyle || (i._drawStyle = new t(e));
            }
            return null;
        }, t.DEFAULT = new t("#000000"), t;
    }(), k = function() {
        function t() {
            this._x = 0, this._y = 0, this.dirty = !1, this.offset = 0, this.count = 0, this.geoStart = 0, 
            this.tempArray = [], this.closePath = !1, this.geomatrys = [];
            ft.mainContext;
            this.ib = Wt.create(35048), this.vb = Xt.create(5);
        }
        a(t, "laya.webgl.canvas.Path");
        var e = t.prototype;
        return e.addPoint = function(t, e) {
            this.tempArray.push(t, e);
        }, e.getEndPointX = function() {
            return this.tempArray[this.tempArray.length - 2];
        }, e.getEndPointY = function() {
            return this.tempArray[this.tempArray.length - 1];
        }, e.polygon = function(t, e, i, r, a, s) {
            var n;
            return this.geomatrys.push(this._curGeomatry = n = new Et(t, e, i, r, a, s)), r || (n.fill = !1), 
            void 0 == s && (n.borderWidth = 0), n;
        }, e.setGeomtry = function(t) {
            this.geomatrys.push(this._curGeomatry = t);
        }, e.drawLine = function(t, e, i, r, a) {
            var s;
            return this.closePath ? this.geomatrys.push(this._curGeomatry = s = new At(t, e, i, r, a)) : this.geomatrys.push(this._curGeomatry = s = new yt(t, e, i, r, a)), 
            s.fill = !1, s;
        }, e.update = function() {
            var t = this.ib.byteLength, e = this.geomatrys.length;
            this.offset = t;
            for (var i = this.geoStart; e > i; i++) this.geomatrys[i].getData(this.ib, this.vb, this.vb.byteLength / 20);
            this.geoStart = e, this.count = (this.ib.byteLength - t) / ot.BYTES_PIDX;
        }, e.reset = function() {
            this.vb.clear(), this.ib.clear(), this.offset = this.count = this.geoStart = 0, 
            this.geomatrys.length = 0;
        }, t;
    }(), G = function() {
        function t() {}
        a(t, "laya.webgl.canvas.save.SaveBase");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.canvas.save.ISaveData": !0
        }), e.isSaveMark = function() {
            return !1;
        }, e.restore = function(e) {
            this._dataObj[this._valueName] = this._value, t._cache[t._cache._length++] = this, 
            this._newSubmit && (e._curSubmit = J.RENDERBASE, e._renderKey = 0);
        }, t._createArray = function() {
            var t = [];
            return t._length = 0, t;
        }, t._init = function() {
            var e = t._namemap = {};
            return e[1] = "ALPHA", e[2] = "fillStyle", e[8] = "font", e[256] = "lineWidth", 
            e[512] = "strokeStyle", e[8192] = "_mergeID", e[1024] = e[2048] = e[4096] = [], 
            e[16384] = "textBaseline", e[32768] = "textAlign", e[65536] = "_nBlendType", e[524288] = "shader", 
            e[1048576] = "filters", e;
        }, t.save = function(e, i, r, a) {
            if ((e._saveMark._saveuse & i) !== i) {
                e._saveMark._saveuse |= i;
                var s = t._cache, n = s._length > 0 ? s[--s._length] : new t();
                n._value = r[n._valueName = t._namemap[i]], n._dataObj = r, n._newSubmit = a;
                var h = e._save;
                h[h._length++] = n;
            }
        }, t._cache = laya.webgl.canvas.save.SaveBase._createArray(), t._namemap = t._init(), 
        t;
    }(), z = function() {
        function t() {
            this._clipRect = new x();
        }
        a(t, "laya.webgl.canvas.save.SaveClipRect");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.canvas.save.ISaveData": !0
        }), e.isSaveMark = function() {
            return !1;
        }, e.restore = function(e) {
            e._clipRect = this._clipSaveRect, t._cache[t._cache._length++] = this, this._submitScissor.submitLength = e._submits._length - this._submitScissor.submitIndex, 
            e._curSubmit = J.RENDERBASE, e._renderKey = 0;
        }, t.save = function(e, i) {
            if (131072 != (131072 & e._saveMark._saveuse)) {
                e._saveMark._saveuse |= 131072;
                var r = t._cache, a = r._length > 0 ? r[--r._length] : new t();
                a._clipSaveRect = e._clipRect, e._clipRect = a._clipRect.copyFrom(e._clipRect), 
                a._submitScissor = i;
                var s = e._save;
                s[s._length++] = a;
            }
        }, t._cache = G._createArray(), t;
    }(), W = function() {
        function t() {
            this._saveuse = 0;
        }
        a(t, "laya.webgl.canvas.save.SaveMark");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.canvas.save.ISaveData": !0
        }), e.isSaveMark = function() {
            return !0;
        }, e.restore = function(e) {
            e._saveMark = this._preSaveMark, t._no[t._no._length++] = this;
        }, t.Create = function(e) {
            var i = t._no, r = i._length > 0 ? i[--i._length] : new t();
            return r._saveuse = 0, r._preSaveMark = e._saveMark, e._saveMark = r, r;
        }, t._no = G._createArray(), t;
    }(), X = function() {
        function t() {
            this._matrix = new T();
        }
        a(t, "laya.webgl.canvas.save.SaveTransform");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.canvas.save.ISaveData": !0
        }), e.isSaveMark = function() {
            return !1;
        }, e.restore = function(e) {
            e._curMat = this._savematrix, t._no[t._no._length++] = this;
        }, t.save = function(e) {
            var i = e._saveMark;
            if (2048 !== (2048 & i._saveuse)) {
                i._saveuse |= 2048;
                var r = t._no, a = r._length > 0 ? r[--r._length] : new t();
                a._savematrix = e._curMat, e._curMat = e._curMat.copyTo(a._matrix);
                var s = e._save;
                s[s._length++] = a;
            }
        }, t._no = G._createArray(), t;
    }(), Y = function() {
        function t() {}
        a(t, "laya.webgl.canvas.save.SaveTranslate");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.canvas.save.ISaveData": !0
        }), e.isSaveMark = function() {
            return !1;
        }, e.restore = function(e) {
            e._curMat;
            e._x = this._x, e._y = this._y, t._no[t._no._length++] = this;
        }, t.save = function(e) {
            var i = t._no, r = i._length > 0 ? i[--i._length] : new t();
            r._x = e._x, r._y = e._y;
            var a = e._save;
            a[a._length++] = r;
        }, t._no = G._createArray(), t;
    }(), K = function() {
        function t() {
            this.target = null, this.repaint = !1, this._width = NaN, this._height = NaN, this._sp = null, 
            this._clipRect = new x();
        }
        a(t, "laya.webgl.resource.RenderTargetMAX");
        var e = t.prototype;
        return e.setSP = function(t) {
            this._sp = t;
        }, e.size = function(t, e) {
            var r = this;
            return this._width === t && this._height === e ? void this.target.size(t, e) : (this.repaint = !0, 
            this._width = t, this._height = e, this.target ? this.target.size(t, e) : this.target = It.create(t, e), 
            void (this.target.hasListener("recovered") || this.target.on("recovered", this, function(t) {
                i.timer.callLater(r._sp, r._sp.repaint);
            })));
        }, e._flushToTarget = function(t, e) {
            if (!e._destroy) {
                var i = _t.worldScissorTest, r = _t.worldClipRect;
                _t.worldClipRect = this._clipRect, this._clipRect.x = this._clipRect.y = 0, this._clipRect.width = this._width, 
                this._clipRect.height = this._height, _t.worldScissorTest = !1, ft.mainContext.disable(3089);
                var a = _t.worldAlpha, s = _t.worldMatrix4, n = _t.worldMatrix, h = _t.worldFilters, l = _t.worldShaderDefines;
                if (_t.worldMatrix = T.EMPTY, _t.restoreTempArray(), _t.worldMatrix4 = _t.TEMPMAT4_ARRAY, 
                _t.worldAlpha = 1, _t.worldFilters = null, _t.worldShaderDefines = null, Rt.activeShader = null, 
                e.start(), c.showCanvasMark ? e.clear(0, 1, 0, .3) : e.clear(0, 0, 0, 0), t.flush(), 
                e.end(), Rt.activeShader = null, _t.worldAlpha = a, _t.worldMatrix4 = s, _t.worldMatrix = n, 
                _t.worldFilters = h, _t.worldShaderDefines = l, _t.worldScissorTest = i, i) {
                    var o = _t.height - r.y - r.height;
                    ft.mainContext.scissor(r.x, o, r.width, r.height), ft.mainContext.enable(3089);
                }
                _t.worldClipRect = r;
            }
        }, e.flush = function(t) {
            this.repaint && (this._flushToTarget(t, this.target), this.repaint = !1);
        }, e.drawTo = function(t, e, i, r, a) {
            t.drawTexture(this.target.getTexture(), e, i, r, a, 0, 0);
        }, e.destroy = function() {
            this.target && (this.target.destroy(), this.target = null, this._sp = null);
        }, t;
    }(), Q = function() {
        function t() {
            this.ALPHA = 1, this.shaderType = 0, this.defines = new xt();
        }
        return a(t, "laya.webgl.shader.d2.Shader2D"), t.__init__ = function() {
            Ht.addInclude("parts/ColorFilter_ps_uniform.glsl", "uniform vec4 colorAlpha;\nuniform mat4 colorMat;"), 
            Ht.addInclude("parts/ColorFilter_ps_logic.glsl", "gl_FragColor = gl_FragColor * colorMat + colorAlpha/255.0;"), 
            Ht.addInclude("parts/GlowFilter_ps_uniform.glsl", "uniform vec4 u_color;\nuniform float u_strength;\nuniform float u_blurX;\nuniform float u_blurY;\nuniform float u_offsetX;\nuniform float u_offsetY;\nuniform float u_textW;\nuniform float u_textH;"), 
            Ht.addInclude("parts/GlowFilter_ps_logic.glsl", "const float c_IterationTime = 10.0;\nfloat floatIterationTotalTime = c_IterationTime * c_IterationTime;\nvec4 vec4Color = vec4(0.0,0.0,0.0,0.0);\nvec2 vec2FilterDir = vec2(-(u_offsetX)/u_textW,-(u_offsetY)/u_textH);\nvec2 vec2FilterOff = vec2(u_blurX/u_textW/c_IterationTime * 2.0,u_blurY/u_textH/c_IterationTime * 2.0);\nfloat maxNum = u_blurX * u_blurY;\nvec2 vec2Off = vec2(0.0,0.0);\nfloat floatOff = c_IterationTime/2.0;\nfor(float i = 0.0;i<=c_IterationTime; ++i){\n\tfor(float j = 0.0;j<=c_IterationTime; ++j){\n\t\tvec2Off = vec2(vec2FilterOff.x * (i - floatOff),vec2FilterOff.y * (j - floatOff));\n\t\tvec4Color += texture2D(texture, v_texcoord + vec2FilterDir + vec2Off)/floatIterationTotalTime;\n\t}\n}\ngl_FragColor = vec4(u_color.rgb,vec4Color.a * u_strength);"), 
            Ht.addInclude("parts/BlurFilter_ps_logic.glsl", "gl_FragColor =   blur();\ngl_FragColor.w*=alpha;"), 
            Ht.addInclude("parts/BlurFilter_ps_uniform.glsl", "uniform float strength;\nuniform vec2 blurInfo;\n\n#define PI 3.141593\n\nfloat sigma=strength/3.0;//3σ以外影响很小。即当σ=1的时候，半径为3\nfloat sig2 = sigma*sigma;\nfloat _2sig2 = 2.0*sig2;\n//return 1.0/(2*PI*sig2)*exp(-(x*x+y*y)/_2sig2)\nfloat gauss1 = 1.0/(2.0*PI*sig2);\n\nfloat getGaussian(float x, float y){\n    return gauss1*exp(-(x*x+y*y)/_2sig2);\n}\n\nvec4 blur(){\n    const float blurw = 9.0;\n    vec4 vec4Color = vec4(0.0,0.0,0.0,0.0);\n    vec2 halfsz=vec2(blurw,blurw)/2.0/blurInfo;    \n    vec2 startpos=v_texcoord-halfsz;\n    vec2 ctexcoord = startpos;\n    vec2 step = 1.0/blurInfo;  //每个像素      \n    \n    for(float y = 0.0;y<=blurw; ++y){\n        ctexcoord.x=startpos.x;\n        for(float x = 0.0;x<=blurw; ++x){\n            //TODO 纹理坐标的固定偏移应该在vs中处理\n            vec4Color += texture2D(texture, ctexcoord)*getGaussian(x-blurw/2.0,y-blurw/2.0);\n            ctexcoord.x+=step.x;\n        }\n        ctexcoord.y+=step.y;\n    }\n    return vec4Color;\n}"), 
            Ht.addInclude("parts/ColorAdd_ps_uniform.glsl", "uniform vec4 colorAdd;\n"), Ht.addInclude("parts/ColorAdd_ps_logic.glsl", "gl_FragColor = vec4(colorAdd.rgb,colorAdd.a*gl_FragColor.a);");
            var t, e;
            t = "attribute vec4 position;\nattribute vec2 texcoord;\nuniform vec2 size;\n\n#ifdef WORLDMAT\nuniform mat4 mmat;\n#endif\nvarying vec2 v_texcoord;\nvoid main() {\n  #ifdef WORLDMAT\n  vec4 pos=mmat*position;\n  gl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n  #else\n  gl_Position =vec4((position.x/size.x-0.5)*2.0,(0.5-position.y/size.y)*2.0,position.z,1.0);\n  #endif\n  \n  v_texcoord = texcoord;\n}", 
            e = 'precision mediump float;\n//precision highp float;\nvarying vec2 v_texcoord;\nuniform sampler2D texture;\nuniform float alpha;\n#include?BLUR_FILTER  "parts/BlurFilter_ps_uniform.glsl";\n#include?COLOR_FILTER "parts/ColorFilter_ps_uniform.glsl";\n#include?GLOW_FILTER "parts/GlowFilter_ps_uniform.glsl";\n#include?COLOR_ADD "parts/ColorAdd_ps_uniform.glsl";\n\nvoid main() {\n   vec4 color= texture2D(texture, v_texcoord);\n   color.a*=alpha;\n   gl_FragColor=color;\n   #include?COLOR_ADD "parts/ColorAdd_ps_logic.glsl";   \n   #include?BLUR_FILTER  "parts/BlurFilter_ps_logic.glsl";\n   #include?COLOR_FILTER "parts/ColorFilter_ps_logic.glsl";\n   #include?GLOW_FILTER "parts/GlowFilter_ps_logic.glsl";\n}', 
            Ht.preCompile2D(0, 1, t, e, null), t = "attribute vec4 position;\nuniform vec2 size;\nuniform mat4 mmat;\nvoid main() {\n  vec4 pos=mmat*position;\n  gl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n}", 
            e = 'precision mediump float;\nuniform vec4 color;\nuniform float alpha;\n#include?COLOR_FILTER "parts/ColorFilter_ps_uniform.glsl";\nvoid main() {\n\tvec4 a = vec4(color.r, color.g, color.b, color.a);\n\ta.w = alpha;\n\tgl_FragColor = a;\n\t#include?COLOR_FILTER "parts/ColorFilter_ps_logic.glsl";\n}', 
            Ht.preCompile2D(0, 2, t, e, null), t = "attribute vec4 position;\nattribute vec3 a_color;\nuniform mat4 mmat;\nuniform mat4 u_mmat2;\nuniform vec2 u_pos;\nuniform vec2 size;\nvarying vec3 color;\nvoid main(){\n  vec4 tPos = vec4(position.x + u_pos.x,position.y + u_pos.y,position.z,position.w);\n  vec4 pos=mmat*u_mmat2*tPos;\n  gl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n  color=a_color;\n}", 
            e = "precision mediump float;\n//precision mediump float;\nvarying vec3 color;\nuniform float alpha;\nvoid main(){\n\t//vec4 a=vec4(color.r, color.g, color.b, 1);\n\t//a.a*=alpha;\n    gl_FragColor=vec4(color.r, color.g, color.b, alpha);\n}", 
            Ht.preCompile2D(0, 4, t, e, null), t = "attribute vec4 position;\nattribute vec2 texcoord;\nuniform vec2 size;\n\n#ifdef WORLDMAT\nuniform mat4 mmat;\n#endif\nvarying vec2 v_texcoord;\nvoid main() {\n  #ifdef WORLDMAT\n  vec4 pos=mmat*position;\n  gl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n  #else\n  gl_Position =vec4((position.x/size.x-0.5)*2.0,(0.5-position.y/size.y)*2.0,position.z,1.0);\n  #endif\n  \n  v_texcoord = texcoord;\n}", 
            e = '#ifdef FSHIGHPRECISION\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n//precision highp float;\nvarying vec2 v_texcoord;\nuniform sampler2D texture;\nuniform float alpha;\nuniform vec4 u_TexRange;\nuniform vec2 u_offset;\n#include?BLUR_FILTER  "parts/BlurFilter_ps_uniform.glsl";\n#include?COLOR_FILTER "parts/ColorFilter_ps_uniform.glsl";\n#include?GLOW_FILTER "parts/GlowFilter_ps_uniform.glsl";\n#include?COLOR_ADD "parts/ColorAdd_ps_uniform.glsl";\n\nvoid main() {\n   vec2 newTexCoord;\n   newTexCoord.x = mod(u_offset.x + v_texcoord.x,u_TexRange.y) + u_TexRange.x;\n   newTexCoord.y = mod(u_offset.y + v_texcoord.y,u_TexRange.w) + u_TexRange.z;\n   vec4 color= texture2D(texture, newTexCoord);\n   color.a*=alpha;\n   gl_FragColor=color;\n   #include?COLOR_ADD "parts/ColorAdd_ps_logic.glsl";   \n   #include?BLUR_FILTER  "parts/BlurFilter_ps_logic.glsl";\n   #include?COLOR_FILTER "parts/ColorFilter_ps_logic.glsl";\n   #include?GLOW_FILTER "parts/GlowFilter_ps_logic.glsl";\n}', 
            Ht.preCompile2D(0, 256, t, e, null), t = "attribute vec2 position;\nattribute vec2 texcoord;\nattribute vec4 color;\nuniform vec2 size;\nuniform float offsetX;\nuniform float offsetY;\nuniform mat4 mmat;\nuniform mat4 u_mmat2;\nvarying vec2 v_texcoord;\nvarying vec4 v_color;\nvoid main() {\n  vec4 pos=mmat*u_mmat2*vec4(offsetX+position.x,offsetY+position.y,0,1 );\n  gl_Position = vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n  v_color = color;\n  v_texcoord = texcoord;  \n}", 
            e = "precision mediump float;\nvarying vec2 v_texcoord;\nvarying vec4 v_color;\nuniform sampler2D texture;\nuniform float alpha;\nvoid main() {\n\tvec4 t_color = texture2D(texture, v_texcoord);\n\tgl_FragColor = t_color.rgba * v_color;\n\tgl_FragColor.a = gl_FragColor.a * alpha;\n}", 
            Ht.preCompile2D(0, 512, t, e, null);
        }, t;
    }(), j = function() {
        function t(t, e, i) {
            this._value = 0, this._name2int = t, this._int2name = e, this._int2nameMap = i;
        }
        a(t, "laya.webgl.shader.ShaderDefines");
        var e = t.prototype;
        return e.add = function(t) {
            return "string" == typeof t && (t = this._name2int[t]), this._value |= t, this._value;
        }, e.addInt = function(t) {
            return this._value |= t, this._value;
        }, e.remove = function(t) {
            return "string" == typeof t && (t = this._name2int[t]), this._value &= ~t, this._value;
        }, e.isDefine = function(t) {
            return (this._value & t) === t;
        }, e.getValue = function() {
            return this._value;
        }, e.setValue = function(t) {
            this._value = t;
        }, e.toNameDic = function() {
            var e = this._int2nameMap[this._value];
            return e ? e : t._toText(this._value, this._int2name, this._int2nameMap);
        }, t._reg = function(t, e, i, r) {
            i[t] = e, r[e] = t;
        }, t._toText = function(t, e, i) {
            var r = i[t];
            if (r) return r;
            for (var a = {}, s = 1, n = 0; 32 > n && (s = 1 << n, !(s > t)); n++) if (t & s) {
                var h = e[s];
                h && (a[h] = "");
            }
            return i[t] = a, a;
        }, t._toInt = function(t, e) {
            for (var i = t.split("."), r = 0, a = 0, s = i.length; s > a; a++) {
                var n = e[i[a]];
                if (!n) throw new Error("Defines to int err:" + t + "/" + i[a]);
                r |= n;
            }
            return r;
        }, t;
    }(), q = function() {
        function t() {
            this.mVBBuffer = null, this.mIBBuffer = null, this.mVBData = null, this.mIBData = null, 
            this.mEleNum = 0, this.mTexture = null, this.transform = null, this._vs = null, 
            this._ps = null, this._indexStart = -1, this._verticles = null, this._uvs = null, 
            this._tempMat16 = _t.getMatrArray();
        }
        a(t, "laya.webgl.shader.d2.skinAnishader.SkinMesh");
        var e = t.prototype;
        return e.init = function(e, i, r) {
            if (i) this._vs = i; else {
                this._vs = [];
                var a = e.width, s = e.height, n = 1, h = 1, l = 1, o = 1;
                this._vs.push(0, 0, 0, 0, n, h, l, o), this._vs.push(a, 0, 1, 0, n, h, l, o), this._vs.push(a, s, 1, 1, n, h, l, o), 
                this._vs.push(0, s, 0, 1, n, h, l, o);
            }
            r ? this._ps = r : (t._defaultPS || (t._defaultPS = [], t._defaultPS.push(0, 1, 3, 3, 1, 2)), 
            this._ps = t._defaultPS), this.mVBData = new Float32Array(this._vs), this.mIBData = new Uint16Array(this._ps.length), 
            this.mIBData.start = -1, this.mEleNum = this._ps.length, this.mTexture = e;
        }, e.init2 = function(t, e, i, r, a) {
            this.transform && (this.transform = null), i ? this._ps = i : (this._ps = [], this._ps.push(0, 1, 3, 3, 1, 2)), 
            this._verticles = r, this._uvs = a, this.mEleNum = this._ps.length, this.mTexture = t, 
            (y.isConchNode || y.isConchApp) && (this._initMyData(), this.mVBData = new Float32Array(this._vs));
        }, e._initMyData = function() {
            var e = 0, i = 0, r = this._verticles.length, a = 4 * r;
            this._vs = t._tempVS;
            var s = !1;
            if (y.isConchNode || y.isConchApp ? (this._vs.length = a, s = !0) : this._vs.length < a && (this._vs.length = a, 
            s = !0), t._tVSLen = a, s) for (;a > e; ) this._vs[e] = this._verticles[i], this._vs[e + 1] = this._verticles[i + 1], 
            this._vs[e + 2] = this._uvs[i], this._vs[e + 3] = this._uvs[i + 1], this._vs[e + 4] = 1, 
            this._vs[e + 5] = 1, this._vs[e + 6] = 1, this._vs[e + 7] = 1, e += 8, i += 2; else for (;a > e; ) this._vs[e] = this._verticles[i], 
            this._vs[e + 1] = this._verticles[i + 1], this._vs[e + 2] = this._uvs[i], this._vs[e + 3] = this._uvs[i + 1], 
            e += 8, i += 2;
        }, e.getData2 = function(e, i, r) {
            this.mVBBuffer = e, this.mIBBuffer = i, this._initMyData(), e.appendEx2(this._vs, Float32Array, t._tVSLen, 4), 
            this._indexStart = i.byteLength;
            var a;
            a = t._tempIB, a.length < this._ps.length && (a.length = this._ps.length);
            for (var s = 0, n = this._ps.length; n > s; s++) a[s] = this._ps[s] + r;
            i.appendEx2(a, Uint16Array, this._ps.length, 2);
        }, e.getData = function(t, e, i) {
            if (this.mVBBuffer = t, this.mIBBuffer = e, t.append(this.mVBData), this._indexStart = e.byteLength, 
            this.mIBData.start != i) {
                for (var r = 0, a = this._ps.length; a > r; r++) this.mIBData[r] = this._ps[r] + i;
                this.mIBData.start = i;
            }
            e.append(this.mIBData);
        }, e.render = function(t, e, i) {
            if (y.isWebGL && this.mTexture) {
                t._renderKey = 0, t._shader2D.glTexture = null, Z.getInstance().addSkinMesh(this);
                var r = J.createShape(t, this.mIBBuffer, this.mVBBuffer, this.mEleNum, this._indexStart, gt.create(512, 0));
                this.transform || (this.transform = T.EMPTY), this.transform.translate(e, i), T.mul16(this.transform, t._curMat, this._tempMat16), 
                this.transform.translate(-e, -i);
                var a = r.shaderValue;
                a.textureHost = this.mTexture, a.offsetX = 0, a.offsetY = 0, a.u_mmat2 = this._tempMat16, 
                a.ALPHA = t._shader2D.ALPHA, t._submits[t._submits._length++] = r;
            } else y.isConchApp && this.mTexture && (this.transform || (this.transform = T.EMPTY), 
            t.setSkinMesh && t.setSkinMesh(e, i, this._ps, this.mVBData, this.mEleNum, 0, this.mTexture, this.transform));
        }, t._tempVS = [], t._tempIB = [], t._defaultPS = null, t._tVSLen = 0, t;
    }(), Z = function() {
        function t() {
            this.ib = null, this.vb = null;
            ft.mainContext;
            this.ib = Wt.create(35048), this.vb = Xt.create(8);
        }
        a(t, "laya.webgl.shader.d2.skinAnishader.SkinMeshBuffer");
        var e = t.prototype;
        return e.addSkinMesh = function(t) {
            t.getData2(this.vb, this.ib, this.vb.byteLength / 32);
        }, e.reset = function() {
            this.vb.clear(), this.ib.clear();
        }, t.getInstance = function() {
            return t.instance = t.instance || new t();
        }, t.instance = null, t;
    }(), $ = function() {
        function t(t, e, i, r, a, s, n, h, l) {
            this.r0 = 0, this.fill = !0, this.r1 = Math.PI / 2, void 0 === l && (l = 0), this.x = t, 
            this.y = e, this.width = i, this.height = r, this.edges = a, this.color = s, this.borderWidth = n, 
            this.borderColor = h;
        }
        a(t, "laya.webgl.shapes.BasePoly");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.shapes.IShape": !0
        }), e.getData = function(t, e, i) {}, e.rebuild = function(t) {}, e.setMatrix = function(t) {}, 
        e.needUpdate = function(t) {
            return !0;
        }, e.sector = function(t, e, i) {
            var r = this.x, a = this.y, s = this.edges, n = (this.r1 - this.r0) / s, h = this.width, l = this.height, o = this.color, u = (o >> 16 & 255) / 255, _ = (o >> 8 & 255) / 255, c = (255 & o) / 255;
            t.push(r, a, u, _, c);
            for (var f = 0; s + 1 > f; f++) t.push(r + Math.sin(n * f + this.r0) * h, a + Math.cos(n * f + this.r0) * l), 
            t.push(u, _, c);
            for (f = 0; s > f; f++) e.push(i, i + f + 1, i + f + 2);
        }, e.createLine2 = function(t, e, i, r, a, s) {
            var n, h, l, o, u, _, c, f, d, m, p, g, v, T, b, x, y, A, E, S, w, R = t.concat(), I = a, C = this.borderColor, M = (C >> 16 & 255) / 255, L = (C >> 8 & 255) / 255, P = (255 & C) / 255, F = R.length / 2, D = r, B = i / 2;
            l = R[0], o = R[1], u = R[2], _ = R[3], d = -(o - _), m = l - u, w = Math.sqrt(d * d + m * m), 
            d = d / w * B, m = m / w * B, I.push(l - d + this.x, o - m + this.y, M, L, P, l + d + this.x, o + m + this.y, M, L, P);
            for (var N = 1; F - 1 > N; N++) l = R[2 * (N - 1)], o = R[2 * (N - 1) + 1], u = R[2 * N], 
            _ = R[2 * N + 1], c = R[2 * (N + 1)], f = R[2 * (N + 1) + 1], d = -(o - _), m = l - u, 
            w = Math.sqrt(d * d + m * m), d = d / w * B, m = m / w * B, p = -(_ - f), g = u - c, 
            w = Math.sqrt(p * p + g * g), p = p / w * B, g = g / w * B, v = -m + o - (-m + _), 
            T = -d + u - (-d + l), b = (-d + l) * (-m + _) - (-d + u) * (-m + o), x = -g + f - (-g + _), 
            y = -p + u - (-p + c), A = (-p + c) * (-g + _) - (-p + u) * (-g + f), E = v * y - x * T, 
            Math.abs(E) < .1 ? (E += 10.1, I.push(u - d + this.x, _ - m + this.y, M, L, P, u + d + this.x, _ + m + this.y, M, L, P)) : (n = (T * A - y * b) / E, 
            h = (x * b - v * A) / E, S = (n - u) * (n - u) + (h - _) + (h - _), I.push(n + this.x, h + this.y, M, L, P, u - (n - u) + this.x, _ - (h - _) + this.y, M, L, P));
            l = R[R.length - 4], o = R[R.length - 3], u = R[R.length - 2], _ = R[R.length - 1], 
            d = -(o - _), m = l - u, w = Math.sqrt(d * d + m * m), d = d / w * B, m = m / w * B, 
            I.push(u - d + this.x, _ - m + this.y, M, L, P, u + d + this.x, _ + m + this.y, M, L, P);
            var O = s;
            for (N = 1; O > N; N++) e.push(D + 2 * (N - 1), D + 2 * (N - 1) + 1, D + 2 * N + 1, D + 2 * N + 1, D + 2 * N, D + 2 * (N - 1));
            return I;
        }, e.createLine = function(t, e, i, r) {
            var a = t.concat(), s = t, n = this.borderColor, h = (n >> 16 & 255) / 255, l = (n >> 8 & 255) / 255, o = (255 & n) / 255;
            a.splice(0, 5);
            var u, _, c, f, d, m, p, g, v, T, b, x, y, A, E, S, w, R, I, C, M, L = a.length / 5, P = r, F = i / 2;
            c = a[0], f = a[1], d = a[5], m = a[6], v = -(f - m), T = c - d, M = Math.sqrt(v * v + T * T), 
            v = v / M * F, T = T / M * F, s.push(c - v, f - T, h, l, o, c + v, f + T, h, l, o);
            for (var D = 1; L - 1 > D; D++) c = a[5 * (D - 1)], f = a[5 * (D - 1) + 1], d = a[5 * D], 
            m = a[5 * D + 1], p = a[5 * (D + 1)], g = a[5 * (D + 1) + 1], v = -(f - m), T = c - d, 
            M = Math.sqrt(v * v + T * T), v = v / M * F, T = T / M * F, b = -(m - g), x = d - p, 
            M = Math.sqrt(b * b + x * x), b = b / M * F, x = x / M * F, y = -T + f - (-T + m), 
            A = -v + d - (-v + c), E = (-v + c) * (-T + m) - (-v + d) * (-T + f), S = -x + g - (-x + m), 
            w = -b + d - (-b + p), R = (-b + p) * (-x + m) - (-b + d) * (-x + g), I = y * w - S * A, 
            Math.abs(I) < .1 ? (I += 10.1, s.push(d - v, m - T, h, l, o, d + v, m + T, h, l, o)) : (u = (A * R - w * E) / I, 
            _ = (S * E - y * R) / I, C = (u - d) * (u - d) + (_ - m) + (_ - m), s.push(u, _, h, l, o, d - (u - d), m - (_ - m), h, l, o));
            c = a[a.length - 10], f = a[a.length - 9], d = a[a.length - 5], m = a[a.length - 4], 
            v = -(f - m), T = c - d, M = Math.sqrt(v * v + T * T), v = v / M * F, T = T / M * F, 
            s.push(d - v, m - T, h, l, o, d + v, m + T, h, l, o);
            var B = this.edges + 1;
            for (D = 1; B > D; D++) e.push(P + 2 * (D - 1), P + 2 * (D - 1) + 1, P + 2 * D + 1, P + 2 * D + 1, P + 2 * D, P + 2 * (D - 1));
            return s;
        }, e.createLoopLine = function(t, e, i, r, a, s) {
            var n = t.concat(), h = a ? a : t, l = this.borderColor, o = (l >> 16 & 255) / 255, u = (l >> 8 & 255) / 255, _ = (255 & l) / 255;
            n.splice(0, 5);
            var c = [ n[0], n[1] ], f = [ n[n.length - 5], n[n.length - 4] ], d = f[0] + .5 * (c[0] - f[0]), m = f[1] + .5 * (c[1] - f[1]);
            n.unshift(d, m, 0, 0, 0), n.push(d, m, 0, 0, 0);
            var p, g, v, T, b, x, y, A, E, S, w, R, I, C, M, L, P, F, D, B, N, O = n.length / 5, V = r, U = i / 2;
            v = n[0], T = n[1], b = n[5], x = n[6], E = -(T - x), S = v - b, N = Math.sqrt(E * E + S * S), 
            E = E / N * U, S = S / N * U, h.push(v - E, T - S, o, u, _, v + E, T + S, o, u, _);
            for (var H = 1; O - 1 > H; H++) v = n[5 * (H - 1)], T = n[5 * (H - 1) + 1], b = n[5 * H], 
            x = n[5 * H + 1], y = n[5 * (H + 1)], A = n[5 * (H + 1) + 1], E = -(T - x), S = v - b, 
            N = Math.sqrt(E * E + S * S), E = E / N * U, S = S / N * U, w = -(x - A), R = b - y, 
            N = Math.sqrt(w * w + R * R), w = w / N * U, R = R / N * U, I = -S + T - (-S + x), 
            C = -E + b - (-E + v), M = (-E + v) * (-S + x) - (-E + b) * (-S + T), L = -R + A - (-R + x), 
            P = -w + b - (-w + y), F = (-w + y) * (-R + x) - (-w + b) * (-R + A), D = I * P - L * C, 
            Math.abs(D) < .1 ? (D += 10.1, h.push(b - E, x - S, o, u, _, b + E, x + S, o, u, _)) : (p = (C * F - P * M) / D, 
            g = (L * M - I * F) / D, B = (p - b) * (p - b) + (g - x) + (g - x), h.push(p, g, o, u, _, b - (p - b), x - (g - x), o, u, _));
            s && (e = s);
            var k = this.edges + 1;
            for (H = 1; k > H; H++) e.push(V + 2 * (H - 1), V + 2 * (H - 1) + 1, V + 2 * H + 1, V + 2 * H + 1, V + 2 * H, V + 2 * (H - 1));
            return e.push(V + 2 * (H - 1), V + 2 * (H - 1) + 1, V + 1, V + 1, V, V + 2 * (H - 1)), 
            h;
        }, t;
    }(), J = (function() {
        function t(t, e, i, r, a, s, n) {
            this.lineWidth = t, this.lineColor = e, this.lineAlpha = i, this.fillColor = r, 
            this.fillAlpha = a, this.shape = n, this.fill = s;
        }
        a(t, "laya.webgl.shapes.GeometryData");
        var e = t.prototype;
        return e.clone = function() {
            return new t(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.fill, this.shape);
        }, e.getIndexData = function() {
            return null;
        }, e.getVertexData = function() {
            return null;
        }, e.destroy = function() {
            this.shape = null;
        }, t;
    }(), function() {
        function t(t) {
            if (t instanceof Float32Array) this.points = t; else if (t instanceof Array) {
                t.length;
                this.points = new Float32Array(t);
            }
        }
        a(t, "laya.webgl.shapes.Vertex");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.shapes.IShape": !0
        }), e.getData = function(t, e, i) {}, e.needUpdate = function(t) {
            return !1;
        }, e.rebuild = function(t) {}, e.setMatrix = function(t) {}, t;
    }(), function() {
        function t(t) {
            void 0 === t && (t = 1e4), this._renderType = t;
        }
        a(t, "laya.webgl.submit.Submit");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.submit.ISubmit": !0
        }), e.releaseRender = function() {
            var e = t._cache;
            e[e._length++] = this, this.shaderValue.release(), this._vb = null;
        }, e.getRenderType = function() {
            return this._renderType;
        }, e.renderSubmit = function() {
            if (0 === this._numEle) return 1;
            var t = this.shaderValue.textureHost;
            if (t) {
                var e = t.source;
                if (!t.bitmap || !e) return 1;
                this.shaderValue.texture = e;
            }
            this._vb.bind_upload(this._ib);
            var i = ft.mainContext;
            return this.shaderValue.upload(), U.activeBlendFunction !== this._blendFn && (i.enable(3042), 
            this._blendFn(i), U.activeBlendFunction = this._blendFn), I.drawCall++, I.trianglesFaces += this._numEle / 3, 
            i.drawElements(4, this._numEle, 5123, this._startIdx), 1;
        }, t.__init__ = function() {
            var e = t.RENDERBASE = new t(-1);
            e.shaderValue = new gt(0, 0), e.shaderValue.ALPHA = -1234;
        }, t.create = function(e, i, r, a, s) {
            var n = t._cache._length ? t._cache[--t._cache._length] : new t();
            null == r && (r = n._selfVb || (n._selfVb = Xt.create(-1)), r.clear(), a = 0), n._ib = i, 
            n._vb = r, n._startIdx = a * ot.BYTES_PIDX, n._numEle = 0;
            var h = e._nBlendType;
            n._blendFn = e._targets ? U.targetFns[h] : U.fns[h], n.shaderValue = s, n.shaderValue.setValue(e._shader2D);
            var l = e._shader2D.filters;
            return l && n.shaderValue.setFilters(l), n;
        }, t.createShape = function(e, i, r, a, s, n) {
            var h = t._cache._length ? t._cache[--t._cache._length] : new t();
            h._ib = i, h._vb = r, h._numEle = a, h._startIdx = s, h.shaderValue = n, h.shaderValue.setValue(e._shader2D);
            var l = e._nBlendType;
            return h._blendFn = e._targets ? U.targetFns[l] : U.fns[l], h;
        }, t.TYPE_2D = 1e4, t.TYPE_CANVAS = 10003, t.TYPE_CMDSETRT = 10004, t.TYPE_CUSTOM = 10005, 
        t.TYPE_BLURRT = 10006, t.TYPE_CMDDESTORYPRERT = 10007, t.TYPE_DISABLESTENCIL = 10008, 
        t.TYPE_OTHERIBVB = 10009, t.TYPE_PRIMITIVE = 10010, t.TYPE_RT = 10011, t.TYPE_BLUR_RT = 10012, 
        t.TYPE_TARGET = 10013, t.TYPE_CHANGE_VALUE = 10014, t.TYPE_SHAPE = 10015, t.TYPE_TEXTURE = 10016, 
        t.TYPE_FILLTEXTURE = 10017, t.RENDERBASE = null, t._cache = (t._cache = [], t._cache._length = 0, 
        t._cache), t;
    }()), tt = function() {
        function t() {
            this.fun = null, this.args = null;
        }
        a(t, "laya.webgl.submit.SubmitCMD");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.submit.ISubmit": !0
        }), e.renderSubmit = function() {
            return this.fun.apply(null, this.args), 1;
        }, e.getRenderType = function() {
            return 0;
        }, e.releaseRender = function() {
            var e = t._cache;
            e[e._length++] = this;
        }, t.create = function(e, i) {
            var r = t._cache._length ? t._cache[--t._cache._length] : new t();
            return r.fun = i, r.args = e, r;
        }, t._cache = (t._cache = [], t._cache._length = 0, t._cache), t;
    }(), et = function() {
        function t() {
            this.variables = {};
        }
        a(t, "laya.webgl.submit.SubmitCMDScope");
        var e = t.prototype;
        return e.getValue = function(t) {
            return this.variables[t];
        }, e.addValue = function(t, e) {
            return this.variables[t] = e;
        }, e.setValue = function(t, e) {
            return this.variables.hasOwnProperty(t) ? this.variables[t] = e : null;
        }, e.clear = function() {
            for (var t in this.variables) delete this.variables[t];
        }, e.recycle = function() {
            this.clear(), t.POOL.push(this);
        }, t.create = function() {
            var e = t.POOL.pop();
            return e || (e = new t()), e;
        }, t.POOL = [], t;
    }(), it = function() {
        function t() {
            this.offset = 0, this.startIndex = 0, this._mat = T.create();
        }
        a(t, "laya.webgl.submit.SubmitOtherIBVB");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.submit.ISubmit": !0
        }), e.releaseRender = function() {
            var e = t._cache;
            e[e._length++] = this;
        }, e.getRenderType = function() {
            return 10009;
        }, e.renderSubmit = function() {
            var e = this._shaderValue.textureHost;
            if (e) {
                var i = e.source;
                if (!e.bitmap || !i) return 1;
                this._shaderValue.texture = i;
            }
            this._vb.bind_upload(this._ib);
            var r = _t.worldMatrix4, a = T.TEMP;
            T.mulPre(this._mat, r[0], r[1], r[4], r[5], r[12], r[13], a);
            var s = _t.worldMatrix4 = t.tempMatrix4;
            s[0] = a.a, s[1] = a.b, s[4] = a.c, s[5] = a.d, s[12] = a.tx, s[13] = a.ty, this._shader._offset = this.offset, 
            this._shaderValue.refresh(), this._shader.upload(this._shaderValue), this._shader._offset = 0;
            var n = ft.mainContext;
            return U.activeBlendFunction !== this._blendFn && (n.enable(3042), this._blendFn(n), 
            U.activeBlendFunction = this._blendFn), I.drawCall++, I.trianglesFaces += this._numEle / 3, 
            n.drawElements(4, this._numEle, 5123, this.startIndex), _t.worldMatrix4 = r, Rt.activeShader = null, 
            1;
        }, t.create = function(e, i, r, a, s, n, h, l, o) {
            void 0 === o && (o = 0);
            var u = t._cache._length ? t._cache[--t._cache._length] : new t();
            u._ib = r, u._vb = i, u._numEle = a, u._shader = s, u._shaderValue = n;
            var _ = e._nBlendType;
            switch (u._blendFn = e._targets ? U.targetFns[_] : U.fns[_], o) {
              case 0:
                u.offset = 0, u.startIndex = l / (ot.BYTES_PE * i.vertexStride) * 1.5, u.startIndex *= ot.BYTES_PIDX;
                break;

              case 1:
                u.startIndex = h, u.offset = l;
            }
            return u;
        }, t._cache = (t._cache = [], t._cache._length = 0, t._cache), t.tempMatrix4 = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], 
        t;
    }(), rt = function() {
        function t() {
            this.submitIndex = 0, this.submitLength = 0, this.context = null, this.clipRect = new x(), 
            this.screenRect = new x();
        }
        a(t, "laya.webgl.submit.SubmitScissor");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.submit.ISubmit": !0
        }), e._scissor = function(t, e, i, r) {
            var a = _t.worldMatrix4, s = a[0], n = a[5], h = a[12], l = a[13];
            if (t = t * s + h, e = e * n + l, i *= s, r *= n, 1 > i || 1 > r) return !1;
            var o = t + i, u = e + r;
            0 > t && (t = 0, i = o - t), 0 > e && (e = 0, r = u - e);
            var _ = _t.worldClipRect;
            if (t = Math.max(t, _.x), e = Math.max(e, _.y), i = Math.min(o, _.right) - t, r = Math.min(u, _.bottom) - e, 
            1 > i || 1 > r) return !1;
            var c = _t.worldScissorTest;
            return this.screenRect.copyFrom(_), _.x = t, _.y = e, _.width = i, _.height = r, 
            _t.worldScissorTest = !0, e = _t.height - e - r, ft.mainContext.scissor(t, e, i, r), 
            ft.mainContext.enable(3089), this.context.submitElement(this.submitIndex, this.submitIndex + this.submitLength), 
            c ? (e = _t.height - this.screenRect.y - this.screenRect.height, ft.mainContext.scissor(this.screenRect.x, e, this.screenRect.width, this.screenRect.height), 
            ft.mainContext.enable(3089)) : (ft.mainContext.disable(3089), _t.worldScissorTest = !1), 
            _.copyFrom(this.screenRect), !0;
        }, e._scissorWithTagart = function(t, e, i, r) {
            if (1 > i || 1 > r) return !1;
            var a = t + i, s = e + r;
            0 > t && (t = 0, i = a - t), 0 > e && (e = 0, r = s - e);
            var n = _t.worldClipRect;
            if (t = Math.max(t, n.x), e = Math.max(e, n.y), i = Math.min(a, n.right) - t, r = Math.min(s, n.bottom) - e, 
            1 > i || 1 > r) return !1;
            var h = _t.worldScissorTest;
            return this.screenRect.copyFrom(n), _t.worldScissorTest = !0, n.x = t, n.y = e, 
            n.width = i, n.height = r, e = _t.height - e - r, ft.mainContext.scissor(t, e, i, r), 
            ft.mainContext.enable(3089), this.context.submitElement(this.submitIndex, this.submitIndex + this.submitLength), 
            h ? (e = _t.height - this.screenRect.y - this.screenRect.height, ft.mainContext.scissor(this.screenRect.x, e, this.screenRect.width, this.screenRect.height), 
            ft.mainContext.enable(3089)) : (ft.mainContext.disable(3089), _t.worldScissorTest = !1), 
            n.copyFrom(this.screenRect), !0;
        }, e.renderSubmit = function() {
            return this.submitLength = Math.min(this.context._submits._length - 1, this.submitLength), 
            this.submitLength < 1 || this.clipRect.width < 1 || this.clipRect.height < 1 ? this.submitLength + 1 : (this.context._targets ? this._scissorWithTagart(this.clipRect.x, this.clipRect.y, this.clipRect.width, this.clipRect.height) : this._scissor(this.clipRect.x, this.clipRect.y, this.clipRect.width, this.clipRect.height), 
            this.submitLength + 1);
        }, e.getRenderType = function() {
            return 0;
        }, e.releaseRender = function() {
            var e = t._cache;
            e[e._length++] = this, this.context = null;
        }, t.create = function(e) {
            var i = t._cache._length ? t._cache[--t._cache._length] : new t();
            return i.context = e, i;
        }, t._cache = (t._cache = [], t._cache._length = 0, t._cache), t;
    }(), at = function() {
        function t() {
            this.step = 0, this.blendMode = null, this.level = 0;
        }
        a(t, "laya.webgl.submit.SubmitStencil");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.submit.ISubmit": !0
        }), e.renderSubmit = function() {
            switch (this.step) {
              case 1:
                this.do1();
                break;

              case 2:
                this.do2();
                break;

              case 3:
                this.do3();
                break;

              case 4:
                this.do4();
                break;

              case 5:
                this.do5();
                break;

              case 6:
                this.do6();
            }
            return 1;
        }, e.getRenderType = function() {
            return 0;
        }, e.releaseRender = function() {
            var e = t._cache;
            e[e._length++] = this;
        }, e.do1 = function() {
            var t = ft.mainContext;
            t.enable(2960), t.clear(1024), t.colorMask(!1, !1, !1, !1), t.stencilFunc(514, this.level, 255), 
            t.stencilOp(7680, 7680, 7682);
        }, e.do2 = function() {
            var t = ft.mainContext;
            t.stencilFunc(514, this.level + 1, 255), t.colorMask(!0, !0, !0, !0), t.stencilOp(7680, 7680, 7680);
        }, e.do3 = function() {
            var t = ft.mainContext;
            t.colorMask(!0, !0, !0, !0), t.stencilOp(7680, 7680, 7680), t.clear(1024), t.disable(2960);
        }, e.do4 = function() {
            var t = ft.mainContext;
            t.enable(2960), t.clear(1024), t.colorMask(!1, !1, !1, !1), t.stencilFunc(519, this.level, 255), 
            t.stencilOp(7680, 7680, 5386);
        }, e.do5 = function() {
            var t = ft.mainContext;
            t.stencilFunc(514, 255, 255), t.colorMask(!0, !0, !0, !0), t.stencilOp(7680, 7680, 7680);
        }, e.do6 = function() {
            var t = ft.mainContext;
            U.targetFns[U.TOINT[this.blendMode]](t);
        }, t.create = function(e) {
            var i = t._cache._length ? t._cache[--t._cache._length] : new t();
            return i.step = e, i;
        }, t._cache = (t._cache = [], t._cache._length = 0, t._cache), t;
    }(), st = function() {
        function t() {
            this._renderType = 0, this._vb = null, this._ib = null, this._startIdx = 0, this._numEle = 0, 
            this.shaderValue = null, this.blendType = 0, this.proName = null, this.scope = null;
        }
        a(t, "laya.webgl.submit.SubmitTarget");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.submit.ISubmit": !0
        }), e.renderSubmit = function() {
            this._vb.bind_upload(this._ib);
            var t = this.scope.getValue(this.proName);
            return t && (this.shaderValue.texture = t.source, this.shaderValue.strength && !this.shaderValue.blurInfo && (this.shaderValue.blurInfo = [ t.width, t.height ]), 
            this.shaderValue.upload(), this.blend(), I.drawCall++, I.trianglesFaces += this._numEle / 3, 
            ft.mainContext.drawElements(4, this._numEle, 5123, this._startIdx)), 1;
        }, e.blend = function() {
            if (U.activeBlendFunction !== U.fns[this.blendType]) {
                var t = ft.mainContext;
                t.enable(3042), U.fns[this.blendType](t), U.activeBlendFunction = U.fns[this.blendType];
            }
        }, e.getRenderType = function() {
            return 0;
        }, e.releaseRender = function() {
            var e = t._cache;
            e[e._length++] = this;
        }, t.create = function(e, i, r, a, s, n) {
            var h = t._cache._length ? t._cache[--t._cache._length] : new t();
            return h._ib = i, h._vb = r, h.proName = n, h._startIdx = a * ot.BYTES_PIDX, h._numEle = 0, 
            h.blendType = e._nBlendType, h.shaderValue = s, h.shaderValue.setValue(e._shader2D), 
            h;
        }, t._cache = (t._cache = [], t._cache._length = 0, t._cache), t;
    }(), nt = function() {
        function t() {
            this._sourceStr = null;
        }
        a(t, "laya.webgl.text.CharSegment");
        var e = t.prototype;
        return i.imps(e, {
            "laya.webgl.text.ICharSegment": !0
        }), e.textToSpit = function(t) {
            this._sourceStr = t;
        }, e.getChar = function(t) {
            return this._sourceStr.charAt(t);
        }, e.getCharCode = function(t) {
            return this._sourceStr.charCodeAt(t);
        }, e.length = function() {
            return this._sourceStr.length;
        }, t;
    }(), ht = function() {
        function t() {}
        var e;
        return a(t, "laya.webgl.text.DrawText"), t.__init__ = function() {
            t._charsTemp = new Array(), t._drawValue = new e(), t._charSeg = new nt();
        }, t.customCharSeg = function(e) {
            t._charSeg = e;
        }, t.getChar = function(e, i, r) {
            return t._charsCache[i] = Ot.createOneChar(e, r);
        }, t._drawSlow = function(e, i, r, a, s, n, h, l, o, u, _, c, f, d) {
            var m, p, g = t._drawValue.value(n, l, o, u, f, d), v = 0, T = 0, b = t._charsTemp, x = 0, y = NaN;
            if (a) for (b.length = a.length, v = 0, T = a.length; T > v; v++) p = a[v], y = p.charNum + g.txtID, 
            b[v] = m = t._charsCache[y] || t.getChar(p["char"], y, g), m.active(); else {
                r instanceof laya.utils.WordText ? t._charSeg.textToSpit(r.toString()) : t._charSeg.textToSpit(r);
                var A = t._charSeg.length();
                for (b.length = A, v = 0, T = A; T > v; v++) y = t._charSeg.getCharCode(v) + g.txtID, 
                b[v] = m = t._charsCache[y] || t.getChar(t._charSeg.getChar(v), y, g), m.active(), 
                x += m.cw;
            }
            var E = 0;
            null !== h && "left" !== h && (E = -("center" == h ? x / 2 : x));
            var S, w, R = NaN, I = 0;
            if (a) for (v = 0, T = b.length; T > v; v++) m = b[v], m.isSpace || (p = a[v], R = m.borderSize, 
            S = m.texture, i._drawText(S, _ + E + p.x * f - R, c + p.y * d - R, S.width, S.height, s, 0, 0, 0, 0)); else {
                for (v = 0, T = b.length; T > v; v++) m = b[v], m.isSpace || (R = m.borderSize, 
                S = m.texture, i._drawText(S, _ + E - R, c - R, S.width, S.height, s, 0, 0, 0, 0), 
                e && (w = e[I++], w || (w = e[I - 1] = []), w[0] = S, w[1] = E - R, w[2] = -R)), 
                E += m.cw;
                e && (e.length = I);
            }
        }, t._drawFast = function(t, e, i, r, a) {
            for (var s, n, h = 0, l = t.length; l > h; h++) n = t[h], s = n[0], s.active(), 
            e._drawText(s, r + n[1], a + n[2], s.width, s.height, i, 0, 0, 0, 0);
        }, t.drawText = function(e, r, a, s, n, h, l, o, u, _, f) {
            if (!(r && 0 === r.length || a && 0 === a.length)) {
                var d = s.a, m = s.d;
                (0 !== s.b || 0 !== s.c) && (d = m = 1);
                var p = 1 !== d || 1 !== m;
                if (p && i.stage.transform) {
                    var g = i.stage.transform;
                    p = g.a === d && g.d === m;
                } else p = !1;
                if (p ? (s = s.copyTo(pt._tmpMatrix), s.scale(1 / d, 1 / m), s._checkTransform(), 
                s.tx = i.stage.x, s.ty = i.stage.y, _ *= d, f *= m) : d = m = 1, a) t._drawSlow(null, e, r, a, s, n, h, l, o, u, _, f, d, m); else {
                    if (null === r.toUpperCase) {
                        var v = d + 1e5 * m, T = r;
                        return void (T.changed || T.id !== v ? (T.id = v, T.changed = !1, t._drawSlow(T.save, e, r, a, s, n, h, l, o, u, _, f, d, m)) : t._drawFast(T.save, e, s, _, f));
                    }
                    var b = r + n.toString() + l + o + u + d + m + h, x = t._textsCache[b];
                    x ? t._drawFast(x, e, s, _, f) : (t._textsCache.__length || (t._textsCache.__length = 0), 
                    t._textsCache.__length > c.WebGLTextCacheCount && (t._textsCache = {}, t._textsCache.__length = 0, 
                    t._curPoolIndex = 0), t._textCachesPool[t._curPoolIndex] ? (x = t._textsCache[b] = t._textCachesPool[t._curPoolIndex], 
                    x.length = 0) : t._textCachesPool[t._curPoolIndex] = x = t._textsCache[b] = [], 
                    t._textsCache.__length++, t._curPoolIndex++, t._drawSlow(x, e, r, a, s, n, h, l, o, u, _, f, d, m));
                }
            }
        }, t._charsTemp = null, t._textCachesPool = [], t._curPoolIndex = 0, t._charsCache = {}, 
        t._textsCache = {}, t._drawValue = null, t.d = [], t._charSeg = null, t.__init$ = function() {
            e = function() {
                function t() {}
                a(t, "");
                var e = t.prototype;
                return e.value = function(e, i, r, a, s, n) {
                    this.font = e, this.fillColor = i, this.borderColor = r, this.lineWidth = a, this.scaleX = s, 
                    this.scaleY = n;
                    var h = e.toString() + s + n + a + i + r;
                    return this.txtID = t._keymap[h], this.txtID || (this.txtID = 1e-7 * ++t._keymapCount, 
                    t._keymap[h] = this.txtID), this;
                }, t.clear = function() {
                    t._keymap = {}, t._keymapCount = 1;
                }, t._keymap = {}, t._keymapCount = 1, t;
            }();
        }, t;
    }(), lt = function() {
        function t(e) {
            this._index = 0, this._size = 14, this._italic = -2, t._cache2 = t._cache2 || [], 
            this.setFont(e || "14px Arial");
        }
        a(t, "laya.webgl.text.FontInContext");
        var e = t.prototype;
        return e.setFont = function(e) {
            var i = t._cache2[e];
            if (i) this._words = i[0], this._size = i[1]; else {
                this._words = e.split(" ");
                for (var r = 0, a = this._words.length; a > r; r++) if (this._words[r].indexOf("px") > 0) {
                    this._index = r;
                    break;
                }
                this._size = parseInt(this._words[this._index]), t._cache2[e] = [ this._words, this._size ];
            }
            this._text = null, this._italic = -2;
        }, e.getItalic = function() {
            return -2 === this._italic && (this._italic = this.hasType("italic")), this._italic;
        }, e.hasType = function(t) {
            for (var e = 0, i = this._words.length; i > e; e++) if (this._words[e] === t) return e;
            return -1;
        }, e.removeType = function(t) {
            for (var e = 0, i = this._words.length; i > e; e++) if (this._words[e] === t) {
                this._words.splice(e, 1), this._index > e && this._index--;
                break;
            }
            this._text = null, this._italic = -2;
        }, e.copyTo = function(t) {
            return t._text = this._text, t._size = this._size, t._index = this._index, t._words = this._words.slice(), 
            t._italic = -2, t;
        }, e.toString = function() {
            return this._text ? this._text : this._text = this._words.join(" ");
        }, s(0, e, "size", function() {
            return this._size;
        }, function(t) {
            this._size = t, this._words[this._index] = t + "px", this._text = null;
        }), t.create = function(e) {
            var i = t._cache[e];
            return i ? i : i = t._cache[e] = new t(e);
        }, t.EMPTY = new t(), t._cache = {}, t._cache2 = null, t;
    }(), ot = function() {
        function t() {}
        return a(t, "laya.webgl.utils.CONST3D2D"), t.defaultMatrix4 = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], 
        t.defaultMinusYMatrix4 = [ 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], t.uniformMatrix3 = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0 ], 
        t._TMPARRAY = [], t._OFFSETX = 0, t._OFFSETY = 0, r(t, [ "BYTES_PE", function() {
            return this.BYTES_PE = Float32Array.BYTES_PER_ELEMENT;
        }, "BYTES_PIDX", function() {
            return this.BYTES_PIDX = Uint16Array.BYTES_PER_ELEMENT;
        } ]), t;
    }(), ut = function() {
        function t() {}
        return a(t, "laya.webgl.utils.GlUtils"), t.make2DProjection = function(t, e, i) {
            return [ 2 / t, 0, 0, 0, 0, -2 / e, 0, 0, 0, 0, 2 / i, 0, -1, 1, 0, 1 ];
        }, t.fillIBQuadrangle = function(t, e) {
            if (e > 65535 / 4) throw Error("IBQuadrangle count:" + e + " must<:" + Math.floor(65535 / 4));
            e = Math.floor(e), t._resizeBuffer(6 * (e + 1) * 2, !1), t.byteLength = t.bufferLength;
            for (var i = t.getUint16Array(), r = 0, a = 0; e > a; a++) i[r++] = 4 * a, i[r++] = 4 * a + 2, 
            i[r++] = 4 * a + 1, i[r++] = 4 * a, i[r++] = 4 * a + 3, i[r++] = 4 * a + 2;
            return t.setNeedUpload(), !0;
        }, t.expandIBQuadrangle = function(e, i) {
            e.bufferLength >= 6 * i * 2 || t.fillIBQuadrangle(e, i);
        }, t.mathCeilPowerOfTwo = function(t) {
            return t--, t |= t >> 1, t |= t >> 2, t |= t >> 4, t |= t >> 8, t |= t >> 16, t++, 
            t;
        }, t.fillQuadrangleImgVb = function(t, e, i, r, a, s, n, h) {
            "use strict";
            var l = (t._byteLength >> 2) + 16;
            t.byteLength = l << 2;
            var o = t.getFloat32Array();
            l -= 16, o[l + 2] = a[0], o[l + 3] = a[1], o[l + 6] = a[2], o[l + 7] = a[3], o[l + 10] = a[4], 
            o[l + 11] = a[5], o[l + 14] = a[6], o[l + 15] = a[7];
            var u = s.a, _ = s.b, c = s.c, f = s.d;
            if (1 !== u || 0 !== _ || 0 !== c || 1 !== f) {
                s.bTransform = !0;
                var d = s.tx + n, m = s.ty + h;
                o[l] = (r[0] + e) * u + (r[1] + i) * c + d, o[l + 1] = (r[0] + e) * _ + (r[1] + i) * f + m, 
                o[l + 4] = (r[2] + e) * u + (r[3] + i) * c + d, o[l + 5] = (r[2] + e) * _ + (r[3] + i) * f + m, 
                o[l + 8] = (r[4] + e) * u + (r[5] + i) * c + d, o[l + 9] = (r[4] + e) * _ + (r[5] + i) * f + m, 
                o[l + 12] = (r[6] + e) * u + (r[7] + i) * c + d, o[l + 13] = (r[6] + e) * _ + (r[7] + i) * f + m;
            } else s.bTransform = !1, e += s.tx + n, i += s.ty + h, o[l] = e + r[0], o[l + 1] = i + r[1], 
            o[l + 4] = e + r[2], o[l + 5] = i + r[3], o[l + 8] = e + r[4], o[l + 9] = i + r[5], 
            o[l + 12] = e + r[6], o[l + 13] = i + r[7];
            return t._upload = !0, !0;
        }, t.fillTranglesVB = function(t, e, i, r, a, s, n) {
            "use strict";
            var h = (t._byteLength >> 2) + r.length;
            t.byteLength = h << 2;
            var l = t.getFloat32Array();
            h -= r.length;
            for (var o = r.length, u = a.a, _ = a.b, c = a.c, f = a.d, d = 0; o > d; d += 4) if (l[h + d + 2] = r[d + 2], 
            l[h + d + 3] = r[d + 3], 1 !== u || 0 !== _ || 0 !== c || 1 !== f) {
                a.bTransform = !0;
                var m = a.tx + s, p = a.ty + n;
                l[h + d] = (r[d] + e) * u + (r[d + 1] + i) * c + m, l[h + d + 1] = (r[d] + e) * _ + (r[d + 1] + i) * f + p;
            } else a.bTransform = !1, e += a.tx + s, i += a.ty + n, l[h + d] = e + r[d], l[h + d + 1] = i + r[d + 1];
            return t._upload = !0, !0;
        }, t.copyPreImgVb = function(t, e, i) {
            var r = t._byteLength >> 2;
            t.byteLength = r + 16 << 2;
            for (var a = t.getFloat32Array(), s = 0, n = r - 16; 4 > s; s++) a[r] = a[n] + e, 
            ++r, ++n, a[r] = a[n] + i, ++r, ++n, a[r] = a[n], ++r, ++n, a[r] = a[n], ++r, ++n;
            t._upload = !0;
        }, t.fillRectImgVb = function(t, e, i, r, a, s, n, h, l, o, u, _, c) {
            void 0 === c && (c = !1);
            var f, d, m, p, g, v, T, b, x, y, A, E, S, w, R, I, C = 1, M = h.a, L = h.b, P = h.c, F = h.d, D = e.width < 99999999;
            if (1 !== M || 0 !== L || 0 !== P || 1 !== F ? (h.bTransform = !0, 0 === L && 0 === P && (C = 23, 
            x = a + i, y = s + r, A = h.tx + l, E = h.ty + o, f = M * i + A, m = M * x + A, 
            d = F * r + E, p = F * y + E)) : (C = 23, h.bTransform = !1, f = i + h.tx + l, m = f + a, 
            d = r + h.ty + o, p = d + s), D && (g = e.x, v = e.y, T = e.width + g, b = e.height + v), 
            1 !== C && (Math.min(f, m) >= T || Math.min(d, p) >= b || Math.max(m, f) <= g || Math.max(p, d) <= v)) return !1;
            var B = t._byteLength >> 2;
            t.byteLength = B + 16 << 2;
            var N = t.getFloat32Array();
            switch (N[B + 2] = n[0], N[B + 3] = n[1], N[B + 6] = n[2], N[B + 7] = n[3], N[B + 10] = n[4], 
            N[B + 11] = n[5], N[B + 14] = n[6], N[B + 15] = n[7], C) {
              case 1:
                A = h.tx + l, E = h.ty + o, x = a + i, y = s + r;
                var O = i, V = r, U = M * O, H = P * V, k = F * V, G = L * O, z = M * x, W = P * y, X = F * y, Y = L * x;
                c ? (S = U + H + A, R = Math.round(S) - S, w = k + G + E, I = Math.round(w) - w, 
                N[B] = S + R, N[B + 1] = w + I, N[B + 4] = z + H + A + R, N[B + 5] = k + Y + E + I, 
                N[B + 8] = z + W + A + R, N[B + 9] = X + Y + E + I, N[B + 12] = U + W + A + R, N[B + 13] = X + G + E + I) : (N[B] = U + H + A, 
                N[B + 1] = k + G + E, N[B + 4] = z + H + A, N[B + 5] = k + Y + E, N[B + 8] = z + W + A, 
                N[B + 9] = X + Y + E, N[B + 12] = U + W + A, N[B + 13] = X + G + E);
                break;

              case 23:
                c ? (S = f + u, R = Math.round(S) - S, w = d, I = Math.round(w) - w, N[B] = S + R, 
                N[B + 1] = w + I, N[B + 4] = m + u + R, N[B + 5] = d + I, N[B + 8] = m + R, N[B + 9] = p + I, 
                N[B + 12] = f + R, N[B + 13] = p + I) : (N[B] = f + u, N[B + 1] = d, N[B + 4] = m + u, 
                N[B + 5] = d, N[B + 8] = m, N[B + 9] = p, N[B + 12] = f, N[B + 13] = p);
            }
            return t._upload = !0, !0;
        }, t.fillLineVb = function(e, i, r, a, s, n, h, l) {
            "use strict";
            var o = .5 * h, u = t._fillLineArray, _ = -(a - n), c = r - s, f = Math.sqrt(_ * _ + c * c);
            _ /= f, c /= f, _ *= o, c *= o, u[0] = r - _, u[1] = a - c, u[4] = r + _, u[5] = a + c, 
            u[8] = s + _, u[9] = n + c, u[12] = s - _, u[13] = n - c, l && l.transformPointArray(u, u);
            var d = (e._byteLength >> 2) + 16;
            return e.byteLength = d << 2, e.insertData(u, d - 16), !0;
        }, t._fillLineArray = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], t;
    }(), _t = (function() {
        function t() {}
        return a(t, "laya.webgl.utils.MatirxArray"), t.ArrayMul = function(e, i, r) {
            if (!e) return void t.copyArray(i, r);
            if (!i) return void t.copyArray(e, r);
            for (var a = NaN, s = NaN, n = NaN, h = NaN, l = 0; 4 > l; l++) a = e[l], s = e[l + 4], 
            n = e[l + 8], h = e[l + 12], r[l] = a * i[0] + s * i[1] + n * i[2] + h * i[3], r[l + 4] = a * i[4] + s * i[5] + n * i[6] + h * i[7], 
            r[l + 8] = a * i[8] + s * i[9] + n * i[10] + h * i[11], r[l + 12] = a * i[12] + s * i[13] + n * i[14] + h * i[15];
        }, t.copyArray = function(t, e) {
            if (t && e) for (var i = 0; i < t.length; i++) e[i] = t[i];
        }, t;
    }(), function() {
        function t() {}
        return a(t, "laya.webgl.utils.RenderState2D"), t.getMatrArray = function() {
            return [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
        }, t.mat2MatArray = function(t, e) {
            var i = t, r = e;
            return r[0] = i.a, r[1] = i.b, r[4] = i.c, r[5] = i.d, r[12] = i.tx, r[13] = i.ty, 
            e;
        }, t.restoreTempArray = function() {
            t.TEMPMAT4_ARRAY[0] = 1, t.TEMPMAT4_ARRAY[1] = 0, t.TEMPMAT4_ARRAY[4] = 0, t.TEMPMAT4_ARRAY[5] = 1, 
            t.TEMPMAT4_ARRAY[12] = 0, t.TEMPMAT4_ARRAY[13] = 0;
        }, t.clear = function() {
            t.worldScissorTest = !1, t.worldShaderDefines = null, t.worldFilters = null, t.worldAlpha = 1, 
            t.worldClipRect.x = t.worldClipRect.y = 0, t.worldClipRect.width = t.width, t.worldClipRect.height = t.height, 
            t.curRenderTarget = null;
        }, t._MAXSIZE = 99999999, t.EMPTYMAT4_ARRAY = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], 
        t.TEMPMAT4_ARRAY = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], t.worldMatrix4 = t.TEMPMAT4_ARRAY, 
        t.worldAlpha = 1, t.worldScissorTest = !1, t.worldFilters = null, t.worldShaderDefines = null, 
        t.worldClipRect = new x(0, 0, 99999999, 99999999), t.curRenderTarget = null, t.width = 0, 
        t.height = 0, r(t, [ "worldMatrix", function() {
            return this.worldMatrix = new T();
        } ]), t;
    }()), ct = function() {
        function t(t, i, r, a, s) {
            function n(t) {
                for (var e = t.split(" "), i = [], r = 0; r < e.length; r++) e[r].length > 0 && i.push(e[r]);
                return i;
            }
            function h(t) {
                var i, r, a = 0, h = 0, l = 0, o = new e(0, null, null, null), u = o, _ = t.split("\n");
                for (a = 0, h = _.length; h > a; a++) {
                    var c = _[a];
                    if (c.indexOf("#ifdef") >= 0) i = n(c), u = new e(1, i[1], "", u); else if (c.indexOf("#else") >= 0) r = u.condition, 
                    u = new e(2, null, "", u.parent), u.condition = r; else if (c.indexOf("#endif") >= 0) u = u.parent; else if (c.indexOf("#include") >= 0) {
                        i = n(c);
                        var f = i[1], d = f.charAt(0);
                        '"' !== d && "'" !== d || (f = f.substr(1, f.length - 2), l = f.lastIndexOf(d), 
                        l > 0 && (f = f.substr(0, l))), l = i[0].indexOf("?");
                        var m = l > 0 ? i[0].substr(l + 1) : i[0];
                        new e(1, m, s[f], u);
                    } else u.childs.length > 0 && 0 === u.childs[u.childs.length - 1].type ? u.childs[u.childs.length - 1].text += "\n" + c : new e(0, null, c, u);
                }
                return o;
            }
            this._VSTXT = i, this._PSTXT = r, this._VS = h(i), this._PS = h(r), this._nameMap = a;
        }
        var e;
        a(t, "laya.webgl.utils.ShaderCompile");
        var i = t.prototype;
        return i.createShader = function(t, e, i) {
            var r = {}, a = "";
            if (t) for (var s in t) a += "#define " + s + "\n", r[s] = !0;
            var n = this._VS.toscript(r, []), h = this._PS.toscript(r, []);
            return (i || Ht.create)(a + n.join("\n"), a + h.join("\n"), e, this._nameMap);
        }, t.IFDEF_NO = 0, t.IFDEF_YES = 1, t.IFDEF_ELSE = 2, t.__init$ = function() {
            e = function() {
                function t(t, e, i, r) {
                    if (this.childs = new Array(), this.type = t, this.text = i, this.parent = r, r && r.childs.push(this), 
                    e) {
                        for (var a = "", s = !1, n = !1, h = 0, l = e.length; l > h; h++) {
                            var o = e.charAt(h);
                            n = "!&|() \t".indexOf(o) < 0, s != n && (n && (a += "this."), s = n), a += o;
                        }
                        this.condition = w.createShaderCondition(a);
                    }
                }
                a(t, "");
                var e = t.prototype;
                return e.toscript = function(t, e) {
                    if (0 === this.type && this.text && e.push(this.text), this.childs.length < 1 && !this.text) return e;
                    if (0 !== this.type) {
                        var i = !!this.condition.call(t);
                        if (2 === this.type && (i = !i), !i) return e;
                        this.text && e.push(this.text);
                    }
                    return this.childs.length > 0 && this.childs.forEach(function(i, r, a) {
                        i.toscript(t, e);
                    }), e;
                }, t;
            }();
        }, t;
    }(), ft = function() {
        function t() {}
        return a(t, "laya.webgl.WebGL"), t._uint8ArraySlice = function() {
            for (var t = this, e = t.length, i = new Uint8Array(t.length), r = 0; e > r; r++) i[r] = t[r];
            return i;
        }, t._float32ArraySlice = function() {
            for (var t = this, e = t.length, i = new Float32Array(t.length), r = 0; e > r; r++) i[r] = t[r];
            return i;
        }, t._uint16ArraySlice = function(t) {
            var e, i = arguments, r = this, a = 0, s = 0;
            if (0 === i.length) for (a = r.length, e = new Uint16Array(a), s = 0; a > s; s++) e[s] = r[s]; else if (2 === i.length) {
                var n = i[0], h = i[1];
                if (h > n) for (a = h - n, e = new Uint16Array(a), s = n; h > s; s++) e[s - n] = r[s]; else e = new Uint16Array(0);
            }
            return e;
        }, t.expandContext = function() {
            var t = f.prototype, e = CanvasRenderingContext2D.prototype;
            e.fillTrangles = t.fillTrangles, kt.__int__(null), e.setIBVB = function(t, e, i, r, a, s, n, h, l, o) {
                void 0 === l && (l = 0), void 0 === o && (o = 0), null === i && (this._ib = this._ib || Wt.QuadrangleIB, 
                i = this._ib, ut.expandIBQuadrangle(i, r.byteLength / 64 + 8)), this._setIBVB(t, e, i, r, a, s, n, h, l, o);
            }, e.fillTrangles = function(t, e, i, r, a) {
                this._curMat = this._curMat || T.create(), this._vb = this._vb || Xt.create(), this._ib || (this._ib = Wt.create(), 
                ut.fillIBQuadrangle(this._ib, n / 4));
                var s = this._vb, n = r.length >> 4;
                ut.fillTranglesVB(s, e, i, r, a || this._curMat, 0, 0), ut.expandIBQuadrangle(this._ib, s.byteLength / 64 + 8);
                var h = new gt(1, 0);
                h.textureHost = t;
                var l = new zt("attribute vec2 position; attribute vec2 texcoord; uniform vec2 size; uniform mat4 mmat; varying vec2 v_texcoord; void main() { vec4 p=vec4(position.xy,0.0,1.0);vec4 pos=mmat*p; gl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0); v_texcoord = texcoord; }", "precision mediump float; varying vec2 v_texcoord; uniform sampler2D texture; void main() {vec4 color= texture2D(texture, v_texcoord); color.a*=1.0; gl_FragColor= color;}");
                s._vertType = 3, this._setIBVB(e, i, this._ib, s, 6 * n, a, l, h, 0, 0);
            };
        }, t.enable = function() {
            if (u.__init__(), y.isConchApp && !y.isConchWebGL) return w.skinAniSprite = function() {
                var t = new q();
                return t;
            }, t.expandContext(), !1;
            if (w.getWebGLContext = function(e) {
                for (var i, r = [ "webgl", "experimental-webgl", "webkit-3d", "moz-webgl" ], a = 0; a < r.length; a++) {
                    try {
                        i = e.getContext(r[a], {
                            stencil: c.isStencil,
                            alpha: c.isAlpha,
                            antialias: c.isAntialias,
                            premultipliedAlpha: c.premultipliedAlpha,
                            preserveDrawingBuffer: !0
                        });
                    } catch (s) {}
                    if (i) return 0 !== a && (t._isExperimentalWebgl = !0), i;
                }
                return null;
            }, t.mainContext = w.getWebGLContext(y._mainCanvas), null == t.mainContext) return !1;
            if (y.isWebGL) return !0;
            g.create = function(t, e) {
                return new Yt(t, e);
            }, v.create = function(t, e, i, r, a, s, n) {
                return new Ut(t, e, i, r, a, s, n);
            }, y.WebGL = t, y.isWebGL = !0, ht.__init__(), w.createRenderSprite = function(t, e) {
                return new vt(t, e);
            }, w.createWebGLContext2D = function(t) {
                return new pt(t);
            }, w.changeWebGLSize = function(t, e) {
                laya.webgl.WebGL.onStageResize(t, e);
            }, w.createGraphics = function() {
                return new mt();
            };
            var e = w.createFilterAction;
            return w.createFilterAction = e ? e : function(t) {
                return new Tt();
            }, w.clear = function(t) {
                _t.worldScissorTest && laya.webgl.WebGL.mainContext.disable(3089);
                var e = y.context.ctx, r = 0 == e._submits._length || c.preserveDrawingBuffer ? _.create(t)._color : i.stage._wgColor;
                r && e.clearBG(r[0], r[1], r[2], r[3]), _t.clear();
            }, w.addToAtlas = function(t, e) {
                void 0 === e && (e = !1);
                var r = t.bitmap;
                return y.optimizeTextureMemory(t.url, t) ? void (i.__typeof(r, "laya.webgl.resource.IMergeAtlasBitmap") && r.allowMerageInAtlas && r.on("recovered", t, t.addTextureToAtlas)) : void (r.enableMerageInAtlas = !1);
            }, O._enable(), w.beginFlush = function() {
                for (var t = O.instance, e = t.getAtlaserCount(), i = 0; e > i; i++) {
                    var r = t.getAtlaserByIndex(i).texture;
                    r._flashCacheImageNeedFlush && w.flashFlushImage(r);
                }
            }, w.drawToCanvas = function(t, e, i, r, a, s) {
                a -= t.x, s -= t.y;
                var n = new It(i, r, 6408, 5121, 0, !1);
                n.start(), y.context.clear(), t.render(y.context, a, _t.height - r + s), y.context.flush(), 
                n.end();
                var h = n.getData(0, 0, n.width, n.height);
                n.dispose();
                var l = new Nt();
                l._canvas = u.createElement("canvas"), l.size(i, r);
                var o = l._canvas.getContext("2d");
                u.canvas.size(i, r);
                var _ = u.context, c = _.createImageData(i, r);
                return c.data.set(new Uint8ClampedArray(h.buffer)), _.putImageData(c, 0, 0), o.save(), 
                o.translate(0, r), o.scale(1, -1), o.drawImage(u.canvas.source, 0, 0), o.restore(), 
                l;
            }, w.createFilterAction = function(t) {
                var e;
                switch (t) {
                  case 32:
                    e = new Tt();
                }
                return e;
            }, w.addTextureToAtlas = function(t) {
                t._uvID++, O._atlasRestore++, t.bitmap.enableMerageInAtlas && O.instance.addToAtlas(t);
            }, w.getTexturePixels = function(t, e, i, r, a) {
                y.context.ctx.clear();
                var s = new R();
                s.graphics.drawTexture(t, -e, -i);
                var n = It.create(r, a);
                n.start(), n.clear(0, 0, 0, 0), s.render(y.context, 0, 0), y.context.ctx.flush(), 
                n.end();
                for (var h = n.getData(0, 0, r, a), l = [], o = 0, u = a - 1; u >= 0; u--) for (var _ = 0; r > _; _++) o = 4 * (u * r + _), 
                l.push(h[o]), l.push(h[o + 1]), l.push(h[o + 2]), l.push(h[o + 3]);
                return l;
            }, w.skinAniSprite = function() {
                var t = new q();
                return t;
            }, d._filterStart = function(t, e, i, r, a) {
                var s = t.getValue("bounds"), n = It.create(s.width, s.height);
                if (n.start(), n.clear(0, 0, 0, 0), t.addValue("src", n), t.addValue("ScissorTest", _t.worldScissorTest), 
                _t.worldScissorTest) {
                    var h = new x();
                    h.copyFrom(i.ctx._clipRect), t.addValue("clipRect", h), _t.worldScissorTest = !1, 
                    laya.webgl.WebGL.mainContext.disable(3089);
                }
            }, d._filterEnd = function(t, e, i, r, a) {
                var s = t.getValue("bounds"), n = t.getValue("src");
                n.end();
                var h = It.create(s.width, s.height);
                h.start(), h.clear(0, 0, 0, 0), t.addValue("out", h), e._set$P("_filterCache", h), 
                e._set$P("_isHaveGlowFilter", t.getValue("_isHaveGlowFilter"));
            }, d._EndTarget = function(t, e) {
                var i = t.getValue("src");
                i.recycle();
                var r = t.getValue("out");
                r.end();
                var a = t.getValue("ScissorTest");
                if (a) {
                    _t.worldScissorTest = !0, laya.webgl.WebGL.mainContext.enable(3089), e.ctx.save();
                    var s = t.getValue("clipRect");
                    e.ctx.clipRect(s.x, s.y, s.width, s.height);
                }
            }, d._useSrc = function(t) {
                var e = t.getValue("out");
                e.end(), e = t.getValue("src"), e.start(), e.clear(0, 0, 0, 0);
            }, d._endSrc = function(t) {
                var e = t.getValue("src");
                e.end();
            }, d._useOut = function(t) {
                var e = t.getValue("src");
                e.end(), e = t.getValue("out"), e.start(), e.clear(0, 0, 0, 0);
            }, d._endOut = function(t) {
                var e = t.getValue("out");
                e.end();
            }, d._recycleScope = function(t) {
                t.recycle();
            }, d._filter = function(t, e, i, r) {
                var a = this._next;
                if (a) {
                    var s = t.filters, n = s.length;
                    if (1 == n && 32 == s[0].type) return e.ctx.save(), e.ctx.setFilters([ s[0] ]), 
                    a._fun.call(a, t, e, i, r), void e.ctx.restore();
                    var h, l, o = et.create(), u = b.TEMP, _ = e.ctx._getTransformMatrix(), c = T.create();
                    _.copyTo(c);
                    var f = 0, m = 0, p = !1, g = t._$P._filterCache ? t._$P._filterCache : null;
                    if (!g || t._repaint) {
                        p = t._isHaveGlowFilter(), o.addValue("_isHaveGlowFilter", p), p && (f = 50, m = 25), 
                        l = new x(), l.copyFrom(t.getSelfBounds()), l.x += t.x, l.y += t.y, l.x -= t.pivotX + 4, 
                        l.y -= t.pivotY + 4;
                        var v = l.x, y = l.y;
                        if (l.width += f + 8, l.height += f + 8, u.x = l.x * c.a + l.y * c.c, u.y = l.y * c.d + l.x * c.b, 
                        l.x = u.x, l.y = u.y, u.x = l.width * c.a + l.height * c.c, u.y = l.height * c.d + l.width * c.b, 
                        l.width = u.x, l.height = u.y, l.width <= 0 || l.height <= 0) return;
                        g && g.recycle(), o.addValue("bounds", l);
                        var A = tt.create([ o, t, e, 0, 0 ], d._filterStart);
                        e.addRenderObject(A), e.ctx._renderKey = 0, e.ctx._shader2D.glTexture = null;
                        var E = t.x - v + m, S = t.y - y + m;
                        a._fun.call(a, t, e, E, S), A = tt.create([ o, t, e, 0, 0 ], d._filterEnd), e.addRenderObject(A);
                        for (var w = 0; n > w; w++) {
                            0 != w && (A = tt.create([ o ], d._useSrc), e.addRenderObject(A), h = gt.create(1, 0), 
                            T.TEMP.identity(), e.ctx.drawTarget(o, 0, 0, l.width, l.height, T.TEMP, "out", h, null, U.TOINT.overlay), 
                            A = tt.create([ o ], d._useOut), e.addRenderObject(A));
                            var R = s[w];
                            R.action.apply3d(o, t, e, 0, 0);
                        }
                        A = tt.create([ o, e ], d._EndTarget), e.addRenderObject(A);
                    } else {
                        if (p = t._$P._isHaveGlowFilter ? t._$P._isHaveGlowFilter : !1, p && (f = 50, m = 25), 
                        l = t.getBounds(), l.width <= 0 || l.height <= 0) return;
                        l.width += f, l.height += f, u.x = l.x * c.a + l.y * c.c, u.y = l.y * c.d + l.x * c.b, 
                        l.x = u.x, l.y = u.y, u.x = l.width * c.a + l.height * c.c, u.y = l.height * c.d + l.width * c.b, 
                        l.width = u.x, l.height = u.y, o.addValue("out", g);
                    }
                    i = i - m - t.x, r = r - m - t.y, u.setTo(i, r), c.transformPoint(u), i = u.x + l.x, 
                    r = u.y + l.y, h = gt.create(1, 0), T.TEMP.identity(), e.ctx.drawTarget(o, i, r, l.width, l.height, T.TEMP, "out", h, null, U.TOINT.overlay), 
                    A = tt.create([ o ], d._recycleScope), e.addRenderObject(A), c.destroy();
                }
            }, Float32Array.prototype.slice || (Float32Array.prototype.slice = t._float32ArraySlice), 
            Uint16Array.prototype.slice || (Uint16Array.prototype.slice = t._uint16ArraySlice), 
            Uint8Array.prototype.slice || (Uint8Array.prototype.slice = t._uint8ArraySlice), 
            !0;
        }, t.onStageResize = function(e, i) {
            null != t.mainContext && (t.mainContext.viewport(0, 0, e, i), _t.width = e, _t.height = i);
        }, t.isExperimentalWebgl = function() {
            return t._isExperimentalWebgl;
        }, t.addRenderFinish = function() {
            (t._isExperimentalWebgl || y.isFlash) && (w.endFinish = function() {
                y.context.ctx.finish();
            });
        }, t.removeRenderFinish = function() {
            t._isExperimentalWebgl && (w.endFinish = function() {});
        }, t.onInvalidGLRes = function() {
            O.instance.freeAll(), S.releaseContentManagers(!0), t.doNodeRepaint(i.stage), t.mainContext.viewport(0, 0, _t.width, _t.height), 
            i.stage.event("devicelost");
        }, t.doNodeRepaint = function(e) {
            0 == e.numChildren && e.repaint();
            for (var i = 0; i < e.numChildren; i++) t.doNodeRepaint(e.getChildAt(i));
        }, t.init = function(e, i, r) {
            t.mainCanvas = e, p._createContext = function(t) {
                return new pt(t);
            }, t._isExperimentalWebgl = t._isExperimentalWebgl && (u.onWeiXin || u.onMQQBrowser), 
            t.frameShaderHighPrecision = !1;
            var a = laya.webgl.WebGL.mainContext;
            try {
                var s = a.getShaderPrecisionFormat(35632, 36338);
                s.precision ? t.frameShaderHighPrecision = !0 : t.frameShaderHighPrecision = !1;
            } catch (n) {}
            if (a.deleteTexture1 = a.deleteTexture, a.deleteTexture = function(t) {
                t == dt.curBindTexValue && (dt.curBindTexValue = null), a.deleteTexture1(t);
            }, t.onStageResize(i, r), null == t.mainContext) throw new Error("webGL getContext err!");
            M.__init__(), O.__init__(), xt.__init__(), J.__init__(), pt.__init__(), gt.__init__(), 
            Q.__init__(), kt.__int__(a), U._init_(a), y.isConchApp && conch.setOnInvalidGLRes(t.onInvalidGLRes);
        }, t.mainCanvas = null, t.mainContext = null, t.antialias = !0, t.frameShaderHighPrecision = !1, 
        t._bg_null = [ 0, 0, 0, 0 ], t._isExperimentalWebgl = !1, t;
    }(), dt = function() {
        function t() {}
        return a(t, "laya.webgl.WebGLContext"), t.UseProgram = function(e) {
            return t._useProgram === e ? !1 : (ft.mainContext.useProgram(e), t._useProgram = e, 
            !0);
        }, t.setDepthTest = function(e, i) {
            i !== t._depthTest && (t._depthTest = i, i ? e.enable(2929) : e.disable(2929));
        }, t.setDepthMask = function(e, i) {
            i !== t._depthMask && (t._depthMask = i, e.depthMask(i));
        }, t.setDepthFunc = function(e, i) {
            i !== t._depthFunc && (t._depthFunc = i, e.depthFunc(i));
        }, t.setBlend = function(e, i) {
            i !== t._blend && (t._blend = i, i ? e.enable(3042) : e.disable(3042));
        }, t.setBlendFunc = function(e, i, r) {
            (i !== t._sFactor || r !== t._dFactor) && (t._sFactor = i, t._dFactor = r, e.blendFunc(i, r));
        }, t.setCullFace = function(e, i) {
            i !== t._cullFace && (t._cullFace = i, i ? e.enable(2884) : e.disable(2884));
        }, t.setFrontFace = function(e, i) {
            i !== t._frontFace && (t._frontFace = i, e.frontFace(i));
        }, t.bindTexture = function(e, i, r) {
            e.bindTexture(i, r), t.curBindTexTarget = i, t.curBindTexValue = r;
        }, t.DEPTH_BUFFER_BIT = 256, t.STENCIL_BUFFER_BIT = 1024, t.COLOR_BUFFER_BIT = 16384, 
        t.POINTS = 0, t.LINES = 1, t.LINE_LOOP = 2, t.LINE_STRIP = 3, t.TRIANGLES = 4, t.TRIANGLE_STRIP = 5, 
        t.TRIANGLE_FAN = 6, t.ZERO = 0, t.ONE = 1, t.SRC_COLOR = 768, t.ONE_MINUS_SRC_COLOR = 769, 
        t.SRC_ALPHA = 770, t.ONE_MINUS_SRC_ALPHA = 771, t.DST_ALPHA = 772, t.ONE_MINUS_DST_ALPHA = 773, 
        t.DST_COLOR = 774, t.ONE_MINUS_DST_COLOR = 775, t.SRC_ALPHA_SATURATE = 776, t.FUNC_ADD = 32774, 
        t.BLEND_EQUATION = 32777, t.BLEND_EQUATION_RGB = 32777, t.BLEND_EQUATION_ALPHA = 34877, 
        t.FUNC_SUBTRACT = 32778, t.FUNC_REVERSE_SUBTRACT = 32779, t.BLEND_DST_RGB = 32968, 
        t.BLEND_SRC_RGB = 32969, t.BLEND_DST_ALPHA = 32970, t.BLEND_SRC_ALPHA = 32971, t.CONSTANT_COLOR = 32769, 
        t.ONE_MINUS_CONSTANT_COLOR = 32770, t.CONSTANT_ALPHA = 32771, t.ONE_MINUS_CONSTANT_ALPHA = 32772, 
        t.BLEND_COLOR = 32773, t.ARRAY_BUFFER = 34962, t.ELEMENT_ARRAY_BUFFER = 34963, t.ARRAY_BUFFER_BINDING = 34964, 
        t.ELEMENT_ARRAY_BUFFER_BINDING = 34965, t.STREAM_DRAW = 35040, t.STATIC_DRAW = 35044, 
        t.DYNAMIC_DRAW = 35048, t.BUFFER_SIZE = 34660, t.BUFFER_USAGE = 34661, t.CURRENT_VERTEX_ATTRIB = 34342, 
        t.FRONT = 1028, t.BACK = 1029, t.CULL_FACE = 2884, t.FRONT_AND_BACK = 1032, t.BLEND = 3042, 
        t.DITHER = 3024, t.STENCIL_TEST = 2960, t.DEPTH_TEST = 2929, t.SCISSOR_TEST = 3089, 
        t.POLYGON_OFFSET_FILL = 32823, t.SAMPLE_ALPHA_TO_COVERAGE = 32926, t.SAMPLE_COVERAGE = 32928, 
        t.NO_ERROR = 0, t.INVALID_ENUM = 1280, t.INVALID_VALUE = 1281, t.INVALID_OPERATION = 1282, 
        t.OUT_OF_MEMORY = 1285, t.CW = 2304, t.CCW = 2305, t.LINE_WIDTH = 2849, t.ALIASED_POINT_SIZE_RANGE = 33901, 
        t.ALIASED_LINE_WIDTH_RANGE = 33902, t.CULL_FACE_MODE = 2885, t.FRONT_FACE = 2886, 
        t.DEPTH_RANGE = 2928, t.DEPTH_WRITEMASK = 2930, t.DEPTH_CLEAR_VALUE = 2931, t.DEPTH_FUNC = 2932, 
        t.STENCIL_CLEAR_VALUE = 2961, t.STENCIL_FUNC = 2962, t.STENCIL_FAIL = 2964, t.STENCIL_PASS_DEPTH_FAIL = 2965, 
        t.STENCIL_PASS_DEPTH_PASS = 2966, t.STENCIL_REF = 2967, t.STENCIL_VALUE_MASK = 2963, 
        t.STENCIL_WRITEMASK = 2968, t.STENCIL_BACK_FUNC = 34816, t.STENCIL_BACK_FAIL = 34817, 
        t.STENCIL_BACK_PASS_DEPTH_FAIL = 34818, t.STENCIL_BACK_PASS_DEPTH_PASS = 34819, 
        t.STENCIL_BACK_REF = 36003, t.STENCIL_BACK_VALUE_MASK = 36004, t.STENCIL_BACK_WRITEMASK = 36005, 
        t.VIEWPORT = 2978, t.SCISSOR_BOX = 3088, t.COLOR_CLEAR_VALUE = 3106, t.COLOR_WRITEMASK = 3107, 
        t.UNPACK_ALIGNMENT = 3317, t.PACK_ALIGNMENT = 3333, t.MAX_TEXTURE_SIZE = 3379, t.MAX_VIEWPORT_DIMS = 3386, 
        t.SUBPIXEL_BITS = 3408, t.RED_BITS = 3410, t.GREEN_BITS = 3411, t.BLUE_BITS = 3412, 
        t.ALPHA_BITS = 3413, t.DEPTH_BITS = 3414, t.STENCIL_BITS = 3415, t.POLYGON_OFFSET_UNITS = 10752, 
        t.POLYGON_OFFSET_FACTOR = 32824, t.TEXTURE_BINDING_2D = 32873, t.SAMPLE_BUFFERS = 32936, 
        t.SAMPLES = 32937, t.SAMPLE_COVERAGE_VALUE = 32938, t.SAMPLE_COVERAGE_INVERT = 32939, 
        t.NUM_COMPRESSED_TEXTURE_FORMATS = 34466, t.COMPRESSED_TEXTURE_FORMATS = 34467, 
        t.DONT_CARE = 4352, t.FASTEST = 4353, t.NICEST = 4354, t.GENERATE_MIPMAP_HINT = 33170, 
        t.BYTE = 5120, t.UNSIGNED_BYTE = 5121, t.SHORT = 5122, t.UNSIGNED_SHORT = 5123, 
        t.INT = 5124, t.UNSIGNED_INT = 5125, t.FLOAT = 5126, t.DEPTH_COMPONENT = 6402, t.ALPHA = 6406, 
        t.RGB = 6407, t.RGBA = 6408, t.LUMINANCE = 6409, t.LUMINANCE_ALPHA = 6410, t.UNSIGNED_SHORT_4_4_4_4 = 32819, 
        t.UNSIGNED_SHORT_5_5_5_1 = 32820, t.UNSIGNED_SHORT_5_6_5 = 33635, t.FRAGMENT_SHADER = 35632, 
        t.VERTEX_SHADER = 35633, t.MAX_VERTEX_ATTRIBS = 34921, t.MAX_VERTEX_UNIFORM_VECTORS = 36347, 
        t.MAX_VARYING_VECTORS = 36348, t.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661, t.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660, 
        t.MAX_TEXTURE_IMAGE_UNITS = 34930, t.MAX_FRAGMENT_UNIFORM_VECTORS = 36349, t.SHADER_TYPE = 35663, 
        t.DELETE_STATUS = 35712, t.LINK_STATUS = 35714, t.VALIDATE_STATUS = 35715, t.ATTACHED_SHADERS = 35717, 
        t.ACTIVE_UNIFORMS = 35718, t.ACTIVE_ATTRIBUTES = 35721, t.SHADING_LANGUAGE_VERSION = 35724, 
        t.CURRENT_PROGRAM = 35725, t.NEVER = 512, t.LESS = 513, t.EQUAL = 514, t.LEQUAL = 515, 
        t.GREATER = 516, t.NOTEQUAL = 517, t.GEQUAL = 518, t.ALWAYS = 519, t.KEEP = 7680, 
        t.REPLACE = 7681, t.INCR = 7682, t.DECR = 7683, t.INVERT = 5386, t.INCR_WRAP = 34055, 
        t.DECR_WRAP = 34056, t.VENDOR = 7936, t.RENDERER = 7937, t.VERSION = 7938, t.NEAREST = 9728, 
        t.LINEAR = 9729, t.NEAREST_MIPMAP_NEAREST = 9984, t.LINEAR_MIPMAP_NEAREST = 9985, 
        t.NEAREST_MIPMAP_LINEAR = 9986, t.LINEAR_MIPMAP_LINEAR = 9987, t.TEXTURE_MAG_FILTER = 10240, 
        t.TEXTURE_MIN_FILTER = 10241, t.TEXTURE_WRAP_S = 10242, t.TEXTURE_WRAP_T = 10243, 
        t.TEXTURE_2D = 3553, t.TEXTURE = 5890, t.TEXTURE_CUBE_MAP = 34067, t.TEXTURE_BINDING_CUBE_MAP = 34068, 
        t.TEXTURE_CUBE_MAP_POSITIVE_X = 34069, t.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070, t.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071, 
        t.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072, t.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073, t.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074, 
        t.MAX_CUBE_MAP_TEXTURE_SIZE = 34076, t.TEXTURE0 = 33984, t.TEXTURE1 = 33985, t.TEXTURE2 = 33986, 
        t.TEXTURE3 = 33987, t.TEXTURE4 = 33988, t.TEXTURE5 = 33989, t.TEXTURE6 = 33990, 
        t.TEXTURE7 = 33991, t.TEXTURE8 = 33992, t.TEXTURE9 = 33993, t.TEXTURE10 = 33994, 
        t.TEXTURE11 = 33995, t.TEXTURE12 = 33996, t.TEXTURE13 = 33997, t.TEXTURE14 = 33998, 
        t.TEXTURE15 = 33999, t.TEXTURE16 = 34e3, t.TEXTURE17 = 34001, t.TEXTURE18 = 34002, 
        t.TEXTURE19 = 34003, t.TEXTURE20 = 34004, t.TEXTURE21 = 34005, t.TEXTURE22 = 34006, 
        t.TEXTURE23 = 34007, t.TEXTURE24 = 34008, t.TEXTURE25 = 34009, t.TEXTURE26 = 34010, 
        t.TEXTURE27 = 34011, t.TEXTURE28 = 34012, t.TEXTURE29 = 34013, t.TEXTURE30 = 34014, 
        t.TEXTURE31 = 34015, t.ACTIVE_TEXTURE = 34016, t.REPEAT = 10497, t.CLAMP_TO_EDGE = 33071, 
        t.MIRRORED_REPEAT = 33648, t.FLOAT_VEC2 = 35664, t.FLOAT_VEC3 = 35665, t.FLOAT_VEC4 = 35666, 
        t.INT_VEC2 = 35667, t.INT_VEC3 = 35668, t.INT_VEC4 = 35669, t.BOOL = 35670, t.BOOL_VEC2 = 35671, 
        t.BOOL_VEC3 = 35672, t.BOOL_VEC4 = 35673, t.FLOAT_MAT2 = 35674, t.FLOAT_MAT3 = 35675, 
        t.FLOAT_MAT4 = 35676, t.SAMPLER_2D = 35678, t.SAMPLER_CUBE = 35680, t.VERTEX_ATTRIB_ARRAY_ENABLED = 34338, 
        t.VERTEX_ATTRIB_ARRAY_SIZE = 34339, t.VERTEX_ATTRIB_ARRAY_STRIDE = 34340, t.VERTEX_ATTRIB_ARRAY_TYPE = 34341, 
        t.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922, t.VERTEX_ATTRIB_ARRAY_POINTER = 34373, 
        t.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975, t.COMPILE_STATUS = 35713, t.LOW_FLOAT = 36336, 
        t.MEDIUM_FLOAT = 36337, t.HIGH_FLOAT = 36338, t.LOW_INT = 36339, t.MEDIUM_INT = 36340, 
        t.HIGH_INT = 36341, t.FRAMEBUFFER = 36160, t.RENDERBUFFER = 36161, t.RGBA4 = 32854, 
        t.RGB5_A1 = 32855, t.RGB565 = 36194, t.DEPTH_COMPONENT16 = 33189, t.STENCIL_INDEX = 6401, 
        t.STENCIL_INDEX8 = 36168, t.DEPTH_STENCIL = 34041, t.RENDERBUFFER_WIDTH = 36162, 
        t.RENDERBUFFER_HEIGHT = 36163, t.RENDERBUFFER_INTERNAL_FORMAT = 36164, t.RENDERBUFFER_RED_SIZE = 36176, 
        t.RENDERBUFFER_GREEN_SIZE = 36177, t.RENDERBUFFER_BLUE_SIZE = 36178, t.RENDERBUFFER_ALPHA_SIZE = 36179, 
        t.RENDERBUFFER_DEPTH_SIZE = 36180, t.RENDERBUFFER_STENCIL_SIZE = 36181, t.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048, 
        t.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049, t.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050, 
        t.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051, t.COLOR_ATTACHMENT0 = 36064, 
        t.DEPTH_ATTACHMENT = 36096, t.STENCIL_ATTACHMENT = 36128, t.DEPTH_STENCIL_ATTACHMENT = 33306, 
        t.NONE = 0, t.FRAMEBUFFER_COMPLETE = 36053, t.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054, 
        t.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055, t.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057, 
        t.FRAMEBUFFER_UNSUPPORTED = 36061, t.FRAMEBUFFER_BINDING = 36006, t.RENDERBUFFER_BINDING = 36007, 
        t.MAX_RENDERBUFFER_SIZE = 34024, t.INVALID_FRAMEBUFFER_OPERATION = 1286, t.UNPACK_FLIP_Y_WEBGL = 37440, 
        t.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441, t.CONTEXT_LOST_WEBGL = 37442, t.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443, 
        t.BROWSER_DEFAULT_WEBGL = 37444, t._useProgram = null, t._depthTest = !0, t._depthMask = !0, 
        t._blend = !1, t._cullFace = !1, t.curBindTexTarget = null, t.curBindTexValue = null, 
        r(t, [ "_depthFunc", function() {
            return this._depthFunc = 513;
        }, "_sFactor", function() {
            return this._sFactor = 1;
        }, "_dFactor", function() {
            return this._dFactor = 0;
        }, "_frontFace", function() {
            return this._frontFace = 2305;
        } ]), t;
    }(), mt = function(t) {
        function e() {
            e.__super.call(this);
        }
        a(e, "laya.webgl.display.GraphicsGL", t);
        var i = e.prototype;
        return i.setShader = function(t) {
            this._saveToCmd(y.context._setShader, [ t ]);
        }, i.setIBVB = function(t, e, i, r, a, s) {
            this._saveToCmd(y.context._setIBVB, [ t, e, i, r, a, s ]);
        }, i.drawParticle = function(t, e, i) {
            var r = w.createParticleTemplate2D(i);
            r.x = t, r.y = e, this._saveToCmd(y.context._drawParticle, [ r ]);
        }, e;
    }(m), pt = function(t) {
        function e(t) {
            this._x = 0, this._y = 0, this._id = ++e._COUNT, this._path = null, this._drawCount = 1, 
            this._maxNumEle = 0, this._clear = !1, this._isMain = !1, this._atlasResourceChange = 0, 
            this._submits = [], this._curSubmit = null, this._ib = null, this._vb = null, this._nBlendType = 0, 
            this._saveMark = null, this.mId = -1, this.mHaveKey = !1, this.mHaveLineKey = !1, 
            this.mX = 0, this.mY = 0, e.__super.call(this), this._width = 99999999, this._height = 99999999, 
            this._clipRect = e.MAXCLIPRECT, this._shader2D = new Q(), this.mOutPoint, this._canvas = t, 
            this._curMat = T.create(), y.isFlash ? (this._ib = Wt.create(35044), ut.fillIBQuadrangle(this._ib, 16)) : this._ib = Wt.QuadrangleIB, 
            this._vb = Xt.create(-1), this._other = n.DEFAULT, this._save = [ W.Create(this) ], 
            this._save.length = 10, this.clear();
        }
        var n;
        a(e, "laya.webgl.canvas.WebGLContext2D", t);
        var h = e.prototype;
        return h.setIsMainContext = function() {
            this._isMain = !0;
        }, h.clearBG = function(t, e, i, r) {
            var a = ft.mainContext;
            a.clearColor(t, e, i, r), a.clear(16384);
        }, h._getSubmits = function() {
            return this._submits;
        }, h.destroy = function() {
            this._curMat && this._curMat.destroy(), this._targets && this._targets.destroy(), 
            this._vb && this._vb.releaseResource(), this._ib && this._ib != Wt.QuadrangleIB && this._ib.releaseResource();
        }, h.clear = function() {
            this._vb.clear(), this._targets && (this._targets.repaint = !0), this._other = n.DEFAULT, 
            this._clear = !0, this._repaint = !1, this._drawCount = 1, this._renderKey = 0, 
            this._other.lineWidth = this._shader2D.ALPHA = 1, this._nBlendType = 0, this._clipRect = e.MAXCLIPRECT, 
            this._curSubmit = J.RENDERBASE, this._shader2D.glTexture = null, this._shader2D.fillStyle = this._shader2D.strokeStyle = H.DEFAULT;
            for (var t = 0, i = this._submits._length; i > t; t++) this._submits[t].releaseRender();
            this._submits._length = 0, this._curMat.identity(), this._other.clear(), this._saveMark = this._save[0], 
            this._save._length = 1;
        }, h.size = function(t, e) {
            this._width = t, this._height = e, this._targets && this._targets.size(t, e), this._canvas.memorySize -= this._canvas.memorySize;
        }, h._getTransformMatrix = function() {
            return this._curMat;
        }, h.translate = function(t, e) {
            0 === t && 0 === e || (Y.save(this), this._curMat.bTransform && (X.save(this), this._curMat.transformPointN(b.TEMP.setTo(t, e)), 
            t = b.TEMP.x, e = b.TEMP.y), this._x += t, this._y += e);
        }, h.save = function() {
            this._save[this._save._length++] = W.Create(this);
        }, h.restore = function() {
            var t = this._save._length;
            if (!(1 > t)) for (var e = t - 1; e >= 0; e--) {
                var i = this._save[e];
                if (i.restore(this), i.isSaveMark()) return void (this._save._length = e);
            }
        }, h._fillText = function(t, e, i, r, a, s, n, h, l) {
            var o = this._shader2D, u = this._curSubmit.shaderValue, c = a ? lt.create(a) : this._other.font;
            if (O.enabled) o.ALPHA !== u.ALPHA && (o.glTexture = null), ht.drawText(this, t, e, this._curMat, c, l || this._other.textAlign, s, n, h, i, r); else {
                var f = (this._shader2D.defines.getValue(), s ? _.create(s)._color : o.colorAdd);
                o.ALPHA === u.ALPHA && f === o.colorAdd && u.colorAdd === o.colorAdd || (o.glTexture = null, 
                o.colorAdd = f), ht.drawText(this, t, e, this._curMat, c, l || this._other.textAlign, s, n, h, i, r);
            }
        }, h.fillWords = function(t, e, i, r, a) {
            this._fillText(null, t, e, i, r, a, null, -1, null);
        }, h.fillText = function(t, e, i, r, a, s) {
            this._fillText(t, null, e, i, r, a, null, -1, s);
        }, h.strokeText = function(t, e, i, r, a, s, n) {
            this._fillText(t, null, e, i, r, null, a, s || 1, n);
        }, h.fillBorderText = function(t, e, i, r, a, s, n, h) {
            this._fillBorderText(t, null, e, i, r, a, s, n, h);
        }, h._fillBorderText = function(t, i, r, a, s, n, h, l, o) {
            if (!O.enabled) return this._fillText(t, i, r, a, s, null, h, l || 1, o), void this._fillText(t, i, r, a, s, n, null, -1, o);
            var u = this._shader2D, _ = this._curSubmit.shaderValue;
            u.ALPHA !== _.ALPHA && (u.glTexture = null);
            var c = s ? (e._fontTemp.setFont(s), e._fontTemp) : this._other.font;
            ht.drawText(this, t, i, this._curMat, c, o || this._other.textAlign, n, h, l || 1, r, a);
        }, h.fillBorderWords = function(t, e, i, r, a, s, n) {
            this._fillBorderText(null, t, e, i, r, a, s, n, null);
        }, h.fillRect = function(t, e, i, r, a) {
            var s = this._vb;
            if (ut.fillRectImgVb(s, this._clipRect, t, e, i, r, L.DEF_UV, this._curMat, this._x, this._y, 0, 0)) {
                this._renderKey = 0;
                var n = this._shader2D.fillStyle;
                a && (this._shader2D.fillStyle = H.create(a));
                var h = this._shader2D, l = this._curSubmit.shaderValue;
                if (h.fillStyle !== l.fillStyle || h.ALPHA !== l.ALPHA) {
                    h.glTexture = null;
                    var o = this._curSubmit = J.create(this, this._ib, s, (s._byteLength - 64) / 32 * 3, gt.create(2, 0));
                    o.shaderValue.color = h.fillStyle._color._color, o.shaderValue.ALPHA = h.ALPHA, 
                    this._submits[this._submits._length++] = o;
                }
                this._curSubmit._numEle += 6, this._shader2D.fillStyle = n;
            }
        }, h.fillTexture = function(t, e, r, a, s, n, h, l) {
            if (!(t.loaded && t.bitmap && t.source)) return void (this.sprite && i.timer.callLater(this, this._repaintSprite));
            var o = this._vb, u = t.bitmap.width, _ = t.bitmap.height, c = t.uv, f = h.x % t.width, d = h.y % t.height;
            if (u != l.w || _ != l.h) {
                if (!l.w && !l.h) switch (l.oy = l.ox = 0, n) {
                  case "repeat":
                    l.width = a, l.height = s;
                    break;

                  case "repeat-x":
                    l.width = a, 0 > d ? t.height + d > s ? l.height = s : l.height = t.height + d : (l.oy = d, 
                    t.height + d > s ? l.height = s - d : l.height = t.height);
                    break;

                  case "repeat-y":
                    0 > f ? t.width + f > a ? l.width = a : l.width = t.width + f : (l.ox = f, t.width + f > a ? l.width = a - f : l.width = t.width), 
                    l.height = s;
                    break;

                  default:
                    l.width = a, l.height = s;
                }
                l.w = u, l.h = _, l.uv = [ 0, 0, l.width / u, 0, l.width / u, l.height / _, 0, l.height / _ ];
            }
            if (e += l.ox, r += l.oy, f -= l.ox, d -= l.oy, ut.fillRectImgVb(o, this._clipRect, e, r, l.width, l.height, l.uv, this._curMat, this._x, this._y, 0, 0)) {
                this._renderKey = 0;
                var m = wt.create(this, this._ib, o, (o._byteLength - 64) / 32 * 3, gt.create(256, 0));
                this._submits[this._submits._length++] = m;
                var p = m.shaderValue;
                p.textureHost = t;
                var g = c[0] * u, v = c[1] * _, T = (c[2] - c[0]) * u, b = (c[5] - c[3]) * _, x = -f / u, y = -d / _;
                p.u_TexRange[0] = g / u, p.u_TexRange[1] = T / u, p.u_TexRange[2] = v / _, p.u_TexRange[3] = b / _, 
                p.u_offset[0] = x, p.u_offset[1] = y, O.enabled && !this._isMain && m.addTexture(t, (o._byteLength >> 2) - 16), 
                this._curSubmit = m, m._renderType = 10017, m._numEle += 6;
            }
        }, h.setShader = function(t) {
            G.save(this, 524288, this._shader2D, !0), this._shader2D.shader = t;
        }, h.setFilters = function(t) {
            G.save(this, 1048576, this._shader2D, !0), this._shader2D.filters = t, this._curSubmit = J.RENDERBASE, 
            this._renderKey = 0, this._drawCount++;
        }, h.drawTexture = function(t, e, i, r, a, s, n) {
            this._drawTextureM(t, e, i, r, a, s, n, null, 1);
        }, h.addTextureVb = function(t, e, i) {
            var r = this._curSubmit._vb || this._vb, a = r._byteLength >> 2;
            r.byteLength = a + 16 << 2;
            for (var s = r.getFloat32Array(), n = 0; 16 > n; n += 4) s[a++] = t[n] + e, s[a++] = t[n + 1] + i, 
            s[a++] = t[n + 2], s[a++] = t[n + 3];
            this._curSubmit._numEle += 6, this._maxNumEle = Math.max(this._maxNumEle, this._curSubmit._numEle), 
            r._upload = !0;
        }, h.willDrawTexture = function(t, e) {
            if (!(t.loaded && t.bitmap && t.source)) return this.sprite && i.timer.callLater(this, this._repaintSprite), 
            0;
            var r = t.bitmap, a = r.id + this._shader2D.ALPHA * e + 10016;
            if (a == this._renderKey) return a;
            var s = this._shader2D, n = s.ALPHA, h = this._curSubmit.shaderValue;
            s.ALPHA *= e, this._renderKey = a, this._drawCount++, s.glTexture = r;
            var l = this._vb, o = null, u = l._byteLength / 32 * 3;
            return o = wt.create(this, this._ib, l, u, gt.create(1, 0)), this._submits[this._submits._length++] = o, 
            o.shaderValue.textureHost = t, o._renderType = 10016, o._preIsSameTextureShader = 10016 === this._curSubmit._renderType && s.ALPHA === h.ALPHA, 
            this._curSubmit = o, s.ALPHA = n, a;
        }, h.drawTextures = function(t, r, a, s) {
            if (!(t.loaded && t.bitmap && t.source)) return void (this.sprite && i.timer.callLater(this, this._repaintSprite));
            var n = this._clipRect;
            if (this._clipRect = e.MAXCLIPRECT, !this._drawTextureM(t, r[0], r[1], t.width, t.height, a, s, null, 1)) return void alert("drawTextures err");
            if (this._clipRect = n, I.drawCall += r.length / 2, !(r.length < 4)) {
                for (var h = this._curSubmit._vb || this._vb, l = this._curMat.a, o = this._curMat.d, u = 2, _ = r.length; _ > u; u += 2) ut.copyPreImgVb(h, (r[u] - r[u - 2]) * l, (r[u + 1] - r[u - 1]) * o), 
                this._curSubmit._numEle += 6;
                this._maxNumEle = Math.max(this._maxNumEle, this._curSubmit._numEle);
            }
        }, h._drawTextureM = function(t, e, r, a, s, n, h, l, o) {
            if (!(t.loaded && t.bitmap && t.source)) return this.sprite && i.timer.callLater(this, this._repaintSprite), 
            !1;
            var u = this._curSubmit._vb || this._vb, _ = t.bitmap;
            e += n, r += h, this._drawCount++;
            var c = _.id + this._shader2D.ALPHA * o + 10016;
            if (c != this._renderKey) {
                this._renderKey = c;
                var f = this._curSubmit.shaderValue, d = this._shader2D, m = d.ALPHA;
                d.ALPHA *= o, d.glTexture = _;
                var p = this._vb, g = null, v = p._byteLength / 32 * 3;
                g = wt.create(this, this._ib, p, v, gt.create(1, 0)), this._submits[this._submits._length++] = g, 
                g.shaderValue.textureHost = t, g._renderType = 10016, g._preIsSameTextureShader = 10016 === this._curSubmit._renderType && d.ALPHA === f.ALPHA, 
                this._curSubmit = g, u = this._curSubmit._vb || this._vb, d.ALPHA = m;
            }
            return ut.fillRectImgVb(u, this._clipRect, e, r, a || t.width, s || t.height, t.uv, l || this._curMat, this._x, this._y, 0, 0) ? (O.enabled && !this._isMain && this._curSubmit.addTexture(t, (u._byteLength >> 2) - 16), 
            this._curSubmit._numEle += 6, this._maxNumEle = Math.max(this._maxNumEle, this._curSubmit._numEle), 
            !0) : !1;
        }, h._repaintSprite = function() {
            this.sprite.repaint();
        }, h._drawText = function(t, e, i, r, a, s, n, h, l, o) {
            var u = t.bitmap;
            this._drawCount++;
            var _ = u.id + this._shader2D.ALPHA + 10016;
            if (_ != this._renderKey) {
                this._renderKey = _;
                var c = this._curSubmit.shaderValue, f = this._shader2D;
                f.glTexture = u;
                var d = this._vb, m = null, p = d._byteLength / 32 * 3;
                m = O.enabled ? wt.create(this, this._ib, d, p, gt.create(1, 0)) : wt.create(this, this._ib, d, p, Gt.create()), 
                m._preIsSameTextureShader = 10016 === this._curSubmit._renderType && f.ALPHA === c.ALPHA, 
                this._submits[this._submits._length++] = m, m.shaderValue.textureHost = t, m._renderType = 10016, 
                this._curSubmit = m;
            }
            t.active();
            var g = this._curSubmit._vb || this._vb;
            ut.fillRectImgVb(g, this._clipRect, e + n, i + h, r || t.width, a || t.height, t.uv, s || this._curMat, this._x, this._y, l, o, !0) && (O.enabled && !this._isMain && this._curSubmit.addTexture(t, (g._byteLength >> 2) - 16), 
            this._curSubmit._numEle += 6, this._maxNumEle = Math.max(this._maxNumEle, this._curSubmit._numEle));
        }, h.drawTextureWithTransform = function(t, i, r, a, s, n, h, l, o) {
            if (!n) return void this._drawTextureM(t, i, r, a, s, h, l, null, o);
            var u = this._curMat, _ = this._x, c = this._y;
            (0 !== h || 0 !== l) && (this._x = h * u.a + l * u.c, this._y = l * u.d + h * u.b), 
            n && u.bTransform ? (T.mul(n, u, e._tmpMatrix), n = e._tmpMatrix, n._checkTransform()) : (this._x += u.tx, 
            this._y += u.ty), this._drawTextureM(t, i, r, a, s, 0, 0, n, o), this._x = _, this._y = c;
        }, h.fillQuadrangle = function(t, e, i, r, a) {
            var s = this._curSubmit, n = this._vb, h = this._shader2D, l = s.shaderValue;
            if (this._renderKey = 0, t.bitmap) {
                var o = t.bitmap;
                h.glTexture == o && h.ALPHA === l.ALPHA || (h.glTexture = o, s = this._curSubmit = J.create(this, this._ib, n, n._byteLength / 32 * 3, gt.create(1, 0)), 
                s.shaderValue.glTexture = o, this._submits[this._submits._length++] = s), ut.fillQuadrangleImgVb(n, e, i, r, t.uv, a || this._curMat, this._x, this._y);
            } else s.shaderValue.fillStyle && s.shaderValue.fillStyle.equal(t) && h.ALPHA === l.ALPHA || (h.glTexture = null, 
            s = this._curSubmit = J.create(this, this._ib, n, n._byteLength / 32 * 3, gt.create(2, 0)), 
            s.shaderValue.defines.add(2), s.shaderValue.fillStyle = H.create(t), this._submits[this._submits._length++] = s), 
            ut.fillQuadrangleImgVb(n, e, i, r, L.DEF_UV, a || this._curMat, this._x, this._y);
            s._numEle += 6;
        }, h.drawTexture2 = function(t, i, r, a, s, n, h, l) {
            if (0 != n) {
                var o = this._curMat;
                if (this._x = t * o.a + i * o.c, this._y = i * o.d + t * o.b, s && (o.bTransform || s.bTransform ? (T.mul(s, o, e._tmpMatrix), 
                s = e._tmpMatrix) : (this._x += s.tx + o.tx, this._y += s.ty + o.ty, s = T.EMPTY)), 
                1 !== n || h) {
                    var u = this._shader2D.ALPHA, _ = this._nBlendType;
                    this._shader2D.ALPHA = n, h && (this._nBlendType = U.TOINT(h)), this._drawTextureM(l[0], l[1] - r, l[2] - a, l[3], l[4], 0, 0, s, 1), 
                    this._shader2D.ALPHA = u, this._nBlendType = _;
                } else this._drawTextureM(l[0], l[1] - r, l[2] - a, l[3], l[4], 0, 0, s, 1);
                this._x = this._y = 0;
            }
        }, h.drawCanvas = function(t, e, i, r, a) {
            var s = t.context;
            if (this._renderKey = 0, s._targets) this._submits[this._submits._length++] = St.create(s, 0, null), 
            this._curSubmit = J.RENDERBASE, s._targets.drawTo(this, e, i, r, a); else {
                var n = this._submits[this._submits._length++] = St.create(s, this._shader2D.ALPHA, this._shader2D.filters), h = r / t.width, l = a / t.height, o = n._matrix;
                this._curMat.copyTo(o), 1 != h && 1 != l && o.scale(h, l);
                var u = o.tx, _ = o.ty;
                o.tx = o.ty = 0, o.transformPoint(b.TEMP.setTo(e, i)), o.translate(b.TEMP.x + u, b.TEMP.y + _), 
                this._curSubmit = J.RENDERBASE;
            }
            c.showCanvasMark && (this.save(), this.lineWidth = 4, this.strokeStyle = s._targets ? "yellow" : "green", 
            this.strokeRect(e - 1, i - 1, r + 2, a + 2, 1), this.strokeRect(e, i, r, a, 1), 
            this.restore());
        }, h.drawTarget = function(t, e, i, r, a, s, n, h, l, o) {
            void 0 === o && (o = -1);
            var u = this._vb;
            if (ut.fillRectImgVb(u, this._clipRect, e, i, r, a, l || L.DEF_UV, s || this._curMat, this._x, this._y, 0, 0)) {
                this._renderKey = 0;
                var _ = this._shader2D;
                _.glTexture = null;
                var c = (this._curSubmit.shaderValue, this._curSubmit = st.create(this, this._ib, u, (u._byteLength - 64) / 32 * 3, h, n));
                -1 == o ? c.blendType = this._nBlendType : c.blendType = o, c.scope = t, this._submits[this._submits._length++] = c, 
                this._curSubmit._numEle += 6;
            }
        }, h.transform = function(t, e, i, r, a, s) {
            X.save(this), T.mul(T.TEMP.setTo(t, e, i, r, a, s), this._curMat, this._curMat), 
            this._curMat._checkTransform();
        }, h.setTransformByMatrix = function(t) {
            t.copyTo(this._curMat);
        }, h.transformByMatrix = function(t) {
            X.save(this), T.mul(t, this._curMat, this._curMat), this._curMat._checkTransform();
        }, h.rotate = function(t) {
            X.save(this), this._curMat.rotateEx(t);
        }, h.scale = function(t, e) {
            X.save(this), this._curMat.scaleEx(t, e);
        }, h.clipRect = function(t, e, i, r) {
            i *= this._curMat.a, r *= this._curMat.d;
            var a = b.TEMP;
            this._curMat.transformPoint(a.setTo(t, e)), this._renderKey = 0;
            var s = this._curSubmit = rt.create(this);
            this._submits[this._submits._length++] = s, s.submitIndex = this._submits._length, 
            s.submitLength = 9999999, z.save(this, s);
            var n = this._clipRect, h = n.x, l = n.y, o = a.x + i, u = a.y + r;
            h < a.x && (n.x = a.x), l < a.y && (n.y = a.y), n.width = Math.min(o, h + n.width) - n.x, 
            n.height = Math.min(u, l + n.height) - n.y, this._shader2D.glTexture = null, s.clipRect.copyFrom(n), 
            this._curSubmit = J.RENDERBASE;
        }, h.setIBVB = function(t, e, i, r, a, s, n, h, l, o, u) {
            if (void 0 === l && (l = 0), void 0 === o && (o = 0), void 0 === u && (u = 0), null === i) {
                if (y.isFlash) {
                    var _ = r;
                    _._selfIB || (_._selfIB = Wt.create(35044)), _._selfIB.clear(), i = _._selfIB;
                } else i = this._ib;
                ut.expandIBQuadrangle(i, r.byteLength / (4 * r.vertexStride * 4));
            }
            if (!h || !n) throw Error("setIBVB must input:shader shaderValues");
            var c = it.create(this, r, i, a, n, h, l, o, u);
            s || (s = T.EMPTY), s.translate(t, e), T.mul(s, this._curMat, c._mat), s.translate(-t, -e), 
            this._submits[this._submits._length++] = c, this._curSubmit = J.RENDERBASE, this._renderKey = 0;
        }, h.addRenderObject = function(t) {
            this._submits[this._submits._length++] = t;
        }, h.fillTrangles = function(t, e, i, r, a) {
            var s = this._curSubmit, n = this._vb, h = this._shader2D, l = s.shaderValue, o = r.length >> 4, u = t.bitmap;
            this._renderKey = 0, h.glTexture == u && h.ALPHA === l.ALPHA || (s = this._curSubmit = J.create(this, this._ib, n, n._byteLength / 32 * 3, gt.create(1, 0)), 
            s.shaderValue.textureHost = t, this._submits[this._submits._length++] = s), ut.fillTranglesVB(n, e, i, r, a || this._curMat, this._x, this._y), 
            s._numEle += 6 * o;
        }, h.submitElement = function(t, e) {
            var i = this._submits;
            for (0 > e && (e = i._length); e > t; ) t += i[t].renderSubmit();
        }, h.finish = function() {
            ft.mainContext.finish();
        }, h.flush = function() {
            var t = Math.max(this._vb.byteLength / 64, this._maxNumEle / 6) + 8;
            if (t > this._ib.bufferLength / 12 && ut.expandIBQuadrangle(this._ib, t), !this._isMain && O.enabled && O._atlasRestore > this._atlasResourceChange) {
                this._atlasResourceChange = O._atlasRestore;
                for (var e = this._submits, i = 0, r = e._length; r > i; i++) {
                    var a = e[i];
                    10016 === a.getRenderType() && a.checkTexture();
                }
            }
            return this.submitElement(0, this._submits._length), this._path && this._path.reset(), 
            Z.instance && Z.getInstance().reset(), this._curSubmit = J.RENDERBASE, this._renderKey = 0, 
            this._submits._length;
        }, h.setPathId = function(t) {
            if (this.mId = t, -1 != this.mId) {
                this.mHaveKey = !1;
                var e = F.getInstance();
                e.shapeDic[this.mId] && (this.mHaveKey = !0), this.mHaveLineKey = !1, e.shapeLineDic[this.mId] && (this.mHaveLineKey = !0);
            }
        }, h.movePath = function(t, e) {
            var i = t, r = e;
            t = this._curMat.a * i + this._curMat.c * r + this._curMat.tx, e = this._curMat.b * i + this._curMat.d * r + this._curMat.ty, 
            this.mX += t, this.mY += e;
        }, h.beginPath = function() {
            var t = this._getPath();
            t.tempArray.length = 0, t.closePath = !1, this.mX = 0, this.mY = 0;
        }, h.closePath = function() {
            this._path.closePath = !0;
        }, h.fill = function(t) {
            void 0 === t && (t = !1);
            var e = this._getPath();
            this.drawPoly(0, 0, e.tempArray, this.fillStyle._color.numColor, 0, 0, t);
        }, h.stroke = function() {
            var t = this._getPath();
            if (this.lineWidth > 0) {
                if (-1 == this.mId) t.drawLine(0, 0, t.tempArray, this.lineWidth, this.strokeStyle._color.numColor); else if (this.mHaveLineKey) {
                    var e = F.getInstance().shapeLineDic[this.mId];
                    e.rebuild(t.tempArray), t.setGeomtry(e);
                } else F.getInstance().addLine(this.mId, t.drawLine(0, 0, t.tempArray, this.lineWidth, this.strokeStyle._color.numColor));
                t.update();
                var i = [ this.mX, this.mY ], r = J.createShape(this, t.ib, t.vb, t.count, t.offset, gt.create(4, 0));
                r.shaderValue.ALPHA = this._shader2D.ALPHA, r.shaderValue.u_pos = i, r.shaderValue.u_mmat2 = _t.TEMPMAT4_ARRAY, 
                this._submits[this._submits._length++] = r;
            }
        }, h.line = function(t, e, i, r, a, s) {
            var n = this._curSubmit, h = this._vb;
            if (ut.fillLineVb(h, this._clipRect, t, e, i, r, a, s)) {
                this._renderKey = 0;
                var l = this._shader2D, o = n.shaderValue;
                l.strokeStyle === o.strokeStyle && l.ALPHA === o.ALPHA || (l.glTexture = null, n = this._curSubmit = J.create(this, this._ib, h, (h._byteLength - 64) / 32 * 3, gt.create(2, 0)), 
                n.shaderValue.strokeStyle = l.strokeStyle, n.shaderValue.mainID = 2, n.shaderValue.ALPHA = l.ALPHA, 
                this._submits[this._submits._length++] = n), n._numEle += 6;
            }
        }, h.moveTo = function(t, e, i) {
            void 0 === i && (i = !0);
            var r = this._getPath();
            if (i) {
                var a = t, s = e;
                t = this._curMat.a * a + this._curMat.c * s, e = this._curMat.b * a + this._curMat.d * s;
            }
            r.addPoint(t, e);
        }, h.lineTo = function(t, e, i) {
            void 0 === i && (i = !0);
            var r = this._getPath();
            if (i) {
                var a = t, s = e;
                t = this._curMat.a * a + this._curMat.c * s, e = this._curMat.b * a + this._curMat.d * s;
            }
            r.addPoint(t, e);
        }, h.drawCurves = function(t, e, i) {
            this.setPathId(-1), this.beginPath(), this.strokeStyle = i[3], this.lineWidth = i[4];
            var r = i[2];
            t += i[0], e += i[1], this.movePath(t, e), this.moveTo(r[0], r[1]);
            for (var a = 2, s = r.length; s > a; ) this.quadraticCurveTo(r[a++], r[a++], r[a++], r[a++]);
            this.stroke();
        }, h.arcTo = function(t, e, i, r, a) {
            if (-1 == this.mId || !this.mHaveKey) {
                var s = this._getPath(), n = s.getEndPointX(), h = s.getEndPointY(), l = NaN, o = NaN, u = NaN, _ = NaN, c = NaN, f = NaN, d = NaN, m = NaN, p = NaN, g = NaN, v = !1, T = t, x = e;
                t = this._curMat.a * T + this._curMat.c * x, e = this._curMat.b * T + this._curMat.d * x, 
                T = i, x = r, i = this._curMat.a * T + this._curMat.c * x, r = this._curMat.b * T + this._curMat.d * x, 
                a = this._curMat.a * a + this._curMat.c * a, l = n - t, o = h - e, u = i - t, _ = r - e, 
                b.TEMP.setTo(l, o), b.TEMP.normalize(), l = b.TEMP.x, o = b.TEMP.y, b.TEMP.setTo(u, _), 
                b.TEMP.normalize(), u = b.TEMP.x, _ = b.TEMP.y, c = Math.acos(l * u + o * _);
                var y = Math.tan(c / 2);
                if (f = a / y, f > 1e4) return void this.lineTo(t, e);
                0 >= l * _ - u * o ? (d = t + l * f + o * a, m = e + o * f - l * a, p = Math.atan2(l, -o), 
                g = Math.atan2(-u, _), v = !1) : (d = t + l * f - o * a, m = e + o * f + l * a, 
                p = Math.atan2(-l, o), g = Math.atan2(u, -_), v = !0), this.arc(d, m, a, p, g, v, !1);
            }
        }, h.arc = function(t, e, i, r, a, s, n) {
            if (void 0 === s && (s = !1), void 0 === n && (n = !0), -1 != this.mId) {
                var h = F.getInstance().shapeDic[this.mId];
                if (h && this.mHaveKey && !h.needUpdate(this._curMat)) return;
                t = 0, e = 0;
            }
            var l = 0, o = 0, u = 0, _ = 0, c = 0, f = 0, d = 0, m = 0, p = 0, g = 0, v = 0;
            if (o = a - r, s) if (Math.abs(o) >= 2 * Math.PI) o = 2 * -Math.PI; else for (;o > 0; ) o -= 2 * Math.PI; else if (Math.abs(o) >= 2 * Math.PI) o = 2 * Math.PI; else for (;0 > o; ) o += 2 * Math.PI;
            g = 101 > i ? Math.max(10, o * i / 5) : 201 > i ? Math.max(10, o * i / 20) : Math.max(10, o * i / 40), 
            u = o / g / 2, _ = Math.abs(4 / 3 * (1 - Math.cos(u)) / Math.sin(u)), s && (_ = -_), 
            v = 0;
            var T = this._getPath(), b = NaN, x = NaN;
            for (p = 0; g >= p; p++) l = r + o * (p / g), c = Math.cos(l), f = Math.sin(l), 
            d = t + c * i, m = e + f * i, n && (b = d, x = m, d = this._curMat.a * b + this._curMat.c * x, 
            m = this._curMat.b * b + this._curMat.d * x), d == this._path.getEndPointX() && m == this._path.getEndPointY() || T.addPoint(d, m);
            c = Math.cos(a), f = Math.sin(a), d = t + c * i, m = e + f * i, n && (b = d, x = m, 
            d = this._curMat.a * b + this._curMat.c * x, m = this._curMat.b * b + this._curMat.d * x), 
            d == this._path.getEndPointX() && m == this._path.getEndPointY() || T.addPoint(d, m);
        }, h.quadraticCurveTo = function(t, e, i, r) {
            var a = l.I, s = i, n = r;
            i = this._curMat.a * s + this._curMat.c * n, r = this._curMat.b * s + this._curMat.d * n, 
            s = t, n = e, t = this._curMat.a * s + this._curMat.c * n, e = this._curMat.b * s + this._curMat.d * n;
            for (var h = a.getBezierPoints([ this._path.getEndPointX(), this._path.getEndPointY(), t, e, i, r ], 30, 2), o = 0, u = h.length / 2; u > o; o++) this.lineTo(h[2 * o], h[2 * o + 1], !1);
            this.lineTo(i, r, !1);
        }, h.rect = function(t, e, i, r) {
            this._other = this._other.make(), this._other.path || (this._other.path = new k()), 
            this._other.path.rect(t, e, i, r);
        }, h.strokeRect = function(t, e, i, r, a) {
            var s = .5 * a;
            this.line(t - s, e, t + i + s, e, a, this._curMat), this.line(t + i, e, t + i, e + r, a, this._curMat), 
            this.line(t, e, t, e + r, a, this._curMat), this.line(t - s, e + r, t + i + s, e + r, a, this._curMat);
        }, h.clip = function() {}, h.drawPoly = function(t, e, i, r, a, s, n) {
            void 0 === n && (n = !1), this._renderKey = 0, this._shader2D.glTexture = null;
            var h = this._getPath();
            if (-1 == this.mId) h.polygon(t, e, i, r, a ? a : 1, s); else if (this.mHaveKey) {
                var l = F.getInstance().shapeDic[this.mId];
                l.setMatrix(this._curMat), l.rebuild(h.tempArray), h.setGeomtry(l);
            } else {
                var o = h.polygon(t, e, i, r, a ? a : 1, s);
                F.getInstance().addShape(this.mId, o), o.setMatrix(this._curMat);
            }
            h.update();
            var u, _ = [ this.mX, this.mY ];
            if (!n) {
                var c = at.create(4);
                this.addRenderObject(c), u = J.createShape(this, h.ib, h.vb, h.count, h.offset, gt.create(4, 0)), 
                u.shaderValue.ALPHA = this._shader2D.ALPHA, u.shaderValue.u_pos = _, u.shaderValue.u_mmat2 = _t.EMPTYMAT4_ARRAY, 
                this._submits[this._submits._length++] = u, c = at.create(5), this.addRenderObject(c);
            }
            if (u = J.createShape(this, h.ib, h.vb, h.count, h.offset, gt.create(4, 0)), u.shaderValue.ALPHA = this._shader2D.ALPHA, 
            u.shaderValue.u_pos = _, u.shaderValue.u_mmat2 = _t.EMPTYMAT4_ARRAY, this._submits[this._submits._length++] = u, 
            n || (c = at.create(3), this.addRenderObject(c)), a > 0) {
                if (this.mHaveLineKey) {
                    var f = F.getInstance().shapeLineDic[this.mId];
                    f.rebuild(h.tempArray), h.setGeomtry(f);
                } else F.getInstance().addShape(this.mId, h.drawLine(t, e, i, a, s));
                h.update(), u = J.createShape(this, h.ib, h.vb, h.count, h.offset, gt.create(4, 0)), 
                u.shaderValue.ALPHA = this._shader2D.ALPHA, u.shaderValue.u_mmat2 = _t.EMPTYMAT4_ARRAY, 
                this._submits[this._submits._length++] = u;
            }
        }, h.drawParticle = function(t, e, i) {
            i.x = t, i.y = e, this._submits[this._submits._length++] = i;
        }, h._getPath = function() {
            return this._path || (this._path = new k());
        }, s(0, h, "globalCompositeOperation", function() {
            return U.NAMES[this._nBlendType];
        }, function(t) {
            var e = U.TOINT[t];
            null == e || this._nBlendType === e || (G.save(this, 65536, this, !0), this._curSubmit = J.RENDERBASE, 
            this._renderKey = 0, this._nBlendType = e);
        }), s(0, h, "strokeStyle", function() {
            return this._shader2D.strokeStyle;
        }, function(t) {
            this._shader2D.strokeStyle.equal(t) || (G.save(this, 512, this._shader2D, !1), this._shader2D.strokeStyle = H.create(t));
        }), s(0, h, "globalAlpha", function() {
            return this._shader2D.ALPHA;
        }, function(t) {
            t = Math.floor(1e3 * t) / 1e3, t != this._shader2D.ALPHA && (G.save(this, 1, this._shader2D, !0), 
            this._shader2D.ALPHA = t);
        }), s(0, h, "asBitmap", null, function(t) {
            if (t) {
                if (this._targets || (this._targets = new K()), this._targets.repaint = !0, !this._width || !this._height) throw Error("asBitmap no size!");
                this._targets.setSP(this.sprite), this._targets.size(this._width, this._height);
            } else this._targets = null;
        }), s(0, h, "fillStyle", function() {
            return this._shader2D.fillStyle;
        }, function(t) {
            this._shader2D.fillStyle.equal(t) || (G.save(this, 2, this._shader2D, !1), this._shader2D.fillStyle = H.create(t));
        }), s(0, h, "textAlign", function() {
            return this._other.textAlign;
        }, function(t) {
            this._other.textAlign === t || (this._other = this._other.make(), G.save(this, 32768, this._other, !1), 
            this._other.textAlign = t);
        }), s(0, h, "lineWidth", function() {
            return this._other.lineWidth;
        }, function(t) {
            this._other.lineWidth === t || (this._other = this._other.make(), G.save(this, 256, this._other, !1), 
            this._other.lineWidth = t);
        }), s(0, h, "textBaseline", function() {
            return this._other.textBaseline;
        }, function(t) {
            this._other.textBaseline === t || (this._other = this._other.make(), G.save(this, 16384, this._other, !1), 
            this._other.textBaseline = t);
        }), s(0, h, "font", null, function(t) {
            t != this._other.font.toString() && (this._other = this._other.make(), G.save(this, 8, this._other, !1), 
            this._other.font === lt.EMPTY ? this._other.font = new lt(t) : this._other.font.setFont(t));
        }), e.__init__ = function() {
            n.DEFAULT = new n();
        }, e._SUBMITVBSIZE = 32e3, e._MAXSIZE = 99999999, e._RECTVBSIZE = 16, e.MAXCLIPRECT = new x(0, 0, 99999999, 99999999), 
        e._COUNT = 0, e._tmpMatrix = new T(), r(e, [ "_fontTemp", function() {
            return this._fontTemp = new lt();
        }, "_drawStyleTemp", function() {
            return this._drawStyleTemp = new H(null);
        } ]), e.__init$ = function() {
            n = function() {
                function t() {
                    this.lineWidth = 1, this.path = null, this.textAlign = null, this.textBaseline = null, 
                    this.font = lt.EMPTY;
                }
                a(t, "");
                var e = t.prototype;
                return e.clear = function() {
                    this.lineWidth = 1, this.path && this.path.clear(), this.textAlign = this.textBaseline = null, 
                    this.font = lt.EMPTY;
                }, e.make = function() {
                    return this === t.DEFAULT ? new t() : this;
                }, t.DEFAULT = null, t;
            }();
        }, e;
    }(f), gt = function(t) {
        function e(t, i) {
            this.size = [ 0, 0 ], this.alpha = 1, this.ALPHA = 1, this.subID = 0, this._cacheID = 0, 
            e.__super.call(this), this.defines = new xt(), this.position = e._POSITION, this.mainID = t, 
            this.subID = i, this.textureHost = null, this.texture = null, this.fillStyle = null, 
            this.color = null, this.strokeStyle = null, this.colorAdd = null, this.glTexture = null, 
            this.u_mmat2 = null, this._cacheID = t | i, this._inClassCache = e._cache[this._cacheID], 
            t > 0 && !this._inClassCache && (this._inClassCache = e._cache[this._cacheID] = [], 
            this._inClassCache._length = 0), this.clear();
        }
        a(e, "laya.webgl.shader.d2.value.Value2D", t);
        var i = e.prototype;
        return i.setValue = function(t) {}, i.refresh = function() {
            var t = this.size;
            return t[0] = _t.width, t[1] = _t.height, this.alpha = this.ALPHA * _t.worldAlpha, 
            this.mmat = _t.worldMatrix4, this;
        }, i._ShaderWithCompile = function() {
            return Ht.withCompile2D(0, this.mainID, this.defines.toNameDic(), this.mainID | this.defines._value, zt.create);
        }, i._withWorldShaderDefines = function() {
            var t = _t.worldShaderDefines, e = Ht.sharders[this.mainID | this.defines._value | t.getValue()];
            if (!e) {
                var i, r, a = {};
                i = this.defines.toNameDic();
                for (r in i) a[r] = "";
                i = t.toNameDic();
                for (r in i) a[r] = "";
                e = Ht.withCompile2D(0, this.mainID, a, this.mainID | this.defines._value | t.getValue(), zt.create);
            }
            var s = _t.worldFilters;
            if (!s) return e;
            for (var n, h = s.length, l = 0; h > l; l++) (n = s[l]) && n.action.setValue(this);
            return e;
        }, i.upload = function() {
            var t = _t;
            this.alpha = this.ALPHA * t.worldAlpha, _t.worldMatrix4 !== _t.TEMPMAT4_ARRAY && this.defines.add(128), 
            ft.frameShaderHighPrecision && this.defines.add(1024);
            var e, i = t.worldShaderDefines ? this._withWorldShaderDefines() : Ht.sharders[this.mainID | this.defines._value] || this._ShaderWithCompile();
            this.size[0] = t.width, this.size[1] = t.height, this.mmat = t.worldMatrix4, Rt.activeShader !== i ? (i._shaderValueWidth !== t.width || i._shaderValueHeight !== t.height ? (i._shaderValueWidth = t.width, 
            i._shaderValueHeight = t.height) : e = i._params2dQuick2 || i._make2dQuick2(), i.upload(this, e)) : (i._shaderValueWidth !== t.width || i._shaderValueHeight !== t.height ? (i._shaderValueWidth = t.width, 
            i._shaderValueHeight = t.height) : e = i._params2dQuick1 || i._make2dQuick1(), i.upload(this, e));
        }, i.setFilters = function(t) {
            if (this.filters = t, t) for (var e, i = t.length, r = 0; i > r; r++) e = t[r], 
            e && (this.defines.add(e.type), e.action.setValue(this));
        }, i.clear = function() {
            this.defines.setValue(this.subID);
        }, i.release = function() {
            this._inClassCache[this._inClassCache._length++] = this, this.fillStyle = null, 
            this.strokeStyle = null, this.clear();
        }, e._initone = function(t, i) {
            e._typeClass[t] = i, e._cache[t] = [], e._cache[t]._length = 0;
        }, e.__init__ = function() {
            e._POSITION = [ 2, 5126, !1, 4 * ot.BYTES_PE, 0 ], e._TEXCOORD = [ 2, 5126, !1, 4 * ot.BYTES_PE, 2 * ot.BYTES_PE ], 
            e._initone(2, Lt), e._initone(4, Dt), e._initone(256, Pt), e._initone(512, Mt), 
            e._initone(1, Ft), e._initone(65, Gt), e._initone(9, Ft);
        }, e.create = function(t, i) {
            var r = e._cache[t | i];
            return r._length ? r[--r._length] : new e._typeClass[t | i](i);
        }, e._POSITION = null, e._TEXCOORD = null, e._cache = [], e._typeClass = [], e.TEMPMAT4_ARRAY = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], 
        e;
    }(B), vt = function(t) {
        function e(t, i) {
            e.__super.call(this, t, i);
        }
        a(e, "laya.webgl.utils.RenderSprite3D", t);
        var i = e.prototype;
        return i.onCreate = function(t) {
            switch (t) {
              case 8:
                return void (this._fun = this._blend);

              case 4:
                return void (this._fun = this._transform);
            }
        }, i._mask = function(t, i, r, a) {
            var s, n, h = this._next, l = t.mask;
            if (l) {
                i.ctx.save();
                var o = i.ctx.globalCompositeOperation, u = new x();
                if (u.copyFrom(l.getBounds()), u.width = Math.round(u.width), u.height = Math.round(u.height), 
                u.x = Math.round(u.x), u.y = Math.round(u.y), u.width > 0 && u.height > 0) {
                    var _ = et.create();
                    _.addValue("bounds", u), s = tt.create([ _, i ], laya.webgl.utils.RenderSprite3D.tmpTarget), 
                    i.addRenderObject(s), l.render(i, -u.x, -u.y), s = tt.create([ _ ], laya.webgl.utils.RenderSprite3D.endTmpTarget), 
                    i.addRenderObject(s), i.ctx.save(), i.clipRect(r + u.x, a + u.y, u.width, u.height), 
                    h._fun.call(h, t, i, r, a), i.ctx.restore(), n = at.create(6), o = i.ctx.globalCompositeOperation, 
                    n.blendMode = "mask", i.addRenderObject(n), T.TEMP.identity();
                    var c = gt.create(1, 0), f = L.INV_UV, d = u.width, m = u.height, p = 32;
                    (u.width < p || u.height < p) && (f = e.tempUV, f[0] = 0, f[1] = 0, f[2] = u.width >= 32 ? 1 : u.width / p, 
                    f[3] = 0, f[4] = u.width >= 32 ? 1 : u.width / p, f[5] = u.height >= 32 ? 1 : u.height / p, 
                    f[6] = 0, f[7] = u.height >= 32 ? 1 : u.height / p, u.width = u.width >= 32 ? u.width : p, 
                    u.height = u.height >= 32 ? u.height : p, f[1] *= -1, f[3] *= -1, f[5] *= -1, f[7] *= -1, 
                    f[1] += 1, f[3] += 1, f[5] += 1, f[7] += 1), i.ctx.drawTarget(_, r + u.x, a + u.y, d, m, T.TEMP, "tmpTarget", c, f, 6), 
                    s = tt.create([ _ ], laya.webgl.utils.RenderSprite3D.recycleTarget), i.addRenderObject(s), 
                    n = at.create(6), n.blendMode = o, i.addRenderObject(n);
                }
                i.ctx.restore();
            } else h._fun.call(h, t, i, r, a);
        }, i._blend = function(t, e, i, r) {
            var a = t._style, s = this._next;
            a.blendMode ? (e.ctx.save(), e.ctx.globalCompositeOperation = a.blendMode, s._fun.call(s, t, e, i, r), 
            e.ctx.restore()) : s._fun.call(s, t, e, i, r);
        }, i._transform = function(t, e, i, r) {
            "use strict";
            var a = t.transform, s = this._next;
            if (a && s != A.NORENDER) {
                var n = e.ctx;
                t._style;
                a.tx = i, a.ty = r;
                var h = n._getTransformMatrix(), l = h.clone();
                T.mul(a, h, h), h._checkTransform(), a.tx = a.ty = 0, s._fun.call(s, t, e, 0, 0), 
                l.copyTo(h), l.destroy();
            } else s._fun.call(s, t, e, i, r);
        }, e.tmpTarget = function(t, e) {
            var i = t.getValue("bounds"), r = It.create(i.width, i.height);
            r.start(), r.clear(0, 0, 0, 0), t.addValue("tmpTarget", r);
        }, e.endTmpTarget = function(t) {
            var e = t.getValue("tmpTarget");
            e.end();
        }, e.recycleTarget = function(t) {
            var e = t.getValue("tmpTarget");
            e.recycle(), t.recycle();
        }, r(e, [ "tempUV", function() {
            return this.tempUV = new Array(8);
        } ]), e;
    }(A), Tt = function(t) {
        function e() {
            this.data = null, e.__super.call(this);
        }
        a(e, "laya.filters.webgl.ColorFilterActionGL", t);
        var r = e.prototype;
        return i.imps(r, {
            "laya.filters.IFilterActionGL": !0
        }), r.setValue = function(t) {
            t.colorMat = this.data._mat, t.colorAlpha = this.data._alpha;
        }, r.apply3d = function(t, e, i, r, a) {
            var s = t.getValue("bounds"), n = gt.create(1, 0);
            n.setFilters([ this.data ]);
            var h = T.TEMP;
            h.identity(), i.ctx.drawTarget(t, 0, 0, s.width, s.height, h, "src", n);
        }, e;
    }(D), bt = function(t) {
        function e(t, i, r, a, s) {
            this._atlasCanvas = null, this._inAtlasTextureKey = null, this._inAtlasTextureBitmapValue = null, 
            this._inAtlasTextureOriUVValue = null, this._InAtlasWebGLImagesKey = null, this._InAtlasWebGLImagesOffsetValue = null, 
            e.__super.call(this, t, i, s), this._inAtlasTextureKey = [], this._inAtlasTextureBitmapValue = [], 
            this._inAtlasTextureOriUVValue = [], this._InAtlasWebGLImagesKey = [], this._InAtlasWebGLImagesOffsetValue = [], 
            this._atlasCanvas = new Bt(), this._atlasCanvas.width = r, this._atlasCanvas.height = a, 
            this._atlasCanvas.activeResource(), this._atlasCanvas.lock = !0;
        }
        a(e, "laya.webgl.atlas.Atlaser", t);
        var i = e.prototype;
        return i.computeUVinAtlasTexture = function(t, e, i, r) {
            var a = O.atlasTextureWidth, s = O.atlasTextureHeight, n = i / a, h = r / s, l = (i + t.bitmap.width) / a, o = (r + t.bitmap.height) / s, u = t.bitmap.width / a, _ = t.bitmap.height / s;
            t.uv = [ n + e[0] * u, h + e[1] * _, l - (1 - e[2]) * u, h + e[3] * _, l - (1 - e[4]) * u, o - (1 - e[5]) * _, n + e[6] * u, o - (1 - e[7]) * _ ];
        }, i.addToAtlasTexture = function(t, e, i) {
            t instanceof laya.webgl.resource.WebGLImage && (this._InAtlasWebGLImagesKey.push(t), 
            this._InAtlasWebGLImagesOffsetValue.push([ e, i ])), this._atlasCanvas.texSubImage2D(e, i, t.atlasSource), 
            t.clearAtlasSource();
        }, i.addToAtlas = function(t, e, i) {
            var r = t.uv.slice(), a = t.bitmap;
            this._inAtlasTextureKey.push(t), this._inAtlasTextureOriUVValue.push(r), this._inAtlasTextureBitmapValue.push(a), 
            this.computeUVinAtlasTexture(t, r, e, i), t.bitmap = this._atlasCanvas;
        }, i.clear = function() {
            for (var t = 0, e = this._inAtlasTextureKey.length; e > t; t++) this._inAtlasTextureKey[t].bitmap = this._inAtlasTextureBitmapValue[t], 
            this._inAtlasTextureKey[t].uv = this._inAtlasTextureOriUVValue[t], this._inAtlasTextureKey[t].bitmap.lock = !1, 
            this._inAtlasTextureKey[t].bitmap.releaseResource();
            this._inAtlasTextureKey.length = 0, this._inAtlasTextureBitmapValue.length = 0, 
            this._inAtlasTextureOriUVValue.length = 0, this._InAtlasWebGLImagesKey.length = 0, 
            this._InAtlasWebGLImagesOffsetValue.length = 0;
        }, i.dispose = function() {
            this.clear(), this._atlasCanvas.dispose();
        }, s(0, i, "InAtlasWebGLImagesOffsetValue", function() {
            return this._InAtlasWebGLImagesOffsetValue;
        }), s(0, i, "texture", function() {
            return this._atlasCanvas;
        }), s(0, i, "inAtlasWebGLImagesKey", function() {
            return this._InAtlasWebGLImagesKey;
        }), e;
    }(N), xt = function(t) {
        function e() {
            e.__super.call(this, e.__name2int, e.__int2name, e.__int2nameMap);
        }
        return a(e, "laya.webgl.shader.d2.ShaderDefines2D", t), e.__init__ = function() {
            e.reg("TEXTURE2D", 1), e.reg("COLOR2D", 2), e.reg("PRIMITIVE", 4), e.reg("GLOW_FILTER", 8), 
            e.reg("BLUR_FILTER", 16), e.reg("COLOR_FILTER", 32), e.reg("COLOR_ADD", 64), e.reg("WORLDMAT", 128), 
            e.reg("FILLTEXTURE", 256), e.reg("FSHIGHPRECISION", 1024);
        }, e.reg = function(t, i) {
            j._reg(t, i, e.__name2int, e.__int2name);
        }, e.toText = function(t, e, i) {
            return j._toText(t, e, i);
        }, e.toInt = function(t) {
            return j._toInt(t, e.__name2int);
        }, e.TEXTURE2D = 1, e.COLOR2D = 2, e.PRIMITIVE = 4, e.FILTERGLOW = 8, e.FILTERBLUR = 16, 
        e.FILTERCOLOR = 32, e.COLORADD = 64, e.WORLDMAT = 128, e.FILLTEXTURE = 256, e.SKINMESH = 512, 
        e.SHADERDEFINE_FSHIGHPRECISION = 1024, e.__name2int = {}, e.__int2name = [], e.__int2nameMap = [], 
        e;
    }(j), yt = (function(t) {
        function e(t, i, r, a, s, n, h) {
            e.__super.call(this, t, i, r, a, 40, s, n, h);
        }
        return a(e, "laya.webgl.shapes.Ellipse", t), e;
    }($), function(t) {
        function e(t, i, r, a, s) {
            this._points = [], this.rebuild(r), e.__super.call(this, t, i, 0, 0, 0, s, a, s, 0);
        }
        a(e, "laya.webgl.shapes.Line", t);
        var i = e.prototype;
        return i.rebuild = function(t) {
            var e = t.length, i = this._points.length;
            e != i && (this.mUint16Array = new Uint16Array(6 * (e / 2 - 1)), this.mFloat32Array = new Float32Array(5 * e)), 
            this._points.length = 0;
            for (var r = NaN, a = NaN, s = -1, n = -1, h = t.length / 2, l = 0; h > l; l++) r = t[2 * l], 
            a = t[2 * l + 1], (Math.abs(s - r) > .01 || Math.abs(n - a) > .01) && this._points.push(r, a), 
            s = r, n = a;
        }, i.getData = function(t, e, i) {
            var r = [], a = [];
            this.borderWidth > 0 && this.createLine2(this._points, r, this.borderWidth, i, a, this._points.length / 2), 
            this.mUint16Array.set(r, 0), this.mFloat32Array.set(a, 0), t.append(this.mUint16Array), 
            e.append(this.mFloat32Array);
        }, e;
    }($)), At = function(t) {
        function e(t, i, r, a, s) {
            this._points = [];
            for (var n = NaN, h = NaN, l = -1, o = -1, u = r.length / 2 - 1, _ = 0; u > _; _++) n = r[2 * _], 
            h = r[2 * _ + 1], (Math.abs(l - n) > .01 || Math.abs(o - h) > .01) && this._points.push(n, h), 
            l = n, o = h;
            n = r[2 * u], h = r[2 * u + 1], l = this._points[0], o = this._points[1], (Math.abs(l - n) > .01 || Math.abs(o - h) > .01) && this._points.push(n, h), 
            e.__super.call(this, t, i, 0, 0, this._points.length / 2, 0, a, s);
        }
        a(e, "laya.webgl.shapes.LoopLine", t);
        var i = e.prototype;
        return i.getData = function(t, e, i) {
            if (this.borderWidth > 0) {
                for (var r = this.color, a = (r >> 16 & 255) / 255, s = (r >> 8 & 255) / 255, n = (255 & r) / 255, h = [], l = 0, o = 0, u = [], _ = Math.floor(this._points.length / 2), c = 0; _ > c; c++) l = this._points[2 * c], 
                o = this._points[2 * c + 1], h.push(this.x + l, this.y + o, a, s, n);
                this.createLoopLine(h, u, this.borderWidth, i + h.length / 5), t.append(new Uint16Array(u)), 
                e.append(new Float32Array(h));
            }
        }, i.createLoopLine = function(t, e, i, r, a, s) {
            var n = (t.length / 5, t.concat()), h = a ? a : t, l = this.borderColor, o = (l >> 16 & 255) / 255, u = (l >> 8 & 255) / 255, _ = (255 & l) / 255, c = [ n[0], n[1] ], f = [ n[n.length - 5], n[n.length - 4] ], d = f[0] + .5 * (c[0] - f[0]), m = f[1] + .5 * (c[1] - f[1]);
            n.unshift(d, m, 0, 0, 0), n.push(d, m, 0, 0, 0);
            var p, g, v, T, b, x, y, A, E, S, w, R, I, C, M, L, P, F, D, B, N, O = n.length / 5, V = r, U = i / 2;
            v = n[0], T = n[1], b = n[5], x = n[6], E = -(T - x), S = v - b, N = Math.sqrt(E * E + S * S), 
            E = E / N * U, S = S / N * U, h.push(v - E, T - S, o, u, _, v + E, T + S, o, u, _);
            for (var H = 1; O - 1 > H; H++) v = n[5 * (H - 1)], T = n[5 * (H - 1) + 1], b = n[5 * H], 
            x = n[5 * H + 1], y = n[5 * (H + 1)], A = n[5 * (H + 1) + 1], E = -(T - x), S = v - b, 
            N = Math.sqrt(E * E + S * S), E = E / N * U, S = S / N * U, w = -(x - A), R = b - y, 
            N = Math.sqrt(w * w + R * R), w = w / N * U, R = R / N * U, I = -S + T - (-S + x), 
            C = -E + b - (-E + v), M = (-E + v) * (-S + x) - (-E + b) * (-S + T), L = -R + A - (-R + x), 
            P = -w + b - (-w + y), F = (-w + y) * (-R + x) - (-w + b) * (-R + A), D = I * P - L * C, 
            Math.abs(D) < .1 ? (D += 10.1, h.push(b - E, x - S, o, u, _, b + E, x + S, o, u, _)) : (p = (C * F - P * M) / D, 
            g = (L * M - I * F) / D, B = (p - b) * (p - b) + (g - x) + (g - x), h.push(p, g, o, u, _, b - (p - b), x - (g - x), o, u, _));
            s && (e = s);
            var k = this.edges + 1;
            for (H = 1; k > H; H++) e.push(V + 2 * (H - 1), V + 2 * (H - 1) + 1, V + 2 * H + 1, V + 2 * H + 1, V + 2 * H, V + 2 * (H - 1));
            return e.push(V + 2 * (H - 1), V + 2 * (H - 1) + 1, V + 1, V + 1, V, V + 2 * (H - 1)), 
            h;
        }, e;
    }($), Et = function(t) {
        function e(t, i, r, a, s, n) {
            this._points = null, this._start = -1, this._repaint = !1, this._mat = T.create(), 
            this._points = r.slice(0, r.length), e.__super.call(this, t, i, 0, 0, this._points.length / 2, a, s, n);
        }
        a(e, "laya.webgl.shapes.Polygon", t);
        var i = e.prototype;
        return i.rebuild = function(t) {
            this._repaint || (this._points.length = 0, this._points = this._points.concat(t));
        }, i.setMatrix = function(t) {
            t.copyTo(this._mat);
        }, i.needUpdate = function(t) {
            return this._repaint = this._mat.a == t.a && this._mat.b == t.b && this._mat.c == t.c && this._mat.d == t.d && this._mat.tx == t.tx && this._mat.ty == t.ty, 
            !this._repaint;
        }, i.getData = function(t, e, i) {
            var r, a = 0, s = this._points, n = 0;
            if (this.mUint16Array && this.mFloat32Array && this._repaint) {
                if (this._start != i) {
                    for (this._start = i, r = [], n = Math.floor(s.length / 2), a = 2; n > a; a++) r.push(i, i + a - 1, i + a);
                    this.mUint16Array = new Uint16Array(r);
                }
            } else {
                this._start = i, r = [];
                var h = [], l = this.color, o = (l >> 16 & 255) / 255, u = (l >> 8 & 255) / 255, _ = (255 & l) / 255;
                for (n = Math.floor(s.length / 2), a = 0; n > a; a++) h.push(this.x + s[2 * a], this.y + s[2 * a + 1], o, u, _);
                for (a = 2; n > a; a++) r.push(i, i + a - 1, i + a);
                this.mUint16Array = new Uint16Array(r), this.mFloat32Array = new Float32Array(h);
            }
            t.append(this.mUint16Array), e.append(this.mFloat32Array);
        }, e;
    }($), St = function(t) {
        function e() {
            this._matrix = new T(), this._matrix4 = ot.defaultMatrix4.concat(), e.__super.call(this, 1e4), 
            this.shaderValue = new gt(0, 0);
        }
        a(e, "laya.webgl.submit.SubmitCanvas", t);
        var i = e.prototype;
        return i.renderSubmit = function() {
            if (this._ctx_src._targets) return this._ctx_src._targets.flush(this._ctx_src), 
            1;
            var t = _t.worldAlpha, e = _t.worldMatrix4, i = _t.worldMatrix, r = _t.worldFilters, a = _t.worldShaderDefines, s = this.shaderValue, n = this._matrix, h = this._matrix4, l = T.TEMP;
            return T.mul(n, i, l), h[0] = l.a, h[1] = l.b, h[4] = l.c, h[5] = l.d, h[12] = l.tx, 
            h[13] = l.ty, _t.worldMatrix = l.clone(), _t.worldMatrix4 = h, _t.worldAlpha = _t.worldAlpha * s.alpha, 
            s.filters && s.filters.length && (_t.worldFilters = s.filters, _t.worldShaderDefines = s.defines), 
            this._ctx_src.flush(), _t.worldAlpha = t, _t.worldMatrix4 = e, _t.worldMatrix.destroy(), 
            _t.worldMatrix = i, _t.worldFilters = r, _t.worldShaderDefines = a, 1;
        }, i.releaseRender = function() {
            var t = e._cache;
            t[t._length++] = this;
        }, i.getRenderType = function() {
            return 10003;
        }, e.create = function(t, i, r) {
            var a = e._cache._length ? e._cache[--e._cache._length] : new e();
            a._ctx_src = t;
            var s = a.shaderValue;
            return s.alpha = i, s.defines.setValue(0), r && r.length && s.setFilters(r), a;
        }, e._cache = (e._cache = [], e._cache._length = 0, e._cache), e;
    }(J), wt = function(t) {
        function e(t) {
            this._preIsSameTextureShader = !1, this._isSameTexture = !0, this._texs = new Array(), 
            this._texsID = new Array(), this._vbPos = new Array(), void 0 === t && (t = 1e4), 
            e.__super.call(this, t);
        }
        a(e, "laya.webgl.submit.SubmitTexture", t);
        var i = e.prototype;
        return i.releaseRender = function() {
            var t = e._cache;
            t[t._length++] = this, this.shaderValue.release(), this._preIsSameTextureShader = !1, 
            this._vb = null, this._texs.length = 0, this._vbPos.length = 0, this._isSameTexture = !0;
        }, i.addTexture = function(t, e) {
            this._texsID[this._texs.length] = t._uvID, this._texs.push(t), this._vbPos.push(e);
        }, i.checkTexture = function() {
            if (this._texs.length < 1) return void (this._isSameTexture = !0);
            var t = this.shaderValue.textureHost, e = t.bitmap;
            if (null !== e) for (var i = this._vb.getFloat32Array(), r = 0, a = this._texs.length; a > r; r++) {
                var s = this._texs[r];
                s.active();
                var n = s.uv;
                if (this._texsID[r] !== s._uvID) {
                    this._texsID[r] = s._uvID;
                    var h = this._vbPos[r];
                    i[h + 2] = n[0], i[h + 3] = n[1], i[h + 6] = n[2], i[h + 7] = n[3], i[h + 10] = n[4], 
                    i[h + 11] = n[5], i[h + 14] = n[6], i[h + 15] = n[7], this._vb.setNeedUpload();
                }
                s.bitmap !== e && (this._isSameTexture = !1);
            }
        }, i.renderSubmit = function() {
            if (0 === this._numEle) return e._shaderSet = !1, 1;
            var t = this.shaderValue.textureHost;
            if (t) {
                var i = t.source;
                if (!t.bitmap || !i) return e._shaderSet = !1, 1;
                this.shaderValue.texture = i;
            }
            this._vb.bind_upload(this._ib);
            var r = ft.mainContext;
            if (U.activeBlendFunction !== this._blendFn && (r.enable(3042), this._blendFn(r), 
            U.activeBlendFunction = this._blendFn), I.drawCall++, I.trianglesFaces += this._numEle / 3, 
            this._preIsSameTextureShader && Rt.activeShader && e._shaderSet ? Rt.activeShader.uploadTexture2D(this.shaderValue.texture) : this.shaderValue.upload(), 
            e._shaderSet = !0, this._texs.length > 1 && !this._isSameTexture) for (var a = t.bitmap, s = 0, n = Rt.activeShader, h = 0, l = this._texs.length; l > h; h++) {
                var o = this._texs[h];
                o.bitmap === a && h + 1 !== l || (n.uploadTexture2D(o.source), r.drawElements(4, 6 * (h - s + 1), 5123, this._startIdx + 6 * s * ot.BYTES_PIDX), 
                a = o.bitmap, s = h);
            } else r.drawElements(4, this._numEle, 5123, this._startIdx);
            return 1;
        }, e.create = function(t, i, r, a, s) {
            var n = e._cache._length ? e._cache[--e._cache._length] : new e();
            null == r && (r = n._selfVb || (n._selfVb = Xt.create(-1)), r.clear(), a = 0), n._ib = i, 
            n._vb = r, n._startIdx = a * ot.BYTES_PIDX, n._numEle = 0;
            var h = t._nBlendType;
            n._blendFn = t._targets ? U.targetFns[h] : U.fns[h], n.shaderValue = s, n.shaderValue.setValue(t._shader2D);
            var l = t._shader2D.filters;
            return l && n.shaderValue.setFilters(l), n;
        }, e._cache = (e._cache = [], e._cache._length = 0, e._cache), e._shaderSet = !0, 
        e;
    }(J), Rt = function(t) {
        function e() {
            e.__super.call(this);
        }
        return a(e, "laya.webgl.shader.BaseShader", t), e.activeShader = null, e.bindShader = null, 
        e;
    }(E), It = function(t) {
        function e(t, i, r, a, s, n, h, l, o) {
            this._type = 0, this._svWidth = NaN, this._svHeight = NaN, this._preRenderTarget = null, 
            this._alreadyResolved = !1, this._looked = !1, this._surfaceFormat = 0, this._surfaceType = 0, 
            this._depthStencilFormat = 0, this._mipMap = !1, this._repeat = !1, this._minFifter = 0, 
            this._magFifter = 0, this._destroy = !1, void 0 === r && (r = 6408), void 0 === a && (a = 5121), 
            void 0 === s && (s = 34041), void 0 === n && (n = !1), void 0 === h && (h = !1), 
            void 0 === l && (l = -1), void 0 === o && (o = -1), this._type = 1, this._w = t, 
            this._h = i, this._surfaceFormat = r, this._surfaceType = a, this._depthStencilFormat = s, 
            this._mipMap = n, this._repeat = h, this._minFifter = l, this._magFifter = o, this._createWebGLRenderTarget(), 
            this.bitmap.lock = !0, e.__super.call(this, this.bitmap, L.INV_UV);
        }
        a(e, "laya.webgl.resource.RenderTarget2D", t);
        var r = e.prototype;
        return i.imps(r, {
            "laya.resource.IDispose": !0
        }), r.getType = function() {
            return this._type;
        }, r.getTexture = function() {
            return this;
        }, r.size = function(t, e) {
            this._w == t && this._h == e || (this._w = t, this._h = e, this.release(), 0 != this._w && 0 != this._h && this._createWebGLRenderTarget());
        }, r.release = function() {
            this.destroy();
        }, r.recycle = function() {
            e.POOL.push(this);
        }, r.start = function() {
            var t = ft.mainContext;
            return this._preRenderTarget = _t.curRenderTarget, _t.curRenderTarget = this, t.bindFramebuffer(36160, this.bitmap.frameBuffer), 
            this._alreadyResolved = !1, 1 == this._type && (t.viewport(0, 0, this._w, this._h), 
            this._svWidth = _t.width, this._svHeight = _t.height, _t.width = this._w, _t.height = this._h, 
            Rt.activeShader = null), this;
        }, r.clear = function(t, e, i, r) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === r && (r = 1);
            var a = ft.mainContext;
            a.clearColor(t, e, i, r);
            var s = 16384;
            switch (this._depthStencilFormat) {
              case 33189:
                s |= 256;
                break;

              case 36168:
                s |= 1024;
                break;

              case 34041:
                s |= 256, s |= 1024;
            }
            a.clear(s);
        }, r.end = function() {
            var t = ft.mainContext;
            t.bindFramebuffer(36160, this._preRenderTarget ? this._preRenderTarget.bitmap.frameBuffer : null), 
            this._alreadyResolved = !0, _t.curRenderTarget = this._preRenderTarget, 1 == this._type ? (t.viewport(0, 0, this._svWidth, this._svHeight), 
            _t.width = this._svWidth, _t.height = this._svHeight, Rt.activeShader = null) : t.viewport(0, 0, i.stage.width, i.stage.height);
        }, r.getData = function(t, e, i, r) {
            var a = ft.mainContext;
            a.bindFramebuffer(36160, this.bitmap.frameBuffer);
            var s = 36053 === a.checkFramebufferStatus(36160);
            if (!s) return a.bindFramebuffer(36160, null), null;
            var n = new Uint8Array(this._w * this._h * 4);
            return a.readPixels(t, e, i, r, this._surfaceFormat, this._surfaceType, n), a.bindFramebuffer(36160, null), 
            n;
        }, r.destroy = function(e) {
            void 0 === e && (e = !1), this._destroy || (this._loaded = !1, this.bitmap.dispose(), 
            this.bitmap = null, this._alreadyResolved = !1, this._destroy = !0, t.prototype.destroy.call(this));
        }, r.dispose = function() {}, r._createWebGLRenderTarget = function() {
            this.bitmap = new Vt(this.width, this.height, this._surfaceFormat, this._surfaceType, this._depthStencilFormat, this._mipMap, this._repeat, this._minFifter, this._magFifter), 
            this.bitmap.activeResource(), this._alreadyResolved = !0, this._destroy = !1, this._loaded = !0, 
            this.bitmap.on("recovered", this, function(t) {
                this.event("recovered");
            });
        }, s(0, r, "surfaceFormat", function() {
            return this._surfaceFormat;
        }), s(0, r, "magFifter", function() {
            return this._magFifter;
        }), s(0, r, "surfaceType", function() {
            return this._surfaceType;
        }), s(0, r, "mipMap", function() {
            return this._mipMap;
        }), s(0, r, "depthStencilFormat", function() {
            return this._depthStencilFormat;
        }), s(0, r, "minFifter", function() {
            return this._minFifter;
        }), s(0, r, "source", function() {
            return this._alreadyResolved ? t.prototype._$get_source.call(this) : null;
        }), e.create = function(t, i, r, a, s, n, h, l, o) {
            void 0 === r && (r = 6408), void 0 === a && (a = 5121), void 0 === s && (s = 34041), 
            void 0 === n && (n = !1), void 0 === h && (h = !1), void 0 === l && (l = -1), void 0 === o && (o = -1);
            var u = e.POOL.pop();
            return u || (u = new e(t, i)), u.bitmap && u._w == t && u._h == i && u._surfaceFormat == r && u._surfaceType == a && u._depthStencilFormat == s && u._mipMap == n && u._repeat == h && u._minFifter == l && u._magFifter == o || (u._w = t, 
            u._h = i, u._surfaceFormat = r, u._surfaceType = a, u._depthStencilFormat = s, u._mipMap = n, 
            u._repeat = h, u._minFifter = l, u._magFifter = o, u.release(), u._createWebGLRenderTarget()), 
            u;
        }, e.TYPE2D = 1, e.TYPE3D = 2, e.POOL = [], e;
    }(L), Ct = function(t) {
        function e() {
            this._glBuffer = null, this._buffer = null, this._bufferType = 0, this._bufferUsage = 0, 
            this._byteLength = 0, e.__super.call(this), e._gl = ft.mainContext;
        }
        a(e, "laya.webgl.utils.Buffer", t);
        var i = e.prototype;
        return i._bind = function() {
            this.activeResource(), e._bindActive[this._bufferType] === this._glBuffer || (e._gl.bindBuffer(this._bufferType, e._bindActive[this._bufferType] = this._glBuffer), 
            Rt.activeShader = null);
        }, i.recreateResource = function() {
            this.startCreate(), this._glBuffer || (this._glBuffer = e._gl.createBuffer()), this.completeCreate();
        }, i.detoryResource = function() {
            this._glBuffer && (ft.mainContext.deleteBuffer(this._glBuffer), this._glBuffer = null), 
            this.memorySize = 0;
        }, i.dispose = function() {
            this.resourceManager.removeResource(this), t.prototype.dispose.call(this);
        }, s(0, i, "byteLength", function() {
            return this._byteLength;
        }), s(0, i, "bufferType", function() {
            return this._bufferType;
        }), s(0, i, "bufferUsage", function() {
            return this._bufferUsage;
        }), e._gl = null, e._bindActive = {}, e;
    }(E), Mt = function(t) {
        function e(t) {
            this.texcoord = null, this.offsetX = 300, this.offsetY = 0, e.__super.call(this, 512, 0);
            var i = 8 * ot.BYTES_PE;
            this.position = [ 2, 5126, !1, i, 0 ], this.texcoord = [ 2, 5126, !1, i, 2 * ot.BYTES_PE ], 
            this.color = [ 4, 5126, !1, i, 4 * ot.BYTES_PE ];
        }
        return a(e, "laya.webgl.shader.d2.skinAnishader.SkinSV", t), e;
    }(gt), Lt = function(t) {
        function e(t) {
            e.__super.call(this, 2, 0), this.color = [];
        }
        a(e, "laya.webgl.shader.d2.value.Color2dSV", t);
        var i = e.prototype;
        return i.setValue = function(t) {
            t.fillStyle && (this.color = t.fillStyle._color._color), t.strokeStyle && (this.color = t.strokeStyle._color._color);
        }, e;
    }(gt), Pt = function(t) {
        function e(t) {
            this.u_colorMatrix = null, this.strength = 0, this.colorMat = null, this.colorAlpha = null, 
            this.u_TexRange = [ 0, 1, 0, 1 ], this.u_offset = [ 0, 0 ], this.texcoord = gt._TEXCOORD, 
            e.__super.call(this, 256, 0);
        }
        a(e, "laya.webgl.shader.d2.value.FillTextureSV", t);
        var i = e.prototype;
        return i.setValue = function(t) {
            this.ALPHA = t.ALPHA, t.filters && this.setFilters(t.filters);
        }, i.clear = function() {
            this.texture = null, this.shader = null, this.defines.setValue(0);
        }, e;
    }(gt), Ft = function(t) {
        function e(t) {
            this.u_colorMatrix = null, this.strength = 0, this.blurInfo = null, this.colorMat = null, 
            this.colorAlpha = null, this.texcoord = gt._TEXCOORD, void 0 === t && (t = 0), e.__super.call(this, 1, t);
        }
        a(e, "laya.webgl.shader.d2.value.TextureSV", t);
        var i = e.prototype;
        return i.setValue = function(t) {
            this.ALPHA = t.ALPHA, t.filters && this.setFilters(t.filters);
        }, i.clear = function() {
            this.texture = null, this.shader = null, this.defines.setValue(0);
        }, e;
    }(gt), Dt = function(t) {
        function e(t) {
            this.a_color = null, this.u_pos = [ 0, 0 ], e.__super.call(this, 4, 0), this.position = [ 2, 5126, !1, 5 * ot.BYTES_PE, 0 ], 
            this.a_color = [ 3, 5126, !1, 5 * ot.BYTES_PE, 2 * ot.BYTES_PE ];
        }
        return a(e, "laya.webgl.shader.d2.value.PrimitiveSV", t), e;
    }(gt), Bt = function(t) {
        function e() {
            this._flashCacheImage = null, this._flashCacheImageNeedFlush = !1, e.__super.call(this);
        }
        a(e, "laya.webgl.atlas.AtlasWebGLCanvas", t);
        var i = e.prototype;
        return i.recreateResource = function() {
            this.startCreate();
            var t = ft.mainContext, e = this._source = t.createTexture(), i = dt.curBindTexTarget, r = dt.curBindTexValue;
            dt.bindTexture(t, 3553, e), t.texImage2D(3553, 0, 6408, this._w, this._h, 0, 6408, 5121, null), 
            t.texParameteri(3553, 10241, 9729), t.texParameteri(3553, 10240, 9729), t.texParameteri(3553, 10242, 33071), 
            t.texParameteri(3553, 10243, 33071), i && r && dt.bindTexture(t, i, r), this.memorySize = this._w * this._h * 4, 
            this.completeCreate();
        }, i.detoryResource = function() {
            this._source && (ft.mainContext.deleteTexture(this._source), this._source = null, 
            this.memorySize = 0);
        }, i.texSubImage2D = function(t, e, i) {
            if (y.isFlash) {
                this._flashCacheImage || (this._flashCacheImage = g.create(""), this._flashCacheImage.image.createCanvas(this._w, this._h));
                var r = i.bitmapdata;
                t - 1 >= 0 && this._flashCacheImage.image.copyPixels(r, 0, 0, r.width - 1, r.height, t, e), 
                t + 1 <= this._w && this._flashCacheImage.image.copyPixels(r, 0, 0, r.width + 1, r.height, t, e), 
                e - 1 >= 0 && this._flashCacheImage.image.copyPixels(r, 0, 0, r.width, r.height - 1, t, e), 
                e + 1 <= this._h && this._flashCacheImage.image.copyPixels(r, 0, 0, r.width + 1, r.height, t, e), 
                this._flashCacheImage.image.copyPixels(r, 0, 0, r.width, r.height, t, e), this._flashCacheImageNeedFlush || (this._flashCacheImageNeedFlush = !0);
            } else {
                var a = ft.mainContext, s = dt.curBindTexTarget, n = dt.curBindTexValue;
                dt.bindTexture(a, 3553, this._source), t - 1 >= 0 && a.texSubImage2D(3553, 0, t - 1, e, 6408, 5121, i), 
                t + 1 <= this._w && a.texSubImage2D(3553, 0, t + 1, e, 6408, 5121, i), e - 1 >= 0 && a.texSubImage2D(3553, 0, t, e - 1, 6408, 5121, i), 
                e + 1 <= this._h && a.texSubImage2D(3553, 0, t, e + 1, 6408, 5121, i), a.texSubImage2D(3553, 0, t, e, 6408, 5121, i), 
                s && n && dt.bindTexture(a, s, n);
            }
        }, i.texSubImage2DPixel = function(t, e, i, r, a) {
            var s = ft.mainContext, n = dt.curBindTexTarget, h = dt.curBindTexValue;
            dt.bindTexture(s, 3553, this._source);
            var l = new Uint8Array(a.data);
            s.texSubImage2D(3553, 0, t, e, i, r, 6408, 5121, l), n && h && dt.bindTexture(s, n, h);
        }, s(0, i, "width", t.prototype._$get_width, function(t) {
            this._w = t;
        }), s(0, i, "height", t.prototype._$get_height, function(t) {
            this._h = t;
        }), e;
    }(o), Nt = function(t) {
        function e() {
            e.__super.call(this);
        }
        a(e, "laya.webgl.resource.WebGLCanvas", t);
        var i = e.prototype;
        return i.getCanvas = function() {
            return this._canvas;
        }, i.clear = function() {
            this._ctx && this._ctx.clear();
        }, i.destroy = function() {
            this._ctx && this._ctx.destroy(), this._ctx = null;
        }, i._setContext = function(t) {
            this._ctx = t;
        }, i.getContext = function(t, i) {
            return this._ctx ? this._ctx : this._ctx = e._createContext(this);
        }, i.size = function(t, e) {
            this._w == t && this._h == e || (this._w = t, this._h = e, this._ctx && this._ctx.size(t, e), 
            this._canvas && (this._canvas.height = e, this._canvas.width = t));
        }, i.recreateResource = function() {
            this.startCreate(), this.createWebGlTexture(), this.completeCreate();
        }, i.detoryResource = function() {
            this._source && !this.iscpuSource && (ft.mainContext.deleteTexture(this._source), 
            this._source = null, this.memorySize = 0);
        }, i.createWebGlTexture = function() {
            var t = ft.mainContext;
            if (!this._canvas) throw "create GLTextur err:no data:" + this._canvas;
            var e = this._source = t.createTexture();
            this.iscpuSource = !1;
            var i = dt.curBindTexTarget, r = dt.curBindTexValue;
            dt.bindTexture(t, 3553, e), t.texImage2D(3553, 0, 6408, 6408, 5121, this._canvas), 
            t.texParameteri(3553, 10240, 9729), t.texParameteri(3553, 10241, 9729), t.texParameteri(3553, 10242, 33071), 
            t.texParameteri(3553, 10243, 33071), this.memorySize = this._w * this._h * 4, i && r && dt.bindTexture(t, i, r);
        }, i.texSubImage2D = function(t, e, i) {
            var r = ft.mainContext, a = dt.curBindTexTarget, s = dt.curBindTexValue;
            dt.bindTexture(r, 3553, this._source), r.texSubImage2D(3553, 0, e, i, 6408, 5121, t._source), 
            a && s && dt.bindTexture(r, a, s);
        }, s(0, i, "context", function() {
            return this._ctx;
        }), s(0, i, "asBitmap", null, function(t) {
            this._ctx && (this._ctx.asBitmap = t);
        }), e._createContext = null, e;
    }(o), Ot = function(t) {
        function e(t, i) {
            this.CborderSize = 12, e.__super.call(this), this["char"] = t, this.isSpace = " " === t, 
            this.xs = i.scaleX, this.ys = i.scaleY, this.font = i.font.toString(), this.fontSize = i.font.size, 
            this.fillColor = i.fillColor, this.borderColor = i.borderColor, this.lineWidth = i.lineWidth;
            var r, a = y.isConchApp;
            a ? (r = ConchTextCanvas, r._source = ConchTextCanvas, r._source.canvas = ConchTextCanvas) : r = u.canvas.source, 
            this.canvas = r, this._enableMerageInAtlas = !0, a ? this._ctx = r : this._ctx = this.canvas.getContext("2d", void 0);
            var s = P.measureText(this["char"], this.font);
            this.cw = s.width * this.xs, this.ch = (s.height || this.fontSize) * this.ys, this.onresize(this.cw + 2 * this.CborderSize, this.ch + 2 * this.CborderSize), 
            this.texture = new L(this);
        }
        a(e, "laya.webgl.resource.WebGLCharImage", t);
        var r = e.prototype;
        return i.imps(r, {
            "laya.webgl.resource.IMergeAtlasBitmap": !0
        }), r.active = function() {
            this.texture.active();
        }, r.recreateResource = function() {
            this.startCreate();
            var t = y.isConchApp;
            if (this.onresize(this.cw + 2 * this.CborderSize, this.ch + 2 * this.CborderSize), 
            this.canvas && (this.canvas.height = this._h, this.canvas.width = this._w), t) {
                var e = this.fontSize;
                1 == this.xs && 1 == this.ys || (e = parseInt(e * (this.xs > this.ys ? this.xs : this.ys) + ""));
                var i = "normal 100 " + e + "px Arial";
                this.borderColor && (i += " 1 " + this.borderColor), this._ctx.font = i, this._ctx.textBaseline = "top", 
                this._ctx.fillStyle = this.fillColor, this._ctx.fillText(this["char"], this.CborderSize, this.CborderSize, null, null, null);
            } else this._ctx.save(), this._ctx.clearRect(0, 0, this.cw + 2 * this.CborderSize, this.ch + 2 * this.CborderSize), 
            this._ctx.font = this.font, this._ctx.textBaseline = "top", this._ctx.translate(this.CborderSize, this.CborderSize), 
            1 == this.xs && 1 == this.ys || this._ctx.scale(this.xs, this.ys), this.fillColor && this.borderColor ? (this._ctx.strokeStyle = this.borderColor, 
            this._ctx.lineWidth = this.lineWidth, this._ctx.strokeText(this["char"], 0, 0, null, null, 0, null), 
            this._ctx.fillStyle = this.fillColor, this._ctx.fillText(this["char"], 0, 0, null, null, null)) : -1 === this.lineWidth ? (this._ctx.fillStyle = this.fillColor ? this.fillColor : "white", 
            this._ctx.fillText(this["char"], 0, 0, null, null, null)) : (this._ctx.strokeStyle = this.borderColor ? this.borderColor : "white", 
            this._ctx.lineWidth = this.lineWidth, this._ctx.strokeText(this["char"], 0, 0, null, null, 0, null)), 
            this._ctx.restore();
            this.borderSize = this.CborderSize, this.completeCreate();
        }, r.onresize = function(t, e) {
            if (this._w = t, this._h = e, !(this._w < O.atlasLimitWidth && this._h < O.atlasLimitHeight)) throw this._allowMerageInAtlas = !1, 
            new Error("文字尺寸超出大图合集限制！");
            this._allowMerageInAtlas = !0;
        }, r.clearAtlasSource = function() {}, s(0, r, "allowMerageInAtlas", function() {
            return this._allowMerageInAtlas;
        }), s(0, r, "atlasSource", function() {
            return this.canvas;
        }), s(0, r, "enableMerageInAtlas", function() {
            return this._enableMerageInAtlas;
        }, function(t) {
            this._enableMerageInAtlas = t;
        }), e.createOneChar = function(t, i) {
            var r = new e(t, i);
            return r;
        }, e;
    }(o), Vt = function(t) {
        function e(t, i, r, a, s, n, h, l, o) {
            void 0 === r && (r = 6408), void 0 === a && (a = 5121), void 0 === s && (s = 34041), 
            void 0 === n && (n = !1), void 0 === h && (h = !1), void 0 === l && (l = -1), void 0 === o && (o = 1), 
            e.__super.call(this), this._w = t, this._h = i, this._surfaceFormat = r, this._surfaceType = a, 
            this._depthStencilFormat = s, this._mipMap = n, this._repeat = h, this._minFifter = l, 
            this._magFifter = o;
        }
        a(e, "laya.webgl.resource.WebGLRenderTarget", t);
        var i = e.prototype;
        return i.recreateResource = function() {
            this.startCreate();
            var t = ft.mainContext;
            this._frameBuffer || (this._frameBuffer = t.createFramebuffer()), this._source || (this._source = t.createTexture());
            var e = dt.curBindTexTarget, i = dt.curBindTexValue;
            dt.bindTexture(t, 3553, this._source), t.texImage2D(3553, 0, 6408, this._w, this._h, 0, this._surfaceFormat, this._surfaceType, null);
            var r = this._minFifter, a = this._magFifter, s = this._repeat ? 10497 : 33071, n = h.isPOT(this._w, this._h);
            if (n ? (this._mipMap ? -1 !== r || (r = 9987) : -1 !== r || (r = 9729), -1 !== a || (a = 9729), 
            t.texParameteri(3553, 10241, r), t.texParameteri(3553, 10240, a), t.texParameteri(3553, 10242, s), 
            t.texParameteri(3553, 10243, s), this._mipMap && t.generateMipmap(3553)) : (-1 !== r || (r = 9729), 
            -1 !== a || (a = 9729), t.texParameteri(3553, 10241, r), t.texParameteri(3553, 10240, a), 
            t.texParameteri(3553, 10242, 33071), t.texParameteri(3553, 10243, 33071)), t.bindFramebuffer(36160, this._frameBuffer), 
            t.framebufferTexture2D(36160, 36064, 3553, this._source, 0), this._depthStencilFormat) switch (this._depthStencilBuffer || (this._depthStencilBuffer = t.createRenderbuffer()), 
            t.bindRenderbuffer(36161, this._depthStencilBuffer), t.renderbufferStorage(36161, this._depthStencilFormat, this._w, this._h), 
            this._depthStencilFormat) {
              case 33189:
                t.framebufferRenderbuffer(36160, 36096, 36161, this._depthStencilBuffer);
                break;

              case 36168:
                t.framebufferRenderbuffer(36160, 36128, 36161, this._depthStencilBuffer);
                break;

              case 34041:
                t.framebufferRenderbuffer(36160, 33306, 36161, this._depthStencilBuffer);
            }
            t.bindFramebuffer(36160, null), e && i && dt.bindTexture(t, e, i), t.bindRenderbuffer(36161, null), 
            this.memorySize = this._w * this._h * 4, this.completeCreate();
        }, i.detoryResource = function() {
            this._frameBuffer && (ft.mainContext.deleteTexture(this._source), ft.mainContext.deleteFramebuffer(this._frameBuffer), 
            ft.mainContext.deleteRenderbuffer(this._depthStencilBuffer), this._source = null, 
            this._frameBuffer = null, this._depthStencilBuffer = null, this.memorySize = 0);
        }, s(0, i, "depthStencilBuffer", function() {
            return this._depthStencilBuffer;
        }), s(0, i, "frameBuffer", function() {
            return this._frameBuffer;
        }), e;
    }(o), Ut = function(t) {
        function e(t, i, r, a, s, n, h) {
            this.offsetX = 0, this.offsetY = 0, e.__super.call(this), this.repeat = !0, this.mipmap = !1, 
            this.minFifter = -1, this.magFifter = -1, this.atlasImage = n, this.canvas = t, 
            this._ctx = t.getContext("2d", void 0), this._w = a, this._h = s, this.offsetX = i, 
            this.offsetY = r, this.src = h, this._enableMerageInAtlas = !0, O.enabled && this._w < O.atlasLimitWidth && this._h < O.atlasLimitHeight ? this._allowMerageInAtlas = !0 : this._allowMerageInAtlas = !1;
        }
        a(e, "laya.webgl.resource.WebGLSubImage", t);
        var r = e.prototype;
        return i.imps(r, {
            "laya.webgl.resource.IMergeAtlasBitmap": !0
        }), r.size = function(t, e) {
            this._w = t, this._h = e, this._ctx && this._ctx.size(t, e), this.canvas && (this.canvas.height = e, 
            this.canvas.width = t);
        }, r.recreateResource = function() {
            this.startCreate(), this.size(this._w, this._h), this._ctx.drawImage(this.atlasImage, this.offsetX, this.offsetY, this._w, this._h, 0, 0, this._w, this._h), 
            this._allowMerageInAtlas && this._enableMerageInAtlas ? this.memorySize = 0 : this.createWebGlTexture(), 
            this.completeCreate();
        }, r.createWebGlTexture = function() {
            var t = ft.mainContext;
            if (!this.canvas) throw "create GLTextur err:no data:" + this.canvas;
            var e = this._source = t.createTexture(), i = dt.curBindTexTarget, r = dt.curBindTexValue;
            dt.bindTexture(t, 3553, e), t.texImage2D(3553, 0, 6408, 6408, 5121, this.canvas);
            var a = this.minFifter, s = this.magFifter, n = this.repeat ? 10497 : 33071, l = h.isPOT(this.width, this.height);
            l ? (this.mipmap ? -1 !== a || (a = 9987) : -1 !== a || (a = 9729), -1 !== s || (s = 9729), 
            t.texParameteri(3553, 10240, s), t.texParameteri(3553, 10241, a), t.texParameteri(3553, 10242, n), 
            t.texParameteri(3553, 10243, n), this.mipmap && t.generateMipmap(3553)) : (-1 !== a || (a = 9729), 
            -1 !== s || (s = 9729), t.texParameteri(3553, 10241, a), t.texParameteri(3553, 10240, s), 
            t.texParameteri(3553, 10242, 33071), t.texParameteri(3553, 10243, 33071)), i && r && dt.bindTexture(t, i, r), 
            this.canvas = null, this.memorySize = this._w * this._h * 4;
        }, r.detoryResource = function() {
            O.enabled && this._allowMerageInAtlas || !this._source || (ft.mainContext.deleteTexture(this._source), 
            this._source = null, this.memorySize = 0);
        }, r.clearAtlasSource = function() {}, r.dispose = function() {
            this.resourceManager.removeResource(this), t.prototype.dispose.call(this);
        }, s(0, r, "allowMerageInAtlas", function() {
            return this._allowMerageInAtlas;
        }), s(0, r, "atlasSource", function() {
            return this.canvas;
        }), s(0, r, "enableMerageInAtlas", function() {
            return this._allowMerageInAtlas;
        }, function(t) {
            this._allowMerageInAtlas = t;
        }), e;
    }(o), Ht = function(t) {
        function e(t, i, r, a) {
            if (this.customCompile = !1, this._curActTexIndex = 0, this.tag = {}, this._program = null, 
            this._params = null, this._paramsMap = {}, this._offset = 0, e.__super.call(this), 
            !t || !i) throw "Shader Error";
            (y.isConchApp || y.isFlash) && (this.customCompile = !0), this._id = ++e._count, 
            this._vs = t, this._ps = i, this._nameMap = a ? a : {}, null != r && (e.sharders[r] = this);
        }
        a(e, "laya.webgl.shader.Shader", t);
        var i = e.prototype;
        return i.recreateResource = function() {
            this.startCreate(), this._compile(), this.completeCreate(), this.memorySize = 0;
        }, i.detoryResource = function() {
            ft.mainContext.deleteShader(this._vshader), ft.mainContext.deleteShader(this._pshader), 
            ft.mainContext.deleteProgram(this._program), this._vshader = this._pshader = this._program = null, 
            this._params = null, this._paramsMap = {}, this.memorySize = 0, this._curActTexIndex = 0;
        }, i._compile = function() {
            if (this._vs && this._ps && !this._params) {
                this._reCompile = !0, this._params = [];
                var t, i = [ this._vs, this._ps ];
                this.customCompile && (t = this._preGetParams(this._vs, this._ps));
                var r = ft.mainContext;
                if (this._program = r.createProgram(), this._vshader = e._createShader(r, i[0], 35633), 
                this._pshader = e._createShader(r, i[1], 35632), r.attachShader(this._program, this._vshader), 
                r.attachShader(this._program, this._pshader), r.linkProgram(this._program), !this.customCompile && !r.getProgramParameter(this._program, 35714)) throw r.getProgramInfoLog(this._program);
                var a, s, n = 0, h = 0, l = this.customCompile ? t.attributes.length : r.getProgramParameter(this._program, 35721);
                for (n = 0; l > n; n++) {
                    var o = this.customCompile ? t.attributes[n] : r.getActiveAttrib(this._program, n);
                    s = r.getAttribLocation(this._program, o.name), a = {
                        vartype: "attribute",
                        ivartype: 0,
                        attrib: o,
                        location: s,
                        name: o.name,
                        type: o.type,
                        isArray: !1,
                        isSame: !1,
                        preValue: null,
                        indexOfParams: 0
                    }, this._params.push(a);
                }
                var u = this.customCompile ? t.uniforms.length : r.getProgramParameter(this._program, 35718);
                for (n = 0; u > n; n++) {
                    var _ = this.customCompile ? t.uniforms[n] : r.getActiveUniform(this._program, n);
                    s = r.getUniformLocation(this._program, _.name), a = {
                        vartype: "uniform",
                        ivartype: 1,
                        attrib: o,
                        location: s,
                        name: _.name,
                        type: _.type,
                        isArray: !1,
                        isSame: !1,
                        preValue: null,
                        indexOfParams: 0
                    }, a.name.indexOf("[0]") > 0 && (a.name = a.name.substr(0, a.name.length - 3), a.isArray = !0, 
                    a.location = r.getUniformLocation(this._program, a.name)), this._params.push(a);
                }
                for (n = 0, h = this._params.length; h > n; n++) if (a = this._params[n], a.indexOfParams = n, 
                a.index = 1, a.value = [ a.location, null ], a.codename = a.name, a.name = this._nameMap[a.codename] ? this._nameMap[a.codename] : a.codename, 
                this._paramsMap[a.name] = a, a._this = this, a.uploadedValue = [], "attribute" !== a.vartype) switch (a.type) {
                  case 5124:
                    a.fun = a.isArray ? this._uniform1iv : this._uniform1i;
                    break;

                  case 5126:
                    a.fun = a.isArray ? this._uniform1fv : this._uniform1f;
                    break;

                  case 35664:
                    a.fun = a.isArray ? this._uniform_vec2v : this._uniform_vec2;
                    break;

                  case 35665:
                    a.fun = a.isArray ? this._uniform_vec3v : this._uniform_vec3;
                    break;

                  case 35666:
                    a.fun = a.isArray ? this._uniform_vec4v : this._uniform_vec4;
                    break;

                  case 35678:
                    a.fun = this._uniform_sampler2D;
                    break;

                  case 35680:
                    a.fun = this._uniform_samplerCube;
                    break;

                  case 35676:
                    a.fun = this._uniformMatrix4fv;
                    break;

                  case 35670:
                    a.fun = this._uniform1i;
                    break;

                  case 35674:
                  case 35675:
                    throw new Error("compile shader err!");

                  default:
                    throw new Error("compile shader err!");
                } else a.fun = this._attribute;
            }
        }, i.getUniform = function(t) {
            return this._paramsMap[t];
        }, i._attribute = function(t, e) {
            var i = ft.mainContext;
            return i.enableVertexAttribArray(t.location), i.vertexAttribPointer(t.location, e[0], e[1], e[2], e[3], e[4] + this._offset), 
            2;
        }, i._uniform1f = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e ? (ft.mainContext.uniform1f(t.location, i[0] = e), 1) : 0;
        }, i._uniform1fv = function(t, e) {
            if (e.length < 4) {
                var i = t.uploadedValue;
                return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (ft.mainContext.uniform1fv(t.location, e), 
                i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3], 1) : 0;
            }
            return ft.mainContext.uniform1fv(t.location, e), 1;
        }, i._uniform_vec2 = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] ? (ft.mainContext.uniform2f(t.location, i[0] = e[0], i[1] = e[1]), 
            1) : 0;
        }, i._uniform_vec2v = function(t, e) {
            if (e.length < 2) {
                var i = t.uploadedValue;
                return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (ft.mainContext.uniform2fv(t.location, e), 
                i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3], 1) : 0;
            }
            return ft.mainContext.uniform2fv(t.location, e), 1;
        }, i._uniform_vec3 = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] ? (ft.mainContext.uniform3f(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2]), 
            1) : 0;
        }, i._uniform_vec3v = function(t, e) {
            return ft.mainContext.uniform3fv(t.location, e), 1;
        }, i._uniform_vec4 = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (ft.mainContext.uniform4f(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3]), 
            1) : 0;
        }, i._uniform_vec4v = function(t, e) {
            return ft.mainContext.uniform4fv(t.location, e), 1;
        }, i._uniformMatrix2fv = function(t, e) {
            return ft.mainContext.uniformMatrix2fv(t.location, !1, e), 1;
        }, i._uniformMatrix3fv = function(t, e) {
            return ft.mainContext.uniformMatrix3fv(t.location, !1, e), 1;
        }, i._uniformMatrix4fv = function(t, e) {
            return ft.mainContext.uniformMatrix4fv(t.location, !1, e), 1;
        }, i._uniform1i = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e ? (ft.mainContext.uniform1i(t.location, i[0] = e), 1) : 0;
        }, i._uniform1iv = function(t, e) {
            return ft.mainContext.uniform1iv(t.location, e), 1;
        }, i._uniform_ivec2 = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] ? (ft.mainContext.uniform2i(t.location, i[0] = e[0], i[1] = e[1]), 
            1) : 0;
        }, i._uniform_ivec2v = function(t, e) {
            return ft.mainContext.uniform2iv(t.location, e), 1;
        }, i._uniform_vec3i = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] ? (ft.mainContext.uniform3i(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2]), 
            1) : 0;
        }, i._uniform_vec3vi = function(t, e) {
            return ft.mainContext.uniform3iv(t.location, e), 1;
        }, i._uniform_vec4i = function(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (ft.mainContext.uniform4i(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3]), 
            1) : 0;
        }, i._uniform_vec4vi = function(t, e) {
            return ft.mainContext.uniform4iv(t.location, e), 1;
        }, i._uniform_sampler2D = function(t, i) {
            var r = ft.mainContext, a = t.uploadedValue;
            return null == a[0] ? (a[0] = this._curActTexIndex, r.uniform1i(t.location, this._curActTexIndex), 
            r.activeTexture(e._TEXTURES[this._curActTexIndex]), dt.bindTexture(r, 3553, i), 
            this._curActTexIndex++, 1) : (r.activeTexture(e._TEXTURES[a[0]]), dt.bindTexture(r, 3553, i), 
            0);
        }, i._uniform_samplerCube = function(t, i) {
            var r = ft.mainContext, a = t.uploadedValue;
            return null == a[0] ? (a[0] = this._curActTexIndex, r.uniform1i(t.location, this._curActTexIndex), 
            r.activeTexture(e._TEXTURES[this._curActTexIndex]), dt.bindTexture(r, 34067, i), 
            this._curActTexIndex++, 1) : (r.activeTexture(e._TEXTURES[a[0]]), dt.bindTexture(r, 34067, i), 
            0);
        }, i._noSetValue = function(t) {
            console.log("no....:" + t.name);
        }, i.uploadOne = function(t, e) {
            this.activeResource(), dt.UseProgram(this._program);
            var i = this._paramsMap[t];
            i.fun.call(this, i, e);
        }, i.uploadTexture2D = function(t) {
            I.shaderCall++;
            var e = ft.mainContext;
            e.activeTexture(33984), dt.bindTexture(e, 3553, t);
        }, i.upload = function(t, e) {
            Rt.activeShader = this, Rt.bindShader = this, this.activeResource(), dt.UseProgram(this._program), 
            this._reCompile ? (e = this._params, this._reCompile = !1) : e = e || this._params;
            for (var i, r, a = e.length, s = 0, n = 0; a > n; n++) i = e[n], null !== (r = t[i.name]) && (s += i.fun.call(this, i, r));
            I.shaderCall += s;
        }, i.uploadArray = function(t, e, i) {
            Rt.activeShader = this, Rt.bindShader = this, this.activeResource(), dt.UseProgram(this._program);
            for (var r, a, s = (this._params, 0), n = e - 2; n >= 0; n -= 2) a = this._paramsMap[t[n]], 
            a && (r = t[n + 1], null != r && (i && i[a.name] && i[a.name].bind(), s += a.fun.call(this, a, r)));
            I.shaderCall += s;
        }, i.getParams = function() {
            return this._params;
        }, i._preGetParams = function(t, e) {
            var i = [ t, e ], r = {}, a = [], s = [], n = {}, h = [];
            r.attributes = a, r.uniforms = s, r.defines = n;
            for (var l = new RegExp("(/\\*([^*]|[\\r\\\n]|(\\*+([^*/]|[\\r\\n])))*\\*+/)|(//.*)", "g"), o = new RegExp("(\".*\")|('.*')|([#\\w\\*-\\.+/()=<>{}\\\\]+)|([,;:\\\\])", "g"), u = 0, _ = 0, c = 0; 2 > c; c++) {
                i[c] = i[c].replace(l, "");
                var f, d = i[c].match(o);
                for (u = 0, _ = d.length; _ > u; u++) {
                    var m = d[u];
                    if ("attribute" == m || "uniform" == m) u = this.parseOne(a, s, d, u, m, !0); else {
                        if ("#define" == m) {
                            m = d[++u], h[m] = 1;
                            continue;
                        }
                        if ("#ifdef" == m) {
                            f = d[++u];
                            n[f] = n[f] || [];
                            for (u++; _ > u; u++) if (m = d[u], "attribute" == m || "uniform" == m) u = this.parseOne(a, s, d, u, m, h[f]); else if ("#else" == m) for (u++; _ > u; u++) if (m = d[u], 
                            "attribute" == m || "uniform" == m) u = this.parseOne(a, s, d, u, m, !h[f]); else if ("#endif" == m) break;
                        }
                    }
                }
            }
            return r;
        }, i.parseOne = function(t, i, r, a, s, n) {
            var h = {
                type: e.shaderParamsMap[r[a + 1]],
                name: r[a + 2],
                size: isNaN(parseInt(r[a + 3])) ? 1 : parseInt(r[a + 3])
            };
            return n && ("attribute" == s ? t.push(h) : i.push(h)), ":" == r[a + 3] && (h.type = r[a + 4], 
            a += 2), a += 2;
        }, i.dispose = function() {
            this.resourceManager.removeResource(this), laya.resource.Resource.prototype.dispose.call(this);
        }, e.getShader = function(t) {
            return e.sharders[t];
        }, e.create = function(t, i, r, a) {
            return new e(t, i, r, a);
        }, e.withCompile = function(t, i, r, a) {
            if (r && e.sharders[r]) return e.sharders[r];
            var s = e._preCompileShader[2e-4 * t];
            if (!s) throw new Error("withCompile shader err!" + t);
            return s.createShader(i, r, a);
        }, e.withCompile2D = function(t, i, r, a, s) {
            if (a && e.sharders[a]) return e.sharders[a];
            var n = e._preCompileShader[2e-4 * t + i];
            if (!n) throw new Error("withCompile shader err!" + t + " " + i);
            return n.createShader(r, a, s);
        }, e.addInclude = function(t, i) {
            if (!i || 0 === i.length) throw new Error("add shader include file err:" + t);
            if (e._includeFiles[t]) throw new Error("add shader include file err, has add:" + t);
            e._includeFiles[t] = i;
        }, e.preCompile = function(t, i, r, a) {
            var s = 2e-4 * t;
            e._preCompileShader[s] = new ct(s, i, r, a, e._includeFiles);
        }, e.preCompile2D = function(t, i, r, a, s) {
            var n = 2e-4 * t + i;
            e._preCompileShader[n] = new ct(n, r, a, s, e._includeFiles);
        }, e._createShader = function(t, e, i) {
            var r = t.createShader(i);
            if (t.shaderSource(r, e), t.compileShader(r), !t.getShaderParameter(r, 35713)) throw t.getShaderInfoLog(r);
            return r;
        }, e._TEXTURES = [ 33984, 33985, 33986, 33987, 33988, 33989, 33990, , 33991, 33992 ], 
        e._includeFiles = {}, e._count = 0, e._preCompileShader = {}, e.SHADERNAME2ID = 2e-4, 
        e.sharders = (e.sharders = [], e.sharders.length = 32, e.sharders), r(e, [ "shaderParamsMap", function() {
            return this.shaderParamsMap = {
                float: 5126,
                int: 5124,
                bool: 35670,
                vec2: 35664,
                vec3: 35665,
                vec4: 35666,
                ivec2: 35667,
                ivec3: 35668,
                ivec4: 35669,
                bvec2: 35671,
                bvec3: 35672,
                bvec4: 35673,
                mat2: 35674,
                mat3: 35675,
                mat4: 35676,
                sampler2D: 35678,
                samplerCube: 35680
            };
        }, "nameKey", function() {
            return this.nameKey = new C();
        } ]), e;
    }(Rt), kt = function(t) {
        function e() {
            this._maxsize = 0, this._upload = !0, this._uploadSize = 0, e.__super.call(this), 
            this.lock = !0;
        }
        a(e, "laya.webgl.utils.Buffer2D", t);
        var i = e.prototype;
        return i._bufferData = function() {
            this._maxsize = Math.max(this._maxsize, this._byteLength), I.loopCount % 30 == 0 && (this._buffer.byteLength > this._maxsize + 64 && (this.memorySize = this._buffer.byteLength, 
            this._buffer = this._buffer.slice(0, this._maxsize + 64), this._checkArrayUse()), 
            this._maxsize = this._byteLength), this._uploadSize < this._buffer.byteLength && (this._uploadSize = this._buffer.byteLength, 
            Ct._gl.bufferData(this._bufferType, this._uploadSize, this._bufferUsage), this.memorySize = this._uploadSize), 
            Ct._gl.bufferSubData(this._bufferType, 0, this._buffer);
        }, i._bufferSubData = function(t, e, i) {
            if (void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), this._maxsize = Math.max(this._maxsize, this._byteLength), 
            I.loopCount % 30 == 0 && (this._buffer.byteLength > this._maxsize + 64 && (this.memorySize = this._buffer.byteLength, 
            this._buffer = this._buffer.slice(0, this._maxsize + 64), this._checkArrayUse()), 
            this._maxsize = this._byteLength), this._uploadSize < this._buffer.byteLength && (this._uploadSize = this._buffer.byteLength, 
            Ct._gl.bufferData(this._bufferType, this._uploadSize, this._bufferUsage), this.memorySize = this._uploadSize), 
            e || i) {
                var r = this._buffer.slice(e, i);
                Ct._gl.bufferSubData(this._bufferType, t, r);
            } else Ct._gl.bufferSubData(this._bufferType, t, this._buffer);
        }, i._checkArrayUse = function() {}, i._bind_upload = function() {
            return this._upload ? (this._upload = !1, this._bind(), this._bufferData(), !0) : !1;
        }, i._bind_subUpload = function(t, e, i) {
            return void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), 
            this._upload ? (this._upload = !1, this._bind(), this._bufferSubData(t, e, i), !0) : !1;
        }, i._resizeBuffer = function(t, e) {
            if (t < this._buffer.byteLength) return this;
            if (this.memorySize = t, e && this._buffer && this._buffer.byteLength > 0) {
                var i = new ArrayBuffer(t), r = new Uint8Array(i);
                r.set(new Uint8Array(this._buffer), 0), this._buffer = i;
            } else this._buffer = new ArrayBuffer(t);
            return this._checkArrayUse(), this._upload = !0, this;
        }, i.append = function(t) {
            this._upload = !0;
            var e, i = 0;
            i = t.byteLength, t instanceof Uint8Array ? (this._resizeBuffer(this._byteLength + i, !0), 
            e = new Uint8Array(this._buffer, this._byteLength)) : t instanceof Uint16Array ? (this._resizeBuffer(this._byteLength + i, !0), 
            e = new Uint16Array(this._buffer, this._byteLength)) : t instanceof Float32Array && (this._resizeBuffer(this._byteLength + i, !0), 
            e = new Float32Array(this._buffer, this._byteLength)), e.set(t, 0), this._byteLength += i, 
            this._checkArrayUse();
        }, i.appendEx = function(t, e) {
            this._upload = !0;
            var i, r = 0;
            r = t.byteLength, this._resizeBuffer(this._byteLength + r, !0), i = new e(this._buffer, this._byteLength), 
            i.set(t, 0), this._byteLength += r, this._checkArrayUse();
        }, i.appendEx2 = function(t, e, i, r) {
            void 0 === r && (r = 1), this._upload = !0;
            var a, s = 0;
            s = i * r, this._resizeBuffer(this._byteLength + s, !0), a = new e(this._buffer, this._byteLength);
            var n = 0;
            for (n = 0; i > n; n++) a[n] = t[n];
            this._byteLength += s, this._checkArrayUse();
        }, i.getBuffer = function() {
            return this._buffer;
        }, i.setNeedUpload = function() {
            this._upload = !0;
        }, i.getNeedUpload = function() {
            return this._upload;
        }, i.upload = function() {
            var t = this._bind_upload();
            return Ct._gl.bindBuffer(this._bufferType, null), Ct._bindActive[this._bufferType] = null, 
            Rt.activeShader = null, t;
        }, i.subUpload = function(t, e, i) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0);
            var r = this._bind_subUpload();
            return Ct._gl.bindBuffer(this._bufferType, null), Ct._bindActive[this._bufferType] = null, 
            Rt.activeShader = null, r;
        }, i.detoryResource = function() {
            t.prototype.detoryResource.call(this), this._upload = !0, this._uploadSize = 0;
        }, i.clear = function() {
            this._byteLength = 0, this._upload = !0;
        }, s(0, i, "bufferLength", function() {
            return this._buffer.byteLength;
        }), s(0, i, "byteLength", t.prototype._$get_byteLength, function(t) {
            this._byteLength !== t && (t <= this._buffer.byteLength || this._resizeBuffer(2 * t + 256, !0), 
            this._byteLength = t);
        }), e.__int__ = function(t) {
            Wt.QuadrangleIB = Wt.create(35044), ut.fillIBQuadrangle(Wt.QuadrangleIB, 16);
        }, e.FLOAT32 = 4, e.SHORT = 2, e;
    }(Ct), Gt = (function(t) {
        function e(t) {
            this.u_blurX = !1, this.u_color = null, this.u_offset = null, this.u_strength = NaN, 
            this.u_texW = 0, this.u_texH = 0, e.__super.call(this, 9);
        }
        a(e, "laya.webgl.shader.d2.value.GlowSV", t);
        var i = e.prototype;
        return i.setValue = function(e) {
            t.prototype.setValue.call(this, e);
        }, i.clear = function() {
            t.prototype.clear.call(this);
        }, e;
    }(Ft), function(t) {
        function e(t) {
            e.__super.call(this, 64), this.defines.add(64);
        }
        a(e, "laya.webgl.shader.d2.value.TextSV", t);
        var i = e.prototype;
        return i.release = function() {
            e.pool[e._length++] = this, this.clear();
        }, i.clear = function() {
            t.prototype.clear.call(this);
        }, e.create = function() {
            return e._length ? e.pool[--e._length] : new e(null);
        }, e.pool = [], e._length = 0, e;
    }(Ft)), zt = function(t) {
        function e(t, i, r, a) {
            this._params2dQuick1 = null, this._params2dQuick2 = null, this._shaderValueWidth = NaN, 
            this._shaderValueHeight = NaN, e.__super.call(this, t, i, r, a);
        }
        a(e, "laya.webgl.shader.d2.Shader2X", t);
        var i = e.prototype;
        return i.upload2dQuick1 = function(t) {
            this.upload(t, this._params2dQuick1 || this._make2dQuick1());
        }, i._make2dQuick1 = function() {
            if (!this._params2dQuick1) {
                this.activeResource(), this._params2dQuick1 = [];
                for (var t, e = this._params, i = 0, r = e.length; r > i; i++) t = e[i], (y.isFlash || "size" !== t.name && "position" !== t.name && "texcoord" !== t.name) && this._params2dQuick1.push(t);
            }
            return this._params2dQuick1;
        }, i.detoryResource = function() {
            t.prototype.detoryResource.call(this), this._params2dQuick1 = null, this._params2dQuick2 = null;
        }, i.upload2dQuick2 = function(t) {
            this.upload(t, this._params2dQuick2 || this._make2dQuick2());
        }, i._make2dQuick2 = function() {
            if (!this._params2dQuick2) {
                this.activeResource(), this._params2dQuick2 = [];
                for (var t, e = this._params, i = 0, r = e.length; r > i; i++) t = e[i], (y.isFlash || "size" !== t.name) && this._params2dQuick2.push(t);
            }
            return this._params2dQuick2;
        }, e.create = function(t, i, r, a) {
            return new e(t, i, r, a);
        }, e;
    }(Ht), Wt = function(t) {
        function e(t) {
            this._uint8Array = null, this._uint16Array = null, void 0 === t && (t = 35044), 
            e.__super.call(this), this._bufferUsage = t, this._bufferType = 34963, y.isFlash || (this._buffer = new ArrayBuffer(8));
        }
        a(e, "laya.webgl.utils.IndexBuffer2D", t);
        var i = e.prototype;
        return i._checkArrayUse = function() {
            this._uint8Array && (this._uint8Array = new Uint8Array(this._buffer)), this._uint16Array && (this._uint16Array = new Uint16Array(this._buffer));
        }, i.getUint8Array = function() {
            return this._uint8Array || (this._uint8Array = new Uint8Array(this._buffer));
        }, i.getUint16Array = function() {
            return this._uint16Array || (this._uint16Array = new Uint16Array(this._buffer));
        }, e.QuadrangleIB = null, e.create = function(t) {
            return void 0 === t && (t = 35044), new e(t);
        }, e;
    }(kt), Xt = function(t) {
        function e(t, i) {
            this._floatArray32 = null, this._vertexStride = 0, e.__super.call(this), this._vertexStride = t, 
            this._bufferUsage = i, this._bufferType = 34962, y.isFlash || (this._buffer = new ArrayBuffer(8)), 
            this.getFloat32Array();
        }
        a(e, "laya.webgl.utils.VertexBuffer2D", t);
        var i = e.prototype;
        return i.getFloat32Array = function() {
            return this._floatArray32 || (this._floatArray32 = new Float32Array(this._buffer));
        }, i.bind = function(t) {
            t && t._bind(), this._bind();
        }, i.insertData = function(t, e) {
            var i = this.getFloat32Array();
            i.set(t, e), this._upload = !0;
        }, i.bind_upload = function(t) {
            t._bind_upload() || t._bind(), this._bind_upload() || this._bind();
        }, i._checkArrayUse = function() {
            this._floatArray32 && (this._floatArray32 = new Float32Array(this._buffer));
        }, i.detoryResource = function() {
            t.prototype.detoryResource.call(this);
            for (var e = 0; 10 > e; e++) ft.mainContext.disableVertexAttribArray(e);
        }, s(0, i, "vertexStride", function() {
            return this._vertexStride;
        }), e.create = function(t, i) {
            return void 0 === i && (i = 35048), new e(t, i);
        }, e;
    }(kt), Yt = function(t) {
        function e(t, i) {
            this._image = null, this._allowMerageInAtlas = !1, this._enableMerageInAtlas = !1, 
            this.repeat = !1, this.mipmap = !1, this.minFifter = 0, this.magFifter = 0, e.__super.call(this, t, i), 
            this.repeat = !1, this.mipmap = !1, this.minFifter = -1, this.magFifter = -1, "string" == typeof t ? (this._src = t, 
            this._image = new u.window.Image(), i && (i.onload && (this.onload = i.onload), 
            i.onerror && (this.onerror = i.onerror), i.onCreate && i.onCreate(this)), this._image.crossOrigin = t && 0 == t.indexOf("data:") ? null : "", 
            t && (this._image.src = t)) : (this._src = i, this._image = t.source, this.onresize()), 
            this._enableMerageInAtlas = !0;
        }
        a(e, "laya.webgl.resource.WebGLImage", t);
        var r = e.prototype;
        return i.imps(r, {
            "laya.webgl.resource.IMergeAtlasBitmap": !0
        }), r._init_ = function(t, e) {}, r._createWebGlTexture = function() {
            if (!this._image) throw "create GLTextur err:no data:" + this._image;
            var t = ft.mainContext, e = this._source = t.createTexture(), i = dt.curBindTexTarget, r = dt.curBindTexValue;
            dt.bindTexture(t, 3553, e), t.texImage2D(3553, 0, 6408, 6408, 5121, this._image);
            var a = this.minFifter, s = this.magFifter, n = this.repeat ? 10497 : 33071, l = h.isPOT(this._w, this._h);
            l ? (this.mipmap ? -1 !== a || (a = 9987) : -1 !== a || (a = 9729), -1 !== s || (s = 9729), 
            t.texParameteri(3553, 10241, a), t.texParameteri(3553, 10240, s), t.texParameteri(3553, 10242, n), 
            t.texParameteri(3553, 10243, n), this.mipmap && t.generateMipmap(3553)) : (-1 !== a || (a = 9729), 
            -1 !== s || (s = 9729), t.texParameteri(3553, 10241, a), t.texParameteri(3553, 10240, s), 
            t.texParameteri(3553, 10242, 33071), t.texParameteri(3553, 10243, 33071)), i && r && dt.bindTexture(t, i, r), 
            this._image.onload = null, this._image = null, l ? this.memorySize = this._w * this._h * 4 * (1 + 1 / 3) : this.memorySize = this._w * this._h * 4, 
            this._recreateLock = !1;
        }, r.recreateResource = function() {
            var t = this;
            if (null != this._src && "" !== this._src) if (this._needReleaseAgain = !1, this._image) {
                if (this._recreateLock) return;
                this.startCreate(), this._allowMerageInAtlas && this._enableMerageInAtlas ? (this.memorySize = 0, 
                this._recreateLock = !1) : this._createWebGlTexture(), this.completeCreate();
            } else {
                this._recreateLock = !0, this.startCreate();
                var e = this;
                this._image = new u.window.Image(), this._image.crossOrigin = 0 == this._src.indexOf("data:") ? null : "", 
                this._image.onload = function() {
                    return e._needReleaseAgain ? (e._needReleaseAgain = !1, e._image.onload = null, 
                    void (e._image = null)) : (e._allowMerageInAtlas && e._enableMerageInAtlas ? (t.memorySize = 0, 
                    t._recreateLock = !1) : e._createWebGlTexture(), void e.completeCreate());
                }, this._image.src = this._src;
            }
        }, r.detoryResource = function() {
            this._recreateLock && (this._needReleaseAgain = !0), this._source && (ft.mainContext.deleteTexture(this._source), 
            this._source = null, this._image = null, this.memorySize = 0);
        }, r.onresize = function() {
            this._w = this._image.width, this._h = this._image.height, O.enabled && this._w < O.atlasLimitWidth && this._h < O.atlasLimitHeight ? this._allowMerageInAtlas = !0 : this._allowMerageInAtlas = !1;
        }, r.clearAtlasSource = function() {
            this._image = null;
        }, s(0, r, "image", function() {
            return this._image;
        }), s(0, r, "allowMerageInAtlas", function() {
            return this._allowMerageInAtlas;
        }), s(0, r, "atlasSource", function() {
            return this._image;
        }), s(0, r, "enableMerageInAtlas", function() {
            return this._enableMerageInAtlas;
        }, function(t) {
            this._enableMerageInAtlas = t;
        }), s(0, r, "onload", null, function(t) {
            var e = this;
            this._onload = t, this._image && (this._image.onload = null != this._onload ? function() {
                e.onresize(), e._onload();
            } : null);
        }), s(0, r, "onerror", null, function(t) {
            var e = this;
            this._onerror = t, this._image && (this._image.onerror = null != this._onerror ? function() {
                e._onerror();
            } : null);
        }), e;
    }(g);
    i.__init([ ht, N, pt, ct ]);
}(window, document, Laya);