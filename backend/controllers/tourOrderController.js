import { SUCCESSFUL } from '../config/messages';
import serverResponse from '../utils/helpers/responses.js';
import tourOderServices from '../services/tourOrderServices.js';

exports.getTourOrders = async (req, res) => {
  try {
    const pageOptions = {
      page: req.query.page || 1,
      limit: req.query.limit || 5,
    };

    const tourOrders = await tourOderServices.getTourOrders(pageOptions);
    return serverResponse.sendSuccess(res, SUCCESSFUL, tourOrders);
  } catch (err) {
    return serverResponse.sendError(res, err);
  }
}

exports.updateTourOrder = async (req, res) => {
  try {
    const tourOrderId = req.params.tourOrderId;
    const tourOrderData = req.body;
    const tourOrder = await tourOderServices.updateTourOrder(tourOrderId, tourOrderData);
    return serverResponse.sendSuccess(res, SUCCESSFUL, tourOrder);
  } catch (err) {
    return serverResponse.sendError(res, err);
  }
}

exports.changeStatus = async (req, res) => {
  try {
    const tourOrderId = req.params.tourOrderId;
    const status = req.body.status;
    const tourOrder = await tourOderServices.changeStatus(tourOrderId, status);
    return serverResponse.sendSuccess(res, SUCCESSFUL, tourOrder);
  } catch (err) {
    return serverResponse.sendError(res, err);
  }
}
