import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { isLength, isMatch } from '../utils/Validation';
import Button from '../Button/Button';
import { useAlert, types } from 'react-alert';

const initialState = {
  password: '',
  cf_password: '',
};

function ResetPassword() {
  const alert = useAlert();
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  const { password, cf_password, } = data;

  const logoutUser = async () => {
    await axios.get('/user/logout');

    localStorage.removeItem('firstLogin');

    window.location.href = '/signin';
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleResetPass = async () => {
    if (isLength(password)) {
      setData({
        ...data,
      });
      return alert.show(
        <div style={{ fontSize: '12px' }}>
          Mật khẩu quá ngắn, tối thiểu 8 kí tự
        </div>,
        { type: types.ERROR }
      );
    }

    if (!isMatch(password, cf_password)) {
      setData({
        ...data,
      });
      return alert.show(
        <div style={{ fontSize: '12px' }}>Mật khẩu không trùng khớp</div>,
        { type: types.ERROR }
      );
    }

    try {
      const res = await axios.post(
        '/user/reset',
        { password },
        {
          headers: { Authorization: token },
        }
      );
      setData({
        ...data,
      });
      logoutUser()
      return alert.show(
        <div style={{ fontSize: '12px' }}>{res.data.msg}</div>,
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
      <div className="forgot-password-container__img">
        <img
          src={require('../../Asset/images/reset.svg').default}
          alt=""
        />
      </div>
      <div className="forgot-password-container__main">
        <h2>Đặt lại mật khẩu</h2>
        <div className="row">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="......"
            value={password}
            onChange={handleChangeInput}
          />

          <label htmlFor="cf_password">Nhập lại mật khẩu</label>
          <input
            type="password"
            name="cf_password"
            id="cf_password"
            placeholder="......"
            value={cf_password}
            onChange={handleChangeInput}
          />

          <Button
            onClick={handleResetPass}
            size="sm"
          >
            Đặt lại
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
