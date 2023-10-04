import Tour from '../models/tourModel.js';
import TourOrder from '../models/tourOrderModel.js';
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

exports.getToursInHomePage = async () => {
  try {
    const bestSellerToursId = await TourOrder.aggregate([
      {
        $match: {
          status: "accepted"
        }
      },
      {
        $group: {
          _id: "$tourId",
          totalQuantity: { $sum: "$quantity" }
          
        }
      },
      {
        $sort: {
          totalQuantity: -1
        }
      },
      {
        $limit: 9
      }
    ]);

    if (bestSellerToursId.length === 0) {
      return [];
    }
    else {
      const bestSellerTours = await Tour.find({ _id: { $in: bestSellerToursId.map(tour => tour._id) } });
      return bestSellerTours;
    }

  } catch (err) {
    throw err;
  }
}

exports.getTourBySlug = async (slug) => {
  return new Promise((resolve, reject) => {
    Tour.findOne({ slug: slug }, (err, tour) => {
      if (err) {
        reject(err);
      } else {
        resolve(tour);
      }
    });
  });
}

exports.searchTour = async (pageOptions, queryCondition = {}) => {
  try {
    const options = {
      page: pageOptions.page || 1,
      limit: pageOptions.limit || 12,
      sort: { createdAt: -1 },
    };

    const filter = { ...queryCondition };
    const tours = await Tour.paginate(filter, options);
    return tours;
  } catch (err) {
    throw err;
  }
}