export const GOOGLE_API_KEY = "AIzaSyBOdYLyEJs-AXnisKwO2W7LKrywhjOHfl0"

export const OFFSET_LIVE_CHAT = 50;

export const YOUTUBE_VIDEOS_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_SEARCH_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_LIVE_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&maxResults=20&key=${GOOGLE_API_KEY}`
