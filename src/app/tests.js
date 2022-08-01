import { render, screen, cleanup } from '@testing-library/react'
import { Link, Outlet, BrowserRouter } from 'react-router-dom'


import App from './component'
import { AuthContextProvider, AppThemeContextProvider } from '../contexts'

const customRender = (ui, {themeProviderProps, authProviderProps, ...renderOptions}) => {
    return render(
        <AppThemeContextProvider {...themeProviderProps}>
            <AuthContextProvider {...authProviderProps}>
                {ui}
            </AuthContextProvider>
        </AppThemeContextProvider>
      ,
      renderOptions,
    )
  }


afterEach(cleanup)

describe('App level testing', () => {
    it('should render header and back to top button', () => {

        const authProviderProps  = { authed: true, user: {email: 'test@email.com', password: 'test'}}
        const themeProviderProps = { }

        customRender(<App Link={Link} Outlet={Outlet} />, {themeProviderProps, authProviderProps, wrapper: BrowserRouter})

        // test header is there
        expect(screen.getByText(/Student Management System/i))

        // test back to top button
        expect(screen.getByLabelText('scroll back to top'))
    })

})