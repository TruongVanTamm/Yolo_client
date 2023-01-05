import React from 'react';
import RoutesWrap from '../../router/routes';
import Footer from '../Footer/Footer';
import Header from '../Navbar/Header';
const SetupLayout = () => {
  return (
    <div >
      <Header />
      <div className="container" >
        <div className="main">
            <RoutesWrap></RoutesWrap>
        </div>
      </div>
      {/* <ProductViewModal></ProductViewModal> */}
      <Footer></Footer>
    </div>
  );
};

export default SetupLayout;
