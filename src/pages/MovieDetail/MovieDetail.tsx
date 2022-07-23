import { memo, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ophimApi from '../../api/ophimApi';
import Slider from '../../components/Slider/Slider';
import Video from '../../components/Video/Video';
import './MovieDetail.scss';
import { Movie } from './MovieInterface';

const MovieDetail = () => {
  const { slug } = useParams();
  const [movieInfo, setMovieInfo] = useState<Movie | null>(null);

  // scroll to top :<
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // call api get Movie with slug
  useEffect(() => {
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

  console.warn('re-render Movie-detail - KHÓK TIẾNG CHÓ');

  return (
    <div className="main section section--sm">
      {!movieInfo ? (
        <h1 className="loading">Đang tải dữ liệu . . .</h1>
      ) : (
        <>
          {/* Breadcumb */}
          <div className="breadcumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="#">{movieInfo.name}</Link>
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
                  <Link to="/" className="btn btn--lg">
                    Xem Phim
                  </Link>
                  <Link to="/" className="btn btn--lg btn--outline">
                    Trailer
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Trailer */}
          <div className="trailer">
            <h1>Trailer</h1>
            <Video url_yt={movieInfo.trailer_url} />
          </div>

          <div className="swiper">
            <Slider />
          </div>
        </>
      )}
    </div>
  );
};

export default memo(MovieDetail);
