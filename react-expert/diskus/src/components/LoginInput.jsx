import {useState} from 'react';
import PropTypes from 'prop-types';

const LoginInput = ({login}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({email, password});
  };

  return (
    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <div>
        <label htmlFor="email" style={{display: 'block', marginBottom: '0.5rem'}}>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Masukkan email"
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
          placeholder="Masukkan password"
        />
      </div>
      <button type="submit" className="btn-primary" style={{marginTop: '1rem'}}>Masuk</button>
    </form>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
