import { lazy } from 'react';
const ViewProducts = lazy(
  () =>
    import(
      '../../../../../Common/MUIComponents/DialogPrompt/EditProfile/Modifiables/Products/ProductsAddForm/ViewProduct'
    )
);

const ViewIndividuals = lazy(() => import('../UserViewer/IndividualViewer'));
const ViewCompanies = lazy(() => import('../UserViewer/CompanyViewer'));
const ViewServices = lazy(
  () =>
    import(
      '../../../../../Common/MUIComponents/DialogPrompt/EditProfile/Modifiables/ViewService'
    )
);
const ViewEvents = lazy(
  () =>
    import(
      '../../../../../Common/MUIComponents/DialogPrompt/EditProfile/Modifiables/ViewEvent'
    )
);
export const Components = {
  products: ViewProducts,
  services: ViewServices,
  accounts: ViewIndividuals,
  companies: ViewCompanies,
  events: ViewEvents,
};
