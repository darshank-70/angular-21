import { Gender, BloodGroup, UserRole } from "../@core/types/user.types";

export interface User {
  id: number;

  firstName: string;
  lastName: string;
  maidenName?: string;

  age: number;
  gender: Gender;

  email: string;
  phone: string;

  username: string;
  password: string;

  birthDate: string; // ISO date string

  image: string;

  bloodGroup: BloodGroup;
  height: number;
  weight: number;
  eyeColor: string;

  hair: Hair;

  ip: string;

  address: Address;

  macAddress: string;
  university: string;

  bank: BankDetails;

  company: Company;

  ein: string;
  ssn: string;

  userAgent: string;

  crypto: CryptoWallet;

  role: UserRole;
}
// nested models

export interface Hair {
  color: string;
  type: string;
}


export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}


export interface Coordinates {
  lat: number;
  lng: number;
}


export interface BankDetails {
  cardExpire: string;   // MM/YY
  cardNumber: string;
  cardType: string;
  currency: string;    // ISO currency code
  iban: string;
}


export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}


export interface CryptoWallet {
  coin: string;
  wallet: string;
  network: string;
}
