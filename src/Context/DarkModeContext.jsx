import React, { createContext, useEffect, useState } from 'react'

export let DarkModeContextAPI = createContext();
const DarkModeContext = ({children}) => {

    let [DarkMode , setDarkMode] = useState(true);
    useEffect(()=>{
      const favicon = document.getElementById('favicon');
      const status_bar_theme = document.getElementById('status-bar-theme')
      if(status_bar_theme)
      {
        status_bar_theme.content = DarkMode?'#000000':'#FFFFFF';
      }
      if(favicon)
      {
        favicon.href = DarkMode?'/logo-dark-icon.png':'/logo-light-icon.png';
      }
    },[DarkMode])
    
  return (
    <DarkModeContextAPI.Provider value={{DarkMode,setDarkMode}}>
        {children}
    </DarkModeContextAPI.Provider>
  )
}

export default DarkModeContext