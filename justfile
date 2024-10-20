frontend-dev:
    cd frontend && npm run dev

backend-dev:
    cd backend && poetry run poe run
dev:
    cd frontend && npm run dev & cd backend && poetry run poe run

manage COMMAND:
    cd backend && poe manage {{COMMAND}}

test-backend ARGS="":
    cd backend && poe test {{ARGS}}
