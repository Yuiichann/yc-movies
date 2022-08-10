import { addDoc, collection } from 'firebase/firestore';
import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ophimApi from '../../api/ophimApi';
import { addMovie } from '../../app/favoritesSlice';
import Loading from '../../components/Loading/Loading';
import Slider from '../../components/Slider/Slider';
import Video from '../../components/Video/Video';
import { AppDispatch, RootState } from '../../config/store';
import { db } from '../../firebase/config';
import './MovieDetail.scss';
import { Movie } from './MovieInterface';

const MovieDetail = () => {
  const { slug } = useParams();
  const [movieInfo, setMovieInfo] = useState<Movie | null>(null);
  const [inFavoriteList, setInFavoriteList] = useState<boolean>(false);
  const btnTrailer = useRef<HTMLHeadingElement | null>(null);
  const [isAdult, setIsAdult] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const favoriteList = useSelector((state: RootState) => state.favoriteMovies);
  const dispatch = useDispatch<AppDispatch>();

  // scroll to top :<
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // check In favorites List Movies
  useEffect(() => {
    if (user.isLogin && movieInfo) {
      const current = favoriteList.find((item) => item.slug === movieInfo.slug);

      setInFavoriteList(!!current);
    }
  }, [movieInfo, favoriteList]);

  // check adult
  useEffect(() => {
    const checkAdult = movieInfo?.category.find((item) => item.name === 'Phim 18+');
    setIsAdult(() => !!checkAdult);
  }, [movieInfo]);

  // call api get Movie with slug
  useEffect(() => {
    setMovieInfo(null);
    const getMovie = async () => {
      if (slug) {
        const res = await ophimApi.getOneMovie(slug);
        setMovieInfo(res.data.movie);
      }
    };
    getMovie();
  }, [slug]);

  // set title when change movie
  useEffect(() => {
    if (movieInfo) {
      document.title = movieInfo?.name || movieInfo?.origin_name;
    } else {
      document.title = 'Loading . . .';
    }

    return () => {
      document.title = 'YC Movies';
    };
  }, [movieInfo]);

  const handleClickTrailer = () => {
    btnTrailer.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  // add favorite List
  const handleAddFavorite = () => {
    if (user.isLogin) {
      if (movieInfo) {
        // call api update firestore
        const addMovieFireStore = async () => {
          await addDoc(collection(db, 'FavoriteMovies'), {
            slug: movieInfo.slug,
            name: movieInfo.name,
            orgin_name: movieInfo.origin_name,
            user_name: user.current.name,
            email: user.current.email,
            uid: user.current.id,
          });

          console.log('add docs');
        };
        addMovieFireStore();

        // update redux then render UI ----- realtime fake
        dispatch(
          addMovie({
            slug: movieInfo.slug,
            name: movieInfo.name,
            origin_name: movieInfo.origin_name,
          })
        );
        toast.success('Thêm thành công!');
      }
    } else {
      toast.warn('Vui lòng đăng nhập để thêm phim!!!');
    }
  };

  return (
    <div className="main section section--sm">
      <div className={`full-overlay ${isAdult ? '' : 'hidden'}`}>
        <div className="alert">
          <h2>CẢNH BÁO!!!</h2>
          <p>Bạn đang tiến vào thế giới của người lớn. Bạn có muốn tiếp tục không?</p>

          <div className="alert-btn">
            <button className="btn" onClick={() => setIsAdult(false)}>
              SEGGG!
            </button>
            <Link className="btn btn--alert" to="/">
              Em chưa 18!
            </Link>
          </div>
        </div>
      </div>
      {!movieInfo ? (
        <Loading />
      ) : (
        <>
          {/* Breadcumb */}
          <div className="breadcumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <a style={{ cursor: 'pointer' }}>{movieInfo.name}</a>
          </div>

          {/* Infomation Movie */}
          <div className="movie" style={{ backgroundImage: `url(${movieInfo.poster_url})` }}>
            <div className="overlay"></div>
            <div className="detail">
              <div className="thumb-img">
                <img src={movieInfo.thumb_url} alt={movieInfo.slug} />
              </div>
              <div className="info">
                <div className="info-top">
                  <h1>{movieInfo.name}</h1>
                  <h3>{movieInfo.origin_name}</h3>
                  <p>{movieInfo.content.replace(/<\/?[^>]+(>|$)/g, '')}</p>
                </div>
                <div className="info-bot">
                  <p>
                    {movieInfo.episode_current} / {movieInfo.episode_total || '??'}
                  </p>
                  <p>
                    Chất lượng: {movieInfo.lang} - {movieInfo.quality}
                  </p>
                  <p>Thời lượng: {movieInfo.time || '??'}</p>
                  <p>Năm: {movieInfo.year}</p>
                </div>
                <div className="info-btn-group">
                  {inFavoriteList ? (
                    <button className="btn btn--lg btn--outline">
                      Xóa khỏi danh sách yêu thích
                    </button>
                  ) : (
                    <button className="btn btn--lg btn--outline" onClick={handleAddFavorite}>
                      Thêm vào danh sách yêu thích
                    </button>
                  )}
                </div>
                <div className="info-btn-group">
                  <Link to={`/xem-phim/${movieInfo.slug}`} className="btn btn--lg">
                    Xem Phim
                  </Link>
                  <button className="btn btn--lg btn--outline" onClick={handleClickTrailer}>
                    Trailer
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trailer */}
          <div className="trailer" id="#trailer" ref={btnTrailer}>
            <h1 className="title-movie">Trailer</h1>
            <Video url_yt={movieInfo.trailer_url} />
          </div>

          {/*Slider */}
          <div className="swiper">
            <h1 className="title-movie">Phim mới cập nhật</h1>
            <Slider />
          </div>
        </>
      )}
    </div>
  );
};

export default memo(MovieDetail);
