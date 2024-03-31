import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './video.css';
import PlayVideo from '../../Components/PlayVideo/PlayVideo';
import Recommended from '../../Components/Recommended/Recommended';

const Video = () => {
  const { videoId, categoryId } = useParams();

  useEffect(() => {
    console.log('Video ID:', videoId);
    console.log('Category ID:', categoryId);
  }, [videoId, categoryId]);

  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId} />
    </div>
  );
};

export default Video;
