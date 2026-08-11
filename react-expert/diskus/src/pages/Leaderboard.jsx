import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Trophy} from 'lucide-react';
import {asyncFetchLeaderboards} from '../features/leaderboards/leaderboardSlice';

const Leaderboard = () => {
  const dispatch = useDispatch();
  const {leaderboards, error} = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(asyncFetchLeaderboards());
  }, [dispatch]);

  if (error) return <div className="container" style={{marginTop: '2rem'}}><p style={{color: 'var(--text-error)'}}>{error}</p></div>;

  return (
    <div className="container" style={{marginTop: '2rem', paddingBottom: '5rem', maxWidth: '800px'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem'}}>
        <Trophy size={36} color="var(--accent-gold)" />
        <h1 style={{color: 'var(--color-primary)'}}>Klasemen Keaktifan User</h1>
      </div>

      <div className="glass-card" style={{overflow: 'hidden'}}>
        <div style={{display: 'flex', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.05)', fontWeight: 'bold', borderBottom: '1px solid var(--border-color)'}}>
          <div style={{flex: '1'}}>Pengguna</div>
          <div style={{width: '100px', textAlign: 'right'}}>Skor</div>
        </div>

        {leaderboards.map((entry, index) => {
          let rankStyle = {};
          if (index === 0) rankStyle = {borderLeft: '4px solid var(--accent-gold)'};
          if (index === 1) rankStyle = {borderLeft: '4px solid var(--accent-silver)'};
          if (index === 2) rankStyle = {borderLeft: '4px solid var(--accent-bronze)'};

          return (
            <div key={entry.user.id} style={{display: 'flex', padding: '1rem 1.5rem', alignItems: 'center', borderBottom: '1px solid var(--border-color)', ...rankStyle}}>
              <div style={{flex: '1', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <span style={{fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-muted)', width: '24px'}}>{index + 1}</span>
                <img src={entry.user.avatar} alt={entry.user.name} style={{width: '40px', height: '40px', borderRadius: '50%'}} />
                <span style={{fontWeight: '500', fontSize: '1.1rem'}}>{entry.user.name}</span>
              </div>
              <div style={{width: '100px', textAlign: 'right', fontWeight: 'bold', color: 'var(--color-secondary)', fontSize: '1.2rem'}}>
                {entry.score}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
