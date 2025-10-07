import { teamFormSchema } from '@/lib/validations';
import { ETeamStatus, ETeamEntity } from '@/types/global';

describe('Team Form Validation', () => {
  const validTeamData = {
    name: 'Test Team',
    description: 'This is a test team description',
    code: 'TEST',
    email: 'test@example.com',
    entity: ETeamEntity.ACCESS_BANK_NIGERIA,
    managerId: '1',
    status: ETeamStatus.ACTIVE,
  };

  it('should validate correct team data', () => {
    const result = teamFormSchema.safeParse(validTeamData);
    expect(result.success).toBe(true);
  });

  it('should reject empty name', () => {
    const invalidData = { ...validTeamData, name: '' };
    const result = teamFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Team name is required');
    }
  });

  it('should reject short name', () => {
    const invalidData = { ...validTeamData, name: 'AB' };
    const result = teamFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Team name must be at least 3 characters');
    }
  });

  it('should reject long name', () => {
    const invalidData = { ...validTeamData, name: 'A'.repeat(101) };
    const result = teamFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Team name must be less than 100 characters');
    }
  });

  it('should reject invalid email', () => {
    const invalidData = { ...validTeamData, email: 'invalid-email' };
    const result = teamFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Please enter a valid email address');
    }
  });

  it('should reject short code', () => {
    const invalidData = { ...validTeamData, code: 'AB' };
    const result = teamFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Code must be at least 3 characters');
    }
  });

  it('should reject long code', () => {
    const invalidData = { ...validTeamData, code: 'ABCDEF' };
    const result = teamFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Code must be at most 5 characters');
    }
  });

  it('should reject code with lowercase letters', () => {
    const invalidData = { ...validTeamData, code: 'test' };
    const result = teamFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Code must contain only uppercase letters and numbers');
    }
  });

  it('should reject empty description', () => {
    const invalidData = { ...validTeamData, description: '' };
    const result = teamFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Description is required');
    }
  });

  it('should reject short description', () => {
    const invalidData = { ...validTeamData, description: 'Short' };
    const result = teamFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Description must be at least 10 characters');
    }
  });

  it('should reject empty manager', () => {
    const invalidData = { ...validTeamData, managerId: '' };
    const result = teamFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Manager is required');
    }
  });
});
