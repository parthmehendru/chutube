// import React, { useEffect, useState } from 'react'
// import { YOUTUBE_VIDEOS_API } from '../utils/constants'
// import VideoCard from './VideoCard';
// import { Link } from 'react-router-dom';
// import { AdVideoCard } from './VideoCard';
// import ShimmerCard from './ShimmerCard';

// const VideoContainer = () => {

//     const AdCard = AdVideoCard(VideoCard);

//     const [videos, setVideos] = useState([]);
//     const getVideos = async ()=> {
//         const response = await fetch(YOUTUBE_VIDEOS_API);
//         const data = await response.json();
//         console.log(data);
//         setVideos(data.items);
//     }
//     useEffect(()=> {
//         getVideos();
//     }, [])
//     if (videos.length === 0) {
//       // Display shimmer placeholders when videos are still loading
//       return (
//         <div className='flex flex-wrap pl-1'>
//           {Array(10).fill("").map((_, index) => (
//             <ShimmerCard key={index} />
//           ))}
//         </div>
//       );
//     }
//   return (
//     <div className='flex flex-wrap pl-1'>
//        {videos.map(video => {
//             const { viewCount, likeCount, favoriteCount, commentCount } = video.statistics;

//             // Check if it's an ad by using statistics: views > 0 and all others (like, favorite, comments) are 0
//             const isAd = viewCount > 0 && likeCount === "0" && favoriteCount === "0" && commentCount === "0";

//             return (
//                 <Link key={video.id} to={"/watch?v=" + video.id}>
//                     {isAd ? <AdCard info={video} /> : <VideoCard info={video} />}
//                 </Link>
//             );
//         })}
//     </div>
//   )
// };



// export default VideoContainer

import React, { useEffect, useState, useCallback } from 'react';
import { YOUTUBE_VIDEOS_API } from '../utils/constants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import { AdVideoCard } from './VideoCard';

const VideoContainer = () => {
    const AdCard = AdVideoCard(VideoCard);
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loading, setLoading] = useState(false);

    const getVideos = async (pageToken = '') => {
        setLoading(true);
        const response = await fetch(`${YOUTUBE_VIDEOS_API}&pageToken=${pageToken}`);
        const data = await response.json();
        setVideos((prevVideos) => [...prevVideos, ...data.items]);
        setNextPageToken(data.nextPageToken);
        setLoading(false);
    };

    useEffect(() => {
        getVideos(); // Initial fetch
    }, []);

    // Fetch more videos when scrolling to the bottom
    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight) {
            if (nextPageToken && !loading) {
                getVideos(nextPageToken);
            }
        }
    }, [nextPageToken, loading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);


    return (
        <div className='flex flex-wrap pl-1'>
            {videos.length>0 && videos.map(video => {
                const { viewCount, likeCount, favoriteCount, commentCount } = video.statistics;

                // Check if it's an ad by using statistics: views > 0 and all others (like, favorite, comments) are 0
                const isAd = viewCount > 0 && likeCount === "0" && favoriteCount === "0" && commentCount === "0";

                return (
                    <Link key={video.id} to={"/watch?v=" + video.id}>
                        {isAd ? <AdCard info={video} /> : <VideoCard info={video} />}
                    </Link>
                );
            })}
        </div>
    );
};

export default VideoContainer;

