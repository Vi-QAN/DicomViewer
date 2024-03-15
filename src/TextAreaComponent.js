import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import { TextareaAutosize } from '@mui/material';

// Custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
  textarea: {
    fontFamily: 'IBM Plex Sans, sans-serif',
    borderRadius: 1,
    padding: '12px',
    width: '90%', // Adjust width as needed
    resize: 'none', // Prevent textarea from being resizable
    border: '1px solid #ccc', // Add border to the textarea
    '&:hover' : {
        borderColor: theme.palette.primary.main,
    },
    '&:focus': {
      outline: 'none', // Remove default focus outline
      borderColor: theme.palette.primary.main, // Change border color on focus
    },
    margin: '10px 0px 10px 0px',
    borderRadius: '5px 5px 5px 5px'
  },
}));

// Component
const CustomTextArea = () => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [pressTimer, setPressTimer] = useState(null);

  const handleMouseDown = () => {
    const timer = setTimeout(() => {
      console.log('Long press detected');
      // Handle your long press event here
    }, 1000); // Adjust the duration of the long press as needed (in milliseconds)
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
  };

  return (
    <>
        <TextareaAutosize
            className={classes.textarea}
            aria-label="textarea"
            placeholder="Enter your text here"
            minRows={1} // Specify the minimum number of rows
            maxRows={1} // Specify the maximum number of rows (optional)
            onChange={(e) => setValue(e.target.value)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
        />
    </>
  );
};

export default CustomTextArea;
