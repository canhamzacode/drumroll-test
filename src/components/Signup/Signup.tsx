import { Field, Form, Formik } from 'formik';
import { TextInput } from '../Input';
import { SignupSchema } from '../../utils/schema';
import { useAuthState } from '../../context';
import { ISignUpInput } from '../../types';

interface ISignupProps {
    closeModal: () => void;
}

const Signup = ({closeModal}: ISignupProps) => {
    const {signup, loading} = useAuthState();

    const handleSubmit = (values: ISignUpInput) => {
        const { policy, ...payload } = values;
        console.log(policy)
        signup(payload).then(() => {
            closeModal();
        });
    }
  return (
    <Formik 
        initialValues={{ email: "", password: "", username: "", fullname: "", policy: false }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={SignupSchema}
    >
        {({setFieldValue, values, errors})=>{
            console.log(errors)
        return (
            <Form className=''>
            <h3 className="text-2xl mb-5">Create an account</h3>
            <div className="grid gap-4">
                <Field
                    name="username"
                    placeholder="Username"
                    as={TextInput}
                    customStyle="placeholder:text-black text-black opacity-60"
                    containerClass="bg-black/5 border-black/50 text-black"
                />
                <Field
                    name="fullname"
                    placeholder="Full Name"
                    as={TextInput}
                    customStyle="placeholder:text-black text-black opacity-60"
                    containerClass="bg-black/5 border-black/50 text-black"
                />
                <Field
                name="email"
                type="email"
                placeholder="Email"
                as={TextInput}
                customStyle="placeholder:text-black text-black opacity-60"
                containerClass="bg-black/5 border-black/50 text-black"
                />
                <Field
                name="password"
                type="password"
                placeholder="Password"
                as={TextInput}
                customStyle="placeholder:text-black text-black opacity-60"
                containerClass="bg-black/5 border-black/50 text-black"
                />
                <div className="flex gap-2 items-center">
                    <Field
                        type="checkbox"
                        name="policy"
                        checked={values.policy}
                        value={values.policy}
                        onChange={() => setFieldValue("policy", !values.policy)}
                    />
                    <p>i confirm that i have read and accepted the <span className="text-[#3B71FE]">privacy policy</span></p>
                </div>
                {errors.policy && <p className="text-red-500 text-sm">{errors.policy}</p>}
                <button disabled={loading} type='submit' className="w-full max-w-[380px] h-[54px] bg-[#3B71FE] rounded-2xl text-white">
                    {loading ? "Loading..." : "Sign up"}
                </button>
            </div>
            </Form>
        )
        }}
    </Formik>
  )
}

export default Signup