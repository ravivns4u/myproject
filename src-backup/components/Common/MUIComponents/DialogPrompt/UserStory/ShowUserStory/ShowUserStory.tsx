import React, { useEffect, useState } from "react";
import { Avatar, Box, Dialog, DialogContent, LinearProgress, Typography, Button, Menu, MenuItem, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector, } from "../../../../../../redux/app/hooks";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ShowUserStory = (props: any) => {
    const {
        showUserStoryPromptOpen,
        setShowUserStoryPromptOpen,
        handleShowUserStoryPromptOpen,
        handleShowUserStoryPromptClose,
        stories,
        groudpedStoriesView,
        handleUserStoryPromptOpen,
        getStories
    } = props;

    const {
        user: { user, firebaseToken },
        profile: { dp },
    } = useAppSelector((state) => state);

    const dispatch = useAppDispatch();
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const storyPopupClose = groudpedStoriesView && groudpedStoriesView.length > 0 && currentIndex === groudpedStoriesView.length - 1
    const [progress, setProgress] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (showUserStoryPromptOpen) {
            const timer = setInterval(() => {
                setProgress((oldProgress = 0) => {
                    if (oldProgress === 100) {
                        setProgress(0)
                        const index = localStorage.getItem('currentIndex')
                        if (groudpedStoriesView.length > 0 && Number(index) === groudpedStoriesView.length - 1) {
                            handleShowUserStoryPromptClose()
                        } else {
                            if(groudpedStoriesView.length === 1) {
                                handleShowUserStoryPromptClose()
                            } else {
                                handleNext();
                            }
                        }
                        oldProgress = 0;
                        return 0;
                    }
                    return oldProgress + 1;
                });
            }, 200);

            return () => {
                setCurrentIndex(0)
                setProgress(0)
                handleClose()
                clearInterval(timer);
            };
        }
    }, [handleShowUserStoryPromptClose, showUserStoryPromptOpen, groudpedStoriesView]);

    const handlePrev = () => {
        setCurrentIndex(currentIndex => currentIndex - 1)
        localStorage.setItem('currentIndex', currentIndex - 1)
        setProgress(0)
    }

    const handleNext = () => {
        setCurrentIndex(currentIndex => currentIndex + 1)
        localStorage.setItem('currentIndex', currentIndex + 1)
        setProgress(0)
    }

    const handleAddStory = () => {
        handleClose();
        handleShowUserStoryPromptClose()
        handleUserStoryPromptOpen()
    }

    const deleteStory = (fp:any) => {
        const payload = {
            firebaseToken: firebaseToken,
            fp: fp
        }
        fetch('/api/stories/delete-stories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.log('error', data?.error);
            } else {
                handleClose();
                handleShowUserStoryPromptClose();
                getStories(firebaseToken)
            }
          })
          .catch();
      }

    const handleDeleteStory = (fp: any) => {
        deleteStory(fp);
    }

    return (
        <div className="over-flow-dialouge">
            {groudpedStoriesView && groudpedStoriesView.length > 0 ? <Dialog
                disableEscapeKeyDown
                open={showUserStoryPromptOpen}
                onClose={handleShowUserStoryPromptClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{overflow:'hidden'}}
            >
                <LinearProgress variant="determinate" value={progress} />
                <DialogContent sx={{overflow:'hidden'}}>

                    <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar alt={groudpedStoriesView[currentIndex]?.metadata?.name} src={groudpedStoriesView[currentIndex]?.publicUri === undefined ? '/portfolio/person.png' : groudpedStoriesView[currentIndex]?.publicUri[0]} sx={{ mr: 2 }} />
                            <Typography
                                sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                                variant="subtitle1"
                            >
                                {groudpedStoriesView[currentIndex]?.metadata?.name}
                            </Typography>
                        </Box>
                       <Box sx={{display:'flex',alignItems:'center'}}>
                           {user?.uid ===groudpedStoriesView[currentIndex]?.metadata?.uid &&
                               <div>
                                   <IconButton
                                       aria-label="more"
                                       id="long-button"
                                       aria-controls={open ? 'long-menu' : undefined}
                                       aria-expanded={open ? 'true' : undefined}
                                       aria-haspopup="true"
                                       onClick={handleClick}
                                   >
                                       <MoreVertIcon />
                                   </IconButton>
                                   <Menu
                                       id="long-menu"
                                       MenuListProps={{
                                           'aria-labelledby': 'long-button',
                                       }}
                                       anchorEl={anchorEl}
                                       open={open}
                                       onClose={handleClose}
                                       PaperProps={{
                                           style: {
                                               // maxHeight: ITEM_HEIGHT * 4.5,
                                               // width: '20ch',
                                           },
                                       }}
                                   >
                                       <MenuItem key='add-more-story' onClick={handleAddStory}>
                                           Add More Story
                                       </MenuItem>
                                       <MenuItem key='delete-story' onClick={() => handleDeleteStory(groudpedStoriesView[currentIndex]?.fp)}>
                                           Delete Story
                                       </MenuItem>
                                   </Menu>
                               </div>}

                           <CloseRoundedIcon sx={{ cursor: 'pointer' }} onClick={handleShowUserStoryPromptClose} />
                       </Box>
                    </Box>
                    <Box>
                        {(groudpedStoriesView.length > 1 && currentIndex !== 0) &&
                            <Button
                                onClick={handlePrev}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: 0,
                                    zIndex:999999,
                                }}>
                                <ArrowBackIosIcon />
                            </Button>}
                    {groudpedStoriesView[currentIndex] !== undefined && (
                        <Box sx={{ textAlign: "center", maxWidth: '380px' }}>
                            {
                                <Box sx={{
                                    mt: 1,
                                    display: "flex",
                                    flexDirection:'column',
                                    justifyContent:'center',
                                    position: "relative",
                                    minWidth: "100%",
                                    width: "auto",
                                    maxWidth: 400,
                                    maxHeight: 500,
                                    height:'aut0',
                                    borderRadius: "20px",
                                    background: "white",
                                }}>
                                    <Box sx={{px:2}}>
                                        {groudpedStoriesView[currentIndex]?.fileType?.split("/")[0] === "image"
                                            ? groudpedStoriesView[currentIndex]?.storiesUri !== undefined && (
                                            <img
                                                alt={groudpedStoriesView[currentIndex]?.fileName}
                                                src={groudpedStoriesView[currentIndex]?.storiesUri[0]}
                                                style={{
                                                    maxWidth: "100%",
                                                    height:'100%',
                                                    objectFit:'contain',
                                                    backgroundPosition:'center',
                                                    backgroundSize:'contain',
                                                    borderRadius: "20px",
                                                    maxHeight:"450px"

                                                }}
                                            />
                                        )
                                            : groudpedStoriesView[currentIndex]?.storiesUri !== undefined && (
                                            <video
                                                autoPlay={false}
                                                controls
                                                muted
                                                width={"100%"}
                                                style={{
                                                    maxWidth: "100%",
                                                    maxHeight: "100%",
                                                    height:'100%',
                                                    objectFit:'contain',
                                                    backgroundPosition:'center',
                                                    backgroundSize:'contain',
                                                    borderRadius: "20px",
                                                }}
                                                src={groudpedStoriesView[currentIndex]?.storiesUri[0]}
                                            />
                                        )}
                                    </Box>
                                    <Typography variant="button" display="block" gutterBottom>
                                        {groudpedStoriesView[currentIndex]?.textContent}
                                    </Typography>
                                </Box>
                            }
                        </Box>
                    )}
                    {(groudpedStoriesView.length > 1 && currentIndex !== groudpedStoriesView.length - 1) &&
                        <Button
                            onClick={handleNext}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                right: '-2px',
                                zIndex:999999,
                            }}>
                            <ArrowForwardIosIcon />
                        </Button>}
                    </Box>
                </DialogContent>
            </Dialog> : null}
        </div>
    );
};

export default ShowUserStory;
