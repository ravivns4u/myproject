import React from 'react';
import classes from './Events.module.scss';
import TextField from '@mui/material/TextField';
import { useDropzone } from 'react-dropzone';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';
import Image from 'next/image';
import Spinner from '../../../../Spinner/Spinner';
import { useAppSelector } from '../../../../../../redux/app/hooks';
import Client from '../../../../../../firebase/firebase_client_exports';
import { ref, uploadBytes } from 'firebase/storage';
import {
  IAddEventFrontend,
  IAddEventFrontendValues,
  IAddEventValidateRequestFrontend,
} from '../../../../../../redux/interfaces/backend/apis/v2/events';
import BackupIcon from '@mui/icons-material/Backup';
import { GeoAPIResponseInterface } from '../../../../../../redux/interfaces';
import { Autocomplete, createFilterOptions, FormControlLabel, MenuItem, Radio, RadioGroup } from '@mui/material';
import { ResponseParams } from '../../../../../../redux/interfaces/backend/apiHandlers';
import { CreateEventRequestPayload } from '../../../../../../pages/api/v2/user-profile/events/add-events-user';
import MUIAutoComplete from '../../../AutoComplete/MUIAutoComplete';
import axios from 'axios';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

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

const initialEventForm: IAddEventFrontend = {
  name: '',
  price: 1000,
  currency: 'INR',
  audienceCapacity: 100,
  imageLocation: '',
  fileType: '',
  fileName: '',
  state: 'Delhi',
  city: 'Delhi',
  venue: '',
  lng: 0,
  lat: 0,
  startDate: new Date(),
  endDate: new Date(),
  category: ['ART'] as any[],
  about: '',
  aboutHost: '',
  hostType: 'Self',
  hostDescription: '',
  termsAndConditions: '',
  createdAt: new Date().toISOString(),
  imageUri: '',
  hostPoint: 'In Person',
  profession: ['Physical Art'] as any[],
};

interface EditEventProps {
  formCloseHandler?: () => void;
  triggerChanges: () => void;
  open: boolean;
}

const filter = createFilterOptions();

export default function EditService(props: EditEventProps) {
  const { formCloseHandler, open, triggerChanges } = props;
  const [error, setError] = React.useState(false);
  const [cities, setCities] = React.useState([] as string[]);
  const [categories, setCategories] = React.useState([] as string[]);
  const [loading, setLoading] = React.useState(false);
  const [isSelf, setIsSelf] = React.useState(true);
  const [backendMsg, setBackendMsg] = React.useState('');
  const [languages, setLanguages] = React.useState([] as string[]);
  const [category, setCategory] = React.useState([] as any[]);
  const [profession, setProfession] = React.useState([] as any[]);
  const [aboutEventError, setAboutEventError] = React.useState(false);
  const [termsConditionError, setTermsConditionError] = React.useState(false);
  const [eventNameError, setEventNameError] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const closeModal = () => {
    setLoading(false);
    if (formCloseHandler) formCloseHandler();
  };
  const [fileUploaded, setFileUploaded] = React.useState(false);
  const [serviceForm, setServiceForm] = React.useState<IAddEventFrontend>(initialEventForm);
  const [file, setFile] = React.useState<any>({
    preview: serviceForm.imageUri ?? '/loading.png',
  });
  const initFunction = React.useCallback(() => {
    setError(false);
    setIsSelf(true);
    setBackendMsg('');
    setServiceForm(initialEventForm);
    setFile({ preview: serviceForm.imageUri ?? '/loading.png' });
    setFileUploaded(false);
  }, [serviceForm.imageUri]);

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get('/api/v2/languages');
      if (data) {
        setLanguages(data?.payload?.languages);
        setCategory(
          data?.payload?.category?.map((value: any) => {
            return { label: value, value: value };
          })
        );
        setProfession(data?.payload?.profession);
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchCategory().then((r) => console.log('r', r));
  }, []);

  React.useEffect(() => {
    if (open) {
      const fetchGeoData = () => {
        fetch('/api/geo').then((res) =>
          res.json().then((data) => {
            const { cities } = data as GeoAPIResponseInterface;
            setCities(cities);
          })
        );
        /*fetch("/api/v2/languages").then((res) =>
                    res.json().then((data) => {
                      setLanguages(data?.payload?.languages);
                      setCategory(data?.payload?.category?.map((value: any)=>{return {label:value,value:value}}));
                      setProfession(data?.payload?.profession);
                    })
                );*/
      };
      fetchGeoData();
    }
    if (!open) {
      initFunction();
    }
  }, [open, initFunction]);
  const {
    firebaseToken,
    uid,
    user: { bio, plan },
  } = useAppSelector((state) => state.user);

  const onFormChangeHandler = (formKey: keyof IAddEventFrontend, value: IAddEventFrontendValues) => {
    setServiceForm({
      ...serviceForm,
      [formKey]: value,
    });
  };

  const triggerCityChange = (cityData: any) => {
    const cityList = cityData;
    fetch('/api/get-state', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city: cityList }),
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
                city: cityList,
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
    }
  }, []);

  const errorLogger = (error: any, msg: string) => {
    console.log(error);
    setBackendMsg(msg);
    setLoading(false);
  };

  const onFileUpload = () => {
    if (file?.file?.type === null || file?.file?.type === undefined || file?.file?.type === '') {
      setBackendMsg('Please Upload an Image');
      setAboutEventError(false);
      setTermsConditionError(false);
      setLoading(true);
      setEventNameError(false);
      setTimeout(() => {
        setLoading(false);
      }, 50);
    } else if (serviceForm.name == '') {
      setAboutEventError(false);
      setTermsConditionError(false);
      setBackendMsg('');
      setEventNameError(true);
    } else if (serviceForm.about == '') {
      setAboutEventError(true);
      setTermsConditionError(false);
      setBackendMsg('');
      setEventNameError(false);
    } else if (serviceForm.termsAndConditions == '') {
      setAboutEventError(false);
      setTermsConditionError(true);
      setBackendMsg('');
      setEventNameError(false);
    } else {
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
      setIsDisabled(true);
      const requestPayload: IAddEventValidateRequestFrontend = {
        payload: serviceForm,
        firebaseToken,
      };
      setAboutEventError(false);
      setTermsConditionError(false);
      setBackendMsg('');
      setEventNameError(false);
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
                const docName = `img__${new Date().getTime()}__${fileName}`;
                const fullPath = `db-dev/user-metadata/portfolio/events/${uid}/${docName}`;
                const storageRef = ref(
                  Client.storage,
                  serviceForm.imageLocation !== '' ? serviceForm.imageLocation : fullPath
                );
                uploadBytes(storageRef, file.file, {
                  contentType: fileType,
                })
                  .then(() => {
                    serviceForm.fileName = docName;
                    serviceForm.imageLocation = fullPath;
                    serviceForm.fileType = fileType;
                    serviceForm.aboutHost = isSelf ? bio ?? '' : serviceForm.aboutHost;
                    const payload: CreateEventRequestPayload = {
                      payload: serviceForm,
                      firebaseToken,
                      create: true,
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
                            setIsDisabled(false);
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
                          .catch((error) => errorLogger(error, 'Unable to Parse Info. Please try again'))
                      )
                      .catch((error) => errorLogger(error, 'Unable to Upload Info. Please try again!'));
                  })
                  .catch((error) => errorLogger(error, 'Error Uploading Image'));
              }
            })
            .catch((error) => errorLogger(error, 'Unexpected Server Error Occured'))
        )
        .catch((error) => errorLogger(error, 'Unexpected Server Error Occured'));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 10000000, //10MB
    accept: ['image/*'],
    onDrop,
  });

  return (
    <>
      {category === undefined || category?.length === 0 ? (
        <Spinner />
      ) : (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div
            className={[classes.EventGrid, classes.ThinScrollbar].join(' ')}
            style={{ pointerEvents: isDisabled ? 'none' : '' }}
          >
            {backendMsg !== '' ? <label className='error-red'>{backendMsg}</label> : null}
            {eventNameError && <label className='error-red'>Please Enter Event Name</label>}
            <section className={classes.TopSection}>
              <div {...getRootProps()} className={[classes.DisplayImage, classes.TopSectionCommon].join(' ')}>
                <React.Fragment>
                  <input {...getInputProps()} />
                  {!fileUploaded ? (
                    <div className={classes.UploadContainer}>
                      <BackupIcon className={classes.UploadIcon} />
                      <label className={classes.UploadIcon_Text}>Click or Drop to Upload Image</label>
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
              <div className={[classes.TopSectionCommon, classes.TopSection_currency].join(' ')}>
                <TextField
                  className={classes.currencyLabel}
                  select
                  size='small'
                  value={serviceForm.currency}
                  onChange={(event) => onFormChangeHandler('currency', event.target.value)}
                >
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
                  value={serviceForm.price}
                  onChange={(event) => onFormChangeHandler('price', +event.target.value)}
                />
              </div>
              <TextField
                required
                className={[classes.TopSection_text, classes.TopSectionCommon].join(' ')}
                label={'Event Name'}
                size='small'
                type='text'
                value={serviceForm.name}
                onChange={(e) => onFormChangeHandler('name', e.target.value as string)}
              />
              <DateTimePicker
                label='Start Date and Time'
                value={serviceForm.startDate}
                onChange={(e) => {
                  if (e) onFormChangeHandler('startDate', new Date(e).toISOString());
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    size='small'
                    className={[classes.TopSection_startdate, classes.TopSectionCommon].join(' ')}
                  />
                )}
              />
              <DateTimePicker
                label='End Date and Time'
                value={serviceForm.endDate}
                onChange={(e) => {
                  if (e) onFormChangeHandler('endDate', new Date(e).toISOString());
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    size='small'
                    className={[classes.TopSection_enddate, classes.TopSectionCommon].join(' ')}
                  />
                )}
              />
              <Autocomplete
                disablePortal
                options={cities}
                value={serviceForm.city}
                onChange={(_, e) => {
                  // if (e) onFormChangeHandler('city', e.toString());
                  if (e) {
                    onFormChangeHandler('city', e.toString());
                    triggerCityChange(e.toString());
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='City'
                    required
                    className={[classes.TopSection_city, classes.TopSectionCommon].join(' ')}
                    // onBlur={triggerCityChange}
                    size='small'
                    value={serviceForm.city}
                    onChange={(e) => {
                      onFormChangeHandler('city', e.target.value);
                      triggerCityChange(e.target.value);
                    }}
                  />
                )}
              />
              <TextField
                label='State'
                disabled
                className={[classes.TopSection_state, classes.TopSectionCommon].join(' ')}
                size='small'
                value={serviceForm.state}
              />

              {plan !== undefined && category !== undefined && (
                <MUIAutoComplete
                  options={category}
                  onFormChangeHandler={onFormChangeHandler}
                  label='Category'
                  formKey='category'
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const { inputValue } = params;
                    const isExisting = options.some((option) => inputValue === option?.title);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push(inputValue);
                    }
                    return filtered;
                  }}
                  defaultValue={plan === 'pro' ? [category[0]] : category[0].value}
                />
              )}

              {profession !== undefined && (
                <Autocomplete
                  disablePortal
                  limitTags={2}
                  multiple
                  size='small'
                  options={profession}
                  onChange={(_, e) => {
                    if (e) onFormChangeHandler('profession', e as []);
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
                    <TextField
                      {...params}
                      label='Profession'
                      required
                      className={[classes.TopSection_category, classes.TopSectionCommon].join(' ')}
                      size='small'
                      value={serviceForm.profession}
                    />
                  )}
                />
              )}
              <TextField
                label='Venue'
                className={[classes.TopSection_venue, classes.TopSectionCommon].join(' ')}
                size='small'
                value={serviceForm.venue}
                onChange={(e) => onFormChangeHandler('venue', e.target.value)}
              />
              <TextField
                label='Max Audience Capacity'
                className={[classes.TopSection_maxCapacity, classes.TopSectionCommon].join(' ')}
                size='small'
                type='number'
                value={serviceForm.audienceCapacity}
                onChange={(e) => onFormChangeHandler('audienceCapacity', +e.target.value)}
              />
            </section>
            <TextField
              required
              multiline
              rows={2}
              className={classes.AboutSection}
              label='About The Event'
              size='small'
              value={serviceForm.about}
              onChange={(event) => onFormChangeHandler('about', event.target.value)}
            />
            {aboutEventError && <label className='error-red'>Please Enter About Events</label>}
            <label className={classes.HostDetailsLabel}>Event Location:</label>
            <RadioGroup
              aria-label='Host Details'
              defaultValue='Self'
              value={serviceForm.hostPoint}
              name='radio-buttons-group'
              className={classes.RadioGroup}
              row
            >
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
              value={serviceForm.hostType}
              name='radio-buttons-group'
              className={classes.RadioGroup}
              row
            >
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
                  value={serviceForm.aboutHost}
                  onChange={(event) => onFormChangeHandler('aboutHost', event.target.value)}
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
              value={serviceForm.termsAndConditions}
              onChange={(event) => onFormChangeHandler('termsAndConditions', event.target.value)}
            />
            {termsConditionError && <label className='error-red'>Please Enter Terms and Conditions</label>}
            <br />
            <Button className={'ThemeButtonBlack'} onClick={onFileUpload}>
              Upload Event
            </Button>
          </div>
        </LocalizationProvider>
      )}
    </>
  );
}
