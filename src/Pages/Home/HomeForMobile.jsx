import { useContext } from "react";
import { DarkModeContextAPI } from "../../Context/DarkModeContext";
import { IconsFocusedAPI } from "../../Context/IconsFocused";
import { LuCode, LuGithub, LuInstagram, LuLinkedin } from "react-icons/lu";

const HomeForMobile = () => {

    let {DarkMode} = useContext(DarkModeContextAPI)
    let {isGitHubFocused, setisGitHubFocused, isLinkedInFocused, setisLinkedInFocused, isInstagramFocused, setisInstagramFocused, isProjectsFocused, setisProjectsFocused , GitHub, LinkedIn, Instagram, Projects} = useContext(IconsFocusedAPI)
    

  return (
    <>
                <section className="w-full flex flex-col items-center overflow-auto select-none">
    
                    <aside className="w-[90%] h-[200px]  mt-6 flex justify-center items-center gap-16 shrink-0">
                        <div title="Me" className={`border-2 border-blue-500 ${DarkMode?'shadow-[0_0_70px_1px_#00BFFF]':'shadow-[0_0_100px_20px_#00BFFF]'} w-[130px] h-[130px] rounded-full`}>
                            <img src="/akash_smile_1.jpg" draggable="false" alt="" className="w-full h-full rounded-full object-cover object-[center_35%]"/>
                        </div> {/*Profile Picture Container*/}
                        <div className={`${DarkMode?'text-white':'text-black'} cinzel-shit border w-40 h-8 rounded-[8px] flex justify-center items-center`}>Hey I'm Akash</div>
                    </aside>
    
                    <aside className="w-[90%] h-[420px]  mb-6 flex flex-col items-center shrink-0">
                        <div className="w-[90%] h-[70%] mt-6 px-6 flex justify-center items-center">
                            <p className={`leading-relaxed ${DarkMode?'text-white':'text-black'} border tektur-shit text-[12px] p-6 rounded-[14px]`}>
                                I’m a passionate Junior Frontend Developer who loves creating responsive, interactive, and visually appealing websites. This portfolio showcases my skills in React, Tailwind CSS, and modern web technologies. I focus on delivering seamless user experiences across all devices by combining clean code, custom components, and optimized performance. Feel free to explore my projects and profiles below!
                            </p>    
                        </div> 
                        <div className="w-[90%] h-[10%] mt-4 flex justify-center items-center will-change-transform">
                            <div className="w-[300px] h-[36px] bg-blue-300 flex justify-center items-center rounded-[10px] gap-10">
                                <div tabIndex={0} title="Go to Github Profile" aria-label="Go to Github Profile" className={`${isGitHubFocused && 'shadow-[0_0_20px_4px_blue]'} ${DarkMode?'border-white bg-black':'border-black bg-white'} w-[25px] h-[25px] border rounded-full flex justify-center items-center cursor-pointer hover:scale-[1.05] ease-in-out duration-400`} onFocus={()=>setisGitHubFocused(true)} onBlur={()=>setisGitHubFocused(false)} onClick={GitHub} onKeyDown={(e)=>{if(e.key === 'enter' || e.key === ' '){GitHub();}}}>
                                    <LuGithub className={`text-[14px] stroke-[1px] ${DarkMode ? 'stroke-white fill-white' : 'stroke-black fillblack'}`}/>
                                </div>
                                <div tabIndex={0} title="Go to Linked In Profile" aria-label="Go to Linked In Profile" className={`bg-blue-600 ${isLinkedInFocused && 'shadow-[0_0_20px_4px_blue]'} ${DarkMode?'border-white':'border-black'} w-[25px] h-[25px] border rounded-full flex justify-center items-center cursor-pointer hover:scale-[1.05] ease-in-out duration-400`} onFocus={()=>setisLinkedInFocused(true)} onBlur={()=>setisLinkedInFocused(false)} onClick={LinkedIn} onKeyDown={(e)=>{if(e.key === 'enter' || e.key === ' '){LinkedIn();}}}>
                                    <LuLinkedin className={`text-[11px] stroke-white fill-white`}/>
                                </div>
                                <div tabIndex={0} title="Go to Instagram Profile" aria-label="Go to Instagram Profile" className={`bg-pink-500 ${isInstagramFocused && 'shadow-[0_0_20px_4px_blue]'} ${DarkMode?'border-white':'border-black'} w-[25px] h-[25px] border rounded-full flex justify-center items-center cursor-pointer hover:scale-[1.05] ease-in-out duration-400`} onFocus={()=>setisInstagramFocused(true)} onBlur={()=>setisInstagramFocused(false)} onClick={Instagram} onKeyDown={(e)=>{if(e.key === 'enter' || e.key === ' '){Instagram();}}}>
                                    <LuInstagram className='text-[14px] stroke-white'/>
                                </div>
                                <div tabIndex={0} title="Go to Skills & Projects page" aria-label="Go to Projects page" className={`bg-green-600 ${isProjectsFocused && 'shadow-[0_0_20px_4px_blue]'} ${DarkMode?'border-white':'border-black'} w-[25px] h-[25px] border rounded-full flex justify-center items-center cursor-pointer hover:scale-[1.05] ease-in-out duration-400`} onFocus={()=>setisProjectsFocused(true)} onBlur={()=>{setisProjectsFocused(false)}} onClick={(e)=>{e.currentTarget.blur();Projects()}} onKeyDown={(e)=>{if(e.key === 'enter' || e.key === ' '){e.currentTarget.blur();Projects();}}}>
                                    <LuCode className="text-[12px] stroke-3 stroke-white"/>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <div className="select-none mb-4 text-gray-600 text-[12px]">&copy; Copyright 2025. All Rights Reserved.</div>
                </section>
    </>
  )
}

export default HomeForMobile