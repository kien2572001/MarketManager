import { SUCCESSFUL } from '../config/messages';
import serverResponse from '../utils/helpers/responses.js';
import productOrderServices from '../services/productOrderServices.js';

exports.getAllOrdersOfShop = async function (req, res, next) {
    let shopId = req.params.id;
    let page = req.query.page || 1;
    let limit = req.query.limit || 5;

    let searchParams = {};
    if (req.query.status && req.query.status !== 'all') {
        searchParams.status = req.query.status;
    }
    if (req.query.customerName) {
        const customerNameRegex = new RegExp(req.query.customerName, 'i');
        searchParams.customerName = { $regex: customerNameRegex }
        
    }
    if (req.query.phoneNumber) {
        const regex = new RegExp(req.query.phoneNumber, 'i');
        searchParams.phone = { $regex: regex }
    }
    if (req.query.startDate) {
        searchParams.startDate = { $gte: req.query.startDate}
    }
    if (req.query.endDate) {
        searchParams.endDate = { $lte: req.query.endDate }
    }
    if (req.query.minValue) {
        searchParams.total = { $gte: req.query.minValue };
    }
    if (req.query.maxValue) {
        searchParams.total = { $lte: req.query.maxValue };
    }
    if (req.query.address) {
        const regex = new RegExp(req.query.address, 'i');
        searchParams.address = { $regex: regex }
    }

    try {
        let orders = await productOrderServices.getAllOrdersOfShop(shopId, page, limit, searchParams);
        return serverResponse.sendSuccess(res, SUCCESSFUL, orders);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}


exports.updateOrderStatus = async function (req, res, next) {
    let orderId = req.params.id;
    let status = req.body.status;
    try {
        let order = await productOrderServices.updateOrderStatus(orderId, status);
        return serverResponse.sendSuccess(res, SUCCESSFUL, order);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}



