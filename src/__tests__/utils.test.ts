/**
 * Tests for utility functions
 */

import {
  cn,
  formatDate,
  formatRelativeTime,
  capitalize,
  truncateText,
  getInitials,
  debounce,
  throttle,
  generateAvatarColor,
  isEmpty,
  safeJsonParse,
  generateId,
} from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn', () => {
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

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/Jan 15, 2024/);
    });
  });

  describe('formatRelativeTime', () => {
    it('should format recent times correctly', () => {
      const now = new Date();
      const recent = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
      const formatted = formatRelativeTime(recent);
      expect(formatted).toBe('5 minutes ago');
    });

    it('should format just now correctly', () => {
      const now = new Date();
      const formatted = formatRelativeTime(now);
      expect(formatted).toBe('Just now');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('test')).toBe('Test');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that should be truncated';
      const truncated = truncateText(longText, 20);
      expect(truncated).toBe('This is a very long ...');
    });

    it('should not truncate short text', () => {
      const shortText = 'Short text';
      const result = truncateText(shortText, 20);
      expect(result).toBe('Short text');
    });
  });

  describe('getInitials', () => {
    it('should generate initials correctly', () => {
      expect(getInitials('John Doe')).toBe('JD');
      expect(getInitials('Alice')).toBe('A');
      expect(getInitials('Mary Jane Smith')).toBe('MJ');
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', (done) => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 150);
    });
  });

  describe('throttle', () => {
    it('should throttle function calls', (done) => {
      let callCount = 0;
      const throttledFn = throttle(() => {
        callCount++;
      }, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 50);
    });
  });

  describe('generateAvatarColor', () => {
    it('should generate consistent colors for same input', () => {
      const color1 = generateAvatarColor('test');
      const color2 = generateAvatarColor('test');
      expect(color1).toBe(color2);
    });

    it('should generate different colors for different inputs', () => {
      const color1 = generateAvatarColor('test1');
      const color2 = generateAvatarColor('test2');
      expect(color1).not.toBe(color2);
    });
  });

  describe('isEmpty', () => {
    it('should detect empty values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    it('should detect non-empty values', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(false)).toBe(false);
    });
  });

  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      const result = safeJsonParse('{"key": "value"}', {});
      expect(result).toEqual({ key: 'value' });
    });

    it('should return fallback for invalid JSON', () => {
      const fallback = { default: true };
      const result = safeJsonParse('invalid json', fallback);
      expect(result).toBe(fallback);
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('should include prefix when provided', () => {
      const id = generateId('test');
      expect(id).toMatch(/^test-/);
    });
  });
});
