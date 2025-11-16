import { ChevronLeft } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { DarkModeContextAPI } from '../../../Context/DarkModeContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../../Backend/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { toast } from 'sonner'
import Spinner2 from '../../../utilities/Spinner2'
import { MediaQueriesAPI } from '../../../Context/MediaQueries'

const ProjectsList = () => {

    let {DarkMode} = useContext(DarkModeContextAPI)
    let navigate = useNavigate();
    let [Projects,setProjects] = useState([]);
    let [isFetching,setisFetching] = useState(true);
    let {isDesktop,isLaptop,isTab} = useContext(MediaQueriesAPI);
    
    const Projects_Data_Fetch_Method = async ()=>{
       try
       {
            const doc_ref = collection(db,"Projects_Collection");
            const Documents = await getDocs(doc_ref);
            const Projects_Data = Documents.docs.map((doc)=>({
              projectID : doc.id, ...doc.data()
            }))
            
            setProjects(Projects_Data)
            // console.log("Projects:",Projects_Data);
            // toast.success("Projects Data Fetched Successfully...")
            setisFetching(false)
       }
       catch(error)
       {
            console.log("Error",error.message);
            toast.error("Error happened while Fetching the projects...")
            setisFetching(false)
       }
    }

    useEffect(()=>{
      Projects_Data_Fetch_Method();
    },[])

  return (
    <section className={`w-full h-full`}>
        
        <aside className={`w-full ${isDesktop && 'h-[60px]'} ${isLaptop && 'h-[50px]'} ${isTab && 'h-[35px]'} mt-4 flex items-center gap-6 select-none`}>
            <button className={`cursor-pointer ${isDesktop && ' w-[45px] h-[45px] rounded-[15px] ml-10 border-3 hover:scale-110'} ${isLaptop && ' w-[35px] h-[35px] rounded-[10px] ml-8 border-2 hover:scale-108'} ${isTab && ' w-[25px] h-[25px] rounded-[5px] ml-6 border hover:scale-106'} flex justify-center items-center hover:bg-blue-600 ease-in-out duration-400 will-change-transform bg-blue-500 ${DarkMode? 'border-white text-white':'border-black text-black'}`} onClick={(e)=>{e.preventDefault();navigate('/administrator')}}><ChevronLeft className={`${isDesktop && 'scale-150'} ${isLaptop && 'scale-130'} ${isTab && 'scale-110'}`}/></button>
            <div className={`ease-in-out duration-400 ${isDesktop && ' w-[150px] h-[50px] rounded-[15px] border-3 text-[24px]'} ${isLaptop && ' w-[130px] h-[40px] rounded-[10px] border-2 text-[20px]'} ${isTab && ' w-[90px] h-[30px] rounded-[6px] border text-[16px]'} flex justify-center items-center font-bold quicksand-shit bg-blue-400 ${DarkMode? 'border-white':'border-black'}`}>Projects</div>
        </aside>

        <aside className={`w-full h-[calc(100vh-146px)] flex justify-center items-center`}>
            <section className={`w-[99%] h-[98%] flex flex-col items-center overflow-y-auto scrollbar-custom gap-20 py-10 scroll-mt-4`}>
                
                {isFetching?
                <>
                    <section className={`w-full h-full flex justify-center items-center`}>
                        <Spinner2/>
                    </section>
                </>
                :
                <>
                    {Projects.length > 0 ? 
                    <>
                        {Projects.map((proj,index)=>(
                            <div key={index} className={`${isDesktop && 'w-[80%] rounded-[15px] p-4 gap-4 border-4 hover:scale-105'} ${isLaptop && ' w-[80%] rounded-[10px] p-3 gap-3 border-3 hover:scale-104'} ${isTab && ' w-[80%] rounded-[6px] p-2 gap-2 border-2 hover:scale-103'} overflow-hidden group relative ease-in-out duration-400 will-change-transform shrink-0 flex flex-col ${DarkMode?'border-white shadow-[0_0_40px_2px_white]':'border-black shadow-[0_0_40px_2px_black]'}`}>
                    
                                <div className={`w-full h-full inset-0 absolute -translate-x-full group-hover:translate-x-full ease-in-out duration-400 ${DarkMode?'bg-gradient-to-r from-transparent via-white/30 to-transparent':'bg-gradient-to-r from-transparent via-blue-100 to-transparent'}`}></div>
                                
                                <div className={`w-full ${isDesktop && 'h-[50px] pl-8 gap-14'} ${isLaptop && 'h-[30px] pl-8 gap-8'} ${isTab && 'h-[24px] pl-8 gap-8'} flex items-center shrink-0`}>
                                    
                                    <div className={`${isDesktop && 'w-[50%] h-[40px] border-3 px-4 rounded-[10px]'} ${isLaptop && 'w-[50%] h-[30px] border-2 px-4 rounded-[6px]'} ${isTab && 'w-[50%] h-[22px] border px-4 rounded-[5px]'} shrink-0 flex bg-[#ff0054] ease-in-out duration-400 ${DarkMode?'border-white':'border-black'}`}>
                                        <div className={`${isDesktop && 'w-[100%] h-full text-[20px] pl-6 font-[600]'} ${isLaptop && 'w-[100%] h-full text-[15px] pl-6 font-[500]'} ${isTab && 'w-[100%] h-full text-[9px] pl-6 font-[500]'} select-none flex items-center quicksand-shit`}>
                                            Project ID &nbsp;:-&nbsp; {proj.projectID}
                                        </div>
                                    </div>
                                    <div className={`${isDesktop && 'w-[40%] h-[40px] border-3 rounded-[10px] '} ${isLaptop && 'w-[40%] h-[30px] border-2 rounded-[6px] '} ${isTab && 'w-[40%] h-[22px] border rounded-[5px] '} shrink-0 flex px-4 bg-[#8b5cf6] ease-in-out duration-400 ${DarkMode?'border-white':'border-black'}`}>
                                        <div className={`${isDesktop && 'w-[100%] h-full text-[20px] font-[600]'} ${isLaptop && 'w-[100%] h-full text-[16px] font-[500]'} ${isTab && 'w-[100%] h-full text-[10px] font-[500]'} select-none flex justify-center items-center quicksand-shit`}>
                                            Upload Date &nbsp;:-&nbsp; {proj.ProjectUploadDate}
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <div className={`w-full ${isDesktop && 'h-[50px] pl-8 gap-14'} ${isLaptop && 'h-[30px] pl-8'} ${isTab && 'h-[24px] pl-8'} flex items-center shrink-0`}>
                                    
                                    <div className={`w-[95%] ${isDesktop && 'h-[40px] border-3 rounded-[10px] px-4'} ${isLaptop && 'h-[30px] border-2 rounded-[6px] px-4'} ${isTab && 'h-[22px] border rounded-[5px] px-4'} shrink-0 flex bg-[#ffd60a] ease-in-out duration-400 ${DarkMode?'border-white':'border-black'}`}>
                                        <div className={`${isDesktop && 'text-[20px] font-[600]'} ${isLaptop && 'text-[16px] font-[500]'} ${isTab && 'text-[12px] font-[400]'} select-none w-[100%] h-full flex items-center quicksand-shit pl-6`}>
                                            Project Title &nbsp;:- &nbsp; {proj.title}
                                        </div>
                                    </div>

                                </div>
                                
                                <div className={`${isDesktop && 'w-full h-[50px] pl-8'} ${isLaptop && 'w-full h-[30px] pl-8'} ${isTab && 'w-full h-[24px] pl-8'} flex items-center shrink-0`}>
                                    
                                    <div className={`w-[95%] ${isDesktop && 'h-[40px] border-3 rounded-[10px] px-4'} ${isLaptop && 'h-[30px] border-2 rounded-[6px] px-4'} ${isTab && 'h-[22px] border rounded-[5px] px-4'} shrink-0 flex ease-in-out duration-400 ${DarkMode?'border-white':'border-black'} ${proj.ProjectGithubLink?.toLowerCase().includes("private") ? 'bg-red-400':'bg-[#2ec4b6]'}`}>
                                        <div className={`select-none w-[100%] h-full ${isDesktop && 'text-[20px] font-[600] pl-6'} ${isLaptop && 'text-[16px] font-[500] pl-6'} ${isTab && 'text-[12px] font-[400] pl-6'} flex items-center quicksand-shit `}>
                                            GitHub Code Link &nbsp;:- &nbsp; {proj.ProjectGithubLink}
                                        </div>
                                    </div>

                                </div>

                                <div className={`w-full ${isDesktop && 'h-[50px] pr-15 gap-10'} ${isLaptop && 'h-[40px] pr-15 gap-8'} ${isTab && 'h-[30px] pr-10 gap-6'} flex justify-end items-center shrink-0`}>
                                    
                                    <button className={`will-change-transform select-none ${isDesktop && 'hover:scale-108 border-3 h-[44px] rounded-[10px] text-[22px] font-[500]'} ${isLaptop && 'hover:scale-108 border-2 h-[34px] rounded-[8px] text-[18px] font-[500]'} ${isTab && 'hover:scale-106 border h-[26px] rounded-[6px] text-[14px] font-[400]'} ease-in-out duration-300 cursor-pointer bg-blue-400  w-[14%] flex justify-center items-center quicksand-shit ${DarkMode?'border-white':'border-black'}`} onClick={(e)=>{e.preventDefault();navigate('/administrator/update-content',{state: proj.projectID})}}>Update</button>
                                    <button className={`will-change-transform select-none ${isDesktop && 'hover:scale-108 border-3 h-[44px] rounded-[10px] text-[22px] font-[500]'} ${isLaptop && 'hover:scale-108 border-2 h-[34px] rounded-[8px] text-[18px] font-[500]'} ${isTab && 'hover:scale-106 border h-[26px] rounded-[6px] text-[14px] font-[400]'} ease-in-out duration-300 cursor-pointer bg-[#d90429] w-[14%] flex justify-center items-center quicksand-shit ${DarkMode?'border-white':'border-black'}`} onClick={(e)=>{e.preventDefault();navigate('/administrator/content-change-confirmation',{state: {Message:"Delete Project",ProjectID:proj.projectID}})}}>Delete</button>

                                </div>

                            </div>
                        ))}
                    </>:
                    <>
                        <section className={`w-full h-full flex justify-center items-center quicksand-shit font-extrabold text-[18px] ${DarkMode?'text-white':'text-black'}`}>
                            Nothing Here...
                        </section>
                    </>}
                </>}

            </section>
        </aside>

    </section>
  )
}

export default ProjectsList