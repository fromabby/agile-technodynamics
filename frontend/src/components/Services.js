import React, { Fragment } from 'react'
import '../css/services.css'
import '../css/bootstrap.min.css'
import '../fonts/font-awesome.min.css'
import MetaData from './layout/MetaData'

const Services = () => {
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
                    <div className="row text-center">
                        <div className="col-md-4"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i> </span>
                            <h4 className="service-heading">E-Commerce</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. </p>
                        </div>
                        <div className="col-md-4"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className="fa fa-laptop fa-stack-1x fa-inverse"></i> </span>
                            <h4 className="service-heading">Responsive Design</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. </p>
                        </div>
                        <div className="col-md-4"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className="fa fa-lock fa-stack-1x fa-inverse"></i> </span>
                            <h4 className="service-heading">Web Security</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. </p>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-4"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i> </span>
                            <h4 className="service-heading">E-Commerce</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. </p>
                        </div>
                        <div className="col-md-4"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className="fa fa-laptop fa-stack-1x fa-inverse"></i> </span>
                            <h4 className="service-heading">Responsive Design</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. </p>
                        </div>
                        <div className="col-md-4"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className="fa fa-lock fa-stack-1x fa-inverse"></i> </span>
                            <h4 className="service-heading">Web Security</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. </p>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Services
