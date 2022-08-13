import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../config/store';
import Loading from './Loading/Loading';

const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.user);

  if (user.isLoading) {
    return <Loading />;
  }

  if (!user.isLogin) {
    return <Navigate to="/dang-nhap" />;
  } else {
    return children;
  }
};

export default ProtectedLayout;

export const ProtecedLayoutWhenLogin = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.user);

  if (user.isLoading) {
    return <Loading />;
  }

  if (user.isLogin) {
    return <Navigate to="/tai-khoan" />;
  } else {
    return children;
  }
};
