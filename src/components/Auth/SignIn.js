import React, { useEffect } from 'react';
import SignInForm from './SignInForm';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const { activation_token } = useParams();
  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(
            'https://api.zhangwenxin.click/user/activation',
            { activation_token }
          );
          toast.info(res.data.msg);
        } catch (err) {
          toast.error(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);
  return (
    <div className="Signup_container__main">
      <SignInForm></SignInForm>
    </div>
  );
};

export default SignIn;
