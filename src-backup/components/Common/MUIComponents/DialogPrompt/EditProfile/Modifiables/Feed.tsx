import React, { useCallback } from 'react';
import classes from './Modifiables.module.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import Client from '../../../../../../firebase/firebase_client_exports';
import { ref, uploadBytes } from 'firebase/storage';
import Spinner from '../../../../Spinner/Spinner';
import Grid from '@mui/material/Grid';
import { useAppSelector, useAppDispatch } from '../../../../../../redux/app/hooks';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserDetails } from '../../../../../../redux/slices/user';
import { getUserAndImageFeed } from '../../../../../../redux/slices/profile';

import type { ReqPayload, ImageFeedData } from '../../../../../../redux/interfaces/backend/apis/ImageFeed';
import { IMetaData } from '../../../../../../redux/interfaces/backend/apis';

interface Props {
  triggerChanges: () => void;
  metadata: IMetaData;
}
export default function Feed(props: Props) {
  const { triggerChanges, metadata } = props;
  const [description, setDescription] = React.useState('');
  const [error, setError] = React.useState(false);
  const [file, setFile] = React.useState<any>({ preview: '/loading.png' });
  const [fileUploaded, setFileUploaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState('Uploading...');
  const [uploaded, setUploaded] = React.useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [uploadError, setUploadError] = React.useState(false);
  const [fileError, setFileError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const { uid, firebaseToken } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    const subcribe = onAuthStateChanged(Client.auth, (user) => {
      if (user !== null) {
        user.getIdToken().then((token) => {
          dispatch(getUserDetails({ firebaseToken: token }));
        });
      } else {
        router.push('/login/merchants/individuals');
      }
    });
    return subcribe()
  }, [dispatch, router]);
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      setError(true);
      setFileUploaded(false);
    } else if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      setFile({
        file: file,
        preview: URL.createObjectURL(file),
      });
      setFileUploaded(true);
      setError(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    maxSize: 100000000, //100MB
    accept: ['image/*', 'video/mp4'],
    onDrop,
  });

  const handleImageUpload = () => {
    //Upload Image to Firebase
    //Check if file exists
    if (file?.file?.type === null || file?.file?.type === undefined || file?.file?.type === '') {
      setFileError(true);
      setDescriptionError(false);
    } else if (description == '') {
      setFileError(false);
      setDescriptionError(true);
    } else {
      setLoading(true);
      const ts = new Date().getTime();
      const storageRef = ref(Client.storage, `/db-dev/feeds/images/image_${ts}_${file.file.name}`);
      setFileError(false);
      setDescriptionError(false);

      uploadBytes(storageRef, file.file, {
        contentType: file.file.type,
      }).then((snapshot) => {
        const uploadPayload = {
          fileName: file.file.name,
          fullPath: snapshot.metadata.fullPath,
          textContent: description,
          generation: snapshot.metadata.generation,
          uid: uid,
          fp: `image_${ts}_${file.file.name}`,
          id: `db-dev/feeds/images/${file.file.name}`,
          metadata,
          fileType: file?.file?.type?.split('/')[0],
          liked_count: 0,
          liked_users: {},
        };
        const payload: ReqPayload = {
          payload: uploadPayload,
          firebaseToken: firebaseToken,
          modification: false,
        };
        fetch('/api/feed/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            response.json().then((data) => {
              if (!data.error) {
                setLoading(false);
                setUploaded(true);
                setUploadError(false);
                dispatch(
                  getUserAndImageFeed({
                    firebaseToken,
                  })
                );

                setUploadedFile('Upload Success');
                triggerChanges();
              } else {
                setLoading(false);
                setUploaded(false);
                setUploadError(true);
                setUploadedFile('Upload Failed. Please try again');
              }
            });
          })
          .catch((error) => {
            setLoading(false);
            setUploaded(false);
            setUploadError(true);
            setUploadedFile('Upload Failed. Kindly Retry');
          });
        setTimeout(() => setUploaded(false), 1500);
      });
    }
  };
  return (
    <div className={[classes.ModifiableStructure, 'ThinScrollbar'].join(' ')}>
      {fileError && <label className='error-red'>Please Upload an Image</label>}
      <label className={classes.TopLabel}>Upload Feed</label>
      <Grid container spacing={{ xs: 2, md: 8 }} direction='row'>
        <Grid item md={6}>
          <div className={classes.UploadCanvas} {...getRootProps()}>
            <input {...getInputProps()}></input>

            {loading ? (
              <Spinner />
            ) : !fileUploaded ? (
              error ? (
                <React.Fragment>
                  <label style={{ color: 'red' }}>
                    Invalid File! Either you have added a wrong file type or the file size is more than 100MBs. Please
                    try again
                  </label>
                  <Button className={'ThemeButtonBlack'}>Browse Files</Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <label className={classes.UploadCanvas_title}>Drag and Drop your files here.</label>
                  <label className={classes.UploadCanvas_generic}> OR </label>
                  <Button className={'ThemeButtonBlack'}>Browse Files</Button>
                  <label>Provide Only Image & mp4 Files</label>
                </React.Fragment>
              )
            ) : (
              <div className={classes.CanvasImage}>
                {file?.file?.type != 'video/mp4' ? (
                  <Image src={file.preview} alt={'Uploaded'} height={200} width={600} objectFit={'contain'} />
                ) : (
                  <video autoPlay controls muted height={200} width={600} src={file.preview} />
                )}
              </div>
            )}
          </div>
        </Grid>
        <Grid item md={6}>
          {descriptionError && <label className='error-red'>Please Add Description</label>}
          <TextField
            required
            className={classes.FormInputField1}
            label='Description'
            size='small'
            type='text'
            placeholder='Type Your Description Here'
            multiline
            rows={4}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          {loading || uploaded || uploadError ? (
            <p
              className={
                uploadError
                  ? classes.UploadingStatusError
                  : uploaded
                  ? classes.UploadingStatusSuccess
                  : classes.UploadingStatus
              }
            >
              {uploadedFile}
            </p>
          ) : null}
          <Button
            onClick={handleImageUpload}
            className={[classes.ThemeButtonBlack1, 'ThemeButtonBlack', classes.ButtonWidth].join(' ')}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
