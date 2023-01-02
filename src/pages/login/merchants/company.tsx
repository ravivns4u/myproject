import React, { ReactElement } from 'react';
import LoginForm from '../../../components/Common/MUIComponents/LoginForm/Vibe/Individual';
import { companyLoginImagePaths } from '../../../components/constants/loginUiScreens';
import { useAppSelector, useAppDispatch } from '../../../redux/app/hooks';
import { useRouter } from 'next/router';
import { onAuthStateChanged, User } from 'firebase/auth';
import Client from '../../../firebase/firebase_client_exports';
import { getUserDetails, resetUserState } from '../../../redux/slices/user';

import { updateNotification, hideNotification } from '../../../redux/slices/notifications';

export async function getStaticProps() {
  return { props: { isDark: true } };
}
export default function Home(): ReactElement {
  const [fbUser, setFbUser] = React.useState<User | null>(null);
  const { isLoggedIn, merchantSlug, adminApproved, emailVerified, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [mounted, setMounted] = React.useState(true);
  React.useEffect(() => {
    if (fbUser && isLoggedIn && merchantSlug && user) {
      if (!adminApproved || !emailVerified) {
        router.push('/merchants/');
      } else if (user.ndaSigned === true) {
        router.push(`/merchants/${merchantSlug}/portfolio/images`);
      } else {
        router.push(`/merchants/${merchantSlug}/subscription`);
      }
    }
    if (!fbUser) {
      dispatch(resetUserState());
    }
  }, [isLoggedIn, merchantSlug, adminApproved, emailVerified, router, fbUser, user, dispatch]);

  React.useEffect(() => {
    return () => setMounted(false);
  }, []);

  React.useEffect(() => {
    const subcribe = onAuthStateChanged(Client.auth, (user) => {
      dispatch(
        updateNotification({
          message: 'Please Wait...',
          show: true,
          status: 'pending',
          title: 'Processing',
        })
      );
      if (user !== null) {
        if (mounted) setFbUser(user);
        user.getIdToken().then((token) => {
          // if(isLoggedIn) {
            dispatch(getUserDetails({ firebaseToken: token }));
          // }
          
        });
      } else {
        dispatch(hideNotification());
      }
    });
    return subcribe()
  }, [dispatch, mounted]);
  return (
    <div className='ma-col'>
      <div className='fitVertically wrapperCentered topOffset paddingsection'>
        <LoginForm imagePaths={companyLoginImagePaths} />
      </div>
    </div>
  );
}
