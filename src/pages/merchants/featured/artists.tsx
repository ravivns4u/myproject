import FeaturedArtistComponent from "../../../components/UserStories/Featured/FeatureArtistComponent";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hooks";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Client from "../../../firebase/firebase_client_exports";
import { getUserDetails } from "../../../redux/slices/user";

export async function getStaticProps(context:any) {
    return { props: { isDark: true } };
}

const FeaturedArtists = (props:any) => {

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
        <FeaturedArtistComponent props={props} />
    );
};

export default FeaturedArtists;