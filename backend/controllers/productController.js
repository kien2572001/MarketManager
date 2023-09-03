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

exports.getProductById = async function (req, res, next) {
    let productID = req.params.id;
    try {
        let product = await productServices.getProductById(productID);
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