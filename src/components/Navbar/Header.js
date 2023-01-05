import axios from 'axios';
import React, { useContext, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../Asset/images/Logo-2.png';
import logoAdmin from '../../Asset/images/logoAdmin.png';
import { GlobalState } from '../../GlobalState';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import cookie from 'js-cookie';
import classNames from 'classnames';
import DarkMode from '../utils/DarkMode';
const mainNav = [
  {
    display: 'Trang chủ',
    path: '/',
  },
  {
    display: 'Sản phẩm',
    path: '/catalog',
  },
  {
    display: 'Liên hệ',
    path: '/contact',
  },
];
const Header = () => {
  const languages = [
    {
      code: 'en',
      name: 'Tiếng Anh',
    },
    {
      code: 'vi',
      name: 'Việt Nam',
    },
  ];
  const currentLanguageCode = cookie.get('i18next') || 'vi';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { pathname } = useLocation();
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const headerRef = useRef(null);
  const menuLeft = useRef(null);
  const { t } = useTranslation();
  const menuToggle = () => {
    menuLeft.current.classList.toggle('active');
  };
  const logoutUser = async () => {
    await axios.get('/user/logout');

    localStorage.removeItem('firstLogin');

    window.location.href = '/signin';
  };
  const adminRouter = () => {
    return (
      <>
        <div
          className="header__menu__right__item header__menu__item"
          title="Tạo sản phẩm "
        >
          <Link to="/create_product">
            <i className="bx bx-list-plus"></i>
          </Link>
        </div>
        <div
          className="header__menu__right__item header__menu__item"
          title="Danh mục sản phẩm "
        >
          <Link to="/category">
            <i className="bx bxs-category"></i>
          </Link>
        </div>
      </>
    );
  };
  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/profile"> {t('Thông tin khách hàng')}</Link>
        </li>
        <li>
          <Link to="/history"> {t('Lịch sử đơn hàng')}</Link>
        </li>
        <li>
          <Link to="/favorite">{t('Yêu thích')}</Link>
        </li>
        <li style={{ order: 6 }}>
          <button onClick={logoutUser}>{t('Đăng xuất')}</button>
        </li>
      </>
    );
  };
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    });
    return () => window.addEventListener('scroll');
  }, []);
  useEffect(() => {
    document.title = t('Yolo');
  }, [currentLanguage, t]);
  return (
    <div
      className="header"
      ref={headerRef}
    >
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            {isAdmin ? (
              <img
                src={logoAdmin}
                alt=""
                className="header__logo__admin"
              />
            ) : (
              <img
                src={logo}
                alt=""
                className="header__logo__user"
              />
            )}
          </Link>
        </div>
        <div className="header__menu">
          <div
            className="header__menu__mobile-toggle"
            onClick={menuToggle}
          >
            <i className="bx bx-menu"></i>
          </div>
          <div
            className="header__menu__left "
            ref={menuLeft}
          >
            <div
              className="header__menu__left-close"
              onClick={menuToggle}
            >
              <i className="bx bx-chevron-left"></i>
            </div>

            {mainNav.map((item, index) => {
              return (
                <div
                  className={`header__menu__left__item header__menu__item ${
                    index === activeNav ? 'active' : ''
                  }`}
                  key={index}
                  onClick={menuToggle}
                >
                  <Link to={item.path}>
                    <span className="header__menu__item">
                      {t(item.display)}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="header__menu__right">
            {isAdmin && adminRouter()}
            {!isAdmin && (
              <div
                className="header__menu__right__item header__menu__item"
                title="Giỏ hàng"
              >
                <span className="header__menu__right__item__quantity">
                  {cart.length}
                </span>
                <Link to="/cart">
                  <i className="bx bx-cart"></i>
                </Link>
              </div>
            )}

            <div className="header__menu__right__item header__menu__item header__menu__right__user-option">
              <i className="bx bx-user"></i>
              <div className="header__menu__right__item__user-option">
                <ul className="header__menu__right__item__user-option__list">
                  <li style={{ order: 4 }}>
                    <Navbar>
                      <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                          <NavDropdown
                            title={t('Ngôn Ngữ')}
                            id="basic-nav-dropdown"
                          >
                            {languages.map(({ code, name }) => (
                              <li key={code}>
                                <a
                                  href={`${pathname}`}
                                  onClick={() => {
                                    i18next.changeLanguage(code);
                                  }}
                                  className={classNames('dropdown-item', {
                                    disabled: currentLanguageCode === code,
                                  })}
                                >
                                  {t(name)}
                                </a>
                              </li>
                            ))}
                          </NavDropdown>
                        </Nav>
                      </Navbar.Collapse>
                    </Navbar>
                  </li>
                  <li
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '10px',
                      order: 5,
                    }}
                  >
                    <span>{t('Chế độ tối')}</span>
                    <DarkMode></DarkMode>
                  </li>
                  {isLogged ? (
                    loggedRouter()
                  ) : (
                    <>
                      <li style={{ order: 6 }}>
                        <Link to="/signin"> {t('Đăng nhập')}</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            {/* <div className="header__menu__right__item header__menu__item">
              <i className="bx bx-search"></i>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
