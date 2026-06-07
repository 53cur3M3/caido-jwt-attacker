/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Io(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
const X = {}, Ft = [], Qe = () => {
}, en = () => !1, Kr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Eo = (e) => e.startsWith("onUpdate:"), ye = Object.assign, zo = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, ja = Object.prototype.hasOwnProperty, q = (e, t) => ja.call(e, t), M = Array.isArray, Dt = (e) => mr(e) === "[object Map]", Wr = (e) => mr(e) === "[object Set]", rs = (e) => mr(e) === "[object Date]", V = (e) => typeof e == "function", le = (e) => typeof e == "string", Ze = (e) => typeof e == "symbol", re = (e) => e !== null && typeof e == "object", tn = (e) => (re(e) || V(e)) && V(e.then) && V(e.catch), rn = Object.prototype.toString, mr = (e) => rn.call(e), Aa = (e) => mr(e).slice(8, -1), on = (e) => mr(e) === "[object Object]", Lo = (e) => le(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Zt = /* @__PURE__ */ Io(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ur = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (r) => t[r] || (t[r] = e(r));
}, $a = /-\w/g, mt = Ur(
  (e) => e.replace($a, (t) => t.slice(1).toUpperCase())
), Oa = /\B([A-Z])/g, Ot = Ur(
  (e) => e.replace(Oa, "-$1").toLowerCase()
), sn = Ur((e) => e.charAt(0).toUpperCase() + e.slice(1)), oo = Ur(
  (e) => e ? `on${sn(e)}` : ""
), gt = (e, t) => !Object.is(e, t), Ar = (e, ...t) => {
  for (let r = 0; r < e.length; r++)
    e[r](...t);
}, nn = (e, t, r, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: r
  });
}, mo = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let os;
const Jr = () => os || (os = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Gr(e) {
  if (M(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const o = e[r], s = le(o) ? La(o) : Gr(o);
      if (s)
        for (const n in s)
          t[n] = s[n];
    }
    return t;
  } else if (le(e) || re(e))
    return e;
}
const Ia = /;(?![^(]*\))/g, Ea = /:([^]+)/, za = /\/\*[^]*?\*\//g;
function La(e) {
  const t = {};
  return e.replace(za, "").split(Ia).forEach((r) => {
    if (r) {
      const o = r.split(Ea);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function De(e) {
  let t = "";
  if (le(e))
    t = e;
  else if (M(e))
    for (let r = 0; r < e.length; r++) {
      const o = De(e[r]);
      o && (t += o + " ");
    }
  else if (re(e))
    for (const r in e)
      e[r] && (t += r + " ");
  return t.trim();
}
const Ra = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ma = /* @__PURE__ */ Io(Ra);
function an(e) {
  return !!e || e === "";
}
function Na(e, t) {
  if (e.length !== t.length) return !1;
  let r = !0;
  for (let o = 0; r && o < e.length; o++)
    r = qr(e[o], t[o]);
  return r;
}
function qr(e, t) {
  if (e === t) return !0;
  let r = rs(e), o = rs(t);
  if (r || o)
    return r && o ? e.getTime() === t.getTime() : !1;
  if (r = Ze(e), o = Ze(t), r || o)
    return e === t;
  if (r = M(e), o = M(t), r || o)
    return r && o ? Na(e, t) : !1;
  if (r = re(e), o = re(t), r || o) {
    if (!r || !o)
      return !1;
    const s = Object.keys(e).length, n = Object.keys(t).length;
    if (s !== n)
      return !1;
    for (const a in e) {
      const i = e.hasOwnProperty(a), l = t.hasOwnProperty(a);
      if (i && !l || !i && l || !qr(e[a], t[a]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function ln(e, t) {
  return e.findIndex((r) => qr(r, t));
}
const cn = (e) => !!(e && e.__v_isRef === !0), I = (e) => le(e) ? e : e == null ? "" : M(e) || re(e) && (e.toString === rn || !V(e.toString)) ? cn(e) ? I(e.value) : JSON.stringify(e, un, 2) : String(e), un = (e, t) => cn(t) ? un(e, t.value) : Dt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (r, [o, s], n) => (r[so(o, n) + " =>"] = s, r),
    {}
  )
} : Wr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((r) => so(r))
} : Ze(t) ? so(t) : re(t) && !M(t) && !on(t) ? String(t) : t, so = (e, t = "") => {
  var r;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ze(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e
  );
};
/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let me;
class dn {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = me, !t && me && (this.index = (me.scopes || (me.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, r;
      if (this.scopes)
        for (t = 0, r = this.scopes.length; t < r; t++)
          this.scopes[t].pause();
      for (t = 0, r = this.effects.length; t < r; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, r;
      if (this.scopes)
        for (t = 0, r = this.scopes.length; t < r; t++)
          this.scopes[t].resume();
      for (t = 0, r = this.effects.length; t < r; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const r = me;
      try {
        return me = this, t();
      } finally {
        me = r;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = me, me = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (me = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let r, o;
      for (r = 0, o = this.effects.length; r < o; r++)
        this.effects[r].stop();
      for (this.effects.length = 0, r = 0, o = this.cleanups.length; r < o; r++)
        this.cleanups[r]();
      if (this.cleanups.length = 0, this.scopes) {
        for (r = 0, o = this.scopes.length; r < o; r++)
          this.scopes[r].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function fn(e) {
  return new dn(e);
}
function pn() {
  return me;
}
function Fa(e, t = !1) {
  me && me.cleanups.push(e);
}
let te;
const no = /* @__PURE__ */ new WeakSet();
class bn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, me && me.active && me.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, no.has(this) && (no.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || hn(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ss(this), mn(this);
    const t = te, r = Be;
    te = this, Be = !0;
    try {
      return this.fn();
    } finally {
      xn(this), te = t, Be = r, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        No(t);
      this.deps = this.depsTail = void 0, ss(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? no.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    xo(this) && this.run();
  }
  get dirty() {
    return xo(this);
  }
}
let gn = 0, Xt, er;
function hn(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = er, er = e;
    return;
  }
  e.next = Xt, Xt = e;
}
function Ro() {
  gn++;
}
function Mo() {
  if (--gn > 0)
    return;
  if (er) {
    let t = er;
    for (er = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; Xt; ) {
    let t = Xt;
    for (Xt = void 0; t; ) {
      const r = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (o) {
          e || (e = o);
        }
      t = r;
    }
  }
  if (e) throw e;
}
function mn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function xn(e) {
  let t, r = e.depsTail, o = r;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === r && (r = s), No(o), Da(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = r;
}
function xo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (vn(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function vn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === cr) || (e.globalVersion = cr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !xo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, r = te, o = Be;
  te = e, Be = !0;
  try {
    mn(e);
    const s = e.fn(e._value);
    (t.version === 0 || gt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    te = r, Be = o, xn(e), e.flags &= -3;
  }
}
function No(e, t = !1) {
  const { dep: r, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), r.subs === e && (r.subs = o, !o && r.computed)) {
    r.computed.flags &= -5;
    for (let n = r.computed.deps; n; n = n.nextDep)
      No(n, !0);
  }
  !t && !--r.sc && r.map && r.map.delete(r.key);
}
function Da(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
let Be = !0;
const yn = [];
function it() {
  yn.push(Be), Be = !1;
}
function lt() {
  const e = yn.pop();
  Be = e === void 0 ? !0 : e;
}
function ss(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const r = te;
    te = void 0;
    try {
      t();
    } finally {
      te = r;
    }
  }
}
let cr = 0;
class Va {
  constructor(t, r) {
    this.sub = t, this.dep = r, this.version = r.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Fo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!te || !Be || te === this.computed)
      return;
    let r = this.activeLink;
    if (r === void 0 || r.sub !== te)
      r = this.activeLink = new Va(te, this), te.deps ? (r.prevDep = te.depsTail, te.depsTail.nextDep = r, te.depsTail = r) : te.deps = te.depsTail = r, kn(r);
    else if (r.version === -1 && (r.version = this.version, r.nextDep)) {
      const o = r.nextDep;
      o.prevDep = r.prevDep, r.prevDep && (r.prevDep.nextDep = o), r.prevDep = te.depsTail, r.nextDep = void 0, te.depsTail.nextDep = r, te.depsTail = r, te.deps === r && (te.deps = o);
    }
    return r;
  }
  trigger(t) {
    this.version++, cr++, this.notify(t);
  }
  notify(t) {
    Ro();
    try {
      for (let r = this.subs; r; r = r.prevSub)
        r.sub.notify() && r.sub.dep.notify();
    } finally {
      Mo();
    }
  }
}
function kn(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        kn(o);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), e.dep.subs = e;
  }
}
const Ir = /* @__PURE__ */ new WeakMap(), jt = Symbol(
  ""
), vo = Symbol(
  ""
), ur = Symbol(
  ""
);
function ve(e, t, r) {
  if (Be && te) {
    let o = Ir.get(e);
    o || Ir.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(r);
    s || (o.set(r, s = new Fo()), s.map = o, s.key = r), s.track();
  }
}
function st(e, t, r, o, s, n) {
  const a = Ir.get(e);
  if (!a) {
    cr++;
    return;
  }
  const i = (l) => {
    l && l.trigger();
  };
  if (Ro(), t === "clear")
    a.forEach(i);
  else {
    const l = M(e), u = l && Lo(r);
    if (l && r === "length") {
      const c = Number(o);
      a.forEach((p, g) => {
        (g === "length" || g === ur || !Ze(g) && g >= c) && i(p);
      });
    } else
      switch ((r !== void 0 || a.has(void 0)) && i(a.get(r)), u && i(a.get(ur)), t) {
        case "add":
          l ? u && i(a.get("length")) : (i(a.get(jt)), Dt(e) && i(a.get(vo)));
          break;
        case "delete":
          l || (i(a.get(jt)), Dt(e) && i(a.get(vo)));
          break;
        case "set":
          Dt(e) && i(a.get(jt));
          break;
      }
  }
  Mo();
}
function Ba(e, t) {
  const r = Ir.get(e);
  return r && r.get(t);
}
function Et(e) {
  const t = G(e);
  return t === e ? t : (ve(t, "iterate", ur), Re(e) ? t : t.map(be));
}
function Yr(e) {
  return ve(e = G(e), "iterate", ur), e;
}
const Ha = {
  __proto__: null,
  [Symbol.iterator]() {
    return ao(this, Symbol.iterator, be);
  },
  concat(...e) {
    return Et(this).concat(
      ...e.map((t) => M(t) ? Et(t) : t)
    );
  },
  entries() {
    return ao(this, "entries", (e) => (e[1] = be(e[1]), e));
  },
  every(e, t) {
    return et(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return et(this, "filter", e, t, (r) => r.map(be), arguments);
  },
  find(e, t) {
    return et(this, "find", e, t, be, arguments);
  },
  findIndex(e, t) {
    return et(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return et(this, "findLast", e, t, be, arguments);
  },
  findLastIndex(e, t) {
    return et(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return et(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return io(this, "includes", e);
  },
  indexOf(...e) {
    return io(this, "indexOf", e);
  },
  join(e) {
    return Et(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return io(this, "lastIndexOf", e);
  },
  map(e, t) {
    return et(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Gt(this, "pop");
  },
  push(...e) {
    return Gt(this, "push", e);
  },
  reduce(e, ...t) {
    return ns(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ns(this, "reduceRight", e, t);
  },
  shift() {
    return Gt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return et(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Gt(this, "splice", e);
  },
  toReversed() {
    return Et(this).toReversed();
  },
  toSorted(e) {
    return Et(this).toSorted(e);
  },
  toSpliced(...e) {
    return Et(this).toSpliced(...e);
  },
  unshift(...e) {
    return Gt(this, "unshift", e);
  },
  values() {
    return ao(this, "values", be);
  }
};
function ao(e, t, r) {
  const o = Yr(e), s = o[t]();
  return o !== e && !Re(e) && (s._next = s.next, s.next = () => {
    const n = s._next();
    return n.done || (n.value = r(n.value)), n;
  }), s;
}
const Ka = Array.prototype;
function et(e, t, r, o, s, n) {
  const a = Yr(e), i = a !== e && !Re(e), l = a[t];
  if (l !== Ka[t]) {
    const p = l.apply(e, n);
    return i ? be(p) : p;
  }
  let u = r;
  a !== e && (i ? u = function(p, g) {
    return r.call(this, be(p), g, e);
  } : r.length > 2 && (u = function(p, g) {
    return r.call(this, p, g, e);
  }));
  const c = l.call(a, u, o);
  return i && s ? s(c) : c;
}
function ns(e, t, r, o) {
  const s = Yr(e);
  let n = r;
  return s !== e && (Re(e) ? r.length > 3 && (n = function(a, i, l) {
    return r.call(this, a, i, l, e);
  }) : n = function(a, i, l) {
    return r.call(this, a, be(i), l, e);
  }), s[t](n, ...o);
}
function io(e, t, r) {
  const o = G(e);
  ve(o, "iterate", ur);
  const s = o[t](...r);
  return (s === -1 || s === !1) && Bo(r[0]) ? (r[0] = G(r[0]), o[t](...r)) : s;
}
function Gt(e, t, r = []) {
  it(), Ro();
  const o = G(e)[t].apply(e, r);
  return Mo(), lt(), o;
}
const Wa = /* @__PURE__ */ Io("__proto__,__v_isRef,__isVue"), wn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ze)
);
function Ua(e) {
  Ze(e) || (e = String(e));
  const t = G(this);
  return ve(t, "has", e), t.hasOwnProperty(e);
}
class _n {
  constructor(t = !1, r = !1) {
    this._isReadonly = t, this._isShallow = r;
  }
  get(t, r, o) {
    if (r === "__v_skip") return t.__v_skip;
    const s = this._isReadonly, n = this._isShallow;
    if (r === "__v_isReactive")
      return !s;
    if (r === "__v_isReadonly")
      return s;
    if (r === "__v_isShallow")
      return n;
    if (r === "__v_raw")
      return o === (s ? n ? ri : Pn : n ? Tn : Cn).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const a = M(t);
    if (!s) {
      let l;
      if (a && (l = Ha[r]))
        return l;
      if (r === "hasOwnProperty")
        return Ua;
    }
    const i = Reflect.get(
      t,
      r,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      ie(t) ? t : o
    );
    if ((Ze(r) ? wn.has(r) : Wa(r)) || (s || ve(t, "get", r), n))
      return i;
    if (ie(i)) {
      const l = a && Lo(r) ? i : i.value;
      return s && re(l) ? Er(l) : l;
    }
    return re(i) ? s ? Er(i) : Wt(i) : i;
  }
}
class Sn extends _n {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, r, o, s) {
    let n = t[r];
    if (!this._isShallow) {
      const l = xt(n);
      if (!Re(o) && !xt(o) && (n = G(n), o = G(o)), !M(t) && ie(n) && !ie(o))
        return l || (n.value = o), !0;
    }
    const a = M(t) && Lo(r) ? Number(r) < t.length : q(t, r), i = Reflect.set(
      t,
      r,
      o,
      ie(t) ? t : s
    );
    return t === G(s) && (a ? gt(o, n) && st(t, "set", r, o) : st(t, "add", r, o)), i;
  }
  deleteProperty(t, r) {
    const o = q(t, r);
    t[r];
    const s = Reflect.deleteProperty(t, r);
    return s && o && st(t, "delete", r, void 0), s;
  }
  has(t, r) {
    const o = Reflect.has(t, r);
    return (!Ze(r) || !wn.has(r)) && ve(t, "has", r), o;
  }
  ownKeys(t) {
    return ve(
      t,
      "iterate",
      M(t) ? "length" : jt
    ), Reflect.ownKeys(t);
  }
}
class Ja extends _n {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, r) {
    return !0;
  }
  deleteProperty(t, r) {
    return !0;
  }
}
const Ga = /* @__PURE__ */ new Sn(), qa = /* @__PURE__ */ new Ja(), Ya = /* @__PURE__ */ new Sn(!0);
const yo = (e) => e, _r = (e) => Reflect.getPrototypeOf(e);
function Qa(e, t, r) {
  return function(...o) {
    const s = this.__v_raw, n = G(s), a = Dt(n), i = e === "entries" || e === Symbol.iterator && a, l = e === "keys" && a, u = s[e](...o), c = r ? yo : t ? zr : be;
    return !t && ve(
      n,
      "iterate",
      l ? vo : jt
    ), {
      // iterator protocol
      next() {
        const { value: p, done: g } = u.next();
        return g ? { value: p, done: g } : {
          value: i ? [c(p[0]), c(p[1])] : c(p),
          done: g
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Sr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Za(e, t) {
  const r = {
    get(s) {
      const n = this.__v_raw, a = G(n), i = G(s);
      e || (gt(s, i) && ve(a, "get", s), ve(a, "get", i));
      const { has: l } = _r(a), u = t ? yo : e ? zr : be;
      if (l.call(a, s))
        return u(n.get(s));
      if (l.call(a, i))
        return u(n.get(i));
      n !== a && n.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && ve(G(s), "iterate", jt), s.size;
    },
    has(s) {
      const n = this.__v_raw, a = G(n), i = G(s);
      return e || (gt(s, i) && ve(a, "has", s), ve(a, "has", i)), s === i ? n.has(s) : n.has(s) || n.has(i);
    },
    forEach(s, n) {
      const a = this, i = a.__v_raw, l = G(i), u = t ? yo : e ? zr : be;
      return !e && ve(l, "iterate", jt), i.forEach((c, p) => s.call(n, u(c), u(p), a));
    }
  };
  return ye(
    r,
    e ? {
      add: Sr("add"),
      set: Sr("set"),
      delete: Sr("delete"),
      clear: Sr("clear")
    } : {
      add(s) {
        !t && !Re(s) && !xt(s) && (s = G(s));
        const n = G(this);
        return _r(n).has.call(n, s) || (n.add(s), st(n, "add", s, s)), this;
      },
      set(s, n) {
        !t && !Re(n) && !xt(n) && (n = G(n));
        const a = G(this), { has: i, get: l } = _r(a);
        let u = i.call(a, s);
        u || (s = G(s), u = i.call(a, s));
        const c = l.call(a, s);
        return a.set(s, n), u ? gt(n, c) && st(a, "set", s, n) : st(a, "add", s, n), this;
      },
      delete(s) {
        const n = G(this), { has: a, get: i } = _r(n);
        let l = a.call(n, s);
        l || (s = G(s), l = a.call(n, s)), i && i.call(n, s);
        const u = n.delete(s);
        return l && st(n, "delete", s, void 0), u;
      },
      clear() {
        const s = G(this), n = s.size !== 0, a = s.clear();
        return n && st(
          s,
          "clear",
          void 0,
          void 0
        ), a;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    r[s] = Qa(s, e, t);
  }), r;
}
function Do(e, t) {
  const r = Za(e, t);
  return (o, s, n) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    q(r, s) && s in o ? r : o,
    s,
    n
  );
}
const Xa = {
  get: /* @__PURE__ */ Do(!1, !1)
}, ei = {
  get: /* @__PURE__ */ Do(!1, !0)
}, ti = {
  get: /* @__PURE__ */ Do(!0, !1)
};
const Cn = /* @__PURE__ */ new WeakMap(), Tn = /* @__PURE__ */ new WeakMap(), Pn = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ new WeakMap();
function oi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function si(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oi(Aa(e));
}
function Wt(e) {
  return xt(e) ? e : Vo(
    e,
    !1,
    Ga,
    Xa,
    Cn
  );
}
function ni(e) {
  return Vo(
    e,
    !1,
    Ya,
    ei,
    Tn
  );
}
function Er(e) {
  return Vo(
    e,
    !0,
    qa,
    ti,
    Pn
  );
}
function Vo(e, t, r, o, s) {
  if (!re(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const n = si(e);
  if (n === 0)
    return e;
  const a = s.get(e);
  if (a)
    return a;
  const i = new Proxy(
    e,
    n === 2 ? o : r
  );
  return s.set(e, i), i;
}
function ht(e) {
  return xt(e) ? ht(e.__v_raw) : !!(e && e.__v_isReactive);
}
function xt(e) {
  return !!(e && e.__v_isReadonly);
}
function Re(e) {
  return !!(e && e.__v_isShallow);
}
function Bo(e) {
  return e ? !!e.__v_raw : !1;
}
function G(e) {
  const t = e && e.__v_raw;
  return t ? G(t) : e;
}
function Ho(e) {
  return !q(e, "__v_skip") && Object.isExtensible(e) && nn(e, "__v_skip", !0), e;
}
const be = (e) => re(e) ? Wt(e) : e, zr = (e) => re(e) ? Er(e) : e;
function ie(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ce(e) {
  return ai(e, !1);
}
function ai(e, t) {
  return ie(e) ? e : new ii(e, t);
}
class ii {
  constructor(t, r) {
    this.dep = new Fo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = r ? t : G(t), this._value = r ? t : be(t), this.__v_isShallow = r;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const r = this._rawValue, o = this.__v_isShallow || Re(t) || xt(t);
    t = o ? t : G(t), gt(t, r) && (this._rawValue = t, this._value = o ? t : be(t), this.dep.trigger());
  }
}
function ze(e) {
  return ie(e) ? e.value : e;
}
const li = {
  get: (e, t, r) => t === "__v_raw" ? e : ze(Reflect.get(e, t, r)),
  set: (e, t, r, o) => {
    const s = e[t];
    return ie(s) && !ie(r) ? (s.value = r, !0) : Reflect.set(e, t, r, o);
  }
};
function jn(e) {
  return ht(e) ? e : new Proxy(e, li);
}
function ci(e) {
  const t = M(e) ? new Array(e.length) : {};
  for (const r in e)
    t[r] = di(e, r);
  return t;
}
class ui {
  constructor(t, r, o) {
    this._object = t, this._key = r, this._defaultValue = o, this.__v_isRef = !0, this._value = void 0;
  }
  get value() {
    const t = this._object[this._key];
    return this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Ba(G(this._object), this._key);
  }
}
function di(e, t, r) {
  const o = e[t];
  return ie(o) ? o : new ui(e, t, r);
}
class fi {
  constructor(t, r, o) {
    this.fn = t, this.setter = r, this._value = void 0, this.dep = new Fo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = cr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    te !== this)
      return hn(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return vn(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function pi(e, t, r = !1) {
  let o, s;
  return V(e) ? o = e : (o = e.get, s = e.set), new fi(o, s, r);
}
const Cr = {}, Lr = /* @__PURE__ */ new WeakMap();
let St;
function bi(e, t = !1, r = St) {
  if (r) {
    let o = Lr.get(r);
    o || Lr.set(r, o = []), o.push(e);
  }
}
function gi(e, t, r = X) {
  const { immediate: o, deep: s, once: n, scheduler: a, augmentJob: i, call: l } = r, u = (O) => s ? O : Re(O) || s === !1 || s === 0 ? nt(O, 1) : nt(O);
  let c, p, g, b, x = !1, h = !1;
  if (ie(e) ? (p = () => e.value, x = Re(e)) : ht(e) ? (p = () => u(e), x = !0) : M(e) ? (h = !0, x = e.some((O) => ht(O) || Re(O)), p = () => e.map((O) => {
    if (ie(O))
      return O.value;
    if (ht(O))
      return u(O);
    if (V(O))
      return l ? l(O, 2) : O();
  })) : V(e) ? t ? p = l ? () => l(e, 2) : e : p = () => {
    if (g) {
      it();
      try {
        g();
      } finally {
        lt();
      }
    }
    const O = St;
    St = c;
    try {
      return l ? l(e, 3, [b]) : e(b);
    } finally {
      St = O;
    }
  } : p = Qe, t && s) {
    const O = p, K = s === !0 ? 1 / 0 : s;
    p = () => nt(O(), K);
  }
  const $ = pn(), E = () => {
    c.stop(), $ && $.active && zo($.effects, c);
  };
  if (n && t) {
    const O = t;
    t = (...K) => {
      O(...K), E();
    };
  }
  let B = h ? new Array(e.length).fill(Cr) : Cr;
  const W = (O) => {
    if (!(!(c.flags & 1) || !c.dirty && !O))
      if (t) {
        const K = c.run();
        if (s || x || (h ? K.some((pe, oe) => gt(pe, B[oe])) : gt(K, B))) {
          g && g();
          const pe = St;
          St = c;
          try {
            const oe = [
              K,
              // pass undefined as the old value when it's changed for the first time
              B === Cr ? void 0 : h && B[0] === Cr ? [] : B,
              b
            ];
            B = K, l ? l(t, 3, oe) : (
              // @ts-expect-error
              t(...oe)
            );
          } finally {
            St = pe;
          }
        }
      } else
        c.run();
  };
  return i && i(W), c = new bn(p), c.scheduler = a ? () => a(W, !1) : W, b = (O) => bi(O, !1, c), g = c.onStop = () => {
    const O = Lr.get(c);
    if (O) {
      if (l)
        l(O, 4);
      else
        for (const K of O) K();
      Lr.delete(c);
    }
  }, t ? o ? W(!0) : B = c.run() : a ? a(W.bind(null, !0), !0) : c.run(), E.pause = c.pause.bind(c), E.resume = c.resume.bind(c), E.stop = E, E;
}
function nt(e, t = 1 / 0, r) {
  if (t <= 0 || !re(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t))
    return e;
  if (r.set(e, t), t--, ie(e))
    nt(e.value, t, r);
  else if (M(e))
    for (let o = 0; o < e.length; o++)
      nt(e[o], t, r);
  else if (Wr(e) || Dt(e))
    e.forEach((o) => {
      nt(o, t, r);
    });
  else if (on(e)) {
    for (const o in e)
      nt(e[o], t, r);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && nt(e[o], t, r);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function xr(e, t, r, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    Qr(s, t, r);
  }
}
function Xe(e, t, r, o) {
  if (V(e)) {
    const s = xr(e, t, r, o);
    return s && tn(s) && s.catch((n) => {
      Qr(n, t, r);
    }), s;
  }
  if (M(e)) {
    const s = [];
    for (let n = 0; n < e.length; n++)
      s.push(Xe(e[n], t, r, o));
    return s;
  }
}
function Qr(e, t, r, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: n, throwUnhandledErrorInProduction: a } = t && t.appContext.config || X;
  if (t) {
    let i = t.parent;
    const l = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; i; ) {
      const c = i.ec;
      if (c) {
        for (let p = 0; p < c.length; p++)
          if (c[p](e, l, u) === !1)
            return;
      }
      i = i.parent;
    }
    if (n) {
      it(), xr(n, null, 10, [
        e,
        l,
        u
      ]), lt();
      return;
    }
  }
  hi(e, r, s, o, a);
}
function hi(e, t, r, o = !0, s = !1) {
  if (s)
    throw e;
  console.error(e);
}
const we = [];
let Ge = -1;
const Vt = [];
let pt = null, Rt = 0;
const An = /* @__PURE__ */ Promise.resolve();
let Rr = null;
function Ko(e) {
  const t = Rr || An;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function mi(e) {
  let t = Ge + 1, r = we.length;
  for (; t < r; ) {
    const o = t + r >>> 1, s = we[o], n = dr(s);
    n < e || n === e && s.flags & 2 ? t = o + 1 : r = o;
  }
  return t;
}
function Wo(e) {
  if (!(e.flags & 1)) {
    const t = dr(e), r = we[we.length - 1];
    !r || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= dr(r) ? we.push(e) : we.splice(mi(t), 0, e), e.flags |= 1, $n();
  }
}
function $n() {
  Rr || (Rr = An.then(In));
}
function xi(e) {
  M(e) ? Vt.push(...e) : pt && e.id === -1 ? pt.splice(Rt + 1, 0, e) : e.flags & 1 || (Vt.push(e), e.flags |= 1), $n();
}
function as(e, t, r = Ge + 1) {
  for (; r < we.length; r++) {
    const o = we[r];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid)
        continue;
      we.splice(r, 1), r--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function On(e) {
  if (Vt.length) {
    const t = [...new Set(Vt)].sort(
      (r, o) => dr(r) - dr(o)
    );
    if (Vt.length = 0, pt) {
      pt.push(...t);
      return;
    }
    for (pt = t, Rt = 0; Rt < pt.length; Rt++) {
      const r = pt[Rt];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    pt = null, Rt = 0;
  }
}
const dr = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function In(e) {
  try {
    for (Ge = 0; Ge < we.length; Ge++) {
      const t = we[Ge];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), xr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ge < we.length; Ge++) {
      const t = we[Ge];
      t && (t.flags &= -2);
    }
    Ge = -1, we.length = 0, On(), Rr = null, (we.length || Vt.length) && In();
  }
}
let Le = null, En = null;
function Mr(e) {
  const t = Le;
  return Le = e, En = e && e.type.__scopeId || null, t;
}
function vi(e, t = Le, r) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && hs(-1);
    const n = Mr(t);
    let a;
    try {
      a = e(...s);
    } finally {
      Mr(n), o._d && hs(1);
    }
    return a;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function Ct(e, t) {
  if (Le === null)
    return e;
  const r = to(Le), o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [n, a, i, l = X] = t[s];
    n && (V(n) && (n = {
      mounted: n,
      updated: n
    }), n.deep && nt(a), o.push({
      dir: n,
      instance: r,
      value: a,
      oldValue: void 0,
      arg: i,
      modifiers: l
    }));
  }
  return e;
}
function wt(e, t, r, o) {
  const s = e.dirs, n = t && t.dirs;
  for (let a = 0; a < s.length; a++) {
    const i = s[a];
    n && (i.oldValue = n[a].value);
    let l = i.dir[o];
    l && (it(), Xe(l, r, 8, [
      e.el,
      i,
      e,
      t
    ]), lt());
  }
}
const yi = Symbol("_vte"), ki = (e) => e.__isTeleport, wi = Symbol("_leaveCb");
function Uo(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Uo(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function vr(e, t) {
  return V(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ye({ name: e.name }, t, { setup: e })
  ) : e;
}
function zn(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Nr = /* @__PURE__ */ new WeakMap();
function tr(e, t, r, o, s = !1) {
  if (M(e)) {
    e.forEach(
      (x, h) => tr(
        x,
        t && (M(t) ? t[h] : t),
        r,
        o,
        s
      )
    );
    return;
  }
  if (rr(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && tr(e, t, r, o.component.subTree);
    return;
  }
  const n = o.shapeFlag & 4 ? to(o.component) : o.el, a = s ? null : n, { i, r: l } = e, u = t && t.r, c = i.refs === X ? i.refs = {} : i.refs, p = i.setupState, g = G(p), b = p === X ? en : (x) => q(g, x);
  if (u != null && u !== l) {
    if (is(t), le(u))
      c[u] = null, b(u) && (p[u] = null);
    else if (ie(u)) {
      u.value = null;
      const x = t;
      x.k && (c[x.k] = null);
    }
  }
  if (V(l))
    xr(l, i, 12, [a, c]);
  else {
    const x = le(l), h = ie(l);
    if (x || h) {
      const $ = () => {
        if (e.f) {
          const E = x ? b(l) ? p[l] : c[l] : l.value;
          if (s)
            M(E) && zo(E, n);
          else if (M(E))
            E.includes(n) || E.push(n);
          else if (x)
            c[l] = [n], b(l) && (p[l] = c[l]);
          else {
            const B = [n];
            l.value = B, e.k && (c[e.k] = B);
          }
        } else x ? (c[l] = a, b(l) && (p[l] = a)) : h && (l.value = a, e.k && (c[e.k] = a));
      };
      if (a) {
        const E = () => {
          $(), Nr.delete(e);
        };
        E.id = -1, Nr.set(e, E), Oe(E, r);
      } else
        is(e), $();
    }
  }
}
function is(e) {
  const t = Nr.get(e);
  t && (t.flags |= 8, Nr.delete(e));
}
Jr().requestIdleCallback;
Jr().cancelIdleCallback;
const rr = (e) => !!e.type.__asyncLoader, Ln = (e) => e.type.__isKeepAlive;
function _i(e, t) {
  Rn(e, "a", t);
}
function Si(e, t) {
  Rn(e, "da", t);
}
function Rn(e, t, r = _e) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = r;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Zr(t, o, r), r) {
    let s = r.parent;
    for (; s && s.parent; )
      Ln(s.parent.vnode) && Ci(o, t, r, s), s = s.parent;
  }
}
function Ci(e, t, r, o) {
  const s = Zr(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  Nn(() => {
    zo(o[t], s);
  }, r);
}
function Zr(e, t, r = _e, o = !1) {
  if (r) {
    const s = r[e] || (r[e] = []), n = t.__weh || (t.__weh = (...a) => {
      it();
      const i = yr(r), l = Xe(t, r, e, a);
      return i(), lt(), l;
    });
    return o ? s.unshift(n) : s.push(n), n;
  }
}
const ct = (e) => (t, r = _e) => {
  (!pr || e === "sp") && Zr(e, (...o) => t(...o), r);
}, Ti = ct("bm"), Mn = ct("m"), Pi = ct(
  "bu"
), ji = ct("u"), Ai = ct(
  "bum"
), Nn = ct("um"), $i = ct(
  "sp"
), Oi = ct("rtg"), Ii = ct("rtc");
function Ei(e, t = _e) {
  Zr("ec", e, t);
}
const zi = Symbol.for("v-ndc");
function Ne(e, t, r, o) {
  let s;
  const n = r, a = M(e);
  if (a || le(e)) {
    const i = a && ht(e);
    let l = !1, u = !1;
    i && (l = !Re(e), u = xt(e), e = Yr(e)), s = new Array(e.length);
    for (let c = 0, p = e.length; c < p; c++)
      s[c] = t(
        l ? u ? zr(be(e[c])) : be(e[c]) : e[c],
        c,
        void 0,
        n
      );
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let i = 0; i < e; i++)
      s[i] = t(i + 1, i, void 0, n);
  } else if (re(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (i, l) => t(i, l, void 0, n)
      );
    else {
      const i = Object.keys(e);
      s = new Array(i.length);
      for (let l = 0, u = i.length; l < u; l++) {
        const c = i[l];
        s[l] = t(e[c], c, l, n);
      }
    }
  else
    s = [];
  return s;
}
const ko = (e) => e ? na(e) ? to(e) : ko(e.parent) : null, or = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ye(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ko(e.parent),
    $root: (e) => ko(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Dn(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Wo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ko.bind(e.proxy)),
    $watch: (e) => ol.bind(e)
  })
), lo = (e, t) => e !== X && !e.__isScriptSetup && q(e, t), Li = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: r, setupState: o, data: s, props: n, accessCache: a, type: i, appContext: l } = e;
    let u;
    if (t[0] !== "$") {
      const b = a[t];
      if (b !== void 0)
        switch (b) {
          case 1:
            return o[t];
          case 2:
            return s[t];
          case 4:
            return r[t];
          case 3:
            return n[t];
        }
      else {
        if (lo(o, t))
          return a[t] = 1, o[t];
        if (s !== X && q(s, t))
          return a[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && q(u, t)
        )
          return a[t] = 3, n[t];
        if (r !== X && q(r, t))
          return a[t] = 4, r[t];
        wo && (a[t] = 0);
      }
    }
    const c = or[t];
    let p, g;
    if (c)
      return t === "$attrs" && ve(e.attrs, "get", ""), c(e);
    if (
      // css module (injected by vue-loader)
      (p = i.__cssModules) && (p = p[t])
    )
      return p;
    if (r !== X && q(r, t))
      return a[t] = 4, r[t];
    if (
      // global properties
      g = l.config.globalProperties, q(g, t)
    )
      return g[t];
  },
  set({ _: e }, t, r) {
    const { data: o, setupState: s, ctx: n } = e;
    return lo(s, t) ? (s[t] = r, !0) : o !== X && q(o, t) ? (o[t] = r, !0) : q(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (n[t] = r, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: r, ctx: o, appContext: s, propsOptions: n, type: a }
  }, i) {
    let l, u;
    return !!(r[i] || e !== X && i[0] !== "$" && q(e, i) || lo(t, i) || (l = n[0]) && q(l, i) || q(o, i) || q(or, i) || q(s.config.globalProperties, i) || (u = a.__cssModules) && u[i]);
  },
  defineProperty(e, t, r) {
    return r.get != null ? e._.accessCache[t] = 0 : q(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
  }
};
function ls(e) {
  return M(e) ? e.reduce(
    (t, r) => (t[r] = null, t),
    {}
  ) : e;
}
let wo = !0;
function Ri(e) {
  const t = Dn(e), r = e.proxy, o = e.ctx;
  wo = !1, t.beforeCreate && cs(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: n,
    methods: a,
    watch: i,
    provide: l,
    inject: u,
    // lifecycle
    created: c,
    beforeMount: p,
    mounted: g,
    beforeUpdate: b,
    updated: x,
    activated: h,
    deactivated: $,
    beforeDestroy: E,
    beforeUnmount: B,
    destroyed: W,
    unmounted: O,
    render: K,
    renderTracked: pe,
    renderTriggered: oe,
    errorCaptured: D,
    serverPrefetch: H,
    // public API
    expose: Q,
    inheritAttrs: ae,
    // assets
    components: ue,
    directives: ge,
    filters: Se
  } = t;
  if (u && Mi(u, o, null), a)
    for (const F in a) {
      const J = a[F];
      V(J) && (o[F] = J.bind(r));
    }
  if (s) {
    const F = s.call(r, r);
    re(F) && (e.data = Wt(F));
  }
  if (wo = !0, n)
    for (const F in n) {
      const J = n[F], Ce = V(J) ? J.bind(r, r) : V(J.get) ? J.get.bind(r, r) : Qe, Te = !V(J) && V(J.set) ? J.set.bind(r) : Qe, de = Ve({
        get: Ce,
        set: Te
      });
      Object.defineProperty(o, F, {
        enumerable: !0,
        configurable: !0,
        get: () => de.value,
        set: (fe) => de.value = fe
      });
    }
  if (i)
    for (const F in i)
      Fn(i[F], o, r, F);
  if (l) {
    const F = V(l) ? l.call(r) : l;
    Reflect.ownKeys(F).forEach((J) => {
      Hi(J, F[J]);
    });
  }
  c && cs(c, e, "c");
  function Z(F, J) {
    M(J) ? J.forEach((Ce) => F(Ce.bind(r))) : J && F(J.bind(r));
  }
  if (Z(Ti, p), Z(Mn, g), Z(Pi, b), Z(ji, x), Z(_i, h), Z(Si, $), Z(Ei, D), Z(Ii, pe), Z(Oi, oe), Z(Ai, B), Z(Nn, O), Z($i, H), M(Q))
    if (Q.length) {
      const F = e.exposed || (e.exposed = {});
      Q.forEach((J) => {
        Object.defineProperty(F, J, {
          get: () => r[J],
          set: (Ce) => r[J] = Ce,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  K && e.render === Qe && (e.render = K), ae != null && (e.inheritAttrs = ae), ue && (e.components = ue), ge && (e.directives = ge), H && zn(e);
}
function Mi(e, t, r = Qe) {
  M(e) && (e = _o(e));
  for (const o in e) {
    const s = e[o];
    let n;
    re(s) ? "default" in s ? n = sr(
      s.from || o,
      s.default,
      !0
    ) : n = sr(s.from || o) : n = sr(s), ie(n) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => n.value,
      set: (a) => n.value = a
    }) : t[o] = n;
  }
}
function cs(e, t, r) {
  Xe(
    M(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    r
  );
}
function Fn(e, t, r, o) {
  let s = o.includes(".") ? Xn(r, o) : () => r[o];
  if (le(e)) {
    const n = t[e];
    V(n) && Ye(s, n);
  } else if (V(e))
    Ye(s, e.bind(r));
  else if (re(e))
    if (M(e))
      e.forEach((n) => Fn(n, t, r, o));
    else {
      const n = V(e.handler) ? e.handler.bind(r) : t[e.handler];
      V(n) && Ye(s, n, e);
    }
}
function Dn(e) {
  const t = e.type, { mixins: r, extends: o } = t, {
    mixins: s,
    optionsCache: n,
    config: { optionMergeStrategies: a }
  } = e.appContext, i = n.get(t);
  let l;
  return i ? l = i : !s.length && !r && !o ? l = t : (l = {}, s.length && s.forEach(
    (u) => Fr(l, u, a, !0)
  ), Fr(l, t, a)), re(t) && n.set(t, l), l;
}
function Fr(e, t, r, o = !1) {
  const { mixins: s, extends: n } = t;
  n && Fr(e, n, r, !0), s && s.forEach(
    (a) => Fr(e, a, r, !0)
  );
  for (const a in t)
    if (!(o && a === "expose")) {
      const i = Ni[a] || r && r[a];
      e[a] = i ? i(e[a], t[a]) : t[a];
    }
  return e;
}
const Ni = {
  data: us,
  props: ds,
  emits: ds,
  // objects
  methods: Qt,
  computed: Qt,
  // lifecycle
  beforeCreate: ke,
  created: ke,
  beforeMount: ke,
  mounted: ke,
  beforeUpdate: ke,
  updated: ke,
  beforeDestroy: ke,
  beforeUnmount: ke,
  destroyed: ke,
  unmounted: ke,
  activated: ke,
  deactivated: ke,
  errorCaptured: ke,
  serverPrefetch: ke,
  // assets
  components: Qt,
  directives: Qt,
  // watch
  watch: Di,
  // provide / inject
  provide: us,
  inject: Fi
};
function us(e, t) {
  return t ? e ? function() {
    return ye(
      V(e) ? e.call(this, this) : e,
      V(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Fi(e, t) {
  return Qt(_o(e), _o(t));
}
function _o(e) {
  if (M(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++)
      t[e[r]] = e[r];
    return t;
  }
  return e;
}
function ke(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Qt(e, t) {
  return e ? ye(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ds(e, t) {
  return e ? M(e) && M(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ye(
    /* @__PURE__ */ Object.create(null),
    ls(e),
    ls(t ?? {})
  ) : t;
}
function Di(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = ye(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    r[o] = ke(e[o], t[o]);
  return r;
}
function Vn() {
  return {
    app: null,
    config: {
      isNativeTag: en,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Vi = 0;
function Bi(e, t) {
  return function(o, s = null) {
    V(o) || (o = ye({}, o)), s != null && !re(s) && (s = null);
    const n = Vn(), a = /* @__PURE__ */ new WeakSet(), i = [];
    let l = !1;
    const u = n.app = {
      _uid: Vi++,
      _component: o,
      _props: s,
      _container: null,
      _context: n,
      _instance: null,
      version: Sl,
      get config() {
        return n.config;
      },
      set config(c) {
      },
      use(c, ...p) {
        return a.has(c) || (c && V(c.install) ? (a.add(c), c.install(u, ...p)) : V(c) && (a.add(c), c(u, ...p))), u;
      },
      mixin(c) {
        return n.mixins.includes(c) || n.mixins.push(c), u;
      },
      component(c, p) {
        return p ? (n.components[c] = p, u) : n.components[c];
      },
      directive(c, p) {
        return p ? (n.directives[c] = p, u) : n.directives[c];
      },
      mount(c, p, g) {
        if (!l) {
          const b = u._ceVNode || He(o, s);
          return b.appContext = n, g === !0 ? g = "svg" : g === !1 && (g = void 0), e(b, c, g), l = !0, u._container = c, c.__vue_app__ = u, to(b.component);
        }
      },
      onUnmount(c) {
        i.push(c);
      },
      unmount() {
        l && (Xe(
          i,
          u._instance,
          16
        ), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(c, p) {
        return n.provides[c] = p, u;
      },
      runWithContext(c) {
        const p = At;
        At = u;
        try {
          return c();
        } finally {
          At = p;
        }
      }
    };
    return u;
  };
}
let At = null;
function Hi(e, t) {
  if (_e) {
    let r = _e.provides;
    const o = _e.parent && _e.parent.provides;
    o === r && (r = _e.provides = Object.create(o)), r[e] = t;
  }
}
function sr(e, t, r = !1) {
  const o = Yo();
  if (o || At) {
    let s = At ? At._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return r && V(t) ? t.call(o && o.proxy) : t;
  }
}
function Ki() {
  return !!(Yo() || At);
}
const Bn = {}, Hn = () => Object.create(Bn), Kn = (e) => Object.getPrototypeOf(e) === Bn;
function Wi(e, t, r, o = !1) {
  const s = {}, n = Hn();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Wn(e, t, s, n);
  for (const a in e.propsOptions[0])
    a in s || (s[a] = void 0);
  r ? e.props = o ? s : ni(s) : e.type.props ? e.props = s : e.props = n, e.attrs = n;
}
function Ui(e, t, r, o) {
  const {
    props: s,
    attrs: n,
    vnode: { patchFlag: a }
  } = e, i = G(s), [l] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (o || a > 0) && !(a & 16)
  ) {
    if (a & 8) {
      const c = e.vnode.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        let g = c[p];
        if (Xr(e.emitsOptions, g))
          continue;
        const b = t[g];
        if (l)
          if (q(n, g))
            b !== n[g] && (n[g] = b, u = !0);
          else {
            const x = mt(g);
            s[x] = So(
              l,
              i,
              x,
              b,
              e,
              !1
            );
          }
        else
          b !== n[g] && (n[g] = b, u = !0);
      }
    }
  } else {
    Wn(e, t, s, n) && (u = !0);
    let c;
    for (const p in i)
      (!t || // for camelCase
      !q(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Ot(p)) === p || !q(t, c))) && (l ? r && // for camelCase
      (r[p] !== void 0 || // for kebab-case
      r[c] !== void 0) && (s[p] = So(
        l,
        i,
        p,
        void 0,
        e,
        !0
      )) : delete s[p]);
    if (n !== i)
      for (const p in n)
        (!t || !q(t, p)) && (delete n[p], u = !0);
  }
  u && st(e.attrs, "set", "");
}
function Wn(e, t, r, o) {
  const [s, n] = e.propsOptions;
  let a = !1, i;
  if (t)
    for (let l in t) {
      if (Zt(l))
        continue;
      const u = t[l];
      let c;
      s && q(s, c = mt(l)) ? !n || !n.includes(c) ? r[c] = u : (i || (i = {}))[c] = u : Xr(e.emitsOptions, l) || (!(l in o) || u !== o[l]) && (o[l] = u, a = !0);
    }
  if (n) {
    const l = G(r), u = i || X;
    for (let c = 0; c < n.length; c++) {
      const p = n[c];
      r[p] = So(
        s,
        l,
        p,
        u[p],
        e,
        !q(u, p)
      );
    }
  }
  return a;
}
function So(e, t, r, o, s, n) {
  const a = e[r];
  if (a != null) {
    const i = q(a, "default");
    if (i && o === void 0) {
      const l = a.default;
      if (a.type !== Function && !a.skipFactory && V(l)) {
        const { propsDefaults: u } = s;
        if (r in u)
          o = u[r];
        else {
          const c = yr(s);
          o = u[r] = l.call(
            null,
            t
          ), c();
        }
      } else
        o = l;
      s.ce && s.ce._setProp(r, o);
    }
    a[
      0
      /* shouldCast */
    ] && (n && !i ? o = !1 : a[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === Ot(r)) && (o = !0));
  }
  return o;
}
const Ji = /* @__PURE__ */ new WeakMap();
function Un(e, t, r = !1) {
  const o = r ? Ji : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const n = e.props, a = {}, i = [];
  let l = !1;
  if (!V(e)) {
    const c = (p) => {
      l = !0;
      const [g, b] = Un(p, t, !0);
      ye(a, g), b && i.push(...b);
    };
    !r && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!n && !l)
    return re(e) && o.set(e, Ft), Ft;
  if (M(n))
    for (let c = 0; c < n.length; c++) {
      const p = mt(n[c]);
      fs(p) && (a[p] = X);
    }
  else if (n)
    for (const c in n) {
      const p = mt(c);
      if (fs(p)) {
        const g = n[c], b = a[p] = M(g) || V(g) ? { type: g } : ye({}, g), x = b.type;
        let h = !1, $ = !0;
        if (M(x))
          for (let E = 0; E < x.length; ++E) {
            const B = x[E], W = V(B) && B.name;
            if (W === "Boolean") {
              h = !0;
              break;
            } else W === "String" && ($ = !1);
          }
        else
          h = V(x) && x.name === "Boolean";
        b[
          0
          /* shouldCast */
        ] = h, b[
          1
          /* shouldCastTrue */
        ] = $, (h || q(b, "default")) && i.push(p);
      }
    }
  const u = [a, i];
  return re(e) && o.set(e, u), u;
}
function fs(e) {
  return e[0] !== "$" && !Zt(e);
}
const Jo = (e) => e === "_" || e === "_ctx" || e === "$stable", Go = (e) => M(e) ? e.map(qe) : [qe(e)], Gi = (e, t, r) => {
  if (t._n)
    return t;
  const o = vi((...s) => Go(t(...s)), r);
  return o._c = !1, o;
}, Jn = (e, t, r) => {
  const o = e._ctx;
  for (const s in e) {
    if (Jo(s)) continue;
    const n = e[s];
    if (V(n))
      t[s] = Gi(s, n, o);
    else if (n != null) {
      const a = Go(n);
      t[s] = () => a;
    }
  }
}, Gn = (e, t) => {
  const r = Go(t);
  e.slots.default = () => r;
}, qn = (e, t, r) => {
  for (const o in t)
    (r || !Jo(o)) && (e[o] = t[o]);
}, qi = (e, t, r) => {
  const o = e.slots = Hn();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (qn(o, t, r), r && nn(o, "_", s, !0)) : Jn(t, o);
  } else t && Gn(e, t);
}, Yi = (e, t, r) => {
  const { vnode: o, slots: s } = e;
  let n = !0, a = X;
  if (o.shapeFlag & 32) {
    const i = t._;
    i ? r && i === 1 ? n = !1 : qn(s, t, r) : (n = !t.$stable, Jn(t, s)), a = t;
  } else t && (Gn(e, t), a = { default: 1 });
  if (n)
    for (const i in s)
      !Jo(i) && a[i] == null && delete s[i];
}, Oe = dl;
function Qi(e) {
  return Zi(e);
}
function Zi(e, t) {
  const r = Jr();
  r.__VUE__ = !0;
  const {
    insert: o,
    remove: s,
    patchProp: n,
    createElement: a,
    createText: i,
    createComment: l,
    setText: u,
    setElementText: c,
    parentNode: p,
    nextSibling: g,
    setScopeId: b = Qe,
    insertStaticContent: x
  } = e, h = (d, f, v, w = null, y = null, k = null, T = void 0, C = null, S = !!f.dynamicChildren) => {
    if (d === f)
      return;
    d && !qt(d, f) && (w = It(d), fe(d, y, k, !0), d = null), f.patchFlag === -2 && (S = !1, f.dynamicChildren = null);
    const { type: _, ref: R, shapeFlag: P } = f;
    switch (_) {
      case eo:
        $(d, f, v, w);
        break;
      case vt:
        E(d, f, v, w);
        break;
      case uo:
        d == null && B(f, v, w, T);
        break;
      case se:
        ue(
          d,
          f,
          v,
          w,
          y,
          k,
          T,
          C,
          S
        );
        break;
      default:
        P & 1 ? K(
          d,
          f,
          v,
          w,
          y,
          k,
          T,
          C,
          S
        ) : P & 6 ? ge(
          d,
          f,
          v,
          w,
          y,
          k,
          T,
          C,
          S
        ) : (P & 64 || P & 128) && _.process(
          d,
          f,
          v,
          w,
          y,
          k,
          T,
          C,
          S,
          kt
        );
    }
    R != null && y ? tr(R, d && d.ref, k, f || d, !f) : R == null && d && d.ref != null && tr(d.ref, null, k, d, !0);
  }, $ = (d, f, v, w) => {
    if (d == null)
      o(
        f.el = i(f.children),
        v,
        w
      );
    else {
      const y = f.el = d.el;
      f.children !== d.children && u(y, f.children);
    }
  }, E = (d, f, v, w) => {
    d == null ? o(
      f.el = l(f.children || ""),
      v,
      w
    ) : f.el = d.el;
  }, B = (d, f, v, w) => {
    [d.el, d.anchor] = x(
      d.children,
      f,
      v,
      w,
      d.el,
      d.anchor
    );
  }, W = ({ el: d, anchor: f }, v, w) => {
    let y;
    for (; d && d !== f; )
      y = g(d), o(d, v, w), d = y;
    o(f, v, w);
  }, O = ({ el: d, anchor: f }) => {
    let v;
    for (; d && d !== f; )
      v = g(d), s(d), d = v;
    s(f);
  }, K = (d, f, v, w, y, k, T, C, S) => {
    f.type === "svg" ? T = "svg" : f.type === "math" && (T = "mathml"), d == null ? pe(
      f,
      v,
      w,
      y,
      k,
      T,
      C,
      S
    ) : H(
      d,
      f,
      y,
      k,
      T,
      C,
      S
    );
  }, pe = (d, f, v, w, y, k, T, C) => {
    let S, _;
    const { props: R, shapeFlag: P, transition: z, dirs: N } = d;
    if (S = d.el = a(
      d.type,
      k,
      R && R.is,
      R
    ), P & 8 ? c(S, d.children) : P & 16 && D(
      d.children,
      S,
      null,
      w,
      y,
      co(d, k),
      T,
      C
    ), N && wt(d, null, w, "created"), oe(S, d, d.scopeId, T, w), R) {
      for (const ee in R)
        ee !== "value" && !Zt(ee) && n(S, ee, null, R[ee], k, w);
      "value" in R && n(S, "value", null, R.value, k), (_ = R.onVnodeBeforeMount) && Je(_, w, d);
    }
    N && wt(d, null, w, "beforeMount");
    const U = Xi(y, z);
    U && z.beforeEnter(S), o(S, f, v), ((_ = R && R.onVnodeMounted) || U || N) && Oe(() => {
      _ && Je(_, w, d), U && z.enter(S), N && wt(d, null, w, "mounted");
    }, y);
  }, oe = (d, f, v, w, y) => {
    if (v && b(d, v), w)
      for (let k = 0; k < w.length; k++)
        b(d, w[k]);
    if (y) {
      let k = y.subTree;
      if (f === k || ta(k.type) && (k.ssContent === f || k.ssFallback === f)) {
        const T = y.vnode;
        oe(
          d,
          T,
          T.scopeId,
          T.slotScopeIds,
          y.parent
        );
      }
    }
  }, D = (d, f, v, w, y, k, T, C, S = 0) => {
    for (let _ = S; _ < d.length; _++) {
      const R = d[_] = C ? bt(d[_]) : qe(d[_]);
      h(
        null,
        R,
        f,
        v,
        w,
        y,
        k,
        T,
        C
      );
    }
  }, H = (d, f, v, w, y, k, T) => {
    const C = f.el = d.el;
    let { patchFlag: S, dynamicChildren: _, dirs: R } = f;
    S |= d.patchFlag & 16;
    const P = d.props || X, z = f.props || X;
    let N;
    if (v && _t(v, !1), (N = z.onVnodeBeforeUpdate) && Je(N, v, f, d), R && wt(f, d, v, "beforeUpdate"), v && _t(v, !0), (P.innerHTML && z.innerHTML == null || P.textContent && z.textContent == null) && c(C, ""), _ ? Q(
      d.dynamicChildren,
      _,
      C,
      v,
      w,
      co(f, y),
      k
    ) : T || J(
      d,
      f,
      C,
      null,
      v,
      w,
      co(f, y),
      k,
      !1
    ), S > 0) {
      if (S & 16)
        ae(C, P, z, v, y);
      else if (S & 2 && P.class !== z.class && n(C, "class", null, z.class, y), S & 4 && n(C, "style", P.style, z.style, y), S & 8) {
        const U = f.dynamicProps;
        for (let ee = 0; ee < U.length; ee++) {
          const Y = U[ee], Pe = P[Y], je = z[Y];
          (je !== Pe || Y === "value") && n(C, Y, Pe, je, y, v);
        }
      }
      S & 1 && d.children !== f.children && c(C, f.children);
    } else !T && _ == null && ae(C, P, z, v, y);
    ((N = z.onVnodeUpdated) || R) && Oe(() => {
      N && Je(N, v, f, d), R && wt(f, d, v, "updated");
    }, w);
  }, Q = (d, f, v, w, y, k, T) => {
    for (let C = 0; C < f.length; C++) {
      const S = d[C], _ = f[C], R = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        S.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (S.type === se || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !qt(S, _) || // - In the case of a component, it could contain anything.
        S.shapeFlag & 198) ? p(S.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          v
        )
      );
      h(
        S,
        _,
        R,
        null,
        w,
        y,
        k,
        T,
        !0
      );
    }
  }, ae = (d, f, v, w, y) => {
    if (f !== v) {
      if (f !== X)
        for (const k in f)
          !Zt(k) && !(k in v) && n(
            d,
            k,
            f[k],
            null,
            y,
            w
          );
      for (const k in v) {
        if (Zt(k)) continue;
        const T = v[k], C = f[k];
        T !== C && k !== "value" && n(d, k, C, T, y, w);
      }
      "value" in v && n(d, "value", f.value, v.value, y);
    }
  }, ue = (d, f, v, w, y, k, T, C, S) => {
    const _ = f.el = d ? d.el : i(""), R = f.anchor = d ? d.anchor : i("");
    let { patchFlag: P, dynamicChildren: z, slotScopeIds: N } = f;
    N && (C = C ? C.concat(N) : N), d == null ? (o(_, v, w), o(R, v, w), D(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      v,
      R,
      y,
      k,
      T,
      C,
      S
    )) : P > 0 && P & 64 && z && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren ? (Q(
      d.dynamicChildren,
      z,
      v,
      y,
      k,
      T,
      C
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || y && f === y.subTree) && Yn(
      d,
      f,
      !0
      /* shallow */
    )) : J(
      d,
      f,
      v,
      R,
      y,
      k,
      T,
      C,
      S
    );
  }, ge = (d, f, v, w, y, k, T, C, S) => {
    f.slotScopeIds = C, d == null ? f.shapeFlag & 512 ? y.ctx.activate(
      f,
      v,
      w,
      T,
      S
    ) : Se(
      f,
      v,
      w,
      y,
      k,
      T,
      S
    ) : Ee(d, f, S);
  }, Se = (d, f, v, w, y, k, T) => {
    const C = d.component = xl(
      d,
      w,
      y
    );
    if (Ln(d) && (C.ctx.renderer = kt), vl(C, !1, T), C.asyncDep) {
      if (y && y.registerDep(C, Z, T), !d.el) {
        const S = C.subTree = He(vt);
        E(null, S, f, v), d.placeholder = S.el;
      }
    } else
      Z(
        C,
        d,
        f,
        v,
        y,
        k,
        T
      );
  }, Ee = (d, f, v) => {
    const w = f.component = d.component;
    if (cl(d, f, v))
      if (w.asyncDep && !w.asyncResolved) {
        F(w, f, v);
        return;
      } else
        w.next = f, w.update();
    else
      f.el = d.el, w.vnode = f;
  }, Z = (d, f, v, w, y, k, T) => {
    const C = () => {
      if (d.isMounted) {
        let { next: P, bu: z, u: N, parent: U, vnode: ee } = d;
        {
          const We = Qn(d);
          if (We) {
            P && (P.el = ee.el, F(d, P, T)), We.asyncDep.then(() => {
              d.isUnmounted || C();
            });
            return;
          }
        }
        let Y = P, Pe;
        _t(d, !1), P ? (P.el = ee.el, F(d, P, T)) : P = ee, z && Ar(z), (Pe = P.props && P.props.onVnodeBeforeUpdate) && Je(Pe, U, P, ee), _t(d, !0);
        const je = bs(d), Ke = d.subTree;
        d.subTree = je, h(
          Ke,
          je,
          // parent may have changed if it's in a teleport
          p(Ke.el),
          // anchor may have changed if it's in a fragment
          It(Ke),
          d,
          y,
          k
        ), P.el = je.el, Y === null && ul(d, je.el), N && Oe(N, y), (Pe = P.props && P.props.onVnodeUpdated) && Oe(
          () => Je(Pe, U, P, ee),
          y
        );
      } else {
        let P;
        const { el: z, props: N } = f, { bm: U, m: ee, parent: Y, root: Pe, type: je } = d, Ke = rr(f);
        _t(d, !1), U && Ar(U), !Ke && (P = N && N.onVnodeBeforeMount) && Je(P, Y, f), _t(d, !0);
        {
          Pe.ce && // @ts-expect-error _def is private
          Pe.ce._def.shadowRoot !== !1 && Pe.ce._injectChildStyle(je);
          const We = d.subTree = bs(d);
          h(
            null,
            We,
            v,
            w,
            d,
            y,
            k
          ), f.el = We.el;
        }
        if (ee && Oe(ee, y), !Ke && (P = N && N.onVnodeMounted)) {
          const We = f;
          Oe(
            () => Je(P, Y, We),
            y
          );
        }
        (f.shapeFlag & 256 || Y && rr(Y.vnode) && Y.vnode.shapeFlag & 256) && d.a && Oe(d.a, y), d.isMounted = !0, f = v = w = null;
      }
    };
    d.scope.on();
    const S = d.effect = new bn(C);
    d.scope.off();
    const _ = d.update = S.run.bind(S), R = d.job = S.runIfDirty.bind(S);
    R.i = d, R.id = d.uid, S.scheduler = () => Wo(R), _t(d, !0), _();
  }, F = (d, f, v) => {
    f.component = d;
    const w = d.vnode.props;
    d.vnode = f, d.next = null, Ui(d, f.props, w, v), Yi(d, f.children, v), it(), as(d), lt();
  }, J = (d, f, v, w, y, k, T, C, S = !1) => {
    const _ = d && d.children, R = d ? d.shapeFlag : 0, P = f.children, { patchFlag: z, shapeFlag: N } = f;
    if (z > 0) {
      if (z & 128) {
        Te(
          _,
          P,
          v,
          w,
          y,
          k,
          T,
          C,
          S
        );
        return;
      } else if (z & 256) {
        Ce(
          _,
          P,
          v,
          w,
          y,
          k,
          T,
          C,
          S
        );
        return;
      }
    }
    N & 8 ? (R & 16 && dt(_, y, k), P !== _ && c(v, P)) : R & 16 ? N & 16 ? Te(
      _,
      P,
      v,
      w,
      y,
      k,
      T,
      C,
      S
    ) : dt(_, y, k, !0) : (R & 8 && c(v, ""), N & 16 && D(
      P,
      v,
      w,
      y,
      k,
      T,
      C,
      S
    ));
  }, Ce = (d, f, v, w, y, k, T, C, S) => {
    d = d || Ft, f = f || Ft;
    const _ = d.length, R = f.length, P = Math.min(_, R);
    let z;
    for (z = 0; z < P; z++) {
      const N = f[z] = S ? bt(f[z]) : qe(f[z]);
      h(
        d[z],
        N,
        v,
        null,
        y,
        k,
        T,
        C,
        S
      );
    }
    _ > R ? dt(
      d,
      y,
      k,
      !0,
      !1,
      P
    ) : D(
      f,
      v,
      w,
      y,
      k,
      T,
      C,
      S,
      P
    );
  }, Te = (d, f, v, w, y, k, T, C, S) => {
    let _ = 0;
    const R = f.length;
    let P = d.length - 1, z = R - 1;
    for (; _ <= P && _ <= z; ) {
      const N = d[_], U = f[_] = S ? bt(f[_]) : qe(f[_]);
      if (qt(N, U))
        h(
          N,
          U,
          v,
          null,
          y,
          k,
          T,
          C,
          S
        );
      else
        break;
      _++;
    }
    for (; _ <= P && _ <= z; ) {
      const N = d[P], U = f[z] = S ? bt(f[z]) : qe(f[z]);
      if (qt(N, U))
        h(
          N,
          U,
          v,
          null,
          y,
          k,
          T,
          C,
          S
        );
      else
        break;
      P--, z--;
    }
    if (_ > P) {
      if (_ <= z) {
        const N = z + 1, U = N < R ? f[N].el : w;
        for (; _ <= z; )
          h(
            null,
            f[_] = S ? bt(f[_]) : qe(f[_]),
            v,
            U,
            y,
            k,
            T,
            C,
            S
          ), _++;
      }
    } else if (_ > z)
      for (; _ <= P; )
        fe(d[_], y, k, !0), _++;
    else {
      const N = _, U = _, ee = /* @__PURE__ */ new Map();
      for (_ = U; _ <= z; _++) {
        const $e = f[_] = S ? bt(f[_]) : qe(f[_]);
        $e.key != null && ee.set($e.key, _);
      }
      let Y, Pe = 0;
      const je = z - U + 1;
      let Ke = !1, We = 0;
      const Jt = new Array(je);
      for (_ = 0; _ < je; _++) Jt[_] = 0;
      for (_ = N; _ <= P; _++) {
        const $e = d[_];
        if (Pe >= je) {
          fe($e, y, k, !0);
          continue;
        }
        let Ue;
        if ($e.key != null)
          Ue = ee.get($e.key);
        else
          for (Y = U; Y <= z; Y++)
            if (Jt[Y - U] === 0 && qt($e, f[Y])) {
              Ue = Y;
              break;
            }
        Ue === void 0 ? fe($e, y, k, !0) : (Jt[Ue - U] = _ + 1, Ue >= We ? We = Ue : Ke = !0, h(
          $e,
          f[Ue],
          v,
          null,
          y,
          k,
          T,
          C,
          S
        ), Pe++);
      }
      const Xo = Ke ? el(Jt) : Ft;
      for (Y = Xo.length - 1, _ = je - 1; _ >= 0; _--) {
        const $e = U + _, Ue = f[$e], es = f[$e + 1], ts = $e + 1 < R ? (
          // #13559, fallback to el placeholder for unresolved async component
          es.el || es.placeholder
        ) : w;
        Jt[_] === 0 ? h(
          null,
          Ue,
          v,
          ts,
          y,
          k,
          T,
          C,
          S
        ) : Ke && (Y < 0 || _ !== Xo[Y] ? de(Ue, v, ts, 2) : Y--);
      }
    }
  }, de = (d, f, v, w, y = null) => {
    const { el: k, type: T, transition: C, children: S, shapeFlag: _ } = d;
    if (_ & 6) {
      de(d.component.subTree, f, v, w);
      return;
    }
    if (_ & 128) {
      d.suspense.move(f, v, w);
      return;
    }
    if (_ & 64) {
      T.move(d, f, v, kt);
      return;
    }
    if (T === se) {
      o(k, f, v);
      for (let P = 0; P < S.length; P++)
        de(S[P], f, v, w);
      o(d.anchor, f, v);
      return;
    }
    if (T === uo) {
      W(d, f, v);
      return;
    }
    if (w !== 2 && _ & 1 && C)
      if (w === 0)
        C.beforeEnter(k), o(k, f, v), Oe(() => C.enter(k), y);
      else {
        const { leave: P, delayLeave: z, afterLeave: N } = C, U = () => {
          d.ctx.isUnmounted ? s(k) : o(k, f, v);
        }, ee = () => {
          k._isLeaving && k[wi](
            !0
            /* cancelled */
          ), P(k, () => {
            U(), N && N();
          });
        };
        z ? z(k, U, ee) : ee();
      }
    else
      o(k, f, v);
  }, fe = (d, f, v, w = !1, y = !1) => {
    const {
      type: k,
      props: T,
      ref: C,
      children: S,
      dynamicChildren: _,
      shapeFlag: R,
      patchFlag: P,
      dirs: z,
      cacheIndex: N
    } = d;
    if (P === -2 && (y = !1), C != null && (it(), tr(C, null, v, d, !0), lt()), N != null && (f.renderCache[N] = void 0), R & 256) {
      f.ctx.deactivate(d);
      return;
    }
    const U = R & 1 && z, ee = !rr(d);
    let Y;
    if (ee && (Y = T && T.onVnodeBeforeUnmount) && Je(Y, f, d), R & 6)
      kr(d.component, v, w);
    else {
      if (R & 128) {
        d.suspense.unmount(v, w);
        return;
      }
      U && wt(d, null, f, "beforeUnmount"), R & 64 ? d.type.remove(
        d,
        f,
        v,
        kt,
        w
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (k !== se || P > 0 && P & 64) ? dt(
        _,
        f,
        v,
        !1,
        !0
      ) : (k === se && P & 384 || !y && R & 16) && dt(S, f, v), w && yt(d);
    }
    (ee && (Y = T && T.onVnodeUnmounted) || U) && Oe(() => {
      Y && Je(Y, f, d), U && wt(d, null, f, "unmounted");
    }, v);
  }, yt = (d) => {
    const { type: f, el: v, anchor: w, transition: y } = d;
    if (f === se) {
      ut(v, w);
      return;
    }
    if (f === uo) {
      O(d);
      return;
    }
    const k = () => {
      s(v), y && !y.persisted && y.afterLeave && y.afterLeave();
    };
    if (d.shapeFlag & 1 && y && !y.persisted) {
      const { leave: T, delayLeave: C } = y, S = () => T(v, k);
      C ? C(d.el, k, S) : S();
    } else
      k();
  }, ut = (d, f) => {
    let v;
    for (; d !== f; )
      v = g(d), s(d), d = v;
    s(f);
  }, kr = (d, f, v) => {
    const { bum: w, scope: y, job: k, subTree: T, um: C, m: S, a: _ } = d;
    ps(S), ps(_), w && Ar(w), y.stop(), k && (k.flags |= 8, fe(T, d, f, v)), C && Oe(C, f), Oe(() => {
      d.isUnmounted = !0;
    }, f);
  }, dt = (d, f, v, w = !1, y = !1, k = 0) => {
    for (let T = k; T < d.length; T++)
      fe(d[T], f, v, w, y);
  }, It = (d) => {
    if (d.shapeFlag & 6)
      return It(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const f = g(d.anchor || d.el), v = f && f[yi];
    return v ? g(v) : f;
  };
  let Ut = !1;
  const wr = (d, f, v) => {
    d == null ? f._vnode && fe(f._vnode, null, null, !0) : h(
      f._vnode || null,
      d,
      f,
      null,
      null,
      null,
      v
    ), f._vnode = d, Ut || (Ut = !0, as(), On(), Ut = !1);
  }, kt = {
    p: h,
    um: fe,
    m: de,
    r: yt,
    mt: Se,
    mc: D,
    pc: J,
    pbc: Q,
    n: It,
    o: e
  };
  return {
    render: wr,
    hydrate: void 0,
    createApp: Bi(wr)
  };
}
function co({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function _t({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Xi(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Yn(e, t, r = !1) {
  const o = e.children, s = t.children;
  if (M(o) && M(s))
    for (let n = 0; n < o.length; n++) {
      const a = o[n];
      let i = s[n];
      i.shapeFlag & 1 && !i.dynamicChildren && ((i.patchFlag <= 0 || i.patchFlag === 32) && (i = s[n] = bt(s[n]), i.el = a.el), !r && i.patchFlag !== -2 && Yn(a, i)), i.type === eo && // avoid cached text nodes retaining detached dom nodes
      i.patchFlag !== -1 && (i.el = a.el), i.type === vt && !i.el && (i.el = a.el);
    }
}
function el(e) {
  const t = e.slice(), r = [0];
  let o, s, n, a, i;
  const l = e.length;
  for (o = 0; o < l; o++) {
    const u = e[o];
    if (u !== 0) {
      if (s = r[r.length - 1], e[s] < u) {
        t[o] = s, r.push(o);
        continue;
      }
      for (n = 0, a = r.length - 1; n < a; )
        i = n + a >> 1, e[r[i]] < u ? n = i + 1 : a = i;
      u < e[r[n]] && (n > 0 && (t[o] = r[n - 1]), r[n] = o);
    }
  }
  for (n = r.length, a = r[n - 1]; n-- > 0; )
    r[n] = a, a = t[a];
  return r;
}
function Qn(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Qn(t);
}
function ps(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const tl = Symbol.for("v-scx"), rl = () => sr(tl);
function Ye(e, t, r) {
  return Zn(e, t, r);
}
function Zn(e, t, r = X) {
  const { immediate: o, deep: s, flush: n, once: a } = r, i = ye({}, r), l = t && o || !t && n !== "post";
  let u;
  if (pr) {
    if (n === "sync") {
      const b = rl();
      u = b.__watcherHandles || (b.__watcherHandles = []);
    } else if (!l) {
      const b = () => {
      };
      return b.stop = Qe, b.resume = Qe, b.pause = Qe, b;
    }
  }
  const c = _e;
  i.call = (b, x, h) => Xe(b, c, x, h);
  let p = !1;
  n === "post" ? i.scheduler = (b) => {
    Oe(b, c && c.suspense);
  } : n !== "sync" && (p = !0, i.scheduler = (b, x) => {
    x ? b() : Wo(b);
  }), i.augmentJob = (b) => {
    t && (b.flags |= 4), p && (b.flags |= 2, c && (b.id = c.uid, b.i = c));
  };
  const g = gi(e, t, i);
  return pr && (u ? u.push(g) : l && g()), g;
}
function ol(e, t, r) {
  const o = this.proxy, s = le(e) ? e.includes(".") ? Xn(o, e) : () => o[e] : e.bind(o, o);
  let n;
  V(t) ? n = t : (n = t.handler, r = t);
  const a = yr(this), i = Zn(s, n.bind(o), r);
  return a(), i;
}
function Xn(e, t) {
  const r = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < r.length && o; s++)
      o = o[r[s]];
    return o;
  };
}
const sl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${mt(t)}Modifiers`] || e[`${Ot(t)}Modifiers`];
function nl(e, t, ...r) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || X;
  let s = r;
  const n = t.startsWith("update:"), a = n && sl(o, t.slice(7));
  a && (a.trim && (s = r.map((c) => le(c) ? c.trim() : c)), a.number && (s = r.map(mo)));
  let i, l = o[i = oo(t)] || // also try camelCase event handler (#2249)
  o[i = oo(mt(t))];
  !l && n && (l = o[i = oo(Ot(t))]), l && Xe(
    l,
    e,
    6,
    s
  );
  const u = o[i + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[i])
      return;
    e.emitted[i] = !0, Xe(
      u,
      e,
      6,
      s
    );
  }
}
const al = /* @__PURE__ */ new WeakMap();
function ea(e, t, r = !1) {
  const o = r ? al : t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const n = e.emits;
  let a = {}, i = !1;
  if (!V(e)) {
    const l = (u) => {
      const c = ea(u, t, !0);
      c && (i = !0, ye(a, c));
    };
    !r && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !n && !i ? (re(e) && o.set(e, null), null) : (M(n) ? n.forEach((l) => a[l] = null) : ye(a, n), re(e) && o.set(e, a), a);
}
function Xr(e, t) {
  return !e || !Kr(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), q(e, t[0].toLowerCase() + t.slice(1)) || q(e, Ot(t)) || q(e, t));
}
function bs(e) {
  const {
    type: t,
    vnode: r,
    proxy: o,
    withProxy: s,
    propsOptions: [n],
    slots: a,
    attrs: i,
    emit: l,
    render: u,
    renderCache: c,
    props: p,
    data: g,
    setupState: b,
    ctx: x,
    inheritAttrs: h
  } = e, $ = Mr(e);
  let E, B;
  try {
    if (r.shapeFlag & 4) {
      const O = s || o, K = O;
      E = qe(
        u.call(
          K,
          O,
          c,
          p,
          b,
          g,
          x
        )
      ), B = i;
    } else {
      const O = t;
      E = qe(
        O.length > 1 ? O(
          p,
          { attrs: i, slots: a, emit: l }
        ) : O(
          p,
          null
        )
      ), B = t.props ? i : il(i);
    }
  } catch (O) {
    nr.length = 0, Qr(O, e, 1), E = He(vt);
  }
  let W = E;
  if (B && h !== !1) {
    const O = Object.keys(B), { shapeFlag: K } = W;
    O.length && K & 7 && (n && O.some(Eo) && (B = ll(
      B,
      n
    )), W = Ht(W, B, !1, !0));
  }
  return r.dirs && (W = Ht(W, null, !1, !0), W.dirs = W.dirs ? W.dirs.concat(r.dirs) : r.dirs), r.transition && Uo(W, r.transition), E = W, Mr($), E;
}
const il = (e) => {
  let t;
  for (const r in e)
    (r === "class" || r === "style" || Kr(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, ll = (e, t) => {
  const r = {};
  for (const o in e)
    (!Eo(o) || !(o.slice(9) in t)) && (r[o] = e[o]);
  return r;
};
function cl(e, t, r) {
  const { props: o, children: s, component: n } = e, { props: a, children: i, patchFlag: l } = t, u = n.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (r && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return o ? gs(o, a, u) : !!a;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        const g = c[p];
        if (a[g] !== o[g] && !Xr(u, g))
          return !0;
      }
    }
  } else
    return (s || i) && (!i || !i.$stable) ? !0 : o === a ? !1 : o ? a ? gs(o, a, u) : !0 : !!a;
  return !1;
}
function gs(e, t, r) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const n = o[s];
    if (t[n] !== e[n] && !Xr(r, n))
      return !0;
  }
  return !1;
}
function ul({ vnode: e, parent: t }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
}
const ta = (e) => e.__isSuspense;
function dl(e, t) {
  t && t.pendingBranch ? M(e) ? t.effects.push(...e) : t.effects.push(e) : xi(e);
}
const se = Symbol.for("v-fgt"), eo = Symbol.for("v-txt"), vt = Symbol.for("v-cmt"), uo = Symbol.for("v-stc"), nr = [];
let Ie = null;
function j(e = !1) {
  nr.push(Ie = e ? null : []);
}
function fl() {
  nr.pop(), Ie = nr[nr.length - 1] || null;
}
let fr = 1;
function hs(e, t = !1) {
  fr += e, e < 0 && Ie && t && (Ie.hasOnce = !0);
}
function ra(e) {
  return e.dynamicChildren = fr > 0 ? Ie || Ft : null, fl(), fr > 0 && Ie && Ie.push(e), e;
}
function A(e, t, r, o, s, n) {
  return ra(
    m(
      e,
      t,
      r,
      o,
      s,
      n,
      !0
    )
  );
}
function Co(e, t, r, o, s) {
  return ra(
    He(
      e,
      t,
      r,
      o,
      s,
      !0
    )
  );
}
function oa(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function qt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const sa = ({ key: e }) => e ?? null, $r = ({
  ref: e,
  ref_key: t,
  ref_for: r
}) => (typeof e == "number" && (e = "" + e), e != null ? le(e) || ie(e) || V(e) ? { i: Le, r: e, k: t, f: !!r } : e : null);
function m(e, t = null, r = null, o = 0, s = null, n = e === se ? 0 : 1, a = !1, i = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && sa(t),
    ref: t && $r(t),
    scopeId: En,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: n,
    patchFlag: o,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Le
  };
  return i ? (qo(l, r), n & 128 && e.normalize(l)) : r && (l.shapeFlag |= le(r) ? 8 : 16), fr > 0 && // avoid a block node from tracking itself
  !a && // has current parent block
  Ie && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || n & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Ie.push(l), l;
}
const He = pl;
function pl(e, t = null, r = null, o = 0, s = null, n = !1) {
  if ((!e || e === zi) && (e = vt), oa(e)) {
    const i = Ht(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return r && qo(i, r), fr > 0 && !n && Ie && (i.shapeFlag & 6 ? Ie[Ie.indexOf(e)] = i : Ie.push(i)), i.patchFlag = -2, i;
  }
  if (_l(e) && (e = e.__vccOpts), t) {
    t = bl(t);
    let { class: i, style: l } = t;
    i && !le(i) && (t.class = De(i)), re(l) && (Bo(l) && !M(l) && (l = ye({}, l)), t.style = Gr(l));
  }
  const a = le(e) ? 1 : ta(e) ? 128 : ki(e) ? 64 : re(e) ? 4 : V(e) ? 2 : 0;
  return m(
    e,
    t,
    r,
    o,
    s,
    a,
    n,
    !0
  );
}
function bl(e) {
  return e ? Bo(e) || Kn(e) ? ye({}, e) : e : null;
}
function Ht(e, t, r = !1, o = !1) {
  const { props: s, ref: n, patchFlag: a, children: i, transition: l } = e, u = t ? gl(s || {}, t) : s, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && sa(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && n ? M(n) ? n.concat($r(t)) : [n, $r(t)] : $r(t)
    ) : n,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== se ? a === -1 ? 16 : a | 16 : a,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: l,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ht(e.ssContent),
    ssFallback: e.ssFallback && Ht(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && o && Uo(
    c,
    l.clone(c)
  ), c;
}
function Ae(e = " ", t = 0) {
  return He(eo, null, e, t);
}
function L(e = "", t = !1) {
  return t ? (j(), Co(vt, null, e)) : He(vt, null, e);
}
function qe(e) {
  return e == null || typeof e == "boolean" ? He(vt) : M(e) ? He(
    se,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : oa(e) ? bt(e) : He(eo, null, String(e));
}
function bt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ht(e);
}
function qo(e, t) {
  let r = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (M(t))
    r = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), qo(e, s()), s._c && (s._d = !0));
      return;
    } else {
      r = 32;
      const s = t._;
      !s && !Kn(t) ? t._ctx = Le : s === 3 && Le && (Le.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else V(t) ? (t = { default: t, _ctx: Le }, r = 32) : (t = String(t), o & 64 ? (r = 16, t = [Ae(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function gl(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = De([t.class, o.class]));
      else if (s === "style")
        t.style = Gr([t.style, o.style]);
      else if (Kr(s)) {
        const n = t[s], a = o[s];
        a && n !== a && !(M(n) && n.includes(a)) && (t[s] = n ? [].concat(n, a) : a);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function Je(e, t, r, o = null) {
  Xe(e, t, 7, [
    r,
    o
  ]);
}
const hl = Vn();
let ml = 0;
function xl(e, t, r) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || hl, n = {
    uid: ml++,
    vnode: e,
    type: o,
    parent: t,
    appContext: s,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new dn(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Un(o, s),
    emitsOptions: ea(o, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: X,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: X,
    data: X,
    props: X,
    attrs: X,
    slots: X,
    refs: X,
    setupState: X,
    setupContext: null,
    // suspense related
    suspense: r,
    suspenseId: r ? r.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return n.ctx = { _: n }, n.root = t ? t.root : n, n.emit = nl.bind(null, n), e.ce && e.ce(n), n;
}
let _e = null;
const Yo = () => _e || Le;
let Dr, To;
{
  const e = Jr(), t = (r, o) => {
    let s;
    return (s = e[r]) || (s = e[r] = []), s.push(o), (n) => {
      s.length > 1 ? s.forEach((a) => a(n)) : s[0](n);
    };
  };
  Dr = t(
    "__VUE_INSTANCE_SETTERS__",
    (r) => _e = r
  ), To = t(
    "__VUE_SSR_SETTERS__",
    (r) => pr = r
  );
}
const yr = (e) => {
  const t = _e;
  return Dr(e), e.scope.on(), () => {
    e.scope.off(), Dr(t);
  };
}, ms = () => {
  _e && _e.scope.off(), Dr(null);
};
function na(e) {
  return e.vnode.shapeFlag & 4;
}
let pr = !1;
function vl(e, t = !1, r = !1) {
  t && To(t);
  const { props: o, children: s } = e.vnode, n = na(e);
  Wi(e, o, n, t), qi(e, s, r || t);
  const a = n ? yl(e, t) : void 0;
  return t && To(!1), a;
}
function yl(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Li);
  const { setup: o } = r;
  if (o) {
    it();
    const s = e.setupContext = o.length > 1 ? wl(e) : null, n = yr(e), a = xr(
      o,
      e,
      0,
      [
        e.props,
        s
      ]
    ), i = tn(a);
    if (lt(), n(), (i || e.sp) && !rr(e) && zn(e), i) {
      if (a.then(ms, ms), t)
        return a.then((l) => {
          xs(e, l);
        }).catch((l) => {
          Qr(l, e, 0);
        });
      e.asyncDep = a;
    } else
      xs(e, a);
  } else
    aa(e);
}
function xs(e, t, r) {
  V(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : re(t) && (e.setupState = jn(t)), aa(e);
}
function aa(e, t, r) {
  const o = e.type;
  e.render || (e.render = o.render || Qe);
  {
    const s = yr(e);
    it();
    try {
      Ri(e);
    } finally {
      lt(), s();
    }
  }
}
const kl = {
  get(e, t) {
    return ve(e, "get", ""), e[t];
  }
};
function wl(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return {
    attrs: new Proxy(e.attrs, kl),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function to(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(jn(Ho(e.exposed)), {
    get(t, r) {
      if (r in t)
        return t[r];
      if (r in or)
        return or[r](e);
    },
    has(t, r) {
      return r in t || r in or;
    }
  })) : e.proxy;
}
function _l(e) {
  return V(e) && "__vccOpts" in e;
}
const Ve = (e, t) => pi(e, t, pr), Sl = "3.5.22";
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Po;
const vs = typeof window < "u" && window.trustedTypes;
if (vs)
  try {
    Po = /* @__PURE__ */ vs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const ia = Po ? (e) => Po.createHTML(e) : (e) => e, Cl = "http://www.w3.org/2000/svg", Tl = "http://www.w3.org/1998/Math/MathML", rt = typeof document < "u" ? document : null, ys = rt && /* @__PURE__ */ rt.createElement("template"), Pl = {
  insert: (e, t, r) => {
    t.insertBefore(e, r || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, r, o) => {
    const s = t === "svg" ? rt.createElementNS(Cl, e) : t === "mathml" ? rt.createElementNS(Tl, e) : r ? rt.createElement(e, { is: r }) : rt.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => rt.createTextNode(e),
  createComment: (e) => rt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => rt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, r, o, s, n) {
    const a = r ? r.previousSibling : t.lastChild;
    if (s && (s === n || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), r), !(s === n || !(s = s.nextSibling)); )
        ;
    else {
      ys.innerHTML = ia(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const i = ys.content;
      if (o === "svg" || o === "mathml") {
        const l = i.firstChild;
        for (; l.firstChild; )
          i.appendChild(l.firstChild);
        i.removeChild(l);
      }
      t.insertBefore(i, r);
    }
    return [
      // first
      a ? a.nextSibling : t.firstChild,
      // last
      r ? r.previousSibling : t.lastChild
    ];
  }
}, jl = Symbol("_vtc");
function Al(e, t, r) {
  const o = e[jl];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const Vr = Symbol("_vod"), la = Symbol("_vsh"), ks = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: r }) {
    e[Vr] = e.style.display === "none" ? "" : e.style.display, r && t ? r.beforeEnter(e) : Yt(e, t);
  },
  mounted(e, { value: t }, { transition: r }) {
    r && t && r.enter(e);
  },
  updated(e, { value: t, oldValue: r }, { transition: o }) {
    !t != !r && (o ? t ? (o.beforeEnter(e), Yt(e, !0), o.enter(e)) : o.leave(e, () => {
      Yt(e, !1);
    }) : Yt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Yt(e, t);
  }
};
function Yt(e, t) {
  e.style.display = t ? e[Vr] : "none", e[la] = !t;
}
const $l = Symbol(""), Ol = /(?:^|;)\s*display\s*:/;
function Il(e, t, r) {
  const o = e.style, s = le(r);
  let n = !1;
  if (r && !s) {
    if (t)
      if (le(t))
        for (const a of t.split(";")) {
          const i = a.slice(0, a.indexOf(":")).trim();
          r[i] == null && Or(o, i, "");
        }
      else
        for (const a in t)
          r[a] == null && Or(o, a, "");
    for (const a in r)
      a === "display" && (n = !0), Or(o, a, r[a]);
  } else if (s) {
    if (t !== r) {
      const a = o[$l];
      a && (r += ";" + a), o.cssText = r, n = Ol.test(r);
    }
  } else t && e.removeAttribute("style");
  Vr in e && (e[Vr] = n ? o.display : "", e[la] && (o.display = "none"));
}
const ws = /\s*!important$/;
function Or(e, t, r) {
  if (M(r))
    r.forEach((o) => Or(e, t, o));
  else if (r == null && (r = ""), t.startsWith("--"))
    e.setProperty(t, r);
  else {
    const o = El(e, t);
    ws.test(r) ? e.setProperty(
      Ot(o),
      r.replace(ws, ""),
      "important"
    ) : e[o] = r;
  }
}
const _s = ["Webkit", "Moz", "ms"], fo = {};
function El(e, t) {
  const r = fo[t];
  if (r)
    return r;
  let o = mt(t);
  if (o !== "filter" && o in e)
    return fo[t] = o;
  o = sn(o);
  for (let s = 0; s < _s.length; s++) {
    const n = _s[s] + o;
    if (n in e)
      return fo[t] = n;
  }
  return t;
}
const Ss = "http://www.w3.org/1999/xlink";
function Cs(e, t, r, o, s, n = Ma(t)) {
  o && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(Ss, t.slice(6, t.length)) : e.setAttributeNS(Ss, t, r) : r == null || n && !an(r) ? e.removeAttribute(t) : e.setAttribute(
    t,
    n ? "" : Ze(r) ? String(r) : r
  );
}
function Ts(e, t, r, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    r != null && (e[t] = t === "innerHTML" ? ia(r) : r);
    return;
  }
  const n = e.tagName;
  if (t === "value" && n !== "PROGRESS" && // custom elements may use _value internally
  !n.includes("-")) {
    const i = n === "OPTION" ? e.getAttribute("value") || "" : e.value, l = r == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(r);
    (i !== l || !("_value" in e)) && (e.value = l), r == null && e.removeAttribute(t), e._value = r;
    return;
  }
  let a = !1;
  if (r === "" || r == null) {
    const i = typeof e[t];
    i === "boolean" ? r = an(r) : r == null && i === "string" ? (r = "", a = !0) : i === "number" && (r = 0, a = !0);
  }
  try {
    e[t] = r;
  } catch {
  }
  a && e.removeAttribute(s || t);
}
function Tt(e, t, r, o) {
  e.addEventListener(t, r, o);
}
function zl(e, t, r, o) {
  e.removeEventListener(t, r, o);
}
const Ps = Symbol("_vei");
function Ll(e, t, r, o, s = null) {
  const n = e[Ps] || (e[Ps] = {}), a = n[t];
  if (o && a)
    a.value = o;
  else {
    const [i, l] = Rl(t);
    if (o) {
      const u = n[t] = Fl(
        o,
        s
      );
      Tt(e, i, u, l);
    } else a && (zl(e, i, a, l), n[t] = void 0);
  }
}
const js = /(?:Once|Passive|Capture)$/;
function Rl(e) {
  let t;
  if (js.test(e)) {
    t = {};
    let o;
    for (; o = e.match(js); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ot(e.slice(2)), t];
}
let po = 0;
const Ml = /* @__PURE__ */ Promise.resolve(), Nl = () => po || (Ml.then(() => po = 0), po = Date.now());
function Fl(e, t) {
  const r = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= r.attached)
      return;
    Xe(
      Dl(o, r.value),
      t,
      5,
      [o]
    );
  };
  return r.value = e, r.attached = Nl(), r;
}
function Dl(e, t) {
  if (M(t)) {
    const r = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      r.call(e), e._stopped = !0;
    }, t.map(
      (o) => (s) => !s._stopped && o && o(s)
    );
  } else
    return t;
}
const As = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Vl = (e, t, r, o, s, n) => {
  const a = s === "svg";
  t === "class" ? Al(e, o, a) : t === "style" ? Il(e, r, o) : Kr(t) ? Eo(t) || Ll(e, t, r, o, n) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Bl(e, t, o, a)) ? (Ts(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Cs(e, t, o, a, n, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !le(o)) ? Ts(e, mt(t), o, n, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Cs(e, t, o, a));
};
function Bl(e, t, r, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && As(t) && V(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return As(t) && le(r) ? !1 : t in e;
}
const Br = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return M(t) ? (r) => Ar(t, r) : t;
};
function Hl(e) {
  e.target.composing = !0;
}
function $s(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Bt = Symbol("_assign"), Tr = {
  created(e, { modifiers: { lazy: t, trim: r, number: o } }, s) {
    e[Bt] = Br(s);
    const n = o || s.props && s.props.type === "number";
    Tt(e, t ? "change" : "input", (a) => {
      if (a.target.composing) return;
      let i = e.value;
      r && (i = i.trim()), n && (i = mo(i)), e[Bt](i);
    }), r && Tt(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Tt(e, "compositionstart", Hl), Tt(e, "compositionend", $s), Tt(e, "change", $s));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: r, modifiers: { lazy: o, trim: s, number: n } }, a) {
    if (e[Bt] = Br(a), e.composing) return;
    const i = (n || e.type === "number") && !/^0\d/.test(e.value) ? mo(e.value) : e.value, l = t ?? "";
    i !== l && (document.activeElement === e && e.type !== "range" && (o && t === r || s && e.value.trim() === l) || (e.value = l));
  }
}, Kl = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, r) {
    e[Bt] = Br(r), Tt(e, "change", () => {
      const o = e._modelValue, s = Wl(e), n = e.checked, a = e[Bt];
      if (M(o)) {
        const i = ln(o, s), l = i !== -1;
        if (n && !l)
          a(o.concat(s));
        else if (!n && l) {
          const u = [...o];
          u.splice(i, 1), a(u);
        }
      } else if (Wr(o)) {
        const i = new Set(o);
        n ? i.add(s) : i.delete(s), a(i);
      } else
        a(ca(e, n));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Os,
  beforeUpdate(e, t, r) {
    e[Bt] = Br(r), Os(e, t, r);
  }
};
function Os(e, { value: t, oldValue: r }, o) {
  e._modelValue = t;
  let s;
  if (M(t))
    s = ln(t, o.props.value) > -1;
  else if (Wr(t))
    s = t.has(o.props.value);
  else {
    if (t === r) return;
    s = qr(t, ca(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
function Wl(e) {
  return "_value" in e ? e._value : e.value;
}
function ca(e, t) {
  const r = t ? "_trueValue" : "_falseValue";
  return r in e ? e[r] : t;
}
const Ul = ["ctrl", "shift", "alt", "meta"], Jl = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Ul.some((r) => e[`${r}Key`] && !t.includes(r))
}, Gl = (e, t) => {
  const r = e._withMods || (e._withMods = {}), o = t.join(".");
  return r[o] || (r[o] = (s, ...n) => {
    for (let a = 0; a < t.length; a++) {
      const i = Jl[t[a]];
      if (i && i(s, t)) return;
    }
    return e(s, ...n);
  });
}, ql = /* @__PURE__ */ ye({ patchProp: Vl }, Pl);
let Is;
function Yl() {
  return Is || (Is = Qi(ql));
}
const Ql = (...e) => {
  const t = Yl().createApp(...e), { mount: r } = t;
  return t.mount = (o) => {
    const s = Xl(o);
    if (!s) return;
    const n = t._component;
    !V(n) && !n.render && !n.template && (n.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const a = r(s, !1, Zl(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), a;
  }, t;
};
function Zl(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Xl(e) {
  return le(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v3.0.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let ua;
const ro = (e) => ua = e, da = (
  /* istanbul ignore next */
  Symbol()
);
function jo(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ar;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ar || (ar = {}));
function ec() {
  const e = fn(!0), t = e.run(() => ce({}));
  let r = [], o = [];
  const s = Ho({
    install(n) {
      ro(s), s._a = n, n.provide(da, s), n.config.globalProperties.$pinia = s, o.forEach((a) => r.push(a)), o = [];
    },
    use(n) {
      return this._a ? r.push(n) : o.push(n), this;
    },
    _p: r,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return s;
}
const fa = () => {
};
function Es(e, t, r, o = fa) {
  e.add(t);
  const s = () => {
    e.delete(t) && o();
  };
  return !r && pn() && Fa(s), s;
}
function zt(e, ...t) {
  e.forEach((r) => {
    r(...t);
  });
}
const tc = (e) => e(), zs = Symbol(), bo = Symbol();
function Ao(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((r, o) => e.set(o, r)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const r in t) {
    if (!t.hasOwnProperty(r))
      continue;
    const o = t[r], s = e[r];
    jo(s) && jo(o) && e.hasOwnProperty(r) && !ie(o) && !ht(o) ? e[r] = Ao(s, o) : e[r] = o;
  }
  return e;
}
const rc = (
  /* istanbul ignore next */
  Symbol()
);
function oc(e) {
  return !jo(e) || !Object.prototype.hasOwnProperty.call(e, rc);
}
const { assign: ft } = Object;
function sc(e) {
  return !!(ie(e) && e.effect);
}
function nc(e, t, r, o) {
  const { state: s, actions: n, getters: a } = t, i = r.state.value[e];
  let l;
  function u() {
    i || (r.state.value[e] = s ? s() : {});
    const c = ci(r.state.value[e]);
    return ft(c, n, Object.keys(a || {}).reduce((p, g) => (p[g] = Ho(Ve(() => {
      ro(r);
      const b = r._s.get(e);
      return a[g].call(b, b);
    })), p), {}));
  }
  return l = pa(e, u, t, r, o, !0), l;
}
function pa(e, t, r = {}, o, s, n) {
  let a;
  const i = ft({ actions: {} }, r), l = { deep: !0 };
  let u, c, p = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Set(), b;
  const x = o.state.value[e];
  !n && !x && (o.state.value[e] = {}), ce({});
  let h;
  function $(D) {
    let H;
    u = c = !1, typeof D == "function" ? (D(o.state.value[e]), H = {
      type: ar.patchFunction,
      storeId: e,
      events: b
    }) : (Ao(o.state.value[e], D), H = {
      type: ar.patchObject,
      payload: D,
      storeId: e,
      events: b
    });
    const Q = h = Symbol();
    Ko().then(() => {
      h === Q && (u = !0);
    }), c = !0, zt(p, H, o.state.value[e]);
  }
  const E = n ? function() {
    const { state: H } = r, Q = H ? H() : {};
    this.$patch((ae) => {
      ft(ae, Q);
    });
  } : (
    /* istanbul ignore next */
    fa
  );
  function B() {
    a.stop(), p.clear(), g.clear(), o._s.delete(e);
  }
  const W = (D, H = "") => {
    if (zs in D)
      return D[bo] = H, D;
    const Q = function() {
      ro(o);
      const ae = Array.from(arguments), ue = /* @__PURE__ */ new Set(), ge = /* @__PURE__ */ new Set();
      function Se(F) {
        ue.add(F);
      }
      function Ee(F) {
        ge.add(F);
      }
      zt(g, {
        args: ae,
        name: Q[bo],
        store: K,
        after: Se,
        onError: Ee
      });
      let Z;
      try {
        Z = D.apply(this && this.$id === e ? this : K, ae);
      } catch (F) {
        throw zt(ge, F), F;
      }
      return Z instanceof Promise ? Z.then((F) => (zt(ue, F), F)).catch((F) => (zt(ge, F), Promise.reject(F))) : (zt(ue, Z), Z);
    };
    return Q[zs] = !0, Q[bo] = H, Q;
  }, O = {
    _p: o,
    // _s: scope,
    $id: e,
    $onAction: Es.bind(null, g),
    $patch: $,
    $reset: E,
    $subscribe(D, H = {}) {
      const Q = Es(p, D, H.detached, () => ae()), ae = a.run(() => Ye(() => o.state.value[e], (ue) => {
        (H.flush === "sync" ? c : u) && D({
          storeId: e,
          type: ar.direct,
          events: b
        }, ue);
      }, ft({}, l, H)));
      return Q;
    },
    $dispose: B
  }, K = Wt(O);
  o._s.set(e, K);
  const oe = (o._a && o._a.runWithContext || tc)(() => o._e.run(() => (a = fn()).run(() => t({ action: W }))));
  for (const D in oe) {
    const H = oe[D];
    if (ie(H) && !sc(H) || ht(H))
      n || (x && oc(H) && (ie(H) ? H.value = x[D] : Ao(H, x[D])), o.state.value[e][D] = H);
    else if (typeof H == "function") {
      const Q = W(H, D);
      oe[D] = Q, i.actions[D] = H;
    }
  }
  return ft(K, oe), ft(G(K), oe), Object.defineProperty(K, "$state", {
    get: () => o.state.value[e],
    set: (D) => {
      $((H) => {
        ft(H, D);
      });
    }
  }), o._p.forEach((D) => {
    ft(K, a.run(() => D({
      store: K,
      app: o._a,
      pinia: o,
      options: i
    })));
  }), x && n && r.hydrate && r.hydrate(K.$state, x), u = !0, c = !0, K;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ba(e, t, r) {
  let o;
  const s = typeof t == "function";
  o = s ? r : t;
  function n(a, i) {
    const l = Ki();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (l ? sr(da, null) : null), a && ro(a), a = ua, a._s.has(e) || (s ? pa(e, t, o, a) : nc(e, o, a)), a._s.get(e);
  }
  return n.$id = e, n;
}
var ac = Object.defineProperty, Ls = Object.getOwnPropertySymbols, ic = Object.prototype.hasOwnProperty, lc = Object.prototype.propertyIsEnumerable, Rs = (e, t, r) => t in e ? ac(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, cc = (e, t) => {
  for (var r in t || (t = {}))
    ic.call(t, r) && Rs(e, r, t[r]);
  if (Ls)
    for (var r of Ls(t))
      lc.call(t, r) && Rs(e, r, t[r]);
  return e;
};
function Qo(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
function uc(e) {
  return !!(e && e.constructor && e.call && e.apply);
}
function ne(e) {
  return !Qo(e);
}
function $t(e, t = !0) {
  return e instanceof Object && e.constructor === Object && (t || Object.keys(e).length !== 0);
}
function Pt(e, ...t) {
  return uc(e) ? e(...t) : e;
}
function Kt(e, t = !0) {
  return typeof e == "string" && (t || e !== "");
}
function ga(e, t = !0) {
  return Array.isArray(e) && (t || e.length !== 0);
}
function ha(e) {
  return ne(e) && !isNaN(e);
}
function at(e, t) {
  if (t) {
    const r = t.test(e);
    return t.lastIndex = 0, r;
  }
  return !1;
}
function dc(...e) {
  const t = (r = {}, o = {}) => {
    const s = cc({}, r);
    return Object.keys(o).forEach((n) => {
      $t(o[n]) && n in r && $t(r[n]) ? s[n] = t(r[n], o[n]) : s[n] = o[n];
    }), s;
  };
  return e.reduce((r, o, s) => s === 0 ? o : t(r, o), {});
}
function ir(e) {
  return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":");
}
function ma(e) {
  return Kt(e) ? e.replace(/(_)/g, "-").replace(/[A-Z]/g, (t, r) => r === 0 ? t : "-" + t.toLowerCase()).toLowerCase() : e;
}
function Ms(e) {
  return Kt(e) ? e.replace(/[A-Z]/g, (t, r) => r === 0 ? t : "." + t.toLowerCase()).toLowerCase() : e;
}
function xa() {
  const e = /* @__PURE__ */ new Map();
  return {
    on(t, r) {
      let o = e.get(t);
      return o ? o.push(r) : o = [r], e.set(t, o), this;
    },
    off(t, r) {
      let o = e.get(t);
      return o && o.splice(o.indexOf(r) >>> 0, 1), this;
    },
    emit(t, r) {
      let o = e.get(t);
      o && o.slice().map((s) => {
        s(r);
      });
    },
    clear() {
      e.clear();
    }
  };
}
var fc = Object.defineProperty, pc = Object.defineProperties, bc = Object.getOwnPropertyDescriptors, Hr = Object.getOwnPropertySymbols, va = Object.prototype.hasOwnProperty, ya = Object.prototype.propertyIsEnumerable, Ns = (e, t, r) => t in e ? fc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Fe = (e, t) => {
  for (var r in t || (t = {}))
    va.call(t, r) && Ns(e, r, t[r]);
  if (Hr)
    for (var r of Hr(t))
      ya.call(t, r) && Ns(e, r, t[r]);
  return e;
}, go = (e, t) => pc(e, bc(t)), tt = (e, t) => {
  var r = {};
  for (var o in e)
    va.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
  if (e != null && Hr)
    for (var o of Hr(e))
      t.indexOf(o) < 0 && ya.call(e, o) && (r[o] = e[o]);
  return r;
}, gc = xa(), ot = gc;
function Fs(e, t) {
  ga(e) ? e.push(...t || []) : $t(e) && Object.assign(e, t);
}
function hc(e) {
  return $t(e) && e.hasOwnProperty("value") && e.hasOwnProperty("type") ? e.value : e;
}
function Ds(e, t = "") {
  return ["opacity", "z-index", "line-height", "font-weight", "flex", "flex-grow", "flex-shrink", "order"].some((o) => t.endsWith(o)) ? e : `${e}`.trim().split(" ").map((n) => ha(n) ? `${n}px` : n).join(" ");
}
function mc(e) {
  return e.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function $o(e = "", t = "") {
  return mc(`${Kt(e, !1) && Kt(t, !1) ? `${e}-` : e}${t}`);
}
function ka(e = "", t = "") {
  return `--${$o(e, t)}`;
}
function wa(e, t = "", r = "", o = [], s) {
  if (Kt(e)) {
    const n = /{([^}]*)}/g, a = e.trim();
    if (at(a, n)) {
      const i = a.replaceAll(n, (c) => {
        const g = c.replace(/{|}/g, "").split(".").filter((b) => !o.some((x) => at(b, x)));
        return `var(${ka(r, ma(g.join("-")))}${ne(s) ? `, ${s}` : ""})`;
      }), l = /(\d+\s+[\+\-\*\/]\s+\d+)/g, u = /var\([^)]+\)/g;
      return at(i.replace(u, "0"), l) ? `calc(${i})` : i;
    }
    return Ds(a, t);
  } else if (ha(e))
    return Ds(e, t);
}
function xc(e, t, r) {
  Kt(t, !1) && e.push(`${t}:${r};`);
}
function Mt(e, t) {
  return e ? `${e}{${t}}` : "";
}
var lr = (...e) => vc(xe.getTheme(), ...e), vc = (e = {}, t, r, o) => {
  if (t) {
    const { variable: s, options: n } = xe.defaults || {}, { prefix: a, transform: i } = (e == null ? void 0 : e.options) || n || {}, u = at(t, /{([^}]*)}/g) ? t : `{${t}}`;
    return o === "value" || Qo(o) && i === "strict" ? xe.getTokenValue(t) : wa(u, void 0, a, [s.excludedKeyRegex], r);
  }
  return "";
};
function yc(e, t = {}) {
  const r = xe.defaults.variable, { prefix: o = r.prefix, selector: s = r.selector, excludedKeyRegex: n = r.excludedKeyRegex } = t, a = (u, c = "") => Object.entries(u).reduce(
    (p, [g, b]) => {
      const x = at(g, n) ? $o(c) : $o(c, ma(g)), h = hc(b);
      if ($t(h)) {
        const { variables: $, tokens: E } = a(h, x);
        Fs(p.tokens, E), Fs(p.variables, $);
      } else
        p.tokens.push((o ? x.replace(`${o}-`, "") : x).replaceAll("-", ".")), xc(p.variables, ka(x), wa(h, x, o, [n]));
      return p;
    },
    { variables: [], tokens: [] }
  ), { variables: i, tokens: l } = a(e, o);
  return {
    value: i,
    tokens: l,
    declarations: i.join(""),
    css: Mt(s, i.join(""))
  };
}
var Me = {
  regex: {
    rules: {
      class: {
        pattern: /^\.([a-zA-Z][\w-]*)$/,
        resolve(e) {
          return { type: "class", selector: e, matched: this.pattern.test(e.trim()) };
        }
      },
      attr: {
        pattern: /^\[(.*)\]$/,
        resolve(e) {
          return { type: "attr", selector: `:root${e}`, matched: this.pattern.test(e.trim()) };
        }
      },
      media: {
        pattern: /^@media (.*)$/,
        resolve(e) {
          return { type: "media", selector: `${e}{:root{[CSS]}}`, matched: this.pattern.test(e.trim()) };
        }
      },
      system: {
        pattern: /^system$/,
        resolve(e) {
          return { type: "system", selector: "@media (prefers-color-scheme: dark){:root{[CSS]}}", matched: this.pattern.test(e.trim()) };
        }
      },
      custom: {
        resolve(e) {
          return { type: "custom", selector: e, matched: !0 };
        }
      }
    },
    resolve(e) {
      const t = Object.keys(this.rules).filter((r) => r !== "custom").map((r) => this.rules[r]);
      return [e].flat().map((r) => {
        var o;
        return (o = t.map((s) => s.resolve(r)).find((s) => s.matched)) != null ? o : this.rules.custom.resolve(r);
      });
    }
  },
  _toVariables(e, t) {
    return yc(e, { prefix: t == null ? void 0 : t.prefix });
  },
  getCommon({ name: e = "", theme: t = {}, params: r, set: o, defaults: s }) {
    var n, a, i, l, u, c, p;
    const { preset: g, options: b } = t;
    let x, h, $, E, B, W, O;
    if (ne(g) && b.transform !== "strict") {
      const { primitive: K, semantic: pe, extend: oe } = g, D = pe || {}, { colorScheme: H } = D, Q = tt(D, ["colorScheme"]), ae = oe || {}, { colorScheme: ue } = ae, ge = tt(ae, ["colorScheme"]), Se = H || {}, { dark: Ee } = Se, Z = tt(Se, ["dark"]), F = ue || {}, { dark: J } = F, Ce = tt(F, ["dark"]), Te = ne(K) ? this._toVariables({ primitive: K }, b) : {}, de = ne(Q) ? this._toVariables({ semantic: Q }, b) : {}, fe = ne(Z) ? this._toVariables({ light: Z }, b) : {}, yt = ne(Ee) ? this._toVariables({ dark: Ee }, b) : {}, ut = ne(ge) ? this._toVariables({ semantic: ge }, b) : {}, kr = ne(Ce) ? this._toVariables({ light: Ce }, b) : {}, dt = ne(J) ? this._toVariables({ dark: J }, b) : {}, [It, Ut] = [(n = Te.declarations) != null ? n : "", Te.tokens], [wr, kt] = [(a = de.declarations) != null ? a : "", de.tokens || []], [Zo, d] = [(i = fe.declarations) != null ? i : "", fe.tokens || []], [f, v] = [(l = yt.declarations) != null ? l : "", yt.tokens || []], [w, y] = [(u = ut.declarations) != null ? u : "", ut.tokens || []], [k, T] = [(c = kr.declarations) != null ? c : "", kr.tokens || []], [C, S] = [(p = dt.declarations) != null ? p : "", dt.tokens || []];
      x = this.transformCSS(e, It, "light", "variable", b, o, s), h = Ut;
      const _ = this.transformCSS(e, `${wr}${Zo}`, "light", "variable", b, o, s), R = this.transformCSS(e, `${f}`, "dark", "variable", b, o, s);
      $ = `${_}${R}`, E = [.../* @__PURE__ */ new Set([...kt, ...d, ...v])];
      const P = this.transformCSS(e, `${w}${k}color-scheme:light`, "light", "variable", b, o, s), z = this.transformCSS(e, `${C}color-scheme:dark`, "dark", "variable", b, o, s);
      B = `${P}${z}`, W = [.../* @__PURE__ */ new Set([...y, ...T, ...S])], O = Pt(g.css, { dt: lr });
    }
    return {
      primitive: {
        css: x,
        tokens: h
      },
      semantic: {
        css: $,
        tokens: E
      },
      global: {
        css: B,
        tokens: W
      },
      style: O
    };
  },
  getPreset({ name: e = "", preset: t = {}, options: r, params: o, set: s, defaults: n, selector: a }) {
    var i, l, u;
    let c, p, g;
    if (ne(t) && r.transform !== "strict") {
      const b = e.replace("-directive", ""), x = t, { colorScheme: h, extend: $, css: E } = x, B = tt(x, ["colorScheme", "extend", "css"]), W = $ || {}, { colorScheme: O } = W, K = tt(W, ["colorScheme"]), pe = h || {}, { dark: oe } = pe, D = tt(pe, ["dark"]), H = O || {}, { dark: Q } = H, ae = tt(H, ["dark"]), ue = ne(B) ? this._toVariables({ [b]: Fe(Fe({}, B), K) }, r) : {}, ge = ne(D) ? this._toVariables({ [b]: Fe(Fe({}, D), ae) }, r) : {}, Se = ne(oe) ? this._toVariables({ [b]: Fe(Fe({}, oe), Q) }, r) : {}, [Ee, Z] = [(i = ue.declarations) != null ? i : "", ue.tokens || []], [F, J] = [(l = ge.declarations) != null ? l : "", ge.tokens || []], [Ce, Te] = [(u = Se.declarations) != null ? u : "", Se.tokens || []], de = this.transformCSS(b, `${Ee}${F}`, "light", "variable", r, s, n, a), fe = this.transformCSS(b, Ce, "dark", "variable", r, s, n, a);
      c = `${de}${fe}`, p = [.../* @__PURE__ */ new Set([...Z, ...J, ...Te])], g = Pt(E, { dt: lr });
    }
    return {
      css: c,
      tokens: p,
      style: g
    };
  },
  getPresetC({ name: e = "", theme: t = {}, params: r, set: o, defaults: s }) {
    var n;
    const { preset: a, options: i } = t, l = (n = a == null ? void 0 : a.components) == null ? void 0 : n[e];
    return this.getPreset({ name: e, preset: l, options: i, params: r, set: o, defaults: s });
  },
  getPresetD({ name: e = "", theme: t = {}, params: r, set: o, defaults: s }) {
    var n;
    const a = e.replace("-directive", ""), { preset: i, options: l } = t, u = (n = i == null ? void 0 : i.directives) == null ? void 0 : n[a];
    return this.getPreset({ name: a, preset: u, options: l, params: r, set: o, defaults: s });
  },
  applyDarkColorScheme(e) {
    return !(e.darkModeSelector === "none" || e.darkModeSelector === !1);
  },
  getColorSchemeOption(e, t) {
    var r;
    return this.applyDarkColorScheme(e) ? this.regex.resolve(e.darkModeSelector === !0 ? t.options.darkModeSelector : (r = e.darkModeSelector) != null ? r : t.options.darkModeSelector) : [];
  },
  getLayerOrder(e, t = {}, r, o) {
    const { cssLayer: s } = t;
    return s ? `@layer ${Pt(s.order || "primeui", r)}` : "";
  },
  getCommonStyleSheet({ name: e = "", theme: t = {}, params: r, props: o = {}, set: s, defaults: n }) {
    const a = this.getCommon({ name: e, theme: t, params: r, set: s, defaults: n }), i = Object.entries(o).reduce((l, [u, c]) => l.push(`${u}="${c}"`) && l, []).join(" ");
    return Object.entries(a || {}).reduce((l, [u, c]) => {
      if (c != null && c.css) {
        const p = ir(c == null ? void 0 : c.css), g = `${u}-variables`;
        l.push(`<style type="text/css" data-primevue-style-id="${g}" ${i}>${p}</style>`);
      }
      return l;
    }, []).join("");
  },
  getStyleSheet({ name: e = "", theme: t = {}, params: r, props: o = {}, set: s, defaults: n }) {
    var a;
    const i = { name: e, theme: t, params: r, set: s, defaults: n }, l = (a = e.includes("-directive") ? this.getPresetD(i) : this.getPresetC(i)) == null ? void 0 : a.css, u = Object.entries(o).reduce((c, [p, g]) => c.push(`${p}="${g}"`) && c, []).join(" ");
    return l ? `<style type="text/css" data-primevue-style-id="${e}-variables" ${u}>${ir(l)}</style>` : "";
  },
  createTokens(e = {}, t, r = "", o = "", s = {}) {
    return Object.entries(e).forEach(([n, a]) => {
      const i = at(n, t.variable.excludedKeyRegex) ? r : r ? `${r}.${Ms(n)}` : Ms(n), l = o ? `${o}.${n}` : n;
      $t(a) ? this.createTokens(a, t, i, l, s) : (s[i] || (s[i] = {
        paths: [],
        computed(u, c = {}) {
          var p, g;
          return this.paths.length === 1 ? (p = this.paths[0]) == null ? void 0 : p.computed(this.paths[0].scheme, c.binding) : u && u !== "none" ? (g = this.paths.find((b) => b.scheme === u)) == null ? void 0 : g.computed(u, c.binding) : this.paths.map((b) => b.computed(b.scheme, c[b.scheme]));
        }
      }), s[i].paths.push({
        path: l,
        value: a,
        scheme: l.includes("colorScheme.light") ? "light" : l.includes("colorScheme.dark") ? "dark" : "none",
        computed(u, c = {}) {
          const p = /{([^}]*)}/g;
          let g = a;
          if (c.name = this.path, c.binding || (c.binding = {}), at(a, p)) {
            const x = a.trim().replaceAll(p, (E) => {
              var B;
              const W = E.replace(/{|}/g, ""), O = (B = s[W]) == null ? void 0 : B.computed(u, c);
              return ga(O) && O.length === 2 ? `light-dark(${O[0].value},${O[1].value})` : O == null ? void 0 : O.value;
            }), h = /(\d+\w*\s+[\+\-\*\/]\s+\d+\w*)/g, $ = /var\([^)]+\)/g;
            g = at(x.replace($, "0"), h) ? `calc(${x})` : x;
          }
          return Qo(c.binding) && delete c.binding, {
            colorScheme: u,
            path: this.path,
            paths: c,
            value: g.includes("undefined") ? void 0 : g
          };
        }
      }));
    }), s;
  },
  getTokenValue(e, t, r) {
    var o;
    const n = ((l) => l.split(".").filter((c) => !at(c.toLowerCase(), r.variable.excludedKeyRegex)).join("."))(t), a = t.includes("colorScheme.light") ? "light" : t.includes("colorScheme.dark") ? "dark" : void 0, i = [(o = e[n]) == null ? void 0 : o.computed(a)].flat().filter((l) => l);
    return i.length === 1 ? i[0].value : i.reduce((l = {}, u) => {
      const c = u, { colorScheme: p } = c, g = tt(c, ["colorScheme"]);
      return l[p] = g, l;
    }, void 0);
  },
  getSelectorRule(e, t, r, o) {
    return r === "class" || r === "attr" ? Mt(ne(t) ? `${e}${t},${e} ${t}` : e, o) : Mt(e, ne(t) ? Mt(t, o) : o);
  },
  transformCSS(e, t, r, o, s = {}, n, a, i) {
    if (ne(t)) {
      const { cssLayer: l } = s;
      if (o !== "style") {
        const u = this.getColorSchemeOption(s, a);
        t = r === "dark" ? u.reduce((c, { type: p, selector: g }) => (ne(g) && (c += g.includes("[CSS]") ? g.replace("[CSS]", t) : this.getSelectorRule(g, i, p, t)), c), "") : Mt(i ?? ":root", t);
      }
      if (l) {
        const u = {
          name: "primeui"
        };
        $t(l) && (u.name = Pt(l.name, { name: e, type: o })), ne(u.name) && (t = Mt(`@layer ${u.name}`, t), n == null || n.layerNames(u.name));
      }
      return t;
    }
    return "";
  }
}, xe = {
  defaults: {
    variable: {
      prefix: "p",
      selector: ":root",
      excludedKeyRegex: /^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi
    },
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: !1
    }
  },
  _theme: void 0,
  _layerNames: /* @__PURE__ */ new Set(),
  _loadedStyleNames: /* @__PURE__ */ new Set(),
  _loadingStyles: /* @__PURE__ */ new Set(),
  _tokens: {},
  update(e = {}) {
    const { theme: t } = e;
    t && (this._theme = go(Fe({}, t), {
      options: Fe(Fe({}, this.defaults.options), t.options)
    }), this._tokens = Me.createTokens(this.preset, this.defaults), this.clearLoadedStyleNames());
  },
  get theme() {
    return this._theme;
  },
  get preset() {
    var e;
    return ((e = this.theme) == null ? void 0 : e.preset) || {};
  },
  get options() {
    var e;
    return ((e = this.theme) == null ? void 0 : e.options) || {};
  },
  get tokens() {
    return this._tokens;
  },
  getTheme() {
    return this.theme;
  },
  setTheme(e) {
    this.update({ theme: e }), ot.emit("theme:change", e);
  },
  getPreset() {
    return this.preset;
  },
  setPreset(e) {
    this._theme = go(Fe({}, this.theme), { preset: e }), this._tokens = Me.createTokens(e, this.defaults), this.clearLoadedStyleNames(), ot.emit("preset:change", e), ot.emit("theme:change", this.theme);
  },
  getOptions() {
    return this.options;
  },
  setOptions(e) {
    this._theme = go(Fe({}, this.theme), { options: e }), this.clearLoadedStyleNames(), ot.emit("options:change", e), ot.emit("theme:change", this.theme);
  },
  getLayerNames() {
    return [...this._layerNames];
  },
  setLayerNames(e) {
    this._layerNames.add(e);
  },
  getLoadedStyleNames() {
    return this._loadedStyleNames;
  },
  isStyleNameLoaded(e) {
    return this._loadedStyleNames.has(e);
  },
  setLoadedStyleName(e) {
    this._loadedStyleNames.add(e);
  },
  deleteLoadedStyleName(e) {
    this._loadedStyleNames.delete(e);
  },
  clearLoadedStyleNames() {
    this._loadedStyleNames.clear();
  },
  getTokenValue(e) {
    return Me.getTokenValue(this.tokens, e, this.defaults);
  },
  getCommon(e = "", t) {
    return Me.getCommon({ name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
  },
  getComponent(e = "", t) {
    const r = { name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
    return Me.getPresetC(r);
  },
  getDirective(e = "", t) {
    const r = { name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
    return Me.getPresetD(r);
  },
  getCustomPreset(e = "", t, r, o) {
    const s = { name: e, preset: t, options: this.options, selector: r, params: o, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
    return Me.getPreset(s);
  },
  getLayerOrderCSS(e = "") {
    return Me.getLayerOrder(e, this.options, { names: this.getLayerNames() }, this.defaults);
  },
  transformCSS(e = "", t, r = "style", o) {
    return Me.transformCSS(e, t, o, r, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults);
  },
  getCommonStyleSheet(e = "", t, r = {}) {
    return Me.getCommonStyleSheet({ name: e, theme: this.theme, params: t, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
  },
  getStyleSheet(e, t, r = {}) {
    return Me.getStyleSheet({ name: e, theme: this.theme, params: t, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
  },
  onStyleMounted(e) {
    this._loadingStyles.add(e);
  },
  onStyleUpdated(e) {
    this._loadingStyles.add(e);
  },
  onStyleLoaded(e, { name: t }) {
    this._loadingStyles.size && (this._loadingStyles.delete(t), ot.emit(`theme:${t}:load`, e), !this._loadingStyles.size && ot.emit("theme:load"));
  }
};
function _a(e) {
  return typeof HTMLElement == "object" ? e instanceof HTMLElement : e && typeof e == "object" && e !== null && e.nodeType === 1 && typeof e.nodeName == "string";
}
function Oo(e, t = {}) {
  if (_a(e)) {
    const r = (o, s) => {
      var n, a;
      const i = (n = e == null ? void 0 : e.$attrs) != null && n[o] ? [(a = e == null ? void 0 : e.$attrs) == null ? void 0 : a[o]] : [];
      return [s].flat().reduce((l, u) => {
        if (u != null) {
          const c = typeof u;
          if (c === "string" || c === "number")
            l.push(u);
          else if (c === "object") {
            const p = Array.isArray(u) ? r(o, u) : Object.entries(u).map(([g, b]) => o === "style" && (b || b === 0) ? `${g.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${b}` : b ? g : void 0);
            l = p.length ? l.concat(p.filter((g) => !!g)) : l;
          }
        }
        return l;
      }, i);
    };
    Object.entries(t).forEach(([o, s]) => {
      if (s != null) {
        const n = o.match(/^on(.+)/);
        n ? e.addEventListener(n[1].toLowerCase(), s) : o === "p-bind" ? Oo(e, s) : (s = o === "class" ? [...new Set(r("class", s))].join(" ").trim() : o === "style" ? r("style", s).join(";").trim() : s, (e.$attrs = e.$attrs || {}) && (e.$attrs[o] = s), e.setAttribute(o, s));
      }
    });
  }
}
function kc(e) {
  if (e) {
    let t = e.parentNode;
    return t && t instanceof ShadowRoot && t.host && (t = t.host), t;
  }
  return null;
}
function wc(e) {
  return !!(e !== null && typeof e < "u" && e.nodeName && kc(e));
}
function _c() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function Sc(e, t = "", r) {
  _a(e) && r !== null && r !== void 0 && e.setAttribute(t, r);
}
var he = {
  STARTS_WITH: "startsWith",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  ENDS_WITH: "endsWith",
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  LESS_THAN: "lt",
  LESS_THAN_OR_EQUAL_TO: "lte",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUAL_TO: "gte",
  DATE_IS: "dateIs",
  DATE_IS_NOT: "dateIsNot",
  DATE_BEFORE: "dateBefore",
  DATE_AFTER: "dateAfter"
};
function br(e) {
  "@babel/helpers - typeof";
  return br = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, br(e);
}
function Vs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), r.push.apply(r, o);
  }
  return r;
}
function Bs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Vs(Object(r), !0).forEach(function(o) {
      Cc(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Vs(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
function Cc(e, t, r) {
  return (t = Tc(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Tc(e) {
  var t = Pc(e, "string");
  return br(t) == "symbol" ? t : t + "";
}
function Pc(e, t) {
  if (br(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var o = r.call(e, t);
    if (br(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function jc(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  Yo() ? Mn(e) : t ? e() : Ko(e);
}
var Ac = 0;
function $c(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = ce(!1), o = ce(e), s = ce(null), n = _c() ? window.document : void 0, a = t.document, i = a === void 0 ? n : a, l = t.immediate, u = l === void 0 ? !0 : l, c = t.manual, p = c === void 0 ? !1 : c, g = t.name, b = g === void 0 ? "style_".concat(++Ac) : g, x = t.id, h = x === void 0 ? void 0 : x, $ = t.media, E = $ === void 0 ? void 0 : $, B = t.nonce, W = B === void 0 ? void 0 : B, O = t.first, K = O === void 0 ? !1 : O, pe = t.onMounted, oe = pe === void 0 ? void 0 : pe, D = t.onUpdated, H = D === void 0 ? void 0 : D, Q = t.onLoad, ae = Q === void 0 ? void 0 : Q, ue = t.props, ge = ue === void 0 ? {} : ue, Se = function() {
  }, Ee = function(J) {
    var Ce = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (i) {
      var Te = Bs(Bs({}, ge), Ce), de = Te.name || b, fe = Te.id || h, yt = Te.nonce || W;
      s.value = i.querySelector('style[data-primevue-style-id="'.concat(de, '"]')) || i.getElementById(fe) || i.createElement("style"), s.value.isConnected || (o.value = J || e, Oo(s.value, {
        type: "text/css",
        id: fe,
        media: E,
        nonce: yt
      }), K ? i.head.prepend(s.value) : i.head.appendChild(s.value), Sc(s.value, "data-primevue-style-id", de), Oo(s.value, Te), s.value.onload = function(ut) {
        return ae == null ? void 0 : ae(ut, {
          name: de
        });
      }, oe == null || oe(de)), !r.value && (Se = Ye(o, function(ut) {
        s.value.textContent = ut, H == null || H(de);
      }, {
        immediate: !0
      }), r.value = !0);
    }
  }, Z = function() {
    !i || !r.value || (Se(), wc(s.value) && i.head.removeChild(s.value), r.value = !1);
  };
  return u && !p && jc(Ee), {
    id: h,
    name: b,
    el: s,
    css: o,
    unload: Z,
    load: Ee,
    isLoaded: Er(r)
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
function Hs(e, t) {
  return zc(e) || Ec(e, t) || Ic(e, t) || Oc();
}
function Oc() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ic(e, t) {
  if (e) {
    if (typeof e == "string") return Ks(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Ks(e, t) : void 0;
  }
}
function Ks(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, o = Array(t); r < t; r++) o[r] = e[r];
  return o;
}
function Ec(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var o, s, n, a, i = [], l = !0, u = !1;
    try {
      if (n = (r = r.call(e)).next, t !== 0) for (; !(l = (o = n.call(r)).done) && (i.push(o.value), i.length !== t); l = !0) ;
    } catch (c) {
      u = !0, s = c;
    } finally {
      try {
        if (!l && r.return != null && (a = r.return(), Object(a) !== a)) return;
      } finally {
        if (u) throw s;
      }
    }
    return i;
  }
}
function zc(e) {
  if (Array.isArray(e)) return e;
}
function Ws(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), r.push.apply(r, o);
  }
  return r;
}
function ho(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ws(Object(r), !0).forEach(function(o) {
      Lc(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ws(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
function Lc(e, t, r) {
  return (t = Rc(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Rc(e) {
  var t = Mc(e, "string");
  return gr(t) == "symbol" ? t : t + "";
}
function Mc(e, t) {
  if (gr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var o = r.call(e, t);
    if (gr(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Nc = function(t) {
  var r = t.dt;
  return `
* {
    box-sizing: border-box;
}

/* Non vue overlay animations */
.p-connected-overlay {
    opacity: 0;
    transform: scaleY(0.8);
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-visible {
    opacity: 1;
    transform: scaleY(1);
}

.p-connected-overlay-hidden {
    opacity: 0;
    transform: scaleY(1);
    transition: opacity 0.1s linear;
}

/* Vue based overlay animations */
.p-connected-overlay-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
}

.p-connected-overlay-leave-to {
    opacity: 0;
}

.p-connected-overlay-enter-active {
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-leave-active {
    transition: opacity 0.1s linear;
}

/* Toggleable Content */
.p-toggleable-content-enter-from,
.p-toggleable-content-leave-to {
    max-height: 0;
}

.p-toggleable-content-enter-to,
.p-toggleable-content-leave-from {
    max-height: 1000px;
}

.p-toggleable-content-leave-active {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
}

.p-toggleable-content-enter-active {
    overflow: hidden;
    transition: max-height 1s ease-in-out;
}

.p-disabled,
.p-disabled * {
    cursor: default;
    pointer-events: none;
    user-select: none;
}

.p-disabled,
.p-component:disabled {
    opacity: `.concat(r("disabled.opacity"), `;
}

.pi {
    font-size: `).concat(r("icon.size"), `;
}

.p-icon {
    width: `).concat(r("icon.size"), `;
    height: `).concat(r("icon.size"), `;
}

.p-overlay-mask {
    background: `).concat(r("mask.background"), `;
    color: `).concat(r("mask.color"), `;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-mask-enter {
    animation: p-overlay-mask-enter-animation `).concat(r("mask.transition.duration"), ` forwards;
}

.p-overlay-mask-leave {
    animation: p-overlay-mask-leave-animation `).concat(r("mask.transition.duration"), ` forwards;
}

@keyframes p-overlay-mask-enter-animation {
    from {
        background: transparent;
    }
    to {
        background: `).concat(r("mask.background"), `;
    }
}
@keyframes p-overlay-mask-leave-animation {
    from {
        background: `).concat(r("mask.background"), `;
    }
    to {
        background: transparent;
    }
}
`);
}, Fc = function(t) {
  var r = t.dt;
  return `
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: `.concat(r("scrollbar.width"), `;
}
`);
}, Dc = {}, Vc = {}, Lt = {
  name: "base",
  css: Fc,
  theme: Nc,
  classes: Dc,
  inlineStyles: Vc,
  load: function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(n) {
      return n;
    }, s = o(Pt(t, {
      dt: lr
    }));
    return ne(s) ? $c(ir(s), ho({
      name: this.name
    }, r)) : {};
  },
  loadCSS: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.load(this.css, t);
  },
  loadTheme: function() {
    var t = this, r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return this.load(this.theme, r, function() {
      var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return xe.transformCSS(r.name || t.name, "".concat(s).concat(o));
    });
  },
  getCommonTheme: function(t) {
    return xe.getCommon(this.name, t);
  },
  getComponentTheme: function(t) {
    return xe.getComponent(this.name, t);
  },
  getDirectiveTheme: function(t) {
    return xe.getDirective(this.name, t);
  },
  getPresetTheme: function(t, r, o) {
    return xe.getCustomPreset(this.name, t, r, o);
  },
  getLayerOrderThemeCSS: function() {
    return xe.getLayerOrderCSS(this.name);
  },
  getStyleSheet: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var o = Pt(this.css, {
        dt: lr
      }) || "", s = ir("".concat(o).concat(t)), n = Object.entries(r).reduce(function(a, i) {
        var l = Hs(i, 2), u = l[0], c = l[1];
        return a.push("".concat(u, '="').concat(c, '"')) && a;
      }, []).join(" ");
      return ne(s) ? '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(n, ">").concat(s, "</style>") : "";
    }
    return "";
  },
  getCommonThemeStyleSheet: function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return xe.getCommonStyleSheet(this.name, t, r);
  },
  getThemeStyleSheet: function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = [xe.getStyleSheet(this.name, t, r)];
    if (this.theme) {
      var s = this.name === "base" ? "global-style" : "".concat(this.name, "-style"), n = Pt(this.theme, {
        dt: lr
      }), a = ir(xe.transformCSS(s, n)), i = Object.entries(r).reduce(function(l, u) {
        var c = Hs(u, 2), p = c[0], g = c[1];
        return l.push("".concat(p, '="').concat(g, '"')) && l;
      }, []).join(" ");
      ne(a) && o.push('<style type="text/css" data-primevue-style-id="'.concat(s, '" ').concat(i, ">").concat(a, "</style>"));
    }
    return o.join("");
  },
  extend: function(t) {
    return ho(ho({}, this), {}, {
      css: void 0,
      theme: void 0
    }, t);
  }
}, Pr = xa();
function hr(e) {
  "@babel/helpers - typeof";
  return hr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, hr(e);
}
function Us(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), r.push.apply(r, o);
  }
  return r;
}
function jr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Us(Object(r), !0).forEach(function(o) {
      Bc(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Us(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
function Bc(e, t, r) {
  return (t = Hc(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Hc(e) {
  var t = Kc(e, "string");
  return hr(t) == "symbol" ? t : t + "";
}
function Kc(e, t) {
  if (hr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var o = r.call(e, t);
    if (hr(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Wc = {
  ripple: !1,
  inputStyle: null,
  inputVariant: null,
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    completed: "Completed",
    pending: "Pending",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    showMonthAfterYear: !1,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found",
    searchMessage: "{0} results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    fileChosenMessage: "{0} files",
    noFileChosenMessage: "No file chosen",
    emptyMessage: "No available options",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
      navigation: "Navigation",
      scrollTop: "Scroll Top",
      moveTop: "Move Top",
      moveUp: "Move Up",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "Page {page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left",
      listLabel: "Option List"
    }
  },
  filterMatchModeOptions: {
    text: [he.STARTS_WITH, he.CONTAINS, he.NOT_CONTAINS, he.ENDS_WITH, he.EQUALS, he.NOT_EQUALS],
    numeric: [he.EQUALS, he.NOT_EQUALS, he.LESS_THAN, he.LESS_THAN_OR_EQUAL_TO, he.GREATER_THAN, he.GREATER_THAN_OR_EQUAL_TO],
    date: [he.DATE_IS, he.DATE_IS_NOT, he.DATE_BEFORE, he.DATE_AFTER]
  },
  zIndex: {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  },
  theme: void 0,
  unstyled: !1,
  pt: void 0,
  ptOptions: {
    mergeSections: !0,
    mergeProps: !1
  },
  csp: {
    nonce: void 0
  }
}, Uc = Symbol();
function Jc(e, t) {
  var r = {
    config: Wt(t)
  };
  return e.config.globalProperties.$primevue = r, e.provide(Uc, r), Gc(), qc(e, r), r;
}
var Nt = [];
function Gc() {
  ot.clear(), Nt.forEach(function(e) {
    return e == null ? void 0 : e();
  }), Nt = [];
}
function qc(e, t) {
  var r = ce(!1), o = function() {
    var u;
    if (((u = t.config) === null || u === void 0 ? void 0 : u.theme) !== "none" && !xe.isStyleNameLoaded("common")) {
      var c, p, g = ((c = Lt.getCommonTheme) === null || c === void 0 ? void 0 : c.call(Lt)) || {}, b = g.primitive, x = g.semantic, h = g.global, $ = g.style, E = {
        nonce: (p = t.config) === null || p === void 0 || (p = p.csp) === null || p === void 0 ? void 0 : p.nonce
      };
      Lt.load(b == null ? void 0 : b.css, jr({
        name: "primitive-variables"
      }, E)), Lt.load(x == null ? void 0 : x.css, jr({
        name: "semantic-variables"
      }, E)), Lt.load(h == null ? void 0 : h.css, jr({
        name: "global-variables"
      }, E)), Lt.loadTheme(jr({
        name: "global-style"
      }, E), $), xe.setLoadedStyleName("common");
    }
  };
  ot.on("theme:change", function(l) {
    r.value || (e.config.globalProperties.$primevue.config.theme = l, r.value = !0);
  });
  var s = Ye(t.config, function(l, u) {
    Pr.emit("config:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  }), n = Ye(function() {
    return t.config.ripple;
  }, function(l, u) {
    Pr.emit("config:ripple:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  }), a = Ye(function() {
    return t.config.theme;
  }, function(l, u) {
    r.value || xe.setTheme(l), t.config.unstyled || o(), r.value = !1, Pr.emit("config:theme:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  }), i = Ye(function() {
    return t.config.unstyled;
  }, function(l, u) {
    !l && t.config.theme && o(), Pr.emit("config:unstyled:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  });
  Nt.push(s), Nt.push(n), Nt.push(a), Nt.push(i);
}
var Yc = {
  install: function(t, r) {
    var o = dc(Wc, r);
    Jc(t, o);
  }
};
const Qc = {
  // For PrimeVue version 3
  accordiontab: {
    root: {
      class: ["mb-0", "border-b border-surface-200 dark:border-surface-700"]
    },
    header: ({ props: e }) => ({
      class: [
        // State
        {
          "select-none pointer-events-none cursor-default opacity-60": e == null ? void 0 : e.disabled
        }
      ]
    }),
    headerAction: {
      class: [
        //Font
        "font-semibold",
        "leading-none",
        // Alignments
        "flex justify-between items-center",
        "flex-row-reverse",
        "relative",
        // Sizing
        "p-[1.125rem]",
        // Shape
        "rounded-md",
        "border-0",
        // Color
        "bg-surface-0 dark:bg-surface-900",
        "text-surface-600 dark:text-surface-0/80",
        // Transition
        "transition duration-200 ease-in-out",
        "transition-shadow duration-200",
        // States
        "focus:outline-none focus:outline-offset-0 focus-visible:ring-1 focus-visible:ring-primary-400 dark:focus-visible:ring-primary-300",
        // Focus
        // Misc
        "cursor-pointer no-underline select-none"
      ]
    },
    headerIcon: ({ context: e }) => ({
      class: [
        "inline-block ml-2",
        { "text-surface-900 dark:text-surface-0": e.active }
      ]
    }),
    headerTitle: {
      class: "leading-none"
    },
    content: {
      class: [
        // Spacing
        "p-[1.125rem] pt-0",
        //Shape
        "border-0 rounded-none",
        // Color
        "bg-surface-0 dark:bg-surface-900",
        "text-surface-600 dark:text-surface-0/70"
      ]
    },
    transition: {
      enterFromClass: "max-h-0",
      enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
      enterToClass: "max-h-[1000px]",
      leaveFromClass: "max-h-[1000px]",
      leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
      leaveToClass: "max-h-0"
    }
  }
}, Zc = {
  content: "p-5 pt-0 bg-surface-0 dark:bg-surface-900 text-surface-600 dark:text-surface-0/70"
}, Xc = {
  root: ({ context: e }) => ({
    class: [
      "flex items-center justify-between bg-surface-0 dark:bg-surface-900 text-surface-600 dark:text-surface-0/70 p-[1.125rem] font-semibold outline-transparent",
      {
        "focus-visible:outline-offset-2 focus-visible:ring-1 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400": !e.disabled
      },
      {
        "hover:text-surface-700 dark:hover:text-surface-0": !e.disabled
      }
    ]
  }),
  toggleIcon: "inline-block text-surface-900 dark:text-surface-0 w-4 h-4"
}, eu = {
  root: ({ props: e, context: t }) => ({
    class: [
      "flex flex-col border-b border-surface-200 dark:border-surface-700",
      {
        "[&>[data-pc-name=accordionheader]]:select-none [&>[data-pc-name=accordionheader]]:pointer-events-none [&>[data-pc-name=accordionheader]]:cursor-default [&>[data-pc-name=accordionheader]]:opacity-60": e == null ? void 0 : e.disabled,
        "[&>[data-pc-name=accordionheader]]:text-surface-700 dark:[&>[data-pc-name=accordionheader]]:text-surface-100 hover:[&>[data-pc-name=accordionheader]]:text-surface-800 dark:hover:[&>[data-pc-name=accordionheader]]:text-surface-0": !e.disabled && t.active,
        "[&>[data-pc-section=toggleicon]]:text-surface-700 dark:[&>[data-pc-section=toggleicon]]:text-surface-100 hover:[&>[data-pc-section=toggleicon]]:text-surface-800 dark:hover:[&>[data-pc-section=toggleicon]]:text-surface-0": !e.disabled && t.active,
        "[&:last-child>[data-pc-name=accordioncontent]>[data-pc-section=content]]:rounded-b-md": !e.disabled && t.active,
        "[&:last-child>[data-pc-name=accordionheader]]:rounded-b-md": !e.disabled && !t.active
      },
      "[&:nth-child(n+2)>[data-pc-name=accordionheader]]:border-t-0",
      "[&:first-child>[data-pc-name=accordionheader]]:rounded-t-md"
    ]
  })
}, tu = {
  root: ({ props: e }) => ({
    class: [
      "relative",
      // Flex
      {
        flex: e.fluid,
        "inline-flex": !e.fluid
      },
      // Size
      { "w-full": e.multiple },
      { "[&>input]:!rounded-r-none": e.dropdown },
      // Color
      "text-surface-900 dark:text-surface-0",
      //States
      {
        "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": e.disabled
      }
    ]
  }),
  inputMultiple: ({ props: e, state: t }) => ({
    class: [
      // Font
      "leading-none",
      // Flex
      "flex items-center flex-wrap",
      "gap-2",
      // Spacing
      "m-0 list-none",
      "py-1 px-1",
      // Size
      "w-full",
      // Shape
      "appearance-none rounded-md",
      // Color
      "text-surface-700 dark:text-white/80",
      "placeholder:text-surface-400 dark:placeholder:text-surface-500",
      { "bg-surface-0 dark:bg-surface-950": !e.disabled },
      "border",
      { "border-surface-300 dark:border-surface-700": !e.invalid },
      // Invalid State
      "invalid:focus:ring-red-200",
      "invalid:hover:border-red-500",
      { "border-red-500 dark:border-red-400": e.invalid },
      // States
      {
        "hover:border-surface-400 dark:hover:border-surface-700": !e.invalid
      },
      {
        "outline-none outline-offset-0 z-10 ring-1 ring-primary-500 dark:ring-primary-400": t.focused
      },
      // Transition
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-text overflow-hidden"
    ]
  }),
  inputToken: {
    class: ["py-1 px-0 ml-2", "inline-flex flex-auto"]
  },
  inputChip: {
    class: "flex-auto inline-flex pt-1 pb-1"
  },
  input: {
    class: "border-none outline-none bg-transparent m-0 p-0 shadow-none rounded-none w-full"
  },
  dropdown: {
    class: [
      "relative",
      // Alignments
      "items-center inline-flex justify-center text-center align-bottom",
      // Shape
      "rounded-r-md",
      // Size
      "py-2 leading-none",
      "w-10",
      // Colors
      "text-primary-contrast",
      "bg-primary",
      "border border-primary",
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring-1 ",
      "hover:bg-primary-emphasis hover:border-primary-emphasis",
      "focus:ring-primary-500 dark:focus:ring-primary-400"
    ]
  },
  loader: {
    class: [
      "text-surface-500 dark:text-surface-0/70",
      "absolute top-[50%] right-[0.5rem] -mt-2 animate-spin"
    ]
  },
  overlay: {
    class: [
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-white/80",
      // Shape
      "border border-surface-300 dark:border-surface-700",
      "rounded-md",
      "shadow-md",
      // Size
      "overflow-auto"
    ]
  },
  list: {
    class: "p-1 list-none m-0"
  },
  option: ({ context: e }) => ({
    class: [
      "relative",
      // Font
      "leading-none",
      // Spacing
      "m-0 px-3 py-2",
      "first:mt-0 mt-[2px]",
      // Shape
      "border-0 rounded",
      // Colors
      {
        "bg-surface-200 dark:bg-surface-600/60": e.focused && !e.selected,
        "text-surface-700 dark:text-white/80": e.focused && !e.selected,
        "bg-highlight": e.selected
      },
      //States
      {
        "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.focused && !e.selected
      },
      { "hover:bg-highlight-emphasis": e.selected },
      {
        "hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-[rgba(255,255,255,0.03)]": e.focused && !e.selected
      },
      // Transition
      "transition-shadow duration-200",
      // Misc
      "cursor-pointer overflow-hidden whitespace-nowrap"
    ]
  }),
  optionGroup: {
    class: [
      "font-semibold",
      // Spacing
      "m-0 py-2 px-3",
      // Colors
      "text-surface-400 dark:text-surface-500",
      // Misc
      "cursor-auto"
    ]
  },
  emptyMessage: {
    class: [
      // Font
      "leading-none",
      // Spacing
      "py-2 px-3",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-transparent"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
}, ru = {
  root: ({ props: e, parent: t }) => {
    var r, o, s;
    return {
      class: [
        // Font
        {
          "text-xl": e.size == "large",
          "text-2xl": e.size == "xlarge"
        },
        // Alignments
        "inline-flex items-center justify-center",
        "relative",
        // Sizes
        {
          "h-8 w-8": e.size == null || e.size == "normal",
          "w-12 h-12": e.size == "large",
          "w-16 h-16": e.size == "xlarge"
        },
        { "-ml-4": ((r = t.instance.$style) == null ? void 0 : r.name) == "avatargroup" },
        // Shapes
        {
          "rounded-lg": e.shape == "square",
          "rounded-full": e.shape == "circle"
        },
        { "border-2": ((o = t.instance.$style) == null ? void 0 : o.name) == "avatargroup" },
        // Colors
        "bg-surface-300 dark:bg-surface-700",
        {
          "border-white dark:border-surface-800": ((s = t.instance.$style) == null ? void 0 : s.name) == "avatargroup"
        }
      ]
    };
  },
  image: ({ props: e }) => ({
    class: [
      "h-full w-full",
      {
        "rounded-lg": e.shape == "square",
        "rounded-full": e.shape == "circle"
      }
    ]
  })
}, ou = {
  root: {
    class: "flex items-center"
  }
}, su = {
  root: ({ props: e }) => {
    var t, r;
    return {
      class: [
        // Font
        "font-bold",
        {
          "text-xs leading-[1.5rem]": e.size === null,
          "text-[0.625rem] leading-[1.25rem]": e.size === "small",
          "text-lg leading-[2.25rem]": e.size === "large",
          "text-2xl leading-[3rem]": e.size === "xlarge"
        },
        // Alignment
        "text-center inline-block",
        // Size
        "p-0 px-1",
        {
          "w-2 h-2": e.value === null,
          "min-w-[1.5rem] h-[1.5rem]": e.value !== null && e.size === null,
          "min-w-[1.25rem] h-[1.25rem]": e.size === "small",
          "min-w-[2.25rem] h-[2.25rem]": e.size === "large",
          "min-w-[3rem] h-[3rem]": e.size === "xlarge"
        },
        // Shape
        {
          "rounded-full": ((t = e.value) == null ? void 0 : t.length) === 1,
          "rounded-[0.71rem]": ((r = e.value) == null ? void 0 : r.length) !== 1
        },
        // Color
        "text-primary-contrast",
        {
          "bg-primary": e.severity == null || e.severity === "primary",
          "bg-surface-500 dark:bg-surface-400": e.severity === "secondary",
          "bg-green-500 dark:bg-green-400": e.severity === "success",
          "bg-blue-500 dark:bg-blue-400": e.severity === "info",
          "bg-orange-500 dark:bg-orange-400": e.severity === "warn",
          "bg-purple-500 dark:bg-purple-400": e.severity === "help",
          "bg-red-500 dark:bg-red-400": e.severity === "danger",
          "text-surface-0 dark:text-surface-900 bg-surface-900 dark:bg-surface-0": e.severity === "contrast"
        }
      ]
    };
  }
}, nu = {
  root: ({ context: e }) => ({
    class: [
      // Font
      "font-bold",
      "text-xs leading-5",
      // Alignment
      "flex items-center justify-center",
      "text-center",
      // Position
      "absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 origin-top-right",
      // Size
      "m-0",
      {
        "p-0": e.nogutter || e.dot,
        "px-2": !e.nogutter && !e.dot,
        "min-w-[0.5rem] w-2 h-2": e.dot,
        "min-w-[1.5rem] h-6": !e.dot
      },
      // Shape
      {
        "rounded-full": e.nogutter || e.dot,
        "rounded-[10px]": !e.nogutter && !e.dot
      },
      // Color
      "text-primary-contrast",
      {
        "bg-primary": !e.info && !e.success && !e.warning && !e.danger && !e.help && !e.secondary,
        "bg-surface-500 dark:bg-surface-400": e.secondary,
        "bg-green-500 dark:bg-green-400": e.success,
        "bg-blue-500 dark:bg-blue-400": e.info,
        "bg-orange-500 dark:bg-orange-400": e.warning,
        "bg-purple-500 dark:bg-purple-400": e.help,
        "bg-red-500 dark:bg-red-400": e.danger
      }
    ]
  })
}, au = {
  root: "relative",
  mask: "bg-black/40 rounded-md"
}, iu = {
  root: {
    class: [
      // Shape
      "rounded-md",
      // Spacing
      "p-4",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      // Misc
      "overflow-x-auto"
    ]
  },
  list: {
    class: [
      // Flex & Alignment
      "flex items-center flex-nowrap",
      // Spacing
      "m-0 p-0 list-none leading-none"
    ]
  },
  itemLink: {
    class: [
      // Flex & Alignment
      "flex items-center gap-2",
      // Shape
      "rounded-md",
      // Color
      "text-surface-600 dark:text-white/70",
      // States
      "focus-visible:outline-none focus-visible:outline-offset-0",
      "focus-visible:ring-1 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
      // Transitions
      "transition-shadow duration-200",
      // Misc
      "text-decoration-none"
    ]
  },
  itemIcon: {
    class: "text-surface-600 dark:text-white/70"
  },
  separator: {
    class: [
      // Flex & Alignment
      "flex items-center",
      // Spacing
      "mx-2",
      // Color
      "text-surface-600 dark:text-white/70"
    ]
  }
}, lu = {
  root: ({ props: e, context: t, parent: r, instance: o }) => ({
    class: [
      "relative",
      // Fluid
      { "w-full": e.fluid },
      // Alignments
      "items-center inline-flex text-center align-bottom justify-center",
      {
        "flex-col": (e.iconPos === "top" || e.iconPos === "bottom") && e.label
      },
      // Sizes & Spacing
      "leading-[normal] text-nowrap",
      {
        "px-3 py-2": e.size === null,
        "text-sm py-1.5 px-3": e.size === "small",
        "text-xl py-3 px-4": e.size === "large"
      },
      { "gap-2": e.label !== null },
      {
        "w-10 px-0": e.label == null && e.icon !== null
      },
      {
        "w-10 px-0 gap-0": o.hasIcon && !e.label && !e.badge,
        "rounded-[50%] h-10 [&>[data-pc-section=label]]:w-0 [&>[data-pc-section=label]]:invisible": o.hasIcon && !e.label && !e.badge && e.rounded
      },
      // Shapes
      { "shadow-lg": e.raised },
      { "rounded-md": !e.rounded, "rounded-full": e.rounded },
      {
        "rounded-none first:rounded-l-md last:rounded-r-md": r.instance.$name == "InputGroup"
      },
      // Link Button
      { "text-primary-600 bg-transparent border-transparent": e.link },
      // Plain Button
      {
        "text-white bg-gray-500 border border-gray-500": e.plain && !e.outlined && !e.text
      },
      // Plain Text Button
      { "text-surface-500": e.plain && e.text },
      // Plain Outlined Button
      {
        "text-surface-500 border border-gray-500": e.plain && e.outlined
      },
      // Text Button
      { "bg-transparent border-transparent": e.text && !e.plain },
      // Outlined Button
      { "bg-transparent border": e.outlined && !e.plain },
      // --- Severity Buttons ---
      // Primary Button
      {
        "text-surface-0": !e.link && e.severity === null && !e.text && !e.outlined && !e.plain,
        "bg-primary-700": !e.link && e.severity === null && !e.text && !e.outlined && !e.plain,
        "border border-primary-700": !e.link && e.severity === null && !e.text && !e.outlined && !e.plain
      },
      // Primary Text Button
      {
        "text-primary-600": e.text && e.severity === null && !e.plain
      },
      // Primary Outlined Button
      {
        "text-primary-700 border border-primary-700": e.outlined && e.severity === null && !e.plain
      },
      // Secondary Button
      {
        "text-surface-900 dark:text-white": e.severity === "secondary" && !e.text && !e.outlined && !e.plain,
        "bg-secondary-400 dark:bg-secondary-400": e.severity === "secondary" && !e.text && !e.outlined && !e.plain,
        "border border-secondary-400 dark:border-secondary-400": e.severity === "secondary" && !e.text && !e.outlined && !e.plain
      },
      // Secondary Text Button
      {
        "text-secondary-400 dark:text-secondary-400": e.text && e.severity === "secondary" && !e.plain
      },
      // Secondary Outlined Button
      {
        "text-secondary-400 dark:text-secondary-400 border border-secondary-400 hover:bg-secondary-300/10": e.outlined && e.severity === "secondary" && !e.plain
      },
      // Success Button
      {
        "text-white dark:text-success-900": e.severity === "success" && !e.text && !e.outlined && !e.plain,
        "bg-success-500 dark:bg-success-400": e.severity === "success" && !e.text && !e.outlined && !e.plain,
        "border border-success-500 dark:border-success-400": e.severity === "success" && !e.text && !e.outlined && !e.plain
      },
      // Success Text Button
      {
        "text-success-500 dark:text-success-400": e.text && e.severity === "success" && !e.plain
      },
      // Success Outlined Button
      {
        "text-success-500 border border-success-500 hover:bg-success-300/10": e.outlined && e.severity === "success" && !e.plain
      },
      // Info Button
      {
        "text-white dark:text-surface-900": e.severity === "info" && !e.text && !e.outlined && !e.plain,
        "bg-blue-500 dark:bg-info-400": e.severity === "info" && !e.text && !e.outlined && !e.plain,
        "border border-blue-500 dark:border-info-400": e.severity === "info" && !e.text && !e.outlined && !e.plain
      },
      // Info Text Button
      {
        "text-info-400 dark:text-info-400": e.text && e.severity === "info" && !e.plain
      },
      // Info Outlined Button
      {
        "text-info-400 border border-info-400 hover:bg-info-300/10 ": e.outlined && e.severity === "info" && !e.plain
      },
      // Warning Button
      {
        "text-white dark:text-surface-900": e.severity === "warn" && !e.text && !e.outlined && !e.plain,
        "bg-orange-500 dark:bg-orange-400": e.severity === "warn" && !e.text && !e.outlined && !e.plain,
        "border border-orange-500 dark:border-orange-400": e.severity === "warn" && !e.text && !e.outlined && !e.plain
      },
      // Warning Text Button
      {
        "text-orange-500 dark:text-orange-400": e.text && e.severity === "warn" && !e.plain
      },
      // Warning Outlined Button
      {
        "text-orange-500 border border-orange-500 hover:bg-orange-300/10": e.outlined && e.severity === "warn" && !e.plain
      },
      // Help Button
      {
        "text-white dark:text-surface-900": e.severity === "help" && !e.text && !e.outlined && !e.plain,
        "bg-purple-500 dark:bg-purple-400": e.severity === "help" && !e.text && !e.outlined && !e.plain,
        "border border-purple-500 dark:border-purple-400": e.severity === "help" && !e.text && !e.outlined && !e.plain
      },
      // Help Text Button
      {
        "text-purple-500 dark:text-purple-400": e.text && e.severity === "help" && !e.plain
      },
      // Help Outlined Button
      {
        "text-purple-500 border border-purple-500 hover:bg-purple-300/10": e.outlined && e.severity === "help" && !e.plain
      },
      // Danger Button
      {
        "text-white dark:text-surface-900": e.severity === "danger" && !e.text && !e.outlined && !e.plain,
        "bg-danger-500 dark:bg-danger-400": e.severity === "danger" && !e.text && !e.outlined && !e.plain,
        "border border-danger-500 dark:border-danger-400": e.severity === "danger" && !e.text && !e.outlined && !e.plain
      },
      // Danger Text Button
      {
        "text-danger-400 dark:text-danger-400": e.text && e.severity === "danger" && !e.plain
      },
      // Danger Outlined Button
      {
        "text-danger-400 border border-danger-400 hover:bg-danger-300/10": e.outlined && e.severity === "danger" && !e.plain
      },
      // Contrast Button
      {
        "text-white dark:text-surface-900": e.severity === "contrast" && !e.text && !e.outlined && !e.plain,
        "bg-surface-900 dark:bg-surface-300": e.severity === "contrast" && !e.text && !e.outlined && !e.plain,
        "border border-surface-900 dark:border-surface-300": e.severity === "contrast" && !e.text && !e.outlined && !e.plain
      },
      // Contrast Text Button
      {
        "text-surface-900 dark:text-surface-300": e.text && e.severity === "contrast" && !e.plain
      },
      // Contrast Outlined Button
      {
        "text-surface-900 dark:text-surface-300 border border-surface-900 dark:border-surface-600": e.outlined && e.severity === "contrast" && !e.plain
      },
      // --- Severity Button States ---
      "focus:outline-none focus:outline-offset-0 focus:ring-1",
      // Link
      { "focus:ring-primary-400": e.link },
      // Plain
      {
        "hover:bg-gray-600 hover:border-gray-600": e.plain && !e.outlined && !e.text
      },
      // Text & Outlined Button
      {
        "hover:bg-surface-300/10": e.plain && (e.text || e.outlined)
      },
      // Primary
      {
        "hover:bg-primary-600/80 hover:border-primary-600/80": !e.link && e.severity === null && !e.text && !e.outlined && !e.plain
      },
      { "focus:ring-primary-300": e.severity === null },
      // Text & Outlined Button
      {
        "hover:bg-primary-300/10": (e.text || e.outlined) && e.severity === null && !e.plain
      },
      // Secondary
      {
        "hover:bg-secondary-300 dark:hover:bg-secondary-300 hover:border-secondary-300 dark:hover:border-secondary-300": e.severity === "secondary" && !e.text && !e.outlined && !e.plain
      },
      {
        "focus:ring-secondary-500 dark:focus:ring-secondary-400": e.severity === "secondary"
      },
      // Text & Outlined Button
      {
        "hover:bg-secondary-300/10": (e.text || e.outlined) && e.severity === "secondary" && !e.plain
      },
      // Success
      {
        "hover:bg-success-600 dark:hover:bg-success-300 hover:border-success-600 dark:hover:border-success-300": e.severity === "success" && !e.text && !e.outlined && !e.plain
      },
      {
        "focus:ring-success-500 dark:focus:ring-success-400": e.severity === "success"
      },
      // Text & Outlined Button
      {
        "hover:bg-success-300/10": (e.text || e.outlined) && e.severity === "success" && !e.plain
      },
      // Info
      {
        "hover:bg-blue-600 dark:hover:bg-info-300 hover:border-blue-600 dark:hover:border-info-300": e.severity === "info" && !e.text && !e.outlined && !e.plain
      },
      {
        "focus:ring-blue-400 dark:focus:ring-info-300": e.severity === "info"
      },
      // Text & Outlined Button
      {
        "hover:bg-info-300/10": (e.text || e.outlined) && e.severity === "info" && !e.plain
      },
      // Warning
      {
        "hover:bg-orange-600 dark:hover:bg-orange-300 hover:border-orange-600 dark:hover:border-orange-300": e.severity === "warn" && !e.text && !e.outlined && !e.plain
      },
      {
        "focus:ring-orange-500 dark:focus:ring-orange-400": e.severity === "warn"
      },
      // Text & Outlined Button
      {
        "hover:bg-orange-300/10": (e.text || e.outlined) && e.severity === "warn" && !e.plain
      },
      // Help
      {
        "hover:bg-purple-600 dark:hover:bg-purple-300 hover:border-purple-600 dark:hover:border-purple-300": e.severity === "help" && !e.text && !e.outlined && !e.plain
      },
      {
        "focus:ring-purple-500 dark:focus:ring-purple-400": e.severity === "help"
      },
      // Text & Outlined Button
      {
        "hover:bg-purple-300/10": (e.text || e.outlined) && e.severity === "help" && !e.plain
      },
      // Danger
      {
        "hover:bg-danger-600 dark:hover:bg-danger-300 hover:border-danger-600 dark:hover:border-danger-300": e.severity === "danger" && !e.text && !e.outlined && !e.plain
      },
      {
        "focus:ring-danger-500 dark:focus:ring-danger-400": e.severity === "danger"
      },
      // Text & Outlined Button
      {
        "hover:bg-danger-300/10": (e.text || e.outlined) && e.severity === "danger" && !e.plain
      },
      // Contrast
      {
        "hover:bg-surface-800 dark:hover:bg-surface-200 hover:border-surface-800 dark:hover:border-surface-200": e.severity === "contrast" && !e.text && !e.outlined && !e.plain
      },
      {
        "focus:ring-surface-500 dark:focus:ring-surface-0": e.severity === "contrast"
      },
      // Text & Outlined Button
      {
        "hover:bg-surface-900/10 dark:hover:bg-[rgba(255,255,255,0.03)]": (e.text || e.outlined) && e.severity === "contrast" && !e.plain
      },
      // Disabled
      { "opacity-60 pointer-events-none cursor-default": t.disabled },
      // Transitions
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer overflow-hidden select-none",
      // Badge
      "[&>[data-pc-name=badge]]:min-w-4 [&>[data-pc-name=badge]]:h-4 [&>[data-pc-name=badge]]:leading-4"
    ]
  }),
  label: ({ props: e }) => ({
    class: [
      "duration-200",
      "font-medium",
      "truncate",
      {
        "hover:underline": e.link
      },
      { "flex-1": e.label !== null, "invisible w-0": e.label == null }
    ]
  }),
  icon: ({ props: e }) => ({
    class: [
      "text-base leading-4",
      "mx-0",
      {
        "mr-2": e.iconPos == "left" && e.label != null,
        "ml-2 order-1": e.iconPos == "right" && e.label != null,
        "order-2": e.iconPos == "bottom" && e.label != null
      }
    ]
  }),
  loadingIcon: ({ props: e }) => ({
    class: [
      "h-4 w-4",
      "mx-0",
      {
        "mr-2": e.iconPos == "left" && e.label != null,
        "ml-2 order-1": e.iconPos == "right" && e.label != null,
        "mb-2": e.iconPos == "top" && e.label != null,
        "mt-2": e.iconPos == "bottom" && e.label != null
      },
      "animate-spin"
    ]
  }),
  badge: ({ props: e }) => ({
    class: [
      {
        "ml-2 w-4 h-4 leading-none flex items-center justify-center": e.badge
      }
    ]
  })
}, cu = {
  root: {
    class: [
      "[&>[data-pc-name=button]]:m-0",
      "[&>[data-pc-name=button]]:border-r-none",
      "[&>[data-pc-name=button]:nth-last-child(n+2)]:rounded-tr-none",
      "[&>[data-pc-name=button]:nth-last-child(n+2)]:rounded-br-none",
      "[&>[data-pc-name=button]:nth-child(n+2)]:rounded-tl-none",
      "[&>[data-pc-name=button]:nth-child(n+2)]:rounded-bl-none",
      "flex"
    ]
  }
}, uu = {
  root: {
    class: [
      //Flex
      "flex flex-col",
      //Shape
      "rounded-[0.25rem]",
      "shadow-md",
      //Color
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-700 dark:text-surface-0"
    ]
  },
  body: {
    class: [
      //Flex
      "flex flex-col",
      "gap-4",
      "p-6"
    ]
  },
  caption: {
    class: [
      //Flex
      "flex flex-col",
      "gap-2"
    ]
  },
  title: {
    class: "text-xl font-semibold mb-0"
  },
  subtitle: {
    class: [
      //Font
      "font-normal",
      //Spacing
      "mb-0",
      //Color
      "text-surface-600 dark:text-surface-0/60"
    ]
  },
  content: {
    class: "p-0"
  },
  footer: {
    class: "p-0"
  }
}, du = {
  root: {
    class: [
      // Flexbox
      "flex flex-col"
    ]
  },
  contentContainer: {
    class: [
      // Flexbox & Overflow
      "flex flex-col overflow-auto"
    ]
  },
  content: ({ props: e }) => ({
    class: [
      // Flexbox
      "flex",
      // Orientation
      {
        "flex-row": e.orientation !== "vertical",
        "flex-col": e.orientation == "vertical"
      },
      "[&>[data-pc-extend=button]]:self-center"
    ]
  }),
  viewport: {
    class: [
      // Overflow & Width
      "overflow-hidden w-full"
    ]
  },
  itemList: ({ props: e }) => ({
    class: [
      // Flexbox
      "flex",
      // Orientation & Sizing
      {
        "flex-row": e.orientation !== "vertical",
        "flex-col h-full": e.orientation == "vertical"
      }
    ]
  }),
  item: ({ props: e }) => ({
    class: [
      // Flexbox
      "flex shrink-0 grow ",
      // Size
      {
        "w-full sm:w-[50%] md:w-[33.333333333333336%]": e.orientation !== "vertical",
        "w-full h-full": e.orientation == "vertical"
      }
    ]
  }),
  itemClone: ({ props: e }) => ({
    class: [
      // Flexbox
      "flex shrink-0 grow",
      "unvisible",
      // Size
      {
        "w-full sm:w-[50%] md:w-[33.333333333333336%]": e.orientation !== "vertical",
        "w-full h-full": e.orientation == "vertical"
      }
    ]
  }),
  indicatorList: {
    class: [
      // Flexbox & Alignment
      "flex flex-row justify-center flex-wrap"
    ]
  },
  indicator: {
    class: [
      // Spacing
      "mr-2 mb-2"
    ]
  },
  indicatorButton: ({ context: e }) => ({
    class: [
      // Sizing & Shape
      "w-8 h-2 rounded-md",
      // Transitions
      "transition duration-200",
      // Focus Styles
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400",
      // Color & Background
      {
        "bg-surface-200 hover:bg-surface-300 dark:bg-surface-700 dark:hover:bg-surface-600": !e.highlighted,
        "bg-primary hover:bg-primary-emphasis": e.highlighted
      }
    ]
  })
}, fu = {
  root: ({ props: e, state: t }) => ({
    class: [
      "relative",
      // Flex
      {
        flex: e.fluid,
        "inline-flex": !e.fluid
      },
      // Shape
      "rounded-md",
      // Color and Background
      { "bg-surface-0 dark:bg-surface-950": !e.disabled },
      "border",
      { "border-surface-300 dark:border-surface-600": !e.invalid },
      // Invalid State
      "invalid:focus:ring-red-200",
      "invalid:hover:border-red-500",
      { "border-red-500 dark:border-red-400": e.invalid },
      // Transitions
      "transition-all",
      "duration-200",
      // States
      {
        "hover:border-surface-400 dark:hover:border-surface-600": !e.invalid
      },
      {
        "outline-none outline-offset-0 ring-1 ring-primary-500 dark:ring-primary-400": t.focused
      },
      // Misc
      "cursor-pointer",
      "select-none",
      {
        "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": e.disabled
      }
    ]
  }),
  label: ({ props: e, parent: t }) => {
    var r, o, s, n;
    return {
      class: [
        //Font
        "leading-[normal]",
        // Display
        "block",
        "flex-auto",
        // Color and Background
        "bg-transparent",
        "border-0",
        {
          "text-surface-800 dark:text-white/80": e.modelValue != null,
          "text-surface-400 dark:text-surface-500": e.modelValue == null
        },
        {
          "placeholder:text-transparent dark:placeholder:text-transparent": ((r = t.instance) == null ? void 0 : r.$name) == "FloatLabel",
          "!text-transparent dark:!text-transparent": ((o = t.instance) == null ? void 0 : o.$name) == "FloatLabel" && e.modelValue == null || ((s = e.modelValue) == null ? void 0 : s.length) == 0
        },
        // Sizing and Spacing
        "w-[1%]",
        "py-2 px-3",
        { "pr-7": e.showClear },
        //Shape
        "rounded-none",
        // Transitions
        "transition",
        "duration-200",
        // States
        "focus:outline-none focus:shadow-none",
        // Filled State *for FloatLabel
        {
          filled: ((n = t.instance) == null ? void 0 : n.$name) == "FloatLabel" && e.modelValue !== null
        },
        // Misc
        "relative",
        "cursor-pointer",
        "overflow-hidden overflow-ellipsis",
        "whitespace-nowrap",
        "appearance-none"
      ]
    };
  },
  dropdown: {
    class: [
      // Flexbox
      "flex items-center justify-center",
      "shrink-0",
      // Color and Background
      "bg-transparent",
      "text-surface-500",
      // Size
      "w-12",
      // Shape
      "rounded-r-md"
    ]
  },
  overlay: {
    class: [
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-white/80",
      // Shape
      "border border-surface-300 dark:border-surface-700",
      "rounded-md",
      "shadow-md"
    ]
  },
  list: {
    class: "flex flex-col list-none p-0 m-0 gap-[2px] min-w-full"
  },
  option: ({ context: e }) => ({
    class: [
      //Shape
      "rounded-[4px]",
      // Spacing
      "first:mt-0 mt-[2px]",
      // Colors
      {
        "text-surface-500 dark:text-white/70": !e.focused && !e.active,
        "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-surface-600/90": e.focused && !e.active,
        "bg-highlight text-highlight-contrast": e.focused && e.active || e.active || !e.focused && e.active
      },
      // Transitions
      "transition-shadow",
      "duration-200",
      // States
      {
        "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.active,
        "hover:bg-highlight-emphasis": e.active
      },
      // Disabled
      { "opacity-60 pointer-events-none cursor-default": e.disabled }
    ]
  }),
  optionContent: {
    class: [
      "relative",
      "leading-[normal]",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-2",
      "px-3",
      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none"
    ]
  },
  groupIcon: {
    class: [
      // Alignment
      "ml-auto"
    ]
  },
  optionList: {
    class: [
      "min-w-full",
      // Spacing
      "p-1",
      "m-0",
      "list-none",
      // Shape
      "shadow-none sm:shadow-md",
      "rounded-md",
      "border border-surface-200 dark:border-surface-700",
      // Position
      "static sm:absolute",
      "z-10",
      // Color
      "bg-surface-0 dark:bg-surface-900"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
}, pu = {
  root: {
    class: [
      "relative",
      // Alignment
      "inline-flex",
      "align-bottom",
      // Size
      "w-5",
      "h-5",
      // Misc
      "cursor-pointer",
      "select-none"
    ]
  },
  box: ({ props: e, context: t }) => ({
    class: [
      // Alignment
      "flex",
      "items-center",
      "justify-center",
      // Size
      "w-5",
      "h-5",
      // Shape
      "rounded",
      "border",
      // Colors
      {
        "border-surface-300 dark:border-surface-700": !t.checked && !e.invalid,
        "bg-surface-0 dark:bg-surface-950": !t.checked && !e.invalid && !e.disabled,
        "border-secondary-400 bg-secondary-400": t.checked
      },
      // Invalid State
      "invalid:focus:ring-danger-400",
      "invalid:hover:border-danger-400",
      { "border-danger-400 dark:border-danger-400": e.invalid },
      // States
      {
        "peer-hover:border-surface-400 dark:peer-hover:border-surface-600": !e.disabled && !t.checked && !e.invalid,
        "peer-hover:bg-primary-emphasis peer-hover:border-primary-emphasis": !e.disabled && t.checked,
        "peer-focus-visible:z-10 peer-focus-visible:outline-none peer-focus-visible:outline-offset-0 peer-focus-visible:ring-1 peer-focus-visible:ring-primary-500 dark:peer-focus-visible:ring-secondary-200": !e.disabled,
        "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": e.disabled
      },
      {
        "[&>svg]:text-primary-contrast [&>svg]:w-[0.875rem] [&>svg]:h-[0.875rem]": t.checked
      },
      // Transitions
      "transition-colors",
      "duration-200"
    ]
  }),
  input: {
    class: [
      "peer",
      // Size
      "w-full ",
      "h-full",
      // Position
      "absolute",
      "top-0 left-0",
      "z-10",
      // Spacing
      "p-0",
      "m-0",
      // Shape
      "opacity-0",
      "rounded",
      "outline-none",
      "border border-surface-300 dark:border-surface-700",
      // Misc
      "appearance-none",
      "cursor-pointer"
    ]
  },
  icon: ({ context: e, state: t }) => ({
    class: [
      // Size
      "w-[0.875rem]",
      "h-[0.875rem]",
      // Colors
      {
        "text-primary-contrast": e.checked,
        "text-primary": t.d_indeterminate
      },
      // Transitions
      "transition-all",
      "duration-200"
    ]
  })
}, bu = {
  root: {
    class: [
      // Flexbox
      "inline-flex items-center",
      // Spacing
      "px-3 py-1 gap-2",
      // Shape
      "rounded-[16px]",
      // Colors
      "text-surface-700 dark:text-white",
      "bg-surface-100 dark:bg-surface-700"
    ]
  },
  label: {
    class: "leading-6 m-0"
  },
  icon: {
    class: "leading-6 mr-2"
  },
  image: {
    class: ["w-8 h-8 -ml-2 mr-2", "rounded-full"]
  },
  removeIcon: {
    class: [
      "inline-block",
      // Shape
      "rounded-md leading-6",
      // Size
      "w-4 h-4",
      // Transition
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer"
    ]
  }
}, gu = {
  root: ({ props: e }) => ({
    class: [
      // Display
      "inline-block",
      // Misc
      {
        "opacity-60 select-none pointer-events-none cursor-default": e.disabled
      }
    ]
  }),
  preview: {
    class: [
      // Font
      "text-base leading-none",
      // Spacing
      "m-0",
      "p-0",
      //Size
      "w-6 h-6",
      // Shape
      "rounded-md",
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-300 dark:border-surface-700",
      // States
      "hover:border-surface-400 dark:hover:border-surface-600",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:z-10",
      // Transition
      "transition-colors duration-200",
      // Misc
      "cursor-pointer"
    ]
  },
  panel: ({ props: e }) => ({
    class: [
      // Position & Size
      {
        "relative h-[166px] w-[193px]": e.inline,
        "absolute h-[166px] w-[193px]": !e.inline
      },
      // Shape
      "shadow-md border",
      // Colors
      "bg-surface-800 dark:bg-surface-900 border-surface-600 dark:border-surface-700"
    ]
  }),
  colorSelector: {
    class: [
      // Position
      "absolute top-[8px] left-[8px]",
      // Size
      "h-[150px] w-[150px]"
    ]
  },
  colorbackground: {
    class: [
      // Size
      "h-[150px] w-[150px]"
    ],
    style: "background:linear-gradient(to top,#000 0%,rgba(0,0,0,0) 100%),linear-gradient(to right,#fff 0%,rgba(255,255,255,0) 100%)"
  },
  colorHandle: {
    class: [
      "absolute",
      // Shape
      "rounded-full border border-solid",
      // Size
      "h-[10px] w-[10px]",
      // Spacing
      "-ml-[5px] -mt-[5px]",
      // Colors
      "border-white",
      // Misc
      "cursor-pointer opacity-85"
    ]
  },
  hue: {
    class: [
      // Position
      "absolute top-[8px] left-[167px]",
      // Size
      "h-[150px] w-[17px]",
      // Opacity
      "opacity-85"
    ],
    style: "background: linear-gradient(0deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red)"
  },
  hueHandle: {
    class: [
      // Position
      "absolute left-0 -ml-[2px] -mt-[5px]",
      // Size
      "h-[10px] w-[21px]",
      // Shape
      "border-solid border-2",
      // Misc
      "cursor-pointer opacity-85"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
}, hu = {
  icon: "w-8 h-8 text-[2rem] mr-2"
}, mu = {
  root: {
    class: [
      // Shape
      "rounded-lg",
      "shadow-lg",
      "border-0",
      // Positioning
      "z-40 transform origin-center",
      "mt-3 absolute left-0 top-0",
      '[&[data-p-confirmpopup-flipped="true"]]:mb-3 [&[data-p-confirmpopup-flipped="true"]]:-mt-3',
      // Color
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-surface-0/80",
      // Before: Arrow
      "before:absolute before:w-0 before:-top-3 before:h-0 before:border-transparent before:border-solid before:ml-[10px] before:border-x-[10px] before:border-b-[10px] before:border-t-0 before:border-b-surface-200 dark:before:border-b-surface-700",
      "after:absolute after:w-0 after:-top-[0.54rem] after:left-[4px] after:h-0 after:border-transparent after:border-solid after:ml-[8px] after:border-x-[8px] after:border-b-[8px] after:border-t-0 after:border-b-surface-0 dark:after:border-b-surface-900",
      // Flipped: Arrow
      '[&[data-p-confirmpopup-flipped="true"]]:before:-bottom-3 [&[data-p-confirmpopup-flipped="true"]]:before:top-auto [&[data-p-confirmpopup-flipped="true"]]:before:border-b-0 [&[data-p-confirmpopup-flipped="true"]]:before:border-t-[10px] [&[data-p-confirmpopup-flipped="true"]]:before:border-t-surface-200 dark:[&[data-p-confirmpopup-flipped="true"]]:before:border-t-surface-700',
      '[&[data-p-confirmpopup-flipped="true"]]:after:-bottom-[0.54rem] [&[data-p-confirmpopup-flipped="true"]]:after:top-auto [&[data-p-confirmpopup-flipped="true"]]:after:border-b-0 [&[data-p-confirmpopup-flipped="true"]]:after:border-t-[8px] [&[data-p-confirmpopup-flipped="true"]]:after:border-t-surface-0 dark:[&[data-p-confirmpopup-flipped="true"]]:after:border-t-surface-900'
    ]
  },
  content: {
    class: [
      "p-4 items-center flex",
      "rounded-t-lg",
      "border-x border-t last:border-b border-surface-200 dark:border-surface-700"
    ]
  },
  icon: {
    class: "text-2xl mr-4"
  },
  footer: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-end",
      "shrink-0",
      "text-right",
      "gap-2",
      // Spacing
      "px-4",
      "pb-4",
      // Shape
      "border-t-0",
      "rounded-b-lg",
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-surface-0/80",
      "border-x border-b border-surface-200 dark:border-surface-700"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
}, xu = {
  root: {
    class: [
      // Sizing and Shape
      "min-w-[12.5rem]",
      "rounded-md",
      "shadow-md",
      // Spacing
      "p-1",
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-white/80",
      "border border-surface-200 dark:border-surface-700"
    ]
  },
  rootList: {
    class: [
      // Spacings and Shape
      "flex flex-col",
      "list-none",
      "m-0",
      "p-0",
      "outline-none"
    ]
  },
  item: {
    class: "relative my-[2px] [&:first-child]:mt-0"
  },
  itemContent: ({ context: e }) => ({
    class: [
      //Shape
      "rounded-[4px]",
      // Colors
      {
        "text-surface-500 dark:text-white/70": !e.focused && !e.active,
        "text-surface-500 dark:text-white/70 bg-surface-100 dark:bg-[rgba(255,255,255,0.03)]": e.focused && !e.active,
        "bg-highlight text-highlight-contrast": e.focused && e.active || e.active || !e.focused && e.active
      },
      // Transitions
      "transition-shadow",
      "duration-200",
      // States
      {
        "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.active,
        "hover:bg-highlight-emphasis": e.active
      },
      // Disabled
      { "opacity-60 pointer-events-none cursor-default": e.disabled }
    ]
  }),
  itemLink: {
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-2",
      "px-3",
      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none"
    ]
  },
  itemIcon: {
    class: [
      // Spacing
      "mr-2"
    ]
  },
  itemLabel: {
    class: ["leading-none"]
  },
  submenu: ({ props: e }) => ({
    class: [
      "flex flex-col",
      // Size
      "w-full sm:w-48",
      // Spacing
      "p-1",
      "m-0",
      "list-none",
      // Shape
      "shadow-md",
      "rounded-md",
      "dark:border dark:border-surface-700",
      // Position
      "static sm:absolute",
      "z-10",
      { "sm:absolute sm:left-full sm:top-0": e.level > 1 },
      // Color
      "bg-surface-0 dark:bg-surface-900"
    ]
  }),
  submenuIcon: {
    class: ["ml-auto"]
  },
  separator: {
    class: "border-t border-surface-200 dark:border-surface-700"
  },
  transition: {
    enterFromClass: "opacity-0",
    enterActiveClass: "transition-opacity duration-250"
  }
}, vu = {
  root: ({ props: e }) => ({
    class: [
      "relative",
      // Flex & Alignment
      { "flex flex-col": e.scrollable && e.scrollHeight === "flex" },
      // Size
      { "h-full": e.scrollable && e.scrollHeight === "flex" }
    ]
  }),
  mask: {
    class: [
      // Position
      "absolute",
      "top-0 left-0",
      "z-20",
      // Flex & Alignment
      "flex items-center justify-center",
      // Size
      "w-full h-full",
      // Color
      "bg-surface-100/40 dark:bg-surface-900/40",
      // Transition
      "transition duration-200"
    ]
  },
  loadingIcon: {
    class: "w-8 h-8 animate-spin"
  },
  tableContainer: ({ props: e }) => ({
    class: [
      {
        relative: e.scrollable,
        "flex flex-col grow": e.scrollable && e.scrollHeight === "flex"
      },
      // Size
      { "h-full": e.scrollable && e.scrollHeight === "flex" }
    ]
  }),
  header: ({ props: e }) => ({
    class: [
      "font-bold",
      // Shape
      e.showGridlines ? "border-x border-t border-b-0" : "border-y border-x-0",
      // Spacing
      "p-4",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      "border-surface-200 dark:border-surface-700",
      "text-surface-700 dark:text-white/80"
    ]
  }),
  table: {
    class: "w-full border-spacing-0 border-separate"
  },
  thead: ({ context: e }) => ({
    class: [
      {
        "bg-surface-0 dark:bg-surface-900 top-0 z-40 sticky": e.scrollable
      }
    ]
  }),
  tbody: ({ instance: e, context: t }) => ({
    class: [
      {
        "sticky z-20": e.frozenRow && t.scrollable
      },
      "bg-surface-0 dark:bg-surface-800"
    ]
  }),
  tfoot: ({ context: e }) => ({
    class: [
      {
        "bg-surface-0 bottom-0 z-0": e.scrollable
      }
    ]
  }),
  footer: {
    class: [
      "font-bold",
      // Shape
      "border-t-0 border-b border-x-0 dark:border-b-0",
      // Spacing
      "p-4",
      // Color
      "bg-surface-0 dark:bg-surface-800",
      "border-surface-200 dark:border-surface-700",
      "text-surface-700 dark:text-white/80"
    ]
  },
  column: {
    headerCell: ({ context: e, props: t }) => ({
      class: [
        "font-semibold dark:font-normal",
        "leading-[normal]",
        // Position
        { "sticky z-20 border-b": t.frozen || t.frozen === "" },
        { relative: e.resizable },
        // Alignment
        "text-left",
        // Shape
        { "first:border-l border-y border-r": e == null ? void 0 : e.showGridlines },
        "border-x-0 border-y-2 border-solid",
        // Spacing
        (e == null ? void 0 : e.size) === "small" ? "py-[0.375rem] px-2" : (e == null ? void 0 : e.size) === "large" ? "py-[0.9375rem] px-5" : "py-3 px-4",
        // Color
        (t.sortable === "" || t.sortable) && e.sorted ? "bg-highlight" : "bg-surface-50 text-surface-700 dark:text-surface-0/50 dark:bg-surface-800/50",
        "border-surface-200 dark:border-surface-900",
        // States
        {
          "hover:bg-surface-100 dark:hover:bg-surface-800/50": (t.sortable === "" || t.sortable) && !(e != null && e.sorted)
        },
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        // Transition
        { "transition duration-200": t.sortable === "" || t.sortable },
        // Misc
        { "cursor-pointer": t.sortable === "" || t.sortable },
        {
          "overflow-hidden whitespace-nowrap border-y bg-clip-padding": e == null ? void 0 : e.resizable
          // Resizable
        }
      ]
    }),
    columnHeaderContent: {
      class: "flex items-center gap-2"
    },
    sort: ({ context: e }) => ({
      class: [
        e.sorted ? "text-primary-500" : "text-surface-700",
        e.sorted ? "dark:text-primary-400" : "dark:text-white/80"
      ]
    }),
    bodyCell: ({ props: e, context: t, state: r, parent: o }) => {
      var s, n, a;
      return {
        class: [
          // Font
          "leading-[normal]",
          //Position
          { "sticky box-border border-b": o.instance.frozenRow },
          {
            "sticky box-border border-b z-20": e.frozen || e.frozen === ""
          },
          // Alignment
          "text-left",
          // Shape
          "border-0 border-b dark:border-b-0 border-solid",
          { "first:border-l border-r border-b": t == null ? void 0 : t.showGridlines },
          {
            "bg-surface-0 dark:bg-surface-900": o.instance.frozenRow || e.frozen || e.frozen === ""
          },
          // Spacing
          {
            "py-[0.375rem] px-2": (t == null ? void 0 : t.size) === "small" && !r.d_editing
          },
          {
            "py-[0.9375rem] px-5": (t == null ? void 0 : t.size) === "large" && !r.d_editing
          },
          {
            "py-3 px-4": (t == null ? void 0 : t.size) !== "large" && (t == null ? void 0 : t.size) !== "small" && !r.d_editing
          },
          { "py-[0.6rem] px-2": r.d_editing },
          // Color
          "border-surface-200 dark:border-surface-700",
          {
            "overflow-hidden whitespace-nowrap border-y bg-clip-padding": (a = (n = (s = o.instance) == null ? void 0 : s.$parentInstance) == null ? void 0 : n.$parentInstance) == null ? void 0 : a.resizableColumns
            // Resizable
          }
        ]
      };
    },
    footerCell: ({ context: e }) => ({
      class: [
        // Font
        "font-bold",
        // Alignment
        "text-left",
        // Shape
        "border-0 border-b border-solid",
        { "border-x border-y": e == null ? void 0 : e.showGridlines },
        // Spacing
        (e == null ? void 0 : e.size) === "small" ? "p-2" : (e == null ? void 0 : e.size) === "large" ? "p-5" : "p-4",
        // Color
        "border-surface-200 dark:border-surface-700",
        "text-surface-700 dark:text-white/80",
        "bg-surface-0 dark:bg-surface-900"
      ]
    }),
    sortIcon: ({ context: e }) => ({
      class: [
        "ml-2",
        e.sorted ? "text-inherit" : "text-surface-700 dark:text-white/70"
      ]
    }),
    columnFilter: {
      class: "inline-flex items-center ml-auto font-normal"
    },
    filterOverlay: {
      class: [
        "flex flex-col gap-2",
        // Position
        "absolute top-0 left-0",
        // Shape
        "border-0 dark:border",
        "rounded-md",
        "shadow-md",
        // Size
        "min-w-[12.5rem]",
        // Color
        "bg-surface-0 dark:bg-surface-900",
        "text-surface-800 dark:text-white/80",
        "dark:border-surface-700"
      ]
    },
    filterConstraintList: {
      class: "m-0 p-0 py-3 list-none"
    },
    filterConstraint: ({ context: e }) => ({
      class: [
        // Font
        "font-normal",
        "leading-none",
        // Position
        "relative",
        // Shape
        "border-0",
        "rounded-none",
        // Spacing
        "m-0",
        "py-3 px-5",
        // Color
        { "text-surface-700 dark:text-white/80": !(e != null && e.highlighted) },
        {
          "bg-surface-0 dark:bg-surface-900 text-surface-700 dark:text-white/80": !(e != null && e.highlighted)
        },
        { "bg-highlight": e == null ? void 0 : e.highlighted },
        //States
        {
          "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !(e != null && e.highlighted)
        },
        {
          "hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-[rgba(255,255,255,0.03)]": !(e != null && e.highlighted)
        },
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        // Transitions
        "transition-shadow",
        "duration-200",
        // Misc
        "cursor-pointer",
        "overflow-hidden",
        "whitespace-nowrap"
      ]
    }),
    filterOperator: {
      class: [
        // Shape
        "rounded-t-md",
        // Color
        "text-surface-700 dark:text-white/80",
        "bg-surface-0 dark:bg-surface-700",
        "[&>[data-pc-name=pcfilteroperatordropdown]]:w-full"
      ]
    },
    filter: ({ instance: e }) => ({
      class: [
        {
          "flex items-center w-full gap-2": e.display === "row",
          "inline-flex ml-auto": e.display === "menu"
        }
      ]
    }),
    filterRule: "flex flex-col gap-2",
    filterButtonbar: "flex items-center justify-between p-0",
    filterAddButtonContainer: "[&>[data-pc-name=pcfilteraddrulebutton]]:w-full",
    rowToggleButton: {
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left",
        // Spacing
        "m-0 p-0",
        // Size
        "w-8 h-8",
        // Shape
        "border-0 rounded-full",
        // Color
        "text-surface-500 dark:text-white/70",
        "bg-transparent",
        "focus-visible:outline-none focus-visible:outline-offset-0",
        "focus-visible:ring-1 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        // Transition
        "transition duration-200",
        // Misc
        "overflow-hidden",
        "cursor-pointer select-none"
      ]
    },
    columnResizer: {
      class: [
        "block",
        // Position
        "absolute top-0 right-0",
        // Sizing
        "w-2 h-full",
        // Spacing
        "m-0 p-0",
        // Color
        "border border-transparent",
        // Misc
        "cursor-col-resize"
      ]
    },
    transition: {
      class: "p-4 flex flex-col gap-2",
      enterFromClass: "opacity-0 scale-y-[0.8]",
      enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
      leaveActiveClass: "transition-opacity duration-100 ease-linear",
      leaveToClass: "opacity-0"
    }
  },
  bodyRow: ({ context: e, props: t, parent: r }) => ({
    class: [
      // Color
      { "bg-highlight": e.selected },
      {
        "bg-surface-0 text-surface-600 dark:text-white/80 dark:bg-surface-900": !e.selected
      },
      { "font-bold bg-surface-0 dark:bg-surface-900 z-20": t.frozenRow },
      {
        "odd:bg-surface-0 odd:text-surface-600 dark:odd:text-surface-0 dark:even:text-surface-0 dark:odd:bg-surface-800 even:bg-surface-50 even:text-surface-600 dark:even:bg-surface-900": e.stripedRows && !e.selected
      },
      // State
      {
        "hover:bg-surface-300/20 dark:hover:bg-surface-700/50": t.selectionMode && !e.selected || r.instance.rowHover
      },
      // Transition
      {
        "transition duration-200": t.selectionMode && !e.selected || t.rowHover
      },
      // Misc
      { "cursor-pointer": t.selectionMode || r.instance.rowHover }
    ]
  }),
  rowExpansion: {
    class: "bg-surface-0 dark:bg-surface-900 text-surface-600 dark:text-white/80"
  },
  rowGroupHeader: {
    class: [
      "sticky z-20",
      "bg-surface-0 text-surface-600 dark:text-white/70",
      "dark:bg-surface-900"
    ]
  },
  rowGroupFooter: {
    class: [
      "sticky z-20",
      "bg-surface-0 text-surface-600 dark:text-white/70",
      "dark:bg-surface-900"
    ]
  },
  rowToggleButton: {
    class: [
      "relative",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      "text-left",
      // Spacing
      "m-0 p-0",
      // Size
      "w-8 h-8",
      // Shape
      "border-0 rounded-full",
      // Color
      "text-surface-500 dark:text-white/70",
      "bg-transparent",
      "focus-visible:outline-none focus-visible:outline-offset-0",
      "focus-visible:ring-1 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
      // Transition
      "transition duration-200",
      // Misc
      "overflow-hidden",
      "cursor-pointer select-none"
    ]
  },
  rowToggleIcon: {
    class: "inline-block w-4 h-4"
  },
  columnResizeIndicator: {
    class: "absolute hidden w-[2px] z-20 bg-primary"
  }
}, yu = {
  content: {
    class: [
      // Spacing
      "p-0",
      // Shape
      "border-0",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-900"
    ]
  },
  header: {
    class: [
      "font-semibold",
      // Spacing
      "py-3 px-4",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-surface-00 dark:bg-surface-900",
      "border-b border-surface-200 dark:border-surface-700"
    ]
  }
}, Js = {
  root: ({ props: e }) => ({
    class: [
      // Display and Position
      {
        flex: e.fluid,
        "inline-flex": !e.fluid
      },
      "max-w-full",
      "relative"
    ]
  }),
  pcInput: ({ props: e, parent: t }) => {
    var r;
    return {
      root: {
        class: [
          // Display
          "flex-auto w-[1%]",
          // Font
          "leading-none",
          // Colors
          "text-surface-600 dark:text-surface-200",
          "placeholder:text-surface-400 dark:placeholder:text-surface-500",
          { "bg-surface-0 dark:bg-surface-950": !e.disabled },
          "border",
          { "border-surface-300 dark:border-surface-600": !e.invalid },
          // Invalid State
          "invalid:focus:ring-red-200",
          "invalid:hover:border-red-500",
          { "border-red-500 dark:border-red-400": e.invalid },
          // Spacing
          "m-0 py-2 px-3",
          // Shape
          "appearance-none",
          { "rounded-md": !e.showIcon || e.iconDisplay == "input" },
          {
            "rounded-l-md  flex-1 pr-9": e.showIcon && e.iconDisplay !== "input"
          },
          {
            "rounded-md flex-1 pr-9": e.showIcon && e.iconDisplay === "input"
          },
          // Transitions
          "transition-colors",
          "duration-200",
          // States
          {
            "hover:border-surface-400 dark:hover:border-surface-600": !e.disabled && !e.invalid,
            "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:z-10": !e.disabled,
            "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": e.disabled
          },
          // Filled State *for FloatLabel
          {
            filled: ((r = t.instance) == null ? void 0 : r.$name) == "FloatLabel" && e.modelValue !== null
          }
        ]
      }
    };
  },
  dropdownIcon: {
    class: [
      "absolute top-1/2 -mt-2",
      "text-surface-600 dark:text-surface-200",
      "right-3"
    ]
  },
  dropdown: {
    class: [
      "relative",
      // Alignments
      "items-center inline-flex text-center align-bottom justify-center",
      // Shape
      "rounded-r-md",
      // Size
      "py-2 px-0",
      "w-10",
      "leading-[normal]",
      // Colors
      "border border-l-0 border-surface-300 dark:border-surface-600",
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring-1",
      "hover:bg-primary-hover hover:border-primary-hover",
      "focus:ring-primary-500 dark:focus:ring-primary-400"
    ]
  },
  inputIconContainer: "absolute cursor-pointer top-1/2 right-3 -mt-3",
  inputIcon: "inline-block text-base",
  panel: ({ props: e }) => ({
    class: [
      // Display & Position
      {
        absolute: !e.inline,
        "inline-block": e.inline
      },
      // Size
      { "w-auto p-3 ": !e.inline },
      { "min-w-[80vw] w-auto p-3 ": e.touchUI },
      { "p-3 min-w-full": e.inline },
      // Shape
      "border rounded-lg",
      {
        "shadow-md": !e.inline
      },
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "border-surface-200 dark:border-surface-700",
      //misc
      { "overflow-x-auto": e.inline }
    ]
  }),
  header: {
    class: [
      //Font
      "font-medium",
      // Flexbox and Alignment
      "flex items-center justify-between",
      // Spacing
      "p-0 pb-2",
      "m-0",
      // Shape
      "border-b",
      "rounded-t-md",
      // Colors
      "text-surface-700 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-900",
      "border-surface-200 dark:border-surface-700"
    ]
  },
  title: {
    class: [
      // Text
      "leading-7",
      "mx-auto my-0"
    ]
  },
  selectMonth: {
    class: [
      // Font
      "text-base leading-[normal]",
      "font-medium",
      //shape
      "rounded-md",
      // Colors
      "text-surface-700 dark:text-white/80",
      // Transitions
      "transition duration-200",
      // Spacing
      "p-1",
      "m-0 mr-2",
      // States
      "hover:text-primary-500 dark:hover:text-primary-400",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:z-10",
      // Misc
      "cursor-pointer"
    ]
  },
  selectYear: {
    class: [
      // Font
      "text-base leading-[normal]",
      "font-medium",
      //shape
      "rounded-md",
      // Colors
      "text-surface-700 dark:text-white/80",
      // Transitions
      "transition duration-200",
      // Spacing
      "p-1",
      "m-0 mr-2",
      // States
      "hover:text-primary-500 dark:hover:text-primary-400",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:z-10",
      // Misc
      "cursor-pointer"
    ]
  },
  table: {
    class: [
      // Font
      "text-base leading-[normal]",
      // Size & Shape
      "border-collapse",
      "w-full",
      // Spacing
      "m-0 mt-2"
    ]
  },
  tableHeaderCell: {
    class: [
      // Spacing
      "p-1",
      "font-medium"
    ]
  },
  weekHeader: {
    class: [
      "leading-5",
      "text-surface-600 dark:text-white/70",
      "opacity-60 cursor-default"
    ]
  },
  weekNumber: {
    class: ["text-surface-600 dark:text-white/70", "opacity-60 cursor-default"]
  },
  weekday: {
    class: [
      // Colors
      "text-surface-500 dark:text-white/60",
      "p-1"
    ]
  },
  dayCell: {
    class: [
      // Spacing
      "p-1"
    ]
  },
  weekLabelContainer: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      "mx-auto",
      // Shape & Size
      "w-8 h-8",
      "rounded-full",
      "border-transparent border",
      "leading-[normal]",
      // Colors
      "opacity-60 cursor-default"
    ]
  },
  dayView: "w-full",
  day: ({ context: e }) => ({
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      "mx-auto",
      // Shape & Size
      "w-8 h-8",
      "rounded-full",
      "border-transparent border",
      "leading-[normal]",
      // Colors
      {
        "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-white/70": e.date.today && !e.selected && !e.disabled,
        "bg-transparent text-surface-600 dark:text-white/70": !e.selected && !e.disabled && !e.date.today,
        "bg-highlight": e.selected && !e.disabled
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:z-10",
      {
        "hover:bg-surface-50 dark:hover:bg-surface-500/10": !e.selected && !e.disabled
      },
      {
        "opacity-60 cursor-default": e.disabled,
        "cursor-pointer": !e.disabled
      }
    ]
  }),
  monthView: {
    class: [
      // Spacing
      "mt-2"
    ]
  },
  month: ({ context: e }) => ({
    class: [
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      // Size
      "w-1/3",
      "p-1",
      // Shape
      "rounded-md",
      // Colors
      {
        "text-surface-600 dark:text-white/70 bg-transparent": !e.selected && !e.disabled,
        "bg-highlight": e.selected && !e.disabled
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:z-10",
      {
        "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.selected && !e.disabled
      },
      // Misc
      "cursor-pointer"
    ]
  }),
  yearView: {
    class: [
      // Spacing
      "mt-2"
    ]
  },
  year: ({ context: e }) => ({
    class: [
      // Flexbox and Alignment
      "inline-flex items-center justify-center",
      // Size
      "w-1/2",
      "p-1",
      // Shape
      "rounded-md",
      // Colors
      {
        "text-surface-600 dark:text-white/70 bg-transparent": !e.selected && !e.disabled,
        "bg-highlight": e.selected && !e.disabled
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:z-10",
      {
        "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.selected && !e.disabled
      },
      // Misc
      "cursor-pointer"
    ]
  }),
  timePicker: {
    class: [
      // Flexbox
      "flex",
      "justify-center items-center",
      // Borders
      "border-t-1",
      "border-solid border-surface-200",
      // Spacing
      "pt-2 mt-2"
    ]
  },
  separatorContainer: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",
      // Spacing
      "px-2"
    ]
  },
  separator: {
    class: [
      // Text
      "text-xl"
    ]
  },
  hourPicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",
      // Spacing
      "px-2"
    ]
  },
  minutePicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",
      // Spacing
      "px-2"
    ]
  },
  secondPicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",
      // Spacing
      "px-2"
    ]
  },
  ampmPicker: {
    class: [
      // Flexbox and Alignment
      "flex",
      "items-center",
      "flex-col",
      // Spacing
      "px-2"
    ]
  },
  calendarContainer: "flex",
  calendar: "flex-auto border-l first:border-l-0 border-surface-200",
  buttonbar: {
    class: [
      // Flexbox
      "flex justify-between items-center",
      // Spacing
      "pt-2",
      // Shape
      "border-t border-surface-200 dark:border-surface-700"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
}, ku = {
  root: {}
}, wu = {
  root: ({ state: e }) => ({
    class: [
      // Shape
      "rounded-lg",
      "shadow-lg",
      "border-0",
      // Size
      "max-h-[90vh]",
      "m-0",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      "[&:last-child]:border-b",
      "border-surface-200 dark:border-surface-700",
      // Transitions
      "transform",
      "scale-100",
      // Maximized State
      {
        "transition-none": e.maximized,
        "transform-none": e.maximized,
        "!w-screen": e.maximized,
        "!h-screen": e.maximized,
        "!max-h-full": e.maximized,
        "!top-0": e.maximized,
        "!left-0": e.maximized
      }
    ]
  }),
  header: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-between",
      "shrink-0",
      // Spacing
      "p-6",
      // Shape
      "rounded-tl-lg",
      "rounded-tr-lg",
      // Colors
      "text-surface-700 dark:text-surface-0/80",
      "border border-b-0",
      "border-surface-200 dark:border-surface-700"
    ]
  },
  title: {
    class: ["font-semibold text-xl leading-[normal]"]
  },
  headerActions: {
    class: ["flex items-center"]
  },
  content: ({ state: e, instance: t }) => ({
    class: [
      // Spacing
      "px-6",
      "pb-6",
      "pt-0",
      // Shape
      {
        grow: e.maximized,
        "rounded-bl-lg": !t.$slots.footer,
        "rounded-br-lg": !t.$slots.footer
      },
      // Colors
      "text-surface-700 dark:text-surface-0/80",
      "border border-t-0 border-b-0",
      "border-surface-200 dark:border-surface-700",
      // Misc
      "overflow-y-auto"
    ]
  }),
  footer: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-end",
      "shrink-0",
      "text-right",
      "gap-2",
      // Spacing
      "px-6",
      "pb-6",
      // Shape
      "border-t-0",
      "rounded-b-lg",
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-surface-0/80",
      "border border-t-0 border-b-0",
      "border-surface-200 dark:border-surface-700"
    ]
  },
  mask: ({ props: e }) => ({
    class: [
      // Transitions
      "transition-all",
      "duration-300",
      { "p-5": e.position !== "full" },
      // Background and Effects
      { "has-[.mask-active]:bg-transparent bg-black/40": e.modal }
    ]
  }),
  transition: () => ({})
}, _u = {
  root: ({ props: e }) => ({
    class: [
      // Flex and Position
      "flex relative",
      { "justify-center": e.layout == "vertical" },
      { "items-center": e.layout == "vertical" },
      {
        "justify-start": (e == null ? void 0 : e.align) == "left" && e.layout == "horizontal",
        "justify-center": (e == null ? void 0 : e.align) == "center" && e.layout == "horizontal",
        "justify-end": (e == null ? void 0 : e.align) == "right" && e.layout == "horizontal",
        "items-center": (e == null ? void 0 : e.align) == "top" && e.layout == "vertical",
        "items-start": (e == null ? void 0 : e.align) == "center" && e.layout == "vertical",
        "items-end": (e == null ? void 0 : e.align) == "bottom" && e.layout == "vertical"
      },
      // Spacing
      {
        "my-5 mx-0 py-0 px-5": e.layout == "horizontal",
        "mx-4 md:mx-5 py-5": e.layout == "vertical"
      },
      // Size
      {
        "w-full": e.layout == "horizontal",
        "min-h-full": e.layout == "vertical"
      },
      // Before: Line
      "before:block",
      // Position
      {
        "before:absolute before:left-0 before:top-1/2": e.layout == "horizontal",
        "before:absolute before:left-1/2 before:top-0 before:transform before:-translate-x-1/2": e.layout == "vertical"
      },
      // Size
      {
        "before:w-full": e.layout == "horizontal",
        "before:min-h-full": e.layout == "vertical"
      },
      // Shape
      {
        "before:border-solid": e.type == "solid",
        "before:border-dotted": e.type == "dotted",
        "before:border-dashed": e.type == "dashed"
      },
      // Color
      {
        "before:border-t before:border-surface-200 before:dark:border-surface-600": e.layout == "horizontal",
        "before:border-l before:border-surface-200 before:dark:border-surface-600": e.layout == "vertical"
      }
    ]
  }),
  content: {
    class: [
      // Space and Position
      "px-1 z-10",
      // Color
      "bg-surface-0 dark:bg-surface-800"
    ]
  }
}, Su = {
  root: ({ props: e }) => ({
    class: [
      // Positioning
      "absolute z-1",
      {
        "left-0 bottom-0 w-full": e.position == "bottom",
        "left-0 top-0 w-full": e.position == "top",
        "left-0 top-0 h-full": e.position == "left",
        "right-0 top-0 h-full": e.position == "right"
      },
      // Flexbox & Alignment
      "flex justify-center items-center",
      // Interactivity
      "pointer-events-none"
    ]
  }),
  listContainer: {
    class: [
      // Flexbox
      "flex",
      // Shape & Border
      "rounded-md",
      // Color
      "bg-surface-0/10 dark:bg-surface-900/20 border border-surface-0/20",
      "backdrop-blur-sm",
      // Spacing
      "p-2",
      // Misc
      "pointer-events-auto"
    ]
  },
  list: ({ props: e }) => ({
    class: [
      // Flexbox & Alignment
      "flex items-center justify-center",
      {
        "flex-col": e.position == "left" || e.position == "right"
      },
      // List Style
      "m-0 p-0 list-none",
      // Shape
      "outline-none"
    ]
  }),
  item: ({ props: e, context: t, instance: r }) => ({
    class: [
      // Spacing & Shape
      "p-2 rounded-md",
      // Positioning & Hover States
      {
        "origin-bottom": e.position == "bottom",
        "origin-top": e.position == "top",
        "origin-left": e.position == "left",
        "origin-right": e.position == "right"
      },
      // Transitions & Transform
      "transition-all duration-200 ease-cubic-bezier-will-change-transform transform"
    ]
  }),
  itemLink: {
    class: [
      // Flexbox & Alignment
      "flex flex-col items-center justify-center",
      // Position
      "relative",
      // Size
      "w-16 h-16",
      // Misc
      "cursor-default overflow-hidden"
    ]
  }
}, Gs = {
  root: ({ props: e }) => ({
    class: [
      // Flexbox
      "flex flex-col",
      // Position
      "relative",
      {
        "!transition-none !transform-none !w-screen !h-screen !max-h-full !top-0 !left-0": e.position == "full"
      },
      // Size
      {
        "h-full w-80": e.position == "left" || e.position == "right",
        "h-auto w-full": e.position == "top" || e.position == "bottom"
      },
      // Shape
      "border-0 dark:border",
      "shadow-lg",
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-white/80",
      "dark:border-surface-700",
      // Transitions
      "transition-transform",
      "duration-300",
      // Misc
      "pointer-events-auto"
    ]
  }),
  header: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-between",
      "shrink-0",
      // Spacing
      "p-[1.125rem]",
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-surface-0/80"
    ]
  },
  title: {
    class: ["font-semibold text-xl"]
  },
  icons: {
    class: ["flex items-center"]
  },
  closeButton: {
    class: [
      "relative",
      // Flexbox and Alignment
      "flex items-center justify-center",
      // Size and Spacing
      "mr-2",
      "last:mr-0",
      "w-7 h-7",
      // Shape
      "border-0",
      "rounded-full",
      // Colors
      "text-surface-500",
      "bg-transparent",
      // Transitions
      "transition duration-200 ease-in-out",
      // States
      "hover:text-surface-700 dark:hover:text-white/80",
      "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]",
      "focus:outline-none focus:outline-offset-0 focus:ring-1",
      "focus:ring-primary-500 dark:focus:ring-primary-400",
      // Misc
      "overflow-hidden"
    ]
  },
  closeButtonIcon: {
    class: [
      // Display
      "inline-block",
      // Size
      "w-4",
      "h-4"
    ]
  },
  content: {
    class: [
      // Spacing and Size
      "p-[1.125rem]",
      "pt-0",
      "h-full",
      "w-full",
      // Growth and Overflow
      "grow",
      "overflow-y-auto"
    ]
  },
  mask: ({ props: e }) => ({
    class: [
      // Transitions
      "transition-all",
      "duration-300",
      { "p-5": e.position !== "full" },
      // Background and Effects
      { "has-[.mask-active]:bg-transparent bg-black/40": e.modal }
    ]
  }),
  transition: ({ props: e }) => e.position === "top" ? {
    enterFromClass: "translate-x-0 -translate-y-full translate-z-0 mask-active",
    leaveToClass: "translate-x-0 -translate-y-full translate-z-0 mask-active"
  } : e.position === "bottom" ? {
    enterFromClass: "translate-x-0 translate-y-full translate-z-0 mask-active",
    leaveToClass: "translate-x-0 translate-y-full translate-z-0 mask-active"
  } : e.position === "left" ? {
    enterFromClass: "-translate-x-full translate-y-0 translate-z-0 mask-active",
    leaveToClass: "-translate-x-full translate-y-0 translate-z-0 mask-active"
  } : e.position === "right" ? {
    enterFromClass: "translate-x-full translate-y-0 translate-z-0 mask-active",
    leaveToClass: "translate-x-full translate-y-0 translate-z-0 mask-active"
  } : {
    enterFromClass: "opacity-0 mask-active",
    enterActiveClass: "transition-opacity duration-400 ease-in",
    leaveActiveClass: "transition-opacity duration-400 ease-in",
    leaveToClass: "opacity-0 mask-active"
  }
}, Cu = {
  root: {
    class: [
      // Spacing
      "p-[1.125rem] pt-0",
      // Shape
      "rounded-md",
      // Color
      "border border-surface-200 dark:border-surface-700",
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-surface-0/80"
    ]
  },
  legend: ({ props: e }) => ({
    class: [
      // Font
      "font-semibold",
      "leading-none",
      //Spacing
      "p-0 mb-[0.375rem]",
      // Shape
      "rounded-md",
      // Color
      "text-surface-700 dark:text-surface-0/80",
      "bg-surface-0 dark:bg-surface-900",
      // Transition
      "transition-none",
      // States
      { "hover:bg-surface-100 dark:hover:bg-surface-800": e.toggleable }
    ]
  }),
  toggleButton: ({ props: e }) => ({
    class: [
      // Alignments
      "flex items-center justify-center",
      "relative",
      //Spacing
      { "py-2 px-3": e.toggleable },
      // Shape
      { "rounded-md": e.toggleable },
      // Color
      {
        "text-surface-700 dark:text-surface-200 hover:text-surface-900": e.toggleable
      },
      // States
      {
        "hover:text-surface-900 dark:hover:text-surface-100": e.toggleable
      },
      {
        "focus:outline-none focus:outline-offset-0 focus-visible:ring-1 focus-visible:ring-primary-400 dark:focus-visible:ring-primary-300": e.toggleable
      },
      // Misc
      {
        "transition-none cursor-pointer overflow-hidden select-none": e.toggleable
      }
    ]
  }),
  toggleIcon: {
    class: "mr-2 inline-block"
  },
  legendLabel: ({ props: e }) => ({
    class: [
      "flex items-center justify-center leading-none",
      { "py-2 px-3": !e.toggleable }
    ]
  }),
  content: {
    class: "p-0"
  },
  transition: {
    enterFromClass: "max-h-0",
    enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
    enterToClass: "max-h-[1000px]",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
    leaveToClass: "max-h-0"
  }
}, Tu = {
  root: ({ props: e }) => ({
    class: [
      {
        "flex flex-wrap items-center justify-center gap-2": e.mode === "basic"
      }
    ]
  }),
  input: {
    class: "hidden"
  },
  header: {
    class: [
      // Flexbox
      "flex",
      "flex-wrap",
      // Colors
      "bg-surface-0",
      "dark:bg-surface-900",
      "text-surface-700",
      "dark:text-white/80",
      // Spacing
      "p-[1.125rem]",
      "gap-2",
      // Borders
      "border",
      "border-solid",
      "border-surface-200",
      "dark:border-surface-700",
      "border-b-0",
      // Shape
      "rounded-tr-lg",
      "rounded-tl-lg"
    ]
  },
  content: {
    class: [
      // Position
      "relative",
      // Colors
      "bg-surface-0",
      "dark:bg-surface-900",
      "text-surface-700",
      "dark:text-white/80",
      // Spacing
      "p-[1.125rem]",
      // Borders
      "border border-t-0",
      "border-surface-200",
      "dark:border-surface-700",
      // Shape
      "rounded-b-lg",
      //ProgressBar
      "[&>[data-pc-name=pcprogressbar]]:absolute",
      "[&>[data-pc-name=pcprogressbar]]:w-full",
      "[&>[data-pc-name=pcprogressbar]]:top-0",
      "[&>[data-pc-name=pcprogressbar]]:left-0",
      "[&>[data-pc-name=pcprogressbar]]:h-1"
    ]
  },
  file: {
    class: [
      // Flexbox
      "flex",
      "items-center",
      "flex-wrap",
      // Spacing
      "p-4",
      "mb-2",
      "last:mb-0",
      // Borders
      "border",
      "border-surface-200",
      "dark:border-surface-700",
      "gap-2",
      // Shape
      "rounded"
    ]
  },
  fileThumbnail: "shrink-0",
  fileName: "mb-2 break-all",
  fileSize: "mr-2"
}, Pu = {
  root: {
    class: [
      "block relative",
      // Base Label Appearance
      "[&>*:last-child]:text-surface-900/60 dark:[&>*:last-child]:text-white/60",
      "[&>*:last-child]:absolute",
      "[&>*:last-child]:left-3",
      "[&>*:last-child]:pointer-events-none",
      "[&>*:last-child]:transition-all",
      "[&>*:last-child]:duration-200",
      "[&>*:last-child]:ease",
      // Position for all labels except those following textarea
      "[&>:not(textarea)~label]:top-1/2 [&>:not(textarea)~label]:-translate-y-1/2 ",
      // Position for labels following textareas
      "[&>textarea~label]:top-4",
      // Focus Label Appearance
      "[&>*:last-child]:has-[:focus]:-top-3",
      "[&>*:last-child]:has-[:focus]:text-sm",
      "[&>*:last-child]:has-[:focus]:z-10",
      // Filled Input Label Appearance
      "[&>*:last-child]:has-[.filled]:-top-3",
      "[&>*:last-child]:has-[.filled]:text-sm",
      "[&>*:last-child]:has-[.filled]:z-10"
    ]
  }
}, ju = {
  content: ({ parent: e, props: t }) => ({
    class: [
      "flex",
      {
        "flex-col": t.fullScreen
      },
      {
        "flex-col": e.props.thumbnailsPosition === "top" || e.props.thumbnailsPosition === "bottom",
        "flex-row": e.props.thumbnailsPosition === "right" || e.props.thumbnailsPosition === "left"
      }
    ]
  }),
  itemsContainer: ({ parent: e, props: t }) => ({
    class: [
      "group",
      "flex relative",
      {
        "grow shrink w-0 justify-center": t.fullScreen
      },
      {
        "flex-col": e.props.indicatorsPosition === "bottom" || e.props.indicatorsPosition === "top",
        "flex-row items-center": e.props.indicatorsPosition === "left" || e.props.indicatorsPosition === "right"
      },
      {
        "order-2": e.props.thumbnailsPosition === "top" || e.props.thumbnailsPosition === "left",
        "flex-row": e.props.thumbnailsPosition === "right"
      }
    ]
  }),
  items: ({ parent: e }) => ({
    class: [
      "flex h-full relative",
      {
        "order-1": e.props.indicatorsPosition === "bottom" || e.props.indicatorsPosition === "right",
        "order-2": e.props.indicatorsPosition === "top" || e.props.indicatorsPosition === "left"
      }
    ]
  }),
  item: {
    class: [
      // Flex
      "flex justify-center items-center h-full w-full",
      // Sizing
      "h-full w-full"
    ]
  },
  thumbnails: ({ parent: e }) => ({
    class: [
      // Flex
      "flex flex-col shrink-0",
      {
        "order-1": e.props.thumbnailsPosition === "top" || e.props.thumbnailsPosition === "left"
      },
      // Misc
      "overflow-auto"
    ]
  }),
  thumbnailContent: ({ parent: e }) => ({
    class: [
      // Flex
      "flex",
      // Spacing
      "py-4 px-1",
      // Colors
      "bg-black/90",
      {
        "flex-row": e.props.thumbnailsPosition === "top" || e.props.thumbnailsPosition === "bottom",
        "flex-col grow": e.props.thumbnailsPosition === "right" || e.props.thumbnailsPosition === "left"
      }
    ]
  }),
  thumbnailPrevButton: {
    class: [
      // Positioning
      "self-center relative",
      // Display & Flexbox
      "flex shrink-0 justify-center items-center overflow-hidden",
      // Spacing
      "m-2",
      // Appearance
      "bg-transparent text-white w-8 h-8 rounded-full transition duration-200 ease-in-out",
      // Hover Effects
      "hover:bg-surface-0/10 hover:text-white",
      // Focus Effects
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400"
    ]
  },
  thumbnailsViewport: {
    class: "overflow-hidden w-full"
  },
  thumbnailItems: ({ parent: e }) => ({
    class: [
      "flex",
      {
        "flex-col h-full": e.props.thumbnailsPosition === "right" || e.props.thumbnailsPosition === "left"
      }
    ]
  }),
  thumbnailItem: ({ parent: e }) => ({
    class: [
      // Flexbox
      "flex items-center justify-center",
      "grow shrink-0",
      // Sizing
      {
        "w-full md:w-[25%] lg:w-[20%]": e.props.thumbnailsPosition === "top" || e.props.thumbnailsPosition === "bottom"
      },
      // Misc
      "overflow-auto",
      "cursor-pointer",
      "opacity-50",
      // States
      '[&[data-p-active="true"]]:opacity-100',
      "hover:opacity-100",
      // Transitions
      "transition-opacity duration-300"
    ]
  }),
  thumbnailNextButton: {
    class: [
      // Positioning
      "self-center relative",
      // Display & Flexbox
      "flex shrink-0 justify-center items-center overflow-hidden",
      // Spacing
      "m-2",
      // Appearance
      "bg-transparent text-white w-8 h-8 rounded-full transition duration-200 ease-in-out",
      // Hover Effects
      "hover:bg-surface-0/10 hover:text-white",
      // Focus Effects
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400"
    ]
  },
  indicatorList: ({ parent: e }) => ({
    class: [
      // flex
      "flex items-center justify-center",
      // Spacing
      "p-4",
      // Indicators Position
      {
        "order-2": e.props.indicatorsPosition == "bottom",
        "order-1": e.props.indicatorsPosition == "top",
        "order-1 flex-col": e.props.indicatorsPosition == "left",
        "flex-col order-2": e.props.indicatorsPosition == "right"
      },
      {
        "absolute z-10 bg-black/50": e.props.showIndicatorsOnItem
      },
      {
        "bottom-0 left-0 w-full items-start": e.props.indicatorsPosition == "bottom" && e.props.showIndicatorsOnItem,
        "top-0 left-0 w-full items-start": e.props.indicatorsPosition == "top" && e.props.showIndicatorsOnItem,
        "left-0 top-0 h-full items-start": e.props.indicatorsPosition == "left" && e.props.showIndicatorsOnItem,
        "right-0 top-0 h-full items-start": e.props.indicatorsPosition == "right" && e.props.showIndicatorsOnItem
      }
    ]
  }),
  indicator: ({ parent: e }) => ({
    class: [
      {
        "mr-2": e.props.indicatorsPosition == "bottom" || e.props.indicatorsPosition == "top",
        "mb-2": e.props.indicatorsPosition == "left" || e.props.indicatorsPosition == "right"
      }
    ]
  }),
  indicatorButton: ({ context: e }) => ({
    class: [
      // Size
      "w-4 h-4",
      // Appearance
      "rounded-full transition duration-200",
      // Focus Effects
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400",
      // Conditional Appearance: Not Highlighted
      {
        "bg-surface-200 hover:bg-surface-300 dark:bg-surface-700 dark:hover:bg-surface-600": !e.highlighted
      },
      // Conditional Appearance: Highlighted
      { "bg-primary hover:bg-primary-emphasis": e.highlighted }
    ]
  }),
  mask: {
    class: [
      "fixed top-0 left-0 w-full h-full",
      "flex items-center justify-center",
      "bg-black/90"
    ]
  },
  closeButton: {
    class: [
      // Positioning
      "!absolute top-0 right-0",
      // Display & Flexbox
      "flex justify-center items-center overflow-hidden",
      // Spacing
      "m-2",
      // Appearance
      "text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out",
      // Hover Effect
      "hover:text-white hover:bg-surface-0/10",
      // Focus Effects
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400"
    ]
  },
  closeIcon: {
    class: "w-6 h-6"
  },
  prevButton: ({ parent: e }) => ({
    class: [
      // Display & Flexbox
      "inline-flex justify-center items-center overflow-hidden",
      // Appearance
      "bg-transparent text-white w-16 h-16 transition duration-200 ease-in-out rounded-md",
      {
        "opacity-0 group-hover:opacity-100": e.props.showItemNavigatorsOnHover
      },
      // Spacing
      "mx-2",
      // Positioning
      "top-1/2 mt-[-0.5rem] left-0",
      {
        "!absolute": !e.state.containerVisible && e.props.showItemNavigators,
        "!fixed": e.state.containerVisible
      },
      // Hover Effect
      "hover:bg-surface-0/10 hover:text-white",
      // Focus Effects
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400"
    ]
  }),
  nextButton: ({ parent: e }) => ({
    class: [
      // Display & Flexbox
      "inline-flex justify-center items-center overflow-hidden",
      // Appearance
      "bg-transparent text-white w-16 h-16 transition duration-200 ease-in-out rounded-md",
      {
        "opacity-0 group-hover:opacity-100": e.props.showItemNavigatorsOnHover
      },
      // Spacing
      "mx-2",
      // Positioning
      "top-1/2 mt-[-0.5rem] right-0",
      {
        "!absolute": !e.state.containerVisible && e.props.showItemNavigators,
        "!fixed": e.state.containerVisible
      },
      // Hover Effect
      "hover:bg-surface-0/10 hover:text-white",
      // Focus Effects
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400"
    ]
  }),
  caption: {
    class: [
      // Positioning
      "absolute bottom-0 left-0 w-full",
      // Appearance
      "bg-black/50 text-white p-4"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-75",
    enterActiveClass: "transition-all duration-150 ease-in-out",
    leaveActiveClass: "transition-all duration-150 ease-in",
    leaveToClass: "opacity-0 scale-75"
  }
}, Au = {
  css: `
    *[data-pd-ripple="true"]{
        overflow: hidden;
        position: relative;
    }
    span[data-p-ink-active="true"]{
        animation: ripple 0.4s linear;
    }
    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }

    .progress-spinner-circle {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: 0;
        animation: p-progress-spinner-dash 1.5s ease-in-out infinite, p-progress-spinner-color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @keyframes p-progress-spinner-dash{
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }

        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
    @keyframes p-progress-spinner-color {
        100%, 66%, 0% {
            stroke: #ff5757;
        }
        40%, 80%, 90% {
            stroke: #cc8925;
        }
    }

    .progressbar-value-animate::after {
        will-change: left, right;
        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    }
    .progressbar-value-animate::before {
        will-change: left, right;
        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }
    @keyframes p-progressbar-indeterminate-anim {
        0% {
            left: -35%;
            right: 100%;
        }
        60% {
            left: 100%;
            right: -90%;
        }
        100% {
            left: 100%;
            right: -90%;
        }
    }

    .p-fadein {
        animation: p-fadein 250ms linear;
    }

    @keyframes p-fadein {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`
}, $u = {
  root: {
    class: [
      "relative",
      "[&>[data-pc-name=inputicon]]:absolute",
      "[&>[data-pc-name=inputicon]]:top-1/2",
      "[&>[data-pc-name=inputicon]]:-mt-2",
      "[&>[data-pc-name=inputicon]]:text-surface-900/60 dark:[&>[data-pc-name=inputicon]]:text-white/60",
      "[&>[data-pc-name=inputicon]:first-child]:left-3",
      "[&>[data-pc-name=inputicon]:last-child]:right-3",
      "[&>[data-pc-name=inputtext]:first-child]:pr-10",
      "[&>[data-pc-name=inputtext]:last-child]:pl-10",
      // filter
      "[&>[data-pc-extend=inputicon]]:absolute",
      "[&>[data-pc-extend=inputicon]]:top-1/2",
      "[&>[data-pc-extend=inputicon]]:-mt-2",
      "[&>[data-pc-extend=inputicon]]:text-surface-900/60 dark:[&>[data-pc-extend=inputicon]]:text-white/60",
      "[&>[data-pc-extend=inputicon]:first-child]:left-3",
      "[&>[data-pc-extend=inputicon]:last-child]:right-3"
    ]
  }
}, Ou = {
  root: {
    class: "relative inline-block"
  },
  previewMask: {
    class: [
      // Flexbox & Alignment
      "flex items-center justify-center",
      // Positioning
      "absolute",
      // Shape
      "inset-0 opacity-0 transition-opacity duration-300",
      // Color
      "bg-transparent text-surface-100",
      // States
      "hover:opacity-100 hover:cursor-pointer hover:bg-black/50 hover:bg-opacity-50"
    ]
  },
  mask: {
    class: [
      // Flexbox & Alignment
      "flex items-center justify-center",
      // Positioning
      "fixed top-0 left-0",
      // Sizing
      "w-full h-full",
      // Color
      "bg-black/90"
    ]
  },
  toolbar: {
    class: [
      // Flexbox
      "flex",
      // Positioning
      "absolute top-0 right-0",
      // Spacing
      "p-4"
    ]
  },
  rotateRightButton: {
    class: [
      "z-20",
      // Flexbox & Alignment
      "flex justify-center items-center",
      // Size
      "w-12 h-12",
      // Spacing
      "mr-2",
      // Shape
      "rounded-full",
      // Color
      "text-white bg-transparent",
      // States
      "hover:text-white hover:bg-surface-0/10",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400",
      // Transition
      "transition duration-200 ease-in-out"
    ]
  },
  rotateRightIcon: {
    class: "w-6 h-6"
  },
  rotateLeftButton: {
    class: [
      "z-20",
      // Flexbox & Alignment
      "flex justify-center items-center",
      // Size
      "w-12 h-12",
      // Spacing
      "mr-2",
      // Shape
      "rounded-full",
      // Color
      "text-white bg-transparent",
      // States
      "hover:text-white hover:bg-surface-0/10",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400",
      // Transition
      "transition duration-200 ease-in-out"
    ]
  },
  rotateLeftIcon: {
    class: "w-6 h-6"
  },
  zoomOutButton: {
    class: [
      "z-20",
      // Flexbox & Alignment
      "flex justify-center items-center",
      // Size
      "w-12 h-12",
      // Spacing
      "mr-2",
      // Shape
      "rounded-full",
      // Color
      "text-white bg-transparent",
      // States
      "hover:text-white hover:bg-surface-0/10",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400",
      // Transition
      "transition duration-200 ease-in-out"
    ]
  },
  zoomOutIcon: {
    class: "w-6 h-6"
  },
  zoomInButton: {
    class: [
      "z-20",
      // Flexbox & Alignment
      "flex justify-center items-center",
      // Size
      "w-12 h-12",
      // Spacing
      "mr-2",
      // Shape
      "rounded-full",
      // Color
      "text-white bg-transparent",
      // States
      "hover:text-white hover:bg-surface-0/10",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400",
      // Transition
      "transition duration-200 ease-in-out"
    ]
  },
  zoomInIcon: {
    class: "w-6 h-6"
  },
  closeButton: {
    class: [
      "z-20",
      // Flexbox & Alignment
      "flex justify-center items-center",
      // Size
      "w-12 h-12",
      // Spacing
      "mr-2",
      // Shape
      "rounded-full",
      // Color
      "text-white bg-transparent",
      // States
      "hover:text-white hover:bg-surface-0/10",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400",
      // Transition
      "transition duration-200 ease-in-out"
    ]
  },
  closeIcon: {
    class: "w-6 h-6"
  },
  transition: {
    enterFromClass: "opacity-0 scale-75",
    enterActiveClass: "transition-all duration-150 ease-in-out",
    leaveActiveClass: "transition-all duration-150 ease-in",
    leaveToClass: "opacity-0 scale-75"
  }
}, Iu = {
  display: {
    class: [
      // Display
      "inline",
      // Spacing
      "px-3 py-2",
      // Shape
      "rounded-md",
      // Colors
      "text-surface-700 dark:text-white/80",
      // States
      "hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-white/80",
      // Transitions
      "transition",
      "duration-200",
      // Misc
      "cursor-pointer"
    ]
  }
}, Eu = {
  root: {
    class: ["flex items-stretch", "w-full"]
  }
}, zu = {
  root: {
    class: [
      // Flex
      "flex items-center justify-center",
      // Shape
      "first:rounded-l-md",
      "last:rounded-r-md",
      "border-y",
      "last:border-r",
      "border-l",
      "border-r-0",
      // Space
      "p-2",
      // Size
      "min-w-[2.5rem]",
      // Color
      "bg-transparent dark:bg-surface-900",
      "text-surface-800 dark:text-white/80",
      "border-surface-300 dark:border-surface-700"
    ]
  }
}, Lu = {
  pcinputtext: {
    root: ({ context: e, props: t, parent: r }) => {
      var o, s, n, a, i, l, u;
      return {
        class: [
          // Font
          "leading-none",
          // Spacing
          "m-0 py-2 px-3",
          // Colors
          "text-surface-800 dark:text-white/80",
          { "bg-surface-0 dark:bg-surface-950": !e.disabled },
          "border",
          { "border-surface-300 dark:border-surface-700": !t.invalid },
          // Invalid State
          "invalid:focus:ring-red-200",
          "invalid:hover:border-red-500",
          { "border-red-500 dark:border-red-400": t.invalid },
          // States
          {
            "hover:border-surface-400 dark:hover:border-surface-600": !e.disabled && !t.invalid,
            "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:z-10": !e.disabled,
            "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": e.disabled
          },
          // Filled State *for FloatLabel
          {
            filled: ((o = r.instance) == null ? void 0 : o.$name) == "FloatLabel" && e.filled || ((n = (s = r.instance) == null ? void 0 : s.$parentInstance) == null ? void 0 : n.$name) == "FloatLabel" && r.props.modelValue !== null && ((a = r.props.modelValue) == null ? void 0 : a.length) !== 0
          },
          ((i = r.instance) == null ? void 0 : i.$name) == "FloatLabel" || ((u = (l = r.instance) == null ? void 0 : l.$parentInstance) == null ? void 0 : u.$name) == "FloatLabel" ? "placeholder:text-transparent dark:placeholder:text-transparent" : "placeholder:text-surface-400 dark:placeholder:text-surface-500",
          // Misc
          "rounded-md",
          "appearance-none",
          "transition-colors duration-200"
        ]
      };
    }
  }
}, Ru = {
  root: ({ props: e, parent: t }) => ({
    class: [
      // Flex
      "inline-flex",
      "relative",
      { "flex-col": e.showButtons && e.buttonLayout === "vertical" },
      { "flex-1 w-[1%]": t.instance.$name === "InputGroup" },
      { "w-full": e.fluid },
      // Shape
      {
        "first:rounded-l-md rounded-none last:rounded-r-md": t.instance.$name === "InputGroup" && !e.showButtons
      },
      {
        "border-0 border-y border-l last:border-r border-surface-300 dark:border-surface-700": t.instance.$name === "InputGroup" && !e.showButtons
      },
      {
        "first:ml-0 -ml-px": t.instance.$name === "InputGroup" && !e.showButtons
      },
      //Sizing
      { "!w-16": e.showButtons && e.buttonLayout == "vertical" }
    ]
  }),
  pcInput: {
    root: ({ parent: e, context: t }) => {
      var r, o, s;
      return {
        class: [
          // Font
          "leading-none",
          // Display
          "flex-auto",
          { "w-[1%]": e.props.fluid },
          //Text
          {
            "text-center": e.props.showButtons && e.props.buttonLayout == "vertical"
          },
          // Spacing
          "py-2 px-3",
          "m-0",
          // Shape
          "rounded-md",
          {
            "rounded-l-none rounded-r-none": e.props.showButtons && e.props.buttonLayout === "horizontal"
          },
          {
            "rounded-none": e.props.showButtons && e.props.buttonLayout === "vertical"
          },
          {
            "border-0": ((r = e.instance.$parentInstance) == null ? void 0 : r.$name) === "InputGroup" && !e.props.showButtons
          },
          // Colors
          "text-surface-800 dark:text-white/80",
          "placeholder:text-surface-400 dark:placeholder:text-surface-500",
          { "bg-surface-0 dark:bg-surface-950": !t.disabled },
          "border",
          { "border-surface-300 dark:border-surface-700": !e.props.invalid },
          // Invalid State
          "invalid:focus:ring-danger-400",
          "invalid:hover:border-danger-400",
          { "border-red-500 dark:border-red-400": e.props.invalid },
          // States
          { "hover:border-secondary-400": !e.props.invalid },
          "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-secondary-500 dark:focus:ring-secondary-400 focus:z-10",
          {
            "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": t.disabled
          },
          // Filled State *for FloatLabel
          {
            filled: ((s = (o = e.instance) == null ? void 0 : o.$parentInstance) == null ? void 0 : s.$name) === "FloatLabel" && e.state.d_modelValue !== null
          },
          //Position
          {
            "order-2": e.props.buttonLayout == "horizontal" || e.props.buttonLayout === "vertical"
          }
        ]
      };
    }
  },
  buttonGroup: ({ props: e }) => ({
    class: [
      "absolute",
      "z-20",
      // Flex
      "flex",
      "flex-col",
      "top-px right-px",
      {
        "h-[calc(100%-2px)]": e.showButtons && e.buttonLayout === "stacked"
      }
    ]
  }),
  incrementButton: ({ props: e }) => ({
    class: [
      // Display
      {
        "flex flex-initial shrink-0": e.showButtons && e.buttonLayout === "horizontal"
      },
      {
        "flex flex-auto": e.showButtons && e.buttonLayout === "stacked"
      },
      // Alignment
      "items-center",
      "justify-center",
      "text-center align-bottom",
      //Position
      "relative",
      { "order-3": e.showButtons && e.buttonLayout === "horizontal" },
      { "order-1": e.showButtons && e.buttonLayout === "vertical" },
      //Color
      "text-surface-800 dark:text-surface-0",
      "bg-transparent",
      {
        "dark:bg-surface-900": e.showButtons && e.buttonLayout !== "stacked"
      },
      "border border-surface-300 dark:border-surface-700",
      { "border-0": e.showButtons && e.buttonLayout === "stacked" },
      {
        "border-l-0": e.showButtons && e.buttonLayout !== "stacked" && e.buttonLayout === "horizontal"
      },
      {
        "border-b-0": e.showButtons && e.buttonLayout !== "stacked" && e.buttonLayout === "vertical"
      },
      // Sizing
      "w-[3rem]",
      { "px-3 py-2": e.showButtons && e.buttonLayout !== "stacked" },
      { "p-0": e.showButtons && e.buttonLayout === "stacked" },
      { "w-full": e.showButtons && e.buttonLayout === "vertical" },
      // Shape
      "rounded-md",
      { "rounded-md": e.showButtons && e.buttonLayout == "stacked" },
      {
        "rounded-bl-none rounded-tl-none": e.showButtons && e.buttonLayout === "horizontal"
      },
      {
        "rounded-bl-none rounded-br-none": e.showButtons && e.buttonLayout === "vertical"
      },
      //States
      "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]",
      //Misc
      "cursor-pointer overflow-hidden select-none"
    ]
  }),
  incrementIcon: "inline-block w-4 h-4",
  decrementButton: ({ props: e }) => ({
    class: [
      // Display
      {
        "flex flex-initial shrink-0": e.showButtons && e.buttonLayout === "horizontal"
      },
      {
        "flex flex-auto": e.showButtons && e.buttonLayout === "stacked"
      },
      // Alignment
      "items-center",
      "justify-center",
      "text-center align-bottom",
      //Position
      "relative",
      { "order-1": e.showButtons && e.buttonLayout === "horizontal" },
      { "order-3": e.showButtons && e.buttonLayout === "vertical" },
      //Color
      "text-surface-800 dark:text-surface-0",
      "bg-transparent",
      {
        "dark:bg-surface-900": e.showButtons && e.buttonLayout !== "stacked"
      },
      "border border-surface-300 dark:border-surface-700",
      { "border-0": e.showButtons && e.buttonLayout === "stacked" },
      {
        "border-r-0": e.showButtons && e.buttonLayout !== "stacked" && e.buttonLayout === "horizontal"
      },
      {
        "border-t-0": e.showButtons && e.buttonLayout !== "stacked" && e.buttonLayout === "vertical"
      },
      // Sizing
      "w-[3rem]",
      { "px-3 py-2": e.showButtons && e.buttonLayout !== "stacked" },
      { "p-0": e.showButtons && e.buttonLayout === "stacked" },
      { "w-full": e.showButtons && e.buttonLayout === "vertical" },
      // Shape
      "rounded-md",
      {
        "rounded-tr-none rounded-tl-none rounded-bl-none": e.showButtons && e.buttonLayout === "stacked"
      },
      {
        "rounded-tr-none rounded-br-none ": e.showButtons && e.buttonLayout === "horizontal"
      },
      {
        "rounded-tr-none rounded-tl-none ": e.showButtons && e.buttonLayout === "vertical"
      },
      //States
      "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]",
      //Misc
      "cursor-pointer overflow-hidden select-none"
    ]
  }),
  decrementIcon: "inline-block w-4 h-4"
}, Mu = {
  root: {
    class: [
      // Alignment
      "flex items-center",
      "gap-2",
      "[&_[data-pc-name^=pcinput]]:w-10"
    ]
  }
}, Nu = {
  root: ({ props: e, context: t, parent: r }) => {
    var o, s, n, a;
    return {
      class: [
        // Font
        "leading-none",
        // Flex
        { "flex-1 w-[1%]": r.instance.$name == "InputGroup" },
        // Spacing
        "m-0",
        { "w-full": e.fluid },
        // Size
        {
          "py-3 px-3.5": e.size == "large",
          "py-1.5 px-2": e.size == "small",
          "py-2 px-3": e.size == null
        },
        // Shape
        { "rounded-md": r.instance.$name !== "InputGroup" },
        {
          "first:rounded-l-md rounded-none last:rounded-r-md": r.instance.$name == "InputGroup"
        },
        {
          "border-0 border-y border-l last:border-r": r.instance.$name == "InputGroup"
        },
        {
          "first:ml-0 -ml-px": r.instance.$name == "InputGroup" && !e.showButtons
        },
        // Colors
        "text-surface-800 dark:text-white/80",
        "placeholder:text-surface-400 dark:placeholder:text-surface-500",
        { "bg-surface-0 dark:bg-surface-950": !t.disabled },
        "border",
        { "border-surface-300 dark:border-surface-700": !e.invalid },
        // Invalid State
        "invalid:focus:ring-danger-400",
        "invalid:hover:border-danger-400",
        { "border-danger-400 dark:border-danger-400": e.invalid },
        // States
        {
          "hover:border-surface-400 dark:hover:border-surface-600": !t.disabled && !e.invalid,
          "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-secondary-500 dark:focus:ring-secondary-400 focus:z-10": !t.disabled,
          "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": t.disabled
        },
        // Filled State *for FloatLabel
        {
          filled: ((o = r.instance) == null ? void 0 : o.$name) == "FloatLabel" && t.filled || ((n = (s = r.instance) == null ? void 0 : s.$parentInstance) == null ? void 0 : n.$name) == "FloatLabel" && r.props.modelValue !== null && ((a = r.props.modelValue) == null ? void 0 : a.length) !== 0
        },
        // Misc
        "appearance-none",
        "transition-colors duration-200"
      ]
    };
  }
}, Fu = {
  root: ({ props: e }) => ({
    class: [
      // Misc
      {
        "opacity-60 select-none pointer-events-none cursor-default": e.disabled
      }
    ]
  }),
  range: {
    class: [
      // Stroke
      "stroke-current",
      // Color
      "stroke-surface-200 dark:stroke-surface-700",
      // Fill
      "fill-none",
      // Transition
      "transition duration-100 ease-in"
    ]
  },
  value: {
    class: [
      // Animation
      "animate-dash-frame",
      // Color
      "stroke-primary",
      // Fill
      "fill-none"
    ]
  },
  text: {
    class: [
      // Text Style
      "text-center text-xl",
      // Color
      "fill-surface-600 dark:fill-surface-200"
    ]
  }
}, Du = {
  root: ({ props: e }) => ({
    class: [
      "rounded-md",
      // Colors
      { "bg-surface-0 dark:bg-surface-900": !e.disabled },
      "text-surface-700 dark:text-white/80",
      "border",
      { "border-surface-300 dark:border-surface-700": !e.invalid },
      // Disabled State
      {
        "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": e.disabled
      },
      // Invalid State
      { "border-red-500 dark:border-red-400": e.invalid }
    ]
  }),
  listContainer: "overflow-auto",
  list: {
    class: "p-1 list-none m-0 outline-none"
  },
  option: ({ context: e, props: t }) => ({
    class: [
      "relative",
      // Flex
      "flex items-center",
      // Font
      "leading-none",
      // Spacing
      "m-0 px-3 py-2",
      "first:mt-0 mt-[2px]",
      // Shape
      "border-0 rounded",
      // Colors
      {
        "bg-surface-200 dark:bg-surface-600/60": e.focused && !e.selected,
        "text-surface-700 dark:text-white/80": e.focused && !e.selected,
        "bg-highlight": e.selected && !t.checkmark,
        "bg-surface-0 dark:bg-surface-900": t.checkmark && e.selected
      },
      //States
      {
        "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.focused && !e.selected || t.checkmark && e.selected
      },
      { "hover:bg-highlight-emphasis": e.selected && !t.checkmark },
      {
        "hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-[rgba(255,255,255,0.03)]": e.focused && !e.selected
      },
      // Transition
      "transition-shadow duration-200",
      // Misc
      "cursor-pointer overflow-hidden whitespace-nowrap"
    ]
  }),
  optionGroup: {
    class: [
      "font-semibold",
      // Spacing
      "m-0 py-2 px-3",
      // Colors
      "text-surface-400 dark:text-surface-500",
      // Misc
      "cursor-auto"
    ]
  },
  optionCheckIcon: "relative -ms-1.5 me-1.5 text-surface-700 dark:text-white/80 w-4 h-4",
  emptyMessage: {
    class: [
      // Font
      "leading-none",
      // Spacing
      "py-2 px-3",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-transparent"
    ]
  },
  header: {
    class: [
      // Spacing
      "pt-2 px-2 pb-0",
      "m-0",
      //Shape
      "border-b-0",
      "rounded-tl-md",
      "rounded-tr-md",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-900",
      "border-surface-300 dark:border-surface-700",
      "[&_[data-pc-name=pcfilter]]:w-full"
    ]
  }
}, Vu = {
  root: ({ props: e }) => ({
    class: [
      "relative",
      // Flexbox
      "flex",
      // Shape & Size
      "rounded-md",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-200 dark:border-surface-700",
      {
        "p-2 items-center": e.orientation == "horizontal",
        "flex-col sm:w-48 p-1": e.orientation !== "horizontal"
      }
    ]
  }),
  rootList: ({ props: e }) => ({
    class: [
      // Flexbox
      "sm:flex",
      "items-center",
      "flex-wrap",
      "flex-col sm:flex-row",
      { hidden: !(e != null && e.mobileActive), flex: e == null ? void 0 : e.mobileActive },
      // Position
      "absolute sm:relative",
      "top-full left-0",
      "sm:top-auto sm:left-auto",
      // Size
      "w-full sm:w-auto",
      // Spacing
      "m-0",
      "p-1 sm:py-0 sm:p-0",
      "list-none",
      // Shape
      "shadow-md sm:shadow-none",
      "border-0",
      // Color
      "bg-surface-0 dark:bg-surface-900 sm:bg-transparent dark:sm:bg-transparent",
      // Misc
      "outline-none"
    ]
  }),
  item: ({ props: e }) => ({
    class: [
      "sm:relative static my-[2px] [&:first-child]:mt-0",
      {
        "sm:w-auto w-full": e.horizontal,
        "w-full": !e.horizontal
      }
    ]
  }),
  itemContent: ({ context: e }) => ({
    class: [
      "rounded-[4px]",
      //  Colors
      {
        "text-surface-500 dark:text-white/70": !e.focused && !e.active,
        "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-surface-600/90": e.focused && !e.active,
        "bg-highlight text-highlight-contrast": e.focused && e.active || e.active || !e.focused && e.active
      },
      // Hover States
      {
        "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.active,
        "hover:bg-highlight-emphasis": e.active
      },
      // Transitions
      "transition-all",
      "duration-200"
    ]
  }),
  itemLink: {
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-2",
      "px-3",
      // Size
      "leading-none",
      // Misc
      "select-none",
      "cursor-pointer",
      "no-underline ",
      "overflow-hidden"
    ]
  },
  itemIcon: {
    class: "mr-2"
  },
  submenuIcon: ({ props: e }) => ({
    class: [
      {
        "ml-auto sm:ml-2": e.horizontal,
        "ml-auto": !e.horizontal
      }
    ]
  }),
  overlay: ({ props: e }) => ({
    class: [
      // Size
      "w-auto",
      // Spacing
      "m-0",
      // Shape
      "shadow-none sm:shadow-md",
      "rounded-md",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      // Position
      "static sm:absolute",
      "z-10",
      {
        "sm:left-full top-0": !e.horizontal
      }
    ]
  }),
  grid: {
    class: "flex flex-wrap sm:flex-nowrap"
  },
  column: {
    class: "w-full sm:w-1/2"
  },
  submenu: {
    class: ["m-0 list-none", "p-1 px-2 w-full sm:min-w-[14rem]"]
  },
  submenuLabel: {
    class: [
      "font-semibold",
      // Spacing
      "py-2 px-3",
      "m-0",
      // Color
      "text-surface-400 dark:text-surface-500",
      "bg-surface-0 dark:bg-surface-900"
    ]
  },
  separator: {
    class: "border-t border-surface-200 dark:border-surface-600"
  },
  button: {
    class: [
      // Flexbox
      "flex sm:hidden",
      "items-center justify-center",
      // Size
      "w-7",
      "h-7",
      // Shape
      "rounded-full",
      // Color
      "text-surface-500 dark:text-white/80",
      // States
      "hover:text-surface-600 dark:hover:text-white/60",
      "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]",
      "focus:outline-none focus:outline-offset-0",
      "focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400",
      // Transitions
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer",
      "no-underline"
    ]
  },
  end: {
    class: "ml-auto self-center"
  }
}, Bu = {
  root: {
    class: [
      // Sizing and Shape
      "min-w-[12.5rem]",
      "rounded-md",
      // Spacing
      "p-1",
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-700 dark:text-white/80"
    ]
  },
  list: {
    class: [
      // Spacings and Shape
      "list-none",
      "m-0",
      "p-0",
      "outline-none"
    ]
  },
  item: {
    class: "relative my-[2px] [&:first-child]:mt-0"
  },
  separator: {
    class: "border-t border-surface-200 dark:border-surface-700"
  },
  itemContent: ({ context: e }) => ({
    class: [
      //Shape
      "rounded-[4px]",
      // Colors
      {
        "text-surface-500 dark:text-white/70": !e.focused && !e.active,
        "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-[rgba(255,255,255,0.03)]": e.focused && !e.active,
        "bg-highlight text-highlight-contrast": e.focused && e.active || e.active || !e.focused && e.active
      },
      // Transitions
      "transition-shadow",
      "duration-200",
      // States
      {
        "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.active,
        "hover:bg-highlight-emphasis": e.active
      },
      // Disabled
      {
        "text-surface-500 pointer-events-none cursor-default": e.disabled
      }
    ]
  }),
  itemLink: {
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-2",
      "px-3",
      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none"
    ]
  },
  itemIcon: {
    class: [
      // Spacing
      "mr-2"
    ]
  },
  itemLabel: {
    class: ["leading-[normal]"]
  },
  submenuLabel: ({ context: e }) => ({
    class: [
      // Font
      "font-bold",
      // Spacing
      "m-0",
      "py-2 px-3",
      // Shape
      "rounded-tl-none",
      "rounded-tr-none",
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "text-surface-400 dark:text-surface-300"
    ]
  }),
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
}, Hu = {
  root: {
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "p-2",
      // Shape
      "rounded-md",
      // Color
      "bg-surface-0 dark:bg-surface-800",
      "border border-surface-200 dark:border-none"
    ]
  },
  rootList: ({ props: e }) => ({
    class: [
      // Flexbox
      "sm:flex",
      "items-center",
      "flex-wrap",
      "flex-col sm:flex-row",
      { hidden: !(e != null && e.mobileActive), flex: e == null ? void 0 : e.mobileActive },
      // Position
      "absolute sm:relative",
      "top-full left-0",
      "sm:top-auto sm:left-auto",
      // Size
      "w-full sm:w-auto",
      // Spacing
      "m-0",
      "p-1 sm:py-0 sm:p-0",
      "list-none",
      // Shape
      "shadow-md sm:shadow-none",
      "border-0",
      // Color
      "bg-surface-0 dark:bg-surface-800 sm:bg-transparent",
      // Misc
      "outline-none"
    ]
  }),
  item: {
    class: "sm:relative sm:w-auto w-full static my-[2px] [&:first-child]:mt-0"
  },
  itemContent: ({ context: e }) => ({
    class: [
      // Shape
      "rounded-[4px]",
      // Colors
      {
        "text-surface-500 dark:text-white/70": !e.focused && !e.active,
        "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-surface-600/90": e.focused && !e.active,
        "bg-highlight text-highlight-contrast": e.focused && e.active || e.active || !e.focused && e.active
      },
      // States
      {
        "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.active,
        "hover:bg-highlight-emphasis": e.active
      },
      // Disabled State
      { "opacity-60 pointer-events-none cursor-default": e.disabled },
      // Transitions
      "transition-all",
      "duration-200"
    ]
  }),
  itemLink: ({ context: e }) => ({
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-2",
      "px-3",
      // Size
      {
        "pl-9 sm:pl-5": e.level === 1,
        "pl-14 sm:pl-5": e.level === 2
      },
      "leading-none",
      // Misc
      "select-none",
      "cursor-pointer",
      "no-underline ",
      "overflow-hidden"
    ]
  }),
  itemIcon: {
    class: "mr-2"
  },
  submenuIcon: ({ props: e }) => ({
    class: [
      {
        "ml-auto sm:ml-2": e.root,
        "ml-auto": !e.root
      }
    ]
  }),
  submenu: ({ props: e }) => ({
    class: [
      "flex flex-col",
      // Size
      "rounded-md",
      "min-w-[12.5rem]",
      // Spacing
      "p-1",
      "m-0",
      "list-none",
      // Shape
      "shadow-none sm:shadow-md",
      "border border-surface-200 dark:border-surface-700",
      // Position
      "static sm:absolute",
      "z-10",
      { "sm:absolute sm:left-full sm:top-0": e.level > 1 },
      // Color
      "bg-surface-0 dark:bg-surface-900"
    ]
  }),
  separator: {
    class: "border-t border-surface-200 dark:border-surface-600"
  },
  button: {
    class: [
      // Flexbox
      "flex sm:hidden",
      "items-center justify-center",
      // Size
      "w-7",
      "h-7",
      // Shape
      "rounded-full",
      // Color
      "text-surface-500 dark:text-white/80",
      // States
      "hover:text-surface-600 dark:hover:text-white/60",
      "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]",
      "focus:outline-none focus:outline-offset-0",
      "focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400",
      // Transitions
      "transition duration-200 ease-in-out",
      // Misc
      "cursor-pointer",
      "no-underline"
    ]
  },
  end: {
    class: "ml-auto self-center"
  }
}, Ku = {
  root: ({ props: e }) => ({
    class: [
      // Spacing and Shape
      "rounded-md",
      "outline",
      // Colors
      {
        "bg-blue-100/70 dark:bg-blue-500/20": e.severity == "info",
        "bg-green-100/70 dark:bg-green-500/20": e.severity == "success",
        "bg-surface-100/70 dark:bg-surface-500/20": e.severity == "secondary",
        "bg-orange-100/70 dark:bg-orange-500/20": e.severity == "warn",
        "bg-red-100/70 dark:bg-red-500/20": e.severity == "error",
        "bg-surface-950 dark:bg-surface-0": e.severity == "contrast"
      },
      {
        "outline-blue-200 dark:outline-blue-500/20": e.severity == "info",
        "outline-green-200 dark:outline-green-500/20": e.severity == "success",
        "outline-surface-200 dark:outline-surface-500/20": e.severity == "secondary",
        "outline-orange-200 dark:outline-orange-500/20": e.severity == "warn",
        "outline-red-200 dark:outline-red-500/20": e.severity == "error",
        "outline-surface-950 dark:outline-surface-0": e.severity == "contrast"
      },
      {
        "text-blue-700 dark:text-blue-300": e.severity == "info",
        "text-green-700 dark:text-green-300": e.severity == "success",
        "text-surface-700 dark:text-surface-300": e.severity == "secondary",
        "text-orange-700 dark:text-orange-300": e.severity == "warn",
        "text-red-700 dark:text-red-300": e.severity == "error",
        "text-surface-0 dark:text-surface-950": e.severity == "contrast"
      }
    ]
  }),
  content: {
    class: [
      // Flexbox
      "flex items-center h-full",
      // Spacing
      "py-2 px-3 gap-2"
    ]
  },
  icon: {
    class: [
      // Sizing and Spacing
      "shrink-0 w-[1.125rem] h-[1.125rem]"
    ]
  },
  text: {
    class: [
      // Font and Text
      "text-base leading-[normal]",
      "font-medium"
    ]
  },
  closeButton: ({ props: e }) => ({
    class: [
      // Flexbox
      "flex items-center justify-center",
      // Size
      "w-7 h-7",
      // Spacing and Misc
      "ml-auto relative",
      // Shape
      "rounded-full",
      // Colors
      "bg-transparent",
      // Transitions
      "transition duration-200 ease-in-out",
      // States
      "hover:bg-surface-0/30 dark:hover:bg-[rgba(255,255,255,0.03)]",
      "focus:outline-none focus:outline-offset-0 focus:ring-1",
      {
        "focus:ring-blue-500 dark:focus:ring-blue-400": e.severity == "info",
        "focus:ring-green-500 dark:focus:ring-green-400": e.severity == "success",
        "focus:ring-surface-500 dark:focus:ring-surface-400": e.severity == "secondary",
        "focus:ring-orange-500 dark:focus:ring-orange-400": e.severity == "warn",
        "focus:ring-red-500 dark:focus:ring-red-4000": e.severity == "error",
        "focus:ring-surface-0 dark:focus:ring-surface-950": e.severity == "contrast"
      },
      // Misc
      "overflow-hidden"
    ]
  }),
  transition: {
    enterFromClass: "opacity-0",
    enterActiveClass: "transition-opacity duration-300",
    leaveFromClass: "max-h-40",
    leaveActiveClass: "overflow-hidden transition-all duration-300 ease-in",
    leaveToClass: "max-h-0 opacity-0 !m-0"
  }
}, Wu = {
  root: ({ props: e }) => ({
    class: [
      // Flexbox
      "flex gap-4",
      {
        "flex-col": e.orientation == "horizontal",
        "flex-row": e.orientation == "vertical"
      }
    ]
  }),
  meters: ({ props: e }) => ({
    class: [
      // Flexbox
      "flex",
      { "flex-col": e.orientation === "vertical" },
      // Sizing
      { "w-2 h-full": e.orientation === "vertical" },
      { "h-2": e.orientation === "horizontal" },
      // Colors
      "bg-gray-200 dark:bg-gray-700",
      // Border Radius
      "rounded-lg"
    ]
  }),
  meter: ({ props: e }) => ({
    class: [
      // Shape
      "border-0",
      // Rounded Corners - Horizontal
      {
        "first:rounded-l-lg last:rounded-r-lg": e.orientation === "horizontal"
      },
      // Rounded Corners - Vertical
      {
        "first:rounded-t-lg last:rounded-b-lg": e.orientation === "vertical"
      },
      // Colors
      "bg-primary"
    ]
  }),
  labelList: ({ props: e }) => ({
    class: [
      // Display & Flexbox
      "flex flex-wrap",
      { "gap-4": e.labelOrientation === "horizontal" },
      { "gap-2": e.labelOrientation === "vertical" },
      { "flex-col": e.labelOrientation === "vertical" },
      // Conditional Alignment - Horizontal
      {
        "align-end": e.labelOrientation === "horizontal" && e.labelPosition === "end",
        "align-start": e.labelOrientation === "horizontal" && e.labelPosition === "start"
      },
      // Conditional Alignment - Vertical
      {
        "justify-start": e.labelOrientation === "vertical" && e.labelPosition === "start"
      },
      // List Styling
      "m-0 p-0 list-none"
    ]
  }),
  label: {
    class: [
      // Flexbox
      "inline-flex",
      "items-center",
      "gap-2"
    ]
  },
  labelMarker: {
    class: [
      // Display
      "inline-flex",
      // Background Color
      "bg-primary",
      // Size
      "w-2 h-2",
      // Rounded Shape
      "rounded-full"
    ]
  }
}, Uu = {
  root: ({ props: e, state: t }) => ({
    class: [
      // Font
      "leading-none",
      // Display and Position
      "inline-flex",
      "relative",
      // Shape
      "rounded-md",
      // Color and Background
      { "bg-surface-0 dark:bg-surface-950": !e.disabled },
      "border",
      { "border-surface-300 dark:border-surface-600": !e.invalid },
      // Invalid State
      "invalid:focus:ring-red-200",
      "invalid:hover:border-red-500",
      { "border-red-500 dark:border-red-400": e.invalid },
      // Transitions
      "transition-all",
      "duration-200",
      // States
      {
        "hover:border-surface-400 dark:hover:border-surface-700": !e.invalid
      },
      {
        "outline-none outline-offset-0 z-10 ring-1 ring-primary-500 dark:ring-primary-400": t.focused
      },
      // Misc
      "cursor-pointer",
      "select-none",
      {
        "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": e.disabled
      }
    ]
  }),
  labelContainer: "overflow-hidden flex flex-auto cursor-pointer",
  label: ({ props: e, parent: t }) => {
    var r, o, s, n, a, i, l, u;
    return {
      class: [
        "text-base leading-2",
        // Spacing
        {
          "py-2 px-3": e.display === "comma" || e.display === "chip" && !((r = e == null ? void 0 : e.modelValue) != null && r.length),
          "py-1 px-1": e.display === "chip" && ((o = e == null ? void 0 : e.modelValue) == null ? void 0 : o.length) > 0
        },
        // Color
        {
          "text-surface-800 dark:text-white/80": (s = e.modelValue) == null ? void 0 : s.length,
          "text-surface-400 dark:text-surface-500": !((n = e.modelValue) != null && n.length)
        },
        {
          "placeholder:text-transparent dark:placeholder:text-transparent": ((a = t.instance) == null ? void 0 : a.$name) == "FloatLabel",
          "!text-transparent dark:!text-transparent": ((i = t.instance) == null ? void 0 : i.$name) == "FloatLabel" && e.modelValue == null || ((l = e.modelValue) == null ? void 0 : l.length) == 0
        },
        // Filled State *for FloatLabel
        {
          filled: ((u = t.instance) == null ? void 0 : u.$name) == "FloatLabel" && e.modelValue !== null
        },
        // Transitions
        "transition duration-200",
        // Misc
        "overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis"
      ]
    };
  },
  dropdown: {
    class: [
      // Flexbox
      "flex items-center justify-center",
      "shrink-0",
      // Color and Background
      "bg-transparent",
      "text-surface-500",
      // Size
      "w-12",
      // Shape
      "rounded-r-md"
    ]
  },
  overlay: {
    class: [
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-white/80",
      // Shape
      "border border-surface-300 dark:border-surface-700",
      "rounded-md",
      "shadow-md",
      "mt-[2px]"
    ]
  },
  header: {
    class: [
      //Flex
      "flex items-center justify-between",
      // Spacing
      "pt-2 px-4 pb-0 gap-2",
      "m-0",
      //Shape
      "border-b-0",
      "rounded-tl-md",
      "rounded-tr-md",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-900",
      "border-surface-300 dark:border-surface-700",
      "[&_[data-pc-name=pcfiltercontainer]]:!flex-auto",
      "[&_[data-pc-name=pcfilter]]:w-full"
    ]
  },
  listContainer: {
    class: [
      // Sizing
      "max-h-[200px]",
      // Misc
      "overflow-auto"
    ]
  },
  list: {
    class: "p-1 list-none m-0"
  },
  option: ({ context: e }) => ({
    class: [
      "relative",
      "flex items-center",
      // Font
      "leading-none",
      // Spacing
      "m-0 px-3 py-2 gap-2",
      "first:mt-0 mt-[2px]",
      // Shape
      "border-0 rounded",
      // Colors
      {
        "bg-surface-200 dark:bg-surface-600/60": e.focused && !e.selected,
        "text-surface-700 dark:text-white/80": e.focused && !e.selected,
        "bg-highlight": e.selected
      },
      //States
      {
        "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.focused && !e.selected
      },
      { "hover:bg-highlight-emphasis": e.selected },
      {
        "hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-[rgba(255,255,255,0.03)]": e.focused && !e.selected
      },
      // Transition
      "transition-shadow duration-200",
      // Misc
      "cursor-pointer overflow-hidden whitespace-nowrap"
    ]
  }),
  optionGroup: {
    class: [
      "font-semibold",
      // Spacing
      "m-0 py-2 px-3",
      // Colors
      "text-surface-400 dark:text-surface-500",
      // Misc
      "cursor-auto"
    ]
  },
  emptyMessage: {
    class: [
      // Font
      "leading-none",
      // Spacing
      "py-2 px-3",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-transparent"
    ]
  },
  loadingIcon: {
    class: "text-surface-400 dark:text-surface-500 animate-spin"
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
}, Ju = {
  root: "flex",
  controls: {
    class: [
      // Flexbox & Alignment
      "flex xl:flex-col justify-center gap-2",
      // Spacing
      "p-[1.125rem]"
    ]
  },
  container: {
    class: [
      "flex-auto",
      // Shape
      "rounded-md",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-200 dark:border-surface-700",
      "outline-none"
    ]
  }
}, Gu = {
  table: {
    class: [
      // Spacing & Position
      "mx-auto my-0",
      // Table Style
      "border-spacing-0 border-separate"
    ]
  },
  cell: {
    class: [
      // Alignment
      "text-center align-top",
      // Spacing
      "py-0 px-3"
    ]
  },
  node: ({ context: e }) => ({
    class: [
      "relative inline-block",
      // Spacing
      "py-3 px-4",
      // Shape
      "border",
      "rounded-md",
      "border-surface-200 dark:border-surface-700",
      // Color
      {
        "text-surface-600 dark:text-white/80": !(e != null && e.selected),
        "bg-surface-0 dark:bg-surface-900": !(e != null && e.selected),
        "bg-highlight": e == null ? void 0 : e.selected
      },
      // States
      {
        "hover:bg-surface-100 dark:hover:bg-surface-800": (e == null ? void 0 : e.selectable) && !(e != null && e.selected),
        "hover:bg-highlight-emphasis": (e == null ? void 0 : e.selectable) && (e == null ? void 0 : e.selected)
      },
      { "cursor-pointer": e == null ? void 0 : e.selectable }
    ]
  }),
  lineCell: {
    class: [
      // Alignment
      "text-center align-top",
      // Spacing
      "py-0 px-3"
    ]
  },
  connectorDown: {
    class: [
      // Spacing
      "mx-auto my-0",
      // Size
      "w-px h-[20px]",
      // Color
      "bg-surface-200 dark:bg-surface-700"
    ]
  },
  connectorLeft: ({ context: e }) => ({
    class: [
      // Alignment
      "text-center align-top",
      // Spacing
      "py-0 px-3",
      // Shape
      "rounded-none border-r",
      { "border-t": e.lineTop },
      // Color
      "border-surface-200 dark:border-surface-700"
    ]
  }),
  connectorRight: ({ context: e }) => ({
    class: [
      // Alignment
      "text-center align-top",
      // Spacing
      "py-0 px-3",
      // Shape
      "rounded-none",
      // Color
      {
        "border-t border-surface-200 dark:border-surface-700": e.lineTop
      }
    ]
  }),
  nodeCell: {
    class: "text-center align-top py-0 px-3"
  },
  nodeToggleButton: {
    class: [
      // Position
      "absolute bottom-[-0.75rem] left-2/4 -ml-3",
      "z-20",
      // Flexbox
      "flex items-center justify-center",
      // Size
      "w-6 h-6",
      // Shape
      "rounded-full",
      "border border-surface-200 dark:border-surface-700",
      // Color
      "bg-inherit text-inherit",
      // Focus
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400",
      // Misc
      "cursor-pointer no-underline select-none"
    ]
  },
  nodeToggleButtonIcon: {
    class: [
      // Position
      "static inline-block",
      // Size
      "w-4 h-4"
    ]
  }
}, qu = {
  root: {
    class: [
      "relative",
      "[&>[data-pc-name=pcbadge]]:absolute",
      "[&>[data-pc-name=pcbadge]]:top-0",
      "[&>[data-pc-name=pcbadge]]:right-0",
      "[&>[data-pc-name=pcbadge]]:translate-x-1/2",
      "[&>[data-pc-name=pcbadge]]:-translate-y-1/2",
      "[&>[data-pc-name=pcbadge]]:m-0",
      "[&>[data-pc-name=pcbadge]]:origin-[100%_0]",
      "[&>[data-pc-name=pcbadge]]:outline",
      "[&>[data-pc-name=pcbadge]]:outline-[2px]",
      "[&>[data-pc-name=pcbadge]]:outline-surface-0",
      "dark:[&>[data-pc-name=pcbadge]]:outline-surface-900"
    ]
  }
}, Yu = {
  root: {
    class: [
      // Flex & Alignment
      "flex items-center justify-center flex-wrap",
      // Spacing
      "px-4 py-2",
      // Shape
      "border-0 rounded-md",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-500 dark:text-white/60"
    ]
  },
  first: ({ context: e }) => ({
    class: [
      "relative",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-0 rounded-full",
      // Size
      "min-w-[2.5rem] h-10 m-[0.143rem]",
      "leading-none",
      // Color
      "text-surface-500 dark:text-white/60",
      // State
      {
        "hover:bg-surface-50 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.disabled,
        "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400": !e.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": e.disabled }
    ]
  }),
  prev: ({ context: e }) => ({
    class: [
      "relative",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-0 rounded-full",
      // Size
      "min-w-[2.5rem] h-10 m-[0.143rem]",
      "leading-none",
      // Color
      "text-surface-500 dark:text-white/60",
      // State
      {
        "hover:bg-surface-50 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.disabled,
        "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400": !e.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": e.disabled }
    ]
  }),
  next: ({ context: e }) => ({
    class: [
      "relative",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-0 rounded-full",
      // Size
      "min-w-[2.5rem] h-10 m-[0.143rem]",
      "leading-none",
      // Color
      "text-surface-500 dark:text-white/60",
      // State
      {
        "hover:bg-surface-50 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.disabled,
        "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400": !e.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": e.disabled }
    ]
  }),
  last: ({ context: e }) => ({
    class: [
      "relative",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-0 rounded-full",
      // Size
      "min-w-[2.5rem] h-10 m-[0.143rem]",
      "leading-none",
      // Color
      "text-surface-500 dark:text-white/60",
      // State
      {
        "hover:bg-surface-50 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.disabled,
        "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400": !e.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": e.disabled }
    ]
  }),
  page: ({ context: e }) => ({
    class: [
      "relative",
      // Flex & Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-0 rounded-full",
      // Size
      "min-w-[2.5rem] h-10 m-[0.143rem]",
      "leading-none",
      // Color
      {
        "bg-highlight text-highlight-contrast border-highlight text-highlight-contrast hover:bg-highlight-emphasis ": e.active,
        "text-surface-500 dark:text-white/60": !e.active
      },
      // State
      {
        "hover:bg-surface-50 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.disabled && !e.active,
        "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400": !e.disabled
      },
      // Transition
      "transition duration-200",
      // Misc
      "user-none overflow-hidden",
      { "cursor-default pointer-events-none opacity-60": e.disabled }
    ]
  }),
  contentStart: "mr-auto",
  contentEnd: "ml-auto"
}, Qu = {
  root: {
    class: [
      //Shape
      "rounded-md",
      //Colors
      "border border-surface-200 dark:border-surface-700",
      "bg-surface-0 dark:bg-surface-900"
    ]
  },
  header: ({ props: e }) => ({
    class: [
      // Flex
      "flex items-center justify-between",
      // Colors
      "text-surface-700 dark:text-surface-0/80",
      "bg-transparent",
      //Shape
      "rounded-tl-md rounded-tr-md",
      "border-0",
      // Conditional Spacing
      {
        "p-[1.125rem]": !e.toggleable,
        "py-3 px-[1.125rem]": e.toggleable
      }
    ]
  }),
  title: {
    class: "leading-none font-semibold"
  },
  pctogglebutton: {
    root: {
      class: [
        // Positioning
        "relative",
        // Flexbox alignment
        "inline-flex items-center justify-center text-center",
        // Line height
        "leading-[normal]",
        // Size
        "w-10 h-10 px-0 py-2",
        // Shape
        "rounded-[50%] rounded-full",
        // Background and border
        "bg-transparent border-transparent",
        // Text color
        "text-surface-500 dark:text-surface-300",
        // Focus states
        "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-surface-500 dark:focus:ring-surface-400",
        // Hover effect
        "hover:bg-surface-300/10",
        // Transition effects
        "transition duration-200 ease-in-out",
        // Cursor and overflow
        "cursor-pointer overflow-hidden select-none"
      ]
    }
  },
  content: {
    class: [
      // Spacing
      "p-[1.125rem] pt-0",
      // Shape
      "border-0 border-t-0 last:rounded-br-md last:rounded-bl-md",
      //Color
      "text-surface-700 dark:text-surface-0/80"
    ]
  },
  footer: {
    class: [
      // Spacing
      "p-[1.125rem] pt-0",
      // Shape
      "border-0 border-t-0 rounded-br-lg rounded-bl-lg",
      //Color
      "text-surface-700 dark:text-surface-0/80"
    ]
  },
  transition: {
    enterFromClass: "max-h-0",
    enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
    enterToClass: "max-h-[1000px]",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
    leaveToClass: "max-h-0"
  }
}, Zu = {
  root: {
    class: "bg-surface-800 rounded-md"
  },
  panel: {
    class: "p-1 overflow-hidden rounded-md bg-surface-800"
  },
  header: {
    class: ["rounded-[4px]", "outline-none"]
  },
  headerContent: ({ context: e }) => ({
    class: [
      // Shape
      "rounded-[4px]",
      // Color
      "text-surface-600 dark:text-surface-0/80",
      { "text-surface-900": e.active },
      // States
      "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.20)]",
      // Transition
      "transition duration-200 ease-in-out",
      "transition-shadow duration-200"
    ]
  }),
  headerLink: {
    class: [
      "relative",
      // Font
      "font-semibold",
      "leading-none",
      // Flex & Alignments
      "flex items-center",
      // Spacing
      "py-2 px-3",
      // Misc
      "select-none cursor-pointer no-underline"
    ]
  },
  headerLabel: {
    class: "leading-none"
  },
  headerIcon: {
    class: "mr-2"
  },
  submenuIcon: {
    class: "mr-2 w-3 h-3"
  },
  content: {
    class: [
      // Color
      "text-surface-700 dark:text-white/80"
    ]
  },
  rootList: {
    class: ["outline-none", "m-0 p-0 list-none"]
  },
  menuitem: {
    class: "relative my-[2px]"
  },
  itemContent: {
    class: [
      // Shape
      "border-none rounded-[4px]",
      // Color
      "text-surface-700 dark:text-white/80",
      // Transition
      "transition-shadow duration-200"
    ]
  },
  itemLink: ({ context: e }) => ({
    class: [
      "relative",
      // Font
      "leading-none",
      // Flex & Alignments
      "flex items-center",
      // Spacing
      "py-2 px-3",
      // Shape
      "rounded-[4px]",
      // Color
      "text-surface-300",
      // States
      "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.20)] hover:text-surface-700 dark:hover:text-white/80",
      {
        "bg-surface-200 text-surface-700 dark:text-white/80 dark:bg-surface-0/10": e.focused
      },
      // Misc
      "cursor-pointer no-underline",
      "select-none overflow-hidden"
    ]
  }),
  itemIcon: {
    class: "mr-2"
  },
  submenu: {
    class: "p-0 m-0 list-none"
  },
  transition: {
    enterFromClass: "max-h-0",
    enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
    enterToClass: "max-h-[1000px]",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
    leaveToClass: "max-h-0"
  }
}, Xu = {
  root: ({ props: e }) => ({
    class: [
      "relative [&>input]:w-full",
      { "[&>input]:pr-10": e.toggleMask },
      { "flex [&>input]:w-full": e.fluid, "inline-flex": !e.fluid }
    ]
  }),
  overlay: {
    class: [
      // Spacing
      "p-3",
      // Shape
      "border",
      "shadow-md rounded-md",
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-white/80",
      "border-surface-200 dark:border-surface-700"
    ]
  },
  meter: {
    class: [
      // Position and Overflow
      "overflow-hidden",
      "relative",
      // Shape and Size
      "border-0",
      "h-[10px]",
      "rounded-md",
      // Spacing
      "mb-3",
      // Colors
      "bg-surface-100 dark:bg-surface-700"
    ]
  },
  meterLabel: ({ instance: e }) => {
    var t, r, o;
    return {
      class: [
        // Size
        "h-full",
        // Colors
        {
          "bg-red-500 dark:bg-red-400/50": ((t = e == null ? void 0 : e.meter) == null ? void 0 : t.strength) == "weak",
          "bg-orange-500 dark:bg-orange-400/50": ((r = e == null ? void 0 : e.meter) == null ? void 0 : r.strength) == "medium",
          "bg-green-500 dark:bg-green-400/50": ((o = e == null ? void 0 : e.meter) == null ? void 0 : o.strength) == "strong"
        },
        // Transitions
        "transition-all duration-1000 ease-in-out"
      ]
    };
  },
  maskIcon: {
    class: [
      "absolute top-1/2 right-3 -mt-2 z-10",
      "text-surface-600 dark:text-white/70"
    ]
  },
  unmaskIcon: {
    class: [
      "absolute top-1/2 right-3 -mt-2 z-10",
      "text-surface-600 dark:text-white/70"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
}, ed = {
  root: "flex [&_[data-pc-name=pclist]]:h-full",
  sourceControls: {
    class: [
      // Flexbox & Alignment
      "flex xl:flex-col justify-center gap-2",
      // Spacing
      "p-[1.125rem]"
    ]
  },
  sourceListContainer: {
    class: [
      // Flexbox
      "grow shrink basis-2/4",
      // Shape
      "rounded-md",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-200 dark:border-surface-700",
      "outline-none"
    ]
  },
  transferControls: {
    class: [
      // Flexbox & Alignment
      "flex xl:flex-col justify-center gap-2",
      // Spacing
      "p-[1.125rem]"
    ]
  },
  targetListContainer: {
    class: [
      // Flexbox
      "grow shrink basis-2/4",
      // Shape
      "rounded-md",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-200 dark:border-surface-700",
      "outline-none"
    ]
  },
  targetControls: {
    class: [
      // Flexbox & Alignment
      "flex xl:flex-col justify-center gap-2",
      // Spacing
      "p-[1.125rem]"
    ]
  },
  transition: {
    enterFromClass: "!transition-none",
    enterActiveClass: "!transition-none",
    leaveActiveClass: "!transition-none",
    leaveToClass: "!transition-none"
  }
}, qs = {
  root: {
    class: [
      // Shape
      "rounded-md shadow-lg",
      // Position
      "absolute left-0 top-0 mt-3",
      '[&[data-p-popover-flipped="true"]]:mb-3 [&[data-p-popover-flipped="true"]]:-mt-3',
      "z-40 transform origin-center",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-surface-0/80",
      // Before: Arrow
      "before:absolute before:w-0 before:-top-3 before:h-0 before:border-transparent before:border-solid before:ml-[10px] before:border-x-[10px] before:border-b-[10px] before:border-t-0 before:border-b-surface-200 dark:before:border-b-surface-700",
      "after:absolute after:w-0 after:-top-[0.54rem] after:left-[4px] after:h-0 after:border-transparent after:border-solid after:ml-[8px] after:border-x-[8px] after:border-b-[8px] after:border-t-0 after:border-b-surface-0 dark:after:border-b-surface-900",
      // Flipped: Arrow
      '[&[data-p-popover-flipped="true"]]:before:-bottom-3 [&[data-p-popover-flipped="true"]]:before:top-auto [&[data-p-popover-flipped="true"]]:before:border-b-0 [&[data-p-popover-flipped="true"]]:before:border-t-[10px] [&[data-p-popover-flipped="true"]]:before:border-t-surface-200 dark:[&[data-p-popover-flipped="true"]]:before:border-t-surface-700',
      '[&[data-p-popover-flipped="true"]]:after:-bottom-[0.54rem] [&[data-p-popover-flipped="true"]]:after:top-auto [&[data-p-popover-flipped="true"]]:after:border-b-0 [&[data-p-popover-flipped="true"]]:after:border-t-[8px] [&[data-p-popover-flipped="true"]]:after:border-t-surface-0 dark:[&[data-p-popover-flipped="true"]]:after:border-t-surface-900',
      '[&[data-arrow-right="true"]]:before:!right-5 [&[data-arrow-right="true"]]:after:!right-[1.35rem] [&[data-arrow-right="true"]]:after:!left-auto'
    ]
  },
  content: {
    class: [
      "p-5 items-center flex",
      "rounded-lg",
      "border border-surface-200 dark:border-surface-700"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
}, td = {
  root: {
    class: [
      // Position and Overflow
      "overflow-hidden",
      "relative",
      // Shape and Size
      "border-0",
      "h-5",
      "rounded-md",
      // Colors
      "bg-surface-100 dark:bg-surface-800"
    ]
  },
  value: ({ props: e }) => ({
    class: [
      // Flexbox & Overflow & Position
      {
        "absolute flex items-center justify-center overflow-hidden": e.mode !== "indeterminate"
      },
      // Colors
      "bg-primary",
      // Spacing & Sizing
      "m-0",
      { "h-full w-0": e.mode !== "indeterminate" },
      // Shape
      "border-0",
      // Transitions
      {
        "transition-width duration-1000 ease-in-out": e.mode !== "indeterminate",
        "progressbar-value-animate": e.mode == "indeterminate"
      },
      // Before & After (indeterminate)
      {
        "before:absolute before:top-0 before:left-0 before:bottom-0 before:bg-inherit ": e.mode == "indeterminate",
        "after:absolute after:top-0 after:left-0 after:bottom-0 after:bg-inherit after:delay-1000": e.mode == "indeterminate"
      }
    ]
  }),
  label: {
    class: [
      //Font
      "text-xs font-semibold",
      // Flexbox
      "inline-flex",
      // Font and Text
      "text-white dark:text-surface-900",
      "leading-5"
    ]
  }
}, rd = {
  root: {
    class: [
      // Position
      "relative",
      "mx-auto",
      // Sizing
      "w-28",
      "h-28",
      // Flexbox
      "inline-block",
      // Pseudo-Elements
      "before:block",
      "before:pt-full"
    ]
  },
  spinner: {
    class: [
      // Position
      "absolute",
      "top-0",
      "bottom-0",
      "left-0",
      "right-0",
      "m-auto",
      // Sizing
      "w-full",
      "h-full",
      // Transformations
      "transform",
      "origin-center",
      // Animations
      "animate-spin"
    ]
  },
  circle: {
    class: [
      // Colors
      "text-red-500",
      // Misc
      "progress-spinner-circle"
    ]
  }
}, od = {
  root: {
    class: [
      "relative",
      // Flexbox & Alignment
      "inline-flex",
      "align-bottom",
      // Size
      "w-5 h-5",
      // Misc
      "cursor-pointer",
      "select-none"
    ]
  },
  box: ({ props: e, context: t }) => ({
    class: [
      // Flexbox
      "flex justify-center items-center",
      // Size
      "w-5 h-5",
      // Shape
      "border outline-transparent",
      "rounded-full",
      // Transition
      "transition duration-200 ease-in-out",
      // Colors
      {
        "text-surface-700 dark:text-white/80": t.checked,
        "border-surface-300 dark:border-surface-700": !t.checked && !e.invalid,
        "border-primary bg-primary": t.checked && !e.disabled
      },
      // Invalid State
      { "border-red-500 dark:border-red-400": e.invalid },
      // States
      {
        "peer-hover:border-surface-400 dark:peer-hover:border-surface-400": !e.disabled && !e.invalid && !t.checked,
        "peer-hover:border-primary-emphasis": !e.disabled && !t.checked,
        "peer-hover:[&>*:first-child]:bg-primary-600 dark:peer-hover:[&>*:first-child]:bg-primary-300": !e.disabled && !t.checked,
        "peer-focus-visible:ring-1 peer-focus-visible:ring-primary-500 dark:peer-focus-visible:ring-primary-400": !e.disabled,
        "bg-surface-200 [&>*:first-child]:bg-surface-600 dark:bg-surface-700 dark:[&>*:first-child]:bg-surface-400 border-surface-300 dark:border-surface-700 select-none pointer-events-none cursor-default": e.disabled
      }
    ]
  }),
  input: {
    class: [
      "peer",
      // Size
      "w-full ",
      "h-full",
      // Position
      "absolute",
      "top-0 left-0",
      "z-10",
      // Spacing
      "p-0",
      "m-0",
      // Shape
      "opacity-0",
      "rounded-md",
      "outline-none",
      "border-1 border-surface-200 dark:border-surface-700",
      // Misc
      "appearance-none",
      "cursor-pointer"
    ]
  },
  icon: ({ context: e }) => ({
    class: [
      "block",
      // Shape
      "rounded-full",
      // Size
      "w-3 h-3",
      // Conditions
      {
        "bg-surface-0 dark:bg-surface-900": e.checked,
        "bg-primary": !e.checked,
        "backface-hidden invisible scale-[0.1]": !e.checked,
        "transform visible translate-z-0 scale-[1,1]": e.checked
      },
      // Transition
      "transition duration-200"
    ]
  })
}, sd = {
  root: ({ props: e }) => ({
    class: [
      "relative",
      // Flex & Alignment
      "flex items-center",
      "gap-1",
      // Misc
      {
        "opacity-60 select-none pointer-events-none cursor-default": e.disabled
      }
    ]
  }),
  option: ({ props: e, context: t }) => ({
    class: [
      // Flex & Alignment
      "inline-flex items-center",
      // State
      {
        "outline-none ring-1 ring-primary-500/50 dark:ring-primary-500": t.focused
      },
      // Misc
      {
        "cursor-pointer": !e.readonly,
        "cursor-default": e.readonly
      }
    ]
  }),
  offIcon: ({ props: e }) => ({
    class: [
      // Size
      "w-4 h-4",
      // Color
      "text-surface-700 dark:text-surface-0/80",
      // State
      { "hover:text-primary-500 dark:hover:text-primary-400": !e.readonly },
      // Transition
      "transition duration-200 ease-in"
    ]
  }),
  onIcon: ({ props: e }) => ({
    class: [
      // Size
      "w-4 h-4",
      // Color
      "text-primary",
      // State
      { "hover:text-primary-600 dark:hover:text-primary-300": !e.readonly },
      // Transition
      "transition duration-200 ease-in"
    ]
  })
}, nd = {
  root: {
    class: [
      "block absolute bg-surface-200 dark:bg-surface-700 rounded-full pointer-events-none"
    ],
    style: "transform: scale(0)"
  }
}, ad = {
  root: {
    class: ["group"]
  },
  contentContainer: {
    class: [
      // Size & Position
      "h-full w-full",
      // Layering
      "z-[1]",
      // Spacing
      "overflow-hidden",
      // Misc
      "relative float-left"
    ]
  },
  content: {
    class: [
      // Size & Spacing
      "h-[calc(100%+18px)] w-[calc(100%+18px)] pr-[18px] pb-[18px] pl-0 pt-0",
      // Overflow & Scrollbar
      "overflow-scroll scrollbar-none",
      // Box Model
      "box-border",
      // Position
      "relative",
      // Webkit Specific
      "[&::-webkit-scrollbar]:hidden"
    ]
  },
  barX: {
    class: [
      // Size & Position
      "h-[9px] bottom-0",
      // Appearance
      "bg-surface-100 dark:bg-surface-800 rounded",
      "opacity-0",
      // Interactivity
      "cursor-pointer",
      "focus:outline-none",
      // Visibility & Layering
      "invisible z-20",
      // Transition
      "transition duration-[250ms] ease-linear",
      // Misc
      "relative",
      "group-hover:opacity-100"
    ]
  },
  barY: {
    class: [
      // Size & Position
      "w-[9px] top-0",
      // Appearance
      "bg-surface-100 dark:bg-surface-800 rounded",
      "opacity-0",
      // Interactivity
      "cursor-pointer",
      "focus:outline-none",
      // Visibility & Layering
      "z-20",
      // Transition
      "transition duration-[250ms] ease-linear",
      // Misc
      "relative",
      "group-hover:opacity-100"
    ]
  }
}, id = {
  button: ({ props: e }) => ({
    root: {
      class: [
        // Flex & Alignment
        "flex items-center justify-center",
        // Positioning
        {
          "!sticky flex ml-auto": e.target === "parent",
          "!fixed": e.target === "window"
        },
        "bottom-[20px] right-[20px]",
        "h-10 w-10 rounded-full shadow-md",
        "text-white dark:text-surface-900 bg-surface-600 dark:bg-surface-700",
        "hover:bg-surface-600 dark:hover:bg-surface-300"
      ]
    }
  }),
  transition: {
    enterFromClass: "opacity-0",
    enterActiveClass: "transition-opacity duration-150",
    leaveActiveClass: "transition-opacity duration-150",
    leaveToClass: "opacity-0"
  }
}, Ys = {
  root: ({ props: e, state: t, parent: r }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "relative",
      // Shape
      { "rounded-md": r.instance.$name !== "InputGroup" },
      {
        "first:rounded-l-md rounded-none last:rounded-r-md": r.instance.$name == "InputGroup"
      },
      {
        "border-0 border-y border-l last:border-r": r.instance.$name == "InputGroup"
      },
      {
        "first:ml-0 ml-[-1px]": r.instance.$name == "InputGroup" && !e.showButtons
      },
      // Color and Background
      { "bg-surface-0 dark:bg-surface-950": !e.disabled },
      "border",
      { "dark:border-surface-600": r.instance.$name != "InputGroup" },
      { "dark:border-surface-600": r.instance.$name == "InputGroup" },
      { "border-surface-300 dark:border-surface-600": !e.invalid },
      // Invalid State
      "invalid:focus:ring-red-200",
      "invalid:hover:border-red-500",
      { "border-red-500 dark:border-red-400": e.invalid },
      // Transitions
      "transition-all",
      "duration-200",
      // States
      { "hover:border-secondary-400": !e.invalid },
      // Misc
      "cursor-pointer",
      "select-none",
      {
        "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": e.disabled
      }
    ]
  }),
  label: ({ props: e, parent: t }) => {
    var r;
    return {
      class: [
        //Font
        "leading-[normal]",
        // Display
        "block",
        "flex-auto",
        // Color and Background
        "bg-transparent",
        "border-0",
        {
          "text-surface-800 dark:text-white/80": e.modelValue != null,
          "text-surface-400 dark:text-surface-500": e.modelValue == null
        },
        "placeholder:text-surface-400 dark:placeholder:text-surface-500",
        // Sizing and Spacing
        "w-[1%]",
        "py-2 pl-3",
        { "pr-7": e.showClear },
        //Shape
        "rounded-none",
        // Transitions
        "transition",
        "duration-200",
        // States
        "focus:outline-none focus:shadow-none",
        // Filled State *for FloatLabel
        {
          filled: ((r = t.instance) == null ? void 0 : r.$name) == "FloatLabel" && e.modelValue !== null
        },
        // Misc
        "relative",
        "cursor-pointer",
        "overflow-hidden overflow-ellipsis",
        "whitespace-nowrap",
        "appearance-none"
      ]
    };
  },
  dropdown: {
    class: [
      // Flexbox
      "flex items-center justify-center",
      "shrink-0",
      // Color and Background
      "bg-transparent",
      "text-surface-300",
      // Size
      "pl-1 pr-3",
      // Shape
      "rounded-r-md"
    ]
  },
  overlay: {
    class: [
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-white/80",
      // Shape
      "border border-surface-300 dark:border-surface-700",
      "rounded-md",
      "shadow-md"
    ]
  },
  listContainer: {
    class: [
      // Sizing
      "max-h-[200px]",
      // Misc
      "overflow-auto"
    ]
  },
  list: {
    class: "m-0 p-1 list-none gap-[2px] flex flex-col"
  },
  option: ({ context: e }) => ({
    class: [
      "relative",
      "flex items-center",
      // Font
      "leading-none",
      // Spacing
      "m-0 px-3 py-2",
      "first:mt-0 mt-[2px]",
      // Shape
      "border-0 rounded",
      // Colors
      {
        "bg-surface-200 dark:bg-surface-600/60": e.focused && !e.selected,
        "text-surface-700 dark:text-white/80": e.focused && !e.selected,
        "bg-highlight": e.selected,
        "bg-highlight-emphasis": e.focused && e.selected
      },
      // Transition
      "transition-colors duration-200",
      // Misc
      "cursor-pointer font-normal overflow-hidden whitespace-nowrap"
    ]
  }),
  optionGroup: {
    class: [
      "font-semibold",
      // Spacing
      "m-0 py-2 px-3",
      // Colors
      "text-surface-400 dark:text-surface-500",
      // Misc
      "cursor-auto"
    ]
  },
  optionCheckIcon: "relative -ms-1.5 me-1.5 text-surface-700 dark:text-white/80 w-4 h-4",
  optionBlankIcon: "w-4 h-4",
  emptyMessage: {
    class: [
      // Font
      "leading-none",
      // Spacing
      "py-2 px-3",
      // Color
      "text-surface-800 dark:text-white/80",
      "bg-transparent"
    ]
  },
  header: {
    class: [
      // Spacing
      "pt-2 px-2 pb-0",
      "m-0",
      //Shape
      "border-b-0",
      "rounded-tl-md",
      "rounded-tr-md",
      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-900",
      "border-surface-300 dark:border-surface-700",
      // Filter
      "[&_[data-pc-name=pcfilter]]:w-full"
    ]
  },
  clearIcon: {
    class: [
      // Color
      "text-surface-400 dark:text-surface-500",
      // Position
      "absolute",
      "top-1/2",
      "right-12",
      // Spacing
      "-mt-2"
    ]
  },
  loadingIcon: {
    class: "text-surface-400 dark:text-surface-500 animate-spin"
  }
}, ld = {
  root: ({ props: e }) => ({
    class: [
      "inline-flex select-none align-bottom outline-transparent",
      "border rounded-md [&>button]:rounded-none [&>button]:border-none",
      "[&>button:first-child]:border-r-none [&>button:first-child]:rounded-r-none [&>button:first-child]:rounded-tl-md [&>button:first-child]:rounded-bl-md",
      "[&>button:last-child]:border-l-none [&>button:first-child]:rounded-l-none [&>button:last-child]:rounded-tr-md [&>button:last-child]:rounded-br-md",
      // Invalid State
      {
        "border-red-500 dark:border-red-400": e.invalid,
        "border-transparent": !e.invalid
      }
    ]
  })
}, cd = {
  root: ({ props: e }) => ({
    class: [
      "overflow-hidden",
      {
        "animate-pulse": e.animation !== "none"
      },
      // Round
      {
        "rounded-full": e.shape === "circle",
        "rounded-md": e.shape !== "circle"
      },
      // Colors
      "bg-surface-200 dark:bg-surface-700"
    ]
  })
}, ud = {
  root: ({ props: e }) => ({
    class: [
      "relative",
      // Size
      {
        "h-[3px]": e.orientation == "horizontal",
        "w-[3px]": e.orientation == "vertical"
      },
      // Shape
      "border-0",
      "rounded-md",
      // Colors
      "bg-surface-200 dark:bg-surface-800",
      // States
      {
        "opacity-60 select-none pointer-events-none cursor-default": e.disabled
      }
    ]
  }),
  range: ({ props: e }) => ({
    class: [
      // Position
      "block absolute",
      {
        "top-0 left-0": e.orientation == "horizontal",
        "bottom-0 left-0": e.orientation == "vertical"
      },
      //Size
      {
        "h-full": e.orientation == "horizontal",
        "w-full": e.orientation == "vertical"
      },
      // Shape
      "rounded-md",
      // Colors
      "bg-secondary-400"
    ]
  }),
  handle: ({ props: e }) => ({
    class: [
      "flex items-center justify-center",
      // Size
      "h-[20px]",
      "w-[20px]",
      {
        "top-[50%] -mt-[10px] -ml-[10px]": e.orientation == "horizontal",
        "left-[50%] -mb-[10px] -ml-[10px]": e.orientation == "vertical"
      },
      // Shape
      "rounded-full",
      "before:block before:w-[16px] before:h-[16px] before:rounded-full before:bg-surface-0 dark:before:bg-surface-950 before:shadow-md",
      // Colors
      "bg-surface-200 dark:bg-surface-800",
      // States
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-1",
      "ring-secondary-400 dark:ring-secondary-400",
      // Transitions
      "transition duration-200",
      // Misc
      "cursor-grab",
      "touch-action-none"
    ]
  }),
  startHandler: ({ props: e }) => ({
    class: [
      "flex items-center justify-center",
      // Size
      "h-[20px]",
      "w-[20px]",
      {
        "top-[50%] -mt-[10px] -ml-[10px]": e.orientation == "horizontal",
        "left-[50%] -mb-[10px] -ml-[10px]": e.orientation == "vertical"
      },
      // Shape
      "rounded-full",
      "before:block before:w-[16px] before:h-[16px] before:rounded-full before:bg-surface-0 dark:before:bg-surface-950 before:shadow-md",
      // Colors
      "bg-surface-200 dark:bg-surface-800",
      // States
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-1",
      "ring-secondary-400 dark:ring-secondary-400",
      // Transitions
      "transition duration-200",
      // Misc
      "cursor-grab",
      "touch-action-none"
    ]
  }),
  endHandler: ({ props: e }) => ({
    class: [
      "flex items-center justify-center",
      // Size
      "h-[20px]",
      "w-[20px]",
      {
        "top-[50%] -mt-[10px] -ml-[10px]": e.orientation == "horizontal",
        "left-[50%] -mb-[10px] -ml-[10px]": e.orientation == "vertical"
      },
      // Shape
      "rounded-full",
      "before:block before:w-[16px] before:h-[16px] before:rounded-full before:bg-surface-0 dark:before:bg-surface-950 before:shadow-md",
      // Colors
      "bg-surface-200 dark:bg-surface-800",
      // States
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-1",
      "ring-secondary-400 dark:ring-secondary-400",
      // Transitions
      "transition duration-200",
      // Misc
      "cursor-grab",
      "touch-action-none"
    ]
  })
}, dd = {
  root: ({ state: e }) => ({
    class: [
      "static flex gap-2",
      {
        "[&_[data-pc-name=pcbutton]]:rotate-45": e.d_visible,
        "[&_[data-pc-name=pcbutton]]:rotate-0": !e.d_visible
      }
    ]
  }),
  list: {
    class: [
      // Spacing
      "m-0 p-0",
      // Layout & Flexbox
      "list-none flex items-center justify-center",
      // Transitions
      "transition delay-200",
      // Z-Index (Positioning)
      "z-20"
    ]
  },
  item: ({ props: e, context: t }) => ({
    class: [
      "transform transition-transform duration-200 ease-out transition-opacity duration-800",
      // Conditional Appearance
      t.hidden ? "opacity-0 scale-0" : "opacity-100 scale-100",
      // Conditional Spacing
      {
        "my-1 first:mb-2": e.direction == "up" && e.type == "linear",
        "my-1 first:mt-2": e.direction == "down" && e.type == "linear",
        "mx-1 first:mr-2": e.direction == "left" && e.type == "linear",
        "mx-1 first:ml-2": e.direction == "right" && e.type == "linear"
      },
      // Conditional Positioning
      { absolute: e.type !== "linear" }
    ]
  }),
  mask: ({ state: e }) => ({
    class: [
      // Base Styles
      "absolute left-0 top-0 w-full h-full transition-opacity duration-250 ease-in-out bg-black/40 z-0",
      // Conditional Appearance
      {
        "opacity-0 pointer-events-none": !e.d_visible,
        "opacity-100 transition-opacity duration-400 ease-in-out": e.d_visible
      }
    ]
  })
}, fd = {
  root: ({ props: e }) => ({
    class: [
      // Flexbox and Position
      "inline-flex",
      "relative",
      // Shape
      "rounded-md",
      { "shadow-lg": e.raised },
      "[&>[data-pc-name=pcbutton]]:rounded-tr-none",
      "[&>[data-pc-name=pcbutton]]:rounded-br-none",
      "[&>[data-pc-name=pcdropdown]]:rounded-tl-none",
      "[&>[data-pc-name=pcdropdown]]:rounded-bl-none",
      "[&>[data-pc-name=pcmenu]]:min-w-full"
    ]
  })
}, pd = {
  root: ({ context: e }) => ({
    class: [
      // Colors
      "bg-transparent",
      "text-surface-700",
      "dark:text-surface-0/80",
      // Shape
      "rounded-md",
      // Nested
      { "flex grow border-0": e.nested }
    ]
  }),
  gutter: ({ props: e }) => ({
    class: [
      // Flexbox
      "flex",
      "items-center",
      "justify-center",
      "shrink-0",
      // Colors
      "bg-transparent",
      "dark:bg-transparent",
      // Transitions
      "transition-all",
      "duration-200",
      // Misc
      {
        "cursor-col-resize": e.layout == "horizontal",
        "cursor-row-resize": e.layout !== "horizontal"
      }
    ]
  }),
  gutterhandle: ({ props: e }) => ({
    class: [
      "z-20",
      // Colors
      "bg-surface-700",
      // Shape
      "rounded-md",
      //States
      "focus:outline-none focus:outline-offset-0 focus-visible:ring-1 focus-visible:ring-primary-400 dark:focus-visible:ring-primary-300",
      // Transitions
      "transition-all",
      "duration-200",
      "m-[1px]",
      // Sizing (Conditional)
      {
        "!w-[2px] !h-10": e.layout == "horizontal",
        "!h-[2px] !w-10": e.layout !== "horizontal"
      }
    ]
  })
}, bd = {
  root: ({ context: e }) => ({
    class: ["grow", { flex: e.nested }]
  })
}, gd = {
  root: ({ context: e }) => ({
    class: [
      "relative flex flex-auto items-center gap-2 p-2 last-of-type:flex-[initial]",
      {
        "cursor-default pointer-events-none select-none opacity-60": e.disabled
      },
      "[&_[data-pc-section=separator]]:has-[~[data-p-active=true]]:bg-secondary-400"
    ]
  }),
  header: ({ props: e, context: t }) => ({
    class: [
      "inline-flex items-center border-0 cursor-pointer rounded-md outline-transparent bg-transparent p-0 gap-2",
      "focus:outline-none focus:outline-offset-0 focus-visible:ring-1 ring-inset focus-visible:ring-secondary-400 dark:focus-visible:ring-secondary-300",
      { "!cursor-default": t.active },
      { "cursor-auto": e.linear }
    ]
  }),
  number: ({ context: e }) => ({
    class: [
      // Flexbox
      "flex",
      "items-center",
      "justify-center",
      //Colors
      "border-solid border-2 border-surface-200 dark:border-surface-700",
      // Colors (Conditional)
      e.active ? "text-secondary-400" : "text-surface-900 dark:text-surface-0",
      // Adjust colors as needed
      // Size and Shape
      "min-w-[2rem]",
      "h-[2rem]",
      "line-height-[2rem]",
      "rounded-full",
      // Text
      "text-lg",
      // Transitions
      "transition",
      "transition-colors",
      "transition-shadow",
      "duration-200"
    ]
  }),
  title: ({ context: e }) => ({
    class: [
      // Layout
      "block",
      "whitespace-nowrap",
      "overflow-hidden",
      "text-ellipsis",
      "max-w-full",
      // Text
      e.active ? "text-secondary-400" : "text-surface-700 dark:text-surface-0/80",
      "font-medium",
      // Transitions
      "transition",
      "transition-colors",
      "transition-shadow",
      "duration-200"
    ]
  })
}, hd = {
  root: ({ state: e }) => ({
    class: [
      "flex flex-col flex-[initial] has-[[data-pc-name=steppanels]]:px-2 has-[[data-pc-name=steppanels]]:pt-3.5 has-[[data-pc-name=steppanels]]:pb-[1.125rem]",
      { "flex-auto": e.isActive },
      "[&>[data-pc-name=step]]:flex-[initial]",
      "[&>[data-pc-name=steppanel]]:flex [&>[data-pc-name=steppanel]]:flex-auto [&>[data-pc-name=steppanel]>[data-pc-section=content]]:w-full [&>[data-pc-name=steppanel]>[data-pc-section=content]]:pl-4 [&:last-child>[data-pc-name=steppanel]>[data-pc-section=content]]:ps-8",
      "[&>[data-pc-name=steppanel]>[data-pc-section=separator]]:relative [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:!flex-initial [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:shrink-0 [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:w-[2px] [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:h-auto [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:m-2 [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:left-[-2px] [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:ml-[1.625rem]"
    ]
  })
}, md = {
  root: "relative flex justify-between items-center m-0 p-0 list-none overflow-x-auto"
}, xd = {
  root: "px-2 pt-3.5 pb-[1.125rem]"
}, vd = {
  root: "has-[[data-pc-name=stepitem]]:flex has-[[data-pc-name=stepitem]]:flex-col",
  separator: "flex-1 w-full h-[2px] bg-surface-200 dark:bg-surface-700 transition-shadow duration-200",
  transition: {
    class: [
      "flex flex-1",
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-900 dark:text-surface-0"
    ],
    enterFromClass: "max-h-0",
    enterActiveClass: "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
    enterToClass: "max-h-[1000px]",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass: "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
    leaveToClass: "max-h-0"
  }
}, yd = {
  root: {
    class: "relative"
  },
  menu: {
    class: "p-0 m-0 list-none flex"
  },
  menuitem: {
    class: [
      // Flexbox and Position
      "relative",
      "flex",
      "justify-center",
      "flex-1",
      "overflow-hidden",
      // Before
      "before:border-t-2",
      "before:border-surface-200",
      "before:dark:border-surface-700",
      "before:w-full",
      "[&:first-child]:before:w-[calc(50%+1rem)]",
      "[&:last-child]:before:w-1/2",
      "before:absolute",
      "before:top-1/2",
      "before:left-0",
      "before:transform",
      "before:mt-[calc(-1rem+1px)]",
      "[&:first-child]:before:translate-x-[100%]"
    ]
  },
  action: ({ props: e }) => ({
    class: [
      // Flexbox
      "inline-flex items-center",
      "flex-col",
      // Transitions and Shape
      "transition-shadow",
      "rounded-md",
      // Colors
      "bg-surface-0",
      "dark:bg-transparent",
      // States
      "focus:outline-none focus:outline-offset-0 focus:ring",
      "focus:ring-primary-500 dark:focus:ring-primary-400",
      // Misc
      "overflow-hidden",
      { "cursor-pointer": !e.readonly }
    ]
  }),
  step: ({ context: e, props: t }) => ({
    class: [
      // Flexbox
      "flex items-center justify-center",
      // Position
      "z-20",
      // Shape
      "rounded-full",
      "border-2",
      // Size
      "w-8",
      "h-8",
      "text-sm",
      "leading-[2rem]",
      "font-medium",
      // Colors
      "bg-surface-0 dark:bg-surface-800",
      "border-surface-100 dark:border-surface-700",
      {
        "text-surface-400 dark:text-white/60": !e.active,
        "text-primary": e.active
      },
      // States
      {
        "hover:border-surface-300 dark:hover:border-surface-500": !e.active && !t.readonly
      },
      // Transition
      "transition-colors duration-200 ease-in-out"
    ]
  }),
  label: ({ context: e }) => ({
    class: [
      // Font
      "leading-[normal]",
      "font-medium",
      // Display
      "block",
      // Spacing
      "mt-2",
      // Colors
      {
        "text-surface-700 dark:text-white/70": !e.active,
        "text-primary": e.active
      },
      // Text and Overflow
      "whitespace-nowrap",
      "overflow-hidden",
      "overflow-ellipsis",
      "max-w-full"
    ]
  })
}, kd = {
  root: ({ props: e, context: t }) => ({
    class: [
      "relative shrink-0",
      // Shape
      "border-b",
      "rounded-t-md",
      // Spacing
      "py-4 px-[1.125rem]",
      "-mb-px",
      // Colors and Conditions
      "outline-transparent",
      {
        "border-surface-200 dark:border-secondary-400": t.active,
        "border-surface-200 dark:border-transparent": !t.active,
        "text-surface-700 dark:text-surface-0/80": !t.active,
        "bg-surface-0 dark:bg-transparent": t.active,
        "text-secondary-400": t.active,
        "opacity-60 cursor-default user-select-none select-none pointer-events-none": e == null ? void 0 : e.disabled
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus-visible:ring-1 ring-inset focus-visible:ring-primary-400 dark:focus-visible:ring-secondary-400",
      // Transitions
      "transition-all duration-200",
      // Misc
      "cursor-pointer select-none whitespace-nowrap",
      "user-select-none"
    ]
  })
}, wd = {
  root: "relative flex",
  content: "overflow-x-auto overflow-y-hidden scroll-smooth overscroll-x-contain overscroll-y-auto [&::-webkit-scrollbar]:hidden grow dark:bg-surface-800",
  tabList: "relative flex border-solid border-b border-surface-200 dark:border-surface-900",
  nextButton: "!absolute top-0 right-0 z-20 h-full w-10 flex items-center justify-center text-surface-700 dark:text-surface-0/80 bg-surface-0 dark:bg-surface-800 outline-transparent cursor-pointer shrink-0",
  prevButton: "!absolute top-0 left-0 z-20 h-full w-10 flex items-center justify-center text-surface-700 dark:text-surface-0/80 bg-surface-0 dark:bg-surface-800 outline-transparent cursor-pointer shrink-0",
  activeBar: "z-10 block absolute h-[1px] bottom-[-1px] bg-primary-400"
}, _d = {
  root: {
    class: "overflow-x-auto"
  },
  menu: {
    class: [
      // Flexbox
      "flex flex-1",
      // Spacing
      "list-none",
      "p-0 m-0",
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "border-b-2 border-surface-200 dark:border-surface-700",
      "text-surface-900 dark:text-surface-0/80"
    ]
  },
  menuitem: {
    class: "mr-0"
  },
  action: ({ context: e, state: t }) => ({
    class: [
      "relative",
      // Font
      "font-semibold leading-none",
      // Flexbox and Alignment
      "flex items-center",
      // Spacing
      "py-4 px-[1.125rem]",
      "-mb-px",
      // Shape
      "border-b",
      "rounded-t-md",
      // Colors and Conditions
      {
        "border-surface-200 dark:border-surface-700": t.d_activeIndex !== e.index,
        "text-surface-700 dark:text-surface-0/80": t.d_activeIndex !== e.index,
        "bg-surface-0 dark:bg-surface-900": t.d_activeIndex === e.index,
        "border-primary": t.d_activeIndex === e.index,
        "text-primary": t.d_activeIndex === e.index
      },
      // States
      "focus:outline-none focus:outline-offset-0 focus-visible:ring-1 ring-inset focus-visible:ring-primary-400 dark:focus-visible:ring-primary-300",
      {
        "hover:text-surface-900 dark:hover:text-surface-0": t.d_activeIndex !== e.index
      },
      // Transitions
      "transition-all duration-200",
      // Misc
      "cursor-pointer select-none text-decoration-none",
      "overflow-hidden",
      "user-select-none"
    ]
  }),
  icon: {
    class: "mr-2"
  }
}, Sd = {
  root: "focus:outline-none focus:outline-offset-0 focus-visible:ring-1 ring-inset focus-visible:ring-primary-400 dark:focus-visible:ring-primary-300"
}, Cd = {
  root: "bg-surface-0 dark:bg-surface-800 text-surface-900 dark:text-surface-0/80 outline-0 p-[1.125rem] pt-[0.875rem]"
}, Td = {
  root: ({ props: e }) => ({
    class: [
      "flex flex-col",
      { "[&>[data-pc-name=tablist]]:overflow-hidden": e.scrollable }
    ]
  })
}, Pd = {
  // For PrimeVue version 3
  navContainer: ({ props: e }) => ({
    class: [
      // Position
      "relative",
      // Misc
      { "overflow-hidden": e.scrollable }
    ]
  }),
  navContent: ({ instance: e }) => ({
    class: [
      // Overflow and Scrolling
      "overflow-y-hidden overscroll-contain",
      "overscroll-auto",
      "scroll-smooth",
      "[&::-webkit-scrollbar]:hidden"
    ]
  }),
  previousButton: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      // Position
      "!absolute",
      "top-0 left-0",
      "z-20",
      // Size and Shape
      "h-full w-10",
      "rounded-none",
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-surface-0/80",
      "shadow-sm"
    ]
  },
  nextButton: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-center",
      // Position
      "!absolute",
      "top-0 right-0",
      "z-20",
      // Size and Shape
      "h-full w-10",
      "rounded-none",
      // Colors
      "text-surface-700 dark:text-surface-0/80",
      "bg-surface-0 dark:bg-surface-900",
      "shadow-sm"
    ]
  },
  nav: {
    class: [
      // Flexbox
      "flex flex-1",
      // Spacing
      "list-none",
      "p-0 m-0",
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "border-b border-surface-200 dark:border-surface-700",
      "text-surface-900 dark:text-surface-0/80"
    ]
  },
  tabpanel: {
    header: ({ props: e }) => ({
      class: [
        // Spacing
        "mr-0",
        // Misc
        "outline-none",
        {
          "opacity-60 cursor-default user-select-none select-none pointer-events-none": e == null ? void 0 : e.disabled
        }
      ]
    }),
    headerAction: ({ parent: e, context: t }) => ({
      class: [
        "relative",
        // Font
        "font-semibold",
        // Flexbox and Alignment
        "flex items-center",
        // Spacing
        "py-4 px-[1.125rem]",
        "-mb-px",
        // Shape
        "border-b-2",
        "rounded-t-md",
        // Colors and Conditions
        {
          "border-surface-200 dark:border-surface-700": e.state.d_activeIndex !== t.index,
          "text-surface-700 dark:text-surface-0/80": e.state.d_activeIndex !== t.index,
          "bg-surface-0 dark:bg-surface-900": e.state.d_activeIndex === t.index,
          "border-primary": e.state.d_activeIndex === t.index,
          "text-primary": e.state.d_activeIndex === t.index
        },
        // States
        "focus:outline-none focus:outline-offset-0 focus-visible:ring-1 ring-inset focus-visible:ring-primary-400 dark:focus-visible:ring-primary-300",
        {
          "hover:bg-surface-0 dark:hover:bg-surface-800/80": e.state.d_activeIndex !== t.index,
          "hover:text-surface-900 dark:hover:text-surface-0": e.state.d_activeIndex !== t.index
        },
        // Transitions
        "transition-all duration-200",
        // Misc
        "cursor-pointer select-none text-decoration-none",
        "overflow-hidden",
        "user-select-none"
      ]
    }),
    headerTitle: {
      class: [
        // Text
        "leading-none",
        "whitespace-nowrap"
      ]
    }
  },
  panelcontainer: {
    class: [
      // Spacing
      "p-[1.125rem] pt-[0.875rem]",
      // Shape
      "border-0 rounded-none",
      "border-br-md border-bl-md",
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-900 dark:text-surface-0/80"
    ]
  }
}, jd = {
  root: ({ props: e }) => ({
    class: [
      //Font
      "text-xs font-bold",
      //Alignments
      "inline-flex items-center justify-center",
      //Spacing
      "px-[0.4rem] py-1",
      //Shape
      {
        "rounded-md": !e.rounded,
        "rounded-full": e.rounded
      },
      //Colors
      {
        "bg-highlight": e.severity === null || e.severity === "primary",
        "text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-500/20": e.severity === "success",
        "text-surface-700 dark:text-surface-300 bg-surface-100 dark:bg-surface-500/20": e.severity === "secondary",
        "text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-500/20": e.severity === "info",
        "text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-500/20": e.severity === "warn",
        "text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-500/20": e.severity === "danger",
        "text-surface-0 dark:text-surface-900 bg-surface-900 dark:bg-surface-0": e.severity === "contrast"
      }
    ]
  }),
  value: {
    class: "leading-normal"
  },
  icon: {
    class: "mr-1 text-sm"
  }
}, Ad = {
  root: {
    class: [
      // Spacing
      "py-2 px-3",
      // Shape
      "rounded-md",
      // Color
      "bg-surface-0 dark:bg-surface-950 text-surface-700 dark:text-surface-0",
      "border border-surface-200 dark:border-surface-700",
      // Sizing & Overflow
      "h-72 overflow-auto"
    ]
  },
  container: {
    class: [
      // Flexbox
      "flex items-center"
    ]
  },
  prompt: {
    class: [
      // Color
      "text-surface-700 dark:text-surface-0"
    ]
  },
  response: {
    class: [
      // Color
      "text-surface-700 dark:text-surface-0"
    ]
  },
  command: {
    class: [
      // Color
      "text-surface-700 dark:text-surface-0"
    ]
  },
  commandtext: {
    class: [
      // Flexbox
      "flex-1 shrink grow-0",
      // Shape
      "border-0",
      // Spacing
      "p-0",
      // Color
      "bg-transparent text-inherit",
      // Outline
      "outline-none"
    ]
  }
}, $d = {
  root: ({ context: e, props: t, parent: r }) => {
    var o, s;
    return {
      class: [
        // Font
        "leading-none",
        // Spacing
        "m-0",
        "py-2 px-3",
        // Shape
        "rounded-md",
        // Colors
        "text-surface-800 dark:text-white/80",
        "placeholder:text-surface-400 dark:placeholder:text-surface-500",
        { "bg-surface-0 dark:bg-surface-950": !e.disabled },
        "border",
        { "border-surface-300 dark:border-surface-600": !t.invalid },
        // Invalid State
        "invalid:focus:ring-danger-400",
        "invalid:hover:border-danger-400",
        { "border-danger-400 dark:border-danger-400": t.invalid },
        // States
        {
          "hover:border-surface-400 dark:hover:border-surface-600": !e.disabled && !t.invalid,
          "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-secondary-500 dark:focus:ring-secondary-400 focus:z-10": !e.disabled,
          "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": e.disabled
        },
        // Filled State *for FloatLabel
        {
          filled: ((o = r.instance) == null ? void 0 : o.$name) == "FloatLabel" && t.modelValue !== null && ((s = t.modelValue) == null ? void 0 : s.length) !== 0
        },
        // Misc
        "appearance-none",
        "transition-colors duration-200"
      ]
    };
  }
}, Od = {
  root: {
    class: [
      // Shape
      "rounded-md",
      // Size
      "min-w-[12rem]",
      "p-1",
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-200 dark:border-surface-700"
    ]
  },
  rootList: {
    class: [
      // Spacings and Shape
      "list-none",
      "flex flex-col",
      "m-0 p-0",
      "outline-none"
    ]
  },
  item: {
    class: "relative my-[2px] [&:first-child]:mt-0"
  },
  itemContent: ({ context: e }) => ({
    class: [
      //Shape
      "rounded-[4px]",
      // Colors
      {
        "text-surface-500 dark:text-white/70": !e.focused && !e.active,
        "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-surface-600/90": e.focused && !e.active,
        "bg-highlight text-highlight-contrast": e.focused && e.active || e.active || !e.focused && e.active
      },
      // Transitions
      "transition-shadow",
      "duration-200",
      // States
      {
        "hover:bg-surface-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !e.active,
        "hover:bg-highlight-emphasis": e.active
      },
      // Disabled
      { "opacity-60 pointer-events-none cursor-default": e.disabled }
    ]
  }),
  itemLink: {
    class: [
      "relative",
      // Flexbox
      "flex",
      "items-center",
      // Spacing
      "py-2",
      "px-3",
      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none"
    ]
  },
  itemIcon: {
    class: [
      // Spacing
      "mr-2"
    ]
  },
  itemLabel: {
    class: ["leading-none"]
  },
  submenuIcon: {
    class: [
      // Position
      "ml-auto"
    ]
  },
  submenu: {
    class: [
      // Spacing
      "flex flex-col",
      "m-0",
      "p-1",
      "list-none",
      "min-w-[12.5rem]",
      // Shape
      "shadow-none sm:shadow-md",
      "border border-surface-200 dark:border-surface-700",
      // Position
      "static sm:absolute",
      "z-10",
      // Color
      "bg-surface-0 dark:bg-surface-900"
    ]
  },
  separator: {
    class: "border-t border-surface-200 dark:border-surface-600"
  },
  transition: {
    enterFromClass: "opacity-0",
    enterActiveClass: "transition-opacity duration-250"
  }
}, Id = {
  root: ({ props: e }) => ({
    class: [
      "flex grow",
      {
        "flex-col": e.layout === "vertical",
        "flex-row": e.layout === "horizontal"
      }
    ]
  }),
  event: ({ props: e, context: t }) => ({
    class: [
      "flex relative min-h-[70px]",
      {
        "flex-row-reverse": e.align === "right" || e.layout === "vertical" && e.align === "alternate" && t.index % 2 === 1,
        "flex-col [&:not(:last-child)]:flex-1": e.layout === "horizontal",
        "flex-col-reverse ": e.align === "bottom" || e.layout === "horizontal" && e.align === "alternate" && t.index % 2 === 1
      }
    ]
  }),
  eventOpposite: ({ props: e, context: t }) => ({
    class: [
      "flex-1",
      {
        "px-4": e.layout === "vertical",
        "py-4": e.layout === "horizontal"
      },
      {
        "text-right": e.align === "left" || e.layout === "vertical" && e.align === "alternate" && t.index % 2 === 0,
        "text-left": e.align === "right" || e.layout === "vertical" && e.align === "alternate" && t.index % 2 === 1
      }
    ]
  }),
  eventSeparator: ({ props: e }) => ({
    class: [
      "flex items-center flex-initial",
      {
        "flex-col": e.layout === "vertical",
        "flex-row": e.layout === "horizontal"
      }
    ]
  }),
  eventMarker: {
    class: [
      "relative",
      // Display & Flexbox
      "inline-flex items-center justify-center",
      // Size
      "w-[1.125rem] h-[1.125rem]",
      // Appearance
      "rounded-full border-2 border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-950",
      // Before
      "before:rounded-full before:w-[0.375rem] before:h-[0.375rem] before:bg-primary",
      // After
      "after:absolute after:rounded-full after:w-full after:h-full after:shadow-sm"
    ]
  },
  eventConnector: ({ props: e }) => ({
    class: [
      "grow bg-surface-300 dark:bg-surface-700",
      {
        "w-[2px]": e.layout === "vertical",
        "w-full h-[2px]": e.layout === "horizontal"
      }
    ]
  }),
  eventContent: ({ props: e, context: t }) => ({
    class: [
      "flex-1",
      {
        "px-4": e.layout === "vertical",
        "py-4": e.layout === "horizontal"
      },
      {
        "text-left": e.align === "left" || e.layout === "vertical" && e.align === "alternate" && t.index % 2 === 0,
        "text-right": e.align === "right" || e.layout === "vertical" && e.align === "alternate" && t.index % 2 === 1
      },
      {
        "min-h-0": e.layout === "vertical" && t.index === t.count - 1,
        "grow-0": e.layout === "horizontal" && t.index === t.count - 1
      }
    ]
  })
}, Ed = {
  root: ({ props: e }) => ({
    class: [
      //Size and Shape
      "w-96 rounded-md",
      // Positioning
      {
        "-translate-x-2/4": e.position == "top-center" || e.position == "bottom-center"
      }
    ]
  }),
  message: ({ props: e }) => ({
    class: [
      "mb-4 rounded-md w-full",
      "border border-transparent",
      "backdrop-blur-[10px] shadow-md",
      // Colors
      {
        "bg-blue-50/90 dark:bg-blue-500/20": e.message.severity == "info",
        "bg-green-50/90 dark:bg-green-500/20": e.message.severity == "success",
        "bg-surface-50 dark:bg-surface-800": e.message.severity == "secondary",
        "bg-orange-50/90 dark:bg-orange-500/20": e.message.severity == "warn",
        "bg-red-50/90 dark:bg-red-500/20": e.message.severity == "error",
        "bg-surface-950 dark:bg-surface-0": e.message.severity == "contrast"
      },
      {
        "border-blue-200 dark:border-blue-500/20": e.message.severity == "info",
        "border-green-200 dark:border-green-500/20": e.message.severity == "success",
        "border-surface-300 dark:border-surface-500/20": e.message.severity == "secondary",
        "border-orange-200 dark:border-orange-500/20": e.message.severity == "warn",
        "border-red-200 dark:border-red-500/20": e.message.severity == "error",
        "border-surface-950 dark:border-surface-0": e.message.severity == "contrast"
      },
      {
        "text-blue-700 dark:text-blue-300": e.message.severity == "info",
        "text-green-700 dark:text-green-300": e.message.severity == "success",
        "text-surface-700 dark:text-surface-300": e.message.severity == "secondary",
        "text-orange-700 dark:text-orange-300": e.message.severity == "warn",
        "text-red-700 dark:text-red-300": e.message.severity == "error",
        "text-surface-0 dark:text-surface-950": e.message.severity == "contrast"
      }
    ]
  }),
  messageContent: ({ props: e }) => ({
    class: [
      "flex p-3",
      {
        "items-start": e.message.summary,
        "items-center": !e.message.summary
      }
    ]
  }),
  messageIcon: ({ props: e }) => ({
    class: [
      // Sizing and Spacing
      e.message.severity === "contrast" || e.message.severity === "secondary" ? "w-0" : "w-[1.125rem] h-[1.125rem] mr-2",
      "text-lg leading-[normal]"
    ]
  }),
  messageText: {
    class: [
      // Font and Text
      "text-base leading-[normal]",
      "ml-2",
      "flex-1"
    ]
  },
  summary: {
    class: "font-medium block"
  },
  detail: ({ props: e }) => ({
    class: [
      "block",
      "text-sm",
      e.message.severity === "contrast" ? "text-surface-0 dark:text-surface-950" : "text-surface-700 dark:text-surface-0",
      { "mt-2": e.message.summary }
    ]
  }),
  closeButton: ({ props: e }) => ({
    class: [
      // Flexbox
      "flex items-center justify-center",
      // Size
      "w-7 h-7",
      // Spacing and Misc
      "ml-auto  relative",
      // Shape
      "rounded-full",
      // Colors
      "bg-transparent",
      // Transitions
      "transition duration-200 ease-in-out",
      // States
      "hover:bg-surface-0/30 dark:hover:bg-[rgba(255,255,255,0.03)]",
      "focus:outline-none focus:outline-offset-0 focus:ring-1",
      {
        "focus:ring-blue-500 dark:focus:ring-blue-400": e.severity == "info",
        "focus:ring-green-500 dark:focus:ring-green-400": e.severity == "success",
        "focus:ring-surface-500 dark:focus:ring-surface-400": e.severity == "secondary",
        "focus:ring-orange-500 dark:focus:ring-orange-400": e.severity == "warn",
        "focus:ring-red-500 dark:focus:ring-red-4000": e.severity == "error",
        "focus:ring-surface-0 dark:focus:ring-surface-950": e.severity == "contrast"
      },
      // Misc
      "overflow-hidden"
    ]
  }),
  transition: {
    enterFromClass: "opacity-0 translate-y-2/4",
    enterActiveClass: "transition-[transform,opacity] duration-300",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass: "!transition-[max-height_.45s_cubic-bezier(0,1,0,1),opacity_.3s,margin-bottom_.3s] overflow-hidden",
    leaveToClass: "max-h-0 opacity-0 mb-0"
  }
}, zd = {
  root: ({ props: e, context: t }) => ({
    class: [
      "relative",
      // Alignment
      "flex items-center justify-center",
      "py-2 px-4",
      "rounded-md border",
      // Color
      "bg-surface-100 dark:bg-surface-950",
      {
        "text-surface-600 dark:text-white/60 before:bg-transparent": !t.active,
        "text-surface-800 dark:text-white/80 before:bg-surface-0 dark:before:bg-surface-800": t.active
      },
      // States
      {
        "hover:text-surface-800 dark:hover:text-white/80": !e.disabled && !e.modelValue,
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 dark:focus-visible:ring-secondary-400": !e.disabled
      },
      // Invalid State
      {
        "border-red-500 dark:border-red-400": e.invalid,
        "border-surface-100 dark:border-surface-950": !e.invalid
      },
      // Before
      "before:absolute before:left-1 before:top-1 before:w-[calc(100%-0.5rem)] before:h-[calc(100%-0.5rem)] before:rounded-[4px] before:z-0",
      // Transitions
      "transition-all duration-200",
      // Misc
      {
        "cursor-pointer": !e.disabled,
        "opacity-60 select-none pointer-events-none cursor-default": e.disabled
      }
    ]
  }),
  content: "relative items-center inline-flex justify-center gap-2",
  label: "font-medium leading-[normal] text-center w-full z-10 relative",
  icon: "relative z-10 mr-2"
}, Qs = {
  root: ({ props: e }) => ({
    class: [
      "inline-block relative",
      "w-10 h-6",
      "rounded-2xl",
      {
        "opacity-60 select-none pointer-events-none cursor-default": e.disabled
      }
    ]
  }),
  slider: ({ props: e }) => ({
    class: [
      // Position
      "absolute top-0 left-0 right-0 bottom-0",
      {
        "before:transform before:translate-x-4": e.modelValue == e.trueValue
      },
      // Shape
      "rounded-2xl",
      // Before:
      "before:absolute before:top-1/2 before:left-1",
      "before:-mt-2",
      "before:h-4 before:w-4",
      "before:rounded-full",
      "before:duration-200",
      "before:bg-surface-0 before:dark:bg-surface-500",
      // Colors
      "border",
      {
        "bg-surface-300 dark:bg-surface-700": e.modelValue != e.trueValue,
        "bg-secondary-400": e.modelValue == e.trueValue,
        "before:dark:bg-surface-950": e.modelValue == e.trueValue,
        "border-transparent": !e.invalid
      },
      // Invalid State
      { "border-red-500 dark:border-danger-400": e.invalid },
      // States
      {
        "peer-hover:bg-surface-400 dark:peer-hover:bg-surface-600": e.modelValue != e.trueValue && !e.disabled && !e.invalid
      },
      {
        "peer-hover:bg-primary-hover": e.modelValue == e.trueValue && !e.disabled && !e.invalid
      },
      "peer-focus-visible:ring-1 peer-focus-visible:ring-primary-500 dark:peer-focus-visible:ring-secondary-200",
      // Transition
      "transition-colors duration-200",
      // Misc
      "cursor-pointer"
    ]
  }),
  input: {
    class: [
      "peer",
      // Size
      "w-full ",
      "h-full",
      // Position
      "absolute",
      "top-0 left-0",
      "z-10",
      // Spacing
      "p-0",
      "m-0",
      // Shape
      "opacity-0",
      "rounded-2xl",
      "outline-none",
      // Misc
      "appearance-none",
      "cursor-pointer"
    ]
  }
}, Ld = {
  root: {
    class: [
      // Flex & Alignment
      "flex items-center justify-between flex-wrap",
      "gap-2",
      // Spacing
      "p-3",
      // Shape
      "rounded-md",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      "border border-surface-200 dark:border-surface-700"
    ]
  },
  start: {
    class: "flex items-center"
  },
  center: {
    class: "flex items-center"
  },
  end: {
    class: "flex items-center"
  }
}, Rd = {
  root: ({ context: e }) => ({
    class: [
      // Position and Shadows
      "absolute",
      "p-fadein",
      // Spacing
      {
        '[&[data-p-position="top"]]:py-1 [&[data-p-position="top"]]:px-0 py-0 px-1': (e == null ? void 0 : e.right) || (e == null ? void 0 : e.left) || !(e != null && e.right) && !(e != null && e.left) && !(e != null && e.top) && !(e != null && e.bottom),
        "py-1 px-0": (e == null ? void 0 : e.top) || (e == null ? void 0 : e.bottom)
      },
      // Flipped Tooltip Arrow
      '[&[data-p-position="top"]>[data-pc-section=arrow]]:border-x-[10px] [&[data-p-position="top"]>[data-pc-section=arrow]]:border-t-[10px] [&[data-p-position="top"]>[data-pc-section=arrow]]:border-b-0 [&[data-p-position="top"]>[data-pc-section=arrow]]:border-t-surface-700 [&[data-p-position="top"]>[data-pc-section=arrow]]:border-y-0 [&[data-p-position="top"]>[data-pc-section=arrow]]:border-x-transparent',
      '[&[data-p-position="top"]>[data-pc-section=arrow]]:-ml-[10px] [&[data-p-position="top"]>[data-pc-section=arrow]]:left-1/2 [&[data-p-position="top"]>[data-pc-section=arrow]]:mt-auto [&[data-p-position="top"]>[data-pc-section=arrow]]:top-auto'
    ]
  }),
  arrow: ({ context: e }) => ({
    class: [
      // Position
      "absolute",
      // Size
      "w-0",
      "h-0",
      // Shape
      "border-transparent",
      "border-solid",
      {
        "border-y-[10px] border-r-[10px] border-l-0 border-r-surface-700": (e == null ? void 0 : e.right) || !(e != null && e.right) && !(e != null && e.left) && !(e != null && e.top) && !(e != null && e.bottom),
        "border-y-[10px] border-l-[10px] border-r-0 border-l-surface-700": e == null ? void 0 : e.left,
        "border-x-[10px] border-t-[10px] border-b-0 border-t-surface-700 ": e == null ? void 0 : e.top,
        "border-x-[10px] border-b-[10px] border-t-0 border-b-surface-700": e == null ? void 0 : e.bottom
      },
      // Spacing
      {
        "-mt-[10px] top-1/2": (e == null ? void 0 : e.right) || (e == null ? void 0 : e.left) || !(e != null && e.right) && !(e != null && e.left) && !(e != null && e.top) && !(e != null && e.bottom),
        "-ml-[10px] left-1/2": (e == null ? void 0 : e.top) || (e == null ? void 0 : e.bottom)
      }
    ]
  }),
  text: {
    class: [
      "p-3",
      "bg-surface-700",
      "text-white",
      "leading-none",
      "rounded-md",
      "whitespace-pre-line",
      "break-words",
      "shadow-md"
    ]
  }
}, Md = {
  root: {
    class: [
      // Space
      "p-4",
      // Shape
      "rounded-md",
      "border-none",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-white/80",
      "[&_[data-pc-name=pcfilter]]:w-full"
    ]
  },
  wrapper: {
    class: ["overflow-auto"]
  },
  container: {
    class: [
      // Spacing
      "m-0 p-0",
      // Misc
      "list-none overflow-auto"
    ]
  },
  node: {
    class: [
      "p-0 my-[2px] mx-0 first:mt-0",
      "rounded-md",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-inset focus:ring-primary-500 dark:focus:ring-primary-400 focus:z-10"
    ]
  },
  nodeContent: ({ context: e, props: t }) => ({
    class: [
      // Flex and Alignment
      "flex items-center",
      // Shape
      "rounded-md",
      // Spacing
      "py-1 px-2 gap-2",
      // Colors
      e.selected ? "bg-highlight text-highlight-contrast " : "bg-transparent text-surface-600 dark:text-white/70",
      // States
      {
        "hover:bg-surface-50 dark:hover:bg-[rgba(255,255,255,0.03)]": (t.selectionMode == "single" || t.selectionMode == "multiple") && !e.selected
      },
      // Transition
      "transition-shadow duration-200",
      {
        "cursor-pointer select-none": t.selectionMode == "single" || t.selectionMode == "multiple"
      }
    ]
  }),
  nodeToggleButton: ({ context: e }) => ({
    class: [
      // Flex and Alignment
      "inline-flex items-center justify-center",
      // Shape
      "border-0 rounded-full",
      // Size
      "w-7 h-7",
      // Colors
      "bg-transparent",
      {
        "text-surface-600 dark:text-white/70": !e.selected,
        "text-highlight-contrast": e.selected,
        invisible: e.leaf
      },
      // States
      "hover:bg-surface-200/20 dark:hover:bg-surface-500/20",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400",
      // Transition
      "transition duration-200",
      // Misc
      "cursor-pointer select-none"
    ]
  }),
  nodeIcon: ({ context: e }) => ({
    class: [
      // Space
      "mr-2",
      // Color
      {
        "text-surface-600 dark:text-white/70": !e.selected,
        "text-highlight-contrast": e.selected
      }
    ]
  }),
  nodeLabel: ({ context: e }) => ({
    class: [
      {
        "text-surface-600 dark:text-white/70": !e.selected,
        "text-highlight-contrast": e.selected
      }
    ]
  }),
  nodeChildren: {
    class: ["m-0 list-none p-0 pl-4 [&:not(ul)]:pl-0 [&:not(ul)]:my-[2px]"]
  },
  loadingIcon: {
    class: [
      "text-surface-500 dark:text-surface-0/70",
      "absolute top-[50%] right-[50%] -mt-2 -mr-2 animate-spin"
    ]
  }
}, Nd = {
  root: ({ props: e, state: t }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "relative",
      // Shape
      "rounded-md",
      // Color and Background
      { "bg-surface-0 dark:bg-surface-950": !e.disabled },
      "border",
      { "border-surface-300 dark:border-surface-700": !e.invalid },
      // Invalid State
      "invalid:focus:ring-red-200",
      "invalid:hover:border-red-500",
      { "border-red-500 dark:border-red-400": e.invalid },
      // Transitions
      "transition-all",
      "duration-200",
      // States
      {
        "hover:border-surface-400 dark:hover:border-surface-600": !e.invalid
      },
      {
        "outline-none outline-offset-0 ring-1 ring-primary-500 dark:ring-primary-400 z-10": t.focused
      },
      // Misc
      "cursor-pointer",
      "select-none",
      {
        "bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default": e.disabled
      }
    ]
  }),
  labelContainer: {
    class: ["overflow-hidden flex flex-auto cursor-pointer"]
  },
  label: ({ props: e, parent: t }) => {
    var r, o, s, n;
    return {
      class: [
        "block leading-[normal]",
        // Space
        "py-2 px-3",
        // Color
        "text-surface-800 dark:text-white/80",
        {
          "placeholder:text-transparent dark:placeholder:text-transparent": ((r = t.instance) == null ? void 0 : r.$name) == "FloatLabel",
          "!text-transparent dark:!text-transparent": ((o = t.instance) == null ? void 0 : o.$name) == "FloatLabel" && e.modelValue == null || ((s = e.modelValue) == null ? void 0 : s.length) == 0
        },
        // Filled State *for FloatLabel
        {
          filled: ((n = t.instance) == null ? void 0 : n.$name) == "FloatLabel" && e.modelValue !== null
        },
        // Transition
        "transition duration-200",
        // Misc
        "overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis"
      ]
    };
  },
  dropdown: {
    class: [
      // Flexbox
      "flex items-center justify-center",
      "shrink-0",
      // Color and Background
      "bg-transparent",
      "text-surface-500",
      // Size
      "w-12",
      // Shape
      "rounded-r-md"
    ]
  },
  panel: {
    class: [
      // Colors
      "bg-surface-0 dark:bg-surface-900",
      "text-surface-700 dark:text-white/80",
      // Shape
      "border border-surface-300 dark:border-surface-700",
      "rounded-md",
      "shadow-md"
    ]
  },
  treeContainer: {
    class: [
      // Sizing
      "max-h-[200px]",
      // Misc
      "overflow-auto"
    ]
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
}, Fd = {
  root: ({ props: e }) => ({
    class: [
      "relative",
      {
        "flex flex-col h-full": e.scrollHeight === "flex"
      }
    ]
  }),
  mask: {
    class: [
      // Position
      "absolute",
      "top-0 left-0",
      "z-20",
      // Flex & Alignment
      "flex items-center justify-center",
      // Size
      "w-full h-full",
      // Color
      "bg-surface-100/40 dark:bg-surface-800/40",
      // Transition
      "transition duration-200"
    ]
  },
  loadingIcon: {
    class: "w-8 h-8 animate-spin"
  },
  tableContainer: ({ props: e }) => ({
    class: [
      // Overflow
      {
        "relative overflow-auto": e.scrollable,
        "overflow-x-auto": e.resizableColumns
      }
    ]
  }),
  header: ({ props: e }) => ({
    class: [
      "font-semibold",
      // Shape
      e.showGridlines ? "border-x border-t border-b-0" : "border-y border-x-0",
      // Spacing
      "p-4",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      "border-surface-200 dark:border-surface-700",
      "text-surface-700 dark:text-white/80"
    ]
  }),
  footer: {
    class: [
      "font-semibold",
      // Shape
      "border-t-0 border-b border-x-0",
      // Spacing
      "p-4",
      // Color
      "bg-surface-0 dark:bg-surface-900",
      "border-surface-200 dark:border-surface-700",
      "text-surface-700 dark:text-white/80"
    ]
  },
  table: {
    class: [
      // Table & Width
      "border-collapse table-fixed w-full "
    ]
  },
  thead: ({ props: e }) => ({
    class: [
      // Position & Z-index
      {
        "top-0 z-40 sticky": e.scrollable
      }
    ]
  }),
  tbody: ({ props: e }) => ({
    class: [
      // Block Display
      {
        block: e.scrollable
      },
      "dark:bg-surface-800"
    ]
  }),
  tfoot: ({ props: e }) => ({
    class: [
      // Block Display
      {
        block: e.scrollable
      }
    ]
  }),
  headerRow: ({ props: e }) => ({
    class: [
      // Flexbox & Width
      {
        "flex flex-nowrap w-full": e.scrollable
      }
    ]
  }),
  row: ({ context: e, props: t }) => ({
    class: [
      // Flex
      { "flex flex-nowrap w-full": e.scrollable },
      // Color
      "text-surface-700 dark:text-white/80",
      {
        "dark:bg-white/30 dark:odd:bg-white/30 dark:hover:bg-white/25 dark:odd:hover:bg-white/30": e.selected
      },
      {
        "bg-surface-0 text-surface-600 dark:bg-surface-800 dark:odd:bg-surface-700/30": !e.selected
      },
      // Border
      "border-surface-200 dark:border-surface-900",
      "border-b last:border-transparent focus:border-transparent",
      // Hover & Flexbox
      {
        "hover:bg-surface-100 dark:hover:bg-surface-900": e.selectable && !e.selected
      },
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 ring-inset dark:focus:ring-white/80"
    ]
  }),
  headerCell: ({ context: e, props: t }) => ({
    class: [
      "font-semibold",
      "leading-[normal]",
      // Position
      {
        "sticky z-40": e.scrollable && e.scrollDirection === "both" && e.frozen
      },
      // Flex & Alignment
      {
        "flex flex-1 items-center": e.scrollable,
        "flex-initial shrink-0": e.scrollable && e.scrollDirection === "both" && !e.frozen
      },
      "text-left",
      // Shape
      { "first:border-l border-y border-r": e == null ? void 0 : e.showGridlines },
      "border-0 border-b border-solid",
      // Spacing
      (e == null ? void 0 : e.size) === "small" ? "py-0.5 px-2" : (e == null ? void 0 : e.size) === "large" ? "py-[0.9375rem] px-5" : "py-3 px-4",
      // Color
      (t.sortable === "" || t.sortable) && e.sorted ? "bg-highlight" : "bg-surface-0 text-surface-700 dark:text-white/80 dark:bg-surface-900",
      "border-surface-200 dark:border-surface-700",
      // States
      {
        "hover:bg-surface-100 dark:hover:bg-surface-80/50": (t.sortable === "" || t.sortable) && !(e != null && e.sorted)
      },
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
      // Transition
      { "transition duration-200": t.sortable === "" || t.sortable },
      // Misc
      {
        "overflow-hidden relative bg-clip-padding": e.resizable && !e.frozen
      }
    ]
  }),
  column: {
    headerCell: ({ context: e, props: t }) => ({
      class: [
        "font-semibold",
        "leading-[normal]",
        // Position
        {
          "sticky z-40": e.scrollable && e.scrollDirection === "both" && e.frozen
        },
        // Flex & Alignment
        {
          "flex flex-1 items-center": e.scrollable,
          "flex-initial shrink-0": e.scrollable && e.scrollDirection === "both" && !e.frozen
        },
        "text-left",
        // Shape
        { "first:border-l border-y border-r": e == null ? void 0 : e.showGridlines },
        "border-0 border-b border-solid",
        // Spacing
        (e == null ? void 0 : e.size) === "small" ? "py-0.5 px-2" : (e == null ? void 0 : e.size) === "large" ? "py-[0.9375rem] px-5" : "py-3 px-4",
        // Color
        (t.sortable === "" || t.sortable) && e.sorted ? "bg-highlight" : "bg-surface-0 text-surface-700 dark:text-white/80 dark:bg-surface-900",
        "border-surface-200 dark:border-surface-700",
        // States
        {
          "hover:bg-surface-100 dark:hover:bg-surface-80/50": (t.sortable === "" || t.sortable) && !(e != null && e.sorted)
        },
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        // Transition
        { "transition duration-200": t.sortable === "" || t.sortable },
        // Misc
        {
          "overflow-hidden relative bg-clip-padding": e.resizable && !e.frozen
        }
      ]
    }),
    bodyCell: ({ context: e }) => ({
      class: [
        // Font
        "leading-[normal]",
        // Position
        {
          sticky: e.scrollable && e.scrollDirection === "both" && e.frozen
        },
        // Flex & Alignment
        {
          "flex flex-1 items-center": e.scrollable,
          "flex-initial shrink-0": e.scrollable && e.scrollDirection === "both" && !e.frozen
        },
        "text-left",
        // Shape
        "border-surface-200 dark:border-surface-700",
        {
          "border-x-0 border-l-0": !e.showGridlines
        },
        { "first:border-l border-r border-b": e == null ? void 0 : e.showGridlines },
        // Right block
        "first:relative first:before:absolute first:before:inset-0 first:before:w-1",
        { "first:before:bg-secondary-400": e.selected },
        // Spacing
        (e == null ? void 0 : e.size) === "small" ? "py-0.5 px-2" : (e == null ? void 0 : e.size) === "large" ? "py-[0.9375rem] px-5" : "py-3 px-4",
        // Misc
        {
          "cursor-pointer": e.selectable,
          sticky: e.scrollable && e.scrollDirection === "both" && e.frozen,
          "border-x-0 border-l-0": !e.showGridlines
        }
      ]
    }),
    bodyCellContent: "flex items-center gap-2",
    rowToggleIcon: ({ context: e }) => ({
      class: [
        // Size
        (e == null ? void 0 : e.size) === "small" ? "size-[.6rem]" : (e == null ? void 0 : e.size) === "large" ? "size-4" : "size-[.8rem]"
      ]
    }),
    nodeToggleButton: ({ context: e }) => ({
      class: [
        "relative",
        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left align-middle",
        // Spacing
        "m-0 mr-2 p-0",
        // Size
        e.size === "small" ? "size-5" : e.size === "large" ? "size-7" : "size-6",
        // Shape
        "border-0 rounded-md",
        // Color
        "text-surface-700 dark:text-white/70",
        "border-transparent",
        // States
        "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-white/80 dark:focus:ring-white/80",
        "hover:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-700/50",
        // Transition
        "transition duration-200",
        // Misc
        "overflow-hidden",
        "cursor-pointer select-none"
      ]
    }),
    sortIcon: ({ context: e }) => ({
      class: [
        "ml-2 inline-block",
        e.sorted ? "text-inherit" : "fill-surface-700 dark:fill-white/70"
      ]
    }),
    columnResizer: {
      class: [
        "block",
        // Position
        "absolute top-0 right-0",
        // Sizing
        "w-2 h-full",
        // Spacing
        "m-0 p-0",
        // Color
        "border border-transparent",
        // Misc
        "cursor-col-resize"
      ]
    },
    transition: {
      enterFromClass: "opacity-0 scale-y-[0.8]",
      enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
      leaveActiveClass: "transition-opacity duration-100 ease-linear",
      leaveToClass: "opacity-0"
    }
  },
  columnResizeIndicator: {
    class: "absolute hidden w-[2px] z-20 bg-primary"
  }
}, Dd = {
  global: Au,
  directives: {
    badge: nu,
    ripple: nd,
    tooltip: Rd
  },
  //forms
  autocomplete: tu,
  select: Ys,
  dropdown: Ys,
  inputnumber: Ru,
  inputtext: Nu,
  datepicker: Js,
  calendar: Js,
  checkbox: pu,
  radiobutton: od,
  toggleswitch: Qs,
  inputswitch: Qs,
  selectbutton: ld,
  slider: ud,
  rating: sd,
  multiselect: Uu,
  togglebutton: zd,
  cascadeselect: fu,
  listbox: Du,
  colorpicker: gu,
  inputgroup: Eu,
  inputgroupaddon: zu,
  inputmask: Lu,
  knob: Fu,
  treeselect: Nd,
  textarea: $d,
  password: Xu,
  iconfield: $u,
  floatlabel: Pu,
  inputotp: Mu,
  //buttons
  button: lu,
  buttongroup: cu,
  splitbutton: fd,
  speeddial: dd,
  //data
  paginator: Yu,
  datatable: vu,
  tree: Md,
  dataview: yu,
  organizationchart: Gu,
  orderlist: Ju,
  picklist: ed,
  treetable: Fd,
  timeline: Id,
  //panels
  accordion: Qc,
  accordionpanel: eu,
  accordionheader: Xc,
  accordioncontent: Zc,
  panel: Qu,
  fieldset: Cu,
  card: uu,
  tabview: Pd,
  divider: _u,
  toolbar: Ld,
  scrollpanel: ad,
  splitter: pd,
  splitterpanel: bd,
  stepper: vd,
  steplist: md,
  step: gd,
  stepitem: hd,
  steppanels: xd,
  deferred: ku,
  tab: kd,
  tabs: Td,
  tablist: wd,
  tabpanels: Cd,
  tabpanel: Sd,
  //file
  fileupload: Tu,
  //menu
  contextmenu: xu,
  menu: Bu,
  menubar: Hu,
  steps: yd,
  tieredmenu: Od,
  breadcrumb: iu,
  panelmenu: Zu,
  megamenu: Vu,
  dock: Su,
  tabmenu: _d,
  //overlays
  dialog: wu,
  popover: qs,
  sidebar: qs,
  drawer: Gs,
  overlaypanel: Gs,
  confirmpopup: mu,
  confirmdialog: hu,
  //messages
  message: Ku,
  toast: Ed,
  //media
  carousel: du,
  galleria: ju,
  image: Ou,
  //misc
  badge: su,
  overlaybadge: qu,
  avatar: ru,
  avatargroup: ou,
  tag: jd,
  chip: bu,
  progressbar: td,
  skeleton: cd,
  scrolltop: id,
  terminal: Ad,
  blockui: au,
  metergroup: Wu,
  inplace: Iu,
  progressspinner: rd
}, Sa = /* @__PURE__ */ ba("attacks", () => {
  const e = ce([]), t = ce(null), r = Ve(
    () => e.value.find((b) => b.sessionId === t.value) ?? e.value[0] ?? null
  );
  function o(b, x, h = 0) {
    const $ = e.value.find((B) => B.sessionId === b);
    if ($) {
      h > 0 && ($.total = h);
      return;
    }
    const E = {
      sessionId: b,
      requestId: x,
      startedAt: Date.now(),
      results: [],
      total: h,
      complete: !1,
      errors: [],
      recoveredKeys: [],
      discoveredEndpoints: [],
      keyRecoveryLog: []
    };
    e.value.unshift(E), t.value = b;
  }
  function s(b, x) {
    const h = e.value.find(($) => $.sessionId === b);
    h && (h.total = x);
  }
  function n(b, x) {
    const h = e.value.find(($) => $.sessionId === b);
    h && h.results.push(x);
  }
  function a(b, x) {
    const h = e.value.find(($) => $.sessionId === b);
    h && (h.complete = !0, h.errors.push(...x));
  }
  function i(b, x) {
    const h = e.value.find(($) => $.sessionId === b);
    h && !h.recoveredKeys.includes(x) && h.recoveredKeys.push(x);
  }
  function l(b, x) {
    const h = e.value.find(($) => $.sessionId === b);
    h && h.keyRecoveryLog.push(x);
  }
  function u(b, x) {
    const h = e.value.find(($) => $.sessionId === b);
    h && !h.discoveredEndpoints.some(($) => $.url === x.url) && h.discoveredEndpoints.push(x);
  }
  function c(b, x, h) {
    const $ = e.value.find((E) => E.sessionId === b);
    $ && ($.jwksJson = x, $.jwksPrivateKey = h);
  }
  function p(b) {
    t.value = b;
  }
  function g() {
    e.value = [], t.value = null;
  }
  return {
    sessions: e,
    activeSessionId: t,
    activeSession: r,
    startSession: o,
    setSessionTotal: s,
    addResult: n,
    completeSession: a,
    addRecoveredKey: i,
    logKeyRecovery: l,
    addDiscoveredEndpoint: u,
    setJWKSPayload: c,
    setActiveSession: p,
    clearSessions: g
  };
}), Zs = {
  jwksUrl: "",
  customPublicKeyPem: "",
  customPrivateKeyPem: "",
  customCertPem: "",
  extraJwksPaths: [],
  customWordlist: [],
  enableKeyRecovery: !1,
  enabledAttacks: {
    none: !0,
    nullSig: !0,
    algConfusion: !0,
    embeddedJwk: !0,
    jkuSpoof: !0,
    x5uSpoof: !0,
    kidInject: !0,
    claimTamper: !0,
    weakSecret: !0
  }
}, Vd = {
  none: "None Algorithm",
  nullSig: "Null Signature",
  algConfusion: "Algorithm Confusion",
  embeddedJwk: "Embedded JWK",
  jkuSpoof: "JKU Spoofing",
  x5uSpoof: "X5U Spoofing",
  kidInject: "KID Injection",
  claimTamper: "Claim Tampering",
  weakSecret: "Weak Secret"
};
function Ca(e) {
  return e ? e < 300 ? "text-green-400" : e < 400 ? "text-yellow-400" : e < 500 ? "text-orange-400" : "text-red-400" : "text-gray-400";
}
function Ta(e) {
  return {
    baseline: "bg-gray-600 text-gray-100",
    none: "bg-red-900 text-red-200",
    nullSig: "bg-red-900 text-red-200",
    algConfusion: "bg-orange-900 text-orange-200",
    embeddedJwk: "bg-yellow-900 text-yellow-200",
    jkuSpoof: "bg-purple-900 text-purple-200",
    x5uSpoof: "bg-purple-900 text-purple-200",
    kidInject: "bg-blue-900 text-blue-200",
    claimTamper: "bg-teal-900 text-teal-200",
    weakSecret: "bg-pink-900 text-pink-200"
  }[e] ?? "bg-gray-700 text-gray-200";
}
const Bd = { class: "h-full flex flex-col overflow-hidden" }, Hd = { class: "px-3 py-2 border-b border-gray-700 bg-gray-900 flex items-center gap-2" }, Kd = ["value"], Wd = ["value"], Ud = {
  key: 1,
  class: "text-xs text-gray-400 flex-1"
}, Jd = {
  key: 0,
  class: "ml-1 text-yellow-400 animate-pulse"
}, Gd = {
  key: 1,
  class: "ml-1 text-green-400"
}, qd = {
  key: 2,
  class: "ml-2 text-cyan-400"
}, Yd = {
  key: 0,
  class: "px-3 py-2 bg-cyan-950 border-b-2 border-cyan-600 text-xs text-cyan-200"
}, Qd = { class: "font-semibold mb-1" }, Zd = ["onClick"], Xd = { class: "text-cyan-400" }, ef = {
  key: 0,
  class: "text-cyan-500"
}, tf = {
  key: 1,
  class: "h-1 bg-gray-800"
}, rf = {
  key: 2,
  class: "px-3 py-1.5 bg-red-950 border-b border-red-800 text-xs text-red-300 max-h-28 overflow-y-auto"
}, of = { class: "font-semibold mb-0.5" }, sf = {
  key: 3,
  class: "px-3 py-1.5 bg-yellow-950 border-b border-yellow-800 text-xs text-yellow-300 max-h-16 overflow-y-auto"
}, nf = {
  key: 4,
  class: "px-3 py-1.5 bg-green-950 border-b border-green-800 text-xs text-green-300"
}, af = { class: "flex gap-1 px-2 py-1.5 border-b border-gray-700 overflow-x-auto shrink-0" }, lf = ["onClick"], cf = { class: "flex-1 overflow-y-auto" }, uf = {
  key: 0,
  class: "flex items-center justify-center h-full text-gray-500 text-sm py-8"
}, df = ["onClick"], ff = { class: "flex items-center gap-2 min-w-0" }, pf = { class: "text-xs text-gray-200 truncate flex-1" }, bf = {
  key: 1,
  class: "text-xs text-red-500 shrink-0"
}, gf = {
  key: 2,
  class: "text-xs text-gray-600 shrink-0 animate-pulse"
}, hf = { class: "text-xs text-gray-500 mt-0.5 truncate pl-0.5" }, mf = /* @__PURE__ */ vr({
  __name: "AttackList",
  props: {
    selectedId: {},
    selectedEndpointUrl: {}
  },
  emits: ["select", "selectEndpoint", "showJwks"],
  setup(e, { emit: t }) {
    const r = t, o = Sa(), s = ce("all"), n = Ve(() => o.activeSession), a = Ve(() => {
      var b;
      const l = ((b = n.value) == null ? void 0 : b.results) ?? [], u = l.filter((x) => x.responseStatus && x.responseStatus < 300).length, c = l.filter((x) => x.responseStatus && x.responseStatus >= 400 && x.responseStatus < 500).length, p = l.filter((x) => x.responseStatus && x.responseStatus >= 500).length, g = l.filter((x) => x.error).length;
      return [
        { key: "all", label: "All", count: l.length },
        { key: "2xx", label: "2xx", count: u },
        { key: "4xx", label: "4xx", count: c },
        { key: "5xx", label: "5xx", count: p },
        { key: "err", label: "Errors", count: g }
      ];
    }), i = Ve(() => {
      var u;
      const l = ((u = n.value) == null ? void 0 : u.results) ?? [];
      switch (s.value) {
        case "2xx":
          return l.filter((c) => c.responseStatus && c.responseStatus < 300);
        case "4xx":
          return l.filter((c) => c.responseStatus && c.responseStatus >= 400 && c.responseStatus < 500);
        case "5xx":
          return l.filter((c) => c.responseStatus && c.responseStatus >= 500);
        case "err":
          return l.filter((c) => c.error);
        default:
          return l;
      }
    });
    return (l, u) => {
      var c, p, g, b, x;
      return j(), A("div", Bd, [
        L(" Session selector + progress bar "),
        m("div", Hd, [
          ze(o).sessions.length > 1 ? (j(), A("select", {
            key: 0,
            value: ze(o).activeSessionId,
            onChange: u[0] || (u[0] = (h) => ze(o).setActiveSession(h.target.value)),
            class: "text-xs bg-gray-800 border border-gray-600 rounded px-2 py-1 text-gray-300 flex-1 min-w-0"
          }, [
            (j(!0), A(
              se,
              null,
              Ne(ze(o).sessions, (h) => (j(), A("option", {
                key: h.sessionId,
                value: h.sessionId
              }, " Session " + I(h.sessionId.slice(0, 6)) + " — " + I(h.results.length) + "/" + I(h.total) + " (" + I(new Date(h.startedAt).toLocaleTimeString()) + ") ", 9, Wd))),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 40, Kd)) : (j(), A("span", Ud, [
            n.value ? (j(), A(
              se,
              { key: 0 },
              [
                Ae(
                  I(n.value.results.length) + "/" + I(n.value.total) + " attacks ",
                  1
                  /* TEXT */
                ),
                n.value.complete ? (j(), A("span", Gd, "✓ complete")) : (j(), A("span", Jd, "running…")),
                n.value.discoveredEndpoints.length ? (j(), A(
                  "span",
                  qd,
                  "🔎 " + I(n.value.discoveredEndpoints.length) + " key endpoint(s)",
                  1
                  /* TEXT */
                )) : L("v-if", !0)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (j(), A(
              se,
              { key: 1 },
              [
                Ae("No active session")
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ])),
          ze(o).sessions.length ? (j(), A("button", {
            key: 2,
            onClick: u[1] || (u[1] = (h) => ze(o).clearSessions()),
            class: "text-xs text-gray-500 hover:text-red-400 transition-colors"
          }, "Clear")) : L("v-if", !0)
        ]),
        L(" Discovered JWKS / key endpoints — highlighted so the analyst can't miss it "),
        (c = n.value) != null && c.discoveredEndpoints.length ? (j(), A("div", Yd, [
          m(
            "p",
            Qd,
            "🔎 " + I(n.value.discoveredEndpoints.length) + " key endpoint(s) discovered — click for details:",
            1
            /* TEXT */
          ),
          (j(!0), A(
            se,
            null,
            Ne(n.value.discoveredEndpoints, (h, $) => (j(), A("div", {
              key: $,
              onClick: (E) => r("selectEndpoint", h),
              class: De([
                "font-mono break-all leading-snug px-1 -mx-1 rounded cursor-pointer hover:bg-cyan-900 transition-colors",
                e.selectedEndpointUrl === h.url ? "bg-cyan-900 ring-1 ring-cyan-500" : ""
              ])
            }, [
              m(
                "span",
                Xd,
                "[" + I(h.source) + "]",
                1
                /* TEXT */
              ),
              Ae(
                " " + I(h.url) + " ",
                1
                /* TEXT */
              ),
              h.keyCount ? (j(), A(
                "span",
                ef,
                "— " + I(h.keyCount) + " key(s)",
                1
                /* TEXT */
              )) : L("v-if", !0)
            ], 10, Zd))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : L("v-if", !0),
        L(" Progress bar "),
        n.value && !n.value.complete ? (j(), A("div", tf, [
          m(
            "div",
            {
              class: "h-1 bg-blue-500 transition-all duration-300",
              style: Gr({ width: n.value.total ? `${n.value.results.length / n.value.total * 100}%` : "0%" })
            },
            null,
            4
            /* STYLE */
          )
        ])) : L("v-if", !0),
        L(" Errors / warnings "),
        (p = n.value) != null && p.errors.length ? (j(), A("div", rf, [
          m(
            "p",
            of,
            "⚠ " + I(n.value.errors.length) + " error(s):",
            1
            /* TEXT */
          ),
          (j(!0), A(
            se,
            null,
            Ne(n.value.errors, (h, $) => (j(), A(
              "p",
              {
                key: $,
                class: "font-mono break-all"
              },
              I(h),
              1
              /* TEXT */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : L("v-if", !0),
        L(" Key recovery log "),
        (g = n.value) != null && g.keyRecoveryLog.length ? (j(), A("div", sf, [
          (j(!0), A(
            se,
            null,
            Ne(n.value.keyRecoveryLog, (h, $) => (j(), A(
              "p",
              { key: $ },
              I(h),
              1
              /* TEXT */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : L("v-if", !0),
        L(" Recovered keys notice "),
        (b = n.value) != null && b.recoveredKeys.length ? (j(), A(
          "div",
          nf,
          " ✓ Recovered " + I(n.value.recoveredKeys.length) + " public key(s) from HTTP history ",
          1
          /* TEXT */
        )) : L("v-if", !0),
        L(" JWKS info "),
        (x = n.value) != null && x.jwksJson ? (j(), A("div", {
          key: 5,
          class: "px-3 py-1.5 bg-purple-950 border-b border-purple-800 text-xs text-purple-300 cursor-pointer hover:bg-purple-900",
          onClick: u[2] || (u[2] = (h) => r("showJwks", n.value))
        }, " ℹ JKU/X5U spoofing — click to view JWKS payload to host ")) : L("v-if", !0),
        L(" Filter tabs "),
        m("div", af, [
          (j(!0), A(
            se,
            null,
            Ne(a.value, (h) => (j(), A("button", {
              key: h.key,
              onClick: ($) => s.value = h.key,
              class: De([
                "px-2 py-0.5 rounded text-xs font-medium transition-colors whitespace-nowrap",
                s.value === h.key ? "bg-blue-700 text-white" : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
              ])
            }, I(h.label) + " (" + I(h.count) + ") ", 11, lf))),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        L(" Results list "),
        m("div", cf, [
          !n.value || i.value.length === 0 ? (j(), A("div", uf, [
            n.value ? (j(), A(
              se,
              { key: 1 },
              [
                Ae("No results yet…")
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (j(), A(
              se,
              { key: 0 },
              [
                Ae('Right-click a request with a JWT and select "Attack JWT"')
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : L("v-if", !0),
          (j(!0), A(
            se,
            null,
            Ne(i.value, (h) => (j(), A("div", {
              key: h.id,
              onClick: ($) => r("select", h),
              class: De([
                "px-3 py-2 border-b border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors",
                e.selectedId === h.id ? "bg-gray-800 border-l-2 border-l-blue-500" : ""
              ])
            }, [
              m("div", ff, [
                m(
                  "span",
                  {
                    class: De(["px-1.5 py-0.5 rounded text-xs font-mono shrink-0", ze(Ta)(h.technique)])
                  },
                  I(h.technique),
                  3
                  /* TEXT, CLASS */
                ),
                m(
                  "span",
                  pf,
                  I(h.techniqueName),
                  1
                  /* TEXT */
                ),
                h.responseStatus ? (j(), A(
                  "span",
                  {
                    key: 0,
                    class: De(["text-xs font-mono font-bold shrink-0", ze(Ca)(h.responseStatus)])
                  },
                  I(h.responseStatus),
                  3
                  /* TEXT, CLASS */
                )) : h.error ? (j(), A("span", bf, "ERR")) : (j(), A("span", gf, "…"))
              ]),
              m(
                "p",
                hf,
                I(h.description.slice(0, 80)),
                1
                /* TEXT */
              )
            ], 10, df))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]);
    };
  }
});
function Xs(e) {
  const t = e + "=".repeat((4 - e.length % 4) % 4);
  return atob(t.replace(/-/g, "+").replace(/_/g, "/"));
}
const xf = {
  key: 0,
  class: "h-full flex flex-col overflow-hidden text-sm"
}, vf = { class: "px-4 py-3 border-b border-gray-700 bg-gray-900 flex items-start gap-3" }, yf = { class: "flex-1 min-w-0" }, kf = { class: "font-semibold text-gray-100 truncate" }, wf = { class: "text-gray-400 text-xs mt-0.5 leading-relaxed" }, _f = { class: "flex-1 overflow-y-auto" }, Sf = { class: "px-4 py-2 border-b border-gray-700 flex gap-6 text-xs" }, Cf = {
  key: 1,
  class: "text-gray-400"
}, Tf = {
  key: 2,
  class: "text-gray-400"
}, Pf = {
  key: 3,
  class: "text-red-400"
}, jf = { class: "px-4 py-3 border-b border-gray-700" }, Af = { class: "bg-gray-900 rounded p-2 font-mono text-xs break-all text-gray-300 select-all max-h-32 overflow-y-auto" }, $f = { class: "text-yellow-400" }, Of = { class: "text-blue-400" }, If = { class: "text-red-400" }, Ef = {
  key: 0,
  class: "px-4 py-3 border-b border-gray-700"
}, zf = { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, Lf = {
  key: 0,
  class: "text-orange-300 normal-case"
}, Rf = { class: "bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-48 overflow-y-auto select-all whitespace-pre" }, Mf = {
  key: 1,
  class: "px-4 py-3 border-b border-gray-700"
}, Nf = { class: "bg-gray-900 rounded p-2 text-xs text-yellow-300 overflow-x-auto max-h-48 overflow-y-auto" }, Ff = {
  key: 2,
  class: "px-4 py-3 border-b border-gray-700"
}, Df = { class: "bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-48 overflow-y-auto" }, Vf = {
  key: 3,
  class: "px-4 py-3 border-b border-gray-700"
}, Bf = { class: "bg-gray-900 rounded p-2 text-xs font-mono space-y-0.5 max-h-32 overflow-y-auto" }, Hf = { class: "text-blue-400 shrink-0" }, Kf = { class: "text-gray-300 break-all" }, Wf = {
  key: 4,
  class: "px-4 py-3 border-b border-gray-700"
}, Uf = { class: "bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-64 overflow-y-auto whitespace-pre-wrap break-all" }, Jf = {
  key: 5,
  class: "px-4 py-3"
}, Gf = { class: "text-xs text-gray-500 mb-1.5" }, qf = { class: "bg-gray-900 rounded p-2 text-xs text-cyan-300 overflow-x-auto max-h-48 overflow-y-auto select-all whitespace-pre-wrap break-all" }, Yf = {
  key: 0,
  class: "text-xs text-orange-300 mt-1.5"
}, Qf = {
  key: 1,
  class: "flex items-center justify-center h-full text-gray-500 text-sm"
}, Zf = /* @__PURE__ */ vr({
  __name: "AttackDetail",
  props: {
    result: {}
  },
  setup(e) {
    const t = e, r = ce(!1), o = ce(!1), s = ce(!1);
    function n(b, x) {
      const h = b.replace(/\r\n/g, `
`);
      switch (x) {
        case "PEM (no trailing LF)":
          return btoa(h.replace(/\n+$/, ""));
        case "base64(PEM)":
          return btoa(btoa(h));
        case "DER":
          return h.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
        case "PEM":
        default:
          return btoa(h);
      }
    }
    const a = Ve(() => {
      const b = t.result;
      return !b || b.technique !== "algConfusion" || !b.keyPem || !b.originalJWT ? null : `echo -n '${n(b.keyPem, b.secretEncoding ?? "PEM")}' | base64 -d > /tmp/jwt_pubkey
python3 jwt_tool.py '${b.originalJWT}' -X k -pk /tmp/jwt_pubkey`;
    }), i = Ve(() => {
      if (!t.result) return ["", "", ""];
      const b = t.result.modifiedJWT.split(".");
      return [b[0] ?? "", b[1] ?? "", b[2] ?? ""];
    }), l = Ve(() => {
      if (!t.result) return null;
      try {
        const b = Xs(i.value[0]);
        return JSON.stringify(JSON.parse(b), null, 2);
      } catch {
        return null;
      }
    }), u = Ve(() => {
      if (!t.result) return null;
      try {
        const b = Xs(i.value[1]);
        return JSON.stringify(JSON.parse(b), null, 2);
      } catch {
        return null;
      }
    });
    async function c() {
      t.result && (await navigator.clipboard.writeText(t.result.modifiedJWT), r.value = !0, setTimeout(() => {
        r.value = !1;
      }, 1500));
    }
    async function p() {
      var b;
      (b = t.result) != null && b.keyPem && (await navigator.clipboard.writeText(t.result.keyPem), o.value = !0, setTimeout(() => {
        o.value = !1;
      }, 1500));
    }
    async function g() {
      a.value && (await navigator.clipboard.writeText(a.value), s.value = !0, setTimeout(() => {
        s.value = !1;
      }, 1500));
    }
    return (b, x) => e.result ? (j(), A("div", xf, [
      L(" Technique header "),
      m("div", vf, [
        m(
          "span",
          {
            class: De(["px-2 py-0.5 rounded text-xs font-mono font-semibold shrink-0", ze(Ta)(e.result.technique)])
          },
          I(e.result.technique),
          3
          /* TEXT, CLASS */
        ),
        m("div", yf, [
          m(
            "p",
            kf,
            I(e.result.techniqueName),
            1
            /* TEXT */
          ),
          m(
            "p",
            wf,
            I(e.result.description),
            1
            /* TEXT */
          )
        ])
      ]),
      m("div", _f, [
        L(" Status summary "),
        m("div", Sf, [
          e.result.responseStatus ? (j(), A(
            "span",
            {
              key: 0,
              class: De(["font-bold", ze(Ca)(e.result.responseStatus)])
            },
            " HTTP " + I(e.result.responseStatus),
            3
            /* TEXT, CLASS */
          )) : L("v-if", !0),
          e.result.responseLength !== void 0 ? (j(), A(
            "span",
            Cf,
            I(e.result.responseLength) + " bytes ",
            1
            /* TEXT */
          )) : L("v-if", !0),
          e.result.durationMs !== void 0 ? (j(), A(
            "span",
            Tf,
            I(e.result.durationMs) + "ms ",
            1
            /* TEXT */
          )) : L("v-if", !0),
          e.result.error ? (j(), A(
            "span",
            Pf,
            "Error: " + I(e.result.error),
            1
            /* TEXT */
          )) : L("v-if", !0)
        ]),
        L(" Modified JWT "),
        m("section", jf, [
          x[2] || (x[2] = m(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Modified JWT",
            -1
            /* CACHED */
          )),
          m("div", Af, [
            m(
              "span",
              $f,
              I(i.value[0]),
              1
              /* TEXT */
            ),
            x[0] || (x[0] = Ae(
              ".",
              -1
              /* CACHED */
            )),
            m(
              "span",
              Of,
              I(i.value[1]),
              1
              /* TEXT */
            ),
            x[1] || (x[1] = Ae(
              ".",
              -1
              /* CACHED */
            )),
            m(
              "span",
              If,
              I(i.value[2]),
              1
              /* TEXT */
            )
          ]),
          m(
            "button",
            {
              onClick: c,
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            I(r.value ? "✓ Copied" : "Copy JWT"),
            1
            /* TEXT */
          )
        ]),
        L(" Public key / certificate used (algorithm confusion) "),
        e.result.keyPem ? (j(), A("section", Ef, [
          m("p", zf, [
            x[3] || (x[3] = Ae(
              " Public Key / Certificate Used ",
              -1
              /* CACHED */
            )),
            e.result.secretEncoding ? (j(), A(
              "span",
              Lf,
              " — HMAC secret: " + I(e.result.secretEncoding),
              1
              /* TEXT */
            )) : L("v-if", !0)
          ]),
          m(
            "pre",
            Rf,
            I(e.result.keyPem),
            1
            /* TEXT */
          ),
          m(
            "button",
            {
              onClick: p,
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            I(o.value ? "✓ Copied" : "Copy PEM"),
            1
            /* TEXT */
          )
        ])) : L("v-if", !0),
        L(" Decoded header "),
        l.value ? (j(), A("section", Mf, [
          x[4] || (x[4] = m(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Decoded Header",
            -1
            /* CACHED */
          )),
          m(
            "pre",
            Nf,
            I(l.value),
            1
            /* TEXT */
          )
        ])) : L("v-if", !0),
        L(" Decoded payload "),
        u.value ? (j(), A("section", Ff, [
          x[5] || (x[5] = m(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Decoded Payload",
            -1
            /* CACHED */
          )),
          m(
            "pre",
            Df,
            I(u.value),
            1
            /* TEXT */
          )
        ])) : L("v-if", !0),
        L(" Response headers "),
        e.result.responseHeaders && Object.keys(e.result.responseHeaders).length ? (j(), A("section", Vf, [
          x[6] || (x[6] = m(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Response Headers",
            -1
            /* CACHED */
          )),
          m("div", Bf, [
            (j(!0), A(
              se,
              null,
              Ne(e.result.responseHeaders, (h, $) => (j(), A("div", {
                key: $,
                class: "flex gap-2"
              }, [
                m(
                  "span",
                  Hf,
                  I($) + ":",
                  1
                  /* TEXT */
                ),
                m(
                  "span",
                  Kf,
                  I(h),
                  1
                  /* TEXT */
                )
              ]))),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])) : L("v-if", !0),
        L(" Response body "),
        e.result.responseBody ? (j(), A("section", Wf, [
          x[7] || (x[7] = m(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Response Body",
            -1
            /* CACHED */
          )),
          m(
            "pre",
            Uf,
            I(e.result.responseBody),
            1
            /* TEXT */
          )
        ])) : L("v-if", !0),
        L(" Reproduce with jwt_tool (algorithm confusion only) "),
        a.value ? (j(), A("section", Jf, [
          x[10] || (x[10] = m(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Reproduce with jwt_tool",
            -1
            /* CACHED */
          )),
          m("p", Gf, [
            Ae(
              " Writes the exact HMAC secret (" + I(e.result.secretEncoding) + ") to a file, then forges the same token. jwt_tool keeps the original header & payload and only swaps ",
              1
              /* TEXT */
            ),
            x[8] || (x[8] = m(
              "code",
              null,
              "alg",
              -1
              /* CACHED */
            )),
            x[9] || (x[9] = Ae(
              ". ",
              -1
              /* CACHED */
            ))
          ]),
          m(
            "pre",
            qf,
            I(a.value),
            1
            /* TEXT */
          ),
          m(
            "button",
            {
              onClick: g,
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            I(s.value ? "✓ Copied" : "Copy commands"),
            1
            /* TEXT */
          ),
          e.result.secretEncoding === "DER" ? (j(), A("p", Yf, " Note: the DER variant is raw binary; jwt_tool reads the key file as text and may fail on it. ")) : L("v-if", !0)
        ])) : L("v-if", !0)
      ])
    ])) : (j(), A("div", Qf, " Select an attack to see details "));
  }
}), Xf = {
  key: 0,
  class: "h-full flex flex-col overflow-hidden text-sm"
}, e0 = { class: "px-4 py-3 border-b border-gray-700 bg-gray-900 flex items-start gap-3" }, t0 = { class: "px-2 py-0.5 rounded text-xs font-mono font-semibold shrink-0 bg-cyan-800 text-cyan-100" }, r0 = { class: "flex-1 min-w-0" }, o0 = { class: "text-gray-400 text-xs mt-0.5" }, s0 = { class: "flex-1 overflow-y-auto" }, n0 = { class: "px-4 py-3 border-b border-gray-700" }, a0 = { class: "bg-gray-900 rounded p-2 font-mono text-xs break-all text-cyan-300 select-all" }, i0 = { class: "px-4 py-3 border-b border-gray-700" }, l0 = { class: "text-gray-300 text-xs" }, c0 = {
  key: 0,
  class: "px-4 py-3 border-b border-gray-700"
}, u0 = { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, d0 = { class: "bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-48 overflow-y-auto select-all whitespace-pre" }, f0 = ["onClick"], p0 = { class: "text-xs text-gray-500 mt-2 mb-1" }, b0 = { class: "flex items-center gap-2" }, g0 = { class: "text-xs font-mono text-orange-300" }, h0 = ["onClick"], m0 = { class: "bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-24 overflow-y-auto select-all whitespace-pre-wrap break-all" }, x0 = { class: "px-4 py-3" }, v0 = { class: "bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap break-all" }, y0 = {
  key: 1,
  class: "flex items-center justify-center h-full text-gray-500 text-sm"
}, k0 = /* @__PURE__ */ vr({
  __name: "EndpointDetail",
  props: {
    endpoint: {}
  },
  setup(e) {
    const t = e, r = ce(null);
    function o(a) {
      const i = a.replace(/\r\n/g, `
`);
      return [
        { label: "PEM", value: i },
        { label: "PEM (no trailing LF)", value: i.replace(/\n+$/, "") },
        { label: "base64(PEM)", value: btoa(i) },
        { label: "DER (base64)", value: i.replace(/-----[^-]+-----/g, "").replace(/\s/g, "") }
      ];
    }
    const s = Ve(
      () => {
        var a;
        return (((a = t.endpoint) == null ? void 0 : a.pems) ?? []).map((i) => ({ pem: i, variants: o(i) }));
      }
    );
    async function n(a, i) {
      await navigator.clipboard.writeText(a), r.value = i, setTimeout(() => {
        r.value = null;
      }, 1500);
    }
    return (a, i) => e.endpoint ? (j(), A("div", Xf, [
      L(" Header "),
      m("div", e0, [
        m(
          "span",
          t0,
          I(e.endpoint.source),
          1
          /* TEXT */
        ),
        m("div", r0, [
          i[2] || (i[2] = m(
            "p",
            { class: "font-semibold text-gray-100" },
            "Discovered key endpoint",
            -1
            /* CACHED */
          )),
          m(
            "p",
            o0,
            I(e.endpoint.keyCount) + " key(s) extracted and used for algorithm-confusion attacks. ",
            1
            /* TEXT */
          )
        ])
      ]),
      m("div", s0, [
        L(" URL "),
        m("section", n0, [
          i[3] || (i[3] = m(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "URL",
            -1
            /* CACHED */
          )),
          m(
            "div",
            a0,
            I(e.endpoint.url),
            1
            /* TEXT */
          ),
          m(
            "button",
            {
              onClick: i[0] || (i[0] = (l) => n(e.endpoint.url, "url")),
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            I(r.value === "url" ? "✓ Copied" : "Copy URL"),
            1
            /* TEXT */
          )
        ]),
        L(" Keys extracted "),
        m("section", i0, [
          i[4] || (i[4] = m(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Keys extracted",
            -1
            /* CACHED */
          )),
          m(
            "p",
            l0,
            I(e.endpoint.keyCount),
            1
            /* TEXT */
          )
        ]),
        L(" PEM keys + the HMAC secret encodings used in algorithm confusion "),
        s.value.length ? (j(), A("section", c0, [
          m(
            "p",
            u0,
            " PEM-encoded " + I(s.value.length > 1 ? "keys" : "key") + " used in algorithm-confusion attacks ",
            1
            /* TEXT */
          ),
          (j(!0), A(
            se,
            null,
            Ne(s.value, (l, u) => (j(), A("div", {
              key: u,
              class: "mb-4 last:mb-0"
            }, [
              m(
                "pre",
                d0,
                I(l.pem),
                1
                /* TEXT */
              ),
              m("button", {
                onClick: (c) => n(l.pem, "pem-" + u),
                class: "mt-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
              }, I(r.value === "pem-" + u ? "✓ Copied" : "Copy PEM"), 9, f0),
              m(
                "p",
                p0,
                " HMAC secret encodings tried with this key (key " + I(u + 1) + "): ",
                1
                /* TEXT */
              ),
              (j(!0), A(
                se,
                null,
                Ne(l.variants, (c, p) => (j(), A("div", {
                  key: p,
                  class: "mb-1.5"
                }, [
                  m("div", b0, [
                    m(
                      "span",
                      g0,
                      I(c.label),
                      1
                      /* TEXT */
                    ),
                    m("button", {
                      onClick: (g) => n(c.value, `var-${u}-${p}`),
                      class: "text-xs text-gray-500 hover:text-gray-300 transition-colors"
                    }, I(r.value === `var-${u}-${p}` ? "✓ Copied" : "Copy"), 9, h0)
                  ]),
                  m(
                    "pre",
                    m0,
                    I(c.value),
                    1
                    /* TEXT */
                  )
                ]))),
                128
                /* KEYED_FRAGMENT */
              ))
            ]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : L("v-if", !0),
        L(" Raw content returned "),
        m("section", x0, [
          i[5] || (i[5] = m(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Content returned by URL",
            -1
            /* CACHED */
          )),
          m(
            "pre",
            v0,
            I(e.endpoint.content || "(empty)"),
            1
            /* TEXT */
          ),
          m(
            "button",
            {
              onClick: i[1] || (i[1] = (l) => n(e.endpoint.content, "content")),
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            I(r.value === "content" ? "✓ Copied" : "Copy Content"),
            1
            /* TEXT */
          )
        ])
      ])
    ])) : (j(), A("div", y0, " Select an item to see details "));
  }
}), Pa = /* @__PURE__ */ ba("config", () => {
  const e = ce({ ...Zs });
  let t = null;
  function r(a) {
    t = a;
  }
  async function o() {
    if (t)
      try {
        const a = await t.storage.get("config");
        a && typeof a == "object" && (e.value = { ...Zs, ...a });
      } catch {
      }
  }
  async function s() {
    if (t)
      try {
        await t.storage.set("config", e.value);
      } catch {
      }
  }
  function n(a) {
    e.value = { ...e.value, ...a };
  }
  return { config: e, setSDK: r, load: o, save: s, update: n };
}), w0 = { class: "h-full overflow-y-auto px-4 py-4 space-y-6 text-sm" }, _0 = { class: "space-y-3" }, S0 = ["value"], C0 = ["value"], T0 = { class: "space-y-2" }, P0 = ["checked", "onChange"], j0 = { class: "text-gray-300" }, A0 = { class: "flex items-start gap-2 cursor-pointer select-none" }, $0 = { class: "pt-2 flex gap-3" }, O0 = {
  key: 0,
  class: "text-xs text-green-400 self-center"
}, I0 = /* @__PURE__ */ vr({
  __name: "ConfigPanel",
  setup(e) {
    const t = Pa(), r = Wt({ ...t.config }), o = ce(!1);
    Ye(() => t.config, (n) => Object.assign(r, n), { deep: !0 });
    async function s() {
      t.update({ ...r }), await t.save(), o.value = !0, setTimeout(() => {
        o.value = !1;
      }, 2e3);
    }
    return (n, a) => (j(), A("div", w0, [
      m("section", null, [
        a[7] || (a[7] = m(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "JKU / X5U Spoofing",
          -1
          /* CACHED */
        )),
        a[8] || (a[8] = m(
          "label",
          { class: "block mb-1 text-gray-300" },
          "JWKS Endpoint URL",
          -1
          /* CACHED */
        )),
        Ct(m(
          "input",
          {
            "onUpdate:modelValue": a[0] || (a[0] = (i) => r.jwksUrl = i),
            type: "url",
            placeholder: "https://attacker.example.com/jwks.json",
            class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [Tr, r.jwksUrl]
        ]),
        a[9] || (a[9] = m(
          "p",
          { class: "text-xs text-gray-500 mt-1" },
          " Host the generated JWKS JSON at this URL so the target server can fetch it. ",
          -1
          /* CACHED */
        ))
      ]),
      m("section", null, [
        a[13] || (a[13] = m(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Custom Keys / Certificate",
          -1
          /* CACHED */
        )),
        m("div", _0, [
          m("div", null, [
            a[10] || (a[10] = m(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Public Key (PEM)",
              -1
              /* CACHED */
            )),
            Ct(m(
              "textarea",
              {
                "onUpdate:modelValue": a[1] || (a[1] = (i) => r.customPublicKeyPem = i),
                rows: "4",
                placeholder: `-----BEGIN PUBLIC KEY-----
...`,
                class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [Tr, r.customPublicKeyPem]
            ])
          ]),
          m("div", null, [
            a[11] || (a[11] = m(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Private Key (PEM) — for JKU/X5U spoofing",
              -1
              /* CACHED */
            )),
            Ct(m(
              "textarea",
              {
                "onUpdate:modelValue": a[2] || (a[2] = (i) => r.customPrivateKeyPem = i),
                rows: "4",
                placeholder: `-----BEGIN PRIVATE KEY-----
...`,
                class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [Tr, r.customPrivateKeyPem]
            ])
          ]),
          m("div", null, [
            a[12] || (a[12] = m(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Certificate (PEM) — for algorithm confusion",
              -1
              /* CACHED */
            )),
            Ct(m(
              "textarea",
              {
                "onUpdate:modelValue": a[3] || (a[3] = (i) => r.customCertPem = i),
                rows: "4",
                placeholder: `-----BEGIN CERTIFICATE-----
...`,
                class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [Tr, r.customCertPem]
            ])
          ])
        ])
      ]),
      m("section", null, [
        a[14] || (a[14] = m(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Additional JWKS Paths",
          -1
          /* CACHED */
        )),
        m("textarea", {
          value: r.extraJwksPaths.join(`
`),
          onInput: a[4] || (a[4] = (i) => r.extraJwksPaths = i.target.value.split(`
`).map((l) => l.trim()).filter(Boolean)),
          rows: "4",
          placeholder: `/custom/.well-known/jwks.json
/api/v2/auth/keys`,
          class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
        }, null, 40, S0),
        a[15] || (a[15] = m(
          "p",
          { class: "text-xs text-gray-500 mt-1" },
          "One path per line. Probed in addition to the built-in list of 15 common paths.",
          -1
          /* CACHED */
        ))
      ]),
      m("section", null, [
        a[16] || (a[16] = m(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Custom Wordlist (Weak Secret)",
          -1
          /* CACHED */
        )),
        m("textarea", {
          value: r.customWordlist.join(`
`),
          onInput: a[5] || (a[5] = (i) => r.customWordlist = i.target.value.split(`
`).map((l) => l.trim()).filter(Boolean)),
          rows: "4",
          placeholder: `mysecret
appkey123`,
          class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
        }, null, 40, C0),
        a[17] || (a[17] = m(
          "p",
          { class: "text-xs text-gray-500 mt-1" },
          "One word per line. Appended to the built-in list of ~120 common JWT secrets.",
          -1
          /* CACHED */
        ))
      ]),
      m("section", null, [
        a[18] || (a[18] = m(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Enabled Attacks",
          -1
          /* CACHED */
        )),
        m("div", T0, [
          (j(!0), A(
            se,
            null,
            Ne(ze(Vd), (i, l) => (j(), A("label", {
              key: l,
              class: "flex items-center gap-2 cursor-pointer select-none"
            }, [
              m("input", {
                type: "checkbox",
                checked: r.enabledAttacks[l] ?? !0,
                onChange: (u) => r.enabledAttacks[l] = u.target.checked,
                class: "accent-blue-500"
              }, null, 40, P0),
              m(
                "span",
                j0,
                I(i),
                1
                /* TEXT */
              )
            ]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      m("section", null, [
        a[20] || (a[20] = m(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Experimental",
          -1
          /* CACHED */
        )),
        m("label", A0, [
          Ct(m(
            "input",
            {
              type: "checkbox",
              "onUpdate:modelValue": a[6] || (a[6] = (i) => r.enableKeyRecovery = i),
              class: "accent-blue-500 mt-0.5"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [Kl, r.enableKeyRecovery]
          ]),
          a[19] || (a[19] = m(
            "span",
            { class: "text-gray-300" },
            [
              Ae(" RSA public-key recovery from HTTP history "),
              m("span", { class: "block text-xs text-gray-500 mt-0.5" }, [
                Ae(" Attempts to recover the signing key from 2+ same-host RS/PS JWTs, then runs algorithm-confusion with it. Off by default — the math (sig"),
                m("sup", null, "65537"),
                Ae(") is extremely slow in Caido's JS runtime and may take many minutes or not finish. ")
              ])
            ],
            -1
            /* CACHED */
          ))
        ])
      ]),
      m("div", $0, [
        m("button", {
          onClick: s,
          class: "px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
        }, " Save "),
        o.value ? (j(), A("span", O0, "✓ Saved")) : L("v-if", !0)
      ])
    ]));
  }
}), E0 = {
  id: "plugin--jwt-attacker",
  class: "h-full flex flex-col bg-gray-950 text-gray-200 overflow-hidden"
}, z0 = { class: "flex items-center gap-1 px-3 py-2 border-b border-gray-700 bg-gray-900 shrink-0" }, L0 = ["onClick"], R0 = { class: "flex-1 flex overflow-hidden min-h-0" }, M0 = { class: "w-[42%] shrink-0 border-r border-gray-700 overflow-hidden flex flex-col" }, N0 = { class: "flex-1 overflow-hidden" }, F0 = { class: "flex-1 overflow-hidden" }, D0 = { class: "bg-gray-900 border border-gray-700 rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl" }, V0 = { class: "flex items-center justify-between px-4 py-3 border-b border-gray-700" }, B0 = { class: "flex-1 overflow-y-auto px-4 py-4 space-y-4" }, H0 = { class: "bg-gray-800 rounded p-3 text-xs text-green-300 overflow-x-auto select-all max-h-48" }, K0 = { key: 0 }, W0 = { class: "bg-gray-800 rounded p-3 text-xs text-yellow-300 overflow-x-auto select-all max-h-36" }, U0 = /* @__PURE__ */ vr({
  __name: "App",
  setup(e) {
    const t = ce("results"), r = ce(null), o = ce(null), s = ce(null);
    function n(u) {
      r.value = u, o.value = null;
    }
    function a(u) {
      o.value = u, r.value = null;
    }
    const i = [
      { id: "results", label: "Results" },
      { id: "config", label: "Configuration" }
    ];
    async function l(u) {
      await navigator.clipboard.writeText(u);
    }
    return (u, c) => {
      var p, g;
      return j(), A("div", E0, [
        L(" Top bar "),
        m("div", z0, [
          c[5] || (c[5] = m(
            "span",
            { class: "text-base font-bold text-yellow-400 mr-2" },
            "🔑 JWT Attacker",
            -1
            /* CACHED */
          )),
          (j(), A(
            se,
            null,
            Ne(i, (b) => m("button", {
              key: b.id,
              onClick: (x) => t.value = b.id,
              class: De([
                "px-3 py-1 rounded text-xs font-medium transition-colors",
                t.value === b.id ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-200"
              ])
            }, I(b.label), 11, L0)),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        L(" Results tab: split pane "),
        Ct(m(
          "div",
          R0,
          [
            m("div", M0, [
              He(mf, {
                "selected-id": (p = r.value) == null ? void 0 : p.id,
                "selected-endpoint-url": (g = o.value) == null ? void 0 : g.url,
                onSelect: n,
                onSelectEndpoint: a,
                onShowJwks: c[0] || (c[0] = (b) => s.value = b)
              }, null, 8, ["selected-id", "selected-endpoint-url"])
            ]),
            m("div", N0, [
              o.value ? (j(), Co(k0, {
                key: 0,
                endpoint: o.value
              }, null, 8, ["endpoint"])) : (j(), Co(Zf, {
                key: 1,
                result: r.value ?? null
              }, null, 8, ["result"]))
            ])
          ],
          512
          /* NEED_PATCH */
        ), [
          [ks, t.value === "results"]
        ]),
        L(" Config tab "),
        Ct(m(
          "div",
          F0,
          [
            He(I0)
          ],
          512
          /* NEED_PATCH */
        ), [
          [ks, t.value === "config"]
        ]),
        L(" JWKS modal "),
        s.value ? (j(), A("div", {
          key: 0,
          class: "fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6",
          onClick: c[4] || (c[4] = Gl((b) => s.value = null, ["self"]))
        }, [
          m("div", D0, [
            m("div", V0, [
              c[6] || (c[6] = m(
                "h2",
                { class: "text-sm font-semibold" },
                "JKU/X5U Spoofing — JWKS Payload",
                -1
                /* CACHED */
              )),
              m("button", {
                onClick: c[1] || (c[1] = (b) => s.value = null),
                class: "text-gray-500 hover:text-gray-300 text-lg leading-none"
              }, "✕")
            ]),
            m("div", B0, [
              m("div", null, [
                c[7] || (c[7] = m(
                  "p",
                  { class: "text-xs text-gray-400 mb-2" },
                  " Host this JSON at your configured JWKS URL so the server can fetch the attacker's public key. ",
                  -1
                  /* CACHED */
                )),
                m(
                  "pre",
                  H0,
                  I(s.value.jwksJson),
                  1
                  /* TEXT */
                ),
                m("button", {
                  onClick: c[2] || (c[2] = (b) => l(s.value.jwksJson)),
                  class: "mt-1 text-xs text-gray-500 hover:text-gray-300"
                }, "Copy JWKS")
              ]),
              s.value.jwksPrivateKey ? (j(), A("div", K0, [
                c[8] || (c[8] = m(
                  "p",
                  { class: "text-xs text-gray-400 mb-2" },
                  "Private key used to sign the spoofed tokens:",
                  -1
                  /* CACHED */
                )),
                m(
                  "pre",
                  W0,
                  I(s.value.jwksPrivateKey),
                  1
                  /* TEXT */
                ),
                m("button", {
                  onClick: c[3] || (c[3] = (b) => l(s.value.jwksPrivateKey)),
                  class: "mt-1 text-xs text-gray-500 hover:text-gray-300"
                }, "Copy Private Key")
              ])) : L("v-if", !0)
            ])
          ])
        ])) : L("v-if", !0)
      ]);
    };
  }
});
function J0(e) {
  console.log("[JWT Attacker] init() called");
  const t = Ql(U0), r = ec();
  t.use(r), t.use(Yc, { unstyled: !0, pt: Dd });
  const o = document.createElement("div");
  o.id = "plugin--jwt-attacker-root", o.style.cssText = "height:100%;width:100%;overflow:hidden;", t.mount(o), e.navigation.addPage("/jwt-attacker", { body: o }), e.sidebar.registerItem("JWT Attacker", "/jwt-attacker", { icon: "fas fa-key" });
  const s = Pa();
  s.setSDK(e), s.load();
  const n = Sa();
  e.backend.onEvent("jwt-attack-started", ({ sessionId: a, requestId: i, total: l }) => {
    console.log("[JWT Attacker] event: jwt-attack-started", { sessionId: a, requestId: i, total: l }), n.startSession(a, i, l), e.navigation.goTo("/jwt-attacker");
  }), e.backend.onEvent("jwt-attack-result", ({ sessionId: a, result: i }) => {
    n.addResult(a, i);
  }), e.backend.onEvent("jwt-attack-complete", ({ sessionId: a, errors: i }) => {
    console.log("[JWT Attacker] event: jwt-attack-complete", { sessionId: a, errors: i }), n.completeSession(a, i);
  }), e.backend.onEvent("jwt-key-recovery-progress", ({ sessionId: a, message: i }) => {
    n.logKeyRecovery(a, i);
  }), e.backend.onEvent("jwt-key-recovery-complete", ({ sessionId: a, keys: i }) => {
    for (const l of i) n.addRecoveredKey(a, l);
  }), e.backend.onEvent("jwks-payload", ({ sessionId: a, jwksJson: i, privateKeyPem: l }) => {
    n.setJWKSPayload(a, i, l);
  }), e.backend.onEvent("jwks-found", ({ sessionId: a, url: i, source: l, keyCount: u, content: c, pems: p }) => {
    n.addDiscoveredEndpoint(a, { url: i, source: l, keyCount: u, content: c, pems: p });
  }), e.commands.register("jwt-attacker.attack", {
    name: "Attack JWT",
    group: "JWT Attacker",
    run: async (a) => {
      console.log("[JWT Attacker] run() called, context.type =", a.type);
      const i = [];
      if (a.type === "RequestRowContext")
        for (const u of a.requests)
          i.push(u.id);
      else if (a.type === "RequestContext") {
        const u = a.request;
        "id" in u && u.id && i.push(u.id);
      }
      if (console.log("[JWT Attacker] requestIds:", i), i.length === 0) {
        console.warn("[JWT Attacker] No request IDs found in context");
        return;
      }
      const l = JSON.parse(JSON.stringify(s.config));
      console.log("[JWT Attacker] config being sent:", l);
      for (const u of i) {
        console.log("[JWT Attacker] calling backend attackJwt for id:", u);
        try {
          const c = await e.backend.attackJwt(u, l);
          console.log("[JWT Attacker] backend call returned:", c);
        } catch (c) {
          console.error("[JWT Attacker] backend call failed:", c);
        }
      }
    }
  }), e.menu.registerItem({
    type: "RequestRow",
    commandId: "jwt-attacker.attack",
    leadingIcon: "fas fa-key"
  }), e.menu.registerItem({
    type: "Request",
    commandId: "jwt-attacker.attack",
    leadingIcon: "fas fa-key"
  }), console.log("[JWT Attacker] init() complete — commands and menu items registered");
}
export {
  J0 as init
};
