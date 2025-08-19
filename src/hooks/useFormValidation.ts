import { useState, useCallback } from "react";

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormData {
  [key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = useCallback(
    (name: string, value: string): string => {
      const rule = rules[name];
      if (!rule) return "";

      // Required validation
      if (rule.required && (!value || value.trim() === "")) {
        return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      }

      // Skip other validations if field is empty and not required
      if (!value.trim() && !rule.required) return "";

      // Min length validation
      if (rule.minLength && value.length < rule.minLength) {
        return `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } must be at least ${rule.minLength} characters`;
      }

      // Max length validation
      if (rule.maxLength && value.length > rule.maxLength) {
        return `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } must be no more than ${rule.maxLength} characters`;
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(value)) {
        if (name === "email") {
          return "Please enter a valid email address";
        }
        return `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } format is invalid`;
      }

      // Custom validation
      if (rule.custom) {
        const customError = rule.custom(value);
        if (customError) return customError;
      }

      return "";
    },
    [rules]
  );

  const validateForm = useCallback(
    (formData: FormData): boolean => {
      const newErrors: FormErrors = {};
      let isValid = true;

      Object.keys(rules).forEach((fieldName) => {
        const error = validateField(fieldName, formData[fieldName] || "");
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      });

      setErrors(newErrors);
      return isValid;
    },
    [rules, validateField]
  );

  const validateSingleField = useCallback(
    (name: string, value: string) => {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
      return error === "";
    },
    [validateField]
  );

  const setFieldTouched = useCallback((name: string) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  const hasError = useCallback(
    (name: string): boolean => {
      return touched[name] && !!errors[name];
    },
    [errors, touched]
  );

  return {
    errors,
    touched,
    validateForm,
    validateSingleField,
    setFieldTouched,
    clearErrors,
    hasError,
    isFieldValid: (name: string) => touched[name] && !errors[name],
  };
};

// Common validation rules
export const emailValidation: ValidationRule = {
  required: true,
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  maxLength: 254,
};

export const nameValidation: ValidationRule = {
  required: true,
  minLength: 2,
  maxLength: 50,
  pattern: /^[a-zA-Z\s'-]+$/,
  custom: (value: string) => {
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s'-]+$/.test(value))
      return "Name can only contain letters, spaces, hyphens, and apostrophes";
    return null;
  },
};

export const subjectValidation: ValidationRule = {
  required: true,
  minLength: 5,
  maxLength: 100,
};

export const messageValidation: ValidationRule = {
  required: true,
  minLength: 10,
  maxLength: 1000,
};
