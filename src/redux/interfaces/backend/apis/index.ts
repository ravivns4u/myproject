import type { ImagePortfolio } from './ImagePortfolio';
import type { ImageFeed } from './ImageFeed';
import type { ServiceRequestForm } from './servicePortfolio';
import type {
  ProductExpectedPayload,
  ProductFireStoreSchema,
} from './productPortfolio';
import { IAddEventFrontend } from './v2/events';

export type { ProductFireStoreSchema };

export type EditDataForm =
  | ImagePortfolio
  | ImageFeed
  | ServiceRequestForm
  | ProductExpectedPayload
  | IAddEventFrontend;

export interface IMetaData {
  name: string;
  uid: string;
}
