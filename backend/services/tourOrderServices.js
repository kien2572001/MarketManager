import TourOrder from "../models/tourOrderModel";


exports.getTourOrders = async (pageOptions, queryCondition = {}) => {
    try {
        const options = {
            page: pageOptions.page || 1,
            limit: pageOptions.limit || 10,
            sort: { createdAt: -1 },
            populate: [
                { path: "tourId", select: "name price image startTime scheduleType tourDuration startLocation transportation" },
                { path: "userId", select: "firstName lastName email phone address avatar" },
            ],
        };

        const filter = { ...queryCondition };
        const tourOrders = await TourOrder.paginate(filter, options);
        return tourOrders;
    } catch (err) {
        throw err;
    }
}

exports.updateTourOrder = async (tourOrderId, tourOrderData) => {
    try {
        const tourOrder = await TourOrder.findByIdAndUpdate(
            tourOrderId,
            tourOrderData,
            { new: true }
        );
        return tourOrder;
    } catch (err) {
        throw err;
    }
}

exports.changeStatus = async (tourOrderId, status) => {
    try {
        const tourOrder = await TourOrder.findByIdAndUpdate(
            tourOrderId,
            { status: status },
            { new: true }
        );
        return tourOrder;
    }
    catch (err) {
        throw err;
    }
}
