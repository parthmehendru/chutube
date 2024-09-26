import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, clearMessages } from '../utils/chatSlice'
import { generate, generateRandomText } from '../utils/helper'
import { GOOGLE_API_KEY } from '../utils/constants'

const LiveChat = ({ isLive, activeLiveChatId  }) => {
    
    const dispatch = useDispatch();
    const [liveMessage, setLiveMessage] = useState("");
    const chatMessages = useSelector(store => store.chat.messages);

    useEffect(() => {
       
            // Clear messages when a new video is loaded
            dispatch(clearMessages());
    }, [activeLiveChatId, isLive, dispatch]);

    useEffect(() => {
        if (!isLive) {
            const intervalId = setInterval(() => {
                // Simulate random chat
                dispatch(addMessage({ name: generate(), message: generateRandomText(10) }));
            }, 1500);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [isLive, dispatch]);

    useEffect(() => {
        if (isLive) {
            const fetchLiveChat = async () => {
                try {
                    const response = await fetch(`https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${activeLiveChatId}&part=snippet,authorDetails&key=${GOOGLE_API_KEY}`);
                    const data = await response.json();
                    data.items.forEach(item => {
                        dispatch(addMessage({
                            name: item.authorDetails.displayName,
                            message: item.snippet.displayMessage
                        }));
                    });
                } catch (error) {
                    console.error('Failed to fetch live chat:', error);
                }
            };

            const intervalId = setInterval(fetchLiveChat, 2000); // Polling every 2 seconds
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [isLive, activeLiveChatId, dispatch]);


  return (
    <>
        <div className='ml-2 p-2 border w-96 border-cyan-900 h-[500px] bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse'>
            {chatMessages.length> 0 && chatMessages.map((c, index) => <ChatMessage key={index} name={c.name} message={c.message} />)}  
        </div>
        <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(addMessage({name: "Parth Mehendru", message: liveMessage}));
            setLiveMessage("");
        }
        } className='w-96 p-1 ml-2 rounded-md border border-black'>
            <input value={liveMessage} onChange={(e) => setLiveMessage(e.target.value)} placeholder='Enter your message' className='w-[307px] rounded-md p-1 bg-slate-200' type="text" />
            <button className='bg-green-500 px-2 py-1 rounded-lg mx-2'>Send</button>
        </form>
    </>
    
  )
}

export default LiveChat
