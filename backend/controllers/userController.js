import { SUCCESSFUL } from '../config/messages';
import userServices from '../services/userServices.js';
import serverResponse from '../utils/helpers/responses.js';

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