import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import { toast } from 'react-toastify';
import Loading from '../utils/Loading';
import { isLength, isMatch, isPassword } from '../utils/Validation';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
const initialState = {
  name: '',
  password: '',
  cf_password: '',
};

function Profile() {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [user] = state.userAPI.user;
  const [data, setData] = useState(initialState);
  const { name, password, cf_password } = data;
  const [token] = state.token;
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [users, setUsers] = state.userAPI.users;
  const { t } = useTranslation();
  useEffect(() => {
    if (isAdmin) {
      const getUsers = async () => {
        try {
          const res = await axios.get('http://localhost:5001/user/all_infor', {
            headers: { Authorization: token },
          });
          setUsers(res.data);
        } catch (err) {
          toast.error(err.response.data.msg);
        }
      };
      getUsers();
    } else {
    }
  }, [loading, isAdmin, setUsers, token]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) {
        setData({
          ...data,
        });
        return toast.error('File not exist.');
      }

      if (file.size > 1024 * 1024) {
        setData({
          ...data,
        });
        return toast.error('File not exist.');
      }

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        setData({
          ...data,
        });
        return toast.error('File not exist.');
      }

      let formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      const res = await axios.post(
        'http://localhost:5001/api/upload_avatar',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: token,
          },
        }
      );
      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      toast.error('Tệp tải lên không hợp lệ');
    }
  };

  const updateInfor = () => {
    try {
      axios.patch(
        'http://localhost:5001/user/update',
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data });
      toast.info('Cập nhật hồ sơ thành công');
    } catch (err) {
      setData({ ...data });
      toast.error(err.response.data.msg);
    }
  };

  const updatePassword = () => {
    if (isLength(password)) {
      toast.error('Mật khẩu quá ngắn');
      return setData({
        ...data,
      });
    }
    if (!isPassword(password)) {
      toast.error(
        'Mật khẩu yêu cầu 8 ký tự, chứa ít nhất một chữ cái và một số'
      );
      return setData({
        ...data,
      });
    }
    if (!isMatch(password, cf_password)) {
      toast.error('Mật khẩu không trùng khớp');
      return setData({
        ...data,
      });
    }

    try {
      axios.post(
        'http://localhost:5001/user/reset',
        { password },
        {
          headers: { Authorization: token },
        }
      );

      toast.info('Update thành công');
      setData({
        ...data,
      });
    } catch (err) {
      toast.info(err.response.data.msg);
      setData({ ...data });
    }
  };

  const handleUpdate = () => {
    if (name || avatar) updateInfor();
    if (password) updatePassword();
  };

  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        if (window.confirm('Bạn muốn xóa người dùng này ?')) {
          setLoading(true);
          await axios.delete(`http://localhost:5001/user/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: '' });
    }
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Thông tin người dùng</title>
        <link
          rel="canonical"
          href="http://mysite.com/example"
        />
        <meta
          name="description"
          content="Truong Van Tam dang dev Yolo"
        />
      </Helmet>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="profile_page">
          <div className="profile_page__left">
            <div className="profile_page__left__avatar">
              <h2>{isAdmin ? 'Admin Profile' : 'User Profile'}</h2>
              <div className="profile_page__left__avatar__img">
                <img
                  src={avatar ? avatar : user.avatar}
                  alt=""
                />
                <span>
                  <i className="bx bxs-camera"></i>
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    onChange={changeAvatar}
                  />
                </span>
              </div>
            </div>
            <div className="profile_page__left__form">
              <div className="profile_page__left__form-group">
                <label htmlFor="name">{t('Tên')} </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={user.name}
                  placeholder="Your name"
                  onChange={handleChange}
                />
              </div>

              <div className="profile_page__left__form-group">
                <label htmlFor="email">Email </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user.email}
                  placeholder="Your email address"
                  disabled
                />
              </div>

              <div className="profile_page__left__form-group">
                <label htmlFor="password">{t('Mật khẩu mới')}</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  value={password}
                  onChange={handleChange}
                />
              </div>

              <div className="profile_page__left__form-group">
                <label htmlFor="cf_password">{t('Nhập lại mật khẩu')} </label>
                <input
                  type="password"
                  name="cf_password"
                  id="cf_password"
                  placeholder="Confirm password"
                  value={cf_password}
                  onChange={handleChange}
                />
              </div>

              {/* <div>
              <em style={{ color: 'crimson' }}>
                * If you update your password here, you will not be able to
                login quickly using google and facebook.
              </em>
            </div> */}

              <button
                disabled={loading}
                onClick={handleUpdate}
                className="profile_page__left__form__btn"
              >
                {t('Cập nhật')}
              </button>
            </div>
          </div>
          {users && isAdmin ? (
            <div className="profile_page__right">
              <h2>{isAdmin ? 'Users' : 'My Orders'}</h2>
              <div style={{ overflowX: 'auto', width: '100%' }}>
                <table className="profile_page__right__customers">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>{t('Tên')}</th>
                      <th>Email</th>
                      <th>Admin</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item) => (
                      <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>
                          {item.role === 1 ? (
                            <i
                              className="bx bx-check"
                              title="Admin"
                            ></i>
                          ) : (
                            <i
                              className="bx bx-x"
                              title="User"
                            ></i>
                          )}
                        </td>
                        <td className="action">
                          <Link
                            to={
                              user._id === item._id
                                ? ''
                                : `/edit_user/${item._id}`
                            }
                            style={
                              user._id === item._id
                                ? { opacity: 0.5, cursor: 'default' }
                                : {}
                            }
                          >
                            <i
                              className="bx bxs-edit-alt"
                              title="Edit"
                            ></i>
                          </Link>
                          <i
                            className="bx bx-trash"
                            title="Remove"
                            onClick={
                              user._id === item._id
                                ? null
                                : () => handleDelete(item._id)
                            }
                            style={
                              user._id === item._id
                                ? { opacity: 0.5, cursor: 'default' }
                                : {}
                            }
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Profile;
