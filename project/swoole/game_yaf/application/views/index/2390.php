<!DOCTYPE html>

<html data-dpr="1" style="font-size: 120.938px;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script id="_1502877656272_6684" src="/2390/index/detect.json"></script>
    <link rel="shortcut icon" type="image/x-icon" href="http://yun.yuyiya.com/tuia/tuia.ico">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <title>天降红包（福利中心）</title>
    <script type="text/javascript" async="" src="/2390/index/fm.js"></script>
    <!--<script type="text/javascript" src="index/2214ccb852"></script>-->
    <script src="/2390/index/nr-1016.min.js"></script>
    <script type="text/javascript">
        ;
        (function (window) {
            var cookie = {
                set: function (name, value, day) {
                    var Days = day | 1;
                    var exp = new Date();
                    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
                    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
                },
                get: function (name) {
                    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                    if (arr = document.cookie.match(reg))
                        return unescape(arr[2]);
                    else
                        return null;
                },
                del: function (name) {
                    var exp = new Date();
                    exp.setTime(exp.getTime() - 1);
                    var val = this.get(name);
                    if (val != null)
                        document.cookie = name + "=" + val + ";expires=" + exp.toGMTString();
                }
            };
            window._cookie = cookie;
        })(window)


        function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return null;
        }

        if (!_cookie.get('random')) {
            _cookie.set('random', Math.floor(Math.random() * 100000000000))
        }

        var this_random = _cookie.get('random')
        var this_id = GetQueryString('id')
        function setPosition(type, url) {
            $.ajax({
                url: '/activity/clickCount',
                dataType: 'json',
                type: 'post',
                data: {id: this_id, random: this_random, position: type},
                success: function () {
                    if (url) {
                        window.location.href = url
                    }
                }
            })
        }

    </script>
    <script>

        !function (e, i) {
            var t = e.documentElement, n = navigator.userAgent.match(/iphone|ipod|ipad/gi),
                a = n ? Math.min(i.devicePixelRatio, 3) : 1, m = "orientationchange" in window ? "orientationchange" : "resize";
            t.dataset.dpr = a;
            for (var d, l, c = !1, o = e.getElementsByTagName("meta"), r = 0; r < o.length; r++) l = o[r], "viewport" == l.name && (c = !0, d = l);
            if (c) d.content = "width=device-width,initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0,user-scalable=no"; else {
                var o = e.createElement("meta");
                o.name = "viewport", o.content = "width=device-width,initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0,user-scalable=no", t.firstElementChild.appendChild(o)
            }
            var s = function () {
                var e = t.clientWidth;
                e / a > 640 && (e = 640 * a), window.remScale = e / 640, t.style.fontSize = 200 * (e / 640) + "px"
            };
            s(), e.addEventListener && i.addEventListener(m, s, !1)
        }(document, window);</script>

    <script type="text/javascript">
        window.NREUM || (NREUM = {}), __nr_require = function (t, e, n) {
            function r(n) {
                if (!e[n]) {
                    var o = e[n] = {exports: {}};
                    t[n][0].call(o.exports, function (e) {
                        var o = t[n][1][e];
                        return r(o || e)
                    }, o, o.exports)
                }
                return e[n].exports
            }

            if ("function" == typeof __nr_require) return __nr_require;
            for (var o = 0; o < n.length; o++) r(n[o]);
            return r
        }({
            1: [function (t, e, n) {
                function r(t) {
                    try {
                        c.console && console.log(t)
                    } catch (e) {
                    }
                }

                var o, i = t("ee"), a = t(15), c = {};
                try {
                    o = localStorage.getItem("__nr_flags").split(","), console && "function" == typeof console.log && (c.console = !0, o.indexOf("dev") !== -1 && (c.dev = !0), o.indexOf("nr_dev") !== -1 && (c.nrDev = !0))
                } catch (s) {
                }
                c.nrDev && i.on("internal-error", function (t) {
                    r(t.stack)
                }), c.dev && i.on("fn-err", function (t, e, n) {
                    r(n.stack)
                }), c.dev && (r("NR AGENT IN DEVELOPMENT MODE"), r("flags: " + a(c, function (t, e) {
                        return t
                    }).join(", ")))
            }, {}], 2: [function (t, e, n) {
                function r(t, e, n, r, o) {
                    try {
                        d ? d -= 1 : i("err", [o || new UncaughtException(t, e, n)])
                    } catch (c) {
                        try {
                            i("ierr", [c, (new Date).getTime(), !0])
                        } catch (s) {
                        }
                    }
                    return "function" == typeof f && f.apply(this, a(arguments))
                }

                function UncaughtException(t, e, n) {
                    this.message = t || "Uncaught error with no additional information", this.sourceURL = e, this.line = n
                }

                function o(t) {
                    i("err", [t, (new Date).getTime()])
                }

                var i = t("handle"), a = t(16), c = t("ee"), s = t("loader"), f = window.onerror, u = !1, d = 0;
                s.features.err = !0, t(1), window.onerror = r;
                try {
                    throw new Error
                } catch (l) {
                    "stack" in l && (t(8), t(7), "addEventListener" in window && t(5), s.xhrWrappable && t(9), u = !0)
                }
                c.on("fn-start", function (t, e, n) {
                    u && (d += 1)
                }), c.on("fn-err", function (t, e, n) {
                    u && (this.thrown = !0, o(n))
                }), c.on("fn-end", function () {
                    u && !this.thrown && d > 0 && (d -= 1)
                }), c.on("internal-error", function (t) {
                    i("ierr", [t, (new Date).getTime(), !0])
                })
            }, {}], 3: [function (t, e, n) {
                t("loader").features.ins = !0
            }, {}], 4: [function (t, e, n) {
                function r(t) {
                }

                if (window.performance && window.performance.timing && window.performance.getEntriesByType) {
                    var o = t("ee"), i = t("handle"), a = t(8), c = t(7), s = "learResourceTimings", f = "addEventListener",
                        u = "resourcetimingbufferfull", d = "bstResource", l = "resource", p = "-start", h = "-end", m = "fn" + p,
                        w = "fn" + h, v = "bstTimer", y = "pushState";
                    t("loader").features.stn = !0, t(6);
                    var g = NREUM.o.EV;
                    o.on(m, function (t, e) {
                        var n = t[0];
                        n instanceof g && (this.bstStart = Date.now())
                    }), o.on(w, function (t, e) {
                        var n = t[0];
                        n instanceof g && i("bst", [n, e, this.bstStart, Date.now()])
                    }), a.on(m, function (t, e, n) {
                        this.bstStart = Date.now(), this.bstType = n
                    }), a.on(w, function (t, e) {
                        i(v, [e, this.bstStart, Date.now(), this.bstType])
                    }), c.on(m, function () {
                        this.bstStart = Date.now()
                    }), c.on(w, function (t, e) {
                        i(v, [e, this.bstStart, Date.now(), "requestAnimationFrame"])
                    }), o.on(y + p, function (t) {
                        this.time = Date.now(), this.startPath = location.pathname + location.hash
                    }), o.on(y + h, function (t) {
                        i("bstHist", [location.pathname + location.hash, this.startPath, this.time])
                    }), f in window.performance && (window.performance["c" + s] ? window.performance[f](u, function (t) {
                            i(d, [window.performance.getEntriesByType(l)]), window.performance["c" + s]()
                        }, !1) : window.performance[f]("webkit" + u, function (t) {
                            i(d, [window.performance.getEntriesByType(l)]), window.performance["webkitC" + s]()
                        }, !1)), document[f]("scroll", r, {passive: !0}), document[f]("keypress", r, !1), document[f]("click", r, !1)
                }
            }, {}], 5: [function (t, e, n) {
                function r(t) {
                    for (var e = t; e && !e.hasOwnProperty(u);) e = Object.getPrototypeOf(e);
                    e && o(e)
                }

                function o(t) {
                    c.inPlace(t, [u, d], "-", i)
                }

                function i(t, e) {
                    return t[1]
                }

                var a = t("ee").get("events"), c = t(17)(a, !0), s = t("gos"), f = XMLHttpRequest, u = "addEventListener",
                    d = "removeEventListener";
                e.exports = a, "getPrototypeOf" in Object ? (r(document), r(window), r(f.prototype)) : f.prototype.hasOwnProperty(u) && (o(window), o(f.prototype)), a.on(u + "-start", function (t, e) {
                    var n = t[1], r = s(n, "nr@wrapped", function () {
                        function t() {
                            if ("function" == typeof n.handleEvent) return n.handleEvent.apply(n, arguments)
                        }

                        var e = {object: t, "function": n}[typeof n];
                        return e ? c(e, "fn-", null, e.name || "anonymous") : n
                    });
                    this.wrapped = t[1] = r
                }), a.on(d + "-start", function (t) {
                    t[1] = this.wrapped || t[1]
                })
            }, {}], 6: [function (t, e, n) {
                var r = t("ee").get("history"), o = t(17)(r);
                e.exports = r, o.inPlace(window.history, ["pushState", "replaceState"], "-")
            }, {}], 7: [function (t, e, n) {
                var r = t("ee").get("raf"), o = t(17)(r), i = "equestAnimationFrame";
                e.exports = r, o.inPlace(window, ["r" + i, "mozR" + i, "webkitR" + i, "msR" + i], "raf-"), r.on("raf-start", function (t) {
                    t[0] = o(t[0], "fn-")
                })
            }, {}], 8: [function (t, e, n) {
                function r(t, e, n) {
                    t[0] = a(t[0], "fn-", null, n)
                }

                function o(t, e, n) {
                    this.method = n, this.timerDuration = "number" == typeof t[1] ? t[1] : 0, t[0] = a(t[0], "fn-", this, n)
                }

                var i = t("ee").get("timer"), a = t(17)(i), c = "setTimeout", s = "setInterval", f = "clearTimeout",
                    u = "-start", d = "-";
                e.exports = i, a.inPlace(window, [c, "setImmediate"], c + d), a.inPlace(window, [s], s + d), a.inPlace(window, [f, "clearImmediate"], f + d), i.on(s + u, r), i.on(c + u, o)
            }, {}], 9: [function (t, e, n) {
                function r(t, e) {
                    d.inPlace(e, ["onreadystatechange"], "fn-", c)
                }

                function o() {
                    var t = this, e = u.context(t);
                    t.readyState > 3 && !e.resolved && (e.resolved = !0, u.emit("xhr-resolved", [], t)), d.inPlace(t, w, "fn-", c)
                }

                function i(t) {
                    v.push(t), h && (g = -g, b.data = g)
                }

                function a() {
                    for (var t = 0; t < v.length; t++) r([], v[t]);
                    v.length && (v = [])
                }

                function c(t, e) {
                    return e
                }

                function s(t, e) {
                    for (var n in t) e[n] = t[n];
                    return e
                }

                t(5);
                var f = t("ee"), u = f.get("xhr"), d = t(17)(u), l = NREUM.o, p = l.XHR, h = l.MO, m = "readystatechange",
                    w = ["onload", "onerror", "onabort", "onloadstart", "onloadend", "onprogress", "ontimeout"], v = [];
                e.exports = u;
                var y = window.XMLHttpRequest = function (t) {
                    var e = new p(t);
                    try {
                        u.emit("new-xhr", [e], e), e.addEventListener(m, o, !1)
                    } catch (n) {
                        try {
                            u.emit("internal-error", [n])
                        } catch (r) {
                        }
                    }
                    return e
                };
                if (s(p, y), y.prototype = p.prototype, d.inPlace(y.prototype, ["open", "send"], "-xhr-", c), u.on("send-xhr-start", function (t, e) {
                        r(t, e), i(e)
                    }), u.on("open-xhr-start", r), h) {
                    var g = 1, b = document.createTextNode(g);
                    new h(a).observe(b, {characterData: !0})
                } else f.on("fn-end", function (t) {
                    t[0] && t[0].type === m || a()
                })
            }, {}], 10: [function (t, e, n) {
                function r(t) {
                    var e = this.params, n = this.metrics;
                    if (!this.ended) {
                        this.ended = !0;
                        for (var r = 0; r < d; r++) t.removeEventListener(u[r], this.listener, !1);
                        if (!e.aborted) {
                            if (n.duration = (new Date).getTime() - this.startTime, 4 === t.readyState) {
                                e.status = t.status;
                                var i = o(t, this.lastSize);
                                if (i && (n.rxSize = i), this.sameOrigin) {
                                    var a = t.getResponseHeader("X-NewRelic-App-Data");
                                    a && (e.cat = a.split(", ").pop())
                                }
                            } else e.status = 0;
                            n.cbTime = this.cbTime, f.emit("xhr-done", [t], t), c("xhr", [e, n, this.startTime])
                        }
                    }
                }

                function o(t, e) {
                    var n = t.responseType;
                    if ("json" === n && null !== e) return e;
                    var r = "arraybuffer" === n || "blob" === n || "json" === n ? t.response : t.responseText;
                    return h(r)
                }

                function i(t, e) {
                    var n = s(e), r = t.params;
                    r.host = n.hostname + ":" + n.port, r.pathname = n.pathname, t.sameOrigin = n.sameOrigin
                }

                var a = t("loader");
                if (a.xhrWrappable) {
                    var c = t("handle"), s = t(11), f = t("ee"), u = ["load", "error", "abort", "timeout"], d = u.length,
                        l = t("id"), p = t(14), h = t(13), m = window.XMLHttpRequest;
                    a.features.xhr = !0, t(9), f.on("new-xhr", function (t) {
                        var e = this;
                        e.totalCbs = 0, e.called = 0, e.cbTime = 0, e.end = r, e.ended = !1, e.xhrGuids = {}, e.lastSize = null, p && (p > 34 || p < 10) || window.opera || t.addEventListener("progress", function (t) {
                            e.lastSize = t.loaded
                        }, !1)
                    }), f.on("open-xhr-start", function (t) {
                        this.params = {method: t[0]}, i(this, t[1]), this.metrics = {}
                    }), f.on("open-xhr-end", function (t, e) {
                        "loader_config" in NREUM && "xpid" in NREUM.loader_config && this.sameOrigin && e.setRequestHeader("X-NewRelic-ID", NREUM.loader_config.xpid)
                    }), f.on("send-xhr-start", function (t, e) {
                        var n = this.metrics, r = t[0], o = this;
                        if (n && r) {
                            var i = h(r);
                            i && (n.txSize = i)
                        }
                        this.startTime = (new Date).getTime(), this.listener = function (t) {
                            try {
                                "abort" === t.type && (o.params.aborted = !0), ("load" !== t.type || o.called === o.totalCbs && (o.onloadCalled || "function" != typeof e.onload)) && o.end(e)
                            } catch (n) {
                                try {
                                    f.emit("internal-error", [n])
                                } catch (r) {
                                }
                            }
                        };
                        for (var a = 0; a < d; a++) e.addEventListener(u[a], this.listener, !1)
                    }), f.on("xhr-cb-time", function (t, e, n) {
                        this.cbTime += t, e ? this.onloadCalled = !0 : this.called += 1, this.called !== this.totalCbs || !this.onloadCalled && "function" == typeof n.onload || this.end(n)
                    }), f.on("xhr-load-added", function (t, e) {
                        var n = "" + l(t) + !!e;
                        this.xhrGuids && !this.xhrGuids[n] && (this.xhrGuids[n] = !0, this.totalCbs += 1)
                    }), f.on("xhr-load-removed", function (t, e) {
                        var n = "" + l(t) + !!e;
                        this.xhrGuids && this.xhrGuids[n] && (delete this.xhrGuids[n], this.totalCbs -= 1)
                    }), f.on("addEventListener-end", function (t, e) {
                        e instanceof m && "load" === t[0] && f.emit("xhr-load-added", [t[1], t[2]], e)
                    }), f.on("removeEventListener-end", function (t, e) {
                        e instanceof m && "load" === t[0] && f.emit("xhr-load-removed", [t[1], t[2]], e)
                    }), f.on("fn-start", function (t, e, n) {
                        e instanceof m && ("onload" === n && (this.onload = !0), ("load" === (t[0] && t[0].type) || this.onload) && (this.xhrCbStart = (new Date).getTime()))
                    }), f.on("fn-end", function (t, e) {
                        this.xhrCbStart && f.emit("xhr-cb-time", [(new Date).getTime() - this.xhrCbStart, this.onload, e], e)
                    })
                }
            }, {}], 11: [function (t, e, n) {
                e.exports = function (t) {
                    var e = document.createElement("a"), n = window.location, r = {};
                    e.href = t, r.port = e.port;
                    var o = e.href.split("://");
                    !r.port && o[1] && (r.port = o[1].split("/")[0].split("@").pop().split(":")[1]), r.port && "0" !== r.port || (r.port = "https" === o[0] ? "443" : "80"), r.hostname = e.hostname || n.hostname, r.pathname = e.pathname, r.protocol = o[0], "/" !== r.pathname.charAt(0) && (r.pathname = "/" + r.pathname);
                    var i = !e.protocol || ":" === e.protocol || e.protocol === n.protocol,
                        a = e.hostname === document.domain && e.port === n.port;
                    return r.sameOrigin = i && (!e.hostname || a), r
                }
            }, {}], 12: [function (t, e, n) {
                function r() {
                }

                function o(t, e, n) {
                    return function () {
                        return i(t, [(new Date).getTime()].concat(c(arguments)), e ? null : this, n), e ? void 0 : this
                    }
                }

                var i = t("handle"), a = t(15), c = t(16), s = t("ee").get("tracer"), f = NREUM;
                "undefined" == typeof window.newrelic && (newrelic = f);
                var u = ["setPageViewName", "setCustomAttribute", "setErrorHandler", "finished", "addToTrace", "inlineHit", "addRelease"],
                    d = "api-", l = d + "ixn-";
                a(u, function (t, e) {
                    f[e] = o(d + e, !0, "api")
                }), f.addPageAction = o(d + "addPageAction", !0), f.setCurrentRouteName = o(d + "routeName", !0), e.exports = newrelic, f.interaction = function () {
                    return (new r).get()
                };
                var p = r.prototype = {
                    createTracer: function (t, e) {
                        var n = {}, r = this, o = "function" == typeof e;
                        return i(l + "tracer", [Date.now(), t, n], r), function () {
                            if (s.emit((o ? "" : "no-") + "fn-start", [Date.now(), r, o], n), o) try {
                                return e.apply(this, arguments)
                            } finally {
                                s.emit("fn-end", [Date.now()], n)
                            }
                        }
                    }
                };
                a("setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","), function (t, e) {
                    p[e] = o(l + e)
                }), newrelic.noticeError = function (t) {
                    "string" == typeof t && (t = new Error(t)), i("err", [t, (new Date).getTime()])
                }
            }, {}], 13: [function (t, e, n) {
                e.exports = function (t) {
                    if ("string" == typeof t && t.length) return t.length;
                    if ("object" == typeof t) {
                        if ("undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer && t.byteLength) return t.byteLength;
                        if ("undefined" != typeof Blob && t instanceof Blob && t.size) return t.size;
                        if (!("undefined" != typeof FormData && t instanceof FormData)) try {
                            return JSON.stringify(t).length
                        } catch (e) {
                            return
                        }
                    }
                }
            }, {}], 14: [function (t, e, n) {
                var r = 0, o = navigator.userAgent.match(/Firefox[\/\s](\d+\.\d+)/);
                o && (r = +o[1]), e.exports = r
            }, {}], 15: [function (t, e, n) {
                function r(t, e) {
                    var n = [], r = "", i = 0;
                    for (r in t) o.call(t, r) && (n[i] = e(r, t[r]), i += 1);
                    return n
                }

                var o = Object.prototype.hasOwnProperty;
                e.exports = r
            }, {}], 16: [function (t, e, n) {
                function r(t, e, n) {
                    e || (e = 0), "undefined" == typeof n && (n = t ? t.length : 0);
                    for (var r = -1, o = n - e || 0, i = Array(o < 0 ? 0 : o); ++r < o;) i[r] = t[e + r];
                    return i
                }

                e.exports = r
            }, {}], 17: [function (t, e, n) {
                function r(t) {
                    return !(t && t instanceof Function && t.apply && !t[a])
                }

                var o = t("ee"), i = t(16), a = "nr@original", c = Object.prototype.hasOwnProperty, s = !1;
                e.exports = function (t, e) {
                    function n(t, e, n, o) {
                        function nrWrapper() {
                            var r, a, c, s;
                            try {
                                a = this, r = i(arguments), c = "function" == typeof n ? n(r, a) : n || {}
                            } catch (f) {
                                l([f, "", [r, a, o], c])
                            }
                            u(e + "start", [r, a, o], c);
                            try {
                                return s = t.apply(a, r)
                            } catch (d) {
                                throw u(e + "err", [r, a, d], c), d
                            } finally {
                                u(e + "end", [r, a, s], c)
                            }
                        }

                        return r(t) ? t : (e || (e = ""), nrWrapper[a] = t, d(t, nrWrapper), nrWrapper)
                    }

                    function f(t, e, o, i) {
                        o || (o = "");
                        var a, c, s, f = "-" === o.charAt(0);
                        for (s = 0; s < e.length; s++) c = e[s], a = t[c], r(a) || (t[c] = n(a, f ? c + o : o, i, c))
                    }

                    function u(n, r, o) {
                        if (!s || e) {
                            var i = s;
                            s = !0;
                            try {
                                t.emit(n, r, o)
                            } catch (a) {
                                l([a, n, r, o])
                            }
                            s = i
                        }
                    }

                    function d(t, e) {
                        if (Object.defineProperty && Object.keys) try {
                            var n = Object.keys(t);
                            return n.forEach(function (n) {
                                Object.defineProperty(e, n, {
                                    get: function () {
                                        return t[n]
                                    }, set: function (e) {
                                        return t[n] = e, e
                                    }
                                })
                            }), e
                        } catch (r) {
                            l([r])
                        }
                        for (var o in t) c.call(t, o) && (e[o] = t[o]);
                        return e
                    }

                    function l(e) {
                        try {
                            t.emit("internal-error", e)
                        } catch (n) {
                        }
                    }

                    return t || (t = o), n.inPlace = f, n.flag = a, n
                }
            }, {}], ee: [function (t, e, n) {
                function r() {
                }

                function o(t) {
                    function e(t) {
                        return t && t instanceof r ? t : t ? s(t, c, i) : i()
                    }

                    function n(n, r, o) {
                        if (!l.aborted) {
                            t && t(n, r, o);
                            for (var i = e(o), a = h(n), c = a.length, s = 0; s < c; s++) a[s].apply(i, r);
                            var f = u[y[n]];
                            return f && f.push([g, n, r, i]), i
                        }
                    }

                    function p(t, e) {
                        v[t] = h(t).concat(e)
                    }

                    function h(t) {
                        return v[t] || []
                    }

                    function m(t) {
                        return d[t] = d[t] || o(n)
                    }

                    function w(t, e) {
                        f(t, function (t, n) {
                            e = e || "feature", y[n] = e, e in u || (u[e] = [])
                        })
                    }

                    var v = {}, y = {},
                        g = {on: p, emit: n, get: m, listeners: h, context: e, buffer: w, abort: a, aborted: !1};
                    return g
                }

                function i() {
                    return new r
                }

                function a() {
                    (u.api || u.feature) && (l.aborted = !0, u = l.backlog = {})
                }

                var c = "nr@context", s = t("gos"), f = t(15), u = {}, d = {}, l = e.exports = o();
                l.backlog = u
            }, {}], gos: [function (t, e, n) {
                function r(t, e, n) {
                    if (o.call(t, e)) return t[e];
                    var r = n();
                    if (Object.defineProperty && Object.keys) try {
                        return Object.defineProperty(t, e, {value: r, writable: !0, enumerable: !1}), r
                    } catch (i) {
                    }
                    return t[e] = r, r
                }

                var o = Object.prototype.hasOwnProperty;
                e.exports = r
            }, {}], handle: [function (t, e, n) {
                function r(t, e, n, r) {
                    o.buffer([t], r), o.emit(t, e, n)
                }

                var o = t("ee").get("handle");
                e.exports = r, r.ee = o
            }, {}], id: [function (t, e, n) {
                function r(t) {
                    var e = typeof t;
                    return !t || "object" !== e && "function" !== e ? -1 : t === window ? 0 : a(t, i, function () {
                                return o++
                            })
                }

                var o = 1, i = "nr@id", a = t("gos");
                e.exports = r
            }, {}], loader: [function (t, e, n) {
                function r() {
                    if (!b++) {
                        var t = g.info = NREUM.info, e = d.getElementsByTagName("script")[0];
                        if (setTimeout(f.abort, 3e4), !(t && t.licenseKey && t.applicationID && e)) return f.abort();
                        s(v, function (e, n) {
                            t[e] || (t[e] = n)
                        }), c("mark", ["onload", a()], null, "api");
                        var n = d.createElement("script");
                        n.src = "https://" + t.agent, e.parentNode.insertBefore(n, e)
                    }
                }

                function o() {
                    "complete" === d.readyState && i()
                }

                function i() {
                    c("mark", ["domContent", a()], null, "api")
                }

                function a() {
                    return (new Date).getTime()
                }

                var c = t("handle"), s = t(15), f = t("ee"), u = window, d = u.document, l = "addEventListener",
                    p = "attachEvent", h = u.XMLHttpRequest, m = h && h.prototype;
                NREUM.o = {
                    ST: setTimeout,
                    CT: clearTimeout,
                    XHR: h,
                    REQ: u.Request,
                    EV: u.Event,
                    PR: u.Promise,
                    MO: u.MutationObserver
                }, t(12);
                var w = "" + location, v = {
                        beacon: "bam.nr-data.net",
                        errorBeacon: "bam.nr-data.net",
                        agent: "js-agent.newrelic.com/nr-1016.min.js"
                    }, y = h && m && m[l] && !/CriOS/.test(navigator.userAgent),
                    g = e.exports = {offset: a(), origin: w, features: {}, xhrWrappable: y};
                d[l] ? (d[l]("DOMContentLoaded", i, !1), u[l]("load", r, !1)) : (d[p]("onreadystatechange", o), u[p]("onload", r)), c("mark", ["firstbyte", a()], null, "api");
                var b = 0
            }, {}]
        }, {}, ["loader", 2, 10, 4, 3]);
        ;
        NREUM.info = {
            beacon: "bam.nr-data.net",
            errorBeacon: "bam.nr-data.net",
            licenseKey: "2214ccb852",
            applicationID: "39522880",
            sa: 1
        }
    </script>

    <!-- 同步 tuia-h5/unit/layout/baseCss.html -->

    <!-- 首屏加载公用js、css -->
    <link rel="stylesheet" href="/2390/index/actBase_201707271400.css">
    <link rel="stylesheet" type="text/css" href="/2390/index/index_201707271400.css">
    <style>
        .banner {
            background-image: url(/2390/index/tdp0xvc2ue.png) !important;
        }

        .boxImg i {
            background-image: url(/2390/index/zxwc1ce4rg.png) !important;
        }

        body {
            background-color: #0590c9 !important;
        }

        .main {
            background-image: url(/2390/index/q57vbr7jvf.png) !important;
        }

        .record {
            background-image: url(/2390/index/8e0cqgf1ht.png) !important;
        }

        .apple {
            color: #fff !important;
        }

        .apple {
            background-color: #29abe0 !important;
        }

        .rule {
            background-image: url(/2390/index/rule.png) !important;
        }

        .rule-modal .rule-modal-dialog {
            background-color: #46bd84 !important;
        }

        .rule-modal .rule-modal-dialog section .probability {
            background-color: #46bd84 !important;
        }

        .rule-modal .rule-modal-dialog header span, .rule-modal .rule-modal-dialog section .description {
            color: #ffffff !important;
        }

        .rule-modal .rule-modal-dialog header i {
            background-color: #ffffff !important;
        }

        .rule-modal .rule-modal-dialog .close {
            color: #ffffff !important;
        }

        .rule-modal .rule-modal-dialog section .probability .nav {
            background-color: #6abc94 !important;
        }

        .rule-modal .rule-modal-dialog section .probability .nav span {
            color: #ffffff !important;
        }

        .rule-modal .rule-modal-dialog section .probability.active .text {
            color: #ffffff !important;
        }</style>
    <style>.rule-modal .rule-modal-dialog section .probability .nav i {
            border-top-color: #ffffff !important;
            border-left-color: #ffffff !important;
        }</style>
    <script charset="utf-8" async="" src="/2390/index/common_201707271400.js"></script>
    <link rel="stylesheet" href="/2390/index/common_201708081700.css">
    <script charset="utf-8" async="" src="/2390/index/index_201707181200.js"></script>
    <link rel="stylesheet" href="/2390/index/index_201707181200.css">
</head>

<body>
<div id="db-content" style="display: block;" class="">
    <a class="record" href="javascript:void(0);" onclick="setPosition(4, '/prize/list/')"></a>
    <div class="rule"></div>
    <div class="main">
        <div class="banner"></div>
        <div class="box-container">
            <div class="boxImg box" id="box"><i style="transform: rotate(0deg);" class=""></i></div>
            <div class="boxImg rope"><i class="hide"></i></div>
            <div class="boxImg box2"><i class="hide" style="transform: translateY(0px); opacity: 1;"></i></div>
            <div class="needCredits"><p>抽奖机会已用完</p></div>
        </div>
        <div class="leadStart">
            <i class="lead one"></i>
            <i class="lead two"></i>
            <i class="lead three active"></i>
            <i class="lead four"></i>
            <i class="pointer"
               style="display: inline; transform: translateX(0.8rem); transition: -webkit-transform 0.4s linear 0s;"></i>
        </div>
        <div class="prize-list">
            <div class="prize-img-box one">
                <img class="prize-img" src="/2390/index/jc6j67io7d.png" data-id="14638" data-type="physical">
            </div>
            <div class="prize-img-box two">
                <img class="prize-img" src="/2390/index/ds14jt7m79.png" data-id="14639" data-type="physical">
            </div>
            <div class="prize-img-box three">
                <img class="prize-img" src="/2390/index/tt3urp8x4a.png" data-id="14640" data-type="physical">
            </div>
            <div class="prize-img-box four">
                <img class="prize-img" src="/2390/index/nw2ei0bo1g.png" data-id="14641" data-type="physical">
            </div>
            <div class="prize-img-box five">
                <img class="prize-img" src="/2390/index/lucky.png" data-id="14642" data-type="lucky">
            </div>
        </div>
    </div>
    <p class="apple" style="display: none;">*兑换项和活动均与设备生产商Apple Inc.无关</p>
</div>

<script type="text/javascript">
    var CFG = {
        host: '//yun.yuyiya.com', //配置域名
        activityId: '2390', //活动id
        activityType: '4',  //研究
        slotId: '3151',  //广告位id
        preview: false,  //预览
        actType: 'tuia-cutRope',
        isShowBuoy: true,  //是否展示浮标
        isShowRecommend: true,  //是否展示推荐弹层
        isShowNew: true //是否显示abtest新弹层
    };

    function loader(callback) {
        var _files = [
            common_js,
            common_css
        ];
        var _coupons;
        if (!CFG.isShowNew) {
            _coupons = [
                '//yun.yuyiya.com/h5-tuia/couponPrize/1.1/index_201707181200.js',
                '//yun.yuyiya.com/h5-tuia/couponPrize/1.1/index_201707181200.css'
            ];
            CFG.couponVersion = '0100100';
        } else {
            _coupons = [
                '//yun.yuyiya.com/h5-tuia/couponPrize/1.8/index_201707181200.js',
                '//yun.yuyiya.com/h5-tuia/couponPrize/1.8/index_201707181200.css'
            ];
            CFG.couponVersion = '0100800';
        }
        _coupons.length && _files.push.apply(_files, _coupons);

        Loader.async(_files, function () {
            callback && callback();
        });
    }
</script>


<!-- 首屏加载公用js、css -->
<script type="text/javascript" src="/2390/index/actBase_201708081700.js"></script>

<!-- 延迟加载公用js、css -->
<script type="text/javascript">
    var common_js = '/2390/index/common_201707271400.js';
    var common_css = '/2390/index/common_201708081700.css';
</script>
<script type="text/javascript" src="/2390/index/index_201708081700.js"></script>
<script>
    $('body').on('click', '.prize-img-box', function () {
        setPosition(5)
    })
    $('body').on('click', '.coupon-modal-close', function () {
        setPosition(8)
    })

    $('body').on('click', '.J_btnCoupon', function () {
        var order_id = JSON.parse($(this).attr('db-click')).orderId.split('-')[1]
        $.ajax({
            url: '/activity/clickCount',
            dataType: 'json',
            type: 'post',
            async:false,
            data: {id: this_id, random: this_random, position: 7, order_id: order_id},
            success: function () {
                if (url) {
                    window.location.href = url
                }
            }
        })
    })
    $('body').on('click', '.J_gotoDetail', function () {
        var order_id = JSON.parse($(this).attr('db-click')).orderId.split('-')[1]
        $.ajax({
            url: '/activity/clickCount',
            dataType: 'json',
            type: 'post',
            async:false,
            data: {id: this_id, random: this_random, position: 7, order_id: order_id},
            success: function () {
                if (url) {
                    window.location.href = url
                }
            }
        })
    })
</script>
<div class="rule-modal" style="display: none;">
    <div class="rule-modal-dialog">
        <header><i></i><span>活动说明</span><i></i></header>
        <section></section>
        <div class="close"></div>
    </div>
</div>
<a class="buoy" style="display:block;"
   db-exposure="{&quot;dpm&quot;:&quot;28155.21.14.2390&quot;,&quot;consumer_id&quot;:1756680340,&quot;domain&quot;:&quot;//embedlog.duiba.com.cn&quot;,&quot;app_id&quot;:28155}"
   href="http://activity.yuyiya.com/mainMeet/index?id=143&amp;slotId=3151&amp;deviceId=e47e311d-6007-41b9-96eb-7164611a5ef3&amp;login=normal&amp;appKey=2seQ3FgJVZoJxhiLky6WGEfr1jns&amp;dpm=28155.21.14.2390&amp;dsm=2.14.1.2390&amp;wu=bo">
    <style>.buoyImg {
            position: absolute;
            right: 0.05rem;
            top: 3.5rem;
            width: 0.5rem;
            z-index: 20;
        }</style>
    <img class="buoyImg" src="/2390/index/swzwd2uklx.gif"></a>
<iframe align="center"  src="/cnzz/cnzz.html" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
</body>
</html>