import { HouseIcon, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { IImage } from '../../types';
import { Link } from 'react-router-dom';

interface IPropertyCard {
  images: IImage[];
  id: string;
  title: string;
  address: string;
  description: string;
  propertyType: string;
}

const PropertyListingCard = ({
  images,
  title,
  address,
  description,
  propertyType,
  id
}: IPropertyCard) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className="relative max-w-[434px] w-full mx-auto bg-white shadow-property-card rounded-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-[341px] flex items-center justify-between">
        <img
          src={images[currentImageIndex].secure_url}
          alt={`Property ${currentImageIndex + 1}`}
          className="object-cover w-full h-full"
        />

        <button
          onClick={handlePrevClick}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNextClick}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <Link to={`/property/${id}`} className="font-semibold text-lg">{title}</Link>
        <div className="flex flex-col gap-2 text-sm text-[#6A6A6A]">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <p>{address}</p>
          </div>
          <div className="flex items-center gap-2">
            <HouseIcon size={16} />
            <p>{propertyType}</p>
          </div>
        </div>
      </div>

      {isHovered && (
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t shadow-md transition-transform duration-300 ease-in-out transform translate-y-0">
          <p className="text-sm text-[#222222]">{description}</p>
        </div>
      )}
    </div>
  );
};

export default PropertyListingCard;
