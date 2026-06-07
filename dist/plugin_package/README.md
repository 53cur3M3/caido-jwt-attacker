# JWT Attacker

A Caido plugin that automatically attacks JWTs using the full JWT Attack Playbook — all techniques implemented natively with no external tooling required.

## Attacks

| Technique           | CVE            | Description                                                                    |
| ------------------- | -------------- | ------------------------------------------------------------------------------ |
| None Algorithm      | CVE-2015-9235  | Sets `alg` to `none`/`None`/`NONE` and strips the signature                    |
| Null Signature      | CVE-2020-28042 | Empties the signature field while keeping the original algorithm               |
| Algorithm Confusion | CVE-2016-5431  | Re-signs an RS256/ES256 token as HS256 using the public key as the HMAC secret |
| Embedded JWK        | CVE-2018-0114  | Injects a self-generated public key into the `jwk` header and re-signs         |
| JKU / X5U Spoofing  | —              | Points `jku`/`x5u` to an attacker-controlled JWKS endpoint                     |
| KID Injection       | —              | SQL injection, path traversal, and SSRF via the `kid` header parameter         |
| Claim Tampering     | —              | Elevates `role`/`admin`/`sub` claims with the original (invalid) signature     |
| Weak Secret Crack   | —              | Brute-forces HS256/384/512 signing secrets against a built-in wordlist         |

## Key Sources for Algorithm Confusion

Tried automatically in order:

1. Plugin-configured public key / certificate
2. Target host TLS certificate
3. JWKS at 15 common well-known paths
4. `jku` / `x5c` embedded in the original JWT header
5. RSA public key recovered from multiple JWTs in HTTP history (Picca's algorithm)

## Usage

1. Right-click any request containing a JWT in **HTTP History** or **Replay**
2. Select **Attack JWT**
3. The plugin auto-sends all attack variants and streams results into the **JWT Attacker** panel

## Configuration

Open the **JWT Attacker** panel → **Configuration** tab:

* **JWKS Endpoint URL** — host the generated JWKS JSON here for JKU/X5U spoofing attacks
* **Custom Public Key / Private Key / Certificate** — PEM format, used for algorithm confusion and spoofing
* **Extra JWKS Paths** — additional paths to probe beyond the built-in list
* **Custom Wordlist** — extra secrets for weak-key cracking
* **Enabled Attacks** — toggle individual attack types on/off
