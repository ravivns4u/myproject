/* eslint-disable @next/next/no-img-element */
import React from 'react';
import classes from './ResourcesPage.module.scss';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import Typography from '@mui/material/Typography';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { ArrowDropDown } from '@mui/icons-material';
import { Avatar, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import PhoneIcon from '@mui/icons-material/Phone';
import RoomIcon from '@mui/icons-material/Room';
import MailIcon from '@mui/icons-material/Mail';

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
  font-family: 'Poppins', sans-serif;
  line-height: 33px;
  letter-spacing: 0.01em;
  color: #000000;
  cursor: pointer;
  font-weight: 600;
  font-size: 22px;
  background-color: transparent;
  width: 100%;
  padding: 10px 15px;
  margin: 0px 10px;
  border: 2px solid #000000;
  border-radius: 10px;
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
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
`;

const TabsList1 = styled(TabsListUnstyled)`
  min-width: 320px;
  padding: 0px;
  max-width: 880px;
  margin: auto;
  background-color: transparent;
  border-radius: 0px;
  box-shadow: none;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const ResourcesPageComplete = ({}) => {
  const [isActive, setActive] = React.useState(false);
  const handleCtgry = () => {
    setActive(!isActive);
  };

  return (
    <section className={classes.ResourcesPageSection}>
      <div className={classes.ResourcesStartedSection}>
        <div className={classes.ResourcesTabMainSection}>
          <TabsUnstyled defaultValue={0}>
            <TabsList1>
              <Tab1 sx={{
                display:'flex',
                alignItems:'center',
                height:'auto',
                '@media screen and (max-width:720px)':{
                  height:'120px' 
                }
              }}>Why Professionals Choose Us?</Tab1>
              <Tab1 sx={{
                display:'flex',
                alignItems:'center',
                height:'auto',
                '@media screen and (max-width:720px)':{
                  height:'120px' 
                }
              }}>Why Clients Choose Us?</Tab1>
            </TabsList1>
            <TabPanel1 value={0}>
              <div className={classes.ResourcesTabPanelDiv}>
                <div className={classes.ResourcesTabPanelHeading}>
                  <h3>
                    Give your talent the platform it deserves.
                    <br />
                    You Create, We Appreciate!
                  </h3>
                </div>

                <div className={classes.ResourcesMerchantsTabPanel}>
                  <Grid
                    container
                    spacing={0}
                    className={classes.ResourcesMerchantsTabPanel1}
                    direction='row'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Grid item md={3} className={classes.flipboxmain}>
                      <div className={classes.flipboxwrapper}>
                        <div className={classes.flipinner}>
                          <div className={classes.flipfront}>
                            <div className={classes.flipboxicon}>
                              <img src='resources/merchants/icon3.png' alt='' />
                            </div>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>
                                Endless <br />
                                Exposure
                              </h5>
                            </div>
                          </div>
                          <div className={classes.flipback}>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>
                                Endless <br />
                                Exposure
                              </h5>
                            </div>
                            <div className={classes.flipboxcontent}>
                              Get hired by top <br />
                              companies and <br />
                              expand your <br />
                              creative portfolio
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={3} className={classes.flipboxmain}>
                      <div className={classes.flipboxwrapper}>
                        <div className={classes.flipinner}>
                          <div className={classes.flipfront}>
                            <div className={classes.flipboxicon}>
                              <img src='resources/merchants/icon1.png' alt='' />
                            </div>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>
                                Take <br />
                                Control
                              </h5>
                            </div>
                          </div>
                          <div className={classes.flipback}>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>Take Control</h5>
                            </div>
                            <div className={classes.flipboxcontent}>
                              Accept opportunities <br />
                              that match your <br />
                              creative and <br />
                              financial goals
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={3} className={classes.flipboxmain}>
                      <div className={classes.flipboxwrapper}>
                        <div className={classes.flipinner}>
                          <div className={classes.flipfront}>
                            <div className={classes.flipboxicon}>
                              <img src='resources/merchants/icon2.png' alt='' />
                            </div>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>Inspire</h5>
                            </div>
                          </div>
                          <div className={classes.flipback}>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>Inspire</h5>
                            </div>
                            <div className={classes.flipboxcontent}>
                              Share your <br />
                              knowledge on a <br />
                              global platform. <br />
                              Teach what you <br />
                              love!
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={3} className={classes.flipboxmain}>
                      <div className={classes.flipboxwrapper}>
                        <div className={classes.flipinner}>
                          <div className={classes.flipfront}>
                            <div className={classes.flipboxicon}>
                              <img src='resources/merchants/icon6.png' alt='' />
                            </div>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>
                                Just Break <br />
                                Free
                              </h5>
                            </div>
                          </div>
                          <div className={classes.flipback}>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>
                                Just Break <br />
                                Free
                              </h5>
                            </div>
                            <div className={classes.flipboxcontent}>
                              Collaborate, <br />
                              Network and <br />
                              Grow!
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={0}
                    className={classes.ResourcesMerchantsTabPanel2}
                    direction='row'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Grid item md={3} className={classes.flipboxmain}>
                      <div className={classes.flipboxwrapper}>
                        <div className={classes.flipinner}>
                          <div className={classes.flipfront}>
                            <div className={classes.flipboxicon}>
                              <img src='resources/merchants/icon4.png' alt='' />
                            </div>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>
                                Market <br />
                                Insights
                              </h5>
                            </div>
                          </div>
                          <div className={classes.flipback}>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>
                                Market <br />
                                Insights
                              </h5>
                            </div>
                            <div className={classes.flipboxcontent}>
                              Learn all about <br />
                              the top-paying <br />
                              jobs, success <br />
                              stories, hiring <br />
                              trends and more.
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={3} className={classes.flipboxmain}>
                      <div className={classes.flipboxwrapper}>
                        <div className={classes.flipinner}>
                          <div className={classes.flipfront}>
                            <div className={classes.flipboxicon}>
                              <img src='resources/merchants/icon8.png' alt='' />
                            </div>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>
                                Safe and <br />
                                Secure
                              </h5>
                            </div>
                          </div>
                          <div className={classes.flipback}>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>
                                Safe and <br />
                                Secure
                              </h5>
                            </div>
                            <div className={classes.flipboxcontent}>
                              Get paid fairly <br />
                              and securely <br />
                              from verified <br />
                              clients
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={3} className={classes.flipboxmain}>
                      <div className={classes.flipboxwrapper}>
                        <div className={classes.flipinner}>
                          <div className={classes.flipfront}>
                            <div className={classes.flipboxicon}>
                              <img src='resources/merchants/icon7.png' alt='' />
                            </div>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>
                                100% <br />
                                Transparency
                              </h5>
                            </div>
                          </div>
                          <div className={classes.flipback}>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>
                                100% <br />
                                Transparency
                              </h5>
                            </div>
                            <div className={classes.flipboxcontent}>
                              Be upfront by <br />
                              defining your <br />
                              scope, timing, <br />
                              price, and terms.
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={3} className={classes.flipboxmain}>
                      <div className={classes.flipboxwrapper}>
                        <div className={classes.flipinner}>
                          <div className={classes.flipfront}>
                            <div className={classes.flipboxicon}>
                              <img src='resources/merchants/icon5.png' alt='' />
                            </div>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>
                                Break-Free <br />
                                Support
                              </h5>
                            </div>
                          </div>
                          <div className={classes.flipback}>
                            <div className={classes.flipboxtitle}>
                              <h5 className={classes.sectiontitle}>
                                Break-Free <br />
                                Support
                              </h5>
                            </div>
                            <div className={classes.flipboxcontent}>
                              Our tech team <br />
                              is always at <br />
                              your disposal.
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </TabPanel1>
            <TabPanel1 value={1}>
              <div className={classes.ResourcesTabPanelDiv1}>
                <div className={classes.ResourcesTabPanelHeading}>
                  <Typography variant='h3' sx={{display:{xs:'none',md:'block'}}}>
                    Let us be the answer to your creative 
                    <br/>
                    needs 
                  </Typography>
                  <Typography variant='h3' sx={{display:{xs:'block',md:'none'}}}>
                  Let us be the answer to your 
                    <br/>
                    creative needs
                  </Typography>
                </div>

                <div className={classes.ResourcesCustomersTabPanel}>
                  <div className={classes.ResourcesHeaxgonPanel}>
                    <div className={classes.ResourcesHeaxgonPanelInner}>
                      <div className={classes.ResourcesHeaxgonArticle1}>
                        <div className={classes.ResourcesHeaxgonFigure}></div>
                      </div>
                      <div className={classes.ResourcesHeaxgonArticle2}>
                        <div className={classes.ResourcesHeaxgonFigure}>
                          <h4>User Friendly</h4>
                          <p>Easy, Efficient and Quick!</p>
                        </div>
                      </div>
                      <div className={classes.ResourcesHeaxgonArticle3}>
                        <div className={classes.ResourcesHeaxgonFigure}></div>
                      </div>
                    </div>
                    <div className={classes.ResourcesHeaxgonPanelInner}>
                      <div className={classes.ResourcesHeaxgonArticle4}>
                        <div className={classes.ResourcesHeaxgonFigure}>
                          <h4>Unique Creators</h4>
                          <p>
                            Designers, influencers, writers, musicians, software developers, photographers - we have it
                            all.
                          </p>
                        </div>
                      </div>
                      <div className={classes.ResourcesHeaxgonArticle5}>
                        <div className={classes.ResourcesHeaxgonFigure}>
                          <h4>Break Free Workshops</h4>
                          <p>Learn new skills- the way you want it, when you want it.</p>
                        </div>
                      </div>
                      <div className={classes.ResourcesHeaxgonArticle6}>
                        <div className={classes.ResourcesHeaxgonFigure}></div>
                      </div>
                    </div>
                    <div className={classes.ResourcesHeaxgonPanelInner}>
                      <div className={classes.ResourcesHeaxgonArticle7}>
                        <div className={classes.ResourcesHeaxgonFigure}>
                          <h4>Hire a Pro</h4>
                          <p>From a pool of endless talent, explore the ones that suit your requirements.</p>
                        </div>
                      </div>
                      <div className={classes.ResourcesHeaxgonArticle8}>
                        <div className={classes.ResourcesHeaxgonFigure}>
                          <h4>Break-Free Support</h4>
                          <p>We are always available for all your needs.</p>
                        </div>
                      </div>
                      <div className={classes.ResourcesHeaxgonArticle9}>
                        <div className={classes.ResourcesHeaxgonFigure}>
                          <h4>Explore Events</h4>
                          <p>Check out what’s popping where. Attend, book and enjoy what you love!</p>
                        </div>
                      </div>
                    </div>
                    <div className={classes.ResourcesHeaxgonPanelInner}>
                      <div className={classes.ResourcesHeaxgonArticle10}>
                        <div className={classes.ResourcesHeaxgonFigure}>
                          <h4>Safety Guaranteed</h4>
                          <p>Work with verified creators only. Your satisfaction is our priority.</p>
                        </div>
                      </div>
                      <div className={classes.ResourcesHeaxgonArticle11}>
                        <div className={classes.ResourcesHeaxgonFigure}>
                          <h4>Proof of Quality</h4>
                          <p>Browse through work samples, client reviews and ratings.</p>
                        </div>
                      </div>
                      <div className={classes.ResourcesHeaxgonArticle12}>
                        <div className={classes.ResourcesHeaxgonFigure}>
                          <h4>Shop</h4>
                          <p>
                            Purchase original artworks, paintings, sculptors, installations, customized merchandise and
                            more
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={classes.ResourcesHeaxgonPanelInner}>
                      <div className={classes.ResourcesHeaxgonArticle13}>
                        <div className={classes.ResourcesHeaxgonFigure}></div>
                      </div>
                      <div className={classes.ResourcesHeaxgonArticle14}>
                        <div className={classes.ResourcesHeaxgonFigure}></div>
                      </div>
                      <div className={classes.ResourcesHeaxgonArticle15}>
                        <div className={classes.ResourcesHeaxgonFigure}>
                          <h4>
                            Call the <br />
                            shots
                          </h4>
                          <p>Choose what you want, when you want and how you want.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel1>
          </TabsUnstyled>
        </div>
      </div>

      <div className={classes.footerTopArea} style={{ backgroundImage: 'url(ftbg2.png)' }}>
        <div className={classes.footerContainer}>
          <Grid
            container
            spacing={{ xs: 2, md: 8 }}
            className={classes.footerBoxContainer}
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            <Grid item md={4} className={classes.footerIconBoxInner1}>
              <div className={classes.footerBox}>
                <div className={classes.ft2icon}>
                  <RoomIcon className={classes.FooterIcon} />
                </div>
                <div className={classes.ft2content}>
                  <label>Address</label>
                  SS BREAK FREE LLP
                  <br />
                  2nd Floor, H.No. 356, Sector 45, Gurgaon, Haryana, 122003
                </div>
              </div>
            </Grid>
            <Grid item md={4} className={classes.footerIconBoxInner2}>
              <div className={classes.footerBox}>
                <div className={classes.ft2icon}>
                  <PhoneIcon className={classes.FooterIcon} />
                </div>
                <div className={classes.ft2content}>
                  <label>Call us</label>
                  <Link href='tel:+918826714725'>
                    <a className={classes.lineText}>+91 8826714725</a>
                  </Link>
                </div>
              </div>
            </Grid>
            <Grid item md={4} className={classes.footerIconBoxInner3}>
              <div className={classes.footerBox}>
                <div className={classes.ft2icon}>
                  <MailIcon className={classes.FooterIcon} />
                </div>
                <div className={classes.ft2content}>
                  <label>Write to us</label>
                  <Link href='mailto:askbreakfree@gmail.com'>
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
            <Avatar className={classes.logoLastPart} variant={'rounded'} src={'welcomePage/breakFree2.png'} />
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
                <Link href='/termsandconditions'>
                  <a className={classes.lineText}>Terms and conditions</a>
                </Link>
              </li>
              <li>
                <Link href='/privacypolicy'>
                  <a className={classes.lineText}>Privacy Policy</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className={[classes.footerGrid3, classes.HdeDestop].join(' ')}>
            <div className={classes.headLegals}>Links</div>
            <ul className={classes.ulLegal1}>
              <li>
                <Link href='/aboutus'>
                  <a className={classes.lineText}>About Us</a>
                </Link>
              </li>
              <li>
                <Link href='/resources'>
                  <a className={classes.lineText}>Resources</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div className={classes.copyrightSection}>
          <div className={classes.copyRights}>© Break Free 2021. All rights reserved</div>
          <div className={classes.iconEnd}>
            <Button className={classes.btnLast}>
              <Link href='https://twitter.com/ss_breakfree'>
                <a target='_blank'>
                  <img className={classes.imgLast} src='welcomePage/twitter.svg' alt='' />
                </a>
              </Link>
            </Button>
            <Button className={classes.btnLast}>
              <Link href='https://www.instagram.com/ssbreakfree/'>
                <a target='_blank'>
                  <img className={classes.imgLast} src='welcomePage/instagram.svg' alt='' />
                </a>
              </Link>
            </Button>
            <Button className={classes.btnLast}>
              <Link href='https://www.linkedin.com/company/breakfreeofficial'>
                <a target='_blank'>
                  <img className={classes.imgLast} src='welcomePage/linkedin.svg' alt='' />
                </a>
              </Link>
            </Button>
            <Button className={classes.btnLast}>
              <Link href='https://www.facebook.com/ssbreakfree/?tsid=0.7922777780303092&source=result'>
                <a target='_blank'>
                  <img className={classes.imgLast} src='welcomePage/facebook.svg' alt='' />
                </a>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ResourcesPageComplete;
