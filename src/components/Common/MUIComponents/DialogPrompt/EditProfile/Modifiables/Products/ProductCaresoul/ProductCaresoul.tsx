import React from 'react';
import classes from './ProductCaresoul.module.scss';
import Avatar from '@mui/material/Avatar';
import { useDropzone } from 'react-dropzone';
import WarningIcon from '@mui/icons-material/Warning';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import type { FileInterface } from '../../../../../../../../redux/interfaces/backend/apis/productPortfolio';
const images = [
  { preview: 'https://unsplash.it/800/200?image=20' },
  { preview: 'https://unsplash.it/800/200?image=11' },
  { preview: 'https://unsplash.it/800/200?image=12' },
];

interface Props {
  onFileChangeHandler: (files: FileInterface[]) => void;
  files: FileInterface[];
  onSuccessfullyFileUploaded: (value: boolean) => void;
  isAdd: boolean;
}

export default function ProductCaresoul(props: Props) {
  const { onFileChangeHandler, files, onSuccessfullyFileUploaded } = props;
  const [index, setIndex] = React.useState(0);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [uploaded, setUploaded] = React.useState(false);

  const onDrop = React.useCallback(
    (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setError(true);
        onFileChangeHandler([]);
        setIndex(0);
        if (fileRejections[0].errors[0].code === 'file-too-large') {
          setErrorMessage('File Size Must be less than 2 Megabytes.');
        } else setErrorMessage('Uploaded Files are not image files.');
      } else setError(false);
      if (acceptedFiles.length > 5) {
        setError(true);
        setErrorMessage('You can only upload 5 images at a time.');
        return;
      }
      if (acceptedFiles.length > 0) {
        const fileValues = acceptedFiles.map((file: Blob) => {
          const img = URL.createObjectURL(file);
          return {
            file: file,
            preview: img,
          };
        });
        onFileChangeHandler([...fileValues]);
        setIndex(0);
        setError(false);
        setErrorMessage('');
        setUploaded(true);
        onSuccessfullyFileUploaded(true);
      }
    },
    [onFileChangeHandler, onSuccessfullyFileUploaded]
  );
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    maxSize: 2000000, //2MB
    accept: ['image/*'],
    onDrop,
  });
  return (
    <div className={classes.ProductCaresoul}>
      <div className={classes.ProductCaresoul_Image}>
        {error ? (
          <div className={classes.ErrorBox} {...getRootProps()}>
            <WarningIcon className={classes.ErrorIcon} />
            <label className={classes.ErrorMessage}>{errorMessage}</label>
          </div>
        ) : files !== undefined && !files.length ? (
          <div className={classes.InfoBox} {...getRootProps()}>
            <CloudUploadIcon className={classes.InfoIcon} />
            <label className={classes.InfoMessage}>
              Click or Drag and Drop to add Images
            </label>
          </div>
        ) : (
          <Avatar
            className={classes.SquareAvatar}
            variant={'square'}
            alt={'Portfolio'}
            src={files?.[index]?.preview ?? '/loading.png'}
            {...getRootProps()}
          />
        )}
        <input {...getInputProps()} />

        {!error && files.length > 0 && (
          <React.Fragment>
            <div
              className={classes.ProductCaresoul_Image_left}
              onClick={() =>
                setIndex(index <= 0 ? files.length - 1 : index - 1)
              }>
              {'<'}
            </div>
            <div
              className={classes.ProductCaresoul_Image_right}
              onClick={() =>
                setIndex(index >= files.length - 1 ? 0 : index + 1)
              }>
              {'>'}
            </div>
          </React.Fragment>
        )}
      </div>

      <div className={classes.NavigationItem}>
        {!error &&
          files.length > 0 &&
          Array(files.length)
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
