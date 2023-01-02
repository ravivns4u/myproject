import React from 'react';

type Props = {};
export async function getStaticProps() {
  return { props: { isDark: true } };
}

export default function CustomerPage() {
  return <>
  Customer Page under Construction
  
  </>;
}
