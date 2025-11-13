import { useContext, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { SpinnerContextAPI } from "../../../Context/SpinnerContext";
import Spinner from "../../../utilities/Spinner";
import { AuthContextAPI } from "../../../Context/AuthContext";
import { sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { _auth } from "../../../../Backend/firebase";


const LoginForm = () => {

    let [ isPasswordView , setisPasswordView ] = useState(false); // Password visible Eye icon State

    let [Email,setEmail] = useState(false);        // Email box hover animate state  
    let [Password,setPassword] = useState(false);  // Password box hover animate state

    let navigate = useNavigate();  // Navigate object

    let {isSpinner , setisSpinner} = useContext(SpinnerContextAPI)

    let initialData = {
        email : "",
        password : ""
    }

    let [formData,setFormData] = useState(initialData); // Form data state

    let {setauthUser,setJustLoggedIn} = useContext(AuthContextAPI)

    let HandleInputChange = (e) => {
        setFormData({
            ...formData,[e.target.name] : e.target.value
        })
        
    }

    let {email,password} = formData;

    let handleSubmit = async (e) => {
        e.preventDefault();
        try
        {
            setisSpinner(true);
            let LoginData = await signInWithEmailAndPassword(_auth,email,password);
            

            if (LoginData?.user){
                if(LoginData?.user?.emailVerified)
                {
                    // console.log("Email Status : ",LoginData?.user?.emailVerified);
                    
                    setisSpinner(false);
                    toast.success("Login Successful...")
                    setFormData(initialData); // Reset form data after successful login
                    // console.log("Login successful:", LoginData.user);
                    setauthUser(LoginData.user);
                    setJustLoggedIn(true);
                    setTimeout(()=>{
                        setJustLoggedIn(false);
                        navigate('/administrator');
                    },1900)
                }

                // else if(!LoginData.user.emailVerified)
                // {
                //     try {
                //         sendEmailVerification(LoginData.user)
                //         setTimeout(()=>{toast.info("Email verification Link has been Sent")},2000)
                //         setTimeout(()=>{toast.error("Email Unverified")},500)
                //         setisSpinner(false);
                        
                //     } catch (error) {
                //         toast.error("OOPS!... Failed to send Email Verification Link !")
                //         setisSpinner(false);
                //     }
                // }
            }
        }
        catch(error)
        {
            console.error("Login Failed : ", error);
            setisSpinner(false);
            toast.error("Login failed. Please check your credentials.");
        }
        
    }

  return (
    <>
        <main className={`select-none absolute w-[450px] h-[550px] rounded-[16px] flex justify-center items-center`}>
            <div className='w-[400px] h-[500px] rounded-[16px] flex flex-col'>
                <Toaster position="top-right"/>
                <span className=' w-full h-[60px] border-2 rounded-[10px] border-dashed text-[30px] font-bold flex justify-center items-center quicksand-shit underline'>Login</span>
                <form onSubmit={handleSubmit} className='w-full h-[calc(100%-60px)] flex flex-col gap-4 px-6 py-8'>
                    <label htmlFor='email' className='quicksand-shit font-semibold text-[18px]'>Email</label>
                    <input onChange={HandleInputChange} tabIndex={0} required type='email' id='email' name='email' placeholder='Enter Your Email' value={formData.email} className={`ease-in-out duration-400 will-change-transform cursor-pointer text-center text-[18px] font-medium quicksand-shit ml-12 w-[70%] h-[10%] border-2 rounded-[10px] ${Email && 'scale-[1.05]'}`} onDragStart={(e)=>{e.preventDefault();}} onDrop={(e)=>{e.preventDefault();}} onCut={(e)=>{e.preventDefault();}} onCopy={(e)=>{e.preventDefault();}} onPaste={(e)=>{e.preventDefault();}} onFocus={()=>{setEmail(true)}} onBlur={()=>{setEmail(false)}}></input>
                    <label htmlFor='password' className='quicksand-shit font-semibold text-[18px]'>Password</label>
                    <input onChange={HandleInputChange} tabIndex={0} required type={isPasswordView?'text':'password'} id='password' name='password' placeholder='Enter Your Password' value={formData.password} className={`ease-in-out duration-400 will-change-transform cursor-pointer text-center text-[18px] font-medium quicksand-shit ml-12 w-[70%] h-[10%] border-2 rounded-[10px] relative ${Password && 'scale-[1.05]'}`}  onDragStart={(e)=>{e.preventDefault();}}onDrop={(e)=>{e.preventDefault();}} onCut={(e)=>{e.preventDefault();}} onCopy={(e)=>{e.preventDefault();}} onPaste={(e)=>{e.preventDefault();}} onFocus={()=>{setPassword(true)}} onBlur={()=>{setPassword(false)}}></input>
                    <button type="button" className='absolute top-[266px] left-[360px] text-[20px] cursor-pointer will-change-transform ease-in-out duration-400 hover:scale-[1.1]' onClick={(e)=>{e.preventDefault();setisPasswordView(!isPasswordView)}}>{isPasswordView ? <LuEye />:<LuEyeOff />}</button>
                    <div className='w-full flex grow justify-between items-center px-2'>
						<button type="button" className='w-[40%] h-[25%] border-2 border-black rounded-[10px] bg-red-600 text-[18px] quicksand-shit font-medium text-white hover:scale-[1.03] ease-in-out duration-400 will-change-transform cursor-pointer' onClick={(e)=>{e.preventDefault();navigate('/')}}>Go Back</button>
						<button type="submit" className='w-[40%] h-[25%] border-2 border-black rounded-[10px] bg-green-600 text-[18px] quicksand-shit font-medium text-white hover:scale-[1.03] ease-in-out duration-400 will-change-transform cursor-pointer'>Submit</button>
                    </div>
                </form>
            </div>
        </main>
        {isSpinner && <Spinner/>}
    </>
  )
}

export default LoginForm