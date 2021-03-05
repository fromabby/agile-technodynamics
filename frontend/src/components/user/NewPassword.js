import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { resetPassword, clearErrors } from './../../actions/userActions'
import { INSIDE_DASHBOARD_FALSE } from '../../constants/dashboardConstants'

const NewPassword = ({ history, match }) => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, success } = useSelector(state => state.forgotPassword);
    
    const [showOld, setOld] = useState('false')

    const showOldToggle = () => {
        setOld(!showOld)
    }

    const [showNew, setNew] = useState('false')

    const showNewToggle = () => {
        setNew(!showNew)
    }

    useEffect(() => {
        if(success){
            history.push('/admin/me')
            alert.success('Password updated successfully');
        }
        
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(match.params.token, formData));
    }

    return (
        <Fragment>
            <MetaData title={'Reset Password'}/>
            <div className="login-clean" style={{paddingTop: '65px'}}>
                <form onSubmit={submitHandler}>
                    <h2 className="sr-only">New Password</h2>
                    <div className="div-forgot-password">
                        <h3 className="forgot-password-heading">New Password</h3>
                    </div>
                    <div className="form-group">
                        <h6>New Password</h6>
                        <div class="input-group mb-3">
                            <input 
                                type={showOld ? "password" : "text"} 
                                className="form-control" 
                                name="password"
                                value={password}
                                placeholder="Old Password"
                                onChange={(e) => setPassword(e.target.value)}
                                aria-label="oldpassword" aria-describedby="basic-addon1"
                            />
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    <a
                                        onClick={showOldToggle}
                                        style={{cursor: 'pointer'}}
                                    >
                                        <span className="fa-lg">
                                            <i className={showOld ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                        </span>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <h6>Confirm Password</h6>
                        <div class="input-group mb-3">
                            <input
                                type={showNew ? "password" : "text"} 
                                className="form-control"
                                name="confirmPassword"
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                aria-label="confirm" aria-describedby="basic-addon1"
                            />
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    <a
                                        onClick={showNewToggle}
                                        style={{cursor: 'pointer'}}
                                    >
                                        <span className="fa-lg">
                                            <i className={showNew ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                        </span>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button 
                            className="btn btn-primary btn-block" 
                            type="submit"
                        >Update New Password</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default NewPassword
