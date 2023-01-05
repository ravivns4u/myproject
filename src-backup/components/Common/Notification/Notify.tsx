import React from 'react';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import moment from 'moment';

const Notify = (props: any) => {
    return (
        <>
            <Box
                sx={{ px: 1.6, py: 0.5, cursor: 'pointer' }}
                onClick={props?.notificationHandler}
            >
                <Box
                    sx={{
                        backgroundColor: `${
                            props?.notificationStatus === false ? '#F5F5F5' : 'transparent'
                        }`,
                        p: 1,
                        borderRadius: '12px',
                    }}
                >
                    <Box sx={{ display: 'flex', my: { xs: 1, md: 0 } }}>
                        <CircleIcon
                            sx={{
                                color: `${
                                    props?.notificationStatus === false ? 'blue' : 'black'
                                }`,
                                mt: { xs: 0.6 },
                                mr: 0.8,
                                fontSize: '12px',
                            }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ maxWidth: { xs: '100%', md: 200 } }}>
                                    <Typography
                                        variant={'h6'}
                                        sx={{
                                            display: { xs: 'block', md: 'none' },
                                            fontWeight: 'medium',
                                            pr: 1,
                                            textTransform: 'capitalize',
                                            color: `${
                                                props?.notificationStatus === false ? 'blue' : 'black'
                                            }`,
                                        }}
                                    >
                                        {props?.notification?.notification_type !== 'Feed'
                                            ? props?.notificationContent
                                            : `${props?.notificationContent}`}
                                    </Typography>
                                    <Typography
                                        variant={'subtitle2'}
                                        sx={{
                                            display: { xs: 'none', md: 'block' },
                                            fontWeight: 'medium',
                                            pr: 1,
                                            textTransform: 'capitalize',
                                            color: `${
                                                props?.notificationStatus === false ? 'blue' : 'black'
                                            }`,
                                        }}
                                    >
                                        {props?.notification?.notification_type !== 'Feed'
                                            ? props?.notificationContent
                                            : `${props?.notificationContent}`}
                                    </Typography>
                                </Box>
                                {props?.notification?.fileType === 'image' ? (
                                    <Avatar
                                        style={{ width: 56, height: 56 }}
                                        alt='Remy Sharp'
                                        src={props?.notification?.feedUri}
                                        sizes={'large'}
                                    />
                                ) : props?.notification?.fileType === 'video' ? (
                                    <video
                                        autoPlay={false}
                                        muted
                                        height={56}
                                        style={{
                                            borderRadius: '100%',
                                            background: 'cyan',
                                            border: '2px solid grey',
                                            width:'56px',
                                            '@media screen and (maxWidth:560px)' : {
                                                width:'85px'
                                            }
                                        }}
                                        src={props?.notification?.feedUri}
                                    />
                                ) : props?.notification?.fileType === 'text' ? (
                                    <Avatar
                                        style={{ width: 56, height: 56 }}
                                        alt='Remy Sharp'
                                        src={props?.notificationAvatar}
                                        sizes={'large'}
                                    />
                                ) : (
                                    <Avatar
                                        style={{ width: 56, height: 56 }}
                                        alt='Remy Sharp'
                                        src={props?.notificationAvatar}
                                        sizes={'large'}
                                    />
                                )}
                            </Box>
                            <Box
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    alignItems: 'center',
                                    mt: 0.6,
                                }}
                            >
                                <Typography variant={'caption'} sx={{ mr: 0.6 }}>
                                    {props?.notificationName}
                                </Typography>
                                <CircleIcon sx={{ fontSize: '8px', mr: 0.6 }}/>
                                <Typography variant={'caption'}>
                                    {moment(props?.notificationTime).format('MMM Do, YYYY')} at{' '}
                                    {moment(props?.notificationTime).format('hh:mm a')}{' '}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: { xs: 'flex', md: 'none' },
                                    alignItems: 'center',
                                    mt: 0.6,
                                }}
                            >
                                <Typography variant={'body2'} sx={{ mr: 0.6 }}>
                                    {props?.notificationName}
                                </Typography>
                                <CircleIcon sx={{ fontSize: '8px', mr: 0.6 }}/>
                                <Typography variant={'body2'}>
                                    {moment(props?.notificationTime).format('MMM Do, YYYY')} at{' '}
                                    {moment(props?.notificationTime).format('hh:mm a')}{' '}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ pt: 1, mx: 2 }}/>
            </Box>
        </>
    );
};

export default Notify;
