import { onAuthStateChanged } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ophimApi from './api/ophimApi';
import './App.scss';
import { addListMovies } from './app/movieSlice';
import { setUser, User } from './app/userSlice';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PageNotFound from './components/PageNotFound/PageNotFound';
import ScrollButton from './components/ScrollButton/ScrollButton';
import { AppDispatch } from './config/store';
import { auth } from './firebase/config';
import Home from './pages/AccountPage/AccountPage';
import HomePage from './pages/HomePage/HomePage';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Search from './pages/Search/Search';
import SignIn from './pages/SignIn/SignIn';
import WatchMovie from './pages/WatchMovie/WatchMovie';

function App() {
  const [currPage, setCurrPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();

  // handle firebase
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log('User not loggin');
        return;
      }

      const currentUser: User = {
        id: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        photoUrl: user.photoURL || '',
      };

      console.log('User logined!!');
      dispatch(
        setUser({
          current: currentUser,
          isLogin: true,
        })
      );
    });
    return () => unsubscribed();
  }, []);

  // Call api get List movie Latest
  useEffect(() => {
    const getMovies = async () => {
      const res = await ophimApi.getMoviesLatest({ page: currPage });
      dispatch(addListMovies(res.data.items));
    };
    getMovies();
  }, [currPage]);

  // Button handle Load More Video
  const handleLoadMore = useCallback(() => {
    setCurrPage(currPage + 1);
  }, [currPage]);

  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<HomePage isLoadMore={handleLoadMore} />} />
            <Route path="/phim/:slug" element={<MovieDetail />} />
            <Route path="/tim-kiem/:keyword" element={<Search />} />
            <Route path="/xem-phim/:slug" element={<WatchMovie />} />
            <Route path="/dang-nhap" element={<SignIn />} />
            <Route path="/tai-khoan" element={<Home />} />
            {/* Route Not Found */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />

          {/* Button scroll top */}
          <ScrollButton />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
