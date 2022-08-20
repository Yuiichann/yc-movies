import { Link } from 'react-router-dom';
import { Autoplay, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Movies2 } from '../../app/movieSlice';
import './HeroSlide.scss';
import apiConfig from '../../api/apiConfig';
import LazyLoad from 'react-lazyload';

interface Props {
  movieList: Movies2[];
}

const HeroSlide = (props: Props) => {
  const { movieList } = props;

  return (
    <div className="hero-slide">
      <h2 className="title-movie">Phim mới update</h2>

      <div className="swiper">
        <Swiper
          modules={[Autoplay, Pagination, Scrollbar]}
          autoplay={{ delay: 3000 }}
          slidesPerView={1}
          spaceBetween={2}
          grabCursor={true}
        >
          {movieList.map(
            (movie, index) =>
              index <= 9 && (
                <SwiperSlide key={movie._id || index}>
                  <SwiperCard
                    name={movie.name}
                    slug={movie.slug}
                    year={movie.year}
                    origin_name={movie.origin_name}
                  />
                </SwiperSlide>
              )
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSlide;

// Interface and component Swiper card - Only used with heroslide
interface SwiperProps {
  name: string;
  origin_name: string;
  year?: number;
  slug: string;
}

const SwiperCard = (props: SwiperProps) => {
  const { name, origin_name, slug, year } = props;

  return (
    <div
      className="swiper-card"
      style={{ backgroundImage: `url(${apiConfig.posterUrl(`movies/${slug}`)})` }}
    >
      <div className="overlay"></div>
      <div className="content">
        <div className="poster">
          <LazyLoad height={200}>
            <img src={apiConfig.thumbUrl(`movies/${slug}`)} alt={`${slug}_img`} />
          </LazyLoad>
        </div>

        <div className="info">
          <h1>{name}</h1>
          <h3>{origin_name}</h3>
          <p>{year}</p>

          <Link to={`/phim/${slug}`} className="btn">
            Xem Ngay
          </Link>
        </div>
      </div>
    </div>
  );
};
