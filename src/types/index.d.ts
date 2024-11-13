export interface ISignUpInput {
    email: string;
    password: string;
    fullname: string;
    username: string;
}

export interface ILoginInput {
    email: string;
    password: string;
}

export interface IUser  {
    _id: string;
    role: "regular" | "admin" | "superadmin"; 
    status: "active" | "inactive";
    username: string;
    fullname: string;
    email: string;
    password: string;
    reference: string;
    isUpdated: boolean;
    isAccountVerified: boolean;
    createdAt: string;
};

  
export interface IImage {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    folder: string;
    access_mode: string;
    api_key: string;
}
  

export interface IBooking {
    checkin: string; // ISO date string
    checkout: string; // ISO date string
    guests: number; // Number of guests
    _id: string; // Unique identifier for the booking
    date: string; // ISO date string for when the booking was created
}
export interface IProperty {
    _id: string;
    created_by: IUser;
    title: string;
    description: string;
    rating: number;
    price: number;
    location: string;
    propertyType: string;
    status: string;
    images: IImage[];
    guestCapacity: number;
    bedrooms: number;
    privateBed: number;
    privateBathroom: boolean;
    dedicatedBathroom: boolean;
    sharedBathroom: boolean;
    minimumNights: number;
    maximumNights: number;
    amenities: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    bookings: IBooking[];
}
  

export interface ICreatePropertyInput {
    title: string;                // Title of the property
    description: string;          // Description of the property
    price: number;                // Price of the property (changed to number)
    location: string;             // Location of the property
    images: File[];               // Array of files for image uploads
    propertyType: string;         // Type of the property
    guestCapacity: number;        // Guest capacity (changed to number)
    bedrooms: number;             // Number of bedrooms (changed to number)
    privateBed: number;           // Number of private beds (changed to number)
    minimumNights: number;         // Minimum nights required (changed to number)
    maximumNights: number;         // Maximum nights allowed (changed to number)
    amenities: string;            // Single string for amenities, comma-separated
}

export interface IPropertyFilter {
    location: string;
    checkin: string | number;
    checkout: string | number;
    guests: number;
}