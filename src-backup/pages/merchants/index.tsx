import React, { ReactElement } from 'react';
import { useAppSelector } from '../../redux/app/hooks';
import { useRouter } from 'next/router';
export async function getStaticProps() {
  return { props: { isDark: true } };
}
export default function Merchants(): ReactElement {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const router = useRouter();
  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login/merchants/individuals');
    }
  }, [router, isLoggedIn]);
  return (
     <div
      style={{
        position: 'absolute',
        left: '20%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      Either your account is pending Approval from Admin or you haven&rsquo;t
      yet verified your mail address.
    </div>
  );
}
