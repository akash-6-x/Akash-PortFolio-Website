import { useContext } from 'react'
import { MediaQueriesAPI } from '../../Context/MediaQueries';
import { SpinnerContextAPI } from '../../Context/SpinnerContext';

const PageDeviceReject = () => {

    let {isMobile, isLaptop, isTab, isDesktop, isSmall, isVerySmall} = useContext(MediaQueriesAPI);
    let {isSpinner} = useContext(SpinnerContextAPI)
  return (
    <>
        {!isSpinner && <>
            <section className='select-none w-screen h-screen flex justify-center items-center overflow-hidden'>
                <img draggable="false" src="/Fields.jpg" alt="" className="absolute w-full h-full object-cover z-0"/>
                <div className={`${isDesktop && 'text-[30px] leading-[60px]'} ${isLaptop && 'text-[28px] leading-[50px]'} ${isTab && 'text-[28px] leading-[50px]'} ${isMobile && 'text-[24px] leading-[40px]'} ${isSmall && 'text-[16px] leading-[40px]'} ${isVerySmall && 'text-[14px] leading-[30px]'} font-bold quicksand-shit z-10 w-[40%] h-[40%] rounded-[20px] flex justify-center items-center`}>
                    <p className="text-center">This Page Can't be Opened on Small Screen Devices.</p>
                </div>
            </section>
        </>}
    </>
  )
}

export default PageDeviceReject