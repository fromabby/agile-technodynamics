import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { resetPassword, clearErrors } from './../../actions/userActions'

const NewPassword = ({ history, match }) => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, success } = useSelector(state => state.forgotPassword);
    
    useEffect(() => {
        if(success){
            history.push('/admin/me')
            alert.success('Password updated successfully');
        }
        else{
            alert.error(error);
            dispatch(clearErrors());
        }

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
                        <h6>Password</h6>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <h6>Confirm Password</h6>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
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
