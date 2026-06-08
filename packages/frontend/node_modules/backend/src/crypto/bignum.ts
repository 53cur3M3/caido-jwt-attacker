/**
 * Arbitrary-precision non-negative integers built on arrays of LARGE native
 * BigInt limbs (little-endian, base 2^LIMB_BITS).
 *
 * Why: RSA key recovery needs sig^65537 (~16 MB integers) and a GCD of two such
 * numbers. LLRT's QuickJS BigInt can't allocate a single ~16 MB BigInt ("BigInt
 * is too large to allocate"), and a naive Euclid GCD on them would take tens of
 * millions of steps. So we:
 *   - split the giant numbers into limbs each well under the runtime's BigInt
 *     cap, doing schoolbook arithmetic but leaning on native BigInt (fast C) for
 *     the per-limb multiplies/divisions, and
 *   - use a Lehmer GCD, which performs the bulk of the reduction on single
 *     leading limbs and only a few full-precision multiply/subtract passes.
 *
 * LIMB_BITS is chosen large so the limb count L stays small (≈64 for a 16 MB
 * number) while each limb (and limb-product) stays far under the BigInt cap.
 */

const LIMB_BITS = 1n << 16n;        // 65,536 bits per limb (8 KB); product 16 KB
                                    // Kept well under runtime BigInt caps so recovery can run.

// BASE/MASK are huge (~256 KB) BigInts. They MUST NOT be created at module load:
// allocating one at import would crash the whole backend on runtimes with a low
// BigInt size cap. They are initialized lazily on first real use (i.e. only when
// key recovery actually runs), so importing this module is always cheap and safe.
let BASE = 0n;
let MASK = 0n;
function ensureInit(): void {
  if (BASE === 0n) {
    BASE = 1n << LIMB_BITS;
    MASK = BASE - 1n;
  }
}

export type Big = bigint[];          // little-endian limbs, each in [0, BASE); [] === 0

function norm(a: Big): Big {
  let i = a.length;
  while (i > 0 && a[i - 1] === 0n) i--;
  a.length = i;
  return a;
}

export function fromBigInt(x: bigint): Big {
  ensureInit();
  const out: Big = [];
  let v = x < 0n ? -x : x;
  while (v > 0n) { out.push(v & MASK); v >>= LIMB_BITS; }
  return out;
}

// Only safe when the value fits the runtime BigInt cap (use for small results).
export function toBigInt(a: Big): bigint {
  let v = 0n;
  for (let i = a.length - 1; i >= 0; i--) v = (v << LIMB_BITS) | a[i];
  return v;
}

export function isZero(a: Big): boolean { return a.length === 0; }

export function cmp(a: Big, b: Big): number {
  if (a.length !== b.length) return a.length < b.length ? -1 : 1;
  for (let i = a.length - 1; i >= 0; i--) {
    if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  }
  return 0;
}

export function add(a: Big, b: Big): Big {
  ensureInit();
  const out: Big = [];
  let carry = 0n;
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const cur = (a[i] ?? 0n) + (b[i] ?? 0n) + carry;
    out.push(cur & MASK);
    carry = cur >> LIMB_BITS;
  }
  if (carry) out.push(carry);
  return norm(out);
}

// a - b, requires a >= b
export function sub(a: Big, b: Big): Big {
  ensureInit();
  const out: Big = [];
  let borrow = 0n;
  for (let i = 0; i < a.length; i++) {
    let cur = a[i] - (b[i] ?? 0n) - borrow;
    if (cur < 0n) { cur += BASE; borrow = 1n; } else borrow = 0n;
    out.push(cur);
  }
  return norm(out);
}

export function mul(a: Big, b: Big): Big {
  ensureInit();
  if (a.length === 0 || b.length === 0) return [];
  const out: Big = new Array(a.length + b.length).fill(0n);
  for (let i = 0; i < a.length; i++) {
    const ai = a[i];
    let carry = 0n;
    let j = 0;
    for (; j < b.length; j++) {
      const cur = out[i + j] + ai * b[j] + carry;
      out[i + j] = cur & MASK;
      carry = cur >> LIMB_BITS;
    }
    let k = i + j;
    while (carry) {
      const cur = out[k] + carry;
      out[k] = cur & MASK;
      carry = cur >> LIMB_BITS;
      k++;
    }
  }
  return norm(out);
}

// Multiply by a single native scalar s in [0, BASE).
function mulScalar(a: Big, s: bigint): Big {
  if (s === 0n || a.length === 0) return [];
  const out: Big = [];
  let carry = 0n;
  for (let i = 0; i < a.length; i++) {
    const cur = a[i] * s + carry;
    out.push(cur & MASK);
    carry = cur >> LIMB_BITS;
  }
  while (carry) { out.push(carry & MASK); carry >>= LIMB_BITS; }
  return norm(out);
}

function shlBits(a: Big, s: bigint): Big {
  if (s === 0n || a.length === 0) return a.slice();
  const out: Big = [];
  let carry = 0n;
  for (let i = 0; i < a.length; i++) {
    const cur = (a[i] << s) | carry;
    out.push(cur & MASK);
    carry = cur >> LIMB_BITS;
  }
  if (carry) out.push(carry);
  return norm(out);
}

function shrBits(a: Big, s: bigint): Big {
  if (s === 0n || a.length === 0) return a.slice();
  const out: Big = new Array(a.length).fill(0n);
  const lowMask = (1n << s) - 1n;
  let carry = 0n;
  for (let i = a.length - 1; i >= 0; i--) {
    const cur = (carry << LIMB_BITS) | a[i];
    out[i] = cur >> s;
    carry = a[i] & lowMask;
  }
  return norm(out);
}

// [quotient, remainder] = u / v (Knuth Algorithm D, base 2^LIMB_BITS).
export function divmod(u0: Big, v0: Big): [Big, Big] {
  ensureInit();
  if (v0.length === 0) throw new Error("division by zero");
  if (cmp(u0, v0) < 0) return [[], u0.slice()];
  if (v0.length === 1) {
    const d = v0[0];
    const q: Big = new Array(u0.length).fill(0n);
    let rem = 0n;
    for (let i = u0.length - 1; i >= 0; i--) {
      const cur = (rem << LIMB_BITS) | u0[i];
      q[i] = cur / d;
      rem = cur % d;
    }
    return [norm(q), rem === 0n ? [] : [rem]];
  }

  const n = v0.length;
  const m = u0.length - n;

  // Normalize so the divisor's top limb has its high bit set. Compute the shift
  // directly (a bit-by-bit loop on a multi-Mbit limb would be catastrophic).
  const shift = LIMB_BITS - nativeBitLen(v0[n - 1]);
  const v = shlBits(v0, shift);
  const u = shlBits(u0, shift);
  while (u.length < m + n + 1) u.push(0n);

  const q: Big = new Array(m + 1).fill(0n);
  const vTop = v[n - 1];
  const vSecond = v[n - 2];

  for (let j = m; j >= 0; j--) {
    const numer = (u[j + n] << LIMB_BITS) | u[j + n - 1];
    let qhat = numer / vTop;
    let rhat = numer % vTop;
    while (qhat >= BASE || qhat * vSecond > (rhat << LIMB_BITS) + u[j + n - 2]) {
      qhat -= 1n;
      rhat += vTop;
      if (rhat >= BASE) break;
    }
    // multiply & subtract qhat*v from u[j..j+n]
    let borrow = 0n;
    let carry = 0n;
    for (let i = 0; i < n; i++) {
      const p = qhat * v[i] + carry;
      carry = p >> LIMB_BITS;
      let s = u[j + i] - (p & MASK) - borrow;
      if (s < 0n) { s += BASE; borrow = 1n; } else borrow = 0n;
      u[j + i] = s;
    }
    let s = u[j + n] - carry - borrow;
    if (s < 0n) {
      // qhat was one too large: add v back.
      s += BASE;
      qhat -= 1n;
      let c = 0n;
      for (let i = 0; i < n; i++) {
        const ss = u[j + i] + v[i] + c;
        u[j + i] = ss & MASK;
        c = ss >> LIMB_BITS;
      }
      s = (s + c) & MASK;
    }
    u[j + n] = s;
    q[j] = qhat;
  }

  const rem = shrBits(norm(u.slice(0, n)), shift);
  return [norm(q), rem];
}

export function mod(a: Big, b: Big): Big {
  return divmod(a, b)[1];
}

// Compute |cofA*A + cofB*B| where cofA, cofB are signed native scalars and the
// true result is known to be non-negative (Lehmer cofactor application).
function combine(cofA: bigint, A: Big, cofB: bigint, B: Big): Big {
  const pa = mulScalar(A, cofA < 0n ? -cofA : cofA);
  const pb = mulScalar(B, cofB < 0n ? -cofB : cofB);
  const aNeg = cofA < 0n;
  const bNeg = cofB < 0n;
  if (aNeg === bNeg) return add(pa, pb);        // same sign
  // opposite signs → subtract smaller magnitude from larger
  return cmp(pa, pb) >= 0 ? sub(pa, pb) : sub(pb, pa);
}

// Leading-bit window for Lehmer's algorithm. Small enough that the cofactors
// (< 2^WINDOW) stay well under a single-limb scalar, large enough that each
// outer iteration does many cheap inner steps before a full-precision apply.
const WINDOW = 1n << 13n; // 8192 bits

// Bit length of a native bigint, using coarse steps (a naive bit-by-bit loop on
// a multi-Mbit limb would be catastrophically slow — it dominated the GCD).
function nativeBitLen(t: bigint): bigint {
  if (t <= 0n) return 0n;
  let bits = 0n;
  while (t >= (1n << 4096n)) { t >>= 4096n; bits += 4096n; }
  while (t >= (1n << 64n)) { t >>= 64n; bits += 64n; }
  while (t > 0n) { t >>= 1n; bits++; }
  return bits;
}

function bitLength(a: Big): bigint {
  if (a.length === 0) return 0n;
  return BigInt(a.length - 1) * LIMB_BITS + nativeBitLen(a[a.length - 1]);
}

// floor(a / 2^shift) as a native bigint (caller keeps the result ~WINDOW bits).
function topBits(a: Big, shift: bigint): bigint {
  if (shift <= 0n) return toBigInt(a);
  const limbStart = Number(shift / LIMB_BITS);
  const bitRem = shift % LIMB_BITS;
  if (limbStart >= a.length) return 0n;
  let v = 0n;
  for (let i = a.length - 1; i >= limbStart; i--) v = (v << LIMB_BITS) | a[i];
  return v >> bitRem;
}

// Hand off to native BigInt Euclid only once the operands are genuinely small
// (a single limb is 2 Mbit — native Euclid on that would be millions of steps).
const NATIVE_FINISH_BITS = 1n << 15n; // 32,768 bits

// Lehmer GCD using a bounded leading-bit window. Returns gcd(a, b) as a Big.
// onProgress(remainingBits, startBits) fires periodically during the long reduction.
export function gcd(
  a0: Big,
  b0: Big,
  onProgress?: (remaining: number, start: number) => void,
  abort?: () => boolean
): Big {
  ensureInit();
  let u = a0.slice();
  let v = b0.slice();
  if (cmp(u, v) < 0) { const t = u; u = v; v = t; }

  const startBits = Number(bitLength(u));
  let iter = 0;
  while (bitLength(u) > NATIVE_FINISH_BITS) {
    if ((iter & 255) === 0 && abort?.()) throw new Error("time budget exceeded");
    if (onProgress && (iter & 1023) === 0) onProgress(Number(bitLength(u)), startBits);
    iter++;
    // Approximate the leading WINDOW bits of both numbers (aligned to u).
    const bu = bitLength(u);
    const shift = bu > WINDOW ? bu - WINDOW : 0n;
    let uhat = topBits(u, shift);
    let vhat = topBits(v, shift);

    // Lehmer cofactor matrix [[A,B],[C,D]] (signed native scalars < 2^WINDOW).
    let A = 1n, B = 0n, C = 0n, D = 1n;
    for (;;) {
      const vC = vhat + C;
      const vD = vhat + D;
      if (vC === 0n || vD === 0n) break;
      const q = (uhat + A) / vC;
      if (q !== (uhat + B) / vD) break;
      [A, C] = [C, A - q * C];
      [B, D] = [D, B - q * D];
      [uhat, vhat] = [vhat, uhat - q * vhat];
    }

    if (B === 0n) {
      // Approximation gave no multi-precision step: do one full division.
      const r = mod(u, v);
      u = v; v = r;
    } else {
      const newU = combine(A, u, B, v);
      const newV = combine(C, u, D, v);
      u = newU; v = newV;
    }
    if (cmp(u, v) < 0) { const t = u; u = v; v = t; }
  }

  // Finish in native BigInt (both operands are now small — ≤ 2 limbs).
  let x = toBigInt(u);
  let y = toBigInt(v);
  while (y !== 0n) { [x, y] = [y, x % y]; }
  return fromBigInt(x);
}

// base^exp (exp a native BigInt) as a Big. Square-and-multiply; never forms a
// single oversized native BigInt.
export function pow(
  base: Big,
  exp: bigint,
  onProgress?: (done: number, total: number) => void,
  abort?: () => boolean
): Big {
  ensureInit();
  let result: Big = [1n];
  let b = base.slice();
  let e = exp;
  const total = exp.toString(2).length;
  let done = 0;
  while (e > 0n) {
    if (abort?.()) throw new Error("time budget exceeded");
    if (e & 1n) result = mul(result, b);
    e >>= 1n;
    if (e > 0n) b = mul(b, b);
    onProgress?.(++done, total);
  }
  return result;
}
