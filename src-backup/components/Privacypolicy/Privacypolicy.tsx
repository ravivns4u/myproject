import React, { ReactElement } from 'react';
import PrivacypolicyPage from './PrivacypolicyRenditionComplete';
export default function Privacypolicy(): ReactElement {
  if (typeof window !== 'undefined') console.log(window.innerWidth, process.env);
  return <PrivacypolicyPage />;
}
