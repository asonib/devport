import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';

const Profiles = ({getProfiles, profile: {profiles, loading}}) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles])
    return <Fragment>
        { loading ? <Spinner /> : <Fragment>
            <h1 style={{fontFamily: 'Montserrat, sans-serif'}} className="large text-primary">Developers</h1>
            <p className="lead"> <i className="fab fa-connectdevelop" style={{fontFamily: 'Montserrat, sans-serif'}}> Connect With Developers</i></p>
            <div className="profiles">
                {profiles.length > 0 ? (
                    profiles.map(profile => <ProfileItem key={profile._id} profile={profile}/>)
                ) : <h4>No Profiles Found...</h4>}
            </div> 
        </Fragment>}
    </Fragment>
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired
}

const mapPropsToState = state => ({
    profile: state.profile
})

export default connect(mapPropsToState, { getProfiles })(Profiles)
