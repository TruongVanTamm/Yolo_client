import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { types } from 'react-alert';
import { Helmet } from 'react-helmet';
const SignupForm = () => {
  const alert = useAlert();
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      password: '',
      confirmedPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Vui lòng nhập trường này')
        .min(4, 'Tên quá ngắn, yêu cầu ít nhất 4 kí tự'),
      email: Yup.string()
        .required('Vui lòng nhập trường này')
        .matches(
          // eslint-disable-next-line
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          'Địa chỉ email không hợp lệ'
        ),
      password: Yup.string()
        .required('Vui lòng nhập trường này')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,

          'Mật khẩu yêu cầu 8 ký tự, chứa ít nhất một chữ cái và một số '
        ),
      confirmedPassword: Yup.string()
        .required('Vui lòng nhập trường này')
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('/user/register', { ...values });
        localStorage.setItem('firstLogin', true);
        alert.show(
          <div style={{ fontSize: '12px' }}>
            Chúng tôi vừa gửi một email xác nhận cho bạn, vui lòng xác nhận để
            hoàn tất đăng kí
          </div>,
          { type: types.INFO }
        );
      } catch (err) {
        alert.show(
          <div style={{ fontSize: '12px' }}>{err.response.data.msg}</div>
        );
      }
    },
  });

  return (
    <section>
       <Helmet>
        <meta charSet="utf-8" />
        <title>Đăng kí</title>
        <link
          rel="canonical"
          href="http://mysite.com/example"
        />
        <meta
          name="description"
          content="Truong Van Tam dang dev Yolo"
        />
      </Helmet>
      <header>Đăng kí</header>
      <form
        className="infoform"
        onSubmit={formik.handleSubmit}
      >
        <label> Tên khách hàng </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Họ Và Tên"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && (
          <p className="errorMsg"> {formik.errors.name} </p>
        )}
        <label> Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email "
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && (
          <p className="errorMsg"> {formik.errors.email} </p>
        )}

        <label> Mật khẩu </label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Mật khảu"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && (
          <p className="errorMsg"> {formik.errors.password} </p>
        )}
        <label> Nhập lại mật khảu </label>
        <input
          type="text"
          id="confirmedPassword"
          name="confirmedPassword"
          placeholder="Xác nhận mật khẩu"
          value={formik.values.confirmedPassword}
          onChange={formik.handleChange}
        />
        {formik.errors.confirmedPassword && (
          <p className="errorMsg"> {formik.errors.confirmedPassword} </p>
        )}
        <div className="infoform__control">
          <Link
            to="/signin"
            className="infoform__control__btn"
          >
            Đăng nhập
          </Link>
          <button type="submit"> Tiếp tục </button>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
