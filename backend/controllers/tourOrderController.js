import { SUCCESSFUL } from '../config/messages';
import serverResponse from '../utils/helpers/responses.js';
import tourOderServices from '../services/tourOrderServices.js';

exports.getTourOrders = async (req, res) => {
  try {
    const pageOptions = {
      page: req.query.page || 1,
      limit: req.query.limit || 5,
    };
    let userIdQuery = {};
    let tourIdQuery = {};
    let queryCondition = {};
    if (req.query.email) {
      const regex = new RegExp(req.query.email, 'i');
      userIdQuery.email = regex;
    }
    if (req.query.tourName) {
      const regex = new RegExp(req.query.tourName, 'i');
      tourIdQuery.name = regex;
    }
    if (req.query.departureStartDate) {
      queryCondition.tourTime = {
        $gte: new Date(req.query.departureStartDate),
      };
    }
    if (req.query.departureEndDate) {
      queryCondition.tourTime = {
        ...queryCondition.tourTime,
        $lte: new Date(req.query.departureEndDate),
      };
    }
    if (req.query.totalBillMin) {
      queryCondition.total = {
        $gte: req.query.totalBillMin,
      };
    }
    if (req.query.totalBillMax) {
      queryCondition.total = {
        ...queryCondition.total,
        $lte: req.query.totalBillMax,
      };
    }
    if (req.query.status && req.query.status !== 'all') {
      queryCondition.status = req.query.status;
    }
    if (req.query.bookingStartDate) {
      queryCondition.createdAt = {
        $gte: new Date(req.query.bookingStartDate),
      };
    }
    if (req.query.bookingEndDate) {
      queryCondition.createdAt = {
        ...queryCondition.createdAt,
        $lte: new Date(req.query.bookingEndDate),
      };
    }

    const tourOrders = await tourOderServices.getTourOrders(pageOptions, queryCondition, userIdQuery, tourIdQuery);
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
