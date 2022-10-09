import React from 'react'
import {  Box as MuiBox, Zoom } from '@mui/material'
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material'

import createBackToTopStyles from './styles'
import  Components  from '../../../components';
import { useScrollToTop } from '../../../hooks'

const Styles = createBackToTopStyles({
    MuiBox,
    BaseFab: Components.BaseFab
})

function BackToTopButton(props) {
    
    const [ showScroll, handleClick ] = useScrollToTop()
    
    return (
        <Zoom data-testid="mui-zoom-transition" in={showScroll} >
            <Styles.FabBox
                onClick={handleClick}
                role="presentation"
            >
                <Styles.Fab 
                    color="secondary" 
                    size="small" 
                    aria-label="scroll back to top"
                >
                    <KeyboardArrowUpIcon />
                </Styles.Fab>
            </Styles.FabBox>
      </Zoom>
    )
}

export default React.memo(BackToTopButton)