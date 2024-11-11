import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface ModalState {
  show: boolean;
  type?: "Auth" | "Profile";
  data?: [];
}

interface ModalContextType {
  modal: ModalState;
  setModal: Dispatch<SetStateAction<ModalState>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalState>({
    show: false,
    type: "Auth",
    data: [],
  });

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
