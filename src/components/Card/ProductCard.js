import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { GlobalState } from '../../GlobalState';
import ProductViewModal from '../ProductsView/ProductViewModal';
import { useTranslation } from 'react-i18next';
const ProductCard = (props) => {
  const navigate=useNavigate()
  const [activeProduct, setActiveProduct] = useState(0);
  const { t } = useTranslation();
  const handleProductClick = (index) => {
    setActiveProduct(index);
  };
  const [like, setLike] = useState(false);
  const data = [{ image01: props.image01 }, { image02: props.image02 }];
  const state = useContext(GlobalState);
  const addFavorite = state.userAPI.addFavorite;
  const removeProduct = state.userAPI.removeProduct;
  const [isLogged] = state.userAPI.isLogged;
  useEffect(() => {
    if (localStorage.getItem(`${props.id}`)) {
      setLike(true);
    }
  }, [props.id]);
  return (
    <>
      <div className="product-card">
        {props.isAdmin && (
          <input
            className="product-card__input"
            type="checkbox"
            checked={props.checked}
            onChange={() => props.handleCheck(props.id)}
          />
        )}
        <Link to={`/${props.id}`}>
          <div className="product-card__img">
            {data.map((item, index) => {
              return (
                <div key={index}>
                  <img
                    src={item.image01}
                    alt=""
                    className={activeProduct === index ? 'active' : null}
                  />

                  <img
                    src={item.image02}
                    alt=""
                    className={activeProduct === index ? 'active' : null}
                  />
                </div>
              );
            })}
          </div>
          <h3 className="product-card__name">{props.name}</h3>
          <div className="product-card__price">
            <span className="product-card__price__old">
              {props.old_price ? <del>${props.old_price}</del> : null}
            </span>
            ${props.price}
          </div>
        </Link>
        <div className="product-card__btn">
          {props.isAdmin ? (
            <>
              {' '}
              <Button
                size="sm"
                icon="bx bx-cart-add"
                animate={false}
                backgroundColor="red"
                onClick={() => {
                  props.deleteProduct(props.id, props.public_id);
                }}
              >
                {t('Xóa')}
              </Button>
              <Link to={`/edit-product/${props.id}`}>
                <Button
                  size="sm"
                  icon="bx bx-cart-add"
                  animate={false}
                >
                  {t('Sửa')}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <ProductViewModal
                id={props.id}
                name={props.name}
                price={props.price}
                old_price={props.old_price}
                discount={props.discount}
                image01={props.image01}
                image02={props.image02}
                checked={props.checked}
                color={props.color}
                size={props.size}
                description={props.description}
                sold={props.sold}
              ></ProductViewModal>
            </>
          )}
        </div>
        <div className="product-card__choice">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className={`product-card__choice__option`}
              >
                <img
                  src={item.image01}
                  alt=""
                  onClick={() => handleProductClick(index)}
                />

                <img
                  src={item.image02}
                  alt=""
                  onClick={() => handleProductClick(index)}
                />
              </div>
            );
          })}
        </div>
        <div
          className={
            props.discount ? 'product-card__sale' : 'product-card__hide'
          }
        >
          {`-${props.discount}%`}
        </div>
        <div
          className="product-card__like"
          onClick={() => {
            if (isLogged === true) {
              if (like === false) {
                localStorage.setItem(`${props.id}`, true);
                addFavorite(props);
                setLike(true);
              } else {
                removeProduct(props.id);
                setLike(false);
              }
            }
            else{
              navigate('/signin')
            }
          }}
        >
          <i
            className={
              localStorage.getItem(`${props.id}`)
                ? 'bx bxs-heart'
                : 'bx bx-heart'
            }
          ></i>
        </div>
      </div>{' '}
    </>
  );
};
ProductCard.propTypes = {
  image01: PropTypes.string.isRequired,
  image02: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  old_price: PropTypes.string,
  discount: PropTypes.string,
  activeAlert: PropTypes.bool,
};

export default ProductCard;
