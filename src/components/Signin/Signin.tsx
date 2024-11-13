import { Field, Form, Formik } from 'formik'
import { TextInput } from '../Input'
import { ILoginInput } from '../../types'
import { SigninSchema } from '../../utils/schema'
import { useAuthState } from '../../context'
import { Loader } from 'lucide-react'
interface ISignInProps {
    closeModal: () => void;
}

const Signin = ({closeModal}: ISignInProps) => {
    const {signin, loading} = useAuthState()
    const handleSubmit = (values: ILoginInput) => {
        signin(values).then(()=>{
            closeModal();
        });
        // if (user) {
        //     closeModal();
        // }
    }
  return (
    <Formik 
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={SigninSchema}
    >
        {({ values, handleChange })=>{
        return (
            <Form className=''>
            <h3 className="text-2xl mb-5">Create an account</h3>
            <div className="grid gap-4">
                <Field
                    name="email"
                    placeholder="Email | Username"
                    as={TextInput}
                    customStyle="placeholder:text-black text-black opacity-60"
                    containerClass="bg-black/5 border-black/50 text-black"
                    value={values.email}
                    onChange={handleChange}
                />
                <Field
                name="password"
                type="password"
                placeholder="Password"
                as={TextInput}
                customStyle="placeholder:text-black text-black opacity-60"
                containerClass="bg-black/5 border-black/50 text-black"
                />
                <button disabled={loading} type='submit' className="w-full max-w-[380px] h-[54px] bg-[#3B71FE] rounded-2xl text-white">
                {loading ? <Loader className='mx-auto' /> : "Sign in"}
                </button>
                <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-3">
                    <input type="checkbox" />
                    <p>Remember me</p>
                </div>
                <p className="underline">Forgot Password?</p>
                </div>
            </div>
            </Form>
        )
        }}
    </Formik>
  )
}

export default Signin