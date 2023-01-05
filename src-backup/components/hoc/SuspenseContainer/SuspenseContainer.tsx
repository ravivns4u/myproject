import Spinner from '../../Common/Spinner/Spinner';

import React from 'react';

type Props = {
  children: JSX.Element;
};

export default function SuspenseContainer({ children }: Props) {
  return <React.Suspense fallback={<Spinner />}>{children}</React.Suspense>;
}
