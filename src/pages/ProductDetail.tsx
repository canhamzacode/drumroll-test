import { useState } from "react";
import { ArrowLeft, Link, Snowflake, Star, Wifi } from "lucide-react";
import noTask from "../assets/noTask.png";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState, usePropertyState } from "../context";
import { useEffect } from "react";
import { FaAirFreshener, FaBasketballBall, FaCut, FaDumbbell } from "react-icons/fa";
import { MdKitchen } from "react-icons/md";
import { IProperty } from "../types";
import { Toast } from "../components/Toast";

const ProductDetail = () => {
  const { id } = useParams();
  const {isAuthenticated} = useAuthState();
  const { getSingleProperty, loading, property, initializePayment, initializingPayment } = usePropertyState();
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (id) {
      getSingleProperty(id);
    }
  }, [id]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const nights = (Number(checkOut) - Number(checkIn)) / (1000 * 60 * 60 * 24);
      if (nights > 0 && property) {
        const serviceFee = property.price * 0.05;
        const subtotal = property.price * nights + serviceFee;
        const vat = subtotal * 0.05;
        const total = subtotal + vat;
        setTotalPrice(total);
      } else {
        setTotalPrice(0);
      }
    }
  }, [checkInDate, checkOutDate, property]);

  const handleBooking = () => {
    if (!isAuthenticated) {
      Toast("error", "You need to login to book this property");
      return;
    }
    initializePayment(totalPrice, property as IProperty);
  }

  const amenityIcons: { [key: string]: JSX.Element } = {
    Wifi: <Wifi aria-label="WiFi" />,
    AC: <Snowflake aria-label="Air Conditioning" />,
    Gym: <FaDumbbell aria-label="Gym" />,
    "Air Conditioner": <FaAirFreshener aria-label="Air Conditioner" />,
    Kitchen: <MdKitchen aria-label="Kitchen" />,
    Playsport: <FaBasketballBall aria-label="Playsport" />,
    Salon: <FaCut aria-label="Salon" />
  };

  const formatPrice = (price: number) => price.toLocaleString("en-NG", { style: "currency", currency: "NGN" });

  if (loading || !property) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-[1366px] mx-auto flex flex-col gap-3 table:p-0 px-5">
      <div className="mt-8">
        <button
          className="w-[92px] h-[24px] border border-gray-300 flex items-center gap-3 px-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          <p>Back</p>
        </button>
      </div>

      <h3 className="mt-2 text-[#1E1E1E] text-4xl font-extrabold">{property.title}</h3>

      <div className="flex gap-2 items-center text-[#475467]">
        <Star size={16} color="gold" />
        <p>0.00</p>
        <p>{property.rating} reviews</p>
      </div>

      <div className="h-[646px] grid grid-cols-2 grid-rows-2 gap-6 relative">
        {property.images.slice(0, 3).map((image, index) => (
          <img
            key={index}
            src={image.secure_url}
            alt={`Property ${index + 1}`}
            className={`w-full h-full ${index === 0 ? "row-span-2" : ""}`}
          />
        ))}
        
        {property.images.length > 3 && (
          <div className="w-[42px] h-[42px] bg-[#EF5E17] border-2 border-white absolute right-4 flex items-center justify-center text-white rounded-full cursor-pointer bottom-4">
            +{property.images.length - 3}
          </div>
        )}
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
          <p>{property.description}</p>
          <div className="flex flex-col gap-1">
            {[`${property.guestCapacity} Guests`, "5 Bedrooms", `Private bathroom: ${property.privateBathroom}`, `${property.bedrooms} Private beds`, `Dedicated bathroom: ${!property.sharedBathroom}`, `Property Type: ${property.propertyType}`].map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className="py-3 mt-3 border-y border-y-[#EAECF0]">
            <p>{property.location}</p>
          </div>
          <h4 className="text-2xl font-semibold">Amenities</h4>
          <div className="grid grid-cols-2 gap-4">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3">
                {amenityIcons[amenity] || <span>🔲</span>}
                <p>{amenity}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="p-6 shadow flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-medium">{formatPrice(property.price)}</h3>
              <p className="text-[#475467]">per night</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["Check-in", "Check-out"].map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <p className="text-[#475467]">{label}</p>
                  <input
                    type="date"
                    className="text-[#475467] border border-gray-300 rounded px-2 py-1"
                    value={label === "Check-in" ? checkInDate : checkOutDate}
                    onChange={(e) => label === "Check-in" ? setCheckInDate(e.target.value) : setCheckOutDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {[
                { label: `${formatPrice(property.price)} x ${checkInDate && checkOutDate ? ((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)) : 1} night(s)`, amount: formatPrice(checkInDate && checkOutDate ? property.price * ((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)) : property.price) },
                { label: "Service Fee", amount: formatPrice(property.price * 0.05) },
                { label: "VAT", amount: formatPrice((property.price + property.price * 0.05) * 0.05) },
                { label: "Subtotal", amount: formatPrice(property.price + property.price * 0.05) },
                { label: "Total", amount: formatPrice(totalPrice) }
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <p className="text-[#101828]">{item.label}</p>
                  <p className="text-[#475467]">{item.amount}</p>
                </div>
              ))}
            </div>
            <button disabled={initializingPayment} type="button" onClick={handleBooking} className="w-full h-[44px] bg-[#EF5E17] text-white">
              {initializingPayment ? "Requesting to Book...": "Request to Book"}
            </button>
          </div>
        </div>
      </div>

      <div className="my-8 pb-8 border-b border-b-[#EAECF0]">
        <h3 className="text-[#101828] text-2xl font-semibold">Meet the host</h3>
        <div className="w-full flex gap-3 items-center mt-3">
          <div className="h-[56px] w-[56px] rounded-full bg-gray-400 text-3xl flex items-center justify-center">
            {property.created_by.fullname.charAt(0)}
          </div>
          <p className="text-[#101828] font-medium">{property.created_by.fullname}</p>
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
        <p>{property.location}</p>
      </div>

      <div className="my-8 pb-8">
        <h3 className="text-[#101828] text-2xl font-semibold">Reviews</h3>
        <p>Guests that have booked {property.title}.</p>
        <div className="flex flex-col items-center text-[#475467] font-medium mt-3">
          <img src={noTask} alt="No reviews" className="w-[150px] h-[150px]" />
          <p>No reviews yet</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;