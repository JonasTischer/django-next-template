# Backend: Django Full Auth API 🛡️

## Overview

This Django backend provides a robust API with full JWT authentication, ready to power your Next.js frontend.

## Features

- Django 5.0
- Django REST Framework
- JWT Authentication
- PostgreSQL Database (in development)
- Docker support (in development)

## Installation Guide 📦

### Prerequisites

- Python 3.11+
- Poetry

### Setting Up the Project 🚀

1. **Install Dependencies**:
   ```
   poetry install
   ```

2. **Activate the virtual environment**:
   ```
   poetry shell
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env.local`
   - Update the variables in `.env.local`

4. **Run migrations**:
   ```
   python manage.py migrate
   ```

5. **Start the server**:
   ```
   python manage.py runserver
   ```

6. **API Documentation**:
   - Visit [http://127.0.0.1:8000/api/docs/](http://127.0.0.1:8000/api/docs/) to explore the API documentation.

## Development 🛠️

- **Running tests**: [To be added]
- **Code linting**: [To be added]

## Deployment 🚀

- Deployment instructions will be added soon.

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.
