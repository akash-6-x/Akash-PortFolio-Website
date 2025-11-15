import { useContext, useState } from "react"
import { DarkModeContextAPI } from "../../../Context/DarkModeContext"
import { ArrowUp, Plus, Trash } from "lucide-react"
import { MediaQueriesAPI } from "../../../Context/MediaQueries"
import { useNavigate } from "react-router-dom"
import { _auth } from "../../../../Backend/firebase"


const AdminInitialContent = () => {

    let {DarkMode} = useContext(DarkModeContextAPI)
    let {isDesktop,isLaptop,isTab} = useContext(MediaQueriesAPI);
    let [AddIconFoucsed,setAddIconFocused] = useState(false);
    let [UpdateIconFoucsed,setUpdateIconFocused] = useState(false);
    let [DeleteIconFoucsed,setDeleteIconFocused] = useState(false);

    let navigate = useNavigate();
    let AddPage = () => {
        navigate('add-content')
    }
    let UpdatePage = () => {
        navigate('projects-list')
    }
    let DeletePage = () => {
        navigate('delete-content')
    }

    let UserName = _auth?.currentUser?.email.split('@')[0];

  return (
    <>
        {isDesktop && <>

            <section className={`select-none z-10 w-[100%] h-[10%] ${DarkMode?'text-white':'text-black'} text-[28px] flex justify-center items-center font-semibold quicksand-shit duration-400`}>
                <p>Hello {UserName} 👋 You can now customize the Contents...</p>
            </section>

            <section className={`z-10 w-[100%] h-[11%] flex justify-center items-center gap-14`}>
                
                <button type="button" className={`${AddIconFoucsed && 'shadow-[0_0_10px_6px_blue]'} cursor-pointer hover:scale-110 ease-in-out duration-400 will-change-transform bg-green-400 flex shrink-0 justify-center items-center border-2 w-[190px] h-[55px] rounded-[16px] select-none ${DarkMode?'text-white border-white':'text-black border-black'}`} onFocus={()=>{setAddIconFocused(true)}} onBlur={()=>{setAddIconFocused(false)}} onClick={AddPage}>
                    <div className={`w-[80%] h-[70%] flex`}>
                        <div className="w-[40%] h-full flex justify-center items-center text-[18px]"><Plus /></div>
                        <div className="w-[60%] h-full flex items-center text-[22px] font-bold quicksand-shit">Add</div>
                    </div>
                </button>

                <button type="button" className={`${UpdateIconFoucsed && 'shadow-[0_0_10px_6px_blue]'} cursor-pointer hover:scale-110 ease-in-out duration-400 will-change-transform bg-blue-400 flex shrink-0 justify-center items-center border-2 w-[290px] h-[55px] rounded-[16px] select-none ${DarkMode?'text-white border-white':'text-black border-black'}`} onFocus={()=>{setUpdateIconFocused(true)}} onBlur={()=>{setUpdateIconFocused(false)}} onClick={UpdatePage}>
                    <div className={`w-[90%] h-[70%] flex justify-center`}>
                        <div className={`w-[45%] h-full flex pl-2 gap-1`}>
                            <div className="w-[20%] h-full flex justify-center items-center text-[18px]"><ArrowUp /></div>
                            <div className="w-[80%] h-full flex items-center text-[21px] font-bold quicksand-shit">Update</div>
                        </div>
                        <div className={`w-[10%] h-full flex justify-center items-center text-[31px] font-bold quicksand-shit`}>/</div>
                        <div className={`w-[45%] h-full flex pl-2 gap-1`}>
                            <div className="w-[20%] h-full flex justify-center items-center text-[18px]"><Trash /></div>
                            <div className="w-[80%] h-full flex justify-center items-center text-[21px] font-bold quicksand-shit">Delete</div>
                        </div>
                    </div>
                </button>
                
            </section>

        </>
        }

        {(isLaptop || isTab) && <>

            <section className={`select-none shrink-0 w-[100%] h-[10%] ${DarkMode?'text-white':'text-black'} ${isLaptop?'text-[24px]':'text-[22px]'} flex justify-center items-center font-semibold quicksand-shit duration-400`}>
                <p>Hello {UserName} 👋 You can now customize the Contents...</p>
            </section>

            <section className={`w-[100%] h-[12%] flex justify-center items-center gap-10`}>
                
                <button type="button" className={`${AddIconFoucsed && 'shadow-[0_0_10px_6px_blue]'} cursor-pointer hover:scale-110 ease-in-out duration-400 will-change-transform bg-green-400 flex justify-center items-center border-2 w-[160px] h-[50px] rounded-[16px] select-none ${DarkMode?'text-white border-white':'text-black border-black'}`} onFocus={()=>{setAddIconFocused(true)}} onBlur={()=>{setAddIconFocused(false)}} onClick={AddPage}>
                    <div className={`w-[80%] h-[70%] flex`}>
                        <div className="w-[40%] h-full flex justify-center items-center text-[18px]"><Plus /></div>
                        <div className="w-[60%] h-full flex items-center text-[22px] font-bold quicksand-shit">Add</div>
                    </div>
                </button>

                <button type="button" className={`${UpdateIconFoucsed && 'shadow-[0_0_10px_6px_blue]'} cursor-pointer hover:scale-110 ease-in-out duration-400 will-change-transform bg-blue-400 flex shrink-0 justify-center items-center border-2 w-[290px] h-[50px] rounded-[16px] select-none ${DarkMode?'text-white border-white':'text-black border-black'}`} onFocus={()=>{setUpdateIconFocused(true)}} onBlur={()=>{setUpdateIconFocused(false)}} onClick={UpdatePage}>
                    <div className={`w-[90%] h-[70%] flex justify-center`}>
                        <div className={`w-[45%] h-full flex pl-2 gap-1`}>
                            <div className="w-[20%] h-full flex justify-center items-center text-[18px]"><ArrowUp /></div>
                            <div className="w-[80%] h-full flex items-center text-[21px] font-bold quicksand-shit">Update</div>
                        </div>
                        <div className={`w-[10%] h-full flex justify-center items-center text-[31px] font-bold quicksand-shit`}>/</div>
                        <div className={`w-[45%] h-full flex pl-2 gap-1`}>
                            <div className="w-[20%] h-full flex justify-center items-center text-[18px]"><Trash /></div>
                            <div className="w-[80%] h-full flex justify-center items-center text-[21px] font-bold quicksand-shit">Delete</div>
                        </div>
                    </div>
                </button>
                
            </section>
        </>
        }

        
    </>
  )
}

export default AdminInitialContent