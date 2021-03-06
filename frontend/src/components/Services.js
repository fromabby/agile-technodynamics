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
            it1_subtitle,
            it2_subtitle,
            etd1_subtitle,
            etd2_subtitle,

            it1_description,
            it2_description,
            etd1_description,
            etd2_description,

            it1_icon,
            it2_icon,
            etd1_icon,
            etd2_icon,

            it1_iconBg,
            it2_iconBg,
            etd1_iconBg,
            etd2_iconBg
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
                           
                        </div>
                    </div>

                    <h2 className="section-heading" style={{textAlign: 'center'}}>Information Technology</h2>
                    <div className="row text-center">
                        <div className="col-md-6"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className={`fa ${it1_icon} fa-stack-1x fa-inverse`}></i> </span>
                            <h4 className="service-heading">{it1_subtitle}</h4>
                            
                        </div>
                        <div className="col-md-6"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className={`fa ${it2_icon} fa-stack-1x fa-inverse`}></i> </span>
                            <h4 className="service-heading">{it2_subtitle}</h4>
                            
                        </div>
                    </div>

                    <h2 className="section-heading" style={{textAlign: 'center'}}>Engineering and Technical Services</h2>
                    <div className="row text-center">
                        <div className="col-md-6"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className={`fa ${etd1_icon} fa-stack-1x fa-inverse`}></i> </span>
                            <h4 className="service-heading">{etd1_subtitle}</h4>
                            
                        </div>
                        <div className="col-md-6"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className={`fa ${etd2_icon} fa-stack-1x fa-inverse`}></i> </span>
                            <h4 className="service-heading">{etd2_subtitle}</h4>
                            
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Services
