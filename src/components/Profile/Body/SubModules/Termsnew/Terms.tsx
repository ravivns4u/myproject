import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Footer from '../../../../Footer/Footer';
import useOnScreen from './useOnScreen';
import { useDispatch } from 'react-redux';
import { updateTermsAndCondition } from '../../../../../redux/slices/subscription';
import { useAppSelector } from '../../../../../redux/app/hooks';
export default function Terms() {
  const myRef = React.useRef();
  const dispatch = useDispatch();
  const onScreen = useOnScreen(myRef);

  React.useEffect(() => {
    if (onScreen) {
      dispatch(updateTermsAndCondition({ isTermsAndCondition: true }));
    }
  }, [onScreen]);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Typography variant='h5' component='div' gutterBottom>
          <b>SS BREAK FREE LLP</b>
        </Typography>
        <br />
        <Typography variant='h4' gutterBottom component='div'>
          <b>TERMS AND CONDITIONS</b>
        </Typography>
        <br />

        <Typography variant='body1' gutterBottom>
          These Terms of Use (“Terms”) govern the access or use by you, an individual, from within India of
          applications, websites, content, products, and services (the “Services”) made available by SS Break Free LLP
          (hereafter, referred as Break Free), a limited liability partnership established in India, having its
          registered office at Second Floor, House Number – 356, Sector 45, Gurgaon, Haryana, 122003 (“SS Break Free
          LLP”).
          <br />
          <br />
          KINDLY READ THESE TERMS CAREFULLY BEFORE USING OR ACCESSING THE SERVCES
        </Typography>
        <Typography variant='body1' gutterBottom>
          Your access and use of the Services constitutes your agreement to be bound by these Terms, which establishes a
          contractual relationship between you and Break Free. If you do not agree to these Terms, you may not access or
          use the Services. These Terms explicitly succeeds prior written agreements with you. Supplemental terms may
          apply to certain Services, such as policies for a particular event, activity, or promotion, and such
          supplemental terms will be disclosed to you in connection with the applicable Services. Supplemental terms are
          in addition to, and shall be considered a part of, the Terms for the purposes of the applicable Services.
        </Typography>
        <br />
        <Typography variant='body1' gutterBottom>
          Supplemental terms shall prevail over these Terms in the event of a conflict with respect to the applicable
          Services. Break Free may restrict you from accessing or using the Services, or any part of them, immediately,
          without notice, in circumstances where it reasonably suspects that: you have, or are likely to, breach these
          Terms; and/or you do not or are likely not to, qualify, under applicable law or the standards and policies of
          Break Free and its affiliates, to access and use the Services.
        </Typography>
        <br />
        <Typography variant='body1' gutterBottom>
          Break Free may terminate these Terms or any Services with respect to you, or generally cease offering or deny
          access to the Services or any portion thereof: immediately, where it reasonably suspects that: you have, or
          are likely to, materially breach these Terms; and/or you do not, or are likely not to, qualify, under
          applicable law or the standards and policies of Break Free and its affiliates, to access and use the Services;
          or on 30 days, written notice to you, where Break Free, acting reasonably, terminates these Terms or any
          Services for any legitimate business, legal or regulatory reason.
        </Typography>
        <br />
        <Typography variant='body1' gutterBottom>
          Without limiting its other rights under these Terms, it may immediately restrict or deactivate your access to
          the Services if you breach the “community guidelines” at any time. You may terminate these Terms at any time,
          for any reason. Break Free may amend any policies or supplemental terms (including the “community guidelines”)
          related to the Services from time to time. Break Free and its affiliates, to access and use the LLP will
          provide you with at least 30 days&#39; written notice in the event of a material change to any policies or
          supplemental terms that detrimentally affect your rights under these Terms. Amendments will be effective upon
          it&#39;s posting of such amended policies or supplemental terms on the applicable Services. Your continued
          access or use of the Services after such posting, or after the expiry of the notice period (whichever is
          later), constitutes your consent to be bound by the Terms, as amended.
        </Typography>
        <br />
        <br />
        <Typography variant='h5' component='div' gutterBottom>
          CONTRACTUAL RELATIONSHIP
        </Typography>
        <br />
        <Typography variant='body1' gutterBottom>
          Break Free platform is just an aggregator (in form of a website) building a marketplace, where it provides
          services to the merchant and the customer. The deal is between the merchant and the customer, and herein,
          Break Free is no way liable for any deals between the merchant and the customer and hence, cannot be charged
          for any of the gains or losses. It is or will not be a part of either before, during, or after the deal and
          also is or will not be responsible in case of - failure of either party or both parties to deliver the said
          things, if the contract and terms mentioned are abided by or not abided by and if the customer is to call off
          the deal in case of any unfair/ unfortunate/unethical means of practice. Break Free will assure that the
          financial transactions between the merchant and the customer should take place legally, however, it is
          completely on the customer to finalize any deal.
        </Typography>
        <br />
        <Typography variant='h5' component='div' gutterBottom>
          MERCHANT CLAUSE
        </Typography>
        <br />
        <Typography variant='body1' gutterBottom>
          Under the “Merchant Clause”: the merchant agrees and acknowledges that:
          <ul>
            <li>
              The contract provided by the merchant is clearly and solely under his/her own faith, based on his/her own
              conditions and that Break Free shall not interfere in the working relationship the merchant and the
              customer.
            </li>
            <li>
              All the products, services and offerings that the merchant uploads on the platform are legit, any
              associated documents are authentic and owned solely by the merchant. In case of any false presentation of
              the qualifications, certifications, work portfolio and the achievements mentioned by the merchant and
              subsequently the failure to deliver effectively the quality of the work agreed upon by the customer; the
              customer has all the rights to take the necessary legal actions against the merchant and this doesn’t
              concern any Break Free team member.
            </li>
            <li>
              Break Free is not responsible for the actions, such as, if the work delivered is of poor quality, is
              unsatisfactory or fails the expectations of the customer, if there is a delay by any party or any other
              consequences that may occur as per the contract.
            </li>
            <li>
              Break Free team is just an aggregator platform and hence, is not responsible for gaining customers for the
              merchant. It provides a platform for the merchants to showcase their authentic talent.
            </li>
            <li>
              In context with the further proceedings, gaining customers and making a deal will be completely the
              responsibility of the merchant, that is, based on the effective calibre and potential of the merchant.
            </li>
            <li>
              The merchant abides by the “WORK”, in this case - “the delivery of the said services as mentioned in the
              merchant’s contract” and is wholly and solely the responsibility of the merchant to deliver it. Once the
              merchant has signed the deal based on the required contract terms, there will be no interference from
              Break Free, however, the merchant is expected to deliver the services as per the merchant terms and the
              failure to do so will lead to fines and charges as per the rules of Break Free.
            </li>
            <li>
              The merchant is then not in a position to argue on or negotiate the deal based on the platform&#39;s
              subscription charges (cannot ask for a discount from the customer based on the platform&#39;s subscription
              fee). The entire deal must take place on the Break Free platform and any unethical practice, like
              finalising a deal outside with the same customer the merchant got connected with, on the Break Free
              platform will not be condoned.
            </li>
            <li>
              If the merchant does so, the merchant will be liable to pay a fine. In the event where the merchant tries
              to bypass the Break Free platform rules and offer an offline payment for the deal made on the platform,
              the merchant will be liable to pay fines and charges, and may also lead to disqualification of the
              respective account from the app permanently.
            </li>
            <li>
              All the payments related to a deal must be paid online (no cash on delivery), through the Break Free
              platform. This is an aggregator platform, where the merchant will be paying a certain amount of platform
              charges to Break Free (irrespective of the deal) for providing or associating the merchant with different
              customers. The merchant has to agree to pay the “PLATFORM CHARGES” as per the following: 15-25% on all
              “offerings”. Failing to do so, will lead to the cancellation of the Break Free subscription and
              disqualification of the merchant’s account permanently.
            </li>
            <li>
              The merchant has to agree that the merchant has subscribed with Break Free platform as per the document.
              The payment is to be made before the commencement of the work or contract as established between the
              merchant and the customer. If the merchant fails to pay the charges at the given time, shall result in:
              fines up to 15% and if the payment is delayed more than a week, then, up to 25% of the amount shall be
              levied. If the payment for the subscriptions is delayed further by a week and beyond (second week), then
              the SS Break Free LLP subscription stands cancelled and the merchant’s individual account gets
              disqualified permanently.
            </li>
            <li>
              However, the deal shall not change in any case or any other circumstances, but if there are any additional
              services of any kind that is not mentioned in the contract and are being offered or closed for the
              customer, new charges shall be established (as the charges are on per service basis and not per customer
              basis).
            </li>
            <li>
              n case of the breach of the terms and conditions agreement, Break Free platform has the absolute right to
              charge fines, terminate the merchant’s subscription from the platform temporarily or permanently and take
              legal action against it.
            </li>
            <li>
              The merchant has to accept and acknowledge that the merchant is liable to and will maintain complete
              privacy of all personal information and documents provided by the customer (including, name, email ID,
              phone or contact number, address, photographs, ID proofs, etc.) pertaining to the deal.
            </li>
            <li>
              The merchant will definitely ensure that all the data provided by the customer during the deal, will be
              confidential, will not be misused, leaked or cannot be copied for any other customer or for their personal
              work or benefits. The deal signed by the merchant will be totally on the basis of the merchant’s own
              judgement and requirements. Any misread or misunderstood information is up to the merchant, and Break Free
              is no way responsible for the same.
            </li>
          </ul>
        </Typography>
        <br />
        <Typography variant='h5' component='div' gutterBottom>
          DISPUTES
        </Typography>
        <br />
        <Typography variant='body1' gutterBottom>
          There are a number of mechanisms available to the merchant and the customer, to resolve any dispute, conflict,
          claim or controversy arising out of or broadly in connection with orrelating to the services or these terms,
          including those relating to its validity, its construction or its enforceability or with the services provided
          by a third party.
        </Typography>
        <br />
        <Typography variant='h5' component='div' gutterBottom>
          DISCRIMINATION
        </Typography>
        <br />
        <Typography variant='body1' gutterBottom>
          We at Break Free do not believe in any kind of discrimination, biases or special preferences based on race,
          colour, nationality, religion, sex (including pregnancy, sexual orientation, gender identification, etc.),
          age, disability, marital status, political affiliation, or parent / family status. Our policies are same for
          all, irrespective of the above status and we offer fair and equal opportunities for all, provided the merchant
          meets the platform criteria.
        </Typography>
        <br />
        <Typography variant='h5' component='div' gutterBottom>
          REFUND POLICY
        </Typography>
        <br />
        <Typography variant='body1' gutterBottom>
          In case of cancellation from the merchant’s side, full refund shall be initiated. If the cancellation is from
          the client’s end, then 50% of the amount will be refunded, if done before 24 hours of the date of booking. No
          refund shall be initiated for cancellations within 24 hours of the date of booking on the customer’s end.
        </Typography>
        <br />
        <Typography variant='h5' component='div' gutterBottom>
          SIGNING OF NON-DISCLOSURE AGREEMENT
        </Typography>
        <br />
        <Typography variant='body1' gutterBottom>
          Neither the merchant nor the customer has the permission to disclose these terms and conditions to any
          third-party. Merchant is liable to sign an NDA (non-disclosure agreement) with Break Free that implies that
          the merchant is not allowed to disclose the subscription charges to the customer or to anyone outside the
          platform.
        </Typography>
        <br />
        <Typography variant='h5' component='div' gutterBottom>
          OTHER PROVISIONS
        </Typography>
        <br />
        <Box ref={myRef}>
          <Typography variant='body1' gutterBottom>
            The merchant or the customer may not assign or transfer these terms in whole or in part without the prior
            written approval by Break Free. The merchant or the customer gives approval to Break Free for it to assign
            or transfer these Terms in whole or in part. No joint venture, partnership, employment or agency
            relationship exists between the merchant or the customer, Break Free or any other third-party providers as a
            result of the contract between the merchant or the customer and Break Free or the use of the services.
            <br />
            If any provision of these terms is held to be illegal, invalid or unenforceable, in whole or in part, under
            any law, such provision or part there of shall to that extent be deemed not to form part of these ‘Terms’
            but the legality, validity and enforceability of the other provisions in these ‘Terms’ shall not be
            affected. In that event, the parties shall replace the illegal, invalid or unenforceable provision or part
            thereof with the provision or part thereof that is legal, valid and enforceable and that has to the greatest
            extent possible, a similar effect as the illegal, invalid or unenforceable provision or part thereof, given
            the contents and purpose of these ‘Terms’.
            <br />
            These ‘Terms’, including any incorporated policies, constitute the entire agreement and undertaking of the
            parties with respect to its subject matter and replaces and supersedes all prior or contemporaneous
            agreements or undertakings regarding such subject matter. Nothing in this clause limits the rights to a
            consumer, as a consumer that cannot be excluded under applicable law, including the relevant consumer law
            legislation.
          </Typography>
        </Box>
        <br />
        <br />
      </Box>
      <Box sx={{ ml: '-2rem', mr: '-2rem', mb: '-2rem' }}>
        <Footer />
      </Box>
    </>
  );
}
