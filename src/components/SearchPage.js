import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { YOUTUBE_SEARCH_API, YOUTUBE_LIVE_API } from '../utils/constants';
import { useSelector } from 'react-redux';

const SearchPage = () => {
    const navigate = useNavigate();
  const { query } = useParams();  // Get the search query from the URL
  const [searchResults, setSearchResults] = useState([]);
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);
  const location = useLocation();

  useEffect(() => {
    const fetchSearchResults = async () => {
      const isLiveRoute = location.pathname === '/search/live';
      const apiUrl = isLiveRoute
        ? `${YOUTUBE_LIVE_API}` // API URL for live videos
        : `${YOUTUBE_SEARCH_API}&q=${query}`; // Regular search API

      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      setSearchResults(data.items);
    };

    fetchSearchResults();

  }, [query, location]);

  const handleVideoClick = (videoId) => {
    navigate(`/watch?v=${videoId}`); // Navigate to the WatchPage with the video ID
  };

  
  return (
    <div style={{
        width: isMenuOpen ? 'calc(100vw - 210px)' : '100vw',
        transition: 'all 0.3s ease-in-out',
        marginLeft: isMenuOpen ? '12rem' : '0',
      }} className='overflow-hidden p-4'>
      <h2 className='text-center text-2xl font-bold my-4'>Search Results for "{query}"</h2>
      <div className='flex flex-col space-y-1'>
        {searchResults.length>0 && searchResults.map((result) => (
          <div  onClick={() => handleVideoClick(result.id.videoId)} className='flex bg-white shadow-md rounded-md mb-2 overflow-hidden' key={result.id.videoId}>
            <img src={result.snippet.thumbnails.medium.url} alt={result.snippet.title} />
            <div className='p-2 flex flex-col justify-between'>
              <h3 className='text-lg font-semibold'>{result.snippet.title}</h3>
              <p className='text-gray-600 text-sm'>{result.snippet.description}</p>
              <p className='text-gray-500 text-xs'>Channel: {result.snippet.channelTitle}</p>
              <p className='text-gray-500 text-xs'>Published on: {new Date(result.snippet.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
