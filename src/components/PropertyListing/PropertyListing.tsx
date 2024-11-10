import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { PropertyListingCard } from "../PropertyListingCard";

const propertyData = [
  {
    images: [
      "https://images.pexels.com/photos/28169367/pexels-photo-28169367/free-photo-of-black-model-in-yellow-drapes.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/29284806/pexels-photo-29284806/free-photo-of-traditional-colombian-fruit-vendor-in-vibrant-dress.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    ],
    title: "Sigmabase Apartments VI",
    address: "7/9 Molade Okoya street Off Ajose Adeogun VI",
    description: "Additional details about the property, such as amenities, special offers, or booking options.",
    propertyType: "Studios and One Bedroom Apartments",
  },
  {
    images: [
      "https://images.pexels.com/photos/28988215/pexels-photo-28988215/free-photo-of-surfer-at-sunset-on-ipanema-beach-rio-de-janeiro.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/29284806/pexels-photo-29284806/free-photo-of-traditional-colombian-fruit-vendor-in-vibrant-dress.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    ],
    title: "Beachfront Villas, Lekki",
    address: "123 Lekki Expressway, Lekki Phase 1",
    description: "Luxury beachfront villas with scenic views and private pools.",
    propertyType: "2 Bedroom Villas",
  },
];

interface IFilterSectionProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const FilterSection = ({ title, placeholder, value, onChange }: IFilterSectionProps) => (
  <div className="px-4 border-r border-gray-300">
    <h4 className="text-[#222222] font-semibold">{title}</h4>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-xs text-[#6A6A6A] bg-transparent focus:outline-none placeholder-gray-500 w-full"
    />
  </div>
);

interface Filters {
  where: string;
  checkIn: string;
  checkOut: string;
  who: string;
}

const PropertyListing = () => {
  const [filters, setFilters] = useState<Filters>({
    where: "",
    checkIn: "",
    checkOut: "",
    who: "",
  });

  const handleInputChange = (field: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handleSearchClick = () => {
    console.log(filters); // Logs the filter values as an object
  };

  return (
    <div className="bg-[#F7F8FA]">
      <div className="w-full max-w-[1366px] mx-auto py-40 px-5">
        
        <div className="w-full grid tablet:grid-cols-[500px,1fr] grid-cols-1 items-center gap-6">
          <h4 className="text-3xl font-bold text-[#1A2B48]">Shortlets in Lekki and VI Lagos</h4>
          
          <div className="w-full items-center h-[63px] rounded-[48px] shadow-custom2 border md:flex hidden gap-4 justify-between">
            <FilterSection
              title="Where"
              placeholder="Search destinations"
              value={filters.where}
              onChange={(value) => handleInputChange("where", value)}
            />
            <FilterSection
              title="Check in"
              placeholder="Add dates"
              value={filters.checkIn}
              onChange={(value) => handleInputChange("checkIn", value)}
            />
            <FilterSection
              title="Check out"
              placeholder="Add dates"
              value={filters.checkOut}
              onChange={(value) => handleInputChange("checkOut", value)}
            />
            <div className="px-4">
              <div className="flex gap-5 items-center">
                <div>
                  <h4 className="text-[#222222] font-semibold">Who</h4>
                  <input
                    type="text"
                    placeholder="Add Guests"
                    value={filters.who}
                    onChange={(e) => handleInputChange("who", e.target.value)}
                    className="text-xs text-[#6A6A6A] bg-transparent focus:outline-none placeholder-gray-500 w-full"
                  />
                </div>
                <button
                  onClick={handleSearchClick}
                  className="w-[42px] h-[42px] rounded-full bg-[#FE6A00] text-white flex items-center justify-center"
                >
                  <SearchIcon size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p>
            <span className="text-[#FE6A00]">Deep discounts on long stays:</span> 3 days–10% Off, 7 days-15% Off, 30 days-30% Off, 90 days–50% Off
          </p>
        </div>
        
        <div className="mt-4 grid tablet:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {propertyData.map((property, index) => (
          <PropertyListingCard
            key={index}
            images={property.images}
            title={property.title}
            address={property.address}
            description={property.description}
            propertyType={property.propertyType}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
