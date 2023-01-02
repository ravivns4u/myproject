import React, { ReactElement } from 'react';
import SignupForm from '../../components/Common/MUIComponents/SignupForm/SignupForm';
interface Props {}

export async function getStaticProps() {
  return { props: { isDark: true } };
}

export default function MerchantsSignup({}: Props): ReactElement {
  return <SignupForm />;
}
