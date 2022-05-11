import React from 'react';
import { useScrollToTop } from '../../../hooks';

import Styles from './styles'

export default function BackToTopButton(props) {

    const {
        handleClick,
        showScroll,
    } = useScrollToTop()
    
    return (
        <Styles.Zoom in={showScroll} >
            <Styles.Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                <Styles.Fab 
                    color="secondary" 
                    size="small" 
                    aria-label="scroll back to top"
                >
                    <Styles.KeyboardArrowUpIcon />
                </Styles.Fab>
            </Styles.Box>
      </Styles.Zoom>
    )
}