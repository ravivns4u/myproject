import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks';
import { getUserDetails } from '../../../redux/slices/user';
import Client from '../../../firebase/firebase_client_exports';
import { getEvents } from '../../../redux/slices/events';
import moment from 'moment';
import Spinner from '../../../components/Common/Spinner/Spinner';

const FeaturedEvents = (props: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { eId } = router.query;

  const {
    user: { isLoggedIn, user, uid, firebaseToken },
    profile: {
      feeds: { images },
      feeds1: { caption },
      dp,
    },
    comments: { comments },
    events: { events },
  } = useAppSelector((state) => state);

  useEffect(() => {
    const payload = { uid, categories: user.categories };
    if (firebaseToken) {
      dispatch(getEvents({ firebaseToken, payload }));
    }
  }, [firebaseToken, dispatch, uid]);

  useEffect(() => {
    const subcribe = onAuthStateChanged(Client.auth, (user) => {
      if (user !== null) {
        user.getIdToken().then((token) => {
          dispatch(getUserDetails({ firebaseToken: token }));
        });
      } else {
        router.push('/login/merchants/individuals');
      }
    });
    return subcribe()
  }, [dispatch, router]);

  return (
    <>
      {events ? (
        events
          ?.filter((event: any) => event.fileName === eId)
          .map((eventsData: any, index: any) => (
            <Box className='divide' key={index}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  pt: { xs: 0, md: 1 },
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: { xs: '100%', md: '80%' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    p: 1,
                  }}
                >
                  {eventsData.eventsUri[0] ? (
                    <Box sx={{ position: 'relative', width: '100%' }}>
                      <Image
                        src={eventsData.eventsUri[0]}
                        width='1000'
                        height={'400'}
                        layout={'responsive'}
                        className={'eventDataImage'}
                        alt=''
                      />
                    </Box>
                  ) : (
                    <Spinner />
                  )}
                  <Box
                    sx={{
                      width: '90%',
                      margin: 'auto',
                      marginTop: '-20px',
                      zIndex: 1,
                    }}
                  >
                    <Card>
                      <CardContent
                        sx={{
                          width: '96%',
                          justifyContent: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography
                          variant={'h2'}
                          gutterBottom
                          sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'center', fontWeight: 'bold' }}
                        >
                          {eventsData.name}
                        </Typography>
                        <Typography
                          variant={'h4'}
                          gutterBottom
                          sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'center', fontWeight: 'bold' }}
                        >
                          {eventsData.name}
                        </Typography>
                        {/*<Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        px: { xs: 1, md: 6, lg: 11 },
                                                    }}
                                                >*/}
                        <Grid container spacing={2} sx={{ justifyContent: 'center', textAlign: 'center' }}>
                          <Grid item xs={6} md={4}>
                            <Typography
                              gutterBottom
                              variant={'subtitle2'}
                              sx={{
                                color: '#D2C711',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <CalendarTodayOutlinedIcon sx={{ mr: 1 }} />
                              {new Date(eventsData.startDate).toDateString()}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={4}>
                            <Typography
                              gutterBottom
                              variant={'subtitle2'}
                              sx={{
                                color: '#D2C711',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <AccessTimeIcon sx={{ mr: 1 }} />
                              {moment.unix(eventsData.startTimeStamp).format('hh:mm A')} -{' '}
                              {moment.unix(eventsData.endTimeStamp).format('hh:mm A')}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Typography
                              gutterBottom
                              variant={'subtitle2'}
                              sx={{
                                color: '#D2C711',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <LocationOnOutlinedIcon sx={{ mr: 1 }} />
                              In-{eventsData.city}
                            </Typography>
                          </Grid>
                        </Grid>
                        {/*</Box>*/}
                        <Grid container spacing={2} sx={{ px: 2, mt: 2 }}>
                          <Grid item xs={12} md={6} order={1}>
                            <Typography variant={'h6'} gutterBottom sx={{ fontWeight: 'bold' }}>
                              About the Event
                            </Typography>
                            <Typography variant={'subtitle1'} gutterBottom sx={{ minHeight: '200px' }}>
                              {eventsData.about}
                            </Typography>
                            <Typography variant={'h6'} gutterBottom sx={{ fontWeight: 'bold', mt: 4 }}>
                              About the Host
                            </Typography>
                            <Card sx={{ background: '#F9F9F9' }} elevation={0}>
                              <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Avatar alt='Remy Sharp' src={eventsData.publicUri[0]} />
                                  <Typography sx={{ mt: 1, ml: 1 }} variant={'subtitle2'} gutterBottom>
                                    {eventsData.creator_name}
                                  </Typography>
                                </Box>
                                <Typography variant={'body2'} gutterBottom>
                                  {eventsData.aboutHost}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} md={6} order={2}>
                            <Card sx={{ mb: 2, p: 2 }}>
                              <CardContent>
                                <Typography variant={'subtitle1'} gutterBottom sx={{ fontWeight: 'bold' }}>
                                  Booking
                                </Typography>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                  <Typography variant={'subtitle2'} gutterBottom sx={{ fontWeight: 'bold' }}>
                                    Amount
                                  </Typography>
                                  <Typography
                                    variant={'subtitle2'}
                                    gutterBottom
                                    sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
                                  >
                                    <CurrencyRupeeOutlinedIcon sx={{ fontSize: '24px' }} />
                                    {eventsData.price}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                            <Card sx={{ background: '#F9F9F9', border: ' 1px solid #EAEAEA' }} elevation={0}>
                              <CardContent>
                                <Typography variant={'subtitle2'} gutterBottom sx={{ fontWeight: 'bold' }}>
                                  Venue Details
                                </Typography>
                                <Typography variant={'body2'} gutterBottom>
                                  {eventsData.venue}
                                </Typography>
                              </CardContent>
                            </Card>
                            <Card sx={{ background: '#F9F9F9', border: ' 1px solid #EAEAEA', mt: 3 }} elevation={0}>
                              <CardContent sx={{ p: '15px' }}>
                                <Typography sx={{ fontWeight: 'bold' }} variant={'subtitle1'} gutterBottom>
                                  Share this profile
                                </Typography>
                                <Divider sx={{ width: '50%' }} />
                                <Box
                                  sx={{
                                    pt: 2,
                                    marginBottom: 'unset',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '50%',
                                  }}
                                >
                                  <a
                                    href={`https://twitter.com/intent/tweet?text=${location.href}`}
                                    target='_blank'
                                    rel='noreferrer'
                                  >
                                    {' '}
                                    <img src='/twitter.svg' />
                                  </a>
                                  {/* <a href={`https://api.whatsapp.com/send?phone=whatsappphonenumber&text=${location.href}`} target="_blank"><img src="/instagram.svg"/></a> */}
                                  <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${location.href}`}
                                    target='_blank'
                                    rel='noreferrer'
                                  >
                                    <img src='/facebook.svg' />
                                  </a>
                                  <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${location.href}`}
                                    target='_blank'
                                    rel='noreferrer'
                                  >
                                    {' '}
                                    <img src='/linkden.svg' />
                                  </a>
                                  <a
                                    href={`https://api.whatsapp.com/send?text=${location.href}`}
                                    target='_blank'
                                    rel='noreferrer'
                                  >
                                    {' '}
                                    <img src='/whatsapp.svg' />
                                  </a>
                                  {/* <a> <img src="/copy_icon.svg"/></a> */}
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default FeaturedEvents;
