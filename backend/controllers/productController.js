import { SUCCESSFUL, PRODUCT } from '../config/messages';
import serverResponse from '../utils/helpers/responses.js';
import productServices from '../services/productServices.js';

exports.getAllProducts = async function (req, res, next) {
    try {
        let pageOptions = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        }
        let products = await productServices.getAllProducts(pageOptions);
        return serverResponse.sendSuccess(res, SUCCESSFUL, products);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}


exports.getProductBySlug = async function (req, res, next) {
    let slug = req.params.slug;
    try {
        let product = await productServices.getProductBySlug(slug);
        if (!product) {
            return serverResponse.sendError(res, PRODUCT.NOT_FOUND);
        }
        return serverResponse.sendSuccess(res, SUCCESSFUL, product);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}


exports.deleteProductById = async function (req, res, next) {
    let productID = req.params.id;
    try {
        let product = await productServices.getProductById(productID);
        if (!product) {
            return serverResponse.sendError(res, PRODUCT.NOT_FOUND);
        }
        product = await productServices.deleteProductById(productID);
        return serverResponse.sendSuccess(res, SUCCESSFUL, product);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}

exports.updateProductById = async function (req, res, next) {
    let productID = req.params.id;
    console.log(req.body);
    try {
        let product = await productServices.getProductById(productID);
        if (!product) {
            return serverResponse.sendError(res, PRODUCT.NOT_FOUND);
        }
        product = await productServices.updateProductById(productID, req.body);
        return serverResponse.sendSuccess(res, SUCCESSFUL, product);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}

exports.getTop4Products = async function (req, res, next) {
    try {
        let products = await productServices.getTop4Products();
        return serverResponse.sendSuccess(res, SUCCESSFUL, products);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}

exports.getListProductsInHomePage = async function (req, res, next) {
    try {
        let products = await productServices.getListProductsInHomePage();
        return serverResponse.sendSuccess(res, SUCCESSFUL, products);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}



exports.addProduct = async function (req, res, next) {
    try {
        let product = await productServices.addProduct(req.body);
        return serverResponse.sendSuccess(res, SUCCESSFUL, product);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}