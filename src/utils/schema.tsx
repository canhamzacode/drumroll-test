import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
  fullname: Yup.string().required('Required'),
});

export const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
});