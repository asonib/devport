import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({education: {
    school,
    degree,
    fieldofstudy,
    current,
    from,
    to,
    description
}}) => {
    return (
        <div>
            <h3 class="text-dark">School : {school}</h3>
            <h3 class="text-dark">College : {degree}</h3>
            <p><span className="fa fa-calendar"></span> {<Moment format='DD/MM/YYYY'>{from}</Moment>} - {to ? <Moment format='DD/MM/YYYY'>{to}</Moment> : 'Now'}</p>
            <p><strong>Field Of Study: </strong>{fieldofstudy}</p>
            <p>
              <strong>Description: </strong> {description}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired
}

export default ProfileEducation
