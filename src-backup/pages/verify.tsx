import React, { ReactElement } from 'react';
import ResetPasswordWindow from '../components/Common/MUIComponents/ResetPassword/ResetPasswordWindow';
export async function getStaticProps() {
  return { props: { isDark: true } };
}
export default function SetNewPassword(): ReactElement {
  return <ResetPasswordWindow />;
}
