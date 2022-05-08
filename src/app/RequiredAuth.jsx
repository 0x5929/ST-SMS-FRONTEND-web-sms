import React from 'react'
import { Navigate } from 'react-router-dom'

export default function RequiredAuth(props) {

    const { authed, children } = props

    return authed === true ? children: <Navigate to="/" replace />;
}
