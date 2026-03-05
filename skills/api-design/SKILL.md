---
name: api-design
description: API design conventions and patterns. Loaded automatically when working with API endpoints, routes, or controllers.
user-invocable: false
---

When designing or reviewing API endpoints, follow these conventions:

## URL structure
- Use plural nouns for resources: `/users`, `/projects`
- Use kebab-case for multi-word resources: `/project-members`
- Nest resources for relationships: `/projects/:id/members`
- Keep nesting to max 2 levels deep

## Request/Response patterns
- Use appropriate HTTP methods: GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE (remove)
- Return consistent error format:
  ```json
  { "error": { "code": "NOT_FOUND", "message": "Human-readable message" } }
  ```
- Use HTTP status codes correctly: 200 (ok), 201 (created), 204 (no content), 400 (bad request), 401 (unauthorized), 403 (forbidden), 404 (not found), 422 (validation error), 500 (server error)
- Include pagination for list endpoints: `?page=1&limit=20`

## Validation
- Validate all input at the API boundary
- Return 422 with field-level errors for validation failures
- Never trust client-side validation alone
