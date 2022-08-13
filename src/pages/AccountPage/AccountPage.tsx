import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MoviesList from '../../components/MoviesList/MoviesList';
import { AppDispatch, RootState } from '../../config/store';
import { auth } from '../../firebase/config';
import './AccountPage.scss';

const AccountPage = () => {
  const { user, favoriteMovies } = useSelector((state: RootState) => state); //
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success('Đăng xuất thành công!');
        navigate('/dang-nhap');
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="main section">
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

      <div className="favorite-list">
        <h1 className="title-movie">Danh sách yêu thích</h1>
        {favoriteMovies.length > 0 ? (
          <MoviesList movieList={favoriteMovies} />
        ) : (
          <h3>Danh sách rỗng</h3>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
