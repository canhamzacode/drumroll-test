import { LucideShoppingBasket, User2Icon } from "lucide-react";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className='w-full max-w-[1366px] mx-auto h-[91px] flex items-center justify-between'>
        <div className='h-[58px] w-[201px]'>
            <img src={logo} alt="logo" />
        </div>
        <div className="flex gap-2">
            <button className="w-[106px] font-bold text-[#3B71FE]">
                Home
            </button>
            <button className="w-[106px] font-bold hover:text-[#3B71FE] text-[#232323]">
                About
            </button>
            <button className="w-[106px] font-bold hover:text-[#3B71FE] text-[#232323]">
                Contact
            </button>
        </div>
        <div className="flex gap-6 items-center">
            <p className="text-[#232323] font-bold">NGN</p>
            <button className="w-10 h-10 flex items-center justify-center rounded-[40px] border-[#DEDEDE] shadow-custom2">
                <LucideShoppingBasket size={24} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-[40px] border-[#DEDEDE] shadow-custom2">
                <User2Icon size={24} />
            </button>
        </div>
    </div>
  )
}

export default Navbar