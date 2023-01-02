import React, { useState, useEffect } from "react";
import ArtistListComponent from "../../../components/UserStories/ArtistsList";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hooks";
import { getArtists } from "../../../redux/slices/artists";

const FeaturedArtistList = () => {
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
        artists: {artists}
      } = useAppSelector((state) => state);
        console.log("artists", artists)
      useEffect(() => {
        if(user?.categories){
          const payload ={categories: user?.categories}
         if (firebaseToken.length !== 0) {
           dispatch(getArtists({ firebaseToken,payload }));
         }
        }
       }, [firebaseToken, dispatch, uid]);
    return (
        <div className="featured">
            <div className="head">FEATURED ARTISTS</div>
            <div className="artists">
                <ArtistListComponent artists={artists} user={user}/>
            </div>
        </div>
    );
};

export default FeaturedArtistList;
