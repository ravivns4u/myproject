import React, { ReactElement } from 'react';
import ForgotPassword from '../../components/Common/MUIComponents/ResetPassword/Prompt';

export async function getStaticProps() {
  return { props: { isDark: true } };
}
export default function Home(): ReactElement {
  return (
    <div className='ma-col'>
      <div className='fitVertically wrapperCentered topOffset'>
        <ForgotPassword />
      </div>
    </div>
  );
}
