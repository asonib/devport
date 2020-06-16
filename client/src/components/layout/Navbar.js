import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li><Link to="/profiles"><i className="fas fa-users"></i><span className="hide-sm"> Developers</span></Link></li>
            <li><Link to="/dashboard"><i className="fas fa-user"></i><span className="hide-sm"> Dashboard</span></Link></li>
            <li><Link onClick={logout} to="/"><i className="fas fa-sign-out-alt"></i><span className="hide-sm"> Logout</span></Link></li>
        </ul>
    );
    const basicLinks = (
        <ul>
            <li><Link to="/profiles"><i className="fas fa-users"></i><span className="hide-sm"> Developers</span></Link></li>
            <li><Link to="/register"><i className="fas fa-registered"></i><span className="hide-sm"> Register</span></Link></li>
            <li><Link to="/login"><i className="fas fa-sign-in-alt"></i><span className="hide-sm">Login</span></Link></li>
        </ul>
    );
    return (
        <nav className="navbar bg-primary">
            <h1>
                <Link to="/"><i className="fas fa-code"></i>DevPort</Link>
            </h1>
    { !loading && (<Fragment>{isAuthenticated ? authLinks: basicLinks}</Fragment>)}
        </nav>
    )
}
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
}
const mapStateToProp = state => ({
    auth: state.auth
});
export default connect(mapStateToProp, { logout })(Navbar);