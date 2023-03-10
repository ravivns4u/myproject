import React from 'react';
import { useRouter } from "next/router";

import classes from './EditProfile.module.scss';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import ModfiablePortfolio from './Modifiables/Portfolio';
import EditablePortfolio from './Modifiables/EditExisting';
import ModfiableFeed from './Modifiables/Feed';
import FeedText from './Modifiables/FeedText'
import EditableFeed from './Modifiables/EditExisting1';
import EditExistingFedText from './Modifiables/EditExistingFedText'
import { ImagePortfolioData } from '../../../../../redux/interfaces/backend/apis/ImagePortfolio';
import { ImageFeedData,CaptionFeedData } from '../../../../../redux/interfaces/backend/apis/ImageFeed';
import AddService from './Modifiables/AddService';
import AddEvent from './Modifiables/AddEvent';
import EditEvent from './Modifiables/EditEvent';
import ModifyService from './Modifiables/EditService';
import AddProduct from './Modifiables/Products/ProductsAddForm/AddProduct';
import type {
  EditDataForm,
  IMetaData,
} from '../../../../../redux/interfaces/backend/apis/';
import type { ServiceRequestForm } from '../../../../../redux/interfaces/backend/apis/servicePortfolio';
import { ProductExpectedPayload } from '../../../../../redux/interfaces/backend/apis/productPortfolio';
import { IAddEventFrontend } from '../../../../../redux/interfaces/backend/apis/v2/events';

const operations = {
  'portfolio': 'Portfolio',
  'feed': 'Feed',
  'services': 'Services',
  'events': 'Events',
  'products': 'Products',
  'cms': 'Cms',
  'order-requests': 'Order Requests',
};
export type IdentifierType = keyof typeof operations;
export type SubIdentifierType =
  | 'images'
  | 'videos'
  | 'awaiting'
  | 'aproved'
  | 'rejected';
interface Props {
  handleClose?: () => void;
  triggerChanges: () => void;
  isAdd: boolean;
  identifier: IdentifierType;
  subIdentifier: SubIdentifierType;
  editPromptData: EditDataForm;
  metadata: IMetaData;
  open: boolean;
}

export default function EditProfile(props: Props) {
  const {
    handleClose,
    isAdd,
    identifier,
    editPromptData,
    triggerChanges,
    subIdentifier,
    metadata,
    open,
  } = props;
  
  const triggerCloseAfterChanges = () => {
    triggerChanges();
    if (handleClose) handleClose();
  };
  let Component: JSX.Element | null = null;
  const router = useRouter();


  switch (identifier) {
    case 'portfolio': {
      Component = isAdd ? (
        <ModfiablePortfolio
          metadata={metadata}
          triggerChanges={triggerCloseAfterChanges}
        />
      ) : (
        <EditablePortfolio
          {...(editPromptData as ImagePortfolioData)}
          triggerChanges={triggerCloseAfterChanges}
        />
      );
      break;
    }
	case 'feed':

  {router.asPath.includes("/feed/text") ?
  Component = isAdd ? (
    <FeedText
      metadata={metadata}
      triggerChanges={triggerCloseAfterChanges}
    />
  )
  
   : 
  (
    <EditExistingFedText
        {...(editPromptData as ImageFeedData)}
        triggerChanges={triggerCloseAfterChanges} />
  )

   :   Component = isAdd ? (
        <ModfiableFeed
          metadata={metadata}
          triggerChanges={triggerCloseAfterChanges}
        />
      ) : (
        <EditableFeed
        
          {...(editPromptData as ImageFeedData)}
          triggerChanges={triggerCloseAfterChanges}
        />
      );
      break;
    }
    case 'services': {
      Component = isAdd ? (
        <AddService
          metadata={metadata}
          formCloseHandler={handleClose}
          triggerChanges={triggerCloseAfterChanges}
          identifier={identifier}
          subidentifier={subIdentifier}
          open={open}
        />
      ) : (
        <ModifyService
          formCloseHandler={handleClose}
          formState={editPromptData as ServiceRequestForm}
          triggerChanges={triggerCloseAfterChanges}
          identifier={identifier}
          subidentifier={subIdentifier}
          metadata={metadata}
          open={open}
        />
      );
      break;
    }
    case 'events': {
      Component = isAdd ? (
        <AddEvent
          // metadata={metadata}
          formCloseHandler={handleClose}
          open={open}
          triggerChanges={triggerCloseAfterChanges}
          // identifier={identifier}
          // subidentifier={subIdentifier}
        />
      ) : (
        <EditEvent
          formCloseHandler={handleClose}
          initialEventForm={editPromptData as IAddEventFrontend}
          open={open}
          triggerChanges={triggerCloseAfterChanges}
          // identifier={identifier}
          // subidentifier={subIdentifier}
          // metadata={metadata}
        />
      );
      break;
    }
    case 'products': {
      Component = (
        <AddProduct
          isAdd={isAdd}
          details={editPromptData as ProductExpectedPayload}
          metadata={metadata}
          triggerChanges={triggerCloseAfterChanges}
          formCloseHandler={handleClose}
          open={open}
        />
      );
      break;
    }
    default: {
    }
  }

  return (
    <div className={classes.EditProfileContainer}>
      <header className={classes.Header}>
        <CancelPresentationIcon
          onClick={handleClose}
          style={{ cursor: 'pointer' }}
        />
        <label>
          {isAdd ? 'Add ' : 'Edit '} {operations[identifier]}
        </label>
      </header>
      <div className={[classes.BodyContainer, classes.ThinScrollbar].join(' ')}>
        {Component}
      </div>
    </div>
  );
}
