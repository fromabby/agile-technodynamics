import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { forgotPassword, clearErrors } from './../../actions/userActions'

const ForgotPassword = ( { history } ) => {

    const [email, setEmail] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, loading, message } = useSelector(state => state.forgotPassword);
    
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());

        }

        if(message){
            //alert.success(message);
            history.push('/email-sent')
        }

    }, [dispatch, alert, error, message, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData));
    }

    return (
        <Fragment>
            <MetaData title={'Forgot Password'}/>
            <div className="login-clean" style={{paddingTop: '65px'}}>
                <form onSubmit={submitHandler}>
                    <h2 className="sr-only">Forgot Password</h2>
                    <div className="div-forgot-password">
                        <h3 className="forgot-password-heading">Forgot password</h3>
                    </div>
                    <div className="form-group">
                        <h6>Enter email</h6>
                        <input 
                            className="form-control" 
                            type="email" 
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            disabled={ loading ? true : false}
                        >Send Email</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default ForgotPassword
