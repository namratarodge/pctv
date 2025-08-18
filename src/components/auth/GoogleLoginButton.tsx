"use client";

import { GoogleUser } from '@/utils/googleOAuth';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

interface GoogleLoginButtonProps {
  onGoogleSuccess: (user: GoogleUser) => void;
  onGoogleError: (error: string) => void;
}

export default function GoogleLoginButton({ onGoogleSuccess, onGoogleError }: GoogleLoginButtonProps) {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try { 
        if ('access_token' in response) {
          // Get user info from Google
          const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }).then(res => res.json());

          console.log('user Info')
          console.log(userInfo)

          const googleUser: GoogleUser = {
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
            sub: userInfo.sub,
          };

          onGoogleSuccess(googleUser);
        }
      } catch (error) {
        console.error('Google login error:', error);
        onGoogleError('Failed to authenticate with Google');
      }
    },
    onError: () => {
      onGoogleError('Google login failed');
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="flex w-full justify-center items-center gap-3 rounded-full cursor-pointer bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm border border-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
    >
      <FcGoogle className="w-5 h-5" />
      Continue with Google
    </button>
  );
}
