import { useState } from "react";
import { About, Banner, Contact, CustomModal, Footer, Hero, Map, Navbar, PropertyListing, TextInput } from "../components"
import { X } from "lucide-react";
import { Field, Form, Formik } from "formik";

const Home = () => {
  const [modal, setModal] = useState<{
    show: boolean;
    type?: "Auth";
    data?: [];
  }>({
    show: false,
    type: "Auth",
  });
  const [authType, setAuthType] = useState<"Sign In" | "Sign Up">("Sign In");

  const openAuthModal = () => {
    setModal({ show: true, type: "Auth" });
  }

  const closeModal = () => {
    setModal({ show: false });
  };
  return (
    <div>
      <Navbar openAuth={openAuthModal}  />
      <Hero />
      <PropertyListing />
      <About />
      <Banner />
      <Map />
      <Contact />
      <Footer />
      <CustomModal
          title={""}
          subTitle={""}
          show={modal.show}
          onDismiss={closeModal}
          modalClassName="bg-white"
          customHeader={
            <div className='w-full p-3 bg-white flex items-center justify-center gap-6 rounded-t-2xl border-b-[0.5px] border-b-[#BFBFBF]relative'>
              <button onClick={closeModal} className='absolute right-3 top-3'>
                <X size={24} />
              </button>
              <button onClick={()=> setAuthType("Sign In")} className={`${authType === "Sign In" ? "text-[#EF5E17]": "text-[#1A2B48]" }`}>Sign In</button>
              <button onClick={()=> setAuthType("Sign Up")} className={`${authType === "Sign Up" ? "text-[#EF5E17]": "text-[#1A2B48]" }`}>Sign Up</button>
            </div>
          }
        >
          {/* signup/create account */}
          {authType === "Sign Up" && (
            <Formik 
              initialValues={{ email: "", password: "", username: "", fullName: "", policy: false }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({setFieldValue})=>{
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
                        name="password"
                        type="password"
                        placeholder="Password"
                        as={TextInput}
                        customStyle="placeholder:text-black text-black opacity-60"
                        containerClass="bg-black/5 border-black/50 text-black"
                      />
                      <button className="w-full max-w-[380px] h-[54px] bg-[#3B71FE] rounded-2xl text-white">
                        Register
                      </button>
                      <div className="flex gap-2 items-center">
                        <input type="checkbox" name="policy" id="policy" onClick={(e)=> {
                          setFieldValue("policy", e.bubbles);
                        }} />
                        <p>i confirm that i have read and accepted the <span className="text-[#3B71FE]">privacy policy</span></p>
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          )}
          {/* signin */}
          {authType === "Sign In" && (
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
          )}
      </CustomModal>
    </div>
  )
}

export default Home