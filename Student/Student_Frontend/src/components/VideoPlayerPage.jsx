// VideoPlayerPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const VideoPlayerPage = () => {
  const { videoId } = useParams();

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <iframe
        width="100%" height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayerPage;
