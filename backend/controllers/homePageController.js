const HomePage = require('../models/homePage')

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary')

// get homepage details => /api/v1/homepage
exports.getHomePage = catchAsyncErrors (async(req, res,next) =>{
    const homePage = await HomePage.findById('60278bf744a2ec0d50d80785');

    if(!homePage){
        return res.status(404).json({
            success: false,
            message: 'homepage not found'
        })
    }
    res.status(200).json({
        success: true,
        homePage
    })
})

  // update homepage details => /api/v1/admin/updatehome
  exports.updateHomePage = catchAsyncErrors (async(req,res,next)=>{
    // if(!homePage){
    //     return res.status(404).json({
    //         success: false,
    //         message: 'homepage not found'
    //     })
    // }

    const newHomeData = { //remove this to update in postman
        productDescription: req.body.productDescription,
        servicesDescription: req.body.servicesDescription
    }

    let homePage = await HomePage.findById('60278bf744a2ec0d50d80785');

    if(req.body.titleBackground !== '') {
        const titleBackground_id = homePage.titleBackground.public_id;
        const res = await cloudinary.v2.uploader.destroy(titleBackground_id);

        const result = await cloudinary.v2.uploader.upload(req.body.titleBackground, {
            folder: 'homeImages'
        })

        newHomeData.titleBackground = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }


    if(req.body.servicesBackground !== '') {
        const servicesBackground_id = homePage.servicesBackground.public_id;
        const res = await cloudinary.v2.uploader.destroy(servicesBackground_id);

        const result = await cloudinary.v2.uploader.upload(req.body.servicesBackground, {
            folder: 'homeImages'
        })

        newHomeData.servicesBackground = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    if(req.body.productImageLeft !== '') {
        const productImageLeft_id = homePage.productImageLeft.public_id;
        const res = await cloudinary.v2.uploader.destroy(productImageLeft_id);

        const result = await cloudinary.v2.uploader.upload(req.body.productImageLeft, {
            folder: 'homeImages'
        })

        newHomeData.productImageLeft = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    if(req.body.productImageRight !== '') {
        const productImageRight_id = homePage.productImageRight.public_id;
        const res = await cloudinary.v2.uploader.destroy(productImageRight_id);

        const result = await cloudinary.v2.uploader.upload(req.body.productImageRight, {
            folder: 'homeImages'
        })

        newHomeData.productImageRight = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    homePage = await HomePage.findByIdAndUpdate('60278bf744a2ec0d50d80785', newHomeData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        homePage 
    })
  })