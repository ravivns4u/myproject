import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import classes from './MUIFeedHeader.module.scss';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Client from '../../../../firebase/firebase_client_exports';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../../../../redux/app/hooks';
import { resetUserState } from '../../../../redux/slices/user';
import Link from 'next/link';
import CustomerLoginPopup from '../../../Customer/Skeleton';
// import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
// import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
// @ts-ignore
import { getNotifications, setFeedId } from '../../../../redux/slices/feedsNotification';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';
import { Typography } from '@mui/material';
import { getProfileImage } from '../../../../redux/slices/profile';
import Notify from '../../Notification/Notify';

TimeAgo.addLocale(en);

const returnPathTemplate = (userSlug: string, injector: string) => `/merchants/${userSlug}${injector}`;

const pages = [
  {
    header: 'Company',
    component: WorkIcon,
    href: '/signup/merchants/company',
  },
  {
    header: 'Individuals',
    component: AccountCircleIcon,
    href: '/signup/merchants/individuals',
  },
];

const isUserLoggedIn = false;

const navbarsPages = [
  {
    header: 'For Professionals',
    component: WorkIcon,
    href: '/login/merchants',
    endIcon: ArrowDropDownIcon,
  },
  {
    header: 'For Clients',
    component: AccountCircleIcon,
    href: '/login/customers',
    promptFunctionality: true,
  },
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [customerLogin, setCustomerLogin] = React.useState(false);
  const dispatch = useAppDispatch();
  const {
    user: { isLoggedIn, user, uid, firebaseToken, merchantSlug },
    notify: { notify },
    profile: {
      feeds: { images },
      feeds1: { caption },
      dp,
    },
  } = useAppSelector((state) => state);

  const feedPageNavigation = [
    {
      header: 'Portfolio',
      buttonImage: '/sidebar-icons/portfolio.svg',
      href: (userSlug: string): string => returnPathTemplate(userSlug, '/portfolio/images'),
      comparitor: 'portfolio',
      toShow: user?.ndaSigned === true,
    },
    {
      header: 'Services',
      buttonImage: '/sidebar-icons/services.svg',
      href: (userSlug: string): string => returnPathTemplate(userSlug, '/services/verified'),
      comparitor: 'services',
      toShow: user?.ndaSigned === true,
    },
    {
      header: 'Events',
      buttonImage: '/sidebar-icons/event.svg',
      href: (userSlug: string): string => returnPathTemplate(userSlug, '/events/verified'),
      comparitor: 'events',
      toShow: user?.ndaSigned === true,
    },
    {
      header: 'Products',
      buttonImage: '/sidebar-icons/product.svg',
      href: (userSlug: string): string => returnPathTemplate(userSlug, '/products/verified'),
      comparitor: 'products',
      toShow: user?.ndaSigned === true,
    },
    {
      header: 'Order Requests',
      buttonImage: '/sidebar-icons/order-request.svg',
      href: (userSlug: string): string => returnPathTemplate(userSlug, '/order-requests/events'),
      comparitor: 'order-requests',
      toShow: user?.ndaSigned === true && user?.plan === 'pro',
    },
    {
      header: 'Subscription',
      buttonImage: '/sidebar-icons/subscription.svg',
      href: (userSlug: string): string => returnPathTemplate(userSlug, '/subscription'),
      comparitor: 'subscription',
      toShow: true,
    },
    {
      header: 'Admin',
      buttonImage: '/sidebar-icons/admin.svg',
      href: (userSlug: string): string => returnPathTemplate(userSlug, '/admin-dashboard/accounts'),
      comparitor: 'admin-dashboard',
      toShow: user?.isAdmin,
    },
    {
      header: 'Feeds',
      buttonImage: '/sidebar-icons/feed.svg',
      href: (userSlug: string): string => returnPathTemplate(userSlug, '/feed/images'),
      comparitor: 'feed',
      toShow: user?.isAdmin,
    },
    {
      header: 'Cms',
      buttonImage: '/sidebar-icons/feed.svg',
      href: (userSlug: string): string => returnPathTemplate(userSlug, '/cms/images'),
      comparitor: 'cms',
      toShow: user?.isAdmin,
    },
  ];

  const router = useRouter();
  const pagePath = router.pathname;
  const isUserNavMenuOpen = Boolean(anchorElNav);
  const activeElement = router.query?.merchantSlug?.[1] ?? 'updates';
  const [showSidebar, setShowSidebar] = React.useState(false);

  //  Notification Actions
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);
  const notificationOpen = Boolean(notificationAnchorEl);
  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  const [isActive, setActive] = React.useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };

  const [isActiveMore, setActiveMore] = React.useState(false);
  const handleToggleHder = () => {
    setActiveMore(!isActiveMore);
  };

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const mobileMenuId = 'primary-search-account-menu';
  const [notification, setNotify] = React.useState([]);

  React.useEffect(() => {
    if (isLoggedIn) {
      if (dp === '') dispatch(getProfileImage(uid));
    }
  }, [dp, dispatch, uid]);
  React.useEffect(() => {
    if (firebaseToken.length !== 0) {
      const payload = {
        uid: uid,
      };
      dispatch(getNotifications({ firebaseToken, payload }));
    }
  }, [dispatch, firebaseToken, uid, user.plan]);

  React.useEffect(() => {
    setNotify(notify as []);
  }, [notify]);

  const renderNavMenu = !isUserLoggedIn ? (
    <Menu
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isUserNavMenuOpen}
      onClose={handleCloseNavMenu}
    >
      {pages.map((element, index) => {
        const { header } = element;
        const Component = element.component;
        return (
          <MenuItem
            key={index}
            onClick={() => {
              router.push(element.href);
              handleCloseNavMenu();
            }}
            className={
              element.href === router.pathname ? classes.ActiveRouteClassNavBar : classes.InactiveRouteClassNavBar
            }
          >
            <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
              <Component />
            </IconButton>
            <p>{header}</p>
          </MenuItem>
        );
      })}
    </Menu>
  ) : (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
        <Badge badgeContent={17} color='error'>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton size='large' edge='end' aria-label='account of current user' aria-haspopup='true' color='inherit'>
        <AccountCircleIcon />
      </IconButton>
    </Box>
  );

  const [scroll, setScroll] = React.useState(false);
  React.useEffect(() => {
    if (window.innerWidth <= 720) {
      document.body.addEventListener('scroll', () => {
        setScroll(document.body.scrollTop > 50);
      });
    } else {
      window.addEventListener('scroll', () => {
        setScroll(window.scrollY > 50);
      });
    }
  });

  // Sticky Menu Area
  React.useEffect(() => {
    if (window.innerWidth <= 720) {
      window.addEventListener('scroll', isSticky);
      return () => {
        window.removeEventListener('scroll', isSticky);
      };
    } else {
      window.addEventListener('scroll', isSticky);
      return () => {
        window.removeEventListener('scroll', isSticky);
      };
    }
  });

  const [backendMsg, setBackendMsg] = React.useState('');
  const errorLogger = (error: any, msg: string) => {
    setBackendMsg(msg);
  };

  const notificationClickHandler = (notification: any) => {
    if (notification.notification_type === 'Feed') {
      router.push(`/merchants/feed/updates`);
      // localStorage.setItem('FeedUID', notification.feed_uid);
      dispatch(setFeedId({ feedUid: notification.feed_uid }));
    } else if (notification.notification_type === 'Subscription_Start') {
      if (notification.plan === 'pro' && user?.plan === 'pro') {
        router.push(`/merchants/${merchantSlug}/subscription?pro=true`);
      } else {
        router.push(`/merchants/${merchantSlug}/subscription`);
      }
    } else {
      router.push(`/merchants/${merchantSlug}/subscription`);
    }

    let payloadData = {
      fp: notification?.fp,
      uid: uid,
      name: user.displayName,
    };
    const payload: any = {
      payload: payloadData,
      firebaseToken,
    };
    fetch('/api/notifications/update-notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((response) =>
      response
        .json()
        .then((data: any) => {
          const { error, msg } = data;
          if (error) {
            errorLogger(msg, msg);
          } else {
            const payload = {
              uid: uid,
            };
            setBackendMsg('');
            dispatch(getNotifications({ firebaseToken, payload }));
          }
        })
        .catch((error) => errorLogger(error, 'Unable to Parse Info. Please try again'))
    );
  };

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e: any) => {
    const header = document.querySelector('.headermain');
    let scrollTop;
    if (window.innerWidth <= 720) {
      scrollTop = document.body.scrollTop;
    } else {
      scrollTop = window.scrollY;
    }
    scrollTop >= 50 ? header?.classList.add('is-sticky') : header?.classList.remove('is-sticky');
  };

  const [removeBackground, setRemoveBackground] = React.useState(false);
  React.useEffect(() => {
    if (window.location.pathname === '/') {
      setRemoveBackground(true);
    } else {
      setRemoveBackground(false);
    }
  });

  return (
    <React.Fragment>
      <AppBar
        id='elem'
        className={`hrheader ${removeBackground && !scroll ? ' headerRemoveBackground' : 'headermain'}`}
      >
        <Container maxWidth={false}>
          <Toolbar disableGutters className='HdrSwnvr'>
            {isLoggedIn ? (
              <div className='logo'>
                <Avatar
                  className='Hdrlogo lightlogo'
                  variant={'rounded'}
                  src={'/logo-light.png'}
                  alt='break-free logo'
                  onClick={() => router.push('/merchants/feed/updates')}
                />
                <Avatar
                  className='Hdrlogo'
                  variant={'rounded'}
                  src={'/logo-darknew.png'}
                  alt='break-free logo'
                  onClick={() => router.push('/merchants/feed/updates')}
                />
              </div>
            ) : (
              <div className='logo'>
                <Avatar
                  className='Hdrlogo lightlogo'
                  variant={'rounded'}
                  src={'/logo-light.png'}
                  alt='break-free logo'
                  onClick={() => router.push('/')}
                />
                <Avatar
                  className='Hdrlogo'
                  variant={'rounded'}
                  src={'/logo-darknew.png'}
                  alt='break-free logo'
                  onClick={() => router.push('/')}
                />
              </div>
            )}

            {!isLoggedIn ? (
              <div className={classes.RightSide}>
                <div className={`HdrLeftbtn ${isActiveMore ? 'HdrTgleSwn' : ''}`}>
                  <div className='Clsemhdr' onClick={handleToggleHder}>
                    {' '}
                    <img src='/feedPage/cancel.png' alt=''></img>{' '}
                  </div>
                  <ul>
                    <li>
                      <Link href='/resources'>
                        <a onClick={handleToggleHder}>Resources</a>
                      </Link>
                    </li>
                    <li>
                      <Link href='/aboutus'>
                        <a onClick={handleToggleHder}>About us</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                {navbarsPages.map((page, index) => {
                  const Icon = page.component;
                  const EndIcon = page.endIcon;
                  const routerHref = router.pathname.split('/');
                  const assocHref = page.href.split('/');
                  const stillTrue = routerHref[2] === assocHref[2];
                  return (
                    <div key={index} className='PdrRgtIcon'>
                      <Button
                        // key={index}
                        className={stillTrue ? classes.ActiveRouteClass : classes.GenericClass}
                        onClick={(e) => {
                          if (page.promptFunctionality) {
                            setCustomerLogin(true);
                            return;
                          }
                          if (!EndIcon) router.push(page.href);
                          else handleOpenNavMenu(e);
                        }}
                        sx={{
                          color: 'black',
                          marginRight: 1,
                        }}
                        startIcon={<Icon />}
                        endIcon={EndIcon ? <EndIcon /> : null}
                      >
                        {page.header}
                      </Button>
                    </div>
                  );
                })}
                {renderNavMenu}
                <IconButton onClick={handleToggleHder} sx={{ display: { xs: 'block', md: 'none' } }}>
                  {removeBackground && !scroll ? (
                    <svg
                      className={'handleToggleHder'}
                      width='17'
                      height='20'
                      viewBox='0 0 17 20'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M15.2843 16.2169L4.66181 16.2169C3.92922 16.2169 3.32995 17.0679 3.32995 18.1083C3.32995 19.1486 3.92922 19.9997 4.66181 19.9997L15.2843 20C16.0169 20 16.6162 19.149 16.6162 18.1086C16.6164 17.0682 16.0169 16.2169 15.2843 16.2169V16.2169Z'
                        fill='#303030'
                      />
                      <path
                        d='M4.69511 3.96313L15.2843 3.96313C16.0169 3.96313 16.6162 3.1121 16.6162 2.07173C16.6162 1.03137 16.0169 0.180335 15.2843 0.180335L4.66181 0.180335C3.92922 0.180335 3.32995 1.03137 3.32995 2.07173C3.32995 3.11176 3.9627 3.96313 4.69529 3.96313H4.69511Z'
                        fill='#303030'
                      />
                      <path
                        d='M1.36516 11.9814L15.2843 11.9814C16.0169 11.9814 16.6162 11.1304 16.6162 10.09C16.6162 9.04968 16.0169 8.19865 15.2843 8.19865L1.33186 8.19865C0.599269 8.19865 -1.94113e-07 9.04968 -1.94113e-07 10.09C-1.94113e-07 11.1304 0.63275 11.9814 1.36534 11.9814H1.36516Z'
                        fill='#303030'
                      />
                    </svg>
                  ) : (
                    <svg width='17' height='20' viewBox='0 0 17 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M15.2843 16.0364L4.66181 16.0364C3.92922 16.0364 3.32995 16.8875 3.32995 17.9278C3.32995 18.9682 3.92922 19.8193 4.66181 19.8193L15.2843 19.8196C16.0169 19.8196 16.6162 18.9685 16.6162 17.9282C16.6164 16.8878 16.0169 16.0364 15.2843 16.0364V16.0364Z'
                        fill='white'
                      />
                      <path
                        d='M4.69511 3.78271L15.2843 3.78271C16.0169 3.78271 16.6162 2.93168 16.6162 1.89131C16.6162 0.850951 16.0169 -8.45198e-05 15.2843 -8.45198e-05L4.66181 -8.45198e-05C3.92922 -8.45198e-05 3.32995 0.850951 3.32995 1.89131C3.32995 2.93134 3.9627 3.78271 4.69529 3.78271H4.69511Z'
                        fill='white'
                      />
                      <path
                        d='M1.36516 11.801L15.2843 11.801C16.0169 11.801 16.6162 10.95 16.6162 9.90963C16.6162 8.86926 16.0169 8.01823 15.2843 8.01823L1.33186 8.01823C0.599269 8.01823 -1.94113e-07 8.86926 -1.94113e-07 9.90963C-1.94113e-07 10.95 0.63275 11.801 1.36534 11.801H1.36516Z'
                        fill='white'
                      />
                    </svg>
                  )}
                </IconButton>
              </div>
            ) : (
              <div className={classes.Center}>
                <div className='Srchbox'>
                  <input type='text' placeholder='Search'></input>
                  <a href='#'>
                    {' '}
                    <img src='/feedPage/search.png'></img>{' '}
                  </a>
                </div>

                <Box
                  className={`Mobfixmncr ${isActive ? 'HdrShem' : ''}`}
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    marginLeft: '1rem',
                  }}
                >
                  {feedPageNavigation.map((element) => {
                    const isActive = activeElement === element.comparitor;
                    return element?.toShow ? (
                      <IconButton
                        key={element.comparitor}
                        onClick={() => {
                          router.push(element.href(user?.slug));
                          handleToggle();
                        }}
                        size='large'
                        color='inherit'
                      >
                        <div className={classes.headerIcons} style={{ color: isActive ? 'yellow' : '#6F6F6F' }}>
                          {/* {<Component />} */}
                          <span
                            style={{
                              alignItems: 'center',
                              display: 'flex',
                              fontSize: '16px',
                            }}
                          >
                            <img src={element?.buttonImage} style={{ paddingRight: '10px' }} /> {element.header}
                          </span>
                        </div>
                      </IconButton>
                    ) : null;
                  })}
                  <div className='Clsem' onClick={handleToggle}>
                    {' '}
                    <img src='/feedPage/cancel.png'></img>{' '}
                  </div>
                </Box>
                <Box className={classes.accountsCircle}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <IconButton
                      onClick={handleNotificationOpen}
                      size='small'
                      sx={{ ml: 2 }}
                      aria-controls={notificationOpen ? 'account-menu' : undefined}
                      aria-haspopup='true'
                      aria-expanded={notificationOpen ? 'true' : undefined}
                    >
                      <Badge
                        badgeContent={
                          notification?.filter((notify: any) => {
                            return notify?.seen === false;
                          })?.length
                        }
                        color='primary'
                        overlap='circular'
                      >
                        {/*<NotificationsNoneRoundedIcon sx={{color:'white'}}/>*/}
                        {/*<CircleNotificationsOutlinedIcon sx={{color:'white',fontSize: 32}}/>*/}
                        <NotificationsRoundedIcon sx={{ color: 'white', fontSize: 32 }} />
                      </Badge>
                    </IconButton>
                  </Box>
                  <div className={classes.LngoutMnvr}>
                    <div className={classes.ImgLngotm} onClick={toggleSidebar}>
                      <img src={dp === '' ? '/portfolio/person.png' : dp} />
                      <svg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M0.75 0.166687L7 7.25002L13.25 0.166687H0.75Z' fill='#fff' />
                      </svg>
                    </div>
                    <div
                      className='Drpdwnlngout'
                      style={{
                        visibility: showSidebar ? 'visible' : 'hidden',
                        opacity: showSidebar ? '1' : '0',
                        margin: showSidebar ? '0px 0px 0px 0px' : '0px 0px 0px -270px',
                        // display: showSidebar?"block":"none"
                      }}
                    >
                      <ul>
                        <li>
                          {' '}
                          <a
                            href='javascript:void(0);'
                            className='logOut'
                            onClick={() => {
                              Client.auth.signOut();
                              dispatch(resetUserState());
                              router.push("/")
                              // setTimeout(() => {
                              //   location.reload();
                              // }, 1000);
                            }}
                          >
                            {' '}
                            Logout{' '}
                          </a>{' '}
                        </li>
                      </ul>
                    </div>
                  </div>
                  {pagePath !== '/merchants/feed/updates' ? (
                    <IconButton onClick={handleToggle} sx={{ display: { xs: 'block', md: 'none' } }}>
                      <svg width='17' height='20' viewBox='0 0 17 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M15.2843 16.0364L4.66181 16.0364C3.92922 16.0364 3.32995 16.8875 3.32995 17.9278C3.32995 18.9682 3.92922 19.8193 4.66181 19.8193L15.2843 19.8196C16.0169 19.8196 16.6162 18.9685 16.6162 17.9282C16.6164 16.8878 16.0169 16.0364 15.2843 16.0364V16.0364Z'
                          fill='white'
                        />
                        <path
                          d='M4.69511 3.78271L15.2843 3.78271C16.0169 3.78271 16.6162 2.93168 16.6162 1.89131C16.6162 0.850951 16.0169 -8.45198e-05 15.2843 -8.45198e-05L4.66181 -8.45198e-05C3.92922 -8.45198e-05 3.32995 0.850951 3.32995 1.89131C3.32995 2.93134 3.9627 3.78271 4.69529 3.78271H4.69511Z'
                          fill='white'
                        />
                        <path
                          d='M1.36516 11.801L15.2843 11.801C16.0169 11.801 16.6162 10.95 16.6162 9.90963C16.6162 8.86926 16.0169 8.01823 15.2843 8.01823L1.33186 8.01823C0.599269 8.01823 -1.94113e-07 8.86926 -1.94113e-07 9.90963C-1.94113e-07 10.95 0.63275 11.801 1.36534 11.801H1.36516Z'
                          fill='white'
                        />
                      </svg>
                    </IconButton>
                  ) : (
                    ''
                  )}

                  {/* <div className='BtnPrvemvrTgle' onClick={handleToggle}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div> */}
                </Box>
              </div>
            )}
            {isLoggedIn ? <LogoutIcon className={classes.LogoutIcon} /> : null}
          </Toolbar>
        </Container>
      </AppBar>
      <CustomerLoginPopup open={customerLogin} handleOpening={setCustomerLogin} />
      <Menu
        anchorEl={notificationAnchorEl}
        id='account-menu'
        open={notificationOpen}
        onClose={handleNotificationClose}
        onClick={handleNotificationClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
            '&::-webkit-scrollbar': {
              width: 6,
            },
            '&::-webkit-scrollbar-track': {
              // borderRadius: '10px',
              background: 'rgba(0,0,0,0.1)',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.2)',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {notification?.length !== 0 ? (
          notification?.map((notification: any, index: any) => (
            <Notify
              key={index}
              notification={notification}
              notificationStatus={notification?.seen}
              notificationHandler={() => notificationClickHandler(notification)}
              notificationAvatar={dp === '' ? '/portfolio/person.png' : dp}
              notificationName={notification?.metadata?.name}
              notificationContent={notification?.notification}
              notificationTime={notification?.createdAt}
            />
          ))
        ) : (
          <MenuItem>
            <Typography>No Notification Found</Typography>
          </MenuItem>
        )}
        {/*{notification?.length > 0 ? (
                    notification?.map((notification: any, index: any) => {
                        return notification.notification_type === 'Feed' ? (
                            <>
                                <Box key={index} sx={{ display: { xs: 'block', md: 'none' } }}>
                                    <Notify
                                        notificationStatus={notification?.seen}
                                        notificationHandler={()=>notificationClickHandler(notification)}
                                        notificationAvatar={dp === '' ? '/portfolio/person.png' : dp}
                                        notificationName={notification?.metadata?.name}
                                        notificationContent={notification?.notification}
                                        notificationTime={notification?.createdAt}
                                    />
                                </Box>
                                <Box key={index} sx={{ display: { xs: 'none', md: 'block' } }}>
                                    <MenuItem
                                        sx={{ backgroundColor: `${notification?.seen === false ? '#CDCDCD':'transparent'}`,p:1}}
                                        onClick={() => notificationClickHandler(notification)}
                                    >
                                        <Avatar src={notification?.feedUri}/>{' '}
                                        <b style={{ textTransform: 'capitalize' }}>
                                            {notification?.metadata.name}{' '}
                                        </b>{' '}
                                        &nbsp;has added a post &nbsp;{' '}
                                        <ReactTimeAgo
                                            sx={{ pr: '5' }}
                                            date={new Date(notification?.createdAt).getTime()}
                                            locale='en-US'
                                        />
                                    </MenuItem>
                                </Box>
                            </>
                        ) : notification.notification_type === 'Subscription_Start' ? (
                            <>
                                <Box key={index} sx={{ display: { xs: 'block', md: 'none' } }}>
                                    <Notify
                                        notificationStatus={notification?.seen}
                                        notificationHandler={()=>notificationClickHandler(notification)}
                                        notificationAvatar={dp === '' ? '/portfolio/person.png' : dp}
                                        notificationName={notification?.metadata?.name}
                                        notificationContent={notification?.notification}
                                        notificationTime={notification?.createdAt}
                                    />
                                </Box>
                                <Box key={index} sx={{ display: { xs: 'none', md: 'block' } }}>
                                    <MenuItem
                                        sx={{ backgroundColor: `${notification?.seen === false ? '#CDCDCD':'transparent'}`,p:1}}
                                        onClick={() => notificationClickHandler(notification)}
                                    >
                                        <Avatar src={dp === '' ? '/portfolio/person.png' : dp}/>{' '}
                                        <b style={{ textTransform: 'capitalize' }}>
                                            {notification?.metadata.name}{' '}
                                        </b>
                                        &nbsp;
                                        <Typography>{notification?.notification}</Typography>
                                        &nbsp;&nbsp;
                                        <ReactTimeAgo
                                            sx={{ pr: '5' }}
                                            date={new Date(notification?.createdAt).getTime()}
                                            locale='en-US'
                                        />
                                    </MenuItem>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box key={index} sx={{ display: { xs: 'block', md: 'none' } }}>
                                    <Notify
                                        notificationStatus={notification?.seen}
                                        notificationHandler={()=>notificationClickHandler(notification)}
                                        notificationAvatar={dp === '' ? '/portfolio/person.png' : dp}
                                        notificationName={notification?.metadata?.name}
                                        notificationContent={notification?.notification}
                                        notificationTime={notification?.createdAt}
                                    />
                                </Box>
                                <Box key={index} sx={{ display: { xs: 'none', md: 'block' } }}>
                                    <MenuItem
                                        sx={{ backgroundColor: `${notification?.seen === false ? '#CDCDCD':'transparent'}`,p:1 }}
                                        onClick={() => notificationClickHandler(notification)}
                                    >
                                        <Avatar src={dp === '' ? '/portfolio/person.png' : dp}/>{' '}
                                        <b style={{ textTransform: 'capitalize' }}>
                                            {notification?.metadata?.name}{' '}
                                        </b>
                                        &nbsp;
                                        <Typography>{notification?.notification}</Typography>
                                        &nbsp;&nbsp;
                                        <ReactTimeAgo
                                            sx={{ pr: '5' }}
                                            date={new Date(notification?.createdAt).getTime()}
                                            locale='en-US'
                                        />
                                    </MenuItem>
                                </Box>
                            </>
                        );
                    })
                ) : (
                    <Box>
                        <MenuItem>
                            <Typography>No Notification Found</Typography>&nbsp;&nbsp;
                        </MenuItem>
                    </Box>
                )}*/}
      </Menu>
    </React.Fragment>
  );
};
export default ResponsiveAppBar;
