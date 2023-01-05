import React, { useEffect } from 'react';
import SignIn from '../../components/Auth/SignIn';
const SigInPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className="Signup_container">
      <div className="Signup_container__img">
        <img
          src={require('../../Asset/images/authen.svg').default}
          alt=""
        />
      </div>
      <SignIn></SignIn>
    </div>
  );
};

export default SigInPage;
