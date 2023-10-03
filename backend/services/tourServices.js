import Tour from '../models/tourModel.js';
import slugify from 'slugify';

exports.getAllTours = async (pageOptions, queryCondition = {}) => {
  try {
    const options = {
      page: pageOptions.page || 1,
      limit: pageOptions.limit || 10,
      sort: { createdAt: -1 },
    };

    const filter = { ...queryCondition };
    const tours = await Tour.paginate(filter, options);
    return tours;
  } catch (err) {
    throw err;
  }
}

exports.addTour = async (data) => {
  if (data.name){
    data.slug = slugify(data.name, { lower: true });
  }
  return new Promise((resolve, reject) => {
    Tour.create(data, (err, tour) => {
      if (err) {
        reject(err);
      } else {
        resolve(tour);
      }
    });
  });
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