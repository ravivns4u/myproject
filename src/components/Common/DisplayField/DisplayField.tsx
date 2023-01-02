import React from 'react';
import classes from './DisplayFIeld.module.scss';
type Props = {
  label: string;
  value: string;
};

export default function DisplayField({ label, value }: Props) {
  return (
    <div className={classes.DisplayBox}>
      <label className={classes.DisplayLabel}>{label ?? 'Name'}:</label>
      <label className={classes.DisplayValue}>{value ?? 'Adam Noris'}</label>
    </div>
  );
}
