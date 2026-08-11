import {useState} from 'react';
import PropTypes from 'prop-types';

const CommentInput = ({addComment}) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis balasan Anda..."
        rows="4"
        required
      />
      <button type="submit" className="btn-primary" style={{alignSelf: 'flex-start'}}>Kirim Komentar</button>
    </form>
  );
};

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
