import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import { useAlert, types } from 'react-alert';
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
  const alert = useAlert();
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
          const res = await axios.get(
            'https://yolo-server.onrender.com/user/all_infor',
            {
              headers: { Authorization: token },
            }
          );
          setUsers(res.data);
        } catch (err) {
          alert.show(err.response.data.msg);
        }
      };
      getUsers();
    } else {
    }
  }, [loading, isAdmin, setUsers, alert, token]);
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
        return alert('File not exist.');
      }

      if (file.size > 1024 * 1024) {
        setData({
          ...data,
        });
        return alert('File not exist.');
      }

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        setData({
          ...data,
        });
        return alert('File not exist.');
      }

      let formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      const res = await axios.post(
        'https://yolo-server.onrender.com/api/upload_avatar',
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
      alert.show(
        <div style={{ fontSize: '12px' }}>T???p t???i l??n kh??ng h???p l???</div>,
        { type: types.ERROR }
      );
    }
  };

  const updateInfor = () => {
    try {
      axios.patch(
        'https://yolo-server.onrender.com/user/update',
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data });
      alert.show(
        <div style={{ fontSize: '12px' }}>C???p nh???t h??? s?? th??nh c??ng</div>,
        { type: types.INFO }
      );
    } catch (err) {
      setData({ ...data });
      alert.show(
        <div style={{ fontSize: '12px' }}>{err.response.data.msg}</div>,
        { type: types.ERROR }
      );
    }
  };

  const updatePassword = () => {
    if (isLength(password)) {
      alert.show(<div style={{ fontSize: '12px' }}>M???t kh???u qu?? ng???n</div>, {
        type: types.ERROR,
      });
      return setData({
        ...data,
      });
    }
    if (!isPassword(password)) {
      alert.show(
        <div style={{ fontSize: '12px' }}>
          M???t kh???u y??u c???u 8 k?? t???, ch???a ??t nh???t m???t ch??? c??i v?? m???t s???
        </div>,
        {
          type: types.ERROR,
        }
      );
      return setData({
        ...data,
      });
    }
    if (!isMatch(password, cf_password)) {
      alert.show(
        <div style={{ fontSize: '12px' }}>M???t kh???u kh??ng tr??ng kh???p</div>,
        { type: types.ERROR }
      );
      return setData({
        ...data,
      });
    }

    try {
      axios.post(
        'https://yolo-server.onrender.com/user/reset',
        { password },
        {
          headers: { Authorization: token },
        }
      );

      alert.show(<div style={{ fontSize: '12px' }}>Update th??nh c??ng</div>, {
        type: types.INFO,
      });
      setData({
        ...data,
      });
    } catch (err) {
      alert.show(
        <div style={{ fontSize: '12px' }}>{err.response.data.msg}</div>,
        { type: types.INFO }
      );
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
        if (window.confirm('B???n mu???n x??a ng?????i d??ng n??y ?')) {
          setLoading(true);
          await axios.delete(
            `https://yolo-server.onrender.com/user/delete/${id}`,
            {
              headers: { Authorization: token },
            }
          );
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
        <title>Th??ng tin ng?????i d??ng</title>
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
                <label htmlFor="name">{t('T??n')} </label>
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
                <label htmlFor="password">{t('M???t kh???u m???i')}</label>
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
                <label htmlFor="cf_password">{t('Nh???p l???i m???t kh???u')} </label>
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
                {t('C???p nh???t')}
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
                      <th>{t('T??n')}</th>
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
