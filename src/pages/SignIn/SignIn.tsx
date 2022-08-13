import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/config';

const SignIn = () => {
  // handle Sign In with google
  const handleClickGoogleButton = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => console.log('Login Successfully!'))
      .catch((err) => {
        toast.error('Có lỗi gì đó xảy ra ấy!');
        console.log(err.message);
      });
  };
  return (
    <div className="main section">
      <div className="d-flex" style={{ gap: '2rem', fontWeight: '600', flexWrap: 'wrap' }}>
        <h4 style={{ fontSize: '16px' }}>Đăng nhập bằng Google</h4>
        <GoogleLoginButton onClick={handleClickGoogleButton} style={{ width: '250px' }} />
      </div>

      <div
        className="d-flex"
        style={{ gap: '2rem', fontWeight: '600', flexWrap: 'wrap', marginTop: '2rem' }}
      >
        <h4 style={{ fontSize: '16px' }}>Đăng nhập bằng Facebook</h4>
        <FacebookLoginButton
          style={{ width: '250px' }}
          onClick={() => toast.info('Chức năng còn phát triển!!!')}
        />
      </div>
    </div>
  );
};

export default SignIn;
