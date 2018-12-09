import React from 'react';
import IcoSpotify from 'js/components/Icons/IcoSpotify';

const Login = () => (
  <section className="spfy-login">
    <IcoSpotify className="spfy-spotify-logo spfy-spotify-logo--login" />
    <a href="/login" className="spfy-login__button">
      Log in
    </a>
  </section>
);

export default Login;
