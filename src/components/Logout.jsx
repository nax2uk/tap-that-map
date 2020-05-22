import React from 'react';
import { Link } from '@reach/router'

const Logout = () => {
    return (
        <div>
            <h3>You have been logged out</h3>
            <Link to="/">Login</Link>
        </div>
    );
};

export default Logout;