import { ChevronLeft } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { DarkModeContextAPI } from '../../../Context/DarkModeContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../../Backend/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { toast } from 'sonner'

const ProjectsList = () => {

    let {DarkMode} = useContext(DarkModeContextAPI)
    let navigate = useNavigate();
    let [Projects,setProjects] = useState([]);
    let [isFetching,setisFetching] = useState(true);
    
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
        
        <aside className={`w-full border h-[60px] mt-4 flex items-center gap-6 select-none`}>
            <button className={`cursor-pointer w-[45px] h-[45px] rounded-[15px] ml-10 border-3 flex justify-center items-center hover:bg-blue-600 hover:scale-110 ease-in-out duration-400 will-change-transform bg-blue-500 ${DarkMode? 'border-white text-white':'border-black text-black'}`} onClick={(e)=>{e.preventDefault();navigate('/administrator')}}><ChevronLeft className={`scale-150`}/></button>
            <div className={`ease-in-out duration-400 w-[150px] h-[50px] rounded-[15px] border-3 text-[24px] flex justify-center items-center font-bold quicksand-shit bg-blue-400 ${DarkMode? 'border-white':'border-black'}`}>Projects</div>
        </aside>

        <aside className={`w-full h-[calc(100vh-146px)] flex justify-center items-center`}>
            <section className={`w-[99%] h-[98%] flex flex-col items-center overflow-y-auto scrollbar-custom gap-20 py-10 scroll-mt-4`}>
                
                {isFetching?
                <>
                    <section className={`w-full h-full flex justify-center items-center quicksand-shit font-extrabold text-[18px] ${DarkMode?'text-white':'text-black'}`}>
                        Fetching...
                    </section>
                </>:
                <>
                    {Projects.length > 0 ? 
                    <>
                        {Projects.map((proj,index)=>(
                            <div key={index} className={`overflow-hidden group relative hover:scale-105 ease-in-out duration-400 will-change-transform w-[80%] h-[50%] shrink-0 rounded-[15px] flex flex-col p-4 gap-4 border-4 ${DarkMode?'border-white shadow-[0_0_40px_2px_white]':'border-black shadow-[0_0_40px_2px_black]'}`}>
                    
                                <div className={`w-full h-full inset-0 absolute -translate-x-full group-hover:translate-x-full ease-in-out duration-400 ${DarkMode?'bg-gradient-to-r from-transparent via-white/30 to-transparent':'bg-gradient-to-r from-transparent via-blue-100 to-transparent'}`}></div>
                                <div className={`w-full h-[50px] flex items-center pl-8 gap-14`}>
                                    
                                    <div className={`w-[50%] h-[40px] border-3 shrink-0 rounded-[10px] flex px-4 bg-[#ff0054] ease-in-out duration-400 ${DarkMode?'border-white':'border-black'}`}>
                                        <div className={`select-none w-[100%] h-full text-[20px] flex items-center pl-6 font-[600] quicksand-shit`}>
                                            Project ID &nbsp;:-&nbsp; {proj.projectID}
                                        </div>
                                    </div>
                                    <div className={`w-[40%] h-[40px] border-3 shrink-0 rounded-[10px] flex px-4 bg-[#8b5cf6] ease-in-out duration-400 ${DarkMode?'border-white':'border-black'}`}>
                                        <div className={`select-none w-[100%] h-full text-[20px] flex justify-center items-center font-[600] quicksand-shit`}>
                                            Upload Date &nbsp;:-&nbsp; {proj.ProjectUploadDate}
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <div className='w-full h-[50px] flex items-center pl-8 gap-14'>
                                    
                                    <div className={`w-[95%] h-[40px] border-3 shrink-0 rounded-[10px] flex px-4 bg-[#ffd60a] ease-in-out duration-400 ${DarkMode?'border-white':'border-black'}`}>
                                        <div className={`select-none w-[100%] h-full text-[20px] flex items-center font-[600] quicksand-shit pl-6`}>
                                            Project Title &nbsp;:- &nbsp; {proj.title}
                                        </div>
                                    </div>

                                </div>
                                
                                <div className='w-full h-[50px] flex items-center pl-8 gap-14'>
                                    
                                    <div className={`w-[95%] h-[40px] border-3 shrink-0 rounded-[10px] flex px-4 ease-in-out duration-400 ${DarkMode?'border-white':'border-black'} ${proj.ProjectGithubLink?.toLowerCase().includes("private") ? 'bg-red-400':'bg-[#2ec4b6]'}`}>
                                        <div className={`select-none w-[100%] h-full text-[20px] flex items-center font-[600] quicksand-shit pl-6 `}>
                                            GitHub Code Link &nbsp;:- &nbsp; {proj.ProjectGithubLink}
                                        </div>
                                    </div>

                                </div>

                                <div className='w-full h-[50px] flex justify-end items-center pr-15 gap-10'>
                                    
                                    <button className={`select-none hover:scale-108 ease-in-out duration-300 cursor-pointer bg-blue-400 border-3 w-[14%] h-full rounded-[10px] flex justify-center items-center text-[22px] quicksand-shit font-[500] ${DarkMode?'border-white':'border-black'}`} onClick={(e)=>{e.preventDefault();navigate('/administrator/update-content',{state: proj.projectID})}}>Update</button>
                                    <button className={`select-none hover:scale-108 ease-in-out duration-300 cursor-pointer bg-[#d90429] border-3 w-[14%] h-full rounded-[10px] flex justify-center items-center text-[22px] quicksand-shit font-[500] ${DarkMode?'border-white':'border-black'}`} onClick={(e)=>{e.preventDefault();navigate('/administrator/content-change-confirmation',{state: {Message:"Delete Project",ProjectID:proj.projectID}})}}>Delete</button>

                                </div>

                            </div>
                        ))}
                    </>:
                    <></>}
                </>}

            </section>
        </aside>

    </section>
  )
}

export default ProjectsList



{/*  */}