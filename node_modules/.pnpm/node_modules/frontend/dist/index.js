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
const X = {}, Ft = [], qe = () => {
}, Xs = () => !1, Hr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), zo = (e) => e.startsWith("onUpdate:"), ve = Object.assign, $o = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, ja = Object.prototype.hasOwnProperty, q = (e, t) => ja.call(e, t), L = Array.isArray, Dt = (e) => mr(e) === "[object Map]", Kr = (e) => mr(e) === "[object Set]", ts = (e) => mr(e) === "[object Date]", D = (e) => typeof e == "function", le = (e) => typeof e == "string", Ye = (e) => typeof e == "symbol", re = (e) => e !== null && typeof e == "object", en = (e) => (re(e) || D(e)) && D(e.then) && D(e.catch), tn = Object.prototype.toString, mr = (e) => tn.call(e), Pa = (e) => mr(e).slice(8, -1), rn = (e) => mr(e) === "[object Object]", Eo = (e) => le(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Zt = /* @__PURE__ */ Io(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Wr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (r) => t[r] || (t[r] = e(r));
}, Aa = /-\w/g, mt = Wr(
  (e) => e.replace(Aa, (t) => t.slice(1).toUpperCase())
), Oa = /\B([A-Z])/g, It = Wr(
  (e) => e.replace(Oa, "-$1").toLowerCase()
), on = Wr((e) => e.charAt(0).toUpperCase() + e.slice(1)), oo = Wr(
  (e) => e ? `on${on(e)}` : ""
), gt = (e, t) => !Object.is(e, t), Pr = (e, ...t) => {
  for (let r = 0; r < e.length; r++)
    e[r](...t);
}, sn = (e, t, r, o = !1) => {
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
let rs;
const Ur = () => rs || (rs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Jr(e) {
  if (L(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const o = e[r], s = le(o) ? Ea(o) : Jr(o);
      if (s)
        for (const n in s)
          t[n] = s[n];
    }
    return t;
  } else if (le(e) || re(e))
    return e;
}
const Ia = /;(?![^(]*\))/g, za = /:([^]+)/, $a = /\/\*[^]*?\*\//g;
function Ea(e) {
  const t = {};
  return e.replace($a, "").split(Ia).forEach((r) => {
    if (r) {
      const o = r.split(za);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function Je(e) {
  let t = "";
  if (le(e))
    t = e;
  else if (L(e))
    for (let r = 0; r < e.length; r++) {
      const o = Je(e[r]);
      o && (t += o + " ");
    }
  else if (re(e))
    for (const r in e)
      e[r] && (t += r + " ");
  return t.trim();
}
const La = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ra = /* @__PURE__ */ Io(La);
function nn(e) {
  return !!e || e === "";
}
function Na(e, t) {
  if (e.length !== t.length) return !1;
  let r = !0;
  for (let o = 0; r && o < e.length; o++)
    r = Gr(e[o], t[o]);
  return r;
}
function Gr(e, t) {
  if (e === t) return !0;
  let r = ts(e), o = ts(t);
  if (r || o)
    return r && o ? e.getTime() === t.getTime() : !1;
  if (r = Ye(e), o = Ye(t), r || o)
    return e === t;
  if (r = L(e), o = L(t), r || o)
    return r && o ? Na(e, t) : !1;
  if (r = re(e), o = re(t), r || o) {
    if (!r || !o)
      return !1;
    const s = Object.keys(e).length, n = Object.keys(t).length;
    if (s !== n)
      return !1;
    for (const a in e) {
      const i = e.hasOwnProperty(a), l = t.hasOwnProperty(a);
      if (i && !l || !i && l || !Gr(e[a], t[a]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function an(e, t) {
  return e.findIndex((r) => Gr(r, t));
}
const ln = (e) => !!(e && e.__v_isRef === !0), F = (e) => le(e) ? e : e == null ? "" : L(e) || re(e) && (e.toString === tn || !D(e.toString)) ? ln(e) ? F(e.value) : JSON.stringify(e, cn, 2) : String(e), cn = (e, t) => ln(t) ? cn(e, t.value) : Dt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (r, [o, s], n) => (r[so(o, n) + " =>"] = s, r),
    {}
  )
} : Kr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((r) => so(r))
} : Ye(t) ? so(t) : re(t) && !L(t) && !rn(t) ? String(t) : t, so = (e, t = "") => {
  var r;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ye(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e
  );
};
/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let he;
class un {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = he, !t && he && (this.index = (he.scopes || (he.scopes = [])).push(
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
      const r = he;
      try {
        return he = this, t();
      } finally {
        he = r;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = he, he = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (he = this.prevScope, this.prevScope = void 0);
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
function dn(e) {
  return new un(e);
}
function fn() {
  return he;
}
function Ma(e, t = !1) {
  he && he.cleanups.push(e);
}
let te;
const no = /* @__PURE__ */ new WeakSet();
class pn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, he && he.active && he.effects.push(this);
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || gn(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, os(this), hn(this);
    const t = te, r = De;
    te = this, De = !0;
    try {
      return this.fn();
    } finally {
      mn(this), te = t, De = r, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        No(t);
      this.deps = this.depsTail = void 0, os(this), this.onStop && this.onStop(), this.flags &= -2;
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
let bn = 0, Xt, er;
function gn(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = er, er = e;
    return;
  }
  e.next = Xt, Xt = e;
}
function Lo() {
  bn++;
}
function Ro() {
  if (--bn > 0)
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
function hn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function mn(e) {
  let t, r = e.depsTail, o = r;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === r && (r = s), No(o), Fa(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = r;
}
function xo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (xn(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function xn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === cr) || (e.globalVersion = cr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !xo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, r = te, o = De;
  te = e, De = !0;
  try {
    hn(e);
    const s = e.fn(e._value);
    (t.version === 0 || gt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    te = r, De = o, mn(e), e.flags &= -3;
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
function Fa(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
let De = !0;
const vn = [];
function it() {
  vn.push(De), De = !1;
}
function lt() {
  const e = vn.pop();
  De = e === void 0 ? !0 : e;
}
function os(e) {
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
class Da {
  constructor(t, r) {
    this.sub = t, this.dep = r, this.version = r.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Mo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!te || !De || te === this.computed)
      return;
    let r = this.activeLink;
    if (r === void 0 || r.sub !== te)
      r = this.activeLink = new Da(te, this), te.deps ? (r.prevDep = te.depsTail, te.depsTail.nextDep = r, te.depsTail = r) : te.deps = te.depsTail = r, yn(r);
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
    Lo();
    try {
      for (let r = this.subs; r; r = r.prevSub)
        r.sub.notify() && r.sub.dep.notify();
    } finally {
      Ro();
    }
  }
}
function yn(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        yn(o);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), e.dep.subs = e;
  }
}
const Ir = /* @__PURE__ */ new WeakMap(), Pt = Symbol(
  ""
), vo = Symbol(
  ""
), ur = Symbol(
  ""
);
function xe(e, t, r) {
  if (De && te) {
    let o = Ir.get(e);
    o || Ir.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(r);
    s || (o.set(r, s = new Mo()), s.map = o, s.key = r), s.track();
  }
}
function ot(e, t, r, o, s, n) {
  const a = Ir.get(e);
  if (!a) {
    cr++;
    return;
  }
  const i = (l) => {
    l && l.trigger();
  };
  if (Lo(), t === "clear")
    a.forEach(i);
  else {
    const l = L(e), u = l && Eo(r);
    if (l && r === "length") {
      const c = Number(o);
      a.forEach((p, h) => {
        (h === "length" || h === ur || !Ye(h) && h >= c) && i(p);
      });
    } else
      switch ((r !== void 0 || a.has(void 0)) && i(a.get(r)), u && i(a.get(ur)), t) {
        case "add":
          l ? u && i(a.get("length")) : (i(a.get(Pt)), Dt(e) && i(a.get(vo)));
          break;
        case "delete":
          l || (i(a.get(Pt)), Dt(e) && i(a.get(vo)));
          break;
        case "set":
          Dt(e) && i(a.get(Pt));
          break;
      }
  }
  Ro();
}
function Va(e, t) {
  const r = Ir.get(e);
  return r && r.get(t);
}
function $t(e) {
  const t = G(e);
  return t === e ? t : (xe(t, "iterate", ur), Le(e) ? t : t.map(pe));
}
function qr(e) {
  return xe(e = G(e), "iterate", ur), e;
}
const Ba = {
  __proto__: null,
  [Symbol.iterator]() {
    return ao(this, Symbol.iterator, pe);
  },
  concat(...e) {
    return $t(this).concat(
      ...e.map((t) => L(t) ? $t(t) : t)
    );
  },
  entries() {
    return ao(this, "entries", (e) => (e[1] = pe(e[1]), e));
  },
  every(e, t) {
    return Ze(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ze(this, "filter", e, t, (r) => r.map(pe), arguments);
  },
  find(e, t) {
    return Ze(this, "find", e, t, pe, arguments);
  },
  findIndex(e, t) {
    return Ze(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ze(this, "findLast", e, t, pe, arguments);
  },
  findLastIndex(e, t) {
    return Ze(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ze(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return io(this, "includes", e);
  },
  indexOf(...e) {
    return io(this, "indexOf", e);
  },
  join(e) {
    return $t(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return io(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ze(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Gt(this, "pop");
  },
  push(...e) {
    return Gt(this, "push", e);
  },
  reduce(e, ...t) {
    return ss(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ss(this, "reduceRight", e, t);
  },
  shift() {
    return Gt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ze(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Gt(this, "splice", e);
  },
  toReversed() {
    return $t(this).toReversed();
  },
  toSorted(e) {
    return $t(this).toSorted(e);
  },
  toSpliced(...e) {
    return $t(this).toSpliced(...e);
  },
  unshift(...e) {
    return Gt(this, "unshift", e);
  },
  values() {
    return ao(this, "values", pe);
  }
};
function ao(e, t, r) {
  const o = qr(e), s = o[t]();
  return o !== e && !Le(e) && (s._next = s.next, s.next = () => {
    const n = s._next();
    return n.done || (n.value = r(n.value)), n;
  }), s;
}
const Ha = Array.prototype;
function Ze(e, t, r, o, s, n) {
  const a = qr(e), i = a !== e && !Le(e), l = a[t];
  if (l !== Ha[t]) {
    const p = l.apply(e, n);
    return i ? pe(p) : p;
  }
  let u = r;
  a !== e && (i ? u = function(p, h) {
    return r.call(this, pe(p), h, e);
  } : r.length > 2 && (u = function(p, h) {
    return r.call(this, p, h, e);
  }));
  const c = l.call(a, u, o);
  return i && s ? s(c) : c;
}
function ss(e, t, r, o) {
  const s = qr(e);
  let n = r;
  return s !== e && (Le(e) ? r.length > 3 && (n = function(a, i, l) {
    return r.call(this, a, i, l, e);
  }) : n = function(a, i, l) {
    return r.call(this, a, pe(i), l, e);
  }), s[t](n, ...o);
}
function io(e, t, r) {
  const o = G(e);
  xe(o, "iterate", ur);
  const s = o[t](...r);
  return (s === -1 || s === !1) && Vo(r[0]) ? (r[0] = G(r[0]), o[t](...r)) : s;
}
function Gt(e, t, r = []) {
  it(), Lo();
  const o = G(e)[t].apply(e, r);
  return Ro(), lt(), o;
}
const Ka = /* @__PURE__ */ Io("__proto__,__v_isRef,__isVue"), kn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ye)
);
function Wa(e) {
  Ye(e) || (e = String(e));
  const t = G(this);
  return xe(t, "has", e), t.hasOwnProperty(e);
}
class wn {
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
      return o === (s ? n ? ti : Tn : n ? Cn : Sn).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const a = L(t);
    if (!s) {
      let l;
      if (a && (l = Ba[r]))
        return l;
      if (r === "hasOwnProperty")
        return Wa;
    }
    const i = Reflect.get(
      t,
      r,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      ie(t) ? t : o
    );
    if ((Ye(r) ? kn.has(r) : Ka(r)) || (s || xe(t, "get", r), n))
      return i;
    if (ie(i)) {
      const l = a && Eo(r) ? i : i.value;
      return s && re(l) ? zr(l) : l;
    }
    return re(i) ? s ? zr(i) : Wt(i) : i;
  }
}
class _n extends wn {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, r, o, s) {
    let n = t[r];
    if (!this._isShallow) {
      const l = xt(n);
      if (!Le(o) && !xt(o) && (n = G(n), o = G(o)), !L(t) && ie(n) && !ie(o))
        return l || (n.value = o), !0;
    }
    const a = L(t) && Eo(r) ? Number(r) < t.length : q(t, r), i = Reflect.set(
      t,
      r,
      o,
      ie(t) ? t : s
    );
    return t === G(s) && (a ? gt(o, n) && ot(t, "set", r, o) : ot(t, "add", r, o)), i;
  }
  deleteProperty(t, r) {
    const o = q(t, r);
    t[r];
    const s = Reflect.deleteProperty(t, r);
    return s && o && ot(t, "delete", r, void 0), s;
  }
  has(t, r) {
    const o = Reflect.has(t, r);
    return (!Ye(r) || !kn.has(r)) && xe(t, "has", r), o;
  }
  ownKeys(t) {
    return xe(
      t,
      "iterate",
      L(t) ? "length" : Pt
    ), Reflect.ownKeys(t);
  }
}
class Ua extends wn {
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
const Ja = /* @__PURE__ */ new _n(), Ga = /* @__PURE__ */ new Ua(), qa = /* @__PURE__ */ new _n(!0);
const yo = (e) => e, wr = (e) => Reflect.getPrototypeOf(e);
function Ya(e, t, r) {
  return function(...o) {
    const s = this.__v_raw, n = G(s), a = Dt(n), i = e === "entries" || e === Symbol.iterator && a, l = e === "keys" && a, u = s[e](...o), c = r ? yo : t ? $r : pe;
    return !t && xe(
      n,
      "iterate",
      l ? vo : Pt
    ), {
      // iterator protocol
      next() {
        const { value: p, done: h } = u.next();
        return h ? { value: p, done: h } : {
          value: i ? [c(p[0]), c(p[1])] : c(p),
          done: h
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function _r(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Qa(e, t) {
  const r = {
    get(s) {
      const n = this.__v_raw, a = G(n), i = G(s);
      e || (gt(s, i) && xe(a, "get", s), xe(a, "get", i));
      const { has: l } = wr(a), u = t ? yo : e ? $r : pe;
      if (l.call(a, s))
        return u(n.get(s));
      if (l.call(a, i))
        return u(n.get(i));
      n !== a && n.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && xe(G(s), "iterate", Pt), s.size;
    },
    has(s) {
      const n = this.__v_raw, a = G(n), i = G(s);
      return e || (gt(s, i) && xe(a, "has", s), xe(a, "has", i)), s === i ? n.has(s) : n.has(s) || n.has(i);
    },
    forEach(s, n) {
      const a = this, i = a.__v_raw, l = G(i), u = t ? yo : e ? $r : pe;
      return !e && xe(l, "iterate", Pt), i.forEach((c, p) => s.call(n, u(c), u(p), a));
    }
  };
  return ve(
    r,
    e ? {
      add: _r("add"),
      set: _r("set"),
      delete: _r("delete"),
      clear: _r("clear")
    } : {
      add(s) {
        !t && !Le(s) && !xt(s) && (s = G(s));
        const n = G(this);
        return wr(n).has.call(n, s) || (n.add(s), ot(n, "add", s, s)), this;
      },
      set(s, n) {
        !t && !Le(n) && !xt(n) && (n = G(n));
        const a = G(this), { has: i, get: l } = wr(a);
        let u = i.call(a, s);
        u || (s = G(s), u = i.call(a, s));
        const c = l.call(a, s);
        return a.set(s, n), u ? gt(n, c) && ot(a, "set", s, n) : ot(a, "add", s, n), this;
      },
      delete(s) {
        const n = G(this), { has: a, get: i } = wr(n);
        let l = a.call(n, s);
        l || (s = G(s), l = a.call(n, s)), i && i.call(n, s);
        const u = n.delete(s);
        return l && ot(n, "delete", s, void 0), u;
      },
      clear() {
        const s = G(this), n = s.size !== 0, a = s.clear();
        return n && ot(
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
    r[s] = Ya(s, e, t);
  }), r;
}
function Fo(e, t) {
  const r = Qa(e, t);
  return (o, s, n) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    q(r, s) && s in o ? r : o,
    s,
    n
  );
}
const Za = {
  get: /* @__PURE__ */ Fo(!1, !1)
}, Xa = {
  get: /* @__PURE__ */ Fo(!1, !0)
}, ei = {
  get: /* @__PURE__ */ Fo(!0, !1)
};
const Sn = /* @__PURE__ */ new WeakMap(), Cn = /* @__PURE__ */ new WeakMap(), Tn = /* @__PURE__ */ new WeakMap(), ti = /* @__PURE__ */ new WeakMap();
function ri(e) {
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
function oi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ri(Pa(e));
}
function Wt(e) {
  return xt(e) ? e : Do(
    e,
    !1,
    Ja,
    Za,
    Sn
  );
}
function si(e) {
  return Do(
    e,
    !1,
    qa,
    Xa,
    Cn
  );
}
function zr(e) {
  return Do(
    e,
    !0,
    Ga,
    ei,
    Tn
  );
}
function Do(e, t, r, o, s) {
  if (!re(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const n = oi(e);
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
function Le(e) {
  return !!(e && e.__v_isShallow);
}
function Vo(e) {
  return e ? !!e.__v_raw : !1;
}
function G(e) {
  const t = e && e.__v_raw;
  return t ? G(t) : e;
}
function Bo(e) {
  return !q(e, "__v_skip") && Object.isExtensible(e) && sn(e, "__v_skip", !0), e;
}
const pe = (e) => re(e) ? Wt(e) : e, $r = (e) => re(e) ? zr(e) : e;
function ie(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function _e(e) {
  return ni(e, !1);
}
function ni(e, t) {
  return ie(e) ? e : new ai(e, t);
}
class ai {
  constructor(t, r) {
    this.dep = new Mo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = r ? t : G(t), this._value = r ? t : pe(t), this.__v_isShallow = r;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const r = this._rawValue, o = this.__v_isShallow || Le(t) || xt(t);
    t = o ? t : G(t), gt(t, r) && (this._rawValue = t, this._value = o ? t : pe(t), this.dep.trigger());
  }
}
function $e(e) {
  return ie(e) ? e.value : e;
}
const ii = {
  get: (e, t, r) => t === "__v_raw" ? e : $e(Reflect.get(e, t, r)),
  set: (e, t, r, o) => {
    const s = e[t];
    return ie(s) && !ie(r) ? (s.value = r, !0) : Reflect.set(e, t, r, o);
  }
};
function jn(e) {
  return ht(e) ? e : new Proxy(e, ii);
}
function li(e) {
  const t = L(e) ? new Array(e.length) : {};
  for (const r in e)
    t[r] = ui(e, r);
  return t;
}
class ci {
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
    return Va(G(this._object), this._key);
  }
}
function ui(e, t, r) {
  const o = e[t];
  return ie(o) ? o : new ci(e, t, r);
}
class di {
  constructor(t, r, o) {
    this.fn = t, this.setter = r, this._value = void 0, this.dep = new Mo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = cr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    te !== this)
      return gn(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return xn(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function fi(e, t, r = !1) {
  let o, s;
  return D(e) ? o = e : (o = e.get, s = e.set), new di(o, s, r);
}
const Sr = {}, Er = /* @__PURE__ */ new WeakMap();
let St;
function pi(e, t = !1, r = St) {
  if (r) {
    let o = Er.get(r);
    o || Er.set(r, o = []), o.push(e);
  }
}
function bi(e, t, r = X) {
  const { immediate: o, deep: s, once: n, scheduler: a, augmentJob: i, call: l } = r, u = (P) => s ? P : Le(P) || s === !1 || s === 0 ? st(P, 1) : st(P);
  let c, p, h, b, v = !1, m = !1;
  if (ie(e) ? (p = () => e.value, v = Le(e)) : ht(e) ? (p = () => u(e), v = !0) : L(e) ? (m = !0, v = e.some((P) => ht(P) || Le(P)), p = () => e.map((P) => {
    if (ie(P))
      return P.value;
    if (ht(P))
      return u(P);
    if (D(P))
      return l ? l(P, 2) : P();
  })) : D(e) ? t ? p = l ? () => l(e, 2) : e : p = () => {
    if (h) {
      it();
      try {
        h();
      } finally {
        lt();
      }
    }
    const P = St;
    St = c;
    try {
      return l ? l(e, 3, [b]) : e(b);
    } finally {
      St = P;
    }
  } : p = qe, t && s) {
    const P = p, K = s === !0 ? 1 / 0 : s;
    p = () => st(P(), K);
  }
  const A = fn(), $ = () => {
    c.stop(), A && A.active && $o(A.effects, c);
  };
  if (n && t) {
    const P = t;
    t = (...K) => {
      P(...K), $();
    };
  }
  let V = m ? new Array(e.length).fill(Sr) : Sr;
  const W = (P) => {
    if (!(!(c.flags & 1) || !c.dirty && !P))
      if (t) {
        const K = c.run();
        if (s || v || (m ? K.some((fe, oe) => gt(fe, V[oe])) : gt(K, V))) {
          h && h();
          const fe = St;
          St = c;
          try {
            const oe = [
              K,
              // pass undefined as the old value when it's changed for the first time
              V === Sr ? void 0 : m && V[0] === Sr ? [] : V,
              b
            ];
            V = K, l ? l(t, 3, oe) : (
              // @ts-expect-error
              t(...oe)
            );
          } finally {
            St = fe;
          }
        }
      } else
        c.run();
  };
  return i && i(W), c = new pn(p), c.scheduler = a ? () => a(W, !1) : W, b = (P) => pi(P, !1, c), h = c.onStop = () => {
    const P = Er.get(c);
    if (P) {
      if (l)
        l(P, 4);
      else
        for (const K of P) K();
      Er.delete(c);
    }
  }, t ? o ? W(!0) : V = c.run() : a ? a(W.bind(null, !0), !0) : c.run(), $.pause = c.pause.bind(c), $.resume = c.resume.bind(c), $.stop = $, $;
}
function st(e, t = 1 / 0, r) {
  if (t <= 0 || !re(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t))
    return e;
  if (r.set(e, t), t--, ie(e))
    st(e.value, t, r);
  else if (L(e))
    for (let o = 0; o < e.length; o++)
      st(e[o], t, r);
  else if (Kr(e) || Dt(e))
    e.forEach((o) => {
      st(o, t, r);
    });
  else if (rn(e)) {
    for (const o in e)
      st(e[o], t, r);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && st(e[o], t, r);
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
    Yr(s, t, r);
  }
}
function Qe(e, t, r, o) {
  if (D(e)) {
    const s = xr(e, t, r, o);
    return s && en(s) && s.catch((n) => {
      Yr(n, t, r);
    }), s;
  }
  if (L(e)) {
    const s = [];
    for (let n = 0; n < e.length; n++)
      s.push(Qe(e[n], t, r, o));
    return s;
  }
}
function Yr(e, t, r, o = !0) {
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
  gi(e, r, s, o, a);
}
function gi(e, t, r, o = !0, s = !1) {
  if (s)
    throw e;
  console.error(e);
}
const ke = [];
let We = -1;
const Vt = [];
let pt = null, Rt = 0;
const Pn = /* @__PURE__ */ Promise.resolve();
let Lr = null;
function Ho(e) {
  const t = Lr || Pn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function hi(e) {
  let t = We + 1, r = ke.length;
  for (; t < r; ) {
    const o = t + r >>> 1, s = ke[o], n = dr(s);
    n < e || n === e && s.flags & 2 ? t = o + 1 : r = o;
  }
  return t;
}
function Ko(e) {
  if (!(e.flags & 1)) {
    const t = dr(e), r = ke[ke.length - 1];
    !r || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= dr(r) ? ke.push(e) : ke.splice(hi(t), 0, e), e.flags |= 1, An();
  }
}
function An() {
  Lr || (Lr = Pn.then(In));
}
function mi(e) {
  L(e) ? Vt.push(...e) : pt && e.id === -1 ? pt.splice(Rt + 1, 0, e) : e.flags & 1 || (Vt.push(e), e.flags |= 1), An();
}
function ns(e, t, r = We + 1) {
  for (; r < ke.length; r++) {
    const o = ke[r];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid)
        continue;
      ke.splice(r, 1), r--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
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
    for (We = 0; We < ke.length; We++) {
      const t = ke[We];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), xr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; We < ke.length; We++) {
      const t = ke[We];
      t && (t.flags &= -2);
    }
    We = -1, ke.length = 0, On(), Lr = null, (ke.length || Vt.length) && In();
  }
}
let Ee = null, zn = null;
function Rr(e) {
  const t = Ee;
  return Ee = e, zn = e && e.type.__scopeId || null, t;
}
function xi(e, t = Ee, r) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && gs(-1);
    const n = Rr(t);
    let a;
    try {
      a = e(...s);
    } finally {
      Rr(n), o._d && gs(1);
    }
    return a;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function Ct(e, t) {
  if (Ee === null)
    return e;
  const r = to(Ee), o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [n, a, i, l = X] = t[s];
    n && (D(n) && (n = {
      mounted: n,
      updated: n
    }), n.deep && st(a), o.push({
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
    l && (it(), Qe(l, r, 8, [
      e.el,
      i,
      e,
      t
    ]), lt());
  }
}
const vi = Symbol("_vte"), yi = (e) => e.__isTeleport, ki = Symbol("_leaveCb");
function Wo(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Wo(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Qr(e, t) {
  return D(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ve({ name: e.name }, t, { setup: e })
  ) : e;
}
function $n(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Nr = /* @__PURE__ */ new WeakMap();
function tr(e, t, r, o, s = !1) {
  if (L(e)) {
    e.forEach(
      (v, m) => tr(
        v,
        t && (L(t) ? t[m] : t),
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
  const n = o.shapeFlag & 4 ? to(o.component) : o.el, a = s ? null : n, { i, r: l } = e, u = t && t.r, c = i.refs === X ? i.refs = {} : i.refs, p = i.setupState, h = G(p), b = p === X ? Xs : (v) => q(h, v);
  if (u != null && u !== l) {
    if (as(t), le(u))
      c[u] = null, b(u) && (p[u] = null);
    else if (ie(u)) {
      u.value = null;
      const v = t;
      v.k && (c[v.k] = null);
    }
  }
  if (D(l))
    xr(l, i, 12, [a, c]);
  else {
    const v = le(l), m = ie(l);
    if (v || m) {
      const A = () => {
        if (e.f) {
          const $ = v ? b(l) ? p[l] : c[l] : l.value;
          if (s)
            L($) && $o($, n);
          else if (L($))
            $.includes(n) || $.push(n);
          else if (v)
            c[l] = [n], b(l) && (p[l] = c[l]);
          else {
            const V = [n];
            l.value = V, e.k && (c[e.k] = V);
          }
        } else v ? (c[l] = a, b(l) && (p[l] = a)) : m && (l.value = a, e.k && (c[e.k] = a));
      };
      if (a) {
        const $ = () => {
          A(), Nr.delete(e);
        };
        $.id = -1, Nr.set(e, $), Oe($, r);
      } else
        as(e), A();
    }
  }
}
function as(e) {
  const t = Nr.get(e);
  t && (t.flags |= 8, Nr.delete(e));
}
Ur().requestIdleCallback;
Ur().cancelIdleCallback;
const rr = (e) => !!e.type.__asyncLoader, En = (e) => e.type.__isKeepAlive;
function wi(e, t) {
  Ln(e, "a", t);
}
function _i(e, t) {
  Ln(e, "da", t);
}
function Ln(e, t, r = we) {
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
      En(s.parent.vnode) && Si(o, t, r, s), s = s.parent;
  }
}
function Si(e, t, r, o) {
  const s = Zr(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  Nn(() => {
    $o(o[t], s);
  }, r);
}
function Zr(e, t, r = we, o = !1) {
  if (r) {
    const s = r[e] || (r[e] = []), n = t.__weh || (t.__weh = (...a) => {
      it();
      const i = vr(r), l = Qe(t, r, e, a);
      return i(), lt(), l;
    });
    return o ? s.unshift(n) : s.push(n), n;
  }
}
const ct = (e) => (t, r = we) => {
  (!pr || e === "sp") && Zr(e, (...o) => t(...o), r);
}, Ci = ct("bm"), Rn = ct("m"), Ti = ct(
  "bu"
), ji = ct("u"), Pi = ct(
  "bum"
), Nn = ct("um"), Ai = ct(
  "sp"
), Oi = ct("rtg"), Ii = ct("rtc");
function zi(e, t = we) {
  Zr("ec", e, t);
}
const $i = Symbol.for("v-ndc");
function rt(e, t, r, o) {
  let s;
  const n = r, a = L(e);
  if (a || le(e)) {
    const i = a && ht(e);
    let l = !1, u = !1;
    i && (l = !Le(e), u = xt(e), e = qr(e)), s = new Array(e.length);
    for (let c = 0, p = e.length; c < p; c++)
      s[c] = t(
        l ? u ? $r(pe(e[c])) : pe(e[c]) : e[c],
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
const ko = (e) => e ? sa(e) ? to(e) : ko(e.parent) : null, or = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ve(/* @__PURE__ */ Object.create(null), {
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
    $options: (e) => Fn(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Ko(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ho.bind(e.proxy)),
    $watch: (e) => rl.bind(e)
  })
), lo = (e, t) => e !== X && !e.__isScriptSetup && q(e, t), Ei = {
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
    let p, h;
    if (c)
      return t === "$attrs" && xe(e.attrs, "get", ""), c(e);
    if (
      // css module (injected by vue-loader)
      (p = i.__cssModules) && (p = p[t])
    )
      return p;
    if (r !== X && q(r, t))
      return a[t] = 4, r[t];
    if (
      // global properties
      h = l.config.globalProperties, q(h, t)
    )
      return h[t];
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
function is(e) {
  return L(e) ? e.reduce(
    (t, r) => (t[r] = null, t),
    {}
  ) : e;
}
let wo = !0;
function Li(e) {
  const t = Fn(e), r = e.proxy, o = e.ctx;
  wo = !1, t.beforeCreate && ls(t.beforeCreate, e, "bc");
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
    mounted: h,
    beforeUpdate: b,
    updated: v,
    activated: m,
    deactivated: A,
    beforeDestroy: $,
    beforeUnmount: V,
    destroyed: W,
    unmounted: P,
    render: K,
    renderTracked: fe,
    renderTriggered: oe,
    errorCaptured: M,
    serverPrefetch: B,
    // public API
    expose: Q,
    inheritAttrs: ae,
    // assets
    components: ce,
    directives: be,
    filters: Se
  } = t;
  if (u && Ri(u, o, null), a)
    for (const N in a) {
      const J = a[N];
      D(J) && (o[N] = J.bind(r));
    }
  if (s) {
    const N = s.call(r, r);
    re(N) && (e.data = Wt(N));
  }
  if (wo = !0, n)
    for (const N in n) {
      const J = n[N], Ce = D(J) ? J.bind(r, r) : D(J.get) ? J.get.bind(r, r) : qe, Te = !D(J) && D(J.set) ? J.set.bind(r) : qe, ue = at({
        get: Ce,
        set: Te
      });
      Object.defineProperty(o, N, {
        enumerable: !0,
        configurable: !0,
        get: () => ue.value,
        set: (de) => ue.value = de
      });
    }
  if (i)
    for (const N in i)
      Mn(i[N], o, r, N);
  if (l) {
    const N = D(l) ? l.call(r) : l;
    Reflect.ownKeys(N).forEach((J) => {
      Bi(J, N[J]);
    });
  }
  c && ls(c, e, "c");
  function Z(N, J) {
    L(J) ? J.forEach((Ce) => N(Ce.bind(r))) : J && N(J.bind(r));
  }
  if (Z(Ci, p), Z(Rn, h), Z(Ti, b), Z(ji, v), Z(wi, m), Z(_i, A), Z(zi, M), Z(Ii, fe), Z(Oi, oe), Z(Pi, V), Z(Nn, P), Z(Ai, B), L(Q))
    if (Q.length) {
      const N = e.exposed || (e.exposed = {});
      Q.forEach((J) => {
        Object.defineProperty(N, J, {
          get: () => r[J],
          set: (Ce) => r[J] = Ce,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  K && e.render === qe && (e.render = K), ae != null && (e.inheritAttrs = ae), ce && (e.components = ce), be && (e.directives = be), B && $n(e);
}
function Ri(e, t, r = qe) {
  L(e) && (e = _o(e));
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
function ls(e, t, r) {
  Qe(
    L(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    r
  );
}
function Mn(e, t, r, o) {
  let s = o.includes(".") ? Zn(r, o) : () => r[o];
  if (le(e)) {
    const n = t[e];
    D(n) && Ge(s, n);
  } else if (D(e))
    Ge(s, e.bind(r));
  else if (re(e))
    if (L(e))
      e.forEach((n) => Mn(n, t, r, o));
    else {
      const n = D(e.handler) ? e.handler.bind(r) : t[e.handler];
      D(n) && Ge(s, n, e);
    }
}
function Fn(e) {
  const t = e.type, { mixins: r, extends: o } = t, {
    mixins: s,
    optionsCache: n,
    config: { optionMergeStrategies: a }
  } = e.appContext, i = n.get(t);
  let l;
  return i ? l = i : !s.length && !r && !o ? l = t : (l = {}, s.length && s.forEach(
    (u) => Mr(l, u, a, !0)
  ), Mr(l, t, a)), re(t) && n.set(t, l), l;
}
function Mr(e, t, r, o = !1) {
  const { mixins: s, extends: n } = t;
  n && Mr(e, n, r, !0), s && s.forEach(
    (a) => Mr(e, a, r, !0)
  );
  for (const a in t)
    if (!(o && a === "expose")) {
      const i = Ni[a] || r && r[a];
      e[a] = i ? i(e[a], t[a]) : t[a];
    }
  return e;
}
const Ni = {
  data: cs,
  props: us,
  emits: us,
  // objects
  methods: Qt,
  computed: Qt,
  // lifecycle
  beforeCreate: ye,
  created: ye,
  beforeMount: ye,
  mounted: ye,
  beforeUpdate: ye,
  updated: ye,
  beforeDestroy: ye,
  beforeUnmount: ye,
  destroyed: ye,
  unmounted: ye,
  activated: ye,
  deactivated: ye,
  errorCaptured: ye,
  serverPrefetch: ye,
  // assets
  components: Qt,
  directives: Qt,
  // watch
  watch: Fi,
  // provide / inject
  provide: cs,
  inject: Mi
};
function cs(e, t) {
  return t ? e ? function() {
    return ve(
      D(e) ? e.call(this, this) : e,
      D(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Mi(e, t) {
  return Qt(_o(e), _o(t));
}
function _o(e) {
  if (L(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++)
      t[e[r]] = e[r];
    return t;
  }
  return e;
}
function ye(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Qt(e, t) {
  return e ? ve(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function us(e, t) {
  return e ? L(e) && L(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ve(
    /* @__PURE__ */ Object.create(null),
    is(e),
    is(t ?? {})
  ) : t;
}
function Fi(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = ve(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    r[o] = ye(e[o], t[o]);
  return r;
}
function Dn() {
  return {
    app: null,
    config: {
      isNativeTag: Xs,
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
let Di = 0;
function Vi(e, t) {
  return function(o, s = null) {
    D(o) || (o = ve({}, o)), s != null && !re(s) && (s = null);
    const n = Dn(), a = /* @__PURE__ */ new WeakSet(), i = [];
    let l = !1;
    const u = n.app = {
      _uid: Di++,
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
        return a.has(c) || (c && D(c.install) ? (a.add(c), c.install(u, ...p)) : D(c) && (a.add(c), c(u, ...p))), u;
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
      mount(c, p, h) {
        if (!l) {
          const b = u._ceVNode || Re(o, s);
          return b.appContext = n, h === !0 ? h = "svg" : h === !1 && (h = void 0), e(b, c, h), l = !0, u._container = c, c.__vue_app__ = u, to(b.component);
        }
      },
      onUnmount(c) {
        i.push(c);
      },
      unmount() {
        l && (Qe(
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
function Bi(e, t) {
  if (we) {
    let r = we.provides;
    const o = we.parent && we.parent.provides;
    o === r && (r = we.provides = Object.create(o)), r[e] = t;
  }
}
function sr(e, t, r = !1) {
  const o = qo();
  if (o || At) {
    let s = At ? At._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return r && D(t) ? t.call(o && o.proxy) : t;
  }
}
function Hi() {
  return !!(qo() || At);
}
const Vn = {}, Bn = () => Object.create(Vn), Hn = (e) => Object.getPrototypeOf(e) === Vn;
function Ki(e, t, r, o = !1) {
  const s = {}, n = Bn();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Kn(e, t, s, n);
  for (const a in e.propsOptions[0])
    a in s || (s[a] = void 0);
  r ? e.props = o ? s : si(s) : e.type.props ? e.props = s : e.props = n, e.attrs = n;
}
function Wi(e, t, r, o) {
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
        let h = c[p];
        if (Xr(e.emitsOptions, h))
          continue;
        const b = t[h];
        if (l)
          if (q(n, h))
            b !== n[h] && (n[h] = b, u = !0);
          else {
            const v = mt(h);
            s[v] = So(
              l,
              i,
              v,
              b,
              e,
              !1
            );
          }
        else
          b !== n[h] && (n[h] = b, u = !0);
      }
    }
  } else {
    Kn(e, t, s, n) && (u = !0);
    let c;
    for (const p in i)
      (!t || // for camelCase
      !q(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = It(p)) === p || !q(t, c))) && (l ? r && // for camelCase
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
  u && ot(e.attrs, "set", "");
}
function Kn(e, t, r, o) {
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
      if (a.type !== Function && !a.skipFactory && D(l)) {
        const { propsDefaults: u } = s;
        if (r in u)
          o = u[r];
        else {
          const c = vr(s);
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
    ] && (o === "" || o === It(r)) && (o = !0));
  }
  return o;
}
const Ui = /* @__PURE__ */ new WeakMap();
function Wn(e, t, r = !1) {
  const o = r ? Ui : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const n = e.props, a = {}, i = [];
  let l = !1;
  if (!D(e)) {
    const c = (p) => {
      l = !0;
      const [h, b] = Wn(p, t, !0);
      ve(a, h), b && i.push(...b);
    };
    !r && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!n && !l)
    return re(e) && o.set(e, Ft), Ft;
  if (L(n))
    for (let c = 0; c < n.length; c++) {
      const p = mt(n[c]);
      ds(p) && (a[p] = X);
    }
  else if (n)
    for (const c in n) {
      const p = mt(c);
      if (ds(p)) {
        const h = n[c], b = a[p] = L(h) || D(h) ? { type: h } : ve({}, h), v = b.type;
        let m = !1, A = !0;
        if (L(v))
          for (let $ = 0; $ < v.length; ++$) {
            const V = v[$], W = D(V) && V.name;
            if (W === "Boolean") {
              m = !0;
              break;
            } else W === "String" && (A = !1);
          }
        else
          m = D(v) && v.name === "Boolean";
        b[
          0
          /* shouldCast */
        ] = m, b[
          1
          /* shouldCastTrue */
        ] = A, (m || q(b, "default")) && i.push(p);
      }
    }
  const u = [a, i];
  return re(e) && o.set(e, u), u;
}
function ds(e) {
  return e[0] !== "$" && !Zt(e);
}
const Uo = (e) => e === "_" || e === "_ctx" || e === "$stable", Jo = (e) => L(e) ? e.map(Ue) : [Ue(e)], Ji = (e, t, r) => {
  if (t._n)
    return t;
  const o = xi((...s) => Jo(t(...s)), r);
  return o._c = !1, o;
}, Un = (e, t, r) => {
  const o = e._ctx;
  for (const s in e) {
    if (Uo(s)) continue;
    const n = e[s];
    if (D(n))
      t[s] = Ji(s, n, o);
    else if (n != null) {
      const a = Jo(n);
      t[s] = () => a;
    }
  }
}, Jn = (e, t) => {
  const r = Jo(t);
  e.slots.default = () => r;
}, Gn = (e, t, r) => {
  for (const o in t)
    (r || !Uo(o)) && (e[o] = t[o]);
}, Gi = (e, t, r) => {
  const o = e.slots = Bn();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Gn(o, t, r), r && sn(o, "_", s, !0)) : Un(t, o);
  } else t && Jn(e, t);
}, qi = (e, t, r) => {
  const { vnode: o, slots: s } = e;
  let n = !0, a = X;
  if (o.shapeFlag & 32) {
    const i = t._;
    i ? r && i === 1 ? n = !1 : Gn(s, t, r) : (n = !t.$stable, Un(t, s)), a = t;
  } else t && (Jn(e, t), a = { default: 1 });
  if (n)
    for (const i in s)
      !Uo(i) && a[i] == null && delete s[i];
}, Oe = ul;
function Yi(e) {
  return Qi(e);
}
function Qi(e, t) {
  const r = Ur();
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
    nextSibling: h,
    setScopeId: b = qe,
    insertStaticContent: v
  } = e, m = (d, f, g, w = null, x = null, y = null, T = void 0, C = null, S = !!f.dynamicChildren) => {
    if (d === f)
      return;
    d && !qt(d, f) && (w = zt(d), de(d, x, y, !0), d = null), f.patchFlag === -2 && (S = !1, f.dynamicChildren = null);
    const { type: _, ref: E, shapeFlag: j } = f;
    switch (_) {
      case eo:
        A(d, f, g, w);
        break;
      case vt:
        $(d, f, g, w);
        break;
      case uo:
        d == null && V(f, g, w, T);
        break;
      case ne:
        ce(
          d,
          f,
          g,
          w,
          x,
          y,
          T,
          C,
          S
        );
        break;
      default:
        j & 1 ? K(
          d,
          f,
          g,
          w,
          x,
          y,
          T,
          C,
          S
        ) : j & 6 ? be(
          d,
          f,
          g,
          w,
          x,
          y,
          T,
          C,
          S
        ) : (j & 64 || j & 128) && _.process(
          d,
          f,
          g,
          w,
          x,
          y,
          T,
          C,
          S,
          kt
        );
    }
    E != null && x ? tr(E, d && d.ref, y, f || d, !f) : E == null && d && d.ref != null && tr(d.ref, null, y, d, !0);
  }, A = (d, f, g, w) => {
    if (d == null)
      o(
        f.el = i(f.children),
        g,
        w
      );
    else {
      const x = f.el = d.el;
      f.children !== d.children && u(x, f.children);
    }
  }, $ = (d, f, g, w) => {
    d == null ? o(
      f.el = l(f.children || ""),
      g,
      w
    ) : f.el = d.el;
  }, V = (d, f, g, w) => {
    [d.el, d.anchor] = v(
      d.children,
      f,
      g,
      w,
      d.el,
      d.anchor
    );
  }, W = ({ el: d, anchor: f }, g, w) => {
    let x;
    for (; d && d !== f; )
      x = h(d), o(d, g, w), d = x;
    o(f, g, w);
  }, P = ({ el: d, anchor: f }) => {
    let g;
    for (; d && d !== f; )
      g = h(d), s(d), d = g;
    s(f);
  }, K = (d, f, g, w, x, y, T, C, S) => {
    f.type === "svg" ? T = "svg" : f.type === "math" && (T = "mathml"), d == null ? fe(
      f,
      g,
      w,
      x,
      y,
      T,
      C,
      S
    ) : B(
      d,
      f,
      x,
      y,
      T,
      C,
      S
    );
  }, fe = (d, f, g, w, x, y, T, C) => {
    let S, _;
    const { props: E, shapeFlag: j, transition: I, dirs: R } = d;
    if (S = d.el = a(
      d.type,
      y,
      E && E.is,
      E
    ), j & 8 ? c(S, d.children) : j & 16 && M(
      d.children,
      S,
      null,
      w,
      x,
      co(d, y),
      T,
      C
    ), R && wt(d, null, w, "created"), oe(S, d, d.scopeId, T, w), E) {
      for (const ee in E)
        ee !== "value" && !Zt(ee) && n(S, ee, null, E[ee], y, w);
      "value" in E && n(S, "value", null, E.value, y), (_ = E.onVnodeBeforeMount) && Ke(_, w, d);
    }
    R && wt(d, null, w, "beforeMount");
    const U = Zi(x, I);
    U && I.beforeEnter(S), o(S, f, g), ((_ = E && E.onVnodeMounted) || U || R) && Oe(() => {
      _ && Ke(_, w, d), U && I.enter(S), R && wt(d, null, w, "mounted");
    }, x);
  }, oe = (d, f, g, w, x) => {
    if (g && b(d, g), w)
      for (let y = 0; y < w.length; y++)
        b(d, w[y]);
    if (x) {
      let y = x.subTree;
      if (f === y || ea(y.type) && (y.ssContent === f || y.ssFallback === f)) {
        const T = x.vnode;
        oe(
          d,
          T,
          T.scopeId,
          T.slotScopeIds,
          x.parent
        );
      }
    }
  }, M = (d, f, g, w, x, y, T, C, S = 0) => {
    for (let _ = S; _ < d.length; _++) {
      const E = d[_] = C ? bt(d[_]) : Ue(d[_]);
      m(
        null,
        E,
        f,
        g,
        w,
        x,
        y,
        T,
        C
      );
    }
  }, B = (d, f, g, w, x, y, T) => {
    const C = f.el = d.el;
    let { patchFlag: S, dynamicChildren: _, dirs: E } = f;
    S |= d.patchFlag & 16;
    const j = d.props || X, I = f.props || X;
    let R;
    if (g && _t(g, !1), (R = I.onVnodeBeforeUpdate) && Ke(R, g, f, d), E && wt(f, d, g, "beforeUpdate"), g && _t(g, !0), (j.innerHTML && I.innerHTML == null || j.textContent && I.textContent == null) && c(C, ""), _ ? Q(
      d.dynamicChildren,
      _,
      C,
      g,
      w,
      co(f, x),
      y
    ) : T || J(
      d,
      f,
      C,
      null,
      g,
      w,
      co(f, x),
      y,
      !1
    ), S > 0) {
      if (S & 16)
        ae(C, j, I, g, x);
      else if (S & 2 && j.class !== I.class && n(C, "class", null, I.class, x), S & 4 && n(C, "style", j.style, I.style, x), S & 8) {
        const U = f.dynamicProps;
        for (let ee = 0; ee < U.length; ee++) {
          const Y = U[ee], je = j[Y], Pe = I[Y];
          (Pe !== je || Y === "value") && n(C, Y, je, Pe, x, g);
        }
      }
      S & 1 && d.children !== f.children && c(C, f.children);
    } else !T && _ == null && ae(C, j, I, g, x);
    ((R = I.onVnodeUpdated) || E) && Oe(() => {
      R && Ke(R, g, f, d), E && wt(f, d, g, "updated");
    }, w);
  }, Q = (d, f, g, w, x, y, T) => {
    for (let C = 0; C < f.length; C++) {
      const S = d[C], _ = f[C], E = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        S.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (S.type === ne || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !qt(S, _) || // - In the case of a component, it could contain anything.
        S.shapeFlag & 198) ? p(S.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          g
        )
      );
      m(
        S,
        _,
        E,
        null,
        w,
        x,
        y,
        T,
        !0
      );
    }
  }, ae = (d, f, g, w, x) => {
    if (f !== g) {
      if (f !== X)
        for (const y in f)
          !Zt(y) && !(y in g) && n(
            d,
            y,
            f[y],
            null,
            x,
            w
          );
      for (const y in g) {
        if (Zt(y)) continue;
        const T = g[y], C = f[y];
        T !== C && y !== "value" && n(d, y, C, T, x, w);
      }
      "value" in g && n(d, "value", f.value, g.value, x);
    }
  }, ce = (d, f, g, w, x, y, T, C, S) => {
    const _ = f.el = d ? d.el : i(""), E = f.anchor = d ? d.anchor : i("");
    let { patchFlag: j, dynamicChildren: I, slotScopeIds: R } = f;
    R && (C = C ? C.concat(R) : R), d == null ? (o(_, g, w), o(E, g, w), M(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      g,
      E,
      x,
      y,
      T,
      C,
      S
    )) : j > 0 && j & 64 && I && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren ? (Q(
      d.dynamicChildren,
      I,
      g,
      x,
      y,
      T,
      C
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || x && f === x.subTree) && qn(
      d,
      f,
      !0
      /* shallow */
    )) : J(
      d,
      f,
      g,
      E,
      x,
      y,
      T,
      C,
      S
    );
  }, be = (d, f, g, w, x, y, T, C, S) => {
    f.slotScopeIds = C, d == null ? f.shapeFlag & 512 ? x.ctx.activate(
      f,
      g,
      w,
      T,
      S
    ) : Se(
      f,
      g,
      w,
      x,
      y,
      T,
      S
    ) : ze(d, f, S);
  }, Se = (d, f, g, w, x, y, T) => {
    const C = d.component = xl(
      d,
      w,
      x
    );
    if (En(d) && (C.ctx.renderer = kt), vl(C, !1, T), C.asyncDep) {
      if (x && x.registerDep(C, Z, T), !d.el) {
        const S = C.subTree = Re(vt);
        $(null, S, f, g), d.placeholder = S.el;
      }
    } else
      Z(
        C,
        d,
        f,
        g,
        x,
        y,
        T
      );
  }, ze = (d, f, g) => {
    const w = f.component = d.component;
    if (ll(d, f, g))
      if (w.asyncDep && !w.asyncResolved) {
        N(w, f, g);
        return;
      } else
        w.next = f, w.update();
    else
      f.el = d.el, w.vnode = f;
  }, Z = (d, f, g, w, x, y, T) => {
    const C = () => {
      if (d.isMounted) {
        let { next: j, bu: I, u: R, parent: U, vnode: ee } = d;
        {
          const Be = Yn(d);
          if (Be) {
            j && (j.el = ee.el, N(d, j, T)), Be.asyncDep.then(() => {
              d.isUnmounted || C();
            });
            return;
          }
        }
        let Y = j, je;
        _t(d, !1), j ? (j.el = ee.el, N(d, j, T)) : j = ee, I && Pr(I), (je = j.props && j.props.onVnodeBeforeUpdate) && Ke(je, U, j, ee), _t(d, !0);
        const Pe = ps(d), Ve = d.subTree;
        d.subTree = Pe, m(
          Ve,
          Pe,
          // parent may have changed if it's in a teleport
          p(Ve.el),
          // anchor may have changed if it's in a fragment
          zt(Ve),
          d,
          x,
          y
        ), j.el = Pe.el, Y === null && cl(d, Pe.el), R && Oe(R, x), (je = j.props && j.props.onVnodeUpdated) && Oe(
          () => Ke(je, U, j, ee),
          x
        );
      } else {
        let j;
        const { el: I, props: R } = f, { bm: U, m: ee, parent: Y, root: je, type: Pe } = d, Ve = rr(f);
        _t(d, !1), U && Pr(U), !Ve && (j = R && R.onVnodeBeforeMount) && Ke(j, Y, f), _t(d, !0);
        {
          je.ce && // @ts-expect-error _def is private
          je.ce._def.shadowRoot !== !1 && je.ce._injectChildStyle(Pe);
          const Be = d.subTree = ps(d);
          m(
            null,
            Be,
            g,
            w,
            d,
            x,
            y
          ), f.el = Be.el;
        }
        if (ee && Oe(ee, x), !Ve && (j = R && R.onVnodeMounted)) {
          const Be = f;
          Oe(
            () => Ke(j, Y, Be),
            x
          );
        }
        (f.shapeFlag & 256 || Y && rr(Y.vnode) && Y.vnode.shapeFlag & 256) && d.a && Oe(d.a, x), d.isMounted = !0, f = g = w = null;
      }
    };
    d.scope.on();
    const S = d.effect = new pn(C);
    d.scope.off();
    const _ = d.update = S.run.bind(S), E = d.job = S.runIfDirty.bind(S);
    E.i = d, E.id = d.uid, S.scheduler = () => Ko(E), _t(d, !0), _();
  }, N = (d, f, g) => {
    f.component = d;
    const w = d.vnode.props;
    d.vnode = f, d.next = null, Wi(d, f.props, w, g), qi(d, f.children, g), it(), ns(d), lt();
  }, J = (d, f, g, w, x, y, T, C, S = !1) => {
    const _ = d && d.children, E = d ? d.shapeFlag : 0, j = f.children, { patchFlag: I, shapeFlag: R } = f;
    if (I > 0) {
      if (I & 128) {
        Te(
          _,
          j,
          g,
          w,
          x,
          y,
          T,
          C,
          S
        );
        return;
      } else if (I & 256) {
        Ce(
          _,
          j,
          g,
          w,
          x,
          y,
          T,
          C,
          S
        );
        return;
      }
    }
    R & 8 ? (E & 16 && dt(_, x, y), j !== _ && c(g, j)) : E & 16 ? R & 16 ? Te(
      _,
      j,
      g,
      w,
      x,
      y,
      T,
      C,
      S
    ) : dt(_, x, y, !0) : (E & 8 && c(g, ""), R & 16 && M(
      j,
      g,
      w,
      x,
      y,
      T,
      C,
      S
    ));
  }, Ce = (d, f, g, w, x, y, T, C, S) => {
    d = d || Ft, f = f || Ft;
    const _ = d.length, E = f.length, j = Math.min(_, E);
    let I;
    for (I = 0; I < j; I++) {
      const R = f[I] = S ? bt(f[I]) : Ue(f[I]);
      m(
        d[I],
        R,
        g,
        null,
        x,
        y,
        T,
        C,
        S
      );
    }
    _ > E ? dt(
      d,
      x,
      y,
      !0,
      !1,
      j
    ) : M(
      f,
      g,
      w,
      x,
      y,
      T,
      C,
      S,
      j
    );
  }, Te = (d, f, g, w, x, y, T, C, S) => {
    let _ = 0;
    const E = f.length;
    let j = d.length - 1, I = E - 1;
    for (; _ <= j && _ <= I; ) {
      const R = d[_], U = f[_] = S ? bt(f[_]) : Ue(f[_]);
      if (qt(R, U))
        m(
          R,
          U,
          g,
          null,
          x,
          y,
          T,
          C,
          S
        );
      else
        break;
      _++;
    }
    for (; _ <= j && _ <= I; ) {
      const R = d[j], U = f[I] = S ? bt(f[I]) : Ue(f[I]);
      if (qt(R, U))
        m(
          R,
          U,
          g,
          null,
          x,
          y,
          T,
          C,
          S
        );
      else
        break;
      j--, I--;
    }
    if (_ > j) {
      if (_ <= I) {
        const R = I + 1, U = R < E ? f[R].el : w;
        for (; _ <= I; )
          m(
            null,
            f[_] = S ? bt(f[_]) : Ue(f[_]),
            g,
            U,
            x,
            y,
            T,
            C,
            S
          ), _++;
      }
    } else if (_ > I)
      for (; _ <= j; )
        de(d[_], x, y, !0), _++;
    else {
      const R = _, U = _, ee = /* @__PURE__ */ new Map();
      for (_ = U; _ <= I; _++) {
        const Ae = f[_] = S ? bt(f[_]) : Ue(f[_]);
        Ae.key != null && ee.set(Ae.key, _);
      }
      let Y, je = 0;
      const Pe = I - U + 1;
      let Ve = !1, Be = 0;
      const Jt = new Array(Pe);
      for (_ = 0; _ < Pe; _++) Jt[_] = 0;
      for (_ = R; _ <= j; _++) {
        const Ae = d[_];
        if (je >= Pe) {
          de(Ae, x, y, !0);
          continue;
        }
        let He;
        if (Ae.key != null)
          He = ee.get(Ae.key);
        else
          for (Y = U; Y <= I; Y++)
            if (Jt[Y - U] === 0 && qt(Ae, f[Y])) {
              He = Y;
              break;
            }
        He === void 0 ? de(Ae, x, y, !0) : (Jt[He - U] = _ + 1, He >= Be ? Be = He : Ve = !0, m(
          Ae,
          f[He],
          g,
          null,
          x,
          y,
          T,
          C,
          S
        ), je++);
      }
      const Zo = Ve ? Xi(Jt) : Ft;
      for (Y = Zo.length - 1, _ = Pe - 1; _ >= 0; _--) {
        const Ae = U + _, He = f[Ae], Xo = f[Ae + 1], es = Ae + 1 < E ? (
          // #13559, fallback to el placeholder for unresolved async component
          Xo.el || Xo.placeholder
        ) : w;
        Jt[_] === 0 ? m(
          null,
          He,
          g,
          es,
          x,
          y,
          T,
          C,
          S
        ) : Ve && (Y < 0 || _ !== Zo[Y] ? ue(He, g, es, 2) : Y--);
      }
    }
  }, ue = (d, f, g, w, x = null) => {
    const { el: y, type: T, transition: C, children: S, shapeFlag: _ } = d;
    if (_ & 6) {
      ue(d.component.subTree, f, g, w);
      return;
    }
    if (_ & 128) {
      d.suspense.move(f, g, w);
      return;
    }
    if (_ & 64) {
      T.move(d, f, g, kt);
      return;
    }
    if (T === ne) {
      o(y, f, g);
      for (let j = 0; j < S.length; j++)
        ue(S[j], f, g, w);
      o(d.anchor, f, g);
      return;
    }
    if (T === uo) {
      W(d, f, g);
      return;
    }
    if (w !== 2 && _ & 1 && C)
      if (w === 0)
        C.beforeEnter(y), o(y, f, g), Oe(() => C.enter(y), x);
      else {
        const { leave: j, delayLeave: I, afterLeave: R } = C, U = () => {
          d.ctx.isUnmounted ? s(y) : o(y, f, g);
        }, ee = () => {
          y._isLeaving && y[ki](
            !0
            /* cancelled */
          ), j(y, () => {
            U(), R && R();
          });
        };
        I ? I(y, U, ee) : ee();
      }
    else
      o(y, f, g);
  }, de = (d, f, g, w = !1, x = !1) => {
    const {
      type: y,
      props: T,
      ref: C,
      children: S,
      dynamicChildren: _,
      shapeFlag: E,
      patchFlag: j,
      dirs: I,
      cacheIndex: R
    } = d;
    if (j === -2 && (x = !1), C != null && (it(), tr(C, null, g, d, !0), lt()), R != null && (f.renderCache[R] = void 0), E & 256) {
      f.ctx.deactivate(d);
      return;
    }
    const U = E & 1 && I, ee = !rr(d);
    let Y;
    if (ee && (Y = T && T.onVnodeBeforeUnmount) && Ke(Y, f, d), E & 6)
      yr(d.component, g, w);
    else {
      if (E & 128) {
        d.suspense.unmount(g, w);
        return;
      }
      U && wt(d, null, f, "beforeUnmount"), E & 64 ? d.type.remove(
        d,
        f,
        g,
        kt,
        w
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (y !== ne || j > 0 && j & 64) ? dt(
        _,
        f,
        g,
        !1,
        !0
      ) : (y === ne && j & 384 || !x && E & 16) && dt(S, f, g), w && yt(d);
    }
    (ee && (Y = T && T.onVnodeUnmounted) || U) && Oe(() => {
      Y && Ke(Y, f, d), U && wt(d, null, f, "unmounted");
    }, g);
  }, yt = (d) => {
    const { type: f, el: g, anchor: w, transition: x } = d;
    if (f === ne) {
      ut(g, w);
      return;
    }
    if (f === uo) {
      P(d);
      return;
    }
    const y = () => {
      s(g), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (d.shapeFlag & 1 && x && !x.persisted) {
      const { leave: T, delayLeave: C } = x, S = () => T(g, y);
      C ? C(d.el, y, S) : S();
    } else
      y();
  }, ut = (d, f) => {
    let g;
    for (; d !== f; )
      g = h(d), s(d), d = g;
    s(f);
  }, yr = (d, f, g) => {
    const { bum: w, scope: x, job: y, subTree: T, um: C, m: S, a: _ } = d;
    fs(S), fs(_), w && Pr(w), x.stop(), y && (y.flags |= 8, de(T, d, f, g)), C && Oe(C, f), Oe(() => {
      d.isUnmounted = !0;
    }, f);
  }, dt = (d, f, g, w = !1, x = !1, y = 0) => {
    for (let T = y; T < d.length; T++)
      de(d[T], f, g, w, x);
  }, zt = (d) => {
    if (d.shapeFlag & 6)
      return zt(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const f = h(d.anchor || d.el), g = f && f[vi];
    return g ? h(g) : f;
  };
  let Ut = !1;
  const kr = (d, f, g) => {
    d == null ? f._vnode && de(f._vnode, null, null, !0) : m(
      f._vnode || null,
      d,
      f,
      null,
      null,
      null,
      g
    ), f._vnode = d, Ut || (Ut = !0, ns(), On(), Ut = !1);
  }, kt = {
    p: m,
    um: de,
    m: ue,
    r: yt,
    mt: Se,
    mc: M,
    pc: J,
    pbc: Q,
    n: zt,
    o: e
  };
  return {
    render: kr,
    hydrate: void 0,
    createApp: Vi(kr)
  };
}
function co({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function _t({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Zi(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function qn(e, t, r = !1) {
  const o = e.children, s = t.children;
  if (L(o) && L(s))
    for (let n = 0; n < o.length; n++) {
      const a = o[n];
      let i = s[n];
      i.shapeFlag & 1 && !i.dynamicChildren && ((i.patchFlag <= 0 || i.patchFlag === 32) && (i = s[n] = bt(s[n]), i.el = a.el), !r && i.patchFlag !== -2 && qn(a, i)), i.type === eo && // avoid cached text nodes retaining detached dom nodes
      i.patchFlag !== -1 && (i.el = a.el), i.type === vt && !i.el && (i.el = a.el);
    }
}
function Xi(e) {
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
function Yn(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Yn(t);
}
function fs(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const el = Symbol.for("v-scx"), tl = () => sr(el);
function Ge(e, t, r) {
  return Qn(e, t, r);
}
function Qn(e, t, r = X) {
  const { immediate: o, deep: s, flush: n, once: a } = r, i = ve({}, r), l = t && o || !t && n !== "post";
  let u;
  if (pr) {
    if (n === "sync") {
      const b = tl();
      u = b.__watcherHandles || (b.__watcherHandles = []);
    } else if (!l) {
      const b = () => {
      };
      return b.stop = qe, b.resume = qe, b.pause = qe, b;
    }
  }
  const c = we;
  i.call = (b, v, m) => Qe(b, c, v, m);
  let p = !1;
  n === "post" ? i.scheduler = (b) => {
    Oe(b, c && c.suspense);
  } : n !== "sync" && (p = !0, i.scheduler = (b, v) => {
    v ? b() : Ko(b);
  }), i.augmentJob = (b) => {
    t && (b.flags |= 4), p && (b.flags |= 2, c && (b.id = c.uid, b.i = c));
  };
  const h = bi(e, t, i);
  return pr && (u ? u.push(h) : l && h()), h;
}
function rl(e, t, r) {
  const o = this.proxy, s = le(e) ? e.includes(".") ? Zn(o, e) : () => o[e] : e.bind(o, o);
  let n;
  D(t) ? n = t : (n = t.handler, r = t);
  const a = vr(this), i = Qn(s, n.bind(o), r);
  return a(), i;
}
function Zn(e, t) {
  const r = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < r.length && o; s++)
      o = o[r[s]];
    return o;
  };
}
const ol = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${mt(t)}Modifiers`] || e[`${It(t)}Modifiers`];
function sl(e, t, ...r) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || X;
  let s = r;
  const n = t.startsWith("update:"), a = n && ol(o, t.slice(7));
  a && (a.trim && (s = r.map((c) => le(c) ? c.trim() : c)), a.number && (s = r.map(mo)));
  let i, l = o[i = oo(t)] || // also try camelCase event handler (#2249)
  o[i = oo(mt(t))];
  !l && n && (l = o[i = oo(It(t))]), l && Qe(
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
    e.emitted[i] = !0, Qe(
      u,
      e,
      6,
      s
    );
  }
}
const nl = /* @__PURE__ */ new WeakMap();
function Xn(e, t, r = !1) {
  const o = r ? nl : t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const n = e.emits;
  let a = {}, i = !1;
  if (!D(e)) {
    const l = (u) => {
      const c = Xn(u, t, !0);
      c && (i = !0, ve(a, c));
    };
    !r && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !n && !i ? (re(e) && o.set(e, null), null) : (L(n) ? n.forEach((l) => a[l] = null) : ve(a, n), re(e) && o.set(e, a), a);
}
function Xr(e, t) {
  return !e || !Hr(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), q(e, t[0].toLowerCase() + t.slice(1)) || q(e, It(t)) || q(e, t));
}
function ps(e) {
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
    data: h,
    setupState: b,
    ctx: v,
    inheritAttrs: m
  } = e, A = Rr(e);
  let $, V;
  try {
    if (r.shapeFlag & 4) {
      const P = s || o, K = P;
      $ = Ue(
        u.call(
          K,
          P,
          c,
          p,
          b,
          h,
          v
        )
      ), V = i;
    } else {
      const P = t;
      $ = Ue(
        P.length > 1 ? P(
          p,
          { attrs: i, slots: a, emit: l }
        ) : P(
          p,
          null
        )
      ), V = t.props ? i : al(i);
    }
  } catch (P) {
    nr.length = 0, Yr(P, e, 1), $ = Re(vt);
  }
  let W = $;
  if (V && m !== !1) {
    const P = Object.keys(V), { shapeFlag: K } = W;
    P.length && K & 7 && (n && P.some(zo) && (V = il(
      V,
      n
    )), W = Ht(W, V, !1, !0));
  }
  return r.dirs && (W = Ht(W, null, !1, !0), W.dirs = W.dirs ? W.dirs.concat(r.dirs) : r.dirs), r.transition && Wo(W, r.transition), $ = W, Rr(A), $;
}
const al = (e) => {
  let t;
  for (const r in e)
    (r === "class" || r === "style" || Hr(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, il = (e, t) => {
  const r = {};
  for (const o in e)
    (!zo(o) || !(o.slice(9) in t)) && (r[o] = e[o]);
  return r;
};
function ll(e, t, r) {
  const { props: o, children: s, component: n } = e, { props: a, children: i, patchFlag: l } = t, u = n.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (r && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return o ? bs(o, a, u) : !!a;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        const h = c[p];
        if (a[h] !== o[h] && !Xr(u, h))
          return !0;
      }
    }
  } else
    return (s || i) && (!i || !i.$stable) ? !0 : o === a ? !1 : o ? a ? bs(o, a, u) : !0 : !!a;
  return !1;
}
function bs(e, t, r) {
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
function cl({ vnode: e, parent: t }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
}
const ea = (e) => e.__isSuspense;
function ul(e, t) {
  t && t.pendingBranch ? L(e) ? t.effects.push(...e) : t.effects.push(e) : mi(e);
}
const ne = Symbol.for("v-fgt"), eo = Symbol.for("v-txt"), vt = Symbol.for("v-cmt"), uo = Symbol.for("v-stc"), nr = [];
let Ie = null;
function O(e = !1) {
  nr.push(Ie = e ? null : []);
}
function dl() {
  nr.pop(), Ie = nr[nr.length - 1] || null;
}
let fr = 1;
function gs(e, t = !1) {
  fr += e, e < 0 && Ie && t && (Ie.hasOnce = !0);
}
function ta(e) {
  return e.dynamicChildren = fr > 0 ? Ie || Ft : null, dl(), fr > 0 && Ie && Ie.push(e), e;
}
function z(e, t, r, o, s, n) {
  return ta(
    k(
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
function fl(e, t, r, o, s) {
  return ta(
    Re(
      e,
      t,
      r,
      o,
      s,
      !0
    )
  );
}
function ra(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function qt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const oa = ({ key: e }) => e ?? null, Ar = ({
  ref: e,
  ref_key: t,
  ref_for: r
}) => (typeof e == "number" && (e = "" + e), e != null ? le(e) || ie(e) || D(e) ? { i: Ee, r: e, k: t, f: !!r } : e : null);
function k(e, t = null, r = null, o = 0, s = null, n = e === ne ? 0 : 1, a = !1, i = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && oa(t),
    ref: t && Ar(t),
    scopeId: zn,
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
    ctx: Ee
  };
  return i ? (Go(l, r), n & 128 && e.normalize(l)) : r && (l.shapeFlag |= le(r) ? 8 : 16), fr > 0 && // avoid a block node from tracking itself
  !a && // has current parent block
  Ie && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || n & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Ie.push(l), l;
}
const Re = pl;
function pl(e, t = null, r = null, o = 0, s = null, n = !1) {
  if ((!e || e === $i) && (e = vt), ra(e)) {
    const i = Ht(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return r && Go(i, r), fr > 0 && !n && Ie && (i.shapeFlag & 6 ? Ie[Ie.indexOf(e)] = i : Ie.push(i)), i.patchFlag = -2, i;
  }
  if (_l(e) && (e = e.__vccOpts), t) {
    t = bl(t);
    let { class: i, style: l } = t;
    i && !le(i) && (t.class = Je(i)), re(l) && (Vo(l) && !L(l) && (l = ve({}, l)), t.style = Jr(l));
  }
  const a = le(e) ? 1 : ea(e) ? 128 : yi(e) ? 64 : re(e) ? 4 : D(e) ? 2 : 0;
  return k(
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
  return e ? Vo(e) || Hn(e) ? ve({}, e) : e : null;
}
function Ht(e, t, r = !1, o = !1) {
  const { props: s, ref: n, patchFlag: a, children: i, transition: l } = e, u = t ? gl(s || {}, t) : s, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && oa(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && n ? L(n) ? n.concat(Ar(t)) : [n, Ar(t)] : Ar(t)
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
    patchFlag: t && e.type !== ne ? a === -1 ? 16 : a | 16 : a,
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
  return l && o && Wo(
    c,
    l.clone(c)
  ), c;
}
function Fe(e = " ", t = 0) {
  return Re(eo, null, e, t);
}
function H(e = "", t = !1) {
  return t ? (O(), fl(vt, null, e)) : Re(vt, null, e);
}
function Ue(e) {
  return e == null || typeof e == "boolean" ? Re(vt) : L(e) ? Re(
    ne,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : ra(e) ? bt(e) : Re(eo, null, String(e));
}
function bt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ht(e);
}
function Go(e, t) {
  let r = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (L(t))
    r = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Go(e, s()), s._c && (s._d = !0));
      return;
    } else {
      r = 32;
      const s = t._;
      !s && !Hn(t) ? t._ctx = Ee : s === 3 && Ee && (Ee.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else D(t) ? (t = { default: t, _ctx: Ee }, r = 32) : (t = String(t), o & 64 ? (r = 16, t = [Fe(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function gl(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = Je([t.class, o.class]));
      else if (s === "style")
        t.style = Jr([t.style, o.style]);
      else if (Hr(s)) {
        const n = t[s], a = o[s];
        a && n !== a && !(L(n) && n.includes(a)) && (t[s] = n ? [].concat(n, a) : a);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function Ke(e, t, r, o = null) {
  Qe(e, t, 7, [
    r,
    o
  ]);
}
const hl = Dn();
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
    scope: new un(
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
    propsOptions: Wn(o, s),
    emitsOptions: Xn(o, s),
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
  return n.ctx = { _: n }, n.root = t ? t.root : n, n.emit = sl.bind(null, n), e.ce && e.ce(n), n;
}
let we = null;
const qo = () => we || Ee;
let Fr, Co;
{
  const e = Ur(), t = (r, o) => {
    let s;
    return (s = e[r]) || (s = e[r] = []), s.push(o), (n) => {
      s.length > 1 ? s.forEach((a) => a(n)) : s[0](n);
    };
  };
  Fr = t(
    "__VUE_INSTANCE_SETTERS__",
    (r) => we = r
  ), Co = t(
    "__VUE_SSR_SETTERS__",
    (r) => pr = r
  );
}
const vr = (e) => {
  const t = we;
  return Fr(e), e.scope.on(), () => {
    e.scope.off(), Fr(t);
  };
}, hs = () => {
  we && we.scope.off(), Fr(null);
};
function sa(e) {
  return e.vnode.shapeFlag & 4;
}
let pr = !1;
function vl(e, t = !1, r = !1) {
  t && Co(t);
  const { props: o, children: s } = e.vnode, n = sa(e);
  Ki(e, o, n, t), Gi(e, s, r || t);
  const a = n ? yl(e, t) : void 0;
  return t && Co(!1), a;
}
function yl(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ei);
  const { setup: o } = r;
  if (o) {
    it();
    const s = e.setupContext = o.length > 1 ? wl(e) : null, n = vr(e), a = xr(
      o,
      e,
      0,
      [
        e.props,
        s
      ]
    ), i = en(a);
    if (lt(), n(), (i || e.sp) && !rr(e) && $n(e), i) {
      if (a.then(hs, hs), t)
        return a.then((l) => {
          ms(e, l);
        }).catch((l) => {
          Yr(l, e, 0);
        });
      e.asyncDep = a;
    } else
      ms(e, a);
  } else
    na(e);
}
function ms(e, t, r) {
  D(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : re(t) && (e.setupState = jn(t)), na(e);
}
function na(e, t, r) {
  const o = e.type;
  e.render || (e.render = o.render || qe);
  {
    const s = vr(e);
    it();
    try {
      Li(e);
    } finally {
      lt(), s();
    }
  }
}
const kl = {
  get(e, t) {
    return xe(e, "get", ""), e[t];
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
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(jn(Bo(e.exposed)), {
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
  return D(e) && "__vccOpts" in e;
}
const at = (e, t) => fi(e, t, pr), Sl = "3.5.22";
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let To;
const xs = typeof window < "u" && window.trustedTypes;
if (xs)
  try {
    To = /* @__PURE__ */ xs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const aa = To ? (e) => To.createHTML(e) : (e) => e, Cl = "http://www.w3.org/2000/svg", Tl = "http://www.w3.org/1998/Math/MathML", et = typeof document < "u" ? document : null, vs = et && /* @__PURE__ */ et.createElement("template"), jl = {
  insert: (e, t, r) => {
    t.insertBefore(e, r || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, r, o) => {
    const s = t === "svg" ? et.createElementNS(Cl, e) : t === "mathml" ? et.createElementNS(Tl, e) : r ? et.createElement(e, { is: r }) : et.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => et.createTextNode(e),
  createComment: (e) => et.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => et.querySelector(e),
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
      vs.innerHTML = aa(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const i = vs.content;
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
}, Pl = Symbol("_vtc");
function Al(e, t, r) {
  const o = e[Pl];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const Dr = Symbol("_vod"), ia = Symbol("_vsh"), ys = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: r }) {
    e[Dr] = e.style.display === "none" ? "" : e.style.display, r && t ? r.beforeEnter(e) : Yt(e, t);
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
  e.style.display = t ? e[Dr] : "none", e[ia] = !t;
}
const Ol = Symbol(""), Il = /(?:^|;)\s*display\s*:/;
function zl(e, t, r) {
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
      const a = o[Ol];
      a && (r += ";" + a), o.cssText = r, n = Il.test(r);
    }
  } else t && e.removeAttribute("style");
  Dr in e && (e[Dr] = n ? o.display : "", e[ia] && (o.display = "none"));
}
const ks = /\s*!important$/;
function Or(e, t, r) {
  if (L(r))
    r.forEach((o) => Or(e, t, o));
  else if (r == null && (r = ""), t.startsWith("--"))
    e.setProperty(t, r);
  else {
    const o = $l(e, t);
    ks.test(r) ? e.setProperty(
      It(o),
      r.replace(ks, ""),
      "important"
    ) : e[o] = r;
  }
}
const ws = ["Webkit", "Moz", "ms"], fo = {};
function $l(e, t) {
  const r = fo[t];
  if (r)
    return r;
  let o = mt(t);
  if (o !== "filter" && o in e)
    return fo[t] = o;
  o = on(o);
  for (let s = 0; s < ws.length; s++) {
    const n = ws[s] + o;
    if (n in e)
      return fo[t] = n;
  }
  return t;
}
const _s = "http://www.w3.org/1999/xlink";
function Ss(e, t, r, o, s, n = Ra(t)) {
  o && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(_s, t.slice(6, t.length)) : e.setAttributeNS(_s, t, r) : r == null || n && !nn(r) ? e.removeAttribute(t) : e.setAttribute(
    t,
    n ? "" : Ye(r) ? String(r) : r
  );
}
function Cs(e, t, r, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    r != null && (e[t] = t === "innerHTML" ? aa(r) : r);
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
    i === "boolean" ? r = nn(r) : r == null && i === "string" ? (r = "", a = !0) : i === "number" && (r = 0, a = !0);
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
function El(e, t, r, o) {
  e.removeEventListener(t, r, o);
}
const Ts = Symbol("_vei");
function Ll(e, t, r, o, s = null) {
  const n = e[Ts] || (e[Ts] = {}), a = n[t];
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
    } else a && (El(e, i, a, l), n[t] = void 0);
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
  return [e[2] === ":" ? e.slice(3) : It(e.slice(2)), t];
}
let po = 0;
const Nl = /* @__PURE__ */ Promise.resolve(), Ml = () => po || (Nl.then(() => po = 0), po = Date.now());
function Fl(e, t) {
  const r = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= r.attached)
      return;
    Qe(
      Dl(o, r.value),
      t,
      5,
      [o]
    );
  };
  return r.value = e, r.attached = Ml(), r;
}
function Dl(e, t) {
  if (L(t)) {
    const r = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      r.call(e), e._stopped = !0;
    }, t.map(
      (o) => (s) => !s._stopped && o && o(s)
    );
  } else
    return t;
}
const Ps = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Vl = (e, t, r, o, s, n) => {
  const a = s === "svg";
  t === "class" ? Al(e, o, a) : t === "style" ? zl(e, r, o) : Hr(t) ? zo(t) || Ll(e, t, r, o, n) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Bl(e, t, o, a)) ? (Cs(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ss(e, t, o, a, n, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !le(o)) ? Cs(e, mt(t), o, n, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Ss(e, t, o, a));
};
function Bl(e, t, r, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ps(t) && D(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return Ps(t) && le(r) ? !1 : t in e;
}
const Vr = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return L(t) ? (r) => Pr(t, r) : t;
};
function Hl(e) {
  e.target.composing = !0;
}
function As(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Bt = Symbol("_assign"), Cr = {
  created(e, { modifiers: { lazy: t, trim: r, number: o } }, s) {
    e[Bt] = Vr(s);
    const n = o || s.props && s.props.type === "number";
    Tt(e, t ? "change" : "input", (a) => {
      if (a.target.composing) return;
      let i = e.value;
      r && (i = i.trim()), n && (i = mo(i)), e[Bt](i);
    }), r && Tt(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Tt(e, "compositionstart", Hl), Tt(e, "compositionend", As), Tt(e, "change", As));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: r, modifiers: { lazy: o, trim: s, number: n } }, a) {
    if (e[Bt] = Vr(a), e.composing) return;
    const i = (n || e.type === "number") && !/^0\d/.test(e.value) ? mo(e.value) : e.value, l = t ?? "";
    i !== l && (document.activeElement === e && e.type !== "range" && (o && t === r || s && e.value.trim() === l) || (e.value = l));
  }
}, Kl = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, r) {
    e[Bt] = Vr(r), Tt(e, "change", () => {
      const o = e._modelValue, s = Wl(e), n = e.checked, a = e[Bt];
      if (L(o)) {
        const i = an(o, s), l = i !== -1;
        if (n && !l)
          a(o.concat(s));
        else if (!n && l) {
          const u = [...o];
          u.splice(i, 1), a(u);
        }
      } else if (Kr(o)) {
        const i = new Set(o);
        n ? i.add(s) : i.delete(s), a(i);
      } else
        a(la(e, n));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Os,
  beforeUpdate(e, t, r) {
    e[Bt] = Vr(r), Os(e, t, r);
  }
};
function Os(e, { value: t, oldValue: r }, o) {
  e._modelValue = t;
  let s;
  if (L(t))
    s = an(t, o.props.value) > -1;
  else if (Kr(t))
    s = t.has(o.props.value);
  else {
    if (t === r) return;
    s = Gr(t, la(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
function Wl(e) {
  return "_value" in e ? e._value : e.value;
}
function la(e, t) {
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
}, ql = /* @__PURE__ */ ve({ patchProp: Vl }, jl);
let Is;
function Yl() {
  return Is || (Is = Yi(ql));
}
const Ql = (...e) => {
  const t = Yl().createApp(...e), { mount: r } = t;
  return t.mount = (o) => {
    const s = Xl(o);
    if (!s) return;
    const n = t._component;
    !D(n) && !n.render && !n.template && (n.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
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
let ca;
const ro = (e) => ca = e, ua = (
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
  const e = dn(!0), t = e.run(() => _e({}));
  let r = [], o = [];
  const s = Bo({
    install(n) {
      ro(s), s._a = n, n.provide(ua, s), n.config.globalProperties.$pinia = s, o.forEach((a) => r.push(a)), o = [];
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
const da = () => {
};
function zs(e, t, r, o = da) {
  e.add(t);
  const s = () => {
    e.delete(t) && o();
  };
  return !r && fn() && Ma(s), s;
}
function Et(e, ...t) {
  e.forEach((r) => {
    r(...t);
  });
}
const tc = (e) => e(), $s = Symbol(), bo = Symbol();
function Po(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((r, o) => e.set(o, r)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const r in t) {
    if (!t.hasOwnProperty(r))
      continue;
    const o = t[r], s = e[r];
    jo(s) && jo(o) && e.hasOwnProperty(r) && !ie(o) && !ht(o) ? e[r] = Po(s, o) : e[r] = o;
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
    const c = li(r.state.value[e]);
    return ft(c, n, Object.keys(a || {}).reduce((p, h) => (p[h] = Bo(at(() => {
      ro(r);
      const b = r._s.get(e);
      return a[h].call(b, b);
    })), p), {}));
  }
  return l = fa(e, u, t, r, o, !0), l;
}
function fa(e, t, r = {}, o, s, n) {
  let a;
  const i = ft({ actions: {} }, r), l = { deep: !0 };
  let u, c, p = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set(), b;
  const v = o.state.value[e];
  !n && !v && (o.state.value[e] = {}), _e({});
  let m;
  function A(M) {
    let B;
    u = c = !1, typeof M == "function" ? (M(o.state.value[e]), B = {
      type: ar.patchFunction,
      storeId: e,
      events: b
    }) : (Po(o.state.value[e], M), B = {
      type: ar.patchObject,
      payload: M,
      storeId: e,
      events: b
    });
    const Q = m = Symbol();
    Ho().then(() => {
      m === Q && (u = !0);
    }), c = !0, Et(p, B, o.state.value[e]);
  }
  const $ = n ? function() {
    const { state: B } = r, Q = B ? B() : {};
    this.$patch((ae) => {
      ft(ae, Q);
    });
  } : (
    /* istanbul ignore next */
    da
  );
  function V() {
    a.stop(), p.clear(), h.clear(), o._s.delete(e);
  }
  const W = (M, B = "") => {
    if ($s in M)
      return M[bo] = B, M;
    const Q = function() {
      ro(o);
      const ae = Array.from(arguments), ce = /* @__PURE__ */ new Set(), be = /* @__PURE__ */ new Set();
      function Se(N) {
        ce.add(N);
      }
      function ze(N) {
        be.add(N);
      }
      Et(h, {
        args: ae,
        name: Q[bo],
        store: K,
        after: Se,
        onError: ze
      });
      let Z;
      try {
        Z = M.apply(this && this.$id === e ? this : K, ae);
      } catch (N) {
        throw Et(be, N), N;
      }
      return Z instanceof Promise ? Z.then((N) => (Et(ce, N), N)).catch((N) => (Et(be, N), Promise.reject(N))) : (Et(ce, Z), Z);
    };
    return Q[$s] = !0, Q[bo] = B, Q;
  }, P = {
    _p: o,
    // _s: scope,
    $id: e,
    $onAction: zs.bind(null, h),
    $patch: A,
    $reset: $,
    $subscribe(M, B = {}) {
      const Q = zs(p, M, B.detached, () => ae()), ae = a.run(() => Ge(() => o.state.value[e], (ce) => {
        (B.flush === "sync" ? c : u) && M({
          storeId: e,
          type: ar.direct,
          events: b
        }, ce);
      }, ft({}, l, B)));
      return Q;
    },
    $dispose: V
  }, K = Wt(P);
  o._s.set(e, K);
  const oe = (o._a && o._a.runWithContext || tc)(() => o._e.run(() => (a = dn()).run(() => t({ action: W }))));
  for (const M in oe) {
    const B = oe[M];
    if (ie(B) && !sc(B) || ht(B))
      n || (v && oc(B) && (ie(B) ? B.value = v[M] : Po(B, v[M])), o.state.value[e][M] = B);
    else if (typeof B == "function") {
      const Q = W(B, M);
      oe[M] = Q, i.actions[M] = B;
    }
  }
  return ft(K, oe), ft(G(K), oe), Object.defineProperty(K, "$state", {
    get: () => o.state.value[e],
    set: (M) => {
      A((B) => {
        ft(B, M);
      });
    }
  }), o._p.forEach((M) => {
    ft(K, a.run(() => M({
      store: K,
      app: o._a,
      pinia: o,
      options: i
    })));
  }), v && n && r.hydrate && r.hydrate(K.$state, v), u = !0, c = !0, K;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function pa(e, t, r) {
  let o;
  const s = typeof t == "function";
  o = s ? r : t;
  function n(a, i) {
    const l = Hi();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (l ? sr(ua, null) : null), a && ro(a), a = ca, a._s.has(e) || (s ? fa(e, t, o, a) : nc(e, o, a)), a._s.get(e);
  }
  return n.$id = e, n;
}
var ac = Object.defineProperty, Es = Object.getOwnPropertySymbols, ic = Object.prototype.hasOwnProperty, lc = Object.prototype.propertyIsEnumerable, Ls = (e, t, r) => t in e ? ac(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, cc = (e, t) => {
  for (var r in t || (t = {}))
    ic.call(t, r) && Ls(e, r, t[r]);
  if (Es)
    for (var r of Es(t))
      lc.call(t, r) && Ls(e, r, t[r]);
  return e;
};
function Yo(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
function uc(e) {
  return !!(e && e.constructor && e.call && e.apply);
}
function se(e) {
  return !Yo(e);
}
function Ot(e, t = !0) {
  return e instanceof Object && e.constructor === Object && (t || Object.keys(e).length !== 0);
}
function jt(e, ...t) {
  return uc(e) ? e(...t) : e;
}
function Kt(e, t = !0) {
  return typeof e == "string" && (t || e !== "");
}
function ba(e, t = !0) {
  return Array.isArray(e) && (t || e.length !== 0);
}
function ga(e) {
  return se(e) && !isNaN(e);
}
function nt(e, t) {
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
      Ot(o[n]) && n in r && Ot(r[n]) ? s[n] = t(r[n], o[n]) : s[n] = o[n];
    }), s;
  };
  return e.reduce((r, o, s) => s === 0 ? o : t(r, o), {});
}
function ir(e) {
  return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":");
}
function ha(e) {
  return Kt(e) ? e.replace(/(_)/g, "-").replace(/[A-Z]/g, (t, r) => r === 0 ? t : "-" + t.toLowerCase()).toLowerCase() : e;
}
function Rs(e) {
  return Kt(e) ? e.replace(/[A-Z]/g, (t, r) => r === 0 ? t : "." + t.toLowerCase()).toLowerCase() : e;
}
function ma() {
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
var fc = Object.defineProperty, pc = Object.defineProperties, bc = Object.getOwnPropertyDescriptors, Br = Object.getOwnPropertySymbols, xa = Object.prototype.hasOwnProperty, va = Object.prototype.propertyIsEnumerable, Ns = (e, t, r) => t in e ? fc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Me = (e, t) => {
  for (var r in t || (t = {}))
    xa.call(t, r) && Ns(e, r, t[r]);
  if (Br)
    for (var r of Br(t))
      va.call(t, r) && Ns(e, r, t[r]);
  return e;
}, go = (e, t) => pc(e, bc(t)), Xe = (e, t) => {
  var r = {};
  for (var o in e)
    xa.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
  if (e != null && Br)
    for (var o of Br(e))
      t.indexOf(o) < 0 && va.call(e, o) && (r[o] = e[o]);
  return r;
}, gc = ma(), tt = gc;
function Ms(e, t) {
  ba(e) ? e.push(...t || []) : Ot(e) && Object.assign(e, t);
}
function hc(e) {
  return Ot(e) && e.hasOwnProperty("value") && e.hasOwnProperty("type") ? e.value : e;
}
function Fs(e, t = "") {
  return ["opacity", "z-index", "line-height", "font-weight", "flex", "flex-grow", "flex-shrink", "order"].some((o) => t.endsWith(o)) ? e : `${e}`.trim().split(" ").map((n) => ga(n) ? `${n}px` : n).join(" ");
}
function mc(e) {
  return e.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function Ao(e = "", t = "") {
  return mc(`${Kt(e, !1) && Kt(t, !1) ? `${e}-` : e}${t}`);
}
function ya(e = "", t = "") {
  return `--${Ao(e, t)}`;
}
function ka(e, t = "", r = "", o = [], s) {
  if (Kt(e)) {
    const n = /{([^}]*)}/g, a = e.trim();
    if (nt(a, n)) {
      const i = a.replaceAll(n, (c) => {
        const h = c.replace(/{|}/g, "").split(".").filter((b) => !o.some((v) => nt(b, v)));
        return `var(${ya(r, ha(h.join("-")))}${se(s) ? `, ${s}` : ""})`;
      }), l = /(\d+\s+[\+\-\*\/]\s+\d+)/g, u = /var\([^)]+\)/g;
      return nt(i.replace(u, "0"), l) ? `calc(${i})` : i;
    }
    return Fs(a, t);
  } else if (ga(e))
    return Fs(e, t);
}
function xc(e, t, r) {
  Kt(t, !1) && e.push(`${t}:${r};`);
}
function Nt(e, t) {
  return e ? `${e}{${t}}` : "";
}
var lr = (...e) => vc(me.getTheme(), ...e), vc = (e = {}, t, r, o) => {
  if (t) {
    const { variable: s, options: n } = me.defaults || {}, { prefix: a, transform: i } = (e == null ? void 0 : e.options) || n || {}, u = nt(t, /{([^}]*)}/g) ? t : `{${t}}`;
    return o === "value" || Yo(o) && i === "strict" ? me.getTokenValue(t) : ka(u, void 0, a, [s.excludedKeyRegex], r);
  }
  return "";
};
function yc(e, t = {}) {
  const r = me.defaults.variable, { prefix: o = r.prefix, selector: s = r.selector, excludedKeyRegex: n = r.excludedKeyRegex } = t, a = (u, c = "") => Object.entries(u).reduce(
    (p, [h, b]) => {
      const v = nt(h, n) ? Ao(c) : Ao(c, ha(h)), m = hc(b);
      if (Ot(m)) {
        const { variables: A, tokens: $ } = a(m, v);
        Ms(p.tokens, $), Ms(p.variables, A);
      } else
        p.tokens.push((o ? v.replace(`${o}-`, "") : v).replaceAll("-", ".")), xc(p.variables, ya(v), ka(m, v, o, [n]));
      return p;
    },
    { variables: [], tokens: [] }
  ), { variables: i, tokens: l } = a(e, o);
  return {
    value: i,
    tokens: l,
    declarations: i.join(""),
    css: Nt(s, i.join(""))
  };
}
var Ne = {
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
    const { preset: h, options: b } = t;
    let v, m, A, $, V, W, P;
    if (se(h) && b.transform !== "strict") {
      const { primitive: K, semantic: fe, extend: oe } = h, M = fe || {}, { colorScheme: B } = M, Q = Xe(M, ["colorScheme"]), ae = oe || {}, { colorScheme: ce } = ae, be = Xe(ae, ["colorScheme"]), Se = B || {}, { dark: ze } = Se, Z = Xe(Se, ["dark"]), N = ce || {}, { dark: J } = N, Ce = Xe(N, ["dark"]), Te = se(K) ? this._toVariables({ primitive: K }, b) : {}, ue = se(Q) ? this._toVariables({ semantic: Q }, b) : {}, de = se(Z) ? this._toVariables({ light: Z }, b) : {}, yt = se(ze) ? this._toVariables({ dark: ze }, b) : {}, ut = se(be) ? this._toVariables({ semantic: be }, b) : {}, yr = se(Ce) ? this._toVariables({ light: Ce }, b) : {}, dt = se(J) ? this._toVariables({ dark: J }, b) : {}, [zt, Ut] = [(n = Te.declarations) != null ? n : "", Te.tokens], [kr, kt] = [(a = ue.declarations) != null ? a : "", ue.tokens || []], [Qo, d] = [(i = de.declarations) != null ? i : "", de.tokens || []], [f, g] = [(l = yt.declarations) != null ? l : "", yt.tokens || []], [w, x] = [(u = ut.declarations) != null ? u : "", ut.tokens || []], [y, T] = [(c = yr.declarations) != null ? c : "", yr.tokens || []], [C, S] = [(p = dt.declarations) != null ? p : "", dt.tokens || []];
      v = this.transformCSS(e, zt, "light", "variable", b, o, s), m = Ut;
      const _ = this.transformCSS(e, `${kr}${Qo}`, "light", "variable", b, o, s), E = this.transformCSS(e, `${f}`, "dark", "variable", b, o, s);
      A = `${_}${E}`, $ = [.../* @__PURE__ */ new Set([...kt, ...d, ...g])];
      const j = this.transformCSS(e, `${w}${y}color-scheme:light`, "light", "variable", b, o, s), I = this.transformCSS(e, `${C}color-scheme:dark`, "dark", "variable", b, o, s);
      V = `${j}${I}`, W = [.../* @__PURE__ */ new Set([...x, ...T, ...S])], P = jt(h.css, { dt: lr });
    }
    return {
      primitive: {
        css: v,
        tokens: m
      },
      semantic: {
        css: A,
        tokens: $
      },
      global: {
        css: V,
        tokens: W
      },
      style: P
    };
  },
  getPreset({ name: e = "", preset: t = {}, options: r, params: o, set: s, defaults: n, selector: a }) {
    var i, l, u;
    let c, p, h;
    if (se(t) && r.transform !== "strict") {
      const b = e.replace("-directive", ""), v = t, { colorScheme: m, extend: A, css: $ } = v, V = Xe(v, ["colorScheme", "extend", "css"]), W = A || {}, { colorScheme: P } = W, K = Xe(W, ["colorScheme"]), fe = m || {}, { dark: oe } = fe, M = Xe(fe, ["dark"]), B = P || {}, { dark: Q } = B, ae = Xe(B, ["dark"]), ce = se(V) ? this._toVariables({ [b]: Me(Me({}, V), K) }, r) : {}, be = se(M) ? this._toVariables({ [b]: Me(Me({}, M), ae) }, r) : {}, Se = se(oe) ? this._toVariables({ [b]: Me(Me({}, oe), Q) }, r) : {}, [ze, Z] = [(i = ce.declarations) != null ? i : "", ce.tokens || []], [N, J] = [(l = be.declarations) != null ? l : "", be.tokens || []], [Ce, Te] = [(u = Se.declarations) != null ? u : "", Se.tokens || []], ue = this.transformCSS(b, `${ze}${N}`, "light", "variable", r, s, n, a), de = this.transformCSS(b, Ce, "dark", "variable", r, s, n, a);
      c = `${ue}${de}`, p = [.../* @__PURE__ */ new Set([...Z, ...J, ...Te])], h = jt($, { dt: lr });
    }
    return {
      css: c,
      tokens: p,
      style: h
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
    return s ? `@layer ${jt(s.order || "primeui", r)}` : "";
  },
  getCommonStyleSheet({ name: e = "", theme: t = {}, params: r, props: o = {}, set: s, defaults: n }) {
    const a = this.getCommon({ name: e, theme: t, params: r, set: s, defaults: n }), i = Object.entries(o).reduce((l, [u, c]) => l.push(`${u}="${c}"`) && l, []).join(" ");
    return Object.entries(a || {}).reduce((l, [u, c]) => {
      if (c != null && c.css) {
        const p = ir(c == null ? void 0 : c.css), h = `${u}-variables`;
        l.push(`<style type="text/css" data-primevue-style-id="${h}" ${i}>${p}</style>`);
      }
      return l;
    }, []).join("");
  },
  getStyleSheet({ name: e = "", theme: t = {}, params: r, props: o = {}, set: s, defaults: n }) {
    var a;
    const i = { name: e, theme: t, params: r, set: s, defaults: n }, l = (a = e.includes("-directive") ? this.getPresetD(i) : this.getPresetC(i)) == null ? void 0 : a.css, u = Object.entries(o).reduce((c, [p, h]) => c.push(`${p}="${h}"`) && c, []).join(" ");
    return l ? `<style type="text/css" data-primevue-style-id="${e}-variables" ${u}>${ir(l)}</style>` : "";
  },
  createTokens(e = {}, t, r = "", o = "", s = {}) {
    return Object.entries(e).forEach(([n, a]) => {
      const i = nt(n, t.variable.excludedKeyRegex) ? r : r ? `${r}.${Rs(n)}` : Rs(n), l = o ? `${o}.${n}` : n;
      Ot(a) ? this.createTokens(a, t, i, l, s) : (s[i] || (s[i] = {
        paths: [],
        computed(u, c = {}) {
          var p, h;
          return this.paths.length === 1 ? (p = this.paths[0]) == null ? void 0 : p.computed(this.paths[0].scheme, c.binding) : u && u !== "none" ? (h = this.paths.find((b) => b.scheme === u)) == null ? void 0 : h.computed(u, c.binding) : this.paths.map((b) => b.computed(b.scheme, c[b.scheme]));
        }
      }), s[i].paths.push({
        path: l,
        value: a,
        scheme: l.includes("colorScheme.light") ? "light" : l.includes("colorScheme.dark") ? "dark" : "none",
        computed(u, c = {}) {
          const p = /{([^}]*)}/g;
          let h = a;
          if (c.name = this.path, c.binding || (c.binding = {}), nt(a, p)) {
            const v = a.trim().replaceAll(p, ($) => {
              var V;
              const W = $.replace(/{|}/g, ""), P = (V = s[W]) == null ? void 0 : V.computed(u, c);
              return ba(P) && P.length === 2 ? `light-dark(${P[0].value},${P[1].value})` : P == null ? void 0 : P.value;
            }), m = /(\d+\w*\s+[\+\-\*\/]\s+\d+\w*)/g, A = /var\([^)]+\)/g;
            h = nt(v.replace(A, "0"), m) ? `calc(${v})` : v;
          }
          return Yo(c.binding) && delete c.binding, {
            colorScheme: u,
            path: this.path,
            paths: c,
            value: h.includes("undefined") ? void 0 : h
          };
        }
      }));
    }), s;
  },
  getTokenValue(e, t, r) {
    var o;
    const n = ((l) => l.split(".").filter((c) => !nt(c.toLowerCase(), r.variable.excludedKeyRegex)).join("."))(t), a = t.includes("colorScheme.light") ? "light" : t.includes("colorScheme.dark") ? "dark" : void 0, i = [(o = e[n]) == null ? void 0 : o.computed(a)].flat().filter((l) => l);
    return i.length === 1 ? i[0].value : i.reduce((l = {}, u) => {
      const c = u, { colorScheme: p } = c, h = Xe(c, ["colorScheme"]);
      return l[p] = h, l;
    }, void 0);
  },
  getSelectorRule(e, t, r, o) {
    return r === "class" || r === "attr" ? Nt(se(t) ? `${e}${t},${e} ${t}` : e, o) : Nt(e, se(t) ? Nt(t, o) : o);
  },
  transformCSS(e, t, r, o, s = {}, n, a, i) {
    if (se(t)) {
      const { cssLayer: l } = s;
      if (o !== "style") {
        const u = this.getColorSchemeOption(s, a);
        t = r === "dark" ? u.reduce((c, { type: p, selector: h }) => (se(h) && (c += h.includes("[CSS]") ? h.replace("[CSS]", t) : this.getSelectorRule(h, i, p, t)), c), "") : Nt(i ?? ":root", t);
      }
      if (l) {
        const u = {
          name: "primeui"
        };
        Ot(l) && (u.name = jt(l.name, { name: e, type: o })), se(u.name) && (t = Nt(`@layer ${u.name}`, t), n == null || n.layerNames(u.name));
      }
      return t;
    }
    return "";
  }
}, me = {
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
    t && (this._theme = go(Me({}, t), {
      options: Me(Me({}, this.defaults.options), t.options)
    }), this._tokens = Ne.createTokens(this.preset, this.defaults), this.clearLoadedStyleNames());
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
    this.update({ theme: e }), tt.emit("theme:change", e);
  },
  getPreset() {
    return this.preset;
  },
  setPreset(e) {
    this._theme = go(Me({}, this.theme), { preset: e }), this._tokens = Ne.createTokens(e, this.defaults), this.clearLoadedStyleNames(), tt.emit("preset:change", e), tt.emit("theme:change", this.theme);
  },
  getOptions() {
    return this.options;
  },
  setOptions(e) {
    this._theme = go(Me({}, this.theme), { options: e }), this.clearLoadedStyleNames(), tt.emit("options:change", e), tt.emit("theme:change", this.theme);
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
    return Ne.getTokenValue(this.tokens, e, this.defaults);
  },
  getCommon(e = "", t) {
    return Ne.getCommon({ name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
  },
  getComponent(e = "", t) {
    const r = { name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
    return Ne.getPresetC(r);
  },
  getDirective(e = "", t) {
    const r = { name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
    return Ne.getPresetD(r);
  },
  getCustomPreset(e = "", t, r, o) {
    const s = { name: e, preset: t, options: this.options, selector: r, params: o, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
    return Ne.getPreset(s);
  },
  getLayerOrderCSS(e = "") {
    return Ne.getLayerOrder(e, this.options, { names: this.getLayerNames() }, this.defaults);
  },
  transformCSS(e = "", t, r = "style", o) {
    return Ne.transformCSS(e, t, o, r, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults);
  },
  getCommonStyleSheet(e = "", t, r = {}) {
    return Ne.getCommonStyleSheet({ name: e, theme: this.theme, params: t, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
  },
  getStyleSheet(e, t, r = {}) {
    return Ne.getStyleSheet({ name: e, theme: this.theme, params: t, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
  },
  onStyleMounted(e) {
    this._loadingStyles.add(e);
  },
  onStyleUpdated(e) {
    this._loadingStyles.add(e);
  },
  onStyleLoaded(e, { name: t }) {
    this._loadingStyles.size && (this._loadingStyles.delete(t), tt.emit(`theme:${t}:load`, e), !this._loadingStyles.size && tt.emit("theme:load"));
  }
};
function wa(e) {
  return typeof HTMLElement == "object" ? e instanceof HTMLElement : e && typeof e == "object" && e !== null && e.nodeType === 1 && typeof e.nodeName == "string";
}
function Oo(e, t = {}) {
  if (wa(e)) {
    const r = (o, s) => {
      var n, a;
      const i = (n = e == null ? void 0 : e.$attrs) != null && n[o] ? [(a = e == null ? void 0 : e.$attrs) == null ? void 0 : a[o]] : [];
      return [s].flat().reduce((l, u) => {
        if (u != null) {
          const c = typeof u;
          if (c === "string" || c === "number")
            l.push(u);
          else if (c === "object") {
            const p = Array.isArray(u) ? r(o, u) : Object.entries(u).map(([h, b]) => o === "style" && (b || b === 0) ? `${h.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${b}` : b ? h : void 0);
            l = p.length ? l.concat(p.filter((h) => !!h)) : l;
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
  wa(e) && r !== null && r !== void 0 && e.setAttribute(t, r);
}
var ge = {
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
function Ds(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), r.push.apply(r, o);
  }
  return r;
}
function Vs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ds(Object(r), !0).forEach(function(o) {
      Cc(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ds(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
function Cc(e, t, r) {
  return (t = Tc(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Tc(e) {
  var t = jc(e, "string");
  return br(t) == "symbol" ? t : t + "";
}
function jc(e, t) {
  if (br(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var o = r.call(e, t);
    if (br(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Pc(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  qo() ? Rn(e) : t ? e() : Ho(e);
}
var Ac = 0;
function Oc(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = _e(!1), o = _e(e), s = _e(null), n = _c() ? window.document : void 0, a = t.document, i = a === void 0 ? n : a, l = t.immediate, u = l === void 0 ? !0 : l, c = t.manual, p = c === void 0 ? !1 : c, h = t.name, b = h === void 0 ? "style_".concat(++Ac) : h, v = t.id, m = v === void 0 ? void 0 : v, A = t.media, $ = A === void 0 ? void 0 : A, V = t.nonce, W = V === void 0 ? void 0 : V, P = t.first, K = P === void 0 ? !1 : P, fe = t.onMounted, oe = fe === void 0 ? void 0 : fe, M = t.onUpdated, B = M === void 0 ? void 0 : M, Q = t.onLoad, ae = Q === void 0 ? void 0 : Q, ce = t.props, be = ce === void 0 ? {} : ce, Se = function() {
  }, ze = function(J) {
    var Ce = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (i) {
      var Te = Vs(Vs({}, be), Ce), ue = Te.name || b, de = Te.id || m, yt = Te.nonce || W;
      s.value = i.querySelector('style[data-primevue-style-id="'.concat(ue, '"]')) || i.getElementById(de) || i.createElement("style"), s.value.isConnected || (o.value = J || e, Oo(s.value, {
        type: "text/css",
        id: de,
        media: $,
        nonce: yt
      }), K ? i.head.prepend(s.value) : i.head.appendChild(s.value), Sc(s.value, "data-primevue-style-id", ue), Oo(s.value, Te), s.value.onload = function(ut) {
        return ae == null ? void 0 : ae(ut, {
          name: ue
        });
      }, oe == null || oe(ue)), !r.value && (Se = Ge(o, function(ut) {
        s.value.textContent = ut, B == null || B(ue);
      }, {
        immediate: !0
      }), r.value = !0);
    }
  }, Z = function() {
    !i || !r.value || (Se(), wc(s.value) && i.head.removeChild(s.value), r.value = !1);
  };
  return u && !p && Pc(ze), {
    id: m,
    name: b,
    el: s,
    css: o,
    unload: Z,
    load: ze,
    isLoaded: zr(r)
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
function Bs(e, t) {
  return Ec(e) || $c(e, t) || zc(e, t) || Ic();
}
function Ic() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zc(e, t) {
  if (e) {
    if (typeof e == "string") return Hs(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Hs(e, t) : void 0;
  }
}
function Hs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, o = Array(t); r < t; r++) o[r] = e[r];
  return o;
}
function $c(e, t) {
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
function Ec(e) {
  if (Array.isArray(e)) return e;
}
function Ks(e, t) {
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
    t % 2 ? Ks(Object(r), !0).forEach(function(o) {
      Lc(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ks(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
function Lc(e, t, r) {
  return (t = Rc(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Rc(e) {
  var t = Nc(e, "string");
  return gr(t) == "symbol" ? t : t + "";
}
function Nc(e, t) {
  if (gr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var o = r.call(e, t);
    if (gr(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Mc = function(t) {
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
  theme: Mc,
  classes: Dc,
  inlineStyles: Vc,
  load: function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(n) {
      return n;
    }, s = o(jt(t, {
      dt: lr
    }));
    return se(s) ? Oc(ir(s), ho({
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
      return me.transformCSS(r.name || t.name, "".concat(s).concat(o));
    });
  },
  getCommonTheme: function(t) {
    return me.getCommon(this.name, t);
  },
  getComponentTheme: function(t) {
    return me.getComponent(this.name, t);
  },
  getDirectiveTheme: function(t) {
    return me.getDirective(this.name, t);
  },
  getPresetTheme: function(t, r, o) {
    return me.getCustomPreset(this.name, t, r, o);
  },
  getLayerOrderThemeCSS: function() {
    return me.getLayerOrderCSS(this.name);
  },
  getStyleSheet: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var o = jt(this.css, {
        dt: lr
      }) || "", s = ir("".concat(o).concat(t)), n = Object.entries(r).reduce(function(a, i) {
        var l = Bs(i, 2), u = l[0], c = l[1];
        return a.push("".concat(u, '="').concat(c, '"')) && a;
      }, []).join(" ");
      return se(s) ? '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(n, ">").concat(s, "</style>") : "";
    }
    return "";
  },
  getCommonThemeStyleSheet: function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return me.getCommonStyleSheet(this.name, t, r);
  },
  getThemeStyleSheet: function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = [me.getStyleSheet(this.name, t, r)];
    if (this.theme) {
      var s = this.name === "base" ? "global-style" : "".concat(this.name, "-style"), n = jt(this.theme, {
        dt: lr
      }), a = ir(me.transformCSS(s, n)), i = Object.entries(r).reduce(function(l, u) {
        var c = Bs(u, 2), p = c[0], h = c[1];
        return l.push("".concat(p, '="').concat(h, '"')) && l;
      }, []).join(" ");
      se(a) && o.push('<style type="text/css" data-primevue-style-id="'.concat(s, '" ').concat(i, ">").concat(a, "</style>"));
    }
    return o.join("");
  },
  extend: function(t) {
    return ho(ho({}, this), {}, {
      css: void 0,
      theme: void 0
    }, t);
  }
}, Tr = ma();
function hr(e) {
  "@babel/helpers - typeof";
  return hr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, hr(e);
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
function jr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ws(Object(r), !0).forEach(function(o) {
      Bc(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ws(Object(r)).forEach(function(o) {
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
    text: [ge.STARTS_WITH, ge.CONTAINS, ge.NOT_CONTAINS, ge.ENDS_WITH, ge.EQUALS, ge.NOT_EQUALS],
    numeric: [ge.EQUALS, ge.NOT_EQUALS, ge.LESS_THAN, ge.LESS_THAN_OR_EQUAL_TO, ge.GREATER_THAN, ge.GREATER_THAN_OR_EQUAL_TO],
    date: [ge.DATE_IS, ge.DATE_IS_NOT, ge.DATE_BEFORE, ge.DATE_AFTER]
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
var Mt = [];
function Gc() {
  tt.clear(), Mt.forEach(function(e) {
    return e == null ? void 0 : e();
  }), Mt = [];
}
function qc(e, t) {
  var r = _e(!1), o = function() {
    var u;
    if (((u = t.config) === null || u === void 0 ? void 0 : u.theme) !== "none" && !me.isStyleNameLoaded("common")) {
      var c, p, h = ((c = Lt.getCommonTheme) === null || c === void 0 ? void 0 : c.call(Lt)) || {}, b = h.primitive, v = h.semantic, m = h.global, A = h.style, $ = {
        nonce: (p = t.config) === null || p === void 0 || (p = p.csp) === null || p === void 0 ? void 0 : p.nonce
      };
      Lt.load(b == null ? void 0 : b.css, jr({
        name: "primitive-variables"
      }, $)), Lt.load(v == null ? void 0 : v.css, jr({
        name: "semantic-variables"
      }, $)), Lt.load(m == null ? void 0 : m.css, jr({
        name: "global-variables"
      }, $)), Lt.loadTheme(jr({
        name: "global-style"
      }, $), A), me.setLoadedStyleName("common");
    }
  };
  tt.on("theme:change", function(l) {
    r.value || (e.config.globalProperties.$primevue.config.theme = l, r.value = !0);
  });
  var s = Ge(t.config, function(l, u) {
    Tr.emit("config:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  }), n = Ge(function() {
    return t.config.ripple;
  }, function(l, u) {
    Tr.emit("config:ripple:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  }), a = Ge(function() {
    return t.config.theme;
  }, function(l, u) {
    r.value || me.setTheme(l), t.config.unstyled || o(), r.value = !1, Tr.emit("config:theme:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  }), i = Ge(function() {
    return t.config.unstyled;
  }, function(l, u) {
    !l && t.config.theme && o(), Tr.emit("config:unstyled:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  });
  Mt.push(s), Mt.push(n), Mt.push(a), Mt.push(i);
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
}, Us = {
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
}, Js = {
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
}, ju = {
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
}, Pu = {
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
}, Ou = {
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
}, Iu = {
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
}, zu = {
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
}, $u = {
  root: {
    class: ["flex items-stretch", "w-full"]
  }
}, Eu = {
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
}, Nu = {
  root: {
    class: [
      // Alignment
      "flex items-center",
      "gap-2",
      "[&_[data-pc-name^=pcinput]]:w-10"
    ]
  }
}, Mu = {
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
}, Gs = {
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
}, qs = {
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
}, jd = {
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
}, Pd = {
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
}, Od = {
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
}, Id = {
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
}, zd = {
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
}, $d = {
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
}, Ed = {
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
}, Ys = {
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
}, Nd = {
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
}, Md = {
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
  select: qs,
  dropdown: qs,
  inputnumber: Ru,
  inputtext: Mu,
  datepicker: Us,
  calendar: Us,
  checkbox: pu,
  radiobutton: od,
  toggleswitch: Ys,
  inputswitch: Ys,
  selectbutton: ld,
  slider: ud,
  rating: sd,
  multiselect: Uu,
  togglebutton: Ed,
  cascadeselect: fu,
  listbox: Du,
  colorpicker: gu,
  inputgroup: $u,
  inputgroupaddon: Eu,
  inputmask: Lu,
  knob: Fu,
  treeselect: Md,
  textarea: Od,
  password: Xu,
  iconfield: Ou,
  floatlabel: ju,
  inputotp: Nu,
  //buttons
  button: lu,
  buttongroup: cu,
  splitbutton: fd,
  speeddial: dd,
  //data
  paginator: Yu,
  datatable: vu,
  tree: Nd,
  dataview: yu,
  organizationchart: Gu,
  orderlist: Ju,
  picklist: ed,
  treetable: Fd,
  timeline: zd,
  //panels
  accordion: Qc,
  accordionpanel: eu,
  accordionheader: Xc,
  accordioncontent: Zc,
  panel: Qu,
  fieldset: Cu,
  card: uu,
  tabview: jd,
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
  tieredmenu: Id,
  breadcrumb: iu,
  panelmenu: Zu,
  megamenu: Vu,
  dock: Su,
  tabmenu: _d,
  //overlays
  dialog: wu,
  popover: Gs,
  sidebar: Gs,
  drawer: Js,
  overlaypanel: Js,
  confirmpopup: mu,
  confirmdialog: hu,
  //messages
  message: Ku,
  toast: $d,
  //media
  carousel: du,
  galleria: Pu,
  image: Iu,
  //misc
  badge: su,
  overlaybadge: qu,
  avatar: ru,
  avatargroup: ou,
  tag: Pd,
  chip: bu,
  progressbar: td,
  skeleton: cd,
  scrolltop: id,
  terminal: Ad,
  blockui: au,
  metergroup: Wu,
  inplace: zu,
  progressspinner: rd
}, _a = /* @__PURE__ */ pa("attacks", () => {
  const e = _e([]), t = _e(null), r = at(
    () => e.value.find((b) => b.sessionId === t.value) ?? e.value[0] ?? null
  );
  function o(b, v, m = 0) {
    const A = e.value.find((V) => V.sessionId === b);
    if (A) {
      m > 0 && (A.total = m);
      return;
    }
    const $ = {
      sessionId: b,
      requestId: v,
      startedAt: Date.now(),
      results: [],
      total: m,
      complete: !1,
      errors: [],
      recoveredKeys: [],
      discoveredEndpoints: [],
      keyRecoveryLog: []
    };
    e.value.unshift($), t.value = b;
  }
  function s(b, v) {
    const m = e.value.find((A) => A.sessionId === b);
    m && (m.total = v);
  }
  function n(b, v) {
    const m = e.value.find((A) => A.sessionId === b);
    m && m.results.push(v);
  }
  function a(b, v) {
    const m = e.value.find((A) => A.sessionId === b);
    m && (m.complete = !0, m.errors.push(...v));
  }
  function i(b, v) {
    const m = e.value.find((A) => A.sessionId === b);
    m && !m.recoveredKeys.includes(v) && m.recoveredKeys.push(v);
  }
  function l(b, v) {
    const m = e.value.find((A) => A.sessionId === b);
    m && m.keyRecoveryLog.push(v);
  }
  function u(b, v) {
    const m = e.value.find((A) => A.sessionId === b);
    m && !m.discoveredEndpoints.some((A) => A.url === v.url) && m.discoveredEndpoints.push(v);
  }
  function c(b, v, m) {
    const A = e.value.find(($) => $.sessionId === b);
    A && (A.jwksJson = v, A.jwksPrivateKey = m);
  }
  function p(b) {
    t.value = b;
  }
  function h() {
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
    clearSessions: h
  };
}), Qs = {
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
function Sa(e) {
  return e ? e < 300 ? "text-green-400" : e < 400 ? "text-yellow-400" : e < 500 ? "text-orange-400" : "text-red-400" : "text-gray-400";
}
function Ca(e) {
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
}, Qd = { class: "font-semibold mb-1" }, Zd = { class: "text-cyan-400" }, Xd = {
  key: 0,
  class: "text-cyan-500"
}, ef = {
  key: 1,
  class: "h-1 bg-gray-800"
}, tf = {
  key: 2,
  class: "px-3 py-1.5 bg-red-950 border-b border-red-800 text-xs text-red-300 max-h-28 overflow-y-auto"
}, rf = { class: "font-semibold mb-0.5" }, of = {
  key: 3,
  class: "px-3 py-1.5 bg-yellow-950 border-b border-yellow-800 text-xs text-yellow-300 max-h-16 overflow-y-auto"
}, sf = {
  key: 4,
  class: "px-3 py-1.5 bg-green-950 border-b border-green-800 text-xs text-green-300"
}, nf = { class: "flex gap-1 px-2 py-1.5 border-b border-gray-700 overflow-x-auto shrink-0" }, af = ["onClick"], lf = { class: "flex-1 overflow-y-auto" }, cf = {
  key: 0,
  class: "flex items-center justify-center h-full text-gray-500 text-sm py-8"
}, uf = ["onClick"], df = { class: "flex items-center gap-2 min-w-0" }, ff = { class: "text-xs text-gray-200 truncate flex-1" }, pf = {
  key: 1,
  class: "text-xs text-red-500 shrink-0"
}, bf = {
  key: 2,
  class: "text-xs text-gray-600 shrink-0 animate-pulse"
}, gf = { class: "text-xs text-gray-500 mt-0.5 truncate pl-0.5" }, hf = /* @__PURE__ */ Qr({
  __name: "AttackList",
  props: {
    selectedId: {}
  },
  emits: ["select", "showJwks"],
  setup(e, { emit: t }) {
    const r = t, o = _a(), s = _e("all"), n = at(() => o.activeSession), a = at(() => {
      var b;
      const l = ((b = n.value) == null ? void 0 : b.results) ?? [], u = l.filter((v) => v.responseStatus && v.responseStatus < 300).length, c = l.filter((v) => v.responseStatus && v.responseStatus >= 400 && v.responseStatus < 500).length, p = l.filter((v) => v.responseStatus && v.responseStatus >= 500).length, h = l.filter((v) => v.error).length;
      return [
        { key: "all", label: "All", count: l.length },
        { key: "2xx", label: "2xx", count: u },
        { key: "4xx", label: "4xx", count: c },
        { key: "5xx", label: "5xx", count: p },
        { key: "err", label: "Errors", count: h }
      ];
    }), i = at(() => {
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
      var c, p, h, b, v;
      return O(), z("div", Bd, [
        H(" Session selector + progress bar "),
        k("div", Hd, [
          $e(o).sessions.length > 1 ? (O(), z("select", {
            key: 0,
            value: $e(o).activeSessionId,
            onChange: u[0] || (u[0] = (m) => $e(o).setActiveSession(m.target.value)),
            class: "text-xs bg-gray-800 border border-gray-600 rounded px-2 py-1 text-gray-300 flex-1 min-w-0"
          }, [
            (O(!0), z(
              ne,
              null,
              rt($e(o).sessions, (m) => (O(), z("option", {
                key: m.sessionId,
                value: m.sessionId
              }, " Session " + F(m.sessionId.slice(0, 6)) + " — " + F(m.results.length) + "/" + F(m.total) + " (" + F(new Date(m.startedAt).toLocaleTimeString()) + ") ", 9, Wd))),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 40, Kd)) : (O(), z("span", Ud, [
            n.value ? (O(), z(
              ne,
              { key: 0 },
              [
                Fe(
                  F(n.value.results.length) + "/" + F(n.value.total) + " attacks ",
                  1
                  /* TEXT */
                ),
                n.value.complete ? (O(), z("span", Gd, "✓ complete")) : (O(), z("span", Jd, "running…")),
                n.value.discoveredEndpoints.length ? (O(), z(
                  "span",
                  qd,
                  "🔎 " + F(n.value.discoveredEndpoints.length) + " key endpoint(s)",
                  1
                  /* TEXT */
                )) : H("v-if", !0)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (O(), z(
              ne,
              { key: 1 },
              [
                Fe("No active session")
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ])),
          $e(o).sessions.length ? (O(), z("button", {
            key: 2,
            onClick: u[1] || (u[1] = (m) => $e(o).clearSessions()),
            class: "text-xs text-gray-500 hover:text-red-400 transition-colors"
          }, "Clear")) : H("v-if", !0)
        ]),
        H(" Discovered JWKS / key endpoints — highlighted so the analyst can't miss it "),
        (c = n.value) != null && c.discoveredEndpoints.length ? (O(), z("div", Yd, [
          k(
            "p",
            Qd,
            "🔎 " + F(n.value.discoveredEndpoints.length) + " key endpoint(s) discovered on the target:",
            1
            /* TEXT */
          ),
          (O(!0), z(
            ne,
            null,
            rt(n.value.discoveredEndpoints, (m, A) => (O(), z("p", {
              key: A,
              class: "font-mono break-all leading-snug"
            }, [
              k(
                "span",
                Zd,
                "[" + F(m.source) + "]",
                1
                /* TEXT */
              ),
              Fe(
                " " + F(m.url) + " ",
                1
                /* TEXT */
              ),
              m.keyCount ? (O(), z(
                "span",
                Xd,
                "— " + F(m.keyCount) + " key(s)",
                1
                /* TEXT */
              )) : H("v-if", !0)
            ]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : H("v-if", !0),
        H(" Progress bar "),
        n.value && !n.value.complete ? (O(), z("div", ef, [
          k(
            "div",
            {
              class: "h-1 bg-blue-500 transition-all duration-300",
              style: Jr({ width: n.value.total ? `${n.value.results.length / n.value.total * 100}%` : "0%" })
            },
            null,
            4
            /* STYLE */
          )
        ])) : H("v-if", !0),
        H(" Errors / warnings "),
        (p = n.value) != null && p.errors.length ? (O(), z("div", tf, [
          k(
            "p",
            rf,
            "⚠ " + F(n.value.errors.length) + " error(s):",
            1
            /* TEXT */
          ),
          (O(!0), z(
            ne,
            null,
            rt(n.value.errors, (m, A) => (O(), z(
              "p",
              {
                key: A,
                class: "font-mono break-all"
              },
              F(m),
              1
              /* TEXT */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : H("v-if", !0),
        H(" Key recovery log "),
        (h = n.value) != null && h.keyRecoveryLog.length ? (O(), z("div", of, [
          (O(!0), z(
            ne,
            null,
            rt(n.value.keyRecoveryLog, (m, A) => (O(), z(
              "p",
              { key: A },
              F(m),
              1
              /* TEXT */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : H("v-if", !0),
        H(" Recovered keys notice "),
        (b = n.value) != null && b.recoveredKeys.length ? (O(), z(
          "div",
          sf,
          " ✓ Recovered " + F(n.value.recoveredKeys.length) + " public key(s) from HTTP history ",
          1
          /* TEXT */
        )) : H("v-if", !0),
        H(" JWKS info "),
        (v = n.value) != null && v.jwksJson ? (O(), z("div", {
          key: 5,
          class: "px-3 py-1.5 bg-purple-950 border-b border-purple-800 text-xs text-purple-300 cursor-pointer hover:bg-purple-900",
          onClick: u[2] || (u[2] = (m) => r("showJwks", n.value))
        }, " ℹ JKU/X5U spoofing — click to view JWKS payload to host ")) : H("v-if", !0),
        H(" Filter tabs "),
        k("div", nf, [
          (O(!0), z(
            ne,
            null,
            rt(a.value, (m) => (O(), z("button", {
              key: m.key,
              onClick: (A) => s.value = m.key,
              class: Je([
                "px-2 py-0.5 rounded text-xs font-medium transition-colors whitespace-nowrap",
                s.value === m.key ? "bg-blue-700 text-white" : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
              ])
            }, F(m.label) + " (" + F(m.count) + ") ", 11, af))),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        H(" Results list "),
        k("div", lf, [
          !n.value || i.value.length === 0 ? (O(), z("div", cf, [
            n.value ? (O(), z(
              ne,
              { key: 1 },
              [
                Fe("No results yet…")
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (O(), z(
              ne,
              { key: 0 },
              [
                Fe('Right-click a request with a JWT and select "Attack JWT"')
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : H("v-if", !0),
          (O(!0), z(
            ne,
            null,
            rt(i.value, (m) => (O(), z("div", {
              key: m.id,
              onClick: (A) => r("select", m),
              class: Je([
                "px-3 py-2 border-b border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors",
                e.selectedId === m.id ? "bg-gray-800 border-l-2 border-l-blue-500" : ""
              ])
            }, [
              k("div", df, [
                k(
                  "span",
                  {
                    class: Je(["px-1.5 py-0.5 rounded text-xs font-mono shrink-0", $e(Ca)(m.technique)])
                  },
                  F(m.technique),
                  3
                  /* TEXT, CLASS */
                ),
                k(
                  "span",
                  ff,
                  F(m.techniqueName),
                  1
                  /* TEXT */
                ),
                m.responseStatus ? (O(), z(
                  "span",
                  {
                    key: 0,
                    class: Je(["text-xs font-mono font-bold shrink-0", $e(Sa)(m.responseStatus)])
                  },
                  F(m.responseStatus),
                  3
                  /* TEXT, CLASS */
                )) : m.error ? (O(), z("span", pf, "ERR")) : (O(), z("span", bf, "…"))
              ]),
              k(
                "p",
                gf,
                F(m.description.slice(0, 80)),
                1
                /* TEXT */
              )
            ], 10, uf))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]);
    };
  }
});
function Zs(e) {
  const t = e + "=".repeat((4 - e.length % 4) % 4);
  return atob(t.replace(/-/g, "+").replace(/_/g, "/"));
}
const mf = {
  key: 0,
  class: "h-full flex flex-col overflow-hidden text-sm"
}, xf = { class: "px-4 py-3 border-b border-gray-700 bg-gray-900 flex items-start gap-3" }, vf = { class: "flex-1 min-w-0" }, yf = { class: "font-semibold text-gray-100 truncate" }, kf = { class: "text-gray-400 text-xs mt-0.5 leading-relaxed" }, wf = { class: "flex-1 overflow-y-auto" }, _f = { class: "px-4 py-2 border-b border-gray-700 flex gap-6 text-xs" }, Sf = {
  key: 1,
  class: "text-gray-400"
}, Cf = {
  key: 2,
  class: "text-gray-400"
}, Tf = {
  key: 3,
  class: "text-red-400"
}, jf = { class: "px-4 py-3 border-b border-gray-700" }, Pf = { class: "bg-gray-900 rounded p-2 font-mono text-xs break-all text-gray-300 select-all max-h-32 overflow-y-auto" }, Af = { class: "text-yellow-400" }, Of = { class: "text-blue-400" }, If = { class: "text-red-400" }, zf = {
  key: 0,
  class: "px-4 py-3 border-b border-gray-700"
}, $f = { class: "bg-gray-900 rounded p-2 text-xs text-yellow-300 overflow-x-auto max-h-48 overflow-y-auto" }, Ef = {
  key: 1,
  class: "px-4 py-3 border-b border-gray-700"
}, Lf = { class: "bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-48 overflow-y-auto" }, Rf = {
  key: 2,
  class: "px-4 py-3 border-b border-gray-700"
}, Nf = { class: "bg-gray-900 rounded p-2 text-xs font-mono space-y-0.5 max-h-32 overflow-y-auto" }, Mf = { class: "text-blue-400 shrink-0" }, Ff = { class: "text-gray-300 break-all" }, Df = {
  key: 3,
  class: "px-4 py-3"
}, Vf = { class: "bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-64 overflow-y-auto whitespace-pre-wrap break-all" }, Bf = {
  key: 1,
  class: "flex items-center justify-center h-full text-gray-500 text-sm"
}, Hf = /* @__PURE__ */ Qr({
  __name: "AttackDetail",
  props: {
    result: {}
  },
  setup(e) {
    const t = e, r = _e(!1), o = at(() => {
      if (!t.result) return ["", "", ""];
      const i = t.result.modifiedJWT.split(".");
      return [i[0] ?? "", i[1] ?? "", i[2] ?? ""];
    }), s = at(() => {
      if (!t.result) return null;
      try {
        const i = Zs(o.value[0]);
        return JSON.stringify(JSON.parse(i), null, 2);
      } catch {
        return null;
      }
    }), n = at(() => {
      if (!t.result) return null;
      try {
        const i = Zs(o.value[1]);
        return JSON.stringify(JSON.parse(i), null, 2);
      } catch {
        return null;
      }
    });
    async function a() {
      t.result && (await navigator.clipboard.writeText(t.result.modifiedJWT), r.value = !0, setTimeout(() => {
        r.value = !1;
      }, 1500));
    }
    return (i, l) => e.result ? (O(), z("div", mf, [
      H(" Technique header "),
      k("div", xf, [
        k(
          "span",
          {
            class: Je(["px-2 py-0.5 rounded text-xs font-mono font-semibold shrink-0", $e(Ca)(e.result.technique)])
          },
          F(e.result.technique),
          3
          /* TEXT, CLASS */
        ),
        k("div", vf, [
          k(
            "p",
            yf,
            F(e.result.techniqueName),
            1
            /* TEXT */
          ),
          k(
            "p",
            kf,
            F(e.result.description),
            1
            /* TEXT */
          )
        ])
      ]),
      k("div", wf, [
        H(" Status summary "),
        k("div", _f, [
          e.result.responseStatus ? (O(), z(
            "span",
            {
              key: 0,
              class: Je(["font-bold", $e(Sa)(e.result.responseStatus)])
            },
            " HTTP " + F(e.result.responseStatus),
            3
            /* TEXT, CLASS */
          )) : H("v-if", !0),
          e.result.responseLength !== void 0 ? (O(), z(
            "span",
            Sf,
            F(e.result.responseLength) + " bytes ",
            1
            /* TEXT */
          )) : H("v-if", !0),
          e.result.durationMs !== void 0 ? (O(), z(
            "span",
            Cf,
            F(e.result.durationMs) + "ms ",
            1
            /* TEXT */
          )) : H("v-if", !0),
          e.result.error ? (O(), z(
            "span",
            Tf,
            "Error: " + F(e.result.error),
            1
            /* TEXT */
          )) : H("v-if", !0)
        ]),
        H(" Modified JWT "),
        k("section", jf, [
          l[2] || (l[2] = k(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Modified JWT",
            -1
            /* CACHED */
          )),
          k("div", Pf, [
            k(
              "span",
              Af,
              F(o.value[0]),
              1
              /* TEXT */
            ),
            l[0] || (l[0] = Fe(
              ".",
              -1
              /* CACHED */
            )),
            k(
              "span",
              Of,
              F(o.value[1]),
              1
              /* TEXT */
            ),
            l[1] || (l[1] = Fe(
              ".",
              -1
              /* CACHED */
            )),
            k(
              "span",
              If,
              F(o.value[2]),
              1
              /* TEXT */
            )
          ]),
          k(
            "button",
            {
              onClick: a,
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            F(r.value ? "✓ Copied" : "Copy JWT"),
            1
            /* TEXT */
          )
        ]),
        H(" Decoded header "),
        s.value ? (O(), z("section", zf, [
          l[3] || (l[3] = k(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Decoded Header",
            -1
            /* CACHED */
          )),
          k(
            "pre",
            $f,
            F(s.value),
            1
            /* TEXT */
          )
        ])) : H("v-if", !0),
        H(" Decoded payload "),
        n.value ? (O(), z("section", Ef, [
          l[4] || (l[4] = k(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Decoded Payload",
            -1
            /* CACHED */
          )),
          k(
            "pre",
            Lf,
            F(n.value),
            1
            /* TEXT */
          )
        ])) : H("v-if", !0),
        H(" Response headers "),
        e.result.responseHeaders && Object.keys(e.result.responseHeaders).length ? (O(), z("section", Rf, [
          l[5] || (l[5] = k(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Response Headers",
            -1
            /* CACHED */
          )),
          k("div", Nf, [
            (O(!0), z(
              ne,
              null,
              rt(e.result.responseHeaders, (u, c) => (O(), z("div", {
                key: c,
                class: "flex gap-2"
              }, [
                k(
                  "span",
                  Mf,
                  F(c) + ":",
                  1
                  /* TEXT */
                ),
                k(
                  "span",
                  Ff,
                  F(u),
                  1
                  /* TEXT */
                )
              ]))),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])) : H("v-if", !0),
        H(" Response body "),
        e.result.responseBody ? (O(), z("section", Df, [
          l[6] || (l[6] = k(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Response Body",
            -1
            /* CACHED */
          )),
          k(
            "pre",
            Vf,
            F(e.result.responseBody),
            1
            /* TEXT */
          )
        ])) : H("v-if", !0)
      ])
    ])) : (O(), z("div", Bf, " Select an attack to see details "));
  }
}), Ta = /* @__PURE__ */ pa("config", () => {
  const e = _e({ ...Qs });
  let t = null;
  function r(a) {
    t = a;
  }
  async function o() {
    if (t)
      try {
        const a = await t.storage.get("config");
        a && typeof a == "object" && (e.value = { ...Qs, ...a });
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
}), Kf = { class: "h-full overflow-y-auto px-4 py-4 space-y-6 text-sm" }, Wf = { class: "space-y-3" }, Uf = ["value"], Jf = ["value"], Gf = { class: "space-y-2" }, qf = ["checked", "onChange"], Yf = { class: "text-gray-300" }, Qf = { class: "flex items-start gap-2 cursor-pointer select-none" }, Zf = { class: "pt-2 flex gap-3" }, Xf = {
  key: 0,
  class: "text-xs text-green-400 self-center"
}, e0 = /* @__PURE__ */ Qr({
  __name: "ConfigPanel",
  setup(e) {
    const t = Ta(), r = Wt({ ...t.config }), o = _e(!1);
    Ge(() => t.config, (n) => Object.assign(r, n), { deep: !0 });
    async function s() {
      t.update({ ...r }), await t.save(), o.value = !0, setTimeout(() => {
        o.value = !1;
      }, 2e3);
    }
    return (n, a) => (O(), z("div", Kf, [
      k("section", null, [
        a[7] || (a[7] = k(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "JKU / X5U Spoofing",
          -1
          /* CACHED */
        )),
        a[8] || (a[8] = k(
          "label",
          { class: "block mb-1 text-gray-300" },
          "JWKS Endpoint URL",
          -1
          /* CACHED */
        )),
        Ct(k(
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
          [Cr, r.jwksUrl]
        ]),
        a[9] || (a[9] = k(
          "p",
          { class: "text-xs text-gray-500 mt-1" },
          " Host the generated JWKS JSON at this URL so the target server can fetch it. ",
          -1
          /* CACHED */
        ))
      ]),
      k("section", null, [
        a[13] || (a[13] = k(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Custom Keys / Certificate",
          -1
          /* CACHED */
        )),
        k("div", Wf, [
          k("div", null, [
            a[10] || (a[10] = k(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Public Key (PEM)",
              -1
              /* CACHED */
            )),
            Ct(k(
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
              [Cr, r.customPublicKeyPem]
            ])
          ]),
          k("div", null, [
            a[11] || (a[11] = k(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Private Key (PEM) — for JKU/X5U spoofing",
              -1
              /* CACHED */
            )),
            Ct(k(
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
              [Cr, r.customPrivateKeyPem]
            ])
          ]),
          k("div", null, [
            a[12] || (a[12] = k(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Certificate (PEM) — for algorithm confusion",
              -1
              /* CACHED */
            )),
            Ct(k(
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
              [Cr, r.customCertPem]
            ])
          ])
        ])
      ]),
      k("section", null, [
        a[14] || (a[14] = k(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Additional JWKS Paths",
          -1
          /* CACHED */
        )),
        k("textarea", {
          value: r.extraJwksPaths.join(`
`),
          onInput: a[4] || (a[4] = (i) => r.extraJwksPaths = i.target.value.split(`
`).map((l) => l.trim()).filter(Boolean)),
          rows: "4",
          placeholder: `/custom/.well-known/jwks.json
/api/v2/auth/keys`,
          class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
        }, null, 40, Uf),
        a[15] || (a[15] = k(
          "p",
          { class: "text-xs text-gray-500 mt-1" },
          "One path per line. Probed in addition to the built-in list of 15 common paths.",
          -1
          /* CACHED */
        ))
      ]),
      k("section", null, [
        a[16] || (a[16] = k(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Custom Wordlist (Weak Secret)",
          -1
          /* CACHED */
        )),
        k("textarea", {
          value: r.customWordlist.join(`
`),
          onInput: a[5] || (a[5] = (i) => r.customWordlist = i.target.value.split(`
`).map((l) => l.trim()).filter(Boolean)),
          rows: "4",
          placeholder: `mysecret
appkey123`,
          class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
        }, null, 40, Jf),
        a[17] || (a[17] = k(
          "p",
          { class: "text-xs text-gray-500 mt-1" },
          "One word per line. Appended to the built-in list of ~120 common JWT secrets.",
          -1
          /* CACHED */
        ))
      ]),
      k("section", null, [
        a[18] || (a[18] = k(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Enabled Attacks",
          -1
          /* CACHED */
        )),
        k("div", Gf, [
          (O(!0), z(
            ne,
            null,
            rt($e(Vd), (i, l) => (O(), z("label", {
              key: l,
              class: "flex items-center gap-2 cursor-pointer select-none"
            }, [
              k("input", {
                type: "checkbox",
                checked: r.enabledAttacks[l] ?? !0,
                onChange: (u) => r.enabledAttacks[l] = u.target.checked,
                class: "accent-blue-500"
              }, null, 40, qf),
              k(
                "span",
                Yf,
                F(i),
                1
                /* TEXT */
              )
            ]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      k("section", null, [
        a[20] || (a[20] = k(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Experimental",
          -1
          /* CACHED */
        )),
        k("label", Qf, [
          Ct(k(
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
          a[19] || (a[19] = k(
            "span",
            { class: "text-gray-300" },
            [
              Fe(" RSA public-key recovery from HTTP history "),
              k("span", { class: "block text-xs text-gray-500 mt-0.5" }, [
                Fe(" Attempts to recover the signing key from 2+ same-host RS/PS JWTs, then runs algorithm-confusion with it. Off by default — the math (sig"),
                k("sup", null, "65537"),
                Fe(") is extremely slow in Caido's JS runtime and may take many minutes or not finish. ")
              ])
            ],
            -1
            /* CACHED */
          ))
        ])
      ]),
      k("div", Zf, [
        k("button", {
          onClick: s,
          class: "px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
        }, " Save "),
        o.value ? (O(), z("span", Xf, "✓ Saved")) : H("v-if", !0)
      ])
    ]));
  }
}), t0 = {
  id: "plugin--jwt-attacker",
  class: "h-full flex flex-col bg-gray-950 text-gray-200 overflow-hidden"
}, r0 = { class: "flex items-center gap-1 px-3 py-2 border-b border-gray-700 bg-gray-900 shrink-0" }, o0 = ["onClick"], s0 = { class: "flex-1 flex overflow-hidden min-h-0" }, n0 = { class: "w-[42%] shrink-0 border-r border-gray-700 overflow-hidden flex flex-col" }, a0 = { class: "flex-1 overflow-hidden" }, i0 = { class: "flex-1 overflow-hidden" }, l0 = { class: "bg-gray-900 border border-gray-700 rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl" }, c0 = { class: "flex items-center justify-between px-4 py-3 border-b border-gray-700" }, u0 = { class: "flex-1 overflow-y-auto px-4 py-4 space-y-4" }, d0 = { class: "bg-gray-800 rounded p-3 text-xs text-green-300 overflow-x-auto select-all max-h-48" }, f0 = { key: 0 }, p0 = { class: "bg-gray-800 rounded p-3 text-xs text-yellow-300 overflow-x-auto select-all max-h-36" }, b0 = /* @__PURE__ */ Qr({
  __name: "App",
  setup(e) {
    const t = _e("results"), r = _e(null), o = _e(null), s = [
      { id: "results", label: "Results" },
      { id: "config", label: "Configuration" }
    ];
    async function n(a) {
      await navigator.clipboard.writeText(a);
    }
    return (a, i) => {
      var l;
      return O(), z("div", t0, [
        H(" Top bar "),
        k("div", r0, [
          i[6] || (i[6] = k(
            "span",
            { class: "text-base font-bold text-yellow-400 mr-2" },
            "🔑 JWT Attacker",
            -1
            /* CACHED */
          )),
          (O(), z(
            ne,
            null,
            rt(s, (u) => k("button", {
              key: u.id,
              onClick: (c) => t.value = u.id,
              class: Je([
                "px-3 py-1 rounded text-xs font-medium transition-colors",
                t.value === u.id ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-200"
              ])
            }, F(u.label), 11, o0)),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        H(" Results tab: split pane "),
        Ct(k(
          "div",
          s0,
          [
            k("div", n0, [
              Re(hf, {
                "selected-id": (l = r.value) == null ? void 0 : l.id,
                onSelect: i[0] || (i[0] = (u) => r.value = u),
                onShowJwks: i[1] || (i[1] = (u) => o.value = u)
              }, null, 8, ["selected-id"])
            ]),
            k("div", a0, [
              Re(Hf, {
                result: r.value ?? null
              }, null, 8, ["result"])
            ])
          ],
          512
          /* NEED_PATCH */
        ), [
          [ys, t.value === "results"]
        ]),
        H(" Config tab "),
        Ct(k(
          "div",
          i0,
          [
            Re(e0)
          ],
          512
          /* NEED_PATCH */
        ), [
          [ys, t.value === "config"]
        ]),
        H(" JWKS modal "),
        o.value ? (O(), z("div", {
          key: 0,
          class: "fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6",
          onClick: i[5] || (i[5] = Gl((u) => o.value = null, ["self"]))
        }, [
          k("div", l0, [
            k("div", c0, [
              i[7] || (i[7] = k(
                "h2",
                { class: "text-sm font-semibold" },
                "JKU/X5U Spoofing — JWKS Payload",
                -1
                /* CACHED */
              )),
              k("button", {
                onClick: i[2] || (i[2] = (u) => o.value = null),
                class: "text-gray-500 hover:text-gray-300 text-lg leading-none"
              }, "✕")
            ]),
            k("div", u0, [
              k("div", null, [
                i[8] || (i[8] = k(
                  "p",
                  { class: "text-xs text-gray-400 mb-2" },
                  " Host this JSON at your configured JWKS URL so the server can fetch the attacker's public key. ",
                  -1
                  /* CACHED */
                )),
                k(
                  "pre",
                  d0,
                  F(o.value.jwksJson),
                  1
                  /* TEXT */
                ),
                k("button", {
                  onClick: i[3] || (i[3] = (u) => n(o.value.jwksJson)),
                  class: "mt-1 text-xs text-gray-500 hover:text-gray-300"
                }, "Copy JWKS")
              ]),
              o.value.jwksPrivateKey ? (O(), z("div", f0, [
                i[9] || (i[9] = k(
                  "p",
                  { class: "text-xs text-gray-400 mb-2" },
                  "Private key used to sign the spoofed tokens:",
                  -1
                  /* CACHED */
                )),
                k(
                  "pre",
                  p0,
                  F(o.value.jwksPrivateKey),
                  1
                  /* TEXT */
                ),
                k("button", {
                  onClick: i[4] || (i[4] = (u) => n(o.value.jwksPrivateKey)),
                  class: "mt-1 text-xs text-gray-500 hover:text-gray-300"
                }, "Copy Private Key")
              ])) : H("v-if", !0)
            ])
          ])
        ])) : H("v-if", !0)
      ]);
    };
  }
});
function g0(e) {
  console.log("[JWT Attacker] init() called");
  const t = Ql(b0), r = ec();
  t.use(r), t.use(Yc, { unstyled: !0, pt: Dd });
  const o = document.createElement("div");
  o.id = "plugin--jwt-attacker-root", o.style.cssText = "height:100%;width:100%;overflow:hidden;", t.mount(o), e.navigation.addPage("/jwt-attacker", { body: o }), e.sidebar.registerItem("JWT Attacker", "/jwt-attacker", { icon: "fas fa-key" });
  const s = Ta();
  s.setSDK(e), s.load();
  const n = _a();
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
  }), e.backend.onEvent("jwks-found", ({ sessionId: a, url: i, source: l, keyCount: u }) => {
    n.addDiscoveredEndpoint(a, { url: i, source: l, keyCount: u });
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
  g0 as init
};
