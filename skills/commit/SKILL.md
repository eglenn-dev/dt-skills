---
name: commit
description: Create a well-structured git commit with a conventional commit message
disable-model-invocation: true
---

Create a git commit for the current staged changes:

1. Run `git diff --cached` to see what's staged
2. If nothing is staged, run `git status` and suggest what to stage
3. Write a commit message following conventional commits:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `refactor:` for code restructuring
   - `docs:` for documentation changes
   - `test:` for test additions/changes
   - `chore:` for maintenance tasks
4. Keep the subject line under 72 characters
5. Add a body if the change needs explanation (the "why", not the "what")
6. Create the commit

If $ARGUMENTS is provided, use it as context for the commit message.
