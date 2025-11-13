import { useContext, useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import SpinnerContext, { SpinnerContextAPI } from '../../../Context/SpinnerContext';
import { MediaQueriesAPI } from '../../../Context/MediaQueries';
import PageDeviceReject from '../PageDeviceReject';
import Spinner from '../../../utilities/Spinner';

function LogInMainPage()
{
  return (
    <>
        <SpinnerContext>
            <LogInMainPageContent/>
        </SpinnerContext>
    </>
  )
}

const LogInMainPageContent = () => {
      let {isSpinner} = useContext(SpinnerContextAPI);
      let {isMobile,isLaptop,isTab,isDesktop,isSmall,isVerySmall} = useContext(MediaQueriesAPI);
      let [IsVisible,setIsVisible] = useState(true)
      const VisibilityTimeout = 800;
      let [isPageDeviceReject, setIsPageDeviceReject] = useState(false);
      useEffect(()=>{
          setIsVisible(true)
          if(isMobile || isSmall || isVerySmall)
          {
              setIsPageDeviceReject(true);
          }
          else
          {
              setIsPageDeviceReject(false);
          }
          let timer = setTimeout(()=>{
            setIsVisible(false)
          },VisibilityTimeout)
          return () => clearTimeout(timer);
        },[isDesktop, isLaptop, isMobile, isTab, isSmall, isVerySmall])
        
  return (
    <section className={`w-screen h-screen flex justify-center items-center relative overflow-hidden`}>
      <>
            {isPageDeviceReject ? <PageDeviceReject/> : <>
              <img draggable="false" src='/Fields.jpg' className='w-full h-full object-cover'></img>
              <LoginForm/></>
            }
      </>
      {isSpinner && <Spinner/>}
    </section>
  )
}

export default LogInMainPage