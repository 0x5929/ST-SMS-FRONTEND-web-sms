import { useEffect, useCallback } from 'react';
import useToggle from './useToggle';

export default function useScrollToTop() {

    const [ showScroll, setShowScroll ] = useToggle(false)

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
    },
    [setShowScroll])

    return [ handleClick, showScroll ]
}