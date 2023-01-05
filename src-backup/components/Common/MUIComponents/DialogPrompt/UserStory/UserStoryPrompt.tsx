import { Box, Button, Dialog, DialogContent, Divider, Typography, } from '@mui/material';
import classes from '../EditProfile/Modifiables/Events.module.scss';
import BackupIcon from '@mui/icons-material/Backup';
import WarningIcon from '@mui/icons-material/Warning';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import ImageStoryComponent from './ImageStory/ImageStory';
import VideoStoryComponent from './VideoStory/VideoStory';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export interface AddStoryFrontend {
    imageUri?: string;
}

const initialAddStoryForm: AddStoryFrontend = {
    imageUri: '',
};

const UserStoryPrompt = (props: any) => {
    const {
        userStoryPromptOpen,
        setUserStoryPromptOpen,
        handleUserStoryPromptOpen,
        handleUserStoryPromptClose,
        getStories
    } = props;

    const [serviceForm, setServiceForm] =
        useState<AddStoryFrontend>(initialAddStoryForm);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [error, setError] = useState(false);
    const [file, setFile] = useState<any>({
        preview: serviceForm.imageUri ?? '/loading.png',
    });

    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        if (fileRejections.length > 0) {
            setError(true);
            setFileUploaded(true);
        } else {
            setError(false);
            setFileUploaded(false);
        }
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setFile({
                file: file,
                preview: URL.createObjectURL(file),
            });
            setFileUploaded(true);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: false,
        maxSize: file?.file?.type == 'image/*' ? 10000000 : 100000000, //10MB
        accept: ['image/*', 'video/mp4'],
        onDrop,
    });

    return (
        <Dialog
            maxWidth={'md'}
            disableEscapeKeyDown
            open={userStoryPromptOpen}
            onClose={handleUserStoryPromptClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogContent>
                {file?.preview?.length === 0 &&
                    <>
                    <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ textAlign: 'center', mx: 'auto' }}>
                        Add to Story
                    </Typography>
                    <CloseRoundedIcon
                        sx={{ cursor: 'pointer', float: 'right' }}
                        onClick={handleUserStoryPromptClose}
                    />
                </Box>
                <Divider sx={{ mt: 1, mb: 2 }}/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: 5,
                    }}
                    {...getRootProps()}
                    className={[classes.DisplayImage, classes.TopSectionCommon].join(' ')}
                >
                    <>
                        <input {...getInputProps()} />
                        {!fileUploaded ? (
                            <Box className={classes.UploadContainer}>
                                <BackupIcon className={classes.UploadIcon}/>
                                <label className={classes.UploadIcon_Text}>
                                    Click or Drop to Upload Image
                                </label>
                            </Box>
                        ) : (
                            error && (
                                <div className={classes.UploadContainer}>
                                    <WarningIcon className={classes.UploadIcon_warning}/>
                                    <label className={classes.UploadIcon_Text_warning}>
                                        Only Image Files upto 10MBs are allowed!
                                    </label>
                                </div>
                            )
                        )}
                        <Box
                            sx={{
                                display:'flex',
                                justifyContent:'center',
                                mt:1,
                                textAlign:'center',
                            }}
                        >
                        <Button
                            variant='contained'
                            sx={{
                                display: { xs: 'none', lg: 'block' },
                                background: '#FFFF00',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: '#e6e600'
                                }
                            }}
                        >
                            Select from Computer
                        </Button>
                            <Button
                                variant='contained'
                                sx={{
                                    display: { xs: 'block', lg: 'none' },
                                    background: '#FFFF00',
                                    color: 'black',
                                    '&:hover': {
                                        backgroundColor: '#e6e600'
                                    }
                                }}
                            >
                                Select from Gallery
                            </Button>
                        </Box>
                    </>
                </Box>
                    </>}
                {file?.file?.type?.split('/')[0] === 'image' && (
                    <ImageStoryComponent
                        setFileUploaded={setFileUploaded}
                        setFile={setFile}
                        handleUserStoryPromptClose={handleUserStoryPromptClose}
                        file={file}
                        getStories={getStories}
                    />
                )}
                {file?.file?.type?.split('/')[0] === 'video' && (
                    <VideoStoryComponent
                        setFileUploaded={setFileUploaded}
                        setFile={setFile}
                        handleUserStoryPromptClose={handleUserStoryPromptClose}
                        file={file}
                        getStories={getStories}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UserStoryPrompt;
