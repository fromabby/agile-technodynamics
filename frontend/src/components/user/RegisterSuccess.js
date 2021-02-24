import React, { Fragment, useEffect } from 'react'
import '../../css/confirmationpage.css'
import '../../css/contact.css'
import '../../css/bootstrap.min.css'
import '../../fonts/font-awesome.min.css'
import { useDispatch } from 'react-redux'
import { INSIDE_DASHBOARD_FALSE } from '../../constants/dashboardConstants'

import MetaData from './../layout/MetaData'

const ConfirmationPage = () => {
    
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch({
        //     type: INSIDE_DASHBOARD_FALSE
        // })
    })

    return (
        <Fragment>
            <MetaData title={'Registration Success'}/>
            <Fragment>
                <section className="contact-form-section" style={{paddingTop: '65px'}}>
                    <h1>
                        <i className="fa fa-check-circle confirm-icon"></i>
                    </h1>
                    <h1>Form Sent!</h1>
                    <h6 className="congratulations-text">
                        User has been successfully created<br/>
                    </h6>
                    <a className="back-to-home" href="/">Back to Home&nbsp;<i className="fa fa-angle-right"></i></a>
                </section>
            </Fragment>
        </Fragment>
    )
}

export default ConfirmationPage
