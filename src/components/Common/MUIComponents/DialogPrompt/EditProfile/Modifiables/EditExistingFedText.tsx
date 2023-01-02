import React, { useCallback } from "react";
import classes from "./Modifiables.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Client from "../../../../../../firebase/firebase_client_exports";
import { ref, uploadBytes } from "firebase/storage";
import Spinner from "../../../../Spinner/Spinner";
import Grid from "@mui/material/Grid";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../redux/app/hooks";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { getUserDetails } from "../../../../../../redux/slices/user";
import type {
  ReqPayload,
  ImageFeedData,
  CaptionFeedData,
  ReqFeedPayload,
} from "../../../../../../redux/interfaces/backend/apis/ImageFeed";
import { IMetaData } from "../../../../../../redux/interfaces/backend/apis";
import { constDocumentRefs } from "../../../../../../firebase/constants/firestore";
import { getUserAndImageFeed } from "../../../../../../redux/slices/profile";

interface Props {
  triggerChanges: () => void;
  metadata: IMetaData;
}
export default function EditExistingFedText(props: ImageFeedData & Props) {

  const { uid, firebaseToken, displayName } = useAppSelector(
    (state) => state.user
  );
  const [description, setDescription] = React.useState(props?.textContent);
  const [loading, setLoading] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState("Uploading...");
  const [uploaded, setUploaded] = React.useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [uploadError, setUploadError] = React.useState(false);

  React.useEffect(() => {
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

  React.useEffect(() => {
    setDescription(props?.textContent);
  }, [props]);

  const handleImageUpload = () => {
    if (loading) {
      return;
    }
    if (description !== null || description !== undefined) {
      setLoading(true);
      const uploadPayload = {
        fileName: props.fullPath,
        fullPath: props.fullPath,
        textContent: description,
        generation: props.fullPath,
        uid: uid,
        fp: props.fp,
        metadata: {
          uid: uid,
          name: displayName,
        },
      };
      const payload: ReqPayload = {
        payload: uploadPayload,
        firebaseToken: firebaseToken,
        modification: false,
      };
      fetch("/api/feed/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          response.json().then((data) => {
            if (!data.error) {
              setLoading(false);
              setUploaded(true);
              setUploadError(false);
              dispatch(
                getUserAndImageFeed({
                  firebaseToken,
                })
              );

              setUploadedFile("Upload Success");
              props.triggerChanges();
            } else {
              setLoading(false);
              setUploaded(false);
              setUploadError(true);
              setUploadedFile("Upload Failed. Please try again");
            }
          });
        })
        .catch((error) => {
          setLoading(false);
          setUploaded(false);
          setUploadError(true);
          setUploadedFile("Upload Failed. Kindly Retry");
        });
      setTimeout(() => setUploaded(false), 1500);
    }
  };
  return (
    <div className={[classes.ModifiableStructure, "ThinScrollbar"].join(" ")}>
      <label className={classes.TopLabel}>Edit Text</label>
      <Grid container spacing={{ xs: 2, md: 8 }} direction="row">
        <Grid item md={12}>
          <TextField
            required
            className={classes.FormInputField1}
            label="Edit Description"
            size="small"
            type="text"
            placeholder="Type Here"
            multiline
            rows={4}
            value={description ?? ""}
            onChange={(event) => setDescription(event.target.value)}
          />
          {loading || uploaded || uploadError ? (
            <p
              className={
                uploadError
                  ? classes.UploadingStatusError
                  : uploaded
                  ? classes.UploadingStatusSuccess
                  : classes.UploadingStatus
              }
            >
              {uploadedFile}
            </p>
          ) : null}
          <Button
            onClick={handleImageUpload}
            className={[
              classes.ThemeButtonBlack1,
              "ThemeButtonBlack",
              classes.ButtonWidth,
            ].join(" ")}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
