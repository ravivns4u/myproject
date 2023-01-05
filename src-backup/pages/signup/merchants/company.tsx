import React, { ReactElement } from 'react';
import LoginForm from '../../../components/Common/MUIComponents/SignupForm/Vibe/Company';

export async function getStaticProps() {
  return { props: { isDark: true } };
}

export default function Home(): ReactElement {
  return (
    <div className='ma-col'>
      <div className='fitVertically wrapperCentered topOffset paddingsection'>
        <LoginForm />
      </div>
    </div>
  );
}
 