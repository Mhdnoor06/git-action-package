import React from 'react';
import { useState } from 'react';
import './ReadMoreReadLess.css';
type propsType ={children:any , Limit:number}
const ReadMoreReadLess = ({children , Limit}:propsType)=> {
    const [isReadMore, setisReadMore] = useState(false);

    const ToggleBtn = ()=>{
        setisReadMore(prevState => !prevState)
    }

 return(
    <>
    {isReadMore ? (
        <>
            <div className="DescriptionBody">
            <div className='DescriptionBtn'>
                <button className='CloseBtn' onClick={ToggleBtn}>Close</button>
                <div className='ChildrenProp'>
                {children}
                </div>
            </div>
            </div>
        </>
    ): children?.substring(0,Limit)}
    <button className='ReadMoreBtn' onClick={ToggleBtn}>...ReadMore</button>
    </>
 )
    
  
}

export default ReadMoreReadLess;