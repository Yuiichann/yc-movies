import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../config/store';

const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.user);

  if (!user.isLogin) {
    return <Navigate to="/dang-nhap" />;
  } else {
    return children;
  }
};

export default ProtectedLayout;

export const ProtecedLayoutWhenLogin = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.user);

  if (user.isLogin) {
    return <Navigate to="/tai-khoan" />;
  } else {
    return children;
  }
};
