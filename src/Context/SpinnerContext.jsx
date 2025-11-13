import { createContext, useContext, useEffect, useState } from 'react'
import { MediaQueriesAPI } from './MediaQueries';

export const SpinnerContextAPI = createContext()
const SpinnerContext = ({children}) => {

    let {isMobile,isLaptop,isTab,isDesktop,isSmall,isVerySmall} = useContext(MediaQueriesAPI)
    const [Curr_View, setCurr_View] = useState("");
    const [isSpinner,setisSpinner] = useState(false)

// Run only when any of these values change
useEffect(() => {
        if (isDesktop) {
            setCurr_View("Desktop");
            // console.log("View: Desktop");
        } else if (isLaptop) {
            setCurr_View("Laptop");
            // console.log("View: Laptop");
        } else if (isMobile) {
            setCurr_View("Mobile");
            // console.log("View: Mobile");
        } else if (isTab) {
            setCurr_View("Tab");
            // console.log("View: Tab");
        } else if (isSmall) {
            setCurr_View("Small");
            // console.log("View: Small");
        } else if (isVerySmall) {
            setCurr_View("VerySmall");
            // console.log("View: VerySmall");
        }

        setisSpinner(true)
        // console.log("Spinner is true now...");
        
        setTimeout(()=>{
            setisSpinner(false)
            // console.log("Spinner is false now...");
        },1500)
  
  
    }, [isDesktop, isLaptop, isMobile, isTab, isSmall, isVerySmall]);

  return (
    <SpinnerContextAPI.Provider value={{isSpinner,setisSpinner}}>
        {children}
    </SpinnerContextAPI.Provider>
  )
}

export default SpinnerContext