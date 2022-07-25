import React from 'react';
import pnf from '../../assets/pnf.jpg';
import './PageNotFound.scss';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <img src={pnf} alt="" />
    </div>
  );
};

export default PageNotFound;
