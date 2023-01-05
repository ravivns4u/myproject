export interface IGetService {
  firebaseToken: string;
  serviceStatus: IServiceTypes;
  isEvent: boolean;
  uid: string;
  startWith: number;
  endAt: number;
}

export interface IGetProducts {
  firebaseToken: string;
  serviceStatus: IServiceTypes;
  uid: string;
  startWith: number;
  endAt: number;
}

export type IServiceTypes = 'pending' | 'verified' | 'rejected';
