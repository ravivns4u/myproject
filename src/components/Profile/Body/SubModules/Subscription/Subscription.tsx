import React, { useEffect } from 'react';
import NavHead, { INavHeaderProps } from '../Common/NavHead/NavHead';
import { IDataTableStatic } from '../Common/DataTable/DataTable';

import { useRouter } from 'next/router';
import { comparitors } from '../constants/comparitors';
import { useAppDispatch, useAppSelector } from '../../../../../redux/app/hooks';
import moment from 'moment';
import { updateLoading } from '../../../../../redux/slices/signup';
import { updateNotification } from '../../../../../redux/slices/notifications';
import { getUserDetails } from '../../../../../redux/slices/user';
import { ExpectedUpdaeUserPayload } from '../../../../../redux/interfaces/backend/apis/UpdateUser';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardContent,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import Link from 'next/link';
import { updateMerchant, updateSubscription, updateTermsAndCondition, } from '../../../../../redux/slices/subscription';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

export interface ServiceProps {
    navbarProps: INavHeaderProps;
    externalDataTable: IDataTableStatic;
    handleClose?: () => void;
    open: boolean;
}

const Pro = [
    {
        id: 0,
        title: 'Cater your offerings to various genres',
    },
    {
        id: 1,
        title: 'Start monetizing by accepting orders.',
    },
    {
        id: 2,
        title: 'Included',
    },
    {
        id: 3,
        title: 'Become a Pro at managing your professional life',
    },
    {
        id: 4,
        title: 'Included',
    },
    {
        id: 5,
        title: 'Included',
    },
    {
        id: 6,
        title: 'Track both visitors and customers.',
    },
    {
        id: 7,
        title: 'Included',
    },
    {
        id: 8,
        title: 'Included',
    },
    {
        id: 9,
        title: 'Included',
    },
    {
        id: 30,
        title: 'Included',
    },
    {
        id: 31,
        title: 'Included',
    },
    {
        id: 32,
        title: 'Included',
    },
    {
        id: 33,
        title: 'Included',
    },
];

const Basic = [
    {
        id: 10,
        title: 'Cater your offerings to a single genre',
    },
    {
        id: 11,
        title: 'Get inquiries for all your offerings.',
    },
    {
        id: 12,
        title: 'Included',
    },
    {
        id: 13,
        title: 'Gives you access to the calendar tool.',
    },
    {
        id: 14,
        title: 'Included',
    },
    {
        id: 15,
        title: 'Available after you become a pro Subscriber.',
    },
    {
        id: 16,
        title: 'Limited to visitor tracking.',
    },
    {
        id: 17,
        title: 'Not Included',
    },
    {
        id: 18,
        title: 'Available after you become a Pro Subscriber.',
    },
    {
        id: 19,
        title: 'Included',
    },
    {
        id: 34,
        typography:'Collaborations available after you become a Pro Subscriber.',
        title:
            'Explore opportunities across different domains.',
    },
    {
        id: 35,
        typography:'Get more customers after you become a Pro Subscriber.',
        title:
            'Showcase your talents to a larger audience.',
    },
    {
        id: 36,
        title: 'Included',
    },
    {
        id: 37,
        title: 'Available after you become a Pro Subscriber.',
    },
];

const Package = [
    {
        id: 20,
        typography:
            'Allows you to upload multiple portfolios with just one account. You can offer various services, sell your products and promote your events – all under one roof! Earn more as you grow more',
        title: 'Create your profile with Multiple Portfolios',
    },
    {
        id: 21,
        typography:
            'Get inquiries for all your offerings. You can then accept or reject orders based on your suitability and availability',
        title: 'Monetize through your Offerings',
    },
    {
        id: 22,
        typography:
            'Gives you complete control! It salso allows you to alter existing portfolios, add new ones and edit the parameters of your offerings.',
        title: 'Have full control',
    },
    {
        id: 23,
        typography:
            'Our embedded calendar tool allows you to track your day, bookings, meetings, and delivery dates- making life much easier and more organized. You can also track your order history, ratings, customer interactions, and much more. Now plan your schedule the way you like it!',
        title: 'Management Tools',
    },
    {
        id: 24,
        typography:
            'Helps you promote your services, events, gigs, and workshops directly to your target audience from the art and entertainment industry. Upload stories and engage with customers as well as the artistic community',
        title: 'Enhance Visibility',
    },
    {
        id: 25,
        typography:
            'Our network has legit, trustworthy, and verified clients. We believe in transparency and ensure that our talented service providers are paid for their hard work.',
        title: 'Trustworthy Clients',
    },
    {
        id: 26,
        typography:
            'Our platform allows you to track your visitors and customers. You can use this data to get more customer traction.',
        title: 'Break Free Analytics',
    },
    {
        id: 27,
        typography:
            'Allows your customers to pay using multiple payment options via Razorpay- all with a single click of the button. Quick and Efficient!',
        title: 'Ease of Payment through Razorpay',
    },
    {
        id: 28,
        typography:
            'Get honest feedback and reviews from your clients. Improve your performance based on the reviews and ratings. Enhance your work and gain more credibility and visibility',
        title: 'Feedback and Insights',
    },
    {
        id: 29,
        typography:
            'Get an opportunity to upgrade your skills by learning from other big names in the industry. Also, share your knowledge with beginners and those excited to learn your special skills.',
        title: 'Workshops and Training',
    },
    {
        id: 38,
        typography:
            'Collaborate and network with other artists, brands, and event management companies across different domains and build your street credibility',
        title: 'Collaborations and Networking',
    },
    {
        id: 39,
        typography:
            'Allows you to grow your audience and customer base as you collaborate and share resources with other talented artists such as yourself from different parts of the country.',
        title: 'Get a Wider Presence',
    },
    {
        id: 40,
        typography:
            'Our technicians and experts will always be available via email for any help you need',
        title: 'Unlimited Customer Suppor',
    },
    {
        id: 41,
        typography:
            'Break Free ensures that you are paid duly for your offerings. With us, your safety is guaranteed',
        title: 'Assured Payments',
    },
];

export async function getStaticProps() {
    return { props: { isDark: true } };
}

export default function SubscriptionSection(props: ServiceProps) {
    const { isLoggedIn, merchantSlug, adminApproved, emailVerified } =
        useAppSelector((state) => state.user);
    const { navbarProps, externalDataTable } = props;
    const router = useRouter();
    const dispatch = useAppDispatch();
    const pageSection = router.query.merchantSlug?.[2] ?? comparitors.EVENTS;
    const {
        user: { user, firebaseToken },
        profile,
    } = useAppSelector((state) => state);

    let Component = <div>No Such Component Found</div>;
    switch (pageSection) {
        default: {
        }
    }

    useEffect(() => {
        dispatch(updateSubscription({ isSubscription: false }));
        dispatch(updateTermsAndCondition({ isTermsAndCondition: false }));
        dispatch(updateMerchant({ isMerchants: false }));
    }, [dispatch]);

    //start use in Desktop pro plan tooltip
    const [open0, setOpen0] = React.useState(false);
    //end use in Desktop pro plan tooltip

    //end use in Desktop package tooltip
     const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const [open6, setOpen6] = React.useState(false);
    const [open7, setOpen7] = React.useState(false);
    const [open8, setOpen8] = React.useState(false);
    const [open9, setOpen9] = React.useState(false);
    const [open10, setOpen10] = React.useState(false);
    const [open11, setOpen11] = React.useState(false);
    const [open12, setOpen12] = React.useState(false);
    const [open13, setOpen13] = React.useState(false);
    const [open14, setOpen14] = React.useState(false);
    //end use in Desktop package tooltip

    //end use in Desktop basic tooltip
    const [open15, setOpen15] = React.useState(false);
    const [open16, setOpen16] = React.useState(false);
    //end use in Desktop basic tooltip

    //end use in mobile basic tooltip
    const [open17, setOpen17] = React.useState(false);
    const [open18, setOpen18] = React.useState(false);
    const [open19, setOpen19] = React.useState(false);
    const [open20, setOpen20] = React.useState(false);
    const [open21, setOpen21] = React.useState(false);
    const [open22, setOpen22] = React.useState(false);
    const [open23, setOpen23] = React.useState(false);
    const [open24, setOpen24] = React.useState(false);
    const [open25, setOpen25] = React.useState(false);
    const [open26, setOpen26] = React.useState(false);
    const [open27, setOpen27] = React.useState(false);
    const [open28, setOpen28] = React.useState(false);
    const [open29, setOpen29] = React.useState(false);
    const [open30, setOpen30] = React.useState(false);
    const [open31, setOpen31] = React.useState(false);
    const [open32, setOpen32] = React.useState(false);
    const [open33, setOpen33] = React.useState(false);
    const [open34, setOpen34] = React.useState(false);
    const [open35, setOpen35] = React.useState(false);
    const [open36, setOpen36] = React.useState(false);
    const [open37, setOpen37] = React.useState(false);
    const [open38, setOpen38] = React.useState(false);
    const [open39, setOpen39] = React.useState(false);
    const [open40, setOpen40] = React.useState(false);
    const [open41, setOpen41] = React.useState(false);
    const [open42, setOpen42] = React.useState(false);
    const [open43, setOpen43] = React.useState(false);
    const [open44, setOpen44] = React.useState(false);

    const [open45, setOpen45] = React.useState(false);


    //start use in Desktop pro plan tooltip
    const handleTooltipClose0 = () => {
        setOpen0(false);
    };

    const handleTooltipOpen0 = () => {
        setOpen0(true);
    };
    //end use in Desktop pro plan tooltip

    //start use in Desktop package tooltip
    const handleTooltipClose1 = () => {
        setOpen1(false);
    };

    const handleTooltipOpen1 = () => {
        setOpen1(true);
    };
    const handleTooltipClose2 = () => {
        setOpen2(false);
    };
    const handleTooltipOpen2 = () => {
        setOpen2(true);
    };
    const handleTooltipClose3 = () => {
        setOpen3(false);
    };

    const handleTooltipOpen3 = () => {
        setOpen3(true);
    };

    const handleTooltipClose4 = () => {
        setOpen4(false);
    };

    const handleTooltipOpen4 = () => {
        setOpen4(true);
    };

    const handleTooltipClose5 = () => {
        setOpen5(false);
    };

    const handleTooltipOpen5 = () => {
        setOpen5(true);
    };

    const handleTooltipClose6 = () => {
        setOpen6(false);
    };

    const handleTooltipOpen6 = () => {
        setOpen6(true);
    };

    const handleTooltipClose7 = () => {
        setOpen7(false);
    };

    const handleTooltipOpen7 = () => {
        setOpen7(true);
    };

    const handleTooltipClose8 = () => {
        setOpen8(false);
    };

    const handleTooltipOpen8 = () => {
        setOpen8(true);
    };

    const handleTooltipClose9 = () => {
        setOpen9(false);
    };

    const handleTooltipOpen9 = () => {
        setOpen9(true);
    };

    const handleTooltipClose10 = () => {
        setOpen10(false);
    };

    const handleTooltipOpen10 = () => {
        setOpen10(true);
    };

    const handleTooltipClose11 = () => {
        setOpen11(false);
    };

    const handleTooltipOpen11 = () => {
        setOpen11(true);
    };
    const handleTooltipClose12 = () => {
        setOpen12(false);
    };
    const handleTooltipOpen12 = () => {
        setOpen12(true);
    };
    const handleTooltipClose13 = () => {
        setOpen13(false);
    };

    const handleTooltipOpen13 = () => {
        setOpen13(true);
    };

    const handleTooltipClose14 = () => {
        setOpen14(false);
    };

    const handleTooltipOpen14 = () => {
        setOpen14(true);
    };
    //end use in Desktop package tooltip

    //start use in Desktop basic tooltip
    const handleTooltipClose15 = () => {
        setOpen15(false);
    };

    const handleTooltipOpen15 = () => {
        setOpen15(true);
    };

    const handleTooltipClose16 = () => {
        setOpen16(false);
    };

    const handleTooltipOpen16 = () => {
        setOpen16(true);
    };
    //end use in Desktop basic tooltip

    const handleTooltipClose17 = () => {
        setOpen17(false);
    };

    const handleTooltipOpen17 = () => {
        setOpen17(true);
    };

    const handleTooltipClose18 = () => {
        setOpen18(false);
    };

    const handleTooltipOpen18 = () => {
        setOpen18(true);
    };

    const handleTooltipClose19 = () => {
        setOpen19(false);
    };

    const handleTooltipOpen19 = () => {
        setOpen19(true);
    };

    const handleTooltipClose20 = () => {
        setOpen20(false);
    };

    const handleTooltipOpen20 = () => {
        setOpen20(true);
    };

    const handleTooltipClose21 = () => {
        setOpen21(false);
    };

    const handleTooltipOpen21 = () => {
        setOpen21(true);
    };
    const handleTooltipClose22 = () => {
        setOpen22(false);
    };
    const handleTooltipOpen22 = () => {
        setOpen22(true);
    };
    const handleTooltipClose23 = () => {
        setOpen23(false);
    };

    const handleTooltipOpen23 = () => {
        setOpen23(true);
    };

    const handleTooltipClose24 = () => {
        setOpen24(false);
    };

    const handleTooltipOpen24 = () => {
        setOpen24(true);
    };

    const handleTooltipClose25 = () => {
        setOpen25(false);
    };

    const handleTooltipOpen25 = () => {
        setOpen25(true);
    };

    const handleTooltipClose26 = () => {
        setOpen26(false);
    };

    const handleTooltipOpen26 = () => {
        setOpen26(true);
    };

    const handleTooltipClose27 = () => {
        setOpen27(false);
    };

    const handleTooltipOpen27 = () => {
        setOpen27(true);
    };

    const handleTooltipClose28 = () => {
        setOpen28(false);
    };

    const handleTooltipOpen28 = () => {
        setOpen28(true);
    };

    const handleTooltipClose29 = () => {
        setOpen29(false);
    };

    const handleTooltipOpen29 = () => {
        setOpen29(true);
    };

    const handleTooltipClose30 = () => {
        setOpen30(false);
    };

    const handleTooltipOpen30 = () => {
        setOpen30(true);
    };

    const handleTooltipClose31 = () => {
        setOpen31(false);
    };

    const handleTooltipOpen31 = () => {
        setOpen31(true);
    };

    const handleTooltipClose32 = () => {
        setOpen32(false);
    };

    const handleTooltipOpen32 = () => {
        setOpen32(true);
    };

    const handleTooltipClose33 = () => {
        setOpen33(false);
    };

    const handleTooltipOpen33 = () => {
        setOpen33(true);
    };

    const handleTooltipClose34 = () => {
        setOpen34(false);
    };

    const handleTooltipOpen34 = () => {
        setOpen34(true);
    };

    const handleTooltipClose35 = () => {
        setOpen35(false);
    };

    const handleTooltipOpen35 = () => {
        setOpen35(true);
    };

    const handleTooltipClose36 = () => {
        setOpen36(false);
    };

    const handleTooltipOpen36 = () => {
        setOpen36(true);
    };

    const handleTooltipClose37 = () => {
        setOpen37(false);
    };

    const handleTooltipOpen37 = () => {
        setOpen37(true);
    };

    const handleTooltipClose38 = () => {
        setOpen38(false);
    };

    const handleTooltipOpen38 = () => {
        setOpen38(true);
    };

    const handleTooltipClose39 = () => {
        setOpen39(false);
    };

    const handleTooltipOpen39 = () => {
        setOpen39(true);
    };

    const handleTooltipClose40 = () => {
        setOpen40(false);
    };

    const handleTooltipOpen40 = () => {
        setOpen40(true);
    };

    const handleTooltipOpen41 = () => {
        setOpen41(false);
    };

    const handleTooltipClose41 = () => {
        setOpen41(false);
    };

    const handleTooltipOpen42 = () => {
        setOpen42(true);
    };

    const handleTooltipClose42 = () => {
        setOpen42(false);
    };

    const handleTooltipOpen43 = () => {
        setOpen43(true);
    };

    const handleTooltipClose43 = () => {
        setOpen43(false);
    };

    const handleTooltipOpen44 = () => {
        setOpen44(true);
    };

    const handleTooltipClose44 = () => {
        setOpen44(false);
    };

    const handleTooltipOpen45 = () => {
        setOpen45(true);
    };

    const handleTooltipClose45 = () => {
        setOpen45(false);
    };

    const [expandedPackage, setExpandedPackage] = React.useState<string|false>(
        false
    );
    const handleChangePackage =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpandedPackage(isExpanded ? panel : false);
        };

    const [expandedPlan, setExpandedPlan] = React.useState<string|false>(false);
    const handleChangePlan =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpandedPlan(isExpanded ? panel : false);
        };

    const [expanded, setExpanded] = React.useState<string|false>(false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const makePayment = async() => {
        const res = await initializeRazorpay();

        if (!res) {
            alert('Razorpay SDK Failed to load');
            return;
        }

        // Make API call to the serverless API
        const data = await fetch('/api/merchant/razorpay', { method: 'POST' }).then(
            (t) => t.json()
        );
        var options = {
            key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
            name: 'SS BREAK FREE LLP',
            currency: data.currency,
            amount: data.amount,
            order_id: data.id,
            description: 'Thanks for choosing breakfree subscription',
            // image: "https://breakfree.vercel.app/logo-dark.png",

            handler: function(response: any) {
                // Validate payment at server - using webhooks is a better idea.
                // alert(date.addMonths(3));
                const body: ExpectedUpdaeUserPayload = {
                    firebaseToken: firebaseToken,
                    updatedUserData: {
                        ...user,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        subscription: true,
                        plan: 'pro',
                        subscriptionStartDate: new Date().toISOString(),
                        subscriptionEndDate: moment().add(4, 'months').toISOString(),
                    },
                };

                fetch('/api/update-user-info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
                    .then((data) => data.json())
                    .then((data) => {
                        if (data.error) {
                            dispatch(updateLoading({ loading: false }));
                            dispatch(
                                updateNotification({
                                    status: 'error',
                                    message: 'Update Operation Failed!',
                                    title: 'Error',
                                    show: true,
                                })
                            );
                        } else {
                            dispatch(updateLoading({ loading: false }));
                            // closeModal && closeModal();
                            dispatch(
                                updateNotification({
                                    message: 'Subscription Started Successfully',
                                    show: true,
                                    status: 'success',
                                    title: 'Success',
                                })
                            );
                            dispatch(getUserDetails({ firebaseToken: firebaseToken }));
                        }
                    })
                    .catch((error) => {
                        dispatch(updateLoading({ loading: false }));
                        dispatch(
                            updateNotification({
                                status: 'error',
                                message: 'Update Operation Failed!',
                                title: 'Error',
                            })
                        );
                    });
            },
            prefill: {
                name: user.displayName,
                email: user.email,
                contact: user.phone,
            },
        };

        //ts-ignore
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    const makePayment1 = async() => {
        const orderid = new Date().getTime();

        const body: ExpectedUpdaeUserPayload = {
            firebaseToken: firebaseToken,
            updatedUserData: {
                ...user,
                subscription: true,
                plan: 'basic',
                subscriptionStartDate: new Date().toISOString(),
                subscriptionEndDate: moment().add(1, 'month').toISOString(),
            },
        };

        fetch('/api/update-user-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                if (data.error) {
                    dispatch(updateLoading({ loading: false }));
                    dispatch(
                        updateNotification({
                            status: 'error',
                            message: 'Update Operation Failed!',
                            title: 'Error',
                            show: true,
                        })
                    );
                } else {
                    dispatch(updateLoading({ loading: false }));
                    // closeModal && closeModal();
                    dispatch(
                        updateNotification({
                            message: 'Subscription Started Successfully',
                            show: true,
                            status: 'success',
                            title: 'Success',
                        })
                    );
                    dispatch(getUserDetails({ firebaseToken: firebaseToken }));
                }
            })
            .catch((error) => {
                dispatch(updateLoading({ loading: false }));
                dispatch(
                    updateNotification({
                        status: 'error',
                        message: 'Update Operation Failed!',
                        title: 'Error',
                    })
                );
            });
    };

    let probutton;
    if (
        user.plan &&
        user.plan == 'pro' &&
        user.subscription &&
        user.subscriptionEndDate &&
        moment(user?.subscriptionEndDate) >= moment(new Date().toISOString())
    ) {
        const renewcondition =
            moment(user?.subscriptionEndDate).diff(moment(), 'days') <= 5;
        // const renewcondition = (moment(user?.subscriptionEndDate).diff(moment(), 'days') <= 5 || user?.subscribed)
        probutton = (
            <Box sx={{ px: { sx: 2, md: 5 } }}>
                <Button
                    fullWidth
                    variant='contained'
                    onClick={() => {
                        if (renewcondition) {
                            router.push(`/merchants/${merchantSlug}/payment/pro`);
                        }
                    }}
                    sx={
                        renewcondition
                            ? {
                                backgroundColor: '#FFFF00',
                                color: '#000000',
                                ':hover': {
                                    backgroundColor: '#000000',
                                    color: '#FFFF00',
                                },
                                py: 1.2,
                                borderRadius: '50px',
                            }
                            : {
                                backgroundColor: '#E7E7E7',
                                color: '#000000',
                                ':hover': {
                                    backgroundColor: '#E7E7E7',
                                    color: '#000000',
                                },
                                py: 1.2,
                                borderRadius: '50px',
                            }
                    }
                >
                    {renewcondition ? 'Renew' : 'Current Plan'}
                </Button>
            </Box>
        );
    } else {
        probutton = (
            <Box sx={{ px: { sx: 2, md: 5 } }}>
                <Link href={`/merchants/${merchantSlug}/payment/pro`}>
                    <Button
                        fullWidth
                        variant='contained'
                        sx={{
                            backgroundColor: '#FFFF00',
                            color: '#000000',
                            ':hover': {
                                backgroundColor: '#000000',
                                color: '#FFFF00',
                            },
                            py: 1.2,
                            borderRadius: '50px',
                        }}
                    >
                        {user?.subscribed ? 'Renew' : 'Start with Pro'}
                    </Button>
                </Link>
            </Box>
        );
    }

    let basicbutton;
    if (user.plan && user.plan == 'basic' && !user.subscription) {
        basicbutton = (
            <Box sx={{ px: { sx: 2, md: 5 } }}>
                <Button
                    fullWidth
                    variant='contained'
                    sx={{
                        backgroundColor: `${
                            user?.plan === 'basic' ? '#E7E7E7' : '#CBCB3F'
                        }`,
                        color: '#000000',
                        '&:hover': {
                            backgroundColor: '#f2f2f2',
                            color: '#000000',
                        },
                        py: 1.2,
                        borderRadius: '50px',
                    }}
                >
                    Current Plan
                </Button>
            </Box>
        );
    } else {
        basicbutton = (
            <Box sx={{ px: { sx: 2, md: 5 } }}>
                <Link href={`/merchants/${merchantSlug}/payment/basic`}>
                    <Button
                        fullWidth
                        variant='contained'
                        sx={{
                            backgroundColor: `${
                                user?.plan === 'basic' ? '#E7E7E7' : '#FFFF00'
                            }`,
                            color: '#000000',
                            ':hover': {
                                backgroundColor: `${
                                    user?.plan === 'basic' ? '#E7E7E7' : '#000000'
                                }`,
                                color: `${user?.plan === 'basic' ? '#000000' : '#FFFF00'}`,
                            },
                            py: 1.2,
                            borderRadius: '50px',
                        }}
                    >
                        Start with Basic{user.subscription}
                    </Button>
                </Link>
            </Box>
        );
    }

    return (
        <React.Fragment>
            <NavHead {...navbarProps} />

            <Typography variant='h5' sx={{ textAlign: 'center', mb: 2 }}>
                Choose your subscription plan
            </Typography>

            {/*Desktop View*/}
            <Box sx={{ width: '100%', display:{xs:'none',md:'block'} }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    width={200}
                                    sx={{
                                        border: '1px solid #C3C3C3',
                                        borderTop: '10px solid #262423',
                                        background: '#F0F0F0',
                                    }}
                                    align='center'
                                >
                                    <Typography
                                        variant='h5'
                                        gutterBottom
                                        sx={{ fontWeight: 'medium' }}
                                    >
                                        Package Detail
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    width={200}
                                    sx={{
                                        border: '1px solid #C3C3C3',
                                        borderTop: '10px solid #6F6F6F',
                                        background: '#F0F0F0',
                                    }}
                                    align='center'
                                >
                                    <Typography
                                        variant='h5'
                                        gutterBottom
                                        sx={{ fontWeight: 'medium' }}
                                    >
                                        Break Free Basic
                                    </Typography>
                                    <Typography
                                        variant='caption'
                                        gutterBottom
                                        sx={{ fontWeight: 'medium' }}
                                    >
                                      Collaborate, Earn, Grow and be limitless with Break Free
                                      Pro.
                                    </Typography>
                                    <Typography
                                        variant='h4'
                                        component='h1'
                                        gutterBottom
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          mb: 0,
                                          fontWeight: 'medium',
                                        }}
                                    >
                                      <CurrencyRupeeIcon
                                          sx={{ fontSize: 30, fontWeight: 'medium' }}
                                      />
                                      0
                                    </Typography>
                                    <Typography sx={{ mt: 0.4 }} variant='caption' gutterBottom>
                                      upgrade when you need
                                    </Typography>
                                    <Box sx={{ mt: 2, mb: 3 }}>{basicbutton}</Box>
                                </TableCell>
                                <TableCell
                                    width={200}
                                    sx={{
                                        border: '1px solid #C3C3C3',
                                        borderTop: '10px solid #ECEC2B',
                                        background: '#F0F0F0',
                                    }}
                                    align='center'
                                >
                                    <Typography
                                        variant='h5'
                                        gutterBottom
                                        sx={{ fontWeight: 'medium' }}
                                    >
                                        Break Free Pro
                                    </Typography>
                                    <Typography
                                        variant='caption'
                                        gutterBottom
                                        sx={{ fontWeight: 'medium' }}
                                    >
                                        Collaborate, Earn, Grow and be limitless with Break Free
                                        Pro.
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant='h4'
                                            component='h1'
                                            gutterBottom
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 0,
                                                fontWeight: 'medium',
                                            }}
                                        >
                                            <CurrencyRupeeIcon
                                                sx={{ fontSize: 30, fontWeight: 'medium' }}
                                            />
                                            500
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            gutterBottom
                                            sx={{ fontWeight: 'medium' }}
                                        >
                                            / month
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            mt: 1,
                                        }}
                                    >
                                        <Typography sx={{ mt: 0.4 }} variant='caption' gutterBottom>
                                            upgrade when you need
                                        </Typography>
                                        <ClickAwayListener onClickAway={handleTooltipClose0}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose0}
                                                open={open0}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={
                                                    <Typography
                                                        variant={'caption'}
                                                        gutterBottom
                                                        sx={{ textAlign: 'left' }}
                                                    >
                                                        With your first quarterly billing, you get an
                                                        additional month for free.
                                                        <br/>
                                                        <span style={{ color: '#FFFF00' }}>
                                                          Valid only for first-time users.
                                                        </span>
                                                    </Typography>
                                                }
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer', fontSize: '18px', ml: 0.4 }}
                                                    onClick={handleTooltipOpen0}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Box>
                                    <Box sx={{ mt: 2, mb: 3 }}>{probutton}</Box>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*Package 0, Basic 0, Pro 0*/}
                            <TableRow sx={{ background: '#F8F8F8' }}>
                                <TableCell component='th' scope='row' sx={{ border: '1px solid #C3C3C3' }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Package?.[0].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose1}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose1}
                                                open={open1}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Package?.[0].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen1}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Basic?.[0].title}</TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Pro?.[0].title}</TableCell>
                            </TableRow>

                            {/*Package 1, Basic 1, Pro 1*/}
                            <TableRow sx={{ background: '#F8F8F8' }}>
                                <TableCell component='th' scope='row' sx={{ border: '1px solid #C3C3C3' }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Package?.[1].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose2}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose2}
                                                open={open2}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Package?.[1].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen2}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Basic?.[1].title}</TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Pro?.[1].title}</TableCell>
                            </TableRow>

                            {/*Package 2, Basic 2, Pro 2*/}
                            <TableRow sx={{ background: '#F8F8F8' }}>
                                <TableCell component='th' scope='row' sx={{ border: '1px solid #C3C3C3' }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Package?.[2].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose3}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose3}
                                                open={open3}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Package?.[2].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen3}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Basic?.[2].title}</TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Pro?.[2].title}</TableCell>
                            </TableRow>

                            {/*Package 3, Basic 3, Pro 3*/}
                            <TableRow sx={{ background: '#F8F8F8' }}>
                                <TableCell component='th' scope='row' sx={{ border: '1px solid #C3C3C3' }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Package?.[3].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose4}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose4}
                                                open={open4}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Package?.[3].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen4}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Basic?.[3].title}</TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Pro?.[3].title}</TableCell>
                            </TableRow>

                            {/*Package 4, Basic 4, Pro 4*/}
                            <TableRow sx={{ background: '#F8F8F8' }}>
                                <TableCell component='th' scope='row' sx={{ border: '1px solid #C3C3C3' }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Package?.[4].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose5}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose5}
                                                open={open5}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Package?.[4].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen5}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Basic?.[4].title}</TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Pro?.[4].title}</TableCell>
                            </TableRow>

                            {/*Package 5, Basic 5, Pro 5*/}
                            <TableRow sx={{ background: '#F8F8F8' }}>
                                <TableCell component='th' scope='row' sx={{ border: '1px solid #C3C3C3' }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Package?.[5].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose6}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose6}
                                                open={open6}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Package?.[5].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen6}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Basic?.[5].title}</TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Pro?.[5].title}</TableCell>
                            </TableRow>

                            {/*Package 6, Basic 6, Pro 6*/}
                            <TableRow sx={{ background: '#F8F8F8' }}>
                                <TableCell component='th' scope='row' sx={{ border: '1px solid #C3C3C3' }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Package?.[6].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose7}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose7}
                                                open={open7}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Package?.[6].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen7}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Basic?.[6].title}</TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Pro?.[6].title}</TableCell>
                            </TableRow>

                            {/*Package 7, Basic 7, Pro 7*/}
                            <TableRow sx={{ background: '#F8F8F8' }}>
                                <TableCell component='th' scope='row' sx={{ border: '1px solid #C3C3C3' }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Package?.[7].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose8}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose8}
                                                open={open8}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Package?.[7].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen8}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Basic?.[7].title}</TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Pro?.[7].title}</TableCell>
                            </TableRow>

                            {/*Package 8, Basic 8, Pro 8*/}
                            <TableRow sx={{ background: '#F8F8F8' }}>
                                <TableCell component='th' scope='row' sx={{ border: '1px solid #C3C3C3' }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Package?.[8].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose9}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose9}
                                                open={open9}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Package?.[8].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen9}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Basic?.[8].title}</TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Pro?.[8].title}</TableCell>
                            </TableRow>

                            {/*Package 9, Basic 9, Pro 9*/}
                            <TableRow sx={{ background: '#F8F8F8' }}>
                                <TableCell component='th' scope='row' sx={{ border: '1px solid #C3C3C3' }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Package?.[9].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose10}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose10}
                                                open={open10}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Package?.[9].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen10}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Basic?.[9].title}</TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Pro?.[9].title}</TableCell>
                            </TableRow>

                            {/*Package 10, Basic 10, Pro 10*/}
                            <TableRow sx={{ background: '#F8F8F8' }}>
                                <TableCell component='th' scope='row' sx={{ border: '1px solid #C3C3C3' }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Package?.[10].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose11}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose11}
                                                open={open11}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Package?.[10].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen11}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>
                                    {/*{Basic?.[10].title}*/}
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Basic?.[10].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose15}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose15}
                                                open={open15}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Basic?.[10]?.typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen15}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Pro?.[10].title}</TableCell>
                            </TableRow>

                            {/*Package 11, Basic 11, Pro 11*/}
                            <TableRow sx={{ background: '#F8F8F8' }}>
                                <TableCell component='th' scope='row' sx={{ border: '1px solid #C3C3C3' }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Package?.[11].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose12}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose12}
                                                open={open12}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Package?.[11].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen12}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>
                                    {/*{Basic?.[11].title}*/}
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Basic?.[11].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose16}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose16}
                                                open={open16}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Basic?.[11].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen16}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Pro?.[11].title}</TableCell>
                            </TableRow>

                            {/*Package 12, Basic 12, Pro 12*/}
                            <TableRow sx={{ background: '#F8F8F8' }}>
                                <TableCell component='th' scope='row' sx={{ border: '1px solid #C3C3C3' }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Package?.[12].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose13}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose13}
                                                open={open13}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Package?.[12].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen13}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Basic?.[12].title}</TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Pro?.[12].title}</TableCell>
                            </TableRow>

                            {/*Package 13, Basic 13, Pro 13*/}
                            <TableRow sx={{ background: '#F8F8F8' }}>
                                <TableCell component='th' scope='row' sx={{ border: '1px solid #C3C3C3' }}>
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        sx={{ px: 3, py: 2.2, display: 'flex', alignItems: 'center' }}
                                    >
                                        {Package?.[13].title}&nbsp;
                                        <ClickAwayListener onClickAway={handleTooltipClose14}>
                                            <Tooltip
                                                arrow
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                onClose={handleTooltipClose14}
                                                open={open14}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={Package?.[13].typography}
                                            >
                                                <InfoOutlinedIcon
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={handleTooltipOpen14}
                                                />
                                            </Tooltip>
                                        </ClickAwayListener>
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Basic?.[13].title}</TableCell>
                                <TableCell sx={{ border: '1px solid #C3C3C3' }} align='center'>{Pro?.[13].title}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/*Mobile View*/}
            <Grid container sx={{ display: { xs: "block", md: "none" } }}>
                <Grid item sm={12} md={4} lg={4} sx={{ width: "100%" }}>
                    <Card
                        sx={{
                            minWidth: 275,
                            minHeight: { sm: "auto", md: 700 },
                            backgroundColor: "#F9F9F9",
                        }}
                        className="rounded"
                    >
                        <Divider
                            sx={{
                                backgroundColor: `${
                                    user?.plan === "basic" ? "#6F6F6F" : "#CBCB3F"
                                }`,
                                height: 10,
                            }}
                        />
                        <CardContent sx={{ p: 0 }}>
                            <Box>
                                <Accordion
                                    expanded={expandedPackage === "basic"}
                                    elevation={0}
                                    sx={{ background: "transparent", border: "none" }}
                                    onChange={handleChangePackage("basic")}
                                >
                                    <AccordionSummary
                                        aria-controls="basic-content"
                                        id="basic-header"
                                    >
                                        <Box
                                            sx={{
                                                minHeight: 180,
                                                px: 2,
                                                pt: 3,
                                                mb: 0,
                                                textAlign: "center",
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                sx={{ fontWeight: "medium" }}
                                            >
                                                Break Free Basic
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                gutterBottom
                                                sx={{ minHeight: 40 }}
                                            >
                                                Upload your portfolio, connect with relevant audiences
                                                and kick-start your dream career.
                                            </Typography>
                                            <Typography
                                                variant="h4"
                                                component="h1"
                                                gutterBottom
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    alignItem: "center",
                                                    mb: 0,
                                                    fontWeight: "medium",
                                                }}
                                            >
                                                <CurrencyRupeeIcon sx={{ fontSize: 30 }} /> 0
                                            </Typography>
                                            <Typography
                                                sx={{ fontSize: 12, pl: 1, mb: 2 }}
                                                variant="body2"
                                                gutterBottom
                                            >
                                                upgrade when you need
                                            </Typography>
                                            {basicbutton}
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography
                                            variant={"h6"}
                                            sx={{
                                                fontWeight: "medium",
                                                textAlign: "center",
                                                mx: "auto",
                                                mb: 2,
                                                background: "#E3E3E3",
                                                py: 1.4,
                                            }}
                                        >
                                            Package Details
                                        </Typography>
                                        <Accordion
                                            expanded={expandedPlan === "package0"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package0")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package0-content"
                                                id="package0-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[0].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose17}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose17}
                                                            open={open17}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[0].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen17}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Basic[0].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package1"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package1")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package1-content"
                                                id="package1-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[1].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose18}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose18}
                                                            open={open18}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[1].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen18}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Basic[1].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package2"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package2")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package2-content"
                                                id="package2-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[2].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose19}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose19}
                                                            open={open19}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[2].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen19}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Basic[2].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package3"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package3")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package3-content"
                                                id="package3-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[3].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose20}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose20}
                                                            open={open20}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[3].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen20}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Basic[3].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package4"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package4")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package4-content"
                                                id="package4-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[4].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose21}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose21}
                                                            open={open21}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[4].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen21}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Basic[4].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package5"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package5")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package5-content"
                                                id="package5-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[5].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose22}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose22}
                                                            open={open22}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[5].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen22}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Basic[5].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package6"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package6")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package5-content"
                                                id="package6-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[6].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose23}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose23}
                                                            open={open23}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[6].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen23}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Basic[6].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package7"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package7")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package7-content"
                                                id="package7-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[7].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose24}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose24}
                                                            open={open24}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[7].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen24}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Basic[7].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package8"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package8")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package8-content"
                                                id="package8-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[8].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose25}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose25}
                                                            open={open25}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[8].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen25}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Basic[8].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package9"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package9")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package9-content"
                                                id="package9-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[9].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose26}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose26}
                                                            open={open26}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[9].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen26}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Basic[9].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package10"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package10")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package10-content"
                                                id="package10-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[10].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose27}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose27}
                                                            open={open27}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[10].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen27}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    <p>{Basic[10].title}</p>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package11"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package11")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package11-content"
                                                id="package11-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[11].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose28}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose28}
                                                            open={open28}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[11].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen28}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Basic[11].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package12"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package12")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package12-content"
                                                id="package12-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[12].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose29}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose29}
                                                            open={open29}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[12].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen29}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Basic[12].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package13"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package13")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package13-content"
                                                id="package13-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[13].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose30}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose30}
                                                            open={open30}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[13].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen30}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Basic[13].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid
                    item
                    sm={12}
                    md={4}
                    lg={4}
                    sx={{ width: "100%", mt: { xs: 2, md: 0 } }}
                >
                    <Card
                        sx={{
                            minWidth: 275,
                            minHeight: { sm: "auto", md: 700 },
                            backgroundColor: "#F9F9F9",
                        }}
                        className="rounded"
                    >
                        <Divider
                            sx={{
                                backgroundColor: `${
                                    user?.plan === "basic" ? "#CBCB3F" : "#6F6F6F"
                                }`,
                                height: 10,
                            }}
                        />
                        <CardContent sx={{ p: 0 }}>
                            <Box>
                                <Accordion
                                    expanded={expandedPackage === "pro"}
                                    elevation={0}
                                    sx={{ background: "transparent", border: "none" }}
                                    onChange={handleChangePackage("pro")}
                                >
                                    <AccordionSummary
                                        aria-controls="basic-content"
                                        id="basic-header"
                                    >
                                        <Box
                                            sx={{
                                                minHeight: 180,
                                                px: 2,
                                                pt: 3,
                                                mb: 0,
                                                textAlign: "center",
                                            }}
                                        >
                                            <Typography
                                                variant='h5'
                                                gutterBottom
                                                sx={{ fontWeight: 'medium' }}
                                            >
                                                Break Free Pro
                                            </Typography>
                                            <Typography
                                                variant='caption'
                                                gutterBottom
                                                sx={{ fontWeight: 'medium' }}
                                            >
                                                Collaborate, Earn, Grow and be limitless with Break Free
                                                Pro.
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-end',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography
                                                    variant='h4'
                                                    component='h1'
                                                    gutterBottom
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mb: 0,
                                                        fontWeight: 'medium',
                                                    }}
                                                >
                                                    <CurrencyRupeeIcon
                                                        sx={{ fontSize: 30, fontWeight: 'medium' }}
                                                    />
                                                    500
                                                </Typography>
                                                <Typography
                                                    variant='caption'
                                                    gutterBottom
                                                    sx={{ fontWeight: 'medium' }}
                                                >
                                                    / month
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    mt: 1,
                                                }}
                                            >
                                                <Typography sx={{ mt: 0.4 }} variant='caption' gutterBottom>
                                                    upgrade when you need
                                                </Typography>
                                                <ClickAwayListener onClickAway={handleTooltipClose45}>
                                                    <Tooltip
                                                        arrow
                                                        PopperProps={{
                                                            disablePortal: true,
                                                        }}
                                                        onClose={handleTooltipClose45}
                                                        open={open45}
                                                        disableFocusListener
                                                        disableHoverListener
                                                        disableTouchListener
                                                        title={
                                                            <Typography
                                                                variant={'caption'}
                                                                gutterBottom
                                                                sx={{ textAlign: 'left' }}
                                                            >
                                                                With your first quarterly billing, you get an
                                                                additional month for free.
                                                                <br/>
                                                                <span style={{ color: '#FFFF00' }}>
                                                          Valid only for first-time users.
                                                        </span>
                                                            </Typography>
                                                        }
                                                    >
                                                        <InfoOutlinedIcon
                                                            sx={{ cursor: 'pointer', fontSize: '18px', ml: 0.4 }}
                                                            onClick={handleTooltipOpen45}
                                                        />
                                                    </Tooltip>
                                                </ClickAwayListener>
                                            </Box>
                                            <Box sx={{ mt: 2, mb: 3 }}>{probutton}</Box>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography
                                            variant={"h6"}
                                            sx={{
                                                fontWeight: "medium",
                                                textAlign: "center",
                                                mx: "auto",
                                                mb: 2,
                                                background: "#E3E3E3",
                                                py: 1.4,
                                            }}
                                        >
                                            Package Details
                                        </Typography>
                                        <Accordion
                                            expanded={expandedPlan === "package0"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package0")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package0-content"
                                                id="package0-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[0].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose31}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose31}
                                                            open={open31}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[0].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen31}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Pro[0].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package1"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package1")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package1-content"
                                                id="package1-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[1].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose32}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose32}
                                                            open={open32}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[1].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen32}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Pro[1].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package2"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package2")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package2-content"
                                                id="package2-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[2].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose33}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose33}
                                                            open={open33}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[2].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen33}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Pro[2].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package3"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package3")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package3-content"
                                                id="package3-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[3].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose34}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose34}
                                                            open={open34}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[3].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen34}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Pro[3].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package4"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package4")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package4-content"
                                                id="package4-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[4].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose35}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose35}
                                                            open={open35}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[4].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen35}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Pro[4].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package5"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package5")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package5-content"
                                                id="package5-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[5].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose36}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose36}
                                                            open={open36}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[5].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen36}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Pro[5].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package6"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package6")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package5-content"
                                                id="package6-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[6].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose37}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose37}
                                                            open={open37}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[6].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen37}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Pro[6].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package7"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package7")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package7-content"
                                                id="package7-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[7].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose38}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose38}
                                                            open={open38}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[7].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen38}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Pro[7].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package8"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package8")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package8-content"
                                                id="package8-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[8].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose39}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose39}
                                                            open={open39}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[8].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen39}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Pro[8].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package9"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package9")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package9-content"
                                                id="package9-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[9].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose40}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose40}
                                                            open={open40}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[9].typography}
                                                        >
                                                            <InfoOutlinedIcon onClick={handleTooltipOpen40} />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Pro[9].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package10"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package10")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package10-content"
                                                id="package10-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[10].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose41}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose41}
                                                            open={open41}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[10].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen41}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Pro[10].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package11"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package11")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package11-content"
                                                id="package11-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[11].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose42}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose42}
                                                            open={open42}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[11].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen42}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Pro[11].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package12"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package12")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package12-content"
                                                id="package12-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[12].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose43}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose43}
                                                            open={open43}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[12].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen43}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Pro[12].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            expanded={expandedPlan === "package13"}
                                            sx={{ background: "transparent", height: "auto" }}
                                            onChange={handleChangePlan("package13")}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownRoundedIcon />}
                                                aria-controls="package13-content"
                                                id="package13-header"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {Package[13].title}&nbsp;
                                                    <ClickAwayListener onClickAway={handleTooltipClose44}>
                                                        <Tooltip
                                                            arrow
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose44}
                                                            open={open44}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title={Package?.[13].typography}
                                                        >
                                                            <InfoOutlinedIcon
                                                                sx={{ cursor: "pointer" }}
                                                                onClick={handleTooltipOpen44}
                                                            />
                                                        </Tooltip>
                                                    </ClickAwayListener>
                                                </Typography>
                                                <Divider />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: "#DADADA",
                                                        p: 0.8,
                                                        borderRadius: "3px",
                                                    }}
                                                >
                                                    {Pro[13].title}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
