import React, { useState } from 'react';
import axios from 'axios';
import { isEmail } from '../utils/Validation';
import { toast } from 'react-toastify';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
const initialState = {
  email: '',
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email } = data;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const forgotPassword = async () => {
    if (!isEmail(email)) {
      setData({ ...data });
      return toast.error('Email không hợp lệ');
    }

    try {
      const res = await axios.post('http://api.zhangwenxin.click/user/forgot', {
        email,
      });
      setData({ ...data });
      return toast.info(res.data.msg);
    } catch (err) {
      err.response.data.msg && toast.error(err.response.data.msg);
      setData({ ...data });
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-container__main">
        <h2>Quên mật khẩu ?</h2>
        <div className="row">
          <Link
            to="/signin"
            className="go-back"
          >
            <i className="bx bx-left-arrow-alt"></i>
            Quay lại
          </Link>

          <label htmlFor="email">Nhập địa chỉ Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChangeInput}
          />
          <Button
            onClick={forgotPassword}
            size="sm"
          >
            Xác thực Emaill
          </Button>
        </div>
      </div>
      <div className="forgot-password-container__img">
        <img
          src={require('../../Asset/images/forgot-password.svg').default}
          alt=""
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
