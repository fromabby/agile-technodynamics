import React, { Fragment, useEffect } from 'react'
import '../css/about.css'
import '../css/bootstrap.min.css'
import '../fonts/font-awesome.min.css'
import MetaData from './layout/MetaData'
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { getAboutDetails, clearErrors } from '../actions/websiteActions'
import { Markup } from 'interweave'

const AboutMissionVision = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { 
        error, 
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

    }, [dispatch, error, alert]);

    return (
            <Fragment>
                <MetaData title={'About Us'}/>
                <div className="container-fluid" style={{paddingTop: '77px'}}>
                    <div className="header-container">
                        <h1 className="text-center about-text">ABOUT US</h1>
                        <ul className="about-list">
                            <li><a href="#company">The Company</a></li>
                            <li><a href="#objectives">Objectives</a></li>
                            <li><a href="#scope">Scope of Activities</a></li>
                            <li><a href="#mission">Mission</a></li>
                            <li><a href="#vision">Vision</a></li>
                            <li><a href="#history">History</a></li>
                        </ul>
                    </div>
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
                </div>
            </Fragment>
    )
}

export default AboutMissionVision;