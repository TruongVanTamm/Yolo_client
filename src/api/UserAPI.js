import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('http://localhost:5001/user/infor', {
            headers: { Authorization: token },
          });
          setUser(res.data);
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setCart(res.data.cart);
          setFavorite(res.data.favorite);
        } catch (err) {
          toast.error(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);
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
          toast.error(err.response.data.msg);
        }
      };
      getUsers();
    } else {
    }
  }, [token, isAdmin]);
  const addCart = async (product) => {
    if (!isLogged) return toast.error(t('Yêu cầu đăng nhập'));
    const check = cart.every((item) => {
      return item.id !== product.id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      await axios.patch(
        'http://localhost:5001/user/addcart',
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
      toast.info(t('Thêm sản phẩm thành công'));
    } else {
      toast.info(t('Sản phẩm đã có trong giỏ hàng'));
    }
  };
  const addFavorite = async (product) => {
    if (!isLogged) return toast.error(t('Yêu cầu đăng nhập'));
    const check = favorite.every((item) => {
      return item.id !== product.id;
    });

    if (check) {
      setFavorite([...favorite, { ...product }]);
      await axios.patch(
        'http://localhost:5001/user/addfavorite',
        { favorite: [...favorite, { ...product }] },
        {
          headers: { Authorization: token },
        }
      );
      toast.info(t('Thêm sản phẩm yêu thích thành công'));
    } else {
      toast.info(t('Sản phẩm đã có mục yêu thích'));
    }
  };
  const addToFavorite = async (favorite) => {
    await axios.patch(
      'http://localhost:5001/user/addfavorite',
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
      toast.info(t('Đã xóa sản phẩm khỏi mục yêu thích'));
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
