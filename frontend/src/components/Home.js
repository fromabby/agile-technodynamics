import React, { Fragment, useEffect, useState } from 'react'
import '../css/styles.css'
import MetaData from './layout/MetaData'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { getHomes, clearErrors } from '../actions/websiteActions'
import { INSIDE_DASHBOARD_FALSE } from '../constants/dashboardConstants'
import { Link } from 'react-router-dom'

const Home = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading,
            error,
            productsDescription,
            servicesDescription,
            productImageLeft,
            productImageRight,
            titleBackground,
            servicesBackground
        } = useSelector(state => state.homes)

    useEffect(() => {
        dispatch(getHomes())

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
                <MetaData title={'Home'}/>
                {loading ? <Loader/> : (
                    <Fragment>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-nowrap text-center"
                                    style={{
                                    background: "linear-gradient(to bottom, rgba(216, 203, 194, 0.8) 0%, rgba(34, 33, 32, 0.8) 100%), url("+`${titleBackground}`+") center / auto no-repeat", 
                                    backgroundSize: "cover", 
                                    width: "100%", 
                                    height: "100%"}
                                }>
                                    <div className="main-section">
                                        <img className="logo" src="https://res.cloudinary.com/agiletech3itf/image/upload/v1610472388/agile-logo_cqnjad.png"/>
                                        <h1 className="text-nowrap text-center pt-3 main-text" style={{textAlign: "center",fontSize: "5vw", color: "rgb(18,6,61)"}}>AGILE TECHNODYNAMICS, INC.</h1>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="row agile-products-home">
                                    <div className="col">
                                        <h1>Our Products</h1>
                                        <p className="our-products-description">{productsDescription}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <div className="product-container" style={{background: "url("+`${productImageLeft}`+") center / auto no-repeat"}}></div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="product-container" style={{background: "url("+`${productImageLeft}`+") center / auto no-repeat"}}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row services-container" 
                                style={{
                                    background: "linear-gradient(to right, rgb(0,0,0) 0%, rgba(151,161,179,0.4) 100%), url("+`${servicesBackground}`+") no-repeat", 
                                    backgroundSize: "cover", 
                                    backgroundPosition: "right"
                                }}
                            >
                                <div className="col-sm-12 col-md-6">
                                    <div>
                                        <div className="col-auto our-services-description">
                                            <h1 className="text-center">Our Services</h1>
                                            <p>{servicesDescription}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
        </Fragment>
    )
}

export default Home;