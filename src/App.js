import React, { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';
import Button from '@mui/material/Button';

import './App.css';
import DwvComponent from './DwvComponent';

import { getRegularFile } from './fileHandler';

import { useScreenshot } from 'use-react-screenshot'

import NoteModal from './NoteModal';

function DocumentViewer(){
  return (
    <div className="App" >
      <div className='container'>
        <iframe className='responsive-iframe' src={url} width="100%" height="100%"></iframe> 
      </div>
    </div>
  )
}

export default function App() {
    const [ file, setFile ] = useState(null);
    const [ url, setUrl ] = useState(null);
    const [ windowLevelState, setWindowLevelState ] = useState(null)
    const [ drawings, setDrawings ] = useState(null);
    const [open, setOpen] = useState(false);

    const ref = useRef(null)
    const [image, takeScreenshot] = useScreenshot()
    const getImage = () => takeScreenshot(ref.current)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = createTheme({
      typography: {
        useNextVariants: true,
      },
      palette: {
        primary: {
          main: "#254ec1",
          navy: '#070f25',
          gray: "#2c3144",
          lighterNavy: "#becdf3",
          whiteNavy: "#eaeefb",
          middle: "#254ec1"
        },
        secondary: {
          main: "#becdf3"
        },
        mode: prefersDarkMode ? 'dark' : 'light',
      }
    });
    const searchParams = new URLSearchParams(document.location.search)

      /**
     *  Handle window level
     */
    const handleWindowLevelChange = (event) => {
      console.log(event);
      setWindowLevelState(event);
    }

    const handleDrawingsChange = (item) => {
      console.log(item)
      setDrawings(item)
    }

    const styles = {
      button: {
        
      }
    }
    
    const loadData = async () => {
      const fileHash = searchParams.get('fileHash');
      const owner = searchParams.get('owner');
      const accessor = searchParams.get('accessor')
      try {
        const { blob, fileName } = await getRegularFile(fileHash, owner, accessor);  
        const file = new File([blob], fileName, { type: blob.type });
        const fileExtension = fileName.split('\.').pop();
        if (fileExtension === 'dcm'){
          setFile(file);
        } else {
          const reader = new FileReader();
          reader.onloadend = async () => {
              const arrayBuffer = reader.result;
              const uint8ArrayNew = new Uint8Array(arrayBuffer);  
              setPdfContent(uint8ArrayNew)         
          };
          reader.readAsArrayBuffer(blob);

          const fileURL = URL.createObjectURL(blob);
          setUrl(fileURL);

        }
        
      } catch (err) {
        alert(err)
      }
    }

    useEffect(() => {
      loadData();
    }, [])

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" ref={ref} >
          {file && <DwvComponent file={file} 
            windowLevelState={windowLevelState} 
            handleWindowLevelChange={handleWindowLevelChange}
            drawings={drawings}
            handleDrawingsChange={handleDrawingsChange}/>}
          <div>
            <div>
              <button style={{ marginBottom: '10px' }} onClick={getImage}>
                Take screenshot
              </button>
            </div>
            <img width={'500px'} src={image} alt={'Screenshot'} />

          </div>
          <Button onClick={handleOpen}>Open modal</Button>
        </div>
        {url && <DocumentViewer />}
        <NoteModal open={open} handleClose={handleClose}/>
      </ThemeProvider>
    );
}
