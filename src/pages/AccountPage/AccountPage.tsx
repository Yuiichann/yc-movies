import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserLogOut } from '../../app/userSlice';
import Loading from '../../components/Loading/Loading';
import { RootState } from '../../config/store';
import { auth } from '../../firebase/config';
import './AccountPage.scss';

const AccountPage = () => {
  const user = useSelector((state: RootState) => state.user); // get Current user
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fakeApi, setFakeApi] = useState<boolean>(true);

  useEffect(() => {
    if (!user.isLogin) {
      navigate('/dang-nhap');
    } else {
      setTimeout(() => setFakeApi(false), 800);
    }
  }, [user]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign Out Successfully!');
        dispatch(setUserLogOut());
        navigate('/dang-nhap', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main section">
      {fakeApi ? (
        <Loading />
      ) : (
        <div className="account">
          <div className="account-content">
            <img src={user.current.photoUrl} alt={user.current.name} className="avatar" />

            <div className="info">
              <h2>{user.current.name}</h2>
              <h5>{user.current.email}</h5>
            </div>
          </div>
          <button className="btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
