import { SUCCESSFUL } from '../config/messages';
import userServices from '../services/userServices.js';
import serverResponse from '../utils/helpers/responses.js';

exports.getAllUsers = async function (req, res, next) {
    try {
        let pageOptions = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        }
        let users = await userServices.getAllUsers(pageOptions);
        return serverResponse.sendSuccess(res, SUCCESSFUL, users);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}

exports.getUserById = async function (req, res, next) {
    let userID = req.params.id;
    try {
        let user = await userServices.getUserById(userID);
        return serverResponse.sendSuccess(res, SUCCESSFUL, user);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}

