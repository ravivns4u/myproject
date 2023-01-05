import type {
  PortfolioInterface,
  PortfolioInterface1,
  FeedInterface,
  FeedInterface1,
  PortfolioState,
  ServiceInterface,
  EventsInterface,
  ProductsInterface,
} from '../interfaces';
export const profileState: PortfolioState = {
  portfolios: {
    images: [],
    imageStart: 0,
    imageEnd: 30,
  } as PortfolioInterface,
  feeds: {
    images: [],
    imageStart: 0,
    imageEnd: 30,
  } as FeedInterface,

  portfolios1: {
    caption: [],
    imageStart: 0,
    imageEnd: 30,
  } as PortfolioInterface1,
  feeds1: {
    caption: [],
    imageStart: 0,
    imageEnd: 30,
  } as FeedInterface1,

  services: {
    servicesPending: [],
    servicesApproved: [],
    servicesRejected: [],
  } as ServiceInterface,
  events: {
    eventsPending: [],
    eventsApproved: [],
    eventsRejected: [],
  } as EventsInterface,
  products: {
    productsPending: [],
    productsApproved: [],
    productsRejected: [],
    startIndex: 0,
    endIndex: 30,
  } as ProductsInterface,
  admin: {
    accounts: [],
    companies: [],
    adminevents: [],
    adminProducts: [],
    adminServices: [],
    fetches: {
      accounts: {
        pending: false,
        rejected: false,
      },
      companies: {
        pending: false,
        rejected: false,
      },
    },
  },
  dp: '',
  miscdp: '',
  fetched: false,
};
