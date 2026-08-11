import {useState} from 'react';
import PropTypes from 'prop-types';

const RegisterInput = ({register}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register({name, email, password});
  };

  return (
    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <div>
        <label htmlFor="name" style={{display: 'block', marginBottom: '0.5rem'}}>Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Nama lengkap"
        />
      </div>
      <div>
        <label htmlFor="email" style={{display: 'block', marginBottom: '0.5rem'}}>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Alamat email"
        />
      </div>
      <div>
        <label htmlFor="password" style={{display: 'block', marginBottom: '0.5rem'}}>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password (min 6 karakter)"
        />
      </div>
      <button type="submit" className="btn-primary" style={{marginTop: '1rem', backgroundColor: 'var(--color-secondary)'}}>Daftar</button>
    </form>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
