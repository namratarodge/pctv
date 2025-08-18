export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export const GOOGLE_OAUTH_CONFIG = {
  client_id: GOOGLE_CLIENT_ID,
  scope: 'email profile',
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
};

export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string; // Google user ID
}

export const handleGoogleLogin = async (credential: string) => {
  try {
    // Decode the JWT token from Google
    const decoded = JSON.parse(atob(credential.split('.')[1]));
    
    const googleUser: GoogleUser = {
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
      sub: decoded.sub,
    };

    return googleUser;
  } catch (error) {
    console.error('Error decoding Google credential:', error);
    throw new Error('Failed to process Google login');
  }
};
