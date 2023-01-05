import { IMetaData } from "../../../../../../redux/interfaces/backend/apis";
import { Box, Button, TextField, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../../../redux/app/hooks";
import { ref, uploadBytes } from "firebase/storage";
import Client from "../../../../../../firebase/firebase_client_exports";
import { ResponseParams } from "../../../../../../redux/interfaces/backend/apiHandlers";
// @ts-ignore
import FFMPEG from "react-ffmpeg";

export interface AddStoryFrontend {
    fileName: string;
    fullPath: string;
    generation: string;
    textContent: string;
    fp: string;
    isDeleted: boolean;
    metadata?: IMetaData;
    createdAt?: any;
    fileType?: string;
}

const initialAddStoryForm: AddStoryFrontend = {
    fileName: "",
    fullPath: "",
    generation: "",
    textContent: "",
    fp: "",
    isDeleted: false,
    createdAt: new Date(),
    fileType: "",
    metadata: {
        name: "",
        uid: "",
    },
};

const VideoStoryComponent = (props: any) => {
    const { file, handleUserStoryPromptClose, setFile, setFileUploaded, getStories } = props;

    const {
        firebaseToken,
        uid,
        user: { displayName },
    } = useAppSelector((state) => state.user);

    const videoRef = useRef(file?.preview);

    const [saveVideo, setSaveVideo] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [backendMsg, setBackendMsg] = React.useState("");
    const [serviceForm, setServiceForm] =
        useState<AddStoryFrontend>(initialAddStoryForm);

    //video trim
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(30);
    const [convertedVideo, setConvertedVideo] = useState({file:'',preview:''});

    //file upload
    const [textContent, setTextContent] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");

    useEffect(() => {
        setFileName(file?.file?.name);
    }, [file]);

    const videoTrimmer = async() => {
        const duration = videoRef?.current?.duration;
        const command = `-metadata location="" -metadata location-eng="" -metadata author="" -ss ${startTime} -c copy -t ${endTime}`;
        if (duration >= 30) {
            await FFMPEG.process(file?.file, command, function(e: any) {
                console.log('converted')
                setLoading(false)
                const video = e.result;
                // @ts-ignore
                setConvertedVideo({file: video,preview: URL.createObjectURL(video),
                })
            });
        }
    };

    useEffect(() => {
        setTimeout(()=>{
            videoTrimmer();
            setLoading(true)
        },1000)
    }, []);

    const handleButtonClose = () => {
        setSaveVideo(false);
        setFile({
            preview: "",
        });
        setFileUploaded(false);
        handleUserStoryPromptClose();
    };

    const errorLogger = (error: any, msg: string) => {
        console.log(error);
        setBackendMsg(msg);
        setLoading(false);
    };

    const saveVideoStory = async() => {
        if (loading) {
            alert("Please Wait for current process to complete");
            return;
        }
        if (file) {
            if (
                file.file.type == null &&
                file.file.name == null &&
                serviceForm?.fileName === "" &&
                serviceForm?.fileType === ""
            ) {
                setBackendMsg("Uploaded File is not Valid. Please Retry");
                return;
            }
            setLoading(true);

            // @ts-ignore
            if (convertedVideo?.file) {
                const fileType = file.file.type ?? serviceForm.fileType;
                const docName = `image_${new Date().getTime()}_${fileName}`;
                const fullPath = `db-dev/user-metadata/stories/images/${uid}/${docName}`;
                const storageRef = ref(
                    Client.storage,
                    serviceForm.fullPath !== "" ? serviceForm.fullPath : fullPath
                );
                // @ts-ignore
                uploadBytes(storageRef, convertedVideo?.file, {
                    contentType: fileType,
                })
                    .then(() => {
                        serviceForm.fileName = fileName;
                        serviceForm.fullPath = fullPath;
                        serviceForm.fileType = fileType;
                        serviceForm.textContent = textContent;
                        serviceForm.isDeleted = false;
                        serviceForm.fp = docName;
                        serviceForm.generation = new Date().getTime().toString();
                        serviceForm.createdAt = new Date();
                        serviceForm.metadata={
                            uid:uid,
                            name:displayName,
                        }
                        const payload: any = {
                            payload: serviceForm,
                            firebaseToken,
                            create: true,
                        };
                        fetch("/api/stories/add-stories", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(payload),
                        })
                            .then((response) =>
                                response
                                    .json()
                                    .then((data: ResponseParams) => {
                                        const { error, msg } = data;
                                        if (error) {
                                            errorLogger(msg, msg);
                                        } else {
                                            setBackendMsg("");
                                            setLoading(false);
                                            handleButtonClose();
                                            getStories(firebaseToken)
                                        }
                                    })
                                    .catch((error) =>
                                        errorLogger(error, "Unable to Parse Info. Please try again")
                                    )
                            )
                            .catch((error) =>
                                errorLogger(error, "Unable to Upload Info. Please try again!")
                            );
                    })
                    .catch((error) => errorLogger(error, "Error Uploading Image"));
            }
        } else {
            errorLogger("Failed", "Error Uploading Image");
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                }}
            >
                <Button onClick={handleButtonClose}>
                    <CloseRoundedIcon/>
                </Button>
                <Typography variant="subtitle1">Add to Story</Typography>
                {!saveVideo ? (
                    <Button
                        onClick={() => {
                            setSaveVideo(true);
                        }}
                    >
                        Next
                    </Button>
                ) : (
                    <Button onClick={saveVideoStory}>Save</Button>
                )}
            </Box>
            {!saveVideo ? (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            minWidth: "100%",
                            width: 500,
                            height: 200,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <video
                            ref={videoRef}
                            autoPlay={false}
                            controls
                            muted
                            height={200}
                            width={400}
                            src={convertedVideo?.preview?.length !== 0 ? convertedVideo?.preview : file?.preview}
                        />
                    </Box>
                </>
            ) : (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            width: "auto",
                            gap: 2,
                        }}
                    >
                        <video
                            autoPlay
                            controls
                            muted
                            height={310}
                            width={200}
                            src={file.preview}
                        />
                        <Box>
                            <TextField
                                multiline
                                id="caption"
                                minRows={12}
                                value={textContent}
                                onChange={(e) => setTextContent(e.target.value)}
                                fullWidth
                                label="Caption"
                                variant="outlined"
                            />
                        </Box>
                    </Box>
                </>
            )}
            {(loading || backendMsg) && (
                <Typography variant={"h6"} sx={{ textAlign: "center" }}>
                    Loading, please wait...
                </Typography>
            )}
        </>
    );
};

export default VideoStoryComponent;
