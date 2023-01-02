import React from 'react';
import DisplayField from '../DisplayField/DisplayField';
import classes from './UserViewer.module.scss';
import Avatar from '@mui/material/Avatar';

export interface IUserAdminView {
  publicUri: string;
  achievements: string;
  bio: string;
  city: string;
  displayName: string;
  email: string;
  isAdmin: boolean;
  phone: string;
  profession: string;
  professionType: string;
  serviceTypes: string;
  socialMediaLink: string;
  specificRequests: string;
  state: string;
  uid: string;
  userType: string;
  workExperience: number;
  languages: string;
}

export default function UserViewer(props: IUserAdminView) {
  const {
    publicUri,
    bio,
    displayName,
    email,
    isAdmin,
    phone,
    professionType,
    serviceTypes,
    socialMediaLink,
    specificRequests,
    uid,
    userType,
    workExperience,
    achievements,
    state,
    city,
    profession,
    languages,
  } = props;
  return (
    <React.Fragment>
      <div className={classes.FirstHalf}>
        <Avatar
          className={classes.CircularAvatar}
          alt={'user profile'}
          src={publicUri === '' ? '/portfolio/person.png' : publicUri}
        />
        <label className={classes.bio}>
          {bio ??
            'Software Engineer at XYZ. Working with GE HealthCare from 3 years.'}
        </label>
      </div>
      <div className={classes.SecondHalf}>
        <DisplayField label={'Name'} value={displayName ?? 'Chuck Norris'} />
        <DisplayField label={'Email'} value={email ?? 'danche@gmail.com'} />
        <DisplayField
          label={'Achievements'}
          value={achievements ?? 'danche@gmail.com'}
        />
        <DisplayField label={'State'} value={state ?? 'danche@gmail.com'} />
        <DisplayField label={'City'} value={city ?? 'danche@gmail.com'} />
        <DisplayField
          label={'Profession'}
          value={profession ?? 'danche@gmail.com'}
        />
        <DisplayField
          label={'is Admin'}
          value={`${isAdmin ? 'TRUE' : 'FALSE'}`}
        />
        <DisplayField label={'Phone Number'} value={phone} />
        <DisplayField label={'Profession Type'} value={professionType} />
        <DisplayField label={'Service Types'} value={serviceTypes} />
        <DisplayField label={'Social Media Link'} value={socialMediaLink} />
        <DisplayField label={'Specific Requests'} value={specificRequests} />
        <DisplayField label={'Work Experience'} value={`${workExperience}`} />
        <DisplayField label={'Known Languages'} value={languages} />
      </div>
    </React.Fragment>
  );
}
