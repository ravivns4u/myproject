import { Box, Typography, TextField, Button } from '@mui/material';
import React, { useState, useRef } from 'react';
import SignaturePad from 'react-signature-canvas';
import { ref, uploadBytes } from 'firebase/storage';
import Client from '../../../../../firebase/firebase_client_exports';
import { useAppSelector } from '../../../../../redux/app/hooks';
import jsPDF from 'jspdf';
import Popup from 'reactjs-popup';
import Footer from '../../../../Footer/Footer';
import { toast } from 'react-toastify';
import { updateMerchant } from '../../../../../redux/slices/subscription';
import { useDispatch } from 'react-redux';
import router from 'next/router';
import { getUserDetails } from '../../../../../redux/slices/user';
const MerchantNda = () => {
  const plan = router.asPath.split('/')[4];
  const dispatch = useDispatch();
  const [inputField, setInputField] = useState({
    buyer: '',
    seller: '',
    nda: '',
    // recepient: '',
    // recepient_by: '',
    by:'',
    recepient_name: '',
    recepient_title: ''
  });
  //  This page css design in _page file in global css;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  const todayDate = dd + '-' + mm + '-' + yyyy;

  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url
  const [date, setDate] = useState(todayDate);
  const [hide, setHide] = useState(true);
  const { uid, firebaseToken } = useAppSelector((state) => state.user);
  const [uploadedFile, setUploadedFile] = React.useState('Uploading...');
  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();
  const save = () => {
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
  };
  const { merchantSlug } = useAppSelector((state) => state.user);
  const ndaSigned = () => {
    const payload: any = {
      payload: {
        uid: uid,
        ndaSigned: true,
      },
      firebaseToken: firebaseToken,
    };
    fetch('/api/payments/nda-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(getUserDetails({ firebaseToken }));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const generatePDF = () => {
    var doc = new jsPDF('p', 'pt', 'a4', true);
    doc.html(document.querySelector('#content') as HTMLElement, {
      x: 10,
      y: 100,
      html2canvas: {
        scale: 0.33,
      },
      callback: function (pdf) {
        var blob = pdf.output('blob');
        const file = new File([blob], 'merchant-nda', {
          type: 'application/pdf',
          lastModified: new Date().getTime(),
        });
        if (imageURL !== null) {
          const ts = new Date().getTime();
          const storageRef = ref(
            Client.storage,
            `/db-dev/user-metadata/merchant/merchant-forms/${uid}/${file.name}_${ts}`
          );

          uploadBytes(storageRef, file, {
            contentType: file.type,
          }).then((snapshot) => {
            const uploadPayload: any = {
              fileName: file.name,
              fullPath: snapshot.metadata.fullPath,
              generation: snapshot.metadata.generation,
              uid: uid,
              fp: `${file.name}_${ts}`,
            };
            const payload: any = {
              payload: uploadPayload,
              firebaseToken: firebaseToken,
              modification: false,
            };
            fetch('/api/portfolio/upload-pdf', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            })
              .then((response) => {
                response.json().then((data) => {
                  dispatch(updateMerchant({ isMerchants: true }));
                  if (!data.error) {
                    toast.success(data.msg, {
                      position: 'bottom-center',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    router.push(`/merchants/${merchantSlug}/payment/${plan}`);
                  } else {
                    toast.error(data.error, {
                      position: 'top-right',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                  ndaSigned();
                });
              })
              .catch((error) => {
                toast.error('Upload Failed. Kindly Retry', {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              });
          });
        } else {
          toast.error('Please upload signature', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      },
    });
  };

  const handlChange = (e: any) => {
    inputField[e.target.name] = e.target.value;
    if (
      inputField.buyer.length === 0 ||
      inputField.seller.length === 0 ||
      inputField.nda.length === 0 ||
      inputField.buyer.length <= 5 ||
      inputField.seller.length <= 5 ||
      inputField.nda.length <= 5 || 
      inputField.by.length === 0 ||
      inputField.recepient_name.length === 0 ||
      inputField.recepient_title.length === 0
    ) {
      setHide(true);
    } else {
      setHide(false);
    }
    setInputField({
      ...inputField,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Box>
        <Box id='content' className='padding-custom'>
          <Box sx={{ width: '100%' }}>
            <Typography variant='h4' component='div' gutterBottom>
              <b>
                <u>MERCHANT NON-DISCLOSURE AGREEMENT</u>
              </b>
            </Typography>

            <Typography variant='body1' gutterBottom>
              This Merchant Non-disclosure Agreement (“Agreement”) is made and entered into as of &nbsp; &nbsp;
              <TextField id='standard-basic' type='text' variant='standard' required name='date' value={date} className="padding-0"/>
              by and between &nbsp; &nbsp;
              <TextField
                id='standard-basic'
                variant='standard'
                name='buyer'
                value={inputField.buyer}
                onChange={handlChange}
                placeholder="Name of the Individual/Company"
                style={{width:"280px"}}
                className="padding-0"
              />{' '}
               a&nbsp;
              <TextField
                id='standard-basic'
                variant='standard'
                name='seller'
                value={inputField.seller}
                onChange={handlChange}
                placeholder="Individual/Company"
                className="padding-0"
              />
              , the principal address of which is &nbsp; &nbsp;
              <TextField
                id='standard-basic'
                variant='standard'
                name='nda'
                value={inputField.nda}
                onChange={handlChange}
                placeholder="Home/Office Address"
                className="padding-0"
              />
              , (“Recipient”) and SS BREAK FREE LLP , a LLP corporation, incorporated under the Limited liability
              Partnership Act, 2008 , the principal address of which is SECOND FLOOR, HOUSE NUMBER 356, SECTOR 45 ,
              GURGAON, HARYANA, 122003 is the intention of the parties to this Agreement to facilitate discussions
              regarding possible transactions between the parties by the protection from unauthorized disclosure or use
              of the Confidential Information (defined below). Therefore, the parties agree as follows:
              <br />
              <br />
              1. For the purposes of this Agreement, “Confidential Information” shall mean any information disclosed by
              Break Free, whether in writing, orally, visually or otherwise, including but not limited to business
              plans, contractual, engineering, financial, sales, marketing and operational information, product specifications, technical data, trade secrets, know-how, ideas, subscription charges , platform charges, website
              details, subscription benefits and concepts of Break Free or third parties. Confidential Information
              excludes, however, information which :<br />
              (i) is or becomes known or available to Recipient without restriction from a source other than Break Free
              with a legal right to disclose the same to Recipient
              <br />
              (ii) is or without violating the terms of this Agreement becomes, generally available to the public or
              <br />
              (iii) is developed by Recipient independently of the information disclosed hereunder
              <br />
              <br />
              2. With respect to all Confidential Information disclosed hereunder, Recipient agrees that from and after
              the date of this Agreement, Recipient shall not: a) use the Confidential Information except for purposes of
              its business relationship with Break Free (the “Authorized Purpose”) or
              <br /> b) disclose the Confidential Information to any third party except:
              <br />
              (i) as may be authorized in writing in advance by an of er of Break Free. <br />
              <br />
              3. Recipient shall require its Representatives who receive any Confidential Information to comply with the
              terms and conditions of this Agreement and Recipient shall be responsible for their compliance herewith.
              Recipient shall use at least the same degree of care to protect the confidentiality and ensure the proper
              use of the Confidential Information as Recipient uses with respect to its information of a similar kind or
              nature, but in no event less than reasonable care. <br />
              <br />
              4. Break Free grants no rights in or to the Confidential Information. All Confidential Information shall
              remain the sole property of Break Free. 5. No contract or agreement providing for any transaction or any
              commitment to enter into a transaction shall be deemed to exist by reason of this Agreement
              <br />
              <br />
              6. Any provision to the contrary notwithstanding, Recipient’s obligations under this Agreement are subject
              to any disclosure requirement of law, regulation or legal process, but only to the extent of such
              requirement. Recipient shall promptly notify Break Free of any such requirement, cooperate fully with
              Break Free’s requests to prevent or minimise the effect of such disclosure, and make all reasonable
              efforts to have such disclosures placed under a protective order or otherwise obtain confidential treatment
              of the Confidential Information.
              <br />
              <br />
              7. THE CONFIDENTIAL INFORMATION IS DISCLOSED “AS IS” WITHOUT ANY REPRESENTATION, WARRANTY, ASSURANCE,
              GUARANTEE, OR INDUCEMENT OF ANY KIND, INCLUDING WITHOUT LIMITATION ANY EXPRESS OR IMPLIED WARRANTY OF
              COMPLETENESS, ACCURACY, MERCHANTABILITY, SUITABILITY, NON- INFRINGEMENT OR FITNESS FOR PURPOSE.
              <br />
              <br />
              8. Upon Break Free’s written request, Recipient shall promptly:
              <br /> (i) deliver to Break Free and cease to use all Confidential Information in Recipient’s (including
              its Representatives) possession, custody or control or
              <br /> (ii) destroy the same and delete all electronic records containing the Confidential Information,
              provided that Break Free may require Recipient to certify in writing such destruction and deletion.
              <br />
              <br />
              9. Recipient agrees that money damages would not be a sufficient remedy for breach of this Agreement and
              that, in addition to all other remedies, Break Free shall be entitled to specific performance and
              injunctive or other equitable relief as a remedy for such breach.
              <br />
              <br /> 10. This Agreement sets forth the complete and exclusive statement of the parties agreement with
              respect to the subject matter hereof. This Agreement may not be waived or modified except pursuant to a
              written agreement signed by the parties. Any waiver or forbearance on one occasion shall have no effect on
              any other occasion.
              <br />
              <br />
              11. Any provision hereof which is found to be unenforceable or contrary to applicable law shall be deemed
              stricken from this Agreement and the other terms and conditions hereof shall remain in full force and
              effect.
              <br />
              <br />
              12. This Agreement shall bind and benefit the parties and their respective successors and assigns.
              Recipient’s obligations under this Agreement shall survive any termination hereof.
              <br />
              <br /> 13. This Agreement shall be governed by the laws applicable (excluding its conflicts-of-laws
              principles). The parties consent to the jurisdiction of the state and federal courts situated in NEW
              DELHI- NCR .<br />
              <br />
              Executed on the dates set forth below but effective as of the date rst written above.
              <br />
              <br />
            </Typography>
            <Box>
              <Popup
                className='customPopup'
                modal
                trigger={
                  <button
                    style={{
                      color: '#efc753',
                      maxWidth: '200px',
                      padding: '10px 20px',
                      fontFamily: 'Poppins',
                      fontSize: '16px',
                      fontWeight: '600',
                      backgroundColor: '#000',
                    }}
                  >
                    Client Signature
                  </button>
                }
                closeOnDocumentClick={false}
              >
                {(close: any) => (
                  <>
                    <SignaturePad penColor='green' ref={sigCanvas} canvasProps={{ className: 'customCanvas' }} />
                    <div className='btns-wrp'>
                      <button
                        onClick={() => {
                          save();
                          close();
                        }}
                      >
                        Save
                      </button>
                      <button onClick={clear}>Clear</button>
                      <button onClick={close}>Close</button>
                    </div>
                  </>
                )}
              </Popup>
              <br />
              <br />
              {imageURL ? (
                <img
                  src={imageURL}
                  alt='my signature'
                  style={{
                    display: 'block',
                    margin: '0 auto',
                    border: '1px solid black',
                    width: '150px',
                  }}
                />
              ) : null}
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              maxWidth: '500',
              display: 'flex',
              textAlign: 'center',
            }}
          >
            <Box sx={{ width: '50%', maxWidth: '500' }}>
              <Typography variant='body1' gutterBottom>
                <h3>
                  {' '}
                  {/* Recepient&nbsp; */}
                  {/* <TextField 
                  id='standard-basic' 
                  variant='standard' 
                  name='recepient'/> */}
                  {/* <br /> */}
                  {/* By&nbsp;  */}
                  {/* <TextField 
                  id='standard-basic'
                  variant='standard' 
                  /> */}
                  {/* <br /> */}
                  Recepient By
                  <br />
                  BY:&nbsp; &nbsp; &nbsp; &nbsp;
                  <TextField 
                  id='standard-basic' 
                  variant='standard' 
                  required
                  name='by'
                  value={inputField.by}
                  onChange={handlChange}
                  style={{marginRight:"5px"}}
                  />
                  <br/>
                  NAME:&nbsp;&nbsp;
                  <TextField 
                  id='standard-basic' 
                  variant='standard' 
                  required
                  name='recepient_name'
                  value={inputField.recepient_name}
                  onChange={handlChange}
                  />
                  <br />
                  TITLE:&nbsp; &nbsp;&nbsp;&nbsp;
                  <TextField 
                  id='standard-basic' 
                  variant='standard' 
                  required 
                  name='recepient_title'
                  value={inputField.recepient_title}
                  onChange={handlChange}
                  />
                  <br />
                  DATE:&nbsp; &nbsp;&nbsp;
                  <TextField 
                  id='standard-basic' 
                  variant='standard' 
                  name='date' 
                  value={date} />
                </h3>
                <br />
              </Typography>
            </Box>
            <Box sx={{ width: '50%', maxWidth: '500' }}>
              {/* <Box>
                <Typography variant='body1' gutterBottom>
                  <h3>
                    BY:&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                    <TextField
                      id='standard-basic'
                      disabled={true}
                      sx={{ color: 'black' }}
                      variant='standard'
                      value={""}
                    />
                  </h3>
                </Typography>
              </Box> */}
               

              <Typography variant="body1" gutterBottom>
              <h3 style={{display:"flex", justifyContent:"center"}}>
               <div className='box-width'>
               <div style={{display:"flex", justifyContent:"space-between"}}>
               {/* <div> */}
                NAME:
                {/* </div> */}
                <TextField id="standard-basic" disabled={true} sx={{color:'black'}} variant="standard" value={'Avantika Chamaria'} />
             
               </div>
                {/* <br /> */}
                <div style={{display:"flex", justifyContent:"space-between"}}>
                Title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField id="standard-basic" disabled={true} variant="standard" value={'CEO'} />
                </div>
                {/* <br /> */}
                <div style={{display:"flex", justifyContent:"space-between"}}>
                Address:
                <div>
                <TextField id="standard-basic" disabled={true} variant="standard" value={'SS BREAK FREE LLP'} /><br/>
               
                <TextField id="standard-basic" disabled={true}  variant="standard" value={'SECOND FLOOR, HOUSE NUMBER 356'} /><br/>
                <TextField id="standard-basic" disabled={true}  variant="standard" value={'SECTOR 45 , GURGAON, HARYANA, 122003'} />
                </div>
                </div>
                {/* <br /> */}
                <div style={{display:"flex", justifyContent:"space-between"}}>
                Phone Number: &nbsp;{" "}
                <TextField id="standard-basic" disabled={true} variant="standard" value={'8826714725'} />
                </div>
                {/* <br /> */}
                <div style={{display:"flex", justifyContent:"space-between"}}>
                Email:&nbsp;{" "}
                <TextField id="standard-basic" disabled={true} variant="standard" value={'askbreakfree@gmail.com'} />
             </div>
                </div>
             
              </h3>
              <br />
            </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button className='Nda-Button' disabled={hide} variant='contained' id='upload-btn' onClick={generatePDF}>
            Upload Form
          </Button>
          <br />
          <br />
        </Box>
      </Box>
      <Box sx={{ ml: '-2rem', mr: '-2rem', mb: '-2rem' }}>
        <Footer />
      </Box>
    </>
  );
};

export default MerchantNda;
