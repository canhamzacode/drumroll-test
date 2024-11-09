import { HouseIcon, MapPin } from 'lucide-react'

const PropertyListingCard = () => {
  return (
    <div className="max-w-[434px] bg-white shadow-property-card rounded-md">
        <div className="w-full h-[341px] bg-red-400"></div>
        <div className="p-5 flex flex-col gap-4">
            <h4>Sigmabase Apartments VI</h4>
            <div className="flex flex-col gap-2">
                <div className="w-full flex items-center gap-2">
                <MapPin size={16} />
                <p>7/9 Molade Okoya street Off Ajose Adeogun VI</p>
                </div>
                <div className="w-full flex items-center gap-2">
                <HouseIcon size={16} />
                <p>Studios and One Bedroom Apartments</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PropertyListingCard