import React from 'react'
import { useTranslation } from 'react-i18next';
const Section = (props) => {
  return (
    <div className='section'>
        {props.children}
    </div>
  )
}
 export const SectionTitle = (props) => {
  const { t } = useTranslation();
    return (
      <div className='section__title'>
          {t(props.children)}
      </div>
    )
 }
export const SectionBody = (props) => {
    return (
      <div className='section__body'>
          {props.children}
      </div>
    )
  }
export default Section
