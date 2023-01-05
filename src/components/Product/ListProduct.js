import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Grid from '../Layout/Grid';
import ProductCard from '../Card/ProductCard';
import { GlobalState } from '../../GlobalState';

const InfinityList = (props) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <div className="catolog_wrap">
        
          <Grid
            col={6}
            mdCol={3}
            smCol={2}
            gap={20}
          >
            {props.data.map((products, index) => {
              const public_id = {
                public_id_1: products.image01.public_id,
                public_id_2: products.image02.public_id,
              };
              return (
                <ProductCard
                  key={index}
                  id={products._id}
                  public_id={public_id}
                  name={products.title}
                  price={products.price}
                  old_price={products.old_price}
                  discount={products.discount}
                  image01={products.image01.url}
                  image02={products.image02.url}
                  checked={products.checked}
                  color={products.color}
                  size={products.size}
                  sold={products.sold}
                  isAdmin={isAdmin}
                  deleteProduct={props.deleteProduct}
                  handleCheck={props.handleCheck}
                  checkAll={props.checkAll}
                  deleteAll={props.deleteAll}
                />
              );
            })}
          </Grid>
        
    </div>
  );
};

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default InfinityList;
