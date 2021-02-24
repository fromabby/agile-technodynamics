import React, { Fragment, useEffect } from 'react'
import '../css/about.css'
import '../css/products.css'
import '../css/bootstrap.min.css'
import '../fonts/font-awesome.min.css'
import MetaData from './layout/MetaData'
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../actions/productActions'
import { getAboutDetails, clearErrors } from '../actions/websiteActions'
import MissionVision from './MissionVision'

const AboutMissionVision = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, abouts } = useSelector(state => state.abouts)

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getAboutDetails());

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, error, alert]);

    return (
            <Fragment>
                <MetaData title={'Mission and Vision'}/>
                <div className="product-section" style={{paddingTop: '65px'}}>
                    <div className="container">
                        <div className="row about-us">
                            <div className="col-xs-12 col-md-4 about-us-menu">
                                <h5>About Us</h5>
                                <ul className="sidebar-menu">
                                    <li><a href="/about-company">The Company</a></li>
                                    <li><a href="/about-objectives">Objectives</a></li>
                                    <li><a href="/about-scope-of-activities">Scope of Activities</a></li>
                                    <li><a href="/about-mission-vision">Mission and Vision</a></li>
                                    <li><a href="/about-history">History</a></li>
                                </ul>
                            </div>
                            <div className="col-md-8">
                                {abouts && abouts.map(about => (
                                    <MissionVision key={about._id} about={about}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
    )
}

export default AboutMissionVision;