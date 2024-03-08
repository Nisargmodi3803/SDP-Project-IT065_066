// VideoPlayerPage.js
import React from 'react';

const VideoPlayerPage = ({ videoId }) => {
    return (
        <div>
            <h2>Video Player</h2>
            <div>
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube Video Player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    );
};

export default VideoPlayerPage;
