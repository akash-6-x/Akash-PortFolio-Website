import { useContext } from 'react'
import './Spinner.css'
import { DarkModeContextAPI } from './../Context/DarkModeContext';

const Spinner = () => {
  let {DarkMode} = useContext(DarkModeContextAPI)
  return (
    <>
        {/* <!-- From Uiverse.io by dovatgabriel -->  */}
        <div className={`z-20 absolute w-screen h-screen top-0 left-0 opacity-100 flex justify-center items-center ${DarkMode ? 'bg-slate-950' : 'bg-white'}`}>
            <div className='newtons-cradle'>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
            </div>
        </div>
    </>
  )
}

export default Spinner