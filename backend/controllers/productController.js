const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

//Create new product   => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {
    if(req.body.useDefaultImage === "True"){
        req.body.image = {
            public_id: 'products/default-image-620x600_sdhmvy.jpg',
            url: 'https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615204932/products/default-image-620x600_sdhmvy.jpg'
        }
    }
    else{
        const result = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: 'products'
        });
        req.body.image = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
    
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

//Get all products => /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors (async (req, res, next) =>{
    const resPerPage = 8;
    const productsCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product.find().sort({name: 1}), req.query)
                        .search()
                        .filter()

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resPerPage)
                        
    products = await apiFeatures.query;

    const mechanicalEngineering = await Product.find({category: "Mechanical Engineering"})
    const dcPowerSystems = await Product.find({category: "DC Power Systems"})
    const electricalEngineeringEquipment = await Product.find({category: "Electrical Engineering Equipment"})
    const testEquipment = await Product.find({category: "Test Equipment"})
    const others = await Product.find({category: "Others"})

    res.status(200).json({
        success: true,
        /*count: products.length,*/
        productsCount,
        resPerPage,
        filteredProductsCount,
        products,
        mechanicalEngineering,
        dcPowerSystems,
        electricalEngineeringEquipment,
        testEquipment,
        others
    })
})

// Get Single Product details with the use of ID =>/api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product Not Found', 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})


//Update Product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors (async (req, res, next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product Not Found', 404));
    }

    console.log(req.body.image)
    if(req.body.image !== '') {
        //Deleting images associated with the product
        if(product.image.public_id !== 'products/default-image-620x600_sdhmvy.jpg' ){
            const result = await cloudinary.v2.uploader.destroy(product.image.public_id);
        }
    
        const result = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: 'products'
        })
        
        req.body.image = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
        product
    })
    
})

//Delete Product /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors (async(req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product Not Found', 404));
    }

    //Deleting images associated with the product
    for(let i = 0 ; i < product.images.length ; i++){
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Product is Deleted.'
    })
})

//Get all products (admin)) => /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors (async (req, res, next) =>{

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
})