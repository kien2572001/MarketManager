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
