import { Field, Form, Formik } from "formik";
import "./hero.css";
import { TextInput } from "../Input";
import { User2 } from "lucide-react";

const Hero = () => {
    const onSubmit = () => {
        // console.log(values);
    }
  return (
    <div className="hero-bg px-5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
        <div className="w-full max-w-[1133px] mx-auto flex flex-col gap-6 p-5">
            <div className="text-center z-10">
                <h1 className="text-white font-semibold tablet:text-5xl text-3xl">Luxury shortlet apartments in Lekki and VI Lagos</h1>
                <p className="text-lg text-white">Get the best prices on over 300 serviced shortlet apartments accross 6 Properties in Chevron, Lekki Phase1 and Victoria Island</p>
            </div>
            <div className="w-full z-10 px-4 py-3 bg-[#F7F7F8] rounded-xl grid tablet:grid-cols-[400px,1fr] grid-cols-1 justify-between items-center gap-3">
                <div className="">
                    <p className="text-[#fe6a00]">Get special offers, and more from Heristays shortlets.</p>
                    <p>Subscribe to see secret deals and price reductions.</p>
                </div>
                <div className="rounded-lg flex p-0 justify-between w-full">
                    <Formik 
                        initialValues={{
                        email:""
                        }}  
                        onSubmit={onSubmit}
                    >
                        {() => (
                        <Form
                            className="w-full mx-auto tablet:max-w-[554px] flex items-center gap-6 justify-between text-gray-400"
                            >
                            <div className="w-full">
                                <Field
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                as={TextInput}
                                icon={<User2 size={25} />}
                                customStyle="placeholder:text-black text-black opacity-60"
                                containerClass="bg-black/5 border-black/50 text-black"
                                />
                            </div>
                            <button className="bg-[#fe6a00] w-[82px] h-[46.99px] px-4 py-3 rounded-3xl text-white whitespace-nowrap">
                                Submit
                            </button>
                        </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero