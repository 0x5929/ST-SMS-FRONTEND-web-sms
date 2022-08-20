import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from "@testing-library/user-event"

import Checkbox from './Checkbox'
import DatePicker from './DatePicker'
import Input from './Input'
import RadioGroup from './RadioGroup'
import Select from './Select'


describe('testing input components', () => {

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
                getByText(text){
                    return screen.getByText(text)
                },
                getAllByText(text) {
                    return screen.getAllByText(text)
                },
                queryByTestId(testId) {
                    return screen.queryByTestId(testId)
                },
                getAllByTestId(testId) {
                    return screen.getAllByTestId(testId)
                },
                getByRole(role, options) {
                    return screen.getByRole(role, options)
                }
            }
        }
    })
    
    
    afterAll(() => {
        testByMethods= undefined
    })

    describe('testing Checkbox component', () => {
        const name = '__TEST_CHECKBOX_NAME__'
        const label = '__TEST_CHECKBOX_LABEL__'
        const convertToDefaultEventParam = jest.fn()
        let clearFields = false
        

        let setup

        beforeEach(() => {
            
            setup = () => {

                const { rerender } = render(
                    <Checkbox 
                        name={name}
                        label={label}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                        clearFields={clearFields}
                    />)

                return {
                    ...(testByMethods(screen)),
                    rerender,
                    label
                }
            }
        })

        afterEach(() => {
            setup = undefined
            jest.clearAllMocks()
            cleanup()
        })

        it('should render a mui checkbox', () => {
            const { getByTestId } = setup()

            expect(getByTestId('mui-checkbox')).toBeInTheDocument()
        })

        it('should render a checkbox with the label', () => {
            const { getInput, label } = setup()

            expect(getInput(label)).toBeInTheDocument()
        })
    
        it('should change its values when input is changed', () => {
            const { getInput, label } = setup()
            const checkBox = getInput(label)

            checkBox.click()
            expect(checkBox).toHaveProperty('checked', true)
        })
    
        it('should clear checkbox field when clearField state is set to true', () => {
            // simulate check off the checkbox
            const { getInput, label, rerender } = setup()
            const checkBox = getInput(label)

            checkBox.click()

            // rerender with different prop, clearFields set to true
            rerender(
                <Checkbox 
                    name={name}
                    label={label}
                    convertToDefaultEventParam={convertToDefaultEventParam}
                    clearFields={true}
                />)

            expect(checkBox).toHaveProperty('checked', false)

        })
    })

    describe('testing DatePicker component', () => {

        const name = '__TEST_DATEPICKER_NAME__'
        const label = '__TEST_DATEPICKER_LABEL__'
        const errorHandler = jest.fn()
        const showError = false
        let clearFields = false
        const initialValue = new Date()
        const convertToDefaultEventParam = (name, value) => ({
            target: {
                name,
                value
            }
        })
        

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

            setup = () => {


                const { rerender } = render(
                    <DatePicker 
                        name={name}
                        label={label}
                        errorHandler={errorHandler}
                        showError={showError}
                        initialValue={initialValue}
                        convertToDefaultEventParam={convertToDefaultEventParam}
                        clearFields={clearFields}
                    />)

                return {
                    ...(testByMethods(screen)),
                    rerender,
                    errorHandler,
                    label
                }
            }
        })

        afterEach(() => {
            setup = undefined
            jest.clearAllMocks()
            delete window.matchMedia
            cleanup()
        })

        it('should render mui DatePicker component', () => {
            const { getByTestId } = setup()

            expect(getByTestId('mui-date-picker')).toBeInTheDocument()
        })

        it('should render datepicker with label', () => {
            const { getInput, label } = setup()

            expect(getInput(label)).toBeInTheDocument()
        })

        it('should change its values when input is changed',  async () => {
            const { getInput, label } = setup()
    
            const datePickerComp = await getInput(label)
            
            userEvent.clear(datePickerComp)   
            await userEvent.type(datePickerComp, '20220101', {delay: 1})

            expect(datePickerComp).toHaveValue('2022-01-01')


        })
        
        it('should reset datePicker field when clearField state is set to true', async () => {
            const { getInput, label, rerender } = setup()
    
            const datePickerComp = await getInput(label)
            
            userEvent.clear(datePickerComp)   
            await userEvent.type(datePickerComp, '20220101', {delay: 1})

            rerender(
                <DatePicker 
                    name={name}
                    label={label}
                    errorHandler={errorHandler}
                    showError={showError}
                    initialValue={initialValue}
                    convertToDefaultEventParam={convertToDefaultEventParam}
                    clearFields={true}
                />)

            
            var date = new Date();
            var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                                .toISOString()
                                .split("T")[0]

            expect(datePickerComp).toHaveValue(dateString)
        })

        // best way to test for error is at the feature level, and getBytext('errorText')
        it('should trigger errorHandler when input is empty', async () => {
            const { getInput, label, errorHandler} = setup()
    
            const datePickerComp = await getInput(label)
            
            userEvent.clear(datePickerComp)

            expect(datePickerComp).toHaveValue('')
            expect(errorHandler.mock.calls).toHaveLength(1)
        })
    })

    describe('testing Input/textfield component', () => {

        const name = '__TEST_TEXTFIELD_NAME__'
        const label = '__TEST_TEXTFIELD_LABEL__'
        const errorHandler = jest.fn()
        const showError = false
        let clearFields = false
        let setup

        beforeEach(() => {

            setup = () => {

                const { rerender } = render(
                    <Input 
                        name={name}
                        label={label}
                        errorHandler={errorHandler}
                        showError={showError}
                        clearFields={clearFields}
                    />)

                return {
                    ...(testByMethods(screen)),
                    rerender,
                    label
                }
            }
        })

        afterEach(() => {
            setup = undefined
            jest.clearAllMocks()
            cleanup()
        })


        it('should render text input with label', () => {
            const { getByTestId } = setup()
            expect(getByTestId('mui-textfield')).toBeInTheDocument()
        })

        it('should change its values when input is changed',  async () => {
            const { getByTestId } = setup()
            const textInput = getByTestId('mui-textfield')

            await userEvent.type(textInput, '__TEST__', {delay: 1})
            expect(textInput).toHaveValue('__TEST__')

        })

        it('should be cleared when clearField state is set to true', async () => {
            const { getByTestId, rerender } = setup()
            const textInput = getByTestId('mui-textfield')

            // first simulate typing into the textField
            await userEvent.type(textInput, '__TEST__', {delay: 1})
            expect(textInput).toHaveValue('__TEST__')

            rerender(
                <Input 
                    name={name}
                    label={label}
                    errorHandler={errorHandler}
                    showError={showError}
                    clearFields={true}
                />
            )

            expect(textInput).toHaveValue('')

        })


    })

    describe('testing RadioGroup component', () => {

        const name = '__TEST_RADIO_NAME__'
        const label = '__TEST_RADIO_LABEL__'
        const items = [
            {value: 'F', title: 'Full-time'},
            {value: 'P', title: 'Part-time'}
        ]

        let clearFields = false
        let setup

        beforeEach(() => {

            setup = () => {

                const { rerender } = render(
                    <RadioGroup 
                        name={name}
                        label={label}
                        clearFields={clearFields}
                        items={items}
                    />)

                return {
                    ...(testByMethods(screen)),
                    rerender
                }
            }
        })

        afterEach(() => {
            setup = undefined
            jest.clearAllMocks()
            cleanup()
        })


        it('should render RadioGroup component', () => {
            const { getByTestId } = setup()

            expect(getByTestId('mui-radiogroup')).toBeInTheDocument()
        })

        it('should render radio components depending on how many items passed in', () => {
            const { getAllByTestId } = setup()

            expect(getAllByTestId('mui-radio')).toHaveLength(items.length)
        })

        it('should change its values when one of the options is selected', () => {
            const { getInput } = setup()
            const fullTimeOpt = getInput(/full-time/i)
            const partTimeOpt = getInput(/part-time/i)

            expect(fullTimeOpt).toBeInTheDocument()
            expect(partTimeOpt).toBeInTheDocument()

            fullTimeOpt.click()
            expect(fullTimeOpt.checked).toBe(true)
            expect(partTimeOpt.checked).toBe(false)

            partTimeOpt.click()
            expect(fullTimeOpt.checked).toBe(false)
            expect(partTimeOpt.checked).toBe(true)

        })

        it('should clear its field when clearField state is set to true', () => {
            const { getInput, rerender } = setup()
            const fullTimeOpt = getInput(/full-time/i)
            const partTimeOpt = getInput(/part-time/i)

            fullTimeOpt.click()
            partTimeOpt.click()

            rerender(
                <RadioGroup 
                    name={name}
                    label={label}
                    clearFields={true}
                    items={items}
                />
            )

            expect(fullTimeOpt.checked).toBe(false)
            expect(partTimeOpt.checked).toBe(false)
        })
    })
    
    describe('testing Select component', () => {

        const name = '__TEST_SELECT_NAME__'
        const label = '__TEST_SELECT_LABEL__'
        const errorHandler = jest.fn()
        const handleChange = jest.fn()
        const showError = false
        const required = true
        const options = [
            {value: 'CNA', title: 'Certified Nurse Assistant'},
            {value: 'HHA', title: 'Home Health Aide'},
            {value: 'SG', title: 'Security Guard'},
            {value: 'CG', title: 'Caregiver'},
            {value: 'ESOL', title: 'English to Speakers of Other Language'},
            {value: 'BLS', title: 'Basic Life Support'},
            {value: 'HSFA', title: 'Heartsaver First Aid'},
        ]

        let setup

        beforeEach(() => {

            setup = () => {

                const { rerender } = render(
                    <Select 
                        name={name}
                        label={label}
                        errorHandler={errorHandler}
                        handleChange={handleChange}
                        showError={showError}
                        required={required}
                        options={options}
                    />)

                return {
                    ...(testByMethods(screen)),
                    handleChange,
                    label,
                    rerender
                }
            }
        })

        afterEach(() => {
            setup = undefined
            jest.clearAllMocks()
            cleanup()
        })



        it('should render select component', () => {
            const { getByTestId } = setup()

            expect(getByTestId('mui-select')).toBeInTheDocument()
        })

        it('should render select options, depending on how many options passed in', async () => {
            const { getByRole, getAllByTestId } = setup()

            // this is the only way we can open up the select menu, and see its items
            await userEvent.click(getByRole('button', {Name: ''}))
            expect(getAllByTestId('mui-selectitem')).toHaveLength(options.length)
        })

        // to actually test the values, test it in the feature lvl, since the value are states in the feature level
        it('trigger handleChange when an option is chosen', async () => {
            const { getByRole, handleChange, getByText } = setup()
            
            await userEvent.click(getByRole('button', {Name: ''}))
            await userEvent.click(getByText(/caregiver/i))

            expect(handleChange.mock.calls).toHaveLength(1)
        })
        

    })
})