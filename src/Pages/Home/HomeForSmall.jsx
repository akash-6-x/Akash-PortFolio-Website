import { useContext } from "react";
import { DarkModeContextAPI } from "../../Context/DarkModeContext";
import { IconsFocusedAPI } from "../../Context/IconsFocused";
import { LuCode, LuGithub, LuInstagram, LuLinkedin } from "react-icons/lu";

const HomeForSmall = () => {

    let {DarkMode} = useContext(DarkModeContextAPI)
    let {isGitHubFocused, setisGitHubFocused, isLinkedInFocused, setisLinkedInFocused, isInstagramFocused, setisInstagramFocused, isProjectsFocused, setisProjectsFocused , GitHub, LinkedIn, Instagram, Projects} = useContext(IconsFocusedAPI)
  
    return (
        <>
            <section className="w-full flex flex-col items-center overflow-auto select-none">
    
                    <aside className="w-[90%] h-[200px] mt-6 flex justify-center items-center gap-7 shrink-0">
                        <div title="Me" className={`border-2 border-blue-500 ${DarkMode?'shadow-[0_0_60px_4px_#00BFFF]':'shadow-[0_0_70px_10px_#00BFFF]'} w-[130px] h-[130px] rounded-full shrink-0`}>
                            <img src="/akash_smile_1.jpg" draggable="false" alt="" className="w-full h-full rounded-full object-cover object-[center_35%]"/>
                        </div> {/*Profile Picture Container*/}
                        <div className={`${DarkMode?'text-white':'text-black'} cinzel-shit border w-40 h-8 rounded-[10px] flex justify-center items-center shrink-0`}>Hey I'm Akash</div>
                    </aside>
    
                    <aside className="w-[90%] h-[550px] mb-6 flex flex-col justify-center items-center shrink-0">
                        <div className="w-[90%] h-[60%] px-6 flex justify-center items-center">
                            <p className={`leading-relaxed ${DarkMode?'text-white':'text-black'} border tektur-shit text-[12px] p-6 rounded-[14px]`}>
                                I’m a passionate Junior Frontend Developer who loves creating responsive, interactive, and visually appealing websites. This portfolio showcases my skills in React, Tailwind CSS, and modern web technologies. I focus on delivering seamless user experiences across all devices by combining clean code, custom components, and optimized performance. Feel free to explore my projects and profiles below!
                            </p>    
                        </div> 
                        <div className="will-change-transform w-[90%] h-[10%] mt-12 flex justify-center items-center shrink-0">
                            <div className="w-[250px] h-[40px] bg-blue-300 flex justify-evenly items-center rounded-[16px]">
                                <div tabIndex={0} title="Go to GitHub Profile" aria-label="Go to Github Profile" className={`${isGitHubFocused && 'shadow-[0_0_20px_4px_blue]'} ${DarkMode?'border-white bg-black':'border-black bg-white'} w-[25px] h-[25px] border rounded-full flex justify-center items-center ease-in-out duration-400`} onFocus={()=>setisGitHubFocused(true)} onBlur={()=>setisGitHubFocused(false)} onClick={GitHub}>
                                    <LuGithub className={`text-[12px] ${DarkMode? 'stroke-white fill-white':'stroke-black fill-black'}`}/>
                                </div>
                                <div tabIndex={0} title="Go to Linked In Profile" aria-label="Go to Linked In Profile" className={`bg-blue-600 ${isLinkedInFocused && 'shadow-[0_0_20px_4px_blue]'} ${DarkMode?'border-white':'border-black'} w-[25px] h-[25px] border rounded-full flex justify-center items-center ease-in-out duration-400`} onFocus={()=>setisLinkedInFocused(true)} onBlur={()=>setisLinkedInFocused(false)} onClick={LinkedIn}>
                                    <LuLinkedin className="text-[11px] stroke-white fill-white"/>
                                </div>
                                <div tabIndex={0} title="Go to Instagram Profile" aria-label="Go to Instagram Profile" className={`bg-pink-500 ${isInstagramFocused && 'shadow-[0_0_20px_4px_blue]'} ${DarkMode?'border-white':'border-black'} w-[25px] h-[25px] border rounded-full flex justify-center items-center ease-in-out duration-400`} onFocus={()=>setisInstagramFocused(true)} onBlur={()=>setisInstagramFocused(false)} onClick={Instagram}>
                                    <LuInstagram className='text-[14px] stroke-white'/>
                                </div>
                                <div tabIndex={0} title="Go to Skills & Projects Page" aria-label="Go to Projects Page" className={`bg-green-600 ${isProjectsFocused && 'shadow-[0_0_20px_4px_blue]'} ${DarkMode?'border-white':'border-black'} w-[25px] h-[25px] border rounded-full flex justify-center items-center ease-in-out duration-400`} onFocus={()=>setisProjectsFocused(true)} onBlur={()=>setisProjectsFocused(false)} onClick={(e)=>{e.currentTarget.blur();Projects()}}>
                                    <LuCode className="text-[12px] stroke-3 stroke-white"/>
                                </div>
                            </div>
                        </div>
                    </aside>
                <div className="select-none mb-2 text-gray-600 text-[12px]">&copy; Copyright 2025. All Rights Reserved.</div>
            </section>
    
        </>
  )
}

export default HomeForSmall