import Order from '../models/productOrderModel';

exports.getAllOrdersOfShop = (shopId,page = 1, limit = 5, searchParams = {}) => {
  
  let options = {
    page: page,
    limit: limit,
    populate: [
      { path: "orderItems.product", select: "_id name price image" },
      { path: "customer", select: "_id name email phone address firstName lastName address phone" },
    ],
    sort: { createdAt: -1 },
  }
  let filter = {
    ...searchParams,
    shop: shopId,
  }
  return new Promise((resolve, reject) => {
    Order.paginate(filter, options, (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    }
    ); 
  });
}

exports.updateOrderStatus = (orderId, status) => {
  return new Promise((resolve, reject) => {
    Order.findByIdAndUpdate(orderId, { status: status }, { new: true })
      .populate([
        { path: "orderItems.product", select: "_id name price" },
        { path: "customer", select: "_id name email phone address firstName lastName address phone" },
      ])
      .exec((err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
  });
}