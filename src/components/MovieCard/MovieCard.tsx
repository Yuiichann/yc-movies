import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import './MovieCard.scss';

interface Props {
  name: string;
  slug: string;
  year: number | undefined;
}

const MovieCard = (props: Props) => {
  const { name, year, slug } = props;
  const [imageUrl, setImageUrl] = useState<string>(apiConfig.thumbUrl(`movies/${slug}`));
  const handleImage = () => setImageUrl(apiConfig.posterUrl(`movies/${slug}`));

  return (
    <Link to={`/phim/${slug}`} className="movie-card">
      <img src={imageUrl} alt="" className="movie-card-img" onError={handleImage} />
      <div className="movie-card-info">
        <p className="name">{name}</p>
        <p className="year">{year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
