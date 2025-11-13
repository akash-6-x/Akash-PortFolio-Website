import { createContext, useEffect, useState } from "react"

export let MediaQueriesAPI = createContext()
const MediaQueries = ({children}) => {
     
    const [isMobile, setIsMobile] = useState(false) //Big Phones (Tabs like that)
    const [isLaptop, setIsLaptop] = useState(false) // Laptops and also cover tablets
    const [isDesktop, setIsDesktop] = useState(true) // Desktop and big screens
    const [isSmall, setIsSmall] = useState(false) //Mobile Screens
    const [isVerySmall, setIsVerySmall] = useState(false) // Very Small Screens and watches
    const[isTab,setIsTab] = useState(false) //for main container changes
    
    // useEffect(()=>{
    //     console.log("Mobile:", isMobile, "Laptop:", isLaptop, "Desktop:", isDesktop , "Tab:",isTab , "Small:", isSmall , "Very Small:", isVerySmall);
    // },[isMobile, isLaptop, isTab, isDesktop, isSmall, isVerySmall])

    useEffect(() => {
        const checkScreen = () => 
        {
            if(window.innerWidth >=500 && window.innerWidth <639)
            {
                setIsMobile(true)
                setIsLaptop(false)
                setIsDesktop(false)
                setIsSmall(false)
                setIsVerySmall(false)
                setIsTab(false)
            }
            else if(window.innerWidth >= 900 && window.innerWidth < 1280)
            {
                setIsMobile(false)
                setIsLaptop(true)
                setIsDesktop(false)
                setIsSmall(false)
                setIsVerySmall(false)
                setIsTab(false)

            }
            else if(window.innerWidth >= 640 && window.innerWidth < 900)
            {
                setIsMobile(false)
                setIsLaptop(false)
                setIsDesktop(false)
                setIsSmall(false)
                setIsVerySmall(false)
                setIsTab(true)
            }
            else if(window.innerWidth >= 1280)
            {
                setIsMobile(false)
                setIsLaptop(false)
                setIsDesktop(true)
                setIsSmall(false)
                setIsVerySmall(false)
                setIsTab(false)

            }
            else if(window.innerWidth<500 && window.innerWidth >=315)
            {
                setIsMobile(false)
                setIsLaptop(false)
                setIsDesktop(false)
                setIsSmall(true)
                setIsVerySmall(false)
                setIsTab(false)
            }
            else if(window.innerWidth < 315)
            {
                setIsMobile(false)
                setIsLaptop(false)
                setIsDesktop(false)
                setIsSmall(false)
                setIsVerySmall(true)
                setIsTab(false)
            }
            
        }        

        checkScreen() // Initial check
        window.addEventListener("resize", checkScreen)

        return () => window.removeEventListener("resize", checkScreen)
    }, [])

  return (
    <>
        <MediaQueriesAPI.Provider value={{isMobile,isLaptop,isTab,isDesktop,isSmall,isVerySmall}}>
            {children}
        </MediaQueriesAPI.Provider>
    </>
  )
}

export default MediaQueries