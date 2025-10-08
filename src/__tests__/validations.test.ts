import {
  createTeamSchema,
  updateTeamSchema,
  validateTeamName,
  validateTeamCode,
  validateTeamEmail,
} from '@/lib/validations';
import { ETeamStatus } from '@/types/global';

describe('Team Form Validation', () => {
  const validTeamData = {
    name: 'Test Team',
    description: 'This is a test team description',
    code: 'TEST',
    email: 'test@example.com',
    entity: 'Access Bank Nigeria',
    manager: 'Test Manager',
    status: ETeamStatus.ACTIVE,
  };

  describe('createTeamSchema', () => {
    it('should validate correct team data', () => {
      const result = createTeamSchema.safeParse(validTeamData);
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const invalidData = { ...validTeamData, name: '' };
      const result = createTeamSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Team name is required');
      }
    });

    it('should reject short name', () => {
      const invalidData = { ...validTeamData, name: 'A' };
      const result = createTeamSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Team name must be at least 2 characters');
      }
    });

    it('should reject long name', () => {
      const invalidData = { ...validTeamData, name: 'A'.repeat(101) };
      const result = createTeamSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Team name must be less than 100 characters');
      }
    });

    it('should reject invalid email', () => {
      const invalidData = { ...validTeamData, email: 'invalid-email' };
      const result = createTeamSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Please enter a valid email address');
      }
    });

    it('should reject short code', () => {
      const invalidData = { ...validTeamData, code: 'AB' };
      const result = createTeamSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Code must be at least 3 characters');
      }
    });

    it('should reject long code', () => {
      const invalidData = { ...validTeamData, code: 'ABCDEF' };
      const result = createTeamSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Code must be at most 5 characters');
      }
    });

    it('should reject code with lowercase letters', () => {
      const invalidData = { ...validTeamData, code: 'test' };
      const result = createTeamSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe(
          'Code must contain only uppercase letters and numbers'
        );
      }
    });

    it('should reject empty description', () => {
      const invalidData = { ...validTeamData, description: '' };
      const result = createTeamSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Description is required');
      }
    });

    it('should reject short description', () => {
      const invalidData = { ...validTeamData, description: 'Short' };
      const result = createTeamSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Description must be at least 10 characters');
      }
    });

    it('should reject empty manager', () => {
      const invalidData = { ...validTeamData, manager: '' };
      const result = createTeamSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Manager is required');
      }
    });

    it('should reject empty entity', () => {
      const invalidData = { ...validTeamData, entity: '' };
      const result = createTeamSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Entity is required');
      }
    });

    it('should reject invalid status', () => {
      const invalidData = { ...validTeamData, status: 'INVALID' as any };
      const result = createTeamSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0]?.message).toBe('Please select a valid status');
      }
    });
  });

  describe('updateTeamSchema', () => {
    it('should validate correct team data', () => {
      const result = updateTeamSchema.safeParse(validTeamData);
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const invalidData = { ...validTeamData, name: '' };
      const result = updateTeamSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Individual field validators', () => {
    it('should validate team name correctly', () => {
      expect(validateTeamName('Valid Team Name')).toBeNull();
      expect(validateTeamName('')).toBe('Team name is required');
      expect(validateTeamName('A')).toBe('Team name must be at least 2 characters');
    });

    it('should validate team code correctly', () => {
      expect(validateTeamCode('ABC')).toBeNull();
      expect(validateTeamCode('AB')).toBe('Code must be at least 3 characters');
      expect(validateTeamCode('ABCDEF')).toBe('Code must be at most 5 characters');
      expect(validateTeamCode('abc')).toBe('Code must contain only uppercase letters and numbers');
    });

    it('should validate email correctly', () => {
      expect(validateTeamEmail('test@example.com')).toBeNull();
      expect(validateTeamEmail('invalid-email')).toBe('Please enter a valid email address');
      expect(validateTeamEmail('')).toBe('Email is required');
    });
  });
});
