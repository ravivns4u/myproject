import React, { useCallback } from "react";
import classes from "./Modifiables.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Client from "../../../../../../firebase/firebase_client_exports";
import { ref, uploadBytes } from "firebase/storage";
import Spinner from "../../../../Spinner/Spinner";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../redux/app/hooks";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { getUserDetails } from "../../../../../../redux/slices/user";
import type {
  ReqPayload,
  ImagePortfolioData,
} from "../../../../../../redux/interfaces/backend/apis/ImagePortfolio";
import { IMetaData } from "../../../../../../redux/interfaces/backend/apis";
import { Autocomplete, createFilterOptions, Grid } from "@mui/material";
import { log } from "util";

interface Props {
  triggerChanges: () => void;
  metadata: IMetaData;
}

const filter = createFilterOptions();

export default function Portfolio(props: ImagePortfolioData & Props) {
  const [title, setTitle] = React.useState(props.title);
  const [description, setDescription] = React.useState(props.textContent);
  const [error, setError] = React.useState(false);
  const [file, setFile] = React.useState<any>({
    preview: props.publicUri ?? props.image ?? "/loading.png",
  });
  const [fileName, setFileName] = React.useState(props?.fileName);
  const [fileUploaded, setFileUploaded] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState("Uploading...");
  const [uploaded, setUploaded] = React.useState(false);
  const [categories,setCategories] = React.useState([])
  const [profession,setProfession] = React.useState([])
  const [sendProfession, setSendProfession] = React.useState(props.profession);
  const [sendCategory, setSendCategory] = React.useState(props.category);
  const [languages, setLanguages] = React.useState([] as string[]);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [uploadError, setUploadError] = React.useState(false);
  const { uid, firebaseToken,user:{plan} } = useAppSelector((state) => state.user);

  React.useEffect(()=>{
    fetch("/api/v2/languages").then((res) =>
        res.json().then((data) => {
          setLanguages(data?.payload?.languages);
          setCategories(data?.payload?.category);
          setProfession(data?.payload?.profession);
        })
    );
  },[])

  React.useEffect(() => {
    const subcriber = onAuthStateChanged(Client.auth, (user) => {
      if (user !== null) {
        user.getIdToken().then((token) => {
          dispatch(getUserDetails({ firebaseToken: token }));
        });
      } else {
        router.push("/login/merchants/individuals");
      }
    });
    return subcriber()
  }, [dispatch, router]);

  React.useEffect(() => {
    setTitle(props.title);
    setDescription(props.textContent);
    setFile({
      preview: props.publicUri ?? props.image ?? "/loading.png",
    });
  }, [props.title, props.textContent, props.publicUri, props.image]);

  const fileType =  fileName?.substring(fileName?.lastIndexOf(".") + 1, fileName?.length) || fileName;

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      setError(true);
    } else setError(false);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      setFile({
        file: file,
        preview: URL.createObjectURL(file),
      });
      setFileUploaded(true);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: fileType == "mp4" ? 30000000 : 10000000, //10MB
    accept: fileType == "mp4" ? ["video/mp4"] : ["image/*"],
    onDrop,
  });

  const handleImageUpload = () => {
    if (loading) {
      return;
    }
    if (file !== null || file !== undefined) {
      setLoading(true);
      const storageRef = ref(Client.storage, props.fullPath);
      if (file.file)
        uploadBytes(storageRef, file.file, {
          contentType: file.file.type,
        }).then((snapshot) => {
          const uploadPayload: ImagePortfolioData = {
            fileName: file.file.name,
            fullPath: snapshot.metadata.fullPath,
            textContent: description,
            title: title,
            category: sendCategory,
            profession: sendProfession,
            generation: snapshot.metadata.generation,
            uid: uid,
            fp: props.fp,
            metadata: props.metadata,
          };
          const payload: ReqPayload = {
            payload: uploadPayload,
            firebaseToken: firebaseToken,
            modification: true,
          };
          fetch("/api/portfolio/upload-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
            .then((response) => {
              response
                .json()
                .then((data) => {
                  if (!data.error) {
                    setLoading(false);
                    setUploaded(true);
                    setUploadError(false);
                    setUploadedFile("File Modified Successfully");
                    props.triggerChanges();
                  } else {
                    setLoading(false);
                    setUploaded(false);
                    setUploadError(true);
                    setUploadedFile("Upload Failed. Please try again");
                  }
                })
                .catch((error) => {
                  setLoading(false);
                  setUploaded(false);
                  setUploadError(true);
                  setUploadedFile("Upload Failed. Please try again");
                });
            })
            .catch((error) => {
              setLoading(false);
              setUploaded(false);
              setUploadError(true);
              setUploadedFile("Upload Failed. Kindly Retry");
            });
          setTimeout(() => setUploaded(false), 1500);
        });
      else {
        const uploadPayload: ImagePortfolioData = {
          fileName: props.fileName,
          fullPath: props.fullPath,
          textContent: description,
          title: title,
          category: sendCategory,
          profession: sendProfession,
          generation: props.generation,
          uid: props.uid,
          fp: props.fp,
          metadata: props.metadata,
        };
        const payload: ReqPayload = {
          payload: uploadPayload,
          firebaseToken: firebaseToken,
          modification: true,
        };
        fetch("/api/portfolio/upload-image", {
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
                setUploadedFile("File Modified Successfully");
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
    }
  };
  return (
    <div className={[classes.ModifiableStructure, "ThinScrollbar"].join(" ")}>
      <label className={classes.TopLabel}>Upload Image / Video</label>
      <div className={classes.UploadCanvas} {...getRootProps()}>
        <input {...getInputProps()}></input>

        {loading ? (
          <Spinner />
        ) : !fileUploaded ? (
          error ? (
            <React.Fragment>
              <label style={{ color: "red" }}>
                Invalid File! Either you have added a wrong file type or the
                file size is more than 10MBs. Please try again
              </label>
              <Button className={"ThemeButtonBlack"}>Browse Files</Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <label className={classes.UploadCanvas_title}>
                Drag and Drop your files here.
              </label>
              <label className={classes.UploadCanvas_generic}> OR </label>
              <Button className={"ThemeButtonBlack"}>Browse Files</Button>
              <label>Provide Only Image Files</label>
            </React.Fragment>
          )
        ) : (
          <div className={classes.CanvasImage}>
            {fileType != "mp4" ? (
              <Image
                src={file.preview}
                alt={"Uploaded"}
                height={200}
                width={600}
                objectFit={"contain"}
              />
            ) : (
              <video
                autoPlay
                controls
                muted
                height={200}
                width={600}
                src={file.preview}
              />
            )}
          </div>
        )}
      </div>
      <TextField
        required
        className={classes.FormInputField}
        label="Image Title"
        size="small"
        type="text"
        value={title ?? ""}
        onChange={(event) => setTitle(event.target.value)}
      />

      <TextField
        required
        className={classes.FormInputField}
        label="Image Description"
        size="small"
        type="text"
        placeholder="Type Here (500 characters max)"
        multiline
        rows={4}
        value={description ?? ""}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Autocomplete
              disablePortal
              limitTags={2}
              multiple={plan!== undefined && plan === 'pro'}
              disabled = {plan!== undefined && plan !== 'pro'}
              options={categories}
              defaultValue={props.category}
              onChange={(_, e) => {
                if (e) setSendCategory(plan!== undefined && plan === 'pro' ? e as [] : [e]);
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some((option) => inputValue === option?.title);
                if (inputValue !== '' && !isExisting) {
                  filtered.push(inputValue.toUpperCase());
                }
                return filtered;
              }}
              renderInput={(params) => (
                  <TextField
                      {...params}
                      label="Category"
                      required
                      className={classes.FormInputField}
                      size="medium"
                  />
              )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Autocomplete
              disablePortal
              limitTags={2}
              multiple
              options={profession}
              // value={}
              onChange={(_, e) => {
                if (e) setSendProfession(e as []);
              }}
              defaultValue={props.profession}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                  filtered.push(inputValue);
                }
                return filtered;
              }}
              renderInput={(params) => (
                  <TextField
                      {...params}
                      label="Profession"
                      required
                      className={classes.FormInputField}
                      size="medium"
                  />
              )}
          />
        </Grid>
      </Grid>
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
        className={["ThemeButtonBlack", classes.ButtonWidth].join(" ")}
      >
        Upload Image
      </Button>
    </div>
  );
}
