import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';
 
const Login = ({login,isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })
    
    const {email, password} = formData 

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()
        login(email, password)
    }

    //redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }
    return (
        <Fragment>
            <h1>Sign In</h1>
            <p>Sign in to your account</p>
            <form onSubmit = {e => onSubmit(e)}>
                <input 
                type="text" 
                placeholder="Email" 
                value={email}
                onChange={e => onChange(e)}
                name="email"
                required/><br/>
                <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={e => onChange(e)}
                name="password"
                required/><br/>
                <input type="submit" value="Register"/>
                <p>Dont have an account ? <Link to="/register">Register</Link></p>
            </form>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);