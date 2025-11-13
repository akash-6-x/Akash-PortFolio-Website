import { useContext, useEffect, useRef, useState } from 'react'
import { MediaQueriesAPI } from '../Context/MediaQueries'
import { DarkModeContextAPI } from '../Context/DarkModeContext';
import ThemeChangerToogle from './ThemeChangerToogle';
import { useNavigate } from 'react-router-dom';
import NavBarContactToolTip from './NavBarContactToolTip';
// import { Star } from 'lucide-react';

const NavBar = () => {

    let {isMobile,isLaptop,isTab,isDesktop,isSmall,isVerySmall} = useContext(MediaQueriesAPI)
    let {DarkMode} = useContext(DarkModeContextAPI)
    // let [Rated,setRated] = useState(false);
    let [isContact,setisContact] = useState(false);
    let [TooltipAnimateDown,setTooltipAnimateDown] = useState('translate-y-[0px]');
    let [isLogoFocused,setisLogoFocused] = useState(false)
    // let [isStarFocused,setisStarFocused] = useState(false)
    let [isContactFocused,setisContactFocused] = useState(false)
    let navigate = useNavigate();
    let Home = ()=>{
        navigate('/')
    }
    const contactRef = useRef(null);
    const tooltipRef = useRef(null);

    const handleContactToggle = () => {
        setisContact(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contactRef.current && !contactRef.current.contains(event.target) && tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                setisContact(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () =>{
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        }
    }, []);

    useEffect(()=>{
        if(isContact){
            setTooltipAnimateDown('translate-y-[0px]');
        }else{
            setTooltipAnimateDown('translate-y-[-20px]');
        }
    },[isContact])

    let [LogoImageChangeState,setLogoImageChangeState] = useState('/logo-dark.png');
    useEffect(()=>{
        DarkMode ? setLogoImageChangeState('/logo-dark.png') : setLogoImageChangeState('/logo-light.png');
    },[DarkMode])
  
  return (
    <>
    {/* Left */}
        <aside className={`w-[50%] h-full flex items-center pl-5 ${isSmall && 'gap-3'} ${isDesktop && 'gap-12'} ${isLaptop && 'gap-8'} ${isTab && 'gap-8'} ${isMobile && 'gap-5'} ${isVerySmall && 'gap-3'} shrink-0`}>
            <div tabIndex={0} title='AK' aria-label='Logo' className={`will-change-contents cursor-pointer ${isLogoFocused && 'shadow-[0_0_20px_4px_blue]'} ${isMobile && 'w-10 h-10'} ${isLaptop && 'w-12 h-12'} ${isTab && 'w-12 h-12'} ${isDesktop && 'w-13 h-13'} ${isSmall && 'w-8 h-8'} ${isVerySmall && 'w-7 h-7'} select-none rounded-full flex shrink-0 justify-center items-center overflow-hidden border-2 ${DarkMode?'bg-black border-white':'bg-white/70'}`} onFocus={()=>setisLogoFocused(true)} onBlur={()=>setisLogoFocused(false)} onClick={Home}  onKeyDown={(e) => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault();Home();}}}>
                <img src={LogoImageChangeState} draggable="false" alt="logo" className='scale-120 mr-1'/>
            </div>
            
            {
                !isSmall && !isVerySmall && <div aria-label='My name is Akash' className={`quicksand-shit border-2 font-[600] will-change-transform ${isSmall && 'w-15 h-7 text-[8px] rounded-[7px]'} ${isMobile && 'w-22 h-8 text-[11px] font-bold rounded-[12px]'} ${isLaptop && 'w-30 h-10 rounded-[15px] text-[15px]'} ${isTab && 'w-30 h-10 rounded-[15px] text-[15px]'} ${isDesktop && 'w-36 h-10.5 rounded-[15px] text-[17px]'} select-none flex justify-center items-center bg-blue-300 hover:scale-108 duration-400 ${DarkMode?'border-white':'border-black'}`}>AKASH M</div>
            }
            
            {
                <ThemeChangerToogle/>
            }
            
        </aside>
        {/* Right */}
        <aside className={`relative w-[50%] h-full shrink-0 flex items-center justify-end ${isSmall && 'pr-2 gap-4'} ${!isSmall && !isVerySmall && !isMobile && 'pr-10 gap-6'} ${isMobile && 'pr-6 gap-4'} ${isVerySmall && 'pr-2'}`}>
            {/* { !isVerySmall &&   <div tabIndex={0} aria-label='Rate this Page' title='Rate my page' className={`will-change-transform ${isStarFocused && 'shadow-[0_0_20px_4px_blue]'} ${isDesktop && 'w-11 h-11'} ${isLaptop && 'w-10 h-10'}  ${isTab && 'w-10 h-10'} ${isMobile && 'w-7.5 h-7.5'} ${isSmall && 'w-6 h-6'} border-2 rounded-full flex justify-center items-center ${Rated && 'bg-yellow-500'} hover:scale-110 ease-in-out duration-400 cursor-pointer shrink-0 ${DarkMode?'border-white':'border-black'}`} onFocus={()=>setisStarFocused(true)} onBlur={()=>setisStarFocused(false)} onClick={()=>{setRated(!Rated)}} onKeyDown={(e) => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault();setRated(!Rated);}}}>
                                    <Star size={(isDesktop && 22) || (isLaptop && 20) || (isTab && 18) || (isMobile && 16) || (isSmall && 12)} className={` transition-transform duration-400 ease-linear ${Rated ? 'stroke-yellow-100 fill-yellow-100 rotate-y-180':'fill-blue-400 stroke-blue-400'}`}/>
                                </div>
            } */}
            <div tabIndex={0} ref={contactRef} aria-label='Contact me' title='Contact me' className={`quicksand-shit will-change-transform border-2 font-[600] ${isContactFocused && 'shadow-[0_0_20px_4px_blue]'} ${!isSmall && !isVerySmall && !isMobile && 'w-30 h-10 rounded-[15px] text-[16px]'} ${isSmall && 'w-23 h-7 rounded-[10px] text-[12px]'} ${isVerySmall && 'w-20 h-6 text-[12px] rounded-[10px]'} ${isMobile && 'w-24 h-8 rounded-[12px] text-[12px]'} select-none flex justify-center items-center bg-blue-300 cursor-pointer will-change-transform hover:scale-[1.1] ease-in-out duration-400 shrink-0 ${DarkMode?'border-white':'border-black'}`} onFocus={()=>setisContactFocused(true)} onBlur={()=>setisContactFocused(false)} onClick={handleContactToggle} onKeyDown={(e) => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault();handleContactToggle();}}}>
                Contact me
            </div>
            {
                isContact ? <>
                    <div tabIndex={0} ref={tooltipRef} className={`opacity-100 border-3 rounded-[25px] mt-5 flex justify-center items-center bg-blue-300 ease-in-out duration-800 will-change-transform absolute top-[65px] right-[14px] z-10 ${TooltipAnimateDown} ${DarkMode ? 'border-white':'border-black'} ${isDesktop && 'w-[360px] h-[160px]'} ${isLaptop && 'w-[320px] h-[140px]'} ${isTab && 'w-[260px] h-[120px]'} ${isMobile && 'w-[240px] h-[120px]'} ${isSmall && 'w-[220px] h-[100px]'} ${isVerySmall && 'w-[190px] h-[90px]'}`}>
                        <NavBarContactToolTip/>
                    </div>
                </>
                :
                <>
                    <div tabIndex={0} ref={tooltipRef} className={`${!isContact && 'select-none'} opacity-0 border-3 rounded-[25px] mt-5 flex justify-center items-center bg-blue-300 ease-in-out duration-600 will-change-transform absolute top-[65px] right-[14px] z-10 ${TooltipAnimateDown} ${DarkMode ? 'border-white':'border-black'} ${isDesktop && 'w-[360px] h-[160px]'} ${isLaptop && 'w-[320px] h-[140px]'} ${isTab && 'w-[260px] h-[120px]'} ${isMobile && 'w-[240px] h-[120px]'} ${isSmall && 'w-[220px] h-[100px]'} ${isVerySmall && 'w-[190px] h-[90px]'}`}>
                        <NavBarContactToolTip/>
                    </div>
                </>
            }
        </aside>
    </>
  )
}

export default NavBar