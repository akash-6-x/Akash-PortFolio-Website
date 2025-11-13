import { useContext, useEffect, useRef, useState } from 'react';
import '../../../scrollbar.css';
import { DarkModeContextAPI } from './../../../Context/DarkModeContext';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { AuthContextAPI } from '../../../Context/AuthContext';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../../Backend/firebase';
import { MediaQueriesAPI } from '../../../Context/MediaQueries';

const AddContentPage = () => {


    const navigate = useNavigate();
    let [BackButtonFocused,setBackButtonFocused] = useState(false);
    let [ClearButtonFocused,setClearButtonFocused] = useState(false);
    let [SaveButtonFocused,setSaveButtonFocused] = useState(false);

    let {DarkMode} = useContext(DarkModeContextAPI)
    const [image, setImage] = useState(null);
    let initialFormData = {
        title:"",
        description:"",
        ProjectGithubLink:"",
        // ProjectPicture:"",
        ProjectUploadDate:""
    }
    let [formData , setformData] = useState(initialFormData)

    let HandleInputChange = (e) => {
        setformData({...formData,[e.target.name] : e.target.value})
        
    }
    
    // let ProjectPictureRef = useRef(null)
    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
        
    //     if (!file)
    //         { 
    //             setImage(null)
    //             return;
    //         } // user cancelled → do nothing
            
    //         if (file.type.startsWith("image/")) {
    //             setImage(URL.createObjectURL(file)); // preview
    //         } else {
    //             setImage(null);
    //             ProjectPictureRef.current.value = null
    //             toast.error("Please select a valid image file!",{position:"top-right"});
    //         }
    //     };
        
        // const HandleImageInput = ()=>{
        //     setImage(null);
        //     ProjectPictureRef.current.value = null
        // }
        
    let {authUser} = useContext(AuthContextAPI)
    let SubmitRef = useRef(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    let HandleSubmit = async (e)=>{
            
            e.preventDefault();
            try {
                
                if (isSubmitting || SubmitRef.current) return;
                if(!authUser) return;
                // console.log("Submitted");
                // console.log("Form Data:",formData);
                
                setIsSubmitting(true);
                SubmitRef.current = true;
                
                let ProjectID_Check_ref = collection(db,"Projects_Collection")
                await addDoc(ProjectID_Check_ref,formData)
                toast.success("Project Stored Successfully")
                
                let ClearFormDataAfterSubmit = {
                    title:"",
                    description:"",
                    ProjectGithubLink:"",
                    // ProjectPicture:"",
                    ProjectUploadDate:""
                }
                setformData(ClearFormDataAfterSubmit)
                setIsSubmitting(false);
                SubmitRef.current = false;
                setSaveButtonFocused(false)
                
                
                
            } 
            catch (error)
            {
                toast.error(error.message)
                console.log("Error : ",error);
                setIsSubmitting(false);
                SubmitRef.current = false;
                setSaveButtonFocused(false)
        
            }
            
    }

    let HandleInputClear = ()=>{

        if(isSubmitting || SubmitRef.current) return;
        let ClearFormData = {
            title:"",
            description:"",
            ProjectGithubLink:"",
            // ProjectPicture:"",
            ProjectUploadDate:""
        }

        try
        {
            if(JSON.stringify(formData) == JSON.stringify(ClearFormData))
            {
                toast.error("Form is Already in Clear State...")
            }
            else
            {
                setformData(ClearFormData)
                toast.success("Form Data Cleared")
            }
        }
        catch (error)
        {
            toast.error("Error:",error)
        }


    }
  
    let {isDesktop,isLaptop,isTab} = useContext(MediaQueriesAPI)

  return (
    <>
        {isDesktop && 
        <>
            <button onFocus={()=>{setBackButtonFocused(true)}} onBlur={()=>{setBackButtonFocused(false)}} title='Go Back' type='button' className={`${BackButtonFocused && 'shadow-[0_0_10px_6px_blue]'} absolute w-[40px] h-[40px] left-20 top-26 rounded-[10px] border-2 ${DarkMode ? 'border-white text-white':'border-black text-black' } flex justify-center items-center pr-1 hover:bg-blue-400 ease-in-out duration-400 cursor-pointer hover:scale-105`} onClick={(e)=>{e.preventDefault();navigate('/administrator')}}><ChevronLeft className='scale-140'/></button>
            <section className={`w-[800px] h-[600px] border-2 rounded-[20px] overflow-hidden ${DarkMode ? 'border-white':'border-black'}`}>
                <div className={`w-full h-[60px] quicksand-shit rounded-t-[18px] font-extrabold text-[26px] flex justify-center items-center select-none border-b-2 border-black ${DarkMode ? 'text-white border-white':'text-black border-black'}`}>Add Projects Here...</div>
                <form onSubmit={HandleSubmit} className={`w-full h-[calc(100%-60px)] px-6 pt-8 pb-10 flex flex-col gap-8 overflow-y-auto rounded-b-[18px] scrollbar-custom ${DarkMode ? 'border-white':'border-black'}`}>
                    <label htmlFor="title" className={`select-none quicksand-shit text-[22px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Title :</label>
                    <input required onChange={HandleInputChange} value={formData.title} name='title' type="text" id='title' placeholder='Enter the new Project name' className={`quicksand-shit font-[500] shrink-0 border-2 w-[700px] h-[50px] ml-4 rounded-[10px] text-center text-[20px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                    <label htmlFor="description" className={`select-none quicksand-shit text-[22px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Description :</label>
                    <textarea required onChange={HandleInputChange} value={formData.description} name='description' id='description' placeholder='Enter the details about the project here ' className={`quicksand-shit font-[500] shrink-0 border-2 w-[700px] h-[200px] ml-4 rounded-[10px] p-4 text-[20px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`}/>
                    <label htmlFor="ProjectGithubLink" className={`select-none quicksand-shit text-[22px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Github Link :</label>
                    <input required onChange={HandleInputChange} value={formData.ProjectGithubLink} name='ProjectGithubLink' type="text" id='ProjectGithubLink' placeholder='Enter the projects Github Link' className={`quicksand-shit font-[500] shrink-0 border-2 w-[700px] h-[50px] ml-4 text-center text-[20px] rounded-[10px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                    <label htmlFor="ProjectUploadDate" className={`select-none quicksand-shit text-[22px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Upload Date :</label>
                    <input required onChange={HandleInputChange} value={formData.ProjectUploadDate} name='ProjectUploadDate' type="date" id='ProjectUploadDate' placeholder='Enter the project upload date' className={`quicksand-shit font-[500] shrink-0 border-2 w-[700px] h-[50px] ml-4 p-4 text-[20px] rounded-[10px] duration-400 ease-in-out ${DarkMode ? 'border-white text-white bg-slate-700':'border-black text-black'}`} />
                    {/* <label htmlFor="ProjectPicture" className={`select-none quicksand-shit text-[22px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Picture :</label>
                    <div className={`relative shrink-0 w-[700px] ${image ? 'h-[200px]':'h-[80px]'} ml-4 rounded-[10px] flex gap-30 ${DarkMode ? 'border-white':'border-black'}`}>
                        <input required ref={ProjectPictureRef} name='ProjectPicture' type="file" accept='image/*' id='ProjectPicture' className={`absolute opacity-0 shrink-0 select-none cursor-pointer p-4 border-2 w-[230px] h-[60px] rounded-[10px] ${DarkMode ? 'text-white':'text-black'}`} onChange={handleImageChange}/>
                        <label htmlFor="ProjectPicture" className={`shrink-0 select-none cursor-pointer p-4 border-2 w-[230px] h-[60px] rounded-[10px] flex justify-center items-center font-semibold quicksand-shit text-[18px] ${DarkMode ? 'text-white':'text-black'}`}>{image ? "Change Image":"Upload Image"}</label>
                        {image && <img draggable="false" src={image} alt='preview' className={`select-none object-cover shrink-0 w-[250px] h-[200px] border-4 border-blue-400 rounded-[18px]`}/>}
                        {image && <div className={`absolute top-24 left-6 hover:scale-104 ease-in-out duration-300 will-change-transform font-semibold bg-red-400 quicksand-shit shrink-0 select-none cursor-pointer p-4 border-2 w-[180px] h-[60px] rounded-[10px] flex justify-center items-center ${DarkMode ? 'border-white text-white':'border-black text-black'}`} onClick={HandleImageInput}>Remove Image</div>}
                    </div> */}
                    <div className={`w-full h-[60px] shrink-0 flex justify-end items-center gap-10 ${image && 'mt-6'}`}>
                    <button disabled={isSubmitting || SubmitRef.current} onFocus={()=>{setClearButtonFocused(true)}} onBlur={()=>{setClearButtonFocused(false)}} type='button' className={`${ClearButtonFocused && 'shadow-[0_0_10px_6px_blue]'} will-change-transform w-[160px] h-[50px] border-2 rounded-[10px] quicksand-shit  ${isSubmitting?'bg-red-300':'bg-red-600'} hover:scale-110 ease-in-out duration-300 cursor-pointer text-[18px] font-semibold ${DarkMode? 'border-white text-white' : 'border-black text-black'}`} onClick={HandleInputClear}>Clear</button>
                    <button disabled={isSubmitting || SubmitRef.current} onFocus={()=>{setSaveButtonFocused(true)}} onBlur={()=>{setSaveButtonFocused(false)}} type='submit' className={`${SaveButtonFocused && 'shadow-[0_0_10px_6px_blue]'} will-change-transform w-[160px] h-[50px] border-2 rounded-[10px] quicksand-shit ${isSubmitting?'bg-green-300':'bg-green-600 '} hover:scale-110 ease-in-out duration-300 cursor-pointer text-[18px] font-semibold ${DarkMode? 'border-white text-white' : 'border-black text-black'}`}>{(isSubmitting || SubmitRef.current)?'Saving...':'Save'}</button>
                    </div>
                </form>
            </section>
        </>}

        {isLaptop && 
        <>
            <button onFocus={()=>{setBackButtonFocused(true)}} onBlur={()=>{setBackButtonFocused(false)}} title='Go Back' type='button' className={`${BackButtonFocused && 'shadow-[0_0_10px_6px_blue]'} absolute w-[30px] h-[30px] left-20 top-26 rounded-[6px] border-2 ${DarkMode ? 'border-white text-white':'border-black text-black' } flex justify-center items-center pr-0.5 hover:bg-blue-400 ease-in-out duration-400 cursor-pointer hover:scale-105`} onClick={(e)=>{e.preventDefault();navigate('/administrator')}}><ChevronLeft className='scale-110'/></button>
            <section className={`w-[600px] h-[400px] border-2 rounded-[20px] overflow-hidden ${DarkMode ? 'border-white':'border-black'}`}>
                <div className={`w-full h-[60px] quicksand-shit rounded-t-[18px] font-extrabold text-[20px] flex justify-center items-center select-none border-b-2 border-black ${DarkMode ? 'text-white border-white':'text-black border-black'}`}>Add Projects Here...</div>
                <form onSubmit={HandleSubmit} className={`w-full h-[calc(100%-60px)] px-8 pt-6 pb-8 flex flex-col gap-6 overflow-y-auto rounded-b-[14px] scrollbar-custom ${DarkMode ? 'border-white':'border-black'}`}>
                    <label htmlFor="title" className={`select-none quicksand-shit text-[18px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Title :</label>
                    <input required onChange={HandleInputChange} value={formData.title} name='title' type="text" id='title' placeholder='Enter the new Project name' className={`quicksand-shit font-[500] shrink-0 border-2 w-[500px] h-[40px] ml-4 rounded-[8px] text-center text-[18px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                    <label htmlFor="description" className={`select-none quicksand-shit text-[18px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Description :</label>
                    <textarea required onChange={HandleInputChange} value={formData.description} name='description' id='description' placeholder='Enter the details about the project here ' className={`quicksand-shit font-[500] shrink-0 border-2 w-[500px] h-[150px] ml-4 rounded-[8px] p-4 text-[18px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`}/>
                    <label htmlFor="ProjectGithubLink" className={`select-none quicksand-shit text-[18px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Github Link :</label>
                    <input required onChange={HandleInputChange} value={formData.ProjectGithubLink} name='ProjectGithubLink' type="text" id='ProjectGithubLink' placeholder='Enter the projects Github Link' className={`quicksand-shit font-[500] shrink-0 border-2 w-[500px] h-[40px] ml-4 text-center text-[18px] rounded-[8px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                    <label htmlFor="ProjectUploadDate" className={`select-none quicksand-shit text-[18px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Upload Date :</label>
                    <input required onChange={HandleInputChange} value={formData.ProjectUploadDate} name='ProjectUploadDate' type="date" id='ProjectUploadDate' placeholder='Enter the project upload date' className={`quicksand-shit font-[500] shrink-0 border-2 w-[500px] h-[40px] ml-4 p-4 text-[18px] rounded-[8px] duration-400 ease-in-out ${DarkMode ? 'border-white text-white bg-slate-700':'border-black text-black'}`} />
                    {/* <label htmlFor="ProjectPicture" className={`select-none quicksand-shit text-[22px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Picture :</label>
                    <div className={`relative shrink-0 w-[700px] ${image ? 'h-[200px]':'h-[80px]'} ml-4 rounded-[10px] flex gap-30 ${DarkMode ? 'border-white':'border-black'}`}>
                        <input required ref={ProjectPictureRef} name='ProjectPicture' type="file" accept='image/*' id='ProjectPicture' className={`absolute opacity-0 shrink-0 select-none cursor-pointer p-4 border-2 w-[230px] h-[60px] rounded-[10px] ${DarkMode ? 'text-white':'text-black'}`} onChange={handleImageChange}/>
                        <label htmlFor="ProjectPicture" className={`shrink-0 select-none cursor-pointer p-4 border-2 w-[230px] h-[60px] rounded-[10px] flex justify-center items-center font-semibold quicksand-shit text-[18px] ${DarkMode ? 'text-white':'text-black'}`}>{image ? "Change Image":"Upload Image"}</label>
                        {image && <img draggable="false" src={image} alt='preview' className={`select-none object-cover shrink-0 w-[250px] h-[200px] border-4 border-blue-400 rounded-[18px]`}/>}
                        {image && <div className={`absolute top-24 left-6 hover:scale-104 ease-in-out duration-300 will-change-transform font-semibold bg-red-400 quicksand-shit shrink-0 select-none cursor-pointer p-4 border-2 w-[180px] h-[60px] rounded-[10px] flex justify-center items-center ${DarkMode ? 'border-white text-white':'border-black text-black'}`} onClick={HandleImageInput}>Remove Image</div>}
                    </div> */}
                    <div className={`w-full h-[60px] shrink-0 flex justify-end items-center gap-8 ${image && 'mt-6'}`}>
                        <button disabled={isSubmitting || SubmitRef.current} onFocus={()=>{setClearButtonFocused(true)}} onBlur={()=>{setClearButtonFocused(false)}} type='button' className={`${ClearButtonFocused && 'shadow-[0_0_10px_6px_blue]'} will-change-transform w-[120px] h-[40px] border-2 rounded-[8px] quicksand-shit  ${isSubmitting?'bg-red-300':'bg-red-600'} hover:scale-108 ease-in-out duration-300 cursor-pointer text-[18px] font-semibold ${DarkMode? 'border-white text-white' : 'border-black text-black'}`} onClick={HandleInputClear}>Clear</button>
                        <button disabled={isSubmitting || SubmitRef.current} onFocus={()=>{setSaveButtonFocused(true)}} onBlur={()=>{setSaveButtonFocused(false)}} type='submit' className={`${SaveButtonFocused && 'shadow-[0_0_10px_6px_blue]'} will-change-transform w-[120px] h-[40px] border-2 rounded-[8px] quicksand-shit ${isSubmitting?'bg-green-300':'bg-green-600 '} hover:scale-108 ease-in-out duration-300 cursor-pointer text-[18px] font-semibold ${DarkMode? 'border-white text-white' : 'border-black text-black'}`}>{(isSubmitting || SubmitRef.current)?'Saving...':'Save'}</button>
                    </div>
                </form>
            </section>
        </>}

        {isTab && 
        <>
            <button onFocus={()=>{setBackButtonFocused(true)}} onBlur={()=>{setBackButtonFocused(false)}} title='Go Back' type='button' className={`${BackButtonFocused && 'shadow-[0_0_10px_6px_blue]'} absolute w-[24px] h-[24px] left-8 top-24 rounded-[4px] border-2 ${DarkMode ? 'border-white text-white':'border-black text-black' } flex justify-center items-center pr-0.5 hover:bg-blue-400 ease-in-out duration-400 cursor-pointer hover:scale-104 will-change-transform`} onClick={(e)=>{e.preventDefault();navigate('/administrator')}}><ChevronLeft/></button>
            <section className={`w-[450px] h-[370px] border-2 rounded-[10px] overflow-hidden ${DarkMode ? 'border-white':'border-black'}`}>
                <div className={`w-full h-[40px] quicksand-shit rounded-t-[10px] font-extrabold text-[16px] flex justify-center items-center select-none border-b-2 border-black ${DarkMode ? 'text-white border-white':'text-black border-black'}`}>Add Projects Here...</div>
                <form onSubmit={HandleSubmit} className={`w-full h-[calc(100%-40px)] px-8 pt-4 pb-0 border flex flex-col gap-4 overflow-y-auto rounded-b-[6px] scrollbar-custom ${DarkMode ? 'border-white':'border-black'}`}>
                    <label htmlFor="title" className={`select-none quicksand-shit text-[14px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Title :</label>
                    <input required onChange={HandleInputChange} value={formData.title} name='title' type="text" id='title' placeholder='Enter the new Project name' className={`quicksand-shit font-[500] shrink-0 border-2 w-[350px] h-[30px] ml-4 rounded-[5px] text-center text-[14px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                    <label htmlFor="description" className={`select-none quicksand-shit text-[14px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Description :</label>
                    <textarea required onChange={HandleInputChange} value={formData.description} name='description' id='description' placeholder='Enter the details about the project here ' className={`quicksand-shit font-[500] shrink-0 border-2 w-[350px] h-[150px] ml-4 rounded-[5px] p-4 text-[14px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`}/>
                    <label htmlFor="ProjectGithubLink" className={`select-none quicksand-shit text-[14px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Github Link :</label>
                    <input required onChange={HandleInputChange} value={formData.ProjectGithubLink} name='ProjectGithubLink' type="text" id='ProjectGithubLink' placeholder='Enter the projects Github Link' className={`quicksand-shit font-[500] shrink-0 border-2 w-[350px] h-[30px] ml-4 text-center text-[14px] rounded-[5px] ${DarkMode ? 'border-white text-white':'border-black text-black'}`} />
                    <label htmlFor="ProjectUploadDate" className={`select-none quicksand-shit text-[14px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Upload Date :</label>
                    <input required onChange={HandleInputChange} value={formData.ProjectUploadDate} name='ProjectUploadDate' type="date" id='ProjectUploadDate' placeholder='Enter the project upload date' className={`quicksand-shit font-[500] shrink-0 border-2 w-[350px] h-[30px] ml-4 px-4 text-[14px] rounded-[5px] duration-400 ease-in-out ${DarkMode ? 'border-white text-white bg-slate-700':'border-black text-black'}`} />
                    {/* <label htmlFor="ProjectPicture" className={`select-none quicksand-shit text-[22px] font-bold ${DarkMode ? 'text-white':'text-black'}`}>Project Picture :</label>
                    <div className={`relative shrink-0 w-[700px] ${image ? 'h-[200px]':'h-[80px]'} ml-4 rounded-[10px] flex gap-30 ${DarkMode ? 'border-white':'border-black'}`}>
                        <input required ref={ProjectPictureRef} name='ProjectPicture' type="file" accept='image/*' id='ProjectPicture' className={`absolute opacity-0 shrink-0 select-none cursor-pointer p-4 border-2 w-[230px] h-[60px] rounded-[10px] ${DarkMode ? 'text-white':'text-black'}`} onChange={handleImageChange}/>
                        <label htmlFor="ProjectPicture" className={`shrink-0 select-none cursor-pointer p-4 border-2 w-[230px] h-[60px] rounded-[10px] flex justify-center items-center font-semibold quicksand-shit text-[18px] ${DarkMode ? 'text-white':'text-black'}`}>{image ? "Change Image":"Upload Image"}</label>
                        {image && <img draggable="false" src={image} alt='preview' className={`select-none object-cover shrink-0 w-[250px] h-[200px] border-4 border-blue-400 rounded-[18px]`}/>}
                        {image && <div className={`absolute top-24 left-6 hover:scale-104 ease-in-out duration-300 will-change-transform font-semibold bg-red-400 quicksand-shit shrink-0 select-none cursor-pointer p-4 border-2 w-[180px] h-[60px] rounded-[10px] flex justify-center items-center ${DarkMode ? 'border-white text-white':'border-black text-black'}`} onClick={HandleImageInput}>Remove Image</div>}
                    </div> */}
                    <div className={`w-full h-[60px] shrink-0 flex justify-end items-center gap-8 ${image && 'mt-6'}`}>
                        <button disabled={isSubmitting || SubmitRef.current} onFocus={()=>{setClearButtonFocused(true)}} onBlur={()=>{setClearButtonFocused(false)}} type='button' className={`${ClearButtonFocused && 'shadow-[0_0_10px_6px_blue]'} will-change-transform w-[90px] h-[30px] border-2 rounded-[8px] quicksand-shit  ${isSubmitting?'bg-red-300':'bg-red-600'} hover:scale-108 ease-in-out duration-300 cursor-pointer text-[14px] font-semibold ${DarkMode? 'border-white text-white' : 'border-black text-black'}`} onClick={HandleInputClear}>Clear</button>
                        <button disabled={isSubmitting || SubmitRef.current} onFocus={()=>{setSaveButtonFocused(true)}} onBlur={()=>{setSaveButtonFocused(false)}} type='submit' className={`${SaveButtonFocused && 'shadow-[0_0_10px_6px_blue]'} will-change-transform w-[90px] h-[30px] border-2 rounded-[8px] quicksand-shit ${isSubmitting?'bg-green-300':'bg-green-600 '} hover:scale-108 ease-in-out duration-300 cursor-pointer text-[14px] font-semibold ${DarkMode? 'border-white text-white' : 'border-black text-black'}`}>{(isSubmitting || SubmitRef.current)?'Saving...':'Save'}</button>
                    </div>
                </form>
            </section>
        </>}
    </>
  )
}

export default AddContentPage