import React from 'react';
import { auth } from '../firebaseInitialise'
import { Link, navigate } from '@reach/router'

const Home = () => {

    const logout = () => {
        auth.signOut();
        navigate(`/logout`);
    }

    return (
        <div>
            <h2>You are home</h2>
            <button onClick={logout}>Logout</button>
            <Link to="/googlemap">Start Game</Link>
        </div >
    );

};

export default Home;