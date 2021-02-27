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

    const netSec_id = await Services.findById('603a584d9d25cf2bac76f4c7')
    const webDev_id = await Services.findById('603a585a9d25cf2bac76f4c8')
    const batteryTesting_id = await Services.findById('603a58849d25cf2bac76f4c9')
    const partialDischarge_id = await Services.findById('603a58999d25cf2bac76f4ca')

    const networkSecurity = netSec_id.subtitle
    const websiteDevelopment = webDev_id.subtitle
    const batteryTestingServices = batteryTesting_id.subtitle
    const partialDischargeDetection = partialDischarge_id.subtitle

    const netSecIcon = netSec_id.icon
    const webDevIcon = webDev_id.icon
    const battTestIcon = batteryTesting_id.icon
    const partDiscIcon = partialDischarge_id.icon

    res.status(200).json({
        success: true,
        services,
        networkSecurity,
        websiteDevelopment,
        batteryTestingServices,
        partialDischargeDetection,
        netSecIcon,
        webDevIcon,
        battTestIcon,
        partDiscIcon
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
