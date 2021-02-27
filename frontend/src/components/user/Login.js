import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { login, clearErrors } from './../../actions/userActions'
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
                                <input className="form-control" type={isChecked ? "password" : "text"}  name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <br/>
                                <input 
                                    type='checkbox'
                                    onClick={checkboxCheck}
                                />
                                    &nbsp;Show password
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
