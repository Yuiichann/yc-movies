import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStatus } from '../../app/userSlice';
import Loading from '../../components/Loading/Loading';
import { AppDispatch, RootState } from '../../config/store';
import { auth } from '../../firebase/config';

const SignIn = () => {
  const provider = new GoogleAuthProvider();
  const navigtate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user.isLogin) {
      navigtate('/tai-khoan');
    }
  }, [user]);

  // handleClick button
  const handleClickGoogleButton = () => {
    signInWithPopup(auth, provider)
      .then((user) => {
        dispatch(setStatus(true));
        navigtate('/tai-khoan');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main section">
      {user.loading ? (
        <Loading />
      ) : (
        <div className="d-flex">
          <GoogleButton onClick={handleClickGoogleButton}></GoogleButton>
        </div>
      )}
    </div>
  );
};

export default SignIn;
