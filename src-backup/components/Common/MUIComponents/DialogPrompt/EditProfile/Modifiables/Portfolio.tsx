import React, { useCallback } from 'react';
import classes from './Modifiables.module.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import Client from '../../../../../../firebase/firebase_client_exports';
import { ref, uploadBytes } from 'firebase/storage';
import Spinner from '../../../../Spinner/Spinner';
import { useAppSelector, useAppDispatch } from '../../../../../../redux/app/hooks';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserDetails } from '../../../../../../redux/slices/user';
import type { ReqPayload, ImagePortfolioData } from '../../../../../../redux/interfaces/backend/apis/ImagePortfolio';
import { IMetaData } from '../../../../../../redux/interfaces/backend/apis';
import { Autocomplete, createFilterOptions, Grid } from '@mui/material';
import MUIEditAutoComplete from '../../../AutoComplete/MUIEditAutoComplete';
import { getUserAndImagePortfolio } from '../../../../../../redux/slices/profile';
import { sassFalse } from 'sass';
import { gridFilterActiveItemsLookupSelector } from '@mui/x-data-grid';

interface Props {
  triggerChanges: () => void;
  metadata: IMetaData;
}

const filter = createFilterOptions();

export default function Portfolio(props: Props) {
  const { triggerChanges, metadata } = props;
  const [title, setTitle] = React.useState('');
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
  const [categories, setCategories] = React.useState([]);
  const [profession, setProfession] = React.useState(['']);
  const [sendProfession, setSendProfession] = React.useState(['Physical Art'] as any[]);
  const [sendCategory, setSendCategory] = React.useState(['ART'] as any[]);
  const [languages, setLanguages] = React.useState([] as string[]);
  const [fileError, setFileError] = React.useState(false);
  const [titleError, setTitleError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [categoryError, setCategoryError] = React.useState(false);
  const [professionError, setProfessionError] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  //CategoryHandler
  const onFormChangeHandler = (formKey: any, value: React.SetStateAction<any[]>) => {
    setSendCategory(value);
  };

  const {
    uid,
    firebaseToken,
    user: { plan },
  } = useAppSelector((state) => state.user);

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

  React.useEffect(() => {
    fetch('/api/v2/languages').then((res) =>
      res.json().then((data) => {
        setLanguages(data?.payload?.languages);
        setCategories(
          data.payload.category.map((value: any) => {
            return { label: value, value: value };
          })
        );
        setProfession(data?.payload?.profession);
      })
    );
  }, []);

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

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setFileUploaded(false);
    setSendProfession(['Physical Art']);
    setSendCategory(['ART']);
  };

  const handleImageUpload = () => {
    //Upload Image to Firebase
    //Check if file exists

    if (file?.file?.type === null || file?.file?.type === undefined || file?.file?.type === '') {
      setFileError(true);
      setTitleError(false);
      setDescriptionError(false);
      setCategoryError(false);
      setProfessionError(false);
    } else if (title === '') {
      setFileError(false);
      setTitleError(true);
      setDescriptionError(false);
      setCategoryError(false);
      setProfessionError(false);
    } else if (description === '') {
      setFileError(false);
      setTitleError(false);
      setDescriptionError(true);
      setCategoryError(false);
      setProfessionError(false);
    } else if (sendCategory.length === 0) {
      setFileError(false);
      setTitleError(false);
      setDescriptionError(false);
      setCategoryError(true);
      setProfessionError(false);
    } else if (sendProfession.length === 0) {
      setFileError(false);
      setTitleError(false);
      setDescriptionError(false);
      setCategoryError(false);
      setProfessionError(true);
    } else {
      setLoading(true);
      setFileError(false);
      setTitleError(false);
      setDescriptionError(false);
      setCategoryError(false);
      setProfessionError(false);
      setIsDisabled(true);
      const ts = new Date().getTime();
      const storageRef = ref(
        Client.storage,
        `/db-dev/user-metadata/portfolios/images/${uid}/image_${ts}_${file.file.name}`
      );

      uploadBytes(storageRef, file.file, {
        contentType: file.file.type,
      }).then((snapshot) => {
        const uploadPayload: ImagePortfolioData = {
          fileName: file.file.name,
          fullPath: snapshot.metadata.fullPath,
          textContent: description,
          title: title,
          category: sendCategory,
          profession: sendProfession,
          generation: snapshot.metadata.generation,
          uid: uid,
          fp: `image_${ts}_${file.file.name}`,
          metadata,
        };
        const payload: ReqPayload = {
          payload: uploadPayload,
          firebaseToken: firebaseToken,
          modification: false,
        };
        fetch('/api/portfolio/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            response.json().then((data) => {
              setIsDisabled(false);
              dispatch(
                getUserAndImagePortfolio({
                  firebaseToken: firebaseToken,
                  startPoint: 0,
                  endPoint: 30,
                })
              );
              resetForm();
              if (!data.error) {
                setLoading(false);
                setUploaded(true);
                setUploadError(false);
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
            setIsDisabled(false);
          });
        setTimeout(() => setUploaded(false), 1500);
      });
    }
  };
  return (
    <div
      className={[classes.ModifiableStructure, 'ThinScrollbar'].join(' ')}
      style={{ pointerEvents: isDisabled ? 'none' : '' }}
    >
      <label className={classes.TopLabel}>Upload Portfolio</label>
      <div className={classes.UploadCanvas} {...getRootProps()}>
        <input {...getInputProps()}></input>

        {loading ? (
          <Spinner />
        ) : !fileUploaded ? (
          error ? (
            <React.Fragment>
              <label style={{ color: 'red' }}>
                Invalid File! Either you have added a wrong file type or the file size is more than 100MBs. Please try
                again
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
      {fileError && (
        <label className={'error-red'} style={{ padding: '1rem' }}>
          Please Select Video/Mp4 File.
        </label>
      )}
      <TextField
        required
        className={classes.FormInputField}
        label='Title'
        size='small'
        type='text'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      {titleError && (
        <label className={'error-red'} style={{ padding: '1rem' }}>
          Please Enter Title.
        </label>
      )}
      <TextField
        required
        className={classes.FormInputField}
        label='Description'
        size='small'
        type='text'
        placeholder='Type Here (500 characters max)'
        multiline
        rows={4}
        value={description}
        onChange={(event) => setDescription(event.target.value.slice(0, 500))}
      />
      {descriptionError && (
        <label className={'error-red'} style={{ padding: '1rem' }}>
          Please Add Description.
        </label>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          {/*<Autocomplete
              disablePortal
              limitTags={2}
              multiple={plan!== undefined && plan === 'pro'}
              options={categories}
              defaultValue={["ART"]}
              onChange={(_, e) => {
                if (e) setSendCategory(plan!== undefined && plan === 'pro' ? e as [] : [e]);
              }}
              renderInput={(params) => (
                  <TextField
                      {...params}
                      label="Category"
                      required
                      className={classes.FormInputField}
                      size="medium"
                  />
              )}
          />*/}
          {plan !== undefined && (
            <MUIEditAutoComplete
              options={categories}
              onFormChangeHandler={onFormChangeHandler}
              label='Category'
              formKey='category'
              defaultValue={
                plan === 'pro'
                  ? sendCategory?.map((value: any) => {
                      return { label: value, value: value };
                    })
                  : sendCategory[0]
              }
            />
          )}
        </Grid>
        {categoryError && (
          <label className={'error-red'} style={{ padding: '1rem' }}>
            Please Select Category.
          </label>
        )}
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Autocomplete
            disablePortal
            limitTags={2}
            multiple
            size='small'
            options={profession}
            onChange={(_, e) => {
              if (e) setSendProfession(e as []);
            }}
            defaultValue={['Physical Art']}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options.some((option) => inputValue === option.title);
              if (inputValue !== '' && !isExisting) {
                filtered.push(inputValue);
              }
              return filtered;
            }}
            renderInput={(params) => (
              <TextField {...params} label='Profession' required className={classes.FormInputField} />
            )}
          />
        </Grid>
        {professionError && (
          <label className={'error-red'} style={{ padding: '1rem' }}>
            Please Select Profession.
          </label>
        )}
      </Grid>
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
      <Button onClick={handleImageUpload} className={['ThemeButtonBlack', classes.ButtonWidth].join(' ')}>
        Upload
      </Button>
    </div>
  );
}
