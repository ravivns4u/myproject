import React, { useCallback } from 'react';
import classes from './Modifiables.module.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Client from '../../../../../../firebase/firebase_client_exports';
import { ref, uploadBytes } from 'firebase/storage';
import Spinner from '../../../../Spinner/Spinner';
import Grid from '@mui/material/Grid';
import { useAppSelector, useAppDispatch } from '../../../../../../redux/app/hooks';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserDetails } from '../../../../../../redux/slices/user';
import type {
  ReqPayload,
  ImageFeedData,
  CaptionFeedData,
  ReqFeedPayload,
} from '../../../../../../redux/interfaces/backend/apis/ImageFeed';
import { IMetaData } from '../../../../../../redux/interfaces/backend/apis';
import { constDocumentRefs } from '../../../../../../firebase/constants/firestore';
import { getUserAndImageFeed } from '../../../../../../redux/slices/profile';

interface Props {
  triggerChanges: () => void;
  metadata: IMetaData;
}

const FeedText = (props: Props) => {
  const { triggerChanges, metadata } = props;
  const [description, setDescription] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState('Uploading...');
  const [uploaded, setUploaded] = React.useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [uploadError, setUploadError] = React.useState(false);
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

  const handleImageUpload = () => {
    if (description == '') {
      setDescriptionError(true);
    } else {
      setLoading(true);
      const ts = new Date().getTime();
      const uploadPayload = {
        fileName: `${constDocumentRefs.users_feed_caption}/caption-${ts}`,
        fullPath: `${constDocumentRefs.users_feed_caption}/caption-${ts}`,
        textContent: description,
        generation: `${constDocumentRefs.users_feed_caption}/caption-${ts}`,
        uid: uid,
        fp: `caption-${ts}`,
        id: `db-dev/feeds/images/caption-${ts}`,
        metadata,
        fileType: 'text',
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
          setTimeout(() => setUploaded(false), 1500);
        })
        .catch((error) => {
          setLoading(false);
          setUploaded(false);
          setUploadError(true);
          setUploadedFile('Upload Failed. Kindly Retry');
        });
    }
  };

  return (
    <div className={[classes.ModifiableStructure, 'ThinScrollbar'].join(' ')}>
      {descriptionError && <label className='error-red'>Please Add Description</label>}
      <label className={classes.TopLabel}>Add Feed</label>
      <Grid container spacing={{ xs: 2, md: 8 }} direction='row'>
        <Grid item md={12}>
          <TextField
            required
            className={classes.FormInputField1}
            label='Add Description'
            size='small'
            type='text'
            placeholder='Type Here....'
            multiline
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxRows={Infinity}
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
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FeedText;
