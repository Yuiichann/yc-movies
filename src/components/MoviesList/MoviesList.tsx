import { Movies2 } from '../../app/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesList.scss';

interface Props {
  movieList: Movies2[];
}

const MoviesList = (props: Props) => {
  const { movieList } = props;

  return (
    <div className="movies-list">
      {movieList.map((movie, index) => (
        <MovieCard key={movie._id || index} name={movie.name} slug={movie.slug} year={movie.year} />
      ))}
    </div>
  );
};

export default MoviesList;
