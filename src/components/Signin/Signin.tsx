import { Field, Form, Formik } from 'formik'
import { TextInput } from '../Input'

const Signin = () => {
  return (
    <Formik 
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
        console.log(values);
        }}
    >
        {()=>{
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
                name="password"
                type="password"
                placeholder="Password"
                as={TextInput}
                customStyle="placeholder:text-black text-black opacity-60"
                containerClass="bg-black/5 border-black/50 text-black"
                />
                <button className="w-full max-w-[380px] h-[54px] bg-[#3B71FE] rounded-2xl text-white">
                Log in
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