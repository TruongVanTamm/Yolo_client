import React, { useEffect, useState } from 'react';
import Section, {
  SectionBody,
  SectionTitle,
} from '../components/Layout/Section';
import Grid from '../components/Layout/Grid';
import ProductCard from '../components/Card/ProductCard';
import { useParams } from 'react-router-dom';
import ProductView from '../components/ProductsView/ProductView';
import { Helmet } from 'react-helmet';

import axios from 'axios';
const Product = () => {
  const [products, setProducts] = useState([]);
  const [slider, setSlider] = useState([]);
  const params = useParams();

  const [detailProduct, setDetailProduct] = useState([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`/api/products`);
      setProducts(res.data.products);
    };
    getProducts();
  }, []);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`/api/hero-slider`);
      setSlider(res.data);
    };
    getProducts();
  }, [products]);
  useEffect(() => {
    const allProduct = products.concat(slider);
    if (params.id) {
      allProduct.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products, slider]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [detailProduct]);
  if (detailProduct.length === 0) return null;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{detailProduct.title}</title>
        <link
          rel="canonical"
          href="http://mysite.com/example"
        />
        <meta
          name="description"
          content="Truong Van Tam dang dev Yolo"
        />
      </Helmet>
      <Section>
        <SectionBody>
          <ProductView
            id={detailProduct._id}
            name={detailProduct.title}
            price={detailProduct.price}
            old_price={detailProduct.old_price}
            discount={detailProduct.discount}
            image01={detailProduct.image01.url}
            image02={detailProduct.image02.url}
            checked={detailProduct.checked}
            color={detailProduct.color}
            size={detailProduct.size}
            description={detailProduct.description}
            sold={detailProduct.sold}
          />
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid
            col={6}
            mdCol={3}
            smCol={2}
            gap={20}
          >
            {products.map((item, index) => {
              return item.category === detailProduct.category ? (
                <ProductCard
                  id={item._id}
                  key={index}
                  name={item.title}
                  price={item.price}
                  old_price={item.old_price}
                  discount={item.discount}
                  slug={item.slug}
                  image01={item.image01.url}
                  image02={item.image02.url}
                />
              ) : null;
            })}
          </Grid>
        </SectionBody>
      </Section>
    </>
  );
};

export default Product;
