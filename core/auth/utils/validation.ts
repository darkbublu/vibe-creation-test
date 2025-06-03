// Authentication validation utilities

// #region Constants
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// #endregion

// #region Password Validation
export function validatePassword(password: string): string[] {
  const errors: string[] = [];

  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long`);
  }

  if (!PASSWORD_REGEX.test(password)) {
    errors.push(
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    );
  }

  return errors;
}
// #endregion

// #region Email Validation
export function validateEmail(email: string): string[] {
  const errors: string[] = [];

  if (!email) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Invalid email format');
  }

  return errors;
}
// #endregion

// #region Form Validation
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

export function validateAuthForm(values: {
  email: string;
  password: string;
  confirmPassword?: string;
}): ValidationResult {
  const errors: Record<string, string[]> = {};

  // Email validation
  const emailErrors = validateEmail(values.email);
  if (emailErrors.length > 0) {
    errors.email = emailErrors;
  }

  // Password validation
  const passwordErrors = validatePassword(values.password);
  if (passwordErrors.length > 0) {
    errors.password = passwordErrors;
  }

  // Confirm password validation
  if (values.confirmPassword !== undefined) {
    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = ['Passwords do not match'];
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
// #endregion 