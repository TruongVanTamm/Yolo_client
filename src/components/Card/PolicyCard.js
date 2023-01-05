import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
const PolicyCard = (props) => {
  const { t } = useTranslation();
  return (
    <div className="policy-card">
      <div className="policy-card__icon">
        <i className={props.icon}></i>
      </div>
      <div className="policy-card__info">
        <div className="policy-card__info__name">{t(props.name)}</div>
        <div className="policy-card__info__description">
          {t(props.description)}
        </div>
      </div>
    </div>
  );
};

PolicyCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default PolicyCard;
