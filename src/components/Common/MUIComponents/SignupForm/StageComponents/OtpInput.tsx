import React, { ReactElement } from 'react';
import classes from './StagesComponents.module.scss';
import OTP from 'react-otp-input';

interface Props {
  totalDigits?: number;
  onChange: (otp: number[]) => void;
  otp: number[];
  hideOtpLabel?: boolean;
}

export default function OtpInput({
  totalDigits,
  otp,
  onChange,
  hideOtpLabel,
}: Props): ReactElement {
  const digits = totalDigits ?? 6;
  const [otpVal, setOtp] = React.useState(otp.join(''));

  return (
    <React.Fragment>
      <OTP
        inputStyle={classes.OTPInpBx}
        numInputs={6}
        value={otpVal}
        onChange={(value: string) => {
          onChange(value.split('').map((e) => +e));
          setOtp(value);
        }}
        separator={<div className={classes.OTPGap}></div>}
      />
      {!hideOtpLabel && <label className={classes.OTPHeader}>OTP</label>}
    </React.Fragment>
  );
}
