import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, } from "@mui/material";
import Image from "next/image";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Client from "../../../firebase/firebase_client_exports";
import { getUserDetails } from "../../../redux/slices/user";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hooks";
import { useRouter } from "next/router";

export async function getStaticProps(props:any) {
    return { props: { isDark: true } };
}

const FeaturedEvents = (props:any) => {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        user: { isLoggedIn, user, uid, firebaseToken },
        profile: {
            feeds: { images },
            feeds1: { caption },
            dp,
        },
        comments: { comments },
    } = useAppSelector((state) => state);

    useEffect(() => {
        const subcribe = onAuthStateChanged(Client.auth, (user) => {
            if (user !== null) {
                user.getIdToken().then((token) => {
                    dispatch(getUserDetails({ firebaseToken: token }));
                });
            } else {
                router.push("/login/merchants/individuals");
            }
        });
        return subcribe()
    }, [dispatch, router]);

    return (
            <Box className="divide">
                <Box
                    sx={{
                        backgroundColor: "white",
                        pt: 1,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: "80%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            p: 1,
                        }}
                    >
                        <Box sx={{ position: "relative", width: "100%" }}>
                            <Image
                                src={
                                    "https://images.unsplash.com/photo-1581306847481-9c6c9dc8cea4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                                }
                                width="1000"
                                height={"400"}
                                layout={"responsive"}
                                style={{
                                    objectFit:'contain',
                                    borderRadius: "20px",
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                width: "90%",
                                margin: "auto",
                                marginTop: "-20px",
                                zIndex: 1,
                            }}
                        >
                            <Card>
                                <CardContent
                                    sx={{
                                        width: "96%",
                                        justifyContent: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        variant={"h2"}
                                        gutterBottom
                                        sx={{ textAlign: "center", fontWeight: "bold" }}
                                    >
                                        New Year Eve by Breakfree
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            px: { sm: 1, md: 6, lg: 11 },
                                        }}
                                    >
                                        <Typography
                                            gutterBottom
                                            variant={"subtitle2"}
                                            sx={{
                                                color: "#D2C711",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <CalendarTodayOutlinedIcon sx={{ mr: 1 }}/>
                                            Friday, Sept. 2, 2022
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant={"subtitle2"}
                                            sx={{
                                                color: "#D2C711",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <AccessTimeIcon sx={{ mr: 1 }}/>
                                            07:00 PM - 10:00 PM
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant={"subtitle2"}
                                            sx={{
                                                color: "#D2C711",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <LocationOnOutlinedIcon sx={{ mr: 1 }}/>
                                            In-person
                                        </Typography>
                                    </Box>
                                    <Grid container spacing={2} sx={{ px: 2, mt: 2 }}>
                                        <Grid item xs={6}>
                                            <Typography
                                                variant={"h6"}
                                                gutterBottom
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                About the Event
                                            </Typography>
                                            <Typography variant={"subtitle1"} gutterBottom>
                                                Touting “quick and simple image placeholders,”
                                                Placeholder.com is easy to remember, and easy to use.
                                                Just grab their image URL, modify with your size
                                                parameters, and voila!
                                            </Typography>
                                            <Typography
                                                variant={"h6"}
                                                gutterBottom
                                                sx={{ fontWeight: "bold",mt:4 }}
                                            >
                                                About the Post
                                            </Typography>
                                            <Card sx={{ background:'#F9F9F9' }} elevation={0}>
                                                <CardContent>
                                                    <Box sx={{display: "flex", alignItems:'center',}}>
                                                        <Avatar
                                                            alt="Remy Sharp"
                                                            src={
                                                                "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                                            }
                                                        />
                                                        <Typography
                                                            sx={{mt:1,ml:1}}
                                                            variant={"subtitle2"}
                                                            gutterBottom
                                                        >
                                                            Remy Sharp
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant={"body2"} gutterBottom>
                                                        Touting “quick and simple image placeholders,”
                                                        Placeholder.com is easy to remember, and easy to use.
                                                        Just grab their image URL, modify with your size
                                                        parameters, and voila!
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Card sx={{mb:2,p:2}}>
                                                <CardContent>
                                                    <Typography
                                                        variant={"subtitle1"}
                                                        gutterBottom
                                                        sx={{ fontWeight: "bold" }}
                                                    >
                                                        Booking
                                                    </Typography>
                                                    <Divider/>
                                                    <Box sx={{display:'flex',justifyContent:'space-between',mt:2}}>
                                                        <Typography
                                                            variant={"subtitle2"}
                                                            gutterBottom
                                                            sx={{ fontWeight: "bold" }}
                                                        >
                                                            Amount
                                                        </Typography>
                                                        <Typography
                                                            variant={"subtitle2"}
                                                            gutterBottom
                                                            sx={{ fontWeight: "bold",display:'flex',alignItems:'center' }}
                                                        >
                                                            <CurrencyRupeeOutlinedIcon sx={{fontSize:'24px'}}/>
                                                            4000
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                            <Card sx={{ background:'#F9F9F9' }} elevation={0}>
                                                <CardContent>
                                                    <Typography
                                                        variant={"subtitle2"}
                                                        gutterBottom
                                                        sx={{ fontWeight: "bold" }}
                                                    >
                                                        Venue Details
                                                    </Typography>
                                                    <Typography variant={"body2"} gutterBottom>
                                                        Touting “quick and simple image placeholders,”
                                                        Placeholder.com is easy to remember!
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

export default FeaturedEvents;
