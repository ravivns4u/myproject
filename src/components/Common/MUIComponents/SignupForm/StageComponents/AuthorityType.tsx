import React, { ReactElement } from 'react';
import classes from './StagesComponents.module.scss';
import Avatar from '@mui/material/Avatar';

interface Props {
  setIndividual: (value: boolean) => void;
  isIndividual: boolean;
}

export default function AuthorityType({
  setIndividual,
  isIndividual,
}: Props): ReactElement {
  return (
    <React.Fragment>
      <div className={classes.RowElement}>
        <div className='cw fxc'>
          <div className={classes.AvatarWrapper}>
            <Avatar
              variant={'rounded'}
              className={[
                classes.AvatarConfig,
                isIndividual
                  ? classes.AvtarCfg_active
                  : classes.AvtarCfg_inactive,
              ].join(' ')}
              onClick={() => setIndividual(true)}
              src={'/signup/form/individual.svg'}
              alt='break-free logo'
              classes={{ img: classes.AvatarConfig }}
              style={{ objectFit: 'fill' }}
            />
          </div>
          <h3 className={classes.Title}>Individual</h3>
        </div>

        <div className='cw fxc'>
          <div className={classes.AvatarWrapper}>
            <Avatar
              variant={'rounded'}
              className={[
                classes.AvatarConfig,
                !isIndividual
                  ? classes.AvtarCfg_active
                  : classes.AvtarCfg_inactive,
              ].join(' ')}
              onClick={() => setIndividual(false)}
              src={'/signup/form/company.svg'}
              alt='break-free logo'
              classes={{ img: classes.AvatarConfig }}
              style={{ objectFit: 'fill' }}
            />
          </div>
          <h3 className={classes.Title}>Organisation</h3>
        </div>
      </div>
    </React.Fragment>
  );
}
