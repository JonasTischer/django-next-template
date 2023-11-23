# Use the official Python 3.11 image as a base
FROM python:3.11

# Set the working directory inside the container
WORKDIR /app

# Copy the poetry configuration files
COPY pyproject.toml poetry.lock /app/

# Install Poetry
RUN pip install poetry

# Install project dependencies
RUN poetry config virtualenvs.create false && \
  poetry install --no-interaction --no-ansi

# Copy the rest of your application code
COPY . /app/

# The command to run the application
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
