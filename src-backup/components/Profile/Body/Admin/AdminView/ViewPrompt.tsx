import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Components } from './LazyComponents/LazyComponents';
import { RowDataTypes } from '../Schema';
import { ServiceRowInterface } from '../../SubModules/Services/ServicesModule';
import classes from './ViewPrompt.module.scss';
import { ProductExpectedPayload } from '../../../../../redux/interfaces/backend/apis/productPortfolio';
import { ServiceRequestForm } from '../../../../../redux/interfaces/backend/apis/servicePortfolio';
import Spinner from '../../../../Common/Spinner/Spinner';
import {
  AdminFrontendMerchantViewSchema,
  AdminFrontendIndividualViewSchema,
} from '../../../../../redux/interfaces/backend/firestore/registerNewUser';
import type { FormState } from './UserViewer/IndividualViewer';
import { IAddEventFrontend } from '../../../../../redux/interfaces/backend/apis/v2/events';
import { ICreateProductUser } from '../../../../../redux/interfaces/backend/apis/v2/products/product.interfaces';
interface Props {
  open: boolean;
  handleOperation: (open: boolean) => void;
  viewIdentifier: string;
  selectedRow: RowDataTypes;
}

export default function AlertDialogSlide(props: Props) {
  const { open, handleOperation, viewIdentifier, selectedRow } = props;

  const handleClose = () => handleOperation(false);
  let Component = <span>Here you can view {viewIdentifier}</span>;
  switch (viewIdentifier) {
    case 'accounts': {
      const ViewAccounts = Components.accounts;
      const row = convertToIndividualForm(
        selectedRow as AdminFrontendIndividualViewSchema
      );
      Component = <ViewAccounts form={row} />;
      break;
    }
    case 'products': {
      const ViewProduct = Components.products;
      Component = (
        <ViewProduct
          details={selectedRow as ProductExpectedPayload}
          open={open}
        />
      );
      break;
    }
    case 'companies': {
      const ViewCompanies = Components.companies;
      Component = (
        <ViewCompanies
          formState={(selectedRow as AdminFrontendMerchantViewSchema) ?? {}}
        />
      );
      break;
    }
    case 'services': {
      const ViewServices = Components.services;
      const row = convertToServiceRow(selectedRow as ServiceRowInterface);
      Component = <ViewServices formState={row}></ViewServices>;
      break;
    }
    case 'events': {
      const ViewEvents = Components.events;
      Component = <ViewEvents formData={selectedRow as IAddEventFrontend} />;
      break;
    }
    default: {
    }
  }

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth='lg'>
      <div className={classes.EditProfileContainer}>
        <header className={classes.Header}>
          <CancelPresentationIcon
            onClick={handleClose}
            style={{ cursor: 'pointer' }}
          />
          <label>Admin View</label>
        </header>
        <div className={[classes.BodyContainer, 'ThinScrollbar'].join(' ')}>
          <React.Suspense fallback={<Spinner />}>{Component}</React.Suspense>
        </div>
      </div>
    </Dialog>
  );
}

const convertToServiceRow = (
  data: ServiceRowInterface
): ServiceRequestForm => ({
  id: data.id,
  serviceName: data.serviceName,
  serviceDuration: data.serviceDuration,
  serviceDescription: data.serviceDescription,
  serviceState: data.serviceState,
  serviceCity: data.serviceCity,
  servicePricing: data.servicePricing,
  serviceFileType: data.serviceFileType,
  serviceImageLoc: data.publicUri ?? data.serviceImageLoc,
  serviceMaxCapacity: data.serviceMaxCapacity,
  serviceLanguage: data.serviceLanguage,
  serviceGender: data.serviceGender,
  panIndia: data.panIndia,
  currency: data.currency,
  absImagePath: data.absImagePath,
});

const convertToIndividualForm = (
  data: AdminFrontendIndividualViewSchema
): FormState => ({
  fullName: data.displayName,
  email: data.email,
  phone: data.phone,
  socialMediaLink: data.socialMediaLink,
  serviceTypes: data.serviceTypes,
  achievements: data.achievements,
  specificRequests: data.specificRequests,
  professionType: data.professionType,
  state: data.state,
  city: data.city,
  workExperience: data.workExperience,
  profession: data.profession,
  categories:data.categories
});

// const convertBackToProductExpectedPayload = (
//   data: ICreateProductUser
// ): ProductExpectedPayload => ({
//   id: data.id,
//   images: data.images,
//   productCategory: data.productCategory,
//   productName: data.productName,
//   productDetails: data.productDetails,
//   productPrice: data.productPrice,
//   productCurrencyType: data.productCurrencyType,
//   discountedPrice: data.discountedPrice,
//   storageFolderRef: data.storageFolderRef,
//   openEditPrompt: data.openEditPrompt,
//   deleteData: data.deleteData,
// });
