/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Po(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
const X = {}, Ft = [], Ge = () => {
}, Gs = () => !1, Dr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ao = (e) => e.startsWith("onUpdate:"), ve = Object.assign, Oo = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, ka = Object.prototype.hasOwnProperty, q = (e, t) => ka.call(e, t), L = Array.isArray, Dt = (e) => Br(e) === "[object Map]", qs = (e) => Br(e) === "[object Set]", M = (e) => typeof e == "function", le = (e) => typeof e == "string", xt = (e) => typeof e == "symbol", oe = (e) => e !== null && typeof e == "object", Ys = (e) => (oe(e) || M(e)) && M(e.then) && M(e.catch), Qs = Object.prototype.toString, Br = (e) => Qs.call(e), wa = (e) => Br(e).slice(8, -1), Zs = (e) => Br(e) === "[object Object]", Io = (e) => le(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Qt = /* @__PURE__ */ Po(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Vr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (r) => t[r] || (t[r] = e(r));
}, _a = /-\w/g, gt = Vr(
  (e) => e.replace(_a, (t) => t.slice(1).toUpperCase())
), Sa = /\B([A-Z])/g, At = Vr(
  (e) => e.replace(Sa, "-$1").toLowerCase()
), Xs = Vr((e) => e.charAt(0).toUpperCase() + e.slice(1)), Xr = Vr(
  (e) => e ? `on${Xs(e)}` : ""
), ft = (e, t) => !Object.is(e, t), Tr = (e, ...t) => {
  for (let r = 0; r < e.length; r++)
    e[r](...t);
}, en = (e, t, r, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: r
  });
}, bo = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Zo;
const Hr = () => Zo || (Zo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Kr(e) {
  if (L(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const o = e[r], s = le(o) ? Pa(o) : Kr(o);
      if (s)
        for (const n in s)
          t[n] = s[n];
    }
    return t;
  } else if (le(e) || oe(e))
    return e;
}
const Ca = /;(?![^(]*\))/g, Ta = /:([^]+)/, ja = /\/\*[^]*?\*\//g;
function Pa(e) {
  const t = {};
  return e.replace(ja, "").split(Ca).forEach((r) => {
    if (r) {
      const o = r.split(Ta);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function Ue(e) {
  let t = "";
  if (le(e))
    t = e;
  else if (L(e))
    for (let r = 0; r < e.length; r++) {
      const o = Ue(e[r]);
      o && (t += o + " ");
    }
  else if (oe(e))
    for (const r in e)
      e[r] && (t += r + " ");
  return t.trim();
}
const Aa = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Oa = /* @__PURE__ */ Po(Aa);
function tn(e) {
  return !!e || e === "";
}
const rn = (e) => !!(e && e.__v_isRef === !0), H = (e) => le(e) ? e : e == null ? "" : L(e) || oe(e) && (e.toString === Qs || !M(e.toString)) ? rn(e) ? H(e.value) : JSON.stringify(e, on, 2) : String(e), on = (e, t) => rn(t) ? on(e, t.value) : Dt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (r, [o, s], n) => (r[eo(o, n) + " =>"] = s, r),
    {}
  )
} : qs(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((r) => eo(r))
} : xt(t) ? eo(t) : oe(t) && !L(t) && !Zs(t) ? String(t) : t, eo = (e, t = "") => {
  var r;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    xt(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e
  );
};
/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let he;
class sn {
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
function nn(e) {
  return new sn(e);
}
function an() {
  return he;
}
function Ia(e, t = !1) {
  he && he.cleanups.push(e);
}
let te;
const to = /* @__PURE__ */ new WeakSet();
class ln {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, he && he.active && he.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, to.has(this) && (to.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || un(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Xo(this), dn(this);
    const t = te, r = Fe;
    te = this, Fe = !0;
    try {
      return this.fn();
    } finally {
      fn(this), te = t, Fe = r, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Eo(t);
      this.deps = this.depsTail = void 0, Xo(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? to.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    go(this) && this.run();
  }
  get dirty() {
    return go(this);
  }
}
let cn = 0, Zt, Xt;
function un(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Xt, Xt = e;
    return;
  }
  e.next = Zt, Zt = e;
}
function zo() {
  cn++;
}
function $o() {
  if (--cn > 0)
    return;
  if (Xt) {
    let t = Xt;
    for (Xt = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; Zt; ) {
    let t = Zt;
    for (Zt = void 0; t; ) {
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
function dn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function fn(e) {
  let t, r = e.depsTail, o = r;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === r && (r = s), Eo(o), za(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = r;
}
function go(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (pn(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function pn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === lr) || (e.globalVersion = lr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !go(e))))
    return;
  e.flags |= 2;
  const t = e.dep, r = te, o = Fe;
  te = e, Fe = !0;
  try {
    dn(e);
    const s = e.fn(e._value);
    (t.version === 0 || ft(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    te = r, Fe = o, fn(e), e.flags &= -3;
  }
}
function Eo(e, t = !1) {
  const { dep: r, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), r.subs === e && (r.subs = o, !o && r.computed)) {
    r.computed.flags &= -5;
    for (let n = r.computed.deps; n; n = n.nextDep)
      Eo(n, !0);
  }
  !t && !--r.sc && r.map && r.map.delete(r.key);
}
function za(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
let Fe = !0;
const bn = [];
function ot() {
  bn.push(Fe), Fe = !1;
}
function st() {
  const e = bn.pop();
  Fe = e === void 0 ? !0 : e;
}
function Xo(e) {
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
let lr = 0;
class $a {
  constructor(t, r) {
    this.sub = t, this.dep = r, this.version = r.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Lo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!te || !Fe || te === this.computed)
      return;
    let r = this.activeLink;
    if (r === void 0 || r.sub !== te)
      r = this.activeLink = new $a(te, this), te.deps ? (r.prevDep = te.depsTail, te.depsTail.nextDep = r, te.depsTail = r) : te.deps = te.depsTail = r, gn(r);
    else if (r.version === -1 && (r.version = this.version, r.nextDep)) {
      const o = r.nextDep;
      o.prevDep = r.prevDep, r.prevDep && (r.prevDep.nextDep = o), r.prevDep = te.depsTail, r.nextDep = void 0, te.depsTail.nextDep = r, te.depsTail = r, te.deps === r && (te.deps = o);
    }
    return r;
  }
  trigger(t) {
    this.version++, lr++, this.notify(t);
  }
  notify(t) {
    zo();
    try {
      for (let r = this.subs; r; r = r.prevSub)
        r.sub.notify() && r.sub.dep.notify();
    } finally {
      $o();
    }
  }
}
function gn(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        gn(o);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), e.dep.subs = e;
  }
}
const Ar = /* @__PURE__ */ new WeakMap(), Tt = Symbol(
  ""
), ho = Symbol(
  ""
), cr = Symbol(
  ""
);
function xe(e, t, r) {
  if (Fe && te) {
    let o = Ar.get(e);
    o || Ar.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(r);
    s || (o.set(r, s = new Lo()), s.map = o, s.key = r), s.track();
  }
}
function et(e, t, r, o, s, n) {
  const a = Ar.get(e);
  if (!a) {
    lr++;
    return;
  }
  const i = (l) => {
    l && l.trigger();
  };
  if (zo(), t === "clear")
    a.forEach(i);
  else {
    const l = L(e), u = l && Io(r);
    if (l && r === "length") {
      const c = Number(o);
      a.forEach((p, b) => {
        (b === "length" || b === cr || !xt(b) && b >= c) && i(p);
      });
    } else
      switch ((r !== void 0 || a.has(void 0)) && i(a.get(r)), u && i(a.get(cr)), t) {
        case "add":
          l ? u && i(a.get("length")) : (i(a.get(Tt)), Dt(e) && i(a.get(ho)));
          break;
        case "delete":
          l || (i(a.get(Tt)), Dt(e) && i(a.get(ho)));
          break;
        case "set":
          Dt(e) && i(a.get(Tt));
          break;
      }
  }
  $o();
}
function Ea(e, t) {
  const r = Ar.get(e);
  return r && r.get(t);
}
function It(e) {
  const t = G(e);
  return t === e ? t : (xe(t, "iterate", cr), Le(e) ? t : t.map(pe));
}
function Wr(e) {
  return xe(e = G(e), "iterate", cr), e;
}
const La = {
  __proto__: null,
  [Symbol.iterator]() {
    return ro(this, Symbol.iterator, pe);
  },
  concat(...e) {
    return It(this).concat(
      ...e.map((t) => L(t) ? It(t) : t)
    );
  },
  entries() {
    return ro(this, "entries", (e) => (e[1] = pe(e[1]), e));
  },
  every(e, t) {
    return Ye(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ye(this, "filter", e, t, (r) => r.map(pe), arguments);
  },
  find(e, t) {
    return Ye(this, "find", e, t, pe, arguments);
  },
  findIndex(e, t) {
    return Ye(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ye(this, "findLast", e, t, pe, arguments);
  },
  findLastIndex(e, t) {
    return Ye(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ye(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return oo(this, "includes", e);
  },
  indexOf(...e) {
    return oo(this, "indexOf", e);
  },
  join(e) {
    return It(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return oo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ye(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Jt(this, "pop");
  },
  push(...e) {
    return Jt(this, "push", e);
  },
  reduce(e, ...t) {
    return es(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return es(this, "reduceRight", e, t);
  },
  shift() {
    return Jt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ye(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Jt(this, "splice", e);
  },
  toReversed() {
    return It(this).toReversed();
  },
  toSorted(e) {
    return It(this).toSorted(e);
  },
  toSpliced(...e) {
    return It(this).toSpliced(...e);
  },
  unshift(...e) {
    return Jt(this, "unshift", e);
  },
  values() {
    return ro(this, "values", pe);
  }
};
function ro(e, t, r) {
  const o = Wr(e), s = o[t]();
  return o !== e && !Le(e) && (s._next = s.next, s.next = () => {
    const n = s._next();
    return n.done || (n.value = r(n.value)), n;
  }), s;
}
const Ra = Array.prototype;
function Ye(e, t, r, o, s, n) {
  const a = Wr(e), i = a !== e && !Le(e), l = a[t];
  if (l !== Ra[t]) {
    const p = l.apply(e, n);
    return i ? pe(p) : p;
  }
  let u = r;
  a !== e && (i ? u = function(p, b) {
    return r.call(this, pe(p), b, e);
  } : r.length > 2 && (u = function(p, b) {
    return r.call(this, p, b, e);
  }));
  const c = l.call(a, u, o);
  return i && s ? s(c) : c;
}
function es(e, t, r, o) {
  const s = Wr(e);
  let n = r;
  return s !== e && (Le(e) ? r.length > 3 && (n = function(a, i, l) {
    return r.call(this, a, i, l, e);
  }) : n = function(a, i, l) {
    return r.call(this, a, pe(i), l, e);
  }), s[t](n, ...o);
}
function oo(e, t, r) {
  const o = G(e);
  xe(o, "iterate", cr);
  const s = o[t](...r);
  return (s === -1 || s === !1) && Mo(r[0]) ? (r[0] = G(r[0]), o[t](...r)) : s;
}
function Jt(e, t, r = []) {
  ot(), zo();
  const o = G(e)[t].apply(e, r);
  return $o(), st(), o;
}
const Na = /* @__PURE__ */ Po("__proto__,__v_isRef,__isVue"), hn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(xt)
);
function Ma(e) {
  xt(e) || (e = String(e));
  const t = G(this);
  return xe(t, "has", e), t.hasOwnProperty(e);
}
class mn {
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
      return o === (s ? n ? Ga : kn : n ? yn : vn).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const a = L(t);
    if (!s) {
      let l;
      if (a && (l = La[r]))
        return l;
      if (r === "hasOwnProperty")
        return Ma;
    }
    const i = Reflect.get(
      t,
      r,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      ie(t) ? t : o
    );
    if ((xt(r) ? hn.has(r) : Na(r)) || (s || xe(t, "get", r), n))
      return i;
    if (ie(i)) {
      const l = a && Io(r) ? i : i.value;
      return s && oe(l) ? Or(l) : l;
    }
    return oe(i) ? s ? Or(i) : Kt(i) : i;
  }
}
class xn extends mn {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, r, o, s) {
    let n = t[r];
    if (!this._isShallow) {
      const l = ht(n);
      if (!Le(o) && !ht(o) && (n = G(n), o = G(o)), !L(t) && ie(n) && !ie(o))
        return l || (n.value = o), !0;
    }
    const a = L(t) && Io(r) ? Number(r) < t.length : q(t, r), i = Reflect.set(
      t,
      r,
      o,
      ie(t) ? t : s
    );
    return t === G(s) && (a ? ft(o, n) && et(t, "set", r, o) : et(t, "add", r, o)), i;
  }
  deleteProperty(t, r) {
    const o = q(t, r);
    t[r];
    const s = Reflect.deleteProperty(t, r);
    return s && o && et(t, "delete", r, void 0), s;
  }
  has(t, r) {
    const o = Reflect.has(t, r);
    return (!xt(r) || !hn.has(r)) && xe(t, "has", r), o;
  }
  ownKeys(t) {
    return xe(
      t,
      "iterate",
      L(t) ? "length" : Tt
    ), Reflect.ownKeys(t);
  }
}
class Fa extends mn {
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
const Da = /* @__PURE__ */ new xn(), Ba = /* @__PURE__ */ new Fa(), Va = /* @__PURE__ */ new xn(!0);
const mo = (e) => e, yr = (e) => Reflect.getPrototypeOf(e);
function Ha(e, t, r) {
  return function(...o) {
    const s = this.__v_raw, n = G(s), a = Dt(n), i = e === "entries" || e === Symbol.iterator && a, l = e === "keys" && a, u = s[e](...o), c = r ? mo : t ? Ir : pe;
    return !t && xe(
      n,
      "iterate",
      l ? ho : Tt
    ), {
      // iterator protocol
      next() {
        const { value: p, done: b } = u.next();
        return b ? { value: p, done: b } : {
          value: i ? [c(p[0]), c(p[1])] : c(p),
          done: b
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function kr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ka(e, t) {
  const r = {
    get(s) {
      const n = this.__v_raw, a = G(n), i = G(s);
      e || (ft(s, i) && xe(a, "get", s), xe(a, "get", i));
      const { has: l } = yr(a), u = t ? mo : e ? Ir : pe;
      if (l.call(a, s))
        return u(n.get(s));
      if (l.call(a, i))
        return u(n.get(i));
      n !== a && n.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && xe(G(s), "iterate", Tt), s.size;
    },
    has(s) {
      const n = this.__v_raw, a = G(n), i = G(s);
      return e || (ft(s, i) && xe(a, "has", s), xe(a, "has", i)), s === i ? n.has(s) : n.has(s) || n.has(i);
    },
    forEach(s, n) {
      const a = this, i = a.__v_raw, l = G(i), u = t ? mo : e ? Ir : pe;
      return !e && xe(l, "iterate", Tt), i.forEach((c, p) => s.call(n, u(c), u(p), a));
    }
  };
  return ve(
    r,
    e ? {
      add: kr("add"),
      set: kr("set"),
      delete: kr("delete"),
      clear: kr("clear")
    } : {
      add(s) {
        !t && !Le(s) && !ht(s) && (s = G(s));
        const n = G(this);
        return yr(n).has.call(n, s) || (n.add(s), et(n, "add", s, s)), this;
      },
      set(s, n) {
        !t && !Le(n) && !ht(n) && (n = G(n));
        const a = G(this), { has: i, get: l } = yr(a);
        let u = i.call(a, s);
        u || (s = G(s), u = i.call(a, s));
        const c = l.call(a, s);
        return a.set(s, n), u ? ft(n, c) && et(a, "set", s, n) : et(a, "add", s, n), this;
      },
      delete(s) {
        const n = G(this), { has: a, get: i } = yr(n);
        let l = a.call(n, s);
        l || (s = G(s), l = a.call(n, s)), i && i.call(n, s);
        const u = n.delete(s);
        return l && et(n, "delete", s, void 0), u;
      },
      clear() {
        const s = G(this), n = s.size !== 0, a = s.clear();
        return n && et(
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
    r[s] = Ha(s, e, t);
  }), r;
}
function Ro(e, t) {
  const r = Ka(e, t);
  return (o, s, n) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    q(r, s) && s in o ? r : o,
    s,
    n
  );
}
const Wa = {
  get: /* @__PURE__ */ Ro(!1, !1)
}, Ua = {
  get: /* @__PURE__ */ Ro(!1, !0)
}, Ja = {
  get: /* @__PURE__ */ Ro(!0, !1)
};
const vn = /* @__PURE__ */ new WeakMap(), yn = /* @__PURE__ */ new WeakMap(), kn = /* @__PURE__ */ new WeakMap(), Ga = /* @__PURE__ */ new WeakMap();
function qa(e) {
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
function Ya(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : qa(wa(e));
}
function Kt(e) {
  return ht(e) ? e : No(
    e,
    !1,
    Da,
    Wa,
    vn
  );
}
function Qa(e) {
  return No(
    e,
    !1,
    Va,
    Ua,
    yn
  );
}
function Or(e) {
  return No(
    e,
    !0,
    Ba,
    Ja,
    kn
  );
}
function No(e, t, r, o, s) {
  if (!oe(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const n = Ya(e);
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
function pt(e) {
  return ht(e) ? pt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ht(e) {
  return !!(e && e.__v_isReadonly);
}
function Le(e) {
  return !!(e && e.__v_isShallow);
}
function Mo(e) {
  return e ? !!e.__v_raw : !1;
}
function G(e) {
  const t = e && e.__v_raw;
  return t ? G(t) : e;
}
function Fo(e) {
  return !q(e, "__v_skip") && Object.isExtensible(e) && en(e, "__v_skip", !0), e;
}
const pe = (e) => oe(e) ? Kt(e) : e, Ir = (e) => oe(e) ? Or(e) : e;
function ie(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function _e(e) {
  return Za(e, !1);
}
function Za(e, t) {
  return ie(e) ? e : new Xa(e, t);
}
class Xa {
  constructor(t, r) {
    this.dep = new Lo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = r ? t : G(t), this._value = r ? t : pe(t), this.__v_isShallow = r;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const r = this._rawValue, o = this.__v_isShallow || Le(t) || ht(t);
    t = o ? t : G(t), ft(t, r) && (this._rawValue = t, this._value = o ? t : pe(t), this.dep.trigger());
  }
}
function $e(e) {
  return ie(e) ? e.value : e;
}
const ei = {
  get: (e, t, r) => t === "__v_raw" ? e : $e(Reflect.get(e, t, r)),
  set: (e, t, r, o) => {
    const s = e[t];
    return ie(s) && !ie(r) ? (s.value = r, !0) : Reflect.set(e, t, r, o);
  }
};
function wn(e) {
  return pt(e) ? e : new Proxy(e, ei);
}
function ti(e) {
  const t = L(e) ? new Array(e.length) : {};
  for (const r in e)
    t[r] = oi(e, r);
  return t;
}
class ri {
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
    return Ea(G(this._object), this._key);
  }
}
function oi(e, t, r) {
  const o = e[t];
  return ie(o) ? o : new ri(e, t, r);
}
class si {
  constructor(t, r, o) {
    this.fn = t, this.setter = r, this._value = void 0, this.dep = new Lo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = lr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    te !== this)
      return un(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return pn(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function ni(e, t, r = !1) {
  let o, s;
  return M(e) ? o = e : (o = e.get, s = e.set), new si(o, s, r);
}
const wr = {}, zr = /* @__PURE__ */ new WeakMap();
let _t;
function ai(e, t = !1, r = _t) {
  if (r) {
    let o = zr.get(r);
    o || zr.set(r, o = []), o.push(e);
  }
}
function ii(e, t, r = X) {
  const { immediate: o, deep: s, once: n, scheduler: a, augmentJob: i, call: l } = r, u = (P) => s ? P : Le(P) || s === !1 || s === 0 ? tt(P, 1) : tt(P);
  let c, p, b, h, g = !1, C = !1;
  if (ie(e) ? (p = () => e.value, g = Le(e)) : pt(e) ? (p = () => u(e), g = !0) : L(e) ? (C = !0, g = e.some((P) => pt(P) || Le(P)), p = () => e.map((P) => {
    if (ie(P))
      return P.value;
    if (pt(P))
      return u(P);
    if (M(P))
      return l ? l(P, 2) : P();
  })) : M(e) ? t ? p = l ? () => l(e, 2) : e : p = () => {
    if (b) {
      ot();
      try {
        b();
      } finally {
        st();
      }
    }
    const P = _t;
    _t = c;
    try {
      return l ? l(e, 3, [h]) : e(h);
    } finally {
      _t = P;
    }
  } : p = Ge, t && s) {
    const P = p, B = s === !0 ? 1 / 0 : s;
    p = () => tt(P(), B);
  }
  const V = an(), I = () => {
    c.stop(), V && V.active && Oo(V.effects, c);
  };
  if (n && t) {
    const P = t;
    t = (...B) => {
      P(...B), I();
    };
  }
  let D = C ? new Array(e.length).fill(wr) : wr;
  const K = (P) => {
    if (!(!(c.flags & 1) || !c.dirty && !P))
      if (t) {
        const B = c.run();
        if (s || g || (C ? B.some((fe, re) => ft(fe, D[re])) : ft(B, D))) {
          b && b();
          const fe = _t;
          _t = c;
          try {
            const re = [
              B,
              // pass undefined as the old value when it's changed for the first time
              D === wr ? void 0 : C && D[0] === wr ? [] : D,
              h
            ];
            D = B, l ? l(t, 3, re) : (
              // @ts-expect-error
              t(...re)
            );
          } finally {
            _t = fe;
          }
        }
      } else
        c.run();
  };
  return i && i(K), c = new ln(p), c.scheduler = a ? () => a(K, !1) : K, h = (P) => ai(P, !1, c), b = c.onStop = () => {
    const P = zr.get(c);
    if (P) {
      if (l)
        l(P, 4);
      else
        for (const B of P) B();
      zr.delete(c);
    }
  }, t ? o ? K(!0) : D = c.run() : a ? a(K.bind(null, !0), !0) : c.run(), I.pause = c.pause.bind(c), I.resume = c.resume.bind(c), I.stop = I, I;
}
function tt(e, t = 1 / 0, r) {
  if (t <= 0 || !oe(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t))
    return e;
  if (r.set(e, t), t--, ie(e))
    tt(e.value, t, r);
  else if (L(e))
    for (let o = 0; o < e.length; o++)
      tt(e[o], t, r);
  else if (qs(e) || Dt(e))
    e.forEach((o) => {
      tt(o, t, r);
    });
  else if (Zs(e)) {
    for (const o in e)
      tt(e[o], t, r);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && tt(e[o], t, r);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function hr(e, t, r, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    Ur(s, t, r);
  }
}
function qe(e, t, r, o) {
  if (M(e)) {
    const s = hr(e, t, r, o);
    return s && Ys(s) && s.catch((n) => {
      Ur(n, t, r);
    }), s;
  }
  if (L(e)) {
    const s = [];
    for (let n = 0; n < e.length; n++)
      s.push(qe(e[n], t, r, o));
    return s;
  }
}
function Ur(e, t, r, o = !0) {
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
      ot(), hr(n, null, 10, [
        e,
        l,
        u
      ]), st();
      return;
    }
  }
  li(e, r, s, o, a);
}
function li(e, t, r, o = !0, s = !1) {
  if (s)
    throw e;
  console.error(e);
}
const ke = [];
let Ke = -1;
const Bt = [];
let ct = null, Et = 0;
const _n = /* @__PURE__ */ Promise.resolve();
let $r = null;
function Do(e) {
  const t = $r || _n;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ci(e) {
  let t = Ke + 1, r = ke.length;
  for (; t < r; ) {
    const o = t + r >>> 1, s = ke[o], n = ur(s);
    n < e || n === e && s.flags & 2 ? t = o + 1 : r = o;
  }
  return t;
}
function Bo(e) {
  if (!(e.flags & 1)) {
    const t = ur(e), r = ke[ke.length - 1];
    !r || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= ur(r) ? ke.push(e) : ke.splice(ci(t), 0, e), e.flags |= 1, Sn();
  }
}
function Sn() {
  $r || ($r = _n.then(Tn));
}
function ui(e) {
  L(e) ? Bt.push(...e) : ct && e.id === -1 ? ct.splice(Et + 1, 0, e) : e.flags & 1 || (Bt.push(e), e.flags |= 1), Sn();
}
function ts(e, t, r = Ke + 1) {
  for (; r < ke.length; r++) {
    const o = ke[r];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid)
        continue;
      ke.splice(r, 1), r--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function Cn(e) {
  if (Bt.length) {
    const t = [...new Set(Bt)].sort(
      (r, o) => ur(r) - ur(o)
    );
    if (Bt.length = 0, ct) {
      ct.push(...t);
      return;
    }
    for (ct = t, Et = 0; Et < ct.length; Et++) {
      const r = ct[Et];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    ct = null, Et = 0;
  }
}
const ur = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Tn(e) {
  try {
    for (Ke = 0; Ke < ke.length; Ke++) {
      const t = ke[Ke];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), hr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ke < ke.length; Ke++) {
      const t = ke[Ke];
      t && (t.flags &= -2);
    }
    Ke = -1, ke.length = 0, Cn(), $r = null, (ke.length || Bt.length) && Tn();
  }
}
let Ee = null, jn = null;
function Er(e) {
  const t = Ee;
  return Ee = e, jn = e && e.type.__scopeId || null, t;
}
function di(e, t = Ee, r) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && ds(-1);
    const n = Er(t);
    let a;
    try {
      a = e(...s);
    } finally {
      Er(n), o._d && ds(1);
    }
    return a;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function Nt(e, t) {
  if (Ee === null)
    return e;
  const r = Qr(Ee), o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [n, a, i, l = X] = t[s];
    n && (M(n) && (n = {
      mounted: n,
      updated: n
    }), n.deep && tt(a), o.push({
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
function kt(e, t, r, o) {
  const s = e.dirs, n = t && t.dirs;
  for (let a = 0; a < s.length; a++) {
    const i = s[a];
    n && (i.oldValue = n[a].value);
    let l = i.dir[o];
    l && (ot(), qe(l, r, 8, [
      e.el,
      i,
      e,
      t
    ]), st());
  }
}
const fi = Symbol("_vte"), pi = (e) => e.__isTeleport, bi = Symbol("_leaveCb");
function Vo(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Vo(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Jr(e, t) {
  return M(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ve({ name: e.name }, t, { setup: e })
  ) : e;
}
function Pn(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Lr = /* @__PURE__ */ new WeakMap();
function er(e, t, r, o, s = !1) {
  if (L(e)) {
    e.forEach(
      (g, C) => er(
        g,
        t && (L(t) ? t[C] : t),
        r,
        o,
        s
      )
    );
    return;
  }
  if (tr(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && er(e, t, r, o.component.subTree);
    return;
  }
  const n = o.shapeFlag & 4 ? Qr(o.component) : o.el, a = s ? null : n, { i, r: l } = e, u = t && t.r, c = i.refs === X ? i.refs = {} : i.refs, p = i.setupState, b = G(p), h = p === X ? Gs : (g) => q(b, g);
  if (u != null && u !== l) {
    if (rs(t), le(u))
      c[u] = null, h(u) && (p[u] = null);
    else if (ie(u)) {
      u.value = null;
      const g = t;
      g.k && (c[g.k] = null);
    }
  }
  if (M(l))
    hr(l, i, 12, [a, c]);
  else {
    const g = le(l), C = ie(l);
    if (g || C) {
      const V = () => {
        if (e.f) {
          const I = g ? h(l) ? p[l] : c[l] : l.value;
          if (s)
            L(I) && Oo(I, n);
          else if (L(I))
            I.includes(n) || I.push(n);
          else if (g)
            c[l] = [n], h(l) && (p[l] = c[l]);
          else {
            const D = [n];
            l.value = D, e.k && (c[e.k] = D);
          }
        } else g ? (c[l] = a, h(l) && (p[l] = a)) : C && (l.value = a, e.k && (c[e.k] = a));
      };
      if (a) {
        const I = () => {
          V(), Lr.delete(e);
        };
        I.id = -1, Lr.set(e, I), Oe(I, r);
      } else
        rs(e), V();
    }
  }
}
function rs(e) {
  const t = Lr.get(e);
  t && (t.flags |= 8, Lr.delete(e));
}
Hr().requestIdleCallback;
Hr().cancelIdleCallback;
const tr = (e) => !!e.type.__asyncLoader, An = (e) => e.type.__isKeepAlive;
function gi(e, t) {
  On(e, "a", t);
}
function hi(e, t) {
  On(e, "da", t);
}
function On(e, t, r = we) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = r;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Gr(t, o, r), r) {
    let s = r.parent;
    for (; s && s.parent; )
      An(s.parent.vnode) && mi(o, t, r, s), s = s.parent;
  }
}
function mi(e, t, r, o) {
  const s = Gr(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  zn(() => {
    Oo(o[t], s);
  }, r);
}
function Gr(e, t, r = we, o = !1) {
  if (r) {
    const s = r[e] || (r[e] = []), n = t.__weh || (t.__weh = (...a) => {
      ot();
      const i = mr(r), l = qe(t, r, e, a);
      return i(), st(), l;
    });
    return o ? s.unshift(n) : s.push(n), n;
  }
}
const nt = (e) => (t, r = we) => {
  (!fr || e === "sp") && Gr(e, (...o) => t(...o), r);
}, xi = nt("bm"), In = nt("m"), vi = nt(
  "bu"
), yi = nt("u"), ki = nt(
  "bum"
), zn = nt("um"), wi = nt(
  "sp"
), _i = nt("rtg"), Si = nt("rtc");
function Ci(e, t = we) {
  Gr("ec", e, t);
}
const Ti = Symbol.for("v-ndc");
function dt(e, t, r, o) {
  let s;
  const n = r, a = L(e);
  if (a || le(e)) {
    const i = a && pt(e);
    let l = !1, u = !1;
    i && (l = !Le(e), u = ht(e), e = Wr(e)), s = new Array(e.length);
    for (let c = 0, p = e.length; c < p; c++)
      s[c] = t(
        l ? u ? Ir(pe(e[c])) : pe(e[c]) : e[c],
        c,
        void 0,
        n
      );
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let i = 0; i < e; i++)
      s[i] = t(i + 1, i, void 0, n);
  } else if (oe(e))
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
const xo = (e) => e ? Xn(e) ? Qr(e) : xo(e.parent) : null, rr = (
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
    $parent: (e) => xo(e.parent),
    $root: (e) => xo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => En(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Bo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Do.bind(e.proxy)),
    $watch: (e) => qi.bind(e)
  })
), so = (e, t) => e !== X && !e.__isScriptSetup && q(e, t), ji = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: r, setupState: o, data: s, props: n, accessCache: a, type: i, appContext: l } = e;
    let u;
    if (t[0] !== "$") {
      const h = a[t];
      if (h !== void 0)
        switch (h) {
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
        if (so(o, t))
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
        vo && (a[t] = 0);
      }
    }
    const c = rr[t];
    let p, b;
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
      b = l.config.globalProperties, q(b, t)
    )
      return b[t];
  },
  set({ _: e }, t, r) {
    const { data: o, setupState: s, ctx: n } = e;
    return so(s, t) ? (s[t] = r, !0) : o !== X && q(o, t) ? (o[t] = r, !0) : q(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (n[t] = r, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: r, ctx: o, appContext: s, propsOptions: n, type: a }
  }, i) {
    let l, u;
    return !!(r[i] || e !== X && i[0] !== "$" && q(e, i) || so(t, i) || (l = n[0]) && q(l, i) || q(o, i) || q(rr, i) || q(s.config.globalProperties, i) || (u = a.__cssModules) && u[i]);
  },
  defineProperty(e, t, r) {
    return r.get != null ? e._.accessCache[t] = 0 : q(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
  }
};
function os(e) {
  return L(e) ? e.reduce(
    (t, r) => (t[r] = null, t),
    {}
  ) : e;
}
let vo = !0;
function Pi(e) {
  const t = En(e), r = e.proxy, o = e.ctx;
  vo = !1, t.beforeCreate && ss(t.beforeCreate, e, "bc");
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
    mounted: b,
    beforeUpdate: h,
    updated: g,
    activated: C,
    deactivated: V,
    beforeDestroy: I,
    beforeUnmount: D,
    destroyed: K,
    unmounted: P,
    render: B,
    renderTracked: fe,
    renderTriggered: re,
    errorCaptured: N,
    serverPrefetch: F,
    // public API
    expose: Q,
    inheritAttrs: ne,
    // assets
    components: ce,
    directives: be,
    filters: Se
  } = t;
  if (u && Ai(u, o, null), a)
    for (const R in a) {
      const J = a[R];
      M(J) && (o[R] = J.bind(r));
    }
  if (s) {
    const R = s.call(r, r);
    oe(R) && (e.data = Kt(R));
  }
  if (vo = !0, n)
    for (const R in n) {
      const J = n[R], Ce = M(J) ? J.bind(r, r) : M(J.get) ? J.get.bind(r, r) : Ge, Te = !M(J) && M(J.set) ? J.set.bind(r) : Ge, ue = bt({
        get: Ce,
        set: Te
      });
      Object.defineProperty(o, R, {
        enumerable: !0,
        configurable: !0,
        get: () => ue.value,
        set: (de) => ue.value = de
      });
    }
  if (i)
    for (const R in i)
      $n(i[R], o, r, R);
  if (l) {
    const R = M(l) ? l.call(r) : l;
    Reflect.ownKeys(R).forEach((J) => {
      Li(J, R[J]);
    });
  }
  c && ss(c, e, "c");
  function Z(R, J) {
    L(J) ? J.forEach((Ce) => R(Ce.bind(r))) : J && R(J.bind(r));
  }
  if (Z(xi, p), Z(In, b), Z(vi, h), Z(yi, g), Z(gi, C), Z(hi, V), Z(Ci, N), Z(Si, fe), Z(_i, re), Z(ki, D), Z(zn, P), Z(wi, F), L(Q))
    if (Q.length) {
      const R = e.exposed || (e.exposed = {});
      Q.forEach((J) => {
        Object.defineProperty(R, J, {
          get: () => r[J],
          set: (Ce) => r[J] = Ce,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  B && e.render === Ge && (e.render = B), ne != null && (e.inheritAttrs = ne), ce && (e.components = ce), be && (e.directives = be), F && Pn(e);
}
function Ai(e, t, r = Ge) {
  L(e) && (e = yo(e));
  for (const o in e) {
    const s = e[o];
    let n;
    oe(s) ? "default" in s ? n = or(
      s.from || o,
      s.default,
      !0
    ) : n = or(s.from || o) : n = or(s), ie(n) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => n.value,
      set: (a) => n.value = a
    }) : t[o] = n;
  }
}
function ss(e, t, r) {
  qe(
    L(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    r
  );
}
function $n(e, t, r, o) {
  let s = o.includes(".") ? Jn(r, o) : () => r[o];
  if (le(e)) {
    const n = t[e];
    M(n) && Je(s, n);
  } else if (M(e))
    Je(s, e.bind(r));
  else if (oe(e))
    if (L(e))
      e.forEach((n) => $n(n, t, r, o));
    else {
      const n = M(e.handler) ? e.handler.bind(r) : t[e.handler];
      M(n) && Je(s, n, e);
    }
}
function En(e) {
  const t = e.type, { mixins: r, extends: o } = t, {
    mixins: s,
    optionsCache: n,
    config: { optionMergeStrategies: a }
  } = e.appContext, i = n.get(t);
  let l;
  return i ? l = i : !s.length && !r && !o ? l = t : (l = {}, s.length && s.forEach(
    (u) => Rr(l, u, a, !0)
  ), Rr(l, t, a)), oe(t) && n.set(t, l), l;
}
function Rr(e, t, r, o = !1) {
  const { mixins: s, extends: n } = t;
  n && Rr(e, n, r, !0), s && s.forEach(
    (a) => Rr(e, a, r, !0)
  );
  for (const a in t)
    if (!(o && a === "expose")) {
      const i = Oi[a] || r && r[a];
      e[a] = i ? i(e[a], t[a]) : t[a];
    }
  return e;
}
const Oi = {
  data: ns,
  props: as,
  emits: as,
  // objects
  methods: Yt,
  computed: Yt,
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
  components: Yt,
  directives: Yt,
  // watch
  watch: zi,
  // provide / inject
  provide: ns,
  inject: Ii
};
function ns(e, t) {
  return t ? e ? function() {
    return ve(
      M(e) ? e.call(this, this) : e,
      M(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Ii(e, t) {
  return Yt(yo(e), yo(t));
}
function yo(e) {
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
function Yt(e, t) {
  return e ? ve(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function as(e, t) {
  return e ? L(e) && L(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ve(
    /* @__PURE__ */ Object.create(null),
    os(e),
    os(t ?? {})
  ) : t;
}
function zi(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = ve(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    r[o] = ye(e[o], t[o]);
  return r;
}
function Ln() {
  return {
    app: null,
    config: {
      isNativeTag: Gs,
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
let $i = 0;
function Ei(e, t) {
  return function(o, s = null) {
    M(o) || (o = ve({}, o)), s != null && !oe(s) && (s = null);
    const n = Ln(), a = /* @__PURE__ */ new WeakSet(), i = [];
    let l = !1;
    const u = n.app = {
      _uid: $i++,
      _component: o,
      _props: s,
      _container: null,
      _context: n,
      _instance: null,
      version: ml,
      get config() {
        return n.config;
      },
      set config(c) {
      },
      use(c, ...p) {
        return a.has(c) || (c && M(c.install) ? (a.add(c), c.install(u, ...p)) : M(c) && (a.add(c), c(u, ...p))), u;
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
      mount(c, p, b) {
        if (!l) {
          const h = u._ceVNode || Re(o, s);
          return h.appContext = n, b === !0 ? b = "svg" : b === !1 && (b = void 0), e(h, c, b), l = !0, u._container = c, c.__vue_app__ = u, Qr(h.component);
        }
      },
      onUnmount(c) {
        i.push(c);
      },
      unmount() {
        l && (qe(
          i,
          u._instance,
          16
        ), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(c, p) {
        return n.provides[c] = p, u;
      },
      runWithContext(c) {
        const p = jt;
        jt = u;
        try {
          return c();
        } finally {
          jt = p;
        }
      }
    };
    return u;
  };
}
let jt = null;
function Li(e, t) {
  if (we) {
    let r = we.provides;
    const o = we.parent && we.parent.provides;
    o === r && (r = we.provides = Object.create(o)), r[e] = t;
  }
}
function or(e, t, r = !1) {
  const o = Uo();
  if (o || jt) {
    let s = jt ? jt._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return r && M(t) ? t.call(o && o.proxy) : t;
  }
}
function Ri() {
  return !!(Uo() || jt);
}
const Rn = {}, Nn = () => Object.create(Rn), Mn = (e) => Object.getPrototypeOf(e) === Rn;
function Ni(e, t, r, o = !1) {
  const s = {}, n = Nn();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Fn(e, t, s, n);
  for (const a in e.propsOptions[0])
    a in s || (s[a] = void 0);
  r ? e.props = o ? s : Qa(s) : e.type.props ? e.props = s : e.props = n, e.attrs = n;
}
function Mi(e, t, r, o) {
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
        let b = c[p];
        if (qr(e.emitsOptions, b))
          continue;
        const h = t[b];
        if (l)
          if (q(n, b))
            h !== n[b] && (n[b] = h, u = !0);
          else {
            const g = gt(b);
            s[g] = ko(
              l,
              i,
              g,
              h,
              e,
              !1
            );
          }
        else
          h !== n[b] && (n[b] = h, u = !0);
      }
    }
  } else {
    Fn(e, t, s, n) && (u = !0);
    let c;
    for (const p in i)
      (!t || // for camelCase
      !q(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = At(p)) === p || !q(t, c))) && (l ? r && // for camelCase
      (r[p] !== void 0 || // for kebab-case
      r[c] !== void 0) && (s[p] = ko(
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
  u && et(e.attrs, "set", "");
}
function Fn(e, t, r, o) {
  const [s, n] = e.propsOptions;
  let a = !1, i;
  if (t)
    for (let l in t) {
      if (Qt(l))
        continue;
      const u = t[l];
      let c;
      s && q(s, c = gt(l)) ? !n || !n.includes(c) ? r[c] = u : (i || (i = {}))[c] = u : qr(e.emitsOptions, l) || (!(l in o) || u !== o[l]) && (o[l] = u, a = !0);
    }
  if (n) {
    const l = G(r), u = i || X;
    for (let c = 0; c < n.length; c++) {
      const p = n[c];
      r[p] = ko(
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
function ko(e, t, r, o, s, n) {
  const a = e[r];
  if (a != null) {
    const i = q(a, "default");
    if (i && o === void 0) {
      const l = a.default;
      if (a.type !== Function && !a.skipFactory && M(l)) {
        const { propsDefaults: u } = s;
        if (r in u)
          o = u[r];
        else {
          const c = mr(s);
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
    ] && (o === "" || o === At(r)) && (o = !0));
  }
  return o;
}
const Fi = /* @__PURE__ */ new WeakMap();
function Dn(e, t, r = !1) {
  const o = r ? Fi : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const n = e.props, a = {}, i = [];
  let l = !1;
  if (!M(e)) {
    const c = (p) => {
      l = !0;
      const [b, h] = Dn(p, t, !0);
      ve(a, b), h && i.push(...h);
    };
    !r && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!n && !l)
    return oe(e) && o.set(e, Ft), Ft;
  if (L(n))
    for (let c = 0; c < n.length; c++) {
      const p = gt(n[c]);
      is(p) && (a[p] = X);
    }
  else if (n)
    for (const c in n) {
      const p = gt(c);
      if (is(p)) {
        const b = n[c], h = a[p] = L(b) || M(b) ? { type: b } : ve({}, b), g = h.type;
        let C = !1, V = !0;
        if (L(g))
          for (let I = 0; I < g.length; ++I) {
            const D = g[I], K = M(D) && D.name;
            if (K === "Boolean") {
              C = !0;
              break;
            } else K === "String" && (V = !1);
          }
        else
          C = M(g) && g.name === "Boolean";
        h[
          0
          /* shouldCast */
        ] = C, h[
          1
          /* shouldCastTrue */
        ] = V, (C || q(h, "default")) && i.push(p);
      }
    }
  const u = [a, i];
  return oe(e) && o.set(e, u), u;
}
function is(e) {
  return e[0] !== "$" && !Qt(e);
}
const Ho = (e) => e === "_" || e === "_ctx" || e === "$stable", Ko = (e) => L(e) ? e.map(We) : [We(e)], Di = (e, t, r) => {
  if (t._n)
    return t;
  const o = di((...s) => Ko(t(...s)), r);
  return o._c = !1, o;
}, Bn = (e, t, r) => {
  const o = e._ctx;
  for (const s in e) {
    if (Ho(s)) continue;
    const n = e[s];
    if (M(n))
      t[s] = Di(s, n, o);
    else if (n != null) {
      const a = Ko(n);
      t[s] = () => a;
    }
  }
}, Vn = (e, t) => {
  const r = Ko(t);
  e.slots.default = () => r;
}, Hn = (e, t, r) => {
  for (const o in t)
    (r || !Ho(o)) && (e[o] = t[o]);
}, Bi = (e, t, r) => {
  const o = e.slots = Nn();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Hn(o, t, r), r && en(o, "_", s, !0)) : Bn(t, o);
  } else t && Vn(e, t);
}, Vi = (e, t, r) => {
  const { vnode: o, slots: s } = e;
  let n = !0, a = X;
  if (o.shapeFlag & 32) {
    const i = t._;
    i ? r && i === 1 ? n = !1 : Hn(s, t, r) : (n = !t.$stable, Bn(t, s)), a = t;
  } else t && (Vn(e, t), a = { default: 1 });
  if (n)
    for (const i in s)
      !Ho(i) && a[i] == null && delete s[i];
}, Oe = ol;
function Hi(e) {
  return Ki(e);
}
function Ki(e, t) {
  const r = Hr();
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
    nextSibling: b,
    setScopeId: h = Ge,
    insertStaticContent: g
  } = e, C = (d, f, m, y = null, x = null, v = null, T = void 0, S = null, _ = !!f.dynamicChildren) => {
    if (d === f)
      return;
    d && !Gt(d, f) && (y = Ot(d), de(d, x, v, !0), d = null), f.patchFlag === -2 && (_ = !1, f.dynamicChildren = null);
    const { type: k, ref: O, shapeFlag: j } = f;
    switch (k) {
      case Yr:
        V(d, f, m, y);
        break;
      case mt:
        I(d, f, m, y);
        break;
      case ao:
        d == null && D(f, m, y, T);
        break;
      case ae:
        ce(
          d,
          f,
          m,
          y,
          x,
          v,
          T,
          S,
          _
        );
        break;
      default:
        j & 1 ? B(
          d,
          f,
          m,
          y,
          x,
          v,
          T,
          S,
          _
        ) : j & 6 ? be(
          d,
          f,
          m,
          y,
          x,
          v,
          T,
          S,
          _
        ) : (j & 64 || j & 128) && k.process(
          d,
          f,
          m,
          y,
          x,
          v,
          T,
          S,
          _,
          yt
        );
    }
    O != null && x ? er(O, d && d.ref, v, f || d, !f) : O == null && d && d.ref != null && er(d.ref, null, v, d, !0);
  }, V = (d, f, m, y) => {
    if (d == null)
      o(
        f.el = i(f.children),
        m,
        y
      );
    else {
      const x = f.el = d.el;
      f.children !== d.children && u(x, f.children);
    }
  }, I = (d, f, m, y) => {
    d == null ? o(
      f.el = l(f.children || ""),
      m,
      y
    ) : f.el = d.el;
  }, D = (d, f, m, y) => {
    [d.el, d.anchor] = g(
      d.children,
      f,
      m,
      y,
      d.el,
      d.anchor
    );
  }, K = ({ el: d, anchor: f }, m, y) => {
    let x;
    for (; d && d !== f; )
      x = b(d), o(d, m, y), d = x;
    o(f, m, y);
  }, P = ({ el: d, anchor: f }) => {
    let m;
    for (; d && d !== f; )
      m = b(d), s(d), d = m;
    s(f);
  }, B = (d, f, m, y, x, v, T, S, _) => {
    f.type === "svg" ? T = "svg" : f.type === "math" && (T = "mathml"), d == null ? fe(
      f,
      m,
      y,
      x,
      v,
      T,
      S,
      _
    ) : F(
      d,
      f,
      x,
      v,
      T,
      S,
      _
    );
  }, fe = (d, f, m, y, x, v, T, S) => {
    let _, k;
    const { props: O, shapeFlag: j, transition: A, dirs: E } = d;
    if (_ = d.el = a(
      d.type,
      v,
      O && O.is,
      O
    ), j & 8 ? c(_, d.children) : j & 16 && N(
      d.children,
      _,
      null,
      y,
      x,
      no(d, v),
      T,
      S
    ), E && kt(d, null, y, "created"), re(_, d, d.scopeId, T, y), O) {
      for (const ee in O)
        ee !== "value" && !Qt(ee) && n(_, ee, null, O[ee], v, y);
      "value" in O && n(_, "value", null, O.value, v), (k = O.onVnodeBeforeMount) && He(k, y, d);
    }
    E && kt(d, null, y, "beforeMount");
    const U = Wi(x, A);
    U && A.beforeEnter(_), o(_, f, m), ((k = O && O.onVnodeMounted) || U || E) && Oe(() => {
      k && He(k, y, d), U && A.enter(_), E && kt(d, null, y, "mounted");
    }, x);
  }, re = (d, f, m, y, x) => {
    if (m && h(d, m), y)
      for (let v = 0; v < y.length; v++)
        h(d, y[v]);
    if (x) {
      let v = x.subTree;
      if (f === v || qn(v.type) && (v.ssContent === f || v.ssFallback === f)) {
        const T = x.vnode;
        re(
          d,
          T,
          T.scopeId,
          T.slotScopeIds,
          x.parent
        );
      }
    }
  }, N = (d, f, m, y, x, v, T, S, _ = 0) => {
    for (let k = _; k < d.length; k++) {
      const O = d[k] = S ? ut(d[k]) : We(d[k]);
      C(
        null,
        O,
        f,
        m,
        y,
        x,
        v,
        T,
        S
      );
    }
  }, F = (d, f, m, y, x, v, T) => {
    const S = f.el = d.el;
    let { patchFlag: _, dynamicChildren: k, dirs: O } = f;
    _ |= d.patchFlag & 16;
    const j = d.props || X, A = f.props || X;
    let E;
    if (m && wt(m, !1), (E = A.onVnodeBeforeUpdate) && He(E, m, f, d), O && kt(f, d, m, "beforeUpdate"), m && wt(m, !0), (j.innerHTML && A.innerHTML == null || j.textContent && A.textContent == null) && c(S, ""), k ? Q(
      d.dynamicChildren,
      k,
      S,
      m,
      y,
      no(f, x),
      v
    ) : T || J(
      d,
      f,
      S,
      null,
      m,
      y,
      no(f, x),
      v,
      !1
    ), _ > 0) {
      if (_ & 16)
        ne(S, j, A, m, x);
      else if (_ & 2 && j.class !== A.class && n(S, "class", null, A.class, x), _ & 4 && n(S, "style", j.style, A.style, x), _ & 8) {
        const U = f.dynamicProps;
        for (let ee = 0; ee < U.length; ee++) {
          const Y = U[ee], je = j[Y], Pe = A[Y];
          (Pe !== je || Y === "value") && n(S, Y, je, Pe, x, m);
        }
      }
      _ & 1 && d.children !== f.children && c(S, f.children);
    } else !T && k == null && ne(S, j, A, m, x);
    ((E = A.onVnodeUpdated) || O) && Oe(() => {
      E && He(E, m, f, d), O && kt(f, d, m, "updated");
    }, y);
  }, Q = (d, f, m, y, x, v, T) => {
    for (let S = 0; S < f.length; S++) {
      const _ = d[S], k = f[S], O = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        _.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (_.type === ae || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Gt(_, k) || // - In the case of a component, it could contain anything.
        _.shapeFlag & 198) ? p(_.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      C(
        _,
        k,
        O,
        null,
        y,
        x,
        v,
        T,
        !0
      );
    }
  }, ne = (d, f, m, y, x) => {
    if (f !== m) {
      if (f !== X)
        for (const v in f)
          !Qt(v) && !(v in m) && n(
            d,
            v,
            f[v],
            null,
            x,
            y
          );
      for (const v in m) {
        if (Qt(v)) continue;
        const T = m[v], S = f[v];
        T !== S && v !== "value" && n(d, v, S, T, x, y);
      }
      "value" in m && n(d, "value", f.value, m.value, x);
    }
  }, ce = (d, f, m, y, x, v, T, S, _) => {
    const k = f.el = d ? d.el : i(""), O = f.anchor = d ? d.anchor : i("");
    let { patchFlag: j, dynamicChildren: A, slotScopeIds: E } = f;
    E && (S = S ? S.concat(E) : E), d == null ? (o(k, m, y), o(O, m, y), N(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      m,
      O,
      x,
      v,
      T,
      S,
      _
    )) : j > 0 && j & 64 && A && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren ? (Q(
      d.dynamicChildren,
      A,
      m,
      x,
      v,
      T,
      S
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || x && f === x.subTree) && Kn(
      d,
      f,
      !0
      /* shallow */
    )) : J(
      d,
      f,
      m,
      O,
      x,
      v,
      T,
      S,
      _
    );
  }, be = (d, f, m, y, x, v, T, S, _) => {
    f.slotScopeIds = S, d == null ? f.shapeFlag & 512 ? x.ctx.activate(
      f,
      m,
      y,
      T,
      _
    ) : Se(
      f,
      m,
      y,
      x,
      v,
      T,
      _
    ) : ze(d, f, _);
  }, Se = (d, f, m, y, x, v, T) => {
    const S = d.component = dl(
      d,
      y,
      x
    );
    if (An(d) && (S.ctx.renderer = yt), fl(S, !1, T), S.asyncDep) {
      if (x && x.registerDep(S, Z, T), !d.el) {
        const _ = S.subTree = Re(mt);
        I(null, _, f, m), d.placeholder = _.el;
      }
    } else
      Z(
        S,
        d,
        f,
        m,
        x,
        v,
        T
      );
  }, ze = (d, f, m) => {
    const y = f.component = d.component;
    if (tl(d, f, m))
      if (y.asyncDep && !y.asyncResolved) {
        R(y, f, m);
        return;
      } else
        y.next = f, y.update();
    else
      f.el = d.el, y.vnode = f;
  }, Z = (d, f, m, y, x, v, T) => {
    const S = () => {
      if (d.isMounted) {
        let { next: j, bu: A, u: E, parent: U, vnode: ee } = d;
        {
          const Be = Wn(d);
          if (Be) {
            j && (j.el = ee.el, R(d, j, T)), Be.asyncDep.then(() => {
              d.isUnmounted || S();
            });
            return;
          }
        }
        let Y = j, je;
        wt(d, !1), j ? (j.el = ee.el, R(d, j, T)) : j = ee, A && Tr(A), (je = j.props && j.props.onVnodeBeforeUpdate) && He(je, U, j, ee), wt(d, !0);
        const Pe = cs(d), De = d.subTree;
        d.subTree = Pe, C(
          De,
          Pe,
          // parent may have changed if it's in a teleport
          p(De.el),
          // anchor may have changed if it's in a fragment
          Ot(De),
          d,
          x,
          v
        ), j.el = Pe.el, Y === null && rl(d, Pe.el), E && Oe(E, x), (je = j.props && j.props.onVnodeUpdated) && Oe(
          () => He(je, U, j, ee),
          x
        );
      } else {
        let j;
        const { el: A, props: E } = f, { bm: U, m: ee, parent: Y, root: je, type: Pe } = d, De = tr(f);
        wt(d, !1), U && Tr(U), !De && (j = E && E.onVnodeBeforeMount) && He(j, Y, f), wt(d, !0);
        {
          je.ce && // @ts-expect-error _def is private
          je.ce._def.shadowRoot !== !1 && je.ce._injectChildStyle(Pe);
          const Be = d.subTree = cs(d);
          C(
            null,
            Be,
            m,
            y,
            d,
            x,
            v
          ), f.el = Be.el;
        }
        if (ee && Oe(ee, x), !De && (j = E && E.onVnodeMounted)) {
          const Be = f;
          Oe(
            () => He(j, Y, Be),
            x
          );
        }
        (f.shapeFlag & 256 || Y && tr(Y.vnode) && Y.vnode.shapeFlag & 256) && d.a && Oe(d.a, x), d.isMounted = !0, f = m = y = null;
      }
    };
    d.scope.on();
    const _ = d.effect = new ln(S);
    d.scope.off();
    const k = d.update = _.run.bind(_), O = d.job = _.runIfDirty.bind(_);
    O.i = d, O.id = d.uid, _.scheduler = () => Bo(O), wt(d, !0), k();
  }, R = (d, f, m) => {
    f.component = d;
    const y = d.vnode.props;
    d.vnode = f, d.next = null, Mi(d, f.props, y, m), Vi(d, f.children, m), ot(), ts(d), st();
  }, J = (d, f, m, y, x, v, T, S, _ = !1) => {
    const k = d && d.children, O = d ? d.shapeFlag : 0, j = f.children, { patchFlag: A, shapeFlag: E } = f;
    if (A > 0) {
      if (A & 128) {
        Te(
          k,
          j,
          m,
          y,
          x,
          v,
          T,
          S,
          _
        );
        return;
      } else if (A & 256) {
        Ce(
          k,
          j,
          m,
          y,
          x,
          v,
          T,
          S,
          _
        );
        return;
      }
    }
    E & 8 ? (O & 16 && it(k, x, v), j !== k && c(m, j)) : O & 16 ? E & 16 ? Te(
      k,
      j,
      m,
      y,
      x,
      v,
      T,
      S,
      _
    ) : it(k, x, v, !0) : (O & 8 && c(m, ""), E & 16 && N(
      j,
      m,
      y,
      x,
      v,
      T,
      S,
      _
    ));
  }, Ce = (d, f, m, y, x, v, T, S, _) => {
    d = d || Ft, f = f || Ft;
    const k = d.length, O = f.length, j = Math.min(k, O);
    let A;
    for (A = 0; A < j; A++) {
      const E = f[A] = _ ? ut(f[A]) : We(f[A]);
      C(
        d[A],
        E,
        m,
        null,
        x,
        v,
        T,
        S,
        _
      );
    }
    k > O ? it(
      d,
      x,
      v,
      !0,
      !1,
      j
    ) : N(
      f,
      m,
      y,
      x,
      v,
      T,
      S,
      _,
      j
    );
  }, Te = (d, f, m, y, x, v, T, S, _) => {
    let k = 0;
    const O = f.length;
    let j = d.length - 1, A = O - 1;
    for (; k <= j && k <= A; ) {
      const E = d[k], U = f[k] = _ ? ut(f[k]) : We(f[k]);
      if (Gt(E, U))
        C(
          E,
          U,
          m,
          null,
          x,
          v,
          T,
          S,
          _
        );
      else
        break;
      k++;
    }
    for (; k <= j && k <= A; ) {
      const E = d[j], U = f[A] = _ ? ut(f[A]) : We(f[A]);
      if (Gt(E, U))
        C(
          E,
          U,
          m,
          null,
          x,
          v,
          T,
          S,
          _
        );
      else
        break;
      j--, A--;
    }
    if (k > j) {
      if (k <= A) {
        const E = A + 1, U = E < O ? f[E].el : y;
        for (; k <= A; )
          C(
            null,
            f[k] = _ ? ut(f[k]) : We(f[k]),
            m,
            U,
            x,
            v,
            T,
            S,
            _
          ), k++;
      }
    } else if (k > A)
      for (; k <= j; )
        de(d[k], x, v, !0), k++;
    else {
      const E = k, U = k, ee = /* @__PURE__ */ new Map();
      for (k = U; k <= A; k++) {
        const Ae = f[k] = _ ? ut(f[k]) : We(f[k]);
        Ae.key != null && ee.set(Ae.key, k);
      }
      let Y, je = 0;
      const Pe = A - U + 1;
      let De = !1, Be = 0;
      const Ut = new Array(Pe);
      for (k = 0; k < Pe; k++) Ut[k] = 0;
      for (k = E; k <= j; k++) {
        const Ae = d[k];
        if (je >= Pe) {
          de(Ae, x, v, !0);
          continue;
        }
        let Ve;
        if (Ae.key != null)
          Ve = ee.get(Ae.key);
        else
          for (Y = U; Y <= A; Y++)
            if (Ut[Y - U] === 0 && Gt(Ae, f[Y])) {
              Ve = Y;
              break;
            }
        Ve === void 0 ? de(Ae, x, v, !0) : (Ut[Ve - U] = k + 1, Ve >= Be ? Be = Ve : De = !0, C(
          Ae,
          f[Ve],
          m,
          null,
          x,
          v,
          T,
          S,
          _
        ), je++);
      }
      const qo = De ? Ui(Ut) : Ft;
      for (Y = qo.length - 1, k = Pe - 1; k >= 0; k--) {
        const Ae = U + k, Ve = f[Ae], Yo = f[Ae + 1], Qo = Ae + 1 < O ? (
          // #13559, fallback to el placeholder for unresolved async component
          Yo.el || Yo.placeholder
        ) : y;
        Ut[k] === 0 ? C(
          null,
          Ve,
          m,
          Qo,
          x,
          v,
          T,
          S,
          _
        ) : De && (Y < 0 || k !== qo[Y] ? ue(Ve, m, Qo, 2) : Y--);
      }
    }
  }, ue = (d, f, m, y, x = null) => {
    const { el: v, type: T, transition: S, children: _, shapeFlag: k } = d;
    if (k & 6) {
      ue(d.component.subTree, f, m, y);
      return;
    }
    if (k & 128) {
      d.suspense.move(f, m, y);
      return;
    }
    if (k & 64) {
      T.move(d, f, m, yt);
      return;
    }
    if (T === ae) {
      o(v, f, m);
      for (let j = 0; j < _.length; j++)
        ue(_[j], f, m, y);
      o(d.anchor, f, m);
      return;
    }
    if (T === ao) {
      K(d, f, m);
      return;
    }
    if (y !== 2 && k & 1 && S)
      if (y === 0)
        S.beforeEnter(v), o(v, f, m), Oe(() => S.enter(v), x);
      else {
        const { leave: j, delayLeave: A, afterLeave: E } = S, U = () => {
          d.ctx.isUnmounted ? s(v) : o(v, f, m);
        }, ee = () => {
          v._isLeaving && v[bi](
            !0
            /* cancelled */
          ), j(v, () => {
            U(), E && E();
          });
        };
        A ? A(v, U, ee) : ee();
      }
    else
      o(v, f, m);
  }, de = (d, f, m, y = !1, x = !1) => {
    const {
      type: v,
      props: T,
      ref: S,
      children: _,
      dynamicChildren: k,
      shapeFlag: O,
      patchFlag: j,
      dirs: A,
      cacheIndex: E
    } = d;
    if (j === -2 && (x = !1), S != null && (ot(), er(S, null, m, d, !0), st()), E != null && (f.renderCache[E] = void 0), O & 256) {
      f.ctx.deactivate(d);
      return;
    }
    const U = O & 1 && A, ee = !tr(d);
    let Y;
    if (ee && (Y = T && T.onVnodeBeforeUnmount) && He(Y, f, d), O & 6)
      xr(d.component, m, y);
    else {
      if (O & 128) {
        d.suspense.unmount(m, y);
        return;
      }
      U && kt(d, null, f, "beforeUnmount"), O & 64 ? d.type.remove(
        d,
        f,
        m,
        yt,
        y
      ) : k && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !k.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (v !== ae || j > 0 && j & 64) ? it(
        k,
        f,
        m,
        !1,
        !0
      ) : (v === ae && j & 384 || !x && O & 16) && it(_, f, m), y && vt(d);
    }
    (ee && (Y = T && T.onVnodeUnmounted) || U) && Oe(() => {
      Y && He(Y, f, d), U && kt(d, null, f, "unmounted");
    }, m);
  }, vt = (d) => {
    const { type: f, el: m, anchor: y, transition: x } = d;
    if (f === ae) {
      at(m, y);
      return;
    }
    if (f === ao) {
      P(d);
      return;
    }
    const v = () => {
      s(m), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (d.shapeFlag & 1 && x && !x.persisted) {
      const { leave: T, delayLeave: S } = x, _ = () => T(m, v);
      S ? S(d.el, v, _) : _();
    } else
      v();
  }, at = (d, f) => {
    let m;
    for (; d !== f; )
      m = b(d), s(d), d = m;
    s(f);
  }, xr = (d, f, m) => {
    const { bum: y, scope: x, job: v, subTree: T, um: S, m: _, a: k } = d;
    ls(_), ls(k), y && Tr(y), x.stop(), v && (v.flags |= 8, de(T, d, f, m)), S && Oe(S, f), Oe(() => {
      d.isUnmounted = !0;
    }, f);
  }, it = (d, f, m, y = !1, x = !1, v = 0) => {
    for (let T = v; T < d.length; T++)
      de(d[T], f, m, y, x);
  }, Ot = (d) => {
    if (d.shapeFlag & 6)
      return Ot(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const f = b(d.anchor || d.el), m = f && f[fi];
    return m ? b(m) : f;
  };
  let Wt = !1;
  const vr = (d, f, m) => {
    d == null ? f._vnode && de(f._vnode, null, null, !0) : C(
      f._vnode || null,
      d,
      f,
      null,
      null,
      null,
      m
    ), f._vnode = d, Wt || (Wt = !0, ts(), Cn(), Wt = !1);
  }, yt = {
    p: C,
    um: de,
    m: ue,
    r: vt,
    mt: Se,
    mc: N,
    pc: J,
    pbc: Q,
    n: Ot,
    o: e
  };
  return {
    render: vr,
    hydrate: void 0,
    createApp: Ei(vr)
  };
}
function no({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function wt({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Wi(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Kn(e, t, r = !1) {
  const o = e.children, s = t.children;
  if (L(o) && L(s))
    for (let n = 0; n < o.length; n++) {
      const a = o[n];
      let i = s[n];
      i.shapeFlag & 1 && !i.dynamicChildren && ((i.patchFlag <= 0 || i.patchFlag === 32) && (i = s[n] = ut(s[n]), i.el = a.el), !r && i.patchFlag !== -2 && Kn(a, i)), i.type === Yr && // avoid cached text nodes retaining detached dom nodes
      i.patchFlag !== -1 && (i.el = a.el), i.type === mt && !i.el && (i.el = a.el);
    }
}
function Ui(e) {
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
function Wn(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Wn(t);
}
function ls(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Ji = Symbol.for("v-scx"), Gi = () => or(Ji);
function Je(e, t, r) {
  return Un(e, t, r);
}
function Un(e, t, r = X) {
  const { immediate: o, deep: s, flush: n, once: a } = r, i = ve({}, r), l = t && o || !t && n !== "post";
  let u;
  if (fr) {
    if (n === "sync") {
      const h = Gi();
      u = h.__watcherHandles || (h.__watcherHandles = []);
    } else if (!l) {
      const h = () => {
      };
      return h.stop = Ge, h.resume = Ge, h.pause = Ge, h;
    }
  }
  const c = we;
  i.call = (h, g, C) => qe(h, c, g, C);
  let p = !1;
  n === "post" ? i.scheduler = (h) => {
    Oe(h, c && c.suspense);
  } : n !== "sync" && (p = !0, i.scheduler = (h, g) => {
    g ? h() : Bo(h);
  }), i.augmentJob = (h) => {
    t && (h.flags |= 4), p && (h.flags |= 2, c && (h.id = c.uid, h.i = c));
  };
  const b = ii(e, t, i);
  return fr && (u ? u.push(b) : l && b()), b;
}
function qi(e, t, r) {
  const o = this.proxy, s = le(e) ? e.includes(".") ? Jn(o, e) : () => o[e] : e.bind(o, o);
  let n;
  M(t) ? n = t : (n = t.handler, r = t);
  const a = mr(this), i = Un(s, n.bind(o), r);
  return a(), i;
}
function Jn(e, t) {
  const r = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < r.length && o; s++)
      o = o[r[s]];
    return o;
  };
}
const Yi = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${gt(t)}Modifiers`] || e[`${At(t)}Modifiers`];
function Qi(e, t, ...r) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || X;
  let s = r;
  const n = t.startsWith("update:"), a = n && Yi(o, t.slice(7));
  a && (a.trim && (s = r.map((c) => le(c) ? c.trim() : c)), a.number && (s = r.map(bo)));
  let i, l = o[i = Xr(t)] || // also try camelCase event handler (#2249)
  o[i = Xr(gt(t))];
  !l && n && (l = o[i = Xr(At(t))]), l && qe(
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
    e.emitted[i] = !0, qe(
      u,
      e,
      6,
      s
    );
  }
}
const Zi = /* @__PURE__ */ new WeakMap();
function Gn(e, t, r = !1) {
  const o = r ? Zi : t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const n = e.emits;
  let a = {}, i = !1;
  if (!M(e)) {
    const l = (u) => {
      const c = Gn(u, t, !0);
      c && (i = !0, ve(a, c));
    };
    !r && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !n && !i ? (oe(e) && o.set(e, null), null) : (L(n) ? n.forEach((l) => a[l] = null) : ve(a, n), oe(e) && o.set(e, a), a);
}
function qr(e, t) {
  return !e || !Dr(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), q(e, t[0].toLowerCase() + t.slice(1)) || q(e, At(t)) || q(e, t));
}
function cs(e) {
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
    data: b,
    setupState: h,
    ctx: g,
    inheritAttrs: C
  } = e, V = Er(e);
  let I, D;
  try {
    if (r.shapeFlag & 4) {
      const P = s || o, B = P;
      I = We(
        u.call(
          B,
          P,
          c,
          p,
          h,
          b,
          g
        )
      ), D = i;
    } else {
      const P = t;
      I = We(
        P.length > 1 ? P(
          p,
          { attrs: i, slots: a, emit: l }
        ) : P(
          p,
          null
        )
      ), D = t.props ? i : Xi(i);
    }
  } catch (P) {
    sr.length = 0, Ur(P, e, 1), I = Re(mt);
  }
  let K = I;
  if (D && C !== !1) {
    const P = Object.keys(D), { shapeFlag: B } = K;
    P.length && B & 7 && (n && P.some(Ao) && (D = el(
      D,
      n
    )), K = Vt(K, D, !1, !0));
  }
  return r.dirs && (K = Vt(K, null, !1, !0), K.dirs = K.dirs ? K.dirs.concat(r.dirs) : r.dirs), r.transition && Vo(K, r.transition), I = K, Er(V), I;
}
const Xi = (e) => {
  let t;
  for (const r in e)
    (r === "class" || r === "style" || Dr(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, el = (e, t) => {
  const r = {};
  for (const o in e)
    (!Ao(o) || !(o.slice(9) in t)) && (r[o] = e[o]);
  return r;
};
function tl(e, t, r) {
  const { props: o, children: s, component: n } = e, { props: a, children: i, patchFlag: l } = t, u = n.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (r && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return o ? us(o, a, u) : !!a;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        const b = c[p];
        if (a[b] !== o[b] && !qr(u, b))
          return !0;
      }
    }
  } else
    return (s || i) && (!i || !i.$stable) ? !0 : o === a ? !1 : o ? a ? us(o, a, u) : !0 : !!a;
  return !1;
}
function us(e, t, r) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const n = o[s];
    if (t[n] !== e[n] && !qr(r, n))
      return !0;
  }
  return !1;
}
function rl({ vnode: e, parent: t }, r) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
}
const qn = (e) => e.__isSuspense;
function ol(e, t) {
  t && t.pendingBranch ? L(e) ? t.effects.push(...e) : t.effects.push(e) : ui(e);
}
const ae = Symbol.for("v-fgt"), Yr = Symbol.for("v-txt"), mt = Symbol.for("v-cmt"), ao = Symbol.for("v-stc"), sr = [];
let Ie = null;
function z(e = !1) {
  sr.push(Ie = e ? null : []);
}
function sl() {
  sr.pop(), Ie = sr[sr.length - 1] || null;
}
let dr = 1;
function ds(e, t = !1) {
  dr += e, e < 0 && Ie && t && (Ie.hasOnce = !0);
}
function Yn(e) {
  return e.dynamicChildren = dr > 0 ? Ie || Ft : null, sl(), dr > 0 && Ie && Ie.push(e), e;
}
function $(e, t, r, o, s, n) {
  return Yn(
    w(
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
function nl(e, t, r, o, s) {
  return Yn(
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
function Qn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Gt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Zn = ({ key: e }) => e ?? null, jr = ({
  ref: e,
  ref_key: t,
  ref_for: r
}) => (typeof e == "number" && (e = "" + e), e != null ? le(e) || ie(e) || M(e) ? { i: Ee, r: e, k: t, f: !!r } : e : null);
function w(e, t = null, r = null, o = 0, s = null, n = e === ae ? 0 : 1, a = !1, i = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Zn(t),
    ref: t && jr(t),
    scopeId: jn,
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
  return i ? (Wo(l, r), n & 128 && e.normalize(l)) : r && (l.shapeFlag |= le(r) ? 8 : 16), dr > 0 && // avoid a block node from tracking itself
  !a && // has current parent block
  Ie && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || n & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Ie.push(l), l;
}
const Re = al;
function al(e, t = null, r = null, o = 0, s = null, n = !1) {
  if ((!e || e === Ti) && (e = mt), Qn(e)) {
    const i = Vt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return r && Wo(i, r), dr > 0 && !n && Ie && (i.shapeFlag & 6 ? Ie[Ie.indexOf(e)] = i : Ie.push(i)), i.patchFlag = -2, i;
  }
  if (hl(e) && (e = e.__vccOpts), t) {
    t = il(t);
    let { class: i, style: l } = t;
    i && !le(i) && (t.class = Ue(i)), oe(l) && (Mo(l) && !L(l) && (l = ve({}, l)), t.style = Kr(l));
  }
  const a = le(e) ? 1 : qn(e) ? 128 : pi(e) ? 64 : oe(e) ? 4 : M(e) ? 2 : 0;
  return w(
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
function il(e) {
  return e ? Mo(e) || Mn(e) ? ve({}, e) : e : null;
}
function Vt(e, t, r = !1, o = !1) {
  const { props: s, ref: n, patchFlag: a, children: i, transition: l } = e, u = t ? ll(s || {}, t) : s, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && Zn(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && n ? L(n) ? n.concat(jr(t)) : [n, jr(t)] : jr(t)
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
    patchFlag: t && e.type !== ae ? a === -1 ? 16 : a | 16 : a,
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
    ssContent: e.ssContent && Vt(e.ssContent),
    ssFallback: e.ssFallback && Vt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && o && Vo(
    c,
    l.clone(c)
  ), c;
}
function St(e = " ", t = 0) {
  return Re(Yr, null, e, t);
}
function W(e = "", t = !1) {
  return t ? (z(), nl(mt, null, e)) : Re(mt, null, e);
}
function We(e) {
  return e == null || typeof e == "boolean" ? Re(mt) : L(e) ? Re(
    ae,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Qn(e) ? ut(e) : Re(Yr, null, String(e));
}
function ut(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Vt(e);
}
function Wo(e, t) {
  let r = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (L(t))
    r = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Wo(e, s()), s._c && (s._d = !0));
      return;
    } else {
      r = 32;
      const s = t._;
      !s && !Mn(t) ? t._ctx = Ee : s === 3 && Ee && (Ee.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else M(t) ? (t = { default: t, _ctx: Ee }, r = 32) : (t = String(t), o & 64 ? (r = 16, t = [St(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function ll(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = Ue([t.class, o.class]));
      else if (s === "style")
        t.style = Kr([t.style, o.style]);
      else if (Dr(s)) {
        const n = t[s], a = o[s];
        a && n !== a && !(L(n) && n.includes(a)) && (t[s] = n ? [].concat(n, a) : a);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function He(e, t, r, o = null) {
  qe(e, t, 7, [
    r,
    o
  ]);
}
const cl = Ln();
let ul = 0;
function dl(e, t, r) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || cl, n = {
    uid: ul++,
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
    scope: new sn(
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
    propsOptions: Dn(o, s),
    emitsOptions: Gn(o, s),
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
  return n.ctx = { _: n }, n.root = t ? t.root : n, n.emit = Qi.bind(null, n), e.ce && e.ce(n), n;
}
let we = null;
const Uo = () => we || Ee;
let Nr, wo;
{
  const e = Hr(), t = (r, o) => {
    let s;
    return (s = e[r]) || (s = e[r] = []), s.push(o), (n) => {
      s.length > 1 ? s.forEach((a) => a(n)) : s[0](n);
    };
  };
  Nr = t(
    "__VUE_INSTANCE_SETTERS__",
    (r) => we = r
  ), wo = t(
    "__VUE_SSR_SETTERS__",
    (r) => fr = r
  );
}
const mr = (e) => {
  const t = we;
  return Nr(e), e.scope.on(), () => {
    e.scope.off(), Nr(t);
  };
}, fs = () => {
  we && we.scope.off(), Nr(null);
};
function Xn(e) {
  return e.vnode.shapeFlag & 4;
}
let fr = !1;
function fl(e, t = !1, r = !1) {
  t && wo(t);
  const { props: o, children: s } = e.vnode, n = Xn(e);
  Ni(e, o, n, t), Bi(e, s, r || t);
  const a = n ? pl(e, t) : void 0;
  return t && wo(!1), a;
}
function pl(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ji);
  const { setup: o } = r;
  if (o) {
    ot();
    const s = e.setupContext = o.length > 1 ? gl(e) : null, n = mr(e), a = hr(
      o,
      e,
      0,
      [
        e.props,
        s
      ]
    ), i = Ys(a);
    if (st(), n(), (i || e.sp) && !tr(e) && Pn(e), i) {
      if (a.then(fs, fs), t)
        return a.then((l) => {
          ps(e, l);
        }).catch((l) => {
          Ur(l, e, 0);
        });
      e.asyncDep = a;
    } else
      ps(e, a);
  } else
    ea(e);
}
function ps(e, t, r) {
  M(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : oe(t) && (e.setupState = wn(t)), ea(e);
}
function ea(e, t, r) {
  const o = e.type;
  e.render || (e.render = o.render || Ge);
  {
    const s = mr(e);
    ot();
    try {
      Pi(e);
    } finally {
      st(), s();
    }
  }
}
const bl = {
  get(e, t) {
    return xe(e, "get", ""), e[t];
  }
};
function gl(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return {
    attrs: new Proxy(e.attrs, bl),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Qr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(wn(Fo(e.exposed)), {
    get(t, r) {
      if (r in t)
        return t[r];
      if (r in rr)
        return rr[r](e);
    },
    has(t, r) {
      return r in t || r in rr;
    }
  })) : e.proxy;
}
function hl(e) {
  return M(e) && "__vccOpts" in e;
}
const bt = (e, t) => ni(e, t, fr), ml = "3.5.22";
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let _o;
const bs = typeof window < "u" && window.trustedTypes;
if (bs)
  try {
    _o = /* @__PURE__ */ bs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const ta = _o ? (e) => _o.createHTML(e) : (e) => e, xl = "http://www.w3.org/2000/svg", vl = "http://www.w3.org/1998/Math/MathML", Ze = typeof document < "u" ? document : null, gs = Ze && /* @__PURE__ */ Ze.createElement("template"), yl = {
  insert: (e, t, r) => {
    t.insertBefore(e, r || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, r, o) => {
    const s = t === "svg" ? Ze.createElementNS(xl, e) : t === "mathml" ? Ze.createElementNS(vl, e) : r ? Ze.createElement(e, { is: r }) : Ze.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => Ze.createTextNode(e),
  createComment: (e) => Ze.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ze.querySelector(e),
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
      gs.innerHTML = ta(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const i = gs.content;
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
}, kl = Symbol("_vtc");
function wl(e, t, r) {
  const o = e[kl];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const Mr = Symbol("_vod"), ra = Symbol("_vsh"), hs = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: r }) {
    e[Mr] = e.style.display === "none" ? "" : e.style.display, r && t ? r.beforeEnter(e) : qt(e, t);
  },
  mounted(e, { value: t }, { transition: r }) {
    r && t && r.enter(e);
  },
  updated(e, { value: t, oldValue: r }, { transition: o }) {
    !t != !r && (o ? t ? (o.beforeEnter(e), qt(e, !0), o.enter(e)) : o.leave(e, () => {
      qt(e, !1);
    }) : qt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    qt(e, t);
  }
};
function qt(e, t) {
  e.style.display = t ? e[Mr] : "none", e[ra] = !t;
}
const _l = Symbol(""), Sl = /(?:^|;)\s*display\s*:/;
function Cl(e, t, r) {
  const o = e.style, s = le(r);
  let n = !1;
  if (r && !s) {
    if (t)
      if (le(t))
        for (const a of t.split(";")) {
          const i = a.slice(0, a.indexOf(":")).trim();
          r[i] == null && Pr(o, i, "");
        }
      else
        for (const a in t)
          r[a] == null && Pr(o, a, "");
    for (const a in r)
      a === "display" && (n = !0), Pr(o, a, r[a]);
  } else if (s) {
    if (t !== r) {
      const a = o[_l];
      a && (r += ";" + a), o.cssText = r, n = Sl.test(r);
    }
  } else t && e.removeAttribute("style");
  Mr in e && (e[Mr] = n ? o.display : "", e[ra] && (o.display = "none"));
}
const ms = /\s*!important$/;
function Pr(e, t, r) {
  if (L(r))
    r.forEach((o) => Pr(e, t, o));
  else if (r == null && (r = ""), t.startsWith("--"))
    e.setProperty(t, r);
  else {
    const o = Tl(e, t);
    ms.test(r) ? e.setProperty(
      At(o),
      r.replace(ms, ""),
      "important"
    ) : e[o] = r;
  }
}
const xs = ["Webkit", "Moz", "ms"], io = {};
function Tl(e, t) {
  const r = io[t];
  if (r)
    return r;
  let o = gt(t);
  if (o !== "filter" && o in e)
    return io[t] = o;
  o = Xs(o);
  for (let s = 0; s < xs.length; s++) {
    const n = xs[s] + o;
    if (n in e)
      return io[t] = n;
  }
  return t;
}
const vs = "http://www.w3.org/1999/xlink";
function ys(e, t, r, o, s, n = Oa(t)) {
  o && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(vs, t.slice(6, t.length)) : e.setAttributeNS(vs, t, r) : r == null || n && !tn(r) ? e.removeAttribute(t) : e.setAttribute(
    t,
    n ? "" : xt(r) ? String(r) : r
  );
}
function ks(e, t, r, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    r != null && (e[t] = t === "innerHTML" ? ta(r) : r);
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
    i === "boolean" ? r = tn(r) : r == null && i === "string" ? (r = "", a = !0) : i === "number" && (r = 0, a = !0);
  }
  try {
    e[t] = r;
  } catch {
  }
  a && e.removeAttribute(s || t);
}
function Lt(e, t, r, o) {
  e.addEventListener(t, r, o);
}
function jl(e, t, r, o) {
  e.removeEventListener(t, r, o);
}
const ws = Symbol("_vei");
function Pl(e, t, r, o, s = null) {
  const n = e[ws] || (e[ws] = {}), a = n[t];
  if (o && a)
    a.value = o;
  else {
    const [i, l] = Al(t);
    if (o) {
      const u = n[t] = zl(
        o,
        s
      );
      Lt(e, i, u, l);
    } else a && (jl(e, i, a, l), n[t] = void 0);
  }
}
const _s = /(?:Once|Passive|Capture)$/;
function Al(e) {
  let t;
  if (_s.test(e)) {
    t = {};
    let o;
    for (; o = e.match(_s); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : At(e.slice(2)), t];
}
let lo = 0;
const Ol = /* @__PURE__ */ Promise.resolve(), Il = () => lo || (Ol.then(() => lo = 0), lo = Date.now());
function zl(e, t) {
  const r = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= r.attached)
      return;
    qe(
      $l(o, r.value),
      t,
      5,
      [o]
    );
  };
  return r.value = e, r.attached = Il(), r;
}
function $l(e, t) {
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
const Ss = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, El = (e, t, r, o, s, n) => {
  const a = s === "svg";
  t === "class" ? wl(e, o, a) : t === "style" ? Cl(e, r, o) : Dr(t) ? Ao(t) || Pl(e, t, r, o, n) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ll(e, t, o, a)) ? (ks(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ys(e, t, o, a, n, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !le(o)) ? ks(e, gt(t), o, n, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), ys(e, t, o, a));
};
function Ll(e, t, r, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ss(t) && M(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return Ss(t) && le(r) ? !1 : t in e;
}
const Cs = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return L(t) ? (r) => Tr(t, r) : t;
};
function Rl(e) {
  e.target.composing = !0;
}
function Ts(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const co = Symbol("_assign"), _r = {
  created(e, { modifiers: { lazy: t, trim: r, number: o } }, s) {
    e[co] = Cs(s);
    const n = o || s.props && s.props.type === "number";
    Lt(e, t ? "change" : "input", (a) => {
      if (a.target.composing) return;
      let i = e.value;
      r && (i = i.trim()), n && (i = bo(i)), e[co](i);
    }), r && Lt(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Lt(e, "compositionstart", Rl), Lt(e, "compositionend", Ts), Lt(e, "change", Ts));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: r, modifiers: { lazy: o, trim: s, number: n } }, a) {
    if (e[co] = Cs(a), e.composing) return;
    const i = (n || e.type === "number") && !/^0\d/.test(e.value) ? bo(e.value) : e.value, l = t ?? "";
    i !== l && (document.activeElement === e && e.type !== "range" && (o && t === r || s && e.value.trim() === l) || (e.value = l));
  }
}, Nl = ["ctrl", "shift", "alt", "meta"], Ml = {
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
  exact: (e, t) => Nl.some((r) => e[`${r}Key`] && !t.includes(r))
}, Fl = (e, t) => {
  const r = e._withMods || (e._withMods = {}), o = t.join(".");
  return r[o] || (r[o] = (s, ...n) => {
    for (let a = 0; a < t.length; a++) {
      const i = Ml[t[a]];
      if (i && i(s, t)) return;
    }
    return e(s, ...n);
  });
}, Dl = /* @__PURE__ */ ve({ patchProp: El }, yl);
let js;
function Bl() {
  return js || (js = Hi(Dl));
}
const Vl = (...e) => {
  const t = Bl().createApp(...e), { mount: r } = t;
  return t.mount = (o) => {
    const s = Kl(o);
    if (!s) return;
    const n = t._component;
    !M(n) && !n.render && !n.template && (n.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const a = r(s, !1, Hl(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), a;
  }, t;
};
function Hl(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Kl(e) {
  return le(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v3.0.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let oa;
const Zr = (e) => oa = e, sa = (
  /* istanbul ignore next */
  Symbol()
);
function So(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var nr;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(nr || (nr = {}));
function Wl() {
  const e = nn(!0), t = e.run(() => _e({}));
  let r = [], o = [];
  const s = Fo({
    install(n) {
      Zr(s), s._a = n, n.provide(sa, s), n.config.globalProperties.$pinia = s, o.forEach((a) => r.push(a)), o = [];
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
const na = () => {
};
function Ps(e, t, r, o = na) {
  e.add(t);
  const s = () => {
    e.delete(t) && o();
  };
  return !r && an() && Ia(s), s;
}
function zt(e, ...t) {
  e.forEach((r) => {
    r(...t);
  });
}
const Ul = (e) => e(), As = Symbol(), uo = Symbol();
function Co(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((r, o) => e.set(o, r)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const r in t) {
    if (!t.hasOwnProperty(r))
      continue;
    const o = t[r], s = e[r];
    So(s) && So(o) && e.hasOwnProperty(r) && !ie(o) && !pt(o) ? e[r] = Co(s, o) : e[r] = o;
  }
  return e;
}
const Jl = (
  /* istanbul ignore next */
  Symbol()
);
function Gl(e) {
  return !So(e) || !Object.prototype.hasOwnProperty.call(e, Jl);
}
const { assign: lt } = Object;
function ql(e) {
  return !!(ie(e) && e.effect);
}
function Yl(e, t, r, o) {
  const { state: s, actions: n, getters: a } = t, i = r.state.value[e];
  let l;
  function u() {
    i || (r.state.value[e] = s ? s() : {});
    const c = ti(r.state.value[e]);
    return lt(c, n, Object.keys(a || {}).reduce((p, b) => (p[b] = Fo(bt(() => {
      Zr(r);
      const h = r._s.get(e);
      return a[b].call(h, h);
    })), p), {}));
  }
  return l = aa(e, u, t, r, o, !0), l;
}
function aa(e, t, r = {}, o, s, n) {
  let a;
  const i = lt({ actions: {} }, r), l = { deep: !0 };
  let u, c, p = /* @__PURE__ */ new Set(), b = /* @__PURE__ */ new Set(), h;
  const g = o.state.value[e];
  !n && !g && (o.state.value[e] = {}), _e({});
  let C;
  function V(N) {
    let F;
    u = c = !1, typeof N == "function" ? (N(o.state.value[e]), F = {
      type: nr.patchFunction,
      storeId: e,
      events: h
    }) : (Co(o.state.value[e], N), F = {
      type: nr.patchObject,
      payload: N,
      storeId: e,
      events: h
    });
    const Q = C = Symbol();
    Do().then(() => {
      C === Q && (u = !0);
    }), c = !0, zt(p, F, o.state.value[e]);
  }
  const I = n ? function() {
    const { state: F } = r, Q = F ? F() : {};
    this.$patch((ne) => {
      lt(ne, Q);
    });
  } : (
    /* istanbul ignore next */
    na
  );
  function D() {
    a.stop(), p.clear(), b.clear(), o._s.delete(e);
  }
  const K = (N, F = "") => {
    if (As in N)
      return N[uo] = F, N;
    const Q = function() {
      Zr(o);
      const ne = Array.from(arguments), ce = /* @__PURE__ */ new Set(), be = /* @__PURE__ */ new Set();
      function Se(R) {
        ce.add(R);
      }
      function ze(R) {
        be.add(R);
      }
      zt(b, {
        args: ne,
        name: Q[uo],
        store: B,
        after: Se,
        onError: ze
      });
      let Z;
      try {
        Z = N.apply(this && this.$id === e ? this : B, ne);
      } catch (R) {
        throw zt(be, R), R;
      }
      return Z instanceof Promise ? Z.then((R) => (zt(ce, R), R)).catch((R) => (zt(be, R), Promise.reject(R))) : (zt(ce, Z), Z);
    };
    return Q[As] = !0, Q[uo] = F, Q;
  }, P = {
    _p: o,
    // _s: scope,
    $id: e,
    $onAction: Ps.bind(null, b),
    $patch: V,
    $reset: I,
    $subscribe(N, F = {}) {
      const Q = Ps(p, N, F.detached, () => ne()), ne = a.run(() => Je(() => o.state.value[e], (ce) => {
        (F.flush === "sync" ? c : u) && N({
          storeId: e,
          type: nr.direct,
          events: h
        }, ce);
      }, lt({}, l, F)));
      return Q;
    },
    $dispose: D
  }, B = Kt(P);
  o._s.set(e, B);
  const re = (o._a && o._a.runWithContext || Ul)(() => o._e.run(() => (a = nn()).run(() => t({ action: K }))));
  for (const N in re) {
    const F = re[N];
    if (ie(F) && !ql(F) || pt(F))
      n || (g && Gl(F) && (ie(F) ? F.value = g[N] : Co(F, g[N])), o.state.value[e][N] = F);
    else if (typeof F == "function") {
      const Q = K(F, N);
      re[N] = Q, i.actions[N] = F;
    }
  }
  return lt(B, re), lt(G(B), re), Object.defineProperty(B, "$state", {
    get: () => o.state.value[e],
    set: (N) => {
      V((F) => {
        lt(F, N);
      });
    }
  }), o._p.forEach((N) => {
    lt(B, a.run(() => N({
      store: B,
      app: o._a,
      pinia: o,
      options: i
    })));
  }), g && n && r.hydrate && r.hydrate(B.$state, g), u = !0, c = !0, B;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ia(e, t, r) {
  let o;
  const s = typeof t == "function";
  o = s ? r : t;
  function n(a, i) {
    const l = Ri();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (l ? or(sa, null) : null), a && Zr(a), a = oa, a._s.has(e) || (s ? aa(e, t, o, a) : Yl(e, o, a)), a._s.get(e);
  }
  return n.$id = e, n;
}
var Ql = Object.defineProperty, Os = Object.getOwnPropertySymbols, Zl = Object.prototype.hasOwnProperty, Xl = Object.prototype.propertyIsEnumerable, Is = (e, t, r) => t in e ? Ql(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ec = (e, t) => {
  for (var r in t || (t = {}))
    Zl.call(t, r) && Is(e, r, t[r]);
  if (Os)
    for (var r of Os(t))
      Xl.call(t, r) && Is(e, r, t[r]);
  return e;
};
function Jo(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
function tc(e) {
  return !!(e && e.constructor && e.call && e.apply);
}
function se(e) {
  return !Jo(e);
}
function Pt(e, t = !0) {
  return e instanceof Object && e.constructor === Object && (t || Object.keys(e).length !== 0);
}
function Ct(e, ...t) {
  return tc(e) ? e(...t) : e;
}
function Ht(e, t = !0) {
  return typeof e == "string" && (t || e !== "");
}
function la(e, t = !0) {
  return Array.isArray(e) && (t || e.length !== 0);
}
function ca(e) {
  return se(e) && !isNaN(e);
}
function rt(e, t) {
  if (t) {
    const r = t.test(e);
    return t.lastIndex = 0, r;
  }
  return !1;
}
function rc(...e) {
  const t = (r = {}, o = {}) => {
    const s = ec({}, r);
    return Object.keys(o).forEach((n) => {
      Pt(o[n]) && n in r && Pt(r[n]) ? s[n] = t(r[n], o[n]) : s[n] = o[n];
    }), s;
  };
  return e.reduce((r, o, s) => s === 0 ? o : t(r, o), {});
}
function ar(e) {
  return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":");
}
function ua(e) {
  return Ht(e) ? e.replace(/(_)/g, "-").replace(/[A-Z]/g, (t, r) => r === 0 ? t : "-" + t.toLowerCase()).toLowerCase() : e;
}
function zs(e) {
  return Ht(e) ? e.replace(/[A-Z]/g, (t, r) => r === 0 ? t : "." + t.toLowerCase()).toLowerCase() : e;
}
function da() {
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
var oc = Object.defineProperty, sc = Object.defineProperties, nc = Object.getOwnPropertyDescriptors, Fr = Object.getOwnPropertySymbols, fa = Object.prototype.hasOwnProperty, pa = Object.prototype.propertyIsEnumerable, $s = (e, t, r) => t in e ? oc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Me = (e, t) => {
  for (var r in t || (t = {}))
    fa.call(t, r) && $s(e, r, t[r]);
  if (Fr)
    for (var r of Fr(t))
      pa.call(t, r) && $s(e, r, t[r]);
  return e;
}, fo = (e, t) => sc(e, nc(t)), Qe = (e, t) => {
  var r = {};
  for (var o in e)
    fa.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
  if (e != null && Fr)
    for (var o of Fr(e))
      t.indexOf(o) < 0 && pa.call(e, o) && (r[o] = e[o]);
  return r;
}, ac = da(), Xe = ac;
function Es(e, t) {
  la(e) ? e.push(...t || []) : Pt(e) && Object.assign(e, t);
}
function ic(e) {
  return Pt(e) && e.hasOwnProperty("value") && e.hasOwnProperty("type") ? e.value : e;
}
function Ls(e, t = "") {
  return ["opacity", "z-index", "line-height", "font-weight", "flex", "flex-grow", "flex-shrink", "order"].some((o) => t.endsWith(o)) ? e : `${e}`.trim().split(" ").map((n) => ca(n) ? `${n}px` : n).join(" ");
}
function lc(e) {
  return e.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function To(e = "", t = "") {
  return lc(`${Ht(e, !1) && Ht(t, !1) ? `${e}-` : e}${t}`);
}
function ba(e = "", t = "") {
  return `--${To(e, t)}`;
}
function ga(e, t = "", r = "", o = [], s) {
  if (Ht(e)) {
    const n = /{([^}]*)}/g, a = e.trim();
    if (rt(a, n)) {
      const i = a.replaceAll(n, (c) => {
        const b = c.replace(/{|}/g, "").split(".").filter((h) => !o.some((g) => rt(h, g)));
        return `var(${ba(r, ua(b.join("-")))}${se(s) ? `, ${s}` : ""})`;
      }), l = /(\d+\s+[\+\-\*\/]\s+\d+)/g, u = /var\([^)]+\)/g;
      return rt(i.replace(u, "0"), l) ? `calc(${i})` : i;
    }
    return Ls(a, t);
  } else if (ca(e))
    return Ls(e, t);
}
function cc(e, t, r) {
  Ht(t, !1) && e.push(`${t}:${r};`);
}
function Rt(e, t) {
  return e ? `${e}{${t}}` : "";
}
var ir = (...e) => uc(me.getTheme(), ...e), uc = (e = {}, t, r, o) => {
  if (t) {
    const { variable: s, options: n } = me.defaults || {}, { prefix: a, transform: i } = (e == null ? void 0 : e.options) || n || {}, u = rt(t, /{([^}]*)}/g) ? t : `{${t}}`;
    return o === "value" || Jo(o) && i === "strict" ? me.getTokenValue(t) : ga(u, void 0, a, [s.excludedKeyRegex], r);
  }
  return "";
};
function dc(e, t = {}) {
  const r = me.defaults.variable, { prefix: o = r.prefix, selector: s = r.selector, excludedKeyRegex: n = r.excludedKeyRegex } = t, a = (u, c = "") => Object.entries(u).reduce(
    (p, [b, h]) => {
      const g = rt(b, n) ? To(c) : To(c, ua(b)), C = ic(h);
      if (Pt(C)) {
        const { variables: V, tokens: I } = a(C, g);
        Es(p.tokens, I), Es(p.variables, V);
      } else
        p.tokens.push((o ? g.replace(`${o}-`, "") : g).replaceAll("-", ".")), cc(p.variables, ba(g), ga(C, g, o, [n]));
      return p;
    },
    { variables: [], tokens: [] }
  ), { variables: i, tokens: l } = a(e, o);
  return {
    value: i,
    tokens: l,
    declarations: i.join(""),
    css: Rt(s, i.join(""))
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
    return dc(e, { prefix: t == null ? void 0 : t.prefix });
  },
  getCommon({ name: e = "", theme: t = {}, params: r, set: o, defaults: s }) {
    var n, a, i, l, u, c, p;
    const { preset: b, options: h } = t;
    let g, C, V, I, D, K, P;
    if (se(b) && h.transform !== "strict") {
      const { primitive: B, semantic: fe, extend: re } = b, N = fe || {}, { colorScheme: F } = N, Q = Qe(N, ["colorScheme"]), ne = re || {}, { colorScheme: ce } = ne, be = Qe(ne, ["colorScheme"]), Se = F || {}, { dark: ze } = Se, Z = Qe(Se, ["dark"]), R = ce || {}, { dark: J } = R, Ce = Qe(R, ["dark"]), Te = se(B) ? this._toVariables({ primitive: B }, h) : {}, ue = se(Q) ? this._toVariables({ semantic: Q }, h) : {}, de = se(Z) ? this._toVariables({ light: Z }, h) : {}, vt = se(ze) ? this._toVariables({ dark: ze }, h) : {}, at = se(be) ? this._toVariables({ semantic: be }, h) : {}, xr = se(Ce) ? this._toVariables({ light: Ce }, h) : {}, it = se(J) ? this._toVariables({ dark: J }, h) : {}, [Ot, Wt] = [(n = Te.declarations) != null ? n : "", Te.tokens], [vr, yt] = [(a = ue.declarations) != null ? a : "", ue.tokens || []], [Go, d] = [(i = de.declarations) != null ? i : "", de.tokens || []], [f, m] = [(l = vt.declarations) != null ? l : "", vt.tokens || []], [y, x] = [(u = at.declarations) != null ? u : "", at.tokens || []], [v, T] = [(c = xr.declarations) != null ? c : "", xr.tokens || []], [S, _] = [(p = it.declarations) != null ? p : "", it.tokens || []];
      g = this.transformCSS(e, Ot, "light", "variable", h, o, s), C = Wt;
      const k = this.transformCSS(e, `${vr}${Go}`, "light", "variable", h, o, s), O = this.transformCSS(e, `${f}`, "dark", "variable", h, o, s);
      V = `${k}${O}`, I = [.../* @__PURE__ */ new Set([...yt, ...d, ...m])];
      const j = this.transformCSS(e, `${y}${v}color-scheme:light`, "light", "variable", h, o, s), A = this.transformCSS(e, `${S}color-scheme:dark`, "dark", "variable", h, o, s);
      D = `${j}${A}`, K = [.../* @__PURE__ */ new Set([...x, ...T, ..._])], P = Ct(b.css, { dt: ir });
    }
    return {
      primitive: {
        css: g,
        tokens: C
      },
      semantic: {
        css: V,
        tokens: I
      },
      global: {
        css: D,
        tokens: K
      },
      style: P
    };
  },
  getPreset({ name: e = "", preset: t = {}, options: r, params: o, set: s, defaults: n, selector: a }) {
    var i, l, u;
    let c, p, b;
    if (se(t) && r.transform !== "strict") {
      const h = e.replace("-directive", ""), g = t, { colorScheme: C, extend: V, css: I } = g, D = Qe(g, ["colorScheme", "extend", "css"]), K = V || {}, { colorScheme: P } = K, B = Qe(K, ["colorScheme"]), fe = C || {}, { dark: re } = fe, N = Qe(fe, ["dark"]), F = P || {}, { dark: Q } = F, ne = Qe(F, ["dark"]), ce = se(D) ? this._toVariables({ [h]: Me(Me({}, D), B) }, r) : {}, be = se(N) ? this._toVariables({ [h]: Me(Me({}, N), ne) }, r) : {}, Se = se(re) ? this._toVariables({ [h]: Me(Me({}, re), Q) }, r) : {}, [ze, Z] = [(i = ce.declarations) != null ? i : "", ce.tokens || []], [R, J] = [(l = be.declarations) != null ? l : "", be.tokens || []], [Ce, Te] = [(u = Se.declarations) != null ? u : "", Se.tokens || []], ue = this.transformCSS(h, `${ze}${R}`, "light", "variable", r, s, n, a), de = this.transformCSS(h, Ce, "dark", "variable", r, s, n, a);
      c = `${ue}${de}`, p = [.../* @__PURE__ */ new Set([...Z, ...J, ...Te])], b = Ct(I, { dt: ir });
    }
    return {
      css: c,
      tokens: p,
      style: b
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
    return s ? `@layer ${Ct(s.order || "primeui", r)}` : "";
  },
  getCommonStyleSheet({ name: e = "", theme: t = {}, params: r, props: o = {}, set: s, defaults: n }) {
    const a = this.getCommon({ name: e, theme: t, params: r, set: s, defaults: n }), i = Object.entries(o).reduce((l, [u, c]) => l.push(`${u}="${c}"`) && l, []).join(" ");
    return Object.entries(a || {}).reduce((l, [u, c]) => {
      if (c != null && c.css) {
        const p = ar(c == null ? void 0 : c.css), b = `${u}-variables`;
        l.push(`<style type="text/css" data-primevue-style-id="${b}" ${i}>${p}</style>`);
      }
      return l;
    }, []).join("");
  },
  getStyleSheet({ name: e = "", theme: t = {}, params: r, props: o = {}, set: s, defaults: n }) {
    var a;
    const i = { name: e, theme: t, params: r, set: s, defaults: n }, l = (a = e.includes("-directive") ? this.getPresetD(i) : this.getPresetC(i)) == null ? void 0 : a.css, u = Object.entries(o).reduce((c, [p, b]) => c.push(`${p}="${b}"`) && c, []).join(" ");
    return l ? `<style type="text/css" data-primevue-style-id="${e}-variables" ${u}>${ar(l)}</style>` : "";
  },
  createTokens(e = {}, t, r = "", o = "", s = {}) {
    return Object.entries(e).forEach(([n, a]) => {
      const i = rt(n, t.variable.excludedKeyRegex) ? r : r ? `${r}.${zs(n)}` : zs(n), l = o ? `${o}.${n}` : n;
      Pt(a) ? this.createTokens(a, t, i, l, s) : (s[i] || (s[i] = {
        paths: [],
        computed(u, c = {}) {
          var p, b;
          return this.paths.length === 1 ? (p = this.paths[0]) == null ? void 0 : p.computed(this.paths[0].scheme, c.binding) : u && u !== "none" ? (b = this.paths.find((h) => h.scheme === u)) == null ? void 0 : b.computed(u, c.binding) : this.paths.map((h) => h.computed(h.scheme, c[h.scheme]));
        }
      }), s[i].paths.push({
        path: l,
        value: a,
        scheme: l.includes("colorScheme.light") ? "light" : l.includes("colorScheme.dark") ? "dark" : "none",
        computed(u, c = {}) {
          const p = /{([^}]*)}/g;
          let b = a;
          if (c.name = this.path, c.binding || (c.binding = {}), rt(a, p)) {
            const g = a.trim().replaceAll(p, (I) => {
              var D;
              const K = I.replace(/{|}/g, ""), P = (D = s[K]) == null ? void 0 : D.computed(u, c);
              return la(P) && P.length === 2 ? `light-dark(${P[0].value},${P[1].value})` : P == null ? void 0 : P.value;
            }), C = /(\d+\w*\s+[\+\-\*\/]\s+\d+\w*)/g, V = /var\([^)]+\)/g;
            b = rt(g.replace(V, "0"), C) ? `calc(${g})` : g;
          }
          return Jo(c.binding) && delete c.binding, {
            colorScheme: u,
            path: this.path,
            paths: c,
            value: b.includes("undefined") ? void 0 : b
          };
        }
      }));
    }), s;
  },
  getTokenValue(e, t, r) {
    var o;
    const n = ((l) => l.split(".").filter((c) => !rt(c.toLowerCase(), r.variable.excludedKeyRegex)).join("."))(t), a = t.includes("colorScheme.light") ? "light" : t.includes("colorScheme.dark") ? "dark" : void 0, i = [(o = e[n]) == null ? void 0 : o.computed(a)].flat().filter((l) => l);
    return i.length === 1 ? i[0].value : i.reduce((l = {}, u) => {
      const c = u, { colorScheme: p } = c, b = Qe(c, ["colorScheme"]);
      return l[p] = b, l;
    }, void 0);
  },
  getSelectorRule(e, t, r, o) {
    return r === "class" || r === "attr" ? Rt(se(t) ? `${e}${t},${e} ${t}` : e, o) : Rt(e, se(t) ? Rt(t, o) : o);
  },
  transformCSS(e, t, r, o, s = {}, n, a, i) {
    if (se(t)) {
      const { cssLayer: l } = s;
      if (o !== "style") {
        const u = this.getColorSchemeOption(s, a);
        t = r === "dark" ? u.reduce((c, { type: p, selector: b }) => (se(b) && (c += b.includes("[CSS]") ? b.replace("[CSS]", t) : this.getSelectorRule(b, i, p, t)), c), "") : Rt(i ?? ":root", t);
      }
      if (l) {
        const u = {
          name: "primeui"
        };
        Pt(l) && (u.name = Ct(l.name, { name: e, type: o })), se(u.name) && (t = Rt(`@layer ${u.name}`, t), n == null || n.layerNames(u.name));
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
    t && (this._theme = fo(Me({}, t), {
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
    this.update({ theme: e }), Xe.emit("theme:change", e);
  },
  getPreset() {
    return this.preset;
  },
  setPreset(e) {
    this._theme = fo(Me({}, this.theme), { preset: e }), this._tokens = Ne.createTokens(e, this.defaults), this.clearLoadedStyleNames(), Xe.emit("preset:change", e), Xe.emit("theme:change", this.theme);
  },
  getOptions() {
    return this.options;
  },
  setOptions(e) {
    this._theme = fo(Me({}, this.theme), { options: e }), this.clearLoadedStyleNames(), Xe.emit("options:change", e), Xe.emit("theme:change", this.theme);
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
    this._loadingStyles.size && (this._loadingStyles.delete(t), Xe.emit(`theme:${t}:load`, e), !this._loadingStyles.size && Xe.emit("theme:load"));
  }
};
function ha(e) {
  return typeof HTMLElement == "object" ? e instanceof HTMLElement : e && typeof e == "object" && e !== null && e.nodeType === 1 && typeof e.nodeName == "string";
}
function jo(e, t = {}) {
  if (ha(e)) {
    const r = (o, s) => {
      var n, a;
      const i = (n = e == null ? void 0 : e.$attrs) != null && n[o] ? [(a = e == null ? void 0 : e.$attrs) == null ? void 0 : a[o]] : [];
      return [s].flat().reduce((l, u) => {
        if (u != null) {
          const c = typeof u;
          if (c === "string" || c === "number")
            l.push(u);
          else if (c === "object") {
            const p = Array.isArray(u) ? r(o, u) : Object.entries(u).map(([b, h]) => o === "style" && (h || h === 0) ? `${b.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${h}` : h ? b : void 0);
            l = p.length ? l.concat(p.filter((b) => !!b)) : l;
          }
        }
        return l;
      }, i);
    };
    Object.entries(t).forEach(([o, s]) => {
      if (s != null) {
        const n = o.match(/^on(.+)/);
        n ? e.addEventListener(n[1].toLowerCase(), s) : o === "p-bind" ? jo(e, s) : (s = o === "class" ? [...new Set(r("class", s))].join(" ").trim() : o === "style" ? r("style", s).join(";").trim() : s, (e.$attrs = e.$attrs || {}) && (e.$attrs[o] = s), e.setAttribute(o, s));
      }
    });
  }
}
function fc(e) {
  if (e) {
    let t = e.parentNode;
    return t && t instanceof ShadowRoot && t.host && (t = t.host), t;
  }
  return null;
}
function pc(e) {
  return !!(e !== null && typeof e < "u" && e.nodeName && fc(e));
}
function bc() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function gc(e, t = "", r) {
  ha(e) && r !== null && r !== void 0 && e.setAttribute(t, r);
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
function pr(e) {
  "@babel/helpers - typeof";
  return pr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pr(e);
}
function Rs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), r.push.apply(r, o);
  }
  return r;
}
function Ns(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Rs(Object(r), !0).forEach(function(o) {
      hc(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Rs(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
function hc(e, t, r) {
  return (t = mc(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function mc(e) {
  var t = xc(e, "string");
  return pr(t) == "symbol" ? t : t + "";
}
function xc(e, t) {
  if (pr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var o = r.call(e, t);
    if (pr(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function vc(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  Uo() ? In(e) : t ? e() : Do(e);
}
var yc = 0;
function kc(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = _e(!1), o = _e(e), s = _e(null), n = bc() ? window.document : void 0, a = t.document, i = a === void 0 ? n : a, l = t.immediate, u = l === void 0 ? !0 : l, c = t.manual, p = c === void 0 ? !1 : c, b = t.name, h = b === void 0 ? "style_".concat(++yc) : b, g = t.id, C = g === void 0 ? void 0 : g, V = t.media, I = V === void 0 ? void 0 : V, D = t.nonce, K = D === void 0 ? void 0 : D, P = t.first, B = P === void 0 ? !1 : P, fe = t.onMounted, re = fe === void 0 ? void 0 : fe, N = t.onUpdated, F = N === void 0 ? void 0 : N, Q = t.onLoad, ne = Q === void 0 ? void 0 : Q, ce = t.props, be = ce === void 0 ? {} : ce, Se = function() {
  }, ze = function(J) {
    var Ce = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (i) {
      var Te = Ns(Ns({}, be), Ce), ue = Te.name || h, de = Te.id || C, vt = Te.nonce || K;
      s.value = i.querySelector('style[data-primevue-style-id="'.concat(ue, '"]')) || i.getElementById(de) || i.createElement("style"), s.value.isConnected || (o.value = J || e, jo(s.value, {
        type: "text/css",
        id: de,
        media: I,
        nonce: vt
      }), B ? i.head.prepend(s.value) : i.head.appendChild(s.value), gc(s.value, "data-primevue-style-id", ue), jo(s.value, Te), s.value.onload = function(at) {
        return ne == null ? void 0 : ne(at, {
          name: ue
        });
      }, re == null || re(ue)), !r.value && (Se = Je(o, function(at) {
        s.value.textContent = at, F == null || F(ue);
      }, {
        immediate: !0
      }), r.value = !0);
    }
  }, Z = function() {
    !i || !r.value || (Se(), pc(s.value) && i.head.removeChild(s.value), r.value = !1);
  };
  return u && !p && vc(ze), {
    id: C,
    name: h,
    el: s,
    css: o,
    unload: Z,
    load: ze,
    isLoaded: Or(r)
  };
}
function br(e) {
  "@babel/helpers - typeof";
  return br = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, br(e);
}
function Ms(e, t) {
  return Cc(e) || Sc(e, t) || _c(e, t) || wc();
}
function wc() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _c(e, t) {
  if (e) {
    if (typeof e == "string") return Fs(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Fs(e, t) : void 0;
  }
}
function Fs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, o = Array(t); r < t; r++) o[r] = e[r];
  return o;
}
function Sc(e, t) {
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
function Cc(e) {
  if (Array.isArray(e)) return e;
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
function po(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ds(Object(r), !0).forEach(function(o) {
      Tc(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ds(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
function Tc(e, t, r) {
  return (t = jc(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function jc(e) {
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
var Ac = function(t) {
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
}, Oc = function(t) {
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
}, Ic = {}, zc = {}, $t = {
  name: "base",
  css: Oc,
  theme: Ac,
  classes: Ic,
  inlineStyles: zc,
  load: function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(n) {
      return n;
    }, s = o(Ct(t, {
      dt: ir
    }));
    return se(s) ? kc(ar(s), po({
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
      var o = Ct(this.css, {
        dt: ir
      }) || "", s = ar("".concat(o).concat(t)), n = Object.entries(r).reduce(function(a, i) {
        var l = Ms(i, 2), u = l[0], c = l[1];
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
      var s = this.name === "base" ? "global-style" : "".concat(this.name, "-style"), n = Ct(this.theme, {
        dt: ir
      }), a = ar(me.transformCSS(s, n)), i = Object.entries(r).reduce(function(l, u) {
        var c = Ms(u, 2), p = c[0], b = c[1];
        return l.push("".concat(p, '="').concat(b, '"')) && l;
      }, []).join(" ");
      se(a) && o.push('<style type="text/css" data-primevue-style-id="'.concat(s, '" ').concat(i, ">").concat(a, "</style>"));
    }
    return o.join("");
  },
  extend: function(t) {
    return po(po({}, this), {}, {
      css: void 0,
      theme: void 0
    }, t);
  }
}, Sr = da();
function gr(e) {
  "@babel/helpers - typeof";
  return gr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, gr(e);
}
function Bs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), r.push.apply(r, o);
  }
  return r;
}
function Cr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Bs(Object(r), !0).forEach(function(o) {
      $c(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Bs(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
function $c(e, t, r) {
  return (t = Ec(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Ec(e) {
  var t = Lc(e, "string");
  return gr(t) == "symbol" ? t : t + "";
}
function Lc(e, t) {
  if (gr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var o = r.call(e, t);
    if (gr(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Rc = {
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
}, Nc = Symbol();
function Mc(e, t) {
  var r = {
    config: Kt(t)
  };
  return e.config.globalProperties.$primevue = r, e.provide(Nc, r), Fc(), Dc(e, r), r;
}
var Mt = [];
function Fc() {
  Xe.clear(), Mt.forEach(function(e) {
    return e == null ? void 0 : e();
  }), Mt = [];
}
function Dc(e, t) {
  var r = _e(!1), o = function() {
    var u;
    if (((u = t.config) === null || u === void 0 ? void 0 : u.theme) !== "none" && !me.isStyleNameLoaded("common")) {
      var c, p, b = ((c = $t.getCommonTheme) === null || c === void 0 ? void 0 : c.call($t)) || {}, h = b.primitive, g = b.semantic, C = b.global, V = b.style, I = {
        nonce: (p = t.config) === null || p === void 0 || (p = p.csp) === null || p === void 0 ? void 0 : p.nonce
      };
      $t.load(h == null ? void 0 : h.css, Cr({
        name: "primitive-variables"
      }, I)), $t.load(g == null ? void 0 : g.css, Cr({
        name: "semantic-variables"
      }, I)), $t.load(C == null ? void 0 : C.css, Cr({
        name: "global-variables"
      }, I)), $t.loadTheme(Cr({
        name: "global-style"
      }, I), V), me.setLoadedStyleName("common");
    }
  };
  Xe.on("theme:change", function(l) {
    r.value || (e.config.globalProperties.$primevue.config.theme = l, r.value = !0);
  });
  var s = Je(t.config, function(l, u) {
    Sr.emit("config:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  }), n = Je(function() {
    return t.config.ripple;
  }, function(l, u) {
    Sr.emit("config:ripple:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  }), a = Je(function() {
    return t.config.theme;
  }, function(l, u) {
    r.value || me.setTheme(l), t.config.unstyled || o(), r.value = !1, Sr.emit("config:theme:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  }), i = Je(function() {
    return t.config.unstyled;
  }, function(l, u) {
    !l && t.config.theme && o(), Sr.emit("config:unstyled:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  });
  Mt.push(s), Mt.push(n), Mt.push(a), Mt.push(i);
}
var Bc = {
  install: function(t, r) {
    var o = rc(Rc, r);
    Mc(t, o);
  }
};
const Vc = {
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
}, Hc = {
  content: "p-5 pt-0 bg-surface-0 dark:bg-surface-900 text-surface-600 dark:text-surface-0/70"
}, Kc = {
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
}, Wc = {
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
}, Uc = {
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
}, Jc = {
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
}, Gc = {
  root: {
    class: "flex items-center"
  }
}, qc = {
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
}, Yc = {
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
}, Qc = {
  root: "relative",
  mask: "bg-black/40 rounded-md"
}, Zc = {
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
}, Xc = {
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
}, eu = {
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
}, tu = {
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
}, ru = {
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
}, ou = {
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
}, su = {
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
}, nu = {
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
}, au = {
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
}, iu = {
  icon: "w-8 h-8 text-[2rem] mr-2"
}, lu = {
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
}, cu = {
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
}, uu = {
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
}, du = {
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
}, Vs = {
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
}, fu = {
  root: {}
}, pu = {
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
}, bu = {
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
}, gu = {
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
}, Hs = {
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
}, hu = {
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
}, mu = {
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
}, xu = {
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
}, vu = {
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
}, yu = {
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
}, ku = {
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
}, wu = {
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
}, _u = {
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
}, Su = {
  root: {
    class: ["flex items-stretch", "w-full"]
  }
}, Cu = {
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
}, Tu = {
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
}, ju = {
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
}, Pu = {
  root: {
    class: [
      // Alignment
      "flex items-center",
      "gap-2",
      "[&_[data-pc-name^=pcinput]]:w-10"
    ]
  }
}, Au = {
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
}, Ou = {
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
}, Iu = {
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
}, zu = {
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
}, $u = {
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
}, Eu = {
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
}, Lu = {
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
}, Ru = {
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
}, Nu = {
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
}, Mu = {
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
}, Fu = {
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
}, Du = {
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
}, Bu = {
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
}, Vu = {
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
}, Hu = {
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
}, Ku = {
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
}, Wu = {
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
}, Ks = {
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
}, Uu = {
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
}, Ju = {
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
}, Gu = {
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
}, qu = {
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
}, Yu = {
  root: {
    class: [
      "block absolute bg-surface-200 dark:bg-surface-700 rounded-full pointer-events-none"
    ],
    style: "transform: scale(0)"
  }
}, Qu = {
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
}, Zu = {
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
}, Ws = {
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
}, Xu = {
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
}, ed = {
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
}, td = {
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
}, rd = {
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
}, od = {
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
}, sd = {
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
}, nd = {
  root: ({ context: e }) => ({
    class: ["grow", { flex: e.nested }]
  })
}, ad = {
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
}, id = {
  root: ({ state: e }) => ({
    class: [
      "flex flex-col flex-[initial] has-[[data-pc-name=steppanels]]:px-2 has-[[data-pc-name=steppanels]]:pt-3.5 has-[[data-pc-name=steppanels]]:pb-[1.125rem]",
      { "flex-auto": e.isActive },
      "[&>[data-pc-name=step]]:flex-[initial]",
      "[&>[data-pc-name=steppanel]]:flex [&>[data-pc-name=steppanel]]:flex-auto [&>[data-pc-name=steppanel]>[data-pc-section=content]]:w-full [&>[data-pc-name=steppanel]>[data-pc-section=content]]:pl-4 [&:last-child>[data-pc-name=steppanel]>[data-pc-section=content]]:ps-8",
      "[&>[data-pc-name=steppanel]>[data-pc-section=separator]]:relative [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:!flex-initial [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:shrink-0 [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:w-[2px] [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:h-auto [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:m-2 [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:left-[-2px] [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:ml-[1.625rem]"
    ]
  })
}, ld = {
  root: "relative flex justify-between items-center m-0 p-0 list-none overflow-x-auto"
}, cd = {
  root: "px-2 pt-3.5 pb-[1.125rem]"
}, ud = {
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
}, dd = {
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
}, fd = {
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
}, pd = {
  root: "relative flex",
  content: "overflow-x-auto overflow-y-hidden scroll-smooth overscroll-x-contain overscroll-y-auto [&::-webkit-scrollbar]:hidden grow dark:bg-surface-800",
  tabList: "relative flex border-solid border-b border-surface-200 dark:border-surface-900",
  nextButton: "!absolute top-0 right-0 z-20 h-full w-10 flex items-center justify-center text-surface-700 dark:text-surface-0/80 bg-surface-0 dark:bg-surface-800 outline-transparent cursor-pointer shrink-0",
  prevButton: "!absolute top-0 left-0 z-20 h-full w-10 flex items-center justify-center text-surface-700 dark:text-surface-0/80 bg-surface-0 dark:bg-surface-800 outline-transparent cursor-pointer shrink-0",
  activeBar: "z-10 block absolute h-[1px] bottom-[-1px] bg-primary-400"
}, bd = {
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
}, gd = {
  root: "focus:outline-none focus:outline-offset-0 focus-visible:ring-1 ring-inset focus-visible:ring-primary-400 dark:focus-visible:ring-primary-300"
}, hd = {
  root: "bg-surface-0 dark:bg-surface-800 text-surface-900 dark:text-surface-0/80 outline-0 p-[1.125rem] pt-[0.875rem]"
}, md = {
  root: ({ props: e }) => ({
    class: [
      "flex flex-col",
      { "[&>[data-pc-name=tablist]]:overflow-hidden": e.scrollable }
    ]
  })
}, xd = {
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
}, vd = {
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
}, yd = {
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
}, kd = {
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
}, wd = {
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
}, _d = {
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
}, Sd = {
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
}, Cd = {
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
}, Us = {
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
}, Td = {
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
}, jd = {
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
}, Pd = {
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
}, Ad = {
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
}, Od = {
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
}, Id = {
  global: yu,
  directives: {
    badge: Yc,
    ripple: Yu,
    tooltip: jd
  },
  //forms
  autocomplete: Uc,
  select: Ws,
  dropdown: Ws,
  inputnumber: ju,
  inputtext: Au,
  datepicker: Vs,
  calendar: Vs,
  checkbox: su,
  radiobutton: Gu,
  toggleswitch: Us,
  inputswitch: Us,
  selectbutton: Xu,
  slider: td,
  rating: qu,
  multiselect: Nu,
  togglebutton: Cd,
  cascadeselect: ou,
  listbox: Iu,
  colorpicker: au,
  inputgroup: Su,
  inputgroupaddon: Cu,
  inputmask: Tu,
  knob: Ou,
  treeselect: Ad,
  textarea: kd,
  password: Ku,
  iconfield: ku,
  floatlabel: xu,
  inputotp: Pu,
  //buttons
  button: Xc,
  buttongroup: eu,
  splitbutton: od,
  speeddial: rd,
  //data
  paginator: Bu,
  datatable: uu,
  tree: Pd,
  dataview: du,
  organizationchart: Fu,
  orderlist: Mu,
  picklist: Wu,
  treetable: Od,
  timeline: _d,
  //panels
  accordion: Vc,
  accordionpanel: Wc,
  accordionheader: Kc,
  accordioncontent: Hc,
  panel: Vu,
  fieldset: hu,
  card: tu,
  tabview: xd,
  divider: bu,
  toolbar: Td,
  scrollpanel: Qu,
  splitter: sd,
  splitterpanel: nd,
  stepper: ud,
  steplist: ld,
  step: ad,
  stepitem: id,
  steppanels: cd,
  deferred: fu,
  tab: fd,
  tabs: md,
  tablist: pd,
  tabpanels: hd,
  tabpanel: gd,
  //file
  fileupload: mu,
  //menu
  contextmenu: cu,
  menu: $u,
  menubar: Eu,
  steps: dd,
  tieredmenu: wd,
  breadcrumb: Zc,
  panelmenu: Hu,
  megamenu: zu,
  dock: gu,
  tabmenu: bd,
  //overlays
  dialog: pu,
  popover: Ks,
  sidebar: Ks,
  drawer: Hs,
  overlaypanel: Hs,
  confirmpopup: lu,
  confirmdialog: iu,
  //messages
  message: Lu,
  toast: Sd,
  //media
  carousel: ru,
  galleria: vu,
  image: wu,
  //misc
  badge: qc,
  overlaybadge: Du,
  avatar: Jc,
  avatargroup: Gc,
  tag: vd,
  chip: nu,
  progressbar: Uu,
  skeleton: ed,
  scrolltop: Zu,
  terminal: yd,
  blockui: Qc,
  metergroup: Ru,
  inplace: _u,
  progressspinner: Ju
}, ma = /* @__PURE__ */ ia("attacks", () => {
  const e = _e([]), t = _e(null), r = bt(
    () => e.value.find((b) => b.sessionId === t.value) ?? e.value[0] ?? null
  );
  function o(b, h, g = 0) {
    const C = e.value.find((I) => I.sessionId === b);
    if (C) {
      g > 0 && (C.total = g);
      return;
    }
    const V = {
      sessionId: b,
      requestId: h,
      startedAt: Date.now(),
      results: [],
      total: g,
      complete: !1,
      errors: [],
      recoveredKeys: [],
      keyRecoveryLog: []
    };
    e.value.unshift(V), t.value = b;
  }
  function s(b, h) {
    const g = e.value.find((C) => C.sessionId === b);
    g && (g.total = h);
  }
  function n(b, h) {
    const g = e.value.find((C) => C.sessionId === b);
    g && g.results.push(h);
  }
  function a(b, h) {
    const g = e.value.find((C) => C.sessionId === b);
    g && (g.complete = !0, g.errors.push(...h));
  }
  function i(b, h) {
    const g = e.value.find((C) => C.sessionId === b);
    g && !g.recoveredKeys.includes(h) && g.recoveredKeys.push(h);
  }
  function l(b, h) {
    const g = e.value.find((C) => C.sessionId === b);
    g && g.keyRecoveryLog.push(h);
  }
  function u(b, h, g) {
    const C = e.value.find((V) => V.sessionId === b);
    C && (C.jwksJson = h, C.jwksPrivateKey = g);
  }
  function c(b) {
    t.value = b;
  }
  function p() {
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
    setJWKSPayload: u,
    setActiveSession: c,
    clearSessions: p
  };
}), Js = {
  jwksUrl: "",
  customPublicKeyPem: "",
  customPrivateKeyPem: "",
  customCertPem: "",
  extraJwksPaths: [],
  customWordlist: [],
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
}, zd = {
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
function xa(e) {
  return e ? e < 300 ? "text-green-400" : e < 400 ? "text-yellow-400" : e < 500 ? "text-orange-400" : "text-red-400" : "text-gray-400";
}
function va(e) {
  return {
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
const $d = { class: "h-full flex flex-col overflow-hidden" }, Ed = { class: "px-3 py-2 border-b border-gray-700 bg-gray-900 flex items-center gap-2" }, Ld = ["value"], Rd = ["value"], Nd = {
  key: 1,
  class: "text-xs text-gray-400 flex-1"
}, Md = {
  key: 0,
  class: "ml-1 text-yellow-400 animate-pulse"
}, Fd = {
  key: 1,
  class: "ml-1 text-green-400"
}, Dd = {
  key: 0,
  class: "h-1 bg-gray-800"
}, Bd = {
  key: 1,
  class: "px-3 py-1.5 bg-red-950 border-b border-red-800 text-xs text-red-300 max-h-28 overflow-y-auto"
}, Vd = { class: "font-semibold mb-0.5" }, Hd = {
  key: 2,
  class: "px-3 py-1.5 bg-yellow-950 border-b border-yellow-800 text-xs text-yellow-300 max-h-16 overflow-y-auto"
}, Kd = {
  key: 3,
  class: "px-3 py-1.5 bg-green-950 border-b border-green-800 text-xs text-green-300"
}, Wd = { class: "flex gap-1 px-2 py-1.5 border-b border-gray-700 overflow-x-auto shrink-0" }, Ud = ["onClick"], Jd = { class: "flex-1 overflow-y-auto" }, Gd = {
  key: 0,
  class: "flex items-center justify-center h-full text-gray-500 text-sm py-8"
}, qd = ["onClick"], Yd = { class: "flex items-center gap-2 min-w-0" }, Qd = { class: "text-xs text-gray-200 truncate flex-1" }, Zd = {
  key: 1,
  class: "text-xs text-red-500 shrink-0"
}, Xd = {
  key: 2,
  class: "text-xs text-gray-600 shrink-0 animate-pulse"
}, ef = { class: "text-xs text-gray-500 mt-0.5 truncate pl-0.5" }, tf = /* @__PURE__ */ Jr({
  __name: "AttackList",
  props: {
    selectedId: {}
  },
  emits: ["select", "showJwks"],
  setup(e, { emit: t }) {
    const r = t, o = ma(), s = _e("all"), n = bt(() => o.activeSession), a = bt(() => {
      var h;
      const l = ((h = n.value) == null ? void 0 : h.results) ?? [], u = l.filter((g) => g.responseStatus && g.responseStatus < 300).length, c = l.filter((g) => g.responseStatus && g.responseStatus >= 400 && g.responseStatus < 500).length, p = l.filter((g) => g.responseStatus && g.responseStatus >= 500).length, b = l.filter((g) => g.error).length;
      return [
        { key: "all", label: "All", count: l.length },
        { key: "2xx", label: "2xx", count: u },
        { key: "4xx", label: "4xx", count: c },
        { key: "5xx", label: "5xx", count: p },
        { key: "err", label: "Errors", count: b }
      ];
    }), i = bt(() => {
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
      var c, p, b, h;
      return z(), $("div", $d, [
        W(" Session selector + progress bar "),
        w("div", Ed, [
          $e(o).sessions.length > 1 ? (z(), $("select", {
            key: 0,
            value: $e(o).activeSessionId,
            onChange: u[0] || (u[0] = (g) => $e(o).setActiveSession(g.target.value)),
            class: "text-xs bg-gray-800 border border-gray-600 rounded px-2 py-1 text-gray-300 flex-1 min-w-0"
          }, [
            (z(!0), $(
              ae,
              null,
              dt($e(o).sessions, (g) => (z(), $("option", {
                key: g.sessionId,
                value: g.sessionId
              }, " Session " + H(g.sessionId.slice(0, 6)) + " — " + H(g.results.length) + "/" + H(g.total) + " (" + H(new Date(g.startedAt).toLocaleTimeString()) + ") ", 9, Rd))),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 40, Ld)) : (z(), $("span", Nd, [
            n.value ? (z(), $(
              ae,
              { key: 0 },
              [
                St(
                  H(n.value.results.length) + "/" + H(n.value.total) + " attacks ",
                  1
                  /* TEXT */
                ),
                n.value.complete ? (z(), $("span", Fd, "✓ complete")) : (z(), $("span", Md, "running…"))
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (z(), $(
              ae,
              { key: 1 },
              [
                St("No active session")
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ])),
          $e(o).sessions.length ? (z(), $("button", {
            key: 2,
            onClick: u[1] || (u[1] = (g) => $e(o).clearSessions()),
            class: "text-xs text-gray-500 hover:text-red-400 transition-colors"
          }, "Clear")) : W("v-if", !0)
        ]),
        W(" Progress bar "),
        n.value && !n.value.complete ? (z(), $("div", Dd, [
          w(
            "div",
            {
              class: "h-1 bg-blue-500 transition-all duration-300",
              style: Kr({ width: n.value.total ? `${n.value.results.length / n.value.total * 100}%` : "0%" })
            },
            null,
            4
            /* STYLE */
          )
        ])) : W("v-if", !0),
        W(" Errors / warnings "),
        (c = n.value) != null && c.errors.length ? (z(), $("div", Bd, [
          w(
            "p",
            Vd,
            "⚠ " + H(n.value.errors.length) + " error(s):",
            1
            /* TEXT */
          ),
          (z(!0), $(
            ae,
            null,
            dt(n.value.errors, (g, C) => (z(), $(
              "p",
              {
                key: C,
                class: "font-mono break-all"
              },
              H(g),
              1
              /* TEXT */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : W("v-if", !0),
        W(" Key recovery log "),
        (p = n.value) != null && p.keyRecoveryLog.length ? (z(), $("div", Hd, [
          (z(!0), $(
            ae,
            null,
            dt(n.value.keyRecoveryLog, (g, C) => (z(), $(
              "p",
              { key: C },
              H(g),
              1
              /* TEXT */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : W("v-if", !0),
        W(" Recovered keys notice "),
        (b = n.value) != null && b.recoveredKeys.length ? (z(), $(
          "div",
          Kd,
          " ✓ Recovered " + H(n.value.recoveredKeys.length) + " public key(s) from HTTP history ",
          1
          /* TEXT */
        )) : W("v-if", !0),
        W(" JWKS info "),
        (h = n.value) != null && h.jwksJson ? (z(), $("div", {
          key: 4,
          class: "px-3 py-1.5 bg-purple-950 border-b border-purple-800 text-xs text-purple-300 cursor-pointer hover:bg-purple-900",
          onClick: u[2] || (u[2] = (g) => r("showJwks", n.value))
        }, " ℹ JKU/X5U spoofing — click to view JWKS payload to host ")) : W("v-if", !0),
        W(" Filter tabs "),
        w("div", Wd, [
          (z(!0), $(
            ae,
            null,
            dt(a.value, (g) => (z(), $("button", {
              key: g.key,
              onClick: (C) => s.value = g.key,
              class: Ue([
                "px-2 py-0.5 rounded text-xs font-medium transition-colors whitespace-nowrap",
                s.value === g.key ? "bg-blue-700 text-white" : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
              ])
            }, H(g.label) + " (" + H(g.count) + ") ", 11, Ud))),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        W(" Results list "),
        w("div", Jd, [
          !n.value || i.value.length === 0 ? (z(), $("div", Gd, [
            n.value ? (z(), $(
              ae,
              { key: 1 },
              [
                St("No results yet…")
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (z(), $(
              ae,
              { key: 0 },
              [
                St('Right-click a request with a JWT and select "Attack JWT"')
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : W("v-if", !0),
          (z(!0), $(
            ae,
            null,
            dt(i.value, (g) => (z(), $("div", {
              key: g.id,
              onClick: (C) => r("select", g),
              class: Ue([
                "px-3 py-2 border-b border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors",
                e.selectedId === g.id ? "bg-gray-800 border-l-2 border-l-blue-500" : ""
              ])
            }, [
              w("div", Yd, [
                w(
                  "span",
                  {
                    class: Ue(["px-1.5 py-0.5 rounded text-xs font-mono shrink-0", $e(va)(g.technique)])
                  },
                  H(g.technique),
                  3
                  /* TEXT, CLASS */
                ),
                w(
                  "span",
                  Qd,
                  H(g.techniqueName),
                  1
                  /* TEXT */
                ),
                g.responseStatus ? (z(), $(
                  "span",
                  {
                    key: 0,
                    class: Ue(["text-xs font-mono font-bold shrink-0", $e(xa)(g.responseStatus)])
                  },
                  H(g.responseStatus),
                  3
                  /* TEXT, CLASS */
                )) : g.error ? (z(), $("span", Zd, "ERR")) : (z(), $("span", Xd, "…"))
              ]),
              w(
                "p",
                ef,
                H(g.description.slice(0, 80)),
                1
                /* TEXT */
              )
            ], 10, qd))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]);
    };
  }
});
function rf(e) {
  const t = e + "=".repeat((4 - e.length % 4) % 4);
  return atob(t.replace(/-/g, "+").replace(/_/g, "/"));
}
const of = {
  key: 0,
  class: "h-full flex flex-col overflow-hidden text-sm"
}, sf = { class: "px-4 py-3 border-b border-gray-700 bg-gray-900 flex items-start gap-3" }, nf = { class: "flex-1 min-w-0" }, af = { class: "font-semibold text-gray-100 truncate" }, lf = { class: "text-gray-400 text-xs mt-0.5 leading-relaxed" }, cf = { class: "flex-1 overflow-y-auto" }, uf = { class: "px-4 py-2 border-b border-gray-700 flex gap-6 text-xs" }, df = {
  key: 1,
  class: "text-gray-400"
}, ff = {
  key: 2,
  class: "text-gray-400"
}, pf = {
  key: 3,
  class: "text-red-400"
}, bf = { class: "px-4 py-3 border-b border-gray-700" }, gf = { class: "bg-gray-900 rounded p-2 font-mono text-xs break-all text-gray-300 select-all max-h-32 overflow-y-auto" }, hf = { class: "text-yellow-400" }, mf = { class: "text-blue-400" }, xf = { class: "text-red-400" }, vf = {
  key: 0,
  class: "px-4 py-3 border-b border-gray-700"
}, yf = { class: "bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-48 overflow-y-auto" }, kf = {
  key: 1,
  class: "px-4 py-3 border-b border-gray-700"
}, wf = { class: "bg-gray-900 rounded p-2 text-xs font-mono space-y-0.5 max-h-32 overflow-y-auto" }, _f = { class: "text-blue-400 shrink-0" }, Sf = { class: "text-gray-300 break-all" }, Cf = {
  key: 2,
  class: "px-4 py-3"
}, Tf = { class: "bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-64 overflow-y-auto whitespace-pre-wrap break-all" }, jf = {
  key: 1,
  class: "flex items-center justify-center h-full text-gray-500 text-sm"
}, Pf = /* @__PURE__ */ Jr({
  __name: "AttackDetail",
  props: {
    result: {}
  },
  setup(e) {
    const t = e, r = _e(!1), o = bt(() => {
      if (!t.result) return ["", "", ""];
      const a = t.result.modifiedJWT.split(".");
      return [a[0] ?? "", a[1] ?? "", a[2] ?? ""];
    }), s = bt(() => {
      if (!t.result) return null;
      try {
        const a = rf(o.value[1]);
        return JSON.stringify(JSON.parse(a), null, 2);
      } catch {
        return null;
      }
    });
    async function n() {
      t.result && (await navigator.clipboard.writeText(t.result.modifiedJWT), r.value = !0, setTimeout(() => {
        r.value = !1;
      }, 1500));
    }
    return (a, i) => e.result ? (z(), $("div", of, [
      W(" Technique header "),
      w("div", sf, [
        w(
          "span",
          {
            class: Ue(["px-2 py-0.5 rounded text-xs font-mono font-semibold shrink-0", $e(va)(e.result.technique)])
          },
          H(e.result.technique),
          3
          /* TEXT, CLASS */
        ),
        w("div", nf, [
          w(
            "p",
            af,
            H(e.result.techniqueName),
            1
            /* TEXT */
          ),
          w(
            "p",
            lf,
            H(e.result.description),
            1
            /* TEXT */
          )
        ])
      ]),
      w("div", cf, [
        W(" Status summary "),
        w("div", uf, [
          e.result.responseStatus ? (z(), $(
            "span",
            {
              key: 0,
              class: Ue(["font-bold", $e(xa)(e.result.responseStatus)])
            },
            " HTTP " + H(e.result.responseStatus),
            3
            /* TEXT, CLASS */
          )) : W("v-if", !0),
          e.result.responseLength !== void 0 ? (z(), $(
            "span",
            df,
            H(e.result.responseLength) + " bytes ",
            1
            /* TEXT */
          )) : W("v-if", !0),
          e.result.durationMs !== void 0 ? (z(), $(
            "span",
            ff,
            H(e.result.durationMs) + "ms ",
            1
            /* TEXT */
          )) : W("v-if", !0),
          e.result.error ? (z(), $(
            "span",
            pf,
            "Error: " + H(e.result.error),
            1
            /* TEXT */
          )) : W("v-if", !0)
        ]),
        W(" Modified JWT "),
        w("section", bf, [
          i[2] || (i[2] = w(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Modified JWT",
            -1
            /* CACHED */
          )),
          w("div", gf, [
            w(
              "span",
              hf,
              H(o.value[0]),
              1
              /* TEXT */
            ),
            i[0] || (i[0] = St(
              ".",
              -1
              /* CACHED */
            )),
            w(
              "span",
              mf,
              H(o.value[1]),
              1
              /* TEXT */
            ),
            i[1] || (i[1] = St(
              ".",
              -1
              /* CACHED */
            )),
            w(
              "span",
              xf,
              H(o.value[2]),
              1
              /* TEXT */
            )
          ]),
          w(
            "button",
            {
              onClick: n,
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            H(r.value ? "✓ Copied" : "Copy JWT"),
            1
            /* TEXT */
          )
        ]),
        W(" Decoded payload "),
        s.value ? (z(), $("section", vf, [
          i[3] || (i[3] = w(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Decoded Payload",
            -1
            /* CACHED */
          )),
          w(
            "pre",
            yf,
            H(s.value),
            1
            /* TEXT */
          )
        ])) : W("v-if", !0),
        W(" Response headers "),
        e.result.responseHeaders && Object.keys(e.result.responseHeaders).length ? (z(), $("section", kf, [
          i[4] || (i[4] = w(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Response Headers",
            -1
            /* CACHED */
          )),
          w("div", wf, [
            (z(!0), $(
              ae,
              null,
              dt(e.result.responseHeaders, (l, u) => (z(), $("div", {
                key: u,
                class: "flex gap-2"
              }, [
                w(
                  "span",
                  _f,
                  H(u) + ":",
                  1
                  /* TEXT */
                ),
                w(
                  "span",
                  Sf,
                  H(l),
                  1
                  /* TEXT */
                )
              ]))),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])) : W("v-if", !0),
        W(" Response body "),
        e.result.responseBody ? (z(), $("section", Cf, [
          i[5] || (i[5] = w(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Response Body",
            -1
            /* CACHED */
          )),
          w(
            "pre",
            Tf,
            H(e.result.responseBody),
            1
            /* TEXT */
          )
        ])) : W("v-if", !0)
      ])
    ])) : (z(), $("div", jf, " Select an attack to see details "));
  }
}), ya = /* @__PURE__ */ ia("config", () => {
  const e = _e({ ...Js });
  let t = null;
  function r(a) {
    t = a;
  }
  async function o() {
    if (t)
      try {
        const a = await t.storage.get("config");
        a && typeof a == "object" && (e.value = { ...Js, ...a });
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
}), Af = { class: "h-full overflow-y-auto px-4 py-4 space-y-6 text-sm" }, Of = { class: "space-y-3" }, If = ["value"], zf = ["value"], $f = { class: "space-y-2" }, Ef = ["checked", "onChange"], Lf = { class: "text-gray-300" }, Rf = { class: "pt-2 flex gap-3" }, Nf = {
  key: 0,
  class: "text-xs text-green-400 self-center"
}, Mf = /* @__PURE__ */ Jr({
  __name: "ConfigPanel",
  setup(e) {
    const t = ya(), r = Kt({ ...t.config }), o = _e(!1);
    Je(() => t.config, (n) => Object.assign(r, n), { deep: !0 });
    async function s() {
      t.update({ ...r }), await t.save(), o.value = !0, setTimeout(() => {
        o.value = !1;
      }, 2e3);
    }
    return (n, a) => (z(), $("div", Af, [
      w("section", null, [
        a[6] || (a[6] = w(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "JKU / X5U Spoofing",
          -1
          /* CACHED */
        )),
        a[7] || (a[7] = w(
          "label",
          { class: "block mb-1 text-gray-300" },
          "JWKS Endpoint URL",
          -1
          /* CACHED */
        )),
        Nt(w(
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
          [_r, r.jwksUrl]
        ]),
        a[8] || (a[8] = w(
          "p",
          { class: "text-xs text-gray-500 mt-1" },
          " Host the generated JWKS JSON at this URL so the target server can fetch it. ",
          -1
          /* CACHED */
        ))
      ]),
      w("section", null, [
        a[12] || (a[12] = w(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Custom Keys / Certificate",
          -1
          /* CACHED */
        )),
        w("div", Of, [
          w("div", null, [
            a[9] || (a[9] = w(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Public Key (PEM)",
              -1
              /* CACHED */
            )),
            Nt(w(
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
              [_r, r.customPublicKeyPem]
            ])
          ]),
          w("div", null, [
            a[10] || (a[10] = w(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Private Key (PEM) — for JKU/X5U spoofing",
              -1
              /* CACHED */
            )),
            Nt(w(
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
              [_r, r.customPrivateKeyPem]
            ])
          ]),
          w("div", null, [
            a[11] || (a[11] = w(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Certificate (PEM) — for algorithm confusion",
              -1
              /* CACHED */
            )),
            Nt(w(
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
              [_r, r.customCertPem]
            ])
          ])
        ])
      ]),
      w("section", null, [
        a[13] || (a[13] = w(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Additional JWKS Paths",
          -1
          /* CACHED */
        )),
        w("textarea", {
          value: r.extraJwksPaths.join(`
`),
          onInput: a[4] || (a[4] = (i) => r.extraJwksPaths = i.target.value.split(`
`).map((l) => l.trim()).filter(Boolean)),
          rows: "4",
          placeholder: `/custom/.well-known/jwks.json
/api/v2/auth/keys`,
          class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
        }, null, 40, If),
        a[14] || (a[14] = w(
          "p",
          { class: "text-xs text-gray-500 mt-1" },
          "One path per line. Probed in addition to the built-in list of 15 common paths.",
          -1
          /* CACHED */
        ))
      ]),
      w("section", null, [
        a[15] || (a[15] = w(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Custom Wordlist (Weak Secret)",
          -1
          /* CACHED */
        )),
        w("textarea", {
          value: r.customWordlist.join(`
`),
          onInput: a[5] || (a[5] = (i) => r.customWordlist = i.target.value.split(`
`).map((l) => l.trim()).filter(Boolean)),
          rows: "4",
          placeholder: `mysecret
appkey123`,
          class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
        }, null, 40, zf),
        a[16] || (a[16] = w(
          "p",
          { class: "text-xs text-gray-500 mt-1" },
          "One word per line. Appended to the built-in list of ~120 common JWT secrets.",
          -1
          /* CACHED */
        ))
      ]),
      w("section", null, [
        a[17] || (a[17] = w(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Enabled Attacks",
          -1
          /* CACHED */
        )),
        w("div", $f, [
          (z(!0), $(
            ae,
            null,
            dt($e(zd), (i, l) => (z(), $("label", {
              key: l,
              class: "flex items-center gap-2 cursor-pointer select-none"
            }, [
              w("input", {
                type: "checkbox",
                checked: r.enabledAttacks[l] ?? !0,
                onChange: (u) => r.enabledAttacks[l] = u.target.checked,
                class: "accent-blue-500"
              }, null, 40, Ef),
              w(
                "span",
                Lf,
                H(i),
                1
                /* TEXT */
              )
            ]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      w("div", Rf, [
        w("button", {
          onClick: s,
          class: "px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
        }, " Save "),
        o.value ? (z(), $("span", Nf, "✓ Saved")) : W("v-if", !0)
      ])
    ]));
  }
}), Ff = {
  id: "plugin--jwt-attacker",
  class: "h-full flex flex-col bg-gray-950 text-gray-200 overflow-hidden"
}, Df = { class: "flex items-center gap-1 px-3 py-2 border-b border-gray-700 bg-gray-900 shrink-0" }, Bf = ["onClick"], Vf = { class: "flex-1 flex overflow-hidden min-h-0" }, Hf = { class: "w-[42%] shrink-0 border-r border-gray-700 overflow-hidden flex flex-col" }, Kf = { class: "flex-1 overflow-hidden" }, Wf = { class: "flex-1 overflow-hidden" }, Uf = { class: "bg-gray-900 border border-gray-700 rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl" }, Jf = { class: "flex items-center justify-between px-4 py-3 border-b border-gray-700" }, Gf = { class: "flex-1 overflow-y-auto px-4 py-4 space-y-4" }, qf = { class: "bg-gray-800 rounded p-3 text-xs text-green-300 overflow-x-auto select-all max-h-48" }, Yf = { key: 0 }, Qf = { class: "bg-gray-800 rounded p-3 text-xs text-yellow-300 overflow-x-auto select-all max-h-36" }, Zf = /* @__PURE__ */ Jr({
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
      return z(), $("div", Ff, [
        W(" Top bar "),
        w("div", Df, [
          i[6] || (i[6] = w(
            "span",
            { class: "text-base font-bold text-yellow-400 mr-2" },
            "🔑 JWT Attacker",
            -1
            /* CACHED */
          )),
          (z(), $(
            ae,
            null,
            dt(s, (u) => w("button", {
              key: u.id,
              onClick: (c) => t.value = u.id,
              class: Ue([
                "px-3 py-1 rounded text-xs font-medium transition-colors",
                t.value === u.id ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-200"
              ])
            }, H(u.label), 11, Bf)),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        W(" Results tab: split pane "),
        Nt(w(
          "div",
          Vf,
          [
            w("div", Hf, [
              Re(tf, {
                "selected-id": (l = r.value) == null ? void 0 : l.id,
                onSelect: i[0] || (i[0] = (u) => r.value = u),
                onShowJwks: i[1] || (i[1] = (u) => o.value = u)
              }, null, 8, ["selected-id"])
            ]),
            w("div", Kf, [
              Re(Pf, {
                result: r.value ?? null
              }, null, 8, ["result"])
            ])
          ],
          512
          /* NEED_PATCH */
        ), [
          [hs, t.value === "results"]
        ]),
        W(" Config tab "),
        Nt(w(
          "div",
          Wf,
          [
            Re(Mf)
          ],
          512
          /* NEED_PATCH */
        ), [
          [hs, t.value === "config"]
        ]),
        W(" JWKS modal "),
        o.value ? (z(), $("div", {
          key: 0,
          class: "fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6",
          onClick: i[5] || (i[5] = Fl((u) => o.value = null, ["self"]))
        }, [
          w("div", Uf, [
            w("div", Jf, [
              i[7] || (i[7] = w(
                "h2",
                { class: "text-sm font-semibold" },
                "JKU/X5U Spoofing — JWKS Payload",
                -1
                /* CACHED */
              )),
              w("button", {
                onClick: i[2] || (i[2] = (u) => o.value = null),
                class: "text-gray-500 hover:text-gray-300 text-lg leading-none"
              }, "✕")
            ]),
            w("div", Gf, [
              w("div", null, [
                i[8] || (i[8] = w(
                  "p",
                  { class: "text-xs text-gray-400 mb-2" },
                  " Host this JSON at your configured JWKS URL so the server can fetch the attacker's public key. ",
                  -1
                  /* CACHED */
                )),
                w(
                  "pre",
                  qf,
                  H(o.value.jwksJson),
                  1
                  /* TEXT */
                ),
                w("button", {
                  onClick: i[3] || (i[3] = (u) => n(o.value.jwksJson)),
                  class: "mt-1 text-xs text-gray-500 hover:text-gray-300"
                }, "Copy JWKS")
              ]),
              o.value.jwksPrivateKey ? (z(), $("div", Yf, [
                i[9] || (i[9] = w(
                  "p",
                  { class: "text-xs text-gray-400 mb-2" },
                  "Private key used to sign the spoofed tokens:",
                  -1
                  /* CACHED */
                )),
                w(
                  "pre",
                  Qf,
                  H(o.value.jwksPrivateKey),
                  1
                  /* TEXT */
                ),
                w("button", {
                  onClick: i[4] || (i[4] = (u) => n(o.value.jwksPrivateKey)),
                  class: "mt-1 text-xs text-gray-500 hover:text-gray-300"
                }, "Copy Private Key")
              ])) : W("v-if", !0)
            ])
          ])
        ])) : W("v-if", !0)
      ]);
    };
  }
});
function Xf(e) {
  console.log("[JWT Attacker] init() called");
  const t = Vl(Zf), r = Wl();
  t.use(r), t.use(Bc, { unstyled: !0, pt: Id });
  const o = document.createElement("div");
  o.id = "plugin--jwt-attacker-root", o.style.cssText = "height:100%;width:100%;overflow:hidden;", t.mount(o), e.navigation.addPage("/jwt-attacker", { body: o }), e.sidebar.registerItem("JWT Attacker", "/jwt-attacker", { icon: "fas fa-key" });
  const s = ya();
  s.setSDK(e), s.load();
  const n = ma();
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
  Xf as init
};
