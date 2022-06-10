import React from 'react'
import Styles from './styles'

export default function Modal(props) {

    const { 
        modalTitle, 
        isModalOpen, 
        handleCloseModal, 
        children,

        ...others
       } = props;
    

    return (
        <Styles.Dialog 
            open={isModalOpen}
            maxWidth="laptop"
            onBackdropClick={handleCloseModal}
            fullWidth={true}

            { ...others }
        >
            <Styles.DialogTitle>
                <div style={{display: 'flex'}}>
                    <Styles.Typography
                        variant="h6"
                        component="div"
                        text={modalTitle}
                        style={{flexGrow:1}}
                    />
                    <Styles.IconButton 
                        variant="text"
                        size="small"
                        color="secondary"
                        onClick={handleCloseModal}
                    >
                        <Styles.CloseOutlinedIcon 
                            fontSize="small"
                            color="error"
                        />
                    </Styles.IconButton >
                </div>
            </Styles.DialogTitle>
            <Styles.DialogContent dividers>

                 { children }
            
            </Styles.DialogContent>

        </Styles.Dialog>
    
    )
}