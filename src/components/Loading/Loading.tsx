import React from 'react';
import './Loading.scss';
import loadingGif from '../../assets/loading.gif';


const Loading = () => {
  return (
    <div className="loading">
      <img src={loadingGif} alt="loading" />
    </div>
  );
};

export default Loading;
