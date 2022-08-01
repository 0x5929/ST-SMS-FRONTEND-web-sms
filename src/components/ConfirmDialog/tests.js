import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ConfirmDialog from './component' 


afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks()
    cleanup()
});

describe('testing confirm dialog component', () => {

    const confirmDialog = {
        isOpen: true,
        title: 'test title',
        subTitle: 'test subtitle',
        onConfirm: jest.fn()
    }

    const confirmDialogHandlers = {
        handleUnconfirmed: jest.fn()
    }
    it('should render confirm dialog component', () => {

        render(
            <ConfirmDialog 
                confirmDialog={confirmDialog} 
                confirmDialogHandlers={confirmDialogHandlers}
            />)

        expect(screen.getByTestId('confirmDialog'))
        expect(screen.getByText(/test title/i))
        expect(screen.getByText(/test subtitle/i))
    })

    it('should call unConfirm when No is pressed.', () => {

        const unConfirmMk = jest.spyOn(confirmDialogHandlers, 'handleUnconfirmed')
        render(
            <ConfirmDialog 
                confirmDialog={confirmDialog} 
                confirmDialogHandlers={{handleUnconfirmed : unConfirmMk()}}
            />)
            
        userEvent.click(screen.getByText(/no/i))
        expect(unConfirmMk).toHaveBeenCalledTimes(1)

    })

    it('should call onConfirm when Yes is pressed.', () => {
        const onConfirmMk = jest.spyOn(confirmDialog, 'onConfirm')
        render(
            <ConfirmDialog 
                confirmDialog={{...confirmDialog, onConfirm: onConfirmMk()}} 
                confirmDialogHandlers={confirmDialogHandlers}
            />)

        userEvent.click(screen.getByText(/yes/i))
        expect(onConfirmMk).toHaveBeenCalledTimes(1)
    
    })
    
})