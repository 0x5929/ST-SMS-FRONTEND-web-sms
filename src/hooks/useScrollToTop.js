import { useState, useEffect } from 'react';

export default function useScrollToTop() {

    const [ showScroll, setShowScroll ] = useState(false)

    const handleClick = (event) => {
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
      };



    useEffect(()=>{

        const checkForScroll = () => {
            if (window.pageYOffset > 50){
                setShowScroll(true)    
             }
             else{
                setShowScroll(false)    
             }  
        }
        window.addEventListener('scroll', checkForScroll);

        return () => window.removeEventListener('scroll', checkForScroll);
    }

    ,[])

    return [ handleClick, showScroll ]
}