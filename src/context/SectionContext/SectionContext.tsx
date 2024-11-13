import { createContext, useContext, ReactNode, useRef } from 'react';

interface SectionRefs {
  aboutRef: React.RefObject<HTMLElement>;
  contactRef: React.RefObject<HTMLElement>;
}

interface SectionContextProps extends SectionRefs {
  scrollToSection: (section: keyof SectionRefs) => void;
}

const SectionContext = createContext<SectionContextProps | undefined>(undefined);

export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (section: keyof SectionRefs) => {
    const sectionRef = { aboutRef, contactRef }[section];
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SectionContext.Provider value={{ aboutRef, contactRef, scrollToSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) throw new Error("useSection must be used within a SectionProvider");
  return context;
};
