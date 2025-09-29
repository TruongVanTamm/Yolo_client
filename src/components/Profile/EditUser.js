import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalState } from '../../GlobalState';
import { toast } from 'react-toastify';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState([]);
  const state = useContext(GlobalState);
  const [users] = state.userAPI.users;
  const [token] = state.token;
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [num, setNum] = useState(0);
  useEffect(() => {
    if (users !== false) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === 1 ? true : false);
        }
      });
    } else {
      navigate('/profile');
    }
  }, [users, id, navigate]);

  const handleUpdate = async () => {
    try {
      if (num % 2 !== 0) {
        const res = await axios.patch(
          `http://api.zhangwenxin.click/user/update_role/${editUser._id}`,
          {
            role: checkAdmin ? 1 : 0,
          },
          {
            headers: { Authorization: token },
          }
        );

        toast.info(res.data.msg);
        setNum(0);
        navigate('/profile');
      }
    } catch (err) {
      toast.error(err.res.data.msg);
    }
  };

  const handleCheck = () => {
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  return (
    <div className="edit-user__page">
      <div className="edit-user__page__go-back">
        <button
          onClick={() => {
            navigate('/profile');
          }}
        >
          <i className="bx bx-left-arrow-alt"></i> Quay lại
        </button>
      </div>

      <div className="edit-user__page__main">
        <h2>Thiết lập người dùng</h2>

        <div className="edit-user__page__main__form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={editUser.name}
            disabled
          />
        </div>

        <div className="edit-user__page__main__form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={editUser.email}
            disabled
          />
        </div>

        <div className="edit-user__page__main__form-group isAdmin">
          <input
            type="checkbox"
            id="isAdmin"
            checked={checkAdmin}
            onChange={handleCheck}
          />
          <label htmlFor="isAdmin">Quản trị viên</label>
        </div>

        <button onClick={handleUpdate}>Cập nhật</button>
      </div>
    </div>
  );
}

export default EditUser;
