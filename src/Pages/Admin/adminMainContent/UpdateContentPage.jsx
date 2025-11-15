import { ChevronLeft, Merge } from 'lucide-react'
import { useContext, useRef, useState } from 'react'
import { DarkModeContextAPI } from '../../../Context/DarkModeContext'
import { MediaQueriesAPI } from '../../../Context/MediaQueries';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../../../Backend/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import '../../../scrollbar.css';
import { AuthContextAPI } from '../../../Context/AuthContext';

const UpdateContentPage = () => {

    let navigate = useNavigate();
    let {DarkMode} = useContext(DarkModeContextAPI);
    let {isDesktop,isLaptop,isTab} = useContext(MediaQueriesAPI)
    let {authUser} = useContext(AuthContextAPI)
    let {state} = useLocation();

    

    let initialFormData = {
        projectID:state,
        title:"",
        description:"",
        ProjectGithubLink:"",
        ProjectUploadDate:""
    }
    
    let [formData , setformData] = useState(initialFormData)
    let [BackButtonFocused,setBackButtonFocused] = useState(false);
    let [ClearButtonFocused,setClearButtonFocused] = useState(false);
    let [SaveButtonFocused,setSaveButtonFocused] = useState(false);
    let SubmitRef = useRef(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    
    let HandleInputChange = (e) => {
        setformData({...formData,[e.target.name] : e.target.value})
            
    }

    let HandleInputClear = ()=>{

        if(isSubmitting || SubmitRef.current) return;

        try
        {
            if(JSON.stringify(formData) == JSON.stringify(initialFormData))
            {
                toast.error("Form is Already in Clear State...")
            }
            else
            {
                setformData(initialFormData)
                toast.success("Form Data Cleared")
            }
        }
        catch (error)
        {
            toast.error("Error:",error)
        }


    }


    let HandleSubmit = async (e)=>{
        e.preventDefault();
        if(isSubmitting) return;
        if(SubmitRef.current) return;
        if(!authUser) return;
        if(formData.projectID.length != 20 || formData.projectID.includes(' ')) 
        {
            toast.error("Invalid ProjectID...try again...😐");
            return
        }
        setIsSubmitting(true);
        SubmitRef.current = true;
        // console.log("Form Data: ",formData);
        // console.log("Submitted");
        try {
            let docRef = doc(db,"Projects_Collection",formData?.projectID)
            let Doc = await getDoc(docRef)
            if(Doc.exists())
            {

                let hasDataToUpdate = Object.keys(formData).filter(key => key !== "projectID").some(key => formData[key] !== null && formData[key] !== "")
                if(!hasDataToUpdate){
                    toast.error("Nothing to update! Fill at least one field 😑")
                    setIsSubmitting(false);
                    SubmitRef.current = false;
                    return
                }

                let Filtered_Data = {};
                Object.keys(formData).forEach(key => {
                if(formData[key] !== "" && formData[key] !== null)
                {
                    Filtered_Data[key] = formData[key];
                }
                });

                await updateDoc(docRef,Filtered_Data)
                setformData(initialFormData)
                toast.success("Project Updated with new Data...😀🎉")
            }
            else
                {
                    toast.error("Project ID Doesnt Exist...Try with different ID 😊")
                }
                
            setSaveButtonFocused(false)
            setIsSubmitting(false);
            SubmitRef.current = false;

        } catch (error) {
            toast.error("Error:",error)
            console.log("Error : ",error);
            setIsSubmitting(false);
            SubmitRef.current = false;
            setSaveButtonFocused(false)
        }
        
        
    }

  return (
    <>
        {isDesktop && 
            <>
                <button onFocus={()=>{setBackButtonFocused(true)}} onBlur={()=>{setBackButtonFocused(false)}} onClick={(e)=>{e.preventDefault();navigate('/administrator/projects-list')}} title='Go Back' type='button' className={`${BackButtonFocused && 'shadow-[0_0_10px_6px_blue]'} absolute w-[40px] h-[40px] left-20 top-26 rounded-[10px] border-2 ${DarkMode ? 'border-white text-white':'border-black text-black' } flex justify-center items-center pr-1 hover:bg-blue-400 ease-in-out duration-400 cursor-pointer hover:scale-105`}><ChevronLeft className='scale-140'/></button>
                <section className={`w-[800px] h-[600px] border-2 rounded-[20px] overflow-hidden ${DarkMode ? 'border-white':'border-black'}`}>
                    <div className={`w-full h-[60px] quicksand-shit rounded-t-[18px] font-extrabold text-[26px] flex justify-center items-center select-none border-b-2 border-black ${DarkMode ? 'text-white border-white':'text-black border-black'}`}>Update Projects Here...</div>
                    <form onSubmit={HandleSubmit} className={`w-full h-[calc(100%-60px)] px-6 pt-8 pb-10 flex flex-col gap-8  overflow-y-auto rounded-b-[18px] scrollbar-custom ${DarkMode ? 'border-white':'border-black'}`}>
                        <label htmlFor="projectID" className={`select-none quicksand-shit text-[22px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project ID :</label>
                        <input tabIndex={-1} readOnly contentEditable="false" required onDragStart={(e)=>{e.preventDefault();}} onDrop={(e)=>{e.preventDefault();}} onCut={(e)=>{e.preventDefault();}} onPaste={(e)=>{e.preventDefault();}} onCopy={(e)=>{e.preventDefault();}} value={formData.projectID} name='projectID' type="text" id='projectID' placeholder='Enter the Project ID :' className={`pointer-events-none quicksand-shit font-[500] shrink-0 border-2 w-[700px] h-[50px] ml-4 rounded-[10px] text-center text-[20px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                        <label htmlFor="title" className={`select-none quicksand-shit text-[22px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Title :</label>
                        <input onChange={HandleInputChange} value={formData.title} name='title' type="text" id='title' placeholder='Enter the new Project name' className={`quicksand-shit font-[500] shrink-0 border-2 w-[700px] h-[50px] ml-4 rounded-[10px] text-center text-[20px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                        <label htmlFor="description" className={`select-none quicksand-shit text-[22px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Description :</label>
                        <textarea onChange={HandleInputChange} value={formData.description} name='description' id='description' placeholder='Enter the details about the project here ' className={`quicksand-shit font-[500] shrink-0 border-2 w-[700px] h-[200px] ml-4 rounded-[10px] p-4 text-[20px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`}/>
                        <lable htmlFor="ProjectGithubLink" className={`select-none quicksand-shit text-[22px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Github Link :</lable>
                        <input onChange={HandleInputChange} value={formData.ProjectGithubLink} name='ProjectGithubLink' type="text" id='ProjectGithubLink' placeholder='Enter the projects Github Link' className={`quicksand-shit font-[500] shrink-0 border-2 w-[700px] h-[50px] ml-4 text-center text-[20px] rounded-[10px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                        <label htmlFor="ProjectUploadDate" className={`select-none quicksand-shit text-[22px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Upload Date :</label>
                        <input onChange={HandleInputChange} value={formData.ProjectUploadDate} name='ProjectUploadDate' type="date" id='ProjectUploadDate' placeholder='Enter the project upload date' className={`quicksand-shit font-[500] shrink-0 border-2 w-[700px] h-[50px] ml-4 p-4 text-[20px] rounded-[10px] duration-400 ease-in-out ${DarkMode ? 'border-white text-white bg-slate-700':'border-black text-black'}`} />
                        <div className={`w-full h-[60px] shrink-0 flex justify-end items-center gap-10`}>
                            <button disabled={isSubmitting || SubmitRef.current} type='button' onFocus={()=>{setClearButtonFocused(true)}} onBlur={()=>{setClearButtonFocused(false)}} className={`${ClearButtonFocused && 'shadow-[0_0_10px_6px_blue]'} will-change-transform w-[160px] h-[50px] border-2 rounded-[10px] quicksand-shit hover:scale-110 ease-in-out duration-300 cursor-pointer text-[18px] ${isSubmitting?'bg-red-300':'bg-red-600'} font-semibold ${DarkMode? 'border-white text-white' : 'border-black text-black'}`} onClick={HandleInputClear}>Clear</button>
                            <button disabled={isSubmitting || SubmitRef.current} type='submit' onFocus={()=>{setSaveButtonFocused(true)}} onBlur={()=>{setSaveButtonFocused(false)}} className={`${SaveButtonFocused && 'shadow-[0_0_10px_6px_blue]'} will-change-transform w-[160px] h-[50px] border-2 rounded-[10px] quicksand-shit hover:scale-110 ease-in-out duration-300 cursor-pointer text-[18px] ${isSubmitting?'bg-green-300':'bg-green-600'} font-semibold ${DarkMode? 'border-white text-white' : 'border-black text-black'}`}>{(isSubmitting || SubmitRef.current)?'Saving...':'Save'}</button>
                        </div>
                    </form>
                </section>
            </>}

            {isLaptop && 
            <>
                <button onFocus={()=>{setBackButtonFocused(true)}} onBlur={()=>{setBackButtonFocused(false)}} title='Go Back' type='button' className={`${BackButtonFocused && 'shadow-[0_0_10px_6px_blue]'} absolute w-[30px] h-[30px] left-20 top-26 rounded-[6px] border-2 ${DarkMode ? 'border-white text-white':'border-black text-black' } flex justify-center items-center pr-0.5 hover:bg-blue-400 ease-in-out duration-400 cursor-pointer hover:scale-105`} onClick={(e)=>{e.preventDefault();navigate('/administrator')}}><ChevronLeft className='scale-110'/></button>
                <section className={`w-[600px] h-[400px] border-2 rounded-[20px] overflow-hidden ${DarkMode ? 'border-white':'border-black'}`}>
                    <div className={`w-full h-[60px] quicksand-shit rounded-t-[18px] font-extrabold text-[20px] flex justify-center items-center select-none border-b-2 border-black ${DarkMode ? 'text-white border-white':'text-black border-black'}`}>Update Projects Here...</div>
                    <form onSubmit={HandleSubmit} className={`w-full h-[calc(100%-60px)] px-8 pt-6 pb-8 flex flex-col gap-6 overflow-y-auto rounded-b-[14px] scrollbar-custom ${DarkMode ? 'border-white':'border-black'}`}>
                        <label htmlFor="projectID" className={`select-none quicksand-shit text-[18px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project ID :</label>
                        <input tabIndex={-1} readOnly contentEditable="false" required onChange={HandleInputChange} value={formData.projectID} name='projectID' type="text" id='projectID' placeholder='Enter the Project ID :' className={`pointer-events-none quicksand-shit font-[500] shrink-0 border-2 w-[500px] h-[40px] ml-4 rounded-[8px] text-center text-[18px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                        <label htmlFor="title" className={`select-none quicksand-shit text-[18px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Title :</label>
                        <input onChange={HandleInputChange} value={formData.title} name='title' type="text" id='title' placeholder='Enter the new Project name' className={`quicksand-shit font-[500] shrink-0 border-2 w-[500px] h-[40px] ml-4 rounded-[8px] text-center text-[18px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                        <label htmlFor="description" className={`select-none quicksand-shit text-[18px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Description :</label>
                        <textarea onChange={HandleInputChange} value={formData.description} name='description' id='description' placeholder='Enter the details about the project here ' className={`quicksand-shit font-[500] shrink-0 border-2 w-[500px] h-[150px] ml-4 rounded-[8px] p-4 text-[18px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`}/>
                        <label htmlFor="ProjectGithubLink" className={`select-none quicksand-shit text-[18px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Github Link :</label>
                        <input onChange={HandleInputChange} value={formData.ProjectGithubLink} name='ProjectGithubLink' type="text" id='ProjectGithubLink' placeholder='Enter the projects Github Link' className={`quicksand-shit font-[500] shrink-0 border-2 w-[500px] h-[40px] ml-4 text-center text-[18px] rounded-[8px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                        <label htmlFor="ProjectUploadDate" className={`select-none quicksand-shit text-[18px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Upload Date :</label>
                        <input onChange={HandleInputChange} value={formData.ProjectUploadDate} name='ProjectUploadDate' type="date" id='ProjectUploadDate' placeholder='Enter the project upload date' className={`quicksand-shit font-[500] shrink-0 border-2 w-[500px] h-[40px] ml-4 p-4 text-[18px] rounded-[8px] duration-400 ease-in-out ${DarkMode ? 'border-white text-white bg-slate-700':'border-black text-black'}`} />
                        <div className={`w-full h-[60px] shrink-0 flex justify-end items-center gap-8`}>
                            <button disabled={isSubmitting || SubmitRef.current} onFocus={()=>{setClearButtonFocused(true)}} onBlur={()=>{setClearButtonFocused(false)}} type='button' className={`${ClearButtonFocused && 'shadow-[0_0_10px_6px_blue]'} will-change-transform w-[120px] h-[40px] border-2 rounded-[8px] quicksand-shit ${isSubmitting?'bg-red-300':'bg-red-600'} hover:scale-108 ease-in-out duration-300 cursor-pointer text-[18px] font-semibold ${DarkMode? 'border-white text-white' : 'border-black text-black'}`} onClick={HandleInputClear}>Clear</button>
                            <button disabled={isSubmitting || SubmitRef.current} onFocus={()=>{setSaveButtonFocused(true)}} onBlur={()=>{setSaveButtonFocused(false)}} type='submit' className={`${SaveButtonFocused && 'shadow-[0_0_10px_6px_blue]'} will-change-transform w-[120px] h-[40px] border-2 rounded-[8px] quicksand-shit ${isSubmitting?'bg-green-300':'bg-green-600'} hover:scale-108 ease-in-out duration-300 cursor-pointer text-[18px] font-semibold ${DarkMode? 'border-white text-white' : 'border-black text-black'}`}>{(isSubmitting || SubmitRef.current)?'Saving...':'Save'}</button>
                        </div>
                    </form>
                </section>
            </>}

            {isTab && 
            <>
                <button onFocus={()=>{setBackButtonFocused(true)}} onBlur={()=>{setBackButtonFocused(false)}} title='Go Back' type='button' className={`${BackButtonFocused && 'shadow-[0_0_10px_6px_blue]'} absolute w-[24px] h-[24px] left-8 top-24 rounded-[4px] border-2 ${DarkMode ? 'border-white text-white':'border-black text-black' } flex justify-center items-center pr-0.5 hover:bg-blue-400 ease-in-out duration-400 cursor-pointer hover:scale-104 will-change-transform`} onClick={(e)=>{e.preventDefault();navigate('/administrator')}}><ChevronLeft/></button>
                <section className={`w-[450px] h-[370px] border-2 rounded-[10px] overflow-hidden ${DarkMode ? 'border-white':'border-black'}`}>
                    <div className={`w-full h-[40px] quicksand-shit rounded-t-[10px] font-extrabold text-[16px] flex justify-center items-center select-none border-b-2 border-black ${DarkMode ? 'text-white border-white':'text-black border-black'}`}>Update Projects Here...</div>
                    <form onSubmit={HandleSubmit} className={`w-full h-[calc(100%-40px)] px-8 pt-4 pb-4 border flex flex-col gap-4 overflow-y-auto rounded-b-[6px] scrollbar-custom ${DarkMode ? 'border-white':'border-black'}`}>
                        <label htmlFor="projectID" className={`select-none quicksand-shit text-[14px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project ID :</label>
                        <input tabIndex={-1} readOnly contentEditable="false" required onChange={HandleInputChange} value={formData.projectID} name='projectID' type="text" id='projectID' placeholder='Enter the Project ID :' className={`pointer-events-none quicksand-shit font-[500] shrink-0 border-2 w-[350px] h-[30px] ml-4 rounded-[5px] text-center text-[14px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                        <label htmlFor="title" className={`select-none quicksand-shit text-[14px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Title :</label>
                        <input onChange={HandleInputChange} value={formData.title} name='title' type="text" id='title' placeholder='Enter the new Project name' className={`quicksand-shit font-[500] shrink-0 border-2 w-[350px] h-[30px] ml-4 rounded-[5px] text-center text-[14px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                        <label htmlFor="description" className={`select-none quicksand-shit text-[14px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Description :</label>
                        <textarea onChange={HandleInputChange} value={formData.description} name='description' id='description' placeholder='Enter the details about the project here ' className={`quicksand-shit font-[500] shrink-0 border-2 w-[350px] h-[150px] ml-4 rounded-[5px] p-4 text-[14px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`}/>
                        <label htmlFor="ProjectGithubLink" className={`select-none quicksand-shit text-[14px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Github Link :</label>
                        <input onChange={HandleInputChange} value={formData.ProjectGithubLink} name='ProjectGithubLink' type="text" id='ProjectGithubLink' placeholder='Enter the projects Github Link' className={`quicksand-shit font-[500] shrink-0 border-2 w-[350px] h-[30px] ml-4 text-center text-[14px] rounded-[5px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                        <label htmlFor="ProjectUploadDate" className={`select-none quicksand-shit text-[14px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Upload Date :</label>
                        <input onChange={HandleInputChange} value={formData.ProjectUploadDate} name='ProjectUploadDate' type="date" id='ProjectUploadDate' placeholder='Enter the project upload date' className={`quicksand-shit font-[500] shrink-0 border-2 w-[350px] h-[30px] ml-4 px-4 text-[14px] rounded-[5px] duration-400 ease-in-out ${DarkMode ? 'border-white text-white bg-slate-700':'border-black text-black'}`} />
                        <div className={`w-full h-[60px] shrink-0 flex justify-end items-center gap-8`}>
                            <button disabled={isSubmitting || SubmitRef.current} onFocus={()=>{setClearButtonFocused(true)}} onBlur={()=>{setClearButtonFocused(false)}} type='button' className={`${ClearButtonFocused && 'shadow-[0_0_10px_6px_blue]'} will-change-transform w-[90px] h-[30px] border-2 rounded-[8px] quicksand-shit  ${isSubmitting?'bg-red-300':'bg-red-600'} hover:scale-108 ease-in-out duration-300 cursor-pointer text-[14px] font-semibold ${DarkMode? 'border-white text-white' : 'border-black text-black'}`} onClick={HandleInputClear}>Clear</button>
                            <button disabled={isSubmitting || SubmitRef.current} onFocus={()=>{setSaveButtonFocused(true)}} onBlur={()=>{setSaveButtonFocused(false)}} type='submit' className={`${SaveButtonFocused && 'shadow-[0_0_10px_6px_blue]'} will-change-transform w-[90px] h-[30px] border-2 rounded-[8px] quicksand-shit ${isSubmitting?'bg-green-300':'bg-green-600 '} hover:scale-108 ease-in-out duration-300 cursor-pointer text-[14px] font-semibold ${DarkMode? 'border-white text-white' : 'border-black text-black'}`}>{(isSubmitting || SubmitRef.current)?'Saving...':'Save'}</button>
                        </div>
                    </form>
                </section>
            </>}
      </>
  )
}

export default UpdateContentPage