export type CurrencyTypes = 'INR' | 'USD' | 'EUR';
export type ModifierTypes = 'Merchant' | 'Admin' | 'User';
export type HostType = 'Self' | 'Other';

export interface IAddEventFrontend {
  id?: string | number;
  name: string;
  price: number;
  currency: CurrencyTypes;
  audienceCapacity: number;
  imageLocation: string;
  fileType: string;
  fileName: string;
  state: string;
  city: string;
  venue: string;
  lng: number;
  lat: number;
  startDate: any;
  endDate: any;
  about: string;
  aboutHost: string;
  hostType: HostType;
  hostDescription: string;
  termsAndConditions: string;
  category: any[];
  profession: any[];

  //provided from Backend for some secific use Case
  createdAt?: string;
  imageUri?: string;
  uid?: string;
  hostPoint: string;


}

export interface IAddEventValidateRequestFrontend {
  payload: IAddEventFrontend;
  firebaseToken: string;
}

export type IAddEventFrontendValues =
  | string
  | number
  | boolean
  | CurrencyTypes
  | HostType
  | any[];

export interface ServiceSubscription {
  requested: string[]; //Uids of String of Requested Users
  approved: string[]; //Uids of String of Approved Users
  rejected: string[]; //Uids of String of Rejected Users
}

export interface IAddEventBackend {
  totalBookings: number;
  isDeleted: boolean;
  createdAt?: string;
  modifiedAt: string;
  lastModifiedBy: ModifierTypes;
  serviceSubscription: ServiceSubscription;
  uid: string;
  creator_name: string;
  startHour: number;
  endHour: number;
  startMinute: number;
  endMinute: number;
  startDay: string;
  endDay: string;
  startTimeStamp: number;
  endTimeStamp: number;
}

export type IAddEventDatabase = IAddEventFrontend & IAddEventBackend;
