/**
 * Tests for Input component
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/shared/components/ui/input';

describe('Input Component', () => {
  it('should render with default props', () => {
    render(<Input placeholder='Enter text' />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    // Default type is undefined, so we check it doesn't have a type attribute
    expect(input).not.toHaveAttribute('type');
  });

  it('should render with label', () => {
    render(<Input label='Team Name' />);
    expect(screen.getByText('Team Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Team Name')).toBeInTheDocument();
  });

  it('should render with required indicator', () => {
    render(<Input label='Team Name' required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('should render with error message', () => {
    render(<Input error='This field is required' />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should render with helper text', () => {
    render(<Input helperText='Enter a valid email address' />);
    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
  });

  it('should not show helper text when error is present', () => {
    render(<Input error='This field is required' helperText='This should not show' />);
    expect(screen.queryByText('This should not show')).not.toBeInTheDocument();
  });

  it('should have proper ARIA attributes', () => {
    render(<Input label='Email' error='Invalid email' helperText='Enter your email' />);

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('should handle different input types', () => {
    const { rerender } = render(<Input type='email' />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input type='password' />);
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password');
  });

  it('should handle value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('test value');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
