import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {MessageSquare, LogOut} from 'lucide-react';
import {asyncLogoutUser} from '../features/auth/userSlice';

const Navbar = () => {
  const {authUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(asyncLogoutUser());
    navigate('/login');
  };

  return (
    <header className="glass-card" style={{padding: '1rem', position: 'sticky', top: 0, zIndex: 50, borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none'}}>
      <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Link to="/" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold'}}>
          <MessageSquare color="var(--color-primary)" />
          Diskus
        </Link>
        <nav style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
          <Link to="/leaderboard">Leaderboard</Link>
          {authUser ? (
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <Link to="/profile" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)'}}>
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  style={{width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--color-primary)'}}
                />
                <span style={{fontWeight: '500'}}>{authUser.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                style={{background: 'none', border: 'none', color: 'var(--text-error)', display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary" style={{padding: '0.4rem 1rem'}}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
