!function(t, e, i) {
    var r = (i.un, i.uns, i["static"], i["class"]), a = i.getset, n = (i.__newvec, laya.webgl.canvas.BlendMode), l = (laya.utils.Browser, 
    laya.utils.Color), s = laya.filters.ColorFilterAction, o = laya.filters.webgl.ColorFilterActionGL, u = laya.filters.Filter, c = laya.filters.webgl.FilterActionGL, h = laya.maths.Matrix, d = (laya.maths.Rectangle, 
    laya.renders.Render), f = (laya.renders.RenderContext, laya.webgl.resource.RenderTarget2D), _ = laya.utils.RunDriver, g = (laya.webgl.shader.d2.ShaderDefines2D, 
    laya.display.Sprite, laya.webgl.submit.SubmitCMD), y = laya.resource.Texture, b = laya.webgl.shader.d2.value.Value2D, p = function() {
        function t() {
            this.data = null;
        }
        r(t, "laya.filters.FilterAction");
        var e = t.prototype;
        return i.imps(e, {
            "laya.filters.IFilterAction": !0
        }), e.apply = function(t) {
            return null;
        }, t;
    }(), w = function() {
        function t() {}
        return r(t, "laya.filters.WebGLFilter"), t.enable = function() {
            t.isInit || (t.isInit = !0, d.isWebGL && (_.createFilterAction = function(t) {
                var e;
                switch (t) {
                  case 32:
                    e = new o();
                    break;

                  case 16:
                    e = new v();
                    break;

                  case 8:
                    e = new x();
                }
                return e;
            }));
        }, t.isInit = !1, t.__init$ = function() {
            _.createFilterAction = function(t) {
                var e;
                switch (t) {
                  case 16:
                    e = new p();
                    break;

                  case 8:
                    e = new p();
                    break;

                  case 32:
                    e = new s();
                }
                return e;
            };
        }, t;
    }(), v = (function(t) {
        function e(t) {
            this.strength = NaN, e.__super.call(this), void 0 === t && (t = 4), d.isWebGL && w.enable(), 
            this.strength = t, this._action = _.createFilterAction(16), this._action.data = this;
        }
        r(e, "laya.filters.BlurFilter", t);
        var i = e.prototype;
        return i.callNative = function(t) {
            t.conchModel && t.conchModel.blurFilter && t.conchModel.blurFilter(this.strength);
        }, a(0, i, "action", function() {
            return this._action;
        }), a(0, i, "type", function() {
            return 16;
        }), e;
    }(u), function(t) {
        function e(t, i, r, a) {
            this._color = null, e.__super.call(this), this._elements = new Float32Array(9), 
            void 0 === i && (i = 4), void 0 === r && (r = 6), void 0 === a && (a = 6), d.isWebGL && w.enable(), 
            this._color = new l(t), this.blur = Math.min(i, 20), this.offX = r, this.offY = a, 
            this._action = _.createFilterAction(8), this._action.data = this;
        }
        r(e, "laya.filters.GlowFilter", t);
        var i = e.prototype;
        return i.getColor = function() {
            return this._color._color;
        }, i.callNative = function(t) {
            t.conchModel && t.conchModel.glowFilter && t.conchModel.glowFilter(this._color.strColor, this._elements[4], this._elements[5], this._elements[6]);
        }, a(0, i, "type", function() {
            return 8;
        }), a(0, i, "action", function() {
            return this._action;
        }), a(0, i, "offY", function() {
            return this._elements[6];
        }, function(t) {
            this._elements[6] = t;
        }), a(0, i, "offX", function() {
            return this._elements[5];
        }, function(t) {
            this._elements[5] = t;
        }), a(0, i, "blur", function() {
            return this._elements[4];
        }, function(t) {
            this._elements[4] = t;
        }), e;
    }(u), function(t) {
        function e() {
            this.data = null, e.__super.call(this);
        }
        r(e, "laya.filters.webgl.BlurFilterActionGL", t);
        var i = e.prototype;
        return i.setValueMix = function(t) {
            t.defines.add(this.data.type);
        }, i.apply3d = function(t, e, i, r, a) {
            var n = t.getValue("bounds"), l = b.create(1, 0);
            l.setFilters([ this.data ]);
            var s = h.EMPTY;
            s.identity(), i.ctx.drawTarget(t, 0, 0, n.width, n.height, h.EMPTY, "src", l), l.setFilters(null);
        }, i.setValue = function(t) {
            t.strength = this.data.strength;
        }, a(0, i, "typeMix", function() {
            return 16;
        }), e;
    }(c)), x = function(t) {
        function e() {
            this.data = null, this._initKey = !1, this._textureWidth = 0, this._textureHeight = 0, 
            e.__super.call(this);
        }
        r(e, "laya.filters.webgl.GlowFilterActionGL", t);
        var l = e.prototype;
        return i.imps(l, {
            "laya.filters.IFilterActionGL": !0
        }), l.setValueMix = function(t) {}, l.apply3d = function(t, i, r, a, l) {
            var s = t.getValue("bounds");
            t.addValue("color", this.data.getColor());
            var o = s.width, u = s.height;
            this._textureWidth = o, this._textureHeight = u;
            var c = g.create([ t, i, r, 0, 0 ], e.tmpTarget);
            r.ctx.addRenderObject(c);
            var d, f = h.TEMP;
            return f.identity(), d = b.create(1, 0), d.setFilters([ this.data ]), r.ctx.drawTarget(t, 0, 0, this._textureWidth, this._textureHeight, f, "src", d, null, n.TOINT.overlay), 
            c = g.create([ t, i, r, 0, 0 ], e.startOut), r.ctx.addRenderObject(c), d = b.create(1, 0), 
            r.ctx.drawTarget(t, 0, 0, this._textureWidth, this._textureHeight, f, "tmpTarget", d, y.INV_UV, n.TOINT.overlay), 
            d = b.create(1, 0), r.ctx.drawTarget(t, 0, 0, this._textureWidth, this._textureHeight, f, "src", d), 
            c = g.create([ t, i, r, 0, 0 ], e.recycleTarget), r.ctx.addRenderObject(c), null;
        }, l.setSpriteWH = function(t) {
            this._textureWidth = t.width, this._textureHeight = t.height;
        }, l.setValue = function(t) {
            t.u_offsetX = this.data.offX, t.u_offsetY = -this.data.offY, t.u_strength = 1, t.u_blurX = this.data.blur, 
            t.u_blurY = this.data.blur, t.u_textW = this._textureWidth, t.u_textH = this._textureHeight, 
            t.u_color = this.data.getColor();
        }, a(0, l, "typeMix", function() {
            return 8;
        }), e.tmpTarget = function(t, e, i, r, a) {
            var n = t.getValue("bounds"), l = t.getValue("out");
            l.end();
            var s = f.create(n.width, n.height);
            s.start();
            var o = t.getValue("color");
            o && s.clear(o[0], o[1], o[2], 0), t.addValue("tmpTarget", s);
        }, e.startOut = function(t, e, i, r, a) {
            var n = t.getValue("tmpTarget");
            n.end();
            var l = t.getValue("out");
            l.start();
            var s = t.getValue("color");
            s && l.clear(s[0], s[1], s[2], 0);
        }, e.recycleTarget = function(t, e, i, r, a) {
            var n = (t.getValue("src"), t.getValue("tmpTarget"));
            n.recycle();
        }, e;
    }(c);
    i.__init([ w ]);
}(window, document, Laya);