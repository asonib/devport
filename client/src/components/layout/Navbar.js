import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li><Link onClick={logout} to="/"><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
        </ul>
    );
    const basicLinks = (
        <ul>
            <li><Link to="profiles.html">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
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