import Tour from '../models/tourModel.js';

exports.getAllTours = async (pageOptions, queryCondition = {}) => {
  try {
    const options = {
      page: pageOptions.page || 1,
      limit: pageOptions.limit || 10,
      sort: { createdAt: -1 },
      ...queryCondition,
    };
    const tours = await Tour.paginate({}, options);
    return tours;
  } catch (err) {
    throw err;
  }
}

exports.updateTour = async (id, data) => {
  return new Promise((resolve, reject) => {
    Tour.findByIdAndUpdate(id, data, { new: true }, (err, tour) => {
      if (err) {
        reject(err);
      } else {
        resolve(tour);
      }
    });
  });
}

exports.deleteTour = async (id) => {
  return new Promise((resolve, reject) => {
    Tour.findByIdAndDelete(id, (err, tour) => {
      if (err) {
        reject(err);
      } else {
        resolve(tour);
      }
    });
  });
}