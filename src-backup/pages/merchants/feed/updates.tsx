import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, CircularProgress, IconButton, TextField, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {onAuthStateChanged} from 'firebase/auth';
import Client from '../../../firebase/firebase_client_exports';
import {useAppDispatch, useAppSelector} from '../../../redux/app/hooks';
import {getUserDetails} from '../../../redux/slices/user';
import {getProfileImage, getUserAndImageFeed, getUserAndImageFeed1} from '../../../redux/slices/profile';
import {getComments} from '../../../redux/slices/comments';
import _ from 'lodash';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import UserStoryPrompt from '../../../components/Common/MUIComponents/DialogPrompt/UserStory/UserStoryPrompt';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';
import ReactTimeAgo from 'react-time-ago';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ShowUserStory from '../../../components/Common/MUIComponents/DialogPrompt/UserStory/ShowUserStory/ShowUserStory';
import {ResponseParams} from '../../../redux/interfaces/backend/apiHandlers';
import FeaturedEventList from '../featured/eventList';
import FeaturedArtistList from '../featured/artistsList';
import {setFeedId} from '../../../redux/slices/feedsNotification';

TimeAgo.addLocale(en);

export async function getStaticProps() {
    return {props: {isDark: true}};
}

export default function FeedPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [showSidebar, setShowSidebar] = useState(false);
    const [showRightSidebar, setShowRightSidebar] = useState(false);
    const {
        user: {isLoggedIn, user, uid, firebaseToken},
        notify: {feed_uid},
        profile: {
            feeds: {images},
            feeds1: {caption},
            dp,
        },
        comments: {comments},
    } = useAppSelector((state) => state);

    function toggleRightSidebar() {
        setShowRightSidebar(!showRightSidebar);
    }

    const [posts, setPosts] = useState([] as any[]);
    const [comment, setComment] = useState([]);
    const [newComment, setNewComment] = useState([{comment: ''}]);

    const [showBackdrop, setShowBackdrop] = React.useState(false);

    React.useEffect(() => {
        if (isLoggedIn) {
            if (dp === '') dispatch(getProfileImage(uid));
        }
    }, [isLoggedIn, dp, dispatch, uid]);

    React.useEffect(() => {
        if (firebaseToken.length !== 0) {
            dispatch(getComments({firebaseToken}));
        }
    }, [dispatch, firebaseToken]);

    useEffect(() => {
        setComment(comments as []);
    }, [comments]);

    useEffect(() => {
        if (feed_uid) {
            setTimeout(() => {
                const ele = document.getElementById(feed_uid);
                if (ele) {
                    ele.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start'});
                    dispatch(setFeedId({feedUid: ''}))
                }
            }, 1000)
        }
    }, [feed_uid])

    React.useEffect(() => {
       const subcribe = onAuthStateChanged(Client.auth, (user) => {
            if (user !== null) {
                user.getIdToken().then((token) => {
                    dispatch(getUserDetails({firebaseToken: token}));
                });
            } else {
                router.push('/login/merchants/individuals');
            }
        });
        return subcribe()
    }, [dispatch, router]);

    React.useEffect(() => {
        if (firebaseToken.length !== 0) {
            dispatch(getUserAndImageFeed({firebaseToken}));
        }
    }, [firebaseToken, dispatch]);

    React.useEffect(() => {
        if (Object.values(comment).length !== 0 && images.length !== 0) {
            let data = images?.map((value) => {
                let postComments = Object.values(comment)?.filter(
                    (commentValue: any) => commentValue?.postFilePath === value?.fp
                );
                return {...value, comments: postComments, comment: ''};
            });
            setPosts(data as any[]);
        }
    }, [comment, images]);

    const [currentPost, setCurrentPost] = useState();

    const [userStoryPromptOpen, setUserStoryPromptOpen] = React.useState(false);
    const [showUserStoryPromptOpen, setShowUserStoryPromptOpen] = React.useState(false);

    const handleUserStoryPromptOpen = () => {
        setUserStoryPromptOpen(true);
    };

    const handleUserStoryPromptClose = () => {
        setUserStoryPromptOpen(false);
    };
    const handleShowUserStoryPromptOpen = () => {
        setShowUserStoryPromptOpen(true);
    };

    const handleShowUserStoryPromptClose = () => {
        setShowUserStoryPromptOpen(false);
    };

    React.useEffect(() => {
        if (firebaseToken.length !== 0) {
            dispatch(
                getUserAndImageFeed1({
                    firebaseToken,
                    startPoint: 0,
                    endPoint: 5,
                })
            );
        }
    }, [dispatch, firebaseToken]);

    const handleRedirect = (path: string) => {
        const userName = user?.displayName.replace(' ', '-').toLowerCase();
        router.push(`/merchants/${userName}/${path}`);
    };

    const handleSendComment = (index: any, event: any) => {
        let data = [...posts];
        data[index]['comment'] = event.target.value;
        setNewComment(data);
    };

    const [backendMsg, setBackendMsg] = React.useState('');
    const errorLogger = (error: any, msg: string) => {
        setBackendMsg(msg);
    };

    const sendComment = async (post: any) => {
        setShowBackdrop(true)
        if (newComment?.length !== 0 && post?.comment?.length !== 0) {
            let payloadData = {
                comment: post?.comment,
                metadata: {
                    name: user.displayName,
                    uid,
                },
                postFilePath: post?.fp,
            };
            const payload: any = {
                payload: payloadData,
                firebaseToken,
                create: true,
            };
            fetch('/api/comments/add-comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }).then((response) =>
                response
                    .json()
                    .then((data: ResponseParams) => {
                        const {error, msg} = data;
                        if (error) {
                            errorLogger(msg, msg);
                        } else {
                            setBackendMsg('');
                            dispatch(getUserAndImageFeed({firebaseToken}));
                            dispatch(getComments({firebaseToken}));
                            setTimeout(() => {
                                setShowBackdrop(false)
                            }, 2000)
                        }
                    })
                    .catch((error) => errorLogger(error, 'Unable to Parse Info. Please try again'))
            );
        }
    };

    const [stories, setStories] = useState([]);
    const [groudpedStories, setGroupedStories] = useState();
    const [groudpedStoriesView, setGroupedStoriesView] = useState();
    const [groudpedStoriesSelf, setGroupedStoriesSelf] = useState();
    const [storyView, setStoryView] = useState([])

    const getStories = (firebaseToken) => {
        fetch('/api/stories/get-stories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firebaseToken,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log('error', data?.error);
                } else {
                    setStories(data.story);
                    const grp = _.groupBy(data.story, 'metadata.uid')
                    const selfStoires = grp[user?.uid]
                    const otherStories = Object.keys(grp).filter(key => key !== user?.uid).reduce((obj, key) => {
                        obj[key] = grp[key];
                        return obj;
                    }, {});
                    setGroupedStoriesSelf(selfStoires);
                    setGroupedStories(otherStories)
                }
            })
            .catch();
    }

    useEffect(() => {
        if (firebaseToken) {
            getStories(firebaseToken);
        }
    }, [firebaseToken]);

    const handleViewStory = (story: any, groupedStory: any) => {
        setStoryView(story);
        setGroupedStoriesView(groupedStory);
        handleShowUserStoryPromptOpen();
    };

    const handleLikes = (post: any, index: any) => {
        const backup = posts
        const old = posts
        if (uid in post?.liked_users) {
            old[index].liked_count = old[index].liked_count - 1;
            delete old[index].liked_count.uid;
        } else {
            old[index].liked_count = old[index].liked_count + 1;
            old[index].liked_users = {...old[index].liked_users, uid: user.displayName};
        }
        setPosts(old)
        let payloadData = {
            fp: post?.fp,
            liked_users: {
                name: user.displayName,
                uid,
            },
        };
        let payload: any = {
            payload: payloadData,
            firebaseToken,
        };
        fetch('/api/likes/update-likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data: ResponseParams) => {
                const {error, msg} = data;
                if (error) {
                    errorLogger(msg, msg);
                    setPosts(backup)
                } else {
                    setBackendMsg('');
                    dispatch(getUserAndImageFeed({firebaseToken}));
                    dispatch(getComments({firebaseToken}));
                }
            })
            .catch((error) => {
                setPosts(backup);
                errorLogger(error, 'Unable to Parse Info. Please try again')
            });
    };

    function toggleSidebar() {
        setShowSidebar(!showSidebar);
    }

// function toggleRightSidebar() {
//     setShowRightSidebar(!showRightSidebar);
// }

    return (
        <>
            <div className="divide">
                <button
                    className="sideBarBtn"
                    style={{left: 0}}
                    onClick={toggleSidebar}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                    </svg>
                </button>
                <div
                    className="sideBar"
                    style={{
                        left: 0,
                        visibility: showSidebar ? "visible" : "hidden",
                        opacity: showSidebar ? "1" : "0",
                        transform: showSidebar
                            ? "translate(0px, 0px)"
                            : "translate(-155px, 0px)",
                        margin: showSidebar ? "0px 0px 0px 0px" : "0px 0px 0px -270px",
                        width: showSidebar ? "36%" : "26%",
                    }}
                >
                    <ul style={{paddingTop: "60px"}}>
                        {user?.ndaSigned && (
                            <>
                                <li onClick={() => handleRedirect("portfolio/images")}>
                                    <Avatar
                                        className={"sidebarImg"}
                                        alt={user.displayName}
                                        src={dp === "" ? "/portfolio/person.png" : dp}
                                    />
                                    <div className="iconName">
                                        {_.capitalize(user?.displayName)}
                                    </div>
                                </li>
                                <li onClick={() => handleRedirect("portfolio/images")}>
                                    <img
                                        className="sidebarImg"
                                        src="/feedPage/Final Portfolio.png"
                                        alt=""
                                    />
                                    <div className="iconName">Portfolio</div>
                                </li>
                                <li onClick={() => handleRedirect("services/verified")}>
                                    <img
                                        className="sidebarImg"
                                        src="/feedPage/Services.png"
                                        alt=""
                                    />
                                    <div className="iconName">Services</div>
                                </li>
                                <li onClick={() => handleRedirect("events/verified")}>
                                    <img
                                        className="sidebarImg"
                                        src="/feedPage/Event.png"
                                        alt=""
                                    />
                                    <div className="iconName">Events</div>
                                </li>
                                <li onClick={() => handleRedirect("products/verified")}>
                                    <img
                                        className="sidebarImg"
                                        src="/feedPage/Product.png"
                                        alt=""
                                    />
                                    <div className="iconName">Products</div>
                                </li>
                            </>
                        )}
                        {user?.ndaSigned && user?.subscription && (
                            <li onClick={() => handleRedirect("order-requests/events")}>
                                <img
                                    className="sidebarImg"
                                    src="/feedPage/Order Requests.png"
                                    alt=""
                                />
                                <div className="iconName">Order Requests</div>
                            </li>
                        )}
                        <li onClick={() => handleRedirect("subscription")}>
                            <img
                                className="sidebarImg"
                                src="/feedPage/Final Subscription.png"
                                alt=""
                            />
                            <div className="iconName">Subscription</div>
                        </li>
                        <li>
                            <div className="points">
                                <span>About</span>&#8226;<span>Privacy Policy</span>&#8226;
                                <span>Terms of Service</span>
                            </div>
                        </li>
                        <li>
                            <div className="points">
                                <span className="follow">Follow Us</span>
                                <br/>
                                <span>Instagram</span>&#8226;<span>Facebook</span>&#8226;
                                <span>LinkedIn</span>&#8226;<span>Twitter</span>
                                <br/>
                                <span>&copy;2021 Break Free</span>
                            </div>
                        </li>
                    </ul>
                    <div className="Clsem" onClick={toggleSidebar}>
                        {" "}
                        <img src="/feedPage/cancel.png"></img>{" "}
                    </div>
                </div>
                <Box className="containerDiv">
                    <Box
                        sx={{
                            p: 1,
                            display: "flex",
                            flexDirection: "row",
                            overflowX: "auto",
                            width: "100%",
                        }}
                    >
                        {groudpedStoriesSelf && groudpedStoriesSelf.length > 0 ? (
                            <Box
                                sx={{
                                    mr: 1,
                                    borderRadius: "30px",
                                    textAlign: "center",
                                    p: 1,
                                    cursor: "pointer",
                                    boxShadow:
                                        "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                                }}
                            >
                                {groudpedStoriesSelf[0]?.fileType?.split("/")[0] ===
                                    "image" && (
                                        <img
                                            onClick={() => handleViewStory("", groudpedStoriesSelf)}
                                            src={groudpedStoriesSelf[0]?.storiesUri as string}
                                            alt={groudpedStoriesSelf[0]?.fileName}
                                            height="130"
                                            width="100"
                                            style={{
                                                borderRadius: "30px",
                                            }}
                                        />
                                    )}
                                {groudpedStoriesSelf[0]?.fileType?.split("/")[0] ===
                                    "video" && (
                                        <video
                                            onClick={() => handleViewStory("", groudpedStoriesSelf)}
                                            autoPlay={false}
                                            muted
                                            height="130"
                                            width="100"
                                            src={groudpedStoriesSelf[0]?.storiesUri}
                                            style={{
                                                borderRadius: "30px",
                                            }}
                                        />
                                    )}
                                <Typography sx={{textAlign: "center"}} variant={"subtitle2"}>
                                    Your Story
                                </Typography>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    mr: 1,
                                    borderRadius: "30px",
                                    textAlign: "center",
                                    p: 1,
                                    boxShadow:
                                        "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "120px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Avatar
                                        alt="user profile pic"
                                        src={dp === "" ? "/portfolio/person.png" : dp}
                                        sx={{width: 80, height: 80,my:1}}
                                    />
                                    {user?.ndaSigned && (
                                        <Button
                                            size="small"
                                            onClick={handleUserStoryPromptOpen}
                                            sx={{
                                                background: "#FFFF00",
                                                color: "#000000",
                                                borderRadius: "50px",
                                                "&:hover": {
                                                    background: "#000000",
                                                    color: "#FFFF00",
                                                },
                                                textAlign: "center",
                                                fontSize: "10px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            + Add Story
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                maxWidth: `${!showSidebar ? "680px" : "500px"}`,
                                width: "100%",
                            }}
                        >
                            {!_.isEmpty(groudpedStories) &&
                                Object.keys(groudpedStories).map((key, index) => {
                                    return (
                                        <Box
                                            key={index}
                                            sx={{
                                                mr: 1,
                                                borderRadius: "30px",
                                                textAlign: "center",
                                                p: 1,
                                                cursor: "pointer",
                                                boxShadow:
                                                    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                                            }}
                                        >
                                            {groudpedStories[key][0]?.fileType?.split("/")[0] ===
                                                "image" && (
                                                    <img
                                                        onClick={() =>
                                                            handleViewStory(
                                                                groudpedStories[key][0],
                                                                groudpedStories[key]
                                                            )
                                                        }
                                                        src={groudpedStories[key][0]?.storiesUri as string}
                                                        alt={groudpedStories[key][0]?.fileName}
                                                        height="130"
                                                        width="100"
                                                        style={{
                                                            borderRadius: "30px",
                                                        }}
                                                    />
                                                )}
                                            {groudpedStories[key][0]?.fileType?.split("/")[0] ===
                                                "video" && (
                                                    <video
                                                        onClick={() =>
                                                            handleViewStory(
                                                                groudpedStories[key][0],
                                                                groudpedStories[key]
                                                            )
                                                        }
                                                        autoPlay={false}
                                                        muted
                                                        height="130"
                                                        width="100"
                                                        src={groudpedStories[key][0]?.storiesUri}
                                                        style={{
                                                            borderRadius: "30px",
                                                        }}
                                                    />
                                                )}
                                            <Typography
                                                sx={{textAlign: "center"}}
                                                variant={"subtitle2"}
                                            >
                                                {groudpedStories[key][0]?.metadata?.name.split(" ")[0]}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                        </Box>
                    </Box>
                    <Box sx={{width: "100%"}}>
                        {posts.length !== 0 &&
                            posts.map((post, index) => (
                                <div
                                    id={post?.fp}
                                    key={index}
                                    className="userProfile"
                                    style={{marginBottom: "3rem"}}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mx: 3,
                                            my: 1,
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={
                                                post?.feedUserUri.length === 0
                                                    ? "/portfolio/person.png"
                                                    : post?.feedUserUri[0]
                                            }
                                        />
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                ml: 1,
                                                fontWeight: "bold",
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {post.metadata?.name}
                                        </Typography>
                                    </Box>

                                    {post?.fileType === "image" ? (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                position: "relative",
                                                mx: "auto",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    px: 2,
                                                    pt: 1,
                                                    pb: 2,
                                                    fontSize: "0.875rem !important",
                                                }}
                                            >
                                                <p style={{whiteSpace: "pre-line"}}>
                                                    {post?.textContent}
                                                </p>
                                            </Typography>
                                            <img
                                                alt="Image"
                                                src={post?.publicUri}
                                                style={{margin: "auto"}}
                                                width="280"
                                                height="auto"
                                            />
                                        </Box>
                                    ) : post?.fileType === "video" ? (
                                        <>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    px: 2,
                                                    pt: 1,
                                                    pb: 2,
                                                    fontSize: "0.875rem !important",
                                                }}
                                            >
                                                <p style={{whiteSpace: "pre-line"}}>
                                                    {post?.textContent}
                                                </p>
                                            </Typography>
                                            {/* <iframe src={post?.publicUri} width={'100%'} height={400} /> */}
                                            <video
                                                autoPlay={false}
                                                controls
                                                muted
                                                width={"100%"}
                                                height={400}
                                                src={post?.publicUri}
                                                style={{
                                                    borderRadius: "30px",
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <Typography
                                            sx={{
                                                ml: "2rem",
                                                mr: "2rem",
                                                fontSize: "0.875rem !important",
                                            }}
                                            variant="subtitle1"
                                            gutterBottom
                                            component="div"
                                        >
                                            <p style={{whiteSpace: "pre-line"}}>
                                                {post?.textContent}
                                            </p>
                                        </Typography>
                                    )}
                                    <div
                                        className="heartMain"
                                        onClick={() => handleLikes(post, index)}
                                    >
                                        <div className="heartLikeText">
                                            <FavoriteRoundedIcon
                                                sx={{
                                                    color: uid in post?.liked_users ? "red" : "grey",
                                                    cursor: "pointer",
                                                }}
                                            />

                                            <div
                                                className="textNumber"
                                                style={{
                                                    color: uid in post?.liked_users ? "red" : "grey",
                                                }}
                                            >
                                                {post?.liked_count}
                                            </div>
                                        </div>
                                        <div className="userComments">
                                            {post?.comments?.length} comments
                                        </div>
                                    </div>
                                    <Box>
                                        {post?.comments?.map((comment: any, i: any) => {
                                            return (
                                                <Box
                                                    key={i}
                                                    className="userReply"
                                                    sx={{
                                                        p: 1,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            width: "auto",
                                                            mx: 2,
                                                        }}
                                                    >
                                                        <Avatar alt="Remy Sharp" src={comment?.publicUri}/>
                                                    </Box>
                                                    <div key={index} className="middleUser">
                                                        <div
                                                            style={{textTransform: "capitalize"}}
                                                            className="userId"
                                                        >
                                                            {comment?.metadata.name}
                                                        </div>
                                                        <p className="userParagraph">{comment?.comment}</p>
                                                    </div>
                                                    <Box
                                                        className="userComments"
                                                        sx={{
                                                            ml: "auto",
                                                        }}
                                                    >
                                                        <ReactTimeAgo
                                                            date={new Date(comment?.createdAt).getTime()}
                                                            locale="en-US"
                                                        />
                                                    </Box>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                    {!showBackdrop ? (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                ml: 3,
                                                my: 2,
                                                mr: 2,
                                                alignItems: "center",
                                            }}
                                        >
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={dp === "" ? "/portfolio/person.png" : dp}
                                                sx={{mr: 2}}
                                            />
                                            <TextField
                                                name="comment"
                                                key={index}
                                                size="small"
                                                id="outlined-basic"
                                                label=""
                                                variant="outlined"
                                                fullWidth
                                                sx={{padding: 0, margin: 0}}
                                                value={post.comment}
                                                onChange={(event) => handleSendComment(index, event)}
                                            />
                                            <IconButton
                                                sx={{ml: 2, display: "flex", alignItems: "center"}}
                                                onClick={() => sendComment(post)}
                                            >
                                                <SendRoundedIcon/>
                                            </IconButton>
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                width: "100%",
                                                p: 2,
                                                justifyContent: "center",
                                            }}
                                        >
                                            <CircularProgress color="inherit"/>
                                        </Box>
                                    )}
                                    {backendMsg && (
                                        <Typography variant={"h6"} sx={{textAlign: "center"}}>
                                            {backendMsg}
                                        </Typography>
                                    )}
                                </div>
                            ))}
                    </Box>
                </Box>

                <Box sx={{display: {xs: "block", md: "none"}}}>
                    <button
                        className="sideBarBtn"
                        style={{right: 0, transform: "scale(-1, 1)"}}
                        onClick={toggleRightSidebar}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            />
                        </svg>
                    </button>
                    <div
                        className="sideBar"
                        style={{
                            right: 0,
                            visibility: showRightSidebar ? "visible" : "hidden",
                            opacity: showRightSidebar ? "1" : "0",
                            transform: showRightSidebar
                                ? "translate(0px, 0px)"
                                : "translate(-155px, 0px)",
                            margin: showRightSidebar ? "0px 0px 0px 0px" : "0px -270px 0px 0",
                            width: showRightSidebar ? "36%" : "26%",
                        }}
                    >
                        <FeaturedArtistList/>
                        <FeaturedEventList/>
                    </div>
                </Box>
                <Box
                    className="RtpCtgryMvr"
                    sx={{display: {xs: "none", md: "block"}}}
                >
                    <FeaturedArtistList/>
                    <FeaturedEventList/>
                </Box>
            </div>
            <UserStoryPrompt
                userStoryPromptOpen={userStoryPromptOpen}
                setUserStoryPromptOpen={setUserStoryPromptOpen}
                handleUserStoryPromptOpen={handleUserStoryPromptOpen}
                handleUserStoryPromptClose={handleUserStoryPromptClose}
                getStories={getStories}
            />
            <ShowUserStory
                showUserStoryPromptOpen={showUserStoryPromptOpen}
                setShowUserStoryPromptOpen={setShowUserStoryPromptOpen}
                handleShowUserStoryPromptOpen={handleShowUserStoryPromptOpen}
                handleShowUserStoryPromptClose={handleShowUserStoryPromptClose}
                stories={storyView}
                groudpedStoriesView={groudpedStoriesView}
                handleUserStoryPromptOpen={handleUserStoryPromptOpen}
                getStories={getStories}
            />
        </>
    );
}
