!function(window, document, Laya) {
    var __un = Laya.un, __uns = Laya.uns, __static = Laya["static"], __class = Laya["class"], __getset = Laya.getset, __newvec = Laya.__newvec, Browser = laya.utils.Browser, CSSStyle = laya.display.css.CSSStyle, ClassUtils = laya.utils.ClassUtils, Event = laya.events.Event, HTMLChar = laya.utils.HTMLChar, Loader = laya.net.Loader, Node = laya.display.Node, Rectangle = laya.maths.Rectangle, Render = laya.renders.Render, RenderContext = laya.renders.RenderContext, RenderSprite = laya.renders.RenderSprite, Sprite = laya.display.Sprite, Stat = laya.utils.Stat, Texture = laya.resource.Texture, URL = laya.net.URL, Utils = laya.utils.Utils, HTMLParse = function() {
        function t() {}
        return __class(t, "laya.html.utils.HTMLParse"), t.parse = function(e, i, n) {
            i = i.replace(/<br>/g, "<br/>"), i = "<root>" + i + "</root>", i = i.replace(t.spacePattern, t.char255);
            var s = Utils.parseXMLFromString(i);
            t._parseXML(e, s.childNodes[0].childNodes, n);
        }, t._parseXML = function(e, i, n, s) {
            var l = 0, r = 0;
            if (i.join || i.item) for (l = 0, r = i.length; r > l; ++l) t._parseXML(e, i[l], n, s); else {
                var a, h;
                if (3 == i.nodeType) {
                    var o;
                    return void (e instanceof laya.html.dom.HTMLDivElement ? (null == i.nodeName && (i.nodeName = "#text"), 
                    h = i.nodeName.toLowerCase(), o = i.textContent.replace(/^\s+|\s+$/g, ""), o.length > 0 && (a = ClassUtils.getInstance(h), 
                    a && (e.addChild(a), a.innerTEXT = o.replace(t.char255AndOneSpacePattern, " ")))) : (o = i.textContent.replace(/^\s+|\s+$/g, ""), 
                    o.length > 0 && (e.innerTEXT = o.replace(t.char255AndOneSpacePattern, " "))));
                }
                if (h = i.nodeName.toLowerCase(), "#comment" == h) return;
                if (a = ClassUtils.getInstance(h)) {
                    a = e.addChild(a), a.URI = n, a.href = s;
                    var _ = i.attributes;
                    if (_ && _.length > 0) for (l = 0, r = _.length; r > l; ++l) {
                        var u = _[l], d = u.nodeName, c = u.value;
                        a._setAttributes(d, c);
                    }
                    t._parseXML(a, i.childNodes, n, a.href);
                } else t._parseXML(e, i.childNodes, n, s);
            }
        }, t.char255 = String.fromCharCode(255), t.spacePattern = /&nbsp;|&#160;/g, t.char255AndOneSpacePattern = new RegExp(String.fromCharCode(255) + "|(\\s+)", "g"), 
        t;
    }(), Layout = function() {
        function t() {}
        return __class(t, "laya.html.utils.Layout"), t.later = function(e) {
            null == t._will && (t._will = [], Laya.stage.frameLoop(1, null, function() {
                if (!(t._will.length < 1)) {
                    for (var e = 0; e < t._will.length; e++) laya.html.utils.Layout.layout(t._will[e]);
                    t._will.length = 0;
                }
            })), t._will.push(e);
        }, t.layout = function(e) {
            if (!e || !e._style) return null;
            if (0 === (512 & e._style._type)) return null;
            e.getStyle()._type &= -513;
            var i = t._multiLineLayout(e);
            return Render.isConchApp && e.layaoutCallNative && e.layaoutCallNative(), i;
        }, t._multiLineLayout = function(e) {
            function i() {
                E.y = T, T += E.h + c, E.mWidth = I, I = 0, E = new LayoutLine(), M.push(E), E.h = 0, 
                v = 0, A = !0, C = !1;
            }
            var n = new Array();
            e._addChildsToLayout(n);
            var s, l, r, a, h, o = 0, _ = n.length, u = e._getCSSStyle(), d = u.letterSpacing, c = u.leading, y = u.lineHeight, f = u._widthAuto() || !u.wordWrap, g = f ? 999999 : e.width, p = (e.height, 
            0), m = u.italic ? u.fontSize / 3 : 0, L = u._getAlign(), w = u._getValign(), x = 0 !== w || 0 !== L || 0 != y, v = 0, T = 0, S = 0, H = 0, M = new Array(), E = M[0] = new LayoutLine(), C = !1, R = !1;
            E.h = 0, u.italic && (g -= u.fontSize / 3);
            var I = 0, A = !0;
            for (o = 0; _ > o; o++) if (s = n[o], null != s) if (A = !1, s instanceof laya.html.dom.HTMLBrElement) i(), 
            E.y = T, E.h = y; else {
                if (s._isChar()) {
                    if (a = s, a.isWord) C = R || "\n" === a["char"], E.wordStartIndex = E.elements.length; else {
                        if (M.length > 0 && v + S > g && E.wordStartIndex > 0) {
                            var U = 0;
                            U = E.elements.length - E.wordStartIndex + 1, E.elements.length = E.wordStartIndex, 
                            o -= U, i();
                            continue;
                        }
                        C = !1, I += a.width;
                    }
                    S = a.width + d, H = a.height, R = !1, C = C || v + S > g, C && i(), E.minTextHeight = Math.min(E.minTextHeight, s.height);
                } else l = s._getCSSStyle(), h = s, r = l.padding, 0 === l._getCssFloat() || (x = !0), 
                C = R || l.lineElement, S = h.width * h._style._tf.scaleX + r[1] + r[3] + d, H = h.height * h._style._tf.scaleY + r[0] + r[2], 
                R = l.lineElement, C = C || v + S > g && l.wordWrap, C && i();
                E.elements.push(s), E.h = Math.max(E.h, H), s.x = v, s.y = T, v += S, E.w = v - d, 
                E.y = T, p = Math.max(v + m, p);
            } else A || (v += t.DIV_ELEMENT_PADDING), E.wordStartIndex = E.elements.length;
            if (T = E.y + E.h, x) {
                var N = 0, b = g;
                for (f && e.width > 0 && (b = e.width), o = 0, _ = M.length; _ > o; o++) M[o].updatePos(0, b, o, N, L, w, y), 
                N += Math.max(y, M[o].h + c);
                T = N;
            }
            return f && (e.width = p), T > e.height && (e.height = T), [ p, T ];
        }, t._will = null, t.DIV_ELEMENT_PADDING = 0, t;
    }(), LayoutLine = function() {
        function t() {
            this.x = 0, this.y = 0, this.w = 0, this.h = 0, this.wordStartIndex = 0, this.minTextHeight = 99999, 
            this.mWidth = 0, this.elements = new Array();
        }
        __class(t, "laya.html.utils.LayoutLine");
        var e = t.prototype;
        return e.updatePos = function(t, e, i, n, s, l, r) {
            var a, h = 0;
            this.elements.length > 0 && (a = this.elements[this.elements.length - 1], h = a.x + a.width - this.elements[0].x);
            var o = 0, _ = NaN;
            1 === s && (o = (e - h) / 2), 2 === s && (o = e - h), 0 === r || 0 != l || (l = 1);
            for (var u = 0, d = this.elements.length; d > u; u++) {
                a = this.elements[u];
                var c = a._getCSSStyle();
                switch (0 !== o && (a.x += o), c._getValign()) {
                  case 0:
                    a.y = n;
                    break;

                  case 1:
                    var y = 0;
                    99999 != this.minTextHeight && (y = this.minTextHeight);
                    var f = (y + r) / 2;
                    f = Math.max(f, this.h), _ = a instanceof laya.html.dom.HTMLImageElement ? n + f - a.height : n + f - a.height, 
                    a.y = _;
                    break;

                  case 2:
                    a.y = n + (r - a.height);
                }
            }
        }, t;
    }(), HTMLElement = function(_super) {
        function HTMLElement() {
            this.URI = null, this._href = null, HTMLElement.__super.call(this), this._text = HTMLElement._EMPTYTEXT, 
            this.setStyle(new CSSStyle(this)), this._getCSSStyle().valign = "middle", this.mouseEnabled = !0;
        }
        __class(HTMLElement, "laya.html.dom.HTMLElement", _super);
        var __proto = HTMLElement.prototype;
        return __proto.layaoutCallNative = function() {
            var t = 0;
            if (this._childs && (t = this._childs.length) > 0) for (var e = 0; t > e; e++) this._childs[e].layaoutCallNative && this._childs[e].layaoutCallNative();
            var i = this._getWords();
            i && HTMLElement.fillWords(this, i, 0, 0, this.style.font, this.style.color);
        }, __proto.appendChild = function(t) {
            return this.addChild(t);
        }, __proto._getWords = function() {
            var t = this._text.text;
            if (!t || 0 === t.length) return null;
            var e = this._text.words;
            if (e && e.length === t.length) return e;
            null === e && (this._text.words = e = []), e.length = t.length;
            for (var i, n = this.style, s = n.font, l = 0, r = t.length; r > l; l++) {
                i = Utils.measureText(t.charAt(l), s);
                var a = e[l] = new HTMLChar(t.charAt(l), i.width, i.height || n.fontSize, n);
                if (this.href) {
                    var h = new Sprite();
                    this.addChild(h), a.setSprite(h);
                }
            }
            return e;
        }, __proto.showLinkSprite = function() {
            var t = this._text.words;
            if (t) for (var e, i, n = [], s = 0; s < t.length; s++) i = t[s], e = new Sprite(), 
            e.graphics.drawRect(0, 0, i.width, i.height, "#ff0000"), e.width = i.width, e.height = i.height, 
            this.addChild(e), n.push(e);
        }, __proto._layoutLater = function() {
            var t = this.style;
            512 & t._type || (t.widthed(this) && (this._childs.length > 0 || null != this._getWords()) && t.block ? (Layout.later(this), 
            t._type |= 512) : this.parent && this.parent._layoutLater());
        }, __proto._setAttributes = function(t, e) {
            switch (t) {
              case "style":
                return void this.style.cssText(e);

              case "class":
                return void (this.className = e);
            }
            _super.prototype._setAttributes.call(this, t, e);
        }, __proto.updateHref = function() {
            if (null != this._href) {
                var t = this._getWords();
                if (t) for (var e, i, n = 0; n < t.length; n++) if (e = t[n], i = e.getSprite()) {
                    var s = e.height - 1, l = .5 * e.style.letterSpacing;
                    l || (l = 0), i.graphics.drawLine(0 - l, s, e.width + l, s, e._getCSSStyle().color), 
                    i.size(e.width, e.height), i.on("click", this, this.onLinkHandler);
                }
            }
        }, __proto.onLinkHandler = function(t) {
            switch (t.type) {
              case "click":
                for (var e = this; e; ) e.event("link", [ this.href ]), e = e.parent;
            }
        }, __proto.formatURL = function(t) {
            return this.URI ? URL.formatURL(t, this.URI ? this.URI.path : null) : t;
        }, __getset(0, __proto, "href", function() {
            return this._href;
        }, function(t) {
            this._href = t, null != t && this.updateHref();
        }), __getset(0, __proto, "color", null, function(t) {
            this.style.color = t;
        }), __getset(0, __proto, "onClick", null, function(value) {
            var fn;
            eval("fn=function(event){" + value + ";}"), this.on("click", this, fn);
        }), __getset(0, __proto, "id", null, function(t) {
            HTMLDocument.document.setElementById(t, this);
        }), __getset(0, __proto, "innerTEXT", function() {
            return this._text.text;
        }, function(t) {
            this.text = t;
        }), __getset(0, __proto, "style", function() {
            return this._style;
        }), __getset(0, __proto, "text", function() {
            return this._text.text;
        }, function(t) {
            this._text == HTMLElement._EMPTYTEXT ? this._text = {
                text: t,
                words: null
            } : (this._text.text = t, this._text.words && (this._text.words.length = 0)), this._renderType |= 2048, 
            this.repaint(), this.updateHref();
        }), __getset(0, __proto, "parent", _super.prototype._$get_parent, function(t) {
            if (t instanceof laya.html.dom.HTMLElement) {
                var e = t;
                this.URI || (this.URI = e.URI), this.style.inherit(e.style);
            }
            _super.prototype._$set_parent.call(this, t);
        }), __getset(0, __proto, "className", null, function(t) {
            this.style.attrs(HTMLDocument.document.styleSheets["." + t]);
        }), HTMLElement.fillWords = function(t, e, i, n, s, l) {
            t.graphics.clear();
            for (var r = 0, a = e.length; a > r; r++) {
                var h = e[r];
                t.graphics.fillText(h["char"], h.x + i, h.y + n, s, l, "left");
            }
        }, HTMLElement._EMPTYTEXT = {
            text: null,
            words: null
        }, HTMLElement;
    }(Sprite), HTMLBrElement = function(t) {
        function e() {
            e.__super.call(this), this.style.lineElement = !0, this.style.block = !0;
        }
        return __class(e, "laya.html.dom.HTMLBrElement", t), e;
    }(HTMLElement), HTMLDivElement = function(t) {
        function e() {
            this.contextHeight = NaN, this.contextWidth = NaN, e.__super.call(this), this.style.block = !0, 
            this.style.lineElement = !0, this.style.width = 200, this.style.height = 200;
        }
        __class(e, "laya.html.dom.HTMLDivElement", t);
        var i = e.prototype;
        return i.appendHTML = function(t) {
            HTMLParse.parse(this, t, this.URI), this.layout();
        }, i._addChildsToLayout = function(t) {
            var e = this._getWords();
            if (null == e && 0 == this._childs.length) return !1;
            e && e.forEach(function(e) {
                t.push(e);
            });
            for (var i = !0, n = 0, s = this._childs.length; s > n; n++) {
                var l = this._childs[n];
                i ? i = !1 : t.push(null), l._addToLayout(t);
            }
            return !0;
        }, i._addToLayout = function(t) {
            this.layout();
        }, i.layout = function() {
            this.style._type |= 512;
            var t = Layout.layout(this);
            if (t) {
                this._$P.mHtmlBounds || this._set$P("mHtmlBounds", new Rectangle());
                var e = this._$P.mHtmlBounds;
                e.x = e.y = 0, e.width = this.contextWidth = t[0], e.height = this.contextHeight = t[1], 
                this.setBounds(e);
            }
        }, __getset(0, i, "height", function() {
            return this._height ? this._height : this.contextHeight;
        }, t.prototype._$set_height), __getset(0, i, "innerHTML", null, function(t) {
            this.destroyChildren(), this.appendHTML(t);
        }), __getset(0, i, "width", function() {
            return this._width ? this._width : this.contextWidth;
        }, function(e) {
            var i = !1;
            i = 0 === e ? e != this._width : e != this.width, t.prototype._$set_width.call(this, e), 
            i && this.layout();
        }), e;
    }(HTMLElement), HTMLDocument = function(t) {
        function e() {
            this.all = new Array(), this.styleSheets = CSSStyle.styleSheets, e.__super.call(this);
        }
        __class(e, "laya.html.dom.HTMLDocument", t);
        var i = e.prototype;
        return i.getElementById = function(t) {
            return this.all[t];
        }, i.setElementById = function(t, e) {
            this.all[t] = e;
        }, __static(e, [ "document", function() {
            return this.document = new e();
        } ]), e;
    }(HTMLElement), HTMLImageElement = function(t) {
        function e() {
            this._tex = null, this._url = null, this._renderArgs = [], e.__super.call(this), 
            this.style.block = !0;
        }
        __class(e, "laya.html.dom.HTMLImageElement", t);
        var i = e.prototype;
        return i._addToLayout = function(t) {
            !this._style.absolute && t.push(this);
        }, i.render = function(t, e, i) {
            !this._tex || !this._tex.loaded || !this._tex.loaded || this._width < 1 || this._height < 1 || (Stat.spriteCount++, 
            this._renderArgs[0] = this._tex, this._renderArgs[1] = this.x, this._renderArgs[2] = this.y, 
            this._renderArgs[3] = this.width || this._tex.width, this._renderArgs[4] = this.height || this._tex.height, 
            t.ctx.drawTexture2(e, i, this.style.translateX, this.style.translateY, this.transform, this.style.alpha, this.style.blendMode, this._renderArgs));
        }, __getset(0, i, "src", null, function(t) {
            function e() {
                var t = i._style;
                t.widthed(i) ? -1 : i._tex.width, t.heighted(i) ? -1 : i._tex.height;
                t.widthed(i) || i._width == i._tex.width || (i.width = i._tex.width, i.parent && i.parent._layoutLater()), 
                t.heighted(i) || i._height == i._tex.height || (i.height = i._tex.height, i.parent && i.parent._layoutLater()), 
                Render.isConchApp && (i._renderArgs[0] = i._tex, i._renderArgs[1] = i.x, i._renderArgs[2] = i.y, 
                i._renderArgs[3] = i.width || i._tex.width, i._renderArgs[4] = i.height || i._tex.height, 
                i.graphics.drawTexture(i._tex, 0, 0, i._renderArgs[3], i._renderArgs[4])), i.repaint(), 
                i.parentRepaint();
            }
            var i = this;
            if (t = this.formatURL(t), this._url != t) {
                this._url = t;
                var n = this._tex = Loader.getRes(t);
                n || (this._tex = n = new Texture(), n.load(t), Loader.cacheRes(t, n)), n.loaded ? e() : n.on("loaded", null, e);
            }
        }), e;
    }(HTMLElement), HTMLLinkElement = function(t) {
        function e() {
            this.type = null, e.__super.call(this), this.visible = !1;
        }
        __class(e, "laya.html.dom.HTMLLinkElement", t);
        var i = e.prototype;
        return i._onload = function(t) {
            switch (this.type) {
              case "text/css":
                CSSStyle.parseCSS(t, this.URI);
            }
        }, __getset(0, i, "href", t.prototype._$get_href, function(t) {
            var e = this;
            t = this.formatURL(t), this.URI = new URL(t);
            var i = new Loader();
            i.once("complete", null, function(t) {
                e._onload(t);
            }), i.load(t, "text");
        }), e._cuttingStyle = new RegExp("((@keyframes[\\s\\t]+|)(.+))[\\t\\n\\r\\s]*{", "g"), 
        e;
    }(HTMLElement), HTMLStyleElement = function(t) {
        function e() {
            e.__super.call(this), this.visible = !1;
        }
        __class(e, "laya.html.dom.HTMLStyleElement", t);
        var i = e.prototype;
        return __getset(0, i, "text", t.prototype._$get_text, function(t) {
            CSSStyle.parseCSS(t, null);
        }), e;
    }(HTMLElement), HTMLIframeElement = function(t) {
        function e() {
            e.__super.call(this), this._getCSSStyle().valign = "middle";
        }
        __class(e, "laya.html.dom.HTMLIframeElement", t);
        var i = e.prototype;
        return __getset(0, i, "href", t.prototype._$get_href, function(t) {
            var e = this;
            t = this.formatURL(t);
            var i = new Loader();
            i.once("complete", null, function(i) {
                var n = e.URI;
                e.URI = new URL(t), e.innerHTML = i, !n || (e.URI = n);
            }), i.load(t, "text");
        }), e;
    }(HTMLDivElement);
}(window, document, Laya);