import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AuthContextProvider, useAuthContext, AppThemeContextProvider } from '../../../contexts'
import Header from './component'

const mockHandleToggleDrawer = jest.fn()
jest.mock('../../../hooks/useDrawer', () => ({
    __esModule : true,
    default :  () => [ false, mockHandleToggleDrawer ]
}))


describe('testing Header component', () => {
    let testByMethods

    beforeAll(() => {

    
        testByMethods = (screen) => {
            return {
                getByTestId(testId) {
                    return screen.getByTestId(testId)
                },
                getByText(text){
                    return screen.getByText(text)
                },
                queryByTestId(testId) {
                    return screen.queryByTestId(testId)
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

    const Link = () => <div>__TEST_LINK__</div>
    const mockHandleToggleColorMode = jest.fn()
    const mockLogout = jest.fn()

    let setup

    beforeEach(() => {
        setup = () => {


            const { rerender } = render(
                <AppThemeContextProvider>
                    <AuthContextProvider>
                        <Header 
                            Link={Link} 
                            darkMode={false}
                            toggleColorMode={mockHandleToggleColorMode}
                            authed={false}
                            logout={mockLogout}
                        />
                    </AuthContextProvider>
                </AppThemeContextProvider>
            )

            return {
                ...(testByMethods(screen)),
                rerender,
                mockHandleToggleDrawer,
                mockHandleToggleColorMode,
                mockLogout
                
            }
        }
    })
    afterEach(() => {
        setup = undefined
        jest.clearAllMocks()
        cleanup()
    
    })

    it('should render appbar', () => {
        const { getByTestId } = setup()
        expect(getByTestId('mui-appbar')).toBeInTheDocument()
    })

    it('should not render menu icon button if authed is false', () => {
        const { getByTestId } = setup()
        expect(getByTestId('MenuIcon').closest('button')).toBeDisabled()
    })


    it('should render menu icon button if authed is true', () => {
        const { getByTestId, rerender } = setup()

        rerender(
            <AppThemeContextProvider>
            <AuthContextProvider>
                <Header 
                    Link={Link} 
                    darkMode={false}
                    toggleColorMode={mockHandleToggleColorMode}
                    authed={true}
                    logout={mockLogout}
                />
            </AuthContextProvider>
        </AppThemeContextProvider>
        )

        expect(getByTestId('MenuIcon')).toBeInTheDocument()
    })


    it('should invoke handleToggleDrawer when menuicon is clicked', async () => {
        const { mockHandleToggleDrawer, getByTestId, rerender } = setup()

        rerender(
            <AppThemeContextProvider>
                <AuthContextProvider>
                    <Header 
                        Link={Link} 
                        darkMode={false}
                        toggleColorMode={mockHandleToggleColorMode}
                        authed={true}
                        logout={mockLogout}
                    />
                </AuthContextProvider>
            </AppThemeContextProvider>
        )

        await userEvent.click(getByTestId('MenuIcon'))
        expect(mockHandleToggleDrawer.mock.calls).toHaveLength(1)
    })

    it('should render header title', () => {
        // note the different header title should be tested with an actual browser
        // such as selenium

        const { getByText } = setup()
        expect(getByText(/Student Management/i)).toBeInTheDocument()
    })

    it('should render switch', () => {
        const { getByTestId } = setup()
        expect(getByTestId('mui-switch')).toBeInTheDocument()
    })

    it('should render dark mode icon button when darkMode is off', () => {
        const { getByTestId, queryByTestId } = setup()
        
        expect(getByTestId('Brightness4Icon')).toBeInTheDocument()
        expect(queryByTestId('BrightnessHighIcon')).not.toBeInTheDocument()

    })

    it('should render light mode icon button when darkMode is on', () => {
        const { getByTestId, queryByTestId, rerender } = setup()

        expect(getByTestId('Brightness4Icon')).toBeInTheDocument()

        rerender(
            <AppThemeContextProvider>
                <AuthContextProvider>
                    <Header 
                        Link={Link} 
                        darkMode={true}
                        toggleColorMode={mockHandleToggleColorMode}
                        authed={false}
                        logout={mockLogout}
                    />
                </AuthContextProvider>
            </AppThemeContextProvider>
        )

        // await userEvent.click(getByTestId('Brightness4Icon'))

        expect(getByTestId('BrightnessHighIcon')).toBeInTheDocument()
        expect(queryByTestId('Brightness4Icon')).not.toBeInTheDocument()
    })

    it('should invoke toggleColorMode when the brightness icons are clicked', async () => {
        const { getByTestId,  mockHandleToggleColorMode, rerender } = setup()

        expect(getByTestId('Brightness4Icon')).toBeInTheDocument()

        await userEvent.click(getByTestId('Brightness4Icon'))

        expect(mockHandleToggleColorMode.mock.calls).toHaveLength(1)


        rerender(
            <AppThemeContextProvider>
                <AuthContextProvider>
                    <Header 
                        Link={Link} 
                        darkMode={true}
                        toggleColorMode={mockHandleToggleColorMode}
                        authed={false}
                        logout={mockLogout}
                    />
                </AuthContextProvider>
            </AppThemeContextProvider>
        )

        expect(getByTestId('BrightnessHighIcon')).toBeInTheDocument()
        
        await userEvent.click(getByTestId('BrightnessHighIcon'))

        expect(mockHandleToggleColorMode.mock.calls).toHaveLength(2)

    })

    it('should not render a logout button when not authed', () => {
        const { queryByText } = setup()

        expect(queryByText(/logout/i)).not.toBeVisible()
    })

    it('should render a logout button when authed', () => {
        const { getByText, rerender } = setup()

        rerender(
            <AppThemeContextProvider>
                <AuthContextProvider>
                    <Header 
                        Link={Link} 
                        darkMode={false}
                        toggleColorMode={mockHandleToggleColorMode}
                        authed={true}
                        logout={mockLogout}
                    />
                </AuthContextProvider>
            </AppThemeContextProvider>
        )

        expect(getByText(/logout/i)).toBeInTheDocument()

    })

    it('should invoke logout when logout is clicked', async () => {
        const { mockLogout, rerender, getByText } = setup()

        rerender(
            <AppThemeContextProvider>
                <AuthContextProvider>
                    <Header 
                        Link={Link} 
                        darkMode={false}
                        toggleColorMode={mockHandleToggleColorMode}
                        authed={true}
                        logout={mockLogout}
                    />
                </AuthContextProvider>
            </AppThemeContextProvider>
        )
        
        await userEvent.click(getByText(/logout/i))

        expect(mockLogout.mock.calls).toHaveLength(1)


    })  

})