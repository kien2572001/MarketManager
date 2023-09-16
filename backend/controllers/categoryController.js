import { SUCCESSFUL } from '../config/messages';
import serverResponse from '../utils/helpers/responses.js';
import categoryServices from '../services/categoryServices.js';
import slugify from 'slugify';

exports.getAllCategories = async function (req, res, next) {
    try {
        let pageOptions = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        }
        let categories = await categoryServices.getAllCategories(pageOptions);
        return serverResponse.sendSuccess(res, SUCCESSFUL, categories);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}

exports.getListCategories = async function (req, res, next) {
    try {
        let categories = await categoryServices.getListCategories();
        return serverResponse.sendSuccess(res, SUCCESSFUL, categories);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}


exports.getCategoryBySlug = async function (req, res, next) {
    let slug = req.params.slug;
    try {
        let category = await categoryServices.getCategoryBySlug(slug);
        return serverResponse.sendSuccess(res, SUCCESSFUL, category);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}

exports.createCategory = async function (req, res, next) {
    let temp = {}
    temp.name = req.body.name;
    temp.slug = await slugify(req.body.name, { lower: true });
    temp.parent = req.body.parent || null;
    try {
        let isExists = await categoryServices.checkCategoryExists(temp.slug);
        if (isExists) {
            return serverResponse.sendError(res, { message: "Category already exists" });
        }
        let category = await categoryServices.createCategory(temp);
        return serverResponse.sendSuccess(res, SUCCESSFUL, category);
    }
    catch (err) {
        return serverResponse.sendError(res, err);
    }
}

