import React, { Fragment, useEffect } from 'react'
import '../../css/confirmationpage.css'
import '../../css/contact.css'
import '../../css/bootstrap.min.css'
import '../../fonts/font-awesome.min.css'
import { useDispatch } from 'react-redux'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from './../layout/MetaData'

const RegisterError = () => {
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    })

    return (
        <Fragment>
            <MetaData title={'Registration Error'}/>
            <Fragment>
                <section className='confirmation-section'>
                    <h1 style={{color: 'red', fontSize: '6rem'}}>
                        <i className="fa fa-exclamation-circle"></i>
                    </h1>
                    <h1>Error</h1>
                    <h6 className="congratulations-text">
                        <br/>
                        User cannot be created.<br/><br/>
                        There has been an error upon creating the user. Proceed to Dashboard to try again. 
                    </h6>
                    <a className="back-to-home" href="/admin/dashboard">Back to Dashboard&nbsp;<i className="fa fa-angle-right"></i></a>
                </section>
            </Fragment>
        </Fragment>
    )
}

export default RegisterError
