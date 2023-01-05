import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Link,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function tabsProps(index: number) {
  return {
    style: {
      fontWeight: 'bold',
      color: 'black',
    },
    id: `gallery-tabs-${index}`,
    'aria-controls': `gallery-tabs-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`gallery-tabs-${index}`}
      aria-labelledby={`gallery-tabs-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, borderRadius: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const FeaturedArtistComponent = (props: any) => {
  const [tabs, setTabs] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setTabs(newValue);
  };

  return (
    <Box className='divide'>
      <Box
        sx={{
          backgroundColor: 'white',
          pt: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '80%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 1,
          }}
        >
          <Box sx={{ position: 'relative', width: '100%' }}>
            {/*<Image
              src={
                'https://images.unsplash.com/photo-1581985673473-0784a7a44e39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
              }
              width='1000'
              height={'400'}
              layout={'responsive'}
              style={{
                borderRadius: '20px',
                objectFit:'contain',
              }}
            />*/}
          </Box>
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
                <Box
                  sx={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: '50%',
                    bottom: '16%',
                    transform: 'translate(-50%, -16%)',
                    zIndex: 9,
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 88,
                      height: 88,
                    }}
                    alt='Remy Sharp'
                    src={
                      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                    }
                  />
                </Box>
                <Grid container spacing={4} sx={{ pt: 8 }}>
                  <Grid item xs={6}>
                    <Typography variant={'subtitle1'} gutterBottom sx={{ fontWeight: 'bold' }}>
                      Gallery
                    </Typography>
                    <Box
                      sx={{
                        background: '#F9F9F9',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        borderBottomLeftRadius: 6,
                        borderBottomRightRadius: 6,
                      }}
                    >
                      <Tabs
                        sx={{
                          border: '2px solid #FCFF01',
                          borderRadius: '50px',
                        }}
                        value={tabs}
                        onChange={handleChange}
                        variant='fullWidth'
                        aria-label='gallery-tabs'
                        centered
                      >
                        <Tab label='Images' {...tabsProps(0)} />
                        <Tab label='Videos' {...tabsProps(1)} />
                      </Tabs>
                      <TabPanel value={tabs} index={0}>
                        <Box
                          sx={{
                            height: 400,
                            overflowY: 'scroll',
                            '&::-webkit-scrollbar': {
                              width: '4px',
                              height: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                              borderRadius: '10px',
                              // backgroundColor: 'rgba(0, 0, 0, 0.4)'
                              backgroundColor: 'transparent',
                            },
                            '&::-webkit-scrollbar-thumb': {
                              backgroundColor: '#e78632',
                              // backgroundImage:'-webkit-linear-gradient(45deg,rgba(255,255,255,.3) 20%,transparent 20%,transparent 40%,rgba(255, 255, 255, 0.3) 40%,rgba(255,255,255,.3) 60%,transparent 60%,transparent 80%,rgba(255, 255, 255, 0.3) 80%)',
                              borderRadius: '10px',
                            },
                          }}
                        >
                          <ImageList variant='masonry' cols={3} gap={8}>
                            {itemData.map((item) => (
                              <ImageListItem key={item.img}>
                                <img
                                  src={`${item.img}?w=248&fit=crop&auto=format`}
                                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                  alt={item.title}
                                  loading='lazy'
                                  // layout={"responsive"}
                                  // height={100}
                                  // width={'100%'}
                                />
                              </ImageListItem>
                            ))}
                          </ImageList>
                        </Box>
                      </TabPanel>
                      <TabPanel value={tabs} index={1}>
                        <Box
                          sx={{
                            height: 400,
                            overflowY: 'scroll',
                            '&::-webkit-scrollbar': {
                              width: '4px',
                              height: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                              borderRadius: '10px',
                              // backgroundColor: 'rgba(0, 0, 0, 0.4)'
                              backgroundColor: 'transparent',
                            },
                            '&::-webkit-scrollbar-thumb': {
                              backgroundColor: '#e78632',
                              // backgroundImage:'-webkit-linear-gradient(45deg,rgba(255,255,255,.3) 20%,transparent 20%,transparent 40%,rgba(255, 255, 255, 0.3) 40%,rgba(255,255,255,.3) 60%,transparent 60%,transparent 80%,rgba(255, 255, 255, 0.3) 80%)',
                              borderRadius: '10px',
                            },
                          }}
                        >
                          <ImageList variant='masonry' cols={3} gap={8}>
                            {itemData.map((item) => (
                              <ImageListItem key={item.img}>
                                <img
                                  src={`${item.img}?w=248&fit=crop&auto=format`}
                                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                  alt={item.title}
                                  loading='lazy'
                                  // layout={"responsive"}
                                  // height={100}
                                  // width={'100%'}
                                />
                              </ImageListItem>
                            ))}
                          </ImageList>
                        </Box>
                      </TabPanel>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant={'h6'} gutterBottom sx={{ fontWeight: 'bold' }}>
                      Biography
                    </Typography>
                    <Typography variant={'subtitle1'} gutterBottom>
                      Touting “quick and simple image placeholders,” Placeholder.com is easy to remember, and easy to
                      use. Just grab their image URL, modify with your size parameters, and voila!{' '}
                      <Link href={'#'} underline='none'>
                        see more...
                      </Link>
                    </Typography>
                    <Card sx={{ background: '#F9F9F9', mt: 3 }} elevation={0}>
                      <CardContent>
                        <Typography sx={{ fontWeight: 'bold' }} variant={'subtitle1'} gutterBottom>
                          Certifications
                        </Typography>
                        <Divider />
                        <Typography variant={'body2'} gutterBottom sx={{ pt: 1 }}>
                          Touting “quick and simple image placeholders,” Placeholder.com is easy to remember, and easy
                          to use. Just grab their image URL, modify with your size parameters, and voila!
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card sx={{ background: '#F9F9F9', mt: 3 }} elevation={0}>
                      <CardContent>
                        <Typography sx={{ fontWeight: 'bold' }} variant={'subtitle1'} gutterBottom>
                          Achievements
                        </Typography>
                        <Divider />
                        <Typography variant={'body2'} gutterBottom sx={{ pt: 1 }}>
                          Touting “quick and simple image placeholders,” Placeholder.com is easy to remember, and easy
                          to use. Just grab their image URL, modify with your size parameters, and voila!
                        </Typography>
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
  );
};

export default FeaturedArtistComponent;

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
  },
];
