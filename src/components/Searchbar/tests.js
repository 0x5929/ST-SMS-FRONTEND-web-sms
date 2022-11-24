import '@testing-library/jest-dom'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import userEvent from "@testing-library/user-event"


import SearchBar from './component'


describe('testing searchbar component', () => {

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
        testByMethods = undefined
    })

////////////////////////////////////////////////////    

    let setup
    const name = '__TEST_SEARCHBAR_NAME__'
    const label = '__TEST_SEARCHBAR_LABEL'
    const value = ''
    const onChange = jest.fn()
    const handleClear = jest.fn()


    beforeEach(() => {
        
        setup = () => {

            render(
                <SearchBar 
                    name={name}
                    label={label}
                    value={value}
                    onChange={onChange}
                    handleClear={handleClear}
                />)

            return {
                ...(testByMethods(screen)),
                onChange,
                handleClear,
            }
        }
    })

    afterEach(() => {
        setup = undefined
        jest.clearAllMocks()
        cleanup()
    })

    it('should render searchbar component', () => {
        const { getByTestId } = setup()

        expect(getByTestId('mui-searchbar')).toBeInTheDocument()
        expect(getByTestId('mui-searchicon')).toBeInTheDocument()
        expect(getByTestId('mui-clearIcon')).toBeInTheDocument()
    })

    it('should trigger onChange when input is changed', async () => {
        const { getByTestId, onChange } = setup()
        const input = getByTestId('mui-searchbar')
        const testInput = '__TEST__'

        await userEvent.type(input, testInput)
        expect(onChange.mock.calls).toHaveLength(testInput.length)
    })

    it('should trigger handleClear when clear btn is clicked', () => {
        const { getByTestId, handleClear } = setup()
        const clearBtn = getByTestId('mui-clearIcon')
        
        fireEvent.click(clearBtn)
        expect(handleClear.mock.calls).toHaveLength(1)
    })
})