import { useState, useEffect } from 'react';
import { useAlert, types } from 'react-alert';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
function UserAPI(token) {
  const { t } = useTranslation();
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(false);
  const [users, setUsers] = useState(false);
  const alert = useAlert();
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('/user/infor', {
            headers: { Authorization: token },
          });
          setUser(res.data);
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setCart(res.data.cart);
          setFavorite(res.data.favorite);
        } catch (err) {
          alert.show(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token, alert]);
  useEffect(() => {
    if (isAdmin) {
      const getUsers = async () => {
        try {
          const res = await axios.get('/user/all_infor', {
            headers: { Authorization: token },
          });
          setUsers(res.data);
          setIsLogged(true);
        } catch (err) {
          alert.show(err.response.data.msg);
        }
      };
      getUsers();
    } else {
    }
  }, [token, alert, isAdmin]);
  const addCart = async (product) => {
    if (!isLogged)
      return alert.show(
        <div style={{ fontSize: '12px' }}>{t('Yêu cầu đăng nhập')}</div>
      );
    const check = cart.every((item) => {
      return item.id !== product.id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      await axios.patch(
        '/user/addcart',
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
      alert.show(
        <div style={{ fontSize: '12px' }}>{t('Thêm sản phẩm thành công')}</div>,
        { type: types.INFO }
      );
    } else {
      alert.show(
        <div style={{ fontSize: '12px' }}>
          {' '}
          {t('Sản phẩm đã có trong giỏ hàng')}
        </div>,
        { type: types.INFO }
      );
    }
  };
  const addFavorite = async (product) => {
    if (!isLogged)
      return alert.show(
        <div style={{ fontSize: '12px' }}>{t('Yêu cầu đăng nhập')}</div>
      );
    const check = favorite.every((item) => {
      return item.id !== product.id;
    });

    if (check) {
      setFavorite([...favorite, { ...product }]);
      await axios.patch(
        '/user/addfavorite',
        { favorite: [...favorite, { ...product }] },
        {
          headers: { Authorization: token },
        }
      );
      alert.show(
        <div style={{ fontSize: '12px' }}>
          {t('Thêm sản phẩm yêu thích thành công')}
        </div>,
        { type: types.INFO }
      );
    } else {
      alert.show(
        <div style={{ fontSize: '12px' }}>
          {' '}
          {t('Sản phẩm đã có mục yêu thích')}
        </div>,
        { type: types.INFO }
      );
    }
  };
  const addToFavorite = async (favorite) => {
    await axios.patch(
      '/user/addfavorite',
      { favorite },
      {
        headers: { Authorization: token },
      }
    );
  };
  const removeProduct = (id) => {
    if (window.confirm(t('Xóa sản phẩm khỏi mục yêu thích ?'))) {
      favorite.forEach((item, index) => {
        if (item.id === id) {
          favorite.splice(index, 1);
          localStorage.removeItem(id);
        }
      });
      setFavorite([...favorite]);
      addToFavorite(favorite);
      alert.show(
        <div style={{ fontSize: '12px' }}>
          {' '}
          {t('Đã xóa sản phẩm khỏi mục yêu thích')}
        </div>,
        { type: types.INFO }
      );
    }
  };
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
    users: [users, setUsers],
    cart: [cart, setCart],
    addCart: addCart,
    favorite: [favorite, setFavorite],
    addFavorite: addFavorite,
    addToFavorite: addToFavorite,
    removeProduct: removeProduct,
    history: [history, setHistory],
  };
}

export default UserAPI;
