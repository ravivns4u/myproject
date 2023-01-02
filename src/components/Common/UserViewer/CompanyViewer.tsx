import Avatar from '@mui/material/Avatar';
import React from 'react';
import DisplayField from '../DisplayField/DisplayField';
import classes from './UserViewer.module.scss';

export interface ICompanyAdminView {
  publicUri: string;
  achievements: string;
  bio: string;
  companyAddress: string;
  companyName: string;
  displayName: string;
  email: string;
  isAdmin?: boolean;
  phone: string;
  socialMediaLink: string;
  specificRequests: string;
  tieupDetails: string;
  uid: string;
  userType: string;
  website: string;
}

export default function UserViewer(props: ICompanyAdminView) {
  const {
    publicUri,
    bio,
    displayName,
    email,
    isAdmin,
    phone,
    companyAddress,
    companyName,
    tieupDetails,
    socialMediaLink,
    specificRequests,
    uid,
    userType,
    achievements,
    website,
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
          label={'Company Name'}
          value={companyName ?? 'danche@gmail.com'}
        />
        <DisplayField
          label={'Tie Up Details'}
          value={tieupDetails ?? 'danche@gmail.com'}
        />

        <DisplayField
          label={'Achievements'}
          value={achievements ?? 'danche@gmail.com'}
        />
        <DisplayField
          label={'Address'}
          value={companyAddress ?? 'danche@gmail.com'}
        />

        <DisplayField
          label={'is Admin:'}
          value={`${isAdmin ? 'TRUE' : 'FALSE'}`}
        />
        <DisplayField label={'Phone Number'} value={phone} />
        <DisplayField label={'Social Media Link'} value={socialMediaLink} />
        <DisplayField label={'Specific Requests'} value={specificRequests} />
        <DisplayField label={'UID'} value={uid} />
        <DisplayField label={'User Type'} value={userType} />
        <DisplayField label={'Website'} value={website} />
      </div>
    </React.Fragment>
  );
}
