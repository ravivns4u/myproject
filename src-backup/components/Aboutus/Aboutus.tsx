import React, { ReactElement } from 'react';
import AboutusPage from './AboutusRenditionComplete';
export default function Aboutus(): ReactElement {
  if (typeof window !== 'undefined') console.log(window.innerWidth, process.env);
  return <AboutusPage />;
}
