import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { ToggleButton } from '@mui/material';
import {makeStyles} from '@mui/styles';


import CustomTextArea from './TextAreaComponent';
import SendIcon from '@mui/icons-material/Send';

// Custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.3)',
        borderRadius: 1,
        backgroundColor: 'none',
        borderRadius: '10px',
    },
    innerContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        padding: '25px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    textAreaContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        width: '15%',
        height: '41px',
        margin: '10px 0px 0px 10px',
        '&:hover' : {
            borderColor: theme.palette.primary.main,
        },
        '&:focus': {
            outline: 'none', // Remove default focus outline
            borderColor: theme.palette.primary.main, // Change border color on focus
          },
    }

  }));

export default function NoteModal({open, handleClose}){
    const classes = useStyles();

    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
                className={classes.container}
            >
                <Box className={classes.innerContainer}>
                    <Box>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        {/* <img width={'500px'} src={image} alt={'Screenshot'} /> */}

                    </Box>
                    <Box>
                        
                        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                    <Box className={classes.textAreaContainer}>
                        <CustomTextArea />
                        <ToggleButton 
                            className={classes.button}
                            size="small"
                            value="Send"
                            title="Send"
                        ><SendIcon /></ToggleButton>
                        
                    </Box>
                </Box>
                
            </Modal>
        </div>)
}