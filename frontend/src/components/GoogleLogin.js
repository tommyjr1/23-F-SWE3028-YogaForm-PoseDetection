import { useRef } from 'react';
import useScript from '../hooks/useScript';

export default function GoogleLogin({
  onGoogleLogIn = () => {},
  text = 'signin_with',
}) {
  const googleSignInButton = useRef(null);

  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: "1022110957362-ncqd7ish7v0gabqmqah3a8dieikmeu6k.apps.googleusercontent.com",
      callback: onGoogleLogIn,
    });

    window.google.accounts.id.renderButton(
      googleSignInButton.current,
      { theme: 'filled_blue', size: 'large', text, width: '250' }, // customization attributes
    );
  });

  return <div ref={googleSignInButton}></div>;
}