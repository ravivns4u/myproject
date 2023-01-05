import React from 'react';
import NavHead, { INavHeaderProps } from '../Common/NavHead/NavHead';
import { IDataTableStatic } from '../Common/DataTable/DataTable';
import { DeleteDataTypes } from '../../Body';
import { EditDataForm } from '../../../../../redux/interfaces/backend/apis';
import { useRouter } from 'next/router';
import { comparitors } from '../constants/comparitors';
import { RowDataTypes } from '../../Admin/Schema';
import AdminAccounts from './Tables/Accounts/AdminAccounts';
import AdminCompanies from './Tables/Companies/AdminCompanies';
import AdminEvents from './Tables/Events/AdminEvents';
import AdminProducts from './Tables/AdminProducts/AdminProducts';
import AdminServices from './Tables/Services/AdminServices';
import AdminUrgentRequest from './Tables/UrgentRequests/AdminUrgentRequests';

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

interface IUtilityAdminFunctions {
  openAdminView: (data: RowDataTypes) => void;
  openApprovePrompt: (approve: boolean) => void;
  handleProfileView: (open: boolean, uid: string) => void;
}
export type IAdminDashboardProps = {
  navbarProps: INavHeaderProps;
  externalDataTable: IDataTableStatic;
} & IUtilityAdminFunctions;

export type ICommonAdminTableProps = {
  externalDataTable: IDataTableStatic;
} & IUtilityAdminFunctions;

export default function AdminDashboard(props: IAdminDashboardProps) {
  const {
    navbarProps,
    externalDataTable,
    openAdminView,
    handleProfileView,
    openApprovePrompt,
  } = props;

  const passProps: ICommonAdminTableProps = {
    externalDataTable,
    openAdminView,
    handleProfileView,
    openApprovePrompt,
  };

  const router = useRouter();
  const pageSection = router.query.merchantSlug?.[2] ?? comparitors.ACCOUNTS;

  let Component = <div>Undefined Component</div>;
  switch (pageSection) {
    case comparitors.ACCOUNTS: {
      Component = <AdminAccounts {...passProps} />;
      break;
    }
    case comparitors.COMPANIES: {
      Component = <AdminCompanies {...passProps} />;
      break;
    }
    case comparitors.EVENTS: {
      Component = <AdminEvents {...passProps} />;
      break;
    }
    case comparitors.PRODUCTS: {
      Component = <AdminProducts {...passProps} />;
      break;
    }
    case comparitors.SERVICES: {
      Component = <AdminServices {...passProps} />;
      break;
    }
    case comparitors.URGENT_REQUESTS: {
      Component = <AdminUrgentRequest {...passProps} />;
      break;
    }
     case comparitors.CMS: {
      Component = <AdminCompanies {...passProps} />;
      break;
    }
  }

  return (
    <React.Fragment>
      <NavHead {...navbarProps} />
      {Component}
    </React.Fragment>
  );
}
