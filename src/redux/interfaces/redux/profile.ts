import type { ImagePortfolio } from '../backend/apis/ImagePortfolio';
import type { ImagePortfolio1, } from '../backend/apis/ImagePortfolio';
import type { ImageFeed } from '../backend/apis/ImageFeed';
import type { Caption } from '../backend/apis/ImageFeed';

import type {
  ServicePortfolio,
  ServiceRequestForm,
} from '../backend/apis/servicePortfolio';
import type { ProductFireStoreSchema } from '../backend/apis/productPortfolio';
import type {
  NewUserProfessionalMetaData,
  NewUserMerchantMetaData,
} from '../backend/firestore';
import { IAddEventFrontend } from '../backend/apis/v2/events';
import { ICreateProductUser } from '../backend/apis/v2/products/product.interfaces';
export interface PortfolioInterface {
  images: ImagePortfolio[];
  video?: string;
  imageStart: number;
  imageEnd: number;
}
export interface PortfolioInterface1 {
  caption: ImagePortfolio1[];
  // video?: string;
  imageStart: number;
  imageEnd: number;
}

export interface FeedInterface {
  images: ImageFeed[];
  video?: string;
  imageStart: number;
  imageEnd: number;
}
export interface FeedInterface1 {
  caption: Caption[];
  // video?: string;
  imageStart: number;
  imageEnd: number;
 
}

export interface ServiceInterface {
  servicesPending: ServiceRequestForm[];
  servicesApproved: ServiceRequestForm[];
  servicesRejected: ServiceRequestForm[];
}

export interface EventsInterface {
  eventsPending: IAddEventFrontend[];
  eventsApproved: IAddEventFrontend[];
  eventsRejected: IAddEventFrontend[];
}

export interface ProductsInterface {
  productsPending: ICreateProductUser[];
  productsApproved: ICreateProductUser[];
  productsRejected: ICreateProductUser[];
}

export interface FetchTypes {
  pending: boolean;
  rejected: boolean;
}

export interface AdminFetches {
  accounts: FetchTypes;
  companies: FetchTypes;
}

export interface AdminInterface {
  accounts: NewUserProfessionalMetaData[];
  companies: NewUserMerchantMetaData[];
  adminevents: IAddEventFrontend[];
  adminProducts: ICreateProductUser[];
  adminServices: ServicePortfolio[];
  fetches: AdminFetches;
}

export interface PortfolioState {
  portfolios: PortfolioInterface;
  portfolios1: PortfolioInterface1;

  feeds: FeedInterface;
  feeds1:FeedInterface1;
  services: ServiceInterface;
  events: EventsInterface;
  products: ProductsInterface;
  admin: AdminInterface;
  dp: string;
  miscdp: string;
  fetched: boolean;
}
