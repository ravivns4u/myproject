import React, { ReactElement } from 'react';
import classes from './Spineer.module.scss';
interface Props {}

export default function Spinner(): ReactElement {
  return <div className={classes.loader}>Loading...</div>;
}
