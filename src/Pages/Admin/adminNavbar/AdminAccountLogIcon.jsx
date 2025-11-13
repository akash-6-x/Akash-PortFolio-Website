import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { MediaQueriesAPI } from "../../../Context/MediaQueries";
import { DarkModeContextAPI } from "../../../Context/DarkModeContext";
import { AuthContextAPI } from "../../../Context/AuthContext";
import { _auth } from "../../../../Backend/firebase";
import { signOut } from "firebase/auth";

const AdminAccountLogIcon = () => {
    let [isAccountFocused,setisAccountFocused] = useState(false);
    let {isDesktop,isLaptop,isTab} = useContext(MediaQueriesAPI);
    let {DarkMode} = useContext(DarkModeContextAPI);
    let {setauthUser,justLoggedOut,setJustLoggedOut} = useContext(AuthContextAPI)

    let navigate = useNavigate();
    let LogOut = async (e)=>{
      e.preventDefault();
      try {
        toast.success("Logout Successful...");
        setJustLoggedOut(true);
        await signOut(_auth);
        setauthUser(null);
        setTimeout(()=>{
          setJustLoggedOut(false);
          navigate('/admin')
        },1000)
      } catch (error) {
        toast.error("Logout failed. Please try again.");
        console.error("Logout error:", error);
      }
    }
  return (
    <aside className='w-[50%] h-full flex justify-end items-center pr-5'>
      <Toaster position="top-center" />
        <button role="button" tabIndex={0} title='' aria-label='Logo' className={`${DarkMode ? 'border-white':'border-black'} will-change-transform transform-gpu quicksand-shit font-bold text-[20px] cursor-pointer ease-in-out duration-400 ${isAccountFocused && 'shadow-[0_0_10px_4px_blue]'} ${isLaptop && 'w-30 h-9.5'} ${isTab && 'w-28 h-9'} ${isDesktop && 'w-32 h-10'} bg-blue-400 rounded-[10px] select-none flex shrink-0 justify-center items-center overflow-hidden border-2 hover:scale-[1.07] ease-in-out duration-400`} onFocus={()=>{setisAccountFocused(true)}} onBlur={()=>{setisAccountFocused(false)}} onClick={LogOut}>
            Logout
        </button>
    </aside>
  )
}

export default AdminAccountLogIcon