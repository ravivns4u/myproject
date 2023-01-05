import React, { ReactElement } from 'react';
import classes from '../LoginForm/Login.module.scss';
import ImageCarasoul from '../../ImageCarasoul/ImageCarasoul';
import { resetPasswordImagePaths } from '../../../constants/loginUiScreens';
import ResetPassword from './ResetPassword';
import VerifyEmail from './VerifyEmail';

import { useRouter } from 'next/router';
import UndefinedPage from './UnknownOperation';
export default function ResetPasswordWindow(): ReactElement {
  let RenderComponent = <UndefinedPage />;
  const router = useRouter();

  const query = router.query;

  if (query.mode === 'resetPassword') {
    RenderComponent = <ResetPassword params={query} />;
  } else if (query.mode === 'verifyEmail') {
    RenderComponent = <VerifyEmail params={query} />;
  }
  return (
    <div className={classes.LoginColumnGridS1}>
      <ImageCarasoul respondtoLogin imagePaths={resetPasswordImagePaths} />
      {RenderComponent}
    </div>
  );
}
