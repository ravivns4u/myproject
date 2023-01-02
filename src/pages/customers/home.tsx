import React, { ReactElement } from 'react';
export async function getStaticProps() {
  return { props: { isDark: true } };
}
export default function Home(): ReactElement {
  return (
    <div className='MiddleAlign'>
      <h1 className='NormalHeadingForInstruction'>
        Customer Page is Under Construction
      </h1>
    </div>
  );
}
