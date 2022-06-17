import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../../contexts';

function RequiredAuth({ children }) {

    const { authed } = useAuthContext()

    return authed === true ? children : <Navigate to="/" replace />;
}

export default RequiredAuth