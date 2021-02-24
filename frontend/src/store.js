import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productReducers, productReducer, productDetailsReducer, newProductReducer } from './reducers/productReducers'
import { authReducer, registerReducer, getUsersReducer, userReducer, forgotPasswordReducer, userDetailsReducer, updateUserReducer } from './reducers/userReducers'
import { newInquiryReducer, listInquiryReducer, inquiryDetailsReducer, inquiryReducer } from './reducers/inquiryReducers'
import { homeDetailsReducer, websiteUpdateReducer, aboutDetailsReducer, allAboutDetailsReducer, footerDetailsReducer } from './reducers/websiteReducers'
import { dashboardReducer } from './reducers/dashboardReducers'

const reducer = combineReducers({
    products: productReducers,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,

    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    register: registerReducer,
    users: getUsersReducer,
    updateUser: updateUserReducer,
    getUser: userDetailsReducer,
    
    newInquiry: newInquiryReducer,
    listInquiry: listInquiryReducer,
    inquiry: inquiryReducer,
    inquiryDetails: inquiryDetailsReducer,
    
    homeDetails: homeDetailsReducer,
    website: websiteUpdateReducer,

    aboutDetails: aboutDetailsReducer,
    abouts: allAboutDetailsReducer,

    footerDetails: footerDetailsReducer,
    
    dashboard: dashboardReducer
})

let initialState = {} //contains all the data we want to put in this state just before loading the application

//clear the store
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;  