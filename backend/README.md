# Backend: Full Auth API 🛡️

## Installation Guide 📦

This guide covers setting up the Django backend, which includes full JWT authentication and options for email activation and Google authentication.

### Setting Up the Project 🚀

1. **Install Dependencies**:
   - Run the following command to install dependencies using Poetry:
     ```
     poetry install;
     ```
   - After installation, start the server:
     ```
     poetry run poe run
     ```

2. **API Documentation**:
   - Visit [http://127.0.0.1:8000/api/docs/](http://127.0.0.1:8000/api/docs/) to explore the API documentation.

### Configuration 🛠️

- **Django Secret Key**:
  - Open the `.env.local` file.
  - Fill out the value for `DJANGO_SECRET_KEY`.

### Email Activation Setup (Optional) 📧

To send activation emails:

1. **AWS Simple Email Service (SES)**:
   - Sign in or create an account at [AWS](https://aws.amazon.com).
   - Navigate to `Simple Email Service (SES)` and validate two emails (sender and receiver).
   - Under `SMTP settings`, click on `Create SMTP credentials`.
   - Create an IAM user and add `AmazonSESReadOnlyAccess` permission.
   - Generate a new access key under `Security credentials`.
   - Update your `.env.local` with AWS credentials:
     - `AWS_SES_ACCESS_KEY_ID`
     - `AWS_SES_SECRET_ACCESS_KEY`
     - `AWS_SES_REGION_NAME` (set to your SES region)
     - `AWS_SES_FROM_EMAIL` (set to your sender email)

### Google Authentication Setup (Optional) 🔑

To enable Google Authentication:

1. **Google Cloud Platform**:
   - Visit [Google Cloud Console](https://console.cloud.google.com).
   - In `APIs & Services` > `OAuth consent screen`:
     - Set user type to `External`.
     - Add `Authorized domains`.
     - Add scopes: `../auth/userinfo.email`, `../auth/userinfo.profile`, `openid`.
     - Add your receiver email under `Test users`.
   - In `Credentials`:
     - Create `OAuth client ID`.
     - Set `Application type` to `Web application`.
     - Add Authorized JavaScript origins (`http://localhost:3000`) and redirect URIs (`http://localhost:3000/auth/google`).
   - For production:
     - Add your domain to JavaScript origins and redirect URIs.
   - Update your `.env.local` with Google credentials:
     - `GOOGLE_AUTH_KEY`
     - `GOOGLE_AUTH_SECRET_KEY`

---

**Note**: Ensure that all configurations and environment variables are set correctly for smooth operation of the backend. The optional steps are for additional features and can be skipped if not required for your setup.

---