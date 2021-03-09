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

    const [userInput, setUserInput ] = useState('')
    const [isCorrect, setIsCorrect ] = useState('false')
    const loginPassword = 'cgJBHJXe'

    const passwordCheck = (userInput) => {
        if(userInput === loginPassword) {
            setIsCorrect(!isCorrect)
        } else {
            alert.error('Wrong password. Cannot redirect to log in page.')
            history.push('/')
        }
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
                <MetaData title={'Log In'}/>
                <div className={isCorrect ? "login" : "d-none"} style={{paddingTop: '100px'}}>
                    <form>
                        <h2 className="sr-only">Log In</h2>
                        <div className="div-forgot-password">
                            <h3 className="forgot-password-heading">Log In</h3>
                        </div>
                        <div className="form-group">
                            <h6>Enter password</h6>
                            <input 
                                className="form-control" 
                                type="text" 
                                name="userInput"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <a
                                className="btn btn-primary btn-block"
                                style={{color: 'white'}}
                                onClick={() => {passwordCheck(userInput)}}
                            >Submit</a>
                        </div>
                    </form>
                </div>
                <div className={isCorrect ? "d-none" : "login"} style={{paddingTop: '150px'}}>
                        <form onSubmit={submitHandler}>
                            <h2 className="sr-only">Login Form</h2>
                            <div className="illustration">
                                <img className="login-logo" alt="company logo" src="https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615205387/websiteImages/agile-logo-home_nhud2z.png"/>
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
