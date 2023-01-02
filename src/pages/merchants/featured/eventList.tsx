import React, { useState, useEffect } from "react";
import EventListComponent from "../../../components/UserStories/EventList";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hooks";
import { getEvents } from "../../../redux/slices/events";

const FeaturedEventList = () => {
  const {
    user: { isLoggedIn, user, uid, firebaseToken },
    profile: {
      feeds: { images },
      feeds1: { caption },
      dp,
    },
    comments: { comments },
    events: { events },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
 
   const payload ={
     uid,
     categories: user.categories
    }
    if (firebaseToken) {
      dispatch(getEvents({ firebaseToken,payload }));
    }
  }, [firebaseToken, dispatch, uid]);
  
  return (
    <div className="featuredEvents">
      <div className="head">FEATURED EVENTS</div>
      <div className="events">
        <EventListComponent events={events} />
      </div>
    </div>
  );
};

export default FeaturedEventList;
