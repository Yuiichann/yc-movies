import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ophimApi from './api/ophimApi';
import './App.scss';
import { addListMovies } from './app/movieSlice';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PageNotFound from './components/PageNotFound/PageNotFound';
import HomePage from './pages/HomePage/HomePage';
import MovieDetail from './pages/MovieDetail/MovieDetail';

function App() {
  const [showBtnScroll, setShowBtnScroll] = useState<boolean>(false);
  const [currPage, setCurrPage] = useState<number>(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovies = async () => {
      const res = await ophimApi.getMoviesLatest({ page: currPage });
      dispatch(addListMovies(res.data.items));
    };
    getMovies();
  }, [currPage]);

  const handleLoadMore = useCallback(() => {
    setCurrPage(currPage + 1);
  }, [currPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setShowBtnScroll(true);
      } else {
        setShowBtnScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage isLoadMore={handleLoadMore} />} />
            <Route path="/phim/:slug" element={<MovieDetail />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />

          {showBtnScroll ? (
            <div className="scroll-top" onClick={handleScrollToTop}>
              <img src="https://img.icons8.com/ios-filled/50/000000/circled-chevron-up.png" />
            </div>
          ) : (
            ''
          )}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
