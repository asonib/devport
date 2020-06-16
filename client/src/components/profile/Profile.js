import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';

const Profile = ({getProfileById, match, profile: { profile, loading }, auth}) => {
    useEffect(() => {
        getProfileById(match.params.id)
    }, [])
    return (
        <Fragment>
            {profile === null && loading === false ? <Spinner /> : <Fragment>
                <Link to='/profiles' className="btn btn-dark">Go Back</Link>

                {auth.isAuthenticated && profile.user._id === auth.user._id && auth.loading === false ? 
                <Link to='/edit-profile' className="btn btn-warning">Edit Profile</Link> : ''
                }
            </Fragment>}

            
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)
