import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
  fullname: Yup.string().required('Required'),
  policy: Yup.boolean().oneOf([true], 'You must accept the privacy policy')
});

export const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters')
});

export const createPropertySchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').positive(),
  location: Yup.string().required('Location is required'),
  images: Yup.array().of(Yup.mixed()).required('At least one image is required'),
  propertyType: Yup.string().required('Property type is required'),
  guestCapacity: Yup.number().required('Guest capacity is required').positive().integer(),
  bedrooms: Yup.number().required('Bedrooms is required').positive().integer(),
  privateBed: Yup.number().required('Private bed count is required').positive().integer(),
  minimumNights: Yup.number()
      .required('Minimum nights are required')
      .min(1, 'Minimum nights must be at least 1'),
  maximumNights: Yup.number()
      .required('Maximum nights are required')
      .min(1, 'Maximum nights must be at least 1'),
  amenities: Yup.string().required('Amenities are required'),
  checkin: Yup.date().required('Check-in date is required'),
  checkout: Yup.date().required('Check-out date is required').min(
      Yup.ref('checkin'),
      'Check-out date must be after check-in date'
  ),
});