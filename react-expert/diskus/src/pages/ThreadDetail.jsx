import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ArrowUpCircle, ArrowDownCircle, MessageSquare} from 'lucide-react';
import {asyncGetDetailThread, asyncAddComment, asyncToggleVoteThread, asyncToggleVoteComment} from '../features/threads/threadSlice';
import CommentInput from '../components/CommentInput';

const ThreadDetail = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {detailThread, error} = useSelector((state) => state.thread);
  const {authUser} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(asyncGetDetailThread(id));
  }, [dispatch, id]);

  const handleThreadVote = (voteType) => {
    if (!authUser) return alert('Silakan login untuk memberikan vote.');
    dispatch(asyncToggleVoteThread({threadId: id, voteType, userId: authUser.id}));
  };

  const handleCommentVote = (commentId, voteType) => {
    if (!authUser) return alert('Silakan login untuk memberikan vote.');
    dispatch(asyncToggleVoteComment({threadId: id, commentId, voteType, userId: authUser.id}));
  };

  const handleCommentSubmit = (content) => {
    if (!authUser) return alert('Silakan login untuk membalas.');
    dispatch(asyncAddComment({threadId: id, content}));
  };

  if (error) return <div className="container" style={{marginTop: '2rem'}}><p style={{color: 'var(--text-error)'}}>{error}</p></div>;
  if (!detailThread) return null;

  return (
    <div className="container" style={{marginTop: '2rem', paddingBottom: '5rem'}}>
      <div className="glass-card" style={{padding: '2rem', marginBottom: '2rem'}}>
        <span style={{fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '12px', border: '1px solid var(--color-secondary)', color: 'var(--color-secondary)', display: 'inline-block', marginBottom: '1rem'}}>
          #{detailThread.category}
        </span>
        <h1 style={{marginBottom: '1rem', color: 'var(--color-primary)'}}>{detailThread.title}</h1>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', color: 'var(--text-muted)'}}>
          <img src={detailThread.owner.avatar} alt={detailThread.owner.name} style={{width: '32px', height: '32px', borderRadius: '50%'}} />
          <span>{detailThread.owner.name}</span>
          <span>•</span>
          <span>{new Date(detailThread.createdAt).toLocaleDateString()}</span>
        </div>

        <div dangerouslySetInnerHTML={{__html: detailThread.body}} style={{lineHeight: '1.8', marginBottom: '2rem'}} />

        <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <button onClick={() => handleThreadVote(1)} style={{background: 'none', color: detailThread.upVotesBy.includes(authUser?.id) ? 'var(--color-primary)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '1.1rem'}}>
            <ArrowUpCircle /> {detailThread.upVotesBy.length}
          </button>
          <button onClick={() => handleThreadVote(-1)} style={{background: 'none', color: detailThread.downVotesBy.includes(authUser?.id) ? 'var(--text-error)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '1.1rem'}}>
            <ArrowDownCircle /> {detailThread.downVotesBy.length}
          </button>
        </div>
      </div>

      <div style={{marginBottom: '2rem'}}>
        <h2 style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}><MessageSquare /> Beri Komentar</h2>
        {authUser ? (
          <CommentInput addComment={handleCommentSubmit} />
        ) : (
          <p style={{color: 'var(--text-muted)'}}>Silakan login untuk memberikan komentar.</p>
        )}
      </div>

      <div>
        <h3 style={{marginBottom: '1.5rem'}}>Komentar ({detailThread.comments.length})</h3>
        {detailThread.comments.map((comment) => (
          <div key={comment.id} className="glass-card" style={{padding: '1.5rem', marginBottom: '1rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem'}}>
                <img src={comment.owner.avatar} alt={comment.owner.name} style={{width: '28px', height: '28px', borderRadius: '50%'}} />
                <span style={{fontWeight: '500'}}>{comment.owner.name}</span>
              </div>
              <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
            <div dangerouslySetInnerHTML={{__html: comment.content}} style={{marginBottom: '1rem', lineHeight: '1.6'}} />
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <button onClick={() => handleCommentVote(comment.id, 1)} style={{background: 'none', color: comment.upVotesBy.includes(authUser?.id) ? 'var(--color-primary)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
                <ArrowUpCircle size={18} /> {comment.upVotesBy.length}
              </button>
              <button onClick={() => handleCommentVote(comment.id, -1)} style={{background: 'none', color: comment.downVotesBy.includes(authUser?.id) ? 'var(--text-error)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
                <ArrowDownCircle size={18} /> {comment.downVotesBy.length}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreadDetail;
