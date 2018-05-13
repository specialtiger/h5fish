var inculde = {};

window.inculde = inculde;

var ui = {};

window.inculde.ui = ui;

var __extends = this && this.__extends || function() {
    var extendStatics = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function(d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

var inculde;

(function(inculde) {
    var ui;
    (function(ui) {
        var FishButton = function(_super) {
            __extends(FishButton, _super);
            function FishButton(label, skin) {
                if (skin === void 0) {
                    skin = "ui/comp/fishbtn.png";
                }
                var _this = _super.call(this, skin, label) || this;
                //缩放时间，单位为
                //laya.editorUI.Button
                                _this.scaleTime = 100;
                //设置按钮默认为单态按钮。
                                _this.stateNum = 1;
                //Logger.log(this.width, "ww")  自定义组件在构造函数里不能获取宽高
                                _this.labelAlign = "center";
                _this.anchorX = .5;
                _this.anchorY = .5;
                // //添加鼠标按下事件侦听。按时时缩小按钮。
                                _this.on(Laya.Event.MOUSE_DOWN, _this, _this.scaleSmall);
                //添加鼠标抬起事件侦听。抬起时还原按钮。
                                _this.on(Laya.Event.MOUSE_UP, _this, _this.onUp);
                //添加鼠标离开事件侦听。离开时还原按钮。
                                _this.on(Laya.Event.MOUSE_OUT, _this, _this.onOut);
                _this.oldscaleX = _this.scaleX;
                _this.oldscaleY = _this.scaleY;
                return _this;
            }
            Object.defineProperty(FishButton.prototype, "skin", {
                get: function() {
                    return _super.prototype["skin"];
                },
                set: function(value) {
                    this._skin = value;
                    this.callLater(this.changeClips);
                    this._setStateChanged();
                },
                enumerable: true,
                configurable: true
            });
            FishButton.prototype.init = function() {
                if (!this._isInit) {
                    this._initWidth = this.width;
                    this._initHeight = this.height;
                    this._initX = this.x;
                    this._initY = this.y;
                    this._isInit = true;
                }
            };
            FishButton.prototype.scaleSmall = function() {
                this.init();
                var scaleValue = .8;
                this.scaleX = scaleValue;
                this.scaleY = scaleValue;
                // this.x = this._initX + (1 - scaleValue) * this._initWidth / 2;
                // this.y = this._initY + (1 - scaleValue) * this._initHeight / 2;
                                Laya.Tween.to(this, {
                    scaleX: this.oldscaleX * .8,
                    scaleY: this.oldscaleY * .8
                }, this.scaleTime, null, Laya.Handler.create(this, this.tweenFunc));
            };
            FishButton.prototype.scaleBig = function() {
                this.init();
                this.scaleX = 1;
                this.scaleY = 1;
                // this.x = this._initX;
                // this.y = this._initY;
                //中心点设置
                                Laya.Tween.to(this, {
                    scaleX: this.oldscaleX,
                    scaleY: this.oldscaleY
                }, this.scaleTime, null, Laya.Handler.create(this, this.tweenFunc));
            };
            FishButton.prototype.onUp = function() {
                this.scaleBig();
                if (this._skin != "ui/comp/fishbtn_back_btn.png") {
                    if (this._skin != "ui/seafight/backbtn.png") {
                        if (this._skin != "ui/comp/close.png") {
                            hf.SoundModule.onPlaySound("ui_open");
                        }
                    } else {
                        hf.SoundModule.onPlaySound("ui_close");
                    }
                } else {
                    hf.SoundModule.onPlaySound("ui_close");
                }
            };
            FishButton.prototype.onOut = function() {
                this.scaleBig();
            };
            FishButton.prototype.tweenFunc = function() {
                //Logger.log(this.width, this.height);
            };
            return FishButton;
        }(laya.ui.Button);
        ui.FishButton = FishButton;
    })(ui = inculde.ui || (inculde.ui = {}));
})(inculde || (inculde = {}));
//# sourceMappingURL=FishButton.js.map