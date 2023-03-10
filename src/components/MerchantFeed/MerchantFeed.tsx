import { Avatar, Box, Button, IconButton, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import classes from './MerchantFeed.module.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import FlagIcon from '@mui/icons-material/Flag';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

type Props = {};

const stories = [
  { href: '/feedPage/story.png' },
  { href: '/feedPage/story.png' },
  { href: '/feedPage/story.png' },
  { href: '/feedPage/story.png' }
];

const comments = [
  {
    href: '/feedPage/imgComment.jfif',
    name: 'Sibi Babu',
    comment: 'Pretty exciting.',
    time: '7 hours',
  },
  {
    href: '/feedPage/imgComment.jfif',
    name: 'Binay M',
    comment: 'Superb.',
    time: '5 hours',
  },
];


export default function MerchantFeed({}: Props) {


  const [showSidebar, setShowSidebar] = useState(false);
  function toggleSidebar(){
    setShowSidebar(!showSidebar);
  }


  return (
    <div className={classes.divide}>
      <button className={classes.sideBarBtn} onClick={toggleSidebar}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
</svg>
      </button>
<div className={classes.sideBar} style={{
        visibility: showSidebar?"visible":"hidden",
        opacity: showSidebar?"1":"0",
        transform: showSidebar?"translate(0px, 0px)":"translate(-155px, 0px)",
        margin: showSidebar?"0px 0px 0px 0px":"0px 0px 0px -270px",
        width: showSidebar?"36%":"26%",
        // display: showSidebar?"block":"none"
      }}>
        
  <ul>
    <li>
      <img className={classes.sidebarImg} src='/feedPage/sidebarImg.png' alt=''/>
      <div className={classes.iconName}>Jane Doe</div>
    </li>
    <li>
      <img className={classes.sidebarImg} src='/feedPage/marketplace.png' alt=''/>
      <div className={classes.iconName}>Marketplace</div>
    </li>
    <li>
      <img className={classes.sidebarImg} src='/feedPage/watch.png' alt=''/>
      <div className={classes.iconName}>Watch</div>
    </li>
    <li>
      <img className={classes.sidebarImg} src='/feedPage/memories.png' alt=''/>
      <div className={classes.iconName}>Memories</div>
    </li>
    <li>
      <img className={classes.sidebarImg} src='/feedPage/browseevents.png' alt=''/>
      <div className={classes.iconName}>Browse events</div>
    </li>
    <li>
      <img className={classes.sidebarImg} src='/feedPage/bookaservice.png' alt=''/>
      <div className={classes.iconName}>Book a service</div>
    </li>
    <li>
      <img className={classes.sidebarImg} src='/feedPage/shop.png' alt=''/>
      <div className={classes.iconName}>Shop</div>
    </li>

    <li>
  <div className={classes.points}>
    <span>About</span>&#8226;<span>Privacy Policy</span>&#8226;<span>Terms of Service</span>
  </div>
  
    </li>

    <li>
    <div className={classes.points}>
    <span className={classes.follow}>Follow Us</span><br/>
    <span>Instagram</span>&#8226;<span>Facebook</span>&#8226;<span>LinkedIn</span>&#8226;<span>Twitter</span><br/>
    <span>&copy;2021 Break Free</span>
  </div>
  </li>
 
  </ul>
  <div className="Clsem" onClick={toggleSidebar}> <img src="/feedPage/cancel.png"></img> </div>

</div>
    <div className={classes.containerDiv}>
      <div className={classes.storyDiv}>
        <Box className={classes.boxAddStory}>
          <img
            className={classes.imgAddStory}
            src='/feedPage/addStory.png'
            alt=''
          />
          <Button className={classes.btnAddStory}>+ Add Story</Button>
        </Box>

        {stories.map((story, index) => {
          return (
            <Box
              key={index}
              className={classes.boxStory}
              sx={{ border: 2, borderColor: '#FFFF00' }}>
              <img className={classes.imgStory} src={story.href} alt='' />
            </Box>
          );
        })}
        {/* <Button className={classes.btnStoryRight}>
          <img
            className={classes.imgStoryRightArrow}
            src='/feedPage/rightArrow.png'
            alt=''
          />
        </Button> */}
        <div className={classes.btnStory}>
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.454102 9.49993C0.454102 11.2891 0.984642 13.038 1.97863 14.5256C2.97262 16.0132 4.38541 17.1727 6.03836 17.8574C7.6913 18.542 9.51015 18.7212 11.2649 18.3721C13.0197 18.0231 14.6315 17.1615 15.8966 15.8964C17.1617 14.6313 18.0233 13.0195 18.3723 11.2647C18.7214 9.50997 18.5422 7.69111 17.8575 6.03817C17.1729 4.38523 16.0134 2.97244 14.5258 1.97845C13.0382 0.984458 11.2892 0.453918 9.50012 0.453918C7.101 0.454041 4.80018 1.40714 3.10375 3.10357C1.40732 4.8 0.454224 7.10082 0.454102 9.49993ZM7.78987 4.60254L12.6873 9.49993L7.78987 14.3973V11.2423L9.5304 9.49993L7.78987 7.75756V4.60254Z" fill="#35352F"/>
</svg>
        </div>
      </div>

      <div className={classes.divFeed}>
        <div className={classes.feedTitle}>
          <div className={classes.avatarTitle}>
            <Avatar
              variant={'rounded'}
              src={'/feedPage/avatarJonDoe.png'}
              alt='break-free logo'
              className={classes.avatarPost}
            />
          </div>
          <div className={classes.nameAndTimeTitle}>
            <div className={classes.nameTitle}>Jon Doe</div>
            <div className={classes.timeTitle}>7 hours ago</div>
          </div>
        </div>

        <div className={classes.feedContent}>
          <img src='/feedPage/feedVideoThumbnail.png' alt='' className={classes.feedThumbnail}/>
        </div>

        <div className={classes.feedLikeSection}>
          <div className={classes.Counts}>
            <span className={classes.spanLike}>
              <IconButton className={classes.btnLike}>
                <FavoriteIcon className={classes.imgLike} />
              </IconButton>
              <span className={classes.likeCount}>23</span>
            </span>
            <span className={classes.commentCount}>2 comments</span>
          </div>
          <div>
            <hr className={classes.lineComment} />
          </div>
        </div>

        <div className={classes.feedCommentSection}>
          <div className={classes.comments}>
            {comments.map((comm, index) => {
              return (
                <div key={index} className={classes.commentBody}>
                  <div className={classes.imgAvatarComment}>
                    <Avatar
                      className={classes.avatarComments}
                      variant={'rounded'}
                      src={comm.href}
                      alt='break-free logo'
                    />
                  </div>
                  <div className={classes.contentComment}>
                    <div className={classes.nameComment}>{comm.name}</div>
                    <div className={classes.commentComments}>
                      {comm.comment}
                    </div>
                    <div className={classes.btnSectionComments}>
                      <IconButton className={classes.btnComments}>
                        <ReplyIcon />
                        Reply
                      </IconButton>
                      <IconButton className={classes.btnComments}>
                        <FlagIcon />
                        Report as spam
                      </IconButton>{' '}
                    </div>
                  </div>
                  <div className={classes.timeComment}>{comm.time}</div>
                </div>
              );
            })}

            <div className={classes.writeComment}>
              <div className={classes.imgAvatarComment}>
                <Avatar
                  className={classes.avatarComments}
                  variant={'rounded'}
                  src={'/feedPage/imgComment.jfif'}
                  alt='break-free logo'
                />
              </div>
              <div className={classes.divWriteComment}>
                <Box className={classes.boxWriteComment}>
                  <TextField
                    InputProps={{ disableUnderline: true }}
                    type='text'
                    variant='standard'
                    className={classes.txtField}
                    placeholder='Write a comment...'></TextField>
                  <IconButton>
                    <SentimentSatisfiedAltIcon />
                  </IconButton>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div className='RtpCtgryMvr'>
    <div className={classes.featured}>
      <div className={classes.head}>FEATURED ARTISTS</div>
      <div className={classes.artists}>
        <div className={classes.artistInfo}>
          <img className={classes.artistAvator} src='/feedPage/artistImg.png'
            alt=''/>
          <div className={classes.artistName}>John Doe NEW</div>
          <div className={classes.artistNext}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="20" r="20" fill="#FFFF00"/>
<path d="M30.7299 20.9571C31.1204 20.5666 31.1204 19.9334 30.7299 19.5429L24.3659 13.1789C23.9754 12.7884 23.3423 12.7884 22.9517 13.1789C22.5612 13.5695 22.5612 14.2026 22.9517 14.5931L28.6086 20.25L22.9517 25.9069C22.5612 26.2974 22.5612 26.9305 22.9517 27.3211C23.3423 27.7116 23.9754 27.7116 24.3659 27.3211L30.7299 20.9571ZM12.9961 21.25H30.0228V19.25H12.9961V21.25Z" fill="#35352F"/>
</svg>
          </div>

        </div>
        <div className={classes.artistInfo}>
          <img className={classes.artistAvator} src='/feedPage/artistImg.png'
            alt=''/>
          <div className={classes.artistName}>John Doe</div>
          <div className={classes.artistNext}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="20" r="20" fill="#FFFF00"/>
<path d="M30.7299 20.9571C31.1204 20.5666 31.1204 19.9334 30.7299 19.5429L24.3659 13.1789C23.9754 12.7884 23.3423 12.7884 22.9517 13.1789C22.5612 13.5695 22.5612 14.2026 22.9517 14.5931L28.6086 20.25L22.9517 25.9069C22.5612 26.2974 22.5612 26.9305 22.9517 27.3211C23.3423 27.7116 23.9754 27.7116 24.3659 27.3211L30.7299 20.9571ZM12.9961 21.25H30.0228V19.25H12.9961V21.25Z" fill="#35352F"/>
</svg>
          </div>

        </div>
        <div className={classes.artistInfo}>
          <img className={classes.artistAvator} src='/feedPage/artistImg.png'
            alt=''/>
          <div className={classes.artistName}>John Doe</div>
          <div className={classes.artistNext}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="20" r="20" fill="#FFFF00"/>
<path d="M30.7299 20.9571C31.1204 20.5666 31.1204 19.9334 30.7299 19.5429L24.3659 13.1789C23.9754 12.7884 23.3423 12.7884 22.9517 13.1789C22.5612 13.5695 22.5612 14.2026 22.9517 14.5931L28.6086 20.25L22.9517 25.9069C22.5612 26.2974 22.5612 26.9305 22.9517 27.3211C23.3423 27.7116 23.9754 27.7116 24.3659 27.3211L30.7299 20.9571ZM12.9961 21.25H30.0228V19.25H12.9961V21.25Z" fill="#35352F"/>
</svg>
          </div>

        </div>
        <div className={classes.artistInfo}>
          <img className={classes.artistAvator} src='/feedPage/artistImg.png'
            alt=''/>
          <div className={classes.artistName}>John Doe</div>
          <div className={classes.artistNext}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="20" r="20" fill="#FFFF00"/>
<path d="M30.7299 20.9571C31.1204 20.5666 31.1204 19.9334 30.7299 19.5429L24.3659 13.1789C23.9754 12.7884 23.3423 12.7884 22.9517 13.1789C22.5612 13.5695 22.5612 14.2026 22.9517 14.5931L28.6086 20.25L22.9517 25.9069C22.5612 26.2974 22.5612 26.9305 22.9517 27.3211C23.3423 27.7116 23.9754 27.7116 24.3659 27.3211L30.7299 20.9571ZM12.9961 21.25H30.0228V19.25H12.9961V21.25Z" fill="#35352F"/>
</svg>
          </div>

        </div>
      
      </div>
    </div>
    <div className={classes.featuredEvents}>
    <div className={classes.head}>FEATURED EVENTS</div>
      <div className={classes.events}>
        <div className={classes.eventImgInfo}>
          <img className={classes.eventImage} src='/feedPage/sampleEvents.png'
            alt=''/>
            <div className={classes.eventInfo}>
          <div className={classes.eventName}>Art ExtraVaganza</div>
          <div className={classes.eventSchedule}>
            <span className={classes.eventDate}>Sat, Sep 22</span><br/>
            <span className={classes.eventTime}>9:00 AM - 11:00 AM</span>
          </div>
          </div>

        </div>
        <div className={classes.eventImgInfo}>
          <img className={classes.eventImage} src='/feedPage/sampleEvents.png'
            alt=''/>
            <div className={classes.eventInfo}>
          <div className={classes.eventName}>Art ExtraVaganza</div>
          <hr/>
          <div className={classes.eventSchedule}>
            <span className={classes.eventDate}>Sat, Sep 22</span><br/>
            <span className={classes.eventTime}>9:00 AM - 11:00 AM</span>
          </div>
          </div>

        </div>
        <div className={classes.eventImgInfo}>
          <img className={classes.eventImage} src='/feedPage/sampleEvents.png'
            alt=''/>
            <div className={classes.eventInfo}>
          <div className={classes.eventName}>Art ExtraVaganza</div>
          <hr/>
          <div className={classes.eventSchedule}>
            <span className={classes.eventDate}>Sat, Sep 22</span><br/>
            <span className={classes.eventTime}>9:00 AM - 11:00 AM</span>
          </div>
          </div>
        </div>
        <div className={classes.eventImgInfo}>
          <img className={classes.eventImage} src='/feedPage/sampleEvents.png'
            alt=''/>
            <div className={classes.eventInfo}>
          <div className={classes.eventName}>Art ExtraVaganza</div>
          <hr/>
          <div className={classes.eventSchedule}>
            <span className={classes.eventDate}>Sat, Sep 22</span><br/>
            <span className={classes.eventTime}>9:00 AM - 11:00 AM</span>
          </div>
          </div>

        </div>
        </div>
    </div>
    </div>
    </div>
  );
}
