import {
  GridColumns,
  GridRowModel,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import classes from '../Body.module.scss';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import type {
  ServiceRowInterface,
  ImagePortfolioRow,
} from '../SubModules/Services/ServicesModule';
import {
  AdminFrontendIndividualViewSchema,
  AdminFrontendMerchantViewSchema,
} from '../../../../redux/interfaces/backend/firestore/registerNewUser';
import { IMetaData } from '../../../../redux/interfaces/backend/apis';
import { IAddEventFrontend } from '../../../../redux/interfaces/backend/apis/v2/events';
import { ICreateProductUser } from '../../../../redux/interfaces/backend/apis/v2/products/product.interfaces';
import { ProductExpectedPayload } from '../../../../redux/interfaces/backend/apis/productPortfolio';

export type RowDataTypes =
  | ServiceRowInterface
  | ImagePortfolioRow
  | AdminFrontendIndividualViewSchema
  | IAddEventFrontend
  | AdminFrontendMerchantViewSchema
  | ProductExpectedPayload;

export const dummyOrderRequestsRowRejected: GridRowModel[] = [
  {
    id: 0,
    title: "New Year's Eve",
    userName: 'Jimmy Nisham',
    location: 'Chattarpur Enclave, Delhi',
    date: 'Saturday, 20th Dec 2021',
    time: '10:00 PM - 11:00 PM',
    hideReject: true,
  },
  {
    id: 1,
    title: "New Year's Eve",
    userName: 'Nora Gray',
    location: 'Chattarpur Enclave, Delhi',
    date: 'Saturday, 20th Dec 2021',
    time: '10:00 PM - 11:00 PM',
    hideReject: true,
  },
];

const currencyMap = {
  USD: '$',
  EUR: '€',
  INR: '₹',
};
