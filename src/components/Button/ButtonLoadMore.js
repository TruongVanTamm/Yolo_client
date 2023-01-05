import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';

function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsAPI.page;
  const [result] = state.productsAPI.result;

  return (
    <div className="btn-load-more ">
      {result < page * 6 ? (
        ''
      ) : (
        <button onClick={() => setPage(page + 1)}>Tải thêm</button>
      )}
    </div>
  );
}

export default LoadMore;
