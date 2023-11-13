import { useRef } from 'react';
import useScript from '../hooks/useScript';

export default function GoogleLogin({
  onGoogleLogIn = () => {},
  text = 'signin_with',
}) {
  const googleSignInButton = useRef(null);

  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: "806313581738-ctsshl683bn720t368a6vc65cbh4u4lm.apps.googleusercontent.com",
      callback: onGoogleLogIn,
    });

    window.google.accounts.id.renderButton(
      googleSignInButton.current,
      { theme: 'filled_blue', size: 'large', text, width: '250' }, // customization attributes
    );
  });

  return <div ref={googleSignInButton}></div>;
}