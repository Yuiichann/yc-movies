import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Movies } from '../../app/movieSlice';
import MoviesList from '../../components/MoviesList/MoviesList';

const Search = () => {
  let { keyword } = useParams();
  const [data, setData] = useState<Movies[]>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setData(() => []);
    setLoading(true);
    const searchData = async () => {
      const res = await axios.get(`http://api-ycmovies.herokuapp.com/search/${keyword}`);
      setLoading(false);
      setData(() => res.data);
    };
    searchData();
  }, [keyword]);

  return (
    <div className="main section">
      {loading ? (
        <h1 className="loading">Đang tìm kiếm . . .</h1>
      ) : data && data.length > 1 ? (
        <MoviesList movieList={data} />
      ) : (
        <h1 className="loading">Không tìm thấy . . .</h1>
      )}
    </div>
  );
};

export default Search;
