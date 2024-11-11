import { ReactNode } from "react";
import { Contact } from "../Contact";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { useAuthState, useModal } from "../../context";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { setModal } = useModal();
  const {user} = useAuthState();

  const openAuthModal = () => {
    if (user === null) {
      setModal({ show: true, type: "Auth" });
    } else {
      setModal({ show: true, type: "Profile" });
    }
  };

  return (
    <div>
      <Navbar openAuth={openAuthModal} />
      {children}
      <Contact />
      <Footer />
    </div>
  );
};

export default AppLayout;
