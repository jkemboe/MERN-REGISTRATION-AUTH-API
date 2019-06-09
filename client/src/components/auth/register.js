import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';
 
const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })
    
    const {name, email, password, password2} = formData 

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()
        if(password !== password2){
           setAlert('Passwords do not match','danger')
        } else {
             register({name, email, password})
        }
    }

    if(isAuthenticated){
      return <Redirect to="/dashboard" />
    }
    return (
        <Fragment>
            <h1>Sign Up</h1>
            <p>Create your account</p>
            <form onSubmit = {e => onSubmit(e)}>
                <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={e => onChange(e)}
                name="name"
                // required
                /><br/>
                <input 
                type="text" 
                placeholder="Email" 
                value={email}
                onChange={e => onChange(e)}
                name="email"
                // required
                /><br/>
                <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={e => onChange(e)}
                name="password"
                // required
                /><br/>
                <input 
                type="password" 
                placeholder="Confirm Password" 
                value={password2}
                onChange={e => onChange(e)}
                name="password2"
                // required
                /><br/>
                <small>
                    This sit uses Gravatar, if you want a profile image use Gravatar Email
                </small> <br/>
                <input type="submit" value="Register"/>
                <p>Already have an account ? <Link to="/login">Log In</Link></p>
            </form>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool     
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert,register})(Register);