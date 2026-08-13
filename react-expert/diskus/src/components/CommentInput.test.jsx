
import {describe, it, expect, vi, afterEach} from 'vitest';
import {render, screen, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentInput from './CommentInput';

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle comment typing correctly', async () => {
    render(<CommentInput addComment={() => {}} />);
    const textarea = await screen.getByPlaceholderText('Tulis balasan Anda...');

    await userEvent.type(textarea, 'Ini komentar tes');
    expect(textarea).toHaveValue('Ini komentar tes');
  });

  it('should call addComment function when form is submitted', async () => {
    const mockAddComment = vi.fn();
    render(<CommentInput addComment={mockAddComment} />);
    const textarea = await screen.getByPlaceholderText('Tulis balasan Anda...');

    await userEvent.type(textarea, 'Ini komentar tes');

    const submitButton = await screen.getByRole('button', {name: 'Kirim Komentar'});
    await userEvent.click(submitButton);

    expect(mockAddComment).toHaveBeenCalledWith('Ini komentar tes');
  });

  it('should clear textarea when form is submitted', async () => {
    const mockAddComment = vi.fn();
    render(<CommentInput addComment={mockAddComment} />);
    const textarea = await screen.getByPlaceholderText('Tulis balasan Anda...');

    await userEvent.type(textarea, 'Ini komentar tes');
    const submitButton = await screen.getByRole('button', {name: 'Kirim Komentar'});
    await userEvent.click(submitButton);

    expect(textarea).toHaveValue('');
  });
});
