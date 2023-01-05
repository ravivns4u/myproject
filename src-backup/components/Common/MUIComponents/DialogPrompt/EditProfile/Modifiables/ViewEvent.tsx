import React from 'react';
import classes from './Events.module.scss';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import { IAddEventFrontend } from '../../../../../../redux/interfaces/backend/apis/v2/events';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { FormControlLabel, RadioGroup, Radio } from '@mui/material';

interface EditEventProps {
  formData: IAddEventFrontend;
}
const currencyMap = {
  USD: '$',
  EUR: '€',
  INR: '₹',
};
export default function EditService(props: EditEventProps) {
  const { formData } = props;
  const [serviceForm, setServiceForm] = React.useState(formData);
  React.useEffect(() => {
    setServiceForm({ ...formData });
  }, [
    formData,
    formData.name,
    formData.about,
    formData.audienceCapacity,
    formData.price,
    formData.currency,
    formData.category,
  ]);
  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={[classes.EventGrid, classes.ThinScrollbar].join(' ')}>
        <section className={classes.TopSection}>
          <div
            className={[classes.DisplayImage, classes.TopSectionCommon].join(
              ' '
            )}>
            <React.Fragment>
              <Image
                src={serviceForm.imageUri ?? '/loading.png'}
                alt='Mountains'
                layout='fill'
                objectFit='contain'
                objectPosition={'center'}
              />
            </React.Fragment>
          </div>

          <div
            className={[
              classes.TopSectionCommon,
              classes.TopSection_currency,
            ].join(' ')}>
            <TextField
              className={classes.currencyLabel}
              disabled
              size='small'
              value={currencyMap[serviceForm.currency] ?? '$'}
            />
            <TextField
              disabled
              className={classes.currencyValue}
              label='Pricing'
              size='small'
              value={serviceForm.price ?? 10}
            />
          </div>
          <TextField
            disabled
            className={[classes.TopSection_text, classes.TopSectionCommon].join(
              ' '
            )}
            label={'Event Name'}
            size='small'
            type='text'
            value={serviceForm.name ?? ''}
          />
          <TextField
            disabled
            label='Start Date and Time'
            size='small'
            className={[
              classes.TopSection_startdate,
              classes.TopSectionCommon,
            ].join(' ')}
            value={new Date(serviceForm.startDate).toLocaleString() ?? ''}
          />
          <TextField
            disabled
            size='small'
            label='End Date and Time'
            value={new Date(serviceForm.endDate).toLocaleString() ?? ''}
            className={[
              classes.TopSection_enddate,
              classes.TopSectionCommon,
            ].join(' ')}
          />

          <TextField
            label='City'
            disabled
            className={[classes.TopSection_city, classes.TopSectionCommon].join(
              ' '
            )}
            size='small'
            value={serviceForm.city ?? ''}
          />

          <TextField
            label='State'
            disabled
            className={[
              classes.TopSection_state,
              classes.TopSectionCommon,
            ].join(' ')}
            size='small'
            value={serviceForm.state ?? ''}
          />
          <TextField
            disabled
            label='Category'
            required
            className={[
              classes.TopSection_category,
              classes.TopSectionCommon,
            ].join(' ')}
            size='small'
            value={serviceForm.category ?? ''}
          />

          <TextField
            label='Sub Category'
            className={[
              classes.TopSection_subCategory,
              classes.TopSectionCommon,
            ].join(' ')}
            size='small'
            value={serviceForm.profession ?? ''}
            disabled
          />
          <TextField
            label='Venue'
            className={[
              classes.TopSection_venue,
              classes.TopSectionCommon,
            ].join(' ')}
            size='small'
            value={serviceForm.venue ?? ''}
            disabled
          />
          <TextField
            label='Max Audience Capacity'
            className={[
              classes.TopSection_maxCapacity,
              classes.TopSectionCommon,
            ].join(' ')}
            size='small'
            type='number'
            value={serviceForm.audienceCapacity ?? 10}
            disabled
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
          disabled
        />
        <label className={classes.HostDetailsLabel}>Event Location:</label>
        <RadioGroup
          aria-label='Host Details'
          defaultValue='Self'
          value={serviceForm.hostPoint ?? 'In Person'}
          name='radio-buttons-group'
          className={classes.RadioGroup}
          row>
          <FormControlLabel
            value='In Person'
            control={<Radio color='secondary' disabled />}
            label='In Person'
          />
          <FormControlLabel
            value='Online'
            control={<Radio color='secondary' disabled />}
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
            control={<Radio disabled color='secondary' />}
            label='Self'
          />
          <FormControlLabel
            value='Other'
            control={<Radio disabled color='secondary' />}
            label='Other'
          />
        </RadioGroup>
        <React.Fragment>
          <TextField
            disabled
            multiline
            rows={2}
            className={classes.AboutSection}
            label='About The Host'
            size='small'
            value={serviceForm.aboutHost ?? ''}
          />
        </React.Fragment>

        <TextField
            sx={{mt:2}}
          disabled
          multiline
          rows={4}
          className={classes.AboutSection}
          label='Terms and Conditions'
          size='small'
          value={serviceForm.termsAndConditions ?? ''}
        />
      </div>
    // </LocalizationProvider>
  );
}
