import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { PropertyListingCard } from "../PropertyListingCard";
import { usePropertyState } from "../../context"
import { Toast } from "../Toast";

interface IFilterSectionProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

const FilterSection = ({ title, placeholder, value, onChange, type = "text" }: IFilterSectionProps) => (
  <div className="px-4 border-r border-gray-300">
    <h4 className="text-[#222222] font-semibold">{title}</h4>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-xs text-[#6A6A6A] bg-transparent focus:outline-none placeholder-gray-500 w-full"
    />
  </div>
);

interface IFilter {
  location: string;
  checkin: string;
  checkout: string;
  guests: number;
}

const PropertyListing = () => {
  const { properties, getAllProperties, loading, searchProperties } = usePropertyState();
  const [filters, setFilters] = useState<IFilter>({
    location: "",
    checkin: "",
    checkout: "",
    guests: 0,
  });

  const handleInputChange = (field: keyof IFilter, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };


  const handleSearch = () => {
    if (!filters.location || !filters.checkin || !filters.checkout || !filters.guests) {
      Toast("error", "Please fill all fields");
      return;
    }
    searchProperties(filters);
  }

  useEffect(() => {
    getAllProperties();
  }, []);

  return (
    <div className="bg-[#F7F8FA]">
      <div className="w-full max-w-[1366px] mx-auto py-40 px-5">
        <div className="w-full grid tablet:grid-cols-[500px,1fr] grid-cols-1 items-center gap-6">
          <h4 className="text-3xl font-bold text-[#1A2B48]">Shortlets in Lekki and VI Lagos</h4>
          
          <div className="w-full items-center h-[63px] rounded-[48px] shadow-custom2 border md:flex hidden gap-4 justify-between">
            <FilterSection
              title="Where"
              placeholder="Search destinations"
              value={filters.location}
              onChange={(value) => handleInputChange("location", value)}
            />
            <FilterSection
              title="Check in"
              placeholder="Select check-in date"
              value={filters.checkin}
              onChange={(value) => handleInputChange("checkin", value)}
              type="date" // Set type to date
            />
            <FilterSection
              title="Check out"
              placeholder="Select check-out date"
              value={filters.checkout}
              onChange={(value) => handleInputChange("checkout", value)}
              type="date" // Set type to date
            />
            <div className="px-4">
              <div className="flex gap-5 items-center">
                <div>
                  <h4 className="text-[#222222] font-semibold">Who</h4>
                  <input
                    type="number" // Change to number for guests
                    placeholder="Add Guests"
                    value={filters.guests}
                    onChange={(e) => handleInputChange("guests", e.target.value)}
                    className="text-xs text-[#6A6A6A] bg-transparent focus:outline-none placeholder-gray-500 w-full"
                  />
                </div>
                <button
                  onClick={handleSearch}
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