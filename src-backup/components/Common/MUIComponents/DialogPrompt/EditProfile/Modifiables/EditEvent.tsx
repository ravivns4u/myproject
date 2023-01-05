import React from 'react';
import classes from './Events.module.scss';
import TextField from '@mui/material/TextField';
import { useDropzone } from 'react-dropzone';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';

import Image from 'next/image';
import Spinner from '../../../../Spinner/Spinner';
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../../../redux/app/hooks';
import Client from '../../../../../../firebase/firebase_client_exports';
import { ref, uploadBytes } from 'firebase/storage';
import {
  IAddEventFrontend,
  IAddEventFrontendValues,
  IAddEventValidateRequestFrontend,
} from '../../../../../../redux/interfaces/backend/apis/v2/events';
import BackupIcon from '@mui/icons-material/Backup';
import { GeoAPIResponseInterface } from '../../../../../../redux/interfaces';
import {
  Autocomplete,
  FormControlLabel,
  MenuItem,
  RadioGroup,
  Radio, createFilterOptions,
} from "@mui/material";
import { CurrencyTypes } from '../../../../../../redux/interfaces/backend/apis/productPortfolio';
import { ResponseParams } from '../../../../../../redux/interfaces/backend/apiHandlers';
import { CreateEventRequestPayload } from '../../../../../../pages/api/v2/user-profile/events/add-events-user';
import MUIEditAutoComplete from "../../../AutoComplete/MUIEditAutoComplete";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'INR',
    label: '₹',
  },
];

const filter = createFilterOptions();

interface EditEventProps {
  formCloseHandler?: () => void;
  triggerChanges: () => void;
  open: boolean;
  initialEventForm: IAddEventFrontend;
}

export default function EditService(props: EditEventProps) {
  const { formCloseHandler, open, initialEventForm, triggerChanges } = props;
  const [error, setError] = React.useState(false);
  const [cities, setCities] = React.useState([] as string[]);
  const [loading, setLoading] = React.useState(false);
  const [isSelf, setIsSelf] = React.useState(true);
  const [backendMsg, setBackendMsg] = React.useState('');
  const [fileUploaded, setFileUploaded] = React.useState(true);
  const [serviceForm, setServiceForm] =
    React.useState<IAddEventFrontend>(initialEventForm);
  const [file, setFile] = React.useState<any>({
    preview: serviceForm.imageUri ?? '/loading.png',
  });
  const [imageChanged, setImageChanged] = React.useState(false);
  const [category, setCategory] = React.useState(props.initialEventForm?.category);
  const [profession, setProfession] = React.useState(props.initialEventForm?.profession);
  const [languages, setLanguages] = React.useState([] as any[]);

  React.useEffect(() => {
    if (open) {
      setServiceForm({ ...initialEventForm });
      setFile({
        preview: initialEventForm.imageUri ?? '/loading.png',
        file: {
          type: initialEventForm.fileType,
          name: initialEventForm.fileName,
        },
      });
      setImageChanged(false);
    }
  }, [
    initialEventForm.about,
    initialEventForm.category,
    initialEventForm.city,
    initialEventForm.currency,
    initialEventForm.startDate,
    initialEventForm.about,
    initialEventForm.imageUri,
    initialEventForm.hostType,
    initialEventForm.name,
    initialEventForm.price,
    initialEventForm.profession,
    initialEventForm.venue,
    initialEventForm,
    open,
  ]);

  React.useEffect(() => {
    fetch('/api/v2/languages').then((res) =>
        res.json().then((data) => {
          setLanguages(data?.payload?.languages);
          setCategory(data.payload.category.map((value: any)=>{return {label:value,value:value}}));
          setProfession(data?.payload?.profession);
        })
    );
  },[]);


  React.useEffect(() => {
    const fetchGeoData = () => {
      fetch('/api/geo').then((res) =>
        res.json().then((data) => {
          const { cities } = data as GeoAPIResponseInterface;
          setCities(cities);
        })
      );
    };
    fetchGeoData();
  }, []);
  const closeModal = () => {
    setLoading(false);
    if (formCloseHandler) formCloseHandler();
  };

  const {
    firebaseToken,
    uid,
    user: { bio,plan },
  } = useAppSelector((state) => state.user);

  const onFormChangeHandler = (
    formKey: keyof IAddEventFrontend,
    value: IAddEventFrontendValues
  ) => {
    setServiceForm({
      ...serviceForm,
      [formKey]: value,
    });
  };

  const triggerCityChange = (cityData:any) => {
    const cityList = cityData;
    fetch('/api/get-state', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city:cityList }),
    })
      .then((response) =>
        response
          .json()
          .then((data) => {
            const { state } = data;
            if (open) {
              setServiceForm({
                ...serviceForm,
                state: state,
                city: cityList
              });   
            }
          })
          .catch((error) => errorLogger(error, '154: Unexpected Error occured'))
      )
      .catch((error) => errorLogger(error, '156: Unexpected Error occured'));
  };

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
      setImageChanged(true);
    }
  }, []);

  const errorLogger = (error: any, msg: string) => {
    console.log(error);
    setBackendMsg(msg);
    setLoading(false);
    setImageChanged(false);
  };

  const uploadToFireStore = (
    docName: string,
    fullPath: string,
    fileType: string
  ) => {
    serviceForm.fileName = docName;
    serviceForm.imageLocation = fullPath;
    serviceForm.fileType = fileType;
    serviceForm.aboutHost = isSelf ? bio ?? '' : serviceForm.aboutHost;
    const payload: CreateEventRequestPayload = {
      payload: serviceForm,
      firebaseToken,
      create: false,
    };
    fetch('/api/v2/user-profile/events/add-events-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) =>
        response
          .json()
          .then((data: ResponseParams) => {
            const { error, msg } = data;
            if (error) {
              errorLogger(msg, msg);
            } else {
              setBackendMsg('');
              setLoading(false);
              closeModal();
              triggerChanges();
            }
          })
          .catch((error) =>
            errorLogger(error, 'Unable to Parse Info. Please try again')
          )
      )
      .catch((error) =>
        errorLogger(error, 'Unable to Upload Info. Please try again!')
      );
  };

  const onFileUpload = () => {
    /*
        1. Validate Form Data 
        2. If Valid, Upload Image to Firebase Storage
        3. If Upload Success, get the firebaseLocation Url
        4. Submit the form and Return the Response
    */
    if (loading) {
      alert('Please Wait for current process to complete');
      return;
    }
    if (fileUploaded) {
      if (
        file.file.type == null &&
        file.file.name == null &&
        serviceForm.fileName === '' &&
        serviceForm.fileType === ''
      ) {
        setBackendMsg('Uploaded File is not Valid. Please Retry');
        return;
      }
      setLoading(true);
      const requestPayload: IAddEventValidateRequestFrontend = {
        payload: serviceForm,
        firebaseToken,
      };
      fetch('/api/v2/user-profile/events/validate-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      })
        .then((data) =>
          data
            .json()
            .then((data: ResponseParams) => {
              const { error, msg } = data;
              if (error) {
                setBackendMsg(msg);
                setLoading(false);
                return;
              } else {
                const fileType = file.file.type ?? serviceForm.fileType;
                const fileName = file.file.name ?? serviceForm.fileName;
                const docName =
                  serviceForm.fileName === ''
                    ? `img__${new Date().getTime()}__${fileName}`
                    : serviceForm.fileName;
                const fullPath = `db-dev/user-metadata/portfolio/events/${uid}/${docName}`;
                if (imageChanged) {
                  const storageRef = ref(
                    Client.storage,
                    serviceForm.imageLocation !== ''
                      ? serviceForm.imageLocation
                      : fullPath
                  );
                  uploadBytes(storageRef, file.file, {
                    contentType: fileType,
                  })
                    .then(() => uploadToFireStore(docName, fullPath, fileType))
                    .catch((error) =>
                      errorLogger(error, 'Error Uploading Image')
                    );
                } else {
                  uploadToFireStore(docName, fullPath, fileType);
                }
              }
            })
            .catch((error) =>
              errorLogger(error, 'Unexpected Server Error Occured')
            )
        )
        .catch((error) =>
          errorLogger(error, 'Unexpected Server Error Occured')
        );
    } else {
      setBackendMsg('Please Upload an Image');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 50);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 10000000, //10MB
    accept: ['image/*'],
    onDrop,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {category === undefined || category?.length === 0 ? (
        <Spinner />
      ) : (
        <div className={[classes.EventGrid, classes.ThinScrollbar].join(' ')}>
          {backendMsg !== '' ? (
            <label className='error-red'>{backendMsg}</label>
          ) : null}
          <section className={classes.TopSection}>
            <div
              {...getRootProps()}
              className={[classes.DisplayImage, classes.TopSectionCommon].join(
                ' '
              )}>
              <React.Fragment>
                <input {...getInputProps()} />
                {!fileUploaded ? (
                  <div className={classes.UploadContainer}>
                    <BackupIcon className={classes.UploadIcon} />
                    <label className={classes.UploadIcon_Text}>
                      Click or Drop to Upload Image
                    </label>
                  </div>
                ) : error ? (
                  <div className={classes.UploadContainer}>
                    <WarningIcon className={classes.UploadIcon_warning} />
                    <label className={classes.UploadIcon_Text_warning}>
                      Only Image Files upto 10MBs are allowed!
                    </label>
                  </div>
                ) : (
                  <Image
                    src={file.preview}
                    alt='Mountains'
                    layout='fill'
                    objectFit='contain'
                    objectPosition={'center'}
                  />
                )}
              </React.Fragment>
            </div>

            <div
              className={[
                classes.TopSectionCommon,
                classes.TopSection_currency,
              ].join(' ')}>
              <TextField
                className={classes.currencyLabel}
                select
                size='small'
                value={serviceForm.currency ?? 'INR'}
                onChange={(event) =>
                  onFormChangeHandler('currency', event.target.value)
                }>
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                className={classes.currencyValue}
                label='Pricing'
                size='small'
                type='number'
                value={serviceForm.price ?? 10}
                onChange={(event) =>
                  onFormChangeHandler('price', +event.target.value)
                }
              />
            </div>
            <TextField
              required
              className={[
                classes.TopSection_text,
                classes.TopSectionCommon,
              ].join(' ')}
              label={'Event Name'}
              size='small'
              type='text'
              value={serviceForm.name ?? ''}
              onChange={(e) =>
                onFormChangeHandler('name', e.target.value as string)
              }
            />
            <DateTimePicker
              label='Start Date and Time'
              value={serviceForm.startDate ?? ''}
              onChange={(e) => {
                if (e)
                  onFormChangeHandler('startDate', new Date(e).toISOString());
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  size='small'
                  className={[
                    classes.TopSection_startdate,
                    classes.TopSectionCommon,
                  ].join(' ')}
                />
              )}
            />
            <DateTimePicker
              label='End Date and Time'
              value={serviceForm.endDate ?? ''}
              onChange={(e) => {
                if (e)
                  onFormChangeHandler('endDate', new Date(e).toISOString());
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  size='small'
                  className={[
                    classes.TopSection_enddate,
                    classes.TopSectionCommon,
                  ].join(' ')}
                />
              )}
            />
            <Autocomplete
              disablePortal
              options={cities}
              value={serviceForm.city ?? 'Delhi'}
              onChange={(_, e) => {
                if (e){
                  onFormChangeHandler('city',e.toString());
                  triggerCityChange(e.toString())
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='City'
                  required
                  className={[
                    classes.TopSection_city,
                    classes.TopSectionCommon,
                  ].join(' ')}
                  // onBlur={triggerCityChange}
                  size='small'
                  value={serviceForm.city ?? 'Delhi'}
                  onChange={(e) => {
                    onFormChangeHandler('city',e.target.value);
                    triggerCityChange(e.target.value)
                  }}
                />
              )}
            />
            <TextField
              label='State'
              disabled
              className={[
                classes.TopSection_state,
                classes.TopSectionCommon,
              ].join(' ')}
              size='small'
              value={serviceForm.state ?? 'Delhi'}
            />
            {plan !== undefined && category !== undefined &&
                <MUIEditAutoComplete
                    options={category}
                    onFormChangeHandler={onFormChangeHandler}
                    label="Category"
                    formKey="category"
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      const { inputValue } = params;
                      const isExisting = options.some((option) => inputValue === option?.title);
                      if (inputValue !== '' && !isExisting) {
                        filtered.push(inputValue);
                      }
                      return filtered;
                    }}
                    defaultValue={plan === "pro"  ?
                        serviceForm?.category?.map((value: any) => {
                          return { label: value, value: value };
                        })
                        :
                        serviceForm?.category !== undefined && serviceForm?.category[0]}
                />
            }
            {profession !== undefined && <Autocomplete
                disablePortal
                limitTags={2}
                multiple
                size="small"
                options={profession}
                onChange={(_, e) => {
                  if (e) onFormChangeHandler("profession", e as any[]);
                }}
                // defaultValue={serviceForm?.profession}
                value={serviceForm?.profession}
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
                    <TextField
                        {...params}
                        label="Profession"
                        required
                        className={[
                          classes.TopSection_category,
                          classes.TopSectionCommon,
                        ].join(" ")}
                        size="small"
                    />
                )}
            />}
            <TextField
              label='Venue'
              className={[
                classes.TopSection_venue,
                classes.TopSectionCommon,
              ].join(' ')}
              size='small'
              value={serviceForm.venue ?? ''}
              onChange={(e) => onFormChangeHandler('venue', e.target.value)}
            />
            <TextField
              label='Max Audience Capacity'
              className={[
                classes.TopSection_maxCapacity,
                classes.TopSectionCommon,
              ].join(' ')}
              size='small'
              type='number'
              value={serviceForm.audienceCapacity ?? 100}
              onChange={(e) =>
                onFormChangeHandler('audienceCapacity', +e.target.value)
              }
            />
          </section>
          <TextField
            required
            multiline
            rows={2}
            className={classes.AboutSection}
            label='About The Event'
            size='small'
            value={serviceForm.about ?? ''}
            onChange={(event) =>
              onFormChangeHandler('about', event.target.value)
            }
          />
          <label className={classes.HostDetailsLabel}>Event Location:</label>
          <RadioGroup
            aria-label='Host Details'
            defaultValue='Self'
            value={serviceForm.hostPoint ?? 'Self'}
            name='radio-buttons-group'
            className={classes.RadioGroup}
            row>
            <FormControlLabel
              value='In Person'
              control={
                <Radio
                  onChange={(e) => {
                    onFormChangeHandler('hostPoint', e.target.value);
                  }}
                  color='secondary'
                />
              }
              label='In Person'
            />
            <FormControlLabel
              value='Online'
              control={
                <Radio
                  onChange={(e) => {
                    onFormChangeHandler('hostPoint', e.target.value);
                  }}
                  color='secondary'
                />
              }
              label='Online'
            />
          </RadioGroup>
          <label className={classes.HostDetailsLabel}>Host Details</label>
          <RadioGroup
            aria-label='Host Details'
            defaultValue='Self'
            value={serviceForm.hostType ?? 'Self'}
            name='radio-buttons-group'
            className={classes.RadioGroup}
            row>
            <FormControlLabel
              value='Self'
              control={
                <Radio
                  onChange={(e) => {
                    onFormChangeHandler('hostType', e.target.value);
                    setIsSelf(true);
                  }}
                  color='secondary'
                />
              }
              label='Self'
            />
            <FormControlLabel
              value='Other'
              control={
                <Radio
                  onChange={(e) => {
                    onFormChangeHandler('hostType', e.target.value);
                    setIsSelf(false);
                  }}
                  color='secondary'
                />
              }
              label='Other'
            />
          </RadioGroup>
          {!isSelf ? (
            <React.Fragment>
              <TextField
                required
                multiline
                rows={2}
                className={classes.AboutSection}
                label='About The Host'
                size='small'
                value={serviceForm.aboutHost ?? ''}
                onChange={(event) =>
                  onFormChangeHandler('aboutHost', event.target.value)
                }
              />
              <br />
            </React.Fragment>
          ) : null}

          <TextField
            required
            multiline
            rows={4}
            className={classes.AboutSection}
            label='Terms and Conditions'
            size='small'
            value={serviceForm.termsAndConditions ?? ''}
            onChange={(event) =>
              onFormChangeHandler('termsAndConditions', event.target.value)
            }
          />
          <br />
          <Button className={'ThemeButtonBlack'} onClick={onFileUpload}>
            Upload Event
          </Button>
        </div>
      )}
    </LocalizationProvider>
  );
}
