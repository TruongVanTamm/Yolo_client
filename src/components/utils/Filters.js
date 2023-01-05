import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import { useTranslation } from 'react-i18next';
function Filters() {
  const { t } = useTranslation();
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;
  const fix = categories
    .map((category) => category._id)
    .find((item) => item === category.split('=')[1]);
  const searchCate = categories
    .map((item) => {
      if (item._id === fix) {
        return item.name;
      } else {
        return null;
      }
    })
    .filter((items) => items !== null).toString()
  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch('');
  };
  const timkiem='Tìm kiếm'
  return (
    <div className="catalog__content__action__filter_menu">
      <div className="catalog__content__action__filter_menu__category">
        <span>{t('Lọc: ')} </span>
        <select
          name="category"
          value={category}
          onChange={handleCategory}
        >
          <option value="">{t('Tất cả')}</option>
          {categories.map((category) => (
            <option
              value={'category=' + category._id}
              key={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="catalog__content__action__filter_menu__sort">
        <span>{t('Xếp theo:')} </span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">{t('Mới nhất')}</option>
          <option value="sort=oldest">{t('Cũ nhất')}</option>
          <option value="sort=-sold">{t('Bán chạy nhất')}</option>
          <option value="sort=-price">{t('Giá: cao đến thấp')} </option>
          <option value="sort=price">{t('Giá: thấp đến cao')} </option>
        </select>
      </div>
      <input
        type="text"
        value={search}
        placeholder={searchCate ? ` ${t(timkiem)} ${searchCate} ` : `${t(timkiem)}...`}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        className="catalog__content__action__filter_menu__search"
      />
    </div>
  );
}

export default Filters;
