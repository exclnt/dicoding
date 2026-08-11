import {useState} from 'react';
import PropTypes from 'prop-types';

const ThreadInput = ({addThread}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addThread({title, body, category: category || 'general'});
  };

  return (
    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <div>
        <label htmlFor="title" style={{display: 'block', marginBottom: '0.5rem'}}>Judul</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Apa yang ingin Anda diskusikan?"
        />
      </div>
      <div>
        <label htmlFor="category" style={{display: 'block', marginBottom: '0.5rem'}}>Kategori</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Contoh: react, ui, frontend (Opsional)"
        />
      </div>
      <div>
        <label htmlFor="body" style={{display: 'block', marginBottom: '0.5rem'}}>Isi Diskusi</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows="6"
          placeholder="Tuliskan detail diskusi Anda di sini..."
          style={{resize: 'vertical'}}
        />
      </div>
      <button type="submit" className="btn-primary" style={{marginTop: '1rem'}}>Kirim Diskusi</button>
    </form>
  );
};

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
