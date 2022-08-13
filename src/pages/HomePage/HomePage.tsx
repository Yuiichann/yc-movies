import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HeroSlide from '../../components/HeroSlide/HeroSlide';
import Loading from '../../components/Loading/Loading';
import MoviesList from '../../components/MoviesList/MoviesList';
import { RootState } from '../../config/store';
import './HomePage.scss';

interface Props {
  isLoadMore: () => void;
}

const HomePage = (props: Props) => {
  const { isLoadMore } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const movies = useSelector((state: RootState) => state.movies);
  
  // cut first 10 movies for hero slide and the another for MoviesList
  const newMovies = movies.filter((item, index) => index > 9);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="main section">
      {loading ? (
        <Loading />
      ) : (
        <>
          <HeroSlide movieList={movies} />

          <h1 className="title-movie" style={{ marginBottom: '16px' }}>
            Phim Tổng Hợp
          </h1>

          <MoviesList movieList={newMovies} />
          <div className="load-more">
            <button onClick={isLoadMore} className="btn">
              Xem Thêm
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(HomePage);
