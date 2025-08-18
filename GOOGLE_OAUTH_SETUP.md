# Google OAuth Setup Guide

## Frontend Configuration

1. Create a `.env.local` file in the root directory with the following content:

```env
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application" as the application type
6. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
7. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
8. Copy the Client ID and paste it in your `.env.local` file

## Backend Configuration

The backend is already configured to handle Google OAuth login. The following endpoints are available:

- `POST /api/auth/google-login` - Handles Google OAuth authentication

## Features

- **Google Login Button**: Users can sign in with their Google account
- **Automatic User Creation**: New users are automatically created when they first sign in with Google
- **Profile Picture**: Google profile pictures are automatically imported
- **Email Verification**: Google accounts are automatically marked as verified
- **Seamless Integration**: Works alongside existing email/password authentication

## Security Features

- Google OAuth tokens are validated
- Users are created with secure random passwords
- JWT tokens are generated for authenticated sessions
- Google user IDs are stored securely

## Testing

1. Start both frontend and backend servers
2. Navigate to the login page
3. Click "Continue with Google"
4. Complete Google OAuth flow
5. Verify successful login and user creation

## Troubleshooting

- Ensure Google OAuth APIs are enabled in Google Cloud Console
- Verify the client ID is correctly set in `.env.local`
- Check browser console for any OAuth errors
- Ensure backend server is running and accessible
