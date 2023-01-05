import { Avatar, Box, Card, CardContent, Divider, Fab, Grid, ImageList, ImageListItem, Link, Tab, Tabs, Typography, } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../../redux/app/hooks';
import { getArtists } from '../../../../redux/slices/artists';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserDetails } from '../../../../redux/slices/user';
import { getPorfolios } from '../../../../redux/slices/portfolio';
import Client from '../../../../firebase/firebase_client_exports';
import Spinner from '../../../../components/Common/Spinner/Spinner';
import coverImage from '../../../../../public/artistPage/Cover.png';
import { styled } from '@mui/styles';

export async function getStaticProps(props: any) {
    return { props: { isDark: true } };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: false, // can also be true or 'blocking'
    };
}

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
    const router = useRouter();
    const { aId } = router.query;

    const dispatch = useAppDispatch();
    const {
        user: { isLoggedIn, user, uid, firebaseToken },
        profile: {
            feeds: { images },
            feeds1: { caption },
            dp,
        },
        comments: { comments },
        events: { events },
        artists: { artists },
        portfolio: { portfolio },
    } = useAppSelector((state) => state);

    useEffect(() => {
        const payload = { uid: aId };
        if (firebaseToken.length !== 0) {
            dispatch(getPorfolios({ firebaseToken, payload }));
        }
    }, [firebaseToken, dispatch, uid]);

    useEffect(() => {
        const payload = { categories: user?.categories };
        console.log("artist ald", payload)
        if (firebaseToken.length !== 0) {
            dispatch(getArtists({ firebaseToken, payload }));
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

    const fileType = (fileName: string) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    };

    const filteredVideos = portfolio?.reduce(function(filtered: any[], option: any) {
        if (fileType(option?.fileName) == 'mp4') {
            filtered.push(option);
        }
        return filtered;
    }, []);

    const filteredImages = portfolio?.reduce(function(filtered: any[], option: any) {
        if (fileType(option?.fileName) !== 'mp4') {
            filtered.push(option);
        }
        return filtered;
    }, []);

    const handleChange = (event: any, newValue: number) => {
        setTabs(newValue);
    };

    const StyledFab = styled(Fab)({
        position: 'absolute',
        zIndex: 1,
        top: -20,
        left: 0,
        right: 0,
        margin: '0 auto',
    });

    return (
        <>
            {artists ? (
                artists
                    ?.filter((artist: any) => artist.uid === aId)
                    .map((artistData: any, index: any) => (
                        <Box className='divide' key={index}>
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
                                        width: { xs: '100%', md: '80%' },
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        p: 1,
                                    }}
                                >
                                    <Box sx={{ position: 'relative', width: '100%' }}>
                                        <Image
                                            src={coverImage}
                                            width='1000'
                                            height={'400'}
                                            layout={'responsive'}
                                            style={{
                                                borderRadius: '20px',
                                            }}
                                            alt=''
                                        />
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
                                                    flexDirection: { xs: 'row', md: 'column' },
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        right:0,
                                                        margin:'0 auto',
                                                        top:{xs:160,md:440},
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
                                                        src={artistData?.publicUri[0]}
                                                    />
                                                </Box>
                                                <StyledFab>
                                                    <Avatar
                                                        sx={{
                                                            width: 88,
                                                            height: 88,
                                                        }}
                                                        alt='Remy Sharp'
                                                        src={artistData?.publicUri[0]}
                                                    />
                                                </StyledFab>
                                                <Grid container spacing={4} sx={{ pt: 8 }}>
                                                    <Grid item xs={12} order={{ xs: 2, md: 1 }} md={6}>
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
                                                                            backgroundColor: 'transparent',
                                                                        },
                                                                        '&::-webkit-scrollbar-thumb': {
                                                                            backgroundColor: '#e78632',
                                                                            borderRadius: '10px',
                                                                        },
                                                                    }}
                                                                >
                                                                    {filteredImages?.length !== 0 ? (
                                                                        <ImageList variant='masonry' cols={3} gap={8}>
                                                                            {filteredImages?.map((image: any, index: any) => {
                                                                                return (
                                                                                    <ImageListItem key={index}>
                                                                                        <img
                                                                                            src={image?.portfolioUri}
                                                                                            // layout={'responsive'}
                                                                                            height={100}
                                                                                            width={'100%'}
                                                                                            alt={''}
                                                                                        />
                                                                                    </ImageListItem>
                                                                                );
                                                                            })}
                                                                        </ImageList>
                                                                    ) : (
                                                                        <h4 style={{ textAlign: 'center' }}>Images Not Found</h4>
                                                                    )}
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
                                                                            backgroundColor: 'transparent',
                                                                        },
                                                                        '&::-webkit-scrollbar-thumb': {
                                                                            backgroundColor: '#e78632',
                                                                            borderRadius: '10px',
                                                                        },
                                                                    }}
                                                                >
                                                                    {filteredVideos?.length !== 0 ? (
                                                                        <>
                                                                            <ImageList variant='masonry' cols={2} gap={8}
                                                                                       sx={{ display: { xs: 'none', md: 'block' } }}>
                                                                                {filteredVideos?.map((portfolio: any, index: any) => {
                                                                                    return (
                                                                                        <ImageListItem key={index}>
                                                                                            <iframe
                                                                                                width={178}
                                                                                                height={100}
                                                                                                src={portfolio?.portfolioUri[0]}
                                                                                            />
                                                                                        </ImageListItem>
                                                                                    );
                                                                                })}
                                                                            </ImageList>
                                                                            <ImageList variant='masonry' cols={1} gap={8}
                                                                                       sx={{ display: { xs: 'block', md: 'none' } }}>
                                                                                {filteredVideos?.map((portfolio: any, index: any) => {
                                                                                    return (
                                                                                        <ImageListItem key={index}>
                                                                                            <iframe
                                                                                                width={180}
                                                                                                height={100}
                                                                                                src={portfolio?.portfolioUri[0]}
                                                                                            />
                                                                                        </ImageListItem>
                                                                                    );
                                                                                })}
                                                                            </ImageList>
                                                                        </>
                                                                    ) : (
                                                                        <h4 style={{ textAlign: 'center' }}>Videos Not Found</h4>
                                                                    )}
                                                                </Box>
                                                            </TabPanel>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} order={{ xs: 1, md: 2 }} md={6}>
                                                        <Typography variant={'h6'} gutterBottom sx={{ fontWeight: 'bold' }}>
                                                            Biography
                                                        </Typography>
                                                        <Typography variant={'subtitle1'} gutterBottom>
                                                            {artistData.bio ? artistData.bio : 'NA'}{' '}
                                                            {artistData.bio !== '' ? (
                                                                <Link href={'#'} underline='none'>
                                                                    see more...
                                                                </Link>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </Typography>
                                                        <Card sx={{ background: '#F9F9F9', mt: 3 }} elevation={0}>
                                                            <CardContent>
                                                                <Typography sx={{ fontWeight: 'bold' }} variant={'subtitle1'} gutterBottom>
                                                                    Certifications
                                                                </Typography>
                                                                <Divider/>
                                                                <Typography variant={'body2'} gutterBottom sx={{ pt: 1 }}>
                                                                    {artistData.certifications ? artistData.certifications : 'NA'}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                        <Card sx={{ background: '#F9F9F9', mt: 3 }} elevation={0}>
                                                            <CardContent>
                                                                <Typography sx={{ fontWeight: 'bold' }} variant={'subtitle1'} gutterBottom>
                                                                    Achievements
                                                                </Typography>
                                                                <Divider/>
                                                                <Typography variant={'body2'} gutterBottom sx={{ pt: 1 }}>
                                                                    {artistData.achievements ? artistData.achievements : 'NA'}
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
                    ))
            ) : (
                <Spinner/>
            )}
        </>
    );
};

export default FeaturedArtistComponent;
