import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { login, clearErrors } from './../../actions/userActions'
import { INSIDE_DASHBOARD_FALSE } from '../../constants/dashboardConstants'
import '../../css/forms.css'

const Login = ( { history }) => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    
    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    const [isChecked, setChecked] = useState('false')

    const checkboxCheck = () => {
        setChecked(!isChecked)
    }

    useEffect(() => {
        if(isAuthenticated) {
            history.push('/')
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        } //loadError in load_user_fail

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title={'Login'}/>
                    <div className="login-clean" style={{paddingTop: '150px'}}>
                        <form onSubmit={submitHandler}>
                            <h2 className="sr-only">Login Form</h2>
                            <div className="illustration">
                                <img className="login-logo" alt="company logo" src="https://res.cloudinary.com/agiletech3itf/image/upload/v1610472388/agile-logo_cqnjad.png"/>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <div class="input-group mb-3">
                                    <input 
                                        className="form-control" 
                                        type={isChecked ? "password" : "text"}  
                                        name="password" 
                                        placeholder="Password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">
                                            <a
                                                onClick={checkboxCheck}
                                                style={{cursor: 'pointer'}}
                                            >
                                                <span className="fa-lg">
                                                    <i className={isChecked ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                                </span>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit">Log In</button>
                            </div>
                            <Link className="forgot" to="/password/forgot">Forgot your password?</Link>
                        </form>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Login
