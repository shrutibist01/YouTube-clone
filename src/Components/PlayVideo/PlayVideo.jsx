import React, { useState, useEffect } from 'react';
import './PlayVideo.css';
import moment from 'moment';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../../data';
import { value_converter } from '../../data';

const PlayVideo = ({ value_converter, API_KEY }) => {
  const { videoId } = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetailsUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]))
      .catch((error) => console.error('Error fetching video data:', error));
  };

  const fetchOtherData = async () => {
    if (apiData) {
      const channelDataUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      await fetch(channelDataUrl)
        .then((res) => res.json())
        .then((data) => setChannelData(data.items[0]))
        .catch((error) => console.error('Error fetching channel data:', error));

      const commentUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${apiData.snippet.channelId}&key=${API_KEY}`;
      await fetch(commentUrl)
        .then((res) => res.json())
        .then((data) => setCommentData(data.items))
        .catch((error) => console.error('Error fetching comment data:', error));
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className='play-video'>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder={0}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : 'Title Here'}</h3>
      <div className='play-video-info'>
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : '16K'} &bull;{' '}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ''}
        </p>
        <div>
          <span>
            {' '}
            <img src={like} alt='' /> {apiData ? value_converter(apiData.statistics.likeCount) : 155}{' '}
          </span>
          <span>
            {' '}
            <img src={dislike} alt='' /> 5{' '}
          </span>
          <span>
            {' '}
            <img src={share} alt='' /> Shared{' '}
          </span>
          <span>
            {' '}
            <img src={save} alt='' /> Save{' '}
          </span>
        </div>
      </div>
      <hr />
      <div className='publisher'>
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt='' />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : 'Title here'}</p>
          <span> {channelData ? value_converter(channelData.statistics.subscriberCount) : '1 M'} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className='vid-description'>
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : 'Description here'}</p>
        <hr />
        <h4> {apiData ? value_converter(apiData.statistics.commentCount) : 312}</h4>
        {commentData && commentData.length > 0 ? (
          commentData.map((item, index) => {
            return (
              <div key={index} className='comment'>
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt='' />
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName} <span> 1 day ago</span>
                </h3>
                <p> {item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className='comment-action'>
                  <img src={like} alt='' />
                  <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt='' />
                </div>
              </div>
            );
          })
        ) : (
          <p>No comments available</p>
        )}
      </div>
    </div>
  );
};

export default PlayVideo;
