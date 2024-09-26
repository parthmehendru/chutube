import React from 'react'
import { useSelector } from 'react-redux';

const VideoCard = ({info}) => {
    const isMenuOpen = useSelector(store => store.app.isMenuOpen);
    const timeAgo = (publishedDate) => {
        const now = new Date();
        const published = new Date(publishedDate);
        const diffInMs = now - published;
        const diffInSeconds = Math.floor(diffInMs / 1000);
        
        // Calculate years, months, weeks, days
        const secondsInYear = 60 * 60 * 24 * 365;
        const secondsInMonth = 60 * 60 * 24 * 30;
        const secondsInWeek = 60 * 60 * 24 * 7;
        const secondsInDay = 60 * 60 * 24;
        
        if (diffInSeconds >= secondsInYear) {
          const years = Math.floor(diffInSeconds / secondsInYear);
          return `${years} year${years > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds >= secondsInMonth) {
          const months = Math.floor(diffInSeconds / secondsInMonth);
          return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds >= secondsInWeek) {
          const weeks = Math.floor(diffInSeconds / secondsInWeek);
          return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds >= secondsInDay) {
          const days = Math.floor(diffInSeconds / secondsInDay);
          return `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
          return 'Today';
        }
      };
      

    const { snippet, statistics } = info;
    const { channelTitle, title, thumbnails, publishedAt } = snippet;
  return (
    <div className={`px-2 py-1 mx-1 my-3 ${isMenuOpen ? 'w-80' : 'w-72'} h-[295px] shadow-md cursor-pointer`}>
      <img className='rounded-lg' src={thumbnails.medium.url} alt="thumbnail" />
      <ul className='mt-1'>
        <li style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            maxHeight:'57px'
          }} className='font-bold py-2 text-lg leading-tight overflow-hidden text-ellipsis line-clamp-2'>{title}</li>
        <li className='text-gray-600'>{channelTitle}</li>
        <li className='text-gray-600'>{statistics.viewCount} views • {timeAgo(publishedAt)}</li>
      </ul>
    </div>
  )
}

export const AdVideoCard = (VideoCard) => {
   return ({info}) => {
    return (
      <div className='border-2  border-red-600'>
        <VideoCard info={info}/>
      </div>
    )
   }
}

export default VideoCard
