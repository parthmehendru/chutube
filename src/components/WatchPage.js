import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import { GOOGLE_API_KEY } from '../utils/constants';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';

const WatchPage = () => {
    const [searchParams] = useSearchParams();
    const [videoData, setVideoData] = useState(null);
    const [isLike, setisLike] = useState(false);
    // const [comments, setComments] = useState([]);
    const [subscriberCount, setSubscriberCount] = useState(0);
    const [isLive, setIsLive] = useState(false);
    const [liveDetails, setLiveDetails] = useState(null);

    const toggleLike = ()=>{
        setisLike(!isLike);
    }

    const fetchSubscriberCount = async (channelId) => {
        const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${GOOGLE_API_KEY}`;
        
        try {
          const response = await fetch(url);
          const data = await response.json();
          setSubscriberCount(data.items[0].statistics.subscriberCount);
        } catch (error) {
          console.error('Error fetching subscriber count:', error);
        }
      };
          
    const fetchVideoData = useCallback(async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=id,snippet,statistics&id=${searchParams.get("v")}&key=${GOOGLE_API_KEY}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // console.log(data);
            setVideoData(data.items[0]);

            setIsLive(data.items[0].snippet.liveBroadcastContent === 'live');

        } catch (error) {
            console.error('Failed to fetch video data:', error);
        }
    }, [searchParams]); 

    const fetchLiveVideoDetails = async (videoId) => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${GOOGLE_API_KEY}`
          );
          const data = await response.json();
          if (data.items && data.items.length > 0) {
            const liveStreamingDetails = data.items[0].liveStreamingDetails;
            setLiveDetails(liveStreamingDetails); // Store the live streaming details
          } else {
            throw new Error('No liveStreamingDetails found');
          }
        } catch (error) {
          console.error('Failed to fetch live video details:', error);
        }
      };
    
    // const fetchComments = useCallback(async () => {
    //     try {
    //         const videoId = searchParams.get("v");
    //         const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${GOOGLE_API_KEY}`);
    //         if (!response.ok) throw new Error('Network response was not ok');
    //         const data = await response.json();
    //         // console.log(data);
    //         setComments(data.items);
    //     } catch (error) {
    //         console.error('Failed to fetch comments:', error);
    //     }
    // }, [searchParams]);

    const dispatch = useDispatch();
    const isMenuOpen = useSelector(store => store.app.isMenuOpen);
    useEffect(()=> {
        dispatch(closeMenu());
        fetchVideoData();
        // fetchComments();
    }, [dispatch, fetchVideoData])

    useEffect(() => {
        if (isLive && videoData) {
          fetchLiveVideoDetails(videoData.id);
        }
      }, [isLive, videoData]);

    useEffect(() => {
        if (videoData && videoData.snippet && videoData.snippet.channelId) {
            fetchSubscriberCount(videoData.snippet.channelId);
        }
    }, [videoData]);
  return (
    <div style={{
        width: isMenuOpen ? 'calc(100vw - 210px)' : '100vw',
        transition: 'all 0.3s ease-in-out',
        marginLeft: isMenuOpen ? '13rem' : '1rem',
      }} className='overflow-hidden'>
        <div className='flex'>
            <div>
                <iframe width="1100" height="500" src={"https://www.youtube.com/embed/"+searchParams.get("v")+"?autoplay=1"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div>
                <LiveChat isLive={isLive}  activeLiveChatId={liveDetails?.activeLiveChatId}/>
            </div>
        </div>
        
      {videoData &&  {/*comments.length */} && (
                <div className='w-[1100px]'>
                    <h2 className='font-bold text-xl mt-2 mb-4'>{videoData.snippet.localized.title}</h2>
                    <div className='flex w-5/6 justify-between items-center'>
                        <div className='flex flex-col'>
                            <p className='font-semibold text-lg'>{videoData.snippet.channelTitle}</p>
                            <p className='text-gray-500 text-sm'>{subscriberCount} subscribers</p>
                        </div>
                        <button className='bg-black text-white text-sm rounded-full px-4 py-2'>Subscribe</button>
                        <p onClick={toggleLike} className='bg-gray-300 cursor-pointer p-2 rounded-full'>{isLike ? <><i className="fa-solid fa-thumbs-up"></i><span className='pl-2'>{Number.parseInt(videoData.statistics.likeCount)+1}</span></> : <><i className="fa-regular fa-thumbs-up"></i><span className='pl-2'>{videoData.statistics.likeCount}</span></>}</p>
                    </div>
                    <div className='flex gap-4 mt-5 font-semibold'>
                        <p>{videoData.statistics.viewCount} views</p>
                        <p>{new Date(videoData.snippet.publishedAt).toLocaleDateString()}</p>
                    </div>
                    <p className='mt-3 bg-gray-200 py-4 px-2 mb-5'>{videoData.snippet.description}</p>
                     <div className=''>
                        <span className='font-bold text-xl'>Comments</span>
                        <span className='ml-6 font-bold text-xl'>({videoData.statistics.commentCount})</span>
                        <div className='pl-3 mt-6'>
                            {/* {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div className='flex flex-col my-6' key={comment.id}>
                                        <p className='text-sm py-1'>{comment.snippet.topLevelComment.snippet.authorDisplayName}</p> 
                                        <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No comments available.</p>
                            )} */}
                            <CommentsContainer />
                        </div>
                        
                     </div>
                </div>
            )}
             
    </div>
  )
}

export default WatchPage
