# Security Policy

## Reporting a Vulnerability

AURA is a personality configuration protocol — it doesn't handle sensitive data directly. However, if you discover a security issue in:

- The schema validation logic
- The TypeScript loader implementation
- The ClawHub skill

Please report it by opening a **private security advisory** on GitHub:

1. Go to the repository's Security tab
2. Click "Report a vulnerability"
3. Provide details about the issue

We will respond within 48 hours and work with you to understand and address the issue.

## Scope

Security concerns for AURA include:

- **Schema injection** — Malformed YAML that could cause unexpected behavior
- **Path traversal** — File loading vulnerabilities in implementations
- **Dependency vulnerabilities** — Issues in npm dependencies

## Not in Scope

- AI model behavior (that's the model provider's responsibility)
- Personality configuration choices (that's user preference)
- Integration issues with specific platforms

## Thanks

We appreciate responsible disclosure and will acknowledge contributors who report valid security issues.
