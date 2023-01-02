import React from 'react';
import classes from './EditProfile.module.scss';

import { updateValidationIndividual } from '../../../../../lib/frontend/validateNativeForm';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MuiPhoneNumber from 'material-ui-phone-number';
import Button from '@mui/material/Button';

import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShareIcon from '@mui/icons-material/Share';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

import type { CombinedUserCompanySchema } from '../../../../../redux/interfaces/frontend/user';
import type { GeoAPIResponseInterface } from '../../../../../redux/interfaces/backend/geo';

import { useAppDispatch, useAppSelector } from '../../../../../redux/app/hooks';
import { updateNotification } from '../../../../../redux/slices/notifications';
import { getUserDetails } from '../../../../../redux/slices/user';
import { ResponseParams } from '../../../../../redux/interfaces/backend/apiHandlers';

import { updateLoading } from '../../../../../redux/slices/signup';
const maxMultilineRows = 3;
import type { ExpectedUpdaeUserPayload } from '../../../../../redux/interfaces/backend/apis/UpdateUser';
import { createFilterOptions } from '@mui/material';
import { getNotifications } from '../../../../../redux/slices/feedsNotification';
interface Props {
  user: CombinedUserCompanySchema;
  closeModal?: () => void;
}

const filter = createFilterOptions();

export default function EditFormIndividual(props: Props) {
  const { user, closeModal } = props;
  const dispatch = useAppDispatch();
  const [isMounted, setMounted] = React.useState(true);
  const [categories, setCategories] = React.useState([]);
  const [profession, setProfession] = React.useState([]);
  const [languages, setLanguages] = React.useState([] as string[]);
  const {
    signup: { loading },
    user: {
      firebaseToken,
      user: { plan },
    },
  } = useAppSelector((state) => state);
  const [formFields, setFormFields] = React.useState<CombinedUserCompanySchema>(user);
  const formChangeHandler = (value: any, field: string) => {
    if (isMounted) setTouched(true);
    if (isMounted)
      setFormFields({
        ...formFields,
        [field]: value,
      });
  };

  React.useEffect(() => {
    fetch('/api/v2/languages').then((res) =>
      res
        .json()
        .then((data: ResponseParams) => {
          setCategories(data.payload.category);
          setProfession(data.payload.profession);
          setLanguages(data.payload.languages);
        })
        .catch((error) => console.log(error))
    );
  }, []);

  React.useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  React.useEffect(() => {
    const fetchGeoData = () => {
      fetch('/api/geo').then((res) =>
        res.json().then((data) => {
          const { cities } = data as GeoAPIResponseInterface;
          if (isMounted) setCities(cities);
        })
      );
    };
    fetchGeoData();
  }, [isMounted]);

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
            setState(state);
            setFormFields({ ...formFields, state, city: cityList });
          })
          .catch((error) => console.log('Unexpected Error occured'))
      )
      .catch((error) => console.log('Unexpected Error occured'));
  };

  const [state, setState] = React.useState(formFields.state ?? '');
  const [cities, setCities] = React.useState<string[]>([]);
  const [touched, setTouched] = React.useState(false);
  const errors = updateValidationIndividual(formFields, touched);
  const [bioError, setBioError] = React.useState(false);

  const showCategories = React.useMemo(() => {
    if (formFields !== undefined) {
      if (plan !== 'pro') {
        // @ts-ignore
        return formFields?.categories[0];
      }
      return formFields?.categories;
    }
  }, [plan, formFields]);

  const onClickHandler = async () => {
    if (formFields.bio === '') {
      setBioError(true);
    } else {
      closeModal && closeModal();
      if (loading) {
        dispatch(
          updateNotification({
            status: 'pending',
            message: 'Please wait for the update process to complete.',
            title: 'Processing',
            show: true,
          })
        );
        return;
      }
      const eKeys = Object.keys(errors);
      if (eKeys.length) {
        dispatch(
          updateNotification({
            status: 'error',
            message: 'Please fix the errors in the form before submitting.',
            title: 'Invalid Form Data',
            show: true,
          })
        );
        return;
      }
      dispatch(updateLoading({ loading: true }));
      dispatch(
        updateNotification({
          status: 'pending',
          message: 'Please wait for the operation to complete!',
          title: 'Uploading',
          show: true,
        })
      );
      const body: ExpectedUpdaeUserPayload = {
        firebaseToken: firebaseToken,
        updatedUserData: formFields,
      };

      fetch('/api/update-user-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.error) {
            dispatch(updateLoading({ loading: false }));
            dispatch(
              updateNotification({
                status: 'error',
                message: 'Update Operation Failed!',
                title: 'Error',
                show: true,
              })
            );
          } else {
            dispatch(updateLoading({ loading: false }));
            dispatch(
              updateNotification({
                message: 'Profile Update Successful!',
                show: true,
                status: 'success',
                title: 'Success',
              })
            );
            closeModal && closeModal();
            const payload = { uid: user.uid };
            dispatch(getUserDetails({ firebaseToken: firebaseToken }));
            dispatch(getNotifications({ firebaseToken, payload }));
          }
        })
        .catch((error) => {
          console.log('Error = ', error);
          dispatch(updateLoading({ loading: false }));
          dispatch(
            updateNotification({
              status: 'error',
              message: 'Update Operation Failed!',
              title: 'Error',
            })
          );
        });
    }
  };

  return (
    <div className={classes.FormContent}>
      <div className={[classes.LoginColumn].join(' ')}>
        <div className={classes.LoginRowGrid}>
          <PersonIcon />
          <TextField
            required
            className={classes.FormInputField}
            label='Full Name'
            size='small'
            type='text'
            value={formFields.displayName}
            onChange={(e) => formChangeHandler(e.target.value, 'displayName')}
            error={errors.displayName !== undefined}
            helperText={errors.displayName}
          />
        </div>

        <div className={classes.LoginRowGrid}>
          <MailIcon />
          <TextField
            required
            className={classes.FormInputField}
            label='Email Address'
            size='small'
            type='email'
            value={formFields.email}
            disabled={true}
            onChange={(e) => formChangeHandler(e.target.value, 'email')}
          />
        </div>

        <div className={classes.LoginRowGrid}>
          <LocalPhoneIcon />
          <MuiPhoneNumber
            variant='outlined'
            name='phone'
            data-cy='user-phone'
            required
            className={classes.FormInputField}
            label='Phone Number'
            size='small'
            disabled={true}
            defaultCountry={'in'}
            value={formFields.phone}
            onChange={(e) => formChangeHandler(e.toString(), 'phone')}
            sx={{
              svg: {
                height: '20px',
              },
            }}
          />
        </div>

        <div className={classes.LoginRowGrid}>
          <ShareIcon />
          <TextField
            className={classes.FormInputField}
            label='Social Media Links'
            size='small'
            type='text'
            multiline
            value={formFields.socialMediaLink}
            error={errors.socialMediaLink !== undefined}
            helperText={errors.socialMediaLink}
            onChange={(e) => {
              formChangeHandler(e.target.value, 'socialMediaLink');
            }}
            maxRows={maxMultilineRows}
          />
        </div>

        <div className={classes.LoginRowGrid}>
          <CorporateFareIcon />
          <Autocomplete
            disablePortal
            options={['Workshop/Training', 'Social Media Promotion', 'Our Tie Ups', 'Networking']}
            value={formFields.serviceTypes}
            onChange={(_, e) => {
              if (e) formChangeHandler(e.toString(), 'serviceTypes');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Services you are looking for'
                className={classes.FormInputField}
                size='small'
                value={formFields.serviceTypes}
                onChange={(e) => {
                  formChangeHandler(e.target.value, 'serviceTypes');
                }}
              />
            )}
          />
        </div>

        <div className={classes.LoginRowGrid}>
          <CorporateFareIcon />
          <TextField
            className={classes.FormInputField}
            label='Any Other Specific Requests?'
            size='small'
            type='text'
            multiline
            maxRows={maxMultilineRows}
            value={formFields.specificRequests}
            onChange={(e) => formChangeHandler(e.target.value, 'specificRequests')}
          />
        </div>
        <div className={classes.LoginRowGrid}>
          <CorporateFareIcon />
          <TextField
            className={classes.FormInputField}
            label='Languages you speak'
            size='small'
            type='text'
            value={formFields.languages ?? ''}
            onChange={(e) => formChangeHandler(e.target.value, 'languages')}
          />
        </div>
        <div className={classes.LoginRowGrid}>
          <PersonIcon />
          <TextField
            required
            className={classes.FormInputField}
            label='Certifications'
            size='small'
            type='text'
            value={formFields.certifications ?? ''}
            onChange={(e) => formChangeHandler(e.target.value, 'certifications')}
            error={errors.displayName !== undefined}
            helperText={errors.displayName}
          />
        </div>
      </div>
      <div className={[classes.LoginColumn].join(' ')}>
        <div className={classes.LoginRowGrid}>
          <CorporateFareIcon />
          <Autocomplete
              sx={{minWidth:'260px'}}
            disablePortal
            limitTags={2}
            multiple
            options={profession}
            onChange={(_, e) => {
              if (e) formChangeHandler(e as [], 'profession');
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options.some((option) => inputValue === option?.title);
              if (inputValue !== '' && !isExisting) {
                filtered.push(inputValue);
              }
              return filtered;
            }}
            defaultValue={formFields?.profession}
            value={formFields?.profession}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Profession'
                required
                className={[classes.TopSection_category, classes.TopSectionCommon].join(' ')}
                size='small'
                value={formFields.profession}
              />
            )}
          />

          {/* <Autocomplete
            disablePortal
            options={profession}
            multiple={true}
            limitTags = {2}
            value={formFields.profession}
            defaultValue={formFields.profession}
            onChange={(_, e) => {
              if (e) formChangeHandler(e as [], "profession");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Profession"
                className={classes.FormInputField}
                size="small"
                value={formFields.profession}
              />
            )}
          /> */}
        </div>
        <div className={classes.LoginRowGrid}>
          <CorporateFareIcon />
          <Autocomplete
            sx={{minWidth:'260px'}}
            disablePortal
            options={categories}
            limitTags={2}
            multiple={user?.plan !== undefined && user?.plan === 'pro'}
            disabled={user?.plan !== undefined && user?.plan !== 'pro'}
            defaultValue={showCategories}
            value={showCategories}
            onChange={(_, e) => {
              if (e) formChangeHandler(e, 'categories');
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options.some((option) => inputValue === option?.title);
              if (inputValue !== '' && !isExisting) {
                filtered.push(inputValue);
              }
              return filtered;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Category'
                className={classes.FormInputField}
                size='small'
                value={formFields.categories}
              />
            )}
          />
        </div>
        <div className={classes.LoginRowGrid}>
          <CorporateFareIcon />
          <Autocomplete
            disablePortal
            options={['Beginner', 'Intermediate', 'Expert']}
            value={formFields.professionType}
            onChange={(_, e) => {
              if (e) formChangeHandler(e.toString(), 'professionType');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Level of Profession'
                className={classes.FormInputField}
                size='small'
                value={formFields.professionType}
                onChange={(e) => formChangeHandler(e.target.value, 'professionType')}
              />
            )}
          />
        </div>

        <div className={classes.LoginRowGrid}>
          <LocationCityIcon />
          <Autocomplete
            disablePortal
            options={cities}
            value={formFields.city}
            onChange={(_, e) => {
              if (e) {
                formChangeHandler(e.toString(), 'city');
                triggerCityChange(e.toString());
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='City'
                required
                className={classes.FormInputField}
                // onBlur={triggerCityChange}
                size='small'
                value={formFields.city}
                onChange={(e) => {
                  formChangeHandler(e.target.value, 'city');
                  triggerCityChange(e.target.value);
                }}
              />
            )}
          />
        </div>

        <div className={classes.LoginRowGrid}>
          <LocationOnIcon />
          <TextField disabled label='State' className={classes.FormInputField} size='small' value={state} />
        </div>

        <div className={classes.LoginRowGrid}>
          <BusinessCenterIcon />
          <TextField
            className={classes.FormInputField}
            label='Work Experience'
            size='small'
            type={'number'}
            value={formFields.workExperience}
            onChange={(e) => formChangeHandler(+e.target.value, 'workExperience')}
            InputProps={{
              endAdornment: <label>Years</label>,
            }}
          />
        </div>

        <div className={classes.LoginRowGrid}>
          <CorporateFareIcon />
          <TextField
            className={classes.FormInputField}
            label='Your Achievements'
            size='small'
            type='text'
            value={formFields.achievements}
            error={errors.achievements !== undefined}
            helperText={errors.achievements}
            onChange={(e) => formChangeHandler(e.target.value, 'achievements')}
            multiline
            maxRows={maxMultilineRows}
          />
        </div>

        <div className={classes.LoginRowGrid}>
          <CorporateFareIcon />
          <TextField
            className={classes.FormInputField}
            label='Bio'
            size='small'
            type='text'
            value={formFields.bio}
            onChange={(e) => formChangeHandler(e.target.value, 'bio')}
            multiline
            maxRows={maxMultilineRows}
          />
        </div>
        {bioError && (
          <span className={'error-red'} style={{ marginLeft: '30px' }}>
            Please Fill Bio
          </span>
        )}
      </div>
      <div className={classes.SaveButtonWidget}>
        <Button onClick={onClickHandler} className={['ThemeButtonBlack', classes.SaveButton].join(' ')}>
          Save
        </Button>
      </div>
      <br />
    </div>
  );
}
