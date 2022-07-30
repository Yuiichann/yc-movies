import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { AppDispatch, RootState } from '../../config/store';
import { auth } from '../../firebase/config';

const SignIn = () => {
  const user = useSelector((state: RootState) => state.user);
  const provider = new GoogleAuthProvider();
  const navigtate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [fakeApi, setFakeApi] = useState<boolean>(true);

  useEffect(() => {
    if (user.isLogin) {
      navigtate('/tai-khoan');
    } else {
      setTimeout(() => setFakeApi(false), 800);
    }
  }, [user]);

  // handleClick button
  const handleClickGoogleButton = () => {
    signInWithPopup(auth, provider)
      .then((user) => {
        navigtate('/tai-khoan');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main section">
      {fakeApi ? (
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
