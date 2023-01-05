import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { GlobalState } from '../../GlobalState';
import { Helmet } from 'react-helmet';
function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState('');
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState('');
  const { t } = useTranslation();
  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        const res = await axios.post(
          '/api/category',
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
      }
      setOnEdit(false);
      setCategory('');
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t("Tạo danh mục")} </title>
          <link
            rel="canonical"
            href="http://mysite.com/example"
          />
          <meta
            name="description"
            content="Truong Van Tam dang dev Yolo"
          />
        </Helmet>
    <div className="categories-wrapper">
      <div className="categories-wrapper__img">
      <img
          src={require('../../Asset/images/category.svg').default}
          alt=""
        />
      </div>
      <div className="categories-wrapper__main">
        <form onSubmit={createCategory}>
          <label htmlFor="category">{t('Danh mục')}</label>
          <input
            type="text"
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />

          <button type="submit">{onEdit ? `${t('Cập nhật')}`: `${t('Tạo')}`}</button>
        </form>

        <div className="col">
          {categories.map((category) => (
            <div
              className="row"
              key={category._id}
            >
              <p>{category.name}</p>
              <div>
                <button
                  onClick={() => editCategory(category._id, category.name)}
                >
                {t('Sửa')}
                </button>
                <button onClick={() => deleteCategory(category._id)}>
                {t('Xóa')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default Categories;
