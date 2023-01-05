import React, { useEffect } from 'react';
import SignUp from '../../components/Auth/Signup';

const SignUpPage = () => {
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
          src={require('../../Asset/images/signup.svg').default}
          alt=""
        />
      </div>
      <SignUp></SignUp>
    </div>
  );
};

export default SignUpPage;
