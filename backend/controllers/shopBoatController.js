import { SUCCESSFUL } from '../config/messages';
import serverResponse from '../utils/helpers/responses.js';
import shopBoatServices from '../services/shopBoatServices.js';

exports.getAllShopBoats = async function (req, res, next) {
    try {
        let pageOptions = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        }
        let includeProducts = req.query.includeProducts || false;
        let shopBoats = await shopBoatServices.getAllShopBoats(pageOptions, includeProducts);
        return serverResponse.sendSuccess(res, SUCCESSFUL, shopBoats);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}

exports.getShopBoatById = async function (req, res, next) {
    let shopBoatID = req.params.id;
    try {
        let shopBoat = await shopBoatServices.getShopBoatById(shopBoatID);
        return serverResponse.sendSuccess(res, SUCCESSFUL, shopBoat);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}


exports.getShopBoatProducts = async function (req, res, next) {
    let shopBoatID = req.shopBoatId;
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let queryCondition = {}
    if (req.query.name){
        const regex = new RegExp(req.query.name, 'i');
        queryCondition.name = {$regex : regex}
    }
    if (req.query.minPrice){
        queryCondition.price = {$gte: req.query.minPrice}
    }
    if (req.query.maxPrice){
        queryCondition.price = {$lte: req.query.maxPrice}
    }
    if (req.query.category_id && req.query.category_id !== 'all'){
        queryCondition.categories = {
            $elemMatch: {
                $eq: req.query.category_id
            } 
        }
    }
    if (req.query.inStock){
        if (req.query.inStock === 'true'){
            queryCondition.countInStock = {$gt: 0}
        }
        else {
            queryCondition.countInStock = {$eq: 0}
        }
    }
    if (req.query.discount){
        queryCondition.sale = {$gte: Number.parseInt(req.query.discount)}
    }
    try {
        let shopBoat = await shopBoatServices.getShopBoatProducts(shopBoatID, page, limit, queryCondition);
        return serverResponse.sendSuccess(res, SUCCESSFUL, shopBoat);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}



exports.getShopBoadByOwnerId = async function (req, res, next) {
    let ownerID = req.params.id;
    try {
        let shopBoat = await shopBoatServices.getShopBoadByOwnerId(ownerID);
        return serverResponse.sendSuccess(res, SUCCESSFUL, shopBoat);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}

exports.updateShopBoat = async function (req, res, next) {
    let shopBoatID = req.shopBoatId;
    let shopBoat = req.body;
    try {
        let updatedShopBoat = await shopBoatServices.updateShopBoat(shopBoatID, shopBoat);
        return serverResponse.sendSuccess(res, SUCCESSFUL, updatedShopBoat);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}


exports.updateShopBoatById = async function (req, res, next) {
    let shopBoatID = req.params.id;
    let shopBoat = req.body;
    try {
        let updatedShopBoat = await shopBoatServices.updateShopBoatById(shopBoatID, shopBoat);
        return serverResponse.sendSuccess(res, SUCCESSFUL, updatedShopBoat);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}


exports.getListCategoriesOfShop = async function (req, res, next) {
    let shopBoatID = req.params.id;
    try {
        let categories = await shopBoatServices.getListCategoriesOfShop(shopBoatID);
        return serverResponse.sendSuccess(res, SUCCESSFUL, categories);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }

}