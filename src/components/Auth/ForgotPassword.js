import React, { useState } from 'react';
import axios from 'axios';
import { isEmail } from '../utils/Validation';
import { useAlert, types } from 'react-alert';
import Button from '../Button/Button';
import { Link} from 'react-router-dom';
const initialState = {
  email: '',
};

function ForgotPassword() {
  const alert = useAlert();
  const [data, setData] = useState(initialState);

  const { email } = data;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const forgotPassword = async () => {
    if (!isEmail(email)) {
      setData({ ...data });
      return alert.show(
        <div style={{ fontSize: '12px' }}>Email không hợp lệ</div>,
        { type: types.ERROR }
      );
    }

    try {
      const res = await axios.post('/user/forgot', { email });
      setData({ ...data });
      return alert.show(
        <div style={{ fontSize: '12px' }}>{res.data.msg} </div>,
        { type: types.INFO }
      );
    } catch (err) {
      err.response.data.msg &&
        alert.show(
          <div style={{ fontSize: '12px' }}>{err.response.data.msg}</div>,
          { type: types.ERROR }
        );
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
