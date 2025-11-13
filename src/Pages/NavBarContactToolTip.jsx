import { useContext } from "react"
import { DarkModeContextAPI } from "../Context/DarkModeContext"
import { MediaQueriesAPI } from "../Context/MediaQueries"

const NavBarContactToolTip = () => {
    let {DarkMode} = useContext(DarkModeContextAPI)
    let {isMobile,isLaptop,isTab,isDesktop,isSmall,isVerySmall} = useContext(MediaQueriesAPI)
    
  return (
    <>
        <p className={`shadow-[0_0_40px_2px_#00f7ff] w-[96%] h-[92%] border-3 rounded-[20px] font-semibold quicksand-shit ease-in-out duration-600 transition-colors flex justify-center items-center ${DarkMode ? 'text-white border-white':'text-black border-black'} ${DarkMode ? 'bg-slate-950' : 'bg-white'} ${isDesktop && 'text-[16px] px-7 py-3 leading-[36px]'} ${isLaptop && 'text-[13px] leading-[30px]'} ${isTab && 'text-[11px] leading-[25px]'} ${isMobile && 'text-[11px] leading-[22px]'} ${isSmall && 'text-[9px] leading-[20px]'} ${isVerySmall && 'text-[8px] leading-[16px]'}`}>
                Email : akashpersonalrj@gmail.com
                {/* <br />
                Phone : +xx xxxxx xxxxx */}
                <br/>
                Tamil Nadu, India.
        </p>
    </>
  )
}

export default NavBarContactToolTip