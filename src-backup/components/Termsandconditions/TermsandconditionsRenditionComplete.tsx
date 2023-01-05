/* eslint-disable @next/next/no-img-element */
import React from 'react';
import classes from './TermsandconditionsPage.module.scss';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import Typography from '@mui/material/Typography';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { ArrowDropDown } from '@mui/icons-material';
import { Avatar, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import PhoneIcon from '@mui/icons-material/Phone';
import RoomIcon from '@mui/icons-material/Room';
import MailIcon from '@mui/icons-material/Mail';



const TermsandconditionsPageComplete = ({}) => {
  
  const [isActive, setActive] = React.useState(false);
  const handleCtgry = () => {
    setActive(!isActive);
  };
  
  
  
return (
	<section className={classes.TermsandconditionsPageSection}>
	
		
		<div className={classes.contentsection}>
			<h1>Terms and conditions</h1>
		
			<h2>1. CONTRACTUAL RELATIONSHIP</h2>
			<p>These Terms of Use (&quot;Terms&quot;) govern the access or use by you personally, from within India&apos; applications, websites, content, products, and services (&quot;Services&quot;) made available through SS Break Free LLP, a Private Ltd. Firm established in India, with its registered oﬃce at Second Floor, House Number – 356, Sector 45, Gurgaon, Haryana, 122003.<br/>PLEASE READ THESE TERMS CAREFULLY BEFORE ACCESSING OR USING THE SERVICES.</p>
			<p>Your access and use of the Services constitutes your agreement to be bound by these Terms, which establishes a contractual relationship between you and Break Free. If you do not agree to these Terms, you may not access or use the Services. These Terms expressly supersede any prior wri]en agreements with you.</p>
			<p>Supplemental terms may apply to certain Services, such as policies for a particular event, activity, or promotion, and such supplemental terms will be disclosed to you in connection with the applicable Services. Supplemental terms are in addition to and shall be deemed a part of, the Terms for the purposes of the applicable Services. Supplemental terms shall prevail over these Terms in the event of a conflict with respect to the applicable Services.</p>
			<p>Break Free may restrict you from accessing or using the Services, or any part of them, immediately, without notice, in circumstances where Break Free reasonably suspects that:</p>
			<ul>
			<li>you have, or are likely to, breach these Terms; and/or</li>
			<li>you do not or are likely not to, qualify, under applicable law or the standards and policies of Break Free and its aﬃliates, to access and use the Services.</li>
			</ul>
			<p>Break Free may terminate these Terms or any Services with respect to you, or generally, cease oﬀering or deny access to the Services or any portion thereof:</p>
			<ul>
			<li>Immediately, where Break Free reasonably suspects that:</li>
			<li>you have, or are likely to, materially breach these Terms; and/or</li>
			<li>you do not, or are likely not to, qualify, under applicable law or the standards and policies of Break Free and its affiliates, to access and use the Services; or</li>
			</ul>
			<p>on 30 days&#39; written notice to you, where Break Free, acting reasonably, terminates these Terms or any Services for any legitimate business, legal or regulatory reason.</p>
			<p>Without limiting its other rights under these Terms, Break Free may immediately restrict or deactivate your access to the Services if you breach the Community Guidelines at any time. You may terminate these Terms at any time, for any reason.</p>
			<p>Break Free may amend any policies or supplemental terms (including the Community Guidelines) related to the Services from time to time. Break Free will provide you with at least 30 days&#39; written notice in the event of a material change to any policies or supplemental terms that detrimentally aﬀect your rights under these Terms. Amendments will be eﬀective upon Break Free&apos; posting of such amended policies or supplemental terms on the applicable Service. Your continued access or use of the Services after such posting, or after the expiry of the notice period (whichever is later), constitutes your consent to be bound by the Terms, as amended.</p>
			<h3>MODIFICATIONS TO TERMS OF USE AND/OR PRIVACY POLICY</h3>
			<p>Break Free reserves the right, in its sole discretion, to change, modify, or otherwise amend the Terms, and any other documents incorporated by reference herein for complying with the legal and regulatory framework and for other legitimate business purposes, at any time, and Break Free will post the amended Terms at the domain of www.breakfree.com/terms. It is your responsibility to review the Terms of Use for any changes and you are encouraged to check the Terms of Use frequently. Your use of the website (www.ssbreakfree.com ) (&quot;Website&quot;) or Applications (as defined below) following the date that amendments to the Terms of Use take eﬀect will signify your assent to and acceptance of any revised Terms of Use. If you do not agree to abide by these or any future Terms of Use, please do not use or access the Break free platform.</p>
			<h3>PRIVACY POLICY</h3>
			<p>Break Free has established a Privacy Policy that explains to users how their personal information is collected and used.</p>
			<p>The Privacy Policy contains information about how users may seek access to and correction of their personal information held by Break Free and how they may make a privacy complaint.</p>
			<p>The Privacy Policy is hereby incorporated into the Terms of Use set forth herein. Your use of this Website and/ or the Applications is governed by the Privacy Policy. Break Free may disclose user&apos; personal information to third parties. Break Free may provide to a claims processor or an insurer any necessary information (including your contact information) if there is a complaint, dispute, or conﬂict, which may include an accident, involving you and a third party and such information or data is necessary to resolve the complaint, dispute or conﬂict. Break Free may also provide to a law enforcement agency, statutory body, governmental agency, and/or investigative agency any necessary information (including your contact information), if required by law or in furtherance of any investigation involving you and a third party, and such information or data, is necessary towards the inquiry/investigation that is being carried out by the said body and/or agency as the case may be.</p>
			<h2>2. THE SERVICES</h2>
			<p>Break Free will provide the Services to you under this Agreement. The Services constitute the provision of a technology platform that enables you, as a user of Break Free&apos; mobile application (each, an &quot;Application&quot;) or Website to</p>
			<ul>
			<li>(a)search and hire talented service professionals and their &quot;oﬀering&quot; or &quot;oﬀerings&quot; - which can be categorised as - events , services and products. You can book events, hire service providers and buy the products available with independent third party providers of those &quot;oﬀerings&quot;, who (service providers) have an agreement with Break Free or its affiliates (&quot;Third Party Providers&quot;); and</li>
			<li>facilitate payments to Third Party Providers for the services/ &quot;oﬀerings&quot; oﬀered and receive receipts for those payments</li>
			</ul>
			<p>The Services are made available solely for your personal, commercial or non-commercial use unless Break Free has agreed with you otherwise in a separate agreement. You acknowledge that Break Free does not provide the &quot;oﬀerings&quot; mentioned and that all such &quot;oﬀerings&quot; are provided by independent third-party contractors who are not employed by Break Free or any of its affiliates.</p>
			<p>Break Free accepts liability for the Services and the Break Free Platform that it provides to you subject to these Terms. Third-PartyProviders are responsible for the &quot;oﬀerings&quot; they provide to you.</p>
			<h3>License</h3>
			<p>Subject to your compliance with these Terms, Break Free grants you a limited, non-exclusive, non- sub-licensable, revocable, non-transferable license to: (i) access and use the Beak Free Platform on your personal device solely in connection with your use of the Services; and (ii) access and use any content, information and related materials that may be made available through the Services, in each case solely for your personal, non-commercial use. Any rights not expressly granted herein are reserved by Break Free and Break Free&apos; licensors.</p>
			<h3>Restrictions</h3>
			<p>You may not:</p>
			<ol>
			<li>provide any false information or upload any false portfolio, false products or false events under your profile, all the services and oﬀerings that you upload on the platform are legit, any associated documents are authentic and owned solely by you and all other information provided by you shall be legit and shall be true - you must be the creator/ owner of the &quot;oﬀerings&quot; you upload on the platform;</li>
			<li>reproduce, modify, prepare derivative works based upon, distribute, license, lease, sell, resell, transfer, publicly display, publicly perform, transmit, stream, broadcast or otherwise exploit the Services except as expressly permitted by Break Free;</li>
			<li>leak, misuse, re-use, duplicate, transfer, use or misrepresent any of the confidential information, logo&apos;, branding decks, trademarks, or any other documents etc provided to you by the customer unless permitted to do so;</li>
			<li>link, communicate, inﬂuence or lead the customer outside the scope of the application for personal gains or for personal touch or for any other work related purposes outside the platform;</li>
			<li>cause or oﬀer any extra services or &quot;oﬀerings&quot; for any purposes after getting hired without involving the Break Free platform in between and you must not oﬀer any additional services beyond the platform;</li>
			<li>attempt to gain unauthorised access to or impair any aspect of the Services or its related systems or networks.</li>
			</ol>
			<h3>Provision of the Services</h3>
			<p>You acknowledge that portions of the Services may be made available under Break Free&apos; various brands or request options. You also acknowledge that the Services may be made available under such brands or request options by or in connection with: (i) certain of Break Free&apos; subsidiaries and affiliates; or (ii) independent Third-Party Providers. Third-Party Services and Content.</p>
			<p>The Services may be made available or accessed in connection with third party services and content (including advertising) that Break Free does not control. You acknowledge that diﬀerent terms of use and privacy policies may apply to your use of such third-party services and content. Break Free does not endorse such third party services and content and in no event shall Break Free be responsible or liable for any products or services of such third party providers. Additionally, Apple Inc., Google, Inc., Microsoft Corporation or BlackBerry Limited and/or their applicable international subsidiaries and affiliates will be third-party beneficiaries to this contract if you access the Services using Applications developed for Apple iOS, Android, Microsoft Windows, or Blackberry-powered mobile devices, respectively. These third party beneficiaries are not parties to this contract and are not responsible for the provision or support of the Services in any manner. Your access to the Services using these devices is subject to terms set forth in the applicable third party beneficiary&apos; terms of service.</p>
			<h3>Ownership</h3>
			<p>The Services and all rights therein are and shall remain Break Free&apos; property or the property of Break Free&apos; licensors. Neither these Terms nor your use of the Services conveys or grant to you any rights: (i) in or related to the Services except for the limited license granted above; or (ii) to use or reference in any manner Break Free&apos; company names, logos, product and service names, trademarks or services marks or those of Break Free&apos; licensors.</p>
			<h2>3. YOUR USE OF THE SERVICES</h2>
			<h3>User Accounts</h3>
			<p>In order to use most aspects of the Services, you must register for and maintain an active personal user Services account (&quot;Account&quot;). You must be at least 18 years of age, or the age of legal majority in your jurisdiction (if diﬀerent then 18), to obtain an Account unless a specific Service permits otherwise. Account registration requires you to submit to Break Free certain personal information, such as your name, address, mobile phone number, and age, as well as at least one valid payment method (either a credit card or accepted payment partner). You agree to maintain accurate, complete, and up-to-date information in your Account. Your failure to maintain accurate, complete, and up-to-date Account information, including having an invalid or expired payment method on file, may result in your inability to access or use the Services. You are responsible for all activity that occurs under your Account, and you agree to maintain the security and secrecy of your Account username and password at all times.Unless otherwise permitted by Break Free in writing, you may only possess one Account.</p>
			<h3>User Requirements and Conduct</h3>
			<p>The Service is not available for use by persons who are not &quot;talented&quot; or skilled in performing the &quot;services&quot; or &quot;oﬀerings&quot; themselves. You may not authorise third parties to use your Account, and you may not allow persons under qualified or not matching the criteria of the application to receive services from Third Party Providers unless they are accompanied by you. You may not assign or otherwise transfer your Account to any other person or entity. You agree to comply with all applicable laws when accessing or using the Services and the &quot;oﬀerings&quot; and you may only access or use the Services, &quot;oﬀerings&quot; for lawful purposes. You will not, in your use of the Services, &quot;oﬀerings&quot; cause nuisance, annoyance, inconvenience, or property damage, whether to the Third Party Provider or any other party. In certain instances you may be asked to provide proof of identity or another method of identity verification to access or use the Services, &quot;oﬀerings&quot; , and you agree that you may be denied access to or use of the Services , &quot;oﬀerings&quot; if you refuse to provide proof of identity or other methods of identity verification.</p>
			<h3>No Discrimination</h3>
			<p>Break Free prohibits discrimination against Third-Party Providers based on race, religion, caste, national origin, disability, sexual orientation, sex, marital status, gender identity, age or any other characteristic that may be protected under applicable law. Such discrimination includes, but is not limited to, any refusal to accept services based on any of these characteristics. If it is found that you have violated this prohibition you will lose access to the Break Free platform. Applicable laws in certain jurisdictions may require and/or allow the provision of services by and for the benefit of a specific category of persons. In such jurisdictions, services provided in compliance with these laws and the relevant applicable terms are permissible.</p>
			<h3>Text Messaging</h3>
			<p>By creating an account, you agree that the Services may send you text (SMS) messages as part of the normal business operation of your use of the Services. You may opt-out of receiving text (SMS) messages from Break Free at any time by informing Break Free of your decision to stop receiving such text (SMS) messages. You acknowledge that opting out of receiving text (SMS) messages may impact your use of the Services.</p>
			<h3>Promotional Codes</h3>
			<p>Break Free may, in Break Free&apos; sole discretion, create promotional codes that may be redeemed for Account credit, or other features or benefits related to the Services and/or a Third Party Provider&apos; services, subject to any additional terms that Break Free establishes on a per promotional code basis (&quot;Promo Codes&quot;). You agree that Promo Codes: (i) must be used for the intended audience and purpose, and in a lawful manner; (ii) may not be duplicated, sold, or transferred in any manner, or made available to the general public (whether posted to a public form or otherwise), unless expressly permitted by Break Free; (iii) may be disabled by Break Free at any time for any reason without liability to Break Free; (iv) may only be used pursuant to the specific terms that Break Free establishes for such Promo Code; (v) are not valid for cash; and (vi) may expire prior to your use. Break Free reserves the right to withhold or deduct credits or other features or benefits obtained through the use of Promo Codes by you or any other user in the event that Break Free reasonably determines or believes that the use or redemption of the Promo Code was in error, fraudulent, illegal, or in violation of the applicable Promo Code terms or these Terms.</p>
			<h3>User-Provided Content</h3>
			<p>Break Free may, in Break Free&apos; sole discretion, permit you from time to time to submit, upload, publish or otherwise make available to Break Free through the Services of textual, audio, and/or visual content and information, including commentary and feedback related to the Services, initiation of support requests, and submission of entries for competitions and promotions (&quot;User Content&quot;). Any User Content provided by you remains your property. However, by providing User Content to Break Free, you grant Break Free a worldwide, perpetual, irrevocable, transferable, royalty-free license, with the right to sublicense, use, copy, modify, create derivative works of, distribute, publicly display, publicly perform, and otherwise exploit in any manner such User Content in all formats and distribution channels now known or hereafter devised (including in connection with the Services and Break Free&apos; business and on third-party sites and services), without further notice to or consent from you, and without the requirement of payment to you or any other person or entity.You represent and warrant that: (i) you either are the sole and exclusive owner of all User Content or you have all rights, licenses, consents and releases necessary to grant Break Free the license to the User Content as set forth above; and (ii) neither the User Content nor your submission, uploading, publishing or otherwise making available of such User Content nor Break Free&apos; use of the User Content as permitted herein will infringe, misappropriate or violate a third party&apos; intellectual property or proprietary rights, or rights of publicity or privacy, or result in the violation of any applicable law or regulation; and (iii) you are not providing feedback for services performed by you in your capacity as a service provider on the platform.</p>
			<p>You agree to not provide User Content that is defamatory, grossly harmful, blasphemous, paedophilic, invasive of another&apos; privacy, ethnically objectionable, disparaging, relating or encouraging money laundering of gambling, libellous, hateful, racist, violent, obscene, pornographic, unlawful, or otherwise oﬀensive, as determined by Break Free in its sole discretion, whether or not such material may be protected by law. Break Free may, but shall not be obligated to, review, monitor, or remove User Content, at Break Free&apos; sole discretion and at any time and for any reason, without notice to you.</p>
			<h3>Network Access and Devices</h3>
			<p>You are responsible for obtaining the data network access necessary to use the Services. Your mobile network&apos; data and messaging rates and fees may apply if you access or use the Services from a wireless-enabled device and you shall be responsible for such rates and fees. You are responsible for acquiring and updating compatible hardware or devices necessary to access and use the Services and UC Platform and any updates thereto. Break Free does not guarantee that the Services, or any portion thereof, will function on any particular hardware or devices. In addition, the Services may be subject to malfunctions and delays inherent in the use of the Internet and electronic communications.</p>
			<h2>4. PAYMENT</h2>
			<p>You understand that use of the Services may result in charges to you for the services you receive from a Third Party Provider (&quot;Charges&quot;). After you have received services obtained through your use of the Service, Break Free will facilitate your payment of the applicable Charges on behalf of the Third Party Provider as such Third Party Provider&apos; limited payment collection agent. Payment of the Charges in such manner shall be considered the same as payment made directly by you to the Third Party Provider.</p>
			<p>Break Free shall charge you a convenience fee (&quot;Fee&quot;) for the Services provided by Break Free to you. The Fee may be charged from you at the time of booking of services on the platform or upon the completion of service.</p>
			<p>Such Charges and Fees will be inclusive of applicable taxes where required by law. Charges and Fees paid by you are final and non-refundable unless otherwise determined by Break Free or required by the relevant Consumer Law legislation. Under the relevant Consumer Law legislation, you may be entitled to a refund for a major failure of the Services, or other remedies for a minor failure. You retain the right to request lower Charges or Fee from a Third Party Provider for services received by you from such Third Party Provider at the time you receive such services. Break Free will respond accordingly to any request from a Third Party Provider to modify the Charges for a particular service. All Charges and Fee are due immediately and payment will be facilitated by Break Free using the preferred payment method designated in your Account, after which Break Free will send you a receipt by email. If your primary Account payment method is determined to be expired, invalid or otherwise not able to be charged, you agree that Break Free may, as the Third Party Provider&apos; limited payment collection agent, use a secondary payment method in your Account, if available.</p>
			<p>All Charges and Fee are due immediately and payment will be facilitated by Break Free using the preferred payment method designated in your Account, after which Break Free will send you a receipt by email. If your primary Account payment method is determined to be expired, invalid or otherwise not able to be charged, you agree that Break Free may, as the Third Party Provider&apos; limited payment collection agent, use a secondary payment method in your Account, if available.</p>
			<p>As between you and Break Free, Break Free reserves the right to establish, remove and/or revise Charges for any or all services obtainable through the use of the Services at any time in Break Free&apos; sole discretion. Further, you acknowledge and agree that Charges and Fees applicable in certain geographical areas may increase substantially during times of high demand. Break Free will use reasonable eﬀorts to inform you of Charges and Fees that may apply, provided that you will be responsible for Charges and Fees incurred under your Account regardless of your awareness of such Charges, Fees or the amounts thereof.</p>
			<p>Break Free may from time to time provide certain users with promotional oﬀers and discounts that may result in diﬀerent amounts charged for the same or similar services obtained through the use of the Services, and you agree that such promotional oﬀers and discounts unless also made available to you, shall have no bearing on your use of the Services or the Charges applied to you. You may elect to cancel your request for services from a Third Party Provider at any time prior to such Third Party Provider&apos; arrival, in which case you may be charged a cancellation fee. Additionally, the applicable taxes (whether direct or indirect) that are liable to be charged/ deducted on the cancellation fee will be charged to you by Break Free.</p>
			<p>Further, Break Free may from time to time oﬀer subscription packages to you, wherein, in exchange for monetary consideration, additional benefits such as discounted services from Third Party Providers will be made available to you. The said benefits will only be available for a limited period as may be agreed with you in advance.</p>
			<p>This payment structure is intended to fully compensate the Third Party Provider for the services provided. Break Free does not designate any portion of your payment as a tip or gratuity to the Third Party Provider. Any representation by Break Free (on Break Free&apos; website, in the Application, or in Break Free&apos; marketing materials) to the eﬀect that tipping is &quot;voluntary&quot; , &quot;not required,&quot; and/or &quot;included&quot; in the payments you make for services provided is not intended to suggest that Break Free provides any additional amounts, beyond those described above, to the Third Party Provider. You understand and agree that, while you are free to provide additional payment as a gratuity to any Third Party Provider who provides you with services obtained through the Service, you are under no obligation to do so. Gratuities are voluntary. After you have received services through the Service, you will have the opportunity to rate your experience and leave additional feedback about your Third Party Provider.</p>
			<p>It is clarified that the Charges and Fees (respectively) shall be made only for the services provided by the Third Party Provider to you and for the Services provided by Break Free to you.</p>
			<h2>5. DISCLAIMERS; LIMITATION OF LIABILITY; INDEMNITY</h2>
			<h3>LIMITATION SUBJECT TO LOCAL CONSUMER LAW</h3>
			<p>THE LIMITATIONS AND DISCLAIMER IN THIS SECTION 5 DO NOT PURPORT TO LIMIT LIABILITY OR ALTER YOUR RIGHTS AS A CONSUMER THAT CANNOT BE EXCLUDED UNDER APPLICABLE LAW, INCLUDING THE RELEVANT CONSUMER LAW LEGISLATION.</p>
			<h3>DISCLAIMER</h3>
			<p>EXCEPT AS REQUIRED OF Break Free UNDER THE CONSUMER GUARANTEES, THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; Break Free DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES, EXPRESS, IMPLIED OR STATUTORY, NOT EXPRESSLY SET OUT IN THESE TERMS, INCLUDING ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON- INFRINGEMENT, AND MAKES NO REPRESENTATION, WARRANTY, OR GUARANTEE REGARDING THE RELIABILITY, TIMELINESS, QUALITY, SUITABILITY OR AVAILABILITY OF THE SERVICES OR ANY SERVICES REQUESTED THROUGH THE USE OF THE SERVICES, OR THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE. Break Free DOES NOT GUARANTEE THE QUALITY, SUITABILITY, SAFETY OR ABILITY OF THIRD PARTY PROVIDERS. YOU AGREE THAT THE ENTIRE RISK ARISING OUT OF YOUR USE OF THE SERVICES, AND ANY SERVICE OR GOOD REQUESTED IN CONNECTION THEREWITH, REMAINS SOLELY WITH YOU, TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, INCLUDING THE RELEVANT CONSUMER LAW LEGISLATION.</p>
			<h3>LIMITATION OF LIABILITY</h3>
			<p>IF YOU ARE ACQUIRING THE SERVICES AS A CONSUMER, Break Free &quot; LIABILITY FOR A FAILURE TO COMPLY WITH A CONSUMER GUARANTEE IS LIMITED TO: IN THE CASE OF SERVICES SUPPLIED TO YOU AS PART OF THE SERVICES UNDER THIS AGREEMENT, THE SUPPLY OF THE RELEVANT SERVICES AGAIN, OR THE PAYMENT OF THE COST OF RESUPPLYING THE SERVICES.</p>
			<p>Break Free&apos;&quot; LIABILITY TO YOU FOR A BREACH OF ANY CONDITION, WARRANTY OR TERM OF THIS AGREEMENT THAT IS NOT A BREACH OF A CONSUMER GUARANTEE IS LIMITED IN THE FOLLOWING WAY: Break Free SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, LOST DATA, PERSONAL INJURY OR PROPERTY DAMAGE RELATED TO, IN CONNECTION WITH, OR OTHERWISE RESULTING FROM ANY USE OF THE SERVICES, OR &quot;OFFERINGS&quot; EVEN IF Break Free HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. Break Free SHALL NOT BE LIABLE FOR ANY DAMAGES, LIABILITY OR LOSSES ARISING OUT OF: (i) YOUR USE OF OR RELIANCE ON THE SERVICES OR YOUR INABILITY TO ACCESS OR USE THE SERVICES; OR (ii) ANY TRANSACTION OR RELATIONSHIP BETWEEN YOU AND ANY THIRD PARTY PROVIDER, EVEN IF Break Free HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. Break Free SHALL NOT BE LIABLE FOR DELAY OR FAILURE IN PERFORMANCE RESULTING FROM CAUSES BEYOND Break Free’S REASONABLE CONTROL. IN NO EVENT SHALL Break Free’S TOTAL LIABILITY TO YOU IN CONNECTION WITH THE SERVICES OR &quot;OFFERINGS&quot; FOR ALL DAMAGES, LOSSES AND CAUSES OF ACTION EXCEED RUPEES THEN THOUSAND (INR 10,000).</p>
			<p>Break Free’S SERVICES OR &quot;OFFERINGS&quot; MAY BE USED BY YOU TO SEARCH AND HIRE &quot;SERVICE PROFESSIONALS FOR EVENTS , PRODUCTS OR SERVICES,&quot; WITH THIRD PARTY PROVIDERS, BUT YOU AGREE THAT Break Free HAS NO RESPONSIBILITY OR LIABILITY TO YOU RELATED TO ANY OR &quot;OFFERINGS&quot; TO YOU BY THIRD PARTY PROVIDERS OTHER THAN AS EXPRESSLY SET FORTH IN THESE TERMS.</p>
			<p>Break Free WILL MAINTAIN A COMPLAINTS MANAGEMENT FRAMEWORK, AND WILL MANAGE THIS FRAMEWORK ON BEHALF OF THIRD PARTY PROVIDERS, IN A REASONABLE WAY AND IN ACCORDANCE WITH THE NON-EXCLUDABLE REQUIREMENTS OF THE RELEVANT CONSUMER LAW LEGISLATION.</p>
			<p>NOTWITHSTANDING ANYTHING CONTAINED IN THESE TERMS, Break Free WILL NOT BE DEEMED TO BE IN DEFAULT OR BE RESPONSIBLE FOR DELAYS OR FAILURES IN PERFORMANCE RESULTING FROM ACTS BEYOND THE REASONABLE CONTROL OF Break Free. SUCH ACTS SHALL INCLUDE BUT NOT BE LIMITED TO ACTS OF GOD, RIOTS, ACTS OF WAR, EPIDEMICS, PANDEMICS, TRADE EMBARGOES, FIRE, TYPHOONS, EARTHQUAKES, OTHER NATURAL DISASTERS. ETC.</p>
			<p>THE LIMITATIONS AND DISCLAIMER IN THIS SECTION 5 DO NOT PURPORT TO LIMIT LIABILITY OR ALTER YOUR RIGHTS AS A CONSUMER THAT CANNOT BE EXCLUDED UNDER APPLICABLE LAW, INCLUDING ANY OF THE NON-EXCLUDABLE REQUIREMENTS OF THE RELEVANT CONSUMER LAW LEGISLATION.</p>
			<h3>Indemnity</h3>
			<p>You agree to indemnify and hold Break Free and its affiliates and their officers, directors, employees and agents harmless from any and all claims, demands, losses, liabilities, and expenses (including attorneys’ fees) arising out of or in connection with: (i) your use of the Services or services or goods obtained through your use of the services; (ii) your breach or violation of any of these Terms; (iii) BreakFree&apos; use of your User Content; or (iv) your violation of the rights of any third party, including ThirdParty Providers (&quot;Losses&quot;).</p>
			<p>Your liability under this clause shall be reduced proportionately if, and to the extent that, Break Free directly caused or contributed to any such Losses.</p>
			<h2>6. GOVERNING LAW; ARBITRATION</h2>
			<p>There are a number of mechanisms available to you to resolve any dispute, conﬂict, claim or controversy arising out of or broadly in connection with or relating to the Services or these Terms, including those relating to its validity, its construction or its enforceability or with the services provided by a Third Party Provider (&quot;Dispute&quot;). Break Free or its affiliates operate a complaints process to allow you to make complaints about Break Free or Third Party Providers, and Break Free or its affiliates also manage refunds to you in relation to those complaints. Break Free or its affiliates will operate this complaints process in a reasonable manner. You agree and acknowledge that you must raise any Dispute with the Services or the services provided by a Third Party Provider as soon as is practicable, but no later than 48 hours from the time the Dispute arises. If you fail to raise a Dispute within 48 hours from the initial occurrence of such Dispute, Break Free shall be under no obligation to resolve such. Dispute. If a Dispute is reported more than 48 hours after the initial occurrence of the Dispute Break Free shall in its sole discretion choose whether or not to attempt resolution of the Dispute.</p>
			<p>In addition, you may have rights to make a complaint to fair trading or consumer law bodies in relation to applicable consumer laws, including the non-excludable portions of the relevant Consumer Law legislation.</p>
			<p>Except as otherwise set forth in these Terms, these Terms shall be exclusively governed by and construed in accordance with the laws of India, excluding its rules on conﬂicts of laws. The Vienna Convention on the International Sale of Goods of 1980 (CISG) shall not apply. In the event of a Dispute, either party may file an action in the courts of India or pursue final and binding arbitration or other alternative dispute resolution as agreed upon by the parties. If either party elects to pursue final and binding arbitration, the venue of the arbitration shall be New Delhi, India.</p>
			<p>Any proceedings, including documents and briefs submitted by the parties, correspondence from a mediator, and correspondence, order and awards issued by an arbitrator, shall remain strictly confidential and shall not be disclosed to any third party without the express written consent from the other party unless: (i) the disclosure to the third party is reasonably required in the context of conducting the mediation or arbitration proceedings; and (ii) the third party agrees unconditionally in writing to be bound by the confidentiality obligation set out in these Terms.</p>
			<h2>7. Other Provisions</h2>
			<h3>Claims of Copyright Infringement</h3>
			<p>Claims of copyright infringement should be sent to grievance officer- 5 PM, Monday-Friday, excluding public holidays.</p>
			<p>Break Free may give notice by means of a general notice on the Services, electronic mail to your email address in your Account, or by written communication sent to your address as set forth in your Account.</p>
			<p>You may give notice to SS Break Free LLP by written communication to Break Free&apos; address at SECOND FLOOR, HOUSE NUMBER 356, SECTOR 45 , GURGAON, HARYANA, 122003.</p>
			<p>You may not assign or transfer these Terms in whole or in part without Break Free&apos; prior written approval. You give your approval to Break Free for it to assign or transfer these Terms in whole or in part, including to: (i) a subsidiary or affiliate; (ii) an acquirer of Break Free&apos; equity, business or assets; or (iii) a successor by merger. No joint venture, partnership, employment or agency relationship exists between you, Break Free or any Third Party Provider as a result of the contract between you and Break Free or use of the Services.</p>
			<p>If any provision of these Terms is held to be illegal, invalid or unenforceable, in whole or in part, under any law, such provision or part thereof shall to that extent be deemed not to form part of these Terms but the legality, validity and enforceability of the other provisions in these Terms shall not be aﬀected. In that event, the parties shall replace the illegal, invalid or unenforceable provision or part thereof with a provision or part thereof that is legal, valid and enforceable and that has, to the greatest extent possible, a similar eﬀect as the illegal, invalid or unenforceable provision or part thereof, given the contents and purpose of these Terms. These Terms, including any incorporated policies, constitute the entire agreement and understanding of the parties with respect to its subject matter and replaces and supersedes all prior or contemporaneous agreements or undertakings regarding such subject matter. Nothing in this clause limits your rights as a consumer that cannot be excluded under applicable law, including the relevant Consumer Law legislation. In these Terms, the words &quot;including&quot; and &quot;include&quot; mean &quot;including, but not limited to.&quot;</p>
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		
		
		
		
		</div>
		
		
		<div className={classes.footerTopArea} style={{backgroundImage: "url(ftbg2.png)"}}>
			<div className={classes.footerContainer}>
				<Grid container spacing={{ xs: 2, md: 8  }} className={classes.footerBoxContainer} direction="row" justifyContent="center" alignItems="center">
					<Grid item md={4} className={classes.footerIconBoxInner1}>
						<div className={classes.footerBox}>
							<div className={classes.ft2icon}>
								<RoomIcon className={classes.FooterIcon}/>
								
							</div>
							<div className={classes.ft2content}>
								<label>Address</label>
								SS BREAK FREE LLP<br/>2nd Floor, H.No. 356, Sector 45, Gurgaon, Haryana, 122003
							</div>
						</div>
					</Grid>
					<Grid item md={4} className={classes.footerIconBoxInner2}>
						<div className={classes.footerBox}>
							<div className={classes.ft2icon}>
								<PhoneIcon className={classes.FooterIcon}/>
							</div>
							<div className={classes.ft2content}>
								<label>Call us</label>
								<Link href="tel:+918826714725">
									<a className={classes.lineText}>+91 8826714725</a>
								</Link>
							</div>
						</div>
					</Grid>
					<Grid item md={4} className={classes.footerIconBoxInner3}>
						<div className={classes.footerBox}>
							<div className={classes.ft2icon}>
								<MailIcon className={classes.FooterIcon}/>
							</div>
							<div className={classes.ft2content}>
								<label>Write to us</label>
								<Link href="mailto:askbreakfree@gmail.com">
									<a className={classes.lineText}>askbreakfree@gmail.com</a>
								</Link>
							</div>
						</div>
					</Grid>
					
				</Grid>
			</div>
		</div>
		
		<div className={classes.lastPart}>
			
			<div className={classes.gridDivision}>
				<div className={classes.footerGrid1}>
					<Avatar
					className={classes.logoLastPart}
					variant={'rounded'}
					src={'welcomePage/breakFree2.png'}
					/>
					<div className={classes.soulSaid}>SOUL SAYS BREAK FREE</div>
					<Button className={classes.btnBookService}>Book a service</Button>
				</div>
				<div className={classes.footerGrid2}>
					<div className={classes.headPopularService}>POPULAR SERVICES</div>
					<div className={classes.innerGrid}>
						<ul className={classes.ulPopularServices}>
							<li>
								<a className={classes.lineText} href=''>
									Art
								</a>
							</li>
							<li>
								<a className={classes.lineText} href=''>
									Dance
								</a>
							</li>
							<li>
								<a className={classes.lineText} href=''>
									Music
								</a>
							</li>
							<li>
								<a className={classes.lineText} href=''>
									Fashion
								</a>
							</li>
							<li>
								<a className={classes.lineText} href=''>
									Actor
								</a>
							</li>
						</ul>

						<ul className={classes.ulPopularServices}>
							<li>
								<a className={classes.lineText} href=''>
									Photography
								</a>
							</li>
							<li>
								<a className={classes.lineText} href=''>
									Comedy
								</a>
							</li>
							<li>
								<a className={classes.lineText} href=''>
									Layer
								</a>
							</li>
							<li>
								<a className={classes.lineText} href=''>
									Rap
								</a>
							</li>
							<li>
								<a className={classes.lineText} href=''>
									Blogger
								</a>
							</li>
						</ul>
        
						<ul className={classes.ulPopularServices}>
							<li>
								<a className={classes.lineText} href=''>
									Designer
								</a>
							</li>
							<li>
								<a className={classes.lineText} href=''>
									CA
								</a>
							</li>
							<li>
								<a className={classes.lineText} href=''>
									DJ
								</a>
							</li>
							<li>
								<a className={classes.lineText} href=''>
									Writer
								</a>
							</li>
						  </ul>
					</div>
				</div>
				<div className={classes.footerGrid3}>
					<div className={classes.headLegals}>LEGAL</div>
					<ul className={classes.ulLegal1}>
						<li>
							<Link href="/termsandconditions">
								<a className={classes.lineText}>Terms and conditions</a>
							</Link>
						</li>
						<li>
							<Link href="/privacypolicy">
								<a className={classes.lineText}>Privacy Policy</a>
							</Link>		
						</li>
					</ul>
				</div>
				
				<div className={[classes.footerGrid3, classes.HdeDestop].join(' ')}>
					<div className={classes.headLegals}>Links</div>
					<ul className={classes.ulLegal1}>
						<li>
							<Link href="/aboutus">
								<a className={classes.lineText}>About Us</a>
							</Link>
						</li>
						<li>
							<Link href="/resources">
								<a className={classes.lineText}>Resources</a>
							</Link>	
						</li>
					</ul>
				</div>
				
				
				
				
			</div>
		
			<hr/>
			
			<div className={classes.copyrightSection}>
				<div className={classes.copyRights}>
					© Break Free 2021. All rights reserved
				</div>
				<div className={classes.iconEnd}>
					<Button className={classes.btnLast}>
					<Link href="https://twitter.com/ss_breakfree">
							<a target="_blank">
								<img
								className={classes.imgLast}
								src='welcomePage/twitter.svg'
								alt=''
								/>
							</a>
						</Link>
					</Button>
					<Button className={classes.btnLast}>
						<Link href="https://www.instagram.com/ssbreakfree/">
							<a target="_blank">
								<img
								className={classes.imgLast}
								src='welcomePage/instagram.svg'
								alt=''
								/>
							</a>
						</Link>
					</Button>
					<Button className={classes.btnLast}>
					<Link href="https://www.linkedin.com/company/breakfreeofficial">
							<a target="_blank">
								<img
								className={classes.imgLast}
								src='welcomePage/linkedin.svg'
								alt=''
								/>
							</a>
						</Link>
					</Button>
					<Button className={classes.btnLast}>
					<Link href="https://www.facebook.com/ssbreakfree/?tsid=0.7922777780303092&source=result">
							<a target="_blank">
								<img
								className={classes.imgLast}
								src='welcomePage/facebook.svg'
								alt=''
								/>
							</a>
						</Link>
					</Button>
				</div>
			</div>
		
		</div>
		
		
		
		
		
	</section>
	
	
	
  );
};
export default TermsandconditionsPageComplete;
