---
name: code-review
description: Review code changes for bugs, security issues, and style. Use when reviewing PRs, diffs, or asking "review this code."
---

When reviewing code, follow this structure:

## 1. Security scan
- Check for injection vulnerabilities (SQL, XSS, command injection)
- Look for hardcoded secrets, credentials, or API keys
- Verify input validation at system boundaries

## 2. Bug check
- Identify off-by-one errors, null/undefined risks, race conditions
- Check error handling - are errors caught and handled appropriately?
- Look for resource leaks (unclosed connections, missing cleanup)

## 3. Logic review
- Does the code do what the PR description claims?
- Are edge cases handled?
- Are there unnecessary side effects?

## 4. Style and maintainability
- Is naming clear and consistent with the codebase?
- Is there unnecessary complexity that could be simplified?
- Are there duplicated patterns that should be extracted?

## Output format
For each finding, use this format:

**[SEVERITY] file:line - description**
- `critical` - bugs, security issues, data loss risks
- `warning` - potential issues, code smells, missing edge cases
- `suggestion` - style improvements, minor optimizations

End with a summary: approve, request changes, or needs discussion.
