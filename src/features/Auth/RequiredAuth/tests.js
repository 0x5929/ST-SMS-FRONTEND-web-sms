import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import userEvent from '@testing-library/user-event'

import { AuthContextProvider } from '../../../contexts'
import RequiredAuth from './component'

import Signin from '../SideSignIn/component'


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
                },
                getInput(labelText) {
                    return screen.getByLabelText(labelText)
                },
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



    beforeEach(() => {
        setup = () => {

            const result = render(
                <AuthContextProvider>
                    <BrowserRouter>
                    <Routes> 
                        <Route path="/" index element={<Signin />} />
                        <Route path="/query" element={
                            <RequiredAuth>
                                <Child />
                            </RequiredAuth>
                            } />
                        
                    </Routes> 
                    </BrowserRouter>
                </AuthContextProvider>
            )

            return {
                ...(testByMethods(screen)),
                container: result.container
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
        const { queryByText, getByText } = setup()

        // not signed in
        expect(getByText('Sign in')).toBeInTheDocument()
        expect(queryByText('__TEST_CHILD__')).not.toBeInTheDocument()

    })

    it('should render child component, if user is logged in', async () => {       
        const { getByText, container } = setup()

        await userEvent.type(container.querySelector('#email'), '__TEST_USER__')
        await userEvent.type(container.querySelector('#password'), '__TEST_PW__')
        await userEvent.click(getByText('Sign In'))
        expect(getByText('__TEST_CHILD__')).toBeInTheDocument()

    })


})