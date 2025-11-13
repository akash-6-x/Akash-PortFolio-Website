import { useContext, useState } from "react"
import { MediaQueriesAPI } from "../Context/MediaQueries"
import { DarkModeContextAPI } from "../Context/DarkModeContext"
import { LuMoon, LuSun, LuTriangle } from "react-icons/lu";

const ThemeChangerToogle = () => {

    let {isDesktop,isVerySmall} = useContext(MediaQueriesAPI)
    let {DarkMode,setDarkMode} = useContext(DarkModeContextAPI)
    let [ThemeAnimeEffect,setThemeAnimeEffect] = useState('translate-y-[-25px]')
    let [isFocused,setisFocused] = useState(false)

    function ThemeEffect()
    {
        setThemeAnimeEffect('')
        setTimeout(()=>{
            setThemeAnimeEffect('translate-y-[-25px]')
        },200)
    }
    
    
  return (
    <>
        <div tabIndex={0} aria-label='Change Theme' title='Change Theme' className={`will-change-transform hover:scale-108 ease-in-out duration-400 cursor-pointer rounded-full border-2 flex justify-center items-center overflow-hidden relative ${isFocused && 'shadow-[0_0_20px_4px_blue]'} ${isDesktop && 'w-[40px] h-[40px]'} ${isVerySmall && 'w-[24px] h-[24px]'} ${!isDesktop && !isVerySmall && 'w-[30px] h-[30px]'} ${DarkMode?'border-white':'border-black'} shrink-0`} onFocus={()=>setisFocused(true)} onBlur={()=>setisFocused(false)} onClick={()=>{setDarkMode(!DarkMode); ThemeEffect()}} onKeyDown={(e) => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault();setDarkMode(!DarkMode); ThemeEffect()}}}>
            {DarkMode?  
            <>
                <LuTriangle className={`absolute fill-slate-700 stroke-gray-700 z-10 ${isDesktop && 'text-[30px] right-3 top-[12px]'} ${isVerySmall && 'text-[12px] right-[0px] top-[11px]'} ${!isDesktop && !isVerySmall && 'text-[25px] right-1.5 top-[8px]'}`} />
                <LuTriangle className={`absolute fill-slate-700 stroke-gray-700 z-10 ${isDesktop && 'text-[20px] top-[22px] left-5'} ${isVerySmall && 'text-[16px] right-[7px] top-[6px]'} ${!isDesktop && !isVerySmall && 'text-[15px] top-[15px] left-3'}`} />
                <LuMoon className={`absolute will-change-transform ease-in-out duration-600 fill-white stroke-white z-0 ${isDesktop && 'text-[10px] top-[35px] left-5'} ${isVerySmall && 'text-[6px] top-[28px] left-[9px]'} ${!isDesktop && !isVerySmall && 'text-[8px] top-[30px] left-3'} ${ThemeAnimeEffect} `} />
            </>
            :
            <>
                <LuTriangle className={`absolute fill-slate-700 stroke-gray-700 z-10 ${isDesktop && 'text-[30px] right-3 top-[12px]'} ${isVerySmall && 'text-[12px] right-[0px] top-[11px]'} ${!isDesktop && !isVerySmall && 'text-[25px] right-1.5 top-[8px]'}`} />
                <LuTriangle className={`absolute fill-slate-700 stroke-gray-700 z-10 ${isDesktop && 'text-[20px] top-[22px] left-5'} ${isVerySmall && 'text-[16px] right-[7px] top-[6px]'} ${!isDesktop && !isVerySmall && 'text-[15px] top-[15px] left-3'}`} />
                <LuSun className={`absolute will-change-transform ease-in-out duration-500 fill-yellow-400 stroke-yellow-400 z-0 ${isDesktop && 'text-[16px] top-[31px] left-4'} ${isVerySmall && 'text-[9px] top-[26px] left-[7px]'} ${!isDesktop && !isVerySmall && 'text-[10px] top-[29px] left-[11px]'} ${ThemeAnimeEffect} `} />
            </>}
        </div>
    </>
  )
}

export default ThemeChangerToogle