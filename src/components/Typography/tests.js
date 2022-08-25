import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'

import BaseTypography from './component'

describe('testing base typography component', () => {


    let testByMethods

    beforeAll(() => {
    
        testByMethods = (screen) => {
            return {
                getByTestId(testId) {
                    return screen.getByTestId(testId)
                },
                getByText(text){
                    return screen.getByText(text)
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