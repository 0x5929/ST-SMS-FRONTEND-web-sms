import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'

import BackToTopButton from './component'

const mockHandleClick = jest.fn()

jest.mock('../../../hooks/useScrollToTop', () => ({
    __esModule: true,
    default: () => [ true, mockHandleClick ]
}))

describe('testing BackToTopButton component', () => {

    
    let testByMethods

    beforeAll(() => {
    
        testByMethods = (screen) => {
            return {
                getByTestId(testId) {
                    return screen.getByTestId(testId)
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
    let setup

    beforeEach(() => {
        
        setup = () => {

            render(<BackToTopButton />)

            return {
                ...(testByMethods(screen)),
                mockHandleClick
            }
        }
    })

    afterEach(() => {
        setup = undefined
        jest.clearAllMocks()
        cleanup()
    })



    it('should render when scrolled passed y axis 50', () => {
        // we cannot test with just react testing library since it tests compoonents inside a jsdom, whereas 
        // something like a scroll offset, we need to test in real browser such as selenium
    })

    it('should render zoom transition', () => {
        const { getByTestId } = setup()
        expect(getByTestId('mui-zoom-transition')).toBeInTheDocument()
    })

    it('should render back to top fab', () => {
        const { getByRole } = setup()
        expect(getByRole('button', {name: 'scroll back to top'})).toBeInTheDocument()
    })

    it('should render KeyboardArrowUpIcon', () => {
        const { getByTestId } = setup()
        expect(getByTestId('KeyboardArrowUpIcon')).toBeInTheDocument()
    })

    it('should invoke handleClick when button is clicked', () => {
        const { getByRole, mockHandleClick } = setup()
        getByRole('button', {name: 'scroll back to top'}).click()

        expect(mockHandleClick.mock.calls).toHaveLength(1)
    
    })
})