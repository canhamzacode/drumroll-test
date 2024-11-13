import { ReactNode, useState } from "react";
import { Contact } from "../Contact";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { useAuthState, useModal } from "../../context";
import { CustomModal } from "../Modal";
import Profile from "../Profile/Profile";
import { Signup } from "../Signup";
import { Signin } from "../Signin";
import { X } from "lucide-react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { setModal , modal} = useModal();
  const [authType, setAuthType] = useState<"Sign In" | "Sign Up">("Sign In");
  const {user, logout} = useAuthState();

  const openAuthModal = () => {
    if (user === null) {
      setModal({ show: true, type: "Auth" });
    } else {
      setModal({ show: true, type: "Profile" });
    }
  };

  const closeModal = () => {
    setModal({
      ...modal, show: false
    })
  }


  const signout = () => {
    logout();
    closeModal();
  }

  return (
    <div>
      <Navbar openAuth={openAuthModal} />
      {children}
      <Contact />
      <Footer />
      <CustomModal
        title={modal.type === "Profile" ? "Profile Information": ""}
        subTitle={""}
        show={modal.show}
        onDismiss={closeModal}
        modalClassName="bg-white"
        customHeader={ modal.type === "Auth" && (
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
        )
        }
      >
        {modal.type === "Auth" && authType === "Sign Up" && <Signup closeModal={closeModal} />}
        {modal.type === "Auth" && authType === "Sign In" && <Signin closeModal={closeModal} />}
        {modal.type === "Profile" && (
          <Profile signout={signout} />
        )}
      </CustomModal>
    </div>
  );
};

export default AppLayout;
