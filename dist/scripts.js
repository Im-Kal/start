function startTime() {
    var e = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        t = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        n = new Date,
        r = [n.getHours(), n.getMinutes(), n.getSeconds()],
        o = [n.getDate(), n.getDay(), n.getMonth(), n.getFullYear()],
        i = r[0],
        a = r[1],
        s = r[2],
        u = i >= 12 ? "PM" : "AM",
        l = o[0],
        c = t[o[1]],
        f = e[o[2]],
        p = o[3];
    i %= 12, i = i ? i : 12, a = a < 10 ? "0" + a : a, s = s < 10 ? "0" + s : s, document.getElementById("time").innerHTML = i + ":" + a + ":" + s + " " + u, document.getElementById("date").innerHTML = c + ", " + f + " " + l + ", " + p;
    setTimeout(startTime, 500)
}

function randomQuote() {
    var e = ["If you are depressed you are living in the past. If you are anxious you are living in the future. If you are at peace you are living in the present.", "Madness, as you know, is a lot like gravity, all it takes is a little push.", "The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently.", "Life has many ways of testing a person's will, either by having nothing happen at all or by having everything happen all at once.", "There is no excellent beauty that hath not some strangeness in its proportions.", "Children are fantastic little creatures, because next to drunk people, they are the only truly honest people on earth.", "I begin with an idea, and then it becomes something else.", "Be who you are and say what you feel because those who mind don't matter and those who matter don't mind.", "You can make more friends in two months by becoming interested in other people than you can in two years by trying to get people interested in you.", "An essential aspect of creativity is not being afraid to fail.", "Antisocial behavior is a trait of intelligence in a world of conformists.", "What you do today can improve all your tomorrows.", "A creative man is motivated by the desire to achieve, not by the desire to beat others.", "Don't watch the clock; do what it does. Keep going.", "If you can dream it, you can do it.", "You can't build a reputation on what you're going to do."],
        t = ["Lao Tzu", "Joker", "Friedrich Nietzsche", "Paulo Coelho", "Sir Francis Bacon", "Mads Nipper", "Pablo Picasso", "Dr. Seuss", "Dale Carnegie", "Edwin Land", "Nikola Tesla", "Ralph Marston", "Ayn Rand", "Sam Levenson", "Walt Disney", "Henry Ford"],
        n = Math.floor(Math.random() * e.length);
    document.getElementById("quote").innerHTML = "&ldquo;" + e[n] + "&rdquo; &mdash; <small>" + t[n] + "</small>"
}

function randomBackground(e) {
    var t = ["nature"],
        n = Math.floor(Math.random() * t.length),
        r = new UnsplashPhoto;
    "daily" == e || "weekly" == e ? r.all().randomize(e).fromCategory(t[n]).fetch() : r.all().fromCategory(t[n]).fetch(), document.body.style.backgroundImage = "url(" + r.url + ")"
}

function fetchBookmarks() {
    var e = 6;
    chrome.bookmarks.getTree(function(t) {
        t.forEach(function(t) {
            t.children[0].children.forEach(function(t) {
                t.children && e >= 1 && (console.log(t.title + " " + t.title.charAt(0).toLowerCase()), t.children.forEach(function(e) {
                    var t = e.title.match(/\[(.*?)\]/);
                    t && console.log(e.title + " " + e.url + " " + e.title.match(t[1]))
                }), console.log(""), e--)
            })
        })
    });
    var t = document.createElement("div");
    t.className = "left", document.getElementById("box").appendChild(t);
    var n = document.createElement("div");
    n.className = "right", document.getElementById("box").appendChild(n)
}

function bindMousetraps() {
    $.each($(".parent"), function(e, t) {
        Mousetrap.bind($(t).attr("data-key"), function(e) {
            $("a#" + $(t).attr("id")).toggleClass("active").next().slideToggle(150), $.each($(t).parent().find(".tab"), function(e, t) {
                Mousetrap.bind($(t).attr("data-key"), function(e) {
                    window.location.href = $(t).attr("href")
                }), Mousetrap.bind($(t).attr("data-key").toUpperCase(), function(e) {
                    window.open($(t).attr("href"), "_blank")
                })
            }), Mousetrap.bind($(t).attr("data-key"), function(e) {
                resetMousetraps()
            })
        })
    }), Mousetrap.bind("esc", function() {
        resetMousetraps()
    }), Mousetrap.bind("w", function() {
        window.location.href = document.getElementById("weatherlink")
    }), Mousetrap.bind("g", function() {
        window.location.href = "https://github.com/pschfr/start"
    }), Mousetrap.bind("shift+g", function() {
        window.location.href = "https://github.com/pschfr"
    }), Mousetrap.bind("alt+g", function() {
        window.location.href = "https://github.com/pschfr/start/projects/2?fullscreen=true"
    }), Mousetrap.bind("?", function() {
        openModal()
    })
}

function openModal() {
    "" == document.getElementById("modal").style.display ? document.getElementById("modal").style.display = "block" : closeModal()
}

function closeModal() {
    document.getElementById("modal").style.display = ""
}

function resetMousetraps() {
    $(".subMenu").slideUp(150), $("li a").removeClass("active"), Mousetrap.reset(), bindMousetraps(), document.getElementById("modal").style.display = ""
}

function getWeather(e) {
    var t = "3dc48ab835ed1b4369c089d0e742ff03",
        n = "flags,daily,minutely,alerts",
        r = "https://api.darksky.net/forecast/" + t + "/" + e + "?exclude=" + n,
        o = new XMLHttpRequest;
    o.open("GET", r, !0), o.onreadystatechange = function() {
        if (4 == o.readyState && 200 == o.status) {
            var t = JSON.parse(o.responseText),
                n = "";
            "clear-day" == t.currently.icon ? n = "sun" : "clear-night" == t.currently.icon ? n = "moon" : "rain" == t.currently.icon ? n = "rain" : "snow" == t.currently.icon ? n = "snow" : "sleet" == t.currently.icon ? n = "sleet" : "wind" == t.currently.icon ? n = "wind" : "fog" == t.currently.icon ? n = "fog" : "cloudy" == t.currently.icon ? n = "cloud" : "partly-cloudy-day" == t.currently.icon ? n = "cloud sun" : "partly-cloudy-night" == t.currently.icon && (n = "cloud moon"), "snow" == t.currently.icon || "sleet" == t.currently.icon ? participate("snow") : "rain" == t.currently.icon && participate("rain"), document.getElementById("weather").innerHTML = '<a id="weatherlink" href="https://darksky.net/forecast/' + e + '"><span class="climacon ' + n + '"></span> ' + t.currently.summary + ", " + Math.round(t.currently.temperature) + "&deg;</a>", document.getElementById("details").innerHTML = t.hourly.summary.replace(",", ",<br/>")
        }
    }, o.send(null)
}

function geolocWeather() {
    "geolocation" in navigator ? navigator.geolocation.getCurrentPosition(function(e) {
        getWeather(e.coords.latitude + "," + e.coords.longitude)
    }) : getWeather("40.4406, -79.9959")
}

function lastfmRequest() {
    var e = "paul_r_schaefer",
        t = "0f680404e39c821cac34008cc4d803db",
        n = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + e + "&api_key=" + t + "&limit=1&format=json",
        r = document.getElementById("lastFM"),
        o = new XMLHttpRequest;
    o.open("GET", n, !0), o.onreadystatechange = function() {
        if (4 == o.readyState && 200 == o.status) {
            var e = JSON.parse(o.responseText).recenttracks["@attr"].total,
                t = JSON.parse(o.responseText).recenttracks.track[0];
            t["@attr"] && "" !== t["@attr"].nowplaying ? r.innerHTML = '<span title="' + e + ' total streamed">currently listening to:</span> ' : r.innerHTML = '<span title="' + e + ' total streamed">last listened to:</span> ', r.innerHTML += '<a href="' + t.url + '" title="on album: ' + t.album["#text"] + '">' + t.artist["#text"] + " &mdash; " + t.name + "</a> "
        }
    }, o.send(null)
}

function getOptions() {
    chrome.storage.sync.get({
        categoryBuildings: "category/buildings",
        categoryFood: "category/food",
        categoryNature: "category/nature",
        categoryPeople: "category/people",
        categoryTechnology: "category/technology",
        categoryObjects: "category/objects",
        backgroundRefresh: "daily",
        lastFMusername: "paul_r_schaefer"
    }, function(e) {
        console.log(e)
    })
}

function participate(e) {
    function t() {
        n.height = n.offsetHeight, n.width = n.offsetWidth
    }
    var n = document.getElementById("snow"),
        r = n.getContext("2d"),
        o = [];
    n.style.pointerEvents = "none", n.style.position = "fixed", n.style.top = 0, n.style.left = 0, n.style.width = "100vw", n.style.height = "100vh", t(), window.onresize = function() {
        t()
    };
    var i = Math;
    setInterval(function() {
        r.clearRect(0, 0, n.width, n.height), r.beginPath();
        var t = i.random(),
            a = .05 + .95 * t;
        for (flake = {}, flake.x = 1.5 * n.width * i.random() - .5 * n.width, flake.y = -9, flake.velX = 2 * a * (i.random() / 2 + .5), flake.velY = (4 + 2 * i.random()) * a, flake.radius = i.pow(5 * t, 2) / 5, flake.update = function() {
                var t = this;
                t.x += t.velX, t.y += t.velY, r.beginPath(), r.arc(t.x, t.y, t.radius, 0, 2 * i.PI, !1), "snow" == e ? r.fillStyle = "#FFF" : "rain" == e && (r.fillStyle = "#00F"), r.fill()
            }, o.push(flake), b = 0; b < o.length; b++) o[b].y > n.height ? o.splice(b, 1) : o[b].update()
    }, 16)
}

function gmailRequest() {
    var e = "https://mail.google.com/mail/u/0/feed/atom";
    element = document.getElementById("gmail"), xmlhttp = new XMLHttpRequest, xmlhttp.open("GET", e, !0), xmlhttp.onreadystatechange = function() {
        if (4 == xmlhttp.readyState && 200 == xmlhttp.status) {
            var t = new DOMParser,
                n = t.parseFromString(xmlhttp.responseText, "application/xml"),
                r = n.getElementsByTagName("title")[0].innerHTML.replace("Gmail - Inbox for ", ""),
                o = n.getElementsByTagName("fullcount")[0].innerHTML,
                i = n.getElementsByTagName("entry");
            if (entryList = r + ":\n", plural = o > 1 ? "s" : "", 0 == i.length) element.innerHTML = "<p><a href='" + e.replace("/feed/atom", "") + "' id='emaillink'>Inbox zero. Enjoy your day.</a></p>\n";
            else {
                for (var a = 0; a < i.length; a++) {
                    var s = i[a].getElementsByTagName("title")[0].innerHTML.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"),
                        u = i[a].getElementsByTagName("author")[0].getElementsByTagName("name")[0].innerHTML.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
                    entryList += u + " &mdash; " + s + "\n"
                }
                element.innerHTML = "<p><a href='" + e.replace("/feed/atom", "") + "' id='emaillink' title='" + entryList + "'>" + o + " unread email" + plural + "</a></p>\n"
            }
        }
    }, xmlhttp.send(null)
}! function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";

    function n(e, t, n) {
        t = t || ae;
        var r, o = t.createElement("script");
        if (o.text = e, n)
            for (r in xe) n[r] && (o[r] = n[r]);
        t.head.appendChild(o).parentNode.removeChild(o)
    }

    function r(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? pe[de.call(e)] || "object" : typeof e
    }

    function o(e) {
        var t = !!e && "length" in e && e.length,
            n = r(e);
        return !ve(e) && !be(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function i(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }

    function a(e, t, n) {
        return ve(t) ? Te.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        }) : t.nodeType ? Te.grep(e, function(e) {
            return e === t !== n
        }) : "string" != typeof t ? Te.grep(e, function(e) {
            return fe.call(t, e) > -1 !== n
        }) : Te.filter(t, e, n)
    }

    function s(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function u(e) {
        var t = {};
        return Te.each(e.match(He) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function l(e) {
        return e
    }

    function c(e) {
        throw e
    }

    function f(e, t, n, r) {
        var o;
        try {
            e && ve(o = e.promise) ? o.call(e).done(t).fail(n) : e && ve(o = e.then) ? o.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }

    function p() {
        ae.removeEventListener("DOMContentLoaded", p), e.removeEventListener("load", p), Te.ready()
    }

    function d(e, t) {
        return t.toUpperCase()
    }

    function h(e) {
        return e.replace(Re, "ms-").replace(Be, d)
    }

    function y() {
        this.expando = Te.expando + y.uid++
    }

    function g(e) {
        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : We.test(e) ? JSON.parse(e) : e)
    }

    function m(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(ze, "-$&").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = g(n)
                } catch (e) {}
                Fe.set(e, t, n)
            } else n = void 0;
        return n
    }

    function v(e, t, n, r) {
        var o, i, a = 20,
            s = r ? function() {
                return r.cur()
            } : function() {
                return Te.css(e, t, "")
            },
            u = s(),
            l = n && n[3] || (Te.cssNumber[t] ? "" : "px"),
            c = (Te.cssNumber[t] || "px" !== l && +u) && Xe.exec(Te.css(e, t));
        if (c && c[3] !== l) {
            for (u /= 2, l = l || c[3], c = +u || 1; a--;) Te.style(e, t, c + l), (1 - i) * (1 - (i = s() / u || .5)) <= 0 && (a = 0), c /= i;
            c = 2 * c, Te.style(e, t, c + l), n = n || []
        }
        return n && (c = +c || +u || 0, o = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = o)), o
    }

    function b(e) {
        var t, n = e.ownerDocument,
            r = e.nodeName,
            o = Ge[r];
        return o ? o : (t = n.body.appendChild(n.createElement(r)), o = Te.css(t, "display"), t.parentNode.removeChild(t), "none" === o && (o = "block"), Ge[r] = o, o)
    }

    function x(e, t) {
        for (var n, r, o = [], i = 0, a = e.length; i < a; i++) r = e[i], r.style && (n = r.style.display, t ? ("none" === n && (o[i] = $e.get(r, "display") || null, o[i] || (r.style.display = "")), "" === r.style.display && Ve(r) && (o[i] = b(r))) : "none" !== n && (o[i] = "none", $e.set(r, "display", n)));
        for (i = 0; i < a; i++) null != o[i] && (e[i].style.display = o[i]);
        return e
    }

    function w(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && i(e, t) ? Te.merge([e], n) : n
    }

    function T(e, t) {
        for (var n = 0, r = e.length; n < r; n++) $e.set(e[n], "globalEval", !t || $e.get(t[n], "globalEval"))
    }

    function k(e, t, n, o, i) {
        for (var a, s, u, l, c, f, p = t.createDocumentFragment(), d = [], h = 0, y = e.length; h < y; h++)
            if (a = e[h], a || 0 === a)
                if ("object" === r(a)) Te.merge(d, a.nodeType ? [a] : a);
                else if (tt.test(a)) {
            for (s = s || p.appendChild(t.createElement("div")), u = (Qe.exec(a) || ["", ""])[1].toLowerCase(), l = et[u] || et._default, s.innerHTML = l[1] + Te.htmlPrefilter(a) + l[2], f = l[0]; f--;) s = s.lastChild;
            Te.merge(d, s.childNodes), s = p.firstChild, s.textContent = ""
        } else d.push(t.createTextNode(a));
        for (p.textContent = "", h = 0; a = d[h++];)
            if (o && Te.inArray(a, o) > -1) i && i.push(a);
            else if (c = Te.contains(a.ownerDocument, a), s = w(p.appendChild(a), "script"), c && T(s), n)
            for (f = 0; a = s[f++];) Ze.test(a.type || "") && n.push(a);
        return p
    }

    function C() {
        return !0
    }

    function E() {
        return !1
    }

    function S() {
        try {
            return ae.activeElement
        } catch (e) {}
    }

    function N(e, t, n, r, o, i) {
        var a, s;
        if ("object" == typeof t) {
            "string" != typeof n && (r = r || n, n = void 0);
            for (s in t) N(e, s, n, r, t[s], i);
            return e
        }
        if (null == r && null == o ? (o = n, r = n = void 0) : null == o && ("string" == typeof n ? (o = r, r = void 0) : (o = r, r = n, n = void 0)), o === !1) o = E;
        else if (!o) return e;
        return 1 === i && (a = o, o = function(e) {
            return Te().off(e), a.apply(this, arguments)
        }, o.guid = a.guid || (a.guid = Te.guid++)), e.each(function() {
            Te.event.add(this, t, o, r, n)
        })
    }

    function A(e, t) {
        return i(e, "table") && i(11 !== t.nodeType ? t : t.firstChild, "tr") ? Te(e).children("tbody")[0] || e : e
    }

    function D(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function j(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
    }

    function L(e, t) {
        var n, r, o, i, a, s, u, l;
        if (1 === t.nodeType) {
            if ($e.hasData(e) && (i = $e.access(e), a = $e.set(t, i), l = i.events)) {
                delete a.handle, a.events = {};
                for (o in l)
                    for (n = 0, r = l[o].length; n < r; n++) Te.event.add(t, o, l[o][n])
            }
            Fe.hasData(e) && (s = Fe.access(e), u = Te.extend({}, s), Fe.set(t, u))
        }
    }

    function q(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Je.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }

    function M(e, t, r, o) {
        t = le.apply([], t);
        var i, a, s, u, l, c, f = 0,
            p = e.length,
            d = p - 1,
            h = t[0],
            y = ve(h);
        if (y || p > 1 && "string" == typeof h && !me.checkClone && ut.test(h)) return e.each(function(n) {
            var i = e.eq(n);
            y && (t[0] = h.call(this, n, i.html())), M(i, t, r, o)
        });
        if (p && (i = k(t, e[0].ownerDocument, !1, e, o), a = i.firstChild, 1 === i.childNodes.length && (i = a), a || o)) {
            for (s = Te.map(w(i, "script"), D), u = s.length; f < p; f++) l = i, f !== d && (l = Te.clone(l, !0, !0), u && Te.merge(s, w(l, "script"))), r.call(e[f], l, f);
            if (u)
                for (c = s[s.length - 1].ownerDocument, Te.map(s, j), f = 0; f < u; f++) l = s[f], Ze.test(l.type || "") && !$e.access(l, "globalEval") && Te.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? Te._evalUrl && Te._evalUrl(l.src) : n(l.textContent.replace(lt, ""), c, l))
        }
        return e
    }

    function H(e, t, n) {
        for (var r, o = t ? Te.filter(t, e) : e, i = 0; null != (r = o[i]); i++) n || 1 !== r.nodeType || Te.cleanData(w(r)), r.parentNode && (n && Te.contains(r.ownerDocument, r) && T(w(r, "script")), r.parentNode.removeChild(r));
        return e
    }

    function P(e, t, n) {
        var r, o, i, a, s = e.style;
        return n = n || ft(e), n && (a = n.getPropertyValue(t) || n[t], "" !== a || Te.contains(e.ownerDocument, e) || (a = Te.style(e, t)), !me.pixelBoxStyles() && ct.test(a) && pt.test(t) && (r = s.width, o = s.minWidth, i = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = o, s.maxWidth = i)), void 0 !== a ? a + "" : a
    }

    function O(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function I(e) {
        if (e in vt) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = mt.length; n--;)
            if (e = mt[n] + t, e in vt) return e
    }

    function R(e) {
        var t = Te.cssProps[e];
        return t || (t = Te.cssProps[e] = I(e) || e), t
    }

    function B(e, t, n) {
        var r = Xe.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }

    function _(e, t, n, r, o, i) {
        var a = "width" === t ? 1 : 0,
            s = 0,
            u = 0;
        if (n === (r ? "border" : "content")) return 0;
        for (; a < 4; a += 2) "margin" === n && (u += Te.css(e, n + Ke[a], !0, o)), r ? ("content" === n && (u -= Te.css(e, "padding" + Ke[a], !0, o)), "margin" !== n && (u -= Te.css(e, "border" + Ke[a] + "Width", !0, o))) : (u += Te.css(e, "padding" + Ke[a], !0, o), "padding" !== n ? u += Te.css(e, "border" + Ke[a] + "Width", !0, o) : s += Te.css(e, "border" + Ke[a] + "Width", !0, o));
        return !r && i >= 0 && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - i - u - s - .5))), u
    }

    function $(e, t, n) {
        var r = ft(e),
            o = P(e, t, r),
            i = "border-box" === Te.css(e, "boxSizing", !1, r),
            a = i;
        if (ct.test(o)) {
            if (!n) return o;
            o = "auto"
        }
        return a = a && (me.boxSizingReliable() || o === e.style[t]), ("auto" === o || !parseFloat(o) && "inline" === Te.css(e, "display", !1, r)) && (o = e["offset" + t[0].toUpperCase() + t.slice(1)], a = !0), o = parseFloat(o) || 0, o + _(e, t, n || (i ? "border" : "content"), a, r, o) + "px"
    }

    function F(e, t, n, r, o) {
        return new F.prototype.init(e, t, n, r, o)
    }

    function W() {
        xt && (ae.hidden === !1 && e.requestAnimationFrame ? e.requestAnimationFrame(W) : e.setTimeout(W, Te.fx.interval), Te.fx.tick())
    }

    function z() {
        return e.setTimeout(function() {
            bt = void 0
        }), bt = Date.now()
    }

    function U(e, t) {
        var n, r = 0,
            o = {
                height: e
            };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) n = Ke[r], o["margin" + n] = o["padding" + n] = e;
        return t && (o.opacity = o.width = e), o
    }

    function X(e, t, n) {
        for (var r, o = (Y.tweeners[t] || []).concat(Y.tweeners["*"]), i = 0, a = o.length; i < a; i++)
            if (r = o[i].call(n, t, e)) return r
    }

    function K(e, t, n) {
        var r, o, i, a, s, u, l, c, f = "width" in t || "height" in t,
            p = this,
            d = {},
            h = e.style,
            y = e.nodeType && Ve(e),
            g = $e.get(e, "fxshow");
        n.queue || (a = Te._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
            a.unqueued || s()
        }), a.unqueued++, p.always(function() {
            p.always(function() {
                a.unqueued--, Te.queue(e, "fx").length || a.empty.fire()
            })
        }));
        for (r in t)
            if (o = t[r], wt.test(o)) {
                if (delete t[r], i = i || "toggle" === o, o === (y ? "hide" : "show")) {
                    if ("show" !== o || !g || void 0 === g[r]) continue;
                    y = !0
                }
                d[r] = g && g[r] || Te.style(e, r)
            } if (u = !Te.isEmptyObject(t), u || !Te.isEmptyObject(d)) {
            f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], l = g && g.display, null == l && (l = $e.get(e, "display")), c = Te.css(e, "display"), "none" === c && (l ? c = l : (x([e], !0), l = e.style.display || l, c = Te.css(e, "display"), x([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === Te.css(e, "float") && (u || (p.done(function() {
                h.display = l
            }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function() {
                h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
            })), u = !1;
            for (r in d) u || (g ? "hidden" in g && (y = g.hidden) : g = $e.access(e, "fxshow", {
                display: l
            }), i && (g.hidden = !y), y && x([e], !0), p.done(function() {
                y || x([e]), $e.remove(e, "fxshow");
                for (r in d) Te.style(e, r, d[r])
            })), u = X(y ? g[r] : 0, r, p), r in g || (g[r] = u.start, y && (u.end = u.start, u.start = 0))
        }
    }

    function V(e, t) {
        var n, r, o, i, a;
        for (n in e)
            if (r = h(n), o = t[r], i = e[n], Array.isArray(i) && (o = i[1], i = e[n] = i[0]), n !== r && (e[r] = i, delete e[n]), a = Te.cssHooks[r], a && "expand" in a) {
                i = a.expand(i), delete e[r];
                for (n in i) n in e || (e[n] = i[n], t[n] = o)
            } else t[r] = o
    }

    function Y(e, t, n) {
        var r, o, i = 0,
            a = Y.prefilters.length,
            s = Te.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (o) return !1;
                for (var t = bt || z(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, i = 1 - r, a = 0, u = l.tweens.length; a < u; a++) l.tweens[a].run(i);
                return s.notifyWith(e, [l, i, n]), i < 1 && u ? n : (u || s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l]), !1)
            },
            l = s.promise({
                elem: e,
                props: Te.extend({}, t),
                opts: Te.extend(!0, {
                    specialEasing: {},
                    easing: Te.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: bt || z(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = Te.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? l.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; n < r; n++) l.tweens[n].run(1);
                    return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this
                }
            }),
            c = l.props;
        for (V(c, l.opts.specialEasing); i < a; i++)
            if (r = Y.prefilters[i].call(l, e, c, l.opts)) return ve(r.stop) && (Te._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r;
        return Te.map(c, X, l), ve(l.opts.start) && l.opts.start.call(e, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), Te.fx.timer(Te.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l
    }

    function G(e) {
        var t = e.match(He) || [];
        return t.join(" ")
    }

    function J(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function Q(e) {
        return Array.isArray(e) ? e : "string" == typeof e ? e.match(He) || [] : []
    }

    function Z(e, t, n, o) {
        var i;
        if (Array.isArray(t)) Te.each(t, function(t, r) {
            n || Mt.test(e) ? o(e, r) : Z(e + "[" + ("object" == typeof r && null != r ? t : "") + "]", r, n, o)
        });
        else if (n || "object" !== r(t)) o(e, t);
        else
            for (i in t) Z(e + "[" + i + "]", t[i], n, o)
    }

    function ee(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, o = 0,
                i = t.toLowerCase().match(He) || [];
            if (ve(n))
                for (; r = i[o++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function te(e, t, n, r) {
        function o(s) {
            var u;
            return i[s] = !0, Te.each(e[s] || [], function(e, s) {
                var l = s(t, n, r);
                return "string" != typeof l || a || i[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l), o(l), !1)
            }), u
        }
        var i = {},
            a = e === Ut;
        return o(t.dataTypes[0]) || !i["*"] && o("*")
    }

    function ne(e, t) {
        var n, r, o = Te.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((o[n] ? e : r || (r = {}))[n] = t[n]);
        return r && Te.extend(!0, e, r), e
    }

    function re(e, t, n) {
        for (var r, o, i, a, s = e.contents, u = e.dataTypes;
            "*" === u[0];) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (o in s)
                if (s[o] && s[o].test(r)) {
                    u.unshift(o);
                    break
                } if (u[0] in n) i = u[0];
        else {
            for (o in n) {
                if (!u[0] || e.converters[o + " " + u[0]]) {
                    i = o;
                    break
                }
                a || (a = o)
            }
            i = i || a
        }
        if (i) return i !== u[0] && u.unshift(i), n[i]
    }

    function oe(e, t, n, r) {
        var o, i, a, s, u, l = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
        for (i = c.shift(); i;)
            if (e.responseFields[i] && (n[e.responseFields[i]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = i, i = c.shift())
                if ("*" === i) i = u;
                else if ("*" !== u && u !== i) {
            if (a = l[u + " " + i] || l["* " + i], !a)
                for (o in l)
                    if (s = o.split(" "), s[1] === i && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                        a === !0 ? a = l[o] : l[o] !== !0 && (i = s[0], c.unshift(s[1]));
                        break
                    } if (a !== !0)
                if (a && e.throws) t = a(t);
                else try {
                    t = a(t)
                } catch (e) {
                    return {
                        state: "parsererror",
                        error: a ? e : "No conversion from " + u + " to " + i
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }
    var ie = [],
        ae = e.document,
        se = Object.getPrototypeOf,
        ue = ie.slice,
        le = ie.concat,
        ce = ie.push,
        fe = ie.indexOf,
        pe = {},
        de = pe.toString,
        he = pe.hasOwnProperty,
        ye = he.toString,
        ge = ye.call(Object),
        me = {},
        ve = function(e) {
            return "function" == typeof e && "number" != typeof e.nodeType
        },
        be = function(e) {
            return null != e && e === e.window
        },
        xe = {
            type: !0,
            src: !0,
            noModule: !0
        },
        we = "3.3.1",
        Te = function(e, t) {
            return new Te.fn.init(e, t)
        },
        ke = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    Te.fn = Te.prototype = {
        jquery: we,
        constructor: Te,
        length: 0,
        toArray: function() {
            return ue.call(this)
        },
        get: function(e) {
            return null == e ? ue.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = Te.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        each: function(e) {
            return Te.each(this, e)
        },
        map: function(e) {
            return this.pushStack(Te.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(ue.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: ce,
        sort: ie.sort,
        splice: ie.splice
    }, Te.extend = Te.fn.extend = function() {
        var e, t, n, r, o, i, a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            l = !1;
        for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || ve(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
            if (null != (e = arguments[s]))
                for (t in e) n = a[t], r = e[t], a !== r && (l && r && (Te.isPlainObject(r) || (o = Array.isArray(r))) ? (o ? (o = !1, i = n && Array.isArray(n) ? n : []) : i = n && Te.isPlainObject(n) ? n : {}, a[t] = Te.extend(l, i, r)) : void 0 !== r && (a[t] = r));
        return a
    }, Te.extend({
        expando: "jQuery" + (we + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== de.call(e)) && (!(t = se(e)) || (n = he.call(t, "constructor") && t.constructor, "function" == typeof n && ye.call(n) === ge))
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        globalEval: function(e) {
            n(e)
        },
        each: function(e, t) {
            var n, r = 0;
            if (o(e))
                for (n = e.length; r < n && t.call(e[r], r, e[r]) !== !1; r++);
            else
                for (r in e)
                    if (t.call(e[r], r, e[r]) === !1) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(ke, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (o(Object(e)) ? Te.merge(n, "string" == typeof e ? [e] : e) : ce.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : fe.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, o = e.length; r < n; r++) e[o++] = t[r];
            return e.length = o, e
        },
        grep: function(e, t, n) {
            for (var r, o = [], i = 0, a = e.length, s = !n; i < a; i++) r = !t(e[i], i), r !== s && o.push(e[i]);
            return o
        },
        map: function(e, t, n) {
            var r, i, a = 0,
                s = [];
            if (o(e))
                for (r = e.length; a < r; a++) i = t(e[a], a, n), null != i && s.push(i);
            else
                for (a in e) i = t(e[a], a, n), null != i && s.push(i);
            return le.apply([], s)
        },
        guid: 1,
        support: me
    }), "function" == typeof Symbol && (Te.fn[Symbol.iterator] = ie[Symbol.iterator]), Te.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        pe["[object " + t + "]"] = t.toLowerCase()
    });
    var Ce = function(e) {
        function t(e, t, n, r) {
            var o, i, a, s, u, l, c, p = t && t.ownerDocument,
                h = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h) return n;
            if (!r && ((t ? t.ownerDocument || t : $) !== M && q(t), t = t || M, P)) {
                if (11 !== h && (u = me.exec(e)))
                    if (o = u[1]) {
                        if (9 === h) {
                            if (!(a = t.getElementById(o))) return n;
                            if (a.id === o) return n.push(a), n
                        } else if (p && (a = p.getElementById(o)) && B(t, a) && a.id === o) return n.push(a), n
                    } else {
                        if (u[2]) return Q.apply(n, t.getElementsByTagName(e)), n;
                        if ((o = u[3]) && T.getElementsByClassName && t.getElementsByClassName) return Q.apply(n, t.getElementsByClassName(o)), n
                    } if (T.qsa && !X[e + " "] && (!O || !O.test(e))) {
                    if (1 !== h) p = t, c = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(we, Te) : t.setAttribute("id", s = _), l = S(e), i = l.length; i--;) l[i] = "#" + s + " " + d(l[i]);
                        c = l.join(","), p = ve.test(e) && f(t.parentNode) || t
                    }
                    if (c) try {
                        return Q.apply(n, p.querySelectorAll(c)), n
                    } catch (e) {} finally {
                        s === _ && t.removeAttribute("id")
                    }
                }
            }
            return A(e.replace(se, "$1"), t, n, r)
        }

        function n() {
            function e(n, r) {
                return t.push(n + " ") > k.cacheLength && delete e[t.shift()], e[n + " "] = r
            }
            var t = [];
            return e
        }

        function r(e) {
            return e[_] = !0, e
        }

        function o(e) {
            var t = M.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function i(e, t) {
            for (var n = e.split("|"), r = n.length; r--;) k.attrHandle[n[r]] = t
        }

        function a(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function u(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function l(e) {
            return function(t) {
                return "form" in t ? t.parentNode && t.disabled === !1 ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Ce(t) === e : t.disabled === e : "label" in t && t.disabled === e
            }
        }

        function c(e) {
            return r(function(t) {
                return t = +t, r(function(n, r) {
                    for (var o, i = e([], n.length, t), a = i.length; a--;) n[o = i[a]] && (n[o] = !(r[o] = n[o]))
                })
            })
        }

        function f(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function p() {}

        function d(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r
        }

        function h(e, t, n) {
            var r = t.dir,
                o = t.next,
                i = o || r,
                a = n && "parentNode" === i,
                s = W++;
            return t.first ? function(t, n, o) {
                for (; t = t[r];)
                    if (1 === t.nodeType || a) return e(t, n, o);
                return !1
            } : function(t, n, u) {
                var l, c, f, p = [F, s];
                if (u) {
                    for (; t = t[r];)
                        if ((1 === t.nodeType || a) && e(t, n, u)) return !0
                } else
                    for (; t = t[r];)
                        if (1 === t.nodeType || a)
                            if (f = t[_] || (t[_] = {}), c = f[t.uniqueID] || (f[t.uniqueID] = {}), o && o === t.nodeName.toLowerCase()) t = t[r] || t;
                            else {
                                if ((l = c[i]) && l[0] === F && l[1] === s) return p[2] = l[2];
                                if (c[i] = p, p[2] = e(t, n, u)) return !0
                            } return !1
            }
        }

        function y(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var o = e.length; o--;)
                    if (!e[o](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function g(e, n, r) {
            for (var o = 0, i = n.length; o < i; o++) t(e, n[o], r);
            return r
        }

        function m(e, t, n, r, o) {
            for (var i, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(i = e[s]) && (n && !n(i, r, o) || (a.push(i), l && t.push(s)));
            return a
        }

        function v(e, t, n, o, i, a) {
            return o && !o[_] && (o = v(o)), i && !i[_] && (i = v(i, a)), r(function(r, a, s, u) {
                var l, c, f, p = [],
                    d = [],
                    h = a.length,
                    y = r || g(t || "*", s.nodeType ? [s] : s, []),
                    v = !e || !r && t ? y : m(y, p, e, s, u),
                    b = n ? i || (r ? e : h || o) ? [] : a : v;
                if (n && n(v, b, s, u), o)
                    for (l = m(b, d), o(l, [], s, u), c = l.length; c--;)(f = l[c]) && (b[d[c]] = !(v[d[c]] = f));
                if (r) {
                    if (i || e) {
                        if (i) {
                            for (l = [], c = b.length; c--;)(f = b[c]) && l.push(v[c] = f);
                            i(null, b = [], l, u)
                        }
                        for (c = b.length; c--;)(f = b[c]) && (l = i ? ee(r, f) : p[c]) > -1 && (r[l] = !(a[l] = f))
                    }
                } else b = m(b === a ? b.splice(h, b.length) : b), i ? i(null, a, b, u) : Q.apply(a, b)
            })
        }

        function b(e) {
            for (var t, n, r, o = e.length, i = k.relative[e[0].type], a = i || k.relative[" "], s = i ? 1 : 0, u = h(function(e) {
                    return e === t
                }, a, !0), l = h(function(e) {
                    return ee(t, e) > -1
                }, a, !0), c = [function(e, n, r) {
                    var o = !i && (r || n !== D) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                    return t = null, o
                }]; s < o; s++)
                if (n = k.relative[e[s].type]) c = [h(y(c), n)];
                else {
                    if (n = k.filter[e[s].type].apply(null, e[s].matches), n[_]) {
                        for (r = ++s; r < o && !k.relative[e[r].type]; r++);
                        return v(s > 1 && y(c), s > 1 && d(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(se, "$1"), n, s < r && b(e.slice(s, r)), r < o && b(e = e.slice(r)), r < o && d(e))
                    }
                    c.push(n)
                } return y(c)
        }

        function x(e, n) {
            var o = n.length > 0,
                i = e.length > 0,
                a = function(r, a, s, u, l) {
                    var c, f, p, d = 0,
                        h = "0",
                        y = r && [],
                        g = [],
                        v = D,
                        b = r || i && k.find.TAG("*", l),
                        x = F += null == v ? 1 : Math.random() || .1,
                        w = b.length;
                    for (l && (D = a === M || a || l); h !== w && null != (c = b[h]); h++) {
                        if (i && c) {
                            for (f = 0, a || c.ownerDocument === M || (q(c), s = !P); p = e[f++];)
                                if (p(c, a || M, s)) {
                                    u.push(c);
                                    break
                                } l && (F = x)
                        }
                        o && ((c = !p && c) && d--, r && y.push(c))
                    }
                    if (d += h, o && h !== d) {
                        for (f = 0; p = n[f++];) p(y, g, a, s);
                        if (r) {
                            if (d > 0)
                                for (; h--;) y[h] || g[h] || (g[h] = G.call(u));
                            g = m(g)
                        }
                        Q.apply(u, g), l && !r && g.length > 0 && d + n.length > 1 && t.uniqueSort(u)
                    }
                    return l && (F = x, D = v), y
                };
            return o ? r(a) : a
        }
        var w, T, k, C, E, S, N, A, D, j, L, q, M, H, P, O, I, R, B, _ = "sizzle" + 1 * new Date,
            $ = e.document,
            F = 0,
            W = 0,
            z = n(),
            U = n(),
            X = n(),
            K = function(e, t) {
                return e === t && (L = !0), 0
            },
            V = {}.hasOwnProperty,
            Y = [],
            G = Y.pop,
            J = Y.push,
            Q = Y.push,
            Z = Y.slice,
            ee = function(e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t) return n;
                return -1
            },
            te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            re = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            oe = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]",
            ie = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
            ae = new RegExp(ne + "+", "g"),
            se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
            ue = new RegExp("^" + ne + "*," + ne + "*"),
            le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
            fe = new RegExp(ie),
            pe = new RegExp("^" + re + "$"),
            de = {
                ID: new RegExp("^#(" + re + ")"),
                CLASS: new RegExp("^\\.(" + re + ")"),
                TAG: new RegExp("^(" + re + "|[*])"),
                ATTR: new RegExp("^" + oe),
                PSEUDO: new RegExp("^" + ie),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + te + ")$", "i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
            },
            he = /^(?:input|select|textarea|button)$/i,
            ye = /^h\d$/i,
            ge = /^[^{]+\{\s*\[native \w/,
            me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ve = /[+~]/,
            be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
            xe = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            we = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            Te = function(e, t) {
                return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            ke = function() {
                q()
            },
            Ce = h(function(e) {
                return e.disabled === !0 && ("form" in e || "label" in e)
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            Q.apply(Y = Z.call($.childNodes), $.childNodes), Y[$.childNodes.length].nodeType
        } catch (e) {
            Q = {
                apply: Y.length ? function(e, t) {
                    J.apply(e, Z.call(t))
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        T = t.support = {}, E = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, q = t.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : $;
            return r !== M && 9 === r.nodeType && r.documentElement ? (M = r, H = M.documentElement, P = !E(M), $ !== M && (n = M.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", ke, !1) : n.attachEvent && n.attachEvent("onunload", ke)), T.attributes = o(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), T.getElementsByTagName = o(function(e) {
                return e.appendChild(M.createComment("")), !e.getElementsByTagName("*").length
            }), T.getElementsByClassName = ge.test(M.getElementsByClassName), T.getById = o(function(e) {
                return H.appendChild(e).id = _, !M.getElementsByName || !M.getElementsByName(_).length
            }), T.getById ? (k.filter.ID = function(e) {
                var t = e.replace(be, xe);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }, k.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && P) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }) : (k.filter.ID = function(e) {
                var t = e.replace(be, xe);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }, k.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && P) {
                    var n, r, o, i = t.getElementById(e);
                    if (i) {
                        if (n = i.getAttributeNode("id"), n && n.value === e) return [i];
                        for (o = t.getElementsByName(e), r = 0; i = o[r++];)
                            if (n = i.getAttributeNode("id"), n && n.value === e) return [i]
                    }
                    return []
                }
            }), k.find.TAG = T.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : T.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, r = [],
                    o = 0,
                    i = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = i[o++];) 1 === n.nodeType && r.push(n);
                    return r
                }
                return i
            }, k.find.CLASS = T.getElementsByClassName && function(e, t) {
                if ("undefined" != typeof t.getElementsByClassName && P) return t.getElementsByClassName(e)
            }, I = [], O = [], (T.qsa = ge.test(M.querySelectorAll)) && (o(function(e) {
                H.appendChild(e).innerHTML = "<a id='" + _ + "'></a><select id='" + _ + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && O.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || O.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + _ + "-]").length || O.push("~="), e.querySelectorAll(":checked").length || O.push(":checked"), e.querySelectorAll("a#" + _ + "+*").length || O.push(".#.+[+~]")
            }), o(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = M.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && O.push("name" + ne + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && O.push(":enabled", ":disabled"), H.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && O.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), O.push(",.*:")
            })), (T.matchesSelector = ge.test(R = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && o(function(e) {
                T.disconnectedMatch = R.call(e, "*"), R.call(e, "[s!='']:x"), I.push("!=", ie)
            }), O = O.length && new RegExp(O.join("|")), I = I.length && new RegExp(I.join("|")), t = ge.test(H.compareDocumentPosition), B = t || ge.test(H.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, K = t ? function(e, t) {
                if (e === t) return L = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !T.sortDetached && t.compareDocumentPosition(e) === n ? e === M || e.ownerDocument === $ && B($, e) ? -1 : t === M || t.ownerDocument === $ && B($, t) ? 1 : j ? ee(j, e) - ee(j, t) : 0 : 4 & n ? -1 : 1)
            } : function(e, t) {
                if (e === t) return L = !0, 0;
                var n, r = 0,
                    o = e.parentNode,
                    i = t.parentNode,
                    s = [e],
                    u = [t];
                if (!o || !i) return e === M ? -1 : t === M ? 1 : o ? -1 : i ? 1 : j ? ee(j, e) - ee(j, t) : 0;
                if (o === i) return a(e, t);
                for (n = e; n = n.parentNode;) s.unshift(n);
                for (n = t; n = n.parentNode;) u.unshift(n);
                for (; s[r] === u[r];) r++;
                return r ? a(s[r], u[r]) : s[r] === $ ? -1 : u[r] === $ ? 1 : 0
            }, M) : M
        }, t.matches = function(e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== M && q(e), n = n.replace(ce, "='$1']"), T.matchesSelector && P && !X[n + " "] && (!I || !I.test(n)) && (!O || !O.test(n))) try {
                var r = R.call(e, n);
                if (r || T.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (e) {}
            return t(n, M, null, [e]).length > 0
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== M && q(e), B(e, t)
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== M && q(e);
            var n = k.attrHandle[t.toLowerCase()],
                r = n && V.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !P) : void 0;
            return void 0 !== r ? r : T.attributes || !P ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }, t.escape = function(e) {
            return (e + "").replace(we, Te)
        }, t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function(e) {
            var t, n = [],
                r = 0,
                o = 0;
            if (L = !T.detectDuplicates, j = !T.sortStable && e.slice(0), e.sort(K), L) {
                for (; t = e[o++];) t === e[o] && (r = n.push(o));
                for (; r--;) e.splice(n[r], 1)
            }
            return j = null, e
        }, C = t.getText = function(e) {
            var t, n = "",
                r = 0,
                o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += C(e)
                } else if (3 === o || 4 === o) return e.nodeValue
            } else
                for (; t = e[r++];) n += C(t);
            return n
        }, k = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: de,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(be, xe), e[3] = (e[3] || e[4] || e[5] || "").replace(be, xe), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return de.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && fe.test(n) && (t = S(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(be, xe).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = z[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && z(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, r) {
                    return function(o) {
                        var i = t.attr(o, e);
                        return null == i ? "!=" === n : !n || (i += "", "=" === n ? i === r : "!=" === n ? i !== r : "^=" === n ? r && 0 === i.indexOf(r) : "*=" === n ? r && i.indexOf(r) > -1 : "$=" === n ? r && i.slice(-r.length) === r : "~=" === n ? (" " + i.replace(ae, " ") + " ").indexOf(r) > -1 : "|=" === n && (i === r || i.slice(0, r.length + 1) === r + "-"))
                    }
                },
                CHILD: function(e, t, n, r, o) {
                    var i = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === r && 0 === o ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, u) {
                        var l, c, f, p, d, h, y = i !== a ? "nextSibling" : "previousSibling",
                            g = t.parentNode,
                            m = s && t.nodeName.toLowerCase(),
                            v = !u && !s,
                            b = !1;
                        if (g) {
                            if (i) {
                                for (; y;) {
                                    for (p = t; p = p[y];)
                                        if (s ? p.nodeName.toLowerCase() === m : 1 === p.nodeType) return !1;
                                    h = y = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? g.firstChild : g.lastChild], a && v) {
                                for (p = g, f = p[_] || (p[_] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), l = c[e] || [], d = l[0] === F && l[1], b = d && l[2], p = d && g.childNodes[d]; p = ++d && p && p[y] || (b = d = 0) || h.pop();)
                                    if (1 === p.nodeType && ++b && p === t) {
                                        c[e] = [F, d, b];
                                        break
                                    }
                            } else if (v && (p = t, f = p[_] || (p[_] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), l = c[e] || [], d = l[0] === F && l[1], b = d), b === !1)
                                for (;
                                    (p = ++d && p && p[y] || (b = d = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== m : 1 !== p.nodeType) || !++b || (v && (f = p[_] || (p[_] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), c[e] = [F, b]), p !== t)););
                            return b -= o, b === r || b % r === 0 && b / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var o, i = k.pseudos[e] || k.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return i[_] ? i(n) : i.length > 1 ? (o = [e, e, "", n], k.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                        for (var r, o = i(e, n), a = o.length; a--;) r = ee(e, o[a]), e[r] = !(t[r] = o[a])
                    }) : function(e) {
                        return i(e, 0, o)
                    }) : i
                }
            },
            pseudos: {
                not: r(function(e) {
                    var t = [],
                        n = [],
                        o = N(e.replace(se, "$1"));
                    return o[_] ? r(function(e, t, n, r) {
                        for (var i, a = o(e, null, r, []), s = e.length; s--;)(i = a[s]) && (e[s] = !(t[s] = i))
                    }) : function(e, r, i) {
                        return t[0] = e, o(t, null, i, n), t[0] = null, !n.pop()
                    }
                }),
                has: r(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: r(function(e) {
                    return e = e.replace(be, xe),
                        function(t) {
                            return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                        }
                }),
                lang: r(function(e) {
                    return pe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(be, xe).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = P ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === H
                },
                focus: function(e) {
                    return e === M.activeElement && (!M.hasFocus || M.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: l(!1),
                disabled: l(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !k.pseudos.empty(e)
                },
                header: function(e) {
                    return ye.test(e.nodeName)
                },
                input: function(e) {
                    return he.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: c(function() {
                    return [0]
                }),
                last: c(function(e, t) {
                    return [t - 1]
                }),
                eq: c(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: c(function(e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: c(function(e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: c(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: c(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        }, k.pseudos.nth = k.pseudos.eq;
        for (w in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) k.pseudos[w] = s(w);
        for (w in {
                submit: !0,
                reset: !0
            }) k.pseudos[w] = u(w);
        return p.prototype = k.filters = k.pseudos, k.setFilters = new p, S = t.tokenize = function(e, n) {
            var r, o, i, a, s, u, l, c = U[e + " "];
            if (c) return n ? 0 : c.slice(0);
            for (s = e, u = [], l = k.preFilter; s;) {
                r && !(o = ue.exec(s)) || (o && (s = s.slice(o[0].length) || s), u.push(i = [])), r = !1, (o = le.exec(s)) && (r = o.shift(), i.push({
                    value: r,
                    type: o[0].replace(se, " ")
                }), s = s.slice(r.length));
                for (a in k.filter) !(o = de[a].exec(s)) || l[a] && !(o = l[a](o)) || (r = o.shift(), i.push({
                    value: r,
                    type: a,
                    matches: o
                }), s = s.slice(r.length));
                if (!r) break
            }
            return n ? s.length : s ? t.error(e) : U(e, u).slice(0)
        }, N = t.compile = function(e, t) {
            var n, r = [],
                o = [],
                i = X[e + " "];
            if (!i) {
                for (t || (t = S(e)), n = t.length; n--;) i = b(t[n]), i[_] ? r.push(i) : o.push(i);
                i = X(e, x(o, r)), i.selector = e
            }
            return i
        }, A = t.select = function(e, t, n, r) {
            var o, i, a, s, u, l = "function" == typeof e && e,
                c = !r && S(e = l.selector || e);
            if (n = n || [], 1 === c.length) {
                if (i = c[0] = c[0].slice(0), i.length > 2 && "ID" === (a = i[0]).type && 9 === t.nodeType && P && k.relative[i[1].type]) {
                    if (t = (k.find.ID(a.matches[0].replace(be, xe), t) || [])[0], !t) return n;
                    l && (t = t.parentNode), e = e.slice(i.shift().value.length)
                }
                for (o = de.needsContext.test(e) ? 0 : i.length; o-- && (a = i[o], !k.relative[s = a.type]);)
                    if ((u = k.find[s]) && (r = u(a.matches[0].replace(be, xe), ve.test(i[0].type) && f(t.parentNode) || t))) {
                        if (i.splice(o, 1), e = r.length && d(i), !e) return Q.apply(n, r), n;
                        break
                    }
            }
            return (l || N(e, c))(r, t, !P, n, !t || ve.test(e) && f(t.parentNode) || t), n
        }, T.sortStable = _.split("").sort(K).join("") === _, T.detectDuplicates = !!L, q(), T.sortDetached = o(function(e) {
            return 1 & e.compareDocumentPosition(M.createElement("fieldset"))
        }), o(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || i("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), T.attributes && o(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || i("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), o(function(e) {
            return null == e.getAttribute("disabled")
        }) || i(te, function(e, t, n) {
            var r;
            if (!n) return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), t
    }(e);
    Te.find = Ce, Te.expr = Ce.selectors, Te.expr[":"] = Te.expr.pseudos, Te.uniqueSort = Te.unique = Ce.uniqueSort, Te.text = Ce.getText, Te.isXMLDoc = Ce.isXML, Te.contains = Ce.contains, Te.escapeSelector = Ce.escape;
    var Ee = function(e, t, n) {
            for (var r = [], o = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (o && Te(e).is(n)) break;
                    r.push(e)
                } return r
        },
        Se = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        Ne = Te.expr.match.needsContext,
        Ae = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    Te.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? Te.find.matchesSelector(r, e) ? [r] : [] : Te.find.matches(e, Te.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, Te.fn.extend({
        find: function(e) {
            var t, n, r = this.length,
                o = this;
            if ("string" != typeof e) return this.pushStack(Te(e).filter(function() {
                for (t = 0; t < r; t++)
                    if (Te.contains(o[t], this)) return !0
            }));
            for (n = this.pushStack([]), t = 0; t < r; t++) Te.find(e, o[t], n);
            return r > 1 ? Te.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(a(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(a(this, e || [], !0))
        },
        is: function(e) {
            return !!a(this, "string" == typeof e && Ne.test(e) ? Te(e) : e || [], !1).length
        }
    });
    var De, je = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
        Le = Te.fn.init = function(e, t, n) {
            var r, o;
            if (!e) return this;
            if (n = n || De, "string" == typeof e) {
                if (r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : je.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof Te ? t[0] : t, Te.merge(this, Te.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : ae, !0)), Ae.test(r[1]) && Te.isPlainObject(t))
                        for (r in t) ve(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                return o = ae.getElementById(r[2]), o && (this[0] = o, this.length = 1), this
            }
            return e.nodeType ? (this[0] = e, this.length = 1, this) : ve(e) ? void 0 !== n.ready ? n.ready(e) : e(Te) : Te.makeArray(e, this)
        };
    Le.prototype = Te.fn, De = Te(ae);
    var qe = /^(?:parents|prev(?:Until|All))/,
        Me = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    Te.fn.extend({
        has: function(e) {
            var t = Te(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (Te.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0,
                o = this.length,
                i = [],
                a = "string" != typeof e && Te(e);
            if (!Ne.test(e))
                for (; r < o; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && Te.find.matchesSelector(n, e))) {
                            i.push(n);
                            break
                        } return this.pushStack(i.length > 1 ? Te.uniqueSort(i) : i)
        },
        index: function(e) {
            return e ? "string" == typeof e ? fe.call(Te(e), this[0]) : fe.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(Te.uniqueSort(Te.merge(this.get(), Te(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), Te.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return Ee(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return Ee(e, "parentNode", n)
        },
        next: function(e) {
            return s(e, "nextSibling")
        },
        prev: function(e) {
            return s(e, "previousSibling")
        },
        nextAll: function(e) {
            return Ee(e, "nextSibling")
        },
        prevAll: function(e) {
            return Ee(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return Ee(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return Ee(e, "previousSibling", n)
        },
        siblings: function(e) {
            return Se((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return Se(e.firstChild)
        },
        contents: function(e) {
            return i(e, "iframe") ? e.contentDocument : (i(e, "template") && (e = e.content || e), Te.merge([], e.childNodes))
        }
    }, function(e, t) {
        Te.fn[e] = function(n, r) {
            var o = Te.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (o = Te.filter(r, o)), this.length > 1 && (Me[e] || Te.uniqueSort(o), qe.test(e) && o.reverse()), this.pushStack(o)
        }
    });
    var He = /[^\x20\t\r\n\f]+/g;
    Te.Callbacks = function(e) {
        e = "string" == typeof e ? u(e) : Te.extend({}, e);
        var t, n, o, i, a = [],
            s = [],
            l = -1,
            c = function() {
                for (i = i || e.once, o = t = !0; s.length; l = -1)
                    for (n = s.shift(); ++l < a.length;) a[l].apply(n[0], n[1]) === !1 && e.stopOnFalse && (l = a.length, n = !1);
                e.memory || (n = !1), t = !1, i && (a = n ? [] : "")
            },
            f = {
                add: function() {
                    return a && (n && !t && (l = a.length - 1, s.push(n)), function t(n) {
                        Te.each(n, function(n, o) {
                            ve(o) ? e.unique && f.has(o) || a.push(o) : o && o.length && "string" !== r(o) && t(o)
                        })
                    }(arguments), n && !t && c()), this
                },
                remove: function() {
                    return Te.each(arguments, function(e, t) {
                        for (var n;
                            (n = Te.inArray(t, a, n)) > -1;) a.splice(n, 1), n <= l && l--
                    }), this
                },
                has: function(e) {
                    return e ? Te.inArray(e, a) > -1 : a.length > 0
                },
                empty: function() {
                    return a && (a = []), this
                },
                disable: function() {
                    return i = s = [], a = n = "", this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return i = s = [], n || t || (a = n = ""), this
                },
                locked: function() {
                    return !!i
                },
                fireWith: function(e, n) {
                    return i || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || c()), this
                },
                fire: function() {
                    return f.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!o
                }
            };
        return f
    }, Te.extend({
        Deferred: function(t) {
            var n = [
                    ["notify", "progress", Te.Callbacks("memory"), Te.Callbacks("memory"), 2],
                    ["resolve", "done", Te.Callbacks("once memory"), Te.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", Te.Callbacks("once memory"), Te.Callbacks("once memory"), 1, "rejected"]
                ],
                r = "pending",
                o = {
                    state: function() {
                        return r
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    catch: function(e) {
                        return o.then(null, e)
                    },
                    pipe: function() {
                        var e = arguments;
                        return Te.Deferred(function(t) {
                            Te.each(n, function(n, r) {
                                var o = ve(e[r[4]]) && e[r[4]];
                                i[r[1]](function() {
                                    var e = o && o.apply(this, arguments);
                                    e && ve(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, o ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    then: function(t, r, o) {
                        function i(t, n, r, o) {
                            return function() {
                                var s = this,
                                    u = arguments,
                                    f = function() {
                                        var e, f;
                                        if (!(t < a)) {
                                            if (e = r.apply(s, u), e === n.promise()) throw new TypeError("Thenable self-resolution");
                                            f = e && ("object" == typeof e || "function" == typeof e) && e.then, ve(f) ? o ? f.call(e, i(a, n, l, o), i(a, n, c, o)) : (a++, f.call(e, i(a, n, l, o), i(a, n, c, o), i(a, n, l, n.notifyWith))) : (r !== l && (s = void 0, u = [e]), (o || n.resolveWith)(s, u))
                                        }
                                    },
                                    p = o ? f : function() {
                                        try {
                                            f()
                                        } catch (e) {
                                            Te.Deferred.exceptionHook && Te.Deferred.exceptionHook(e, p.stackTrace), t + 1 >= a && (r !== c && (s = void 0, u = [e]), n.rejectWith(s, u))
                                        }
                                    };
                                t ? p() : (Te.Deferred.getStackHook && (p.stackTrace = Te.Deferred.getStackHook()), e.setTimeout(p))
                            }
                        }
                        var a = 0;
                        return Te.Deferred(function(e) {
                            n[0][3].add(i(0, e, ve(o) ? o : l, e.notifyWith)), n[1][3].add(i(0, e, ve(t) ? t : l)), n[2][3].add(i(0, e, ve(r) ? r : c))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? Te.extend(e, o) : o
                    }
                },
                i = {};
            return Te.each(n, function(e, t) {
                var a = t[2],
                    s = t[5];
                o[t[1]] = a.add, s && a.add(function() {
                    r = s
                }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), a.add(t[3].fire), i[t[0]] = function() {
                    return i[t[0] + "With"](this === i ? void 0 : this, arguments), this
                }, i[t[0] + "With"] = a.fireWith
            }), o.promise(i), t && t.call(i, i), i
        },
        when: function(e) {
            var t = arguments.length,
                n = t,
                r = Array(n),
                o = ue.call(arguments),
                i = Te.Deferred(),
                a = function(e) {
                    return function(n) {
                        r[e] = this, o[e] = arguments.length > 1 ? ue.call(arguments) : n, --t || i.resolveWith(r, o)
                    }
                };
            if (t <= 1 && (f(e, i.done(a(n)).resolve, i.reject, !t), "pending" === i.state() || ve(o[n] && o[n].then))) return i.then();
            for (; n--;) f(o[n], a(n), i.reject);
            return i.promise()
        }
    });
    var Pe = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    Te.Deferred.exceptionHook = function(t, n) {
        e.console && e.console.warn && t && Pe.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
    }, Te.readyException = function(t) {
        e.setTimeout(function() {
            throw t
        })
    };
    var Oe = Te.Deferred();
    Te.fn.ready = function(e) {
        return Oe.then(e).catch(function(e) {
            Te.readyException(e)
        }), this
    }, Te.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (e === !0 ? --Te.readyWait : Te.isReady) || (Te.isReady = !0, e !== !0 && --Te.readyWait > 0 || Oe.resolveWith(ae, [Te]))
        }
    }), Te.ready.then = Oe.then, "complete" === ae.readyState || "loading" !== ae.readyState && !ae.documentElement.doScroll ? e.setTimeout(Te.ready) : (ae.addEventListener("DOMContentLoaded", p), e.addEventListener("load", p));
    var Ie = function(e, t, n, o, i, a, s) {
            var u = 0,
                l = e.length,
                c = null == n;
            if ("object" === r(n)) {
                i = !0;
                for (u in n) Ie(e, t, u, n[u], !0, a, s)
            } else if (void 0 !== o && (i = !0, ve(o) || (s = !0), c && (s ? (t.call(e, o), t = null) : (c = t, t = function(e, t, n) {
                    return c.call(Te(e), n)
                })), t))
                for (; u < l; u++) t(e[u], n, s ? o : o.call(e[u], u, t(e[u], n)));
            return i ? e : c ? t.call(e) : l ? t(e[0], n) : a
        },
        Re = /^-ms-/,
        Be = /-([a-z])/g,
        _e = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
    y.uid = 1, y.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, _e(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var r, o = this.cache(e);
            if ("string" == typeof t) o[h(t)] = n;
            else
                for (r in t) o[h(r)] = t[r];
            return o
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][h(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    Array.isArray(t) ? t = t.map(h) : (t = h(t), t = t in r ? [t] : t.match(He) || []), n = t.length;
                    for (; n--;) delete r[t[n]]
                }(void 0 === t || Te.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !Te.isEmptyObject(t)
        }
    };
    var $e = new y,
        Fe = new y,
        We = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        ze = /[A-Z]/g;
    Te.extend({
        hasData: function(e) {
            return Fe.hasData(e) || $e.hasData(e)
        },
        data: function(e, t, n) {
            return Fe.access(e, t, n)
        },
        removeData: function(e, t) {
            Fe.remove(e, t)
        },
        _data: function(e, t, n) {
            return $e.access(e, t, n)
        },
        _removeData: function(e, t) {
            $e.remove(e, t)
        }
    }), Te.fn.extend({
        data: function(e, t) {
            var n, r, o, i = this[0],
                a = i && i.attributes;
            if (void 0 === e) {
                if (this.length && (o = Fe.get(i), 1 === i.nodeType && !$e.get(i, "hasDataAttrs"))) {
                    for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = h(r.slice(5)), m(i, r, o[r])));
                    $e.set(i, "hasDataAttrs", !0)
                }
                return o
            }
            return "object" == typeof e ? this.each(function() {
                Fe.set(this, e)
            }) : Ie(this, function(t) {
                var n;
                if (i && void 0 === t) {
                    if (n = Fe.get(i, e), void 0 !== n) return n;
                    if (n = m(i, e), void 0 !== n) return n
                } else this.each(function() {
                    Fe.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                Fe.remove(this, e)
            })
        }
    }), Te.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = $e.get(e, t), n && (!r || Array.isArray(n) ? r = $e.access(e, t, Te.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = Te.queue(e, t),
                r = n.length,
                o = n.shift(),
                i = Te._queueHooks(e, t),
                a = function() {
                    Te.dequeue(e, t)
                };
            "inprogress" === o && (o = n.shift(), r--), o && ("fx" === t && n.unshift("inprogress"), delete i.stop, o.call(e, a, i)), !r && i && i.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return $e.get(e, n) || $e.access(e, n, {
                empty: Te.Callbacks("once memory").add(function() {
                    $e.remove(e, [t + "queue", n])
                })
            })
        }
    }), Te.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? Te.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = Te.queue(this, e, t);
                Te._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && Te.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                Te.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                o = Te.Deferred(),
                i = this,
                a = this.length,
                s = function() {
                    --r || o.resolveWith(i, [i])
                };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = $e.get(i[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
            return s(), o.promise(t)
        }
    });
    var Ue = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Xe = new RegExp("^(?:([+-])=|)(" + Ue + ")([a-z%]*)$", "i"),
        Ke = ["Top", "Right", "Bottom", "Left"],
        Ve = function(e, t) {
            return e = t || e, "none" === e.style.display || "" === e.style.display && Te.contains(e.ownerDocument, e) && "none" === Te.css(e, "display")
        },
        Ye = function(e, t, n, r) {
            var o, i, a = {};
            for (i in t) a[i] = e.style[i], e.style[i] = t[i];
            o = n.apply(e, r || []);
            for (i in t) e.style[i] = a[i];
            return o
        },
        Ge = {};
    Te.fn.extend({
        show: function() {
            return x(this, !0)
        },
        hide: function() {
            return x(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Ve(this) ? Te(this).show() : Te(this).hide()
            })
        }
    });
    var Je = /^(?:checkbox|radio)$/i,
        Qe = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        Ze = /^$|^module$|\/(?:java|ecma)script/i,
        et = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    et.optgroup = et.option, et.tbody = et.tfoot = et.colgroup = et.caption = et.thead, et.th = et.td;
    var tt = /<|&#?\w+;/;
    ! function() {
        var e = ae.createDocumentFragment(),
            t = e.appendChild(ae.createElement("div")),
            n = ae.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), me.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", me.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var nt = ae.documentElement,
        rt = /^key/,
        ot = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        it = /^([^.]*)(?:\.(.+)|)/;
    Te.event = {
        global: {},
        add: function(e, t, n, r, o) {
            var i, a, s, u, l, c, f, p, d, h, y, g = $e.get(e);
            if (g)
                for (n.handler && (i = n, n = i.handler, o = i.selector), o && Te.find.matchesSelector(nt, o), n.guid || (n.guid = Te.guid++), (u = g.events) || (u = g.events = {}), (a = g.handle) || (a = g.handle = function(t) {
                        return "undefined" != typeof Te && Te.event.triggered !== t.type ? Te.event.dispatch.apply(e, arguments) : void 0
                    }), t = (t || "").match(He) || [""], l = t.length; l--;) s = it.exec(t[l]) || [], d = y = s[1], h = (s[2] || "").split(".").sort(), d && (f = Te.event.special[d] || {}, d = (o ? f.delegateType : f.bindType) || d, f = Te.event.special[d] || {}, c = Te.extend({
                    type: d,
                    origType: y,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && Te.expr.match.needsContext.test(o),
                    namespace: h.join(".")
                }, i), (p = u[d]) || (p = u[d] = [], p.delegateCount = 0, f.setup && f.setup.call(e, r, h, a) !== !1 || e.addEventListener && e.addEventListener(d, a)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, c) : p.push(c), Te.event.global[d] = !0)
        },
        remove: function(e, t, n, r, o) {
            var i, a, s, u, l, c, f, p, d, h, y, g = $e.hasData(e) && $e.get(e);
            if (g && (u = g.events)) {
                for (t = (t || "").match(He) || [""], l = t.length; l--;)
                    if (s = it.exec(t[l]) || [], d = y = s[1], h = (s[2] || "").split(".").sort(), d) {
                        for (f = Te.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = u[d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = i = p.length; i--;) c = p[i], !o && y !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(i, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                        a && !p.length && (f.teardown && f.teardown.call(e, h, g.handle) !== !1 || Te.removeEvent(e, d, g.handle), delete u[d])
                    } else
                        for (d in u) Te.event.remove(e, d + t[l], n, r, !0);
                Te.isEmptyObject(u) && $e.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, r, o, i, a, s = Te.event.fix(e),
                u = new Array(arguments.length),
                l = ($e.get(this, "events") || {})[s.type] || [],
                c = Te.event.special[s.type] || {};
            for (u[0] = s, t = 1; t < arguments.length; t++) u[t] = arguments[t];
            if (s.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, s) !== !1) {
                for (a = Te.event.handlers.call(this, s, l), t = 0;
                    (o = a[t++]) && !s.isPropagationStopped();)
                    for (s.currentTarget = o.elem, n = 0;
                        (i = o.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !s.rnamespace.test(i.namespace) || (s.handleObj = i, s.data = i.data, r = ((Te.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, u), void 0 !== r && (s.result = r) === !1 && (s.preventDefault(), s.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, s), s.result
            }
        },
        handlers: function(e, t) {
            var n, r, o, i, a, s = [],
                u = t.delegateCount,
                l = e.target;
            if (u && l.nodeType && !("click" === e.type && e.button >= 1))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && ("click" !== e.type || l.disabled !== !0)) {
                        for (i = [], a = {}, n = 0; n < u; n++) r = t[n], o = r.selector + " ", void 0 === a[o] && (a[o] = r.needsContext ? Te(o, this).index(l) > -1 : Te.find(o, this, null, [l]).length), a[o] && i.push(r);
                        i.length && s.push({
                            elem: l,
                            handlers: i
                        })
                    } return l = this, u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }), s
        },
        addProp: function(e, t) {
            Object.defineProperty(Te.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: ve(t) ? function() {
                    if (this.originalEvent) return t(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[e]
                },
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[Te.expando] ? e : new Te.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== S() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === S() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && i(this, "input")) return this.click(), !1
                },
                _default: function(e) {
                    return i(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, Te.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, Te.Event = function(e, t) {
        return this instanceof Te.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? C : E, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && Te.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), void(this[Te.expando] = !0)) : new Te.Event(e, t)
    }, Te.Event.prototype = {
        constructor: Te.Event,
        isDefaultPrevented: E,
        isPropagationStopped: E,
        isImmediatePropagationStopped: E,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = C, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = C, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = C, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, Te.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && rt.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && ot.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, Te.event.addProp), Te.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        Te.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    o = e.relatedTarget,
                    i = e.handleObj;
                return o && (o === r || Te.contains(r, o)) || (e.type = i.origType, n = i.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), Te.fn.extend({
        on: function(e, t, n, r) {
            return N(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return N(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, o;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, Te(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (o in e) this.off(o, t, e[o]);
                return this
            }
            return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = E), this.each(function() {
                Te.event.remove(this, e, n, t)
            })
        }
    });
    var at = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        st = /<script|<style|<link/i,
        ut = /checked\s*(?:[^=]|=\s*.checked.)/i,
        lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    Te.extend({
        htmlPrefilter: function(e) {
            return e.replace(at, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var r, o, i, a, s = e.cloneNode(!0),
                u = Te.contains(e.ownerDocument, e);
            if (!(me.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Te.isXMLDoc(e)))
                for (a = w(s), i = w(e), r = 0, o = i.length; r < o; r++) q(i[r], a[r]);
            if (t)
                if (n)
                    for (i = i || w(e), a = a || w(s), r = 0, o = i.length; r < o; r++) L(i[r], a[r]);
                else L(e, s);
            return a = w(s, "script"), a.length > 0 && T(a, !u && w(e, "script")), s
        },
        cleanData: function(e) {
            for (var t, n, r, o = Te.event.special, i = 0; void 0 !== (n = e[i]); i++)
                if (_e(n)) {
                    if (t = n[$e.expando]) {
                        if (t.events)
                            for (r in t.events) o[r] ? Te.event.remove(n, r) : Te.removeEvent(n, r, t.handle);
                        n[$e.expando] = void 0
                    }
                    n[Fe.expando] && (n[Fe.expando] = void 0)
                }
        }
    }), Te.fn.extend({
        detach: function(e) {
            return H(this, e, !0)
        },
        remove: function(e) {
            return H(this, e)
        },
        text: function(e) {
            return Ie(this, function(e) {
                return void 0 === e ? Te.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return M(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = A(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return M(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = A(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return M(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return M(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (Te.cleanData(w(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return Te.clone(this, e, t)
            })
        },
        html: function(e) {
            return Ie(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !st.test(e) && !et[(Qe.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = Te.htmlPrefilter(e);
                    try {
                        for (; n < r; n++) t = this[n] || {}, 1 === t.nodeType && (Te.cleanData(w(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return M(this, arguments, function(t) {
                var n = this.parentNode;
                Te.inArray(this, e) < 0 && (Te.cleanData(w(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), Te.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        Te.fn[e] = function(e) {
            for (var n, r = [], o = Te(e), i = o.length - 1, a = 0; a <= i; a++) n = a === i ? this : this.clone(!0), Te(o[a])[t](n), ce.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var ct = new RegExp("^(" + Ue + ")(?!px)[a-z%]+$", "i"),
        ft = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        },
        pt = new RegExp(Ke.join("|"), "i");
    ! function() {
        function t() {
            if (l) {
                u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", nt.appendChild(u).appendChild(l);
                var t = e.getComputedStyle(l);
                r = "1%" !== t.top, s = 12 === n(t.marginLeft), l.style.right = "60%", a = 36 === n(t.right), o = 36 === n(t.width), l.style.position = "absolute", i = 36 === l.offsetWidth || "absolute", nt.removeChild(u), l = null
            }
        }

        function n(e) {
            return Math.round(parseFloat(e))
        }
        var r, o, i, a, s, u = ae.createElement("div"),
            l = ae.createElement("div");
        l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", me.clearCloneStyle = "content-box" === l.style.backgroundClip, Te.extend(me, {
            boxSizingReliable: function() {
                return t(), o
            },
            pixelBoxStyles: function() {
                return t(), a
            },
            pixelPosition: function() {
                return t(), r
            },
            reliableMarginLeft: function() {
                return t(), s
            },
            scrollboxSize: function() {
                return t(), i
            }
        }))
    }();
    var dt = /^(none|table(?!-c[ea]).+)/,
        ht = /^--/,
        yt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        gt = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        mt = ["Webkit", "Moz", "ms"],
        vt = ae.createElement("div").style;
    Te.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = P(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, i, a, s = h(t),
                    u = ht.test(t),
                    l = e.style;
                return u || (t = R(s)), a = Te.cssHooks[t] || Te.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (o = a.get(e, !1, r)) ? o : l[t] : (i = typeof n, "string" === i && (o = Xe.exec(n)) && o[1] && (n = v(e, t, o), i = "number"), null != n && n === n && ("number" === i && (n += o && o[3] || (Te.cssNumber[s] ? "" : "px")), me.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n)), void 0)
            }
        },
        css: function(e, t, n, r) {
            var o, i, a, s = h(t),
                u = ht.test(t);
            return u || (t = R(s)), a = Te.cssHooks[t] || Te.cssHooks[s], a && "get" in a && (o = a.get(e, !0, n)), void 0 === o && (o = P(e, t, r)), "normal" === o && t in gt && (o = gt[t]), "" === n || n ? (i = parseFloat(o), n === !0 || isFinite(i) ? i || 0 : o) : o
        }
    }), Te.each(["height", "width"], function(e, t) {
        Te.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) return !dt.test(Te.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? $(e, t, r) : Ye(e, yt, function() {
                    return $(e, t, r)
                })
            },
            set: function(e, n, r) {
                var o, i = ft(e),
                    a = "border-box" === Te.css(e, "boxSizing", !1, i),
                    s = r && _(e, t, r, a, i);
                return a && me.scrollboxSize() === i.position && (s -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(i[t]) - _(e, t, "border", !1, i) - .5)), s && (o = Xe.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n, n = Te.css(e, t)), B(e, n, s)
            }
        }
    }), Te.cssHooks.marginLeft = O(me.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(P(e, "marginLeft")) || e.getBoundingClientRect().left - Ye(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px"
    }), Te.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        Te.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, o = {}, i = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) o[e + Ke[r] + t] = i[r] || i[r - 2] || i[0];
                return o
            }
        }, "margin" !== e && (Te.cssHooks[e + t].set = B)
    }), Te.fn.extend({
        css: function(e, t) {
            return Ie(this, function(e, t, n) {
                var r, o, i = {},
                    a = 0;
                if (Array.isArray(t)) {
                    for (r = ft(e), o = t.length; a < o; a++) i[t[a]] = Te.css(e, t[a], !1, r);
                    return i
                }
                return void 0 !== n ? Te.style(e, t, n) : Te.css(e, t)
            }, e, t, arguments.length > 1)
        }
    }), Te.Tween = F, F.prototype = {
        constructor: F,
        init: function(e, t, n, r, o, i) {
            this.elem = e, this.prop = n, this.easing = o || Te.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = i || (Te.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = F.propHooks[this.prop];
            return e && e.get ? e.get(this) : F.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = F.propHooks[this.prop];
            return this.options.duration ? this.pos = t = Te.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : F.propHooks._default.set(this), this
        }
    }, F.prototype.init.prototype = F.prototype, F.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = Te.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
            },
            set: function(e) {
                Te.fx.step[e.prop] ? Te.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[Te.cssProps[e.prop]] && !Te.cssHooks[e.prop] ? e.elem[e.prop] = e.now : Te.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, F.propHooks.scrollTop = F.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, Te.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, Te.fx = F.prototype.init, Te.fx.step = {};
    var bt, xt, wt = /^(?:toggle|show|hide)$/,
        Tt = /queueHooks$/;
    Te.Animation = Te.extend(Y, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return v(n.elem, e, Xe.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                ve(e) ? (t = e, e = ["*"]) : e = e.match(He);
                for (var n, r = 0, o = e.length; r < o; r++) n = e[r], Y.tweeners[n] = Y.tweeners[n] || [], Y.tweeners[n].unshift(t)
            },
            prefilters: [K],
            prefilter: function(e, t) {
                t ? Y.prefilters.unshift(e) : Y.prefilters.push(e)
            }
        }), Te.speed = function(e, t, n) {
            var r = e && "object" == typeof e ? Te.extend({}, e) : {
                complete: n || !n && t || ve(e) && e,
                duration: e,
                easing: n && t || t && !ve(t) && t
            };
            return Te.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in Te.fx.speeds ? r.duration = Te.fx.speeds[r.duration] : r.duration = Te.fx.speeds._default), null != r.queue && r.queue !== !0 || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                ve(r.old) && r.old.call(this), r.queue && Te.dequeue(this, r.queue)
            }, r
        }, Te.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(Ve).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(e, t, n, r) {
                var o = Te.isEmptyObject(e),
                    i = Te.speed(t, n, r),
                    a = function() {
                        var t = Y(this, Te.extend({}, e), i);
                        (o || $e.get(this, "finish")) && t.stop(!0)
                    };
                return a.finish = a, o || i.queue === !1 ? this.each(a) : this.queue(i.queue, a)
            },
            stop: function(e, t, n) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        o = null != e && e + "queueHooks",
                        i = Te.timers,
                        a = $e.get(this);
                    if (o) a[o] && a[o].stop && r(a[o]);
                    else
                        for (o in a) a[o] && a[o].stop && Tt.test(o) && r(a[o]);
                    for (o = i.length; o--;) i[o].elem !== this || null != e && i[o].queue !== e || (i[o].anim.stop(n), t = !1, i.splice(o, 1));
                    !t && n || Te.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, n = $e.get(this),
                        r = n[e + "queue"],
                        o = n[e + "queueHooks"],
                        i = Te.timers,
                        a = r ? r.length : 0;
                    for (n.finish = !0, Te.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = i.length; t--;) i[t].elem === this && i[t].queue === e && (i[t].anim.stop(!0), i.splice(t, 1));
                    for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }), Te.each(["toggle", "show", "hide"], function(e, t) {
            var n = Te.fn[t];
            Te.fn[t] = function(e, r, o) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(U(t, !0), e, r, o)
            }
        }), Te.each({
            slideDown: U("show"),
            slideUp: U("hide"),
            slideToggle: U("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            Te.fn[e] = function(e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), Te.timers = [], Te.fx.tick = function() {
            var e, t = 0,
                n = Te.timers;
            for (bt = Date.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
            n.length || Te.fx.stop(), bt = void 0
        }, Te.fx.timer = function(e) {
            Te.timers.push(e), Te.fx.start()
        }, Te.fx.interval = 13, Te.fx.start = function() {
            xt || (xt = !0, W())
        }, Te.fx.stop = function() {
            xt = null
        }, Te.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, Te.fn.delay = function(t, n) {
            return t = Te.fx ? Te.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, r) {
                var o = e.setTimeout(n, t);
                r.stop = function() {
                    e.clearTimeout(o)
                }
            })
        },
        function() {
            var e = ae.createElement("input"),
                t = ae.createElement("select"),
                n = t.appendChild(ae.createElement("option"));
            e.type = "checkbox", me.checkOn = "" !== e.value, me.optSelected = n.selected, e = ae.createElement("input"), e.value = "t", e.type = "radio", me.radioValue = "t" === e.value
        }();
    var kt, Ct = Te.expr.attrHandle;
    Te.fn.extend({
        attr: function(e, t) {
            return Ie(this, Te.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                Te.removeAttr(this, e)
            })
        }
    }), Te.extend({
        attr: function(e, t, n) {
            var r, o, i = e.nodeType;
            if (3 !== i && 8 !== i && 2 !== i) return "undefined" == typeof e.getAttribute ? Te.prop(e, t, n) : (1 === i && Te.isXMLDoc(e) || (o = Te.attrHooks[t.toLowerCase()] || (Te.expr.match.bool.test(t) ? kt : void 0)), void 0 !== n ? null === n ? void Te.removeAttr(e, t) : o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (r = o.get(e, t)) ? r : (r = Te.find.attr(e, t), null == r ? void 0 : r))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!me.radioValue && "radio" === t && i(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0,
                o = t && t.match(He);
            if (o && 1 === e.nodeType)
                for (; n = o[r++];) e.removeAttribute(n)
        }
    }), kt = {
        set: function(e, t, n) {
            return t === !1 ? Te.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, Te.each(Te.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = Ct[t] || Te.find.attr;
        Ct[t] = function(e, t, r) {
            var o, i, a = t.toLowerCase();
            return r || (i = Ct[a], Ct[a] = o, o = null != n(e, t, r) ? a : null, Ct[a] = i), o
        }
    });
    var Et = /^(?:input|select|textarea|button)$/i,
        St = /^(?:a|area)$/i;
    Te.fn.extend({
        prop: function(e, t) {
            return Ie(this, Te.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[Te.propFix[e] || e]
            })
        }
    }), Te.extend({
        prop: function(e, t, n) {
            var r, o, i = e.nodeType;
            if (3 !== i && 8 !== i && 2 !== i) return 1 === i && Te.isXMLDoc(e) || (t = Te.propFix[t] || t, o = Te.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : e[t] = n : o && "get" in o && null !== (r = o.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = Te.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Et.test(e.nodeName) || St.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), me.optSelected || (Te.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), Te.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        Te.propFix[this.toLowerCase()] = this
    }), Te.fn.extend({
        addClass: function(e) {
            var t, n, r, o, i, a, s, u = 0;
            if (ve(e)) return this.each(function(t) {
                Te(this).addClass(e.call(this, t, J(this)))
            });
            if (t = Q(e), t.length)
                for (; n = this[u++];)
                    if (o = J(n), r = 1 === n.nodeType && " " + G(o) + " ") {
                        for (a = 0; i = t[a++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        s = G(r), o !== s && n.setAttribute("class", s)
                    } return this
        },
        removeClass: function(e) {
            var t, n, r, o, i, a, s, u = 0;
            if (ve(e)) return this.each(function(t) {
                Te(this).removeClass(e.call(this, t, J(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if (t = Q(e), t.length)
                for (; n = this[u++];)
                    if (o = J(n), r = 1 === n.nodeType && " " + G(o) + " ") {
                        for (a = 0; i = t[a++];)
                            for (; r.indexOf(" " + i + " ") > -1;) r = r.replace(" " + i + " ", " ");
                        s = G(r), o !== s && n.setAttribute("class", s)
                    } return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                r = "string" === n || Array.isArray(e);
            return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : ve(e) ? this.each(function(n) {
                Te(this).toggleClass(e.call(this, n, J(this), t), t)
            }) : this.each(function() {
                var t, o, i, a;
                if (r)
                    for (o = 0, i = Te(this), a = Q(e); t = a[o++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else void 0 !== e && "boolean" !== n || (t = J(this), t && $e.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : $e.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++];)
                if (1 === n.nodeType && (" " + G(J(n)) + " ").indexOf(t) > -1) return !0;
            return !1
        }
    });
    var Nt = /\r/g;
    Te.fn.extend({
        val: function(e) {
            var t, n, r, o = this[0]; {
                if (arguments.length) return r = ve(e), this.each(function(n) {
                    var o;
                    1 === this.nodeType && (o = r ? e.call(this, n, Te(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = Te.map(o, function(e) {
                        return null == e ? "" : e + ""
                    })), t = Te.valHooks[this.type] || Te.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
                });
                if (o) return t = Te.valHooks[o.type] || Te.valHooks[o.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : (n = o.value, "string" == typeof n ? n.replace(Nt, "") : null == n ? "" : n)
            }
        }
    }), Te.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = Te.find.attr(e, "value");
                    return null != t ? t : G(Te.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, o = e.options,
                        a = e.selectedIndex,
                        s = "select-one" === e.type,
                        u = s ? null : [],
                        l = s ? a + 1 : o.length;
                    for (r = a < 0 ? l : s ? a : 0; r < l; r++)
                        if (n = o[r], (n.selected || r === a) && !n.disabled && (!n.parentNode.disabled || !i(n.parentNode, "optgroup"))) {
                            if (t = Te(n).val(), s) return t;
                            u.push(t)
                        } return u
                },
                set: function(e, t) {
                    for (var n, r, o = e.options, i = Te.makeArray(t), a = o.length; a--;) r = o[a], (r.selected = Te.inArray(Te.valHooks.option.get(r), i) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), i
                }
            }
        }
    }), Te.each(["radio", "checkbox"], function() {
        Te.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t)) return e.checked = Te.inArray(Te(e).val(), t) > -1
            }
        }, me.checkOn || (Te.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    }), me.focusin = "onfocusin" in e;
    var At = /^(?:focusinfocus|focusoutblur)$/,
        Dt = function(e) {
            e.stopPropagation()
        };
    Te.extend(Te.event, {
        trigger: function(t, n, r, o) {
            var i, a, s, u, l, c, f, p, d = [r || ae],
                h = he.call(t, "type") ? t.type : t,
                y = he.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = p = s = r = r || ae, 3 !== r.nodeType && 8 !== r.nodeType && !At.test(h + Te.event.triggered) && (h.indexOf(".") > -1 && (y = h.split("."), h = y.shift(), y.sort()), l = h.indexOf(":") < 0 && "on" + h, t = t[Te.expando] ? t : new Te.Event(h, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = y.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : Te.makeArray(n, [t]), f = Te.event.special[h] || {}, o || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                if (!o && !f.noBubble && !be(r)) {
                    for (u = f.delegateType || h, At.test(u + h) || (a = a.parentNode); a; a = a.parentNode) d.push(a), s = a;
                    s === (r.ownerDocument || ae) && d.push(s.defaultView || s.parentWindow || e)
                }
                for (i = 0;
                    (a = d[i++]) && !t.isPropagationStopped();) p = a, t.type = i > 1 ? u : f.bindType || h, c = ($e.get(a, "events") || {})[t.type] && $e.get(a, "handle"), c && c.apply(a, n), c = l && a[l], c && c.apply && _e(a) && (t.result = c.apply(a, n), t.result === !1 && t.preventDefault());
                return t.type = h, o || t.isDefaultPrevented() || f._default && f._default.apply(d.pop(), n) !== !1 || !_e(r) || l && ve(r[h]) && !be(r) && (s = r[l], s && (r[l] = null), Te.event.triggered = h, t.isPropagationStopped() && p.addEventListener(h, Dt), r[h](), t.isPropagationStopped() && p.removeEventListener(h, Dt), Te.event.triggered = void 0, s && (r[l] = s)), t.result
            }
        },
        simulate: function(e, t, n) {
            var r = Te.extend(new Te.Event, n, {
                type: e,
                isSimulated: !0
            });
            Te.event.trigger(r, null, t)
        }
    }), Te.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                Te.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return Te.event.trigger(e, t, n, !0)
        }
    }), me.focusin || Te.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            Te.event.simulate(t, e.target, Te.event.fix(e))
        };
        Te.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    o = $e.access(r, t);
                o || r.addEventListener(e, n, !0), $e.access(r, t, (o || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    o = $e.access(r, t) - 1;
                o ? $e.access(r, t, o) : (r.removeEventListener(e, n, !0), $e.remove(r, t))
            }
        }
    });
    var jt = e.location,
        Lt = Date.now(),
        qt = /\?/;
    Te.parseXML = function(t) {
        var n;
        if (!t || "string" != typeof t) return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (e) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || Te.error("Invalid XML: " + t), n
    };
    var Mt = /\[\]$/,
        Ht = /\r?\n/g,
        Pt = /^(?:submit|button|image|reset|file)$/i,
        Ot = /^(?:input|select|textarea|keygen)/i;
    Te.param = function(e, t) {
        var n, r = [],
            o = function(e, t) {
                var n = ve(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (Array.isArray(e) || e.jquery && !Te.isPlainObject(e)) Te.each(e, function() {
            o(this.name, this.value)
        });
        else
            for (n in e) Z(n, e[n], t, o);
        return r.join("&")
    }, Te.fn.extend({
        serialize: function() {
            return Te.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = Te.prop(this, "elements");
                return e ? Te.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !Te(this).is(":disabled") && Ot.test(this.nodeName) && !Pt.test(e) && (this.checked || !Je.test(e))
            }).map(function(e, t) {
                var n = Te(this).val();
                return null == n ? null : Array.isArray(n) ? Te.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Ht, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Ht, "\r\n")
                }
            }).get()
        }
    });
    var It = /%20/g,
        Rt = /#.*$/,
        Bt = /([?&])_=[^&]*/,
        _t = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        $t = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Ft = /^(?:GET|HEAD)$/,
        Wt = /^\/\//,
        zt = {},
        Ut = {},
        Xt = "*/".concat("*"),
        Kt = ae.createElement("a");
    Kt.href = jt.href, Te.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: jt.href,
            type: "GET",
            isLocal: $t.test(jt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Xt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": Te.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? ne(ne(e, Te.ajaxSettings), t) : ne(Te.ajaxSettings, e)
        },
        ajaxPrefilter: ee(zt),
        ajaxTransport: ee(Ut),
        ajax: function(t, n) {
            function r(t, n, r, s) {
                var l, p, d, x, w, T = n;
                c || (c = !0, u && e.clearTimeout(u), o = void 0, a = s || "", k.readyState = t > 0 ? 4 : 0, l = t >= 200 && t < 300 || 304 === t, r && (x = re(h, k, r)), x = oe(h, x, k, l), l ? (h.ifModified && (w = k.getResponseHeader("Last-Modified"), w && (Te.lastModified[i] = w), w = k.getResponseHeader("etag"), w && (Te.etag[i] = w)), 204 === t || "HEAD" === h.type ? T = "nocontent" : 304 === t ? T = "notmodified" : (T = x.state, p = x.data, d = x.error, l = !d)) : (d = T, !t && T || (T = "error", t < 0 && (t = 0))), k.status = t, k.statusText = (n || T) + "", l ? m.resolveWith(y, [p, T, k]) : m.rejectWith(y, [k, T, d]), k.statusCode(b), b = void 0, f && g.trigger(l ? "ajaxSuccess" : "ajaxError", [k, h, l ? p : d]), v.fireWith(y, [k, T]), f && (g.trigger("ajaxComplete", [k, h]), --Te.active || Te.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var o, i, a, s, u, l, c, f, p, d, h = Te.ajaxSetup({}, n),
                y = h.context || h,
                g = h.context && (y.nodeType || y.jquery) ? Te(y) : Te.event,
                m = Te.Deferred(),
                v = Te.Callbacks("once memory"),
                b = h.statusCode || {},
                x = {},
                w = {},
                T = "canceled",
                k = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (c) {
                            if (!s)
                                for (s = {}; t = _t.exec(a);) s[t[1].toLowerCase()] = t[2];
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return c ? a : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == c && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e, x[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return null == c && (h.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (c) k.always(e[k.status]);
                            else
                                for (t in e) b[t] = [b[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        var t = e || T;
                        return o && o.abort(t), r(0, t), this
                    }
                };
            if (m.promise(k), h.url = ((t || h.url || jt.href) + "").replace(Wt, jt.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(He) || [""], null == h.crossDomain) {
                l = ae.createElement("a");
                try {
                    l.href = h.url, l.href = l.href, h.crossDomain = Kt.protocol + "//" + Kt.host != l.protocol + "//" + l.host
                } catch (e) {
                    h.crossDomain = !0
                }
            }
            if (h.data && h.processData && "string" != typeof h.data && (h.data = Te.param(h.data, h.traditional)), te(zt, h, n, k), c) return k;
            f = Te.event && h.global, f && 0 === Te.active++ && Te.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Ft.test(h.type), i = h.url.replace(Rt, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(It, "+")) : (d = h.url.slice(i.length), h.data && (h.processData || "string" == typeof h.data) && (i += (qt.test(i) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (i = i.replace(Bt, "$1"), d = (qt.test(i) ? "&" : "?") + "_=" + Lt++ + d), h.url = i + d), h.ifModified && (Te.lastModified[i] && k.setRequestHeader("If-Modified-Since", Te.lastModified[i]), Te.etag[i] && k.setRequestHeader("If-None-Match", Te.etag[i])), (h.data && h.hasContent && h.contentType !== !1 || n.contentType) && k.setRequestHeader("Content-Type", h.contentType), k.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Xt + "; q=0.01" : "") : h.accepts["*"]);
            for (p in h.headers) k.setRequestHeader(p, h.headers[p]);
            if (h.beforeSend && (h.beforeSend.call(y, k, h) === !1 || c)) return k.abort();
            if (T = "abort", v.add(h.complete), k.done(h.success), k.fail(h.error), o = te(Ut, h, n, k)) {
                if (k.readyState = 1, f && g.trigger("ajaxSend", [k, h]), c) return k;
                h.async && h.timeout > 0 && (u = e.setTimeout(function() {
                    k.abort("timeout")
                }, h.timeout));
                try {
                    c = !1, o.send(x, r)
                } catch (e) {
                    if (c) throw e;
                    r(-1, e)
                }
            } else r(-1, "No Transport");
            return k
        },
        getJSON: function(e, t, n) {
            return Te.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return Te.get(e, void 0, t, "script")
        }
    }), Te.each(["get", "post"], function(e, t) {
        Te[t] = function(e, n, r, o) {
            return ve(n) && (o = o || r, r = n, n = void 0), Te.ajax(Te.extend({
                url: e,
                type: t,
                dataType: o,
                data: n,
                success: r
            }, Te.isPlainObject(e) && e))
        }
    }), Te._evalUrl = function(e) {
        return Te.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        })
    }, Te.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (ve(e) && (e = e.call(this[0])), t = Te(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function(e) {
            return ve(e) ? this.each(function(t) {
                Te(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = Te(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = ve(e);
            return this.each(function(n) {
                Te(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                Te(this).replaceWith(this.childNodes)
            }), this
        }
    }), Te.expr.pseudos.hidden = function(e) {
        return !Te.expr.pseudos.visible(e)
    }, Te.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, Te.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    };
    var Vt = {
            0: 200,
            1223: 204
        },
        Yt = Te.ajaxSettings.xhr();
    me.cors = !!Yt && "withCredentials" in Yt, me.ajax = Yt = !!Yt, Te.ajaxTransport(function(t) {
        var n, r;
        if (me.cors || Yt && !t.crossDomain) return {
            send: function(o, i) {
                var a, s = t.xhr();
                if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (a in t.xhrFields) s[a] = t.xhrFields[a];
                t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest");
                for (a in o) s.setRequestHeader(a, o[a]);
                n = function(e) {
                    return function() {
                        n && (n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? i(0, "error") : i(s.status, s.statusText) : i(Vt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                            binary: s.response
                        } : {
                            text: s.responseText
                        }, s.getAllResponseHeaders()))
                    }
                }, s.onload = n(), r = s.onerror = s.ontimeout = n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                    4 === s.readyState && e.setTimeout(function() {
                        n && r()
                    })
                }, n = n("abort");
                try {
                    s.send(t.hasContent && t.data || null)
                } catch (e) {
                    if (n) throw e
                }
            },
            abort: function() {
                n && n()
            }
        }
    }), Te.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }), Te.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return Te.globalEval(e), e
            }
        }
    }), Te.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), Te.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, o) {
                    t = Te("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
                    }), ae.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var Gt = [],
        Jt = /(=)\?(?=&|$)|\?\?/;
    Te.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Gt.pop() || Te.expando + "_" + Lt++;
            return this[e] = !0, e
        }
    }), Te.ajaxPrefilter("json jsonp", function(t, n, r) {
        var o, i, a, s = t.jsonp !== !1 && (Jt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Jt.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0]) return o = t.jsonpCallback = ve(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Jt, "$1" + o) : t.jsonp !== !1 && (t.url += (qt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function() {
            return a || Te.error(o + " was not called"), a[0]
        }, t.dataTypes[0] = "json", i = e[o], e[o] = function() {
            a = arguments
        }, r.always(function() {
            void 0 === i ? Te(e).removeProp(o) : e[o] = i, t[o] && (t.jsonpCallback = n.jsonpCallback, Gt.push(o)), a && ve(i) && i(a[0]), a = i = void 0
        }), "script"
    }), me.createHTMLDocument = function() {
        var e = ae.implementation.createHTMLDocument("").body;
        return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
    }(), Te.parseHTML = function(e, t, n) {
        if ("string" != typeof e) return [];
        "boolean" == typeof t && (n = t, t = !1);
        var r, o, i;
        return t || (me.createHTMLDocument ? (t = ae.implementation.createHTMLDocument(""), r = t.createElement("base"), r.href = ae.location.href, t.head.appendChild(r)) : t = ae), o = Ae.exec(e), i = !n && [], o ? [t.createElement(o[1])] : (o = k([e], t, i), i && i.length && Te(i).remove(), Te.merge([], o.childNodes))
    }, Te.fn.load = function(e, t, n) {
        var r, o, i, a = this,
            s = e.indexOf(" ");
        return s > -1 && (r = G(e.slice(s)), e = e.slice(0, s)), ve(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), a.length > 0 && Te.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            i = arguments, a.html(r ? Te("<div>").append(Te.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, i || [e.responseText, t, e])
            })
        }), this
    }, Te.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        Te.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), Te.expr.pseudos.animated = function(e) {
        return Te.grep(Te.timers, function(t) {
            return e === t.elem
        }).length
    }, Te.offset = {
        setOffset: function(e, t, n) {
            var r, o, i, a, s, u, l, c = Te.css(e, "position"),
                f = Te(e),
                p = {};
            "static" === c && (e.style.position = "relative"), s = f.offset(), i = Te.css(e, "top"), u = Te.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (i + u).indexOf("auto") > -1, l ? (r = f.position(), a = r.top, o = r.left) : (a = parseFloat(i) || 0, o = parseFloat(u) || 0), ve(t) && (t = t.call(e, n, Te.extend({}, s))), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + o), "using" in t ? t.using.call(e, p) : f.css(p)
        }
    }, Te.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                Te.offset.setOffset(this, e, t)
            });
            var t, n, r = this[0];
            if (r) return r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                top: t.top + n.pageYOffset,
                left: t.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            }
        },
        position: function() {
            if (this[0]) {
                var e, t, n, r = this[0],
                    o = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === Te.css(r, "position")) t = r.getBoundingClientRect();
                else {
                    for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === Te.css(e, "position");) e = e.parentNode;
                    e && e !== r && 1 === e.nodeType && (o = Te(e).offset(), o.top += Te.css(e, "borderTopWidth", !0), o.left += Te.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - o.top - Te.css(r, "marginTop", !0),
                    left: t.left - o.left - Te.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === Te.css(e, "position");) e = e.offsetParent;
                return e || nt
            })
        }
    }), Te.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        Te.fn[e] = function(r) {
            return Ie(this, function(e, r, o) {
                var i;
                return be(e) ? i = e : 9 === e.nodeType && (i = e.defaultView), void 0 === o ? i ? i[t] : e[r] : void(i ? i.scrollTo(n ? i.pageXOffset : o, n ? o : i.pageYOffset) : e[r] = o)
            }, e, r, arguments.length)
        }
    }), Te.each(["top", "left"], function(e, t) {
        Te.cssHooks[t] = O(me.pixelPosition, function(e, n) {
            if (n) return n = P(e, t), ct.test(n) ? Te(e).position()[t] + "px" : n
        })
    }), Te.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        Te.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            Te.fn[r] = function(o, i) {
                var a = arguments.length && (n || "boolean" != typeof o),
                    s = n || (o === !0 || i === !0 ? "margin" : "border");
                return Ie(this, function(t, n, o) {
                    var i;
                    return be(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === o ? Te.css(t, n, s) : Te.style(t, n, o, s)
                }, t, a ? o : void 0, a)
            }
        })
    }), Te.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
        Te.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), Te.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), Te.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), Te.proxy = function(e, t) {
        var n, r, o;
        if ("string" == typeof t && (n = e[t], t = e, e = n), ve(e)) return r = ue.call(arguments, 2), o = function() {
            return e.apply(t || this, r.concat(ue.call(arguments)))
        }, o.guid = e.guid = e.guid || Te.guid++, o
    }, Te.holdReady = function(e) {
        e ? Te.readyWait++ : Te.ready(!0)
    }, Te.isArray = Array.isArray, Te.parseJSON = JSON.parse, Te.nodeName = i, Te.isFunction = ve, Te.isWindow = be, Te.camelCase = h, Te.type = r, Te.now = Date.now, Te.isNumeric = function(e) {
        var t = Te.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return Te
    });
    var Qt = e.jQuery,
        Zt = e.$;
    return Te.noConflict = function(t) {
        return e.$ === Te && (e.$ = Zt), t && e.jQuery === Te && (e.jQuery = Qt), Te
    }, t || (e.jQuery = e.$ = Te), Te
}),
function(e, t, n) {
    function r(e, t, n) {
        return e.addEventListener ? void e.addEventListener(t, n, !1) : void e.attachEvent("on" + t, n)
    }

    function o(e) {
        if ("keypress" == e.type) {
            var t = String.fromCharCode(e.which);
            return e.shiftKey || (t = t.toLowerCase()), t
        }
        return m[e.which] ? m[e.which] : v[e.which] ? v[e.which] : String.fromCharCode(e.which).toLowerCase()
    }

    function i(e, t) {
        return e.sort().join(",") === t.sort().join(",")
    }

    function a(e) {
        var t = [];
        return e.shiftKey && t.push("shift"), e.altKey && t.push("alt"), e.ctrlKey && t.push("ctrl"), e.metaKey && t.push("meta"), t
    }

    function s(e) {
        return e.preventDefault ? void e.preventDefault() : void(e.returnValue = !1)
    }

    function u(e) {
        return e.stopPropagation ? void e.stopPropagation() : void(e.cancelBubble = !0)
    }

    function l(e) {
        return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e
    }

    function c() {
        if (!g) {
            g = {};
            for (var e in m) e > 95 && e < 112 || m.hasOwnProperty(e) && (g[m[e]] = e)
        }
        return g
    }

    function f(e, t, n) {
        return n || (n = c()[e] ? "keydown" : "keypress"), "keypress" == n && t.length && (n = "keydown"), n
    }

    function p(e) {
        return "+" === e ? ["+"] : (e = e.replace(/\+{2}/g, "+plus"), e.split("+"))
    }

    function d(e, t) {
        var n, r, o, i = [];
        for (n = p(e), o = 0; o < n.length; ++o) r = n[o], x[r] && (r = x[r]), t && "keypress" != t && b[r] && (r = b[r], i.push("shift")), l(r) && i.push(r);
        return t = f(r, i, t), {
            key: r,
            modifiers: i,
            action: t
        }
    }

    function h(e, n) {
        return null !== e && e !== t && (e === n || h(e.parentNode, n))
    }

    function y(e) {
        function n(e) {
            e = e || {};
            var t, n = !1;
            for (t in x) e[t] ? n = !0 : x[t] = 0;
            n || (k = !1)
        }

        function c(e, t, n, r, o, a) {
            var s, u, c = [],
                f = n.type;
            if (!v._callbacks[e]) return [];
            for ("keyup" == f && l(e) && (t = [e]), s = 0; s < v._callbacks[e].length; ++s)
                if (u = v._callbacks[e][s], (r || !u.seq || x[u.seq] == u.level) && f == u.action && ("keypress" == f && !n.metaKey && !n.ctrlKey || i(t, u.modifiers))) {
                    var p = !r && u.combo == o,
                        d = r && u.seq == r && u.level == a;
                    (p || d) && v._callbacks[e].splice(s, 1), c.push(u)
                } return c
        }

        function f(e, t, n, r) {
            v.stopCallback(t, t.target || t.srcElement, n, r) || e(t, n) === !1 && (s(t), u(t))
        }

        function p(e) {
            "number" != typeof e.which && (e.which = e.keyCode);
            var t = o(e);
            if (t) return "keyup" == e.type && w === t ? void(w = !1) : void v.handleKey(t, a(e), e)
        }

        function h() {
            clearTimeout(b), b = setTimeout(n, 1e3)
        }

        function g(e, t, r, i) {
            function a(t) {
                return function() {
                    k = t, ++x[e], h()
                }
            }

            function s(t) {
                f(r, t, e), "keyup" !== i && (w = o(t)), setTimeout(n, 10)
            }
            x[e] = 0;
            for (var u = 0; u < t.length; ++u) {
                var l = u + 1 === t.length,
                    c = l ? s : a(i || d(t[u + 1]).action);
                m(t[u], c, i, e, u)
            }
        }

        function m(e, t, n, r, o) {
            v._directMap[e + ":" + n] = t, e = e.replace(/\s+/g, " ");
            var i, a = e.split(" ");
            return a.length > 1 ? void g(e, a, t, n) : (i = d(e, n), v._callbacks[i.key] = v._callbacks[i.key] || [], c(i.key, i.modifiers, {
                type: i.action
            }, r, e, o), void v._callbacks[i.key][r ? "unshift" : "push"]({
                callback: t,
                modifiers: i.modifiers,
                action: i.action,
                seq: r,
                level: o,
                combo: e
            }))
        }
        var v = this;
        if (e = e || t, !(v instanceof y)) return new y(e);
        v.target = e, v._callbacks = {}, v._directMap = {};
        var b, x = {},
            w = !1,
            T = !1,
            k = !1;
        v._handleKey = function(e, t, r) {
            var o, i = c(e, t, r),
                a = {},
                s = 0,
                u = !1;
            for (o = 0; o < i.length; ++o) i[o].seq && (s = Math.max(s, i[o].level));
            for (o = 0; o < i.length; ++o)
                if (i[o].seq) {
                    if (i[o].level != s) continue;
                    u = !0, a[i[o].seq] = 1, f(i[o].callback, r, i[o].combo, i[o].seq)
                } else u || f(i[o].callback, r, i[o].combo);
            var p = "keypress" == r.type && T;
            r.type != k || l(e) || p || n(a), T = u && "keydown" == r.type
        }, v._bindMultiple = function(e, t, n) {
            for (var r = 0; r < e.length; ++r) m(e[r], t, n)
        }, r(e, "keypress", p), r(e, "keydown", p), r(e, "keyup", p)
    }
    if (e) {
        for (var g, m = {
                8: "backspace",
                9: "tab",
                13: "enter",
                16: "shift",
                17: "ctrl",
                18: "alt",
                20: "capslock",
                27: "esc",
                32: "space",
                33: "pageup",
                34: "pagedown",
                35: "end",
                36: "home",
                37: "left",
                38: "up",
                39: "right",
                40: "down",
                45: "ins",
                46: "del",
                91: "meta",
                93: "meta",
                224: "meta"
            }, v = {
                106: "*",
                107: "+",
                109: "-",
                110: ".",
                111: "/",
                186: ";",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'"
            }, b = {
                "~": "`",
                "!": "1",
                "@": "2",
                "#": "3",
                $: "4",
                "%": "5",
                "^": "6",
                "&": "7",
                "*": "8",
                "(": "9",
                ")": "0",
                _: "-",
                "+": "=",
                ":": ";",
                '"': "'",
                "<": ",",
                ">": ".",
                "?": "/",
                "|": "\\"
            }, x = {
                option: "alt",
                command: "meta",
                return: "enter",
                escape: "esc",
                plus: "+",
                mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
            }, w = 1; w < 20; ++w) m[111 + w] = "f" + w;
        for (w = 0; w <= 9; ++w) m[w + 96] = w.toString();
        y.prototype.bind = function(e, t, n) {
            var r = this;
            return e = e instanceof Array ? e : [e], r._bindMultiple.call(r, e, t, n), r
        }, y.prototype.unbind = function(e, t) {
            var n = this;
            return n.bind.call(n, e, function() {}, t)
        }, y.prototype.trigger = function(e, t) {
            var n = this;
            return n._directMap[e + ":" + t] && n._directMap[e + ":" + t]({}, e), n
        }, y.prototype.reset = function() {
            var e = this;
            return e._callbacks = {}, e._directMap = {}, e
        }, y.prototype.stopCallback = function(e, t) {
            var n = this;
            return !((" " + t.className + " ").indexOf(" mousetrap ") > -1) && (!h(t, n.target) && ("INPUT" == t.tagName || "SELECT" == t.tagName || "TEXTAREA" == t.tagName || t.isContentEditable))
        }, y.prototype.handleKey = function() {
            var e = this;
            return e._handleKey.apply(e, arguments)
        }, y.addKeycodes = function(e) {
            for (var t in e) e.hasOwnProperty(t) && (m[t] = e[t]);
            g = null
        }, y.init = function() {
            var e = y(t);
            for (var n in e) "_" !== n.charAt(0) && (y[n] = function(t) {
                return function() {
                    return e[t].apply(e, arguments)
                }
            }(n))
        }, y.init(), e.Mousetrap = y, "undefined" != typeof module && module.exports && (module.exports = y), "function" == typeof define && define.amd && define(function() {
            return y
        })
    }
}("undefined" != typeof window ? window : null, "undefined" != typeof window ? document : null), Array.isArray || (Array.isArray = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }), String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    }), Array.prototype.forEach || (Array.prototype.forEach = function(e, t) {
        var n, r;
        if (null == this) throw new TypeError(" this is null or not defined");
        var o = Object(this),
            i = o.length >>> 0;
        if ("function" != typeof e) throw new TypeError(e + " is not a function");
        for (arguments.length > 1 && (n = t), r = 0; r < i;) {
            var a;
            r in o && (a = o[r], e.call(n, a, r, o)), r++
        }
    }),
    function(e, t) {
        "use strict";
        var n = function() {
            return this.version = "1.0.0", this.url = "https://source.unsplash.com", this.dimensions = {}, this.scope = "featured", this.randomizationInterval = "perRequest", this
        };
        n.prototype.find = function(e) {
            return this.id = e, this
        }, n.prototype.width = function(e) {
            return this.dimensions.width = e, this
        }, n.prototype.height = function(e) {
            return this.dimensions.height = e, this
        }, n.prototype.size = function(e, t) {
            return this.dimensions = {
                width: e,
                height: t || e
            }, this
        }, n.prototype.randomize = function(e) {
            return "daily" == e || "weekly" == e ? this.randomizationInterval = e : this.randomizationInterval = "perRequest", this
        }, n.prototype.all = function() {
            return this.scope = "all", this
        }, n.prototype.of = function(e) {
            var t = [];
            return Array.isArray(e) || (e = e.split(",")), e.forEach(function(e) {
                t.push(e.trim())
            }), this.keywords = t.join(","), this.keywords = encodeURI(this.keywords), this
        }, n.prototype.fromUser = function(e) {
            return this.username = e, this
        }, n.prototype.fromCategory = function(e) {
            return this.category = e, this
        }, n.prototype._hasDimensions = function() {
            return !!this.dimensions.width && !!this.dimensions.height
        }, n.prototype._appendDimensions = function() {
            return this._hasDimensions() && (this.url += "/" + this.dimensions.width + "x" + this.dimensions.height), this.url
        }, n.prototype._appendScope = function() {
            return "all" == this.scope && (this.url += "/all"), this.url
        }, n.prototype._appendKeywords = function() {
            return this.keywords && (this.url += "?" + this.keywords), this.url
        }, n.prototype._appendRandomization = function(e) {
            return e && "perRequest" == this.randomizationInterval ? this.url += "/random" : "daily" == this.randomizationInterval ? this.url += "/daily" : "weekly" == this.randomizationInterval && (this.url += "/weekly"), this.url
        }, n.prototype.fetch = function() {
            return this.id ? (this.url += "/" + this.id, this._appendDimensions(), this.url) : this.username ? (this.url += "/user/" + this.username, this._appendScope(), this._appendDimensions(), this._appendRandomization(!1), this._appendKeywords(), this.url) : this.category ? (this.url += "/category/" + this.category, this._appendScope(), this._appendDimensions(), this._appendRandomization(!1), this._appendKeywords(), this.url) : (this._appendScope(), this._appendDimensions(), this._appendRandomization(!0), this._appendKeywords(), this.url)
        }, e.UnsplashPhoto = n
    }(this), $(function() {
        startTime(), randomQuote(), randomBackground(), bindMousetraps(), geolocWeather(), lastfmRequest(), gmailRequest(), $("li a.parent").click(function() {
            $(this).parent("li").find("ul").slideToggle(150), $(this).toggleClass("active")
        }), document.getElementById("background").addEventListener("click", resetMousetraps, !1), document.getElementById("modal").addEventListener("click", closeModal, !1)
    });
