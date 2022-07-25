import { memo } from 'react';
import { useSelector } from 'react-redux';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Movies2 } from '../../app/movieSlice';
import { RootState } from '../../config/store';
import MovieCard from '../MovieCard/MovieCard';
import './Slider.scss';

const Slider = () => {
  const movies = useSelector((state: RootState) => state.movies);
  return (
    <Swiper spaceBetween={10} grabCursor={true} slidesPerView={'auto'}>
      {movies.map(
        (movie: Movies2, index) =>
          index < 9 && (
            <SwiperSlide key={movie.slug} className="slider-item">
              <MovieCard name={movie.name} slug={movie.slug} year={movie.year} />
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
};

export default memo(Slider);
