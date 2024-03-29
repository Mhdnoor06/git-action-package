import { a5 as ta, a6 as ie, P as G, y as Ee } from "./index-XkptO5g9.mjs";
import $, { isValidElement as at, Children as Xt, PureComponent as wt, cloneElement as ge, forwardRef as Bv, useRef as ba, useImperativeHandle as Fv, useState as Uu, useCallback as Uv, useEffect as Wu, useMemo as qd, createElement as zd, createContext as er, useContext as li, Component as Wv } from "react";
import { i as He } from "./tiny-invariant-DMZZPERl.mjs";
import "react-dom";
function Hd(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number")
    n += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var a = e.length;
      for (t = 0; t < a; t++)
        e[t] && (r = Hd(e[t])) && (n && (n += " "), n += r);
    } else
      for (r in e)
        e[r] && (n && (n += " "), n += r);
  return n;
}
function ve() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++)
    (e = arguments[r]) && (t = Hd(e)) && (n && (n += " "), n += t);
  return n;
}
var qv = Array.isArray, Ie = qv, zv = typeof ta == "object" && ta && ta.Object === Object && ta, Kd = zv, Hv = Kd, Kv = typeof self == "object" && self && self.Object === Object && self, Gv = Hv || Kv || Function("return this")(), st = Gv, Xv = st, Vv = Xv.Symbol, qn = Vv, Xc = qn, Gd = Object.prototype, Yv = Gd.hasOwnProperty, Zv = Gd.toString, Wr = Xc ? Xc.toStringTag : void 0;
function Jv(e) {
  var t = Yv.call(e, Wr), r = e[Wr];
  try {
    e[Wr] = void 0;
    var n = !0;
  } catch {
  }
  var a = Zv.call(e);
  return n && (t ? e[Wr] = r : delete e[Wr]), a;
}
var Qv = Jv, ey = Object.prototype, ty = ey.toString;
function ry(e) {
  return ty.call(e);
}
var ny = ry, Vc = qn, ay = Qv, iy = ny, oy = "[object Null]", uy = "[object Undefined]", Yc = Vc ? Vc.toStringTag : void 0;
function cy(e) {
  return e == null ? e === void 0 ? uy : oy : Yc && Yc in Object(e) ? ay(e) : iy(e);
}
var Ot = cy;
function sy(e) {
  return e != null && typeof e == "object";
}
var St = sy, ly = Ot, fy = St, dy = "[object Symbol]";
function hy(e) {
  return typeof e == "symbol" || fy(e) && ly(e) == dy;
}
var Mr = hy, py = Ie, vy = Mr, yy = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, gy = /^\w*$/;
function my(e, t) {
  if (py(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || vy(e) ? !0 : gy.test(e) || !yy.test(e) || t != null && e in Object(t);
}
var qu = my;
function by(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var jt = by;
const jr = /* @__PURE__ */ ie(jt);
var xy = Ot, wy = jt, Oy = "[object AsyncFunction]", Sy = "[object Function]", Ay = "[object GeneratorFunction]", _y = "[object Proxy]";
function $y(e) {
  if (!wy(e))
    return !1;
  var t = xy(e);
  return t == Sy || t == Ay || t == Oy || t == _y;
}
var zu = $y;
const Y = /* @__PURE__ */ ie(zu);
var Py = st, Ty = Py["__core-js_shared__"], Ey = Ty, Ki = Ey, Zc = function() {
  var e = /[^.]+$/.exec(Ki && Ki.keys && Ki.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function My(e) {
  return !!Zc && Zc in e;
}
var jy = My, Iy = Function.prototype, Cy = Iy.toString;
function ky(e) {
  if (e != null) {
    try {
      return Cy.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Xd = ky, Ny = zu, Dy = jy, Ry = jt, Ly = Xd, By = /[\\^$.*+?()[\]{}|]/g, Fy = /^\[object .+?Constructor\]$/, Uy = Function.prototype, Wy = Object.prototype, qy = Uy.toString, zy = Wy.hasOwnProperty, Hy = RegExp(
  "^" + qy.call(zy).replace(By, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ky(e) {
  if (!Ry(e) || Dy(e))
    return !1;
  var t = Ny(e) ? Hy : Fy;
  return t.test(Ly(e));
}
var Gy = Ky;
function Xy(e, t) {
  return e == null ? void 0 : e[t];
}
var Vy = Xy, Yy = Gy, Zy = Vy;
function Jy(e, t) {
  var r = Zy(e, t);
  return Yy(r) ? r : void 0;
}
var tr = Jy, Qy = tr, eg = Qy(Object, "create"), fi = eg, Jc = fi;
function tg() {
  this.__data__ = Jc ? Jc(null) : {}, this.size = 0;
}
var rg = tg;
function ng(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var ag = ng, ig = fi, og = "__lodash_hash_undefined__", ug = Object.prototype, cg = ug.hasOwnProperty;
function sg(e) {
  var t = this.__data__;
  if (ig) {
    var r = t[e];
    return r === og ? void 0 : r;
  }
  return cg.call(t, e) ? t[e] : void 0;
}
var lg = sg, fg = fi, dg = Object.prototype, hg = dg.hasOwnProperty;
function pg(e) {
  var t = this.__data__;
  return fg ? t[e] !== void 0 : hg.call(t, e);
}
var vg = pg, yg = fi, gg = "__lodash_hash_undefined__";
function mg(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = yg && t === void 0 ? gg : t, this;
}
var bg = mg, xg = rg, wg = ag, Og = lg, Sg = vg, Ag = bg;
function Ir(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Ir.prototype.clear = xg;
Ir.prototype.delete = wg;
Ir.prototype.get = Og;
Ir.prototype.has = Sg;
Ir.prototype.set = Ag;
var _g = Ir;
function $g() {
  this.__data__ = [], this.size = 0;
}
var Pg = $g;
function Tg(e, t) {
  return e === t || e !== e && t !== t;
}
var Hu = Tg, Eg = Hu;
function Mg(e, t) {
  for (var r = e.length; r--; )
    if (Eg(e[r][0], t))
      return r;
  return -1;
}
var di = Mg, jg = di, Ig = Array.prototype, Cg = Ig.splice;
function kg(e) {
  var t = this.__data__, r = jg(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : Cg.call(t, r, 1), --this.size, !0;
}
var Ng = kg, Dg = di;
function Rg(e) {
  var t = this.__data__, r = Dg(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var Lg = Rg, Bg = di;
function Fg(e) {
  return Bg(this.__data__, e) > -1;
}
var Ug = Fg, Wg = di;
function qg(e, t) {
  var r = this.__data__, n = Wg(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var zg = qg, Hg = Pg, Kg = Ng, Gg = Lg, Xg = Ug, Vg = zg;
function Cr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Cr.prototype.clear = Hg;
Cr.prototype.delete = Kg;
Cr.prototype.get = Gg;
Cr.prototype.has = Xg;
Cr.prototype.set = Vg;
var hi = Cr, Yg = tr, Zg = st, Jg = Yg(Zg, "Map"), Ku = Jg, Qc = _g, Qg = hi, em = Ku;
function tm() {
  this.size = 0, this.__data__ = {
    hash: new Qc(),
    map: new (em || Qg)(),
    string: new Qc()
  };
}
var rm = tm;
function nm(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var am = nm, im = am;
function om(e, t) {
  var r = e.__data__;
  return im(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var pi = om, um = pi;
function cm(e) {
  var t = um(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var sm = cm, lm = pi;
function fm(e) {
  return lm(this, e).get(e);
}
var dm = fm, hm = pi;
function pm(e) {
  return hm(this, e).has(e);
}
var vm = pm, ym = pi;
function gm(e, t) {
  var r = ym(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var mm = gm, bm = rm, xm = sm, wm = dm, Om = vm, Sm = mm;
function kr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
kr.prototype.clear = bm;
kr.prototype.delete = xm;
kr.prototype.get = wm;
kr.prototype.has = Om;
kr.prototype.set = Sm;
var Gu = kr, Vd = Gu, Am = "Expected a function";
function Xu(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Am);
  var r = function() {
    var n = arguments, a = t ? t.apply(this, n) : n[0], i = r.cache;
    if (i.has(a))
      return i.get(a);
    var o = e.apply(this, n);
    return r.cache = i.set(a, o) || i, o;
  };
  return r.cache = new (Xu.Cache || Vd)(), r;
}
Xu.Cache = Vd;
var Yd = Xu;
const _m = /* @__PURE__ */ ie(Yd);
var $m = Yd, Pm = 500;
function Tm(e) {
  var t = $m(e, function(n) {
    return r.size === Pm && r.clear(), n;
  }), r = t.cache;
  return t;
}
var Em = Tm, Mm = Em, jm = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Im = /\\(\\)?/g, Cm = Mm(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(jm, function(r, n, a, i) {
    t.push(a ? i.replace(Im, "$1") : n || r);
  }), t;
}), km = Cm;
function Nm(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = Array(n); ++r < n; )
    a[r] = t(e[r], r, e);
  return a;
}
var Vu = Nm, es = qn, Dm = Vu, Rm = Ie, Lm = Mr, Bm = 1 / 0, ts = es ? es.prototype : void 0, rs = ts ? ts.toString : void 0;
function Zd(e) {
  if (typeof e == "string")
    return e;
  if (Rm(e))
    return Dm(e, Zd) + "";
  if (Lm(e))
    return rs ? rs.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Bm ? "-0" : t;
}
var Fm = Zd, Um = Fm;
function Wm(e) {
  return e == null ? "" : Um(e);
}
var Jd = Wm, qm = Ie, zm = qu, Hm = km, Km = Jd;
function Gm(e, t) {
  return qm(e) ? e : zm(e, t) ? [e] : Hm(Km(e));
}
var Qd = Gm, Xm = Mr, Vm = 1 / 0;
function Ym(e) {
  if (typeof e == "string" || Xm(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Vm ? "-0" : t;
}
var vi = Ym, Zm = Qd, Jm = vi;
function Qm(e, t) {
  t = Zm(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[Jm(t[r++])];
  return r && r == n ? e : void 0;
}
var Yu = Qm, eb = Yu;
function tb(e, t, r) {
  var n = e == null ? void 0 : eb(e, t);
  return n === void 0 ? r : n;
}
var eh = tb;
const Je = /* @__PURE__ */ ie(eh);
function rb(e) {
  return e == null;
}
var nb = rb;
const J = /* @__PURE__ */ ie(nb);
var ab = Ot, ib = Ie, ob = St, ub = "[object String]";
function cb(e) {
  return typeof e == "string" || !ib(e) && ob(e) && ab(e) == ub;
}
var sb = cb;
const zn = /* @__PURE__ */ ie(sb);
var So = { exports: {} }, ee = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ns;
function lb() {
  return ns || (ns = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, l = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, b = e ? Symbol.for("react.responder") : 60118, x = e ? Symbol.for("react.scope") : 60119;
    function w(P) {
      return typeof P == "string" || typeof P == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      P === n || P === s || P === i || P === a || P === l || P === d || typeof P == "object" && P !== null && (P.$$typeof === y || P.$$typeof === h || P.$$typeof === o || P.$$typeof === u || P.$$typeof === f || P.$$typeof === v || P.$$typeof === b || P.$$typeof === x || P.$$typeof === g);
    }
    function O(P) {
      if (typeof P == "object" && P !== null) {
        var oe = P.$$typeof;
        switch (oe) {
          case t:
            var V = P.type;
            switch (V) {
              case c:
              case s:
              case n:
              case i:
              case a:
              case l:
                return V;
              default:
                var de = V && V.$$typeof;
                switch (de) {
                  case u:
                  case f:
                  case y:
                  case h:
                  case o:
                    return de;
                  default:
                    return oe;
                }
            }
          case r:
            return oe;
        }
      }
    }
    var p = c, m = s, S = u, A = o, _ = t, M = f, T = n, E = y, k = h, j = r, C = i, N = a, D = l, R = !1;
    function F(P) {
      return R || (R = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), H(P) || O(P) === c;
    }
    function H(P) {
      return O(P) === s;
    }
    function re(P) {
      return O(P) === u;
    }
    function q(P) {
      return O(P) === o;
    }
    function fe(P) {
      return typeof P == "object" && P !== null && P.$$typeof === t;
    }
    function Le(P) {
      return O(P) === f;
    }
    function Pe(P) {
      return O(P) === n;
    }
    function $t(P) {
      return O(P) === y;
    }
    function Nt(P) {
      return O(P) === h;
    }
    function Te(P) {
      return O(P) === r;
    }
    function B(P) {
      return O(P) === i;
    }
    function z(P) {
      return O(P) === a;
    }
    function K(P) {
      return O(P) === l;
    }
    ee.AsyncMode = p, ee.ConcurrentMode = m, ee.ContextConsumer = S, ee.ContextProvider = A, ee.Element = _, ee.ForwardRef = M, ee.Fragment = T, ee.Lazy = E, ee.Memo = k, ee.Portal = j, ee.Profiler = C, ee.StrictMode = N, ee.Suspense = D, ee.isAsyncMode = F, ee.isConcurrentMode = H, ee.isContextConsumer = re, ee.isContextProvider = q, ee.isElement = fe, ee.isForwardRef = Le, ee.isFragment = Pe, ee.isLazy = $t, ee.isMemo = Nt, ee.isPortal = Te, ee.isProfiler = B, ee.isStrictMode = z, ee.isSuspense = K, ee.isValidElementType = w, ee.typeOf = O;
  }()), ee;
}
var te = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var as;
function fb() {
  if (as)
    return te;
  as = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, l = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, b = e ? Symbol.for("react.responder") : 60118, x = e ? Symbol.for("react.scope") : 60119;
  function w(p) {
    if (typeof p == "object" && p !== null) {
      var m = p.$$typeof;
      switch (m) {
        case t:
          switch (p = p.type, p) {
            case c:
            case s:
            case n:
            case i:
            case a:
            case l:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case u:
                case f:
                case y:
                case h:
                case o:
                  return p;
                default:
                  return m;
              }
          }
        case r:
          return m;
      }
    }
  }
  function O(p) {
    return w(p) === s;
  }
  return te.AsyncMode = c, te.ConcurrentMode = s, te.ContextConsumer = u, te.ContextProvider = o, te.Element = t, te.ForwardRef = f, te.Fragment = n, te.Lazy = y, te.Memo = h, te.Portal = r, te.Profiler = i, te.StrictMode = a, te.Suspense = l, te.isAsyncMode = function(p) {
    return O(p) || w(p) === c;
  }, te.isConcurrentMode = O, te.isContextConsumer = function(p) {
    return w(p) === u;
  }, te.isContextProvider = function(p) {
    return w(p) === o;
  }, te.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === t;
  }, te.isForwardRef = function(p) {
    return w(p) === f;
  }, te.isFragment = function(p) {
    return w(p) === n;
  }, te.isLazy = function(p) {
    return w(p) === y;
  }, te.isMemo = function(p) {
    return w(p) === h;
  }, te.isPortal = function(p) {
    return w(p) === r;
  }, te.isProfiler = function(p) {
    return w(p) === i;
  }, te.isStrictMode = function(p) {
    return w(p) === a;
  }, te.isSuspense = function(p) {
    return w(p) === l;
  }, te.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === n || p === s || p === i || p === a || p === l || p === d || typeof p == "object" && p !== null && (p.$$typeof === y || p.$$typeof === h || p.$$typeof === o || p.$$typeof === u || p.$$typeof === f || p.$$typeof === v || p.$$typeof === b || p.$$typeof === x || p.$$typeof === g);
  }, te.typeOf = w, te;
}
process.env.NODE_ENV === "production" ? So.exports = fb() : So.exports = lb();
var Ao = So.exports, db = Ot, hb = St, pb = "[object Number]";
function vb(e) {
  return typeof e == "number" || hb(e) && db(e) == pb;
}
var th = vb;
const yb = /* @__PURE__ */ ie(th);
var gb = th;
function mb(e) {
  return gb(e) && e != +e;
}
var bb = mb;
const Hn = /* @__PURE__ */ ie(bb);
var Ke = function(t) {
  return t === 0 ? 0 : t > 0 ? 1 : -1;
}, Ht = function(t) {
  return zn(t) && t.indexOf("%") === t.length - 1;
}, L = function(t) {
  return yb(t) && !Hn(t);
}, we = function(t) {
  return L(t) || zn(t);
}, xb = 0, yi = function(t) {
  var r = ++xb;
  return "".concat(t || "").concat(r);
}, Re = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!L(t) && !zn(t))
    return n;
  var i;
  if (Ht(t)) {
    var o = t.indexOf("%");
    i = r * parseFloat(t.slice(0, o)) / 100;
  } else
    i = +t;
  return Hn(i) && (i = n), a && i > r && (i = r), i;
}, Pt = function(t) {
  if (!t)
    return null;
  var r = Object.keys(t);
  return r && r.length ? t[r[0]] : null;
}, wb = function(t) {
  if (!Array.isArray(t))
    return !1;
  for (var r = t.length, n = {}, a = 0; a < r; a++)
    if (!n[t[a]])
      n[t[a]] = !0;
    else
      return !0;
  return !1;
}, is = function(t, r) {
  return L(t) && L(r) ? function(n) {
    return t + n * (r - t);
  } : function() {
    return r;
  };
};
function _o(e, t, r) {
  return !e || !e.length ? null : e.find(function(n) {
    return n && (typeof t == "function" ? t(n) : Je(n, t)) === r;
  });
}
function $o(e, t) {
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r) && (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r]))
      return !1;
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n))
      return !1;
  return !0;
}
function Po(e) {
  "@babel/helpers - typeof";
  return Po = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Po(e);
}
var Ob = ["viewBox", "children"], Sb = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle"
], os = ["points", "pathLength"], Gi = {
  svg: Ob,
  polygon: os,
  polyline: os
}, Zu = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"], xa = function(t, r) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var n = t;
  if (/* @__PURE__ */ at(t) && (n = t.props), !jr(n))
    return null;
  var a = {};
  return Object.keys(n).forEach(function(i) {
    Zu.includes(i) && (a[i] = r || function(o) {
      return n[i](n, o);
    });
  }), a;
}, Ab = function(t, r, n) {
  return function(a) {
    return t(r, n, a), null;
  };
}, gi = function(t, r, n) {
  if (!jr(t) || Po(t) !== "object")
    return null;
  var a = null;
  return Object.keys(t).forEach(function(i) {
    var o = t[i];
    Zu.includes(i) && typeof o == "function" && (a || (a = {}), a[i] = Ab(o, r, n));
  }), a;
}, _b = ["children"], $b = ["children"];
function us(e, t) {
  if (e == null)
    return {};
  var r = Pb(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Pb(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
var cs = {
  click: "onClick",
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  mouseover: "onMouseOver",
  mousemove: "onMouseMove",
  mouseout: "onMouseOut",
  mouseenter: "onMouseEnter",
  mouseleave: "onMouseLeave",
  touchcancel: "onTouchCancel",
  touchend: "onTouchEnd",
  touchmove: "onTouchMove",
  touchstart: "onTouchStart"
}, vt = function(t) {
  return typeof t == "string" ? t : t ? t.displayName || t.name || "Component" : "";
}, ss = null, Xi = null, Ju = function e(t) {
  if (t === ss && Array.isArray(Xi))
    return Xi;
  var r = [];
  return Xt.forEach(t, function(n) {
    J(n) || (Ao.isFragment(n) ? r = r.concat(e(n.props.children)) : r.push(n));
  }), Xi = r, ss = t, r;
};
function it(e, t) {
  var r = [], n = [];
  return Array.isArray(t) ? n = t.map(function(a) {
    return vt(a);
  }) : n = [vt(t)], Ju(e).forEach(function(a) {
    var i = Je(a, "type.displayName") || Je(a, "type.name");
    n.indexOf(i) !== -1 && r.push(a);
  }), r;
}
function We(e, t) {
  var r = it(e, t);
  return r && r[0];
}
var ls = function(t) {
  if (!t || !t.props)
    return !1;
  var r = t.props, n = r.width, a = r.height;
  return !(!L(n) || n <= 0 || !L(a) || a <= 0);
}, Tb = ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColormatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-url", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "lineGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"], Eb = function(t) {
  return t && t.type && zn(t.type) && Tb.indexOf(t.type) >= 0;
}, Mb = function(t, r, n, a) {
  var i, o = (i = Gi == null ? void 0 : Gi[a]) !== null && i !== void 0 ? i : [];
  return !Y(t) && (a && o.includes(r) || Sb.includes(r)) || n && Zu.includes(r);
}, X = function(t, r, n) {
  if (!t || typeof t == "function" || typeof t == "boolean")
    return null;
  var a = t;
  if (/* @__PURE__ */ at(t) && (a = t.props), !jr(a))
    return null;
  var i = {};
  return Object.keys(a).forEach(function(o) {
    var u;
    Mb((u = a) === null || u === void 0 ? void 0 : u[o], o, r, n) && (i[o] = a[o]);
  }), i;
}, To = function e(t, r) {
  if (t === r)
    return !0;
  var n = Xt.count(t);
  if (n !== Xt.count(r))
    return !1;
  if (n === 0)
    return !0;
  if (n === 1)
    return fs(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r);
  for (var a = 0; a < n; a++) {
    var i = t[a], o = r[a];
    if (Array.isArray(i) || Array.isArray(o)) {
      if (!e(i, o))
        return !1;
    } else if (!fs(i, o))
      return !1;
  }
  return !0;
}, fs = function(t, r) {
  if (J(t) && J(r))
    return !0;
  if (!J(t) && !J(r)) {
    var n = t.props || {}, a = n.children, i = us(n, _b), o = r.props || {}, u = o.children, c = us(o, $b);
    return a && u ? $o(i, c) && To(a, u) : !a && !u ? $o(i, c) : !1;
  }
  return !1;
}, ds = function(t, r) {
  var n = [], a = {};
  return Ju(t).forEach(function(i, o) {
    if (Eb(i))
      n.push(i);
    else if (i) {
      var u = vt(i.type), c = r[u] || {}, s = c.handler, f = c.once;
      if (s && (!f || !a[u])) {
        var l = s(i, u, o);
        n.push(l), a[u] = !0;
      }
    }
  }), n;
}, jb = function(t) {
  var r = t && t.type;
  return r && cs[r] ? cs[r] : null;
}, Ib = function(t, r) {
  return Ju(r).indexOf(t);
}, Cb = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function Eo() {
  return Eo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Eo.apply(this, arguments);
}
function kb(e, t) {
  if (e == null)
    return {};
  var r = Nb(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Nb(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function Mo(e) {
  var t = e.children, r = e.width, n = e.height, a = e.viewBox, i = e.className, o = e.style, u = e.title, c = e.desc, s = kb(e, Cb), f = a || {
    width: r,
    height: n,
    x: 0,
    y: 0
  }, l = ve("recharts-surface", i);
  return /* @__PURE__ */ $.createElement("svg", Eo({}, X(s, !0, "svg"), {
    className: l,
    width: r,
    height: n,
    style: o,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height)
  }), /* @__PURE__ */ $.createElement("title", null, u), /* @__PURE__ */ $.createElement("desc", null, c), t);
}
var Db = ["children", "className"];
function jo() {
  return jo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, jo.apply(this, arguments);
}
function Rb(e, t) {
  if (e == null)
    return {};
  var r = Lb(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Lb(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
var ye = /* @__PURE__ */ $.forwardRef(function(e, t) {
  var r = e.children, n = e.className, a = Rb(e, Db), i = ve("recharts-layer", n);
  return /* @__PURE__ */ $.createElement("g", jo({
    className: i
  }, X(a, !0), {
    ref: t
  }), r);
}), Bb = process.env.NODE_ENV !== "production", yt = function(t, r) {
  for (var n = arguments.length, a = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++)
    a[i - 2] = arguments[i];
  if (Bb && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var o = 0;
      console.warn(r.replace(/%s/g, function() {
        return a[o++];
      }));
    }
};
function Fb(e, t, r) {
  var n = -1, a = e.length;
  t < 0 && (t = -t > a ? 0 : a + t), r = r > a ? a : r, r < 0 && (r += a), a = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var i = Array(a); ++n < a; )
    i[n] = e[n + t];
  return i;
}
var Ub = Fb, Wb = Ub;
function qb(e, t, r) {
  var n = e.length;
  return r = r === void 0 ? n : r, !t && r >= n ? e : Wb(e, t, r);
}
var zb = qb, Hb = "\\ud800-\\udfff", Kb = "\\u0300-\\u036f", Gb = "\\ufe20-\\ufe2f", Xb = "\\u20d0-\\u20ff", Vb = Kb + Gb + Xb, Yb = "\\ufe0e\\ufe0f", Zb = "\\u200d", Jb = RegExp("[" + Zb + Hb + Vb + Yb + "]");
function Qb(e) {
  return Jb.test(e);
}
var rh = Qb;
function e0(e) {
  return e.split("");
}
var t0 = e0, nh = "\\ud800-\\udfff", r0 = "\\u0300-\\u036f", n0 = "\\ufe20-\\ufe2f", a0 = "\\u20d0-\\u20ff", i0 = r0 + n0 + a0, o0 = "\\ufe0e\\ufe0f", u0 = "[" + nh + "]", Io = "[" + i0 + "]", Co = "\\ud83c[\\udffb-\\udfff]", c0 = "(?:" + Io + "|" + Co + ")", ah = "[^" + nh + "]", ih = "(?:\\ud83c[\\udde6-\\uddff]){2}", oh = "[\\ud800-\\udbff][\\udc00-\\udfff]", s0 = "\\u200d", uh = c0 + "?", ch = "[" + o0 + "]?", l0 = "(?:" + s0 + "(?:" + [ah, ih, oh].join("|") + ")" + ch + uh + ")*", f0 = ch + uh + l0, d0 = "(?:" + [ah + Io + "?", Io, ih, oh, u0].join("|") + ")", h0 = RegExp(Co + "(?=" + Co + ")|" + d0 + f0, "g");
function p0(e) {
  return e.match(h0) || [];
}
var v0 = p0, y0 = t0, g0 = rh, m0 = v0;
function b0(e) {
  return g0(e) ? m0(e) : y0(e);
}
var x0 = b0, w0 = zb, O0 = rh, S0 = x0, A0 = Jd;
function _0(e) {
  return function(t) {
    t = A0(t);
    var r = O0(t) ? S0(t) : void 0, n = r ? r[0] : t.charAt(0), a = r ? w0(r, 1).join("") : t.slice(1);
    return n[e]() + a;
  };
}
var $0 = _0, P0 = $0, T0 = P0("toUpperCase"), E0 = T0;
const mi = /* @__PURE__ */ ie(E0);
function ue(e) {
  return function() {
    return e;
  };
}
const sh = Math.cos, wa = Math.sin, Qe = Math.sqrt, Oa = Math.PI, bi = 2 * Oa, ko = Math.PI, No = 2 * ko, Ut = 1e-6, M0 = No - Ut;
function lh(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function j0(e) {
  let t = Math.floor(e);
  if (!(t >= 0))
    throw new Error(`invalid digits: ${e}`);
  if (t > 15)
    return lh;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let a = 1, i = n.length; a < i; ++a)
      this._ += Math.round(arguments[a] * r) / r + n[a];
  };
}
class I0 {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? lh : j0(t);
  }
  moveTo(t, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, r) {
    this._append`L${this._x1 = +t},${this._y1 = +r}`;
  }
  quadraticCurveTo(t, r, n, a) {
    this._append`Q${+t},${+r},${this._x1 = +n},${this._y1 = +a}`;
  }
  bezierCurveTo(t, r, n, a, i, o) {
    this._append`C${+t},${+r},${+n},${+a},${this._x1 = +i},${this._y1 = +o}`;
  }
  arcTo(t, r, n, a, i) {
    if (t = +t, r = +r, n = +n, a = +a, i = +i, i < 0)
      throw new Error(`negative radius: ${i}`);
    let o = this._x1, u = this._y1, c = n - t, s = a - r, f = o - t, l = u - r, d = f * f + l * l;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (d > Ut)
      if (!(Math.abs(l * c - s * f) > Ut) || !i)
        this._append`L${this._x1 = t},${this._y1 = r}`;
      else {
        let h = n - o, y = a - u, g = c * c + s * s, v = h * h + y * y, b = Math.sqrt(g), x = Math.sqrt(d), w = i * Math.tan((ko - Math.acos((g + d - v) / (2 * b * x))) / 2), O = w / x, p = w / b;
        Math.abs(O - 1) > Ut && this._append`L${t + O * f},${r + O * l}`, this._append`A${i},${i},0,0,${+(l * h > f * y)},${this._x1 = t + p * c},${this._y1 = r + p * s}`;
      }
  }
  arc(t, r, n, a, i, o) {
    if (t = +t, r = +r, n = +n, o = !!o, n < 0)
      throw new Error(`negative radius: ${n}`);
    let u = n * Math.cos(a), c = n * Math.sin(a), s = t + u, f = r + c, l = 1 ^ o, d = o ? a - i : i - a;
    this._x1 === null ? this._append`M${s},${f}` : (Math.abs(this._x1 - s) > Ut || Math.abs(this._y1 - f) > Ut) && this._append`L${s},${f}`, n && (d < 0 && (d = d % No + No), d > M0 ? this._append`A${n},${n},0,1,${l},${t - u},${r - c}A${n},${n},0,1,${l},${this._x1 = s},${this._y1 = f}` : d > Ut && this._append`A${n},${n},0,${+(d >= ko)},${l},${this._x1 = t + n * Math.cos(i)},${this._y1 = r + n * Math.sin(i)}`);
  }
  rect(t, r, n, a) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+a}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function Qu(e) {
  let t = 3;
  return e.digits = function(r) {
    if (!arguments.length)
      return t;
    if (r == null)
      t = null;
    else {
      const n = Math.floor(r);
      if (!(n >= 0))
        throw new RangeError(`invalid digits: ${r}`);
      t = n;
    }
    return e;
  }, () => new I0(t);
}
function ec(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function fh(e) {
  this._context = e;
}
fh.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function xi(e) {
  return new fh(e);
}
function dh(e) {
  return e[0];
}
function hh(e) {
  return e[1];
}
function ph(e, t) {
  var r = ue(!0), n = null, a = xi, i = null, o = Qu(u);
  e = typeof e == "function" ? e : e === void 0 ? dh : ue(e), t = typeof t == "function" ? t : t === void 0 ? hh : ue(t);
  function u(c) {
    var s, f = (c = ec(c)).length, l, d = !1, h;
    for (n == null && (i = a(h = o())), s = 0; s <= f; ++s)
      !(s < f && r(l = c[s], s, c)) === d && ((d = !d) ? i.lineStart() : i.lineEnd()), d && i.point(+e(l, s, c), +t(l, s, c));
    if (h)
      return i = null, h + "" || null;
  }
  return u.x = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : ue(+c), u) : e;
  }, u.y = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : ue(+c), u) : t;
  }, u.defined = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : ue(!!c), u) : r;
  }, u.curve = function(c) {
    return arguments.length ? (a = c, n != null && (i = a(n)), u) : a;
  }, u.context = function(c) {
    return arguments.length ? (c == null ? n = i = null : i = a(n = c), u) : n;
  }, u;
}
function ra(e, t, r) {
  var n = null, a = ue(!0), i = null, o = xi, u = null, c = Qu(s);
  e = typeof e == "function" ? e : e === void 0 ? dh : ue(+e), t = typeof t == "function" ? t : ue(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? hh : ue(+r);
  function s(l) {
    var d, h, y, g = (l = ec(l)).length, v, b = !1, x, w = new Array(g), O = new Array(g);
    for (i == null && (u = o(x = c())), d = 0; d <= g; ++d) {
      if (!(d < g && a(v = l[d], d, l)) === b)
        if (b = !b)
          h = d, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), y = d - 1; y >= h; --y)
            u.point(w[y], O[y]);
          u.lineEnd(), u.areaEnd();
        }
      b && (w[d] = +e(v, d, l), O[d] = +t(v, d, l), u.point(n ? +n(v, d, l) : w[d], r ? +r(v, d, l) : O[d]));
    }
    if (x)
      return u = null, x + "" || null;
  }
  function f() {
    return ph().defined(a).curve(o).context(i);
  }
  return s.x = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : ue(+l), n = null, s) : e;
  }, s.x0 = function(l) {
    return arguments.length ? (e = typeof l == "function" ? l : ue(+l), s) : e;
  }, s.x1 = function(l) {
    return arguments.length ? (n = l == null ? null : typeof l == "function" ? l : ue(+l), s) : n;
  }, s.y = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : ue(+l), r = null, s) : t;
  }, s.y0 = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : ue(+l), s) : t;
  }, s.y1 = function(l) {
    return arguments.length ? (r = l == null ? null : typeof l == "function" ? l : ue(+l), s) : r;
  }, s.lineX0 = s.lineY0 = function() {
    return f().x(e).y(t);
  }, s.lineY1 = function() {
    return f().x(e).y(r);
  }, s.lineX1 = function() {
    return f().x(n).y(t);
  }, s.defined = function(l) {
    return arguments.length ? (a = typeof l == "function" ? l : ue(!!l), s) : a;
  }, s.curve = function(l) {
    return arguments.length ? (o = l, i != null && (u = o(i)), s) : o;
  }, s.context = function(l) {
    return arguments.length ? (l == null ? i = u = null : u = o(i = l), s) : i;
  }, s;
}
class vh {
  constructor(t, r) {
    this._context = t, this._x = r;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, r) {
    switch (t = +t, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, r, t, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, t, this._y0, t, r);
        break;
      }
    }
    this._x0 = t, this._y0 = r;
  }
}
function C0(e) {
  return new vh(e, !0);
}
function k0(e) {
  return new vh(e, !1);
}
const tc = {
  draw(e, t) {
    const r = Qe(t / Oa);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, bi);
  }
}, N0 = {
  draw(e, t) {
    const r = Qe(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, yh = Qe(1 / 3), D0 = yh * 2, R0 = {
  draw(e, t) {
    const r = Qe(t / D0), n = r * yh;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, L0 = {
  draw(e, t) {
    const r = Qe(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, B0 = 0.8908130915292852, gh = wa(Oa / 10) / wa(7 * Oa / 10), F0 = wa(bi / 10) * gh, U0 = -sh(bi / 10) * gh, W0 = {
  draw(e, t) {
    const r = Qe(t * B0), n = F0 * r, a = U0 * r;
    e.moveTo(0, -r), e.lineTo(n, a);
    for (let i = 1; i < 5; ++i) {
      const o = bi * i / 5, u = sh(o), c = wa(o);
      e.lineTo(c * r, -u * r), e.lineTo(u * n - c * a, c * n + u * a);
    }
    e.closePath();
  }
}, Vi = Qe(3), q0 = {
  draw(e, t) {
    const r = -Qe(t / (Vi * 3));
    e.moveTo(0, r * 2), e.lineTo(-Vi * r, -r), e.lineTo(Vi * r, -r), e.closePath();
  }
}, Be = -0.5, Fe = Qe(3) / 2, Do = 1 / Qe(12), z0 = (Do / 2 + 1) * 3, H0 = {
  draw(e, t) {
    const r = Qe(t / z0), n = r / 2, a = r * Do, i = n, o = r * Do + r, u = -i, c = o;
    e.moveTo(n, a), e.lineTo(i, o), e.lineTo(u, c), e.lineTo(Be * n - Fe * a, Fe * n + Be * a), e.lineTo(Be * i - Fe * o, Fe * i + Be * o), e.lineTo(Be * u - Fe * c, Fe * u + Be * c), e.lineTo(Be * n + Fe * a, Be * a - Fe * n), e.lineTo(Be * i + Fe * o, Be * o - Fe * i), e.lineTo(Be * u + Fe * c, Be * c - Fe * u), e.closePath();
  }
};
function K0(e, t) {
  let r = null, n = Qu(a);
  e = typeof e == "function" ? e : ue(e || tc), t = typeof t == "function" ? t : ue(t === void 0 ? 64 : +t);
  function a() {
    let i;
    if (r || (r = i = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), i)
      return r = null, i + "" || null;
  }
  return a.type = function(i) {
    return arguments.length ? (e = typeof i == "function" ? i : ue(i), a) : e;
  }, a.size = function(i) {
    return arguments.length ? (t = typeof i == "function" ? i : ue(+i), a) : t;
  }, a.context = function(i) {
    return arguments.length ? (r = i ?? null, a) : r;
  }, a;
}
function Sa() {
}
function Aa(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function mh(e) {
  this._context = e;
}
mh.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        Aa(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        Aa(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function G0(e) {
  return new mh(e);
}
function bh(e) {
  this._context = e;
}
bh.prototype = {
  areaStart: Sa,
  areaEnd: Sa,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        Aa(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function X0(e) {
  return new bh(e);
}
function xh(e) {
  this._context = e;
}
xh.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + e) / 6, n = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
        break;
      case 3:
        this._point = 4;
      default:
        Aa(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function V0(e) {
  return new xh(e);
}
function wh(e) {
  this._context = e;
}
wh.prototype = {
  areaStart: Sa,
  areaEnd: Sa,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
  }
};
function Y0(e) {
  return new wh(e);
}
function hs(e) {
  return e < 0 ? -1 : 1;
}
function ps(e, t, r) {
  var n = e._x1 - e._x0, a = t - e._x1, i = (e._y1 - e._y0) / (n || a < 0 && -0), o = (r - e._y1) / (a || n < 0 && -0), u = (i * a + o * n) / (n + a);
  return (hs(i) + hs(o)) * Math.min(Math.abs(i), Math.abs(o), 0.5 * Math.abs(u)) || 0;
}
function vs(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function Yi(e, t, r) {
  var n = e._x0, a = e._y0, i = e._x1, o = e._y1, u = (i - n) / 3;
  e._context.bezierCurveTo(n + u, a + u * t, i - u, o - u * r, i, o);
}
function _a(e) {
  this._context = e;
}
_a.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        Yi(this, this._t0, vs(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    var r = NaN;
    if (e = +e, t = +t, !(e === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, Yi(this, vs(this, r = ps(this, e, t)), r);
          break;
        default:
          Yi(this, this._t0, r = ps(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function Oh(e) {
  this._context = new Sh(e);
}
(Oh.prototype = Object.create(_a.prototype)).point = function(e, t) {
  _a.prototype.point.call(this, t, e);
};
function Sh(e) {
  this._context = e;
}
Sh.prototype = {
  moveTo: function(e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function(e, t, r, n, a, i) {
    this._context.bezierCurveTo(t, e, n, r, i, a);
  }
};
function Z0(e) {
  return new _a(e);
}
function J0(e) {
  return new Oh(e);
}
function Ah(e) {
  this._context = e;
}
Ah.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var e = this._x, t = this._y, r = e.length;
    if (r)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2)
        this._context.lineTo(e[1], t[1]);
      else
        for (var n = ys(e), a = ys(t), i = 0, o = 1; o < r; ++i, ++o)
          this._context.bezierCurveTo(n[0][i], a[0][i], n[1][i], a[1][i], e[o], t[o]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function ys(e) {
  var t, r = e.length - 1, n, a = new Array(r), i = new Array(r), o = new Array(r);
  for (a[0] = 0, i[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t)
    a[t] = 1, i[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
  for (a[r - 1] = 2, i[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t)
    n = a[t] / i[t - 1], i[t] -= n, o[t] -= n * o[t - 1];
  for (a[r - 1] = o[r - 1] / i[r - 1], t = r - 2; t >= 0; --t)
    a[t] = (o[t] - a[t + 1]) / i[t];
  for (i[r - 1] = (e[r] + a[r - 1]) / 2, t = 0; t < r - 1; ++t)
    i[t] = 2 * e[t + 1] - a[t + 1];
  return [a, i];
}
function Q0(e) {
  return new Ah(e);
}
function wi(e, t) {
  this._context = e, this._t = t;
}
wi.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var r = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, t);
        }
        break;
      }
    }
    this._x = e, this._y = t;
  }
};
function ex(e) {
  return new wi(e, 0.5);
}
function tx(e) {
  return new wi(e, 0);
}
function rx(e) {
  return new wi(e, 1);
}
function dr(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, a, i = e[t[0]], o, u = i.length; r < o; ++r)
      for (a = i, i = e[t[r]], n = 0; n < u; ++n)
        i[n][1] += i[n][0] = isNaN(a[n][1]) ? a[n][0] : a[n][1];
}
function Ro(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; )
    r[t] = t;
  return r;
}
function nx(e, t) {
  return e[t];
}
function ax(e) {
  const t = [];
  return t.key = e, t;
}
function ix() {
  var e = ue([]), t = Ro, r = dr, n = nx;
  function a(i) {
    var o = Array.from(e.apply(this, arguments), ax), u, c = o.length, s = -1, f;
    for (const l of i)
      for (u = 0, ++s; u < c; ++u)
        (o[u][s] = [0, +n(l, o[u].key, s, i)]).data = l;
    for (u = 0, f = ec(t(o)); u < c; ++u)
      o[f[u]].index = u;
    return r(o, f), o;
  }
  return a.keys = function(i) {
    return arguments.length ? (e = typeof i == "function" ? i : ue(Array.from(i)), a) : e;
  }, a.value = function(i) {
    return arguments.length ? (n = typeof i == "function" ? i : ue(+i), a) : n;
  }, a.order = function(i) {
    return arguments.length ? (t = i == null ? Ro : typeof i == "function" ? i : ue(Array.from(i)), a) : t;
  }, a.offset = function(i) {
    return arguments.length ? (r = i ?? dr, a) : r;
  }, a;
}
function ox(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, a = 0, i = e[0].length, o; a < i; ++a) {
      for (o = r = 0; r < n; ++r)
        o += e[r][a][1] || 0;
      if (o)
        for (r = 0; r < n; ++r)
          e[r][a][1] /= o;
    }
    dr(e, t);
  }
}
function ux(e, t) {
  if ((a = e.length) > 0) {
    for (var r = 0, n = e[t[0]], a, i = n.length; r < i; ++r) {
      for (var o = 0, u = 0; o < a; ++o)
        u += e[o][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2;
    }
    dr(e, t);
  }
}
function cx(e, t) {
  if (!(!((o = e.length) > 0) || !((i = (a = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, a, i, o; n < i; ++n) {
      for (var u = 0, c = 0, s = 0; u < o; ++u) {
        for (var f = e[t[u]], l = f[n][1] || 0, d = f[n - 1][1] || 0, h = (l - d) / 2, y = 0; y < u; ++y) {
          var g = e[t[y]], v = g[n][1] || 0, b = g[n - 1][1] || 0;
          h += v - b;
        }
        c += l, s += h * l;
      }
      a[n - 1][1] += a[n - 1][0] = r, c && (r -= s / c);
    }
    a[n - 1][1] += a[n - 1][0] = r, dr(e, t);
  }
}
function on(e) {
  "@babel/helpers - typeof";
  return on = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, on(e);
}
var sx = ["type", "size", "sizeType"];
function Lo() {
  return Lo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Lo.apply(this, arguments);
}
function gs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ms(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gs(Object(r), !0).forEach(function(n) {
      lx(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gs(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function lx(e, t, r) {
  return t = fx(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function fx(e) {
  var t = dx(e, "string");
  return on(t) === "symbol" ? t : String(t);
}
function dx(e, t) {
  if (on(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (on(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function hx(e, t) {
  if (e == null)
    return {};
  var r = px(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function px(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
var _h = {
  symbolCircle: tc,
  symbolCross: N0,
  symbolDiamond: R0,
  symbolSquare: L0,
  symbolStar: W0,
  symbolTriangle: q0,
  symbolWye: H0
}, vx = Math.PI / 180, yx = function(t) {
  var r = "symbol".concat(mi(t));
  return _h[r] || tc;
}, gx = function(t, r, n) {
  if (r === "area")
    return t;
  switch (n) {
    case "cross":
      return 5 * t * t / 9;
    case "diamond":
      return 0.5 * t * t / Math.sqrt(3);
    case "square":
      return t * t;
    case "star": {
      var a = 18 * vx;
      return 1.25 * t * t * (Math.tan(a) - Math.tan(a * 2) * Math.pow(Math.tan(a), 2));
    }
    case "triangle":
      return Math.sqrt(3) * t * t / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * t * t / 8;
    default:
      return Math.PI * t * t / 4;
  }
}, mx = function(t, r) {
  _h["symbol".concat(mi(t))] = r;
}, rc = function(t) {
  var r = t.type, n = r === void 0 ? "circle" : r, a = t.size, i = a === void 0 ? 64 : a, o = t.sizeType, u = o === void 0 ? "area" : o, c = hx(t, sx), s = ms(ms({}, c), {}, {
    type: n,
    size: i,
    sizeType: u
  }), f = function() {
    var v = yx(n), b = K0().type(v).size(gx(i, u, n));
    return b();
  }, l = s.className, d = s.cx, h = s.cy, y = X(s, !0);
  return d === +d && h === +h && i === +i ? /* @__PURE__ */ $.createElement("path", Lo({}, y, {
    className: ve("recharts-symbols", l),
    transform: "translate(".concat(d, ", ").concat(h, ")"),
    d: f()
  })) : null;
};
rc.registerSymbol = mx;
function hr(e) {
  "@babel/helpers - typeof";
  return hr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, hr(e);
}
function Bo() {
  return Bo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Bo.apply(this, arguments);
}
function bs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function bx(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bs(Object(r), !0).forEach(function(n) {
      un(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : bs(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function xx(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function xs(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, $h(n.key), n);
  }
}
function wx(e, t, r) {
  return t && xs(e.prototype, t), r && xs(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Ox(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Fo(e, t);
}
function Fo(e, t) {
  return Fo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Fo(e, t);
}
function Sx(e) {
  var t = $x();
  return function() {
    var n = $a(e), a;
    if (t) {
      var i = $a(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return Ax(this, a);
  };
}
function Ax(e, t) {
  if (t && (hr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _x(e);
}
function _x(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function $x() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function $a(e) {
  return $a = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, $a(e);
}
function un(e, t, r) {
  return t = $h(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function $h(e) {
  var t = Px(e, "string");
  return hr(t) === "symbol" ? t : String(t);
}
function Px(e, t) {
  if (hr(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (hr(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ue = 32, nc = /* @__PURE__ */ function(e) {
  Ox(r, e);
  var t = Sx(r);
  function r() {
    return xx(this, r), t.apply(this, arguments);
  }
  return wx(r, [{
    key: "renderIcon",
    value: (
      /**
       * Render the path of icon
       * @param {Object} data Data of each legend item
       * @return {String} Path element
       */
      function(a) {
        var i = this.props.inactiveColor, o = Ue / 2, u = Ue / 6, c = Ue / 3, s = a.inactive ? i : a.color;
        if (a.type === "plainline")
          return /* @__PURE__ */ $.createElement("line", {
            strokeWidth: 4,
            fill: "none",
            stroke: s,
            strokeDasharray: a.payload.strokeDasharray,
            x1: 0,
            y1: o,
            x2: Ue,
            y2: o,
            className: "recharts-legend-icon"
          });
        if (a.type === "line")
          return /* @__PURE__ */ $.createElement("path", {
            strokeWidth: 4,
            fill: "none",
            stroke: s,
            d: "M0,".concat(o, "h").concat(c, `
            A`).concat(u, ",").concat(u, ",0,1,1,").concat(2 * c, ",").concat(o, `
            H`).concat(Ue, "M").concat(2 * c, ",").concat(o, `
            A`).concat(u, ",").concat(u, ",0,1,1,").concat(c, ",").concat(o),
            className: "recharts-legend-icon"
          });
        if (a.type === "rect")
          return /* @__PURE__ */ $.createElement("path", {
            stroke: "none",
            fill: s,
            d: "M0,".concat(Ue / 8, "h").concat(Ue, "v").concat(Ue * 3 / 4, "h").concat(-Ue, "z"),
            className: "recharts-legend-icon"
          });
        if (/* @__PURE__ */ $.isValidElement(a.legendIcon)) {
          var f = bx({}, a);
          return delete f.legendIcon, /* @__PURE__ */ $.cloneElement(a.legendIcon, f);
        }
        return /* @__PURE__ */ $.createElement(rc, {
          fill: s,
          cx: o,
          cy: o,
          size: Ue,
          sizeType: "diameter",
          type: a.type
        });
      }
    )
    /**
     * Draw items of legend
     * @return {ReactElement} Items
     */
  }, {
    key: "renderItems",
    value: function() {
      var a = this, i = this.props, o = i.payload, u = i.iconSize, c = i.layout, s = i.formatter, f = i.inactiveColor, l = {
        x: 0,
        y: 0,
        width: Ue,
        height: Ue
      }, d = {
        display: c === "horizontal" ? "inline-block" : "block",
        marginRight: 10
      }, h = {
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: 4
      };
      return o.map(function(y, g) {
        var v, b = y.formatter || s, x = ve((v = {
          "recharts-legend-item": !0
        }, un(v, "legend-item-".concat(g), !0), un(v, "inactive", y.inactive), v));
        if (y.type === "none")
          return null;
        var w = Y(y.value) ? null : y.value;
        yt(
          !Y(y.value),
          `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`
          // eslint-disable-line max-len
        );
        var O = y.inactive ? f : y.color;
        return /* @__PURE__ */ $.createElement("li", Bo({
          className: x,
          style: d,
          key: "legend-item-".concat(g)
        }, gi(a.props, y, g)), /* @__PURE__ */ $.createElement(Mo, {
          width: u,
          height: u,
          viewBox: l,
          style: h
        }, a.renderIcon(y)), /* @__PURE__ */ $.createElement("span", {
          className: "recharts-legend-item-text",
          style: {
            color: O
          }
        }, b ? b(w, y, g) : w));
      });
    }
  }, {
    key: "render",
    value: function() {
      var a = this.props, i = a.payload, o = a.layout, u = a.align;
      if (!i || !i.length)
        return null;
      var c = {
        padding: 0,
        margin: 0,
        textAlign: o === "horizontal" ? u : "left"
      };
      return /* @__PURE__ */ $.createElement("ul", {
        className: "recharts-default-legend",
        style: c
      }, this.renderItems());
    }
  }]), r;
}(wt);
un(nc, "displayName", "Legend");
un(nc, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "middle",
  inactiveColor: "#ccc"
});
var Tx = hi;
function Ex() {
  this.__data__ = new Tx(), this.size = 0;
}
var Mx = Ex;
function jx(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var Ix = jx;
function Cx(e) {
  return this.__data__.get(e);
}
var kx = Cx;
function Nx(e) {
  return this.__data__.has(e);
}
var Dx = Nx, Rx = hi, Lx = Ku, Bx = Gu, Fx = 200;
function Ux(e, t) {
  var r = this.__data__;
  if (r instanceof Rx) {
    var n = r.__data__;
    if (!Lx || n.length < Fx - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new Bx(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var Wx = Ux, qx = hi, zx = Mx, Hx = Ix, Kx = kx, Gx = Dx, Xx = Wx;
function Nr(e) {
  var t = this.__data__ = new qx(e);
  this.size = t.size;
}
Nr.prototype.clear = zx;
Nr.prototype.delete = Hx;
Nr.prototype.get = Kx;
Nr.prototype.has = Gx;
Nr.prototype.set = Xx;
var Ph = Nr, Vx = "__lodash_hash_undefined__";
function Yx(e) {
  return this.__data__.set(e, Vx), this;
}
var Zx = Yx;
function Jx(e) {
  return this.__data__.has(e);
}
var Qx = Jx, e1 = Gu, t1 = Zx, r1 = Qx;
function Pa(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new e1(); ++t < r; )
    this.add(e[t]);
}
Pa.prototype.add = Pa.prototype.push = t1;
Pa.prototype.has = r1;
var Th = Pa;
function n1(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
var Eh = n1;
function a1(e, t) {
  return e.has(t);
}
var Mh = a1, i1 = Th, o1 = Eh, u1 = Mh, c1 = 1, s1 = 2;
function l1(e, t, r, n, a, i) {
  var o = r & c1, u = e.length, c = t.length;
  if (u != c && !(o && c > u))
    return !1;
  var s = i.get(e), f = i.get(t);
  if (s && f)
    return s == t && f == e;
  var l = -1, d = !0, h = r & s1 ? new i1() : void 0;
  for (i.set(e, t), i.set(t, e); ++l < u; ) {
    var y = e[l], g = t[l];
    if (n)
      var v = o ? n(g, y, l, t, e, i) : n(y, g, l, e, t, i);
    if (v !== void 0) {
      if (v)
        continue;
      d = !1;
      break;
    }
    if (h) {
      if (!o1(t, function(b, x) {
        if (!u1(h, x) && (y === b || a(y, b, r, n, i)))
          return h.push(x);
      })) {
        d = !1;
        break;
      }
    } else if (!(y === g || a(y, g, r, n, i))) {
      d = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), d;
}
var jh = l1, f1 = st, d1 = f1.Uint8Array, h1 = d1;
function p1(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, a) {
    r[++t] = [a, n];
  }), r;
}
var v1 = p1;
function y1(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var ac = y1, ws = qn, Os = h1, g1 = Hu, m1 = jh, b1 = v1, x1 = ac, w1 = 1, O1 = 2, S1 = "[object Boolean]", A1 = "[object Date]", _1 = "[object Error]", $1 = "[object Map]", P1 = "[object Number]", T1 = "[object RegExp]", E1 = "[object Set]", M1 = "[object String]", j1 = "[object Symbol]", I1 = "[object ArrayBuffer]", C1 = "[object DataView]", Ss = ws ? ws.prototype : void 0, Zi = Ss ? Ss.valueOf : void 0;
function k1(e, t, r, n, a, i, o) {
  switch (r) {
    case C1:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case I1:
      return !(e.byteLength != t.byteLength || !i(new Os(e), new Os(t)));
    case S1:
    case A1:
    case P1:
      return g1(+e, +t);
    case _1:
      return e.name == t.name && e.message == t.message;
    case T1:
    case M1:
      return e == t + "";
    case $1:
      var u = b1;
    case E1:
      var c = n & w1;
      if (u || (u = x1), e.size != t.size && !c)
        return !1;
      var s = o.get(e);
      if (s)
        return s == t;
      n |= O1, o.set(e, t);
      var f = m1(u(e), u(t), n, a, i, o);
      return o.delete(e), f;
    case j1:
      if (Zi)
        return Zi.call(e) == Zi.call(t);
  }
  return !1;
}
var N1 = k1;
function D1(e, t) {
  for (var r = -1, n = t.length, a = e.length; ++r < n; )
    e[a + r] = t[r];
  return e;
}
var Ih = D1, R1 = Ih, L1 = Ie;
function B1(e, t, r) {
  var n = t(e);
  return L1(e) ? n : R1(n, r(e));
}
var F1 = B1;
function U1(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = 0, i = []; ++r < n; ) {
    var o = e[r];
    t(o, r, e) && (i[a++] = o);
  }
  return i;
}
var W1 = U1;
function q1() {
  return [];
}
var z1 = q1, H1 = W1, K1 = z1, G1 = Object.prototype, X1 = G1.propertyIsEnumerable, As = Object.getOwnPropertySymbols, V1 = As ? function(e) {
  return e == null ? [] : (e = Object(e), H1(As(e), function(t) {
    return X1.call(e, t);
  }));
} : K1, Y1 = V1;
function Z1(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var J1 = Z1, Q1 = Ot, ew = St, tw = "[object Arguments]";
function rw(e) {
  return ew(e) && Q1(e) == tw;
}
var nw = rw, _s = nw, aw = St, Ch = Object.prototype, iw = Ch.hasOwnProperty, ow = Ch.propertyIsEnumerable, uw = _s(/* @__PURE__ */ function() {
  return arguments;
}()) ? _s : function(e) {
  return aw(e) && iw.call(e, "callee") && !ow.call(e, "callee");
}, ic = uw, Ta = { exports: {} };
function cw() {
  return !1;
}
var sw = cw;
Ta.exports;
(function(e, t) {
  var r = st, n = sw, a = t && !t.nodeType && t, i = a && !0 && e && !e.nodeType && e, o = i && i.exports === a, u = o ? r.Buffer : void 0, c = u ? u.isBuffer : void 0, s = c || n;
  e.exports = s;
})(Ta, Ta.exports);
var kh = Ta.exports, lw = 9007199254740991, fw = /^(?:0|[1-9]\d*)$/;
function dw(e, t) {
  var r = typeof e;
  return t = t ?? lw, !!t && (r == "number" || r != "symbol" && fw.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var oc = dw, hw = 9007199254740991;
function pw(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= hw;
}
var uc = pw, vw = Ot, yw = uc, gw = St, mw = "[object Arguments]", bw = "[object Array]", xw = "[object Boolean]", ww = "[object Date]", Ow = "[object Error]", Sw = "[object Function]", Aw = "[object Map]", _w = "[object Number]", $w = "[object Object]", Pw = "[object RegExp]", Tw = "[object Set]", Ew = "[object String]", Mw = "[object WeakMap]", jw = "[object ArrayBuffer]", Iw = "[object DataView]", Cw = "[object Float32Array]", kw = "[object Float64Array]", Nw = "[object Int8Array]", Dw = "[object Int16Array]", Rw = "[object Int32Array]", Lw = "[object Uint8Array]", Bw = "[object Uint8ClampedArray]", Fw = "[object Uint16Array]", Uw = "[object Uint32Array]", se = {};
se[Cw] = se[kw] = se[Nw] = se[Dw] = se[Rw] = se[Lw] = se[Bw] = se[Fw] = se[Uw] = !0;
se[mw] = se[bw] = se[jw] = se[xw] = se[Iw] = se[ww] = se[Ow] = se[Sw] = se[Aw] = se[_w] = se[$w] = se[Pw] = se[Tw] = se[Ew] = se[Mw] = !1;
function Ww(e) {
  return gw(e) && yw(e.length) && !!se[vw(e)];
}
var qw = Ww;
function zw(e) {
  return function(t) {
    return e(t);
  };
}
var Nh = zw, Ea = { exports: {} };
Ea.exports;
(function(e, t) {
  var r = Kd, n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, i = a && a.exports === n, o = i && r.process, u = function() {
    try {
      var c = a && a.require && a.require("util").types;
      return c || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  e.exports = u;
})(Ea, Ea.exports);
var Hw = Ea.exports, Kw = qw, Gw = Nh, $s = Hw, Ps = $s && $s.isTypedArray, Xw = Ps ? Gw(Ps) : Kw, Dh = Xw, Vw = J1, Yw = ic, Zw = Ie, Jw = kh, Qw = oc, eO = Dh, tO = Object.prototype, rO = tO.hasOwnProperty;
function nO(e, t) {
  var r = Zw(e), n = !r && Yw(e), a = !r && !n && Jw(e), i = !r && !n && !a && eO(e), o = r || n || a || i, u = o ? Vw(e.length, String) : [], c = u.length;
  for (var s in e)
    (t || rO.call(e, s)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (s == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (s == "offset" || s == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (s == "buffer" || s == "byteLength" || s == "byteOffset") || // Skip index properties.
    Qw(s, c))) && u.push(s);
  return u;
}
var aO = nO, iO = Object.prototype;
function oO(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || iO;
  return e === r;
}
var uO = oO;
function cO(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Rh = cO, sO = Rh, lO = sO(Object.keys, Object), fO = lO, dO = uO, hO = fO, pO = Object.prototype, vO = pO.hasOwnProperty;
function yO(e) {
  if (!dO(e))
    return hO(e);
  var t = [];
  for (var r in Object(e))
    vO.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var gO = yO, mO = zu, bO = uc;
function xO(e) {
  return e != null && bO(e.length) && !mO(e);
}
var Kn = xO, wO = aO, OO = gO, SO = Kn;
function AO(e) {
  return SO(e) ? wO(e) : OO(e);
}
var Oi = AO, _O = F1, $O = Y1, PO = Oi;
function TO(e) {
  return _O(e, PO, $O);
}
var EO = TO, Ts = EO, MO = 1, jO = Object.prototype, IO = jO.hasOwnProperty;
function CO(e, t, r, n, a, i) {
  var o = r & MO, u = Ts(e), c = u.length, s = Ts(t), f = s.length;
  if (c != f && !o)
    return !1;
  for (var l = c; l--; ) {
    var d = u[l];
    if (!(o ? d in t : IO.call(t, d)))
      return !1;
  }
  var h = i.get(e), y = i.get(t);
  if (h && y)
    return h == t && y == e;
  var g = !0;
  i.set(e, t), i.set(t, e);
  for (var v = o; ++l < c; ) {
    d = u[l];
    var b = e[d], x = t[d];
    if (n)
      var w = o ? n(x, b, d, t, e, i) : n(b, x, d, e, t, i);
    if (!(w === void 0 ? b === x || a(b, x, r, n, i) : w)) {
      g = !1;
      break;
    }
    v || (v = d == "constructor");
  }
  if (g && !v) {
    var O = e.constructor, p = t.constructor;
    O != p && "constructor" in e && "constructor" in t && !(typeof O == "function" && O instanceof O && typeof p == "function" && p instanceof p) && (g = !1);
  }
  return i.delete(e), i.delete(t), g;
}
var kO = CO, NO = tr, DO = st, RO = NO(DO, "DataView"), LO = RO, BO = tr, FO = st, UO = BO(FO, "Promise"), WO = UO, qO = tr, zO = st, HO = qO(zO, "Set"), Lh = HO, KO = tr, GO = st, XO = KO(GO, "WeakMap"), VO = XO, Uo = LO, Wo = Ku, qo = WO, zo = Lh, Ho = VO, Bh = Ot, Dr = Xd, Es = "[object Map]", YO = "[object Object]", Ms = "[object Promise]", js = "[object Set]", Is = "[object WeakMap]", Cs = "[object DataView]", ZO = Dr(Uo), JO = Dr(Wo), QO = Dr(qo), eS = Dr(zo), tS = Dr(Ho), Wt = Bh;
(Uo && Wt(new Uo(new ArrayBuffer(1))) != Cs || Wo && Wt(new Wo()) != Es || qo && Wt(qo.resolve()) != Ms || zo && Wt(new zo()) != js || Ho && Wt(new Ho()) != Is) && (Wt = function(e) {
  var t = Bh(e), r = t == YO ? e.constructor : void 0, n = r ? Dr(r) : "";
  if (n)
    switch (n) {
      case ZO:
        return Cs;
      case JO:
        return Es;
      case QO:
        return Ms;
      case eS:
        return js;
      case tS:
        return Is;
    }
  return t;
});
var rS = Wt, Ji = Ph, nS = jh, aS = N1, iS = kO, ks = rS, Ns = Ie, Ds = kh, oS = Dh, uS = 1, Rs = "[object Arguments]", Ls = "[object Array]", na = "[object Object]", cS = Object.prototype, Bs = cS.hasOwnProperty;
function sS(e, t, r, n, a, i) {
  var o = Ns(e), u = Ns(t), c = o ? Ls : ks(e), s = u ? Ls : ks(t);
  c = c == Rs ? na : c, s = s == Rs ? na : s;
  var f = c == na, l = s == na, d = c == s;
  if (d && Ds(e)) {
    if (!Ds(t))
      return !1;
    o = !0, f = !1;
  }
  if (d && !f)
    return i || (i = new Ji()), o || oS(e) ? nS(e, t, r, n, a, i) : aS(e, t, c, r, n, a, i);
  if (!(r & uS)) {
    var h = f && Bs.call(e, "__wrapped__"), y = l && Bs.call(t, "__wrapped__");
    if (h || y) {
      var g = h ? e.value() : e, v = y ? t.value() : t;
      return i || (i = new Ji()), a(g, v, r, n, i);
    }
  }
  return d ? (i || (i = new Ji()), iS(e, t, r, n, a, i)) : !1;
}
var lS = sS, fS = lS, Fs = St;
function Fh(e, t, r, n, a) {
  return e === t ? !0 : e == null || t == null || !Fs(e) && !Fs(t) ? e !== e && t !== t : fS(e, t, r, n, Fh, a);
}
var cc = Fh, dS = Ph, hS = cc, pS = 1, vS = 2;
function yS(e, t, r, n) {
  var a = r.length, i = a, o = !n;
  if (e == null)
    return !i;
  for (e = Object(e); a--; ) {
    var u = r[a];
    if (o && u[2] ? u[1] !== e[u[0]] : !(u[0] in e))
      return !1;
  }
  for (; ++a < i; ) {
    u = r[a];
    var c = u[0], s = e[c], f = u[1];
    if (o && u[2]) {
      if (s === void 0 && !(c in e))
        return !1;
    } else {
      var l = new dS();
      if (n)
        var d = n(s, f, c, e, t, l);
      if (!(d === void 0 ? hS(f, s, pS | vS, n, l) : d))
        return !1;
    }
  }
  return !0;
}
var gS = yS, mS = jt;
function bS(e) {
  return e === e && !mS(e);
}
var Uh = bS, xS = Uh, wS = Oi;
function OS(e) {
  for (var t = wS(e), r = t.length; r--; ) {
    var n = t[r], a = e[n];
    t[r] = [n, a, xS(a)];
  }
  return t;
}
var SS = OS;
function AS(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
var Wh = AS, _S = gS, $S = SS, PS = Wh;
function TS(e) {
  var t = $S(e);
  return t.length == 1 && t[0][2] ? PS(t[0][0], t[0][1]) : function(r) {
    return r === e || _S(r, e, t);
  };
}
var ES = TS;
function MS(e, t) {
  return e != null && t in Object(e);
}
var jS = MS, IS = Qd, CS = ic, kS = Ie, NS = oc, DS = uc, RS = vi;
function LS(e, t, r) {
  t = IS(t, e);
  for (var n = -1, a = t.length, i = !1; ++n < a; ) {
    var o = RS(t[n]);
    if (!(i = e != null && r(e, o)))
      break;
    e = e[o];
  }
  return i || ++n != a ? i : (a = e == null ? 0 : e.length, !!a && DS(a) && NS(o, a) && (kS(e) || CS(e)));
}
var BS = LS, FS = jS, US = BS;
function WS(e, t) {
  return e != null && US(e, t, FS);
}
var qS = WS, zS = cc, HS = eh, KS = qS, GS = qu, XS = Uh, VS = Wh, YS = vi, ZS = 1, JS = 2;
function QS(e, t) {
  return GS(e) && XS(t) ? VS(YS(e), t) : function(r) {
    var n = HS(r, e);
    return n === void 0 && n === t ? KS(r, e) : zS(t, n, ZS | JS);
  };
}
var eA = QS;
function tA(e) {
  return e;
}
var Rr = tA;
function rA(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
var nA = rA, aA = Yu;
function iA(e) {
  return function(t) {
    return aA(t, e);
  };
}
var oA = iA, uA = nA, cA = oA, sA = qu, lA = vi;
function fA(e) {
  return sA(e) ? uA(lA(e)) : cA(e);
}
var dA = fA, hA = ES, pA = eA, vA = Rr, yA = Ie, gA = dA;
function mA(e) {
  return typeof e == "function" ? e : e == null ? vA : typeof e == "object" ? yA(e) ? pA(e[0], e[1]) : hA(e) : gA(e);
}
var lt = mA;
function bA(e, t, r, n) {
  for (var a = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < a; )
    if (t(e[i], i, e))
      return i;
  return -1;
}
var qh = bA;
function xA(e) {
  return e !== e;
}
var wA = xA;
function OA(e, t, r) {
  for (var n = r - 1, a = e.length; ++n < a; )
    if (e[n] === t)
      return n;
  return -1;
}
var SA = OA, AA = qh, _A = wA, $A = SA;
function PA(e, t, r) {
  return t === t ? $A(e, t, r) : AA(e, _A, r);
}
var TA = PA, EA = TA;
function MA(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && EA(e, t, 0) > -1;
}
var jA = MA;
function IA(e, t, r) {
  for (var n = -1, a = e == null ? 0 : e.length; ++n < a; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
var CA = IA;
function kA() {
}
var NA = kA, Qi = Lh, DA = NA, RA = ac, LA = 1 / 0, BA = Qi && 1 / RA(new Qi([, -0]))[1] == LA ? function(e) {
  return new Qi(e);
} : DA, FA = BA, UA = Th, WA = jA, qA = CA, zA = Mh, HA = FA, KA = ac, GA = 200;
function XA(e, t, r) {
  var n = -1, a = WA, i = e.length, o = !0, u = [], c = u;
  if (r)
    o = !1, a = qA;
  else if (i >= GA) {
    var s = t ? null : HA(e);
    if (s)
      return KA(s);
    o = !1, a = zA, c = new UA();
  } else
    c = t ? [] : u;
  e:
    for (; ++n < i; ) {
      var f = e[n], l = t ? t(f) : f;
      if (f = r || f !== 0 ? f : 0, o && l === l) {
        for (var d = c.length; d--; )
          if (c[d] === l)
            continue e;
        t && c.push(l), u.push(f);
      } else
        a(c, l, r) || (c !== u && c.push(l), u.push(f));
    }
  return u;
}
var VA = XA, YA = lt, ZA = VA;
function JA(e, t) {
  return e && e.length ? ZA(e, YA(t)) : [];
}
var QA = JA;
const Us = /* @__PURE__ */ ie(QA);
function zh(e, t, r) {
  return t === !0 ? Us(e, r) : Y(t) ? Us(e, t) : e;
}
function pr(e) {
  "@babel/helpers - typeof";
  return pr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pr(e);
}
var e_ = ["ref"];
function Ws(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Lt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ws(Object(r), !0).forEach(function(n) {
      Si(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ws(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function t_(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function qs(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Kh(n.key), n);
  }
}
function r_(e, t, r) {
  return t && qs(e.prototype, t), r && qs(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function n_(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ko(e, t);
}
function Ko(e, t) {
  return Ko = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Ko(e, t);
}
function a_(e) {
  var t = o_();
  return function() {
    var n = Ma(e), a;
    if (t) {
      var i = Ma(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return i_(this, a);
  };
}
function i_(e, t) {
  if (t && (pr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Hh(e);
}
function Hh(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function o_() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Ma(e) {
  return Ma = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ma(e);
}
function Si(e, t, r) {
  return t = Kh(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Kh(e) {
  var t = u_(e, "string");
  return pr(t) === "symbol" ? t : String(t);
}
function u_(e, t) {
  if (pr(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (pr(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function c_(e, t) {
  if (e == null)
    return {};
  var r = s_(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function s_(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function l_(e) {
  return e.value;
}
function f_(e, t) {
  if (/* @__PURE__ */ $.isValidElement(e))
    return /* @__PURE__ */ $.cloneElement(e, t);
  if (typeof e == "function")
    return /* @__PURE__ */ $.createElement(e, t);
  t.ref;
  var r = c_(t, e_);
  return /* @__PURE__ */ $.createElement(nc, r);
}
var zs = 1, cn = /* @__PURE__ */ function(e) {
  n_(r, e);
  var t = a_(r);
  function r() {
    var n;
    t_(this, r);
    for (var a = arguments.length, i = new Array(a), o = 0; o < a; o++)
      i[o] = arguments[o];
    return n = t.call.apply(t, [this].concat(i)), Si(Hh(n), "lastBoundingBox", {
      width: -1,
      height: -1
    }), n;
  }
  return r_(r, [{
    key: "componentDidMount",
    value: function() {
      this.updateBBox();
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      this.updateBBox();
    }
  }, {
    key: "getBBox",
    value: function() {
      return this.wrapperNode && this.wrapperNode.getBoundingClientRect ? this.wrapperNode.getBoundingClientRect() : null;
    }
  }, {
    key: "updateBBox",
    value: function() {
      var a = this.props.onBBoxUpdate;
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var i = this.wrapperNode.getBoundingClientRect();
        (Math.abs(i.width - this.lastBoundingBox.width) > zs || Math.abs(i.height - this.lastBoundingBox.height) > zs) && (this.lastBoundingBox.width = i.width, this.lastBoundingBox.height = i.height, a && a(i));
      } else
        (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1, a && a(null));
    }
  }, {
    key: "getBBoxSnapshot",
    value: function() {
      return this.lastBoundingBox.width >= 0 && this.lastBoundingBox.height >= 0 ? Lt({}, this.lastBoundingBox) : {
        width: 0,
        height: 0
      };
    }
  }, {
    key: "getDefaultPosition",
    value: function(a) {
      var i = this.props, o = i.layout, u = i.align, c = i.verticalAlign, s = i.margin, f = i.chartWidth, l = i.chartHeight, d, h;
      if (!a || (a.left === void 0 || a.left === null) && (a.right === void 0 || a.right === null))
        if (u === "center" && o === "vertical") {
          var y = this.getBBoxSnapshot();
          d = {
            left: ((f || 0) - y.width) / 2
          };
        } else
          d = u === "right" ? {
            right: s && s.right || 0
          } : {
            left: s && s.left || 0
          };
      if (!a || (a.top === void 0 || a.top === null) && (a.bottom === void 0 || a.bottom === null))
        if (c === "middle") {
          var g = this.getBBoxSnapshot();
          h = {
            top: ((l || 0) - g.height) / 2
          };
        } else
          h = c === "bottom" ? {
            bottom: s && s.bottom || 0
          } : {
            top: s && s.top || 0
          };
      return Lt(Lt({}, d), h);
    }
  }, {
    key: "render",
    value: function() {
      var a = this, i = this.props, o = i.content, u = i.width, c = i.height, s = i.wrapperStyle, f = i.payloadUniqBy, l = i.payload, d = Lt(Lt({
        position: "absolute",
        width: u || "auto",
        height: c || "auto"
      }, this.getDefaultPosition(s)), s);
      return /* @__PURE__ */ $.createElement("div", {
        className: "recharts-legend-wrapper",
        style: d,
        ref: function(y) {
          a.wrapperNode = y;
        }
      }, f_(o, Lt(Lt({}, this.props), {}, {
        payload: zh(l, f, l_)
      })));
    }
  }], [{
    key: "getWithHeight",
    value: function(a, i) {
      var o = a.props.layout;
      return o === "vertical" && L(a.props.height) ? {
        height: a.props.height
      } : o === "horizontal" ? {
        width: a.props.width || i
      } : null;
    }
  }]), r;
}(wt);
Si(cn, "displayName", "Legend");
Si(cn, "defaultProps", {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
});
var Hs = qn, d_ = ic, h_ = Ie, Ks = Hs ? Hs.isConcatSpreadable : void 0;
function p_(e) {
  return h_(e) || d_(e) || !!(Ks && e && e[Ks]);
}
var v_ = p_, y_ = Ih, g_ = v_;
function Gh(e, t, r, n, a) {
  var i = -1, o = e.length;
  for (r || (r = g_), a || (a = []); ++i < o; ) {
    var u = e[i];
    t > 0 && r(u) ? t > 1 ? Gh(u, t - 1, r, n, a) : y_(a, u) : n || (a[a.length] = u);
  }
  return a;
}
var Xh = Gh;
function m_(e) {
  return function(t, r, n) {
    for (var a = -1, i = Object(t), o = n(t), u = o.length; u--; ) {
      var c = o[e ? u : ++a];
      if (r(i[c], c, i) === !1)
        break;
    }
    return t;
  };
}
var b_ = m_, x_ = b_, w_ = x_(), O_ = w_, S_ = O_, A_ = Oi;
function __(e, t) {
  return e && S_(e, t, A_);
}
var Vh = __, $_ = Kn;
function P_(e, t) {
  return function(r, n) {
    if (r == null)
      return r;
    if (!$_(r))
      return e(r, n);
    for (var a = r.length, i = t ? a : -1, o = Object(r); (t ? i-- : ++i < a) && n(o[i], i, o) !== !1; )
      ;
    return r;
  };
}
var T_ = P_, E_ = Vh, M_ = T_, j_ = M_(E_), sc = j_, I_ = sc, C_ = Kn;
function k_(e, t) {
  var r = -1, n = C_(e) ? Array(e.length) : [];
  return I_(e, function(a, i, o) {
    n[++r] = t(a, i, o);
  }), n;
}
var Yh = k_;
function N_(e, t) {
  var r = e.length;
  for (e.sort(t); r--; )
    e[r] = e[r].value;
  return e;
}
var D_ = N_, Gs = Mr;
function R_(e, t) {
  if (e !== t) {
    var r = e !== void 0, n = e === null, a = e === e, i = Gs(e), o = t !== void 0, u = t === null, c = t === t, s = Gs(t);
    if (!u && !s && !i && e > t || i && o && c && !u && !s || n && o && c || !r && c || !a)
      return 1;
    if (!n && !i && !s && e < t || s && r && a && !n && !i || u && r && a || !o && a || !c)
      return -1;
  }
  return 0;
}
var L_ = R_, B_ = L_;
function F_(e, t, r) {
  for (var n = -1, a = e.criteria, i = t.criteria, o = a.length, u = r.length; ++n < o; ) {
    var c = B_(a[n], i[n]);
    if (c) {
      if (n >= u)
        return c;
      var s = r[n];
      return c * (s == "desc" ? -1 : 1);
    }
  }
  return e.index - t.index;
}
var U_ = F_, eo = Vu, W_ = Yu, q_ = lt, z_ = Yh, H_ = D_, K_ = Nh, G_ = U_, X_ = Rr, V_ = Ie;
function Y_(e, t, r) {
  t.length ? t = eo(t, function(i) {
    return V_(i) ? function(o) {
      return W_(o, i.length === 1 ? i[0] : i);
    } : i;
  }) : t = [X_];
  var n = -1;
  t = eo(t, K_(q_));
  var a = z_(e, function(i, o, u) {
    var c = eo(t, function(s) {
      return s(i);
    });
    return { criteria: c, index: ++n, value: i };
  });
  return H_(a, function(i, o) {
    return G_(i, o, r);
  });
}
var Z_ = Y_;
function J_(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
var Q_ = J_, e$ = Q_, Xs = Math.max;
function t$(e, t, r) {
  return t = Xs(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, a = -1, i = Xs(n.length - t, 0), o = Array(i); ++a < i; )
      o[a] = n[t + a];
    a = -1;
    for (var u = Array(t + 1); ++a < t; )
      u[a] = n[a];
    return u[t] = r(o), e$(e, this, u);
  };
}
var r$ = t$;
function n$(e) {
  return function() {
    return e;
  };
}
var a$ = n$, i$ = tr, o$ = function() {
  try {
    var e = i$(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Zh = o$, u$ = a$, Vs = Zh, c$ = Rr, s$ = Vs ? function(e, t) {
  return Vs(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: u$(t),
    writable: !0
  });
} : c$, l$ = s$, f$ = 800, d$ = 16, h$ = Date.now;
function p$(e) {
  var t = 0, r = 0;
  return function() {
    var n = h$(), a = d$ - (n - r);
    if (r = n, a > 0) {
      if (++t >= f$)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var v$ = p$, y$ = l$, g$ = v$, m$ = g$(y$), b$ = m$, x$ = Rr, w$ = r$, O$ = b$;
function S$(e, t) {
  return O$(w$(e, t, x$), e + "");
}
var A$ = S$, _$ = Hu, $$ = Kn, P$ = oc, T$ = jt;
function E$(e, t, r) {
  if (!T$(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? $$(r) && P$(t, r.length) : n == "string" && t in r) ? _$(r[t], e) : !1;
}
var Ai = E$, M$ = Xh, j$ = Z_, I$ = A$, Ys = Ai, C$ = I$(function(e, t) {
  if (e == null)
    return [];
  var r = t.length;
  return r > 1 && Ys(e, t[0], t[1]) ? t = [] : r > 2 && Ys(t[0], t[1], t[2]) && (t = [t[0]]), j$(e, M$(t, 1), []);
}), k$ = C$;
const lc = /* @__PURE__ */ ie(k$);
function sn(e) {
  "@babel/helpers - typeof";
  return sn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, sn(e);
}
function N$(e, t) {
  return B$(e) || L$(e, t) || R$(e, t) || D$();
}
function D$() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function R$(e, t) {
  if (e) {
    if (typeof e == "string")
      return Zs(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Zs(e, t);
  }
}
function Zs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function L$(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = !0, s = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r)
          return;
        c = !1;
      } else
        for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); c = !0)
          ;
    } catch (f) {
      s = !0, a = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o))
          return;
      } finally {
        if (s)
          throw a;
      }
    }
    return u;
  }
}
function B$(e) {
  if (Array.isArray(e))
    return e;
}
function Js(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function to(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Js(Object(r), !0).forEach(function(n) {
      F$(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Js(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function F$(e, t, r) {
  return t = U$(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function U$(e) {
  var t = W$(e, "string");
  return sn(t) === "symbol" ? t : String(t);
}
function W$(e, t) {
  if (sn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (sn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function q$(e) {
  return Array.isArray(e) && we(e[0]) && we(e[1]) ? e.join(" ~ ") : e;
}
var z$ = function(t) {
  var r = t.separator, n = r === void 0 ? " : " : r, a = t.contentStyle, i = a === void 0 ? {} : a, o = t.itemStyle, u = o === void 0 ? {} : o, c = t.labelStyle, s = c === void 0 ? {} : c, f = t.payload, l = t.formatter, d = t.itemSorter, h = t.wrapperClassName, y = t.labelClassName, g = t.label, v = t.labelFormatter, b = function() {
    if (f && f.length) {
      var _ = {
        padding: 0,
        margin: 0
      }, M = (d ? lc(f, d) : f).map(function(T, E) {
        if (T.type === "none")
          return null;
        var k = to({
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: T.color || "#000"
        }, u), j = T.formatter || l || q$, C = T.value, N = T.name, D = C, R = N;
        if (j && D != null && R != null) {
          var F = j(C, N, T, E, f);
          if (Array.isArray(F)) {
            var H = N$(F, 2);
            D = H[0], R = H[1];
          } else
            D = F;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ $.createElement("li", {
            className: "recharts-tooltip-item",
            key: "tooltip-item-".concat(E),
            style: k
          }, we(R) ? /* @__PURE__ */ $.createElement("span", {
            className: "recharts-tooltip-item-name"
          }, R) : null, we(R) ? /* @__PURE__ */ $.createElement("span", {
            className: "recharts-tooltip-item-separator"
          }, n) : null, /* @__PURE__ */ $.createElement("span", {
            className: "recharts-tooltip-item-value"
          }, D), /* @__PURE__ */ $.createElement("span", {
            className: "recharts-tooltip-item-unit"
          }, T.unit || ""))
        );
      });
      return /* @__PURE__ */ $.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: _
      }, M);
    }
    return null;
  }, x = to({
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  }, i), w = to({
    margin: 0
  }, s), O = !J(g), p = O ? g : "", m = ve("recharts-default-tooltip", h), S = ve("recharts-tooltip-label", y);
  return O && v && f !== void 0 && f !== null && (p = v(g, f)), /* @__PURE__ */ $.createElement("div", {
    className: m,
    style: x
  }, /* @__PURE__ */ $.createElement("p", {
    className: S,
    style: w
  }, /* @__PURE__ */ $.isValidElement(p) ? p : "".concat(p)), b());
}, H$ = Object.getOwnPropertyNames, K$ = Object.getOwnPropertySymbols, G$ = Object.prototype.hasOwnProperty;
function Qs(e, t) {
  return function(n, a, i) {
    return e(n, a, i) && t(n, a, i);
  };
}
function aa(e) {
  return function(r, n, a) {
    if (!r || !n || typeof r != "object" || typeof n != "object")
      return e(r, n, a);
    var i = a.cache, o = i.get(r), u = i.get(n);
    if (o && u)
      return o === n && u === r;
    i.set(r, n), i.set(n, r);
    var c = e(r, n, a);
    return i.delete(r), i.delete(n), c;
  };
}
function el(e) {
  return H$(e).concat(K$(e));
}
var Jh = Object.hasOwn || function(e, t) {
  return G$.call(e, t);
};
function Lr(e, t) {
  return e || t ? e === t : e === t || e !== e && t !== t;
}
var Qh = "_owner", tl = Object.getOwnPropertyDescriptor, rl = Object.keys;
function X$(e, t, r) {
  var n = e.length;
  if (t.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!r.equals(e[n], t[n], n, n, e, t, r))
      return !1;
  return !0;
}
function V$(e, t) {
  return Lr(e.getTime(), t.getTime());
}
function nl(e, t, r) {
  if (e.size !== t.size)
    return !1;
  for (var n = {}, a = e.entries(), i = 0, o, u; (o = a.next()) && !o.done; ) {
    for (var c = t.entries(), s = !1, f = 0; (u = c.next()) && !u.done; ) {
      var l = o.value, d = l[0], h = l[1], y = u.value, g = y[0], v = y[1];
      !s && !n[f] && (s = r.equals(d, g, i, f, e, t, r) && r.equals(h, v, d, g, e, t, r)) && (n[f] = !0), f++;
    }
    if (!s)
      return !1;
    i++;
  }
  return !0;
}
function Y$(e, t, r) {
  var n = rl(e), a = n.length;
  if (rl(t).length !== a)
    return !1;
  for (var i; a-- > 0; )
    if (i = n[a], i === Qh && (e.$$typeof || t.$$typeof) && e.$$typeof !== t.$$typeof || !Jh(t, i) || !r.equals(e[i], t[i], i, i, e, t, r))
      return !1;
  return !0;
}
function qr(e, t, r) {
  var n = el(e), a = n.length;
  if (el(t).length !== a)
    return !1;
  for (var i, o, u; a-- > 0; )
    if (i = n[a], i === Qh && (e.$$typeof || t.$$typeof) && e.$$typeof !== t.$$typeof || !Jh(t, i) || !r.equals(e[i], t[i], i, i, e, t, r) || (o = tl(e, i), u = tl(t, i), (o || u) && (!o || !u || o.configurable !== u.configurable || o.enumerable !== u.enumerable || o.writable !== u.writable)))
      return !1;
  return !0;
}
function Z$(e, t) {
  return Lr(e.valueOf(), t.valueOf());
}
function J$(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function al(e, t, r) {
  if (e.size !== t.size)
    return !1;
  for (var n = {}, a = e.values(), i, o; (i = a.next()) && !i.done; ) {
    for (var u = t.values(), c = !1, s = 0; (o = u.next()) && !o.done; )
      !c && !n[s] && (c = r.equals(i.value, o.value, i.value, o.value, e, t, r)) && (n[s] = !0), s++;
    if (!c)
      return !1;
  }
  return !0;
}
function Q$(e, t) {
  var r = e.length;
  if (t.length !== r)
    return !1;
  for (; r-- > 0; )
    if (e[r] !== t[r])
      return !1;
  return !0;
}
var eP = "[object Arguments]", tP = "[object Boolean]", rP = "[object Date]", nP = "[object Map]", aP = "[object Number]", iP = "[object Object]", oP = "[object RegExp]", uP = "[object Set]", cP = "[object String]", sP = Array.isArray, il = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, ol = Object.assign, lP = Object.prototype.toString.call.bind(Object.prototype.toString);
function fP(e) {
  var t = e.areArraysEqual, r = e.areDatesEqual, n = e.areMapsEqual, a = e.areObjectsEqual, i = e.arePrimitiveWrappersEqual, o = e.areRegExpsEqual, u = e.areSetsEqual, c = e.areTypedArraysEqual;
  return function(f, l, d) {
    if (f === l)
      return !0;
    if (f == null || l == null || typeof f != "object" || typeof l != "object")
      return f !== f && l !== l;
    var h = f.constructor;
    if (h !== l.constructor)
      return !1;
    if (h === Object)
      return a(f, l, d);
    if (sP(f))
      return t(f, l, d);
    if (il != null && il(f))
      return c(f, l, d);
    if (h === Date)
      return r(f, l, d);
    if (h === RegExp)
      return o(f, l, d);
    if (h === Map)
      return n(f, l, d);
    if (h === Set)
      return u(f, l, d);
    var y = lP(f);
    return y === rP ? r(f, l, d) : y === oP ? o(f, l, d) : y === nP ? n(f, l, d) : y === uP ? u(f, l, d) : y === iP ? typeof f.then != "function" && typeof l.then != "function" && a(f, l, d) : y === eP ? a(f, l, d) : y === tP || y === aP || y === cP ? i(f, l, d) : !1;
  };
}
function dP(e) {
  var t = e.circular, r = e.createCustomConfig, n = e.strict, a = {
    areArraysEqual: n ? qr : X$,
    areDatesEqual: V$,
    areMapsEqual: n ? Qs(nl, qr) : nl,
    areObjectsEqual: n ? qr : Y$,
    arePrimitiveWrappersEqual: Z$,
    areRegExpsEqual: J$,
    areSetsEqual: n ? Qs(al, qr) : al,
    areTypedArraysEqual: n ? qr : Q$
  };
  if (r && (a = ol({}, a, r(a))), t) {
    var i = aa(a.areArraysEqual), o = aa(a.areMapsEqual), u = aa(a.areObjectsEqual), c = aa(a.areSetsEqual);
    a = ol({}, a, {
      areArraysEqual: i,
      areMapsEqual: o,
      areObjectsEqual: u,
      areSetsEqual: c
    });
  }
  return a;
}
function hP(e) {
  return function(t, r, n, a, i, o, u) {
    return e(t, r, u);
  };
}
function pP(e) {
  var t = e.circular, r = e.comparator, n = e.createState, a = e.equals, i = e.strict;
  if (n)
    return function(c, s) {
      var f = n(), l = f.cache, d = l === void 0 ? t ? /* @__PURE__ */ new WeakMap() : void 0 : l, h = f.meta;
      return r(c, s, {
        cache: d,
        equals: a,
        meta: h,
        strict: i
      });
    };
  if (t)
    return function(c, s) {
      return r(c, s, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: a,
        meta: void 0,
        strict: i
      });
    };
  var o = {
    cache: void 0,
    equals: a,
    meta: void 0,
    strict: i
  };
  return function(c, s) {
    return r(c, s, o);
  };
}
var vP = It();
It({ strict: !0 });
It({ circular: !0 });
It({
  circular: !0,
  strict: !0
});
It({
  createInternalComparator: function() {
    return Lr;
  }
});
It({
  strict: !0,
  createInternalComparator: function() {
    return Lr;
  }
});
It({
  circular: !0,
  createInternalComparator: function() {
    return Lr;
  }
});
It({
  circular: !0,
  createInternalComparator: function() {
    return Lr;
  },
  strict: !0
});
function It(e) {
  e === void 0 && (e = {});
  var t = e.circular, r = t === void 0 ? !1 : t, n = e.createInternalComparator, a = e.createState, i = e.strict, o = i === void 0 ? !1 : i, u = dP(e), c = fP(u), s = n ? n(c) : hP(c);
  return pP({ circular: r, comparator: c, createState: a, equals: s, strict: o });
}
function yP(e) {
  typeof requestAnimationFrame < "u" && requestAnimationFrame(e);
}
function ul(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = -1, n = function a(i) {
    r < 0 && (r = i), i - r > t ? (e(i), r = -1) : yP(a);
  };
  requestAnimationFrame(n);
}
function Go(e) {
  "@babel/helpers - typeof";
  return Go = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Go(e);
}
function gP(e) {
  return wP(e) || xP(e) || bP(e) || mP();
}
function mP() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function bP(e, t) {
  if (e) {
    if (typeof e == "string")
      return cl(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return cl(e, t);
  }
}
function cl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function xP(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function wP(e) {
  if (Array.isArray(e))
    return e;
}
function OP() {
  var e = {}, t = function() {
    return null;
  }, r = !1, n = function a(i) {
    if (!r) {
      if (Array.isArray(i)) {
        if (!i.length)
          return;
        var o = i, u = gP(o), c = u[0], s = u.slice(1);
        if (typeof c == "number") {
          ul(a.bind(null, s), c);
          return;
        }
        a(c), ul(a.bind(null, s));
        return;
      }
      Go(i) === "object" && (e = i, t(e)), typeof i == "function" && i();
    }
  };
  return {
    stop: function() {
      r = !0;
    },
    start: function(i) {
      r = !1, n(i);
    },
    subscribe: function(i) {
      return t = i, function() {
        t = function() {
          return null;
        };
      };
    }
  };
}
function ln(e) {
  "@babel/helpers - typeof";
  return ln = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ln(e);
}
function sl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function vr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? sl(Object(r), !0).forEach(function(n) {
      ja(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : sl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ja(e, t, r) {
  return t = SP(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function SP(e) {
  var t = AP(e, "string");
  return ln(t) === "symbol" ? t : String(t);
}
function AP(e, t) {
  if (ln(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (ln(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var _P = ["Webkit", "Moz", "O", "ms"], $P = ["-webkit-", "-moz-", "-o-", "-ms-"], PP = ["transform", "transformOrigin", "transition"], TP = function(t, r) {
  return [Object.keys(t), Object.keys(r)].reduce(function(n, a) {
    return n.filter(function(i) {
      return a.includes(i);
    });
  });
}, EP = function(t) {
  return t;
}, MP = function(t) {
  return t.replace(/([A-Z])/g, function(r) {
    return "-".concat(r.toLowerCase());
  });
}, jP = function(t, r) {
  if (PP.indexOf(t) === -1)
    return ja({}, t, Number.isNaN(r) ? 0 : r);
  var n = t === "transition", a = t.replace(/(\w)/, function(o) {
    return o.toUpperCase();
  }), i = r;
  return _P.reduce(function(o, u, c) {
    return n && (i = r.replace(/(transform|transform-origin)/gim, "".concat($P[c], "$1"))), vr(vr({}, o), {}, ja({}, u + a, i));
  }, {});
}, Qr = function(t, r) {
  return Object.keys(r).reduce(function(n, a) {
    return vr(vr({}, n), {}, ja({}, a, t(a, r[a])));
  }, {});
}, fc = function(t) {
  return Object.keys(t).reduce(function(r, n) {
    return vr(vr({}, r), jP(n, r[n]));
  }, t);
}, ll = function(t, r, n) {
  return t.map(function(a) {
    return "".concat(MP(a), " ").concat(r, "ms ").concat(n);
  }).join(",");
}, IP = process.env.NODE_ENV !== "production", Ia = function(t, r, n, a, i, o, u, c) {
  if (IP && typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var s = [n, a, i, o, u, c], f = 0;
      console.warn(r.replace(/%s/g, function() {
        return s[f++];
      }));
    }
};
function CP(e, t) {
  return DP(e) || NP(e, t) || ep(e, t) || kP();
}
function kP() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function NP(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = !0, s = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r)
          return;
        c = !1;
      } else
        for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); c = !0)
          ;
    } catch (f) {
      s = !0, a = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o))
          return;
      } finally {
        if (s)
          throw a;
      }
    }
    return u;
  }
}
function DP(e) {
  if (Array.isArray(e))
    return e;
}
function RP(e) {
  return FP(e) || BP(e) || ep(e) || LP();
}
function LP() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ep(e, t) {
  if (e) {
    if (typeof e == "string")
      return Xo(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Xo(e, t);
  }
}
function BP(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function FP(e) {
  if (Array.isArray(e))
    return Xo(e);
}
function Xo(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
var Ca = 1e-4, tp = function(t, r) {
  return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1];
}, rp = function(t, r) {
  return t.map(function(n, a) {
    return n * Math.pow(r, a);
  }).reduce(function(n, a) {
    return n + a;
  });
}, fl = function(t, r) {
  return function(n) {
    var a = tp(t, r);
    return rp(a, n);
  };
}, UP = function(t, r) {
  return function(n) {
    var a = tp(t, r), i = [].concat(RP(a.map(function(o, u) {
      return o * u;
    }).slice(1)), [0]);
    return rp(i, n);
  };
}, dl = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var a = r[0], i = r[1], o = r[2], u = r[3];
  if (r.length === 1)
    switch (r[0]) {
      case "linear":
        a = 0, i = 0, o = 1, u = 1;
        break;
      case "ease":
        a = 0.25, i = 0.1, o = 0.25, u = 1;
        break;
      case "ease-in":
        a = 0.42, i = 0, o = 1, u = 1;
        break;
      case "ease-out":
        a = 0.42, i = 0, o = 0.58, u = 1;
        break;
      case "ease-in-out":
        a = 0, i = 0, o = 0.58, u = 1;
        break;
      default: {
        var c = r[0].split("(");
        if (c[0] === "cubic-bezier" && c[1].split(")")[0].split(",").length === 4) {
          var s = c[1].split(")")[0].split(",").map(function(v) {
            return parseFloat(v);
          }), f = CP(s, 4);
          a = f[0], i = f[1], o = f[2], u = f[3];
        } else
          Ia(!1, "[configBezier]: arguments should be one of oneOf 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', instead received %s", r);
      }
    }
  Ia([a, o, i, u].every(function(v) {
    return typeof v == "number" && v >= 0 && v <= 1;
  }), "[configBezier]: arguments should be x1, y1, x2, y2 of [0, 1] instead received %s", r);
  var l = fl(a, o), d = fl(i, u), h = UP(a, o), y = function(b) {
    return b > 1 ? 1 : b < 0 ? 0 : b;
  }, g = function(b) {
    for (var x = b > 1 ? 1 : b, w = x, O = 0; O < 8; ++O) {
      var p = l(w) - x, m = h(w);
      if (Math.abs(p - x) < Ca || m < Ca)
        return d(w);
      w = y(w - p / m);
    }
    return d(w);
  };
  return g.isStepper = !1, g;
}, WP = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.stiff, n = r === void 0 ? 100 : r, a = t.damping, i = a === void 0 ? 8 : a, o = t.dt, u = o === void 0 ? 17 : o, c = function(f, l, d) {
    var h = -(f - l) * n, y = d * i, g = d + (h - y) * u / 1e3, v = d * u / 1e3 + f;
    return Math.abs(v - l) < Ca && Math.abs(g) < Ca ? [l, 0] : [v, g];
  };
  return c.isStepper = !0, c.dt = u, c;
}, qP = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var a = r[0];
  if (typeof a == "string")
    switch (a) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return dl(a);
      case "spring":
        return WP();
      default:
        if (a.split("(")[0] === "cubic-bezier")
          return dl(a);
        Ia(!1, "[configEasing]: first argument should be one of 'ease', 'ease-in', 'ease-out', 'ease-in-out','cubic-bezier(x1,y1,x2,y2)', 'linear' and 'spring', instead  received %s", r);
    }
  return typeof a == "function" ? a : (Ia(!1, "[configEasing]: first argument type should be function or string, instead received %s", r), null);
};
function fn(e) {
  "@babel/helpers - typeof";
  return fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fn(e);
}
function hl(e) {
  return KP(e) || HP(e) || np(e) || zP();
}
function zP() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function HP(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function KP(e) {
  if (Array.isArray(e))
    return Yo(e);
}
function pl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _e(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pl(Object(r), !0).forEach(function(n) {
      Vo(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : pl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Vo(e, t, r) {
  return t = GP(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function GP(e) {
  var t = XP(e, "string");
  return fn(t) === "symbol" ? t : String(t);
}
function XP(e, t) {
  if (fn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (fn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function VP(e, t) {
  return JP(e) || ZP(e, t) || np(e, t) || YP();
}
function YP() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function np(e, t) {
  if (e) {
    if (typeof e == "string")
      return Yo(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Yo(e, t);
  }
}
function Yo(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function ZP(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = !0, s = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r)
          return;
        c = !1;
      } else
        for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); c = !0)
          ;
    } catch (f) {
      s = !0, a = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o))
          return;
      } finally {
        if (s)
          throw a;
      }
    }
    return u;
  }
}
function JP(e) {
  if (Array.isArray(e))
    return e;
}
var ka = function(t, r, n) {
  return t + (r - t) * n;
}, Zo = function(t) {
  var r = t.from, n = t.to;
  return r !== n;
}, QP = function e(t, r, n) {
  var a = Qr(function(i, o) {
    if (Zo(o)) {
      var u = t(o.from, o.to, o.velocity), c = VP(u, 2), s = c[0], f = c[1];
      return _e(_e({}, o), {}, {
        from: s,
        velocity: f
      });
    }
    return o;
  }, r);
  return n < 1 ? Qr(function(i, o) {
    return Zo(o) ? _e(_e({}, o), {}, {
      velocity: ka(o.velocity, a[i].velocity, n),
      from: ka(o.from, a[i].from, n)
    }) : o;
  }, r) : e(t, a, n - 1);
};
const eT = function(e, t, r, n, a) {
  var i = TP(e, t), o = i.reduce(function(v, b) {
    return _e(_e({}, v), {}, Vo({}, b, [e[b], t[b]]));
  }, {}), u = i.reduce(function(v, b) {
    return _e(_e({}, v), {}, Vo({}, b, {
      from: e[b],
      velocity: 0,
      to: t[b]
    }));
  }, {}), c = -1, s, f, l = function() {
    return null;
  }, d = function() {
    return Qr(function(b, x) {
      return x.from;
    }, u);
  }, h = function() {
    return !Object.values(u).filter(Zo).length;
  }, y = function(b) {
    s || (s = b);
    var x = b - s, w = x / r.dt;
    u = QP(r, u, w), a(_e(_e(_e({}, e), t), d())), s = b, h() || (c = requestAnimationFrame(l));
  }, g = function(b) {
    f || (f = b);
    var x = (b - f) / n, w = Qr(function(p, m) {
      return ka.apply(void 0, hl(m).concat([r(x)]));
    }, o);
    if (a(_e(_e(_e({}, e), t), w)), x < 1)
      c = requestAnimationFrame(l);
    else {
      var O = Qr(function(p, m) {
        return ka.apply(void 0, hl(m).concat([r(1)]));
      }, o);
      a(_e(_e(_e({}, e), t), O));
    }
  };
  return l = r.isStepper ? y : g, function() {
    return requestAnimationFrame(l), function() {
      cancelAnimationFrame(c);
    };
  };
};
function yr(e) {
  "@babel/helpers - typeof";
  return yr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, yr(e);
}
var tT = ["children", "begin", "duration", "attributeName", "easing", "isActive", "steps", "from", "to", "canBegin", "onAnimationEnd", "shouldReAnimate", "onAnimationReStart"];
function rT(e, t) {
  if (e == null)
    return {};
  var r = nT(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function nT(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function ro(e) {
  return uT(e) || oT(e) || iT(e) || aT();
}
function aT() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function iT(e, t) {
  if (e) {
    if (typeof e == "string")
      return Jo(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Jo(e, t);
  }
}
function oT(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function uT(e) {
  if (Array.isArray(e))
    return Jo(e);
}
function Jo(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function vl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ye(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vl(Object(r), !0).forEach(function(n) {
      Zr(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Zr(e, t, r) {
  return t = ap(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function cT(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function yl(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, ap(n.key), n);
  }
}
function sT(e, t, r) {
  return t && yl(e.prototype, t), r && yl(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function ap(e) {
  var t = lT(e, "string");
  return yr(t) === "symbol" ? t : String(t);
}
function lT(e, t) {
  if (yr(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (yr(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function fT(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Qo(e, t);
}
function Qo(e, t) {
  return Qo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Qo(e, t);
}
function dT(e) {
  var t = hT();
  return function() {
    var n = Na(e), a;
    if (t) {
      var i = Na(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return eu(this, a);
  };
}
function eu(e, t) {
  if (t && (yr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return tu(e);
}
function tu(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function hT() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Na(e) {
  return Na = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Na(e);
}
var Mt = /* @__PURE__ */ function(e) {
  fT(r, e);
  var t = dT(r);
  function r(n, a) {
    var i;
    cT(this, r), i = t.call(this, n, a);
    var o = i.props, u = o.isActive, c = o.attributeName, s = o.from, f = o.to, l = o.steps, d = o.children, h = o.duration;
    if (i.handleStyleChange = i.handleStyleChange.bind(tu(i)), i.changeStyle = i.changeStyle.bind(tu(i)), !u || h <= 0)
      return i.state = {
        style: {}
      }, typeof d == "function" && (i.state = {
        style: f
      }), eu(i);
    if (l && l.length)
      i.state = {
        style: l[0].style
      };
    else if (s) {
      if (typeof d == "function")
        return i.state = {
          style: s
        }, eu(i);
      i.state = {
        style: c ? Zr({}, c, s) : s
      };
    } else
      i.state = {
        style: {}
      };
    return i;
  }
  return sT(r, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props, i = a.isActive, o = a.canBegin;
      this.mounted = !0, !(!i || !o) && this.runAnimation(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function(a) {
      var i = this.props, o = i.isActive, u = i.canBegin, c = i.attributeName, s = i.shouldReAnimate, f = i.to, l = i.from, d = this.state.style;
      if (u) {
        if (!o) {
          var h = {
            style: c ? Zr({}, c, f) : f
          };
          this.state && d && (c && d[c] !== f || !c && d !== f) && this.setState(h);
          return;
        }
        if (!(vP(a.to, f) && a.canBegin && a.isActive)) {
          var y = !a.canBegin || !a.isActive;
          this.manager && this.manager.stop(), this.stopJSAnimation && this.stopJSAnimation();
          var g = y || s ? l : a.to;
          if (this.state && d) {
            var v = {
              style: c ? Zr({}, c, g) : g
            };
            (c && [c] !== g || !c && d !== g) && this.setState(v);
          }
          this.runAnimation(Ye(Ye({}, this.props), {}, {
            from: g,
            begin: 0
          }));
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.mounted = !1;
      var a = this.props.onAnimationEnd;
      this.unSubscribe && this.unSubscribe(), this.manager && (this.manager.stop(), this.manager = null), this.stopJSAnimation && this.stopJSAnimation(), a && a();
    }
  }, {
    key: "handleStyleChange",
    value: function(a) {
      this.changeStyle(a);
    }
  }, {
    key: "changeStyle",
    value: function(a) {
      this.mounted && this.setState({
        style: a
      });
    }
  }, {
    key: "runJSAnimation",
    value: function(a) {
      var i = this, o = a.from, u = a.to, c = a.duration, s = a.easing, f = a.begin, l = a.onAnimationEnd, d = a.onAnimationStart, h = eT(o, u, qP(s), c, this.changeStyle), y = function() {
        i.stopJSAnimation = h();
      };
      this.manager.start([d, f, y, c, l]);
    }
  }, {
    key: "runStepAnimation",
    value: function(a) {
      var i = this, o = a.steps, u = a.begin, c = a.onAnimationStart, s = o[0], f = s.style, l = s.duration, d = l === void 0 ? 0 : l, h = function(g, v, b) {
        if (b === 0)
          return g;
        var x = v.duration, w = v.easing, O = w === void 0 ? "ease" : w, p = v.style, m = v.properties, S = v.onAnimationEnd, A = b > 0 ? o[b - 1] : v, _ = m || Object.keys(p);
        if (typeof O == "function" || O === "spring")
          return [].concat(ro(g), [i.runJSAnimation.bind(i, {
            from: A.style,
            to: p,
            duration: x,
            easing: O
          }), x]);
        var M = ll(_, x, O), T = Ye(Ye(Ye({}, A.style), p), {}, {
          transition: M
        });
        return [].concat(ro(g), [T, x, S]).filter(EP);
      };
      return this.manager.start([c].concat(ro(o.reduce(h, [f, Math.max(d, u)])), [a.onAnimationEnd]));
    }
  }, {
    key: "runAnimation",
    value: function(a) {
      this.manager || (this.manager = OP());
      var i = a.begin, o = a.duration, u = a.attributeName, c = a.to, s = a.easing, f = a.onAnimationStart, l = a.onAnimationEnd, d = a.steps, h = a.children, y = this.manager;
      if (this.unSubscribe = y.subscribe(this.handleStyleChange), typeof s == "function" || typeof h == "function" || s === "spring") {
        this.runJSAnimation(a);
        return;
      }
      if (d.length > 1) {
        this.runStepAnimation(a);
        return;
      }
      var g = u ? Zr({}, u, c) : c, v = ll(Object.keys(g), o, s);
      y.start([f, i, Ye(Ye({}, g), {}, {
        transition: v
      }), o, l]);
    }
  }, {
    key: "render",
    value: function() {
      var a = this.props, i = a.children;
      a.begin;
      var o = a.duration;
      a.attributeName, a.easing;
      var u = a.isActive;
      a.steps, a.from, a.to, a.canBegin, a.onAnimationEnd, a.shouldReAnimate, a.onAnimationReStart;
      var c = rT(a, tT), s = Xt.count(i), f = fc(this.state.style);
      if (typeof i == "function")
        return i(f);
      if (!u || s === 0 || o <= 0)
        return i;
      var l = function(h) {
        var y = h.props, g = y.style, v = g === void 0 ? {} : g, b = y.className, x = /* @__PURE__ */ ge(h, Ye(Ye({}, c), {}, {
          style: Ye(Ye({}, v), f),
          className: b
        }));
        return x;
      };
      return s === 1 ? l(Xt.only(i)) : /* @__PURE__ */ $.createElement("div", null, Xt.map(i, function(d) {
        return l(d);
      }));
    }
  }]), r;
}(wt);
Mt.displayName = "Animate";
Mt.defaultProps = {
  begin: 0,
  duration: 1e3,
  from: "",
  to: "",
  attributeName: "",
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  steps: [],
  onAnimationEnd: function() {
  },
  onAnimationStart: function() {
  }
};
Mt.propTypes = {
  from: G.oneOfType([G.object, G.string]),
  to: G.oneOfType([G.object, G.string]),
  attributeName: G.string,
  // animation duration
  duration: G.number,
  begin: G.number,
  easing: G.oneOfType([G.string, G.func]),
  steps: G.arrayOf(G.shape({
    duration: G.number.isRequired,
    style: G.object.isRequired,
    easing: G.oneOfType([G.oneOf(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]), G.func]),
    // transition css properties(dash case), optional
    properties: G.arrayOf("string"),
    onAnimationEnd: G.func
  })),
  children: G.oneOfType([G.node, G.func]),
  isActive: G.bool,
  canBegin: G.bool,
  onAnimationEnd: G.func,
  // decide if it should reanimate with initial from style when props change
  shouldReAnimate: G.bool,
  onAnimationStart: G.func,
  onAnimationReStart: G.func
};
Number.isFinite === void 0 && (Number.isFinite = function(e) {
  return typeof e == "number" && isFinite(e);
});
G.object, G.object, G.object, G.element;
G.object, G.object, G.object, G.oneOfType([G.array, G.element]), G.any;
function dn(e) {
  "@babel/helpers - typeof";
  return dn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, dn(e);
}
function ia(e, t, r) {
  return t = pT(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function pT(e) {
  var t = vT(e, "string");
  return dn(t) === "symbol" ? t : String(t);
}
function vT(e, t) {
  if (dn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (dn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var zr = "recharts-tooltip-wrapper", yT = {
  visibility: "hidden"
};
function gT(e) {
  var t, r = e.coordinate, n = e.translateX, a = e.translateY;
  return ve(zr, (t = {}, ia(t, "".concat(zr, "-right"), L(n) && r && L(r.x) && n >= r.x), ia(t, "".concat(zr, "-left"), L(n) && r && L(r.x) && n < r.x), ia(t, "".concat(zr, "-bottom"), L(a) && r && L(r.y) && a >= r.y), ia(t, "".concat(zr, "-top"), L(a) && r && L(r.y) && a < r.y), t));
}
function gl(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.key, a = e.offsetTopLeft, i = e.position, o = e.reverseDirection, u = e.tooltipDimension, c = e.viewBox, s = e.viewBoxDimension;
  if (i && L(i[n]))
    return i[n];
  var f = r[n] - u - a, l = r[n] + a;
  if (t[n])
    return o[n] ? f : l;
  if (o[n]) {
    var d = f, h = c[n];
    return d < h ? Math.max(l, c[n]) : Math.max(f, c[n]);
  }
  var y = l + u, g = c[n] + s;
  return y > g ? Math.max(f, c[n]) : Math.max(l, c[n]);
}
function mT(e) {
  var t = e.translateX, r = e.translateY, n = e.useTranslate3d;
  return fc({
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  });
}
function bT(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.offsetTopLeft, a = e.position, i = e.reverseDirection, o = e.tooltipBox, u = e.useTranslate3d, c = e.viewBox, s, f, l;
  return o.height > 0 && o.width > 0 && r ? (f = gl({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offsetTopLeft: n,
    position: a,
    reverseDirection: i,
    tooltipDimension: o.width,
    viewBox: c,
    viewBoxDimension: c.width
  }), l = gl({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offsetTopLeft: n,
    position: a,
    reverseDirection: i,
    tooltipDimension: o.height,
    viewBox: c,
    viewBoxDimension: c.height
  }), s = mT({
    translateX: f,
    translateY: l,
    useTranslate3d: u
  })) : s = yT, {
    cssProperties: s,
    cssClasses: gT({
      translateX: f,
      translateY: l,
      coordinate: r
    })
  };
}
function gr(e) {
  "@babel/helpers - typeof";
  return gr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, gr(e);
}
function ml(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function no(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ml(Object(r), !0).forEach(function(n) {
      ga(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ml(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function xT(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function bl(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, ip(n.key), n);
  }
}
function wT(e, t, r) {
  return t && bl(e.prototype, t), r && bl(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function OT(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ru(e, t);
}
function ru(e, t) {
  return ru = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ru(e, t);
}
function ST(e) {
  var t = _T();
  return function() {
    var n = Da(e), a;
    if (t) {
      var i = Da(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return AT(this, a);
  };
}
function AT(e, t) {
  if (t && (gr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return ya(e);
}
function ya(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _T() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Da(e) {
  return Da = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Da(e);
}
function ga(e, t, r) {
  return t = ip(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ip(e) {
  var t = $T(e, "string");
  return gr(t) === "symbol" ? t : String(t);
}
function $T(e, t) {
  if (gr(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (gr(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var xl = 1, PT = /* @__PURE__ */ function(e) {
  OT(r, e);
  var t = ST(r);
  function r() {
    var n;
    xT(this, r);
    for (var a = arguments.length, i = new Array(a), o = 0; o < a; o++)
      i[o] = arguments[o];
    return n = t.call.apply(t, [this].concat(i)), ga(ya(n), "state", {
      dismissed: !1,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      }
    }), ga(ya(n), "lastBoundingBox", {
      width: -1,
      height: -1
    }), ga(ya(n), "handleKeyDown", function(u) {
      if (u.key === "Escape") {
        var c, s, f, l;
        n.setState({
          dismissed: !0,
          dismissedAtCoordinate: {
            x: (c = (s = n.props.coordinate) === null || s === void 0 ? void 0 : s.x) !== null && c !== void 0 ? c : 0,
            y: (f = (l = n.props.coordinate) === null || l === void 0 ? void 0 : l.y) !== null && f !== void 0 ? f : 0
          }
        });
      }
    }), n;
  }
  return wT(r, [{
    key: "updateBBox",
    value: function() {
      if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
        var a = this.wrapperNode.getBoundingClientRect();
        (Math.abs(a.width - this.lastBoundingBox.width) > xl || Math.abs(a.height - this.lastBoundingBox.height) > xl) && (this.lastBoundingBox.width = a.width, this.lastBoundingBox.height = a.height);
      } else
        (this.lastBoundingBox.width !== -1 || this.lastBoundingBox.height !== -1) && (this.lastBoundingBox.width = -1, this.lastBoundingBox.height = -1);
    }
  }, {
    key: "componentDidMount",
    value: function() {
      document.addEventListener("keydown", this.handleKeyDown), this.updateBBox();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      document.removeEventListener("keydown", this.handleKeyDown);
    }
  }, {
    key: "componentDidUpdate",
    value: function() {
      var a, i;
      this.props.active && this.updateBBox(), this.state.dismissed && (((a = this.props.coordinate) === null || a === void 0 ? void 0 : a.x) !== this.state.dismissedAtCoordinate.x || ((i = this.props.coordinate) === null || i === void 0 ? void 0 : i.y) !== this.state.dismissedAtCoordinate.y) && (this.state.dismissed = !1);
    }
  }, {
    key: "render",
    value: function() {
      var a = this, i = this.props, o = i.active, u = i.allowEscapeViewBox, c = i.animationDuration, s = i.animationEasing, f = i.children, l = i.coordinate, d = i.hasPayload, h = i.isAnimationActive, y = i.offset, g = i.position, v = i.reverseDirection, b = i.useTranslate3d, x = i.viewBox, w = i.wrapperStyle, O = bT({
        allowEscapeViewBox: u,
        coordinate: l,
        offsetTopLeft: y,
        position: g,
        reverseDirection: v,
        tooltipBox: {
          height: this.lastBoundingBox.height,
          width: this.lastBoundingBox.width
        },
        useTranslate3d: b,
        viewBox: x
      }), p = O.cssClasses, m = O.cssProperties, S = no(no(no({}, h && o && fc({
        transition: "transform ".concat(c, "ms ").concat(s)
      })), m), {}, {
        pointerEvents: "none",
        visibility: !this.state.dismissed && o && d ? "visible" : "hidden",
        position: "absolute",
        top: 0,
        left: 0
      }, w);
      return (
        // This element allow listening to the `Escape` key.
        // See https://github.com/recharts/recharts/pull/2925
        /* @__PURE__ */ $.createElement("div", {
          tabIndex: -1,
          role: "dialog",
          className: p,
          style: S,
          ref: function(_) {
            a.wrapperNode = _;
          }
        }, f)
      );
    }
  }]), r;
}(wt), TT = function() {
  return !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout);
}, Vt = {
  isSsr: TT(),
  get: function(t) {
    return Vt[t];
  },
  set: function(t, r) {
    if (typeof t == "string")
      Vt[t] = r;
    else {
      var n = Object.keys(t);
      n && n.length && n.forEach(function(a) {
        Vt[a] = t[a];
      });
    }
  }
};
function mr(e) {
  "@babel/helpers - typeof";
  return mr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, mr(e);
}
function wl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ol(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wl(Object(r), !0).forEach(function(n) {
      dc(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ET(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Sl(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, op(n.key), n);
  }
}
function MT(e, t, r) {
  return t && Sl(e.prototype, t), r && Sl(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function jT(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && nu(e, t);
}
function nu(e, t) {
  return nu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, nu(e, t);
}
function IT(e) {
  var t = NT();
  return function() {
    var n = Ra(e), a;
    if (t) {
      var i = Ra(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return CT(this, a);
  };
}
function CT(e, t) {
  if (t && (mr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return kT(e);
}
function kT(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function NT() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Ra(e) {
  return Ra = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ra(e);
}
function dc(e, t, r) {
  return t = op(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function op(e) {
  var t = DT(e, "string");
  return mr(t) === "symbol" ? t : String(t);
}
function DT(e, t) {
  if (mr(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (mr(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function RT(e) {
  return e.dataKey;
}
function LT(e, t) {
  return /* @__PURE__ */ $.isValidElement(e) ? /* @__PURE__ */ $.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ $.createElement(e, t) : /* @__PURE__ */ $.createElement(z$, t);
}
var rt = /* @__PURE__ */ function(e) {
  jT(r, e);
  var t = IT(r);
  function r() {
    return ET(this, r), t.apply(this, arguments);
  }
  return MT(r, [{
    key: "render",
    value: function() {
      var a = this, i = this.props, o = i.active, u = i.allowEscapeViewBox, c = i.animationDuration, s = i.animationEasing, f = i.content, l = i.coordinate, d = i.filterNull, h = i.isAnimationActive, y = i.offset, g = i.payload, v = i.payloadUniqBy, b = i.position, x = i.reverseDirection, w = i.useTranslate3d, O = i.viewBox, p = i.wrapperStyle, m = g ?? [];
      d && m.length && (m = zh(g.filter(function(A) {
        return A.value != null && (A.hide !== !0 || a.props.includeHidden);
      }), v, RT));
      var S = m.length > 0;
      return /* @__PURE__ */ $.createElement(PT, {
        allowEscapeViewBox: u,
        animationDuration: c,
        animationEasing: s,
        isAnimationActive: h,
        active: o,
        coordinate: l,
        hasPayload: S,
        offset: y,
        position: b,
        reverseDirection: x,
        useTranslate3d: w,
        viewBox: O,
        wrapperStyle: p
      }, LT(f, Ol(Ol({}, this.props), {}, {
        payload: m
      })));
    }
  }]), r;
}(wt);
dc(rt, "displayName", "Tooltip");
dc(rt, "defaultProps", {
  allowEscapeViewBox: {
    x: !1,
    y: !1
  },
  animationDuration: 400,
  animationEasing: "ease",
  contentStyle: {},
  coordinate: {
    x: 0,
    y: 0
  },
  cursor: !0,
  cursorStyle: {},
  filterNull: !0,
  isAnimationActive: !Vt.isSsr,
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: !1,
    y: !1
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: !1,
  viewBox: {
    x: 0,
    y: 0,
    height: 0,
    width: 0
  },
  wrapperStyle: {}
});
var BT = st, FT = function() {
  return BT.Date.now();
}, UT = FT, WT = /\s/;
function qT(e) {
  for (var t = e.length; t-- && WT.test(e.charAt(t)); )
    ;
  return t;
}
var zT = qT, HT = zT, KT = /^\s+/;
function GT(e) {
  return e && e.slice(0, HT(e) + 1).replace(KT, "");
}
var XT = GT, VT = XT, Al = jt, YT = Mr, _l = NaN, ZT = /^[-+]0x[0-9a-f]+$/i, JT = /^0b[01]+$/i, QT = /^0o[0-7]+$/i, eE = parseInt;
function tE(e) {
  if (typeof e == "number")
    return e;
  if (YT(e))
    return _l;
  if (Al(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Al(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = VT(e);
  var r = JT.test(e);
  return r || QT.test(e) ? eE(e.slice(2), r ? 2 : 8) : ZT.test(e) ? _l : +e;
}
var up = tE, rE = jt, ao = UT, $l = up, nE = "Expected a function", aE = Math.max, iE = Math.min;
function oE(e, t, r) {
  var n, a, i, o, u, c, s = 0, f = !1, l = !1, d = !0;
  if (typeof e != "function")
    throw new TypeError(nE);
  t = $l(t) || 0, rE(r) && (f = !!r.leading, l = "maxWait" in r, i = l ? aE($l(r.maxWait) || 0, t) : i, d = "trailing" in r ? !!r.trailing : d);
  function h(m) {
    var S = n, A = a;
    return n = a = void 0, s = m, o = e.apply(A, S), o;
  }
  function y(m) {
    return s = m, u = setTimeout(b, t), f ? h(m) : o;
  }
  function g(m) {
    var S = m - c, A = m - s, _ = t - S;
    return l ? iE(_, i - A) : _;
  }
  function v(m) {
    var S = m - c, A = m - s;
    return c === void 0 || S >= t || S < 0 || l && A >= i;
  }
  function b() {
    var m = ao();
    if (v(m))
      return x(m);
    u = setTimeout(b, g(m));
  }
  function x(m) {
    return u = void 0, d && n ? h(m) : (n = a = void 0, o);
  }
  function w() {
    u !== void 0 && clearTimeout(u), s = 0, n = c = a = u = void 0;
  }
  function O() {
    return u === void 0 ? o : x(ao());
  }
  function p() {
    var m = ao(), S = v(m);
    if (n = arguments, a = this, c = m, S) {
      if (u === void 0)
        return y(c);
      if (l)
        return clearTimeout(u), u = setTimeout(b, t), h(c);
    }
    return u === void 0 && (u = setTimeout(b, t)), o;
  }
  return p.cancel = w, p.flush = O, p;
}
var uE = oE, cE = uE, sE = jt, lE = "Expected a function";
function fE(e, t, r) {
  var n = !0, a = !0;
  if (typeof e != "function")
    throw new TypeError(lE);
  return sE(r) && (n = "leading" in r ? !!r.leading : n, a = "trailing" in r ? !!r.trailing : a), cE(e, t, {
    leading: n,
    maxWait: t,
    trailing: a
  });
}
var dE = fE;
const cp = /* @__PURE__ */ ie(dE);
function hn(e) {
  "@babel/helpers - typeof";
  return hn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, hn(e);
}
function Pl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function oa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Pl(Object(r), !0).forEach(function(n) {
      hE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Pl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hE(e, t, r) {
  return t = pE(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function pE(e) {
  var t = vE(e, "string");
  return hn(t) === "symbol" ? t : String(t);
}
function vE(e, t) {
  if (hn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (hn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function yE(e, t) {
  return xE(e) || bE(e, t) || mE(e, t) || gE();
}
function gE() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mE(e, t) {
  if (e) {
    if (typeof e == "string")
      return Tl(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Tl(e, t);
  }
}
function Tl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function bE(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = !0, s = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r)
          return;
        c = !1;
      } else
        for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); c = !0)
          ;
    } catch (f) {
      s = !0, a = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o))
          return;
      } finally {
        if (s)
          throw a;
      }
    }
    return u;
  }
}
function xE(e) {
  if (Array.isArray(e))
    return e;
}
var wE = /* @__PURE__ */ Bv(function(e, t) {
  var r = e.aspect, n = e.initialDimension, a = n === void 0 ? {
    width: -1,
    height: -1
  } : n, i = e.width, o = i === void 0 ? "100%" : i, u = e.height, c = u === void 0 ? "100%" : u, s = e.minWidth, f = s === void 0 ? 0 : s, l = e.minHeight, d = e.maxHeight, h = e.children, y = e.debounce, g = y === void 0 ? 0 : y, v = e.id, b = e.className, x = e.onResize, w = e.style, O = w === void 0 ? {} : w, p = ba(null), m = ba();
  m.current = x, Fv(t, function() {
    return Object.assign(p.current, {
      get current() {
        return console.warn("The usage of ref.current.current is deprecated and will no longer be supported."), p.current;
      }
    });
  });
  var S = Uu({
    containerWidth: a.width,
    containerHeight: a.height
  }), A = yE(S, 2), _ = A[0], M = A[1], T = Uv(function(k, j) {
    M(function(C) {
      var N = Math.round(k), D = Math.round(j);
      return C.containerWidth === N && C.containerHeight === D ? C : {
        containerWidth: N,
        containerHeight: D
      };
    });
  }, []);
  Wu(function() {
    var k = function(F) {
      var H, re = F[0].contentRect, q = re.width, fe = re.height;
      T(q, fe), (H = m.current) === null || H === void 0 || H.call(m, q, fe);
    };
    g > 0 && (k = cp(k, g, {
      trailing: !0,
      leading: !1
    }));
    var j = new ResizeObserver(k), C = p.current.getBoundingClientRect(), N = C.width, D = C.height;
    return T(N, D), j.observe(p.current), function() {
      j.disconnect();
    };
  }, [T, g]);
  var E = qd(function() {
    var k = _.containerWidth, j = _.containerHeight;
    if (k < 0 || j < 0)
      return null;
    yt(Ht(o) || Ht(c), `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`, o, c), yt(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
    var C = Ht(o) ? k : o, N = Ht(c) ? j : c;
    r && r > 0 && (C ? N = C / r : N && (C = N * r), d && N > d && (N = d)), yt(C > 0 || N > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, C, N, o, c, f, l, r);
    var D = !Array.isArray(h) && Ao.isElement(h) && vt(h.type).endsWith("Chart");
    return $.Children.map(h, function(R) {
      return Ao.isElement(R) ? /* @__PURE__ */ ge(R, oa({
        width: C,
        height: N
      }, D ? {
        style: oa({
          height: "100%",
          width: "100%",
          maxHeight: N,
          maxWidth: C
        }, R.props.style)
      } : {})) : R;
    });
  }, [r, h, c, d, l, f, _, o]);
  return /* @__PURE__ */ $.createElement("div", {
    id: v ? "".concat(v) : void 0,
    className: ve("recharts-responsive-container", b),
    style: oa(oa({}, O), {}, {
      width: o,
      height: c,
      minWidth: f,
      minHeight: l,
      maxHeight: d
    }),
    ref: p
  }, E);
}), hc = function(t) {
  return null;
};
hc.displayName = "Cell";
function pn(e) {
  "@babel/helpers - typeof";
  return pn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pn(e);
}
function El(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function au(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? El(Object(r), !0).forEach(function(n) {
      OE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : El(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function OE(e, t, r) {
  return t = SE(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function SE(e) {
  var t = AE(e, "string");
  return pn(t) === "symbol" ? t : String(t);
}
function AE(e, t) {
  if (pn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (pn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ar = {
  widthCache: {},
  cacheCount: 0
}, _E = 2e3, $E = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, Ml = "recharts_measurement_span";
function PE(e) {
  var t = au({}, e);
  return Object.keys(t).forEach(function(r) {
    t[r] || delete t[r];
  }), t;
}
var jl = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || Vt.isSsr)
    return {
      width: 0,
      height: 0
    };
  var n = PE(r), a = JSON.stringify({
    text: t,
    copyStyle: n
  });
  if (ar.widthCache[a])
    return ar.widthCache[a];
  try {
    var i = document.getElementById(Ml);
    i || (i = document.createElement("span"), i.setAttribute("id", Ml), i.setAttribute("aria-hidden", "true"), document.body.appendChild(i));
    var o = au(au({}, $E), n);
    Object.assign(i.style, o), i.textContent = "".concat(t);
    var u = i.getBoundingClientRect(), c = {
      width: u.width,
      height: u.height
    };
    return ar.widthCache[a] = c, ++ar.cacheCount > _E && (ar.cacheCount = 0, ar.widthCache = {}), c;
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, TE = function(t) {
  return {
    top: t.top + window.scrollY - document.documentElement.clientTop,
    left: t.left + window.scrollX - document.documentElement.clientLeft
  };
};
function vn(e) {
  "@babel/helpers - typeof";
  return vn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, vn(e);
}
function La(e, t) {
  return IE(e) || jE(e, t) || ME(e, t) || EE();
}
function EE() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ME(e, t) {
  if (e) {
    if (typeof e == "string")
      return Il(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Il(e, t);
  }
}
function Il(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function jE(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = !0, s = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r)
          return;
        c = !1;
      } else
        for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); c = !0)
          ;
    } catch (f) {
      s = !0, a = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o))
          return;
      } finally {
        if (s)
          throw a;
      }
    }
    return u;
  }
}
function IE(e) {
  if (Array.isArray(e))
    return e;
}
function CE(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Cl(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, NE(n.key), n);
  }
}
function kE(e, t, r) {
  return t && Cl(e.prototype, t), r && Cl(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function NE(e) {
  var t = DE(e, "string");
  return vn(t) === "symbol" ? t : String(t);
}
function DE(e, t) {
  if (vn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (vn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var kl = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, Nl = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, RE = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/, LE = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, sp = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, BE = Object.keys(sp), ur = "NaN";
function FE(e, t) {
  return e * sp[t];
}
var ua = /* @__PURE__ */ function() {
  function e(t, r) {
    CE(this, e), this.num = t, this.unit = r, this.num = t, this.unit = r, Number.isNaN(t) && (this.unit = ""), r !== "" && !RE.test(r) && (this.num = NaN, this.unit = ""), BE.includes(r) && (this.num = FE(t, r), this.unit = "px");
  }
  return kE(e, [{
    key: "add",
    value: function(r) {
      return this.unit !== r.unit ? new e(NaN, "") : new e(this.num + r.num, this.unit);
    }
  }, {
    key: "subtract",
    value: function(r) {
      return this.unit !== r.unit ? new e(NaN, "") : new e(this.num - r.num, this.unit);
    }
  }, {
    key: "multiply",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new e(NaN, "") : new e(this.num * r.num, this.unit || r.unit);
    }
  }, {
    key: "divide",
    value: function(r) {
      return this.unit !== "" && r.unit !== "" && this.unit !== r.unit ? new e(NaN, "") : new e(this.num / r.num, this.unit || r.unit);
    }
  }, {
    key: "toString",
    value: function() {
      return "".concat(this.num).concat(this.unit);
    }
  }, {
    key: "isNaN",
    value: function() {
      return Number.isNaN(this.num);
    }
  }], [{
    key: "parse",
    value: function(r) {
      var n, a = (n = LE.exec(r)) !== null && n !== void 0 ? n : [], i = La(a, 3), o = i[1], u = i[2];
      return new e(parseFloat(o), u ?? "");
    }
  }]), e;
}();
function lp(e) {
  if (e.includes(ur))
    return ur;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, n = (r = kl.exec(t)) !== null && r !== void 0 ? r : [], a = La(n, 4), i = a[1], o = a[2], u = a[3], c = ua.parse(i ?? ""), s = ua.parse(u ?? ""), f = o === "*" ? c.multiply(s) : c.divide(s);
    if (f.isNaN())
      return ur;
    t = t.replace(kl, f.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var l, d = (l = Nl.exec(t)) !== null && l !== void 0 ? l : [], h = La(d, 4), y = h[1], g = h[2], v = h[3], b = ua.parse(y ?? ""), x = ua.parse(v ?? ""), w = g === "+" ? b.add(x) : b.subtract(x);
    if (w.isNaN())
      return ur;
    t = t.replace(Nl, w.toString());
  }
  return t;
}
var Dl = /\(([^()]*)\)/;
function UE(e) {
  for (var t = e; t.includes("("); ) {
    var r = Dl.exec(t), n = La(r, 2), a = n[1];
    t = t.replace(Dl, lp(a));
  }
  return t;
}
function WE(e) {
  var t = e.replace(/\s+/g, "");
  return t = UE(t), t = lp(t), t;
}
function qE(e) {
  try {
    return WE(e);
  } catch {
    return ur;
  }
}
function io(e) {
  var t = qE(e.slice(5, -1));
  return t === ur ? "" : t;
}
var zE = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], HE = ["dx", "dy", "angle", "className", "breakAll"];
function iu() {
  return iu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, iu.apply(this, arguments);
}
function Rl(e, t) {
  if (e == null)
    return {};
  var r = KE(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function KE(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function Ll(e, t) {
  return YE(e) || VE(e, t) || XE(e, t) || GE();
}
function GE() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function XE(e, t) {
  if (e) {
    if (typeof e == "string")
      return Bl(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Bl(e, t);
  }
}
function Bl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function VE(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = !0, s = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r)
          return;
        c = !1;
      } else
        for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); c = !0)
          ;
    } catch (f) {
      s = !0, a = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o))
          return;
      } finally {
        if (s)
          throw a;
      }
    }
    return u;
  }
}
function YE(e) {
  if (Array.isArray(e))
    return e;
}
var fp = /[ \f\n\r\t\v\u2028\u2029]+/, dp = function(t) {
  var r = t.children, n = t.breakAll, a = t.style;
  try {
    var i = [];
    J(r) || (n ? i = r.toString().split("") : i = r.toString().split(fp));
    var o = i.map(function(c) {
      return {
        word: c,
        width: jl(c, a).width
      };
    }), u = n ? 0 : jl(" ", a).width;
    return {
      wordsWithComputedWidth: o,
      spaceWidth: u
    };
  } catch {
    return null;
  }
}, ZE = function(t, r, n, a, i) {
  var o = t.maxLines, u = t.children, c = t.style, s = t.breakAll, f = L(o), l = u, d = function() {
    var C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return C.reduce(function(N, D) {
      var R = D.word, F = D.width, H = N[N.length - 1];
      if (H && (a == null || i || H.width + F + n < Number(a)))
        H.words.push(R), H.width += F + n;
      else {
        var re = {
          words: [R],
          width: F
        };
        N.push(re);
      }
      return N;
    }, []);
  }, h = d(r), y = function(C) {
    return C.reduce(function(N, D) {
      return N.width > D.width ? N : D;
    });
  };
  if (!f)
    return h;
  for (var g = "…", v = function(C) {
    var N = l.slice(0, C), D = dp({
      breakAll: s,
      style: c,
      children: N + g
    }).wordsWithComputedWidth, R = d(D), F = R.length > o || y(R).width > Number(a);
    return [F, R];
  }, b = 0, x = l.length - 1, w = 0, O; b <= x && w <= l.length - 1; ) {
    var p = Math.floor((b + x) / 2), m = p - 1, S = v(m), A = Ll(S, 2), _ = A[0], M = A[1], T = v(p), E = Ll(T, 1), k = E[0];
    if (!_ && !k && (b = p + 1), _ && k && (x = p - 1), !_ && k) {
      O = M;
      break;
    }
    w++;
  }
  return O || h;
}, Fl = function(t) {
  var r = J(t) ? [] : t.toString().split(fp);
  return [{
    words: r
  }];
}, JE = function(t) {
  var r = t.width, n = t.scaleToFit, a = t.children, i = t.style, o = t.breakAll, u = t.maxLines;
  if ((r || n) && !Vt.isSsr) {
    var c, s, f = dp({
      breakAll: o,
      children: a,
      style: i
    });
    if (f) {
      var l = f.wordsWithComputedWidth, d = f.spaceWidth;
      c = l, s = d;
    } else
      return Fl(a);
    return ZE({
      breakAll: o,
      children: a,
      maxLines: u,
      style: i
    }, c, s, r, n);
  }
  return Fl(a);
}, Ul = "#808080", br = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, a = t.y, i = a === void 0 ? 0 : a, o = t.lineHeight, u = o === void 0 ? "1em" : o, c = t.capHeight, s = c === void 0 ? "0.71em" : c, f = t.scaleToFit, l = f === void 0 ? !1 : f, d = t.textAnchor, h = d === void 0 ? "start" : d, y = t.verticalAnchor, g = y === void 0 ? "end" : y, v = t.fill, b = v === void 0 ? Ul : v, x = Rl(t, zE), w = qd(function() {
    return JE({
      breakAll: x.breakAll,
      children: x.children,
      maxLines: x.maxLines,
      scaleToFit: l,
      style: x.style,
      width: x.width
    });
  }, [x.breakAll, x.children, x.maxLines, l, x.style, x.width]), O = x.dx, p = x.dy, m = x.angle, S = x.className, A = x.breakAll, _ = Rl(x, HE);
  if (!we(n) || !we(i))
    return null;
  var M = n + (L(O) ? O : 0), T = i + (L(p) ? p : 0), E;
  switch (g) {
    case "start":
      E = io("calc(".concat(s, ")"));
      break;
    case "middle":
      E = io("calc(".concat((w.length - 1) / 2, " * -").concat(u, " + (").concat(s, " / 2))"));
      break;
    default:
      E = io("calc(".concat(w.length - 1, " * -").concat(u, ")"));
      break;
  }
  var k = [];
  if (l) {
    var j = w[0].width, C = x.width;
    k.push("scale(".concat((L(C) ? C / j : 1) / j, ")"));
  }
  return m && k.push("rotate(".concat(m, ", ").concat(M, ", ").concat(T, ")")), k.length && (_.transform = k.join(" ")), /* @__PURE__ */ $.createElement("text", iu({}, X(_, !0), {
    x: M,
    y: T,
    className: ve("recharts-text", S),
    textAnchor: h,
    fill: b.includes("url") ? Ul : b
  }), w.map(function(N, D) {
    var R = N.words.join(A ? "" : " ");
    return /* @__PURE__ */ $.createElement("tspan", {
      x: M,
      dy: D === 0 ? E : u,
      key: R
    }, R);
  }));
};
function Et(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function QE(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function pc(e) {
  let t, r, n;
  e.length !== 2 ? (t = Et, r = (u, c) => Et(e(u), c), n = (u, c) => e(u) - c) : (t = e === Et || e === QE ? e : eM, r = e, n = e);
  function a(u, c, s = 0, f = u.length) {
    if (s < f) {
      if (t(c, c) !== 0)
        return f;
      do {
        const l = s + f >>> 1;
        r(u[l], c) < 0 ? s = l + 1 : f = l;
      } while (s < f);
    }
    return s;
  }
  function i(u, c, s = 0, f = u.length) {
    if (s < f) {
      if (t(c, c) !== 0)
        return f;
      do {
        const l = s + f >>> 1;
        r(u[l], c) <= 0 ? s = l + 1 : f = l;
      } while (s < f);
    }
    return s;
  }
  function o(u, c, s = 0, f = u.length) {
    const l = a(u, c, s, f - 1);
    return l > s && n(u[l - 1], c) > -n(u[l], c) ? l - 1 : l;
  }
  return { left: a, center: o, right: i };
}
function eM() {
  return 0;
}
function hp(e) {
  return e === null ? NaN : +e;
}
function* tM(e, t) {
  if (t === void 0)
    for (let r of e)
      r != null && (r = +r) >= r && (yield r);
  else {
    let r = -1;
    for (let n of e)
      (n = t(n, ++r, e)) != null && (n = +n) >= n && (yield n);
  }
}
const rM = pc(Et), nM = rM.right;
pc(hp).center;
const Gn = nM;
class Wl extends Map {
  constructor(t, r = oM) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null)
      for (const [n, a] of t)
        this.set(n, a);
  }
  get(t) {
    return super.get(ql(this, t));
  }
  has(t) {
    return super.has(ql(this, t));
  }
  set(t, r) {
    return super.set(aM(this, t), r);
  }
  delete(t) {
    return super.delete(iM(this, t));
  }
}
function ql({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function aM({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function iM({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function oM(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function uM(e = Et) {
  if (e === Et)
    return pp;
  if (typeof e != "function")
    throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function pp(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const cM = Math.sqrt(50), sM = Math.sqrt(10), lM = Math.sqrt(2);
function Ba(e, t, r) {
  const n = (t - e) / Math.max(0, r), a = Math.floor(Math.log10(n)), i = n / Math.pow(10, a), o = i >= cM ? 10 : i >= sM ? 5 : i >= lM ? 2 : 1;
  let u, c, s;
  return a < 0 ? (s = Math.pow(10, -a) / o, u = Math.round(e * s), c = Math.round(t * s), u / s < e && ++u, c / s > t && --c, s = -s) : (s = Math.pow(10, a) * o, u = Math.round(e / s), c = Math.round(t / s), u * s < e && ++u, c * s > t && --c), c < u && 0.5 <= r && r < 2 ? Ba(e, t, r * 2) : [u, c, s];
}
function ou(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0))
    return [];
  if (e === t)
    return [e];
  const n = t < e, [a, i, o] = n ? Ba(t, e, r) : Ba(e, t, r);
  if (!(i >= a))
    return [];
  const u = i - a + 1, c = new Array(u);
  if (n)
    if (o < 0)
      for (let s = 0; s < u; ++s)
        c[s] = (i - s) / -o;
    else
      for (let s = 0; s < u; ++s)
        c[s] = (i - s) * o;
  else if (o < 0)
    for (let s = 0; s < u; ++s)
      c[s] = (a + s) / -o;
  else
    for (let s = 0; s < u; ++s)
      c[s] = (a + s) * o;
  return c;
}
function uu(e, t, r) {
  return t = +t, e = +e, r = +r, Ba(e, t, r)[2];
}
function cu(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, a = n ? uu(t, e, r) : uu(e, t, r);
  return (n ? -1 : 1) * (a < 0 ? 1 / -a : a);
}
function zl(e, t) {
  let r;
  if (t === void 0)
    for (const n of e)
      n != null && (r < n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let a of e)
      (a = t(a, ++n, e)) != null && (r < a || r === void 0 && a >= a) && (r = a);
  }
  return r;
}
function Hl(e, t) {
  let r;
  if (t === void 0)
    for (const n of e)
      n != null && (r > n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let a of e)
      (a = t(a, ++n, e)) != null && (r > a || r === void 0 && a >= a) && (r = a);
  }
  return r;
}
function vp(e, t, r = 0, n = 1 / 0, a) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n))
    return e;
  for (a = a === void 0 ? pp : uM(a); n > r; ) {
    if (n - r > 600) {
      const c = n - r + 1, s = t - r + 1, f = Math.log(c), l = 0.5 * Math.exp(2 * f / 3), d = 0.5 * Math.sqrt(f * l * (c - l) / c) * (s - c / 2 < 0 ? -1 : 1), h = Math.max(r, Math.floor(t - s * l / c + d)), y = Math.min(n, Math.floor(t + (c - s) * l / c + d));
      vp(e, t, h, y, a);
    }
    const i = e[t];
    let o = r, u = n;
    for (Hr(e, r, t), a(e[n], i) > 0 && Hr(e, r, n); o < u; ) {
      for (Hr(e, o, u), ++o, --u; a(e[o], i) < 0; )
        ++o;
      for (; a(e[u], i) > 0; )
        --u;
    }
    a(e[r], i) === 0 ? Hr(e, r, u) : (++u, Hr(e, u, n)), u <= t && (r = u + 1), t <= u && (n = u - 1);
  }
  return e;
}
function Hr(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function fM(e, t, r) {
  if (e = Float64Array.from(tM(e, r)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2)
      return Hl(e);
    if (t >= 1)
      return zl(e);
    var n, a = (n - 1) * t, i = Math.floor(a), o = zl(vp(e, i).subarray(0, i + 1)), u = Hl(e.subarray(i + 1));
    return o + (u - o) * (a - i);
  }
}
function dM(e, t, r = hp) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2)
      return +r(e[0], 0, e);
    if (t >= 1)
      return +r(e[n - 1], n - 1, e);
    var n, a = (n - 1) * t, i = Math.floor(a), o = +r(e[i], i, e), u = +r(e[i + 1], i + 1, e);
    return o + (u - o) * (a - i);
  }
}
function hM(e, t, r) {
  e = +e, t = +t, r = (a = arguments.length) < 2 ? (t = e, e = 0, 1) : a < 3 ? 1 : +r;
  for (var n = -1, a = Math.max(0, Math.ceil((t - e) / r)) | 0, i = new Array(a); ++n < a; )
    i[n] = e + n * r;
  return i;
}
function Ve(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function At(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
const su = Symbol("implicit");
function vc() {
  var e = new Wl(), t = [], r = [], n = su;
  function a(i) {
    let o = e.get(i);
    if (o === void 0) {
      if (n !== su)
        return n;
      e.set(i, o = t.push(i) - 1);
    }
    return r[o % r.length];
  }
  return a.domain = function(i) {
    if (!arguments.length)
      return t.slice();
    t = [], e = new Wl();
    for (const o of i)
      e.has(o) || e.set(o, t.push(o) - 1);
    return a;
  }, a.range = function(i) {
    return arguments.length ? (r = Array.from(i), a) : r.slice();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return vc(t, r).unknown(n);
  }, Ve.apply(a, arguments), a;
}
function yn() {
  var e = vc().unknown(void 0), t = e.domain, r = e.range, n = 0, a = 1, i, o, u = !1, c = 0, s = 0, f = 0.5;
  delete e.unknown;
  function l() {
    var d = t().length, h = a < n, y = h ? a : n, g = h ? n : a;
    i = (g - y) / Math.max(1, d - c + s * 2), u && (i = Math.floor(i)), y += (g - y - i * (d - c)) * f, o = i * (1 - c), u && (y = Math.round(y), o = Math.round(o));
    var v = hM(d).map(function(b) {
      return y + i * b;
    });
    return r(h ? v.reverse() : v);
  }
  return e.domain = function(d) {
    return arguments.length ? (t(d), l()) : t();
  }, e.range = function(d) {
    return arguments.length ? ([n, a] = d, n = +n, a = +a, l()) : [n, a];
  }, e.rangeRound = function(d) {
    return [n, a] = d, n = +n, a = +a, u = !0, l();
  }, e.bandwidth = function() {
    return o;
  }, e.step = function() {
    return i;
  }, e.round = function(d) {
    return arguments.length ? (u = !!d, l()) : u;
  }, e.padding = function(d) {
    return arguments.length ? (c = Math.min(1, s = +d), l()) : c;
  }, e.paddingInner = function(d) {
    return arguments.length ? (c = Math.min(1, d), l()) : c;
  }, e.paddingOuter = function(d) {
    return arguments.length ? (s = +d, l()) : s;
  }, e.align = function(d) {
    return arguments.length ? (f = Math.max(0, Math.min(1, d)), l()) : f;
  }, e.copy = function() {
    return yn(t(), [n, a]).round(u).paddingInner(c).paddingOuter(s).align(f);
  }, Ve.apply(l(), arguments);
}
function yp(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return yp(t());
  }, e;
}
function en() {
  return yp(yn.apply(null, arguments).paddingInner(1));
}
function yc(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function gp(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t)
    r[n] = t[n];
  return r;
}
function Xn() {
}
var gn = 0.7, Fa = 1 / gn, lr = "\\s*([+-]?\\d+)\\s*", mn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ot = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", pM = /^#([0-9a-f]{3,8})$/, vM = new RegExp(`^rgb\\(${lr},${lr},${lr}\\)$`), yM = new RegExp(`^rgb\\(${ot},${ot},${ot}\\)$`), gM = new RegExp(`^rgba\\(${lr},${lr},${lr},${mn}\\)$`), mM = new RegExp(`^rgba\\(${ot},${ot},${ot},${mn}\\)$`), bM = new RegExp(`^hsl\\(${mn},${ot},${ot}\\)$`), xM = new RegExp(`^hsla\\(${mn},${ot},${ot},${mn}\\)$`), Kl = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
yc(Xn, bn, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Gl,
  // Deprecated! Use color.formatHex.
  formatHex: Gl,
  formatHex8: wM,
  formatHsl: OM,
  formatRgb: Xl,
  toString: Xl
});
function Gl() {
  return this.rgb().formatHex();
}
function wM() {
  return this.rgb().formatHex8();
}
function OM() {
  return mp(this).formatHsl();
}
function Xl() {
  return this.rgb().formatRgb();
}
function bn(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = pM.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? Vl(t) : r === 3 ? new je(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? ca(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? ca(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = vM.exec(e)) ? new je(t[1], t[2], t[3], 1) : (t = yM.exec(e)) ? new je(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = gM.exec(e)) ? ca(t[1], t[2], t[3], t[4]) : (t = mM.exec(e)) ? ca(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = bM.exec(e)) ? Jl(t[1], t[2] / 100, t[3] / 100, 1) : (t = xM.exec(e)) ? Jl(t[1], t[2] / 100, t[3] / 100, t[4]) : Kl.hasOwnProperty(e) ? Vl(Kl[e]) : e === "transparent" ? new je(NaN, NaN, NaN, 0) : null;
}
function Vl(e) {
  return new je(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ca(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new je(e, t, r, n);
}
function SM(e) {
  return e instanceof Xn || (e = bn(e)), e ? (e = e.rgb(), new je(e.r, e.g, e.b, e.opacity)) : new je();
}
function lu(e, t, r, n) {
  return arguments.length === 1 ? SM(e) : new je(e, t, r, n ?? 1);
}
function je(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
yc(je, lu, gp(Xn, {
  brighter(e) {
    return e = e == null ? Fa : Math.pow(Fa, e), new je(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? gn : Math.pow(gn, e), new je(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new je(Yt(this.r), Yt(this.g), Yt(this.b), Ua(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Yl,
  // Deprecated! Use color.formatHex.
  formatHex: Yl,
  formatHex8: AM,
  formatRgb: Zl,
  toString: Zl
}));
function Yl() {
  return `#${Kt(this.r)}${Kt(this.g)}${Kt(this.b)}`;
}
function AM() {
  return `#${Kt(this.r)}${Kt(this.g)}${Kt(this.b)}${Kt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Zl() {
  const e = Ua(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Yt(this.r)}, ${Yt(this.g)}, ${Yt(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ua(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Yt(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Kt(e) {
  return e = Yt(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Jl(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ze(e, t, r, n);
}
function mp(e) {
  if (e instanceof Ze)
    return new Ze(e.h, e.s, e.l, e.opacity);
  if (e instanceof Xn || (e = bn(e)), !e)
    return new Ze();
  if (e instanceof Ze)
    return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, a = Math.min(t, r, n), i = Math.max(t, r, n), o = NaN, u = i - a, c = (i + a) / 2;
  return u ? (t === i ? o = (r - n) / u + (r < n) * 6 : r === i ? o = (n - t) / u + 2 : o = (t - r) / u + 4, u /= c < 0.5 ? i + a : 2 - i - a, o *= 60) : u = c > 0 && c < 1 ? 0 : o, new Ze(o, u, c, e.opacity);
}
function _M(e, t, r, n) {
  return arguments.length === 1 ? mp(e) : new Ze(e, t, r, n ?? 1);
}
function Ze(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
yc(Ze, _M, gp(Xn, {
  brighter(e) {
    return e = e == null ? Fa : Math.pow(Fa, e), new Ze(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? gn : Math.pow(gn, e), new Ze(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, a = 2 * r - n;
    return new je(
      oo(e >= 240 ? e - 240 : e + 120, a, n),
      oo(e, a, n),
      oo(e < 120 ? e + 240 : e - 120, a, n),
      this.opacity
    );
  },
  clamp() {
    return new Ze(Ql(this.h), sa(this.s), sa(this.l), Ua(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Ua(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Ql(this.h)}, ${sa(this.s) * 100}%, ${sa(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Ql(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function sa(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function oo(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const gc = (e) => () => e;
function $M(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function PM(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function TM(e) {
  return (e = +e) == 1 ? bp : function(t, r) {
    return r - t ? PM(t, r, e) : gc(isNaN(t) ? r : t);
  };
}
function bp(e, t) {
  var r = t - e;
  return r ? $M(e, r) : gc(isNaN(e) ? t : e);
}
const ef = function e(t) {
  var r = TM(t);
  function n(a, i) {
    var o = r((a = lu(a)).r, (i = lu(i)).r), u = r(a.g, i.g), c = r(a.b, i.b), s = bp(a.opacity, i.opacity);
    return function(f) {
      return a.r = o(f), a.g = u(f), a.b = c(f), a.opacity = s(f), a + "";
    };
  }
  return n.gamma = e, n;
}(1);
function EM(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), a;
  return function(i) {
    for (a = 0; a < r; ++a)
      n[a] = e[a] * (1 - i) + t[a] * i;
    return n;
  };
}
function MM(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function jM(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, a = new Array(n), i = new Array(r), o;
  for (o = 0; o < n; ++o)
    a[o] = Br(e[o], t[o]);
  for (; o < r; ++o)
    i[o] = t[o];
  return function(u) {
    for (o = 0; o < n; ++o)
      i[o] = a[o](u);
    return i;
  };
}
function IM(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function Wa(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function CM(e, t) {
  var r = {}, n = {}, a;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (a in t)
    a in e ? r[a] = Br(e[a], t[a]) : n[a] = t[a];
  return function(i) {
    for (a in r)
      n[a] = r[a](i);
    return n;
  };
}
var fu = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, uo = new RegExp(fu.source, "g");
function kM(e) {
  return function() {
    return e;
  };
}
function NM(e) {
  return function(t) {
    return e(t) + "";
  };
}
function DM(e, t) {
  var r = fu.lastIndex = uo.lastIndex = 0, n, a, i, o = -1, u = [], c = [];
  for (e = e + "", t = t + ""; (n = fu.exec(e)) && (a = uo.exec(t)); )
    (i = a.index) > r && (i = t.slice(r, i), u[o] ? u[o] += i : u[++o] = i), (n = n[0]) === (a = a[0]) ? u[o] ? u[o] += a : u[++o] = a : (u[++o] = null, c.push({ i: o, x: Wa(n, a) })), r = uo.lastIndex;
  return r < t.length && (i = t.slice(r), u[o] ? u[o] += i : u[++o] = i), u.length < 2 ? c[0] ? NM(c[0].x) : kM(t) : (t = c.length, function(s) {
    for (var f = 0, l; f < t; ++f)
      u[(l = c[f]).i] = l.x(s);
    return u.join("");
  });
}
function Br(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? gc(t) : (r === "number" ? Wa : r === "string" ? (n = bn(t)) ? (t = n, ef) : DM : t instanceof bn ? ef : t instanceof Date ? IM : MM(t) ? EM : Array.isArray(t) ? jM : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? CM : Wa)(e, t);
}
function mc(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function RM(e, t) {
  t === void 0 && (t = e, e = Br);
  for (var r = 0, n = t.length - 1, a = t[0], i = new Array(n < 0 ? 0 : n); r < n; )
    i[r] = e(a, a = t[++r]);
  return function(o) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(o *= n)));
    return i[u](o - u);
  };
}
function LM(e) {
  return function() {
    return e;
  };
}
function qa(e) {
  return +e;
}
var tf = [0, 1];
function Me(e) {
  return e;
}
function du(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : LM(isNaN(t) ? NaN : 0.5);
}
function BM(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function FM(e, t, r) {
  var n = e[0], a = e[1], i = t[0], o = t[1];
  return a < n ? (n = du(a, n), i = r(o, i)) : (n = du(n, a), i = r(i, o)), function(u) {
    return i(n(u));
  };
}
function UM(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, a = new Array(n), i = new Array(n), o = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    a[o] = du(e[o], e[o + 1]), i[o] = r(t[o], t[o + 1]);
  return function(u) {
    var c = Gn(e, u, 1, n) - 1;
    return i[c](a[c](u));
  };
}
function Vn(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function _i() {
  var e = tf, t = tf, r = Br, n, a, i, o = Me, u, c, s;
  function f() {
    var d = Math.min(e.length, t.length);
    return o !== Me && (o = BM(e[0], e[d - 1])), u = d > 2 ? UM : FM, c = s = null, l;
  }
  function l(d) {
    return d == null || isNaN(d = +d) ? i : (c || (c = u(e.map(n), t, r)))(n(o(d)));
  }
  return l.invert = function(d) {
    return o(a((s || (s = u(t, e.map(n), Wa)))(d)));
  }, l.domain = function(d) {
    return arguments.length ? (e = Array.from(d, qa), f()) : e.slice();
  }, l.range = function(d) {
    return arguments.length ? (t = Array.from(d), f()) : t.slice();
  }, l.rangeRound = function(d) {
    return t = Array.from(d), r = mc, f();
  }, l.clamp = function(d) {
    return arguments.length ? (o = d ? !0 : Me, f()) : o !== Me;
  }, l.interpolate = function(d) {
    return arguments.length ? (r = d, f()) : r;
  }, l.unknown = function(d) {
    return arguments.length ? (i = d, l) : i;
  }, function(d, h) {
    return n = d, a = h, f();
  };
}
function bc() {
  return _i()(Me, Me);
}
function WM(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function za(e, t) {
  if ((r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0)
    return null;
  var r, n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function xr(e) {
  return e = za(Math.abs(e)), e ? e[1] : NaN;
}
function qM(e, t) {
  return function(r, n) {
    for (var a = r.length, i = [], o = 0, u = e[0], c = 0; a > 0 && u > 0 && (c + u + 1 > n && (u = Math.max(1, n - c)), i.push(r.substring(a -= u, a + u)), !((c += u + 1) > n)); )
      u = e[o = (o + 1) % e.length];
    return i.reverse().join(t);
  };
}
function zM(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var HM = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function xn(e) {
  if (!(t = HM.exec(e)))
    throw new Error("invalid format: " + e);
  var t;
  return new xc({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
xn.prototype = xc.prototype;
function xc(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
xc.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function KM(e) {
  e:
    for (var t = e.length, r = 1, n = -1, a; r < t; ++r)
      switch (e[r]) {
        case ".":
          n = a = r;
          break;
        case "0":
          n === 0 && (n = r), a = r;
          break;
        default:
          if (!+e[r])
            break e;
          n > 0 && (n = 0);
          break;
      }
  return n > 0 ? e.slice(0, n) + e.slice(a + 1) : e;
}
var xp;
function GM(e, t) {
  var r = za(e, t);
  if (!r)
    return e + "";
  var n = r[0], a = r[1], i = a - (xp = Math.max(-8, Math.min(8, Math.floor(a / 3))) * 3) + 1, o = n.length;
  return i === o ? n : i > o ? n + new Array(i - o + 1).join("0") : i > 0 ? n.slice(0, i) + "." + n.slice(i) : "0." + new Array(1 - i).join("0") + za(e, Math.max(0, t + i - 1))[0];
}
function rf(e, t) {
  var r = za(e, t);
  if (!r)
    return e + "";
  var n = r[0], a = r[1];
  return a < 0 ? "0." + new Array(-a).join("0") + n : n.length > a + 1 ? n.slice(0, a + 1) + "." + n.slice(a + 1) : n + new Array(a - n.length + 2).join("0");
}
const nf = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: WM,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => rf(e * 100, t),
  r: rf,
  s: GM,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function af(e) {
  return e;
}
var of = Array.prototype.map, uf = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function XM(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? af : qM(of.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", a = e.decimal === void 0 ? "." : e.decimal + "", i = e.numerals === void 0 ? af : zM(of.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", u = e.minus === void 0 ? "−" : e.minus + "", c = e.nan === void 0 ? "NaN" : e.nan + "";
  function s(l) {
    l = xn(l);
    var d = l.fill, h = l.align, y = l.sign, g = l.symbol, v = l.zero, b = l.width, x = l.comma, w = l.precision, O = l.trim, p = l.type;
    p === "n" ? (x = !0, p = "g") : nf[p] || (w === void 0 && (w = 12), O = !0, p = "g"), (v || d === "0" && h === "=") && (v = !0, d = "0", h = "=");
    var m = g === "$" ? r : g === "#" && /[boxX]/.test(p) ? "0" + p.toLowerCase() : "", S = g === "$" ? n : /[%p]/.test(p) ? o : "", A = nf[p], _ = /[defgprs%]/.test(p);
    w = w === void 0 ? 6 : /[gprs]/.test(p) ? Math.max(1, Math.min(21, w)) : Math.max(0, Math.min(20, w));
    function M(T) {
      var E = m, k = S, j, C, N;
      if (p === "c")
        k = A(T) + k, T = "";
      else {
        T = +T;
        var D = T < 0 || 1 / T < 0;
        if (T = isNaN(T) ? c : A(Math.abs(T), w), O && (T = KM(T)), D && +T == 0 && y !== "+" && (D = !1), E = (D ? y === "(" ? y : u : y === "-" || y === "(" ? "" : y) + E, k = (p === "s" ? uf[8 + xp / 3] : "") + k + (D && y === "(" ? ")" : ""), _) {
          for (j = -1, C = T.length; ++j < C; )
            if (N = T.charCodeAt(j), 48 > N || N > 57) {
              k = (N === 46 ? a + T.slice(j + 1) : T.slice(j)) + k, T = T.slice(0, j);
              break;
            }
        }
      }
      x && !v && (T = t(T, 1 / 0));
      var R = E.length + T.length + k.length, F = R < b ? new Array(b - R + 1).join(d) : "";
      switch (x && v && (T = t(F + T, F.length ? b - k.length : 1 / 0), F = ""), h) {
        case "<":
          T = E + T + k + F;
          break;
        case "=":
          T = E + F + T + k;
          break;
        case "^":
          T = F.slice(0, R = F.length >> 1) + E + T + k + F.slice(R);
          break;
        default:
          T = F + E + T + k;
          break;
      }
      return i(T);
    }
    return M.toString = function() {
      return l + "";
    }, M;
  }
  function f(l, d) {
    var h = s((l = xn(l), l.type = "f", l)), y = Math.max(-8, Math.min(8, Math.floor(xr(d) / 3))) * 3, g = Math.pow(10, -y), v = uf[8 + y / 3];
    return function(b) {
      return h(g * b) + v;
    };
  }
  return {
    format: s,
    formatPrefix: f
  };
}
var la, wc, wp;
VM({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function VM(e) {
  return la = XM(e), wc = la.format, wp = la.formatPrefix, la;
}
function YM(e) {
  return Math.max(0, -xr(Math.abs(e)));
}
function ZM(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(xr(t) / 3))) * 3 - xr(Math.abs(e)));
}
function JM(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, xr(t) - xr(e)) + 1;
}
function Op(e, t, r, n) {
  var a = cu(e, t, r), i;
  switch (n = xn(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(i = ZM(a, o)) && (n.precision = i), wp(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(i = JM(a, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = i - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(i = YM(a)) && (n.precision = i - (n.type === "%") * 2);
      break;
    }
  }
  return wc(n);
}
function Ct(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return ou(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var a = t();
    return Op(a[0], a[a.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), a = 0, i = n.length - 1, o = n[a], u = n[i], c, s, f = 10;
    for (u < o && (s = o, o = u, u = s, s = a, a = i, i = s); f-- > 0; ) {
      if (s = uu(o, u, r), s === c)
        return n[a] = o, n[i] = u, t(n);
      if (s > 0)
        o = Math.floor(o / s) * s, u = Math.ceil(u / s) * s;
      else if (s < 0)
        o = Math.ceil(o * s) / s, u = Math.floor(u * s) / s;
      else
        break;
      c = s;
    }
    return e;
  }, e;
}
function Ha() {
  var e = bc();
  return e.copy = function() {
    return Vn(e, Ha());
  }, Ve.apply(e, arguments), Ct(e);
}
function Sp(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, qa), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return Sp(e).unknown(t);
  }, e = arguments.length ? Array.from(e, qa) : [0, 1], Ct(r);
}
function Ap(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, a = e[r], i = e[n], o;
  return i < a && (o = r, r = n, n = o, o = a, a = i, i = o), e[r] = t.floor(a), e[n] = t.ceil(i), e;
}
function cf(e) {
  return Math.log(e);
}
function sf(e) {
  return Math.exp(e);
}
function QM(e) {
  return -Math.log(-e);
}
function ej(e) {
  return -Math.exp(-e);
}
function tj(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function rj(e) {
  return e === 10 ? tj : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function nj(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function lf(e) {
  return (t, r) => -e(-t, r);
}
function Oc(e) {
  const t = e(cf, sf), r = t.domain;
  let n = 10, a, i;
  function o() {
    return a = nj(n), i = rj(n), r()[0] < 0 ? (a = lf(a), i = lf(i), e(QM, ej)) : e(cf, sf), t;
  }
  return t.base = function(u) {
    return arguments.length ? (n = +u, o()) : n;
  }, t.domain = function(u) {
    return arguments.length ? (r(u), o()) : r();
  }, t.ticks = (u) => {
    const c = r();
    let s = c[0], f = c[c.length - 1];
    const l = f < s;
    l && ([s, f] = [f, s]);
    let d = a(s), h = a(f), y, g;
    const v = u == null ? 10 : +u;
    let b = [];
    if (!(n % 1) && h - d < v) {
      if (d = Math.floor(d), h = Math.ceil(h), s > 0) {
        for (; d <= h; ++d)
          for (y = 1; y < n; ++y)
            if (g = d < 0 ? y / i(-d) : y * i(d), !(g < s)) {
              if (g > f)
                break;
              b.push(g);
            }
      } else
        for (; d <= h; ++d)
          for (y = n - 1; y >= 1; --y)
            if (g = d > 0 ? y / i(-d) : y * i(d), !(g < s)) {
              if (g > f)
                break;
              b.push(g);
            }
      b.length * 2 < v && (b = ou(s, f, v));
    } else
      b = ou(d, h, Math.min(h - d, v)).map(i);
    return l ? b.reverse() : b;
  }, t.tickFormat = (u, c) => {
    if (u == null && (u = 10), c == null && (c = n === 10 ? "s" : ","), typeof c != "function" && (!(n % 1) && (c = xn(c)).precision == null && (c.trim = !0), c = wc(c)), u === 1 / 0)
      return c;
    const s = Math.max(1, n * u / t.ticks().length);
    return (f) => {
      let l = f / i(Math.round(a(f)));
      return l * n < n - 0.5 && (l *= n), l <= s ? c(f) : "";
    };
  }, t.nice = () => r(Ap(r(), {
    floor: (u) => i(Math.floor(a(u))),
    ceil: (u) => i(Math.ceil(a(u)))
  })), t;
}
function _p() {
  const e = Oc(_i()).domain([1, 10]);
  return e.copy = () => Vn(e, _p()).base(e.base()), Ve.apply(e, arguments), e;
}
function ff(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function df(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function Sc(e) {
  var t = 1, r = e(ff(t), df(t));
  return r.constant = function(n) {
    return arguments.length ? e(ff(t = +n), df(t)) : t;
  }, Ct(r);
}
function $p() {
  var e = Sc(_i());
  return e.copy = function() {
    return Vn(e, $p()).constant(e.constant());
  }, Ve.apply(e, arguments);
}
function hf(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function aj(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function ij(e) {
  return e < 0 ? -e * e : e * e;
}
function Ac(e) {
  var t = e(Me, Me), r = 1;
  function n() {
    return r === 1 ? e(Me, Me) : r === 0.5 ? e(aj, ij) : e(hf(r), hf(1 / r));
  }
  return t.exponent = function(a) {
    return arguments.length ? (r = +a, n()) : r;
  }, Ct(t);
}
function _c() {
  var e = Ac(_i());
  return e.copy = function() {
    return Vn(e, _c()).exponent(e.exponent());
  }, Ve.apply(e, arguments), e;
}
function oj() {
  return _c.apply(null, arguments).exponent(0.5);
}
function pf(e) {
  return Math.sign(e) * e * e;
}
function uj(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function Pp() {
  var e = bc(), t = [0, 1], r = !1, n;
  function a(i) {
    var o = uj(e(i));
    return isNaN(o) ? n : r ? Math.round(o) : o;
  }
  return a.invert = function(i) {
    return e.invert(pf(i));
  }, a.domain = function(i) {
    return arguments.length ? (e.domain(i), a) : e.domain();
  }, a.range = function(i) {
    return arguments.length ? (e.range((t = Array.from(i, qa)).map(pf)), a) : t.slice();
  }, a.rangeRound = function(i) {
    return a.range(i).round(!0);
  }, a.round = function(i) {
    return arguments.length ? (r = !!i, a) : r;
  }, a.clamp = function(i) {
    return arguments.length ? (e.clamp(i), a) : e.clamp();
  }, a.unknown = function(i) {
    return arguments.length ? (n = i, a) : n;
  }, a.copy = function() {
    return Pp(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, Ve.apply(a, arguments), Ct(a);
}
function Tp() {
  var e = [], t = [], r = [], n;
  function a() {
    var o = 0, u = Math.max(1, t.length);
    for (r = new Array(u - 1); ++o < u; )
      r[o - 1] = dM(e, o / u);
    return i;
  }
  function i(o) {
    return o == null || isNaN(o = +o) ? n : t[Gn(r, o)];
  }
  return i.invertExtent = function(o) {
    var u = t.indexOf(o);
    return u < 0 ? [NaN, NaN] : [
      u > 0 ? r[u - 1] : e[0],
      u < r.length ? r[u] : e[e.length - 1]
    ];
  }, i.domain = function(o) {
    if (!arguments.length)
      return e.slice();
    e = [];
    for (let u of o)
      u != null && !isNaN(u = +u) && e.push(u);
    return e.sort(Et), a();
  }, i.range = function(o) {
    return arguments.length ? (t = Array.from(o), a()) : t.slice();
  }, i.unknown = function(o) {
    return arguments.length ? (n = o, i) : n;
  }, i.quantiles = function() {
    return r.slice();
  }, i.copy = function() {
    return Tp().domain(e).range(t).unknown(n);
  }, Ve.apply(i, arguments);
}
function Ep() {
  var e = 0, t = 1, r = 1, n = [0.5], a = [0, 1], i;
  function o(c) {
    return c != null && c <= c ? a[Gn(n, c, 0, r)] : i;
  }
  function u() {
    var c = -1;
    for (n = new Array(r); ++c < r; )
      n[c] = ((c + 1) * t - (c - r) * e) / (r + 1);
    return o;
  }
  return o.domain = function(c) {
    return arguments.length ? ([e, t] = c, e = +e, t = +t, u()) : [e, t];
  }, o.range = function(c) {
    return arguments.length ? (r = (a = Array.from(c)).length - 1, u()) : a.slice();
  }, o.invertExtent = function(c) {
    var s = a.indexOf(c);
    return s < 0 ? [NaN, NaN] : s < 1 ? [e, n[0]] : s >= r ? [n[r - 1], t] : [n[s - 1], n[s]];
  }, o.unknown = function(c) {
    return arguments.length && (i = c), o;
  }, o.thresholds = function() {
    return n.slice();
  }, o.copy = function() {
    return Ep().domain([e, t]).range(a).unknown(i);
  }, Ve.apply(Ct(o), arguments);
}
function Mp() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function a(i) {
    return i != null && i <= i ? t[Gn(e, i, 0, n)] : r;
  }
  return a.domain = function(i) {
    return arguments.length ? (e = Array.from(i), n = Math.min(e.length, t.length - 1), a) : e.slice();
  }, a.range = function(i) {
    return arguments.length ? (t = Array.from(i), n = Math.min(e.length, t.length - 1), a) : t.slice();
  }, a.invertExtent = function(i) {
    var o = t.indexOf(i);
    return [e[o - 1], e[o]];
  }, a.unknown = function(i) {
    return arguments.length ? (r = i, a) : r;
  }, a.copy = function() {
    return Mp().domain(e).range(t).unknown(r);
  }, Ve.apply(a, arguments);
}
const co = /* @__PURE__ */ new Date(), so = /* @__PURE__ */ new Date();
function Oe(e, t, r, n) {
  function a(i) {
    return e(i = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+i)), i;
  }
  return a.floor = (i) => (e(i = /* @__PURE__ */ new Date(+i)), i), a.ceil = (i) => (e(i = new Date(i - 1)), t(i, 1), e(i), i), a.round = (i) => {
    const o = a(i), u = a.ceil(i);
    return i - o < u - i ? o : u;
  }, a.offset = (i, o) => (t(i = /* @__PURE__ */ new Date(+i), o == null ? 1 : Math.floor(o)), i), a.range = (i, o, u) => {
    const c = [];
    if (i = a.ceil(i), u = u == null ? 1 : Math.floor(u), !(i < o) || !(u > 0))
      return c;
    let s;
    do
      c.push(s = /* @__PURE__ */ new Date(+i)), t(i, u), e(i);
    while (s < i && i < o);
    return c;
  }, a.filter = (i) => Oe((o) => {
    if (o >= o)
      for (; e(o), !i(o); )
        o.setTime(o - 1);
  }, (o, u) => {
    if (o >= o)
      if (u < 0)
        for (; ++u <= 0; )
          for (; t(o, -1), !i(o); )
            ;
      else
        for (; --u >= 0; )
          for (; t(o, 1), !i(o); )
            ;
  }), r && (a.count = (i, o) => (co.setTime(+i), so.setTime(+o), e(co), e(so), Math.floor(r(co, so))), a.every = (i) => (i = Math.floor(i), !isFinite(i) || !(i > 0) ? null : i > 1 ? a.filter(n ? (o) => n(o) % i === 0 : (o) => a.count(0, o) % i === 0) : a)), a;
}
const Ka = Oe(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
Ka.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Oe((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : Ka);
Ka.range;
const ht = 1e3, Ge = ht * 60, pt = Ge * 60, mt = pt * 24, $c = mt * 7, vf = mt * 30, lo = mt * 365, Gt = Oe((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * ht);
}, (e, t) => (t - e) / ht, (e) => e.getUTCSeconds());
Gt.range;
const Pc = Oe((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * ht);
}, (e, t) => {
  e.setTime(+e + t * Ge);
}, (e, t) => (t - e) / Ge, (e) => e.getMinutes());
Pc.range;
const Tc = Oe((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * Ge);
}, (e, t) => (t - e) / Ge, (e) => e.getUTCMinutes());
Tc.range;
const Ec = Oe((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * ht - e.getMinutes() * Ge);
}, (e, t) => {
  e.setTime(+e + t * pt);
}, (e, t) => (t - e) / pt, (e) => e.getHours());
Ec.range;
const Mc = Oe((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * pt);
}, (e, t) => (t - e) / pt, (e) => e.getUTCHours());
Mc.range;
const Yn = Oe(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Ge) / mt,
  (e) => e.getDate() - 1
);
Yn.range;
const $i = Oe((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / mt, (e) => e.getUTCDate() - 1);
$i.range;
const jp = Oe((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / mt, (e) => Math.floor(e / mt));
jp.range;
function rr(e) {
  return Oe((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * Ge) / $c);
}
const Pi = rr(0), Ga = rr(1), cj = rr(2), sj = rr(3), wr = rr(4), lj = rr(5), fj = rr(6);
Pi.range;
Ga.range;
cj.range;
sj.range;
wr.range;
lj.range;
fj.range;
function nr(e) {
  return Oe((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / $c);
}
const Ti = nr(0), Xa = nr(1), dj = nr(2), hj = nr(3), Or = nr(4), pj = nr(5), vj = nr(6);
Ti.range;
Xa.range;
dj.range;
hj.range;
Or.range;
pj.range;
vj.range;
const jc = Oe((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
jc.range;
const Ic = Oe((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
Ic.range;
const bt = Oe((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
bt.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Oe((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
bt.range;
const xt = Oe((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
xt.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Oe((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
xt.range;
function Ip(e, t, r, n, a, i) {
  const o = [
    [Gt, 1, ht],
    [Gt, 5, 5 * ht],
    [Gt, 15, 15 * ht],
    [Gt, 30, 30 * ht],
    [i, 1, Ge],
    [i, 5, 5 * Ge],
    [i, 15, 15 * Ge],
    [i, 30, 30 * Ge],
    [a, 1, pt],
    [a, 3, 3 * pt],
    [a, 6, 6 * pt],
    [a, 12, 12 * pt],
    [n, 1, mt],
    [n, 2, 2 * mt],
    [r, 1, $c],
    [t, 1, vf],
    [t, 3, 3 * vf],
    [e, 1, lo]
  ];
  function u(s, f, l) {
    const d = f < s;
    d && ([s, f] = [f, s]);
    const h = l && typeof l.range == "function" ? l : c(s, f, l), y = h ? h.range(s, +f + 1) : [];
    return d ? y.reverse() : y;
  }
  function c(s, f, l) {
    const d = Math.abs(f - s) / l, h = pc(([, , v]) => v).right(o, d);
    if (h === o.length)
      return e.every(cu(s / lo, f / lo, l));
    if (h === 0)
      return Ka.every(Math.max(cu(s, f, l), 1));
    const [y, g] = o[d / o[h - 1][2] < o[h][2] / d ? h - 1 : h];
    return y.every(g);
  }
  return [u, c];
}
const [yj, gj] = Ip(xt, Ic, Ti, jp, Mc, Tc), [mj, bj] = Ip(bt, jc, Pi, Yn, Ec, Pc);
function fo(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function ho(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function Kr(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function xj(e) {
  var t = e.dateTime, r = e.date, n = e.time, a = e.periods, i = e.days, o = e.shortDays, u = e.months, c = e.shortMonths, s = Gr(a), f = Xr(a), l = Gr(i), d = Xr(i), h = Gr(o), y = Xr(o), g = Gr(u), v = Xr(u), b = Gr(c), x = Xr(c), w = {
    a: D,
    A: R,
    b: F,
    B: H,
    c: null,
    d: wf,
    e: wf,
    f: qj,
    g: Qj,
    G: tI,
    H: Fj,
    I: Uj,
    j: Wj,
    L: Cp,
    m: zj,
    M: Hj,
    p: re,
    q,
    Q: Af,
    s: _f,
    S: Kj,
    u: Gj,
    U: Xj,
    V: Vj,
    w: Yj,
    W: Zj,
    x: null,
    X: null,
    y: Jj,
    Y: eI,
    Z: rI,
    "%": Sf
  }, O = {
    a: fe,
    A: Le,
    b: Pe,
    B: $t,
    c: null,
    d: Of,
    e: Of,
    f: oI,
    g: yI,
    G: mI,
    H: nI,
    I: aI,
    j: iI,
    L: Np,
    m: uI,
    M: cI,
    p: Nt,
    q: Te,
    Q: Af,
    s: _f,
    S: sI,
    u: lI,
    U: fI,
    V: dI,
    w: hI,
    W: pI,
    x: null,
    X: null,
    y: vI,
    Y: gI,
    Z: bI,
    "%": Sf
  }, p = {
    a: M,
    A: T,
    b: E,
    B: k,
    c: j,
    d: bf,
    e: bf,
    f: Dj,
    g: mf,
    G: gf,
    H: xf,
    I: xf,
    j: Ij,
    L: Nj,
    m: jj,
    M: Cj,
    p: _,
    q: Mj,
    Q: Lj,
    s: Bj,
    S: kj,
    u: _j,
    U: $j,
    V: Pj,
    w: Aj,
    W: Tj,
    x: C,
    X: N,
    y: mf,
    Y: gf,
    Z: Ej,
    "%": Rj
  };
  w.x = m(r, w), w.X = m(n, w), w.c = m(t, w), O.x = m(r, O), O.X = m(n, O), O.c = m(t, O);
  function m(B, z) {
    return function(K) {
      var P = [], oe = -1, V = 0, de = B.length, be, Ce, et;
      for (K instanceof Date || (K = /* @__PURE__ */ new Date(+K)); ++oe < de; )
        B.charCodeAt(oe) === 37 && (P.push(B.slice(V, oe)), (Ce = yf[be = B.charAt(++oe)]) != null ? be = B.charAt(++oe) : Ce = be === "e" ? " " : "0", (et = z[be]) && (be = et(K, Ce)), P.push(be), V = oe + 1);
      return P.push(B.slice(V, oe)), P.join("");
    };
  }
  function S(B, z) {
    return function(K) {
      var P = Kr(1900, void 0, 1), oe = A(P, B, K += "", 0), V, de;
      if (oe != K.length)
        return null;
      if ("Q" in P)
        return new Date(P.Q);
      if ("s" in P)
        return new Date(P.s * 1e3 + ("L" in P ? P.L : 0));
      if (z && !("Z" in P) && (P.Z = 0), "p" in P && (P.H = P.H % 12 + P.p * 12), P.m === void 0 && (P.m = "q" in P ? P.q : 0), "V" in P) {
        if (P.V < 1 || P.V > 53)
          return null;
        "w" in P || (P.w = 1), "Z" in P ? (V = ho(Kr(P.y, 0, 1)), de = V.getUTCDay(), V = de > 4 || de === 0 ? Xa.ceil(V) : Xa(V), V = $i.offset(V, (P.V - 1) * 7), P.y = V.getUTCFullYear(), P.m = V.getUTCMonth(), P.d = V.getUTCDate() + (P.w + 6) % 7) : (V = fo(Kr(P.y, 0, 1)), de = V.getDay(), V = de > 4 || de === 0 ? Ga.ceil(V) : Ga(V), V = Yn.offset(V, (P.V - 1) * 7), P.y = V.getFullYear(), P.m = V.getMonth(), P.d = V.getDate() + (P.w + 6) % 7);
      } else
        ("W" in P || "U" in P) && ("w" in P || (P.w = "u" in P ? P.u % 7 : "W" in P ? 1 : 0), de = "Z" in P ? ho(Kr(P.y, 0, 1)).getUTCDay() : fo(Kr(P.y, 0, 1)).getDay(), P.m = 0, P.d = "W" in P ? (P.w + 6) % 7 + P.W * 7 - (de + 5) % 7 : P.w + P.U * 7 - (de + 6) % 7);
      return "Z" in P ? (P.H += P.Z / 100 | 0, P.M += P.Z % 100, ho(P)) : fo(P);
    };
  }
  function A(B, z, K, P) {
    for (var oe = 0, V = z.length, de = K.length, be, Ce; oe < V; ) {
      if (P >= de)
        return -1;
      if (be = z.charCodeAt(oe++), be === 37) {
        if (be = z.charAt(oe++), Ce = p[be in yf ? z.charAt(oe++) : be], !Ce || (P = Ce(B, K, P)) < 0)
          return -1;
      } else if (be != K.charCodeAt(P++))
        return -1;
    }
    return P;
  }
  function _(B, z, K) {
    var P = s.exec(z.slice(K));
    return P ? (B.p = f.get(P[0].toLowerCase()), K + P[0].length) : -1;
  }
  function M(B, z, K) {
    var P = h.exec(z.slice(K));
    return P ? (B.w = y.get(P[0].toLowerCase()), K + P[0].length) : -1;
  }
  function T(B, z, K) {
    var P = l.exec(z.slice(K));
    return P ? (B.w = d.get(P[0].toLowerCase()), K + P[0].length) : -1;
  }
  function E(B, z, K) {
    var P = b.exec(z.slice(K));
    return P ? (B.m = x.get(P[0].toLowerCase()), K + P[0].length) : -1;
  }
  function k(B, z, K) {
    var P = g.exec(z.slice(K));
    return P ? (B.m = v.get(P[0].toLowerCase()), K + P[0].length) : -1;
  }
  function j(B, z, K) {
    return A(B, t, z, K);
  }
  function C(B, z, K) {
    return A(B, r, z, K);
  }
  function N(B, z, K) {
    return A(B, n, z, K);
  }
  function D(B) {
    return o[B.getDay()];
  }
  function R(B) {
    return i[B.getDay()];
  }
  function F(B) {
    return c[B.getMonth()];
  }
  function H(B) {
    return u[B.getMonth()];
  }
  function re(B) {
    return a[+(B.getHours() >= 12)];
  }
  function q(B) {
    return 1 + ~~(B.getMonth() / 3);
  }
  function fe(B) {
    return o[B.getUTCDay()];
  }
  function Le(B) {
    return i[B.getUTCDay()];
  }
  function Pe(B) {
    return c[B.getUTCMonth()];
  }
  function $t(B) {
    return u[B.getUTCMonth()];
  }
  function Nt(B) {
    return a[+(B.getUTCHours() >= 12)];
  }
  function Te(B) {
    return 1 + ~~(B.getUTCMonth() / 3);
  }
  return {
    format: function(B) {
      var z = m(B += "", w);
      return z.toString = function() {
        return B;
      }, z;
    },
    parse: function(B) {
      var z = S(B += "", !1);
      return z.toString = function() {
        return B;
      }, z;
    },
    utcFormat: function(B) {
      var z = m(B += "", O);
      return z.toString = function() {
        return B;
      }, z;
    },
    utcParse: function(B) {
      var z = S(B += "", !0);
      return z.toString = function() {
        return B;
      }, z;
    }
  };
}
var yf = { "-": "", _: " ", 0: "0" }, Ae = /^\s*\d+/, wj = /^%/, Oj = /[\\^$*+?|[\]().{}]/g;
function Q(e, t, r) {
  var n = e < 0 ? "-" : "", a = (n ? -e : e) + "", i = a.length;
  return n + (i < r ? new Array(r - i + 1).join(t) + a : a);
}
function Sj(e) {
  return e.replace(Oj, "\\$&");
}
function Gr(e) {
  return new RegExp("^(?:" + e.map(Sj).join("|") + ")", "i");
}
function Xr(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function Aj(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function _j(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function $j(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function Pj(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function Tj(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function gf(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function mf(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function Ej(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function Mj(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function jj(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function bf(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function Ij(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function xf(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function Cj(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function kj(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function Nj(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function Dj(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function Rj(e, t, r) {
  var n = wj.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function Lj(e, t, r) {
  var n = Ae.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function Bj(e, t, r) {
  var n = Ae.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function wf(e, t) {
  return Q(e.getDate(), t, 2);
}
function Fj(e, t) {
  return Q(e.getHours(), t, 2);
}
function Uj(e, t) {
  return Q(e.getHours() % 12 || 12, t, 2);
}
function Wj(e, t) {
  return Q(1 + Yn.count(bt(e), e), t, 3);
}
function Cp(e, t) {
  return Q(e.getMilliseconds(), t, 3);
}
function qj(e, t) {
  return Cp(e, t) + "000";
}
function zj(e, t) {
  return Q(e.getMonth() + 1, t, 2);
}
function Hj(e, t) {
  return Q(e.getMinutes(), t, 2);
}
function Kj(e, t) {
  return Q(e.getSeconds(), t, 2);
}
function Gj(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function Xj(e, t) {
  return Q(Pi.count(bt(e) - 1, e), t, 2);
}
function kp(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? wr(e) : wr.ceil(e);
}
function Vj(e, t) {
  return e = kp(e), Q(wr.count(bt(e), e) + (bt(e).getDay() === 4), t, 2);
}
function Yj(e) {
  return e.getDay();
}
function Zj(e, t) {
  return Q(Ga.count(bt(e) - 1, e), t, 2);
}
function Jj(e, t) {
  return Q(e.getFullYear() % 100, t, 2);
}
function Qj(e, t) {
  return e = kp(e), Q(e.getFullYear() % 100, t, 2);
}
function eI(e, t) {
  return Q(e.getFullYear() % 1e4, t, 4);
}
function tI(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? wr(e) : wr.ceil(e), Q(e.getFullYear() % 1e4, t, 4);
}
function rI(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + Q(t / 60 | 0, "0", 2) + Q(t % 60, "0", 2);
}
function Of(e, t) {
  return Q(e.getUTCDate(), t, 2);
}
function nI(e, t) {
  return Q(e.getUTCHours(), t, 2);
}
function aI(e, t) {
  return Q(e.getUTCHours() % 12 || 12, t, 2);
}
function iI(e, t) {
  return Q(1 + $i.count(xt(e), e), t, 3);
}
function Np(e, t) {
  return Q(e.getUTCMilliseconds(), t, 3);
}
function oI(e, t) {
  return Np(e, t) + "000";
}
function uI(e, t) {
  return Q(e.getUTCMonth() + 1, t, 2);
}
function cI(e, t) {
  return Q(e.getUTCMinutes(), t, 2);
}
function sI(e, t) {
  return Q(e.getUTCSeconds(), t, 2);
}
function lI(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function fI(e, t) {
  return Q(Ti.count(xt(e) - 1, e), t, 2);
}
function Dp(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? Or(e) : Or.ceil(e);
}
function dI(e, t) {
  return e = Dp(e), Q(Or.count(xt(e), e) + (xt(e).getUTCDay() === 4), t, 2);
}
function hI(e) {
  return e.getUTCDay();
}
function pI(e, t) {
  return Q(Xa.count(xt(e) - 1, e), t, 2);
}
function vI(e, t) {
  return Q(e.getUTCFullYear() % 100, t, 2);
}
function yI(e, t) {
  return e = Dp(e), Q(e.getUTCFullYear() % 100, t, 2);
}
function gI(e, t) {
  return Q(e.getUTCFullYear() % 1e4, t, 4);
}
function mI(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? Or(e) : Or.ceil(e), Q(e.getUTCFullYear() % 1e4, t, 4);
}
function bI() {
  return "+0000";
}
function Sf() {
  return "%";
}
function Af(e) {
  return +e;
}
function _f(e) {
  return Math.floor(+e / 1e3);
}
var ir, Rp, Lp;
xI({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function xI(e) {
  return ir = xj(e), Rp = ir.format, ir.parse, Lp = ir.utcFormat, ir.utcParse, ir;
}
function wI(e) {
  return new Date(e);
}
function OI(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function Cc(e, t, r, n, a, i, o, u, c, s) {
  var f = bc(), l = f.invert, d = f.domain, h = s(".%L"), y = s(":%S"), g = s("%I:%M"), v = s("%I %p"), b = s("%a %d"), x = s("%b %d"), w = s("%B"), O = s("%Y");
  function p(m) {
    return (c(m) < m ? h : u(m) < m ? y : o(m) < m ? g : i(m) < m ? v : n(m) < m ? a(m) < m ? b : x : r(m) < m ? w : O)(m);
  }
  return f.invert = function(m) {
    return new Date(l(m));
  }, f.domain = function(m) {
    return arguments.length ? d(Array.from(m, OI)) : d().map(wI);
  }, f.ticks = function(m) {
    var S = d();
    return e(S[0], S[S.length - 1], m ?? 10);
  }, f.tickFormat = function(m, S) {
    return S == null ? p : s(S);
  }, f.nice = function(m) {
    var S = d();
    return (!m || typeof m.range != "function") && (m = t(S[0], S[S.length - 1], m ?? 10)), m ? d(Ap(S, m)) : f;
  }, f.copy = function() {
    return Vn(f, Cc(e, t, r, n, a, i, o, u, c, s));
  }, f;
}
function SI() {
  return Ve.apply(Cc(mj, bj, bt, jc, Pi, Yn, Ec, Pc, Gt, Rp).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function AI() {
  return Ve.apply(Cc(yj, gj, xt, Ic, Ti, $i, Mc, Tc, Gt, Lp).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function Ei() {
  var e = 0, t = 1, r, n, a, i, o = Me, u = !1, c;
  function s(l) {
    return l == null || isNaN(l = +l) ? c : o(a === 0 ? 0.5 : (l = (i(l) - r) * a, u ? Math.max(0, Math.min(1, l)) : l));
  }
  s.domain = function(l) {
    return arguments.length ? ([e, t] = l, r = i(e = +e), n = i(t = +t), a = r === n ? 0 : 1 / (n - r), s) : [e, t];
  }, s.clamp = function(l) {
    return arguments.length ? (u = !!l, s) : u;
  }, s.interpolator = function(l) {
    return arguments.length ? (o = l, s) : o;
  };
  function f(l) {
    return function(d) {
      var h, y;
      return arguments.length ? ([h, y] = d, o = l(h, y), s) : [o(0), o(1)];
    };
  }
  return s.range = f(Br), s.rangeRound = f(mc), s.unknown = function(l) {
    return arguments.length ? (c = l, s) : c;
  }, function(l) {
    return i = l, r = l(e), n = l(t), a = r === n ? 0 : 1 / (n - r), s;
  };
}
function kt(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function Bp() {
  var e = Ct(Ei()(Me));
  return e.copy = function() {
    return kt(e, Bp());
  }, At.apply(e, arguments);
}
function Fp() {
  var e = Oc(Ei()).domain([1, 10]);
  return e.copy = function() {
    return kt(e, Fp()).base(e.base());
  }, At.apply(e, arguments);
}
function Up() {
  var e = Sc(Ei());
  return e.copy = function() {
    return kt(e, Up()).constant(e.constant());
  }, At.apply(e, arguments);
}
function kc() {
  var e = Ac(Ei());
  return e.copy = function() {
    return kt(e, kc()).exponent(e.exponent());
  }, At.apply(e, arguments);
}
function _I() {
  return kc.apply(null, arguments).exponent(0.5);
}
function Wp() {
  var e = [], t = Me;
  function r(n) {
    if (n != null && !isNaN(n = +n))
      return t((Gn(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length)
      return e.slice();
    e = [];
    for (let a of n)
      a != null && !isNaN(a = +a) && e.push(a);
    return e.sort(Et), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, a) => t(a / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (a, i) => fM(e, i / n));
  }, r.copy = function() {
    return Wp(t).domain(e);
  }, At.apply(r, arguments);
}
function Mi() {
  var e = 0, t = 0.5, r = 1, n = 1, a, i, o, u, c, s = Me, f, l = !1, d;
  function h(g) {
    return isNaN(g = +g) ? d : (g = 0.5 + ((g = +f(g)) - i) * (n * g < n * i ? u : c), s(l ? Math.max(0, Math.min(1, g)) : g));
  }
  h.domain = function(g) {
    return arguments.length ? ([e, t, r] = g, a = f(e = +e), i = f(t = +t), o = f(r = +r), u = a === i ? 0 : 0.5 / (i - a), c = i === o ? 0 : 0.5 / (o - i), n = i < a ? -1 : 1, h) : [e, t, r];
  }, h.clamp = function(g) {
    return arguments.length ? (l = !!g, h) : l;
  }, h.interpolator = function(g) {
    return arguments.length ? (s = g, h) : s;
  };
  function y(g) {
    return function(v) {
      var b, x, w;
      return arguments.length ? ([b, x, w] = v, s = RM(g, [b, x, w]), h) : [s(0), s(0.5), s(1)];
    };
  }
  return h.range = y(Br), h.rangeRound = y(mc), h.unknown = function(g) {
    return arguments.length ? (d = g, h) : d;
  }, function(g) {
    return f = g, a = g(e), i = g(t), o = g(r), u = a === i ? 0 : 0.5 / (i - a), c = i === o ? 0 : 0.5 / (o - i), n = i < a ? -1 : 1, h;
  };
}
function qp() {
  var e = Ct(Mi()(Me));
  return e.copy = function() {
    return kt(e, qp());
  }, At.apply(e, arguments);
}
function zp() {
  var e = Oc(Mi()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return kt(e, zp()).base(e.base());
  }, At.apply(e, arguments);
}
function Hp() {
  var e = Sc(Mi());
  return e.copy = function() {
    return kt(e, Hp()).constant(e.constant());
  }, At.apply(e, arguments);
}
function Nc() {
  var e = Ac(Mi());
  return e.copy = function() {
    return kt(e, Nc()).exponent(e.exponent());
  }, At.apply(e, arguments);
}
function $I() {
  return Nc.apply(null, arguments).exponent(0.5);
}
const $f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: yn,
  scaleDiverging: qp,
  scaleDivergingLog: zp,
  scaleDivergingPow: Nc,
  scaleDivergingSqrt: $I,
  scaleDivergingSymlog: Hp,
  scaleIdentity: Sp,
  scaleImplicit: su,
  scaleLinear: Ha,
  scaleLog: _p,
  scaleOrdinal: vc,
  scalePoint: en,
  scalePow: _c,
  scaleQuantile: Tp,
  scaleQuantize: Ep,
  scaleRadial: Pp,
  scaleSequential: Bp,
  scaleSequentialLog: Fp,
  scaleSequentialPow: kc,
  scaleSequentialQuantile: Wp,
  scaleSequentialSqrt: _I,
  scaleSequentialSymlog: Up,
  scaleSqrt: oj,
  scaleSymlog: $p,
  scaleThreshold: Mp,
  scaleTime: SI,
  scaleUtc: AI,
  tickFormat: Op
}, Symbol.toStringTag, { value: "Module" }));
var PI = Mr;
function TI(e, t, r) {
  for (var n = -1, a = e.length; ++n < a; ) {
    var i = e[n], o = t(i);
    if (o != null && (u === void 0 ? o === o && !PI(o) : r(o, u)))
      var u = o, c = i;
  }
  return c;
}
var ji = TI;
function EI(e, t) {
  return e > t;
}
var Kp = EI, MI = ji, jI = Kp, II = Rr;
function CI(e) {
  return e && e.length ? MI(e, II, jI) : void 0;
}
var kI = CI;
const Ii = /* @__PURE__ */ ie(kI);
function NI(e, t) {
  return e < t;
}
var Gp = NI, DI = ji, RI = Gp, LI = Rr;
function BI(e) {
  return e && e.length ? DI(e, LI, RI) : void 0;
}
var FI = BI;
const Ci = /* @__PURE__ */ ie(FI);
var UI = Vu, WI = lt, qI = Yh, zI = Ie;
function HI(e, t) {
  var r = zI(e) ? UI : qI;
  return r(e, WI(t));
}
var KI = HI, GI = Xh, XI = KI;
function VI(e, t) {
  return GI(XI(e, t), 1);
}
var YI = VI;
const ZI = /* @__PURE__ */ ie(YI);
var JI = cc;
function QI(e, t) {
  return JI(e, t);
}
var eC = QI;
const Dc = /* @__PURE__ */ ie(eC);
var Fr = 1e9, tC = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed during run-time using `Decimal.config`.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
  // `toFixed`, `toPrecision` and `toSignificantDigits`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -MAX_E
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to MAX_E
  // The natural logarithm of 10.
  // 115 digits
  LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
}, Lc, pe = !0, Xe = "[DecimalError] ", Zt = Xe + "Invalid argument: ", Rc = Xe + "Exponent out of range: ", Ur = Math.floor, qt = Math.pow, rC = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Ne, Se = 1e7, le = 7, Xp = 9007199254740991, Va = Ur(Xp / le), U = {};
U.absoluteValue = U.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
U.comparedTo = U.cmp = function(e) {
  var t, r, n, a, i = this;
  if (e = new i.constructor(e), i.s !== e.s)
    return i.s || -e.s;
  if (i.e !== e.e)
    return i.e > e.e ^ i.s < 0 ? 1 : -1;
  for (n = i.d.length, a = e.d.length, t = 0, r = n < a ? n : a; t < r; ++t)
    if (i.d[t] !== e.d[t])
      return i.d[t] > e.d[t] ^ i.s < 0 ? 1 : -1;
  return n === a ? 0 : n > a ^ i.s < 0 ? 1 : -1;
};
U.decimalPlaces = U.dp = function() {
  var e = this, t = e.d.length - 1, r = (t - e.e) * le;
  if (t = e.d[t], t)
    for (; t % 10 == 0; t /= 10)
      r--;
  return r < 0 ? 0 : r;
};
U.dividedBy = U.div = function(e) {
  return gt(this, new this.constructor(e));
};
U.dividedToIntegerBy = U.idiv = function(e) {
  var t = this, r = t.constructor;
  return ae(gt(t, new r(e), 0, 1), r.precision);
};
U.equals = U.eq = function(e) {
  return !this.cmp(e);
};
U.exponent = function() {
  return me(this);
};
U.greaterThan = U.gt = function(e) {
  return this.cmp(e) > 0;
};
U.greaterThanOrEqualTo = U.gte = function(e) {
  return this.cmp(e) >= 0;
};
U.isInteger = U.isint = function() {
  return this.e > this.d.length - 2;
};
U.isNegative = U.isneg = function() {
  return this.s < 0;
};
U.isPositive = U.ispos = function() {
  return this.s > 0;
};
U.isZero = function() {
  return this.s === 0;
};
U.lessThan = U.lt = function(e) {
  return this.cmp(e) < 0;
};
U.lessThanOrEqualTo = U.lte = function(e) {
  return this.cmp(e) < 1;
};
U.logarithm = U.log = function(e) {
  var t, r = this, n = r.constructor, a = n.precision, i = a + 5;
  if (e === void 0)
    e = new n(10);
  else if (e = new n(e), e.s < 1 || e.eq(Ne))
    throw Error(Xe + "NaN");
  if (r.s < 1)
    throw Error(Xe + (r.s ? "NaN" : "-Infinity"));
  return r.eq(Ne) ? new n(0) : (pe = !1, t = gt(wn(r, i), wn(e, i), i), pe = !0, ae(t, a));
};
U.minus = U.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? Zp(t, e) : Vp(t, (e.s = -e.s, e));
};
U.modulo = U.mod = function(e) {
  var t, r = this, n = r.constructor, a = n.precision;
  if (e = new n(e), !e.s)
    throw Error(Xe + "NaN");
  return r.s ? (pe = !1, t = gt(r, e, 0, 1).times(e), pe = !0, r.minus(t)) : ae(new n(r), a);
};
U.naturalExponential = U.exp = function() {
  return Yp(this);
};
U.naturalLogarithm = U.ln = function() {
  return wn(this);
};
U.negated = U.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
U.plus = U.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? Vp(t, e) : Zp(t, (e.s = -e.s, e));
};
U.precision = U.sd = function(e) {
  var t, r, n, a = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0)
    throw Error(Zt + e);
  if (t = me(a) + 1, n = a.d.length - 1, r = n * le + 1, n = a.d[n], n) {
    for (; n % 10 == 0; n /= 10)
      r--;
    for (n = a.d[0]; n >= 10; n /= 10)
      r++;
  }
  return e && t > r ? t : r;
};
U.squareRoot = U.sqrt = function() {
  var e, t, r, n, a, i, o, u = this, c = u.constructor;
  if (u.s < 1) {
    if (!u.s)
      return new c(0);
    throw Error(Xe + "NaN");
  }
  for (e = me(u), pe = !1, a = Math.sqrt(+u), a == 0 || a == 1 / 0 ? (t = nt(u.d), (t.length + e) % 2 == 0 && (t += "0"), a = Math.sqrt(t), e = Ur((e + 1) / 2) - (e < 0 || e % 2), a == 1 / 0 ? t = "5e" + e : (t = a.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new c(t)) : n = new c(a.toString()), r = c.precision, a = o = r + 3; ; )
    if (i = n, n = i.plus(gt(u, i, o + 2)).times(0.5), nt(i.d).slice(0, o) === (t = nt(n.d)).slice(0, o)) {
      if (t = t.slice(o - 3, o + 1), a == o && t == "4999") {
        if (ae(i, r + 1, 0), i.times(i).eq(u)) {
          n = i;
          break;
        }
      } else if (t != "9999")
        break;
      o += 4;
    }
  return pe = !0, ae(n, r);
};
U.times = U.mul = function(e) {
  var t, r, n, a, i, o, u, c, s, f = this, l = f.constructor, d = f.d, h = (e = new l(e)).d;
  if (!f.s || !e.s)
    return new l(0);
  for (e.s *= f.s, r = f.e + e.e, c = d.length, s = h.length, c < s && (i = d, d = h, h = i, o = c, c = s, s = o), i = [], o = c + s, n = o; n--; )
    i.push(0);
  for (n = s; --n >= 0; ) {
    for (t = 0, a = c + n; a > n; )
      u = i[a] + h[n] * d[a - n - 1] + t, i[a--] = u % Se | 0, t = u / Se | 0;
    i[a] = (i[a] + t) % Se | 0;
  }
  for (; !i[--o]; )
    i.pop();
  return t ? ++r : i.shift(), e.d = i, e.e = r, pe ? ae(e, l.precision) : e;
};
U.toDecimalPlaces = U.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (ct(e, 0, Fr), t === void 0 ? t = n.rounding : ct(t, 0, 8), ae(r, e + me(r) + 1, t));
};
U.toExponential = function(e, t) {
  var r, n = this, a = n.constructor;
  return e === void 0 ? r = Qt(n, !0) : (ct(e, 0, Fr), t === void 0 ? t = a.rounding : ct(t, 0, 8), n = ae(new a(n), e + 1, t), r = Qt(n, !0, e + 1)), r;
};
U.toFixed = function(e, t) {
  var r, n, a = this, i = a.constructor;
  return e === void 0 ? Qt(a) : (ct(e, 0, Fr), t === void 0 ? t = i.rounding : ct(t, 0, 8), n = ae(new i(a), e + me(a) + 1, t), r = Qt(n.abs(), !1, e + me(n) + 1), a.isneg() && !a.isZero() ? "-" + r : r);
};
U.toInteger = U.toint = function() {
  var e = this, t = e.constructor;
  return ae(new t(e), me(e) + 1, t.rounding);
};
U.toNumber = function() {
  return +this;
};
U.toPower = U.pow = function(e) {
  var t, r, n, a, i, o, u = this, c = u.constructor, s = 12, f = +(e = new c(e));
  if (!e.s)
    return new c(Ne);
  if (u = new c(u), !u.s) {
    if (e.s < 1)
      throw Error(Xe + "Infinity");
    return u;
  }
  if (u.eq(Ne))
    return u;
  if (n = c.precision, e.eq(Ne))
    return ae(u, n);
  if (t = e.e, r = e.d.length - 1, o = t >= r, i = u.s, o) {
    if ((r = f < 0 ? -f : f) <= Xp) {
      for (a = new c(Ne), t = Math.ceil(n / le + 4), pe = !1; r % 2 && (a = a.times(u), Tf(a.d, t)), r = Ur(r / 2), r !== 0; )
        u = u.times(u), Tf(u.d, t);
      return pe = !0, e.s < 0 ? new c(Ne).div(a) : ae(a, n);
    }
  } else if (i < 0)
    throw Error(Xe + "NaN");
  return i = i < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, u.s = 1, pe = !1, a = e.times(wn(u, n + s)), pe = !0, a = Yp(a), a.s = i, a;
};
U.toPrecision = function(e, t) {
  var r, n, a = this, i = a.constructor;
  return e === void 0 ? (r = me(a), n = Qt(a, r <= i.toExpNeg || r >= i.toExpPos)) : (ct(e, 1, Fr), t === void 0 ? t = i.rounding : ct(t, 0, 8), a = ae(new i(a), e, t), r = me(a), n = Qt(a, e <= r || r <= i.toExpNeg, e)), n;
};
U.toSignificantDigits = U.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (ct(e, 1, Fr), t === void 0 ? t = n.rounding : ct(t, 0, 8)), ae(new n(r), e, t);
};
U.toString = U.valueOf = U.val = U.toJSON = U[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = me(e), r = e.constructor;
  return Qt(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function Vp(e, t) {
  var r, n, a, i, o, u, c, s, f = e.constructor, l = f.precision;
  if (!e.s || !t.s)
    return t.s || (t = new f(e)), pe ? ae(t, l) : t;
  if (c = e.d, s = t.d, o = e.e, a = t.e, c = c.slice(), i = o - a, i) {
    for (i < 0 ? (n = c, i = -i, u = s.length) : (n = s, a = o, u = c.length), o = Math.ceil(l / le), u = o > u ? o + 1 : u + 1, i > u && (i = u, n.length = 1), n.reverse(); i--; )
      n.push(0);
    n.reverse();
  }
  for (u = c.length, i = s.length, u - i < 0 && (i = u, n = s, s = c, c = n), r = 0; i; )
    r = (c[--i] = c[i] + s[i] + r) / Se | 0, c[i] %= Se;
  for (r && (c.unshift(r), ++a), u = c.length; c[--u] == 0; )
    c.pop();
  return t.d = c, t.e = a, pe ? ae(t, l) : t;
}
function ct(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(Zt + e);
}
function nt(e) {
  var t, r, n, a = e.length - 1, i = "", o = e[0];
  if (a > 0) {
    for (i += o, t = 1; t < a; t++)
      n = e[t] + "", r = le - n.length, r && (i += Tt(r)), i += n;
    o = e[t], n = o + "", r = le - n.length, r && (i += Tt(r));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; )
    o /= 10;
  return i + o;
}
var gt = /* @__PURE__ */ function() {
  function e(n, a) {
    var i, o = 0, u = n.length;
    for (n = n.slice(); u--; )
      i = n[u] * a + o, n[u] = i % Se | 0, o = i / Se | 0;
    return o && n.unshift(o), n;
  }
  function t(n, a, i, o) {
    var u, c;
    if (i != o)
      c = i > o ? 1 : -1;
    else
      for (u = c = 0; u < i; u++)
        if (n[u] != a[u]) {
          c = n[u] > a[u] ? 1 : -1;
          break;
        }
    return c;
  }
  function r(n, a, i) {
    for (var o = 0; i--; )
      n[i] -= o, o = n[i] < a[i] ? 1 : 0, n[i] = o * Se + n[i] - a[i];
    for (; !n[0] && n.length > 1; )
      n.shift();
  }
  return function(n, a, i, o) {
    var u, c, s, f, l, d, h, y, g, v, b, x, w, O, p, m, S, A, _ = n.constructor, M = n.s == a.s ? 1 : -1, T = n.d, E = a.d;
    if (!n.s)
      return new _(n);
    if (!a.s)
      throw Error(Xe + "Division by zero");
    for (c = n.e - a.e, S = E.length, p = T.length, h = new _(M), y = h.d = [], s = 0; E[s] == (T[s] || 0); )
      ++s;
    if (E[s] > (T[s] || 0) && --c, i == null ? x = i = _.precision : o ? x = i + (me(n) - me(a)) + 1 : x = i, x < 0)
      return new _(0);
    if (x = x / le + 2 | 0, s = 0, S == 1)
      for (f = 0, E = E[0], x++; (s < p || f) && x--; s++)
        w = f * Se + (T[s] || 0), y[s] = w / E | 0, f = w % E | 0;
    else {
      for (f = Se / (E[0] + 1) | 0, f > 1 && (E = e(E, f), T = e(T, f), S = E.length, p = T.length), O = S, g = T.slice(0, S), v = g.length; v < S; )
        g[v++] = 0;
      A = E.slice(), A.unshift(0), m = E[0], E[1] >= Se / 2 && ++m;
      do
        f = 0, u = t(E, g, S, v), u < 0 ? (b = g[0], S != v && (b = b * Se + (g[1] || 0)), f = b / m | 0, f > 1 ? (f >= Se && (f = Se - 1), l = e(E, f), d = l.length, v = g.length, u = t(l, g, d, v), u == 1 && (f--, r(l, S < d ? A : E, d))) : (f == 0 && (u = f = 1), l = E.slice()), d = l.length, d < v && l.unshift(0), r(g, l, v), u == -1 && (v = g.length, u = t(E, g, S, v), u < 1 && (f++, r(g, S < v ? A : E, v))), v = g.length) : u === 0 && (f++, g = [0]), y[s++] = f, u && g[0] ? g[v++] = T[O] || 0 : (g = [T[O]], v = 1);
      while ((O++ < p || g[0] !== void 0) && x--);
    }
    return y[0] || y.shift(), h.e = c, ae(h, o ? i + me(h) + 1 : i);
  };
}();
function Yp(e, t) {
  var r, n, a, i, o, u, c = 0, s = 0, f = e.constructor, l = f.precision;
  if (me(e) > 16)
    throw Error(Rc + me(e));
  if (!e.s)
    return new f(Ne);
  for (t == null ? (pe = !1, u = l) : u = t, o = new f(0.03125); e.abs().gte(0.1); )
    e = e.times(o), s += 5;
  for (n = Math.log(qt(2, s)) / Math.LN10 * 2 + 5 | 0, u += n, r = a = i = new f(Ne), f.precision = u; ; ) {
    if (a = ae(a.times(e), u), r = r.times(++c), o = i.plus(gt(a, r, u)), nt(o.d).slice(0, u) === nt(i.d).slice(0, u)) {
      for (; s--; )
        i = ae(i.times(i), u);
      return f.precision = l, t == null ? (pe = !0, ae(i, l)) : i;
    }
    i = o;
  }
}
function me(e) {
  for (var t = e.e * le, r = e.d[0]; r >= 10; r /= 10)
    t++;
  return t;
}
function po(e, t, r) {
  if (t > e.LN10.sd())
    throw pe = !0, r && (e.precision = r), Error(Xe + "LN10 precision limit exceeded");
  return ae(new e(e.LN10), t);
}
function Tt(e) {
  for (var t = ""; e--; )
    t += "0";
  return t;
}
function wn(e, t) {
  var r, n, a, i, o, u, c, s, f, l = 1, d = 10, h = e, y = h.d, g = h.constructor, v = g.precision;
  if (h.s < 1)
    throw Error(Xe + (h.s ? "NaN" : "-Infinity"));
  if (h.eq(Ne))
    return new g(0);
  if (t == null ? (pe = !1, s = v) : s = t, h.eq(10))
    return t == null && (pe = !0), po(g, s);
  if (s += d, g.precision = s, r = nt(y), n = r.charAt(0), i = me(h), Math.abs(i) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      h = h.times(e), r = nt(h.d), n = r.charAt(0), l++;
    i = me(h), n > 1 ? (h = new g("0." + r), i++) : h = new g(n + "." + r.slice(1));
  } else
    return c = po(g, s + 2, v).times(i + ""), h = wn(new g(n + "." + r.slice(1)), s - d).plus(c), g.precision = v, t == null ? (pe = !0, ae(h, v)) : h;
  for (u = o = h = gt(h.minus(Ne), h.plus(Ne), s), f = ae(h.times(h), s), a = 3; ; ) {
    if (o = ae(o.times(f), s), c = u.plus(gt(o, new g(a), s)), nt(c.d).slice(0, s) === nt(u.d).slice(0, s))
      return u = u.times(2), i !== 0 && (u = u.plus(po(g, s + 2, v).times(i + ""))), u = gt(u, new g(l), s), g.precision = v, t == null ? (pe = !0, ae(u, v)) : u;
    u = c, a += 2;
  }
}
function Pf(e, t) {
  var r, n, a;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; )
    ++n;
  for (a = t.length; t.charCodeAt(a - 1) === 48; )
    --a;
  if (t = t.slice(n, a), t) {
    if (a -= n, r = r - n - 1, e.e = Ur(r / le), e.d = [], n = (r + 1) % le, r < 0 && (n += le), n < a) {
      for (n && e.d.push(+t.slice(0, n)), a -= le; n < a; )
        e.d.push(+t.slice(n, n += le));
      t = t.slice(n), n = le - t.length;
    } else
      n -= a;
    for (; n--; )
      t += "0";
    if (e.d.push(+t), pe && (e.e > Va || e.e < -Va))
      throw Error(Rc + r);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function ae(e, t, r) {
  var n, a, i, o, u, c, s, f, l = e.d;
  for (o = 1, i = l[0]; i >= 10; i /= 10)
    o++;
  if (n = t - o, n < 0)
    n += le, a = t, s = l[f = 0];
  else {
    if (f = Math.ceil((n + 1) / le), i = l.length, f >= i)
      return e;
    for (s = i = l[f], o = 1; i >= 10; i /= 10)
      o++;
    n %= le, a = n - le + o;
  }
  if (r !== void 0 && (i = qt(10, o - a - 1), u = s / i % 10 | 0, c = t < 0 || l[f + 1] !== void 0 || s % i, c = r < 4 ? (u || c) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : u > 5 || u == 5 && (r == 4 || c || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? a > 0 ? s / qt(10, o - a) : 0 : l[f - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !l[0])
    return c ? (i = me(e), l.length = 1, t = t - i - 1, l[0] = qt(10, (le - t % le) % le), e.e = Ur(-t / le) || 0) : (l.length = 1, l[0] = e.e = e.s = 0), e;
  if (n == 0 ? (l.length = f, i = 1, f--) : (l.length = f + 1, i = qt(10, le - n), l[f] = a > 0 ? (s / qt(10, o - a) % qt(10, a) | 0) * i : 0), c)
    for (; ; )
      if (f == 0) {
        (l[0] += i) == Se && (l[0] = 1, ++e.e);
        break;
      } else {
        if (l[f] += i, l[f] != Se)
          break;
        l[f--] = 0, i = 1;
      }
  for (n = l.length; l[--n] === 0; )
    l.pop();
  if (pe && (e.e > Va || e.e < -Va))
    throw Error(Rc + me(e));
  return e;
}
function Zp(e, t) {
  var r, n, a, i, o, u, c, s, f, l, d = e.constructor, h = d.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new d(e), pe ? ae(t, h) : t;
  if (c = e.d, l = t.d, n = t.e, s = e.e, c = c.slice(), o = s - n, o) {
    for (f = o < 0, f ? (r = c, o = -o, u = l.length) : (r = l, n = s, u = c.length), a = Math.max(Math.ceil(h / le), u) + 2, o > a && (o = a, r.length = 1), r.reverse(), a = o; a--; )
      r.push(0);
    r.reverse();
  } else {
    for (a = c.length, u = l.length, f = a < u, f && (u = a), a = 0; a < u; a++)
      if (c[a] != l[a]) {
        f = c[a] < l[a];
        break;
      }
    o = 0;
  }
  for (f && (r = c, c = l, l = r, t.s = -t.s), u = c.length, a = l.length - u; a > 0; --a)
    c[u++] = 0;
  for (a = l.length; a > o; ) {
    if (c[--a] < l[a]) {
      for (i = a; i && c[--i] === 0; )
        c[i] = Se - 1;
      --c[i], c[a] += Se;
    }
    c[a] -= l[a];
  }
  for (; c[--u] === 0; )
    c.pop();
  for (; c[0] === 0; c.shift())
    --n;
  return c[0] ? (t.d = c, t.e = n, pe ? ae(t, h) : t) : new d(0);
}
function Qt(e, t, r) {
  var n, a = me(e), i = nt(e.d), o = i.length;
  return t ? (r && (n = r - o) > 0 ? i = i.charAt(0) + "." + i.slice(1) + Tt(n) : o > 1 && (i = i.charAt(0) + "." + i.slice(1)), i = i + (a < 0 ? "e" : "e+") + a) : a < 0 ? (i = "0." + Tt(-a - 1) + i, r && (n = r - o) > 0 && (i += Tt(n))) : a >= o ? (i += Tt(a + 1 - o), r && (n = r - a - 1) > 0 && (i = i + "." + Tt(n))) : ((n = a + 1) < o && (i = i.slice(0, n) + "." + i.slice(n)), r && (n = r - o) > 0 && (a + 1 === o && (i += "."), i += Tt(n))), e.s < 0 ? "-" + i : i;
}
function Tf(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function Jp(e) {
  var t, r, n;
  function a(i) {
    var o = this;
    if (!(o instanceof a))
      return new a(i);
    if (o.constructor = a, i instanceof a) {
      o.s = i.s, o.e = i.e, o.d = (i = i.d) ? i.slice() : i;
      return;
    }
    if (typeof i == "number") {
      if (i * 0 !== 0)
        throw Error(Zt + i);
      if (i > 0)
        o.s = 1;
      else if (i < 0)
        i = -i, o.s = -1;
      else {
        o.s = 0, o.e = 0, o.d = [0];
        return;
      }
      if (i === ~~i && i < 1e7) {
        o.e = 0, o.d = [i];
        return;
      }
      return Pf(o, i.toString());
    } else if (typeof i != "string")
      throw Error(Zt + i);
    if (i.charCodeAt(0) === 45 ? (i = i.slice(1), o.s = -1) : o.s = 1, rC.test(i))
      Pf(o, i);
    else
      throw Error(Zt + i);
  }
  if (a.prototype = U, a.ROUND_UP = 0, a.ROUND_DOWN = 1, a.ROUND_CEIL = 2, a.ROUND_FLOOR = 3, a.ROUND_HALF_UP = 4, a.ROUND_HALF_DOWN = 5, a.ROUND_HALF_EVEN = 6, a.ROUND_HALF_CEIL = 7, a.ROUND_HALF_FLOOR = 8, a.clone = Jp, a.config = a.set = nC, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; )
      e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return a.config(e), a;
}
function nC(e) {
  if (!e || typeof e != "object")
    throw Error(Xe + "Object expected");
  var t, r, n, a = [
    "precision",
    1,
    Fr,
    "rounding",
    0,
    8,
    "toExpNeg",
    -1 / 0,
    0,
    "toExpPos",
    0,
    1 / 0
  ];
  for (t = 0; t < a.length; t += 3)
    if ((n = e[r = a[t]]) !== void 0)
      if (Ur(n) === n && n >= a[t + 1] && n <= a[t + 2])
        this[r] = n;
      else
        throw Error(Zt + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10)
      this[r] = new this(n);
    else
      throw Error(Zt + r + ": " + n);
  return this;
}
var Lc = Jp(tC);
Ne = new Lc(1);
const ne = Lc;
function aC(e) {
  return cC(e) || uC(e) || oC(e) || iC();
}
function iC() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function oC(e, t) {
  if (e) {
    if (typeof e == "string")
      return hu(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return hu(e, t);
  }
}
function uC(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e))
    return Array.from(e);
}
function cC(e) {
  if (Array.isArray(e))
    return hu(e);
}
function hu(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
var sC = function(t) {
  return t;
}, Qp = {
  "@@functional/placeholder": !0
}, ev = function(t) {
  return t === Qp;
}, Ef = function(t) {
  return function r() {
    return arguments.length === 0 || arguments.length === 1 && ev(arguments.length <= 0 ? void 0 : arguments[0]) ? r : t.apply(void 0, arguments);
  };
}, lC = function e(t, r) {
  return t === 1 ? r : Ef(function() {
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var o = a.filter(function(u) {
      return u !== Qp;
    }).length;
    return o >= t ? r.apply(void 0, a) : e(t - o, Ef(function() {
      for (var u = arguments.length, c = new Array(u), s = 0; s < u; s++)
        c[s] = arguments[s];
      var f = a.map(function(l) {
        return ev(l) ? c.shift() : l;
      });
      return r.apply(void 0, aC(f).concat(c));
    }));
  });
}, ki = function(t) {
  return lC(t.length, t);
}, pu = function(t, r) {
  for (var n = [], a = t; a < r; ++a)
    n[a - t] = a;
  return n;
}, fC = ki(function(e, t) {
  return Array.isArray(t) ? t.map(e) : Object.keys(t).map(function(r) {
    return t[r];
  }).map(e);
}), dC = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  if (!r.length)
    return sC;
  var a = r.reverse(), i = a[0], o = a.slice(1);
  return function() {
    return o.reduce(function(u, c) {
      return c(u);
    }, i.apply(void 0, arguments));
  };
}, vu = function(t) {
  return Array.isArray(t) ? t.reverse() : t.split("").reverse.join("");
}, tv = function(t) {
  var r = null, n = null;
  return function() {
    for (var a = arguments.length, i = new Array(a), o = 0; o < a; o++)
      i[o] = arguments[o];
    return r && i.every(function(u, c) {
      return u === r[c];
    }) || (r = i, n = t.apply(void 0, i)), n;
  };
};
function hC(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new ne(e).abs().log(10).toNumber()) + 1, t;
}
function pC(e, t, r) {
  for (var n = new ne(e), a = 0, i = []; n.lt(t) && a < 1e5; )
    i.push(n.toNumber()), n = n.add(r), a++;
  return i;
}
var vC = ki(function(e, t, r) {
  var n = +e, a = +t;
  return n + r * (a - n);
}), yC = ki(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, (r - e) / n;
}), gC = ki(function(e, t, r) {
  var n = t - +e;
  return n = n || 1 / 0, Math.max(0, Math.min(1, (r - e) / n));
});
const Ni = {
  rangeStep: pC,
  getDigitCount: hC,
  interpolateNumber: vC,
  uninterpolateNumber: yC,
  uninterpolateTruncation: gC
};
function yu(e) {
  return xC(e) || bC(e) || rv(e) || mC();
}
function mC() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function bC(e) {
  if (typeof Symbol < "u" && Symbol.iterator in Object(e))
    return Array.from(e);
}
function xC(e) {
  if (Array.isArray(e))
    return gu(e);
}
function On(e, t) {
  return SC(e) || OC(e, t) || rv(e, t) || wC();
}
function wC() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function rv(e, t) {
  if (e) {
    if (typeof e == "string")
      return gu(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return gu(e, t);
  }
}
function gu(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function OC(e, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(e)))) {
    var r = [], n = !0, a = !1, i = void 0;
    try {
      for (var o = e[Symbol.iterator](), u; !(n = (u = o.next()).done) && (r.push(u.value), !(t && r.length === t)); n = !0)
        ;
    } catch (c) {
      a = !0, i = c;
    } finally {
      try {
        !n && o.return != null && o.return();
      } finally {
        if (a)
          throw i;
      }
    }
    return r;
  }
}
function SC(e) {
  if (Array.isArray(e))
    return e;
}
function nv(e) {
  var t = On(e, 2), r = t[0], n = t[1], a = r, i = n;
  return r > n && (a = n, i = r), [a, i];
}
function av(e, t, r) {
  if (e.lte(0))
    return new ne(0);
  var n = Ni.getDigitCount(e.toNumber()), a = new ne(10).pow(n), i = e.div(a), o = n !== 1 ? 0.05 : 0.1, u = new ne(Math.ceil(i.div(o).toNumber())).add(r).mul(o), c = u.mul(a);
  return t ? c : new ne(Math.ceil(c));
}
function AC(e, t, r) {
  var n = 1, a = new ne(e);
  if (!a.isint() && r) {
    var i = Math.abs(e);
    i < 1 ? (n = new ne(10).pow(Ni.getDigitCount(e) - 1), a = new ne(Math.floor(a.div(n).toNumber())).mul(n)) : i > 1 && (a = new ne(Math.floor(e)));
  } else
    e === 0 ? a = new ne(Math.floor((t - 1) / 2)) : r || (a = new ne(Math.floor(e)));
  var o = Math.floor((t - 1) / 2), u = dC(fC(function(c) {
    return a.add(new ne(c - o).mul(n)).toNumber();
  }), pu);
  return u(0, t);
}
function iv(e, t, r, n) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((t - e) / (r - 1)))
    return {
      step: new ne(0),
      tickMin: new ne(0),
      tickMax: new ne(0)
    };
  var i = av(new ne(t).sub(e).div(r - 1), n, a), o;
  e <= 0 && t >= 0 ? o = new ne(0) : (o = new ne(e).add(t).div(2), o = o.sub(new ne(o).mod(i)));
  var u = Math.ceil(o.sub(e).div(i).toNumber()), c = Math.ceil(new ne(t).sub(o).div(i).toNumber()), s = u + c + 1;
  return s > r ? iv(e, t, r, n, a + 1) : (s < r && (c = t > 0 ? c + (r - s) : c, u = t > 0 ? u : u + (r - s)), {
    step: i,
    tickMin: o.sub(new ne(u).mul(i)),
    tickMax: o.add(new ne(c).mul(i))
  });
}
function _C(e) {
  var t = On(e, 2), r = t[0], n = t[1], a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = Math.max(a, 2), u = nv([r, n]), c = On(u, 2), s = c[0], f = c[1];
  if (s === -1 / 0 || f === 1 / 0) {
    var l = f === 1 / 0 ? [s].concat(yu(pu(0, a - 1).map(function() {
      return 1 / 0;
    }))) : [].concat(yu(pu(0, a - 1).map(function() {
      return -1 / 0;
    })), [f]);
    return r > n ? vu(l) : l;
  }
  if (s === f)
    return AC(s, a, i);
  var d = iv(s, f, o, i), h = d.step, y = d.tickMin, g = d.tickMax, v = Ni.rangeStep(y, g.add(new ne(0.1).mul(h)), h);
  return r > n ? vu(v) : v;
}
function $C(e, t) {
  var r = On(e, 2), n = r[0], a = r[1], i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = nv([n, a]), u = On(o, 2), c = u[0], s = u[1];
  if (c === -1 / 0 || s === 1 / 0)
    return [n, a];
  if (c === s)
    return [c];
  var f = Math.max(t, 2), l = av(new ne(s).sub(c).div(f - 1), i, 0), d = [].concat(yu(Ni.rangeStep(new ne(c), new ne(s).sub(new ne(0.99).mul(l)), l)), [s]);
  return n > a ? vu(d) : d;
}
var PC = tv(_C), TC = tv($C), EC = ["offset", "layout", "width", "dataKey", "data", "dataPointFormatter", "xAxis", "yAxis"];
function Ya() {
  return Ya = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ya.apply(this, arguments);
}
function MC(e, t) {
  return kC(e) || CC(e, t) || IC(e, t) || jC();
}
function jC() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function IC(e, t) {
  if (e) {
    if (typeof e == "string")
      return Mf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Mf(e, t);
  }
}
function Mf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function CC(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = !0, s = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r)
          return;
        c = !1;
      } else
        for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); c = !0)
          ;
    } catch (f) {
      s = !0, a = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o))
          return;
      } finally {
        if (s)
          throw a;
      }
    }
    return u;
  }
}
function kC(e) {
  if (Array.isArray(e))
    return e;
}
function NC(e, t) {
  if (e == null)
    return {};
  var r = DC(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function DC(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function Bc(e) {
  var t = e.offset, r = e.layout, n = e.width, a = e.dataKey, i = e.data, o = e.dataPointFormatter, u = e.xAxis, c = e.yAxis, s = NC(e, EC), f = X(s, !1);
  e.direction === "x" && u.type !== "number" && (process.env.NODE_ENV !== "production" ? He(!1, 'ErrorBar requires Axis type property to be "number".') : He(!1));
  var l = i.map(function(d) {
    var h = o(d, a), y = h.x, g = h.y, v = h.value, b = h.errorVal;
    if (!b)
      return null;
    var x = [], w, O;
    if (Array.isArray(b)) {
      var p = MC(b, 2);
      w = p[0], O = p[1];
    } else
      w = O = b;
    if (r === "vertical") {
      var m = u.scale, S = g + t, A = S + n, _ = S - n, M = m(v - w), T = m(v + O);
      x.push({
        x1: T,
        y1: A,
        x2: T,
        y2: _
      }), x.push({
        x1: M,
        y1: S,
        x2: T,
        y2: S
      }), x.push({
        x1: M,
        y1: A,
        x2: M,
        y2: _
      });
    } else if (r === "horizontal") {
      var E = c.scale, k = y + t, j = k - n, C = k + n, N = E(v - w), D = E(v + O);
      x.push({
        x1: j,
        y1: D,
        x2: C,
        y2: D
      }), x.push({
        x1: k,
        y1: N,
        x2: k,
        y2: D
      }), x.push({
        x1: j,
        y1: N,
        x2: C,
        y2: N
      });
    }
    return /* @__PURE__ */ $.createElement(ye, Ya({
      className: "recharts-errorBar",
      key: "bar-".concat(x.map(function(R) {
        return "".concat(R.x1, "-").concat(R.x2, "-").concat(R.y1, "-").concat(R.y2);
      }))
    }, f), x.map(function(R) {
      return /* @__PURE__ */ $.createElement("line", Ya({}, R, {
        key: "line-".concat(R.x1, "-").concat(R.x2, "-").concat(R.y1, "-").concat(R.y2)
      }));
    }));
  });
  return /* @__PURE__ */ $.createElement(ye, {
    className: "recharts-errorBars"
  }, l);
}
Bc.defaultProps = {
  stroke: "black",
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: "horizontal"
};
Bc.displayName = "ErrorBar";
function Sn(e) {
  "@babel/helpers - typeof";
  return Sn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Sn(e);
}
function jf(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function vo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jf(Object(r), !0).forEach(function(n) {
      RC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : jf(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function RC(e, t, r) {
  return t = LC(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function LC(e) {
  var t = BC(e, "string");
  return Sn(t) === "symbol" ? t : String(t);
}
function BC(e, t) {
  if (Sn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Sn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ov = function(t) {
  var r = t.children, n = t.formattedGraphicalItems, a = t.legendWidth, i = t.legendContent, o = We(r, cn);
  if (!o)
    return null;
  var u;
  return o.props && o.props.payload ? u = o.props && o.props.payload : i === "children" ? u = (n || []).reduce(function(c, s) {
    var f = s.item, l = s.props, d = l.sectors || l.data || [];
    return c.concat(d.map(function(h) {
      return {
        type: o.props.iconType || f.props.legendType,
        value: h.name,
        color: h.fill,
        payload: h
      };
    }));
  }, []) : u = (n || []).map(function(c) {
    var s = c.item, f = s.props, l = f.dataKey, d = f.name, h = f.legendType, y = f.hide;
    return {
      inactive: y,
      dataKey: l,
      type: o.props.iconType || h || "square",
      color: Fc(s),
      value: d || l,
      // @ts-expect-error property strokeDasharray is required in Payload but optional in props
      payload: s.props
    };
  }), vo(vo(vo({}, o.props), cn.getWithHeight(o, a)), {}, {
    payload: u,
    item: o
  });
};
function An(e) {
  "@babel/helpers - typeof";
  return An = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, An(e);
}
function If(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? If(Object(r), !0).forEach(function(n) {
      fr(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : If(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function fr(e, t, r) {
  return t = FC(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function FC(e) {
  var t = UC(e, "string");
  return An(t) === "symbol" ? t : String(t);
}
function UC(e, t) {
  if (An(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (An(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Cf(e) {
  return HC(e) || zC(e) || qC(e) || WC();
}
function WC() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qC(e, t) {
  if (e) {
    if (typeof e == "string")
      return mu(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return mu(e, t);
  }
}
function zC(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function HC(e) {
  if (Array.isArray(e))
    return mu(e);
}
function mu(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function De(e, t, r) {
  return J(e) || J(t) ? r : we(t) ? Je(e, t, r) : Y(t) ? t(e) : r;
}
function tn(e, t, r, n) {
  var a = ZI(e, function(u) {
    return De(u, t);
  });
  if (r === "number") {
    var i = a.filter(function(u) {
      return L(u) || parseFloat(u);
    });
    return i.length ? [Ci(i), Ii(i)] : [1 / 0, -1 / 0];
  }
  var o = n ? a.filter(function(u) {
    return !J(u);
  }) : a;
  return o.map(function(u) {
    return we(u) || u instanceof Date ? u : "";
  });
}
var KC = function(t) {
  var r, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], a = arguments.length > 2 ? arguments[2] : void 0, i = arguments.length > 3 ? arguments[3] : void 0, o = -1, u = (r = n == null ? void 0 : n.length) !== null && r !== void 0 ? r : 0;
  if (u <= 1)
    return 0;
  if (i && i.axisType === "angleAxis" && Math.abs(Math.abs(i.range[1] - i.range[0]) - 360) <= 1e-6)
    for (var c = i.range, s = 0; s < u; s++) {
      var f = s > 0 ? a[s - 1].coordinate : a[u - 1].coordinate, l = a[s].coordinate, d = s >= u - 1 ? a[0].coordinate : a[s + 1].coordinate, h = void 0;
      if (Ke(l - f) !== Ke(d - l)) {
        var y = [];
        if (Ke(d - l) === Ke(c[1] - c[0])) {
          h = d;
          var g = l + c[1] - c[0];
          y[0] = Math.min(g, (g + f) / 2), y[1] = Math.max(g, (g + f) / 2);
        } else {
          h = f;
          var v = d + c[1] - c[0];
          y[0] = Math.min(l, (v + l) / 2), y[1] = Math.max(l, (v + l) / 2);
        }
        var b = [Math.min(l, (h + l) / 2), Math.max(l, (h + l) / 2)];
        if (t > b[0] && t <= b[1] || t >= y[0] && t <= y[1]) {
          o = a[s].index;
          break;
        }
      } else {
        var x = Math.min(f, d), w = Math.max(f, d);
        if (t > (x + l) / 2 && t <= (w + l) / 2) {
          o = a[s].index;
          break;
        }
      }
    }
  else
    for (var O = 0; O < u; O++)
      if (O === 0 && t <= (n[O].coordinate + n[O + 1].coordinate) / 2 || O > 0 && O < u - 1 && t > (n[O].coordinate + n[O - 1].coordinate) / 2 && t <= (n[O].coordinate + n[O + 1].coordinate) / 2 || O === u - 1 && t > (n[O].coordinate + n[O - 1].coordinate) / 2) {
        o = n[O].index;
        break;
      }
  return o;
}, Fc = function(t) {
  var r = t, n = r.type.displayName, a = t.props, i = a.stroke, o = a.fill, u;
  switch (n) {
    case "Line":
      u = i;
      break;
    case "Area":
    case "Radar":
      u = i && i !== "none" ? i : o;
      break;
    default:
      u = o;
      break;
  }
  return u;
}, GC = function(t) {
  var r = t.barSize, n = t.stackGroups, a = n === void 0 ? {} : n;
  if (!a)
    return {};
  for (var i = {}, o = Object.keys(a), u = 0, c = o.length; u < c; u++)
    for (var s = a[o[u]].stackGroups, f = Object.keys(s), l = 0, d = f.length; l < d; l++) {
      var h = s[f[l]], y = h.items, g = h.cateAxisId, v = y.filter(function(w) {
        return vt(w.type).indexOf("Bar") >= 0;
      });
      if (v && v.length) {
        var b = v[0].props.barSize, x = v[0].props[g];
        i[x] || (i[x] = []), i[x].push({
          item: v[0],
          stackList: v.slice(1),
          barSize: J(b) ? r : b
        });
      }
    }
  return i;
}, XC = function(t) {
  var r = t.barGap, n = t.barCategoryGap, a = t.bandSize, i = t.sizeList, o = i === void 0 ? [] : i, u = t.maxBarSize, c = o.length;
  if (c < 1)
    return null;
  var s = Re(r, a, 0, !0), f, l = [];
  if (o[0].barSize === +o[0].barSize) {
    var d = !1, h = a / c, y = o.reduce(function(O, p) {
      return O + p.barSize || 0;
    }, 0);
    y += (c - 1) * s, y >= a && (y -= (c - 1) * s, s = 0), y >= a && h > 0 && (d = !0, h *= 0.9, y = c * h);
    var g = (a - y) / 2 >> 0, v = {
      offset: g - s,
      size: 0
    };
    f = o.reduce(function(O, p) {
      var m = {
        item: p.item,
        position: {
          offset: v.offset + v.size + s,
          // @ts-expect-error the type check above does not check for type number explicitly
          size: d ? h : p.barSize
        }
      }, S = [].concat(Cf(O), [m]);
      return v = S[S.length - 1].position, p.stackList && p.stackList.length && p.stackList.forEach(function(A) {
        S.push({
          item: A,
          position: v
        });
      }), S;
    }, l);
  } else {
    var b = Re(n, a, 0, !0);
    a - 2 * b - (c - 1) * s <= 0 && (s = 0);
    var x = (a - 2 * b - (c - 1) * s) / c;
    x > 1 && (x >>= 0);
    var w = u === +u ? Math.min(x, u) : x;
    f = o.reduce(function(O, p, m) {
      var S = [].concat(Cf(O), [{
        item: p.item,
        position: {
          offset: b + (x + s) * m + (x - w) / 2,
          size: w
        }
      }]);
      return p.stackList && p.stackList.length && p.stackList.forEach(function(A) {
        S.push({
          item: A,
          position: S[S.length - 1].position
        });
      }), S;
    }, l);
  }
  return f;
}, VC = function(t, r, n, a) {
  var i = n.children, o = n.width, u = n.margin, c = o - (u.left || 0) - (u.right || 0), s = ov({
    children: i,
    legendWidth: c
  });
  if (s) {
    var f = a || {}, l = f.width, d = f.height, h = s.align, y = s.verticalAlign, g = s.layout;
    if ((g === "vertical" || g === "horizontal" && y === "middle") && h !== "center" && L(t[h]))
      return qe(qe({}, t), {}, fr({}, h, t[h] + (l || 0)));
    if ((g === "horizontal" || g === "vertical" && h === "center") && y !== "middle" && L(t[y]))
      return qe(qe({}, t), {}, fr({}, y, t[y] + (d || 0)));
  }
  return t;
}, YC = function(t, r, n) {
  return J(r) ? !0 : t === "horizontal" ? r === "yAxis" : t === "vertical" || n === "x" ? r === "xAxis" : n === "y" ? r === "yAxis" : !0;
}, uv = function(t, r, n, a, i) {
  var o = r.props.children, u = it(o, Bc).filter(function(s) {
    return YC(a, i, s.props.direction);
  });
  if (u && u.length) {
    var c = u.map(function(s) {
      return s.props.dataKey;
    });
    return t.reduce(function(s, f) {
      var l = De(f, n, 0), d = Array.isArray(l) ? [Ci(l), Ii(l)] : [l, l], h = c.reduce(function(y, g) {
        var v = De(f, g, 0), b = d[0] - Math.abs(Array.isArray(v) ? v[0] : v), x = d[1] + Math.abs(Array.isArray(v) ? v[1] : v);
        return [Math.min(b, y[0]), Math.max(x, y[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(h[0], s[0]), Math.max(h[1], s[1])];
    }, [1 / 0, -1 / 0]);
  }
  return null;
}, ZC = function(t, r, n, a, i) {
  var o = r.map(function(u) {
    return uv(t, u, n, i, a);
  }).filter(function(u) {
    return !J(u);
  });
  return o && o.length ? o.reduce(function(u, c) {
    return [Math.min(u[0], c[0]), Math.max(u[1], c[1])];
  }, [1 / 0, -1 / 0]) : null;
}, cv = function(t, r, n, a, i) {
  var o = r.map(function(c) {
    var s = c.props.dataKey;
    return n === "number" && s && uv(t, c, s, a) || tn(t, s, n, i);
  });
  if (n === "number")
    return o.reduce(
      // @ts-expect-error if (type === number) means that the domain is numerical type
      // - but this link is missing in the type definition
      function(c, s) {
        return [Math.min(c[0], s[0]), Math.max(c[1], s[1])];
      },
      [1 / 0, -1 / 0]
    );
  var u = {};
  return o.reduce(function(c, s) {
    for (var f = 0, l = s.length; f < l; f++)
      u[s[f]] || (u[s[f]] = !0, c.push(s[f]));
    return c;
  }, []);
}, sv = function(t, r) {
  return t === "horizontal" && r === "xAxis" || t === "vertical" && r === "yAxis" || t === "centric" && r === "angleAxis" || t === "radial" && r === "radiusAxis";
}, Jr = function(t, r, n) {
  if (!t)
    return null;
  var a = t.scale, i = t.duplicateDomain, o = t.type, u = t.range, c = t.realScaleType === "scaleBand" ? a.bandwidth() / 2 : 2, s = (r || n) && o === "category" && a.bandwidth ? a.bandwidth() / c : 0;
  if (s = t.axisType === "angleAxis" && (u == null ? void 0 : u.length) >= 2 ? Ke(u[0] - u[1]) * 2 * s : s, r && (t.ticks || t.niceTicks)) {
    var f = (t.ticks || t.niceTicks).map(function(l) {
      var d = i ? i.indexOf(l) : l;
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: a(d) + s,
        value: l,
        offset: s
      };
    });
    return f.filter(function(l) {
      return !Hn(l.coordinate);
    });
  }
  return t.isCategorical && t.categoricalDomain ? t.categoricalDomain.map(function(l, d) {
    return {
      coordinate: a(l) + s,
      value: l,
      index: d,
      offset: s
    };
  }) : a.ticks && !n ? a.ticks(t.tickCount).map(function(l) {
    return {
      coordinate: a(l) + s,
      value: l,
      offset: s
    };
  }) : a.domain().map(function(l, d) {
    return {
      coordinate: a(l) + s,
      value: i ? i[l] : l,
      index: d,
      offset: s
    };
  });
}, yo = /* @__PURE__ */ new WeakMap(), fa = function(t, r) {
  if (typeof r != "function")
    return t;
  yo.has(t) || yo.set(t, /* @__PURE__ */ new WeakMap());
  var n = yo.get(t);
  if (n.has(r))
    return n.get(r);
  var a = function() {
    t.apply(void 0, arguments), r.apply(void 0, arguments);
  };
  return n.set(r, a), a;
}, JC = function(t, r, n) {
  var a = t.scale, i = t.type, o = t.layout, u = t.axisType;
  if (a === "auto")
    return o === "radial" && u === "radiusAxis" ? {
      scale: yn(),
      realScaleType: "band"
    } : o === "radial" && u === "angleAxis" ? {
      scale: Ha(),
      realScaleType: "linear"
    } : i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !n) ? {
      scale: en(),
      realScaleType: "point"
    } : i === "category" ? {
      scale: yn(),
      realScaleType: "band"
    } : {
      scale: Ha(),
      realScaleType: "linear"
    };
  if (zn(a)) {
    var c = "scale".concat(mi(a));
    return {
      scale: ($f[c] || en)(),
      realScaleType: $f[c] ? c : "point"
    };
  }
  return Y(a) ? {
    scale: a
  } : {
    scale: en(),
    realScaleType: "point"
  };
}, kf = 1e-4, QC = function(t) {
  var r = t.domain();
  if (!(!r || r.length <= 2)) {
    var n = r.length, a = t.range(), i = Math.min(a[0], a[1]) - kf, o = Math.max(a[0], a[1]) + kf, u = t(r[0]), c = t(r[n - 1]);
    (u < i || u > o || c < i || c > o) && t.domain([r[0], r[n - 1]]);
  }
}, ek = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, a = t[0].length; n < a; ++n)
      for (var i = 0, o = 0, u = 0; u < r; ++u) {
        var c = Hn(t[u][n][1]) ? t[u][n][0] : t[u][n][1];
        c >= 0 ? (t[u][n][0] = i, t[u][n][1] = i + c, i = t[u][n][1]) : (t[u][n][0] = o, t[u][n][1] = o + c, o = t[u][n][1]);
      }
}, tk = function(t) {
  var r = t.length;
  if (!(r <= 0))
    for (var n = 0, a = t[0].length; n < a; ++n)
      for (var i = 0, o = 0; o < r; ++o) {
        var u = Hn(t[o][n][1]) ? t[o][n][0] : t[o][n][1];
        u >= 0 ? (t[o][n][0] = i, t[o][n][1] = i + u, i = t[o][n][1]) : (t[o][n][0] = 0, t[o][n][1] = 0);
      }
}, rk = {
  sign: ek,
  // @ts-expect-error definitelytyped types are incorrect
  expand: ox,
  // @ts-expect-error definitelytyped types are incorrect
  none: dr,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: ux,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: cx,
  positive: tk
}, nk = function(t, r, n) {
  var a = r.map(function(u) {
    return u.props.dataKey;
  }), i = rk[n], o = ix().keys(a).value(function(u, c) {
    return +De(u, c, 0);
  }).order(Ro).offset(i);
  return o(t);
}, ak = function(t, r, n, a, i, o) {
  if (!t)
    return null;
  var u = o ? r.reverse() : r, c = {}, s = u.reduce(function(l, d) {
    var h = d.props, y = h.stackId, g = h.hide;
    if (g)
      return l;
    var v = d.props[n], b = l[v] || {
      hasStack: !1,
      stackGroups: {}
    };
    if (we(y)) {
      var x = b.stackGroups[y] || {
        numericAxisId: n,
        cateAxisId: a,
        items: []
      };
      x.items.push(d), b.hasStack = !0, b.stackGroups[y] = x;
    } else
      b.stackGroups[yi("_stackId_")] = {
        numericAxisId: n,
        cateAxisId: a,
        items: [d]
      };
    return qe(qe({}, l), {}, fr({}, v, b));
  }, c), f = {};
  return Object.keys(s).reduce(function(l, d) {
    var h = s[d];
    if (h.hasStack) {
      var y = {};
      h.stackGroups = Object.keys(h.stackGroups).reduce(function(g, v) {
        var b = h.stackGroups[v];
        return qe(qe({}, g), {}, fr({}, v, {
          numericAxisId: n,
          cateAxisId: a,
          items: b.items,
          stackedData: nk(t, b.items, i)
        }));
      }, y);
    }
    return qe(qe({}, l), {}, fr({}, d, h));
  }, f);
}, ik = function(t, r) {
  var n = r.realScaleType, a = r.type, i = r.tickCount, o = r.originalDomain, u = r.allowDecimals, c = n || r.scale;
  if (c !== "auto" && c !== "linear")
    return null;
  if (i && a === "number" && o && (o[0] === "auto" || o[1] === "auto")) {
    var s = t.domain();
    if (!s.length)
      return null;
    var f = PC(s, i, u);
    return t.domain([Ci(f), Ii(f)]), {
      niceTicks: f
    };
  }
  if (i && a === "number") {
    var l = t.domain(), d = TC(l, i, u);
    return {
      niceTicks: d
    };
  }
  return null;
}, ok = function(t, r) {
  var n = t.props.stackId;
  if (we(n)) {
    var a = r[n];
    if (a) {
      var i = a.items.indexOf(t);
      return i >= 0 ? a.stackedData[i] : null;
    }
  }
  return null;
}, uk = function(t) {
  return t.reduce(function(r, n) {
    return [Ci(n.concat([r[0]]).filter(L)), Ii(n.concat([r[1]]).filter(L))];
  }, [1 / 0, -1 / 0]);
}, lv = function(t, r, n) {
  return Object.keys(t).reduce(function(a, i) {
    var o = t[i], u = o.stackedData, c = u.reduce(function(s, f) {
      var l = uk(f.slice(r, n + 1));
      return [Math.min(s[0], l[0]), Math.max(s[1], l[1])];
    }, [1 / 0, -1 / 0]);
    return [Math.min(c[0], a[0]), Math.max(c[1], a[1])];
  }, [1 / 0, -1 / 0]).map(function(a) {
    return a === 1 / 0 || a === -1 / 0 ? 0 : a;
  });
}, Nf = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Df = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, bu = function(t, r, n) {
  if (Y(t))
    return t(r, n);
  if (!Array.isArray(t))
    return r;
  var a = [];
  if (L(t[0]))
    a[0] = n ? t[0] : Math.min(t[0], r[0]);
  else if (Nf.test(t[0])) {
    var i = +Nf.exec(t[0])[1];
    a[0] = r[0] - i;
  } else
    Y(t[0]) ? a[0] = t[0](r[0]) : a[0] = r[0];
  if (L(t[1]))
    a[1] = n ? t[1] : Math.max(t[1], r[1]);
  else if (Df.test(t[1])) {
    var o = +Df.exec(t[1])[1];
    a[1] = r[1] + o;
  } else
    Y(t[1]) ? a[1] = t[1](r[1]) : a[1] = r[1];
  return a;
}, xu = function(t, r, n) {
  if (t && t.scale && t.scale.bandwidth) {
    var a = t.scale.bandwidth();
    if (!n || a > 0)
      return a;
  }
  if (t && r && r.length >= 2) {
    for (var i = lc(r, function(l) {
      return l.coordinate;
    }), o = 1 / 0, u = 1, c = i.length; u < c; u++) {
      var s = i[u], f = i[u - 1];
      o = Math.min((s.coordinate || 0) - (f.coordinate || 0), o);
    }
    return o === 1 / 0 ? 0 : o;
  }
  return n ? void 0 : 0;
}, Rf = function(t, r, n) {
  return !t || !t.length || Dc(t, Je(n, "type.defaultProps.domain")) ? r : t;
}, ck = function(t, r) {
  var n = t.props, a = n.dataKey, i = n.name, o = n.unit, u = n.formatter, c = n.tooltipType, s = n.chartType, f = n.hide;
  return qe(qe({}, X(t, !1)), {}, {
    dataKey: a,
    unit: o,
    formatter: u,
    name: i || a,
    color: Fc(t),
    value: De(r, a),
    type: c,
    payload: r,
    chartType: s,
    hide: f
  });
};
function _n(e) {
  "@babel/helpers - typeof";
  return _n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _n(e);
}
function Lf(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function dt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Lf(Object(r), !0).forEach(function(n) {
      fv(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Lf(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function fv(e, t, r) {
  return t = sk(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function sk(e) {
  var t = lk(e, "string");
  return _n(t) === "symbol" ? t : String(t);
}
function lk(e, t) {
  if (_n(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (_n(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function fk(e, t) {
  return vk(e) || pk(e, t) || hk(e, t) || dk();
}
function dk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function hk(e, t) {
  if (e) {
    if (typeof e == "string")
      return Bf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Bf(e, t);
  }
}
function Bf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function pk(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = !0, s = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r)
          return;
        c = !1;
      } else
        for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); c = !0)
          ;
    } catch (f) {
      s = !0, a = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o))
          return;
      } finally {
        if (s)
          throw a;
      }
    }
    return u;
  }
}
function vk(e) {
  if (Array.isArray(e))
    return e;
}
var Za = Math.PI / 180, yk = function(t) {
  return t * 180 / Math.PI;
}, ce = function(t, r, n, a) {
  return {
    x: t + Math.cos(-Za * a) * n,
    y: r + Math.sin(-Za * a) * n
  };
}, dv = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, gk = function(t, r, n, a, i) {
  var o = t.width, u = t.height, c = t.startAngle, s = t.endAngle, f = Re(t.cx, o, o / 2), l = Re(t.cy, u, u / 2), d = dv(o, u, n), h = Re(t.innerRadius, d, 0), y = Re(t.outerRadius, d, d * 0.8), g = Object.keys(r);
  return g.reduce(function(v, b) {
    var x = r[b], w = x.domain, O = x.reversed, p;
    if (J(x.range))
      a === "angleAxis" ? p = [c, s] : a === "radiusAxis" && (p = [h, y]), O && (p = [p[1], p[0]]);
    else {
      p = x.range;
      var m = p, S = fk(m, 2);
      c = S[0], s = S[1];
    }
    var A = JC(x, i), _ = A.realScaleType, M = A.scale;
    M.domain(w).range(p), QC(M);
    var T = ik(M, dt(dt({}, x), {}, {
      realScaleType: _
    })), E = dt(dt(dt({}, x), T), {}, {
      range: p,
      radius: y,
      realScaleType: _,
      scale: M,
      cx: f,
      cy: l,
      innerRadius: h,
      outerRadius: y,
      startAngle: c,
      endAngle: s
    });
    return dt(dt({}, v), {}, fv({}, b, E));
  }, {});
}, mk = function(t, r) {
  var n = t.x, a = t.y, i = r.x, o = r.y;
  return Math.sqrt(Math.pow(n - i, 2) + Math.pow(a - o, 2));
}, bk = function(t, r) {
  var n = t.x, a = t.y, i = r.cx, o = r.cy, u = mk({
    x: n,
    y: a
  }, {
    x: i,
    y: o
  });
  if (u <= 0)
    return {
      radius: u
    };
  var c = (n - i) / u, s = Math.acos(c);
  return a > o && (s = 2 * Math.PI - s), {
    radius: u,
    angle: yk(s),
    angleInRadian: s
  };
}, xk = function(t) {
  var r = t.startAngle, n = t.endAngle, a = Math.floor(r / 360), i = Math.floor(n / 360), o = Math.min(a, i);
  return {
    startAngle: r - o * 360,
    endAngle: n - o * 360
  };
}, wk = function(t, r) {
  var n = r.startAngle, a = r.endAngle, i = Math.floor(n / 360), o = Math.floor(a / 360), u = Math.min(i, o);
  return t + u * 360;
}, Ff = function(t, r) {
  var n = t.x, a = t.y, i = bk({
    x: n,
    y: a
  }, r), o = i.radius, u = i.angle, c = r.innerRadius, s = r.outerRadius;
  if (o < c || o > s)
    return !1;
  if (o === 0)
    return !0;
  var f = xk(r), l = f.startAngle, d = f.endAngle, h = u, y;
  if (l <= d) {
    for (; h > d; )
      h -= 360;
    for (; h < l; )
      h += 360;
    y = h >= l && h <= d;
  } else {
    for (; h > l; )
      h -= 360;
    for (; h < d; )
      h += 360;
    y = h >= d && h <= l;
  }
  return y ? dt(dt({}, r), {}, {
    radius: o,
    angle: wk(h, r)
  }) : null;
};
function $n(e) {
  "@babel/helpers - typeof";
  return $n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, $n(e);
}
var Ok = ["offset"];
function Sk(e) {
  return Pk(e) || $k(e) || _k(e) || Ak();
}
function Ak() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _k(e, t) {
  if (e) {
    if (typeof e == "string")
      return wu(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return wu(e, t);
  }
}
function $k(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function Pk(e) {
  if (Array.isArray(e))
    return wu(e);
}
function wu(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function Tk(e, t) {
  if (e == null)
    return {};
  var r = Ek(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Ek(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function Uf(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Uf(Object(r), !0).forEach(function(n) {
      Mk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Uf(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Mk(e, t, r) {
  return t = jk(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function jk(e) {
  var t = Ik(e, "string");
  return $n(t) === "symbol" ? t : String(t);
}
function Ik(e, t) {
  if ($n(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if ($n(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Pn() {
  return Pn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Pn.apply(this, arguments);
}
var Ck = function(t) {
  var r = t.value, n = t.formatter, a = J(t.children) ? r : t.children;
  return Y(n) ? n(a) : a;
}, kk = function(t, r) {
  var n = Ke(r - t), a = Math.min(Math.abs(r - t), 360);
  return n * a;
}, Nk = function(t, r, n) {
  var a = t.position, i = t.viewBox, o = t.offset, u = t.className, c = i, s = c.cx, f = c.cy, l = c.innerRadius, d = c.outerRadius, h = c.startAngle, y = c.endAngle, g = c.clockWise, v = (l + d) / 2, b = kk(h, y), x = b >= 0 ? 1 : -1, w, O;
  a === "insideStart" ? (w = h + x * o, O = g) : a === "insideEnd" ? (w = y - x * o, O = !g) : a === "end" && (w = y + x * o, O = g), O = b <= 0 ? O : !O;
  var p = ce(s, f, v, w), m = ce(s, f, v, w + (O ? 1 : -1) * 359), S = "M".concat(p.x, ",").concat(p.y, `
    A`).concat(v, ",").concat(v, ",0,1,").concat(O ? 0 : 1, `,
    `).concat(m.x, ",").concat(m.y), A = J(t.id) ? yi("recharts-radial-line-") : t.id;
  return /* @__PURE__ */ $.createElement("text", Pn({}, n, {
    dominantBaseline: "central",
    className: ve("recharts-radial-bar-label", u)
  }), /* @__PURE__ */ $.createElement("defs", null, /* @__PURE__ */ $.createElement("path", {
    id: A,
    d: S
  })), /* @__PURE__ */ $.createElement("textPath", {
    xlinkHref: "#".concat(A)
  }, r));
}, Dk = function(t) {
  var r = t.viewBox, n = t.offset, a = t.position, i = r, o = i.cx, u = i.cy, c = i.innerRadius, s = i.outerRadius, f = i.startAngle, l = i.endAngle, d = (f + l) / 2;
  if (a === "outside") {
    var h = ce(o, u, s + n, d), y = h.x, g = h.y;
    return {
      x: y,
      y: g,
      textAnchor: y >= o ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (a === "center")
    return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  if (a === "centerTop")
    return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  if (a === "centerBottom")
    return {
      x: o,
      y: u,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  var v = (c + s) / 2, b = ce(o, u, v, d), x = b.x, w = b.y;
  return {
    x,
    y: w,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, Rk = function(t) {
  var r = t.viewBox, n = t.parentViewBox, a = t.offset, i = t.position, o = r, u = o.x, c = o.y, s = o.width, f = o.height, l = f >= 0 ? 1 : -1, d = l * a, h = l > 0 ? "end" : "start", y = l > 0 ? "start" : "end", g = s >= 0 ? 1 : -1, v = g * a, b = g > 0 ? "end" : "start", x = g > 0 ? "start" : "end";
  if (i === "top") {
    var w = {
      x: u + s / 2,
      y: c - l * a,
      textAnchor: "middle",
      verticalAnchor: h
    };
    return xe(xe({}, w), n ? {
      height: Math.max(c - n.y, 0),
      width: s
    } : {});
  }
  if (i === "bottom") {
    var O = {
      x: u + s / 2,
      y: c + f + d,
      textAnchor: "middle",
      verticalAnchor: y
    };
    return xe(xe({}, O), n ? {
      height: Math.max(n.y + n.height - (c + f), 0),
      width: s
    } : {});
  }
  if (i === "left") {
    var p = {
      x: u - v,
      y: c + f / 2,
      textAnchor: b,
      verticalAnchor: "middle"
    };
    return xe(xe({}, p), n ? {
      width: Math.max(p.x - n.x, 0),
      height: f
    } : {});
  }
  if (i === "right") {
    var m = {
      x: u + s + v,
      y: c + f / 2,
      textAnchor: x,
      verticalAnchor: "middle"
    };
    return xe(xe({}, m), n ? {
      width: Math.max(n.x + n.width - m.x, 0),
      height: f
    } : {});
  }
  var S = n ? {
    width: s,
    height: f
  } : {};
  return i === "insideLeft" ? xe({
    x: u + v,
    y: c + f / 2,
    textAnchor: x,
    verticalAnchor: "middle"
  }, S) : i === "insideRight" ? xe({
    x: u + s - v,
    y: c + f / 2,
    textAnchor: b,
    verticalAnchor: "middle"
  }, S) : i === "insideTop" ? xe({
    x: u + s / 2,
    y: c + d,
    textAnchor: "middle",
    verticalAnchor: y
  }, S) : i === "insideBottom" ? xe({
    x: u + s / 2,
    y: c + f - d,
    textAnchor: "middle",
    verticalAnchor: h
  }, S) : i === "insideTopLeft" ? xe({
    x: u + v,
    y: c + d,
    textAnchor: x,
    verticalAnchor: y
  }, S) : i === "insideTopRight" ? xe({
    x: u + s - v,
    y: c + d,
    textAnchor: b,
    verticalAnchor: y
  }, S) : i === "insideBottomLeft" ? xe({
    x: u + v,
    y: c + f - d,
    textAnchor: x,
    verticalAnchor: h
  }, S) : i === "insideBottomRight" ? xe({
    x: u + s - v,
    y: c + f - d,
    textAnchor: b,
    verticalAnchor: h
  }, S) : jr(i) && (L(i.x) || Ht(i.x)) && (L(i.y) || Ht(i.y)) ? xe({
    x: u + Re(i.x, s),
    y: c + Re(i.y, f),
    textAnchor: "end",
    verticalAnchor: "end"
  }, S) : xe({
    x: u + s / 2,
    y: c + f / 2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  }, S);
}, Lk = function(t) {
  return "cx" in t && L(t.cx);
};
function $e(e) {
  var t = e.offset, r = t === void 0 ? 5 : t, n = Tk(e, Ok), a = xe({
    offset: r
  }, n), i = a.viewBox, o = a.position, u = a.value, c = a.children, s = a.content, f = a.className, l = f === void 0 ? "" : f, d = a.textBreakAll;
  if (!i || J(u) && J(c) && !/* @__PURE__ */ at(s) && !Y(s))
    return null;
  if (/* @__PURE__ */ at(s))
    return /* @__PURE__ */ ge(s, a);
  var h;
  if (Y(s)) {
    if (h = /* @__PURE__ */ zd(s, a), /* @__PURE__ */ at(h))
      return h;
  } else
    h = Ck(a);
  var y = Lk(i), g = X(a, !0);
  if (y && (o === "insideStart" || o === "insideEnd" || o === "end"))
    return Nk(a, h, g);
  var v = y ? Dk(a) : Rk(a);
  return /* @__PURE__ */ $.createElement(br, Pn({
    className: ve("recharts-label", l)
  }, g, v, {
    breakAll: d
  }), h);
}
$e.displayName = "Label";
var hv = function(t) {
  var r = t.cx, n = t.cy, a = t.angle, i = t.startAngle, o = t.endAngle, u = t.r, c = t.radius, s = t.innerRadius, f = t.outerRadius, l = t.x, d = t.y, h = t.top, y = t.left, g = t.width, v = t.height, b = t.clockWise, x = t.labelViewBox;
  if (x)
    return x;
  if (L(g) && L(v)) {
    if (L(l) && L(d))
      return {
        x: l,
        y: d,
        width: g,
        height: v
      };
    if (L(h) && L(y))
      return {
        x: h,
        y,
        width: g,
        height: v
      };
  }
  return L(l) && L(d) ? {
    x: l,
    y: d,
    width: 0,
    height: 0
  } : L(r) && L(n) ? {
    cx: r,
    cy: n,
    startAngle: i || a || 0,
    endAngle: o || a || 0,
    innerRadius: s || 0,
    outerRadius: f || c || u || 0,
    clockWise: b
  } : t.viewBox ? t.viewBox : {};
}, Bk = function(t, r) {
  return t ? t === !0 ? /* @__PURE__ */ $.createElement($e, {
    key: "label-implicit",
    viewBox: r
  }) : we(t) ? /* @__PURE__ */ $.createElement($e, {
    key: "label-implicit",
    viewBox: r,
    value: t
  }) : /* @__PURE__ */ at(t) ? t.type === $e ? /* @__PURE__ */ ge(t, {
    key: "label-implicit",
    viewBox: r
  }) : /* @__PURE__ */ $.createElement($e, {
    key: "label-implicit",
    content: t,
    viewBox: r
  }) : Y(t) ? /* @__PURE__ */ $.createElement($e, {
    key: "label-implicit",
    content: t,
    viewBox: r
  }) : jr(t) ? /* @__PURE__ */ $.createElement($e, Pn({
    viewBox: r
  }, t, {
    key: "label-implicit"
  })) : null : null;
}, Fk = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!t || !t.children && n && !t.label)
    return null;
  var a = t.children, i = hv(t), o = it(a, $e).map(function(c, s) {
    return /* @__PURE__ */ ge(c, {
      viewBox: r || i,
      // eslint-disable-next-line react/no-array-index-key
      key: "label-".concat(s)
    });
  });
  if (!n)
    return o;
  var u = Bk(t.label, r || i);
  return [u].concat(Sk(o));
};
$e.parseViewBox = hv;
$e.renderCallByParent = Fk;
function Uk(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
var Wk = Uk;
const qk = /* @__PURE__ */ ie(Wk);
function Tn(e) {
  "@babel/helpers - typeof";
  return Tn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Tn(e);
}
var zk = ["valueAccessor"], Hk = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function Kk(e) {
  return Yk(e) || Vk(e) || Xk(e) || Gk();
}
function Gk() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Xk(e, t) {
  if (e) {
    if (typeof e == "string")
      return Ou(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Ou(e, t);
  }
}
function Vk(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function Yk(e) {
  if (Array.isArray(e))
    return Ou(e);
}
function Ou(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function Ja() {
  return Ja = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ja.apply(this, arguments);
}
function Wf(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wf(Object(r), !0).forEach(function(n) {
      Zk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Wf(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Zk(e, t, r) {
  return t = Jk(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Jk(e) {
  var t = Qk(e, "string");
  return Tn(t) === "symbol" ? t : String(t);
}
function Qk(e, t) {
  if (Tn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Tn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function zf(e, t) {
  if (e == null)
    return {};
  var r = e2(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function e2(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
var t2 = function(t) {
  return Array.isArray(t.value) ? qk(t.value) : t.value;
};
function Jt(e) {
  var t = e.valueAccessor, r = t === void 0 ? t2 : t, n = zf(e, zk), a = n.data, i = n.dataKey, o = n.clockWise, u = n.id, c = n.textBreakAll, s = zf(n, Hk);
  return !a || !a.length ? null : /* @__PURE__ */ $.createElement(ye, {
    className: "recharts-label-list"
  }, a.map(function(f, l) {
    var d = J(i) ? r(f, l) : De(f && f.payload, i), h = J(u) ? {} : {
      id: "".concat(u, "-").concat(l)
    };
    return /* @__PURE__ */ $.createElement($e, Ja({}, X(f, !0), s, h, {
      parentViewBox: f.parentViewBox,
      value: d,
      textBreakAll: c,
      viewBox: $e.parseViewBox(J(o) ? f : qf(qf({}, f), {}, {
        clockWise: o
      })),
      key: "label-".concat(l),
      index: l
    }));
  }));
}
Jt.displayName = "LabelList";
function r2(e, t) {
  return e ? e === !0 ? /* @__PURE__ */ $.createElement(Jt, {
    key: "labelList-implicit",
    data: t
  }) : /* @__PURE__ */ $.isValidElement(e) || Y(e) ? /* @__PURE__ */ $.createElement(Jt, {
    key: "labelList-implicit",
    data: t,
    content: e
  }) : jr(e) ? /* @__PURE__ */ $.createElement(Jt, Ja({
    data: t
  }, e, {
    key: "labelList-implicit"
  })) : null : null;
}
function n2(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (!e || !e.children && r && !e.label)
    return null;
  var n = e.children, a = it(n, Jt).map(function(o, u) {
    return /* @__PURE__ */ ge(o, {
      data: t,
      // eslint-disable-next-line react/no-array-index-key
      key: "labelList-".concat(u)
    });
  });
  if (!r)
    return a;
  var i = r2(e.label, t);
  return [i].concat(Kk(a));
}
Jt.renderCallByParent = n2;
function En(e) {
  "@babel/helpers - typeof";
  return En = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, En(e);
}
function Su() {
  return Su = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Su.apply(this, arguments);
}
function Hf(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Kf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hf(Object(r), !0).forEach(function(n) {
      a2(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hf(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function a2(e, t, r) {
  return t = i2(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function i2(e) {
  var t = o2(e, "string");
  return En(t) === "symbol" ? t : String(t);
}
function o2(e, t) {
  if (En(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (En(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var u2 = function(t, r) {
  var n = Ke(r - t), a = Math.min(Math.abs(r - t), 359.999);
  return n * a;
}, da = function(t) {
  var r = t.cx, n = t.cy, a = t.radius, i = t.angle, o = t.sign, u = t.isExternal, c = t.cornerRadius, s = t.cornerIsExternal, f = c * (u ? 1 : -1) + a, l = Math.asin(c / f) / Za, d = s ? i : i + o * l, h = ce(r, n, f, d), y = ce(r, n, a, d), g = s ? i - o * l : i, v = ce(r, n, f * Math.cos(l * Za), g);
  return {
    center: h,
    circleTangency: y,
    lineTangency: v,
    theta: l
  };
}, pv = function(t) {
  var r = t.cx, n = t.cy, a = t.innerRadius, i = t.outerRadius, o = t.startAngle, u = t.endAngle, c = u2(o, u), s = o + c, f = ce(r, n, i, o), l = ce(r, n, i, s), d = "M ".concat(f.x, ",").concat(f.y, `
    A `).concat(i, ",").concat(i, `,0,
    `).concat(+(Math.abs(c) > 180), ",").concat(+(o > s), `,
    `).concat(l.x, ",").concat(l.y, `
  `);
  if (a > 0) {
    var h = ce(r, n, a, o), y = ce(r, n, a, s);
    d += "L ".concat(y.x, ",").concat(y.y, `
            A `).concat(a, ",").concat(a, `,0,
            `).concat(+(Math.abs(c) > 180), ",").concat(+(o <= s), `,
            `).concat(h.x, ",").concat(h.y, " Z");
  } else
    d += "L ".concat(r, ",").concat(n, " Z");
  return d;
}, c2 = function(t) {
  var r = t.cx, n = t.cy, a = t.innerRadius, i = t.outerRadius, o = t.cornerRadius, u = t.forceCornerRadius, c = t.cornerIsExternal, s = t.startAngle, f = t.endAngle, l = Ke(f - s), d = da({
    cx: r,
    cy: n,
    radius: i,
    angle: s,
    sign: l,
    cornerRadius: o,
    cornerIsExternal: c
  }), h = d.circleTangency, y = d.lineTangency, g = d.theta, v = da({
    cx: r,
    cy: n,
    radius: i,
    angle: f,
    sign: -l,
    cornerRadius: o,
    cornerIsExternal: c
  }), b = v.circleTangency, x = v.lineTangency, w = v.theta, O = c ? Math.abs(s - f) : Math.abs(s - f) - g - w;
  if (O < 0)
    return u ? "M ".concat(y.x, ",").concat(y.y, `
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(o * 2, `,0
        a`).concat(o, ",").concat(o, ",0,0,1,").concat(-o * 2, `,0
      `) : pv({
      cx: r,
      cy: n,
      innerRadius: a,
      outerRadius: i,
      startAngle: s,
      endAngle: f
    });
  var p = "M ".concat(y.x, ",").concat(y.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(h.x, ",").concat(h.y, `
    A`).concat(i, ",").concat(i, ",0,").concat(+(O > 180), ",").concat(+(l < 0), ",").concat(b.x, ",").concat(b.y, `
    A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(x.x, ",").concat(x.y, `
  `);
  if (a > 0) {
    var m = da({
      cx: r,
      cy: n,
      radius: a,
      angle: s,
      sign: l,
      isExternal: !0,
      cornerRadius: o,
      cornerIsExternal: c
    }), S = m.circleTangency, A = m.lineTangency, _ = m.theta, M = da({
      cx: r,
      cy: n,
      radius: a,
      angle: f,
      sign: -l,
      isExternal: !0,
      cornerRadius: o,
      cornerIsExternal: c
    }), T = M.circleTangency, E = M.lineTangency, k = M.theta, j = c ? Math.abs(s - f) : Math.abs(s - f) - _ - k;
    if (j < 0 && o === 0)
      return "".concat(p, "L").concat(r, ",").concat(n, "Z");
    p += "L".concat(E.x, ",").concat(E.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(T.x, ",").concat(T.y, `
      A`).concat(a, ",").concat(a, ",0,").concat(+(j > 180), ",").concat(+(l > 0), ",").concat(S.x, ",").concat(S.y, `
      A`).concat(o, ",").concat(o, ",0,0,").concat(+(l < 0), ",").concat(A.x, ",").concat(A.y, "Z");
  } else
    p += "L".concat(r, ",").concat(n, "Z");
  return p;
}, s2 = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, vv = function(t) {
  var r = Kf(Kf({}, s2), t), n = r.cx, a = r.cy, i = r.innerRadius, o = r.outerRadius, u = r.cornerRadius, c = r.forceCornerRadius, s = r.cornerIsExternal, f = r.startAngle, l = r.endAngle, d = r.className;
  if (o < i || f === l)
    return null;
  var h = ve("recharts-sector", d), y = o - i, g = Re(u, y, 0, !0), v;
  return g > 0 && Math.abs(f - l) < 360 ? v = c2({
    cx: n,
    cy: a,
    innerRadius: i,
    outerRadius: o,
    cornerRadius: Math.min(g, y / 2),
    forceCornerRadius: c,
    cornerIsExternal: s,
    startAngle: f,
    endAngle: l
  }) : v = pv({
    cx: n,
    cy: a,
    innerRadius: i,
    outerRadius: o,
    startAngle: f,
    endAngle: l
  }), /* @__PURE__ */ $.createElement("path", Su({}, X(r, !0), {
    className: h,
    d: v,
    role: "img"
  }));
};
function Mn(e) {
  "@babel/helpers - typeof";
  return Mn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Mn(e);
}
function Au() {
  return Au = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Au.apply(this, arguments);
}
function Gf(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Xf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Gf(Object(r), !0).forEach(function(n) {
      l2(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Gf(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function l2(e, t, r) {
  return t = f2(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function f2(e) {
  var t = d2(e, "string");
  return Mn(t) === "symbol" ? t : String(t);
}
function d2(e, t) {
  if (Mn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Mn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Vf = {
  curveBasisClosed: X0,
  curveBasisOpen: V0,
  curveBasis: G0,
  curveBumpX: C0,
  curveBumpY: k0,
  curveLinearClosed: Y0,
  curveLinear: xi,
  curveMonotoneX: Z0,
  curveMonotoneY: J0,
  curveNatural: Q0,
  curveStep: ex,
  curveStepAfter: rx,
  curveStepBefore: tx
}, ha = function(t) {
  return t.x === +t.x && t.y === +t.y;
}, Vr = function(t) {
  return t.x;
}, Yr = function(t) {
  return t.y;
}, h2 = function(t, r) {
  if (Y(t))
    return t;
  var n = "curve".concat(mi(t));
  return (n === "curveMonotone" || n === "curveBump") && r ? Vf["".concat(n).concat(r === "vertical" ? "Y" : "X")] : Vf[n] || xi;
}, p2 = function(t) {
  var r = t.type, n = r === void 0 ? "linear" : r, a = t.points, i = a === void 0 ? [] : a, o = t.baseLine, u = t.layout, c = t.connectNulls, s = c === void 0 ? !1 : c, f = h2(n, u), l = s ? i.filter(function(g) {
    return ha(g);
  }) : i, d;
  if (Array.isArray(o)) {
    var h = s ? o.filter(function(g) {
      return ha(g);
    }) : o, y = l.map(function(g, v) {
      return Xf(Xf({}, g), {}, {
        base: h[v]
      });
    });
    return u === "vertical" ? d = ra().y(Yr).x1(Vr).x0(function(g) {
      return g.base.x;
    }) : d = ra().x(Vr).y1(Yr).y0(function(g) {
      return g.base.y;
    }), d.defined(ha).curve(f), d(y);
  }
  return u === "vertical" && L(o) ? d = ra().y(Yr).x1(Vr).x0(o) : L(o) ? d = ra().x(Vr).y1(Yr).y0(o) : d = ph().x(Vr).y(Yr), d.defined(ha).curve(f), d(l);
}, _u = function(t) {
  var r = t.className, n = t.points, a = t.path, i = t.pathRef;
  if ((!n || !n.length) && !a)
    return null;
  var o = n && n.length ? p2(t) : a;
  return /* @__PURE__ */ $.createElement("path", Au({}, X(t, !1), xa(t), {
    className: ve("recharts-curve", r),
    d: o,
    ref: i
  }));
};
function jn(e) {
  "@babel/helpers - typeof";
  return jn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, jn(e);
}
function Qa() {
  return Qa = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Qa.apply(this, arguments);
}
function v2(e, t) {
  return b2(e) || m2(e, t) || g2(e, t) || y2();
}
function y2() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function g2(e, t) {
  if (e) {
    if (typeof e == "string")
      return Yf(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Yf(e, t);
  }
}
function Yf(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function m2(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = !0, s = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r)
          return;
        c = !1;
      } else
        for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); c = !0)
          ;
    } catch (f) {
      s = !0, a = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o))
          return;
      } finally {
        if (s)
          throw a;
      }
    }
    return u;
  }
}
function b2(e) {
  if (Array.isArray(e))
    return e;
}
function Zf(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Jf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zf(Object(r), !0).forEach(function(n) {
      x2(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Zf(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function x2(e, t, r) {
  return t = w2(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function w2(e) {
  var t = O2(e, "string");
  return jn(t) === "symbol" ? t : String(t);
}
function O2(e, t) {
  if (jn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (jn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Qf = function(t, r, n, a, i) {
  var o = Math.min(Math.abs(n) / 2, Math.abs(a) / 2), u = a >= 0 ? 1 : -1, c = n >= 0 ? 1 : -1, s = a >= 0 && n >= 0 || a < 0 && n < 0 ? 1 : 0, f;
  if (o > 0 && i instanceof Array) {
    for (var l = [0, 0, 0, 0], d = 0, h = 4; d < h; d++)
      l[d] = i[d] > o ? o : i[d];
    f = "M".concat(t, ",").concat(r + u * l[0]), l[0] > 0 && (f += "A ".concat(l[0], ",").concat(l[0], ",0,0,").concat(s, ",").concat(t + c * l[0], ",").concat(r)), f += "L ".concat(t + n - c * l[1], ",").concat(r), l[1] > 0 && (f += "A ".concat(l[1], ",").concat(l[1], ",0,0,").concat(s, `,
        `).concat(t + n, ",").concat(r + u * l[1])), f += "L ".concat(t + n, ",").concat(r + a - u * l[2]), l[2] > 0 && (f += "A ".concat(l[2], ",").concat(l[2], ",0,0,").concat(s, `,
        `).concat(t + n - c * l[2], ",").concat(r + a)), f += "L ".concat(t + c * l[3], ",").concat(r + a), l[3] > 0 && (f += "A ".concat(l[3], ",").concat(l[3], ",0,0,").concat(s, `,
        `).concat(t, ",").concat(r + a - u * l[3])), f += "Z";
  } else if (o > 0 && i === +i && i > 0) {
    var y = Math.min(o, i);
    f = "M ".concat(t, ",").concat(r + u * y, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(s, ",").concat(t + c * y, ",").concat(r, `
            L `).concat(t + n - c * y, ",").concat(r, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(s, ",").concat(t + n, ",").concat(r + u * y, `
            L `).concat(t + n, ",").concat(r + a - u * y, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(s, ",").concat(t + n - c * y, ",").concat(r + a, `
            L `).concat(t + c * y, ",").concat(r + a, `
            A `).concat(y, ",").concat(y, ",0,0,").concat(s, ",").concat(t, ",").concat(r + a - u * y, " Z");
  } else
    f = "M ".concat(t, ",").concat(r, " h ").concat(n, " v ").concat(a, " h ").concat(-n, " Z");
  return f;
}, S2 = function(t, r) {
  if (!t || !r)
    return !1;
  var n = t.x, a = t.y, i = r.x, o = r.y, u = r.width, c = r.height;
  if (Math.abs(u) > 0 && Math.abs(c) > 0) {
    var s = Math.min(i, i + u), f = Math.max(i, i + u), l = Math.min(o, o + c), d = Math.max(o, o + c);
    return n >= s && n <= f && a >= l && a <= d;
  }
  return !1;
}, A2 = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0,
  isAnimationActive: !1,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, Uc = function(t) {
  var r = Jf(Jf({}, A2), t), n = ba(), a = Uu(-1), i = v2(a, 2), o = i[0], u = i[1];
  Wu(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var O = n.current.getTotalLength();
        O && u(O);
      } catch {
      }
  }, []);
  var c = r.x, s = r.y, f = r.width, l = r.height, d = r.radius, h = r.className, y = r.animationEasing, g = r.animationDuration, v = r.animationBegin, b = r.isAnimationActive, x = r.isUpdateAnimationActive;
  if (c !== +c || s !== +s || f !== +f || l !== +l || f === 0 || l === 0)
    return null;
  var w = ve("recharts-rectangle", h);
  return x ? /* @__PURE__ */ $.createElement(Mt, {
    canBegin: o > 0,
    from: {
      width: f,
      height: l,
      x: c,
      y: s
    },
    to: {
      width: f,
      height: l,
      x: c,
      y: s
    },
    duration: g,
    animationEasing: y,
    isActive: x
  }, function(O) {
    var p = O.width, m = O.height, S = O.x, A = O.y;
    return /* @__PURE__ */ $.createElement(Mt, {
      canBegin: o > 0,
      from: "0px ".concat(o === -1 ? 1 : o, "px"),
      to: "".concat(o, "px 0px"),
      attributeName: "strokeDasharray",
      begin: v,
      duration: g,
      isActive: b,
      easing: y
    }, /* @__PURE__ */ $.createElement("path", Qa({}, X(r, !0), {
      className: w,
      d: Qf(S, A, p, m, d),
      ref: n
    })));
  }) : /* @__PURE__ */ $.createElement("path", Qa({}, X(r, !0), {
    className: w,
    d: Qf(c, s, f, l, d)
  }));
}, _2 = ["points", "className", "baseLinePoints", "connectNulls"];
function cr() {
  return cr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, cr.apply(this, arguments);
}
function $2(e, t) {
  if (e == null)
    return {};
  var r = P2(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function P2(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function ed(e) {
  return j2(e) || M2(e) || E2(e) || T2();
}
function T2() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function E2(e, t) {
  if (e) {
    if (typeof e == "string")
      return $u(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return $u(e, t);
  }
}
function M2(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function j2(e) {
  if (Array.isArray(e))
    return $u(e);
}
function $u(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
var td = function(t) {
  return t && t.x === +t.x && t.y === +t.y;
}, I2 = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r = [[]];
  return t.forEach(function(n) {
    td(n) ? r[r.length - 1].push(n) : r[r.length - 1].length > 0 && r.push([]);
  }), td(t[0]) && r[r.length - 1].push(t[0]), r[r.length - 1].length <= 0 && (r = r.slice(0, -1)), r;
}, rn = function(t, r) {
  var n = I2(t);
  r && (n = [n.reduce(function(i, o) {
    return [].concat(ed(i), ed(o));
  }, [])]);
  var a = n.map(function(i) {
    return i.reduce(function(o, u, c) {
      return "".concat(o).concat(c === 0 ? "M" : "L").concat(u.x, ",").concat(u.y);
    }, "");
  }).join("");
  return n.length === 1 ? "".concat(a, "Z") : a;
}, C2 = function(t, r, n) {
  var a = rn(t, n);
  return "".concat(a.slice(-1) === "Z" ? a.slice(0, -1) : a, "L").concat(rn(r.reverse(), n).slice(1));
}, k2 = function(t) {
  var r = t.points, n = t.className, a = t.baseLinePoints, i = t.connectNulls, o = $2(t, _2);
  if (!r || !r.length)
    return null;
  var u = ve("recharts-polygon", n);
  if (a && a.length) {
    var c = o.stroke && o.stroke !== "none", s = C2(r, a, i);
    return /* @__PURE__ */ $.createElement("g", {
      className: u
    }, /* @__PURE__ */ $.createElement("path", cr({}, X(o, !0), {
      fill: s.slice(-1) === "Z" ? o.fill : "none",
      stroke: "none",
      d: s
    })), c ? /* @__PURE__ */ $.createElement("path", cr({}, X(o, !0), {
      fill: "none",
      d: rn(r, i)
    })) : null, c ? /* @__PURE__ */ $.createElement("path", cr({}, X(o, !0), {
      fill: "none",
      d: rn(a, i)
    })) : null);
  }
  var f = rn(r, i);
  return /* @__PURE__ */ $.createElement("path", cr({}, X(o, !0), {
    fill: f.slice(-1) === "Z" ? o.fill : "none",
    className: u,
    d: f
  }));
};
function Pu() {
  return Pu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Pu.apply(this, arguments);
}
var Wc = function(t) {
  var r = t.cx, n = t.cy, a = t.r, i = t.className, o = ve("recharts-dot", i);
  return r === +r && n === +n && a === +a ? /* @__PURE__ */ $.createElement("circle", Pu({}, X(t, !1), xa(t), {
    className: o,
    cx: r,
    cy: n,
    r: a
  })) : null;
};
function In(e) {
  "@babel/helpers - typeof";
  return In = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, In(e);
}
var N2 = ["x", "y", "top", "left", "width", "height", "className"];
function Tu() {
  return Tu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Tu.apply(this, arguments);
}
function rd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function D2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rd(Object(r), !0).forEach(function(n) {
      R2(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function R2(e, t, r) {
  return t = L2(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function L2(e) {
  var t = B2(e, "string");
  return In(t) === "symbol" ? t : String(t);
}
function B2(e, t) {
  if (In(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (In(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function F2(e, t) {
  if (e == null)
    return {};
  var r = U2(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function U2(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
var W2 = function(t, r, n, a, i, o) {
  return "M".concat(t, ",").concat(i, "v").concat(a, "M").concat(o, ",").concat(r, "h").concat(n);
}, q2 = function(t) {
  var r = t.x, n = r === void 0 ? 0 : r, a = t.y, i = a === void 0 ? 0 : a, o = t.top, u = o === void 0 ? 0 : o, c = t.left, s = c === void 0 ? 0 : c, f = t.width, l = f === void 0 ? 0 : f, d = t.height, h = d === void 0 ? 0 : d, y = t.className, g = F2(t, N2), v = D2({
    x: n,
    y: i,
    top: u,
    left: s,
    width: l,
    height: h
  }, g);
  return !L(n) || !L(i) || !L(l) || !L(h) || !L(u) || !L(s) ? null : /* @__PURE__ */ $.createElement("path", Tu({}, X(v, !0), {
    className: ve("recharts-cross", y),
    d: W2(n, i, l, h, u, s)
  }));
}, z2 = ji, H2 = Kp, K2 = lt;
function G2(e, t) {
  return e && e.length ? z2(e, K2(t), H2) : void 0;
}
var X2 = G2;
const V2 = /* @__PURE__ */ ie(X2);
var Y2 = ji, Z2 = lt, J2 = Gp;
function Q2(e, t) {
  return e && e.length ? Y2(e, Z2(t), J2) : void 0;
}
var eN = Q2;
const tN = /* @__PURE__ */ ie(eN);
var rN = ["cx", "cy", "angle", "ticks", "axisLine"], nN = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
function Sr(e) {
  "@babel/helpers - typeof";
  return Sr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Sr(e);
}
function nn() {
  return nn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, nn.apply(this, arguments);
}
function nd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Bt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nd(Object(r), !0).forEach(function(n) {
      Di(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : nd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ad(e, t) {
  if (e == null)
    return {};
  var r = aN(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function aN(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function iN(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function id(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, yv(n.key), n);
  }
}
function oN(e, t, r) {
  return t && id(e.prototype, t), r && id(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function uN(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Eu(e, t);
}
function Eu(e, t) {
  return Eu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Eu(e, t);
}
function cN(e) {
  var t = fN();
  return function() {
    var n = ei(e), a;
    if (t) {
      var i = ei(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return sN(this, a);
  };
}
function sN(e, t) {
  if (t && (Sr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return lN(e);
}
function lN(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function fN() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function ei(e) {
  return ei = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ei(e);
}
function Di(e, t, r) {
  return t = yv(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function yv(e) {
  var t = dN(e, "string");
  return Sr(t) === "symbol" ? t : String(t);
}
function dN(e, t) {
  if (Sr(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Sr(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ri = /* @__PURE__ */ function(e) {
  uN(r, e);
  var t = cN(r);
  function r() {
    return iN(this, r), t.apply(this, arguments);
  }
  return oN(r, [{
    key: "getTickValueCoord",
    value: (
      /**
       * Calculate the coordinate of tick
       * @param  {Number} coordinate The radius of tick
       * @return {Object} (x, y)
       */
      function(a) {
        var i = a.coordinate, o = this.props, u = o.angle, c = o.cx, s = o.cy;
        return ce(c, s, i, u);
      }
    )
  }, {
    key: "getTickTextAnchor",
    value: function() {
      var a = this.props.orientation, i;
      switch (a) {
        case "left":
          i = "end";
          break;
        case "right":
          i = "start";
          break;
        default:
          i = "middle";
          break;
      }
      return i;
    }
  }, {
    key: "getViewBox",
    value: function() {
      var a = this.props, i = a.cx, o = a.cy, u = a.angle, c = a.ticks, s = V2(c, function(l) {
        return l.coordinate || 0;
      }), f = tN(c, function(l) {
        return l.coordinate || 0;
      });
      return {
        cx: i,
        cy: o,
        startAngle: u,
        endAngle: u,
        innerRadius: f.coordinate || 0,
        outerRadius: s.coordinate || 0
      };
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var a = this.props, i = a.cx, o = a.cy, u = a.angle, c = a.ticks, s = a.axisLine, f = ad(a, rN), l = c.reduce(function(g, v) {
        return [Math.min(g[0], v.coordinate), Math.max(g[1], v.coordinate)];
      }, [1 / 0, -1 / 0]), d = ce(i, o, l[0], u), h = ce(i, o, l[1], u), y = Bt(Bt(Bt({}, X(f, !1)), {}, {
        fill: "none"
      }, X(s, !1)), {}, {
        x1: d.x,
        y1: d.y,
        x2: h.x,
        y2: h.y
      });
      return /* @__PURE__ */ $.createElement("line", nn({
        className: "recharts-polar-radius-axis-line"
      }, y));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var a = this, i = this.props, o = i.ticks, u = i.tick, c = i.angle, s = i.tickFormatter, f = i.stroke, l = ad(i, nN), d = this.getTickTextAnchor(), h = X(l, !1), y = X(u, !1), g = o.map(function(v, b) {
        var x = a.getTickValueCoord(v), w = Bt(Bt(Bt(Bt({
          textAnchor: d,
          transform: "rotate(".concat(90 - c, ", ").concat(x.x, ", ").concat(x.y, ")")
        }, h), {}, {
          stroke: "none",
          fill: f
        }, y), {}, {
          index: b
        }, x), {}, {
          payload: v
        });
        return /* @__PURE__ */ $.createElement(ye, nn({
          className: "recharts-polar-radius-axis-tick",
          key: "tick-".concat(v.coordinate)
        }, gi(a.props, v, b)), r.renderTickItem(u, w, s ? s(v.value, b) : v.value));
      });
      return /* @__PURE__ */ $.createElement(ye, {
        className: "recharts-polar-radius-axis-ticks"
      }, g);
    }
  }, {
    key: "render",
    value: function() {
      var a = this.props, i = a.ticks, o = a.axisLine, u = a.tick;
      return !i || !i.length ? null : /* @__PURE__ */ $.createElement(ye, {
        className: "recharts-polar-radius-axis"
      }, o && this.renderAxisLine(), u && this.renderTicks(), $e.renderCallByParent(this.props, this.getViewBox()));
    }
  }], [{
    key: "renderTickItem",
    value: function(a, i, o) {
      var u;
      return /* @__PURE__ */ $.isValidElement(a) ? u = /* @__PURE__ */ $.cloneElement(a, i) : Y(a) ? u = a(i) : u = /* @__PURE__ */ $.createElement(br, nn({}, i, {
        className: "recharts-polar-radius-axis-tick-value"
      }), o), u;
    }
  }]), r;
}(wt);
Di(Ri, "displayName", "PolarRadiusAxis");
Di(Ri, "axisType", "radiusAxis");
Di(Ri, "defaultProps", {
  type: "number",
  radiusAxisId: 0,
  cx: 0,
  cy: 0,
  angle: 0,
  orientation: "right",
  stroke: "#ccc",
  axisLine: !0,
  tick: !0,
  tickCount: 5,
  allowDataOverflow: !1,
  scale: "auto",
  allowDuplicatedCategory: !0
});
function Ar(e) {
  "@babel/helpers - typeof";
  return Ar = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ar(e);
}
function zt() {
  return zt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, zt.apply(this, arguments);
}
function od(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ft(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? od(Object(r), !0).forEach(function(n) {
      Li(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : od(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hN(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function ud(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, gv(n.key), n);
  }
}
function pN(e, t, r) {
  return t && ud(e.prototype, t), r && ud(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function vN(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Mu(e, t);
}
function Mu(e, t) {
  return Mu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Mu(e, t);
}
function yN(e) {
  var t = bN();
  return function() {
    var n = ti(e), a;
    if (t) {
      var i = ti(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return gN(this, a);
  };
}
function gN(e, t) {
  if (t && (Ar(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return mN(e);
}
function mN(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function bN() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function ti(e) {
  return ti = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ti(e);
}
function Li(e, t, r) {
  return t = gv(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function gv(e) {
  var t = xN(e, "string");
  return Ar(t) === "symbol" ? t : String(t);
}
function xN(e, t) {
  if (Ar(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ar(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var wN = Math.PI / 180, cd = 1e-5, Bi = /* @__PURE__ */ function(e) {
  vN(r, e);
  var t = yN(r);
  function r() {
    return hN(this, r), t.apply(this, arguments);
  }
  return pN(r, [{
    key: "getTickLineCoord",
    value: (
      /**
       * Calculate the coordinate of line endpoint
       * @param  {Object} data The Data if ticks
       * @return {Object} (x0, y0): The start point of text,
       *                  (x1, y1): The end point close to text,
       *                  (x2, y2): The end point close to axis
       */
      function(a) {
        var i = this.props, o = i.cx, u = i.cy, c = i.radius, s = i.orientation, f = i.tickSize, l = f || 8, d = ce(o, u, c, a.coordinate), h = ce(o, u, c + (s === "inner" ? -1 : 1) * l, a.coordinate);
        return {
          x1: d.x,
          y1: d.y,
          x2: h.x,
          y2: h.y
        };
      }
    )
    /**
     * Get the text-anchor of each tick
     * @param  {Object} data Data of ticks
     * @return {String} text-anchor
     */
  }, {
    key: "getTickTextAnchor",
    value: function(a) {
      var i = this.props.orientation, o = Math.cos(-a.coordinate * wN), u;
      return o > cd ? u = i === "outer" ? "start" : "end" : o < -cd ? u = i === "outer" ? "end" : "start" : u = "middle", u;
    }
  }, {
    key: "renderAxisLine",
    value: function() {
      var a = this.props, i = a.cx, o = a.cy, u = a.radius, c = a.axisLine, s = a.axisLineType, f = Ft(Ft({}, X(this.props, !1)), {}, {
        fill: "none"
      }, X(c, !1));
      if (s === "circle")
        return /* @__PURE__ */ $.createElement(Wc, zt({
          className: "recharts-polar-angle-axis-line"
        }, f, {
          cx: i,
          cy: o,
          r: u
        }));
      var l = this.props.ticks, d = l.map(function(h) {
        return ce(i, o, u, h.coordinate);
      });
      return /* @__PURE__ */ $.createElement(k2, zt({
        className: "recharts-polar-angle-axis-line"
      }, f, {
        points: d
      }));
    }
  }, {
    key: "renderTicks",
    value: function() {
      var a = this, i = this.props, o = i.ticks, u = i.tick, c = i.tickLine, s = i.tickFormatter, f = i.stroke, l = X(this.props, !1), d = X(u, !1), h = Ft(Ft({}, l), {}, {
        fill: "none"
      }, X(c, !1)), y = o.map(function(g, v) {
        var b = a.getTickLineCoord(g), x = a.getTickTextAnchor(g), w = Ft(Ft(Ft({
          textAnchor: x
        }, l), {}, {
          stroke: "none",
          fill: f
        }, d), {}, {
          index: v,
          payload: g,
          x: b.x2,
          y: b.y2
        });
        return /* @__PURE__ */ $.createElement(ye, zt({
          className: "recharts-polar-angle-axis-tick",
          key: "tick-".concat(g.coordinate)
        }, gi(a.props, g, v)), c && /* @__PURE__ */ $.createElement("line", zt({
          className: "recharts-polar-angle-axis-tick-line"
        }, h, b)), u && r.renderTickItem(u, w, s ? s(g.value, v) : g.value));
      });
      return /* @__PURE__ */ $.createElement(ye, {
        className: "recharts-polar-angle-axis-ticks"
      }, y);
    }
  }, {
    key: "render",
    value: function() {
      var a = this.props, i = a.ticks, o = a.radius, u = a.axisLine;
      return o <= 0 || !i || !i.length ? null : /* @__PURE__ */ $.createElement(ye, {
        className: "recharts-polar-angle-axis"
      }, u && this.renderAxisLine(), this.renderTicks());
    }
  }], [{
    key: "renderTickItem",
    value: function(a, i, o) {
      var u;
      return /* @__PURE__ */ $.isValidElement(a) ? u = /* @__PURE__ */ $.cloneElement(a, i) : Y(a) ? u = a(i) : u = /* @__PURE__ */ $.createElement(br, zt({}, i, {
        className: "recharts-polar-angle-axis-tick-value"
      }), o), u;
    }
  }]), r;
}(wt);
Li(Bi, "displayName", "PolarAngleAxis");
Li(Bi, "axisType", "angleAxis");
Li(Bi, "defaultProps", {
  type: "category",
  angleAxisId: 0,
  scale: "auto",
  cx: 0,
  cy: 0,
  orientation: "outer",
  axisLine: !0,
  tickLine: !0,
  tickSize: 8,
  tick: !0,
  hide: !1,
  allowDuplicatedCategory: !0
});
var ON = Rh, SN = ON(Object.getPrototypeOf, Object), AN = SN, _N = Ot, $N = AN, PN = St, TN = "[object Object]", EN = Function.prototype, MN = Object.prototype, mv = EN.toString, jN = MN.hasOwnProperty, IN = mv.call(Object);
function CN(e) {
  if (!PN(e) || _N(e) != TN)
    return !1;
  var t = $N(e);
  if (t === null)
    return !0;
  var r = jN.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && mv.call(r) == IN;
}
var kN = CN;
const NN = /* @__PURE__ */ ie(kN);
var DN = Ot, RN = St, LN = "[object Boolean]";
function BN(e) {
  return e === !0 || e === !1 || RN(e) && DN(e) == LN;
}
var FN = BN;
const UN = /* @__PURE__ */ ie(FN);
function Cn(e) {
  "@babel/helpers - typeof";
  return Cn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Cn(e);
}
function ri() {
  return ri = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ri.apply(this, arguments);
}
function WN(e, t) {
  return KN(e) || HN(e, t) || zN(e, t) || qN();
}
function qN() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zN(e, t) {
  if (e) {
    if (typeof e == "string")
      return sd(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return sd(e, t);
  }
}
function sd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function HN(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = !0, s = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r)
          return;
        c = !1;
      } else
        for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); c = !0)
          ;
    } catch (f) {
      s = !0, a = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o))
          return;
      } finally {
        if (s)
          throw a;
      }
    }
    return u;
  }
}
function KN(e) {
  if (Array.isArray(e))
    return e;
}
function ld(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function fd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ld(Object(r), !0).forEach(function(n) {
      GN(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ld(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function GN(e, t, r) {
  return t = XN(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function XN(e) {
  var t = VN(e, "string");
  return Cn(t) === "symbol" ? t : String(t);
}
function VN(e, t) {
  if (Cn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Cn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var dd = function(t, r, n, a, i) {
  var o = n - a, u;
  return u = "M ".concat(t, ",").concat(r), u += "L ".concat(t + n, ",").concat(r), u += "L ".concat(t + n - o / 2, ",").concat(r + i), u += "L ".concat(t + n - o / 2 - a, ",").concat(r + i), u += "L ".concat(t, ",").concat(r, " Z"), u;
}, YN = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, ZN = function(t) {
  var r = fd(fd({}, YN), t), n = ba(), a = Uu(-1), i = WN(a, 2), o = i[0], u = i[1];
  Wu(function() {
    if (n.current && n.current.getTotalLength)
      try {
        var w = n.current.getTotalLength();
        w && u(w);
      } catch {
      }
  }, []);
  var c = r.x, s = r.y, f = r.upperWidth, l = r.lowerWidth, d = r.height, h = r.className, y = r.animationEasing, g = r.animationDuration, v = r.animationBegin, b = r.isUpdateAnimationActive;
  if (c !== +c || s !== +s || f !== +f || l !== +l || d !== +d || f === 0 && l === 0 || d === 0)
    return null;
  var x = ve("recharts-trapezoid", h);
  return b ? /* @__PURE__ */ $.createElement(Mt, {
    canBegin: o > 0,
    from: {
      upperWidth: 0,
      lowerWidth: 0,
      height: d,
      x: c,
      y: s
    },
    to: {
      upperWidth: f,
      lowerWidth: l,
      height: d,
      x: c,
      y: s
    },
    duration: g,
    animationEasing: y,
    isActive: b
  }, function(w) {
    var O = w.upperWidth, p = w.lowerWidth, m = w.height, S = w.x, A = w.y;
    return /* @__PURE__ */ $.createElement(Mt, {
      canBegin: o > 0,
      from: "0px ".concat(o === -1 ? 1 : o, "px"),
      to: "".concat(o, "px 0px"),
      attributeName: "strokeDasharray",
      begin: v,
      duration: g,
      easing: y
    }, /* @__PURE__ */ $.createElement("path", ri({}, X(r, !0), {
      className: x,
      d: dd(S, A, O, p, m),
      ref: n
    })));
  }) : /* @__PURE__ */ $.createElement("g", null, /* @__PURE__ */ $.createElement("path", ri({}, X(r, !0), {
    className: x,
    d: dd(c, s, f, l, d)
  })));
}, JN = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function kn(e) {
  "@babel/helpers - typeof";
  return kn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, kn(e);
}
function QN(e, t) {
  if (e == null)
    return {};
  var r = eD(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function eD(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function hd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ni(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hd(Object(r), !0).forEach(function(n) {
      tD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function tD(e, t, r) {
  return t = rD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function rD(e) {
  var t = nD(e, "string");
  return kn(t) === "symbol" ? t : String(t);
}
function nD(e, t) {
  if (kn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (kn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function aD(e, t) {
  return ni(ni({}, t), e);
}
function iD(e, t) {
  return e === "symbols";
}
function pd(e) {
  var t = e.shapeType, r = e.elementProps;
  switch (t) {
    case "rectangle":
      return /* @__PURE__ */ $.createElement(Uc, r);
    case "trapezoid":
      return /* @__PURE__ */ $.createElement(ZN, r);
    case "sector":
      return /* @__PURE__ */ $.createElement(vv, r);
    case "symbols":
      if (iD(t))
        return /* @__PURE__ */ $.createElement(rc, r);
      break;
    default:
      return null;
  }
}
function oD(e) {
  return /* @__PURE__ */ at(e) ? e.props : e;
}
function uD(e) {
  var t = e.option, r = e.shapeType, n = e.propTransformer, a = n === void 0 ? aD : n, i = e.activeClassName, o = i === void 0 ? "recharts-active-shape" : i, u = e.isActive, c = QN(e, JN), s;
  if (/* @__PURE__ */ at(t))
    s = /* @__PURE__ */ ge(t, ni(ni({}, c), oD(t)));
  else if (Y(t))
    s = t(c);
  else if (NN(t) && !UN(t)) {
    var f = a(t, c);
    s = /* @__PURE__ */ $.createElement(pd, {
      shapeType: r,
      elementProps: f
    });
  } else {
    var l = c;
    s = /* @__PURE__ */ $.createElement(pd, {
      shapeType: r,
      elementProps: l
    });
  }
  return u ? /* @__PURE__ */ $.createElement(ye, {
    className: o
  }, s) : s;
}
function Fi(e, t) {
  return t != null && "trapezoids" in e.props;
}
function Ui(e, t) {
  return t != null && "sectors" in e.props;
}
function Nn(e, t) {
  return t != null && "points" in e.props;
}
function cD(e, t) {
  var r, n, a = e.x === (t == null || (r = t.labelViewBox) === null || r === void 0 ? void 0 : r.x) || e.x === t.x, i = e.y === (t == null || (n = t.labelViewBox) === null || n === void 0 ? void 0 : n.y) || e.y === t.y;
  return a && i;
}
function sD(e, t) {
  var r = e.endAngle === t.endAngle, n = e.startAngle === t.startAngle;
  return r && n;
}
function lD(e, t) {
  var r = e.x === t.x, n = e.y === t.y, a = e.z === t.z;
  return r && n && a;
}
function fD(e, t) {
  var r;
  return Fi(e, t) ? r = cD : Ui(e, t) ? r = sD : Nn(e, t) && (r = lD), r;
}
function dD(e, t) {
  var r;
  return Fi(e, t) ? r = "trapezoids" : Ui(e, t) ? r = "sectors" : Nn(e, t) && (r = "points"), r;
}
function hD(e, t) {
  if (Fi(e, t)) {
    var r;
    return (r = t.tooltipPayload) === null || r === void 0 || (r = r[0]) === null || r === void 0 || (r = r.payload) === null || r === void 0 ? void 0 : r.payload;
  }
  if (Ui(e, t)) {
    var n;
    return (n = t.tooltipPayload) === null || n === void 0 || (n = n[0]) === null || n === void 0 || (n = n.payload) === null || n === void 0 ? void 0 : n.payload;
  }
  return Nn(e, t) ? t.payload : {};
}
function pD(e) {
  var t = e.activeTooltipItem, r = e.graphicalItem, n = e.itemData, a = dD(r, t), i = hD(r, t), o = n.filter(function(c, s) {
    var f = Dc(i, c), l = r.props[a].filter(function(y) {
      var g = fD(r, t);
      return g(y, t);
    }), d = r.props[a].indexOf(l[l.length - 1]), h = s === d;
    return f && h;
  }), u = n.indexOf(o[o.length - 1]);
  return u;
}
var ma;
function _r(e) {
  "@babel/helpers - typeof";
  return _r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, _r(e);
}
function sr() {
  return sr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, sr.apply(this, arguments);
}
function vd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function he(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vd(Object(r), !0).forEach(function(n) {
      ze(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function vD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function yd(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, bv(n.key), n);
  }
}
function yD(e, t, r) {
  return t && yd(e.prototype, t), r && yd(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function gD(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ju(e, t);
}
function ju(e, t) {
  return ju = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, ju(e, t);
}
function mD(e) {
  var t = xD();
  return function() {
    var n = ai(e), a;
    if (t) {
      var i = ai(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return bD(this, a);
  };
}
function bD(e, t) {
  if (t && (_r(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return or(e);
}
function or(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function xD() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function ai(e) {
  return ai = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ai(e);
}
function ze(e, t, r) {
  return t = bv(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function bv(e) {
  var t = wD(e, "string");
  return _r(t) === "symbol" ? t : String(t);
}
function wD(e, t) {
  if (_r(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (_r(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var _t = /* @__PURE__ */ function(e) {
  gD(r, e);
  var t = mD(r);
  function r(n) {
    var a;
    return vD(this, r), a = t.call(this, n), ze(or(a), "pieRef", null), ze(or(a), "sectorRefs", []), ze(or(a), "id", yi("recharts-pie-")), ze(or(a), "handleAnimationEnd", function() {
      var i = a.props.onAnimationEnd;
      a.setState({
        isAnimationFinished: !0
      }), Y(i) && i();
    }), ze(or(a), "handleAnimationStart", function() {
      var i = a.props.onAnimationStart;
      a.setState({
        isAnimationFinished: !1
      }), Y(i) && i();
    }), a.state = {
      isAnimationFinished: !n.isAnimationActive,
      prevIsAnimationActive: n.isAnimationActive,
      prevAnimationId: n.animationId,
      sectorToFocus: 0
    }, a;
  }
  return yD(r, [{
    key: "isActiveIndex",
    value: function(a) {
      var i = this.props.activeIndex;
      return Array.isArray(i) ? i.indexOf(a) !== -1 : a === i;
    }
  }, {
    key: "hasActiveIndex",
    value: function() {
      var a = this.props.activeIndex;
      return Array.isArray(a) ? a.length !== 0 : a || a === 0;
    }
  }, {
    key: "renderLabels",
    value: function(a) {
      var i = this.props.isAnimationActive;
      if (i && !this.state.isAnimationFinished)
        return null;
      var o = this.props, u = o.label, c = o.labelLine, s = o.dataKey, f = o.valueKey, l = X(this.props, !1), d = X(u, !1), h = X(c, !1), y = u && u.offsetRadius || 20, g = a.map(function(v, b) {
        var x = (v.startAngle + v.endAngle) / 2, w = ce(v.cx, v.cy, v.outerRadius + y, x), O = he(he(he(he({}, l), v), {}, {
          stroke: "none"
        }, d), {}, {
          index: b,
          textAnchor: r.getTextAnchor(w.x, v.cx)
        }, w), p = he(he(he(he({}, l), v), {}, {
          fill: "none",
          stroke: v.fill
        }, h), {}, {
          index: b,
          points: [ce(v.cx, v.cy, v.outerRadius, x), w],
          key: "line"
        }), m = s;
        return J(s) && J(f) ? m = "value" : J(s) && (m = f), /* @__PURE__ */ $.createElement(ye, {
          key: "label-".concat(v.startAngle, "-").concat(v.endAngle)
        }, c && r.renderLabelLineItem(c, p), r.renderLabelItem(u, O, De(v, m)));
      });
      return /* @__PURE__ */ $.createElement(ye, {
        className: "recharts-pie-labels"
      }, g);
    }
  }, {
    key: "renderSectorsStatically",
    value: function(a) {
      var i = this, o = this.props, u = o.activeShape, c = o.blendStroke, s = o.inactiveShape;
      return a.map(function(f, l) {
        if ((f == null ? void 0 : f.startAngle) === 0 && (f == null ? void 0 : f.endAngle) === 0 && a.length !== 1)
          return null;
        var d = i.isActiveIndex(l), h = s && i.hasActiveIndex() ? s : null, y = d ? u : h, g = he(he({}, f), {}, {
          stroke: c ? f.fill : f.stroke,
          tabIndex: -1
        });
        return /* @__PURE__ */ $.createElement(ye, sr({
          ref: function(b) {
            b && !i.sectorRefs.includes(b) && i.sectorRefs.push(b);
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, gi(i.props, f, l), {
          key: "sector-".concat(f == null ? void 0 : f.startAngle, "-").concat(f == null ? void 0 : f.endAngle, "-").concat(f.midAngle)
        }), /* @__PURE__ */ $.createElement(uD, sr({
          option: y,
          isActive: d,
          shapeType: "sector"
        }, g)));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function() {
      var a = this, i = this.props, o = i.sectors, u = i.isAnimationActive, c = i.animationBegin, s = i.animationDuration, f = i.animationEasing, l = i.animationId, d = this.state, h = d.prevSectors, y = d.prevIsAnimationActive;
      return /* @__PURE__ */ $.createElement(Mt, {
        begin: c,
        duration: s,
        isActive: u,
        easing: f,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(l, "-").concat(y),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(g) {
        var v = g.t, b = [], x = o && o[0], w = x.startAngle;
        return o.forEach(function(O, p) {
          var m = h && h[p], S = p > 0 ? Je(O, "paddingAngle", 0) : 0;
          if (m) {
            var A = is(m.endAngle - m.startAngle, O.endAngle - O.startAngle), _ = he(he({}, O), {}, {
              startAngle: w + S,
              endAngle: w + A(v) + S
            });
            b.push(_), w = _.endAngle;
          } else {
            var M = O.endAngle, T = O.startAngle, E = is(0, M - T), k = E(v), j = he(he({}, O), {}, {
              startAngle: w + S,
              endAngle: w + k + S
            });
            b.push(j), w = j.endAngle;
          }
        }), /* @__PURE__ */ $.createElement(ye, null, a.renderSectorsStatically(b));
      });
    }
  }, {
    key: "attachKeyboardHandlers",
    value: function(a) {
      var i = this;
      a.onkeydown = function(o) {
        if (!o.altKey)
          switch (o.key) {
            case "ArrowLeft": {
              var u = ++i.state.sectorToFocus % i.sectorRefs.length;
              i.sectorRefs[u].focus(), i.setState({
                sectorToFocus: u
              });
              break;
            }
            case "ArrowRight": {
              var c = --i.state.sectorToFocus < 0 ? i.sectorRefs.length - 1 : i.state.sectorToFocus % i.sectorRefs.length;
              i.sectorRefs[c].focus(), i.setState({
                sectorToFocus: c
              });
              break;
            }
            case "Escape": {
              i.sectorRefs[i.state.sectorToFocus].blur(), i.setState({
                sectorToFocus: 0
              });
              break;
            }
          }
      };
    }
  }, {
    key: "renderSectors",
    value: function() {
      var a = this.props, i = a.sectors, o = a.isAnimationActive, u = this.state.prevSectors;
      return o && i && i.length && (!u || !Dc(u, i)) ? this.renderSectorsWithAnimation() : this.renderSectorsStatically(i);
    }
  }, {
    key: "componentDidMount",
    value: function() {
      this.pieRef && this.attachKeyboardHandlers(this.pieRef);
    }
  }, {
    key: "render",
    value: function() {
      var a = this, i = this.props, o = i.hide, u = i.sectors, c = i.className, s = i.label, f = i.cx, l = i.cy, d = i.innerRadius, h = i.outerRadius, y = i.isAnimationActive, g = this.state.isAnimationFinished;
      if (o || !u || !u.length || !L(f) || !L(l) || !L(d) || !L(h))
        return null;
      var v = ve("recharts-pie", c);
      return /* @__PURE__ */ $.createElement(ye, {
        tabIndex: this.props.rootTabIndex,
        className: v,
        ref: function(x) {
          a.pieRef = x;
        }
      }, this.renderSectors(), s && this.renderLabels(u), $e.renderCallByParent(this.props, null, !1), (!y || g) && Jt.renderCallByParent(this.props, u, !1));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(a, i) {
      return i.prevIsAnimationActive !== a.isAnimationActive ? {
        prevIsAnimationActive: a.isAnimationActive,
        prevAnimationId: a.animationId,
        curSectors: a.sectors,
        prevSectors: [],
        isAnimationFinished: !0
      } : a.isAnimationActive && a.animationId !== i.prevAnimationId ? {
        prevAnimationId: a.animationId,
        curSectors: a.sectors,
        prevSectors: i.curSectors,
        isAnimationFinished: !0
      } : a.sectors !== i.curSectors ? {
        curSectors: a.sectors,
        isAnimationFinished: !0
      } : null;
    }
  }, {
    key: "getTextAnchor",
    value: function(a, i) {
      return a > i ? "start" : a < i ? "end" : "middle";
    }
  }, {
    key: "renderLabelLineItem",
    value: function(a, i) {
      return /* @__PURE__ */ $.isValidElement(a) ? /* @__PURE__ */ $.cloneElement(a, i) : Y(a) ? a(i) : /* @__PURE__ */ $.createElement(_u, sr({}, i, {
        type: "linear",
        className: "recharts-pie-label-line"
      }));
    }
  }, {
    key: "renderLabelItem",
    value: function(a, i, o) {
      if (/* @__PURE__ */ $.isValidElement(a))
        return /* @__PURE__ */ $.cloneElement(a, i);
      var u = o;
      return Y(a) && (u = a(i), /* @__PURE__ */ $.isValidElement(u)) ? u : /* @__PURE__ */ $.createElement(br, sr({}, i, {
        alignmentBaseline: "middle",
        className: "recharts-pie-label-text"
      }), u);
    }
  }]), r;
}(wt);
ma = _t;
ze(_t, "displayName", "Pie");
ze(_t, "defaultProps", {
  stroke: "#fff",
  fill: "#808080",
  legendType: "rect",
  cx: "50%",
  cy: "50%",
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  outerRadius: "80%",
  paddingAngle: 0,
  labelLine: !0,
  hide: !1,
  minAngle: 0,
  isAnimationActive: !Vt.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  nameKey: "name",
  blendStroke: !1,
  rootTabIndex: 0
});
ze(_t, "parseDeltaAngle", function(e, t) {
  var r = Ke(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
});
ze(_t, "getRealPieData", function(e) {
  var t = e.props, r = t.data, n = t.children, a = X(e.props, !1), i = it(n, hc);
  return r && r.length ? r.map(function(o, u) {
    return he(he(he({
      payload: o
    }, a), o), i && i[u] && i[u].props);
  }) : i && i.length ? i.map(function(o) {
    return he(he({}, a), o.props);
  }) : [];
});
ze(_t, "parseCoordinateOfPie", function(e, t) {
  var r = t.top, n = t.left, a = t.width, i = t.height, o = dv(a, i), u = n + Re(e.props.cx, a, a / 2), c = r + Re(e.props.cy, i, i / 2), s = Re(e.props.innerRadius, o, 0), f = Re(e.props.outerRadius, o, o * 0.8), l = e.props.maxRadius || Math.sqrt(a * a + i * i) / 2;
  return {
    cx: u,
    cy: c,
    innerRadius: s,
    outerRadius: f,
    maxRadius: l
  };
});
ze(_t, "getComposedData", function(e) {
  var t = e.item, r = e.offset, n = ma.getRealPieData(t);
  if (!n || !n.length)
    return null;
  var a = t.props, i = a.cornerRadius, o = a.startAngle, u = a.endAngle, c = a.paddingAngle, s = a.dataKey, f = a.nameKey, l = a.valueKey, d = a.tooltipType, h = Math.abs(t.props.minAngle), y = ma.parseCoordinateOfPie(t, r), g = ma.parseDeltaAngle(o, u), v = Math.abs(g), b = s;
  J(s) && J(l) ? (yt(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), b = "value") : J(s) && (yt(!1, `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`), b = l);
  var x = n.filter(function(A) {
    return De(A, b, 0) !== 0;
  }).length, w = (v >= 360 ? x : x - 1) * c, O = v - x * h - w, p = n.reduce(function(A, _) {
    var M = De(_, b, 0);
    return A + (L(M) ? M : 0);
  }, 0), m;
  if (p > 0) {
    var S;
    m = n.map(function(A, _) {
      var M = De(A, b, 0), T = De(A, f, _), E = (L(M) ? M : 0) / p, k;
      _ ? k = S.endAngle + Ke(g) * c * (M !== 0 ? 1 : 0) : k = o;
      var j = k + Ke(g) * ((M !== 0 ? h : 0) + E * O), C = (k + j) / 2, N = (y.innerRadius + y.outerRadius) / 2, D = [{
        name: T,
        value: M,
        payload: A,
        dataKey: b,
        type: d
      }], R = ce(y.cx, y.cy, N, C);
      return S = he(he(he({
        percent: E,
        cornerRadius: i,
        name: T,
        tooltipPayload: D,
        midAngle: C,
        middleRadius: N,
        tooltipPosition: R
      }, A), y), {}, {
        value: De(A, b),
        startAngle: k,
        endAngle: j,
        payload: A,
        paddingAngle: Ke(g) * c
      }), S;
    });
  }
  return he(he({}, y), {}, {
    sectors: m,
    data: n
  });
});
var OD = Math.ceil, SD = Math.max;
function AD(e, t, r, n) {
  for (var a = -1, i = SD(OD((t - e) / (r || 1)), 0), o = Array(i); i--; )
    o[n ? i : ++a] = e, e += r;
  return o;
}
var _D = AD, $D = up, gd = 1 / 0, PD = 17976931348623157e292;
function TD(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = $D(e), e === gd || e === -gd) {
    var t = e < 0 ? -1 : 1;
    return t * PD;
  }
  return e === e ? e : 0;
}
var xv = TD, ED = _D, MD = Ai, go = xv;
function jD(e) {
  return function(t, r, n) {
    return n && typeof n != "number" && MD(t, r, n) && (r = n = void 0), t = go(t), r === void 0 ? (r = t, t = 0) : r = go(r), n = n === void 0 ? t < r ? 1 : -1 : go(n), ED(t, r, n, e);
  };
}
var ID = jD, CD = ID, kD = CD(), ND = kD;
const ii = /* @__PURE__ */ ie(ND);
function Dn(e) {
  "@babel/helpers - typeof";
  return Dn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Dn(e);
}
function md(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function bd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? md(Object(r), !0).forEach(function(n) {
      wv(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : md(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function wv(e, t, r) {
  return t = DD(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function DD(e) {
  var t = RD(e, "string");
  return Dn(t) === "symbol" ? t : String(t);
}
function RD(e, t) {
  if (Dn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Dn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var LD = ["Webkit", "Moz", "O", "ms"], BD = function(t, r) {
  if (!t)
    return null;
  var n = t.replace(/(\w)/, function(i) {
    return i.toUpperCase();
  }), a = LD.reduce(function(i, o) {
    return bd(bd({}, i), {}, wv({}, o + n, r));
  }, {});
  return a[t] = r, a;
};
function $r(e) {
  "@babel/helpers - typeof";
  return $r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, $r(e);
}
function oi() {
  return oi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, oi.apply(this, arguments);
}
function xd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function mo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xd(Object(r), !0).forEach(function(n) {
      ke(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function FD(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function wd(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Ov(n.key), n);
  }
}
function UD(e, t, r) {
  return t && wd(e.prototype, t), r && wd(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function WD(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Iu(e, t);
}
function Iu(e, t) {
  return Iu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Iu(e, t);
}
function qD(e) {
  var t = HD();
  return function() {
    var n = ui(e), a;
    if (t) {
      var i = ui(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return zD(this, a);
  };
}
function zD(e, t) {
  if (t && ($r(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return tt(e);
}
function tt(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function HD() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function ui(e) {
  return ui = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, ui(e);
}
function ke(e, t, r) {
  return t = Ov(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Ov(e) {
  var t = KD(e, "string");
  return $r(t) === "symbol" ? t : String(t);
}
function KD(e, t) {
  if ($r(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if ($r(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var GD = function(t) {
  var r = t.data, n = t.startIndex, a = t.endIndex, i = t.x, o = t.width, u = t.travellerWidth;
  if (!r || !r.length)
    return {};
  var c = r.length, s = en().domain(ii(0, c)).range([i, i + o - u]), f = s.domain().map(function(l) {
    return s(l);
  });
  return {
    isTextActive: !1,
    isSlideMoving: !1,
    isTravellerMoving: !1,
    isTravellerFocused: !1,
    startX: s(n),
    endX: s(a),
    scale: s,
    scaleValues: f
  };
}, Od = function(t) {
  return t.changedTouches && !!t.changedTouches.length;
}, Pr = /* @__PURE__ */ function(e) {
  WD(r, e);
  var t = qD(r);
  function r(n) {
    var a;
    return FD(this, r), a = t.call(this, n), ke(tt(a), "handleDrag", function(i) {
      a.leaveTimer && (clearTimeout(a.leaveTimer), a.leaveTimer = null), a.state.isTravellerMoving ? a.handleTravellerMove(i) : a.state.isSlideMoving && a.handleSlideDrag(i);
    }), ke(tt(a), "handleTouchMove", function(i) {
      i.changedTouches != null && i.changedTouches.length > 0 && a.handleDrag(i.changedTouches[0]);
    }), ke(tt(a), "handleDragEnd", function() {
      a.setState({
        isTravellerMoving: !1,
        isSlideMoving: !1
      }, function() {
        var i = a.props, o = i.endIndex, u = i.onDragEnd, c = i.startIndex;
        u == null || u({
          endIndex: o,
          startIndex: c
        });
      }), a.detachDragEndListener();
    }), ke(tt(a), "handleLeaveWrapper", function() {
      (a.state.isTravellerMoving || a.state.isSlideMoving) && (a.leaveTimer = window.setTimeout(a.handleDragEnd, a.props.leaveTimeOut));
    }), ke(tt(a), "handleEnterSlideOrTraveller", function() {
      a.setState({
        isTextActive: !0
      });
    }), ke(tt(a), "handleLeaveSlideOrTraveller", function() {
      a.setState({
        isTextActive: !1
      });
    }), ke(tt(a), "handleSlideDragStart", function(i) {
      var o = Od(i) ? i.changedTouches[0] : i;
      a.setState({
        isTravellerMoving: !1,
        isSlideMoving: !0,
        slideMoveStartX: o.pageX
      }), a.attachDragEndListener();
    }), a.travellerDragStartHandlers = {
      startX: a.handleTravellerDragStart.bind(tt(a), "startX"),
      endX: a.handleTravellerDragStart.bind(tt(a), "endX")
    }, a.state = {}, a;
  }
  return UD(r, [{
    key: "componentWillUnmount",
    value: function() {
      this.leaveTimer && (clearTimeout(this.leaveTimer), this.leaveTimer = null), this.detachDragEndListener();
    }
  }, {
    key: "getIndex",
    value: function(a) {
      var i = a.startX, o = a.endX, u = this.state.scaleValues, c = this.props, s = c.gap, f = c.data, l = f.length - 1, d = Math.min(i, o), h = Math.max(i, o), y = r.getIndexInRange(u, d), g = r.getIndexInRange(u, h);
      return {
        startIndex: y - y % s,
        endIndex: g === l ? l : g - g % s
      };
    }
  }, {
    key: "getTextOfTick",
    value: function(a) {
      var i = this.props, o = i.data, u = i.tickFormatter, c = i.dataKey, s = De(o[a], c, a);
      return Y(u) ? u(s, a) : s;
    }
  }, {
    key: "attachDragEndListener",
    value: function() {
      window.addEventListener("mouseup", this.handleDragEnd, !0), window.addEventListener("touchend", this.handleDragEnd, !0), window.addEventListener("mousemove", this.handleDrag, !0);
    }
  }, {
    key: "detachDragEndListener",
    value: function() {
      window.removeEventListener("mouseup", this.handleDragEnd, !0), window.removeEventListener("touchend", this.handleDragEnd, !0), window.removeEventListener("mousemove", this.handleDrag, !0);
    }
  }, {
    key: "handleSlideDrag",
    value: function(a) {
      var i = this.state, o = i.slideMoveStartX, u = i.startX, c = i.endX, s = this.props, f = s.x, l = s.width, d = s.travellerWidth, h = s.startIndex, y = s.endIndex, g = s.onChange, v = a.pageX - o;
      v > 0 ? v = Math.min(v, f + l - d - c, f + l - d - u) : v < 0 && (v = Math.max(v, f - u, f - c));
      var b = this.getIndex({
        startX: u + v,
        endX: c + v
      });
      (b.startIndex !== h || b.endIndex !== y) && g && g(b), this.setState({
        startX: u + v,
        endX: c + v,
        slideMoveStartX: a.pageX
      });
    }
  }, {
    key: "handleTravellerDragStart",
    value: function(a, i) {
      var o = Od(i) ? i.changedTouches[0] : i;
      this.setState({
        isSlideMoving: !1,
        isTravellerMoving: !0,
        movingTravellerId: a,
        brushMoveStartX: o.pageX
      }), this.attachDragEndListener();
    }
  }, {
    key: "handleTravellerMove",
    value: function(a) {
      var i, o = this.state, u = o.brushMoveStartX, c = o.movingTravellerId, s = o.endX, f = o.startX, l = this.state[c], d = this.props, h = d.x, y = d.width, g = d.travellerWidth, v = d.onChange, b = d.gap, x = d.data, w = {
        startX: this.state.startX,
        endX: this.state.endX
      }, O = a.pageX - u;
      O > 0 ? O = Math.min(O, h + y - g - l) : O < 0 && (O = Math.max(O, h - l)), w[c] = l + O;
      var p = this.getIndex(w), m = p.startIndex, S = p.endIndex, A = function() {
        var M = x.length - 1;
        return c === "startX" && (s > f ? m % b === 0 : S % b === 0) || s < f && S === M || c === "endX" && (s > f ? S % b === 0 : m % b === 0) || s > f && S === M;
      };
      this.setState((i = {}, ke(i, c, l + O), ke(i, "brushMoveStartX", a.pageX), i), function() {
        v && A() && v(p);
      });
    }
  }, {
    key: "handleTravellerMoveKeyboard",
    value: function(a, i) {
      var o = this, u = this.state, c = u.scaleValues, s = u.startX, f = u.endX, l = this.state[i], d = c.indexOf(l);
      if (d !== -1) {
        var h = d + a;
        if (!(h === -1 || h >= c.length)) {
          var y = c[h];
          i === "startX" && y >= f || i === "endX" && y <= s || this.setState(ke({}, i, y), function() {
            o.props.onChange(o.getIndex({
              startX: o.state.startX,
              endX: o.state.endX
            }));
          });
        }
      }
    }
  }, {
    key: "renderBackground",
    value: function() {
      var a = this.props, i = a.x, o = a.y, u = a.width, c = a.height, s = a.fill, f = a.stroke;
      return /* @__PURE__ */ $.createElement("rect", {
        stroke: f,
        fill: s,
        x: i,
        y: o,
        width: u,
        height: c
      });
    }
  }, {
    key: "renderPanorama",
    value: function() {
      var a = this.props, i = a.x, o = a.y, u = a.width, c = a.height, s = a.data, f = a.children, l = a.padding, d = Xt.only(f);
      return d ? /* @__PURE__ */ $.cloneElement(d, {
        x: i,
        y: o,
        width: u,
        height: c,
        margin: l,
        compact: !0,
        data: s
      }) : null;
    }
  }, {
    key: "renderTravellerLayer",
    value: function(a, i) {
      var o = this, u = this.props, c = u.y, s = u.travellerWidth, f = u.height, l = u.traveller, d = u.ariaLabel, h = u.data, y = u.startIndex, g = u.endIndex, v = Math.max(a, this.props.x), b = mo(mo({}, X(this.props, !1)), {}, {
        x: v,
        y: c,
        width: s,
        height: f
      }), x = d || "Min value: ".concat(h[y].name, ", Max value: ").concat(h[g].name);
      return /* @__PURE__ */ $.createElement(ye, {
        tabIndex: 0,
        role: "slider",
        "aria-label": x,
        "aria-valuenow": a,
        className: "recharts-brush-traveller",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.travellerDragStartHandlers[i],
        onTouchStart: this.travellerDragStartHandlers[i],
        onKeyDown: function(O) {
          ["ArrowLeft", "ArrowRight"].includes(O.key) && (O.preventDefault(), O.stopPropagation(), o.handleTravellerMoveKeyboard(O.key === "ArrowRight" ? 1 : -1, i));
        },
        onFocus: function() {
          o.setState({
            isTravellerFocused: !0
          });
        },
        onBlur: function() {
          o.setState({
            isTravellerFocused: !1
          });
        },
        style: {
          cursor: "col-resize"
        }
      }, r.renderTraveller(l, b));
    }
  }, {
    key: "renderSlide",
    value: function(a, i) {
      var o = this.props, u = o.y, c = o.height, s = o.stroke, f = o.travellerWidth, l = Math.min(a, i) + f, d = Math.max(Math.abs(i - a) - f, 0);
      return /* @__PURE__ */ $.createElement("rect", {
        className: "recharts-brush-slide",
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.handleSlideDragStart,
        onTouchStart: this.handleSlideDragStart,
        style: {
          cursor: "move"
        },
        stroke: "none",
        fill: s,
        fillOpacity: 0.2,
        x: l,
        y: u,
        width: d,
        height: c
      });
    }
  }, {
    key: "renderText",
    value: function() {
      var a = this.props, i = a.startIndex, o = a.endIndex, u = a.y, c = a.height, s = a.travellerWidth, f = a.stroke, l = this.state, d = l.startX, h = l.endX, y = 5, g = {
        pointerEvents: "none",
        fill: f
      };
      return /* @__PURE__ */ $.createElement(ye, {
        className: "recharts-brush-texts"
      }, /* @__PURE__ */ $.createElement(br, oi({
        textAnchor: "end",
        verticalAnchor: "middle",
        x: Math.min(d, h) - y,
        y: u + c / 2
      }, g), this.getTextOfTick(i)), /* @__PURE__ */ $.createElement(br, oi({
        textAnchor: "start",
        verticalAnchor: "middle",
        x: Math.max(d, h) + s + y,
        y: u + c / 2
      }, g), this.getTextOfTick(o)));
    }
  }, {
    key: "render",
    value: function() {
      var a = this.props, i = a.data, o = a.className, u = a.children, c = a.x, s = a.y, f = a.width, l = a.height, d = a.alwaysShowText, h = this.state, y = h.startX, g = h.endX, v = h.isTextActive, b = h.isSlideMoving, x = h.isTravellerMoving, w = h.isTravellerFocused;
      if (!i || !i.length || !L(c) || !L(s) || !L(f) || !L(l) || f <= 0 || l <= 0)
        return null;
      var O = ve("recharts-brush", o), p = $.Children.count(u) === 1, m = BD("userSelect", "none");
      return /* @__PURE__ */ $.createElement(ye, {
        className: O,
        onMouseLeave: this.handleLeaveWrapper,
        onTouchMove: this.handleTouchMove,
        style: m
      }, this.renderBackground(), p && this.renderPanorama(), this.renderSlide(y, g), this.renderTravellerLayer(y, "startX"), this.renderTravellerLayer(g, "endX"), (v || b || x || w || d) && this.renderText());
    }
  }], [{
    key: "renderDefaultTraveller",
    value: function(a) {
      var i = a.x, o = a.y, u = a.width, c = a.height, s = a.stroke, f = Math.floor(o + c / 2) - 1;
      return /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("rect", {
        x: i,
        y: o,
        width: u,
        height: c,
        fill: s,
        stroke: "none"
      }), /* @__PURE__ */ $.createElement("line", {
        x1: i + 1,
        y1: f,
        x2: i + u - 1,
        y2: f,
        fill: "none",
        stroke: "#fff"
      }), /* @__PURE__ */ $.createElement("line", {
        x1: i + 1,
        y1: f + 2,
        x2: i + u - 1,
        y2: f + 2,
        fill: "none",
        stroke: "#fff"
      }));
    }
  }, {
    key: "renderTraveller",
    value: function(a, i) {
      var o;
      return /* @__PURE__ */ $.isValidElement(a) ? o = /* @__PURE__ */ $.cloneElement(a, i) : Y(a) ? o = a(i) : o = r.renderDefaultTraveller(i), o;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function(a, i) {
      var o = a.data, u = a.width, c = a.x, s = a.travellerWidth, f = a.updateId, l = a.startIndex, d = a.endIndex;
      if (o !== i.prevData || f !== i.prevUpdateId)
        return mo({
          prevData: o,
          prevTravellerWidth: s,
          prevUpdateId: f,
          prevX: c,
          prevWidth: u
        }, o && o.length ? GD({
          data: o,
          width: u,
          x: c,
          travellerWidth: s,
          startIndex: l,
          endIndex: d
        }) : {
          scale: null,
          scaleValues: null
        });
      if (i.scale && (u !== i.prevWidth || c !== i.prevX || s !== i.prevTravellerWidth)) {
        i.scale.range([c, c + u - s]);
        var h = i.scale.domain().map(function(y) {
          return i.scale(y);
        });
        return {
          prevData: o,
          prevTravellerWidth: s,
          prevUpdateId: f,
          prevX: c,
          prevWidth: u,
          startX: i.scale(a.startIndex),
          endX: i.scale(a.endIndex),
          scaleValues: h
        };
      }
      return null;
    }
  }, {
    key: "getIndexInRange",
    value: function(a, i) {
      for (var o = a.length, u = 0, c = o - 1; c - u > 1; ) {
        var s = Math.floor((u + c) / 2);
        a[s] > i ? c = s : u = s;
      }
      return i >= a[c] ? c : u;
    }
  }]), r;
}(wt);
ke(Pr, "displayName", "Brush");
ke(Pr, "defaultProps", {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: "#fff",
  stroke: "#666",
  padding: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  },
  leaveTimeOut: 1e3,
  alwaysShowText: !1
});
var XD = sc;
function VD(e, t) {
  var r;
  return XD(e, function(n, a, i) {
    return r = t(n, a, i), !r;
  }), !!r;
}
var YD = VD, ZD = Eh, JD = lt, QD = YD, eR = Ie, tR = Ai;
function rR(e, t, r) {
  var n = eR(e) ? ZD : QD;
  return r && tR(e, t, r) && (t = void 0), n(e, JD(t));
}
var nR = rR;
const aR = /* @__PURE__ */ ie(nR);
var ut = function(t, r) {
  var n = t.alwaysShow, a = t.ifOverflow;
  return n && (a = "extendDomain"), a === r;
}, Sd = Zh;
function iR(e, t, r) {
  t == "__proto__" && Sd ? Sd(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var oR = iR, uR = oR, cR = Vh, sR = lt;
function lR(e, t) {
  var r = {};
  return t = sR(t), cR(e, function(n, a, i) {
    uR(r, a, t(n, a, i));
  }), r;
}
var fR = lR;
const dR = /* @__PURE__ */ ie(fR);
function hR(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (!t(e[r], r, e))
      return !1;
  return !0;
}
var pR = hR, vR = sc;
function yR(e, t) {
  var r = !0;
  return vR(e, function(n, a, i) {
    return r = !!t(n, a, i), r;
  }), r;
}
var gR = yR, mR = pR, bR = gR, xR = lt, wR = Ie, OR = Ai;
function SR(e, t, r) {
  var n = wR(e) ? mR : bR;
  return r && OR(e, t, r) && (t = void 0), n(e, xR(t));
}
var AR = SR;
const Sv = /* @__PURE__ */ ie(AR);
function Rn(e) {
  "@babel/helpers - typeof";
  return Rn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Rn(e);
}
function _R(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Ad(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Av(n.key), n);
  }
}
function $R(e, t, r) {
  return t && Ad(e.prototype, t), r && Ad(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function _d(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function pa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _d(Object(r), !0).forEach(function(n) {
      qc(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _d(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qc(e, t, r) {
  return t = Av(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Av(e) {
  var t = PR(e, "string");
  return Rn(t) === "symbol" ? t : String(t);
}
function PR(e, t) {
  if (Rn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Rn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var _v = function(t, r) {
  var n = t.x, a = t.y, i = r.x, o = r.y;
  return {
    x: Math.min(n, i),
    y: Math.min(a, o),
    width: Math.abs(i - n),
    height: Math.abs(o - a)
  };
}, TR = function(t) {
  var r = t.x1, n = t.y1, a = t.x2, i = t.y2;
  return _v({
    x: r,
    y: n
  }, {
    x: a,
    y: i
  });
}, $v = /* @__PURE__ */ function() {
  function e(t) {
    _R(this, e), this.scale = t;
  }
  return $R(e, [{
    key: "domain",
    get: function() {
      return this.scale.domain;
    }
  }, {
    key: "range",
    get: function() {
      return this.scale.range;
    }
  }, {
    key: "rangeMin",
    get: function() {
      return this.range()[0];
    }
  }, {
    key: "rangeMax",
    get: function() {
      return this.range()[1];
    }
  }, {
    key: "bandwidth",
    get: function() {
      return this.scale.bandwidth;
    }
  }, {
    key: "apply",
    value: function(r) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = n.bandAware, i = n.position;
      if (r !== void 0) {
        if (i)
          switch (i) {
            case "start":
              return this.scale(r);
            case "middle": {
              var o = this.bandwidth ? this.bandwidth() / 2 : 0;
              return this.scale(r) + o;
            }
            case "end": {
              var u = this.bandwidth ? this.bandwidth() : 0;
              return this.scale(r) + u;
            }
            default:
              return this.scale(r);
          }
        if (a) {
          var c = this.bandwidth ? this.bandwidth() / 2 : 0;
          return this.scale(r) + c;
        }
        return this.scale(r);
      }
    }
  }, {
    key: "isInRange",
    value: function(r) {
      var n = this.range(), a = n[0], i = n[n.length - 1];
      return a <= i ? r >= a && r <= i : r >= i && r <= a;
    }
  }], [{
    key: "create",
    value: function(r) {
      return new e(r);
    }
  }]), e;
}();
qc($v, "EPS", 1e-4);
var zc = function(t) {
  var r = Object.keys(t).reduce(function(n, a) {
    return pa(pa({}, n), {}, qc({}, a, $v.create(t[a])));
  }, {});
  return pa(pa({}, r), {}, {
    apply: function(a) {
      var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = i.bandAware, u = i.position;
      return dR(a, function(c, s) {
        return r[s].apply(c, {
          bandAware: o,
          position: u
        });
      });
    },
    isInRange: function(a) {
      return Sv(a, function(i, o) {
        return r[o].isInRange(i);
      });
    }
  });
}, ER = _m(function(e) {
  return {
    x: e.left,
    y: e.top,
    width: e.width,
    height: e.height
  };
}, function(e) {
  return ["l", e.left, "t", e.top, "w", e.width, "h", e.height].join("");
});
function ci(e) {
  "@babel/helpers - typeof";
  return ci = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ci(e);
}
var Pv = /* @__PURE__ */ er(void 0), Tv = /* @__PURE__ */ er(void 0), Ev = /* @__PURE__ */ er(void 0), MR = /* @__PURE__ */ er({}), Mv = /* @__PURE__ */ er(void 0), jR = /* @__PURE__ */ er(0), IR = /* @__PURE__ */ er(0), CR = function(t) {
  var r = t.state, n = r.xAxisMap, a = r.yAxisMap, i = r.offset, o = t.clipPathId, u = t.children, c = t.width, s = t.height, f = ER(i);
  return /* @__PURE__ */ $.createElement(Pv.Provider, {
    value: n
  }, /* @__PURE__ */ $.createElement(Tv.Provider, {
    value: a
  }, /* @__PURE__ */ $.createElement(MR.Provider, {
    value: i
  }, /* @__PURE__ */ $.createElement(Ev.Provider, {
    value: f
  }, /* @__PURE__ */ $.createElement(Mv.Provider, {
    value: o
  }, /* @__PURE__ */ $.createElement(jR.Provider, {
    value: s
  }, /* @__PURE__ */ $.createElement(IR.Provider, {
    value: c
  }, u)))))));
}, kR = function() {
  return li(Mv);
};
function jv(e) {
  var t = Object.keys(e);
  return t.length === 0 ? "There are no available ids." : "Available ids are: ".concat(t, ".");
}
var NR = function(t) {
  var r = li(Pv);
  r == null && (process.env.NODE_ENV !== "production" ? He(!1, "Could not find Recharts context; are you sure this is rendered inside a Recharts wrapper component?") : He(!1));
  var n = r[t];
  return n == null && (process.env.NODE_ENV !== "production" ? He(!1, 'Could not find xAxis by id "'.concat(t, '" [').concat(ci(t), "]. ").concat(jv(r))) : He(!1)), n;
}, DR = function(t) {
  var r = li(Tv);
  r == null && (process.env.NODE_ENV !== "production" ? He(!1, "Could not find Recharts context; are you sure this is rendered inside a Recharts wrapper component?") : He(!1));
  var n = r[t];
  return n == null && (process.env.NODE_ENV !== "production" ? He(!1, 'Could not find yAxis by id "'.concat(t, '" [').concat(ci(t), "]. ").concat(jv(r))) : He(!1)), n;
}, RR = function() {
  var t = li(Ev);
  return t;
};
function Ln(e) {
  "@babel/helpers - typeof";
  return Ln = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ln(e);
}
function $d(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Pd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $d(Object(r), !0).forEach(function(n) {
      LR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $d(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function LR(e, t, r) {
  return t = BR(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function BR(e) {
  var t = FR(e, "string");
  return Ln(t) === "symbol" ? t : String(t);
}
function FR(e, t) {
  if (Ln(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Ln(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function UR(e, t) {
  return HR(e) || zR(e, t) || qR(e, t) || WR();
}
function WR() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qR(e, t) {
  if (e) {
    if (typeof e == "string")
      return Td(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Td(e, t);
  }
}
function Td(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function zR(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = !0, s = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r)
          return;
        c = !1;
      } else
        for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); c = !0)
          ;
    } catch (f) {
      s = !0, a = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o))
          return;
      } finally {
        if (s)
          throw a;
      }
    }
    return u;
  }
}
function HR(e) {
  if (Array.isArray(e))
    return e;
}
function Cu() {
  return Cu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Cu.apply(this, arguments);
}
var KR = function(t, r) {
  var n;
  return /* @__PURE__ */ $.isValidElement(t) ? n = /* @__PURE__ */ $.cloneElement(t, r) : Y(t) ? n = t(r) : n = /* @__PURE__ */ $.createElement("line", Cu({}, r, {
    className: "recharts-reference-line-line"
  })), n;
}, GR = function(t, r, n, a, i, o, u, c, s) {
  var f = i.x, l = i.y, d = i.width, h = i.height;
  if (n) {
    var y = s.y, g = t.y.apply(y, {
      position: o
    });
    if (ut(s, "discard") && !t.y.isInRange(g))
      return null;
    var v = [{
      x: f + d,
      y: g
    }, {
      x: f,
      y: g
    }];
    return c === "left" ? v.reverse() : v;
  }
  if (r) {
    var b = s.x, x = t.x.apply(b, {
      position: o
    });
    if (ut(s, "discard") && !t.x.isInRange(x))
      return null;
    var w = [{
      x,
      y: l + h
    }, {
      x,
      y: l
    }];
    return u === "top" ? w.reverse() : w;
  }
  if (a) {
    var O = s.segment, p = O.map(function(m) {
      return t.apply(m, {
        position: o
      });
    });
    return ut(s, "discard") && aR(p, function(m) {
      return !t.isInRange(m);
    }) ? null : p;
  }
  return null;
};
function Hc(e) {
  var t = e.x, r = e.y, n = e.segment, a = e.xAxisId, i = e.yAxisId, o = e.shape, u = e.className, c = e.alwaysShow, s = kR(), f = NR(a), l = DR(i), d = RR();
  if (!s || !d)
    return null;
  yt(c === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var h = zc({
    x: f.scale,
    y: l.scale
  }), y = we(t), g = we(r), v = n && n.length === 2, b = GR(h, y, g, v, d, e.position, f.orientation, l.orientation, e);
  if (!b)
    return null;
  var x = UR(b, 2), w = x[0], O = w.x, p = w.y, m = x[1], S = m.x, A = m.y, _ = ut(e, "hidden") ? "url(#".concat(s, ")") : void 0, M = Pd(Pd({
    clipPath: _
  }, X(e, !0)), {}, {
    x1: O,
    y1: p,
    x2: S,
    y2: A
  });
  return /* @__PURE__ */ $.createElement(ye, {
    className: ve("recharts-reference-line", u)
  }, KR(o, M), $e.renderCallByParent(e, TR({
    x1: O,
    y1: p,
    x2: S,
    y2: A
  })));
}
Hc.displayName = "ReferenceLine";
Hc.defaultProps = {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  fill: "none",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
  position: "middle"
};
function Bn(e) {
  "@babel/helpers - typeof";
  return Bn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Bn(e);
}
function ku() {
  return ku = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ku.apply(this, arguments);
}
function Ed(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Md(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ed(Object(r), !0).forEach(function(n) {
      XR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ed(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function XR(e, t, r) {
  return t = VR(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function VR(e) {
  var t = YR(e, "string");
  return Bn(t) === "symbol" ? t : String(t);
}
function YR(e, t) {
  if (Bn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Bn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ZR = function(t) {
  var r = t.x, n = t.y, a = t.xAxis, i = t.yAxis, o = zc({
    x: a.scale,
    y: i.scale
  }), u = o.apply({
    x: r,
    y: n
  }, {
    bandAware: !0
  });
  return ut(t, "discard") && !o.isInRange(u) ? null : u;
};
function Zn(e) {
  var t = e.x, r = e.y, n = e.r, a = e.alwaysShow, i = e.clipPathId, o = we(t), u = we(r);
  if (yt(a === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.'), !o || !u)
    return null;
  var c = ZR(e);
  if (!c)
    return null;
  var s = c.x, f = c.y, l = e.shape, d = e.className, h = ut(e, "hidden") ? "url(#".concat(i, ")") : void 0, y = Md(Md({
    clipPath: h
  }, X(e, !0)), {}, {
    cx: s,
    cy: f
  });
  return /* @__PURE__ */ $.createElement(ye, {
    className: ve("recharts-reference-dot", d)
  }, Zn.renderDot(l, y), $e.renderCallByParent(e, {
    x: s - n,
    y: f - n,
    width: 2 * n,
    height: 2 * n
  }));
}
Zn.displayName = "ReferenceDot";
Zn.defaultProps = {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#fff",
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1
};
Zn.renderDot = function(e, t) {
  var r;
  return /* @__PURE__ */ $.isValidElement(e) ? r = /* @__PURE__ */ $.cloneElement(e, t) : Y(e) ? r = e(t) : r = /* @__PURE__ */ $.createElement(Wc, ku({}, t, {
    cx: t.cx,
    cy: t.cy,
    className: "recharts-reference-dot-dot"
  })), r;
};
function Fn(e) {
  "@babel/helpers - typeof";
  return Fn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fn(e);
}
function Nu() {
  return Nu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Nu.apply(this, arguments);
}
function jd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Id(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jd(Object(r), !0).forEach(function(n) {
      JR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : jd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function JR(e, t, r) {
  return t = QR(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function QR(e) {
  var t = eL(e, "string");
  return Fn(t) === "symbol" ? t : String(t);
}
function eL(e, t) {
  if (Fn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Fn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var tL = function(t, r, n, a, i) {
  var o = i.x1, u = i.x2, c = i.y1, s = i.y2, f = i.xAxis, l = i.yAxis;
  if (!f || !l)
    return null;
  var d = zc({
    x: f.scale,
    y: l.scale
  }), h = {
    x: t ? d.x.apply(o, {
      position: "start"
    }) : d.x.rangeMin,
    y: n ? d.y.apply(c, {
      position: "start"
    }) : d.y.rangeMin
  }, y = {
    x: r ? d.x.apply(u, {
      position: "end"
    }) : d.x.rangeMax,
    y: a ? d.y.apply(s, {
      position: "end"
    }) : d.y.rangeMax
  };
  return ut(i, "discard") && (!d.isInRange(h) || !d.isInRange(y)) ? null : _v(h, y);
};
function Jn(e) {
  var t = e.x1, r = e.x2, n = e.y1, a = e.y2, i = e.className, o = e.alwaysShow, u = e.clipPathId;
  yt(o === void 0, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  var c = we(t), s = we(r), f = we(n), l = we(a), d = e.shape;
  if (!c && !s && !f && !l && !d)
    return null;
  var h = tL(c, s, f, l, e);
  if (!h && !d)
    return null;
  var y = ut(e, "hidden") ? "url(#".concat(u, ")") : void 0;
  return /* @__PURE__ */ $.createElement(ye, {
    className: ve("recharts-reference-area", i)
  }, Jn.renderRect(d, Id(Id({
    clipPath: y
  }, X(e, !0)), h)), $e.renderCallByParent(e, h));
}
Jn.displayName = "ReferenceArea";
Jn.defaultProps = {
  isFront: !1,
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: "#ccc",
  fillOpacity: 0.5,
  stroke: "none",
  strokeWidth: 1
};
Jn.renderRect = function(e, t) {
  var r;
  return /* @__PURE__ */ $.isValidElement(e) ? r = /* @__PURE__ */ $.cloneElement(e, t) : Y(e) ? r = e(t) : r = /* @__PURE__ */ $.createElement(Uc, Nu({}, t, {
    className: "recharts-reference-area-rect"
  })), r;
};
var rL = lt, nL = Kn, aL = Oi;
function iL(e) {
  return function(t, r, n) {
    var a = Object(t);
    if (!nL(t)) {
      var i = rL(r);
      t = aL(t), r = function(u) {
        return i(a[u], u, a);
      };
    }
    var o = e(t, r, n);
    return o > -1 ? a[i ? t[o] : o] : void 0;
  };
}
var oL = iL, uL = xv;
function cL(e) {
  var t = uL(e), r = t % 1;
  return t === t ? r ? t - r : t : 0;
}
var sL = cL, lL = qh, fL = lt, dL = sL, hL = Math.max;
function pL(e, t, r) {
  var n = e == null ? 0 : e.length;
  if (!n)
    return -1;
  var a = r == null ? 0 : dL(r);
  return a < 0 && (a = hL(n + a, 0)), lL(e, fL(t), a);
}
var vL = pL, yL = oL, gL = vL, mL = yL(gL), bL = mL;
const xL = /* @__PURE__ */ ie(bL);
function Cd(e) {
  return AL(e) || SL(e) || OL(e) || wL();
}
function wL() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function OL(e, t) {
  if (e) {
    if (typeof e == "string")
      return Du(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Du(e, t);
  }
}
function SL(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function AL(e) {
  if (Array.isArray(e))
    return Du(e);
}
function Du(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
var Ru = function(t, r, n, a, i) {
  var o = it(t, Hc), u = it(t, Zn), c = [].concat(Cd(o), Cd(u)), s = it(t, Jn), f = "".concat(a, "Id"), l = a[0], d = r;
  if (c.length && (d = c.reduce(function(g, v) {
    if (v.props[f] === n && ut(v.props, "extendDomain") && L(v.props[l])) {
      var b = v.props[l];
      return [Math.min(g[0], b), Math.max(g[1], b)];
    }
    return g;
  }, d)), s.length) {
    var h = "".concat(l, "1"), y = "".concat(l, "2");
    d = s.reduce(function(g, v) {
      if (v.props[f] === n && ut(v.props, "extendDomain") && L(v.props[h]) && L(v.props[y])) {
        var b = v.props[h], x = v.props[y];
        return [Math.min(g[0], b, x), Math.max(g[1], b, x)];
      }
      return g;
    }, d);
  }
  return i && i.length && (d = i.reduce(function(g, v) {
    return L(v) ? [Math.min(g[0], v), Math.max(g[1], v)] : g;
  }, d)), d;
}, Iv = { exports: {} };
(function(e) {
  var t = Object.prototype.hasOwnProperty, r = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (r = !1));
  function a(c, s, f) {
    this.fn = c, this.context = s, this.once = f || !1;
  }
  function i(c, s, f, l, d) {
    if (typeof f != "function")
      throw new TypeError("The listener must be a function");
    var h = new a(f, l || c, d), y = r ? r + s : s;
    return c._events[y] ? c._events[y].fn ? c._events[y] = [c._events[y], h] : c._events[y].push(h) : (c._events[y] = h, c._eventsCount++), c;
  }
  function o(c, s) {
    --c._eventsCount === 0 ? c._events = new n() : delete c._events[s];
  }
  function u() {
    this._events = new n(), this._eventsCount = 0;
  }
  u.prototype.eventNames = function() {
    var s = [], f, l;
    if (this._eventsCount === 0)
      return s;
    for (l in f = this._events)
      t.call(f, l) && s.push(r ? l.slice(1) : l);
    return Object.getOwnPropertySymbols ? s.concat(Object.getOwnPropertySymbols(f)) : s;
  }, u.prototype.listeners = function(s) {
    var f = r ? r + s : s, l = this._events[f];
    if (!l)
      return [];
    if (l.fn)
      return [l.fn];
    for (var d = 0, h = l.length, y = new Array(h); d < h; d++)
      y[d] = l[d].fn;
    return y;
  }, u.prototype.listenerCount = function(s) {
    var f = r ? r + s : s, l = this._events[f];
    return l ? l.fn ? 1 : l.length : 0;
  }, u.prototype.emit = function(s, f, l, d, h, y) {
    var g = r ? r + s : s;
    if (!this._events[g])
      return !1;
    var v = this._events[g], b = arguments.length, x, w;
    if (v.fn) {
      switch (v.once && this.removeListener(s, v.fn, void 0, !0), b) {
        case 1:
          return v.fn.call(v.context), !0;
        case 2:
          return v.fn.call(v.context, f), !0;
        case 3:
          return v.fn.call(v.context, f, l), !0;
        case 4:
          return v.fn.call(v.context, f, l, d), !0;
        case 5:
          return v.fn.call(v.context, f, l, d, h), !0;
        case 6:
          return v.fn.call(v.context, f, l, d, h, y), !0;
      }
      for (w = 1, x = new Array(b - 1); w < b; w++)
        x[w - 1] = arguments[w];
      v.fn.apply(v.context, x);
    } else {
      var O = v.length, p;
      for (w = 0; w < O; w++)
        switch (v[w].once && this.removeListener(s, v[w].fn, void 0, !0), b) {
          case 1:
            v[w].fn.call(v[w].context);
            break;
          case 2:
            v[w].fn.call(v[w].context, f);
            break;
          case 3:
            v[w].fn.call(v[w].context, f, l);
            break;
          case 4:
            v[w].fn.call(v[w].context, f, l, d);
            break;
          default:
            if (!x)
              for (p = 1, x = new Array(b - 1); p < b; p++)
                x[p - 1] = arguments[p];
            v[w].fn.apply(v[w].context, x);
        }
    }
    return !0;
  }, u.prototype.on = function(s, f, l) {
    return i(this, s, f, l, !1);
  }, u.prototype.once = function(s, f, l) {
    return i(this, s, f, l, !0);
  }, u.prototype.removeListener = function(s, f, l, d) {
    var h = r ? r + s : s;
    if (!this._events[h])
      return this;
    if (!f)
      return o(this, h), this;
    var y = this._events[h];
    if (y.fn)
      y.fn === f && (!d || y.once) && (!l || y.context === l) && o(this, h);
    else {
      for (var g = 0, v = [], b = y.length; g < b; g++)
        (y[g].fn !== f || d && !y[g].once || l && y[g].context !== l) && v.push(y[g]);
      v.length ? this._events[h] = v.length === 1 ? v[0] : v : o(this, h);
    }
    return this;
  }, u.prototype.removeAllListeners = function(s) {
    var f;
    return s ? (f = r ? r + s : s, this._events[f] && o(this, f)) : (this._events = new n(), this._eventsCount = 0), this;
  }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = r, u.EventEmitter = u, e.exports = u;
})(Iv);
var _L = Iv.exports;
const $L = /* @__PURE__ */ ie(_L);
var bo = new $L(), xo = "recharts.syncMouseEvents";
function Un(e) {
  "@babel/helpers - typeof";
  return Un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Un(e);
}
function PL(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function kd(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Cv(n.key), n);
  }
}
function TL(e, t, r) {
  return t && kd(e.prototype, t), r && kd(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function wo(e, t, r) {
  return t = Cv(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Cv(e) {
  var t = EL(e, "string");
  return Un(t) === "symbol" ? t : String(t);
}
function EL(e, t) {
  if (Un(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Un(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ML = /* @__PURE__ */ function() {
  function e() {
    PL(this, e), wo(this, "activeIndex", 0), wo(this, "coordinateList", []), wo(this, "layout", "horizontal");
  }
  return TL(e, [{
    key: "setDetails",
    value: function(r) {
      var n, a = r.coordinateList, i = a === void 0 ? null : a, o = r.container, u = o === void 0 ? null : o, c = r.layout, s = c === void 0 ? null : c, f = r.offset, l = f === void 0 ? null : f, d = r.mouseHandlerCallback, h = d === void 0 ? null : d;
      this.coordinateList = (n = i ?? this.coordinateList) !== null && n !== void 0 ? n : [], this.container = u ?? this.container, this.layout = s ?? this.layout, this.offset = l ?? this.offset, this.mouseHandlerCallback = h ?? this.mouseHandlerCallback, this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.coordinateList.length - 1);
    }
  }, {
    key: "focus",
    value: function() {
      this.spoofMouse();
    }
  }, {
    key: "keyboardEvent",
    value: function(r) {
      if (this.coordinateList.length !== 0)
        switch (r.key) {
          case "ArrowRight": {
            if (this.layout !== "horizontal")
              return;
            this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1), this.spoofMouse();
            break;
          }
          case "ArrowLeft": {
            if (this.layout !== "horizontal")
              return;
            this.activeIndex = Math.max(this.activeIndex - 1, 0), this.spoofMouse();
            break;
          }
        }
    }
  }, {
    key: "setIndex",
    value: function(r) {
      this.activeIndex = r;
    }
  }, {
    key: "spoofMouse",
    value: function() {
      var r, n;
      if (this.layout === "horizontal" && this.coordinateList.length !== 0) {
        var a = this.container.getBoundingClientRect(), i = a.x, o = a.y, u = a.height, c = this.coordinateList[this.activeIndex].coordinate, s = ((r = window) === null || r === void 0 ? void 0 : r.scrollX) || 0, f = ((n = window) === null || n === void 0 ? void 0 : n.scrollY) || 0, l = i + c + s, d = o + this.offset.top + u / 2 + f;
        this.mouseHandlerCallback({
          pageX: l,
          pageY: d
        });
      }
    }
  }]), e;
}();
function jL(e, t, r) {
  if (r === "number" && t === !0 && Array.isArray(e)) {
    var n = e == null ? void 0 : e[0], a = e == null ? void 0 : e[1];
    if (n && a && L(n) && L(a))
      return !0;
  }
  return !1;
}
function IL(e, t, r, n) {
  var a = n / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - a : r.left + 0.5,
    y: e === "horizontal" ? r.top + 0.5 : t.y - a,
    width: e === "horizontal" ? n : r.width - 1,
    height: e === "horizontal" ? r.height - 1 : n
  };
}
function kv(e) {
  var t = e.cx, r = e.cy, n = e.radius, a = e.startAngle, i = e.endAngle, o = ce(t, r, n, a), u = ce(t, r, n, i);
  return {
    points: [o, u],
    cx: t,
    cy: r,
    radius: n,
    startAngle: a,
    endAngle: i
  };
}
function CL(e, t, r) {
  var n, a, i, o;
  if (e === "horizontal")
    n = t.x, i = n, a = r.top, o = r.top + r.height;
  else if (e === "vertical")
    a = t.y, o = a, n = r.left, i = r.left + r.width;
  else if (t.cx != null && t.cy != null)
    if (e === "centric") {
      var u = t.cx, c = t.cy, s = t.innerRadius, f = t.outerRadius, l = t.angle, d = ce(u, c, s, l), h = ce(u, c, f, l);
      n = d.x, a = d.y, i = h.x, o = h.y;
    } else
      return kv(t);
  return [{
    x: n,
    y: a
  }, {
    x: i,
    y: o
  }];
}
function Wn(e) {
  "@babel/helpers - typeof";
  return Wn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wn(e);
}
function Nd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function va(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Nd(Object(r), !0).forEach(function(n) {
      kL(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Nd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function kL(e, t, r) {
  return t = NL(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function NL(e) {
  var t = DL(e, "string");
  return Wn(t) === "symbol" ? t : String(t);
}
function DL(e, t) {
  if (Wn(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Wn(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function RL(e) {
  var t = e.element, r = e.tooltipEventType, n = e.isActive, a = e.activeCoordinate, i = e.activePayload, o = e.offset, u = e.activeTooltipIndex, c = e.tooltipAxisBandSize, s = e.layout, f = e.chartName;
  if (!t || !t.props.cursor || !n || !a || f !== "ScatterChart" && r !== "axis")
    return null;
  var l, d = _u;
  if (f === "ScatterChart")
    l = a, d = q2;
  else if (f === "BarChart")
    l = IL(s, a, o, c), d = Uc;
  else if (s === "radial") {
    var h = kv(a), y = h.cx, g = h.cy, v = h.radius, b = h.startAngle, x = h.endAngle;
    l = {
      cx: y,
      cy: g,
      startAngle: b,
      endAngle: x,
      innerRadius: v,
      outerRadius: v
    }, d = vv;
  } else
    l = {
      points: CL(s, a, o)
    }, d = _u;
  var w = va(va(va(va({
    stroke: "#ccc",
    pointerEvents: "none"
  }, o), l), X(t.props.cursor, !1)), {}, {
    payload: i,
    payloadIndex: u,
    className: "recharts-tooltip-cursor"
  });
  return /* @__PURE__ */ at(t.props.cursor) ? /* @__PURE__ */ ge(t.props.cursor, w) : /* @__PURE__ */ zd(d, w);
}
var LL = ["item"], BL = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function Tr(e) {
  "@babel/helpers - typeof";
  return Tr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Tr(e);
}
function an() {
  return an = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, an.apply(this, arguments);
}
function Dd(e, t) {
  return WL(e) || UL(e, t) || Nv(e, t) || FL();
}
function FL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function UL(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, i, o, u = [], c = !0, s = !1;
    try {
      if (i = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r)
          return;
        c = !1;
      } else
        for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); c = !0)
          ;
    } catch (f) {
      s = !0, a = f;
    } finally {
      try {
        if (!c && r.return != null && (o = r.return(), Object(o) !== o))
          return;
      } finally {
        if (s)
          throw a;
      }
    }
    return u;
  }
}
function WL(e) {
  if (Array.isArray(e))
    return e;
}
function Rd(e, t) {
  if (e == null)
    return {};
  var r = qL(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function qL(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
function zL(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Ld(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Dv(n.key), n);
  }
}
function HL(e, t, r) {
  return t && Ld(e.prototype, t), r && Ld(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function KL(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Lu(e, t);
}
function Lu(e, t) {
  return Lu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, Lu(e, t);
}
function GL(e) {
  var t = VL();
  return function() {
    var n = si(e), a;
    if (t) {
      var i = si(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return XL(this, a);
  };
}
function XL(e, t) {
  if (t && (Tr(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Z(e);
}
function Z(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function VL() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function si(e) {
  return si = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, si(e);
}
function Er(e) {
  return JL(e) || ZL(e) || Nv(e) || YL();
}
function YL() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Nv(e, t) {
  if (e) {
    if (typeof e == "string")
      return Bu(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Bu(e, t);
  }
}
function ZL(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function JL(e) {
  if (Array.isArray(e))
    return Bu(e);
}
function Bu(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function Bd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function I(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Bd(Object(r), !0).forEach(function(n) {
      W(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Bd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function W(e, t, r) {
  return t = Dv(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Dv(e) {
  var t = QL(e, "string");
  return Tr(t) === "symbol" ? t : String(t);
}
function QL(e, t) {
  if (Tr(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Tr(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var eB = {
  xAxis: ["bottom", "top"],
  yAxis: ["left", "right"]
}, tB = {
  width: "100%",
  height: "100%"
}, Rv = {
  x: 0,
  y: 0
};
function Oo(e) {
  return e;
}
var rB = function(t, r) {
  return r === "horizontal" ? t.x : r === "vertical" ? t.y : r === "centric" ? t.angle : t.radius;
}, nB = function(t, r, n, a) {
  var i = r.find(function(f) {
    return f && f.index === n;
  });
  if (i) {
    if (t === "horizontal")
      return {
        x: i.coordinate,
        y: a.y
      };
    if (t === "vertical")
      return {
        x: a.x,
        y: i.coordinate
      };
    if (t === "centric") {
      var o = i.coordinate, u = a.radius;
      return I(I(I({}, a), ce(a.cx, a.cy, u, o)), {}, {
        angle: o,
        radius: u
      });
    }
    var c = i.coordinate, s = a.angle;
    return I(I(I({}, a), ce(a.cx, a.cy, c, s)), {}, {
      angle: s,
      radius: c
    });
  }
  return Rv;
}, Wi = function(t, r) {
  var n = r.graphicalItems, a = r.dataStartIndex, i = r.dataEndIndex, o = (n ?? []).reduce(function(u, c) {
    var s = c.props.data;
    return s && s.length ? [].concat(Er(u), Er(s)) : u;
  }, []);
  return o.length > 0 ? o : t && t.length && L(a) && L(i) ? t.slice(a, i + 1) : [];
};
function Lv(e) {
  return e === "number" ? [0, "auto"] : void 0;
}
var Fu = function(t, r, n, a) {
  var i = t.graphicalItems, o = t.tooltipAxis, u = Wi(r, t);
  return n < 0 || !i || !i.length || n >= u.length ? null : i.reduce(function(c, s) {
    var f, l = (f = s.props.data) !== null && f !== void 0 ? f : r;
    l && t.dataStartIndex + t.dataEndIndex !== 0 && (l = l.slice(t.dataStartIndex, t.dataEndIndex + 1));
    var d;
    if (o.dataKey && !o.allowDuplicatedCategory) {
      var h = l === void 0 ? u : l;
      d = _o(h, o.dataKey, a);
    } else
      d = l && l[n] || u[n];
    return d ? [].concat(Er(c), [ck(s, d)]) : c;
  }, []);
}, Fd = function(t, r, n, a) {
  var i = a || {
    x: t.chartX,
    y: t.chartY
  }, o = rB(i, n), u = t.orderedTooltipTicks, c = t.tooltipAxis, s = t.tooltipTicks, f = KC(o, u, s, c);
  if (f >= 0 && s) {
    var l = s[f] && s[f].value, d = Fu(t, r, f, l), h = nB(n, u, f, i);
    return {
      activeTooltipIndex: f,
      activeLabel: l,
      activePayload: d,
      activeCoordinate: h
    };
  }
  return null;
}, aB = function(t, r) {
  var n = r.axes, a = r.graphicalItems, i = r.axisType, o = r.axisIdKey, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, f = t.layout, l = t.children, d = t.stackOffset, h = sv(f, i);
  return n.reduce(function(y, g) {
    var v, b = g.props, x = b.type, w = b.dataKey, O = b.allowDataOverflow, p = b.allowDuplicatedCategory, m = b.scale, S = b.ticks, A = b.includeHidden, _ = g.props[o];
    if (y[_])
      return y;
    var M = Wi(t.data, {
      graphicalItems: a.filter(function(q) {
        return q.props[o] === _;
      }),
      dataStartIndex: c,
      dataEndIndex: s
    }), T = M.length, E, k, j;
    jL(g.props.domain, O, x) && (E = bu(g.props.domain, null, O), h && (x === "number" || m !== "auto") && (j = tn(M, w, "category")));
    var C = Lv(x);
    if (!E || E.length === 0) {
      var N, D = (N = g.props.domain) !== null && N !== void 0 ? N : C;
      if (w) {
        if (E = tn(M, w, x), x === "category" && h) {
          var R = wb(E);
          p && R ? (k = E, E = ii(0, T)) : p || (E = Rf(D, E, g).reduce(function(q, fe) {
            return q.indexOf(fe) >= 0 ? q : [].concat(Er(q), [fe]);
          }, []));
        } else if (x === "category")
          p ? E = E.filter(function(q) {
            return q !== "" && !J(q);
          }) : E = Rf(D, E, g).reduce(function(q, fe) {
            return q.indexOf(fe) >= 0 || fe === "" || J(fe) ? q : [].concat(Er(q), [fe]);
          }, []);
        else if (x === "number") {
          var F = ZC(M, a.filter(function(q) {
            return q.props[o] === _ && (A || !q.props.hide);
          }), w, i, f);
          F && (E = F);
        }
        h && (x === "number" || m !== "auto") && (j = tn(M, w, "category"));
      } else
        h ? E = ii(0, T) : u && u[_] && u[_].hasStack && x === "number" ? E = d === "expand" ? [0, 1] : lv(u[_].stackGroups, c, s) : E = cv(M, a.filter(function(q) {
          return q.props[o] === _ && (A || !q.props.hide);
        }), x, f, !0);
      if (x === "number")
        E = Ru(l, E, _, i, S), D && (E = bu(D, E, O));
      else if (x === "category" && D) {
        var H = D, re = E.every(function(q) {
          return H.indexOf(q) >= 0;
        });
        re && (E = H);
      }
    }
    return I(I({}, y), {}, W({}, _, I(I({}, g.props), {}, {
      axisType: i,
      domain: E,
      categoricalDomain: j,
      duplicateDomain: k,
      originalDomain: (v = g.props.domain) !== null && v !== void 0 ? v : C,
      isCategorical: h,
      layout: f
    })));
  }, {});
}, iB = function(t, r) {
  var n = r.graphicalItems, a = r.Axis, i = r.axisType, o = r.axisIdKey, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, f = t.layout, l = t.children, d = Wi(t.data, {
    graphicalItems: n,
    dataStartIndex: c,
    dataEndIndex: s
  }), h = d.length, y = sv(f, i), g = -1;
  return n.reduce(function(v, b) {
    var x = b.props[o], w = Lv("number");
    if (!v[x]) {
      g++;
      var O;
      return y ? O = ii(0, h) : u && u[x] && u[x].hasStack ? (O = lv(u[x].stackGroups, c, s), O = Ru(l, O, x, i)) : (O = bu(w, cv(d, n.filter(function(p) {
        return p.props[o] === x && !p.props.hide;
      }), "number", f), a.defaultProps.allowDataOverflow), O = Ru(l, O, x, i)), I(I({}, v), {}, W({}, x, I(I({
        axisType: i
      }, a.defaultProps), {}, {
        hide: !0,
        orientation: Je(eB, "".concat(i, ".").concat(g % 2), null),
        domain: O,
        originalDomain: w,
        isCategorical: y,
        layout: f
        // specify scale when no Axis
        // scale: isCategorical ? 'band' : 'linear',
      })));
    }
    return v;
  }, {});
}, oB = function(t, r) {
  var n = r.axisType, a = n === void 0 ? "xAxis" : n, i = r.AxisComp, o = r.graphicalItems, u = r.stackGroups, c = r.dataStartIndex, s = r.dataEndIndex, f = t.children, l = "".concat(a, "Id"), d = it(f, i), h = {};
  return d && d.length ? h = aB(t, {
    axes: d,
    graphicalItems: o,
    axisType: a,
    axisIdKey: l,
    stackGroups: u,
    dataStartIndex: c,
    dataEndIndex: s
  }) : o && o.length && (h = iB(t, {
    Axis: i,
    graphicalItems: o,
    axisType: a,
    axisIdKey: l,
    stackGroups: u,
    dataStartIndex: c,
    dataEndIndex: s
  })), h;
}, uB = function(t) {
  var r = Pt(t), n = Jr(r, !1, !0);
  return {
    tooltipTicks: n,
    orderedTooltipTicks: lc(n, function(a) {
      return a.coordinate;
    }),
    tooltipAxis: r,
    tooltipAxisBandSize: xu(r, n)
  };
}, Ud = function(t) {
  var r = t.children, n = t.defaultShowTooltip, a = We(r, Pr), i = 0, o = 0;
  return t.data && t.data.length !== 0 && (o = t.data.length - 1), a && a.props && (a.props.startIndex >= 0 && (i = a.props.startIndex), a.props.endIndex >= 0 && (o = a.props.endIndex)), {
    chartX: 0,
    chartY: 0,
    dataStartIndex: i,
    dataEndIndex: o,
    activeTooltipIndex: -1,
    isTooltipActive: !!n
  };
}, cB = function(t) {
  return !t || !t.length ? !1 : t.some(function(r) {
    var n = vt(r && r.type);
    return n && n.indexOf("Bar") >= 0;
  });
}, Wd = function(t) {
  return t === "horizontal" ? {
    numericAxisName: "yAxis",
    cateAxisName: "xAxis"
  } : t === "vertical" ? {
    numericAxisName: "xAxis",
    cateAxisName: "yAxis"
  } : t === "centric" ? {
    numericAxisName: "radiusAxis",
    cateAxisName: "angleAxis"
  } : {
    numericAxisName: "angleAxis",
    cateAxisName: "radiusAxis"
  };
}, sB = function(t, r) {
  var n = t.props, a = t.graphicalItems, i = t.xAxisMap, o = i === void 0 ? {} : i, u = t.yAxisMap, c = u === void 0 ? {} : u, s = n.width, f = n.height, l = n.children, d = n.margin || {}, h = We(l, Pr), y = We(l, cn), g = Object.keys(c).reduce(function(p, m) {
    var S = c[m], A = S.orientation;
    return !S.mirror && !S.hide ? I(I({}, p), {}, W({}, A, p[A] + S.width)) : p;
  }, {
    left: d.left || 0,
    right: d.right || 0
  }), v = Object.keys(o).reduce(function(p, m) {
    var S = o[m], A = S.orientation;
    return !S.mirror && !S.hide ? I(I({}, p), {}, W({}, A, Je(p, "".concat(A)) + S.height)) : p;
  }, {
    top: d.top || 0,
    bottom: d.bottom || 0
  }), b = I(I({}, v), g), x = b.bottom;
  h && (b.bottom += h.props.height || Pr.defaultProps.height), y && r && (b = VC(b, a, n, r));
  var w = s - b.left - b.right, O = f - b.top - b.bottom;
  return I(I({
    brushBottom: x
  }, b), {}, {
    // never return negative values for height and width
    width: Math.max(w, 0),
    height: Math.max(O, 0)
  });
}, lB = function(t) {
  var r, n = t.chartName, a = t.GraphicalChild, i = t.defaultTooltipEventType, o = i === void 0 ? "axis" : i, u = t.validateTooltipEventTypes, c = u === void 0 ? ["axis"] : u, s = t.axisComponents, f = t.legendContent, l = t.formatAxisMap, d = t.defaultProps, h = function(v, b) {
    var x = b.graphicalItems, w = b.stackGroups, O = b.offset, p = b.updateId, m = b.dataStartIndex, S = b.dataEndIndex, A = v.barSize, _ = v.layout, M = v.barGap, T = v.barCategoryGap, E = v.maxBarSize, k = Wd(_), j = k.numericAxisName, C = k.cateAxisName, N = cB(x), D = N && GC({
      barSize: A,
      stackGroups: w
    }), R = [];
    return x.forEach(function(F, H) {
      var re = Wi(v.data, {
        graphicalItems: [F],
        dataStartIndex: m,
        dataEndIndex: S
      }), q = F.props, fe = q.dataKey, Le = q.maxBarSize, Pe = F.props["".concat(j, "Id")], $t = F.props["".concat(C, "Id")], Nt = {}, Te = s.reduce(function(Rt, ft) {
        var qi, zi, ea, Hi = b["".concat(ft.axisType, "Map")], Kc = F.props["".concat(ft.axisType, "Id")];
        Hi && Hi[Kc] || ft.axisType === "zAxis" || (process.env.NODE_ENV !== "production" ? He(!1, "Specifying a(n) ".concat(ft.axisType, "Id requires a corresponding ").concat(
          ft.axisType,
          "Id on the targeted graphical component "
        ).concat((qi = F == null || (zi = F.type) === null || zi === void 0 ? void 0 : zi.displayName) !== null && qi !== void 0 ? qi : "")) : He(!1));
        var Gc = Hi[Kc];
        return I(I({}, Rt), {}, (ea = {}, W(ea, ft.axisType, Gc), W(ea, "".concat(ft.axisType, "Ticks"), Jr(Gc)), ea));
      }, Nt), B = Te[C], z = Te["".concat(C, "Ticks")], K = w && w[Pe] && w[Pe].hasStack && ok(F, w[Pe].stackGroups), P = vt(F.type).indexOf("Bar") >= 0, oe = xu(B, z), V = [];
      if (P) {
        var de, be, Ce = J(Le) ? E : Le, et = (de = (be = xu(B, z, !0)) !== null && be !== void 0 ? be : Ce) !== null && de !== void 0 ? de : 0;
        V = XC({
          barGap: M,
          barCategoryGap: T,
          bandSize: et !== oe ? et : oe,
          sizeList: D[$t],
          maxBarSize: Ce
        }), et !== oe && (V = V.map(function(Rt) {
          return I(I({}, Rt), {}, {
            position: I(I({}, Rt.position), {}, {
              offset: Rt.position.offset - et / 2
            })
          });
        }));
      }
      var Qn = F && F.type && F.type.getComposedData;
      if (Qn) {
        var Dt;
        R.push({
          props: I(I({}, Qn(I(I({}, Te), {}, {
            displayedData: re,
            props: v,
            dataKey: fe,
            item: F,
            bandSize: oe,
            barPosition: V,
            offset: O,
            stackedData: K,
            layout: _,
            dataStartIndex: m,
            dataEndIndex: S
          }))), {}, (Dt = {
            key: F.key || "item-".concat(H)
          }, W(Dt, j, Te[j]), W(Dt, C, Te[C]), W(Dt, "animationId", p), Dt)),
          childIndex: Ib(F, v.children),
          item: F
        });
      }
    }), R;
  }, y = function(v, b) {
    var x = v.props, w = v.dataStartIndex, O = v.dataEndIndex, p = v.updateId;
    if (!ls({
      props: x
    }))
      return null;
    var m = x.children, S = x.layout, A = x.stackOffset, _ = x.data, M = x.reverseStackOrder, T = Wd(S), E = T.numericAxisName, k = T.cateAxisName, j = it(m, a), C = ak(_, j, "".concat(E, "Id"), "".concat(k, "Id"), A, M), N = s.reduce(function(re, q) {
      var fe = "".concat(q.axisType, "Map");
      return I(I({}, re), {}, W({}, fe, oB(x, I(I({}, q), {}, {
        graphicalItems: j,
        stackGroups: q.axisType === E && C,
        dataStartIndex: w,
        dataEndIndex: O
      }))));
    }, {}), D = sB(I(I({}, N), {}, {
      props: x,
      graphicalItems: j
    }), b == null ? void 0 : b.legendBBox);
    Object.keys(N).forEach(function(re) {
      N[re] = l(x, N[re], D, re.replace("Map", ""), n);
    });
    var R = N["".concat(k, "Map")], F = uB(R), H = h(x, I(I({}, N), {}, {
      dataStartIndex: w,
      dataEndIndex: O,
      updateId: p,
      graphicalItems: j,
      stackGroups: C,
      offset: D
    }));
    return I(I({
      formattedGraphicalItems: H,
      graphicalItems: j,
      offset: D,
      stackGroups: C
    }, F), N);
  };
  return r = /* @__PURE__ */ function(g) {
    KL(b, g);
    var v = GL(b);
    function b(x) {
      var w, O, p;
      return zL(this, b), p = v.call(this, x), W(Z(p), "eventEmitterSymbol", Symbol("rechartsEventEmitter")), W(Z(p), "accessibilityManager", new ML()), W(Z(p), "handleLegendBBoxUpdate", function(m) {
        if (m) {
          var S = p.state, A = S.dataStartIndex, _ = S.dataEndIndex, M = S.updateId;
          p.setState(I({
            legendBBox: m
          }, y({
            props: p.props,
            dataStartIndex: A,
            dataEndIndex: _,
            updateId: M
          }, I(I({}, p.state), {}, {
            legendBBox: m
          }))));
        }
      }), W(Z(p), "handleReceiveSyncEvent", function(m, S, A) {
        if (p.props.syncId === m) {
          if (A === p.eventEmitterSymbol && typeof p.props.syncMethod != "function")
            return;
          p.applySyncEvent(S);
        }
      }), W(Z(p), "handleBrushChange", function(m) {
        var S = m.startIndex, A = m.endIndex;
        if (S !== p.state.dataStartIndex || A !== p.state.dataEndIndex) {
          var _ = p.state.updateId;
          p.setState(function() {
            return I({
              dataStartIndex: S,
              dataEndIndex: A
            }, y({
              props: p.props,
              dataStartIndex: S,
              dataEndIndex: A,
              updateId: _
            }, p.state));
          }), p.triggerSyncEvent({
            dataStartIndex: S,
            dataEndIndex: A
          });
        }
      }), W(Z(p), "handleMouseEnter", function(m) {
        var S = p.getMouseInfo(m);
        if (S) {
          var A = I(I({}, S), {}, {
            isTooltipActive: !0
          });
          p.setState(A), p.triggerSyncEvent(A);
          var _ = p.props.onMouseEnter;
          Y(_) && _(A, m);
        }
      }), W(Z(p), "triggeredAfterMouseMove", function(m) {
        var S = p.getMouseInfo(m), A = S ? I(I({}, S), {}, {
          isTooltipActive: !0
        }) : {
          isTooltipActive: !1
        };
        p.setState(A), p.triggerSyncEvent(A);
        var _ = p.props.onMouseMove;
        Y(_) && _(A, m);
      }), W(Z(p), "handleItemMouseEnter", function(m) {
        p.setState(function() {
          return {
            isTooltipActive: !0,
            activeItem: m,
            activePayload: m.tooltipPayload,
            activeCoordinate: m.tooltipPosition || {
              x: m.cx,
              y: m.cy
            }
          };
        });
      }), W(Z(p), "handleItemMouseLeave", function() {
        p.setState(function() {
          return {
            isTooltipActive: !1
          };
        });
      }), W(Z(p), "handleMouseMove", function(m) {
        m.persist(), p.throttleTriggeredAfterMouseMove(m);
      }), W(Z(p), "handleMouseLeave", function(m) {
        var S = {
          isTooltipActive: !1
        };
        p.setState(S), p.triggerSyncEvent(S);
        var A = p.props.onMouseLeave;
        Y(A) && A(S, m);
      }), W(Z(p), "handleOuterEvent", function(m) {
        var S = jb(m), A = Je(p.props, "".concat(S));
        if (S && Y(A)) {
          var _, M;
          /.*touch.*/i.test(S) ? M = p.getMouseInfo(m.changedTouches[0]) : M = p.getMouseInfo(m), A((_ = M) !== null && _ !== void 0 ? _ : {}, m);
        }
      }), W(Z(p), "handleClick", function(m) {
        var S = p.getMouseInfo(m);
        if (S) {
          var A = I(I({}, S), {}, {
            isTooltipActive: !0
          });
          p.setState(A), p.triggerSyncEvent(A);
          var _ = p.props.onClick;
          Y(_) && _(A, m);
        }
      }), W(Z(p), "handleMouseDown", function(m) {
        var S = p.props.onMouseDown;
        if (Y(S)) {
          var A = p.getMouseInfo(m);
          S(A, m);
        }
      }), W(Z(p), "handleMouseUp", function(m) {
        var S = p.props.onMouseUp;
        if (Y(S)) {
          var A = p.getMouseInfo(m);
          S(A, m);
        }
      }), W(Z(p), "handleTouchMove", function(m) {
        m.changedTouches != null && m.changedTouches.length > 0 && p.throttleTriggeredAfterMouseMove(m.changedTouches[0]);
      }), W(Z(p), "handleTouchStart", function(m) {
        m.changedTouches != null && m.changedTouches.length > 0 && p.handleMouseDown(m.changedTouches[0]);
      }), W(Z(p), "handleTouchEnd", function(m) {
        m.changedTouches != null && m.changedTouches.length > 0 && p.handleMouseUp(m.changedTouches[0]);
      }), W(Z(p), "triggerSyncEvent", function(m) {
        p.props.syncId !== void 0 && bo.emit(xo, p.props.syncId, m, p.eventEmitterSymbol);
      }), W(Z(p), "applySyncEvent", function(m) {
        var S = p.props, A = S.layout, _ = S.syncMethod, M = p.state.updateId, T = m.dataStartIndex, E = m.dataEndIndex;
        if (m.dataStartIndex !== void 0 || m.dataEndIndex !== void 0)
          p.setState(I({
            dataStartIndex: T,
            dataEndIndex: E
          }, y({
            props: p.props,
            dataStartIndex: T,
            dataEndIndex: E,
            updateId: M
          }, p.state)));
        else if (m.activeTooltipIndex !== void 0) {
          var k = m.chartX, j = m.chartY, C = m.activeTooltipIndex, N = p.state, D = N.offset, R = N.tooltipTicks;
          if (!D)
            return;
          if (typeof _ == "function")
            C = _(R, m);
          else if (_ === "value") {
            C = -1;
            for (var F = 0; F < R.length; F++)
              if (R[F].value === m.activeLabel) {
                C = F;
                break;
              }
          }
          var H = I(I({}, D), {}, {
            x: D.left,
            y: D.top
          }), re = Math.min(k, H.x + H.width), q = Math.min(j, H.y + H.height), fe = R[C] && R[C].value, Le = Fu(p.state, p.props.data, C), Pe = R[C] ? {
            x: A === "horizontal" ? R[C].coordinate : re,
            y: A === "horizontal" ? q : R[C].coordinate
          } : Rv;
          p.setState(I(I({}, m), {}, {
            activeLabel: fe,
            activeCoordinate: Pe,
            activePayload: Le,
            activeTooltipIndex: C
          }));
        } else
          p.setState(m);
      }), W(Z(p), "renderCursor", function(m) {
        var S, A = p.state, _ = A.isTooltipActive, M = A.activeCoordinate, T = A.activePayload, E = A.offset, k = A.activeTooltipIndex, j = A.tooltipAxisBandSize, C = p.getTooltipEventType(), N = (S = m.props.active) !== null && S !== void 0 ? S : _, D = p.props.layout, R = m.key || "_recharts-cursor";
        return /* @__PURE__ */ $.createElement(RL, {
          key: R,
          activeCoordinate: M,
          activePayload: T,
          activeTooltipIndex: k,
          chartName: n,
          element: m,
          isActive: N,
          layout: D,
          offset: E,
          tooltipAxisBandSize: j,
          tooltipEventType: C
        });
      }), W(Z(p), "renderPolarAxis", function(m, S, A) {
        var _ = Je(m, "type.axisType"), M = Je(p.state, "".concat(_, "Map")), T = M && M[m.props["".concat(_, "Id")]];
        return /* @__PURE__ */ ge(m, I(I({}, T), {}, {
          className: _,
          key: m.key || "".concat(S, "-").concat(A),
          ticks: Jr(T, !0)
        }));
      }), W(Z(p), "renderGrid", function(m) {
        var S = p.state, A = S.xAxisMap, _ = S.yAxisMap, M = S.offset, T = Pt(A), E = xL(_, function(C) {
          return Sv(C.domain, Number.isFinite);
        }), k = E || Pt(_), j = m.props || {};
        return /* @__PURE__ */ ge(m, {
          key: m.key || "grid",
          x: L(j.x) ? j.x : M.left,
          y: L(j.y) ? j.y : M.top,
          width: L(j.width) ? j.width : M.width,
          height: L(j.height) ? j.height : M.height,
          xAxis: T,
          yAxis: k,
          verticalCoordinatesGenerator: j.verticalCoordinatesGenerator,
          horizontalCoordinatesGenerator: j.horizontalCoordinatesGenerator
        });
      }), W(Z(p), "renderPolarGrid", function(m) {
        var S = m.props, A = S.radialLines, _ = S.polarAngles, M = S.polarRadius, T = p.state, E = T.radiusAxisMap, k = T.angleAxisMap, j = Pt(E), C = Pt(k), N = C.cx, D = C.cy, R = C.innerRadius, F = C.outerRadius;
        return /* @__PURE__ */ ge(m, {
          polarAngles: Array.isArray(_) ? _ : Jr(C, !0).map(function(H) {
            return H.coordinate;
          }),
          polarRadius: Array.isArray(M) ? M : Jr(j, !0).map(function(H) {
            return H.coordinate;
          }),
          cx: N,
          cy: D,
          innerRadius: R,
          outerRadius: F,
          key: m.key || "polar-grid",
          radialLines: A
        });
      }), W(Z(p), "renderLegend", function() {
        var m = p.state.formattedGraphicalItems, S = p.props, A = S.children, _ = S.width, M = S.height, T = p.props.margin || {}, E = _ - (T.left || 0) - (T.right || 0), k = ov({
          children: A,
          formattedGraphicalItems: m,
          legendWidth: E,
          legendContent: f
        });
        if (!k)
          return null;
        var j = k.item, C = Rd(k, LL);
        return /* @__PURE__ */ ge(j, I(I({}, C), {}, {
          chartWidth: _,
          chartHeight: M,
          margin: T,
          onBBoxUpdate: p.handleLegendBBoxUpdate
        }));
      }), W(Z(p), "renderTooltip", function() {
        var m, S = p.props.children, A = We(S, rt);
        if (!A)
          return null;
        var _ = p.state, M = _.isTooltipActive, T = _.activeCoordinate, E = _.activePayload, k = _.activeLabel, j = _.offset, C = (m = A.props.active) !== null && m !== void 0 ? m : M;
        return /* @__PURE__ */ ge(A, {
          viewBox: I(I({}, j), {}, {
            x: j.left,
            y: j.top
          }),
          active: C,
          label: k,
          payload: C ? E : [],
          coordinate: T
        });
      }), W(Z(p), "renderBrush", function(m) {
        var S = p.props, A = S.margin, _ = S.data, M = p.state, T = M.offset, E = M.dataStartIndex, k = M.dataEndIndex, j = M.updateId;
        return /* @__PURE__ */ ge(m, {
          key: m.key || "_recharts-brush",
          onChange: fa(p.handleBrushChange, m.props.onChange),
          data: _,
          x: L(m.props.x) ? m.props.x : T.left,
          y: L(m.props.y) ? m.props.y : T.top + T.height + T.brushBottom - (A.bottom || 0),
          width: L(m.props.width) ? m.props.width : T.width,
          startIndex: E,
          endIndex: k,
          updateId: "brush-".concat(j)
        });
      }), W(Z(p), "renderReferenceElement", function(m, S, A) {
        if (!m)
          return null;
        var _ = Z(p), M = _.clipPathId, T = p.state, E = T.xAxisMap, k = T.yAxisMap, j = T.offset, C = m.props, N = C.xAxisId, D = C.yAxisId;
        return /* @__PURE__ */ ge(m, {
          key: m.key || "".concat(S, "-").concat(A),
          xAxis: E[N],
          yAxis: k[D],
          viewBox: {
            x: j.left,
            y: j.top,
            width: j.width,
            height: j.height
          },
          clipPathId: M
        });
      }), W(Z(p), "renderActivePoints", function(m) {
        var S = m.item, A = m.activePoint, _ = m.basePoint, M = m.childIndex, T = m.isRange, E = [], k = S.props.key, j = S.item.props, C = j.activeDot, N = j.dataKey, D = I(I({
          index: M,
          dataKey: N,
          cx: A.x,
          cy: A.y,
          r: 4,
          fill: Fc(S.item),
          strokeWidth: 2,
          stroke: "#fff",
          payload: A.payload,
          value: A.value,
          key: "".concat(k, "-activePoint-").concat(M)
        }, X(C, !1)), xa(C));
        return E.push(b.renderActiveDot(C, D)), _ ? E.push(b.renderActiveDot(C, I(I({}, D), {}, {
          cx: _.x,
          cy: _.y,
          key: "".concat(k, "-basePoint-").concat(M)
        }))) : T && E.push(null), E;
      }), W(Z(p), "renderGraphicChild", function(m, S, A) {
        var _ = p.filterFormatItem(m, S, A);
        if (!_)
          return null;
        var M = p.getTooltipEventType(), T = p.state, E = T.isTooltipActive, k = T.tooltipAxis, j = T.activeTooltipIndex, C = T.activeLabel, N = p.props.children, D = We(N, rt), R = _.props, F = R.points, H = R.isRange, re = R.baseLine, q = _.item.props, fe = q.activeDot, Le = q.hide, Pe = q.activeBar, $t = q.activeShape, Nt = !!(!Le && E && D && (fe || Pe || $t)), Te = {};
        M !== "axis" && D && D.props.trigger === "click" ? Te = {
          onClick: fa(p.handleItemMouseEnter, m.props.onClick)
        } : M !== "axis" && (Te = {
          onMouseLeave: fa(p.handleItemMouseLeave, m.props.onMouseLeave),
          onMouseEnter: fa(p.handleItemMouseEnter, m.props.onMouseEnter)
        });
        var B = /* @__PURE__ */ ge(m, I(I({}, _.props), Te));
        function z(ft) {
          return typeof k.dataKey == "function" ? k.dataKey(ft.payload) : null;
        }
        if (Nt)
          if (j >= 0) {
            var K, P;
            if (k.dataKey && !k.allowDuplicatedCategory) {
              var oe = typeof k.dataKey == "function" ? z : "payload.".concat(k.dataKey.toString());
              K = _o(F, oe, C), P = H && re && _o(re, oe, C);
            } else
              K = F == null ? void 0 : F[j], P = H && re && re[j];
            if ($t || Pe) {
              var V = m.props.activeIndex !== void 0 ? m.props.activeIndex : j;
              return [/* @__PURE__ */ ge(m, I(I(I({}, _.props), Te), {}, {
                activeIndex: V
              })), null, null];
            }
            if (!J(K))
              return [B].concat(Er(p.renderActivePoints({
                item: _,
                activePoint: K,
                basePoint: P,
                childIndex: j,
                isRange: H
              })));
          } else {
            var de, be = (de = p.getItemByXY(p.state.activeCoordinate)) !== null && de !== void 0 ? de : {
              graphicalItem: B
            }, Ce = be.graphicalItem, et = Ce.item, Qn = et === void 0 ? m : et, Dt = Ce.childIndex, Rt = I(I(I({}, _.props), Te), {}, {
              activeIndex: Dt
            });
            return [/* @__PURE__ */ ge(Qn, Rt), null, null];
          }
        return H ? [B, null, null] : [B, null];
      }), W(Z(p), "renderCustomized", function(m, S, A) {
        return /* @__PURE__ */ ge(m, I(I({
          key: "recharts-customized-".concat(A)
        }, p.props), p.state));
      }), W(Z(p), "renderMap", {
        CartesianGrid: {
          handler: p.renderGrid,
          once: !0
        },
        ReferenceArea: {
          handler: p.renderReferenceElement
        },
        ReferenceLine: {
          handler: Oo
        },
        ReferenceDot: {
          handler: p.renderReferenceElement
        },
        XAxis: {
          handler: Oo
        },
        YAxis: {
          handler: Oo
        },
        Brush: {
          handler: p.renderBrush,
          once: !0
        },
        Bar: {
          handler: p.renderGraphicChild
        },
        Line: {
          handler: p.renderGraphicChild
        },
        Area: {
          handler: p.renderGraphicChild
        },
        Radar: {
          handler: p.renderGraphicChild
        },
        RadialBar: {
          handler: p.renderGraphicChild
        },
        Scatter: {
          handler: p.renderGraphicChild
        },
        Pie: {
          handler: p.renderGraphicChild
        },
        Funnel: {
          handler: p.renderGraphicChild
        },
        Tooltip: {
          handler: p.renderCursor,
          once: !0
        },
        PolarGrid: {
          handler: p.renderPolarGrid,
          once: !0
        },
        PolarAngleAxis: {
          handler: p.renderPolarAxis
        },
        PolarRadiusAxis: {
          handler: p.renderPolarAxis
        },
        Customized: {
          handler: p.renderCustomized
        }
      }), p.clipPathId = "".concat((w = x.id) !== null && w !== void 0 ? w : yi("recharts"), "-clip"), p.throttleTriggeredAfterMouseMove = cp(p.triggeredAfterMouseMove, (O = x.throttleDelay) !== null && O !== void 0 ? O : 1e3 / 60), p.state = {}, p;
    }
    return HL(b, [{
      key: "componentDidMount",
      value: function() {
        var w, O;
        this.addListener(), this.accessibilityManager.setDetails({
          container: this.container,
          offset: {
            left: (w = this.props.margin.left) !== null && w !== void 0 ? w : 0,
            top: (O = this.props.margin.top) !== null && O !== void 0 ? O : 0
          },
          coordinateList: this.state.tooltipTicks,
          mouseHandlerCallback: this.triggeredAfterMouseMove,
          layout: this.props.layout
        }), this.displayDefaultTooltip();
      }
    }, {
      key: "displayDefaultTooltip",
      value: function() {
        var w = this.props, O = w.children, p = w.data, m = w.height, S = w.layout, A = We(O, rt);
        if (A) {
          var _ = A.props.defaultIndex;
          if (!(typeof _ != "number" || _ < 0 || _ > this.state.tooltipTicks.length)) {
            var M = this.state.tooltipTicks[_] && this.state.tooltipTicks[_].value, T = Fu(this.state, p, _, M), E = this.state.tooltipTicks[_].coordinate, k = (this.state.offset.top + m) / 2, j = S === "horizontal", C = j ? {
              x: E,
              y: k
            } : {
              y: E,
              x: k
            }, N = this.state.formattedGraphicalItems.find(function(R) {
              var F = R.item;
              return F.type.name === "Scatter";
            });
            N && (C = I(I({}, C), N.props.points[_].tooltipPosition), T = N.props.points[_].tooltipPayload);
            var D = {
              activeTooltipIndex: _,
              isTooltipActive: !0,
              activeLabel: M,
              activePayload: T,
              activeCoordinate: C
            };
            this.setState(D), this.renderCursor(A), this.accessibilityManager.setIndex(_);
          }
        }
      }
    }, {
      key: "getSnapshotBeforeUpdate",
      value: function(w, O) {
        if (!this.props.accessibilityLayer)
          return null;
        if (this.state.tooltipTicks !== O.tooltipTicks && this.accessibilityManager.setDetails({
          coordinateList: this.state.tooltipTicks
        }), this.props.layout !== w.layout && this.accessibilityManager.setDetails({
          layout: this.props.layout
        }), this.props.margin !== w.margin) {
          var p, m;
          this.accessibilityManager.setDetails({
            offset: {
              left: (p = this.props.margin.left) !== null && p !== void 0 ? p : 0,
              top: (m = this.props.margin.top) !== null && m !== void 0 ? m : 0
            }
          });
        }
        return null;
      }
    }, {
      key: "componentDidUpdate",
      value: function(w) {
        To([We(w.children, rt)], [We(this.props.children, rt)]) || this.displayDefaultTooltip();
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.removeListener(), this.throttleTriggeredAfterMouseMove.cancel();
      }
    }, {
      key: "getTooltipEventType",
      value: function() {
        var w = We(this.props.children, rt);
        if (w && typeof w.props.shared == "boolean") {
          var O = w.props.shared ? "axis" : "item";
          return c.indexOf(O) >= 0 ? O : o;
        }
        return o;
      }
      /**
       * Get the information of mouse in chart, return null when the mouse is not in the chart
       * @param  {MousePointer} event    The event object
       * @return {Object}          Mouse data
       */
    }, {
      key: "getMouseInfo",
      value: function(w) {
        if (!this.container)
          return null;
        var O = this.container, p = O.getBoundingClientRect(), m = TE(p), S = {
          chartX: Math.round(w.pageX - m.left),
          chartY: Math.round(w.pageY - m.top)
        }, A = p.width / O.offsetWidth || 1, _ = this.inRange(S.chartX, S.chartY, A);
        if (!_)
          return null;
        var M = this.state, T = M.xAxisMap, E = M.yAxisMap, k = this.getTooltipEventType();
        if (k !== "axis" && T && E) {
          var j = Pt(T).scale, C = Pt(E).scale, N = j && j.invert ? j.invert(S.chartX) : null, D = C && C.invert ? C.invert(S.chartY) : null;
          return I(I({}, S), {}, {
            xValue: N,
            yValue: D
          });
        }
        var R = Fd(this.state, this.props.data, this.props.layout, _);
        return R ? I(I({}, S), R) : null;
      }
    }, {
      key: "inRange",
      value: function(w, O) {
        var p = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, m = this.props.layout, S = w / p, A = O / p;
        if (m === "horizontal" || m === "vertical") {
          var _ = this.state.offset, M = S >= _.left && S <= _.left + _.width && A >= _.top && A <= _.top + _.height;
          return M ? {
            x: S,
            y: A
          } : null;
        }
        var T = this.state, E = T.angleAxisMap, k = T.radiusAxisMap;
        if (E && k) {
          var j = Pt(E);
          return Ff({
            x: S,
            y: A
          }, j);
        }
        return null;
      }
    }, {
      key: "parseEventsOfWrapper",
      value: function() {
        var w = this.props.children, O = this.getTooltipEventType(), p = We(w, rt), m = {};
        p && O === "axis" && (p.props.trigger === "click" ? m = {
          onClick: this.handleClick
        } : m = {
          onMouseEnter: this.handleMouseEnter,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onTouchMove: this.handleTouchMove,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        });
        var S = xa(this.props, this.handleOuterEvent);
        return I(I({}, S), m);
      }
    }, {
      key: "addListener",
      value: function() {
        bo.on(xo, this.handleReceiveSyncEvent);
      }
    }, {
      key: "removeListener",
      value: function() {
        bo.removeListener(xo, this.handleReceiveSyncEvent);
      }
    }, {
      key: "filterFormatItem",
      value: function(w, O, p) {
        for (var m = this.state.formattedGraphicalItems, S = 0, A = m.length; S < A; S++) {
          var _ = m[S];
          if (_.item === w || _.props.key === w.key || O === vt(_.item.type) && p === _.childIndex)
            return _;
        }
        return null;
      }
    }, {
      key: "renderClipPath",
      value: function() {
        var w = this.clipPathId, O = this.state.offset, p = O.left, m = O.top, S = O.height, A = O.width;
        return /* @__PURE__ */ $.createElement("defs", null, /* @__PURE__ */ $.createElement("clipPath", {
          id: w
        }, /* @__PURE__ */ $.createElement("rect", {
          x: p,
          y: m,
          height: S,
          width: A
        })));
      }
    }, {
      key: "getXScales",
      value: function() {
        var w = this.state.xAxisMap;
        return w ? Object.entries(w).reduce(function(O, p) {
          var m = Dd(p, 2), S = m[0], A = m[1];
          return I(I({}, O), {}, W({}, S, A.scale));
        }, {}) : null;
      }
    }, {
      key: "getYScales",
      value: function() {
        var w = this.state.yAxisMap;
        return w ? Object.entries(w).reduce(function(O, p) {
          var m = Dd(p, 2), S = m[0], A = m[1];
          return I(I({}, O), {}, W({}, S, A.scale));
        }, {}) : null;
      }
    }, {
      key: "getXScaleByAxisId",
      value: function(w) {
        var O;
        return (O = this.state.xAxisMap) === null || O === void 0 || (O = O[w]) === null || O === void 0 ? void 0 : O.scale;
      }
    }, {
      key: "getYScaleByAxisId",
      value: function(w) {
        var O;
        return (O = this.state.yAxisMap) === null || O === void 0 || (O = O[w]) === null || O === void 0 ? void 0 : O.scale;
      }
    }, {
      key: "getItemByXY",
      value: function(w) {
        var O = this.state, p = O.formattedGraphicalItems, m = O.activeItem;
        if (p && p.length)
          for (var S = 0, A = p.length; S < A; S++) {
            var _ = p[S], M = _.props, T = _.item, E = vt(T.type);
            if (E === "Bar") {
              var k = (M.data || []).find(function(D) {
                return S2(w, D);
              });
              if (k)
                return {
                  graphicalItem: _,
                  payload: k
                };
            } else if (E === "RadialBar") {
              var j = (M.data || []).find(function(D) {
                return Ff(w, D);
              });
              if (j)
                return {
                  graphicalItem: _,
                  payload: j
                };
            } else if (Fi(_, m) || Ui(_, m) || Nn(_, m)) {
              var C = pD({
                graphicalItem: _,
                activeTooltipItem: m,
                itemData: T.props.data
              }), N = T.props.activeIndex === void 0 ? C : T.props.activeIndex;
              return {
                graphicalItem: I(I({}, _), {}, {
                  childIndex: N
                }),
                payload: Nn(_, m) ? T.props.data[C] : _.props.data[C]
              };
            }
          }
        return null;
      }
    }, {
      key: "render",
      value: function() {
        var w = this;
        if (!ls(this))
          return null;
        var O = this.props, p = O.children, m = O.className, S = O.width, A = O.height, _ = O.style, M = O.compact, T = O.title, E = O.desc, k = Rd(O, BL), j = X(k, !1);
        if (M)
          return /* @__PURE__ */ $.createElement(Mo, an({}, j, {
            width: S,
            height: A,
            title: T,
            desc: E
          }), this.renderClipPath(), ds(p, this.renderMap));
        if (this.props.accessibilityLayer) {
          var C, N;
          j.tabIndex = (C = this.props.tabIndex) !== null && C !== void 0 ? C : 0, j.role = (N = this.props.role) !== null && N !== void 0 ? N : "img", j.onKeyDown = function(R) {
            w.accessibilityManager.keyboardEvent(R);
          }, j.onFocus = function() {
            w.accessibilityManager.focus();
          };
        }
        var D = this.parseEventsOfWrapper();
        return /* @__PURE__ */ $.createElement(CR, {
          state: this.state,
          width: this.props.width,
          height: this.props.height,
          clipPathId: this.clipPathId
        }, /* @__PURE__ */ $.createElement("div", an({
          className: ve("recharts-wrapper", m),
          style: I({
            position: "relative",
            cursor: "default",
            width: S,
            height: A
          }, _)
        }, D, {
          ref: function(F) {
            w.container = F;
          },
          role: "region"
        }), /* @__PURE__ */ $.createElement(Mo, an({}, j, {
          width: S,
          height: A,
          title: T,
          desc: E,
          style: tB
        }), this.renderClipPath(), ds(p, this.renderMap)), this.renderLegend(), this.renderTooltip()));
      }
    }]), b;
  }(Wv), W(r, "displayName", n), W(r, "defaultProps", I({
    layout: "horizontal",
    stackOffset: "none",
    barCategoryGap: "10%",
    barGap: 4,
    margin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    reverseStackOrder: !1,
    syncMethod: "index"
  }, d)), W(r, "getDerivedStateFromProps", function(g, v) {
    var b = g.dataKey, x = g.data, w = g.children, O = g.width, p = g.height, m = g.layout, S = g.stackOffset, A = g.margin, _ = v.dataStartIndex, M = v.dataEndIndex;
    if (v.updateId === void 0) {
      var T = Ud(g);
      return I(I(I({}, T), {}, {
        updateId: 0
      }, y(I(I({
        props: g
      }, T), {}, {
        updateId: 0
      }), v)), {}, {
        prevDataKey: b,
        prevData: x,
        prevWidth: O,
        prevHeight: p,
        prevLayout: m,
        prevStackOffset: S,
        prevMargin: A,
        prevChildren: w
      });
    }
    if (b !== v.prevDataKey || x !== v.prevData || O !== v.prevWidth || p !== v.prevHeight || m !== v.prevLayout || S !== v.prevStackOffset || !$o(A, v.prevMargin)) {
      var E = Ud(g), k = {
        // (chartX, chartY) are (0,0) in default state, but we want to keep the last mouse position to avoid
        // any flickering
        chartX: v.chartX,
        chartY: v.chartY,
        // The tooltip should stay active when it was active in the previous render. If this is not
        // the case, the tooltip disappears and immediately re-appears, causing a flickering effect
        isTooltipActive: v.isTooltipActive
      }, j = I(I({}, Fd(v, x, m)), {}, {
        updateId: v.updateId + 1
      }), C = I(I(I({}, E), k), j);
      return I(I(I({}, C), y(I({
        props: g
      }, C), v)), {}, {
        prevDataKey: b,
        prevData: x,
        prevWidth: O,
        prevHeight: p,
        prevLayout: m,
        prevStackOffset: S,
        prevMargin: A,
        prevChildren: w
      });
    }
    if (!To(w, v.prevChildren)) {
      var N, D, R, F, H = We(w, Pr), re = H && (N = (D = H.props) === null || D === void 0 ? void 0 : D.startIndex) !== null && N !== void 0 ? N : _, q = H && (R = (F = H.props) === null || F === void 0 ? void 0 : F.endIndex) !== null && R !== void 0 ? R : M, fe = re !== _ || q !== M, Le = !J(x), Pe = Le && !fe ? v.updateId : v.updateId + 1;
      return I(I({
        updateId: Pe
      }, y(I(I({
        props: g
      }, v), {}, {
        updateId: Pe,
        dataStartIndex: re,
        dataEndIndex: q
      }), v)), {}, {
        prevChildren: w,
        dataStartIndex: re,
        dataEndIndex: q
      });
    }
    return null;
  }), W(r, "renderActiveDot", function(g, v) {
    var b;
    return /* @__PURE__ */ at(g) ? b = /* @__PURE__ */ ge(g, v) : Y(g) ? b = g(v) : b = /* @__PURE__ */ $.createElement(Wc, v), /* @__PURE__ */ $.createElement(ye, {
      className: "recharts-active-dot",
      key: v.key
    }, b);
  }), r;
}, fB = lB({
  chartName: "PieChart",
  GraphicalChild: _t,
  validateTooltipEventTypes: ["item"],
  defaultTooltipEventType: "item",
  legendContent: "children",
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: Bi
  }, {
    axisType: "radiusAxis",
    AxisComp: Ri
  }],
  formatAxisMap: gk,
  defaultProps: {
    layout: "centric",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
});
const yB = ({ pieData: e }) => /* @__PURE__ */ Ee.jsxs(
  "div",
  {
    className: "pieChart",
    style: {
      width: "100%",
      height: 150,
      borderBottom: "1px solid #dcdbdb"
    },
    children: [
      /* @__PURE__ */ Ee.jsx("div", { className: "chart", style: { width: "50%", height: 150 }, children: /* @__PURE__ */ Ee.jsx(wE, { children: /* @__PURE__ */ Ee.jsxs(fB, { children: [
        /* @__PURE__ */ Ee.jsx(
          rt,
          {
            contentStyle: {
              background: "white",
              borderRadius: "5px"
            }
          }
        ),
        e.some((t) => t.value !== 0) ? /* @__PURE__ */ Ee.jsx(
          _t,
          {
            data: e,
            innerRadius: "40%",
            outerRadius: "80%",
            fill: e.some((t) => t.value !== 0) ? "#8884d8" : "#d8d8d8",
            paddingAngle: 5,
            dataKey: "value",
            children: e.map((t) => /* @__PURE__ */ Ee.jsx(hc, { fill: t.color }, t.name))
          }
        ) : null
      ] }) }) }),
      /* @__PURE__ */ Ee.jsx("div", { className: "options", children: e.length > 0 ? /* @__PURE__ */ Ee.jsx(Ee.Fragment, { children: e.map((t) => /* @__PURE__ */ Ee.jsxs("div", { className: "option-items", children: [
        /* @__PURE__ */ Ee.jsxs("div", { className: "pietitle", children: [
          /* @__PURE__ */ Ee.jsx(
            "div",
            {
              className: "dott",
              style: { backgroundColor: t.color }
            }
          ),
          /* @__PURE__ */ Ee.jsx("p", { className: "itemname", children: t.name })
        ] }),
        /* @__PURE__ */ Ee.jsx("p", { className: "itemval", style: { color: t.color }, children: t.value })
      ] }, t.name)) }) : null })
    ]
  }
);
export {
  yB as default
};
