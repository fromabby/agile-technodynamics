import React, { Fragment, useEffect, useState } from 'react'
import '../css/services.css'
import '../css/bootstrap.min.css'
import '../fonts/font-awesome.min.css'
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { getServices, clearErrors } from '../actions/websiteActions'
import { INSIDE_DASHBOARD_FALSE } from '../constants/dashboardConstants'
import { Link } from 'react-router-dom'
import MetaData from './layout/MetaData'

const Services = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading,
            error,
            networkSecurity,
            websiteDevelopment,
            batteryTestingServices,
            partialDischargeDetection,
            netSecIcon,
            webDevIcon,
            battTestIcon,
            partDiscIcon
        } = useSelector(state => state.services)

    useEffect(() => {
        dispatch(getServices())

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error]) //loop if homePage added as dependency

    return (
        <Fragment>
            <MetaData title={'Our Services'} />
            <section id="services" className="section2" style={{paddingTop: '85px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading">Our Services </h2>
                            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur. </h3>
                        </div>
                    </div>

                    <h2 className="section-heading" style={{textAlign: 'center'}}>Information Technology</h2>
                    <div className="row text-center">
                        <div className="col-md-6"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className={`fa ${netSecIcon} fa-stack-1x fa-inverse`}></i> </span>
                            <h4 className="service-heading">{networkSecurity}</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. </p>
                        </div>
                        <div className="col-md-6"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className={`fa ${webDevIcon} fa-stack-1x fa-inverse`}></i> </span>
                            <h4 className="service-heading">{websiteDevelopment}</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. </p>
                        </div>
                    </div>

                    <h2 className="section-heading" style={{textAlign: 'center'}}>Engineering and Technical Services</h2>
                    <div className="row text-center">
                        <div className="col-md-6"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className={`fa ${battTestIcon} fa-stack-1x fa-inverse`}></i> </span>
                            <h4 className="service-heading">{batteryTestingServices}</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. </p>
                        </div>
                        <div className="col-md-6"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className={`fa ${partDiscIcon} fa-stack-1x fa-inverse`}></i> </span>
                            <h4 className="service-heading">{partialDischargeDetection}</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. </p>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Services
