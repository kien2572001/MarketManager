import { SUCCESSFUL } from '../config/messages';
import serverResponse from '../utils/helpers/responses.js';
import tourServices from '../services/tourServices.js';

exports.getAllTours = async function (req, res, next) {
    try {
        let pageOptions = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        }
        let queryCondition = {};
        if (req.query.name) {
            queryCondition.name = { $regex: req.query.name, $options: 'i'}
        }
        if (req.query.minPrice) {
            queryCondition.price = { $gte: req.query.minPrice}
        }
        if (req.query.maxPrice) {
            queryCondition.price = { $lte: req.query.maxPrice}
        }
        let tours = await tourServices.getAllTours(pageOptions, queryCondition);
        return serverResponse.sendSuccess(res, SUCCESSFUL, tours);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}

exports.addTour = async function (req, res, next) {
    try {
        let tour = await tourServices.addTour(req.body);
        return serverResponse.sendSuccess(res, SUCCESSFUL, tour);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}


exports.updateTour = async function (req, res, next) {
    try {
        let tour = await tourServices.updateTour(req.params.id, req.body);
        return serverResponse.sendSuccess(res, SUCCESSFUL, tour);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}


exports.deleteTour = async function (req, res, next) {
    try {
        let tour = await tourServices.deleteTour(req.params.id);
        return serverResponse.sendSuccess(res, SUCCESSFUL, tour);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}


exports.getToursInHomePage = async function (req, res, next) {
    try {
        let tours = await tourServices.getToursInHomePage();
        return serverResponse.sendSuccess(res, SUCCESSFUL, tours);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}


exports.getTourBySlug = async function (req, res, next) {
    try {
        let tour = await tourServices.getTourBySlug(req.params.slug);
        return serverResponse.sendSuccess(res, SUCCESSFUL, tour);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}

exports.searchTour = async function (req, res, next) {
    try {
        console.log(req.query);
        let queryCondition = {};
        let pageOptions = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 12
        }
        if (req.query.name) {
            queryCondition.name = { $regex: req.query.name, $options: 'i'}
        }
        if (req.query.minPrice) {
            queryCondition.price = { $gte: parseInt(req.query.minPrice)}
        }
        if (req.query.maxPrice) {
            queryCondition.price = { $lte: parseInt(req.query.maxPrice)}
        }
        let tours = await tourServices.searchTour(pageOptions, queryCondition);
        return serverResponse.sendSuccess(res, SUCCESSFUL, tours);

    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}
