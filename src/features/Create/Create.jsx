import React from "react"
import { Paper as MuiPaper } from '@mui/material'

import CreateStudent from './CreateStudent'
import createCreateFeatureStyles from './styles'
import Components from '../../components'
import { useNotification } from '../../hooks'


const Styles = createCreateFeatureStyles({
    MuiPaper,
    BaseTypography: Components.BaseTypography
})

function Create() {
    console.log('Create feature rendered')

    const [notify, notificationHandlers] = useNotification(Components.NotificationSlide)


    return (
        <Styles.Paper>        
            <Styles.Typography
                text="CREATE NEW STUDENT RECORD"
                align='center'
            />
            <CreateStudent 
                notify={notify} 
                notificationHandlers={notificationHandlers} />
            <Components.Notification 
                notify={notify}
                notificationHandlers={notificationHandlers}
            />
        </Styles.Paper>
    )
}

export default React.memo(Create)