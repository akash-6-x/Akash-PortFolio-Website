import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import NavBar from './Pages/NavBar'
import { Outlet } from 'react-router-dom'
import { DarkModeContextAPI } from './Context/DarkModeContext'
import SpinnerContext, { SpinnerContextAPI } from './Context/SpinnerContext'
import Spinner from './utilities/Spinner'
import { MediaQueriesAPI } from './Context/MediaQueries'


const Layout = ()=>{
  return (
    <>
        <SpinnerContext>
          <LayoutContent/>
        </SpinnerContext>
    </>
  )
}

const LayoutContent = () => {
  let {isMobile,isLaptop,isTab,isDesktop,isSmall,isVerySmall} = useContext(MediaQueriesAPI)
  let {DarkMode} = useContext(DarkModeContextAPI)
  let {isSpinner} = useContext(SpinnerContextAPI)
  let [IsVisible,setIsVisible] = useState(true)
  const VisibilityTimeout = 800;

  
  useEffect(()=>{
    setIsVisible(true)
    let timer = setTimeout(()=>{
      setIsVisible(false)
    },VisibilityTimeout)
    return () => clearTimeout(timer);
  },[isDesktop, isLaptop, isMobile, isTab, isSmall, isVerySmall])






  

  return (
    <>
    
      <section className={`w-screen h-screen ease-in-out duration-600 transition-colors ${DarkMode ? 'bg-slate-950' : 'bg-white'} overflow-hidden`}>
          {isSpinner? <Spinner/>:<>
            <header className={`w-full h-[70px] flex border-b-2 duration-400 ease-in-out ${DarkMode?'border-white':'border-black'} ${IsVisible?'invisible':'visible'}`}>
              <NavBar/>
            </header>
            <main className={`flex justify-center items-center relative w-full h-[calc(100dvh-70px)] ${IsVisible?'invisible':'visible'}`}>
              <Outlet/>
              {(isDesktop || isLaptop || isTab ) && <div className={`${isDesktop && 'text-[14px]'} ${isLaptop && 'text-[12px]'} ${isTab && 'text-[10px]'} absolute select-none text-gray-600 bottom-1`}>&copy; Copyright 2025. All Rights Reserved.</div>}
            </main>
          </>}
      </section>
    </>
  )
}

export default Layout