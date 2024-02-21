import React, { useState } from 'react';
import './Lectures.css'; // Import CSS file for styling
import chapters from '../components/chapters' // Import chapter data

const NewHome = () => {
    const [currentVideoId, setCurrentVideoId] = useState(chapters[0].videoId);

    const handleChapterClick = (videoId) => {
        setCurrentVideoId(videoId);
    };

    return (
        <div className="home-container">
            <div className="left-section">
                <div className="video-wrapper">
                    <iframe
                        title="YouTube Video"
                        src={`https://www.youtube.com/embed/${currentVideoId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="w-full h-full"
                    ></iframe>
                </div>
            </div>

            {/* Right Section (35%) */}
            <div className="right-section">
                {/* Chapters */}
                <div className="chapter-list">
                    <h2>Chapters</h2>
                    <ul>
                        {chapters.map((chapter, index) => (
                            <li key={index}>
                                <button onClick={() => handleChapterClick(chapter.videoId)}>
                                    {chapter.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NewHome;