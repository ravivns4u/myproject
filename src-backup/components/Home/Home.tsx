import React, { ReactElement } from 'react';
import HomePage from './HomeRenditionComplete';

export default function Home(): ReactElement {
  if (typeof window !== 'undefined') console.log("home:");
  return <HomePage />;
}
