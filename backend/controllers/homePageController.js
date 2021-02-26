const HomePage = require('../models/homePage')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary')

// Create new homepage details => /api/v1/newhome
exports.newHomePage = catchAsyncErrors ( async(req,res,next) => {
    const homePage = await HomePage.create(req.body);
    res.status(201).json({
        success: true,
        homePage
    })
})

// get all home page details => /api/v1/allhome
exports.getAllHomePage = catchAsyncErrors (async(req,res,next) => {
    const homePages = await HomePage.find();
    res.status(200).json({
        success: true,
        homePages
    })
})


// get homepage details => /api/v1/home
exports.getHomePage = catchAsyncErrors (async(req, res,next) =>{
    const homePage = await HomePage.findById(req.params.id);

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

  // update homepage details => /api/v1/admin/home/:id
  exports.updateHomePage = catchAsyncErrors (async(req,res,next)=>{
    // if(!homePage){
    //     return res.status(404).json({
    //         success: false,
    //         message: 'homepage not found'
    //     })
    // }
    let homePage = await HomePage.findById(req.params.id);
    
    const newHomeData = { //remove this to update in postman
        productDescription: req.body.productDescription,
        servicesDescription: req.body.servicesDescription
    }


    //if(req.body.productImageRight !== '') {
    //    const productImageRight_id = homePage.productImageRight.public_id;
    //    const res = await cloudinary.v2.uploader.destroy(productImageRight_id);

   //     const result = await cloudinary.v2.uploader.upload(req.body.productImageRight, {
    //        folder: 'homeImages'
    //    })

    //    newHomeData.productImageRight = {
     //       public_id: result.public_id,
     //       url: result.secure_url
    //    }
    //}

    homePage = await HomePage.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        homePage 
    })
  })