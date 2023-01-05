import React, { useContext, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Button from '../../components/Button/Button';
import { GlobalState } from '../../GlobalState';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import NoProduct from '../utils/NoProduct'
const Favorites = () => {
  const state = useContext(GlobalState);
  const [favorite] = state.userAPI.favorite;
  const removeProduct = state.userAPI.removeProduct;
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return favorite.length > 0 ? (
    <>
      <Row>
        {favorite.map((item) => {
          return (
            <Col
              key={item.id}
              xl={2}
              md={4}
              xs={6}
            >
              <Card className="favorite-card">
                <div className="favorite-card-img">
                  <img
                    src={item.image01}
                    alt={['item']}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{item.name.toUpperCase()}</Card.Title>
                  <div className="favorite-card__ctrl">
                    <Link to={`/${item.id}`}>
                      <Button
                        variant="primary"
                        size="sm"
                      >
                        {t('Xem')}
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => removeProduct(item.id)}
                    >
                      {t('Xóa')}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  ) : (
    <NoProduct></NoProduct>
  );
};

export default Favorites;
