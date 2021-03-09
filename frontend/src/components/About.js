import React, { Fragment, useEffect } from 'react'
import '../css/about.css'
import '../css/bootstrap.min.css'
import '../fonts/font-awesome.min.css'
import MetaData from './layout/MetaData'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { getAboutDetails, clearErrors } from '../actions/websiteActions'
import { Markup } from 'interweave'
import { INSIDE_DASHBOARD_FALSE } from '../constants/dashboardConstants'

const About = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { 
        error,
        loading, 
        abouts,
        aboutCompany_title, 
        aboutCompany_description,
        aboutScope_title, 
        aboutScope_description,
        aboutObjectives_title, 
        aboutObjectives_description,
        aboutMission_title, 
        aboutMission_description,
        aboutVision_title, 
        aboutVision_description,
        aboutHistory_title, 
        aboutHistory_description,
    } = useSelector(state => state.abouts)

    useEffect(() => {
        dispatch(getAboutDetails());

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })

    }, [dispatch, error, alert]);

    return (
            <Fragment>
                <MetaData title={'About Us'}/>
                <div className="container-fluid" style={{paddingTop: '77px'}}>
                    <div className="header-wrapper">
                        <div className="header-container" style={{display: 'block'}}>
                            <h1 className="text-center about-text">ABOUT US</h1>
                            <ul className="about-list">
                                <li><a href="#company">{aboutCompany_title}</a></li>
                                <li><a href="#objectives">{aboutObjectives_title}</a></li>
                                <li><a href="#scope">{aboutScope_title}</a></li>
                                <li><a href="#mission">{aboutMission_title}</a></li>
                                <li><a href="#vision">{aboutVision_title}</a></li>
                                <li><a href="#history">{aboutHistory_title}</a></li>
                            </ul>
                        </div>
                    </div>
                    {loading ? <Loader/> : (
                        <Fragment>
                            <div id="company" className="sections white-bg">
                                <h1>{aboutCompany_title}</h1>
                                <Markup content={aboutCompany_description}/>
                            </div>
                            <div id="objectives" className="sections blue-bg">
                                <h1>{aboutObjectives_title}</h1>
                                <Markup content={aboutObjectives_description}/>
                            </div>
                            <div id="scope" className="sections white-bg">
                                <h1>{aboutScope_title}</h1>
                                <Markup content={aboutScope_description}/>
                            </div>
                            <div id="mission" className="sections blue-bg">
                                <h1>{aboutMission_title}</h1>
                                <Markup content={aboutMission_description}/>
                            </div>
                            <div id="vision" className="sections white-bg">
                                <h1>{aboutVision_title}</h1>
                                <Markup content={aboutVision_description}/>
                            </div>
                            <div id="history" className="sections blue-bg">
                                <h1>{aboutHistory_title}</h1>
                                <Markup content={aboutHistory_description}/>
                            </div>
                        </Fragment>
                    )} 
                </div>
            </Fragment>
    )
}

export default About;