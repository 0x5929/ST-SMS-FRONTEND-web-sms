import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../../contexts'

function RequiredAuth({ children }) {
    const location = useLocation()
    const { authed } = useAuthContext()

    if ( authed === undefined ) return "... LOADING ..."

    return authed ? children : <Navigate to="/" replace state={{from : location}}/>
}

export default React.memo(RequiredAuth)