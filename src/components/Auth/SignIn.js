import React, { useEffect } from 'react'
import SignInForm from './SignInForm'
import { useAlert,types } from 'react-alert';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const {activation_token} = useParams()
  const alert = useAlert();
    useEffect(() => {
    if(activation_token){
        const activationEmail = async () => {
            try {
                const res = await axios.post('/user/activation', {activation_token})
                alert.show(  <div style={{ fontSize: '12px' }}>
                {res.data.msg}
              </div>,
              { type: types.INFO})

            } catch (err) {
              alert.show(  <div style={{ fontSize: '12px' }}>
              {err.response.data.msg}
            </div>,
            { type: types.ERROR})
          
            }
        }
        activationEmail()
    }
},[activation_token, alert])
  return (
    <div className="Signup_container__main">
     <SignInForm></SignInForm>
</div>
  )
}

export default SignIn
