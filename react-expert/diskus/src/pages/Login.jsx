import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {asyncLoginUser} from '../features/auth/userSlice';
import LoginInput from '../components/LoginInput';

const Login = () => {
  const [errorMsg, setErrorMsg] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async ({email, password}) => {
    setErrorMsg(null);
    try {
      await dispatch(asyncLoginUser({email, password})).unwrap();
      navigate('/');
    } catch (err) {
      setErrorMsg(err);
    }
  };

  return (
    <div className="container" style={{marginTop: '4rem', display: 'flex', justifyContent: 'center'}}>
      <div className="glass-card" style={{padding: '2rem', width: '100%', maxWidth: '400px'}}>
        <h1 style={{marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-primary)'}}>Login</h1>
        {errorMsg && <p style={{color: 'var(--text-error)', marginBottom: '1rem', textAlign: 'center'}}>{errorMsg}</p>}
        <LoginInput login={handleLogin} />
        <p style={{marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem'}}>
          Belum punya akun? <Link to="/register">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
