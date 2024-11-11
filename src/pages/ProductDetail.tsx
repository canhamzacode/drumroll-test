import { ArrowLeft, CookingPot, Link, Snowflake, SquareAsterisk, Star, Wifi } from "lucide-react";
import noTask from "../assets/noTask.png";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();
  const amenities = [
    { icon: Wifi, label: "Wifi" },
    { icon: CookingPot, label: "Cooker" },
    { icon: Snowflake, label: "AC" },
    { icon: SquareAsterisk, label: "Towels" },
    { icon: Snowflake, label: "Hair dryer" },
    { icon: Snowflake, label: "Safe Box" }
  ];

  return (
    <div className="w-full max-w-[1366px] mx-auto flex flex-col gap-3 table:p-0 px-5">
      <div className="mt-8">
        <button className="w-[92px] h-[24px] border border-gray-300 flex items-center gap-3 px-2"
            onClick={() => navigate(-1)}    
        >
          <ArrowLeft size={16} />
          <p>Back</p>
        </button>
      </div>

      <h3 className="mt-2 text-[#1E1E1E] text-4xl font-extrabold">Sigmabase Apartments VI</h3>

      <div className="flex gap-2 items-center text-[#475467]">
        <Star size={16} color="gold" />
        <p>0.00</p>
        <p>0 reviews</p>
      </div>

      <div className="h-[746px] sm:h-[500px] grid grid-cols-2 sm:grid-cols-1 grid-rows-2 gap-6 relative">
        <img
            src="https://images.pexels.com/photos/29139391/pexels-photo-29139391/free-photo-of-dome-of-palacio-de-bellas-artes-in-mexico-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="Main view"
            className="w-full h-full row-span-2 bg-red-400 object-cover"
        />
        <img
            src="https://images.pexels.com/photos/29127727/pexels-photo-29127727/free-photo-of-adorable-shih-tzu-puppy-playing-with-toy.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="Additional view 1"
            className="w-full h-full object-cover"
        />
        <img
            src="https://images.pexels.com/photos/29127727/pexels-photo-29127727/free-photo-of-adorable-shih-tzu-puppy-playing-with-toy.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="Additional view 2"
            className="w-full h-full object-cover"
        />
        <div className="w-[42px] h-[42px] bg-[#EF5E17] border-2 border-white absolute right-4 bottom-4 flex items-center justify-center text-white rounded-full cursor-pointer">
            +5
        </div>
    </div>

      <div className="flex justify-between gap-3 mt-4">
        <h4 className="text-2xl font-semibold">Listing Details</h4>
        <div className="flex items-center gap-3">
            {[...Array(2)].map((_, i) => (
            <button key={i} className="bg-[#57707d] h-[40px] w-[116px] rounded-md flex items-center gap-3 text-white">
                <div className="h-[40px] w-[31px] bg-[#607d8b] rounded-md flex items-center justify-center">
                <Link size={16} />
                </div>
                <p>Copy link</p>
            </button>
            ))}
        </div>
      </div>

      <div className="grid tablet:grid-cols-2 grid-cols-1 gap-10 pb-7 mt-6 border-b border-b-[#EAECF0]">
        <div className="text-[#475467] flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            {["10 Guests", "5 Bedrooms", "Private bathroom: Yes", "5 Private beds", "Dedicated bathroom: No"].map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className="py-3 mt-3 border-y border-y-[#EAECF0]">
            <p>7/9 Molade Okoya street Off Ajose Adeogun VI</p>
          </div>
          <h4 className="text-2xl font-semibold">Amenities</h4>
          <div className="grid grid-cols-2 gap-4">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3">
                <amenity.icon size={24} />
                <p>{amenity.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 shadow flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-medium">₦ 63,000</h3>
            <p className="text-[#475467]">per night</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["Check-in", "Check-out"].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <p className="text-[#475467]">{label}</p>
                <p className="text-[#475467]">12:00 PM</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: "₦ 63,000 x 1 nights", amount: "NGN 63,000.00" },
              { label: "Service Fee", amount: "NGN19,200.00" },
              { label: "Subtotal", amount: "NGN19,200.00" },
              { label: "VAT", amount: "NGN19,200.00" },
              { label: "Total", amount: "NGN19,200.00" }
            ].map((item, i) => (
              <div key={i} className="flex justify-between">
                <p className="text-[#101828]">{item.label}</p>
                <p className="#475467">{item.amount}</p>
              </div>
            ))}
          </div>
          <button className="w-full h-[44px] bg-[#EF5E17] text-white">Request to Book</button>
        </div>
      </div>

      <div className="my-8 pb-8 border-b border-b-[#EAECF0]">
        <h3 className="text-[#101828] text-2xl font-semibold">Meet the host</h3>
        <div className="w-full flex gap-3 items-center mt-3">
          <div className="h-[56px] w-[56px] rounded-full bg-gray-400" />
          <p className="text-[#101828] font-medium">Abdulkarim Ahmed</p>
        </div>
      </div>

      <div className="my-8 pb-8 border-b border-b-[#EAECF0]">
        <h3 className="text-[#101828] text-2xl font-semibold">House rules</h3>
        <p>You'll be staying in someone's home, so please treat it with care and respect.</p>
        <div className="grid grid-cols-2 gap-4 mt-5 capitalize text-[#475467] font-medium">
          {["no smoking", "no partying allowed", "no unregistered guests", "no pets allowed"].map((rule, index) => (
            <p key={index}>{rule}</p>
          ))}
        </div>
      </div>

      <div className="my-8 pb-8 border-b border-b-[#EAECF0]">
        <h3 className="text-[#101828] text-2xl font-semibold">Where you’ll be</h3>
        <p>2 Cubango CL, Maitama, Abuja 904101, Federal Capital Territory, Nigeria</p>
      </div>

      <div className="my-8 pb-8">
        <h3 className="text-[#101828] text-2xl font-semibold">Reviews</h3>
        <p>Guests that have booked Sigmabase Apartments VI.</p>
        <div className="flex flex-col items-center text-[#475467] font-medium mt-3">
          <img src={noTask} alt="No reviews found" />
          <p>No reviews found for Sigmabase Apartments VI</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
