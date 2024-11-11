import { useState } from 'react';
import { LucideShoppingBasket, User2Icon, Menu, X } from 'lucide-react';
import logo from '../../assets/logo.png';

interface INavbarProps {
  openAuth: () => void;
}

const Navbar = ({openAuth}: INavbarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='w-full max-w-[1366px] tablet:px-0 px-5 mx-auto h-[91px] flex items-center justify-between'>
      <div className='md:h-[58px] md:w-[201px] h-[26px] w-[100px]'>
        <img src={logo} alt="logo" />
      </div>

      <div className="hidden md:flex gap-2">
        <button className="w-[106px] font-bold text-[#3B71FE]">Home</button>
        <button className="w-[106px] font-bold hover:text-[#3B71FE] text-[#232323]">About</button>
        <button className="w-[106px] font-bold hover:text-[#3B71FE] text-[#232323]">Contact</button>
      </div>

      <div className="flex gap-6 items-center">
        <p className="text-[#232323] font-bold hidden md:block">NGN</p>
        <button className="w-10 h-10 flex items-center justify-center rounded-[40px] border-[#DEDEDE] shadow-custom2">
          <LucideShoppingBasket size={24} />
        </button>
        <button onClick={openAuth} className="w-10 h-10 flex items-center justify-center rounded-[40px] border-[#DEDEDE] shadow-custom2">
          <User2Icon size={24} />
        </button>

        <button onClick={toggleSidebar} className="md:hidden">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-6 mt-10 text-[#232323] font-bold">
          <button onClick={toggleSidebar} className="hover:text-[#3B71FE]">Home</button>
          <button onClick={toggleSidebar} className="hover:text-[#3B71FE]">About</button>
          <button onClick={toggleSidebar} className="hover:text-[#3B71FE]">Contact</button>
          <p>NGN</p>
          <button className="w-10 h-10 flex items-center justify-center rounded-[40px] border-[#DEDEDE] shadow-custom2">
            <LucideShoppingBasket size={24} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-[40px] border-[#DEDEDE] shadow-custom2">
            <User2Icon size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;