import { ChevronRight } from "lucide-react";
import "./banner.css";

const Banner = () => {
  return (
    <div className="banner-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
      <div className="w-full max-w-[1133px] px-5 z-10 text-white mx-auto flex flex-col gap-4">
        <p className="md:text-2xl text-xl font-medium z-10">Hottest Apartment</p>
        <h3 className="md:text-4xl text-2xl font-medium  z-10">Sigmabase Apartments VI</h3>
        <div className="flex gap-2 items-center  z-10">
          <p className="font-medium">discover more</p>
          <ChevronRight size={25} />
        </div>
      </div>
    </div>
  )
}

export default Banner