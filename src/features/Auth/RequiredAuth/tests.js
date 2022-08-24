import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom' 


import { AuthContextProvider, useAuthContext } from '../../../contexts'
import RequiredAuth from './component'

// needed since the RequiredAuth component has a condition that will 
// return Navigate (from react-router-dom) to the signin page, which is /
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate : ({to, replace}) => <div>__TEST_SIGNIN_PAGE__</div>
}))


describe('testing RequiredAuth component', () => {
    let testByMethods

    beforeAll(() => {

    
        testByMethods = (screen) => {
            return {
                getByText(text) {
                    return screen.getByText(text)
                },
                queryByText(text) {
                    return screen.queryByText(text)
                }
            }
        }
    })
    
    
    afterAll(() => {
        testByMethods= undefined
    })

    ///////////////////////////////////

    let setup

    const Child = () => {
        return <div>__TEST_CHILD__</div>
    }

    const LoggedInUser = () => {
        const { login } = useAuthContext()

        login()

        return <div>__TEST_LOGGED_IN__</div>
    }
    const LoggedOutUser = () => {
        const { logout } = useAuthContext()
        
        logout()

        return <div>__TEST_LOGGED_IN__</div>
    }


    beforeEach(() => {
        setup = (User) => {

            render(
                <AuthContextProvider>
                    <BrowserRouter>
                        <User />
                        <RequiredAuth>
                            <Child />
                        </RequiredAuth>
                    </BrowserRouter>
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

    //testing the logic behind Required Auth
    it('should not render child component, if user is logged out or not logged in', () => {
        const { queryByText, getByText } = setup(LoggedOutUser)

        expect(getByText('__TEST_SIGNIN_PAGE__')).toBeInTheDocument()
        expect(queryByText('__TEST_CHILD__')).not.toBeInTheDocument()

    })

    it('should render child component, if user is logged in', () => {       
        const { getByText } = setup(LoggedInUser)
        expect(getByText('__TEST_CHILD__')).toBeInTheDocument()

    })


})