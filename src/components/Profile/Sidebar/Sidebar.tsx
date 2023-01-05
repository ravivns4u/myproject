import React, { ReactElement, useEffect, useState } from 'react';
import classes from './Sidebar.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../../redux/app/hooks';
import moment from 'moment';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name?.split(' ')?.[1]?.[0] ?? 'G'}`,
  };
}

const returnPathTemplate = (userSlug: string, injector: string) => `/admin/${userSlug}${injector}`;

const adminActionButtons = [
  {
    buttonImage: '/sidebar-icons/portfolio.svg',
    buttonTitle: 'Portfolio-Admin',
    comparitor: 'portfolio',
    href: (userId: string) => returnPathTemplate(userId, '/portfolio/images'),
  },
  {
    buttonImage: '/sidebar-icons/services.svg',
    buttonTitle: 'Services',
    comparitor: 'services',
    href: (userId: string) => returnPathTemplate(userId, '/services/verified'),
  },
  {
    buttonImage: '/sidebar-icons/event.svg',
    buttonTitle: 'Events',
    comparitor: 'events',
    href: (userId: string) => returnPathTemplate(userId, '/events/verified'),
  },
  {
    buttonImage: '/sidebar-icons/product.svg',
    buttonTitle: 'Products',
    comparitor: 'products',
    href: (userId: string) => returnPathTemplate(userId, '/products/verified'),
  },
  {
    buttonImage: '/sidebar-icons/order-request.svg',
    buttonTitle: 'Order Requests',
    comparitor: 'order-requests',
    href: (userId: string) => returnPathTemplate(userId, '/order-requests/events'),
  },
  {
    buttonImage: '/sidebar-icons/subscription.svg',
    buttonTitle: 'Subscription',
    comparitor: 'subscription',
    href: (userId: string) => returnPathTemplate(userId, '/subscription'),
  },
  {
    buttonImage: '/sidebar-icons/admin.svg',
    buttonTitle: 'Admins',
    comparitor: 'admin-dashboard',
    href: (userId: string) => returnPathTemplate(userId, '/admin-dashboard/accounts'),
    isAdmin: true,
  },
  {
    buttonImage: '/sidebar-icons/feed.svg',
    buttonTitle: 'Feeds',
    comparitor: 'feed',
    href: (userId: string) => returnPathTemplate(userId, '/feed/images'),
    isAdmin: true,
  },
  {
    buttonImage: '/sidebar-icons/feed.svg',
    buttonTitle: 'CMS',
    comparitor: 'cms',
    href: (userId: string) => returnPathTemplate(userId, '/cms/verified'),
   
  },
  {
    buttonImage: '/sidebar-icons/feed.svg',
    buttonTitle: 'TermsNew',
    comparitor: 'termsnew',
    href: (userId: string) => returnPathTemplate(userId, '/termsnew'),
   
  },
];

const actionButtons = [
  {
    buttonImage: '/sidebar-icons/portfolio.svg',
    buttonTitle: 'Portfolio-Test',
    comparitor: 'portfolio',
    href: (userId: string) => returnPathTemplate(userId, '/portfolio/images'),
  },
  {
    buttonImage: '/sidebar-icons/services.svg',
    buttonTitle: 'Services',
    comparitor: 'services',
    href: (userId: string) => returnPathTemplate(userId, '/services/verified'),
  },
  {
    buttonImage: '/sidebar-icons/event.svg',
    buttonTitle: 'Events',
    comparitor: 'events',
    href: (userId: string) => returnPathTemplate(userId, '/events/verified'),
  },
  {
    buttonImage: '/sidebar-icons/product.svg',
    buttonTitle: 'Products',
    comparitor: 'products',
    href: (userId: string) => returnPathTemplate(userId, '/products/verified'),
  },
  {
    buttonImage: '/sidebar-icons/order-request.svg',
    buttonTitle: 'Order Requests',
    comparitor: 'order-requests',
    href: (userId: string) => returnPathTemplate(userId, '/order-requests/events'),
  },
  {
    buttonImage: '/sidebar-icons/subscription.svg',
    buttonTitle: 'Subscription',
    comparitor: 'subscription',
    href: (userId: string) => returnPathTemplate(userId, '/subscription'),
  },
  {
    buttonImage: '/sidebar-icons/admin.svg',
    buttonTitle: 'Admins',
    comparitor: 'admin-dashboard',
    href: (userId: string) => returnPathTemplate(userId, '/admin-dashboard/accounts'),
    isAdmin: true,
  },
  {
    buttonImage: '/sidebar-icons/feed.svg',
    buttonTitle: 'Feeds',
    comparitor: 'feed',
    href: (userId: string) => returnPathTemplate(userId, '/feed/images'),
    isAdmin: true,
  }
];

const showSubscriptionButton = [
  {
    buttonImage: '/sidebar-icons/subscription.svg',
    buttonTitle: 'Subscription',
    comparitor: 'subscription',
    href: (userId: string) => returnPathTemplate(userId, '/subscription'),
  },
];

const orderRequest = [
  {
    buttonTitle: 'Portfolio',
    buttonImage: '/sidebar-icons/portfolio.svg',
    comparitor: 'portfolio',
    href: (userId: string) => returnPathTemplate(userId, '/portfolio/images'),
  },
  {
    buttonImage: '/sidebar-icons/services.svg',
    buttonTitle: 'Services',
    comparitor: 'services',
    href: (userId: string) => returnPathTemplate(userId, '/services/verified'),
  },
  {
    buttonTitle: 'Events',
    buttonImage: '/sidebar-icons/event.svg',
    comparitor: 'events',
    href: (userId: string) => returnPathTemplate(userId, '/events/verified'),
  },
  {
    buttonTitle: 'Products',
    buttonImage: '/sidebar-icons/product.svg',
    comparitor: 'products',
    href: (userId: string) => returnPathTemplate(userId, '/products/verified'),
  },
  {
    buttonTitle: 'Order Requests',
    buttonImage: '/sidebar-icons/order-request.svg',
    comparitor: 'order-requests',
    href: (userId: string) => returnPathTemplate(userId, '/order-requests/events'),
  },
  {
    buttonTitle: 'Subscription',
    buttonImage: '/sidebar-icons/subscription.svg',
    comparitor: 'subscription',
    href: (userId: string) => returnPathTemplate(userId, '/subscription'),
  },
  {
    buttonTitle: 'Admins',
    buttonImage: '/sidebar-icons/admin.svg',
    comparitor: 'admin-dashboard',
    href: (userId: string) => returnPathTemplate(userId, '/admin-dashboard/accounts'),
  },
  {
    buttonTitle: 'Feeds',
    buttonImage: '/sidebar-icons/feed.svg',
    comparitor: 'feed',
    href: (userId: string) => returnPathTemplate(userId, '/feed/images'),
  },
  
];

interface Props {
  openEditPrompt: (value: boolean) => void;
}
export default function Sidebar(props: Props): ReactElement {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const path = router.asPath.split('?')[0];
    router.push({ pathname: path, query: {} });
    setOpen(false);
  };

  const handlePopUp = () => {
    setOpen(false);
  };
  const { openEditPrompt } = props;

  const {
    user,
    profile: { dp },
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (router.query.pro && user?.user?.plan === 'pro') {
      handleClickOpen();
    }
  }, [router]);

  const [hide, showHide] = useState('');

  useEffect(() => {
    router.query.merchantSlug !== undefined && showHide(router?.query?.merchantSlug[1]);
  }, [router]);

  return (
    <>
      {hide == 'terms' || hide == 'subscription-module' || hide == 'merchant-nda' ? (
        ''
      ) : (
        <React.Fragment>
          <div className={[classes.SideBarContainer, 'ThinScrollbar'].join(' ')}>
            <div className='SprteSec'>
              <Avatar
                className={classes.CircularAvatar}
                alt={user.displayName}
                src={dp === '' ? '/portfolio/person.png' : dp}
              />
              <h1 className={classes.NameHeader}>{user?.user?.displayName}</h1>
              <h3 className={classes.Profession}>{user.user?.profession?.join(', ') || 'Unknown'}</h3>
              <h3 className={classes.Profession} style={{ cursor: 'pointer' }} onClick={handleClickOpen}>
                {user.user.subscriptionEndDate &&
                moment(user.user?.subscriptionEndDate) >= moment(new Date().toISOString()) &&
                user.user.plan &&
                user.user.plan == 'pro'
                  ? `BREAK FREE PRO`
                  : 'BREAK FREE BASIC'}
              </h3>
              {/* <h3 className={classes.Profession} style={{ cursor: 'pointer' }}>
                {user.user.subscriptionEndDate &&
                moment(user.user?.subscriptionEndDate) >= moment(new Date().toISOString())
                  ? `Subscription will end : ${moment(user.user?.subscriptionEndDate).format('DD-MM-YYYY')}`
                  : null}
              </h3> */}
              <Button
                className={classes.EditButton}
                variant={'contained'}
                onClick={() => openEditPrompt(true)}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            </div>
            {/* <h4 className={classes.Bio}>{user.user?.bio?.slice(0, 150)}</h4> */}
            {user?.user?.ndaSigned === true
              ? user.user.subscription === true
                ? orderRequest.map((button, index) => {
                    let merchantSlug = router.query.merchantSlug as string[];
                    let passParam = '/';
                    let identifierParam = '/';
                    if (!user.isAdmin && (index === orderRequest.length - 2 || index === orderRequest.length - 1)) {
                      return null;
                    }
                    if (merchantSlug) {
                      if (merchantSlug.length > 1) {
                        passParam = merchantSlug[1];
                      }
                      identifierParam = merchantSlug[0];
                    }
                    return (
                      <Button
                        key={button.buttonTitle}
                        onClick={() => router.push(button.href(identifierParam as string))}
                        className={[
                          passParam === button.comparitor ? 'ThemeButtonActive' : 'ThemeButtonInActive',
                          classes.ButtonSpecs,
                        ].join(' ')}
                      >
                        <img src={button.buttonImage} width={26} height={22} style={{ paddingRight: '10px' }} />{' '}
                        {button.buttonTitle}
                      </Button>
                    );
                  })
                : user.uid === "o7Rl9yiyb4c48ZLFRB2iD3zKT5s2"
                ? adminActionButtons.map((button, index) => {
                  let merchantSlug = router.query.merchantSlug as string[];
                  let passParam = '/';
                  let identifierParam = '/';
                  if (!user.isAdmin && (index === adminActionButtons.length - 2 || index === adminActionButtons.length - 1)) {
                    return null;
                  }
                  if (merchantSlug) {
                    if (merchantSlug.length > 1) {
                      passParam = merchantSlug[1];
                    }
                    identifierParam = merchantSlug[0];
                  }
                  return (
                    <Button
                      key={button.buttonTitle}
                      onClick={() => router.push(button.href(identifierParam as string))}
                      className={[
                        passParam === button.comparitor ? 'ThemeButtonActive' : 'ThemeButtonInActive',
                        classes.ButtonSpecs,
                      ].join(' ')}
                    >
                      <img src={button.buttonImage} width={26} height={22} style={{ paddingRight: '10px' }} />{' '}
                      {button.buttonTitle}
                    </Button>
                  );
                })
                : actionButtons.map((button, index) => {
                    let merchantSlug = router.query.merchantSlug as string[];
                    let passParam = '/';
                    let identifierParam = '/';
                    if (!user.isAdmin && (index === actionButtons.length - 2 || index === actionButtons.length - 1)) {
                      return null;
                    }
                    if (merchantSlug) {
                      if (merchantSlug.length > 1) {
                        passParam = merchantSlug[1];
                      }
                      identifierParam = merchantSlug[0];
                    }
                    return (
                      <Button
                        key={button.buttonTitle}
                        onClick={() => router.push(button.href(identifierParam as string))}
                        className={[
                          passParam === button.comparitor ? 'ThemeButtonActive' : 'ThemeButtonInActive',
                          classes.ButtonSpecs,
                        ].join(' ')}
                      >
                        <img src={button.buttonImage} width={26} height={22} style={{ paddingRight: '10px' }} />{' '}
                        {button.buttonTitle}
                      </Button>
                    );
                  })
              : showSubscriptionButton.map((button, index) => {
                  let merchantSlug = router.query.merchantSlug as string[];
                  let passParam = '/';
                  let identifierParam = '/';
                  if (!user.isAdmin && index === actionButtons.length - 2) {
                    return null;
                  }
                  if (merchantSlug) {
                    if (merchantSlug.length > 1) {
                      passParam = merchantSlug[1];
                    }
                    identifierParam = merchantSlug[0];
                  }
                  return (
                    <Button
                      key={button.buttonTitle}
                      onClick={() => router.push(button.href(identifierParam as string))}
                      className={[
                        passParam === button.comparitor ? 'ThemeButtonActive' : 'ThemeButtonInActive',
                        classes.ButtonSpecs,
                      ].join(' ')}
                    >
                      <img src={button.buttonImage} width={26} height={22} style={{ paddingRight: '10px' }} />{' '}
                      {button.buttonTitle}
                    </Button>
                  );
                })}
          </div>
          {user.user.plan === 'pro' ? (
            <Dialog open={open} maxWidth='xs' fullWidth={true} onClose={handleClose}>
              <DialogContent>
                <Typography variant={'h6'} sx={{ textAlign: 'center', my: 2 }}>
                  Subcription Details
                </Typography>
                <Typography
                  variant={'body1'}
                  sx={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'capitalize', mb: 1 }}
                >
                  break free {user?.user?.plan}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                  <Box>
                    <Typography variant={'subtitle2'}>
                      Start Date:{' '}
                      <span style={{ fontWeight: 'bold' }}>
                        {new Date(user.user.subscriptionStartDate).toLocaleDateString('en-us', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </Typography>
                    <Typography variant={'subtitle2'}>
                      End Date:{' '}
                      <span style={{ fontWeight: 'bold' }}>
                        {new Date(user.user.subscriptionEndDate).toLocaleDateString('en-us', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CurrencyRupeeIcon sx={{ mr: 0.5, fontSize: 'large', fontWeight: 'bold' }} />
                    <Box sx={{ fontWeight: 'bold' }}>{user.user.plan === 'pro' ? '1500' : ''}</Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', mx: 'auto', mt: 2 }}>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleClose}
                    sx={{ my: 2, px: 5, borderRadius: '20px' }}
                  >
                    Done
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog open={open} maxWidth='xs' fullWidth={true} onClose={handleClose}>
              <DialogContent>
                <Typography variant={'h6'} sx={{ textAlign: 'center', my: 2 }}>
                  Subcription Details
                </Typography>
                <Typography
                  variant={'body1'}
                  sx={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'capitalize', mb: 1 }}
                >
                  break free {user?.user?.plan}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', mx: 'auto', mt: 2 }}>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => {
                      router.push(`/merchants/${user?.user?.slug}/payment/pro`);
                      handlePopUp();
                    }}
                    sx={{ my: 2, px: 5, borderRadius: '20px' }}
                  >
                    Upgrade to Pro
                  </Button>
                </Box>
                {/* <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', mx: 'auto', mt: 2 }}>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleClose}
                    sx={{ my: 2, px: 5, borderRadius: '20px' }}
                  >
                    Done
                  </Button>
                </Box> */}
              </DialogContent>
            </Dialog>
          )}
        </React.Fragment>
      )}
    </>
  );
}
