import React from 'react';
import ProductView from './ProductView';
import Modal from 'react-modal';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
Modal.setAppElement('#root');
const customStyles = {
  overlay: {
    zIndex: 1000,
    // backgroundColor: '#808080',
  },

};
const ProductViewModal = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div >
      <Button
        size="sm"
        onClick={openModal}
        noMargin='noMargin'
      >
        {t('Xem')}
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        preventScroll={true}
        shouldCloseOnEsc={true}
      >
        <div
          className="product_view_modal__header"
        >
          <span >{props.name}</span>
          <div
            style={{
              fontSize: '3.5rem',
              position: 'absolute',
              height: '60px',
              right: '20px',
              top: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems:'center',
            }}
            onClick={closeModal}
          >
            <i className="bx bx-x"></i>
          </div>
        </div>
        <div style={{ paddingRight: "20px", paddingLeft: "20px",paddingTop: "10px"}}>
          <ProductView
            id={props.id}
            name={props.name}
            price={props.price}
            old_price={props.old_price}
            discount={props.discount}
            image01={props.image01}
            image02={props.image02}
            checked={props.checked}
            color={props.color}
            size={props.size}
            description={props.description}
            sold={props.sold}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProductViewModal;
