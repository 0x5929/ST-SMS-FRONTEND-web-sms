import { useToggle } from './'

const useCircularProgress = () => {
    const [ progressOn, setProgressOn ] = useToggle(false)

    // callback: func, callbackArgs: arr
    const handleCircularProgress = async (callback, callbackArgs) => {

        setProgressOn(true)
        
        try {
            const response = await callback(...callbackArgs)
            return response
        }
        catch (err) {
            console.error(err)
            throw err
        }
        finally {
            setProgressOn(false)
        }


    }

    // note: the last handler func setProgressOn is exported here in case other modules need to impolement a custom progressHandler, 
    // whereas the handleCircularProgress is a generic way to handle CircularProgress
    return [progressOn, handleCircularProgress, setProgressOn]


}

export default useCircularProgress