import React, { ReactElement } from 'react';
import styles from './ResetPassword.module.scss';
import { applyActionCode } from 'firebase/auth';
import Client from '../../../../firebase/firebase_client_exports';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../../redux/app/hooks';
import { updateNotification } from '../../../../redux/slices/notifications';
import Spinner from '../../Spinner/Spinner';

interface Props {
  params: any;
}

export default function ResetPassword(props: Props): ReactElement {
  const { params } = props;
  const router = useRouter();
  const { oobCode } = params;
  const [emailVerified, setEmailVerified] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (oobCode) {
      applyActionCode(Client.auth, oobCode)
        .then(() => {
          dispatch(
            updateNotification({
              message:
                'Your email has been verified. You may go back and login.',
              show: true,
              status: 'success',
              title: 'Email Verified',
            })
          );
          setEmailVerified(true);
          router.push('/login/merchants/individuals');
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
          dispatch(
            updateNotification({
              message: 'Failed to verify Email: ' + error.message,
              show: true,
              status: 'error',
              title: 'Failed to Verify Email',
            })
          );
          setEmailVerified(false);
          setLoading(false);
        });
    }
  }, [oobCode, dispatch, router]);

  return isLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <div
        className={[
          styles.CustomLoginColumn,
          styles.CustomLoginColumn_gaps,
        ].join(' ')}>
        {emailVerified ? (
          <label className='success-green'>Your Email has been verified</label>
        ) : (
          <label className='error-red'>Failed to verify Email</label>
        )}
      </div>
    </React.Fragment>
  );
}
