import { useState, useEffect, useCallback } from 'react';

export default function useScrollToTop() {

    const [ showScroll, setShowScroll ] = useState(false)

    const handleClick = useCallback((event) => {
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
    }, [])



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