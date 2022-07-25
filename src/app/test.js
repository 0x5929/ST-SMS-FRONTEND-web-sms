import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Link, Outlet, Route, Routes, useLocation} from 'react-router-dom'

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

describe('App level testing', () => {
    test('full app rendering/navigating', async () => {

        let authProviderProps  = { authed: true, user: {email: 'test@email.com', password: 'test'}}
        let themeProviderProps = { }

        customRender(<App Link={Link} Outlet={Outlet} />, {themeProviderProps, authProviderProps})

        //const user = userEvent.setup()
        expect(screen.getByText(/Student Management System/i))
    })
})