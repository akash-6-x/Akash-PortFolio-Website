import { useContext, useRef, useState } from "react";
import { DarkModeContextAPI } from "../../../Context/DarkModeContext";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../Backend/firebase";
import { MediaQueriesAPI } from "../../../Context/MediaQueries";
import { AuthContextAPI } from "../../../Context/AuthContext";

const ContentChangePage = () => {

    let navigate = useNavigate();
    let {DarkMode} = useContext(DarkModeContextAPI)
    let {isDesktop,isLaptop,isTab} = useContext(MediaQueriesAPI)
    let {authUser} = useContext(AuthContextAPI)
    let [BackButtonFocused,setBackButtonFocused] = useState(false);
    let [confirmation,setConfirmation] = useState("");
    let [DeleteButtonFocused,setDeleteIconFocused] = useState(false);
    let SubmitRef = useRef(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    let {state} = useLocation();
    const projectID = state.ProjectID
    
    let HandleSubmit = async (e)=>{
        e.preventDefault();
        if(SubmitRef.current) return;
        if(isSubmitting) return;
        if(!authUser) return;
        setIsSubmitting(true);
        SubmitRef.current = true;
        try
        {
            if (confirmation !== "Delete-Content")
            {
                toast.error("Confirmation Text does not match ... Try again ... 😐");
                setIsSubmitting(false);
                SubmitRef.current = false;
                setDeleteIconFocused(false)
                setConfirmation("");
                return;
            }
            if(projectID.length != 20 || projectID.includes(' ') || projectID == null || projectID == "")
            {
                toast.error("Invalid or Empty Project ID ... Try again ... 😐")
                setIsSubmitting(false);
                SubmitRef.current = false;
                setDeleteIconFocused(false)
                return;
            }; 
            // console.log("Value:",projectID);
            let docRef = doc(db,"Projects_Collection",projectID)
            let Doc = await getDoc(docRef)
            if(Doc.exists())
            {
                await deleteDoc(docRef);
                toast.success("Project was Successfully Deleted ..! 😭")
                setConfirmation("")
                navigate('/administrator/projects-list')
            }
            else
            {
                toast.error("No Project found for that project ID 🥲")
            }
            setIsSubmitting(false);
            SubmitRef.current = false;
            setDeleteIconFocused(false)

        }
        catch(error)
        {
            toast.error(`Error:${error.message}`)
            console.log("Error : ",error);
            setIsSubmitting(false);
            SubmitRef.current = false;
            setDeleteIconFocused(false)
        }

    }

  return (
    <>
        {(isDesktop || isLaptop) && 
        <>
            <button onFocus={()=>{setBackButtonFocused(true)}} onBlur={()=>{setBackButtonFocused(false)}} onClick={(e)=>{e.preventDefault();navigate('/administrator/projects-list')}} title='Go Back' type='button' className={`${BackButtonFocused && 'shadow-[0_0_10px_6px_blue]'} absolute w-[40px] h-[40px] left-20 top-26 rounded-[10px] border-2 ${DarkMode ? 'border-white text-white':'border-black text-black' } flex justify-center items-center pr-1 hover:bg-blue-400 ease-in-out duration-400 cursor-pointer hover:scale-105`}><ChevronLeft className='scale-140'/></button>
            <section className={`select-none w-[800px] h-[300px] duration-400 rounded-md border-2 ${DarkMode ? 'border-white':'border-black'}`}>
                <div className={`w-full h-[18%] duration-400 border-b-2 rounded-t-md flex justify-center items-center text-[24px] font-extrabold quicksand-shit ${DarkMode ? 'text-white':'text-black'}`}>Delete Project</div>
                <form onSubmit={HandleSubmit} className={`${DarkMode ? 'text-white':'text-black'} w-full h-[calc(100%-18%)] flex flex-col gap-6 rounded-b-md px-6 pt-6`}>
                    <label htmlFor="projectID" className={`text-[22px] duration-400 font-extrabold quicksand-shit`}>Type &nbsp;' Delete-Content '&nbsp; to Delete</label>
                    <input onChange={(e)=>{setConfirmation(e.target.value);}} id="confirmation" value={confirmation} name="confirmation" type="text" className={` duration-400 ${DarkMode ? 'border-white text-white':'border-black text-black' } ml-4 border-2 w-[94.5%] h-[20%] rounded-md text-center text-[20px] font-medium quicksand-shit`} onDragStart={(e)=>{e.preventDefault();}} onDrop={(e)=>{e.preventDefault();}} onCut={(e)=>{e.preventDefault();}} onPaste={(e)=>{e.preventDefault();}} onCopy={(e)=>{e.preventDefault();}} />
                    <div className={`w-full h-[80px] flex justify-end items-center px-6`}>
                        <button disabled={ isSubmitting || SubmitRef.current } onFocus={()=>{setDeleteIconFocused(true)}} onBlur={()=>{setDeleteIconFocused(false)}} type="submit" className={`${DeleteButtonFocused && 'shadow-[0_0_10px_6px_blue]'} ${DarkMode ? 'border-white text-white':'border-black text-black' } w-[160px] h-[50px] border-2 rounded-md ${(isSubmitting || SubmitRef.current) ? 'bg-red-300':'bg-red-500'} text-[20px] flex justify-center items-center quicksand-shit font-semibold cursor-pointer hover:scale-106 ease-in-out duration-400 will-change-transform`}>Delete Project</button>
                    </div>
                </form>
            </section>
        </>}

        {isTab && 
        <>
            <button onFocus={()=>{setBackButtonFocused(true)}} onBlur={()=>{setBackButtonFocused(false)}} onClick={(e)=>{e.preventDefault();navigate('/administrator')}} title='Go Back' type='button' className={`${BackButtonFocused && 'shadow-[0_0_10px_6px_blue]'} absolute w-[30px] h-[30px] left-8 top-24 rounded-[10px] border-2 ${DarkMode ? 'border-white text-white':'border-black text-black' } flex justify-center items-center pr-1 hover:bg-blue-400 ease-in-out duration-400 cursor-pointer hover:scale-105`}><ChevronLeft className='scale-140'/></button>
            <section className={`select-none w-[500px] h-[250px] duration-400 rounded-md border-2 ${DarkMode ? 'border-white':'border-black'}`}>
                <div className={`w-full h-[16%] duration-400 border-b-2 rounded-t-md flex justify-center items-center text-[20px] font-extrabold quicksand-shit ${DarkMode ? 'text-white':'text-black'}`}>Delete Project</div>
                <form onSubmit={HandleSubmit} className={`${DarkMode ? 'text-white':'text-black'} w-full h-[calc(100%-18%)] flex flex-col gap-6 rounded-b-md px-6 pt-6`}>
                    <label htmlFor="projectID" className={`text-[18px] duration-400 font-extrabold quicksand-shit`}>Type &nbsp;' Delete-Content '&nbsp; to Delete</label>
                    <input onChange={(e)=>{setConfirmation(e.target.value);}} id="confirmation" value={confirmation} name="confirmation" type="text" className={` duration-400 ${DarkMode ? 'border-white text-white':'border-black text-black' } ml-4 border-2 w-[94.5%] h-[20%] rounded-md text-center text-[17px] quicksand-shit`} onDragStart={(e)=>{e.preventDefault();}} onDrop={(e)=>{e.preventDefault();}} onCut={(e)=>{e.preventDefault();}} onPaste={(e)=>{e.preventDefault();}} onCopy={(e)=>{e.preventDefault();}} />
                    <div className={`w-full h-[80px] flex justify-end items-center px-6`}>
                        <button disabled={ isSubmitting || SubmitRef.current } onFocus={()=>{setDeleteIconFocused(true)}} onBlur={()=>{setDeleteIconFocused(false)}} type="submit" className={`${DeleteButtonFocused && 'shadow-[0_0_10px_6px_blue]'} ${DarkMode ? 'border-white text-white':'border-black text-black' } w-[150px] h-[40px] border-2 rounded-md ${(isSubmitting || SubmitRef.current) ? 'bg-red-300':'bg-red-500'} text-[18px] flex justify-center items-center quicksand-shit font-semibold cursor-pointer hover:scale-106 ease-in-out duration-400 will-change-transform`}>Delete Project</button>
                    </div>
                </form>
            </section>
        </>}
    </>
  )
}

export default ContentChangePage