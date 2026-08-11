import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {asyncRegisterUser} from '../features/auth/userSlice';
import RegisterInput from '../components/RegisterInput';

const Register = () => {
  const [errorMsg, setErrorMsg] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async ({name, email, password}) => {
    setErrorMsg(null);
    try {
      await dispatch(asyncRegisterUser({name, email, password})).unwrap();
      navigate('/login');
    } catch (err) {
      setErrorMsg(err);
    }
  };

  return (
    <div className="container" style={{marginTop: '4rem', display: 'flex', justifyContent: 'center'}}>
      <div className="glass-card" style={{padding: '2rem', width: '100%', maxWidth: '400px'}}>
        <h1 style={{marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-secondary)'}}>Register</h1>
        {errorMsg && <p style={{color: 'var(--text-error)', marginBottom: '1rem', textAlign: 'center'}}>{errorMsg}</p>}
        <RegisterInput register={handleRegister} />
        <p style={{marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem'}}>
          Sudah punya akun? <Link to="/login" style={{color: 'var(--color-primary)'}}>Login di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
