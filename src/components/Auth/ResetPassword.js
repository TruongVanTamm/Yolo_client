import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { isLength, isMatch } from '../utils/Validation';
import Button from '../Button/Button';
import { toast } from 'react-toastify';

const initialState = {
  password: '',
  cf_password: '',
};

function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  const { password, cf_password } = data;

  const logoutUser = async () => {
    await axios.get('https://api.zhangwenxin.click/user/logout');

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
      return toast.error('Mật khẩu quá ngắn, tối thiểu 8 kí tự');
    }

    if (!isMatch(password, cf_password)) {
      setData({
        ...data,
      });
      return toast.error('Mật khẩu không trùng khớp');
    }

    try {
      const res = await axios.post(
        'https://api.zhangwenxin.click/user/reset',
        { password },
        {
          headers: { Authorization: token },
        }
      );
      setData({
        ...data,
      });
      logoutUser();
      return toast.info(res.data.msg);
    } catch (err) {
      err.response.data.msg && toast.error(err.response.data.msg);
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
