import React, { Fragment } from 'react'
import { Markup } from 'interweave'

const MissionVision = ({ about }) => {
    return (
        <div>
            {(about._id == '602905ed5135781774314621' || about._id == '602905e55135781774314620') ? (
            <Fragment>
                <h1>{about.title}</h1>
                <hr />
                <p className="text-justify">
                    <Markup content={about.description} />
                </p>
            </Fragment>) :
            (<Fragment></Fragment>)}
        </div>
    )
}

export default MissionVision
