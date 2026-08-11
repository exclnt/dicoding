import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, Navigate} from 'react-router-dom';
import {asyncCreateThread} from '../features/threads/threadSlice';
import ThreadInput from '../components/ThreadInput';

const CreateThread = () => {
  const [errorMsg, setErrorMsg] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {authUser} = useSelector((state) => state.user);

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  const handleAddThread = async ({title, body, category}) => {
    setErrorMsg(null);
    try {
      await dispatch(asyncCreateThread({title, body, category})).unwrap();
      navigate('/');
    } catch (err) {
      setErrorMsg(err);
    }
  };

  return (
    <div className="container" style={{marginTop: '2rem', display: 'flex', justifyContent: 'center'}}>
      <div className="glass-card" style={{padding: '2rem', width: '100%', maxWidth: '600px'}}>
        <h1 style={{marginBottom: '1.5rem', color: 'var(--color-primary)'}}>Buat Diskusi Baru</h1>
        {errorMsg && <p style={{color: 'var(--text-error)', marginBottom: '1rem'}}>{errorMsg}</p>}
        <ThreadInput addThread={handleAddThread} />
      </div>
    </div>
  );
};

export default CreateThread;
