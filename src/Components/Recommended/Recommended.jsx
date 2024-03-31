import React, { useState, useEffect } from 'react';
import './Recommended.css';
import { API_KEY, value_converter } from '../../data'; 

const Recommended = ({ categoryId }) => { 

  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`; // Use categoryId instead of category
    try {
      const response = await fetch(relatedVideoUrl);
      const data = await response.json();
      setApiData(data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]); 

  return (
    <div className='recommended'>
      {apiData.map((item, index) => (
        <a href={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list"> 
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className='vid-info'>
            <h4> {item.snippet.title}</h4>
            <p> {item.snippet.channelTitle}</p>
            <p> {value_converter(item.statistics.viewCount)} Views</p>
          </div>
        </a> 
      ))}
    </div>
  );
};

export default Recommended;
