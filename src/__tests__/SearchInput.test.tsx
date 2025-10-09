import { SearchInput } from '@/shared/components/ui/search-input';
import { fireEvent, render, screen } from '@testing-library/react';

describe('SearchInput Component', () => {
  it('should render with default props', () => {
    render(<SearchInput />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should render with custom placeholder', () => {
    render(<SearchInput placeholder='Search teams...' />);

    const input = screen.getByPlaceholderText('Search teams...');
    expect(input).toBeInTheDocument();
  });

  it('should handle value changes', () => {
    const handleChange = jest.fn();
    render(<SearchInput onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test search' } });

    expect(handleChange).toHaveBeenCalledWith('test search');
  });

  it('should display initial value', () => {
    render(<SearchInput value='initial value' />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('initial value');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<SearchInput disabled={true} />);

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeDisabled();
  });

  it('should have search icon', () => {
    render(<SearchInput />);

    const searchIcon = document.querySelector('.lucide-search');
    expect(searchIcon).toBeInTheDocument();
  });
});
