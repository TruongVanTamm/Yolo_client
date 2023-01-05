import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Grid from '../Layout/Grid';
import logo from '../../Asset/images/Logo.png';
import { GlobalState } from '../../GlobalState';
import { useTranslation } from 'react-i18next';
const footerSupportLink = [
  {
    display: 'Các câu hỏi thường gặp',
    path: '/about',
  },
  {
    display: 'Hướng dẫn đặt hàng',
    path: '/about',
  },
  {
    display: 'Phương thức vận chuyển',
    path: '/about',
  },
  {
    display: 'Hướng dẫn trả góp',
    path: '/about',
  },
  {
    display: 'Chính sách hàng nhập khẩu',
    path: '/about',
  },
  {
    display: 'Hỗ trợ khách hàng: anhtamqwer79@gmail.com',
    path: '/about',
  },
  {
    display: 'Báo lỗi bảo mật: anhtamqwer79@gmail.com',
    path: '/about',
  },
];

const footerAboutLink = [
  {
    display: 'Giới thiệu',
    path: '/about',
  },
  {
    display: 'Liên hệ',
    path: '/about',
  },
  {
    display: 'Tuyển dụng',
    path: '/about',
  },
  {
    display: 'Tin tức',
    path: '/about',
  },
  {
    display: 'Hệ thống cửa hàng',
    path: '/about',
  },
];

const footerCustomeLink = [
  {
    display: 'Chính sách đổi trả',
    path: '/about',
  },
  {
    display: 'Chính sách bảo hành',
    path: '/about',
  },
  {
    display: 'Chính sách hoàn tiền',
    path: '/about',
  },
];
const Footer = () => {
  const { t } = useTranslation();
  const state = useContext(GlobalState);
  const [theme] = state.theme;
  return (
    <footer
      className="container footer"
      id={theme}
    >
      <Grid
        col={4}
        mdCol={2}
        smCol={1}
        gap={10}
      >
        <div className="">
          <div className="footer__title">{t('Hỗ trợ khách hàng')}</div>
          <div className="footer__content">
            <p>
              Hotline: <a href="tel:0399817202">0399817202</a>
              <br />
              (1000 đ/{t('phút')}, 8-21h {t('kể cả')} T7, CN)
            </p>
            {footerSupportLink.map((item, index) => {
              return (
                <p key={index}>
                  <Link to={item.path}>{t(item.display)}</Link>
                </p>
              );
            })}
          </div>
        </div>
        <div>
          <div className="footer__title">{t('Về Yolo')}</div>
          <div className="footer__content">
            {footerAboutLink.map((item, index) => {
              return (
                <p key={index}>
                  <Link to={item.path}>{t(item.display)}</Link>
                </p>
              );
            })}
          </div>
        </div>

        <div>
          <div className="footer__title">{t('Chăm sóc khách hàng')}</div>
          <div className="footer__content">
            {footerCustomeLink.map((item, index) => {
              return (
                <p key={index}>
                  <Link to={item.path}>{t(item.display)}</Link>
                </p>
              );
            })}
          </div>
        </div>

        <div className="footer__about">
          <p>
            <Link to="/">
              <img
                src={logo}
                alt=""
                className="footer__logo"
              />
            </Link>
          </p>
          <p>
            {t(
              'Hướng đến mục tiêu mang lại niềm vui ăn mặc mỗi ngày cho hàng triệungười tiêu dùng Việt.' +
                'Hãy cùng Yolo hướng đến một cuộc sống năng động, tích cực hơn.' +
                ' Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ hành động của mình là sứ mệnh, là triết lý, chiến lược.. luôn cùng YOLO tiến bước'
            )}
          </p>
        </div>
      </Grid>
      <Grid
        col={1}
        mdCol={1}
        smCol={1}
      >
        <div className="footer__end">
          <span>
           {t('@ Bản quyền thuộc về Yolo.vn All right reserved')}
          </span>
        </div>
      </Grid>
    </footer>
  );
};

export default Footer;
