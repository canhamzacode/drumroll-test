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
    bookings: [];
}
  