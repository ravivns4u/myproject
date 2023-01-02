import React, { ReactElement } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import classes from './MUIExternals.module.scss';

interface NavBarProps {
  href: string;
  title: string;
}
interface Props {
  pages: NavBarProps[];
}

export default function SwapScreen({ pages }: Props): ReactElement {
  const router = useRouter();
  return (
    <React.Fragment>
      <div
        className={['rw_end', classes.SwapScreenMargin].join(' ')}
        style={{ padding: '0 0', marginBottom: '1rem' }}>
        {pages.map((page, index) => {
          const pageRef = page.href.split('/')[1];
          const routeRef = router.pathname.split('/')[1];
          /*
          page.href === router.pathname ||
                router.pathname.includes(page.href)
          */

          return (
            <Button
              key={index}
              className={
                pageRef === routeRef ? classes.ActiveRouteClass : classes.UnctiveRouteClass
              }
              onClick={() => {
                router.push(page.href);
              }}
              sx={{
                color: 'black',
                marginRight: 1,
              }}>
              {page.title}
            </Button>
          );
        })}
      </div>
    </React.Fragment>
  );
}
