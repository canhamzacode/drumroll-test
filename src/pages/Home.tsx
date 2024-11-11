import { useState } from "react";
import { About, Banner, CustomModal, Hero, Map, PropertyListing, Signin, Signup } from "../components";
import { X } from "lucide-react";
import { useModal } from "../context";

const Home = () => {
  const { modal, setModal } = useModal();
  const [authType, setAuthType] = useState<"Sign In" | "Sign Up">("Sign In");

  const closeModal = () => {
    setModal({ show: false });
  };

  return (
    <div>
      <Hero />
      <PropertyListing />
      <About />
      <Banner />
      <Map />
      <CustomModal
        title={""}
        subTitle={""}
        show={modal.show}
        onDismiss={closeModal}
        modalClassName="bg-white"
        customHeader={
          <div className='w-full p-3 bg-white flex items-center justify-center gap-6 rounded-t-2xl border-b-[0.5px] border-b-[#BFBFBF] relative'>
            <button onClick={closeModal} className='absolute right-3 top-3'>
              <X size={24} />
            </button>
            <button onClick={() => setAuthType("Sign In")} className={`${authType === "Sign In" ? "text-[#EF5E17]" : "text-[#1A2B48]"}`}>
              Sign In
            </button>
            <button onClick={() => setAuthType("Sign Up")} className={`${authType === "Sign Up" ? "text-[#EF5E17]" : "text-[#1A2B48]"}`}>
              Sign Up
            </button>
          </div>
        }
      >
        {authType === "Sign Up" && <Signup />}
        {authType === "Sign In" && <Signin />}
      </CustomModal>
    </div>
  );
};

export default Home;
