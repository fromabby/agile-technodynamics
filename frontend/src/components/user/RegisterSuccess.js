import React, { Fragment, useEffect } from 'react'
import '../../css/confirmationpage.css'
import '../../css/contact.css'
import '../../css/bootstrap.min.css'
import '../../fonts/font-awesome.min.css'
import { useDispatch } from 'react-redux'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from './../layout/MetaData'

const RegisterSuccess = () => {
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    })

    return (
        <Fragment>
            <MetaData title={'Registration Success'}/>
            <Fragment>
                <section className='confirmation-section'>
                    <h1>
                        <i className="fa fa-check-circle confirm-icon"></i>
                    </h1>
                    <h1>Congratulations!</h1>
                    <h6 className="congratulations-text">
                        User has been created.<br/>
                        The user has automatically been logged in. Go back to home to continue.
                    </h6>
                    <a className="back-to-home" href="/">Back to Home&nbsp;<i className="fa fa-angle-right"></i></a>
                </section>
            </Fragment>
        </Fragment>
    )
}

export default RegisterSuccess
