import React from 'react';
import classes from './EditProfile.module.scss';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Dialog } from '@mui/material';

import UserView, { IUserAdminView } from '../../../UserViewer/UserViewer';
import CompanyView, {
  ICompanyAdminView,
} from '../../../UserViewer/CompanyViewer';
import Spinner from '../../../Spinner/Spinner';
import { IUserDetails } from '../../../../../redux/interfaces/backend/apis/commons';
import { useAppDispatch, useAppSelector } from '../../../../../redux/app/hooks';
import { updateNotification } from '../../../../../redux/slices/notifications';
import { getMiscProfileImage } from '../../../../../redux/slices/profile';

interface Props {
  handleClose?: () => void;
  open: boolean;
  viewProfileUid: string;
  firebaseToken: string;
}

const dummyUserData: IUserAdminView = {
  publicUri: '/portfolio/person.png',
  bio: 'Software Engineer at XYZ. Working with GE HealthCare from 3 years.',
  displayName: 'Chuck Norris',
  email: 'chucknorris@gmail.com',
  achievements:
    'Gamification, Machine Learning, Blockchain, Gamification, Machine Learning, Blockchain, Gamification, Machine Learning, Blockchain, Gamification, Machine Learning, Blockchain',
  state: 'Delhi',
  city: 'Delhi',
  profession: 'Software Engineer',
  isAdmin: false,
  phone: '+91-9999999999',
  serviceTypes: 'Collaboration',
  socialMediaLink: 'https://www.facebook.com/chucknorris',
  specificRequests: 'NA',
  uid: '1234567890',
  userType: 'Professionals',
  workExperience: 3,
  professionType: 'Beginner',
  languages: 'English, Hindi',
};

const dummyCompanyData: ICompanyAdminView = {
  publicUri: '/portfolio/person.png',
  bio: 'Software Engineer at XYZ. Working with GE HealthCare from 3 years.',
  displayName: 'Chuck Norris',
  email: 'chucknorris@gmail.com',
  achievements:
    'Gamification, Machine Learning, Blockchain, Gamification, Machine Learning, Blockchain, Gamification, Machine Learning, Blockchain, Gamification, Machine Learning, Blockchain',
  companyName: 'XYZ Ltd',
  companyAddress: 'XYZ 4th Street',
  tieupDetails: 'NA',
  website: 'https://www.facebook.com/chucknorris',
  isAdmin: false,
  phone: '+91-9999999999',
  socialMediaLink: 'https://www.facebook.com/chucknorris',
  specificRequests: 'NA',
  uid: '1234567890',
  userType: 'Professionals',
};
export default function EditProfile(props: Props) {
  const { open, handleClose, viewProfileUid, firebaseToken } = props;
  const [loading, setLoading] = React.useState(true);
  const [isUser, setUser] = React.useState(true);
  const [userData, setUserData] = React.useState<
    IUserAdminView | ICompanyAdminView
  >(dummyUserData);

  const dispatch = useAppDispatch();
  const { miscdp } = useAppSelector((state) => state.profile);

  React.useEffect(() => {
    if (viewProfileUid !== '') {
      fetch('/api/admin/get-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firebaseToken,
          uid: viewProfileUid,
        } as IUserDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            if (handleClose) handleClose();
            dispatch(
              updateNotification({
                message: 'Unexpected Error happened',
                status: 'error',
                show: true,
                title: 'Error Fetching Profile',
              })
            );
            return;
          } else {
            setUser(data.payload.accountType === 'Individual');
            setUserData(data.payload);
            setLoading(false);
          }
          setLoading(false);
        })
        .catch((err) => {});
    }
  }, [viewProfileUid, firebaseToken, handleClose, dispatch]);

  React.useEffect(() => {
    if (viewProfileUid !== '') {
      dispatch(getMiscProfileImage(viewProfileUid));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewProfileUid]);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='lg'>
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.EditProfileContainer}>
          <header className={classes.Header}>
            <CancelPresentationIcon
              onClick={handleClose}
              style={{ cursor: 'pointer' }}
            />
            <label>View Profile</label>
          </header>
          <div className={classes.ViewOtherBody}>
            {isUser ? (
              <UserView {...(userData as IUserAdminView)} publicUri={miscdp} />
            ) : (
              <CompanyView
                {...(userData as ICompanyAdminView)}
                publicUri={miscdp}
              />
            )}
          </div>
        </div>
      )}
    </Dialog>
  );
}
