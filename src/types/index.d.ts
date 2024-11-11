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