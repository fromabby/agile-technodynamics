import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LoginRoute = ({ component: Component, ...rest }) => {
    const { accessCorrect } = useSelector(state => state.accessCode)
    
    console.log(accessCorrect)
    return (
        <Fragment>
            <Route 
                {...rest}
                render={props => {
                    if(typeof accessCorrect === 'undefined') {
                        return <Redirect to='/login' />
                    }

                    return <Component {...props} />
                }}
            />
        </Fragment>
    )
}

export default LoginRoute
