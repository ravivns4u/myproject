import React from 'react';
import classes from './EditProfile.module.scss';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../../../Profile/Sidebar/Sidebar';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Button, DialogContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ref, uploadBytes } from 'firebase/storage';
import Client from '../../../../../firebase/firebase_client_exports';
import FormIndividual from './EditFormIndividual';
import FormCompany from './EditFormCompany';
import { useAppSelector, useAppDispatch } from '../../../../../redux/app/hooks';
import type { CombinedUserCompanySchema } from '../../../../../redux/interfaces/frontend/user';
import { useDropzone } from 'react-dropzone';
import { IUploadImage } from '../../../../../pages/api/portfolio/upload-profile-image';
import Spinner from '../../../Spinner/Spinner';
import { getProfileImage } from '../../../../../redux/slices/profile';
interface Props {
  displayName: string;
  photoURL: string;
  handleClose?: () => void;
  open: boolean;
  scroll:string;
}

export default function EditProfile(props: Props) {
  const { displayName, handleClose, open } = props;
  const {
    user: { user, uid, firebaseToken },
    profile: { dp },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [error, setError] = React.useState(false);
  const [fileUploaded, setFileUploaded] = React.useState(false);
  const [fileUploadedToBackend, setFileUploadedToBackend] = React.useState(false);
  const [backendError, setBackendError] = React.useState(false);

  React.useEffect(() => {
    if (open) setFile({ ...file, preview: dp });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dp]);

  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState({
    file: null,
    preview: dp ?? '/portfolio/person.png',
  });
  const onDrop = React.useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      setError(true);
    } else setError(false);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      setFile({
        file: file,
        preview: URL.createObjectURL(file),
      });
      setFileUploaded(true);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 2000000, //10MB
    accept: ['image/*'],
    onDrop,
  });

  const onImageUpload = () => {
    console.log('onclick');
    if (loading) {
      return;
    }
    setLoading(true);
    if (file.file !== null && user) {
      const { type, name } = file.file as { type: string; name: string };
      const fullPath = `db-dev/user-metadata/portfolio/profile-pictures/${uid}__${name}`;
      const storageRef = ref(Client.storage, fullPath);
      uploadBytes(storageRef, file.file, {
        contentType: type,
      }).then(() => {
        const payload: IUploadImage = {
          uid,
          imageStorageLoc: fullPath,
          firebaseToken,
        };
        fetch('/api/portfolio/upload-profile-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            response
              .json()
              .then((data) => {
                if (open) {
                  if (data.error) {
                    setLoading(false);
                    setBackendError(true);
                    setTimeout(() => setBackendError(false), 3000);
                    return;
                  } else {
                    setLoading(false);
                    setFileUploadedToBackend(true);
                    dispatch(getProfileImage(uid));
                    if (handleClose) handleClose();
                  }
                }
              })
              .catch((error) => {
                console.log('Error = ', error);
                if (open) {
                  setLoading(false);
                  setBackendError(true);
                  setTimeout(() => setBackendError(false), 3000);
                  return;
                }
              });
          })
          .catch((error) => {
            console.log('Error = ', error);
            if (open) {
              setLoading(false);
              setBackendError(true);
              setTimeout(() => setBackendError(false), 3000);
              return;
            }
          });
      });
    }
  };

  return (
    <div className={classes.EditProfileContainer}>
      <header className={classes.Header}>
        <CancelPresentationIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        <label>Edit Profile</label>
      </header>
      <DialogContent dividers={props?.scroll === 'paper'} className={classes.RestOfTheBody}>
        <div className={classes.ImageColumn}>
          {loading ? (
            <Spinner />
          ) : (
            <Avatar
              className={classes.CircularAvatar}
              alt={displayName}
              src={file.preview}
              {...stringAvatar(displayName || 'Guest')}
            />
          )}
          <br />
          <div className={classes.ButtonGroup}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button startIcon={<EditIcon />} className='ThemeButtonYellow'>
                Edit
              </Button>
            </div>
            {!error && fileUploaded && (
              <Button startIcon={<FileUploadIcon />} onClick={onImageUpload} className='ThemeButtonYellow'>
                Upload
              </Button>
            )}
          </div>
          {error && (
            <label className={['error-red', classes.errorLabel].join(' ')}>Must be an image file (2 MBs max)</label>
          )}
          {fileUploadedToBackend && (
            <label className={['success-green', classes.errorLabel].join(' ')}>Image Updated Successfully</label>
          )}
          {backendError && (
            <label className={['error-red', classes.errorLabel].join(' ')}>
              Failed to upload file Please try again!
            </label>
          )}
        </div>
        {user?.accountType === 'Individual' ? (
          <FormIndividual user={user} closeModal={handleClose} />
        ) : (
          <FormCompany user={user ? user : ({} as CombinedUserCompanySchema)} closeModal={handleClose} />
        )}
      </DialogContent>
    </div>
  );
}
