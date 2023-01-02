import React, { ReactElement } from 'react';
import TermsandconditionsPage from './TermsandconditionsRenditionComplete';
export default function Termsandconditions(): ReactElement {
  if (typeof window !== 'undefined') console.log(window.innerWidth, process.env);
  return <TermsandconditionsPage />;
}
