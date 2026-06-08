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
}, en = () => !1, Jr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ro = (e) => e.startsWith("onUpdate:"), we = Object.assign, Lo = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, $a = Object.prototype.hasOwnProperty, Q = (e, t) => $a.call(e, t), B = Array.isArray, Dt = (e) => xr(e) === "[object Map]", Ur = (e) => xr(e) === "[object Set]", ss = (e) => xr(e) === "[object Date]", H = (e) => typeof e == "function", ue = (e) => typeof e == "string", Qe = (e) => typeof e == "symbol", se = (e) => e !== null && typeof e == "object", tn = (e) => (se(e) || H(e)) && H(e.then) && H(e.catch), rn = Object.prototype.toString, xr = (e) => rn.call(e), Pa = (e) => xr(e).slice(8, -1), on = (e) => xr(e) === "[object Object]", No = (e) => ue(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Zt = /* @__PURE__ */ zo(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Gr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (r) => t[r] || (t[r] = e(r));
}, Oa = /-\w/g, mt = Gr(
  (e) => e.replace(Oa, (t) => t.slice(1).toUpperCase())
), Aa = /\B([A-Z])/g, At = Gr(
  (e) => e.replace(Aa, "-$1").toLowerCase()
), sn = Gr((e) => e.charAt(0).toUpperCase() + e.slice(1)), no = Gr(
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
}, yo = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ns;
const qr = () => ns || (ns = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Yr(e) {
  if (B(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const o = e[r], s = ue(o) ? Ra(o) : Yr(o);
      if (s)
        for (const n in s)
          t[n] = s[n];
    }
    return t;
  } else if (ue(e) || se(e))
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
function ye(e) {
  let t = "";
  if (ue(e))
    t = e;
  else if (B(e))
    for (let r = 0; r < e.length; r++) {
      const o = ye(e[r]);
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
    r = Xr(e[o], t[o]);
  return r;
}
function Xr(e, t) {
  if (e === t) return !0;
  let r = ss(e), o = ss(t);
  if (r || o)
    return r && o ? e.getTime() === t.getTime() : !1;
  if (r = Qe(e), o = Qe(t), r || o)
    return e === t;
  if (r = B(e), o = B(t), r || o)
    return r && o ? Ma(e, t) : !1;
  if (r = se(e), o = se(t), r || o) {
    if (!r || !o)
      return !1;
    const s = Object.keys(e).length, n = Object.keys(t).length;
    if (s !== n)
      return !1;
    for (const a in e) {
      const i = e.hasOwnProperty(a), l = t.hasOwnProperty(a);
      if (i && !l || !i && l || !Xr(e[a], t[a]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function ln(e, t) {
  return e.findIndex((r) => Xr(r, t));
}
const cn = (e) => !!(e && e.__v_isRef === !0), P = (e) => ue(e) ? e : e == null ? "" : B(e) || se(e) && (e.toString === rn || !H(e.toString)) ? cn(e) ? P(e.value) : JSON.stringify(e, un, 2) : String(e), un = (e, t) => cn(t) ? un(e, t.value) : Dt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (r, [o, s], n) => (r[ao(o, n) + " =>"] = s, r),
    {}
  )
} : Ur(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((r) => ao(r))
} : Qe(t) ? ao(t) : se(t) && !B(t) && !on(t) ? String(t) : t, ao = (e, t = "") => {
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
let xe;
class dn {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = xe, !t && xe && (this.index = (xe.scopes || (xe.scopes = [])).push(
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
      const r = xe;
      try {
        return xe = this, t();
      } finally {
        xe = r;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = xe, xe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (xe = this.prevScope, this.prevScope = void 0);
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
  return xe;
}
function Fa(e, t = !1) {
  xe && xe.cleanups.push(e);
}
let oe;
const io = /* @__PURE__ */ new WeakSet();
class bn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, xe && xe.active && xe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, io.has(this) && (io.delete(this), this.trigger()));
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
    this.flags & 64 ? io.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ko(this) && this.run();
  }
  get dirty() {
    return ko(this);
  }
}
let gn = 0, er, tr;
function hn(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = tr, tr = e;
    return;
  }
  e.next = er, er = e;
}
function Mo() {
  gn++;
}
function Fo() {
  if (--gn > 0)
    return;
  if (tr) {
    let t = tr;
    for (tr = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; er; ) {
    let t = er;
    for (er = void 0; t; ) {
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
function ko(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (vn(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function vn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === ur) || (e.globalVersion = ur, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ko(e))))
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
let ur = 0;
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
    this.version++, ur++, this.notify(t);
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
const Ir = /* @__PURE__ */ new WeakMap(), $t = Symbol(
  ""
), wo = Symbol(
  ""
), dr = Symbol(
  ""
);
function ke(e, t, r) {
  if (Be && oe) {
    let o = Ir.get(e);
    o || Ir.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(r);
    s || (o.set(r, s = new Vo()), s.map = o, s.key = r), s.track();
  }
}
function st(e, t, r, o, s, n) {
  const a = Ir.get(e);
  if (!a) {
    ur++;
    return;
  }
  const i = (l) => {
    l && l.trigger();
  };
  if (Mo(), t === "clear")
    a.forEach(i);
  else {
    const l = B(e), c = l && No(r);
    if (l && r === "length") {
      const u = Number(o);
      a.forEach((d, h) => {
        (h === "length" || h === dr || !Qe(h) && h >= u) && i(d);
      });
    } else
      switch ((r !== void 0 || a.has(void 0)) && i(a.get(r)), c && i(a.get(dr)), t) {
        case "add":
          l ? c && i(a.get("length")) : (i(a.get($t)), Dt(e) && i(a.get(wo)));
          break;
        case "delete":
          l || (i(a.get($t)), Dt(e) && i(a.get(wo)));
          break;
        case "set":
          Dt(e) && i(a.get($t));
          break;
      }
  }
  Fo();
}
function Ba(e, t) {
  const r = Ir.get(e);
  return r && r.get(t);
}
function It(e) {
  const t = G(e);
  return t === e ? t : (ke(t, "iterate", dr), Me(e) ? t : t.map(ge));
}
function Qr(e) {
  return ke(e = G(e), "iterate", dr), e;
}
const Ka = {
  __proto__: null,
  [Symbol.iterator]() {
    return lo(this, Symbol.iterator, ge);
  },
  concat(...e) {
    return It(this).concat(
      ...e.map((t) => B(t) ? It(t) : t)
    );
  },
  entries() {
    return lo(this, "entries", (e) => (e[1] = ge(e[1]), e));
  },
  every(e, t) {
    return et(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return et(this, "filter", e, t, (r) => r.map(ge), arguments);
  },
  find(e, t) {
    return et(this, "find", e, t, ge, arguments);
  },
  findIndex(e, t) {
    return et(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return et(this, "findLast", e, t, ge, arguments);
  },
  findLastIndex(e, t) {
    return et(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return et(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return co(this, "includes", e);
  },
  indexOf(...e) {
    return co(this, "indexOf", e);
  },
  join(e) {
    return It(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return co(this, "lastIndexOf", e);
  },
  map(e, t) {
    return et(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return qt(this, "pop");
  },
  push(...e) {
    return qt(this, "push", e);
  },
  reduce(e, ...t) {
    return is(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return is(this, "reduceRight", e, t);
  },
  shift() {
    return qt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return et(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return qt(this, "splice", e);
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
    return qt(this, "unshift", e);
  },
  values() {
    return lo(this, "values", ge);
  }
};
function lo(e, t, r) {
  const o = Qr(e), s = o[t]();
  return o !== e && !Me(e) && (s._next = s.next, s.next = () => {
    const n = s._next();
    return n.done || (n.value = r(n.value)), n;
  }), s;
}
const Wa = Array.prototype;
function et(e, t, r, o, s, n) {
  const a = Qr(e), i = a !== e && !Me(e), l = a[t];
  if (l !== Wa[t]) {
    const d = l.apply(e, n);
    return i ? ge(d) : d;
  }
  let c = r;
  a !== e && (i ? c = function(d, h) {
    return r.call(this, ge(d), h, e);
  } : r.length > 2 && (c = function(d, h) {
    return r.call(this, d, h, e);
  }));
  const u = l.call(a, c, o);
  return i && s ? s(u) : u;
}
function is(e, t, r, o) {
  const s = Qr(e);
  let n = r;
  return s !== e && (Me(e) ? r.length > 3 && (n = function(a, i, l) {
    return r.call(this, a, i, l, e);
  }) : n = function(a, i, l) {
    return r.call(this, a, ge(i), l, e);
  }), s[t](n, ...o);
}
function co(e, t, r) {
  const o = G(e);
  ke(o, "iterate", dr);
  const s = o[t](...r);
  return (s === -1 || s === !1) && Wo(r[0]) ? (r[0] = G(r[0]), o[t](...r)) : s;
}
function qt(e, t, r = []) {
  it(), Mo();
  const o = G(e)[t].apply(e, r);
  return Fo(), lt(), o;
}
const Ha = /* @__PURE__ */ zo("__proto__,__v_isRef,__isVue"), wn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Qe)
);
function Ja(e) {
  Qe(e) || (e = String(e));
  const t = G(this);
  return ke(t, "has", e), t.hasOwnProperty(e);
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
      return o === (s ? n ? ri : jn : n ? Tn : Cn).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const a = B(t);
    if (!s) {
      let l;
      if (a && (l = Ka[r]))
        return l;
      if (r === "hasOwnProperty")
        return Ja;
    }
    const i = Reflect.get(
      t,
      r,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      ce(t) ? t : o
    );
    if ((Qe(r) ? wn.has(r) : Ha(r)) || (s || ke(t, "get", r), n))
      return i;
    if (ce(i)) {
      const l = a && No(r) ? i : i.value;
      return s && se(l) ? zr(l) : l;
    }
    return se(i) ? s ? zr(i) : Ht(i) : i;
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
      if (!Me(o) && !xt(o) && (n = G(n), o = G(o)), !B(t) && ce(n) && !ce(o))
        return l || (n.value = o), !0;
    }
    const a = B(t) && No(r) ? Number(r) < t.length : Q(t, r), i = Reflect.set(
      t,
      r,
      o,
      ce(t) ? t : s
    );
    return t === G(s) && (a ? gt(o, n) && st(t, "set", r, o) : st(t, "add", r, o)), i;
  }
  deleteProperty(t, r) {
    const o = Q(t, r);
    t[r];
    const s = Reflect.deleteProperty(t, r);
    return s && o && st(t, "delete", r, void 0), s;
  }
  has(t, r) {
    const o = Reflect.has(t, r);
    return (!Qe(r) || !wn.has(r)) && ke(t, "has", r), o;
  }
  ownKeys(t) {
    return ke(
      t,
      "iterate",
      B(t) ? "length" : $t
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
const _o = (e) => e, _r = (e) => Reflect.getPrototypeOf(e);
function Xa(e, t, r) {
  return function(...o) {
    const s = this.__v_raw, n = G(s), a = Dt(n), i = e === "entries" || e === Symbol.iterator && a, l = e === "keys" && a, c = s[e](...o), u = r ? _o : t ? Rr : ge;
    return !t && ke(
      n,
      "iterate",
      l ? wo : $t
    ), {
      // iterator protocol
      next() {
        const { value: d, done: h } = c.next();
        return h ? { value: d, done: h } : {
          value: i ? [u(d[0]), u(d[1])] : u(d),
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
function Sr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Qa(e, t) {
  const r = {
    get(s) {
      const n = this.__v_raw, a = G(n), i = G(s);
      e || (gt(s, i) && ke(a, "get", s), ke(a, "get", i));
      const { has: l } = _r(a), c = t ? _o : e ? Rr : ge;
      if (l.call(a, s))
        return c(n.get(s));
      if (l.call(a, i))
        return c(n.get(i));
      n !== a && n.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && ke(G(s), "iterate", $t), s.size;
    },
    has(s) {
      const n = this.__v_raw, a = G(n), i = G(s);
      return e || (gt(s, i) && ke(a, "has", s), ke(a, "has", i)), s === i ? n.has(s) : n.has(s) || n.has(i);
    },
    forEach(s, n) {
      const a = this, i = a.__v_raw, l = G(i), c = t ? _o : e ? Rr : ge;
      return !e && ke(l, "iterate", $t), i.forEach((u, d) => s.call(n, c(u), c(d), a));
    }
  };
  return we(
    r,
    e ? {
      add: Sr("add"),
      set: Sr("set"),
      delete: Sr("delete"),
      clear: Sr("clear")
    } : {
      add(s) {
        !t && !Me(s) && !xt(s) && (s = G(s));
        const n = G(this);
        return _r(n).has.call(n, s) || (n.add(s), st(n, "add", s, s)), this;
      },
      set(s, n) {
        !t && !Me(n) && !xt(n) && (n = G(n));
        const a = G(this), { has: i, get: l } = _r(a);
        let c = i.call(a, s);
        c || (s = G(s), c = i.call(a, s));
        const u = l.call(a, s);
        return a.set(s, n), c ? gt(n, u) && st(a, "set", s, n) : st(a, "add", s, n), this;
      },
      delete(s) {
        const n = G(this), { has: a, get: i } = _r(n);
        let l = a.call(n, s);
        l || (s = G(s), l = a.call(n, s)), i && i.call(n, s);
        const c = n.delete(s);
        return l && st(n, "delete", s, void 0), c;
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
    r[s] = Xa(s, e, t);
  }), r;
}
function Bo(e, t) {
  const r = Qa(e, t);
  return (o, s, n) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    Q(r, s) && s in o ? r : o,
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
const Cn = /* @__PURE__ */ new WeakMap(), Tn = /* @__PURE__ */ new WeakMap(), jn = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ new WeakMap();
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
function Ht(e) {
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
    Tn
  );
}
function zr(e) {
  return Ko(
    e,
    !0,
    qa,
    ti,
    jn
  );
}
function Ko(e, t, r, o, s) {
  if (!se(e) || e.__v_raw && !(t && e.__v_isReactive))
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
function Me(e) {
  return !!(e && e.__v_isShallow);
}
function Wo(e) {
  return e ? !!e.__v_raw : !1;
}
function G(e) {
  const t = e && e.__v_raw;
  return t ? G(t) : e;
}
function Ho(e) {
  return !Q(e, "__v_skip") && Object.isExtensible(e) && nn(e, "__v_skip", !0), e;
}
const ge = (e) => se(e) ? Ht(e) : e, Rr = (e) => se(e) ? zr(e) : e;
function ce(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ae(e) {
  return ai(e, !1);
}
function ai(e, t) {
  return ce(e) ? e : new ii(e, t);
}
class ii {
  constructor(t, r) {
    this.dep = new Vo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = r ? t : G(t), this._value = r ? t : ge(t), this.__v_isShallow = r;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const r = this._rawValue, o = this.__v_isShallow || Me(t) || xt(t);
    t = o ? t : G(t), gt(t, r) && (this._rawValue = t, this._value = o ? t : ge(t), this.dep.trigger());
  }
}
function Se(e) {
  return ce(e) ? e.value : e;
}
const li = {
  get: (e, t, r) => t === "__v_raw" ? e : Se(Reflect.get(e, t, r)),
  set: (e, t, r, o) => {
    const s = e[t];
    return ce(s) && !ce(r) ? (s.value = r, !0) : Reflect.set(e, t, r, o);
  }
};
function $n(e) {
  return ht(e) ? e : new Proxy(e, li);
}
function ci(e) {
  const t = B(e) ? new Array(e.length) : {};
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
  return ce(o) ? o : new ui(e, t, r);
}
class fi {
  constructor(t, r, o) {
    this.fn = t, this.setter = r, this._value = void 0, this.dep = new Vo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ur - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = o;
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
const Cr = {}, Lr = /* @__PURE__ */ new WeakMap();
let St;
function bi(e, t = !1, r = St) {
  if (r) {
    let o = Lr.get(r);
    o || Lr.set(r, o = []), o.push(e);
  }
}
function gi(e, t, r = te) {
  const { immediate: o, deep: s, once: n, scheduler: a, augmentJob: i, call: l } = r, c = (E) => s ? E : Me(E) || s === !1 || s === 0 ? nt(E, 1) : nt(E);
  let u, d, h, g, w = !1, k = !1;
  if (ce(e) ? (d = () => e.value, w = Me(e)) : ht(e) ? (d = () => c(e), w = !0) : B(e) ? (k = !0, w = e.some((E) => ht(E) || Me(E)), d = () => e.map((E) => {
    if (ce(E))
      return E.value;
    if (ht(E))
      return c(E);
    if (H(E))
      return l ? l(E, 2) : E();
  })) : H(e) ? t ? d = l ? () => l(e, 2) : e : d = () => {
    if (h) {
      it();
      try {
        h();
      } finally {
        lt();
      }
    }
    const E = St;
    St = u;
    try {
      return l ? l(e, 3, [g]) : e(g);
    } finally {
      St = E;
    }
  } : d = Xe, t && s) {
    const E = d, F = s === !0 ? 1 / 0 : s;
    d = () => nt(E(), F);
  }
  const _ = pn(), v = () => {
    u.stop(), _ && _.active && Lo(_.effects, u);
  };
  if (n && t) {
    const E = t;
    t = (...F) => {
      E(...F), v();
    };
  }
  let T = k ? new Array(e.length).fill(Cr) : Cr;
  const L = (E) => {
    if (!(!(u.flags & 1) || !u.dirty && !E))
      if (t) {
        const F = u.run();
        if (s || w || (k ? F.some((Y, q) => gt(Y, T[q])) : gt(F, T))) {
          h && h();
          const Y = St;
          St = u;
          try {
            const q = [
              F,
              // pass undefined as the old value when it's changed for the first time
              T === Cr ? void 0 : k && T[0] === Cr ? [] : T,
              g
            ];
            T = F, l ? l(t, 3, q) : (
              // @ts-expect-error
              t(...q)
            );
          } finally {
            St = Y;
          }
        }
      } else
        u.run();
  };
  return i && i(L), u = new bn(d), u.scheduler = a ? () => a(L, !1) : L, g = (E) => bi(E, !1, u), h = u.onStop = () => {
    const E = Lr.get(u);
    if (E) {
      if (l)
        l(E, 4);
      else
        for (const F of E) F();
      Lr.delete(u);
    }
  }, t ? o ? L(!0) : T = u.run() : a ? a(L.bind(null, !0), !0) : u.run(), v.pause = u.pause.bind(u), v.resume = u.resume.bind(u), v.stop = v, v;
}
function nt(e, t = 1 / 0, r) {
  if (t <= 0 || !se(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t))
    return e;
  if (r.set(e, t), t--, ce(e))
    nt(e.value, t, r);
  else if (B(e))
    for (let o = 0; o < e.length; o++)
      nt(e[o], t, r);
  else if (Ur(e) || Dt(e))
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
function vr(e, t, r, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    Zr(s, t, r);
  }
}
function Ze(e, t, r, o) {
  if (H(e)) {
    const s = vr(e, t, r, o);
    return s && tn(s) && s.catch((n) => {
      Zr(n, t, r);
    }), s;
  }
  if (B(e)) {
    const s = [];
    for (let n = 0; n < e.length; n++)
      s.push(Ze(e[n], t, r, o));
    return s;
  }
}
function Zr(e, t, r, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: n, throwUnhandledErrorInProduction: a } = t && t.appContext.config || te;
  if (t) {
    let i = t.parent;
    const l = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; i; ) {
      const u = i.ec;
      if (u) {
        for (let d = 0; d < u.length; d++)
          if (u[d](e, l, c) === !1)
            return;
      }
      i = i.parent;
    }
    if (n) {
      it(), vr(n, null, 10, [
        e,
        l,
        c
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
const Ce = [];
let Ge = -1;
const Vt = [];
let pt = null, Lt = 0;
const Pn = /* @__PURE__ */ Promise.resolve();
let Nr = null;
function Jo(e) {
  const t = Nr || Pn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function mi(e) {
  let t = Ge + 1, r = Ce.length;
  for (; t < r; ) {
    const o = t + r >>> 1, s = Ce[o], n = fr(s);
    n < e || n === e && s.flags & 2 ? t = o + 1 : r = o;
  }
  return t;
}
function Uo(e) {
  if (!(e.flags & 1)) {
    const t = fr(e), r = Ce[Ce.length - 1];
    !r || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= fr(r) ? Ce.push(e) : Ce.splice(mi(t), 0, e), e.flags |= 1, On();
  }
}
function On() {
  Nr || (Nr = Pn.then(En));
}
function xi(e) {
  B(e) ? Vt.push(...e) : pt && e.id === -1 ? pt.splice(Lt + 1, 0, e) : e.flags & 1 || (Vt.push(e), e.flags |= 1), On();
}
function ls(e, t, r = Ge + 1) {
  for (; r < Ce.length; r++) {
    const o = Ce[r];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid)
        continue;
      Ce.splice(r, 1), r--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function An(e) {
  if (Vt.length) {
    const t = [...new Set(Vt)].sort(
      (r, o) => fr(r) - fr(o)
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
const fr = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function En(e) {
  try {
    for (Ge = 0; Ge < Ce.length; Ge++) {
      const t = Ce[Ge];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), vr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ge < Ce.length; Ge++) {
      const t = Ce[Ge];
      t && (t.flags &= -2);
    }
    Ge = -1, Ce.length = 0, An(), Nr = null, (Ce.length || Vt.length) && En();
  }
}
let Ne = null, In = null;
function Mr(e) {
  const t = Ne;
  return Ne = e, In = e && e.type.__scopeId || null, t;
}
function vi(e, t = Ne, r) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && xs(-1);
    const n = Mr(t);
    let a;
    try {
      a = e(...s);
    } finally {
      Mr(n), o._d && xs(1);
    }
    return a;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function Ct(e, t) {
  if (Ne === null)
    return e;
  const r = oo(Ne), o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [n, a, i, l = te] = t[s];
    n && (H(n) && (n = {
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
    l && (it(), Ze(l, r, 8, [
      e.el,
      i,
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
function Jt(e, t) {
  return H(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    we({ name: e.name }, t, { setup: e })
  ) : e;
}
function zn(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Fr = /* @__PURE__ */ new WeakMap();
function rr(e, t, r, o, s = !1) {
  if (B(e)) {
    e.forEach(
      (w, k) => rr(
        w,
        t && (B(t) ? t[k] : t),
        r,
        o,
        s
      )
    );
    return;
  }
  if (or(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && rr(e, t, r, o.component.subTree);
    return;
  }
  const n = o.shapeFlag & 4 ? oo(o.component) : o.el, a = s ? null : n, { i, r: l } = e, c = t && t.r, u = i.refs === te ? i.refs = {} : i.refs, d = i.setupState, h = G(d), g = d === te ? en : (w) => Q(h, w);
  if (c != null && c !== l) {
    if (cs(t), ue(c))
      u[c] = null, g(c) && (d[c] = null);
    else if (ce(c)) {
      c.value = null;
      const w = t;
      w.k && (u[w.k] = null);
    }
  }
  if (H(l))
    vr(l, i, 12, [a, u]);
  else {
    const w = ue(l), k = ce(l);
    if (w || k) {
      const _ = () => {
        if (e.f) {
          const v = w ? g(l) ? d[l] : u[l] : l.value;
          if (s)
            B(v) && Lo(v, n);
          else if (B(v))
            v.includes(n) || v.push(n);
          else if (w)
            u[l] = [n], g(l) && (d[l] = u[l]);
          else {
            const T = [n];
            l.value = T, e.k && (u[e.k] = T);
          }
        } else w ? (u[l] = a, g(l) && (d[l] = a)) : k && (l.value = a, e.k && (u[e.k] = a));
      };
      if (a) {
        const v = () => {
          _(), Fr.delete(e);
        };
        v.id = -1, Fr.set(e, v), ze(v, r);
      } else
        cs(e), _();
    }
  }
}
function cs(e) {
  const t = Fr.get(e);
  t && (t.flags |= 8, Fr.delete(e));
}
qr().requestIdleCallback;
qr().cancelIdleCallback;
const or = (e) => !!e.type.__asyncLoader, Rn = (e) => e.type.__isKeepAlive;
function _i(e, t) {
  Ln(e, "a", t);
}
function Si(e, t) {
  Ln(e, "da", t);
}
function Ln(e, t, r = Te) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = r;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (eo(t, o, r), r) {
    let s = r.parent;
    for (; s && s.parent; )
      Rn(s.parent.vnode) && Ci(o, t, r, s), s = s.parent;
  }
}
function Ci(e, t, r, o) {
  const s = eo(
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
function eo(e, t, r = Te, o = !1) {
  if (r) {
    const s = r[e] || (r[e] = []), n = t.__weh || (t.__weh = (...a) => {
      it();
      const i = yr(r), l = Ze(t, r, e, a);
      return i(), lt(), l;
    });
    return o ? s.unshift(n) : s.push(n), n;
  }
}
const ct = (e) => (t, r = Te) => {
  (!br || e === "sp") && eo(e, (...o) => t(...o), r);
}, Ti = ct("bm"), Nn = ct("m"), ji = ct(
  "bu"
), $i = ct("u"), Pi = ct(
  "bum"
), Mn = ct("um"), Oi = ct(
  "sp"
), Ai = ct("rtg"), Ei = ct("rtc");
function Ii(e, t = Te) {
  eo("ec", e, t);
}
const zi = Symbol.for("v-ndc");
function De(e, t, r, o) {
  let s;
  const n = r, a = B(e);
  if (a || ue(e)) {
    const i = a && ht(e);
    let l = !1, c = !1;
    i && (l = !Me(e), c = xt(e), e = Qr(e)), s = new Array(e.length);
    for (let u = 0, d = e.length; u < d; u++)
      s[u] = t(
        l ? c ? Rr(ge(e[u])) : ge(e[u]) : e[u],
        u,
        void 0,
        n
      );
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let i = 0; i < e; i++)
      s[i] = t(i + 1, i, void 0, n);
  } else if (se(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (i, l) => t(i, l, void 0, n)
      );
    else {
      const i = Object.keys(e);
      s = new Array(i.length);
      for (let l = 0, c = i.length; l < c; l++) {
        const u = i[l];
        s[l] = t(e[u], u, l, n);
      }
    }
  else
    s = [];
  return s;
}
const So = (e) => e ? na(e) ? oo(e) : So(e.parent) : null, sr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ we(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => So(e.parent),
    $root: (e) => So(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Dn(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Uo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Jo.bind(e.proxy)),
    $watch: (e) => ol.bind(e)
  })
), uo = (e, t) => e !== te && !e.__isScriptSetup && Q(e, t), Ri = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: r, setupState: o, data: s, props: n, accessCache: a, type: i, appContext: l } = e;
    let c;
    if (t[0] !== "$") {
      const g = a[t];
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
        if (uo(o, t))
          return a[t] = 1, o[t];
        if (s !== te && Q(s, t))
          return a[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = e.propsOptions[0]) && Q(c, t)
        )
          return a[t] = 3, n[t];
        if (r !== te && Q(r, t))
          return a[t] = 4, r[t];
        Co && (a[t] = 0);
      }
    }
    const u = sr[t];
    let d, h;
    if (u)
      return t === "$attrs" && ke(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (d = i.__cssModules) && (d = d[t])
    )
      return d;
    if (r !== te && Q(r, t))
      return a[t] = 4, r[t];
    if (
      // global properties
      h = l.config.globalProperties, Q(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, r) {
    const { data: o, setupState: s, ctx: n } = e;
    return uo(s, t) ? (s[t] = r, !0) : o !== te && Q(o, t) ? (o[t] = r, !0) : Q(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (n[t] = r, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: r, ctx: o, appContext: s, propsOptions: n, type: a }
  }, i) {
    let l, c;
    return !!(r[i] || e !== te && i[0] !== "$" && Q(e, i) || uo(t, i) || (l = n[0]) && Q(l, i) || Q(o, i) || Q(sr, i) || Q(s.config.globalProperties, i) || (c = a.__cssModules) && c[i]);
  },
  defineProperty(e, t, r) {
    return r.get != null ? e._.accessCache[t] = 0 : Q(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
  }
};
function us(e) {
  return B(e) ? e.reduce(
    (t, r) => (t[r] = null, t),
    {}
  ) : e;
}
let Co = !0;
function Li(e) {
  const t = Dn(e), r = e.proxy, o = e.ctx;
  Co = !1, t.beforeCreate && ds(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: n,
    methods: a,
    watch: i,
    provide: l,
    inject: c,
    // lifecycle
    created: u,
    beforeMount: d,
    mounted: h,
    beforeUpdate: g,
    updated: w,
    activated: k,
    deactivated: _,
    beforeDestroy: v,
    beforeUnmount: T,
    destroyed: L,
    unmounted: E,
    render: F,
    renderTracked: Y,
    renderTriggered: q,
    errorCaptured: V,
    serverPrefetch: N,
    // public API
    expose: X,
    inheritAttrs: le,
    // assets
    components: de,
    directives: he,
    filters: je
  } = t;
  if (c && Ni(c, o, null), a)
    for (const W in a) {
      const U = a[W];
      H(U) && (o[W] = U.bind(r));
    }
  if (s) {
    const W = s.call(r, r);
    se(W) && (e.data = Ht(W));
  }
  if (Co = !0, n)
    for (const W in n) {
      const U = n[W], $e = H(U) ? U.bind(r, r) : H(U.get) ? U.get.bind(r, r) : Xe, Pe = !H(U) && H(U.set) ? U.set.bind(r) : Xe, fe = Ee({
        get: $e,
        set: Pe
      });
      Object.defineProperty(o, W, {
        enumerable: !0,
        configurable: !0,
        get: () => fe.value,
        set: (pe) => fe.value = pe
      });
    }
  if (i)
    for (const W in i)
      Fn(i[W], o, r, W);
  if (l) {
    const W = H(l) ? l.call(r) : l;
    Reflect.ownKeys(W).forEach((U) => {
      Ki(U, W[U]);
    });
  }
  u && ds(u, e, "c");
  function ee(W, U) {
    B(U) ? U.forEach(($e) => W($e.bind(r))) : U && W(U.bind(r));
  }
  if (ee(Ti, d), ee(Nn, h), ee(ji, g), ee($i, w), ee(_i, k), ee(Si, _), ee(Ii, V), ee(Ei, Y), ee(Ai, q), ee(Pi, T), ee(Mn, E), ee(Oi, N), B(X))
    if (X.length) {
      const W = e.exposed || (e.exposed = {});
      X.forEach((U) => {
        Object.defineProperty(W, U, {
          get: () => r[U],
          set: ($e) => r[U] = $e,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  F && e.render === Xe && (e.render = F), le != null && (e.inheritAttrs = le), de && (e.components = de), he && (e.directives = he), N && zn(e);
}
function Ni(e, t, r = Xe) {
  B(e) && (e = To(e));
  for (const o in e) {
    const s = e[o];
    let n;
    se(s) ? "default" in s ? n = nr(
      s.from || o,
      s.default,
      !0
    ) : n = nr(s.from || o) : n = nr(s), ce(n) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => n.value,
      set: (a) => n.value = a
    }) : t[o] = n;
  }
}
function ds(e, t, r) {
  Ze(
    B(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    r
  );
}
function Fn(e, t, r, o) {
  let s = o.includes(".") ? Zn(r, o) : () => r[o];
  if (ue(e)) {
    const n = t[e];
    H(n) && Ye(s, n);
  } else if (H(e))
    Ye(s, e.bind(r));
  else if (se(e))
    if (B(e))
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
    config: { optionMergeStrategies: a }
  } = e.appContext, i = n.get(t);
  let l;
  return i ? l = i : !s.length && !r && !o ? l = t : (l = {}, s.length && s.forEach(
    (c) => Dr(l, c, a, !0)
  ), Dr(l, t, a)), se(t) && n.set(t, l), l;
}
function Dr(e, t, r, o = !1) {
  const { mixins: s, extends: n } = t;
  n && Dr(e, n, r, !0), s && s.forEach(
    (a) => Dr(e, a, r, !0)
  );
  for (const a in t)
    if (!(o && a === "expose")) {
      const i = Mi[a] || r && r[a];
      e[a] = i ? i(e[a], t[a]) : t[a];
    }
  return e;
}
const Mi = {
  data: fs,
  props: ps,
  emits: ps,
  // objects
  methods: Qt,
  computed: Qt,
  // lifecycle
  beforeCreate: _e,
  created: _e,
  beforeMount: _e,
  mounted: _e,
  beforeUpdate: _e,
  updated: _e,
  beforeDestroy: _e,
  beforeUnmount: _e,
  destroyed: _e,
  unmounted: _e,
  activated: _e,
  deactivated: _e,
  errorCaptured: _e,
  serverPrefetch: _e,
  // assets
  components: Qt,
  directives: Qt,
  // watch
  watch: Di,
  // provide / inject
  provide: fs,
  inject: Fi
};
function fs(e, t) {
  return t ? e ? function() {
    return we(
      H(e) ? e.call(this, this) : e,
      H(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Fi(e, t) {
  return Qt(To(e), To(t));
}
function To(e) {
  if (B(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++)
      t[e[r]] = e[r];
    return t;
  }
  return e;
}
function _e(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Qt(e, t) {
  return e ? we(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ps(e, t) {
  return e ? B(e) && B(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : we(
    /* @__PURE__ */ Object.create(null),
    us(e),
    us(t ?? {})
  ) : t;
}
function Di(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = we(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    r[o] = _e(e[o], t[o]);
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
    H(o) || (o = we({}, o)), s != null && !se(s) && (s = null);
    const n = Vn(), a = /* @__PURE__ */ new WeakSet(), i = [];
    let l = !1;
    const c = n.app = {
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
      set config(u) {
      },
      use(u, ...d) {
        return a.has(u) || (u && H(u.install) ? (a.add(u), u.install(c, ...d)) : H(u) && (a.add(u), u(c, ...d))), c;
      },
      mixin(u) {
        return n.mixins.includes(u) || n.mixins.push(u), c;
      },
      component(u, d) {
        return d ? (n.components[u] = d, c) : n.components[u];
      },
      directive(u, d) {
        return d ? (n.directives[u] = d, c) : n.directives[u];
      },
      mount(u, d, h) {
        if (!l) {
          const g = c._ceVNode || Ke(o, s);
          return g.appContext = n, h === !0 ? h = "svg" : h === !1 && (h = void 0), e(g, u, h), l = !0, c._container = u, u.__vue_app__ = c, oo(g.component);
        }
      },
      onUnmount(u) {
        i.push(u);
      },
      unmount() {
        l && (Ze(
          i,
          c._instance,
          16
        ), e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, d) {
        return n.provides[u] = d, c;
      },
      runWithContext(u) {
        const d = Pt;
        Pt = c;
        try {
          return u();
        } finally {
          Pt = d;
        }
      }
    };
    return c;
  };
}
let Pt = null;
function Ki(e, t) {
  if (Te) {
    let r = Te.provides;
    const o = Te.parent && Te.parent.provides;
    o === r && (r = Te.provides = Object.create(o)), r[e] = t;
  }
}
function nr(e, t, r = !1) {
  const o = Qo();
  if (o || Pt) {
    let s = Pt ? Pt._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return r && H(t) ? t.call(o && o.proxy) : t;
  }
}
function Wi() {
  return !!(Qo() || Pt);
}
const Bn = {}, Kn = () => Object.create(Bn), Wn = (e) => Object.getPrototypeOf(e) === Bn;
function Hi(e, t, r, o = !1) {
  const s = {}, n = Kn();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Hn(e, t, s, n);
  for (const a in e.propsOptions[0])
    a in s || (s[a] = void 0);
  r ? e.props = o ? s : ni(s) : e.type.props ? e.props = s : e.props = n, e.attrs = n;
}
function Ji(e, t, r, o) {
  const {
    props: s,
    attrs: n,
    vnode: { patchFlag: a }
  } = e, i = G(s), [l] = e.propsOptions;
  let c = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (o || a > 0) && !(a & 16)
  ) {
    if (a & 8) {
      const u = e.vnode.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        let h = u[d];
        if (to(e.emitsOptions, h))
          continue;
        const g = t[h];
        if (l)
          if (Q(n, h))
            g !== n[h] && (n[h] = g, c = !0);
          else {
            const w = mt(h);
            s[w] = jo(
              l,
              i,
              w,
              g,
              e,
              !1
            );
          }
        else
          g !== n[h] && (n[h] = g, c = !0);
      }
    }
  } else {
    Hn(e, t, s, n) && (c = !0);
    let u;
    for (const d in i)
      (!t || // for camelCase
      !Q(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = At(d)) === d || !Q(t, u))) && (l ? r && // for camelCase
      (r[d] !== void 0 || // for kebab-case
      r[u] !== void 0) && (s[d] = jo(
        l,
        i,
        d,
        void 0,
        e,
        !0
      )) : delete s[d]);
    if (n !== i)
      for (const d in n)
        (!t || !Q(t, d)) && (delete n[d], c = !0);
  }
  c && st(e.attrs, "set", "");
}
function Hn(e, t, r, o) {
  const [s, n] = e.propsOptions;
  let a = !1, i;
  if (t)
    for (let l in t) {
      if (Zt(l))
        continue;
      const c = t[l];
      let u;
      s && Q(s, u = mt(l)) ? !n || !n.includes(u) ? r[u] = c : (i || (i = {}))[u] = c : to(e.emitsOptions, l) || (!(l in o) || c !== o[l]) && (o[l] = c, a = !0);
    }
  if (n) {
    const l = G(r), c = i || te;
    for (let u = 0; u < n.length; u++) {
      const d = n[u];
      r[d] = jo(
        s,
        l,
        d,
        c[d],
        e,
        !Q(c, d)
      );
    }
  }
  return a;
}
function jo(e, t, r, o, s, n) {
  const a = e[r];
  if (a != null) {
    const i = Q(a, "default");
    if (i && o === void 0) {
      const l = a.default;
      if (a.type !== Function && !a.skipFactory && H(l)) {
        const { propsDefaults: c } = s;
        if (r in c)
          o = c[r];
        else {
          const u = yr(s);
          o = c[r] = l.call(
            null,
            t
          ), u();
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
const Ui = /* @__PURE__ */ new WeakMap();
function Jn(e, t, r = !1) {
  const o = r ? Ui : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const n = e.props, a = {}, i = [];
  let l = !1;
  if (!H(e)) {
    const u = (d) => {
      l = !0;
      const [h, g] = Jn(d, t, !0);
      we(a, h), g && i.push(...g);
    };
    !r && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!n && !l)
    return se(e) && o.set(e, Ft), Ft;
  if (B(n))
    for (let u = 0; u < n.length; u++) {
      const d = mt(n[u]);
      bs(d) && (a[d] = te);
    }
  else if (n)
    for (const u in n) {
      const d = mt(u);
      if (bs(d)) {
        const h = n[u], g = a[d] = B(h) || H(h) ? { type: h } : we({}, h), w = g.type;
        let k = !1, _ = !0;
        if (B(w))
          for (let v = 0; v < w.length; ++v) {
            const T = w[v], L = H(T) && T.name;
            if (L === "Boolean") {
              k = !0;
              break;
            } else L === "String" && (_ = !1);
          }
        else
          k = H(w) && w.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = k, g[
          1
          /* shouldCastTrue */
        ] = _, (k || Q(g, "default")) && i.push(d);
      }
    }
  const c = [a, i];
  return se(e) && o.set(e, c), c;
}
function bs(e) {
  return e[0] !== "$" && !Zt(e);
}
const qo = (e) => e === "_" || e === "_ctx" || e === "$stable", Yo = (e) => B(e) ? e.map(qe) : [qe(e)], Gi = (e, t, r) => {
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
      const a = Yo(n);
      t[s] = () => a;
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
  let n = !0, a = te;
  if (o.shapeFlag & 32) {
    const i = t._;
    i ? r && i === 1 ? n = !1 : qn(s, t, r) : (n = !t.$stable, Un(t, s)), a = t;
  } else t && (Gn(e, t), a = { default: 1 });
  if (n)
    for (const i in s)
      !qo(i) && a[i] == null && delete s[i];
}, ze = dl;
function Xi(e) {
  return Qi(e);
}
function Qi(e, t) {
  const r = qr();
  r.__VUE__ = !0;
  const {
    insert: o,
    remove: s,
    patchProp: n,
    createElement: a,
    createText: i,
    createComment: l,
    setText: c,
    setElementText: u,
    parentNode: d,
    nextSibling: h,
    setScopeId: g = Xe,
    insertStaticContent: w
  } = e, k = (f, p, m, S = null, x = null, y = null, A = void 0, $ = null, j = !!p.dynamicChildren) => {
    if (f === p)
      return;
    f && !Yt(f, p) && (S = Et(f), pe(f, x, y, !0), f = null), p.patchFlag === -2 && (j = !1, p.dynamicChildren = null);
    const { type: C, ref: D, shapeFlag: z } = p;
    switch (C) {
      case ro:
        _(f, p, m, S);
        break;
      case vt:
        v(f, p, m, S);
        break;
      case po:
        f == null && T(p, m, S, A);
        break;
      case ne:
        de(
          f,
          p,
          m,
          S,
          x,
          y,
          A,
          $,
          j
        );
        break;
      default:
        z & 1 ? F(
          f,
          p,
          m,
          S,
          x,
          y,
          A,
          $,
          j
        ) : z & 6 ? he(
          f,
          p,
          m,
          S,
          x,
          y,
          A,
          $,
          j
        ) : (z & 64 || z & 128) && C.process(
          f,
          p,
          m,
          S,
          x,
          y,
          A,
          $,
          j,
          kt
        );
    }
    D != null && x ? rr(D, f && f.ref, y, p || f, !p) : D == null && f && f.ref != null && rr(f.ref, null, y, f, !0);
  }, _ = (f, p, m, S) => {
    if (f == null)
      o(
        p.el = i(p.children),
        m,
        S
      );
    else {
      const x = p.el = f.el;
      p.children !== f.children && c(x, p.children);
    }
  }, v = (f, p, m, S) => {
    f == null ? o(
      p.el = l(p.children || ""),
      m,
      S
    ) : p.el = f.el;
  }, T = (f, p, m, S) => {
    [f.el, f.anchor] = w(
      f.children,
      p,
      m,
      S,
      f.el,
      f.anchor
    );
  }, L = ({ el: f, anchor: p }, m, S) => {
    let x;
    for (; f && f !== p; )
      x = h(f), o(f, m, S), f = x;
    o(p, m, S);
  }, E = ({ el: f, anchor: p }) => {
    let m;
    for (; f && f !== p; )
      m = h(f), s(f), f = m;
    s(p);
  }, F = (f, p, m, S, x, y, A, $, j) => {
    p.type === "svg" ? A = "svg" : p.type === "math" && (A = "mathml"), f == null ? Y(
      p,
      m,
      S,
      x,
      y,
      A,
      $,
      j
    ) : N(
      f,
      p,
      x,
      y,
      A,
      $,
      j
    );
  }, Y = (f, p, m, S, x, y, A, $) => {
    let j, C;
    const { props: D, shapeFlag: z, transition: M, dirs: K } = f;
    if (j = f.el = a(
      f.type,
      y,
      D && D.is,
      D
    ), z & 8 ? u(j, f.children) : z & 16 && V(
      f.children,
      j,
      null,
      S,
      x,
      fo(f, y),
      A,
      $
    ), K && wt(f, null, S, "created"), q(j, f, f.scopeId, A, S), D) {
      for (const re in D)
        re !== "value" && !Zt(re) && n(j, re, null, D[re], y, S);
      "value" in D && n(j, "value", null, D.value, y), (C = D.onVnodeBeforeMount) && Ue(C, S, f);
    }
    K && wt(f, null, S, "beforeMount");
    const J = Zi(x, M);
    J && M.beforeEnter(j), o(j, p, m), ((C = D && D.onVnodeMounted) || J || K) && ze(() => {
      C && Ue(C, S, f), J && M.enter(j), K && wt(f, null, S, "mounted");
    }, x);
  }, q = (f, p, m, S, x) => {
    if (m && g(f, m), S)
      for (let y = 0; y < S.length; y++)
        g(f, S[y]);
    if (x) {
      let y = x.subTree;
      if (p === y || ta(y.type) && (y.ssContent === p || y.ssFallback === p)) {
        const A = x.vnode;
        q(
          f,
          A,
          A.scopeId,
          A.slotScopeIds,
          x.parent
        );
      }
    }
  }, V = (f, p, m, S, x, y, A, $, j = 0) => {
    for (let C = j; C < f.length; C++) {
      const D = f[C] = $ ? bt(f[C]) : qe(f[C]);
      k(
        null,
        D,
        p,
        m,
        S,
        x,
        y,
        A,
        $
      );
    }
  }, N = (f, p, m, S, x, y, A) => {
    const $ = p.el = f.el;
    let { patchFlag: j, dynamicChildren: C, dirs: D } = p;
    j |= f.patchFlag & 16;
    const z = f.props || te, M = p.props || te;
    let K;
    if (m && _t(m, !1), (K = M.onVnodeBeforeUpdate) && Ue(K, m, p, f), D && wt(p, f, m, "beforeUpdate"), m && _t(m, !0), (z.innerHTML && M.innerHTML == null || z.textContent && M.textContent == null) && u($, ""), C ? X(
      f.dynamicChildren,
      C,
      $,
      m,
      S,
      fo(p, x),
      y
    ) : A || U(
      f,
      p,
      $,
      null,
      m,
      S,
      fo(p, x),
      y,
      !1
    ), j > 0) {
      if (j & 16)
        le($, z, M, m, x);
      else if (j & 2 && z.class !== M.class && n($, "class", null, M.class, x), j & 4 && n($, "style", z.style, M.style, x), j & 8) {
        const J = p.dynamicProps;
        for (let re = 0; re < J.length; re++) {
          const Z = J[re], Oe = z[Z], Ae = M[Z];
          (Ae !== Oe || Z === "value") && n($, Z, Oe, Ae, x, m);
        }
      }
      j & 1 && f.children !== p.children && u($, p.children);
    } else !A && C == null && le($, z, M, m, x);
    ((K = M.onVnodeUpdated) || D) && ze(() => {
      K && Ue(K, m, p, f), D && wt(p, f, m, "updated");
    }, S);
  }, X = (f, p, m, S, x, y, A) => {
    for (let $ = 0; $ < p.length; $++) {
      const j = f[$], C = p[$], D = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        j.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (j.type === ne || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Yt(j, C) || // - In the case of a component, it could contain anything.
        j.shapeFlag & 198) ? d(j.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      k(
        j,
        C,
        D,
        null,
        S,
        x,
        y,
        A,
        !0
      );
    }
  }, le = (f, p, m, S, x) => {
    if (p !== m) {
      if (p !== te)
        for (const y in p)
          !Zt(y) && !(y in m) && n(
            f,
            y,
            p[y],
            null,
            x,
            S
          );
      for (const y in m) {
        if (Zt(y)) continue;
        const A = m[y], $ = p[y];
        A !== $ && y !== "value" && n(f, y, $, A, x, S);
      }
      "value" in m && n(f, "value", p.value, m.value, x);
    }
  }, de = (f, p, m, S, x, y, A, $, j) => {
    const C = p.el = f ? f.el : i(""), D = p.anchor = f ? f.anchor : i("");
    let { patchFlag: z, dynamicChildren: M, slotScopeIds: K } = p;
    K && ($ = $ ? $.concat(K) : K), f == null ? (o(C, m, S), o(D, m, S), V(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      m,
      D,
      x,
      y,
      A,
      $,
      j
    )) : z > 0 && z & 64 && M && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren ? (X(
      f.dynamicChildren,
      M,
      m,
      x,
      y,
      A,
      $
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || x && p === x.subTree) && Yn(
      f,
      p,
      !0
      /* shallow */
    )) : U(
      f,
      p,
      m,
      D,
      x,
      y,
      A,
      $,
      j
    );
  }, he = (f, p, m, S, x, y, A, $, j) => {
    p.slotScopeIds = $, f == null ? p.shapeFlag & 512 ? x.ctx.activate(
      p,
      m,
      S,
      A,
      j
    ) : je(
      p,
      m,
      S,
      x,
      y,
      A,
      j
    ) : Le(f, p, j);
  }, je = (f, p, m, S, x, y, A) => {
    const $ = f.component = xl(
      f,
      S,
      x
    );
    if (Rn(f) && ($.ctx.renderer = kt), vl($, !1, A), $.asyncDep) {
      if (x && x.registerDep($, ee, A), !f.el) {
        const j = $.subTree = Ke(vt);
        v(null, j, p, m), f.placeholder = j.el;
      }
    } else
      ee(
        $,
        f,
        p,
        m,
        x,
        y,
        A
      );
  }, Le = (f, p, m) => {
    const S = p.component = f.component;
    if (cl(f, p, m))
      if (S.asyncDep && !S.asyncResolved) {
        W(S, p, m);
        return;
      } else
        S.next = p, S.update();
    else
      p.el = f.el, S.vnode = p;
  }, ee = (f, p, m, S, x, y, A) => {
    const $ = () => {
      if (f.isMounted) {
        let { next: z, bu: M, u: K, parent: J, vnode: re } = f;
        {
          const He = Xn(f);
          if (He) {
            z && (z.el = re.el, W(f, z, A)), He.asyncDep.then(() => {
              f.isUnmounted || $();
            });
            return;
          }
        }
        let Z = z, Oe;
        _t(f, !1), z ? (z.el = re.el, W(f, z, A)) : z = re, M && Pr(M), (Oe = z.props && z.props.onVnodeBeforeUpdate) && Ue(Oe, J, z, re), _t(f, !0);
        const Ae = hs(f), We = f.subTree;
        f.subTree = Ae, k(
          We,
          Ae,
          // parent may have changed if it's in a teleport
          d(We.el),
          // anchor may have changed if it's in a fragment
          Et(We),
          f,
          x,
          y
        ), z.el = Ae.el, Z === null && ul(f, Ae.el), K && ze(K, x), (Oe = z.props && z.props.onVnodeUpdated) && ze(
          () => Ue(Oe, J, z, re),
          x
        );
      } else {
        let z;
        const { el: M, props: K } = p, { bm: J, m: re, parent: Z, root: Oe, type: Ae } = f, We = or(p);
        _t(f, !1), J && Pr(J), !We && (z = K && K.onVnodeBeforeMount) && Ue(z, Z, p), _t(f, !0);
        {
          Oe.ce && // @ts-expect-error _def is private
          Oe.ce._def.shadowRoot !== !1 && Oe.ce._injectChildStyle(Ae);
          const He = f.subTree = hs(f);
          k(
            null,
            He,
            m,
            S,
            f,
            x,
            y
          ), p.el = He.el;
        }
        if (re && ze(re, x), !We && (z = K && K.onVnodeMounted)) {
          const He = p;
          ze(
            () => Ue(z, Z, He),
            x
          );
        }
        (p.shapeFlag & 256 || Z && or(Z.vnode) && Z.vnode.shapeFlag & 256) && f.a && ze(f.a, x), f.isMounted = !0, p = m = S = null;
      }
    };
    f.scope.on();
    const j = f.effect = new bn($);
    f.scope.off();
    const C = f.update = j.run.bind(j), D = f.job = j.runIfDirty.bind(j);
    D.i = f, D.id = f.uid, j.scheduler = () => Uo(D), _t(f, !0), C();
  }, W = (f, p, m) => {
    p.component = f;
    const S = f.vnode.props;
    f.vnode = p, f.next = null, Ji(f, p.props, S, m), Yi(f, p.children, m), it(), ls(f), lt();
  }, U = (f, p, m, S, x, y, A, $, j = !1) => {
    const C = f && f.children, D = f ? f.shapeFlag : 0, z = p.children, { patchFlag: M, shapeFlag: K } = p;
    if (M > 0) {
      if (M & 128) {
        Pe(
          C,
          z,
          m,
          S,
          x,
          y,
          A,
          $,
          j
        );
        return;
      } else if (M & 256) {
        $e(
          C,
          z,
          m,
          S,
          x,
          y,
          A,
          $,
          j
        );
        return;
      }
    }
    K & 8 ? (D & 16 && dt(C, x, y), z !== C && u(m, z)) : D & 16 ? K & 16 ? Pe(
      C,
      z,
      m,
      S,
      x,
      y,
      A,
      $,
      j
    ) : dt(C, x, y, !0) : (D & 8 && u(m, ""), K & 16 && V(
      z,
      m,
      S,
      x,
      y,
      A,
      $,
      j
    ));
  }, $e = (f, p, m, S, x, y, A, $, j) => {
    f = f || Ft, p = p || Ft;
    const C = f.length, D = p.length, z = Math.min(C, D);
    let M;
    for (M = 0; M < z; M++) {
      const K = p[M] = j ? bt(p[M]) : qe(p[M]);
      k(
        f[M],
        K,
        m,
        null,
        x,
        y,
        A,
        $,
        j
      );
    }
    C > D ? dt(
      f,
      x,
      y,
      !0,
      !1,
      z
    ) : V(
      p,
      m,
      S,
      x,
      y,
      A,
      $,
      j,
      z
    );
  }, Pe = (f, p, m, S, x, y, A, $, j) => {
    let C = 0;
    const D = p.length;
    let z = f.length - 1, M = D - 1;
    for (; C <= z && C <= M; ) {
      const K = f[C], J = p[C] = j ? bt(p[C]) : qe(p[C]);
      if (Yt(K, J))
        k(
          K,
          J,
          m,
          null,
          x,
          y,
          A,
          $,
          j
        );
      else
        break;
      C++;
    }
    for (; C <= z && C <= M; ) {
      const K = f[z], J = p[M] = j ? bt(p[M]) : qe(p[M]);
      if (Yt(K, J))
        k(
          K,
          J,
          m,
          null,
          x,
          y,
          A,
          $,
          j
        );
      else
        break;
      z--, M--;
    }
    if (C > z) {
      if (C <= M) {
        const K = M + 1, J = K < D ? p[K].el : S;
        for (; C <= M; )
          k(
            null,
            p[C] = j ? bt(p[C]) : qe(p[C]),
            m,
            J,
            x,
            y,
            A,
            $,
            j
          ), C++;
      }
    } else if (C > M)
      for (; C <= z; )
        pe(f[C], x, y, !0), C++;
    else {
      const K = C, J = C, re = /* @__PURE__ */ new Map();
      for (C = J; C <= M; C++) {
        const Ie = p[C] = j ? bt(p[C]) : qe(p[C]);
        Ie.key != null && re.set(Ie.key, C);
      }
      let Z, Oe = 0;
      const Ae = M - J + 1;
      let We = !1, He = 0;
      const Gt = new Array(Ae);
      for (C = 0; C < Ae; C++) Gt[C] = 0;
      for (C = K; C <= z; C++) {
        const Ie = f[C];
        if (Oe >= Ae) {
          pe(Ie, x, y, !0);
          continue;
        }
        let Je;
        if (Ie.key != null)
          Je = re.get(Ie.key);
        else
          for (Z = J; Z <= M; Z++)
            if (Gt[Z - J] === 0 && Yt(Ie, p[Z])) {
              Je = Z;
              break;
            }
        Je === void 0 ? pe(Ie, x, y, !0) : (Gt[Je - J] = C + 1, Je >= He ? He = Je : We = !0, k(
          Ie,
          p[Je],
          m,
          null,
          x,
          y,
          A,
          $,
          j
        ), Oe++);
      }
      const ts = We ? el(Gt) : Ft;
      for (Z = ts.length - 1, C = Ae - 1; C >= 0; C--) {
        const Ie = J + C, Je = p[Ie], rs = p[Ie + 1], os = Ie + 1 < D ? (
          // #13559, fallback to el placeholder for unresolved async component
          rs.el || rs.placeholder
        ) : S;
        Gt[C] === 0 ? k(
          null,
          Je,
          m,
          os,
          x,
          y,
          A,
          $,
          j
        ) : We && (Z < 0 || C !== ts[Z] ? fe(Je, m, os, 2) : Z--);
      }
    }
  }, fe = (f, p, m, S, x = null) => {
    const { el: y, type: A, transition: $, children: j, shapeFlag: C } = f;
    if (C & 6) {
      fe(f.component.subTree, p, m, S);
      return;
    }
    if (C & 128) {
      f.suspense.move(p, m, S);
      return;
    }
    if (C & 64) {
      A.move(f, p, m, kt);
      return;
    }
    if (A === ne) {
      o(y, p, m);
      for (let z = 0; z < j.length; z++)
        fe(j[z], p, m, S);
      o(f.anchor, p, m);
      return;
    }
    if (A === po) {
      L(f, p, m);
      return;
    }
    if (S !== 2 && C & 1 && $)
      if (S === 0)
        $.beforeEnter(y), o(y, p, m), ze(() => $.enter(y), x);
      else {
        const { leave: z, delayLeave: M, afterLeave: K } = $, J = () => {
          f.ctx.isUnmounted ? s(y) : o(y, p, m);
        }, re = () => {
          y._isLeaving && y[wi](
            !0
            /* cancelled */
          ), z(y, () => {
            J(), K && K();
          });
        };
        M ? M(y, J, re) : re();
      }
    else
      o(y, p, m);
  }, pe = (f, p, m, S = !1, x = !1) => {
    const {
      type: y,
      props: A,
      ref: $,
      children: j,
      dynamicChildren: C,
      shapeFlag: D,
      patchFlag: z,
      dirs: M,
      cacheIndex: K
    } = f;
    if (z === -2 && (x = !1), $ != null && (it(), rr($, null, m, f, !0), lt()), K != null && (p.renderCache[K] = void 0), D & 256) {
      p.ctx.deactivate(f);
      return;
    }
    const J = D & 1 && M, re = !or(f);
    let Z;
    if (re && (Z = A && A.onVnodeBeforeUnmount) && Ue(Z, p, f), D & 6)
      kr(f.component, m, S);
    else {
      if (D & 128) {
        f.suspense.unmount(m, S);
        return;
      }
      J && wt(f, null, p, "beforeUnmount"), D & 64 ? f.type.remove(
        f,
        p,
        m,
        kt,
        S
      ) : C && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !C.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (y !== ne || z > 0 && z & 64) ? dt(
        C,
        p,
        m,
        !1,
        !0
      ) : (y === ne && z & 384 || !x && D & 16) && dt(j, p, m), S && yt(f);
    }
    (re && (Z = A && A.onVnodeUnmounted) || J) && ze(() => {
      Z && Ue(Z, p, f), J && wt(f, null, p, "unmounted");
    }, m);
  }, yt = (f) => {
    const { type: p, el: m, anchor: S, transition: x } = f;
    if (p === ne) {
      ut(m, S);
      return;
    }
    if (p === po) {
      E(f);
      return;
    }
    const y = () => {
      s(m), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (f.shapeFlag & 1 && x && !x.persisted) {
      const { leave: A, delayLeave: $ } = x, j = () => A(m, y);
      $ ? $(f.el, y, j) : j();
    } else
      y();
  }, ut = (f, p) => {
    let m;
    for (; f !== p; )
      m = h(f), s(f), f = m;
    s(p);
  }, kr = (f, p, m) => {
    const { bum: S, scope: x, job: y, subTree: A, um: $, m: j, a: C } = f;
    gs(j), gs(C), S && Pr(S), x.stop(), y && (y.flags |= 8, pe(A, f, p, m)), $ && ze($, p), ze(() => {
      f.isUnmounted = !0;
    }, p);
  }, dt = (f, p, m, S = !1, x = !1, y = 0) => {
    for (let A = y; A < f.length; A++)
      pe(f[A], p, m, S, x);
  }, Et = (f) => {
    if (f.shapeFlag & 6)
      return Et(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const p = h(f.anchor || f.el), m = p && p[yi];
    return m ? h(m) : p;
  };
  let Ut = !1;
  const wr = (f, p, m) => {
    f == null ? p._vnode && pe(p._vnode, null, null, !0) : k(
      p._vnode || null,
      f,
      p,
      null,
      null,
      null,
      m
    ), p._vnode = f, Ut || (Ut = !0, ls(), An(), Ut = !1);
  }, kt = {
    p: k,
    um: pe,
    m: fe,
    r: yt,
    mt: je,
    mc: V,
    pc: U,
    pbc: X,
    n: Et,
    o: e
  };
  return {
    render: wr,
    hydrate: void 0,
    createApp: Bi(wr)
  };
}
function fo({ type: e, props: t }, r) {
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
  if (B(o) && B(s))
    for (let n = 0; n < o.length; n++) {
      const a = o[n];
      let i = s[n];
      i.shapeFlag & 1 && !i.dynamicChildren && ((i.patchFlag <= 0 || i.patchFlag === 32) && (i = s[n] = bt(s[n]), i.el = a.el), !r && i.patchFlag !== -2 && Yn(a, i)), i.type === ro && // avoid cached text nodes retaining detached dom nodes
      i.patchFlag !== -1 && (i.el = a.el), i.type === vt && !i.el && (i.el = a.el);
    }
}
function el(e) {
  const t = e.slice(), r = [0];
  let o, s, n, a, i;
  const l = e.length;
  for (o = 0; o < l; o++) {
    const c = e[o];
    if (c !== 0) {
      if (s = r[r.length - 1], e[s] < c) {
        t[o] = s, r.push(o);
        continue;
      }
      for (n = 0, a = r.length - 1; n < a; )
        i = n + a >> 1, e[r[i]] < c ? n = i + 1 : a = i;
      c < e[r[n]] && (n > 0 && (t[o] = r[n - 1]), r[n] = o);
    }
  }
  for (n = r.length, a = r[n - 1]; n-- > 0; )
    r[n] = a, a = t[a];
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
const tl = Symbol.for("v-scx"), rl = () => nr(tl);
function Ye(e, t, r) {
  return Qn(e, t, r);
}
function Qn(e, t, r = te) {
  const { immediate: o, deep: s, flush: n, once: a } = r, i = we({}, r), l = t && o || !t && n !== "post";
  let c;
  if (br) {
    if (n === "sync") {
      const g = rl();
      c = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!l) {
      const g = () => {
      };
      return g.stop = Xe, g.resume = Xe, g.pause = Xe, g;
    }
  }
  const u = Te;
  i.call = (g, w, k) => Ze(g, u, w, k);
  let d = !1;
  n === "post" ? i.scheduler = (g) => {
    ze(g, u && u.suspense);
  } : n !== "sync" && (d = !0, i.scheduler = (g, w) => {
    w ? g() : Uo(g);
  }), i.augmentJob = (g) => {
    t && (g.flags |= 4), d && (g.flags |= 2, u && (g.id = u.uid, g.i = u));
  };
  const h = gi(e, t, i);
  return br && (c ? c.push(h) : l && h()), h;
}
function ol(e, t, r) {
  const o = this.proxy, s = ue(e) ? e.includes(".") ? Zn(o, e) : () => o[e] : e.bind(o, o);
  let n;
  H(t) ? n = t : (n = t.handler, r = t);
  const a = yr(this), i = Qn(s, n.bind(o), r);
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
const sl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${mt(t)}Modifiers`] || e[`${At(t)}Modifiers`];
function nl(e, t, ...r) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || te;
  let s = r;
  const n = t.startsWith("update:"), a = n && sl(o, t.slice(7));
  a && (a.trim && (s = r.map((u) => ue(u) ? u.trim() : u)), a.number && (s = r.map(yo)));
  let i, l = o[i = no(t)] || // also try camelCase event handler (#2249)
  o[i = no(mt(t))];
  !l && n && (l = o[i = no(At(t))]), l && Ze(
    l,
    e,
    6,
    s
  );
  const c = o[i + "Once"];
  if (c) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[i])
      return;
    e.emitted[i] = !0, Ze(
      c,
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
  if (!H(e)) {
    const l = (c) => {
      const u = ea(c, t, !0);
      u && (i = !0, we(a, u));
    };
    !r && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !n && !i ? (se(e) && o.set(e, null), null) : (B(n) ? n.forEach((l) => a[l] = null) : we(a, n), se(e) && o.set(e, a), a);
}
function to(e, t) {
  return !e || !Jr(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Q(e, t[0].toLowerCase() + t.slice(1)) || Q(e, At(t)) || Q(e, t));
}
function hs(e) {
  const {
    type: t,
    vnode: r,
    proxy: o,
    withProxy: s,
    propsOptions: [n],
    slots: a,
    attrs: i,
    emit: l,
    render: c,
    renderCache: u,
    props: d,
    data: h,
    setupState: g,
    ctx: w,
    inheritAttrs: k
  } = e, _ = Mr(e);
  let v, T;
  try {
    if (r.shapeFlag & 4) {
      const E = s || o, F = E;
      v = qe(
        c.call(
          F,
          E,
          u,
          d,
          g,
          h,
          w
        )
      ), T = i;
    } else {
      const E = t;
      v = qe(
        E.length > 1 ? E(
          d,
          { attrs: i, slots: a, emit: l }
        ) : E(
          d,
          null
        )
      ), T = t.props ? i : il(i);
    }
  } catch (E) {
    ar.length = 0, Zr(E, e, 1), v = Ke(vt);
  }
  let L = v;
  if (T && k !== !1) {
    const E = Object.keys(T), { shapeFlag: F } = L;
    E.length && F & 7 && (n && E.some(Ro) && (T = ll(
      T,
      n
    )), L = Kt(L, T, !1, !0));
  }
  return r.dirs && (L = Kt(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(r.dirs) : r.dirs), r.transition && Go(L, r.transition), v = L, Mr(_), v;
}
const il = (e) => {
  let t;
  for (const r in e)
    (r === "class" || r === "style" || Jr(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, ll = (e, t) => {
  const r = {};
  for (const o in e)
    (!Ro(o) || !(o.slice(9) in t)) && (r[o] = e[o]);
  return r;
};
function cl(e, t, r) {
  const { props: o, children: s, component: n } = e, { props: a, children: i, patchFlag: l } = t, c = n.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (r && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return o ? ms(o, a, c) : !!a;
    if (l & 8) {
      const u = t.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        const h = u[d];
        if (a[h] !== o[h] && !to(c, h))
          return !0;
      }
    }
  } else
    return (s || i) && (!i || !i.$stable) ? !0 : o === a ? !1 : o ? a ? ms(o, a, c) : !0 : !!a;
  return !1;
}
function ms(e, t, r) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const n = o[s];
    if (t[n] !== e[n] && !to(r, n))
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
  t && t.pendingBranch ? B(e) ? t.effects.push(...e) : t.effects.push(e) : xi(e);
}
const ne = Symbol.for("v-fgt"), ro = Symbol.for("v-txt"), vt = Symbol.for("v-cmt"), po = Symbol.for("v-stc"), ar = [];
let Re = null;
function O(e = !1) {
  ar.push(Re = e ? null : []);
}
function fl() {
  ar.pop(), Re = ar[ar.length - 1] || null;
}
let pr = 1;
function xs(e, t = !1) {
  pr += e, e < 0 && Re && t && (Re.hasOnce = !0);
}
function ra(e) {
  return e.dynamicChildren = pr > 0 ? Re || Ft : null, fl(), pr > 0 && Re && Re.push(e), e;
}
function I(e, t, r, o, s, n) {
  return ra(
    b(
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
function Or(e, t, r, o, s) {
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
function Yt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const sa = ({ key: e }) => e ?? null, Ar = ({
  ref: e,
  ref_key: t,
  ref_for: r
}) => (typeof e == "number" && (e = "" + e), e != null ? ue(e) || ce(e) || H(e) ? { i: Ne, r: e, k: t, f: !!r } : e : null);
function b(e, t = null, r = null, o = 0, s = null, n = e === ne ? 0 : 1, a = !1, i = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && sa(t),
    ref: t && Ar(t),
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
    ctx: Ne
  };
  return i ? (Xo(l, r), n & 128 && e.normalize(l)) : r && (l.shapeFlag |= ue(r) ? 8 : 16), pr > 0 && // avoid a block node from tracking itself
  !a && // has current parent block
  Re && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || n & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Re.push(l), l;
}
const Ke = pl;
function pl(e, t = null, r = null, o = 0, s = null, n = !1) {
  if ((!e || e === zi) && (e = vt), oa(e)) {
    const i = Kt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return r && Xo(i, r), pr > 0 && !n && Re && (i.shapeFlag & 6 ? Re[Re.indexOf(e)] = i : Re.push(i)), i.patchFlag = -2, i;
  }
  if (_l(e) && (e = e.__vccOpts), t) {
    t = bl(t);
    let { class: i, style: l } = t;
    i && !ue(i) && (t.class = ye(i)), se(l) && (Wo(l) && !B(l) && (l = we({}, l)), t.style = Yr(l));
  }
  const a = ue(e) ? 1 : ta(e) ? 128 : ki(e) ? 64 : se(e) ? 4 : H(e) ? 2 : 0;
  return b(
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
  return e ? Wo(e) || Wn(e) ? we({}, e) : e : null;
}
function Kt(e, t, r = !1, o = !1) {
  const { props: s, ref: n, patchFlag: a, children: i, transition: l } = e, c = t ? gl(s || {}, t) : s, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && sa(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && n ? B(n) ? n.concat(Ar(t)) : [n, Ar(t)] : Ar(t)
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
    ssContent: e.ssContent && Kt(e.ssContent),
    ssFallback: e.ssFallback && Kt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && o && Go(
    u,
    l.clone(u)
  ), u;
}
function be(e = " ", t = 0) {
  return Ke(ro, null, e, t);
}
function R(e = "", t = !1) {
  return t ? (O(), Or(vt, null, e)) : Ke(vt, null, e);
}
function qe(e) {
  return e == null || typeof e == "boolean" ? Ke(vt) : B(e) ? Ke(
    ne,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : oa(e) ? bt(e) : Ke(ro, null, String(e));
}
function bt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Kt(e);
}
function Xo(e, t) {
  let r = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (B(t))
    r = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Xo(e, s()), s._c && (s._d = !0));
      return;
    } else {
      r = 32;
      const s = t._;
      !s && !Wn(t) ? t._ctx = Ne : s === 3 && Ne && (Ne.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else H(t) ? (t = { default: t, _ctx: Ne }, r = 32) : (t = String(t), o & 64 ? (r = 16, t = [be(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function gl(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = ye([t.class, o.class]));
      else if (s === "style")
        t.style = Yr([t.style, o.style]);
      else if (Jr(s)) {
        const n = t[s], a = o[s];
        a && n !== a && !(B(n) && n.includes(a)) && (t[s] = n ? [].concat(n, a) : a);
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
let Te = null;
const Qo = () => Te || Ne;
let Vr, $o;
{
  const e = qr(), t = (r, o) => {
    let s;
    return (s = e[r]) || (s = e[r] = []), s.push(o), (n) => {
      s.length > 1 ? s.forEach((a) => a(n)) : s[0](n);
    };
  };
  Vr = t(
    "__VUE_INSTANCE_SETTERS__",
    (r) => Te = r
  ), $o = t(
    "__VUE_SSR_SETTERS__",
    (r) => br = r
  );
}
const yr = (e) => {
  const t = Te;
  return Vr(e), e.scope.on(), () => {
    e.scope.off(), Vr(t);
  };
}, vs = () => {
  Te && Te.scope.off(), Vr(null);
};
function na(e) {
  return e.vnode.shapeFlag & 4;
}
let br = !1;
function vl(e, t = !1, r = !1) {
  t && $o(t);
  const { props: o, children: s } = e.vnode, n = na(e);
  Hi(e, o, n, t), qi(e, s, r || t);
  const a = n ? yl(e, t) : void 0;
  return t && $o(!1), a;
}
function yl(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ri);
  const { setup: o } = r;
  if (o) {
    it();
    const s = e.setupContext = o.length > 1 ? wl(e) : null, n = yr(e), a = vr(
      o,
      e,
      0,
      [
        e.props,
        s
      ]
    ), i = tn(a);
    if (lt(), n(), (i || e.sp) && !or(e) && zn(e), i) {
      if (a.then(vs, vs), t)
        return a.then((l) => {
          ys(e, l);
        }).catch((l) => {
          Zr(l, e, 0);
        });
      e.asyncDep = a;
    } else
      ys(e, a);
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
    return ke(e, "get", ""), e[t];
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
function oo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy($n(Ho(e.exposed)), {
    get(t, r) {
      if (r in t)
        return t[r];
      if (r in sr)
        return sr[r](e);
    },
    has(t, r) {
      return r in t || r in sr;
    }
  })) : e.proxy;
}
function _l(e) {
  return H(e) && "__vccOpts" in e;
}
const Ee = (e, t) => pi(e, t, br), Sl = "3.5.22";
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
const ia = Po ? (e) => Po.createHTML(e) : (e) => e, Cl = "http://www.w3.org/2000/svg", Tl = "http://www.w3.org/1998/Math/MathML", rt = typeof document < "u" ? document : null, ws = rt && /* @__PURE__ */ rt.createElement("template"), jl = {
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
      ws.innerHTML = ia(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const i = ws.content;
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
}, $l = Symbol("_vtc");
function Pl(e, t, r) {
  const o = e[$l];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const Br = Symbol("_vod"), la = Symbol("_vsh"), _s = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: r }) {
    e[Br] = e.style.display === "none" ? "" : e.style.display, r && t ? r.beforeEnter(e) : Xt(e, t);
  },
  mounted(e, { value: t }, { transition: r }) {
    r && t && r.enter(e);
  },
  updated(e, { value: t, oldValue: r }, { transition: o }) {
    !t != !r && (o ? t ? (o.beforeEnter(e), Xt(e, !0), o.enter(e)) : o.leave(e, () => {
      Xt(e, !1);
    }) : Xt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Xt(e, t);
  }
};
function Xt(e, t) {
  e.style.display = t ? e[Br] : "none", e[la] = !t;
}
const Ol = Symbol(""), Al = /(?:^|;)\s*display\s*:/;
function El(e, t, r) {
  const o = e.style, s = ue(r);
  let n = !1;
  if (r && !s) {
    if (t)
      if (ue(t))
        for (const a of t.split(";")) {
          const i = a.slice(0, a.indexOf(":")).trim();
          r[i] == null && Er(o, i, "");
        }
      else
        for (const a in t)
          r[a] == null && Er(o, a, "");
    for (const a in r)
      a === "display" && (n = !0), Er(o, a, r[a]);
  } else if (s) {
    if (t !== r) {
      const a = o[Ol];
      a && (r += ";" + a), o.cssText = r, n = Al.test(r);
    }
  } else t && e.removeAttribute("style");
  Br in e && (e[Br] = n ? o.display : "", e[la] && (o.display = "none"));
}
const Ss = /\s*!important$/;
function Er(e, t, r) {
  if (B(r))
    r.forEach((o) => Er(e, t, o));
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
const Cs = ["Webkit", "Moz", "ms"], bo = {};
function Il(e, t) {
  const r = bo[t];
  if (r)
    return r;
  let o = mt(t);
  if (o !== "filter" && o in e)
    return bo[t] = o;
  o = sn(o);
  for (let s = 0; s < Cs.length; s++) {
    const n = Cs[s] + o;
    if (n in e)
      return bo[t] = n;
  }
  return t;
}
const Ts = "http://www.w3.org/1999/xlink";
function js(e, t, r, o, s, n = Na(t)) {
  o && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(Ts, t.slice(6, t.length)) : e.setAttributeNS(Ts, t, r) : r == null || n && !an(r) ? e.removeAttribute(t) : e.setAttribute(
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
function Rl(e, t, r, o, s = null) {
  const n = e[Ps] || (e[Ps] = {}), a = n[t];
  if (o && a)
    a.value = o;
  else {
    const [i, l] = Ll(t);
    if (o) {
      const c = n[t] = Fl(
        o,
        s
      );
      Tt(e, i, c, l);
    } else a && (zl(e, i, a, l), n[t] = void 0);
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
let go = 0;
const Nl = /* @__PURE__ */ Promise.resolve(), Ml = () => go || (Nl.then(() => go = 0), go = Date.now());
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
  if (B(t)) {
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
  t === "class" ? Pl(e, o, a) : t === "style" ? El(e, r, o) : Jr(t) ? Ro(t) || Rl(e, t, r, o, n) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Bl(e, t, o, a)) ? ($s(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && js(e, t, o, a, n, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ue(o)) ? $s(e, mt(t), o, n, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), js(e, t, o, a));
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
  return As(t) && ue(r) ? !1 : t in e;
}
const Kr = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return B(t) ? (r) => Pr(t, r) : t;
};
function Kl(e) {
  e.target.composing = !0;
}
function Es(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Bt = Symbol("_assign"), Tr = {
  created(e, { modifiers: { lazy: t, trim: r, number: o } }, s) {
    e[Bt] = Kr(s);
    const n = o || s.props && s.props.type === "number";
    Tt(e, t ? "change" : "input", (a) => {
      if (a.target.composing) return;
      let i = e.value;
      r && (i = i.trim()), n && (i = yo(i)), e[Bt](i);
    }), r && Tt(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Tt(e, "compositionstart", Kl), Tt(e, "compositionend", Es), Tt(e, "change", Es));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: r, modifiers: { lazy: o, trim: s, number: n } }, a) {
    if (e[Bt] = Kr(a), e.composing) return;
    const i = (n || e.type === "number") && !/^0\d/.test(e.value) ? yo(e.value) : e.value, l = t ?? "";
    i !== l && (document.activeElement === e && e.type !== "range" && (o && t === r || s && e.value.trim() === l) || (e.value = l));
  }
}, Wl = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, r) {
    e[Bt] = Kr(r), Tt(e, "change", () => {
      const o = e._modelValue, s = Hl(e), n = e.checked, a = e[Bt];
      if (B(o)) {
        const i = ln(o, s), l = i !== -1;
        if (n && !l)
          a(o.concat(s));
        else if (!n && l) {
          const c = [...o];
          c.splice(i, 1), a(c);
        }
      } else if (Ur(o)) {
        const i = new Set(o);
        n ? i.add(s) : i.delete(s), a(i);
      } else
        a(ca(e, n));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Is,
  beforeUpdate(e, t, r) {
    e[Bt] = Kr(r), Is(e, t, r);
  }
};
function Is(e, { value: t, oldValue: r }, o) {
  e._modelValue = t;
  let s;
  if (B(t))
    s = ln(t, o.props.value) > -1;
  else if (Ur(t))
    s = t.has(o.props.value);
  else {
    if (t === r) return;
    s = Xr(t, ca(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
function Hl(e) {
  return "_value" in e ? e._value : e.value;
}
function ca(e, t) {
  const r = t ? "_trueValue" : "_falseValue";
  return r in e ? e[r] : t;
}
const Jl = /* @__PURE__ */ we({ patchProp: Vl }, jl);
let zs;
function Ul() {
  return zs || (zs = Xi(Jl));
}
const Gl = (...e) => {
  const t = Ul().createApp(...e), { mount: r } = t;
  return t.mount = (o) => {
    const s = Yl(o);
    if (!s) return;
    const n = t._component;
    !H(n) && !n.render && !n.template && (n.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const a = r(s, !1, ql(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), a;
  }, t;
};
function ql(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Yl(e) {
  return ue(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v3.0.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let ua;
const so = (e) => ua = e, da = (
  /* istanbul ignore next */
  Symbol()
);
function Oo(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ir;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ir || (ir = {}));
function Xl() {
  const e = fn(!0), t = e.run(() => ae({}));
  let r = [], o = [];
  const s = Ho({
    install(n) {
      so(s), s._a = n, n.provide(da, s), n.config.globalProperties.$pinia = s, o.forEach((a) => r.push(a)), o = [];
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
const Ql = (e) => e(), Ls = Symbol(), ho = Symbol();
function Ao(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((r, o) => e.set(o, r)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const r in t) {
    if (!t.hasOwnProperty(r))
      continue;
    const o = t[r], s = e[r];
    Oo(s) && Oo(o) && e.hasOwnProperty(r) && !ce(o) && !ht(o) ? e[r] = Ao(s, o) : e[r] = o;
  }
  return e;
}
const Zl = (
  /* istanbul ignore next */
  Symbol()
);
function ec(e) {
  return !Oo(e) || !Object.prototype.hasOwnProperty.call(e, Zl);
}
const { assign: ft } = Object;
function tc(e) {
  return !!(ce(e) && e.effect);
}
function rc(e, t, r, o) {
  const { state: s, actions: n, getters: a } = t, i = r.state.value[e];
  let l;
  function c() {
    i || (r.state.value[e] = s ? s() : {});
    const u = ci(r.state.value[e]);
    return ft(u, n, Object.keys(a || {}).reduce((d, h) => (d[h] = Ho(Ee(() => {
      so(r);
      const g = r._s.get(e);
      return a[h].call(g, g);
    })), d), {}));
  }
  return l = pa(e, c, t, r, o, !0), l;
}
function pa(e, t, r = {}, o, s, n) {
  let a;
  const i = ft({ actions: {} }, r), l = { deep: !0 };
  let c, u, d = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set(), g;
  const w = o.state.value[e];
  !n && !w && (o.state.value[e] = {}), ae({});
  let k;
  function _(V) {
    let N;
    c = u = !1, typeof V == "function" ? (V(o.state.value[e]), N = {
      type: ir.patchFunction,
      storeId: e,
      events: g
    }) : (Ao(o.state.value[e], V), N = {
      type: ir.patchObject,
      payload: V,
      storeId: e,
      events: g
    });
    const X = k = Symbol();
    Jo().then(() => {
      k === X && (c = !0);
    }), u = !0, zt(d, N, o.state.value[e]);
  }
  const v = n ? function() {
    const { state: N } = r, X = N ? N() : {};
    this.$patch((le) => {
      ft(le, X);
    });
  } : (
    /* istanbul ignore next */
    fa
  );
  function T() {
    a.stop(), d.clear(), h.clear(), o._s.delete(e);
  }
  const L = (V, N = "") => {
    if (Ls in V)
      return V[ho] = N, V;
    const X = function() {
      so(o);
      const le = Array.from(arguments), de = /* @__PURE__ */ new Set(), he = /* @__PURE__ */ new Set();
      function je(W) {
        de.add(W);
      }
      function Le(W) {
        he.add(W);
      }
      zt(h, {
        args: le,
        name: X[ho],
        store: F,
        after: je,
        onError: Le
      });
      let ee;
      try {
        ee = V.apply(this && this.$id === e ? this : F, le);
      } catch (W) {
        throw zt(he, W), W;
      }
      return ee instanceof Promise ? ee.then((W) => (zt(de, W), W)).catch((W) => (zt(he, W), Promise.reject(W))) : (zt(de, ee), ee);
    };
    return X[Ls] = !0, X[ho] = N, X;
  }, E = {
    _p: o,
    // _s: scope,
    $id: e,
    $onAction: Rs.bind(null, h),
    $patch: _,
    $reset: v,
    $subscribe(V, N = {}) {
      const X = Rs(d, V, N.detached, () => le()), le = a.run(() => Ye(() => o.state.value[e], (de) => {
        (N.flush === "sync" ? u : c) && V({
          storeId: e,
          type: ir.direct,
          events: g
        }, de);
      }, ft({}, l, N)));
      return X;
    },
    $dispose: T
  }, F = Ht(E);
  o._s.set(e, F);
  const q = (o._a && o._a.runWithContext || Ql)(() => o._e.run(() => (a = fn()).run(() => t({ action: L }))));
  for (const V in q) {
    const N = q[V];
    if (ce(N) && !tc(N) || ht(N))
      n || (w && ec(N) && (ce(N) ? N.value = w[V] : Ao(N, w[V])), o.state.value[e][V] = N);
    else if (typeof N == "function") {
      const X = L(N, V);
      q[V] = X, i.actions[V] = N;
    }
  }
  return ft(F, q), ft(G(F), q), Object.defineProperty(F, "$state", {
    get: () => o.state.value[e],
    set: (V) => {
      _((N) => {
        ft(N, V);
      });
    }
  }), o._p.forEach((V) => {
    ft(F, a.run(() => V({
      store: F,
      app: o._a,
      pinia: o,
      options: i
    })));
  }), w && n && r.hydrate && r.hydrate(F.$state, w), c = !0, u = !0, F;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ba(e, t, r) {
  let o;
  const s = typeof t == "function";
  o = s ? r : t;
  function n(a, i) {
    const l = Wi();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (l ? nr(da, null) : null), a && so(a), a = ua, a._s.has(e) || (s ? pa(e, t, o, a) : rc(e, o, a)), a._s.get(e);
  }
  return n.$id = e, n;
}
var oc = Object.defineProperty, Ns = Object.getOwnPropertySymbols, sc = Object.prototype.hasOwnProperty, nc = Object.prototype.propertyIsEnumerable, Ms = (e, t, r) => t in e ? oc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ac = (e, t) => {
  for (var r in t || (t = {}))
    sc.call(t, r) && Ms(e, r, t[r]);
  if (Ns)
    for (var r of Ns(t))
      nc.call(t, r) && Ms(e, r, t[r]);
  return e;
};
function Zo(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
function ic(e) {
  return !!(e && e.constructor && e.call && e.apply);
}
function ie(e) {
  return !Zo(e);
}
function Ot(e, t = !0) {
  return e instanceof Object && e.constructor === Object && (t || Object.keys(e).length !== 0);
}
function jt(e, ...t) {
  return ic(e) ? e(...t) : e;
}
function Wt(e, t = !0) {
  return typeof e == "string" && (t || e !== "");
}
function ga(e, t = !0) {
  return Array.isArray(e) && (t || e.length !== 0);
}
function ha(e) {
  return ie(e) && !isNaN(e);
}
function at(e, t) {
  if (t) {
    const r = t.test(e);
    return t.lastIndex = 0, r;
  }
  return !1;
}
function lc(...e) {
  const t = (r = {}, o = {}) => {
    const s = ac({}, r);
    return Object.keys(o).forEach((n) => {
      Ot(o[n]) && n in r && Ot(r[n]) ? s[n] = t(r[n], o[n]) : s[n] = o[n];
    }), s;
  };
  return e.reduce((r, o, s) => s === 0 ? o : t(r, o), {});
}
function lr(e) {
  return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":");
}
function ma(e) {
  return Wt(e) ? e.replace(/(_)/g, "-").replace(/[A-Z]/g, (t, r) => r === 0 ? t : "-" + t.toLowerCase()).toLowerCase() : e;
}
function Fs(e) {
  return Wt(e) ? e.replace(/[A-Z]/g, (t, r) => r === 0 ? t : "." + t.toLowerCase()).toLowerCase() : e;
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
var cc = Object.defineProperty, uc = Object.defineProperties, dc = Object.getOwnPropertyDescriptors, Wr = Object.getOwnPropertySymbols, va = Object.prototype.hasOwnProperty, ya = Object.prototype.propertyIsEnumerable, Ds = (e, t, r) => t in e ? cc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Ve = (e, t) => {
  for (var r in t || (t = {}))
    va.call(t, r) && Ds(e, r, t[r]);
  if (Wr)
    for (var r of Wr(t))
      ya.call(t, r) && Ds(e, r, t[r]);
  return e;
}, mo = (e, t) => uc(e, dc(t)), tt = (e, t) => {
  var r = {};
  for (var o in e)
    va.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
  if (e != null && Wr)
    for (var o of Wr(e))
      t.indexOf(o) < 0 && ya.call(e, o) && (r[o] = e[o]);
  return r;
}, fc = xa(), ot = fc;
function Vs(e, t) {
  ga(e) ? e.push(...t || []) : Ot(e) && Object.assign(e, t);
}
function pc(e) {
  return Ot(e) && e.hasOwnProperty("value") && e.hasOwnProperty("type") ? e.value : e;
}
function Bs(e, t = "") {
  return ["opacity", "z-index", "line-height", "font-weight", "flex", "flex-grow", "flex-shrink", "order"].some((o) => t.endsWith(o)) ? e : `${e}`.trim().split(" ").map((n) => ha(n) ? `${n}px` : n).join(" ");
}
function bc(e) {
  return e.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function Eo(e = "", t = "") {
  return bc(`${Wt(e, !1) && Wt(t, !1) ? `${e}-` : e}${t}`);
}
function ka(e = "", t = "") {
  return `--${Eo(e, t)}`;
}
function wa(e, t = "", r = "", o = [], s) {
  if (Wt(e)) {
    const n = /{([^}]*)}/g, a = e.trim();
    if (at(a, n)) {
      const i = a.replaceAll(n, (u) => {
        const h = u.replace(/{|}/g, "").split(".").filter((g) => !o.some((w) => at(g, w)));
        return `var(${ka(r, ma(h.join("-")))}${ie(s) ? `, ${s}` : ""})`;
      }), l = /(\d+\s+[\+\-\*\/]\s+\d+)/g, c = /var\([^)]+\)/g;
      return at(i.replace(c, "0"), l) ? `calc(${i})` : i;
    }
    return Bs(a, t);
  } else if (ha(e))
    return Bs(e, t);
}
function gc(e, t, r) {
  Wt(t, !1) && e.push(`${t}:${r};`);
}
function Nt(e, t) {
  return e ? `${e}{${t}}` : "";
}
var cr = (...e) => hc(ve.getTheme(), ...e), hc = (e = {}, t, r, o) => {
  if (t) {
    const { variable: s, options: n } = ve.defaults || {}, { prefix: a, transform: i } = (e == null ? void 0 : e.options) || n || {}, c = at(t, /{([^}]*)}/g) ? t : `{${t}}`;
    return o === "value" || Zo(o) && i === "strict" ? ve.getTokenValue(t) : wa(c, void 0, a, [s.excludedKeyRegex], r);
  }
  return "";
};
function mc(e, t = {}) {
  const r = ve.defaults.variable, { prefix: o = r.prefix, selector: s = r.selector, excludedKeyRegex: n = r.excludedKeyRegex } = t, a = (c, u = "") => Object.entries(c).reduce(
    (d, [h, g]) => {
      const w = at(h, n) ? Eo(u) : Eo(u, ma(h)), k = pc(g);
      if (Ot(k)) {
        const { variables: _, tokens: v } = a(k, w);
        Vs(d.tokens, v), Vs(d.variables, _);
      } else
        d.tokens.push((o ? w.replace(`${o}-`, "") : w).replaceAll("-", ".")), gc(d.variables, ka(w), wa(k, w, o, [n]));
      return d;
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
var Fe = {
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
    return mc(e, { prefix: t == null ? void 0 : t.prefix });
  },
  getCommon({ name: e = "", theme: t = {}, params: r, set: o, defaults: s }) {
    var n, a, i, l, c, u, d;
    const { preset: h, options: g } = t;
    let w, k, _, v, T, L, E;
    if (ie(h) && g.transform !== "strict") {
      const { primitive: F, semantic: Y, extend: q } = h, V = Y || {}, { colorScheme: N } = V, X = tt(V, ["colorScheme"]), le = q || {}, { colorScheme: de } = le, he = tt(le, ["colorScheme"]), je = N || {}, { dark: Le } = je, ee = tt(je, ["dark"]), W = de || {}, { dark: U } = W, $e = tt(W, ["dark"]), Pe = ie(F) ? this._toVariables({ primitive: F }, g) : {}, fe = ie(X) ? this._toVariables({ semantic: X }, g) : {}, pe = ie(ee) ? this._toVariables({ light: ee }, g) : {}, yt = ie(Le) ? this._toVariables({ dark: Le }, g) : {}, ut = ie(he) ? this._toVariables({ semantic: he }, g) : {}, kr = ie($e) ? this._toVariables({ light: $e }, g) : {}, dt = ie(U) ? this._toVariables({ dark: U }, g) : {}, [Et, Ut] = [(n = Pe.declarations) != null ? n : "", Pe.tokens], [wr, kt] = [(a = fe.declarations) != null ? a : "", fe.tokens || []], [es, f] = [(i = pe.declarations) != null ? i : "", pe.tokens || []], [p, m] = [(l = yt.declarations) != null ? l : "", yt.tokens || []], [S, x] = [(c = ut.declarations) != null ? c : "", ut.tokens || []], [y, A] = [(u = kr.declarations) != null ? u : "", kr.tokens || []], [$, j] = [(d = dt.declarations) != null ? d : "", dt.tokens || []];
      w = this.transformCSS(e, Et, "light", "variable", g, o, s), k = Ut;
      const C = this.transformCSS(e, `${wr}${es}`, "light", "variable", g, o, s), D = this.transformCSS(e, `${p}`, "dark", "variable", g, o, s);
      _ = `${C}${D}`, v = [.../* @__PURE__ */ new Set([...kt, ...f, ...m])];
      const z = this.transformCSS(e, `${S}${y}color-scheme:light`, "light", "variable", g, o, s), M = this.transformCSS(e, `${$}color-scheme:dark`, "dark", "variable", g, o, s);
      T = `${z}${M}`, L = [.../* @__PURE__ */ new Set([...x, ...A, ...j])], E = jt(h.css, { dt: cr });
    }
    return {
      primitive: {
        css: w,
        tokens: k
      },
      semantic: {
        css: _,
        tokens: v
      },
      global: {
        css: T,
        tokens: L
      },
      style: E
    };
  },
  getPreset({ name: e = "", preset: t = {}, options: r, params: o, set: s, defaults: n, selector: a }) {
    var i, l, c;
    let u, d, h;
    if (ie(t) && r.transform !== "strict") {
      const g = e.replace("-directive", ""), w = t, { colorScheme: k, extend: _, css: v } = w, T = tt(w, ["colorScheme", "extend", "css"]), L = _ || {}, { colorScheme: E } = L, F = tt(L, ["colorScheme"]), Y = k || {}, { dark: q } = Y, V = tt(Y, ["dark"]), N = E || {}, { dark: X } = N, le = tt(N, ["dark"]), de = ie(T) ? this._toVariables({ [g]: Ve(Ve({}, T), F) }, r) : {}, he = ie(V) ? this._toVariables({ [g]: Ve(Ve({}, V), le) }, r) : {}, je = ie(q) ? this._toVariables({ [g]: Ve(Ve({}, q), X) }, r) : {}, [Le, ee] = [(i = de.declarations) != null ? i : "", de.tokens || []], [W, U] = [(l = he.declarations) != null ? l : "", he.tokens || []], [$e, Pe] = [(c = je.declarations) != null ? c : "", je.tokens || []], fe = this.transformCSS(g, `${Le}${W}`, "light", "variable", r, s, n, a), pe = this.transformCSS(g, $e, "dark", "variable", r, s, n, a);
      u = `${fe}${pe}`, d = [.../* @__PURE__ */ new Set([...ee, ...U, ...Pe])], h = jt(v, { dt: cr });
    }
    return {
      css: u,
      tokens: d,
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
    const a = e.replace("-directive", ""), { preset: i, options: l } = t, c = (n = i == null ? void 0 : i.directives) == null ? void 0 : n[a];
    return this.getPreset({ name: a, preset: c, options: l, params: r, set: o, defaults: s });
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
    const a = this.getCommon({ name: e, theme: t, params: r, set: s, defaults: n }), i = Object.entries(o).reduce((l, [c, u]) => l.push(`${c}="${u}"`) && l, []).join(" ");
    return Object.entries(a || {}).reduce((l, [c, u]) => {
      if (u != null && u.css) {
        const d = lr(u == null ? void 0 : u.css), h = `${c}-variables`;
        l.push(`<style type="text/css" data-primevue-style-id="${h}" ${i}>${d}</style>`);
      }
      return l;
    }, []).join("");
  },
  getStyleSheet({ name: e = "", theme: t = {}, params: r, props: o = {}, set: s, defaults: n }) {
    var a;
    const i = { name: e, theme: t, params: r, set: s, defaults: n }, l = (a = e.includes("-directive") ? this.getPresetD(i) : this.getPresetC(i)) == null ? void 0 : a.css, c = Object.entries(o).reduce((u, [d, h]) => u.push(`${d}="${h}"`) && u, []).join(" ");
    return l ? `<style type="text/css" data-primevue-style-id="${e}-variables" ${c}>${lr(l)}</style>` : "";
  },
  createTokens(e = {}, t, r = "", o = "", s = {}) {
    return Object.entries(e).forEach(([n, a]) => {
      const i = at(n, t.variable.excludedKeyRegex) ? r : r ? `${r}.${Fs(n)}` : Fs(n), l = o ? `${o}.${n}` : n;
      Ot(a) ? this.createTokens(a, t, i, l, s) : (s[i] || (s[i] = {
        paths: [],
        computed(c, u = {}) {
          var d, h;
          return this.paths.length === 1 ? (d = this.paths[0]) == null ? void 0 : d.computed(this.paths[0].scheme, u.binding) : c && c !== "none" ? (h = this.paths.find((g) => g.scheme === c)) == null ? void 0 : h.computed(c, u.binding) : this.paths.map((g) => g.computed(g.scheme, u[g.scheme]));
        }
      }), s[i].paths.push({
        path: l,
        value: a,
        scheme: l.includes("colorScheme.light") ? "light" : l.includes("colorScheme.dark") ? "dark" : "none",
        computed(c, u = {}) {
          const d = /{([^}]*)}/g;
          let h = a;
          if (u.name = this.path, u.binding || (u.binding = {}), at(a, d)) {
            const w = a.trim().replaceAll(d, (v) => {
              var T;
              const L = v.replace(/{|}/g, ""), E = (T = s[L]) == null ? void 0 : T.computed(c, u);
              return ga(E) && E.length === 2 ? `light-dark(${E[0].value},${E[1].value})` : E == null ? void 0 : E.value;
            }), k = /(\d+\w*\s+[\+\-\*\/]\s+\d+\w*)/g, _ = /var\([^)]+\)/g;
            h = at(w.replace(_, "0"), k) ? `calc(${w})` : w;
          }
          return Zo(u.binding) && delete u.binding, {
            colorScheme: c,
            path: this.path,
            paths: u,
            value: h.includes("undefined") ? void 0 : h
          };
        }
      }));
    }), s;
  },
  getTokenValue(e, t, r) {
    var o;
    const n = ((l) => l.split(".").filter((u) => !at(u.toLowerCase(), r.variable.excludedKeyRegex)).join("."))(t), a = t.includes("colorScheme.light") ? "light" : t.includes("colorScheme.dark") ? "dark" : void 0, i = [(o = e[n]) == null ? void 0 : o.computed(a)].flat().filter((l) => l);
    return i.length === 1 ? i[0].value : i.reduce((l = {}, c) => {
      const u = c, { colorScheme: d } = u, h = tt(u, ["colorScheme"]);
      return l[d] = h, l;
    }, void 0);
  },
  getSelectorRule(e, t, r, o) {
    return r === "class" || r === "attr" ? Nt(ie(t) ? `${e}${t},${e} ${t}` : e, o) : Nt(e, ie(t) ? Nt(t, o) : o);
  },
  transformCSS(e, t, r, o, s = {}, n, a, i) {
    if (ie(t)) {
      const { cssLayer: l } = s;
      if (o !== "style") {
        const c = this.getColorSchemeOption(s, a);
        t = r === "dark" ? c.reduce((u, { type: d, selector: h }) => (ie(h) && (u += h.includes("[CSS]") ? h.replace("[CSS]", t) : this.getSelectorRule(h, i, d, t)), u), "") : Nt(i ?? ":root", t);
      }
      if (l) {
        const c = {
          name: "primeui"
        };
        Ot(l) && (c.name = jt(l.name, { name: e, type: o })), ie(c.name) && (t = Nt(`@layer ${c.name}`, t), n == null || n.layerNames(c.name));
      }
      return t;
    }
    return "";
  }
}, ve = {
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
    t && (this._theme = mo(Ve({}, t), {
      options: Ve(Ve({}, this.defaults.options), t.options)
    }), this._tokens = Fe.createTokens(this.preset, this.defaults), this.clearLoadedStyleNames());
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
    this._theme = mo(Ve({}, this.theme), { preset: e }), this._tokens = Fe.createTokens(e, this.defaults), this.clearLoadedStyleNames(), ot.emit("preset:change", e), ot.emit("theme:change", this.theme);
  },
  getOptions() {
    return this.options;
  },
  setOptions(e) {
    this._theme = mo(Ve({}, this.theme), { options: e }), this.clearLoadedStyleNames(), ot.emit("options:change", e), ot.emit("theme:change", this.theme);
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
    return Fe.getTokenValue(this.tokens, e, this.defaults);
  },
  getCommon(e = "", t) {
    return Fe.getCommon({ name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
  },
  getComponent(e = "", t) {
    const r = { name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
    return Fe.getPresetC(r);
  },
  getDirective(e = "", t) {
    const r = { name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
    return Fe.getPresetD(r);
  },
  getCustomPreset(e = "", t, r, o) {
    const s = { name: e, preset: t, options: this.options, selector: r, params: o, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
    return Fe.getPreset(s);
  },
  getLayerOrderCSS(e = "") {
    return Fe.getLayerOrder(e, this.options, { names: this.getLayerNames() }, this.defaults);
  },
  transformCSS(e = "", t, r = "style", o) {
    return Fe.transformCSS(e, t, o, r, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults);
  },
  getCommonStyleSheet(e = "", t, r = {}) {
    return Fe.getCommonStyleSheet({ name: e, theme: this.theme, params: t, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
  },
  getStyleSheet(e, t, r = {}) {
    return Fe.getStyleSheet({ name: e, theme: this.theme, params: t, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
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
      var n, a;
      const i = (n = e == null ? void 0 : e.$attrs) != null && n[o] ? [(a = e == null ? void 0 : e.$attrs) == null ? void 0 : a[o]] : [];
      return [s].flat().reduce((l, c) => {
        if (c != null) {
          const u = typeof c;
          if (u === "string" || u === "number")
            l.push(c);
          else if (u === "object") {
            const d = Array.isArray(c) ? r(o, c) : Object.entries(c).map(([h, g]) => o === "style" && (g || g === 0) ? `${h.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${g}` : g ? h : void 0);
            l = d.length ? l.concat(d.filter((h) => !!h)) : l;
          }
        }
        return l;
      }, i);
    };
    Object.entries(t).forEach(([o, s]) => {
      if (s != null) {
        const n = o.match(/^on(.+)/);
        n ? e.addEventListener(n[1].toLowerCase(), s) : o === "p-bind" ? Io(e, s) : (s = o === "class" ? [...new Set(r("class", s))].join(" ").trim() : o === "style" ? r("style", s).join(";").trim() : s, (e.$attrs = e.$attrs || {}) && (e.$attrs[o] = s), e.setAttribute(o, s));
      }
    });
  }
}
function xc(e) {
  if (e) {
    let t = e.parentNode;
    return t && t instanceof ShadowRoot && t.host && (t = t.host), t;
  }
  return null;
}
function vc(e) {
  return !!(e !== null && typeof e < "u" && e.nodeName && xc(e));
}
function yc() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function kc(e, t = "", r) {
  _a(e) && r !== null && r !== void 0 && e.setAttribute(t, r);
}
var me = {
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
function gr(e) {
  "@babel/helpers - typeof";
  return gr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, gr(e);
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
function Ws(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ks(Object(r), !0).forEach(function(o) {
      wc(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ks(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
function wc(e, t, r) {
  return (t = _c(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function _c(e) {
  var t = Sc(e, "string");
  return gr(t) == "symbol" ? t : t + "";
}
function Sc(e, t) {
  if (gr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var o = r.call(e, t);
    if (gr(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Cc(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  Qo() ? Nn(e) : t ? e() : Jo(e);
}
var Tc = 0;
function jc(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = ae(!1), o = ae(e), s = ae(null), n = yc() ? window.document : void 0, a = t.document, i = a === void 0 ? n : a, l = t.immediate, c = l === void 0 ? !0 : l, u = t.manual, d = u === void 0 ? !1 : u, h = t.name, g = h === void 0 ? "style_".concat(++Tc) : h, w = t.id, k = w === void 0 ? void 0 : w, _ = t.media, v = _ === void 0 ? void 0 : _, T = t.nonce, L = T === void 0 ? void 0 : T, E = t.first, F = E === void 0 ? !1 : E, Y = t.onMounted, q = Y === void 0 ? void 0 : Y, V = t.onUpdated, N = V === void 0 ? void 0 : V, X = t.onLoad, le = X === void 0 ? void 0 : X, de = t.props, he = de === void 0 ? {} : de, je = function() {
  }, Le = function(U) {
    var $e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (i) {
      var Pe = Ws(Ws({}, he), $e), fe = Pe.name || g, pe = Pe.id || k, yt = Pe.nonce || L;
      s.value = i.querySelector('style[data-primevue-style-id="'.concat(fe, '"]')) || i.getElementById(pe) || i.createElement("style"), s.value.isConnected || (o.value = U || e, Io(s.value, {
        type: "text/css",
        id: pe,
        media: v,
        nonce: yt
      }), F ? i.head.prepend(s.value) : i.head.appendChild(s.value), kc(s.value, "data-primevue-style-id", fe), Io(s.value, Pe), s.value.onload = function(ut) {
        return le == null ? void 0 : le(ut, {
          name: fe
        });
      }, q == null || q(fe)), !r.value && (je = Ye(o, function(ut) {
        s.value.textContent = ut, N == null || N(fe);
      }, {
        immediate: !0
      }), r.value = !0);
    }
  }, ee = function() {
    !i || !r.value || (je(), vc(s.value) && i.head.removeChild(s.value), r.value = !1);
  };
  return c && !d && Cc(Le), {
    id: k,
    name: g,
    el: s,
    css: o,
    unload: ee,
    load: Le,
    isLoaded: zr(r)
  };
}
function hr(e) {
  "@babel/helpers - typeof";
  return hr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, hr(e);
}
function Hs(e, t) {
  return Ac(e) || Oc(e, t) || Pc(e, t) || $c();
}
function $c() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Pc(e, t) {
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
function Oc(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var o, s, n, a, i = [], l = !0, c = !1;
    try {
      if (n = (r = r.call(e)).next, t !== 0) for (; !(l = (o = n.call(r)).done) && (i.push(o.value), i.length !== t); l = !0) ;
    } catch (u) {
      c = !0, s = u;
    } finally {
      try {
        if (!l && r.return != null && (a = r.return(), Object(a) !== a)) return;
      } finally {
        if (c) throw s;
      }
    }
    return i;
  }
}
function Ac(e) {
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
function xo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Us(Object(r), !0).forEach(function(o) {
      Ec(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Us(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
function Ec(e, t, r) {
  return (t = Ic(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Ic(e) {
  var t = zc(e, "string");
  return hr(t) == "symbol" ? t : t + "";
}
function zc(e, t) {
  if (hr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var o = r.call(e, t);
    if (hr(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Rc = function(t) {
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
}, Lc = function(t) {
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
}, Nc = {}, Mc = {}, Rt = {
  name: "base",
  css: Lc,
  theme: Rc,
  classes: Nc,
  inlineStyles: Mc,
  load: function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(n) {
      return n;
    }, s = o(jt(t, {
      dt: cr
    }));
    return ie(s) ? jc(lr(s), xo({
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
      return ve.transformCSS(r.name || t.name, "".concat(s).concat(o));
    });
  },
  getCommonTheme: function(t) {
    return ve.getCommon(this.name, t);
  },
  getComponentTheme: function(t) {
    return ve.getComponent(this.name, t);
  },
  getDirectiveTheme: function(t) {
    return ve.getDirective(this.name, t);
  },
  getPresetTheme: function(t, r, o) {
    return ve.getCustomPreset(this.name, t, r, o);
  },
  getLayerOrderThemeCSS: function() {
    return ve.getLayerOrderCSS(this.name);
  },
  getStyleSheet: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var o = jt(this.css, {
        dt: cr
      }) || "", s = lr("".concat(o).concat(t)), n = Object.entries(r).reduce(function(a, i) {
        var l = Hs(i, 2), c = l[0], u = l[1];
        return a.push("".concat(c, '="').concat(u, '"')) && a;
      }, []).join(" ");
      return ie(s) ? '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(n, ">").concat(s, "</style>") : "";
    }
    return "";
  },
  getCommonThemeStyleSheet: function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return ve.getCommonStyleSheet(this.name, t, r);
  },
  getThemeStyleSheet: function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = [ve.getStyleSheet(this.name, t, r)];
    if (this.theme) {
      var s = this.name === "base" ? "global-style" : "".concat(this.name, "-style"), n = jt(this.theme, {
        dt: cr
      }), a = lr(ve.transformCSS(s, n)), i = Object.entries(r).reduce(function(l, c) {
        var u = Hs(c, 2), d = u[0], h = u[1];
        return l.push("".concat(d, '="').concat(h, '"')) && l;
      }, []).join(" ");
      ie(a) && o.push('<style type="text/css" data-primevue-style-id="'.concat(s, '" ').concat(i, ">").concat(a, "</style>"));
    }
    return o.join("");
  },
  extend: function(t) {
    return xo(xo({}, this), {}, {
      css: void 0,
      theme: void 0
    }, t);
  }
}, jr = xa();
function mr(e) {
  "@babel/helpers - typeof";
  return mr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, mr(e);
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
      Fc(e, o, r[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Gs(Object(r)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
    });
  }
  return e;
}
function Fc(e, t, r) {
  return (t = Dc(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Dc(e) {
  var t = Vc(e, "string");
  return mr(t) == "symbol" ? t : t + "";
}
function Vc(e, t) {
  if (mr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var o = r.call(e, t);
    if (mr(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Bc = {
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
    text: [me.STARTS_WITH, me.CONTAINS, me.NOT_CONTAINS, me.ENDS_WITH, me.EQUALS, me.NOT_EQUALS],
    numeric: [me.EQUALS, me.NOT_EQUALS, me.LESS_THAN, me.LESS_THAN_OR_EQUAL_TO, me.GREATER_THAN, me.GREATER_THAN_OR_EQUAL_TO],
    date: [me.DATE_IS, me.DATE_IS_NOT, me.DATE_BEFORE, me.DATE_AFTER]
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
}, Kc = Symbol();
function Wc(e, t) {
  var r = {
    config: Ht(t)
  };
  return e.config.globalProperties.$primevue = r, e.provide(Kc, r), Hc(), Jc(e, r), r;
}
var Mt = [];
function Hc() {
  ot.clear(), Mt.forEach(function(e) {
    return e == null ? void 0 : e();
  }), Mt = [];
}
function Jc(e, t) {
  var r = ae(!1), o = function() {
    var c;
    if (((c = t.config) === null || c === void 0 ? void 0 : c.theme) !== "none" && !ve.isStyleNameLoaded("common")) {
      var u, d, h = ((u = Rt.getCommonTheme) === null || u === void 0 ? void 0 : u.call(Rt)) || {}, g = h.primitive, w = h.semantic, k = h.global, _ = h.style, v = {
        nonce: (d = t.config) === null || d === void 0 || (d = d.csp) === null || d === void 0 ? void 0 : d.nonce
      };
      Rt.load(g == null ? void 0 : g.css, $r({
        name: "primitive-variables"
      }, v)), Rt.load(w == null ? void 0 : w.css, $r({
        name: "semantic-variables"
      }, v)), Rt.load(k == null ? void 0 : k.css, $r({
        name: "global-variables"
      }, v)), Rt.loadTheme($r({
        name: "global-style"
      }, v), _), ve.setLoadedStyleName("common");
    }
  };
  ot.on("theme:change", function(l) {
    r.value || (e.config.globalProperties.$primevue.config.theme = l, r.value = !0);
  });
  var s = Ye(t.config, function(l, c) {
    jr.emit("config:change", {
      newValue: l,
      oldValue: c
    });
  }, {
    immediate: !0,
    deep: !0
  }), n = Ye(function() {
    return t.config.ripple;
  }, function(l, c) {
    jr.emit("config:ripple:change", {
      newValue: l,
      oldValue: c
    });
  }, {
    immediate: !0,
    deep: !0
  }), a = Ye(function() {
    return t.config.theme;
  }, function(l, c) {
    r.value || ve.setTheme(l), t.config.unstyled || o(), r.value = !1, jr.emit("config:theme:change", {
      newValue: l,
      oldValue: c
    });
  }, {
    immediate: !0,
    deep: !0
  }), i = Ye(function() {
    return t.config.unstyled;
  }, function(l, c) {
    !l && t.config.theme && o(), jr.emit("config:unstyled:change", {
      newValue: l,
      oldValue: c
    });
  }, {
    immediate: !0,
    deep: !0
  });
  Mt.push(s), Mt.push(n), Mt.push(a), Mt.push(i);
}
var Uc = {
  install: function(t, r) {
    var o = lc(Bc, r);
    Wc(t, o);
  }
};
const Gc = {
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
}, qc = {
  content: "p-5 pt-0 bg-surface-0 dark:bg-surface-900 text-surface-600 dark:text-surface-0/70"
}, Yc = {
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
}, Xc = {
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
}, Qc = {
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
}, Zc = {
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
}, eu = {
  root: {
    class: "flex items-center"
  }
}, tu = {
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
}, ru = {
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
}, ou = {
  root: "relative",
  mask: "bg-black/40 rounded-md"
}, su = {
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
}, nu = {
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
}, au = {
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
}, iu = {
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
}, lu = {
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
}, cu = {
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
}, uu = {
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
}, du = {
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
}, fu = {
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
}, pu = {
  icon: "w-8 h-8 text-[2rem] mr-2"
}, bu = {
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
}, gu = {
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
}, hu = {
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
}, mu = {
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
}, xu = {
  root: {}
}, vu = {
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
}, yu = {
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
}, ku = {
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
}, wu = {
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
}, _u = {
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
}, Su = {
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
}, Cu = {
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
}, Tu = {
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
}, ju = {
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
}, $u = {
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
}, Pu = {
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
}, Ou = {
  root: {
    class: ["flex items-stretch", "w-full"]
  }
}, Au = {
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
}, Eu = {
  pcinputtext: {
    root: ({ context: e, props: t, parent: r }) => {
      var o, s, n, a, i, l, c;
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
          ((i = r.instance) == null ? void 0 : i.$name) == "FloatLabel" || ((c = (l = r.instance) == null ? void 0 : l.$parentInstance) == null ? void 0 : c.$name) == "FloatLabel" ? "placeholder:text-transparent dark:placeholder:text-transparent" : "placeholder:text-surface-400 dark:placeholder:text-surface-500",
          // Misc
          "rounded-md",
          "appearance-none",
          "transition-colors duration-200"
        ]
      };
    }
  }
}, Iu = {
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
}, zu = {
  root: {
    class: [
      // Alignment
      "flex items-center",
      "gap-2",
      "[&_[data-pc-name^=pcinput]]:w-10"
    ]
  }
}, Ru = {
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
}, Lu = {
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
}, Nu = {
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
}, Mu = {
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
}, Fu = {
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
}, Du = {
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
}, Vu = {
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
}, Bu = {
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
}, Ku = {
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
    var r, o, s, n, a, i, l, c;
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
          filled: ((c = t.instance) == null ? void 0 : c.$name) == "FloatLabel" && e.modelValue !== null
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
}, Wu = {
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
}, Hu = {
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
}, Ju = {
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
}, Uu = {
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
}, Gu = {
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
}, qu = {
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
}, Yu = {
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
}, Xu = {
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
}, Qu = {
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
}, Zu = {
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
}, ed = {
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
}, td = {
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
}, rd = {
  root: {
    class: [
      "block absolute bg-surface-200 dark:bg-surface-700 rounded-full pointer-events-none"
    ],
    style: "transform: scale(0)"
  }
}, od = {
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
}, sd = {
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
}, nd = {
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
}, ad = {
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
}, id = {
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
}, ld = {
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
}, cd = {
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
}, ud = {
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
}, dd = {
  root: ({ context: e }) => ({
    class: ["grow", { flex: e.nested }]
  })
}, fd = {
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
}, pd = {
  root: ({ state: e }) => ({
    class: [
      "flex flex-col flex-[initial] has-[[data-pc-name=steppanels]]:px-2 has-[[data-pc-name=steppanels]]:pt-3.5 has-[[data-pc-name=steppanels]]:pb-[1.125rem]",
      { "flex-auto": e.isActive },
      "[&>[data-pc-name=step]]:flex-[initial]",
      "[&>[data-pc-name=steppanel]]:flex [&>[data-pc-name=steppanel]]:flex-auto [&>[data-pc-name=steppanel]>[data-pc-section=content]]:w-full [&>[data-pc-name=steppanel]>[data-pc-section=content]]:pl-4 [&:last-child>[data-pc-name=steppanel]>[data-pc-section=content]]:ps-8",
      "[&>[data-pc-name=steppanel]>[data-pc-section=separator]]:relative [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:!flex-initial [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:shrink-0 [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:w-[2px] [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:h-auto [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:m-2 [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:left-[-2px] [&>[data-pc-name=steppanel]>[data-pc-section=separator]]:ml-[1.625rem]"
    ]
  })
}, bd = {
  root: "relative flex justify-between items-center m-0 p-0 list-none overflow-x-auto"
}, gd = {
  root: "px-2 pt-3.5 pb-[1.125rem]"
}, hd = {
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
}, md = {
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
}, xd = {
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
}, vd = {
  root: "relative flex",
  content: "overflow-x-auto overflow-y-hidden scroll-smooth overscroll-x-contain overscroll-y-auto [&::-webkit-scrollbar]:hidden grow dark:bg-surface-800",
  tabList: "relative flex border-solid border-b border-surface-200 dark:border-surface-900",
  nextButton: "!absolute top-0 right-0 z-20 h-full w-10 flex items-center justify-center text-surface-700 dark:text-surface-0/80 bg-surface-0 dark:bg-surface-800 outline-transparent cursor-pointer shrink-0",
  prevButton: "!absolute top-0 left-0 z-20 h-full w-10 flex items-center justify-center text-surface-700 dark:text-surface-0/80 bg-surface-0 dark:bg-surface-800 outline-transparent cursor-pointer shrink-0",
  activeBar: "z-10 block absolute h-[1px] bottom-[-1px] bg-primary-400"
}, yd = {
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
}, kd = {
  root: "focus:outline-none focus:outline-offset-0 focus-visible:ring-1 ring-inset focus-visible:ring-primary-400 dark:focus-visible:ring-primary-300"
}, wd = {
  root: "bg-surface-0 dark:bg-surface-800 text-surface-900 dark:text-surface-0/80 outline-0 p-[1.125rem] pt-[0.875rem]"
}, _d = {
  root: ({ props: e }) => ({
    class: [
      "flex flex-col",
      { "[&>[data-pc-name=tablist]]:overflow-hidden": e.scrollable }
    ]
  })
}, Sd = {
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
}, Cd = {
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
}, Td = {
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
}, jd = {
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
}, $d = {
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
}, Pd = {
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
}, Od = {
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
}, Ad = {
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
}, Ed = {
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
}, Id = {
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
}, zd = {
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
}, Rd = {
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
}, Ld = {
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
}, Nd = {
  global: Tu,
  directives: {
    badge: ru,
    ripple: rd,
    tooltip: Id
  },
  //forms
  autocomplete: Qc,
  select: Qs,
  dropdown: Qs,
  inputnumber: Iu,
  inputtext: Ru,
  datepicker: qs,
  calendar: qs,
  checkbox: uu,
  radiobutton: ed,
  toggleswitch: Zs,
  inputswitch: Zs,
  selectbutton: nd,
  slider: id,
  rating: td,
  multiselect: Ku,
  togglebutton: Ad,
  cascadeselect: cu,
  listbox: Nu,
  colorpicker: fu,
  inputgroup: Ou,
  inputgroupaddon: Au,
  inputmask: Eu,
  knob: Lu,
  treeselect: Rd,
  textarea: jd,
  password: Yu,
  iconfield: ju,
  floatlabel: Su,
  inputotp: zu,
  //buttons
  button: nu,
  buttongroup: au,
  splitbutton: cd,
  speeddial: ld,
  //data
  paginator: Uu,
  datatable: hu,
  tree: zd,
  dataview: mu,
  organizationchart: Hu,
  orderlist: Wu,
  picklist: Xu,
  treetable: Ld,
  timeline: Pd,
  //panels
  accordion: Gc,
  accordionpanel: Xc,
  accordionheader: Yc,
  accordioncontent: qc,
  panel: Gu,
  fieldset: wu,
  card: iu,
  tabview: Sd,
  divider: yu,
  toolbar: Ed,
  scrollpanel: od,
  splitter: ud,
  splitterpanel: dd,
  stepper: hd,
  steplist: bd,
  step: fd,
  stepitem: pd,
  steppanels: gd,
  deferred: xu,
  tab: xd,
  tabs: _d,
  tablist: vd,
  tabpanels: wd,
  tabpanel: kd,
  //file
  fileupload: _u,
  //menu
  contextmenu: gu,
  menu: Fu,
  menubar: Du,
  steps: md,
  tieredmenu: $d,
  breadcrumb: su,
  panelmenu: qu,
  megamenu: Mu,
  dock: ku,
  tabmenu: yd,
  //overlays
  dialog: vu,
  popover: Xs,
  sidebar: Xs,
  drawer: Ys,
  overlaypanel: Ys,
  confirmpopup: bu,
  confirmdialog: pu,
  //messages
  message: Vu,
  toast: Od,
  //media
  carousel: lu,
  galleria: Cu,
  image: $u,
  //misc
  badge: tu,
  overlaybadge: Ju,
  avatar: Zc,
  avatargroup: eu,
  tag: Cd,
  chip: du,
  progressbar: Qu,
  skeleton: ad,
  scrolltop: sd,
  terminal: Td,
  blockui: ou,
  metergroup: Bu,
  inplace: Pu,
  progressspinner: Zu
}, Sa = /* @__PURE__ */ ba("attacks", () => {
  const e = ae([]), t = ae(null), r = Ee(
    () => e.value.find((g) => g.sessionId === t.value) ?? e.value[0] ?? null
  );
  function o(g, w, k = 0) {
    const _ = e.value.find((T) => T.sessionId === g);
    if (_) {
      k > 0 && (_.total = k);
      return;
    }
    const v = {
      sessionId: g,
      requestId: w,
      startedAt: Date.now(),
      results: [],
      total: k,
      complete: !1,
      errors: [],
      recoveredKeys: [],
      discoveredEndpoints: [],
      keyRecoveryLog: []
    };
    e.value.unshift(v), t.value = g;
  }
  function s(g, w) {
    const k = e.value.find((_) => _.sessionId === g);
    k && (k.total = w);
  }
  function n(g, w) {
    const k = e.value.find((_) => _.sessionId === g);
    k && k.results.push(w);
  }
  function a(g, w) {
    const k = e.value.find((_) => _.sessionId === g);
    k && (k.complete = !0, k.errors.push(...w));
  }
  function i(g, w) {
    const k = e.value.find((_) => _.sessionId === g);
    k && !k.recoveredKeys.includes(w) && k.recoveredKeys.push(w);
  }
  function l(g, w) {
    const k = e.value.find((_) => _.sessionId === g);
    k && k.keyRecoveryLog.push(w);
  }
  function c(g, w) {
    const k = e.value.find((_) => _.sessionId === g);
    k && !k.discoveredEndpoints.some((_) => _.url === w.url) && k.discoveredEndpoints.push(w);
  }
  function u(g, w) {
    const k = e.value.find((_) => _.sessionId === g);
    k && (k.spoof = w);
  }
  function d(g) {
    t.value = g;
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
    addDiscoveredEndpoint: c,
    setSpoof: u,
    setActiveSession: d,
    clearSessions: h
  };
}), Md = [
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
  jwksPaths: [...Md],
  customWordlist: [],
  spoofPrivateKeyPem: "",
  spoofJwksJson: "",
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
}, Fd = {
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
const Dd = { class: "h-full flex flex-col overflow-hidden" }, Vd = { class: "px-3 py-2 border-b border-gray-700 bg-gray-900 flex items-center gap-2" }, Bd = ["value"], Kd = ["value"], Wd = {
  key: 1,
  class: "text-xs text-gray-400 flex-1"
}, Hd = {
  key: 0,
  class: "ml-1 text-yellow-400 animate-pulse"
}, Jd = {
  key: 1,
  class: "ml-1 text-green-400"
}, Ud = {
  key: 2,
  class: "ml-2 text-cyan-400"
}, Gd = {
  key: 0,
  class: "px-3 py-2 bg-cyan-950 border-b-2 border-cyan-600 text-xs text-cyan-200"
}, qd = { class: "font-semibold mb-1" }, Yd = ["onClick"], Xd = { class: "text-cyan-400" }, Qd = {
  key: 0,
  class: "text-cyan-500"
}, Zd = {
  key: 1,
  class: "h-1 bg-gray-800"
}, ef = {
  key: 2,
  class: "px-3 py-1.5 bg-red-950 border-b border-red-800 text-xs text-red-300 max-h-28 overflow-y-auto"
}, tf = { class: "font-semibold mb-0.5" }, rf = {
  key: 3,
  class: "px-3 py-1.5 bg-yellow-950 border-b border-yellow-800 text-xs text-yellow-300 max-h-16 overflow-y-auto"
}, of = {
  key: 4,
  class: "px-3 py-1.5 bg-green-950 border-b border-green-800 text-xs text-green-300"
}, sf = { class: "flex gap-1 px-2 py-1.5 border-b border-gray-700 overflow-x-auto shrink-0" }, nf = ["onClick"], af = { class: "flex-1 overflow-y-auto" }, lf = {
  key: 0,
  class: "flex items-center justify-center h-full text-gray-500 text-sm py-8"
}, cf = ["onClick"], uf = { class: "flex items-center gap-2 min-w-0" }, df = { class: "text-xs text-gray-200 truncate flex-1" }, ff = {
  key: 1,
  class: "text-xs text-red-500 shrink-0"
}, pf = {
  key: 2,
  class: "text-xs text-cyan-400 shrink-0"
}, bf = {
  key: 3,
  class: "text-xs text-gray-600 shrink-0 animate-pulse"
}, gf = { class: "text-xs text-gray-500 mt-0.5 truncate pl-0.5" }, hf = /* @__PURE__ */ Jt({
  __name: "AttackList",
  props: {
    selectedId: {},
    selectedEndpointUrl: {},
    selectedSpoof: { type: Boolean }
  },
  emits: ["select", "selectEndpoint", "selectSpoof"],
  setup(e, { emit: t }) {
    const r = t, o = Sa(), s = ae("all"), n = Ee(() => o.activeSession), a = Ee(() => {
      var u;
      const c = (u = n.value) == null ? void 0 : u.spoof;
      switch (c == null ? void 0 : c.verifyStatus) {
        case "verified":
          return { icon: "✓", text: `endpoint verified${c.selfVerified ? "" : " (⚠ signing check failed)"}`, cls: "bg-green-950 border-green-800 text-green-300 hover:bg-green-900" };
        case "mismatch":
          return { icon: "✗", text: "hosted JWKS does not match — re-host it", cls: "bg-red-950 border-red-800 text-red-300 hover:bg-red-900" };
        case "unreachable":
          return { icon: "⚠", text: "JWKS URL unreachable", cls: "bg-orange-950 border-orange-800 text-orange-300 hover:bg-orange-900" };
        default:
          return { icon: "ℹ", text: "no JWKS URL configured", cls: "bg-purple-950 border-purple-800 text-purple-300 hover:bg-purple-900" };
      }
    }), i = Ee(() => {
      var w;
      const c = ((w = n.value) == null ? void 0 : w.results) ?? [], u = c.filter((k) => k.responseStatus && k.responseStatus < 300).length, d = c.filter((k) => k.responseStatus && k.responseStatus >= 400 && k.responseStatus < 500).length, h = c.filter((k) => k.responseStatus && k.responseStatus >= 500).length, g = c.filter((k) => k.error).length;
      return [
        { key: "all", label: "All", count: c.length },
        { key: "2xx", label: "2xx", count: u },
        { key: "4xx", label: "4xx", count: d },
        { key: "5xx", label: "5xx", count: h },
        { key: "err", label: "Errors", count: g }
      ];
    }), l = Ee(() => {
      var u;
      const c = ((u = n.value) == null ? void 0 : u.results) ?? [];
      switch (s.value) {
        case "2xx":
          return c.filter((d) => d.responseStatus && d.responseStatus < 300);
        case "4xx":
          return c.filter((d) => d.responseStatus && d.responseStatus >= 400 && d.responseStatus < 500);
        case "5xx":
          return c.filter((d) => d.responseStatus && d.responseStatus >= 500);
        case "err":
          return c.filter((d) => d.error);
        default:
          return c;
      }
    });
    return (c, u) => {
      var d, h, g, w, k;
      return O(), I("div", Dd, [
        R(" Session selector + progress bar "),
        b("div", Vd, [
          Se(o).sessions.length > 1 ? (O(), I("select", {
            key: 0,
            value: Se(o).activeSessionId,
            onChange: u[0] || (u[0] = (_) => Se(o).setActiveSession(_.target.value)),
            class: "text-xs bg-gray-800 border border-gray-600 rounded px-2 py-1 text-gray-300 flex-1 min-w-0"
          }, [
            (O(!0), I(
              ne,
              null,
              De(Se(o).sessions, (_) => (O(), I("option", {
                key: _.sessionId,
                value: _.sessionId
              }, " Session " + P(_.sessionId.slice(0, 6)) + " — " + P(_.results.length) + "/" + P(_.total) + " (" + P(new Date(_.startedAt).toLocaleTimeString()) + ") ", 9, Kd))),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 40, Bd)) : (O(), I("span", Wd, [
            n.value ? (O(), I(
              ne,
              { key: 0 },
              [
                be(
                  P(n.value.results.length) + "/" + P(n.value.total) + " attacks ",
                  1
                  /* TEXT */
                ),
                n.value.complete ? (O(), I("span", Jd, "✓ complete")) : (O(), I("span", Hd, "running…")),
                n.value.discoveredEndpoints.length ? (O(), I(
                  "span",
                  Ud,
                  "🔎 " + P(n.value.discoveredEndpoints.length) + " key endpoint(s)",
                  1
                  /* TEXT */
                )) : R("v-if", !0)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (O(), I(
              ne,
              { key: 1 },
              [
                be("No active session")
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ])),
          Se(o).sessions.length ? (O(), I("button", {
            key: 2,
            onClick: u[1] || (u[1] = (_) => Se(o).clearSessions()),
            class: "text-xs text-gray-500 hover:text-red-400 transition-colors"
          }, "Clear")) : R("v-if", !0)
        ]),
        R(" Discovered JWKS / key endpoints — highlighted so the analyst can't miss it "),
        (d = n.value) != null && d.discoveredEndpoints.length ? (O(), I("div", Gd, [
          b(
            "p",
            qd,
            "🔎 " + P(n.value.discoveredEndpoints.length) + " key endpoint(s) discovered — click for details:",
            1
            /* TEXT */
          ),
          (O(!0), I(
            ne,
            null,
            De(n.value.discoveredEndpoints, (_, v) => (O(), I("div", {
              key: v,
              onClick: (T) => r("selectEndpoint", _),
              class: ye([
                "font-mono break-all leading-snug px-1 -mx-1 rounded cursor-pointer hover:bg-cyan-900 transition-colors",
                e.selectedEndpointUrl === _.url ? "bg-cyan-900 ring-1 ring-cyan-500" : ""
              ])
            }, [
              b(
                "span",
                Xd,
                "[" + P(_.source) + "]",
                1
                /* TEXT */
              ),
              be(
                " " + P(_.url) + " ",
                1
                /* TEXT */
              ),
              _.keyCount ? (O(), I(
                "span",
                Qd,
                "— " + P(_.keyCount) + " key(s)",
                1
                /* TEXT */
              )) : R("v-if", !0)
            ], 10, Yd))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : R("v-if", !0),
        R(" Progress bar "),
        n.value && !n.value.complete ? (O(), I("div", Zd, [
          b(
            "div",
            {
              class: "h-1 bg-blue-500 transition-all duration-300",
              style: Yr({ width: n.value.total ? `${n.value.results.length / n.value.total * 100}%` : "0%" })
            },
            null,
            4
            /* STYLE */
          )
        ])) : R("v-if", !0),
        R(" Errors / warnings "),
        (h = n.value) != null && h.errors.length ? (O(), I("div", ef, [
          b(
            "p",
            tf,
            "⚠ " + P(n.value.errors.length) + " error(s):",
            1
            /* TEXT */
          ),
          (O(!0), I(
            ne,
            null,
            De(n.value.errors, (_, v) => (O(), I(
              "p",
              {
                key: v,
                class: "font-mono break-all"
              },
              P(_),
              1
              /* TEXT */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : R("v-if", !0),
        R(" Key recovery log "),
        (g = n.value) != null && g.keyRecoveryLog.length ? (O(), I("div", rf, [
          (O(!0), I(
            ne,
            null,
            De(n.value.keyRecoveryLog, (_, v) => (O(), I(
              "p",
              { key: v },
              P(_),
              1
              /* TEXT */
            ))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : R("v-if", !0),
        R(" Recovered keys notice "),
        (w = n.value) != null && w.recoveredKeys.length ? (O(), I(
          "div",
          of,
          " ✓ Recovered " + P(n.value.recoveredKeys.length) + " public key(s) from HTTP history ",
          1
          /* TEXT */
        )) : R("v-if", !0),
        R(" JKU/X5U spoofing: endpoint check + JWKS to host (click → right pane) "),
        (k = n.value) != null && k.spoof ? (O(), I(
          "div",
          {
            key: 5,
            onClick: u[2] || (u[2] = (_) => r("selectSpoof", n.value.spoof)),
            class: ye([
              "px-3 py-1.5 border-b text-xs cursor-pointer transition-colors",
              a.value.cls,
              e.selectedSpoof ? "ring-1 ring-inset ring-current" : ""
            ])
          },
          P(a.value.icon) + " JKU/X5U spoofing — " + P(a.value.text) + " · click to view JWKS to host ",
          3
          /* TEXT, CLASS */
        )) : R("v-if", !0),
        R(" Filter tabs "),
        b("div", sf, [
          (O(!0), I(
            ne,
            null,
            De(i.value, (_) => (O(), I("button", {
              key: _.key,
              onClick: (v) => s.value = _.key,
              class: ye([
                "px-2 py-0.5 rounded text-xs font-medium transition-colors whitespace-nowrap",
                s.value === _.key ? "bg-blue-700 text-white" : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
              ])
            }, P(_.label) + " (" + P(_.count) + ") ", 11, nf))),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        R(" Results list "),
        b("div", af, [
          !n.value || l.value.length === 0 ? (O(), I("div", lf, [
            n.value ? (O(), I(
              ne,
              { key: 1 },
              [
                be("No results yet…")
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (O(), I(
              ne,
              { key: 0 },
              [
                be('Right-click a request with a JWT and select "Attack JWT"')
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : R("v-if", !0),
          (O(!0), I(
            ne,
            null,
            De(l.value, (_) => (O(), I("div", {
              key: _.id,
              onClick: (v) => r("select", _),
              class: ye([
                "px-3 py-2 border-b border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors",
                e.selectedId === _.id ? "bg-gray-800 border-l-2 border-l-blue-500" : ""
              ])
            }, [
              b("div", uf, [
                b(
                  "span",
                  {
                    class: ye(["px-1.5 py-0.5 rounded text-xs font-mono shrink-0", Se(Ta)(_.technique)])
                  },
                  P(_.technique),
                  3
                  /* TEXT, CLASS */
                ),
                b(
                  "span",
                  df,
                  P(_.techniqueName),
                  1
                  /* TEXT */
                ),
                _.responseStatus ? (O(), I(
                  "span",
                  {
                    key: 0,
                    class: ye(["text-xs font-mono font-bold shrink-0", Se(Ca)(_.responseStatus)])
                  },
                  P(_.responseStatus),
                  3
                  /* TEXT, CLASS */
                )) : _.error ? (O(), I("span", ff, "ERR")) : _.infoOnly ? (O(), I("span", pf, "ℹ")) : (O(), I("span", bf, "…"))
              ]),
              b(
                "p",
                gf,
                P(_.description.slice(0, 80)),
                1
                /* TEXT */
              )
            ], 10, cf))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]);
    };
  }
});
function vo(e) {
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
}, jf = {
  key: 0,
  class: "px-4 py-3 border-b border-gray-700"
}, $f = {
  key: 0,
  class: "bg-green-950 border border-green-800 rounded p-2 text-xs text-green-200"
}, Pf = { class: "font-mono font-bold select-all" }, Of = {
  key: 1,
  class: "bg-orange-950 border border-orange-800 rounded p-2 text-xs text-orange-200"
}, Af = {
  key: 1,
  class: "px-4 py-3 border-b border-gray-700"
}, Ef = { class: "bg-gray-900 rounded p-2 font-mono text-xs break-all text-gray-300 select-all max-h-32 overflow-y-auto" }, If = { class: "text-yellow-400" }, zf = { class: "text-blue-400" }, Rf = { class: "text-red-400" }, Lf = {
  key: 2,
  class: "px-4 py-3 border-b border-gray-700"
}, Nf = { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, Mf = {
  key: 0,
  class: "text-orange-300 normal-case"
}, Ff = { class: "bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-48 overflow-y-auto select-all whitespace-pre" }, Df = {
  key: 3,
  class: "px-4 py-3 border-b border-gray-700"
}, Vf = { class: "bg-gray-900 rounded p-2 text-xs text-yellow-300 overflow-x-auto max-h-48 overflow-y-auto" }, Bf = {
  key: 4,
  class: "px-4 py-3 border-b border-gray-700"
}, Kf = { class: "bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-48 overflow-y-auto" }, Wf = {
  key: 5,
  class: "px-4 py-3 border-b border-gray-700"
}, Hf = { class: "bg-gray-900 rounded p-2 text-xs font-mono space-y-0.5 max-h-32 overflow-y-auto" }, Jf = { class: "text-blue-400 shrink-0" }, Uf = { class: "text-gray-300 break-all" }, Gf = {
  key: 6,
  class: "px-4 py-3 border-b border-gray-700"
}, qf = { class: "bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-64 overflow-y-auto whitespace-pre-wrap break-all" }, Yf = {
  key: 0,
  class: "text-xs text-gray-500 mb-1.5"
}, Xf = { class: "bg-gray-900 rounded p-2 text-xs text-cyan-300 overflow-x-auto max-h-48 overflow-y-auto select-all whitespace-pre-wrap break-all" }, Qf = {
  key: 8,
  class: "px-4 py-3"
}, Zf = { class: "bg-gray-900 rounded p-2 text-xs text-cyan-300 overflow-x-auto max-h-32 overflow-y-auto select-all whitespace-pre-wrap break-all" }, e0 = {
  key: 1,
  class: "flex items-center justify-center h-full text-gray-500 text-sm"
}, t0 = /* @__PURE__ */ Jt({
  __name: "AttackDetail",
  props: {
    result: {}
  },
  setup(e) {
    const t = e, r = ae(!1), o = ae(!1), s = ae(!1), n = ae(!1), a = Ee(() => {
      const v = t.result;
      return !v || v.technique !== "weakSecret" || !v.originalJWT ? null : `hashcat -a 0 -m 16500 ${v.originalJWT} /path/to/jwt.secrets.list`;
    });
    function i(v, T) {
      const L = v.replace(/\r\n/g, `
`);
      switch (T) {
        case "PEM (no trailing LF)":
          return btoa(L.replace(/\n+$/, ""));
        case "base64(PEM)":
          return btoa(btoa(L));
        case "DER":
          return L.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
        case "PEM":
        default:
          return btoa(L);
      }
    }
    function l(v) {
      try {
        return JSON.parse(vo(v));
      } catch {
        return null;
      }
    }
    const c = Ee(() => {
      const v = t.result;
      if (!v || !v.originalJWT || v.infoOnly) return null;
      const T = "python3 jwt_tool.py", L = `'${v.originalJWT}'`, E = l(v.modifiedJWT.split(".")[0] ?? "") ?? {};
      switch (v.technique) {
        case "algConfusion":
          return v.keyPem ? {
            cmd: `echo -n '${i(v.keyPem, v.secretEncoding ?? "PEM")}' | base64 -d > /tmp/jwt_pubkey
${T} ${L} -X k -pk /tmp/jwt_pubkey`,
            note: `Byte-exact. Writes the precise HMAC secret (${v.secretEncoding}) to a file, then forges the same token.` + (v.secretEncoding === "DER" ? " Note: DER is raw binary; jwt_tool reads the key file as text and may fail on it." : "")
          } : null;
        case "none":
          return {
            cmd: `${T} ${L} -X a`,
            note: "Emits the alg:none variants (none/None/NONE/nOnE) with the signature stripped — pick the casing matching this row."
          };
        case "nullSig":
          return {
            cmd: `${T} ${L} -X n`,
            note: "Produces the null-signature token (CVE-2020-28042)."
          };
        case "embeddedJwk":
          return {
            cmd: `${T} ${L} -X i`,
            note: "CVE-2018-0114. jwt_tool generates its OWN embedded key, so the jwk and signature differ from this row, but the attack is equivalent."
          };
        case "jkuSpoof":
        case "x5uSpoof": {
          const F = v.technique === "x5uSpoof" ? "x5u" : "jku", Y = typeof E[F] == "string" ? E[F] : "<your-jwks-url>", q = typeof E.kid == "string" ? E.kid : "jwt-attacker-spoof-key";
          return v.signingKeyPem ? {
            cmd: `echo -n '${btoa(v.signingKeyPem)}' | base64 -d > /tmp/priv.key
${T} ${L} -I -hc ${F} -hv '${Y}' -hc kid -hv '${q}' -S rs256 -pr /tmp/priv.key`,
            note: `Writes the spoofing private key to /tmp/priv.key, then re-signs with it — using the SAME key as the hosted JWKS, so the token validates. Inject the ${F} + kid headers and sign RS256. Host the JWKS (Configuration tab) at the ${F} URL.`
          } : {
            cmd: `${T} ${L} -X s -ju '${Y}'`,
            note: "Signing key unavailable; jwt_tool's -X s uses its OWN key (won't match the hosted JWKS)."
          };
        }
        case "kidInject": {
          const F = typeof E.kid == "string" ? E.kid : "", Y = v.hmacSecret ?? "";
          return {
            cmd: `${T} ${L} -I -hc kid -hv '${F}' -S hs256 -p '${Y}'`,
            note: `Sets kid="${F}" and signs HS256 with the secret this injection implies ("${Y}").`
          };
        }
        case "weakSecret": {
          const F = (typeof E.alg == "string" ? E.alg : "HS256").toLowerCase();
          return v.hmacSecret === void 0 ? {
            cmd: `# Crack the secret from a wordlist:
${T} ${L} -C -d /path/to/jwt.secrets.list`,
            note: "No secret matched the bundled lists. Try a larger wordlist with jwt_tool's crack mode (or hashcat, below)."
          } : {
            cmd: `# Crack the secret from a wordlist:
${T} ${L} -C -d /path/to/jwt.secrets.list
# Forge with the cracked secret:
${T} ${L} -S ${F} -p '${v.hmacSecret}'`,
            note: "Crack mode recovers the secret; the second command re-signs. Add -I -pc role -pv admin (etc.) to escalate claims."
          };
        }
        case "claimTamper": {
          const F = l(v.originalJWT.split(".")[1] ?? "") ?? {}, Y = l(v.modifiedJWT.split(".")[1] ?? "") ?? {}, q = [], V = [];
          for (const N of Object.keys(Y))
            if (JSON.stringify(Y[N]) !== JSON.stringify(F[N])) {
              const X = typeof Y[N] == "string" ? Y[N] : JSON.stringify(Y[N]);
              q.push(`-pc ${N} -pv '${X}'`);
            }
          for (const N of Object.keys(F)) N in Y || V.push(N);
          if (q.length) {
            let N = `${T} ${L} -I ${q.join(" ")}`;
            return V.length && (N += `
# Then delete claims interactively: ${T} ${L} -T   (remove: ${V.join(", ")})`), {
              cmd: N,
              note: "Tampers claims while leaving the original (invalid) signature — surfaces servers that skip verification. Non-string values are injected as strings; adjust if needed."
            };
          }
          return V.length ? {
            cmd: `${T} ${L} -T   # interactively delete claims: ${V.join(", ")}`,
            note: "jwt_tool can't delete claims non-interactively; use -T (tamper) mode and remove the listed claims."
          } : null;
        }
        default:
          return null;
      }
    }), u = Ee(() => {
      if (!t.result) return ["", "", ""];
      const v = t.result.modifiedJWT.split(".");
      return [v[0] ?? "", v[1] ?? "", v[2] ?? ""];
    }), d = Ee(() => {
      if (!t.result) return null;
      try {
        const v = vo(u.value[0]);
        return JSON.stringify(JSON.parse(v), null, 2);
      } catch {
        return null;
      }
    }), h = Ee(() => {
      if (!t.result) return null;
      try {
        const v = vo(u.value[1]);
        return JSON.stringify(JSON.parse(v), null, 2);
      } catch {
        return null;
      }
    });
    async function g() {
      t.result && (await navigator.clipboard.writeText(t.result.modifiedJWT), r.value = !0, setTimeout(() => {
        r.value = !1;
      }, 1500));
    }
    async function w() {
      var v;
      (v = t.result) != null && v.keyPem && (await navigator.clipboard.writeText(t.result.keyPem), o.value = !0, setTimeout(() => {
        o.value = !1;
      }, 1500));
    }
    async function k() {
      c.value && (await navigator.clipboard.writeText(c.value.cmd), s.value = !0, setTimeout(() => {
        s.value = !1;
      }, 1500));
    }
    async function _() {
      a.value && (await navigator.clipboard.writeText(a.value), n.value = !0, setTimeout(() => {
        n.value = !1;
      }, 1500));
    }
    return (v, T) => e.result ? (O(), I("div", mf, [
      R(" Technique header "),
      b("div", xf, [
        b(
          "span",
          {
            class: ye(["px-2 py-0.5 rounded text-xs font-mono font-semibold shrink-0", Se(Ta)(e.result.technique)])
          },
          P(e.result.technique),
          3
          /* TEXT, CLASS */
        ),
        b("div", vf, [
          b(
            "p",
            yf,
            P(e.result.techniqueName),
            1
            /* TEXT */
          ),
          b(
            "p",
            kf,
            P(e.result.description),
            1
            /* TEXT */
          )
        ])
      ]),
      b("div", wf, [
        R(" Status summary "),
        b("div", _f, [
          e.result.responseStatus ? (O(), I(
            "span",
            {
              key: 0,
              class: ye(["font-bold", Se(Ca)(e.result.responseStatus)])
            },
            " HTTP " + P(e.result.responseStatus),
            3
            /* TEXT, CLASS */
          )) : R("v-if", !0),
          e.result.responseLength !== void 0 ? (O(), I(
            "span",
            Sf,
            P(e.result.responseLength) + " bytes ",
            1
            /* TEXT */
          )) : R("v-if", !0),
          e.result.durationMs !== void 0 ? (O(), I(
            "span",
            Cf,
            P(e.result.durationMs) + "ms ",
            1
            /* TEXT */
          )) : R("v-if", !0),
          e.result.error ? (O(), I(
            "span",
            Tf,
            "Error: " + P(e.result.error),
            1
            /* TEXT */
          )) : R("v-if", !0)
        ]),
        R(" Weak-secret offline brute-force outcome "),
        e.result.technique === "weakSecret" ? (O(), I("section", jf, [
          T[1] || (T[1] = b(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Offline brute-force result",
            -1
            /* CACHED */
          )),
          e.result.hmacSecret !== void 0 ? (O(), I("div", $f, [
            T[0] || (T[0] = be(
              " ✓ Matched JWT secret: ",
              -1
              /* CACHED */
            )),
            b(
              "span",
              Pf,
              '"' + P(e.result.hmacSecret) + '"',
              1
              /* TEXT */
            )
          ])) : (O(), I(
            "div",
            Of,
            " JWT secret not found in list of " + P(e.result.secretsTested) + " secrets ",
            1
            /* TEXT */
          ))
        ])) : R("v-if", !0),
        R(" Modified JWT (hidden for info-only rows such as JWKS verification) "),
        e.result.modifiedJWT ? (O(), I("section", Af, [
          T[4] || (T[4] = b(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Modified JWT",
            -1
            /* CACHED */
          )),
          b("div", Ef, [
            b(
              "span",
              If,
              P(u.value[0]),
              1
              /* TEXT */
            ),
            T[2] || (T[2] = be(
              ".",
              -1
              /* CACHED */
            )),
            b(
              "span",
              zf,
              P(u.value[1]),
              1
              /* TEXT */
            ),
            T[3] || (T[3] = be(
              ".",
              -1
              /* CACHED */
            )),
            b(
              "span",
              Rf,
              P(u.value[2]),
              1
              /* TEXT */
            )
          ]),
          b(
            "button",
            {
              onClick: g,
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            P(r.value ? "✓ Copied" : "Copy JWT"),
            1
            /* TEXT */
          )
        ])) : R("v-if", !0),
        R(" Public key / certificate used (algorithm confusion) "),
        e.result.keyPem ? (O(), I("section", Lf, [
          b("p", Nf, [
            T[5] || (T[5] = be(
              " Public Key / Certificate Used ",
              -1
              /* CACHED */
            )),
            e.result.secretEncoding ? (O(), I(
              "span",
              Mf,
              " — HMAC secret: " + P(e.result.secretEncoding),
              1
              /* TEXT */
            )) : R("v-if", !0)
          ]),
          b(
            "pre",
            Ff,
            P(e.result.keyPem),
            1
            /* TEXT */
          ),
          b(
            "button",
            {
              onClick: w,
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            P(o.value ? "✓ Copied" : "Copy PEM"),
            1
            /* TEXT */
          )
        ])) : R("v-if", !0),
        R(" Decoded header "),
        d.value ? (O(), I("section", Df, [
          T[6] || (T[6] = b(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Decoded Header",
            -1
            /* CACHED */
          )),
          b(
            "pre",
            Vf,
            P(d.value),
            1
            /* TEXT */
          )
        ])) : R("v-if", !0),
        R(" Decoded payload "),
        h.value ? (O(), I("section", Bf, [
          T[7] || (T[7] = b(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Decoded Payload",
            -1
            /* CACHED */
          )),
          b(
            "pre",
            Kf,
            P(h.value),
            1
            /* TEXT */
          )
        ])) : R("v-if", !0),
        R(" Response headers "),
        e.result.responseHeaders && Object.keys(e.result.responseHeaders).length ? (O(), I("section", Wf, [
          T[8] || (T[8] = b(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Response Headers",
            -1
            /* CACHED */
          )),
          b("div", Hf, [
            (O(!0), I(
              ne,
              null,
              De(e.result.responseHeaders, (L, E) => (O(), I("div", {
                key: E,
                class: "flex gap-2"
              }, [
                b(
                  "span",
                  Jf,
                  P(E) + ":",
                  1
                  /* TEXT */
                ),
                b(
                  "span",
                  Uf,
                  P(L),
                  1
                  /* TEXT */
                )
              ]))),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])) : R("v-if", !0),
        R(" Response body "),
        e.result.responseBody ? (O(), I("section", Gf, [
          T[9] || (T[9] = b(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Response Body",
            -1
            /* CACHED */
          )),
          b(
            "pre",
            qf,
            P(e.result.responseBody),
            1
            /* TEXT */
          )
        ])) : R("v-if", !0),
        R(" Reproduce with jwt_tool "),
        c.value ? (O(), I(
          "section",
          {
            key: 7,
            class: ye(["px-4 py-3", a.value ? "border-b border-gray-700" : ""])
          },
          [
            T[10] || (T[10] = b(
              "p",
              { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
              "Reproduce with jwt_tool",
              -1
              /* CACHED */
            )),
            c.value.note ? (O(), I(
              "p",
              Yf,
              P(c.value.note),
              1
              /* TEXT */
            )) : R("v-if", !0),
            b(
              "pre",
              Xf,
              P(c.value.cmd),
              1
              /* TEXT */
            ),
            b(
              "button",
              {
                onClick: k,
                class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
              },
              P(s.value ? "✓ Copied" : "Copy commands"),
              1
              /* TEXT */
            )
          ],
          2
          /* CLASS */
        )) : R("v-if", !0),
        R(" Identifying secret with hashcat (weak-secret only) "),
        a.value ? (O(), I("section", Qf, [
          T[11] || (T[11] = b(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Identifying secret with hashcat",
            -1
            /* CACHED */
          )),
          T[12] || (T[12] = b(
            "p",
            { class: "text-xs text-gray-500 mb-1.5" },
            " Offline crack with hashcat (mode 16500 = JWT / HMAC-SHA). Point the last argument at the wordlist on disk. ",
            -1
            /* CACHED */
          )),
          b(
            "pre",
            Zf,
            P(a.value),
            1
            /* TEXT */
          ),
          b(
            "button",
            {
              onClick: _,
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            P(n.value ? "✓ Copied" : "Copy command"),
            1
            /* TEXT */
          )
        ])) : R("v-if", !0)
      ])
    ])) : (O(), I("div", e0, " Select an attack to see details "));
  }
}), r0 = {
  key: 0,
  class: "h-full flex flex-col overflow-hidden text-sm"
}, o0 = { class: "px-4 py-3 border-b border-gray-700 bg-gray-900 flex items-start gap-3" }, s0 = { class: "px-2 py-0.5 rounded text-xs font-mono font-semibold shrink-0 bg-cyan-800 text-cyan-100" }, n0 = { class: "flex-1 min-w-0" }, a0 = { class: "text-gray-400 text-xs mt-0.5" }, i0 = { class: "flex-1 overflow-y-auto" }, l0 = { class: "px-4 py-3 border-b border-gray-700" }, c0 = { class: "bg-gray-900 rounded p-2 font-mono text-xs break-all text-cyan-300 select-all" }, u0 = { class: "px-4 py-3 border-b border-gray-700" }, d0 = { class: "text-gray-300 text-xs" }, f0 = {
  key: 0,
  class: "px-4 py-3 border-b border-gray-700"
}, p0 = { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, b0 = { class: "bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-48 overflow-y-auto select-all whitespace-pre" }, g0 = ["onClick"], h0 = { class: "text-xs text-gray-500 mt-2 mb-1" }, m0 = { class: "flex items-center gap-2" }, x0 = { class: "text-xs font-mono text-orange-300" }, v0 = ["onClick"], y0 = { class: "bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-24 overflow-y-auto select-all whitespace-pre-wrap break-all" }, k0 = { class: "px-4 py-3" }, w0 = { class: "bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap break-all" }, _0 = {
  key: 1,
  class: "flex items-center justify-center h-full text-gray-500 text-sm"
}, S0 = /* @__PURE__ */ Jt({
  __name: "EndpointDetail",
  props: {
    endpoint: {}
  },
  setup(e) {
    const t = e, r = ae(null);
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
    const s = Ee(
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
    return (a, i) => e.endpoint ? (O(), I("div", r0, [
      R(" Header "),
      b("div", o0, [
        b(
          "span",
          s0,
          P(e.endpoint.source),
          1
          /* TEXT */
        ),
        b("div", n0, [
          i[2] || (i[2] = b(
            "p",
            { class: "font-semibold text-gray-100" },
            "Discovered key endpoint",
            -1
            /* CACHED */
          )),
          b(
            "p",
            a0,
            P(e.endpoint.keyCount) + " key(s) extracted and used for algorithm-confusion attacks. ",
            1
            /* TEXT */
          )
        ])
      ]),
      b("div", i0, [
        R(" URL "),
        b("section", l0, [
          i[3] || (i[3] = b(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "URL",
            -1
            /* CACHED */
          )),
          b(
            "div",
            c0,
            P(e.endpoint.url),
            1
            /* TEXT */
          ),
          b(
            "button",
            {
              onClick: i[0] || (i[0] = (l) => n(e.endpoint.url, "url")),
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            P(r.value === "url" ? "✓ Copied" : "Copy URL"),
            1
            /* TEXT */
          )
        ]),
        R(" Keys extracted "),
        b("section", u0, [
          i[4] || (i[4] = b(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Keys extracted",
            -1
            /* CACHED */
          )),
          b(
            "p",
            d0,
            P(e.endpoint.keyCount),
            1
            /* TEXT */
          )
        ]),
        R(" PEM keys + the HMAC secret encodings used in algorithm confusion "),
        s.value.length ? (O(), I("section", f0, [
          b(
            "p",
            p0,
            " PEM-encoded " + P(s.value.length > 1 ? "keys" : "key") + " used in algorithm-confusion attacks ",
            1
            /* TEXT */
          ),
          (O(!0), I(
            ne,
            null,
            De(s.value, (l, c) => (O(), I("div", {
              key: c,
              class: "mb-4 last:mb-0"
            }, [
              b(
                "pre",
                b0,
                P(l.pem),
                1
                /* TEXT */
              ),
              b("button", {
                onClick: (u) => n(l.pem, "pem-" + c),
                class: "mt-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
              }, P(r.value === "pem-" + c ? "✓ Copied" : "Copy PEM"), 9, g0),
              b(
                "p",
                h0,
                " HMAC secret encodings tried with this key (key " + P(c + 1) + "): ",
                1
                /* TEXT */
              ),
              (O(!0), I(
                ne,
                null,
                De(l.variants, (u, d) => (O(), I("div", {
                  key: d,
                  class: "mb-1.5"
                }, [
                  b("div", m0, [
                    b(
                      "span",
                      x0,
                      P(u.label),
                      1
                      /* TEXT */
                    ),
                    b("button", {
                      onClick: (h) => n(u.value, `var-${c}-${d}`),
                      class: "text-xs text-gray-500 hover:text-gray-300 transition-colors"
                    }, P(r.value === `var-${c}-${d}` ? "✓ Copied" : "Copy"), 9, v0)
                  ]),
                  b(
                    "pre",
                    y0,
                    P(u.value),
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
        ])) : R("v-if", !0),
        R(" Raw content returned "),
        b("section", k0, [
          i[5] || (i[5] = b(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Content returned by URL",
            -1
            /* CACHED */
          )),
          b(
            "pre",
            w0,
            P(e.endpoint.content || "(empty)"),
            1
            /* TEXT */
          ),
          b(
            "button",
            {
              onClick: i[1] || (i[1] = (l) => n(e.endpoint.content, "content")),
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            P(r.value === "content" ? "✓ Copied" : "Copy Content"),
            1
            /* TEXT */
          )
        ])
      ])
    ])) : (O(), I("div", _0, " Select an item to see details "));
  }
}), C0 = {
  key: 0,
  class: "h-full flex flex-col overflow-hidden text-sm"
}, T0 = { class: "px-4 py-3 border-b border-gray-700 bg-gray-900 flex items-start gap-3" }, j0 = { class: "flex-1 min-w-0" }, $0 = { class: "text-gray-400 text-xs mt-0.5" }, P0 = { class: "flex-1 overflow-y-auto" }, O0 = { class: "px-4 py-3 border-b border-gray-700 space-y-1.5" }, A0 = { class: "flex items-center gap-2" }, E0 = { class: "flex items-center gap-2" }, I0 = { class: "flex items-start gap-2" }, z0 = { class: "text-xs font-mono text-cyan-300 break-all" }, R0 = { class: "px-4 py-3 border-b border-gray-700" }, L0 = { class: "bg-gray-900 rounded p-2 text-xs text-green-300 overflow-x-auto max-h-56 overflow-y-auto select-all whitespace-pre" }, N0 = {
  key: 0,
  class: "px-4 py-3 border-b border-gray-700"
}, M0 = { class: "bg-gray-900 rounded p-2 text-xs text-gray-300 overflow-x-auto max-h-56 overflow-y-auto whitespace-pre-wrap break-all" }, F0 = { class: "px-4 py-3" }, D0 = { class: "bg-gray-900 rounded p-2 text-xs text-yellow-300 overflow-x-auto max-h-40 overflow-y-auto select-all whitespace-pre" }, V0 = {
  key: 1,
  class: "flex items-center justify-center h-full text-gray-500 text-sm"
}, B0 = /* @__PURE__ */ Jt({
  __name: "SpoofDetail",
  props: {
    spoof: {}
  },
  setup(e) {
    const t = e, r = ae(null), o = Ee(() => {
      var n;
      switch ((n = t.spoof) == null ? void 0 : n.verifyStatus) {
        case "verified":
          return { label: "✓ Verified", cls: "bg-green-800 text-green-100", textCls: "text-green-400", detail: "Hosted JWKS matches the spoofing key" };
        case "mismatch":
          return { label: "✗ Mismatch", cls: "bg-red-900 text-red-100", textCls: "text-red-400", detail: "Hosted JWKS does NOT match — re-host it" };
        case "unreachable":
          return { label: "⚠ Unreachable", cls: "bg-orange-900 text-orange-100", textCls: "text-orange-400", detail: "Could not fetch the JWKS URL" };
        default:
          return { label: "⚠ No URL", cls: "bg-gray-700 text-gray-200", textCls: "text-gray-400", detail: "No JWKS Endpoint URL configured" };
      }
    });
    async function s(n, a) {
      await navigator.clipboard.writeText(n), r.value = a, setTimeout(() => {
        r.value = null;
      }, 1500);
    }
    return (n, a) => e.spoof ? (O(), I("div", C0, [
      R(" Header "),
      b("div", T0, [
        b(
          "span",
          {
            class: ye(["px-2 py-0.5 rounded text-xs font-mono font-semibold shrink-0", o.value.cls])
          },
          P(o.value.label),
          3
          /* TEXT, CLASS */
        ),
        b("div", j0, [
          a[3] || (a[3] = b(
            "p",
            { class: "font-semibold text-gray-100" },
            "JKU / X5U Spoofing",
            -1
            /* CACHED */
          )),
          b(
            "p",
            $0,
            P(e.spoof.verifyMessage),
            1
            /* TEXT */
          )
        ])
      ]),
      b("div", P0, [
        R(" Status summary "),
        b("section", O0, [
          b("div", A0, [
            a[4] || (a[4] = b(
              "span",
              { class: "text-xs text-gray-500 w-40 shrink-0" },
              "Endpoint check",
              -1
              /* CACHED */
            )),
            b(
              "span",
              {
                class: ye(["text-xs font-medium", o.value.textCls])
              },
              P(o.value.detail),
              3
              /* TEXT, CLASS */
            )
          ]),
          b("div", E0, [
            a[5] || (a[5] = b(
              "span",
              { class: "text-xs text-gray-500 w-40 shrink-0" },
              "Token self-verification",
              -1
              /* CACHED */
            )),
            b(
              "span",
              {
                class: ye(["text-xs font-medium", e.spoof.selfVerified ? "text-green-400" : "text-red-400"])
              },
              P(e.spoof.selfVerified ? "✓ Signed token validates against this JWKS" : "✗ Signed token did NOT validate"),
              3
              /* TEXT, CLASS */
            )
          ]),
          b("div", I0, [
            a[6] || (a[6] = b(
              "span",
              { class: "text-xs text-gray-500 w-40 shrink-0" },
              "JWKS Endpoint URL",
              -1
              /* CACHED */
            )),
            b(
              "span",
              z0,
              P(e.spoof.url),
              1
              /* TEXT */
            )
          ])
        ]),
        R(" JWKS to host "),
        b("section", R0, [
          a[7] || (a[7] = b(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "JWKS to host (at the URL above)",
            -1
            /* CACHED */
          )),
          b(
            "pre",
            L0,
            P(e.spoof.jwksJson),
            1
            /* TEXT */
          ),
          b(
            "button",
            {
              onClick: a[0] || (a[0] = (i) => s(e.spoof.jwksJson, "jwks")),
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            P(r.value === "jwks" ? "✓ Copied" : "Copy JWKS"),
            1
            /* TEXT */
          )
        ]),
        R(" Content actually fetched from the URL "),
        e.spoof.fetchedContent ? (O(), I("section", N0, [
          a[8] || (a[8] = b(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Content returned by the URL",
            -1
            /* CACHED */
          )),
          b(
            "pre",
            M0,
            P(e.spoof.fetchedContent),
            1
            /* TEXT */
          ),
          b(
            "button",
            {
              onClick: a[1] || (a[1] = (i) => s(e.spoof.fetchedContent, "fetched")),
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            P(r.value === "fetched" ? "✓ Copied" : "Copy"),
            1
            /* TEXT */
          )
        ])) : R("v-if", !0),
        R(" Signing private key "),
        b("section", F0, [
          a[9] || (a[9] = b(
            "p",
            { class: "text-xs text-gray-500 uppercase tracking-wide mb-1" },
            "Signing private key (spoofing key pair)",
            -1
            /* CACHED */
          )),
          b(
            "pre",
            D0,
            P(e.spoof.privateKeyPem),
            1
            /* TEXT */
          ),
          b(
            "button",
            {
              onClick: a[2] || (a[2] = (i) => s(e.spoof.privateKeyPem, "key")),
              class: "mt-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            },
            P(r.value === "key" ? "✓ Copied" : "Copy private key"),
            1
            /* TEXT */
          )
        ])
      ])
    ])) : (O(), I("div", V0, " Select an item to see details "));
  }
}), ja = /* @__PURE__ */ ba("config", () => {
  const e = ae({ ...Hr }), t = ae(!1);
  let r = null;
  function o(c) {
    r = c;
  }
  async function s() {
    if (r)
      try {
        const c = await r.storage.get("config");
        c && typeof c == "object" && (e.value = { ...Hr, ...c });
      } catch {
      }
  }
  async function n() {
    if (r)
      try {
        await r.storage.set("config", e.value);
      } catch {
      }
  }
  function a(c) {
    e.value = { ...e.value, ...c };
  }
  async function i() {
    if (!(!r || t.value)) {
      t.value = !0;
      try {
        const { privateKeyPem: c, jwksJson: u } = await r.backend.generateSpoofKeyPair();
        e.value = { ...e.value, spoofPrivateKeyPem: c, spoofJwksJson: u }, await n();
      } finally {
        t.value = !1;
      }
    }
  }
  async function l() {
    r && (e.value.spoofPrivateKeyPem && e.value.spoofJwksJson || await i());
  }
  return { config: e, regenerating: t, setSDK: o, load: s, save: n, update: a, regenerateSpoofKeyPair: i, ensureSpoofKeyPair: l };
}), K0 = { class: "h-full overflow-y-auto px-4 py-4 space-y-6 text-sm" }, W0 = { class: "mt-3" }, H0 = { class: "flex items-center justify-between mb-1" }, J0 = { class: "flex items-center gap-3" }, U0 = ["disabled"], G0 = ["value"], q0 = { class: "space-y-3" }, Y0 = ["value"], X0 = { class: "text-xs text-gray-500 mt-1" }, Q0 = ["value"], Z0 = { class: "space-y-2" }, ep = ["checked", "onChange"], tp = { class: "text-gray-300" }, rp = { class: "flex items-start gap-2 cursor-pointer select-none" }, op = { class: "pt-2 flex gap-3" }, sp = {
  key: 0,
  class: "text-xs text-green-400 self-center"
}, np = /* @__PURE__ */ Jt({
  __name: "ConfigPanel",
  setup(e) {
    const t = ja(), r = (u) => JSON.parse(JSON.stringify(u)), o = Ht(r(t.config)), s = ae(!1), n = ae(!1);
    Ye(() => t.config, (u) => Object.assign(o, r(u)), { deep: !0 });
    function a() {
      o.jwksPaths = [...Hr.jwksPaths];
    }
    async function i() {
      t.update({ ...o }), await t.regenerateSpoofKeyPair();
    }
    async function l() {
      o.spoofJwksJson && (await navigator.clipboard.writeText(o.spoofJwksJson), n.value = !0, setTimeout(() => {
        n.value = !1;
      }, 1500));
    }
    async function c() {
      t.update({ ...o }), await t.save(), s.value = !0, setTimeout(() => {
        s.value = !1;
      }, 2e3);
    }
    return (u, d) => (O(), I("div", K0, [
      b("section", null, [
        d[9] || (d[9] = b(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "JKU / X5U Spoofing",
          -1
          /* CACHED */
        )),
        d[10] || (d[10] = b(
          "label",
          { class: "block mb-1 text-gray-300" },
          "JWKS Endpoint URL",
          -1
          /* CACHED */
        )),
        Ct(b(
          "input",
          {
            "onUpdate:modelValue": d[0] || (d[0] = (h) => o.jwksUrl = h),
            type: "url",
            placeholder: "https://attacker.example.com/jwks.json",
            class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [Tr, o.jwksUrl]
        ]),
        d[11] || (d[11] = b(
          "p",
          { class: "text-xs text-gray-500 mt-1" },
          " Host the JWKS JSON below at this URL so the target server can fetch the attacker's key. ",
          -1
          /* CACHED */
        )),
        R(" JWKS document to host (matches the persisted spoofing key pair) "),
        b("div", W0, [
          b("div", H0, [
            d[7] || (d[7] = b(
              "label",
              { class: "block text-gray-300" },
              [
                be("JWKS to host ("),
                b("code", null, "jwks.json"),
                be(")")
              ],
              -1
              /* CACHED */
            )),
            b("div", J0, [
              b(
                "button",
                {
                  onClick: l,
                  class: "text-xs text-gray-400 hover:text-blue-400 transition-colors"
                },
                P(n.value ? "✓ Copied" : "Copy"),
                1
                /* TEXT */
              ),
              b("button", {
                onClick: i,
                disabled: Se(t).regenerating,
                class: "text-xs text-gray-400 hover:text-blue-400 transition-colors disabled:opacity-50",
                title: "Generate a new key pair and JWKS (invalidates the previously hosted one)"
              }, P(Se(t).regenerating ? "Regenerating…" : "↻ Regenerate key pair"), 9, U0)
            ])
          ]),
          b("textarea", {
            value: o.spoofJwksJson,
            readonly: "",
            rows: "10",
            placeholder: "(generated automatically on first run)",
            class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-green-300 text-xs font-mono focus:outline-none resize-y"
          }, null, 8, G0),
          d[8] || (d[8] = b(
            "p",
            { class: "text-xs text-gray-500 mt-1" },
            " Auto-generated and stored on install. The JKU/X5U spoofing attack signs tokens with the matching private key, so host this exact document. Use Regenerate to rotate the key pair — you must then re-host the new JWKS. ",
            -1
            /* CACHED */
          ))
        ])
      ]),
      b("section", null, [
        d[15] || (d[15] = b(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Custom Keys / Certificate",
          -1
          /* CACHED */
        )),
        b("div", q0, [
          b("div", null, [
            d[12] || (d[12] = b(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Public Key (PEM)",
              -1
              /* CACHED */
            )),
            Ct(b(
              "textarea",
              {
                "onUpdate:modelValue": d[1] || (d[1] = (h) => o.customPublicKeyPem = h),
                rows: "4",
                placeholder: `-----BEGIN PUBLIC KEY-----
...`,
                class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [Tr, o.customPublicKeyPem]
            ])
          ]),
          b("div", null, [
            d[13] || (d[13] = b(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Private Key (PEM) — for JKU/X5U spoofing",
              -1
              /* CACHED */
            )),
            Ct(b(
              "textarea",
              {
                "onUpdate:modelValue": d[2] || (d[2] = (h) => o.customPrivateKeyPem = h),
                rows: "4",
                placeholder: `-----BEGIN PRIVATE KEY-----
...`,
                class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [Tr, o.customPrivateKeyPem]
            ])
          ]),
          b("div", null, [
            d[14] || (d[14] = b(
              "label",
              { class: "block mb-1 text-gray-300" },
              "Certificate (PEM) — for algorithm confusion",
              -1
              /* CACHED */
            )),
            Ct(b(
              "textarea",
              {
                "onUpdate:modelValue": d[3] || (d[3] = (h) => o.customCertPem = h),
                rows: "4",
                placeholder: `-----BEGIN CERTIFICATE-----
...`,
                class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [Tr, o.customCertPem]
            ])
          ])
        ])
      ]),
      b("section", null, [
        b("div", { class: "flex items-center justify-between mb-3" }, [
          d[16] || (d[16] = b(
            "h2",
            { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider" },
            "JWKS Discovery Paths",
            -1
            /* CACHED */
          )),
          b("button", {
            onClick: a,
            class: "text-xs text-gray-400 hover:text-blue-400 transition-colors",
            title: "Restore the built-in default JWKS path list"
          }, "↺ Reset to defaults")
        ]),
        b("textarea", {
          value: o.jwksPaths.join(`
`),
          onInput: d[4] || (d[4] = (h) => o.jwksPaths = h.target.value.split(`
`).map((g) => g.trim()).filter(Boolean)),
          rows: "10",
          placeholder: `/.well-known/jwks.json
/jwks.json`,
          class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-y"
        }, null, 40, Y0),
        b(
          "p",
          X0,
          " One path per line. These are the exact paths probed on the target host for a JWKS. Edit freely — use Reset to restore the built-in defaults (" + P(Se(Hr).jwksPaths.length) + " paths). ",
          1
          /* TEXT */
        )
      ]),
      b("section", null, [
        d[17] || (d[17] = b(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Custom Wordlist (Weak Secret)",
          -1
          /* CACHED */
        )),
        b("textarea", {
          value: o.customWordlist.join(`
`),
          onInput: d[5] || (d[5] = (h) => o.customWordlist = h.target.value.split(`
`).map((g) => g.trim()).filter(Boolean)),
          rows: "4",
          placeholder: `mysecret
appkey123`,
          class: "w-full bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-gray-200 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none"
        }, null, 40, Q0),
        d[18] || (d[18] = b(
          "p",
          { class: "text-xs text-gray-500 mt-1" },
          "One word per line. Appended to the built-in list of ~120 common JWT secrets.",
          -1
          /* CACHED */
        ))
      ]),
      b("section", null, [
        d[19] || (d[19] = b(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Enabled Attacks",
          -1
          /* CACHED */
        )),
        b("div", Z0, [
          (O(!0), I(
            ne,
            null,
            De(Se(Fd), (h, g) => (O(), I("label", {
              key: g,
              class: "flex items-center gap-2 cursor-pointer select-none"
            }, [
              b("input", {
                type: "checkbox",
                checked: o.enabledAttacks[g] ?? !0,
                onChange: (w) => o.enabledAttacks[g] = w.target.checked,
                class: "accent-blue-500"
              }, null, 40, ep),
              b(
                "span",
                tp,
                P(h),
                1
                /* TEXT */
              )
            ]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      b("section", null, [
        d[21] || (d[21] = b(
          "h2",
          { class: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" },
          "Experimental",
          -1
          /* CACHED */
        )),
        b("label", rp, [
          Ct(b(
            "input",
            {
              type: "checkbox",
              "onUpdate:modelValue": d[6] || (d[6] = (h) => o.enableKeyRecovery = h),
              class: "accent-blue-500 mt-0.5"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [Wl, o.enableKeyRecovery]
          ]),
          d[20] || (d[20] = b(
            "span",
            { class: "text-gray-300" },
            [
              be(" RSA public-key recovery from HTTP history "),
              b("span", { class: "block text-xs text-gray-500 mt-0.5" }, [
                be(" Recovers the public key from 2+ same-host RS/PS JWTs (silentsignal rsa_sign2n method), then runs algorithm-confusion with it. Off by default. The GCD of two ~16 MB integers (sig"),
                b("sup", null, "65537"),
                be(") is O(n²) in a JS runtime with no GMP, so for 2048-bit/e=65537 keys this can take a "),
                b("strong", null, "very long time"),
                be(" (tens of minutes to hours) and blocks the backend while it runs. For fast results, run "),
                b("code", null, "rsa_sign2n"),
                be(" externally and paste the recovered key into the Public Key field above. e=3 keys recover quickly. ")
              ])
            ],
            -1
            /* CACHED */
          ))
        ])
      ]),
      b("div", op, [
        b("button", {
          onClick: c,
          class: "px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
        }, " Save "),
        s.value ? (O(), I("span", sp, "✓ Saved")) : R("v-if", !0)
      ])
    ]));
  }
}), ap = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [o, s] of t)
    r[o] = s;
  return r;
}, ip = /* @__PURE__ */ ap(np, [["__scopeId", "data-v-71c3100f"]]), lp = {
  id: "plugin--jwt-attacker",
  class: "h-full flex flex-col bg-gray-950 text-gray-200 overflow-hidden"
}, cp = { class: "flex items-center gap-1 px-3 py-2 border-b border-gray-700 bg-gray-900 shrink-0" }, up = ["onClick"], dp = { class: "flex-1 flex overflow-hidden min-h-0" }, fp = { class: "w-[42%] shrink-0 border-r border-gray-700 overflow-hidden flex flex-col" }, pp = { class: "flex-1 overflow-hidden" }, bp = { class: "flex-1 overflow-hidden" }, gp = /* @__PURE__ */ Jt({
  __name: "App",
  setup(e) {
    const t = ae("results"), r = ae(null), o = ae(null), s = ae(null);
    function n(c) {
      r.value = c, o.value = null, s.value = null;
    }
    function a(c) {
      o.value = c, r.value = null, s.value = null;
    }
    function i(c) {
      s.value = c, r.value = null, o.value = null;
    }
    const l = [
      { id: "results", label: "Results" },
      { id: "config", label: "Configuration" }
    ];
    return (c, u) => {
      var d, h;
      return O(), I("div", lp, [
        R(" Top bar "),
        b("div", cp, [
          u[0] || (u[0] = b(
            "span",
            { class: "text-base font-bold text-yellow-400 mr-2" },
            "🔑 JWT Attacker",
            -1
            /* CACHED */
          )),
          (O(), I(
            ne,
            null,
            De(l, (g) => b("button", {
              key: g.id,
              onClick: (w) => t.value = g.id,
              class: ye([
                "px-3 py-1 rounded text-xs font-medium transition-colors",
                t.value === g.id ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-200"
              ])
            }, P(g.label), 11, up)),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        R(" Results tab: split pane "),
        Ct(b(
          "div",
          dp,
          [
            b("div", fp, [
              Ke(hf, {
                "selected-id": (d = r.value) == null ? void 0 : d.id,
                "selected-endpoint-url": (h = o.value) == null ? void 0 : h.url,
                "selected-spoof": !!s.value,
                onSelect: n,
                onSelectEndpoint: a,
                onSelectSpoof: i
              }, null, 8, ["selected-id", "selected-endpoint-url", "selected-spoof"])
            ]),
            b("div", pp, [
              s.value ? (O(), Or(B0, {
                key: 0,
                spoof: s.value
              }, null, 8, ["spoof"])) : o.value ? (O(), Or(S0, {
                key: 1,
                endpoint: o.value
              }, null, 8, ["endpoint"])) : (O(), Or(t0, {
                key: 2,
                result: r.value ?? null
              }, null, 8, ["result"]))
            ])
          ],
          512
          /* NEED_PATCH */
        ), [
          [_s, t.value === "results"]
        ]),
        R(" Config tab "),
        Ct(b(
          "div",
          bp,
          [
            Ke(ip)
          ],
          512
          /* NEED_PATCH */
        ), [
          [_s, t.value === "config"]
        ])
      ]);
    };
  }
});
function hp(e) {
  console.log("[JWT Attacker] init() called");
  const t = Gl(gp), r = Xl();
  t.use(r), t.use(Uc, { unstyled: !0, pt: Nd });
  const o = document.createElement("div");
  o.id = "plugin--jwt-attacker-root", o.style.cssText = "height:100%;width:100%;overflow:hidden;", t.mount(o), e.navigation.addPage("/jwt-attacker", { body: o }), e.sidebar.registerItem("JWT Attacker", "/jwt-attacker", { icon: "fas fa-key" });
  const s = ja();
  s.setSDK(e), s.load().then(() => s.ensureSpoofKeyPair());
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
  }), e.backend.onEvent("jwks-spoof", ({ sessionId: a, ...i }) => {
    n.setSpoof(a, i);
  }), e.backend.onEvent("jwks-found", ({ sessionId: a, url: i, source: l, keyCount: c, content: u, pems: d }) => {
    n.addDiscoveredEndpoint(a, { url: i, source: l, keyCount: c, content: u, pems: d });
  }), e.commands.register("jwt-attacker.attack", {
    name: "Attack JWT",
    group: "JWT Attacker",
    run: async (a) => {
      console.log("[JWT Attacker] run() called, context.type =", a.type);
      const i = [];
      if (a.type === "RequestRowContext")
        for (const c of a.requests)
          i.push(c.id);
      else if (a.type === "RequestContext") {
        const c = a.request;
        "id" in c && c.id && i.push(c.id);
      }
      if (console.log("[JWT Attacker] requestIds:", i), i.length === 0) {
        console.warn("[JWT Attacker] No request IDs found in context");
        return;
      }
      await s.ensureSpoofKeyPair();
      const l = JSON.parse(JSON.stringify(s.config));
      console.log("[JWT Attacker] config being sent:", l);
      for (const c of i) {
        console.log("[JWT Attacker] calling backend attackJwt for id:", c);
        try {
          const u = await e.backend.attackJwt(c, l);
          console.log("[JWT Attacker] backend call returned:", u);
        } catch (u) {
          console.error("[JWT Attacker] backend call failed:", u);
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
  hp as init
};
