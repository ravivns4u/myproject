import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { profileState } from '../initials';
import { PortfolioState } from '../interfaces';
import { updateNotification } from './notifications';
import type { ResponseParams } from '../../redux/interfaces/backend/apiHandlers';
import { updateLoading } from './signup';
import {
  IUserApproveEvents,
  IAccountDetails,
  IMarkAccounts,
} from '../interfaces/backend/apis/commons';
import { ImagePortfolio } from '../interfaces/backend/apis/ImagePortfolio';
import { ImageFeed } from '../interfaces/backend/apis/ImageFeed';
import { Caption } from '../interfaces/backend/apis/ImageFeed';

import {
  ServiceRequestForm,
  ServicePortfolio,
} from '../interfaces/backend/apis/servicePortfolio';
import {
  ProductPortfolioData,
  ProductFireStoreSchema,
} from '../interfaces/backend/apis/productPortfolio';
import {
  NewUserMerchantMetaData,
  NewUserProfessionalMetaData,
} from '../interfaces/backend/firestore';
import {
  EventsInterface,
  ServiceInterface,
  ProductsInterface,
} from '../interfaces/redux/profile';
import Client from '../../firebase/firebase_client_exports';
import { IAdminEvents } from '../interfaces/frontend/profile';
import { IGetProducts, IGetService } from '../interfaces/backend/apis/services';
import { ref, getDownloadURL } from 'firebase/storage';
import { AppState } from '../app/store';
import { GetUserEventRequestPayload } from '../../pages/api/v2/user-profile/events/get-events-user';
import { IAddEventFrontend } from '../interfaces/backend/apis/v2/events';
import { IAdminEventPayload } from '../../pages/api/v2/admin/events/get-events';
import { IAdminEventApprovePayload } from '../../pages/api/v2/admin/events/mark-events';
import { IProductOpsGet } from '../../pages/api/v2/user-profile/products/product-user-get';
import { ICreateProductUser } from '../interfaces/backend/apis/v2/products/product.interfaces';
import { IAdminProductMarkPayload } from '../../pages/api/v2/admin/products/mark-products';
import { comparitors } from '../../components/Profile/Body/SubModules/constants/comparitors';
interface PortfolioTablePayload {
  startPoint: number;
  endPoint: number;
  firebaseToken: string;
}

interface FeedTablePayload {
  startPoint?: number;
  endPoint?: number;
  firebaseToken: string;
}
interface FeedTablePayload1 {
  startPoint: number;
  endPoint: number;
  firebaseToken: string;
}

const endAtIndex = 5;

export const getUserAndImagePortfolio = createAsyncThunk(
  'profile/getImagePortfolio',
  async (payload: PortfolioTablePayload, { dispatch }) => {
    dispatch(updateLoading({ loading: true }));
    const response = await fetch('/api/user-profile/image-portfolios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    try {
      const data = (await response.json()) as ResponseParams;
      if (data.error) {
        dispatch(
          updateNotification({
            message:
              'Unexpected Error Happened! Either refresh the page or contact the administrator.',
            show: true,
            status: 'error',
            title: 'Failed to get User Profile.',
          })
        );
        dispatch(updateLoading({ loading: false }));
        return;
      } else {
        const payload = data.payload.portfolios as ImagePortfolio[];
        dispatch(
          updateImages({
            portfolios: payload,
          })
        );
        dispatch(updateLoading({ loading: false }));
        return;
      }
    } catch (error) {
      dispatch(
        updateNotification({
          message:
            'Unexpected Error Happened! Either refresh the page or contact the administrator.',
          show: true,
          status: 'error',
          title: 'Failed to get User Profile.',
        })
      );
      dispatch(updateLoading({ loading: false }));
      return;
    }
  }
);



export const getUserAndImageFeed = createAsyncThunk(
  'profile/getImageFeed',
  async (payload: FeedTablePayload, { dispatch }) => {
    dispatch(updateLoading({ loading: true }));
    const response = await fetch('/api/user-profile/image-feeds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    try {
      const data = (await response.json()) as ResponseParams;
      if (data.error) {
        dispatch(
          updateNotification({
            message:
              'Unexpected Error Happened! Either refresh the page or contact the administrator.',
            show: true,
            status: 'error',
            title: 'Failed to get User Profile.',
          })
        );
        dispatch(updateLoading({ loading: false }));
        return;
      } else {
        const payload = data.payload.feeds as ImageFeed[];
        dispatch(
          updateFeeds({
            feeds: payload,
          })
        );
        dispatch(updateLoading({ loading: false }));
        return;
      }
    } catch (error) {
      dispatch(
        updateNotification({
          message:
            'Unexpected Error Happened! Either refresh the page or contact the administrator.',
          show: true,
          status: 'error',
          title: 'Failed to get User Profile.',
        })
      );
      dispatch(updateLoading({ loading: false }));
      return;
    }
  }
);

export const getUserAndImageFeed1 = createAsyncThunk(
  'profile/getImageFeed1',
  async (payload: FeedTablePayload, { dispatch }) => {
 
    dispatch(updateLoading({ loading: true }));
    const response = await fetch('/api/feed/get-caption', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    try {
      
      const data = await (response.json()) as ResponseParams;
      if (data.error) {
        dispatch(
          updateNotification({
            message:
              'Unexpected Error Happened! Either refresh the page or contact the administrator.',
            show: true,
            status: 'error',
            title: 'Failed to get User Profile.',
          })
        );
        dispatch(updateLoading({ loading: false }));
        return;
      } 
      else {
        const payload1 = data?.payload?.caption as Caption[];
        dispatch(
          updateFeeds1({
            feeds1: payload1,
          })
        );
        dispatch(updateLoading({ loading: false }));
        return;
        }
    }
   
    catch (error) {
      dispatch(
        updateNotification({
          message:
            'Unexpected Error Happened! Either refresh the page or contact the administrator.',
          show: true,
          status: 'error',
          title: 'Failed to get User Profile.',
        })
      );
      dispatch(updateLoading({ loading: false }));
      return;
    }
  }
);

export const getUserServices = createAsyncThunk(
  'profile/getUserServices',
  async (args: IGetService, { dispatch }) => {
    dispatch(updateFetching(true));
    const services = await fetch('/api/services/get-services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    const rp = await services.json();
    const { error, payload } = await rp;
    dispatch(updateFetching(false));
    if (error) {
      dispatch(
        updateNotification({
          message:
            'Unexpected Error Happened! Either refresh the page or contact the administrator.',
          show: true,
          status: 'error',
          title: 'Failed to get User Profile.',
        })
      );
    } else {
      const serviceStatus =
        args.serviceStatus === comparitors.PENDING
          ? 'servicesPending'
          : args.serviceStatus === comparitors.VERIFIED
          ? 'servicesApproved'
          : 'servicesRejected';
      const eventsStatus =
        args.serviceStatus === comparitors.PENDING
          ? 'eventsPending'
          : args.serviceStatus === comparitors.VERIFIED
          ? 'eventsApproved'
          : 'eventsRejected';
      if (args.isEvent)
        dispatch(updateEvents({ result: payload, route: eventsStatus }));
      else dispatch(updateServices({ result: payload, route: serviceStatus }));
    }
  }
);
export const getUserProducts = createAsyncThunk(
  'profile/getUserProducts',
  async (args: IProductOpsGet, { dispatch }) => {
    dispatch(updateFetching(true));
    const res = await fetch('/api/v2/user-profile/products/product-user-get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    const value = await res.json();
    dispatch(updateFetching(false));
    if (value.error) {
      dispatch(
        updateNotification({
          message:
            'Unexpected Error Happened! Either refresh the page or contact the administrator.',
          show: true,
          status: 'error',
          title: 'Failed to get User Profile.',
        })
      );
    } else {
      const {
        payload: { data },
      } = value;
      const route =
        args.serviceStatus === comparitors.VERIFIED
          ? 'productsApproved'
          : args.serviceStatus === comparitors.REJECTED
          ? 'productsRejected'
          : 'productsPending';
      dispatch(updateProducts({ result: data, route: route }));
    }
  }
);

export const getAccountsAdminData = createAsyncThunk(
  'profile/getAccountsAdminData',
  async (args: IAccountDetails, { dispatch }) => {
    dispatch(updateFetching(true));
    const response = await fetch('/api/admin/get-accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    const { error, payload } = await response.json();
    dispatch(updateFetching(false));
    if (error) {
      dispatch(
        updateNotification({
          message:
            'Unexpected Error Happened! Either refresh the page or contact the administrator.',
          show: true,
          status: 'error',
          title: 'Failed to Get Accounts',
        })
      );
      return;
    } else {
      if (args.isIndividual) dispatch(updateAdminApprovalAccounts(payload));
      else dispatch(updateAdminApprovalCompanies(payload));
    }
  }
);

export const approveAccounts = createAsyncThunk(
  'profile/approveAdminAccounts',
  async (
    args: IMarkAccounts & { isIndividual: boolean; viewRejected: boolean } & {email:any},
    { dispatch }
  ) => {
    dispatch(updateFetching(true));
    const response = await fetch('/api/admin/mark-accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    const { error, payload } = await response.json();
    dispatch(updateFetching(false));
    if (error || !payload) {
      dispatch(
        updateNotification({
          message:
            'Unexpected Error Happened! Either refresh the page or contact the administrator.',
          show: true,
          status: 'error',
          title: 'Failed to Get Accounts',
        })
      );
      return;
    } else {
        const res = await fetch("/api/send-grid/send-mail-grid", {
            body: JSON.stringify({
                firebaseToken:args?.firebaseToken,
                payload: {to:args?.email.toString()},
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });

        const { error } = await res.json();
        if(error){
            dispatch(
                updateNotification({
                    message:
                        'Unable to Send Verification Mail! Either refresh the page or contact the administrator.',
                    show: true,
                    status: 'error',
                    title: 'Failed to Send Verification Mail',
                })
            );
        }
      dispatch(
        getAccountsAdminData({
          firebaseToken: args.firebaseToken,
          inVerified: args.viewRejected,
          isIndividual: args.isIndividual,
          startWith: 0,
          endAt: endAtIndex,
        })
      );
    }
  }
);

export const approveEvents = createAsyncThunk(
  'profile/approveEvents',
  async (
    args: {
      inVerified: boolean;
      firebaseToken: string;
      eventLocation: string;
    },
    { dispatch }
  ) => {
    dispatch(
      updateNotification({
        message: 'Please wait while we process the request.',
        show: true,
        status: comparitors.PENDING,
        title: 'Updating Events',
      })
    );

    dispatch(updateFetching(true));

    const approveEventPayload: IAdminEventApprovePayload = {
      firebaseToken: args.firebaseToken,
      inVerified: args.inVerified,
      location: args.eventLocation,
    };
    const response = await fetch('/api/v2/admin/events/mark-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(approveEventPayload),
    });
    const { error } = await response.json();
    dispatch(updateFetching(false));
    if (error) {
      dispatch(
        updateNotification({
          message: 'Error Occured',
          show: true,
          status: 'error',
          title: 'Failed to Approve Events',
        })
      );
    } else {
      dispatch(
        getAdminEventsData({
          firebaseToken: args.firebaseToken,
          eventType: comparitors.PENDING, //Currently only pending
          //supported but can support multiple too:
          //args.inVerified ? 'pending' : comparitors.REJECTED,
          startWith: 0,
          endAt: endAtIndex,
        })
      );
      dispatch(
        updateNotification({
          message: `Successfully  ${
            args.inVerified ? 'approved' : comparitors.REJECTED
          } Events!`,
          show: true,
          status: 'success',
          title: `Successfully ${
            args.inVerified ? 'approved' : comparitors.REJECTED
          } events.`,
        })
      );
    }
  }
);

export const approveServices = createAsyncThunk(
  'profile/approveServices',
  async (
    args: {
      inVerified: boolean;
      firebaseToken: string;
      eventLocations: string[];
    },
    { dispatch }
  ) => {
    dispatch(
      updateNotification({
        message: 'Please wait while we process the request.',
        show: true,
        status: comparitors.PENDING,
        title: 'Updating Events',
      })
    );

    dispatch(updateFetching(true));

    const approveEventPayload: IUserApproveEvents = {
      firebaseToken: args.firebaseToken,
      inVerified: args.inVerified,
      eventLocations: args.eventLocations,
    };
    const response = await fetch('/api/admin/mark-services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(approveEventPayload),
    });
    const { error } = await response.json();
    dispatch(updateFetching(false));

    if (error) {
      dispatch(
        updateNotification({
          message: 'Error Occured',
          show: true,
          status: 'error',
          title: 'Failed to Approve Events',
        })
      );
    } else {
      dispatch(
        getServicesAdminData({
          firebaseToken: args.firebaseToken,
          eventType: comparitors.PENDING, // to alter between views: args.inVerified ? 'pending' : comparitors.REJECTED,
          startWith: 0,
          endAt: endAtIndex,
        })
      );
      dispatch(
        updateNotification({
          message: `Successfully  ${
            args.inVerified ? 'approved' : comparitors.REJECTED
          } Services!`,
          show: true,
          status: 'success',
          title: `Successfully ${
            args.inVerified ? 'approved' : comparitors.REJECTED
          } Services.`,
        })
      );
    }
  }
);

export const approveProducts = createAsyncThunk(
  'profile/approveProducts',
  async (
    args: {
      inVerified: boolean;
      firebaseToken: string;
      productLocations: string;
    },
    { dispatch }
  ) => {
    dispatch(
      updateNotification({
        message: 'Please wait while we process the request.',
        show: true,
        status: comparitors.PENDING,
        title: 'Updating Events',
      })
    );

    dispatch(updateFetching(true));

    const approveEventPayload: IAdminProductMarkPayload = {
      firebaseToken: args.firebaseToken,
      inVerified: args.inVerified,
      productId: args.productLocations,
    };
    const response = await fetch('/api/v2/admin/products/mark-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(approveEventPayload),
    });
    const { error } = await response.json();
    dispatch(updateFetching(false));
    if (error) {
      dispatch(
        updateNotification({
          message: 'Error Occured',
          show: true,
          status: 'error',
          title: 'Failed to Approve Events',
        })
      );
    } else {
      dispatch(
        getProductsAdminData({
          firebaseToken: args.firebaseToken,
          eventType: comparitors.PENDING, //args.inVerified ? 'pending' : comparitors.REJECTED,
          startWith: 0,
          endAt: endAtIndex,
        })
      );
      dispatch(
        updateNotification({
          message: `Successfully  ${
            args.inVerified ? 'approved' : comparitors.REJECTED
          } Products!`,
          show: true,
          status: 'success',
          title: `Successfully ${
            args.inVerified ? 'approved' : comparitors.REJECTED
          } products.`,
        })
      );
    }
  }
);

export const getAdminEventsData = createAsyncThunk(
  'profile/getAdminEventsData',
  async (args: IAdminEventPayload, { dispatch }) => {
    dispatch(updateFetching(true));
    const response = await fetch('/api/v2/admin/events/get-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    const { error, payload } = await response.json();
    dispatch(updateFetching(false));
    if (error) {
      dispatch(
        updateNotification({
          show: true,
          status: 'error',
          title: 'Error Fetching Data',
          message:
            'Unexpected Error Happened! Either refresh the page or contact the administrator.',
        })
      );
      return;
    } else {
      dispatch(updateAdminApprovalEvents(payload as IAddEventFrontend[]));
      return;
    }
  }
);
export const getProductsAdminData = createAsyncThunk(
  'profile/getProductsAdminData',
  async (args: IAdminEvents, { dispatch }) => {
    dispatch(updateFetching(true));
    const response = await fetch('/api/v2/admin/products/get-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    const { error, payload } = await response.json();
    dispatch(updateFetching(false));
    if (error) {
      console.log('Error occured: ', error);
      dispatch(
        updateNotification({
          show: true,
          status: 'error',
          title: 'Error Fetching Data',
          message:
            'Unexpected Error Occured while fetching data. Contact Admin.',
        })
      );
      return;
    } else {
      dispatch(updateAdminApprovalProducts(payload));
      return;
    }
  }
);

export const getServicesAdminData = createAsyncThunk(
  'profile/getServicesAdminData',
  async (args: IAdminEvents, { dispatch }) => {
    dispatch(updateFetching(true));
    const response = await fetch('/api/admin/get-services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    const { error, payload } = await response.json();
    dispatch(updateFetching(false));
    if (error) {
      dispatch(
        updateNotification({
          show: true,
          status: 'error',
          title: 'Error Fetching Data',
          message:
            'Unexpected Error Happened! Either refresh the page or contact the administrator.',
        })
      );
      return;
    } else {
      dispatch(updateAdminApprovalServices(payload));
      return;
    }
  }
);

export const getProfileImage = createAsyncThunk(
  'profile/getProfileImage',
  async (uid: string, { dispatch, getState }) => {
    const {
      user: { isLoggedIn },
    } = getState() as AppState;
    const response = await fetch('/api/portfolio/get-profile-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: uid }),
    });

    console.log("response profile.ts", response)
    const { error, payload } = await response.json();
    console.log("payload profile.ts", payload)
    if (error && isLoggedIn) {
      dispatch(updateDp(''));
      // dispatch(
      //   updateNotification({
      //     message: 'Failed to load Profile Image',
      //     show: true,
      //     status: 'error',
      //     title: 'Error Fetching Image',
      //   })
      // );
    } else {
      getDownloadURL(ref(Client.storage, payload))
        .then((url) => {
          console.log("URL",url)
          dispatch(updateDp(url));
          return;
        })
        .catch((error) => {
          dispatch(updateDp(''));
          console.log('Error = ', error);
          if (isLoggedIn)
            dispatch(
              updateNotification({
                message: 'Failed to load Profile Image',
                show: true,
                status: 'error',
                title: 'Error Fetching Image',
              })
            );
        });
    }
  }
);

export const getMiscProfileImage = createAsyncThunk(
  'profile/getMiscProfileImage',
  async (uid: string, { dispatch, getState }) => {
    const {
      user: { isLoggedIn },
    } = getState() as AppState;
    const response = await fetch('/api/portfolio/get-profile-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: uid }),
    });
    const { error, payload } = await response.json();
    if (error && isLoggedIn) {
      dispatch(
        updateNotification({
          message: 'Failed to load Profile Image',
          show: true,
          status: 'error',
          title: 'Error Fetching Image',
        })
      );
    } else {
      getDownloadURL(ref(Client.storage, payload))
        .then((url) => {
          dispatch(updateMiscDp(url));
          return;
        })
        .catch((error) => {
          console.log('Error = ', error);
          if (isLoggedIn)
            dispatch(
              updateNotification({
                message: 'Failed to load Profile Image',
                show: true,
                status: 'error',
                title: 'Error Fetching Image',
              })
            );
        });
    }
    dispatch(updateMiscDp(''));
  }
);

export const getEventsUserData = createAsyncThunk(
  'profile/getUserEvents',
  async (args: GetUserEventRequestPayload, { dispatch }) => {
    const dispatchUpdateNotifications = (
      error: any,
      msg: string = 'Failed to load Events'
    ) => {
      dispatch(
        updateNotification({
          message: msg,
          show: true,
          status: 'error',
          title: 'Error Fetching Events',
        })
      );
      console.log('Error = ', error);
      dispatch(updateFetching(false));
    };
    dispatch(updateFetching(true));
    fetch('/api/v2/user-profile/events/get-events-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    })
      .then((data) =>
        data
          .json()
          .then((data: ResponseParams) => {
            if (data.error) {
              dispatchUpdateNotifications(data, data.msg);
            } else {
              const payload = data.payload as IAddEventFrontend[];
              let location = 'eventsPending' as keyof EventsInterface;
              if (args.location === comparitors.VERIFIED) {
                location = 'eventsApproved' as keyof EventsInterface;
              } else if (args.location === comparitors.REJECTED) {
                location = 'eventsRejected' as keyof EventsInterface;
              }
              dispatch(updateEvents({ result: payload, route: location }));
              dispatch(updateFetching(false));
            }
          })
          .catch((error) =>
            dispatchUpdateNotifications(error, 'Error Parsing JSON Data')
          )
      )
      .catch((error) => dispatchUpdateNotifications(error));
  }
);

export const userProfile = createSlice({
  name: 'userPortfolio',
  initialState: profileState as PortfolioState,
  reducers: {
    updateImages: (
      state: PortfolioState,
      action: PayloadAction<{ portfolios: ImagePortfolio[] }>
    ) => {
      const { portfolios } = action.payload;
      state.portfolios.images = portfolios;
    },
	updateFeeds: (
      state: PortfolioState,
      action: PayloadAction<{ feeds: ImageFeed[] }>
    ) => {
      const { feeds } = action.payload;
      state.feeds.images = feeds;
    },
    updateFeeds1: (
      state: PortfolioState,
      action: PayloadAction<{ feeds1: Caption[] }>
    ) => {
      const { feeds1 } = action.payload;
      state.feeds1.caption = feeds1;
    },
    updateServices: (
      state: PortfolioState,
      action: PayloadAction<{
        result: ServiceRequestForm[];
        route: keyof ServiceInterface;
      }>
    ) => {
      const { result, route } = action.payload;
      state.services[route] = result;
    },
    updateEvents: (
      state: PortfolioState,
      action: PayloadAction<{
        result: IAddEventFrontend[];
        route: keyof EventsInterface;
      }>
    ) => {
      const { result, route } = action.payload;
      state.events[route] = result;
    },
    updateProducts: (
      state: PortfolioState,
      action: PayloadAction<{
        result: ICreateProductUser[];
        route: keyof ProductsInterface;
      }>
    ) => {
      const { result, route } = action.payload;
      state.products[route] = result;
    },
    updateFetching: (state: PortfolioState, action: PayloadAction<boolean>) => {
      state.fetched = action.payload;
    },
    updateAdminApprovalAccounts: (
      state: PortfolioState,
      action: PayloadAction<NewUserProfessionalMetaData[]>
    ) => {
      state.admin.accounts = action.payload;
      state.admin.adminevents = [];
      state.admin.adminProducts = [];
      state.admin.adminServices = [];
      state.admin.companies = [];
    },
    updateAdminApprovalCompanies: (
      state: PortfolioState,
      action: PayloadAction<NewUserMerchantMetaData[]>
    ) => {
      state.admin.companies = action.payload;
      state.admin.accounts = [];
      state.admin.adminevents = [];
      state.admin.adminProducts = [];
      state.admin.adminServices = [];
    },
    updateAdminApprovalEvents: (
      state: PortfolioState,
      action: PayloadAction<IAddEventFrontend[]>
    ) => {
      const { payload } = action;
      state.admin.adminevents = payload;
      state.admin.adminProducts = [];
      state.admin.adminServices = [];
      state.admin.accounts = [];
      state.admin.companies = [];
    },
    updateAdminApprovalProducts: (
      state: PortfolioState,
      action: PayloadAction<ICreateProductUser[]>
    ) => {
      const { payload } = action;
      state.admin.adminProducts = payload;
      state.admin.adminevents = [];
      state.admin.adminServices = [];
    },
    updateAdminApprovalServices: (
      state: PortfolioState,
      action: PayloadAction<ServicePortfolio[]>
    ) => {
      const { payload } = action;
      state.admin.adminServices = payload;
      state.admin.adminProducts = [];
      state.admin.adminevents = [];
    },
    updateDp: (state: PortfolioState, action: PayloadAction<string>) => {
      state.dp = action.payload;
    },
    updateMiscDp: (state: PortfolioState, action: PayloadAction<string>) => {
      state.miscdp = action.payload;
    },
    resetProfileState: () => profileState,
  },

  extraReducers: () => {},
});

export const {
  resetProfileState,
  updateDp,
  updateMiscDp,
  updateEvents,
  updateImages,
  updateFeeds,
  updateFeeds1,
  updateProducts,
  updateServices,
  updateFetching,
  updateAdminApprovalEvents,
  updateAdminApprovalServices,
  updateAdminApprovalProducts,
  updateAdminApprovalAccounts,
  updateAdminApprovalCompanies,
} = userProfile.actions;
export default userProfile.reducer;

/*

Playing Around with Users:
  https://firebase.google.com/docs/auth/admin/manage-users#update_a_user

*/
