import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { login, clearErrors } from './../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from '../layout/MetaData'
import '../../css/forms.css'

const Login = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { isAuthenticated, loadError, loading } = useSelector(state => state.auth)

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isChecked, setChecked ] = useState('false')

    const checkboxCheck = () => setChecked(!isChecked)


    const submitHandler = e => {
        e.preventDefault()

        dispatch(login(email, password))
    }

    useEffect(() => {
        if(isAuthenticated) {
            history.push('/admin/dashboard')
            alert.success('Logged in successfully.')
        }

        if(loadError){
            alert.show(loadError)
            dispatch(clearErrors())
        } //loadError in load_user_fail

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, isAuthenticated, loadError, history])

    return (
        <Fragment>
            <MetaData title={'Log In'}/>
            <div className='login' style={{margin: 'auto'}}>
                <form onSubmit={submitHandler}>
                    <h2 className="sr-only">Login Form</h2>
                    <div className="illustration">
                        <img className="login-logo" alt="company logo" src="https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615205387/websiteImages/agile-logo-home_nhud2z.png"/>
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control" 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <div class="input-group mb-3">
                            <input 
                                className="form-control" 
                                type={isChecked ? "password" : "text"}  
                                name="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                                required
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
                        <button className="btn btn-primary btn-block" type="submit" disabled={loading ? true : false}>Log In</button>
                    </div>
                    <Link className="forgot" to="/password/forgot">Forgot your password?</Link>
                </form>
            </div>
        </Fragment>
    )
}

export default Login
