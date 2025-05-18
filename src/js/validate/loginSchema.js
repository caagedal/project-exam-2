import * as yup from 'yup';

/**
 * Validation schema for login form.
 * Ensures email is valid and ends with stud.noroff.no, and password is at least 8 characters.
 *
 * @type {yup.ObjectSchema<{ email: string; password: string }>} 
 */
export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email('Valid email address required')
      .matches(/@stud\.noroff\.no$/, 'Only emails ending with stud.noroff.no approved.')
      .required('Email required.'),
    password: yup
      .string()
      .min(8, 'Password needs to be at least 8 characters.')
      .required('Password required'),
  })
  .required();