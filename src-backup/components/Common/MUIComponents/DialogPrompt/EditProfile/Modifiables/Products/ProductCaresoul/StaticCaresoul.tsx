import React from 'react';
import classes from './ProductCaresoul.module.scss';
import Avatar from '@mui/material/Avatar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import type { FileInterface } from '../../../../../../../../redux/interfaces/backend/apis/productPortfolio';

interface Props {
  files: FileInterface[];
}

export default function ProductCaresoul(props: Props) {
  const { files } = props;
  const [index, setIndex] = React.useState(0);
  return (
    <div className={classes.ProductCaresoul}>
      <div className={classes.ProductCaresoul_Image}>
        {files === undefined || !files.length ? (
          <div className={classes.InfoBox}>
            <CloudUploadIcon className={classes.InfoIcon} />
            <label className={classes.InfoMessage}>No Image Files</label>
          </div>
        ) : (
          <Avatar
            className={classes.SquareAvatar}
            variant={'square'}
            alt={'Portfolio'}
            src={files?.[index]?.preview ?? '/loading.png'}
          />
        )}
        <React.Fragment>
          <div
            className={classes.ProductCaresoul_Image_left}
            onClick={() => setIndex(index <= 0 ? files.length - 1 : index - 1)}>
            {'<'}
          </div>
          <div
            className={classes.ProductCaresoul_Image_right}
            onClick={() => setIndex(index >= files.length - 1 ? 0 : index + 1)}>
            {'>'}
          </div>
        </React.Fragment>
      </div>
      <div className={classes.NavigationItem}>
        {files === undefined
          ? null
          : Array(files.length)
              .fill(0)
              .map((_, i) => (
                <div
                  key={'nav-prod-' + i}
                  className={
                    index === i
                      ? classes.NavigationItem_Active
                      : classes.NavigationItem_Passive
                  }></div>
              ))}
      </div>
    </div>
  );
}
