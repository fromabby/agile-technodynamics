import React, { Fragment, useEffect } from 'react'
import '../css/about.css'
import '../css/products.css'
import '../css/bootstrap.min.css'
import '../fonts/font-awesome.min.css'
import MetaData from './layout/MetaData'
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../actions/productActions'
import { getAboutScopeDetails, clearErrors } from '../actions/websiteActions'
import { Markup } from 'interweave'

const AboutScope = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, about } = useSelector(state => state.aboutDetails)

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getAboutScopeDetails());

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, error, alert]);

    return (
            <Fragment>
                <MetaData title={'Scope of Activities'}/>
                <div class="product-section" style={{paddingTop: '65px'}}>
                    <div class="container">
                        <div class="row about-us">
                            <div class="col-md-4 about-us-menu">
                                <h5>About Us</h5>
                                <ul className="sidebar-menu">
                                    <li><a href="/about-company">The Company</a></li>
                                    <li><a href="/about-objectives">Objectives</a></li>
                                    <li><a href="/about-scope-of-activities">Scope of Activities</a></li>
                                    <li><a href="/about-mission-vision">Mission and Vision</a></li>
                                    <li><a href="/about-history">History</a></li>
                                </ul>
                            </div>
                            <div class="col-md-8">
                                <h1>{about.title}</h1>
                                <hr />
                                <p class="text-justify">
                                    <Markup content={about.description} />
                                </p>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
    )
}

export default AboutScope;