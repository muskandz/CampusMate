import React, { useState } from 'react';
import axios from 'axios';

const UploadNotes = () => {
    const [title, setTitle]  = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [uploader, setUploader] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!title || !subjectCode || !uploader || !file) {
            alert('All fields are required!');
            return;
        }

        //form data object to send data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subject_code', subjectCode);
        formData.append('uploader', uploader);
        formData.append('file', file);

        //send data to backend
        axios.post('/notes/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            alert(response.data.message);
            setTitle('');
            setSubjectCode('');
            setUploader('');
            setFile(null);
        })
        .catch((error) => {
            console.error('Error uploading notes: ', error);
            alert('Failed to upload note.');
        });
    };

    return (
        <div>
            <h2>Upload Notes</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title: </label>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Uploader: </label>
                    <select value={uploader} onChange={(e) => setUploader(e.target.value)} required>
                        <option value="">Select Uploader</option>
                        <option value="University">University</option>
                        <option value="College">College</option>
                    </select>
                </div>
                <div>
                    <label>PDF File: </label>
                    <input 
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadNotes;