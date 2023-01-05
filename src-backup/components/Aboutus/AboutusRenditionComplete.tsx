/* eslint-disable @next/next/no-img-element */
import React from 'react';
import classes from './AboutusPage.module.scss';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import Typography from '@mui/material/Typography';
import { Avatar, Button, TextField } from '@mui/material';
import Link from 'next/link';

const blue = {
  50: '#FFFF00',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#FFFF00',
  500: '#262423',
  600: '#2F2F2F',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Tab1 = styled(TabUnstyled)`
  font-family: "Poppins", sans-serif;
  line-height: 33px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  cursor: pointer;
  font-weight: 600;
  font-size: 25px;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 0px 5px;
  border: none;
  border-radius: 70px;
  display: flex;
  justify-content: center;
  &:hover {
    background-color: ${blue[50]};
    color: ${blue[600]};
	box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  }
  &:focus {
    background-color: ${blue[50]};
    color: ${blue[600]};
	box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  }
  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
	box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  }
  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel1 = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: "Poppins", sans-serif;
  font-size: 0.875rem;
`;

const TabsList1 = styled(TabsListUnstyled)`
  min-width: 320px;
  padding: 20px 15px;
  max-width: 700px;
  margin:auto;
  background-color: ${blue[500]};
  border-radius: 70px;
  box-shadow: -1px 6px 9px rgb(0 0 0 / 32%);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

interface TabPanelProps
{
  children?: React.ReactNode;
  index: number;
  value: number;
}


function TabPanel(props: TabPanelProps)
{
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
	  className={classes.AboutTabSectionDiv}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}




function a11yProps(index: number)
{
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const AboutusPageComplete = ({}) => {
  
  const [isActive, setActive] = React.useState(false);
  const handleCtgry = () => {
    setActive(!isActive);
  };
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
 
  
return (
	<section className={classes.AboutPageSection}>
	
		<div className={classes.TopBannerSection} style={{backgroundImage: "url(aboutusPage/topbanner.jpg)"}}>
			<div className={classes.TopBannerDiv}>
				<Typography variant={'h3'} color={'white'} sx={{fontSize:'34px',fontWeight:'bold',mb:2}}>Your One-Stop Solution To Everything Creative.</Typography>
				<div className={classes.TopBannerPara}>Break Free is a marketplace for creative professionals. We provide artists networking, collaboration opportunities, and a platform to monetize their skills. We make discovering talent easier.</div>
			</div>
		</div>
		
		<div className={classes.OurServicesSection}>
			<h2>Our Services</h2>
			<h3>Customers</h3>
			<div className={classes.timeline}> 
				<div className={[classes.timeline__event, classes.animated, classes.fadeInUp, classes.timeline__eventtype1].join(' ')}>
					<div className={classes.timeline__event__icon }>
						<img src='aboutusPage/customers/icon3.png' alt=''/>
					</div>
					<div className={classes.timeline__event__date}>
						Hire A Professional
					</div>
					<div className={classes.timeline__event__content }>
						<div className={classes.timeline__event__description}>
							<p>Find talented creators suited best for your business - Graphic Designers, Web Developers, Content Writers, Freelance Stylists,
								and much more.</p>
						</div>
						<div className={classes.timeline__event__title}>
							JUST BREAK FREE & DISCOVER!
						</div>
					</div>
				</div>
				<div className={[classes.timeline__event, classes.animated, classes.fadeInUp, classes.delay1s, classes.timeline__eventtype2].join(' ')}>
					<div className={classes.timeline__event__icon}>
						<img src='aboutusPage/customers/icon2.png' alt=''/>
					</div>
					<div className={classes.timeline__event__date}>
						Learn a New Skill Online
					</div>
					<div className={classes.timeline__event__content}>
						<div className={classes.timeline__event__description}>
							<p>Arts & Craft, Dance, Photography, Creative Writing-</p>
						</div>
						<div className={classes.timeline__event__title}>
							Just Break Free & Learn!
						</div>
					</div>
				</div>
				<div className={[classes.timeline__event, classes.animated, classes.fadeInUp, classes.delay2s, classes.timeline__eventtype3].join(' ')}>
					<div className={classes.timeline__event__icon}>
						<img src='aboutusPage/customers/icon1.png' alt=''/>
					</div>
					<div className={classes.timeline__event__date}>
						Book an Event
					</div>
					<div className={classes.timeline__event__content}>
						<div className={classes.timeline__event__description}>
							<p>Musicals, Exhibitions, Workshops, Seminars, Live Comedy.</p>
						</div>
						<div className={classes.timeline__event__title}>
							JUST BREAK FREE & EXPLORE!
						</div>
					</div>
				</div>
				<div className={[classes.timeline__event, classes.animated, classes.fadeInUp, classes.delay3s, classes.timeline__eventtype1].join(' ')}>
					<div className={classes.timeline__event__icon}>
						<img src='aboutusPage/customers/icon4.png' alt=''/>
					</div>
					<div className={classes.timeline__event__date}>
						Shop Authentic Artworks
					</div>
					<div className={classes.timeline__event__content}>
						<div className={classes.timeline__event__description}>
							<p>Custom Illustrations, Paintings, Craft Installations, Clothing, Home
								Decor & much more.</p>
						</div>
						<div className={classes.timeline__event__title}>
							Just Break Free & Shop!
						</div>
					</div>
				</div>

			</div>

			{/*<h3>How to benefit as a Break Free Merchant?</h3>*/}
			<h3>Professionals</h3>
			<div className={classes.merchantmainsection}>
			<div className={classes.merchantrow}>
				<div className={classes.merchantdiv}>
					<div className={classes.merchanticondiv}>
						<div className={classes.merchanticon}>
							<img src='aboutusPage/merchants/icon1.png' alt=''/>
						</div>
					</div>
					<figure className={classes.merchantfig}>
						
						<img src='aboutusPage/merchants/merchant1.jpg' alt=''/>
						<h3>Kick Start your Creative Career</h3>
						<figcaption>
							<p>Showcase your talent, and get hired by top brands and startups.<br/>
									<span className={classes.captionspan}>Just Break Free & Get Discovered!</span>
							</p>
						</figcaption>
					</figure>
				</div>
				<div className={classes.merchantdiv}>
					<div className={classes.merchanticondiv}>
						<div className={classes.merchanticon}>
							<img src='aboutusPage/merchants/icon5.png' alt=''/>
						</div>
					</div>
					<figure className={classes.merchantfig}>
						<img src='aboutusPage/merchants/merchant2.jpg' alt=''/>
						<h3>Monetize your talents</h3>
						<figcaption>
							<p>List your offerings, accept orders and start earning!<br/>
								<span className={classes.captionspan}>Just Break Free & Do what you Love!</span>
							</p>
						</figcaption>
					</figure>
				</div>
				<div className={classes.merchantdiv}>
					<div className={classes.merchanticondiv}>
						<div className={classes.merchanticon}>
							<img src='aboutusPage/merchants/icon6.png' alt=''/>
						</div>
					</div>
					<figure className={classes.merchantfig}>
						<img src='aboutusPage/merchants/merchant3.jpg' alt=''/>
						<h3>Conduct Workshops</h3>
						<figcaption>
							<p>Share your knowledge
								and teach new skills.<br/>
								<span className={classes.captionspan}>Just Break Free & Inspire!</span></p>
						</figcaption>
					</figure>
				</div>
				<div className={classes.merchantdiv}>
					<div className={classes.merchanticondiv}>
						<div className={classes.merchanticon}>
							<img src='aboutusPage/merchants/icon7.png' alt=''/>
						</div>
					</div>
					<figure className={classes.merchantfig}>
						<img src='aboutusPage/merchants/merchant4.jpg' alt=''/>
						<h3>Teach, Impart & Learn New Skills</h3>
						<figcaption>
							<p>Widen your audience
								base as well as
								collaborate with
								other talented
								artists.<br/>
								<span className={classes.captionspan}>Just Break Free
								& Grow!</span></p>
						</figcaption>
					</figure>
				</div>
			</div>
			</div>
		</div>
		{/*<div className={classes.WhyBreakFreeSection} style={{backgroundImage: "url(aboutusPage/whybreakfree.jpg)"}}>
			<div className={classes.WhyBreakFreeDiv}>
				<div className={classes.WhyBreakFreeHeading}>Why choose Break Free?</div>
				<div className={classes.WhyBreakFreePara}>Hassle-free access to the best creative talent that saves you time & money. Hire Top Talent, Learn a New Skill, Book Events, & Shop Art- All in one place.</div>
				<div className={classes.WhyBreakFreeKnowmore}>Know more</div>
			</div>
			<div className={classes.WhyBreakFreeHoverDiv}>
				<div className={classes.WhyBreakFreeHoverPara}>Looking for the right person to get the job done, but something stops you? Seems expensive, worried about their credibility? Or never getting a reply? Now get the best of creative talent under a budget. Break Free lets you explore & connect with a pool of great people- artists, creators, and professional freelancers- Hire people, Book Events, Shop- all under one roof. No more hesitation delayed responses, or paying hefty amounts! , But wait, we have more to offer.</div>
			</div>*/}
			<div className={classes.WhyBreakFreeSection} style={{backgroundImage: "url(aboutusPage/whybreakfree.jpg)"}}>
			<div className={classes.WhyBreakFreeDiv}>
				<div className={classes.WhyBreakFreeHeading}>Our Mission</div>
				<div className={classes.WhyBreakFreePara}>The Break Free Mantra is -to break the barrier between creativity and opportunity.
					We believe that creativity should be the norm, not an exception.
				</div>
				<Box className={classes.WhyBreakFreeKnowmore}>Together, let’s build a community of creators.</Box>
			</div>
			<div className={classes.WhyBreakFreeHoverDiv}>
				<div className={classes.WhyBreakFreeHoverPara}></div>
			</div>
				
		</div>
		
		
		
{/*		<div className={classes.AboutIconBoxes}>
		
			<Box sx={{ width: '100%' }}>
				<Box className={classes.AboutPageMainTab}>
					<Tabs value={value} onChange={handleChange} centered className={classes.AboutPageMainTabDiv}>
						<Tab label="For Clients" {...a11yProps(0)} className={classes.AboutPageMainTabLabel}/>
						<Tab label="For Merchants" {...a11yProps(1)} className={classes.AboutPageMainTabLabel}/>
					</Tabs>
				</Box>
				<div className={classes.AboutTabSection} style={{backgroundImage: "url(aboutusPage/iconbg.jpg)"}}>
					<TabPanel value={value} index={0}>
						
						<div className={classes.AboutIconBoxMain}>
							<Grid container spacing={{ xs: 2, md: 8 }} className={classes.AboutIconBoxContainer} direction="row" justifyContent="center" alignItems="center">
								<Grid item md={4} className={classes.AboutIconBoxInner}>
									<div className={classes.iconbox}>
										<div className={classes.boxedicon}>
											<div className={classes.iconimage}>
												<img src='aboutusPage/icons/icon1.png' alt=''/>
											</div>
											<h5 className={classes.widgettitle}>Trusted network of talented creators</h5>
											<div className={classes.iconcontent}>
												<p>Search from a pool of numerous creative services - you name it, we have it!</p>
											</div>
										</div>
									</div>
								</Grid>
								<Grid item md={4} className={classes.AboutIconBoxInner}>
									<div className={classes.iconbox}>
										<div className={classes.boxedicon}>
											<div className={classes.iconimage}>
												<img src='aboutusPage/icons/icon2.png' alt=''/>
											</div>
											<h5 className={classes.widgettitle}>Proof of quality</h5>
											<div className={classes.iconcontent}>
												<p>Browse through work samples, client reviews, of our verified professionals.</p>
											</div>
										</div>
									</div>
								</Grid>
								<Grid item md={4} className={classes.AboutIconBoxInner}>
									<div className={classes.iconbox}>
										<div className={classes.boxedicon}>
											<div className={classes.iconimage}>
												<img src='aboutusPage/icons/icon3.png' alt=''/>
											</div>
											<h5 className={classes.widgettitle}>Safety Guaranteed</h5>
											<div className={classes.iconcontent}>
												<p>Verified profiles that give you satisfying results.</p>
											</div>
										</div>
									</div>
								</Grid>
								<Grid item md={4} className={classes.AboutIconBoxInner}>
									<div className={classes.iconbox}>
										<div className={classes.boxedicon}>
											<div className={classes.iconimage}>
												<img src='aboutusPage/icons/icon4.png' alt=''/>
											</div>
											<h5 className={classes.widgettitle}>User Friendly</h5>
											<div className={classes.iconcontent}>
												<p>Find the right person, at the right time and place with our advanced search filters, made for your convenience.</p>
											</div>
										</div>
									</div>
								</Grid>
								<Grid item md={4} className={classes.AboutIconBoxInner}>
									<div className={classes.iconbox}>
										<div className={classes.boxedicon}>
											<div className={classes.iconimage}>
												<img src='aboutusPage/icons/icon5.png' alt=''/>
											</div>
											<h5 className={classes.widgettitle}>24/7 Support</h5>
											<div className={classes.iconcontent}>
												<p>Questions? Ask away! We’re always here for you.</p>
											</div>
										</div>
									</div>
								</Grid>
								<Grid item md={4} className={classes.AboutIconBoxInner}>
									<div className={classes.iconbox}>
										<div className={classes.boxedicon}>
											<div className={classes.iconimage}>
												<img src='aboutusPage/icons/icon6.png' alt=''/>
											</div>
											<h5 className={classes.widgettitle}>Exclusive Services only on Break Free</h5>
											<div className={classes.iconcontent}>
												<p> Explore your interests, book events, learn online courses, shop from authentic artists, and more!</p>
											</div>
										</div>
									</div>
								</Grid>
								<Grid item md={4} className={classes.AboutIconBoxInner}>
									<div className={classes.iconbox}>
										<div className={classes.boxedicon}>
											<div className={classes.iconimage}>
												<img src='aboutusPage/icons/icon7.png' alt=''/>
											</div>
											<h5 className={classes.widgettitle}>Extra Benefit</h5>
											<div className={classes.iconcontent}>
												<p>Running on a tight deadline? We’ve got you! Book an urgent query and get started on priority.</p>
											</div>
										</div>
									</div>
								</Grid>
							</Grid>
							
						</div>
					
					</TabPanel>
					<TabPanel value={value} index={1}>
					
						<div className={classes.AboutIconBoxMain}>
							<Grid container spacing={{ xs: 2, md: 8 }} className={classes.AboutIconBoxContainer} direction="row" justifyContent="center" alignItems="center">
								<Grid item md={4} className={classes.AboutIconBoxInner}>
									<div className={classes.iconbox}>
										<div className={classes.boxedicon}>
											<div className={classes.iconimage}>
												<img src='aboutusPage/icons/icon8.png' alt=''/>
											</div>
											<h5 className={classes.widgettitle}>Multi Channel Platform</h5>
											<div className={classes.iconcontent}>
												<p>Expand your Network, find work, teach/learn a new skill, or sell your product online.</p>
											</div>
										</div>
									</div>
								</Grid>
								<Grid item md={4} className={classes.AboutIconBoxInner}>
									<div className={classes.iconbox}>
										<div className={classes.boxedicon}>
											<div className={classes.iconimage}>
												<img src='aboutusPage/icons/icon9.png' alt=''/>
											</div>
											<h5 className={classes.widgettitle}>Take control</h5>
											<div className={classes.iconcontent}>
												<p>Accept opportunities that match your creative and financial goals.</p>
											</div>
										</div>
									</div>
								</Grid>
								<Grid item md={4} className={classes.AboutIconBoxInner}>
									<div className={classes.iconbox}>
										<div className={classes.boxedicon}>
											<div className={classes.iconimage}>
												<img src='aboutusPage/icons/icon10.png' alt=''/>
											</div>
											<h5 className={classes.widgettitle}>Showcase Numerous Talents</h5>
											<div className={classes.iconcontent}>
												<p>Are you a multitalented artist-Designer, Dancer, and Painter all-in-one? No worries, showcase multiple talents under one profile.</p>
											</div>
										</div>
									</div>
								</Grid>
								<Grid item md={4} className={classes.AboutIconBoxInner}>
									<div className={classes.iconbox}>
										<div className={classes.boxedicon}>
											<div className={classes.iconimage}>
												<img src='aboutusPage/icons/icon11.png' alt=''/>
											</div>
											<h5 className={classes.widgettitle}>Secured Payments & trusted jobs</h5>
											<div className={classes.iconcontent}>
												<p>Get paid fairly and securely from verified clients.</p>
											</div>
										</div>
									</div>
								</Grid>
								<Grid item md={4} className={classes.AboutIconBoxInner}>
									<div className={classes.iconbox}>
										<div className={classes.boxedicon}>
											<div className={classes.iconimage}>
												<img src='aboutusPage/icons/icon12.png' alt=''/>
											</div>
											<h5 className={classes.widgettitle}>Endless Exposure</h5>
											<div className={classes.iconcontent}>
												<p>Get discovered by top companies and expand your creative portfolio.</p>
											</div>
										</div>
									</div>
								</Grid>
								<Grid item md={4} className={classes.AboutIconBoxInner}>
									<div className={classes.iconbox}>
										<div className={classes.boxedicon}>
											<div className={classes.iconimage}>
												<img src='aboutusPage/icons/icon13.png' alt=''/>
											</div>
											<h5 className={classes.widgettitle}>Pocket-Friendly Subscription</h5>
											<div className={classes.iconcontent}>
												<p>A small fee for your big dreams. We’re affordable and convenient.</p>
											</div>
										</div>
									</div>
								</Grid>
							</Grid>
							
						</div>
					
					
						
					</TabPanel>
				</div>
			</Box>
		</div>*/}
		
		<div className={classes.AboutGetStartedSection}>
			<h3>How to Get Started ?</h3>
			
			<div className={classes.AboutGetStartedMainSection}>
			<TabsUnstyled defaultValue={0}>
				<TabsList1>
					<Tab1>For Clients</Tab1>
					<Tab1>For Merchants</Tab1>
				</TabsList1>
				<TabPanel1 value={0}>
					<div className={classes.stepscontent}>
						<ol className={classes.steps}>
							<li className={classes.stepsitem}>
								<div className={classes.stepsiteminner}>
									<div className={classes.stepsicon}>
										<span className={classes.steptext}><img src='aboutusPage/getstarted/icon1.png' alt=''/></span>
									</div>
									<div className={classes.stepsmain}>
										<h3 className={classes.steptitle}>
											<span>Register</span>
										</h3>
									</div>
								</div>
							</li>
							<li className={classes.stepsitem}>
								<div className={classes.stepsiteminner}>
									<div className={classes.stepsicon}>
										<span className={classes.steptext}><img src='aboutusPage/getstarted/icon2.png' alt=''/></span>
									</div>
									<div className={classes.stepsmain}>
										<h3 className={classes.steptitle}>
											<span>Find a Service</span>
										</h3>
									</div>
								</div>
							</li>
							<li className={classes.stepsitem}>
								<div className={classes.stepsiteminner}>
									<div className={classes.stepsicon}>
										<span className={classes.steptext}><img src='aboutusPage/getstarted/icon3.png' alt=''/></span>
									</div>
									<div className={classes.stepsmain}>
										<h3 className={classes.steptitle}>
											<span>Book</span>
										</h3>
									</div>
								</div>
							</li>
						</ol>
					</div>
					<Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
						<Button sx={{
							backgroundColor: '#FFFF00',
							borderRadius: '50px',
							color: '#000000',
							py: 1.5,
							px: 8,
							fontWeight:'bold',
							fontSize:'24px',
							textTransform:'capitalize',
							minWidth:'280px',
							'&:hover':{
								backgroundColor: '#000000',
								color: '#FFFF00',
							}
						}}>Start Hiring</Button>
					</Box>
				</TabPanel1>
				<TabPanel1 value={1}>
					<div className={classes.stepscontent}>
						<ol className={classes.steps}>
							<li className={classes.stepsitem}>
								<div className={classes.stepsiteminner}>
									<div className={classes.stepsicon}>
										<span className={classes.steptext}><img src='aboutusPage/getstarted/icon4.png' alt=''/></span>
									</div>
									<div className={classes.stepsmain}>
										<h3 className={classes.steptitle}>
											<span>Setup Profile</span>
										</h3>
									</div>
								</div>
							</li>
							<li className={classes.stepsitem}>
								<div className={classes.stepsiteminner}>
									<div className={classes.stepsicon}>
										<span className={classes.steptext}><img src='aboutusPage/getstarted/icon5.png' alt=''/></span>
									</div>
									<div className={classes.stepsmain}>
										<h3 className={classes.steptitle}>
											<span>Accept New Project</span>
										</h3>
									</div>
								</div>
							</li>
							<li className={classes.stepsitem}>
								<div className={classes.stepsiteminner}>
									<div className={classes.stepsicon}>
										<span className={classes.steptext}><img src='aboutusPage/getstarted/icon6.png' alt=''/></span>
									</div>
									<div className={classes.stepsmain}>
										<h3 className={classes.steptitle}>
											<span>Deliver</span>
										</h3>
									</div>
								</div>
							</li>
						</ol>
					</div>
					<Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
						<Button sx={{
							backgroundColor: '#FFFF00',
							borderRadius: '50px',
							color: '#000000',
							py: 1.5,
							px: {xs:14,md:8},
							fontWeight:'bold',
							fontSize:'24px',
							textTransform:'capitalize',
							minWidth:'280px',
							'&:hover':{
								backgroundColor: '#000000',
								color: '#FFFF00',
							}
						}}>Start Working</Button>
					</Box>
				</TabPanel1>
			</TabsUnstyled>
			</div>
			
			
		</div>
		
		{/*<div className={classes.footerTopArea} style={{backgroundImage: "url(ftbg2.png)"}}>
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
		</div>*/}
		
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
export default AboutusPageComplete;
