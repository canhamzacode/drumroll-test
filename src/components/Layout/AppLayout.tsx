import { ReactNode } from "react";
import { Contact } from "../Contact";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { useModal } from "../../context";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { setModal } = useModal();

  const openAuthModal = () => {
    setModal({ show: true, type: "Auth" });
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
