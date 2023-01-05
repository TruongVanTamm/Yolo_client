import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductsAPI() {
  const [products, setProducts] = useState([]);
  const [slider, setSlider] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/api/products?limit=${
          page * 6
        }&${category}&${sort}&title[regex]=${search}`
      );
      setProducts(res.data.products);
      setResult(res.data.result);
    };
    getProducts();
  }, [callback, category, sort, search, page]);
  useEffect(() => {
    const getSlider = async () => {
      const res = await axios.get(
        `/api/hero-slider`
      );

      setSlider(res.data);
    };
    getSlider();
  }, []);
  
  return {
    products: [products, setProducts],
    slider:  [slider, setSlider] ,
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default ProductsAPI;
