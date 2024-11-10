import { SearchIcon } from "lucide-react"
import { PropertyListingCard } from "../PropertyListingCard"


const PropertyListing = () => {
  return (
    <div className="bg-[#F7F8FA] ">
      <div className="w-full max-w-[1366px] mx-auto py-40">
        <div className="w-full grid grid-cols-[600px,1fr] items-center gap-6">
          <h4 className="text-4xl font-bold text-[#1A2B48]">Shortlets in Lekki and VI Lagos</h4>
          <div className="w-full p-4 rounded-3xl shadow-custom2 border flex gap-4 justify-between">
            <div className="px-4 border-r-[#DDDDDD]">
              <h4 className="text-[#222222] font-semibold">Where</h4>
              <p className="text-xs text-[#6A6A6A]">Search destinations</p>
            </div>
            <div className="px-4 border-r-[#DDDDDD]">
              <h4 className="text-[#222222] font-semibold">Check in</h4>
              <p className="text-xs text-[#6A6A6A]">Add dates</p>
            </div>
            <div className="px-4 border-r-[#DDDDDD]">
              <h4 className="text-[#222222] font-semibold">Check Out</h4>
              <p className="text-xs text-[#6A6A6A]">Add dates</p>
            </div>
            <div className="px-4 border-r-[#DDDDDD]">
              <div className="flex gap-5">
                <div>
                  <h4 className="text-[#222222] font-semibold">Who</h4>
                  <p className="text-xs text-[#6A6A6A]">Add Guests</p>
                </div>
                <button className="w-[42px] h-[42px] rounded-[42px] bg-[#FE6A00] text-white flex items-center justify-center">
                  <SearchIcon size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p><span className="text-[#FE6A00]">Deep discounts on long stays:</span> 3days–10% Off, 7 days-15% Off, 30 days-30% Off, 90 Days–50% Off</p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-5">
        <PropertyListingCard />
        <PropertyListingCard />
        <PropertyListingCard />
        <PropertyListingCard />
        </div>
      </div>
    </div>
  )
}

export default PropertyListing