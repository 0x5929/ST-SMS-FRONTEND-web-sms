import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import { BrowserRouter, Link } from 'react-router-dom'


import Drawer from './component'


describe('testing SideNav/Drawer component', () => {
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

    const isDrawerOpen = true
    const handleToggleDrawerMk = jest.fn()

    let setup

    beforeEach(() => {
        setup = () => {

    // NOTE the actual navigation cannot be test here, as we are not render the entire App
    // but rather just a component of the App inside a jsdom. 
    // we need integration testing with a real browser such as selenium. This also applies for clicking backdrops

            const { rerender } = render(
                <BrowserRouter>
                    <Drawer 
                        Link={Link}
                        isDrawerOpen={isDrawerOpen}
                        handleToggleDrawer={handleToggleDrawerMk}
                    />
                </BrowserRouter>
            )

            return {
                ...(testByMethods(screen)),
                rerender,
                handleToggleDrawerMk
            }
        }
    })
    afterEach(() => {
        setup = undefined
        jest.clearAllMocks()
        cleanup()
    
    })


    it('should render drawer open when open is set to true', () => {
        const { getByTestId } = setup()
        
        // in setup, isDrawerOpen is set to true
        expect(getByTestId('mui-drawer')).toBeInTheDocument()
    })
    
    it('should render drawer close when open is set to false', () => {
        const { queryByTestId, rerender } = setup()

        rerender(
            <BrowserRouter>
                <Drawer 
                    Link={Link}
                    isDrawerOpen={false}
                    handleToggleDrawer={handleToggleDrawerMk}
                />
           </BrowserRouter>
        )

        expect(queryByTestId('mui-drawer')).not.toBeInTheDocument()

    })

    it('should render ManageSearchIcon in the open drawer', () => {
        const { getByTestId } = setup()

        expect(getByTestId('ManageSearchIcon')).toBeInTheDocument()
    })

    it('should render CreateNewFolderIcon in the open drawer', () => {
        const { getByTestId } = setup()

        expect(getByTestId('CreateNewFolderIcon')).toBeInTheDocument()
    })

    it('should render menu items', () => {
        const { getByText } = setup()

        expect(getByText(/query/i)).toBeInTheDocument()
        expect(getByText(/create/i)).toBeInTheDocument()
    })



})