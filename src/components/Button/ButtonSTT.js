import React, { useEffect, useState } from 'react'


const ButtonSTT = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
  return (
      <>
    <div className={showTopBtn ? 'buttonstt': 'hide'} onClick={goToTop}>
        <button className="buttonstt__button">
        <i className='bx bx-up-arrow-alt buttonstt__button__icon' ></i>
        </button>
    </div>
      </>
  )
}

export default ButtonSTT
