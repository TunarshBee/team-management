import { cn } from '@/lib/utils';

describe('Utils - cn function', () => {
  it('should merge class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500');
    expect(result).toContain('text-red-500');
    expect(result).toContain('bg-blue-500');
  });

  it('should handle conditional class names', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toContain('base-class');
    expect(result).toContain('active-class');
  });

  it('should handle falsy values', () => {
    const result = cn('class1', false, null, undefined, 'class2');
    expect(result).toContain('class1');
    expect(result).toContain('class2');
  });
});
