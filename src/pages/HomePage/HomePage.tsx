import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import MoviesList from '../../components/MoviesList/MoviesList';
import { RootState } from '../../config/store';
import './HomePage.scss';

interface Props {
  isLoadMore: () => void;
}

const HomePage = (props: Props) => {
  const { isLoadMore } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const movies = useSelector((state: RootState) => state.movies);

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
          <MoviesList movieList={movies} />
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
