// Common weak JWT secrets / HMAC keys — used for secret-cracking attacks
export const WEAK_JWT_SECRETS: string[] = [
  // Empty / trivial
  "", "secret", "Secret", "SECRET",
  // Common passwords
  "password", "Password", "PASSWORD", "password1", "Password1",
  "123456", "1234567890", "12345678", "123456789", "0123456789",
  "111111", "222222", "333333", "555555", "666666", "777777", "888888", "999999",
  "qwerty", "qwerty123", "abc123", "letmein", "letmein1",
  "monkey", "dragon", "master", "sunshine", "princess",
  "football", "baseball", "iloveyou", "trustno1",
  "abcdef", "abcdefghij", "1234abcd",
  "welcome", "Welcome1", "swordfish", "hello", "world",
  // JWT-specific
  "jwt-secret", "jwt_secret", "jwtSecret", "jwtSecret123",
  "jwt-key", "jwt_key", "jwtKey",
  "jwt-token", "auth-token", "authtoken",
  "your-secret-key", "your-256-bit-secret", "your-384-bit-secret", "your-512-bit-secret",
  "your-secret", "your_secret", "mysecret", "my_secret", "my-secret",
  "secretkey", "secret_key", "secret-key", "secretkey123",
  "supersecret", "super_secret", "super-secret",
  "shared-secret", "shared_secret",
  // Placeholder strings
  "change-this-to-a-secret", "please-change-me",
  "THIS_IS_NOT_SECURE", "NOT_SECURE", "CHANGEME", "CHANGE_ME",
  "changeme", "changeme!",
  "TODO_CHANGE_ME", "TODO",
  // Application/framework defaults
  "flask_secret", "django_secret", "rails_secret",
  "express_secret", "node_env_secret",
  "laravel_secret", "rails_secret_key_base",
  "SECRET_KEY", "AUTH_SECRET", "JWT_SECRET", "APP_SECRET",
  "ACCESS_TOKEN_SECRET", "REFRESH_TOKEN_SECRET",
  // Environment variable names (developers sometimes use these as values)
  "JWT_SECRET", "jwt_secret", "NODE_ENV",
  // Dev/test
  "test", "test123", "testing", "testing123", "test_secret",
  "dev", "development", "staging", "production", "prod",
  "local", "localhost",
  "debug", "DEBUG",
  // Common short words
  "default", "admin", "administrator", "root", "user",
  "demo", "sample", "example", "temp", "tmp", "key",
  "token", "session", "cookie", "login",
  "pepper", "salt", "hash",
  "app", "application", "service", "api", "backend",
  "null", "undefined", "none", "nil", "empty",
  // Keyboard walks
  "qazwsx", "zxcvbnm", "asdfghjkl",
  // Numeric
  "000000", "11111111", "00000000",
  // Mixed case variants
  "Admin", "ROOT", "User", "Demo",
  "Changeme", "Secret1", "P@ssw0rd", "P@ssword",
  "s3cr3t", "S3cr3t", "p4ssw0rd", "secr3t",
  // Potential env file leaks
  "super_secret_jwt_key", "your_jwt_secret_here",
  // Year-based
  "2020", "2021", "2022", "2023", "2024", "2025",
  "secret2023", "secret2024", "jwt2024",
  // UUID-looking but common
  "00000000-0000-0000-0000-000000000000",
  // International common passwords
  "wachtwoord", "motdepasse", "kennwort",
  // Security research community
  "kali", "pentest", "hacker", "hack", "exploit", "pwned",
];
