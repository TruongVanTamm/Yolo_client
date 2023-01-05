import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import numberWithCommas from '../components/utils/numberWithCommas';
import { GlobalState } from '../GlobalState';
import axios from 'axios';
import PaypalButton from '../components/Button/PaypalButton';
import { Helmet } from 'react-helmet';
const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const quantity = useRef(0);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(Math.ceil(total));
    };

    getTotal();
  }, [cart]);
  const addToCart = async (cart) => {
    await axios.patch(
      '/user/addcart',
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };
  const increment = (id) => {
    cart.forEach((item) => {
      if (item.id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item.id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };
  const removeProduct = (id) => {
    if (window.confirm('Xóa sản phẩm khỏi giỏ hàng?')) {
      cart.forEach((item, index) => {
        if (item.id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      '/api/payment',
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );
    setCart([]);
    addToCart([]);
    alert('Bạn đã đặt hàng thành công.');
  };
  if (cart.length === 0)
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Giỏ hàng</title>
          <link
            rel="canonical"
            href="http://mysite.com/example"
          />
          <meta
            name="description"
            content="Truong Van Tam dang dev Yolo"
          />
        </Helmet>
        <div className="cart__empty">
          <img
            src={require('../Asset/images/cart-empty.png')}
            alt="kanh "
          />
        </div>
      </>
    );
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Giỏ hàng</title>
        <link
          rel="canonical"
          href="http://mysite.com/example"
        />
        <meta
          name="description"
          content="Truong Van Tam dang dev Yolo"
        />
      </Helmet>
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>Bạn đang có {cart.length} sản phẩm trong giỏ hàng</p>
            <div className="cart__info__txt__price">
              <span>Thành tiền:</span>{' '}
              <span>
                <strong>${numberWithCommas(Number(total))}</strong>
              </span>
            </div>
          </div>
          <div className="cart__info__btn">
            <PaypalButton
              total={total}
              tranSuccess={tranSuccess}
            />
            <Link to="/catalog">
              <Button size="sm">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cart.map((product, index) => (
            <div
              className="cart__list__item"
              key={index}
            >
              <div className="cart__list__item__img">
                <Link to={product.id}>
                  <img
                    src={product.image01}
                    alt=""
                  />
                </Link>
              </div>

              <div className="cart__list__item__detail">
                <div className="cart__list__item__detail__info">
                  <p>
                  
                    <span>Sản phẩm</span> {product.name}
                  </p>
                  <p>
                    {' '}
                    <span>Màu sắc</span>
                    <span
                      className={`cart__list__item__detail__info__color bg-${product.color}`}
                    ></span>
                  </p>
                  <p>
                    {' '}
                    <span>Kích cỡ</span>
                    <span className={`cart__list__item__detail__info__size`}>
                      {product.size}
                    </span>
                  </p>
                </div>

                <div className="cart__list__item__detail__amount">
                  <button onClick={() => decrement(product.id)}> - </button>
                  <span ref={quantity}>{product.quantity}</span>
                  <button onClick={() => increment(product.id)}> + </button>
                </div>
                <div className="cart__list__item__detail__price">
                  <h3>${product.price * product.quantity}</h3>
                </div>
                <div
                  className="cart__list__item__detail__delete"
                  onClick={() => removeProduct(product.id)}
                >
                  <i className="bx bx-trash"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
