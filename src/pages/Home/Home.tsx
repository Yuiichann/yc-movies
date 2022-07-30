import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStatus, setUserLogOut } from '../../app/userSlice';
import Loading from '../../components/Loading/Loading';
import { RootState } from '../../config/store';
import { auth } from '../../firebase/config';

const Home = () => {
  const user = useSelector((state: RootState) => state.user); // get Current user
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.isLogin) {
      navigate('/dang-nhap');
    }
    dispatch(setStatus(false));
  }, [user]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // dispatch(setUserLogOut());
        console.log('Sign Out Successfully!');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main section">
      {user.loading ? (
        <Loading />
      ) : (
        <div className="home">
          <h1>Xin chào {user.current.name}</h1>
          <img src={user.current.photoUrl} alt="" />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default Home;
