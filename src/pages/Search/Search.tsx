import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movies } from '../../app/movieSlice';
import Loading from '../../components/Loading/Loading';
import MoviesList from '../../components/MoviesList/MoviesList';

const Search = () => {
  let { keyword } = useParams();
  const [data, setData] = useState<Movies[]>();
  const [loading, setLoading] = useState<boolean>(true);

  // call api get data search
  useEffect(() => {
    setData(() => []);
    setLoading(true);
    const searchData = async () => {
      try {
        const res = await axios.get(`http://api-ycmovies.herokuapp.com/search/${keyword}`);
        setLoading(false);
        setData(() => res.data);
      } catch (error) {
        console.log(error);
      }
    };
    searchData();
  }, [keyword]);

  return (
    <div className="main section">
      {loading ? (
        <Loading />
      ) : data && data.length > 1 ? (
        <MoviesList movieList={data} />
      ) : (
        <h1 style={{ textAlign: 'center' }}>Không tìm thấy . . .</h1>
      )}
    </div>
  );
};

export default Search;
