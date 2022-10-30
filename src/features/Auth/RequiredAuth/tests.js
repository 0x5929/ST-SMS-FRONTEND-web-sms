import '@testing-library/jest-dom'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import userEvent from '@testing-library/user-event'
import axios from '../../../services/api/axios'
import { AuthContextProvider } from '../../../contexts'
import RequiredAuth from './component'

import Signin from '../SideSignIn/component'

import preview from 'jest-preview'

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
                            } 
                        />
                        
                    </Routes> 
                    </BrowserRouter>
                </AuthContextProvider>
            )

            return {
                ...(testByMethods(screen)),
                container: result.container,
                debug: screen.debug
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
        const { getByText, getInput } = setup()

        const emailInput = getInput('Email Address *')
        const passInput = getInput('Password *')
        expect(emailInput).toBeInTheDocument()
        expect(passInput).toBeInTheDocument()

        // somehow userEvent doesn't work with these inputs :/
        fireEvent.change(emailInput, {target: {value: '__TEST_USER__'}})
        fireEvent.change(passInput, {target: {value: '__TEST_PW__'}})
        await userEvent.click(getByText('Sign In'))
        // preview.debug()
        expect(getByText('__TEST_CHILD__')).toBeInTheDocument()

    })


})