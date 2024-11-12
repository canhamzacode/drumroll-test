import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { PropertyListingCard } from "../PropertyListingCard";
import { usePropertyState } from "../../context";

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
  const {properties, getAllProperties, loading} = usePropertyState();
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

  useEffect(()=> {
    getAllProperties();
  },[])

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
          {loading && <p>Loading...</p>}
          {properties.map((property, index) => (
            <PropertyListingCard
              key={index}
              id={property._id}
              images={property.images}
              title={property.title}
              address={property.location}
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
