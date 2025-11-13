// import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// import { MediaQueriesAPI } from '../Context/MediaQueries';
import IconsFocused from '../Context/IconsFocused';

const MainContainer = () => {

  // let {isMobile,isLaptop,isTab,isDesktop,isSmall,isVerySmall} = useContext(MediaQueriesAPI)
  
  
  return (
    <section className='w-full h-full flex justify-center relative will-change-transform overflow-hidden z-0'>
      <IconsFocused>
        <Outlet/>
      </IconsFocused>
    </section>
  )
}

export default MainContainer