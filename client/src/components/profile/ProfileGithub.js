import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGitHubProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({ username, repo, getGitHubProfile }) => {
    useEffect(() => {
        getGitHubProfile(username);
    }, [getGitHubProfile])

    return (

        <div class="profile-github">
            <h2 class="text-primary my-1">
                <i class="fab fa-github"></i> Github Repositories
            </h2>
            {repo === null ? (<Spinner />) : 
                repo.map(repo => (
                    <div key={repo._id}class="repo bg-white p-1 my-1">
                        <div>
                            <h4><a href={repo.html_url} target="_blank"
                                rel="noopener noreferrer">{repo.name}</a>
                            </h4>
    
                        </div>
                        <div>
                            <ul>
                                <li class="badge badge-primary">{repo.description ? (repo.description) : (repo.git_url)}</li>
                                <li class="badge badge-dark">{repo.size}</li>
                                <li class="badge badge-light">{repo.language}</li>
                            </ul>
                        </div>
                    </div>

                ))
            }
        </div>
        
    )
    
}

ProfileGithub.propTypes = {
    getGitHubProfile: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    repo: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
    repo: state.profile.repo
});

export default connect(mapStateToProps, { getGitHubProfile })(ProfileGithub)
