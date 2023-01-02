import React, { ReactElement } from 'react';
import classes from './Signup.module.scss';
import Avatar from '@mui/material/Avatar';
import StageNavigator from './StageComponents/StageNavigator';
import AuthorityType from './StageComponents/AuthorityType';
import IndividualForm from './StageComponents/Individual';
import type { GeoAPIResponseInterface } from '../../../../redux/interfaces';

interface Props {}
const totalSteps = 3;

export default function MerchantsSignup({}: Props): ReactElement {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isIndividual, setIndividual] = React.useState(true);
  const [states, setStates] = React.useState<string[]>([]);
  const [cities, setCities] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchGeoData = () => {
      fetch('/api/geo').then((res) =>
        res.json().then((data) => {
          const { states, cities } = data as GeoAPIResponseInterface;
          setStates(states);
          setCities(cities);
        })
      );
    };
    fetchGeoData();
  }, []);

  const onIndividualChangeHandler = (value: boolean) => setIndividual(value);
  const StageComponents = [
    <AuthorityType
      key={'AuthorityType'}
      setIndividual={onIndividualChangeHandler}
      isIndividual={isIndividual}
    />,
    isIndividual ? (
      <IndividualForm
        key={'Form-Individual'}
        states={states}
        cities={cities}></IndividualForm>
    ) : (
      <div key={'Form-All'}>Organisation Form</div>
    ),
    <div key='33d'>Just</div>,
  ];

  return (
    <div className={classes.LoginColumn}>
      <br />
      <Avatar
        variant={'rounded'}
        src={'/logo-dark.png'}
        alt='break-free logo'
        style={{
          width: 80,
          height: 80,
        }}
      />
      <h1 className={classes.Headers}>Tell us more about Yourself...</h1>
      {StageComponents[activeStep]}

      <StageNavigator
        activeStep={activeStep}
        totalSteps={totalSteps}
        setActiveStep={(newStep) => setActiveStep(newStep)}
      />
    </div>
  );
}
