import { useContext } from 'react';
import { DarkModeContextAPI } from '../../Context/DarkModeContext';
import { MediaQueriesAPI } from '../../Context/MediaQueries';
import { IconsFocusedAPI } from '../../Context/IconsFocused';
import { LuCode, LuGithub, LuInstagram, LuLinkedin } from 'react-icons/lu';

const HomeForDesktopToTab = () => {
    let {isLaptop,isTab,isDesktop} = useContext(MediaQueriesAPI)
    let {DarkMode} = useContext(DarkModeContextAPI)
    let {isGitHubFocused, setisGitHubFocused, isLinkedInFocused, setisLinkedInFocused, isInstagramFocused, setisInstagramFocused, isProjectsFocused, setisProjectsFocused , GitHub, LinkedIn, Instagram, Projects} = useContext(IconsFocusedAPI)
    // console.log("PF:",isProjectsFocused);
     
    return (
    <>
                    <aside className={`w-[40%] h-full  flex justify-end items-center select-none ${isDesktop && 'pl-30 pb-25 pr-16'} ${isLaptop && ' pr-10 pb-25'} ${isTab && 'pr-10 pb-15'}`}>
                        <div title='Me' className={`${isTab?'border-3':'border-4'} border-blue-500 ${DarkMode?'shadow-[0_0_150px_1px_#00BFFF]':'shadow-[0_0_400px_80px_#00BFFF]'} ${isDesktop && 'w-[350px] h-[350px]'} ${isLaptop && 'w-[270px] h-[270px]'} ${isTab && 'w-[170px] h-[170px]'} rounded-full flex justify-center items-center hover:scale-103 ease-in-out duration-400 will-change-transform shrink-0`}>
                            <img src="/akash_smile_1.jpg" draggable="false" alt="" className="w-full h-full rounded-full object-cover object-[center_35%]"/>
                        </div>
                    </aside>
    
                    <aside className='w-[60%] h-full  flex items-center px-10 select-none '>
                        <section className={` rounded-[25px] relative ${isDesktop && 'w-[700px] h-[450px]'} ${isLaptop && 'w-[600px] h-[400px]'} ${isTab && 'w-[400px] h-[200px]'}`}>
                            <div className={`${DarkMode?'text-white':'text-black'} absolute left-5 cinzel-shit font-[600] hover:scale-[1.05] ease-in-out duration-400 will-change-transform ${isDesktop && 'text-[32px] top-5'} ${isLaptop && 'text-[26px] top-5'} ${isTab && 'text-[16px]'} top-3`}>
                                Hey I'm Akash
                            </div>
                            <div className={`flex flex-col absolute left-5 ${isDesktop && 'top-25 gap-10 px-10 '} ${isLaptop && 'text-[14px] top-20 gap-10 px-10 '}  ${isTab && 'top-12 gap-2.5 px-2 '}`}>
                                <p className={`leading-relaxed ${DarkMode?'text-white':'text-black'} tektur-shit hover:scale-[1.02] ease-in-out duration-400 will-change-transform  font-semibold ${isDesktop && 'text-[19px]'} ${isLaptop && 'text-[15px]'} ${isTab && 'text-[9px]'}`}>
                                    I’m a passionate Junior Frontend Developer who loves creating responsive, interactive, and visually appealing websites. This portfolio showcases my skills in React, Tailwind CSS, and modern web technologies. I focus on delivering seamless user experiences across all devices by combining clean code, custom components, and optimized performance. Feel free to explore my projects and profiles below!
                                </p>
                                <div className={` flex justify-center items-center will-change-transform ${isDesktop && 'w-100 h-12 gap-8'} ${isLaptop && 'w-90 h-12 gap-8'} ${isTab && 'w-50 h-7 gap-4'}`}>
                                        <div tabIndex={0} title="Go to Github Profile" aria-label="Go to Github Profile" className={`${isGitHubFocused && 'shadow-[0_0_20px_4px_blue]'} ${DarkMode?'border-white bg-black':'border-black'} cursor-pointer hover:scale-[1.1] ease-in-out duration-300 will-change-transform flex justify-center items-center ${isDesktop && 'w-12 h-12 border-4 rounded-full'} ${isLaptop && 'w-9 h-9 border-[3px] rounded-full'}  ${isTab && 'w-6 h-6 border-[2px] rounded-full'}`} onFocus={()=>setisGitHubFocused(true)} onBlur={()=>setisGitHubFocused(false)} onClick={GitHub} onKeyDown={(e)=>{if(e.key === 'Enter' || e.key === ' '){GitHub();}}}>
                                            <LuGithub className={`stroke-[1px] will-change-transform duration-600 ease-in-out transition-colors ${isDesktop && 'text-[25px]'} ${isLaptop && 'text-[20px]'} ${isTab && 'text-[13px]'} ${DarkMode ? ' stroke-white fill-white':'fill-black'}`} />
                                        </div>
                                        <div tabIndex={0} title="Go to Linked In Profile" aria-label="Go to Linked In Profile" className={`bg-blue-700 ${isLinkedInFocused && 'shadow-[0_0_20px_4px_blue]'} ${DarkMode?'border-white':'border-black'} cursor-pointer hover:scale-[1.1] ease-in-out duration-300 will-change-transform flex justify-center items-center ${isDesktop && 'w-12 h-12 border-4 rounded-full'} ${isLaptop && 'w-9 h-9 border-[3px] rounded-full'}  ${isTab && 'w-6 h-6 border-[2px] rounded-full'}`} onFocus={()=>setisLinkedInFocused(true)} onBlur={()=>setisLinkedInFocused(false)} onClick={LinkedIn} onKeyDown={(e)=>{if(e.key === 'Enter' || e.key === ' '){LinkedIn();}}}>
                                            <LuLinkedin className={`text-white fill-white will-change-transform ${isDesktop && 'text-[20px]'} ${isLaptop && 'text-[16px]'} ${isTab && 'text-[11px] ml-[0.5px]'}`}/>
                                        </div>
                                        <div tabIndex={0} title="Go to Instagram Profile" aria-label="Go to Instagram Profile" className={`bg-pink-700 ${isInstagramFocused && 'shadow-[0_0_20px_4px_blue]'} ${DarkMode?'border-white':'border-black'} cursor-pointer hover:scale-[1.1] ease-in-out duration-300 will-change-transform flex justify-center items-center ${isDesktop && 'w-12 h-12 border-4 rounded-full'} ${isLaptop && 'w-9 h-9 border-[3px] rounded-full'}  ${isTab && 'w-6 h-6 border-[2px] rounded-full'}`} onFocus={()=>setisInstagramFocused(true)} onBlur={()=>setisInstagramFocused(false)} onClick={Instagram} onKeyDown={(e)=>{if(e.key === 'Enter' || e.key === ' '){Instagram();}}}>
                                            <LuInstagram className={`text-white stroke-2.5 will-change-transform ${isDesktop && 'text-[24px]'} ${isLaptop && 'text-[20px]'} ${isTab && 'text-[13px]'}`}/>
                                        </div>
                                        <div tabIndex={0} title="Go to Skills & Projects page" aria-label="Go to Projects page" className={`bg-green-600 ${isProjectsFocused && 'shadow-[0_0_20px_4px_blue]'} ${DarkMode?'border-white':'border-black'} cursor-pointer hover:scale-[1.1] ease-in-out duration-300 will-change-transform flex justify-center items-center ${isDesktop && 'w-12 h-12 border-4 rounded-full'} ${isLaptop && 'w-9 h-9 border-[3px] rounded-full'}  ${isTab && 'w-6 h-6 border-[2px] rounded-full'}`} onFocus={()=>setisProjectsFocused(true)} onBlur={()=>{setisProjectsFocused(false)}} onClick={(e)=>{e.currentTarget.blur();Projects()}} onKeyDown={(e)=>{if(e.key === 'Enter' || e.key === ' '){e.currentTarget.blur(); Projects();}}}>
                                            <LuCode className={`stroke-white ${isDesktop && 'text-[20px]'} ${isLaptop && 'text-[16px]'} ${isTab && 'text-[12px]'}`}/>
                                        </div>
                                </div>
                            </div>
                        </section>
                    </aside>
                
                </>
  )
}

export default HomeForDesktopToTab