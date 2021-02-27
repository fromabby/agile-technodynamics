const Services = require('../models/services');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

// Create new services => /api/v1/newservices
exports.newService = catchAsyncErrors ( async(req,res,next) => {
    const service = await Services.create(req.body);
    res.status(201).json({
        success: true,
        service
    })
})

// get all services => /api/v1/services
exports.getAllServices = catchAsyncErrors (async(req,res,next) => {
    const services = await Services.find();

    res.status(200).json({
        success: true,
        services
    })
})

// get single service => /api/v1/service/:id
exports.getSingleService = catchAsyncErrors (async(req,res,next) => {
    const service = await Services.findById(req.params.id);

    if(!service){
        return next(new ErrorHandler('Service us details Not Found', 404));
    }

    res.status(200).json({
        success:true,
        service
    })
})

// update single service => /api/v1/service/:id

exports.updateService = catchAsyncErrors (async( req, res, next) =>{
    let service = await Services.findById(req.params.id);

    if(!service){
        return next(new ErrorHandler('Services details Not Found', 404));
    }

    service = await Services.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success:true,
        service
    })

})
