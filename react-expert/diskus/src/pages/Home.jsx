import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Plus} from 'lucide-react';
import {asyncFetchThreads} from '../features/threads/threadSlice';
import ThreadCard from '../components/ThreadCard';

const Home = () => {
  const dispatch = useDispatch();
  const {threads, error} = useSelector((state) => state.thread);
  const {authUser} = useSelector((state) => state.user);

  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    dispatch(asyncFetchThreads());
  }, [dispatch]);

  // Extract unique categories
  const categories = [...new Set(threads.map((t) => t.category))];

  const filteredThreads = filterCategory ?
    threads.filter((t) => t.category === filterCategory) :
    threads;

  return (
    <div className="container" style={{marginTop: '2rem', paddingBottom: '5rem'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1 style={{color: 'var(--color-primary)'}}>Diskusi Terkini</h1>
        {authUser && (
          <Link to="/new" className="btn-primary" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <Plus size={20} /> Buat Thread
          </Link>
        )}
      </div>

      {categories.length > 0 && (
        <div style={{display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem'}}>
          <button
            onClick={() => setFilterCategory('')}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              border: '1px solid var(--color-primary)',
              background: filterCategory === '' ? 'var(--color-primary)' : 'transparent',
              color: filterCategory === '' ? '#fff' : 'var(--color-primary)',
            }}
          >
            Semua
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                border: '1px solid var(--color-secondary)',
                background: filterCategory === category ? 'var(--color-secondary)' : 'transparent',
                color: filterCategory === category ? '#fff' : 'var(--color-secondary)',
              }}
            >
              #{category}
            </button>
          ))}
        </div>
      )}

      {error && <p style={{color: 'var(--text-error)'}}>{error}</p>}

      <div>
        {filteredThreads.map((thread) => (
          <ThreadCard key={thread.id} {...thread} />
        ))}
        {filteredThreads.length === 0 && !error && (
          <p style={{textAlign: 'center', color: 'var(--text-muted)'}}>Belum ada thread diskusi.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
