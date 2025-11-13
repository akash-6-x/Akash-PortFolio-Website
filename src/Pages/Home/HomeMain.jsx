import { useContext } from "react"
import { MediaQueriesAPI } from "../../Context/MediaQueries"
import '../../fonts.css'
import HomeForDesktopToTab from "./HomeForDesktopToTab"
import HomeForMobile from "./HomeForMobile"
import HomeForSmall from "./HomeForSmall"
import HomeForVerySmall from "./HomeForVerySmall"

const Home = () => {

    let {isMobile,isLaptop,isTab,isDesktop,isSmall,isVerySmall} = useContext(MediaQueriesAPI)
    

    
  return (
    <>
        {(isDesktop || isLaptop ||isTab) && 
            <HomeForDesktopToTab/>
        }

        {isMobile && 
            <HomeForMobile/>
        }

        {isSmall && <>
            <HomeForSmall/>
        </>}

        {isVerySmall && 
            <HomeForVerySmall/>
        }
    </>
  )
}

export default Home