import React, { ReactElement } from 'react';
import ResourcesPage from './ResourcesRenditionComplete';
export default function Resources(): ReactElement {
  if (typeof window !== 'undefined') console.log(window.innerWidth, process.env);
  return <ResourcesPage />;
}
