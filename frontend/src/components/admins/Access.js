import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { access } from './../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { ACCESS_CORRECT } from '../../constants/userConstants'
import MetaData from '../layout/MetaData'
import '../../css/forms.css'

const Login = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { accessCode } = useSelector(state => state.access)

    const [userInput, setUserInput ] = useState('')
    const [isCorrect, setIsCorrect ] = useState('false')
    const [attempts, setAttempts] = useState(2)

    const loginPassword = accessCode

    const passwordCheck = (userInput) => {
        if(userInput === loginPassword) {
            setIsCorrect(!isCorrect)
            alert.success('Access code is correct.')
            dispatch({
                type: ACCESS_CORRECT
            })
            history.push('/login/access')
        } else {
            setAttempts((attempts-1))

            if(attempts > 0) {
                alert.error(`You have ${attempts} attempts left`)
            } else {
                alert.error('Cannot redirect to log in page.')
                history.push('/')
            }
        }
    }

    useEffect(() => {
        if(loginPassword === undefined) {
            dispatch(access())
        }
    
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, history])

    return (
        <Fragment>
            <MetaData title={'Log In'}/>
            <div className='login' style={{margin: 'auto'}}>
                <form onSubmit={() => passwordCheck(userInput)}>
                    <div className="illustration">
                        <img className="login-logo" alt="company logo" src="https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615205387/websiteImages/agile-logo-home_nhud2z.png"/>
                    </div>
                    <div className="form-group">
                        <h6>Enter access code</h6>
                        <p style={{color: '#333', fontSize: '10px'}}>If you don't know the code, contact your administrator.</p>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="userInput"
                            value={userInput}
                            placeholder="xxxxxxxx"
                            maxLength="8"
                            onChange={e => setUserInput(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Login
