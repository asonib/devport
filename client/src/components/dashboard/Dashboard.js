import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link }from 'react-router-dom';
import { DashboardActions } from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { loading, profile } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);
    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary" style={{fontFamily: 'Montserrat, sans-serif'}}>Dashboard</h1>
        <p className="lead" style={{fontFamily: 'Montserrat, sans-serif'}}>
            <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ?
            <Fragment>
                <DashboardActions />
                <Experience experience={profile.experience}/>
                <Education education={profile.education} />
            </Fragment> :
            <Fragment>
                <p>You don't have a profile, click below to create one</p>
                <Link to='create-profile' className="btn btn-primary my-1">Create Profile</Link>
            </Fragment>}
    </Fragment>
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
