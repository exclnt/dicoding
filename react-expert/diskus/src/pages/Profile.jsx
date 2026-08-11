import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {asyncFetchThreads} from '../features/threads/threadSlice';
import {asyncFetchLeaderboards} from '../features/leaderboards/leaderboardSlice';
import ThreadCard from '../components/ThreadCard';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {authUser} = useSelector((state) => state.user);
  const {threads} = useSelector((state) => state.thread);
  const {leaderboards} = useSelector((state) => state.leaderboard);

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  useEffect(() => {
    dispatch(asyncFetchThreads());
    dispatch(asyncFetchLeaderboards());
  }, [dispatch]);

  if (!authUser) return null;

  // Temukan skor user di leaderboard
  const userLeaderboard = leaderboards.find(
      (lb) => lb.user.id === authUser.id,
  );
  const userScore = userLeaderboard ? userLeaderboard.score : 0;

  // Ambil thread milik user
  const userThreads = threads.filter((t) => t.ownerId === authUser.id);

  return (
    <div className="container" style={{marginTop: '3rem', paddingBottom: '5rem'}}>
      <div className="glass-card" style={{padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '3rem'}}>
        <img
          src={authUser.avatar}
          alt={authUser.name}
          style={{width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--border-color)'}}
        />
        <div>
          <h1 style={{fontSize: '2rem', marginBottom: '0.2rem'}}>{authUser.name}</h1>
          <p style={{color: 'var(--text-muted)', marginBottom: '1rem'}}>{authUser.email}</p>
          <div style={{display: 'flex', gap: '2rem'}}>
            <div>
              <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>Total Skor</p>
              <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-secondary)'}}>{userScore}</p>
            </div>
            <div>
              <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>Total Thread</p>
              <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)'}}>{userThreads.length}</p>
            </div>
          </div>
        </div>
      </div>

      <h2 style={{marginBottom: '1.5rem', color: 'var(--text-primary)'}}>Thread Buatanku</h2>
      {userThreads.length > 0 ? (
        <div>
          {userThreads.map((thread) => (
            <ThreadCard key={thread.id} {...thread} />
          ))}
        </div>
      ) : (
        <p style={{textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem'}}>Kamu belum pernah membuat thread.</p>
      )}
    </div>
  );
};

export default Profile;
