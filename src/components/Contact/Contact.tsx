import { Field, Form, Formik } from 'formik';
import { Mail, Phone, Printer, Smartphone } from 'lucide-react';
import { TextArea, TextInput } from '../Input';

const Contact = () => {
  const onSubmit = (values: unknown) => {
    console.log(values);
  };

  return (
    <div className="">
      <div className="w-full max-w-[1133px] mx-auto pt-36 pb-10 grid grid-cols-[400px,1fr] gap-7">
        <div className="flex flex-col gap-10">
          <h3 className="text-4xl font-bold">Contact Information</h3>
          <div className="px-2">
            <p>Please reach out to us if you have any questions</p>
            <div className="flex flex-col gap-3 text-[#5D6475] mt-4">
              <div className="flex gap-3 items-center">
                <Phone size={20} />
                <p>+234 (916) 984-5070</p>
              </div>
              <div className="flex gap-3 items-center">
                <Smartphone size={20} />
                <p>+234 (916) 984-5070</p>
              </div>
              <div className="flex gap-3 items-center">
                <Mail size={20} />
                <p>info@heristays.com</p>
              </div>
              <div className="flex gap-3 items-center">
                <Printer size={20} />
                <p>+234 (916) 984-5077</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              phoneNo: "",
              message: ""
            }}
            onSubmit={onSubmit}
          >
            {() => (
              <Form className="w-full grid gap-6 text-gray-400">
                <div className="grid gap-5">
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <Field
                      name="fullName"
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
                      name="phoneNo"
                      placeholder="Phone Number"
                      as={TextInput}
                      customStyle="placeholder:text-black text-black opacity-60"
                      containerClass="bg-black/5 border-black/50 text-black"
                    />
                  </div>
                  
                  <Field
                      name="message"
                      placeholder="Your Message"
                      as={TextArea}
                      customStyle="placeholder:text-black text-black opacity-60"
                      containerClass="bg-black/5 border-black/50 text-black"
                    />
                  
                  <div>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Submit
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Contact;
