frontend-dev:
    cd frontend && bun run dev

backend-dev:
    cd backend && poetry run poe run
dev:
    cd frontend && bun run dev & cd backend && poetry run poe run

manage COMMAND:
    cd backend && poe manage {{COMMAND}}

test-backend ARGS="":
    cd backend && poe test {{ARGS}}
