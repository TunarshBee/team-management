import { cn } from '@/lib/utils';
import { Input } from '@/shared/components/ui/input';
import { Search } from 'lucide-react';
import * as React from 'react';

export interface ISearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  maxWidth?: string;
  disabled?: boolean;
  label?: string;
  ariaLabel?: string;
  id?: string;
}

export const SearchInput: React.FC<ISearchInputProps> = ({
  placeholder = 'Search...',
  value = '',
  onChange,
  className,
  maxWidth = 'max-w-[350px]',
  disabled = false,
  label,
  ariaLabel,
  id,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className={cn('relative', maxWidth)}>
      <Search
        className='absolute left-3 top-1/2 transform -translate-y-1/2 text-bazara-gray w-4 h-4'
        aria-hidden='true'
      />
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={cn('pl-10 border border-[#EBEBEB] rounded-lg', className)}
        label={label}
        aria-label={ariaLabel || `Search ${placeholder.toLowerCase()}`}
        role='searchbox'
      />
    </div>
  );
};
