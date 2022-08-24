import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom' 

import { AuthContextProvider } from '../../../contexts'
import Signin from './component'


const mockSigninFn = jest.fn()

jest.mock('../../../hooks/useForms', () => ({
    useSignInForm : ({authed, user, logout}) => {

        const [ loginStates, loginHandlers ] = jest.requireActual('../../../hooks/useForms')
                                                    .useSignInForm({authed: false, user: null, login: jest.fn()})

        return [ loginStates, {...loginHandlers, handleSubmit: mockSigninFn}]
    }
}))



describe('testing signin form components', () => {
    let testByMethods

    beforeAll(() => {

    
        testByMethods = (screen) => {
            return {
                getByTestId(testId) {
                    return screen.getByTestId(testId)
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

    ///////////////////////////////////
    let setup

    beforeEach(() => {
        setup = () => {

            const result = render(
                <AuthContextProvider>
                    <BrowserRouter>
                        <Signin />  
                    </BrowserRouter>
                </AuthContextProvider>
            )

            return {

                ...(testByMethods(screen)),
                mockSigninFn,
                container: result.container
            }
        }
    })
    afterEach(() => {
        setup = undefined
        jest.clearAllMocks()
        cleanup()
    
    })


    it('should render image grid with image', () => {
        const { getByTestId } = setup()

        expect(getByTestId('mui-imagegrid')).toBeInTheDocument()
        expect(getByTestId('mui-imagegrid')).toHaveStyle('background-image: url(https://source.unsplash.com/random)')
    })

    it('should render grid with sign in form components', () => {
        const { getByTestId, getAllByText, getByRole, container } = setup()

        expect(getByTestId('mui-formgrid')).toBeInTheDocument()
        expect(getByTestId('lockedout-icon')).toBeInTheDocument()
        expect(getByTestId('clear-email-icon')).toBeInTheDocument()
        expect(getByTestId('clear-pw-icon')).toBeInTheDocument()
        expect(getAllByText(/sign in/i)).toHaveLength(2) // one for sign in button, one for header
        expect(container.querySelector('#email')).toBeInTheDocument()
        expect(container.querySelector('#password')).toBeInTheDocument()
        expect(getByRole('button', {name: 'Sign In'})).toBeInTheDocument()

    })

    it('should change inputs when input field is changed', async () => {
        const { container, getByDisplayValue } = setup()

        const emailInput = container.querySelector('#email')
        await userEvent.type(emailInput, '__TEST_EMAIL__', {delay: 1})
        expect(getByDisplayValue('__TEST_EMAIL__')).toBeInTheDocument()
        
        const pwInput = container.querySelector('#password')
        await userEvent.type(pwInput, '__TEST_PW__', {delay: 1})
        expect(getByDisplayValue('__TEST_PW__')).toBeInTheDocument()
    })

    it('should clear inputs when clear button is pressed', async () => {
        const { container, queryByDisplayValue, getByTestId } = setup()

        const emailInput = container.querySelector('#email')
        await userEvent.type(emailInput, '__TEST_EMAIL__', {delay: 1})

        const clearEmailBtn = getByTestId('clear-email-icon')

        await userEvent.click(clearEmailBtn)
        expect(queryByDisplayValue('__TEST_EMAIL__')).not.toBeInTheDocument()

        const pwInput = container.querySelector('#password')
        await userEvent.type(pwInput, '__TEST_PW__', {delay: 1})

        const clearPwBtn = getByTestId('clear-pw-icon')

        await userEvent.click(clearPwBtn)
        expect(queryByDisplayValue('__TEST_PW__')).not.toBeInTheDocument()

    })

    it('it should trigger login() from AuthContextProvider when submit is pressed', async () => {

        const { container, getByRole, mockSigninFn } = setup()

        const emailInput = container.querySelector('#email')
        const pwInput = container.querySelector('#password')
        
        await userEvent.type(emailInput, '__TEST_EMAIL__', {delay: 1})
        await userEvent.type(pwInput, '__TEST_PW__', {delay: 1})
        await userEvent.click(getByRole('button', {name: 'Sign In'}))

        expect(mockSigninFn.mock.calls).toHaveLength(1)

    })
})
