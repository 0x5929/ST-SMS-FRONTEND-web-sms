import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'

import BaseTypography from './component'

describe('testing base typography component', () => {


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

    ////////////////////////////////////////////////////
    const text = '__TEST_TYPOGRAPHY_TEXT__'
    let setup

    beforeEach(() => {
        
        setup = () => {

            render(
                <BaseTypography 
                    text={text}
                />
            )

            return {
                ...(testByMethods(screen)),
                text
            }
        }
    })

    afterEach(() => {
        setup = undefined
        jest.clearAllMocks()
        cleanup()
    })


    it('should render with given text', () => {
        const { getByTestId, getByText, text } = setup()

        expect(getByTestId('mui-typography')).toBeInTheDocument()
        expect(getByText(text)).toBeInTheDocument()
    })

})