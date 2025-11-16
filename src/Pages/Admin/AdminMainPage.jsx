import { useContext, useEffect, useState } from "react";
import { DarkModeContextAPI } from "../../Context/DarkModeContext";
import AdminNavBar from "./adminNavbar/AdminNavBar"
import SpinnerContext, { SpinnerContextAPI } from "../../Context/SpinnerContext";
import { MediaQueriesAPI } from "../../Context/MediaQueries";
import Spinner from "../../utilities/Spinner";
import PageDeviceReject from "./PageDeviceReject";
import { Outlet } from "react-router-dom";

let AdminMainPage = ()=> {
    return (
        <>
                <SpinnerContext>
                    <AdminMainPageContent/>
                </SpinnerContext>
        </>
    )
}

const AdminMainPageContent = () => {
    let {DarkMode} = useContext(DarkModeContextAPI);
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
    <>
        <section className={`z-0 w-screen h-screen ease-in-out duration-600 transition-colors ${DarkMode ? 'bg-slate-950' : 'bg-white'} overflow-hidden`}>
            <>  {isSpinner && <Spinner/>}
                {isPageDeviceReject ? <PageDeviceReject/>:
                <>
                    <header className={`${IsVisible?'invisible':'visible'} w-full h-[70px] border-b-2 flex ${DarkMode?'border-white':'border-black'} duration-400 ease-in-out`}>
                        <AdminNavBar/>
                    </header>
                    <main className={`${IsVisible?'invisible':'visible'} relative w-full h-[calc(100vh-70px)] flex flex-col justify-center items-center gap-6`}>
                        <Outlet/>
                    </main>
                </>
                }
            </>
        </section>
    </>
  )
}

export default AdminMainPage



//<LogInMainPage/>