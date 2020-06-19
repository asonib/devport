import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ getProfileById, match, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id)
    }, []);
    return (
        <Fragment>

            {profile === null || loading ? (<Spinner />) : (
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>
                        Go Back
                </Link>
                    {
                        auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === profile.user._id &&
                        (
                            <Link to='/edit-profile' className='btn btn-dark'>
                                Edit Profile
                            </Link>
                        )
                    }
                    <div class="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        {profile.githubusername && (<ProfileGithub username={profile.githubusername} />)}
                    </div>
                    <div class="profile-exp bg-white p-2">
                        <h2 class="text-primary">Experience</h2>
                        {profile.experience.length > 0 ? (
                            <Fragment>
                                {profile.experience.map((exp) => (
                                    <ProfileExperience key={exp._id} experience={exp} />
                                ))}
                            </Fragment>
                        ) : (<Fragment><h4>No Experience Data</h4></Fragment>)}                        
                    </div>

                    <div class="profile-exp bg-white p-2 my-1">
                        <h2 class="text-primary">Education</h2>
                        {profile.education.length > 0 ? (
                            <Fragment>
                                {profile.education.map((edu) => (
                                    <ProfileEducation key={edu._id} education={edu} />
                                ))}
                            </Fragment>
                        ) : (<Fragment><h4>No Education Data</h4></Fragment>)}                        
                    </div>
                </Fragment>
            )}

        </Fragment>
    );
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
