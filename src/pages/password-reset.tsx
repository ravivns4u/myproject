import React, { ReactElement } from 'react';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import Client from '../firebase/firebase_client_exports';

export async function getStaticProps() {
  return { props: { isDark: true } };
}

export default function PasswordReset(): ReactElement {
  return (
    <div
      style={{ backgroundColor: 'red', color: 'black' }}
      onClick={() => {
        const actionCode =
          'Uh0L94WZW7PrHeuaJDd-sVitI4DWsanG2lCuVTT7SHMAAAF-YgU31g';
        verifyPasswordResetCode(Client.auth, actionCode)
          .then((email) => {
            const newPassword = 'ShivamSahilLetsDoIt';

            // Save the new password.
            confirmPasswordReset(Client.auth, actionCode, newPassword)
              .then((resp) => {
                console.log('Success');
              })
              .catch((error) => {
                console.log('Failed in second step');
              });
          })
          .catch((error) => {
            console.log('Error happened');
          });
      }}>
      Click And Reset
    </div>
  );
}
