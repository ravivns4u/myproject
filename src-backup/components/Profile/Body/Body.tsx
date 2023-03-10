import React, { ReactElement } from 'react';
import classes from './Body.module.scss';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '../../../redux/app/hooks';
import { approveEvents, approveProducts } from '../../../redux/slices/profile';
import type { PortFolioRoutes } from '../../../redux/interfaces/frontend/user';
import type {
  DeletePointer,
  DeletePointer1,
  DeletePointerService,
  DeleteProductPointer,
} from '../../../redux/interfaces/backend/apis/deleteInterfaces';
import type { EditDataForm } from '../../../redux/interfaces/backend/apis';
import { RowDataTypes } from './Admin/Schema';
import AdminViewPrompt from './Admin/AdminView/ViewPrompt';
import ApproveView from './Admin/AdminView/ApproveView';
import {
  approveServices,
  approveAccounts,
  getProfileImage,
} from '../../../redux/slices/profile';
import ViewUser from '../../Common/MUIComponents/DialogPrompt/EditProfile/ViewOtherProfile';
import PortfolioComponent from './SubModules/Portfolio';
import FeedComponent from './SubModules/Feed';
import CmsComponent from './SubModules/Cms';
import { sections } from './SubModules/constants/comparitors';
import ServicesPortfolio from './SubModules/Services/ServicesModule';
import EventsSection from './SubModules/Events/EventsSection';
import ProductsSection from './SubModules/Products/ProductSection';
import OrderRequestSection from './SubModules/OrderRequests/OrderRequests';
import SubscriptionSection from './SubModules/Subscription/Subscription';
import AdminDashboard from './SubModules/AdminDashboard/AdminDashboard';
import PaymentSection from './SubModules/Payment/Payment';
import Terms from './SubModules/Terms/Terms';
import SubscriptionModule from './SubModules/Subscription-Module/Subscription-Module';
import MerchantNda from './SubModules/Merchant-Nda/Merchant-Nda';

export async function getStaticProps() {
  return { props: { isDark: true } };
}



const returnPathTemplate = (userSlug: string, injector: string) =>
  `/merchants/${userSlug}${injector}`;

const actionButtons = [
  {
    header: 'Portfolio',
    comparitor: 'portfolio',
    showAddNew: true,
    buttonText: 'Portfolio',
    availableOptions: [
      {
        comparitor: 'images',
        buttonTitle: 'Image',
        href: (userId: string) =>
          returnPathTemplate(userId, '/portfolio/images'),
      },
      {
        comparitor: 'videos',
        buttonTitle: 'Videos',

        href: (userId: string) =>
          returnPathTemplate(userId, '/portfolio/videos'),
      },
    ],
  },
  {
    header: 'Feeds',
    comparitor: 'feed',
    showAddNew: true,
    buttonText: 'Feed',
    availableOptions: [
      {
        comparitor: 'images',
        buttonTitle: 'Image',
        href: (userId: string) =>
          returnPathTemplate(userId, '/feed/images'),
      },
      {
        comparitor: 'videos',
        buttonTitle: 'Videos',

        href: (userId: string) =>
          returnPathTemplate(userId, '/feed/videos'),
      },
      {
        comparitor: 'text',
        buttonTitle: 'Text',

        href: (userId: string) =>
          returnPathTemplate(userId, '/feed/text'),
      },
    ],
  },
  {
    header: 'Cms',
    comparitor: 'cms',
    showAddNew: true,
    buttonText: 'cms',
    availableOptions: [
      {
        comparitor: 'images',
        buttonTitle: 'Image',
        href: (userId: string) =>
          returnPathTemplate(userId, '/cms/images'),
      },
      {
        comparitor: 'videos',
        buttonTitle: 'Videos',

        href: (userId: string) =>
          returnPathTemplate(userId, '/cms/videos'),
      },
      {
        comparitor: 'text',
        buttonTitle: 'Text',

        href: (userId: string) =>
          returnPathTemplate(userId, '/cms/text'),
      },
    ],
  },
  {
    header: 'Services',
    comparitor: 'services',
    showAddNew: true,
    buttonText: 'Service',
    availableOptions: [
      {
        buttonTitle: 'Approved',
        comparitor: 'verified',
        href: (userId: string) =>
          returnPathTemplate(userId, '/services/verified'),
      },
      {
        buttonTitle: 'Awaiting',
        comparitor: 'pending',
        href: (userId: string) =>
          returnPathTemplate(userId, '/services/pending'),
      },
      {
        buttonTitle: 'Rejected',
        comparitor: 'rejected',
        href: (userId: string) =>
          returnPathTemplate(userId, '/services/rejected'),
      },
    ],
  },
  {
    header: 'Events',
    comparitor: 'events',
    showAddNew: true,
    buttonText: 'Event',
    availableOptions: [
      {
        buttonTitle: 'Approved',
        comparitor: 'verified',
        href: (userId: string) =>
          returnPathTemplate(userId, '/events/verified'),
      },
      {
        buttonTitle: 'Awaiting',
        comparitor: 'pending',
        href: (userId: string) => returnPathTemplate(userId, '/events/pending'),
      },
      {
        buttonTitle: 'Rejected',
        comparitor: 'rejected',
        href: (userId: string) =>
          returnPathTemplate(userId, '/events/rejected'),
      },
    ],
  },
  {
    header: 'Products',
    comparitor: 'products',
    showAddNew: true,
    buttonText: 'Product',
    availableOptions: [
      {
        buttonTitle: 'Approved',
        comparitor: 'verified',
        href: (userId: string) =>
          returnPathTemplate(userId, '/products/verified'),
      },
      {
        buttonTitle: 'Awaiting',
        comparitor: 'pending',
        href: (userId: string) =>
          returnPathTemplate(userId, '/products/pending'),
      },
      {
        buttonTitle: 'Rejected',
        comparitor: 'rejected',
        href: (userId: string) =>
          returnPathTemplate(userId, '/products/rejected'),
      },
    ],
  },
  {
    header: 'Order Requests',
    comparitor: 'order-requests',
    showAddNew: false,
    availableOptions: [
      {
        buttonTitle: 'Events',
        comparitor: 'events',
        href: (userId: string) =>
          returnPathTemplate(userId, '/order-requests/events'),
      },
      {
        buttonTitle: 'Services',
        comparitor: 'services',
        href: (userId: string) =>
          returnPathTemplate(userId, '/order-requests/services'),
      },
      {
        buttonTitle: 'Products',
        comparitor: 'products',
        href: (userId: string) =>
          returnPathTemplate(userId, '/order-requests/products'),
      },
    ],
  },
  {
    header: 'Subscription',
    comparitor: 'subscription',
    showAddNew: false,
    availableOptions: [
      
    ],
  },
  {
    header: '',
    comparitor: 'payment',
    showAddNew: false,
    availableOptions: [
      
    ],
  },
  {
    header: 'Terms & Conditions',
    comparitor: 'terms',
    showAddNew: false,
    availableOptions: [
      
    ],
  },
  {
    header: 'Subscription Module',
    comparitor: 'subscription-module',
    showAddNew: false,
    availableOptions: [
      
    ],
  },
  {
    header: 'Merchant Nda',
    comparitor: 'merchant-nda',
    showAddNew: false,
    availableOptions: [
      
    ],
  },
  {
    header: 'Admin Dashboard',
    comparitor: 'admin-dashboard',
    showAddNew: false,
    availableOptions: [
      {
        buttonTitle: 'Individuals',
        comparitor: 'accounts',
        href: (userId: string) =>
          returnPathTemplate(userId, '/admin-dashboard/accounts'),
      },
      {
        buttonTitle: 'Companies',
        comparitor: 'companies',
        href: (userId: string) =>
          returnPathTemplate(userId, '/admin-dashboard/companies'),
      },
      {
        buttonTitle: 'Events',
        comparitor: 'events',
        href: (userId: string) =>
          returnPathTemplate(userId, '/admin-dashboard/events'),
      },
      {
        buttonTitle: 'Services',
        comparitor: 'services',
        href: (userId: string) =>
          returnPathTemplate(userId, '/admin-dashboard/services'),
      },
      {
        buttonTitle: 'Products',
        comparitor: 'products',
        href: (userId: string) =>
          returnPathTemplate(userId, '/admin-dashboard/products'),
      },
      {
        buttonTitle: 'Urgent Requests',
        comparitor: 'urgent-requests',
        href: (userId: string) =>
          returnPathTemplate(userId, '/admin-dashboard/urgent-requests'),
      },
    ],
  },
];

export type DeleteDataTypes =
  | DeletePointer
  | DeletePointer1
  | DeleteProductPointer
  | DeleteEventType
  | DeletePointerService;

export interface ImagePortfolioRow {
  id: string | number;
  image: string;
  portfolio: string;
  description: string;
  action: string;
  fp: string;
  fullPath: string;
  fileName: string;
  openEditPrompt: (data: EditDataForm) => void;
  deleteData: (data: DeleteDataTypes, product?: boolean) => void;
  generation: string;
  uid: string;
}
export type DeleteEventType = string | number;
interface Props {
  handleOpen: (editString: 'edit' | 'add', data: EditDataForm) => void;
  deleteData: (
    data: DeleteDataTypes,
    product?: boolean,
    event?: boolean,
    service?: boolean
  )
  => void;
   deleteData1: (
    data: DeleteDataTypes,
    product?: boolean,
    event?: boolean,
    service?: boolean
  )
  => void;
}

export default function Body(props: Props): ReactElement {
  const { handleOpen, deleteData,deleteData1 } = props;
  const router = useRouter();
  const query = router.query;
  const pageRoute = query.merchantSlug?.[1] ?? ('portfolio' as PortFolioRoutes);
  const pageSection = query.merchantSlug?.[2] ?? 'images';
  const dispatch = useAppDispatch();
  const {
    profile: { dp },
    user: { isLoggedIn, firebaseToken, isAdmin, uid },
  } = useAppSelector((state) => state);

  const openEditPrompt = React.useCallback(
    (data: EditDataForm) => {
      handleOpen('edit', data);
    },
    [handleOpen]
  );
  const [rowHeight, setRowHeight] = React.useState<number | undefined>(120);
  const [pageSize, setPageSize] = React.useState(4);
  const [adminView, setAdminView] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [rowView, setRowView] = React.useState<RowDataTypes>(
    {} as RowDataTypes
  );
  const [viewOtherProfile, setViewOtherProfile] = React.useState(false);
  const [activeRowIds, setActiveRowIds] = React.useState([] as string[]);
  const [activeRowEmail, setActiveRowEmail] = React.useState(null);
  const [approveOpen, setApproveOpen] = React.useState(false);
  const [accept, setAccept] = React.useState(false);
  const [adminConfig, setAdminConfig] = React.useState({
    approveAll: false,
    rejectAll: false,
    viewRejected: true,
  });
  const [viewProfileUid, setViewProfileUid] = React.useState('');

  const openAdminView = (data: RowDataTypes) => {
    setRowView(data);
    setAdminView(true);
  };

  const handleProfileView = (open: boolean, uid: string) => {
    setAdminView(false);
    setApproveOpen(false);
    setViewOtherProfile(open);
    setViewProfileUid(uid);
  };

  const openApprovePrompt = React.useCallback((approve: boolean) => {
    setApproveOpen(true);
    setAccept(approve);
  }, []);

  const onApproval = () => {
    setApproveOpen(false);
    if (
      (pageSection === 'accounts' || pageSection === 'companies') &&
      pageRoute === 'admin-dashboard' &&
      isLoggedIn &&
      isAdmin
    ) {
      dispatch(
        approveAccounts({
          firebaseToken,
          isIndividual: pageSection === 'accounts',
          inVerified: accept,
          uids: activeRowIds,
          viewRejected: adminConfig.viewRejected,
          email:activeRowEmail,
        })
      );
    } else if (pageSection === 'events' && pageRoute === 'admin-dashboard') {
      dispatch(
        approveEvents({
          eventLocation: activeRowIds[0],
          firebaseToken,
          inVerified: accept,
        })
      );
    } else if (pageSection === 'products' && pageRoute === 'admin-dashboard') {
      dispatch(
        approveProducts({
          productLocations: activeRowIds[0],
          firebaseToken,
          inVerified: accept,
        })
      );
    } else if (pageSection === 'services' && pageRoute === 'admin-dashboard') {
      dispatch(
        approveServices({
          eventLocations: activeRowIds,
          firebaseToken,
          inVerified: accept,
        })
      );
    } else alert('Yet to be configured');
  };

  const { merchantSlug } = query as { merchantSlug: string[] };
  let activeComponent = actionButtons[0];
  if (query.merchantSlug && query.merchantSlug.length > 0) {
    const activeValue = actionButtons.find(
      (button) => button.comparitor === merchantSlug[1]
    );
    if (activeValue) {
      activeComponent = {
        ...activeValue,
        availableOptions: [...activeValue.availableOptions],
      };
    }
  }
  const { availableOptions } = activeComponent;

  React.useEffect(() => {
    setPageNumber(0);
  }, [pageSection]);

  React.useEffect(() => {
    if (isLoggedIn) {
      if (dp === '') dispatch(getProfileImage(uid));
    }
  }, [isLoggedIn, dp, dispatch, uid]);

  React.useEffect(() => {
    if (pageRoute === 'admin-dashboard') {
      if (isLoggedIn && !isAdmin) {
        router.push('/login/merchants/individuals');
      }
    }
  }, [pageRoute, isLoggedIn, router, isAdmin]);

  let RenderComponent = <div>Undefined Component</div>;

  switch (pageRoute) {
    case sections.PORTFOLIO: {
      RenderComponent = (
        <PortfolioComponent
          navbarProps={{
            merchantSlug,
            availableOptions,
            activeComponent,
            handleOpen,
          }}
          externalDataTable={{
            pageSize,
            rowHeight,
            pageNumber,
            setPageNumber,
            setActiveRowIds,
            setActiveRowEmail
          }}
          openEditPrompt={openEditPrompt}
          deleteData={deleteData}
        />
      );
      break;
    }
	case sections.FEED: {
      RenderComponent = (
        <FeedComponent
          navbarProps={{
            merchantSlug,
            availableOptions,
            activeComponent,
            handleOpen,
          }}
          externalDataTable={{
            pageSize,
            rowHeight,
            pageNumber,
            setPageNumber,
            setActiveRowIds,
            setActiveRowEmail
          }}
          openEditPrompt={openEditPrompt}
          deleteData={deleteData}
          deleteData1={deleteData1}


        />
      );
      break;
    }
    case sections.CMS: {
      RenderComponent = (
        <CmsComponent
          navbarProps={{
            merchantSlug,
            availableOptions,
            activeComponent,
            handleOpen,
          }}
          externalDataTable={{
            pageSize,
            rowHeight,
            pageNumber,
            setPageNumber,
            setActiveRowIds,
            setActiveRowEmail
          }}
          openEditPrompt={openEditPrompt}
          deleteData={deleteData}
          deleteData1={deleteData1}


        />
      );
      break;
    }
    case sections.SERVICES: {
      RenderComponent = (
        <ServicesPortfolio
          navbarProps={{
            merchantSlug,
            availableOptions,
            activeComponent,
            handleOpen,
          }}
          externalDataTable={{
            pageSize,
            rowHeight,
            pageNumber,
            setPageNumber,
            setActiveRowIds,
            setActiveRowEmail
          }}
          openEditPrompt={openEditPrompt}
          deleteData={deleteData}
          handleProfileView={handleProfileView}
        />
      );
      break;
    }
    case sections.EVENTS: {
      RenderComponent = (
        <EventsSection
          navbarProps={{
            merchantSlug,
            availableOptions,
            activeComponent,
            handleOpen,
          }}
          externalDataTable={{
            pageSize,
            rowHeight,
            pageNumber,
            setPageNumber,
            setActiveRowIds,
            setActiveRowEmail
          }}
          openEditPrompt={openEditPrompt}
          deleteData={deleteData}
        />
      );
      break;
    }
    case sections.PRODUCTS: {
      RenderComponent = (
        <ProductsSection
          navbarProps={{
            merchantSlug,
            availableOptions,
            activeComponent,
            handleOpen,
          }}
          externalDataTable={{
            pageSize,
            rowHeight,
            pageNumber,
            setPageNumber,
            setActiveRowIds,
            setActiveRowEmail
          }}
          openEditPrompt={openEditPrompt}
          deleteData={deleteData}
        />
      );
      break;
    }
    case sections.ORDER_REQUESTS: {
      RenderComponent = (
        <OrderRequestSection
          navbarProps={{
            merchantSlug,
            availableOptions,
            activeComponent,
            handleOpen,
          }}
          externalDataTable={{
            pageSize,
            rowHeight,
            pageNumber,
            setPageNumber,
            setActiveRowIds,
            setActiveRowEmail
          }}
        />
      );
      break;
    }
	case sections.SUBSCRIPTION: {
      RenderComponent = (
        <SubscriptionSection
          navbarProps={{
            merchantSlug,
            availableOptions,
            activeComponent,
            handleOpen,
          }}
          externalDataTable={{
            pageSize,
            rowHeight,
            pageNumber,
            setPageNumber,
            setActiveRowIds,
            setActiveRowEmail
          }}
        />
      );
      break;
    }
    case sections.PAYMENTS: {
      RenderComponent = (
        <PaymentSection
        />
      );
      break;
    }
    case sections.TERMS: {
      RenderComponent = (
        <Terms
        />
      );
      break;
    }
    case sections.SUBCRIPTIONMODULE: {
      RenderComponent = (
        <SubscriptionModule
        />
      );
      break;
    }
    case sections.MERCHANTNDA: {
      RenderComponent = (
        <MerchantNda
        />
      );
      break;
    }
    case sections.ADMIN_DASHBOARD: {
      RenderComponent = (
        <AdminDashboard
          navbarProps={{
            merchantSlug,
            availableOptions,
            activeComponent,
            handleOpen,
          }}
          externalDataTable={{
            pageSize,
            rowHeight,
            pageNumber,
            setPageNumber,
            setActiveRowIds,
            setActiveRowEmail,
          }}
          openAdminView={openAdminView}
          openApprovePrompt={openApprovePrompt}
          handleProfileView={handleProfileView}
        />
      );
      break;
    }
  }
  return (   
      <div className={classes.BodyContainer}>
      <h1 className={classes.NameHeader}>{activeComponent.header}</h1>
      {RenderComponent}
      <AdminViewPrompt
        open={adminView}
        handleOperation={setAdminView}
        viewIdentifier={pageSection}
        selectedRow={rowView}
      />
      <ApproveView
        open={approveOpen}
        setOpen={setApproveOpen}
        approveUser={onApproval}
        approve={accept}
      />
      <ViewUser
        open={viewOtherProfile}
        handleClose={() => setViewOtherProfile(false)}
        viewProfileUid={viewProfileUid}
        firebaseToken={firebaseToken}
      />
    </div>
  );
}

//https://stackoverflow.com/questions/64331095/how-to-add-a-button-to-every-row-in-mui-datagrid
//https://stackoverflow.com/questions/67273351/how-to-set-row-data-when-clicking-button-inside-the-row-material-ui-datagrid?rq=1
