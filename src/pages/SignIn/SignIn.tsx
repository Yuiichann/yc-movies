import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button';
import { toast, ToastContainer } from 'react-toastify';
import { auth } from '../../firebase/config';

const SignIn = () => {
  // handle Sign In with google
  const handleClickGoogleButton = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => console.log('Login Successfully!'))
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="main section">
      <div className="d-flex">
        <GoogleButton onClick={handleClickGoogleButton}></GoogleButton>
      </div>
    </div>
  );
};

export default SignIn;
