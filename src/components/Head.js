import React, { useEffect, useState, useCallback } from 'react'
import { toggleMenu } from '../utils/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { cacheResults } from '../utils/searchSlice';
import { useNavigate } from 'react-router-dom';

const Head = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate()
    const searchCache = useSelector(store => store.search);
    const dispatch = useDispatch();


    const getSearchSuggestions = useCallback(async () => {
      if (searchQuery.trim()) {
        const response = await fetch(`http://localhost:5000/api/search?q=${searchQuery}`);
        const data = await response.json();
        // console.log(data[1]);
        setSuggestions(data[1]);
        dispatch(cacheResults({[searchQuery]: data[1]}));
      }
    }, [searchQuery, dispatch])


    useEffect(()=> {
      // API call
      const timer = setTimeout(() => {
          if(searchCache[searchQuery]){
            setSuggestions(searchCache[searchQuery]);
          } else {
            getSearchSuggestions();
          }      
      
      }, 200)
      // make an api call after every key press
      // but if the difference betweem 2 API calls is <200ms
      // decline the API call
      return () => {
        clearTimeout(timer);
      }
    }, [searchQuery, getSearchSuggestions,searchCache ]);

    

    const handleSearchClick = () => {
      if (searchQuery.trim()) {
        navigate(`/search/${searchQuery}`);  // Navigate to search page
      }
    };

    // Function to handle the suggestion click
    const handleSuggestionClick = (suggestion) => {
      setSearchQuery(suggestion);  // Set the search query to the clicked suggestion
      navigate(`/search/${suggestion}`);  // Navigate to the search page
    };


    const toggleHamburger = ()=> {
        dispatch(toggleMenu());
    }
  return (
    <div className='grid grid-flow-col shadow-md h-16 fixed top-0 left-0 w-screen bg-white z-10'>
      <div className='flex px-3 py-2 col-span-1 gap-3 items-center'>
        <img onClick={() => toggleHamburger()} className='h-8 cursor-pointer' src="https://cdn.iconscout.com/icon/free/png-256/free-hamburger-menu-icon-download-in-svg-png-gif-file-formats--crispy-user-interface-pack-icons-462145.png?f=webp&w=256" alt="menu" />
        <a href="/"><img className='h-6 cursor-pointer' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png" alt="logo" /></a>
      </div>
      <div className='col-span-10 py-3 ml-60'>
        <div>
            <input onBlur={() => setTimeout(() => setShowSuggestions(false), 300)} onFocus={() => setShowSuggestions(true)} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-1/2 border p-2 border-gray-400 rounded-l-full' type="text" />
            <button onClick={handleSearchClick} className='border hover:bg-gray-200 border-gray-400 pb-[12px] px-3 pt-1 rounded-r-full cursor-pointer'><img className='h-5' src="/search.png" alt="Search" /></button>
        </div>
        {showSuggestions && <div className='fixed bg-white py-2 px-2 w-[30.4rem] shadow-md rounded-lg border border-gray-100'>
          <ul>
            {suggestions.map(s=> <li onClick={() => handleSuggestionClick(s)} key={s} className='py-2 px-3 shadow-sm hover:bg-gray-100'>🔍 {s}</li>)}
           
          </ul>
        </div>}
      </div>
      <div className='col-span-1 py-3'>
        <img className='h-8 cursor-pointer -mr-6' src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="user" />
      </div>
    </div>
  )
}

export default Head
