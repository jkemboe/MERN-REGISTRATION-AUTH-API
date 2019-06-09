import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => (
   <section>
       <p>Create developers portfolio/profile, share posts and help from other developers</p>
    <div>
        <Link to="/register">Sign Up</Link>
        <Link to="/login">Login</Link>
    </div>
   </section>
)

export default Landing;