import React, { ReactElement } from 'react';
import auth from '../firebase/firebase_client';
import {
  User,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { frontendRoutes } from '../components/constants/frontend-routes';
import Link from 'next/link';
import { useAppDispatch } from '../redux/app/hooks';
import { updateNotification } from '../redux/slices/notifications';
import { useRouter } from 'next/router';
export async function getStaticProps() {
  return { props: { isDark: true } };
}

export default function SignupSuccess(): ReactElement {
  const [user, setUser] = React.useState<User | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      let email;
      if (user !== null) {
        setUser(user);
        email = user.email;
        console.log(user);
        if (isSignInWithEmailLink(auth, window.location.href)) {
        }
      } else {
        email = window.prompt('Please provide your email for confirmation');
      }
      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            const user = result.user.displayName;
            dispatch(
              updateNotification({
                message: `Congrats ${
                  user || 'User'
                }. Your Email has been verified.`,
                status: 'success',
                title: 'Verification Success',
              })
            );
          })
          .catch((error) => {
            console.log(
              'Error occured while verifying: ' + error.code,
              error.message
            );
            console.log('Error = ', error);
            dispatch(
              updateNotification({
                message: `Verification Failed. Common errors could be invalid email and invalid or expired OTPs.`,
                status: 'error',
                title: 'Verification Failed',
              })
            );
          });
      } else {
        dispatch(
          updateNotification({
            message: 'Verification Failed as no email was provided',
            status: 'error',
            title: 'Verification Failed',
          })
        );
        setTimeout(() => router.push('/'), 3000);
      }
    });
  }, [dispatch, router]);

  return <div>This URL has been moved.</div>;
}
