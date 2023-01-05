import React from 'react'

const NoProduct = ({data}) => {
  return (
    <div className='catalog__content__not-found__main'>
     <h1>Không tìm thấy sản phẩm ! </h1>
     <img src={require("../../Asset/images/filter.png" )} alt="" />
     <h1> Vui lòng thử lại</h1>
    </div>
  )
}
export default NoProduct
