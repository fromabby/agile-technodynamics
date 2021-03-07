import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'


const ProtectedRoute = ({ forAdmins, isAdmin, isSuperAdmin, component: Component, ...rest }) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.auth);
    const { isCreated } = useSelector(state => state.register);
    
    return (
        <Fragment>
            {loading === false && (
                <Route 
                    {...rest}
                    render={props => {
                        if(isAuthenticated === false && isCreated === false) {
                            return <Redirect to='/register-success' />
                        }

                        if(isAuthenticated === false) {
                            return <Redirect to='/' />
                        }

                        if(forAdmins === true && (user.role !== 'admin' && user.role !== 'superadmin')) {
                            return <Redirect to='/' />
                        }

                        if(isAdmin === true && user.role !== 'admin') {
                            return <Redirect to='/admin/dashboard' />
                        }

                        if(isSuperAdmin === true && (user.role === 'admin' && user.role !== 'superadmin')) {
                            return <Redirect to='/admin/dashboard' />
                        }

                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
    )
}

export default ProtectedRoute
