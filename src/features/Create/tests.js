import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import Components from '../../components'
import { useNotification } from '../../hooks'

import Create from './Create'
import CreateStudent from './CreateStudent'

describe('testing Create feature', () => {

    let testByMethods

    beforeAll(() => {

    
        testByMethods = (screen) => {
            return {
                getByTestId(testId) {
                    return screen.getByTestId(testId)
                },
                getByText(text) {
                    return screen.getByText(text)
                },
                getAllByText(text) {
                    return screen.getAllByText(text)
                },
                getByRole(role, options) {
                    return screen.getByRole(role, options)
                },
                getByDisplayValue(text) {
                    return screen.getByDisplayValue(text)
                },
                queryByDisplayValue(text) {
                    return screen.queryByDisplayValue(text)
                }
            }
        }
    })
    
    
    afterAll(() => {
        testByMethods= undefined
    })

    describe('testing Create component', () => {

        let setup
        

        beforeEach(() => {
            setup = () => {
    
                render(
                    <Create />
                )
    
                return {
    
                    ...(testByMethods(screen)),
                }
            }
        })
        afterEach(() => {
            setup = undefined
            jest.clearAllMocks()
            cleanup()
        
        })


        it('should render title of feature page', () => {
            const { getByText } = setup()
            expect(getByText(/CREATE NEW STUDENT RECORD/i)).toBeInTheDocument()
        })

        it('should render CreateStudent component', () => {
            const { getByTestId } = setup()
            expect(getByTestId('create-student-component')).toBeInTheDocument()

        })

        it('should render Notification component', () => {
            const { getByTestId } = setup()
            expect(getByTestId('notification-components')).toBeInTheDocument()
        })
    })

    describe('testing CreateStudent component', () => {

        let setup

        let notify, notificationHandlers

        function getNotificationResults() {
            const { result } = renderHook(() => useNotification(Components.NotificationSlide))
            return result.current
        }

        beforeEach(() => {

            ([ notify, notificationHandlers ] = getNotificationResults())

            setup = () => {
    
                render(
                    <CreateStudent 
                        notificationHandlers={notificationHandlers}
                        notify={notify}
                    />
                )
    
                return {
    
                    ...(testByMethods(screen)),
                }
            }
        })
        afterEach(() => {
            setup = undefined
            jest.clearAllMocks()
            cleanup()
        
        })

        it('should render StudentForm component', () => {})
    })
})