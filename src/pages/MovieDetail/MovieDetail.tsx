import { memo, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ophimApi from '../../api/ophimApi';
import Loading from '../../components/Loading/Loading';
import Slider from '../../components/Slider/Slider';
import Video from '../../components/Video/Video';
import './MovieDetail.scss';
import { Movie } from './MovieInterface';

const MovieDetail = () => {
  const { slug } = useParams();
  const [movieInfo, setMovieInfo] = useState<Movie | null>(null);
  const btnTrailer = useRef<HTMLHeadingElement | null>(null);
  const [isAdult, setIsAdult] = useState<boolean>(false);

  // scroll to top :<
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

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
