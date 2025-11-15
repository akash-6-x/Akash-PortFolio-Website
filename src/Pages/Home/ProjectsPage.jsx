import { useContext, useEffect, useState } from 'react'
import { DarkModeContextAPI } from './../../Context/DarkModeContext';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../Backend/firebase';
import '../../scrollbar.css'
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Spinner2 from '../../utilities/Spinner2';
import { MediaQueriesAPI } from '../../Context/MediaQueries';
import PageDeviceReject from './../Admin/PageDeviceReject';
import { toast } from 'sonner';

const ProjectsPage = () => {

    let {DarkMode} = useContext(DarkModeContextAPI);
    let navigate = useNavigate();
    let [BackButtonFocused,setBackButtonFocused] = useState(false);
    let [Projects,setProjects] = useState([]);
    let [isFetching,setisFetching] = useState(true);
    let {isDesktop,isLaptop,isTab,isMobile,isSmall,isVerySmall} = useContext(MediaQueriesAPI)


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
            toast.error("Projects Data Fetched Successfully...")
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
    <>
        <section className={`relative w-full h-full ${isVerySmall?'':'p-6'} flex flex-col gap-4`}>

            {isVerySmall ?
                <>
                    <PageDeviceReject/>
                </>
                :
                <>
                
                    <button onFocus={()=>{setBackButtonFocused(true)}} onBlur={()=>{setBackButtonFocused(false)}} title='Go Back' type='button' className={`shrink-0 will-change-transform ${BackButtonFocused && 'shadow-[0_0_10px_6px_blue]'} absolute border-2 ${DarkMode ? 'border-white text-white':'border-black text-black' } flex justify-center items-center hover:bg-blue-400 ease-in-out duration-400 cursor-pointer hover:scale-105 ${isDesktop && 'w-[40px] h-[40px] left-10 top-8 rounded-[10px]'} ${isLaptop && 'w-[30px] h-[30px] left-10 top-7 rounded-[10px]'} ${isTab && 'w-[24px] h-[24px] left-8 top-7.5 rounded-[6px]'} ${isMobile && 'w-[30px] h-[30px] left-10 top-7 rounded-[8px]'} ${isSmall && 'w-[26px] h-[26px] left-7 top-7 rounded-[6px]'}`} onClick={(e)=>{e.preventDefault();navigate('/')}}><ChevronLeft className={` ${isDesktop? 'scale-140 mr-1':'scale-100 mr-0.5'} `}/></button>
                    <div className={`shrink-0 ${isDesktop ? 'w-[200px] h-[60px]':'w-[160px] h-[40px]'} ${isDesktop && 'ml-26 text-[22px]'} ${isLaptop && 'ml-20 text-[18px]'} ${isTab && 'ml-14 text-[16px] '} ${isMobile && 'ml-20 text-[14px]'} ${isSmall && 'ml-12 text-[14px]'} border-2 rounded-full font-extrabold quicksand-shit flex justify-center items-center ease-in-out duration-400 hover:scale-104 will-change-transform select-none shadow-[0_0_20px_8px_#8EC5FF] ${DarkMode?'text-white':'text-black'}`}>Projects Page</div>
                    <section className={`shrink-0 w-full h-[calc(100%-60px)] overflow-y-auto scrollbar-custom rounded-md ${isDesktop && 'py-14' } ${isSmall && 'py-6'} ${(isLaptop || isTab || isMobile) && 'py-10'} flex flex-col items-center gap-14`}>
                        {isFetching ? 
                            <>
                                <section className={`w-full h-full flex justify-center items-center quicksand-shit font-extrabold text-[18px] ${DarkMode?'text-white':'text-black'}`}>
                                    <Spinner2/>
                                </section>
                            </>
                            :
                            <>
                                {Projects.length > 0 ? 
                                    <>
                                        {Projects.map((proj , index ) => (
                                            <div key={index} className={`relative ${isDesktop && 'w-[1050px]'} ${isLaptop && 'w-[860px]'} ${isTab && 'w-[600px]'} ${isMobile && 'w-[400px]'} ${isSmall && 'w-[300px]'} rounded-[10px] border-2 will-change-transform duration-400 ease-in-out hover:scale-104 cursor-pointer ${DarkMode?'border-white':'border-black'} p-4 flex flex-col gap-4`}>
                                                    
                                                <div className={`flex ${(isMobile || isSmall) ? 'flex-col':'items-center'} gap-6`}>
		                                            <div onCopy={(e)=>{e.preventDefault()}} onCut={(e)=>{e.preventDefault()}} className={`whitespace-nowrap shrink-0 ${isDesktop && 'w-[700px] h-[40px]  text-[18px] px-4'} ${isLaptop && 'w-[700px] h-[40px]  text-[16px] px-4'} ${isTab && 'w-[400px] h-[34px] text-[12px] px-4'} ${isMobile && 'w-full h-[32px] text-[10px] px-4'} ${isSmall && 'w-full h-[32px] text-[9px] px-2'} border-2 rounded-md flex items-center bg-blue-400 ease-in-out duration-400 transition-color ${DarkMode?"text-white":"text-black"} select-none quicksand-shit font-semibold overflow-x-auto scrollbar-custom`}>
                                                            Project Title &nbsp;&nbsp;-&nbsp;&nbsp; {proj.title}
                                                    </div>
                                                    <div onCopy={(e)=>{e.preventDefault()}} onCut={(e)=>{e.preventDefault()}} className={`${isDesktop && 'w-[300px] h-[40px] text-[20px]'} ${isLaptop && 'w-[300px] h-[40px] text-[16px]'} ${isTab && 'w-[140px] h-[34px] text-[9px]'} ${isMobile && 'w-[200px] h-[32px] text-[10px]'} ${isSmall && 'w-[200px] h-[32px] text-[9px]'} border-2 rounded-md flex justify-center items-center bg-pink-500 ease-in-out duration-400 transition-color ${DarkMode?"text-white":"text-black"} select-none quicksand-shit font-semibold`}>
                                                        Uploaded Date : {proj.ProjectUploadDate}
                                                    </div>                  
                                                </div>


                                                <div className={`w-full border-2 rounded-md scrollbar-custom ease-in-out duration-400 transition-color ${DarkMode?'text-white bg-slate-800':'text-black bg-slate-300'} quicksand-shit font-semibold ${isDesktop && 'p-4 text-[18px]'} ${isLaptop && 'p-4 text-[16px]'} ${isTab && 'p-4 text-[12px]'} ${isMobile && 'p-3 text-[10px]'} ${isSmall && 'p-3 text-[9px]'}`}>
                                                    <div onCopy={(e)=>{e.preventDefault()}} onCut={(e)=>{e.preventDefault()}} className="font-bold mb-2 select-none underline leading-relaxed">
                                                            Project Description:
                                                    </div>
                                                    <pre className={`whitespace-pre-wrap ${isDesktop && 'px-10 max-h-50'} ${isLaptop && 'px-6 max-h-44'} ${isTab && 'px-6 max-h-36'} ${isMobile && 'px-2 max-h-30'} ${isSmall && 'px-2 max-h-24'} leading-relaxed overflow-y-auto scrollbar-custom`}>
                                                        {proj.description}
                                                    </pre>
                                                </div>

                                                <div className={`flex items-center ${(isMobile || isSmall) ? 'gap-4':'gap-6'}`}>
                                                    <div onCopy={(e)=>{e.preventDefault()}} onCut={(e)=>{e.preventDefault()}} className={`bg-blue-400 ${isDesktop && 'w-[150px] h-[40px] text-[20px]'} ${isLaptop && 'w-[150px] h-[40px] text-[16px]'} ${isTab && 'w-[150px] h-[40px] text-[12px]'} ${isMobile && 'w-[80px] h-[32px] text-[10px]'} ${isSmall && 'w-[80px] h-[32px] text-[9px]'} border-2 select-none rounded-md flex justify-center items-center ease-in-out duration-400 transition-color ${DarkMode?"text-white":"text-black"} quicksand-shit font-semibold`}>
                                                        GitHub Link :
                                                    </div>
                                                    <div className={`${isDesktop && 'w-[700px] h-[40px] text-[18px]'} ${isLaptop && 'w-[700px] h-[40px] text-[16px]'} ${isTab && 'w-[700px] h-[40px] text-[12px]'} ${isMobile && 'grow h-[32px] text-[10px]'} ${isSmall && 'grow h-[32px] text-[8px]'} border-2 rounded-md flex justify-center items-center ease-in-out duration-400 transition-color ${DarkMode?"text-white":"text-black"} quicksand-shit font-semibold overflow-x-auto px-4 ${proj.ProjectGithubLink?.toLowerCase().includes('private') ? 'bg-red-500':'bg-green-500'}`}>
                                                        {proj.ProjectGithubLink}
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                        
                                        </>
                                        :
                                        <>
                                            <section className={`w-full h-full flex justify-center items-center quicksand-shit font-extrabold ${isDesktop ? ' text-[18px]':' text-[16px]'} ${DarkMode?'text-white':'text-black'}`}>
                                                <div className={`${isDesktop?'px-6 py-4':'px-4 py-2'} border-2 rounded-full ease-in-out duration-400 will-change-transform hover:scale-104 cursor-pointer bg-blue-400`}>No Projects Here...&nbsp; 🫤</div>
                                            </section>
                                        </>}
                            </>
                        }

                        {(isMobile || isSmall) && <div className={`absolute bg-amber-300select-none text-gray-600 ${isMobile && 'text-[12px] bottom-2'} ${isSmall && 'text-[10px] bottom-1'}`}>&copy; Copyright 2025. All Rights Reserved.</div>}
                    </section>

                </>
            }

        </section>
    </>
  )
}

export default ProjectsPage