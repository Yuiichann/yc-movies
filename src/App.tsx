import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ophimApi from './api/ophimApi';
import './App.scss';
import { FavoriteMovie, initList, removeList } from './app/favoritesSlice';
import { addListMovies } from './app/movieSlice';
import { setUser, setUserLogOut, User } from './app/userSlice';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PageNotFound from './components/PageNotFound/PageNotFound';
import ProtectedLayout, { ProtecedLayoutWhenLogin } from './components/ProtectedLayout';
import ScrollButton from './components/ScrollButton/ScrollButton';
import { AppDispatch, RootState } from './config/store';
import { auth, db } from './firebase/config';
import AccountPage from './pages/AccountPage/AccountPage';
import HomePage from './pages/HomePage/HomePage';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Search from './pages/Search/Search';
import SignIn from './pages/SignIn/SignIn';
import WatchMovie from './pages/WatchMovie/WatchMovie';

function App() {
  const user = useSelector((state: RootState) => state.user);
  const [currPage, setCurrPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();

  // handle firebase
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const user: User = {
          id: currentUser.uid,
          name: currentUser.displayName || '',
          email: currentUser.email || '',
          photoUrl: currentUser.photoURL || '',
        };

        dispatch(
          setUser({
            isLogin: true,
            current: user,
          })
        );
      } else {
        dispatch(setUserLogOut());
      }
    });
    return () => unsubscribed();
  }, []);

  // get DATA from Firestore
  useEffect(() => {
    if (user.isLogin) {
      const getFavoriteList = async () => {
        let moviesList: FavoriteMovie[] = [];
        const query = await getDocs(collection(db, 'FavoriteMovies'));
        query.forEach((doc) => {
          const { slug, name, origin_name, uid } = doc.data();
          uid === user.current.id && moviesList.push({ slug, name, origin_name });
        });

        dispatch(initList(moviesList));
      };
      getFavoriteList();
    } else {
      dispatch(removeList());
    }
  }, [user]);

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
            <Route
              path="/dang-nhap"
              element={
                <ProtecedLayoutWhenLogin>
                  <SignIn />
                </ProtecedLayoutWhenLogin>
              }
            />
            <Route
              path="/tai-khoan"
              element={
                <ProtectedLayout>
                  <AccountPage />
                </ProtectedLayout>
              }
            />
            {/* Route Not Found */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />

          {/* Button scroll top */}
          <ScrollButton />
          <ToastContainer autoClose={2000} />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
