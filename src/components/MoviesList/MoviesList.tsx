import React from 'react';
import { Movies } from '../../app/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesList.scss';

interface Props {
  movieList: Movies[];
}

const MoviesList = (props: Props) => {
  const { movieList } = props;

  return (
    <div className="movies-list">
      {movieList.map((movie) => (
        <MovieCard key={movie._id} name={movie.name} slug={movie.slug} year={movie.year} />
      ))}
    </div>
  );
};

export default MoviesList;
