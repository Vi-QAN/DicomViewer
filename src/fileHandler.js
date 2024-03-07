
import fetch from 'node-fetch'

const baseUrl = `${process.env.REACT_APP_SERVER_ENDPOINT}/api`;

const headers = {
    "Content-type": "application/json",
    "ngrok-skip-browser-warning" : "0"
};

export const getRegularFile = async (fileHash, owner, accessor) => {
    if (!owner || !accessor) return; 
    const response =  await getEncryptedFile(fileHash, owner, accessor)
    
    // Parse content disposition header to get the file name
    const contentDisposition = response.headers.get('Content-Disposition');
    const fileName = contentDisposition
        ? contentDisposition.split('filename=')[1].trim()
        : new URL(response.url).searchParams.get('fileName') || 'downloadedFile.txt';

    // Create a new Blob from the response's body
    const blob = await response.blob();

    return { blob, fileName }
}

const getEncryptedFile = async (fileHash, owner, accessor) => {
    const queryParams = new URLSearchParams();
    queryParams.append("owner", owner);
    queryParams.append("accessor", accessor);

    const url = `${baseUrl}/file/download/${fileHash}?${queryParams.toString()}`
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        }).catch(err => console.log(err));
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response;

        
    } catch (err) {
        console.log(err)
    }
}