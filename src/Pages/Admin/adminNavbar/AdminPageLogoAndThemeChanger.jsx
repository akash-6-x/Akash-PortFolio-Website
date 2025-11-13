import { useContext, useEffect, useState } from 'react'
import { DarkModeContextAPI } from '../../../Context/DarkModeContext';
import { MediaQueriesAPI } from '../../../Context/MediaQueries';
import ThemeChangerToogle from '../../ThemeChangerToogle';
import { useNavigate } from 'react-router-dom';

const AdminPageLogoAndThemeChanger = () => {
    let {DarkMode} = useContext(DarkModeContextAPI);
    let {isDesktop,isLaptop,isMobile,isTab,isSmall,isVerySmall} = useContext(MediaQueriesAPI);
    let [LogoImageChangeState,setLogoImageChangeState] = useState('/logo-dark.png');
    let [isLogoFocused,setisLogoFocused] = useState(false)
    let navigate = useNavigate();
    let Home = ()=>{
        navigate('/')
    }

    useEffect(()=>{
        DarkMode ? setLogoImageChangeState('/logo-dark.png') : setLogoImageChangeState('/logo-light.png');
    },[DarkMode])
  return (
    <>
        <aside className={` w-[50%] h-full flex items-center pl-5 ${isSmall && 'gap-3'} ${isDesktop && 'gap-12'} ${isLaptop && 'gap-8'} ${isTab && 'gap-8'} ${isMobile && 'gap-5'} ${isVerySmall && 'gap-3'} shrink-0`}>
            <div tabIndex={0} title='AK' aria-label='Logo' className={`will-change-contents cursor-pointer ${isLogoFocused && 'shadow-[0_0_20px_4px_blue]'} ${isMobile && 'w-10 h-10'} ${isLaptop && 'w-12 h-12'} ${isTab && 'w-12 h-12'} ${isDesktop && 'w-13 h-13'} ${isSmall && 'w-8 h-8'} ${isVerySmall && 'w-7 h-7'} select-none rounded-full flex shrink-0 justify-center items-center overflow-hidden border-2 ${DarkMode?'bg-black border-white':'bg-white/70'}`} onFocus={()=>setisLogoFocused(true)} onBlur={()=>setisLogoFocused(false)} onClick={Home}  onKeyDown={(e) => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault();Home();}}}>
                <img src={LogoImageChangeState} draggable="false" alt="logo" className={`scale-120 mr-1`}/>
            </div>
            <ThemeChangerToogle/>
        </aside>
    </>
  )
}

export default AdminPageLogoAndThemeChanger