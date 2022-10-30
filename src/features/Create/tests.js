import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import { renderHook } from '@testing-library/react-hooks'

import { AuthContextProvider } from '../../contexts'
import Components from '../../components'
import { useNotification } from '../../hooks'
import Create from './Create'
import CreateStudent from './CreateStudent'
import * as SMSRecordService from '../../services/SMSRecordService'
import { sampleCourseOptions } from '../../services/data/studentData'

//import preview from 'jest-preview'

describe('testing Create feature', () => {

    let testByMethods

    beforeAll(() => {

    
        testByMethods = (screen) => {
            return {                
                getInput(labelText) {
                    return screen.getByLabelText(labelText)
                },
                getByTestId(testId) {
                    return screen.getByTestId(testId)
                },
                getAllByTestId(testId) {
                    return screen.getAllByTestId(testId)
                },
                getByText(text) {
                    return screen.getByText(text)
                },
                getAllByText(text) {
                    return screen.getAllByText(text)
                },
                queryByText(text) {
                    return screen.queryByText(text)
                },
                getByRole(role, options) {
                    return screen.getByRole(role, options)
                },  
                getAllByRole(role, options) {
                    return screen.getAllByRole(role, options)
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

            Object.defineProperty(window, "matchMedia", {
                writable: true,
                value: (query) => ({
                  media: query,
                  // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
                  matches: query === "(pointer: fine)",
                  onchange: () => {},
                  addEventListener: () => {},
                  removeEventListener: () => {},
                  addListener: () => {},
                  removeListener: () => {},
                  dispatchEvent: () => false,
                }),
              })

              
            // const getCourseOptionsMk = jest.spyOn(SMSRecordService, 'getCourseOptions')
            // getCourseOptionsMk.mockResolvedValueOnce(sampleCourseOptions)

            setup = () => {
    
                render(
                    <AuthContextProvider>
                        <Create />
                    </AuthContextProvider>
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
            const { getAllByTestId } = setup()

            // used to be just one notification bar component, but AuthContext also has one on the very upper level, therefore now there are two notification-components.
            expect(getAllByTestId('notification-components')).toHaveLength(2)
        })

        it('should render changes and errors when inputs change', async () => {
            
            const { getInput, getAllByRole, getByRole, getByText, getByTestId, queryByText, getAllByText } = setup()

            // 
            await userEvent.type(getInput(/student id/i), '__TEST__') 
            expect(getInput(/student id/i)).toHaveValue('__TEST__')
            expect(getByText('Please enter the correct format. ie: RO-CNA-10-1005-KR')).toBeInTheDocument()

            await userEvent.type(getInput(/first name/i), '__TEST__') 
            expect(getInput(/first name/i)).toHaveValue('__TEST__')

            await userEvent.clear(getInput(/first name/i))
            expect(getByText('This field is required.')).toBeInTheDocument()
            await userEvent.type(getInput(/first name/i), '__TEST__') 
            expect(getInput(/first name/i)).toHaveValue('__TEST__')


            await userEvent.type(getInput(/last name/i), '__TEST__') 
            expect(getInput(/last name/i)).toHaveValue('__TEST__')    

            await userEvent.clear(getInput(/last name/i))
            expect(getByText('This field is required.')).toBeInTheDocument()
            await userEvent.type(getInput(/last name/i), '__TEST__') 
            expect(getInput(/last name/i)).toHaveValue('__TEST__')

            await userEvent.type(getInput(/phone number/i), '__TEST__') 
            expect(getInput(/phone number/i)).toHaveValue('__TEST__')
            expect(getByText('Please enter the correct format. ie: xxx-xxx-xxxx')).toBeInTheDocument()

            await userEvent.type(getInput(/email/i), '__TEST__') 
            expect(getInput(/email/i)).toHaveValue('__TEST__')
            expect(getByText('Incorrect email format.')).toBeInTheDocument()

            await userEvent.type(getInput(/mailing address/i), '__TEST__') 
            expect(getInput(/mailing address/i)).toHaveValue('__TEST__')

            await userEvent.clear(getInput(/mailing address/i))
            expect(getByText('This field is required.')).toBeInTheDocument()
            await userEvent.type(getInput(/mailing address/i), '__TEST__') 
            expect(getInput(/mailing address/i)).toHaveValue('__TEST__')

   

            await userEvent.click(getAllByRole('button', {expanded: false})[0])
            await userEvent.click(getByText(/caregiver/i))
            expect(getAllByRole('button', {expanded: false})[0]).toHaveTextContent(/caregiver/i)

            
            await userEvent.click(getAllByRole('button', {expanded: false})[1])
            await userEvent.click(getByText(/cg rotation 9/i))
            expect(getAllByRole('button', {expanded: false})[1]).toHaveTextContent(/cg rotation 9/i)

            // clicking add rot button will launch the modal, assert render then close ADD ROTATION FORM TESTS
            await userEvent.click(getByRole('button', {name: ''}))
            expect(getByText('Add Rotation')).toBeInTheDocument()
            expect(getByTestId('rotation-form')).toBeInTheDocument()
            await userEvent.click(getByRole('button', {expanded: false}))
            await userEvent.click(getByText(/security guard/i))
            expect(getByRole('button', {expanded: false})).toHaveTextContent(/security guard/i)
            await userEvent.type(getInput(/rotation number/i), '__TEST__')
            expect(getByText('Only numeric format is allowed.')).toBeInTheDocument()
            await userEvent.click(getByTestId('rotation-form-cancel-btn'))
            expect(queryByText(/security guard/i)).not.toBeInTheDocument()
            expect(getInput(/rotation number/i)).toHaveValue('')
            await userEvent.click(getByTestId('CloseOutlinedIcon'))

            await userEvent.clear(getInput(/program start date/i))
            expect(getByText('This field is required.')).toBeInTheDocument()
            await userEvent.type(getInput(/program start date/i), '20220101')
            expect(getInput(/program start date/i)).toHaveValue('2022-01-01')

            await userEvent.clear(getInput(/program completion date/i))
            expect(getByText('This field is required.')).toBeInTheDocument()
            await userEvent.type(getInput(/program completion date/i), '20220101')
            expect(getInput(/program completion date/i)).toHaveValue('2022-01-01')

            await userEvent.clear(getInput(/date enrollment agreement signed/i))
            expect(getByText('This field is required.')).toBeInTheDocument()
            await userEvent.type(getInput(/date enrollment agreement signed/i), '20220101')
            expect(getInput(/date enrollment agreement signed/i)).toHaveValue('2022-01-01')
            
            await userEvent.type(getInput(/third party payer info/i), '__TEST__') 
            expect(getInput(/third party payer info/i)).toHaveValue('__TEST__')

            await userEvent.type(getInput(/course cost/i), '__TEST__') 
            expect(getInput(/course cost/i)).toHaveValue('__TEST__')

            await userEvent.type(getInput(/charges charged/i), '__TEST__') 
            expect(getInput(/charges charged/i)).toHaveValue('__TEST__')

            await userEvent.type(getInput(/charges paid/i), '__TEST__') 
            expect(getInput(/charges paid/i)).toHaveValue('__TEST__')
            expect(getAllByText('Please enter the correct format. ie: xxxx.xx')).toHaveLength(3)

            // adding input change tests for the checkbox and radio options

            await userEvent.click(getInput(/graduated/i))
            expect(getInput(/graduated/i)).toHaveProperty('checked', true)

            await userEvent.click(getInput(/passed first exam/i))
            expect(getInput(/passed first exam/i)).toHaveProperty('checked', true)

            await userEvent.click(getInput(/passed second or third exam/i))
            expect(getInput(/passed second or third exam/i)).toHaveProperty('checked', true)

            await userEvent.click(getInput(/employed/i))
            expect(getInput(/employed/i)).toHaveProperty('checked', true)

            await userEvent.click(getInput(/full-time/i))
            expect(getInput(/full-time/i).checked).toBe(true)
            expect(getInput(/part-time/i).checked).toBe(false)
            await userEvent.click(getInput(/part-time/i))
            expect(getInput(/full-time/i).checked).toBe(false)
            expect(getInput(/part-time/i).checked).toBe(true)

            await userEvent.type(getInput(/employment position/i), '__TEST__') 
            expect(getInput(/employment position/i)).toHaveValue('__TEST__')

            await userEvent.type(getInput(/place of employment/i), '__TEST__') 
            expect(getInput(/place of employment/i)).toHaveValue('__TEST__')

            await userEvent.type(getInput(/employment address/i), '__TEST__') 
            expect(getInput(/employment address/i)).toHaveValue('__TEST__')

            await userEvent.type(getInput(/starting wage/i), '__TEST__') 
            expect(getInput(/starting wage/i)).toHaveValue('__TEST__')

            await userEvent.type(getInput(/comments/i), '__TEST__') 
            expect(getInput(/comments/i)).toHaveValue('__TEST__')

            // note, only course and rotation select inptus are not tested for their error
            // since they don't have an error output
            //preview.debug()


        }, 50000) // longer timeout is needed, since this is a big test case

        it('should clear of all inputs when cancel is pressed', async () => {
            // copy from the test case above, but leave the clearing part, and then clear everything with cancel
            // which will get rid of (test these) error messages, all inputs except for date pickers, which will dispaly today's date
        
            const { getInput, getAllByRole, getByText, getByTestId, queryByText } = setup()

            await userEvent.type(getInput(/student id/i), '__TEST__') 
            await userEvent.type(getInput(/first name/i), '__TEST__')
            await userEvent.type(getInput(/last name/i), '__TEST__') 
            await userEvent.type(getInput(/phone number/i), '__TEST__') 
            await userEvent.type(getInput(/email/i), '__TEST__') 
            await userEvent.type(getInput(/mailing address/i), '__TEST__') 

            await userEvent.click(getAllByRole('button', {expanded: false})[0])
            await userEvent.click(getByText(/caregiver/i))
            await userEvent.click(getAllByRole('button', {expanded: false})[1])
            await userEvent.click(getByText(/cg rotation 9/i))

            await userEvent.clear(getInput(/program start date/i))
            await userEvent.type(getInput(/program start date/i), '20220101')
            await userEvent.clear(getInput(/program completion date/i))
            await userEvent.type(getInput(/program completion date/i), '20220101')
            await userEvent.clear(getInput(/date enrollment agreement signed/i))
            await userEvent.type(getInput(/date enrollment agreement signed/i), '20220101')
            
            await userEvent.type(getInput(/third party payer info/i), '__TEST__') 
            await userEvent.type(getInput(/course cost/i), '__TEST__') 
            await userEvent.type(getInput(/charges charged/i), '__TEST__') 

            await userEvent.click(getInput(/graduated/i))
            await userEvent.click(getInput(/passed first exam/i))
            await userEvent.click(getInput(/passed second or third exam/i))
            await userEvent.click(getInput(/employed/i))

            await userEvent.click(getInput(/full-time/i))

            await userEvent.type(getInput(/employment position/i), '__TEST__') 
            await userEvent.type(getInput(/place of employment/i), '__TEST__') 
            await userEvent.type(getInput(/employment address/i), '__TEST__') 
            await userEvent.type(getInput(/starting wage/i), '__TEST__')
            await userEvent.type(getInput(/comments/i), '__TEST__') 

            // clicking cancel button should clear all inputs and errors
            await userEvent.click(getByTestId('student-form-cancel-btn'))

            // assert all fields are cleared
            expect(getInput(/student id/i)).toHaveValue('')
            expect(getInput(/first name/i)).toHaveValue('')
            expect(getInput(/last name/i)).toHaveValue('')
            expect(getInput(/phone number/i)).toHaveValue('')
            expect(getInput(/email/i)).toHaveValue('')
            expect(getInput(/mailing address/i)).toHaveValue('')
            expect(queryByText(/caregiver/i)).not.toBeInTheDocument()
            expect(queryByText(/cg rotation 9/i)).not.toBeInTheDocument()
            expect(queryByText('2022-01-01')).not.toBeInTheDocument()
            expect(getInput(/third party payer info/i)).toHaveValue('')
            expect(getInput(/course cost/i)).toHaveValue('')
            expect(getInput(/charges charged/i)).toHaveValue('')
            expect(getInput(/graduated/i)).toHaveProperty('checked', false)
            expect(getInput(/passed first exam/i)).toHaveProperty('checked', false)
            expect(getInput(/passed second or third exam/i)).toHaveProperty('checked', false)
            expect(getInput(/employed/i)).toHaveProperty('checked', false)
            expect(getInput(/full-time/i).checked).toBe(false)
            expect(getInput(/employment position/i)).toHaveValue('')
            expect(getInput(/place of employment/i)).toHaveValue('')
            expect(getInput(/employment address/i)).toHaveValue('')
            expect(getInput(/starting wage/i)).toHaveValue('')
            expect(getInput(/comments/i)).toHaveValue('')

            // assert errors are cleared too
            expect(queryByText('Please enter the correct format. ie: RO-CNA-10-1005-KR')).not.toBeInTheDocument()
            expect(queryByText('This field is required.')).not.toBeInTheDocument()
            expect(queryByText('Please enter the correct format. ie: xxx-xxx-xxxx')).not.toBeInTheDocument()
            expect(queryByText('Incorrect email format.')).not.toBeInTheDocument()
            expect(queryByText('Please enter the correct format. ie: xxxx.xx')).not.toBeInTheDocument()

        }, 50000)

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

            const getCourseOptionsMk = jest.spyOn(SMSRecordService, 'getCourseOptions')
            getCourseOptionsMk.mockResolvedValueOnce(sampleCourseOptions)


            setup = () => {
    
                render(
                    <AuthContextProvider>
                        <CreateStudent 
                            notificationHandlers={notificationHandlers}
                            notify={notify}
                        />
                    </AuthContextProvider>
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

        it('should render StudentForm component', () => {
            const { getByTestId } = setup()
            expect(getByTestId('student-form')).toBeInTheDocument()
        })
    })
})