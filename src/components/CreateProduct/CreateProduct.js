import React, { useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import Loading from '../utils/Loading';
import { useAlert, types } from 'react-alert';
import { Helmet } from 'react-helmet';
import { MultiSelect } from 'react-multi-select-component';
import { useTranslation } from 'react-i18next';
const CreateProduct = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const [price, setPrice] = useState(0);
  const initialStateMemo = useMemo(() => {
    return {
      product_id: '',
      title: '',
      price: price,
      description: '',
      category: '',
      old_price: '',
      discount: '',
      _id: '',
      color: '',
      size: '',
    };
  }, []);
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialStateMemo);
  const [categories] = state.categoriesAPI.categories;
  const [image01, setImage01] = useState(false);
  const [image02, setImage02] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const navigate = useNavigate();
  const param = useParams();
  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;
  var color = [];
  var size = [];
  selectedColor.map((item) => {
    return color.push(item.value);
  });
  selectedSize.map((item) => {
    return size.push(item.value);
  });
  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImage01(product.image01);
          setImage02(product.image02);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialStateMemo);
      setImage01(false);
      setImage02(false);
    }
  }, [param.id, products, initialStateMemo]);
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin)
        return alert.show(
          <div style={{ fontSize: '12px' }}>
            Kh??ng c?? quy???n truy nh???p t??i nguy??n
          </div>,
          { type: types.ERROR }
        );
      const file = e.target.files[0];
      if (!file)
        return alert.show(
          <div style={{ fontSize: '12px' }}>
            Kh??ng c?? file n??o ???????c t???i l??n
          </div>,
          { type: types.ERROR }
        );

      if (file.size > 1024 * 1024)
        return alert.show(
          <div style={{ fontSize: '12px' }}>K??ch th?????c qu?? l???n</div>,
          { type: types.ERROR }
        );

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return alert.show(
          <div style={{ fontSize: '12px' }}>?????nh d???ng file kh??ng h???p l???</div>,
          { type: types.ERROR }
        );

      let formData = new FormData();
      formData.append('file', file);
      setLoading(true);

      const res = await axios.post('https://yolo-server.onrender.com/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });
      
      setLoading(false);
      setImage01(res.data);
    } catch (err) {
      alert.show(
        <div style={{ fontSize: '12px' }}>{err.response.data.msg}</div>,
        { type: types.ERROR }
      );
    }
  };
  const handleUpload2 = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin)
        return alert.show(
          <div style={{ fontSize: '12px' }}>
            Kh??ng c?? quy???n truy nh???p t??i nguy??n
          </div>,
          { type: types.ERROR }
        );
      const file = e.target.files[0];
      if (!file)
        return alert.show(
          <div style={{ fontSize: '12px' }}>
            Kh??ng c?? file n??o ???????c t???i l??n
          </div>,
          { type: types.ERROR }
        );

      if (file.size > 1024 * 1024)
        return alert.show(
          <div style={{ fontSize: '12px' }}>K??ch th?????c qu?? l???n</div>,
          { type: types.ERROR }
        );

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return alert.show(
          <div style={{ fontSize: '12px' }}>?????nh d???ng file kh??ng h???p l???</div>,
          { type: types.ERROR }
        );

      let formData = new FormData();
      formData.append('file', file);
      setLoading2(true);
      const res = await axios.post('https://yolo-server.onrender.com/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setLoading2(false);
      setImage02(res.data);
    } catch (err) {
      alert.show(
        <div style={{ fontSize: '12px' }}>{err.response.data.msg}</div>,
        { type: types.ERROR }
      );
    }
  };
  const handleDestroy = async () => {
    try {
      if (!isAdmin)
        return alert.show(
          <div style={{ fontSize: '12px' }}>
            Kh??ng c?? quy???n truy nh???p t??i nguy??n
          </div>,
          { type: types.ERROR }
        );
      setLoading(true);
      await axios.post(
        'https://yolo-server.onrender.com/api/destroy',
        { public_id: image01.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImage01(false);
    } catch (err) {
      alert.show(
        <div style={{ fontSize: '12px' }}>{err.response.data.msg}</div>,
        { type: types.ERROR }
      );
    }
  };
  const handleDestroy2 = async () => {
    try {
      if (!isAdmin)
        return alert.show(
          <div style={{ fontSize: '12px' }}>
            Kh??ng c?? quy???n truy nh???p t??i nguy??n
          </div>,
          { type: types.ERROR }
        );
      setLoading2(true);
      await axios.post(
        'https://yolo-server.onrender.com/api/destroy',
        { public_id: image02.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading2(false);
      setImage02(false);
    } catch (err) {
      alert.show(
        <div style={{ fontSize: '12px' }}>{err.response.data.msg}</div>,
        { type: types.ERROR }
      );
    }
  };
  const images = { image01, image02 };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  useEffect(() => {
    setPrice(product.old_price - (product.old_price * product.discount) / 100);
  }, [product.old_price, product.discount, product, price]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert('B???n kh??ng c?? quy???n n??y');
      if (!image01 || !image02 || selectedColor.length===0 || selectedSize.length ===0)
        return alert.show(
          <div style={{ fontSize: '12px' }}>
            Cung c???p ?????y ????? th??ng tin s???n ph???m
          </div>,
          { type: types.ERROR }
        );
      if (onEdit) {
        await axios.put(
          `https://yolo-server.onrender.com/api/products/${product._id}`,
          { ...product, ...images, color,size },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          'https://yolo-server.onrender.com/api/products',
          { ...product, ...images, color,size },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      navigate('/');
    } catch (err) {
      alert.show(
        <div style={{ fontSize: '12px' }}>{err.response.data.msg}</div>,
        { type: types.ERROR }
      );
    }
  };

  const styleUpload = {
    display: image01 ? 'block' : 'none',
  };

  const styleUpload2 = {
    display: image02 ? 'block' : 'none',
  };
  const options = [
    { label: '????? ', value: 'red' },
    { label: 'Xanh d????ng', value: 'blue' },
    { label: 'H???ng', value: 'pink' },
  ];
  const option1 = [
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: 'XXL', value: 'XXL' },
  ];
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>T???o s???n ph???m</title>
        <link
          rel="canonical"
          href="http://mysite.com/example"
        />
        <meta
          name="description"
          content="Truong Van Tam dang dev Yolo"
        />
      </Helmet>
      <div className="create_product">
        <div className="create_product__wrap">
          <div className="create_product__upload">
            <input
              type="file"
              name="file"
              id="file_up"
              onChange={handleUpload}
            />
            {loading ? (
              <div id="file_img">
                <Loading />
              </div>
            ) : (
              <div
                id="file_img"
                style={styleUpload}
              >
                <img
                  src={image01 ? image01.url : ''}
                  alt=""
                />
                <span onClick={handleDestroy}>X</span>
              </div>
            )}
          </div>
          <div className="create_product__upload">
            <input
              type="file"
              name="file_2"
              id="file_up_2"
              onChange={handleUpload2}
            />
            {loading2 ? (
              <div id="file_img_2">
                <Loading />
              </div>
            ) : (
              <div
                id="file_img_2"
                style={styleUpload2}
              >
                <img
                  src={image02 ? image02.url : ''}
                  alt=""
                />
                <span onClick={handleDestroy2}>X</span>
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <h1>{t("Th??ng tin s???n ph???m")}</h1>

          <div className="row">
            <label htmlFor="product_id">ID </label>
            <input
              type="text"
              name="product_id"
              id="product_id"
              required
              value={product.product_id}
              onChange={handleChangeInput}
              disabled={onEdit}
            />
          </div>

          <div className="row">
            <label htmlFor="title">{t("T??n")}</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={product.title}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="discount">{t("Gi???m gi??")} (%)</label>
            <input
              type="number"
              name="discount"
              id="discount"
              value={product.discount}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="old_price">{t("Gi?? c??")} ($)</label>
            <input
              type="number"
              name="old_price"
              id="old_price"
              value={product.old_price}
              onChange={handleChangeInput}
            />
          </div>
          <div
            className="row"
            style={{ position: 'relative' }}
          >
            <label htmlFor="price">{t("Gi??")} ($)</label>
            <input
              type="number"
              name="price"
              id="price"
              value={product.price}
              onChange={handleChangeInput}
            />
            {product.discount !== 0 && product.old_price !== 0 ? (
              <div className="hint-price">
                <i className="bx bxs-bulb"></i>
                <span>{Math.ceil(price)}</span>
              </div>
            ) : null}
          </div>
          <div className="row">
            <label htmlFor="color">{t("M??u")}</label>
            <MultiSelect
              options={options}
              value={selectedColor}
              onChange={setSelectedColor}
              labelledBy="Ch???n"
            />
          </div>
          <div className="row">
            <label htmlFor="size">{t("K??ch c???")}</label>
            <MultiSelect
              options={option1}
              value={selectedSize}
              onChange={setSelectedSize}
              labelledBy="Ch???n"
            />
          </div>
          <div className="row">
            <label htmlFor="description">{t("M?? t???")}</label>
            <textarea
              type="text"
              name="description"
              id="description"
              required
              value={product.description}
              rows="5"
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="categories">{t("Danh m???c")}: </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChangeInput}
            >
              <option value="">{t("Ch???n danh m???c cho s???n ph???m")}</option>
              {categories.map((category) => (
                <option
                  value={category._id}
                  key={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">{onEdit ? `${t('C???p nh???t')}`: `${t('T???o')}`}</button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
