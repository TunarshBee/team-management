/**
 * Zod validation schemas for Team Management forms
 * Provides comprehensive validation with custom error messages
 */

import { ETeamStatus } from '@/types/global';
import { z } from 'zod';

export const teamSchema = z.object({
  name: z
    .string()
    .min(1, 'Team name is required')
    .min(2, 'Team name must be at least 2 characters')
    .max(100, 'Team name must be less than 100 characters')
    .trim(),

  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .trim(),

  code: z
    .string()
    .min(1, 'Team code is required')
    .min(3, 'Code must be at least 3 characters')
    .max(5, 'Code must be at most 5 characters')
    .regex(/^[A-Z0-9]+$/, 'Code must contain only uppercase letters and numbers')
    .trim(),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters')
    .trim(),

  entity: z
    .string()
    .min(1, 'Entity is required')
    .max(100, 'Entity name must be less than 100 characters')
    .trim(),

  manager: z
    .string()
    .min(1, 'Manager is required')
    .max(100, 'Manager name must be less than 100 characters')
    .trim(),

  status: z.nativeEnum(ETeamStatus),
});

export const createTeamSchema = teamSchema;

export const updateTeamSchema = teamSchema;

export const partialTeamSchema = teamSchema.partial();

export const searchSchema = z.object({
  query: z.string().max(100, 'Search query must be less than 100 characters').optional(),
});

export const filterSchema = z.object({
  status: z.string().optional(),
  entity: z.string().optional(),
});

export const paginationSchema = z.object({
  page: z.number().int().min(1, 'Page must be at least 1'),
  pageSize: z
    .number()
    .int()
    .min(1, 'Page size must be at least 1')
    .max(100, 'Page size must be at most 100'),
});

export const sortSchema = z.object({
  field: z.string().min(1, 'Sort field is required'),
  direction: z.enum(['asc', 'desc']),
});

export const nameFieldSchema = teamSchema.shape.name;
export const descriptionFieldSchema = teamSchema.shape.description;
export const codeFieldSchema = teamSchema.shape.code;
export const emailFieldSchema = teamSchema.shape.email;
export const entityFieldSchema = teamSchema.shape.entity;
export const managerFieldSchema = teamSchema.shape.manager;
export const statusFieldSchema = teamSchema.shape.status;

export const validateTeamName = (name: string): string | null => {
  try {
    nameFieldSchema.parse(name);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message || 'Invalid team name';
    }
    return 'Invalid team name';
  }
};

export const validateTeamCode = (code: string): string | null => {
  try {
    codeFieldSchema.parse(code);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message || 'Invalid team code';
    }
    return 'Invalid team code';
  }
};

export const validateTeamEmail = (email: string): string | null => {
  try {
    emailFieldSchema.parse(email);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message || 'Invalid email';
    }
    return 'Invalid email';
  }
};

export type TTeamFormData = z.infer<typeof teamSchema>;
export type TCreateTeamData = z.infer<typeof createTeamSchema>;
export type TUpdateTeamData = z.infer<typeof updateTeamSchema>;
export type TPartialTeamData = z.infer<typeof partialTeamSchema>;
export type TSearchData = z.infer<typeof searchSchema>;
export type TFilterData = z.infer<typeof filterSchema>;
export type TPaginationData = z.infer<typeof paginationSchema>;
export type TSortData = z.infer<typeof sortSchema>;

export interface IValidationResult {
  success: boolean;
  errors: Record<string, string>;
}

export const validateFormData = (data: unknown, schema: z.ZodSchema): IValidationResult => {
  try {
    schema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: 'Validation failed' } };
  }
};

export const validateUniqueTeamCode = async (
  code: string,
  _excludeId?: string
): Promise<string | null> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const existingCodes = ['ADM', 'CMG', 'IMG', 'SQM', 'PBM'];
  if (existingCodes.includes(code.toUpperCase())) {
    return 'Team code already exists';
  }

  return null;
};

export const createDebouncedValidator = <T>(
  validator: (value: T) => string | null,
  delay: number = 300
) => {
  let timeoutId: NodeJS.Timeout;

  return (value: T, callback: (error: string | null) => void) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const error = validator(value);
      callback(error);
    }, delay);
  };
};
