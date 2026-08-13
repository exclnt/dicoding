import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Nama lengkap');
    
    await userEvent.type(nameInput, 'John Doe');
    expect(nameInput).toHaveValue('John Doe');
  });

  it('should handle email typing correctly', async () => {
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Alamat email');
    
    await userEvent.type(emailInput, 'john@example.com');
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('should handle password typing correctly', async () => {
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password (min 6 karakter)');
    
    await userEvent.type(passwordInput, 'secretpassword');
    expect(passwordInput).toHaveValue('secretpassword');
  });

  it('should call register function when register button is clicked', async () => {
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('Nama lengkap');
    await userEvent.type(nameInput, 'John Doe');
    
    const emailInput = await screen.getByPlaceholderText('Alamat email');
    await userEvent.type(emailInput, 'john@example.com');
    
    const passwordInput = await screen.getByPlaceholderText('Password (min 6 karakter)');
    await userEvent.type(passwordInput, 'secretpassword');
    
    const registerButton = await screen.getByRole('button', { name: 'Daftar' });
    await userEvent.click(registerButton);
    
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secretpassword',
    });
  });
});
