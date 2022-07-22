import React from 'react'
import { Box as MuiBox } from '@mui/material'

import createAppStyles from './styles'
import { BackToTopButton } from '../features/Navigation/BackToTop'
import { Header } from '../features/Navigation/Header'

const Styles = createAppStyles({MuiBox})

function App({ Link, Outlet }) {

    console.log('App component rendered')
    return (
        <>
            <Styles.Box>
                    <Header Link={Link} />
                    <BackToTopButton />
            </Styles.Box>
            <Outlet />
        </>
    );
}


export default React.memo(App)