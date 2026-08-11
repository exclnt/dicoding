import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {MessageCircle, ArrowUpCircle, ArrowDownCircle} from 'lucide-react';
import {asyncToggleVoteThread} from '../features/threads/threadSlice';

const ThreadCard = ({id, title, body, category, createdAt, upVotesBy, downVotesBy, totalComments, creator}) => {
  const dispatch = useDispatch();
  const {authUser} = useSelector((state) => state.user);

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const bodySnippet = stripHtml(body).substring(0, 150) + '...';
  const timeAgo = new Date(createdAt).toLocaleDateString();

  const handleUpvote = () => {
    if (!authUser) return alert('Silakan login untuk memberikan upvote');
    const voteType = upVotesBy.includes(authUser.id) ? 0 : 1;
    dispatch(asyncToggleVoteThread({threadId: id, voteType, userId: authUser.id}));
  };

  const handleDownvote = () => {
    if (!authUser) return alert('Silakan login untuk memberikan downvote');
    const voteType = downVotesBy.includes(authUser.id) ? 0 : -1;
    dispatch(asyncToggleVoteThread({threadId: id, voteType, userId: authUser.id}));
  };

  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  return (
    <div className="glass-card" style={{padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <div>
          <span style={{fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '12px', border: '1px solid var(--color-secondary)', color: 'var(--color-secondary)', display: 'inline-block', marginBottom: '0.5rem'}}>
            #{category}
          </span>
          <Link to={`/thread/${id}`}>
            <h2 style={{fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)'}}>{title}</h2>
          </Link>
        </div>
      </div>

      <p style={{color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5'}}>{bodySnippet}</p>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', flexWrap: 'wrap', gap: '1rem'}}>
        <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <button
            onClick={handleUpvote}
            style={{background: 'none', color: isUpVoted ? 'var(--color-secondary)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'color var(--transition-fast)'}}
          >
            <ArrowUpCircle size={20} fill={isUpVoted ? 'var(--color-secondary)' : 'none'} color={isUpVoted ? '#fff' : 'currentColor'} /> {upVotesBy.length}
          </button>
          <button
            onClick={handleDownvote}
            style={{background: 'none', color: isDownVoted ? 'var(--text-error)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'color var(--transition-fast)'}}
          >
            <ArrowDownCircle size={20} fill={isDownVoted ? 'var(--text-error)' : 'none'} color={isDownVoted ? '#fff' : 'currentColor'} /> {downVotesBy.length}
          </button>
          <Link to={`/thread/${id}`} style={{color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
            <MessageCircle size={20} /> {totalComments}
          </Link>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)'}}>
          <span>{timeAgo}</span>
          <span>•</span>
          <span>Dibuat oleh</span>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontWeight: '500'}}>
            {creator && <img src={creator.avatar} alt={creator.name} style={{width: '20px', height: '20px', borderRadius: '50%'}} />}
            {creator ? creator.name : 'Unknown'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
