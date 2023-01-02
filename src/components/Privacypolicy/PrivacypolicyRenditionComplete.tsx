/* eslint-disable @next/next/no-img-element */
import React from 'react';
import classes from './PrivacypolicyPage.module.scss';
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


const PrivacypolicyPageComplete = ({}) => {
  
  const [isActive, setActive] = React.useState(false);
  const handleCtgry = () => {
    setActive(!isActive);
  };
  
  
  
return (
	<section className={classes.PrivacypolicyPageSection}>
	
		<div className={classes.contentsection}>
			<h1>Privacy Policy</h1>
		
			<h2>Welcome to Break Free&apos; privacy policy (&quot;Privacy Policy&quot; or &quot;Policy&quot;)</h2>
			<p>Break Free Technologies India Private Limited and its affiliates (collectively, &quot;Break Free&quot;, &quot;we&quot; or &quot;us&quot;) are engaged in the business of providing web-based solutions to facilitate connections between customers that seek specific services and service professionals that oﬀer these services. This Policy outlines our practices in relation to the collection, storage, usage, processing, and disclosure of personal data that you have consented to share with us when you access, use, or otherwise interact with our website available at &quot;https://www.breakfree.com&quot; or mobile application &quot;Break Free&quot; (collectively, &quot;Platform&quot;) or avail products or services that Break Free oﬀers you on or through the Platform (collectively, the &quot;Services&quot;).In this Policy, the services oﬀered to you by service professionals on or through the Platform are referred to as &quot;Professional Services&quot;.</p>
			<p>At Break Free, we are committed to protecting your personal data and respecting your privacy. In order to provide you with access to the Services or the Professional Services, we have to collect and otherwise process certain data about you. This Policy explains how we process and use personal data about you.</p>
			<p>Please note that unless specifically defined in this Policy, capitalised terms shall have the same meaning ascribed to them in our Terms and Conditions, available at Break Free &quot;https://www.breakfree.com/terms (&quot;Terms&quot;)&quot;. Please read this Policy in consonance with the Terms.</p>
			<p>By using the Services, you confirm that you have read and agree to be bound by this Policy and consent to the processing activities described under this Policy.</p>
			<p>Please refer to Section 1 to understand how the terms of this Policy apply to you.</p>
			<h2>1. BACKGROUND AND KEY INFORMATION</h2>
			<h3>(a) How this Policy applies:</h3>
			<p>This Policy applies to individuals who access or use the Services or otherwise avail of the Professional Services. For the avoidance of doubt, references to &quot;you&quot; across this Policy are to an end-user that uses the Platform.</p>
			<p>By using the Platform, you consent to the collection, storage, usage, and disclosure of your personal data, as described in and collected by us in accordance with this Policy.</p>
			<h3>(b) Review and Updates:</h3>
			<p>We regularly review and update our Privacy Policy, and we request you to regularly review this Policy.</p>
			<p>It is important that the personal data we hold about you is accurate and current. Please let us know if your personal data changes during your relationship with us.</p>
			<h3>(c) Third-Party Services:</h3>
			<p>The Platform may include links to third-party websites, plug-ins, services, and applications (&quot;Third- Party Services&quot;). Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We neither control nor endorse these Third-Party Services and are not responsible for their privacy statements. When you leave the Platform or access third-party links through the Platform, we encourage you to read the privacy policy of such third-party service providers.</p>
			<h2>2. PERSONAL DATA THAT WE COLLECT</h2>
			<p>(a) We collect diﬀerent types of personal data about you. This includes, but is not limited to:</p>
			<ol>
			<li>Contact Data, such as your mailing or home address, location, email addresses, and mobile numbers.</li>
			<li>Identity and Profile Data, such as your name, username or similar identifiers, photographs, and gender.</li>
			<li>Marketing and Communications Data, such as your address, email address, information posted in service requests, oﬀers, wants, feedback, comments, pictures, and discussions in our blog and chat boxes, responses to user surveys and polls, your preferences in receiving marketing communications from us and our third parties, and your communication preferences. We also collect your chat and call records when you communicate with service professionals through the Platform.</li>
			<li>Technical Data, which includes your IP address, browser type, internet service provider, details of the operating system, access time, page views, device ID, device type, frequency of visiting our website, and use of the Platform, website and mobile application activity, clicks, date and time stamps, location data, and other technology on the devices that you use to access the Platform.</li>
			<li>Transaction Data, such as details of the Services or Professional Services you have availed, a limited portion of your credit or debit card details for tracking transactions that are provided to us by payment processors, and UPI IDs for processing payments.</li>
			<li>Usage Data, which includes information about how you use the Services and Professional Services, your activity on the Platform, booking history, user taps and clicks, user interests, time spent on the Platform, details about user journey on the mobile application, and page views.</li>
			</ol>
			<p>(b) We also collect, use, and share aggregated data such as statistical or demographic data for any purpose. Aggregated Data could be derived from your personal data but is not considered personal data under law as it does not directly or indirectly reveal your identity. However, if we combine or connect aggregated data with your personal data so that it can directly or indirectly identify you, we treat the combined data as personal data which will be used in accordance with this Policy.</p>
			<p>(c) What happens if I refuse to provide my personal data?<br/>Where we need to collect personal data by law, or under the terms of a contract (such as the Terms), and you fail to provide that data when requested, we may not be able to perform the contract (for example, to provide you with the Services). In this case, we may have to cancel or limit your access to the Services.</p>
			<h2>3. HOW DO WE COLLECT PERSONAL DATA?</h2>
			<p>We use diﬀerent methods to collect personal data from and about you including through:</p>
			<p>(a) Direct Interactions. You provide us with your personal data when you interact with us. This includes personal data you provide when you:</p>
			<ol>
			<li>create an account or profile with us;</li>
			<li>use our Services or carry out other activities in connection with the Services;</li>
			<li>enter a promotion, user poll, or online survey;</li>
			<li>request marketing communications to be sent to you; or</li>
			<li>report a problem with the Platform and/or our Services, give us feedback or contact us.</li>
			</ol>
			<p>(b) Automated technologies or interactions. Each time you visit the Platform or use the Services, we will automatically collect Technical Data about your equipment, browsing actions, and patterns. We collect this personal data by using cookies, web beacons, pixel tags, server logs, and other similar technologies. We may also receive Technical Data about you if you visit other websites or apps that employ our cookies.</p>
			<p>(c) Third parties or publicly available sources. We will receive personal data about you from various third parties:</p>
			<ol>
			<li>Technical Data from analytics providers such as Facebook and advertising networks;</li>
			<li>Identity and profile-related Data and Contact Data from service professionals, publicly available sources, etc.;</li>
			<li>Personal data about you from our affiliate entities.</li>
			</ol>
			<h2>4. HOW DO WE USE YOUR PERSONAL DATA?</h2>
			<p>(a) We will only use your personal data when the law allows us to. Most commonly, we will use your personal data where we need to provide you with the Services, enable you to use the Professional Services, or where we need to comply with a legal obligation. We use your personal data for the following purposes:</p>
			<ol>
			<li>to verify your identity to register you as a seller/customer and create your seller/customer accounts with us on the Platform;</li>
			<li>to provide the Services to you;</li>
			<li>to enable the provision of Professional Services to you;</li>
			<li>to monitor trends and personalise your experience;</li>
			<li>to improve the functionality of our Services based on the information and feedback we receive from you;</li>
			<li>to improve customer service to eﬀectively respond to your service requests and support needs;</li>
			<li>to track transactions and process payments;</li>
			<li>to send periodic notifications to manage our relationship with you including notifying you of changes to the Services, sending you information and updates pertaining to the Services you have availed, and receiving occasional company news and updates related to us or the Services;</li>
			<li>to assist with the facilitation of the Professional Services oﬀered to you, including sending you information and updates about the Professional Services you have availed;</li>
			<li>to market and advertise the Services to you;</li>
			<li>to comply with legal obligations;</li>
			<li>to administer and protect our business and the Services, including troubleshooting, data analysis, system testing, and performing internal operations;</li>
			<li>to improve our business and delivery models;</li>
			<li>to perform our obligations that arise out of the arrangement we are about to enter or have entered with you;</li>
			<li>to enforce our Terms; and</li>
			<li>to respond to court orders, establish or exercise our legal rights, or defend ourselves against legal claims.</li>
			</ol>
			<p>(b) You agree and acknowledge that by using our Services and creating an account with us on the Platform, you authorise us, our service professionals, associate partners, and affiliates to contact you via email, phone, or otherwise. This is to provide the Services to you and ensure that you are aware of all the features of the Services and for related purposes.</p>
			<p>(c) You agree and acknowledge that any and all information pertaining to you, whether or not you directly provide it to us (via the Services or otherwise), including but not limited to personal correspondence such as emails, instructions from you, etc., may be collected, compiled, and shared by us in order to render the Services to you. This may include but not be limited to service professionals who provide or seek to provide you with Professional Services, vendors, social media companies, third- party service providers, storage providers, data analytics providers, consultants, lawyers, and auditors. We may also share this information with other entities in the Break Free group in connection with the above-mentioned purposes.</p>
			<p>(d) You agree and acknowledge that we may share data without your consent when it is required by law or by any court or government agency or authority to disclose such information. Such disclosures are made in good faith and belief that it is reasonably necessary to do so for enforcing this Policy or the Terms, or in order to comply with any applicable laws and regulations.</p>
			<h2>5. COOKIES</h2>
			<p>(a) Cookies are small files that a site or its service provider transfers to your device&apos; hard drive through your web browser (if you permit it to) that enables the sites or service providers&quot; systems to recognise your browser and capture and remember certain information.</p>
			<p>(b) We use cookies to help us distinguish you from other users of the Platform, understand and save your preferences for future visits, keep track of advertisements and compile aggregate data about site traffic and site interaction so that we can oﬀer you a seamless user experience. We may contract third- party service providers to assist us in better understanding our site visitors. These service providers are not permitted to use the information collected on our behalf except to help us conduct and improve our business.</p>
			<p>(c) Additionally, you may encounter cookies or other similar devices on certain pages of the Platform that are placed by third parties. We do not control the use of cookies by third parties. If you send us personal correspondence, such as emails, or if other users or third parties send us correspondence about your activities or postings on the Platform, we may collect such information within a file specific to you.</p>
			<h2>6. DISCLOSURES OF YOUR PERSONAL DATA</h2>
			<p>(a) We may share your personal data with third parties set out below for the purposes set out in Section 4:</p>
			<ol>
				<li>Service professionals to enable them to provide you with Professional Services;</li>
				<li>Internal third parties, which are other companies within the Break Free group of companies.</li>
				<li>External third parties such as:
					<ul>
						<li>trusted third parties such as our associate partners, and service providers that provide services for us or on our behalf. This includes hosting and operating our Platform, providing marketing assistance, conducting our business, processing payments and transaction-related processes, transmitting content, and providing our Services to you;</li>
						<li>analytic service providers and advertising networks that conduct web analytics for us to help us improve the Platform. These analytics providers may use cookies and other technologies to perform their services;</li>
						<li>other registered users on our Platform upon your request or where you explicitly consent to such disclosure; and</li>
						<li>regulators and other bodies, as required by law or regulation.</li>
					</ul>
				</li>
			</ol>
			<p>(b) We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.</p>
			<h2>7. YOUR RIGHTS IN RELATION TO YOUR PERSONAL DATA</h2>
			<p>(a) Access and Updating your Personal Data: You hereby warrant that all personal data that you provide us with is accurate, up-to-date, and true. When you use our Services, we make our best eﬀorts to provide you with the ability to access and correct inaccurate or deficient data, subject to any legal requirements. You can request Break Free for a copy of your personal data by sending an email to privacy@breakfree.com. Break Free may take up to 7 (seven) working days to respond to such a request.</p>
			<p>(b) Opting-out of Marketing and Promotional Communications: When we send you marketing and promotional content through email, we make our best eﬀorts to provide you with the ability to opt-out of such communications by using the opt-out instructions provided in such emails. You understand and acknowledge that it may take us up to 10 (Ten) business days to give eﬀect to your opt-out request. Please note that we may still send you emails about your user account or any Services you have requested or received from us.</p>
			<h2>8. DELETION OF ACCOUNT AND PERSONAL DATA</h2>
			<p>Notwithstanding anything contained in the Terms, you may delete your account as well as your personal data stored with Break Free by sending an email to privacy@breakfree.com. Break Free may take up to 7 (seven) working days to process your request. Once your account is deleted, you will lose access to all Services. For the avoidance of doubt, it is hereby clarified that all data with respect to transactions performed by you on the Platform will be retained in accordance with applicable law.</p>
			<h2>9. TRANSFERS OF YOUR PERSONAL DATA</h2>
			<p>(a) We comply with applicable laws in respect of storage and transfers of personal data. As a part of your use of the Services, the information and personal data you provide to us may be transferred to and stored in countries other than the country you are based in. This may happen if any of our servers are from time to time located in a country other than the one you are based, or one of our vendors, partners, or service providers is located in a country other than the one you are based in.</p>
			<p>(b) By submitting your information and personal data to us, you agree to the transfer, storage, and processing of such information and personal data in the manner described above.</p>
			<h2>10. DATA SECURITY</h2>
			<p>(a) We implement appropriate security measures and privacy-protective features on our Platform including encryption, password protection, call masking, and physical security measures to protect your personal data from unauthorised access and disclosure, and follow standards prescribed by applicable law.</p>
			<p>(b) Where you have chosen a password that enables you to access certain parts of the Services or Professional Services, you are responsible for keeping this password secret and confidential. We will not be responsible for any unauthorised use of your information, for any lost, stolen, or compromised passwords, or for any activity on your user account due to such unauthorised disclosure of your password. In the event your password has been compromised in any manner whatsoever, you should promptly notify us to enable us to initiate a change of password.</p>
			<h2>11. DATA RETENTION</h2>
			<p>(a) You agree and acknowledge that your personal data will continue to be stored and retained by us for as long as necessary to fulfil our stated purpose(s) and for a reasonable period after the termination of your account on the Platform or access to the Services to comply with our legal rights and obligations.</p>
			<p>(b) In some circumstances, we may aggregate your personal data (so that it can no longer be associated with you) for research or statistical purposes, in which case we may use this information indefinitely without further notice to you.</p>
			<h2>12. BUSINESS TRANSITIONS</h2>
			<p>You are aware that in the event we go through a business transition, such as a merger, acquisition by another organisation, or sale of all or a portion of our assets, your personal data might be among the assets transferred.</p>
			<h2>13. USER-GENERATED CONTENT</h2>
			<p>We invite you to post content on our Platform, including your comments, feedback, pictures, or any other information that you would like to be made available on our Platform. Please note that such content will be available to all visitors to our Platform and may become public. We cannot prevent such information from being used in a manner that is contrary to this Policy, applicable laws, or your personal privacy, and we disclaim all liability (express or implied) in this regard. Further, you agree to comply with all applicable laws in relation to the content uploaded or otherwise shared by you on our Platform. You understand and acknowledge that you will be solely responsible for any information published by you on our Platform that violates applicable laws.</p>
			<h2>14. UPDATES TO THIS POLICY</h2>
			<p>(a) We may occasionally update this Policy. If we make changes to this Policy, we will upload the revised policy on the Platform or share it with you through other means, such as email. To the extent permitted under applicable law, by using our Platform after such notice, you consent to updates made to this Policy.</p>
			<p>(b) We encourage you to periodically review this Policy for the latest information on our privacy practices.</p>
			<h2>15. GRIEVANCE OFFICER</h2>
			<p>If you have any questions about this Policy, how we process or handle your personal data, or otherwise, you may reach out to us, with your queries, grievances, feedback, and comments at privacy@breakfree.com or contact our grievance officer whose contact details are provided below:</p>
			<p>Grievance Officers<br/>AVANTIKA CHAMARIA<br/>CEO<br/>MUKUND CHAMARIA<br/>DESIGNATED PARTNER</p>
			
			
			
			
			
			
			
			
			
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
export default PrivacypolicyPageComplete;
