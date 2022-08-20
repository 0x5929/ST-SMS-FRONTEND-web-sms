import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import { renderHook } from '@testing-library/react-hooks/dom' 

import { useNotification } from '../../hooks'

import Notification from './Notification'
import NotificationSlide from './NotificationSlide'


describe('testing notification component', () => {
    let notify, notificationHandlers
    let testByMethods
    
    function getNotificationResults() {
        const { result } = renderHook(() => useNotification(NotificationSlide))
        const [ notify, notificationHandlers ] = result.current

        return [ notify, notificationHandlers ]
    }

    beforeAll(() => {
        [ notify, notificationHandlers ] = getNotificationResults()
    
    
        testByMethods = (screen) => {
            return {
    
                getInput(labelText) {
                    return screen.getByLabelText(labelText)
                },
                getByTestId(testId) {
                    return screen.getByTestId(testId)
                },
                getByText(text){
                    return screen.getByText(text)
                },
                getAllByText(text) {
                    return screen.getAllByText(text)
                },
                queryByText(text) {
                    return screen.queryByText(text)
                },
                queryByTestId(testId) {
                    return screen.queryByTestId(testId)
                },
                getAllByTestId(testId) {
                    return screen.getAllByTestId(testId)
                }
            }
        }
    })
    
    
    afterAll(() => {
        notify = undefined
        notificationHandlers = undefined
        testByMethods = undefined
    })

////////////////////////////////////////////////////    

    let setup

    beforeEach(() => {
        
        setup = () => {

            const handleCloseMk = jest.spyOn(notificationHandlers, 'handleCloseNotification')

            const { rerender } = render(
                <Notification 
                    notify={notify}
                    notificationHandlers={notificationHandlers}
                />)

            return {
                ...(testByMethods(screen)),
                rerender,
                handleCloseMk,
            }
        }
    })

    afterEach(() => {
        setup = undefined
        jest.clearAllMocks()
        cleanup()
    })



    it('should not render notification components such as Snackbar and Alert when close', () => {
        const { queryByTestId, queryByText } = setup()

        expect(queryByTestId('mui-snackbar')).not.toBeInTheDocument()
        expect(queryByTestId('mui-alert')).not.toBeInTheDocument()
        expect(queryByText(/__TEST_ALERT__/i)).not.toBeInTheDocument() 
    })

    it('should render notification components such as Snackbar and Alert when open', () => {
        const { rerender, getByTestId, getByText } = setup()

        rerender(
            <Notification 
                notify={{...notify, isOpen: true, message: '__TEST_ALERT__'}}
                notificationHandlers={notificationHandlers}
            />
        )

        expect(getByTestId('mui-snackbar')).toBeInTheDocument()
        expect(getByTestId('mui-alert')).toBeInTheDocument()
        expect(getByText(/__TEST_ALERT__/i)).toBeInTheDocument()
    })


    // The test below cannot be done without having a context background that we can click on
    it('should trigger handleCloseNotification when clicked on backdrop', async () => {
        const { rerender, handleCloseMk } = setup()

        rerender(
            <Notification 
                notify={{...notify, isOpen: true, message: '__TEST_ALERT__'}}
                notificationHandlers={notificationHandlers}
            />
        )
        
        await userEvent.click(document.body)
        
        expect(handleCloseMk.mock.calls).toHaveLength(1)
    })

})