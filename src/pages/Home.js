import React, { useContext, useEffect, useState } from 'react';
import policy from '../Asset/fake-data/policy';
import { Helmet } from 'react-helmet';
import HeroSlider from '../components/Hero/HeroSlider';
import Section, {
  SectionBody,
  SectionTitle,
} from '../components/Layout/Section';
import PolicyCard from '../components/Card/PolicyCard';
import Grid from '../components/Layout/Grid';
import ProductCard from '../components/Card/ProductCard';
import ButtonSTT from '../components/Button/ButtonSTT';
import ChatBot from '../components/Chatbot/ChatBot';
import axios from 'axios';
import { GlobalState } from '../GlobalState';
import Swiper from '../components/utils/Swiper';
import { useTranslation } from 'react-i18next';
const Home = () => {
  const state = useContext(GlobalState);
  const { t } = useTranslation();
  const [product1, setProduct1] = useState([]);
  const [product2, setProduct2] = useState([]);
  const [product3, setProduct3] = useState([]);
  const [slider] = state.productsAPI.slider;
  const [sort, setSort] = useState('');
  const [sort1, setSort1] = useState('');
  const [sort2, setSort2] = useState('');
  const [page] = useState(1);
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [result, setResult] = useState(0);
  const [result1, setResult1] = useState(0);
  const [result2, setResult2] = useState(0);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`/api/products?limit=${page * 6}&${sort}`);
      setSort('sort=-sold');
      setProduct1(res.data.products);
      setResult(res.data.result);
    };
    getProducts();
  }, [page, sort]);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`/api/products?limit=${page1 * 12}&${sort1}`);
      setSort1('');
      setProduct2(res.data.products);
      setResult1(res.data.result);
    };
    getProducts();
  }, [page1, sort1]);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`/api/products?limit=${page2 * 6}&${sort2}`);
      setSort2('sort=oldest');
      setProduct3(res.data.products);
      setResult2(res.data.result);
    };
    getProducts();
  }, [page2, sort2]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Yolo</title>
        <link
          rel="canonical"
          href="http://mysite.com/example"
        />
        <meta
          name="description"
          content="Truong Van Tam dang dev Yolo"
        />
      </Helmet>

      <HeroSlider
        data={slider}
        control={true}
        auto={false}
        timeOut={5000}
      ></HeroSlider>
      <Section>
        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {policy.map((item, index) => {
              return (
                <PolicyCard
                  key={index}
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                ></PolicyCard>
              );
            })}
          </Grid>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>top sản phẩm bán chạy trong tuần</SectionTitle>
        <SectionBody>
          <Grid
            col={6}
            mdCol={4}
            smCol={2}
            gap={20}
          >
            {product1.map((item, index) => {
              return (
                <ProductCard
                  key={index}
                  id={item._id}
                  name={item.title}
                  price={item.price}
                  old_price={item.old_price}
                  discount={item.discount}
                  image01={item.image01.url}
                  image02={item.image02.url}
                  description={item.description}
                  checked={item.checked}
                  color={item.color}
                  size={item.size}
                  sold={item.sold}
                ></ProductCard>
              );
            })}
          </Grid>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>sản phẩm mới</SectionTitle>
        <SectionBody>
          <Grid
            col={6}
            mdCol={3}
            smCol={2}
            gap={20}
          >
            {product2.map((item, index) => {
              return (
                <ProductCard
                  key={index}
                  id={item._id}
                  name={item.title}
                  price={item.price}
                  old_price={item.old_price}
                  discount={item.discount}
                  image01={item.image01.url}
                  image02={item.image02.url}
                  description={item.description}
                  checked={item.checked}
                  color={item.color}
                  size={item.size}
                  sold={item.sold}
                ></ProductCard>
              );
            })}
          </Grid>
          <div className="btn-load-more ">
            {result1 < page1 * 8 ? (
              ''
            ) : (
              <button onClick={() => setPage1(page1 + 1)}>{t("Tải thêm")}</button>
            )}
          </div>
        </SectionBody>
      </Section>
      <Section>
        <div className="Section__swiper" >
            <Swiper></Swiper> 
          <div className="Section__swiper__static">
            <img src={require('../Asset/images/banner1.jpg')} alt="" />
            <img src={require('../Asset/images/banner3.jpg')} alt="" />
          </div>
        </div>
      </Section>
      <Section>
        <SectionTitle>phổ biến</SectionTitle>
        <SectionBody>
          <Grid
            col={6}
            mdCol={3}
            smCol={2}
            gap={20}
          >
            {product3.map((item, index) => {
              return (
                <ProductCard
                  key={index}
                  id={item._id}
                  name={item.title}
                  price={item.price}
                  old_price={item.old_price}
                  discount={item.discount}
                  image01={item.image01.url}
                  image02={item.image02.url}
                  description={item.description}
                  checked={item.checked}
                  color={item.color}
                  size={item.size}
                  sold={item.sold}
                ></ProductCard>
              );
            })}
          </Grid>

          <div className="btn-load-more ">
            {result2 < page2 * 6 ? (
              ''
            ) : (
              <button onClick={() => setPage2(page2 + 1)}>Tải thêm</button>
            )}
          </div>
        </SectionBody>
      </Section>
      <ChatBot></ChatBot>
      <ButtonSTT></ButtonSTT>
    </>
  );
};

export default Home;
