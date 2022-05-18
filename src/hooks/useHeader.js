import { useMediaQuery } from "@mui/material/";

export default function useHeader(){

    const isSmallerThanTablet = useMediaQuery(theme => theme.breakpoints.down('tablet'));
    const isSmallerThanLaptop = useMediaQuery(theme => theme.breakpoints.down('laptop'));

    let headerTitle = 'Student Mangement System'

    if (isSmallerThanTablet === true) headerTitle = 'SMS'
    else if (isSmallerThanLaptop === true) headerTitle = 'Student Management'


    return {
        headerTitle
    }
}
