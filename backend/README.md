# Full Auth API

## Instalation Guide

poetry add --group dev poethepoet;

After running

poe run

head over to

http://127.0.0.1:8000/api/docs/

to checkout the api docs

### To setup the project locally, follow these steps:

-   open the `.env.local` file
-   fill out the value for `DJANGO_SECRET_KEY`

If you want to send activation emails to your users do the following:
-   go to [AWS](https://aws.amazon.com)
-   log into your aws account, or create one if you don't have one
-   navigate to the `Simple Email Service (SES)`
-   validate 2 emails, one which will be the sender email, and the other the receiver email
-   go to the `SMTP settings`, and click on `Create SMTP credentials`
-   after creating the IAM user, next navigate to `IAM`
-   under `Access management`, click on `users`
-   click on the `SES` user that was created
-   click on `Add permissions`, then add the `AmazonSESReadOnlyAccess` permission
-   then go to `Security credentials`, and create a new access key
-   take the access key and secret, and use them as the values in the `AWS_SES_ACCESS_KEY_ID` and `AWS_SES_SECRET_ACCESS_KEY` environment variables
-   fill in the region where you set up the Simple Email Service in the `AWS_SES_REGION_NAME` environment variable
-   fill in the email that will be sending emails in the `AWS_SES_FROM_EMAIL` environment variable

If you want to enable Google Authentication
-   go to google cloud [HERE](https://console.cloud.google.com)
-   in the settings, hover over `APIs & Services`, and click on `OAuth consent screen`
-   fill in the details for the OAuth consent screen
    -   create an `External` user type
    -   add the `Authorized domains`
    -   under `scopes`, click `ADD OR REMOVE SCOPES`, add the `../auth/userinfo.email`, `../auth/userinfo.profile`, and `openid` scopes
    -   under `Test users`, add your receiver email
-   next go to the settings again, hover over `APIS & Services`, and click on `Credentials`
-   click on `CREATE CREDENTIALS`, then click on `OAuth client ID`
-   take the access key and secret, and use them as the values in the `GOOGLE_AUTH_KEY` and `GOOGLE_AUTH_SECRET_KEY` environment variables
-   for `Application type`, you can select `Web application`
-   under `Authorized JavaScript origins`, add `http://localhost:3000`
-   under `Authorized redirect URIs`, add `http://localhost:3000/auth/google`
-   to have this work in your production environment, do the following:
    -   under `Authorized JavaScript origins`, add `https://your-domain.com`
    -   under `Authorized redirect URIs`, add `https://your-domain.com/auth/google`
---

### Deployment on Digitalocean:

-   to deploy, go to the following link [HERE](https://www.youtube.com/watch?v=2pZmxh8Tf78)
-   next go to the timestamp at `2:47:14`, this is where I show the Digitalocean deployment
