import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Notes.module.css';
import { FaRegFilePdf } from 'react-icons/fa';

const Notes = ({ rollNumber }) => {
    const [profile, setProfile] = useState({});
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [uploadedBy, setUploadedBy] = useState('');
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/students/${rollNumber}/profile`)
            .then((response) => {
                console.log('Profile data:', response.data);
                setProfile(response.data.profile);
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });
    }, [rollNumber]);

    useEffect(() => {
        if (profile.semester && profile.course && profile.specialization) {
            axios.get('http://localhost:5000/notes/subjects', {
                params: {
                    semester: profile.semester,
                    course: profile.course,
                    specialization: profile.specialization,
                },
            })
            .then((response) => {
                console.log('Subjects data:', response.data);
                setSubjects(response.data);
            })
            .catch((error) => {
                console.error('Error fetching subjects:', error);
            });
        }
    }, [profile]);

    const fetchNotes = (subjectCode) => {
        if (subjectCode && uploadedBy) {
            axios.get('http://localhost:5000/notes/fetch', {
                params: { subject_code: subjectCode, uploadedBy },
            })
            .then((response) => {
                console.log('Notes data:', response.data);
                setSelectedSubject(subjectCode);
                setNotes(response.data.notes);
            })
            .catch((error) => {
                console.error('Error fetching notes:', error);
            });
        } else {
            alert('Please select "Uploaded By" to fetch notes.');
        }
    };

    const handleUploadedByChange = (event) => {
        setUploadedBy(event.target.value);
        setNotes([]);
    };

    return (
        <div className={styles.notesPage}>
            <h2>Notes</h2>
            <div className={styles.filters}>
                <label htmlFor="uploadedBy">Uploaded By:</label>
                <select id="uploadedBy" value={uploadedBy} onChange={handleUploadedByChange} className={styles.dropdown}>
                    <option value="">--Select--</option>
                    <option value="University">University</option>
                    <option value="College">College</option>
                </select>
            </div>
            <div className={styles.subjectCards}>
                {subjects.map((subject) => (
                    <div
                        key={subject.code}
                        className={`${styles.subjectCard} ${selectedSubject === subject.code ? styles.selected : ''}`}
                        onClick={() => fetchNotes(subject.code)}
                    >
                        <h3>{subject.code}</h3>
                        <p>{subject.name}</p>
                    </div>
                ))}
            </div>
            <div className={styles.notesSection}>
                {notes.length > 0 ? (
                    <ul className={styles.notesList}>
                        {notes.map((note) => (
                            <li key={note.id} className={styles.noteItem}>
                                <div className={styles.noteHeader}>
                                    <FaRegFilePdf size={20} className={styles.noteIcon} />
                                    <p className={styles.noteTitle}>{note.title}</p>
                                </div>
                                <p>
                                    <strong>Uploaded By:</strong> {note.uploadedBy}
                                </p>
                                <a
                                    href={`data:application/pdf;base64,${note.fileContent}`}
                                    download={`${note.title}.pdf`}
                                    className={styles.downloadLink}
                                >
                                    Download
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.noNotes}>No notes available for the selected subject and type.</p>
                )}
            </div>
        </div>
    );
};

export default Notes;
