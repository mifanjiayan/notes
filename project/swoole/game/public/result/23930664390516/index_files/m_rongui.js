var gdp_imgs = new Image;
gdp_imgs.src = window.location.protocol + "//cm.e.qq.com/cm.fcg?gdt_dspid=1007253&gdt_dsp_timestamp=" + parseInt((new Date).getTime() / 1e3);
var baidu_img = new Image;
baidu_img.src = window.location.protocol + "//cm.pos.baidu.com/pixel?dspid=3788514&local_cookie=rong360";
;$.cookie = function (e, o, n) {
    if ("undefined" == typeof o) {
        var i = new RegExp("(?:^| )" + e + "=([^;]*)(;|$)"), r = i.exec(document.cookie);
        return decodeURIComponent(r && r[1] || "")
    }
    n = n || {}, null === o && (o = "", n.expires = -1);
    var t = "";
    if (n.expires && ("number" == typeof n.expires || n.expires.toUTCString)) {
        var p;
        "number" == typeof n.expires ? (p = new Date, p.setTime(p.getTime() + 24 * n.expires * 60 * 60 * 1e3)) : p = n.expires, t = "; expires=" + p.toUTCString()
    }
    var a = n.path ? "; path=" + n.path : "; path=/", m = n.domain ? "; domain=" + n.domain : "; domain=.rong360.com",
        c = n.secure ? "; secure" : "";
    document.cookie = [e, "=", encodeURIComponent(o), t, a, m, c].join("")
};
;$.json2param = function (n) {
    var r = "";
    for (var t in n) ("" != n[t] || "0" == n[t].toString()) && (r += t + "=" + n[t] + "&");
    return r.substring(0, r.length - 1)
};
;!function (e) {
    var t = {
        _views: {}, ViewModel: {
            model: function (e, t) {
                var i = this.view, n = $(i + ' [data-model="' + e + '"]'), a = n.find('[type="text/html"]').html(),
                    o = n.find('[data-wrap="dom"]');
                o.html('<div class="ui-widget" data-top="10" data-xtype="loading" data-size="little"><span class="icon"></span><span class="text">正在加载中...</span></div>'), a && o.html($.tmpl(a, t));
                var d = $.cookie("DEVICE");
                console.log(d), d && $('[apphide="true"]').hide()
            }
        }, define: function (e, t) {
            var i = this;
            i._views[e] = {
                model: i.ViewModel.model, view: '[view="' + e + '"]', active: function () {
                }
            }, t(i._views[e]);
            for (eventItem in i._views[e].event) {
                var n = eventItem.split(":"), a = '[view="' + e + '"] [data-event="' + eventItem + '"]',
                    o = $.os.android || $.os.ios ? n[0] : n[0].replace("tap", "click");
                $(document).delegate(a, o, i._views[e].event[eventItem])
            }
        }, getView: function (e) {
            return this._views[e]
        }, goTo: function (e) {
            window.location.hash = e
        }
    };
    e.MW = t
}(window), $(function () {
});
;$(function () {
    var n = {};
    $.tmpl = function p(t, i) {
        var r = /\W/.test(t) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + t.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : n[t] = n[t] || p(document.getElementById(t).innerHTML);
        return i ? r(i) : r
    }, $.tpl = function (n) {
        var p = new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + n.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return p
    }
});
;$(document).delegate("[pattern='[0-9]*']", "input", function () {
    var t = $(this), e = t.val();
    e = e.replace(/[０１２３４５６７８９]/g, function (t) {
        return t.charCodeAt(0) - 65296
    }), t.val(e.replace(/[^\d]/g, ""))
}), $(document).delegate("[data-pattern='float']", "input", function () {
    var t = /^(\d+(\.\d{0,1})?)$/g, e = $(this), a = e.val();
    if (!t.test(this.value)) {
        var n = (Math.floor(10 * parseFloat(a)) / 10).toFixed(1);
        "NaN" == parseFloat(n).toFixed(1) && (n = ""), e.val(n)
    }
}), $(document).delegate(".ui-btn.border", "touchstart", function () {
    $(this).addClass("active")
}), $(document).delegate(".ui-btn.border", "touchend", function () {
    $(this).removeClass("active")
});
;var locationPop = {
    init: function (i) {
        this.Config = {
            title: "您在哪个城市工作",
            subTitle: "机构仅办理当地工作人士申请",
            diffText: "",
            isLocationBtn: !0,
            isOtherBtn: !0,
            locationCallback: function () {
            },
            currentCallback: function () {
            },
            otherCallback: function () {
            },
            closeCallback: function () {
            }
        }, $.extend(this.Config, i), this._setTpl(), this._initEvent()
    }, _setTpl: function () {
        var i = this,
            o = ["<div id='uiLocationPop'><div class='ui-location-pop-masker'></div>", "<div class='ui-location-pop'><div class='hd'>", "<div class='icon'><i class='icon-icon-location'></i></div>", "<h2 class='title'>{{title}}</h2><div class='sub-title'>{{subTitle}}</div></div>", "<div class='bd'><ul class='btn-list'><li class='btn' id='uiPopLocalBtn'>{{ip_city}}{{diffText}}</li>", "<li class='btn' id='uiPopcurBtn'>{{current_city}}</li><li class='btn' id='uiPopOtherBtn'>其他城市</li></ul>", "</div><div class='close-btn'><i class='icon-icon-close' id='uiPopCloseBtn'></i></div></div></div>"].join("");
        o = o.replace(/\{\{(.*?)\}\}/g, function (o, t) {
            return i.Config[t]
        }), i._dom = o, $("body").append(o), i.Config.isLocationBtn || $("#uiPopLocalBtn").remove(), i.Config.isOtherBtn || $("#uiPopOtherBtn").remove()
    }, _initEvent: function () {
        {
            var i = this;
            $("#uiPopCloseBtn")
        }
        $(document).delegate("#uiLocationPop", "tap", function (o) {
            var t = $("#uiLocationPop"), n = $(o.target).attr("id"),
                c = ["uiPopLocalBtn", "uiPopcurBtn", "uiPopOtherBtn", "uiPopCloseBtn"];
            if (!($.inArray(n, c) < 0)) {
                switch (n) {
                    case"uiPopLocalBtn":
                        i.Config.locationCallback && i.Config.locationCallback();
                        break;
                    case"uiPopcurBtn":
                        i.Config.currentCallback && i.Config.currentCallback();
                        break;
                    case"uiPopOtherBtn":
                        i.Config.otherCallback && i.Config.otherCallback();
                        break;
                    case"uiPopCloseBtn":
                        i.Config.closeCallback && i.Config.closeCallback()
                }
                setTimeout(function () {
                    t.remove()
                }, 50)
            }
        })
    }
};
(window.jQuery || window.Zepto) && !function (i) {
    i.fn.LocationPop = function (i) {
        locationPop.init(i)
    }
}(window.jQuery || window.Zepto);
;$(function () {
    var a = $(".slider");
    $(a).each(function (a, e) {
        var i = $('<div class="nav"></div>'), n = $(e).find(".inner .item");
        $(n).each(function (a) {
            var e = 0 == a ? " active" : "";
            i.append('<span class="item' + e + '"></span>')
        }), $(e).append(i);
        var t = $(i).find(".item");
        new Swipe(e, {
            startSlide: 0,
            auto: 3e3,
            continuous: !0,
            disableScroll: !1,
            stopPropagation: !0,
            mode: "vertical",
            callback: function (a) {
                t.removeClass("active"), t.eq(a).addClass("active")
            }
        })
    })
});
;$(function () {
    ({
        init: function () {
            this.bindTab()
        }, els: {tabs: ".ui-tab", bars: ".item", cons: ".content-item"}, bindTab: function () {
            var t = this;
            $(document).delegate(t.els.tabs + " " + t.els.bars, "tap", function () {
                var a = $(this).parent().find(t.els.bars), e = $(this).parent().parent().find(t.els.cons), i = 0,
                    n = $(this);
                $(a).each(function (t, a) {
                    $(a).attr("data-tab-index", t), n.data("tab-index") == $(a).data("tab-index") && (i = t)
                }), a.removeClass("active"), n.addClass("active"), e.removeClass("active"), e.eq(i).addClass("active")
            })
        }
    }).init()
});
;

function Swipe(n, t) {
    "use strict";

    function e() {
        w = x.children, m = w.length, w.length < 2 && (t.continuous = !1), f.transitions && t.continuous && w.length < 3 && (x.appendChild(w[0].cloneNode(!0)), x.appendChild(x.children[1].cloneNode(!0)), w = x.children), p = new Array(w.length), E = n.getBoundingClientRect().width || n.offsetWidth, x.style.width = w.length * E + "px";
        for (var e = w.length; e--;) {
            var i = w[e];
            i.style.width = E + "px", i.setAttribute("data-index", e), f.transitions && (i.style.left = e * -E + "px", a(e, b > e ? -E : e > b ? E : 0, 0))
        }
        t.continuous && f.transitions && (a(s(b - 1), -E, 0), a(s(b + 1), E, 0)), f.transitions || (x.style.left = b * -E + "px"), n.style.visibility = "visible"
    }

    function i() {
        t.continuous ? r(b - 1) : b && r(b - 1)
    }

    function o() {
        t.continuous ? r(b + 1) : b < w.length - 1 && r(b + 1)
    }

    function s(n) {
        return (w.length + n % w.length) % w.length
    }

    function r(n, e) {
        if (b != n) {
            if (f.transitions) {
                var i = Math.abs(b - n) / (b - n);
                if (t.continuous) {
                    var o = i;
                    i = -p[s(n)] / E, i !== o && (n = -i * w.length + n)
                }
                for (var r = Math.abs(b - n) - 1; r--;) a(s((n > b ? n : b) - r - 1), E * i, 0);
                n = s(n), a(b, E * i, e || g), a(n, 0, e || g), t.continuous && a(s(n - i), -(E * i), 0)
            } else n = s(n), c(b * -E, n * -E, e || g);
            b = n, h(t.callback && t.callback(b, w[b]))
        }
    }

    function a(n, t, e) {
        u(n, t, e), p[n] = t
    }

    function u(n, t, e) {
        var i = w[n], o = i && i.style;
        o && (o.webkitTransitionDuration = o.MozTransitionDuration = o.msTransitionDuration = o.OTransitionDuration = o.transitionDuration = e + "ms", o.webkitTransform = "translate(" + t + "px,0)translateZ(0)", o.msTransform = o.MozTransform = o.OTransform = "translateX(" + t + "px)")
    }

    function c(n, e, i) {
        if (!i) return void(x.style.left = e + "px");
        var o = +new Date, s = setInterval(function () {
            var r = +new Date - o;
            return r > i ? (x.style.left = e + "px", L && d(), t.transitionEnd && t.transitionEnd.call(event, b, w[b]), void clearInterval(s)) : void(x.style.left = (e - n) * (Math.floor(r / i * 100) / 100) + n + "px")
        }, 4)
    }

    function d() {
        T = setTimeout(o, L)
    }

    function l() {
        L = 0, clearTimeout(T)
    }

    var v = function () {
    }, h = function (n) {
        setTimeout(n || v, 0)
    }, f = {
        addEventListener: !!window.addEventListener,
        touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
        transitions: function (n) {
            var t = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
            for (var e in t) if (void 0 !== n.style[t[e]]) return !0;
            return !1
        }(document.createElement("swipe"))
    };
    if (n) {
        var w, p, E, m, x = n.children[0];
        t = t || {};
        var b = parseInt(t.startSlide, 10) || 0, g = t.speed || 300;
        t.continuous = void 0 !== t.continuous ? t.continuous : !0;
        var T, y, L = t.auto || 0, k = {}, D = {}, M = {
            handleEvent: function (n) {
                switch (n.type) {
                    case"touchstart":
                        this.start(n);
                        break;
                    case"touchmove":
                        this.move(n);
                        break;
                    case"touchend":
                        h(this.end(n));
                        break;
                    case"webkitTransitionEnd":
                    case"msTransitionEnd":
                    case"oTransitionEnd":
                    case"otransitionend":
                    case"transitionend":
                        h(this.transitionEnd(n));
                        break;
                    case"resize":
                        h(e)
                }
                t.stopPropagation && n.stopPropagation()
            }, start: function (n) {
                var t = n.touches[0];
                k = {
                    x: t.pageX,
                    y: t.pageY,
                    time: +new Date
                }, y = void 0, D = {}, x.addEventListener("touchmove", this, !1), x.addEventListener("touchend", this, !1)
            }, move: function (n) {
                if (!(n.touches.length > 1 || n.scale && 1 !== n.scale)) {
                    t.disableScroll && n.preventDefault();
                    var e = n.touches[0];
                    D = {
                        x: e.pageX - k.x,
                        y: e.pageY - k.y
                    }, "undefined" == typeof y && (y = !!(y || Math.abs(D.x) < Math.abs(D.y))), y || (n.preventDefault(), l(), t.continuous ? (u(s(b - 1), D.x + p[s(b - 1)], 0), u(b, D.x + p[b], 0), u(s(b + 1), D.x + p[s(b + 1)], 0)) : (D.x = D.x / (!b && D.x > 0 || b == w.length - 1 && D.x < 0 ? Math.abs(D.x) / E + 1 : 1), u(b - 1, D.x + p[b - 1], 0), u(b, D.x + p[b], 0), u(b + 1, D.x + p[b + 1], 0)))
                }
            }, end: function () {
                var n = +new Date - k.time, e = Number(n) < 250 && Math.abs(D.x) > 20 || Math.abs(D.x) > E / 2,
                    i = !b && D.x > 0 || b == w.length - 1 && D.x < 0;
                t.continuous && (i = !1);
                var o = D.x < 0;
                y || (e && !i ? (o ? (t.continuous ? (a(s(b - 1), -E, 0), a(s(b + 2), E, 0)) : a(b - 1, -E, 0), a(b, p[b] - E, g), a(s(b + 1), p[s(b + 1)] - E, g), b = s(b + 1)) : (t.continuous ? (a(s(b + 1), E, 0), a(s(b - 2), -E, 0)) : a(b + 1, E, 0), a(b, p[b] + E, g), a(s(b - 1), p[s(b - 1)] + E, g), b = s(b - 1)), t.callback && t.callback(b, w[b])) : t.continuous ? (a(s(b - 1), -E, g), a(b, 0, g), a(s(b + 1), E, g)) : (a(b - 1, -E, g), a(b, 0, g), a(b + 1, E, g))), x.removeEventListener("touchmove", M, !1), x.removeEventListener("touchend", M, !1)
            }, transitionEnd: function (n) {
                parseInt(n.target.getAttribute("data-index"), 10) == b && (L && d(), t.transitionEnd && t.transitionEnd.call(n, b, w[b]))
            }
        };
        return e(), L && d(), f.addEventListener ? (f.touch && x.addEventListener("touchstart", M, !1), f.transitions && (x.addEventListener("webkitTransitionEnd", M, !1), x.addEventListener("msTransitionEnd", M, !1), x.addEventListener("oTransitionEnd", M, !1), x.addEventListener("otransitionend", M, !1), x.addEventListener("transitionend", M, !1)), window.addEventListener("resize", M, !1)) : window.onresize = function () {
            e()
        }, {
            setup: function () {
                e()
            }, slide: function (n, t) {
                l(), r(n, t)
            }, prev: function () {
                l(), i()
            }, next: function () {
                l(), o()
            }, stop: function () {
                l()
            }, getPos: function () {
                return b
            }, getNumSlides: function () {
                return m
            }, kill: function () {
                l(), x.style.width = "", x.style.left = "";
                for (var n = w.length; n--;) {
                    var t = w[n];
                    t.style.width = "", t.style.left = "", f.transitions && u(n, 0, 0)
                }
                f.addEventListener ? (x.removeEventListener("touchstart", M, !1), x.removeEventListener("webkitTransitionEnd", M, !1), x.removeEventListener("msTransitionEnd", M, !1), x.removeEventListener("oTransitionEnd", M, !1), x.removeEventListener("otransitionend", M, !1), x.removeEventListener("transitionend", M, !1), window.removeEventListener("resize", M, !1)) : window.onresize = null
            }
        }
    }
}

(window.jQuery || window.Zepto) && !function (n) {
    n.fn.Swipe = function (t) {
        return this.each(function () {
            n(this).data("Swipe", new Swipe(n(this)[0], t))
        })
    }
}(window.jQuery || window.Zepto);
;window.adsTool = window.adsTool || {}, window.adsTool.addAdblock = function (o) {
    return location.href.indexOf("inapp") > -1 || $.cookie("inapp") ? void $.cookie("inapp", "1") : location.href.indexOf("noad") > -1 || $.cookie("noad") ? void $.cookie("noad", "1") : void(o && $.ajax({
        dataType: "jsonp",
        url: o,
        timeout: 5e3
    }))
}, window.AdCallback = function (o) {
    try {
        var i = '<a href="%jumpurl%"><img width="100%" src="%imgurl%"></a>',
            a = i.replace("%jumpurl%", o.jumpurl).replace("%imgurl%", o.imgurl);
        if (o.hasOwnProperty("position") && 1 == o.position) {
            var e = $.cookie("adIsExpire");
            if (e) return;
            if (location.href.indexOf("inapp") > -1 || 1 == $.cookie("inapp") || "micromessenger" == navigator.userAgent.toLowerCase().match(/MicroMessenger/i) || navigator.userAgent.indexOf("QQ/") > -1) return;
            var n = new Image;
            n.onload = function () {
                var o = $("<div></div>");
                o.css({position: "fixed", width: "100%", bottom: "0px", zIndex: "100"});
                var i = $('<div class="closeBtn"></div>');
                i.css({
                    background: "url(//static.rong360.com/upload/png/2b/e0/2be0f42063521e3b0b6ef63528961bd7.png) no-repeat 0 0",
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    width: "20px",
                    height: "19px",
                    zIndex: 101,
                    backgroundSize: "100%"
                });
                var e = $(a);
                o.append(i), o.append(e), $("body").append(o), i.click(function () {
                    o.remove(), $.cookie("adIsExpire", "adIsExpire", {expires: 1})
                })
            }, n.src = o.imgurl
        } else {
            var d = $("[data-adid='" + o.id + "']"), r = d.data("wrap");
            d.html(a), d.attr("wrap", r)
        }
    } catch (t) {
    }
}, $(function () {
    return location.href.indexOf("inapp") > -1 || $.cookie("inapp") || navigator.userAgent.indexOf("rong360app") > -1 ? void $.cookie("inapp", "1") : location.href.indexOf("noad") > -1 || $.cookie("noad") ? void $.cookie("noad", "1") : void $("[data-adid]").each(function (o, i) {
        var a = "//midas.rong360.com/s?z=dbname&c=%id%", e = $(i), n = e.data("adid");
        $.ajax({
            dataType: "jsonp", url: a.replace("%id%", n), timeout: 5e3, success: function () {
            }
        })
    })
});
;

function ra_parseurl(r) {
    var e = {};
    if (pos = r.indexOf("?"), pos > -1 && (base = r.substring(0, pos), querystr = r.substring(pos + 1))) for (querys = querystr.split("&"), queryslen = querys.length, i = 0; queryslen > i; i++) query = querys[i].split("="), query[1] && (e[query[0]] = query[1]);
    return e
}

function ra_sc(r, e) {
    var n = (ra_sc.arguments, ra_sc.arguments.length, 1), t = "/", i = ".rong360.com", o = !1, u = new Date;
    ra_dc(r), u.setTime(u.getTime() + 24 * n * 60 * 60 * 1e3), document.cookie = r + "=" + e + "; expires=" + u.toGMTString() + (null === i ? "" : "; domain=" + i) + (null === t ? "" : "; path=" + t) + (o === !0 ? "; secure" : "")
}

function ra_dc(r) {
    var e = new Date, n = ra_gc(r);
    e.setTime(e.getTime() - 1), document.cookie = r + "=" + n + "; expires=" + e.toGMTString()
}

function ra_gc(r) {
    for (var e = r + "=", n = e.length, t = document.cookie.length, i = 0, o = 0; t > i;) {
        if (o = i + n, document.cookie.substring(i, o) == e) return ra_gcv(o);
        if (i = document.cookie.indexOf(" ", i) + 1, 0 === i) break
    }
    return ""
}

function ra_gcv(r) {
    var e = document.cookie.indexOf(";", r);
    return -1 == e && (e = document.cookie.length), document.cookie.substring(r, e)
}

!function () {
    Array.prototype.in_array = function (r) {
        for (i = 0; i < this.length; i++) if (this[i] == r) return !0;
        return !1
    };
    var r = "rtm_", e = ["us", "ca", "ad", "ke", "cr"], n = ra_parseurl(window.location.search), t = [];
    for (var o in n) {
        var u = o.replace(r, "");
        e.in_array(u) && t.push(u + "=" + n[o])
    }
    if (t.length) {
        void 0 != n.utm_source && t.push("csr=" + n.utm_source);
        var s = "__rtm";
        ra_sc(s, t.join("|"))
    }
}();