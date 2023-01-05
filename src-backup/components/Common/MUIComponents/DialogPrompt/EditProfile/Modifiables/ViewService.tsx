import React from 'react';
import classes from './Modifiables.module.scss';
import TextField from '@mui/material/TextField';
import type { ServiceRequestForm } from '../../../../../../redux/interfaces/backend/apis/servicePortfolio';
import Image from 'next/image';

import { FormControlLabel, RadioGroup, Radio } from '@mui/material';
interface EditServiceProps {
  formState: ServiceRequestForm;
}

export default function EditService(props: EditServiceProps) {
  const { formState } = props;
  const [serviceForm, setServiceForm] =
    React.useState<ServiceRequestForm>(formState);
  const [file, setFile] = React.useState<any>({
    preview: serviceForm.serviceImageLoc ?? '/loading.png',
  });
  React.useEffect(() => {
    setFile({
      preview: formState.serviceImageLoc ?? '/loading.png',
    });
  }, [formState.serviceImageLoc]);

  React.useEffect(() => {
    setServiceForm({ ...formState });
    setFile({
      preview: formState.serviceImageLoc ?? '/loading.png',
      file: { type: formState.serviceFileType },
    });
  }, [
    formState.serviceName,
    formState.serviceDescription,
    formState.servicePricing,
    formState.serviceState,
    formState.serviceCity,
    formState.category,
    formState.profession,
    formState.serviceDescription,
    formState.serviceFileType,
    formState,
  ]);
  return (
    <React.Fragment>
      <div className={classes.EventGrid}>
        <TextField
          disabled
          className={[classes.service, classes.service_name].join(' ')}
          label={'Service Name'}
          size='small'
          type='text'
          value={serviceForm.serviceName ?? ''}
        />
        <TextField
          disabled
          className={[classes.service, classes.service_duration].join(' ')}
          label='Category'
          size='small'
          type='text'
          value={serviceForm.category ?? ''}
        />

        <TextField
          disabled
          className={[classes.service, classes.service_state].join(' ')}
          label='Preferred Language'
          size='small'
          type='text'
          value={serviceForm.serviceLanguage ?? 'English'}
        />

        <TextField
          disabled
          className={[classes.service, classes.service_city].join(' ')}
          label='Service City'
          size='small'
          type='text'
          value={serviceForm.serviceCity ?? '20th Nov 2021, Monday'}
        />

        <TextField
          disabled
          className={[classes.service, classes.service_pricing].join(' ')}
          label='Gender'
          size='small'
          type='text'
          value={serviceForm.servicePricing ?? ''}
        />

        <TextField
          disabled
          className={[classes.service, classes.service_maxAudience].join(' ')}
          label='Profession'
          size='small'
          value={serviceForm.profession ?? ''}
        />
        <div
          className={[classes.service, classes.service_uploadcanves].join(' ')}>
          <React.Fragment>
            <div className={classes.ImageContainer}>
              <Image
                src={file.preview}
                alt={'preview service'}
                height={330}
                width={888}
                objectFit='contain'
                objectPosition='center'
              />
            </div>
          </React.Fragment>
        </div>
        <TextField
          disabled
          className={[classes.service, classes.service_description].join(' ')}
          label='Service Details'
          size='small'
          type='text'
          multiline
          rows={4}
          value={serviceForm.serviceDescription ?? ''}
        />
        <div className={[classes.service, classes.service_panIndia].join(' ')}>
          <label>PAN India: </label>
          <RadioGroup
            aria-label='Host Details'
            defaultValue={true}
            value={serviceForm.panIndia}
            name='radio-buttons-group'
            className={classes.RadioGroup}
            row>
            <FormControlLabel
              value={true}
              control={<Radio color='secondary' disabled />}
              label='Yes'
            />
            <FormControlLabel
              value={false}
              control={<Radio disabled color='secondary' />}
              label='No'
            />
          </RadioGroup>
          <div
            className={[
              classes.TopSectionCommon,
              classes.TopSection_currency,
            ].join(' ')}>
            <TextField
              className={classes.currencyLabel}
              disabled
              size='small'
              value={serviceForm.currency ?? 'INR'}></TextField>
            <TextField
              disabled
              className={classes.currencyValue}
              label='Pricing'
              size='small'
              type='number'
              value={serviceForm.servicePricing ?? ''}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
