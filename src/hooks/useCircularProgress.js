import { useToggle } from './'

const useCircularProgress = () => {
    const [ progressOn, setProgressOn ] = useToggle(false)

    // call a callback (if provided) and turn toggle to true or false
    const handleSetProgressStatus = async ({callback, callbackArgs, progressState}) => {

        try {
            if (callback) {
                const callbackReturned = await callback(...callbackArgs)
                return callbackReturned
            }
            setProgressOn(progressState)
            return true
        }
        catch(err) {
            console.error(err)
            throw err
        }
        finally {
            setProgressOn(progressState)
        }

    }


    return [progressOn, handleSetProgressStatus]


}

export default useCircularProgress