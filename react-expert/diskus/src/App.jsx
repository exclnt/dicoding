import {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {LoadingBar as RawLoadingBar} from 'react-redux-loading-bar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateThread from './pages/CreateThread';
import ThreadDetail from './pages/ThreadDetail';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import {asyncGetOwnProfile} from './features/auth/userSlice';

function App() {
  const dispatch = useDispatch();
  const {isPreload} = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loadingBar.default || 0);

  useEffect(() => {
    dispatch(asyncGetOwnProfile());
  }, [dispatch]);

  return (
    <>
      <RawLoadingBar
        loading={loading}
        showFastActions
        updateTime={50}
        style={{
          backgroundColor: 'var(--color-secondary)',
          height: '3px',
          position: 'fixed',
          top: 0,
          zIndex: 9999,
        }}
      />
      {!isPreload && (
        <>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/new" element={<CreateThread />} />
              <Route path="/thread/:id" element={<ThreadDetail />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </>
      )}
    </>
  );
}

export default App;
