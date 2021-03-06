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
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 contact-us-banner">
                        <h1 class="text-center">Have some questions?</h1>
                        <p class="text-center">We are ready to help you.</p>
                        <Link to='/contact-us'>
                            <button class="btn btn-primary contact-us-button" type="button">
                                    Contact Us!
                            </button>
                        </Link>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row second-level-row">
                            <div class="col-12">
                                <h1>OUR SERVICES</h1>
                            </div>
                            <div class="col-12 title-section">
                                <h3>Information Technology</h3>
                            </div>
                            <div class="col">
                                <p>
                                    <span className="fa-stack fa-4x">
                                        <i className={`fa fa-circle fa-stack-2x text-${it1_iconBg}`}></i>
                                        <i className={`fa ${it1_icon} fa-stack-1x fa-inverse`}></i>
                                    </span>
                                </p>
                                <h4>{it1_subtitle}</h4>
                                <p>{it1_description}</p>
                            </div>
                            <div class="col">
                                <p>
                                    <span className="fa-stack fa-4x">
                                        <i className={`fa fa-circle fa-stack-2x text-${it2_iconBg}`}></i>
                                        <i className={`fa ${it2_icon} fa-stack-1x fa-inverse`}></i>
                                    </span>
                                </p>
                                <h4>{it2_subtitle}</h4>
                                <p>{it2_description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row second-level-row">
                            <div class="col-12 title-section">
                                <h3>Engineering and Technical Services</h3>
                            </div>
                            <div class="col">
                                <p>
                                    <span className="fa-stack fa-4x">
                                        <i className={`fa fa-circle fa-stack-2x text-${etd1_iconBg}`}></i>
                                        <i className={`fa ${etd1_icon} fa-stack-1x fa-inverse`}></i>
                                    </span>
                                </p>
                                <h4>{etd1_subtitle}</h4>
                                <p>{etd2_description}</p>
                            </div>
                            <div class="col">
                                <p>
                                    <span className="fa-stack fa-4x">
                                        <i className={`fa fa-circle fa-stack-2x text-${etd2_iconBg}`}></i>
                                        <i className={`fa ${etd2_icon} fa-stack-1x fa-inverse`}></i>
                                    </span>
                                </p>
                                <h4>{etd2_subtitle}</h4>
                                <p>{etd2_description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Services
