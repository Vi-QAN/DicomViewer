import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';

import './App.css';
import DwvComponent from './DwvComponent';

import { getRegularFile } from './fileHandler';



export default function App() {
  const [ file, setFile ] = useState(null);
  const [ url, setUrl ] = useState(null);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = createTheme({
      typography: {
        useNextVariants: true,
      },
      palette: {
        primary: {
          main: indigo[500]
        },
        secondary: {
          main: pink[500]
        },
        mode: prefersDarkMode ? 'dark' : 'light',
      }
    });
    const searchParams = new URLSearchParams(document.location.search)
    
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
        <div className="App">
          {file && <DwvComponent file={file}/>}
          {url && <iframe src={url} width="100%" height="100%"></iframe>}

        </div>
      </ThemeProvider>
    );
}
