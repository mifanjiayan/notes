﻿//Ves v2.0 Copyright Â© 2014-2016 Chen QingZhu All rights reserved.
!function () {
    function init(a, b) {
        var c, d;
        for (this.$ = [], "string" == typeof a ? a.indexOf("<") > -1 ? (c = document.createElement("div"), c.innerHTML = a, this.$ = nodeListToArray(c.childNodes)) : this.$ = selector(a, b) : null != a && (a instanceof Array ? this.$ = a : "undefined" != typeof HTMLCollection && a instanceof HTMLCollection || "undefined" != typeof NodeList && a instanceof NodeList ? this.$ = nodeListToArray(a) : a.$ instanceof Array ? this.$ = a.$ : (1 === a.nodeType || a == window || a == document) && (this.$ = [a]), this.$ = this.$.unique()), this.length = this.$.length, d = 0; d < this.length; d++) this[d] = this.$[d]
    }

    function addEvent(a, b, c, d) {
        var f, g, e = !1;
        for (d = d || c, f = 0; f < $.event.collect.length; f++) if ($.event.collect[f].element == a && $.event.collect[f].event == b && $.event.collect[f]._fun == d) {
            e = !0;
            break
        }
        g = function (d) {
            return c.unbind ? (removeEvent(a, b, c), void 0) : ($event.eventInfo(d), $event.events[b] && $event.events[b](d), 0 == c.call(a, d) && $.event.stopDefault(), void 0)
        }, e || (a.addEventListener ? a.addEventListener(b, g, !1) : a.attachEvent("on" + b, g, !1), $.event.collect.push({
            event: b,
            element: a,
            fun: g,
            _fun: d
        }))
    }

    function removeEvent(a, b, c) {
        for (var d = 0; d < $.event.collect.length; d++) $.event.collect[d].element == a && $.event.collect[d].event == b && $.event.collect[d]._fun == c && (a.removeEventListener ? a.removeEventListener(b, $.event.collect[d].fun, !1) : a.detachEvent("on" + b, $.event.collect[d].fun, !1), $.event.collect.splice(d, 1), d -= 1)
    }

    function selector(a, b) {
        var d, e, f, g, h, i, j, k, l, m, n, c, p, o, q, r, s, t;
        for (b = b ? b : [document], 0 == b instanceof Array && ("undefined" != typeof HTMLCollection && b instanceof HTMLCollection || "undefined" != typeof NodeList && b instanceof NodeList ? b = nodeListToArray(b) : b.$ instanceof Array ? b = b.$ : (1 === b.nodeType || b == window || b == document) && (b = [b])), c = a.split(/,/gi), o = [], q = 0; q < c.length; q++) {
            for (p = b, d = c[q].split(/[\s>~\+]+/gi), n = 0, r = 0; r < d.length; r++) {
                if (r > 0 && (n += d[r - 1].length), r > 1 && (n += 1), r > 0 && p[0] == document) {
                    if (1 == p.length) break;
                    p.shift()
                }
                if (d[r].indexOf("#") > -1) e = d[r].split("#")[1].split(/[.:\[]+/gi), e = document.getElementById(e[0]), null != e ? p = f = [e] : f = []; else {
                    if (e = d[r].split(":")[0].replace(/\[[^\]]+\]/gi, ""), e = e.split("."), l = "" != e[0] ? e[0] : "*", e.shift(), f = g = [], ">" == c[q].charAt(n)) for (s = 0; s < p.length; s++) g = ves(p[s]).children(), "*" != l && (g = g.filter(l)), g = g.$, f = f.union(g); else for (s = 0; s < p.length; s++) f = f.union(nodeListToArray(p[s].getElementsByTagName(l)));
                    if (e.length > 0) {
                        for (g = [], s = 0; s < f.length; s++) "string" == typeof f[s].className && f[s].className.split(" ").contains(e) && g.push(f[s]);
                        f = g
                    }
                    if (e = d[r].split(":")[0], e.indexOf("[") > -1) {
                        for (e = ("a" + e + "a").split(/[(\[)|(\])|(\]\[)]+/gi), e.shift(), e.pop(), g = [], s = 0; s < f.length; s++) {
                            for (m = !0, t = 0; t < e.length; t++) if (e[t].indexOf("*=") > -1) {
                                if (h = e[t].split(/[\s]*\*=[\s]*[\'\"]*/gi), i = h[1].split(/[\'\"]$/gi)[0], h = f[s].getAttribute(h[0]) || f[s][h[0]], !h || h.indexOf(i) < 0) {
                                    m = !1;
                                    break
                                }
                            } else if (e[t].indexOf("^=") > -1) {
                                if (h = e[t].split(/[\s]*\^=[\s]*[\'\"]*/gi), i = h[1].split(/[\'\"]$/gi)[0], h = f[s].getAttribute(h[0]) || f[s][h[0]], !h || 0 != h.indexOf(i)) {
                                    m = !1;
                                    break
                                }
                            } else if (e[t].indexOf("$=") > -1) {
                                if (h = e[t].split(/[\s]*\$=[\s]*[\'\"]*/gi), i = h[1].split(/[\'\"]$/gi)[0], h = f[s].getAttribute(h[0]) || f[s][h[0]], !h) {
                                    m = !1;
                                    break
                                }
                                if (k = j.indexOf(i), k > -1 && k + i.length != j.length) {
                                    m = !1;
                                    break
                                }
                            } else if (e[t].indexOf("!=") > -1) {
                                if (h = e[t].split(/[\s]*\!=[\s]*[\'\"]*/gi), i = h[1].split(/[\'\"]$/gi)[0], h = f[s].getAttribute(h[0]) || f[s][h[0]], !h || h == i) {
                                    m = !1;
                                    break
                                }
                            } else if (e[t].indexOf("=") > -1) {
                                if (h = e[t].split(/[\s]*[=]+[\s]*[\'\"]*/gi), i = h[1].split(/[\'\"]$/gi)[0], h = f[s].getAttribute(h[0]) || f[s][h[0]], !h || h != i) {
                                    m = !1;
                                    break
                                }
                            } else if (e[t].indexOf("(") > -1) {
                                if (h = e[t].split(/[\s]*\([\s]*[\'\"]*/gi), i = h[1].split(/[\'\"\)]$/gi)[0], i = new RegExp(i, "gi"), h = f[s].getAttribute(h[0]) || f[s][h[0]], !h || 0 == i.test(h)) {
                                    m = !1;
                                    break
                                }
                            } else if (!f[s][e[t]] && null == f[s].getAttribute(e[t])) {
                                m = !1;
                                break
                            }
                            1 == m && g.push(f[s])
                        }
                        f = g
                    }
                    if (e = d[r].split(":"), e.length > 1 && f.length > 0) switch (e[1]) {
                        case"first":
                            f = [f[0]];
                            break;
                        case"last":
                            f = [f[f.length - 1]];
                            break;
                        case"odd":
                            for (s = 1; s < f.length; s++) f.splice(s, 1);
                            break;
                        case"even":
                            for (s = 0; s < f.length; s++) f.splice(s, 1);
                            break;
                        default:
                            if (e[1].indexOf("(") > -1) switch (h = e[1].split(/[\(\)]/gi), j = parseInt(h[1]), h[0]) {
                                case"eq":
                                    if (h[1].indexOf("|") > -1) {
                                        for (g = [], h = h[1].split("|"), s = 0; s < h.length; s++) j = parseInt(h[s]), 0 > j || j > f.length - 1 || g.push(f[j]);
                                        f = g
                                    } else f = 0 > j || j > f.length - 1 ? [] : [f[j]];
                                    break;
                                case"lt":
                                    f.splice(j, f.length - j);
                                    break;
                                case"gt":
                                    f.splice(0, j + 1);
                                    break;
                                case"not":
                                    f = f.exclude(selector(h[1]))
                            }
                    }
                    p = f
                }
            }
            o = o.union(f)
        }
        return c.length > 1 && (o = o.unique()), o
    }

    function filter(a, b) {
        var d, e, f, g, h, i, j, k, l, m, n, o, p, c = a.split(/,/gi);
        for (m = 0; m < c.length; m++) for (d = c[m].split(/[\s>~\+]+/gi), n = 0; n < d.length; n++) {
            if (e = d[n].split(":")[0].replace(/\[[^\]]+\]/gi, ""), e = e.split("."), k = e[0], e.shift(), f = [], k) {
                for (o = 0; o < b.length; o++) b[o].tagName.toLowerCase() == k && f.push(b[o]);
                b = f
            }
            if (e.length > 0) {
                for (f = [], o = 0; o < b.length; o++) "string" == typeof b[o].className && b[o].className.split(" ").contains(e) && f.push(b[o]);
                b = f
            }
            if (e = d[n].split(":")[0], e.indexOf("[") > -1) {
                for (e = ("a" + e + "a").split(/[(\[)|(\])|(\]\[)]+/gi), e.shift(), e.pop(), f = [], o = 0; o < b.length; o++) {
                    for (l = !0, p = 0; p < e.length; p++) if (e[p].indexOf("*=") > -1) {
                        if (g = e[p].split(/[\s]*\*=[\s]*[\'\"]*/gi), h = g[1].split(/[\'\"]$/gi)[0], g = b[o].getAttribute(g[0]) || b[o][g[0]], !g || g.indexOf(h) < 0) {
                            l = !1;
                            break
                        }
                    } else if (e[p].indexOf("^=") > -1) {
                        if (g = e[p].split(/[\s]*\^=[\s]*[\'\"]*/gi), h = g[1].split(/[\'\"]$/gi)[0], g = b[o].getAttribute(g[0]) || b[o][g[0]], !g || 0 != g.indexOf(h)) {
                            l = !1;
                            break
                        }
                    } else if (e[p].indexOf("$=") > -1) {
                        if (g = e[p].split(/[\s]*\$=[\s]*[\'\"]*/gi), h = g[1].split(/[\'\"]$/gi)[0], g = b[o].getAttribute(g[0]) || b[o][g[0]], !g) {
                            l = !1;
                            break
                        }
                        if (j = i.indexOf(h), j > -1 && j + h.length != i.length) {
                            l = !1;
                            break
                        }
                    } else if (e[p].indexOf("!=") > -1) {
                        if (g = e[p].split(/[\s]*\!=[\s]*[\'\"]*/gi), h = g[1].split(/[\'\"]$/gi)[0], g = b[o].getAttribute(g[0]) || b[o][g[0]], !g || g == h) {
                            l = !1;
                            break
                        }
                    } else if (e[p].indexOf("=") > -1) {
                        if (g = e[p].split(/[\s]*[=]+[\s]*[\'\"]*/gi), h = g[1].split(/[\'\"]$/gi)[0], g = b[o].getAttribute(g[0]) || b[o][g[0]], !g || g != h) {
                            l = !1;
                            break
                        }
                    } else if (e[p].indexOf("(") > -1) {
                        if (g = e[p].split(/[\s]*\([\s]*[\'\"]*/gi), h = g[1].split(/[\'\"\)]$/gi)[0], h = new RegExp(h, "gi"), g = b[o].getAttribute(g[0]) || b[o][g[0]], !g || 0 == h.test(g)) {
                            l = !1;
                            break
                        }
                    } else if (!b[o][e[p]] && null == b[o].getAttribute(e[p])) {
                        l = !1;
                        break
                    }
                    1 == l && f.push(b[o])
                }
                b = f
            }
            if (e = d[n].split(":"), e.length > 1 && b.length > 0) switch (e[1]) {
                case"first":
                    b = [b[0]];
                    break;
                case"last":
                    b = [b[b.length - 1]];
                    break;
                case"odd":
                    for (o = 1; o < b.length; o++) b.splice(o, 1);
                    break;
                case"even":
                    for (o = 0; o < b.length; o++) b.splice(o, 1);
                    break;
                default:
                    if (e[1].indexOf("(") > -1) switch (g = e[1].split(/[\(\)]/gi), i = parseInt(g[1]), g[0]) {
                        case"eq":
                            if (g[1].indexOf("|") > -1) {
                                for (f = [], g = g[1].split("|"), o = 0; o < g.length; o++) i = parseInt(g[o]), 0 > i || i > b.length - 1 || f.push(b[i]);
                                b = f
                            } else b = 0 > i || i > b.length - 1 ? [] : [b[i]];
                            break;
                        case"lt":
                            b.splice(i, b.length - i);
                            break;
                        case"gt":
                            b.splice(0, i + 1);
                            break;
                        case"not":
                            b = b.exclude(selector(g[1]))
                    }
            }
        }
        return b
    }

    function getStyle(a, b) {
        var c = window.getComputedStyle ? window.getComputedStyle(a, null)[b] : a.currentStyle ? a.currentStyle[b] : a.runtimeStyle ? a.runtimeStyle[b] : "";
        return (null === c || void 0 === c) && (c = ""), c
    }

    function setStyle(a, b, c) {
        var d = b - 0;
        return 0 == isNaN(d) && (b = d), "undefined" == typeof a || null == a ? b : (c ? (d = parseFloat(a.replace(/[^0-9.\-\+]+/gi, "")), d += parseFloat(b), b = a.replace(/[0-9.\-\+]+/gi, d)) : "number" == typeof b && a.indexOf("%") < 0 && (b = a.replace(/[0-9.\-\+]+/gi, b)), b)
    }

    function privateStyle(a, b, c) {
        b = b.charAt(0).toUpperCase() + b.substring(1), a.style[$.browser.core + b] = "string" == typeof c ? c.replace("transform", "-" + $.browser.core + "-transform") : c
    }

    function nodeListToArray(a) {
        var c, b = [];
        for (c = 0; c < a.length; c++) b.push(a[c]);
        return b
    }

    var $, $event, $data = {_ready: [], _loaded: [], isReady: !1, isLoaded: !1, ajaxCount: 0};
    ves = function (a, b) {
        if ("function" != typeof a) return new init(a, b);
        if ($data.isReady) return a.call(ves), void 0;
        if ($data._ready.push(a), 1 == $data._ready.length) var c = setInterval(function () {
            if (("ms" != ves.browser.core || ves.browser.version < 8) && "interactive" == document.readyState || "complete" == document.readyState) {
                clearInterval(c), c = null;
                for (var a = 0; a < $data._ready.length; a++) $data._ready[a].call(ves);
                $data.isReady = !0, delete $data._ready
            }
        }, 10)
    }, $ = ves, ves.ready = function (a) {
        "function" == typeof a && ves(a)
    }, ves.loaded = function (a) {
        if ("function" == typeof a) {
            if ($data.isLoaded) return a.call(ves), void 0;
            $data._loaded.push(a), 1 == $data._loaded.length && ves(function () {
                $data.images = nodeListToArray(document.images);
                var a = setInterval(function () {
                    var b;
                    for (b = 0; b < $data.images.length; b++) {
                        if (!$data.images[b].complete) return;
                        $data.images.splice(b, 1), b -= 1
                    }
                    for (clearInterval(a), a = null, b = 0; b < $data._loaded.length; b++) $data._loaded[b].call(ves);
                    $data.isLoaded = !0, delete $data._loaded
                }, 100)
            })
        }
    }, init.prototype = {
        parent: function () {
            var b, a = [];
            for (b = 0; b < this.$.length; b++) this.$[b].parentNode && this.$[b] !== ves.html[0] && a.push(this.$[b].parentNode);
            return new init(a)
        }, parents: function (a) {
            var c, b = [];
            for (c = 0; c < this.$.length; c++) !function () {
                this.parentNode && this !== ves.html[0] && (b.push(this.parentNode), arguments.callee.call(this.parentNode))
            }.call(this.$[c]);
            return "string" == typeof a ? b = filter(a, b) : "number" == typeof a && (b = a > b.length - 1 ? [] : b.unique()[a]), new init(b)
        }, children: function (a) {
            var c, d, e, b = [];
            for (d = 0; d < this.$.length; d++) for (c = this.$[d].childNodes, e = 0; e < c.length; e++) 1 === c[e].nodeType && b.push(c[e]);
            return "string" == typeof a ? b = filter(a, b) : "number" == typeof a && (b = b.unique()[a]), new init(b)
        }, find: function (a) {
            return new init(selector(a, this.$))
        }, filter: function (a) {
            return new init(filter(a, this.$))
        }, siblings: function (a) {
            var b = this.parent(), c = b.children().$.exclude(this.$);
            return "string" == typeof a ? c = filter(a, c) : "number" == typeof a && (c = c.unique()[a]), new init(c)
        }, next: function () {
            var b, a = [];
            for (b = 0; b < this.$.length; b++) !function () {
                return 1 === this.nodeType ? (a.push(this), void 0) : (this.nextSibling && arguments.callee.call(this.nextSibling), void 0)
            }.call(this.$[b].nextSibling);
            return new init(a)
        }, nexts: function (a) {
            var c, b = [];
            for (c = 0; c < this.$.length; c++) !function () {
                1 === this.nodeType && b.push(this), this.nextSibling && arguments.callee.call(this.nextSibling)
            }.call(this.$[c].nextSibling);
            return "string" == typeof a ? b = filter(a, b) : "number" == typeof a && (b = b.unique()[a]), new init(b)
        }, prev: function () {
            var b, a = [];
            for (b = 0; b < this.$.length; b++) !function () {
                return 1 === this.nodeType ? (a.push(this), void 0) : (this.previousSibling && arguments.callee.call(this.previousSibling), void 0)
            }.call(this.$[b].previousSibling);
            return new init(a)
        }, prevs: function (a) {
            var c, b = [];
            for (c = 0; c < this.$.length; c++) !function () {
                1 === this.nodeType && b.push(this), this.previousSibling && arguments.callee.call(this.previousSibling)
            }.call(this.$[c].previousSibling);
            return "string" == typeof a ? b = filter(a, b) : "number" == typeof a && (b = b.unique()[a]), new init(b)
        }, index: function () {
            var b, a = this.parent().children().$;
            for (b = 0; b < a.length; b++) if (a[b] == this.$[0]) return b;
            return -1
        }, eq: function (a) {
            var c, b = [];
            if (0 == this.$.length) return new init(b);
            if ("number" == typeof a ? a = [a] : "string" == typeof a && (a = a.split(/[,\s\|][\s]*/gi)), a instanceof Array) for (c = 0; c < a.length; c++) a[c] = parseInt(a[c]), a[c] < 0 || a[c] > this.$.length - 1 || b.push(this.$[a[c]]);
            return new init(b)
        }, lt: function (a) {
            return a > this.$.length - 1 && (a = this.$.length - 1), new init(this.$.slice(0, a))
        }, gt: function (a) {
            return a > this.$.length - 1 && (a = this.$.length - 1), new init(this.$.slice(a))
        }, not: function (a) {
            return new init(this.$.exclude(selector(a)))
        }, is: function (a) {
            return selector(a).contains(this.$) ? !0 : !1
        }, contains: function (a) {
            var d, b = this.$[0], c = !1;
            if (a instanceof Array) {
                for (d = 0; d < a.length; d++) if (c = !1, function () {
                        if (this.parentNode) {
                            if (this.parentNode == b) return c = !0, void 0;
                            arguments.callee.call(this.parentNode)
                        }
                    }.call(a[d]), 0 == c) return !1;
                return !0
            }
            return function () {
                if (this.parentNode) {
                    if (this.parentNode == b) return c = !0, void 0;
                    arguments.callee.call(this.parentNode)
                }
            }.call(a), c
        }, each: function (a) {
            for (var b = 0; b < this.$.length && 0 != a.call(this.$[b], b); b++) ;
            return this
        }, css: function (a, b, c) {
            var d, e, f, g, h;
            if ("object" == typeof a) {
                f = {};
                for (g in a) f[g.replace(/-[a-z]{1}/gi, function (a) {
                    return a.substring(1).toUpperCase()
                })] = a[g];
                for (h = 0; h < this.$.length; h++) for (g in f) e = getStyle(this.$[h], g), "function" == typeof f[g] ? (d = f[g].call(this.$[h], e), "undefined" != typeof d && (d = setStyle(e, d, b), this.$[h].style[g] = d, privateStyle(this.$[h], g, d))) : (d = setStyle(e, f[g], b), this.$[h].style[g] = d, privateStyle(this.$[h], g, d));
                return this
            }
            switch (a = a.replace(/-[a-z]{1}/gi, function (a) {
                return a.substring(1).toUpperCase()
            }), typeof b) {
                case"undefined":
                    if (0 == this.$.length) return;
                    return b = getStyle(this.$[0], a), b.indexOf("%") < 0 && (d = parseFloat(b), isNaN(d) || (b = d)), b;
                case"function":
                    for (h = 0; h < this.$.length; h++) e = getStyle(this.$[h], a), d = b.call(this.$[h], getStyle(this.$[h], a)), d = setStyle(e, d, c), "undefined" != typeof d && (this.$[h].style[a] = d, privateStyle(this.$[h], a, d));
                    break;
                default:
                    for (h = 0; h < this.$.length; h++) e = getStyle(this.$[h], a), d = setStyle(e, b, c), this.$[h].style[a] = d, privateStyle(this.$[h], a, d)
            }
            return this
        }, attr: function (a, b) {
            var c, d, e;
            if ("object" == typeof a) {
                for (c = 0; c < this.$.length; c++) for (d in a) "function" == typeof a[d] ? (e = a[d].call(this.$[c], this.$[c].getAttribute(d)), "undefined" != typeof e && (null != e ? this.$[c].setAttribute(d, e) : this.$[c].removeAttribute(d))) : this.$[c].setAttribute(d, a[d]);
                return this
            }
            if (null === b) {
                for (c = 0; c < this.$.length; c++) this.$[c].removeAttribute(a);
                return this
            }
            switch (typeof b) {
                case"undefined":
                    if (0 == this.$.length) return;
                    return this.$[0].getAttribute(a);
                case"function":
                    for (c = 0; c < this.$.length; c++) e = b.call(this.$[c], this.$[c].getAttribute(a)), "undefined" != typeof e && (null != e ? this.$[c].setAttribute(a, e) : this.$[c].removeAttribute(a));
                    break;
                default:
                    for (c = 0; c < this.$.length; c++) this.$[c].setAttribute(a, b)
            }
            return this
        }, _attr: function (a, b) {
            var c, d, e;
            if ("object" == typeof a) {
                for (c = 0; c < this.$.length; c++) for (d in a) "function" == typeof a[d] ? (e = a[d].call(this.$[c], this.$[c][d]), "undefined" != typeof e && (null != e ? this.$[c][d] = e : this.$[c][d] && delete this.$[c][d])) : this.$[c][d] = a[d];
                return this
            }
            if (null === b) {
                for (c = 0; c < this.$.length; c++) this.$[c][a] && delete this.$[c][a];
                return this
            }
            switch (typeof b) {
                case"undefined":
                    if (0 == this.$.length) return;
                    return this.$[0][a];
                case"function":
                    for (c = 0; c < this.$.length; c++) e = b.call(this.$[c], this.$[c][a]), "undefined" != typeof e && (null != e ? this.$[c][a] = e : this.$[c][a] && delete this.$[c][a]);
                    break;
                default:
                    for (c = 0; c < this.$.length; c++) this.$[c][a] = b
            }
            return this
        }, height: function (a, b) {
            return a || 0 == a ? (this.css("height", a, b), this) : 0 == this.$.length ? -1 : this.$[0] == document ? document.documentElement.clientHeight : this.$[0] == window ? window.screen.height : this.css("height")
        }, width: function (a, b) {
            return a || 0 == a ? (this.css("width", a, b), this) : 0 == this.$.length ? -1 : this.$[0] == document ? document.documentElement.clientWidth : this.$[0] == window ? window.screen.width : this.css("width")
        }, addClass: function (a) {
            var b, c;
            for (0 == a instanceof Array && (a = a.split(/[,\s\|][\s]*/gi)), c = 0; c < this.$.length; c++) b = this.$[c].className.split(/[\s]+/g), this.$[c].className = b.union(a).join(" ").trim();
            return this
        }, removeClass: function (a) {
            var b, c;
            for (0 == a instanceof Array && (a = a.split(/[,\s\|][\s]*/gi)), c = 0; c < this.$.length; c++) b = this.$[c].className.split(/[\s]+/g), this.$[c].className = b.exclude(a).join(" ").trim(), "" == this.$[c].className && this.$[c].removeAttribute("class");
            return this
        }, toggleClass: function (a) {
            var b, c;
            for (0 == a instanceof Array && (a = a.split(/[,\s\|][\s]*/gi)), c = 0; c < this.$.length; c++) b = this.$[c].className.split(/[\s]+/g), this.$[c].className = b.exclude(a).union(a.exclude(b)).join(" ").trim(), "" == this.$[c].className && this.$[c].removeAttribute("class");
            return this
        }, hasAttr: function (a) {
            var b, c;
            for (0 == a instanceof Array && (a = a.split(/[,\s\|][\s]*/gi)), b = 0; b < this.$.length; b++) for (c = 0; c < a.length; c++) if ("undefined" == typeof(this.$[b].getAttribute(a[c]) || this.$[b][a[c]])) return !1;
            return !0
        }, noAttr: function (a) {
            var b, c;
            for (0 == a instanceof Array && (a = a.split(/[,\s\|][\s]*/gi)), b = 0; b < this.$.length; b++) for (c = 0; c < a.length; c++) if ("undefined" != typeof(this.$[b].getAttribute(a[c]) || this.$[b][a[c]])) return !1;
            return !0
        }, hasClass: function (a) {
            var b, c;
            for (0 == a instanceof Array && (a = a.split(/[,\s\|][\s]*/gi)), b = 0; b < this.$.length; b++) for (c = 0; c < a.length; c++) if (0 == this.$[b].className.split(/[\s]+/g).contains(a[c])) return !1;
            return !0
        }, noClass: function (a) {
            var b, c;
            for (0 == a instanceof Array && (a = a.split(/[,\s\|][\s]*/gi)), b = 0; b < this.$.length; b++) for (c = 0; c < a.length; c++) if (this.$[b].className.split(/[\s]+/g).contains(a[c])) return !1;
            return !0
        }, val: function (a) {
            var c, b = typeof a;
            if ("string" == b || "number" == b) {
                for (c = 0; c < this.$.length; c++) this.$[c].value = a;
                return this
            }
            if ("function" == b) {
                for (c = 0; c < this.$.length; c++) this.$[c].value = a.call(this.$[c]);
                return this
            }
            return 0 == this.$.length ? null : this.$[0].value
        }, html: function (value) {
            var type, i, viewModel, script;
            if (0 != this.$.length) {
                if (type = typeof value, void 0 == value) return this.$[0].innerHTML;
                if ("string" == type || "number" == type) for (i = 0; i < this.$.length; i++) this.$[i].innerHTML = value; else if ("function" == type) for (i = 0; i < this.$.length; i++) this.$[i].innerHTML = value.call(this.$[i]);
                for (i = 0; i < this.$.length; i++) script = ves("script", this.$[i]), script.each(function () {
                    eval(this.innerHTML)
                });
                return this
            }
        }, text: function (a) {
            var c, b = typeof a;
            if ("string" == b || "number" == b) {
                if (this.$[0].innerText) for (c = 0; c < this.$.length; c++) this.$[c].innerText = a; else for (c = 0; c < this.$.length; c++) this.$[c].textContent = a;
                return this
            }
            if ("function" == b) {
                if (this.$[0].innerText) for (c = 0; c < this.$.length; c++) this.$[c].innerText = a.call(this.$[c]); else for (c = 0; c < this.$.length; c++) this.$[c].textContent = a.call(this.$[c]);
                return this
            }
            if (0 != this.$.length) return this.$[0].innerText ? this.$[0].innerText : this.$[0].textContent
        }, insertBefore: function (a) {
            var b, c, d;
            for (0 == a instanceof Array && ("undefined" != typeof HTMLCollection && a instanceof HTMLCollection || "undefined" != typeof NodeList && a instanceof NodeList ? a = nodeListToArray(a) : a.$ instanceof Array ? a = a.$ : (1 === a.nodeType || a == window || a == document) && (a = [a])), b = a[0].parentNode, c = 0; c < this.$.length; c++) b.insertBefore(this.$[c], a[0]);
            for (c = 1; c < a.length; c++) for (b = a[c].parentNode, d = 0; d < this.$.length; d++) b.insertBefore(this.$[d].cloneNode(!0), a[c]);
            return this
        }, insertAfter: function (a) {
            var b, c, d, e;
            if (0 == a instanceof Array && ("undefined" != typeof HTMLCollection && a instanceof HTMLCollection || "undefined" != typeof NodeList && a instanceof NodeList ? a = nodeListToArray(a) : a.$ instanceof Array ? a = a.$ : (1 === a.nodeType || a == window || a == document) && (a = [a])), b = a[0].parentNode, a[0].nextSibling) for (d = a[0].nextSibling, c = 0; c < this.$.length; c++) b.insertBefore(this.$[c], d); else for (c = 0; c < this.$.length; c++) b.appendChild(this.$[c]);
            for (c = 1; c < a.length; c++) if (b = a[c].parentNode, a[c].nextSibling) for (d = a[c].nextSibling, e = 0; e < this.$.length; e++) b.insertBefore(this.$[e].cloneNode(!0), d); else for (e = 0; e < this.$.length; e++) b.appendChild(this.$[e].cloneNode(!0));
            return this
        }, append: function (a, b) {
            var c, d, e, f, g, h;
            if (0 == this.$.length) return this;
            if (0 == a instanceof Array && ("undefined" != typeof HTMLCollection && a instanceof HTMLCollection || "undefined" != typeof NodeList && a instanceof NodeList ? a = nodeListToArray(a) : a.$ instanceof Array ? a = a.$ : (1 === a.nodeType || a == window || a == document) && (a = [a])), "number" != typeof b) {
                for (c = 0; c < a.length; c++) this.$[0].appendChild(a[c]);
                for (c = 1; c < this.$.length; c++) for (d = 0; d < a.length; d++) this.$[c].appendChild(a[d].cloneNode(!0))
            } else {
                if (e = this.eq(0).children(), e.length > 0) for (f = b, f > e.$.length - 1 && (f = e.$.length - 1), g = e.$[f], c = 0; c < a.length; c++) this.$[0].insertBefore(a[c], g); else for (c = 0; c < a.length; c++) this.$[0].appendChild(a[c]);
                for (c = 1; c < this.$.length; c++) if (e = this.eq(c).children(), e.length > 0) for (f = b, f > e.$.length - 1 && (f = e.$.length - 1), g = e.$[f], d = 0; d < a.length; c++) this.$[c].insertBefore(a[d].cloneNode(!0), g); else for (h = 0; h < a.length; h++) this.$[c].appendChild(a[h])
            }
            return this
        }, remove: function () {
            for (var a = 0; a < this.$.length; a++) this.$[a].parentNode && this.$[a].parentNode.removeChild(this.$[a])
        }, appear: function (a) {
            var b, c, d;
            for (b = 0; b < this.$.length; b++) if (c = this.$[b].getBoundingClientRect().top, d = document.documentElement.clientHeight, a) {
                if (0 > c || c + this.$[b].offsetHeight > d) return !1
            } else if (c > 0 && c >= d || 0 >= c && c + this.$[b].offsetHeight <= 0) return !1;
            return !0
        }, animate: function (a, b, c) {
            var e, f, g, d = {};
            for (f in a) e = "function" == typeof a[f] ? a[f] : (a[f] + "").replace("px", ""), d[f.replace(/-([a-z]{1})/gi, function (a) {
                return a.substring(1).toUpperCase()
            })] = e;
            for (c = c ? "_attr" : "css", a = {}, g = 0; g < this.$.length; g++) {
                for (f in d) e = "function" == typeof d[f] ? d[f].call(this.$[g]) + "" : d[f], a[f] = parseInt(e.replace(/[^0-9.\-\+]+/gi, ""));
                !function (a) {
                    var d = this, e = 0, f = 0, g = 0;
                    this.animateData = a, this.animateType = c, this.animateComplete = b, this.animateTimer = setInterval(function () {
                        var h, i, j;
                        for (j in a) i = h = $(d)[c](j), "string" == typeof i && (i = parseInt(i.replace(/[^0-9.\-\+]+/gi, ""))), e = (a[j] - i) / 15, e = e > 0 ? Math.ceil(e) : Math.floor(e), f = i + e, g = f, "string" == typeof h && (g = h.replace(/[0-9.\-\+]+/gi, f)), $(d)[c](j, g), (0 >= e && f <= a[j] || e >= 0 && f >= a[j]) && (d.animateTimer && (clearInterval(d.animateTimer), delete d.animateTimer, delete d.animateData, delete d.animateType, delete d.animateComplete), b && b.call(d))
                    }, 5)
                }.call(this.$[g], a)
            }
            return this
        }, stop: function (a) {
            var b, c;
            if (a) for (c = 0; c < this.length; c++) b = this.$[c], b.animateTimer && (ves(b)[b.animateType](b.animateData), b.animateComplete && b.animateComplete.call(b), clearInterval(b.animateTimer), delete b.animateTimer, delete b.animateData, delete b.animateType, delete b.animateComplete); else for (c = 0; c < this.length; c++) b = this.$[c], b.animateTimer && (b.animateComplete && b.animateComplete.call(b), clearInterval(b.animateTimer), delete b.animateTimer, delete b.animateData, delete b.animateType, delete b.animateComplete);
            return this
        }, bind: function (a, b, c) {
            var d, e, f;
            if ("string" != typeof a || 0 == a.length) return this;
            if (0 == a instanceof Array && (a = a.split(/[,\s\|][\s]*/gi)), "function" != typeof b) {
                for (d = 0; d < this.$.length; d++) for (e = 0; e < a.length; e++) this.$[d][a[e]]();
                return this
            }
            for (f = 0; f < a.length; f++) if ($event.comEvent[a[f]]) $event.comEvent[a[f]].fun.call(this, b); else for (d = 0; d < this.$.length; d++) addEvent(this.$[d], a[f], b, c);
            return this
        }, unbind: function (a, b) {
            var c, d, e, f;
            for (0 == a instanceof Array && (a = a.split(/[,\s\|][\s]*/gi)), c = a.length, d = 0; c > d; d++) $event.comEvent[a[d]] && (a.insert($event.comEvent[a[d]].events), a.splice(d, 1), d -= 1);
            if ("function" != typeof b) for (d = 0; d < this.$.length; d++) for (e = 0; e < a.length; e++) for (f = 0; f < $.event.collect.length; f++) $.event.collect[f].element == this.$[d] && $.event.collect[f].fun != $event.events[a[e]] && removeEvent(this.$[d], a[e], $.event.collect[f]._fun || $.event.collect[f].fun); else for (d = 0; d < this.$.length; d++) for (f = 0; f < a.length; f++) removeEvent(this.$[d], a[f], b);
            return this
        }
    }, init.prototype.on = init.prototype.bind, init.prototype.off = init.prototype.unbind, $.event = {
        data: {},
        collect: [],
        stopParent: function () {
            $.event.self.stopPropagation ? $.event.self.stopPropagation() : $.event.self.cancelBubble = !0
        },
        stopDefault: function () {
            var a = $.event.self;
            a.preventDefault ? a.preventDefault() : a.returnValue && (a.returnValue = !1)
        }
    }, $event = {
        eventInfo: function (a) {
            var b = a.currentTarget || a.srcElement, c = "mouseout" == a.type ? "toElement" : "fromElement";
            c = a.relatedTarget || a[c], $.event.isRelated = !c || c != b && 0 == $(b).contains(c) ? !1 : !0, $.event.related = c, $.event.target = b, (a.type.indexOf("click") > -1 || a.type.indexOf("mouse") > -1) && $event.touchLastTime && ((new Date).getTime() - this.touchLastTime < 1e3 ? $.event.stop = !0 : delete $.event.stop, $event.touchLastTime = null), a.type.indexOf("touch") > -1 && ($event.touchLastTime = (new Date).getTime(), delete $.event.stop), $.event.self = a
        }, comEvent: {
            tap: {
                fun: function (a) {
                    return this.bind("click", function (b) {
                        return $.event.stop ? void 0 : a.call(this, b)
                    }, a), this.bind("touchstart", $event.events.touchstart), this.bind("touchend", function (b) {
                        var c = $.event.data["moveXL"], d = $.event.data["moveYL"];
                        return c > -3 && 3 > c && d > -3 && 3 > d ? a.call(this, b) : void 0
                    }, a), this
                }, events: "click,touchend"
            }, tapin: {
                fun: function (a) {
                    return this.bind("mouseover", function (b) {
                        return $.event.stop || $.event.isRelated ? void 0 : a.call(this, b)
                    }, a), this.bind("touchstart", a), this
                }, events: "mouseover,touchstart"
            }, tapout: {
                fun: function (a) {
                    this.bind("mouseover", $event.events.mouseover), this.bind("mouseout", function (b) {
                        return $.event.stop || $.event.isRelated ? void 0 : a.call(this, b)
                    }, a);
                    var b = this;
                    return $(this).bind("touchstart", function () {
                        $.event.stopParent(), $.body.bind("touchstart", function (c) {
                            return $.body.unbind("touchstart", arguments.callee), a.call(b, c)
                        })
                    }, a), this
                }, events: "mouseout,touchstart"
            }, tapstart: {
                fun: function (a) {
                    return this.bind("mousedown", function (b) {
                        return $.event.stop ? void 0 : a.call(this, b)
                    }, a), this.bind("touchstart", a), this
                }, events: "mousedown,touchstart"
            }, tapend: {
                fun: function (a) {
                    return this.bind("mousedown", $event.events.mousedown).bind("touchstart", $event.events.touchstart), this.bind("mouseup", function (b) {
                        return $.event.stop ? void 0 : a.call(this, b)
                    }, a), this.bind("touchend", a), this
                }, events: "mouseup,touchend"
            }, press: {
                fun: function (a) {
                    return this.bind("touchend", $event.events.touchend).bind("mouseup", $event.events.mouseup).bind("mousemove", $event.events.mousemove).bind("touchmove", $event.events.touchmove), this.bind("touchstart,mousedown", function (b) {
                        var c, d;
                        $.event.stop || (c = $.event.data.startT, d = this, window.setTimeout(function () {
                            var e, f;
                            c === $.event.data.startT && (!$.event.data.endT || $.event.data.endT < $.event.data.startT) && (e = $.event.data["moveXL"], f = $.event.data["moveYL"], (void 0 == e || e > -3 && 3 > e) && (void 0 == f || f > -3 && 3 > f) && a.call(d, b))
                        }, 500))
                    }, a), this
                }, events: "touchstart,mousedown"
            }, swipe: {
                fun: function (a) {
                    return this.bind("mousedown", $event.events.mousedown).bind("touchstart", $event.events.touchstart), this.bind("mouseup,touchend", function (b) {
                        var c, d;
                        if (!$.event.stop) return c = $.event.data["moveXL"], d = $.event.data["moveYL"], -3 > c || c > 3 || -3 > d || d > 3 ? a.call(this, b) : void 0
                    }, a), this
                }, events: "mouseup,touchend"
            }, swiping: {
                fun: function (a) {
                    var b = function (b) {
                        $.event.stop || "undefined" != typeof $.event.data.moveXS && a.call(this, b)
                    };
                    return this.bind("mousedown", function () {
                        $.event.stop || ($(this).bind("mousemove", b), $(this).bind("mouseup,mouseout", function () {
                            $(this).unbind("mousemove", b).unbind("mouseup,mouseout", arguments.callee)
                        }))
                    }, a), this.bind("touchstart", $event.events.touchstart), this.bind("touchmove", b, a), this
                }, events: "mousedown,touchmove"
            }, scrolled: {
                fun: function (a) {
                    var b = 0, c = null;
                    return this.bind("scroll", function (d) {
                        var e, f;
                        b += 1, e = b, f = this, clearTimeout(c), c = setTimeout(function () {
                            e == b && (b = 0, a.call(f, d))
                        }, 300)
                    }, a), this
                }, events: "scroll"
            }, iscroll: {
                fun: function (a) {
                    var b = null;
                    this.on("scroll", function (b) {
                        a.call(this, b)
                    }).on("tapin,tapout", function () {
                        ves.event.stopDefault(), ves.event.stopParent()
                    }).on("swiping", function (c) {
                        ves(this).stop(!0), clearInterval(b);
                        var d = this.scrollTop - 2 * ves.event.data.moveYS;
                        0 > d ? d = 0 : d > this.scrollHeight - this.clientHeight && (d = this.scrollHeight - this.clientHeight), this.scrollTop = d, a.call(this, c)
                    }).on("swipe", function (c) {
                        var d, e, f;
                        ves.event.data.moveT < .5 && (d = ves(this), e = this.scrollTop, ves.event.data.moveYL < 0 ? e += document.documentElement.clientHeight : e -= document.documentElement.clientHeight, d.stop(!0).animate({scrollTop: parseInt(e)}, null, !0), f = 0, clearInterval(b), b = setInterval(function () {
                            f += 1, 50 == f && (clearInterval(b), b = null), a.call(d[0], c)
                        }, 10))
                    })
                }, events: "mouseup,touchend,mousedown,touchmove"
            }, resized: {
                fun: function (a) {
                    var b = 0, c = null;
                    return this.bind("resize", function (d) {
                        var e, f;
                        b += 1, e = b, f = this, clearTimeout(c), c = setTimeout(function () {
                            e == b && (b = 0, a.call(f, d))
                        }, 300)
                    }, a), this
                }, events: "resize"
            }, animationstart: {
                fun: function (a) {
                    return this.bind("animationstart,webkitAnimationStart", a), this
                }, events: "animationstart,webkitAnimationStart"
            }, animationend: {
                fun: function (a) {
                    return this.bind("animationend,webkitAnimationEnd", a), this
                }, events: "animationend,webkitAnimationEnd"
            }, animationiteration: {
                fun: function (a) {
                    return this.bind("animationiteration,webkitAnimationIteration", a), this
                }, events: "animationiteration,webkitAnimationIteration"
            }, transitionend: {
                fun: function (a) {
                    return this.bind("transitionend,webkitTransitionEnd", a), this
                }, events: "transitionend,webkitTransitionEnd"
            }
        }, touchLastTime: null, events: {
            touchstart: function (a) {
                a = $.event.self;
                var b = a.targetTouches[0];
                "undefined" != typeof $.event.data["startX"] && ($.event.data["startXL"] = b.clientX - $.event.data["startX"], $.event.data["startYL"] = b.clientY - $.event.data["startY"]), $.event.data["startX"] = b.clientX, $.event.data["startY"] = b.clientY, $.event.data["startT"] = new Date, $event.deleteEventData()
            }, touchmove: function (a) {
                var b, c, d;
                a = $.event.self, b = a.changedTouches[0], "undefined" != typeof $.event.data["moveX"] && (c = b.clientX - $.event.data["moveX"], 0 != c && (void 0 == $.event.data["moveXR"] ? $.event.data["moveXR"] = 0 : c !== $.event.data["moveXS"] && ($.event.data["moveXR"] += 1), $.event.data["moveXS"] = c, void 0 == $.event.data["moveXSS"] && ($.event.data["moveXSS"] = c)), d = b.clientY - $.event.data["moveY"], 0 != d && (void 0 == $.event.data["moveYR"] ? $.event.data["moveYR"] = 0 : d !== $.event.data["moveYS"] && ($.event.data["moveYR"] += 1), $.event.data["moveYS"] = d, void 0 == $.event.data["moveYSS"] && ($.event.data["moveYSS"] = d))), $.event.data["moveX"] = b.clientX, $.event.data["moveY"] = b.clientY, $.event.data["moveXL"] = $.event.data["moveX"] - $.event.data["startX"], $.event.data["moveYL"] = $.event.data["moveY"] - $.event.data["startY"], $.event.data["startT"] && ($.event.data["moveT"] = (new Date - $.event.data["startT"]) / 1e3)
            }, touchend: function (a) {
                a = $.event.self;
                var b = a.changedTouches[0];
                "undefined" != typeof $.event.data["endX"] && ($.event.data["endXL"] = b.clientX - $.event.data["endX"], $.event.data["endYL"] = b.clientY - $.event.data["endY"]), $.event.data["endX"] = b.clientX, $.event.data["endY"] = b.clientY, $.event.data["moveXL"] = $.event.data["endX"] - $.event.data["startX"], $.event.data["moveYL"] = $.event.data["endY"] - $.event.data["startY"], $.event.data["endT"] = new Date, $.event.data["startT"] && ($.event.data["moveT"] = ($.event.data["endT"] - $.event.data["startT"]) / 1e3)
            }, mouseover: function (a) {
                a = $.event.self, "undefined" != typeof $.event.data["startX"] && ($.event.data["startXL"] = a.clientX - $.event.data["startX"], $.event.data["startYL"] = a.clientY - $.event.data["startY"]), $.event.data["startX"] = a.clientX, $.event.data["startY"] = a.clientY, $.event.data["startT"] = new Date, $event.deleteEventData()
            }, mousedown: function (a) {
                a = $.event.self, "undefined" != typeof $.event.data["startX"] && ($.event.data["startXL"] = a.clientX - $.event.data["startX"], $.event.data["startYL"] = a.clientY - $.event.data["startY"]), $.event.data["startX"] = a.clientX, $.event.data["startY"] = a.clientY, $.event.data["startT"] = new Date, $event.deleteEventData()
            }, mouseup: function (a) {
                a = $.event.self, "undefined" != typeof $.event.data["endX"] && ($.event.data["endXL"] = a.clientX - $.event.data["endX"], $.event.data["endYL"] = a.clientY - $.event.data["endY"]), $.event.data["endX"] = a.clientX, $.event.data["endY"] = a.clientY, $.event.data["moveXL"] = $.event.data["endX"] - $.event.data["startX"], $.event.data["moveYL"] = $.event.data["endY"] - $.event.data["startY"], $.event.data["endT"] = new Date, $.event.data["startT"] && ($.event.data["moveT"] = ($.event.data["endT"] - $.event.data["startT"]) / 1e3)
            }, mouseout: function (a) {
                a = $.event.self, "undefined" != typeof $.event.data["endX"] && ($.event.data["endXL"] = a.clientX - $.event.data["endX"], $.event.data["endYL"] = a.clientY - $.event.data["endY"]), $.event.data["endX"] = a.clientX, $.event.data["endY"] = a.clientY
            }, mousemove: function (a) {
                var b, c;
                a = $.event.self, "undefined" != typeof $.event.data["moveX"] && (b = a.clientX - $.event.data["moveX"], 0 != b && (void 0 == $.event.data["moveXR"] ? $.event.data["moveXR"] = 0 : b !== $.event.data["moveXS"] && ($.event.data["moveXR"] += 1), $.event.data["moveXS"] = b, void 0 == $.event.data["moveXSS"] && ($.event.data["moveXSS"] = b)), c = a.clientY - $.event.data["moveY"], 0 != c && (void 0 == $.event.data["moveYR"] ? $.event.data["moveYR"] = 0 : c !== $.event.data["moveYS"] && ($.event.data["moveYR"] += 1), $.event.data["moveYS"] = c, void 0 == $.event.data["moveYSS"] && ($.event.data["moveYSS"] = c))), $.event.data["moveX"] = a.clientX, $.event.data["moveY"] = a.clientY, $.event.data["moveXL"] = $.event.data["moveX"] - $.event.data["startX"], $.event.data["moveYL"] = $.event.data["moveY"] - $.event.data["startY"], $.event.data["startT"] && ($.event.data["moveT"] = (new Date - $.event.data["startT"]) / 1e3)
            }, click: function (a) {
                a = $.event.self, "undefined" != typeof $.event.data["startX"] && ($.event.data["startXL"] = a.clientX - $.event.data["startX"], $.event.data["startYL"] = a.clientY - $.event.data["startY"]), $.event.data["startX"] = a.clientX, $.event.data["startY"] = a.clientY, $event.deleteEventData()
            }
        }, deleteEventData: function () {
            "undefined" != typeof $.event.data["moveX"] && (delete $.event.data["moveX"], delete $.event.data["moveY"], delete $.event.data["moveT"], delete $.event.data["moveXS"], delete $.event.data["moveXL"], delete $.event.data["moveYS"], delete $.event.data["moveYL"], delete $.event.data["moveXR"], delete $.event.data["moveYR"], delete $.event.data["moveXSS"], delete $.event.data["moveYSS"])
        }
    }, $.extend = function () {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" != typeof g && "function" != typeof g && (g = {}), h == i && (g = this, h--); i > h; h++) if (null != (e = arguments[h])) for (d in e) a = g[d], c = e[d], g != c && (j && c && ("object" == typeof c || (b = c instanceof Array)) ? (b ? (b = !1, f = a && a instanceof Array ? a : []) : f = a && "object" == typeof a ? a : {}, g[d] = $.extend(j, f, c)) : void 0 != c && (g[d] = c));
        return g
    }, $.prototype = function (a, b) {
        init.prototype[a] || (init.prototype[a] = b)
    }, $.ajax = function (para) {
        var isOut, hostname, script, ifr, form, _enctype, _method, _target, _action, xmlhttp, _data, key, now;
        if (para || (para = {}), "undefined" == typeof para.url && (para.url = window.location.href), null != para.url) {
            if (isOut = para.url.indexOf("://") > -1, (isOut || "script" == para.dataType && para.async !== !1) && (hostname = isOut ? para.url.split("://")[1].split(/\/|:/)[0] : "", hostname != window.location.hostname)) return script = document.createElement("script"), script.type = "text/javascript", script.src = para.url, script.async = "async", para.charset && script.setAttribute("charset", para.charset), "function" == typeof para.loading && para.loading.call(para.context), "function" == typeof para.success && (script.onload = script.onreadystatechange = function () {
                this.readyState && "loaded" != this.readyState && "complete" != this.readyState || para.success.call(para.context)
            }), "function" == typeof para.error && (script.onerror = function () {
                para.error.call(para.context)
            }), $.head.append(script), this;
            if (para.file || para.form) return ifr = document.createElement("iframe"), $data.ajaxCount += 1, ifr.name = "$ajax_iframe_" + $data.ajaxCount, ifr.id = ifr.name, ifr.style.display = "none", $.body.append(ifr), "function" == typeof para.loading && para.loading.call(para.context), "function" == typeof para.success && (ifr.onload = function () {
                var start, last, str, data = null,
                    html = this.contentWindow.document.getElementsByTagName("body")[0].innerHTML;
                switch (para.dataType = para.dataType || "html", para.dataType.toLowerCase()) {
                    case"json":
                        if (html.length > 0) {
                            start = html.indexOf("{"), last = html.lastIndexOf("}") + 1, str = html.substring(start, last);
                            try {
                                data = eval("(" + str + ")")
                            } catch (e) {
                                data = html
                            }
                        }
                        break;
                    case"script":
                        if (html.length > 0) {
                            start = html.indexOf("{"), last = html.lastIndexOf("}") + 1, str = html.substring(start, last);
                            try {
                                eval(str)
                            } catch (e) {
                            }
                        }
                        break;
                    default:
                        data = html
                }
                para.success.call(para.context, data), this.parentNode.removeChild(this)
            }), "function" == typeof para.error && (ifr.onerror = function () {
                para.error.call(para.context)
            }), form = para.form || para.file.form, _enctype = form.enctype, _method = form.method, _target = form.target, _action = form.action, para.file && (form.enctype = "multipart/form-data", form.method = "post"), form.target = ifr.name, form.action || (form.action = window.location.href), para.url && (form.action = para.url), form.submit(), form.enctype = _enctype, form.method = _method, form.target = _target, form.action = _action, this;
            if (para.type = para.type ? para.type.toUpperCase() : "GET", para.charset = para.charset ? para.charset : "UTF-8", para.contentType || (para.contentType = "text/html;charset=" + para.charset), "undefined" == typeof para.async && (para.async = !0), xmlhttp = null, window.XMLHttpRequest) xmlhttp = new XMLHttpRequest; else try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP")
            }
            if (para.data && (para.contentType = "application/x-www-form-urlencoded;charset=" + para.charset, para.type = "POST", "object" == typeof para.data)) {
                _data = "";
                for (key in para.data) _data += para.data[key] ? key + "=" + encodeURIComponent(para.data[key]) + "&" : key + "=&";
                _data = _data.substr(0, _data.length - 1), para.data = _data
            }
            para.cache || (now = new Date, now = "_=" + now.getFullYear() + (now.getMonth() + 1) + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds(), para.url += para.url.indexOf("?") > -1 ? "&" + now : "?" + now), xmlhttp.onreadystatechange = function () {
                var request, getType;
                if (2 == xmlhttp.readyState) "function" == typeof para.loading && para.loading.call(para.context); else if (4 == xmlhttp.readyState) if (200 != xmlhttp.status) "function" == typeof para.error && para.error.call(para.context); else if ("function" == typeof para.success) {
                    switch (request = null, para.dataType || (getType = xmlhttp.getResponseHeader("Content-Type"), para.dataType = getType ? getType.indexOf("/json") ? "json" : getType.indexOf("/javascript") ? "script" : getType.indexOf("/xml") ? "xml" : getType.indexOf("/html") ? "html" : "text" : "text"), para.dataType.toLowerCase()) {
                        case"json":
                            try {
                                request = eval("(" + xmlhttp.responseText + ")")
                            } catch (e) {
                                request = xmlhttp.responseText
                            }
                            break;
                        case"script":
                            try {
                                eval(xmlhttp.responseText)
                            } catch (e) {
                            }
                            break;
                        case"xml":
                            request = xmlhttp.responseXML;
                            break;
                        default:
                            request = xmlhttp.responseText
                    }
                    para.success.call(para.context, request)
                }
            }, xmlhttp.open(para.type, para.url, para.async), "POST" == para.type && xmlhttp.setRequestHeader("Content-Type", para.contentType), xmlhttp.setRequestHeader("Accept", "*/*"), para.dataType && xmlhttp.setRequestHeader("dataType", para.dataType);
            try {
                xmlhttp.send(para.data)
            } catch (e) {
                "function" == typeof para.error && para.error.call(para.context)
            }
            return this
        }
    }, $.query = {}, $.cookie = {}, $.browser = {}, $.queryUrl = function () {
        var c, a = window.location.hostname + window.location.pathname, b = "";
        for (c in $.query) b += c + "=" + $.query[c] + "&";
        return b && (a += "?" + b.substring(0, b.length - 1)), window.location.hash && (a += window.location.hash), a = "http://" + a
    }, $.setCookie = function (a, b, c) {
        var d, e, f, g, h;
        if (c = c || {}, d = "", e = new Date, c.expires && ("number" == typeof c.expires || c.expires.toUTCString) && ("number" == typeof c.expires ? (e = new Date, e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c.expires)) : e = c.expires, d = ";expires=" + e.toUTCString()), f = c.path ? ";path=" + c.path : "", g = c.domain ? ";domain=" + c.domain : "", h = c.secure ? ";secure" : "", null == b) e = new Date, e.setTime(e.getTime() - 1e4), d = ";expires=" + e.toUTCString(), document.cookie = [a, "=", "", d, f, g, h].join(""), delete $.cookie[a]; else {
            if (document.cookie = [a, "=", encodeURIComponent(b), d, f, g, h].join(""), "" == document.cookie) return $;
            $.cookie[a] = b
        }
        return $
    }, $.addRule = function (a, b, c, d) {
        var g, f, h, e = "ms" == $.browser.core ? "rules" : "cssRules";
        if (0 != document.styleSheets.length && document.styleSheets[document.styleSheets.length - 1][e] || (c = document.createElement("style"), c.type = "text/css", $.head.append(c), c = c.sheet || c.styleSheet), "number" != typeof c && c || ("number" == typeof c && (d = c), c = document.styleSheets[document.styleSheets.length - 1]), "number" != typeof d || d > c[e].length ? d = c[e].length : 0 > d && (d = 0), "object" == typeof b) {
            f = "";
            for (h in b) g = h.replace(/[A-Z]{1}/g, function (a) {
                return "-" + a.toLowerCase()
            }), f += g + ":" + b[h] + ";";
            b = f
        }
        return c.insertRule ? c.insertRule(a + "{" + b + "}", d) : c.addRule && c.addRule(a, b, d), c
    }, $.removeRule = function (a, b) {
        if (0 != document.styleSheets.length) {
            var c = "ms" == $.browser.core ? "rules" : "cssRules";
            if ("number" != typeof a && a || (b = a, a = document.styleSheets[document.styleSheets.length - 1]), a[c]) {
                if (0 == a[c].length) return;
                "number" != typeof b || b > a[c].length - 1 ? b = a[c].length - 1 : 0 > b && (b = 0)
            } else if ("number" != typeof b) return;
            return a.deleteRule ? a.deleteRule(b) : a.removeRule && a.removeRule(b), a
        }
    }, Array.prototype.contains = function (a) {
        var b;
        if (a instanceof Array) {
            for (b = 0; b < a.length; b++) if (0 == this.contains(a[b])) return !1;
            return !0
        }
        for (b = 0; b < this.length; b++) if (this[b] === a) return !0;
        return !1
    }, Array.prototype.unique = function () {
        var b, a = [];
        for (b = 0; b < this.length; b++) a.contains(this[b]) || a.push(this[b]);
        return a
    }, Array.prototype.union = function () {
        var b, a = this.slice(0);
        for (b = 0; b < arguments.length; b++) a = a.concat(arguments[b]);
        return a.unique()
    }, Array.prototype.inall = function () {
        var b, c, a = this.slice(0);
        for (b = 0; b < a.length; b++) for (c = 0; c < arguments.length; c++) if (0 == arguments[c].contains(a[b])) {
            a.splice(b, 1), b -= 1;
            break
        }
        return a
    }, Array.prototype.exclude = function (a) {
        var c, b = [];
        for (0 == a instanceof Array && (a = [a]), c = 0; c < this.length; c++) a.contains(this[c]) || b.push(this[c]);
        return b
    }, Array.prototype.insert = function (a, b) {
        var c, d, e;
        if (0 == a instanceof Array && (c = typeof a, "string" == c ? a = a.split(/[,\s\|][\s]*/gi) : "function" == c ? (a = a.call(this), 0 == a instanceof Array && (c = typeof a, a = "string" == c ? a.split(/[,\s\|][\s]*/gi) : [a])) : a = [a]), "number" != typeof b || b > this.length - 1) for (d = 0; d < a.length; d++) this.push(a[d]); else if (0 == b > 0) for (d = 0; d < a.length; d++) this.unshift(a[d]); else {
            for (e = this.splice(0, b), d = 0; d < a.length; d++) e.push(a[d]);
            for (d = e.length - 1; d > -1; d--) this.unshift(e[d])
        }
        return this
    }, String.prototype.trim = function () {
        return this.replace(/(^[\s]+)|([\s]+$)/gi, "")
    }, String.prototype.trimLeft = function () {
        return this.replace(/^[\s]+/gi, "")
    }, String.prototype.trimRight = function () {
        return this.replace(/[\s]+$/gi, "")
    }, function () {
        var b, c, d, e, f, g, a = window.location.href.split("?");
        if (a.length > 1) {
            for (a = a[1].split("#")[0], a = a.split("&"), d = null, e = 0; e < a.length; e++) 0 != a[e].length && (b = a[e].indexOf("="), d = 0 > b || b == a[e].length - 1 ? "" : decodeURIComponent(a[e].substring(b + 1)), c = a[e].split("="), c = c[0].toLowerCase(), $.query[c] = d);
            $.query._ && delete $.query._
        }
        if (document.cookie && "" != document.cookie) for (d = null, a = document.cookie.split(/;[\s]*/gi), e = 0; e < a.length; e++) b = a[e].trim().indexOf("="), 0 > b ? (c = a[e], d = "") : (c = a[e].substring(0, b).trim(), d = a[e].substr(b + 1), "" != d && (d = decodeURIComponent(d))), c.length > 0 && ($.cookie[c] = d);
        f = window.navigator.userAgent.toLowerCase(), f.indexOf("trident") > -1 ? $.browser.core = "ms" : f.indexOf("presto") > 1 ? $.browser.core = "o" : f.indexOf("applewebkit") > -1 ? $.browser.core = "webkit" : f.indexOf("firefox") > -1 && ($.browser.core = "moz"), $.browser.device = {
            mobile: f.indexOf("mobile") > -1,
            ios: f.indexOf("mac os x") > -1,
            android: f.indexOf("android") > -1 || f.indexOf("linux") > -1,
            iphone: f.indexOf("iphone") > -1 || f.indexOf("mac") > -1,
            ipad: f.indexOf("ipad") > -1
        }, $.browser.app = {
            wechat: f.indexOf("micromessenger") > -1,
            qq: f.indexOf("qq/") > -1,
            qqb: f.indexOf("qqbrowser") > -1,
            uc: f.indexOf("ucbrowser") > -1
        }, "ms" == $.browser.core && (g = f.split("msie "), $.browser.version = g.length > 1 ? parseInt(g[1].split(".")[0]) : parseInt(f.split("rv:")[1].split(".")[0])), $(function () {
            var a, b;
            $.html = $("html"), $.body = $("body"), $.head = $("head"), a = [$.browser.core], "ms" == $.browser.core && (a.push("ms" + $.browser.version), $.browser.version < 9 ? a.push("msl9") : a.push("msg8"));
            for (b in $.browser.device) $.browser.device[b] && a.push(b);
            for (b in $.browser.app) $.browser.app[b] && a.push(b);
            $.html.addClass(a)[0].style.display = "block"
        })
    }()
}();
﻿!function () {
    var a = !0;
    !function (b) {
        var c = this || (0, eval)("this"), d = c["document"], e = c["navigator"], f = c["JSON"];
        !function (a) {
            if ("function" == typeof require && "object" == typeof exports && "object" == typeof module) {
                var b = module["exports"] || exports;
                a(b)
            } else "function" == typeof define && define["amd"] ? define(["exports"], a) : a(c["ko"] = {})
        }(function (g) {
            function j(a, b) {
                var c = null === a || typeof a in i;
                return c ? a === b : !1
            }

            function k(a, c) {
                var d;
                return function () {
                    d || (d = setTimeout(function () {
                        d = b, a()
                    }, c))
                }
            }

            function l(a, b) {
                var c;
                return function () {
                    clearTimeout(c), c = setTimeout(a, b)
                }
            }

            function m(a) {
                var b = this;
                return a && h.utils.objectForEach(a, function (a, c) {
                    var d = h.extenders[a];
                    "function" == typeof d && (b = d(b, c) || b)
                }), b
            }

            function w(a, b, c, d) {
                h.bindingHandlers[a] = {
                    init: function (a, e, f, g, i) {
                        var j, k;
                        return h.computed(function () {
                            var f = h.utils.unwrapObservable(e()), g = !c != !f, l = !k, m = l || b || g !== j;
                            b && (a.isKoContext = !0), m && (l && h.computedContext.getDependenciesCount() && (k = h.utils.cloneNodes(h.virtualElements.childNodes(a), !0)), g ? (l || h.virtualElements.setDomNodeChildren(a, h.utils.cloneNodes(k)), h.applyBindingsToDescendants(d ? d(i, f) : i, a)) : h.virtualElements.emptyNode(a), j = g)
                        }, null, {disposeWhenNodeIsRemoved: a}), {controlsDescendantBindings: !0}
                    }
                }, h.expressionRewriting.bindingRewriteValidators[a] = !1, h.virtualElements.allowedBindings[a] = !0
            }

            var i, n, o, p, q, r, s, t, u, v, x, h = "undefined" != typeof g ? g : {};
            h.exportSymbol = function (a, b) {
                var e, c = a.split("."), d = h;
                for (e = 0; e < c.length - 1; e++) d = d[c[e]];
                d[c[c.length - 1]] = b
            }, h.exportProperty = function (a, b, c) {
                a[b] = c
            }, h.version = "3.1.0", h.validValue = function (a, b, c) {
                var d, e, f, g, i, j, k;
                if (("undefined" == typeof b || null === b) && (b = ""), "number" == typeof b && (b += ""), "string" == typeof b) if (d = b.replace(/[\s]+/gi, ""), "" == d && "undefined" != typeof c["default"] && ("function" == typeof c["default"] ? (e = h.contextFor(a), b = c["default"].call(a, {
                        context: e,
                        current: e.$data,
                        bind: c
                    })) : b = c["default"], a.value = b), c.regex && "string" == typeof b && b.length > 0) f = new RegExp(c.regex, "gi"), ves(a).removeClass("error"), 0 == f.test(b) && (ves(a).addClass("error"), c.reger ? ves.alert({
                    content: c.reger,
                    type: "notify",
                    style: "error",
                    complete: function () {
                        a.focus()
                    }
                }) : (a.focus(), a.value = b = "")); else {
                    if (c.dataType) {
                        switch (b += "", g = c.dataType) {
                            case"int":
                                b = b.replace(/[^0-9\-\+\s.]+/gi, ""), b = "" == b ? null : parseFloat(b);
                                break;
                            case"bool":
                                b = "false" == b || "0" == b || "" == d ? !1 : !0
                        }
                        a.value = null == b ? "" : b
                    }
                    if (c.compare && "string" != typeof b) {
                        if (i = c.compare, j = ves("[result]", a.parentNode), j.length > 0 && j.html("").css({
                                left: a.offsetLeft + "px",
                                top: "-" + (a.offsetTop + 2) + "px"
                            }).removeClass("view"), i.result = null, "undefined" != typeof i.gt && i.gtResult) for (0 == i.gt instanceof Array && (i.gt = [i.gt]), 0 == i.gtResult instanceof Array && (i.gtResult = [i.gtResult]), k = 0; k < i.gt.length; k++) if (b > i.gt[k]) {
                            i.result = i.gtResult[k], j.length > 0 ? j.html(i.gtResult[k]).addClass("view") : ves.alert(i.gtResult[k], "notify");
                            break
                        }
                        if ("undefined" != typeof i.lt && i.ltResult && null != b) for (0 == i.lt instanceof Array && (i.lt = [i.lt]), 0 == i.ltResult instanceof Array && (i.ltResult = [i.ltResult]), k = 0; k < i.lt.length; k++) if (b < i.lt[k]) {
                            i.result = i.ltResult[k], j.length > 0 ? j.html(i.ltResult[k]).addClass("view") : ves.alert(i.ltResult[k], "notify");
                            break
                        }
                    }
                }
                return "function" == typeof c["update"] && (e = h.contextFor(a), c["update"].call(a, {
                    context: e,
                    current: e.$data,
                    bind: c
                })), b
            }, h.exportSymbol("version", h.version), h.utils = function () {
                function a(a, b) {
                    for (var c in a) a.hasOwnProperty(c) && b(c, a[c])
                }

                function g(a, b) {
                    if (b) for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                    return a
                }

                function i(a, b) {
                    return a.__proto__ = b, a
                }

                function r(a, b) {
                    if ("input" !== h.utils.tagNameLower(a) || !a.type) return !1;
                    if ("click" != b.toLowerCase()) return !1;
                    var c = a.type;
                    return "checkbox" == c || "radio" == c
                }

                var n, o, p, q, j = {__proto__: []} instanceof Array, k = {}, l = {},
                    m = e && /Firefox\/2/i.test(e.userAgent) ? "KeyboardEvent" : "UIEvents";
                return k[m] = ["keyup", "keydown", "keypress"], k["MouseEvents"] = ["click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave"], a(k, function (a, b) {
                    if (b.length) for (var c = 0, d = b.length; d > c; c++) l[b[c]] = a
                }), n = {propertychange: !0}, o = d && function () {
                    for (var a = 3, c = d.createElement("div"), e = c.getElementsByTagName("i"); c.innerHTML = "<!--[if gt IE " + ++a + "]><i></i><![endif]-->", e[0];) ;
                    return a > 4 ? a : b
                }(), p = 6 === o, q = 7 === o, {
                    fieldsIncludedWithJsonPost: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/],
                    arrayForEach: function (a, b) {
                        for (var c = 0, d = a.length; d > c; c++) b(a[c], c)
                    },
                    arrayIndexOf: function (a, b) {
                        if ("function" == typeof Array.prototype.indexOf) return Array.prototype.indexOf.call(a, b);
                        for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
                        return -1
                    },
                    arrayFirst: function (a, b, c) {
                        for (var d = 0, e = a.length; e > d; d++) if (b.call(c, a[d], d)) return a[d];
                        return null
                    },
                    arrayRemoveItem: function (a, b) {
                        var c = h.utils.arrayIndexOf(a, b);
                        c > 0 ? a.splice(c, 1) : 0 === c && a.shift()
                    },
                    arrayGetDistinctValues: function (a) {
                        var b, c, d;
                        for (a = a || [], b = [], c = 0, d = a.length; d > c; c++) h.utils.arrayIndexOf(b, a[c]) < 0 && b.push(a[c]);
                        return b
                    },
                    arrayMap: function (a, b) {
                        var c, d, e;
                        for (a = a || [], c = [], d = 0, e = a.length; e > d; d++) c.push(b(a[d], d));
                        return c
                    },
                    arrayFilter: function (a, b) {
                        var c, d, e;
                        for (a = a || [], c = [], d = 0, e = a.length; e > d; d++) b(a[d], d) && c.push(a[d]);
                        return c
                    },
                    arrayPushAll: function (a, b) {
                        if (b instanceof Array) a.push.apply(a, b); else for (var c = 0, d = b.length; d > c; c++) a.push(b[c]);
                        return a
                    },
                    addOrRemoveItem: function (a, b, c) {
                        var d = h.utils.arrayIndexOf(h.utils.peekObservable(a), b);
                        0 > d ? c && a.push(b) : c || a.splice(d, 1)
                    },
                    canSetPrototype: j,
                    extend: g,
                    setPrototypeOf: i,
                    setPrototypeOfOrExtend: j ? i : g,
                    objectForEach: a,
                    objectMap: function (a, b) {
                        var c, d;
                        if (!a) return a;
                        c = {};
                        for (d in a) a.hasOwnProperty(d) && (c[d] = b(a[d], d, a));
                        return c
                    },
                    emptyDomNode: function (a) {
                        for (; a.firstChild;) h.removeNode(a.firstChild)
                    },
                    moveCleanedNodesToContainerElement: function (a) {
                        var e, f, b = h.utils.makeArray(a), c = d.createElement("div");
                        for (e = 0, f = b.length; f > e; e++) c.appendChild(h.cleanNode(b[e]));
                        return c
                    },
                    cloneNodes: function (a, b) {
                        var c, d, e, f;
                        for (c = 0, d = a.length, e = []; d > c; c++) f = a[c].cloneNode(!0), e.push(b ? h.cleanNode(f) : f);
                        return e
                    },
                    setDomNodeChildren: function (a, b) {
                        if (h.utils.emptyDomNode(a), b) for (var c = 0, d = b.length; d > c; c++) a.appendChild(b[c])
                    },
                    replaceDomNodes: function (a, b) {
                        var d, e, f, g, c = a.nodeType ? [a] : a;
                        if (c.length > 0) {
                            for (d = c[0], e = d.parentNode, f = 0, g = b.length; g > f; f++) e.insertBefore(b[f], d);
                            for (f = 0, g = c.length; g > f; f++) h.removeNode(c[f])
                        }
                    },
                    fixUpContinuousNodeArray: function (a, b) {
                        if (a.length) {
                            for (b = 8 === b.nodeType && b.parentNode || b; a.length && a[0].parentNode !== b;) a.shift();
                            if (a.length > 1) {
                                var c = a[0], d = a[a.length - 1];
                                for (a.length = 0; c !== d;) if (a.push(c), c = c.nextSibling, !c) return;
                                a.push(d)
                            }
                        }
                        return a
                    },
                    setOptionNodeSelectionState: function (a, b) {
                        7 > o ? a.setAttribute("selected", b) : a.selected = b
                    },
                    stringTrim: function (a) {
                        return null === a || a === b ? "" : a.trim ? a.trim() : a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
                    },
                    stringTokenize: function (a, b) {
                        var e, f, g, c = [], d = (a || "").split(b);
                        for (e = 0, f = d.length; f > e; e++) g = h.utils.stringTrim(d[e]), "" !== g && c.push(g);
                        return c
                    },
                    stringStartsWith: function (a, b) {
                        return a = a || "", b.length > a.length ? !1 : a.substring(0, b.length) === b
                    },
                    domNodeIsContainedBy: function (a, b) {
                        if (a === b) return !0;
                        if (11 === a.nodeType) return !1;
                        if (b.contains) return b.contains(3 === a.nodeType ? a.parentNode : a);
                        if (b.compareDocumentPosition) return 16 == (16 & b.compareDocumentPosition(a));
                        for (; a && a != b;) a = a.parentNode;
                        return !!a
                    },
                    domNodeIsAttachedToDocument: function (a) {
                        return h.utils.domNodeIsContainedBy(a, a.ownerDocument.documentElement)
                    },
                    anyDomNodeIsAttachedToDocument: function (a) {
                        return !!h.utils.arrayFirst(a, h.utils.domNodeIsAttachedToDocument)
                    },
                    tagNameLower: function (a) {
                        return a && a.tagName && a.tagName.toLowerCase()
                    },
                    registerEventHandler: function (a, b, c) {
                        var e, f, d = o && n[b];
                        if (d || "function" != typeof a.addEventListener) {
                            if ("undefined" == typeof a.attachEvent) throw new Error("Browser doesn't support addEventListener or attachEvent");
                            e = function (b) {
                                c.call(a, b)
                            }, f = "on" + b, a.attachEvent(f, e), h.utils.domNodeDisposal.addDisposeCallback(a, function () {
                                a.detachEvent(f, e)
                            })
                        } else a.addEventListener(b, c, !1)
                    },
                    triggerEvent: function (a, b) {
                        var e, f, g;
                        if (!a || !a.nodeType) throw new Error("element must be a DOM node when calling triggerEvent");
                        if (e = r(a, b), "function" == typeof d.createEvent) {
                            if ("function" != typeof a.dispatchEvent) throw new Error("The supplied element doesn't support dispatchEvent");
                            f = l[b] || "HTMLEvents", g = d.createEvent(f), g.initEvent(b, !0, !0, c, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, a), a.dispatchEvent(g)
                        } else if (e && a.click) a.click(); else {
                            if ("undefined" == typeof a.fireEvent) throw new Error("Browser doesn't support triggering events");
                            a.fireEvent("on" + b)
                        }
                    },
                    unwrapObservable: function (a) {
                        return h.isObservable(a) ? a() : a
                    },
                    peekObservable: function (a) {
                        return h.isObservable(a) ? a.peek() : a
                    },
                    toggleDomNodeCssClass: function (a, b, c) {
                        if (b) {
                            var d = /\S+/g, e = a.className.match(d) || [];
                            h.utils.arrayForEach(b.match(d), function (a) {
                                h.utils.addOrRemoveItem(e, a, c)
                            }), a.className = e.join(" ")
                        }
                    },
                    setTextContent: function (a, c) {
                        var e, d = h.utils.unwrapObservable(c);
                        (null === d || d === b) && (d = ""), e = h.virtualElements.firstChild(a), !e || 3 != e.nodeType || h.virtualElements.nextSibling(e) ? h.virtualElements.setDomNodeChildren(a, [a.ownerDocument.createTextNode(d)]) : e.data = d, h.utils.forceRefresh(a)
                    },
                    setElementName: function (a, b) {
                        if (a.name = b, 7 >= o) try {
                            a.mergeAttributes(d.createElement("<input name='" + a.name + "'/>"), !1)
                        } catch (c) {
                        }
                    },
                    forceRefresh: function (a) {
                        if (o >= 9) {
                            var b = 1 == a.nodeType ? a : a.parentNode;
                            b.style && (b.style.zoom = b.style.zoom)
                        }
                    },
                    ensureSelectElementIsRenderedCorrectly: function (a) {
                        if (o) {
                            var b = a.style.width;
                            a.style.width = 0, a.style.width = b
                        }
                    },
                    range: function (a, b) {
                        var c, d;
                        for (a = h.utils.unwrapObservable(a), b = h.utils.unwrapObservable(b), c = [], d = a; b >= d; d++) c.push(d);
                        return c
                    },
                    makeArray: function (a) {
                        var c, d, b = [];
                        for (c = 0, d = a.length; d > c; c++) b.push(a[c]);
                        return b
                    },
                    isIe6: p,
                    isIe7: q,
                    ieVersion: o,
                    getFormFields: function (a, b) {
                        var f,
                            c = h.utils.makeArray(a.getElementsByTagName("input")).concat(h.utils.makeArray(a.getElementsByTagName("textarea"))),
                            d = "string" == typeof b ? function (a) {
                                return a.name === b
                            } : function (a) {
                                return b.test(a.name)
                            }, e = [];
                        for (f = c.length - 1; f >= 0; f--) d(c[f]) && e.push(c[f]);
                        return e
                    },
                    parseJson: function (a) {
                        return "string" == typeof a && (a = h.utils.stringTrim(a)) ? f && f.parse ? f.parse(a) : new Function("return " + a)() : null
                    },
                    stringifyJson: function (a, b, c) {
                        if (!f || !f.stringify) throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
                        return f.stringify(h.utils.unwrapObservable(a), b, c)
                    },
                    postJson: function (b, c, e) {
                        var f, g, i, j, k, l, m, n, o, p;
                        if (e = e || {}, f = e["params"] || {}, g = e["includeFields"] || this.fieldsIncludedWithJsonPost, i = b, "object" == typeof b && "form" === h.utils.tagNameLower(b)) for (j = b, i = j.action, k = g.length - 1; k >= 0; k--) for (l = h.utils.getFormFields(j, g[k]), m = l.length - 1; m >= 0; m--) f[l[m].name] = l[m].value;
                        c = h.utils.unwrapObservable(c), n = d.createElement("form"), n.style.display = "none", n.action = i, n.method = "post";
                        for (o in c) p = d.createElement("input"), p.name = o, p.value = h.utils.stringifyJson(h.utils.unwrapObservable(c[o])), n.appendChild(p);
                        a(f, function (a, b) {
                            var c = d.createElement("input");
                            c.name = a, c.value = b, n.appendChild(c)
                        }), d.body.appendChild(n), e["submitter"] ? e["submitter"](n) : n.submit(), setTimeout(function () {
                            n.parentNode.removeChild(n)
                        }, 0)
                    }
                }
            }(), h.exportSymbol("utils", h.utils), h.exportSymbol("utils.arrayForEach", h.utils.arrayForEach), h.exportSymbol("utils.arrayFirst", h.utils.arrayFirst), h.exportSymbol("utils.arrayFilter", h.utils.arrayFilter), h.exportSymbol("utils.arrayGetDistinctValues", h.utils.arrayGetDistinctValues), h.exportSymbol("utils.arrayIndexOf", h.utils.arrayIndexOf), h.exportSymbol("utils.arrayMap", h.utils.arrayMap), h.exportSymbol("utils.arrayPushAll", h.utils.arrayPushAll), h.exportSymbol("utils.arrayRemoveItem", h.utils.arrayRemoveItem), h.exportSymbol("utils.extend", h.utils.extend), h.exportSymbol("utils.fieldsIncludedWithJsonPost", h.utils.fieldsIncludedWithJsonPost), h.exportSymbol("utils.getFormFields", h.utils.getFormFields), h.exportSymbol("utils.peekObservable", h.utils.peekObservable), h.exportSymbol("utils.postJson", h.utils.postJson), h.exportSymbol("utils.parseJson", h.utils.parseJson), h.exportSymbol("utils.registerEventHandler", h.utils.registerEventHandler), h.exportSymbol("utils.stringifyJson", h.utils.stringifyJson), h.exportSymbol("utils.range", h.utils.range), h.exportSymbol("utils.toggleDomNodeCssClass", h.utils.toggleDomNodeCssClass), h.exportSymbol("utils.triggerEvent", h.utils.triggerEvent), h.exportSymbol("utils.unwrapObservable", h.utils.unwrapObservable), h.exportSymbol("utils.objectForEach", h.utils.objectForEach), h.exportSymbol("utils.addOrRemoveItem", h.utils.addOrRemoveItem), h.exportSymbol("unwrap", h.utils.unwrapObservable), Function.prototype["bind"] || (Function.prototype["bind"] = function (a) {
                var b = this, c = Array.prototype.slice.call(arguments), a = c.shift();
                return function () {
                    return b.apply(a, c.concat(Array.prototype.slice.call(arguments)))
                }
            }), h.utils.domData = new function () {
                function e(e, f) {
                    var g = e[c], h = g && "null" !== g && d[g];
                    if (!h) {
                        if (!f) return b;
                        g = e[c] = "ko" + a++, d[g] = {}
                    }
                    return d[g]
                }

                var a = 0, c = "koID", d = {};
                return {
                    get: function (a, c) {
                        var d = e(a, !1);
                        return d === b ? b : d[c]
                    }, set: function (a, c, d) {
                        if (d !== b || e(a, !1) !== b) {
                            var f = e(a, !0);
                            f[c] = d
                        }
                    }, clear: function (a) {
                        var b = a[c];
                        return b ? (delete d[b], a[c] = null, !0) : !1
                    }, nextKey: function () {
                        return a++ + c
                    }
                }
            }, h.exportSymbol("utils.domData", h.utils.domData), h.exportSymbol("utils.domData.clear", h.utils.domData.clear), h.utils.domNodeDisposal = new function () {
                function e(c, d) {
                    var e = h.utils.domData.get(c, a);
                    return e === b && d && (e = [], h.utils.domData.set(c, a, e)), e
                }

                function f(c) {
                    h.utils.domData.set(c, a, b)
                }

                function g(a) {
                    var c, b = e(a, !1);
                    if (b) for (b = b.slice(0), c = 0; c < b.length; c++) b[c](a);
                    h.utils.domData.clear(a), h.utils.domNodeDisposal["cleanExternalData"](a), d[a.nodeType] && i(a)
                }

                function i(a) {
                    for (var b, c = a.firstChild; b = c;) c = b.nextSibling, 8 === b.nodeType && g(b)
                }

                var a = h.utils.domData.nextKey(), c = {1: !0, 8: !0, 9: !0}, d = {1: !0, 9: !0};
                return {
                    addDisposeCallback: function (a, b) {
                        if ("function" != typeof b) throw new Error("Callback must be a function");
                        e(a, !0).push(b)
                    }, removeDisposeCallback: function (a, b) {
                        var c = e(a, !1);
                        c && (h.utils.arrayRemoveItem(c, b), 0 == c.length && f(a))
                    }, cleanNode: function (a) {
                        var b, e, f;
                        if (c[a.nodeType] && (g(a), d[a.nodeType])) for (b = [], h.utils.arrayPushAll(b, a.getElementsByTagName("*")), e = 0, f = b.length; f > e; e++) g(b[e]);
                        return a
                    }, removeNode: function (a) {
                        h.cleanNode(a), a.parentNode && a.parentNode.removeChild(a)
                    }, cleanExternalData: function () {
                    }
                }
            }, h.cleanNode = h.utils.domNodeDisposal.cleanNode, h.removeNode = h.utils.domNodeDisposal.removeNode, h.exportSymbol("cleanNode", h.cleanNode), h.exportSymbol("removeNode", h.removeNode), h.exportSymbol("utils.domNodeDisposal", h.utils.domNodeDisposal), h.exportSymbol("utils.domNodeDisposal.addDisposeCallback", h.utils.domNodeDisposal.addDisposeCallback), h.exportSymbol("utils.domNodeDisposal.removeDisposeCallback", h.utils.domNodeDisposal.removeDisposeCallback), function () {
                function e(a) {
                    var b = h.utils.stringTrim(a).toLowerCase(), e = d.createElement("div"),
                        f = b.match(/^<(thead|tbody|tfoot)/) && [1, "<table>", "</table>"] || !b.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!b.indexOf("<td") || !b.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || [0, "", ""],
                        g = "ignored<div>" + f[1] + a + f[2] + "</div>";
                    for ("function" == typeof c["innerShiv"] ? e.appendChild(c["innerShiv"](g)) : e.innerHTML = g; f[0]--;) e = e.lastChild;
                    return h.utils.makeArray(e.lastChild.childNodes)
                }

                h.utils.parseHtmlFragment = function (a) {
                    return e(a)
                }, h.utils.setHtml = function (a, c) {
                    var d, e;
                    if (h.utils.emptyDomNode(a), c = h.utils.unwrapObservable(c), null !== c && c !== b) for ("string" != typeof c && (c = c.toString()), d = h.utils.parseHtmlFragment(c), e = 0; e < d.length; e++) a.appendChild(d[e])
                }
            }(), h.exportSymbol("utils.parseHtmlFragment", h.utils.parseHtmlFragment), h.exportSymbol("utils.setHtml", h.utils.setHtml), h.memoization = function () {
                function c() {
                    return (0 | 4294967296 * (1 + Math.random())).toString(16).substring(1)
                }

                function d() {
                    return c() + c()
                }

                function e(a, b) {
                    var c, d, f, g;
                    if (a) if (8 == a.nodeType) c = h.memoization.parseMemoText(a.nodeValue), null != c && b.push({
                        domNode: a,
                        memoId: c
                    }); else if (1 == a.nodeType) for (d = 0, f = a.childNodes, g = f.length; g > d; d++) e(f[d], b)
                }

                var a = {};
                return {
                    memoize: function (b) {
                        if ("function" != typeof b) throw new Error("You can only pass a function to ko.memoization.memoize()");
                        var c = d();
                        return a[c] = b, "<!--[ko_memo:" + c + "]-->"
                    }, unmemoize: function (c, d) {
                        var e = a[c];
                        if (e === b) throw new Error("Couldn't find any memo with ID " + c + ". Perhaps it's already been unmemoized.");
                        try {
                            return e.apply(null, d || []), !0
                        } finally {
                            delete a[c]
                        }
                    }, unmemoizeDomNodeAndDescendants: function (a, b) {
                        var d, f, g, i, c = [];
                        for (e(a, c), d = 0, f = c.length; f > d; d++) g = c[d].domNode, i = [g], b && h.utils.arrayPushAll(i, b), h.memoization.unmemoize(c[d].memoId, i), g.nodeValue = "", g.parentNode && g.parentNode.removeChild(g)
                    }, parseMemoText: function (a) {
                        var b = a.match(/^\[ko_memo\:(.*?)\]$/);
                        return b ? b[1] : null
                    }
                }
            }(), h.exportSymbol("memoization", h.memoization), h.exportSymbol("memoization.memoize", h.memoization.memoize), h.exportSymbol("memoization.unmemoize", h.memoization.unmemoize), h.exportSymbol("memoization.parseMemoText", h.memoization.parseMemoText), h.exportSymbol("memoization.unmemoizeDomNodeAndDescendants", h.memoization.unmemoizeDomNodeAndDescendants), h.extenders = {
                throttle: function (a, b) {
                    a["throttleEvaluation"] = b;
                    var c = null;
                    return h.dependentObservable({
                        read: a, write: function (d) {
                            clearTimeout(c), c = setTimeout(function () {
                                a(d)
                            }, b)
                        }
                    })
                }, rateLimit: function (a, b) {
                    var c, d, e;
                    "number" == typeof b ? c = b : (c = b["timeout"], d = b["method"]), e = "notifyWhenChangesStop" == d ? l : k, a.limit(function (a) {
                        return e(a, c)
                    })
                }, notify: function (a, b) {
                    a["equalityComparer"] = "always" == b ? null : j
                }
            }, i = {
                undefined: 1,
                "boolean": 1,
                number: 1,
                string: 1
            }, h.exportSymbol("extenders", h.extenders), h.subscription = function (a, b, c) {
                this.target = a, this.callback = b, this.disposeCallback = c, this.isDisposed = !1, h.exportProperty(this, "dispose", this.dispose)
            }, h.subscription.prototype.dispose = function () {
                this.isDisposed = !0, this.disposeCallback()
            }, h.subscribable = function () {
                h.utils.setPrototypeOfOrExtend(this, h.subscribable["fn"]), this._subscriptions = {}
            }, n = "change", o = {
                subscribe: function (a, b, c) {
                    var e, f, d = this;
                    return c = c || n, e = b ? a.bind(b) : a, f = new h.subscription(d, e, function () {
                        h.utils.arrayRemoveItem(d._subscriptions[c], f)
                    }), d.peek && d.peek(), d._subscriptions[c] || (d._subscriptions[c] = []), d._subscriptions[c].push(f), f
                }, notifySubscribers: function (a, b) {
                    if (b = b || n, this.hasSubscriptionsForEvent(b)) try {
                        h.dependencyDetection.begin();
                        for (var e, c = this._subscriptions[b].slice(0), d = 0; e = c[d]; ++d) e.isDisposed || e.callback(a)
                    } finally {
                        h.dependencyDetection.end()
                    }
                }, limit: function (a) {
                    var d, e, f, i, b = this, c = h.isObservable(b), g = "beforeChange";
                    b._origNotifySubscribers || (b._origNotifySubscribers = b["notifySubscribers"], b["notifySubscribers"] = function (a, c) {
                        c && c !== n ? c === g ? b._rateLimitedBeforeChange(a) : b._origNotifySubscribers(a, c) : b._rateLimitedChange(a)
                    }), i = a(function () {
                        c && f === b && (f = b()), d = !1, b.isDifferent(e, f) && b._origNotifySubscribers(e = f)
                    }), b._rateLimitedChange = function (a) {
                        d = !0, f = a, i()
                    }, b._rateLimitedBeforeChange = function (a) {
                        d || (e = a, b._origNotifySubscribers(a, g))
                    }
                }, hasSubscriptionsForEvent: function (a) {
                    return this._subscriptions[a] && this._subscriptions[a].length
                }, getSubscriptionsCount: function () {
                    var a = 0;
                    return h.utils.objectForEach(this._subscriptions, function (b, c) {
                        a += c.length
                    }), a
                }, isDifferent: function (a, b) {
                    return !this["equalityComparer"] || !this["equalityComparer"](a, b)
                }, extend: m
            }, h.exportProperty(o, "subscribe", o.subscribe), h.exportProperty(o, "extend", o.extend), h.exportProperty(o, "getSubscriptionsCount", o.getSubscriptionsCount), h.utils.canSetPrototype && h.utils.setPrototypeOf(o, Function.prototype), h.subscribable["fn"] = o, h.isSubscribable = function (a) {
                return null != a && "function" == typeof a.subscribe && "function" == typeof a["notifySubscribers"]
            }, h.exportSymbol("subscribable", h.subscribable), h.exportSymbol("isSubscribable", h.isSubscribable), h.computedContext = h.dependencyDetection = function () {
                function d() {
                    return ++c
                }

                function e(c) {
                    a.push(b), b = c
                }

                function f() {
                    b = a.pop()
                }

                var b, a = [], c = 0;
                return {
                    begin: e, end: f, registerDependency: function (a) {
                        if (b) {
                            if (!h.isSubscribable(a)) throw new Error("Only subscribable things can act as dependencies");
                            b.callback(a, a._id || (a._id = d()))
                        }
                    }, ignore: function (a, b, c) {
                        try {
                            return e(), a.apply(b, c || [])
                        } finally {
                            f()
                        }
                    }, getDependenciesCount: function () {
                        return b ? b.computed.getDependenciesCount() : void 0
                    }, isInitial: function () {
                        return b ? b.isInitial : void 0
                    }
                }
            }(), h.exportSymbol("computedContext", h.computedContext), h.exportSymbol("computedContext.getDependenciesCount", h.computedContext.getDependenciesCount), h.exportSymbol("computedContext.isInitial", h.computedContext.isInitial), h.observable = function (b) {
                function d() {
                    return arguments.length > 0 ? (d.isDifferent(c, arguments[0]) && (d.valueWillMutate(), c = arguments[0], a && (d._latestValue = c), d.valueHasMutated()), this) : (h.dependencyDetection.registerDependency(d), c)
                }

                var c = b;
                return h.subscribable.call(d), h.utils.setPrototypeOfOrExtend(d, h.observable["fn"]), a && (d._latestValue = c), d.peek = function () {
                    return c
                }, d.valueHasMutated = function () {
                    d["notifySubscribers"](c)
                }, d.valueWillMutate = function () {
                    d["notifySubscribers"](c, "beforeChange")
                }, h.exportProperty(d, "peek", d.peek), h.exportProperty(d, "valueHasMutated", d.valueHasMutated), h.exportProperty(d, "valueWillMutate", d.valueWillMutate), d
            }, h.observable["fn"] = {equalityComparer: j}, p = h.observable.protoProperty = "__ko_proto__", h.observable["fn"][p] = h.observable, h.utils.canSetPrototype && h.utils.setPrototypeOf(h.observable["fn"], h.subscribable["fn"]), h.hasPrototype = function (a, c) {
                return null === a || a === b || a[p] === b ? !1 : a[p] === c ? !0 : h.hasPrototype(a[p], c)
            }, h.isObservable = function (a) {
                return h.hasPrototype(a, h.observable)
            }, h.isWriteableObservable = function (a) {
                return "function" == typeof a && a[p] === h.observable ? !0 : "function" == typeof a && a[p] === h.dependentObservable && a.hasWriteFunction ? !0 : !1
            }, h.exportSymbol("observable", h.observable), h.exportSymbol("isObservable", h.isObservable), h.exportSymbol("isWriteableObservable", h.isWriteableObservable), h.observableArray = function (a) {
                if (a = a || [], "object" != typeof a || !("length" in a)) throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
                var b = h.observable(a);
                return h.utils.setPrototypeOfOrExtend(b, h.observableArray["fn"]), b.extend({trackArrayChanges: !0})
            }, h.observableArray["fn"] = {
                remove: function (a) {
                    var e, f, b = this.peek(), c = [], d = "function" != typeof a || h.isObservable(a) ? function (b) {
                        return b === a
                    } : a;
                    for (e = 0; e < b.length; e++) f = b[e], d(f) && (0 === c.length && this.valueWillMutate(), c.push(f), b.splice(e, 1), e--);
                    return c.length && this.valueHasMutated(), c
                }, removeAll: function (a) {
                    var c, d;
                    return a === b ? (c = this.peek(), d = c.slice(0), this.valueWillMutate(), c.splice(0, c.length), this.valueHasMutated(), d) : a ? this["remove"](function (b) {
                        return h.utils.arrayIndexOf(a, b) >= 0
                    }) : []
                }, destroy: function (a) {
                    var d, e, b = this.peek(), c = "function" != typeof a || h.isObservable(a) ? function (b) {
                        return b === a
                    } : a;
                    for (this.valueWillMutate(), d = b.length - 1; d >= 0; d--) e = b[d], c(e) && (b[d]["_destroy"] = !0);
                    this.valueHasMutated()
                }, destroyAll: function (a) {
                    return a === b ? this["destroy"](function () {
                        return !0
                    }) : a ? this["destroy"](function (b) {
                        return h.utils.arrayIndexOf(a, b) >= 0
                    }) : []
                }, indexOf: function (a) {
                    var b = this();
                    return h.utils.arrayIndexOf(b, a)
                }, replace: function (a, b) {
                    var c = this["indexOf"](a);
                    c >= 0 && (this.valueWillMutate(), this.peek()[c] = b, this.valueHasMutated())
                }
            }, h.utils.arrayForEach(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (a) {
                h.observableArray["fn"][a] = function () {
                    var c, b = this.peek();
                    return this.valueWillMutate(), this.cacheDiffForKnownOperation(b, a, arguments), c = b[a].apply(b, arguments), this.valueHasMutated(), c
                }
            }), h.utils.arrayForEach(["slice"], function (a) {
                h.observableArray["fn"][a] = function () {
                    var b = this();
                    return b[a].apply(b, arguments)
                }
            }), h.utils.canSetPrototype && h.utils.setPrototypeOf(h.observableArray["fn"], h.observable["fn"]), h.exportSymbol("observableArray", h.observableArray), q = "arrayChange", h.extenders["trackArrayChanges"] = function (a) {
                function f() {
                    var e, f;
                    b || (b = !0, e = a["notifySubscribers"], a["notifySubscribers"] = function (a, b) {
                        return b && b !== n || ++d, e.apply(this, arguments)
                    }, f = [].concat(a.peek() || []), c = null, a.subscribe(function (b) {
                        if (b = [].concat(b || []), a.hasSubscriptionsForEvent(q)) {
                            var e = g(f, b);
                            e.length && a["notifySubscribers"](e, q)
                        }
                        f = b, c = null, d = 0
                    }))
                }

                function g(a, b) {
                    return (!c || d > 1) && (c = h.utils.compareArrays(a, b, {sparse: !0})), c
                }

                if (!a.cacheDiffForKnownOperation) {
                    var b = !1, c = null, d = 0, e = a.subscribe;
                    a.subscribe = a["subscribe"] = function (a, b, c) {
                        return c === q && f(), e.apply(this, arguments)
                    }, a.cacheDiffForKnownOperation = function (a, e, f) {
                        function l(a, b, c) {
                            return g[g.length] = {status: a, value: b, index: c}
                        }

                        var g, i, j, k, m, n, o, p, q, r, s, t;
                        if (b && !d) {
                            switch (g = [], i = a.length, j = f.length, k = 0, e) {
                                case"push":
                                    k = i;
                                case"unshift":
                                    for (m = 0; j > m; m++) l("added", f[m], k + m);
                                    break;
                                case"pop":
                                    k = i - 1;
                                case"shift":
                                    i && l("deleted", a[k], k);
                                    break;
                                case"splice":
                                    for (n = Math.min(Math.max(0, f[0] < 0 ? i + f[0] : f[0]), i), o = 1 === j ? i : Math.min(n + (f[1] || 0), i), p = n + j - 2, q = Math.max(o, p), r = [], s = [], m = n, t = 2; q > m; ++m, ++t) o > m && s.push(l("deleted", a[m], m)), p > m && r.push(l("added", f[t], m));
                                    h.utils.findMovesInArrayComparison(s, r);
                                    break;
                                default:
                                    return
                            }
                            c = g
                        }
                    }
                }
            }, h.computed = h.dependentObservable = function (b, c, d) {
                function l(a, b) {
                    x[b] || (x[b] = a.subscribe(n), ++y)
                }

                function m() {
                    j = !0, h.utils.objectForEach(x, function (a, b) {
                        b.dispose()
                    }), x = {}, y = 0, f = !1
                }

                function n() {
                    var a = p["throttleEvaluation"];
                    a && a >= 0 ? (clearTimeout(z), z = setTimeout(o, a)) : p._evalRateLimited ? p._evalRateLimited() : o()
                }

                function o() {
                    var b, d, m;
                    if (!g && !j) {
                        if (v && v()) {
                            if (!i) return w(), void 0
                        } else i = !1;
                        g = !0;
                        try {
                            b = x, d = y, h.dependencyDetection.begin({
                                callback: function (a, c) {
                                    j || (d && b[c] ? (x[c] = b[c], ++y, delete b[c], --d) : l(a, c))
                                }, computed: p, isInitial: !y
                            }), x = {}, y = 0;
                            try {
                                m = c ? k.call(c) : k()
                            } finally {
                                h.dependencyDetection.end(), d && h.utils.objectForEach(b, function (a, b) {
                                    b.dispose()
                                }), f = !1
                            }
                            p.isDifferent(e, m) && (p["notifySubscribers"](e, "beforeChange"), e = m, a && (p._latestValue = e), (!p._evalRateLimited || p["throttleEvaluation"]) && p["notifySubscribers"](e))
                        } finally {
                            g = !1
                        }
                        y || w()
                    }
                }

                function p() {
                    if (arguments.length > 0) {
                        if ("function" != typeof s) throw new Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
                        return s.apply(c, arguments), this
                    }
                    return f && o(), h.dependencyDetection.registerDependency(p), e
                }

                function q() {
                    return f && !y && o(), e
                }

                function r() {
                    return f || y > 0
                }

                var e, s, t, u, v, w, x, y, z, A, f = !0, g = !1, i = !1, j = !1, k = b;
                if (k && "object" == typeof k ? (d = k, k = d["read"]) : (d = d || {}, k || (k = d["read"])), "function" != typeof k) throw new Error("Pass a function that returns the value of the ko.computed");
                return s = d["write"], t = d["disposeWhenNodeIsRemoved"] || d.disposeWhenNodeIsRemoved || null, u = d["disposeWhen"] || d.disposeWhen, v = u, w = m, x = {}, y = 0, z = null, c || (c = d["owner"]), h.subscribable.call(p), h.utils.setPrototypeOfOrExtend(p, h.dependentObservable["fn"]), p.peek = q, p.getDependenciesCount = function () {
                    return y
                }, p.hasWriteFunction = "function" == typeof d["write"], p.dispose = function () {
                    w()
                }, p.isActive = r, A = p.limit, p.limit = function (a) {
                    A.call(p, a), p._evalRateLimited = function () {
                        p._rateLimitedBeforeChange(e), f = !0, p._rateLimitedChange(p)
                    }
                }, h.exportProperty(p, "peek", p.peek), h.exportProperty(p, "dispose", p.dispose), h.exportProperty(p, "isActive", p.isActive), h.exportProperty(p, "getDependenciesCount", p.getDependenciesCount), t && (i = !0, t.nodeType && (v = function () {
                    return !h.utils.domNodeIsAttachedToDocument(t) || u && u()
                })), d["deferEvaluation"] !== !0 && o(), t && r() && t.nodeType && (w = function () {
                    h.utils.domNodeDisposal.removeDisposeCallback(t, w), m()
                }, h.utils.domNodeDisposal.addDisposeCallback(t, w)), p
            }, h.isComputed = function (a) {
                return h.hasPrototype(a, h.dependentObservable)
            }, r = h.observable.protoProperty, h.dependentObservable[r] = h.observable, h.dependentObservable["fn"] = {equalityComparer: j}, h.dependentObservable["fn"][r] = h.dependentObservable, h.utils.canSetPrototype && h.utils.setPrototypeOf(h.dependentObservable["fn"], h.subscribable["fn"]), h.exportSymbol("dependentObservable", h.dependentObservable), h.exportSymbol("computed", h.dependentObservable), h.exportSymbol("isComputed", h.isComputed), function () {
                function c(a, f, g) {
                    var h, i;
                    return g = g || new e, a = f(a), (h = !("object" != typeof a || null === a || a === b || a instanceof Date || a instanceof String || a instanceof Number || a instanceof Boolean)) ? (i = a instanceof Array ? [] : {}, g.save(a, i), d(a, function (d) {
                        var h, e = f(a[d]);
                        switch (typeof e) {
                            case"boolean":
                            case"number":
                            case"string":
                            case"function":
                                i[d] = e;
                                break;
                            case"object":
                            case"undefined":
                                h = g.get(e), i[d] = h !== b ? h : c(e, f, g)
                        }
                    }), i) : a
                }

                function d(a, b) {
                    var c, d;
                    if (a instanceof Array) {
                        for (c = 0; c < a.length; c++) b(c);
                        "function" == typeof a["toJSON"] && b("toJSON")
                    } else for (d in a) b(d)
                }

                function e() {
                    this.keys = [], this.values = []
                }

                var a = 10;
                h.toJS = function (b) {
                    if (0 == arguments.length) throw new Error("When calling ko.toJS, pass the object you want to convert.");
                    return c(b, function (b) {
                        for (var c = 0; h.isObservable(b) && a > c; c++) b = b();
                        return b
                    })
                }, h.toJSON = function (a, b, c) {
                    var d = h.toJS(a);
                    return h.utils.stringifyJson(d, b, c)
                }, e.prototype = {
                    constructor: e, save: function (a, b) {
                        var c = h.utils.arrayIndexOf(this.keys, a);
                        c >= 0 ? this.values[c] = b : (this.keys.push(a), this.values.push(b))
                    }, get: function (a) {
                        var c = h.utils.arrayIndexOf(this.keys, a);
                        return c >= 0 ? this.values[c] : b
                    }
                }
            }(),h.exportSymbol("toJS", h.toJS),h.exportSymbol("toJSON", h.toJSON),function () {
                var a = "__ko__hasDomDataOptionValue__";
                h.selectExtensions = {
                    readValue: function (c) {
                        switch (h.utils.tagNameLower(c)) {
                            case"option":
                                return c[a] === !0 ? h.utils.domData.get(c, h.bindingHandlers.options.optionValueDomDataKey) : c.value || c.text;
                            case"select":
                                return c.selectedIndex >= 0 ? h.selectExtensions.readValue(c.options[c.selectedIndex]) : b;
                            default:
                                return c.value
                        }
                    }, writeValue: function (c, d, e) {
                        var f, j, g, i;
                        switch (h.utils.tagNameLower(c)) {
                            case"option":
                                switch (typeof d) {
                                    case"string":
                                        h.utils.domData.set(c, h.bindingHandlers.options.optionValueDomDataKey, b), a in c && delete c[a], c.value = d;
                                        break;
                                    default:
                                        h.utils.domData.set(c, h.bindingHandlers.options.optionValueDomDataKey, d), c[a] = !0, c.value = "number" == typeof d ? d : ""
                                }
                                break;
                            case"select":
                                for (("" === d || null === d) && (d = b), f = -1, g = 0, i = c.options.length; i > g; ++g) if (j = h.selectExtensions.readValue(c.options[g]), j == d || "" == j && d === b) {
                                    f = g;
                                    break
                                }
                                (e || f >= 0 || d === b && c.size > 1) && (c.selectedIndex = f);
                                break;
                            default:
                                (null === d || d === b) && (d = ""), c.value = d
                        }
                    }
                }
            }(),h.exportSymbol("selectExtensions", h.selectExtensions),h.exportSymbol("selectExtensions.readValue", h.selectExtensions.readValue),h.exportSymbol("selectExtensions.writeValue", h.selectExtensions.writeValue),h.expressionRewriting = function () {
                function c(c) {
                    if (h.utils.arrayIndexOf(a, c) >= 0) return !1;
                    var d = c.match(b);
                    return null === d ? !1 : c
                }

                function n(a) {
                    var e, f, c, d, g, j, i, n, o, b = h.utils.stringTrim(a);
                    if (123 === b.charCodeAt(0) && (b = b.slice(1, -1)), c = [], d = b.match(k), g = 0, d) for (d.push(","), i = 0; j = d[i]; ++i) {
                        if (n = j.charCodeAt(0), 44 === n) {
                            if (0 >= g) {
                                e && c.push(f ? {key: e, value: f.join("")} : {unknown: e}), e = f = g = 0;
                                continue
                            }
                        } else if (58 === n) {
                            if (!f) continue
                        } else if (47 === n && i && j.length > 1) o = d[i - 1].match(l), o && !m[o[0]] && (b = b.substr(b.indexOf(j) + 1), d = b.match(k), d.push(","), i = -1, j = "/"); else if (40 === n || 123 === n || 91 === n) ++g; else if (41 === n || 125 === n || 93 === n) --g; else if (!e && !f) {
                            e = 34 === n || 39 === n ? j.slice(1, -1) : j;
                            continue
                        }
                        f ? f.push(j) : f = [j]
                    }
                    return c
                }

                function p(a, b) {
                    function d(a, b) {
                        function j(c) {
                            return c && c["preprocess"] ? b = c["preprocess"](b, a, d) : !0
                        }

                        var i, k, l, m;
                        j(h["getBindingHandler"](a)) && (o[a] && (i = c(b)) && f.push("'" + a + "':function(_z){" + i + "=_z}"), g && ("string" == typeof i ? (k = i.replace(/[\$\[\]0-9a-z_.]/gi, ""), 0 == k.length ? (m = i.indexOf("$") > -1 ? "" : "$data.", l = "with" == a ? "{}" : '""', i = "if(typeof(" + i + ')=="undefined"||' + i + "===null)" + m + i + "=" + l + ";") : i = "") : i = "", b = "function(){" + i + "try{return " + b + " }catch(e){}}"), e.push("'" + a + "':" + b))
                    }

                    b = b || {};
                    var e = [], f = [], g = b["valueAccessors"], i = "string" == typeof a ? n(a) : a;
                    return h.utils.arrayForEach(i, function (a) {
                        d(a.key || a["unknown"], a.value)
                    }), f.length && d("_ko_property_writers", "{" + f.join(",") + " }"), e.join(",")
                }

                var a = ["true", "false", "null", "undefined"],
                    b = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i, d = '"(?:[^"\\\\]|\\\\.)*"',
                    e = "'(?:[^'\\\\]|\\\\.)*'", f = "/(?:[^/\\\\]|\\\\.)*/w*", g = ",\"'{}()/:[\\]",
                    i = "[^\\s:,/][^" + g + "]*[^\\s" + g + "]", j = "[^\\s]",
                    k = RegExp(d + "|" + e + "|" + f + "|" + i + "|" + j, "g"), l = /[\])"'A-Za-z0-9_$]+$/,
                    m = {"in": 1, "return": 1, "typeof": 1},
                    o = {foreach: !0, "with": !0, text: !0, html: !0, options: !0};
                return {
                    bindingRewriteValidators: [],
                    twoWayBindings: o,
                    parseObjectLiteral: n,
                    preProcessBindings: p,
                    keyValueArrayContainsKey: function (a, b) {
                        for (var c = 0; c < a.length; c++) if (a[c]["key"] == b) return !0;
                        return !1
                    },
                    writeValueToProperty: function (a, b, c, d, e, f) {
                        if (d = h.validValue(f, d, b()), a && h.isObservable(a)) !h.isWriteableObservable(a) || e && a.peek() === d || a(d); else {
                            var g = b.get("_ko_property_writers");
                            g && g[c] && g[c](d)
                        }
                    }
                }
            }(),h.exportSymbol("expressionRewriting", h.expressionRewriting),h.exportSymbol("expressionRewriting.bindingRewriteValidators", h.expressionRewriting.bindingRewriteValidators),h.exportSymbol("expressionRewriting.parseObjectLiteral", h.expressionRewriting.parseObjectLiteral),h.exportSymbol("expressionRewriting.preProcessBindings", h.expressionRewriting.preProcessBindings),h.exportSymbol("expressionRewriting._twoWayBindings", h.expressionRewriting.twoWayBindings),h.exportSymbol("jsonExpressionRewriting", h.expressionRewriting),h.exportSymbol("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", h.expressionRewriting.preProcessBindings),function () {
                function f(c) {
                    return 8 == c.nodeType && b.test(a ? c.text : c.nodeValue)
                }

                function g(b) {
                    return 8 == b.nodeType && c.test(a ? b.text : b.nodeValue)
                }

                function i(a, b) {
                    for (var c = a, d = 1, e = []; c = c.nextSibling;) {
                        if (g(c) && (d--, 0 === d)) return e;
                        e.push(c), f(c) && d++
                    }
                    if (!b) throw new Error("Cannot find closing comment tag to match: " + a.nodeValue);
                    return null
                }

                function j(a, b) {
                    var c = i(a, b);
                    return c ? c.length > 0 ? c[c.length - 1].nextSibling : a.nextSibling : null
                }

                function k(a) {
                    var d, b = a.firstChild, c = null;
                    if (b) do c ? c.push(b) : f(b) ? (d = j(b, !0), d ? b = d : c = [b]) : g(b) && (c = [b]); while (b = b.nextSibling);
                    return c
                }

                var a = d && "<!--test-->" === d.createComment("test").text,
                    b = a ? /^<!--\s*ko(?:\s+([\s\S]+))?\s*-->$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/,
                    c = a ? /^<!--\s*\/ko\s*-->$/ : /^\s*\/ko\s*$/, e = {ul: !0, ol: !0};
                h.virtualElements = {
                    allowedBindings: {}, childNodes: function (a) {
                        return f(a) ? i(a) : a.childNodes
                    }, emptyNode: function (a) {
                        var b, c, d;
                        if (f(a)) for (b = h.virtualElements.childNodes(a), c = 0, d = b.length; d > c; c++) h.removeNode(b[c]); else h.utils.emptyDomNode(a)
                    }, setDomNodeChildren: function (a, b) {
                        var c, d, e;
                        if (f(a)) for (h.virtualElements.emptyNode(a), c = a.nextSibling, d = 0, e = b.length; e > d; d++) c.parentNode.insertBefore(b[d], c); else h.utils.setDomNodeChildren(a, b)
                    }, prepend: function (a, b) {
                        f(a) ? a.parentNode.insertBefore(b, a.nextSibling) : a.firstChild ? a.insertBefore(b, a.firstChild) : a.appendChild(b)
                    }, insertAfter: function (a, b, c) {
                        c ? f(a) ? a.parentNode.insertBefore(b, c.nextSibling) : c.nextSibling ? a.insertBefore(b, c.nextSibling) : a.appendChild(b) : h.virtualElements.prepend(a, b)
                    }, firstChild: function (a) {
                        return f(a) ? !a.nextSibling || g(a.nextSibling) ? null : a.nextSibling : a.firstChild
                    }, nextSibling: function (a) {
                        return f(a) && (a = j(a)), a.nextSibling && g(a.nextSibling) ? null : a.nextSibling
                    }, hasBindingValue: f, virtualNodeBindingValue: function (c) {
                        var d = (a ? c.text : c.nodeValue).match(b);
                        return d ? d[1] : null
                    }, normaliseVirtualElementDomStructure: function (a) {
                        var b, c, d, f;
                        if (e[h.utils.tagNameLower(a)] && (b = a.firstChild)) do if (1 === b.nodeType && (c = k(b))) for (d = b.nextSibling, f = 0; f < c.length; f++) d ? a.insertBefore(c[f], d) : a.appendChild(c[f]); while (b = b.nextSibling)
                    }
                }
            }(),h.exportSymbol("virtualElements", h.virtualElements),h.exportSymbol("virtualElements.allowedBindings", h.virtualElements.allowedBindings),h.exportSymbol("virtualElements.emptyNode", h.virtualElements.emptyNode),h.exportSymbol("virtualElements.insertAfter", h.virtualElements.insertAfter),h.exportSymbol("virtualElements.prepend", h.virtualElements.prepend),h.exportSymbol("virtualElements.setDomNodeChildren", h.virtualElements.setDomNodeChildren),function () {
                function a(a, c, d) {
                    var e = a + (d && d["valueAccessors"] || "");
                    return c[e] || (c[e] = b(a, d))
                }

                function b(a, b) {
                    var c = h.expressionRewriting.preProcessBindings(a, b),
                        d = "with($context){with($data||{}){return{" + c + "}}}";
                    return new Function("$context", "$element", d)
                }

                h.bindingProvider = function () {
                    this.bindingCache = {}
                }, h.utils.extend(h.bindingProvider.prototype, {
                    nodeHasBindings: function (a) {
                        switch (a.nodeType) {
                            case 1:
                                return null != a.getAttribute("bind") || null != a.getAttribute("data-bind");
                            case 8:
                                return h.virtualElements.hasBindingValue(a);
                            default:
                                return !1
                        }
                    }, getBindings: function (a, b) {
                        var c = this["getBindingsString"](a, b);
                        return c ? this["parseBindingsString"](c, b, a) : null
                    }, getBindingAccessors: function (a, b) {
                        var c = this["getBindingsString"](a, b);
                        return c ? this["parseBindingsString"](c, b, a, {valueAccessors: !0}) : null
                    }, getBindingsString: function (a) {
                        switch (a.nodeType) {
                            case 1:
                                return a.getAttribute("bind") || a.getAttribute("data-bind");
                            case 8:
                                return h.virtualElements.virtualNodeBindingValue(a);
                            default:
                                return null
                        }
                    }, parseBindingsString: function (b, c, d, e) {
                        try {
                            var f = a(b, this.bindingCache, e);
                            return f(c, d)
                        } catch (g) {
                            throw g.message = "Unable to parse bindings.\nBindings value: " + b + "\nMessage: " + g.message, g
                        }
                    }
                }), h.bindingProvider["instance"] = new h.bindingProvider
            }(),h.exportSymbol("bindingProvider", h.bindingProvider),function () {
                function d(a) {
                    return function () {
                        return a
                    }
                }

                function e(a) {
                    return a()
                }

                function f(a) {
                    return h.utils.objectMap(h.dependencyDetection.ignore(a), function (b, c) {
                        return function () {
                            return a()[c]
                        }
                    })
                }

                function g(a, b, c) {
                    return "function" == typeof a ? f(a.bind(null, b, c)) : h.utils.objectMap(a, d)
                }

                function i(a, b) {
                    return f(this["getBindings"].bind(this, a, b))
                }

                function j(a) {
                    var b = h.virtualElements.allowedBindings[a];
                    if (!b) throw new Error("The binding '" + a + "' cannot be used with virtual elements")
                }

                function k(a, b, c) {
                    var d, e = h.virtualElements.firstChild(b), f = h.bindingProvider["instance"],
                        g = f["preprocessNode"];
                    if (g) {
                        for (; d = e;) e = h.virtualElements.nextSibling(d), g.call(f, d);
                        e = h.virtualElements.firstChild(b)
                    }
                    for (; d = e;) e = h.virtualElements.nextSibling(d), l(a, d, c)
                }

                function l(b, c, d) {
                    var g, e = !0, f = 1 === c.nodeType;
                    f && h.virtualElements.normaliseVirtualElementDomStructure(c), g = f && d || h.bindingProvider["instance"]["nodeHasBindings"](c), g && (e = o(c, null, b, d)["shouldBindDescendants"]), e && !a[h.utils.tagNameLower(c)] && k(b, c, !f)
                }

                function n(a) {
                    var b = [], c = {}, d = [];
                    return h.utils.objectForEach(a, function e(f) {
                        if (!c[f]) {
                            var g = h["getBindingHandler"](f);
                            g && (g["after"] && (d.push(f), h.utils.arrayForEach(g["after"], function (b) {
                                if (a[b]) {
                                    if (-1 !== h.utils.arrayIndexOf(d, b)) throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + d.join(", "));
                                    e(b)
                                }
                            }), d.length--), b.push({key: f, handler: g})), c[f] = !0
                        }
                    }), b
                }

                function o(a, c, d, f) {
                    function s() {
                        return h.utils.objectMap(p ? p() : k, e)
                    }

                    var k, l, o, p, q, r, t, g = h.utils.domData.get(a, m);
                    return c || h.utils.domData.set(a, m, !0), !g && f && h.storedBindingContextForNode(a, d), c && "function" != typeof c ? k = c : (l = h.bindingProvider["instance"], o = l["getBindingAccessors"] || i, p = h.dependentObservable(function () {
                        return k = c ? c(d, a) : o.call(l, a, d), k && d._subscribable && d._subscribable(), k
                    }, null, {disposeWhenNodeIsRemoved: a}), k && p.isActive() || (p = null)), k && (r = p ? function (a) {
                        return function () {
                            return e(p()[a])
                        }
                    } : function (a) {
                        return k[a]
                    }, s["get"] = function (a) {
                        return k[a] && e(r(a))
                    }, s["has"] = function (a) {
                        return a in k
                    }, t = n(k), h.utils.arrayForEach(t, function (c) {
                        var e = c.handler["init"], f = c.handler["update"], g = c.key;
                        8 === a.nodeType && j(g);
                        try {
                            "function" == typeof e && h.dependencyDetection.ignore(function () {
                                var c = e(a, r(g), s, d["$data"], d);
                                if (c && c["controlsDescendantBindings"]) {
                                    if (q !== b) throw new Error("Multiple bindings (" + q + " and " + g + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
                                    q = g
                                }
                            }), "function" == typeof f && h.dependentObservable(function () {
                                f(a, r(g), s, d["$data"], d)
                            }, null, {disposeWhenNodeIsRemoved: a})
                        } catch (i) {
                            throw i.message = 'Unable to process binding "' + g + ": " + k[g] + '"\nMessage: ' + i.message, i
                        }
                    })), {shouldBindDescendants: q === b}
                }

                function q(a) {
                    return a && a instanceof h.bindingContext ? a : new h.bindingContext(a)
                }

                var a, m, p;
                h.handler = h.bindingHandlers = {}, a = {script: !0}, h["getBindingHandler"] = function (a) {
                    return h.bindingHandlers[a]
                }, h.bindingContext = function (a, c, d, e) {
                    function f() {
                        var b = j ? a() : a, f = h.utils.unwrapObservable(b);
                        return c ? (c._subscribable && c._subscribable(), h.utils.extend(i, c), l && (i._subscribable = l)) : (i["$parents"] = [], i["$root"] = f, i["ko"] = h), i["$rawData"] = b, i["$data"] = f, d && (i[d] = f), e && e(i, c, f), i["$data"]
                    }

                    function g() {
                        return k && !h.utils.anyDomNodeIsAttachedToDocument(k)
                    }

                    var k, i = this, j = "function" == typeof a && !h.isObservable(a),
                        l = h.dependentObservable(f, null, {disposeWhen: g, disposeWhenNodeIsRemoved: !0});
                    l.isActive() && (i._subscribable = l, l["equalityComparer"] = null, k = [], l._addNode = function (a) {
                        k.push(a), h.utils.domNodeDisposal.addDisposeCallback(a, function (a) {
                            h.utils.arrayRemoveItem(k, a), k.length || (l.dispose(), i._subscribable = l = b)
                        })
                    })
                }, h.bindingContext.prototype["createChildContext"] = function (a, b, c) {
                    return new h.bindingContext(a, this, b, function (a, b) {
                        a["$parentContext"] = b, a["$parent"] = b["$data"], a["$parents"] = (b["$parents"] || []).slice(0), a["$parents"].unshift(a["$parent"]), c && c(a)
                    })
                }, h.bindingContext.prototype["extend"] = function (a) {
                    return new h.bindingContext(this._subscribable || this["$data"], this, null, function (b, c) {
                        b["$rawData"] = c["$rawData"], h.utils.extend(b, "function" == typeof a ? a() : a)
                    })
                }, m = h.utils.domData.nextKey(), p = h.utils.domData.nextKey(), h.storedBindingContextForNode = function (a, b) {
                    return 2 != arguments.length ? h.utils.domData.get(a, p) : (h.utils.domData.set(a, p, b), b._subscribable && b._subscribable._addNode(a), void 0)
                }, h.applyBindingAccessorsToNode = function (a, b, c) {
                    return 1 === a.nodeType && h.virtualElements.normaliseVirtualElementDomStructure(a), o(a, b, q(c), !0)
                }, h.applyBindingsToNode = function (a, b, c) {
                    var d = q(c);
                    return h.applyBindingAccessorsToNode(a, g(b, d, a), d)
                }, h.applyBindingsToDescendants = function (a, b) {
                    (1 === b.nodeType || 8 === b.nodeType) && k(q(a), b, !0)
                }, h.applyBindings = function (a, b) {
                    if (b && 1 !== b.nodeType && 8 !== b.nodeType) throw new Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");
                    b = b || c.document.body, l(q(a), b, !0)
                }, h.contextFor = function (a) {
                    switch (a.nodeType) {
                        case 1:
                        case 8:
                            var c = h.storedBindingContextForNode(a);
                            if (c) return c;
                            if (a.parentNode) return h.contextFor(a.parentNode)
                    }
                    return b
                }, h.dataFor = function (a) {
                    var c = h.contextFor(a);
                    return c ? c["$data"] : b
                }, h.exportSymbol("bindingHandlers", h.bindingHandlers), h.exportSymbol("applyBindings", h.applyBindings), h.exportSymbol("applyBindingsToDescendants", h.applyBindingsToDescendants), h.exportSymbol("applyBindingAccessorsToNode", h.applyBindingAccessorsToNode), h.exportSymbol("applyBindingsToNode", h.applyBindingsToNode), h.exportSymbol("contextFor", h.contextFor), h.exportSymbol("dataFor", h.dataFor)
            }(),s = {"class": "className", "for": "htmlFor"},h.bindingHandlers["attr"] = {
                update: function (a, c) {
                    var e = h.utils.unwrapObservable(c()) || {};
                    h.utils.objectForEach(e, function (c, d) {
                        d = h.utils.unwrapObservable(d);
                        var e = d === !1 || null === d || d === b;
                        e && a.removeAttribute(c), h.utils.ieVersion <= 8 && c in s ? (c = s[c], e ? a.removeAttribute(c) : a[c] = d) : e || a.setAttribute(c, d.toString()), "name" === c && h.utils.setElementName(a, e ? "" : d.toString())
                    })
                }
            },function () {
                h.bindingHandlers["checked"] = {
                    after: ["value", "attr"], init: function (a, c, e, f, g) {
                        function i() {
                            return e["has"]("checkedValue") ? h.utils.unwrapObservable(e.get("checkedValue")) : a.value
                        }

                        function j(b, d) {
                            var j, k, l, f = a.checked || "checked" == a.getAttribute("checked"),
                                g = "undefined" != typeof d ? d : i();
                            (!h.computedContext.isInitial() || b) && (!p || f) && (j = h.dependencyDetection.ignore(c), q ? s !== g ? (f ? h.utils.addOrRemoveItem(j, g, !0) : h.utils.addOrRemoveItem(j, g, !1), h.utils.addOrRemoveItem(j, s, !1), s = g) : h.utils.addOrRemoveItem(j, g, f) : r ? ("string" != typeof j && (j = ""), k = j.split(/[\n\,][\s\n\t]*/gi), s !== g ? (f && (h.utils.addOrRemoveItem(k, g, !0), h.utils.addOrRemoveItem(k, s, !1)), s = g) : h.utils.addOrRemoveItem(k, g, f), h.utils.addOrRemoveItem(k, "", !1), h.expressionRewriting.writeValueToProperty(j, e, "checked", k.join(","), !0, a)) : f ? h.expressionRewriting.writeValueToProperty(j, e, "checked", g, !0, a) : (g = g = 0 === g ? 1 : 1 === g ? 0 : g === !0 ? !1 : !0, h.expressionRewriting.writeValueToProperty(j, e, "checked", g, !0, a)), l = ves(a).nexts("label:first"), a.checked ? (p && (ves(a.form[a.name]).attr("checked", null), ves("label[name=" + a.name + "]").removeClass("checked")), a.setAttribute("checked", "checked"), l.addClass("checked")) : (a.removeAttribute("checked"), l.removeClass("checked")))
                        }

                        function k() {
                            var d, f, g, k, b = h.utils.unwrapObservable(c());
                            q ? a.checked = h.utils.arrayIndexOf(b, i()) >= 0 : r ? ("string" != typeof b && (b = ""), d = b.split(/[\n\,][\s\n\t]*/gi), a.checked = h.utils.arrayIndexOf(d, i()) >= 0) : a.checked = i() === b, (null == b || "" == b) && (e["has"]("default") ? (f = e.get("default"), e["has"]("checkedValue") ? (g = e.get("checkedValue"), f === g ? (a.checked = !0, a.setAttribute("checked", "checked")) : (a.checked = !1, a.removeAttribute("checked"))) : (a.checked = !1, a.removeAttribute("checked")), j(!0, f)) : (a.checked = !1, a.removeAttribute("checked"))), k = ves(a).nexts("label:first"), a.checked || a.getAttribute("checked") ? (p && (ves(a.form[a.name]).attr("checked", null), ves("label[name=" + a.name + "]").removeClass("checked")), a.setAttribute("checked", "checked"), k.addClass("checked")) : (a.removeAttribute("checked"), k.removeClass("checked"))
                        }

                        var l, m, n, o, p, q, r, s;
                        "input" != a.tagName.toLowerCase() && (a.form || (l = ves(a).parents("form"), l = 0 == l.length ? d.createElement("form") : l[0], a.form = l)), m = a.name || a.getAttribute("name"), m || (m = a.getAttribute("bind"), m = m.split(/checked[\s]*:[\s]*/gi), m = m[1].split(/[\s]*,/gi)[0], m = m.replace(/\./gi, "_"), g.$parent && (m = ves(a).parents("[isKoContext]")[0].koID + m), a.name = m, a.setAttribute("name", m)), "input" != a.tagName.toLowerCase() && (a.name = m), a.id || (a.id = a.koID), a.form[m] == b ? a.form[m] = a : a.form[m] instanceof Array ? a.form[m].push(a) : a.form[m] = [a.form[m], a], n = ves(a).nexts("label:first"), n.attr("name", a.name), n.length > 0 && n.noAttr("for") && n.attr("for", a.id), o = "checkbox" == a.getAttribute("type"), p = "radio" == a.getAttribute("type"), (o || p) && (q = o && h.utils.unwrapObservable(c()) instanceof Array, r = o && !q && a.name && (a.form[a.name].length || e["has"]("array")), s = q || r ? i() : b, h.computed(j, null, {disposeWhenNodeIsRemoved: a}), h.utils.registerEventHandler(a, "click", function () {
                            "input" != a.tagName.toLowerCase() && (a.checked ? p || (a.checked = !1, a.removeAttribute("checked")) : (p && ves(a.form[a.name]).attr("checked", null), a.checked = !0, a.setAttribute("checked", "checked"))), j()
                        }), h.computed(k, null, {disposeWhenNodeIsRemoved: a}))
                    }
                }, h.expressionRewriting.twoWayBindings["checked"] = !0
            }(),t = "__ko__cssValue",h.bindingHandlers["css"] = {
                update: function (a, b) {
                    var c = h.utils.unwrapObservable(b());
                    "object" == typeof c ? h.utils.objectForEach(c, function (b, c) {
                        c = h.utils.unwrapObservable(c), h.utils.toggleDomNodeCssClass(a, b, c)
                    }) : (c = String(c || ""), h.utils.toggleDomNodeCssClass(a, a[t], !1), a[t] = c, h.utils.toggleDomNodeCssClass(a, c, !0))
                }
            },h.bindingHandlers["enable"] = {
                update: function (a, b) {
                    var c = h.utils.unwrapObservable(b());
                    c && a.disabled ? a.removeAttribute("disabled") : c || a.disabled || (a.disabled = !0, a.setAttribute("disabled", "disabled"))
                }
            },h.bindingHandlers["disable"] = {
                update: function (a, b) {
                    h.bindingHandlers["enable"]["update"](a, function () {
                        return !h.utils.unwrapObservable(b())
                    })
                }
            },h.bindingHandlers["event"] = {
                init: function (a, b, c, d, e) {
                    var g, f = b();
                    a = ves(a);
                    for (g in f) !function (b, f) {
                        0 == f[b] instanceof Array && (f[b] = [f[b]]);
                        for (var g = 0; g < f[b].length; g++) "function" == typeof f[b][g] && function (b, f) {
                            ves(a).bind(b, function (a) {
                                return f.call(ves.event.target, {context: e, current: d, bind: c(), event: a})
                            }, f)
                        }(b, f[b][g])
                    }(g, f)
                }
            },h.bindingHandlers["foreach"] = {
                makeTemplateValueAccessor: function (a) {
                    return function () {
                        var d, e, b = a(), c = h.utils.peekObservable(b);
                        if (!c || "number" == typeof c.length) return {
                            foreach: b,
                            templateEngine: h.nativeTemplateEngine.instance
                        };
                        if (h.utils.unwrapObservable(b), c.data && c.data instanceof Array) return {
                            foreach: c["data"],
                            as: c["as"],
                            includeDestroyed: c["includeDestroyed"],
                            afterAdd: c["afterAdd"],
                            beforeRemove: c["beforeRemove"],
                            afterRender: c["afterRender"],
                            beforeMove: c["beforeMove"],
                            afterMove: c["afterMove"],
                            templateEngine: h.nativeTemplateEngine.instance
                        };
                        if ("object" == typeof c) {
                            d = [];
                            for (e in c) d.push({key: e, value: c[e]});
                            return {foreach: d, templateEngine: h.nativeTemplateEngine.instance}
                        }
                    }
                }, init: function (a, b) {
                    return a.isKoContext = !0, h.bindingHandlers["template"]["init"](a, h.bindingHandlers["foreach"].makeTemplateValueAccessor(b))
                }, update: function (a, b, c, d, e) {
                    return h.bindingHandlers["template"]["update"](a, h.bindingHandlers["foreach"].makeTemplateValueAccessor(b), c, d, e)
                }
            },h.expressionRewriting.bindingRewriteValidators["foreach"] = !1,h.virtualElements.allowedBindings["foreach"] = !0,u = "__ko_hasfocusUpdating",v = "__ko_hasfocusLastValue",h.bindingHandlers["hasfocus"] = {
                init: function (a, b, c) {
                    var d = function (d) {
                        var e, f, i;
                        if (a[u] = !0, e = a.ownerDocument, "activeElement" in e) {
                            try {
                                f = e.activeElement
                            } catch (g) {
                                f = e.body
                            }
                            d = f === a
                        }
                        i = b(), h.expressionRewriting.writeValueToProperty(i, c, "hasfocus", d, !0, a), a[v] = d, a[u] = !1
                    }, e = d.bind(null, !0), f = d.bind(null, !1);
                    h.utils.registerEventHandler(a, "focus", e), h.utils.registerEventHandler(a, "focusin", e), h.utils.registerEventHandler(a, "blur", f), h.utils.registerEventHandler(a, "focusout", f)
                }, update: function (a, b) {
                    var c = !!h.utils.unwrapObservable(b());
                    a[u] || a[v] === c || (c ? a.focus() : a.blur(), h.dependencyDetection.ignore(h.utils.triggerEvent, null, [a, c ? "focusin" : "focusout"]))
                }
            },h.expressionRewriting.twoWayBindings["hasfocus"] = !0,h.bindingHandlers["hasFocus"] = h.bindingHandlers["hasfocus"],h.expressionRewriting.twoWayBindings["hasFocus"] = !0,h.bindingHandlers["html"] = {
                init: function (a, b, c) {
                    var e, d = h.utils.unwrapObservable(b());
                    d && 0 != d.length || !c["has"]("default") || h.expressionRewriting.writeValueToProperty(null, c, "html", "", !0, a), e = function () {
                        var d = b(), e = "text" == a.getAttribute("type") ? a.innerText || a.textContent : a.innerHTML;
                        h.expressionRewriting.writeValueToProperty(d, c, "html", e, !1, a)
                    }, a.getAttribute("contenteditable") && h.utils.registerEventHandler(a, "blur", function () {
                        e()
                    })
                }, update: function (a, b, c) {
                    var d = h.utils.unwrapObservable(b());
                    h.validValue(a, d, c()), h.utils.setHtml(a, d)
                }
            },w("if"),w("ifnot", !1, !0),w("with", !0, !1, function (a, b) {
                return a["createChildContext"](b)
            }),x = {},h.bindingHandlers["options"] = {
                init: function (a) {
                    for (a.isKoContext = !0; a.length > 0;) a.remove(0);
                    return {controlsDescendantBindings: !0}
                }, update: function (a, c, d) {
                    function e() {
                        return h.utils.arrayFilter(a.options, function (a) {
                            return a.selected
                        })
                    }

                    function o(a, b, c) {
                        var d = typeof b;
                        return "function" == d ? b(a) : "string" == d ? a[b] : c
                    }

                    function q(c, e, f) {
                        var g, i, j;
                        return f.length && (n = f[0].selected ? [h.selectExtensions.readValue(f[0])] : [], p = !0), g = a.ownerDocument.createElement("option"), c === x ? (h.utils.setTextContent(g, d.get("optionsCaption")), h.selectExtensions.writeValue(g, b)) : (i = o(c, d.get("optionsValue"), c), h.selectExtensions.writeValue(g, h.utils.unwrapObservable(i)), j = o(c, d.get("optionsText"), i), h.utils.setTextContent(g, j)), [g]
                    }

                    function r(b, c) {
                        if (n.length) {
                            var d = h.utils.arrayIndexOf(n, h.selectExtensions.readValue(c[0])) >= 0;
                            h.utils.setOptionNodeSelectionState(c[0], d), p && !d && h.dependencyDetection.ignore(h.utils.triggerEvent, null, [a, "change"])
                        }
                    }

                    var l, m, n, p, s, f = 0 == a.length, g = !f && a.multiple ? a.scrollTop : null,
                        i = h.utils.unwrapObservable(c()), j = d.get("optionsIncludeDestroyed"), k = {};
                    n = a.multiple ? h.utils.arrayMap(e(), h.selectExtensions.readValue) : a.selectedIndex >= 0 ? [h.selectExtensions.readValue(a.options[a.selectedIndex])] : [], i && ("undefined" == typeof i.length && (i = [i]), m = h.utils.arrayFilter(i, function (a) {
                        return j || a === b || null === a || !h.utils.unwrapObservable(a["_destroy"])
                    }), d["has"]("optionsCaption") && (l = h.utils.unwrapObservable(d.get("optionsCaption")), null !== l && l !== b && m.unshift(x))), p = !1, k["beforeRemove"] = function (b) {
                        a.removeChild(b)
                    }, s = r, d["has"]("optionsAfterRender") && (s = function (a, c) {
                        r(a, c), h.dependencyDetection.ignore(d.get("optionsAfterRender"), null, [c[0], a !== x ? a : b])
                    }), h.utils.setDomNodeChildrenFromArrayMapping(a, m, q, k, s), h.dependencyDetection.ignore(function () {
                        if (d.get("valueAllowUnset") && d["has"]("value")) h.selectExtensions.writeValue(a, h.utils.unwrapObservable(d.get("value")), !0); else {
                            var b;
                            b = a.multiple ? n.length && e().length < n.length : n.length && a.selectedIndex >= 0 ? h.selectExtensions.readValue(a.options[a.selectedIndex]) !== n[0] : n.length || a.selectedIndex >= 0, b && h.utils.triggerEvent(a, "change")
                        }
                    }), h.utils.ensureSelectElementIsRenderedCorrectly(a), g && Math.abs(g - a.scrollTop) > 20 && (a.scrollTop = g)
                }
            },h.bindingHandlers["options"].optionValueDomDataKey = h.utils.domData.nextKey(),h.bindingHandlers["selectedOptions"] = {
                after: ["options", "foreach"],
                init: function (a, b, c) {
                    h.utils.registerEventHandler(a, "change", function () {
                        var d = b(), e = [];
                        h.utils.arrayForEach(a.getElementsByTagName("option"), function (a) {
                            a.selected && e.push(h.selectExtensions.readValue(a))
                        }), h.expressionRewriting.writeValueToProperty(d, c, "selectedOptions", e, !1, a)
                    })
                },
                update: function (a, b) {
                    if ("select" != h.utils.tagNameLower(a)) throw new Error("values binding applies only to SELECT elements");
                    var c = h.utils.unwrapObservable(b());
                    c && "number" == typeof c.length && h.utils.arrayForEach(a.getElementsByTagName("option"), function (a) {
                        var b = h.utils.arrayIndexOf(c, h.selectExtensions.readValue(a)) >= 0;
                        h.utils.setOptionNodeSelectionState(a, b)
                    })
                }
            },h.expressionRewriting.twoWayBindings["selectedOptions"] = !0,h.bindingHandlers["style"] = {
                update: function (a, b) {
                    var c = h.utils.unwrapObservable(b() || {});
                    h.utils.objectForEach(c, function (b, c) {
                        c = h.utils.unwrapObservable(c), a.style[b] = c || ""
                    })
                }
            },h.bindingHandlers["submit"] = {
                init: function (a, b, c, d, e) {
                    if ("function" != typeof b()) throw new Error("The value for a submit binding must be a function");
                    h.utils.registerEventHandler(a, "submit", function (c) {
                        var d, f = b();
                        try {
                            d = f.call(e["$data"], a)
                        } finally {
                            d !== !0 && (c.preventDefault ? c.preventDefault() : c.returnValue = !1)
                        }
                    })
                }
            },h.bindingHandlers["text"] = {
                init: function () {
                    return {controlsDescendantBindings: !0}
                }, update: function (a, b) {
                    h.utils.setTextContent(a, b())
                }
            },h.virtualElements.allowedBindings["text"] = !0,h.bindingHandlers["uniqueName"] = {
                init: function (a, b) {
                    if (b()) {
                        var c = "ko_unique_" + ++h.bindingHandlers["uniqueName"].currentIndex;
                        h.utils.setElementName(a, c)
                    }
                }
            },h.bindingHandlers["uniqueName"].currentIndex = 0,h.bindingHandlers["value"] = {
                after: ["options", "foreach"],
                init: function (a, b, c, d, e) {
                    var f, g, i, j, k, l, m;
                    !a.name && a.tagName && "option" != a.tagName.toLowerCase() && (f = a.getAttribute("bind"), f = f.split(/value[\s]*:[\s]*/gi), f = f[1].split(/[\s]*,/gi)[0], f = f.replace(/\./gi, "_"), e.$parent && (f = ves(a).parents("[isKoContext]")[0].koID + f), a.name = f), g = ["change"], i = c.get("valueUpdate"), j = !1, i && ("string" == typeof i && (i = [i]), h.utils.arrayPushAll(g, i), g = h.utils.arrayGetDistinctValues(g)), k = h.utils.unwrapObservable(b()), k && 0 != k.length || !c["has"]("default") || h.expressionRewriting.writeValueToProperty(null, c, "value", "", !0, a), l = function () {
                        var d, e;
                        j = !1, d = b(), e = h.selectExtensions.readValue(a), h.expressionRewriting.writeValueToProperty(d, c, "value", e, !1, a)
                    }, m = h.utils.ieVersion && "input" == a.tagName.toLowerCase() && "text" == a.type && "off" != a.autocomplete && (!a.form || "off" != a.form.autocomplete), m && -1 == h.utils.arrayIndexOf(g, "propertychange") && (h.utils.registerEventHandler(a, "propertychange", function () {
                        j = !0
                    }), h.utils.registerEventHandler(a, "focus", function () {
                        j = !1
                    }), h.utils.registerEventHandler(a, "blur", function () {
                        j && l()
                    })), h.utils.arrayForEach(g, function (b) {
                        var c = l;
                        h.utils.stringStartsWith(b, "after") && (c = function () {
                            setTimeout(l, 0)
                        }, b = b.substring("after".length)), h.utils.registerEventHandler(a, b, c)
                    })
                },
                update: function (a, b, c) {
                    var g, i, d = h.utils.unwrapObservable(b()), e = h.selectExtensions.readValue(a), f = d !== e;
                    h.validValue(a, d, c()), f && ("select" === h.utils.tagNameLower(a) ? (g = c.get("valueAllowUnset"), i = function () {
                        h.selectExtensions.writeValue(a, d, g)
                    }, i(), g || d === h.selectExtensions.readValue(a) ? setTimeout(i, 0) : h.dependencyDetection.ignore(h.utils.triggerEvent, null, [a, "change"])) : h.selectExtensions.writeValue(a, d))
                }
            },h.expressionRewriting.twoWayBindings["value"] = !0,h.bindingHandlers["visible"] = {
                update: function (a, b) {
                    var c = h.utils.unwrapObservable(b()), d = !("none" == a.style.display);
                    c && !d ? a.style.display = "" : !c && d && (a.style.display = "none")
                }
            },h.templateEngine = function () {
            },h.templateEngine.prototype["renderTemplateSource"] = function () {
                throw new Error("Override renderTemplateSource")
            },h.templateEngine.prototype["createJavaScriptEvaluatorBlock"] = function () {
                throw new Error("Override createJavaScriptEvaluatorBlock")
            },h.templateEngine.prototype["makeTemplateSource"] = function (a, b) {
                if ("string" == typeof a) {
                    b = b || d;
                    var c = b.getElementById(a);
                    if (!c) throw new Error("Cannot find template with ID " + a);
                    return new h.templateSources.domElement(c)
                }
                if (1 == a.nodeType || 8 == a.nodeType) return new h.templateSources.anonymousTemplate(a);
                throw new Error("Unknown template type: " + a)
            },h.templateEngine.prototype["renderTemplate"] = function (a, b, c, d) {
                var e = this["makeTemplateSource"](a, d);
                return this["renderTemplateSource"](e, b, c)
            },h.templateEngine.prototype["isTemplateRewritten"] = function (a, b) {
                return this["allowTemplateRewriting"] === !1 ? !0 : this["makeTemplateSource"](a, b)["data"]("isRewritten")
            },h.templateEngine.prototype["rewriteTemplate"] = function (a, b, c) {
                var d = this["makeTemplateSource"](a, c), e = b(d["text"]());
                d["text"](e), d["data"]("isRewritten", !0)
            },h.exportSymbol("templateEngine", h.templateEngine),h.templateRewriting = function () {
                function c(a) {
                    var c, d, e, f, b = h.expressionRewriting.bindingRewriteValidators;
                    for (c = 0; c < a.length; c++) if (d = a[c]["key"], b.hasOwnProperty(d)) if (e = b[d], "function" == typeof e) {
                        if (f = e(a[c]["value"])) throw new Error(f)
                    } else if (!e) throw new Error("This template engine does not support the '" + d + "' binding within its templates")
                }

                function d(a, b, d, e) {
                    var g, i, f = h.expressionRewriting.parseObjectLiteral(a);
                    return c(f), g = h.expressionRewriting.preProcessBindings(f, {valueAccessors: !0}), i = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + g + " } })()},'" + d.toLowerCase() + "')", e["createJavaScriptEvaluatorBlock"](i) + b
                }

                var a = /(<([a-z]+\d*)(?:\s+(?!bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'))?)*\s+)bind\s*=\s*(["'])([\s\S]*?)\3/gi,
                    b = /<!--\s*ko\b\s*([\s\S]*?)\s*-->/g;
                return {
                    ensureTemplateIsRewritten: function (a, b, c) {
                        b["isTemplateRewritten"](a, c) || b["rewriteTemplate"](a, function (a) {
                            return h.templateRewriting.memoizeBindingAttributeSyntax(a, b)
                        }, c)
                    }, memoizeBindingAttributeSyntax: function (c, e) {
                        return c.replace(a, function () {
                            return d(arguments[4], arguments[1], arguments[2], e)
                        }).replace(b, function () {
                            return d(arguments[1], "<!-- ko -->", "#comment", e)
                        })
                    }, applyMemoizedBindingsToNextSibling: function (a, b) {
                        return h.memoization.memoize(function (c, d) {
                            var e = c.nextSibling;
                            e && e.nodeName.toLowerCase() === b && h.applyBindingAccessorsToNode(e, a, d)
                        })
                    }
                }
            }(),h.exportSymbol("__tr_ambtns", h.templateRewriting.applyMemoizedBindingsToNextSibling),function () {
                var a, c;
                h.templateSources = {}, h.templateSources.domElement = function (a) {
                    this.domElement = a
                }, h.templateSources.domElement.prototype["text"] = function () {
                    var c, a = h.utils.tagNameLower(this.domElement),
                        b = "script" === a ? "text" : "textarea" === a ? "value" : "innerHTML";
                    return 0 == arguments.length ? this.domElement[b] : (c = arguments[0], "innerHTML" === b ? h.utils.setHtml(this.domElement, c) : this.domElement[b] = c, void 0)
                }, a = h.utils.domData.nextKey() + "_", h.templateSources.domElement.prototype["data"] = function (b) {
                    return 1 === arguments.length ? h.utils.domData.get(this.domElement, a + b) : (h.utils.domData.set(this.domElement, a + b, arguments[1]), void 0)
                }, c = h.utils.domData.nextKey(), h.templateSources.anonymousTemplate = function (a) {
                    this.domElement = a
                }, h.templateSources.anonymousTemplate.prototype = new h.templateSources.domElement, h.templateSources.anonymousTemplate.prototype.constructor = h.templateSources.anonymousTemplate, h.templateSources.anonymousTemplate.prototype["text"] = function () {
                    var a, d;
                    return 0 == arguments.length ? (a = h.utils.domData.get(this.domElement, c) || {}, a.textData === b && a.containerData && (a.textData = a.containerData.innerHTML), a.textData) : (d = arguments[0], h.utils.domData.set(this.domElement, c, {textData: d}), void 0)
                }, h.templateSources.domElement.prototype["nodes"] = function () {
                    var a, b;
                    return 0 == arguments.length ? (a = h.utils.domData.get(this.domElement, c) || {}, a.containerData) : (b = arguments[0], h.utils.domData.set(this.domElement, c, {containerData: b}), void 0)
                }, h.exportSymbol("templateSources", h.templateSources), h.exportSymbol("templateSources.domElement", h.templateSources.domElement), h.exportSymbol("templateSources.anonymousTemplate", h.templateSources.anonymousTemplate)
            }(),function () {
                function c(a, b, c) {
                    for (var d, e = a, f = h.virtualElements.nextSibling(b); e && (d = e) !== f;) e = h.virtualElements.nextSibling(d), c(d, e)
                }

                function d(a, b) {
                    if (a.length) {
                        var d = a[0], e = a[a.length - 1], f = d.parentNode, g = h.bindingProvider["instance"],
                            i = g["preprocessNode"];
                        if (i) {
                            if (c(d, e, function (a, b) {
                                    var c = a.previousSibling, f = i.call(g, a);
                                    f && (a === d && (d = f[0] || b), a === e && (e = f[f.length - 1] || c))
                                }), a.length = 0, !d) return;
                            d === e ? a.push(d) : (a.push(d, e), h.utils.fixUpContinuousNodeArray(a, f))
                        }
                        c(d, e, function (a) {
                            (1 === a.nodeType || 8 === a.nodeType) && h.applyBindings(b, a)
                        }), c(d, e, function (a) {
                            (1 === a.nodeType || 8 === a.nodeType) && h.memoization.unmemoizeDomNodeAndDescendants(a, [b])
                        }), h.utils.fixUpContinuousNodeArray(a, f)
                    }
                }

                function e(a) {
                    return a.nodeType ? a : a.length > 0 ? a[0] : null
                }

                function f(b, c, f, g, i) {
                    var j, k, l, m, n;
                    if (i = i || {}, j = b && e(b), k = j && j.ownerDocument, l = i["templateEngine"] || a, h.templateRewriting.ensureTemplateIsRewritten(f, l, k), m = l["renderTemplate"](f, g, i, k), "number" != typeof m.length || m.length > 0 && "number" != typeof m[0].nodeType) throw new Error("Template engine must return an array of DOM nodes");
                    switch (n = !1, c) {
                        case"replaceChildren":
                            h.virtualElements.setDomNodeChildren(b, m), n = !0;
                            break;
                        case"replaceNode":
                            h.utils.replaceDomNodes(b, m), n = !0;
                            break;
                        case"ignoreTargetNode":
                            break;
                        default:
                            throw new Error("Unknown renderMode: " + c)
                    }
                    return n && (d(m, g), i["afterRender"] && h.dependencyDetection.ignore(i["afterRender"], null, [m, g["$data"]])), m
                }

                function i(a, c) {
                    var d = h.utils.domData.get(a, g);
                    d && "function" == typeof d.dispose && d.dispose(), h.utils.domData.set(a, g, c && c.isActive() ? c : b)
                }

                var a, g;
                h.setTemplateEngine = function (c) {
                    if (c != b && !(c instanceof h.templateEngine)) throw new Error("templateEngine must inherit from ko.templateEngine");
                    a = c
                }, h.renderTemplate = function (c, d, g, i, j) {
                    var k, l, m;
                    if (g = g || {}, (g["templateEngine"] || a) == b) throw new Error("Set a template engine before calling renderTemplate");
                    return j = j || "replaceChildren", i ? (k = e(i), l = function () {
                        return !k || !h.utils.domNodeIsAttachedToDocument(k)
                    }, m = k && "replaceNode" == j ? k.parentNode : k, h.dependentObservable(function () {
                        var a = d && d instanceof h.bindingContext ? d : new h.bindingContext(h.utils.unwrapObservable(d)),
                            b = h.isObservable(c) ? c() : "function" == typeof c ? c(a["$data"], a) : c,
                            l = f(i, j, b, a, g);
                        "replaceNode" == j && (i = l, k = e(i))
                    }, null, {disposeWhen: l, disposeWhenNodeIsRemoved: m})) : h.memoization.memoize(function (a) {
                        h.renderTemplate(c, d, g, a, "replaceNode")
                    })
                }, h.renderTemplateForEach = function (a, c, e, g, i) {
                    var j, k = function (b, c) {
                        j = i["createChildContext"](b, e["as"], function (a) {
                            a["$index"] = c
                        });
                        var d = "function" == typeof a ? a(b, j) : a;
                        return f(null, "ignoreTargetNode", d, j, e)
                    }, l = function (a, b) {
                        d(b, j), e["afterRender"] && e["afterRender"](b, a)
                    };
                    return h.dependentObservable(function () {
                        var d, a = h.utils.unwrapObservable(c) || [];
                        "undefined" == typeof a.length && (a = [a]), d = h.utils.arrayFilter(a, function (a) {
                            return e["includeDestroyed"] || a === b || null === a || !h.utils.unwrapObservable(a["_destroy"])
                        }), h.dependencyDetection.ignore(h.utils.setDomNodeChildrenFromArrayMapping, null, [g, d, k, e, l])
                    }, null, {disposeWhenNodeIsRemoved: g})
                }, g = h.utils.domData.nextKey(), h.bindingHandlers["template"] = {
                    init: function (a, b) {
                        var d, e, c = h.utils.unwrapObservable(b());
                        return "string" == typeof c || c["name"] ? h.virtualElements.emptyNode(a) : (d = h.virtualElements.childNodes(a), e = h.utils.moveCleanedNodesToContainerElement(d), new h.templateSources.anonymousTemplate(a)["nodes"](e)), {controlsDescendantBindings: !0}
                    }, update: function (a, b, c, d, e) {
                        var g, m, n, o, f = b(), j = h.utils.unwrapObservable(f), k = !0, l = null;
                        "string" == typeof j ? (m = f, j = {}) : (m = j["name"], "if" in j && (k = h.utils.unwrapObservable(j["if"])), k && "ifnot" in j && (k = !h.utils.unwrapObservable(j["ifnot"])), g = h.utils.unwrapObservable(j["data"])), "foreach" in j ? (n = k && j["foreach"] || [], l = h.renderTemplateForEach(m || a, n, j, a, e)) : k ? (o = "data" in j ? e["createChildContext"](g, j["as"]) : e, l = h.renderTemplate(m || a, o, j, a)) : h.virtualElements.emptyNode(a), i(a, l)
                    }
                }, h.expressionRewriting.bindingRewriteValidators["template"] = function (a) {
                    var b = h.expressionRewriting.parseObjectLiteral(a);
                    return 1 == b.length && b[0]["unknown"] ? null : h.expressionRewriting.keyValueArrayContainsKey(b, "name") ? null : "This template engine does not support anonymous templates nested within its templates"
                }, h.virtualElements.allowedBindings["template"] = !0
            }(),h.exportSymbol("setTemplateEngine", h.setTemplateEngine),h.exportSymbol("renderTemplate", h.renderTemplate),h.utils.findMovesInArrayComparison = function (a, b, c) {
                if (a.length && b.length) {
                    var d, e, f, g, h;
                    for (d = e = 0; (!c || c > d) && (g = a[e]); ++e) {
                        for (f = 0; h = b[f]; ++f) if (g["value"] === h["value"]) {
                            g["moved"] = h["index"], h["moved"] = g["index"], b.splice(f, 1), d = f = 0;
                            break
                        }
                        d += f
                    }
                }
            },h.utils.compareArrays = function () {
                function c(c, e, f) {
                    return f = "boolean" == typeof f ? {dontLimitMoves: f} : f || {}, c = c || [], e = e || [], c.length <= e.length ? d(c, e, a, b, f) : d(e, c, b, a, f)
                }

                function d(a, b, c, d, e) {
                    var j, l, p, q, r, s, t, u, w, v, x, y, f = Math.min, g = Math.max, i = [], k = a.length,
                        m = b.length, n = m - k || 1, o = k + m + 1;
                    for (j = 0; k >= j; j++) for (q = p, i.push(p = []), r = f(m, j + n), s = g(0, j - 1), l = s; r >= l; l++) l ? j ? a[j - 1] === b[l - 1] ? p[l] = q[l - 1] : (t = q[l] || o, u = p[l - 1] || o, p[l] = f(t, u) + 1) : p[l] = l + 1 : p[l] = j + 1;
                    for (v = [], x = [], y = [], j = k, l = m; j || l;) w = i[j][l] - 1, l && w === i[j][l - 1] ? x.push(v[v.length] = {
                        status: c,
                        value: b[--l],
                        index: l
                    }) : j && w === i[j - 1][l] ? y.push(v[v.length] = {
                        status: d,
                        value: a[--j],
                        index: j
                    }) : (--l, --j, e["sparse"] || v.push({status: "retained", value: b[l]}));
                    return h.utils.findMovesInArrayComparison(x, y, 10 * k), v.reverse()
                }

                var a = "added", b = "deleted";
                return c
            }(),h.exportSymbol("utils.compareArrays", h.utils.compareArrays),function () {
                function a(a, c, d, e, f) {
                    var g = [], i = h.dependentObservable(function () {
                        var b = c(d, f, h.utils.fixUpContinuousNodeArray(g, a)) || [];
                        g.length > 0 && (h.utils.replaceDomNodes(g, b), e && h.dependencyDetection.ignore(e, null, [d, b, f])), g.length = 0, h.utils.arrayPushAll(g, b)
                    }, null, {
                        disposeWhenNodeIsRemoved: a, disposeWhen: function () {
                            return !h.utils.anyDomNodeIsAttachedToDocument(g)
                        }
                    });
                    return {mappedNodes: g, dependentObservable: i.isActive() ? i : b}
                }

                var c = h.utils.domData.nextKey();
                h.utils.setDomNodeChildrenFromArrayMapping = function (d, e, f, g, i) {
                    function w(a, b) {
                        v = k[b], p !== b && (t[a] = v), v.indexObservable(p++), h.utils.fixUpContinuousNodeArray(v.mappedNodes, d), n.push(v), r.push(v)
                    }

                    function x(a, b) {
                        if (a) for (var c = 0, d = b.length; d > c; c++) b[c] && h.utils.arrayForEach(b[c].mappedNodes, function (d) {
                            a(d, c, b[c].arrayEntry)
                        })
                    }

                    var j, k, l, m, n, o, p, q, r, s, t, u, v, z, A, y, C, D, B, E;
                    for (e = e || [], g = g || {}, j = h.utils.domData.get(d, c) === b, k = h.utils.domData.get(d, c) || [], l = h.utils.arrayMap(k, function (a) {
                        return a.arrayEntry
                    }), m = h.utils.compareArrays(l, e, g["dontLimitMoves"]), n = [], o = 0, p = 0, q = [], r = [], s = [], t = [], u = [], y = 0; z = m[y]; y++) switch (A = z["moved"], z["status"]) {
                        case"deleted":
                            A === b && (v = k[o], v.dependentObservable && v.dependentObservable.dispose(), q.push.apply(q, h.utils.fixUpContinuousNodeArray(v.mappedNodes, d)), g["beforeRemove"] && (s[y] = v, r.push(v))), o++;
                            break;
                        case"retained":
                            w(y, o++);
                            break;
                        case"added":
                            A !== b ? w(y, A) : (v = {
                                arrayEntry: z["value"],
                                indexObservable: h.observable(p++)
                            }, n.push(v), r.push(v), j || (u[y] = v))
                    }
                    for (x(g["beforeMove"], t), h.utils.arrayForEach(q, g["beforeRemove"] ? h.cleanNode : h.removeNode), y = 0, B = h.virtualElements.firstChild(d); v = r[y]; y++) {
                        for (v.mappedNodes || h.utils.extend(v, a(d, f, v.arrayEntry, i, v.indexObservable)), E = 0; D = v.mappedNodes[E]; B = D.nextSibling, C = D, E++) D !== B && h.virtualElements.insertAfter(d, D, C);
                        !v.initialized && i && (i(v.arrayEntry, v.mappedNodes, v.indexObservable), v.initialized = !0)
                    }
                    x(g["beforeRemove"], s), x(g["afterMove"], t), x(g["afterAdd"], u), h.utils.domData.set(d, c, n)
                }
            }(),h.exportSymbol("utils.setDomNodeChildrenFromArrayMapping", h.utils.setDomNodeChildrenFromArrayMapping),h.nativeTemplateEngine = function () {
                this["allowTemplateRewriting"] = !1
            },h.nativeTemplateEngine.prototype = new h.templateEngine,h.nativeTemplateEngine.prototype.constructor = h.nativeTemplateEngine,h.nativeTemplateEngine.prototype["renderTemplateSource"] = function (a) {
                var g, d = !(h.utils.ieVersion < 9), e = d ? a["nodes"] : null, f = e ? a["nodes"]() : null;
                return f ? h.utils.makeArray(f.cloneNode(!0).childNodes) : (g = a["text"](), h.utils.parseHtmlFragment(g))
            },h.nativeTemplateEngine.instance = new h.nativeTemplateEngine,h.setTemplateEngine(h.nativeTemplateEngine.instance),h.exportSymbol("nativeTemplateEngine", h.nativeTemplateEngine)
        })
    }(), function () {
        var a = [], b = [];
        ko.ready = function (b) {
            "function" == typeof b && a.push(b)
        }, ko.binded = function (a) {
            "function" == typeof a && b.push(a)
        }, ko.bind = function (c, d) {
            var e, f;
            for (c || (c = {}), c.cookie || (c.cookie = ves.cookie), c.query || (c.query = ves.query), c.browser || (c.browser = ves.browser), e = !0, f = 0; f < a.length; f++) e = a[f].call(c);
            if (0 == e) return !1;
            for (a.length = 0, d = d ? ves(d)[0] : ves("html")[0], ko.applyBindings(c, d), f = 0; f < b.length; f++) b[f].call(c);
            return b.length = 0, c
        }
    }()
}();
﻿(function () {
    var $ = ves;
    var alerts = [];
    $.alert = function (param, complete, type, closeTime) {
        if (param == undefined || param == null) param += '';
        var _alert = {};
        alerts.push(_alert);
        if (!param.content) param = {content: param};
        if (alerts.length == 1) $.html.addClass('ves-alert');
        var alert = document.createElement('div');
        alert.id = 'alert';
        alert.className = 'ves';
        alert.style.zIndex = '1000' + alerts.length;
        var body = document.createElement('div');
        body.className = "body";
        alert.appendChild(body);
        var content = document.createElement('div');
        content.className = "content";
        body.appendChild(content);
        param.complete = param.complete ? param.complete : typeof (complete) == 'function' ? complete : typeof (type) == 'function' ? type : typeof (closeTime) == 'function' ? closeTime : null;
        param.type = param.type ? param.type : typeof (complete) == 'string' ? complete : typeof (type) == 'string' ? type : typeof (closeTime) == 'string' ? closeTime : null;
        param.closeTime = param.closeTime != undefined ? param.closeTime : typeof (complete) == 'number' ? complete : typeof (type) == 'number' ? type : typeof (closeTime) == 'number' ? closeTime : null;
        param.buttons = param.buttons ? param.buttons : $.alert.buttons;
        var focusButton = null;
        if (param.type != 'notify' && param.type != 'wait') {
            var bottom = document.createElement('div');
            bottom.className = "input";
            var button;
            if (param.type == 'confirm') {
                alert.className = 'ves confirm';
                button = document.createElement('input');
                button.type = 'button';
                button.value = param.buttons.no;
                button.className = 'button cancel';
                $(button).bind('tap', function () {
                    $.alert.close(false);
                    ves.event.stopParent();
                    ves.event.stopDefault();
                });
                bottom.appendChild(button);
            }
            focusButton = document.createElement('input');
            focusButton.type = 'button';
            focusButton.value = param.buttons.yes;
            focusButton.className = 'button fix';
            $(focusButton).bind('tap', function () {
                $.alert.close(true);
                ves.event.stopParent();
                ves.event.stopDefault();
            });
            bottom.appendChild(focusButton);
            body.appendChild(bottom);
        }
        else {
            if (param.type == 'notify') {
                param.closeTime = param.closeTime != undefined ? param.closeTime : 2;
                alert.className = 'ves notify';
            }
            else if (param.type == 'wait') {
                param.closeTime = null;
                alert.className = 'ves wait';
            }
        }
        _alert.holder = $(alert);
        _alert.content = $(content);
        _alert.targetParent = null;
        _alert.targetNext = null;
        $.body.append(_alert.holder);
        _alert.complete = param.complete;
        _alert.context = param.context;
        if (param.style) _alert.holder.addClass(param.style);
        _alert.content.html('');
        if (param.url && $(param.content).length == 0) {
            $.alert({content: '<span class="ic-load"></span>', type: 'wait', style: 'clear'});
            $.ajax({
                url: param.url, dataType: param.dataType, context: _alert, success: function (request) {
                    this.content.html(request);
                    setTimeout(function () {
                        $.alert.close();
                        _alert.holder.addClass('view');
                    }, 0);
                }
            });
        }
        else {
            var target = $(param.content);
            if (target.length > 0) {
                _alert.target = target[0];
                _alert.targetParent = target[0].parentNode;
                _alert.targetNext = target[0].nextSibling;
                _alert.content.append(target[0]);
            }
            else _alert.content.html(param.content);
            $('form', _alert.content).each(function () {
                this.onsubmit = function () {
                    $.alert.close(true);
                    return false;
                }
            });
            setTimeout(function () {
                _alert.holder.addClass('view');
            }, 0);
        }
        if (param.closeTime != undefined) {
            var button = $('.button', _alert.holder);
            button.val(param.buttons.yes + ' ( ' + param.closeTime + ' )');
            param.closeTime -= 1;
            _alert.closeTimer = window.setInterval(function () {
                if ((param.closeTime > 0) == false) {
                    window.clearInterval(_alert.closeTimer);
                    button.val(param.buttons.yes);
                    $.alert.close();
                    return;
                }
                button.val(param.buttons.yes + ' ( ' + param.closeTime + ' )');
                param.closeTime -= 1;
            }, 1000);
        }
        if (focusButton)
            focusButton.focus();
        _alert.holder[0].scrollTop = 0;
        return this;
    };
    $.alert.close = function (ok) {
        if (alerts.length == 0) return this;
        var _alert = alerts[alerts.length - 1];
        window.clearInterval(_alert.closeTimer);
        if (_alert.target && _alert.targetParent) {
            if (_alert.targetNext)
                _alert.targetParent.insertBefore(_alert.target, _alert.targetNext);
            else _alert.targetParent.appendChild(_alert.target);
        }
        else {
            var child = _alert.content.children('.alert:first');
            if (child.length == 1) {
                ves.body.append(child[0]);
            }
        }
        _alert.holder.remove();
        if (alerts.length == 1) $.html.removeClass('ves-alert');
        alerts.pop();
        if (typeof (_alert.complete) == 'function') {
            _alert.complete.call(_alert.context, ok);
        }
        return this;
    };
    $.alert.buttons = {no: '取消', yes: '确定'};
    $.alert.closeAll = function () {
        for (var i = 0; i < alerts.length; i++) {
            $.alert.close();
        }
    };
})();﻿if (document.cookie && document.cookie != '') {
    var name, val = null;
    qs = document.cookie.split(/;[\s]*/gi);
    for (var i = 0; i < qs.length; i++) {
        index = qs[i].trim().indexOf('=');
        if (index < 0) {
            name = qs[i];
            val = '';
        }
        else {
            name = qs[i].substring(0, index).trim();
            val = qs[i].substr(index + 1);
            if (val != '') val = decodeURIComponent(val);
        }
        if (name.length > 0) ves.cookie[name] = val;
    }
}

page = {
    qq: '',
    stars: [
        {id: 1, name: '小熊Ann', nearby: 73654},
        {id: 3, name: 'Mona', nearby: 3228},
        {id: 4, name: '李仁惠', nearby: 218}
    ],
    comments: {
        '1': [
            {name: '宋仲基╮撒浪嘿呦', comment: '脑公超帅的，被他迷到不行，希望我快点白也找到男神，哈哈！'},
            {name: 'Mini安', comment: '之前加过小熊ann了，里面分享好多护肤好物，美白心得，天天更新看不腻哦！'},
            {name: '青山黛玛', comment: '美女！加了，求通过'},
            {name: '吗尼玛霓虹', comment: '自从成为小熊ann的脑馋粉，每天就等着更美白帖，推荐的东西也是好用得不要不要的。'},
            {name: '左左尔尔', comment: '小熊ann推荐的方法都是简单好用的，适合想白的学生党！'},
            {name: 'Déjà vu', comment: '小熊ann大女神，肤白，人美，性格超NICE！真的像好姐妹一样给我护肤建议，爱你么么哒！'},
            {name: 'Queenie', comment: '我想知道是不是真的有法子白？我是敏感肌，好多美白产品不敢乱用，先不理了，加了先。'},
            {name: '我是瘦瘦', comment: '前段时间晒黑了，用了小熊ann的方法，果然很快白起来，这个夏天都不怕晒黑了。'}
        ],
        '2': [
            {name: '开着奔驰捡破烂', comment: '小熊ann，QQ昵称是叫小熊ann？申请提交了！！求通过!！求带我白上天~'},
            {
                name: '小清新的妮',
                comment: '旅游晒黑的，各种偏方折腾3个月了，都没白回来，快急死了。幸好有小熊ann，按她的经验，在防晒、护理上花心思，现在已经慢慢开始变白了，好鸡冻！！小熊ann么么哒~'
            },
            {name: '一只小柴犬', comment: '小熊ann好好！每次问问题，都是立马就回我的，人美、颜好，还没架子，真好！最最重要是教的方法不错，亲测3天明显提亮好多！'},
            {name: '桀骜的JJ', comment: '之前为了白，真是抽疯一样试各种偏方、小窍门啊，现在想想没毁容都是“上辈子积福”。从没想过，原来美白还可以这么简单！太感谢了！'},
            {name: '网丝瑶瑶', comment: '一直美白却用错方法，不是加了小熊ann，我还傻傻继续浪费钱呢！推荐努力美白的菇凉都关注下，每天的分享都很精彩！'},
            {name: '卢璐噜', comment: '美白找不对方法太难了，还好有小熊ann，我在努力了，姐妹们一起加油！'},
            {name: '等风来', comment: '没黑过的人，不会理解变白后有多惊喜。谢谢小熊ann！我成功了！现在怎么打扮都好看，淡妆浓抹总相宜，开心~'},
            {name: 'balanche', comment: '只有我觉得小熊ann酱的<血泪经验> 简直像篇“女神攻略”吗？不能更赞！已经扩散了！'}
        ],
        '3': [
            {name: '请深爱', comment: '发了加好友请求了，我的是敏感肌，平时不敢乱用护肤品，一不小心就会有红点，希望小熊姐姐能教教我怎么护肤。', pic: true},
            {name: 'saysay', comment: '现在班里最黑的女生应该就是我了，希望姐姐能帮我变白，烦死了....求通过'},
            {name: '小苹果', comment: '现在去微商朋友那买面膜都可以买穷了，呵呵。感觉没什么卵用。要不一辈子黑死不嫁人算了'},
            {name: '海岸花', comment: '小熊姐姐皮肤好好....求带...'},
            {name: 'Mini安', comment: '之前加过小熊ann了，里面分享好多护肤好物，美白心得，天天更新看不腻哦！'},
            {name: '青山黛玛', comment: '美女！加了，求通过'},
            {name: '吗尼玛霓虹', comment: '自从成为小熊ann的脑馋粉，每天就等着更美白帖，推荐的东西也是好用得不要不要的。'},
            {name: '左左尔尔', comment: '小熊ann推荐的方法都是简单好用的，适合想白的学生党！'},
            {name: 'Déjà vu', comment: '小熊ann大女神，肤白，人美，性格超NICE！真的像好姐妹一样给我护肤建议，爱你么么哒！'}
        ],
        '4': [
            {name: '开着奔驰捡破烂', comment: '厉害了word姐，励志！！ 美白求带求带！！'},
            {name: '小清新的妮', comment: '对付渣男贱女就该这样，挺你，你会找到更好的！小熊Ann已加，求带我白上天'},
            {name: '一只小柴犬', comment: '兰兰，别伤心，渣男瞎了眼才选那个贱人，她根本比不上你，摸头摸头~~ 然后，谢谢分享的小熊，按她教的办法坚持了3个多星期，现在伦家已经有点变白啦，超开熏'},
            {name: '桀骜的JJ', comment: '楼主坚强，你比宝强幸运多了，有小熊Ann这个女神教你变美变白，比我们这些自己瞎摸索的好多了，求带求带！'},
            {name: '网丝瑶瑶', comment: '谢谢兰兰，小熊Ann人好好，我每次问问题，都立即回我，人也美，教的办法也超赞，亲测有效，还在坚持着用！'},
            {name: '卢璐噜', comment: '美白找不对方法太难了，还好有小熊ann，我在努力了，姐妹们一起加油！'},
            {name: '等风来', comment: '没黑过的人，不会理解变白后有多惊喜。谢谢小熊ann！我成功了！现在怎么打扮都好看，淡妆浓抹总相宜，开心~'},
            {name: 'balanche', comment: '只有我觉得小熊ann酱的<血泪经验> 简直像篇“女神攻略”吗？不能更赞！已经扩散了！'}
        ],
        '5': [
            {name: '梦甜馨', comment: '求美白方法！放假会来晒成黑鬼，有什么办法快点白？？？'},
            {name: 'oo兜兜冇餹', comment: '小熊，你好，我是容易晒黑的皮肤，身上挺白的，露出来都黑黄黑黄的，有办法吗？'},
            {name: 'Timeless', comment: '留言了皮肤问题，加好友啦，小熊挺耐心的，问得都很详细，先试试看。'},
            {name: '喔喔奶糖', comment: '我皮肤天生黑，试过很多方法美白都没用，求方法？'},
            {name: '萌了个乖乖', comment: '不懂的护肤，学习下小熊姐姐的方法，这几天皮肤有点变化了。'},
            {name: ' Healer', comment: '加了QQ，小熊的建议挺好，值得一试。'},
            {name: '萌面超妹', comment: '同学推荐我加了小熊，才知道宿舍的小伙伴皮肤有问题都是请教小熊的，小熊好棒！'},
            {name: 'Blackgirl', comment: '简直是小白们的福音，不会护肤的都加一下，小熊的分享蛮不错！'},
            {name: '别摸我的婴儿肥', comment: '发了验证，小熊通过下。'},
            {name: '爱你无解', comment: '不懂怎么才能洗脸洗干净呢，每天洗完鼻子都黑黑的，一下子又很多油，有办法吗？小熊'},
            {name: '情歌只为你唱', comment: '以前和同学讨论过怎么护肤，但是方法好像都不对呢，还好小熊姐姐教了我，皮肤变美了。'},
            {name: '别人的拥抱再美也不温暖', comment: '小熊，试了你的方法几天，不错哦！会一直坚持的。'},
            {name: '唯一', comment: '皮肤挺黑的，也有一直防晒？还有什么方法呢？加了你试试。'},
            {name: '待机的情', comment: '皮肤黑了感觉老了20岁，加小熊QQ学到了很多方法，活了这么大年纪都不会护肤必须认真学学了。'},
            {name: '我一直在你身后', comment: '已经加好友，也发了问题，期待收到加大方法。'}
        ],
        '6': [
            {
                name: '雨诺',
                comment: '一直关注小熊，好开心得到这次免费试用的机会，今天刚到货就迫不及待打开用了，敷完后感觉还可以，当然祛痘的效果没那么快，期待用完一瓶后的效果。',
                pic: true,
                see: '4511',
                zan: '327',
                say: '47'
            },
            {
                name: '默默的思念',
                comment: '之前小熊帮我定制了一套美白方案，我用了一段时间真的变白了，我默默的关注小熊很久了，很开心免费试用红酒面膜很好用。',
                pic: true,
                see: '3554',
                zan: '677',
                say: '121'
            },
            {
                name: '啊Sa咪',
                comment: '精油不错，内包滴管状看起来很专业，我把精油滴了几滴盆里加热水蒸脸做深度的护理，用了几次后细纹都没了，皮肤光洁紧致，最近睡眠质量也更好了。大赞！',
                pic: true,
                see: '1158',
                zan: '332',
                say: '298'
            },
            {
                name: '29岁的初恋',
                comment: '没想到中了试用的 以为是小样 没想到这么大一瓶 快递超级快 而且包装完美 外观也好看 重点是味道炒鸡喜欢 淡淡的香味 今晚用了一下真的很不错 值得推荐',
                pic: false,
                see: '2014',
                zan: '261',
                say: '59'
            },
            {
                name: '云端之吻',
                comment: '效果很好，我申请的是绿豆泥面膜，控油效果：很好，我是油性皮肤，用完后脸木有之前那么油了,保湿效果：膏体比较细腻，用完后脸感觉很润，滑滑的。试用完我都有再入一瓶啦。',
                pic: false,
                see: '2554',
                zan: '111',
                say: '74'
            },
            {
                name: '菲菲',
                comment: '精油很不错哦，容易吸收不油腻，淡淡的玫瑰花香。用了两周了皮肤明显嫩滑了很多，非常喜欢呦~~',
                pic: false,
                see: '4511',
                zan: '327',
                say: '198'
            },
            {
                name: '卓娅君君',
                comment: '没想到我竟然能免费领到这么高大上的精油，哈哈！！真的很开心我是瓷粉，用过好几款小瓷家的产品感觉都特别的棒！会一直购买的',
                pic: false,
                see: '2521',
                zan: '127',
                say: '66'
            },
            {
                name: '多拉A梦',
                comment: '以前就用过红酒成分的面膜，还挺好用哒，这次领到的红酒多酚面膜更好，感谢小熊姐姐。',
                pic: false,
                see: '2864',
                zan: '424',
                say: '163'
            }
        ],
        '7': [
            {
                name: '美白老司机',
                comment: '冰冰是各大时装周开幕必邀“毯星”，一直被诟病没有代表作的她，靠着1年用700张面膜美白，赚足了话题，也显示出她对白的极致追求，从此粉丝们只记得美=白。雪白的肌肤艳压一众女星，让网友也直呼“千万不要和冰冰合影”。',
                jump: '怎样敷面膜白得快？加小熊好友告诉你。'
            },
            {
                name: '有多少白可以重来',
                comment: '娱乐圈有位辣妈演技了得，“娘娘”形象深入人心。34岁的她是2个孩子的妈咪，但每次出席活动、上节目、颁奖礼，一身皮肤白得发亮配上好衣品，在众星中尤为显眼。据说片场连反光板都不用，灯光师都省事多了。',
                jump: '过了30岁不当黄脸婆，去黄气最快的方法？加好友跟小熊学吧。'
            },
            {
                name: '要么白要么丑',
                comment: '出演大导演《金陵十几釵》一炮走红的小妮子，是时尚杂志封面、时装周的常客，拥有比常人白几度的好肤色，自然穿啥啥美。每每PO照到网上，必引起粉丝网友点赞，被称为“最会拍照的女明星”。明星总是带妆一整天，小妮子的美白秘诀是：做好清洁和防晒。',
                jump: '平时注意防晒还是黑？清水洗脸没用？明星洗脸方法大公开！关注小熊学护肤。'
            },
            {
                name: '你丫全家都黑',
                comment: '文艺女神凭借和影帝大尺度演出成名，却一度让她惨遭封杀。凭借实力演技和多年沉淀，终于斩获影后荣誉。文艺女神明明偏爱重口味红烧肉，偏偏对媒体称最喜爱吃香菇菜心。一身的深肤色，让她和晚辈小花们合影大吃亏，总是沦为路人。',
                jump: '吃深色食物真的会变黑吗？多喝牛奶真的可以美白吗？小熊教你1招靠谱美白招数。'
            },
            {
                name: '黑人问号',
                comment: '女星S早期出道肤色黑黄，个子瘦小，给人感觉营养不良，后来通过医美手段“变脸”，从黑姑娘变成雪公主，还出书分享变美秘诀，自称娱乐圈的“美容大王”。后来嫁入豪门却生不出娃，据闻和常年打美白针有关。',
                jump: '美白针真的能美白？美白针安全吗？关注小熊，告诉你最安全的美白方法。'
            },
            {
                name: '黑到懵逼',
                comment: '歌唱选秀节目选手J女郎，一身古铜健康肤色，民族风打扮，在众多新秀中分外耀眼，但每每出席活动、看时装秀，一身黑不溜秋的肤色，让她总是被同场女星秒成渣！女星们都超稀饭和她做盆友，因为有她黑黑土土显得自己更美更仙啊~',
                jump: '皮肤晒黑以后，第一件事要做什么？关注小熊马上教你。'
            },
        ],
        '8': [
            {name: '脱离黄钻用户', comment: '我朋友也听说小熊了，我们都加了她，护肤给的建议还挺不错的！推荐大家。'},
            {name: '凡凡欢迎回来', comment: '小熊Ann人气好旺！反正几次和她聊她都挺忙的，不过她的护肤推荐很贴心，真心为粉丝好！'},
            {name: 'December', comment: '已经加你了，小熊姐姐，求通过。'},
            {name: '偶旳温顺', comment: '一直肤色都不白，我真相信灰姑娘能变白天鹅，看看大S，小熊姐跪求方法！'},
            {name: '長吥夶', comment: '人漂亮，皮肤好，性格又好，按她的方法护肤管用，好多朋友都加她了。'},
            {name: '玫瑰命', comment: '我天生就是黑皮肤，长这么大试过无数方法还是没法白，就想知道自己能变多白。'},
            {name: '给伱最好自己', comment: '皮肤黑看起来很土，如果有人可以教我变白的法子就好了。'}
        ]
    },
    qqchat: function (qq) {
        fmkj.mqq.chat(qq, 1, function (status) {
            if (!status) {
                alert("请检查您的设备是否已安装手机QQ");
            }
        }, false);
    },
    getHttpRequest: function (url, datas, time) {
        var setT = setTimeout(function () {
            ves.ajax({
                url: url, //url可不传, 默认为当前页面地址; 传null则不发生请求.
                data: datas,
                error: function () {

                },
                success: function (data) {

                    if (datas != '') {
                        if (data.data.qq != ves.cookie['qq']) {
                            ves.setCookie('qq', data.data.qq, {expires: 360});
                            ves.setCookie('tpl', data.data.tpl, {expires: 360});
                            page.qq = ves.cookie['qq'];
                        } else {
                            page.qq = ves.cookie['qq'];
                        }
                    } else {
                        console.log(data);
                        console.log(data.data);
                        console.log(data.data.qq);
                        ves.setCookie('qq', data.data.qq, {expires: 360});
                        ves.setCookie('tpl', data.data.tpl, {expires: 360});
                        ves.setCookie('key', data.data.key, {expires: 360});
                        ves.setCookie('type', data.data.type, {expires: 360});
                        page.qq = ves.cookie['qq'];
                    }
                    if (typeof(callback) == 'function')
                        callback();
                    clearTimeout(setT);
                }
            });
        }, time);
    },
    getCurrentQQ: function (callback) {
        page.qq = ves.cookie['qq'];
        var mkey = ves.cookie['key'];
        var type = ves.cookie['type'];
        if (page.qq) {
            page.getHttpRequest('/star.php?type=getQQ', {'key': mkey, 'ret': type}, 1000);
        } else {
            page.getHttpRequest('/star.php?type=getQQ', '', 1000);
        }
    },
    statistic: function (str, title) {
        if (window._paq) {
            _paq.push(["setCustomUrl", "Virtual/SMT/" + str + '/' + webUrl]);
            _paq.push(["trackPageView", "Virtual/SMT/" + str + '/' + webUrl]);
            ga('send', 'pageview', {'page': ' Virtual/SMT/' + str, 'title': title || str});
        }
    },
    loadStatistic: function (index) {
        var qq = page.getCurrentQQ();
        page.statistic('QNUM_' + qq + '_' + page.stars[index].name);
    }
};
ves(function () {

    if (ves.query['test']) ves.alert(document.cookie);
    var viewModel = {
        stars: page.stars,
        stars_comment: page.comments,
        qqchat: function (e) {
            if (!e.current) {
                e.current = e.context.$parent;
            }
            var name = e.current.name;
            // console.log(name)
            var qqNumber = page.qq;
            var isClickAddTip = false;//是否点击过渡页
            //console.log(name);
            switch (this.getAttribute('handle')) {
                case 'addfriend_tip': {
                    var addfriend_tip = document.createElement('div');
                    var tip_txt = ves("#tip_txt").html();
                    addfriend_tip.id = "addfriend_tip";
                    addfriend_tip.innerHTML = '<div class="black_bg"><p class="timer"><span class="time_num">3</span>s跳过</p><div class="tip_btn"><img src="/templates/res/star/common/addfriend_tip_btn1.png" /></div><div class="tip_crow"><img src="/templates/res/star/common/tip2.png" /></div><p class="chat_tips"><img src="/templates/res/star/common/chat_tips.png" /></p></div><p class="tip_name">' + name + '</p>';
                    ves.alert({
                        content: addfriend_tip,
                        type: 'notify',
                        style: 'clear ddfriend_tip',
                        closeTime: 4,
                        context: this,
                        complete: function () {
                            page.qqchat(qqNumber);
                            if (isClickAddTip) {
                                switch (this.getAttribute('class')) {
                                    case 'qq':
                                        page.statistic('QQ_' + name + '_sd');
                                        break;
                                    case 'fixed_qq':
                                        page.statistic('QQ_Sus_' + name + '_sd');
                                        break;
                                    case 'sus':
                                        page.statistic('QQ_Sus_' + name + '_sd');
                                        break;
                                    case 'left':
                                        page.statistic('QQ_tx_' + name + '_sd');
                                        break;
                                    case 'tx':
                                        page.statistic('QQ_tx_' + name + '_sd');
                                        break;
                                    case 'top_r':
                                        page.statistic('QQ_' + name + '_top_sd');
                                        break;
                                    case 'top2':
                                        page.statistic('QQ_' + name + '_top_1_sd');
                                        break;
                                    case 'result':
                                        page.statistic('QQ_' + name + '_sd');
                                        break;
                                    case 'mid1':
                                        page.statistic('QQ_' + name + '_Mid1_sd');
                                        break;
                                    case 'mid2':
                                        page.statistic('QQ_' + name + '_Mid2_sd');
                                        break;
                                    case 'mid3':
                                        page.statistic('QQ_' + name + '_Mid3_sd');
                                        break;
                                    case 'mid4':
                                        page.statistic('QQ_' + name + '_Mid4_sd');
                                        break;
                                    case 'mid5':
                                        page.statistic('QQ_' + name + '_Mid5_sd');
                                        break;
                                    case 'mid6':
                                        page.statistic('QQ_' + name + '_Mid6_sd');
                                        break;
                                    case 'mid7':
                                        page.statistic('QQ_' + name + '_Mid7_sd');
                                        break;
                                    case 'txdb1':
                                        page.statistic('QQ_txdb_' + name + '_1_sd');
                                        break;
                                    case 'txdb2':
                                        page.statistic('QQ_txdb_' + name + '_2_sd');
                                        break;
                                    case 'txdb3':
                                        page.statistic('QQ_txdb_' + name + '_3_sd');
                                        break;
                                    case 'txdb4':
                                        page.statistic('QQ_txdb_' + name + '_4_sd');
                                        break;
                                    case 'txdb5':
                                        page.statistic('QQ_txdb_' + name + '_5_sd');
                                        break;
                                    default:
                                        page.statistic('QQ_tx_' + name + '_sd');
                                        break;
                                }
                            } else {
                                switch (this.getAttribute('class')) {
                                    case 'qq':
                                        page.statistic('QQ_' + name + '_zd');
                                        break;
                                    case 'fixed_qq':
                                        page.statistic('QQ_Sus_' + name + '_zd');
                                        break;
                                    case 'sus':
                                        page.statistic('QQ_Sus_' + name + '_zd');
                                        break;
                                    case 'left':
                                        page.statistic('QQ_tx_' + name + '_zd');
                                        break;
                                    case 'tx':
                                        page.statistic('QQ_tx_' + name + '_zd');
                                        break;
                                    case 'top_r':
                                        page.statistic('QQ_' + name + '_top_zd');
                                        break;
                                    case 'top2':
                                        page.statistic('QQ_' + name + '_top_1_zd');
                                        break;
                                    case 'result':
                                        page.statistic('QQ_' + name + '_zd');
                                        break;
                                    case 'mid1':
                                        page.statistic('QQ_' + name + '_Mid1_zd');
                                        break;
                                    case 'mid2':
                                        page.statistic('QQ_' + name + '_Mid2_zd');
                                        break;
                                    case 'mid3':
                                        page.statistic('QQ_' + name + '_Mid3_zd');
                                        break;
                                    case 'mid4':
                                        page.statistic('QQ_' + name + '_Mid4_zd');
                                        break;
                                    case 'mid5':
                                        page.statistic('QQ_' + name + '_Mid5_zd');
                                        break;
                                    case 'mid6':
                                        page.statistic('QQ_' + name + '_Mid6_zd');
                                        break;
                                    case 'mid7':
                                        page.statistic('QQ_' + name + '_Mid7_zd');
                                        break;
                                    case 'txdb1':
                                        page.statistic('QQ_txdb_' + name + '_1_zd');
                                        break;
                                    case 'txdb2':
                                        page.statistic('QQ_txdb_' + name + '_2_zd');
                                        break;
                                    case 'txdb3':
                                        page.statistic('QQ_txdb_' + name + '_3_zd');
                                        break;
                                    case 'txdb4':
                                        page.statistic('QQ_txdb_' + name + '_4_zd');
                                        break;
                                    case 'txdb5':
                                        page.statistic('QQ_txdb_' + name + '_5_zd');
                                        break;
                                    default:
                                        page.statistic('QQ_tx_' + name + '_zd');
                                        break;
                                }
                            }
                        }
                    });
                    ves('#alert.addfriend_tip').on('tap', function () {
                        //page.statistic('remind');
                        isClickAddTip = true;
                        ves.alert.close();
                    });

                    var timer_holder = addfriend_tip.firstChild.firstChild.firstChild;
                    var timer_number = parseInt(timer_holder.innerHTML);
                    var timer = setInterval(function () {
                        timer_number -= 1;
                        if (timer_number < 0) {
                            clearInterval(timer);
                            timer = null;
                        }
                        timer_holder.innerHTML = timer_number;
                    }, 1000);
                    break;
                }
                case 'clicktab':
                    if (this.getAttribute('class') == 'voice') {
                        page.statistic('other_yuyin_' + name);
                    }
                    ;
                    if (this.getAttribute('class') == 'clicktab') {
                        page.statistic('other_liuyan_' + name);
                    }
                    ;
                    break;
                case 'close':
                    page.statistic('other_close_' + name);
                    break;
                default: {
                    page.qqchat(qqNumber);
                    switch (this.getAttribute('class')) {
                        case 'qq':
                            page.statistic('QQ_' + name + '_zd');
                            break;
                        case 'fixed_qq':
                            page.statistic('QQ_Sus_' + name + '_zd');
                            break;
                        case 'sus':
                            page.statistic('QQ_Sus_' + name + '_zd');
                            break;
                        case 'left':
                            page.statistic('QQ_tx_' + name + '_zd');
                            break;
                        case 'tx':
                            page.statistic('QQ_tx_' + name + '_zd');
                            break;
                        case 'top_r':
                            page.statistic('QQ_' + name + '_top_zd');
                            break;
                        case 'top2':
                            page.statistic('QQ_' + name + '_top_1_zd');
                            break;
                        case 'result':
                            page.statistic('QQ_' + name + '_zd');
                            break;
                        case 'mid1':
                            page.statistic('QQ_' + name + '_Mid1_zd');
                            break;
                        case 'mid2':
                            page.statistic('QQ_' + name + '_Mid2_zd');
                            break;
                        case 'mid3':
                            page.statistic('QQ_' + name + '_Mid3_zd');
                            break;
                        case 'mid4':
                            page.statistic('QQ_' + name + '_Mid4_zd');
                            break;
                        case 'mid5':
                            page.statistic('QQ_' + name + '_Mid5_zd');
                            break;
                        case 'mid6':
                            page.statistic('QQ_' + name + '_Mid6_zd');
                            break;
                        case 'mid7':
                            page.statistic('QQ_' + name + '_Mid7_zd');
                            break;
                        case 'txdb1':
                            page.statistic('QQ_txdb_' + name + '_1_zd');
                            break;
                        case 'txdb2':
                            page.statistic('QQ_txdb_' + name + '_2_zd');
                            break;
                        case 'txdb3':
                            page.statistic('QQ_txdb_' + name + '_3_zd');
                            break;
                        case 'txdb4':
                            page.statistic('QQ_txdb_' + name + '_4_zd');
                            break;
                        case 'txdb5':
                            page.statistic('QQ_txdb_' + name + '_5_zd');
                            break;
                        default:
                            page.statistic('QQ_tx_' + name + '_zd');
                            break;
                    }
                    break;
                }
            }
        },
        praise: function (e) {
            var it = ves(this);
            if (it.hasClass('praise') == false) {
                if (it.hasClass('done') == false) {
                    it.addClass('done');
                } else {
                    it.removeClass('done');
                }
                it = ves('.praise');
            }
            if (it.hasClass('done') == false) {
                it.addClass('done');
                var num = ves('.num', it);
                var count = parseInt(num.html()) + 1 + '';
                num.html(count);
                ves.setCookie('praise', count, {expires: 360});
            } else {
                it.removeClass('done');
                var num = ves('.num', it);
                var count = parseInt(num.html()) - 1 + '';
                num.html(count);
                ves.setCookie('praise', count, {expires: 360});
            }
        },
        icon_share_2: function (e) {
            ves(this).addClass('load');
        }
    };

    // ko.bind(viewModel);
    // ves.loaded(function(){
    // ves.ajax({url:'/templates/common/script/smt_tj.js',dataType:'script',success:function(){
    // setTimeout(page.statisticInit,2000);
    // }
    // });
    // });
    //随机生成8条点赞数
    var praizeList = ['姐輸過、但沒服過', '此女ゝ有毒！', 'Alexandr 嫁衣°', '海棉寳寳つ', '`凉兮', '黑夜之花• hangeghost', '时光静好', '咦，有个萌妹子', '潙沵變乖', 'Palma', '彼岸花开成海', '呐痛〆依然犹存', 'tfboys我的命', '一脸美人痣', '浅夏', 'Ta Shì Mìng', '素衣风尘叹', '心软脾气爆', 'roken凉城', '像风一样自由', '尐偏執', 'boarse', '阡上蝶舞', '陌上花开', '黛', 'Kris 教主范er', '毒舌但心软', '不懂我就不要说我变了', 'Lemon茶', 'cute100%', '若吥弃ˋ永相惜つ'];

    function makeRandomArr(arrList, num) {
        if (num > arrList.length) {
            return;
        }
        var tempArr = arrList.concat();
        var newArrList = [];
        for (var i = 0; i < num; i++) {
            var random = Math.floor(Math.random() * (tempArr.length - 1));
            var arr = tempArr[random];
            tempArr.splice(random, 1);
            newArrList.push(arr);
        }
        return newArrList;
    }

    function removeLastOne(str) {
        return str.substring(0, str.length - 1);
    }

    var new_arr = makeRandomArr(praizeList, 7);
    var str = '';
    for (var i = 0; i < new_arr.length; i++) {
        str += new_arr[i] + '、';
    }
    str = removeLastOne(str);
    ves('#praize_p').html(str);
    //根据系统时间设置发布与评论时间
    var oDate = new Date();
    var year = oDate.getFullYear(),
        month = format(oDate.getMonth() + 1),
        day = format(oDate.getDate());

    function format(str) {
        return str.toString().replace(/^(\d)$/, "0$1")
    }

    var time_ele = ves('.time');
    for (var i = 0; i < time_ele.length; i++) {
        ves('.time').eq(i).html(year + '年' + month + '月' + day + '日');
    }
    for (var i = 0; i < 2; i++) {
        for (var j = 1; j < 6; j++) {
            ves('.time' + j).eq(i).html(month + '月' + (day - (j - 1)) + '日');
        }
    }
    //添加气泡弹出框
    ves('.close').on('tap', function () {
        ves(this).parent().css('display', 'none');
    });
    if (ves('#title_mobile').length > 0) {
        document.title = ves('#title_mobile').html();
    }
    if (ves('#title_pc').length > 0) {
        document.title = ves('#title_pc').html();
    }
});
/**
 * Swiper 3.3.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/swiper/
 *
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: February 7, 2016
 */
!function () {
    "use strict";

    function e(e) {
        e.fn.swiper = function (a) {
            var r;
            return e(this).each(function () {
                var e = new t(this, a);
                r || (r = e)
            }), r
        }
    }

    var a, t = function (e, i) {
        function s(e) {
            return Math.floor(e)
        }

        function n() {
            b.autoplayTimeoutId = setTimeout(function () {
                b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? i.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b))
            }, b.params.autoplay)
        }

        function o(e, t) {
            var r = a(e.target);
            if (!r.is(t)) if ("string" == typeof t) r = r.parents(t); else if (t.nodeType) {
                var i;
                return r.parents().each(function (e, a) {
                    a === t && (i = t)
                }), i ? t : void 0
            }
            if (0 !== r.length) return r[0]
        }

        function l(e, a) {
            a = a || {};
            var t = window.MutationObserver || window.WebkitMutationObserver, r = new t(function (e) {
                e.forEach(function (e) {
                    b.onResize(!0), b.emit("onObserverUpdate", b, e)
                })
            });
            r.observe(e, {
                attributes: "undefined" == typeof a.attributes ? !0 : a.attributes,
                childList: "undefined" == typeof a.childList ? !0 : a.childList,
                characterData: "undefined" == typeof a.characterData ? !0 : a.characterData
            }), b.observers.push(r)
        }

        function p(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = e.keyCode || e.charCode;
            if (!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === a || !b.isHorizontal() && 40 === a)) return !1;
            if (!b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === a || !b.isHorizontal() && 38 === a)) return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === a || 39 === a || 38 === a || 40 === a) {
                    var t = !1;
                    if (b.container.parents(".swiper-slide").length > 0 && 0 === b.container.parents(".swiper-slide-active").length) return;
                    var r = {left: window.pageXOffset, top: window.pageYOffset}, i = window.innerWidth,
                        s = window.innerHeight, n = b.container.offset();
                    b.rtl && (n.left = n.left - b.container[0].scrollLeft);
                    for (var o = [[n.left, n.top], [n.left + b.width, n.top], [n.left, n.top + b.height], [n.left + b.width, n.top + b.height]], l = 0; l < o.length; l++) {
                        var p = o[l];
                        p[0] >= r.left && p[0] <= r.left + i && p[1] >= r.top && p[1] <= r.top + s && (t = !0)
                    }
                    if (!t) return
                }
                b.isHorizontal() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !b.rtl || 37 === a && b.rtl) && b.slideNext(), (37 === a && !b.rtl || 39 === a && b.rtl) && b.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && b.slideNext(), 38 === a && b.slidePrev())
            }
        }

        function d(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = b.mousewheel.event, t = 0, r = b.rtl ? -1 : 1;
            if ("mousewheel" === a) if (b.params.mousewheelForceToAxis) if (b.isHorizontal()) {
                if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
                t = e.wheelDeltaX * r
            } else {
                if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
                t = e.wheelDeltaY
            } else t = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * r : -e.wheelDeltaY; else if ("DOMMouseScroll" === a) t = -e.detail; else if ("wheel" === a) if (b.params.mousewheelForceToAxis) if (b.isHorizontal()) {
                if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
                t = -e.deltaX * r
            } else {
                if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
                t = -e.deltaY
            } else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * r : -e.deltaY;
            if (0 !== t) {
                if (b.params.mousewheelInvert && (t = -t), b.params.freeMode) {
                    var i = b.getWrapperTranslate() + t * b.params.mousewheelSensitivity, s = b.isBeginning,
                        n = b.isEnd;
                    if (i >= b.minTranslate() && (i = b.minTranslate()), i <= b.maxTranslate() && (i = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(i), b.updateProgress(), b.updateActiveIndex(), (!s && b.isBeginning || !n && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function () {
                            b.slideReset()
                        }, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), 0 === i || i === b.maxTranslate()) return
                } else {
                    if ((new window.Date).getTime() - b.mousewheel.lastScrollTime > 60) if (0 > t) if (b.isEnd && !b.params.loop || b.animating) {
                        if (b.params.mousewheelReleaseOnEdges) return !0
                    } else b.slideNext(); else if (b.isBeginning && !b.params.loop || b.animating) {
                        if (b.params.mousewheelReleaseOnEdges) return !0
                    } else b.slidePrev();
                    b.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return b.params.autoplay && b.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            }
        }

        function u(e, t) {
            e = a(e);
            var r, i, s, n = b.rtl ? -1 : 1;
            r = e.attr("data-swiper-parallax") || "0", i = e.attr("data-swiper-parallax-x"), s = e.attr("data-swiper-parallax-y"), i || s ? (i = i || "0", s = s || "0") : b.isHorizontal() ? (i = r, s = "0") : (s = r, i = "0"), i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t * n + "%" : i * t * n + "px", s = s.indexOf("%") >= 0 ? parseInt(s, 10) * t + "%" : s * t + "px", e.transform("translate3d(" + i + ", " + s + ",0px)")
        }

        function c(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
        }

        if (!(this instanceof t)) return new t(e, i);
        var m = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            coverflow: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0},
            flip: {slideShadows: !0, limitRotation: !0},
            cube: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94},
            fade: {crossFade: !1},
            parallax: !1,
            scrollbar: null,
            scrollbarHide: !0,
            scrollbarDraggable: !1,
            scrollbarSnapOnRelease: !1,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelReleaseOnEdges: !1,
            mousewheelInvert: !1,
            mousewheelForceToAxis: !1,
            mousewheelSensitivity: 1,
            hashnav: !1,
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            uniqueNavElements: !0,
            pagination: null,
            paginationElement: "span",
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: "bullets",
            resistance: !0,
            resistanceRatio: .85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            controlBy: "slide",
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slidePrevClass: "swiper-slide-prev",
            wrapperClass: "swiper-wrapper",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            buttonDisabledClass: "swiper-button-disabled",
            paginationCurrentClass: "swiper-pagination-current",
            paginationTotalClass: "swiper-pagination-total",
            paginationHiddenClass: "swiper-pagination-hidden",
            paginationProgressbarClass: "swiper-pagination-progressbar",
            observer: !1,
            observeParents: !1,
            a11y: !1,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            runCallbacksOnInit: !0
        }, h = i && i.virtualTranslate;
        i = i || {};
        var f = {};
        for (var g in i) if ("object" != typeof i[g] || null === i[g] || (i[g].nodeType || i[g] === window || i[g] === document || "undefined" != typeof r && i[g] instanceof r || "undefined" != typeof jQuery && i[g] instanceof jQuery)) f[g] = i[g]; else {
            f[g] = {};
            for (var v in i[g]) f[g][v] = i[g][v]
        }
        for (var w in m) if ("undefined" == typeof i[w]) i[w] = m[w]; else if ("object" == typeof i[w]) for (var y in m[w]) "undefined" == typeof i[w][y] && (i[w][y] = m[w][y]);
        var b = this;
        if (b.params = i, b.originalParams = f, b.classNames = [], "undefined" != typeof a && "undefined" != typeof r && (a = r), ("undefined" != typeof a || (a = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r)) && (b.$ = a, b.currentBreakpoint = void 0, b.getActiveBreakpoint = function () {
                if (!b.params.breakpoints) return !1;
                var e, a = !1, t = [];
                for (e in b.params.breakpoints) b.params.breakpoints.hasOwnProperty(e) && t.push(e);
                t.sort(function (e, a) {
                    return parseInt(e, 10) > parseInt(a, 10)
                });
                for (var r = 0; r < t.length; r++) e = t[r], e >= window.innerWidth && !a && (a = e);
                return a || "max"
            }, b.setBreakpoint = function () {
                var e = b.getActiveBreakpoint();
                if (e && b.currentBreakpoint !== e) {
                    var a = e in b.params.breakpoints ? b.params.breakpoints[e] : b.originalParams,
                        t = b.params.loop && a.slidesPerView !== b.params.slidesPerView;
                    for (var r in a) b.params[r] = a[r];
                    b.currentBreakpoint = e, t && b.destroyLoop && b.reLoop(!0)
                }
            }, b.params.breakpoints && b.setBreakpoint(), b.container = a(e), 0 !== b.container.length)) {
            if (b.container.length > 1) {
                var x = [];
                return b.container.each(function () {
                    x.push(new t(this, i))
                }), x
            }
            b.container[0].swiper = b, b.container.data("swiper", b), b.classNames.push("swiper-container-" + b.params.direction), b.params.freeMode && b.classNames.push("swiper-container-free-mode"), b.support.flexbox || (b.classNames.push("swiper-container-no-flexbox"), b.params.slidesPerColumn = 1), b.params.autoHeight && b.classNames.push("swiper-container-autoheight"), (b.params.parallax || b.params.watchSlidesVisibility) && (b.params.watchSlidesProgress = !0), ["cube", "coverflow", "flip"].indexOf(b.params.effect) >= 0 && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push("swiper-container-3d")) : b.params.effect = "slide"), "slide" !== b.params.effect && b.classNames.push("swiper-container-" + b.params.effect), "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween = 0, b.params.virtualTranslate = !0, b.params.setWrapperSize = !1), ("fade" === b.params.effect || "flip" === b.params.effect) && (b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, b.params.spaceBetween = 0, b.params.setWrapperSize = !1, "undefined" == typeof h && (b.params.virtualTranslate = !0)), b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1), b.wrapper = b.container.children("." + b.params.wrapperClass), b.params.pagination && (b.paginationContainer = a(b.params.pagination), b.params.uniqueNavElements && "string" == typeof b.params.pagination && b.paginationContainer.length > 1 && 1 === b.container.find(b.params.pagination).length && (b.paginationContainer = b.container.find(b.params.pagination)), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass("swiper-pagination-clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass("swiper-pagination-" + b.params.paginationType)), (b.params.nextButton || b.params.prevButton) && (b.params.nextButton && (b.nextButton = a(b.params.nextButton), b.params.uniqueNavElements && "string" == typeof b.params.nextButton && b.nextButton.length > 1 && 1 === b.container.find(b.params.nextButton).length && (b.nextButton = b.container.find(b.params.nextButton))), b.params.prevButton && (b.prevButton = a(b.params.prevButton), b.params.uniqueNavElements && "string" == typeof b.params.prevButton && b.prevButton.length > 1 && 1 === b.container.find(b.params.prevButton).length && (b.prevButton = b.container.find(b.params.prevButton)))), b.isHorizontal = function () {
                return "horizontal" === b.params.direction
            }, b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction")), b.rtl && b.classNames.push("swiper-container-rtl"), b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display")), b.params.slidesPerColumn > 1 && b.classNames.push("swiper-container-multirow"), b.device.android && b.classNames.push("swiper-container-android"), b.container.addClass(b.classNames.join(" ")), b.translate = 0, b.progress = 0, b.velocity = 0, b.lockSwipeToNext = function () {
                b.params.allowSwipeToNext = !1
            }, b.lockSwipeToPrev = function () {
                b.params.allowSwipeToPrev = !1
            }, b.lockSwipes = function () {
                b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1
            }, b.unlockSwipeToNext = function () {
                b.params.allowSwipeToNext = !0
            }, b.unlockSwipeToPrev = function () {
                b.params.allowSwipeToPrev = !0
            }, b.unlockSwipes = function () {
                b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0
            }, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab"), b.imagesToLoad = [], b.imagesLoaded = 0, b.loadImage = function (e, a, t, r, i) {
                function s() {
                    i && i()
                }

                var n;
                e.complete && r ? s() : a ? (n = new window.Image, n.onload = s, n.onerror = s, t && (n.srcset = t), a && (n.src = a)) : s()
            }, b.preloadImages = function () {
                function e() {
                    "undefined" != typeof b && null !== b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)))
                }

                b.imagesToLoad = b.container.find("img");
                for (var a = 0; a < b.imagesToLoad.length; a++) b.loadImage(b.imagesToLoad[a], b.imagesToLoad[a].currentSrc || b.imagesToLoad[a].getAttribute("src"), b.imagesToLoad[a].srcset || b.imagesToLoad[a].getAttribute("srcset"), !0, e)
            }, b.autoplayTimeoutId = void 0, b.autoplaying = !1, b.autoplayPaused = !1, b.startAutoplay = function () {
                return "undefined" != typeof b.autoplayTimeoutId ? !1 : b.params.autoplay ? b.autoplaying ? !1 : (b.autoplaying = !0, b.emit("onAutoplayStart", b), void n()) : !1
            }, b.stopAutoplay = function (e) {
                b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId = void 0, b.emit("onAutoplayStop", b))
            }, b.pauseAutoplay = function (e) {
                b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === e ? (b.autoplayPaused = !1, n()) : b.wrapper.transitionEnd(function () {
                    b && (b.autoplayPaused = !1, b.autoplaying ? n() : b.stopAutoplay())
                }))
            }, b.minTranslate = function () {
                return -b.snapGrid[0]
            }, b.maxTranslate = function () {
                return -b.snapGrid[b.snapGrid.length - 1]
            }, b.updateAutoHeight = function () {
                var e = b.slides.eq(b.activeIndex)[0];
                if ("undefined" != typeof e) {
                    var a = e.offsetHeight;
                    a && b.wrapper.css("height", a + "px")
                }
            }, b.updateContainerSize = function () {
                var e, a;
                e = "undefined" != typeof b.params.width ? b.params.width : b.container[0].clientWidth, a = "undefined" != typeof b.params.height ? b.params.height : b.container[0].clientHeight, 0 === e && b.isHorizontal() || 0 === a && !b.isHorizontal() || (e = e - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), a = a - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = e, b.height = a, b.size = b.isHorizontal() ? b.width : b.height)
            }, b.updateSlidesSize = function () {
                b.slides = b.wrapper.children("." + b.params.slideClass), b.snapGrid = [], b.slidesGrid = [], b.slidesSizesGrid = [];
                var e, a = b.params.spaceBetween, t = -b.params.slidesOffsetBefore, r = 0, i = 0;
                if ("undefined" != typeof b.size) {
                    "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * b.size), b.virtualSize = -a, b.rtl ? b.slides.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : b.slides.css({marginRight: "", marginBottom: ""});
                    var n;
                    b.params.slidesPerColumn > 1 && (n = Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn, "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (n = Math.max(n, b.params.slidesPerView * b.params.slidesPerColumn)));
                    var o, l = b.params.slidesPerColumn, p = n / l,
                        d = p - (b.params.slidesPerColumn * p - b.slides.length);
                    for (e = 0; e < b.slides.length; e++) {
                        o = 0;
                        var u = b.slides.eq(e);
                        if (b.params.slidesPerColumn > 1) {
                            var c, m, h;
                            "column" === b.params.slidesPerColumnFill ? (m = Math.floor(e / l), h = e - m * l, (m > d || m === d && h === l - 1) && ++h >= l && (h = 0, m++), c = m + h * n / l, u.css({
                                "-webkit-box-ordinal-group": c,
                                "-moz-box-ordinal-group": c,
                                "-ms-flex-order": c,
                                "-webkit-order": c,
                                order: c
                            })) : (h = Math.floor(e / p), m = e - h * p), u.css({"margin-top": 0 !== h && b.params.spaceBetween && b.params.spaceBetween + "px"}).attr("data-swiper-column", m).attr("data-swiper-row", h)
                        }
                        "none" !== u.css("display") && ("auto" === b.params.slidesPerView ? (o = b.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), b.params.roundLengths && (o = s(o))) : (o = (b.size - (b.params.slidesPerView - 1) * a) / b.params.slidesPerView, b.params.roundLengths && (o = s(o)), b.isHorizontal() ? b.slides[e].style.width = o + "px" : b.slides[e].style.height = o + "px"), b.slides[e].swiperSlideSize = o, b.slidesSizesGrid.push(o), b.params.centeredSlides ? (t = t + o / 2 + r / 2 + a, 0 === e && (t = t - b.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t)) : (i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t), t = t + o + a), b.virtualSize += o + a, r = o, i++)
                    }
                    b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter;
                    var f;
                    if (b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({width: b.virtualSize + b.params.spaceBetween + "px"}), (!b.support.flexbox || b.params.setWrapperSize) && (b.isHorizontal() ? b.wrapper.css({width: b.virtualSize + b.params.spaceBetween + "px"}) : b.wrapper.css({height: b.virtualSize + b.params.spaceBetween + "px"})), b.params.slidesPerColumn > 1 && (b.virtualSize = (o + b.params.spaceBetween) * n, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.wrapper.css({width: b.virtualSize + b.params.spaceBetween + "px"}), b.params.centeredSlides)) {
                        for (f = [], e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && f.push(b.snapGrid[e]);
                        b.snapGrid = f
                    }
                    if (!b.params.centeredSlides) {
                        for (f = [], e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] <= b.virtualSize - b.size && f.push(b.snapGrid[e]);
                        b.snapGrid = f, Math.floor(b.virtualSize - b.size) - Math.floor(b.snapGrid[b.snapGrid.length - 1]) > 1 && b.snapGrid.push(b.virtualSize - b.size)
                    }
                    0 === b.snapGrid.length && (b.snapGrid = [0]), 0 !== b.params.spaceBetween && (b.isHorizontal() ? b.rtl ? b.slides.css({marginLeft: a + "px"}) : b.slides.css({marginRight: a + "px"}) : b.slides.css({marginBottom: a + "px"})), b.params.watchSlidesProgress && b.updateSlidesOffset()
                }
            }, b.updateSlidesOffset = function () {
                for (var e = 0; e < b.slides.length; e++) b.slides[e].swiperSlideOffset = b.isHorizontal() ? b.slides[e].offsetLeft : b.slides[e].offsetTop
            }, b.updateSlidesProgress = function (e) {
                if ("undefined" == typeof e && (e = b.translate || 0), 0 !== b.slides.length) {
                    "undefined" == typeof b.slides[0].swiperSlideOffset && b.updateSlidesOffset();
                    var a = -e;
                    b.rtl && (a = e), b.slides.removeClass(b.params.slideVisibleClass);
                    for (var t = 0; t < b.slides.length; t++) {
                        var r = b.slides[t],
                            i = (a - r.swiperSlideOffset) / (r.swiperSlideSize + b.params.spaceBetween);
                        if (b.params.watchSlidesVisibility) {
                            var s = -(a - r.swiperSlideOffset), n = s + b.slidesSizesGrid[t],
                                o = s >= 0 && s < b.size || n > 0 && n <= b.size || 0 >= s && n >= b.size;
                            o && b.slides.eq(t).addClass(b.params.slideVisibleClass)
                        }
                        r.progress = b.rtl ? -i : i
                    }
                }
            }, b.updateProgress = function (e) {
                "undefined" == typeof e && (e = b.translate || 0);
                var a = b.maxTranslate() - b.minTranslate(), t = b.isBeginning, r = b.isEnd;
                0 === a ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (e - b.minTranslate()) / a, b.isBeginning = b.progress <= 0, b.isEnd = b.progress >= 1), b.isBeginning && !t && b.emit("onReachBeginning", b), b.isEnd && !r && b.emit("onReachEnd", b), b.params.watchSlidesProgress && b.updateSlidesProgress(e), b.emit("onProgress", b, b.progress)
            }, b.updateActiveIndex = function () {
                var e, a, t, r = b.rtl ? b.translate : -b.translate;
                for (a = 0; a < b.slidesGrid.length; a++) "undefined" != typeof b.slidesGrid[a + 1] ? r >= b.slidesGrid[a] && r < b.slidesGrid[a + 1] - (b.slidesGrid[a + 1] - b.slidesGrid[a]) / 2 ? e = a : r >= b.slidesGrid[a] && r < b.slidesGrid[a + 1] && (e = a + 1) : r >= b.slidesGrid[a] && (e = a);
                (0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / b.params.slidesPerGroup), t >= b.snapGrid.length && (t = b.snapGrid.length - 1), e !== b.activeIndex && (b.snapIndex = t, b.previousIndex = b.activeIndex, b.activeIndex = e, b.updateClasses())
            }, b.updateClasses = function () {
                b.slides.removeClass(b.params.slideActiveClass + " " + b.params.slideNextClass + " " + b.params.slidePrevClass);
                var e = b.slides.eq(b.activeIndex);
                e.addClass(b.params.slideActiveClass);
                var t = e.next("." + b.params.slideClass).addClass(b.params.slideNextClass);
                b.params.loop && 0 === t.length && b.slides.eq(0).addClass(b.params.slideNextClass);
                var r = e.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass);
                if (b.params.loop && 0 === r.length && b.slides.eq(-1).addClass(b.params.slidePrevClass), b.paginationContainer && b.paginationContainer.length > 0) {
                    var i,
                        s = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;
                    if (b.params.loop ? (i = Math.ceil((b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup), i > b.slides.length - 1 - 2 * b.loopedSlides && (i -= b.slides.length - 2 * b.loopedSlides), i > s - 1 && (i -= s), 0 > i && "bullets" !== b.params.paginationType && (i = s + i)) : i = "undefined" != typeof b.snapIndex ? b.snapIndex : b.activeIndex || 0, "bullets" === b.params.paginationType && b.bullets && b.bullets.length > 0 && (b.bullets.removeClass(b.params.bulletActiveClass), b.paginationContainer.length > 1 ? b.bullets.each(function () {
                            a(this).index() === i && a(this).addClass(b.params.bulletActiveClass)
                        }) : b.bullets.eq(i).addClass(b.params.bulletActiveClass)), "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(i + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(s)), "progress" === b.params.paginationType) {
                        var n = (i + 1) / s, o = n, l = 1;
                        b.isHorizontal() || (l = n, o = 1), b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + o + ") scaleY(" + l + ")").transition(b.params.speed)
                    }
                    "custom" === b.params.paginationType && b.params.paginationCustomRender && (b.paginationContainer.html(b.params.paginationCustomRender(b, i + 1, s)), b.emit("onPaginationRendered", b, b.paginationContainer[0]))
                }
                b.params.loop || (b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.isBeginning ? (b.prevButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.prevButton)) : (b.prevButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.prevButton))), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.isEnd ? (b.nextButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.nextButton)) : (b.nextButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.nextButton))))
            }, b.updatePagination = function () {
                if (b.params.pagination && b.paginationContainer && b.paginationContainer.length > 0) {
                    var e = "";
                    if ("bullets" === b.params.paginationType) {
                        for (var a = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length, t = 0; a > t; t++) e += b.params.paginationBulletRender ? b.params.paginationBulletRender(t, b.params.bulletClass) : "<" + b.params.paginationElement + ' class="' + b.params.bulletClass + '"></' + b.params.paginationElement + ">";
                        b.paginationContainer.html(e), b.bullets = b.paginationContainer.find("." + b.params.bulletClass), b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination()
                    }
                    "fraction" === b.params.paginationType && (e = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '<span class="' + b.params.paginationCurrentClass + '"></span> / <span class="' + b.params.paginationTotalClass + '"></span>', b.paginationContainer.html(e)), "progress" === b.params.paginationType && (e = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '<span class="' + b.params.paginationProgressbarClass + '"></span>', b.paginationContainer.html(e)), "custom" !== b.params.paginationType && b.emit("onPaginationRendered", b, b.paginationContainer[0])
                }
            }, b.update = function (e) {
                function a() {
                    r = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate()), b.setWrapperTranslate(r), b.updateActiveIndex(), b.updateClasses()
                }

                if (b.updateContainerSize(), b.updateSlidesSize(), b.updateProgress(), b.updatePagination(), b.updateClasses(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), e) {
                    var t, r;
                    b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode ? (a(), b.params.autoHeight && b.updateAutoHeight()) : (t = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0), t || a())
                } else b.params.autoHeight && b.updateAutoHeight()
            }, b.onResize = function (e) {
                b.params.breakpoints && b.setBreakpoint();
                var a = b.params.allowSwipeToPrev, t = b.params.allowSwipeToNext;
                b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0, b.updateContainerSize(), b.updateSlidesSize(), ("auto" === b.params.slidesPerView || b.params.freeMode || e) && b.updatePagination(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), b.controller && b.controller.spline && (b.controller.spline = void 0);
                var r = !1;
                if (b.params.freeMode) {
                    var i = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());
                    b.setWrapperTranslate(i), b.updateActiveIndex(), b.updateClasses(), b.params.autoHeight && b.updateAutoHeight()
                } else b.updateClasses(), r = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);
                b.params.lazyLoading && !r && b.lazy && b.lazy.load(), b.params.allowSwipeToPrev = a, b.params.allowSwipeToNext = t
            };
            var T = ["mousedown", "mousemove", "mouseup"];
            window.navigator.pointerEnabled ? T = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (T = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), b.touchEvents = {
                start: b.support.touch || !b.params.simulateTouch ? "touchstart" : T[0],
                move: b.support.touch || !b.params.simulateTouch ? "touchmove" : T[1],
                end: b.support.touch || !b.params.simulateTouch ? "touchend" : T[2]
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction), b.initEvents = function (e) {
                var a = e ? "off" : "on", t = e ? "removeEventListener" : "addEventListener",
                    r = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
                    s = b.support.touch ? r : document, n = b.params.nested ? !0 : !1;
                b.browser.ie ? (r[t](b.touchEvents.start, b.onTouchStart, !1), s[t](b.touchEvents.move, b.onTouchMove, n), s[t](b.touchEvents.end, b.onTouchEnd, !1)) : (b.support.touch && (r[t](b.touchEvents.start, b.onTouchStart, !1), r[t](b.touchEvents.move, b.onTouchMove, n), r[t](b.touchEvents.end, b.onTouchEnd, !1)), !i.simulateTouch || b.device.ios || b.device.android || (r[t]("mousedown", b.onTouchStart, !1), document[t]("mousemove", b.onTouchMove, n), document[t]("mouseup", b.onTouchEnd, !1))), window[t]("resize", b.onResize), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.nextButton[a]("click", b.onClickNext), b.params.a11y && b.a11y && b.nextButton[a]("keydown", b.a11y.onEnterKey)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.prevButton[a]("click", b.onClickPrev), b.params.a11y && b.a11y && b.prevButton[a]("keydown", b.a11y.onEnterKey)), b.params.pagination && b.params.paginationClickable && (b.paginationContainer[a]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y && b.paginationContainer[a]("keydown", "." + b.params.bulletClass, b.a11y.onEnterKey)), (b.params.preventClicks || b.params.preventClicksPropagation) && r[t]("click", b.preventClicks, !0)
            }, b.attachEvents = function () {
                b.initEvents()
            }, b.detachEvents = function () {
                b.initEvents(!0)
            }, b.allowClick = !0, b.preventClicks = function (e) {
                b.allowClick || (b.params.preventClicks && e.preventDefault(), b.params.preventClicksPropagation && b.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }, b.onClickNext = function (e) {
                e.preventDefault(), (!b.isEnd || b.params.loop) && b.slideNext()
            }, b.onClickPrev = function (e) {
                e.preventDefault(), (!b.isBeginning || b.params.loop) && b.slidePrev()
            }, b.onClickIndex = function (e) {
                e.preventDefault();
                var t = a(this).index() * b.params.slidesPerGroup;
                b.params.loop && (t += b.loopedSlides), b.slideTo(t)
            }, b.updateClickedSlide = function (e) {
                var t = o(e, "." + b.params.slideClass), r = !1;
                if (t) for (var i = 0; i < b.slides.length; i++) b.slides[i] === t && (r = !0);
                if (!t || !r) return b.clickedSlide = void 0, void(b.clickedIndex = void 0);
                if (b.clickedSlide = t, b.clickedIndex = a(t).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
                    var s, n = b.clickedIndex;
                    if (b.params.loop) {
                        if (b.animating) return;
                        s = a(b.clickedSlide).attr("data-swiper-slide-index"), b.params.centeredSlides ? n < b.loopedSlides - b.params.slidesPerView / 2 || n > b.slides.length - b.loopedSlides + b.params.slidesPerView / 2 ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                            b.slideTo(n)
                        }, 0)) : b.slideTo(n) : n > b.slides.length - b.params.slidesPerView ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                            b.slideTo(n)
                        }, 0)) : b.slideTo(n)
                    } else b.slideTo(n)
                }
            };
            var S, C, z, M, E, P, k, I, L, B, D = "input, select, textarea, button", H = Date.now(), A = [];
            b.animating = !1, b.touches = {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0};
            var G, O;
            if (b.onTouchStart = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), G = "touchstart" === e.type, G || !("which" in e) || 3 !== e.which) {
                        if (b.params.noSwiping && o(e, "." + b.params.noSwipingClass)) return void(b.allowClick = !0);
                        if (!b.params.swipeHandler || o(e, b.params.swipeHandler)) {
                            var t = b.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                                r = b.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                            if (!(b.device.ios && b.params.iOSEdgeSwipeDetection && t <= b.params.iOSEdgeSwipeThreshold)) {
                                if (S = !0, C = !1, z = !0, E = void 0, O = void 0, b.touches.startX = t, b.touches.startY = r, M = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, b.params.threshold > 0 && (I = !1), "touchstart" !== e.type) {
                                    var i = !0;
                                    a(e.target).is(D) && (i = !1), document.activeElement && a(document.activeElement).is(D) && document.activeElement.blur(), i && e.preventDefault()
                                }
                                b.emit("onTouchStart", b, e)
                            }
                        }
                    }
                }, b.onTouchMove = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), !G || "mousemove" !== e.type) {
                        if (e.preventedByNestedSwiper) return b.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void(b.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
                        if (b.params.onlyExternal) return b.allowClick = !1, void(S && (b.touches.startX = b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.startY = b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, M = Date.now()));
                        if (G && document.activeElement && e.target === document.activeElement && a(e.target).is(D)) return C = !0, void(b.allowClick = !1);
                        if (z && b.emit("onTouchMove", b, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                            if (b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof E) {
                                var t = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI;
                                E = b.isHorizontal() ? t > b.params.touchAngle : 90 - t > b.params.touchAngle
                            }
                            if (E && b.emit("onTouchMoveOpposite", b, e), "undefined" == typeof O && b.browser.ieTouch && (b.touches.currentX !== b.touches.startX || b.touches.currentY !== b.touches.startY) && (O = !0), S) {
                                if (E) return void(S = !1);
                                if (O || !b.browser.ieTouch) {
                                    b.allowClick = !1, b.emit("onSliderMove", b, e), e.preventDefault(), b.params.touchMoveStopPropagation && !b.params.nested && e.stopPropagation(), C || (i.loop && b.fixLoop(), k = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), B = !1, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grabbing", b.container[0].style.cursor = "-moz-grabbin", b.container[0].style.cursor = "grabbing")), C = !0;
                                    var r = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;
                                    r *= b.params.touchRatio, b.rtl && (r = -r), b.swipeDirection = r > 0 ? "prev" : "next", P = r + k;
                                    var s = !0;
                                    if (r > 0 && P > b.minTranslate() ? (s = !1, b.params.resistance && (P = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + k + r, b.params.resistanceRatio))) : 0 > r && P < b.maxTranslate() && (s = !1, b.params.resistance && (P = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() - k - r, b.params.resistanceRatio))),
                                        s && (e.preventedByNestedSwiper = !0), !b.params.allowSwipeToNext && "next" === b.swipeDirection && k > P && (P = k), !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && P > k && (P = k), b.params.followFinger) {
                                        if (b.params.threshold > 0) {
                                            if (!(Math.abs(r) > b.params.threshold || I)) return void(P = k);
                                            if (!I) return I = !0, b.touches.startX = b.touches.currentX, b.touches.startY = b.touches.currentY, P = k, void(b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY)
                                        }
                                        (b.params.freeMode || b.params.watchSlidesProgress) && b.updateActiveIndex(), b.params.freeMode && (0 === A.length && A.push({
                                            position: b.touches[b.isHorizontal() ? "startX" : "startY"],
                                            time: M
                                        }), A.push({
                                            position: b.touches[b.isHorizontal() ? "currentX" : "currentY"],
                                            time: (new window.Date).getTime()
                                        })), b.updateProgress(P), b.setWrapperTranslate(P)
                                    }
                                }
                            }
                        }
                    }
                }, b.onTouchEnd = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), z && b.emit("onTouchEnd", b, e), z = !1, S) {
                        b.params.grabCursor && C && S && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab");
                        var t = Date.now(), r = t - M;
                        if (b.allowClick && (b.updateClickedSlide(e), b.emit("onTap", b, e), 300 > r && t - H > 300 && (L && clearTimeout(L), L = setTimeout(function () {
                                b && (b.params.paginationHide && b.paginationContainer.length > 0 && !a(e.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, e))
                            }, 300)), 300 > r && 300 > t - H && (L && clearTimeout(L), b.emit("onDoubleTap", b, e))), H = Date.now(), setTimeout(function () {
                                b && (b.allowClick = !0)
                            }, 0), !S || !C || !b.swipeDirection || 0 === b.touches.diff || P === k) return void(S = C = !1);
                        S = C = !1;
                        var i;
                        if (i = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -P, b.params.freeMode) {
                            if (i < -b.minTranslate()) return void b.slideTo(b.activeIndex);
                            if (i > -b.maxTranslate()) return void(b.slides.length < b.snapGrid.length ? b.slideTo(b.snapGrid.length - 1) : b.slideTo(b.slides.length - 1));
                            if (b.params.freeModeMomentum) {
                                if (A.length > 1) {
                                    var s = A.pop(), n = A.pop(), o = s.position - n.position, l = s.time - n.time;
                                    b.velocity = o / l, b.velocity = b.velocity / 2, Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0), (l > 150 || (new window.Date).getTime() - s.time > 300) && (b.velocity = 0)
                                } else b.velocity = 0;
                                A.length = 0;
                                var p = 1e3 * b.params.freeModeMomentumRatio, d = b.velocity * p, u = b.translate + d;
                                b.rtl && (u = -u);
                                var c, m = !1, h = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;
                                if (u < b.maxTranslate()) b.params.freeModeMomentumBounce ? (u + b.maxTranslate() < -h && (u = b.maxTranslate() - h), c = b.maxTranslate(), m = !0, B = !0) : u = b.maxTranslate(); else if (u > b.minTranslate()) b.params.freeModeMomentumBounce ? (u - b.minTranslate() > h && (u = b.minTranslate() + h), c = b.minTranslate(), m = !0, B = !0) : u = b.minTranslate(); else if (b.params.freeModeSticky) {
                                    var f, g = 0;
                                    for (g = 0; g < b.snapGrid.length; g += 1) if (b.snapGrid[g] > -u) {
                                        f = g;
                                        break
                                    }
                                    u = Math.abs(b.snapGrid[f] - u) < Math.abs(b.snapGrid[f - 1] - u) || "next" === b.swipeDirection ? b.snapGrid[f] : b.snapGrid[f - 1], b.rtl || (u = -u)
                                }
                                if (0 !== b.velocity) p = b.rtl ? Math.abs((-u - b.translate) / b.velocity) : Math.abs((u - b.translate) / b.velocity); else if (b.params.freeModeSticky) return void b.slideReset();
                                b.params.freeModeMomentumBounce && m ? (b.updateProgress(c), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function () {
                                    b && B && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(c), b.wrapper.transitionEnd(function () {
                                        b && b.onTransitionEnd()
                                    }))
                                })) : b.velocity ? (b.updateProgress(u), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
                                    b && b.onTransitionEnd()
                                }))) : b.updateProgress(u), b.updateActiveIndex()
                            }
                            return void((!b.params.freeModeMomentum || r >= b.params.longSwipesMs) && (b.updateProgress(), b.updateActiveIndex()))
                        }
                        var v, w = 0, y = b.slidesSizesGrid[0];
                        for (v = 0; v < b.slidesGrid.length; v += b.params.slidesPerGroup) "undefined" != typeof b.slidesGrid[v + b.params.slidesPerGroup] ? i >= b.slidesGrid[v] && i < b.slidesGrid[v + b.params.slidesPerGroup] && (w = v, y = b.slidesGrid[v + b.params.slidesPerGroup] - b.slidesGrid[v]) : i >= b.slidesGrid[v] && (w = v, y = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length - 2]);
                        var x = (i - b.slidesGrid[w]) / y;
                        if (r > b.params.longSwipesMs) {
                            if (!b.params.longSwipes) return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && (x >= b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w)), "prev" === b.swipeDirection && (x > 1 - b.params.longSwipesRatio ? b.slideTo(w + b.params.slidesPerGroup) : b.slideTo(w))
                        } else {
                            if (!b.params.shortSwipes) return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && b.slideTo(w + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(w)
                        }
                    }
                }, b._slideTo = function (e, a) {
                    return b.slideTo(e, a, !0, !0)
                }, b.slideTo = function (e, a, t, r) {
                    "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), b.snapIndex = Math.floor(e / b.params.slidesPerGroup), b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);
                    var i = -b.snapGrid[b.snapIndex];
                    b.params.autoplay && b.autoplaying && (r || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(a) : b.stopAutoplay()), b.updateProgress(i);
                    for (var s = 0; s < b.slidesGrid.length; s++) -Math.floor(100 * i) >= Math.floor(100 * b.slidesGrid[s]) && (e = s);
                    return !b.params.allowSwipeToNext && i < b.translate && i < b.minTranslate() ? !1 : !b.params.allowSwipeToPrev && i > b.translate && i > b.maxTranslate() && (b.activeIndex || 0) !== e ? !1 : ("undefined" == typeof a && (a = b.params.speed), b.previousIndex = b.activeIndex || 0, b.activeIndex = e, b.rtl && -i === b.translate || !b.rtl && i === b.translate ? (b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(i), !1) : (b.updateClasses(), b.onTransitionStart(t), 0 === a ? (b.setWrapperTranslate(i), b.setWrapperTransition(0), b.onTransitionEnd(t)) : (b.setWrapperTranslate(i), b.setWrapperTransition(a), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
                        b && b.onTransitionEnd(t)
                    }))), !0))
                }, b.onTransitionStart = function (e) {
                    "undefined" == typeof e && (e = !0), b.params.autoHeight && b.updateAutoHeight(), b.lazy && b.lazy.onTransitionStart(), e && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart", b) : b.emit("onSlidePrevStart", b)))
                }, b.onTransitionEnd = function (e) {
                    b.animating = !1, b.setWrapperTransition(0), "undefined" == typeof e && (e = !0), b.lazy && b.lazy.onTransitionEnd(), e && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b))), b.params.hashnav && b.hashnav && b.hashnav.setHash()
                }, b.slideNext = function (e, a, t) {
                    if (b.params.loop) {
                        if (b.animating) return !1;
                        b.fixLoop();
                        b.container[0].clientLeft;
                        return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t)
                    }
                    return b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t)
                }, b._slideNext = function (e) {
                    return b.slideNext(!0, e, !0)
                }, b.slidePrev = function (e, a, t) {
                    if (b.params.loop) {
                        if (b.animating) return !1;
                        b.fixLoop();
                        b.container[0].clientLeft;
                        return b.slideTo(b.activeIndex - 1, a, e, t)
                    }
                    return b.slideTo(b.activeIndex - 1, a, e, t)
                }, b._slidePrev = function (e) {
                    return b.slidePrev(!0, e, !0)
                }, b.slideReset = function (e, a, t) {
                    return b.slideTo(b.activeIndex, a, e)
                }, b.setWrapperTransition = function (e, a) {
                    b.wrapper.transition(e), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(e), b.params.parallax && b.parallax && b.parallax.setTransition(e), b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(e), b.params.control && b.controller && b.controller.setTransition(e, a), b.emit("onSetTransition", b, e)
                }, b.setWrapperTranslate = function (e, a, t) {
                    var r = 0, i = 0, n = 0;
                    b.isHorizontal() ? r = b.rtl ? -e : e : i = e, b.params.roundLengths && (r = s(r), i = s(i)), b.params.virtualTranslate || (b.support.transforms3d ? b.wrapper.transform("translate3d(" + r + "px, " + i + "px, " + n + "px)") : b.wrapper.transform("translate(" + r + "px, " + i + "px)")), b.translate = b.isHorizontal() ? r : i;
                    var o, l = b.maxTranslate() - b.minTranslate();
                    o = 0 === l ? 0 : (e - b.minTranslate()) / l, o !== b.progress && b.updateProgress(e), a && b.updateActiveIndex(), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate), b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate), b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate), b.params.control && b.controller && b.controller.setTranslate(b.translate, t), b.emit("onSetTranslate", b, b.translate)
                }, b.getTranslate = function (e, a) {
                    var t, r, i, s;
                    return "undefined" == typeof a && (a = "x"), b.params.virtualTranslate ? b.rtl ? -b.translate : b.translate : (i = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (r = i.transform || i.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map(function (e) {
                        return e.replace(",", ".")
                    }).join(", ")), s = new window.WebKitCSSMatrix("none" === r ? "" : r)) : (s = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = s.toString().split(",")), "x" === a && (r = window.WebKitCSSMatrix ? s.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (r = window.WebKitCSSMatrix ? s.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), b.rtl && r && (r = -r), r || 0)
                }, b.getWrapperTranslate = function (e) {
                    return "undefined" == typeof e && (e = b.isHorizontal() ? "x" : "y"), b.getTranslate(b.wrapper[0], e)
                }, b.observers = [], b.initObservers = function () {
                    if (b.params.observeParents) for (var e = b.container.parents(), a = 0; a < e.length; a++) l(e[a]);
                    l(b.container[0], {childList: !1}), l(b.wrapper[0], {attributes: !1})
                }, b.disconnectObservers = function () {
                    for (var e = 0; e < b.observers.length; e++) b.observers[e].disconnect();
                    b.observers = []
                }, b.createLoop = function () {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();
                    var e = b.wrapper.children("." + b.params.slideClass);
                    "auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = e.length), b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10), b.loopedSlides = b.loopedSlides + b.params.loopAdditionalSlides, b.loopedSlides > e.length && (b.loopedSlides = e.length);
                    var t, r = [], i = [];
                    for (e.each(function (t, s) {
                        var n = a(this);
                        t < b.loopedSlides && i.push(s), t < e.length && t >= e.length - b.loopedSlides && r.push(s), n.attr("data-swiper-slide-index", t)
                    }), t = 0; t < i.length; t++) b.wrapper.append(a(i[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
                    for (t = r.length - 1; t >= 0; t--) b.wrapper.prepend(a(r[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass))
                }, b.destroyLoop = function () {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove(), b.slides.removeAttr("data-swiper-slide-index")
                }, b.reLoop = function (e) {
                    var a = b.activeIndex - b.loopedSlides;
                    b.destroyLoop(), b.createLoop(), b.updateSlidesSize(), e && b.slideTo(a + b.loopedSlides, 0, !1)
                }, b.fixLoop = function () {
                    var e;
                    b.activeIndex < b.loopedSlides ? (e = b.slides.length - 3 * b.loopedSlides + b.activeIndex, e += b.loopedSlides, b.slideTo(e, 0, !1, !0)) : ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * b.params.slidesPerView) && (e = -b.slides.length + b.activeIndex + b.loopedSlides, e += b.loopedSlides, b.slideTo(e, 0, !1, !0))
                }, b.appendSlide = function (e) {
                    if (b.params.loop && b.destroyLoop(), "object" == typeof e && e.length) for (var a = 0; a < e.length; a++) e[a] && b.wrapper.append(e[a]); else b.wrapper.append(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0)
                }, b.prependSlide = function (e) {
                    b.params.loop && b.destroyLoop();
                    var a = b.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var t = 0; t < e.length; t++) e[t] && b.wrapper.prepend(e[t]);
                        a = b.activeIndex + e.length
                    } else b.wrapper.prepend(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.slideTo(a, 0, !1)
                }, b.removeSlide = function (e) {
                    b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));
                    var a, t = b.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var r = 0; r < e.length; r++) a = e[r], b.slides[a] && b.slides.eq(a).remove(), t > a && t--;
                        t = Math.max(t, 0)
                    } else a = e, b.slides[a] && b.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.params.loop ? b.slideTo(t + b.loopedSlides, 0, !1) : b.slideTo(t, 0, !1)
                }, b.removeAllSlides = function () {
                    for (var e = [], a = 0; a < b.slides.length; a++) e.push(a);
                    b.removeSlide(e)
                }, b.effects = {
                    fade: {
                        setTranslate: function () {
                            for (var e = 0; e < b.slides.length; e++) {
                                var a = b.slides.eq(e), t = a[0].swiperSlideOffset, r = -t;
                                b.params.virtualTranslate || (r -= b.translate);
                                var i = 0;
                                b.isHorizontal() || (i = r, r = 0);
                                var s = b.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                                a.css({opacity: s}).transform("translate3d(" + r + "px, " + i + "px, 0px)")
                            }
                        }, setTransition: function (e) {
                            if (b.slides.transition(e), b.params.virtualTranslate && 0 !== e) {
                                var a = !1;
                                b.slides.transitionEnd(function () {
                                    if (!a && b) {
                                        a = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) b.wrapper.trigger(e[t])
                                    }
                                })
                            }
                        }
                    }, flip: {
                        setTranslate: function () {
                            for (var e = 0; e < b.slides.length; e++) {
                                var t = b.slides.eq(e), r = t[0].progress;
                                b.params.flip.limitRotation && (r = Math.max(Math.min(t[0].progress, 1), -1));
                                var i = t[0].swiperSlideOffset, s = -180 * r, n = s, o = 0, l = -i, p = 0;
                                if (b.isHorizontal() ? b.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(r)) + b.slides.length, b.params.flip.slideShadows) {
                                    var d = b.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                                        u = b.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                                    0 === d.length && (d = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === u.length && (u = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(u)), d.length && (d[0].style.opacity = Math.max(-r, 0)), u.length && (u[0].style.opacity = Math.max(r, 0))
                                }
                                t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                            }
                        }, setTransition: function (e) {
                            if (b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.virtualTranslate && 0 !== e) {
                                var t = !1;
                                b.slides.eq(b.activeIndex).transitionEnd(function () {
                                    if (!t && b && a(this).hasClass(b.params.slideActiveClass)) {
                                        t = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], r = 0; r < e.length; r++) b.wrapper.trigger(e[r])
                                    }
                                })
                            }
                        }
                    }, cube: {
                        setTranslate: function () {
                            var e, t = 0;
                            b.params.cube.shadow && (b.isHorizontal() ? (e = b.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.wrapper.append(e)), e.css({height: b.width + "px"})) : (e = b.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.container.append(e))));
                            for (var r = 0; r < b.slides.length; r++) {
                                var i = b.slides.eq(r), s = 90 * r, n = Math.floor(s / 360);
                                b.rtl && (s = -s, n = Math.floor(-s / 360));
                                var o = Math.max(Math.min(i[0].progress, 1), -1), l = 0, p = 0, d = 0;
                                r % 4 === 0 ? (l = 4 * -n * b.size, d = 0) : (r - 1) % 4 === 0 ? (l = 0, d = 4 * -n * b.size) : (r - 2) % 4 === 0 ? (l = b.size + 4 * n * b.size, d = b.size) : (r - 3) % 4 === 0 && (l = -b.size, d = 3 * b.size + 4 * b.size * n), b.rtl && (l = -l), b.isHorizontal() || (p = l, l = 0);
                                var u = "rotateX(" + (b.isHorizontal() ? 0 : -s) + "deg) rotateY(" + (b.isHorizontal() ? s : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";
                                if (1 >= o && o > -1 && (t = 90 * r + 90 * o, b.rtl && (t = 90 * -r - 90 * o)), i.transform(u), b.params.cube.slideShadows) {
                                    var c = b.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
                                        m = b.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
                                    0 === c.length && (c = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), i.append(c)), 0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0))
                                }
                            }
                            if (b.wrapper.css({
                                    "-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "-moz-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "-ms-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "transform-origin": "50% 50% -" + b.size / 2 + "px"
                                }), b.params.cube.shadow) if (b.isHorizontal()) e.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")"); else {
                                var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                    f = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                                    g = b.params.cube.shadowScale, v = b.params.cube.shadowScale / f,
                                    w = b.params.cube.shadowOffset;
                                e.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (b.height / 2 + w) + "px, " + -b.height / 2 / v + "px) rotateX(-90deg)")
                            }
                            var y = b.isSafari || b.isUiWebView ? -b.size / 2 : 0;
                            b.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (b.isHorizontal() ? 0 : t) + "deg) rotateY(" + (b.isHorizontal() ? -t : 0) + "deg)")
                        }, setTransition: function (e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(e)
                        }
                    }, coverflow: {
                        setTranslate: function () {
                            for (var e = b.translate, t = b.isHorizontal() ? -e + b.width / 2 : -e + b.height / 2, r = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate, i = b.params.coverflow.depth, s = 0, n = b.slides.length; n > s; s++) {
                                var o = b.slides.eq(s), l = b.slidesSizesGrid[s], p = o[0].swiperSlideOffset,
                                    d = (t - p - l / 2) / l * b.params.coverflow.modifier,
                                    u = b.isHorizontal() ? r * d : 0, c = b.isHorizontal() ? 0 : r * d,
                                    m = -i * Math.abs(d), h = b.isHorizontal() ? 0 : b.params.coverflow.stretch * d,
                                    f = b.isHorizontal() ? b.params.coverflow.stretch * d : 0;
                                Math.abs(f) < .001 && (f = 0), Math.abs(h) < .001 && (h = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);
                                var g = "translate3d(" + f + "px," + h + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";
                                if (o.transform(g), o[0].style.zIndex = -Math.abs(Math.round(d)) + 1, b.params.coverflow.slideShadows) {
                                    var v = b.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                                        w = b.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                                    0 === v.length && (v = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === w.length && (w = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), v.length && (v[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0)
                                }
                            }
                            if (b.browser.ie) {
                                var y = b.wrapper[0].style;
                                y.perspectiveOrigin = t + "px 50%"
                            }
                        }, setTransition: function (e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, b.lazy = {
                    initialImageLoaded: !1, loadImageInSlide: function (e, t) {
                        if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== b.slides.length)) {
                            var r = b.slides.eq(e),
                                i = r.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                            !r.hasClass("swiper-lazy") || r.hasClass("swiper-lazy-loaded") || r.hasClass("swiper-lazy-loading") || (i = i.add(r[0])), 0 !== i.length && i.each(function () {
                                var e = a(this);
                                e.addClass("swiper-lazy-loading");
                                var i = e.attr("data-background"), s = e.attr("data-src"), n = e.attr("data-srcset");
                                b.loadImage(e[0], s || i, n, !1, function () {
                                    if (i ? (e.css("background-image", 'url("' + i + '")'), e.removeAttr("data-background")) : (n && (e.attr("srcset", n), e.removeAttr("data-srcset")), s && (e.attr("src", s), e.removeAttr("data-src"))), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), r.find(".swiper-lazy-preloader, .preloader").remove(), b.params.loop && t) {
                                        var a = r.attr("data-swiper-slide-index");
                                        if (r.hasClass(b.params.slideDuplicateClass)) {
                                            var o = b.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + b.params.slideDuplicateClass + ")");
                                            b.lazy.loadImageInSlide(o.index(), !1)
                                        } else {
                                            var l = b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');
                                            b.lazy.loadImageInSlide(l.index(), !1)
                                        }
                                    }
                                    b.emit("onLazyImageReady", b, r[0], e[0])
                                }), b.emit("onLazyImageLoad", b, r[0], e[0])
                            })
                        }
                    }, load: function () {
                        var e;
                        if (b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function () {
                            b.lazy.loadImageInSlide(a(this).index())
                        }); else if (b.params.slidesPerView > 1) for (e = b.activeIndex; e < b.activeIndex + b.params.slidesPerView; e++) b.slides[e] && b.lazy.loadImageInSlide(e); else b.lazy.loadImageInSlide(b.activeIndex);
                        if (b.params.lazyLoadingInPrevNext) if (b.params.slidesPerView > 1 || b.params.lazyLoadingInPrevNextAmount && b.params.lazyLoadingInPrevNextAmount > 1) {
                            var t = b.params.lazyLoadingInPrevNextAmount, r = b.params.slidesPerView,
                                i = Math.min(b.activeIndex + r + Math.max(t, r), b.slides.length),
                                s = Math.max(b.activeIndex - Math.max(r, t), 0);
                            for (e = b.activeIndex + b.params.slidesPerView; i > e; e++) b.slides[e] && b.lazy.loadImageInSlide(e);
                            for (e = s; e < b.activeIndex; e++) b.slides[e] && b.lazy.loadImageInSlide(e)
                        } else {
                            var n = b.wrapper.children("." + b.params.slideNextClass);
                            n.length > 0 && b.lazy.loadImageInSlide(n.index());
                            var o = b.wrapper.children("." + b.params.slidePrevClass);
                            o.length > 0 && b.lazy.loadImageInSlide(o.index())
                        }
                    }, onTransitionStart: function () {
                        b.params.lazyLoading && (b.params.lazyLoadingOnTransitionStart || !b.params.lazyLoadingOnTransitionStart && !b.lazy.initialImageLoaded) && b.lazy.load()
                    }, onTransitionEnd: function () {
                        b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load()
                    }
                }, b.scrollbar = {
                    isTouched: !1, setDragPosition: function (e) {
                        var a = b.scrollbar,
                            t = b.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                            r = t - a.track.offset()[b.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
                            i = -b.minTranslate() * a.moveDivider, s = -b.maxTranslate() * a.moveDivider;
                        i > r ? r = i : r > s && (r = s), r = -r / a.moveDivider, b.updateProgress(r), b.setWrapperTranslate(r, !0)
                    }, dragStart: function (e) {
                        var a = b.scrollbar;
                        a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), b.params.scrollbarHide && a.track.css("opacity", 1), b.wrapper.transition(100), a.drag.transition(100), b.emit("onScrollbarDragStart", b)
                    }, dragMove: function (e) {
                        var a = b.scrollbar;
                        a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), b.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), b.emit("onScrollbarDragMove", b))
                    }, dragEnd: function (e) {
                        var a = b.scrollbar;
                        a.isTouched && (a.isTouched = !1, b.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function () {
                            a.track.css("opacity", 0), a.track.transition(400)
                        }, 1e3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset())
                    }, enableDraggable: function () {
                        var e = b.scrollbar, t = b.support.touch ? e.track : document;
                        a(e.track).on(b.touchEvents.start, e.dragStart), a(t).on(b.touchEvents.move, e.dragMove), a(t).on(b.touchEvents.end, e.dragEnd)
                    }, disableDraggable: function () {
                        var e = b.scrollbar, t = b.support.touch ? e.track : document;
                        a(e.track).off(b.touchEvents.start, e.dragStart), a(t).off(b.touchEvents.move, e.dragMove), a(t).off(b.touchEvents.end, e.dragEnd)
                    }, set: function () {
                        if (b.params.scrollbar) {
                            var e = b.scrollbar;
                            e.track = a(b.params.scrollbar), b.params.uniqueNavElements && "string" == typeof b.params.scrollbar && e.track.length > 1 && 1 === b.container.find(b.params.scrollbar).length && (e.track = b.container.find(b.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = b.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = b.size / b.virtualSize, e.moveDivider = e.divider * (e.trackSize / b.size), e.dragSize = e.trackSize * e.divider, b.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", b.params.scrollbarHide && (e.track[0].style.opacity = 0)
                        }
                    }, setTranslate: function () {
                        if (b.params.scrollbar) {
                            var e, a = b.scrollbar, t = (b.translate || 0, a.dragSize);
                            e = (a.trackSize - a.dragSize) * b.progress, b.rtl && b.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), b.isHorizontal() ? (b.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (b.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), b.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function () {
                                a.track[0].style.opacity = 0, a.track.transition(400)
                            }, 1e3))
                        }
                    }, setTransition: function (e) {
                        b.params.scrollbar && b.scrollbar.drag.transition(e)
                    }
                }, b.controller = {
                    LinearSpline: function (e, a) {
                        this.x = e, this.y = a, this.lastIndex = e.length - 1;
                        var t, r;
                        this.x.length;
                        this.interpolate = function (e) {
                            return e ? (r = i(this.x, e), t = r - 1, (e - this.x[t]) * (this.y[r] - this.y[t]) / (this.x[r] - this.x[t]) + this.y[t]) : 0
                        };
                        var i = function () {
                            var e, a, t;
                            return function (r, i) {
                                for (a = -1, e = r.length; e - a > 1;) r[t = e + a >> 1] <= i ? a = t : e = t;
                                return e
                            }
                        }()
                    }, getInterpolateFunction: function (e) {
                        b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, e.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, e.snapGrid))
                    }, setTranslate: function (e, a) {
                        function r(a) {
                            e = a.rtl && "horizontal" === a.params.direction ? -b.translate : b.translate, "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(a), s = -b.controller.spline.interpolate(-e)), s && "container" !== b.params.controlBy || (i = (a.maxTranslate() - a.minTranslate()) / (b.maxTranslate() - b.minTranslate()), s = (e - b.minTranslate()) * i + a.minTranslate()), b.params.controlInverse && (s = a.maxTranslate() - s), a.updateProgress(s), a.setWrapperTranslate(s, !1, b), a.updateActiveIndex()
                        }

                        var i, s, n = b.params.control;
                        if (b.isArray(n)) for (var o = 0; o < n.length; o++) n[o] !== a && n[o] instanceof t && r(n[o]); else n instanceof t && a !== n && r(n)
                    }, setTransition: function (e, a) {
                        function r(a) {
                            a.setWrapperTransition(e, b), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function () {
                                s && (a.params.loop && "slide" === b.params.controlBy && a.fixLoop(), a.onTransitionEnd())
                            }))
                        }

                        var i, s = b.params.control;
                        if (b.isArray(s)) for (i = 0; i < s.length; i++) s[i] !== a && s[i] instanceof t && r(s[i]); else s instanceof t && a !== s && r(s)
                    }
                }, b.hashnav = {
                    init: function () {
                        if (b.params.hashnav) {
                            b.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e) for (var a = 0, t = 0, r = b.slides.length; r > t; t++) {
                                var i = b.slides.eq(t), s = i.attr("data-hash");
                                if (s === e && !i.hasClass(b.params.slideDuplicateClass)) {
                                    var n = i.index();
                                    b.slideTo(n, a, b.params.runCallbacksOnInit, !0)
                                }
                            }
                        }
                    }, setHash: function () {
                        b.hashnav.initialized && b.params.hashnav && (document.location.hash = b.slides.eq(b.activeIndex).attr("data-hash") || "")
                    }
                }, b.disableKeyboardControl = function () {
                    b.params.keyboardControl = !1, a(document).off("keydown", p)
                }, b.enableKeyboardControl = function () {
                    b.params.keyboardControl = !0, a(document).on("keydown", p)
                }, b.mousewheel = {
                    event: !1,
                    lastScrollTime: (new window.Date).getTime()
                }, b.params.mousewheelControl) {
                try {
                    new window.WheelEvent("wheel"), b.mousewheel.event = "wheel"
                } catch (N) {
                    (window.WheelEvent || b.container[0] && "wheel" in b.container[0]) && (b.mousewheel.event = "wheel")
                }
                !b.mousewheel.event && window.WheelEvent, b.mousewheel.event || void 0 === document.onmousewheel || (b.mousewheel.event = "mousewheel"), b.mousewheel.event || (b.mousewheel.event = "DOMMouseScroll")
            }
            b.disableMousewheelControl = function () {
                return b.mousewheel.event ? (b.container.off(b.mousewheel.event, d), !0) : !1
            }, b.enableMousewheelControl = function () {
                return b.mousewheel.event ? (b.container.on(b.mousewheel.event, d), !0) : !1
            }, b.parallax = {
                setTranslate: function () {
                    b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        u(this, b.progress)
                    }), b.slides.each(function () {
                        var e = a(this);
                        e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            var a = Math.min(Math.max(e[0].progress, -1), 1);
                            u(this, a)
                        })
                    })
                }, setTransition: function (e) {
                    "undefined" == typeof e && (e = b.params.speed), b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        var t = a(this), r = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (r = 0), t.transition(r)
                    })
                }
            }, b._plugins = [];
            for (var R in b.plugins) {
                var W = b.plugins[R](b, b.params[R]);
                W && b._plugins.push(W)
            }
            return b.callPlugins = function (e) {
                for (var a = 0; a < b._plugins.length; a++) e in b._plugins[a] && b._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, b.emitterEventListeners = {}, b.emit = function (e) {
                b.params[e] && b.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var a;
                if (b.emitterEventListeners[e]) for (a = 0; a < b.emitterEventListeners[e].length; a++) b.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                b.callPlugins && b.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, b.on = function (e, a) {
                return e = c(e), b.emitterEventListeners[e] || (b.emitterEventListeners[e] = []), b.emitterEventListeners[e].push(a), b
            }, b.off = function (e, a) {
                var t;
                if (e = c(e), "undefined" == typeof a) return b.emitterEventListeners[e] = [], b;
                if (b.emitterEventListeners[e] && 0 !== b.emitterEventListeners[e].length) {
                    for (t = 0; t < b.emitterEventListeners[e].length; t++) b.emitterEventListeners[e][t] === a && b.emitterEventListeners[e].splice(t, 1);
                    return b
                }
            }, b.once = function (e, a) {
                e = c(e);
                var t = function () {
                    a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), b.off(e, t)
                };
                return b.on(e, t), b
            }, b.a11y = {
                makeFocusable: function (e) {
                    return e.attr("tabIndex", "0"), e
                },
                addRole: function (e, a) {
                    return e.attr("role", a), e
                },
                addLabel: function (e, a) {
                    return e.attr("aria-label", a), e
                },
                disable: function (e) {
                    return e.attr("aria-disabled", !0), e
                },
                enable: function (e) {
                    return e.attr("aria-disabled", !1), e
                },
                onEnterKey: function (e) {
                    13 === e.keyCode && (a(e.target).is(b.params.nextButton) ? (b.onClickNext(e), b.isEnd ? b.a11y.notify(b.params.lastSlideMessage) : b.a11y.notify(b.params.nextSlideMessage)) : a(e.target).is(b.params.prevButton) && (b.onClickPrev(e), b.isBeginning ? b.a11y.notify(b.params.firstSlideMessage) : b.a11y.notify(b.params.prevSlideMessage)), a(e.target).is("." + b.params.bulletClass) && a(e.target)[0].click())
                },
                liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function (e) {
                    var a = b.a11y.liveRegion;
                    0 !== a.length && (a.html(""), a.html(e))
                },
                init: function () {
                    b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.a11y.makeFocusable(b.nextButton), b.a11y.addRole(b.nextButton, "button"), b.a11y.addLabel(b.nextButton, b.params.nextSlideMessage)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.a11y.makeFocusable(b.prevButton), b.a11y.addRole(b.prevButton, "button"), b.a11y.addLabel(b.prevButton, b.params.prevSlideMessage)), a(b.container).append(b.a11y.liveRegion)
                },
                initPagination: function () {
                    b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function () {
                        var e = a(this);
                        b.a11y.makeFocusable(e), b.a11y.addRole(e, "button"), b.a11y.addLabel(e, b.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
                    })
                },
                destroy: function () {
                    b.a11y.liveRegion && b.a11y.liveRegion.length > 0 && b.a11y.liveRegion.remove()
                }
            }, b.init = function () {
                b.params.loop && b.createLoop(), b.updateContainerSize(), b.updateSlidesSize(), b.updatePagination(), b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable()), "slide" !== b.params.effect && b.effects[b.params.effect] && (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate()), b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0))), b.attachEvents(), b.params.observer && b.support.observer && b.initObservers(), b.params.preloadImages && !b.params.lazyLoading && b.preloadImages(), b.params.autoplay && b.startAutoplay(), b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl(), b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl(),
                b.params.hashnav && b.hashnav && b.hashnav.init(), b.params.a11y && b.a11y && b.a11y.init(), b.emit("onInit", b)
            }, b.cleanupStyles = function () {
                b.container.removeClass(b.classNames.join(" ")).removeAttr("style"), b.wrapper.removeAttr("style"), b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass, b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass), b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass), b.params.prevButton && a(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.nextButton && a(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"), b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"))
            }, b.destroy = function (e, a) {
                b.detachEvents(), b.stopAutoplay(), b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable(), b.params.loop && b.destroyLoop(), a && b.cleanupStyles(), b.disconnectObservers(), b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl(), b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl(), b.params.a11y && b.a11y && b.a11y.destroy(), b.emit("onDestroy"), e !== !1 && (b = null)
            }, b.init(), b
        }
    };
    t.prototype = {
        isSafari: function () {
            var e = navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function (e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
        },
        device: function () {
            var e = navigator.userAgent, a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                t = e.match(/(iPad).*OS\s([\d_]+)/), r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                i = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);
            return {ios: t || i || r, android: a}
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function () {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
            }(), flexbox: function () {
                for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++) if (a[t] in e) return !0
            }(), observer: function () {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }()
        },
        plugins: {}
    };
    for (var r = (function () {
        var e = function (e) {
            var a = this, t = 0;
            for (t = 0; t < e.length; t++) a[t] = e[t];
            return a.length = e.length, this
        }, a = function (a, t) {
            var r = [], i = 0;
            if (a && !t && a instanceof e) return a;
            if (a) if ("string" == typeof a) {
                var s, n, o = a.trim();
                if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                    var l = "div";
                    for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = a, i = 0; i < n.childNodes.length; i++) r.push(n.childNodes[i])
                } else for (s = t || "#" !== a[0] || a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(a) : [document.getElementById(a.split("#")[1])], i = 0; i < s.length; i++) s[i] && r.push(s[i])
            } else if (a.nodeType || a === window || a === document) r.push(a); else if (a.length > 0 && a[0].nodeType) for (i = 0; i < a.length; i++) r.push(a[i]);
            return new e(r)
        };
        return e.prototype = {
            addClass: function (e) {
                if ("undefined" == typeof e) return this;
                for (var a = e.split(" "), t = 0; t < a.length; t++) for (var r = 0; r < this.length; r++) this[r].classList.add(a[t]);
                return this
            }, removeClass: function (e) {
                for (var a = e.split(" "), t = 0; t < a.length; t++) for (var r = 0; r < this.length; r++) this[r].classList.remove(a[t]);
                return this
            }, hasClass: function (e) {
                return this[0] ? this[0].classList.contains(e) : !1
            }, toggleClass: function (e) {
                for (var a = e.split(" "), t = 0; t < a.length; t++) for (var r = 0; r < this.length; r++) this[r].classList.toggle(a[t]);
                return this
            }, attr: function (e, a) {
                if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                for (var t = 0; t < this.length; t++) if (2 === arguments.length) this[t].setAttribute(e, a); else for (var r in e) this[t][r] = e[r], this[t].setAttribute(r, e[r]);
                return this
            }, removeAttr: function (e) {
                for (var a = 0; a < this.length; a++) this[a].removeAttribute(e);
                return this
            }, data: function (e, a) {
                if ("undefined" != typeof a) {
                    for (var t = 0; t < this.length; t++) {
                        var r = this[t];
                        r.dom7ElementDataStorage || (r.dom7ElementDataStorage = {}), r.dom7ElementDataStorage[e] = a
                    }
                    return this
                }
                if (this[0]) {
                    var i = this[0].getAttribute("data-" + e);
                    return i ? i : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0
                }
            }, transform: function (e) {
                for (var a = 0; a < this.length; a++) {
                    var t = this[a].style;
                    t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
                }
                return this
            }, transition: function (e) {
                "string" != typeof e && (e += "ms");
                for (var a = 0; a < this.length; a++) {
                    var t = this[a].style;
                    t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
                }
                return this
            }, on: function (e, t, r, i) {
                function s(e) {
                    var i = e.target;
                    if (a(i).is(t)) r.call(i, e); else for (var s = a(i).parents(), n = 0; n < s.length; n++) a(s[n]).is(t) && r.call(s[n], e)
                }

                var n, o, l = e.split(" ");
                for (n = 0; n < this.length; n++) if ("function" == typeof t || t === !1) for ("function" == typeof t && (r = arguments[1], i = arguments[2] || !1), o = 0; o < l.length; o++) this[n].addEventListener(l[o], r, i); else for (o = 0; o < l.length; o++) this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({
                    listener: r,
                    liveListener: s
                }), this[n].addEventListener(l[o], s, i);
                return this
            }, off: function (e, a, t, r) {
                for (var i = e.split(" "), s = 0; s < i.length; s++) for (var n = 0; n < this.length; n++) if ("function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1], r = arguments[2] || !1), this[n].removeEventListener(i[s], t, r); else if (this[n].dom7LiveListeners) for (var o = 0; o < this[n].dom7LiveListeners.length; o++) this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(i[s], this[n].dom7LiveListeners[o].liveListener, r);
                return this
            }, once: function (e, a, t, r) {
                function i(n) {
                    t(n), s.off(e, a, i, r)
                }

                var s = this;
                "function" == typeof a && (a = !1, t = arguments[1], r = arguments[2]), s.on(e, a, i, r)
            }, trigger: function (e, a) {
                for (var t = 0; t < this.length; t++) {
                    var r;
                    try {
                        r = new window.CustomEvent(e, {detail: a, bubbles: !0, cancelable: !0})
                    } catch (i) {
                        r = document.createEvent("Event"), r.initEvent(e, !0, !0), r.detail = a
                    }
                    this[t].dispatchEvent(r)
                }
                return this
            }, transitionEnd: function (e) {
                function a(s) {
                    if (s.target === this) for (e.call(this, s), t = 0; t < r.length; t++) i.off(r[t], a)
                }

                var t,
                    r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                    i = this;
                if (e) for (t = 0; t < r.length; t++) i.on(r[t], a);
                return this
            }, width: function () {
                return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
            }, outerWidth: function (e) {
                return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
            }, height: function () {
                return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
            }, outerHeight: function (e) {
                return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
            }, offset: function () {
                if (this.length > 0) {
                    var e = this[0], a = e.getBoundingClientRect(), t = document.body,
                        r = e.clientTop || t.clientTop || 0, i = e.clientLeft || t.clientLeft || 0,
                        s = window.pageYOffset || e.scrollTop, n = window.pageXOffset || e.scrollLeft;
                    return {top: a.top + s - r, left: a.left + n - i}
                }
                return null
            }, css: function (e, a) {
                var t;
                if (1 === arguments.length) {
                    if ("string" != typeof e) {
                        for (t = 0; t < this.length; t++) for (var r in e) this[t].style[r] = e[r];
                        return this
                    }
                    if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
                }
                if (2 === arguments.length && "string" == typeof e) {
                    for (t = 0; t < this.length; t++) this[t].style[e] = a;
                    return this
                }
                return this
            }, each: function (e) {
                for (var a = 0; a < this.length; a++) e.call(this[a], a, this[a]);
                return this
            }, html: function (e) {
                if ("undefined" == typeof e) return this[0] ? this[0].innerHTML : void 0;
                for (var a = 0; a < this.length; a++) this[a].innerHTML = e;
                return this
            }, text: function (e) {
                if ("undefined" == typeof e) return this[0] ? this[0].textContent.trim() : null;
                for (var a = 0; a < this.length; a++) this[a].textContent = e;
                return this
            }, is: function (t) {
                if (!this[0]) return !1;
                var r, i;
                if ("string" == typeof t) {
                    var s = this[0];
                    if (s === document) return t === document;
                    if (s === window) return t === window;
                    if (s.matches) return s.matches(t);
                    if (s.webkitMatchesSelector) return s.webkitMatchesSelector(t);
                    if (s.mozMatchesSelector) return s.mozMatchesSelector(t);
                    if (s.msMatchesSelector) return s.msMatchesSelector(t);
                    for (r = a(t), i = 0; i < r.length; i++) if (r[i] === this[0]) return !0;
                    return !1
                }
                if (t === document) return this[0] === document;
                if (t === window) return this[0] === window;
                if (t.nodeType || t instanceof e) {
                    for (r = t.nodeType ? [t] : t, i = 0; i < r.length; i++) if (r[i] === this[0]) return !0;
                    return !1
                }
                return !1
            }, index: function () {
                if (this[0]) {
                    for (var e = this[0], a = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && a++;
                    return a
                }
            }, eq: function (a) {
                if ("undefined" == typeof a) return this;
                var t, r = this.length;
                return a > r - 1 ? new e([]) : 0 > a ? (t = r + a, new e(0 > t ? [] : [this[t]])) : new e([this[a]])
            }, append: function (a) {
                var t, r;
                for (t = 0; t < this.length; t++) if ("string" == typeof a) {
                    var i = document.createElement("div");
                    for (i.innerHTML = a; i.firstChild;) this[t].appendChild(i.firstChild)
                } else if (a instanceof e) for (r = 0; r < a.length; r++) this[t].appendChild(a[r]); else this[t].appendChild(a);
                return this
            }, prepend: function (a) {
                var t, r;
                for (t = 0; t < this.length; t++) if ("string" == typeof a) {
                    var i = document.createElement("div");
                    for (i.innerHTML = a, r = i.childNodes.length - 1; r >= 0; r--) this[t].insertBefore(i.childNodes[r], this[t].childNodes[0])
                } else if (a instanceof e) for (r = 0; r < a.length; r++) this[t].insertBefore(a[r], this[t].childNodes[0]); else this[t].insertBefore(a, this[t].childNodes[0]);
                return this
            }, insertBefore: function (e) {
                for (var t = a(e), r = 0; r < this.length; r++) if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0]); else if (t.length > 1) for (var i = 0; i < t.length; i++) t[i].parentNode.insertBefore(this[r].cloneNode(!0), t[i])
            }, insertAfter: function (e) {
                for (var t = a(e), r = 0; r < this.length; r++) if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0].nextSibling); else if (t.length > 1) for (var i = 0; i < t.length; i++) t[i].parentNode.insertBefore(this[r].cloneNode(!0), t[i].nextSibling)
            }, next: function (t) {
                return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
            }, nextAll: function (t) {
                var r = [], i = this[0];
                if (!i) return new e([]);
                for (; i.nextElementSibling;) {
                    var s = i.nextElementSibling;
                    t ? a(s).is(t) && r.push(s) : r.push(s), i = s
                }
                return new e(r)
            }, prev: function (t) {
                return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
            }, prevAll: function (t) {
                var r = [], i = this[0];
                if (!i) return new e([]);
                for (; i.previousElementSibling;) {
                    var s = i.previousElementSibling;
                    t ? a(s).is(t) && r.push(s) : r.push(s), i = s
                }
                return new e(r)
            }, parent: function (e) {
                for (var t = [], r = 0; r < this.length; r++) e ? a(this[r].parentNode).is(e) && t.push(this[r].parentNode) : t.push(this[r].parentNode);
                return a(a.unique(t))
            }, parents: function (e) {
                for (var t = [], r = 0; r < this.length; r++) for (var i = this[r].parentNode; i;) e ? a(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
                return a(a.unique(t))
            }, find: function (a) {
                for (var t = [], r = 0; r < this.length; r++) for (var i = this[r].querySelectorAll(a), s = 0; s < i.length; s++) t.push(i[s]);
                return new e(t)
            }, children: function (t) {
                for (var r = [], i = 0; i < this.length; i++) for (var s = this[i].childNodes, n = 0; n < s.length; n++) t ? 1 === s[n].nodeType && a(s[n]).is(t) && r.push(s[n]) : 1 === s[n].nodeType && r.push(s[n]);
                return new e(a.unique(r))
            }, remove: function () {
                for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                return this
            }, add: function () {
                var e, t, r = this;
                for (e = 0; e < arguments.length; e++) {
                    var i = a(arguments[e]);
                    for (t = 0; t < i.length; t++) r[r.length] = i[t], r.length++
                }
                return r
            }
        }, a.fn = e.prototype, a.unique = function (e) {
            for (var a = [], t = 0; t < e.length; t++) -1 === a.indexOf(e[t]) && a.push(e[t]);
            return a
        }, a
    }()), i = ["jQuery", "Zepto", "Dom7"], s = 0; s < i.length; s++) window[i[s]] && e(window[i[s]]);
    var n;
    n = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r, n && ("transitionEnd" in n.fn || (n.fn.transitionEnd = function (e) {
        function a(s) {
            if (s.target === this) for (e.call(this, s), t = 0; t < r.length; t++) i.off(r[t], a)
        }

        var t, r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            i = this;
        if (e) for (t = 0; t < r.length; t++) i.on(r[t], a);
        return this
    }), "transform" in n.fn || (n.fn.transform = function (e) {
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
        }
        return this
    }), "transition" in n.fn || (n.fn.transition = function (e) {
        "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
        }
        return this
    })), window.Swiper = t
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function () {
    "use strict";
    return window.Swiper
});
//# sourceMappingURL=maps/swiper.min.js.map
//18岁以下，18-25岁，25岁以上
//美白淡斑，祛痘祛印 其他
//干燥肌，敏感肌，油性肌，中性肌
var json = [
    ['18岁以下', '干燥肌', '美白淡斑'],
    ['18岁以下', '敏感肌', '美白淡斑'],
    ['18岁以下', '油性肌', '美白淡斑'],
    ['18岁以下', '中性肌', '美白淡斑'],
    ['18岁以下', '干燥肌', '祛痘祛印'],
    ['18岁以下', '敏感肌', '祛痘祛印'],
    ['18岁以下', '油性肌', '祛痘祛印'],
    ['18岁以下', '中性肌', '祛痘祛印'],
    ['18岁以下', '干燥肌', '其他'],
    ['18岁以下', '敏感肌', '其他'],
    ['18岁以下', '油性肌', '其他'],
    ['18岁以下', '中性肌', '其他'],
    ['18岁以下', '干燥肌', '美白淡斑 祛痘祛印'],
    ['18岁以下', '敏感肌', '美白淡斑 祛痘祛印'],
    ['18岁以下', '油性肌', '美白淡斑 祛痘祛印'],
    ['18岁以下', '中性肌', '美白淡斑 祛痘祛印'],
    ['18岁以下', '干燥肌', '美白淡斑 其他'],
    ['18岁以下', '敏感肌', '美白淡斑 其他'],
    ['18岁以下', '油性肌', '美白淡斑 其他'],
    ['18岁以下', '中性肌', '美白淡斑 其他'],
    ['18岁以下', '干燥肌', '祛痘祛印 其他'],
    ['18岁以下', '敏感肌', '祛痘祛印 其他'],
    ['18岁以下', '油性肌', '祛痘祛印 其他'],
    ['18岁以下', '中性肌', '祛痘祛印 其他'],
    ['18岁以下', '干燥肌', '美白淡斑 祛痘祛印 其他'],
    ['18岁以下', '敏感肌', '美白淡斑 祛痘祛印 其他'],
    ['18岁以下', '油性肌', '美白淡斑 祛痘祛印 其他'],
    ['18岁以下', '中性肌', '美白淡斑 祛痘祛印 其他'],
    ['18-25岁', '干燥肌', '美白淡斑'],
    ['18-25岁', '敏感肌', '美白淡斑'],
    ['18-25岁', '油性肌', '美白淡斑'],
    ['18-25岁', '中性肌', '美白淡斑'],
    ['18-25岁', '干燥肌', '祛痘祛印'],
    ['18-25岁', '敏感肌', '祛痘祛印'],
    ['18-25岁', '油性肌', '祛痘祛印'],
    ['18-25岁', '中性肌', '祛痘祛印'],
    ['18-25岁', '干燥肌', '其他'],
    ['18-25岁', '敏感肌', '其他'],
    ['18-25岁', '油性肌', '其他'],
    ['18-25岁', '中性肌', '其他'],
    ['18-25岁', '干燥肌', '美白淡斑 祛痘祛印'],
    ['18-25岁', '敏感肌', '美白淡斑 祛痘祛印'],
    ['18-25岁', '油性肌', '美白淡斑 祛痘祛印'],
    ['18-25岁', '中性肌', '美白淡斑 祛痘祛印'],
    ['18-25岁', '干燥肌', '美白淡斑 其他'],
    ['18-25岁', '敏感肌', '美白淡斑 其他'],
    ['18-25岁', '油性肌', '美白淡斑 其他'],
    ['18-25岁', '中性肌', '美白淡斑 其他'],
    ['18-25岁', '干燥肌', '祛痘祛印 其他'],
    ['18-25岁', '敏感肌', '祛痘祛印 其他'],
    ['18-25岁', '油性肌', '祛痘祛印 其他'],
    ['18-25岁', '中性肌', '祛痘祛印 其他'],
    ['18-25岁', '干燥肌', '美白淡斑 祛痘祛印 其他'],
    ['18-25岁', '敏感肌', '美白淡斑 祛痘祛印 其他'],
    ['18-25岁', '油性肌', '美白淡斑 祛痘祛印 其他'],
    ['18-25岁', '中性肌', '美白淡斑 祛痘祛印 其他'],
    ['25岁以上', '干燥肌', '美白淡斑'],
    ['25岁以上', '敏感肌', '美白淡斑'],
    ['25岁以上', '油性肌', '美白淡斑'],
    ['25岁以上', '中性肌', '美白淡斑'],
    ['25岁以上', '干燥肌', '祛痘祛印'],
    ['25岁以上', '敏感肌', '祛痘祛印'],
    ['25岁以上', '油性肌', '祛痘祛印'],
    ['25岁以上', '中性肌', '祛痘祛印'],
    ['25岁以上', '干燥肌', '其他'],
    ['25岁以上', '敏感肌', '其他'],
    ['25岁以上', '油性肌', '其他'],
    ['25岁以上', '中性肌', '其他'],
    ['25岁以上', '干燥肌', '美白淡斑 祛痘祛印'],
    ['25岁以上', '敏感肌', '美白淡斑 祛痘祛印'],
    ['25岁以上', '油性肌', '美白淡斑 祛痘祛印'],
    ['25岁以上', '中性肌', '美白淡斑 祛痘祛印'],
    ['25岁以上', '干燥肌', '美白淡斑 其他'],
    ['25岁以上', '敏感肌', '美白淡斑 其他'],
    ['25岁以上', '油性肌', '美白淡斑 其他'],
    ['25岁以上', '中性肌', '美白淡斑 其他'],
    ['25岁以上', '干燥肌', '祛痘祛印 其他'],
    ['25岁以上', '敏感肌', '祛痘祛印 其他'],
    ['25岁以上', '油性肌', '祛痘祛印 其他'],
    ['25岁以上', '中性肌', '祛痘祛印 其他'],
    ['25岁以上', '干燥肌', '美白淡斑 祛痘祛印 其他'],
    ['25岁以上', '敏感肌', '美白淡斑 祛痘祛印 其他'],
    ['25岁以上', '油性肌', '美白淡斑 祛痘祛印 其他'],
    ['25岁以上', '中性肌', '美白淡斑 祛痘祛印 其他']
];
ves(function () {
    var space = ves('html').css('font-size') * 0.4;
    var swiper = new Swiper('#swipe1', {
        slidesPerView: 4,
        paginationClickable: true,
        spaceBetween: space,
        nextButton: '.btn_next'
    });
    var swiper = new Swiper('#swipe2', {
        auto: false,
        noSwiping: true,
        noSwipingClass: 'nomove'
    });
    //播放音频
    var play = false;
    ves("#voice").on('click', function () {
        if (!play) {
            ves("audio")[0].play();	//播放
            ves('#voice em').addClass('cur');
            ves(this).find('i').css('display', 'none');
            document.getElementById('media').play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                    document.getElementById('media').play();
                });
            }, false);
            play = true;
        } else {
            ves("audio")[0].pause();	//暂停
            ves('#voice em').removeClass('cur');
            play = false;
        }
    });
    var check_audio;
    if (ves(".show_mobile").css('display') == 'block') {
        // check_audio=setInterval(function(){
        // var curTime = ves("audio")[0].currentTime;
        // if(curTime>=18){
        // ves('#voice em').removeClass('cur');
        // clearInterval(check_audio);
        // }
        // },100);
    }


    ves('#swipe1').find('.swiper-slide').each(function (i) {
        ves(this).on('tap', function () {
            ves('#show_pic').css('display', 'block');
            ves('#show_img').attr('src', '/templates/res/star/gdt_new/0' + (i + 1) + '.jpg');
        })
    })
    ves('#show_pic').on('tap', function () {
        ves(this).css('display', 'none');
    });
    ves("#tab_menu li").on('tap', function () {
        var cur = ves(this).index();
        ves(this).addClass('cur').siblings('li').removeClass('cur');
        ves("#tab").find('.tab_item').eq(cur).css({'display': 'block', 'z-index': 1})
            .siblings('.tab_item').css({'display': 'none', 'z-index': 0});
    });

    var ask1 = '', ask2 = '', ask3 = '';
    ves('.ask1 li').on('tap', function () {
        ask1 = ves(this).html();
        ves(this).addClass('cur').siblings('li').removeClass('cur');
        swiper.slideNext();
    })
    ves('.ask2 li').on('tap', function () {
        ask2 = ves(this).html();
        ves(this).addClass('cur').siblings('li').removeClass('cur');
        swiper.slideNext();
    })
    ves('.ask3 li').on('tap', function () {
        if (ves(this).attr('class') == 'cur') {
            ves(this).removeClass('cur');
        } else {
            ves(this).addClass('cur');
        }
        ;
    })
    ves('.btn_back1,.btn_back2').on('tap', function () {
        swiper.slidePrev();
    });
    ves('#btn_submit').on('click', function () {
        ask3 = [];
        var len = ves('.ask3').find('.cur').length;
        if (len <= 0) {
            alert('第三题，请选择答案！');
        } else {
            for (var i = 0; i < len; i++) {
                ask3.push(ves('.ask3').find('.cur').eq(i).html());
            }
            //var l=json.length,temp=[],arr=[];
            console.log('question:' + ask1 + ' ' + ask2 + ' ' + ask3);
            //for(var i=0;i<l;i++){
            //	if(ask1==json[i][0]&&ask2==json[i][1]){
            //		temp.push(json[i]);
            //	}
            //}
            // ves('.record_num').html('“'+(i+1)+'”');
            ves("#zhe").css('display', 'block');
            return false;
            var cc = [];
            for (var i = 0; i < temp.length; i++) {
                if (temp[i][2].split(' ').length == len) {
                    if (len == 3) {
                        cc.push(temp[i]);
                    } else {
                        arr.push(temp[i]);
                    }

                }
                ;
            }
            if (len == 1) {
                for (var j = 0; j < arr.length; j++) {
                    if (ask3[0] == arr[j][2]) {
                        cc.push(arr[j]);
                    }
                }
            }
            if (len == 2) {
                for (var j = 0; j < arr.length; j++) {
                    if (arr[j][2].match(ask3[0]) && arr[j][2].match(ask3[1])) {
                        cc.push(arr[j]);
                    }
                }
            }
            for (var i = 0; i < l; i++) {
                if (ask1 == json[i][0] && ask2 == json[i][1] && cc[0][2] == json[i][2]) {
                    ves('.record_num').html('“' + (i + 1) + '”');
                    ves("#zhe").css('display', 'block');
                }
            }
        }
    })

    var t;
    ves('#btn_close').on('tap', function () {
        clearTimeout(t);
        ask1 = '', ask2 = '', ask3 = '';
        var lis = ves('.ask').find('.cur');
        del_l = lis.length;
        for (var i = 0; i < del_l; i++) {
            lis.eq(i).removeClass('cur');
        }
        ;
        swiper.slideTo(0);
        t = setTimeout(function () {
            ves("#zhe").css('display', 'none');
        }, 300);
    });
})