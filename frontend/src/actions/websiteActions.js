import axios from 'axios'
import { 
    UPDATE_HOME_REQUEST,
    UPDATE_HOME_SUCCESS,
    UPDATE_HOME_FAIL,
    
    HOME_DETAILS_REQUEST,
    HOME_DETAILS_SUCCESS,
    HOME_DETAILS_FAIL,

    ABOUT_DETAILS_REQUEST,
    ABOUT_DETAILS_SUCCESS,
    ABOUT_DETAILS_FAIL,

    UPDATE_ABOUT_REQUEST,
    UPDATE_ABOUT_SUCCESS,
    UPDATE_ABOUT_FAIL,
    
    ALL_ABOUT_DETAILS_REQUEST,
    ALL_ABOUT_DETAILS_SUCCESS,
    ALL_ABOUT_DETAILS_FAIL,

    FOOTER_DETAILS_REQUEST,
    FOOTER_DETAILS_SUCCESS,
    FOOTER_DETAILS_FAIL,

    UPDATE_FOOTER_REQUEST,
    UPDATE_FOOTER_SUCCESS,
    UPDATE_FOOTER_FAIL,

    CLEAR_ERRORS
} from '../constants/websiteConstants'

// Get home details
export const getHomeDetails = () => async(dispatch) => {
    try{
        dispatch({
            type: HOME_DETAILS_REQUEST
        })

        const { data } = await axios.get('/api/v1/homepage')

        dispatch({
            type: HOME_DETAILS_SUCCESS,
            payload: data.homePage
        })

    }
    catch(error){
        dispatch(
            {
                type: HOME_DETAILS_FAIL,
                payload: error.response.data.message
            }
        )
    }
}

// Get home details
export const getFooterDetails = () => async(dispatch) => {
    try{
        dispatch({
            type: FOOTER_DETAILS_REQUEST
        })

        const { data } = await axios.get('/api/v1/footerinfo')

        dispatch({
            type: FOOTER_DETAILS_SUCCESS,
            payload: data.footerInfo
        })

    }
    catch(error){
        dispatch(
            {
                type: FOOTER_DETAILS_FAIL,
                payload: error.response.data.message
            }
        )
    }
}

// Update home (ADMIN)
export const updateHome = (homeData) => async(dispatch) => {
    try{
        dispatch({
            type: UPDATE_HOME_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/updatehome`, homeData, config)

        dispatch({
            type: UPDATE_HOME_SUCCESS,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: UPDATE_HOME_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

// Get about details (COMPANY)
export const getAboutCompanyDetails = () => async(dispatch) => {
    try{
        dispatch({
            type: ABOUT_DETAILS_REQUEST
        })

        const { data } = await axios.get('/api/v1/aboutcompany')

        dispatch({
            type: ABOUT_DETAILS_SUCCESS,
            payload: data.about
        })

    }
    catch(error){
        dispatch(
            {
                type: ABOUT_DETAILS_FAIL,
                payload: error.response.data.message
            }
        )
    }
}

// Get about details (OBJECTIVES)
export const getAboutObjectivesDetails = () => async(dispatch) => {
    try{
        dispatch({
            type: ABOUT_DETAILS_REQUEST
        })

        const { data } = await axios.get('/api/v1/aboutobjectives')

        dispatch({
            type: ABOUT_DETAILS_SUCCESS,
            payload: data.about
        })

    }
    catch(error){
        dispatch(
            {
                type: ABOUT_DETAILS_FAIL,
                payload: error.response.data.message
            }
        )
    }
}

// Get about details (SCOPE)
export const getAboutScopeDetails = () => async(dispatch) => {
    try{
        dispatch({
            type: ABOUT_DETAILS_REQUEST
        })

        const { data } = await axios.get('/api/v1/aboutscope')

        dispatch({
            type: ABOUT_DETAILS_SUCCESS,
            payload: data.about
        })

    }
    catch(error){
        dispatch(
            {
                type: ABOUT_DETAILS_FAIL,
                payload: error.response.data.message
            }
        )
    }
}

// Get about details (HISTORY)
export const getAboutHistoryDetails = () => async(dispatch) => {
    try{
        dispatch({
            type: ABOUT_DETAILS_REQUEST
        })

        const { data } = await axios.get('/api/v1/abouthistory')

        dispatch({
            type: ABOUT_DETAILS_SUCCESS,
            payload: data.about
        })

    }
    catch(error){
        dispatch(
            {
                type: ABOUT_DETAILS_FAIL,
                payload: error.response.data.message
            }
        )
    }
}

// Get about details (MISSION VISION)
export const getAboutDetails = () => async(dispatch) => {
    try{
        dispatch({
            type: ALL_ABOUT_DETAILS_REQUEST
        })

        const { data } = await axios.get('/api/v1/allaboutus')

        dispatch({
            type: ALL_ABOUT_DETAILS_SUCCESS,
            payload: data
        })

    }
    catch(error){
        dispatch(
            {
                type: ALL_ABOUT_DETAILS_FAIL,
                payload: error.response.data.message
            }
        )
    }
}

//Get single about us detail
export const getSingleAbout = (id) => async(dispatch) => {
    try{
        dispatch({
            type: ABOUT_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/about/${id}`)

        dispatch({
            type: ABOUT_DETAILS_SUCCESS,
            payload: data.about
        })
    }
    catch(error){
        dispatch({
            type: ABOUT_DETAILS_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

// Update about (ADMIN)
export const updateAbout = (id, aboutData) => async(dispatch) => {
    try{
        dispatch({
            type: UPDATE_ABOUT_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/about/${id}`, aboutData, config)

        dispatch({
            type: UPDATE_ABOUT_SUCCESS,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: UPDATE_ABOUT_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

// Update footer (ADMIN)
export const updateFooter = (footerData) => async(dispatch) => {
    try{
        dispatch({
            type: UPDATE_FOOTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/updatefooterinfo`, footerData, config)

        dispatch({
            type: UPDATE_FOOTER_SUCCESS,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: UPDATE_FOOTER_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

//clear errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}