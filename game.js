require("weapp-adapter.js");

wx.setKeepScreenOn({
    keepScreenOn: true
});

var BB = {};

BB.getPath = function(path) {
    if (path != undefined) {
        path = path.replace(/\\/g, "/");
    }
    if (BB.res[path]) {
        return BB.res[path] + "/" + path;
    }
    return path;
};

window.replacePath = function(url, basePath) {
    if (url.indexOf("://") == -1) {
        if (basePath) {
            url = basePath + url;
        } else {
            url = window.newRootPath + url;
        }
    }
    return url;
};

window.fixAtlasPic = function(url) {
    if (url.indexOf(window.newRootPath) == -1) {
        return url;
    }
    var version_path = url.substring(window.newRootPath.length, url.length);
    var path = version_path.substring(version_path.indexOf("/") + 1, version_path.length);
    return path;
};

window.BB = BB;

window.newRootPath = "https://res.luckyfish.qq.com/wx/";

window.newBasePath = "https://res.luckyfish.qq.com/wx/";

wx.onShow(function(options) {
    console.log("显示游戏");
    console.log(options.scene);
    console.log(options.query);
    setTimeout(onShowed1, 1e3, options.query);
    // setTimeout(onShowed3, 3000, options.query);
});

// var lastInvitorParam = "";
function onShowed3(query) {
    if (window.ApplicationData) {
        // if (lastInvitorParam == query.luckfish_share)
        // {
        //   return ;
        // }
        lastInvitorParam = query.luckfish_share;
        window.ApplicationData.invitorParam = query.luckfish_share;
        window.hf.LoginModule.sendInviteInfo();
    }
}

function onShowed1(query) {
    if (window.hf && window.hf.LayerMgr) {
        window.hf.LayerMgr.redrawbg();
    }
}

wx.onHide(function(options) {
    console.log("隐藏游戏");
    console.log(options.scene);
    console.log(options.query);
    //wx.exitMiniProgram();//这个开了无法支付
});

wx.onError(function(options) {
    wx.exitMiniProgram();
});

require("laya/long.min.js");

require("laya/bytebuffer.js");

require("laya/protobuf.js");

require("laya/laya.core.js");

require("laya/dom.js");

window.Parser = require("laya/dom_parser.js");

require("laya/sax.js");

window.utilMd5 = require("laya/md5.js");

require("laya/laya.webgl.js");

require("laya/laya.ani.js");

require("laya/laya.filter.js");

require("laya/laya.html.js");

require("laya/laya.device.js");

require("laya/laya.ui.min.js");

require("FishButton.js");

require("laya/laya.wxmini.js");

console.log(wx.getSystemInfoSync());

function startGame() {
    wx.request({
        url: "https://res.luckyfish.qq.com/wx/" + curVersion + "/resource.json",
        success: function(res) {
            BB.res = res.data;
            console.log(res);
            Laya.View.regComponent("FishButton", inculde.ui.FishButton);
            Laya.View.regComponent("FontClip", inculde.ui.FontClip);
            window.WXAPP = true;
            var hf = {};
            window.hf = hf;
            require("main.min.js");
            console.log(Laya.Browser.pixelRatio + " - " + Laya.Browser.width + " - " + Laya.Browser.height);
        },
        fail: function(res) {
            console.log(res);
        }
    });
}

var curVersion = "1.35.0.33";

wx.request({
    url: "https://luckyfish.qq.com/wx/version.js?_=1516710421119",
    success: function(res) {
        var versionInfo = res.data.split("=");
        while (versionInfo[1].indexOf('"') != -1) {
            versionInfo[1] = versionInfo[1].replace('"', "");
        }
        console.log(versionInfo[1]);
        var list1 = versionInfo[1].split(".");
        var list2 = curVersion.split(".");
        var connectToYFB = false;
        for (var i = 0; i < list1.length; i++) {
            if (list1[i] < list2[i]) {
                connectToYFB = true;
                break;
            }
        }
        console.log("connectToYFB:" + connectToYFB);
        if (connectToYFB) {
            window.WXYFB = true;
            startGame();
        } else {
            window.WXYFB = false;
            startGame();
        }
    },
    fail: function(res) {
        console.log("fail");
    }
});