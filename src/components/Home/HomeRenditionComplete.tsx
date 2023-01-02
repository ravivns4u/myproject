/* eslint-disable @next/next/no-img-element */
import React from 'react';
import classes from './HomePage.module.scss';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { ArrowDropDown } from '@mui/icons-material';
import { Avatar, Button, TextField, Typography, Card } from '@mui/material';
import Link from 'next/link';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Grid from '@mui/material/Grid';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import PhoneIcon from '@mui/icons-material/Phone';
import RoomIcon from '@mui/icons-material/Room';
import MailIcon from '@mui/icons-material/Mail';

import CustomerLoginPopup from '../Customer/Skeleton';

import { Navigation, Pagination } from 'swiper';
// import { style } from '@mui/system';
import { isMobile } from 'react-device-detect';

const HomePageComplete = ({}) => {
  const [isActive, setActive] = React.useState(false);
  const handleCtgry = () => {
    setActive(!isActive);
  };
  const router = useRouter();
  const [customerLogin, setCustomerLogin] = React.useState(false);

  return (
    <div className={[classes.container, 'ThinScrollbar_2'].join(' ')}>
      <section className={classes.topSection}>
        <CustomerLoginPopup open={customerLogin} handleOpening={setCustomerLogin} />
        <div className={classes.backgroundHome}>
          <img className={classes.backgroundCover} src='welcomePage/homeBannerLeft.png' alt='backgroundTop' />
          <img className={classes.backgroundCover1} src='welcomePage/homeMobileBanner2.svg' alt='backgroundTop' />
          <img className={classes.imageBanner} src='welcomePage/homeBanner.png' alt='breakFreeLogo' />
          <img className={classes.imageMobileBanner} src='welcomePage/homeMobileBanner.png' alt='breakFreeLogo' />
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <img className={classes.imageMobileBanner2} src='welcomePage/homeMobileBanner2.png' alt='breakFreeLogo' />
          </Box>

          {/*<Box sx={{display:{xs:'none',md:'block'}}}>
                        <img
                            className={classes.imageMobileBanner}
                            src='welcomePage/homeMobileBanner.png'
                            alt='breakFreeLogo'
                        />
                    </Box>
                    <Box sx={{display:{xs:'block',md:'none'}}}>
                        <img
                            // style={{}}
                            className={classes.imageMobileBanner}
                            src='welcomePage/homeMobileBanner2.png'
                            alt='breakFreeLogo'
                        />
                    </Box>*/}
        </div>
        <div className={classes.searchForProfessional}>
          <span className={classes.searchForProfessionalspan}>The best</span>
          <Box sx={{ my: { xs: 2, md: 0 } }}>
            <span className={classes.yellowBg}>creators of the industry </span>
          </Box>
          <span className={classes.searchForProfessionalspan}>
            are now just a click away<span className={classes.yellowColor}>.</span>
          </span>

          <div className={classes.addPara}>
            <p>Hire Professionals | Book Events | Learn | Shop</p>
          </div>
        </div>

        <Box className={classes.boxAllCategories} onClick={handleCtgry}>
          <span> All Categories </span>
          <IconButton className={classes.iconDropDown}>
            <ArrowDropDown />
          </IconButton>
          <div className={`CtgryDrpDwn ${isActive ? 'CygryActive' : ''}`}>
            <ul>
              <li>
                {' '}
                <a href=''> Category Name </a>{' '}
              </li>
              <li>
                {' '}
                <a href=''> Category Name </a>{' '}
              </li>
              <li>
                {' '}
                <a href=''> Category Name </a>{' '}
              </li>
              <li>
                {' '}
                <a href=''> Category Name </a>{' '}
              </li>
            </ul>
          </div>
        </Box>
        <Box className={classes.searchForService}>
          <IconButton>
            <SearchSharpIcon />
          </IconButton>
          <TextField
            type='Search'
            variant='standard'
            className={classes.txtField}
            placeholder='Search for a service'
          ></TextField>
          <Typography variant={'body2'} sx={{ color: 'white' }}>
            <u>Art, Music, Dance,</u> etc.
          </Typography>
        </Box>

        {/* <div className={classes.simpleTextArt}>
          <span>
            <u>Art</u>, <u>Music</u>, <u>Dance</u>, etc.
          </span>
        </div> */}
      </section>

      <section className={classes.categories}>
        <Button className={classes.btnCategories}>
          <img className={classes.imgBg} src='welcomePage/art.png' alt='ArtIcon' /> Art
        </Button>
        <Button className={classes.btnCategories}>
          <img className={classes.imgBg} src='welcomePage/music.png' alt='MusicIcon' />
          Music
        </Button>
        <Button className={classes.btnCategories}>
          <img className={classes.imgBg} src='welcomePage/dance.png' alt='DanceIcon' />
          Dance
        </Button>
        <Button className={classes.btnCategories}>
          <img className={classes.imgBg} src='welcomePage/photography.png' alt='PhotographyIcon' />
          Photography
        </Button>
        <Button className={classes.btnCategories}>
          <img className={classes.imgBg} src='welcomePage/singer.png' alt='SingerIcon' />
          Singer
        </Button>
        <Button className={classes.btnCategories}>
          <img className={classes.imgBg} src='welcomePage/comedy.png' alt='ComedyIcon' />
          Comedy
        </Button>
        <Button className={classes.btnCategories}>
          <img className={classes.imgBg} src='welcomePage/dj.png' alt='DjIcon' />
          DJ
        </Button>
        <Button className={classes.btnCategories}>
          <img className={classes.imgBg} src='welcomePage/writer.png' alt='WriterIcon' />
          Writer
        </Button>
        <Button className={classes.btnCategories}>
          <img className={classes.imgBg} src='welcomePage/fashion.png' alt='FashionIcon' />
          Fashioned
        </Button>
        <Button className={classes.btnCategories}>
          <img className={classes.imgBg} src='welcomePage/more.png' alt='MoreIcon' />
          More
        </Button>
      </section>

      <section className={classes.thirdPart}>
        <img className={classes.feedImg} src='welcomePage/feed.png' alt='Feed' />
        <div className={classes.thirdContent}>
          {/* <div className={classes.itsTime}>ITS TIME TO BREAK FREE</div> */}
          <div className={classes.aGreat}>
            A pool of talented <br />
            professionals
          </div>
          <div className={classes.breakFree}>
            A platform where you can hire the right talent at the right place and at the right price.
          </div>
          <div className={classes.midBtn}>
            <Link href='/aboutus'>
              <Button className={classes.learnMoreBtn} sx={{ backgroundColor: 'yellow', color: 'black' }}>
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* <section className={classes.whyBreakFree}>
        <span className={classes.headWhyBreakFree}>Why Break Free?</span>
        <Box></Box>
        <Box className={classes.boxWhyBreakFree}>
          <img src='welcomePage/verified.png' alt='' />
          <span className={classes.txtWhyBreakFree}>
            Verified professional service providers
          </span>
        </Box>
        <Box className={classes.boxWhyBreakFree}>
          <img src='welcomePage/assured.png' alt='' />
          <span className={classes.txtWhyBreakFree}>Assured quality</span>
        </Box>
        <Box className={classes.boxWhyBreakFree}>
          <img src='welcomePage/delivery.png' alt='' />
          <span className={classes.txtWhyBreakFree}>On time delivery</span>
        </Box>
        <Box className={classes.boxWhyBreakFree}>
          <img src='welcomePage/hassle.png' alt='' />
          <span className={classes.txtWhyBreakFree}>
            Hassle free communication
          </span>
        </Box>
        <Box className={classes.boxWhyBreakFree}>
          <img src='welcomePage/solution.png' alt='' />
          <span className={classes.txtWhyBreakFree}>
            One-step solution for all <br /> your specific needs
          </span>
        </Box>
        <Box className={classes.boxWhyBreakFree}>
          <img src='welcomePage/more2.png' alt='' />
          <span className={classes.txtWhyBreakFree}>and much more</span>
        </Box>
      </section> */}
      <section className={classes.whyBreakFree}>
        <div className={classes.headWhyBreakFree}>Why Break FREE?</div>
        <img src='welcomePage/whybreakfreebg.png' alt='' className={classes.whyBfBg} />
        <div className={classes.whyBfBoxOut}>
          <div className={classes.whyBfBox}>
            <img src='welcomePage/whyBf1.png' alt='' className={classes.whyBfBoxImg1} />
            <span className={classes.whyBfInSpan}>
              VERIFIED <br />
              PROFESSIONALS
            </span>
          </div>
          <div className={classes.whyBfBox}>
            <img src='welcomePage/whyBf4.png' alt='' className={classes.whyBfBoxImg4} />
            <div className={classes.whyBfInSpan}>
              ONE-STOP <br />
              SOLUTION
            </div>
          </div>
          <div className={classes.whyBfBoxLast}>
            <img src='welcomePage/whyBg2.png' alt='' className={classes.whyBfBoxImg2} />
            <div className={classes.whyBfInSpan}>ASSURED QUALITY</div>
          </div>
          <div className={classes.whyBfBox}>
            <img src='welcomePage/whyBf3.png' alt='' className={classes.whyBfBoxImg3} />
            <div className={classes.whyBfInSpan}>
              HASSEL FREE <br />
              COMMUNICATION
            </div>
          </div>
          <div className={classes.whyBfBoxLast2}>
            <img src='welcomePage/whyBf5.png' alt='' className={classes.whyBfBoxImg5} />
            <div className={classes.whyBfInSpan}>ON TIME DELIVERY</div>
          </div>
        </div>

        <div className={classes.muchMore}>
          <Link href='/resources'>
            <a>And Much More</a>
          </Link>
        </div>
      </section>
      <section className={classes.upcomingEvents}>
        <img src='welcomePage/bgupcomingEvents.png' alt='Image' className={classes.BGImage2} />
        <p className={classes.headUpcomingEvents}>Upcoming Events</p>
        <Swiper
          // slidesPerView={auto},
          spaceBetween={70}
          // slidesPerGroup={3}
          loop={true}
          loopFillGroupWithBlank={true}
          breakpoints={{
            // it means >= 768px
            400: {
              slidesPerView: 2,
            },
            1000: {
              slidesPerView: 3,
            },
          }}
          navigation={{
            prevEl: '.prev',
            nextEl: '.next',
          }}
          modules={[Pagination, Navigation]}
          className={classes.mySwiper}
        >
          <SwiperSlide>
            <Box className={classes.boxUp} sx={{ border: 2, borderColor: 'yellow' }}>
              <div className={classes.imgcontent}>
                <img className={classes.boximg} src='welcomePage/upcomingEvents.png' alt='Image' />
                <div className={classes.boxcontent}>
                  <div className={classes.live}>Live</div>
                  <div className={classes.timedate}>
                    Friday, Aug 8 <br /> 9:00 AM to 11:00 AM IST
                  </div>
                </div>
              </div>
              <Button className={classes.boxbutton} sx={{ backgroundColor: 'yellow', color: 'black' }}>
                Book Now
              </Button>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box className={classes.boxUp} sx={{ border: 2, borderColor: 'yellow' }}>
              <div className={classes.imgcontent}>
                <img className={classes.boximg} src='welcomePage/upcomingEvents.png' alt='Image' />
                <div className={classes.boxcontent}>
                  <div className={classes.live}>Live</div>
                  <div className={classes.timedate}>
                    Friday, Aug 8 <br /> 9:00 AM to 11:00 AM IST
                  </div>
                </div>
              </div>
              <Button className={classes.boxbutton} sx={{ backgroundColor: 'yellow', color: 'black' }}>
                Book Now
              </Button>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box className={classes.boxUp} sx={{ border: 2, borderColor: 'yellow' }}>
              <div className={classes.imgcontent}>
                <img className={classes.boximg} src='welcomePage/upcomingEvents.png' alt='Image' />
                <div className={classes.boxcontent}>
                  <div className={classes.live}>Live</div>
                  <div className={classes.timedate}>
                    Friday, Aug 8 <br /> 9:00 AM to 11:00 AM IST
                  </div>
                </div>
              </div>
              <Button className={classes.boxbutton} sx={{ backgroundColor: 'yellow', color: 'black' }}>
                Book Now
              </Button>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box className={classes.boxUp} sx={{ border: 2, borderColor: 'yellow' }}>
              <div className={classes.imgcontent}>
                <img className={classes.boximg} src='welcomePage/upcomingEvents.png' alt='Image' />
                <div className={classes.boxcontent}>
                  <div className={classes.live}>Live</div>
                  <div className={classes.timedate}>
                    Friday, Aug 8 <br /> 9:00 AM to 11:00 AM IST
                  </div>
                </div>
              </div>
              <Button className={classes.boxbutton} sx={{ backgroundColor: 'yellow', color: 'black' }}>
                Book Now
              </Button>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box className={classes.boxUp} sx={{ border: 2, borderColor: 'yellow' }}>
              <div className={classes.imgcontent}>
                <img className={classes.boximg} src='welcomePage/upcomingEvents.png' alt='Image' />
                <div className={classes.boxcontent}>
                  <div className={classes.live}>Live</div>
                  <div className={classes.timedate}>
                    Friday, Aug 8 <br /> 9:00 AM to 11:00 AM IST
                  </div>
                </div>
              </div>
              <Button className={classes.boxbutton} sx={{ backgroundColor: 'yellow', color: 'black' }}>
                Book Now
              </Button>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box className={classes.boxUp} sx={{ border: 2, borderColor: 'yellow' }}>
              <div className={classes.imgcontent}>
                <img className={classes.boximg} src='welcomePage/upcomingEvents.png' alt='Image' />
                <div className={classes.boxcontent}>
                  <div className={classes.live}>Live</div>
                  <div className={classes.timedate}>
                    Friday, Aug 8 <br /> 9:00 AM to 11:00 AM IST
                  </div>
                </div>
              </div>
              <Button className={classes.boxbutton} sx={{ backgroundColor: 'yellow', color: 'black' }}>
                Book Now
              </Button>
            </Box>
          </SwiperSlide>

          <div className={classes.navigationEvents}>
            <div className='prev'>
              <svg width='30' height='29' viewBox='0 0 30 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M0.5 14.5C0.5 6.78386 6.97576 0.5 15 0.5C23.0242 0.5 29.5 6.78386 29.5 14.5C29.5 22.2161 23.0242 28.5 15 28.5C6.97576 28.5 0.5 22.2161 0.5 14.5Z'
                  stroke='#1F1F2D'
                />
                <path
                  d='M21.8184 14.5L8.18199 14.5'
                  stroke='#1F1F2D'
                  strokeWidth='5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M14.6586 15.8182L16.7041 21.75L7.68138 15.8182L7.68138 13.1818L16.7041 7.25L14.6586 12.7864L14.6586 15.8182Z'
                  fill='#1F1F2D'
                  stroke='#1F1F2D'
                  strokeWidth='0.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M16.3633 6.81061L5.90873 14.2803L16.3633 21.75'
                  stroke='#1F1F2D'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div className='next'>
              <svg width='30' height='29' viewBox='0 0 30 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M29.5 14.5C29.5 22.2161 23.0242 28.5 15 28.5C6.97576 28.5 0.5 22.2161 0.5 14.5C0.5 6.78386 6.97576 0.5 15 0.5C23.0242 0.5 29.5 6.78386 29.5 14.5Z'
                  stroke='#1F1F2D'
                />
                <path
                  d='M8.18164 14.5L21.818 14.5'
                  stroke='#1F1F2D'
                  strokeWidth='5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M15.3414 13.1818L13.2959 7.25L22.3186 13.1818V15.8182L13.2959 21.75L15.3414 16.2136V13.1818Z'
                  fill='#1F1F2D'
                  stroke='#1F1F2D'
                  strokeWidth='0.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M13.6367 22.1894L24.0913 14.7197L13.6367 7.25'
                  stroke='#1F1F2D'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </div>
        </Swiper>
      </section>
      <></>
      <section className={classes.serviceProviders}>
        <img src='welcomePage/bgServiceProviders.png' alt='Image' className={classes.BGImage1} />
        <p className={classes.headServiceProviders}>Our Top Service Providers</p>

        <div className={classes.divBoxServiceProviders}>
          <div className={classes.divService}>
            <img className={classes.imgService} src='welcomePage/serviceproviders/sanjanasharma.jpg' alt='Image' />
            <div className={classes.serviceContent1}>
              <span className={classes.serviceName}>Sanjana Sharma</span>
              <div className={classes.line}></div>
              <span className={classes.designation}>Dance</span>
            </div>
            <div className={classes.serviceContent2}>
              <button className={classes.booknow}>Book Now</button>
            </div>
          </div>
          <div className={classes.divService}>
            <img className={classes.imgService} src='welcomePage/serviceproviders/lifafa.jpg' alt='Image' />
            <div className={classes.serviceContent1}>
              <span className={classes.serviceName}>LIFAFA</span>
              <div className={classes.line}></div>
              <span className={classes.designation}>Music</span>
            </div>
            <div className={classes.serviceContent2}>
              <button className={classes.booknow}>Book Now</button>
            </div>
          </div>
          <div className={classes.divService}>
            <img className={classes.imgService} src='welcomePage/serviceproviders/rohanjoshi.jpg' alt='Image' />
            <div className={classes.serviceContent1}>
              <span className={classes.serviceName}>Rohan Joshi</span>
              <div className={classes.line}></div>
              <span className={classes.designation}>Comedy</span>
            </div>
            <div className={classes.serviceContent2}>
              <button className={classes.booknow}>Book Now</button>
            </div>
          </div>
          <div className={classes.divService}>
            <img className={classes.imgService} src='welcomePage/serviceproviders/jaywalking.jpg' alt='Image' />
            <div className={classes.serviceContent1}>
              <span className={classes.serviceName}>JAYWALKING</span>
              <div className={classes.line}></div>
              <span className={classes.designation}>Fashion</span>
            </div>
            <div className={classes.serviceContent2}>
              <button className={classes.booknow}>Book Now</button>
            </div>
          </div>
          <div className={classes.divService}>
            <img className={classes.imgService} src='welcomePage/serviceproviders/sajeelkapoor.jpg' alt='Image' />
            <div className={classes.serviceContent1}>
              <span className={classes.serviceName}>Sajeel Kapoor</span>
              <div className={classes.line}></div>
              <span className={classes.designation}>RAP</span>
            </div>
            <div className={classes.serviceContent2}>
              <button className={classes.booknow}>Book Now</button>
            </div>
          </div>
          <div className={classes.divService}>
            <img className={classes.imgService} src='welcomePage/serviceproviders/santanuhazarika.jpg' alt='Image' />
            <div className={classes.serviceContent1}>
              <span className={classes.serviceName}>Santanu Hazarika</span>
              <div className={classes.line}></div>
              <span className={classes.designation}>Art</span>
            </div>
            <div className={classes.serviceContent2}>
              <button className={classes.booknow}>Book Now</button>
            </div>
          </div>
        </div>
      </section>
      <section className={classes.customersSaying}>
        <img
          width={'100%'}
          height={'100%'}
          src='welcomePage/bgCustomersSaying.png'
          alt='Image'
          className={classes.BGImage}
        />
        <p className={classes.headCustomersSaying}>What our customers are saying</p>
        <Swiper
          slidesPerView={3}
          spaceBetween={70}
          slidesPerGroup={3}
          loop={true}
          loopFillGroupWithBlank={true}
          // pagination={{
          //   clickable: true,
          // }}
          breakpoints={{
            400: {
              slidesPerView: 1,
            },
            1000: {
              slidesPerView: 3,
            },
          }}
          navigation={{
            prevEl: '.prev1',
            nextEl: '.next1',
          }}
          modules={[Pagination, Navigation]}
          className={classes.myTestimonial}
        >
          <SwiperSlide>
            <Box className={classes.inBoxCustomer} sx={{ border: 1, borderColor: '#C4C4C4' }}>
              <div className={classes.ReferalIntroBorder}>
                <div className={classes.ReferalIntro}>
                  <Avatar
                    className={classes.avatarSaying}
                    variant={'rounded'}
                    src={'welcomePage/testimonials/diksharai.jpg'}
                  />
                  <div className={classes.ReferalPara}>
                    <p className={classes.namesSaying}>Diksha Rai</p>
                  </div>
                </div>
                <p className={classes.txtSaying}>
                  &rdquo;Omg! Thank you Avantika & Break Free, you have been so warm & welcoming throughout. Totally
                  enjoyed this session with you guys, it was litreally a weekend well spent. Your efforts have paid off
                  & this event was a huge success!
                  <br />
                  <br />I will surely be in touch & would like to collaborate again with you guys! Keep up the Good
                  work.&rdquo;
                </p>
              </div>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className={classes.inBoxCustomer} sx={{ border: 1, borderColor: '#C4C4C4' }}>
              <div className={classes.ReferalIntroBorder}>
                <video
                  className={classes.videoCustomersSaying}
                  controls
                  loop
                  src='welcomePage/testimonials/sanjana.mp4'
                ></video>
              </div>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className={classes.inBoxCustomer} sx={{ border: 1, borderColor: '#C4C4C4' }}>
              <div className={classes.ReferalIntroBorder}>
                <div className={classes.ReferalIntro}>
                  <Avatar
                    className={classes.avatarSaying}
                    variant={'rounded'}
                    src={'welcomePage/testimonials/pulkitkochhar.jpeg'}
                  />
                  <div className={classes.ReferalPara}>
                    <p className={classes.namesSaying}>Pulkit Kochhar</p>
                  </div>
                </div>
                <p className={classes.txtSaying}>
                  &rdquo;My experience with break Free was excellent.
                  <br />
                  <br />
                  Got instant response & solutions for my Digital marketing problems.
                  <br />
                  <br />
                  Thank you Avantika for this wonderful experience.&rdquo;
                </p>
              </div>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className={classes.inBoxCustomer} sx={{ border: 1, borderColor: '#C4C4C4' }}>
              <div className={classes.ReferalIntroBorder}>
                <video
                  className={classes.videoCustomersSaying}
                  controls
                  loop
                  src='welcomePage/testimonials/tanya.mp4'
                ></video>
              </div>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className={classes.inBoxCustomer} sx={{ border: 1, borderColor: '#C4C4C4' }}>
              <div className={classes.ReferalIntroBorder}>
                <div className={classes.ReferalIntro}>
                  <Avatar
                    className={classes.avatarSaying}
                    variant={'rounded'}
                    src={'welcomePage/testimonials/SteffyJames.jpeg'}
                  />
                  <div className={classes.ReferalPara}>
                    <p className={classes.namesSaying}>Steffy James</p>
                  </div>
                </div>
                <p className={classes.txtSaying}>
                  &rdquo;As an artist who has just started out small. This platform has been a great experience for me.
                  Not only was I given the right kind of exposure, I was also given an opportunity for collaborations.
                  <br />
                  <br />
                  Break Free truly does justice to its name. Glad to be a part of this family.&rdquo;
                </p>
              </div>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className={classes.inBoxCustomer} sx={{ border: 1, borderColor: '#C4C4C4' }}>
              <div className={classes.ReferalIntroBorder}>
                <video
                  className={classes.videoCustomersSaying}
                  controls
                  loop
                  src='welcomePage/testimonials/gayab.mp4'
                ></video>
              </div>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className={classes.inBoxCustomer} sx={{ border: 1, borderColor: '#C4C4C4' }}>
              <div className={classes.ReferalIntroBorder}>
                <div className={classes.ReferalIntro}>
                  <Avatar
                    className={classes.avatarSaying}
                    variant={'rounded'}
                    src={'welcomePage/testimonials/reenachopra.jpg'}
                  />
                  <div className={classes.ReferalPara}>
                    <p className={classes.namesSaying}>Reena Chopra</p>
                  </div>
                </div>
                <p className={classes.txtSaying}>
                  &rdquo;Thank You @ssbreakfree for sharing my work and reaching out to your audience.
                  <br />
                  <br />
                  You are doing a good in bringing all types of artisans onto one common platform.&rdquo;
                </p>
              </div>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className={classes.inBoxCustomer} sx={{ border: 1, borderColor: '#C4C4C4' }}>
              <div className={classes.ReferalIntroBorder}>
                <video
                  className={classes.videoCustomersSaying}
                  controls
                  loop
                  src='welcomePage/testimonials/lavaniarosie.mp4'
                ></video>
              </div>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className={classes.inBoxCustomer} sx={{ border: 1, borderColor: '#C4C4C4' }}>
              <div className={classes.ReferalIntroBorder}>
                <div className={classes.ReferalIntro}>
                  <Avatar
                    className={classes.avatarSaying}
                    variant={'rounded'}
                    src={'welcomePage/testimonials/shreerawat.jpg'}
                  />
                  <div className={classes.ReferalPara}>
                    <p className={classes.namesSaying}>Shree Rawat</p>
                  </div>
                </div>
                <p className={classes.txtSaying}>
                  &rdquo;Hey! I feel so grateful I got to work with such a wonderful team.
                  <br />
                  <br />
                  Thank you so much for this experience.
                  <br />
                  <br />I hope I get to work with this team in future as well Kudos to such an efficient bunch of
                  people.&rdquo;
                </p>
              </div>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className={classes.inBoxCustomer} sx={{ border: 1, borderColor: '#C4C4C4' }}>
              <div className={classes.ReferalIntroBorder}>
                <video
                  className={classes.videoCustomersSaying}
                  controls
                  loop
                  src='welcomePage/testimonials/mithalishetty.mp4'
                ></video>
              </div>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className={classes.inBoxCustomer} sx={{ border: 1, borderColor: '#C4C4C4' }}>
              <div className={classes.ReferalIntroBorder}>
                <div className={classes.ReferalIntro}>
                  <Avatar
                    className={classes.avatarSaying}
                    variant={'rounded'}
                    src={'welcomePage/testimonials/gaurirastogi.jpg'}
                  />
                  <div className={classes.ReferalPara}>
                    <p className={classes.namesSaying}>Gauri Rastogi</p>
                  </div>
                </div>
                <p className={classes.txtSaying}>
                  &rdquo;I got in touch with breakfree and Avantika through a common friend! The kind of network and
                  opportunities they provided me with was one of my key steps to be able to navigate this space without
                  too much hassle.
                  <br />
                  <br />
                  Through breakfree I was able to find a marketing agency, a photographer and models for my
                  brand!&rdquo;
                </p>
              </div>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className={classes.inBoxCustomer} sx={{ border: 1, borderColor: '#C4C4C4' }}>
              <div className={classes.ReferalIntroBorder}>
                <video
                  className={classes.videoCustomersSaying}
                  controls
                  loop
                  src='welcomePage/testimonials/radhika.mp4'
                ></video>
              </div>
            </Box>
          </SwiperSlide>

          <div className={classes.navigationEvents}>
            <div className='prev1'>
              <svg width='30' height='29' viewBox='0 0 30 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M0.5 14.5C0.5 6.78386 6.97576 0.5 15 0.5C23.0242 0.5 29.5 6.78386 29.5 14.5C29.5 22.2161 23.0242 28.5 15 28.5C6.97576 28.5 0.5 22.2161 0.5 14.5Z'
                  stroke='#1F1F2D'
                />
                <path
                  d='M21.8184 14.5L8.18199 14.5'
                  stroke='#1F1F2D'
                  strokeWidth='5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M14.6586 15.8182L16.7041 21.75L7.68138 15.8182L7.68138 13.1818L16.7041 7.25L14.6586 12.7864L14.6586 15.8182Z'
                  fill='#1F1F2D'
                  stroke='#1F1F2D'
                  strokeWidth='0.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M16.3633 6.81061L5.90873 14.2803L16.3633 21.75'
                  stroke='#1F1F2D'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div className='next1'>
              <svg width='30' height='29' viewBox='0 0 30 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M29.5 14.5C29.5 22.2161 23.0242 28.5 15 28.5C6.97576 28.5 0.5 22.2161 0.5 14.5C0.5 6.78386 6.97576 0.5 15 0.5C23.0242 0.5 29.5 6.78386 29.5 14.5Z'
                  stroke='#1F1F2D'
                />
                <path
                  d='M8.18164 14.5L21.818 14.5'
                  stroke='#1F1F2D'
                  strokeWidth='5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M15.3414 13.1818L13.2959 7.25L22.3186 13.1818V15.8182L13.2959 21.75L15.3414 16.2136V13.1818Z'
                  fill='#1F1F2D'
                  stroke='#1F1F2D'
                  strokeWidth='0.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M13.6367 22.1894L24.0913 14.7197L13.6367 7.25'
                  stroke='#1F1F2D'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </div>
        </Swiper>

        {/* <div className={classes.divBoxCustomersSaying}>
          <Box className={classes.inBoxCustomersSaying}>
            <div className={classes.ReferalIntro}>
              <Avatar
                className={classes.avatarCustomerSaying}
                variant={'rounded'}
                src={'welcomePage/SteffyJames.jpeg'}
              />
              <div className={classes.ReferalIntroPara}>
                <p className={classes.namesCustomersSaying}>Steffy James</p>
                <p className={classes.professionCustomersSaying}>Musician</p>
              </div>
            </div>
            <p className={classes.txtCustomersSaying}>
              &rdquo;As an artist who has just started out small. This platform
              has been a great experience for me. Not only was I given the right
              kind of exposure, I was also given an opportunity for
              collaborations. Break free truly does justice to its name. Glad to
              be a part of this family&rdquo;
            </p>
          </Box>

          <Box className={classes.inBoxCustomersSaying}>
            <video
              className={classes.videoCustomersSaying}
              loop
              muted
              autoPlay
              src='welcomePage/testimonyLavania.mp4'></video>
          </Box>

          <Box className={classes.inBoxCustomersSaying}>
            <div className={classes.ReferalIntro}>
              <Avatar
                className={classes.avatarCustomerSaying}
                variant={'rounded'}
                src={'welcomePage/SteffyJames.jpeg'}
              />
              <div className={classes.ReferalIntroPara}>
                <p className={classes.namesCustomersSaying}>Steffy James</p>
                <p className={classes.professionCustomersSaying}>Musician</p>
              </div>
            </div>
            <p className={classes.txtCustomersSaying}>
              {`"As an artist who has just started out small. This platform
              has been a great experience for me. Not only was I given the right
              kind of exposure, I was also given an opportunity for
              collaborations. Break free truly does justice to its name. Glad to
              be a part of this family"`}
            </p>
          </Box>
        </div> */}
      </section>

      {/* <div className={classes.readyToBreakFree}>
        <Box className={classes.lastSection}>
          <Avatar
            className={classes.logoLastSection}
            variant={'rounded'}
            src={'welcomePage/breakFree2.png'}
          />
          <span className={classes.soulSays}>SOUL SAYS BREAK FREE</span>
          <Button className={classes.btnBookAService}>Book a service</Button>
          <span className={classes.headPopularServices}>POPULAR SERVICES</span>
          <span className={classes.headLegal}>LEGAL</span>
          <span>
            <ul className={classes.ul1PopularServices}>
              <li>
                <a className={classes.underlineText} href=''>
                  Art
                </a>
              </li>
              <li>
                <a className={classes.underlineText} href=''>
                  Dance
                </a>
              </li>
              <li>
                <a className={classes.underlineText} href=''>
                  Music
                </a>
              </li>
              <li>
                <a className={classes.underlineText} href=''>
                  Fashion
                </a>
              </li>
              <li>
                <a className={classes.underlineText} href=''>
                  Actor
                </a>
              </li>
            </ul>
          </span>
          <span>
            <ul className={classes.ul2PopularServices}>
              <li>
                <a className={classes.underlineText} href=''>
                  Photography
                </a>
              </li>
              <li>
                <a className={classes.underlineText} href=''>
                  Comedy
                </a>
              </li>
              <li>
                <a className={classes.underlineText} href=''>
                  Layer
                </a>
              </li>
              <li>
                <a className={classes.underlineText} href=''>
                  Rap
                </a>
              </li>
              <li>
                <a className={classes.underlineText} href=''>
                  Blogger
                </a>
              </li>
            </ul>
          </span>
          <span>
            <ul className={classes.ul3PopularServices}>
              <li>
                <a className={classes.underlineText} href=''>
                  Designer
                </a>
              </li>
              <li>
                <a className={classes.underlineText} href=''>
                  CA
                </a>
              </li>
              <li>
                <a className={classes.underlineText} href=''>
                  DJ
                </a>
              </li>
              <li>
                <a className={classes.underlineText} href=''>
                  Writer
                </a>
              </li>
            </ul>
          </span>
          <span>
            <ul className={classes.ul1Legal}>
              <li>
                <a className={classes.underlineText} href=''>
                  Terms and conditions
                </a>
              </li>
              <li>
                <a className={classes.underlineText} href=''>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </span>

          <hr className={classes.bottomLine} />

          <span className={classes.copyRight}>
            © Break Free 2021. All reights reserved
          </span>
          <span className={classes.iconsEnd}>
            <Button className={classes.btnEnd}>
              <img
                className={classes.imgEnd}
                src='welcomePage/twitter.svg'
                alt=''
              />
            </Button>
            <Button className={classes.btnEnd}>
              <img
                className={classes.imgEnd}
                src='welcomePage/instagram.svg'
                alt=''
              />
            </Button>
            <Button className={classes.btnEnd}>
              <img
                className={classes.imgEnd}
                src='welcomePage/linkedin.svg'
                alt=''
              />
            </Button>
            <Button className={classes.btnEnd}>
              <img
                className={classes.imgEnd}
                src='welcomePage/facebook.svg'
                alt=''
              />
            </Button>
          </span>
        </Box>

        <Box className={classes.boxReadyToBreakFree}>
          <p className={classes.headReadyToBreakFree}>Ready to Break Free?</p>
          <p className={classes.getReady}>
            Get started to book your next service or register yourself as a
            professional
          </p>
          <Button
            className={classes.btnRegisterAsProfessional}
            sx={{ border: 1, borderColor: 'white' }}>
            Register as a professional
          </Button>
          <Button
            className={classes.btnGetStarted}
            sx={{ border: 1, borderColor: 'white' }}>
            Get Started
          </Button>
        </Box>
      </div> */}

      <div className={classes.readyBreakFree}>
        <Box className={classes.boxReadyBreakFree}>
          {/* <Card> */}
          <p className={classes.headReadyBreakFree}>Ready to Break Free?</p>
          <div className={classes.actionButtons}>
            <Button
              className={classes.btnRegisterProfessional}
              sx={{ border: 1, borderColor: 'white' }}
              onClick={() => router.push('/signup/merchants/individuals')}
            >
              Start Working
            </Button>
            <Button
              className={classes.btnStarted}
              sx={{ border: 1, borderColor: 'white' }}
              onClick={(e) => {
                setCustomerLogin(true);
              }}
            >
              Start Hiring
            </Button>
          </div>
          {/* </Card> */}
        </Box>
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
    </div>
  );
};
export default HomePageComplete;
