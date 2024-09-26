import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { findNthPrime } from '../utils/helper';
import { useMemo } from 'react';

const Demo = () => {
    const [text, setText] = useState(0);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const isMenuOpen = useSelector(store => store.app.isMenuOpen);


    const prime = useMemo(()=> {
        console.log("Calculate Prime Number of ", text)
        return findNthPrime(text)
    }, [text])
  return (
    <div style={{
        width: isMenuOpen ? 'calc(100vw - 210px)' : '100vw',
        transition: 'all 0.3s ease-in-out',
        marginLeft: isMenuOpen ? '12rem' : '0',
      }} className={`p-2 m-4 h-96 border border-black ${isDarkTheme ? 'bg-black text-white' : 'bg-white'}`}>
      <div>
        <input className={`border border-black w-72 px-2 py-1 ${isDarkTheme ? 'text-black': 'text-black'}`} type="number" value={text} onChange={(e) => setText(e.target.value)} />

      </div>
      <div>
        <h1 className='mt-4 font-bold text-xl'>nth Prime : {prime} </h1>
      </div>
      <button onClick={()=> setIsDarkTheme(!isDarkTheme)}>Click</button>
    </div>
  )
}

export default Demo
