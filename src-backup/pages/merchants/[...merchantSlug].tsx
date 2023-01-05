import React, { ReactElement } from 'react';
import Profile from '../../components/Profile/Skeleton';
import { onAuthStateChanged, User } from 'firebase/auth';
import Client from './../../firebase/firebase_client_exports';
import { useAppDispatch } from '../../redux/app/hooks';

import { getUserDetails } from '../../redux/slices/user';
import { useRouter } from 'next/router';

export async function getServerSideProps() {
  return { props: { isDark: true } };
}


export default function MerchantSpecific(): ReactElement {


  const dispatch = useAppDispatch();
  const router = useRouter();
  React.useEffect(() => {
   const subcribe = onAuthStateChanged(Client.auth, (user) => {
      if (user !== null) {
        user.getIdToken().then((token) => {
          dispatch(getUserDetails({ firebaseToken: token }));
        });
      } else {
        router.push('/login/merchants/individuals');
      }
    });
    return subcribe()
  }, [dispatch,router]);
  return (
    <React.Fragment>
      <Profile />
    </React.Fragment>
  );
}
